import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation Bar */}
      <nav className="fixed w-full bg-black/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent">
              Hostel Flow
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link to="/" className="hover:text-blue-400 transition">Home</Link>
              <Link to="/about" className="text-blue-400">About</Link>
              <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
            </div>
            <div className="flex space-x-4">
              <Link to="/login" className="px-4 py-2 border border-blue-400 rounded-lg hover:bg-blue-400 hover:text-black transition">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-16"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(30, 58, 138, 0.75), rgba(79, 70, 229, 0.75)), url('https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="text-center z-10 px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About Hostel Flow</h1>
          <p className="text-xl text-gray-300">Transforming Campus Living through Technology</p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-5xl mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-6 text-blue-400">Our Mission</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              At Hostel Flow, our mission is to revolutionize hostel management by providing a comprehensive, user-friendly platform that connects students, rectors, workers, and administrators. We believe that efficient hostel management leads to a better living experience for everyone.
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-6 text-blue-400">Our Vision</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              We envision a future where every hostel operates with maximum efficiency, where problems are resolved quickly, and where residents feel heard and valued. Hostel Flow aims to be the standard platform for hostel management across educational institutions worldwide.
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-6 text-blue-400">Why We Started</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              Hostel management has always been challenging. Problems go unreported, communication is inefficient, and there's often a disconnect between residents and management. We saw an opportunity to bridge this gap and create a platform that serves everyone:
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">✓</span>
                <span><strong>For Students:</strong> A simple way to report issues and get quick resolutions</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">✓</span>
                <span><strong>For Rectors:</strong> Streamlined problem tracking and management</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">✓</span>
                <span><strong>For Workers:</strong> Clear task assignments and job tracking</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">✓</span>
                <span><strong>For Administrators:</strong> Comprehensive analytics and insights</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold mb-3">Fast & Reliable</h3>
              <p className="text-gray-400">Built with cutting-edge technology to ensure fast loading times and 99% uptime guarantee.</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold mb-3">Secure</h3>
              <p className="text-gray-400">Enterprise-level security with encrypted data storage and secure authentication mechanisms.</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-2xl font-bold mb-3">Mobile First</h3>
              <p className="text-gray-400">Fully responsive design that works seamlessly on all devices and screen sizes.</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-2xl font-bold mb-3">Collaborative</h3>
              <p className="text-gray-400">Enable seamless communication between all stakeholders within your hostel ecosystem.</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-2xl font-bold mb-3">Analytics</h3>
              <p className="text-gray-400">Comprehensive dashboards with detailed insights into problem trends and resolution metrics.</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-3">Easy to Use</h3>
              <p className="text-gray-400">Intuitive user interface designed for users of all technical skill levels.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-6xl mb-4">💡</div>
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p className="text-gray-400">We constantly innovate to provide better solutions for hostel management challenges.</p>
            </div>

            <div className="text-center">
              <div className="text-6xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-3">Collaboration</h3>
              <p className="text-gray-400">We believe in building strong partnerships and fostering community within hostels.</p>
            </div>

            <div className="text-center">
              <div className="text-6xl mb-4">⭐</div>
              <h3 className="text-xl font-bold mb-3">Excellence</h3>
              <p className="text-gray-400">We strive for excellence in every aspect of our service and user experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Join the Hostel Flow Community</h2>
          <p className="text-xl mb-8 text-blue-100">Start managing your hostel more efficiently today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition font-semibold text-lg">
              Get Started
            </Link>
            <Link to="/login" className="px-8 py-4 border-2 border-white rounded-lg hover:bg-white/10 transition font-semibold text-lg">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-black/80 backdrop-blur border-t border-gray-700 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-blue-400">Hostel Flow</h3>
              <p className="text-gray-400">The complete hostel management solution.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/" className="hover:text-blue-400 transition">Home</Link></li>
                <li><Link to="/about" className="hover:text-blue-400 transition">About</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Account</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/login" className="hover:text-blue-400 transition">Login</Link></li>
                <li><Link to="/register" className="hover:text-blue-400 transition">Register</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@hostelh.com</li>
                <li>Phone: +91 9876543210</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8">
            <p className="text-center text-gray-400">© 2026 Hostel Flow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
