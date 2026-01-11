import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';

const FAQItem = ({item}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-xl p-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="font-medium">{item.question}</span>
        <ChevronDown
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && <p className="mt-3 text-sm text-gray-600">{item.answer}</p>}
    </div>
  );
};

export default FAQItem;