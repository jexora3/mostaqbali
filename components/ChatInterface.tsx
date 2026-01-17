
import React, { useState, useRef, useEffect } from 'react';
import { Message, Grade } from '../types';
import { getGeminiResponse } from '../geminiService';

interface ChatInterfaceProps {
  grade: Grade;
  subject: string;
  isDarkMode: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ grade, subject, isDarkMode }) => {
  const teacherName = `أستاذ ${subject}`;
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: `أهلاً بك يا بطل! أنا ${teacherName}، كيف يمكنني مساعدتك في التفوق اليوم؟ يمكنك أيضاً تصوير تمارينك وإرسالها لي.` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, loading]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setSelectedImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if ((!input.trim() && !selectedImage) || loading) return;

    const userMsg: Message = { 
      role: 'user', 
      content: selectedImage ? `[صورة مرفقة] ${input}` : input 
    };
    
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    const currentImage = selectedImage;
    
    setInput('');
    setSelectedImage(null);
    setLoading(true);

    const response = await getGeminiResponse(currentInput, grade.name, subject, currentImage || undefined);
    setMessages(prev => [...prev, { role: 'assistant', content: response || "عذراً، حدث خطأ. حاول مرة أخرى." }]);
    setLoading(false);
  };

  return (
    <div className={`flex flex-col h-full w-full transition-colors ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
      {/* Header Inside Chat */}
      <div className="bg-purple-600 p-4 md:p-6 text-white flex items-center justify-between shadow-lg z-10">
        <div className="flex items-center gap-4 flex-row-reverse">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center border border-white/30 shadow-inner">
            <i className="fa-solid fa-user-tie text-xl"></i>
          </div>
          <div className="text-right">
            <h3 className="font-bold text-lg leading-none">{teacherName}</h3>
            <span className="text-[10px] bg-white text-purple-600 px-2 py-0.5 rounded-full font-black mt-1 inline-block">خبير المادة</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs font-semibold">نشط</span>
        </div>
      </div>

      {/* Messages Area */}
      <div ref={scrollRef} className={`flex-1 p-4 md:p-8 overflow-y-auto space-y-6 ${isDarkMode ? 'bg-slate-950' : 'bg-purple-50/10'}`}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'} animate-pop`}>
            <div className={`max-w-[85%] md:max-w-[70%] p-4 md:p-5 rounded-[24px] shadow-sm text-right leading-relaxed ${
              m.role === 'user' 
              ? 'bg-purple-600 text-white rounded-tr-none' 
              : `${isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-800'} border border-purple-100 rounded-tl-none`
            }`}>
              <p className="text-sm md:text-base font-semibold whitespace-pre-wrap">{m.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-end">
            <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} px-6 py-4 rounded-full border border-purple-100 shadow-sm flex items-center gap-2`}>
               <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
               </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className={`p-4 md:p-6 border-t ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-purple-50'}`}>
        {selectedImage && (
          <div className="mb-4 flex justify-end animate-pop">
            <div className="relative group">
              <img 
                src={`data:image/jpeg;base64,${selectedImage}`} 
                alt="معاينة" 
                className="w-24 h-24 object-cover rounded-2xl border-2 border-purple-600 shadow-lg"
              />
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-md"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>
        )}

        <div className={`flex items-center gap-3 rounded-3xl px-5 py-2 border transition-all shadow-sm focus-within:shadow-md focus-within:border-purple-400 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-purple-50/50 border-purple-100'}`}>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageSelect}
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="text-purple-600 hover:text-purple-700 transition-colors p-2"
          >
            <i className="fa-solid fa-camera text-xl"></i>
          </button>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="اكتب رسالتك هنا أو أرسل صورة تمرين..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-right text-base font-bold placeholder:text-purple-300 py-3"
          />
          
          <button 
            onClick={handleSend}
            disabled={loading}
            className="w-12 h-12 bg-purple-600 text-white rounded-2xl hover:bg-purple-700 active:scale-95 transition-all flex items-center justify-center disabled:opacity-50"
          >
            <i className="fa-solid fa-paper-plane text-lg"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
