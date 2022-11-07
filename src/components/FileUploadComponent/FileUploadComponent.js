import { HandleFile } from '../../handlers/ZipHandler';
import React from 'react';

export const FileUpload = ({isLoading, setComics, setIsLoading}) => {
    const uploadFiles = async (event) => {
        if(isLoading) return;

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
            disabled={isLoading}
            multiple />
        </span>
    );
}

export default FileUpload;