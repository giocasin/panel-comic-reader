import { useState, useEffect, useRef } from 'react';
import './ComicPage.css';

export const ComicPage = ({isManga, comic, closeComic}) => {

    const [currentFirstPageIndex, setCurrentFirstPageIndex] = useState(0);
    const [currentSecondPageIndex, setCurrentSecondPageIndex] = useState(1);
    const [currentFirstPage, setCurrentFirstPage] = useState(comic.images[currentFirstPageIndex].data.src);
    const [currentSecondPage, setCurrentSecondPage] = useState(comic.images.length > 1 ? comic.images[currentSecondPageIndex].data.src : undefined);
    const [zoomedView, setZoomedView] = useState(false);
    
    const refFirstImage = useRef('firstImage');
    const refSecondImage = useRef('secondImage');

    useEffect(() => {
        setZoomedView(false);
    }, []);

    useEffect(() => {
        setCurrentFirstPage(comic.images[currentFirstPageIndex].data.src);
        setCurrentSecondPage(comic.images[currentSecondPageIndex].data.src);
    },  [currentFirstPageIndex, currentSecondPageIndex, comic.images]);

    const goNextPage = () => {
        if (currentSecondPageIndex + 1 < comic.images.length ) {
            setCurrentFirstPageIndex(currentFirstPageIndex + 1);
            setCurrentSecondPageIndex(currentSecondPageIndex + 1);
        }
        
    }

    const goPrevPage = () => {
        if (currentFirstPageIndex > 0) {
            setCurrentFirstPageIndex(currentFirstPageIndex - 1);
            setCurrentSecondPageIndex(currentSecondPageIndex - 1);
        }
    }

    const arrowsNavigation = (event) => {
        console.log(event);
        //left arrow pressed
        if (event.keyCode === 37) {
            isManga ? goNextPage() : goPrevPage();
        }
        //right arrow pressed
        else if (event.keyCode === 39) {
            isManga ? goPrevPage() : goNextPage();
        }
    }

    return(
        <div className={'opened-comic'} onKeyDown={(e) => arrowsNavigation(e)}>
            <div className={'comic-navigation'}>
                <button onClick={() => closeComic()}>Close</button>
                <button onClick={() => setZoomedView(!zoomedView)}>Zoomed View</button>
                <button onClick={() => goNextPage()}>Next</button>
                <button onClick={() => goPrevPage()}>Previous</button>
            </div>
            <div className={'pages-container'}>
                <img ref={refFirstImage} src={isManga ? currentSecondPage : currentFirstPage} style={{width: zoomedView === true ? '100%' : '50%', maxWidth: zoomedView === true ? '100%' : '50%', display: isManga && zoomedView === true ? 'none' : 'inline'}}
                    onClick={isManga ? () => goNextPage() : () => goPrevPage()} onSelect={() => {}} alt='comic page'/>

                <img ref={refSecondImage} src={isManga ? currentFirstPage : currentSecondPage} style={{width: zoomedView === true ? '100%' : '50%', maxWidth: zoomedView === true ? '100%' : '50%', display: !isManga && zoomedView === true ? 'none' : 'inline'}}
                onClick={isManga ? () => goPrevPage() : () => goNextPage()} onSelect={() => {}} alt='comic page'/> 
            </div>
        </div>
    );
}

export default ComicPage;