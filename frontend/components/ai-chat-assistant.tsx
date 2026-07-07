"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Send,
  X,
  ArrowRight,
  Newspaper,
  TrendingUp,
  BarChart3,
  FileText,
  Briefcase,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  actions?: { label: string; href: string; icon: React.ReactNode }[];
}

const PAGE_MAP: Record<string, { label: string; href: string; keywords: string[]; icon: React.ReactNode }> = {
  industry: {
    label: "Industry News",
    href: "/industry",
    keywords: ["industry news", "trends", "market", "news"],
    icon: <Newspaper className="w-4 h-4" />,
  },
  dashboard: {
    label: "Dashboard",
    href: "/dashboard",
    keywords: ["dashboard", "overview", "home", "main page"],
    icon: <BarChart3 className="w-4 h-4" />,
  },
  gap: {
    label: "Skill Gap Analysis",
    href: "/gap-analysis",
    keywords: ["gap", "skill gap", "analysis", "compare", "missing skills"],
    icon: <FileText className="w-4 h-4" />,
  },
  demand: {
    label: "Current Demand",
    href: "/demand",
    keywords: ["demand", "jobs", "hiring", "market demand", "requirements"],
    icon: <Briefcase className="w-4 h-4" />,
  },
  analysis: {
    label: "Analysis",
    href: "/analysis",
    keywords: ["analysis", "analyze", "breakdown", "skills", "trending"],
    icon: <TrendingUp className="w-4 h-4" />,
  },
};

function detectNavigation(content: string): { label: string; href: string; icon: React.ReactNode }[] {
  const lower = content.toLowerCase();
  const actions: { label: string; href: string; icon: React.ReactNode }[] = [];
  for (const key in PAGE_MAP) {
    const page = PAGE_MAP[key];
    if (page.keywords.some((kw) => lower.includes(kw))) {
      actions.push({ label: page.label, href: page.href, icon: page.icon });
    }
  }
  return actions;
}

function generateLocalResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase();

  if (lower.includes("hello") || lower.includes("hi")) {
    return "Hello! I'm your AI assistant. How can I help you today? I can help you navigate to different sections of the platform.";
  }
  if (lower.includes("news") || lower.includes("trend")) {
    return "I can help you find the latest industry news and trends. Would you like me to take you to the Industry News page?";
  }
  if (lower.includes("gap") || lower.includes("missing")) {
    return "I can analyze your curriculum against industry requirements to find skill gaps. Shall we go to the Skill Gap Analysis page?";
  }
  if (lower.includes("demand") || lower.includes("job")) {
    return "I can show you the current job market demand for different skills. Would you like to see the Current Demand page?";
  }
  if (lower.includes("dashboard") || lower.includes("overview")) {
    return "The Dashboard gives you a complete overview. Let me take you there!";
  }
  if (lower.includes("analysis") || lower.includes("breakdown")) {
    return "The Analysis page shows detailed industry skill breakdowns. Would you like to explore it?";
  }
  if (lower.includes("help") || lower.includes("what can you do")) {
    return "I can help you navigate the platform! Try asking me about: industry news, skill gaps, current demand, or the dashboard.";
  }
  return "I can help you navigate around the platform. Try asking about industry news, skill gaps, current demand, or the dashboard!";
}

export default function AiChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi there! I'm your AI assistant. Ask me anything about navigating the platform. I can help you find industry news, skill gaps, or the dashboard.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const responseText = generateLocalResponse(userMsg.content);
    const navActions = detectNavigation(userMsg.content);

    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: responseText,
      actions: navActions.length > 0 ? navActions : undefined,
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, assistantMsg]);
      setIsLoading(false);
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const navigate = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? "bg-white/10 rotate-90"
            : "bg-[#6366F1] hover:bg-[#4F46E5]"
        }`}
        title="AI Assistant"
      >
        <Sparkles className="w-5 h-5 text-white" />
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-[480px] bg-[#13131C] rounded-xl shadow-2xl flex flex-col overflow-hidden border border-white/5">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#6366F1]/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#6366F1]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">AI Assistant</h3>
                <p className="text-xs text-white/40">Explaining navigation</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-white/5 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-white/50" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-lg bg-[#6366F1]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#6366F1]" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#6366F1] text-white"
                      : "bg-[#1C1C2A] text-white/80"
                  }`}
                >
                  <p>{msg.content}</p>
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {msg.actions.map((action, i) => (
                        <button
                          key={i}
                          onClick={() => navigate(action.href)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#6366F1]/10 hover:bg-[#6366F1]/20 text-[#818CF8] rounded-lg text-xs transition-colors"
                        >
                          {action.icon}
                          <span>{action.label}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#6366F1]/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-[#6366F1] animate-pulse" />
                </div>
                <div className="bg-[#1C1C2A] rounded-xl px-3.5 py-2.5">
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/5">
            <div className="flex items-center gap-2 bg-[#1C1C2A] rounded-lg px-3 py-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-white/30"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="p-1.5 bg-[#6366F1] hover:bg-[#4F46E5] rounded-md transition-colors disabled:opacity-40"
              >
                <Send className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
            <p className="text-[10px] text-white/20 mt-2 text-center">
              Powered by Explainable AI
            </p>
          </div>
        </div>
      )}
    </>
  );
}
