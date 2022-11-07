import { HandleFile } from '../../handlers/ZipHandler';
import React from 'react';

export const FileUpload = ({setComics, setIsLoading}) => {
    const uploadFiles = async (event) => {
        setIsLoading(true);
        var comics = [];
        for (var i = 0; i < event.target.files.length; i++) {
            comics.push(await HandleFile(event.target.files[i]));
        }
        setIsLoading(false);
        setComics(comics);
    }

    return (
        <span>
            <input type="file"
            name="files"
            accept='.cbr, .cbz, .zip'
            onChange={uploadFiles} 
            multiple />
        </span>
    );
}

export default FileUpload;