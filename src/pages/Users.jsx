import { useState } from "react";

const initialUsers = [
  { id: 1, name: "Chand Kumar", email: "chand@example.com", role: "Customer", status: "Active", joined: "10 Jan 2026", avatar: "CK" },
  { id: 2, name: "Alok Sharma", email: "alok@example.com", role: "Customer", status: "Active", joined: "15 Jan 2026", avatar: "AS" },
  { id: 3, name: "Priya Singh", email: "priya@example.com", role: "Admin", status: "Active", joined: "02 Feb 2026", avatar: "PS" },
  { id: 4, name: "Rahul Das", email: "rahul@example.com", role: "Customer", status: "Inactive", joined: "20 Feb 2026", avatar: "RD" },
  { id: 5, name: "Sneha Roy", email: "sneha@example.com", role: "Customer", status: "Active", joined: "05 Mar 2026", avatar: "SR" },
  { id: 6, name: "Amit Patel", email: "amit@example.com", role: "Manager", status: "Active", joined: "12 Mar 2026", avatar: "AP" },
  { id: 7, name: "Neha Ghosh", email: "neha@example.com", role: "Customer", status: "Inactive", joined: "18 Mar 2026", avatar: "NG" },
  { id: 8, name: "Vikram Rao", email: "vikram@example.com", role: "Customer", status: "Active", joined: "22 Mar 2026", avatar: "VR" },
];

const roleColors = {
  Admin: "bg-purple-500/20 text-purple-300",
  Manager: "bg-blue-500/20 text-blue-300",
  Customer: "bg-yellow-500/20 text-yellow-300",
};

const avatarColors = [
  "bg-purple-600", "bg-blue-600", "bg-green-600",
  "bg-yellow-600", "bg-red-600", "bg-pink-600", "bg-indigo-600", "bg-teal-600"
];

export default function Users() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", role: "Customer", status: "Active" });

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === "All" || u.role === filterRole;
    const matchStatus = filterStatus === "All" || u.status === filterStatus;
    return matchSearch && matchRole && matchStatus;
  });

  const openAdd = () => {
    setEditUser(null);
    setForm({ name: "", email: "", role: "Customer", status: "Active" });
    setShowModal(true);
  };

  const openEdit = (user) => {
    setEditUser(user);
    setForm({ name: user.name, email: user.email, role: user.role, status: user.status });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.email.trim()) return;
    if (editUser) {
      setUsers((prev) =>
        prev.map((u) => (u.id === editUser.id ? { ...u, ...form } : u))
      );
    } else {
      const initials = form.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
      setUsers((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...form,
          joined: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
          avatar: initials,
        },
      ]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setShowDeleteConfirm(null);
  };

  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u
      )
    );
  };

  const totalActive = users.filter((u) => u.status === "Active").length;
  const totalAdmin = users.filter((u) => u.role === "Admin").length;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Manage Users</h1>
          <p className="text-gray-400 text-sm mt-1">View and manage all registered users</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg transition-all duration-200"
        >
          <span className="text-lg leading-none">+</span>
          Add User
        </button>
      </div>

      {/* Stats Cards */}
     {/*  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Users", value: users.length, color: "bg-blue-500" },
          { label: "Active Users", value: totalActive, color: "bg-green-500" },
          { label: "Inactive Users", value: users.length - totalActive, color: "bg-red-500" },
          { label: "Admins", value: totalAdmin, color: "bg-purple-500" },
        ].map((card) => (
          <div key={card.label} className={`${card.color} rounded-xl p-4`}>
            <p className="text-white/80 text-sm">{card.label}</p>
            <p className="text-white text-2xl font-bold mt-1">{card.value}</p>
          </div>
        ))}
      </div> */}

      {/* Filters */}
      <div className="bg-gray-800 rounded-xl p-4 mb-4 flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 text-sm flex-1 min-w-[200px] outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-600"
        />
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="bg-gray-700 text-white rounded-lg px-4 py-2 text-sm outline-none border border-gray-600 focus:ring-2 focus:ring-yellow-500"
        >
          <option value="All">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="Customer">Customer</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-gray-700 text-white rounded-lg px-4 py-2 text-sm outline-none border border-gray-600 focus:ring-2 focus:ring-yellow-500"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <span className="text-gray-400 text-sm ml-auto">{filtered.length} user{filtered.length !== 1 ? "s" : ""} found</span>
      </div>

      {/* Table */}
      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700 text-gray-400 text-left">
                <th className="px-5 py-3 font-medium">User</th>
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">Role</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Joined</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-500">No users found</td>
                </tr>
              ) : (
                filtered.map((user, i) => (
                  <tr key={user.id} className="border-b border-gray-700/50 hover:bg-gray-700/40 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold`}>
                          {user.avatar}
                        </div>
                        <span className="font-medium text-white">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-gray-400">{user.email}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${roleColors[user.role] || "bg-gray-600 text-gray-300"}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <button
                        onClick={() => toggleStatus(user.id)}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                          user.status === "Active"
                            ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                            : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                        }`}
                      >
                        {user.status}
                      </button>
                    </td>
                    <td className="px-5 py-3 text-gray-400">{user.joined}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(user)}
                          className="px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 rounded-lg text-xs font-medium transition-all"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(user.id)}
                          className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg text-xs font-medium transition-all"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-5">
              {editUser ? "Edit User" : "Add New User"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm block mb-1">Full Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter full name"
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-600"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Enter email address"
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-600"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-1">Role</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2.5 text-sm outline-none border border-gray-600 focus:ring-2 focus:ring-yellow-500"
                >
                  <option>Customer</option>
                  <option>Manager</option>
                  <option>Admin</option>
                </select>
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-1">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2.5 text-sm outline-none border border-gray-600 focus:ring-2 focus:ring-yellow-500"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 rounded-lg border border-gray-600 text-gray-400 hover:bg-gray-700 text-sm font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-2.5 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black font-semibold text-sm transition-all"
              >
                {editUser ? "Save Changes" : "Add User"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-sm border border-gray-700 shadow-2xl text-center">
            <div className="w-14 h-14 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-400 text-2xl">!</span>
            </div>
            <h2 className="text-lg font-bold text-white mb-2">Delete User?</h2>
            <p className="text-gray-400 text-sm mb-6">This action cannot be undone. The user will be permanently removed.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 py-2.5 rounded-lg border border-gray-600 text-gray-400 hover:bg-gray-700 text-sm font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold text-sm transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
