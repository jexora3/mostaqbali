
import React, { useState, useEffect, useCallback } from 'react';
import { Grade } from './types';
import { GET_SUBJECTS_FOR_GRADE } from './constants';
import Header from './components/Header';
import GradeSelector from './components/GradeSelector';
import ChatInterface from './components/ChatInterface';
import Onboarding from './components/Onboarding';

const App: React.FC = () => {
  const [hasKey, setHasKey] = useState<boolean | null>(null);
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [recentSubjects, setRecentSubjects] = useState<string[]>([]);
  const [clickingSubject, setClickingSubject] = useState<string | null>(null);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // Helper to scroll page to top
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    const checkState = async () => {
      if (typeof window !== 'undefined' && (window as any).aistudio) {
        const keyExists = await (window as any).aistudio.hasSelectedApiKey();
        setHasKey(keyExists);
      } else {
        setHasKey(true); 
      }

      const savedOnboarding = localStorage.getItem('onboarding_complete');
      const savedUserData = localStorage.getItem('user_data');
      if (savedOnboarding) {
        setIsOnboarded(true);
        if (savedUserData) setUserData(JSON.parse(savedUserData));
      } else {
        setIsOnboarded(false);
      }

      const savedRecents = localStorage.getItem('recent_subjects');
      if (savedRecents) {
        setRecentSubjects(JSON.parse(savedRecents));
      }
    };
    checkState();
  }, []);

  const handleLogin = async () => {
    if (typeof window !== 'undefined' && (window as any).aistudio) {
      await (window as any).aistudio.openSelectKey();
      setHasKey(true);
    }
  };

  const handleOnboardingComplete = (data: any) => {
    localStorage.setItem('onboarding_complete', 'true');
    localStorage.setItem('user_data', JSON.stringify(data));
    setUserData(data);
    setIsOnboarded(true);
    scrollToTop();
  };

  const handleGradeSelect = (grade: Grade) => {
    setSelectedGrade(grade);
    scrollToTop();
  };

  const handleSubjectSelect = (subjectName: string) => {
    setClickingSubject(subjectName);
    setTimeout(() => {
      setSelectedSubject(subjectName);
      setClickingSubject(null);
      scrollToTop();
      
      const updatedRecents = [subjectName, ...recentSubjects.filter(s => s !== subjectName)].slice(0, 4);
      setRecentSubjects(updatedRecents);
      localStorage.setItem('recent_subjects', JSON.stringify(updatedRecents));
    }, 200);
  };

  useEffect(() => {
    document.body.style.background = isDarkMode ? "#0f172a" : "#ffffff";
  }, [isDarkMode]);

  const handleHome = () => {
    setSelectedGrade(null);
    setSelectedSubject(null);
    scrollToTop();
  };

  const handleConfirmExit = () => {
    setSelectedSubject(null);
    setShowExitConfirm(false);
    scrollToTop();
  };

  if (hasKey === false) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-6 transition-all ${isDarkMode ? 'bg-slate-900' : 'bg-[#e0fbfb]/20'}`}>
        <div className={`max-w-md w-full glass-card p-10 text-center space-y-8 animate-pop ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white'}`}>
          <div className="space-y-4">
            <div className="w-20 h-20 bg-[#00ced1] text-white rounded-3xl flex items-center justify-center text-3xl mx-auto shadow-xl shadow-[#00ced1]/30">
              <i className="fa-solid fa-graduation-cap"></i>
            </div>
            <h1 className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>مرحباً بك في أستاذي</h1>
            <p className="text-slate-500 font-medium">سجل دخولك الآن للبدء في رحلة التعلم الذكي والمتميز</p>
          </div>
          <button onClick={handleLogin} className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-center gap-4 hover:border-[#00ced1] hover:bg-[#e0fbfb]/30 transition-all group shadow-sm">
            <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-6 h-6" alt="Google" />
            <span className="font-bold text-slate-700 group-hover:text-[#00ced1]">اختيار مفتاح API</span>
          </button>
        </div>
      </div>
    );
  }

  if (isOnboarded === false) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-6 transition-all ${isDarkMode ? 'bg-slate-900' : 'bg-[#e0fbfb]/20'}`}>
        <Onboarding onComplete={handleOnboardingComplete} isDarkMode={isDarkMode} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col transition-all duration-500 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
      {!selectedSubject && <Header onHome={handleHome} toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />}

      <main className="flex-1 relative flex flex-col">
        {!selectedGrade ? (
          <div className="max-w-6xl mx-auto w-full p-4 md:p-8">
            <div className="mb-10 text-right animate-pop">
              <h2 className="text-2xl font-black text-[#00ced1]">مرحباً، {userData?.name} 👋</h2>
              <p className="text-slate-500">أنت الآن في {userData?.grade?.name} بمدرسة {userData?.school}</p>
            </div>
            <GradeSelector onSelect={handleGradeSelect} isDarkMode={isDarkMode} />
          </div>
        ) : !selectedSubject ? (
          <div className="max-w-6xl mx-auto w-full p-4 md:p-8 animate-pop text-right">
            <div className="flex justify-between items-center mb-6">
               <h2 className={`text-2xl md:text-3xl font-black ${isDarkMode ? 'text-white' : 'text-[#00ced1]'}`}>
                اختر المادة لـ <span className="text-[#00ced1] opacity-70">{selectedGrade.name}</span>
              </h2>
              <button 
                onClick={() => { setSelectedGrade(null); scrollToTop(); }}
                className="bg-[#00ced1] text-white px-5 py-2 rounded-2xl hover:bg-[#00a8a8] transition-all flex items-center gap-2 font-bold shadow-lg shadow-[#00ced1]/20"
              >
                <i className="fa-solid fa-arrow-right"></i> السابق
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pb-10">
              {GET_SUBJECTS_FOR_GRADE(selectedGrade.id).map((sub) => (
                <button
                  key={sub.name}
                  onClick={() => handleSubjectSelect(sub.name)}
                  className={`glass-card p-6 md:p-8 group transition-all duration-300 text-center ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-[#e0fbfb]'} ${clickingSubject === sub.name ? 'scale-95' : 'hover:scale-105 hover:shadow-2xl hover:border-[#00ced1]'}`}
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-[#e0fbfb] text-[#00ced1] rounded-[24px] flex items-center justify-center text-2xl md:text-3xl mx-auto mb-4 md:mb-6 transition-all group-hover:bg-[#00ced1] group-hover:text-white group-hover:-rotate-6">
                    <i className={sub.icon}></i>
                  </div>
                  <h3 className={`text-lg md:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{sub.name}</h3>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col w-full h-[100dvh] bg-white relative">
             <button onClick={() => setShowExitConfirm(true)} className="fixed top-4 left-4 z-[100] bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-xl border border-white/20 hover:bg-white/20 transition-all text-sm font-bold">
                <i className="fa-solid fa-chevron-left mr-2"></i> خروج
              </button>
              {showExitConfirm && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                  <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowExitConfirm(false)}></div>
                  <div className={`relative max-w-sm w-full p-8 rounded-[32px] shadow-2xl animate-pop text-center space-y-6 ${isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-[#b2ebec]'}`}>
                    <h3 className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>هل أنت متأكد من الخروج؟</h3>
                    <div className="flex gap-3 pt-2">
                      <button onClick={handleConfirmExit} className="flex-1 bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600 transition-colors">نعم، خروج</button>
                      <button onClick={() => setShowExitConfirm(false)} className={`flex-1 py-3 rounded-xl font-bold border transition-colors ${isDarkMode ? 'border-slate-600 text-white hover:bg-slate-700' : 'border-slate-100 text-slate-500 hover:bg-slate-50'}`}>إلغاء</button>
                    </div>
                  </div>
                </div>
              )}
              <ChatInterface grade={selectedGrade} subject={selectedSubject} isDarkMode={isDarkMode} />
          </div>
        )}
      </main>

      {!selectedSubject && (
        <footer className={`py-6 text-center text-xs mt-4 border-t ${isDarkMode ? 'text-slate-500 border-slate-800' : 'text-[#00ced1]/60 border-[#e0fbfb]'}`}>
            <p className="font-bold">أستاذي &copy; 2025 - رفيقك نحو الامتياز</p>
        </footer>
      )}
    </div>
  );
};

export default App;
