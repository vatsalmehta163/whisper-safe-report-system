
import React from 'react';
import { 
  BarChart3, 
  FileText, 
  Shield, 
  Settings, 
  LogOut, 
  Home,
  AlertTriangle,
  Brain,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onLogout?: () => void;
  isAdmin?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange, onLogout, isAdmin = false }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'ai-insights', label: 'AI Insights', icon: Brain },
    ...(isAdmin ? [
      { id: 'users', label: 'Users', icon: Users },
      { id: 'security', label: 'Security', icon: Shield },
      { id: 'settings', label: 'Settings', icon: Settings }
    ] : [])
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gray-900 rounded-xl shadow-lg">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">WhistlePro</h1>
            <p className="text-xs text-gray-500">Secure Reporting</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeSection === item.id
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Section */}
      {onLogout && (
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="ghost"
            onClick={onLogout}
            className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Log out
          </Button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
