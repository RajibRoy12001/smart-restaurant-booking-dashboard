import { useState } from "react";

const initialTables = [
  { id: "T-01", capacity: 2,  location: "Main Hall",   status: "Available",  shape: "round",  features: ["Window View"],               currentBooking: null },
  { id: "T-02", capacity: 4,  location: "Main Hall",   status: "Occupied",   shape: "square", features: ["AC", "Corner Seat"],          currentBooking: { guest: "Alok Sharma", time: "8:00 PM", date: "08 Apr 2026" } },
  { id: "T-03", capacity: 2,  location: "Garden Area", status: "Available",  shape: "round",  features: ["Outdoor"],                   currentBooking: null },
  { id: "T-04", capacity: 6,  location: "Main Hall",   status: "Reserved",   shape: "rect",   features: ["AC", "Private"],             currentBooking: { guest: "Chand Kumar", time: "7:00 PM", date: "08 Apr 2026" } },
  { id: "T-05", capacity: 4,  location: "Rooftop",     status: "Available",  shape: "square", features: ["Open Air", "City View"],     currentBooking: null },
  { id: "T-06", capacity: 8,  location: "Main Hall",   status: "Available",  shape: "rect",   features: ["AC", "Large Group"],         currentBooking: null },
  { id: "T-07", capacity: 6,  location: "Rooftop",     status: "Reserved",   shape: "round",  features: ["City View", "Romantic"],     currentBooking: { guest: "Priya Singh", time: "6:30 PM", date: "08 Apr 2026" } },
  { id: "T-08", capacity: 4,  location: "Garden Area", status: "Occupied",   shape: "square", features: ["Outdoor", "Fountain View"],  currentBooking: { guest: "Meera Joshi", time: "8:00 PM", date: "08 Apr 2026" } },
  { id: "T-09", capacity: 10, location: "Rooftop",     status: "Available",  shape: "rect",   features: ["City View", "Large Group"],  currentBooking: null },
  { id: "T-10", capacity: 2,  location: "Garden Area", status: "Maintenance",shape: "round",  features: ["Outdoor"],                   currentBooking: null },
  { id: "T-11", capacity: 4,  location: "Main Hall",   status: "Available",  shape: "square", features: ["AC"],                        currentBooking: null },
  { id: "T-12", capacity: 6,  location: "Rooftop",     status: "Available",  shape: "rect",   features: ["Sunset View", "Open Air"],   currentBooking: null },
];

const statusConfig = {
  Available:   { style: "bg-green-500/20 text-green-400 border border-green-500/30",   dot: "bg-green-400",   card: "border-green-500/20" },
  Occupied:    { style: "bg-red-500/20 text-red-400 border border-red-500/30",         dot: "bg-red-400",     card: "border-red-500/20" },
  Reserved:    { style: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",dot: "bg-yellow-400",  card: "border-yellow-500/20" },
  Maintenance: { style: "bg-gray-500/20 text-gray-400 border border-gray-500/30",      dot: "bg-gray-400",    card: "border-gray-500/20" },
};

const locationStyles = {
  "Main Hall":   "bg-purple-500/20 text-purple-300",
  "Garden Area": "bg-green-500/20 text-green-300",
  "Rooftop":     "bg-cyan-500/20 text-cyan-300",
};

function TableShape({ shape, status }) {
  const color =
    status === "Available"   ? "#22c55e" :
    status === "Occupied"    ? "#ef4444" :
    status === "Reserved"    ? "#eab308" : "#6b7280";

  if (shape === "round") {
    return (
      <svg viewBox="0 0 60 60" className="w-12 h-12">
        <circle cx="30" cy="30" r="24" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="2" />
        <circle cx="30" cy="30" r="8" fill={color} fillOpacity="0.4" />
      </svg>
    );
  }
  if (shape === "square") {
    return (
      <svg viewBox="0 0 60 60" className="w-12 h-12">
        <rect x="8" y="8" width="44" height="44" rx="6" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="2" />
        <rect x="20" y="20" width="20" height="20" rx="3" fill={color} fillOpacity="0.4" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 72 48" className="w-14 h-10">
      <rect x="4" y="4" width="64" height="40" rx="6" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="2" />
      <rect x="18" y="14" width="36" height="20" rx="3" fill={color} fillOpacity="0.4" />
    </svg>
  );
}

export default function TablesManagement() {
  const [tables, setTables]             = useState(initialTables);
  const [search, setSearch]             = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterLocation, setFilterLocation] = useState("All");
  const [viewMode, setViewMode]         = useState("grid");
  const [showDetail, setShowDetail]     = useState(null);
  const [showEdit, setShowEdit]         = useState(null);
  const [showDelete, setShowDelete]     = useState(null);
  const [showAdd, setShowAdd]           = useState(false);
  const [editForm, setEditForm]         = useState({});
  const [addForm, setAddForm]           = useState({ id:"", capacity:2, location:"Main Hall", status:"Available", shape:"square", features:"" });

  const filtered = tables.filter((t) => {
    const matchSearch = t.id.toLowerCase().includes(search.toLowerCase()) || t.location.toLowerCase().includes(search.toLowerCase());
    const matchStatus   = filterStatus   === "All" || t.status   === filterStatus;
    const matchLocation = filterLocation === "All" || t.location === filterLocation;
    return matchSearch && matchStatus && matchLocation;
  });

  const countByStatus = (s) => tables.filter((t) => t.status === s).length;

  const handleEdit = (table) => { setEditForm({ ...table, featuresStr: table.features.join(", ") }); setShowEdit(table); };

  const handleSaveEdit = () => {
    setTables((prev) => prev.map((t) =>
      t.id === editForm.id ? { ...editForm, features: editForm.featuresStr.split(",").map((f) => f.trim()).filter(Boolean) } : t
    ));
    setShowEdit(null);
  };

  const handleAdd = () => {
    if (!addForm.id.trim()) return;
    setTables((prev) => [...prev, { ...addForm, capacity: Number(addForm.capacity), features: addForm.features.split(",").map((f) => f.trim()).filter(Boolean), currentBooking: null }]);
    setShowAdd(false);
    setAddForm({ id:"", capacity:2, location:"Main Hall", status:"Available", shape:"square", features:"" });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Tables Management</h1>
          <p className="text-gray-400 text-sm mt-1">Manage all tables across your restaurant locations</p>
        </div>
        <div className="flex gap-3">
          <div className="flex bg-gray-800 rounded-lg p-1">
            <button onClick={() => setViewMode("grid")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === "grid" ? "bg-yellow-500 text-black" : "text-gray-400 hover:text-white"}`}>
              ⊞ Grid
            </button>
            <button onClick={() => setViewMode("list")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === "list" ? "bg-yellow-500 text-black" : "text-gray-400 hover:text-white"}`}>
              ☰ List
            </button>
          </div>
          <button onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg transition-all text-sm">
            <span className="text-lg leading-none">+</span> Add Table
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-green-500 rounded-xl p-4">
          <p className="text-white/80 text-sm">Available</p>
          <p className="text-white text-2xl font-bold mt-1">{countByStatus("Available")}</p>
          <p className="text-white/60 text-xs mt-1">Ready for booking</p>
        </div>
        <div className="bg-red-500 rounded-xl p-4">
          <p className="text-white/80 text-sm">Occupied</p>
          <p className="text-white text-2xl font-bold mt-1">{countByStatus("Occupied")}</p>
          <p className="text-white/60 text-xs mt-1">Currently in use</p>
        </div>
        <div className="bg-yellow-500 rounded-xl p-4">
          <p className="text-white/80 text-sm">Reserved</p>
          <p className="text-white text-2xl font-bold mt-1">{countByStatus("Reserved")}</p>
          <p className="text-white/60 text-xs mt-1">Upcoming bookings</p>
        </div>
        <div className="bg-gray-600 rounded-xl p-4">
          <p className="text-white/80 text-sm">Maintenance</p>
          <p className="text-white text-2xl font-bold mt-1">{countByStatus("Maintenance")}</p>
          <p className="text-white/60 text-xs mt-1">Under service</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-xl p-4 mb-4 flex flex-wrap gap-3 items-center">
        <input type="text" placeholder="Search by table ID or location..."
          value={search} onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 text-sm flex-1 min-w-[200px] outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-600" />
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-gray-700 text-white rounded-lg px-4 py-2 text-sm outline-none border border-gray-600 focus:ring-2 focus:ring-yellow-500">
          <option value="All">All Status</option>
          <option>Available</option><option>Occupied</option><option>Reserved</option><option>Maintenance</option>
        </select>
        <select value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)}
          className="bg-gray-700 text-white rounded-lg px-4 py-2 text-sm outline-none border border-gray-600 focus:ring-2 focus:ring-yellow-500">
          <option value="All">All Locations</option>
          <option>Main Hall</option><option>Garden Area</option><option>Rooftop</option>
        </select>
        <span className="text-gray-400 text-sm ml-auto">{filtered.length} table{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.length === 0 ? (
            <div className="col-span-4 bg-gray-800 rounded-xl py-14 text-center text-gray-500">No tables found</div>
          ) : filtered.map((table) => (
            <div key={table.id}
              className={`bg-gray-800 rounded-xl p-4 border ${statusConfig[table.status]?.card || "border-gray-700"} hover:border-gray-500 transition-all cursor-pointer group`}
              onClick={() => setShowDetail(table)}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-bold text-lg font-mono">{table.id}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig[table.status]?.style}`}>
                  {table.status}
                </span>
              </div>
              <div className="flex justify-center my-3">
                <TableShape shape={table.shape} status={table.status} />
              </div>
              <div className="space-y-1.5 mt-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">Capacity</span>
                  <span className="text-white text-xs font-medium">👥 {table.capacity} guests</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">Location</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${locationStyles[table.location]}`}>{table.location}</span>
                </div>
              </div>
              {table.currentBooking && (
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <p className="text-gray-400 text-xs">Current: <span className="text-white">{table.currentBooking.guest}</span></p>
                  <p className="text-gray-500 text-xs">{table.currentBooking.time}</p>
                </div>
              )}
              <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => handleEdit(table)}
                  className="flex-1 py-1.5 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 rounded-lg text-xs font-medium transition-all">Edit</button>
                <button onClick={() => setShowDelete(table.id)}
                  className="flex-1 py-1.5 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg text-xs font-medium transition-all">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="bg-gray-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-left">
                  <th className="px-5 py-3 font-medium">Table</th>
                  <th className="px-5 py-3 font-medium">Location</th>
                  <th className="px-5 py-3 font-medium">Capacity</th>
                  <th className="px-5 py-3 font-medium">Shape</th>
                  <th className="px-5 py-3 font-medium">Features</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Current Booking</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={8} className="text-center py-10 text-gray-500">No tables found</td></tr>
                ) : filtered.map((table) => (
                  <tr key={table.id} className="border-b border-gray-700/50 hover:bg-gray-700/40 transition-colors">
                    <td className="px-5 py-3">
                      <span className="font-mono text-yellow-400 font-bold">{table.id}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${locationStyles[table.location]}`}>{table.location}</span>
                    </td>
                    <td className="px-5 py-3 text-white">👥 {table.capacity}</td>
                    <td className="px-5 py-3 text-gray-300 capitalize">{table.shape}</td>
                    <td className="px-5 py-3">
                      <div className="flex flex-wrap gap-1">
                        {table.features.slice(0,2).map((f) => (
                          <span key={f} className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded">{f}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[table.status]?.style}`}>{table.status}</span>
                    </td>
                    <td className="px-5 py-3">
                      {table.currentBooking
                        ? <div><p className="text-white text-xs">{table.currentBooking.guest}</p><p className="text-gray-500 text-xs">{table.currentBooking.time}</p></div>
                        : <span className="text-gray-600 text-xs">—</span>
                      }
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => setShowDetail(table)} className="px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 rounded-lg text-xs font-medium transition-all">View</button>
                        <button onClick={() => handleEdit(table)} className="px-3 py-1.5 bg-green-600/20 hover:bg-green-600/40 text-green-400 rounded-lg text-xs font-medium transition-all">Edit</button>
                        <button onClick={() => setShowDelete(table.id)} className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg text-xs font-medium transition-all">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetail && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white font-mono">Table {showDetail.id}</h2>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[showDetail.status]?.style}`}>{showDetail.status}</span>
            </div>
            <div className="flex justify-center my-4">
              <TableShape shape={showDetail.shape} status={showDetail.status} />
            </div>
            <div className="space-y-3">
              {[
                { label:"Location",  value: showDetail.location },
                { label:"Capacity",  value: `${showDetail.capacity} guests` },
                { label:"Shape",     value: showDetail.shape.charAt(0).toUpperCase() + showDetail.shape.slice(1) },
                { label:"Features",  value: showDetail.features.join(", ") || "—" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between py-2 border-b border-gray-700/50">
                  <span className="text-gray-400 text-sm">{label}</span>
                  <span className="text-white text-sm font-medium">{value}</span>
                </div>
              ))}
              {showDetail.currentBooking && (
                <div className="mt-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                  <p className="text-yellow-400 text-xs font-medium mb-1">Current Booking</p>
                  <p className="text-white text-sm">{showDetail.currentBooking.guest}</p>
                  <p className="text-gray-400 text-xs">{showDetail.currentBooking.date} · {showDetail.currentBooking.time}</p>
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowDetail(null)}
                className="flex-1 py-2.5 rounded-lg border border-gray-600 text-gray-400 hover:bg-gray-700 text-sm font-medium transition-all">Close</button>
              <button onClick={() => { setShowDetail(null); handleEdit(showDetail); }}
                className="flex-1 py-2.5 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black font-semibold text-sm transition-all">Edit Table</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEdit && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-5">Edit Table {editForm.id}</h2>
            <div className="space-y-4">
              {[
                { label:"Capacity", key:"capacity", type:"number" },
                { label:"Features (comma separated)", key:"featuresStr", type:"text", placeholder:"AC, Window View, Private" },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label className="text-gray-400 text-sm block mb-1">{label}</label>
                  <input type={type} value={editForm[key]} onChange={(e) => setEditForm({ ...editForm, [key]: e.target.value })}
                    placeholder={placeholder}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-600" />
                </div>
              ))}
              {[
                { label:"Location", key:"location", options:["Main Hall","Garden Area","Rooftop"] },
                { label:"Status",   key:"status",   options:["Available","Occupied","Reserved","Maintenance"] },
                { label:"Shape",    key:"shape",    options:["round","square","rect"] },
              ].map(({ label, key, options }) => (
                <div key={key}>
                  <label className="text-gray-400 text-sm block mb-1">{label}</label>
                  <select value={editForm[key]} onChange={(e) => setEditForm({ ...editForm, [key]: e.target.value })}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2.5 text-sm outline-none border border-gray-600 focus:ring-2 focus:ring-yellow-500">
                    {options.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowEdit(null)}
                className="flex-1 py-2.5 rounded-lg border border-gray-600 text-gray-400 hover:bg-gray-700 text-sm font-medium transition-all">Cancel</button>
              <button onClick={handleSaveEdit}
                className="flex-1 py-2.5 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black font-semibold text-sm transition-all">Save Changes</button>
            </div>
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
            <h2 className="text-lg font-bold text-white mb-2">Delete Table {showDelete}?</h2>
            <p className="text-gray-400 text-sm mb-6">This table will be permanently removed from the system.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowDelete(null)}
                className="flex-1 py-2.5 rounded-lg border border-gray-600 text-gray-400 hover:bg-gray-700 text-sm font-medium transition-all">Cancel</button>
              <button onClick={() => { setTables((p) => p.filter((t) => t.id !== showDelete)); setShowDelete(null); }}
                className="flex-1 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold text-sm transition-all">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Table Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-5">Add New Table</h2>
            <div className="space-y-4">
              {[
                { label:"Table ID",  key:"id",       type:"text",   placeholder:"e.g. T-13" },
                { label:"Capacity",  key:"capacity",  type:"number", placeholder:"Number of guests" },
                { label:"Features (comma separated)", key:"features", type:"text", placeholder:"AC, Window View" },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label className="text-gray-400 text-sm block mb-1">{label}</label>
                  <input type={type} value={addForm[key]} onChange={(e) => setAddForm({ ...addForm, [key]: e.target.value })}
                    placeholder={placeholder}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-600" />
                </div>
              ))}
              {[
                { label:"Location", key:"location", options:["Main Hall","Garden Area","Rooftop"] },
                { label:"Shape",    key:"shape",    options:["round","square","rect"] },
              ].map(({ label, key, options }) => (
                <div key={key}>
                  <label className="text-gray-400 text-sm block mb-1">{label}</label>
                  <select value={addForm[key]} onChange={(e) => setAddForm({ ...addForm, [key]: e.target.value })}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2.5 text-sm outline-none border border-gray-600 focus:ring-2 focus:ring-yellow-500">
                    {options.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAdd(false)}
                className="flex-1 py-2.5 rounded-lg border border-gray-600 text-gray-400 hover:bg-gray-700 text-sm font-medium transition-all">Cancel</button>
              <button onClick={handleAdd}
                className="flex-1 py-2.5 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black font-semibold text-sm transition-all">Add Table</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}