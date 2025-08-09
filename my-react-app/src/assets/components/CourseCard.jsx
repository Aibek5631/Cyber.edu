import React, { useState } from "react";
import {
  MapIcon,
  FireIcon,
  LightBulbIcon,
  PencilIcon,
  TrashIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";
import "./styles/CourseCard.css";

const gradients = {
  Maps: "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)",
  Weapons: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
  Strategy: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
};

const icons = {
  Maps: MapIcon,
  Weapons: FireIcon,
  Strategy: LightBulbIcon,
};

export default function CourseCard({
  course,
  isAdmin = false,
  onEdit,
  onDelete,
}) {
  const [showPreview, setShowPreview] = useState(false);
  const Icon = icons[course.category] || LightBulbIcon;
  const bg = gradients[course.category] || gradients.Strategy;

  const getEmbedUrl = (url) => {
    if (!url) return "";
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : "";
  };

  return (
    <div className="course-card">
      {isAdmin && (
        <div className="course-card__admin-actions">
          <PencilIcon
            className="admin-icon"
            onClick={() => onEdit(course)}
          />
          <TrashIcon
            className="admin-icon"
            onClick={() => onDelete(course.id)}
          />
        </div>
      )}

      <div
        className="course-card__icon-banner"
        style={{ background: bg }}
      >
        <Icon className="course-card__icon" />
      </div>

      <div className="course-card__body">
        <h3 className="course-card__title">{course.title}</h3>
        <p className="course-card__description">
          {course.description}
        </p>
        <div className="course-card__meta">
          <span>{course.level}</span>
          <span>★ {Number(course.rating).toFixed(1)}</span>
        </div>

        {course.previewUrl && (
          <button
            className="course-card__preview-btn"
            onClick={() => setShowPreview(true)}
          >
            <PlayIcon className="preview-icon" />
            Смотреть превью
          </button>
        )}
      </div>

      {showPreview && (
        <div
          className="preview-modal"
          onClick={() => setShowPreview(false)}
        >
          <div
            className="preview-content"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={getEmbedUrl(course.previewUrl)}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Preview"
            />
          </div>
        </div>
      )}
    </div>
  );
}