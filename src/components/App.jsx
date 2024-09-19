import { useCallback, useEffect, useState } from "react";
import ImageGallery from "./ImageGallery";
import SearchBar from "./SearchBar";
import toast, { Toaster } from "react-hot-toast";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import { fetchGalleryWithTopic } from "./gallery-api";
import LoadMoreBtn from "./LoadMoreBtn";
import Modal from "react-modal";
import ImageModal from "./ImageModal";
import { debounce } from "lodash";

Modal.setAppElement("#root");

const KEY = "YtiABf9mZbNztBME72NpXFoEezRqrjN2m0Z0Qb-8_gs";

function App() {
  const [gallery, setGallery] = useState([]);
  const [searchImages, setSearchImages] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPageUrl, setCurrentPageUrl] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  const debouncedSetSearchImages = useCallback(
    debounce((value) => setSearchImages(value), 300),
    []
  );

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
        setError(false);
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
    setCurrentPageUrl(1);
    const form = e.target;
    if (form.elements.input.value.trim() === "") {
      toast.error("Empty search bar!", {
        position: "top-right",
      });
      return;
    }
    setGallery([]);
    debouncedSetSearchImages(form.elements.input.value);
    form.reset();
  };

  const handleOnClick = () => {
    setCurrentPageUrl(currentPageUrl + 1);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <Toaster />
      <SearchBar onSubmit={handleSearchBar} />
      {error && <ErrorMessage />}
      {gallery && gallery.length > 0 ? (
        <>
          <ImageGallery
            gallery={gallery}
            onImageClick={handleImageClick}
          />
          <LoadMoreBtn onNextPage={handleOnClick} />
        </>
      ) : (
        <p></p>
      )}
      {loading && <Loader />}
      {selectedImage && (
        <ImageModal
          onSelectedImage={selectedImage}
          onCloseModal={closeModal}
        />
      )}
    </div>
  );
}

export default App;
