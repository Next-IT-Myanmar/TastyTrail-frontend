import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { FaHome, FaBuffer, FaFunnelDollar , FaPalette ,  FaUtensils, FaFlag, FaSignOutAlt , FaCog, FaBars, FaTimes, FaUser } from 'react-icons/fa';
import logo from '../assets/images/origin_logo.png';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { icon: <FaHome />, label: 'Dashboard', path: '/admin' },
    { icon: <FaBuffer />, label: 'Categories', path: '/admin/categories' },
    { icon: <FaFlag />, label: 'Countries', path: '/admin/countries' },
    { icon: <FaUtensils />, label: 'Restaurants', path: '/admin/restaurants' },
    { icon: <FaFunnelDollar />, label: 'Currencies', path: '/admin/currencies' },
    { icon: < FaPalette/>, label: 'Sliders', path: '/admin/sliders' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 h-screen w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}>
        {/* Logo */}
        <div className="flex items-center gap-2 p-4 border-b">
          <img src={logo} alt="Logo" className="w-8 h-8" />
          <span className="text-xl font-bold text-red-700">MM Tasty Trail</span>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.path}
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-yellow-50 rounded-lg transition-colors"
            >
              <span className="text-[#f99109]">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="md:ml-64 min-h-screen flex flex-col">
        {/* Top Bar */}
        {/* const handleLogout = () => {
        // Clear authentication token from localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        
        // Clear any other user-related data
        sessionStorage.clear();
        
        // Show logout success message (optional)
        alert('Successfully logged out');
        
        // Redirect to home page
        navigate('/');
        }; */}
        
        // Update the header section
                <header className="bg-white shadow-sm fixed right-0 md:right-0 md:left-64 left-0 top-0 z-30">
                  <div className="flex items-center justify-between p-5">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="md:hidden text-gray-500 hover:text-gray-700"
                      >
                        {sidebarOpen ? <FaTimes /> : <FaBars />}
                      </button>
                      <div className="hidden sm:flex items-center gap-2 text-gray-700">
                        <FaUser className="text-gray-500" />
                        <span className="font-medium">Admin Name</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => window.location.href = '/admin/settings'}
                        className="flex items-center gap-2 text-gray-600 hover:text-[#f99109]"
                        title="Settings"
                      >
                        <FaCog />
                        <span className="hidden sm:inline">Settings</span>
                      </button>
                      <button
                        // onClick={handleLogout}
                        className="flex items-center gap-2 text-gray-600 hover:text-[#f99109]"
                        title="Logout"
                      >
                        <FaSignOutAlt />
                        <span className="hidden sm:inline">Logout</span>
                      </button>
                    </div>
                  </div>
                </header>

        {/* Add padding to prevent content from hiding under fixed header */}
        <main className="p-4 mt-[72px]">
          <Outlet />
        </main>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminLayout;