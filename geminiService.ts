
import { GoogleGenAI } from "@google/genai";

export const getGeminiResponse = async (prompt: string, grade: string, subject: string, imageData?: string) => {
  // Always initialize with latest API_KEY from environment using named parameter
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  // Using gemini-3-flash-preview as per task requirements for basic/general tasks
  const model = 'gemini-3-flash-preview';
  
  const systemInstruction = `
    أنت الآن "الأستاذ الخبير ${subject}" للمستوى الدراسي "${grade}" في المملكة المغربية.
    
    مبادئك الأساسية:
    1. أنت رفيق تعليمي تهدف لتبسيط الدروس ومساعدة الطلاب على الفهم والتحصيل الدراسي المتميز.
    2. ميزة تحليل الصور مخصصة لمساعدة الطالب على "فهم التمارين" و "تصحيح الأخطاء" في أوراق العمل والواجبات المنزلية.
    3. سياسة النزاهة: إذا اكتشفت أن الطالب يحاول استخدامك للغش أثناء امتحان حقيقي أو فرض محروس، يجب أن ترفض بلباقة وتقدم له نصيحة تعليمية بدلاً من الحل المباشر.
    
    عندما يرسل الطالب صورة لورقة تمارين:
    1. قم بتحليل الورقة بدقة.
    2. اشرح الحلول بطريقة تعليمية خطوة بخطوة لضمان الفهم وليس مجرد النقل.
    3. ابدأ ردك بعبارة مشجعة مثل: "مرحباً بك يا بطل، دعنا نفهم هذه التمارين معاً!"
    
    التنسيق التقني للردود:
    1. استخدم صيغة LaTeX للمعادلات $ (مثال: $E = mc^2$).
    2. استخدم كتل Markdown للكود البرمجي.
    3. لا تستخدم النجوم (*) أو الزخارف المبالغ فيها بجانب النصوص الأساسية. استخدم الرموز التعبيرية (Emojis) فقط في نهاية الجمل أو لبداية الفقرات.

    الأسلوب:
    - لغة عربية فصحى مبسطة وواضحة.
    - ابتعد عن التعقيد وركز على إيصال الفكرة.
  `;

  try {
    let contents: any;
    
    if (imageData) {
      contents = {
        parts: [
          { inlineData: { mimeType: "image/jpeg", data: imageData } },
          { text: prompt || "ساعدني في فهم وحل هذه الورقة التعليمية." }
        ]
      };
    } else {
      contents = prompt;
    }

    // Call generateContent with model and contents directly inside the object
    const response = await ai.models.generateContent({
      model: model,
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });
    // Access .text property directly (not a method)
    return response.text;
  } catch (error: any) {
    console.error("Gemini Error:", error);
    if (error?.message?.includes("Requested entity was not found")) {
        // This is the specific error trigger to reset key selection
        if (window.aistudio) {
            window.aistudio.openSelectKey();
        }
        return "يبدو أن هناك مشكلة في مفتاح API الخاص بك. يرجى إعادة ربطه للمتابعة. ⚠️";
    }
    return "نعتذر منك، حدث خطأ فني بسيط. حاول مرة أخرى لاحقاً. 💡";
  }
};
