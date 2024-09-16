export default function ImageCard({ img, alt }) {
  return (
    <div>
      <img src={img} alt={alt || "Image"} />
    </div>
  );
}
