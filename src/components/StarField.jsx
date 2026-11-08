import { useMemo } from "react";
import "../styles/starfield.css";

// Random white dots as a box-shadow list (same technique as the Uiverse starfield).
function makeStars(count, size = 2000) {
  const dots = [];
  for (let i = 0; i < count; i += 1) {
    dots.push(`${Math.floor(Math.random() * size)}px ${Math.floor(Math.random() * size)}px #fff`);
  }
  return dots.join(",");
}

export default function StarField() {
  const layers = useMemo(
    () => [
      { size: 1, duration: 50, stars: makeStars(700) },
      { size: 2, duration: 100, stars: makeStars(200) },
      { size: 3, duration: 150, stars: makeStars(100) },
    ],
    []
  );

  return (
    <div className="starfield" aria-hidden="true">
      {layers.map(({ size, duration, stars }) => (
        <div
          className="starfield-layer"
          key={size}
          style={{ "--star-size": `${size}px`, "--star-duration": `${duration}s`, "--stars": stars }}
        />
      ))}
    </div>
  );
}
