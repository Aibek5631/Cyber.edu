import React, { useState, useEffect } from "react";
import "./CourseFormModal.css";

export default function CourseFormModal({
  visible,
  onClose,
  onSubmit,
  initialData,
}) {
  const safeInitial = initialData || {};

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Maps",
    level: "Beginner",
    rating: 0,
    isNew: false,
    ...safeInitial,
  });

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      ...safeInitial,
    }));
  }, [initialData]);

  if (!visible) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

const submit = () => {
  const prepared = {
    ...form,
    rating: parseFloat(form.rating) || 0,
    previewUrl: form.previewUrl?.trim() || "",
  };
  onSubmit(prepared);
  onClose();
};

  return (
    <div className="modal-overlay">
      <div className="modal-window">
        <h2>{safeInitial.id ? "Редактировать курс" : "Добавить курс"}</h2>

        <label>
          Заголовок
          <input name="title" value={form.title} onChange={handleChange} />
        </label>

        <label>
          Описание
          <textarea name="description" value={form.description} onChange={handleChange} />
        </label>

        <label>
          Категория
          <select name="category" value={form.category} onChange={handleChange}>
            <option value="Maps">Maps</option>
            <option value="Weapons">Weapons</option>
            <option value="Strategy">Strategy</option>
          </select>
        </label>

        <label>
  Превью-видео (YouTube URL)
  <input
    name="previewUrl"
    value={form.previewUrl || ""}
    onChange={handleChange}
  />
</label>

        <label>
          Уровень
          <select name="level" value={form.level} onChange={handleChange}>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </label>

        <label>
          Рейтинг
          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            name="rating"
            value={form.rating}
            onChange={handleChange}
          />
        </label>

        <label>
          <input
            type="checkbox"
            name="isNew"
            checked={form.isNew}
            onChange={handleChange}
          />
          Новинка?
        </label>

        <div className="modal-actions">
          <button onClick={onClose}>Отмена</button>
          <button onClick={submit}>Сохранить</button>
        </div>
      </div>
    </div>
  );
}