// src/assets/components/StarRating.jsx
export default function StarRating({ rating }) {
  return (
    <div>
      {"⭐".repeat(rating)}{"☆".repeat(5 - rating)}
    </div>
  );
}