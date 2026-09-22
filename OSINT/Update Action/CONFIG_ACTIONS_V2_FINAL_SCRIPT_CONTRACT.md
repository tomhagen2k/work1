# Hướng dẫn `config-action/v2-final`: response FE, DB và 53 action

> File JSON nguồn: `config/config_action_v2_final_script_contract.json`
> Tài liệu này giải thích contract, không phải payload chứa toàn bộ action để chạy cùng lúc.

## 1. Nguồn sự thật và phạm vi

Contract có ba lớp:

1. `actionCatalog`: catalog đủ 53 canonical action để AI và FE tra cứu.
2. `response.data.script`: instance kịch bản thực tế, chỉ chứa action người dùng yêu cầu.
3. `script_definitions.definition`: bản canonical được lưu trong MongoDB.

`data.script` không chứa `assignments` và không chứa lịch chạy theo account. BE nhận `scriptId`/`revision` sau khi lưu script để tự tạo mapping account và schedule trong các collection riêng.

Không đưa toàn bộ 53 action vào một script. Action không được chọn chỉ tồn tại trong catalog.

```text
response.data.script
        ↓
script_definitions.definition
        ↓
script run / legacy projection
```

Các field legacy như `interactType`, `ckbInteract`, `typeReaction` chỉ dùng cho migration hoặc adapter cũ.

### 1.1 Trạng thái triển khai trong AgentMQ

Contract này đã được nối vào luồng Semantic V2 với một payload công khai duy nhất:

- `ActionCompiler.compile_v2_response()` dựng và validate response `script-response/v2-final` từ `ScriptRequestIR` đã được LLM quyết định.
- `FinalScriptContractService` trong `script_contract_v2.py` chịu trách nhiệm map semantic action sang 53 canonical action, gộp các overlay cùng action ngữ cảnh, áp template, validate và tạo document lưu DB.
- Response/proposal của luồng tạo kịch bản chỉ trả `proposal.payload.scriptResponse`.
- Không trả `scripts`, `scriptV2`, `sourceRequestText` hoặc bản sao `assistantMessage.metadata.semanticV2.scriptResponse`. Adapter thực thi cũ (nếu còn dùng) là dữ liệu nội bộ và bị loại trước khi serialize response.
- `report_target` là native V2, không có `interactType`/`classConfig`. Compatibility payload đánh dấu `nativeV2=true` để executor cũ không hiểu nhầm thành ConfigAction.
- Validate-preview legacy chỉ nhận các ConfigAction cũ; native V2 được tách khỏi request này và đã được validator canonical kiểm tra trước. Nếu payload chỉ có native action thì không gọi endpoint legacy.

FE/BE lấy catalog runtime bằng:

```http
GET /api/config/actions/v2-final
```

`data` của endpoint là nội dung contract machine-readable gồm `actionCatalog`, `keyDefinitions`, `defaults`, `presenceRules`, `behaviorCatalog`, `timingRules`, `reportTargetCatalog` và `reportReasonCatalog`.

Trong response chat/proposal, FE đọc đúng một đường dẫn:

```text
proposal.payload.scriptResponse.data.script
```

Không lưu cả response envelope vào `script_definitions.definition`; chỉ lưu object tại `scriptResponse.data.script`.

## 2. Response trả về FE

```json
{
  "schemaVersion": "script-response/v2-final",
  "contractVersion": 2,
  "status": "success",
  "requestId": "req-123",
  "generatedAt": "2026-09-04T10:00:00Z",
  "data": { "script": {} },
  "errors": [],
  "warnings": [],
  "meta": { "editable": true, "revision": 1 }
}
```

| Key | Ý nghĩa | Mặc định/khi có |
|---|---|---|
| `schemaVersion` | Version của response contract. | `script-response/v2-final`, luôn có. |
| `contractVersion` | Version số. | `2`, luôn có. |
| `status` | `success`, `needs_clarification`, `validation_error`. | `success` nếu hợp lệ. |
| `requestId` | ID trace request. | Luôn có. |
| `generatedAt` | Thời điểm tạo response ISO-8601. | Luôn có. |
| `data.script` | Canonical script để FE hiển thị và lưu. | Có khi thành công. |
| `errors` | Lỗi chặn lưu/chạy. | `[]`. |
| `warnings` | Cảnh báo không chặn. | `[]`. |
| `meta` | Revision, quyền sửa, nguồn sinh. | Luôn có. |

## 3. Script đơn và nhiều ngày

### 3.1 Script đơn

`kind=single` và `days` có đúng một phần tử. Không tạo schema riêng cho script đơn.

### 3.2 Script nhiều ngày

`kind=multi_day`; mỗi ngày có round riêng, mỗi round có action theo `order`.

```text
script
└── days[]
    └── rounds[]
        └── actions[]
```

| Key | Ý nghĩa | Default |
|---|---|---|
| `scriptId` | ID ổn định kịch bản. | Không tự sinh lại khi sửa. |
| `name` | Tên FE hiển thị. | Bắt buộc. |
| `description` | Mô tả tùy chọn. | `null`. |
| `kind` | `single` hoặc `multi_day`. | `single`. |
| `status` | `draft`, `published`, `paused`, `archived`. | `draft`. |
| `revision` | Revision của script. | `1`, tăng sau mỗi lần lưu. |
| `timezone` | Timezone hiển thị và tính lịch. | `Asia/Ho_Chi_Minh`. |
| `days[]` | Danh sách ngày. | Tối thiểu một ngày. |
| `rounds[]` | Các lượt trong ngày. | `[]` ở draft. |
| `actions[]` | Action thực tế trong round. | `[]` ở draft. |

## 4. Default và quy tắc xuất hiện key

Chi tiết machine-readable nằm trong `defaults`, `presenceRules` và `keyDefinitions` của file JSON.

| Quy tắc | Ý nghĩa |
|---|---|
| `always` | Key luôn trả về trong canonical response, kể cả khi giá trị là null hoặc []. |
| `single_or_multi_day` | Kịch bản đơn và nhiều ngày dùng cùng một shape; single chỉ có một phần tử trong days. |
| `supported_capability` | Catalog liệt kê toàn bộ capability hỗ trợ; script instance chỉ xuất operation đang bật để giảm payload. |
| `fixed_mode` | Không có lọc nội dung; script instance không xuất `semanticRuntime`. |
| `semantic_mode` | Có điều kiện theo nội dung; semanticRuntime.postDecisionPolicy là bắt buộc. |
| `reply_policy_exclusivity` | Reply dùng format mới thì conditions=null và policies có dữ liệu; format legacy thì policies=[] và conditions có dữ liệu. |
| `null_vs_empty` | null = không áp dụng/chưa cấu hình; [] = block dạng danh sách không có phần tử; không dùng 0-0 để biểu diễn chưa chỉ định. |
| `quota_separation` | scope.quantity là quota item/post; comment.count là quota bài comment; reply.count là quota reply; reply.max_comment là giới hạn comment nguồn được quét. |
| `summary` | Summary là output deterministic từ config đã normalize/validate, không phải raw prompt người dùng. |

Các default quan trọng:

- Quantity mặc định `from=1`, `to=1`; không dùng `0-0` để biểu diễn chưa chỉ định.
- Delay item mặc định `30–60` giây; delay trước action có thể là `0–0`.
- Operation người dùng không yêu cầu được bỏ khỏi script instance; `enabled=false` chỉ còn trong template catalog phục vụ form khởi tạo.
- Các legacy field dùng chung tên như `ckbTaoNoiDungAI` và `cbbPrompt` được map theo vai trò action: action tương tác map vào `commentPost.content`, còn action đăng/chia sẻ map vào `action.content`. Compiler không được tạo operation ngoài `supportedOperations`.
- Selection percent mặc định `100` khi operation đã bật; đây là tỷ lệ chọn chính xác.
- Reply mặc định `enabled=false` và `max_comment=null` khi tắt.
- Reply/reaction comment bật thì `max_comment` mặc định là `20` nếu không được chỉ định.
- `null` là chưa cấu hình/không áp dụng; `[]` là danh sách rỗng; `false` là capability có nhưng đang tắt.

### Bảng keyDefinitions

| Key | Kiểu | Default | Khi có | Ý nghĩa |
|---|---|---|---|---|
| `response.schemaVersion` | string | `"script-response/v2"` | always | Version contract response. |
| `response.contractVersion` | integer | `2` | always | Version số của contract. |
| `response.status` | enum | `"success"` | always | Trạng thái trả về. |
| `response.requestId` | string | `null` | always | ID request để trace. |
| `response.generatedAt` | datetime | `null` | always | Thời điểm tạo response ISO-8601. |
| `response.data` | object | `null` | always khi status=success | Payload chính chứa kịch bản. |
| `response.errors` | array | `[]` | always; rỗng khi không lỗi | Lỗi có cấu trúc. |
| `response.warnings` | array | `[]` | always; rỗng khi không cảnh báo | Cảnh báo không chặn lưu/chạy. |
| `response.meta` | object | `{}` | always | Thông tin phiên bản, nguồn và quyền chỉnh sửa. |
| `script.scriptId` | string | `null` | always | ID ổn định của kịch bản. |
| `script.name` | string | `null` | always | Tên kịch bản hiển thị. |
| `script.description` | string | `null` | optional; null khi không có | Mô tả tùy chọn. |
| `script.kind` | enum | `"single"` | always | Loại kịch bản. |
| `script.status` | enum | `"draft"` | always | Trạng thái lưu/chạy. |
| `script.revision` | integer | `1` | always | Revision tăng khi cập nhật. |
| `script.timezone` | string | `"Asia/Ho_Chi_Minh"` | always | Timezone áp dụng cho lịch. |
| `script.summary` | object | `null` | always trong response; có thể null ở draft | Tóm tắt deterministic cho FE. |
| `script.days` | array | `[]` | always; tối thiểu 1 | Danh sách ngày; single vẫn có đúng một phần tử. |
| `script.validation` | object | `null` | always | Kết quả validate sau khi normalize. |
| `script.audit` | object | `null` | always khi lưu DB | Nguồn tạo và thông tin audit. |
| `schedule.mode` | enum | `"manual"` | trong document schedule do BE quản lý | Cách xác định lịch account; không thuộc `data.script`. |
| `schedule.startAt` | datetime | `null` | required khi schedule được dùng và mode=once/recurring | Mốc bắt đầu chạy. |
| `schedule.endAt` | datetime | `null` | optional | Mốc kết thúc. |
| `schedule.timezone` | string | `"Asia/Ho_Chi_Minh"` | always | Timezone của startAt và giờ trong round. |
| `schedule.repeat` | object | `null` | chỉ có khi mode=recurring | Quy tắc lặp. |
| `schedule.runWindow` | object | `null` | optional | Khoảng giờ cho phép chạy. |
| `day.dayId` | string | `null` | always | ID ổn định của ngày trong script. |
| `day.dayNumber` | integer | `1` | always | Số thứ tự ngày bắt đầu từ 1. |
| `day.label` | string | `null` | always | Tên hiển thị, ví dụ Ngày 1. |
| `day.date` | date | `null` | optional | Ngày cụ thể nếu lịch dùng ngày cố định. |
| `day.dateOffset` | integer | `0` | always trong multi_day | Số ngày lệch so với `assignment.schedule.startAt`; không phải field của script. |
| `day.enabled` | boolean | `true` | always | Bật/tắt toàn bộ ngày. |
| `day.summary` | object | `null` | always trong response | Tóm tắt ngày. |
| `day.rounds` | array | `[]` | always; có thể rỗng ở draft | Các lượt chạy trong ngày. |
| `round.roundId` | string | `null` | always | ID ổn định của lượt. |
| `round.order` | integer | `1` | always | Thứ tự lượt trong ngày. |
| `round.startTime` | time | null | chỉ có thể dùng là giờ mẫu chung cho multi_day; omit trong single | Giờ mẫu có thể dùng khi BE materialize; không phải lịch account. |
| `round.endTime` | time | null | optional cho multi_day; omit trong single | Mốc kết thúc mẫu; lịch account thực tế do BE quản lý. |
| `round.enabled` | boolean | `true` | always | Bật/tắt lượt. |
| `round.actions` | array | `[]` | always; theo thứ tự order | Action thực thi trong lượt. |
| `action.actionId` | string | `null` | always | ID ổn định của action. |
| `action.order` | integer | `1` | always | Thứ tự action trong round. |
| `action.type` | string | `null` | always | Canonical action type V2. |
| `action.title` | string | `null` | always | Tên hiển thị của action. |
| `action.enabled` | boolean | `true` | always | Bật/tắt action. |
| `action.target` | object | `null` | always nếu action có target | Nguồn/tài nguyên cần thao tác. |
| `action.scope` | object | `null` | always | Số lượng hoặc phạm vi xử lý. |
| `action.timing` | object | `null` | always | Delay, timeout, duration. |
| `action.behavior` | object | `null` | always | Fixed operation hoặc semantic policy. |
| `action.semanticRuntime` | object | `null` | chỉ có khi behavior.mode=semantic_policy; bị lược bỏ với fixed | Runtime policy phân tích nội dung. |
| `target.kind` | enum | `null` | always | Loại tài nguyên. |
| `target.selectionMode` | enum | `"joined"` | always | Cách lấy tài nguyên ban đầu. |
| `target.uids` | array<string> | `[]` | chỉ có khi target người | Danh sách UID người dùng. |
| `target.groupIds` | array<string> | `[]` | chỉ có khi target group trực tiếp | ID group cụ thể. |
| `target.pageIds` | array<string> | `[]` | chỉ có khi target page trực tiếp | ID page cụ thể. |
| `target.postIds` | array<string> | `[]` | chỉ có khi target bài trực tiếp | ID bài cụ thể. |
| `target.reelIds` | array<string> | `[]` | chỉ có khi target reel trực tiếp | ID reel cụ thể. |
| `target.keywords` | array<string> | `[]` | chỉ có khi selectionMode=keyword | Từ khóa tìm target. |
| `target.urls` | array<string> | `[]` | chỉ có khi selectionMode=url | URL target. |
| `target.filters` | object | `{}` | optional | Bộ lọc target kỹ thuật. |
| `scope.mode` | enum | `"quantity"` | always | Cách giới hạn phạm vi. |
| `scope.quantity` | object | `{"from":1,"to":1,"unit":"item"}` | khi mode=quantity | Khoảng số lượng. |
| `scope.outer` | object | `null` | chỉ action lồng target | Số lượng cấp ngoài, ví dụ số group. |
| `scope.inner` | object | `null` | chỉ action lồng target | Số lượng cấp trong, ví dụ số bài/group. |
| `scope.limit` | integer | `null` | optional | Hard limit của resource. |
| `scope.unit` | string | `"item"` | thường nằm trong quantity | Đơn vị xử lý. |
| `timing.delayBeforeSeconds` | range | `{"from":0,"to":0}` | always | Delay trước action. |
| `timing.delayBetweenTargetsSeconds` | range | `{"from":30,"to":60}` | scope.mode=nested_quantity | Delay giữa target lớn. |
| `timing.delayBetweenItemsSeconds` | range | `{"from":30,"to":60}` | scope.mode=quantity, nested_quantity hoặc all khi action xử lý nhiều item | Delay giữa item. |
| `timing.durationSeconds` | range\|null | `null` | chỉ action cần thời lượng | Thời lượng tương tác. |
| `timing.timeoutSeconds` | integer\|null | `null` | chỉ action có timeout riêng | Timeout toàn action. |
| `timing.loadTimeoutSeconds` | integer\|null | `null` | chỉ action có load timeout | Timeout tải resource. |
| `timing.checkDelaySeconds` | integer\|null | `null` | chỉ action có polling trạng thái | Delay kiểm tra trạng thái. |
| `behavior.mode` | enum | `"fixed"` | always | Cách quyết định hành vi. |
| `behavior.operations` | object | `{}` | chỉ operation trong action.supportedOperations | Các operation được hỗ trợ trong context. |
| `behavior.generationInstruction` | string\|null | `null` | chỉ có khi cần AI sinh text | Hướng dẫn sinh nội dung sau khi item đã được chọn. |
| `behavior.promptId` | string\|null | `null` | chỉ có khi source=ai/prompt | Prompt định danh dùng để sinh text. |
| `operation.read` | object | `null` | chỉ action hỗ trợ read | Đọc/thu thập nội dung. |
| `operation.reactionPost` | object | `null` | chỉ khi context hỗ trợ reaction bài | Reaction trên bài/story/reel. |
| `operation.commentPost` | object | `null` | chỉ khi người dùng yêu cầu comment | Tạo comment mới trên bài. |
| `operation.sharePost` | object | `null` | chỉ khi người dùng yêu cầu share | Chia sẻ bài. |
| `operation.reactionComment` | object | `null` | chỉ khi người dùng yêu cầu reaction comment | Reaction vào comment nguồn. |
| `operation.replyComment` | object | `null` | chỉ khi người dùng yêu cầu reply | Reply comment nguồn. |
| `operation.reportTarget` | object | `null` | chỉ action `report_target` | Báo cáo target theo loại và lý do đã chọn. |
| `reaction.enabled` | boolean | `false` | always khi operation được khai báo | Bật/tắt operation reaction. |
| `reaction.types` | array<string> | `[]` | có khi enabled=true | Loại reaction. |
| `reaction.selectionPercent` | number | `100` | có khi enabled=true | Tỷ lệ item đủ điều kiện được chọn chính xác; không phải xác suất. |
| `reaction.selectionMode` | enum | `"same_selected_items"` | có khi operation bật | Áp dụng reaction trên item nào. |
| `reaction.policies[].selection_mode` | enum | `"all_matching"` | trong semantic reaction policy | `all_matching`, `quota` hoặc `percentage`; quyết định cách chọn item match policy. |
| `reaction.policies[].selection_percent` | number\|null | `null` | bắt buộc khi `selection_mode=percentage` | Tỷ lệ item match policy được chọn chính xác; ví dụ `30` = `30%`. |
| `content.source` | enum | `"none"` | always trong content block | Nguồn nội dung. |
| `content.text` | array<string> | `[]` | source=fixed | Nội dung cố định hoặc danh sách biến thể. |
| `content.promptId` | string\|null | `null` | source=ai/prompt | Prompt sinh nội dung. |
| `content.mediaIds` | array<string> | `[]` | khi có media | Media đính kèm. |
| `content.cleanupAfterUse` | boolean | `false` | khi có content/media | Xóa media/content tạm sau khi dùng. |
| `comment.selection` | object | `{"mode":"skip","scope":null,"count":null}` | always trong rule behavior | Chọn bài để comment. |
| `comment.mode` | enum | `"skip"` | always trong selection | Cách chọn bài comment. |
| `comment.scope` | object\|null | `null` | optional | Scope riêng của comment. |
| `comment.count` | integer\|null | `null` | null khi all_matching | Số bài comment. |
| `comment.tag` | object | `null` | chỉ khi yêu cầu tag | Gắn thẻ bạn bè. |
| `reply.enabled` | boolean | `false` | always trong reply block | Bật/tắt reply. |
| `reply.count` | integer\|null | `null` | null khi dùng all_matching | Tổng số reply cần tạo. |
| `reply.conditions` | object\|null | `null` | chỉ dùng legacy; null khi dùng policies | Điều kiện reply legacy. |
| `reply.max_comment` | integer\|null | `null` | 20 khi reply/reaction comment bật; null khi disabled | Số comment nguồn tối đa được quét. |
| `reply.policies` | array | `[]` | dùng policies hoặc conditions, không dùng đồng thời | Danh sách policy reply mới. |
| `reply.selection_mode` | enum | `"all_matching"` | trong từng reply policy | Cách chọn comment phù hợp. |
| `reply.selection_percent` | number\|null | `null` | bắt buộc khi `selection_mode=percentage`; null ở mode khác | Tỷ lệ comment đủ điều kiện được chọn chính xác, từ `0` đến `100`. |
| `reply.generation_instruction` | string\|null | `null` | chỉ khi policy reply cần sinh text | Cách sinh nội dung reply. |
| `reply.prompt_id` | string\|null | `null` | chỉ khi dùng prompt | Prompt sinh reply. |
| `semanticRuntime.schemaVersion` | string | `"semantic-runtime-action/v2"` | always khi semanticRuntime có mặt | Version semantic runtime. |
| `semanticRuntime.summary` | string\|null | `null` | always trong semanticRuntime | Tóm tắt policy của action. |
| `semanticRuntime.postDecisionPolicy` | object | `null` | required khi mode=semantic_policy | Policy quyết định xử lý bài/comment. |
| `semanticRuntime.taxonomy` | object | `{"categories":[],"default_category":"unclear","allow_multiple_categories":false}` | trong postDecisionPolicy | Danh mục classifier. |
| `semanticRuntime.rule_resolution` | enum | `"first_match"` | trong postDecisionPolicy | Cách chọn rule. |
| `semanticRuntime.post_rules` | array | `[]` | trong postDecisionPolicy | Các rule xử lý bài. |
| `semanticRuntime.otherwise` | object | `null` | always trong postDecisionPolicy | Hành vi khi không rule nào khớp. |
| `semanticRuntime.match` | object | `null` | trong từng post rule | Điều kiện chọn bài. |
| `semanticRuntime.on_unclear` | enum | `"skip"` | trong match | Hành vi khi classifier không chắc. |
| `semanticRuntime.generation_instruction` | string\|null | `null` | trong policy có sinh text | Chỉ dẫn sinh text, không dùng chọn item. |
| `semanticRuntime.prompt_id` | string\|null | `null` | trong policy có sinh text | Prompt sinh text. |
| `validation.status` | enum | `"valid"` | always | Kết quả validate. |
| `validation.errors` | array | `[]` | always | Lỗi chặn lưu/chạy. |
| `validation.warnings` | array | `[]` | always | Cảnh báo. |
| `validation.defaultedPaths` | array<string> | `[]` | always | Các path được điền default. |
| `validation.normalized` | boolean | `true` | always | Đã normalize về canonical shape. |
| `persistence.collection` | string | `"script_definitions"` | always trong persistence spec | Collection lưu định nghĩa script. |
| `persistence.documentId` | string | `null` | always trong DB document | Mongo document _id. |
| `persistence.definition` | object | `null` | always trong DB document | Canonical script definition. |
| `persistence.actionIndex` | array | `[]` | always trong DB document | Index action để query nhanh. |
| `persistence.semanticPolicyIndex` | array | `[]` | always trong DB document | Index policy/topic để query/audit. |
| `persistence.createdAt` | datetime | `null` | always trong DB document | Thời điểm tạo. |
| `persistence.updatedAt` | datetime | `null` | always trong DB document | Thời điểm cập nhật. |
| `persistence.publishedAt` | datetime\|null | `null` | khi script published | Thời điểm publish. |

## 5. Target, scope và timing

### `target`

`target.kind` là loại resource; `target.selectionMode` là cách lấy resource ban đầu.

| `target.selectionMode` | Tác dụng | Key thường đi kèm |
|---|---|---|
| `joined` | Resource đã tham gia/theo dõi. | Không bắt buộc ID cụ thể. |
| `current_account` | Resource của account hiện tại. | Có thể không cần ID. |
| `keyword` | Tìm bằng từ khóa. | `target.keywords`. |
| `explicit_ids` | Dùng ID chỉ định. | `uids`, `groupIds`, `pageIds`, `postIds`, `reelIds`. |
| `suggestion` | Dùng danh sách gợi ý. | Không cần keyword. |
| `url` | Dùng URL. | `target.urls`. |

### `scope`

`scope.quantity` là số resource ban đầu cần lấy/xử lý. Nó không phải số comment reply.

### `timing`

`timing` chứa delay, duration và timeout. Các range `from/to` được chọn trong khoảng đó; timestamp lịch phải lưu UTC ở DB.

## 6. `selectionMode` và quota

Có hai cách viết theo context:

- `behavior.operations.<operation>.selectionMode`: camelCase của operation.
- `postDecisionPolicy...policies[].selection_mode`: snake_case của semantic runtime hiện tại.

| Option | Tác dụng | Field kèm theo |
|---|---|---|
| `same_selected_items` | Thực hiện trên item đã được `scope` chọn; không tạo quota lọc mới. | Không cần `selectionPercent`; dùng quota scope. |
| `quota` (UI có thể gọi là quantity) | Chọn theo số lượng item đủ điều kiện. | `count` bắt buộc; nếu cần range dùng block quantity. |
| `percentage` | Chọn chính xác phần trăm item đủ điều kiện, không phải xác suất. | `selectionPercent`/`selection_percent` 0–100; nên có rounding. |
| `all_matching` | Chọn tất cả item khớp đến khi hết hoặc chạm hard limit. | `count=null`; `selectionPercent` không cần khai báo. |

`percentage` là option chính thức của contract V2. Validator/compiler phải nhận enum này và kiểm tra `selectionPercent` trong khoảng 0-100. Khi người dùng nói X%, luôn lưu `selectionMode=percentage` cùng `selectionPercent=X`. Trong semantic policy, tên nội bộ tương ứng là `selection_mode=percentage` và `selection_percent=X`.

Ví dụ chính xác 50% trong 10 bài:

```json
{ "selectionMode": "percentage", "selectionPercent": 50 }
```

Kết quả là chọn đúng 5 bài. Không dùng `selectionPercent` ở mode khác `percentage` để thay thế quota phần trăm.

Quota cần tách:

| Key | Quota của |
|---|---|
| `scope.quantity` | Resource/post/story/video ban đầu. |
| `comment.selection.count` | Số bài được comment. |
| `reply.count` | Tổng số reply. |
| `reply.policies[].count` | Quota của từng reply policy. |
| `reply.max_comment` | Số comment nguồn tối đa được quét. |


## Behavior catalog

`behavior.mode` có hai giá trị:

- `fixed`: chạy các operation cố định, không cần phân loại nội dung.
- `semantic_policy`: phân tích nội dung và chọn operation bằng `semanticRuntime`.

FE không cần đoán operation từ `legacyFields`. Form tạo/sửa tra `action.supportedOperations`; bản script đã sinh chỉ chứa operation đang bật. Khi FE bật thêm một operation, lấy shape mặc định từ template catalog tương ứng.

| Operation | Tác dụng | Các field chính |
|---|---|---|
| `read` | Đọc/thu thập nội dung | `enabled` |
| `viewFullContent` | Mở rộng/đọc toàn bộ item | `enabled`, `selectionPercent` |
| `reactionPost` | Reaction trên bài viết/story/reel | `enabled`, `types`, `selectionMode`, `selectionPercent` |
| `commentPost` | Đăng comment mới | `enabled`, `selectionPercent`, `content`, `media`, `sticker`, `tag` |
| `sharePost` | Chia sẻ item | `enabled`, `selectionPercent`, `content`, `destination` |
| `reactionComment` | Reaction trên comment nguồn | `enabled`, `types`, `selectionPercent`, `maxComment` |
| `replyComment` | Reply comment nguồn | `enabled`, `selectionMode`, `count`, `maxComment`, `conditions`, `policies`, `delaySeconds`, `content` |
| `cleanupSpamNotifications` | Xóa thông báo spam sau khi đọc | `enabled` |
| `reportTarget` | Báo cáo tài khoản, bài viết hoặc trang bằng nội dung mặc định | `enabled`, `reasonCode`, `content.source` |

Timing cũng là action-specific: `delayBeforeSeconds` là chờ trước action; `delayBetweenItemsSeconds` chỉ dùng cho scope nhiều item; `delayBetweenTargetsSeconds` chỉ dùng cho scope nhiều target; các key timeout/duration chỉ xuất khi action có cơ chế tương ứng. Các key không áp dụng sẽ không xuất dưới dạng `null`.

## 7. Behavior và semantic runtime

- `behavior.mode=fixed`: hành động trực tiếp, không lọc nội dung.
- `behavior.mode=semantic_policy`: phải phân tích topic/category/sentiment/stance/entity trước khi hành động.
- Taxonomy chỉ có category `other` và không có sentiment/stance/speech-act/entity/topic filter không phải policy thực: compiler chuyển action sang `fixed`, bỏ `semanticRuntime` và giữ quota/operation/prompt tương ứng. Nếu rule reply vẫn lọc comment tiêu cực, thực thể cụ thể hoặc chủ đề khác bài thì mode vẫn là `semantic_policy` dù category bài là `other`.
- Nội dung AI “phù hợp bài viết” được resolver tạo thành prompt comment chỉ dẫn model bám nội dung bài nguồn; “phù hợp comment” được tạo thành prompt reply bám comment nguồn và ngữ cảnh bài. Không sao chép toàn bộ yêu cầu tạo kịch bản, count, delay, lịch hoặc sibling action vào prompt.

```text
semanticPolicy
└── semanticRuntime
    └── postDecisionPolicy
        └── post_rules[]
            └── policyRule
```

`semanticPolicy` là template đầy đủ của action; `policyRule` là một rule để thêm vào `post_rules[]`, không phải một mode chạy độc lập.

### Điều kiện semantic

| Key | Tác dụng | Default |
|---|---|---|
| `has_meaningful_content` | Nội dung đủ nghĩa để phân loại. | `true`. |
| `category_any_of` | Category của bài/item. | `[]` = không giới hạn. |
| `topic_any_of` | Topic của bài/comment. | `[]`. |
| `post_topic_any_of` | Topic của bài cha. | `[]`. |
| `topic_relation` | Quan hệ topic với bài cha. | `any`. |
| `sentiment_any_of` | `positive`, `negative`, `neutral`. | `[]`. |
| `stance_any_of` | `supportive`, `opposing`, `neutral`... | `[]`. |
| `speech_act_any_of` | `praise`, `criticize`, `attack`, `defame`... | `[]`. |
| `target_entities_any_of` | Entity được nhắc đến. | `[]`. |
| `on_unclear` | Xử lý khi classifier không chắc. | `skip`. |

Điều kiện bài nằm trong `post_rules[].match`. Điều kiện comment/reply nằm trong từng `reply.policies[].conditions` hoặc block reaction comment tương ứng.

## 8. Action lưu trong DB

| Key | Ý nghĩa | Mặc định/khi có |
|---|---|---|
| `actionId` | ID ổn định trong day/round. | Luôn có. |
| `order` | Thứ tự action trong round. | Mặc định 1. |
| `type` | Canonical action type. | Luôn có; dùng 53 type chuẩn. |
| `title` | Tên FE hiển thị. | Lấy từ catalog nếu thiếu. |
| `enabled` | Bật/tắt action. | `true`. |
| `target` | Resource cần thao tác. | Có khi action cần target. |
| `scope` | Số lượng/phạm vi. | Luôn có sau normalize. |
| `timing` | Delay/duration/timeout. | Luôn có sau normalize. |
| `behavior` | Fixed hoặc semantic + operation. | Luôn có. |
| `semanticRuntime` | Policy phân tích nội dung. | Semantic có; fixed không xuất key này. |


## 8.1. Contract hành động report đối tượng

Action canonical là `report_target`. Đây là action V2 native, không có `legacyInteractType` và không có `classConfig` cũ. Action chạy ở `behavior.mode=fixed`; `semanticRuntime` phải là `null`.

### Ánh xạ loại đối tượng

| `target.kind` | Field chứa giá trị | `target.selectionMode` | Nhãn FE |
|---|---|---|---|
| `account` | `target.uids` | `explicit_ids` | Danh sách UID |
| `post` | `target.urls` | `url` | Danh sách link bài viết |
| `page` | `target.pageIds` | `explicit_ids` | Danh sách Page ID |

Chỉ xuất field giá trị ứng với `target.kind`; không gửi đồng thời `uids`, `urls` và `pageIds`. `scope.mode=all` nghĩa là xử lý toàn bộ target người dùng đã chọn; số lượng hiển thị trên FE được tính từ độ dài danh sách đang dùng.

### Nội dung report

`report_target` chỉ sử dụng nội dung mặc định của hệ thống. FE không hiển thị lựa chọn tạo nội dung bằng AI/Prompt và JSON không có `promptId`.

| Field | Giá trị | Có thể chỉnh sửa |
|---|---|---|
| `content.source` | `system_default` | Không |

### Danh mục lý do

`reasonCode` bắt buộc chọn đúng một giá trị trong `reportReasonCatalog`:

| Code | Nhãn hiển thị | Loại target |
|---|---|---|
| `threaten_share_private_images_minor` | Đe dọa chia sẻ ảnh riêng tư của người dưới 18 tuổi | account, post, page |
| `sexual_exploitation_minor` | Bóc lột tình dục người dưới 18 tuổi | account, post, page |
| `share_private_images_minor` | Chia sẻ ảnh riêng tư của người dưới 18 tuổi | account, post, page |
| `bullying_or_harassment_minor` | Bắt nạt hoặc quấy rối người dưới 18 tuổi | account, post, page |
| `physical_abuse_minor` | Bạo hành thể chất với người dưới 18 tuổi | account, post, page |
| `bullying_or_harassment_me` | Quấy rối/bắt nạt (nhắm vào tôi) | account, post, page |
| `bullying_or_harassment` | Bắt nạt hoặc quấy rối | account, post, page |
| `threaten_share_private_images` | Đe dọa chia sẻ ảnh riêng tư | account, post, page |
| `sexual_exploitation` | Có dấu hiệu bóc lột tình dục | account, post, page |
| `human_trafficking` | Có dấu hiệu buôn người | account, post, page |
| `suicide_or_self_harm` | Tự tử hoặc tự hại | account, post, page |
| `threat_to_safety` | Đe dọa ảnh hưởng an toàn | account, post, page |
| `terrorism` | Có dấu hiệu khủng bố | account, post, page |
| `incitement_to_violence` | Kêu gọi bạo lực | account, post, page |
| `organized_crime` | Có dấu hiệu tội phạm có tổ chức | account, post, page |
| `graphic_or_severe_violence` | Hình ảnh ghê rợn/bạo lực nghiêm trọng | account, post, page |
| `animal_abuse` | Ngược đãi động vật | account, post, page |
| `weapons_sales` | Bán/quảng cáo vũ khí | account, post, page |
| `animal_sales` | Bán/quảng cáo động vật | account, post, page |
| `adult_or_sensitive_content` | Nội dung người lớn hoặc nhạy cảm | account, post, page |
| `adult_or_nudity_video` | Nội dung người lớn/khỏa thân (video) | account, post, page |
| `impersonating_me` | Giả mạo tôi | account, post, page |
| `not_a_real_person` | Không phải người thật | account, post, page |
| `scam_or_fraud` | Lừa đảo hoặc gian lận | account, post, page |
| `misinformation` | Chia sẻ thông tin sai lệch | account, post, page |
| `spam` | Spam/Nội dung rác | account, post, page |
| `misinformation_video` | Thông tin sai lệch (video) | account, post, page |
| `intellectual_property_violation` | Vi phạm sở hữu trí tuệ | account, post, page |
| `other` | Khác | account, post, page |
| `do_not_want_to_see` | Tôi không muốn thấy nội dung này | account, post, page |

### JSON lưu trong action

```json
{
  "type": "report_target",
  "target": {
    "kind": "account",
    "selectionMode": "explicit_ids",
    "uids": [
      "100012345678901",
      "100098765432109"
    ]
  },
  "scope": {
    "mode": "all",
    "unit": "target"
  },
  "timing": {
    "delayBeforeSeconds": {
      "from": 0,
      "to": 0
    },
    "delayBetweenItemsSeconds": {
      "from": 30,
      "to": 60
    }
  },
  "behavior": {
    "mode": "fixed",
    "operations": {
      "reportTarget": {
        "enabled": true,
        "reasonCode": "spam",
        "content": {
          "source": "system_default"
        }
      }
    }
  },
  "semanticRuntime": null
}
```

## 9. Đủ 53 action và mẫu hiển thị FE

Mỗi mục dưới đây là một action riêng trong catalog. FE chỉ render field theo capability; không render toàn bộ field legacy trong form chính.

### 1. `read_notifications` — Đọc thông báo

**Ví dụ UI:** Card "Đọc thông báo": tài khoản hiện tại → nút Đọc.

**Capability:** `read`
**Behavior operations:** `read`, `cleanupSpamNotifications`
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `read_notifications` |
| Legacy interact type | `[1]` |
| Legacy semantic type | `["read_notifications"]` |
| Config class cũ | `HDDocThongBaoConfig` |
| Semantic runtime | `False` |
| Required V2 | `scope.quantity` |
| Optional V2 | `(không có)` |
| Legacy field count | `5` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, behavior.operations.cleanupSpamNotifications, behavior.operations.cleanupSpamNotifications.enabled, behavior.operations.read, behavior.operations.read.enabled, scope, scope.mode, scope.quantity, scope.quantity.from, scope.quantity.to, scope.quantity.unit, semanticRuntime, target, target.kind, target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, type

**V2 key có thể có trong semantic template:** `không có`

**Legacy field áp dụng:** `nudSoLuongFrom`, `nudSoLuongTo`, `nudDelayFrom`, `nudDelayTo`, `ckbXoaThongBaoSpam`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 2. `interact_story` — Tương tác story

**Ví dụ UI:** Card "Tương tác Story": chọn 1–3 story; toggle Đọc, Reaction, Comment, Share, Reply.

**Capability:** `read`, `reaction`, `comment`, `share`, `ai_comment_prompt`, `view_full_content`, `reply_comment`
**Behavior operations:** `read`, `viewFullContent`, `reactionPost`, `commentPost`, `sharePost`, `replyComment`
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`, `durationSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `interact_story` |
| Legacy interact type | `[2]` |
| Legacy semantic type | `["interact_story"]` |
| Config class cũ | `HDTuongTacStoryConfig` |
| Semantic runtime | `True` |
| Required V2 | `scope.quantity` |
| Optional V2 | `reaction` |
| Legacy field count | `38` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, behavior.operations.commentPost, behavior.operations.commentPost.content, behavior.operations.commentPost.content.cleanupAfterUse, behavior.operations.commentPost.content.mediaIds, behavior.operations.commentPost.content.mediaIds[], behavior.operations.commentPost.content.promptId, behavior.operations.commentPost.content.source, behavior.operations.commentPost.content.text, behavior.operations.commentPost.content.text[], behavior.operations.commentPost.enabled, behavior.operations.commentPost.media, behavior.operations.commentPost.media.enabled, behavior.operations.commentPost.media.mediaIds, behavior.operations.commentPost.media.mediaIds[], behavior.operations.commentPost.media.selectionPercent, behavior.operations.commentPost.selectionPercent, behavior.operations.commentPost.sticker, behavior.operations.commentPost.sticker.enabled, behavior.operations.commentPost.tag, behavior.operations.commentPost.tag.enabled, behavior.operations.commentPost.tag.source, behavior.operations.commentPost.tag.uids, behavior.operations.commentPost.tag.uids[], behavior.operations.reactionPost, behavior.operations.reactionPost.enabled, behavior.operations.reactionPost.selectionMode, behavior.operations.reactionPost.selectionPercent, behavior.operations.reactionPost.types, behavior.operations.reactionPost.types[], behavior.operations.read, behavior.operations.read.enabled, behavior.operations.replyComment, behavior.operations.replyComment.conditions, behavior.operations.replyComment.content, behavior.operations.replyComment.content.cleanupAfterUse, behavior.operations.replyComment.content.promptId, behavior.operations.replyComment.content.source, behavior.operations.replyComment.content.text, behavior.operations.replyComment.content.text[], behavior.operations.replyComment.count, behavior.operations.replyComment.delaySeconds, behavior.operations.replyComment.delaySeconds.from, behavior.operations.replyComment.delaySeconds.to, behavior.operations.replyComment.enabled, behavior.operations.replyComment.maxComment, behavior.operations.replyComment.policies, behavior.operations.replyComment.policies[], behavior.operations.replyComment.selectionMode, behavior.operations.sharePost, behavior.operations.sharePost.content, behavior.operations.sharePost.content.cleanupAfterUse, behavior.operations.sharePost.content.mediaIds, behavior.operations.sharePost.content.mediaIds[], behavior.operations.sharePost.content.promptId, behavior.operations.sharePost.content.source, behavior.operations.sharePost.content.text, behavior.operations.sharePost.content.text[], behavior.operations.sharePost.destination, behavior.operations.sharePost.destination.groups, behavior.operations.sharePost.destination.groups[], behavior.operations.sharePost.destination.wall, behavior.operations.sharePost.enabled, behavior.operations.sharePost.selectionPercent, behavior.operations.viewFullContent, behavior.operations.viewFullContent.enabled, behavior.operations.viewFullContent.selectionPercent, scope, scope.mode, scope.quantity, scope.quantity.from, scope.quantity.to, scope.quantity.unit, semanticRuntime, target, target.kind, target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, timing.durationSeconds, type

**V2 key có thể có trong semantic template:** `behavior`, `behavior.mode`, `behavior.operations`, `behavior.operations.commentPost`, `behavior.operations.commentPost.content`, `behavior.operations.commentPost.content.cleanupAfterUse`, `behavior.operations.commentPost.content.mediaIds`, `behavior.operations.commentPost.content.mediaIds[]`, `behavior.operations.commentPost.content.promptId`, `behavior.operations.commentPost.content.source`, `behavior.operations.commentPost.content.text`, `behavior.operations.commentPost.content.text[]`, `behavior.operations.commentPost.enabled`, `behavior.operations.commentPost.media`, `behavior.operations.commentPost.media.enabled`, `behavior.operations.commentPost.media.mediaIds`, `behavior.operations.commentPost.media.mediaIds[]`, `behavior.operations.commentPost.media.selectionPercent`, `behavior.operations.commentPost.selectionPercent`, `behavior.operations.commentPost.sticker`, `behavior.operations.commentPost.sticker.enabled`, `behavior.operations.commentPost.tag`, `behavior.operations.commentPost.tag.enabled`, `behavior.operations.commentPost.tag.source`, `behavior.operations.commentPost.tag.uids`, `behavior.operations.commentPost.tag.uids[]`, `behavior.operations.reactionPost`, `behavior.operations.reactionPost.enabled`, `behavior.operations.reactionPost.selectionPercent`, `behavior.operations.reactionPost.selectionMode`, `behavior.operations.reactionPost.types`, `behavior.operations.reactionPost.types[]`, `behavior.operations.read`, `behavior.operations.read.enabled`, `behavior.operations.sharePost`, `behavior.operations.sharePost.content`, `behavior.operations.sharePost.content.cleanupAfterUse`, `behavior.operations.sharePost.content.mediaIds`, `behavior.operations.sharePost.content.mediaIds[]`, `behavior.operations.sharePost.content.promptId`, `behavior.operations.sharePost.content.source`, `behavior.operations.sharePost.content.text`, `behavior.operations.sharePost.content.text[]`, `behavior.operations.sharePost.destination`, `behavior.operations.sharePost.destination.groups`, `behavior.operations.sharePost.destination.groups[]`, `behavior.operations.sharePost.destination.wall`, `behavior.operations.sharePost.enabled`, `behavior.operations.sharePost.selectionPercent`, `semanticRuntime`, `semanticRuntime.postDecisionPolicy`, `semanticRuntime.postDecisionPolicy.otherwise`, `semanticRuntime.postDecisionPolicy.otherwise.behavior`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.count`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.mode`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.scope`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.max_comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.policies[]`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.policies[]`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.conditions`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.count`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.max_comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.policies[]`, `semanticRuntime.postDecisionPolicy.post_rules`, `semanticRuntime.postDecisionPolicy.post_rules[]`, `semanticRuntime.postDecisionPolicy.rule_resolution`, `semanticRuntime.postDecisionPolicy.schema_version`, `semanticRuntime.postDecisionPolicy.taxonomy`, `semanticRuntime.postDecisionPolicy.taxonomy.allow_multiple_categories`, `semanticRuntime.postDecisionPolicy.taxonomy.categories`, `semanticRuntime.postDecisionPolicy.taxonomy.categories[]`, `semanticRuntime.postDecisionPolicy.taxonomy.default_category`, `semanticRuntime.schemaVersion`, `semanticRuntime.summary`

**Legacy field áp dụng:** `nudSoLuongFrom`, `nudSoLuongTo`, `nudDelayFrom`, `nudDelayTo`, `nudTimeFrom`, `nudTimeTo`, `ckbInteract`, `nudPercentLike`, `typeReaction`, `ckbSendAnh`, `nudPercentCommentImage`, `txtAnh`, `ckbShareWall`, `nudPercentShareWall`, `txtContentShare`, `ckbComment`, `nudPercentCommentText`, `txtComment`, `ckbSticker`, `typeBinhLuan`, `ckbTaoNoiDungAI`, `cbbPrompt`, `ckbTuDongXoaNoiDung`, `cbbOptionsPost`, `nudThoiGianFrom`, `nudThoiGianTo`, `ckbViewFullContent`, `nudPercentViewFullContent`, `ckbReply`, `nudSoLuongReplyFrom`, `nudSoLuongReplyTo`, `nudDelayReplyFrom`, `nudDelayReplyTo`, `typeReactionComment`, `txtReplyComment`, `ckbTaoNoiDungAIReply`, `cbbPromptReply`, `ckbTuDongXoaNoiDungReply`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 3. `watch_video` — Tương tác watch

**Ví dụ UI:** Card "Tương tác Watch": chọn 1–5 video; thêm trường thời lượng xem.

**Capability:** `read`, `reaction`, `comment`, `share`, `ai_comment_prompt`, `view_full_content`, `reply_comment`
**Behavior operations:** `read`, `viewFullContent`, `reactionPost`, `commentPost`, `sharePost`, `replyComment`
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`, `delayBetweenTargetsSeconds`, `durationSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `watch_video` |
| Legacy interact type | `[3]` |
| Legacy semantic type | `["watch_video"]` |
| Config class cũ | `HDTuongTacWatchConfig` |
| Semantic runtime | `True` |
| Required V2 | `scope.quantity`, `scope.outer.quantity` |
| Optional V2 | `reaction` |
| Legacy field count | `42` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, behavior.operations.commentPost, behavior.operations.commentPost.content, behavior.operations.commentPost.content.cleanupAfterUse, behavior.operations.commentPost.content.mediaIds, behavior.operations.commentPost.content.mediaIds[], behavior.operations.commentPost.content.promptId, behavior.operations.commentPost.content.source, behavior.operations.commentPost.content.text, behavior.operations.commentPost.content.text[], behavior.operations.commentPost.enabled, behavior.operations.commentPost.media, behavior.operations.commentPost.media.enabled, behavior.operations.commentPost.media.mediaIds, behavior.operations.commentPost.media.mediaIds[], behavior.operations.commentPost.media.selectionPercent, behavior.operations.commentPost.selectionPercent, behavior.operations.commentPost.sticker, behavior.operations.commentPost.sticker.enabled, behavior.operations.commentPost.tag, behavior.operations.commentPost.tag.enabled, behavior.operations.commentPost.tag.source, behavior.operations.commentPost.tag.uids, behavior.operations.commentPost.tag.uids[], behavior.operations.reactionPost, behavior.operations.reactionPost.enabled, behavior.operations.reactionPost.selectionMode, behavior.operations.reactionPost.selectionPercent, behavior.operations.reactionPost.types, behavior.operations.reactionPost.types[], behavior.operations.read, behavior.operations.read.enabled, behavior.operations.replyComment, behavior.operations.replyComment.conditions, behavior.operations.replyComment.content, behavior.operations.replyComment.content.cleanupAfterUse, behavior.operations.replyComment.content.promptId, behavior.operations.replyComment.content.source, behavior.operations.replyComment.content.text, behavior.operations.replyComment.content.text[], behavior.operations.replyComment.count, behavior.operations.replyComment.delaySeconds, behavior.operations.replyComment.delaySeconds.from, behavior.operations.replyComment.delaySeconds.to, behavior.operations.replyComment.enabled, behavior.operations.replyComment.maxComment, behavior.operations.replyComment.policies, behavior.operations.replyComment.policies[], behavior.operations.replyComment.selectionMode, behavior.operations.sharePost, behavior.operations.sharePost.content, behavior.operations.sharePost.content.cleanupAfterUse, behavior.operations.sharePost.content.mediaIds, behavior.operations.sharePost.content.mediaIds[], behavior.operations.sharePost.content.promptId, behavior.operations.sharePost.content.source, behavior.operations.sharePost.content.text, behavior.operations.sharePost.content.text[], behavior.operations.sharePost.destination, behavior.operations.sharePost.destination.groups, behavior.operations.sharePost.destination.groups[], behavior.operations.sharePost.destination.wall, behavior.operations.sharePost.enabled, behavior.operations.sharePost.selectionPercent, behavior.operations.viewFullContent, behavior.operations.viewFullContent.enabled, behavior.operations.viewFullContent.selectionPercent, scope, scope.inner, scope.inner.quantity, scope.inner.quantity.from, scope.inner.quantity.to, scope.inner.quantity.unit, scope.inner.unit, scope.mode, scope.outer, scope.outer.quantity, scope.outer.quantity.from, scope.outer.quantity.to, scope.outer.quantity.unit, scope.outer.unit, scope.quantityScope, semanticRuntime, target, target.kind, target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, timing.delayBetweenTargetsSeconds, timing.delayBetweenTargetsSeconds.from, timing.delayBetweenTargetsSeconds.to, timing.durationSeconds, type

**V2 key có thể có trong semantic template:** `behavior`, `behavior.mode`, `behavior.operations`, `behavior.operations.commentPost`, `behavior.operations.commentPost.content`, `behavior.operations.commentPost.content.cleanupAfterUse`, `behavior.operations.commentPost.content.mediaIds`, `behavior.operations.commentPost.content.mediaIds[]`, `behavior.operations.commentPost.content.promptId`, `behavior.operations.commentPost.content.source`, `behavior.operations.commentPost.content.text`, `behavior.operations.commentPost.content.text[]`, `behavior.operations.commentPost.enabled`, `behavior.operations.commentPost.media`, `behavior.operations.commentPost.media.enabled`, `behavior.operations.commentPost.media.mediaIds`, `behavior.operations.commentPost.media.mediaIds[]`, `behavior.operations.commentPost.media.selectionPercent`, `behavior.operations.commentPost.selectionPercent`, `behavior.operations.commentPost.sticker`, `behavior.operations.commentPost.sticker.enabled`, `behavior.operations.commentPost.tag`, `behavior.operations.commentPost.tag.enabled`, `behavior.operations.commentPost.tag.source`, `behavior.operations.commentPost.tag.uids`, `behavior.operations.commentPost.tag.uids[]`, `behavior.operations.reactionPost`, `behavior.operations.reactionPost.enabled`, `behavior.operations.reactionPost.selectionPercent`, `behavior.operations.reactionPost.selectionMode`, `behavior.operations.reactionPost.types`, `behavior.operations.reactionPost.types[]`, `behavior.operations.read`, `behavior.operations.read.enabled`, `behavior.operations.sharePost`, `behavior.operations.sharePost.content`, `behavior.operations.sharePost.content.cleanupAfterUse`, `behavior.operations.sharePost.content.mediaIds`, `behavior.operations.sharePost.content.mediaIds[]`, `behavior.operations.sharePost.content.promptId`, `behavior.operations.sharePost.content.source`, `behavior.operations.sharePost.content.text`, `behavior.operations.sharePost.content.text[]`, `behavior.operations.sharePost.destination`, `behavior.operations.sharePost.destination.groups`, `behavior.operations.sharePost.destination.groups[]`, `behavior.operations.sharePost.destination.wall`, `behavior.operations.sharePost.enabled`, `behavior.operations.sharePost.selectionPercent`, `semanticRuntime`, `semanticRuntime.postDecisionPolicy`, `semanticRuntime.postDecisionPolicy.otherwise`, `semanticRuntime.postDecisionPolicy.otherwise.behavior`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.count`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.mode`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.scope`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.max_comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.policies[]`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.policies[]`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.conditions`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.count`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.max_comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.policies[]`, `semanticRuntime.postDecisionPolicy.post_rules`, `semanticRuntime.postDecisionPolicy.post_rules[]`, `semanticRuntime.postDecisionPolicy.rule_resolution`, `semanticRuntime.postDecisionPolicy.schema_version`, `semanticRuntime.postDecisionPolicy.taxonomy`, `semanticRuntime.postDecisionPolicy.taxonomy.allow_multiple_categories`, `semanticRuntime.postDecisionPolicy.taxonomy.categories`, `semanticRuntime.postDecisionPolicy.taxonomy.categories[]`, `semanticRuntime.postDecisionPolicy.taxonomy.default_category`, `semanticRuntime.schemaVersion`, `semanticRuntime.summary`

**Legacy field áp dụng:** `nudSoLuongFrom`, `nudSoLuongTo`, `nudDelayFrom`, `nudDelayTo`, `nudTimeFrom`, `nudTimeTo`, `ckbInteract`, `nudPercentLike`, `typeReaction`, `ckbSendAnh`, `nudPercentCommentImage`, `txtAnh`, `ckbShareWall`, `nudPercentShareWall`, `txtContentShare`, `ckbComment`, `nudPercentCommentText`, `txtComment`, `ckbSticker`, `typeBinhLuan`, `ckbTaoNoiDungAI`, `cbbPrompt`, `ckbTuDongXoaNoiDung`, `cbbOptionsPost`, `nudSouongNhomFrom`, `nudSoLuongNhomTo`, `nudThoiGianFrom`, `nudThoiGianTo`, `cbbDoiTuong`, `txtTuKhoa`, `ckbViewFullContent`, `nudPercentViewFullContent`, `ckbReply`, `nudSoLuongReplyFrom`, `nudSoLuongReplyTo`, `nudDelayReplyFrom`, `nudDelayReplyTo`, `typeReactionComment`, `txtReplyComment`, `ckbTaoNoiDungAIReply`, `cbbPromptReply`, `ckbTuDongXoaNoiDungReply`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 4. `interact_newsfeed` — Tương tác Newsfeed

**Ví dụ UI:** Card "Tương tác Newsfeed": 1–10 bài; operation Đọc, Reaction, Comment, Reply, Share.

**Capability:** `read`, `reaction.post`, `comment.post`, `share.post`, `reaction.comment`, `reply.comment`
**Behavior operations:** `read`, `reactionPost`, `commentPost`, `sharePost`, `reactionComment`, `replyComment`
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`, `durationSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `interact_newsfeed` |
| Legacy interact type | `[4]` |
| Legacy semantic type | `["read_newsfeed","like_post","comment_post","share_post"]` |
| Config class cũ | `HDTuongTacNewsFeedConfig` |
| Semantic runtime | `True` |
| Required V2 | `scope.quantity` |
| Optional V2 | `operations`, `content`, `semanticRuntime`, `viewFullContent` |
| Legacy field count | `41` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, behavior.operations.commentPost, behavior.operations.commentPost.content, behavior.operations.commentPost.content.cleanupAfterUse, behavior.operations.commentPost.content.mediaIds, behavior.operations.commentPost.content.mediaIds[], behavior.operations.commentPost.content.promptId, behavior.operations.commentPost.content.source, behavior.operations.commentPost.content.text, behavior.operations.commentPost.content.text[], behavior.operations.commentPost.enabled, behavior.operations.commentPost.media, behavior.operations.commentPost.media.enabled, behavior.operations.commentPost.media.mediaIds, behavior.operations.commentPost.media.mediaIds[], behavior.operations.commentPost.media.selectionPercent, behavior.operations.commentPost.selectionPercent, behavior.operations.commentPost.sticker, behavior.operations.commentPost.sticker.enabled, behavior.operations.commentPost.tag, behavior.operations.commentPost.tag.enabled, behavior.operations.commentPost.tag.source, behavior.operations.commentPost.tag.uids, behavior.operations.commentPost.tag.uids[], behavior.operations.reactionComment, behavior.operations.reactionComment.enabled, behavior.operations.reactionComment.maxComment, behavior.operations.reactionComment.selectionPercent, behavior.operations.reactionComment.types, behavior.operations.reactionComment.types[], behavior.operations.reactionPost, behavior.operations.reactionPost.enabled, behavior.operations.reactionPost.selectionMode, behavior.operations.reactionPost.selectionPercent, behavior.operations.reactionPost.types, behavior.operations.reactionPost.types[], behavior.operations.read, behavior.operations.read.enabled, behavior.operations.replyComment, behavior.operations.replyComment.conditions, behavior.operations.replyComment.content, behavior.operations.replyComment.content.cleanupAfterUse, behavior.operations.replyComment.content.mediaIds, behavior.operations.replyComment.content.mediaIds[], behavior.operations.replyComment.content.promptId, behavior.operations.replyComment.content.source, behavior.operations.replyComment.content.text, behavior.operations.replyComment.content.text[], behavior.operations.replyComment.count, behavior.operations.replyComment.delaySeconds, behavior.operations.replyComment.delaySeconds.from, behavior.operations.replyComment.delaySeconds.to, behavior.operations.replyComment.enabled, behavior.operations.replyComment.maxComment, behavior.operations.replyComment.policies, behavior.operations.replyComment.policies[], behavior.operations.replyComment.selectionMode, behavior.operations.sharePost, behavior.operations.sharePost.content, behavior.operations.sharePost.content.cleanupAfterUse, behavior.operations.sharePost.content.mediaIds, behavior.operations.sharePost.content.mediaIds[], behavior.operations.sharePost.content.promptId, behavior.operations.sharePost.content.source, behavior.operations.sharePost.content.text, behavior.operations.sharePost.content.text[], behavior.operations.sharePost.destination, behavior.operations.sharePost.destination.groups, behavior.operations.sharePost.destination.groups[], behavior.operations.sharePost.destination.wall, behavior.operations.sharePost.enabled, behavior.operations.sharePost.selectionPercent, scope, scope.mode, scope.quantity, scope.quantity.from, scope.quantity.to, scope.quantity.unit, semanticRuntime, target, target.kind, target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, timing.durationSeconds, type

**V2 key có thể có trong semantic template:** `behavior`, `behavior.mode`, `behavior.operations`, `behavior.operations.commentPost`, `behavior.operations.commentPost.content`, `behavior.operations.commentPost.content.cleanupAfterUse`, `behavior.operations.commentPost.content.mediaIds`, `behavior.operations.commentPost.content.mediaIds[]`, `behavior.operations.commentPost.content.promptId`, `behavior.operations.commentPost.content.source`, `behavior.operations.commentPost.content.text`, `behavior.operations.commentPost.content.text[]`, `behavior.operations.commentPost.enabled`, `behavior.operations.commentPost.media`, `behavior.operations.commentPost.media.enabled`, `behavior.operations.commentPost.media.mediaIds`, `behavior.operations.commentPost.media.mediaIds[]`, `behavior.operations.commentPost.media.selectionPercent`, `behavior.operations.commentPost.selectionPercent`, `behavior.operations.commentPost.sticker`, `behavior.operations.commentPost.sticker.enabled`, `behavior.operations.commentPost.tag`, `behavior.operations.commentPost.tag.enabled`, `behavior.operations.commentPost.tag.source`, `behavior.operations.commentPost.tag.uids`, `behavior.operations.commentPost.tag.uids[]`, `behavior.operations.reactionComment`, `behavior.operations.reactionComment.enabled`, `behavior.operations.reactionComment.maxComment`, `behavior.operations.reactionComment.selectionPercent`, `behavior.operations.reactionComment.types`, `behavior.operations.reactionComment.types[]`, `behavior.operations.reactionPost`, `behavior.operations.reactionPost.enabled`, `behavior.operations.reactionPost.selectionPercent`, `behavior.operations.reactionPost.selectionMode`, `behavior.operations.reactionPost.types`, `behavior.operations.reactionPost.types[]`, `behavior.operations.read`, `behavior.operations.read.enabled`, `behavior.operations.replyComment`, `behavior.operations.replyComment.conditions`, `behavior.operations.replyComment.content`, `behavior.operations.replyComment.content.cleanupAfterUse`, `behavior.operations.replyComment.content.mediaIds`, `behavior.operations.replyComment.content.mediaIds[]`, `behavior.operations.replyComment.content.promptId`, `behavior.operations.replyComment.content.source`, `behavior.operations.replyComment.content.text`, `behavior.operations.replyComment.content.text[]`, `behavior.operations.replyComment.count`, `behavior.operations.replyComment.delaySeconds`, `behavior.operations.replyComment.delaySeconds.from`, `behavior.operations.replyComment.delaySeconds.to`, `behavior.operations.replyComment.enabled`, `behavior.operations.replyComment.maxComment`, `behavior.operations.replyComment.policies`, `behavior.operations.replyComment.policies[]`, `behavior.operations.replyComment.selectionMode`, `behavior.operations.sharePost`, `behavior.operations.sharePost.content`, `behavior.operations.sharePost.content.cleanupAfterUse`, `behavior.operations.sharePost.content.mediaIds`, `behavior.operations.sharePost.content.mediaIds[]`, `behavior.operations.sharePost.content.promptId`, `behavior.operations.sharePost.content.source`, `behavior.operations.sharePost.content.text`, `behavior.operations.sharePost.content.text[]`, `behavior.operations.sharePost.destination`, `behavior.operations.sharePost.destination.groups`, `behavior.operations.sharePost.destination.groups[]`, `behavior.operations.sharePost.destination.wall`, `behavior.operations.sharePost.enabled`, `behavior.operations.sharePost.selectionPercent`, `semanticRuntime`, `semanticRuntime.postDecisionPolicy`, `semanticRuntime.postDecisionPolicy.otherwise`, `semanticRuntime.postDecisionPolicy.otherwise.behavior`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.count`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.mode`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.scope`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.max_comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.policies[]`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.policies[]`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.conditions`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.count`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.max_comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.policies[]`, `semanticRuntime.postDecisionPolicy.post_rules`, `semanticRuntime.postDecisionPolicy.post_rules[]`, `semanticRuntime.postDecisionPolicy.rule_resolution`, `semanticRuntime.postDecisionPolicy.schema_version`, `semanticRuntime.postDecisionPolicy.taxonomy`, `semanticRuntime.postDecisionPolicy.taxonomy.allow_multiple_categories`, `semanticRuntime.postDecisionPolicy.taxonomy.categories`, `semanticRuntime.postDecisionPolicy.taxonomy.categories[]`, `semanticRuntime.postDecisionPolicy.taxonomy.default_category`, `semanticRuntime.schemaVersion`, `semanticRuntime.summary`

**Legacy field áp dụng:** `nudSoLuongFrom`, `nudSoLuongTo`, `nudDelayFrom`, `nudDelayTo`, `nudTimeFrom`, `nudTimeTo`, `ckbInteract`, `nudPercentLike`, `typeReaction`, `ckbSendAnh`, `nudPercentCommentImage`, `txtAnh`, `ckbShareWall`, `nudPercentShareWall`, `txtContentShare`, `ckbComment`, `nudPercentCommentText`, `txtComment`, `ckbSticker`, `typeBinhLuan`, `ckbTaoNoiDungAI`, `cbbPrompt`, `ckbTuDongXoaNoiDung`, `cbbOptionsPost`, `nudThoiGianFrom`, `nudThoiGianTo`, `txtTuKhoa`, `ckbDieuKien`, `nudLuotToiDa`, `ckbViewFullContent`, `nudPercentViewFullContent`, `ckbReply`, `nudSoLuongReplyFrom`, `nudSoLuongReplyTo`, `nudDelayReplyFrom`, `nudDelayReplyTo`, `typeReactionComment`, `txtReplyComment`, `ckbTaoNoiDungAIReply`, `cbbPromptReply`, `ckbTuDongXoaNoiDungReply`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 5. `interact_friends` — Tương tác bạn bè

**Ví dụ UI:** Card "Tương tác bạn bè": chọn số bạn; operation nội dung mở theo capability.

**Capability:** `read`, `reaction`, `comment`, `share`, `ai_comment_prompt`, `view_full_content`, `reply_comment`
**Behavior operations:** `read`, `viewFullContent`, `reactionPost`, `commentPost`, `sharePost`, `replyComment`
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`, `delayBetweenTargetsSeconds`, `durationSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `interact_friends` |
| Legacy interact type | `[5]` |
| Legacy semantic type | `["interact_friends"]` |
| Config class cũ | `HDTuongTacBanBeConfig` |
| Semantic runtime | `True` |
| Required V2 | `scope.quantity`, `scope.outer.quantity` |
| Optional V2 | `reaction` |
| Legacy field count | `40` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, behavior.operations.commentPost, behavior.operations.commentPost.content, behavior.operations.commentPost.content.cleanupAfterUse, behavior.operations.commentPost.content.mediaIds, behavior.operations.commentPost.content.mediaIds[], behavior.operations.commentPost.content.promptId, behavior.operations.commentPost.content.source, behavior.operations.commentPost.content.text, behavior.operations.commentPost.content.text[], behavior.operations.commentPost.enabled, behavior.operations.commentPost.media, behavior.operations.commentPost.media.enabled, behavior.operations.commentPost.media.mediaIds, behavior.operations.commentPost.media.mediaIds[], behavior.operations.commentPost.media.selectionPercent, behavior.operations.commentPost.selectionPercent, behavior.operations.commentPost.sticker, behavior.operations.commentPost.sticker.enabled, behavior.operations.commentPost.tag, behavior.operations.commentPost.tag.enabled, behavior.operations.commentPost.tag.source, behavior.operations.commentPost.tag.uids, behavior.operations.commentPost.tag.uids[], behavior.operations.reactionPost, behavior.operations.reactionPost.enabled, behavior.operations.reactionPost.selectionMode, behavior.operations.reactionPost.selectionPercent, behavior.operations.reactionPost.types, behavior.operations.reactionPost.types[], behavior.operations.read, behavior.operations.read.enabled, behavior.operations.replyComment, behavior.operations.replyComment.conditions, behavior.operations.replyComment.content, behavior.operations.replyComment.content.cleanupAfterUse, behavior.operations.replyComment.content.promptId, behavior.operations.replyComment.content.source, behavior.operations.replyComment.content.text, behavior.operations.replyComment.content.text[], behavior.operations.replyComment.count, behavior.operations.replyComment.delaySeconds, behavior.operations.replyComment.delaySeconds.from, behavior.operations.replyComment.delaySeconds.to, behavior.operations.replyComment.enabled, behavior.operations.replyComment.maxComment, behavior.operations.replyComment.policies, behavior.operations.replyComment.policies[], behavior.operations.replyComment.selectionMode, behavior.operations.sharePost, behavior.operations.sharePost.content, behavior.operations.sharePost.content.cleanupAfterUse, behavior.operations.sharePost.content.mediaIds, behavior.operations.sharePost.content.mediaIds[], behavior.operations.sharePost.content.promptId, behavior.operations.sharePost.content.source, behavior.operations.sharePost.content.text, behavior.operations.sharePost.content.text[], behavior.operations.sharePost.destination, behavior.operations.sharePost.destination.groups, behavior.operations.sharePost.destination.groups[], behavior.operations.sharePost.destination.wall, behavior.operations.sharePost.enabled, behavior.operations.sharePost.selectionPercent, behavior.operations.viewFullContent, behavior.operations.viewFullContent.enabled, behavior.operations.viewFullContent.selectionPercent, scope, scope.inner, scope.inner.quantity, scope.inner.quantity.from, scope.inner.quantity.to, scope.inner.quantity.unit, scope.inner.unit, scope.mode, scope.outer, scope.outer.quantity, scope.outer.quantity.from, scope.outer.quantity.to, scope.outer.quantity.unit, scope.outer.unit, scope.quantityScope, semanticRuntime, target, target.kind, target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, timing.delayBetweenTargetsSeconds, timing.delayBetweenTargetsSeconds.from, timing.delayBetweenTargetsSeconds.to, timing.durationSeconds, type

**V2 key có thể có trong semantic template:** `behavior`, `behavior.mode`, `behavior.operations`, `behavior.operations.commentPost`, `behavior.operations.commentPost.content`, `behavior.operations.commentPost.content.cleanupAfterUse`, `behavior.operations.commentPost.content.mediaIds`, `behavior.operations.commentPost.content.mediaIds[]`, `behavior.operations.commentPost.content.promptId`, `behavior.operations.commentPost.content.source`, `behavior.operations.commentPost.content.text`, `behavior.operations.commentPost.content.text[]`, `behavior.operations.commentPost.enabled`, `behavior.operations.commentPost.media`, `behavior.operations.commentPost.media.enabled`, `behavior.operations.commentPost.media.mediaIds`, `behavior.operations.commentPost.media.mediaIds[]`, `behavior.operations.commentPost.media.selectionPercent`, `behavior.operations.commentPost.selectionPercent`, `behavior.operations.commentPost.sticker`, `behavior.operations.commentPost.sticker.enabled`, `behavior.operations.commentPost.tag`, `behavior.operations.commentPost.tag.enabled`, `behavior.operations.commentPost.tag.source`, `behavior.operations.commentPost.tag.uids`, `behavior.operations.commentPost.tag.uids[]`, `behavior.operations.reactionPost`, `behavior.operations.reactionPost.enabled`, `behavior.operations.reactionPost.selectionPercent`, `behavior.operations.reactionPost.selectionMode`, `behavior.operations.reactionPost.types`, `behavior.operations.reactionPost.types[]`, `behavior.operations.read`, `behavior.operations.read.enabled`, `behavior.operations.sharePost`, `behavior.operations.sharePost.content`, `behavior.operations.sharePost.content.cleanupAfterUse`, `behavior.operations.sharePost.content.mediaIds`, `behavior.operations.sharePost.content.mediaIds[]`, `behavior.operations.sharePost.content.promptId`, `behavior.operations.sharePost.content.source`, `behavior.operations.sharePost.content.text`, `behavior.operations.sharePost.content.text[]`, `behavior.operations.sharePost.destination`, `behavior.operations.sharePost.destination.groups`, `behavior.operations.sharePost.destination.groups[]`, `behavior.operations.sharePost.destination.wall`, `behavior.operations.sharePost.enabled`, `behavior.operations.sharePost.selectionPercent`, `semanticRuntime`, `semanticRuntime.postDecisionPolicy`, `semanticRuntime.postDecisionPolicy.otherwise`, `semanticRuntime.postDecisionPolicy.otherwise.behavior`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.count`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.mode`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.scope`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.max_comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.policies[]`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.policies[]`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.conditions`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.count`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.max_comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.policies[]`, `semanticRuntime.postDecisionPolicy.post_rules`, `semanticRuntime.postDecisionPolicy.post_rules[]`, `semanticRuntime.postDecisionPolicy.rule_resolution`, `semanticRuntime.postDecisionPolicy.schema_version`, `semanticRuntime.postDecisionPolicy.taxonomy`, `semanticRuntime.postDecisionPolicy.taxonomy.allow_multiple_categories`, `semanticRuntime.postDecisionPolicy.taxonomy.categories`, `semanticRuntime.postDecisionPolicy.taxonomy.categories[]`, `semanticRuntime.postDecisionPolicy.taxonomy.default_category`, `semanticRuntime.schemaVersion`, `semanticRuntime.summary`

**Legacy field áp dụng:** `nudSoLuongFrom`, `nudSoLuongTo`, `nudDelayFrom`, `nudDelayTo`, `nudTimeFrom`, `nudTimeTo`, `ckbInteract`, `nudPercentLike`, `typeReaction`, `ckbSendAnh`, `nudPercentCommentImage`, `txtAnh`, `ckbShareWall`, `nudPercentShareWall`, `txtContentShare`, `ckbComment`, `nudPercentCommentText`, `txtComment`, `ckbSticker`, `typeBinhLuan`, `ckbTaoNoiDungAI`, `cbbPrompt`, `ckbTuDongXoaNoiDung`, `cbbOptionsPost`, `nudThoiGianFrom`, `nudThoiGianTo`, `nudSoLuongBanFrom`, `nudSoLuongBanTo`, `ckbViewFullContent`, `nudPercentViewFullContent`, `ckbReply`, `nudSoLuongReplyFrom`, `nudSoLuongReplyTo`, `nudDelayReplyFrom`, `nudDelayReplyTo`, `typeReactionComment`, `txtReplyComment`, `ckbTaoNoiDungAIReply`, `cbbPromptReply`, `ckbTuDongXoaNoiDungReply`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 6. `interact_page` — Tương tác page

**Ví dụ UI:** Card "Tương tác Page": chọn Page và số bài/Page; operation trong accordion.

**Capability:** `read`, `reaction`, `comment`, `share`, `ai_comment_prompt`, `view_full_content`, `reply_comment`
**Behavior operations:** `read`, `viewFullContent`, `reactionPost`, `commentPost`, `sharePost`, `replyComment`
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`, `delayBetweenTargetsSeconds`, `durationSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `interact_page` |
| Legacy interact type | `[6]` |
| Legacy semantic type | `["interact_page"]` |
| Config class cũ | `HDTuongTacPageConfig` |
| Semantic runtime | `True` |
| Required V2 | `scope.quantity`, `scope.outer.quantity` |
| Optional V2 | `reaction` |
| Legacy field count | `44` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, behavior.operations.commentPost, behavior.operations.commentPost.content, behavior.operations.commentPost.content.cleanupAfterUse, behavior.operations.commentPost.content.mediaIds, behavior.operations.commentPost.content.mediaIds[], behavior.operations.commentPost.content.promptId, behavior.operations.commentPost.content.source, behavior.operations.commentPost.content.text, behavior.operations.commentPost.content.text[], behavior.operations.commentPost.enabled, behavior.operations.commentPost.media, behavior.operations.commentPost.media.enabled, behavior.operations.commentPost.media.mediaIds, behavior.operations.commentPost.media.mediaIds[], behavior.operations.commentPost.media.selectionPercent, behavior.operations.commentPost.selectionPercent, behavior.operations.commentPost.sticker, behavior.operations.commentPost.sticker.enabled, behavior.operations.commentPost.tag, behavior.operations.commentPost.tag.enabled, behavior.operations.commentPost.tag.source, behavior.operations.commentPost.tag.uids, behavior.operations.commentPost.tag.uids[], behavior.operations.reactionPost, behavior.operations.reactionPost.enabled, behavior.operations.reactionPost.selectionMode, behavior.operations.reactionPost.selectionPercent, behavior.operations.reactionPost.types, behavior.operations.reactionPost.types[], behavior.operations.read, behavior.operations.read.enabled, behavior.operations.replyComment, behavior.operations.replyComment.conditions, behavior.operations.replyComment.content, behavior.operations.replyComment.content.cleanupAfterUse, behavior.operations.replyComment.content.promptId, behavior.operations.replyComment.content.source, behavior.operations.replyComment.content.text, behavior.operations.replyComment.content.text[], behavior.operations.replyComment.count, behavior.operations.replyComment.delaySeconds, behavior.operations.replyComment.delaySeconds.from, behavior.operations.replyComment.delaySeconds.to, behavior.operations.replyComment.enabled, behavior.operations.replyComment.maxComment, behavior.operations.replyComment.policies, behavior.operations.replyComment.policies[], behavior.operations.replyComment.selectionMode, behavior.operations.sharePost, behavior.operations.sharePost.content, behavior.operations.sharePost.content.cleanupAfterUse, behavior.operations.sharePost.content.mediaIds, behavior.operations.sharePost.content.mediaIds[], behavior.operations.sharePost.content.promptId, behavior.operations.sharePost.content.source, behavior.operations.sharePost.content.text, behavior.operations.sharePost.content.text[], behavior.operations.sharePost.destination, behavior.operations.sharePost.destination.groups, behavior.operations.sharePost.destination.groups[], behavior.operations.sharePost.destination.wall, behavior.operations.sharePost.enabled, behavior.operations.sharePost.selectionPercent, behavior.operations.viewFullContent, behavior.operations.viewFullContent.enabled, behavior.operations.viewFullContent.selectionPercent, scope, scope.inner, scope.inner.quantity, scope.inner.quantity.from, scope.inner.quantity.to, scope.inner.quantity.unit, scope.inner.unit, scope.mode, scope.outer, scope.outer.quantity, scope.outer.quantity.from, scope.outer.quantity.to, scope.outer.quantity.unit, scope.outer.unit, scope.quantityScope, semanticRuntime, target, target.kind, target.pageIds, target.pageIds[], target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, timing.delayBetweenTargetsSeconds, timing.delayBetweenTargetsSeconds.from, timing.delayBetweenTargetsSeconds.to, timing.durationSeconds, type

**V2 key có thể có trong semantic template:** `behavior`, `behavior.mode`, `behavior.operations`, `behavior.operations.commentPost`, `behavior.operations.commentPost.content`, `behavior.operations.commentPost.content.cleanupAfterUse`, `behavior.operations.commentPost.content.mediaIds`, `behavior.operations.commentPost.content.mediaIds[]`, `behavior.operations.commentPost.content.promptId`, `behavior.operations.commentPost.content.source`, `behavior.operations.commentPost.content.text`, `behavior.operations.commentPost.content.text[]`, `behavior.operations.commentPost.enabled`, `behavior.operations.commentPost.media`, `behavior.operations.commentPost.media.enabled`, `behavior.operations.commentPost.media.mediaIds`, `behavior.operations.commentPost.media.mediaIds[]`, `behavior.operations.commentPost.media.selectionPercent`, `behavior.operations.commentPost.selectionPercent`, `behavior.operations.commentPost.sticker`, `behavior.operations.commentPost.sticker.enabled`, `behavior.operations.commentPost.tag`, `behavior.operations.commentPost.tag.enabled`, `behavior.operations.commentPost.tag.source`, `behavior.operations.commentPost.tag.uids`, `behavior.operations.commentPost.tag.uids[]`, `behavior.operations.reactionPost`, `behavior.operations.reactionPost.enabled`, `behavior.operations.reactionPost.selectionPercent`, `behavior.operations.reactionPost.selectionMode`, `behavior.operations.reactionPost.types`, `behavior.operations.reactionPost.types[]`, `behavior.operations.read`, `behavior.operations.read.enabled`, `behavior.operations.sharePost`, `behavior.operations.sharePost.content`, `behavior.operations.sharePost.content.cleanupAfterUse`, `behavior.operations.sharePost.content.mediaIds`, `behavior.operations.sharePost.content.mediaIds[]`, `behavior.operations.sharePost.content.promptId`, `behavior.operations.sharePost.content.source`, `behavior.operations.sharePost.content.text`, `behavior.operations.sharePost.content.text[]`, `behavior.operations.sharePost.destination`, `behavior.operations.sharePost.destination.groups`, `behavior.operations.sharePost.destination.groups[]`, `behavior.operations.sharePost.destination.wall`, `behavior.operations.sharePost.enabled`, `behavior.operations.sharePost.selectionPercent`, `semanticRuntime`, `semanticRuntime.postDecisionPolicy`, `semanticRuntime.postDecisionPolicy.otherwise`, `semanticRuntime.postDecisionPolicy.otherwise.behavior`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.count`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.mode`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.scope`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.max_comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.policies[]`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.policies[]`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.conditions`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.count`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.max_comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.policies[]`, `semanticRuntime.postDecisionPolicy.post_rules`, `semanticRuntime.postDecisionPolicy.post_rules[]`, `semanticRuntime.postDecisionPolicy.rule_resolution`, `semanticRuntime.postDecisionPolicy.schema_version`, `semanticRuntime.postDecisionPolicy.taxonomy`, `semanticRuntime.postDecisionPolicy.taxonomy.allow_multiple_categories`, `semanticRuntime.postDecisionPolicy.taxonomy.categories`, `semanticRuntime.postDecisionPolicy.taxonomy.categories[]`, `semanticRuntime.postDecisionPolicy.taxonomy.default_category`, `semanticRuntime.schemaVersion`, `semanticRuntime.summary`

**Legacy field áp dụng:** `nudSoLuongFrom`, `nudSoLuongTo`, `nudDelayFrom`, `nudDelayTo`, `nudTimeFrom`, `nudTimeTo`, `ckbInteract`, `nudPercentLike`, `typeReaction`, `ckbSendAnh`, `nudPercentCommentImage`, `txtAnh`, `ckbShareWall`, `nudPercentShareWall`, `txtContentShare`, `ckbComment`, `nudPercentCommentText`, `txtComment`, `ckbSticker`, `typeBinhLuan`, `ckbTaoNoiDungAI`, `cbbPrompt`, `ckbTuDongXoaNoiDung`, `cbbOptionsPost`, `nudSouongNhomFrom`, `nudSoLuongNhomTo`, `nudThoiGianFrom`, `nudThoiGianTo`, `nudSoLuongProfileFrom`, `nudSoLuongProfileTo`, `txtId`, `ckbLikePage`, `ckbViewFullContent`, `nudPercentViewFullContent`, `ckbReply`, `nudSoLuongReplyFrom`, `nudSoLuongReplyTo`, `nudDelayReplyFrom`, `nudDelayReplyTo`, `typeReactionComment`, `txtReplyComment`, `ckbTaoNoiDungAIReply`, `cbbPromptReply`, `ckbTuDongXoaNoiDungReply`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 7. `interact_profile` — Tương tác profile

**Ví dụ UI:** Card "Tương tác Profile": chọn profile và số item.

**Capability:** `read`, `reaction`, `comment`, `share`, `ai_comment_prompt`, `view_full_content`, `reply_comment`
**Behavior operations:** `read`, `viewFullContent`, `reactionPost`, `commentPost`, `sharePost`, `replyComment`
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`, `delayBetweenTargetsSeconds`, `durationSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `interact_profile` |
| Legacy interact type | `[7]` |
| Legacy semantic type | `["interact_profile"]` |
| Config class cũ | `HDTuongTacProfileConfig` |
| Semantic runtime | `True` |
| Required V2 | `scope.quantity`, `scope.outer.quantity` |
| Optional V2 | `reaction` |
| Legacy field count | `44` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, behavior.operations.commentPost, behavior.operations.commentPost.content, behavior.operations.commentPost.content.cleanupAfterUse, behavior.operations.commentPost.content.mediaIds, behavior.operations.commentPost.content.mediaIds[], behavior.operations.commentPost.content.promptId, behavior.operations.commentPost.content.source, behavior.operations.commentPost.content.text, behavior.operations.commentPost.content.text[], behavior.operations.commentPost.enabled, behavior.operations.commentPost.media, behavior.operations.commentPost.media.enabled, behavior.operations.commentPost.media.mediaIds, behavior.operations.commentPost.media.mediaIds[], behavior.operations.commentPost.media.selectionPercent, behavior.operations.commentPost.selectionPercent, behavior.operations.commentPost.sticker, behavior.operations.commentPost.sticker.enabled, behavior.operations.commentPost.tag, behavior.operations.commentPost.tag.enabled, behavior.operations.commentPost.tag.source, behavior.operations.commentPost.tag.uids, behavior.operations.commentPost.tag.uids[], behavior.operations.reactionPost, behavior.operations.reactionPost.enabled, behavior.operations.reactionPost.selectionMode, behavior.operations.reactionPost.selectionPercent, behavior.operations.reactionPost.types, behavior.operations.reactionPost.types[], behavior.operations.read, behavior.operations.read.enabled, behavior.operations.replyComment, behavior.operations.replyComment.conditions, behavior.operations.replyComment.content, behavior.operations.replyComment.content.cleanupAfterUse, behavior.operations.replyComment.content.promptId, behavior.operations.replyComment.content.source, behavior.operations.replyComment.content.text, behavior.operations.replyComment.content.text[], behavior.operations.replyComment.count, behavior.operations.replyComment.delaySeconds, behavior.operations.replyComment.delaySeconds.from, behavior.operations.replyComment.delaySeconds.to, behavior.operations.replyComment.enabled, behavior.operations.replyComment.maxComment, behavior.operations.replyComment.policies, behavior.operations.replyComment.policies[], behavior.operations.replyComment.selectionMode, behavior.operations.sharePost, behavior.operations.sharePost.content, behavior.operations.sharePost.content.cleanupAfterUse, behavior.operations.sharePost.content.mediaIds, behavior.operations.sharePost.content.mediaIds[], behavior.operations.sharePost.content.promptId, behavior.operations.sharePost.content.source, behavior.operations.sharePost.content.text, behavior.operations.sharePost.content.text[], behavior.operations.sharePost.destination, behavior.operations.sharePost.destination.groups, behavior.operations.sharePost.destination.groups[], behavior.operations.sharePost.destination.wall, behavior.operations.sharePost.enabled, behavior.operations.sharePost.selectionPercent, behavior.operations.viewFullContent, behavior.operations.viewFullContent.enabled, behavior.operations.viewFullContent.selectionPercent, scope, scope.inner, scope.inner.quantity, scope.inner.quantity.from, scope.inner.quantity.to, scope.inner.quantity.unit, scope.inner.unit, scope.mode, scope.outer, scope.outer.quantity, scope.outer.quantity.from, scope.outer.quantity.to, scope.outer.quantity.unit, scope.outer.unit, scope.quantityScope, semanticRuntime, target, target.kind, target.profileIds, target.profileIds[], target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, timing.delayBetweenTargetsSeconds, timing.delayBetweenTargetsSeconds.from, timing.delayBetweenTargetsSeconds.to, timing.durationSeconds, type

**V2 key có thể có trong semantic template:** `behavior`, `behavior.mode`, `behavior.operations`, `behavior.operations.commentPost`, `behavior.operations.commentPost.content`, `behavior.operations.commentPost.content.cleanupAfterUse`, `behavior.operations.commentPost.content.mediaIds`, `behavior.operations.commentPost.content.mediaIds[]`, `behavior.operations.commentPost.content.promptId`, `behavior.operations.commentPost.content.source`, `behavior.operations.commentPost.content.text`, `behavior.operations.commentPost.content.text[]`, `behavior.operations.commentPost.enabled`, `behavior.operations.commentPost.media`, `behavior.operations.commentPost.media.enabled`, `behavior.operations.commentPost.media.mediaIds`, `behavior.operations.commentPost.media.mediaIds[]`, `behavior.operations.commentPost.media.selectionPercent`, `behavior.operations.commentPost.selectionPercent`, `behavior.operations.commentPost.sticker`, `behavior.operations.commentPost.sticker.enabled`, `behavior.operations.commentPost.tag`, `behavior.operations.commentPost.tag.enabled`, `behavior.operations.commentPost.tag.source`, `behavior.operations.commentPost.tag.uids`, `behavior.operations.commentPost.tag.uids[]`, `behavior.operations.reactionPost`, `behavior.operations.reactionPost.enabled`, `behavior.operations.reactionPost.selectionPercent`, `behavior.operations.reactionPost.selectionMode`, `behavior.operations.reactionPost.types`, `behavior.operations.reactionPost.types[]`, `behavior.operations.read`, `behavior.operations.read.enabled`, `behavior.operations.sharePost`, `behavior.operations.sharePost.content`, `behavior.operations.sharePost.content.cleanupAfterUse`, `behavior.operations.sharePost.content.mediaIds`, `behavior.operations.sharePost.content.mediaIds[]`, `behavior.operations.sharePost.content.promptId`, `behavior.operations.sharePost.content.source`, `behavior.operations.sharePost.content.text`, `behavior.operations.sharePost.content.text[]`, `behavior.operations.sharePost.destination`, `behavior.operations.sharePost.destination.groups`, `behavior.operations.sharePost.destination.groups[]`, `behavior.operations.sharePost.destination.wall`, `behavior.operations.sharePost.enabled`, `behavior.operations.sharePost.selectionPercent`, `semanticRuntime`, `semanticRuntime.postDecisionPolicy`, `semanticRuntime.postDecisionPolicy.otherwise`, `semanticRuntime.postDecisionPolicy.otherwise.behavior`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.count`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.mode`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.scope`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.max_comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.policies[]`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.policies[]`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.conditions`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.count`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.max_comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.policies[]`, `semanticRuntime.postDecisionPolicy.post_rules`, `semanticRuntime.postDecisionPolicy.post_rules[]`, `semanticRuntime.postDecisionPolicy.rule_resolution`, `semanticRuntime.postDecisionPolicy.schema_version`, `semanticRuntime.postDecisionPolicy.taxonomy`, `semanticRuntime.postDecisionPolicy.taxonomy.allow_multiple_categories`, `semanticRuntime.postDecisionPolicy.taxonomy.categories`, `semanticRuntime.postDecisionPolicy.taxonomy.categories[]`, `semanticRuntime.postDecisionPolicy.taxonomy.default_category`, `semanticRuntime.schemaVersion`, `semanticRuntime.summary`

**Legacy field áp dụng:** `nudSoLuongFrom`, `nudSoLuongTo`, `nudDelayFrom`, `nudDelayTo`, `nudTimeFrom`, `nudTimeTo`, `ckbInteract`, `nudPercentLike`, `typeReaction`, `ckbSendAnh`, `nudPercentCommentImage`, `txtAnh`, `ckbShareWall`, `nudPercentShareWall`, `txtContentShare`, `ckbComment`, `nudPercentCommentText`, `txtComment`, `ckbSticker`, `typeBinhLuan`, `ckbTaoNoiDungAI`, `cbbPrompt`, `ckbTuDongXoaNoiDung`, `cbbOptionsPost`, `nudThoiGianFrom`, `nudThoiGianTo`, `ckbPublicPost`, `ckbPrivatePost`, `txtId`, `cbbDoiTuong`, `nudSoLuongProfileFrom`, `nudSoLuongProfileTo`, `ckbViewFullContent`, `nudPercentViewFullContent`, `ckbReply`, `nudSoLuongReplyFrom`, `nudSoLuongReplyTo`, `nudDelayReplyFrom`, `nudDelayReplyTo`, `typeReactionComment`, `txtReplyComment`, `ckbTaoNoiDungAIReply`, `cbbPromptReply`, `ckbTuDongXoaNoiDungReply`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 8. `add_friend_keyword` — Kết bạn theo từ khóa

**Ví dụ UI:** Form "Kết bạn theo từ khóa": từ khóa + số lượng lời mời.

**Capability:** `quantity`, `keyword`
**Behavior operations:** (không có)
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `add_friend_keyword` |
| Legacy interact type | `[8]` |
| Legacy semantic type | `["add_friend_keyword"]` |
| Config class cũ | `HDKetBanTheoTuKhoaConfig` |
| Semantic runtime | `False` |
| Required V2 | `scope.quantity`, `target.keywords` |
| Optional V2 | `(không có)` |
| Legacy field count | `7` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, scope, scope.mode, scope.quantity, scope.quantity.from, scope.quantity.to, scope.quantity.unit, semanticRuntime, target, target.keywords, target.keywords[], target.kind, target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, type

**V2 key có thể có trong semantic template:** `không có`

**Legacy field áp dụng:** `nudSoLuongFrom`, `nudSoLuongTo`, `nudDelayFrom`, `nudDelayTo`, `nudSoLuongKetBanMoiTuKhoaFrom`, `nudSoLuongKetBanMoiTuKhoaTo`, `txtTuKhoa`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 9. `add_friend_uid_file` — Kết bạn theo tệp UID

**Ví dụ UI:** Form "Kết bạn theo tệp UID": upload CSV/TXT + số lượng.

**Capability:** `quantity`, `uid_file`, `reply_comment`
**Behavior operations:** `replyComment`
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`, `durationSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `add_friend_uid_file` |
| Legacy interact type | `[9]` |
| Legacy semantic type | `["add_friend_uid_file"]` |
| Config class cũ | `HDKetBanTepUidConfig` |
| Semantic runtime | `True` |
| Required V2 | `scope.quantity`, `target.uidFile` |
| Optional V2 | `(không có)` |
| Legacy field count | `50` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, behavior.operations.replyComment, behavior.operations.replyComment.conditions, behavior.operations.replyComment.content, behavior.operations.replyComment.content.cleanupAfterUse, behavior.operations.replyComment.content.promptId, behavior.operations.replyComment.content.source, behavior.operations.replyComment.content.text, behavior.operations.replyComment.content.text[], behavior.operations.replyComment.count, behavior.operations.replyComment.delaySeconds, behavior.operations.replyComment.delaySeconds.from, behavior.operations.replyComment.delaySeconds.to, behavior.operations.replyComment.enabled, behavior.operations.replyComment.maxComment, behavior.operations.replyComment.policies, behavior.operations.replyComment.policies[], behavior.operations.replyComment.selectionMode, scope, scope.mode, scope.quantity, scope.quantity.from, scope.quantity.to, scope.quantity.unit, semanticRuntime, target, target.kind, target.selectionMode, target.uidFile, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, timing.durationSeconds, type

**V2 key có thể có trong semantic template:** `behavior`, `behavior.mode`, `behavior.operations`, `semanticRuntime`, `semanticRuntime.postDecisionPolicy`, `semanticRuntime.postDecisionPolicy.otherwise`, `semanticRuntime.postDecisionPolicy.otherwise.behavior`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.count`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.mode`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.scope`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.max_comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.policies[]`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.policies[]`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.conditions`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.count`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.max_comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.policies[]`, `semanticRuntime.postDecisionPolicy.post_rules`, `semanticRuntime.postDecisionPolicy.post_rules[]`, `semanticRuntime.postDecisionPolicy.rule_resolution`, `semanticRuntime.postDecisionPolicy.schema_version`, `semanticRuntime.postDecisionPolicy.taxonomy`, `semanticRuntime.postDecisionPolicy.taxonomy.allow_multiple_categories`, `semanticRuntime.postDecisionPolicy.taxonomy.categories`, `semanticRuntime.postDecisionPolicy.taxonomy.categories[]`, `semanticRuntime.postDecisionPolicy.taxonomy.default_category`, `semanticRuntime.schemaVersion`, `semanticRuntime.summary`

**Legacy field áp dụng:** `nudSoLuongFrom`, `nudSoLuongTo`, `nudDelayFrom`, `nudDelayTo`, `nudTimeFrom`, `nudTimeTo`, `ckbInteract`, `nudPercentLike`, `typeReaction`, `ckbSendAnh`, `nudPercentCommentImage`, `txtAnh`, `ckbShareWall`, `nudPercentShareWall`, `txtContentShare`, `ckbComment`, `nudPercentCommentText`, `txtComment`, `ckbSticker`, `typeBinhLuan`, `nudPostFrom`, `nudPostTo`, `ckbTuongTac`, `nudSoLuongBaiVietFrom`, `nudSoLuongBaiVietTo`, `nudTuongTacDelayFrom`, `nudTuongTacDelayTo`, `ckbTuongTacLike`, `ckbTuongTacComment`, `ckbKetBanTrungNhau`, `ckbBinhLuanNhieuLan`, `nudBinhLuanNhieuLanDelayFrom`, `nudBinhLuanNhieuLanDelayTo`, `nudBinhLuanNhieuLanFrom`, `nudBinhLuanNhieuLanTo`, `ckbTagNeuBat`, `typeTag`, `txtUid`, `ckbTuongTacPost`, `ckbTuDongXoaUid`, `ckbReply`, `nudSoLuongReplyFrom`, `nudSoLuongReplyTo`, `nudDelayReplyFrom`, `nudDelayReplyTo`, `typeReactionComment`, `txtReplyComment`, `ckbTaoNoiDungAIReply`, `cbbPromptReply`, `ckbTuDongXoaNoiDungReply`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 10. `add_friend_suggestion` — Kết bạn gợi ý

**Ví dụ UI:** Form "Kết bạn gợi ý": số lượng người muốn gửi lời mời.

**Capability:** `quantity`
**Behavior operations:** (không có)
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`, `checkDelaySeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `add_friend_suggestion` |
| Legacy interact type | `[10]` |
| Legacy semantic type | `["add_friend_suggestion"]` |
| Config class cũ | `HDKetBanGoiYConfig` |
| Semantic runtime | `False` |
| Required V2 | `scope.quantity` |
| Optional V2 | `(không có)` |
| Legacy field count | `8` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, scope, scope.mode, scope.quantity, scope.quantity.from, scope.quantity.to, scope.quantity.unit, semanticRuntime, target, target.kind, target.selectionMode, timing, timing.checkDelaySeconds, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, type

**V2 key có thể có trong semantic template:** `không có`

**Legacy field áp dụng:** `nudSoLuongFrom`, `nudSoLuongTo`, `nudDelayFrom`, `nudDelayTo`, `nudDelayCheck`, `ckbChiKetBanTenCoDau`, `ckbOnlyAddFriendWithMutualFriends`, `nudTimesWarning`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 11. `confirm_friend` — Xác nhận kết bạn

**Ví dụ UI:** Form "Xác nhận kết bạn": số lượng lời mời cần xác nhận.

**Capability:** `quantity`
**Behavior operations:** (không có)
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `confirm_friend` |
| Legacy interact type | `[11]` |
| Legacy semantic type | `["confirm_friend"]` |
| Config class cũ | `HDXacNhanKetBanConfig` |
| Semantic runtime | `False` |
| Required V2 | `scope.quantity` |
| Optional V2 | `(không có)` |
| Legacy field count | `6` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, scope, scope.mode, scope.quantity, scope.quantity.from, scope.quantity.to, scope.quantity.unit, semanticRuntime, target, target.kind, target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, type

**V2 key có thể có trong semantic template:** `không có`

**Legacy field áp dụng:** `nudSoLuongFrom`, `nudSoLuongTo`, `nudDelayFrom`, `nudDelayTo`, `ckbChiKetBanTenCoDau`, `ckbOnlyAddFriendWithMutualFriends`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 12. `unfriend` — Hủy kết bạn

**Ví dụ UI:** Form "Hủy kết bạn": số lượng bạn cần hủy.

**Capability:** `quantity`
**Behavior operations:** (không có)
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `unfriend` |
| Legacy interact type | `[12]` |
| Legacy semantic type | `["unfriend"]` |
| Config class cũ | `HDHuyKetBanConfig` |
| Semantic runtime | `False` |
| Required V2 | `scope.quantity` |
| Optional V2 | `(không có)` |
| Legacy field count | `9` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, scope, scope.mode, scope.quantity, scope.quantity.from, scope.quantity.to, scope.quantity.unit, semanticRuntime, target, target.kind, target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, type

**V2 key có thể có trong semantic template:** `không có`

**Legacy field áp dụng:** `nudSoLuongFrom`, `nudSoLuongTo`, `nudDelayFrom`, `nudDelayTo`, `ckbSort`, `typeSort`, `typeHuyKetBan`, `txtUid`, `txtUidKhongHuyKetBan`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 13. `join_group_keyword` — Tham gia nhóm từ khóa

**Ví dụ UI:** Form "Tham gia nhóm theo từ khóa": từ khóa nhóm + số lượng.

**Capability:** `quantity`, `keyword`
**Behavior operations:** (không có)
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `join_group_keyword` |
| Legacy interact type | `[13]` |
| Legacy semantic type | `["join_group_keyword"]` |
| Config class cũ | `HDThamGiaNhomTuKhoaConfig` |
| Semantic runtime | `False` |
| Required V2 | `scope.quantity`, `target.keywords` |
| Optional V2 | `(không có)` |
| Legacy field count | `7` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, scope, scope.mode, scope.quantity, scope.quantity.from, scope.quantity.to, scope.quantity.unit, semanticRuntime, target, target.keywords, target.keywords[], target.kind, target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, type

**V2 key có thể có trong semantic template:** `không có`

**Legacy field áp dụng:** `nudSoLuongFrom`, `nudSoLuongTo`, `nudDelayFrom`, `nudDelayTo`, `txtTuKhoa`, `ckbTuDongTraLoiCauHoi`, `txtCauTraLoi`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 14. `join_group_uid` — Tham gia nhóm chỉ định

**Ví dụ UI:** Form "Tham gia nhóm chỉ định": groupIds + số lượng.

**Capability:** `quantity`, `group_id`
**Behavior operations:** (không có)
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `join_group_uid` |
| Legacy interact type | `[14]` |
| Legacy semantic type | `["join_group_uid"]` |
| Config class cũ | `HDThamGiaNhomUidConfig` |
| Semantic runtime | `False` |
| Required V2 | `scope.quantity`, `target.groupIds` |
| Optional V2 | `(không có)` |
| Legacy field count | `9` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, scope, scope.mode, scope.quantity, scope.quantity.from, scope.quantity.to, scope.quantity.unit, semanticRuntime, target, target.groupIds, target.groupIds[], target.kind, target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, type

**V2 key có thể có trong semantic template:** `không có`

**Legacy field áp dụng:** `nudSoLuongFrom`, `nudSoLuongTo`, `nudDelayFrom`, `nudDelayTo`, `txtUid`, `ckbThamGiaNhomTrungNhau`, `ckbTuDongTraLoiCauHoi`, `txtCauTraLoi`, `ckbTuDongXoaUid`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 15. `join_group_suggestion` — Tham gia nhóm gợi ý

**Ví dụ UI:** Form "Tham gia nhóm gợi ý": số lượng nhóm.

**Capability:** `quantity`
**Behavior operations:** (không có)
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `join_group_suggestion` |
| Legacy interact type | `[15]` |
| Legacy semantic type | `["join_group_suggestion"]` |
| Config class cũ | `HDThamGiaNhomGoiYConfig` |
| Semantic runtime | `False` |
| Required V2 | `scope.quantity` |
| Optional V2 | `(không có)` |
| Legacy field count | `6` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, scope, scope.mode, scope.quantity, scope.quantity.from, scope.quantity.to, scope.quantity.unit, semanticRuntime, target, target.kind, target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, type

**V2 key có thể có trong semantic template:** `không có`

**Legacy field áp dụng:** `nudSoLuongFrom`, `nudSoLuongTo`, `nudDelayFrom`, `nudDelayTo`, `ckbTuDongTraLoiCauHoi`, `txtCauTraLoi`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 16. `leave_group` — Rời nhóm

**Ví dụ UI:** Form "Rời nhóm": chọn nhóm hiện tại + số lượng nhóm.

**Capability:** `quantity`
**Behavior operations:** (không có)
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `leave_group` |
| Legacy interact type | `[16]` |
| Legacy semantic type | `["leave_group"]` |
| Config class cũ | `HDRoiNhomConfig` |
| Semantic runtime | `False` |
| Required V2 | `scope.quantity` |
| Optional V2 | `(không có)` |
| Legacy field count | `12` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, scope, scope.mode, scope.quantity, scope.quantity.from, scope.quantity.to, scope.quantity.unit, semanticRuntime, target, target.kind, target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, type

**V2 key có thể có trong semantic template:** `không có`

**Legacy field áp dụng:** `nudSoLuongFrom`, `nudSoLuongTo`, `nudDelayFrom`, `nudDelayTo`, `typeRoiNhom`, `ckbDieuKienKiemDuyet`, `ckbDieuKienThanhVien`, `nudThanhVienToiDa`, `ckbDieuKienTuKhoa`, `txtTuKhoa`, `txtIDNhomGiuLai`, `ckbBackupDanhSachNhom`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 17. `create_group` — Tạo nhóm

**Ví dụ UI:** Form "Tạo nhóm": tên nhóm + nội dung/mô tả.

**Capability:** `quantity`, `content`
**Behavior operations:** (không có)
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `create_group` |
| Legacy interact type | `[17]` |
| Legacy semantic type | `["create_group"]` |
| Config class cũ | `HDTaoNhomConfig` |
| Semantic runtime | `False` |
| Required V2 | `scope.quantity`, `resource.name` |
| Optional V2 | `(không có)` |
| Legacy field count | `3` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, scope, scope.mode, scope.quantity, scope.quantity.from, scope.quantity.to, scope.quantity.unit, semanticRuntime, target, target.kind, target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, type

**V2 key có thể có trong semantic template:** `không có`

**Legacy field áp dụng:** `nudSoLuongFrom`, `nudSoLuongTo`, `txtTenNhom`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 18. `post_wall` — Đăng bài lên tường

**Ví dụ UI:** Form "Đăng bài lên tường": nội dung, media, tag, visibility và lịch.

**Capability:** `quantity`, `content`, `post_options`, `post_image`
**Behavior operations:** (không có)
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `post_wall` |
| Legacy interact type | `[18]` |
| Legacy semantic type | `["post_wall"]` |
| Config class cũ | `HDDangBaiTuongConfig` |
| Semantic runtime | `False` |
| Required V2 | `scope.quantity`, `content.source` |
| Optional V2 | `tag_friends`, `tag_count`, `public_post` |
| Legacy field count | `23` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, scope, scope.mode, scope.quantity, scope.quantity.from, scope.quantity.to, scope.quantity.unit, semanticRuntime, target, target.kind, target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, type

**V2 key có thể có trong semantic template:** `không có`

**Legacy field áp dụng:** `nudSoLuongFrom`, `nudSoLuongTo`, `nudKhoangCachFrom`, `nudKhoangCachTo`, `ckbVanBan`, `ckbTaoNoiDungAI`, `cbbPrompt`, `ckbUseBackground`, `ckbXoaNguyenLieuDaDung`, `txtNoiDung`, `ckbAnh`, `txtPathAnh`, `ckbDangLink`, `txtLinkShare`, `ckbXoaLink`, `ckbTagFriends`, `nudSoLuongTagFrom`, `nudSoLuongTagTo`, `ckbTuongTacPost`, `ckbXuatLinkBaiViet`, `ckbClickPrivacy`, `ckbTaoAnhAI`, `cbbPromptAnh`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 19. `post_group` — Đăng bài lên nhóm

**Ví dụ UI:** Form "Đăng bài lên nhóm": group, nội dung, media, tag và semantic nếu có.

**Capability:** `quantity`, `content`, `group_id`, `reply_comment`, `post_image`
**Behavior operations:** `replyComment`
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`, `delayBetweenTargetsSeconds`, `loadTimeoutSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `post_group` |
| Legacy interact type | `[19]` |
| Legacy semantic type | `["post_group"]` |
| Config class cũ | `HDDangBaiNhomConfig` |
| Semantic runtime | `True` |
| Required V2 | `scope.quantity`, `target.groupIds`, `content.source` |
| Optional V2 | `(không có)` |
| Legacy field count | `46` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, behavior.operations.replyComment, behavior.operations.replyComment.conditions, behavior.operations.replyComment.content, behavior.operations.replyComment.content.cleanupAfterUse, behavior.operations.replyComment.content.promptId, behavior.operations.replyComment.content.source, behavior.operations.replyComment.content.text, behavior.operations.replyComment.content.text[], behavior.operations.replyComment.count, behavior.operations.replyComment.delaySeconds, behavior.operations.replyComment.delaySeconds.from, behavior.operations.replyComment.delaySeconds.to, behavior.operations.replyComment.enabled, behavior.operations.replyComment.maxComment, behavior.operations.replyComment.policies, behavior.operations.replyComment.policies[], behavior.operations.replyComment.selectionMode, scope, scope.inner, scope.inner.quantity, scope.inner.quantity.from, scope.inner.quantity.to, scope.inner.quantity.unit, scope.inner.unit, scope.mode, scope.outer, scope.outer.quantity, scope.outer.quantity.from, scope.outer.quantity.to, scope.outer.quantity.unit, scope.outer.unit, scope.quantityScope, semanticRuntime, target, target.groupIds, target.groupIds[], target.kind, target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, timing.delayBetweenTargetsSeconds, timing.delayBetweenTargetsSeconds.from, timing.delayBetweenTargetsSeconds.to, timing.loadTimeoutSeconds, type

**V2 key có thể có trong semantic template:** `behavior`, `behavior.mode`, `behavior.operations`, `semanticRuntime`, `semanticRuntime.postDecisionPolicy`, `semanticRuntime.postDecisionPolicy.otherwise`, `semanticRuntime.postDecisionPolicy.otherwise.behavior`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.count`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.mode`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.scope`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.max_comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.policies[]`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.policies[]`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.conditions`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.count`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.max_comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.policies[]`, `semanticRuntime.postDecisionPolicy.post_rules`, `semanticRuntime.postDecisionPolicy.post_rules[]`, `semanticRuntime.postDecisionPolicy.rule_resolution`, `semanticRuntime.postDecisionPolicy.schema_version`, `semanticRuntime.postDecisionPolicy.taxonomy`, `semanticRuntime.postDecisionPolicy.taxonomy.allow_multiple_categories`, `semanticRuntime.postDecisionPolicy.taxonomy.categories`, `semanticRuntime.postDecisionPolicy.taxonomy.categories[]`, `semanticRuntime.postDecisionPolicy.taxonomy.default_category`, `semanticRuntime.schemaVersion`, `semanticRuntime.summary`

**Legacy field áp dụng:** `nudSoLuongFrom`, `nudSoLuongTo`, `nudKhoangCachFrom`, `nudKhoangCachTo`, `typeNhom`, `ckbChiShareNhomKKD`, `ckbUuTienShareNhomNhieuThanhVien`, `ckbBackupDanhSachNhom`, `ckbKhongShareTrungNhom`, `ckbChiShareNhomThuocDanhSach`, `lstNhomTuNhap`, `txtIdNhomChiDinh`, `ckbTuDongXoaUid`, `txtTenNhom`, `ckbPostAnDanh`, `ckbVanBan`, `ckbUseBackground`, `ckbXoaNguyenLieuDaDung`, `txtNoiDung`, `ckbTaoNoiDungAI`, `cbbPrompt`, `ckbAnh`, `txtPathAnh`, `ckbDangLink`, `txtLinkShare`, `ckbXoaLink`, `ckbEvent`, `txtEvent`, `ckbXuatLinkBaiViet`, `ckbRoiNhomKiemDuyet`, `nudTimeoutLoadPost`, `ckbJoinGroup`, `lstAnswers`, `ckbTuongTacPost`, `ckbReply`, `nudSoLuongReplyFrom`, `nudSoLuongReplyTo`, `nudDelayReplyFrom`, `nudDelayReplyTo`, `typeReactionComment`, `txtReplyComment`, `ckbTaoNoiDungAIReply`, `cbbPromptReply`, `ckbTuDongXoaNoiDungReply`, `ckbTaoAnhAI`, `cbbPromptAnh`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 20. `share_post_advanced` — Share bài nâng cao

**Ví dụ UI:** Form "Share bài nâng cao": nguồn bài, đích share, nội dung bổ sung.

**Capability:** `quantity`, `content`, `ai_comment_prompt`, `view_full_content`
**Behavior operations:** `viewFullContent`
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `share_post_advanced` |
| Legacy interact type | `[20]` |
| Legacy semantic type | `["share_post_advanced"]` |
| Config class cũ | `HDShareBaiConfig` |
| Semantic runtime | `True` |
| Required V2 | `scope.quantity`, `content.source` |
| Optional V2 | `(không có)` |
| Legacy field count | `34` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, behavior.operations.viewFullContent, behavior.operations.viewFullContent.enabled, behavior.operations.viewFullContent.selectionPercent, scope, scope.mode, scope.quantity, scope.quantity.from, scope.quantity.to, scope.quantity.unit, semanticRuntime, target, target.kind, target.postIds, target.postIds[], target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, type

**V2 key có thể có trong semantic template:** `behavior`, `behavior.mode`, `behavior.operations`, `semanticRuntime`, `semanticRuntime.postDecisionPolicy`, `semanticRuntime.postDecisionPolicy.otherwise`, `semanticRuntime.postDecisionPolicy.otherwise.behavior`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.count`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.mode`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.scope`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.max_comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.policies[]`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.policies[]`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.conditions`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.count`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.max_comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.policies[]`, `semanticRuntime.postDecisionPolicy.post_rules`, `semanticRuntime.postDecisionPolicy.post_rules[]`, `semanticRuntime.postDecisionPolicy.rule_resolution`, `semanticRuntime.postDecisionPolicy.schema_version`, `semanticRuntime.postDecisionPolicy.taxonomy`, `semanticRuntime.postDecisionPolicy.taxonomy.allow_multiple_categories`, `semanticRuntime.postDecisionPolicy.taxonomy.categories`, `semanticRuntime.postDecisionPolicy.taxonomy.categories[]`, `semanticRuntime.postDecisionPolicy.taxonomy.default_category`, `semanticRuntime.schemaVersion`, `semanticRuntime.summary`

**Legacy field áp dụng:** `nudDelayFrom`, `nudDelayTo`, `ckbShareBaiLenTuong`, `nudCountWallFrom`, `nudCountWallTo`, `ckbShareBaiLenNhom`, `nudCountGroupFrom`, `nudCountGroupTo`, `ckbShareNhomNangCao`, `ckbChiShareNhomKKD`, `ckbUuTienShareNhomNhieuThanhVien`, `ckbBackupDanhSachNhom`, `ckbKhongShareTrungNhom`, `ckbChiShareNhomThuocDanhSach`, `lstNhomTuNhap`, `ckbTuDongXoaNoiDung`, `txtLinkChiaSe`, `typeLinkShare`, `ckbVanBan`, `txtNoiDung`, `ckbTuongTacTruocKhiShare`, `nudSoLuongFrom`, `nudSoLuongTo`, `ckbInteract`, `typeReaction`, `ckbComment`, `ckbTaoNoiDungAI`, `cbbPrompt`, `txtComment`, `ckbBinhLuanNhieuLan`, `nudBinhLuanNhieuLanDelayFrom`, `nudBinhLuanNhieuLanDelayTo`, `ckbViewFullContent`, `nudPercentViewFullContent`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 21. `spam_post` — Spam bài viết

**Ví dụ UI:** Form "Spam bài viết": target, nội dung, media, số lượng và cảnh báo.

**Capability:** `quantity`, `content`, `ai_comment_prompt`, `view_full_content`
**Behavior operations:** `viewFullContent`
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`, `delayBetweenTargetsSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `spam_post` |
| Legacy interact type | `[21]` |
| Legacy semantic type | `["spam_post"]` |
| Config class cũ | `HDSpamBaiVietConfig` |
| Semantic runtime | `True` |
| Required V2 | `scope.quantity`, `content.source` |
| Optional V2 | `(không có)` |
| Legacy field count | `31` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, behavior.operations.viewFullContent, behavior.operations.viewFullContent.enabled, behavior.operations.viewFullContent.selectionPercent, scope, scope.inner, scope.inner.quantity, scope.inner.quantity.from, scope.inner.quantity.to, scope.inner.quantity.unit, scope.inner.unit, scope.mode, scope.outer, scope.outer.quantity, scope.outer.quantity.from, scope.outer.quantity.to, scope.outer.quantity.unit, scope.outer.unit, scope.quantityScope, semanticRuntime, target, target.kind, target.selectionMode, target.uids, target.uids[], timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, timing.delayBetweenTargetsSeconds, timing.delayBetweenTargetsSeconds.from, timing.delayBetweenTargetsSeconds.to, type

**V2 key có thể có trong semantic template:** `behavior`, `behavior.mode`, `behavior.operations`, `semanticRuntime`, `semanticRuntime.postDecisionPolicy`, `semanticRuntime.postDecisionPolicy.otherwise`, `semanticRuntime.postDecisionPolicy.otherwise.behavior`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.count`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.mode`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.scope`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.max_comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.policies[]`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.policies[]`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.conditions`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.count`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.max_comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.policies[]`, `semanticRuntime.postDecisionPolicy.post_rules`, `semanticRuntime.postDecisionPolicy.post_rules[]`, `semanticRuntime.postDecisionPolicy.rule_resolution`, `semanticRuntime.postDecisionPolicy.schema_version`, `semanticRuntime.postDecisionPolicy.taxonomy`, `semanticRuntime.postDecisionPolicy.taxonomy.allow_multiple_categories`, `semanticRuntime.postDecisionPolicy.taxonomy.categories`, `semanticRuntime.postDecisionPolicy.taxonomy.categories[]`, `semanticRuntime.postDecisionPolicy.taxonomy.default_category`, `semanticRuntime.schemaVersion`, `semanticRuntime.summary`

**Legacy field áp dụng:** `nudSoLuongUidFrom`, `nudSoLuongUidTo`, `nudSoLuongBaiVietFrom`, `nudSoLuongBaiVietTo`, `nudDelayFrom`, `nudDelayTo`, `typeID`, `txtUid`, `ckbSwipe`, `nudCountSwipeFrom`, `nudCountSwipeTo`, `ckbInteract`, `nudPercentLike`, `typeReaction`, `ckbShareWall`, `nudPercentShareWall`, `ckbComment`, `nudPercentCommentText`, `ckbTaoNoiDungAI`, `cbbPrompt`, `ckbReply`, `txtComment`, `ckbTuDongXoaUid`, `ckbAnh`, `nudPercentCommentImage`, `txtPathAnh`, `ckbReel`, `ckbJoinGroup`, `lstAnswers`, `ckbViewFullContent`, `nudPercentViewFullContent`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 22. `post_reel` — Đăng reel

**Ví dụ UI:** Form "Đăng Reel": upload media, caption, tùy chọn xuất bản.

**Capability:** `quantity`, `content`
**Behavior operations:** (không có)
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`, `loadTimeoutSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `post_reel` |
| Legacy interact type | `[22]` |
| Legacy semantic type | `["post_reel"]` |
| Config class cũ | `HDDangReelConfig` |
| Semantic runtime | `False` |
| Required V2 | `scope.quantity`, `content.mediaIds`, `content.source` |
| Optional V2 | `(không có)` |
| Legacy field count | `22` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, scope, scope.mode, scope.quantity, scope.quantity.from, scope.quantity.to, scope.quantity.unit, semanticRuntime, target, target.kind, target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, timing.loadTimeoutSeconds, type

**V2 key có thể có trong semantic template:** `không có`

**Legacy field áp dụng:** `nudSoLuongFrom`, `nudSoLuongTo`, `nudKhoangCachFrom`, `nudKhoangCachTo`, `ckbVanBan`, `ckbXoaNguyenLieuDaDung`, `txtNoiDung`, `ckbHashtag`, `txtHashtag`, `nudSoHashtagFrom`, `nudSoHashtagTo`, `txtPathAnh`, `ckbXoaVideoDaDang`, `ckbXuatLinkReels`, `typeReel`, `nudTimeOutLoadVideo`, `cbbWhenTimeout`, `ckbTuongTacReel`, `ckbThuMucMedia`, `txtThuMucMedia`, `ckbKhoNoiDung`, `txtKhoNoiDung`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 23. `post_story` — Đăng story

**Ví dụ UI:** Form "Đăng Story": upload media, caption, thời gian tồn tại.

**Capability:** `quantity`, `content`
**Behavior operations:** (không có)
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `post_story` |
| Legacy interact type | `[23]` |
| Legacy semantic type | `["post_story"]` |
| Config class cũ | `HDDangStoryConfig` |
| Semantic runtime | `False` |
| Required V2 | `scope.quantity`, `content.mediaIds`, `content.source` |
| Optional V2 | `(không có)` |
| Legacy field count | `17` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, scope, scope.mode, scope.quantity, scope.quantity.from, scope.quantity.to, scope.quantity.unit, semanticRuntime, target, target.kind, target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, type

**V2 key có thể có trong semantic template:** `không có`

**Legacy field áp dụng:** `nudSoLuongFrom`, `nudSoLuongTo`, `typeDang`, `txtNoiDung`, `ckbUseBackgroundText`, `typeBaiHat`, `txtDanhSachBaiHat`, `ckbUseBackgroundNhac`, `ckbAnh`, `txtPathAnh`, `ckbXoaAnhDaDang`, `txtChiDangAnhPathAnh`, `ckbChiDangAnhXoaAnhDaDang`, `ckbGanLink`, `txtLink`, `ckbClickPrivacy`, `ckbPinStory`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 24. `review_page` — Đánh giá page

**Ví dụ UI:** Form "Đánh giá Page": chọn Page + nội dung đánh giá.

**Capability:** `content`
**Behavior operations:** (không có)
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `review_page` |
| Legacy interact type | `[24]` |
| Legacy semantic type | `["review_page"]` |
| Config class cũ | `HDDanhGiaPageConfig` |
| Semantic runtime | `False` |
| Required V2 | `target.pageIds`, `content.source` |
| Optional V2 | `(không có)` |
| Legacy field count | `4` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, scope, scope.mode, scope.quantity, scope.quantity.from, scope.quantity.to, scope.quantity.unit, semanticRuntime, target, target.kind, target.pageIds, target.pageIds[], target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, type

**V2 key có thể có trong semantic template:** `không có`

**Legacy field áp dụng:** `txtUid`, `ckbInteract`, `txtComment`, `ckbTuDongXoaNoiDung`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 25. `like_page` — Buff like page

**Ví dụ UI:** Form "Buff Like Page": chọn Page + số lượng Page.

**Capability:** `(không có)`
**Behavior operations:** (không có)
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `like_page` |
| Legacy interact type | `[25]` |
| Legacy semantic type | `["like_page"]` |
| Config class cũ | `HDBuffLikePageConfig` |
| Semantic runtime | `False` |
| Required V2 | `target.pageIds` |
| Optional V2 | `(không có)` |
| Legacy field count | `3` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, scope, scope.mode, scope.quantity, scope.quantity.from, scope.quantity.to, scope.quantity.unit, semanticRuntime, target, target.kind, target.pageIds, target.pageIds[], target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, type

**V2 key có thể có trong semantic template:** `không có`

**Legacy field áp dụng:** `nudDelayFrom`, `nudDelayTo`, `txtUid`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 26. `follow_uid` — Buff follow UID

**Ví dụ UI:** Form "Follow UID": upload hoặc dán danh sách UID.

**Capability:** `uid`
**Behavior operations:** (không có)
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `follow_uid` |
| Legacy interact type | `[26]` |
| Legacy semantic type | `["follow_uid"]` |
| Config class cũ | `HDBuffFollowUIDConfig` |
| Semantic runtime | `False` |
| Required V2 | `target.uids` |
| Optional V2 | `(không có)` |
| Legacy field count | `3` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, scope, scope.mode, scope.quantity, scope.quantity.from, scope.quantity.to, scope.quantity.unit, semanticRuntime, target, target.kind, target.selectionMode, target.uids, target.uids[], timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, type

**V2 key có thể có trong semantic template:** `không có`

**Legacy field áp dụng:** `nudDelayFrom`, `nudDelayTo`, `txtUid`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 27. `interact_post_keyword` — Tương tác bài viết theo từ khóa

**Ví dụ UI:** Card "Tương tác bài theo từ khóa": từ khóa + số bài + operation.

**Capability:** `quantity`, `keyword`, `reaction`, `comment`, `share`, `ai_comment_prompt`, `view_full_content`, `reply_comment`
**Behavior operations:** `viewFullContent`, `reactionPost`, `commentPost`, `sharePost`, `replyComment`
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`, `durationSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `interact_post_keyword` |
| Legacy interact type | `[27]` |
| Legacy semantic type | `["interact_post_keyword"]` |
| Config class cũ | `HDTuongTacBaiVietTuKhoaConfig` |
| Semantic runtime | `True` |
| Required V2 | `scope.quantity`, `target.keywords` |
| Optional V2 | `reaction` |
| Legacy field count | `41` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, behavior.operations.commentPost, behavior.operations.commentPost.content, behavior.operations.commentPost.content.cleanupAfterUse, behavior.operations.commentPost.content.mediaIds, behavior.operations.commentPost.content.mediaIds[], behavior.operations.commentPost.content.promptId, behavior.operations.commentPost.content.source, behavior.operations.commentPost.content.text, behavior.operations.commentPost.content.text[], behavior.operations.commentPost.enabled, behavior.operations.commentPost.media, behavior.operations.commentPost.media.enabled, behavior.operations.commentPost.media.mediaIds, behavior.operations.commentPost.media.mediaIds[], behavior.operations.commentPost.media.selectionPercent, behavior.operations.commentPost.selectionPercent, behavior.operations.commentPost.sticker, behavior.operations.commentPost.sticker.enabled, behavior.operations.commentPost.tag, behavior.operations.commentPost.tag.enabled, behavior.operations.commentPost.tag.source, behavior.operations.commentPost.tag.uids, behavior.operations.commentPost.tag.uids[], behavior.operations.reactionPost, behavior.operations.reactionPost.enabled, behavior.operations.reactionPost.selectionMode, behavior.operations.reactionPost.selectionPercent, behavior.operations.reactionPost.types, behavior.operations.reactionPost.types[], behavior.operations.replyComment, behavior.operations.replyComment.conditions, behavior.operations.replyComment.content, behavior.operations.replyComment.content.cleanupAfterUse, behavior.operations.replyComment.content.promptId, behavior.operations.replyComment.content.source, behavior.operations.replyComment.content.text, behavior.operations.replyComment.content.text[], behavior.operations.replyComment.count, behavior.operations.replyComment.delaySeconds, behavior.operations.replyComment.delaySeconds.from, behavior.operations.replyComment.delaySeconds.to, behavior.operations.replyComment.enabled, behavior.operations.replyComment.maxComment, behavior.operations.replyComment.policies, behavior.operations.replyComment.policies[], behavior.operations.replyComment.selectionMode, behavior.operations.sharePost, behavior.operations.sharePost.content, behavior.operations.sharePost.content.cleanupAfterUse, behavior.operations.sharePost.content.mediaIds, behavior.operations.sharePost.content.mediaIds[], behavior.operations.sharePost.content.promptId, behavior.operations.sharePost.content.source, behavior.operations.sharePost.content.text, behavior.operations.sharePost.content.text[], behavior.operations.sharePost.destination, behavior.operations.sharePost.destination.groups, behavior.operations.sharePost.destination.groups[], behavior.operations.sharePost.destination.wall, behavior.operations.sharePost.enabled, behavior.operations.sharePost.selectionPercent, behavior.operations.viewFullContent, behavior.operations.viewFullContent.enabled, behavior.operations.viewFullContent.selectionPercent, scope, scope.mode, scope.quantity, scope.quantity.from, scope.quantity.to, scope.quantity.unit, semanticRuntime, target, target.keywords, target.keywords[], target.kind, target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, timing.durationSeconds, type

**V2 key có thể có trong semantic template:** `behavior`, `behavior.mode`, `behavior.operations`, `behavior.operations.commentPost`, `behavior.operations.commentPost.content`, `behavior.operations.commentPost.content.cleanupAfterUse`, `behavior.operations.commentPost.content.mediaIds`, `behavior.operations.commentPost.content.mediaIds[]`, `behavior.operations.commentPost.content.promptId`, `behavior.operations.commentPost.content.source`, `behavior.operations.commentPost.content.text`, `behavior.operations.commentPost.content.text[]`, `behavior.operations.commentPost.enabled`, `behavior.operations.commentPost.media`, `behavior.operations.commentPost.media.enabled`, `behavior.operations.commentPost.media.mediaIds`, `behavior.operations.commentPost.media.mediaIds[]`, `behavior.operations.commentPost.media.selectionPercent`, `behavior.operations.commentPost.selectionPercent`, `behavior.operations.commentPost.sticker`, `behavior.operations.commentPost.sticker.enabled`, `behavior.operations.commentPost.tag`, `behavior.operations.commentPost.tag.enabled`, `behavior.operations.commentPost.tag.source`, `behavior.operations.commentPost.tag.uids`, `behavior.operations.commentPost.tag.uids[]`, `behavior.operations.reactionPost`, `behavior.operations.reactionPost.enabled`, `behavior.operations.reactionPost.selectionPercent`, `behavior.operations.reactionPost.selectionMode`, `behavior.operations.reactionPost.types`, `behavior.operations.reactionPost.types[]`, `behavior.operations.sharePost`, `behavior.operations.sharePost.content`, `behavior.operations.sharePost.content.cleanupAfterUse`, `behavior.operations.sharePost.content.mediaIds`, `behavior.operations.sharePost.content.mediaIds[]`, `behavior.operations.sharePost.content.promptId`, `behavior.operations.sharePost.content.source`, `behavior.operations.sharePost.content.text`, `behavior.operations.sharePost.content.text[]`, `behavior.operations.sharePost.destination`, `behavior.operations.sharePost.destination.groups`, `behavior.operations.sharePost.destination.groups[]`, `behavior.operations.sharePost.destination.wall`, `behavior.operations.sharePost.enabled`, `behavior.operations.sharePost.selectionPercent`, `semanticRuntime`, `semanticRuntime.postDecisionPolicy`, `semanticRuntime.postDecisionPolicy.otherwise`, `semanticRuntime.postDecisionPolicy.otherwise.behavior`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.count`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.mode`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.scope`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.max_comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.policies[]`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.policies[]`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.conditions`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.count`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.max_comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.policies[]`, `semanticRuntime.postDecisionPolicy.post_rules`, `semanticRuntime.postDecisionPolicy.post_rules[]`, `semanticRuntime.postDecisionPolicy.rule_resolution`, `semanticRuntime.postDecisionPolicy.schema_version`, `semanticRuntime.postDecisionPolicy.taxonomy`, `semanticRuntime.postDecisionPolicy.taxonomy.allow_multiple_categories`, `semanticRuntime.postDecisionPolicy.taxonomy.categories`, `semanticRuntime.postDecisionPolicy.taxonomy.categories[]`, `semanticRuntime.postDecisionPolicy.taxonomy.default_category`, `semanticRuntime.schemaVersion`, `semanticRuntime.summary`

**Legacy field áp dụng:** `nudSoLuongFrom`, `nudSoLuongTo`, `nudDelayFrom`, `nudDelayTo`, `nudTimeFrom`, `nudTimeTo`, `ckbInteract`, `nudPercentLike`, `typeReaction`, `ckbSendAnh`, `nudPercentCommentImage`, `txtAnh`, `ckbShareWall`, `nudPercentShareWall`, `txtContentShare`, `ckbComment`, `nudPercentCommentText`, `txtComment`, `ckbSticker`, `typeBinhLuan`, `ckbTaoNoiDungAI`, `cbbPrompt`, `ckbTuDongXoaNoiDung`, `cbbOptionsPost`, `nudThoiGianFrom`, `nudThoiGianTo`, `ckbFilter`, `cbbOptionsFilter`, `txtTuKhoa`, `ckbViewFullContent`, `nudPercentViewFullContent`, `ckbReply`, `nudSoLuongReplyFrom`, `nudSoLuongReplyTo`, `nudDelayReplyFrom`, `nudDelayReplyTo`, `typeReactionComment`, `txtReplyComment`, `ckbTaoNoiDungAIReply`, `cbbPromptReply`, `ckbTuDongXoaNoiDungReply`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 28. `interact_post_target` — Tương tác bài viết theo chỉ định

**Ví dụ UI:** Card "Tương tác bài chỉ định": postIds + operation.

**Capability:** `quantity`, `post_id`, `reaction`, `comment`, `share`, `ai_comment_prompt`, `view_full_content`
**Behavior operations:** `viewFullContent`, `reactionPost`, `commentPost`, `sharePost`
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`, `durationSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `interact_post_target` |
| Legacy interact type | `[28]` |
| Legacy semantic type | `["interact_post_target"]` |
| Config class cũ | `HDTuongTacBaiVietChiDinhConfig` |
| Semantic runtime | `True` |
| Required V2 | `scope.quantity`, `target.postIds` |
| Optional V2 | `reaction` |
| Legacy field count | `34` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, behavior.operations.commentPost, behavior.operations.commentPost.content, behavior.operations.commentPost.content.cleanupAfterUse, behavior.operations.commentPost.content.mediaIds, behavior.operations.commentPost.content.mediaIds[], behavior.operations.commentPost.content.promptId, behavior.operations.commentPost.content.source, behavior.operations.commentPost.content.text, behavior.operations.commentPost.content.text[], behavior.operations.commentPost.enabled, behavior.operations.commentPost.media, behavior.operations.commentPost.media.enabled, behavior.operations.commentPost.media.mediaIds, behavior.operations.commentPost.media.mediaIds[], behavior.operations.commentPost.media.selectionPercent, behavior.operations.commentPost.selectionPercent, behavior.operations.commentPost.sticker, behavior.operations.commentPost.sticker.enabled, behavior.operations.commentPost.tag, behavior.operations.commentPost.tag.enabled, behavior.operations.commentPost.tag.source, behavior.operations.commentPost.tag.uids, behavior.operations.commentPost.tag.uids[], behavior.operations.reactionPost, behavior.operations.reactionPost.enabled, behavior.operations.reactionPost.selectionMode, behavior.operations.reactionPost.selectionPercent, behavior.operations.reactionPost.types, behavior.operations.reactionPost.types[], behavior.operations.sharePost, behavior.operations.sharePost.content, behavior.operations.sharePost.content.cleanupAfterUse, behavior.operations.sharePost.content.mediaIds, behavior.operations.sharePost.content.mediaIds[], behavior.operations.sharePost.content.promptId, behavior.operations.sharePost.content.source, behavior.operations.sharePost.content.text, behavior.operations.sharePost.content.text[], behavior.operations.sharePost.destination, behavior.operations.sharePost.destination.groups, behavior.operations.sharePost.destination.groups[], behavior.operations.sharePost.destination.wall, behavior.operations.sharePost.enabled, behavior.operations.sharePost.selectionPercent, behavior.operations.viewFullContent, behavior.operations.viewFullContent.enabled, behavior.operations.viewFullContent.selectionPercent, scope, scope.mode, scope.quantity, scope.quantity.from, scope.quantity.to, scope.quantity.unit, semanticRuntime, target, target.kind, target.postIds, target.postIds[], target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, timing.durationSeconds, type

**V2 key có thể có trong semantic template:** `behavior`, `behavior.mode`, `behavior.operations`, `behavior.operations.commentPost`, `behavior.operations.commentPost.content`, `behavior.operations.commentPost.content.cleanupAfterUse`, `behavior.operations.commentPost.content.mediaIds`, `behavior.operations.commentPost.content.mediaIds[]`, `behavior.operations.commentPost.content.promptId`, `behavior.operations.commentPost.content.source`, `behavior.operations.commentPost.content.text`, `behavior.operations.commentPost.content.text[]`, `behavior.operations.commentPost.enabled`, `behavior.operations.commentPost.media`, `behavior.operations.commentPost.media.enabled`, `behavior.operations.commentPost.media.mediaIds`, `behavior.operations.commentPost.media.mediaIds[]`, `behavior.operations.commentPost.media.selectionPercent`, `behavior.operations.commentPost.selectionPercent`, `behavior.operations.commentPost.sticker`, `behavior.operations.commentPost.sticker.enabled`, `behavior.operations.commentPost.tag`, `behavior.operations.commentPost.tag.enabled`, `behavior.operations.commentPost.tag.source`, `behavior.operations.commentPost.tag.uids`, `behavior.operations.commentPost.tag.uids[]`, `behavior.operations.reactionPost`, `behavior.operations.reactionPost.enabled`, `behavior.operations.reactionPost.selectionPercent`, `behavior.operations.reactionPost.selectionMode`, `behavior.operations.reactionPost.types`, `behavior.operations.reactionPost.types[]`, `behavior.operations.sharePost`, `behavior.operations.sharePost.content`, `behavior.operations.sharePost.content.cleanupAfterUse`, `behavior.operations.sharePost.content.mediaIds`, `behavior.operations.sharePost.content.mediaIds[]`, `behavior.operations.sharePost.content.promptId`, `behavior.operations.sharePost.content.source`, `behavior.operations.sharePost.content.text`, `behavior.operations.sharePost.content.text[]`, `behavior.operations.sharePost.destination`, `behavior.operations.sharePost.destination.groups`, `behavior.operations.sharePost.destination.groups[]`, `behavior.operations.sharePost.destination.wall`, `behavior.operations.sharePost.enabled`, `behavior.operations.sharePost.selectionPercent`, `semanticRuntime`, `semanticRuntime.postDecisionPolicy`, `semanticRuntime.postDecisionPolicy.otherwise`, `semanticRuntime.postDecisionPolicy.otherwise.behavior`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.count`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.mode`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.scope`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.max_comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.policies[]`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.policies[]`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.conditions`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.count`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.max_comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.policies[]`, `semanticRuntime.postDecisionPolicy.post_rules`, `semanticRuntime.postDecisionPolicy.post_rules[]`, `semanticRuntime.postDecisionPolicy.rule_resolution`, `semanticRuntime.postDecisionPolicy.schema_version`, `semanticRuntime.postDecisionPolicy.taxonomy`, `semanticRuntime.postDecisionPolicy.taxonomy.allow_multiple_categories`, `semanticRuntime.postDecisionPolicy.taxonomy.categories`, `semanticRuntime.postDecisionPolicy.taxonomy.categories[]`, `semanticRuntime.postDecisionPolicy.taxonomy.default_category`, `semanticRuntime.schemaVersion`, `semanticRuntime.summary`

**Legacy field áp dụng:** `nudSoLuongUidFrom`, `nudSoLuongUidTo`, `txtIdPost`, `nudTimeFrom`, `nudTimeTo`, `ckbInteract`, `typeReaction`, `ckbShareWall`, `ckbComment`, `ckbTaoNoiDungAI`, `cbbPrompt`, `ckbReply`, `txtComment`, `ckbTuDongXoaNoiDung`, `ckbTuDongXoaLink`, `ckbTuDongXoaAnh`, `ckbDeleteComment`, `nudTimeDeleteFrom`, `nudTimeDeleteTo`, `ckbTag`, `nudSoLuongTagFrom`, `nudSoLuongTagTo`, `cbbTuyChonTag`, `ckbChiTagTenViet`, `txtUidTag`, `ckbAnh`, `txtPathAnh`, `ckbTuongTacVideoTrenPost`, `nudTuongTacVideoTrenPostFrom`, `nudTuongTacVideoTrenPostTo`, `ckbGetPostAPI`, `txtApiGetPost`, `ckbViewFullContent`, `nudPercentViewFullContent`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 29. `interact_video` — Tương tác video

**Ví dụ UI:** Card "Tương tác video": số video + reaction/comment/share/reply.

**Capability:** `quantity`, `reaction`, `comment`, `share`, `ai_comment_prompt`, `view_full_content`
**Behavior operations:** `viewFullContent`, `reactionPost`, `commentPost`, `sharePost`
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `interact_video` |
| Legacy interact type | `[29]` |
| Legacy semantic type | `["interact_video"]` |
| Config class cũ | `HDTuongTacVideoConfig` |
| Semantic runtime | `True` |
| Required V2 | `scope.quantity` |
| Optional V2 | `reaction` |
| Legacy field count | `16` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, behavior.operations.commentPost, behavior.operations.commentPost.content, behavior.operations.commentPost.content.cleanupAfterUse, behavior.operations.commentPost.content.mediaIds, behavior.operations.commentPost.content.mediaIds[], behavior.operations.commentPost.content.promptId, behavior.operations.commentPost.content.source, behavior.operations.commentPost.content.text, behavior.operations.commentPost.content.text[], behavior.operations.commentPost.enabled, behavior.operations.commentPost.media, behavior.operations.commentPost.media.enabled, behavior.operations.commentPost.media.mediaIds, behavior.operations.commentPost.media.mediaIds[], behavior.operations.commentPost.media.selectionPercent, behavior.operations.commentPost.selectionPercent, behavior.operations.commentPost.sticker, behavior.operations.commentPost.sticker.enabled, behavior.operations.commentPost.tag, behavior.operations.commentPost.tag.enabled, behavior.operations.commentPost.tag.source, behavior.operations.commentPost.tag.uids, behavior.operations.commentPost.tag.uids[], behavior.operations.reactionPost, behavior.operations.reactionPost.enabled, behavior.operations.reactionPost.selectionMode, behavior.operations.reactionPost.selectionPercent, behavior.operations.reactionPost.types, behavior.operations.reactionPost.types[], behavior.operations.sharePost, behavior.operations.sharePost.content, behavior.operations.sharePost.content.cleanupAfterUse, behavior.operations.sharePost.content.mediaIds, behavior.operations.sharePost.content.mediaIds[], behavior.operations.sharePost.content.promptId, behavior.operations.sharePost.content.source, behavior.operations.sharePost.content.text, behavior.operations.sharePost.content.text[], behavior.operations.sharePost.destination, behavior.operations.sharePost.destination.groups, behavior.operations.sharePost.destination.groups[], behavior.operations.sharePost.destination.wall, behavior.operations.sharePost.enabled, behavior.operations.sharePost.selectionPercent, behavior.operations.viewFullContent, behavior.operations.viewFullContent.enabled, behavior.operations.viewFullContent.selectionPercent, scope, scope.mode, scope.quantity, scope.quantity.from, scope.quantity.to, scope.quantity.unit, semanticRuntime, target, target.kind, target.selectionMode, target.videoUrls, target.videoUrls[], timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, type

**V2 key có thể có trong semantic template:** `behavior`, `behavior.mode`, `behavior.operations`, `behavior.operations.commentPost`, `behavior.operations.commentPost.content`, `behavior.operations.commentPost.content.cleanupAfterUse`, `behavior.operations.commentPost.content.mediaIds`, `behavior.operations.commentPost.content.mediaIds[]`, `behavior.operations.commentPost.content.promptId`, `behavior.operations.commentPost.content.source`, `behavior.operations.commentPost.content.text`, `behavior.operations.commentPost.content.text[]`, `behavior.operations.commentPost.enabled`, `behavior.operations.commentPost.media`, `behavior.operations.commentPost.media.enabled`, `behavior.operations.commentPost.media.mediaIds`, `behavior.operations.commentPost.media.mediaIds[]`, `behavior.operations.commentPost.media.selectionPercent`, `behavior.operations.commentPost.selectionPercent`, `behavior.operations.commentPost.sticker`, `behavior.operations.commentPost.sticker.enabled`, `behavior.operations.commentPost.tag`, `behavior.operations.commentPost.tag.enabled`, `behavior.operations.commentPost.tag.source`, `behavior.operations.commentPost.tag.uids`, `behavior.operations.commentPost.tag.uids[]`, `behavior.operations.reactionPost`, `behavior.operations.reactionPost.enabled`, `behavior.operations.reactionPost.selectionPercent`, `behavior.operations.reactionPost.selectionMode`, `behavior.operations.reactionPost.types`, `behavior.operations.reactionPost.types[]`, `behavior.operations.sharePost`, `behavior.operations.sharePost.content`, `behavior.operations.sharePost.content.cleanupAfterUse`, `behavior.operations.sharePost.content.mediaIds`, `behavior.operations.sharePost.content.mediaIds[]`, `behavior.operations.sharePost.content.promptId`, `behavior.operations.sharePost.content.source`, `behavior.operations.sharePost.content.text`, `behavior.operations.sharePost.content.text[]`, `behavior.operations.sharePost.destination`, `behavior.operations.sharePost.destination.groups`, `behavior.operations.sharePost.destination.groups[]`, `behavior.operations.sharePost.destination.wall`, `behavior.operations.sharePost.enabled`, `behavior.operations.sharePost.selectionPercent`, `semanticRuntime`, `semanticRuntime.postDecisionPolicy`, `semanticRuntime.postDecisionPolicy.otherwise`, `semanticRuntime.postDecisionPolicy.otherwise.behavior`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.count`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.mode`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.scope`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.max_comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.policies[]`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.policies[]`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.conditions`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.count`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.max_comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.policies[]`, `semanticRuntime.postDecisionPolicy.post_rules`, `semanticRuntime.postDecisionPolicy.post_rules[]`, `semanticRuntime.postDecisionPolicy.rule_resolution`, `semanticRuntime.postDecisionPolicy.schema_version`, `semanticRuntime.postDecisionPolicy.taxonomy`, `semanticRuntime.postDecisionPolicy.taxonomy.allow_multiple_categories`, `semanticRuntime.postDecisionPolicy.taxonomy.categories`, `semanticRuntime.postDecisionPolicy.taxonomy.categories[]`, `semanticRuntime.postDecisionPolicy.taxonomy.default_category`, `semanticRuntime.schemaVersion`, `semanticRuntime.summary`

**Legacy field áp dụng:** `txtLinkVideo`, `nudSoLuongFrom`, `nudSoLuongTo`, `ckbInteract`, `typeReaction`, `ckbShareWall`, `ckbComment`, `ckbTaoNoiDungAI`, `cbbPrompt`, `txtComment`, `ckbBinhLuanNhieuLan`, `nudBinhLuanNhieuLanDelayFrom`, `nudBinhLuanNhieuLanDelayTo`, `ckbTuDongXoaNoiDung`, `ckbViewFullContent`, `nudPercentViewFullContent`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 30. `invite_friends_like_page` — Mời bạn bè like page

**Ví dụ UI:** Form "Mời bạn bè Like Page": Page đích + nguồn bạn bè.

**Capability:** `page_id`
**Behavior operations:** (không có)
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `invite_friends_like_page` |
| Legacy interact type | `[30]` |
| Legacy semantic type | `["invite_friends_like_page"]` |
| Config class cũ | `HDMoiBanBeLikePageConfig` |
| Semantic runtime | `False` |
| Required V2 | `target.pageIds` |
| Optional V2 | `(không có)` |
| Legacy field count | `1` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, scope, scope.mode, scope.quantity, scope.quantity.from, scope.quantity.to, scope.quantity.unit, semanticRuntime, target, target.kind, target.pageIds, target.pageIds[], target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, type

**V2 key có thể có trong semantic template:** `không có`

**Legacy field áp dụng:** `txtUid`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 31. `invite_friends_group` — Mời bạn bè vào nhóm

**Ví dụ UI:** Form "Mời bạn bè vào nhóm": group + số lượng bạn bè.

**Capability:** `quantity`, `group_id`
**Behavior operations:** (không có)
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `invite_friends_group` |
| Legacy interact type | `[31]` |
| Legacy semantic type | `["invite_friends_group"]` |
| Config class cũ | `HDMoiBanBeVaoNhomConfig` |
| Semantic runtime | `False` |
| Required V2 | `scope.quantity`, `target.groupIds` |
| Optional V2 | `(không có)` |
| Legacy field count | `6` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, scope, scope.mode, scope.quantity, scope.quantity.from, scope.quantity.to, scope.quantity.unit, semanticRuntime, target, target.groupIds, target.groupIds[], target.kind, target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, type

**V2 key có thể có trong semantic template:** `không có`

**Legacy field áp dụng:** `nudSoLuongFrom`, `nudSoLuongTo`, `nudDelayFrom`, `nudDelayTo`, `txtIdGroup`, `typeInvite`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 32. `interact_reel` — Tương tác reel

**Ví dụ UI:** Card "Tương tác Reel": số Reel + operation.

**Capability:** `quantity`, `reaction`, `comment`, `share`, `ai_comment_prompt`, `view_full_content`, `reply_comment`
**Behavior operations:** `viewFullContent`, `reactionPost`, `commentPost`, `sharePost`, `replyComment`
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`, `delayBetweenTargetsSeconds`, `durationSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `interact_reel` |
| Legacy interact type | `[32]` |
| Legacy semantic type | `["interact_reel"]` |
| Config class cũ | `HDTuongTacReelConfig` |
| Semantic runtime | `True` |
| Required V2 | `scope.quantity`, `scope.outer.quantity` |
| Optional V2 | `reaction` |
| Legacy field count | `42` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, behavior.operations.commentPost, behavior.operations.commentPost.content, behavior.operations.commentPost.content.cleanupAfterUse, behavior.operations.commentPost.content.mediaIds, behavior.operations.commentPost.content.mediaIds[], behavior.operations.commentPost.content.promptId, behavior.operations.commentPost.content.source, behavior.operations.commentPost.content.text, behavior.operations.commentPost.content.text[], behavior.operations.commentPost.enabled, behavior.operations.commentPost.media, behavior.operations.commentPost.media.enabled, behavior.operations.commentPost.media.mediaIds, behavior.operations.commentPost.media.mediaIds[], behavior.operations.commentPost.media.selectionPercent, behavior.operations.commentPost.selectionPercent, behavior.operations.commentPost.sticker, behavior.operations.commentPost.sticker.enabled, behavior.operations.commentPost.tag, behavior.operations.commentPost.tag.enabled, behavior.operations.commentPost.tag.source, behavior.operations.commentPost.tag.uids, behavior.operations.commentPost.tag.uids[], behavior.operations.reactionPost, behavior.operations.reactionPost.enabled, behavior.operations.reactionPost.selectionMode, behavior.operations.reactionPost.selectionPercent, behavior.operations.reactionPost.types, behavior.operations.reactionPost.types[], behavior.operations.replyComment, behavior.operations.replyComment.conditions, behavior.operations.replyComment.content, behavior.operations.replyComment.content.cleanupAfterUse, behavior.operations.replyComment.content.promptId, behavior.operations.replyComment.content.source, behavior.operations.replyComment.content.text, behavior.operations.replyComment.content.text[], behavior.operations.replyComment.count, behavior.operations.replyComment.delaySeconds, behavior.operations.replyComment.delaySeconds.from, behavior.operations.replyComment.delaySeconds.to, behavior.operations.replyComment.enabled, behavior.operations.replyComment.maxComment, behavior.operations.replyComment.policies, behavior.operations.replyComment.policies[], behavior.operations.replyComment.selectionMode, behavior.operations.sharePost, behavior.operations.sharePost.content, behavior.operations.sharePost.content.cleanupAfterUse, behavior.operations.sharePost.content.mediaIds, behavior.operations.sharePost.content.mediaIds[], behavior.operations.sharePost.content.promptId, behavior.operations.sharePost.content.source, behavior.operations.sharePost.content.text, behavior.operations.sharePost.content.text[], behavior.operations.sharePost.destination, behavior.operations.sharePost.destination.groups, behavior.operations.sharePost.destination.groups[], behavior.operations.sharePost.destination.wall, behavior.operations.sharePost.enabled, behavior.operations.sharePost.selectionPercent, behavior.operations.viewFullContent, behavior.operations.viewFullContent.enabled, behavior.operations.viewFullContent.selectionPercent, scope, scope.inner, scope.inner.quantity, scope.inner.quantity.from, scope.inner.quantity.to, scope.inner.quantity.unit, scope.inner.unit, scope.mode, scope.outer, scope.outer.quantity, scope.outer.quantity.from, scope.outer.quantity.to, scope.outer.quantity.unit, scope.outer.unit, scope.quantityScope, semanticRuntime, target, target.kind, target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, timing.delayBetweenTargetsSeconds, timing.delayBetweenTargetsSeconds.from, timing.delayBetweenTargetsSeconds.to, timing.durationSeconds, type

**V2 key có thể có trong semantic template:** `behavior`, `behavior.mode`, `behavior.operations`, `behavior.operations.commentPost`, `behavior.operations.commentPost.content`, `behavior.operations.commentPost.content.cleanupAfterUse`, `behavior.operations.commentPost.content.mediaIds`, `behavior.operations.commentPost.content.mediaIds[]`, `behavior.operations.commentPost.content.promptId`, `behavior.operations.commentPost.content.source`, `behavior.operations.commentPost.content.text`, `behavior.operations.commentPost.content.text[]`, `behavior.operations.commentPost.enabled`, `behavior.operations.commentPost.media`, `behavior.operations.commentPost.media.enabled`, `behavior.operations.commentPost.media.mediaIds`, `behavior.operations.commentPost.media.mediaIds[]`, `behavior.operations.commentPost.media.selectionPercent`, `behavior.operations.commentPost.selectionPercent`, `behavior.operations.commentPost.sticker`, `behavior.operations.commentPost.sticker.enabled`, `behavior.operations.commentPost.tag`, `behavior.operations.commentPost.tag.enabled`, `behavior.operations.commentPost.tag.source`, `behavior.operations.commentPost.tag.uids`, `behavior.operations.commentPost.tag.uids[]`, `behavior.operations.reactionPost`, `behavior.operations.reactionPost.enabled`, `behavior.operations.reactionPost.selectionPercent`, `behavior.operations.reactionPost.selectionMode`, `behavior.operations.reactionPost.types`, `behavior.operations.reactionPost.types[]`, `behavior.operations.sharePost`, `behavior.operations.sharePost.content`, `behavior.operations.sharePost.content.cleanupAfterUse`, `behavior.operations.sharePost.content.mediaIds`, `behavior.operations.sharePost.content.mediaIds[]`, `behavior.operations.sharePost.content.promptId`, `behavior.operations.sharePost.content.source`, `behavior.operations.sharePost.content.text`, `behavior.operations.sharePost.content.text[]`, `behavior.operations.sharePost.destination`, `behavior.operations.sharePost.destination.groups`, `behavior.operations.sharePost.destination.groups[]`, `behavior.operations.sharePost.destination.wall`, `behavior.operations.sharePost.enabled`, `behavior.operations.sharePost.selectionPercent`, `semanticRuntime`, `semanticRuntime.postDecisionPolicy`, `semanticRuntime.postDecisionPolicy.otherwise`, `semanticRuntime.postDecisionPolicy.otherwise.behavior`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.count`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.mode`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.scope`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.max_comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.policies[]`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.policies[]`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.conditions`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.count`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.max_comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.policies[]`, `semanticRuntime.postDecisionPolicy.post_rules`, `semanticRuntime.postDecisionPolicy.post_rules[]`, `semanticRuntime.postDecisionPolicy.rule_resolution`, `semanticRuntime.postDecisionPolicy.schema_version`, `semanticRuntime.postDecisionPolicy.taxonomy`, `semanticRuntime.postDecisionPolicy.taxonomy.allow_multiple_categories`, `semanticRuntime.postDecisionPolicy.taxonomy.categories`, `semanticRuntime.postDecisionPolicy.taxonomy.categories[]`, `semanticRuntime.postDecisionPolicy.taxonomy.default_category`, `semanticRuntime.schemaVersion`, `semanticRuntime.summary`

**Legacy field áp dụng:** `nudSoLuongFrom`, `nudSoLuongTo`, `nudDelayFrom`, `nudDelayTo`, `nudTimeFrom`, `nudTimeTo`, `ckbInteract`, `nudPercentLike`, `typeReaction`, `ckbSendAnh`, `nudPercentCommentImage`, `txtAnh`, `ckbShareWall`, `nudPercentShareWall`, `txtContentShare`, `ckbComment`, `nudPercentCommentText`, `txtComment`, `ckbSticker`, `typeBinhLuan`, `ckbTaoNoiDungAI`, `cbbPrompt`, `ckbTuDongXoaNoiDung`, `cbbOptionsPost`, `nudSouongNhomFrom`, `nudSoLuongNhomTo`, `nudThoiGianFrom`, `nudThoiGianTo`, `cbbDoiTuong`, `txtTuKhoa`, `ckbViewFullContent`, `nudPercentViewFullContent`, `ckbReply`, `nudSoLuongReplyFrom`, `nudSoLuongReplyTo`, `nudDelayReplyFrom`, `nudDelayReplyTo`, `typeReactionComment`, `txtReplyComment`, `ckbTaoNoiDungAIReply`, `cbbPromptReply`, `ckbTuDongXoaNoiDungReply`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 33. `sync_contacts` — Đồng bộ danh bạ

**Ví dụ UI:** Form "Đồng bộ danh bạ": bật/tắt đồng bộ + tùy chọn.

**Capability:** `(không có)`
**Behavior operations:** (không có)
**Timing fields thực sự dùng:** `delayBeforeSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `sync_contacts` |
| Legacy interact type | `[33]` |
| Legacy semantic type | `["sync_contacts"]` |
| Config class cũ | `HDDongBoDanhBaConfig` |
| Semantic runtime | `False` |
| Required V2 | (không có) |
| Optional V2 | `(không có)` |
| Legacy field count | `9` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, scope, scope.mode, scope.quantity, semanticRuntime, target, target.kind, target.phoneNumbers, target.phoneNumbers[], target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, type

**V2 key có thể có trong semantic template:** `không có`

**Legacy field áp dụng:** `txtSdt`, `nudSoLuongFrom`, `nudSoLuongTo`, `ckbTuDongXoa`, `ckbAutoAddFriend`, `nudSoLuongKetBanFrom`, `nudSoLuongKetBanTo`, `nudDelayFrom`, `nudDelayTo`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 34. `change_password` — Đổi mật khẩu

**Ví dụ UI:** Form "Đổi mật khẩu": mật khẩu cũ/mới; không có quantity.

**Capability:** `(không có)`
**Behavior operations:** (không có)
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `timeoutSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `change_password` |
| Legacy interact type | `[34]` |
| Legacy semantic type | `["change_password"]` |
| Config class cũ | `HDDoiMatKhauConfig` |
| Semantic runtime | `False` |
| Required V2 | (không có) |
| Optional V2 | `(không có)` |
| Legacy field count | `4` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, scope, scope.mode, scope.quantity, semanticRuntime, target, target.kind, target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.timeoutSeconds, type

**V2 key có thể có trong semantic template:** `không có`

**Legacy field áp dụng:** `typeMatKhau`, `txtMatKhau`, `nudTimeOut`, `ckbDangXuatThietBiCu`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 35. `upload_avatar` — Up avatar

**Ví dụ UI:** Form "Up avatar": upload media hợp lệ.

**Capability:** `media`
**Behavior operations:** (không có)
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `upload_avatar` |
| Legacy interact type | `[35]` |
| Legacy semantic type | `["upload_avatar"]` |
| Config class cũ | `HDUpAvatarConfig` |
| Semantic runtime | `False` |
| Required V2 | `content.mediaIds` |
| Optional V2 | `(không có)` |
| Legacy field count | `4` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, scope, scope.mode, scope.quantity, scope.quantity.from, scope.quantity.to, scope.quantity.unit, semanticRuntime, target, target.kind, target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, type

**V2 key có thể có trong semantic template:** `không có`

**Legacy field áp dụng:** `txtPathFolder`, `ckbXoaAnhDaDung`, `ckbSkipIfHave`, `ckbThemKhungAvatar`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 36. `upload_cover` — Up cover

**Ví dụ UI:** Form "Up cover": upload media cover.

**Capability:** `media`
**Behavior operations:** (không có)
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `upload_cover` |
| Legacy interact type | `[36]` |
| Legacy semantic type | `["upload_cover"]` |
| Config class cũ | `HDUpCoverConfig` |
| Semantic runtime | `False` |
| Required V2 | `content.mediaIds` |
| Optional V2 | `(không có)` |
| Legacy field count | `3` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, scope, scope.mode, scope.quantity, scope.quantity.from, scope.quantity.to, scope.quantity.unit, semanticRuntime, target, target.kind, target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, type

**V2 key có thể có trong semantic template:** `không có`

**Legacy field áp dụng:** `txtPathFolder`, `ckbXoaAnhDaDung`, `ckbXoaAnh`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 37. `remove_phone` — Xóa số điện thoại

**Ví dụ UI:** Form "Xóa số điện thoại": xác nhận hành động.

**Capability:** `(không có)`
**Behavior operations:** (không có)
**Timing fields thực sự dùng:** `delayBeforeSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `remove_phone` |
| Legacy interact type | `[37]` |
| Legacy semantic type | `["remove_phone"]` |
| Config class cũ | `HDXoaSdtConfig` |
| Semantic runtime | `False` |
| Required V2 | (không có) |
| Optional V2 | `(không có)` |
| Legacy field count | `0` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, scope, scope.mode, scope.quantity, semanticRuntime, target, target.kind, target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, type

**V2 key có thể có trong semantic template:** `không có`

**Legacy field áp dụng:** `(không có)`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 38. `toggle_2fa` — Bật - tắt 2FA

**Ví dụ UI:** Form "Bật/tắt 2FA": trạng thái đích + xác nhận.

**Capability:** `(không có)`
**Behavior operations:** (không có)
**Timing fields thực sự dùng:** `delayBeforeSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `toggle_2fa` |
| Legacy interact type | `[38]` |
| Legacy semantic type | `["toggle_2fa"]` |
| Config class cũ | `HDOnOff2FAConfig` |
| Semantic runtime | `False` |
| Required V2 | (không có) |
| Optional V2 | `(không có)` |
| Legacy field count | `2` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, scope, scope.mode, scope.quantity, semanticRuntime, target, target.kind, target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, type

**V2 key có thể có trong semantic template:** `không có`

**Legacy field áp dụng:** `typeOnOff2FA`, `neuDaCo2FA`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 39. `add_email` — Thêm mail

**Ví dụ UI:** Form "Thêm email": email và xác thực.

**Capability:** `(không có)`
**Behavior operations:** (không có)
**Timing fields thực sự dùng:** `delayBeforeSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `add_email` |
| Legacy interact type | `[39]` |
| Legacy semantic type | `["add_email"]` |
| Config class cũ | `HDAddMailConfig` |
| Semantic runtime | `False` |
| Required V2 | (không có) |
| Optional V2 | `(không có)` |
| Legacy field count | `14` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, scope, scope.mode, scope.quantity, semanticRuntime, target, target.kind, target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, type

**V2 key có thể có trong semantic template:** `không có`

**Legacy field áp dụng:** `ckbAddMail`, `typeAddMail`, `typeMail`, `lstHotmail`, `lstMailDomain`, `lstDomain`, `lstDomainUnlimitMail`, `lstDomainDonglaomail`, `lstDomain1secmail`, `lstDomainMailtm`, `lstDomainMailTempSite`, `nudDelayOtp`, `ckbSetPrimaryMail`, `ckbRemoveMail`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 40. `change_name` — Đổi tên

**Ví dụ UI:** Form "Đổi tên": tên mới + tùy chọn.

**Capability:** `(không có)`
**Behavior operations:** (không có)
**Timing fields thực sự dùng:** `delayBeforeSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `change_name` |
| Legacy interact type | `[40]` |
| Legacy semantic type | `["change_name"]` |
| Config class cũ | `HDDoiTenConfig` |
| Semantic runtime | `False` |
| Required V2 | (không có) |
| Optional V2 | `(không có)` |
| Legacy field count | `8` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, scope, scope.mode, scope.quantity, semanticRuntime, target, target.kind, target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, type

**V2 key có thể có trong semantic template:** `không có`

**Legacy field áp dụng:** `typeDatTen`, `typeTenRandom`, `typeTenTuDat`, `lstHo`, `lstTenDem`, `lstTen`, `lstHoTen`, `ckbTuDongXoaNoiDung`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 41. `update_profile` — Cập nhật thông tin

**Ví dụ UI:** Form "Cập nhật thông tin": các field profile thay đổi.

**Capability:** `(không có)`
**Behavior operations:** (không có)
**Timing fields thực sự dùng:** `delayBeforeSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `update_profile` |
| Legacy interact type | `[41]` |
| Legacy semantic type | `["update_profile"]` |
| Config class cũ | `HDCapNhatThongTinConfig` |
| Semantic runtime | `False` |
| Required V2 | (không có) |
| Optional V2 | `(không có)` |
| Legacy field count | `26` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, scope, scope.mode, scope.quantity, semanticRuntime, target, target.kind, target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, type

**V2 key có thể có trong semantic template:** `không có`

**Legacy field áp dụng:** `ckbBio`, `ckbWork`, `ckbHighSchool`, `ckbCollege`, `ckbCurrentCity`, `ckbHometown`, `ckbRelationship`, `ckbGender`, `ckbBirthday`, `ckbOtherName`, `txtBio`, `lstWork`, `lstHighSchool`, `lstCollege`, `lstCurrentCity`, `lstHometown`, `lstOthersName`, `cbbRelationship`, `cbbGender`, `lstDay`, `lstMonth`, `lstYear`, `cbbIfHaveInfo`, `ckbSkipWhenHave`, `ckbDeleteWhenHave`, `ckbOnlyDelete`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 42. `logout_old_devices` — Đăng xuất thiết bị cũ

**Ví dụ UI:** Form "Đăng xuất thiết bị cũ": phạm vi thiết bị + xác nhận.

**Capability:** `(không có)`
**Behavior operations:** (không có)
**Timing fields thực sự dùng:** `delayBeforeSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `logout_old_devices` |
| Legacy interact type | `[42]` |
| Legacy semantic type | `["logout_old_devices"]` |
| Config class cũ | `HDDangXuatThietBiCuConfig` |
| Semantic runtime | `False` |
| Required V2 | (không có) |
| Optional V2 | `(không có)` |
| Legacy field count | `0` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, scope, scope.mode, scope.quantity, semanticRuntime, target, target.kind, target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, type

**V2 key có thể có trong semantic template:** `không có`

**Legacy field áp dụng:** `(không có)`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 43. `interact_group` — Tương tác nhóm

**Ví dụ UI:** Card "Tương tác nhóm": group + số bài + operation nội dung.

**Capability:** `group_id`, `quantity`, `reaction`, `comment`, `share`, `ai_comment_prompt`, `view_full_content`, `reply_comment`
**Behavior operations:** `viewFullContent`, `reactionPost`, `commentPost`, `sharePost`, `replyComment`
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`, `delayBetweenTargetsSeconds`, `durationSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `interact_group` |
| Legacy interact type | `[43]` |
| Legacy semantic type | `["interact_group"]` |
| Config class cũ | `HDTuongTacNhomConfig` |
| Semantic runtime | `True` |
| Required V2 | `scope.quantity`, `scope.outer.quantity` |
| Optional V2 | `reaction` |
| Legacy field count | `44` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, behavior.operations.commentPost, behavior.operations.commentPost.content, behavior.operations.commentPost.content.cleanupAfterUse, behavior.operations.commentPost.content.mediaIds, behavior.operations.commentPost.content.mediaIds[], behavior.operations.commentPost.content.promptId, behavior.operations.commentPost.content.source, behavior.operations.commentPost.content.text, behavior.operations.commentPost.content.text[], behavior.operations.commentPost.enabled, behavior.operations.commentPost.media, behavior.operations.commentPost.media.enabled, behavior.operations.commentPost.media.mediaIds, behavior.operations.commentPost.media.mediaIds[], behavior.operations.commentPost.media.selectionPercent, behavior.operations.commentPost.selectionPercent, behavior.operations.commentPost.sticker, behavior.operations.commentPost.sticker.enabled, behavior.operations.commentPost.tag, behavior.operations.commentPost.tag.enabled, behavior.operations.commentPost.tag.source, behavior.operations.commentPost.tag.uids, behavior.operations.commentPost.tag.uids[], behavior.operations.reactionPost, behavior.operations.reactionPost.enabled, behavior.operations.reactionPost.selectionMode, behavior.operations.reactionPost.selectionPercent, behavior.operations.reactionPost.types, behavior.operations.reactionPost.types[], behavior.operations.replyComment, behavior.operations.replyComment.conditions, behavior.operations.replyComment.content, behavior.operations.replyComment.content.cleanupAfterUse, behavior.operations.replyComment.content.promptId, behavior.operations.replyComment.content.source, behavior.operations.replyComment.content.text, behavior.operations.replyComment.content.text[], behavior.operations.replyComment.count, behavior.operations.replyComment.delaySeconds, behavior.operations.replyComment.delaySeconds.from, behavior.operations.replyComment.delaySeconds.to, behavior.operations.replyComment.enabled, behavior.operations.replyComment.maxComment, behavior.operations.replyComment.policies, behavior.operations.replyComment.policies[], behavior.operations.replyComment.selectionMode, behavior.operations.sharePost, behavior.operations.sharePost.content, behavior.operations.sharePost.content.cleanupAfterUse, behavior.operations.sharePost.content.mediaIds, behavior.operations.sharePost.content.mediaIds[], behavior.operations.sharePost.content.promptId, behavior.operations.sharePost.content.source, behavior.operations.sharePost.content.text, behavior.operations.sharePost.content.text[], behavior.operations.sharePost.destination, behavior.operations.sharePost.destination.groups, behavior.operations.sharePost.destination.groups[], behavior.operations.sharePost.destination.wall, behavior.operations.sharePost.enabled, behavior.operations.sharePost.selectionPercent, behavior.operations.viewFullContent, behavior.operations.viewFullContent.enabled, behavior.operations.viewFullContent.selectionPercent, scope, scope.inner, scope.inner.quantity, scope.inner.quantity.from, scope.inner.quantity.to, scope.inner.quantity.unit, scope.inner.unit, scope.mode, scope.outer, scope.outer.quantity, scope.outer.quantity.from, scope.outer.quantity.to, scope.outer.quantity.unit, scope.outer.unit, scope.quantityScope, semanticRuntime, target, target.groupIds, target.groupIds[], target.kind, target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, timing.delayBetweenTargetsSeconds, timing.delayBetweenTargetsSeconds.from, timing.delayBetweenTargetsSeconds.to, timing.durationSeconds, type

**V2 key có thể có trong semantic template:** `behavior`, `behavior.mode`, `behavior.operations`, `behavior.operations.commentPost`, `behavior.operations.commentPost.content`, `behavior.operations.commentPost.content.cleanupAfterUse`, `behavior.operations.commentPost.content.mediaIds`, `behavior.operations.commentPost.content.mediaIds[]`, `behavior.operations.commentPost.content.promptId`, `behavior.operations.commentPost.content.source`, `behavior.operations.commentPost.content.text`, `behavior.operations.commentPost.content.text[]`, `behavior.operations.commentPost.enabled`, `behavior.operations.commentPost.media`, `behavior.operations.commentPost.media.enabled`, `behavior.operations.commentPost.media.mediaIds`, `behavior.operations.commentPost.media.mediaIds[]`, `behavior.operations.commentPost.media.selectionPercent`, `behavior.operations.commentPost.selectionPercent`, `behavior.operations.commentPost.sticker`, `behavior.operations.commentPost.sticker.enabled`, `behavior.operations.commentPost.tag`, `behavior.operations.commentPost.tag.enabled`, `behavior.operations.commentPost.tag.source`, `behavior.operations.commentPost.tag.uids`, `behavior.operations.commentPost.tag.uids[]`, `behavior.operations.reactionPost`, `behavior.operations.reactionPost.enabled`, `behavior.operations.reactionPost.selectionPercent`, `behavior.operations.reactionPost.selectionMode`, `behavior.operations.reactionPost.types`, `behavior.operations.reactionPost.types[]`, `behavior.operations.sharePost`, `behavior.operations.sharePost.content`, `behavior.operations.sharePost.content.cleanupAfterUse`, `behavior.operations.sharePost.content.mediaIds`, `behavior.operations.sharePost.content.mediaIds[]`, `behavior.operations.sharePost.content.promptId`, `behavior.operations.sharePost.content.source`, `behavior.operations.sharePost.content.text`, `behavior.operations.sharePost.content.text[]`, `behavior.operations.sharePost.destination`, `behavior.operations.sharePost.destination.groups`, `behavior.operations.sharePost.destination.groups[]`, `behavior.operations.sharePost.destination.wall`, `behavior.operations.sharePost.enabled`, `behavior.operations.sharePost.selectionPercent`, `semanticRuntime`, `semanticRuntime.postDecisionPolicy`, `semanticRuntime.postDecisionPolicy.otherwise`, `semanticRuntime.postDecisionPolicy.otherwise.behavior`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.count`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.mode`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.scope`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.max_comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.policies[]`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.policies[]`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.conditions`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.count`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.max_comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.policies[]`, `semanticRuntime.postDecisionPolicy.post_rules`, `semanticRuntime.postDecisionPolicy.post_rules[]`, `semanticRuntime.postDecisionPolicy.rule_resolution`, `semanticRuntime.postDecisionPolicy.schema_version`, `semanticRuntime.postDecisionPolicy.taxonomy`, `semanticRuntime.postDecisionPolicy.taxonomy.allow_multiple_categories`, `semanticRuntime.postDecisionPolicy.taxonomy.categories`, `semanticRuntime.postDecisionPolicy.taxonomy.categories[]`, `semanticRuntime.postDecisionPolicy.taxonomy.default_category`, `semanticRuntime.schemaVersion`, `semanticRuntime.summary`

**Legacy field áp dụng:** `nudSoLuongFrom`, `nudSoLuongTo`, `nudDelayFrom`, `nudDelayTo`, `nudTimeFrom`, `nudTimeTo`, `ckbInteract`, `nudPercentLike`, `typeReaction`, `ckbSendAnh`, `nudPercentCommentImage`, `txtAnh`, `ckbShareWall`, `nudPercentShareWall`, `txtContentShare`, `ckbComment`, `nudPercentCommentText`, `txtComment`, `ckbSticker`, `typeBinhLuan`, `ckbTaoNoiDungAI`, `cbbPrompt`, `ckbTuDongXoaNoiDung`, `cbbOptionsPost`, `nudSouongNhomFrom`, `nudSoLuongNhomTo`, `nudThoiGianFrom`, `nudThoiGianTo`, `cbbDoiTuong`, `nudSoLuongProfileFrom`, `nudSoLuongProfileTo`, `txtId`, `ckbViewFullContent`, `nudPercentViewFullContent`, `ckbReply`, `nudSoLuongReplyFrom`, `nudSoLuongReplyTo`, `nudDelayReplyFrom`, `nudDelayReplyTo`, `typeReactionComment`, `txtReplyComment`, `ckbTaoNoiDungAIReply`, `cbbPromptReply`, `ckbTuDongXoaNoiDungReply`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 44. `interact_reel_target` — Tương tác reel chỉ định

**Ví dụ UI:** Card "Tương tác Reel chỉ định": reelIds + operation.

**Capability:** `quantity`, `reaction`, `comment`, `share`, `ai_comment_prompt`, `view_full_content`
**Behavior operations:** `viewFullContent`, `reactionPost`, `commentPost`, `sharePost`
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`, `durationSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `interact_reel_target` |
| Legacy interact type | `[45]` |
| Legacy semantic type | `["interact_reel_target"]` |
| Config class cũ | `HDTuongTacReelChiDinhConfig` |
| Semantic runtime | `True` |
| Required V2 | `scope.quantity`, `target.reelIds` |
| Optional V2 | `reaction` |
| Legacy field count | `13` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, behavior.operations.commentPost, behavior.operations.commentPost.content, behavior.operations.commentPost.content.cleanupAfterUse, behavior.operations.commentPost.content.mediaIds, behavior.operations.commentPost.content.mediaIds[], behavior.operations.commentPost.content.promptId, behavior.operations.commentPost.content.source, behavior.operations.commentPost.content.text, behavior.operations.commentPost.content.text[], behavior.operations.commentPost.enabled, behavior.operations.commentPost.media, behavior.operations.commentPost.media.enabled, behavior.operations.commentPost.media.mediaIds, behavior.operations.commentPost.media.mediaIds[], behavior.operations.commentPost.media.selectionPercent, behavior.operations.commentPost.selectionPercent, behavior.operations.commentPost.sticker, behavior.operations.commentPost.sticker.enabled, behavior.operations.commentPost.tag, behavior.operations.commentPost.tag.enabled, behavior.operations.commentPost.tag.source, behavior.operations.commentPost.tag.uids, behavior.operations.commentPost.tag.uids[], behavior.operations.reactionPost, behavior.operations.reactionPost.enabled, behavior.operations.reactionPost.selectionMode, behavior.operations.reactionPost.selectionPercent, behavior.operations.reactionPost.types, behavior.operations.reactionPost.types[], behavior.operations.sharePost, behavior.operations.sharePost.content, behavior.operations.sharePost.content.cleanupAfterUse, behavior.operations.sharePost.content.mediaIds, behavior.operations.sharePost.content.mediaIds[], behavior.operations.sharePost.content.promptId, behavior.operations.sharePost.content.source, behavior.operations.sharePost.content.text, behavior.operations.sharePost.content.text[], behavior.operations.sharePost.destination, behavior.operations.sharePost.destination.groups, behavior.operations.sharePost.destination.groups[], behavior.operations.sharePost.destination.wall, behavior.operations.sharePost.enabled, behavior.operations.sharePost.selectionPercent, behavior.operations.viewFullContent, behavior.operations.viewFullContent.enabled, behavior.operations.viewFullContent.selectionPercent, scope, scope.mode, scope.quantity, scope.quantity.from, scope.quantity.to, scope.quantity.unit, semanticRuntime, target, target.kind, target.reelIds, target.reelIds[], target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, timing.durationSeconds, type

**V2 key có thể có trong semantic template:** `behavior`, `behavior.mode`, `behavior.operations`, `behavior.operations.commentPost`, `behavior.operations.commentPost.content`, `behavior.operations.commentPost.content.cleanupAfterUse`, `behavior.operations.commentPost.content.mediaIds`, `behavior.operations.commentPost.content.mediaIds[]`, `behavior.operations.commentPost.content.promptId`, `behavior.operations.commentPost.content.source`, `behavior.operations.commentPost.content.text`, `behavior.operations.commentPost.content.text[]`, `behavior.operations.commentPost.enabled`, `behavior.operations.commentPost.media`, `behavior.operations.commentPost.media.enabled`, `behavior.operations.commentPost.media.mediaIds`, `behavior.operations.commentPost.media.mediaIds[]`, `behavior.operations.commentPost.media.selectionPercent`, `behavior.operations.commentPost.selectionPercent`, `behavior.operations.commentPost.sticker`, `behavior.operations.commentPost.sticker.enabled`, `behavior.operations.commentPost.tag`, `behavior.operations.commentPost.tag.enabled`, `behavior.operations.commentPost.tag.source`, `behavior.operations.commentPost.tag.uids`, `behavior.operations.commentPost.tag.uids[]`, `behavior.operations.reactionPost`, `behavior.operations.reactionPost.enabled`, `behavior.operations.reactionPost.selectionPercent`, `behavior.operations.reactionPost.selectionMode`, `behavior.operations.reactionPost.types`, `behavior.operations.reactionPost.types[]`, `behavior.operations.sharePost`, `behavior.operations.sharePost.content`, `behavior.operations.sharePost.content.cleanupAfterUse`, `behavior.operations.sharePost.content.mediaIds`, `behavior.operations.sharePost.content.mediaIds[]`, `behavior.operations.sharePost.content.promptId`, `behavior.operations.sharePost.content.source`, `behavior.operations.sharePost.content.text`, `behavior.operations.sharePost.content.text[]`, `behavior.operations.sharePost.destination`, `behavior.operations.sharePost.destination.groups`, `behavior.operations.sharePost.destination.groups[]`, `behavior.operations.sharePost.destination.wall`, `behavior.operations.sharePost.enabled`, `behavior.operations.sharePost.selectionPercent`, `semanticRuntime`, `semanticRuntime.postDecisionPolicy`, `semanticRuntime.postDecisionPolicy.otherwise`, `semanticRuntime.postDecisionPolicy.otherwise.behavior`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.count`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.mode`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.comment.selection.scope`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.max_comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.comment.policies[]`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reaction.post.policies[]`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.conditions`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.count`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.enabled`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.max_comment`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.policies`, `semanticRuntime.postDecisionPolicy.otherwise.behavior.reply.policies[]`, `semanticRuntime.postDecisionPolicy.post_rules`, `semanticRuntime.postDecisionPolicy.post_rules[]`, `semanticRuntime.postDecisionPolicy.rule_resolution`, `semanticRuntime.postDecisionPolicy.schema_version`, `semanticRuntime.postDecisionPolicy.taxonomy`, `semanticRuntime.postDecisionPolicy.taxonomy.allow_multiple_categories`, `semanticRuntime.postDecisionPolicy.taxonomy.categories`, `semanticRuntime.postDecisionPolicy.taxonomy.categories[]`, `semanticRuntime.postDecisionPolicy.taxonomy.default_category`, `semanticRuntime.schemaVersion`, `semanticRuntime.summary`

**Legacy field áp dụng:** `nudSoLuongUidFrom`, `nudSoLuongUidTo`, `txtIdPost`, `nudTimeFrom`, `nudTimeTo`, `ckbInteract`, `ckbShareWall`, `ckbComment`, `ckbTaoNoiDungAI`, `cbbPrompt`, `txtComment`, `ckbViewFullContent`, `nudPercentViewFullContent`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 45. `take_break` — Nghỉ giải lao

**Ví dụ UI:** Form "Nghỉ giải lao": thời lượng nghỉ từ–đến.

**Capability:** `(không có)`
**Behavior operations:** (không có)
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `durationSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `take_break` |
| Legacy interact type | `[46]` |
| Legacy semantic type | `["take_break"]` |
| Config class cũ | `HDNghiGiaiLaoConfig` |
| Semantic runtime | `False` |
| Required V2 | (không có) |
| Optional V2 | `(không có)` |
| Legacy field count | `2` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, scope, scope.durationSeconds, scope.durationSeconds.from, scope.durationSeconds.to, scope.durationSeconds.unit, scope.mode, semanticRuntime, target, target.kind, target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.durationSeconds, timing.durationSeconds.from, timing.durationSeconds.to, type

**V2 key có thể có trong semantic template:** `không có`

**Legacy field áp dụng:** `nudDelayFrom`, `nudDelayTo`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 46. `add_friend_group_member` — Kết bạn thành viên nhóm

**Ví dụ UI:** Form "Kết bạn thành viên nhóm": group + số lượng.

**Capability:** `quantity`, `group_id`
**Behavior operations:** (không có)
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `add_friend_group_member` |
| Legacy interact type | `[47]` |
| Legacy semantic type | `["add_friend_group_member"]` |
| Config class cũ | `HDKetBanThanhVienNhomConfig` |
| Semantic runtime | `False` |
| Required V2 | `scope.quantity`, `target.groupIds` |
| Optional V2 | `(không có)` |
| Legacy field count | `6` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, scope, scope.mode, scope.quantity, scope.quantity.from, scope.quantity.to, scope.quantity.unit, semanticRuntime, target, target.groupIds, target.groupIds[], target.kind, target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, type

**V2 key có thể có trong semantic template:** `không có`

**Legacy field áp dụng:** `nudSoLuongFrom`, `nudSoLuongTo`, `nudDelayFrom`, `nudDelayTo`, `txtUid`, `typeAdd`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 47. `add_friend_post_reactor` — Kết bạn user like post

**Ví dụ UI:** Form "Kết bạn người Like bài": postId + số lượng.

**Capability:** `quantity`, `post_id`
**Behavior operations:** (không có)
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `add_friend_post_reactor` |
| Legacy interact type | `[48]` |
| Legacy semantic type | `["add_friend_post_reactor"]` |
| Config class cũ | `HDKetBanUserReationBaiVietConfig` |
| Semantic runtime | `False` |
| Required V2 | `scope.quantity`, `target.postIds` |
| Optional V2 | `(không có)` |
| Legacy field count | `5` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, scope, scope.mode, scope.quantity, scope.quantity.from, scope.quantity.to, scope.quantity.unit, semanticRuntime, target, target.kind, target.postIds, target.postIds[], target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, type

**V2 key có thể có trong semantic template:** `không có`

**Legacy field áp dụng:** `nudSoLuongFrom`, `nudSoLuongTo`, `nudDelayFrom`, `nudDelayTo`, `txtUid`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 48. `create_page` — Tạo page

**Ví dụ UI:** Form "Tạo Page": page name, category và số lượng.

**Capability:** `quantity`, `page_name`
**Behavior operations:** (không có)
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `create_page` |
| Legacy interact type | `[49]` |
| Legacy semantic type | `["create_page"]` |
| Config class cũ | `HDTaoPageConfig` |
| Semantic runtime | `False` |
| Required V2 | `scope.quantity`, `page.name`, `page.category` |
| Optional V2 | `(không có)` |
| Legacy field count | `7` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, scope, scope.mode, scope.quantity, scope.quantity.from, scope.quantity.to, scope.quantity.unit, semanticRuntime, target, target.kind, target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, type

**V2 key có thể có trong semantic template:** `không có`

**Legacy field áp dụng:** `nudSoLuongFrom`, `nudSoLuongTo`, `nudDelayFrom`, `nudDelayTo`, `txtTenNhom`, `txtCatagory`, `ckbSwitchPage`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 49. `seed_events` — Seeding Events

**Ví dụ UI:** Form "Seeding Events": event URLs + nội dung.

**Capability:** `content`
**Behavior operations:** (không có)
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `seed_events` |
| Legacy interact type | `[50]` |
| Legacy semantic type | `["seed_events"]` |
| Config class cũ | `HDSeedingEventsConfig` |
| Semantic runtime | `False` |
| Required V2 | `target.eventUrls` |
| Optional V2 | `(không có)` |
| Legacy field count | `8` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, scope, scope.mode, scope.quantity, scope.quantity.from, scope.quantity.to, scope.quantity.unit, semanticRuntime, target, target.eventUrls, target.eventUrls[], target.kind, target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, type

**V2 key có thể có trong semantic template:** `không có`

**Legacy field áp dụng:** `txtLinkEvent`, `ckbQuanTam`, `ckbThamGia`, `ckbMoiBanBe`, `nudMoiBanBeFrom`, `nudMoiBanBeTo`, `nudDelayFrom`, `nudDelayTo`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 50. `delete_reel` — Xóa Reel

**Ví dụ UI:** Form "Xóa Reel": Reel sở hữu + số lượng.

**Capability:** `quantity`
**Behavior operations:** (không có)
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `delete_reel` |
| Legacy interact type | `[51]` |
| Legacy semantic type | `["delete_reel"]` |
| Config class cũ | `HDXoaReelConfig` |
| Semantic runtime | `False` |
| Required V2 | `scope.quantity`, `target.reelIds` |
| Optional V2 | `(không có)` |
| Legacy field count | `4` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, scope, scope.mode, scope.quantity, scope.quantity.from, scope.quantity.to, scope.quantity.unit, semanticRuntime, target, target.kind, target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, type

**V2 key có thể có trong semantic template:** `không có`

**Legacy field áp dụng:** `nudSoLuongFrom`, `nudSoLuongTo`, `nudKhoangCachFrom`, `nudKhoangCachTo`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 51. `delete_page_profile` — Xóa Page Profile

**Ví dụ UI:** Form "Xóa Page/Profile": phạm vi + số lượng + xác nhận.

**Capability:** `quantity`
**Behavior operations:** (không có)
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `delete_page_profile` |
| Legacy interact type | `[52]` |
| Legacy semantic type | `["delete_page_profile"]` |
| Config class cũ | `HDXoaPageProfileConfig` |
| Semantic runtime | `False` |
| Required V2 | `scope.quantity` |
| Optional V2 | `(không có)` |
| Legacy field count | `5` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, scope, scope.mode, scope.quantity, scope.quantity.from, scope.quantity.to, scope.quantity.unit, semanticRuntime, target, target.kind, target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, type

**V2 key có thể có trong semantic template:** `không có`

**Legacy field áp dụng:** `nudSoLuongFrom`, `nudSoLuongTo`, `nudDelayFrom`, `nudDelayTo`, `ckbOnlyDeleteTagPost`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.

### 52. `cancel_friend_request` — Hủy lời mời kết bạn

**Ví dụ UI:** Form "Hủy lời mời kết bạn": số lượng lời mời.

**Capability:** `quantity`
**Behavior operations:** (không có)
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `cancel_friend_request` |
| Legacy interact type | `[53]` |
| Legacy semantic type | `["cancel_friend_request"]` |
| Config class cũ | `HDHuyLoiMoiKetBanConfig` |
| Semantic runtime | `False` |
| Required V2 | `scope.quantity` |
| Optional V2 | `(không có)` |
| Legacy field count | `4` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, scope, scope.mode, scope.quantity, scope.quantity.from, scope.quantity.to, scope.quantity.unit, semanticRuntime, target, target.kind, target.selectionMode, timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, type

**V2 key có thể có trong semantic template:** `không có`

**Legacy field áp dụng:** `nudSoLuongFrom`, `nudSoLuongTo`, `nudDelayFrom`, `nudDelayTo`

Template JSON chi tiết của action nằm tại `actionCatalog[].templates.fixed`, `actionCatalog[].templates.semanticPolicy` và `actionCatalog[].templates.policyRule` trong file contract.


### 53. `report_target` — Vô hiệu hóa đối tượng

**Ví dụ UI:** Form chọn lý do report, loại đối tượng và danh sách UID/link bài viết/Page ID. Phần nội dung chỉ hiển thị trạng thái “Sử dụng nội dung mặc định”, không có lựa chọn AI/Prompt.

**Capability:** `report`, `explicit_target`
**Behavior operations:** `reportTarget`
**Timing fields thực sự dùng:** `delayBeforeSeconds`, `delayBetweenItemsSeconds`

| Thuộc tính | Giá trị |
|---|---|
| Canonical type | `report_target` |
| Legacy interact type | `[]` — action V2 native |
| Legacy semantic type | `[]` |
| Config class cũ | `null` |
| Semantic runtime | `False` |
| Required V2 | `target.kind`, `target.selectionMode`, `behavior.operations.reportTarget.reasonCode` |
| Conditional required | account → `target.uids`; post → `target.urls`; page → `target.pageIds` |
| Optional V2 | `behavior.operations.reportTarget.content` |
| Legacy field count | `0` |
| DB path | `definition.days[].rounds[].actions[]` |

**V2 key có thể có trong fixed template:** behavior, behavior.mode, behavior.operations, behavior.operations.reportTarget, behavior.operations.reportTarget.content, behavior.operations.reportTarget.content.source, behavior.operations.reportTarget.enabled, behavior.operations.reportTarget.reasonCode, scope, scope.mode, scope.unit, semanticRuntime, target, target.kind, target.selectionMode, target.uids, target.uids[], timing, timing.delayBeforeSeconds, timing.delayBeforeSeconds.from, timing.delayBeforeSeconds.to, timing.delayBetweenItemsSeconds, timing.delayBetweenItemsSeconds.from, timing.delayBetweenItemsSeconds.to, type

**V2 key có thể có trong semantic template:** `không có`

**Legacy field áp dụng:** không có; đây là action V2 native.

Template JSON chi tiết nằm tại `actionCatalog[].templates.fixed` trong file contract.

## 10. Mapping toàn bộ 261 legacy field

Mỗi field có `legacyPath`, `legacyType`, `description`, `constraints`, `v2Path`, `context`, `default` và `appliesToClasses`.

| Legacy field | Kiểu | V2 path | Context | Default | Mô tả |
|---|---|---|---|---|---|
| `nudSoLuongFrom` | int | `scope.quantity.from` | contextual_quantity | `{"value":1,"strategy":"minimum_one","apply":"when_quantity_is_used"}` | Số lượng tối thiểu cần thực hiện. |
| `nudSoLuongTo` | int | `scope.quantity.to` | contextual_quantity | `{"value":1,"strategy":"minimum_one","apply":"when_quantity_is_used"}` | Số lượng tối đa cần thực hiện. |
| `nudDelayFrom` | int | `timing.delayBetweenItemsSeconds.from` | contextual_delay | `{"value":30,"strategy":"constant","apply":"when_delay_is_used"}` | Thời gian delay tối thiểu giữa các thao tác. |
| `nudDelayTo` | int | `timing.delayBetweenItemsSeconds.to` | contextual_delay | `{"value":60,"strategy":"constant","apply":"when_delay_is_used"}` | Thời gian delay tối đa giữa các thao tác. |
| `nudTimeFrom` | int | `timing.durationSeconds.from` | duration | `{"value":5,"strategy":"constant","apply":"when_duration_is_used"}` | Thời gian tương tác tối thiểu. |
| `nudTimeTo` | int | `timing.durationSeconds.to` | duration | `{"value":15,"strategy":"constant","apply":"when_duration_is_used"}` | Thời gian tương tác tối đa. |
| `ckbInteract` | bool | `behavior.operations.reactionPost.enabled` | reaction_post | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt reaction/like. `true` = thực hiện, `false` = bỏ qua. |
| `nudPercentLike` | int | `behavior.operations.reactionPost.selectionPercent` | reaction_post | `{"value":100,"strategy":"constant","apply":"when_operation_enabled"}` | Tỷ lệ phần trăm thực hiện reaction/like. |
| `typeReaction` | List<int> | `behavior.operations.reactionPost.types` | reaction_post_fixed_or_policy | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Loại reaction: `0` Thích, `1` Yêu thích, `2` Thương, `3` Haha, `4` Ngạc nhiên, `5` Buồn, `6` Phẫn nộ. |
| `ckbSendAnh` | bool | `behavior.operations.commentPost.media.enabled` | comment_media | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt bình luận bằng ảnh. |
| `nudPercentCommentImage` | int | `behavior.operations.commentPost.media.selectionPercent` | comment_media | `{"value":100,"strategy":"constant","apply":"when_operation_enabled"}` | Tỷ lệ phần trăm bình luận bằng ảnh. |
| `txtAnh` | string | `behavior.operations.commentPost.media.mediaIds` | comment_media | `{"value":null,"strategy":"unset","apply":"required_when_feature_uses_it"}` | Đường dẫn hoặc danh sách ảnh dùng để bình luận. |
| `ckbShareWall` | bool | `behavior.operations.sharePost.enabled` | share_post | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt chia sẻ nội dung lên tường. |
| `nudPercentShareWall` | int | `behavior.operations.sharePost.selectionPercent` | share_post | `{"value":100,"strategy":"constant","apply":"when_operation_enabled"}` | Tỷ lệ phần trăm chia sẻ lên tường. |
| `txtContentShare` | List<string> | `behavior.operations.sharePost.content.text` | share_post | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách nội dung dùng khi chia sẻ. |
| `ckbComment` | bool | `behavior.operations.commentPost.enabled` | comment_post | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt bình luận bằng văn bản. |
| `nudPercentCommentText` | int | `behavior.operations.commentPost.selectionPercent` | comment_post | `{"value":100,"strategy":"constant","apply":"when_operation_enabled"}` | Tỷ lệ phần trăm bình luận bằng văn bản. |
| `txtComment` | List<string> | `behavior.operations.commentPost.content.text` | comment_post | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách nội dung bình luận. |
| `ckbSticker` | bool | `behavior.operations.commentPost.sticker.enabled` | comment_sticker | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt sử dụng sticker khi bình luận. |
| `typeBinhLuan` | int | `behavior.operations.commentPost.content.selectionMode` | comment_content | `{"value":0,"strategy":"first_enum_value","apply":"when_field_is_used"}` | `0` = chỉ định một loại (text hoặc ảnh); `1` = ngẫu nhiên một trong hai. |
| `ckbXoaThongBaoSpam` | bool | `behavior.cleanupSpam` | notification_cleanup | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt xóa thông báo spam. |
| `ckbTaoNoiDungAI` | bool | `behavior.operations.commentPost.content.source` | comment_content_source | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật tạo comment bằng AI |
| `cbbPrompt` | string | `behavior.operations.commentPost.content.promptId` | comment_ai_prompt | `{"value":null,"strategy":"unset","apply":"required_when_feature_uses_it"}` | Id prompt (`prompts._id`), bắt buộc khi bật AI |
| `ckbTuDongXoaNoiDung` | bool | `behavior.operations.commentPost.content.cleanupAfterUse` | content_cleanup | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt tự động xóa nội dung đã dùng. |
| `cbbOptionsPost` | int | `selection.options.postMode` | legacy_enum | `{"value":0,"strategy":"first_enum_value","apply":"when_field_is_used"}` | Tùy chọn giới hạn số lượng hoặc thời gian tương tác. |
| `nudThoiGianFrom` | int | `timing.durationSeconds.from` | duration | `{"value":1,"strategy":"minimum_one","apply":"when_quantity_is_used"}` | Thời gian thực hiện tối thiểu. |
| `nudThoiGianTo` | int | `timing.durationSeconds.to` | duration | `{"value":1,"strategy":"minimum_one","apply":"when_quantity_is_used"}` | Thời gian thực hiện tối đa. |
| `ckbViewFullContent` | bool | `semanticRuntime.input.viewFullContent.enabled` | semantic_input | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật xem đầy đủ nội dung bài viết (tìm & click **See more** trước khi gen comment AI). |
| `nudPercentViewFullContent` | int | `semanticRuntime.input.viewFullContent.percent` | semantic_input | `{"value":100,"strategy":"constant","apply":"when_view_full_content_enabled"}` | Tỷ lệ % thực hiện click See more khi `ckbViewFullContent = true` (0–100). |
| `ckbReply` | bool | `behavior.operations.replyComment.enabled` | reply_comment | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật tương tác bình luận |
| `nudSoLuongReplyFrom` | int | `behavior.operations.replyComment.count.from` | reply_comment | `{"value":1,"strategy":"minimum_one","apply":"when_quantity_is_used"}` | Số bình luận/bài (tối thiểu). |
| `nudSoLuongReplyTo` | int | `behavior.operations.replyComment.count.to` | reply_comment | `{"value":1,"strategy":"minimum_one","apply":"when_quantity_is_used"}` | Số bình luận/bài (tối đa). |
| `nudDelayReplyFrom` | int | `behavior.operations.replyComment.delaySeconds.from` | reply_comment | `{"value":5,"strategy":"constant","apply":"reply_enabled"}` | Delay giữa các lần (giây) (tối thiểu). |
| `nudDelayReplyTo` | int | `behavior.operations.replyComment.delaySeconds.to` | reply_comment | `{"value":10,"strategy":"constant","apply":"reply_enabled"}` | Delay giữa các lần (giây) (tối đa). |
| `typeReactionComment` | List<int> | `behavior.operations.reactionComment.types` | reaction_comment | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Reaction trên comment (`0`–`6`) |
| `txtReplyComment` | List<string> | `behavior.operations.replyComment.content.text` | reply_content | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Nội dung reply thủ công |
| `ckbTaoNoiDungAIReply` | bool | `behavior.operations.replyComment.content.source` | reply_content_source | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Dùng Vision analyze |
| `cbbPromptReply` | string | `behavior.operations.replyComment.content.promptId` | reply_ai_prompt | `{"value":null,"strategy":"unset","apply":"required_when_feature_uses_it"}` | Prompt id gửi kèm analyze |
| `ckbTuDongXoaNoiDungReply` | bool | `behavior.operations.replyComment.content.cleanupAfterUse` | reply_content_cleanup | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Xóa nội dung manual sau khi dùng |
| `nudSouongNhomFrom` | int | `scope.outer.quantity.from` | outer_group_quantity | `{"value":1,"strategy":"minimum_one","apply":"when_quantity_is_used"}` | Số lượng nhóm tối thiểu cần xử lý. |
| `nudSoLuongNhomTo` | int | `scope.outer.quantity.to` | outer_group_quantity | `{"value":1,"strategy":"minimum_one","apply":"when_quantity_is_used"}` | Số lượng nhóm tối đa cần xử lý. |
| `cbbDoiTuong` | int | `target.selectionMode` | legacy_enum | `{"value":0,"strategy":"first_enum_value","apply":"when_field_is_used"}` | Tùy chọn đối tượng cần thao tác. |
| `txtTuKhoa` | List<string> | `target.keywords` | contextual_target_keywords | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách từ khóa dùng để tìm kiếm hoặc lọc. |
| `nudSoLuongProfileFrom` | int | `scope.outer.quantity.from` | outer_profile_quantity | `{"value":1,"strategy":"minimum_one","apply":"when_quantity_is_used"}` | Số lượng profile tối thiểu cần xử lý. |
| `nudSoLuongProfileTo` | int | `scope.outer.quantity.to` | outer_profile_quantity | `{"value":1,"strategy":"minimum_one","apply":"when_quantity_is_used"}` | Số lượng profile tối đa cần xử lý. |
| `txtId` | List<string> | `target.ids` | contextual_target_ids | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách ID được chỉ định. |
| `ckbLikePage` | bool | `behavior.pageLike.enabled` | page_like | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt thao tác like page. |
| `ckbDieuKien` | bool | `selection.filters.enabled` | selection_filter | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt điều kiện lọc khi tương tác. |
| `nudLuotToiDa` | int | `selection.filters.maxRounds` | selection_filter | `{"value":null,"strategy":"unbounded","apply":"only_when_filter_enabled"}` | Số lượt tối đa được phép thực hiện. |
| `nudSoLuongBanFrom` | int | `scope.outer.quantity.from` | outer_friend_quantity | `{"value":1,"strategy":"minimum_one","apply":"when_quantity_is_used"}` | Số lượng bạn bè tối thiểu cần tương tác. |
| `nudSoLuongBanTo` | int | `scope.outer.quantity.to` | outer_friend_quantity | `{"value":1,"strategy":"minimum_one","apply":"when_quantity_is_used"}` | Số lượng bạn bè tối đa cần tương tác. |
| `ckbPublicPost` | bool | `selection.filters.postVisibility.public` | visibility_filter | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt tương tác bài viết công khai. |
| `ckbPrivatePost` | bool | `selection.filters.postVisibility.private` | visibility_filter | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt tương tác bài viết riêng tư. |
| `nudSoLuongKetBanMoiTuKhoaFrom` | int | `scope.perKeyword.quantity.from` | per_keyword_quantity | `{"value":1,"strategy":"minimum_one","apply":"when_quantity_is_used"}` | Số lượng kết bạn tối thiểu cho mỗi từ khóa. |
| `nudSoLuongKetBanMoiTuKhoaTo` | int | `scope.perKeyword.quantity.to` | per_keyword_quantity | `{"value":1,"strategy":"minimum_one","apply":"when_quantity_is_used"}` | Số lượng kết bạn tối đa cho mỗi từ khóa. |
| `nudPostFrom` | int | `followUpInteraction.scanPosts.quantity.from` | follow_up_scan | `{"value":1,"strategy":"minimum_one","apply":"when_quantity_is_used"}` | Số lượng bài viết tối thiểu cần quét trước khi kết bạn. |
| `nudPostTo` | int | `followUpInteraction.scanPosts.quantity.to` | follow_up_scan | `{"value":1,"strategy":"minimum_one","apply":"when_quantity_is_used"}` | Số lượng bài viết tối đa cần quét trước khi kết bạn. |
| `ckbTuongTac` | bool | `followUpInteraction.enabled` | follow_up | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt tương tác trước khi kết bạn. |
| `nudSoLuongBaiVietFrom` | int | `followUpInteraction.posts.quantity.from` | follow_up | `{"value":1,"strategy":"minimum_one","apply":"when_quantity_is_used"}` | Số lượng bài viết tối thiểu cần tương tác. |
| `nudSoLuongBaiVietTo` | int | `followUpInteraction.posts.quantity.to` | follow_up | `{"value":1,"strategy":"minimum_one","apply":"when_quantity_is_used"}` | Số lượng bài viết tối đa cần tương tác. |
| `nudTuongTacDelayFrom` | int | `followUpInteraction.timing.delaySeconds.from` | follow_up | `{"value":30,"strategy":"constant","apply":"when_delay_is_used"}` | Delay tối thiểu giữa các lần tương tác. |
| `nudTuongTacDelayTo` | int | `followUpInteraction.timing.delaySeconds.to` | follow_up | `{"value":60,"strategy":"constant","apply":"when_delay_is_used"}` | Delay tối đa giữa các lần tương tác. |
| `ckbTuongTacLike` | bool | `followUpInteraction.operations.reactionPost.enabled` | follow_up | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt like khi tương tác trước kết bạn. |
| `ckbTuongTacComment` | bool | `followUpInteraction.operations.commentPost.enabled` | follow_up | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt bình luận khi tương tác trước kết bạn. |
| `ckbKetBanTrungNhau` | bool | `deduplication.allowDuplicate` | deduplication | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Cho phép nhiều tài khoản kết bạn trùng UID. |
| `ckbBinhLuanNhieuLan` | bool | `behavior.operations.commentPost.repeat.enabled` | repeat_comment | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt bình luận nhiều lần trên cùng nội dung. |
| `nudBinhLuanNhieuLanDelayFrom` | int | `behavior.operations.commentPost.repeat.delaySeconds.from` | repeat_comment | `{"value":30,"strategy":"constant","apply":"when_delay_is_used"}` | Delay tối thiểu giữa các lần bình luận lại. |
| `nudBinhLuanNhieuLanDelayTo` | int | `behavior.operations.commentPost.repeat.delaySeconds.to` | repeat_comment | `{"value":60,"strategy":"constant","apply":"when_delay_is_used"}` | Delay tối đa giữa các lần bình luận lại. |
| `nudBinhLuanNhieuLanFrom` | int | `behavior.operations.commentPost.repeat.count.from` | repeat_comment | `{"value":1,"strategy":"minimum_one","apply":"when_quantity_is_used"}` | Số lần bình luận lại tối thiểu. |
| `nudBinhLuanNhieuLanTo` | int | `behavior.operations.commentPost.repeat.count.to` | repeat_comment | `{"value":1,"strategy":"minimum_one","apply":"when_quantity_is_used"}` | Số lần bình luận lại tối đa. |
| `ckbTagNeuBat` | bool | `behavior.operations.commentPost.tag.enabled` | comment_tag | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt gắn thẻ (tag) khi bình luận. |
| `typeTag` | int | `behavior.operations.commentPost.tag.strategy` | comment_tag | `{"value":0,"strategy":"first_enum_value","apply":"when_field_is_used"}` | Kiểu gắn thẻ khi bình luận. |
| `txtUid` | List<string> | `target.uids` | contextual_target_uids | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách UID được chỉ định. |
| `ckbTuongTacPost` | bool | `afterPublish.interact.enabled` | after_action_interaction | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt tương tác bài viết. |
| `ckbTuDongXoaUid` | bool | `target.source.cleanupAfterUse` | source_cleanup | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt tự động xóa UID đã dùng. |
| `nudDelayCheck` | int | `timing.checkDelaySeconds` | delay | `{"value":60,"strategy":"constant","apply":"when_delay_is_used"}` | Thời gian chờ kiểm tra giữa các lần kết bạn. |
| `ckbChiKetBanTenCoDau` | bool | `target.filters.nameHasDiacriticsOnly` | target_filter | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Chỉ kết bạn với tên có dấu tiếng Việt. |
| `ckbOnlyAddFriendWithMutualFriends` | bool | `target.filters.mutualFriendsOnly` | target_filter | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Chỉ kết bạn với người có bạn chung. |
| `nudTimesWarning` | int | `safety.maxWarnings` | safety | `{"value":3,"strategy":"constant","apply":"safety"}` | Số lần cảnh báo tối đa trước khi dừng. |
| `ckbSort` | bool | `selection.sort.enabled` | sort | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt sắp xếp danh sách trước khi hủy kết bạn. |
| `typeSort` | int | `selection.sort.type` | legacy_enum | `{"value":0,"strategy":"first_enum_value","apply":"when_field_is_used"}` | Kiểu sắp xếp: 0 danh sách bạn mới nhất, 1 danh sách bạn cũ nhất. |
| `typeHuyKetBan` | int | `selection.mode` | legacy_enum | `{"value":0,"strategy":"first_enum_value","apply":"when_field_is_used"}` | Kiểu hủy kết bạn: 0 ngẫu nhiên, 1 theo UID. |
| `txtUidKhongHuyKetBan` | List<string> | `target.excludeUids` | target_exclusion | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách UID không được hủy kết bạn. |
| `ckbTuDongTraLoiCauHoi` | bool | `membershipQuestionnaire.autoAnswer` | questionnaire | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt tự động trả lời câu hỏi khi tham gia nhóm. |
| `txtCauTraLoi` | List<string> | `membershipQuestionnaire.answers` | questionnaire | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách câu trả lời câu hỏi nhóm. |
| `ckbThamGiaNhomTrungNhau` | bool | `deduplication.allowDuplicate` | deduplication | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Cho phép nhiều tài khoản tham gia trùng nhóm. |
| `typeRoiNhom` | int | `selection.mode` | legacy_enum | `{"value":0,"strategy":"first_enum_value","apply":"when_field_is_used"}` | Kiểu rời nhóm: 0 ngẫu nhiên, 1 theo điều kiện. |
| `ckbDieuKienKiemDuyet` | bool | `selection.filters.approval.enabled` | selection_filter | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật điều kiện rời nhóm đang kiểm duyệt. |
| `ckbDieuKienThanhVien` | bool | `selection.filters.memberCount.enabled` | selection_filter | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật điều kiện rời nhóm theo số thành viên. |
| `nudThanhVienToiDa` | int | `selection.filters.memberCount.max` | selection_filter | `{"value":null,"strategy":"required","apply":"when_field_is_used"}` | Ngưỡng số thành viên tối đa để rời nhóm. |
| `ckbDieuKienTuKhoa` | bool | `selection.filters.keywords.enabled` | selection_filter | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật điều kiện rời nhóm theo từ khóa. |
| `txtIDNhomGiuLai` | List<string> | `selection.filters.keepGroupIds` | target_exclusion | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách ID nhóm cần giữ lại. |
| `ckbBackupDanhSachNhom` | bool | `data.backupGroupList` | data_backup | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt sao lưu danh sách nhóm. |
| `txtTenNhom` | List<string> | `resource.name.values` | resource_name | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách tên nhóm hoặc page cần tạo. |
| `typeAdd` | int | `target.memberSelection.type` | legacy_enum | `{"value":0,"strategy":"first_enum_value","apply":"when_field_is_used"}` | Kiểu thành viên cần kết bạn: 0 điểm chung, 1 lân cận, 2 mới. |
| `txtCatagory` | List<string> | `page.category.values` | page_category | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách danh mục page. |
| `ckbSwitchPage` | bool | `behavior.switchAfterCreate` | page_behavior | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt chuyển sang page sau khi tạo. |
| `nudKhoangCachFrom` | int | `timing.delayBetweenItemsSeconds.from` | delay | `{"value":30,"strategy":"constant","apply":"when_delay_is_used"}` | Khoảng cách thời gian tối thiểu giữa các lần đăng. |
| `nudKhoangCachTo` | int | `timing.delayBetweenItemsSeconds.to` | delay | `{"value":60,"strategy":"constant","apply":"when_delay_is_used"}` | Khoảng cách thời gian tối đa giữa các lần đăng. |
| `ckbVanBan` | bool | `content.text.enabled` | content_text | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt đăng kèm nội dung văn bản. |
| `ckbUseBackground` | bool | `content.background.enabled` | content_background | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt sử dụng nền khi đăng bài. |
| `ckbXoaNguyenLieuDaDung` | bool | `content.cleanupAfterUse` | content_cleanup | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt xóa nguyên liệu đã dùng. |
| `txtNoiDung` | List<string> | `content.text.values` | content_text | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách nội dung văn bản cần sử dụng. |
| `ckbAnh` | bool | `content.media.enabled` | content_media | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật đính kèm ảnh |
| `txtPathAnh` | List<string> | `content.media.mediaIds` | content_media | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Manual: mảng MinIO storageKey sau khi FE upload |
| `ckbDangLink` | bool | `content.link.enabled` | content_link | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt đăng kèm link. |
| `txtLinkShare` | List<string> | `content.link.values` | content_link | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách hoặc giá trị link cần chia sẻ. |
| `ckbXoaLink` | bool | `content.link.cleanupAfterUse` | content_cleanup | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt xóa link đã dùng. |
| `ckbTagFriends` | bool | `publishing.tagFriends.enabled` | tag_friends | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt gắn thẻ bạn bè khi đăng bài. |
| `nudSoLuongTagFrom` | int | `publishing.tagFriends.quantity.from` | tag_friends | `{"value":1,"strategy":"minimum_one","apply":"when_quantity_is_used"}` | Số lượng tag tối thiểu. |
| `nudSoLuongTagTo` | int | `publishing.tagFriends.quantity.to` | tag_friends | `{"value":1,"strategy":"minimum_one","apply":"when_quantity_is_used"}` | Số lượng tag tối đa. |
| `ckbXuatLinkBaiViet` | bool | `output.returnPostUrl` | output | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt xuất link bài viết sau khi đăng. |
| `ckbClickPrivacy` | bool | `publishing.visibility.enabled` | visibility | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt chỉnh quyền riêng tư trước khi đăng. |
| `ckbTaoAnhAI` | bool | `content.media.source` | media_ai | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật gen ảnh AI |
| `cbbPromptAnh` | string | `content.media.promptId` | media_ai_prompt | `{"value":null,"strategy":"unset","apply":"required_when_feature_uses_it"}` | `prompts._id` (dropdown `GET /api/prompts`) |
| `typeNhom` | int | `target.selectionMode` | legacy_enum | `{"value":0,"strategy":"first_enum_value","apply":"when_field_is_used"}` | Kiểu nhóm đăng bài: 0 ngẫu nhiên đã tham gia, 1 chỉ định, 2 tạo mới. |
| `ckbChiShareNhomKKD` | bool | `target.filters.noModerationOnly` | target_filter | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Chỉ chia sẻ vào nhóm không kiểm duyệt. |
| `ckbUuTienShareNhomNhieuThanhVien` | bool | `target.filters.preferLargeGroups` | target_filter | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Ưu tiên chia sẻ nhóm có nhiều thành viên. |
| `ckbKhongShareTrungNhom` | bool | `deduplication.allowDuplicate` | deduplication | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Không chia sẻ trùng nhóm. |
| `ckbChiShareNhomThuocDanhSach` | bool | `target.filters.onlyListedGroups` | target_filter | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Chỉ chia sẻ nhóm thuộc danh sách chỉ định. |
| `lstNhomTuNhap` | List<string> | `target.groupNames` | target_groups | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách nhóm tự nhập. |
| `txtIdNhomChiDinh` | List<string> | `target.groupIds` | target_groups | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách ID nhóm chỉ định. |
| `ckbPostAnDanh` | bool | `publishing.anonymous` | publishing | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt đăng bài ẩn danh trong nhóm. |
| `ckbEvent` | bool | `publishing.event.enabled` | event | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt gắn sự kiện khi đăng bài. |
| `txtEvent` | string | `publishing.event.value` | event | `{"value":null,"strategy":"unset","apply":"required_when_feature_uses_it"}` | Thông tin hoặc link sự kiện cần gắn. |
| `ckbRoiNhomKiemDuyet` | bool | `afterPublish.leaveIfModerated` | after_action | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt rời nhóm nếu bài bị kiểm duyệt. |
| `nudTimeoutLoadPost` | int | `timing.loadTimeoutSeconds` | timeout | `{"value":30,"strategy":"constant","apply":"when_timeout_is_used"}` | Thời gian chờ tải bài viết (timeout). |
| `ckbJoinGroup` | bool | `beforePublish.joinIfNeeded` | group_membership | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt tham gia nhóm nếu chưa tham gia. |
| `lstAnswers` | List<string> | `membershipQuestionnaire.answers` | questionnaire | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách câu trả lời khi tham gia nhóm. |
| `ckbShareBaiLenTuong` | bool | `shareDestinations.wall.enabled` | share_destination | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt chia sẻ bài lên tường. |
| `nudCountWallFrom` | int | `shareDestinations.wall.quantity.from` | share_destination | `{"value":1,"strategy":"minimum_one","apply":"when_quantity_is_used"}` | Số lần chia sẻ lên tường tối thiểu. |
| `nudCountWallTo` | int | `shareDestinations.wall.quantity.to` | share_destination | `{"value":1,"strategy":"minimum_one","apply":"when_quantity_is_used"}` | Số lần chia sẻ lên tường tối đa. |
| `ckbShareBaiLenNhom` | bool | `shareDestinations.groups.enabled` | share_destination | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt chia sẻ bài lên nhóm. |
| `nudCountGroupFrom` | int | `shareDestinations.groups.quantity.from` | share_destination | `{"value":1,"strategy":"minimum_one","apply":"when_quantity_is_used"}` | Số lần chia sẻ lên nhóm tối thiểu. |
| `nudCountGroupTo` | int | `shareDestinations.groups.quantity.to` | share_destination | `{"value":1,"strategy":"minimum_one","apply":"when_quantity_is_used"}` | Số lần chia sẻ lên nhóm tối đa. |
| `ckbShareNhomNangCao` | bool | `shareDestinations.groups.advanced.enabled` | share_destination | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt tùy chọn chia sẻ nhóm nâng cao. |
| `txtLinkChiaSe` | List<string> | `target.sourceUrls` | share_source | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách link dùng cho thao tác chia sẻ. |
| `typeLinkShare` | int | `target.contentType` | legacy_enum | `{"value":0,"strategy":"first_enum_value","apply":"when_field_is_used"}` | Loại link chia sẻ: 0 livestream, 1 bài viết, 2 reel. |
| `ckbTuongTacTruocKhiShare` | bool | `beforeShareInteraction.enabled` | before_action | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt tương tác trước khi chia sẻ. |
| `nudSoLuongUidFrom` | int | `scope.outer.quantity.from` | outer_uid_quantity | `{"value":1,"strategy":"minimum_one","apply":"when_quantity_is_used"}` | Số lượng UID tối thiểu cần xử lý. |
| `nudSoLuongUidTo` | int | `scope.outer.quantity.to` | outer_uid_quantity | `{"value":1,"strategy":"minimum_one","apply":"when_quantity_is_used"}` | Số lượng UID tối đa cần xử lý. |
| `typeID` | int | `target.kind` | legacy_enum | `{"value":0,"strategy":"first_enum_value","apply":"when_field_is_used"}` | Loại đối tượng: 0 profile, 1 group, 2 page. |
| `ckbSwipe` | bool | `navigation.swipe.enabled` | navigation | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt vuốt nội dung trước khi tương tác. |
| `nudCountSwipeFrom` | int | `navigation.swipe.quantity.from` | navigation | `{"value":1,"strategy":"minimum_one","apply":"when_quantity_is_used"}` | Số lần vuốt tối thiểu. |
| `nudCountSwipeTo` | int | `navigation.swipe.quantity.to` | navigation | `{"value":1,"strategy":"minimum_one","apply":"when_quantity_is_used"}` | Số lần vuốt tối đa. |
| `ckbReel` | bool | `target.filters.reel.enabled` | target_filter | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt ưu tiên hoặc xử lý reel. |
| `ckbHashtag` | bool | `publishing.hashtags.enabled` | hashtags | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt gắn hashtag khi đăng reel. |
| `txtHashtag` | List<string> | `publishing.hashtags.values` | hashtags | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách hashtag cần sử dụng. |
| `nudSoHashtagFrom` | int | `publishing.hashtags.quantity.from` | hashtags | `{"value":1,"strategy":"minimum_one","apply":"when_quantity_is_used"}` | Số hashtag tối thiểu cần gắn. |
| `nudSoHashtagTo` | int | `publishing.hashtags.quantity.to` | hashtags | `{"value":1,"strategy":"minimum_one","apply":"when_quantity_is_used"}` | Số hashtag tối đa cần gắn. |
| `ckbXoaVideoDaDang` | bool | `media.cleanupAfterPublish` | media_cleanup | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt xóa video đã đăng. |
| `ckbXuatLinkReels` | bool | `output.returnReelUrl` | output | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt xuất link reel sau khi đăng. |
| `typeReel` | int | `publishing.reelType` | legacy_enum | `{"value":0,"strategy":"first_enum_value","apply":"when_field_is_used"}` | Kiểu đăng hoặc nguồn reel. |
| `nudTimeOutLoadVideo` | int | `timing.loadTimeoutSeconds` | timeout | `{"value":30,"strategy":"constant","apply":"when_timeout_is_used"}` | Thời gian chờ tải video (timeout). |
| `cbbWhenTimeout` | int | `timing.onTimeout` | legacy_enum | `{"value":15,"strategy":"constant","apply":"when_duration_is_used"}` | Xử lý khi timeout: 0 thành công, 1 thất bại. |
| `ckbTuongTacReel` | bool | `afterPublish.interactReel.enabled` | after_action | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt tương tác sau khi đăng reel. |
| `ckbThuMucMedia` | bool | `media.sourceMode.folder.enabled` | media_source | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt lấy media từ thư mục chỉ định. |
| `txtThuMucMedia` | string | `media.sourceMode.folder.path` | media_source | `{"value":null,"strategy":"unset","apply":"required_when_feature_uses_it"}` | Đường dẫn thư mục media. |
| `ckbKhoNoiDung` | bool | `content.sourceMode.library.enabled` | content_source | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt lấy nội dung từ kho nội dung. |
| `txtKhoNoiDung` | string | `content.sourceMode.library.id` | content_source | `{"value":null,"strategy":"unset","apply":"required_when_feature_uses_it"}` | Đường dẫn hoặc mã kho nội dung. |
| `typeDang` | int | `publishing.storyType` | legacy_enum | `{"value":0,"strategy":"first_enum_value","apply":"when_field_is_used"}` | Kiểu đăng story: 0 text, 1 nhạc, 2 ảnh/video. |
| `ckbUseBackgroundText` | bool | `publishing.storyBackground.text.enabled` | story | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt dùng nền khi đăng story text. |
| `typeBaiHat` | int | `publishing.storyMusic.selectionMode` | legacy_enum | `{"value":0,"strategy":"first_enum_value","apply":"when_field_is_used"}` | Kiểu chọn bài hát: 0 ngẫu nhiên, 1 chỉ định. |
| `txtDanhSachBaiHat` | List<string> | `publishing.storyMusic.values` | story | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách bài hát chỉ định. |
| `ckbUseBackgroundNhac` | bool | `publishing.storyBackground.music.enabled` | story | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt dùng nền khi đăng story nhạc. |
| `ckbXoaAnhDaDang` | bool | `media.cleanupAfterPublish` | media_cleanup | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt xóa ảnh đã đăng. |
| `txtChiDangAnhPathAnh` | string | `media.imageOnlyIds` | story_media | `{"value":null,"strategy":"unset","apply":"required_when_feature_uses_it"}` | Đường dẫn ảnh dùng khi chỉ đăng ảnh. |
| `ckbChiDangAnhXoaAnhDaDang` | bool | `media.imageOnlyCleanupAfterPublish` | story_media | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt xóa ảnh đã dùng khi chỉ đăng ảnh. |
| `ckbGanLink` | bool | `publishing.link.enabled` | story_link | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt gắn link vào story. |
| `txtLink` | List<string> | `publishing.link.values` | story_link | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách link cần gắn hoặc xử lý. |
| `ckbPinStory` | bool | `publishing.pin` | story | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt ghim story. |
| `txtLinkEvent` | string | `target.eventUrls` | event | `{"value":null,"strategy":"unset","apply":"required_when_feature_uses_it"}` | Link sự kiện cần seeding. |
| `ckbQuanTam` | bool | `eventActions.interested` | event | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt quan tâm sự kiện. |
| `ckbThamGia` | bool | `eventActions.join` | event | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt tham gia sự kiện. |
| `ckbMoiBanBe` | bool | `eventActions.invite` | event | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt mời bạn bè tham gia sự kiện. |
| `nudMoiBanBeFrom` | int | `eventActions.inviteQuantity.from` | event | `{"value":1,"strategy":"minimum_one","apply":"when_quantity_is_used"}` | Số bạn bè mời tối thiểu. |
| `nudMoiBanBeTo` | int | `eventActions.inviteQuantity.to` | event | `{"value":1,"strategy":"minimum_one","apply":"when_quantity_is_used"}` | Số bạn bè mời tối đa. |
| `ckbOnlyDeleteTagPost` | bool | `selection.onlyTaggedPosts` | selection_filter | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Chỉ xóa bài viết có gắn thẻ. |
| `ckbFilter` | bool | `selection.filters.enabled` | selection_filter | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt bộ lọc bài viết theo từ khóa. |
| `cbbOptionsFilter` | int | `selection.filters.mode` | legacy_enum | `{"value":0,"strategy":"first_enum_value","apply":"when_field_is_used"}` | Tùy chọn kiểu lọc bài viết. |
| `txtIdPost` | List<string> | `target.postIds` | target_posts | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách ID bài viết hoặc reel được chỉ định. |
| `ckbTuDongXoaLink` | bool | `content.link.cleanupAfterUse` | content_cleanup | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt tự động xóa link đã dùng. |
| `ckbTuDongXoaAnh` | bool | `content.media.cleanupAfterUse` | content_cleanup | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt tự động xóa ảnh đã dùng. |
| `ckbDeleteComment` | bool | `afterAction.deleteComment.enabled` | after_action | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt xóa bình luận sau một khoảng thời gian. |
| `nudTimeDeleteFrom` | int | `afterAction.deleteComment.delaySeconds.from` | after_action | `{"value":null,"strategy":"required","apply":"delete_comment_enabled"}` | Thời gian chờ tối thiểu trước khi xóa bình luận. |
| `nudTimeDeleteTo` | int | `afterAction.deleteComment.delaySeconds.to` | after_action | `{"value":null,"strategy":"required","apply":"delete_comment_enabled"}` | Thời gian chờ tối đa trước khi xóa bình luận. |
| `ckbTag` | bool | `behavior.operations.commentPost.tag.enabled` | comment_tag | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt gắn thẻ trong bình luận. |
| `cbbTuyChonTag` | int | `behavior.operations.commentPost.tag.source` | comment_tag | `{"value":0,"strategy":"first_enum_value","apply":"when_field_is_used"}` | Tùy chọn nguồn tag: 0 bạn bè, 1 danh sách chỉ định. |
| `ckbChiTagTenViet` | bool | `behavior.operations.commentPost.tag.nameFilter` | comment_tag | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Chỉ gắn thẻ tên tiếng Việt. |
| `txtUidTag` | List<string> | `behavior.operations.commentPost.tag.uids` | comment_tag | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách UID dùng để gắn thẻ. |
| `ckbTuongTacVideoTrenPost` | bool | `behavior.operations.videoOnPost.enabled` | video_on_post | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt tương tác video nằm trên bài viết. |
| `nudTuongTacVideoTrenPostFrom` | int | `behavior.operations.videoOnPost.durationSeconds.from` | video_on_post | `{"value":1,"strategy":"minimum_one","apply":"when_quantity_is_used"}` | Thời gian tương tác video tối thiểu. |
| `nudTuongTacVideoTrenPostTo` | int | `behavior.operations.videoOnPost.durationSeconds.to` | video_on_post | `{"value":1,"strategy":"minimum_one","apply":"when_quantity_is_used"}` | Thời gian tương tác video tối đa. |
| `ckbGetPostAPI` | bool | `target.sourceApi.enabled` | api_source | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt lấy bài viết qua API. |
| `txtApiGetPost` | string | `target.sourceApi.url` | api_source | `{"value":null,"strategy":"unset","apply":"required_when_feature_uses_it"}` | URL API lấy danh sách bài viết. |
| `txtLinkVideo` | List<string> | `target.videoUrls` | target_video | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách link video cần tương tác. |
| `txtIdGroup` | List<string> | `target.groupIds` | target_groups | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách ID nhóm được chỉ định. |
| `typeInvite` | int | `invitation.type` | legacy_enum | `{"value":0,"strategy":"first_enum_value","apply":"when_field_is_used"}` | Kiểu mời bạn: 0 gợi ý, 1 lân cận, 2 cả hai. |
| `txtSdt` | List<string> | `target.phoneNumbers` | contacts | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách số điện thoại cần đồng bộ. |
| `ckbTuDongXoa` | bool | `target.phoneNumbers.cleanupAfterUse` | contacts | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt tự động xóa số đã dùng. |
| `ckbAutoAddFriend` | bool | `afterSync.addFriend.enabled` | after_action | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt tự động kết bạn sau khi đồng bộ. |
| `nudSoLuongKetBanFrom` | int | `afterSync.addFriend.quantity.from` | after_action | `{"value":1,"strategy":"minimum_one","apply":"when_quantity_is_used"}` | Số lượng kết bạn tối thiểu sau đồng bộ. |
| `nudSoLuongKetBanTo` | int | `afterSync.addFriend.quantity.to` | after_action | `{"value":1,"strategy":"minimum_one","apply":"when_quantity_is_used"}` | Số lượng kết bạn tối đa sau đồng bộ. |
| `typeMatKhau` | int | `security.password.sourceMode` | legacy_enum | `{"value":0,"strategy":"first_enum_value","apply":"when_field_is_used"}` | Kiểu mật khẩu: 0 ngẫu nhiên, 1 chỉ định. |
| `txtMatKhau` | List<string> | `security.password.values` | password | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách mật khẩu chỉ định. |
| `nudTimeOut` | int | `timing.timeoutSeconds` | timeout | `{"value":30,"strategy":"constant","apply":"when_timeout_is_used"}` | Thời gian chờ tối đa khi đổi mật khẩu. |
| `ckbDangXuatThietBiCu` | bool | `afterAction.logoutOldDevices` | security | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt đăng xuất thiết bị cũ sau khi đổi mật khẩu. |
| `txtPathFolder` | string | `media.sourceFolder` | media_source | `{"value":null,"strategy":"unset","apply":"required_when_feature_uses_it"}` | Đường dẫn thư mục chứa ảnh cần sử dụng. |
| `ckbXoaAnhDaDung` | bool | `media.cleanupAfterUse` | media_cleanup | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt xóa ảnh đã dùng. |
| `ckbSkipIfHave` | bool | `precondition.skipIfExists` | precondition | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bỏ qua nếu tài khoản đã có avatar. |
| `ckbThemKhungAvatar` | bool | `media.avatarFrame.enabled` | avatar | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt thêm khung avatar. |
| `ckbXoaAnh` | bool | `media.cleanupAfterUse` | media_cleanup | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt xóa ảnh sau khi cập nhật. |
| `typeOnOff2FA` | int | `security.desired2faState` | legacy_enum | `{"value":0,"strategy":"first_enum_value","apply":"when_field_is_used"}` | Tùy chọn 2FA: 0 tắt, 1 bật. |
| `neuDaCo2FA` | int | `security.ifAlreadyConfigured` | legacy_enum | `{"value":0,"strategy":"first_enum_value","apply":"when_field_is_used"}` | Xử lý khi đã có 2FA: 0 không bật, 1 giữ cũ và thêm mới, 2 xóa cũ rồi thêm mới, 3 thêm mới rồi xóa cũ. |
| `ckbAddMail` | bool | `email.enabled` | email | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt thêm mail. |
| `typeAddMail` | int | `email.addMode` | legacy_enum | `{"value":0,"strategy":"first_enum_value","apply":"when_field_is_used"}` | Kiểu thêm mail. |
| `typeMail` | int | `email.providerType` | legacy_enum | `{"value":0,"strategy":"first_enum_value","apply":"when_field_is_used"}` | Loại nguồn mail: 0 hostmail, 1 generator.email, 2 unlimitmail.com, 3 hotmail9.com, 4 1secmail.com. |
| `lstHotmail` | List<string> | `email.sources.hotmail` | email | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách tài khoản hotmail. |
| `lstMailDomain` | List<string> | `email.sources.domains` | email | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách domain mail. |
| `lstDomain` | List<string> | `email.sources.domains` | email | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách domain chung. |
| `lstDomainUnlimitMail` | List<string> | `email.sources.unlimitMailDomains` | email | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách domain UnlimitMail. |
| `lstDomainDonglaomail` | List<string> | `email.sources.donglaomailDomains` | email | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách domain Donglaomail. |
| `lstDomain1secmail` | List<string> | `email.sources.oneSecMailDomains` | email | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách domain 1secmail. |
| `lstDomainMailtm` | List<string> | `email.sources.mailTmDomains` | email | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách domain Mail.tm. |
| `lstDomainMailTempSite` | List<string> | `email.sources.mailTempSiteDomains` | email | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách domain MailTempSite. |
| `nudDelayOtp` | int | `email.otpDelaySeconds` | email | `{"value":60,"strategy":"constant","apply":"email_enabled"}` | Thời gian chờ nhận OTP. |
| `ckbSetPrimaryMail` | bool | `email.setPrimary` | email | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt đặt mail vừa thêm làm mail chính. |
| `ckbRemoveMail` | bool | `email.removeOld` | email | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt xóa mail cũ. |
| `typeDatTen` | int | `name.sourceMode` | legacy_enum | `{"value":0,"strategy":"first_enum_value","apply":"when_field_is_used"}` | Kiểu đặt tên: 0 ngẫu nhiên, 1 tự đặt. |
| `typeTenRandom` | int | `name.randomLocale` | legacy_enum | `{"value":0,"strategy":"first_enum_value","apply":"when_field_is_used"}` | Kiểu tên ngẫu nhiên: 0 tiếng Việt, 1 tên ngoại. |
| `typeTenTuDat` | int | `name.manualMode` | legacy_enum | `{"value":0,"strategy":"first_enum_value","apply":"when_field_is_used"}` | Kiểu tên tự đặt: 0 mix họ/đệm/tên, 1 họ tên. |
| `lstHo` | List<string> | `name.pools.lastNames` | name | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách họ dùng khi đổi tên. |
| `lstTenDem` | List<string> | `name.pools.middleNames` | name | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách tên đệm dùng khi đổi tên. |
| `lstTen` | List<string> | `name.pools.firstNames` | name | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách tên dùng khi đổi tên. |
| `lstHoTen` | List<string> | `name.pools.fullNames` | name | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách họ tên tự đặt. |
| `ckbBio` | bool | `profile.fields.bio.enabled` | profile | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt cập nhật tiểu sử. |
| `ckbWork` | bool | `profile.fields.work.enabled` | profile | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt cập nhật công việc. |
| `ckbHighSchool` | bool | `profile.fields.highSchool.enabled` | profile | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt cập nhật trường trung học. |
| `ckbCollege` | bool | `profile.fields.college.enabled` | profile | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt cập nhật trường cao đẳng/đại học. |
| `ckbCurrentCity` | bool | `profile.fields.currentCity.enabled` | profile | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt cập nhật thành phố hiện tại. |
| `ckbHometown` | bool | `profile.fields.hometown.enabled` | profile | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt cập nhật quê quán. |
| `ckbRelationship` | bool | `profile.fields.relationship.enabled` | profile | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt cập nhật tình trạng quan hệ. |
| `ckbGender` | bool | `profile.fields.gender.enabled` | profile | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt cập nhật giới tính. |
| `ckbBirthday` | bool | `profile.fields.birthday.enabled` | profile | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt cập nhật ngày sinh. |
| `ckbOtherName` | bool | `profile.fields.otherName.enabled` | profile | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bật/tắt cập nhật tên khác. |
| `txtBio` | List<string> | `profile.fields.bio.values` | profile | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách nội dung tiểu sử. |
| `lstWork` | List<string> | `profile.fields.work.values` | profile | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách thông tin công việc. |
| `lstHighSchool` | List<string> | `profile.fields.highSchool.values` | profile | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách trường trung học. |
| `lstCollege` | List<string> | `profile.fields.college.values` | profile | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách trường cao đẳng/đại học. |
| `lstCurrentCity` | List<string> | `profile.fields.currentCity.values` | profile | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách thành phố hiện tại. |
| `lstHometown` | List<string> | `profile.fields.hometown.values` | profile | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách quê quán. |
| `lstOthersName` | List<string> | `profile.fields.otherName.values` | profile | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách tên khác. |
| `cbbRelationship` | string | `profile.fields.relationship.value` | profile | `{"value":null,"strategy":"unset","apply":"required_when_feature_uses_it"}` | Trạng thái quan hệ cần thiết lập. |
| `cbbGender` | string | `profile.fields.gender.value` | profile | `{"value":null,"strategy":"unset","apply":"required_when_feature_uses_it"}` | Giới tính cần thiết lập. |
| `lstDay` | List<string> | `profile.fields.birthday.dayValues` | profile | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách ngày sinh. |
| `lstMonth` | List<string> | `profile.fields.birthday.monthValues` | profile | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách tháng sinh. |
| `lstYear` | List<string> | `profile.fields.birthday.yearValues` | profile | `{"value":[],"strategy":"empty_collection","apply":"only_when_source_is_enabled"}` | Danh sách năm sinh. |
| `cbbIfHaveInfo` | int | `profile.existingValuePolicy` | legacy_enum | `{"value":0,"strategy":"first_enum_value","apply":"when_field_is_used"}` | Cách xử lý khi đã có thông tin: 0 tiếp tục thêm, 1 không thêm, 2 xóa cũ rồi thêm mới, 3 chỉ xóa cũ. |
| `ckbSkipWhenHave` | bool | `profile.existingValuePolicy` | existing_value_policy | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Bỏ qua nếu đã có thông tin. |
| `ckbDeleteWhenHave` | bool | `profile.existingValuePolicy` | existing_value_policy | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Xóa thông tin cũ nếu đã có. |
| `ckbOnlyDelete` | bool | `profile.existingValuePolicy` | existing_value_policy | `{"value":false,"strategy":"disabled_by_default","apply":"feature_toggle"}` | Chỉ xóa thông tin cũ, không thêm mới. |


## 11. Account và schedule do BE quản lý ngoài script JSON

`data.script` và `script_definitions.definition` chỉ chứa graph của kịch bản: `days[]` → `rounds[]` → `actions[]`. Không đặt `assignments`, `accountId`, `startAt`, `endAt` hoặc lịch riêng của nick vào JSON script. BE bên ngoài tự tạo mapping `scriptId` - `accountId` và lịch chạy trong collection riêng.

### 11.1 Kịch bản đơn (`kind=single`)

Script đơn luôn có đúng một phần tử `days[]`, có thể chứa một hoặc nhiều action. Không có `script.schedule`; `round.startTime` và `round.endTime` cũng không xuất hiện. Ví dụ payload lưu tại `script_definitions.definition`:

```json
{
  "scriptId": "script-single-001",
  "name": "Đọc thông báo và tương tác Newsfeed",
  "description": null,
  "kind": "single",
  "status": "published",
  "revision": 1,
  "timezone": "Asia/Ho_Chi_Minh",
  "summary": {
    "text": "Một ngày, một lượt, hai hành động.",
    "dayCount": 1,
    "roundCount": 1,
    "actionCount": 2,
    "policyCount": 0,
    "warnings": []
  },
  "days": [
    {
      "dayId": "day-001",
      "dayNumber": 1,
      "label": "Ngày 1",
      "date": null,
      "dateOffset": 0,
      "enabled": true,
      "summary": null,
      "rounds": [
        {
          "roundId": "day-001-round-001",
          "order": 1,
          "enabled": true,
          "actions": [
            {
              "actionId": "day-001-round-001-action-001",
              "order": 1,
              "type": "read_notifications",
              "title": "Đọc thông báo",
              "enabled": true
            },
            {
              "actionId": "day-001-round-001-action-002",
              "order": 2,
              "type": "interact_newsfeed",
              "title": "Tương tác Newsfeed",
              "enabled": true
            }
          ]
        }
      ]
    }
  ],
  "validation": null,
  "audit": null
}
```

Các action trong ví dụ rút gọn ở trên vẫn phải giữ đầy đủ `target`, `scope`, `timing`, `behavior` và `semanticRuntime` theo catalog khi trả về thực tế.

### 11.2 Kịch bản nhiều ngày (`kind=multi_day`)

`multi_day` giữ nguyên graph nhiều ngày trong script. `dateOffset` mô tả độ lệch ngày tương đối; nếu có `round.startTime/endTime` thì đó chỉ là giờ mẫu chung để BE materialize, không phải lịch của một account cụ thể.

```json
{
  "scriptId": "script-route-30d",
  "name": "Lộ trình AI nuôi nick 30 ngày",
  "kind": "multi_day",
  "status": "published",
  "revision": 3,
  "timezone": "Asia/Ho_Chi_Minh",
  "days": [
    {
      "dayId": "day-001",
      "dayNumber": 1,
      "dateOffset": 0,
      "enabled": true,
      "rounds": [
        {
          "roundId": "day-001-round-001",
          "order": 1,
          "startTime": "09:12",
          "endTime": null,
          "enabled": true,
          "actions": []
        }
      ]
    },
    {
      "dayId": "day-002",
      "dayNumber": 2,
      "dateOffset": 1,
      "enabled": true,
      "rounds": []
    }
  ]
}
```

### 11.3 Document mapping do BE sở hữu

Sau khi lưu script, BE tự tạo một document cho mỗi account trong `script_assignments`. Document này không được ghép ngược vào `data.script`:

```json
{
  "assignmentId": "assignment-001",
  "scriptId": "script-single-001",
  "scriptRevision": 1,
  "accountId": "account-001",
  "enabled": true,
  "status": "active",
  "timezone": "Asia/Ho_Chi_Minh",
  "schedule": {
    "mode": "once",
    "startAt": "2026-09-04T02:00:00.000Z",
    "endAt": null,
    "repeat": null,
    "runWindow": null
  },
  "roundScheduleOverrides": [],
  "createdAt": "2026-09-04T01:00:00.000Z",
  "updatedAt": "2026-09-04T01:00:00.000Z"
}
```

`scriptRevision` khóa assignment vào đúng phiên bản graph. Khi script sửa và publish revision mới, BE có thể tạo assignment/occurrence mới mà không làm thay đổi lịch của account đang chạy revision cũ.

### 11.4 Lịch riêng từng lượt của kịch bản nhiều ngày

Nếu toàn bộ lộ trình chỉ lệch một mốc bắt đầu, BE chỉ cần đổi `schedule.startAt`. Nếu từng account có giờ khác nhau ở từng ngày/lượt, lưu override trong document assignment:

```json
{
  "assignmentId": "assignment-002",
  "scriptId": "script-route-30d",
  "scriptRevision": 3,
  "accountId": "account-002",
  "enabled": true,
  "schedule": {
    "mode": "once",
    "startAt": "2026-09-04T02:00:00.000Z"
  },
  "roundScheduleOverrides": [
    {
      "dayNumber": 1,
      "roundId": "day-001-round-001",
      "startTime": "15:30",
      "endTime": null
    }
  ]
}
```

### 11.5 Materialize occurrence để query/chạy nhanh

Khi publish hoặc cập nhật mapping, BE đọc graph từ `script_definitions.definition`, ghép lịch trong `script_assignments`, rồi tạo các document phẳng ở `account_schedule_occurrences`. Scheduler chỉ query occurrence theo `accountId`, `status`, `startsAt`; không cần đọc nested script mỗi lần.

```text
script_definitions.definition
        + script_assignments
        ↓ materialize
account_schedule_occurrences
        ↓ scheduler query
script_runs
```

## 12. Gán nhiều script cho một account và kiểm tra trùng lịch

### 12.1 Không query nested script trực tiếp

Không nên mỗi lần gán account lại đọc toàn bộ `days[].rounds[]` để tính lịch. Khi publish/assign, materialize các lần chạy thành collection phẳng.

```text
script_definitions
    → publish/assign
account_schedule_occurrences
    → thời điểm cụ thể theo account
script_runs
    → trạng thái thực thi
```

### 12.2 Occurrence document

```json
{
  "accountId": "account-001",
  "scriptId": "script-001",
  "scriptRevision": 3,
  "occurrenceId": "script-001-20260904-day1-round1",
  "startsAt": "2026-09-04T04:00:00.000Z",
  "endsAt": "2026-09-04T04:30:00.000Z",
  "status": "scheduled",
  "dayNumber": 1,
  "roundId": "day-001-round-001",
  "actionIds": ["day-001-round-001-action-001"]
}
```

Timestamp lưu UTC; FE đổi sang timezone của script khi hiển thị.

### 12.3 Index MongoDB

```javascript
db.account_schedule_occurrences.createIndex({
  accountId: 1,
  status: 1,
  startsAt: 1,
  endsAt: 1
})
```

### 12.4 Kiểm tra cửa sổ hiện tại ±30 phút

Nếu muốn phát hiện occurrence giao với cửa sổ thời gian hiện tại:

```javascript
const now = new Date();
const from = new Date(now.getTime() - 30 * 60 * 1000);
const to = new Date(now.getTime() + 30 * 60 * 1000);

const conflict = db.account_schedule_occurrences.findOne(
  {
    accountId: "account-001",
    status: { $in: ["scheduled", "queued", "running"] },
    startsAt: { $lte: to },
    endsAt: { $gte: from }
  },
  { projection: { _id: 1, scriptId: 1, startsAt: 1, endsAt: 1 } }
);

const available = conflict === null;
```

Nếu chỉ cần kiểm tra thời điểm bắt đầu nằm trong ±30 phút thì dùng `startsAt: { $gte: from, $lte: to }`. Query giao khoảng `startsAt/endsAt` an toàn hơn khi round có thời lượng.

### 12.5 Có nhanh không?

Có, nếu dùng occurrence phẳng, compound index, `findOne`, projection tối thiểu và không dùng `countDocuments`. Backend chỉ cần trả boolean:

```json
{
  "available": false,
  "reason": "schedule_conflict",
  "conflict": {
    "scriptId": "script-001",
    "startsAt": "2026-09-04T04:00:00.000Z",
    "endsAt": "2026-09-04T04:30:00.000Z"
  }
}
```

Độ trễ thực tế phụ thuộc network và tải MongoDB, nhưng indexed `findOne` nhanh hơn rất nhiều so với đọc và phân tích toàn bộ script.

### 11.6 Tránh race condition

Không dùng độc lập `find conflict → không có → insert`, vì hai request đồng thời có thể cùng vượt qua bước kiểm tra.

Nên dùng transaction MongoDB, distributed lock theo account, time bucket + unique index hoặc trạng thái `reserved` được tạo atomic trước khi publish.

## 12. Checklist tích hợp

- [ ] FE đọc `response.data.script`.
- [ ] `report_target` chỉ gửi field target tương ứng với `target.kind`, luôn có `reasonCode`, chỉ dùng `content.source=system_default` và không gửi `promptId`.
- [ ] FE không hiển thị toàn bộ legacy field trong form chính.
- [ ] Action dùng canonical `type`.
- [ ] Newsfeed dùng `interact_newsfeed`.
- [ ] `selectionMode` khác với policy `selection_mode`.
- [ ] Chính xác 50% dùng `selectionMode=percentage` và `selectionPercent=50`.
- [ ] `all_matching` đi với `count=null`.
- [ ] Reply không dùng đồng thời `conditions` và `policies`.
- [ ] `max_comment` mặc định 20 khi reply/reaction comment bật.
- [ ] Script đơn có một day; script nhiều ngày lưu nested day/round/action.
- [ ] DB lưu canonical definition.
- [ ] Conflict query dùng occurrence collection và index.
- [ ] Assignment dùng reserve atomic.
## Cầu nối semantic policy khi thực thi V2

Action có `behavior.mode="semantic_policy"` được thực thi qua semantic runtime đã có trong `ScriptRunner`, nhưng policy phải lấy từ đúng revision mà occurrence đã khóa. BE không ghi action V2 vào collection action legacy.

Khi một occurrence V2 bắt đầu, `ExecutionSlice` giữ `scriptId`, `scriptRevision`, `occurrenceId`, `runId`, action canonical và projection legacy trong cùng scope Hangfire. Projection chỉ bật semantic runtime cho 14 nhóm tương tác nội dung mà runner hiện hỗ trợ: interact type `2, 3, 4, 5, 6, 7, 20, 21, 27, 28, 29, 32, 43, 45`. Action semantic ngoài phạm vi này bị từ chối ở bước execution preview hoặc assignment.

Mỗi request semantic `POST /generate-text` và `POST /api/vision/comments/analyze` vẫn gửi các field cũ `scriptId`, `scriptActionId`, ảnh và header `X-Device-ID`, đồng thời gửi thêm:

| Field multipart | Ý nghĩa |
| --- | --- |
| `scriptRevision` | Revision immutable của script đã gắn với assignment |
| `occurrenceId` | Lần chạy lịch hiện tại |
| `runId` | Run V2 hiện tại |
| `semanticRuntime` | Policy canonical của action tại revision đã khóa |

AI quyết định `skip`, react bài, comment bài, quét comment, react comment hoặc reply. Trước khi chuyển quyết định cho thao tác thiết bị, BE đối chiếu quyết định với `matchedRuleId` và behavior trong policy đã khóa. Quyết định yêu cầu operation chưa được policy cho phép, reaction không thuộc policy hoặc rule không tồn tại được thay bằng `skip`. Kết quả phân tích comment cũng bị loại riêng từng reply/reaction không được policy cho phép.

Mỗi response semantic được ghi vào `script_runs.semanticDecisions` với thời điểm, phase, action, revision, occurrence, fingerprint ảnh, decision ID, trạng thái replay, kết quả kiểm tra, SHA-256 response và preview tối đa 2 KiB. Response đầy đủ tiếp tục đi theo luồng evidence MinIO hiện có. Legacy path không có `ExecutionSlice` tiếp tục dùng request và hành vi cũ.

AI service cần đọc bốn field bổ sung để ưu tiên policy được BE gửi kèm. Nếu AI service chưa hỗ trợ giao thức này và chỉ tra action legacy, nó sẽ trả `RuntimeBindingNotFound`; BE giữ nguyên cơ chế fail-safe và không fallback sang prompt legacy.
