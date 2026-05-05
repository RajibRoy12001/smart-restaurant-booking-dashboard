import { useState } from "react";

const initialCustomers = [
  { id: "C001", name: "Chand Kumar",  avatar: "CK", email: "chand@example.com",  phone: "+91 98765 43210", totalBookings: 5, totalSpent: 6200,  lastVisit: "25 Mar 2026", status: "Regular",  joined: "10 Jan 2026" },
  { id: "C002", name: "Alok Sharma",  avatar: "AS", email: "alok@example.com",   phone: "+91 91234 56789", totalBookings: 3, totalSpent: 3400,  lastVisit: "27 Mar 2026", status: "Regular",  joined: "15 Jan 2026" },
  { id: "C003", name: "Priya Singh",  avatar: "PS", email: "priya@example.com",  phone: "+91 99887 76655", totalBookings: 9, totalSpent: 14500, lastVisit: "28 Mar 2026", status: "VIP",      joined: "02 Feb 2026" },
  { id: "C004", name: "Rahul Das",    avatar: "RD", email: "rahul@example.com",  phone: "+91 88776 65544", totalBookings: 1, totalSpent: 600,   lastVisit: "29 Mar 2026", status: "New",      joined: "20 Feb 2026" },
  { id: "C005", name: "Sneha Roy",    avatar: "SR", email: "sneha@example.com",  phone: "+91 77665 54433", totalBookings: 7, totalSpent: 11200, lastVisit: "30 Mar 2026", status: "VIP",      joined: "05 Mar 2026" },
  { id: "C006", name: "Amit Patel",   avatar: "AP", email: "amit@example.com",   phone: "+91 66554 43322", totalBookings: 2, totalSpent: 1750,  lastVisit: "01 Apr 2026", status: "Regular",  joined: "12 Mar 2026" },
  { id: "C007", name: "Neha Ghosh",   avatar: "NG", email: "neha@example.com",   phone: "+91 55443 32211", totalBookings: 4, totalSpent: 4800,  lastVisit: "02 Apr 2026", status: "Regular",  joined: "18 Mar 2026" },
  { id: "C008", name: "Vikram Rao",   avatar: "VR", email: "vikram@example.com", phone: "+91 44332 21100", totalBookings: 6, totalSpent: 7900,  lastVisit: "03 Apr 2026", status: "VIP",      joined: "22 Mar 2026" },
  { id: "C009", name: "Meera Joshi",  avatar: "MJ", email: "meera@example.com",  phone: "+91 33221 10099", totalBookings: 1, totalSpent: 1800,  lastVisit: "04 Apr 2026", status: "New",      joined: "01 Apr 2026" },
  { id: "C010", name: "Arjun Nair",   avatar: "AN", email: "arjun@example.com",  phone: "+91 22110 09988", totalBookings: 2, totalSpent: 2300,  lastVisit: "05 Apr 2026", status: "Regular",  joined: "28 Mar 2026" },
];

const avatarColors = [
  "bg-purple-600","bg-blue-600","bg-green-600","bg-yellow-600",
  "bg-red-600","bg-pink-600","bg-indigo-600","bg-teal-600","bg-orange-600","bg-cyan-600",
];

const statusConfig = {
  VIP:     { style: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30", dot: "bg-yellow-400" },
  Regular: { style: "bg-blue-500/20 text-blue-400 border border-blue-500/30",       dot: "bg-blue-400" },
  New:     { style: "bg-green-500/20 text-green-400 border border-green-500/30",    dot: "bg-green-400" },
};

export default function Customers() {
  const [customers, setCustomers]       = useState(initialCustomers);
  const [search, setSearch]             = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showDetail, setShowDetail]     = useState(null);
  const [showDelete, setShowDelete]     = useState(null);
  const [showAdd, setShowAdd]           = useState(false);
  const [form, setForm]                 = useState({ name:"", email:"", phone:"", status:"Regular" });

  const filtered = customers.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalVIP     = customers.filter((c) => c.status === "VIP").length;
  const totalNew     = customers.filter((c) => c.status === "New").length;
  const totalRevenue = customers.reduce((s, c) => s + c.totalSpent, 0);

  const handleAdd = () => {
    if (!form.name.trim() || !form.email.trim()) return;
    const initials = form.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
    const today = new Date().toLocaleDateString("en-GB", { day:"2-digit", month:"short", year:"numeric" });
    setCustomers((prev) => [...prev, {
      id: "C" + String(prev.length + 1).padStart(3, "0"),
      ...form, avatar: initials,
      totalBookings: 0, totalSpent: 0,
      lastVisit: "—", joined: today,
    }]);
    setShowAdd(false);
    setForm({ name:"", email:"", phone:"", status:"Regular" });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Customers</h1>
          <p className="text-gray-400 text-sm mt-1">View and manage all registered customers</p>
        </div>
        <button onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg transition-all text-sm">
          <span className="text-lg leading-none">+</span> Add Customer
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-500 rounded-xl p-4">
          <p className="text-white/80 text-sm">Total Customers</p>
          <p className="text-white text-2xl font-bold mt-1">{customers.length}</p>
          <p className="text-white/60 text-xs mt-1">All registered</p>
        </div>
        <div className="bg-yellow-500 rounded-xl p-4">
          <p className="text-white/80 text-sm">VIP Customers</p>
          <p className="text-white text-2xl font-bold mt-1">{totalVIP}</p>
          <p className="text-white/60 text-xs mt-1">High-value guests</p>
        </div>
        <div className="bg-green-500 rounded-xl p-4">
          <p className="text-white/80 text-sm">New This Month</p>
          <p className="text-white text-2xl font-bold mt-1">{totalNew}</p>
          <p className="text-white/60 text-xs mt-1">Recently joined</p>
        </div>
        <div className="bg-purple-600 rounded-xl p-4">
          <p className="text-white/80 text-sm">Total Revenue</p>
          <p className="text-white text-2xl font-bold mt-1">₹{totalRevenue.toLocaleString()}</p>
          <p className="text-white/60 text-xs mt-1">Lifetime spending</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-xl p-4 mb-4 flex flex-wrap gap-3 items-center">
        <input type="text" placeholder="Search by name, email or ID..."
          value={search} onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 text-sm flex-1 min-w-[200px] outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-600" />
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-gray-700 text-white rounded-lg px-4 py-2 text-sm outline-none border border-gray-600 focus:ring-2 focus:ring-yellow-500">
          <option value="All">All Customers</option>
          <option>VIP</option><option>Regular</option><option>New</option>
        </select>
        <span className="text-gray-400 text-sm ml-auto">{filtered.length} customer{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      {/* Table */}
      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700 text-gray-400 text-left">
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Contact</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Bookings</th>
                <th className="px-5 py-3 font-medium">Total Spent</th>
                <th className="px-5 py-3 font-medium">Last Visit</th>
                <th className="px-5 py-3 font-medium">Joined</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-10 text-gray-500">No customers found</td></tr>
              ) : filtered.map((c, i) => (
                <tr key={c.id} className="border-b border-gray-700/50 hover:bg-gray-700/40 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold`}>
                        {c.avatar}
                      </div>
                      <div>
                        <p className="text-white font-medium">{c.name}</p>
                        <p className="text-gray-500 text-xs font-mono">{c.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <p className="text-gray-300 text-sm">{c.email}</p>
                    <p className="text-gray-500 text-xs">{c.phone}</p>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 w-fit ${statusConfig[c.status]?.style}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[c.status]?.dot}`} />
                      {c.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-white font-medium">{c.totalBookings}</td>
                  <td className="px-5 py-3 text-white font-semibold">₹{c.totalSpent.toLocaleString()}</td>
                  <td className="px-5 py-3 text-gray-400 text-sm">{c.lastVisit}</td>
                  <td className="px-5 py-3 text-gray-400 text-sm">{c.joined}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => setShowDetail(c)}
                        className="px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 rounded-lg text-xs font-medium transition-all">
                        View
                      </button>
                      <button onClick={() => setShowDelete(c.id)}
                        className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg text-xs font-medium transition-all">
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetail && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700 shadow-2xl">
            <div className="flex items-center gap-4 mb-5">
              <div className={`w-14 h-14 rounded-full ${avatarColors[initialCustomers.findIndex(c=>c.id===showDetail.id) % avatarColors.length]} flex items-center justify-center text-white text-lg font-bold`}>
                {showDetail.avatar}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{showDetail.name}</h2>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[showDetail.status]?.style}`}>
                  {showDetail.status}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-700/50 rounded-xl p-3 text-center">
                <p className="text-gray-400 text-xs">Total Bookings</p>
                <p className="text-white text-xl font-bold mt-1">{showDetail.totalBookings}</p>
              </div>
              <div className="bg-gray-700/50 rounded-xl p-3 text-center">
                <p className="text-gray-400 text-xs">Total Spent</p>
                <p className="text-white text-xl font-bold mt-1">₹{showDetail.totalSpent.toLocaleString()}</p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { label:"Customer ID", value: showDetail.id, mono: true },
                { label:"Email",       value: showDetail.email },
                { label:"Phone",       value: showDetail.phone },
                { label:"Last Visit",  value: showDetail.lastVisit },
                { label:"Member Since",value: showDetail.joined },
              ].map(({ label, value, mono }) => (
                <div key={label} className="flex justify-between py-2 border-b border-gray-700/50">
                  <span className="text-gray-400 text-sm">{label}</span>
                  <span className={`text-sm font-medium ${mono ? "font-mono text-yellow-400" : "text-white"}`}>{value}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setShowDetail(null)}
              className="w-full mt-5 py-2.5 rounded-lg border border-gray-600 text-gray-400 hover:bg-gray-700 text-sm font-medium transition-all">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDelete && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-sm border border-gray-700 shadow-2xl text-center">
            <div className="w-14 h-14 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-400 text-2xl">!</span>
            </div>
            <h2 className="text-lg font-bold text-white mb-2">Remove Customer?</h2>
            <p className="text-gray-400 text-sm mb-6">This customer and all their data will be permanently removed.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowDelete(null)}
                className="flex-1 py-2.5 rounded-lg border border-gray-600 text-gray-400 hover:bg-gray-700 text-sm font-medium transition-all">Cancel</button>
              <button onClick={() => { setCustomers((p) => p.filter((c) => c.id !== showDelete)); setShowDelete(null); }}
                className="flex-1 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold text-sm transition-all">Remove</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-5">Add Customer</h2>
            <div className="space-y-4">
              {[
                { label:"Full Name", key:"name", type:"text", placeholder:"Enter full name" },
                { label:"Email",     key:"email",type:"email",placeholder:"Enter email" },
                { label:"Phone",     key:"phone",type:"text", placeholder:"+91 XXXXX XXXXX" },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label className="text-gray-400 text-sm block mb-1">{label}</label>
                  <input type={type} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-600" />
                </div>
              ))}
              <div>
                <label className="text-gray-400 text-sm block mb-1">Status</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2.5 text-sm outline-none border border-gray-600 focus:ring-2 focus:ring-yellow-500">
                  <option>Regular</option><option>VIP</option><option>New</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAdd(false)}
                className="flex-1 py-2.5 rounded-lg border border-gray-600 text-gray-400 hover:bg-gray-700 text-sm font-medium transition-all">Cancel</button>
              <button onClick={handleAdd}
                className="flex-1 py-2.5 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black font-semibold text-sm transition-all">Add Customer</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}