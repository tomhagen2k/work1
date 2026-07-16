# Tài liệu hướng dẫn: Pull Alert / Case từ hệ thống ngoài

Tính năng cho phép SOAR **chủ động gọi API hệ thống khác** để kéo **alert** hoặc **case** về (chiều
ngược của integration push). SOAR quét định kỳ theo **cursor tăng dần theo ID**, map dữ liệu nguồn
rồi lưu qua đúng luồng ingest sẵn có:
- `data_type = ALERT` → map về `AlertIngestRequest` → lưu **Elasticsearch**.
- `data_type = CASE` → map về `CaseSiemRequest` → lưu **PostgreSQL** (qua luồng batch SIEM: convert + createCase).

> Trạng thái: **Alert và Case đã triển khai**.

---

## 1. Tổng quan luồng

```
Quartz Cron (mỗi nguồn 1 job)  ──►  IntegratePullSyncService.sync(sourceId)
   │
   ├─ đọc cursor (last_event_time) của nguồn
   ├─ lặp: GET {base_url}{endpoint_path}?{time_param}=fromTime&{size_param}=pageSize
   │        (kèm header xác thực, API nguồn cần trả về dữ liệu sắp xếp cũ -> mới)
   ├─ lấy mảng record tại records_path
   ├─ map mỗi record → AlertIngestRequest theo field_mapping (dot-path)
   ├─ lưu alert: alertService.createFromIntegration(...)  (trùng id thì bỏ qua)
   ├─ cập nhật cursor = max(thời gian sự kiện của trang)
   └─ dừng khi trang rỗng / số record < pageSize / cursor không tiến triển
```

- **Dedup idempotent:** `external id` được set vào `AlertIngestRequest.id`. Chạy lại không tạo trùng
  (alert id đã tồn tại sẽ bị bỏ qua).
- **Đa nguồn:** mỗi nguồn cấu hình riêng URL, header, tên tham số, đường dẫn mảng và ánh xạ field —
  không cần code riêng cho từng nguồn.
- **Clustered:** job chạy trên Quartz JDBC store dạng cluster nên chỉ 1 node fire, không lo trùng.

---

## 2. Bảng dữ liệu

| Bảng | Vai trò |
|------|---------|
| `integrate_pull_source` | Cấu hình nguồn pull |
| `integrate_pull_cursor` | Vị trí đã quét (`last_event_time`, `last_sync_at`) — mỗi nguồn 1 dòng, hệ thống tự tạo/cập nhật |

---

## 3. API quản lý nguồn

Base path: `/api/v1/integrate-pull-sources` · Header: `Language: vi|en`

| Method | Path | Mô tả |
|--------|------|-------|
| `POST` | `/api/v1/integrate-pull-sources` | Tạo nguồn |
| `GET`  | `/api/v1/integrate-pull-sources` | Danh sách nguồn |
| `GET`  | `/api/v1/integrate-pull-sources/{id}` | Chi tiết nguồn (kèm trạng thái cursor) |
| `PUT`  | `/api/v1/integrate-pull-sources/{id}` | Cập nhật nguồn (tự re-arm lịch) |
| `DELETE` | `/api/v1/integrate-pull-sources/{id}` | Xóa nguồn (hủy lịch + xóa cursor) |
| `POST` | `/api/v1/integrate-pull-sources/{id}/run` | **Chạy quét ngay** (test, không chờ lịch) |

### 3.1 Body tạo/cập nhật

| Field (snake_case) | Bắt buộc | Ý nghĩa |
|--------------------|:--:|---------|
| `name` | ✅ | Tên nguồn (duy nhất) |
| `data_type` |  | `ALERT` (mặc định) hoặc `CASE` |
| `base_url` | ✅ | URL gốc, vd `https://siem.example.com` |
| `endpoint_path` | ✅ | Path lấy alert, vd `/api/v1/alerts` |
| `auth_token` |  | Giá trị token/khóa gửi kèm header |
| `auth_header_name` |  | Tên header mang token (mặc định `Authorization`); vd `x-api-key` |
| `time_param` | ✅ | Tên query param mang mốc thời gian bắt đầu quét, vd `start_time`, `since` |
| `size_param` |  | Tên query param số bản ghi mỗi lần, vd `limit` |
| `page_size` |  | Số bản ghi mỗi lần (mặc định 100) |
| `initial_from_time` |  | Thời gian bắt đầu quét lần đầu (khi chưa có cursor). Bỏ trống = lấy từ đầu |
| `records_path` |  | Dot-path tới mảng record trong response, vd `data.items`. Bỏ trống = response chính là mảng |
| `field_mapping` | ✅ | Ánh xạ field nguồn → field alert (xem mục 4) |
| `tenancy_id` | ✅ | Tenancy của alert tạo ra |
| `default_customer_code` |  | customerCode mặc định khi record không có |
| `integrate_source_id` | ✅ | ID `IntegrateSource` để đóng dấu `source`/`sourceIntegrateId` lên alert |
| `cron_expression` |  | Lịch quét Quartz (vd `0 */5 * * * ?` = mỗi 5 phút). Bỏ trống = chỉ chạy thủ công qua `/run` |
| `enabled` |  | Bật/tắt nguồn (mặc định `false`) |

> `integrate_source_id` phải trỏ tới một bản ghi có sẵn trong `integrate_sources` (màn Quản lý nguồn
> tích hợp). Alert kéo về sẽ mang `source` = tên integrate source đó.

---

## 4. field_mapping (ánh xạ đa nguồn)

`field_mapping` là object: **khóa cố định** → **dot-path** trong 1 record nguồn. Bộ khóa khác nhau
theo `data_type`.

### 4.1 Khi `data_type = ALERT`

| Khóa | Map sang | Ghi chú |
|------|----------|---------|
| `externalId` | `AlertIngestRequest.id` | Khóa dedup + giá trị cursor |
| `severity` | `severity` | |
| `content` | `content` | |
| `customerCode` | `customerCode` | Không có → dùng `default_customer_code` |
| `events` | `events` | Trỏ tới một mảng trong record (tùy chọn) |

Toàn bộ record gốc luôn được lưu vào `rawData` của alert để truy vết (payload động, lưu nguyên).

### 4.2 Khi `data_type = CASE`

| Khóa | Map sang (CaseSiemRequest) | Ghi chú |
|------|----------------------------|---------|
| `externalId` | `code` | **Bắt buộc** — vừa là case code, vừa là khóa dedup + cursor |
| `name` | `name` | Bắt buộc (case không có name → bỏ qua record) |
| `customerCode` | `customerCode` | Bắt buộc; không có → `default_customer_code` |
| `departmentCode` | `departmentCode` | Không có → phòng ban gốc của tenancy |
| `catalogTypeCode` | `catalogTypeCode` | |
| `catalogDangerLevelCode` | `catalogDangerLevelCode` | Không khớp → mặc định `CB` |
| `catalogPriorityCode` | `catalogPriorityCode` | |
| `catalogResolutionCode` | `catalogResolutionCode` | |
| `slaCode` | `slaCode` | |
| `description` | `description` | |
| `alertId` | `alertId` | Liên kết case ↔ alert nguồn (tùy chọn) |
| `events` | `events` | Mảng (tùy chọn) |
| `tagsCode` | `tagsCode` | Mảng string (tùy chọn) |

- `tenancyCode` của case được hệ thống tự resolve từ `tenancy_id` của nguồn (không cần map).
- Case **không có cột `rawData`** → nguyên record (payload động) được lưu vào **`more_information`** dưới dạng JSON (song song với cách alert lưu `raw_data`). Không cần map.
- **Dedup case theo `code`** (`externalId`): record đã có case cùng `code` trong tenancy → bỏ qua.
- Case được tạo qua đúng luồng batch SIEM (`convertSiemRequestToRequest` + `createCase`), `createdBy` = tên nguồn.

**Ví dụ record nguồn:**
```json
{
  "id": 1050,
  "priority": "high",
  "message": "Brute force detected",
  "customer": { "code": "ACME" },
  "events": [ { "src_ip": "1.2.3.4" } ]
}
```
**field_mapping tương ứng:**
```json
{
  "externalId": "id",
  "severity": "priority",
  "content": "message",
  "customerCode": "customer.code",
  "events": "events"
}
```

---

## 5. Ví dụ tạo nguồn đầy đủ

```bash
curl -X POST http://localhost:8888/api/v1/integrate-pull-sources \
  -H "Content-Type: application/json" -H "Language: vi" \
  -d '{
    "name": "SIEM-ACME",
    "base_url": "https://siem.example.com",
    "endpoint_path": "/api/v1/alerts",
    "auth_header_name": "Authorization",
    "auth_token": "Bearer eyJhbGc...",
    "id_param": "from_id",
    "size_param": "limit",
    "page_size": 200,
    "initial_from_id": "0",
    "records_path": "data.items",
    "field_mapping": {
      "externalId": "id",
      "severity": "priority",
      "content": "message",
      "customerCode": "customer.code",
      "events": "events"
    },
    "tenancy_id": 1,
    "default_customer_code": "ACME",
    "integrate_source_id": 5,
    "cron_expression": "0 */5 * * * ?",
    "enabled": true
  }'
```

Sau khi tạo (hoặc khi cần test), gọi chạy ngay:
```bash
curl -X POST http://localhost:8888/api/v1/integrate-pull-sources/1/run -H "Language: vi"
```

Xem trạng thái cursor:
```bash
curl http://localhost:8888/api/v1/integrate-pull-sources/1 -H "Language: vi"
# response.data.last_external_id, last_sync_at
```

**Ví dụ nguồn CASE:**
```bash
curl -X POST http://localhost:8888/api/v1/integrate-pull-sources \
  -H "Content-Type: application/json" -H "Language: vi" \
  -d '{
    "name": "SIEM-CASE-ACME",
    "data_type": "CASE",
    "base_url": "https://siem.example.com",
    "endpoint_path": "/api/v1/cases",
    "auth_header_name": "Authorization",
    "auth_token": "Bearer eyJhbGc...",
    "id_param": "from_id",
    "size_param": "limit",
    "page_size": 100,
    "records_path": "data.items",
    "field_mapping": {
      "externalId": "id",
      "name": "title",
      "customerCode": "customer.code",
      "departmentCode": "department.code",
      "catalogTypeCode": "type_code",
      "catalogDangerLevelCode": "severity_code",
      "description": "description",
      "alertId": "alert_id"
    },
    "tenancy_id": 1,
    "default_customer_code": "ACME",
    "integrate_source_id": 5,
    "cron_expression": "0 */10 * * * ?",
    "enabled": true
  }'
```

---

## 6. Yêu cầu phía API hệ thống ngoài

Để cursor-by-ID hoạt động đúng, API nguồn nên:
1. Nhận tham số `id_param` và **chỉ trả về các record có ID > giá trị truyền vào**.
2. Trả về record **sắp xếp tăng dần theo ID**.
3. Hỗ trợ `size_param` để giới hạn số record mỗi lần.

Khi một trang trả về **ít hơn `page_size`** record, SOAR hiểu là đã hết và dừng vòng quét lần đó;
lần chạy kế tiếp (theo cron) sẽ tiếp tục từ ID cuối đã lưu.

---

## 7. Hành vi & giới hạn

- **Cập nhật cursor sau mỗi trang** → nếu lỗi giữa chừng, lần sau quét lại từ trang lỗi (at-least-once;
  an toàn nhờ dedup theo id).
- **Chặn vòng lặp vô hạn:** tối đa `1000` trang mỗi lần chạy; cũng dừng nếu cursor không tiến triển.
- **Lỗi 1 record** (vd customerCode không resolve được) → log và bỏ qua record đó, không làm hỏng cả lần quét.
- **Re-arm khi khởi động:** mọi nguồn `enabled=true` có `cron_expression` được lập lịch lại tự động khi app start.
- **Tắt nguồn:** `enabled=false` hoặc bỏ `cron_expression` → hủy lịch; vẫn có thể chạy thủ công qua `/run`.

---

## 8. Vị trí code

| Thành phần | File |
|-----------|------|
| Entity | `entity/IntegratePullSource.java`, `entity/IntegratePullCursor.java` |
| Repository | `repository/IntegratePullSourceRepository.java`, `repository/IntegratePullCursorRepository.java` |
| DTO | `dto/request/integrate_pull/IntegratePullSourceRequest.java`, `dto/response/integrate_pull/IntegratePullSourceResponse.java` |
| CRUD + lập lịch | `service/integrate/impl/IntegratePullSourceServiceImpl.java` |
| Engine quét | `service/integrate/impl/IntegratePullSyncServiceImpl.java` |
| Ánh xạ field | `service/integrate/PullFieldMapper.java` |
| Quartz Job | `service/job/IntegratePullJob.java` |
| Re-arm khởi động | `configuration/IntegratePullStartup.java` |
| Controller | `controller/IntegratePullSourceController.java` |
| Migration | `db/changelog/20260630-1000-integrate-pull.xml` |
| Tái dùng (lưu ES, alert) | `service/impl/AlertServiceImpl.createFromIntegration` |
| Tái dùng (lưu Postgres, case) | `CaseFacadeServiceImpl.convertSiemRequestToRequest` + `CamundaFacadeServiceImpl.createCase` |
