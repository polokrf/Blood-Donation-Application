import React from 'react';
import {
  BiShieldQuarter,
  BiLockAlt,
  BiUserCheck,
  BiData,
} from 'react-icons/bi';
import { FaFileShield } from 'react-icons/fa6';

const PrivacyPolicy = () => {
  const sections = [
    { id: 'info', title: 'Information We Collect', icon: <BiData /> },
    { id: 'usage', title: 'How We Use Data', icon: <BiUserCheck /> },
    { id: 'security', title: 'Data Security', icon: <BiLockAlt /> },
    { id: 'rights', title: 'Your Rights', icon: <BiShieldQuarter /> },
  ];

  return (
    <div className="bg-white min-h-screen py-20 px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-50 rounded-full blur-[120px] opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-red-50 rounded-full blur-[100px] opacity-40"></div>

      <div className="max-w-[1200px] mx-auto">
        {/* 1. Header Section */}
        <div className="mb-20 space-y-6" data-aos="fade-right">
          <div className="flex items-center gap-3 text-red-500 bg-red-50 w-fit px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest border border-red-100 shadow-sm">
            <FaFileShield className="text-lg" />
            <span>Updated: March 2026</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-gray-900 uppercase tracking-tighter leading-none">
            Privacy <span className="text-red-500">Policy</span>
          </h1>
          <p className="text-gray-500 font-medium text-xl max-w-2xl leading-relaxed">
            Your privacy is our top priority. We are committed to protecting
            your personal data while you save lives through our platform.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-start relative">
          {/* 2. Sticky Sidebar Navigation (Desktop) */}
          <aside className="lg:w-1/4 w-full lg:sticky lg:top-24 space-y-4">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-6 ml-4">
              Quick Navigation
            </p>
            {sections.map(section => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="group flex items-center gap-4 p-5 bg-white border-2 border-red-50 rounded-[2rem] hover:border-red-500 hover:shadow-xl hover:shadow-red-50 transition-all duration-300"
              >
                <div className="text-2xl text-red-500 group-hover:scale-110 transition-transform">
                  {section.icon}
                </div>
                <span className="font-bold text-gray-800 text-sm tracking-tight">
                  {section.title}
                </span>
              </a>
            ))}
          </aside>

          {/* 3. Main Content Area */}
          <div className="lg:w-3/4 space-y-16">
            {/* Section 1 */}
            <section
              id="info"
              className="group space-y-6 p-10 bg-red-50/30 rounded-[3.5rem] border-2 border-transparent hover:border-red-500 hover:bg-white transition-all duration-500"
            >
              <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter flex items-center gap-4">
                <span className="w-10 h-1 bg-red-500 rounded-full"></span>
                Information We Collect
              </h2>
              <p className="text-gray-600 font-medium leading-loose">
                To provide a seamless blood matching service, we collect
                personal information such as your **full name, blood group,
                contact number, and real-time location**. This data is essential
                to notify you of nearby emergencies or connect you with
                recipients.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Direct User Input',
                  'Geographical Data',
                  'Medical History (Optional)',
                  'Device Information',
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm font-bold text-gray-500 bg-white p-4 rounded-2xl border border-red-50 group-hover:shadow-sm"
                  >
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>{' '}
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 2 */}
            <section id="usage" className="space-y-6 px-10">
              <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter flex items-center gap-4">
                <span className="w-10 h-1 bg-red-500 rounded-full"></span>
                How We Use Data
              </h2>
              <div className="prose prose-red max-w-none text-gray-600 font-medium leading-loose space-y-4">
                <p>
                  We use your information solely for the purpose of{' '}
                  <strong>saving lives</strong>. This includes:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Matching your blood group with local urgent requests.</li>
                  <li>
                    Sending critical SMS and Push notifications for blood
                    donation.
                  </li>
                  <li>
                    Improving our matching algorithm to reduce response time.
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 3 - Important Note Highlight */}
            <div className="bg-gray-950 p-12 rounded-[3.5rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl"></div>
              <div className="relative z-10 space-y-4">
                <h3 className="text-white text-2xl font-black uppercase tracking-tighter">
                  Strict Confidentiality
                </h3>
                <p className="text-gray-400 font-medium italic">
                  "We never sell your data to third-party advertisers. Your
                  medical records and contact details are encrypted and shared
                  only with verified recipients during an emergency."
                </p>
              </div>
            </div>

            {/* Section 4 */}
            <section
              id="rights"
              className="group space-y-6 p-10 bg-white border-2 border-red-50 rounded-[3.5rem] hover:border-red-500 transition-all duration-500 shadow-2xl shadow-red-50/30"
            >
              <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter flex items-center gap-4">
                <span className="w-10 h-1 bg-red-500 rounded-full"></span>
                Your Rights
              </h2>
              <p className="text-gray-600 font-medium leading-loose">
                As a member of our community, you have full control over your
                data. You can request to **access, modify, or delete** your
                account and data at any time through your dashboard settings.
              </p>
              <button className="px-8 py-4 bg-red-500 text-white font-black rounded-2xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-xs shadow-xl shadow-red-100">
                Contact Privacy Team
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
