import { useState } from "react";
import {
  FiHome,
  FiClock,
  FiCalendar,
  FiBell,
  FiSliders
} from "react-icons/fi";

const initialSettings = {
  restaurant: {
    name: "AKANTE Cafe & Restaurant",
    email: "contact@akante.com",
    phone: "+91 98765 43210",
    address: "12 Park Street, Kolkata, West Bengal 700016",
    website: "www.akante.com",
    description: "A premium dining experience in the heart of the city.",
  },
  hours: {
    monday:    { open: "11:00", close: "23:00", closed: false },
    tuesday:   { open: "11:00", close: "23:00", closed: false },
    wednesday: { open: "11:00", close: "23:00", closed: false },
    thursday:  { open: "11:00", close: "23:00", closed: false },
    friday:    { open: "11:00", close: "00:00", closed: false },
    saturday:  { open: "10:00", close: "00:00", closed: false },
    sunday:    { open: "10:00", close: "22:00", closed: false },
  },
  reservation: {
    maxGuests: 20,
    minGuests: 1,
    advanceBookingDays: 30,
    slotDuration: 60,
    autoConfirm: true,
    requirePhone: true,
    requirePayment: false,
    cancellationHours: 24,
  },
  notifications: {
    emailBookingConfirm: true,
    emailReminder: true,
    smsReminder: false,
    pushAlerts: true,
    reminderHoursBefore: 2,
    adminEmailAlerts: true,
  },
  appearance: {
    primaryColor: "#EAB308",
    timezone: "Asia/Kolkata",
    currency: "INR",
    dateFormat: "DD MMM YYYY",
    language: "English",
  },
};

const sectionTabs = [
  { key: "restaurant",   label: "Restaurant",   icon: FiHome },
  { key: "hours",        label: "Opening Hours", icon: FiClock },
  { key: "reservation",  label: "Reservations",  icon:  FiCalendar },
  { key: "notifications",label: "Notifications", icon: FiBell },
  { key: "appearance",   label: "Appearance",    icon: FiSliders  },
];

const days = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-all duration-300 flex-shrink-0 ${checked ? "bg-yellow-500" : "bg-gray-600"}`}
    >
      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${checked ? "left-5.5 translate-x-0.5" : "left-0.5"}`} style={{ left: checked ? "22px" : "2px" }} />
    </button>
  );
}

function InputField({ label, value, onChange, type = "text", placeholder = "" }) {
  return (
    <div>
      <label className="text-gray-400 text-sm block mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-gray-700 text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-600"
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <div>
      <label className="text-gray-400 text-sm block mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-700 text-white rounded-lg px-4 py-2.5 text-sm outline-none border border-gray-600 focus:ring-2 focus:ring-yellow-500"
      >
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

function SettingRow({ label, description, children }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-700/50">
      <div className="flex-1 pr-6">
        <p className="text-white text-sm font-medium">{label}</p>
        {description && <p className="text-gray-500 text-xs mt-0.5">{description}</p>}
      </div>
      {children}
    </div>
  );
}

export default function Settings() {
  const [settings, setSettings] = useState(initialSettings);
  const [activeTab, setActiveTab] = useState("restaurant");
  const [saved, setSaved] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const update = (section, key, value) => {
    setSettings((prev) => ({ ...prev, [section]: { ...prev[section], [key]: value } }));
  };

  const updateHours = (day, field, value) => {
    setSettings((prev) => ({
      ...prev,
      hours: { ...prev.hours, [day]: { ...prev.hours[day], [field]: value } },
    }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    setSettings(initialSettings);
    setShowResetConfirm(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-gray-400 text-sm mt-1">Configure your restaurant preferences and system settings</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowResetConfirm(true)}
            className="px-4 py-2 rounded-lg border border-gray-600 text-gray-400 hover:bg-gray-700 text-sm font-medium transition-all"
          >
            Reset
          </button>
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
              saved ? "bg-green-500 text-white" : "bg-yellow-500 hover:bg-yellow-400 text-black"
            }`}
          >
            {saved ? "✓ Saved!" : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="flex gap-6">

        {/* Sidebar Tabs */}
        <div className="w-52 flex-shrink-0">
          <div className="bg-gray-800 rounded-xl p-2 space-y-1">
           {sectionTabs.map((tab) => {
  const Icon = tab.icon;

  return (
    <button
      key={tab.key}
      onClick={() => setActiveTab(tab.key)}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
        activeTab === tab.key
          ? "bg-yellow-500 text-black"
          : "text-gray-400 hover:text-white hover:bg-gray-700"
      }`}
    >
      <Icon className="text-base" />
      {tab.label}
    </button>
  );
})}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-gray-800 rounded-xl p-6">

          {/* Restaurant Info */}
          {activeTab === "restaurant" && (
            <div>
              <h2 className="text-lg font-bold text-white mb-1">Restaurant Information</h2>
              <p className="text-gray-400 text-sm mb-6">Basic details about your restaurant</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField label="Restaurant Name" value={settings.restaurant.name} onChange={(v) => update("restaurant","name",v)} />
                <InputField label="Email Address" value={settings.restaurant.email} onChange={(v) => update("restaurant","email",v)} type="email" />
                <InputField label="Phone Number" value={settings.restaurant.phone} onChange={(v) => update("restaurant","phone",v)} />
                <InputField label="Website" value={settings.restaurant.website} onChange={(v) => update("restaurant","website",v)} />
                <div className="md:col-span-2">
                  <InputField label="Address" value={settings.restaurant.address} onChange={(v) => update("restaurant","address",v)} />
                </div>
                <div className="md:col-span-2">
                  <label className="text-gray-400 text-sm block mb-1">Description</label>
                  <textarea
                    value={settings.restaurant.description}
                    onChange={(e) => update("restaurant","description",e.target.value)}
                    rows={3}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-600 resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Opening Hours */}
          {activeTab === "hours" && (
            <div>
              <h2 className="text-lg font-bold text-white mb-1">Opening Hours</h2>
              <p className="text-gray-400 text-sm mb-6">Set your restaurant's weekly schedule</p>
              <div className="space-y-3">
                {days.map((day) => {
                  const h = settings.hours[day];
                  return (
                    <div key={day} className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${h.closed ? "border-gray-700/30 bg-gray-700/20 opacity-60" : "border-gray-700 bg-gray-700/30"}`}>
                      <div className="w-24 flex-shrink-0">
                        <p className="text-white text-sm font-medium capitalize">{day}</p>
                      </div>
                      <div className="flex items-center gap-3 flex-1">
                        <div>
                          <label className="text-gray-500 text-xs block mb-1">Open</label>
                          <input
                            type="time"
                            value={h.open}
                            disabled={h.closed}
                            onChange={(e) => updateHours(day,"open",e.target.value)}
                            className="bg-gray-600 text-white rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-500 disabled:opacity-40"
                          />
                        </div>
                        <span className="text-gray-600 mt-4">—</span>
                        <div>
                          <label className="text-gray-500 text-xs block mb-1">Close</label>
                          <input
                            type="time"
                            value={h.close}
                            disabled={h.closed}
                            onChange={(e) => updateHours(day,"close",e.target.value)}
                            className="bg-gray-600 text-white rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-500 disabled:opacity-40"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-gray-400 text-xs">Closed</span>
                        <Toggle checked={h.closed} onChange={(v) => updateHours(day,"closed",v)} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Reservation Settings */}
          {activeTab === "reservation" && (
            <div>
              <h2 className="text-lg font-bold text-white mb-1">Reservation Settings</h2>
              <p className="text-gray-400 text-sm mb-6">Control how bookings are handled</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                <InputField label="Min Guests per Booking" value={settings.reservation.minGuests} onChange={(v) => update("reservation","minGuests",Number(v))} type="number" />
                <InputField label="Max Guests per Booking" value={settings.reservation.maxGuests} onChange={(v) => update("reservation","maxGuests",Number(v))} type="number" />
                <InputField label="Advance Booking (days)" value={settings.reservation.advanceBookingDays} onChange={(v) => update("reservation","advanceBookingDays",Number(v))} type="number" />
                <InputField label="Slot Duration (minutes)" value={settings.reservation.slotDuration} onChange={(v) => update("reservation","slotDuration",Number(v))} type="number" />
                <InputField label="Free Cancellation (hours before)" value={settings.reservation.cancellationHours} onChange={(v) => update("reservation","cancellationHours",Number(v))} type="number" />
              </div>
              <div className="space-y-0 border border-gray-700 rounded-xl px-5 divide-y divide-gray-700/50">
                <SettingRow label="Auto-confirm Bookings" description="Automatically confirm new reservations without manual approval">
                  <Toggle checked={settings.reservation.autoConfirm} onChange={(v) => update("reservation","autoConfirm",v)} />
                </SettingRow>
                <SettingRow label="Require Phone Number" description="Make phone number mandatory during reservation">
                  <Toggle checked={settings.reservation.requirePhone} onChange={(v) => update("reservation","requirePhone",v)} />
                </SettingRow>
                <SettingRow label="Require Payment Upfront" description="Collect payment at the time of booking">
                  <Toggle checked={settings.reservation.requirePayment} onChange={(v) => update("reservation","requirePayment",v)} />
                </SettingRow>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === "notifications" && (
            <div>
              <h2 className="text-lg font-bold text-white mb-1">Notification Settings</h2>
              <p className="text-gray-400 text-sm mb-6">Manage how users and admins receive alerts</p>
              <div className="border border-gray-700 rounded-xl px-5 divide-y divide-gray-700/50 mb-6">
                <SettingRow label="Email — Booking Confirmation" description="Send email when a booking is confirmed">
                  <Toggle checked={settings.notifications.emailBookingConfirm} onChange={(v) => update("notifications","emailBookingConfirm",v)} />
                </SettingRow>
                <SettingRow label="Email — Reservation Reminder" description="Send reminder email before the booking">
                  <Toggle checked={settings.notifications.emailReminder} onChange={(v) => update("notifications","emailReminder",v)} />
                </SettingRow>
                <SettingRow label="SMS Reminder" description="Send SMS reminder to users before reservation">
                  <Toggle checked={settings.notifications.smsReminder} onChange={(v) => update("notifications","smsReminder",v)} />
                </SettingRow>
                <SettingRow label="Push Notifications" description="Send app push notifications for updates">
                  <Toggle checked={settings.notifications.pushAlerts} onChange={(v) => update("notifications","pushAlerts",v)} />
                </SettingRow>
                <SettingRow label="Admin Email Alerts" description="Notify admin when new bookings arrive">
                  <Toggle checked={settings.notifications.adminEmailAlerts} onChange={(v) => update("notifications","adminEmailAlerts",v)} />
                </SettingRow>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField
                  label="Reminder Hours Before Booking"
                  value={settings.notifications.reminderHoursBefore}
                  onChange={(v) => update("notifications","reminderHoursBefore",Number(v))}
                  type="number"
                />
              </div>
            </div>
          )}

          {/* Appearance */}
          {activeTab === "appearance" && (
            <div>
              <h2 className="text-lg font-bold text-white mb-1">Appearance & Locale</h2>
              <p className="text-gray-400 text-sm mb-6">Customize display preferences and regional settings</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-gray-400 text-sm block mb-1">Primary Accent Color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={settings.appearance.primaryColor}
                      onChange={(e) => update("appearance","primaryColor",e.target.value)}
                      className="w-12 h-10 rounded-lg border border-gray-600 bg-gray-700 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settings.appearance.primaryColor}
                      onChange={(e) => update("appearance","primaryColor",e.target.value)}
                      className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-600 font-mono"
                    />
                  </div>
                </div>
                <SelectField
                  label="Currency"
                  value={settings.appearance.currency}
                  onChange={(v) => update("appearance","currency",v)}
                  options={["INR","USD","EUR","GBP","AED"]}
                />
                <SelectField
                  label="Timezone"
                  value={settings.appearance.timezone}
                  onChange={(v) => update("appearance","timezone",v)}
                  options={["Asia/Kolkata","Asia/Dubai","Europe/London","America/New_York","America/Los_Angeles"]}
                />
                <SelectField
                  label="Date Format"
                  value={settings.appearance.dateFormat}
                  onChange={(v) => update("appearance","dateFormat",v)}
                  options={["DD MMM YYYY","MM/DD/YYYY","YYYY-MM-DD","DD/MM/YYYY"]}
                />
                <SelectField
                  label="Language"
                  value={settings.appearance.language}
                  onChange={(v) => update("appearance","language",v)}
                  options={["English","Hindi","Bengali","Tamil","Telugu"]}
                />
              </div>

              {/* Preview */}
              <div className="mt-6 p-4 rounded-xl border border-gray-700 bg-gray-700/30">
                <p className="text-gray-400 text-xs mb-3">Accent Color Preview</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: settings.appearance.primaryColor }} />
                  <button className="px-4 py-2 rounded-lg text-sm font-semibold text-black" style={{ backgroundColor: settings.appearance.primaryColor }}>
                    Sample Button
                  </button>
                  <span className="text-sm font-medium" style={{ color: settings.appearance.primaryColor }}>
                    Active Link
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Reset Confirm Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-sm border border-gray-700 shadow-2xl text-center">
            <div className="w-14 h-14 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-400 text-2xl">↺</span>
            </div>
            <h2 className="text-lg font-bold text-white mb-2">Reset All Settings?</h2>
            <p className="text-gray-400 text-sm mb-6">All settings will be restored to their default values. This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 rounded-lg border border-gray-600 text-gray-400 hover:bg-gray-700 text-sm font-medium transition-all">
                Cancel
              </button>
              <button onClick={handleReset}
                className="flex-1 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold text-sm transition-all">
                Yes, Reset
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}