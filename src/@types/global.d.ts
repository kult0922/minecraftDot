interface BlockBasic {
  imagePath: string;
  javaId: string;
  bedrockId: string;
  jname: string;
  colorGroup: string;
  blockGroup: string;
}

interface BlockImageData {
  imageData: ImageData;
  R: number;
  G: number;
  B: number;
}

interface Coordinate {
  x: number;
  y: number;
}

type Mode = "pen" | "bucket" | "picker" | "hand" | "zoomIn" | "zoomOut";
