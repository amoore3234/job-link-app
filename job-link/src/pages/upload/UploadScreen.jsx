
import React, { useState, useRef } from "react";
import { portalApi } from "../../api/portal.api";
import "./UploadScreen.css";
import UploadIcon from "../../component/UploadIcon";
import UploadSuccessIcon from "../../component/UploadSuccessIcon";

function StatusIcon ({ isSuccess }) {
  if (isSuccess) {
    return <UploadSuccessIcon color={"rgb(0,158,4)"} />
  }
  return <UploadIcon color={"#3b82f6"} />
}

export default function UploadScreen() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (isSuccess) return;
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError("");
    }
  };

  const handleUploadSubmit = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    setIsUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("document", file);

    try {
      const uploadCall = await portalApi.upload(formData);
      console.log(`Successful upload: ${uploadCall}`);
      setIsSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleGoHome = (e) => {
    e.stopPropagation();
    window.location.href = "/";
  };

  return (
    <div className="upload-page">
      <h2 className="upload-title">
        Please Upload Your Resume Document
      </h2>

      <div
        className={`upload-box ${isSuccess ? "success-box" : ""}`}
      >
        <StatusIcon isSuccess={isSuccess} />

        <div className="upload-content">
          {!isSuccess && (
            <label
              htmlFor="hidden-file-picker"
              className="browse-btn"
              onClick={() => console.log("HTML Label mouse wrapper registered click event!")}
            >
              Browse
            </label>
          )}
        </div>

        <input
          id="hidden-file-picker"
          type="file"
          className="file-input"
          accept=".pdf,.doc,.docx"
          ref={fileInputRef}
          onChange={handleFileChange}
          // onClick={triggerFileInput}
          disabled={isSuccess}
        />
      </div>
      <div className="file-text">
        {isSuccess ? `Successfully uploaded ${file.name}` : ""}
      </div>
        {isSuccess ? (
          <button className="success-btn" onClick={handleGoHome}>
            View Jobs
          </button>
        ) : (
          file && (
            <button
              className="upload-btn"
              onClick={(e) => {
                // e.stopPropagation();
                handleUploadSubmit();
              }}
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : `Upload Document`}
            </button>
          )
        )}
    </div>
  );
}