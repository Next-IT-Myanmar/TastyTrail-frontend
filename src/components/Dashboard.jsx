import React from 'react';
import { FaUsers, FaGlobe, FaUtensils, FaList, FaMoneyBill, FaImages } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const stats = [
    { title: 'Total Users', count: 1234, icon: <FaUsers />, color: 'bg-blue-500' },
    { title: 'Countries', count: 25, icon: <FaGlobe />, color: 'bg-green-500' },
    { title: 'Restaurants', count: 150, icon: <FaUtensils />, color: 'bg-yellow-500' },
    { title: 'Categories', count: 45, icon: <FaList />, color: 'bg-purple-500' },
    { title: 'Currencies', count: 30, icon: <FaMoneyBill />, color: 'bg-red-500' },
    { title: 'Sliders', count: 10, icon: <FaImages />, color: 'bg-indigo-500' },
  ];

  const chartData = {
    labels: ['Users', 'Countries', 'Restaurants', 'Categories', 'Currencies', 'Sliders'],
    datasets: [
      {
        label: 'Total Count',
        data: stats.map(item => item.count),
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)', // blue
          'rgba(34, 197, 94, 0.7)',  // green
          'rgba(234, 179, 8, 0.7)',   // yellow
          'rgba(168, 85, 247, 0.7)',  // purple
          'rgba(239, 68, 68, 0.7)',   // red
          'rgba(99, 102, 241, 0.7)',  // indigo
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Statistics Overview',
      },
    },
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.count}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-full text-white`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="h-[400px]">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Additional Stats or Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span>New Users Today</span>
              <span className="font-semibold">+24</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>New Restaurants Today</span>
              <span className="font-semibold">+5</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Active Users</span>
              <span className="font-semibold">892</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">System Status</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span>System Uptime</span>
              <span className="text-green-500">99.9%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Response Time</span>
              <span className="text-green-500">124ms</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Last Updated</span>
              <span className="text-gray-500">2 minutes ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;