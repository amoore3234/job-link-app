const UploadSuccessIcon = ({color}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 256 256">
  <g 
    style={{
      stroke: "none", 
      strokeWidth: 0, 
      strokeDasharray: "none", 
      strokeLinecap: "butt", 
      strokeLinejoin: "miter", 
      strokeMiterlimit: 10, 
      fill: "none", 
      fillRule: "nonzero", 
      opacity: 1
    }} 
    transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
  >
    <polygon 
      fill={color} 
      points="37.95,64.44 23.78,50.27 30.85,43.2 37.95,50.3 59.15,29.1 66.22,36.17" 
      style={{
        stroke: "none", 
        strokeWidth: 1, 
        strokeDasharray: "none", 
        strokeLinecap: "butt", 
        strokeLinejoin: "miter", 
        strokeMiterlimit: 10, 
        fillRule: "nonzero", 
        opacity: 1
      }} 
      transform="matrix(1 0 0 1 0 0)" 
    />
    <circle 
      cx="45" 
      cy="45" 
      r="40" 
      fill="none" 
      stroke="#CCCCCC" 
      strokeWidth="1" // <--- Change this number to make it thinner (e.g., 2 or 1) or thicker
    />
  </g>
</svg>
  );
}
export default UploadSuccessIcon;