import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t mt-8">
      <div className="container mx-auto px-4 py-8 grid gap-6 lg:grid-cols-4">
        {/* About Section */}
        <div>
          <h3 className="font-semibold mb-2">About Us</h3>
          <p className="text-sm text-gray-600">
            We are committed to providing the best products and services for our customers. Quality, trust, and reliability are our top priorities.
          </p>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="font-semibold mb-2">Customer Service</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li><a href="#" className="hover:text-primary-100">Help Center</a></li>
            <li><a href="#" className="hover:text-primary-100">Returns</a></li>
            <li><a href="#" className="hover:text-primary-100">Shipping Info</a></li>
            <li><a href="#" className="hover:text-primary-100">Payment Options</a></li>
          </ul>
        </div>

        {/* Connect / Social Media */}
        <div>
          <h3 className="font-semibold mb-2">Connect With Us</h3>
          <div className="flex items-center gap-4 text-2xl text-gray-600">
            <a
              href="https://www.facebook.com/ta.ru.na.382053?rdid=34kMTztUuxhJBojl&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1GsEYk1ZyB%2F#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700 transition-colors"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com/tarunkumar_004/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500 transition-colors"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/tarun-roy-389a18249/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://x.com/TARUNROY004"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              <FaTwitter />
            </a>
          </div>
        </div>


        {/* Contact / Policies */}
        <div>
          <h3 className="font-semibold mb-2">Contact & Policies</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>Email: tarunroy0304.com</li>
            <li>Phone: +91 7439049587</li>
            <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-600">Terms & Conditions</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t py-4 text-center text-gray-500 text-sm">
        © 2025 Your Company. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
