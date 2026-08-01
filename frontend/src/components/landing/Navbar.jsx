import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Overview', href: '#overview' },
    { name: 'Why Recruit', href: '#why-recruit' },
    { name: "Director's Message", href: '#director-message' },
    { name: 'Recruitment Process', href: '#process' },
    { name: 'Contact Us', href: '#contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3">
            <img src="/images/CCPS.png" alt="IIT Bhilai Logo" className="w-12 h-12 object-contain" />
            <div>
              <h1 className="text-xl font-bold text-emerald-900 leading-tight">Centre for Career Planning and Services</h1>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">IIT Bhilai</p>
            </div>
          </div>
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-emerald-900 font-medium transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>
          <button
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            className="md:hidden text-emerald-900 cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
              />
            </svg>
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden border-t border-gray-100 py-2 space-y-1" onClick={() => setIsOpen(false)}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block py-2 text-gray-700 hover:text-emerald-900 font-medium transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
