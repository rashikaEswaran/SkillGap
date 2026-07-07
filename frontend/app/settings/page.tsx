"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User as FirebaseUser, updatePassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Lock,
  Bell,
  Globe,
  Shield,
  Save,
  Trash2,
  Camera,
  Sparkles,
  Zap,
  Brain,
} from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [profile, setProfile] = useState({
    displayName: "",
    email: "",
    phone: "",
    role: "student",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    skillUpdates: true,
    newsUpdates: false,
    weeklyReport: true,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);
      setProfile({
        displayName: user.displayName || "",
        email: user.email || "",
        phone: "",
        role: "student",
      });
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      if (user) {
        await updateProfile(user, { displayName: profile.displayName });
        setSuccess("Profile updated successfully!");
      }
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    if (passwords.new !== passwords.confirm) {
      setError("New passwords do not match");
      setSaving(false);
      return;
    }

    if (passwords.new.length < 6) {
      setError("Password must be at least 6 characters");
      setSaving(false);
      return;
    }

    try {
      if (user) {
        await updatePassword(user, passwords.new);
        setSuccess("Password changed successfully!");
        setPasswords({ current: "", new: "", confirm: "" });
      }
    } catch (err: any) {
      setError(err.message || "Failed to change password");
    } finally {
      setSaving(false);
    }
  };

  const handleNotificationToggle = (key: string) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-[#6366F1]/30 border-t-[#6366F1] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/40 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#0A0A0F]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <ArrowLeft className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
              </Link>
              <div className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-red-500" />
                <h1 className="text-2xl font-bold">
                  Curriculum<span className="text-red-500">IQ</span>
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Sparkles className="h-4 w-4 text-red-500" />
              <span>Settings</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {success && (
          <div className="mb-6 p-4 bg-green-900/30 border border-green-500/50 text-green-300 rounded-xl backdrop-blur-sm">
            {success}
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 text-red-300 rounded-xl backdrop-blur-sm">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#0a0a0a]/60 backdrop-blur-2xl rounded-2xl border border-white/10 p-6 mb-6 shadow-lg shadow-red-500/5">
              <div className="text-center mb-6">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 rounded-full blur-lg opacity-50 animate-pulse" />
                  <div className="relative w-24 h-24 bg-gradient-to-r from-red-600 to-pink-600 rounded-full flex items-center justify-center border border-white/20">
                    <User className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-xl mb-1">{user?.displayName || "User"}</h3>
                <p className="text-gray-400 text-sm">{user?.email}</p>
                <span className="inline-block mt-3 px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded-full text-xs font-semibold capitalize backdrop-blur-sm">
                  {profile.role}
                </span>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-white/10">
                <div className="text-center p-3 bg-white/5 rounded-xl">
                  <Zap className="h-5 w-5 text-yellow-500 mx-auto mb-1" />
                  <p className="text-lg font-bold">12</p>
                  <p className="text-xs text-gray-500">Skills</p>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-xl">
                  <Brain className="h-5 w-5 text-red-500 mx-auto mb-1" />
                  <p className="text-lg font-bold">156</p>
                  <p className="text-xs text-gray-500">Tracked</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Settings */}
            <div className="bg-[#0a0a0a]/60 backdrop-blur-2xl rounded-2xl border border-white/10 p-6 shadow-lg shadow-red-500/5">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <User className="h-5 w-5 text-red-500" />
                </div>
                <h2 className="text-xl font-bold">Profile Settings</h2>
              </div>

              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profile.displayName}
                    onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0f0f0f]/80 border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-red-500/50 focus:shadow-[0_0_20px_rgba(255,0,51,0.2)] transition-all backdrop-blur-sm"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    disabled
                    className="w-full px-4 py-3 bg-[#0f0f0f]/50 border border-white/10 rounded-xl text-gray-500 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Role
                  </label>
                  <select
                    value={profile.role}
                    onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0f0f0f]/80 border border-white/10 rounded-xl text-white focus:outline-none focus:border-red-500/50 transition-all backdrop-blur-sm"
                  >
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  <span>{saving ? "Saving..." : "Save Changes"}</span>
                </button>
              </form>
            </div>

            {/* Password Settings */}
            <div className="bg-[#0a0a0a]/60 backdrop-blur-2xl rounded-2xl border border-white/10 p-6 shadow-lg shadow-red-500/5">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <Lock className="h-5 w-5 text-red-500" />
                </div>
                <h2 className="text-xl font-bold">Change Password</h2>
              </div>

              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={passwords.current}
                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0f0f0f]/80 border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-red-500/50 focus:shadow-[0_0_20px_rgba(255,0,51,0.2)] transition-all backdrop-blur-sm"
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwords.new}
                    onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0f0f0f]/80 border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-red-500/50 focus:shadow-[0_0_20px_rgba(255,0,51,0.2)] transition-all backdrop-blur-sm"
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0f0f0f]/80 border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-red-500/50 focus:shadow-[0_0_20px_rgba(255,0,51,0.2)] transition-all backdrop-blur-sm"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all disabled:opacity-50"
                >
                  <Lock className="h-4 w-4" />
                  <span>{saving ? "Changing..." : "Change Password"}</span>
                </button>
              </form>
            </div>

            {/* Notification Settings */}
            <div className="bg-[#0a0a0a]/60 backdrop-blur-2xl rounded-2xl border border-white/10 p-6 shadow-lg shadow-red-500/5">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <Bell className="h-5 w-5 text-red-500" />
                </div>
                <h2 className="text-xl font-bold">Notifications</h2>
              </div>

              <div className="space-y-3">
                {[
                  { key: "emailAlerts", label: "Email Alerts", desc: "Receive alerts via email" },
                  { key: "skillUpdates", label: "Skill Updates", desc: "Get notified about new industry skills" },
                  { key: "newsUpdates", label: "News Updates", desc: "Daily industry news digest" },
                  { key: "weeklyReport", label: "Weekly Report", desc: "Weekly curriculum analysis report" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-[#0f0f0f]/50 rounded-xl border border-white/5 hover:border-red-500/20 transition-all">
                    <div>
                      <h4 className="font-semibold">{item.label}</h4>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle(item.key)}
                      className={`relative w-14 h-8 rounded-full transition-all ${
                        notifications[item.key as keyof typeof notifications]
                          ? "bg-gradient-to-r from-red-600 to-pink-600"
                          : "bg-gray-700"
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform shadow-lg ${
                          notifications[item.key as keyof typeof notifications]
                            ? "translate-x-6"
                            : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-[#0a0a0a]/60 backdrop-blur-2xl rounded-2xl border-2 border-red-500/30 p-6 shadow-lg shadow-red-500/10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <Trash2 className="h-5 w-5 text-red-500" />
                </div>
                <h2 className="text-xl font-bold text-red-500">Danger Zone</h2>
              </div>
              <p className="text-gray-400 mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}