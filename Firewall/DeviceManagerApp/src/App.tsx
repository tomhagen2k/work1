import { useState } from 'react';
import { DeviceTable } from './components/DeviceTable';
import { DeviceSidePanel } from './components/DeviceSidePanel';
import { InterfaceTable } from './components/InterfaceTable';
import { mockDevices, type Device } from './data/mockDevices';
import { Shield, LayoutDashboard, Server, Settings, Search, Plus, Upload } from 'lucide-react';

function App() {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [drillDownDevice, setDrillDownDevice] = useState<Device | null>(null);

  return (
    <div className="flex h-screen bg-background font-sans text-slate-800">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-4 flex items-center gap-3 border-b border-slate-800">
          <Shield className="w-8 h-8 text-blue-500" />
          <span className="text-xl font-bold tracking-wide">Firewall OS</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors text-slate-300">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </a>
          <a 
            href="#" 
            className="flex items-center gap-3 p-3 rounded-lg bg-blue-600 text-white shadow-md"
            onClick={(e) => {
              e.preventDefault();
              setDrillDownDevice(null);
            }}
          >
            <Server className="w-5 h-5" /> Devices
          </a>
          <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors text-slate-300">
            <Settings className="w-5 h-5" /> Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {drillDownDevice ? (
          <InterfaceTable 
            deviceName={drillDownDevice.hostname} 
            interfaces={drillDownDevice.interfaces || []} 
            onBack={() => setDrillDownDevice(null)}
          />
        ) : (
          <>
            {/* Topbar */}
            <header className="h-16 bg-surface border-b border-slate-200 flex items-center justify-between px-6">
              <h1 className="text-2xl font-semibold text-slate-800">Device Management</h1>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search devices..." 
                    className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full focus:ring-2 focus:ring-blue-500 outline-none w-64"
                  />
                </div>
                <button className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium transition-colors">
                  <Upload className="w-4 h-4" /> Import
                </button>
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm">
                  <Plus className="w-4 h-4" /> Add Device
                </button>
              </div>
            </header>

            {/* Content Area */}
            <div className="flex-1 overflow-auto p-6 relative">
              <div className="bg-surface rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <DeviceTable 
                  devices={mockDevices} 
                  onRowClick={(device) => setSelectedDevice(device)} 
                  onHostnameClick={(device) => setDrillDownDevice(device)}
                />
              </div>
            </div>
          </>
        )}
      </main>

      {/* Side Panel */}
      <DeviceSidePanel 
        device={selectedDevice} 
        onClose={() => setSelectedDevice(null)} 
      />
    </div>
  );
}

export default App;
