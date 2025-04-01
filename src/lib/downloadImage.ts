const downloadImage = (blob: string): void => {
  const a: HTMLAnchorElement = document.createElement("a");
  a.href = blob;
  a.download = "";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export default downloadImage;
