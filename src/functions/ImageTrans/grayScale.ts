const t = (x: number, y: number, c: number) => {
  const w = 256;
  const h = 256;
  return 4 * (y * w + x) + c;
};

const grayScaleFilter = (image: ImageData) => {
  const width = image.width;
  const height = image.height;
  const data = image.data;

  const outImage = new ImageData(width, height);

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const pos = 4 * (i * width + j);

      const R = data[t(j, i, 0)];
      const G = data[t(j, i, 1)];
      const B = data[t(j, i, 2)];

      const lightness = 0.299 * R + 0.587 * G + 0.144 * B;

      outImage.data[pos] = lightness;
      outImage.data[pos + 1] = lightness;
      outImage.data[pos + 2] = lightness;
      outImage.data[pos + 3] = data[pos + 3];
    }
  }

  return outImage;
};

export default grayScaleFilter;
