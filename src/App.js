import { useState } from 'react';
import { FileUpload } from './components/FileUploadComponent/FileUploadComponent';
import ComicPreview from './components/ComicPreviewComponent/ComicPreviewComponent';
import ComicPage from './components/ComicPageComponent/ComicPageComponent';
import Loader from './components/LoaderComponent/LoaderComponent';
import Logo from './img/icon.jpg';
import './App.css';

export default function App() {
  const [comics, setComics] = useState([]);
  const [currentOpenedComic, setCurrentOpenedComic] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const openComicPage = (comic) => {
    setCurrentOpenedComic(comic);
  }

  const closeComic = () => {
    setCurrentOpenedComic();
  }

  return (
    <div className={'main-interface'}>
      <img src={Logo} alt='logo'/>
      <br />
      <FileUpload
      setComics={setComics} 
      setIsLoading={setIsLoading} />
      {isLoading && <Loader />}
      <ComicPreview
      comics={comics}
      openComicPage={openComicPage} />
      {
        currentOpenedComic &&
        <ComicPage 
        isManga={true}
        comic={currentOpenedComic} 
        closeComic={closeComic} />
      }
    </div>
  );
}
