import React from 'react';
import { Star, CheckCircle } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Marcus Chen',
      role: 'Staff Software Engineer at Stripe',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      comment: 'ResumeCraft helped me transition from senior to staff engineer. The Modern template kept my technical achievements prominent and clean. I got callbacks from 4 out of 5 top-tier companies.',
      rating: 5
    },
    {
      name: 'Jessica Reynolds',
      role: 'Lead Product Manager at Atlassian',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      comment: 'The real-time preview and auto-saving are a dream. I could tweak bullet points and instantly see the spacing without re-generating a document. The PDF was razor sharp.',
      rating: 5
    },
    {
      name: 'David Okafor',
      role: 'Head of Growth Marketing',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      comment: 'I landed my dream director role within 3 weeks. Switching between the Executive and Modern templates took one click and preserved every single metric in my history.',
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60">
            Real Stories, Real Careers
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Loved by Professionals Worldwide
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            See how candidates from leading tech, finance, and creative companies used ResumeCraft to secure top offers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:bg-white hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-6 italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-slate-200/60">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-full object-cover shadow-xs"
                />
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                    {rev.name}
                    <CheckCircle className="w-3.5 h-3.5 text-blue-500" />
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
