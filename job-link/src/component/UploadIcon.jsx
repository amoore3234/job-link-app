import "./UploadIcon.css";

const UploadIcon = ({color}) => {
  return (
    <svg className="upload-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Upload--Streamline-Outlined-Material" height="24" width="24">
      <path fill={color} d="M11.25 16.175V6.9l-3 3 -1.075 -1.075L12 4l4.825 4.825 -1.075 1.075 -3 -3v9.275h-1.5ZM5.5 20c-0.4 0 -0.75 -0.15 -1.05 -0.45 -0.3 -0.3 -0.45 -0.65 -0.45 -1.05v-3.575h1.5V18.5h13v-3.575h1.5V18.5c0 0.4 -0.15 0.75 -0.45 1.05 -0.3 0.3 -0.65 0.45 -1.05 0.45H5.5Z" stroke-width="0"></path>
    </svg>
  );
}
export default UploadIcon;