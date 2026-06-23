import { Search, Send, ChevronLeft } from 'lucide-react';
import type { Interface } from '../data/mockDevices';
import clsx from 'clsx';

interface InterfaceTableProps {
  deviceName: string;
  interfaces: Interface[];
  onBack: () => void;
}

export function InterfaceTable({ deviceName, interfaces, onBack }: InterfaceTableProps) {
  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-300">
      {/* Header / Breadcrumbs */}
      <div className="p-4 flex items-center justify-between border-b border-slate-800 bg-slate-900/50">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Interfaces for Device: <span className="text-blue-400">{deviceName}</span>
            </h2>
            <p className="text-sm text-slate-500">Manage and configure network interfaces for your security device</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Interface name" 
              className="bg-slate-800 border-slate-700 border rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none w-64 text-white"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <Send className="w-4 h-4" /> Apply
          </button>
        </div>
      </div>

      {/* Table Area */}
      <div className="flex-1 overflow-auto p-6">
        <div className="border border-slate-800 rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-800/50 text-slate-400 uppercase text-[10px] tracking-widest font-bold border-b border-slate-800">
                <th className="p-4">Name</th>
                <th className="p-4">State</th>
                <th className="p-4">Type</th>
                <th className="p-4">VLAN ID</th>
                <th className="p-4">Mode</th>
                <th className="p-4">MAC Address</th>
                <th className="p-4">IP Address</th>
                <th className="p-4">Security Zone</th>
                <th className="p-4">Updated On</th>
                <th className="p-4">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {interfaces.map((iface, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                      <span className="font-semibold text-white">{iface.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={clsx(
                      "flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold border w-fit",
                      iface.state === 'Up' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-rose-500/10 text-rose-500 border-rose-500/20"
                    )}>
                      <div className={clsx("w-1.5 h-1.5 rounded-full", iface.state === 'Up' ? "bg-emerald-500" : "bg-rose-500")} />
                      {iface.state}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400">{iface.type}</td>
                  <td className="p-4 text-slate-500">{iface.vlanId}</td>
                  <td className="p-4 text-slate-400">{iface.mode}</td>
                  <td className="p-4 font-mono text-[11px] text-slate-500">{iface.macAddress}</td>
                  <td className="p-4 text-slate-500">{iface.ipAddress}</td>
                  <td className="p-4">
                    <span className="text-slate-500 px-2 py-0.5 bg-slate-800 rounded border border-slate-700">
                      {iface.securityZone}
                    </span>
                  </td>
                  <td className="p-4 text-slate-500 text-[11px]">{iface.updatedOn}</td>
                  <td className="p-4 text-slate-400 text-xs italic line-clamp-1 max-w-[200px]" title={iface.description}>
                    {iface.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
