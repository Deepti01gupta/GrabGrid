import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const { isDark } = useTheme();

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 dark:from-gray-800 dark:to-gray-900 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h1 className="font-display text-5xl sm:text-6xl font-bold mb-6 animate-fade-in">
                💎 Welcome to GrabGrid
              </h1>
              <p className="text-2xl font-semibold mb-4 text-blue-100">
                Share Resources, Save Money, Build Community
              </p>
              <p className="text-lg text-blue-50 mb-8 max-w-2xl">
                Stop wasting money on temporary items. Borrow books, lab kits, and appliances
                from your hostel mates at zero cost!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-12">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/items"
                      className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition transform hover:scale-105"
                    >
                      Browse Items →
                    </Link>
                    <Link
                      to="/add-item"
                      className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition"
                    >
                      Share Your Items
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition transform hover:scale-105"
                    >
                      Get Started Now
                    </Link>
                    <Link
                      to="/login"
                      className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition"
                    >
                      Sign In
                    </Link>
                  </>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4 sm:gap-8">
                <div className="text-center">
                  <h3 className="text-3xl sm:text-4xl font-bold">1000+</h3>
                  <p className="text-blue-100 mt-2">Active Users</p>
                </div>
                <div className="text-center">
                  <h3 className="text-3xl sm:text-4xl font-bold">5000+</h3>
                  <p className="text-blue-100 mt-2">Items Shared</p>
                </div>
                <div className="text-center">
                  <h3 className="text-3xl sm:text-4xl font-bold">₹50L+</h3>
                  <p className="text-blue-100 mt-2">Money Saved</p>
                </div>
              </div>
            </div>

            <div className="text-center text-6xl sm:text-8xl animate-float">
              📚 🔬 ⚡ 🏸
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-center text-gray-900 dark:text-white mb-16">
            What Can You Share?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 border-l-4 border-blue-600 dark:border-blue-400">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Books & Notes</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">Textbooks, reference books, course materials for different semesters</p>
              <span className="inline-block bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">1,240+ items</span>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 border-l-4 border-purple-600 dark:border-purple-400">
              <div className="text-5xl mb-4">🔬</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Lab Kits</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">Electronics kits, physics apparatus, chemistry equipment</p>
              <span className="inline-block bg-purple-600 dark:bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold">580+ items</span>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 border-l-4 border-yellow-600 dark:border-yellow-400">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Appliances</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">Kettles, iron, extension boards, lamps, fans, and more</p>
              <span className="inline-block bg-yellow-600 dark:bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-semibold">890+ items</span>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 border-l-4 border-green-600 dark:border-green-400">
              <div className="text-5xl mb-4">🏸</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Sports Gear</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">Badminton rackets, cricket bats, volleyball, and equipment</p>
              <span className="inline-block bg-green-600 dark:bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">420+ items</span>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 border-l-4 border-red-600 dark:border-red-400">
              <div className="text-5xl mb-4">🎮</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Gaming & Video</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">VR headsets, gaming consoles, cameras, projectors</p>
              <span className="inline-block bg-red-600 dark:bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">340+ items</span>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900 dark:to-indigo-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 border-l-4 border-indigo-600 dark:border-indigo-400">
              <div className="text-5xl mb-4">🎧</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Electronics</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">Headphones, speakers, chargers, power banks, adapters</p>
              <span className="inline-block bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-full text-sm font-semibold">1,100+ items</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-center text-gray-900 dark:text-white mb-16">
            How GrabGrid Works?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-700 dark:from-blue-700 dark:to-purple-800 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Register</h3>
              <p className="text-gray-700 dark:text-gray-400">Sign up with your hostel details and create your profile</p>
            </div>

            <div className="hidden md:flex justify-center items-center">
              <span className="text-4xl text-gray-400 dark:text-gray-600">→</span>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-700 dark:from-blue-700 dark:to-purple-800 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Browse</h3>
              <p className="text-gray-700 dark:text-gray-400">Search and filter items available in your hostel block</p>
            </div>

            <div className="hidden md:flex justify-center items-center">
              <span className="text-4xl text-gray-400 dark:text-gray-600">→</span>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-700 dark:from-blue-700 dark:to-purple-800 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Request</h3>
              <p className="text-gray-700 dark:text-gray-400">Send borrow request to item owner and wait for approval</p>
            </div>

            <div className="hidden md:flex justify-center items-center">
              <span className="text-4xl text-gray-400 dark:text-gray-600">→</span>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-700 dark:from-blue-700 dark:to-purple-800 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Use & Return</h3>
              <p className="text-gray-700 dark:text-gray-400">Borrow the item and return it before the deadline</p>
            </div>

            <div className="hidden md:flex justify-center items-center">
              <span className="text-4xl text-gray-400 dark:text-gray-600">→</span>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-700 dark:from-blue-700 dark:to-purple-800 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                5
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Rate</h3>
              <p className="text-gray-700 dark:text-gray-400">Rate each other to build trust and credibility</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-700 dark:from-gray-800 dark:to-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-center mb-16">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white bg-opacity-20 dark:bg-gray-700 dark:bg-opacity-30 backdrop-blur-lg p-8 rounded-xl text-center border border-white border-opacity-30 dark:border-gray-600">
              <h3 className="text-4xl font-bold mb-2">5,000+</h3>
              <p className="text-lg text-blue-100 dark:text-gray-300 mb-3">Items Shared</p>
              <span className="inline-block bg-white bg-opacity-30 dark:bg-gray-600 dark:bg-opacity-50 px-4 py-2 rounded-full text-sm font-semibold text-blue-50 dark:text-gray-200">
                This Month
              </span>
            </div>

            <div className="bg-white bg-opacity-20 dark:bg-gray-700 dark:bg-opacity-30 backdrop-blur-lg p-8 rounded-xl text-center border border-white border-opacity-30 dark:border-gray-600">
              <h3 className="text-4xl font-bold mb-2">1,000+</h3>
              <p className="text-lg text-blue-100 dark:text-gray-300 mb-3">Happy Users</p>
              <span className="inline-block bg-white bg-opacity-30 dark:bg-gray-600 dark:bg-opacity-50 px-4 py-2 rounded-full text-sm font-semibold text-blue-50 dark:text-gray-200">
                Active
              </span>
            </div>

            <div className="bg-white bg-opacity-20 dark:bg-gray-700 dark:bg-opacity-30 backdrop-blur-lg p-8 rounded-xl text-center border border-white border-opacity-30 dark:border-gray-600">
              <h3 className="text-4xl font-bold mb-2">₹50,00,000</h3>
              <p className="text-lg text-blue-100 dark:text-gray-300 mb-3">Money Saved</p>
              <span className="inline-block bg-white bg-opacity-30 dark:bg-gray-600 dark:bg-opacity-50 px-4 py-2 rounded-full text-sm font-semibold text-blue-50 dark:text-gray-200">
                Total
              </span>
            </div>

            <div className="bg-white bg-opacity-20 dark:bg-gray-700 dark:bg-opacity-30 backdrop-blur-lg p-8 rounded-xl text-center border border-white border-opacity-30 dark:border-gray-600">
              <h3 className="text-4xl font-bold mb-2">4.8/5</h3>
              <p className="text-lg text-blue-100 dark:text-gray-300 mb-3">Average Rating</p>
              <span className="inline-block bg-white bg-opacity-30 dark:bg-gray-600 dark:bg-opacity-50 px-4 py-2 rounded-full text-sm font-semibold text-blue-50 dark:text-gray-200">
                ⭐⭐⭐⭐⭐
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-center text-gray-900 dark:text-white mb-16">
            What Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800 p-8 rounded-xl shadow-lg dark:shadow-2xl border-t-4 border-yellow-400">
              <div className="text-2xl mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-800 dark:text-gray-200 mb-4 italic">
                "GrabGrid saved me ₹3000 by borrowing books instead of buying them. Great
                community!"
              </p>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">Rajesh K.</h4>
              <span className="text-gray-700 dark:text-gray-400 text-sm">Block A, Room 201</span>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800 p-8 rounded-xl shadow-lg dark:shadow-2xl border-t-4 border-yellow-400">
              <div className="text-2xl mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-800 dark:text-gray-200 mb-4 italic">
                "The borrow system is so easy to use. The owner was responsive and the whole
                process was smooth."
              </p>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">Priya Sharma</h4>
              <span className="text-gray-700 dark:text-gray-400 text-sm">Block B, Room 305</span>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800 p-8 rounded-xl shadow-lg dark:shadow-2xl border-t-4 border-yellow-400">
              <div className="text-2xl mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-800 dark:text-gray-200 mb-4 italic">
                "Finally a platform where my appliances are useful for others. Earning trust
                points is awesome!"
              </p>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">Amit Patel</h4>
              <span className="text-gray-700 dark:text-gray-400 text-sm">Block C, Room 102</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Highlight */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Amazing Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-6 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg dark:shadow-2xl hover:shadow-2xl dark:hover:shadow-xl transition dark:border dark:border-gray-700">
              <span className="text-4xl flex-shrink-0">🔐</span>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Secure Authentication</h3>
                <p className="text-gray-700 dark:text-gray-400">JWT-based secure login ensures your account is safe</p>
              </div>
            </div>

            <div className="flex gap-6 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg dark:shadow-2xl hover:shadow-2xl dark:hover:shadow-xl transition dark:border dark:border-gray-700">
              <span className="text-4xl flex-shrink-0">🔍</span>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Smart Search & Filter</h3>
                <p className="text-gray-700 dark:text-gray-400">
                  Filter by category, condition, block, and find exactly what you need
                </p>
              </div>
            </div>

            <div className="flex gap-6 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg dark:shadow-2xl hover:shadow-2xl dark:hover:shadow-xl transition dark:border dark:border-gray-700">
              <span className="text-4xl flex-shrink-0">⏰</span>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Deadline Tracking</h3>
                <p className="text-gray-700 dark:text-gray-400">Never miss a return date. Automatic reminders and late fee calculation</p>
              </div>
            </div>

            <div className="flex gap-6 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg dark:shadow-2xl hover:shadow-2xl dark:hover:shadow-xl transition dark:border dark:border-gray-700">
              <span className="text-4xl flex-shrink-0">💳</span>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Security Deposit</h3>
                <p className="text-gray-700 dark:text-gray-400">Optional security deposit system to protect valuable items</p>
              </div>
            </div>

            <div className="flex gap-6 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg dark:shadow-2xl hover:shadow-2xl dark:hover:shadow-xl transition dark:border dark:border-gray-700">
              <span className="text-4xl flex-shrink-0">📊</span>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Dashboard Analytics</h3>
                <p className="text-gray-700 dark:text-gray-400">Track your sharing activity, ratings, and borrowing history</p>
              </div>
            </div>

            <div className="flex gap-6 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg dark:shadow-2xl hover:shadow-2xl dark:hover:shadow-xl transition dark:border dark:border-gray-700">
              <span className="text-4xl flex-shrink-0">🌱</span>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Sustainability Score</h3>
                <p className="text-gray-700 dark:text-gray-400">See your environmental impact and contribution to the community</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-gray-800 dark:to-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Ready to Save Money & Help the Community?
          </h2>
          <p className="text-xl text-purple-100 dark:text-gray-300 mb-12">
            Join GrabGrid today and start sharing with your hostel mates
          </p>

          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-purple-600 dark:text-blue-400 px-8 py-4 rounded-lg font-bold hover:bg-purple-50 dark:hover:bg-gray-700 transition transform hover:scale-105 text-lg"
              >
                Create Free Account
              </Link>
              <Link
                to="/login"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-purple-600 dark:hover:bg-gray-700 dark:hover:text-white transition text-lg"
              >
                Login to Your Account
              </Link>
            </div>
          )}

          {isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/items"
                className="bg-white text-purple-600 dark:text-blue-400 px-8 py-4 rounded-lg font-bold hover:bg-purple-50 dark:hover:bg-gray-700 transition transform hover:scale-105 text-lg"
              >
                Start Browsing
              </Link>
              <Link
                to="/add-item"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-purple-600 dark:hover:bg-gray-700 dark:hover:text-white transition text-lg"
              >
                Add Your Items
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h4 className="font-display text-2xl font-bold mb-4">💎 GrabGrid</h4>
              <p className="text-gray-400">Your trusted hostel resource sharing platform</p>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/items" className="text-gray-400 hover:text-white transition">
                    Browse Items
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-white transition">
                    About Us
                  </Link>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-white transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-4">Community</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#guidelines" className="text-gray-400 hover:text-white transition">
                    Safety Guidelines
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-gray-400 hover:text-white transition">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#feedback" className="text-gray-400 hover:text-white transition">
                    Send Feedback
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-4">Social</h4>
              <p className="text-gray-400 mb-4">Follow us on social media</p>
              <div className="flex gap-4 text-2xl">
                <a href="#facebook" className="hover:text-blue-400 transition">
                  📘
                </a>
                <a href="#twitter" className="hover:text-blue-400 transition">
                  𝕏
                </a>
                <a href="#instagram" className="hover:text-pink-400 transition">
                  📷
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 GrabGrid. All rights reserved. | Made with ❤️ for students</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
