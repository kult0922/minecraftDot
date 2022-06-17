/* 
input 
R,G,B: 0~255

output
L: 0~100
a: 0~100
b: 0~100
*/
const rgb2Lab = (R: number, G: number, B: number) => {
  //https://en.wikipedia.org/wiki/SRGB#The_reverse_transformation
  R = R / 255;
  G = G / 255;
  B = B / 255;

  R = R > 0.04045 ? Math.pow((R + 0.055) / 1.055, 2.4) : R / 12.92;
  G = G > 0.04045 ? Math.pow((G + 0.055) / 1.055, 2.4) : G / 12.92;
  B = B > 0.04045 ? Math.pow((B + 0.055) / 1.055, 2.4) : B / 12.92;

  let x = R * 0.4124 + G * 0.3576 + B * 0.1805;
  let y = R * 0.2126 + G * 0.7152 + B * 0.0722;
  let z = R * 0.0193 + G * 0.1192 + B * 0.9505;

  //https://en.wikipedia.org/wiki/Lab_color_space#CIELAB-CIEXYZ_conversions
  let L;
  let a;
  let b;

  x *= 100;
  y *= 100;
  z *= 100;

  x /= 95.047;
  y /= 100;
  z /= 108.883;

  x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 4 / 29;
  y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 4 / 29;
  z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 4 / 29;

  L = 116 * y - 16;
  a = 500 * (x - y);
  b = 200 * (y - z);

  return { L, a, b };
};

export default rgb2Lab;
