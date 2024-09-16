import { useEffect, useState } from "react";
import ImageGallery from "./ImageGallery";
import SearchBar from "./SearchBar";
import toast, { Toaster } from "react-hot-toast";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import { fetchGalleryWithTopic } from "./gallery-api";
import LoadMoreBtn from "./LoadMoreBtn";

const KEY = "YtiABf9mZbNztBME72NpXFoEezRqrjN2m0Z0Qb-8_gs";

function App() {
  const [gallery, setGallery] = useState([]);
  const [searchImages, setSearchImages] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPageUrl, setCurrentPageUrl] = useState(1);
  useEffect(() => {
    async function fetchImages() {
      if (!searchImages) return;
      try {
        setLoading(true);
        const data = await fetchGalleryWithTopic(
          searchImages,
          KEY,
          currentPageUrl
        );
        setGallery((prev) => [...prev, ...data]);
      } catch (e) {
        setGallery([]);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, [searchImages, currentPageUrl]);

  const handleSearchBar = (e) => {
    e.preventDefault();
    const form = e.target;
    if (form.elements.input.value.trim() === "") {
      toast.error("Empty search bar!");
      return;
    }
    setGallery([]);
    setSearchImages(form.elements.input.value);
    form.reset();
  };

  const handleOnClick = () => {
    setCurrentPageUrl(currentPageUrl + 1);
    console.log(currentPageUrl);
  };

  return (
    <div>
      <Toaster />
      <SearchBar onSubmit={handleSearchBar} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {gallery && gallery.length > 0 ? (
        <>
          <ImageGallery gallery={gallery} />
          <LoadMoreBtn onNextPage={handleOnClick} />
        </>
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default App;
