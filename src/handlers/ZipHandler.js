import { Comic } from "../entities/Comic";
import JSZip from 'jszip';
import { ComicPage } from "../entities/ComicPage";

function determineFileType(filename) {
    if (filename.slice(-4) === '.jpg' || filename.slice(-5) === '.jpeg') {
        return 'jpeg'
    }
    else if (filename.slice(-4) === '.png') {
        return 'png';
    }
    else {
        return '';
    }
}

export async function HandleFile(zipFile) {
    const zip = new JSZip();

    if (zipFile) {
        var images = [];
        var files = [];

        var content = await zip.loadAsync(zipFile);
        
        for (const file in content.files) {
            if (determineFileType(file) !== '') {
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