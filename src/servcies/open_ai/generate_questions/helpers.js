import openai from "../openai.js";

async function generateQuestions(extractedText, numberOfQuestions) {
  const systemPrompt = `אתה מקצוען בניתוח מאמרים, ויצירת שאלות ותשובות שמתייחסות לנקודות המרכזיות של הטקסט. עליך לשמור על שפת הטקסט המקורי בתשובה שאתה תחזיר. הטקסט המקורי ככל הנראה יהיה בעברית, אך אם יש שפה אחרת שבה רוב הטקסט כתוב, תצטרך לסכם בשפה הזו.

  המשימה שלך תהיה לנתח את הטקסט, ולייצר שאלות שנוגעות בנקודות המרכזיות של הטקסט, על בסיס הטקסט כמובן, באופן הבא:
  תצטרך לעשות שאלה, ו-4 תשובות אפשריות לשאלה הזו, מתוכן, רק תשובה אחת נכונה.
  
  לכח שאלה, התשובה שלך חייבת להיות באותו פורמט, תמיד, והוא הפורמט באופן הבא, של JSON:
  
  {
  "questions": [{
  "question": "question text",
  "options": ["option1", "option2", "option3", "option4"],
  "correctIndex": 0
  }]
  }
  
  הנחיות ליצירת השאלות:
  
  לכל שאלה חייב להיות 4 תשובות אפשריות בדיוק
  
  רק תשובה אחת תיהיה נכונה, שנשים אותה בתוך 
  correct index
  
  תייצר בדיוק את מספר השאלות שהתבקש ממך
  
  השאלות חייבות להיות מגוונות, ולכסות נושאים מכל הטקסט
  
  השאלות חייבות להיות ברורות וחד משמעיות
  
  והכי חשוב - התשובה חייבת להיות בעברית תקינה ללא טעויות כתיב, דקדוק נכון, ולשים דגש על עברית נכונה וללא טעויות
  `;
  const userPrompt = `
  תנתח את הטקסט הבא:
  ${extractedText}
  
  ותייצר שאלות ותשובות בהתבסס על הטקסט, כאשר לכל שאלה יש 4 תשובות אפשריות, מתוכן אחת בדיוק נכונה.
  בבקשה תייצר בדיוק ${numberOfQuestions} שאלות
  `;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",

      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
        {
          role: "system",
          content:
            "Remmber to respond only with a valid json object in the specified format, nothing else",
        },
      ],
    });

    const response = completion.choices[0].message.content;
    // repsonse should be:
    // '{"questions": [{"question": "What is...?", "options": [...], "correctIndex": 0}, ...]}'
    // console.log("Raw API response:", response); // Debug log

    const questions = JSON.parse(response).questions;
    return questions;
  } catch (error) {
    // console.error("Error generating questions:", error);
    throw error;
  }
}

// TODO: ask him to make you an outline of the text
async function generateSummary(extractedText) {
  try {
    // main method to interact with gpt models
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",

      messages: [
        {
          role: "system",
          content: `אתה מקצוען בסיכום מאמרים וטקסט מכל הסוגים. עליך לשמור על שפת הטקסט המקורי בתשובה שאתה תחזיר. הטקסט המקורי ככל הנראה יהיה בעברית, אך אם יש שפה אחרת שבה רוב הטקסט כתוב, תצטרך לסכם בשפה הזו.

תיצור סיכום מדוייק, וקצר ש:

1. לא יותר מ20-25% מאורך המסמך/הטקסט המקורי
2. תכניס לסיכום את הנקודות המרכזיות והרעיונות המרכזיים של הטקסט
3. תשמור על השפה המקורית של הטקסט

חשוב: הסיכום צריך להיות בפורמט HTML עם המבנה הבא:

<article dir="rtl">
    <h1>כותרת ראשית</h1>
    
    <section>
        <h2>כותרת משנה ראשונה</h2>
        <p>תוכן הפסקה הראשונה...</p>
        <p>תוכן הפסקה השנייה אם יש...</p>
    </section>

    <section>
        <h2>כותרת משנה שנייה</h2>
        <p>תוכן הפסקה...</p>
    </section>
</article>

אין להשתמש בביטויים כמו "הטקסט מדבר על" או "הקובץ מדבר על".`,
        },
        {
          role: "user",
          content: ` .בבקשה תנתח ותסכם את הטקסט הבא תוך שמירה על השפה המקורית. וודא שהסיכום הוא בערך 20% מאורך הטקסט המקורי:

          ${extractedText}
          
          זכור לכתוב בפסקאות ברורות ולהתמקד בנקודות העיקריות.
          `,
        },
      ],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error genrating summary:", error);
    throw error;
  }
}

export { generateQuestions, generateSummary };
