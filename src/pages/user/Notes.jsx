// import React, { useEffect, useState } from "react";
// import axios from "axios";

// import {
//   FileText,
//   Download,
//   BookOpen,
// } from "lucide-react";
// import API from "../../utils/api"

// const Notes = () => {
//   const [courses, setCourses] = useState([]);
//   const [notes, setNotes] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const userId = localStorage.getItem("userId");


//   // ================= FETCH ACTIVE COURSES =================
//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const res = await axios.get(
//           `${API}/enroll/my-courses/${userId}`
//         );

//         const activeCourses = (res.data || []).filter(
//           (course) => course.status === "active"
//         );

//         setCourses(activeCourses);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     if (userId) fetchCourses();
//   }, [userId]);

//   // ================= FETCH NOTES =================
//   useEffect(() => {
//     const fetchNotes = async () => {
//       try {
//         setLoading(true);

//         let allNotes = [];

//         for (let course of courses) {
//           const courseId =
//             course.courseId?._id || course.courseId;

//           if (!courseId) continue;

//           const res = await axios.get(
//             `${API}/notes/course/${courseId}/${userId}`
//           );

//           if (Array.isArray(res.data)) {
//             allNotes = [...allNotes, ...res.data];
//           }
//         }

//         setNotes(allNotes);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (courses.length > 0) {
//       fetchNotes();
//     } else {
//       setLoading(false);
//     }
//   }, [courses, userId]);

//   return (
//     <div className="min-h-screen bg-zinc-100 p-4 md:p-8">

//       {/* HEADER */}
//       <div className="flex items-center gap-3 mb-8">
//         <div className="bg-black text-white p-3 rounded-2xl">
//           <FileText size={24} />
//         </div>

//         <div>
//           <h1 className="text-2xl md:text-4xl font-bold">
//             Course Notes
//           </h1>
//           <p className="text-gray-500 mt-1">
//             Access notes for your active courses
//           </p>
//         </div>
//       </div>

//       {/* LOADING */}
//       {loading ? (
//         <div className="text-center py-20 text-xl font-semibold">
//           Loading Notes...
//         </div>
//       ) : notes.length === 0 ? (
//         <div className="bg-white rounded-3xl shadow-xl p-10 text-center">
//           <BookOpen size={50} className="mx-auto mb-4 text-gray-400" />

//           <h2 className="text-2xl font-bold mb-2">
//             No Notes Found
//           </h2>

//           <p className="text-gray-500">
//             Admin has not uploaded notes yet for your courses
//           </p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

//           {notes.map((note) => (
//             <div
//               key={note._id}
//               className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition p-6"
//             >

//               {/* TITLE */}
//               <div className="flex items-center gap-2 mb-2">
//                 <BookOpen size={18} />
//                 <h2 className="font-bold text-lg">
//                   {note.title}
//                 </h2>
//               </div>

//               {/* COURSE NAME */}
//               <p className="text-sm text-gray-500 mb-3">
//                 {note.courseId?.title}
//               </p>

//               {/* DESCRIPTION */}
//               <p className="text-gray-700 text-sm mb-6 line-clamp-4">
//                 {note.description}
//               </p>

//               {/* ✅ ONLY PATH CHANGED HERE */}
//               <a
//                 href={`${API}/files/notes/${note.pdf}`}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="flex items-center justify-center gap-2 bg-black text-white py-3 rounded-2xl hover:bg-zinc-800 transition"
//               >
//                 <Download size={18} />
//                 View PDF
//               </a>

//             </div>
//           ))}

//         </div>
//       )}
//     </div>
//   );
// };

// export default Notes;



import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FileText,
  Download,
  BookOpen,
  X,
} from "lucide-react";
import API from "../../utils/api";

const Notes = () => {
  const [courses, setCourses] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPdf, setSelectedPdf] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${API}/enroll/my-courses/${userId}`);
        const activeCourses = (res.data || []).filter(
          (course) => course.status === "active"
        );
        setCourses(activeCourses);
      } catch (error) {
        console.log(error);
      }
    };
    if (userId) fetchCourses();
  }, [userId]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        let allNotes = [];
        for (let course of courses) {
          const courseId = course.courseId?._id || course.courseId;
          if (!courseId) continue;
          const res = await axios.get(`${API}/notes/course/${courseId}/${userId}`);
          if (Array.isArray(res.data)) {
            allNotes = [...allNotes, ...res.data];
          }
        }
        setNotes(allNotes);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (courses.length > 0) {
      fetchNotes();
    } else {
      setLoading(false);
    }
  }, [courses, userId]);

  const openPdfViewer = (pdfUrl, title) => {
    setSelectedPdf({ url: pdfUrl, title });
  };

  const closePdfViewer = () => {
    setSelectedPdf(null);
  };

  return (
    <div className="h-full bg-zinc-100 p-4 md:p-8 overflow-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-black text-white p-3 rounded-2xl">
          <FileText size={24} />
        </div>
        <div>
          <h1 className="text-2xl md:text-4xl font-bold">Course Notes</h1>
          <p className="text-gray-500 mt-1">
            Access notes for your active courses
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-xl font-semibold">
          Loading Notes...
        </div>
      ) : notes.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center">
          <BookOpen size={50} className="mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold mb-2">No Notes Found</h2>
          <p className="text-gray-500">
            Admin has not uploaded notes yet for your courses
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition p-6"
            >
              <div className="flex items-center gap-2 mb-2">
                <BookOpen size={18} />
                <h2 className="font-bold text-lg">{note.title}</h2>
              </div>
              <p className="text-sm text-gray-500 mb-3">
                {note.courseId?.title}
              </p>
              <p className="text-gray-700 text-sm mb-6 line-clamp-4">
                {note.description}
              </p>
              <button
                onClick={() =>
                  openPdfViewer(`${API}/files/notes/${note.pdf}`, note.title)
                }
                className="flex items-center justify-center gap-2 bg-black text-white py-3 rounded-2xl hover:bg-zinc-800 transition w-full"
              >
                <Download size={18} />
                View PDF
              </button>
            </div>
          ))}
        </div>
      )}

      {/* PDF Modal - no download option */}
      {selectedPdf && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={closePdfViewer}
        >
          <div
            className="relative bg-white rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b p-4 bg-white sticky top-0 z-10">
              <h2 className="text-lg font-bold truncate pr-4">
                {selectedPdf.title}
              </h2>
              <button
                onClick={closePdfViewer}
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-auto bg-gray-100">
              <iframe
                // Removed toolbar to hide download button
                src={`${selectedPdf.url}#toolbar=0`}
                title={selectedPdf.title}
                className="w-full h-full min-h-[500px]"
                style={{ border: "none" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
