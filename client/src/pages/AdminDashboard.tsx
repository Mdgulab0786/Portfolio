import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ContactService } from "../services/contactService";
import { ContactSubmission, ContactStats } from "../lib/supabase";
import { supabase } from "@/lib/supabase";
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
  Clock,
  MessageSquare,
  User,
  Building,
  Phone,
  Trash2,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  ExternalLink,
} from "lucide-react";

const AdminDashboard = () => {
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [stats, setStats] = useState<ContactStats | null>(null);
  const [selectedSubmission, setSelectedSubmission] =
    useState<ContactSubmission | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "new" | "read" | "replied"
  >("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure user is authenticated via Supabase
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        navigate("/admin");
      } else {
        setAdminEmail(data.user.email ?? null);
      }
    });

    // Load contact data
    loadContactData();

    // Subscribe to real-time changes
    const subscription = ContactService.subscribeToChanges((payload) => {
      console.log("Real-time update:", payload);
      loadContactData(); // Reload data when changes occur
    });

    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
      subscription.unsubscribe();
    };
  }, []);

  const loadContactData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [allSubmissions, contactStats] = await Promise.all([
        ContactService.getAllSubmissions(),
        ContactService.getStats(),
      ]);

      setSubmissions(allSubmissions);
      setStats(contactStats);
    } catch (err) {
      console.error("Error loading contact data:", err);
      setError("Failed to load contact data");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const handleStatusChange = async (
    id: string,
    status: ContactSubmission["status"]
  ) => {
    try {
      await ContactService.updateSubmissionStatus(id, status);
      await loadContactData();
      if (selectedSubmission && selectedSubmission.id === id) {
        setSelectedSubmission({ ...selectedSubmission, status });
      }
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status");
    }
  };

  const handleDeleteSubmission = async (id: string) => {
    if (confirm("Are you sure you want to delete this submission?")) {
      try {
        await ContactService.deleteSubmission(id);
        await loadContactData();
        if (selectedSubmission && selectedSubmission.id === id) {
          setSelectedSubmission(null);
        }
      } catch (err) {
        console.error("Error deleting submission:", err);
        alert("Failed to delete submission");
      }
    }
  };

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch =
      submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.subject.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || submission.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: ContactSubmission["status"]) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "read":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "replied":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status: ContactSubmission["status"]) => {
    switch (status) {
      case "new":
        return <AlertCircle className="w-4 h-4" />;
      case "read":
        return <Eye className="w-4 h-4" />;
      case "replied":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const statsCards = stats
    ? [
        {
          icon: MessageSquare,
          label: "Total Messages",
          value: stats.total.toString(),
          change: `+${stats.todayCount} today`,
          color: "text-blue-600",
        },
        {
          icon: AlertCircle,
          label: "New Messages",
          value: stats.new.toString(),
          change: "Unread",
          color: "text-orange-600",
        },
        {
          icon: Eye,
          label: "Read Messages",
          value: stats.read.toString(),
          change: "Processed",
          color: "text-yellow-600",
        },
        {
          icon: CheckCircle,
          label: "Replied",
          value: stats.replied.toString(),
          change: "Completed",
          color: "text-green-600",
        },
      ]
    : [];

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
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Welcome back, {adminEmail || "Admin"}
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
              <button className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors duration-200">
                <Bell className="w-5 h-5" />
                {stats && stats.new > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {stats.new}
                  </div>
                )}
              </button>

              {/* Go to Home */}
              <button
                onClick={handleGoHome}
                className="hidden md:flex items-center space-x-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200"
              >
                <Home className="w-4 h-4" />
                <span>View Site</span>
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
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
              <h2 className="text-3xl font-bold mb-2">Contact Management</h2>
              <p className="text-blue-100 text-lg">
                Manage contact form submissions and track communications
              </p>
            </div>
            <div className="hidden md:block">
              <div className="text-right">
                <div className="text-2xl font-bold">
                  {currentTime.toLocaleDateString()}
                </div>
                <div className="text-blue-100">
                  {currentTime.toLocaleDateString("en-US", { weekday: "long" })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              Loading...
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg p-4 mb-8">
            <p className="text-red-700 dark:text-red-400">{error}</p>
            <button
              onClick={loadContactData}
              className="mt-2 text-red-600 dark:text-red-400 hover:underline"
            >
              Try again
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl bg-slate-100 dark:bg-slate-700 ${stat.color}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
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

        {/* Contact Submissions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Submissions List */}
          <div className="lg:col-span-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200/50 dark:border-slate-700/50">
            <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                  Contact Submissions
                </h3>
                <button
                  onClick={loadContactData}
                  className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors duration-200"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by name, email, or subject..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                </select>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {filteredSubmissions.length === 0 ? (
                <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No contact submissions found</p>
                </div>
              ) : (
                <div className="space-y-2 p-4">
                  {filteredSubmissions.map((submission) => (
                    <div
                      key={submission.id}
                      onClick={() => setSelectedSubmission(submission)}
                      className={`p-4 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
                        selectedSubmission?.id === submission.id
                          ? "bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-200 dark:border-blue-700"
                          : "bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-slate-800 dark:text-white">
                              {submission.name}
                            </h4>
                            <span
                              className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                submission.status
                              )}`}
                            >
                              {getStatusIcon(submission.status)}
                              <span className="capitalize">
                                {submission.status}
                              </span>
                            </span>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">
                            {submission.email}
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                            {submission.subject}
                          </p>
                          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                            {new Date(submission.created_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submission Details */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200/50 dark:border-slate-700/50">
            {selectedSubmission ? (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                    Message Details
                  </h3>
                  <button
                    onClick={() =>
                      handleDeleteSubmission(selectedSubmission.id)
                    }
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Status Actions */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Status
                    </label>
                    <select
                      value={selectedSubmission.status}
                      onChange={(e) =>
                        handleStatusChange(
                          selectedSubmission.id,
                          e.target.value as any
                        )
                      }
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="new">New</option>
                      <option value="read">Read</option>
                      <option value="replied">Replied</option>
                    </select>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-slate-500" />
                      <div>
                        <p className="font-medium text-slate-800 dark:text-white">
                          {selectedSubmission.name}
                        </p>
                        <p className="text-sm text-slate-500">Name</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-slate-500" />
                      <div>
                        <a
                          href={`mailto:${selectedSubmission.email}`}
                          className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {selectedSubmission.email}
                        </a>
                        <p className="text-sm text-slate-500">Email</p>
                      </div>
                    </div>

                    {selectedSubmission.phone && (
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-slate-500" />
                        <div>
                          <a
                            href={`tel:${selectedSubmission.phone}`}
                            className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            {selectedSubmission.phone}
                          </a>
                          <p className="text-sm text-slate-500">Phone</p>
                        </div>
                      </div>
                    )}

                    {selectedSubmission.company && (
                      <div className="flex items-center space-x-3">
                        <Building className="w-5 h-5 text-slate-500" />
                        <div>
                          <p className="font-medium text-slate-800 dark:text-white">
                            {selectedSubmission.company}
                          </p>
                          <p className="text-sm text-slate-500">Company</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Project Details */}
                  {(selectedSubmission.project_type ||
                    selectedSubmission.budget ||
                    selectedSubmission.timeline) && (
                    <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                      <h4 className="font-semibold text-slate-800 dark:text-white mb-3">
                        Project Details
                      </h4>
                      <div className="space-y-2">
                        {selectedSubmission.project_type && (
                          <p className="text-sm">
                            <span className="font-medium">Type:</span>{" "}
                            {selectedSubmission.project_type}
                          </p>
                        )}
                        {selectedSubmission.budget && (
                          <p className="text-sm">
                            <span className="font-medium">Budget:</span>{" "}
                            {selectedSubmission.budget}
                          </p>
                        )}
                        {selectedSubmission.timeline && (
                          <p className="text-sm">
                            <span className="font-medium">Timeline:</span>{" "}
                            {selectedSubmission.timeline}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Subject */}
                  <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                    <h4 className="font-semibold text-slate-800 dark:text-white mb-2">
                      Subject
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300">
                      {selectedSubmission.subject}
                    </p>
                  </div>

                  {/* Message */}
                  <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                    <h4 className="font-semibold text-slate-800 dark:text-white mb-2">
                      Message
                    </h4>
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                      <p className="text-slate-600 dark:text-slate-300 whitespace-pre-wrap">
                        {selectedSubmission.message}
                      </p>
                    </div>
                  </div>

                  {/* Timestamp */}
                  <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                    <div className="flex items-center space-x-2 text-sm text-slate-500">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Submitted on{" "}
                        {new Date(
                          selectedSubmission.created_at
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="border-t border-slate-200 dark:border-slate-700 pt-4 space-y-3">
                    <button
                      onClick={() =>
                        window.open(
                          `mailto:${selectedSubmission.email}?subject=Re: ${selectedSubmission.subject}`,
                          "_blank"
                        )
                      }
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Reply via Email</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>

                    {selectedSubmission.phone && (
                      <button
                        onClick={() =>
                          window.open(
                            `tel:${selectedSubmission.phone}`,
                            "_blank"
                          )
                        }
                        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Call Now</span>
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select a submission to view details</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
