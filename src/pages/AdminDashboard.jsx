import React from 'react';
import Countries from '../components/Countries';

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Dashboard Stats */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Countries</h3>
          <p className="text-3xl font-bold text-yellow-500">25</p>
        </div>
        {/* Add more stat cards as needed */}
      </div>

      {/* Countries Component */}
      <Countries />
    </div>
  );
};

export default AdminDashboard;