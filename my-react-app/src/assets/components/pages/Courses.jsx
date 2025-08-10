import React, { useState, useEffect, useMemo } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../firebase";
import CourseCard from "../CourseCard";
import CourseFormModal from "../CourseFormModal";
import "../styles/Courses.css";
import { useAuth } from "../hooks/useAuth";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editCourse, setEditCourse] = useState(null);

  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "courses"), (snapshot) => {
      const raw = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));

      // Удаляем дубликаты по id
      const unique = Array.from(new Map(raw.map(c => [c.id, c])).values());

      setCourses(unique);
    });
    return () => unsub();
  }, []);

  const filtered = useMemo(() => {
    let arr = courses;
    if (search) {
      const q = search.toLowerCase();
      arr = arr.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)
      );
    }
    if (filters.length) {
      arr = arr.filter((c) => filters.includes(c.category));
    }
    return arr;
  }, [courses, search, filters]);

  const toggleFilter = (cat) =>
    setFilters((f) =>
      f.includes(cat) ? f.filter((x) => x !== cat) : [...f, cat]
    );

  const handleAdd = async (data) => {
    await addDoc(collection(db, "courses"), data);
  };

  const handleUpdate = async (data) => {
    const docRef = doc(db, "courses", data.id);
    const { id, ...upd } = data;
    await updateDoc(docRef, upd);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Удалить курс?")) {
      await deleteDoc(doc(db, "courses", id));
    }
  };

  return (
    <div className="courses-page">
      <aside className="courses-filters">
        <h2>Категории</h2>
        {["Maps", "Weapons", "Strategy"].map((cat) => (
          <label key={cat}>
            <input
              type="checkbox"
              checked={filters.includes(cat)}
              onChange={() => toggleFilter(cat)}
            />
            {cat}
          </label>
        ))}

        <input
          type="text"
          placeholder="Поиск…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="courses-filters__search"
        />

        {isAdmin && (
          <button
            className="btn-add-course"
            onClick={() => {
              setEditCourse(null);
              setVisible(true);
            }}
          >
            + Добавить курс
          </button>
        )}
      </aside>

      <main className="courses-main">
        <div className="courses-list">
          {filtered.map((c, index) => (
            <CourseCard
              key={`${c.id}-${index}`} // гарантированно уникальный ключ
              course={c}
              isAdmin={isAdmin}
              onEdit={() => {
                setEditCourse(c);
                setVisible(true);
              }}
              onDelete={() => handleDelete(c.id)}
            />
          ))}
        </div>
      </main>

      <CourseFormModal
        visible={visible}
        onClose={() => setVisible(false)}
        onSubmit={editCourse ? handleUpdate : handleAdd}
        initialData={editCourse || undefined}
      />
    </div>
  );
}