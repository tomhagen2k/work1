import { useState } from 'react';
import type { Device } from '../data/mockDevices';
import { X, MemoryStick as Memory, HardDrive, Activity, Shield, Edit3 } from 'lucide-react';
import clsx from 'clsx';

interface DeviceSidePanelProps {
  device: Device | null;
  onClose: () => void;
}

export function DeviceSidePanel({ device, onClose }: DeviceSidePanelProps) {
  const [activeTab, setActiveTab] = useState<'general' | 'monitor' | 'assets'>('general');

  if (!device) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Side Panel */}
      <div className="fixed top-0 right-0 h-full w-[500px] bg-surface shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out border-l border-slate-200">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-start justify-between bg-slate-50/50">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold text-slate-800">{device.hostname}</h2>
              <span className={clsx(
                  "px-2.5 py-0.5 rounded-full text-xs font-medium border",
                  device.status === 'Active' && "bg-emerald-50 text-emerald-700 border-emerald-200",
                  device.status === 'Inactive' && "bg-slate-100 text-slate-600 border-slate-200",
                  device.status === 'Warning' && "bg-amber-50 text-amber-700 border-amber-200"
                )}>
                  {device.status}
              </span>
            </div>
            <p className="text-slate-500 text-sm font-mono">{device.ipAddress}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-6 border-b border-slate-200 flex gap-6">
          {(['general', 'monitor', 'assets'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                "pb-4 pt-4 text-sm font-medium capitalize border-b-2 transition-colors",
                activeTab === tab 
                  ? "border-blue-600 text-blue-600" 
                  : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/30">
          
          {activeTab === 'general' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-slate-800">System Information</h3>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                    <Edit3 className="w-4 h-4" /> Edit
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Version</p>
                    <p className="font-medium text-slate-700">{device.version}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Serial Number</p>
                    <p className="font-medium text-slate-700 font-mono">FW-8472-A9X</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Last Backup</p>
                    <p className="font-medium text-slate-700">{device.lastBackup}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Uptime</p>
                    <p className="font-medium text-slate-700">14 days, 5 hrs</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-slate-800">Assigned Profile</h3>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                    Change
                  </button>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="bg-blue-100 p-2 rounded-md">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{device.profile}</p>
                    <p className="text-xs text-slate-500">Contains 45 security policies</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'monitor' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
                  <Activity className="w-8 h-8 text-emerald-500 mb-2" />
                  <p className="text-3xl font-bold text-slate-800">12%</p>
                  <p className="text-sm text-slate-500 font-medium mt-1">CPU Usage</p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
                  <Memory className="w-8 h-8 text-blue-500 mb-2" />
                  <p className="text-3xl font-bold text-slate-800">45%</p>
                  <p className="text-sm text-slate-500 font-medium mt-1">RAM Usage</p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center col-span-2">
                  <HardDrive className="w-8 h-8 text-purple-500 mb-2" />
                  <div className="w-full mt-2">
                    <div className="flex justify-between text-sm font-medium text-slate-700 mb-1">
                      <span>Disk Space</span>
                      <span>64 GB / 256 GB</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5">
                      <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'assets' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
               <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center py-12">
                 <p className="text-slate-500 font-medium">No assets registered to this device yet.</p>
                 <button className="mt-4 text-sm font-medium bg-slate-100 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-200">
                   Discover Assets
                 </button>
               </div>
            </div>
          )}

        </div>
        
        {/* Footer actions */}
        <div className="p-6 border-t border-slate-200 bg-white flex gap-3">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors">
            Quick Backup
          </button>
          <button className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2.5 rounded-lg transition-colors">
            Reboot Device
          </button>
        </div>

      </div>
    </>
  );
}
