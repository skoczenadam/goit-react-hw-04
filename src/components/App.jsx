import { useEffect, useState } from "react";
import axios from "axios";
import ImageGallery from "./ImageGallery";
import SearchBar from "./SearchBar";

//654023
//YtiABf9mZbNztBME72NpXFoEezRqrjN2m0Z0Qb-8_gs
//DO1tJhOls9UICy8qiEBaS6bYTl1G0qt7V0e3a1AmZmo

const KEY = "YtiABf9mZbNztBME72NpXFoEezRqrjN2m0Z0Qb-8_gs";

function App() {
  const [gallery, setGallery] = useState([]);
  const [searchImages, setSearchImages] = useState("");
  useEffect(() => {
    async function fetchImages() {
      if (!searchImages) return;
      try {
        const response = await axios.get(
          `https://api.unsplash.com/search/photos?page=1&query=${searchImages}&client_id=${KEY}`
        );
        if (response.data && response.data.results) {
          setGallery(response.data.results);
        } else {
          setGallery([]);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
        setGallery([]);
      }
    }
    fetchImages();
  }, [searchImages]);

  const handleSearchBar = (e) => {
    e.preventDefault();
    console.log(gallery);
    const form = e.target;
    setSearchImages(form.elements.input.value);
    form.reset();
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchBar} />
      {gallery && gallery.length > 0 ? (
        <ImageGallery gallery={gallery} />
      ) : (
        <p>No images found</p>
      )}
    </div>
  );
}

export default App;
