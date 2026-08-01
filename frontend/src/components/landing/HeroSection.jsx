import React from 'react';
import { BROCHURE_LINK } from '../../constants/links';

const HeroSection = ({ onLoginClick, onSignupClick }) => {
  return (
    <section className="relative min-h-[85vh] bg-gray-900 overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/bg.webp"
          alt="Campus Background"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto min-h-[85vh] px-4 sm:px-6 lg:px-8 py-12 md:py-0 flex flex-col md:flex-row items-center justify-between text-white">
        {/* Left Content */}
        <div className="md:w-3/5 space-y-6">
          <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight">
            A one stop portal for <br />
            <span className="text-emerald-300">Placements & Internships</span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-200 max-w-2xl font-light">
            Empowering students and connecting industry with talent at IIT Bhilai.
            Providing a seamless experience for recruitment, skill development, and professional networking.
          </p>
          <div className="flex space-x-4 pt-4">
            <button
              onClick={onSignupClick}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-bold text-lg shadow-xl transform transition hover:-translate-y-1"
            >
              Get Started
            </button>
            <a
              href={BROCHURE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-white hover:bg-white hover:text-emerald-900 rounded-lg font-bold text-lg transition duration-300 flex items-center justify-center"
            >
              Download Brochure
            </a>
          </div>
        </div>
        {/* Right Content - Login Buttons */}
        <div className="md:w-1/3 w-full bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl space-y-6 mt-12 md:mt-0">
          <h3 className="text-2xl font-bold text-center border-b border-white/20 pb-4">Portal Login</h3>
          <div className="flex flex-col space-y-4">
            <button 
              onClick={onLoginClick}
              className="w-full py-4 bg-white text-emerald-900 font-bold rounded-xl hover:bg-emerald-50 transition shadow-lg flex items-center justify-center space-x-3 group"
            >
              <span className="text-emerald-900 group-hover:scale-110 transition">Student Login</span>
            </button>
            <button 
              onClick={onLoginClick}
              className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition shadow-lg flex items-center justify-center space-x-3"
            >
              <span>Recruiter Login</span>
            </button>
            <button 
              onClick={onLoginClick}
              className="w-full py-4 bg-gray-800 text-white font-bold rounded-xl hover:bg-gray-900 transition shadow-lg flex items-center justify-center space-x-3 border border-gray-600"
            >
              <span>Admin Login</span>
            </button>
          </div>
          <p className="text-sm text-center text-gray-300 font-light">
            Secure access for students, recruiters and administrators.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
