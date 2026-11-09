import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Film, ShieldCheck, Factory, CheckCircle2 } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/products';

export const VideoSection: React.FC = () => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeVideo = COMPANY_DETAILS.videos[activeVideoIndex];

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleToggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleSelectVideo = (idx: number) => {
    setActiveVideoIndex(idx);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <section id="videos" className="py-24 bg-slate-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-[#c1121f] uppercase tracking-wider mb-2">
              <Film className="w-4 h-4" />
              <span>Factory & Durability Footage</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">Live Demonstrations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Watch Arooj Star in Action
            </h2>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              Experience the automated high-speed packaging line and live wall film testing proving washability, film elasticity, and durability.
            </p>
          </div>

          {/* Reel Selector Buttons */}
          <div className="flex items-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-xl self-start md:self-auto">
            {COMPANY_DETAILS.videos.map((vid, idx) => (
              <button
                key={vid.id}
                onClick={() => handleSelectVideo(idx)}
                className={`px-4 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeVideoIndex === idx
                    ? 'bg-[#c1121f] text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span>{vid.badge}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Video Player & Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Video Frame */}
          <div className="lg:col-span-8 bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative group">
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <video
                ref={videoRef}
                src={activeVideo.url}
                playsInline
                muted={isMuted}
                loop
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="w-full h-full object-contain"
              />

              {/* Large Play Trigger Overlay */}
              {!isPlaying && (
                <button
                  onClick={handleTogglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/45 group-hover:bg-black/35 transition-colors cursor-pointer"
                  aria-label="Play video"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#c1121f] text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 sm:w-9 sm:h-9 ml-1" />
                  </div>
                </button>
              )}

              {/* Floating Bottom Control Bar */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleTogglePlay}
                    className="p-2 text-white hover:text-red-400 transition-colors cursor-pointer"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>

                  <button
                    onClick={handleToggleMute}
                    className="p-2 text-white hover:text-red-400 transition-colors cursor-pointer"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>

                  <span className="text-xs text-slate-300 font-semibold line-clamp-1">
                    {activeVideo.title}
                  </span>
                </div>

                <button
                  onClick={handleFullscreen}
                  className="p-2 text-white hover:text-red-400 transition-colors cursor-pointer"
                  aria-label="Fullscreen"
                >
                  <Maximize className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Video Caption */}
            <div className="p-6 bg-slate-900 border-t border-slate-800">
              <div className="flex items-center gap-2 text-xs text-[#c1121f] font-bold uppercase tracking-wider mb-1">
                <span>{activeVideo.badge}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-slate-400">Asuzas Paint Chemical Industries</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {activeVideo.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {activeVideo.subtitle}. Engineered for exceptional coverage, smooth brush and roller flow, and non-fading color retention.
              </p>
            </div>
          </div>

          {/* Right Column: Playlist & Production Standards */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Featured Video Reels
            </div>

            {COMPANY_DETAILS.videos.map((vid, idx) => {
              const isSelected = activeVideoIndex === idx;
              return (
                <div
                  key={vid.id}
                  onClick={() => handleSelectVideo(idx)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#c1121f] bg-slate-900 ring-1 ring-[#c1121f]'
                      : 'border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-[#c1121f] uppercase tracking-wider">
                      Reel 0{idx + 1}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] bg-[#c1121f] text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                        Active
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    {vid.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {vid.subtitle}
                  </p>
                </div>
              );
            })}

            {/* Quality Standards Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-[#12080a] border border-red-950/60 mt-2">
              <div className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-wider mb-3">
                <ShieldCheck className="w-4 h-4 text-[#c1121f]" />
                <span>Chemical Production Standards</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c1121f] shrink-0 mt-0.5" />
                  <span><strong>Pigment Dispersion:</strong> High-shear milling for zero particle grit.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c1121f] shrink-0 mt-0.5" />
                  <span><strong>Elasticity & Adhesion:</strong> Cross-linking polymer binders prevent flaking.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c1121f] shrink-0 mt-0.5" />
                  <span><strong>Scrub Endurance:</strong> Withstands rigorous household washing.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
