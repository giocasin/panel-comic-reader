import React, { useState } from 'react';
import FileUpload from "./components/file-upload/file-upload.component";

function App() {
  const [newComicReader, setNewComicReader] = useState({
    comics: []
  });

  const updateUploadedFiles = (files) =>
  setNewComicReader({ ...newComicReader, comics: files });

  return (
    <div>
      <FileUpload
          accept=".cbr,.cbz,.cbt,.cb7,.cba"
          label="Comic(s)"
          multiple
          updateFilesCb={updateUploadedFiles}
        />
    </div>
  );
}

export default App;
