import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8">
        
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">About PG Prep</h2>
          <p className="text-gray-400 leading-relaxed">
            PG Prep is your smart companion for postgraduate entrance exams.
            With a vast question bank, daily goals, and progress tracking,
            we help you stay ahead in your preparation.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link
                to="/about"
                className="hover:text-white transition duration-300"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-white transition duration-300"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/privacy"
                className="hover:text-white transition duration-300"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social Media */}
        <div>
          <h2 className="text-xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-400">Email: support@pgprep.com</p>
          <p className="text-gray-400">Phone: +91 98765 43210</p>

         <div className="flex space-x-4 mt-4">
  {[
    { icon: <FaFacebook />, color: "from-blue-500 to-blue-700" },
    { icon: <FaTwitter />, color: "from-sky-400 to-sky-600" },
    { icon: <FaInstagram />, color: "from-pink-500 to-yellow-500" },
    { icon: <FaLinkedin />, color: "from-blue-600 to-blue-800" }
  ].map((item, index) => (
    <a
      key={index}
      href="#"
      className={`group relative p-2 rounded-full bg-gray-700 text-white text-xl 
                 shadow-md transition-all duration-300 transform hover:scale-125 
                 hover:bg-gradient-to-r ${item.color} hover:shadow-xl`}
    >
      <span className="relative z-10">{item.icon}</span>
      {/* Glow effect */}
      <span
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30
                   bg-white transition duration-300"
      ></span>
    </a>
  ))}
</div>

        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} PG Prep. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
