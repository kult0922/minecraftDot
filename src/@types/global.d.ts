interface BlockBasic {
  javaId: string;
  bedrockId: string;
  jname: string;
  imagePath: string;
  blockGroup: string;
}

interface BlockImageData {
  imageData: ImageData;
  R: number;
  G: number;
  B: number;
  H: number;
  S: number;
  V: number;
}

interface Coordinate {
  x: number;
  y: number;
}

interface Coordinate3D {
  x: number;
  y: number;
  z: number;
}

type Mode =
  | "neutral"
  | "pen"
  | "bucket"
  | "picker"
  | "hand"
  | "zoomIn"
  | "zoomOut"
  | "replaceFromPicker"
  | "replaceToPicker";

type Axios = "x" | "y" | "z";
