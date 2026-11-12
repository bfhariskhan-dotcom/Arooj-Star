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

  // Optional auto-rotate every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const activeTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className="py-12 sm:py-16 bg-slate-50 border-t border-slate-200 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-4">
          <div className="max-w-2xl">
            <div className="text-xs font-bold text-[#c1121f] uppercase tracking-wider mb-1.5">
              Verified Dealer Feedback
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight font-heading">
              Trusted Across Pakistan
            </h2>
          </div>

          {/* Slider Navigation Controls (Arrows & Count) */}
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono font-bold text-slate-500 mr-1.5">
              {currentIndex + 1} / {TESTIMONIALS.length}
            </span>
            <button
              onClick={prevSlide}
              aria-label="Previous testimonial"
              className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-800 hover:text-[#c1121f] hover:border-[#c1121f] hover:shadow-sm transition-all flex items-center justify-center cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next testimonial"
              className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-800 hover:text-[#c1121f] hover:border-[#c1121f] hover:shadow-sm transition-all flex items-center justify-center cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Featured Testimonial Slide Card with subtle hover glow */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 hover:border-[#c1121f]/50 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
          <div className="max-w-3xl">
            {/* 5 Red Stars */}
            <div className="flex items-center gap-1.5 mb-6">
              {[1, 2, 3, 4, 5].map((starNum) => (
                <Star
                  key={`star-${activeTestimonial.id}-${starNum}`}
                  className="w-5 h-5 fill-[#c1121f] text-[#c1121f]"
                />
              ))}
            </div>

            {/* Testimonial Quote Text */}
            <p className="text-lg sm:text-xl md:text-2xl font-medium text-slate-800 leading-relaxed mb-8">
              &ldquo;{activeTestimonial.comment}&rdquo;
            </p>

            {/* Author Information */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-100">
              <div>
                <h4 className="text-base font-black text-slate-900">
                  {activeTestimonial.name}
                </h4>
                <div className="text-xs text-slate-500 mt-0.5">
                  {activeTestimonial.role}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#c1121f]" />
                  <span>{activeTestimonial.city}, {activeTestimonial.province}</span>
                </span>
                <span className="text-xs font-semibold text-[#c1121f] bg-red-50 px-3 py-1.5 rounded-lg border border-red-100">
                  {activeTestimonial.featuredProduct}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dot Pagination */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {TESTIMONIALS.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                currentIndex === idx
                  ? 'w-8 bg-[#c1121f]'
                  : 'w-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
