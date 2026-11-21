import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, ShieldCheck, CheckCircle2 } from 'lucide-react';
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
    <section
      id="videos"
      className="py-10 sm:py-14 bg-gradient-to-b from-white via-sky-50/40 to-rose-50/30 text-slate-900 border-t border-slate-200 w-full max-w-full"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div className="max-w-xl">
            <div className="text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-rose-600 via-amber-500 to-blue-600 bg-clip-text text-transparent mb-1">
              Factory &amp; Live Testing
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-heading">
              Watch Data Arooj Paint Gallery
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Plant packaging and scrub-resistance film demonstrations.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-md self-start md:self-auto shadow-xs">
            {COMPANY_DETAILS.videos.map((vid, idx) => (
              <button
                key={vid.id}
                onClick={() => handleSelectVideo(idx)}
                className={`px-3.5 py-2 text-xs font-bold rounded transition-all cursor-pointer whitespace-nowrap ${
                  activeVideoIndex === idx
                    ? 'bg-gradient-to-r from-rose-600 to-orange-500 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>{vid.badge}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Video Player */}
          <div className="lg:col-span-8 bg-white rounded-lg overflow-hidden border border-slate-200 shadow-sm relative group">
            <div className="h-1 w-full bg-gradient-to-r from-rose-500 via-amber-500 via-emerald-500 to-blue-600" />
            <div className="relative aspect-video bg-slate-900 flex items-center justify-center">
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

              {!isPlaying && (
                <button
                  onClick={handleTogglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/35 group-hover:bg-black/25 transition-colors cursor-pointer"
                  aria-label="Play video"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-gradient-to-r from-rose-600 to-orange-500 text-white flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform">
                    <Play className="w-6 h-6 sm:w-7 sm:h-7 ml-0.5" />
                  </div>
                </button>
              )}

              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleTogglePlay}
                    className="p-1.5 text-white hover:text-amber-300 cursor-pointer"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={handleToggleMute}
                    className="p-1.5 text-white hover:text-amber-300 cursor-pointer"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <span className="text-xs text-slate-200 font-medium line-clamp-1">
                    {activeVideo.title}
                  </span>
                </div>

                <button
                  onClick={handleFullscreen}
                  className="p-1.5 text-white hover:text-amber-300 cursor-pointer"
                  aria-label="Fullscreen"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-5 bg-white border-t border-slate-200">
              <div className="text-[11px] font-bold uppercase tracking-wider text-rose-600 mb-0.5">
                {activeVideo.badge}
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">{activeVideo.title}</h3>
              <p className="text-xs text-slate-600">{activeVideo.subtitle}</p>
            </div>
          </div>

          {/* Playlist & Standards */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {COMPANY_DETAILS.videos.map((vid, idx) => {
              const isSelected = activeVideoIndex === idx;
              return (
                <div
                  key={vid.id}
                  onClick={() => handleSelectVideo(idx)}
                  className={`p-4 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-rose-500 bg-rose-50/60 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[11px] font-bold text-rose-600 uppercase">
                      Reel 0{idx + 1}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] bg-gradient-to-r from-rose-600 to-orange-500 text-white px-2 py-0.5 rounded font-bold uppercase">
                        Active
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-0.5">{vid.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-1">{vid.subtitle}</p>
                </div>
              );
            })}

            <div className="p-4 rounded-lg bg-gradient-to-br from-amber-50/70 via-white to-sky-50/70 border border-slate-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-sky-700 uppercase tracking-wider mb-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Quality Standards</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>Zero-grit high-shear pigment milling</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Elastic polymer crack prevention</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>High scrub &amp; wash endurance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
