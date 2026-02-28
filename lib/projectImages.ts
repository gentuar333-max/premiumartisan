export function pickRandomProjectImage(): string {
  const images = [
    "/images/projects/01.webp",
    "/images/projects/02.webp",
    "/images/projects/03.webp",
  ];
  return images[Math.floor(Math.random() * images.length)];
}
