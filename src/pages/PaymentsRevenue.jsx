import { useState } from "react";

const initialPayments = [
  { id: "TXN001", user: "Chand Kumar", avatar: "CK", email: "chand@example.com", amount: 1200, date: "25 Mar 2026", method: "UPI", status: "Completed", type: "Booking", table: "T-04" },
  { id: "TXN002", user: "Alok Sharma", avatar: "AS", email: "alok@example.com", amount: 800, date: "27 Mar 2026", method: "Card", status: "Completed", type: "Booking", table: "T-02" },
  { id: "TXN003", user: "Priya Singh", avatar: "PS", email: "priya@example.com", amount: 1500, date: "28 Mar 2026", method: "NetBanking", status: "Pending", type: "Booking", table: "T-07" },
  { id: "TXN004", user: "Rahul Das", avatar: "RD", email: "rahul@example.com", amount: 600, date: "29 Mar 2026", method: "UPI", status: "Refunded", type: "Booking", table: "T-01" },
  { id: "TXN005", user: "Sneha Roy", avatar: "SR", email: "sneha@example.com", amount: 2000, date: "30 Mar 2026", method: "Card", status: "Completed", type: "Booking", table: "T-09" },
  { id: "TXN006", user: "Amit Patel", avatar: "AP", email: "amit@example.com", amount: 950, date: "01 Apr 2026", method: "UPI", status: "Failed", type: "Booking", table: "T-03" },
  { id: "TXN007", user: "Neha Ghosh", avatar: "NG", email: "neha@example.com", amount: 1100, date: "02 Apr 2026", method: "Card", status: "Completed", type: "Booking", table: "T-06" },
  { id: "TXN008", user: "Vikram Rao", avatar: "VR", email: "vikram@example.com", amount: 750, date: "03 Apr 2026", method: "NetBanking", status: "Pending", type: "Booking", table: "T-05" },
  { id: "TXN009", user: "Meera Joshi", avatar: "MJ", email: "meera@example.com", amount: 1800, date: "04 Apr 2026", method: "UPI", status: "Completed", type: "Booking", table: "T-08" },
  { id: "TXN010", user: "Arjun Nair", avatar: "AN", email: "arjun@example.com", amount: 500, date: "05 Apr 2026", method: "Card", status: "Refunded", type: "Booking", table: "T-02" },
];

const avatarColors = [
  "bg-purple-600", "bg-blue-600", "bg-green-600",
  "bg-yellow-600", "bg-red-600", "bg-pink-600",
  "bg-indigo-600", "bg-teal-600", "bg-orange-600", "bg-cyan-600"
];

const statusStyles = {
  Completed: "bg-green-500/20 text-green-400",
  Pending: "bg-yellow-500/20 text-yellow-400",
  Refunded: "bg-blue-500/20 text-blue-400",
  Failed: "bg-red-500/20 text-red-400",
};

const methodStyles = {
  UPI: "bg-purple-500/20 text-purple-300",
  Card: "bg-cyan-500/20 text-cyan-300",
  NetBanking: "bg-orange-500/20 text-orange-300",
};

export default function PaymentsRevenue() {
  const [payments, setPayments] = useState(initialPayments);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterMethod, setFilterMethod] = useState("All");
  const [showRefundModal, setShowRefundModal] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(null);
  const [refundReason, setRefundReason] = useState("");

  const filtered = payments.filter((p) => {
    const matchSearch =
      p.user.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || p.status === filterStatus;
    const matchMethod = filterMethod === "All" || p.method === filterMethod;
    return matchSearch && matchStatus && matchMethod;
  });

  const totalRevenue = payments.filter((p) => p.status === "Completed").reduce((s, p) => s + p.amount, 0);
  const totalRefunded = payments.filter((p) => p.status === "Refunded").reduce((s, p) => s + p.amount, 0);
  const totalPending = payments.filter((p) => p.status === "Pending").reduce((s, p) => s + p.amount, 0);
  const totalFailed = payments.filter((p) => p.status === "Failed").length;

  const handleRefund = (id) => {
    setPayments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Refunded" } : p))
    );
    setShowRefundModal(null);
    setRefundReason("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Payments & Revenue</h1>
          <p className="text-gray-400 text-sm mt-1">Track all transactions, revenue, and refund management</p>
        </div>
        <button className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg transition-all duration-200 text-sm">
          ↓ Export Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-green-500 rounded-xl p-4">
          <p className="text-white/80 text-sm">Total Revenue</p>
          <p className="text-white text-2xl font-bold mt-1">₹{totalRevenue.toLocaleString()}</p>
          <p className="text-white/60 text-xs mt-1">Completed payments</p>
        </div>
        <div className="bg-yellow-500 rounded-xl p-4">
          <p className="text-white/80 text-sm">Pending</p>
          <p className="text-white text-2xl font-bold mt-1">₹{totalPending.toLocaleString()}</p>
          <p className="text-white/60 text-xs mt-1">Awaiting confirmation</p>
        </div>
        <div className="bg-blue-500 rounded-xl p-4">
          <p className="text-white/80 text-sm">Refunded</p>
          <p className="text-white text-2xl font-bold mt-1">₹{totalRefunded.toLocaleString()}</p>
          <p className="text-white/60 text-xs mt-1">Total refunds issued</p>
        </div>
        <div className="bg-red-500 rounded-xl p-4">
          <p className="text-white/80 text-sm">Failed</p>
          <p className="text-white text-2xl font-bold mt-1">{totalFailed}</p>
          <p className="text-white/60 text-xs mt-1">Failed transactions</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-xl p-4 mb-4 flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Search by name, email or transaction ID..."
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
          <option>Completed</option>
          <option>Pending</option>
          <option>Refunded</option>
          <option>Failed</option>
        </select>
        <select
          value={filterMethod}
          onChange={(e) => setFilterMethod(e.target.value)}
          className="bg-gray-700 text-white rounded-lg px-4 py-2 text-sm outline-none border border-gray-600 focus:ring-2 focus:ring-yellow-500"
        >
          <option value="All">All Methods</option>
          <option>UPI</option>
          <option>Card</option>
          <option>NetBanking</option>
        </select>
        <span className="text-gray-400 text-sm ml-auto">{filtered.length} transaction{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      {/* Table */}
      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700 text-gray-400 text-left">
                <th className="px-5 py-3 font-medium">Transaction ID</th>
                <th className="px-5 py-3 font-medium">User</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Method</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Table</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-gray-500">No transactions found</td>
                </tr>
              ) : (
                filtered.map((payment, i) => (
                  <tr key={payment.id} className="border-b border-gray-700/50 hover:bg-gray-700/40 transition-colors">
                    <td className="px-5 py-3">
                      <span className="font-mono text-yellow-400 text-xs bg-yellow-500/10 px-2 py-1 rounded">
                        {payment.id}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold`}>
                          {payment.avatar}
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm">{payment.user}</p>
                          <p className="text-gray-500 text-xs">{payment.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-white font-semibold">₹{payment.amount.toLocaleString()}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${methodStyles[payment.method]}`}>
                        {payment.method}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[payment.status]}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-400 text-sm">{payment.date}</td>
                    <td className="px-5 py-3">
                      <span className="text-gray-300 bg-gray-700 px-2 py-1 rounded text-xs font-mono">
                        {payment.table}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setShowDetailModal(payment)}
                          className="px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 rounded-lg text-xs font-medium transition-all"
                        >
                          View
                        </button>
                        {payment.status === "Completed" && (
                          <button
                            onClick={() => setShowRefundModal(payment)}
                            className="px-3 py-1.5 bg-orange-600/20 hover:bg-orange-600/40 text-orange-400 rounded-lg text-xs font-medium transition-all"
                          >
                            Refund
                          </button>
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

      {/* View Detail Modal */}
      {showDetailModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-white">Transaction Details</h2>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[showDetailModal.status]}`}>
                {showDetailModal.status}
              </span>
            </div>
            <div className="space-y-3">
              {[
                { label: "Transaction ID", value: showDetailModal.id, mono: true },
                { label: "Customer Name", value: showDetailModal.user },
                { label: "Email", value: showDetailModal.email },
                { label: "Amount", value: `₹${showDetailModal.amount.toLocaleString()}` },
                { label: "Payment Method", value: showDetailModal.method },
                { label: "Date", value: showDetailModal.date },
                { label: "Table Reserved", value: showDetailModal.table },
                { label: "Type", value: showDetailModal.type },
              ].map(({ label, value, mono }) => (
                <div key={label} className="flex justify-between items-center py-2 border-b border-gray-700/50">
                  <span className="text-gray-400 text-sm">{label}</span>
                  <span className={`text-white text-sm font-medium ${mono ? "font-mono text-yellow-400" : ""}`}>
                    {value}
                  </span>
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

      {/* Refund Modal */}
      {showRefundModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700 shadow-2xl">
            <div className="w-14 h-14 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-orange-400 text-2xl">↩</span>
            </div>
            <h2 className="text-xl font-bold text-white text-center mb-1">Process Refund</h2>
            <p className="text-gray-400 text-sm text-center mb-5">
              Refund <span className="text-white font-semibold">₹{showRefundModal.amount.toLocaleString()}</span> to <span className="text-white font-semibold">{showRefundModal.user}</span>
            </p>
            <div className="mb-4">
              <label className="text-gray-400 text-sm block mb-1">Reason for Refund</label>
              <textarea
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
                placeholder="Enter reason (optional)..."
                rows={3}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-600 resize-none"
              />
            </div>
            <div className="bg-gray-700/50 rounded-lg p-3 mb-5 text-xs text-gray-400">
              Transaction ID: <span className="font-mono text-yellow-400">{showRefundModal.id}</span> · Method: {showRefundModal.method}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => { setShowRefundModal(null); setRefundReason(""); }}
                className="flex-1 py-2.5 rounded-lg border border-gray-600 text-gray-400 hover:bg-gray-700 text-sm font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRefund(showRefundModal.id)}
                className="flex-1 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-400 text-white font-semibold text-sm transition-all"
              >
                Confirm Refund
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}