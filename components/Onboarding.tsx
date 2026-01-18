
import React, { useState } from 'react';
import { GRADES, GET_SUBJECTS_FOR_GRADE } from '../constants';
import { Grade } from '../types';

interface OnboardingProps {
  onComplete: (data: any) => void;
  isDarkMode: boolean;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete, isDarkMode }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    grade: null as Grade | null,
    favoriteSubject: '',
    school: '',
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleFinish = () => {
    onComplete(formData);
  };

  const stepsCount = 5; // Reduced from 6 to 5
  const progress = (step / stepsCount) * 100;

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6 animate-pop">
            <h2 className="text-2xl font-black text-[#00ced1]">ما هو اسمك؟</h2>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="اكتب اسمك هنا..."
              className={`w-full p-4 rounded-2xl border-2 focus:border-[#00ced1] outline-none text-center text-xl font-bold ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-100 text-slate-800'}`}
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-pop">
            <h2 className="text-2xl font-black text-[#00ced1]">كم عمرك؟</h2>
            <input 
              type="number" 
              value={formData.age}
              onChange={(e) => setFormData({...formData, age: e.target.value})}
              placeholder="مثلاً: 15"
              className={`w-full p-4 rounded-2xl border-2 focus:border-[#00ced1] outline-none text-center text-xl font-bold ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-100 text-slate-800'}`}
            />
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-pop">
            <h2 className="text-2xl font-black text-[#00ced1]">ما هو مستواك الدراسي؟</h2>
            <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto p-2">
              {GRADES.map(g => (
                <button
                  key={g.id}
                  onClick={() => setFormData({...formData, grade: g, favoriteSubject: ''})}
                  className={`p-3 rounded-xl border-2 transition-all font-bold text-sm ${formData.grade?.id === g.id ? 'border-[#00ced1] bg-[#e0fbfb] text-[#00ced1]' : isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-100 text-slate-600'}`}
                >
                  {g.name}
                </button>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 animate-pop">
            <h2 className="text-2xl font-black text-[#00ced1]">ما هي مادتك المفضلة؟</h2>
            <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto p-2">
              {formData.grade ? GET_SUBJECTS_FOR_GRADE(formData.grade.id).map(s => (
                <button
                  key={s.name}
                  onClick={() => setFormData({...formData, favoriteSubject: s.name})}
                  className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 font-bold ${formData.favoriteSubject === s.name ? 'border-[#00ced1] bg-[#e0fbfb] text-[#00ced1]' : isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-100 text-slate-600'}`}
                >
                  <i className={s.icon}></i>
                  <span className="text-xs">{s.name}</span>
                </button>
              )) : (
                <p className="col-span-2 text-slate-400">يرجى اختيار المستوى الدراسي أولاً</p>
              )}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6 animate-pop">
            <h2 className="text-2xl font-black text-[#00ced1]">ما هو اسم مدرستك؟</h2>
            <input 
              type="text" 
              value={formData.school}
              onChange={(e) => setFormData({...formData, school: e.target.value})}
              placeholder="اسم المؤسسة التعليمية..."
              className={`w-full p-4 rounded-2xl border-2 focus:border-[#00ced1] outline-none text-center text-xl font-bold ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-100 text-slate-800'}`}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const isNextDisabled = () => {
    if (step === 1 && !formData.name) return true;
    if (step === 2 && !formData.age) return true;
    if (step === 3 && !formData.grade) return true;
    if (step === 4 && !formData.favoriteSubject) return true;
    if (step === 5 && !formData.school) return true;
    return false;
  };

  return (
    <div className={`max-w-xl w-full glass-card p-8 md:p-12 text-center space-y-8 animate-pop ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white'}`}>
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-[#00ced1] transition-all duration-500" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="min-h-[300px] flex flex-col justify-center">
        {renderStep()}
      </div>

      <div className="flex gap-4">
        {step < stepsCount ? (
          <button 
            disabled={isNextDisabled()}
            onClick={nextStep}
            className="flex-1 bg-[#00ced1] text-white py-4 px-6 rounded-2xl font-black text-lg hover:bg-[#00a8a8] transition-all disabled:opacity-50 shadow-lg shadow-[#00ced1]/20"
          >
            التالي
          </button>
        ) : (
          <button 
            disabled={isNextDisabled()}
            onClick={handleFinish}
            className="flex-1 bg-[#00ced1] text-white py-4 px-6 rounded-2xl font-black text-lg hover:bg-[#00a8a8] transition-all shadow-lg shadow-[#00ced1]/20"
          >
            لنبدأ الرحلة!
          </button>
        )}
        
        {step > 1 && (
          <button 
            onClick={prevStep}
            className={`px-8 py-4 rounded-2xl font-bold border-2 transition-all ${isDarkMode ? 'border-slate-600 text-white hover:bg-slate-700' : 'border-slate-100 text-slate-500 hover:bg-slate-50'}`}
          >
            السابق
          </button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
