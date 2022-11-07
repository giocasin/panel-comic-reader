import './ComicPreview.css';

export const ComicPreview = ({comics, openComicPage}) =>  {
    return (
        <div className={'comic-container'}>
            {   
                comics &&
                comics.map(comic => {
                    return (
                        <span key={comic.name} className={'comic-entry'} onClick={() => openComicPage(comic)}>
                            <div className={'comic-entry-data-title'}>
                                {comic.name}
                            </div>
                            <div className={'comic-entry-data-img'}>
                                {
                                    comic.images &&
                                    comic.images[0] &&
                                    <img key={comic.images[0].data.src} src={comic.images[0].data.src} width={'15%'} alt='comic to read' />
                                }
                            </div>
                        </span>
                    );
                })
            }
        </div>
    );
}

export default ComicPreview;