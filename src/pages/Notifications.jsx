import { useState } from "react";

const initialNotifications = [
  { id: "N001", title: "Booking Confirmed", message: "Your table T-04 at Main Hall has been confirmed for 25 Mar at 7:00 PM.", user: "Chand Kumar", avatar: "CK", type: "Booking", channel: "Email", status: "Sent", date: "25 Mar 2026, 10:30 AM" },
  { id: "N002", title: "Reservation Reminder", message: "Reminder: Your reservation at Rooftop is tomorrow at 7:30 PM. Don't be late!", user: "Sneha Roy", avatar: "SR", type: "Reminder", channel: "SMS", status: "Sent", date: "29 Mar 2026, 09:00 AM" },
  { id: "N003", title: "Booking Cancelled", message: "Your booking BK004 has been cancelled. A refund will be processed within 3-5 business days.", user: "Rahul Das", avatar: "RD", type: "Cancellation", channel: "Email", status: "Sent", date: "29 Mar 2026, 02:15 PM" },
  { id: "N004", title: "Payment Successful", message: "Payment of ₹2,000 received for booking BK005. Thank you!", user: "Sneha Roy", avatar: "SR", type: "Payment", channel: "Push", status: "Sent", date: "30 Mar 2026, 11:45 AM" },
  { id: "N005", title: "Table Ready Alert", message: "Your table T-07 at Rooftop is ready. Please proceed to your seat.", user: "Priya Singh", avatar: "PS", type: "Alert", channel: "SMS", status: "Pending", date: "01 Apr 2026, 06:25 PM" },
  { id: "N006", title: "Reservation Reminder", message: "Your reservation at Garden Area is in 2 hours. We look forward to seeing you!", user: "Amit Patel", avatar: "AP", type: "Reminder", channel: "Push", status: "Pending", date: "01 Apr 2026, 06:30 PM" },
  { id: "N007", title: "Booking Confirmed", message: "Your table T-06 at Main Hall is confirmed for 02 Apr at 7:00 PM. Enjoy!", user: "Neha Ghosh", avatar: "NG", type: "Booking", channel: "Email", status: "Sent", date: "02 Apr 2026, 09:10 AM" },
  { id: "N008", title: "Refund Processed", message: "Your refund of ₹500 for booking BK010 has been processed successfully.", user: "Arjun Nair", avatar: "AN", type: "Payment", channel: "Email", status: "Failed", date: "05 Apr 2026, 03:00 PM" },
  { id: "N009", title: "Special Offer", message: "Get 20% off your next reservation this weekend! Use code AKANTE20.", user: "All Users", avatar: "AU", type: "Promotion", channel: "Push", status: "Sent", date: "06 Apr 2026, 10:00 AM" },
  { id: "N010", title: "Booking Confirmed", message: "Your table T-08 at Garden Area is confirmed for 04 Apr at 8:00 PM.", user: "Meera Joshi", avatar: "MJ", type: "Booking", channel: "SMS", status: "Sent", date: "04 Apr 2026, 08:55 AM" },
];

const typeConfig = {
  Booking:      { color: "bg-green-500/20 text-green-400",  icon: "✓", dot: "bg-green-400" },
  Reminder:     { color: "bg-yellow-500/20 text-yellow-400", icon: "⏰", dot: "bg-yellow-400" },
  Cancellation: { color: "bg-red-500/20 text-red-400",      icon: "✕", dot: "bg-red-400" },
  Payment:      { color: "bg-blue-500/20 text-blue-400",    icon: "₹", dot: "bg-blue-400" },
  Alert:        { color: "bg-orange-500/20 text-orange-400", icon: "!", dot: "bg-orange-400" },
  Promotion:    { color: "bg-purple-500/20 text-purple-400", icon: "★", dot: "bg-purple-400" },
};

const channelConfig = {
  Email: { color: "bg-cyan-500/20 text-cyan-300",   icon: "✉" },
  SMS:   { color: "bg-green-500/20 text-green-300",  icon: "💬" },
  Push:  { color: "bg-indigo-500/20 text-indigo-300", icon: "🔔" },
};

const statusStyles = {
  Sent:    "bg-green-500/20 text-green-400",
  Pending: "bg-yellow-500/20 text-yellow-400",
  Failed:  "bg-red-500/20 text-red-400",
};

const avatarColors = [
  "bg-purple-600","bg-blue-600","bg-green-600","bg-yellow-600",
  "bg-red-600","bg-pink-600","bg-indigo-600","bg-teal-600","bg-orange-600","bg-cyan-600"
];

const emptyForm = { title: "", message: "", user: "", type: "Booking", channel: "Email" };

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [search, setSearch]               = useState("");
  const [filterType, setFilterType]       = useState("All");
  const [filterStatus, setFilterStatus]   = useState("All");
  const [filterChannel, setFilterChannel] = useState("All");
  const [showCompose, setShowCompose]     = useState(false);
  const [showDetail, setShowDetail]       = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [form, setForm]                   = useState(emptyForm);
  const [activeTab, setActiveTab]         = useState("All");

  const tabs = ["All", "Sent", "Pending", "Failed"];

  const filtered = notifications.filter((n) => {
    const matchSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.user.toLowerCase().includes(search.toLowerCase()) ||
      n.message.toLowerCase().includes(search.toLowerCase());
    const matchType    = filterType    === "All" || n.type    === filterType;
    const matchStatus  = filterStatus  === "All" || n.status  === filterStatus;
    const matchChannel = filterChannel === "All" || n.channel === filterChannel;
    const matchTab     = activeTab     === "All" || n.status  === activeTab;
    return matchSearch && matchType && matchStatus && matchChannel && matchTab;
  });

  const counts = {
    All:     notifications.length,
    Sent:    notifications.filter((n) => n.status === "Sent").length,
    Pending: notifications.filter((n) => n.status === "Pending").length,
    Failed:  notifications.filter((n) => n.status === "Failed").length,
  };

  const handleSend = () => {
    if (!form.title.trim() || !form.message.trim() || !form.user.trim()) return;
    const initials = form.user === "All Users" ? "AU" : form.user.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
    const now = new Date().toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
    setNotifications((prev) => [
      { id: "N" + String(prev.length + 1).padStart(3, "0"), ...form, avatar: initials, status: "Sent", date: now },
      ...prev,
    ]);
    setShowCompose(false);
    setForm(emptyForm);
  };

  const handleRetry = (id) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, status: "Sent" } : n));
  };

  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setShowDeleteConfirm(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Notifications</h1>
          <p className="text-gray-400 text-sm mt-1">Send and manage alerts to your users</p>
        </div>
        <button
          onClick={() => setShowCompose(true)}
          className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg transition-all text-sm"
        >
          <span className="text-lg leading-none">+</span> Compose
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-500 rounded-xl p-4">
          <p className="text-white/80 text-sm">Total Sent</p>
          <p className="text-white text-2xl font-bold mt-1">{counts.Sent}</p>
          <p className="text-white/60 text-xs mt-1">Successfully delivered</p>
        </div>
        <div className="bg-yellow-500 rounded-xl p-4">
          <p className="text-white/80 text-sm">Pending</p>
          <p className="text-white text-2xl font-bold mt-1">{counts.Pending}</p>
          <p className="text-white/60 text-xs mt-1">Queued to send</p>
        </div>
        <div className="bg-red-500 rounded-xl p-4">
          <p className="text-white/80 text-sm">Failed</p>
          <p className="text-white text-2xl font-bold mt-1">{counts.Failed}</p>
          <p className="text-white/60 text-xs mt-1">Need attention</p>
        </div>
        <div className="bg-purple-600 rounded-xl p-4">
          <p className="text-white/80 text-sm">Total Alerts</p>
          <p className="text-white text-2xl font-bold mt-1">{notifications.length}</p>
          <p className="text-white/60 text-xs mt-1">All notifications</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-800 p-1 rounded-xl mb-4 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === tab
                ? "bg-yellow-500 text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tab}
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
              activeTab === tab ? "bg-black/20 text-black" : "bg-gray-700 text-gray-300"
            }`}>
              {counts[tab]}
            </span>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-xl p-4 mb-4 flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Search notifications..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 text-sm flex-1 min-w-[200px] outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-600"
        />
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}
          className="bg-gray-700 text-white rounded-lg px-4 py-2 text-sm outline-none border border-gray-600 focus:ring-2 focus:ring-yellow-500">
          <option value="All">All Types</option>
          {Object.keys(typeConfig).map((t) => <option key={t}>{t}</option>)}
        </select>
        <select value={filterChannel} onChange={(e) => setFilterChannel(e.target.value)}
          className="bg-gray-700 text-white rounded-lg px-4 py-2 text-sm outline-none border border-gray-600 focus:ring-2 focus:ring-yellow-500">
          <option value="All">All Channels</option>
          <option>Email</option><option>SMS</option><option>Push</option>
        </select>
        <span className="text-gray-400 text-sm ml-auto">{filtered.length} notification{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      {/* Notification Cards */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-gray-800 rounded-xl py-14 text-center text-gray-500">No notifications found</div>
        ) : (
          filtered.map((n, i) => {
            const tc = typeConfig[n.type] || typeConfig.Alert;
            const cc = channelConfig[n.channel] || channelConfig.Email;
            return (
              <div
                key={n.id}
                className="bg-gray-800 rounded-xl px-5 py-4 flex items-start gap-4 hover:bg-gray-750 border border-gray-700/50 hover:border-gray-600 transition-all group"
              >
                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-base flex-shrink-0 ${tc.color}`}>
                  {tc.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-white font-semibold text-sm">{n.title}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${tc.color}`}>{n.type}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${cc.color}`}>{cc.icon} {n.channel}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyles[n.status]}`}>{n.status}</span>
                  </div>
                  <p className="text-gray-400 text-sm truncate max-w-lg">{n.message}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold`}>
                        {n.avatar}
                      </div>
                      <span className="text-gray-400 text-xs">{n.user}</span>
                    </div>
                    <span className="text-gray-600 text-xs">•</span>
                    <span className="text-gray-500 text-xs">{n.date}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => setShowDetail(n)}
                    className="px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 rounded-lg text-xs font-medium transition-all"
                  >
                    View
                  </button>
                  {n.status === "Failed" && (
                    <button
                      onClick={() => handleRetry(n.id)}
                      className="px-3 py-1.5 bg-green-600/20 hover:bg-green-600/40 text-green-400 rounded-lg text-xs font-medium transition-all"
                    >
                      Retry
                    </button>
                  )}
                  <button
                    onClick={() => setShowDeleteConfirm(n.id)}
                    className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg text-xs font-medium transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Detail Modal */}
      {showDetail && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700 shadow-2xl">
            <div className="flex items-start gap-4 mb-5">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${typeConfig[showDetail.type]?.color}`}>
                {typeConfig[showDetail.type]?.icon}
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-white">{showDetail.title}</h2>
                <div className="flex flex-wrap gap-2 mt-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeConfig[showDetail.type]?.color}`}>{showDetail.type}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyles[showDetail.status]}`}>{showDetail.status}</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-700/50 rounded-xl p-4 mb-4">
              <p className="text-gray-200 text-sm leading-relaxed">{showDetail.message}</p>
            </div>
            <div className="space-y-3">
              {[
                { label: "Notification ID", value: showDetail.id, mono: true },
                { label: "Recipient",       value: showDetail.user },
                { label: "Channel",         value: showDetail.channel },
                { label: "Sent On",         value: showDetail.date },
              ].map(({ label, value, mono }) => (
                <div key={label} className="flex justify-between py-2 border-b border-gray-700/50">
                  <span className="text-gray-400 text-sm">{label}</span>
                  <span className={`text-sm font-medium ${mono ? "font-mono text-yellow-400" : "text-white"}`}>{value}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowDetail(null)}
              className="w-full mt-5 py-2.5 rounded-lg border border-gray-600 text-gray-400 hover:bg-gray-700 text-sm font-medium transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-sm border border-gray-700 shadow-2xl text-center">
            <div className="w-14 h-14 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-400 text-2xl">!</span>
            </div>
            <h2 className="text-lg font-bold text-white mb-2">Delete Notification?</h2>
            <p className="text-gray-400 text-sm mb-6">This notification will be permanently removed from the list.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 py-2.5 rounded-lg border border-gray-600 text-gray-400 hover:bg-gray-700 text-sm font-medium transition-all">
                Cancel
              </button>
              <button onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold text-sm transition-all">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Compose Modal */}
      {showCompose && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-5">Compose Notification</h2>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm block mb-1">Title</label>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Booking Confirmed"
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-600" />
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-1">Message</label>
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Write your notification message..."
                  rows={3}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-600 resize-none" />
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-1">Recipient</label>
                <input type="text" value={form.user} onChange={(e) => setForm({ ...form, user: e.target.value })}
                  placeholder="User name or 'All Users'"
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-600" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-400 text-sm block mb-1">Type</label>
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2.5 text-sm outline-none border border-gray-600 focus:ring-2 focus:ring-yellow-500">
                    {Object.keys(typeConfig).map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-gray-400 text-sm block mb-1">Channel</label>
                  <select value={form.channel} onChange={(e) => setForm({ ...form, channel: e.target.value })}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2.5 text-sm outline-none border border-gray-600 focus:ring-2 focus:ring-yellow-500">
                    <option>Email</option><option>SMS</option><option>Push</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => { setShowCompose(false); setForm(emptyForm); }}
                className="flex-1 py-2.5 rounded-lg border border-gray-600 text-gray-400 hover:bg-gray-700 text-sm font-medium transition-all">
                Cancel
              </button>
              <button onClick={handleSend}
                className="flex-1 py-2.5 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black font-semibold text-sm transition-all">
                Send Now
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}