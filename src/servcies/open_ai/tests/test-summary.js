import fs from "fs/promises";
import { generateSummary } from "../generate_questions/helpers.js";

async function testSummary() {
  try {
    const sampleText = `
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

    const summary = await generateSummary(sampleText);
    console.log("Sample Text:", sampleText);
    console.log("\nGenerated Summary:", summary);
  } catch (error) {
    console.error("Test failed:", error);
  }
}

testSummary();
