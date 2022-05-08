/* 
input 
R,G,B: 0~255

output
H: 0~360
S: 0~1
V: 0~1 
*/
const rgb2hsv = (R: number, G: number, B: number) => {
  const ceil = 255;
  const RGB = [R, G, B].sort((a, b) => a - b);
  const maximum = RGB[2];
  const minimum = RGB[0];

  /* calculate H */
  let H;
  if (R > B && R > G) {
    /* maximum is R */
    H = 60 * ((G - B) / (maximum - minimum));
  } else if (G > B && G > R) {
    /* maximum is G */
    H = 60 * ((B - R) / (maximum - minimum)) + 120;
  } else if (B > R && B > G) {
    /* maximum is B */
    H = 60 * ((R - G) / (maximum - minimum)) + 240;
  } else {
    /* R == G == B */
    H = 0;
  }
  if (H < 0) H += 360;

  /* calculate S */
  const S = (maximum - minimum) / maximum;

  /* calculate V */
  const V = maximum / ceil;

  return { H, S, V };
};

export default rgb2hsv;
