
import "./UploadScreen.css";
import UploadIcon from "../../component/UploadIcon";

export default function UploadScreen() {
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
          accept=".pdf,.doc,.docx"
        />
      </div>
    </div>
  );
}