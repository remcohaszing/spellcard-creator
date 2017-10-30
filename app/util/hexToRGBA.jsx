export default function hexToRGBA(hex, alpha) {
  const [, red, green, blue] = hex.match(/^#([\da-z]{2})([\da-z]{2})([\da-z]{2})$/);
  return `rgba(${parseInt(red, 16)}, ${parseInt(green, 16)}, ${parseInt(blue, 16)}, ${alpha})`;
}
