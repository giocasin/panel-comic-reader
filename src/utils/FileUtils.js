export const DetermineFileType = (filename) => {
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