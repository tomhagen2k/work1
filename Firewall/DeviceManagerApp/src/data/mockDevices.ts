export interface Interface {
  name: string;
  state: 'Up' | 'Down';
  type: string;
  vlanId: string;
  mode: string;
  macAddress: string;
  ipAddress: string;
  securityZone: string;
  updatedOn: string;
  description: string;
}

export interface Device {
  id: string;
  hostname: string;
  ipAddress: string;
  status: 'Active' | 'Inactive' | 'Warning';
  version: string;
  profile: string;
  lastBackup: string;
  interfaces?: Interface[];
}

export const mockInterfaces: Interface[] = [
  {
    name: 'eth0',
    state: 'Up',
    type: 'ethernet',
    vlanId: '-',
    mode: 'outline',
    macAddress: '00:1B:21:63:4A:40',
    ipAddress: '-',
    securityZone: 'none',
    updatedOn: '2026-04-17T15:52:24Z',
    description: 'Intel I350 - Port 1 - SPAN office'
  },
  {
    name: 'eth1',
    state: 'Up',
    type: 'ethernet',
    vlanId: '-',
    mode: 'outline',
    macAddress: '1C:4B:EE:2C:EE:2B',
    ipAddress: '-',
    securityZone: 'none',
    updatedOn: '2026-04-17T15:51:55Z',
    description: 'Intel I350 - Port 2 - WAN'
  }
];

export const mockDevices: Device[] = [
  { id: '1', hostname: 'demo-95', ipAddress: '192.168.10.1', status: 'Active', version: 'v2.4.1', profile: 'HQ-Profile', lastBackup: '2026-05-10 14:00', interfaces: mockInterfaces },
  { id: '2', hostname: 'FW-HN-02', ipAddress: '192.168.10.2', status: 'Active', version: 'v2.4.1', profile: 'HQ-Profile', lastBackup: '2026-05-11 02:00', interfaces: mockInterfaces },
  { id: '3', hostname: 'FW-HCM-01', ipAddress: '192.168.20.1', status: 'Warning', version: 'v2.3.9', profile: 'Branch-Profile', lastBackup: '2026-05-12 08:30', interfaces: mockInterfaces },
  { id: '4', hostname: 'FW-HCM-02', ipAddress: '192.168.20.2', status: 'Inactive', version: 'v2.3.9', profile: 'Branch-Profile', lastBackup: '2026-05-01 10:00', interfaces: mockInterfaces },
  { id: '5', hostname: 'FW-DN-01', ipAddress: '192.168.30.1', status: 'Active', version: 'v2.4.1', profile: 'Branch-Profile', lastBackup: '2026-05-12 01:00', interfaces: mockInterfaces },
];
