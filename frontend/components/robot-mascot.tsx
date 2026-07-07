"use client";

import { useEffect, useState } from "react";

interface FetchStatus {
  is_fetching: boolean;
  last_fetch?: any;
  total_records?: number;
  interval_minutes?: number;
}

export default function RobotMascot() {
  const [status, setStatus] = useState<FetchStatus>({
    is_fetching: false,
  });
  const [tooltip, setTooltip] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  // Robot animation states
  const [animationState, setAnimationState] = useState<
    "idle" | "thinking" | "fetching" | "success"
  >("idle");

  useEffect(() => {
    // Fetch status on mount
    fetchStatus();

    // Poll for status updates every 5 seconds
    const interval = setInterval(fetchStatus, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchStatus = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/fetch-status");
      const data = await res.json();
      setStatus(data);

      // Update animation based on fetch status
      if (data.is_fetching) {
        setAnimationState("fetching");
      } else if (data.last_fetch) {
        const lastFetchTime = data.last_fetch.toDate
          ? data.last_fetch.toDate()
          : new Date(data.last_fetch);
        const now = new Date();
        const diffMinutes = Math.floor(
          (now.getTime() - lastFetchTime.getTime()) / 60000
        );

        if (diffMinutes < 2) {
          setAnimationState("success");
          setTimeout(() => setAnimationState("idle"), 2000);
        } else {
          setAnimationState("idle");
        }

        // Update tooltip
        setTooltip(
          `Last fetch: ${diffMinutes}m ago | Next: ${
            data.interval_minutes ? data.interval_minutes - diffMinutes : 30
          }m | Records: ${data.total_records || 0}`
        );
      }
    } catch (error) {
      console.error("Failed to fetch status:", error);
      setAnimationState("idle");
      setTooltip("SLM offline - connect to backend");
    }
  };

  const handleManualFetch = async () => {
    setAnimationState("fetching");
    try {
      await fetch("http://localhost:5000/api/auto-fetch", {
        method: "POST",
      });
      setTooltip("Fetching data from AICTE, LinkedIn, Twitter...");
    } catch (error) {
      console.error("Failed to trigger fetch:", error);
      setAnimationState("idle");
    }
  };

  // Robot SVG components
  const RobotIdle = () => (
    <svg viewBox="0 0 100 100" className="w-16 h-16">
      {/* Body */}
      <rect x="30" y="40" width="40" height="35" rx="8" fill="#60A5FA" />
      {/* Head */}
      <rect x="35" y="15" width="30" height="25" rx="6" fill="#93C5FD" />
      {/* Eyes */}
      <circle cx="43" cy="25" r="3" fill="#1E3A8A" className="animate-pulse" />
      <circle cx="57" cy="25" r="3" fill="#1E3A8A" className="animate-pulse" />
      {/* Antenna */}
      <line x1="50" y1="15" x2="50" y2="5" stroke="#60A5FA" strokeWidth="2" />
      <circle cx="50" cy="5" r="4" fill="#3B82F6" className="animate-pulse" />
      {/* Mouth */}
      <path d="M 42 32 Q 50 35 58 32" stroke="#1E3A8A" strokeWidth="2" fill="none" />
      {/* Arms */}
      <path d="M 30 50 Q 20 55 15 45" stroke="#60A5FA" strokeWidth="4" fill="none" />
      <path d="M 70 50 Q 80 55 85 45" stroke="#60A5FA" strokeWidth="4" fill="none" />
      {/* Legs */}
      <path d="M 40 75 L 40 90" stroke="#60A5FA" strokeWidth="4" />
      <path d="M 60 75 L 60 90" stroke="#60A5FA" strokeWidth="4" />
    </svg>
  );

  const RobotThinking = () => (
    <svg viewBox="0 0 100 100" className="w-16 h-16">
      {/* Body */}
      <rect x="30" y="40" width="40" height="35" rx="8" fill="#A78BFA" />
      {/* Head */}
      <rect x="35" y="15" width="30" height="25" rx="6" fill="#C4B5FD" />
      {/* Eyes - looking up */}
      <circle cx="43" cy="23" r="3" fill="#4C1D95" />
      <circle cx="57" cy="23" r="3" fill="#4C1D95" />
      {/* Antenna with thinking glow */}
      <line x1="50" y1="15" x2="50" y2="5" stroke="#A78BFA" strokeWidth="2" />
      <circle cx="50" cy="5" r="4" fill="#8B5CF6" className="animate-ping" />
      {/* Thought bubble */}
      <circle cx="70" cy="10" r="3" fill="#C4B5FD" className="animate-pulse" />
      <circle cx="78" cy="5" r="2" fill="#C4B5FD" className="animate-pulse" />
      {/* Mouth - small o */}
      <circle cx="50" cy="33" r="2" fill="#4C1D95" />
      {/* Arms - one up */}
      <path d="M 30 50 Q 20 40 15 35" stroke="#A78BFA" strokeWidth="4" fill="none" />
      <path d="M 70 50 Q 80 45 85 40" stroke="#A78BFA" strokeWidth="4" fill="none" />
    </svg>
  );

  const RobotFetching = () => (
    <svg viewBox="0 0 100 100" className="w-16 h-16">
      {/* Body with spinning effect */}
      <rect x="30" y="40" width="40" height="35" rx="8" fill="#34D399" className="animate-pulse" />
      {/* Head */}
      <rect x="35" y="15" width="30" height="25" rx="6" fill="#6EE7B7" />
      {/* Eyes - wide */}
      <circle cx="43" cy="25" r="4" fill="#065F46" className="animate-pulse" />
      <circle cx="57" cy="25" r="4" fill="#065F46" className="animate-pulse" />
      {/* Antenna spinning */}
      <line x1="50" y1="15" x2="50" y2="5" stroke="#34D399" strokeWidth="2" />
      <circle cx="50" cy="5" r="4" fill="#10B981" className="animate-spin" style={{ transformOrigin: '50% 50%' }} />
      {/* Data waves */}
      <path d="M 10 30 Q 15 25 20 30 T 30 30" stroke="#34D399" strokeWidth="2" fill="none" className="animate-pulse" />
      <path d="M 10 40 Q 15 35 20 40 T 30 40" stroke="#34D399" strokeWidth="2" fill="none" className="animate-pulse" style={{ animationDelay: '0.1s' }} />
      <path d="M 10 50 Q 15 45 20 50 T 30 50" stroke="#34D399" strokeWidth="2" fill="none" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
      {/* Mouth - straight */}
      <line x1="45" y1="33" x2="55" y2="33" stroke="#065F46" strokeWidth="2" />
      {/* Arms - reaching */}
      <path d="M 30 50 Q 15 50 10 40" stroke="#34D399" strokeWidth="4" fill="none" className="animate-pulse" />
      <path d="M 70 50 Q 85 50 90 40" stroke="#34D399" strokeWidth="4" fill="none" className="animate-pulse" />
    </svg>
  );

  const RobotSuccess = () => (
    <svg viewBox="0 0 100 100" className="w-16 h-16">
      {/* Body */}
      <rect x="30" y="40" width="40" height="35" rx="8" fill="#FBBF24" />
      {/* Head */}
      <rect x="35" y="15" width="30" height="25" rx="6" fill="#FCD34D" />
      {/* Eyes - happy curves */}
      <path d="M 40 23 Q 43 20 46 23" stroke="#78350F" strokeWidth="2" fill="none" />
      <path d="M 54 23 Q 57 20 60 23" stroke="#78350F" strokeWidth="2" fill="none" />
      {/* Antenna with star */}
      <line x1="50" y1="15" x2="50" y2="5" stroke="#FBBF24" strokeWidth="2" />
      <polygon points="50,0 52,4 57,4 53,7 54,12 50,9 46,12 47,7 43,4 48,4" fill="#F59E0B" className="animate-ping" />
      {/* Big smile */}
      <path d="M 40 30 Q 50 38 60 30" stroke="#78350F" strokeWidth="2" fill="none" />
      {/* Arms up in celebration */}
      <path d="M 30 50 Q 20 35 15 25" stroke="#FBBF24" strokeWidth="4" fill="none" />
      <path d="M 70 50 Q 80 35 85 25" stroke="#FBBF24" strokeWidth="4" fill="none" />
      {/* Sparkles */}
      <circle cx="20" cy="20" r="2" fill="#FCD34D" className="animate-ping" />
      <circle cx="80" cy="20" r="2" fill="#FCD34D" className="animate-ping" style={{ animationDelay: '0.2s' }} />
    </svg>
  );

  const getRobotComponent = () => {
    switch (animationState) {
      case "thinking":
        return <RobotThinking />;
      case "fetching":
        return <RobotFetching />;
      case "success":
        return <RobotSuccess />;
      default:
        return <RobotIdle />;
    }
  };

  const getStateColor = () => {
    switch (animationState) {
      case "fetching":
        return "bg-green-500/20 border-green-500/50";
      case "success":
        return "bg-yellow-500/20 border-yellow-500/50";
      case "thinking":
        return "bg-purple-500/20 border-purple-500/50";
      default:
        return "bg-blue-500/20 border-blue-500/50";
    }
  };

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 cursor-pointer transition-all duration-300 hover:scale-110 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleManualFetch}
      title={tooltip || "SLM Auto-Fetcher - Click to fetch now"}
    >
      {/* Robot container with glow effect */}
      <div
        className={`relative p-3 rounded-2xl backdrop-blur-md border-2 shadow-lg ${getStateColor()}`}
      >
        {/* Robot */}
        {getRobotComponent()}

        {/* Status indicator dot */}
        <div
          className={`absolute top-2 right-2 w-3 h-3 rounded-full ${
            animationState === "fetching"
              ? "bg-green-500 animate-ping"
              : animationState === "success"
              ? "bg-yellow-500"
              : "bg-blue-500"
          }`}
        />

        {/* Tooltip */}
        {tooltip && (
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
            {tooltip}
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900" />
          </div>
        )}

        {/* Loading spinner overlay during fetch */}
        {animationState === "fetching" && (
          <div className="absolute inset-0 rounded-2xl border-2 border-green-500/30 animate-ping" />
        )}
      </div>

      {/* Mini info panel */}
      <div className="absolute bottom-20 right-0 bg-gray-900/80 backdrop-blur-sm text-white text-xs rounded-lg px-3 py-2 shadow-lg">
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              animationState === "fetching"
                ? "bg-green-500 animate-pulse"
                : "bg-blue-500"
            }`}
          />
          <span>
            {animationState === "fetching"
              ? "🔄 Fetching data..."
              : animationState === "success"
              ? "✅ Data updated"
              : "📡 SLM Ready"}
          </span>
        </div>
      </div>
    </div>
  );
}