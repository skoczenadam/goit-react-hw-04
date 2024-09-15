export default function ImageGallery({ gallery }) {
  return (
    <ul>
      {gallery.map(({ id, urls, description }) => (
        <li key={id}>
          <div>
            <img src={urls.small} alt={description || "Image"} />
          </div>
        </li>
      ))}
    </ul>
  );
}
