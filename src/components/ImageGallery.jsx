import ImageCard from "./ImageCard";

export default function ImageGallery({ gallery }) {
  return (
    <ul>
      {gallery.map(({ id, urls, description }) => (
        <li key={id}>
          <ImageCard img={urls.small} alt={description} />
        </li>
      ))}
    </ul>
  );
}
