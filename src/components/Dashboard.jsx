import { useEffect, useState } from 'react';
import { FaUsers, FaGlobe, FaUtensils, FaList, FaMoneyBill, FaImages } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import { getDashboard } from '../services/dashboardService';
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
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await getDashboard(); // Your API call
      if (response) {
        setDashboardData(response);
      }
      console.log("Dashboard Dataaaa:", response);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return <p className="p-6 text-gray-600">Loading dashboard...</p>;
  }

  if (!dashboardData) {
    return <p className="p-6 text-gray-600">No dashboard data available.</p>;
  }

  // Build dataCount dynamically from API response
  const dataCount = [
    { title: 'Categories', count: dashboardData.counts.categories, icon: <FaList />, color: 'bg-purple-500' },
    { title: 'Cuisines', count: dashboardData.counts.cuisines, icon: <FaUsers />, color: 'bg-blue-500' },
    { title: 'Countries', count: dashboardData.counts.countries, icon: <FaGlobe />, color: 'bg-green-500' },
    { title: 'Restaurants', count: dashboardData.counts.restaurants, icon: <FaUtensils />, color: 'bg-yellow-500' },
    { title: 'Currencies', count: dashboardData.counts.currency, icon: <FaMoneyBill />, color: 'bg-red-500' },
    { title: 'Special Offers', count: dashboardData.counts.sliders, icon: <FaImages />, color: 'bg-indigo-500' },
  ];

  // Chart Data
  const chartData = {
    labels: dataCount.map(item => item.title),
    datasets: [
      {
        label: 'Total Count',
        data: dataCount.map(item => item.count),
        backgroundColor: [
          'rgba(168, 85, 247, 0.7)',  // purple
          'rgba(59, 130, 246, 0.7)',  // blue
          'rgba(34, 197, 94, 0.7)',   // green
          'rgba(234, 179, 8, 0.7)',   // yellow
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
      legend: { position: 'top' },
      title: { display: true, text: 'Statistics Overview' },
    },
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
      
      {/* dataCount Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dataCount.map((stat, index) => (
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
    </div>
  );
};

export default Dashboard;