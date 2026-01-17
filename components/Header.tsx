
import React, { useState } from 'react';

interface HeaderProps {
  onHome: () => void;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ onHome, toggleDarkMode, isDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative py-6 px-6 flex justify-between items-center z-50">
      <div className="flex items-center gap-6 flex-row-reverse">
        <div onClick={onHome} className="flex items-center gap-3 cursor-pointer group">
          <div className="w-14 h-14 bg-purple-600 text-white rounded-2xl flex items-center justify-center text-3xl shadow-xl transition-all duration-500 transform group-hover:rotate-12">
            <i className="fas fa-graduation-cap"></i>
          </div>
          <div className="text-right flex flex-col">
            <h1 className={`text-3xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-purple-900'}`}>مستقبلي</h1>
            <span className={`text-[10px] font-bold uppercase tracking-[4px] ${isDarkMode ? 'text-purple-400' : 'text-purple-300'}`}>Education</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-purple-200 text-purple-600 hover:bg-purple-50'}`}
          >
            <i className="fas fa-bars-staggered text-xl"></i>
          </button>
      </div>

      {isMenuOpen && (
        <>
          <div className="fixed inset-0 bg-white/10 backdrop-blur-md z-[55] transition-all" onClick={() => setIsMenuOpen(false)}></div>
          <div className={`fixed top-6 left-6 w-72 shadow-2xl rounded-[32px] border z-[60] p-6 overflow-hidden animate-pop backdrop-blur-2xl ${isDarkMode ? 'bg-slate-900/90 border-slate-700' : 'bg-white/90 border-purple-100'}`}>
            <ul className="space-y-3 relative z-10">
              <li>
                <button onClick={() => { onHome(); setIsMenuOpen(false); }} className={`w-full text-right p-4 rounded-2xl flex items-center justify-between group transition-all ${isDarkMode ? 'hover:bg-slate-700 text-white' : 'hover:bg-purple-50 text-purple-900'}`}>
                  <span className="font-black">الرئيسية</span>
                  <i className="fas fa-home text-purple-600"></i>
                </button>
              </li>
              <li>
                <button onClick={() => { toggleDarkMode(); setIsMenuOpen(false); }} className={`w-full text-right p-4 rounded-2xl flex items-center justify-between group transition-all ${isDarkMode ? 'hover:bg-slate-700 text-white' : 'hover:bg-purple-50 text-purple-900'}`}>
                  <span className="font-black">{isDarkMode ? 'الوضع النهاري' : 'الوضع الليلي'}</span>
                  <i className={`fas ${isDarkMode ? 'fa-sun text-yellow-500' : 'fa-moon text-purple-600'}`}></i>
                </button>
              </li>
              <li className="pt-6 border-t border-purple-100/30">
                <div className="flex justify-between items-center bg-purple-600/10 p-4 rounded-3xl">
                  <a href="#" className="text-purple-600 hover:scale-110 transition-transform"><i className="fab fa-instagram text-xl"></i></a>
                  <a href="#" className="text-purple-600 hover:scale-110 transition-transform"><i className="fab fa-whatsapp text-xl"></i></a>
                  <a href="#" className="text-purple-600 hover:scale-110 transition-transform"><i className="fab fa-tiktok text-xl"></i></a>
                </div>
              </li>
            </ul>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
