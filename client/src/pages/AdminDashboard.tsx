import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LogOut, 
  Shield, 
  Users, 
  Mail, 
  BarChart3, 
  Settings, 
  Bell,
  Home,
  Eye,
  Download,
  RefreshCw,
  Calendar,
  Clock
} from "lucide-react";

const AdminDashboard = () => {
  const [adminInfo, setAdminInfo] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    // Get admin info from token
    const token = localStorage.getItem("adminToken");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token));
        setAdminInfo(decoded);
      } catch (error) {
        console.error("Invalid token");
        handleLogout();
      }
    }

    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const stats = [
    { icon: Users, label: "Total Visitors", value: "1,247", change: "+12%", color: "text-blue-600" },
    { icon: Mail, label: "Messages", value: "23", change: "+5%", color: "text-green-600" },
    { icon: Eye, label: "Page Views", value: "5,432", change: "+18%", color: "text-purple-600" },
    { icon: BarChart3, label: "Engagement", value: "89%", change: "+3%", color: "text-orange-600" }
  ];

  const recentActivities = [
    { action: "New contact form submission", time: "2 minutes ago", type: "message" },
    { action: "Portfolio page viewed", time: "5 minutes ago", type: "view" },
    { action: "Resume downloaded", time: "12 minutes ago", type: "download" },
    { action: "Skills section updated", time: "1 hour ago", type: "update" },
    { action: "New project added", time: "2 hours ago", type: "create" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      {/* Header */}
      <header className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Admin Dashboard</h1>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Welcome back, {adminInfo?.username || 'Admin'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Current Time */}
              <div className="hidden md:flex items-center space-x-2 bg-slate-100 dark:bg-slate-700 px-3 py-2 rounded-lg">
                <Clock className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  {currentTime.toLocaleTimeString()}
                </span>
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </Button>

              {/* Go to Home */}
              <Button 
                variant="outline" 
                onClick={handleGoHome}
                className="hidden md:flex items-center space-x-2"
              >
                <Home className="w-4 h-4" />
                <span>View Site</span>
              </Button>

              {/* Logout */}
              <Button 
                variant="destructive" 
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl p-8 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Welcome to Admin Panel</h2>
              <p className="text-blue-100 text-lg">
                Manage your portfolio and track visitor analytics
              </p>
            </div>
            <div className="hidden md:block">
              <div className="text-right">
                <div className="text-2xl font-bold">{currentTime.toLocaleDateString()}</div>
                <div className="text-blue-100">{currentTime.toLocaleDateString('en-US', { weekday: 'long' })}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-slate-100 dark:bg-slate-700 ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                    {stat.change}
                  </span>
                </div>
                <div className="text-3xl font-bold text-slate-800 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">Recent Activities</h3>
              <Button variant="ghost" size="icon">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-200">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-slate-800 dark:text-white font-medium">{activity.action}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="ghost">
                <Mail className="w-4 h-4 mr-3" />
                View Messages
              </Button>
              <Button className="w-full justify-start" variant="ghost">
                <Download className="w-4 h-4 mr-3" />
                Export Data
              </Button>
              <Button className="w-full justify-start" variant="ghost">
                <Settings className="w-4 h-4 mr-3" />
                Site Settings
              </Button>
              <Button className="w-full justify-start" variant="ghost">
                <BarChart3 className="w-4 h-4 mr-3" />
                Analytics
              </Button>
              <Button className="w-full justify-start" variant="ghost" onClick={handleGoHome}>
                <Eye className="w-4 h-4 mr-3" />
                Preview Site
              </Button>
            </div>
          </div>
        </div>

        {/* Admin Info */}
        <div className="mt-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Session Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Username</p>
              <p className="font-semibold text-slate-800 dark:text-white">{adminInfo?.username || 'admin'}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Login Time</p>
              <p className="font-semibold text-slate-800 dark:text-white">
                {adminInfo?.loginTime ? new Date(adminInfo.loginTime).toLocaleString() : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Role</p>
              <p className="font-semibold text-slate-800 dark:text-white">{adminInfo?.role || 'Administrator'}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;