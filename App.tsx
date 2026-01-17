
import React, { useState, useEffect } from 'react';
import { Grade } from './types';
import { SUBJECTS } from './constants';
import Header from './components/Header';
import GradeSelector from './components/GradeSelector';
import ChatInterface from './components/ChatInterface';

const App: React.FC = () => {
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.body.style.background = "#0f172a";
    } else {
      document.body.style.background = "#ffffff";
    }
  }, [isDarkMode]);

  const handleHome = () => {
    setSelectedGrade(null);
    setSelectedSubject(null);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-all duration-500 overflow-hidden ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
      {!selectedSubject && <Header onHome={handleHome} toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />}

      <main className="flex-1 relative flex flex-col overflow-hidden">
        {!selectedGrade ? (
          <div className="max-w-6xl mx-auto w-full p-4 md:p-8 overflow-y-auto">
            <GradeSelector onSelect={setSelectedGrade} isDarkMode={isDarkMode} />
          </div>
        ) : !selectedSubject ? (
          <div className="max-w-6xl mx-auto w-full p-4 md:p-8 animate-pop text-right overflow-y-auto">
            <div className="flex justify-between items-center mb-10">
               <h2 className={`text-2xl md:text-3xl font-black ${isDarkMode ? 'text-white' : 'text-purple-900'}`}>
                اختر المادة لـ <span className="text-purple-600">{selectedGrade.name}</span>
              </h2>
              <button 
                onClick={() => setSelectedGrade(null)}
                className="bg-purple-600 text-white px-5 py-2 rounded-2xl hover:bg-purple-700 transition-all flex items-center gap-2 font-bold shadow-lg shadow-purple-200"
              >
                <i className="fa-solid fa-arrow-right"></i> السابق
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {SUBJECTS.map((sub, idx) => (
                <button
                  key={sub.name}
                  onClick={() => setSelectedSubject(sub.name)}
                  className={`glass-card p-6 md:p-8 group hover:-translate-y-1 transition-all duration-300 text-center ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-purple-50'}`}
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-purple-50 text-purple-600 rounded-[24px] flex items-center justify-center text-2xl md:text-3xl mx-auto mb-4 md:mb-6 transition-all group-hover:bg-purple-600 group-hover:text-white">
                    <i className={sub.icon}></i>
                  </div>
                  <h3 className={`text-lg md:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-purple-900'}`}>{sub.name}</h3>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col w-full h-full bg-white">
             {/* Back button for chat mode */}
             <button 
                onClick={() => setSelectedSubject(null)}
                className="fixed top-4 left-4 z-[100] bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-xl border border-white/20 hover:bg-white/20 transition-all text-sm font-bold"
              >
                <i className="fa-solid fa-chevron-left mr-2"></i> خروج
              </button>
              <ChatInterface grade={selectedGrade} subject={selectedSubject} isDarkMode={isDarkMode} />
          </div>
        )}
      </main>

      {!selectedSubject && (
        <footer className={`py-6 text-center text-xs mt-4 border-t ${isDarkMode ? 'text-slate-500 border-slate-800' : 'text-purple-300 border-purple-50'}`}>
            <p className="font-bold">مستقبلي &copy; 2025 - رفيقك نحو الامتياز</p>
        </footer>
      )}
    </div>
  );
};

export default App;
