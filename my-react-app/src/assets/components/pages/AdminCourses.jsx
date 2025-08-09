import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    (async () => {
      const snap = await getDocs(collection(db, "courses"));
      setCourses(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    })();
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-4">Курсы</h2>
      <ul className="list-disc pl-5">
        {courses.map(c => (
          <li key={c.id}>{c.title || c.name}</li>
        ))}
      </ul>
    </div>
  );
}