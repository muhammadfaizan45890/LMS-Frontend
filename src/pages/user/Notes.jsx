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
import { Document, Page, pdfjs } from "react-pdf";
import {
  FileText,
  Download,
  BookOpen,
  X,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import API from "../../utils/api";

// Set up PDF.js worker (using CDN for simplicity)
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Notes = () => {
  const [courses, setCourses] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPdf, setSelectedPdf] = useState(null); // { url, title }
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState(false);

  const userId = localStorage.getItem("userId");

  // Fetch active courses
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

  // Fetch notes for all active courses
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

  // Open modal and reset PDF state
  const openPdfViewer = (pdfUrl, title) => {
    setSelectedPdf({ url: pdfUrl, title });
    setPageNumber(1);
    setNumPages(null);
    setPdfError(false);
    setPdfLoading(true);
  };

  const closePdfViewer = () => {
    setSelectedPdf(null);
    setNumPages(null);
    setPdfError(false);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPdfLoading(false);
    setPdfError(false);
  };

  const onDocumentLoadError = (error) => {
    console.error("PDF load error:", error);
    setPdfLoading(false);
    setPdfError(true);
  };

  const goToPrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () => setPageNumber((prev) => Math.min(prev + 1, numPages));

  return (
    <div className="min-h-screen bg-zinc-100 p-4 md:p-8">
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

      {/* Loading state */}
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

      {/* PDF Modal */}
      {selectedPdf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Modal Header */}
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

            {/* PDF Viewer Body */}
            <div className="flex-1 overflow-auto p-4 bg-gray-100 flex flex-col items-center">
              {pdfLoading && (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mb-4"></div>
                  <p className="text-gray-600">Loading PDF...</p>
                </div>
              )}
              {pdfError && (
                <div className="flex flex-col items-center justify-center py-20 text-red-600">
                  <AlertCircle size={48} />
                  <p className="mt-2 font-semibold">Failed to load PDF</p>
                  <p className="text-sm text-gray-500">
                    Please try again later or contact support.
                  </p>
                </div>
              )}
              {!pdfError && (
                <Document
                  file={selectedPdf.url}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  loading={null} // we handle loading ourselves
                >
                  <Page
                    pageNumber={pageNumber}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    className="shadow-lg"
                    scale={1.2}
                  />
                </Document>
              )}
            </div>

            {/* Pagination Controls (only if PDF loaded successfully) */}
            {numPages && !pdfError && (
              <div className="border-t p-3 bg-white flex items-center justify-between gap-2 text-sm">
                <button
                  onClick={goToPrevPage}
                  disabled={pageNumber <= 1}
                  className="p-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="font-medium">
                  Page {pageNumber} of {numPages}
                </span>
                <button
                  onClick={goToNextPage}
                  disabled={pageNumber >= numPages}
                  className="p-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
