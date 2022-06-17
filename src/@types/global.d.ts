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
  L: number;
  a: number;
  b: number;
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

type Edition = "java" | "bedrock";
type Locale = "en" | "ja";
