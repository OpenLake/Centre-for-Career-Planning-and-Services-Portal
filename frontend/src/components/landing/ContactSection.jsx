import React from 'react';
import { Mail, Phone } from 'lucide-react';

const ContactSection = () => {
  const staffContacts = [
    {
      name: 'Mr. Satyajit Pradhan',
      role: 'Assistant TPO',
      phone: '+91-9938890523',
      email: 'outreach@iitbhilai.ac.in',
    },
    {
      name: 'Mr. Ratnesh Pandey',
      role: 'Senior Assistant',
      phone: '+91-9424311996',
      email: 'ratnesh@iitbhilai.ac.in',
    },
  ];

  const studentCoordinators = [
    {
      name: 'Rahat Imran',
      role: 'UG Placement Coordinator',
      phone: '8294927257',
      email: 'rahati@iitbhilai.ac.in',
    },
    {
      name: 'Rudra Dudhat',
      role: 'UG Placement Coordinator',
      phone: '9326110119',
      email: 'rudramd@iitbhilai.ac.in',
    },
    {
      name: 'Chitneedi Satya',
      role: 'PG Placement Coordinator',
      phone: '7702959666',
      email: 'chitneedisatya@iitbhilai.ac.in',
    },
    {
      name: 'Aditya Jha',
      role: 'Mentor',
      phone: '7439879074',
      email: 'adityaj@iitbhilai.ac.in',
    },
  ];

  const ContactCard = ({ contact }) => (
    <div className="w-full p-8 rounded-2xl bg-white border border-gray-100 shadow-xl space-y-4 hover:shadow-2xl transition duration-300 flex flex-col items-center text-center">
      <h3 className="text-2xl font-bold text-emerald-900">{contact.name}</h3>
      <p className="text-emerald-600 font-bold uppercase tracking-wider text-sm">{contact.role}</p>
      <div className="space-y-3 pt-4">
        <div className="flex items-center space-x-3 text-gray-600">
          <Phone className="w-5 h-5 text-emerald-500" />
          <a href={`tel:${contact.phone}`} className="font-light hover:text-emerald-600">{contact.phone}</a>
        </div>
        <div className="flex items-center space-x-3 text-gray-600">
          <Mail className="w-5 h-5 text-emerald-500" />
          <a href={`mailto:${contact.email}`} className="font-light hover:text-emerald-600">{contact.email}</a>
        </div>
      </div>
    </div>
  );

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-widest text-emerald-900">Contact Us</h2>
          <div className="w-24 h-1 bg-emerald-600 mx-auto" />
          <p className="text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Reach out to us for any queries related to placement, internships, or professional collaborations.
          </p>
        </div>

        {/* Staff Contacts */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-emerald-800 mb-8">Official Staff</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {staffContacts.map((contact, index) => (
              <ContactCard key={index} contact={contact} />
            ))}
          </div>
        </div>

        {/* Student Coordinators */}
        <div>
          <h3 className="text-2xl font-bold text-center text-emerald-800 mb-8">Student Coordinators</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studentCoordinators.map((contact, index) => (
              <ContactCard key={index} contact={contact} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

