import { motion } from "framer-motion";

const Analytics = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Analytics</h2>

      {/*  Top Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">

        <div className="bg-blue-500 text-white p-5 rounded-lg shadow">
          Total Bookings
          <p className="text-xl font-bold">120</p>
        </div>

        <div className="bg-green-500 text-white p-5 rounded-lg shadow">
          Revenue
          <p className="text-xl font-bold">₹5000</p>
        </div>

        <div className="bg-yellow-400 text-black p-5 rounded-lg shadow">
          Active Users
          <p className="text-xl font-bold">50</p>
        </div>

      </div>

      {/*  Sales Chart (UI placeholder) */}
      <div className="bg-gray-100 p-6 rounded-lg shadow mb-6">
        <h3 className="mb-4 font-semibold">Sales Trend</h3>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="h-40 flex items-center justify-center text-gray-500"
        >
          Chart will be added here
        </motion.div>
      </div>

      {/*  Table */}
      <div className="bg-gray-100 p-4 rounded-lg shadow">
        <h3 className="mb-3 font-semibold">Top Customers</h3>

        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-600 text-sm">
              <th>Name</th>
              <th>Orders</th>
              <th>Spent</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              <td>Rajib</td>
              <td>5</td>
              <td>₹1500</td>
            </tr>

            <tr className="border-t">
              <td>Amit</td>
              <td>3</td>
              <td>₹900</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Analytics;