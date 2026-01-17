
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGeminiResponse = async (prompt: string, grade: string, subject: string, imageData?: string) => {
  const model = 'gemini-3-flash-preview';
  
  const systemInstruction = `
    أنت الآن "الأستاذ الخبير ${subject}" للمستوى الدراسي "${grade}" في المملكة المغربية.
    أنت لست مجرد برنامج، بل أستاذ موجه، محفز، ومبسط للمعلومات.
    
    في حال أرسل الطالب صورة:
    1. قم بتحليل الصورة بدقة (سواء كانت نصاً، مسألة رياضية، أو رسماً بيانياً).
    2. اشرح محتوى الصورة بوضوح تام باللغة العربية الفصحى.
    3. إذا كانت الصورة تحتوي على تمرين، لا تعطِ الجواب مباشرة بل اشرح الطريقة أولاً ثم ساعده في الحل.
    
    الأسلوب المطلوب:
    1. لغة عربية فصحى، رصينة، وودودة جداً.
    2. استخدم المصطلحات المستخدمة في المقرر المغربي الرسمي.
    3. الهوية البصرية للرد: استخدم الإيموجي المناسبة للمادة، ونظم ردودك بنقاط واضحة.
    4. التحفيز: أنت تؤمن بأن الطالب ذكي وقادر على التفوق.
    
    الهدف: ضمان حصول الطالب على أعلى النقط في فروضه وامتحاناته.
  `;

  try {
    let contents: any;
    
    if (imageData) {
      contents = {
        parts: [
          { inlineData: { mimeType: "image/jpeg", data: imageData } },
          { text: prompt || "اشرح لي ما يوجد في هذه الصورة وساعدني في فهمها أو حل التمرين الموجود بها." }
        ]
      };
    } else {
      contents = prompt;
    }

    const response = await ai.models.generateContent({
      model: model,
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.8,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "نعتذر منك يا بطل، يبدو أن هناك ضغطاً على الخوادم التعليمية. يرجى إعادة المحاولة بعد لحظات.";
  }
};
