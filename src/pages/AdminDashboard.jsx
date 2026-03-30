const AdminDashboard = () => {
  return (
    <div>

      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      {/* Top Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">

        <div className="bg-blue-500 text-white p-5 rounded-lg">
          Total Bookings
          <p className="text-xl font-bold">120</p>
        </div>

        <div className="bg-yellow-400 text-black p-5 rounded-lg">
          Active Users
          <p className="text-xl font-bold">50</p>
        </div>

        <div className="bg-green-500 text-white p-5 rounded-lg">
          Revenue
          <p className="text-xl font-bold">₹5000</p>
        </div>

        <div className="bg-purple-500 text-white p-5 rounded-lg">
          Orders
          <p className="text-xl font-bold">80</p>
        </div>

      </div>

      {/* Table */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="mb-3 font-semibold">Recent Bookings</h3>

        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-600 text-sm">
              <th>Name</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              <td>Chand</td>
              <td>25 Mar</td>
              <td className="text-green-500">Completed</td>
            </tr>
          </tbody>
          <tbody>
            <tr className="border-t">
              <td>Alok</td>
              <td>27 Mar</td>
              <td className="text-green-500">Completed</td>
            </tr>
          </tbody>
        </table>

      </div>

    </div>
  );
};

export default AdminDashboard;