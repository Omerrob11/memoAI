import openai from "../openai.js";

async function generateQuestions(extractedText) {
  const formatPrompt = "this is some dummy prompt";
}

async function generateSummary(extractedText) {
  try {
    // main method to interact with gpt models
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
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
