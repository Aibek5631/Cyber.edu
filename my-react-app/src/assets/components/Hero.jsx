// путь: src/assets/components/Hero.jsx

import React from "react";

export default function Hero({ title, subtitle, ctaText, ctaLink }) {
  return (
    <section className="hero">
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <a href={ctaLink}>{ctaText}</a>
    </section>
  );
}