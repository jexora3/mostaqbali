
import React, { useState, useCallback, useMemo } from 'react';
import { Grade, Level } from '../types';
import { GRADES } from '../constants';

interface GradeSelectorProps {
  onSelect: (grade: Grade) => void;
  isDarkMode: boolean;
}

const GradeSelector: React.FC<GradeSelectorProps> = ({ onSelect, isDarkMode }) => {
  const [clickingId, setClickingId] = useState<string | null>(null);

  const levels = useMemo(() => [
    { type: Level.PRIMARY, label: 'التعليم الابتدائي', color: 'bg-[#e0fbfb] text-[#00ced1]', icon: 'fa-solid fa-shapes' },
    { type: Level.MIDDLE, label: 'التعليم الإعدادي', color: 'bg-[#00ced1] text-white', icon: 'fa-solid fa-user-graduate' },
    { type: Level.HIGH, label: 'التعليم الثانوي', color: 'border-2 border-[#00ced1] text-[#00ced1]', icon: 'fa-solid fa-rocket' },
  ], []);

  const handleSelect = useCallback((grade: Grade) => {
    setClickingId(grade.id);
    // Instant feedback then trigger transition
    requestAnimationFrame(() => {
      setTimeout(() => {
        onSelect(grade);
        setClickingId(null);
      }, 150);
    });
  }, [onSelect]);

  return (
    <div className="space-y-8 animate-pop pb-6 max-w-5xl mx-auto">
      <div className="text-center space-y-3">
        <h1 className={`text-3xl md:text-5xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          أستاذي معك في كل خطوة <span className="text-[#00ced1]">!</span>
        </h1>
        <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'} text-sm md:text-lg font-bold`}>
          اختر مستواك الدراسي للبدء
        </p>
      </div>

      {levels.map((lvl) => (
        <section key={lvl.type} className="space-y-4">
          <div className="flex items-center gap-3 flex-row-reverse px-2">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${lvl.color}`}>
                <i className={`${lvl.icon} text-sm`}></i>
            </div>
            <h2 className={`text-lg md:text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{lvl.label}</h2>
            <div className={`h-[1px] flex-1 ${isDarkMode ? 'bg-slate-800' : 'bg-[#e0fbfb]'}`}></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {GRADES.filter(g => g.level === lvl.type).map((grade) => (
              <button
                key={grade.id}
                onClick={() => handleSelect(grade)}
                className={`glass-card p-4 flex items-center flex-row-reverse group transition-all duration-150 text-right will-change-transform ${
                  isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-[#e0fbfb]'
                } ${clickingId === grade.id ? 'scale-95 brightness-90' : 'hover:border-[#00ced1] active:scale-98'}`}
              >
                <div className="w-12 h-12 rounded-xl bg-[#e0fbfb] text-[#00ced1] flex items-center justify-center text-lg ml-4 shrink-0 transition-colors group-hover:bg-[#00ced1] group-hover:text-white">
                  <i className={grade.icon}></i>
                </div>
                <div className="text-right flex-1 overflow-hidden">
                  <h3 className={`font-bold text-sm md:text-base truncate ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{grade.name}</h3>
                  <span className="text-[9px] font-black text-[#00ced1] uppercase opacity-60">اختر الآن</span>
                </div>
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default GradeSelector;
