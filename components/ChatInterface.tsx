
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Message, Grade } from '../types';
import { getGeminiResponse } from '../geminiService';

// Extend Window interface for Prism
declare global {
  interface Window {
    Prism: any;
  }
}

interface ChatInterfaceProps {
  grade: Grade;
  subject: string;
  isDarkMode: boolean;
}

// Optimized Message Item Component to prevent re-renders of the entire list
const MessageItem = React.memo(({ m, i, isDarkMode, onCopy, copiedIndex }: { 
  m: Message, 
  i: number, 
  isDarkMode: boolean, 
  onCopy: (text: string, index: number) => void,
  copiedIndex: number | null
}) => {
  const isUser = m.role === 'user';
  
  // Format content only once or when content changes
  const formattedContent = useMemo(() => {
    if (m.role !== 'assistant') return m.content;
    const parts = m.content.split(/(```[\s\S]*?```)/g);
    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        const match = part.match(/```(\w+)?\n([\s\S]*?)```/);
        const lang = match?.[1] || 'javascript';
        const code = match?.[2] || part.slice(3, -3);
        return (
          <pre key={index} className={`language-${lang} rounded-xl overflow-hidden my-2 shadow-inner`}>
            <code className={`language-${lang}`}>{code.trim()}</code>
          </pre>
        );
      }
      return <span key={index}>{part}</span>;
    });
  }, [m.content, m.role]);

  return (
    <div className={`flex ${isUser ? 'justify-start' : 'justify-end'} mb-4 will-change-transform animate-pop`}>
      <div className={`relative group max-w-[88%] md:max-w-[75%] p-4 rounded-[22px] shadow-sm text-right transition-all duration-200 ${
        isUser 
        ? 'bg-[#00ced1] text-white rounded-tr-none' 
        : `${isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-800'} border border-[#b2ebec] rounded-tl-none`
      }`}>
        <button
          onClick={() => onCopy(m.content, i)}
          className={`absolute top-2 ${isUser ? 'right-2' : 'left-2'} opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/10 hover:bg-black/20 backdrop-blur-sm w-7 h-7 rounded-lg flex items-center justify-center text-[10px] z-10 ${copiedIndex === i ? 'text-green-400' : 'text-current'}`}
          title="نسخ"
        >
          <i className={`fa-solid ${copiedIndex === i ? 'fa-check' : 'fa-copy'}`}></i>
        </button>

        <div className="text-sm md:text-base font-medium leading-relaxed break-words">
          {formattedContent}
        </div>
      </div>
    </div>
  );
});

const ChatInterface: React.FC<ChatInterfaceProps> = ({ grade, subject, isDarkMode }) => {
  const teacherName = `أستاذ ${subject}`;
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: `أهلاً بك يا بطل! أنا ${teacherName}، كيف أساعدك اليوم؟ 📚✍️` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Use RequestAnimationFrame for ultra-smooth scrolling
  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
    // Batch highlight calls for better performance
    const timer = setTimeout(() => {
      // Fix: Check window.Prism using type-safe check or cast
      if (window.Prism && chatContainerRef.current) {
        window.Prism.highlightAllUnder(chatContainerRef.current);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [messages, loading, scrollToBottom]);

  const handleImageSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsProcessingImage(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setSelectedImage(base64String);
        setIsProcessingImage(false);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleCopy = useCallback((text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  }, []);

  const handleSend = async () => {
    if ((!input.trim() && !selectedImage) || loading || isProcessingImage) return;

    const currentImage = selectedImage;
    const currentInput = input;
    
    setMessages(prev => [...prev, { 
      role: 'user', 
      content: currentImage ? `[صورة] ${currentInput}` : currentInput 
    }]);
    
    setInput('');
    setSelectedImage(null);
    setLoading(true);

    const response = await getGeminiResponse(currentInput, grade.name, subject, currentImage || undefined);
    setMessages(prev => [...prev, { role: 'assistant', content: response || "عذراً، حدث خطأ." }]);
    setLoading(false);
  };

  return (
    <div className={`flex flex-col h-full w-full overflow-hidden ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}>
      {/* Optimized sticky header */}
      <div className="bg-[#00ced1] py-3 px-5 text-white flex items-center justify-between shadow-md shrink-0 z-20">
        <div className="flex items-center gap-3 flex-row-reverse">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border border-white/20">
            <i className="fa-solid fa-user-tie text-lg"></i>
          </div>
          <div className="text-right">
            <h3 className="font-bold text-sm leading-none">{teacherName}</h3>
            <span className="text-[9px] opacity-80 font-bold uppercase tracking-wider">Oustadi AI</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${loading ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`}></div>
            <span className="text-[10px] font-bold">{loading ? 'جاري التفكير...' : 'متصل'}</span>
        </div>
      </div>

      {/* Main chat area with GPU acceleration */}
      <div className={`flex-1 overflow-y-auto px-4 py-6 space-y-2 will-change-scroll scroll-smooth ${isDarkMode ? 'bg-slate-900/50' : 'bg-[#e0fbfb]/5'}`}>
        <div ref={chatContainerRef}>
          {messages.map((m, i) => (
            <MessageItem 
              key={i} 
              m={m} 
              i={i} 
              isDarkMode={isDarkMode} 
              onCopy={handleCopy} 
              copiedIndex={copiedIndex} 
            />
          ))}
        </div>
        
        {loading && (
          <div className="flex justify-end animate-pulse">
            <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} px-4 py-2 rounded-full border border-[#b2ebec] shadow-sm`}>
               <span className="text-[11px] font-black text-[#00ced1]">الأستاذ يحضر الجواب...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} className="h-4" />
      </div>

      {/* Simplified Footer for speed */}
      <div className={`p-4 border-t shrink-0 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-[#b2ebec]'}`}>
        {selectedImage && (
          <div className="mb-3 flex justify-end">
            <div className="relative">
              <img src={`data:image/jpeg;base64,${selectedImage}`} className="w-20 h-24 object-cover rounded-xl border-2 border-[#00ced1]" />
              <button onClick={() => setSelectedImage(null)} className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full text-[10px] shadow-lg border-2 border-white">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>
        )}

        <div className={`flex items-center gap-2 rounded-2xl px-3 py-1 border transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-[#e0fbfb]/20 border-[#b2ebec]'}`}>
          <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageSelect} />
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={loading || isProcessingImage}
            className="text-[#00ced1] p-2 hover:scale-110 active:scale-95 transition-transform"
          >
            <i className="fa-solid fa-camera text-lg"></i>
          </button>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={loading}
            placeholder="اسأل أستاذك..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-right text-sm font-bold placeholder:opacity-40 py-2"
          />
          
          <button 
            onClick={handleSend}
            disabled={loading || isProcessingImage || (!input.trim() && !selectedImage)}
            className="w-10 h-10 bg-[#00ced1] text-white rounded-xl hover:brightness-110 active:scale-90 transition-all flex items-center justify-center disabled:opacity-30"
          >
            <i className={`fa-solid ${loading ? 'fa-spinner fa-spin' : 'fa-paper-plane'} text-sm`}></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
