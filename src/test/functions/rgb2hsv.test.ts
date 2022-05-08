import rgb2hsv from "src/functions/ImageTrans/rgb2hsv";

test("rgb2hsv unit test", () => {
  const { H, S, V } = rgb2hsv(189, 69, 179);
  expect(H).toEqual(expect.closeTo(305, 0.1));
  expect(S).toEqual(expect.closeTo(0.63, 0.1));
  expect(V).toEqual(expect.closeTo(0.74, 0.1));
});
