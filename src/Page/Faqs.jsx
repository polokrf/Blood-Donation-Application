import React, { useState, useEffect, useRef } from 'react';
import {
  BiHelpCircle,
  BiChevronUp,
  BiPlus,
  BiMessageDetail,
  BiX,
  BiSend,
  BiDotsHorizontalRounded,
} from 'react-icons/bi';
import { FaDroplet, FaHeartPulse } from 'react-icons/fa6';

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Ager exact data
  const [messages, setMessages] = useState([
    {
      text: 'Hello Rokcy! 👋 Blood donation niye kono proshno ache?',
      isBot: true,
    },
  ]);

  const faqData = [
    {
      q: 'Who is eligible to donate blood?',
      a: 'Anyone aged 18-65, weighing over 50kg, and in good general health can donate. You must not have had any major surgery or infections in the last 6 months.',
      category: 'Eligibility',
    },
    {
      q: 'How often can I donate blood?',
      a: 'Male donors can donate every 3 months, and female donors can donate every 4 months. This ensures your body has enough time to replenish iron levels.',
      category: 'Frequency',
    },
    {
      q: 'Is it safe to donate during the pandemic?',
      a: 'Yes, we follow strict sterilized protocols. All equipment is single-use and disposable, ensuring 100% safety for both donor and recipient.',
      category: 'Safety',
    },
    {
      q: 'How long does the donation process take?',
      a: 'The actual donation takes only 8-10 minutes. However, the entire process—including registration and mini-health checkup—takes about 30-45 minutes.',
      category: 'Process',
    },
    {
      q: 'Can I donate if I have a tattoo?',
      a: 'Yes, but usually after 6 months to 1 year of getting the tattoo, depending on the local health guidelines and the facility where you got it.',
      category: 'Eligibility',
    },
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const toggleAccordion = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleSendMessage = e => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setMessages(prev => [...prev, { text: inputValue, isBot: false }]);
    setInputValue('');
    setIsTyping(true);

    // Auto Answer Simulation
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          text: 'Dhonnobad! Amader team apnar proshno-ti peyeche. Khub shiggori amra reply dibo. Totokhon FAQ check korte paren.',
          isBot: true,
        },
      ]);
    }, 1500);
  };

  return (
    <div className="bg-white min-h-screen py-20 px-4 relative overflow-hidden font-sans">
      {/* Background Decor - Red Tint */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-50 rounded-full blur-[120px] opacity-60"></div>

      <div className="max-w-[1000px] mx-auto relative">
        {/* 1. Header Section */}
        <div className="text-center mb-24 space-y-6">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-red-50 text-red-600 rounded-full font-black text-xs uppercase tracking-[0.2em] border border-red-100 shadow-sm">
            <BiHelpCircle className="text-xl" />
            <span>Support Center</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-gray-900 uppercase tracking-tighter leading-none">
            Common <span className="text-red-600">Questions</span>
          </h1>
          <p className="text-gray-500 font-medium text-xl max-w-xl mx-auto">
            Everything you need to know about donating blood and using our
            platform.
          </p>
        </div>

        {/* 2. FAQ List - Red Theme */}
        <div className="space-y-6">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`group border-2 transition-all duration-500 rounded-[2.5rem] overflow-hidden ${
                activeIndex === index
                  ? 'border-red-600 bg-white shadow-2xl shadow-red-100 scale-[1.02]'
                  : 'border-red-50 bg-red-50/20 hover:border-red-200'
              }`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full p-8 md:p-10 flex items-center justify-between text-left outline-none"
              >
                <div className="flex items-center gap-6">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all duration-500 ${
                      activeIndex === index
                        ? 'bg-red-600 text-white rotate-90'
                        : 'bg-white text-red-600 shadow-sm'
                    }`}
                  >
                    {activeIndex === index ? <BiChevronUp /> : <BiPlus />}
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-red-400 uppercase tracking-widest block mb-1">
                      {item.category}
                    </span>
                    <h3
                      className={`text-xl md:text-2xl font-black tracking-tighter transition-colors ${
                        activeIndex === index ? 'text-red-600' : 'text-gray-800'
                      }`}
                    >
                      {item.q}
                    </h3>
                  </div>
                </div>
              </button>
              <div
                className={`transition-all duration-500 ease-in-out px-10 md:px-28 overflow-hidden ${
                  activeIndex === index
                    ? 'max-h-[500px] pb-10 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pt-4 border-t border-red-50 text-gray-500 font-medium leading-relaxed text-lg">
                  {item.a}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 3. Footer Section */}
        <div className="mt-24 p-12 bg-gray-950 rounded-[4rem] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
          <div className="relative space-y-2">
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
              Still have questions?
            </h2>
            <p className="text-gray-400 font-medium tracking-tight">
              Can't find the answer? Use our Red-Live Chat!
            </p>
          </div>
          <button
            onClick={() => setIsChatOpen(true)}
            className="relative px-10 py-5 bg-red-600 text-white font-black rounded-2xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-xs shadow-xl shadow-red-900/40"
          >
            Open Chat Box
          </button>
        </div>
      </div>

      {/* --- RED & WHITE CHAT BOX --- */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end pointer-events-none">
        <div
          className={`w-[350px] md:w-[400px] bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(239,68,68,0.15)] border-2 border-red-50 overflow-hidden transition-all duration-500 origin-bottom-right pointer-events-auto ${
            isChatOpen
              ? 'scale-100 opacity-100 translate-y-0'
              : 'scale-0 opacity-0 translate-y-10'
          }`}
        >
          {/* Header */}
          <div className="bg-red-600 p-7 text-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">
                <FaHeartPulse className="animate-pulse" />
              </div>
              <h4 className="font-black uppercase tracking-tight text-sm tracking-widest">
                BloodSupport AI
              </h4>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-3xl hover:rotate-90 transition-transform"
            >
              <BiX />
            </button>
          </div>

          {/* Messages */}
          <div className="h-[380px] overflow-y-auto p-6 bg-red-50/20 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[85%] px-5 py-3 rounded-[1.8rem] font-bold text-sm shadow-sm ${
                    msg.isBot
                      ? 'bg-white text-gray-700 rounded-tl-none border border-red-50'
                      : 'bg-red-600 text-white rounded-br-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white px-5 py-3 rounded-[1.5rem] rounded-tl-none border border-red-50 text-red-600">
                  <BiDotsHorizontalRounded className="text-2xl animate-bounce" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSendMessage}
            className="p-5 bg-white border-t-2 border-red-50 flex items-center gap-3"
          >
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 bg-red-50/50 px-6 py-4 rounded-2xl outline-none font-bold text-gray-700 focus:bg-white border border-transparent transition-all shadow-inner"
            />
            <button
              type="submit"
              className="w-14 h-14 bg-red-600 text-white rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-red-200"
            >
              <BiSend />
            </button>
          </form>
        </div>

        {/* Toggle FAB */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="mt-4 w-20 h-20 bg-red-600 text-white rounded-[2rem] flex items-center justify-center text-4xl shadow-2xl shadow-red-200 pointer-events-auto hover:rotate-6 active:scale-90 transition-all"
        >
          {isChatOpen ? <BiX /> : <BiMessageDetail />}
        </button>
      </div>
    </div>
  );
};

export default Faqs;
