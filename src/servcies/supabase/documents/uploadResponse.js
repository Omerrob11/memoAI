import { supabase } from "../client";

// TODO: test this functions, see that they work in supabase
// TODO: go over developing a document processing app last chat
export async function uploadDocumentSummary({
  userId,
  fileName,
  fileUrl,
  summary,
}) {
  // userId from asupabase auth
  // filename from the uploaded file object (or the supabase safename)
  // fileurl from supabase upload response
  // summary from open ai
  try {
    // dot syntax - chain of methods, each method returns an object that has the next method
    const { data, error } = await supabase
      // from: which table to query
      .from("documents")
      // inserts new rows into the table.
      .insert([
        {
          user_id: userId,
          file_name: fileName,
          file_url: fileUrl,
          summary: summary,
        },
      ])
      // return the inserted row data back
      .select()
      // return a single object instead of an array
      .single();

    if (error) throw error;

    return { data };
  } catch (error) {
    console.error("Error uploading document summary:", error);
    return {
      error: {
        message: error.message,
      },
    };
  }
}
// questions response shape is: array of object

//  [ {
//     "question": "מה הכוונה ל- 'הפתרון הסופי' שהוצע על ידי הנאצים בעקבות הפלישה לברית המועצות?",
//     "options": [
//       "הפסקת כל פעילות צבאית",
//       "הקמת מחנות השמדה ורצח מיליוני יהודים",
//       "חיפוש פתרון דיפלומטי לסיכסוך העולמי",
//       "אבסורציה של יהודים לחיילי הנאצים"
//     ],
//     "correctIndex": 1
//   },
//   {
//     "question": "איזו מידע נוסף אנו יכולים למצוא על עליה של היטלר לשלטון בנואר 1933?",
//     "options": [
//       "היטלר הקים מדינת ישראל",
//       "היטלר הפך להיות מאמן הכדורגל של גרמניה",
//       "היטלר החל מדיניות אנטי-יהודית מאורגנת בגרמניה",
//       "החלה מלחמת העולם השנייה"
//     ],
//     "correctIndex": 2
//   }],
export async function uploadQuestions({ documentId, questionsResponse }) {
  try {
    console.log(questionsResponse, " thisis quesitons response ");
    // we map the array, and make it an array of objects which each object is a row of the able
    const questionsToInsert = questionsResponse.map((question) => ({
      document_id: documentId,
      question_text: question.question,
      answers: question.options,
      correct_answer_index: question.correctIndex,
    }));
    // we will get a quesstions table
    // we will need to take the question text from there
    // questions options
    // and the correct index
    // and store it in the supabase database
    const tableQuery = supabase.from("questions");

    // insert get array of objects, supabase create a new row for each object in the array
    // it can get single object or an array

    // this is the insert operation
    const insertQuery = tableQuery.insert(questionsToInsert);
    //we get a query builder object.

    const selectQuery = insertQuery.select();

    // this is a value or object
    // some object can be awaited - thenable
    // query builder object has a property that behave like a promise when you await it
    const response = await selectQuery;

    if (response.error) {
      return {
        error: {
          message: response.error.message,
        },
      };
    }

    return { data: response.data };

    // const selectQuery = insertQuery.select();
    // const result = selectQuery.single();
  } catch (error) {
    return {
      error: {
        message: error.message,
      },
    };
  }
}

// Test - Generate 5 questions:
// [
//   {
//     "question": "מה הכוונה ל- 'הפתרון הסופי' שהוצע על ידי הנאצים בעקבות הפלישה לברית המועצות?",
//     "options": [
//       "הפסקת כל פעילות צבאית",
//       "הקמת מחנות השמדה ורצח מיליוני יהודים",
//       "חיפוש פתרון דיפלומטי לסיכסוך העולמי",
//       "אבסורציה של יהודים לחיילי הנאצים"
//     ],
//     "correctIndex": 1
//   },
//   {
//     "question": "איזו מידע נוסף אנו יכולים למצוא על עליה של היטלר לשלטון בנואר 1933?",
//     "options": [
//       "היטלר הקים מדינת ישראל",
//       "היטלר הפך להיות מאמן הכדורגל של גרמניה",
//       "היטלר החל מדיניות אנטי-יהודית מאורגנת בגרמניה",
//       "החלה מלחמת העולם השנייה"
//     ],
//     "correctIndex": 2
//   },
//   {
//     "question": "באיזו שנה החל השלב הקטלני ביותר של השואה?",
//     "options": [
//       "1933",
//       "1935",
//       "1939",
//       "1941"
//     ],
//     "correctIndex": 3
//   },
//   {
//     "question": "מי הם חסידי אומות העולם?",
//     "options": [
//       "יהודים שסיכנו את עצמם כדי להציל גרמנים",
//       "חיילים גרמנים שהתנגדו להוראות היטלר",
//       "לא-יהודים שסיכנו את חייהם כדי להציל יהודים ממוות בטוח",
//       "קבוצת מוסיקאים יהודים שנלחמו במלחמת העולם השנייה"
//     ],
//     "correctIndex": 2
//   },
//   {
//     "question": "איזו מערכת חשובה יש להשם יד ושם בהערכת זכר השואה?",
//     "options": [
//       "התרמה להוצאת קומיקס על השואה",
//       "הפקות תיאטרון על היהודים האגדיים של העידן השני",
//       "הסלמת חומר מלחמתי לישראל",
//       "המנציחה את זכר הנספים ומחנכה על חשיבות הזיכרון והלקחים מתקופה אפלה זו בהיסטוריה האנושית"
//     ],
//     "correctIndex": 3
//   }
// ]
