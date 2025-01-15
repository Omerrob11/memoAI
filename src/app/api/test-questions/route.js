import { generateQuestions } from "@/servcies/open_ai/generate_questions/helpers";
import { uploadQuestions } from "@/servcies/supabase/documents/uploadResponse";
export async function GET(req) {
  try {
    const testText = `
      השואה הייתה רצח עם שיטתי של כשישה מיליון יהודים על ידי גרמניה הנאצית במהלך מלחמת העולם השנייה.
      
      בשנת 1933, עם עליית היטלר לשלטון, החלה מדיניות אנטי-יהודית מאורגנת בגרמניה. חוקי נירנברג משנת 1935 שללו מהיהודים את זכויותיהם האזרחיות. ליל הבדולח בנובמבר 1938 סימן את תחילת האלימות הפיזית המאורגנת נגד הקהילה היהודית.
      
      עם פרוץ מלחמת העולם השנייה בשנת 1939, החל השלב הבא במדיניות האנטי-יהודית. הנאצים הקימו גטאות בערים שונות, בעיקר בפולין, שם רוכזו יהודים בתנאים קשים של צפיפות, רעב ומחלות. הגטו הגדול ביותר היה בוורשה, שם נכלאו כ-400,000 יהודים בשטח קטן.
      
      בשנת 1941, עם הפלישה לברית המועצות, החל השלב האחרון והקטלני ביותר - "הפתרון הסופי". הנאצים הקימו מחנות השמדה כמו אושוויץ-בירקנאו, טרבלינקה, סוביבור ובלז'ץ, שבהם נרצחו מיליוני יהודים בשיטות תעשייתיות, בעיקר בתאי גזים. יחידות מיוחדות, האיינזצגרופן, רצחו מאות אלפי יהודים בשטחי ברית המועצות הכבושים.
      
      למרות התנאים הבלתי אפשריים, היו מקרים רבים של התנגדות יהודית. המרד הידוע ביותר היה מרד גטו ורשה באפריל-מאי 1943, שבו לחמו היהודים נגד הצבא הגרמני במשך כחודש. התנגדות מזוינת התרחשה גם במחנות ההשמדה, כמו המרד בסוביבור באוקטובר 1943, והמרד באושוויץ-בירקנאו באוקטובר 1944.
      
      חסידי אומות העולם, לא-יהודים שסיכנו את חייהם כדי להציל יהודים, הם עדות לאור בתוך החשכה. אנשים כמו אוסקר שינדלר, ראול ולנברג, וחסידי אומות העולם ההולנדים, הצילו אלפי יהודים ממוות בטוח. במדינות כמו דנמרק ואלבניה, פעלו האוכלוסייה והממשלה להצלת היהודים.
      
      עם שחרור המחנות על ידי בעלות הברית ב-1945, נחשף היקף הזוועה המלא של השואה. מתוך כ-9 מיליון יהודים שחיו באירופה לפני המלחמה, נרצחו כשישה מיליון, ביניהם כ-1.5 מיליון ילדים. הקהילות היהודיות העתיקות באירופה נמחקו כמעט לחלוטין.
      
      השואה הותירה צלקת עמוקה בהיסטוריה של העם היהודי והאנושות כולה. היא משמשת כתמרור אזהרה לדורות הבאים על הסכנות של שנאת זרים, גזענות ואנטישמיות. מוסדות כמו יד ושם בירושלים מנציחים את זכר הנספים ומחנכים על חשיבות הזיכרון והלקחים מתקופה אפלה זו בהיסטוריה האנושית.
      
      מדינת ישראל, שקמה שלוש שנים לאחר תום השואה, מהווה סמל לתקומת העם היהודי מהאפר. יום הזיכרון לשואה ולגבורה מצוין מדי שנה בישראל ובקהילות יהודיות בעולם, כדי לזכור ולא לשכוח את הטרגדיה הנוראה הזו ואת הלקחים שעלינו להפיק ממנה.
      `;

    console.log("Starting test...");

    // Test with 5 questions
    const result = await generateQuestions(testText, 5);
    console.log("\nRaw API response:");
    console.log(result); // Let's see what we're getting

    if (!result) {
      throw new Error("No result returned from generateQuestions");
    }

    console.log("\nTest - Generate 5 questions:");
    console.log(JSON.stringify(result, null, 2));

    if (!Array.isArray(result)) {
      throw new Error(`Expected array, got ${typeof result}`);
    }

    // Verify structure
    console.log("\nVerifying question structure:");
    result.forEach((q, index) => {
      // ... rest of the validation
    });

    const questionsResult = await uploadQuestions({
      documentId: "4528492b-becb-43bd-9f44-5b3d3c8ac54f",
      questionsResponse: result,
    });

    return Response.json({ success: true, questionsResult });
    // const result2 = await generateQuestions(sampleText, 10);
  } catch (error) {
    console.error("Test failed:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
