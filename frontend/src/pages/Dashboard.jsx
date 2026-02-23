import React from 'react';
import useAuth from '../hooks/useAuth';
import { useTheme } from '../context/ThemeContext';

const Dashboard = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
            Welcome, {user?.name}! 👋
          </h1>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Your Hostel Resource Sharing Dashboard
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 hover:shadow-xl transition`}>
            <h3 className="text-4xl font-bold text-blue-600">5</h3>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} font-semibold`}>📤 Items Shared</p>
          </div>

          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 hover:shadow-xl transition`}>
            <h3 className="text-4xl font-bold text-green-600">3</h3>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} font-semibold`}>📥 Items Borrowed</p>
          </div>

          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 hover:shadow-xl transition`}>
            <h3 className="text-4xl font-bold text-yellow-500">{user?.rating || 5}/5</h3>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} font-semibold`}>⭐ Your Rating</p>
          </div>

          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 hover:shadow-xl transition`}>
            <h3 className="text-4xl font-bold text-purple-600">94%</h3>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} font-semibold`}>🏆 Trust Score</p>
          </div>
        </div>

        {/* Actions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Requests */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>🔔 Recent Requests</h2>
            <div className={`border rounded-lg p-4 ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-800'} mb-4`}>Rajesh requested your Data Structures Book</p>
              <div className="flex gap-3">
                <button className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition font-semibold">
                  Approve
                </button>
                <button className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition font-semibold">
                  Reject
                </button>
              </div>
            </div>
          </div>

          {/* Active Borrows */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>📦 Active Borrows</h2>
            <div className={`border rounded-lg p-4 ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-800'} mb-4`}>Physics Lab Kit - Return by Feb 28, 2026</p>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
                Mark as Returned
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
