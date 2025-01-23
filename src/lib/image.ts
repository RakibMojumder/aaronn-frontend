export const shimmer = (w: number, h: number, blur = 50, gray = 200) => {
  return `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#${gray.toString(16)}${gray.toString(
    16
  )}${gray.toString(16)}" offset="20%" />
          <stop stop-color="#${(gray + 20).toString(16)}${(gray + 20).toString(
    16
  )}${gray.toString(16)}" offset="50%" />
          <stop stop-color="#${gray.toString(16)}${gray.toString(
    16
  )}${gray.toString(16)}" offset="70%" />
        </linearGradient>
      </defs>
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="${blur}s" repeatCount="indefinite"  />
    </svg>`;
};

export const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);
