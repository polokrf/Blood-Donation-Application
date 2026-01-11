import React from 'react';
import { ChevronDown, Phone, Mail, AlertCircle } from 'lucide-react';
import FAQItem from './FAQItem';

const faqData = [
  {
    question: 'How do I request blood?',
    answer:
      'Go to the Blood Request section, fill in the required details, and submit your request. Donors will be notified immediately.',
  },
  {
    question: 'Who can donate blood?',
    answer:
      'Any healthy person aged 18–60 years can donate blood, following basic health guidelines.',
  },
  {
    question: 'Is blood donation safe?',
    answer:
      'Yes, blood donation is completely safe. All equipment used is sterile and used only once.',
  },
  {
    question: 'How fast can I find a blood donor?',
    answer:
      'On average, donors are found within 15–30 minutes depending on availability and location.',
  },
  {
    question: 'Is this platform free to use?',
    answer:
      'Yes, our blood donation platform is completely free for both donors and patients.',
  },
];
const Help = () => {
  return (
    <section className="space-y-12 my-[35px] p-2">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Help & Support</h1>
        <p className="text-gray-500 mt-2">
          Find answers and guidance to use our blood donation platform easily
        </p>
      </div>

      {/* Quick Help Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-base-100 rounded-2xl shadow-sm p-6">
          <AlertCircle className="text-primary mb-3" />
          <h3 className="font-semibold">Emergency Help</h3>
          <p className="text-sm text-gray-600 mt-2">
            Learn how to make an urgent blood request during emergencies.
          </p>
        </div>

        <div className="bg-base-100 rounded-2xl shadow-sm p-6">
          <Phone className="text-primary mb-3" />
          <h3 className="font-semibold">Call Support</h3>
          <p className="text-sm text-gray-600 mt-2">
            Contact our support team for immediate assistance.
          </p>
        </div>

        <div className="bg-base-100 rounded-2xl shadow-sm p-6">
          <Mail className="text-primary mb-3" />
          <h3 className="font-semibold">Email Us</h3>
          <p className="text-sm text-gray-600 mt-2">
            Send us your questions and we will respond as soon as possible.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <FAQItem key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Help;