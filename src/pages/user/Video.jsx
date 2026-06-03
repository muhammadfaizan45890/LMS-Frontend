// import React, { useRef, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import YouTube from "react-youtube";

// const Video = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const youtubeUrl = location.state?.youtubeUrl;
//   const playerRef = useRef(null);

//   const [duration, setDuration] = useState(0);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [playing, setPlaying] = useState(true);

//   // extract video id
//   const getVideoId = (url) => {
//     if (!url) return null;

//     const regex =
//       /(?:youtube\.com.*(?:v=|\/embed\/|\/shorts\/)|youtu\.be\/)([^&?/\s]+)/;

//     const match = url.match(regex);
//     return match ? match[1] : null;
//   };

//   const videoId = getVideoId(youtubeUrl);

//   // player ready
//   const onReady = (event) => {
//     playerRef.current = event.target;
//     setDuration(event.target.getDuration());

//     const interval = setInterval(() => {
//       if (playerRef.current) {
//         setCurrentTime(playerRef.current.getCurrentTime());
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   };

//   // controls
//   const handlePlayPause = () => {
//     if (!playerRef.current) return;

//     if (playing) {
//       playerRef.current.pauseVideo();
//     } else {
//       playerRef.current.playVideo();
//     }
//     setPlaying(!playing);
//   };

//   const forward10 = () => {
//     playerRef.current?.seekTo(currentTime + 10, true);
//   };

//   const backward10 = () => {
//     playerRef.current?.seekTo(currentTime - 10, true);
//   };

//   const formatTime = (t) => {
//     if (!t) return "0:00";
//     const m = Math.floor(t / 60);
//     const s = Math.floor(t % 60);
//     return `${m}:${s < 10 ? "0" : ""}${s}`;
//   };

//   return (
//     <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-6">

//       {/* STOP BUTTON */}
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-6 px-6 py-2 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition"
//       >
//         ⬅ Stop Video
//       </button>

//       {/* VIDEO WRAPPER */}
//       <div className="w-full flex justify-center">
//         <div className="w-full max-w-7xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-700">

//           {videoId ? (
//             <div className="w-full h-full pointer-events-none">
//               <YouTube
//                 videoId={videoId}
//                 className="w-full h-full"
//                 opts={{
//                   width: "100%",
//                   height: "100%",
//                   playerVars: {
//                     autoplay: 1,
//                     controls: 0,      // ❌ no YouTube controls
//                     rel: 0,           // ❌ no related videos
//                     modestbranding: 1,
//                     fs: 0,
//                     disablekb: 1,
//                     iv_load_policy: 3,
//                   },
//                 }}
//                 onReady={onReady}
//               />
//             </div>
//           ) : (
//             <div className="text-white flex items-center justify-center h-full">
//               No video found
//             </div>
//           )}
//         </div>
//       </div>

//       {/* CUSTOM CONTROLS */}
//       <div className="mt-8 flex flex-col items-center gap-3 text-white">

//         <div className="flex gap-4">
//           <button onClick={backward10} className="px-5 py-2 bg-gray-700 rounded-lg">
//             ⏪ 10s
//           </button>

//           <button onClick={handlePlayPause} className="px-6 py-2 bg-white text-black rounded-lg font-semibold">
//             {playing ? "Pause" : "Play"}
//           </button>

//           <button onClick={forward10} className="px-5 py-2 bg-gray-700 rounded-lg">
//             10s ⏩
//           </button>
//         </div>

//         <div className="text-sm text-gray-300">
//           ⏱ {formatTime(currentTime)} / {formatTime(duration)}
//         </div>

//         <div className="text-sm text-gray-400">
//           Remaining: {formatTime(duration - currentTime)}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Video;









import React, { useRef, useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import YouTube from "react-youtube";

const Video = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const youtubeUrl = location.state?.youtubeUrl;
  const playerRef = useRef(null);
  const intervalRef = useRef(null);

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [playerReady, setPlayerReady] = useState(false);
  const [videoId, setVideoId] = useState(null);

  // extract video id
  const getVideoId = useCallback((url) => {
    if (!url) return null;
    const regex = /(?:youtube\.com.*(?:v=|\/embed\/|\/shorts\/)|youtu\.be\/)([^&?/\s]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }, []);

  useEffect(() => {
    const id = getVideoId(youtubeUrl);
    setVideoId(id);
  }, [youtubeUrl, getVideoId]);

  // update current time every second when playing
  useEffect(() => {
    if (playerReady && playing) {
      intervalRef.current = setInterval(() => {
        if (playerRef.current && typeof playerRef.current.getCurrentTime === "function") {
          setCurrentTime(playerRef.current.getCurrentTime());
        }
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playerReady, playing]);

  // pause video when component unmounts
  useEffect(() => {
    return () => {
      if (playerRef.current && typeof playerRef.current.pauseVideo === "function") {
        playerRef.current.pauseVideo();
      }
    };
  }, []);

  const onReady = (event) => {
    playerRef.current = event.target;
    setDuration(event.target.getDuration());
    setPlayerReady(true);
    // start playing if autoplay was requested
    if (event.target.playVideo) {
      event.target.playVideo();
      setPlaying(true);
    }
  };

  const handlePlayPause = () => {
    if (!playerRef.current) return;
    if (playing) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
    setPlaying(!playing);
  };

  const forward10 = () => {
    if (playerRef.current) {
      const newTime = Math.min(currentTime + 10, duration);
      playerRef.current.seekTo(newTime, true);
      setCurrentTime(newTime);
    }
  };

  const backward10 = () => {
    if (playerRef.current) {
      const newTime = Math.max(currentTime - 10, 0);
      playerRef.current.seekTo(newTime, true);
      setCurrentTime(newTime);
    }
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    if (playerRef.current) {
      playerRef.current.seekTo(seekTime, true);
      setCurrentTime(seekTime);
    }
  };

  const formatTime = (t) => {
    if (!t || isNaN(t)) return "0:00";
    const mins = Math.floor(t / 60);
    const secs = Math.floor(t % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // fullscreen
  const toggleFullscreen = () => {
    const container = document.getElementById("video-container");
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(err => console.warn(err));
    } else {
      document.exitFullscreen();
    }
  };

  if (!videoId) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🎬</div>
          <h2 className="text-2xl font-bold mb-2">No Video Found</h2>
          <p className="text-gray-400 mb-6">The video link is invalid or missing.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-white text-black rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-4 sm:py-6">
      {/* Stop button – always accessible */}
      <div className="w-full max-w-7xl flex justify-start mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition backdrop-blur-sm text-sm sm:text-base"
        >
          <span>←</span> Stop Video
        </button>
      </div>

      {/* Video container with fullscreen support */}
      <div
        id="video-container"
        className="w-full max-w-7xl aspect-video bg-black rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-gray-800"
      >
        {videoId && (
          <YouTube
            videoId={videoId}
            className="w-full h-full"
            opts={{
              width: "100%",
              height: "100%",
              playerVars: {
                autoplay: 1,
                controls: 0,          // hide YouTube native controls
                rel: 0,
                modestbranding: 1,
                fs: 0,                // we'll use our own fullscreen
                disablekb: 1,
                iv_load_policy: 3,
              },
            }}
            onReady={onReady}
          />
        )}
      </div>

      {/* Custom controls – fully responsive */}
      {playerReady && (
        <div className="w-full max-w-7xl mt-5 sm:mt-6 space-y-4">
          {/* Progress bar + time */}
          <div className="flex items-center gap-3 flex-wrap">
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-white"
              style={{
                background: `linear-gradient(to right, white 0%, white ${(currentTime / duration) * 100}%, #374151 ${(currentTime / duration) * 100}%, #374151 100%)`,
              }}
            />
            <div className="text-xs sm:text-sm text-gray-300 font-mono whitespace-nowrap">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          {/* Control buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={backward10}
              className="flex items-center gap-1 px-4 py-2 sm:px-5 sm:py-2.5 bg-gray-800 hover:bg-gray-700 rounded-xl text-white font-medium transition text-sm sm:text-base"
            >
              <span>⏪</span> 10s
            </button>

            <button
              onClick={handlePlayPause}
              className="flex items-center gap-1 px-6 py-2.5 sm:px-8 sm:py-3 bg-white text-black rounded-xl font-bold transition hover:bg-gray-200 text-base sm:text-lg"
            >
              {playing ? "⏸ Pause" : "▶ Play"}
            </button>

            <button
              onClick={forward10}
              className="flex items-center gap-1 px-4 py-2 sm:px-5 sm:py-2.5 bg-gray-800 hover:bg-gray-700 rounded-xl text-white font-medium transition text-sm sm:text-base"
            >
              10s <span>⏩</span>
            </button>

            <button
              onClick={toggleFullscreen}
              className="flex items-center gap-1 px-4 py-2 sm:px-5 sm:py-2.5 bg-gray-800 hover:bg-gray-700 rounded-xl text-white font-medium transition text-sm sm:text-base"
            >
              <span>🗖</span> Fullscreen
            </button>
          </div>

          {/* Remaining time (optional) */}
          <div className="text-center text-xs text-gray-500">
            Remaining: {formatTime(duration - currentTime)}
          </div>
        </div>
      )}

      {/* Loading indicator while player is not ready */}
      {!playerReady && videoId && (
        <div className="w-full max-w-7xl mt-5 text-center text-gray-400 text-sm animate-pulse">
          Loading player...
        </div>
      )}
    </div>
  );
};

export default Video;
