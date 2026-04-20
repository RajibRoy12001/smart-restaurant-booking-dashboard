import { useState, useEffect } from "react";

const stats = [
  { label: "Total Bookings", value: 248, change: "+12%", up: true,  color: "from-blue-600 to-blue-400",    icon: "📅", bg: "bg-blue-500/10",  border: "border-blue-500/20" },
  { label: "Active Users",   value: 84,  change: "+5%",  up: true,  color: "from-yellow-500 to-yellow-300", icon: "👥", bg: "bg-yellow-500/10",border: "border-yellow-500/20" },
  { label: "Revenue",        value: "₹52,400", change: "+18%", up: true, color: "from-green-500 to-emerald-400", icon: "💰", bg: "bg-green-500/10", border: "border-green-500/20" },
  { label: "Orders Today",   value: 36,  change: "-3%",  up: false, color: "from-purple-500 to-purple-400", icon: "🍽️", bg: "bg-purple-500/10", border: "border-purple-500/20" },
];

const recentBookings = [
  { id: "BK042", name: "Priya Singh",  avatar: "PS", table: "T-07", location: "Rooftop",     time: "7:30 PM", guests: 6, status: "Confirmed", amount: 1500, color: "bg-purple-600" },
  { id: "BK041", name: "Vikram Rao",   avatar: "VR", table: "T-05", location: "Rooftop",     time: "6:00 PM", guests: 4, status: "Pending",   amount: 950,  color: "bg-teal-600" },
  { id: "BK040", name: "Sneha Roy",    avatar: "SR", table: "T-09", location: "Garden Area", time: "8:00 PM", guests: 5, status: "Confirmed", amount: 2000, color: "bg-red-600" },
  { id: "BK039", name: "Amit Patel",   avatar: "AP", table: "T-03", location: "Main Hall",   time: "9:00 PM", guests: 2, status: "Cancelled", amount: 600,  color: "bg-orange-600" },
  { id: "BK038", name: "Meera Joshi",  avatar: "MJ", table: "T-08", location: "Garden Area", time: "7:00 PM", guests: 7, status: "Confirmed", amount: 1800, color: "bg-pink-600" },
];

const topCustomers = [
  { name: "Priya Singh",  avatar: "PS", visits: 9,  spent: 14500, color: "bg-purple-600" },
  { name: "Sneha Roy",    avatar: "SR", visits: 7,  spent: 11200, color: "bg-red-600" },
  { name: "Vikram Rao",   avatar: "VR", visits: 6,  spent: 7900,  color: "bg-teal-600" },
  { name: "Neha Ghosh",   avatar: "NG", visits: 4,  spent: 4800,  color: "bg-pink-600" },
];

const tableStatus = [
  { id: "T-01", status: "Available",  location: "Main Hall" },
  { id: "T-02", status: "Occupied",   location: "Main Hall" },
  { id: "T-03", status: "Available",  location: "Garden" },
  { id: "T-04", status: "Reserved",   location: "Main Hall" },
  { id: "T-05", status: "Available",  location: "Rooftop" },
  { id: "T-06", status: "Available",  location: "Main Hall" },
  { id: "T-07", status: "Reserved",   location: "Rooftop" },
  { id: "T-08", status: "Occupied",   location: "Garden" },
  { id: "T-09", status: "Available",  location: "Rooftop" },
  { id: "T-10", status: "Maintenance",location: "Garden" },
  { id: "T-11", status: "Available",  location: "Main Hall" },
  { id: "T-12", status: "Available",  location: "Rooftop" },
];

const weeklyData = [
  { day: "Mon", bookings: 18, revenue: 7200  },
  { day: "Tue", bookings: 24, revenue: 9600  },
  { day: "Wed", bookings: 20, revenue: 8000  },
  { day: "Thu", bookings: 31, revenue: 12400 },
  { day: "Fri", bookings: 42, revenue: 16800 },
  { day: "Sat", bookings: 58, revenue: 23200 },
  { day: "Sun", bookings: 45, revenue: 18000 },
];

const notifications = [
  { icon: "✓", text: "New booking from Chand Kumar", time: "2 min ago",   color: "text-green-400 bg-green-500/10" },
  { icon: "₹", text: "Payment received ₹2,000",      time: "15 min ago",  color: "text-blue-400 bg-blue-500/10" },
  { icon: "✕", text: "Booking BK039 was cancelled",  time: "1 hr ago",    color: "text-red-400 bg-red-500/10" },
  { icon: "👥", text: "New user Meera Joshi registered", time: "2 hrs ago", color: "text-yellow-400 bg-yellow-500/10" },
];

const statusConfig = {
  Confirmed:   { style: "bg-green-500/20 text-green-400",  dot: "bg-green-400" },
  Pending:     { style: "bg-yellow-500/20 text-yellow-400", dot: "bg-yellow-400" },
  Cancelled:   { style: "bg-red-500/20 text-red-400",       dot: "bg-red-400" },
};

const tableStatusColor = {
  Available:   "bg-green-500",
  Occupied:    "bg-red-500",
  Reserved:    "bg-yellow-500",
  Maintenance: "bg-gray-500",
};

function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(0);
  const isString = typeof value === "string";
  useEffect(() => {
    if (isString) return;
    let start = 0;
    const end = value;
    const duration = 1200;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setDisplay(end); clearInterval(timer); }
      else setDisplay(start);
    }, 16);
    return () => clearInterval(timer);
  }, [value, isString]);
  return <span>{isString ? value : display.toLocaleString()}</span>;
}

const maxRevenue = Math.max(...weeklyData.map((d) => d.revenue));
const maxBookings = Math.max(...weeklyData.map((d) => d.bookings));

export default function AdminDashboard() {
  const [chartMode, setChartMode] = useState("revenue");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const timeStr = currentTime.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const dateStr = currentTime.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const available   = tableStatus.filter((t) => t.status === "Available").length;
  const occupied    = tableStatus.filter((t) => t.status === "Occupied").length;
  const reserved    = tableStatus.filter((t) => t.status === "Reserved").length;
  const maintenance = tableStatus.filter((t) => t.status === "Maintenance").length;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 space-y-6">

      {/* ── TOP HEADER ── */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-gray-400 text-sm">Welcome back,</p>
          <h1 className="text-3xl font-bold text-white tracking-tight">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">{dateStr}</p>
        </div>
        {/* Live clock */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl px-5 py-3 text-right">
          <p className="text-yellow-400 text-2xl font-mono font-bold tracking-widest">{timeStr}</p>
          <p className="text-gray-500 text-xs mt-0.5">AKANTE Restaurant · Live</p>
        </div>
      </div>

      {/* ── STAT CARDS ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i}
            className={`relative overflow-hidden rounded-2xl p-5 border ${s.border} ${s.bg} group hover:scale-[1.02] transition-transform duration-200`}>
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl">{s.icon}</span>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${s.up ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                {s.up ? "↑" : "↓"} {s.change}
              </span>
            </div>
            <p className={`text-3xl font-bold bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>
              <AnimatedNumber value={s.value} />
            </p>
            <p className="text-gray-400 text-sm mt-1">{s.label}</p>
            {/* decorative ring */}
            <div className={`absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-r ${s.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
          </div>
        ))}
      </div>

      {/* ── CHARTS + NOTIFICATIONS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Weekly Bar Chart */}
        <div className="lg:col-span-2 bg-gray-800 rounded-2xl p-5 border border-gray-700">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-white font-bold text-lg">Weekly Overview</h2>
              <p className="text-gray-400 text-xs mt-0.5">Bookings & revenue this week</p>
            </div>
            <div className="flex bg-gray-700 rounded-lg p-1 gap-1">
              {["revenue","bookings"].map((m) => (
                <button key={m} onClick={() => setChartMode(m)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all ${chartMode === m ? "bg-yellow-500 text-black" : "text-gray-400 hover:text-white"}`}>
                  {m}
                </button>
              ))}
            </div>
          </div>
          {/* Bars */}
          <div className="flex items-end gap-3 h-44">
            {weeklyData.map((d, i) => {
              const pct = chartMode === "revenue"
                ? (d.revenue / maxRevenue) * 100
                : (d.bookings / maxBookings) * 100;
              const isWeekend = i >= 4;
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="relative w-full flex items-end justify-center" style={{ height: "140px" }}>
                    {/* Tooltip */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      {chartMode === "revenue" ? `₹${d.revenue.toLocaleString()}` : `${d.bookings} bookings`}
                    </div>
                    <div
                      className={`w-full rounded-t-lg transition-all duration-500 ${isWeekend ? "bg-gradient-to-t from-yellow-600 to-yellow-400" : "bg-gradient-to-t from-blue-700 to-blue-400"}`}
                      style={{ height: `${pct}%`, minHeight: "8px" }}
                    />
                  </div>
                  <span className={`text-xs font-medium ${isWeekend ? "text-yellow-400" : "text-gray-400"}`}>{d.day}</span>
                </div>
              );
            })}
          </div>
          {/* Legend */}
          <div className="flex gap-4 mt-4 pt-4 border-t border-gray-700">
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-blue-500" /><span className="text-gray-400 text-xs">Weekdays</span></div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-yellow-500" /><span className="text-gray-400 text-xs">Weekends</span></div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-bold text-lg">Recent Alerts</h2>
            <span className="w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">{notifications.length}</span>
          </div>
          <div className="space-y-3">
            {notifications.map((n, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-gray-700/40 hover:bg-gray-700 transition-colors">
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${n.color}`}>
                  {n.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-medium leading-snug">{n.text}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 rounded-xl border border-gray-600 text-gray-400 hover:bg-gray-700 text-xs font-medium transition-all">
            View All Notifications
          </button>
        </div>
      </div>

      {/* ── TABLE STATUS + TOP CUSTOMERS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Table Overview */}
        <div className="lg:col-span-2 bg-gray-800 rounded-2xl p-5 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-white font-bold text-lg">Table Status</h2>
              <p className="text-gray-400 text-xs mt-0.5">Real-time floor overview</p>
            </div>
            <div className="flex gap-3 text-xs">
              {[
                { label:"Free",  count: available,   color:"bg-green-500" },
                { label:"Busy",  count: occupied,    color:"bg-red-500" },
                { label:"Res.",  count: reserved,    color:"bg-yellow-500" },
                { label:"Maint.",count: maintenance, color:"bg-gray-500" },
              ].map(({ label, count, color }) => (
                <div key={label} className="flex items-center gap-1">
                  <span className={`w-2 h-2 rounded-full ${color}`} />
                  <span className="text-gray-400">{label} <span className="text-white font-medium">{count}</span></span>
                </div>
              ))}
            </div>
          </div>
          {/* Grid of tables */}
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {tableStatus.map((t) => (
              <div key={t.id}
                className="relative rounded-xl border border-gray-700 bg-gray-700/40 p-3 flex flex-col items-center gap-1.5 hover:bg-gray-700 transition-colors group cursor-pointer">
                {/* Table shape icon */}
                <div className={`w-8 h-8 rounded-lg ${tableStatusColor[t.status]} flex items-center justify-center`}>
                  <span className="text-white text-xs font-bold">{t.id.split("-")[1]}</span>
                </div>
                <span className="text-gray-300 text-xs font-mono">{t.id}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${tableStatusColor[t.status]}`} />
                {/* Hover tooltip */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-700 border border-gray-600 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  {t.status} · {t.location}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Customers */}
        <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700">
          <h2 className="text-white font-bold text-lg mb-4">Top Customers</h2>
          <div className="space-y-3">
            {topCustomers.map((c, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-700/40 hover:bg-gray-700 transition-colors">
                <span className="text-gray-600 text-sm font-bold w-4">{i + 1}</span>
                <div className={`w-9 h-9 rounded-full ${c.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                  {c.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{c.name}</p>
                  <p className="text-gray-500 text-xs">{c.visits} visits</p>
                </div>
                <div className="text-right">
                  <p className="text-yellow-400 text-sm font-bold">₹{(c.spent / 1000).toFixed(1)}k</p>
                </div>
              </div>
            ))}
          </div>
          {/* Spend bar chart mini */}
          <div className="mt-4 pt-4 border-t border-gray-700 space-y-2">
            {topCustomers.map((c, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-gray-500 text-xs w-16 truncate">{c.name.split(" ")[0]}</span>
                <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${(c.spent / 14500) * 100}%` }} />
                </div>
                <span className="text-gray-400 text-xs w-10 text-right">₹{(c.spent / 1000).toFixed(0)}k</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RECENT BOOKINGS ── */}
      <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-700">
          <div>
            <h2 className="text-white font-bold text-lg">Recent Bookings</h2>
            <p className="text-gray-400 text-xs mt-0.5">Latest 5 reservations</p>
          </div>
          <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold text-xs rounded-lg transition-all">
            View All →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 text-left text-xs border-b border-gray-700/50">
                <th className="px-5 py-3 font-medium">Booking</th>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Table</th>
                <th className="px-5 py-3 font-medium">Location</th>
                <th className="px-5 py-3 font-medium">Time</th>
                <th className="px-5 py-3 font-medium">Guests</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((b) => (
                <tr key={b.id} className="border-b border-gray-700/30 hover:bg-gray-700/30 transition-colors">
                  <td className="px-5 py-3">
                    <span className="font-mono text-yellow-400 text-xs bg-yellow-500/10 px-2 py-1 rounded">{b.id}</span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-full ${b.color} flex items-center justify-center text-white text-xs font-bold`}>{b.avatar}</div>
                      <span className="text-white font-medium text-sm">{b.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-gray-300 bg-gray-700 px-2 py-1 rounded text-xs font-mono">{b.table}</span>
                  </td>
                  <td className="px-5 py-3 text-gray-300 text-sm">{b.location}</td>
                  <td className="px-5 py-3 text-gray-300 text-sm">{b.time}</td>
                  <td className="px-5 py-3 text-white text-sm">👥 {b.guests}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 w-fit ${statusConfig[b.status]?.style}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[b.status]?.dot}`} />
                      {b.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <span className="text-white font-semibold">₹{b.amount.toLocaleString()}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}