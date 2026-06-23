import React, { useState } from 'react';
import type { Device } from '../data/mockDevices';
import { MoreVertical, Shield, HardDrive, Database, Filter } from 'lucide-react';
import clsx from 'clsx';

interface DeviceTableProps {
  devices: Device[];
  onRowClick: (device: Device) => void;
  onHostnameClick: (device: Device) => void;
}

export function DeviceTable({ devices, onRowClick, onHostnameClick }: DeviceTableProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(new Set(devices.map(d => d.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectRow = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    e.stopPropagation();
    const newSet = new Set(selectedIds);
    if (e.target.checked) {
      newSet.add(id);
    } else {
      newSet.delete(id);
    }
    setSelectedIds(newSet);
  };

  return (
    <div className="w-full flex flex-col">
      {/* Table Toolbar */}
      <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
        <div className="flex items-center gap-3">
          {selectedIds.size > 0 ? (
            <div className="flex items-center gap-3 animate-in fade-in slide-in-from-left-4">
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {selectedIds.size} selected
              </span>
              <button className="text-sm font-medium text-slate-700 bg-white border border-slate-300 px-3 py-1.5 rounded-lg hover:bg-slate-50 flex items-center gap-2">
                <Database className="w-4 h-4" /> Bulk Backup
              </button>
              <button className="text-sm font-medium text-slate-700 bg-white border border-slate-300 px-3 py-1.5 rounded-lg hover:bg-slate-50 flex items-center gap-2">
                <Shield className="w-4 h-4" /> Assign Profile
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <Filter className="w-4 h-4" /> Filter by: <span className="font-medium cursor-pointer text-slate-700">All Status</span>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm uppercase tracking-wider">
            <th className="p-4 w-12 text-center">
              <input 
                type="checkbox" 
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                checked={selectedIds.size === devices.length && devices.length > 0}
                onChange={handleSelectAll}
              />
            </th>
            <th className="p-4 font-medium">Hostname</th>
            <th className="p-4 font-medium">IP Address</th>
            <th className="p-4 font-medium">Status</th>
            <th className="p-4 font-medium">Version</th>
            <th className="p-4 font-medium">Profile</th>
            <th className="p-4 font-medium">Last Backup</th>
            <th className="p-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {devices.map((device) => (
            <tr 
              key={device.id} 
              className={clsx(
                "hover:bg-slate-50 transition-colors cursor-pointer group",
                selectedIds.has(device.id) && "bg-blue-50/50 hover:bg-blue-50/80"
              )}
              onClick={() => onRowClick(device)}
            >
              <td className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
                <input 
                  type="checkbox" 
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                  checked={selectedIds.has(device.id)}
                  onChange={(e) => handleSelectRow(e, device.id)}
                />
              </td>
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                    <HardDrive className="w-5 h-5" />
                  </div>
                  <span 
                    className="font-semibold text-slate-800 hover:text-blue-600 hover:underline decoration-blue-300 underline-offset-4 decoration-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      onHostnameClick(device);
                    }}
                  >
                    {device.hostname}
                  </span>
                </div>
              </td>
              <td className="p-4 text-slate-600 font-mono text-sm">{device.ipAddress}</td>
              <td className="p-4">
                <span className={clsx(
                  "px-2.5 py-1 rounded-full text-xs font-medium border",
                  device.status === 'Active' && "bg-emerald-50 text-emerald-700 border-emerald-200",
                  device.status === 'Inactive' && "bg-slate-100 text-slate-600 border-slate-200",
                  device.status === 'Warning' && "bg-amber-50 text-amber-700 border-amber-200"
                )}>
                  {device.status}
                </span>
              </td>
              <td className="p-4 text-slate-600">{device.version}</td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium text-slate-700">{device.profile}</span>
                </div>
              </td>
              <td className="p-4 text-slate-500 text-sm flex items-center gap-2">
                 {device.lastBackup}
              </td>
              <td className="p-4 text-right">
                <button 
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
