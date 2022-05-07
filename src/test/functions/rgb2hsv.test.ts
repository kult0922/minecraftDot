import rgb2hsv from "src/functions/ImageTrans/rgb2hsv";

test("fizzbuzzのユニットテスト", () => {
  expect(rgb2hsv(189, 69, 179)).toBe({ H: 1, S: 1, V: 1 });
});
