import { useRef, useState } from "react";

const FileUpload = ({
  label,
  name,
  onFileSelect,
  accept = "image/*,.pdf",
  maxSize = 5, // MB
  error = "",
  required = false,
  className = "",
}) => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileError("");

    if (!file) {
      setFileName("");
      onFileSelect(null);
      return;
    }

    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      setFileError(`File size must be less than ${maxSize}MB`);
      onFileSelect(null);
      return;
    }

    setFileName(file.name);
    onFileSelect(file);
  };

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div
        onClick={() => fileInputRef.current.click()}
        className="border-2 border-dashed border-slate-300 rounded-3xl p-6 text-center cursor-pointer hover:border-blue-500 hover:bg-slate-50 transition"
      >
        <input
          ref={fileInputRef}
          type="file"
          name={name}
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />

        {fileName ? (
          <p className="text-green-600">✓ {fileName}</p>
        ) : (
          <>
            <p className="text-gray-500">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-400 mt-1">
              Accepted: {accept} (Max {maxSize}MB)
            </p>
          </>
        )}
      </div>

      {(error || fileError) && (
        <p className="mt-1 text-sm text-red-600">{error || fileError}</p>
      )}
    </div>
  );
};

export default FileUpload;
