import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { TESTIMONIALS } from '../data/products';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const activeTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section
      id="testimonials"
      className="py-10 sm:py-14 bg-gradient-to-b from-slate-50 via-amber-50/20 to-white border-t border-slate-200 w-full max-w-full overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
          <div className="max-w-xl">
            <div className="text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-rose-600 via-amber-500 to-blue-600 bg-clip-text text-transparent mb-1">
              Dealer Reviews
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-heading">
              Trusted Across Pakistan
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-heading font-bold text-slate-700 bg-white px-2.5 py-1 rounded border border-slate-200 tabular-nums mr-1">
              {currentIndex + 1} / {TESTIMONIALS.length}
            </span>
            <button
              onClick={prevSlide}
              aria-label="Previous testimonial"
              className="w-8 h-8 rounded-md bg-white border border-slate-200 text-slate-800 hover:text-rose-600 hover:border-rose-400 transition-all flex items-center justify-center cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next testimonial"
              className="w-8 h-8 rounded-md bg-white border border-slate-200 text-slate-800 hover:text-rose-600 hover:border-rose-400 transition-all flex items-center justify-center cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 sm:p-7 border border-slate-200 shadow-xs relative overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-rose-500 via-amber-500 via-emerald-500 to-blue-600 absolute top-0 left-0" />
          <div className="max-w-3xl">
            <div className="flex items-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((starNum) => (
                <Star
                  key={`star-${activeTestimonial.id}-${starNum}`}
                  className="w-4 h-4 fill-amber-400 text-amber-500"
                />
              ))}
            </div>

            <p className="text-base sm:text-lg font-medium text-slate-800 leading-relaxed mb-6">
              &ldquo;{activeTestimonial.comment}&rdquo;
            </p>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <div>
                <h4 className="text-sm font-black text-slate-900">{activeTestimonial.name}</h4>
                <div className="text-xs text-slate-500">{activeTestimonial.role}</div>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-600" />
                  <span>
                    {activeTestimonial.city}, {activeTestimonial.province}
                  </span>
                </span>
                <span className="font-semibold text-sky-700 bg-sky-50 px-2.5 py-1 rounded border border-sky-200">
                  {activeTestimonial.featuredProduct}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 mt-6">
          {TESTIMONIALS.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-sm transition-all cursor-pointer ${
                currentIndex === idx
                  ? 'w-7 bg-gradient-to-r from-rose-600 to-amber-500'
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
