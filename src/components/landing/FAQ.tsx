import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Are ResumeCraft templates truly ATS-friendly?',
      a: 'Yes! Every template in ResumeCraft is engineered following standard Applicant Tracking System conventions: clean single- or dual-column hierarchies, searchable text layers, standard typography encodings, and no complex graphical tables that break ATS parsers like Workday, Taleo, or Greenhouse.'
    },
    {
      q: 'Will I lose my entered resume details if I change templates?',
      a: 'Never. Your data (personal info, experience, education, skills, projects) is decoupled from the visual styling. You can switch between Modern, Classic, Minimal, Executive, Creative, and Professional templates anytime with 100% data preservation.'
    },
    {
      q: 'How does the PDF download work?',
      a: 'Clicking "Download PDF" renders a clean, high-resolution A4 document formatted to standard dimensions (210mm x 297mm). You can also use "Print Resume" to generate a vector PDF directly via your browser print engine.'
    },
    {
      q: 'Can I reorder sections or add custom items?',
      a: 'Yes! You can reorder sections, add multiple work experiences, education degrees, certifications, projects, languages, and custom achievements, or hide sections you do not need.'
    },
    {
      q: 'Is my data secure and private?',
      a: 'Your resume data is stored securely in your browser session and account. We never sell your personal contact information to third-party recruiters or data brokers.'
    }
  ];

  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Everything you need to know about building, customizing, and exporting your resume.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200/80 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 bg-white hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed bg-white border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
