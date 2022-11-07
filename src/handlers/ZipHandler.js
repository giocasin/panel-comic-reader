import { Comic } from "../entities/Comic";
import JSZip from 'jszip';
import { ComicPage } from "../entities/ComicPage";
import { DetermineFileType } from "../utils/FileUtils";


export async function HandleFile(zipFile) {
    const zip = new JSZip();

    if (zipFile) {
        var images = [];
        var files = [];

        var content = await zip.loadAsync(zipFile);
        
        for (const file in content.files) {
            if (DetermineFileType(file) !== '') {
                files.push(file);
                var blob = await zip.file(file).async("blob");           
                const img = new Image();
                img.src = URL.createObjectURL(blob);
                let comicPage = new ComicPage(img, file, 0);
                
                images.push(comicPage);
            }
        }
        
        return new Comic(zipFile.name, files, images);
    }

    throw 'Invalid zip file!';
}