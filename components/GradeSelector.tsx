
import React from 'react';
import { Grade, Level } from '../types';
import { GRADES } from '../constants';

interface GradeSelectorProps {
  onSelect: (grade: Grade) => void;
  isDarkMode: boolean;
}

const GradeSelector: React.FC<GradeSelectorProps> = ({ onSelect, isDarkMode }) => {
  const levels = [
    { type: Level.PRIMARY, label: 'التعليم الابتدائي', color: 'bg-purple-50 text-purple-600', icon: 'fa-solid fa-shapes' },
    { type: Level.MIDDLE, label: 'التعليم الإعدادي', color: 'bg-purple-600 text-white', icon: 'fa-solid fa-user-graduate' },
    { type: Level.HIGH, label: 'التعليم الثانوي', color: 'border-2 border-purple-600 text-purple-600', icon: 'fa-solid fa-rocket' },
  ];

  return (
    <div className="space-y-12 animate-pop pb-10">
      <div className="text-center space-y-3">
        <h1 className={`text-4xl md:text-6xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          مستقبلي يبدأ الآن <span className="text-purple-600 italic">!</span>
        </h1>
        <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'} text-lg md:text-xl font-semibold`}>
          اختر مستواك التعليمي للحصول على الدعم المباشر
        </p>
      </div>

      {levels.map((lvl) => (
        <section key={lvl.type} className="space-y-6">
          <div className="flex items-center gap-4 flex-row-reverse px-2">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${lvl.color}`}>
                <i className={`${lvl.icon} text-lg`}></i>
            </div>
            <h2 className={`text-xl md:text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{lvl.label}</h2>
            <div className={`h-[1px] flex-1 ${isDarkMode ? 'bg-slate-800' : 'bg-purple-100'}`}></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {GRADES.filter(g => g.level === lvl.type).map((grade) => (
              <button
                key={grade.id}
                onClick={() => onSelect(grade)}
                className={`glass-card p-5 flex items-center flex-row-reverse group hover:border-purple-400 transition-all duration-300 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-purple-50'}`}
              >
                <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl ml-5 shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-all">
                  <i className={grade.icon}></i>
                </div>
                <div className="text-right flex-1">
                  <h3 className={`font-bold text-base md:text-lg ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{grade.name}</h3>
                  <span className="text-[10px] font-black text-purple-400 tracking-wider">استكشف المحتوى</span>
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
