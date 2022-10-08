import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

export default function FileUploadForm() {
  // const [formData, setFormData] = useState(null);
  const [file, setFile] = useState(null);

  const fInputRef = useRef();

  const onChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      toast.success(data.status);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      <form
        className="upload-form"
        onSubmit={onSubmit}
        encType="multipart/form-data"
      >
        <div className="mb-3">
          <label htmlFor="formFileMultiple" className="form-label">
            Multiple files input example
          </label>
          <input
            ref={fInputRef}
            className="form-control"
            type="file"
            name="file"
            id="file"
            onChange={onChange}
          />
        </div>

        <div className="col-auto">
          <button type="submit" className="btn btn-primary mb-3">
            Upload the file
          </button>
        </div>
      </form>
    </>
  );
}
