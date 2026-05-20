import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  FileText,
  Download,
  BookOpen,
} from "lucide-react";
import API from "../../utils/api"

const Notes = () => {
  const [courses, setCourses] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");


  // ================= FETCH ACTIVE COURSES =================
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          `${API}/enroll/my-courses/${userId}`
        );

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

  // ================= FETCH NOTES =================
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);

        let allNotes = [];

        for (let course of courses) {
          const courseId =
            course.courseId?._id || course.courseId;

          if (!courseId) continue;

          const res = await axios.get(
            `${API}/notes/course/${courseId}/${userId}`
          );

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

  return (
    <div className="min-h-screen bg-zinc-100 p-4 md:p-8">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-black text-white p-3 rounded-2xl">
          <FileText size={24} />
        </div>

        <div>
          <h1 className="text-2xl md:text-4xl font-bold">
            Course Notes
          </h1>
          <p className="text-gray-500 mt-1">
            Access notes for your active courses
          </p>
        </div>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="text-center py-20 text-xl font-semibold">
          Loading Notes...
        </div>
      ) : notes.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center">
          <BookOpen size={50} className="mx-auto mb-4 text-gray-400" />

          <h2 className="text-2xl font-bold mb-2">
            No Notes Found
          </h2>

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

              {/* TITLE */}
              <div className="flex items-center gap-2 mb-2">
                <BookOpen size={18} />
                <h2 className="font-bold text-lg">
                  {note.title}
                </h2>
              </div>

              {/* COURSE NAME */}
              <p className="text-sm text-gray-500 mb-3">
                {note.courseId?.title}
              </p>

              {/* DESCRIPTION */}
              <p className="text-gray-700 text-sm mb-6 line-clamp-4">
                {note.description}
              </p>

              {/* ✅ ONLY PATH CHANGED HERE */}
              <a
                href={`${API}/files/notes/${note.pdf}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-black text-white py-3 rounded-2xl hover:bg-zinc-800 transition"
              >
                <Download size={18} />
                View PDF
              </a>

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default Notes;