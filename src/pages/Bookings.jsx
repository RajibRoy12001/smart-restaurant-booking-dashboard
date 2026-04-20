import { useState } from "react";
// for admin page
const initialBookings = [
  { id: "BK001", user: "Chand Kumar", avatar: "CK", email: "chand@example.com", phone: "+91 98765 43210", table: "T-04", location: "Main Hall", date: "25 Mar 2026", time: "07:00 PM", guests: 4, status: "Confirmed", amount: 1200 },
  { id: "BK002", user: "Alok Sharma", avatar: "AS", email: "alok@example.com", phone: "+91 91234 56789", table: "T-02", location: "Garden Area", date: "27 Mar 2026", time: "08:00 PM", guests: 2, status: "Confirmed", amount: 800 },
  { id: "BK003", user: "Priya Singh", avatar: "PS", email: "priya@example.com", phone: "+91 99887 76655", table: "T-07", location: "Rooftop", date: "28 Mar 2026", time: "06:30 PM", guests: 6, status: "Pending", amount: 1500 },
  { id: "BK004", user: "Rahul Das", avatar: "RD", email: "rahul@example.com", phone: "+91 88776 65544", table: "T-01", location: "Main Hall", date: "29 Mar 2026", time: "09:00 PM", guests: 2, status: "Cancelled", amount: 600 },
  { id: "BK005", user: "Sneha Roy", avatar: "SR", email: "sneha@example.com", phone: "+91 77665 54433", table: "T-09", location: "Rooftop", date: "30 Mar 2026", time: "07:30 PM", guests: 8, status: "Confirmed", amount: 2000 },
  { id: "BK006", user: "Amit Patel", avatar: "AP", email: "amit@example.com", phone: "+91 66554 43322", table: "T-03", location: "Garden Area", date: "01 Apr 2026", time: "08:30 PM", guests: 3, status: "Pending", amount: 950 },
  { id: "BK007", user: "Neha Ghosh", avatar: "NG", email: "neha@example.com", phone: "+91 55443 32211", table: "T-06", location: "Main Hall", date: "02 Apr 2026", time: "07:00 PM", guests: 4, status: "Completed", amount: 1100 },
  { id: "BK008", user: "Vikram Rao", avatar: "VR", email: "vikram@example.com", phone: "+91 44332 21100", table: "T-05", location: "Rooftop", date: "03 Apr 2026", time: "06:00 PM", guests: 5, status: "Pending", amount: 750 },
  { id: "BK009", user: "Meera Joshi", avatar: "MJ", email: "meera@example.com", phone: "+91 33221 10099", table: "T-08", location: "Garden Area", date: "04 Apr 2026", time: "08:00 PM", guests: 7, status: "Confirmed", amount: 1800 },
  { id: "BK010", user: "Arjun Nair", avatar: "AN", email: "arjun@example.com", phone: "+91 22110 09988", table: "T-02", location: "Main Hall", date: "05 Apr 2026", time: "09:30 PM", guests: 2, status: "Cancelled", amount: 500 },
];

const avatarColors = [
  "bg-purple-600", "bg-blue-600", "bg-green-600", "bg-yellow-600",
  "bg-red-600", "bg-pink-600", "bg-indigo-600", "bg-teal-600", "bg-orange-600", "bg-cyan-600"
];

const statusStyles = {
  Confirmed: "bg-green-500/20 text-green-400",
  Pending: "bg-yellow-500/20 text-yellow-400",
  Cancelled: "bg-red-500/20 text-red-400",
  Completed: "bg-blue-500/20 text-blue-400",
};

const locationStyles = {
  "Main Hall": "bg-purple-500/20 text-purple-300",
  "Garden Area": "bg-green-500/20 text-green-300",
  "Rooftop": "bg-cyan-500/20 text-cyan-300",
};

export default function Bookings() {
  const [bookings, setBookings] = useState(initialBookings);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterLocation, setFilterLocation] = useState("All");
  const [showDetailModal, setShowDetailModal] = useState(null);
  const [showEditModal, setShowEditModal] = useState(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({ user: "", email: "", phone: "", table: "", location: "Main Hall", date: "", time: "", guests: 2, status: "Pending", amount: "" });

  const filtered = bookings.filter((b) => {
    const matchSearch =
      b.user.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || b.status === filterStatus;
    const matchLocation = filterLocation === "All" || b.location === filterLocation;
    return matchSearch && matchStatus && matchLocation;
  });

  const totalConfirmed = bookings.filter((b) => b.status === "Confirmed").length;
  const totalPending = bookings.filter((b) => b.status === "Pending").length;
  const totalCancelled = bookings.filter((b) => b.status === "Cancelled").length;
  const totalCompleted = bookings.filter((b) => b.status === "Completed").length;

  const handleStatusChange = (id, newStatus) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b)));
    setShowEditModal(null);
  };

  const handleCancel = (id) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: "Cancelled" } : b)));
    setShowCancelConfirm(null);
  };

  const handleAdd = () => {
    if (!form.user.trim() || !form.email.trim() || !form.table.trim() || !form.date || !form.time) return;
    const initials = form.user.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
    const newId = "BK" + String(bookings.length + 1).padStart(3, "0");
    setBookings((prev) => [...prev, { ...form, id: newId, avatar: initials, amount: Number(form.amount) || 0, guests: Number(form.guests) }]);
    setShowAddModal(false);
    setForm({ user: "", email: "", phone: "", table: "", location: "Main Hall", date: "", time: "", guests: 2, status: "Pending", amount: "" });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Bookings</h1>
          <p className="text-gray-400 text-sm mt-1">Manage all table reservations and booking status</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg transition-all duration-200 text-sm"
        >
          <span className="text-lg leading-none">+</span>
          New Booking
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-green-500 rounded-xl p-4">
          <p className="text-white/80 text-sm">Confirmed</p>
          <p className="text-white text-2xl font-bold mt-1">{totalConfirmed}</p>
          <p className="text-white/60 text-xs mt-1">Active bookings</p>
        </div>
        <div className="bg-yellow-500 rounded-xl p-4">
          <p className="text-white/80 text-sm">Pending</p>
          <p className="text-white text-2xl font-bold mt-1">{totalPending}</p>
          <p className="text-white/60 text-xs mt-1">Awaiting confirmation</p>
        </div>
        <div className="bg-blue-500 rounded-xl p-4">
          <p className="text-white/80 text-sm">Completed</p>
          <p className="text-white text-2xl font-bold mt-1">{totalCompleted}</p>
          <p className="text-white/60 text-xs mt-1">Successfully done</p>
        </div>
        <div className="bg-red-500 rounded-xl p-4">
          <p className="text-white/80 text-sm">Cancelled</p>
          <p className="text-white text-2xl font-bold mt-1">{totalCancelled}</p>
          <p className="text-white/60 text-xs mt-1">Cancelled bookings</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-xl p-4 mb-4 flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Search by name, email or booking ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 text-sm flex-1 min-w-[200px] outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-600"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-gray-700 text-white rounded-lg px-4 py-2 text-sm outline-none border border-gray-600 focus:ring-2 focus:ring-yellow-500"
        >
          <option value="All">All Status</option>
          <option>Confirmed</option>
          <option>Pending</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>
        <select
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
          className="bg-gray-700 text-white rounded-lg px-4 py-2 text-sm outline-none border border-gray-600 focus:ring-2 focus:ring-yellow-500"
        >
          <option value="All">All Locations</option>
          <option>Main Hall</option>
          <option>Garden Area</option>
          <option>Rooftop</option>
        </select>
        <span className="text-gray-400 text-sm ml-auto">{filtered.length} booking{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      {/* Table */}
      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700 text-gray-400 text-left">
                <th className="px-5 py-3 font-medium">Booking ID</th>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Table</th>
                <th className="px-5 py-3 font-medium">Location</th>
                <th className="px-5 py-3 font-medium">Date & Time</th>
                <th className="px-5 py-3 font-medium">Guests</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-10 text-gray-500">No bookings found</td>
                </tr>
              ) : (
                filtered.map((booking, i) => (
                  <tr key={booking.id} className="border-b border-gray-700/50 hover:bg-gray-700/40 transition-colors">
                    <td className="px-5 py-3">
                      <span className="font-mono text-yellow-400 text-xs bg-yellow-500/10 px-2 py-1 rounded">
                        {booking.id}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold`}>
                          {booking.avatar}
                        </div>
                        <div>
                          <p className="text-white font-medium">{booking.user}</p>
                          <p className="text-gray-500 text-xs">{booking.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-gray-300 bg-gray-700 px-2 py-1 rounded text-xs font-mono">{booking.table}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${locationStyles[booking.location]}`}>
                        {booking.location}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <p className="text-white text-sm">{booking.date}</p>
                      <p className="text-gray-500 text-xs">{booking.time}</p>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1">
                        <span className="text-gray-300">👥</span>
                        <span className="text-white">{booking.guests}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[booking.status]}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-white font-semibold">₹{booking.amount.toLocaleString()}</span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setShowDetailModal(booking)}
                          className="px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 rounded-lg text-xs font-medium transition-all"
                        >
                          View
                        </button>
                        {(booking.status === "Pending" || booking.status === "Confirmed") && (
                          <>
                            <button
                              onClick={() => setShowEditModal(booking)}
                              className="px-3 py-1.5 bg-green-600/20 hover:bg-green-600/40 text-green-400 rounded-lg text-xs font-medium transition-all"
                            >
                              Update
                            </button>
                            <button
                              onClick={() => setShowCancelConfirm(booking.id)}
                              className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg text-xs font-medium transition-all"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-white">Booking Details</h2>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[showDetailModal.status]}`}>
                {showDetailModal.status}
              </span>
            </div>
            <div className="space-y-3">
              {[
                { label: "Booking ID", value: showDetailModal.id, mono: true },
                { label: "Customer", value: showDetailModal.user },
                { label: "Email", value: showDetailModal.email },
                { label: "Phone", value: showDetailModal.phone },
                { label: "Table", value: showDetailModal.table },
                { label: "Location", value: showDetailModal.location },
                { label: "Date", value: showDetailModal.date },
                { label: "Time", value: showDetailModal.time },
                { label: "Guests", value: showDetailModal.guests },
                { label: "Amount", value: `₹${showDetailModal.amount.toLocaleString()}` },
              ].map(({ label, value, mono }) => (
                <div key={label} className="flex justify-between items-center py-2 border-b border-gray-700/50">
                  <span className="text-gray-400 text-sm">{label}</span>
                  <span className={`text-sm font-medium ${mono ? "font-mono text-yellow-400" : "text-white"}`}>{value}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowDetailModal(null)}
              className="w-full mt-5 py-2.5 rounded-lg border border-gray-600 text-gray-400 hover:bg-gray-700 text-sm font-medium transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Update Status Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-sm border border-gray-700 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-2">Update Booking</h2>
            <p className="text-gray-400 text-sm mb-5">
              Booking <span className="font-mono text-yellow-400">{showEditModal.id}</span> — {showEditModal.user}
            </p>
            <div className="space-y-3 mb-5">
              {["Confirmed", "Completed", "Cancelled"].map((s) => (
                <button
                  key={s}
                  onClick={() => handleStatusChange(showEditModal.id, s)}
                  className={`w-full py-2.5 rounded-lg text-sm font-medium transition-all border ${
                    showEditModal.status === s
                      ? "border-yellow-500 bg-yellow-500/10 text-yellow-400"
                      : "border-gray-600 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  Mark as {s}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowEditModal(null)}
              className="w-full py-2.5 rounded-lg border border-gray-600 text-gray-400 hover:bg-gray-700 text-sm font-medium transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Cancel Confirm Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-sm border border-gray-700 shadow-2xl text-center">
            <div className="w-14 h-14 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-400 text-2xl">✕</span>
            </div>
            <h2 className="text-lg font-bold text-white mb-2">Cancel Booking?</h2>
            <p className="text-gray-400 text-sm mb-6">This booking will be marked as cancelled. This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelConfirm(null)}
                className="flex-1 py-2.5 rounded-lg border border-gray-600 text-gray-400 hover:bg-gray-700 text-sm font-medium transition-all"
              >
                Go Back
              </button>
              <button
                onClick={() => handleCancel(showCancelConfirm)}
                className="flex-1 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold text-sm transition-all"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Booking Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-5">New Booking</h2>
            <div className="space-y-4">
              {[
                { label: "Customer Name", key: "user", type: "text", placeholder: "Enter full name" },
                { label: "Email", key: "email", type: "email", placeholder: "Enter email" },
                { label: "Phone", key: "phone", type: "text", placeholder: "+91 XXXXX XXXXX" },
                { label: "Table Number", key: "table", type: "text", placeholder: "e.g. T-04" },
                { label: "Date", key: "date", type: "date", placeholder: "" },
                { label: "Time", key: "time", type: "time", placeholder: "" },
                { label: "Guests", key: "guests", type: "number", placeholder: "Number of guests" },
                { label: "Amount (₹)", key: "amount", type: "number", placeholder: "Enter amount" },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label className="text-gray-400 text-sm block mb-1">{label}</label>
                  <input
                    type={type}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-600"
                  />
                </div>
              ))}
              <div>
                <label className="text-gray-400 text-sm block mb-1">Location</label>
                <select
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2.5 text-sm outline-none border border-gray-600 focus:ring-2 focus:ring-yellow-500"
                >
                  <option>Main Hall</option>
                  <option>Garden Area</option>
                  <option>Rooftop</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2.5 rounded-lg border border-gray-600 text-gray-400 hover:bg-gray-700 text-sm font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="flex-1 py-2.5 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black font-semibold text-sm transition-all"
              >
                Create Booking
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}