import React, { useState, useRef } from "react";
import JSZip, * as jszip from "jszip"

import {
    FileUploadContainer,
    FormField,
    DragDropText,
    UploadFileBtn,
    FilePreviewContainer,
    ImagePreview,
    PreviewContainer,
    PreviewList,
    FileMetaData,
    RemoveFileIcon,
    InputLabel
} from "./file-upload.styles";

const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 5242880000;
const MEGA_BYTES_PER_BYTE = 1000000;

const convertNestedObjectToArray = (nestedObj) =>
  Object.keys(nestedObj).map((key) => nestedObj[key]);

const convertBytesToMB = (bytes) => Math.round(bytes / MEGA_BYTES_PER_BYTE);

const FileUpload = ({
    label,
    updateFilesCb,
    maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
    ...otherProps
  }) => {
    const fileInputField = useRef(null);
    const [files, setFiles] = useState({});

    const fileReader = new ArchiveReader();
    let library = useRef(new Comics());
  
    const handleUploadBtnClick = () => {
      fileInputField.current.click();
    };
  
    const addNewFiles = (newFiles) => {
      for (let file of newFiles) {
        if (file.size < maxFileSizeInBytes) {
          if (!otherProps.multiple) {
            return { file };
          }
          files[file.name] = file;
        }
      }
      return { ...files };
    };
  
    const callUpdateFilesCb = (files) => {
      const filesAsArray = convertNestedObjectToArray(files);
      updateFilesCb(filesAsArray);
    };
  
    const handleNewFileUpload = (e) => {
      const { files: newFiles } = e.target;
      if (newFiles.length) {
        let updatedFiles = addNewFiles(newFiles);
        setFiles(updatedFiles);
        callUpdateFilesCb(updatedFiles);
        
        for (let i = 0; i < newFiles.length; i++) {
            let currentFile = newFiles[i];
            let fileName = currentFile.name;
            let res = fileReader.readEntries(currentFile);  
            library.current.newComic(fileName, res);
            console.log('added comic to library: ' + library.current.comics[0].fileName + ' with ' + library.current.comics[0].entries.length + ' pages');
        }
      }
    };
  
    const removeFile = (fileName) => {
      delete files[fileName];
      setFiles({ ...files });
      callUpdateFilesCb({ ...files });
    };
  
    return (
        <>
        <FileUploadContainer>
          <InputLabel>{label}</InputLabel>
          <DragDropText>Drag and drop your files anywhere or</DragDropText>
          <UploadFileBtn type="button" onClick={handleUploadBtnClick}>
            <i className="fas fa-file-upload" />
            <span> Upload {otherProps.multiple ? "files" : "a file"}</span>
          </UploadFileBtn>
          <FormField
            type="file"
            ref={fileInputField}
            onChange={handleNewFileUpload}
            title=""
            value=""
            {...otherProps}
          />
        </FileUploadContainer>
        <FilePreviewContainer>
        <span>To Upload</span>
        <PreviewList>
          {library.current.comics.map((comic, index) => {
            console.log("sono qui");
              if (comic.fileName !== undefined) {
                return (
                <PreviewContainer key={comic.fileName}>
                    <div>
                        <ImagePreview
                            src={URL.createObjectURL(comic.entries[-1])}
                            alt={`file preview ${index}`}
                        />
                    <FileMetaData>
                        <span>{comic.fileName}</span>
                    </FileMetaData>
                    </div>
                </PreviewContainer>
                );
              }
          })}
        </PreviewList>
      </FilePreviewContainer>
        </>
    );
}

class ArchiveReader {
    readEntries(file) {
      var blob = file.slice();
      var reader = new FileReader();
      
      reader.onload = async function(evt) {
        var array_buffer = reader.result;

        try {
            var zip = JSZip();
            var zip = await zip.loadAsync(array_buffer);
            var entries = [];
            Object.keys(zip.files).forEach(function(i) {
            var zip_entry = zip.files[i];
            var name = zip_entry.name;
            var is_file = ! zip_entry.dir;
            var size_compressed = zip_entry._data ? zip_entry._data.compressedSize : 0;
            var size_uncompressed = zip_entry._data ? zip_entry._data.uncompressedSize : 0;

            entries.push({
              name: name,
              is_file: is_file,
              size_compressed: size_compressed,
              size_uncompressed: size_uncompressed,
              readData: function(cb) {
                setTimeout(function() {
                  if (is_file) {
                    var data = zip_entry.asArrayBuffer();
                    //cb(data, null);
                  } else {
                    //cb(null, null);
                  }
                }, 0);
              }
            });
          });

          return entries;
        }
        catch(e) {
          console.log(e);
        }
      };

    reader.readAsArrayBuffer(blob);
  }
}

class Comic {
    constructor(fileName, entries) {
        this.fileName = fileName;
        this.entries = entries;
    }
}

class Comics {
    constructor() {
        this.comics = [];
    }

    newComic(fileName, entries) {
        let comic = new Comic(fileName, entries);
        this.comics.push(comic);

        return comic;
    }

    removeComic(comic) {
        const comicIndex = this.comics.indexOf(comic);
        if (comicIndex > -1) {
            this.comics.splice(comic, 1);
        }
    }

    getAllComics() {
        return this.comics;
    }

    getNumbersOfComics() {
        return this.comics.length;
    }
}

export default FileUpload;
