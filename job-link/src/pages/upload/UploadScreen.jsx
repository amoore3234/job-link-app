
import "./UploadScreen.css";
import UploadIcon from "../../component/UploadIcon";
import { api } from "../../api/api";

export default function UploadScreen() {
  async function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    try {
      await api.upload(file);
      alert("File uploaded successfully!");
    } catch (error) {
      alert("Failed to upload file.");
      console.error("Error uploading file:", error);
    }
  };
  return (
    <div className="upload-page">
      <h2 className="upload-title">Please Upload Your Resume Document</h2>

      <div className="upload-box">
        <UploadIcon
          color={"#3b82f6"}
        />
        <div className="upload-content">
          <button className="browse-btn">Browse</button>
          <div className="drop-text">Drop file here</div>
        </div>

        <input
          type="file"
          className="file-input"
          accept=".pdf"
          onChange={handleFileUpload}
        />
      </div>
    </div>
  );
}