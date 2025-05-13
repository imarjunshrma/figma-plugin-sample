
// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This shows the HTML page in "ui.html".
figma.showUI(__html__);
figma.ui.resize(480, 585)

let fontLoaded: boolean = false;
const rgb = figma.util.rgb;
const rgba = figma.util.rgba;

interface CardProps{
  name: string;
  offer: string;
  desc: string;
  brand: string;
  logoHash: string;
  foodImageHash: string;
  foodImageHashArray: string[];
  x: number;
  y: number;
  tsc:string;
  fontData: any;
  colors:any;
  version:string
}
const createShape = ({
  shape,
  type,
  name,
  x,
  y,
  width,
  height,
  rotation = 0,
  opacity = 1,
  cornerRadius = 0,
  cornerSmoothing = 0,
  horizontal = "MIN",
  vertical = "MIN",
  strokeCap = "NONE",
  strokeJoin = "MITER",
  strokeMiterLimit = 4,
  strokeWeight = 1,
  fills,
  strokes,
  arcData,
  color
}: {
  shape?: any,
  type: "vector" | "rectangle" | "elipse" | 'frame',
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  opacity?: number;
  cornerRadius?: number | typeof figma.mixed;
  cornerSmoothing?: number;
  horizontal?: ConstraintType;
  vertical?: ConstraintType;
  strokeCap?: StrokeCap;
  strokeJoin?: StrokeJoin;
  strokeMiterLimit?: number;
  strokeWeight?: number;
  fills?: Paint[],
  strokes?: Paint[],
  arcData?: ArcData,
  color?: Paint[]
}) => {
  // const rectangle = figma.createVector();
  let rectangle;
  if (shape) {
    rectangle = shape;
  } else {
    if (type === "rectangle") {
      rectangle = figma.createRectangle();
    } else if (type === "vector") {
      rectangle = figma.createVector();
    } else if (type === "elipse") {
      rectangle = figma.createEllipse();
    } else if (type === "frame") {
      rectangle = figma.createFrame();
    }
  }


  rectangle.name = name;
  rectangle.visible = true;
  rectangle.x = x;
  rectangle.y = y;
  rectangle.resize(width, height);
  rectangle.rotation = rotation;
  rectangle.opacity = opacity;
  rectangle.cornerRadius = cornerRadius;
  rectangle.cornerSmoothing = cornerSmoothing;
  rectangle.constraints = {
    horizontal,
    vertical
  };
  rectangle.strokeCap = strokeCap;
  rectangle.strokeJoin = strokeJoin;
  rectangle.strokeMiterLimit = strokeMiterLimit;
  rectangle.strokeWeight = strokeWeight;
  if (color?.length) {
    rectangle.fills = color;
  } else {
    if (fills?.length) {
      rectangle.fills = fills;
    } else {
      rectangle.fills = [];
    }
  }
  if (strokes?.length) {
    rectangle.strokes = strokes;
  }
  if (arcData) {
    rectangle.arcData = arcData;
  }
  return rectangle;
};

const createTextNode = ({
  name,
  x,
  y,
  width,
  height,
  opacity = 1,
  horizontal = "MIN",
  vertical = "MIN",
  strokeCap = "NONE",
  strokeJoin = "MITER",
  strokeMiterLimit = 4,
  strokeWeight = 1,
  fills,
  textAlignVertical = "TOP",
  textAlignHorizontal = "LEFT",
  text,
  font,
  fontSize,
  lineHeight,
  letterSpacing,
  color
}: {
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  opacity?: number;
  cornerRadius?: number | typeof figma.mixed;
  cornerSmoothing?: number;
  horizontal?: ConstraintType;
  vertical?: ConstraintType;
  strokeCap?: StrokeCap;
  strokeJoin?: StrokeJoin;
  strokeMiterLimit?: number;
  strokeWeight?: number;
  fills?: Paint[];
  color?: Paint[];
  strokes?: Paint[];
  arcData?: ArcData;
  textAlignVertical?: "TOP" | "CENTER" | "BOTTOM";
  textAlignHorizontal?: "LEFT" | "CENTER" | "RIGHT" | "JUSTIFIED";
  text: string;
  font: FontName;
  fontSize: number;
  lineHeight?: LineHeight;
  letterSpacing?: LetterSpacing;
}) => {
  const textNode = figma.createText();
  textNode.name = name;
  textNode.resize(width, height);
  textNode.x = x;
  textNode.y = y;
  textNode.opacity = opacity;

  if (color?.length) {
    textNode.fills = color;
  } else {
    if (fills?.length) {
      textNode.fills = fills;
    }
  }

  textNode.constraints = {
    horizontal: horizontal || "MIN",
    vertical: vertical || "MIN",
  };

  textNode.textAlignVertical = textAlignVertical;
  textNode.textAlignHorizontal = textAlignHorizontal;
  textNode.characters = text;
  textNode.strokeMiterLimit = strokeMiterLimit;
  textNode.strokeJoin = strokeJoin;
  textNode.strokeCap = strokeCap;
  textNode.strokeWeight = strokeWeight;
  textNode.fontName = font;
  textNode.fontSize = fontSize;

  if (lineHeight !== undefined) {
    textNode.lineHeight = lineHeight;
  }

  if (letterSpacing !== undefined) {
    textNode.letterSpacing = letterSpacing;
  }
  return textNode;
};

// color:colors.cardBgColor,
//       color:colors.descColor,
//        color:colors.ctaColor,
//         color:colors.ctaBgColor,
//           color:colors.offerColor,
//             color:colors.tscColor,
//              color:colors.brandColor,
// Define global font variables with fallback options
let GilroyBlack, GilroyRegular, GilroyExtrabold, GilroyBold, GilroyMedium, RobotoRegular, RobotoBold, RobotoItalic;
let InterRegular, InterBold, InterLight, BalooRegular, Baloo2ExtraBold, Baloo2Regular;
let Baloo2Medium, Baloo2SemiBold, Baloo2Bold, ProximaNovaExtrabold, ProximaNovaRegular;
let ProximaNovaBlack, ProximaNovaBold, ProximaNovaCondensedRegular, GilroyRegularItalic;

//defined Version
const Versions = {
  card1: 6,
  card2: 10,
  card3: 10,
  card4: 10,
  card5: 5,
  card6: 4,
  card7: 2,
  card8: 4,
}

//globally defined font size
const OfferFontSize = {
  card1: 19,
  card2: 18,
  card3: 32,
  card4: 18,
  card5: 39,
  card5S: 16,
  card6: 27,
  card6S: 16,
  card7: 15,
  card8: 19,
}
const CtaFontSize = {
  card1: 19,
  card2: 10,
  card3: 13.45,
  card4: 10,
  card5: 19,
  card5S: 13,
  card6: 19,
  card6S: 13.45,
  card7: 12,
  card8: 19,
}
const DescFontSize = {
  card1: 12,
  card2: 13,
  card3: 17,
  card4: 13,
  card5: 25,
  card5S: 11,
  card6: 39,
  card6S: 30,
  card7: 27,
  card8: 19,
}
const BrandFontSize = {
  card1: 19,
  card2: 11,
  card3: 19,
  card4: 11,
  card5: 27.83,
  card5S: 27.83,
  card6: 27,
  card6S: 27,
  card7: 19,
  card8: 19,
}
const TscFontSize = {
  card1: 19,
  card2: 5,
  card3: 8,
  card4: 19,
  card5: 19,
  card5S: 19,
  card6: 19,
  card6S: 19,
  card7: 8.3,
  card8: 19,
}
type CardKey =
  | "card1"
  | "card2"
  | "card3"
  | "card4"
  | "card5"
  | "card5S"
  | "card6"
  | "card6S"
  | "card7"
  | "card8";
//globally defined line height
const OfferLineHeight: Record<CardKey, LineHeight> = {
  card1: { value: 18.9, unit: "PIXELS" },
  card2: { value: 17, unit: "PIXELS" },
  card3: { value: 32, unit: "PIXELS" },
  card4: { value: 17, unit: "PIXELS" },
  card5: { value: 111, unit: "PERCENT" },
  card5S: { value: 19, unit: "PIXELS" },
  card6: { value: 36.5, unit: "PIXELS" },
  card6S: { value: 19, unit: "PIXELS" },
  card7: { value: 17, unit: "PIXELS" },
  card8: { value: 19, unit: "PIXELS" },
}
const CtaLineHeight: Record<CardKey, LineHeight> = {
  card1: { value: 19, unit: "PIXELS" },
  card2: { value: 16, unit: "PIXELS" },
  card3: { value: 13.8, unit: "PIXELS" },
  card4: { value: 16, unit: "PIXELS" },
  card5: { value: 19, unit: "PIXELS" },
  card5S: { value: 90, unit: "PERCENT" },
  card6: { value: 19, unit: "PIXELS" },
  card6S: { value: 90, unit: "PERCENT" },
  card7: { value: 12.3, unit: "PIXELS" },
  card8: { value: 19, unit: "PIXELS" },
}
const DescLineHeight: Record<CardKey, LineHeight> = {
  card1: { value: 15, unit: "PIXELS" },
  card2: { value: 14, unit: "PIXELS" },
  card3: { value: 20, unit: "PIXELS" },
  card4: { value: 16, unit: "PIXELS" },
  card5: { value: 27, unit: "PIXELS" },
  card5S: { value: 14, unit: "PIXELS" },
  card6: { value: 42, unit: "PIXELS" },
  card6S: { value: 30, unit: "PIXELS" },
  card7: { value: 27, unit: "PIXELS" },
  card8: { value: 19, unit: "PIXELS" },
}
const BrandLineHeight: Record<CardKey, LineHeight> = {
  card1: { value: 19, unit: "PIXELS" },
  card2: { value: 14, unit: "PIXELS" },
  card3: { value: 19, unit: "PIXELS" },
  card4: { value: 14, unit: "PIXELS" },
  card5: { value: 30, unit: "PIXELS" },
  card5S: { value: 30, unit: "PIXELS" },
  card6: { unit: "AUTO" },
  card6S: { unit: "AUTO" },
  card7: { value: 19, unit: "PIXELS" },
  card8: { value: 19, unit: "PIXELS" },
}
const TscLineHeight: Record<CardKey, LineHeight> = {
  card1: { value: 19, unit: "PIXELS" },
  card2: { value: 5, unit: "PIXELS" },
  card3: { value: 32, unit: "PIXELS" },
  card4: { value: 19, unit: "PIXELS" },
  card5: { value: 19, unit: "PIXELS" },
  card5S: { value: 19, unit: "PIXELS" },
  card6: { value: 19, unit: "PIXELS" },
  card6S: { value: 19, unit: "PIXELS" },
  card7: { value: 123.3, unit: "PERCENT" },
  card8: { value: 19, unit: "PIXELS" },
}
//globally defined letter spacing
const OfferLetterSpacing: Record<CardKey, LetterSpacing> = {
  card1: { value: 0, unit: "PIXELS" },
  card2: { value: -0.3, unit: "PIXELS" },
  card3: { value: -0.3, unit: "PIXELS" },
  card4: { value: -0.3, unit: "PIXELS" },
  card5: { value: -0.3, unit: "PERCENT" },
  card5S: { value: -0.3, unit: "PIXELS" },
  card6: { value: 0, unit: "PIXELS" },
  card6S: { value: -0.3, unit: "PIXELS" },
  card7: { value: -0.21, unit: "PIXELS" },
  card8: { value: 19, unit: "PIXELS" },
}
const CtaLetterSpacing: Record<CardKey, LetterSpacing> = {
  card1: { value: 19, unit: "PIXELS" },
  card2: { value: -0.1, unit: "PIXELS" },
  card3: { value: 0, unit: "PIXELS" },
  card4: { value: -0.1, unit: "PIXELS" },
  card5: { value: 19, unit: "PIXELS" },
  card5S: { value: 0, unit: "PIXELS" },
  card6: { value: 19, unit: "PIXELS" },
  card6S: { value: 0, unit: "PIXELS" },
  card7: { value: 0, unit: "PIXELS" },
  card8: { value: 19, unit: "PIXELS" },
}
const DescLetterSpacing: Record<CardKey, LetterSpacing> = {
  card1: { value: -0.29, unit: "PIXELS" },
  card2: { value: 0, unit: "PERCENT" },
  card3: { value: -0.3, unit: "PIXELS" },
  card4: { value: -0.3, unit: "PIXELS" },
  card5: { value: 0, unit: "PIXELS" },
  card5S: { value: -0.26, unit: "PIXELS" },
  card6: { value: 0, unit: "PIXELS" },
  card6S: { value: 0, unit: "PIXELS" },
  card7: { value: -0.21, unit: "PIXELS" },
  card8: { value: 19, unit: "PIXELS" },
}
const BrandLetterSpacing: Record<CardKey, LetterSpacing> = {
  card1: { value: 19, unit: "PIXELS" },
  card2: { value: -0.3, unit: "PIXELS" },
  card3: { value: 19, unit: "PIXELS" },
  card4: { value: -0.3, unit: "PIXELS" },
  card5: { value: 0, unit: "PIXELS" },
  card5S: { value: 27.83, unit: "PIXELS" },
  card6: { value: 0, unit: "PIXELS" },
  card6S: { value: 27, unit: "PIXELS" },
  card7: { value: 19, unit: "PIXELS" },
  card8: { value: 19, unit: "PIXELS" },
}
const TscLetterSpacing: Record<CardKey, LetterSpacing> = {
  card1: { value: 19, unit: "PIXELS" },
  card2: { value: -0.2, unit: "PIXELS" },
  card3: { value: -0.3, unit: "PIXELS" },
  card4: { value: 19, unit: "PIXELS" },
  card5: { value: 19, unit: "PIXELS" },
  card5S: { value: 19, unit: "PIXELS" },
  card6: { value: 19, unit: "PIXELS" },
  card6S: { value: 19, unit: "PIXELS" },
  card7: { value: 4, unit: "PERCENT" },
  card8: { value: 19, unit: "PIXELS" },
}

const Dimensions = {
  card1: { width: 327, height: 104 },
  card2: { width: 292, height: 140 },
  card3: { width: 382, height: 228 },
  card4: { width: 328, height: 118 },
  card5:{width:626,height:486},
  card5s:{width:268,height:170},
  card6:{width:626,height:486},
  card6s:{width:382,height:228},
  card7:{width:360,height:215},
  card8:{width:1200,height:1286},
}
const InitialPositions = {
  card1:{x: 956, y:444},
  card2: { x: 113, y: 381 },
  card3: { x: 115, y: 454 },
  card4: { x: 172, y: 401 },
  card5: { x: 275, y: 873 },
  card5s: { x: 931, y: 873 },
  card6: { x: 2112, y: 873 },
  card6s: { x: 1642, y: 873 },
  card7: { x: 3488, y: 850 },
  card8: { x: 3647, y: 3803 },
}
//mostly used in everywhere in card
const PrimaryColors = {
  card1: {
    "Version 1": "#9D100B",
    "Version 2": "#AD5507",
    "Version 3": "#0D631C",
    "Version 4": "#0F436F",
    "Version 5": "#9A2A3A",
    "Version 6": "#622477"
  },
  card2: {
    "Version 1": "#662E0C",
    "Version 2": "#A42C57",
    "Version 3": "#2B587B",
    "Version 4": "#893485",
    "Version 5": "#BD3753",
    "Version 6": "#08565D",
    "Version 7": "#973633",
    "Version 8": "#313F73",
    "Version 9": "#04582E",
    "Version 10": "#846107",
  },
  card3: {
    "Version 1": "#1D6840",
    "Version 2": "#A0142D",
    "Version 3": "#02616A",
    "Version 4": "#9A7D06",
    "Version 5": "#A2314D",
    "Version 6": "#073E7A",
    "Version 7": "#916419",
    "Version 8": "#352367",
    "Version 9": "#69083B",
    "Version 10": "#615E0C",
  },
  card4: {
    "Version 1": "#662E0C",
    "Version 2": "#A42C57",
    "Version 3": "#2B587B",
    "Version 4": "#893485",
    "Version 5": "#BD3753",
    "Version 6": "#08565D",
    "Version 7": "#973633",
    "Version 8": "#313F73",
    "Version 9": "#04582E",
    "Version 10": "#846107",
  },
  card5: {
    "Version 1": "#452218",
    "Version 2": "#380E4B",
    "Version 3": "#380E4B",
    "Version 4": "#380E4B",
    "Version 5": "#380E4B"
  },
  card5s: {
    "Version 1": "#452218",
    "Version 2": "#380E4B",
    "Version 3": "#380E4B",
    "Version 4": "#380E4B",
    "Version 5": "#380E4B"
  },
  card6: {
    "Version 1": "#1E1D88",
    "Version 2": "#452218",
    "Version 3": "#452218",
    "Version 4": "#452218"
  },
  card6s: {
    "Version 1": "#1E1D88",
    "Version 2": "#452218",
    "Version 3": "#452218",
    "Version 4": "#452218"
  },
  card7: {
    "Version 1": "#801E23",
    "Version 2": "#201F9B"
  },
}
//gradient color
const GradientColors = {
  card1: {
    "Version 1": ["#FFF6F6","#E52019"],
    "Version 2": ["#FFF5F7","#F18221"],
    "Version 3": ["#F1FFF5","#218A3D"],
    "Version 4": ["#FFF2F1","#0D91F8"],
    "Version 5": ["#FFF5F7","#F29AA6"],
    "Version 6": ["#FFFFFF","#551866"]
  },
  card3: {
    "Version 1": ["#6FAC8C","#005026"],
    "Version 2": ["#F26A66","#940825"],
    "Version 3": ["#005E67","#52B7C0"],
    "Version 4": ["#F5DA70","#997C06"],
    "Version 5": ["#E878AC","#9A2841"],
    "Version 6": ["#7897C8","#003875"],
    "Version 7": ["#E8BE79","#8B5F13"],
    "Version 8": ["#322065","#9B8BC8"],
    "Version 9": ["#D86D9E","#600033"],
    "Version 10": ["#CCD17A","#545100"],
  },
  card5: {
    "Version 1": ["#AE715E","#613324"],
    "Version 2": ["#A85095","#270148"],
    "Version 3": ["#6261C7","#0E0D8F"],
    "Version 4": ["#A84A7A","#470832"],
    "Version 5": ["#FF2929","#450000"]
  },
  card5s: {
    "Version 1": ["#AE715E","#613324"],
    "Version 2": ["#A85095","#270148"],
    "Version 3": ["#6261C7","#0E0D8F"],
    "Version 4": ["#A84A7A","#470832"],
    "Version 5": ["#FF2929","#450000"]
  },
  card6: {
    "Version 1": ["#6261C7","#0E0D8F"],
    "Version 2": ["#A84A7A","#470832"],
    "Version 3": ["#CB61AF","#4B1844"],
    "Version 4": ["#AE715E","#613324"]
  },
  card6s: {
    "Version 1": ["#6261C7","#0E0D8F"],
    "Version 2": ["#A84A7A","#470832"],
    "Version 3": ["#CB61AF","#4B1844"],
    "Version 4": ["#AE715E","#613324"]
  },
  card7: {
    "Version 1": ["ED4750","#68151A"],
    "Version 2": ["#6261C7","#0E0D8F"]
  },
}

const EllipseColors = {
  card5: {
    "Version 1": "#4E271B",
    "Version 2": "#10021B",
    "Version 3": "#10021B",
    "Version 4": "#10021B",
    "Version 5": "#10021B",
  },
  card5s: {
    "Version 1": "#4E271B",
    "Version 2": "#10021B",
    "Version 3": "#10021B",
    "Version 4": "#10021B",
    "Version 5": "#10021B",
  },
  card6: {
    "Version 1": "#0F0E4C",
    "Version 2": "#420C38",
    "Version 3": "#420C38",
    "Version 4": "#420C38"
  },
  card6s: {
    "Version 1": "#0F0E4C",
    "Version 2": "#420C38",
    "Version 3": "#420C38",
    "Version 4": "#420C38"
  },
}

const SecondaryColors = {
  card1: {
    "Version 1": "#A5231E",
    "Version 2": "#E37225",
    "Version 3": "#0E641D",
    "Version 4": "#263948",
    "Version 5": "#E43005",
    "Version 6": "#6C1B98"
  }  
}


// Function to load a font and assign a fallback if it fails
async function loadFontWithFallback(fontFamily: string, fontStyle: string, fallbackFont = { family: "Roboto", style: "Regular" }) {
  try {
    await figma.loadFontAsync({ family: fontFamily, style: fontStyle });
    return { family: fontFamily, style: fontStyle };
  } catch (error) {
    console.warn(`Failed to load ${fontFamily}-${fontStyle}, using fallback font: ${error.message}`);
    return fallbackFont;
  }
}


//font loading
async function loadFonts() {
  // const fontStyles = {
  //   "Gilroy": ["Black", "Extrabold", "Bold", "Regular", "Medium"],
  //   "Roboto": ["Regular", "Bold", "Italic"],
  //   "Inter": ["Regular", "Bold", "Light"],
  //   "Baloo":['Regular'],
  //   "Baloo 2":['ExtraBold','Regular','Medium','SemiBold','Bold'],
  //   "Proxima Nova":['Extrabold','Regular','Black','Bold'],
  //   "Proxima Nova Condensed":['Regular'],
  //   "Gilroy-RegularItalic":['☞']
  // };
  GilroyBlack = await loadFontWithFallback("Gilroy", "Black");
  GilroyBold = await loadFontWithFallback("Gilroy", "Bold");
  GilroyRegular = await loadFontWithFallback("Gilroy", "Regular");
  GilroyExtrabold = await loadFontWithFallback("Gilroy", "Extrabold");
  GilroyMedium = await loadFontWithFallback("Gilroy", "Medium");
  RobotoRegular = await loadFontWithFallback("Roboto", "Regular");
  RobotoBold = await loadFontWithFallback("Roboto", "Bold");
  RobotoItalic = await loadFontWithFallback("Roboto", "Italic");
  InterRegular = await loadFontWithFallback("Inter", "Regular");
  InterBold = await loadFontWithFallback("Inter", "Bold");
  InterLight = await loadFontWithFallback("Inter", "Light");
  BalooRegular = await loadFontWithFallback("Baloo", "Regular");
  Baloo2ExtraBold = await loadFontWithFallback("Baloo 2", "ExtraBold");
  Baloo2Regular = await loadFontWithFallback("Baloo 2", "Regular");
  Baloo2Medium = await loadFontWithFallback("Baloo 2", "Medium");
  Baloo2SemiBold = await loadFontWithFallback("Baloo 2", "SemiBold");
  Baloo2Bold = await loadFontWithFallback("Baloo 2", "Bold");
  ProximaNovaExtrabold = await loadFontWithFallback("Proxima Nova", "Extrabold");
  ProximaNovaRegular = await loadFontWithFallback("Proxima Nova", "Regular");
  ProximaNovaBlack = await loadFontWithFallback("Proxima Nova", "Black");
  ProximaNovaBold = await loadFontWithFallback("Proxima Nova", "Bold");
  ProximaNovaCondensedRegular = await loadFontWithFallback("Proxima Nova Condensed", "Regular");
  GilroyRegularItalic = await loadFontWithFallback("Gilroy-RegularItalic", "☞");
}
//load user selected fonts
async function loadUserFonts() {
  try {
    // Load all Gilroy font variants
    await Promise.all([
      figma.loadFontAsync({ family: "Gilroy", style: "Black" }),
      figma.loadFontAsync({ family: "Gilroy", style: "Extrabold" }),
      figma.loadFontAsync({ family: "Gilroy", style: "Bold" }),  // Assuming this variant exists
      figma.loadFontAsync({ family: "Gilroy", style: "Regular" }),  // Assuming this variant exists
      figma.loadFontAsync({ family: "Gilroy", style: "Medium" }),  // Assuming this variant exists
      // figma.loadFontAsync({ family: "Gilroy", style: "RegularItalic" }),  // Assuming this variant exists
      figma.loadFontAsync({ family: "Baloo", style: "Regular" }),  // Assuming this variant exists
      figma.loadFontAsync({ family: "Roboto", style: "Regular" }),  // Fallback font
      figma.loadFontAsync({ family: "Inter", style: "Regular" }),  // Fallback font
      figma.loadFontAsync({ family: "Baloo 2", style: "ExtraBold" }),  // Fallback font
      figma.loadFontAsync({ family: "Baloo 2", style: "Regular" }),  // Fallback font
    ]);

    fontLoaded = true;
    console.log("Fonts loaded successfully.");
  } catch (error) {
    fontLoaded = false;
    await figma.loadFontAsync({ family: "Roboto", style: "Regular" })
    console.error("Failed to load fonts:", error);
  }
}
//load all availableFonts
async function listAndLoadFonts() {
  // Get the list of all available fonts
  const availableFonts = await figma.listAvailableFontsAsync();

  // Create an object to collect styles by family
  const fontsMap = {};

  // Iterate over each font and group styles by family
  availableFonts.forEach(font => {
    const { family, style } = font.fontName;

    if (!fontsMap[family]) {
      fontsMap[family] = [];
    }

    if (!fontsMap[family].includes(style)) {
      fontsMap[family].push(style);
    }
  });

  // Convert the object to an array of objects formatted as cards with versions
  const fontsArray = Object.keys(fontsMap).map((family, index) => {
    return {
      id: index + 1,
      value: family,
      versions: fontsMap[family].map((style, styleIndex) => ({
        id: styleIndex + 1,
        value: `${style}`
      }))
    };
  });

  // Send the fontsArray to the UI
  figma.ui.postMessage({ type: "available-fonts", data: fontsArray });
}
const applyFontOverrides = (fontData: any, defaultFonts: any) => {

  console.log('743...',fontData)
  // Destructure font data for different elements
  const [offerFontThings, copyFontThings, descFontThings, ctaFontThings] = fontData;

  // Helper function to update font properties with default fallbacks
  const updateFontProperties = (target, source) => {
    if (source.font !== null) target.font = { family: target.font, style: target.font.style };
    if (source.size !== null) target.size = source.size;
    if (source.lineHeight !== null) target.lineHeight = { value: source.lineHeight, unit: "PIXELS" };
    if (source.letterSpacing !== null) target.letterSpacing = { value: source.letterSpacing, unit: "PIXELS" };
  };

  // Update each font set based on the user-provided data or default to existing fonts
  updateFontProperties(defaultFonts.offer, offerFontThings);
  updateFontProperties(defaultFonts.brand, copyFontThings);
  updateFontProperties(defaultFonts.desc, descFontThings);
  updateFontProperties(defaultFonts.cta, ctaFontThings);
};

//define custom properties
const seen = new Map();
const RowGap = 100;
const ColumnGap = 100;
const CardsPerRow = 5;
let InitialHorizontal = 0;
const initialY = 0;

// console.log(figma.currentPage)

// function calculateCardPosition(key) {
//   const initialPosition = InitialPositions[key];
//   const initialX = initialPosition.x; // Default initial X position
//   const initialY = initialPosition.y; // Default initial Y position
//   const gapX = ColumnGap; // Horizontal gap
//   const gapY = RowGap; // Vertical gap
//   const cardsPerRow = CardsPerRow; // Number of cards in one row

//   // Dynamically fetch dimensions based on the key
//   const dimensions = Dimensions[key];
//   if (!dimensions) throw new Error(`Dimensions not found for key: ${key}`);

//   let X = initialX ;
//   let Y = initialY;


//   if (seen.has(key)) {
//     const count = seen.get(key) + 1; // Increment the count for the key
//     seen.set(key, count);

//     // Calculate the row and column for the current card
//     const row = Math.floor(count / cardsPerRow);
//     const col = count % cardsPerRow;

//     // Update X and Y based on the row and column
//     X = initialX + col * (dimensions.width + gapX);
//     Y = initialY + row * (dimensions.height + gapY);
//   } else {
//     seen.set(key, 0); // Initialize the count for the key
//   }
//   const Width = dimensions.width
//   const Height = dimensions.height;
//   return { X, Y,Width,Height };
// }

let globalGrid;

function calculateCardPosition(key) {
  const dimensions = Dimensions[key];
  if (!dimensions) throw new Error(`Dimensions not found for key: ${key}`);

  const { width, height } = dimensions;

  // Initialize grid if not already initialized
  if (!globalGrid) {
    initializeGrid(1000, 1000, 50, 50); // Default grid size
  }

  while (true) {
    const position = findAvailablePosition(globalGrid, width, height);
    if (position) {
      const { x, y } = position;

      // Mark the area as occupied
      markGridAsOccupied(globalGrid, x, y, width, height);

      return { X: x, Y: y, Width: width, Height: height };
    }

    // Expand the grid dynamically if no position is found
    resizeGrid(globalGrid, globalGrid.cells.length * 2, globalGrid.cells[0].length * 2);
  }
}

// Helper function to initialize the grid
function initializeGrid(rows, cols, cellWidth, cellHeight) {
  globalGrid = {
    cells: Array.from({ length: rows }, () => Array(cols).fill(false)),
    cellWidth,
    cellHeight,
  };
}

// Helper function to resize the grid
function resizeGrid(grid, newRows, newCols) {
  const { cells } = grid;
  const oldRows = cells.length;
  const oldCols = cells[0].length;

  // Add new rows
  for (let row = oldRows; row < newRows; row++) {
    cells.push(Array(newCols).fill(false));
  }

  // Add new columns to existing rows
  for (let row = 0; row < oldRows; row++) {
    for (let col = oldCols; col < newCols; col++) {
      cells[row].push(false);
    }
  }

  console.log(`Grid resized to ${newRows}x${newCols}`);
}

// Helper function to find the first available position
function findAvailablePosition(grid, cardWidth, cardHeight) {
  const { cells, cellWidth, cellHeight } = grid;
  const rowsNeeded = Math.ceil(cardHeight / cellHeight);
  const colsNeeded = Math.ceil(cardWidth / cellWidth);

  for (let row = 0; row < cells.length; row++) {
    for (let col = 0; col < cells[row].length; col++) {
      if (isAreaFree(cells, row, col, rowsNeeded, colsNeeded)) {
        return { x: col * cellWidth, y: row * cellHeight };
      }
    }
  }

  return null; // Return null if no position is found
}

// Helper function to check if an area is free
function isAreaFree(cells, startRow, startCol, rowsNeeded, colsNeeded) {
  for (let row = startRow; row < startRow + rowsNeeded; row++) {
    for (let col = startCol; col < startCol + colsNeeded; col++) {
      if (row >= cells.length || col >= cells[row].length || cells[row][col]) {
        return false;
      }
    }
  }
  return true;
}

// Helper function to mark the grid as occupied
function markGridAsOccupied(grid, x, y, cardWidth, cardHeight) {
  const { cells, cellWidth, cellHeight } = grid;
  const rowsNeeded = Math.ceil(cardHeight / cellHeight);
  const colsNeeded = Math.ceil(cardWidth / cellWidth);

  const startRow = Math.floor(y / cellHeight);
  const startCol = Math.floor(x / cellWidth);

  for (let row = startRow; row < startRow + rowsNeeded; row++) {
    for (let col = startCol; col < startCol + colsNeeded; col++) {
      cells[row][col] = true;
    }
  }
}


function getColors(key, versionKey, colors) {
  // Check if GradientColors for this key and version exist
  // console.log(key,versionKey,colors);

  const gradientColor1 = colors?.gradient[0]
    ? rgba(colors.gradient[0])
    : (GradientColors[key]?.[versionKey]?.[0] ? rgba(GradientColors[key][versionKey][0]) : null);

  const gradientColor2 = colors?.gradient[1]
    ? rgba(colors.gradient[1])
    : (GradientColors[key]?.[versionKey]?.[1] ? rgba(GradientColors[key][versionKey][1]) : null);

  // Check if PrimaryColors for this key and version exist
  const cColor = colors?.primary
    ? rgb(colors.primary)
    : (PrimaryColors[key]?.[versionKey] ? rgb(PrimaryColors[key][versionKey]) : null);

  const cColor1 = colors?.primary
    ? rgba(colors.primary)
    : (PrimaryColors[key]?.[versionKey] ? rgba(PrimaryColors[key][versionKey]) : null);

  // Check if SecondaryColors for this key and version exist
  const cColor2 = colors?.secondary
    ? rgb(colors.secondary)
    : (SecondaryColors[key]?.[versionKey] ? rgb(SecondaryColors[key][versionKey]) : null);
  
  // Check if EllipseColors for this key and version exist
  const elipseColor = colors?.elipse
    ? rgb(colors.elipse)
    : (EllipseColors[key]?.[versionKey] ? rgb(EllipseColors[key][versionKey]) : null);

    // console.log("color list",  gradientColor1,
    //   gradientColor2,
    //   cColor,
    //   cColor1,
    //   cColor2,
    //   elipseColor);
  return {
    gradientColor1,
    gradientColor2,
    cColor,
    cColor1,
    cColor2,
    elipseColor,
  };
}






//card 8 version1
async function createCard8Version1({name, offer, desc, brand, logoHash, foodImageHash,foodImageHashArray, x, y, tsc, fontData, colors,version:versionKey}:CardProps) {
  ///L2 MH Preset
  //main frame
  // 800350
  // console.log("card 8 ..v.ersion1", xdimensions);
  const frame = createShape({
    type: "frame", x: x,
    y: y, horizontal: "SCALE", vertical: "SCALE", width: 1200, height: 1286, opacity: 1, cornerRadius: 0, cornerSmoothing: 0, strokeWeight: 8, fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 0,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 1,
          b: 1
        },
        boundVariables: {}
      }
    ], name: name || "Whiskas"
  });


  // Mask group
  const vector12 = createShape({
    type: "vector",
    name: "Vector 12",
    x: 386.0563049316406,
    y: 54,
    width: 478.1303405761719,
    height: 1131.601318359375,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 0.8509804010391235,
          g: 0.8509804010391235,
          b: 0.8509804010391235,
        },
        boundVariables: {},
      },
    ],
  });
  vector12.isMask = true;

  const boxFront = createShape({
    type: "rectangle",
    name: "096180-box-front",
    x: -117.97344970703125,
    y: -45.560089111328125,
    width: 1477.4718017578125,
    height: 1457.5596923828125,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "CENTER",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1.1190234422683716,
  });
  const maskGroup = figma.group([vector12, boxFront], frame);
  maskGroup.name = 'Mask group';
  maskGroup.x = 386.05;
  maskGroup.y = 54;
  // maskGroup.constrainProportions = false;
  maskGroup.resize(478.13, 1131.60);
  maskGroup.rotation = 0;
  maskGroup.opacity = 1;

  // Adjust child scaling within the group


  // Group 69
  // Rectangle 1

  const rectangle16 = createShape({
    type: "rectangle",
    name: "Rectangle 16",
    x: 601.05,
    y: 1.056668758392334,
    width: 100,
    height: 100,
    rotation: -90.60543786012995,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 0,
        blendMode: "NORMAL",
        color: {
          r: 0.8509804010391235,
          g: 0.8509804010391235,
          b: 0.8509804010391235,
        },
        boundVariables: {},
      },
    ],
  });

  const rectangle17 = createShape({
    type: "rectangle",
    name: "Rectangle 17",
    x: 601.05,
    y: 1188.056640625,
    width: 100,
    height: 100,
    rotation: -90.60543786012995,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 0,
        blendMode: "NORMAL",
        color: {
          r: 0.8509804010391235,
          g: 0.8509804010391235,
          b: 0.8509804010391235,
        },
        boundVariables: {},
      },
    ],
  });

  // Group 10
  const group10 = figma.group([rectangle16, rectangle17], frame);
  group10.name = 'Group 10';

  // group10.resize(group10.width, group10.height);
  // group10.layoutPositioning = "AUTO";
  group10.rotation = 0;
  group10.opacity = 1;

  const rectangle1x = createShape({
    type: "rectangle",
    name: "Rectangle 1",
    x: 576,
    y: 1,
    width: 50,
    height: 100,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: false,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 0.16249999403953552,
          b: 0.16249999403953552,
        },
        boundVariables: {},
      },
    ],
  });
  const rectangle4x = createShape({
    type: "rectangle",
    name: "Rectangle 4",
    x: 576,
    y: 1187,
    width: 50,
    height: 100,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "CENTER",
    vertical: "MAX",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: false,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 0.16249999403953552,
          b: 0.16249999403953552,
        },
        boundVariables: {},
      },
    ],
  });

  const group69 = figma.group([group10, rectangle4x, rectangle1x], frame);
  group69.name = 'Group 69';
  group69.x = 500;
  group69.y = 0;
  // group69.resize(group69.width, group69.height);
  group69.resize(126, 1288.05);
  // group69.resize(group69.width, group69.height);
  // group69.layoutPositioning = "AUTO";
  group69.rotation = 0;
  group69.opacity = 1;


  group10.x = 500;
  group10.y = 0;
  group10.resize(101.05, 1288.05);

  // Rectangle 4

  // Rectangle 1
  const rectangle1 = createShape({
    type: "rectangle",
    name: "Rectangle 1",
    x: 575,
    y: 0,
    width: 50,
    height: 100,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: false,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 0.16249999403953552,
          b: 0.16249999403953552,
        },
        boundVariables: {},
      },
    ],
  });
  frame.appendChild(rectangle1);

  // Rectangle 4
  const rectangle4 = createShape({
    type: "rectangle",
    name: "Rectangle 4",
    x: 575,
    y: 1186,
    width: 50,
    height: 100,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "CENTER",
    vertical: "MAX",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: false,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 0.16249999403953552,
          b: 0.16249999403953552,
        },
        boundVariables: {},
      },
    ],
  });
  frame.appendChild(rectangle4);

  // Rectangle 21
  const rectangle21 = createShape({
    type: "rectangle",
    name: "Rectangle 21",
    x: 47.52734375,
    y: 630.53125,
    width: 50,
    height: 50,
    rotation: -90.60543786012995,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 0,
        blendMode: "NORMAL",
        color: {
          r: 0.8509804010391235,
          g: 0.8509804010391235,
          b: 0.8509804010391235,
        },
        boundVariables: {},
      },
    ],
  });
  frame.appendChild(rectangle21);

  // Rectangle 22
  const rectangle22 = createShape({
    type: "rectangle",
    name: "Rectangle 22",
    x: 1199.52734375,
    y: 631.53125,
    width: 50,
    height: 50,
    rotation: -90.60543786012995,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 0,
        blendMode: "NORMAL",
        color: {
          r: 0.8509804010391235,
          g: 0.8509804010391235,
          b: 0.8509804010391235,
        },
        boundVariables: {},
      },
    ],
  });
  frame.appendChild(rectangle22);

  // 007516-front 1
  const requiredImage = foodImageHash ? foodImageHash : foodImageHashArray[0];
  const imageNode = await figma.createImageAsync(requiredImage);
  const rectangle007516front1 = createShape({
    type: "rectangle",
    name: "007516-front 1",
    x: 35,
    y: 79,
    width: 1129,
    height: 1129,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "CENTER",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 0.7526665925979614,
    fills: [], // Assuming no fills are specified in the provided JSON.
  });
  rectangle007516front1.fills = [
    {
      type: "IMAGE",
      visible: true,
      opacity: 1,
      blendMode: "NORMAL",
      scaleMode: "FIT",
      imageTransform: [
        [1, 0, 0],
        [0, 1, 0]
      ],
      filters: {
        exposure: 0,
        contrast: 0,
        saturation: 0,
        temperature: 0,
        tint: 0,
        highlights: 0,
        shadows: 0
      },
      scalingFactor: 0.5,
      rotation: 0,
      imageHash: imageNode.hash
    }
  ]
  frame.appendChild(rectangle007516front1);




}

//card 8 version2
async function createCard8Version2({name, offer, desc, brand, logoHash, foodImageHash,foodImageHashArray, x, y, tsc, fontData, colors,version:versionKey}:CardProps) {
  ///L2 MH Preset
  //main frame
  // 800350
  // console.log("card 8 ..v.ersion2", xdimensions);
  const frame = createShape({
    type: "frame", x: x,
    y: y, horizontal: "SCALE", vertical: "SCALE", width: 1200, height: 1286, opacity: 1, cornerRadius: 0, cornerSmoothing: 0, strokeWeight: 8, fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 0,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 1,
          b: 1
        },
        boundVariables: {}
      }
    ], name: name || "800352"
  });


  // Mask group
  const vector12 = createShape({
    type: "vector",
    name: "Vector 13",
    x: 50,
    y: 548.939208984375,
    width: 1100.299072265625,
    height: 191.1216278076172,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 0.8509804010391235,
          g: 0.8509804010391235,
          b: 0.8509804010391235,
        },
        boundVariables: {},
      },
    ],
  });
  vector12.isMask = true;

  const boxFront = createShape({
    type: "rectangle",
    name: "096180-combo",
    x: -158.3982391357422,
    y: -106.4896240234375,
    width: 1518.175048828125,
    height: 1498.739013671875,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1.1190234422683716,
  });
  const maskGroup = figma.group([vector12, boxFront], frame);
  maskGroup.name = 'Mask group';
  maskGroup.x = 50;
  maskGroup.y = 548.939208984375;
  // maskGroup.constrainProportions = false;
  maskGroup.resize(1100.299072265625, 191.1216278076172);
  maskGroup.rotation = 0;
  maskGroup.opacity = 1;

  // Adjust child scaling within the group


  // Group 69
  // Rectangle 1

  const rectangle16 = createShape({
    type: "rectangle",
    name: "Rectangle 16",
    x: 601.05,
    y: 1.056668758392334,
    width: 100,
    height: 100,
    rotation: -90.60543786012995,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 0,
        blendMode: "NORMAL",
        color: {
          r: 0.8509804010391235,
          g: 0.8509804010391235,
          b: 0.8509804010391235,
        },
        boundVariables: {},
      },
    ],
  });

  const rectangle17 = createShape({
    type: "rectangle",
    name: "Rectangle 17",
    x: 601.05,
    y: 1188.056640625,
    width: 100,
    height: 100,
    rotation: -90.60543786012995,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 0,
        blendMode: "NORMAL",
        color: {
          r: 0.8509804010391235,
          g: 0.8509804010391235,
          b: 0.8509804010391235,
        },
        boundVariables: {},
      },
    ],
  });

  // Group 10
  const group10 = figma.group([rectangle16, rectangle17], frame);
  group10.name = 'Group 10';

  // group10.resize(group10.width, group10.height);
  // group10.layoutPositioning = "AUTO";
  group10.rotation = 0;
  group10.opacity = 1;

  const rectangle1x = createShape({
    type: "rectangle",
    name: "Rectangle 1",
    x: 576,
    y: 1,
    width: 50,
    height: 100,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: false,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 0.16249999403953552,
          b: 0.16249999403953552,
        },
        boundVariables: {},
      },
    ],
  });
  const rectangle4x = createShape({
    type: "rectangle",
    name: "Rectangle 4",
    x: 576,
    y: 1187,
    width: 50,
    height: 100,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "CENTER",
    vertical: "MAX",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: false,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 0.16249999403953552,
          b: 0.16249999403953552,
        },
        boundVariables: {},
      },
    ],
  });

  const group69 = figma.group([group10, rectangle4x, rectangle1x], frame);
  group69.name = 'Group 69';
  group69.x = 500;
  group69.y = 0;
  // group69.resize(group69.width, group69.height);
  group69.resize(126, 1288.05);
  // group69.resize(group69.width, group69.height);
  // group69.layoutPositioning = "AUTO";
  group69.rotation = 0;
  group69.opacity = 1;


  group10.x = 500;
  group10.y = 0;
  group10.resize(101.05, 1288.05);

  // Rectangle 4

  // Rectangle 1
  const rectangle1 = createShape({
    type: "rectangle",
    name: "Rectangle 1",
    x: 575,
    y: 0,
    width: 50,
    height: 100,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: false,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 0.16249999403953552,
          b: 0.16249999403953552,
        },
        boundVariables: {},
      },
    ],
  });
  frame.appendChild(rectangle1);

  // Rectangle 4
  const rectangle4 = createShape({
    type: "rectangle",
    name: "Rectangle 4",
    x: 575,
    y: 1186,
    width: 50,
    height: 100,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "CENTER",
    vertical: "MAX",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: false,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 0.16249999403953552,
          b: 0.16249999403953552,
        },
        boundVariables: {},
      },
    ],
  });
  frame.appendChild(rectangle4);

  // Rectangle 21
  const rectangle21 = createShape({
    type: "rectangle",
    name: "Rectangle 21",
    x: 47.52734375,
    y: 630.53125,
    width: 50,
    height: 50,
    rotation: -90.60543786012995,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 0,
        blendMode: "NORMAL",
        color: {
          r: 0.8509804010391235,
          g: 0.8509804010391235,
          b: 0.8509804010391235,
        },
        boundVariables: {},
      },
    ],
  });
  frame.appendChild(rectangle21);

  // Rectangle 22
  const rectangle22 = createShape({
    type: "rectangle",
    name: "Rectangle 22",
    x: 1199.52734375,
    y: 631.53125,
    width: 50,
    height: 50,
    rotation: -90.60543786012995,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 0,
        blendMode: "NORMAL",
        color: {
          r: 0.8509804010391235,
          g: 0.8509804010391235,
          b: 0.8509804010391235,
        },
        boundVariables: {},
      },
    ],
  });
  frame.appendChild(rectangle22);

  // 007516-front 1
  const requiredImage = foodImageHash ? foodImageHash : foodImageHashArray[0];
  const imageNode = await figma.createImageAsync(requiredImage);
  const rectangle007516front1 = createShape({
    type: "rectangle",
    name: "007516-combo 1",
    x: 29,
    y: 72,
    width: 1142,
    height: 1142,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "CENTER",
    vertical: "CENTER",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 0.7613333463668823,
    fills: [], // Assuming no fills are specified in the provided JSON.
  });
  rectangle007516front1.fills = [
    {
      type: "IMAGE",
      visible: true,
      opacity: 1,
      blendMode: "NORMAL",
      scaleMode: "FILL",
      imageTransform: [
        [1, 0, 0],
        [0, 1, 0]
      ],
      filters: {
        exposure: 0,
        contrast: 0,
        saturation: 0,
        temperature: 0,
        tint: 0,
        highlights: 0,
        shadows: 0
      },
      scalingFactor: 0.5,
      rotation: 0,
      imageHash: imageNode.hash
    }
  ]
  frame.appendChild(rectangle007516front1);




}

//card 8 version3
async function createCard8Version3({name, offer, desc, brand, logoHash, foodImageHash,foodImageHashArray, x, y, tsc, fontData, colors,version:versionKey}:CardProps) {
  ///L2 MH Preset
  //main frame
  // 800350
  // console.log("card 8 ..v.ersion3", xdimensions);
  const frame = createShape({
    type: "frame", x:x,
    y: y, horizontal: "SCALE", vertical: "SCALE", width: 1200, height: 1286, opacity: 1, cornerRadius: 0, cornerSmoothing: 0, strokeWeight: 8, fills: [
      {
        type: "SOLID",
        visible: false,
        opacity: 0,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 1,
          b: 1
        },
        boundVariables: {}
      }
    ], name: name || "800354"
  });


  // Mask group
  const vector12 = createShape({
    type: "vector",
    name: "Vector 14",
    x: 215,
    y: 55,
    width: 772.2255249023438,
    height: 1133.1090087890625,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 0.8509804010391235,
          g: 0.8509804010391235,
          b: 0.8509804010391235,
        },
        boundVariables: {},
      },
    ],
  });
  vector12.isMask = true;

  const boxFront = createShape({
    type: "rectangle",
    name: "096180-front",
    x: -136.5,
    y: -47.5,
    width: 1478,
    height: 1461,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1.1190234422683716,
  });
  const maskGroup = figma.group([vector12, boxFront], frame);
  maskGroup.name = 'Mask group';
  maskGroup.x = 215;
  maskGroup.y = 55;
  // maskGroup.constrainProportions = false;
  maskGroup.resize(772.2255249023438, 1133.1090087890625);
  maskGroup.rotation = 0;
  maskGroup.opacity = 1;

  // Adjust child scaling within the group


  // Group 69
  // Rectangle 1

  const rectangle16 = createShape({
    type: "rectangle",
    name: "Rectangle 16",
    x: 601.05,
    y: 1.056668758392334,
    width: 100,
    height: 100,
    rotation: -90.60543786012995,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 0,
        blendMode: "NORMAL",
        color: {
          r: 0.8509804010391235,
          g: 0.8509804010391235,
          b: 0.8509804010391235,
        },
        boundVariables: {},
      },
    ],
  });

  const rectangle17 = createShape({
    type: "rectangle",
    name: "Rectangle 17",
    x: 601.05,
    y: 1188.056640625,
    width: 100,
    height: 100,
    rotation: -90.60543786012995,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 0,
        blendMode: "NORMAL",
        color: {
          r: 0.8509804010391235,
          g: 0.8509804010391235,
          b: 0.8509804010391235,
        },
        boundVariables: {},
      },
    ],
  });

  // Group 10
  const group10 = figma.group([rectangle16, rectangle17], frame);
  group10.name = 'Group 10';

  // group10.resize(group10.width, group10.height);
  // group10.layoutPositioning = "AUTO";
  group10.rotation = 0;
  group10.opacity = 1;

  const rectangle1x = createShape({
    type: "rectangle",
    name: "Rectangle 1",
    x: 576,
    y: 1,
    width: 50,
    height: 100,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: false,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 0.16249999403953552,
          b: 0.16249999403953552,
        },
        boundVariables: {},
      },
    ],
  });
  const rectangle4x = createShape({
    type: "rectangle",
    name: "Rectangle 4",
    x: 576,
    y: 1187,
    width: 50,
    height: 100,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "CENTER",
    vertical: "MAX",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: false,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 0.16249999403953552,
          b: 0.16249999403953552,
        },
        boundVariables: {},
      },
    ],
  });

  const group69 = figma.group([group10, rectangle4x, rectangle1x], frame);
  group69.name = 'Group 69';
  group69.x = 500;
  group69.y = 0;
  // group69.resize(group69.width, group69.height);
  group69.resize(126, 1288.05);
  // group69.resize(group69.width, group69.height);
  // group69.layoutPositioning = "AUTO";
  group69.rotation = 0;
  group69.opacity = 1;


  group10.x = 500;
  group10.y = 0;
  group10.resize(101.05, 1288.05);

  // Rectangle 4

  // Rectangle 1
  const rectangle1 = createShape({
    type: "rectangle",
    name: "Rectangle 1",
    x: 575,
    y: 0,
    width: 50,
    height: 100,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: false,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 0.16249999403953552,
          b: 0.16249999403953552,
        },
        boundVariables: {},
      },
    ],
  });
  frame.appendChild(rectangle1);

  // Rectangle 4
  const rectangle4 = createShape({
    type: "rectangle",
    name: "Rectangle 4",
    x: 575,
    y: 1186,
    width: 50,
    height: 100,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "CENTER",
    vertical: "MAX",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: false,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 0.16249999403953552,
          b: 0.16249999403953552,
        },
        boundVariables: {},
      },
    ],
  });
  frame.appendChild(rectangle4);

  // Rectangle 21
  const rectangle21 = createShape({
    type: "rectangle",
    name: "Rectangle 21",
    x: 47.52734375,
    y: 630.53125,
    width: 50,
    height: 50,
    rotation: -90.60543786012995,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 0,
        blendMode: "NORMAL",
        color: {
          r: 0.8509804010391235,
          g: 0.8509804010391235,
          b: 0.8509804010391235,
        },
        boundVariables: {},
      },
    ],
  });
  frame.appendChild(rectangle21);

  // Rectangle 22
  const rectangle22 = createShape({
    type: "rectangle",
    name: "Rectangle 22",
    x: 1199.52734375,
    y: 631.53125,
    width: 50,
    height: 50,
    rotation: -90.60543786012995,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 0,
        blendMode: "NORMAL",
        color: {
          r: 0.8509804010391235,
          g: 0.8509804010391235,
          b: 0.8509804010391235,
        },
        boundVariables: {},
      },
    ],
  });
  frame.appendChild(rectangle22);

  // 007516-front 1
  const requiredImage = foodImageHash ? foodImageHash : foodImageHashArray[0];
  const imageNode = await figma.createImageAsync(requiredImage);
  const rectangle007516front1 = createShape({
    type: "rectangle",
    name: "007516-box-front 1",
    x: 50,
    y: 73,
    width: 1100,
    height: 1140,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "CENTER",
    vertical: "CENTER",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 0.7613333463668823,
    fills: [], // Assuming no fills are specified in the provided JSON.
  });
  rectangle007516front1.fills = [
    {
      type: "IMAGE",
      visible: true,
      opacity: 1,
      blendMode: "NORMAL",
      scaleMode: "CROP",
      imageTransform: [
        [0.9640995860099792,
          0,
          0.022834232077002525],
        [0, 1, 0]
      ],
      filters: {
        exposure: 0,
        contrast: 0,
        saturation: 0,
        temperature: 0,
        tint: 0,
        highlights: 0,
        shadows: 0
      },
      scalingFactor: 0.5,
      rotation: 0,
      imageHash: imageNode.hash
    }
  ]
  frame.appendChild(rectangle007516front1);




}
//card 8 version4
async function createCard8Version4({name, offer, desc, brand, logoHash, foodImageHash,foodImageHashArray, x, y, tsc, fontData, colors,version:versionKey}:CardProps) {
  ///L2 MH Preset
  //main frame
  // 800350
  // console.log("card 8 ..v.ersion4", xdimensions);
  const frame = createShape({
    type: "frame", x: x,
    y: y, horizontal: "SCALE", vertical: "SCALE", width: 1200, height: 1286, opacity: 1, cornerRadius: 0, cornerSmoothing: 0, strokeWeight: 8, fills: [
      {
        type: "SOLID",
        visible: false,
        opacity: 0,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 1,
          b: 1
        },
        boundVariables: {}
      }
    ], name: name || "196212"
  });


  // Mask group
  const vector12 = createShape({
    type: "vector",
    name: "007516-box-back",
    x: 48,
    y: 571.31,
    width: 1101,
    height: 189.36,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 0.8509804010391235,
          g: 0.8509804010391235,
          b: 0.8509804010391235,
        },
        boundVariables: {},
      },
    ],
  });
  vector12.isMask = true;

  const boxFront = createShape({
    type: "rectangle",
    name: "096180-side-1",
    x: -147.85433959960938,
    y: -97.94287109375,
    width: 1534.36669921875,
    height: 1611.1932373046875,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1.1190234422683716,
  });
  const maskGroup = figma.group([vector12, boxFront], frame);
  maskGroup.name = 'Mask group';
  maskGroup.x = 48;
  maskGroup.y = 571.31;
  // maskGroup.constrainProportions = false;
  maskGroup.resize(1101, 189.36119079589844);
  maskGroup.rotation = 0;
  maskGroup.opacity = 1;

  // Adjust child scaling within the group


  // Group 69
  // Rectangle 1

  const rectangle16 = createShape({
    type: "rectangle",
    name: "Rectangle 16",
    x: 601.05,
    y: 1.056668758392334,
    width: 100,
    height: 100,
    rotation: -90.60543786012995,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 0,
        blendMode: "NORMAL",
        color: {
          r: 0.8509804010391235,
          g: 0.8509804010391235,
          b: 0.8509804010391235,
        },
        boundVariables: {},
      },
    ],
  });

  const rectangle17 = createShape({
    type: "rectangle",
    name: "Rectangle 17",
    x: 601.05,
    y: 1188.056640625,
    width: 100,
    height: 100,
    rotation: -90.60543786012995,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 0,
        blendMode: "NORMAL",
        color: {
          r: 0.8509804010391235,
          g: 0.8509804010391235,
          b: 0.8509804010391235,
        },
        boundVariables: {},
      },
    ],
  });

  // Group 10
  const group10 = figma.group([rectangle16, rectangle17], frame);
  group10.name = 'Group 10';

  // group10.resize(group10.width, group10.height);
  // group10.layoutPositioning = "AUTO";
  group10.rotation = 0;
  group10.opacity = 1;

  const rectangle1x = createShape({
    type: "rectangle",
    name: "Rectangle 1",
    x: 576,
    y: 1,
    width: 50,
    height: 100,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: false,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 0.16249999403953552,
          b: 0.16249999403953552,
        },
        boundVariables: {},
      },
    ],
  });
  const rectangle4x = createShape({
    type: "rectangle",
    name: "Rectangle 4",
    x: 576,
    y: 1187,
    width: 50,
    height: 100,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "CENTER",
    vertical: "MAX",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: false,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 0.16249999403953552,
          b: 0.16249999403953552,
        },
        boundVariables: {},
      },
    ],
  });

  const group69 = figma.group([group10, rectangle4x, rectangle1x], frame);
  group69.name = 'Group 69';
  group69.x = 500;
  group69.y = 0;
  // group69.resize(group69.width, group69.height);
  group69.resize(126, 1288.05);
  // group69.resize(group69.width, group69.height);
  // group69.layoutPositioning = "AUTO";
  group69.rotation = 0;
  group69.opacity = 1;


  group10.x = 500;
  group10.y = 0;
  group10.resize(101.05, 1288.05);

  // Rectangle 4

  // Rectangle 1
  const rectangle1 = createShape({
    type: "rectangle",
    name: "Rectangle 1",
    x: 575,
    y: 0,
    width: 50,
    height: 100,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: false,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 0.16249999403953552,
          b: 0.16249999403953552,
        },
        boundVariables: {},
      },
    ],
  });
  frame.appendChild(rectangle1);

  // Rectangle 4
  const rectangle4 = createShape({
    type: "rectangle",
    name: "Rectangle 4",
    x: 575,
    y: 1186,
    width: 50,
    height: 100,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "CENTER",
    vertical: "MAX",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: false,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 0.16249999403953552,
          b: 0.16249999403953552,
        },
        boundVariables: {},
      },
    ],
  });
  frame.appendChild(rectangle4);

  // Rectangle 21
  const rectangle21 = createShape({
    type: "rectangle",
    name: "Rectangle 21",
    x: 47.52734375,
    y: 630.53125,
    width: 50,
    height: 50,
    rotation: -90.60543786012995,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 0,
        blendMode: "NORMAL",
        color: {
          r: 0.8509804010391235,
          g: 0.8509804010391235,
          b: 0.8509804010391235,
        },
        boundVariables: {},
      },
    ],
  });
  frame.appendChild(rectangle21);

  // Rectangle 22
  const rectangle22 = createShape({
    type: "rectangle",
    name: "Rectangle 22",
    x: 1199.52734375,
    y: 631.53125,
    width: 50,
    height: 50,
    rotation: -90.60543786012995,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 0,
        blendMode: "NORMAL",
        color: {
          r: 0.8509804010391235,
          g: 0.8509804010391235,
          b: 0.8509804010391235,
        },
        boundVariables: {},
      },
    ],
  });
  frame.appendChild(rectangle22);

  // 007516-front 1
  const requiredImage = foodImageHash ? foodImageHash : foodImageHashArray[0];
  const imageNode = await figma.createImageAsync(requiredImage);
  const rectangle007516front1 = createShape({
    type: "rectangle",
    name: "007516-back 1",
    x: 51,
    y: 81,
    width: 1098,
    height: 1124,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "CENTER",
    vertical: "CENTER",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 0.7613333463668823,
    fills: [], // Assuming no fills are specified in the provided JSON.
  });
  rectangle007516front1.fills = [
    {
      type: "IMAGE",
      visible: true,
      opacity: 1,
      blendMode: "NORMAL",
      scaleMode: "CROP",
      imageTransform: [
        [0.9768683314323425,
          0,
          0.011565836146473885],
        [0, 1, 0]
      ],
      filters: {
        exposure: 0,
        contrast: 0,
        saturation: 0,
        temperature: 0,
        tint: 0,
        highlights: 0,
        shadows: 0
      },
      scalingFactor: 0.5,
      rotation: 0,
      imageHash: imageNode.hash
    }
  ]
  frame.appendChild(rectangle007516front1);




}



// ==============================card2=========================================================================================
async function createCard2({name, offer, desc, brand, logoHash, foodImageHash,foodImageHashArray, x, y, tsc, fontData, colors,version:versionKey}:CardProps) {
  const fonts = {
    offer: { font: GilroyBlack, size: OfferFontSize.card2, lineHeight: OfferLineHeight.card2, letterSpacing: OfferLetterSpacing.card2 },
    brand: { font: GilroyExtrabold, size: BrandFontSize.card2, lineHeight: BrandLineHeight.card2, letterSpacing: BrandLetterSpacing.card2 },
    desc: { font: GilroyMedium, size: DescFontSize.card2, lineHeight: DescLineHeight.card2, letterSpacing: DescLetterSpacing.card2 },
    cta: { font: GilroyBlack, size: CtaFontSize.card2, lineHeight: CtaLineHeight.card2, letterSpacing: CtaLetterSpacing.card2 },
    tsc: { font: ProximaNovaRegular, size: TscFontSize.card2, lineHeight: TscLineHeight.card2, letterSpacing: TscLetterSpacing.card2 },
  };

  applyFontOverrides(fontData, fonts);

  const { font: offerFont, size: offerFontSize, lineHeight: offerLineHeight, letterSpacing: offerLetterSpacing } = fonts.offer;
  const { font: brandFont, size: brandFontSize, lineHeight: brandLineHeight, letterSpacing: brandLetterSpacing } = fonts.brand;
  const { font: descFont, size: descFontSize, lineHeight: descLineHeight, letterSpacing: descLetterSpacing } = fonts.desc;
  const { font: ctaFont, size: ctaFontSize, lineHeight: ctaLineHeight, letterSpacing: ctaLetterSpacing } = fonts.cta;
  const { font: tscFont, size: tscFontSize, lineHeight: tscLineHeight, letterSpacing: tscLetterSpacing } = fonts.tsc;

  const {
    gradientColor1,
    gradientColor2,
    cColor,
    cColor1,
    elipseColor,
  } = getColors("card2", versionKey, colors);
  const { X, Y,Width,Height } = calculateCardPosition("card2");

  // 800349 AI Cafe & Bistro BOGO
  const frame = createShape({
    type: "frame",
    name: name || "ZAZA Flat 60% OFF",  // Dynamically used in the variable name
    x: X,
    y: Y,
    width: Width,
    height: Height,
    rotation: 0,
    opacity: 1,
    cornerRadius: 16,
    cornerSmoothing: 1,
    horizontal: "CENTER",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [],
    strokes: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 0.9098039269447327,
          g: 0.9098039269447327,
          b: 0.9098039269447327
        }
      }
    ]
  });

  // Rectangle 6395
  const rectangle6395 = createShape({
    type: "rectangle",  // Type is "rectangle" based on the JSON
    name: "Rectangle 6395",  // Name of the rectangle
    x: 0,
    y: 0,
    width: 296.5911560058594,
    height: 154,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 1,
    horizontal: "SCALE",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 1,
          b: 1
        },
        boundVariables: {}
      }
    ],
    color:colors?.cardBgColor
  });
  frame.appendChild(rectangle6395);

  // Rectangle 53577
  const rectangle53577 = createShape({
    type: "rectangle",  // Type is "rectangle" based on the JSON
    name: "Rectangle 53577",  // Name of the rectangle
    x: 166,
    y: 0,
    width: 126,
    height: 140,
    rotation: 0,
    opacity: 0.4000000059604645,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: []  // Assuming no fills are provided
  });
  rectangle53577.fills = [];
  frame.appendChild(rectangle53577);

  // Get flat 60% OFF*
  const getFlatTextNode = createTextNode({
    name: "Get flat 60% OFF*",  // Name of the text
    x: 16,
    y: 20,
    width: 164,
    height: 17,
    opacity: 1,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: cColor,
        boundVariables: {}
      }
    ],
    textAlignHorizontal: "LEFT",
    textAlignVertical: "TOP",
    text: offer,
    font: offerFont,
    fontSize: offerFontSize,
    color: colors.offerColor,
    lineHeight: offerLineHeight,
    letterSpacing: offerLetterSpacing,
  });
  // Explore the age-old flavors with ZAZA Biryani
  const exploreZazaTextNode = createTextNode({
    name: "Explore the age-old flavors with ZAZA Biryani",  // Name of the text
    x: 16,
    y: 42,
    width: 155,
    height: 28,
    opacity: 1,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 0.6000000238418579,
        blendMode: "NORMAL",
        color: {
          r: 0.007843137718737125,
          g: 0.0235294122248888,
          b: 0.0470588244497776
        },
        boundVariables: {}
      }
    ],
    textAlignHorizontal: "LEFT",
    textAlignVertical: "TOP",
    text: desc,
    font: descFont,
    fontSize: descFontSize,
    lineHeight: descLineHeight,
    letterSpacing: descLetterSpacing,
    color: colors.descColor,
  });

  const groupInfoSimple = figma.group([getFlatTextNode, exploreZazaTextNode], frame);
  groupInfoSimple.name = 'InfoSimple';
  groupInfoSimple.x = 16;
  groupInfoSimple.y = 20;
  // groupInfoSimple.constrainProportions = false;
  groupInfoSimple.resize(164, 50);
  groupInfoSimple.rotation = 0;
  groupInfoSimple.opacity = 1;

  // Frame 1000007110
  const frame1000007110 = createShape({
    type: "frame",  // Type is "frame" based on the JSON
    name: "Frame 1000007110",  // Name of the frame
    x: 16,
    y: 100,
    width: 83,
    height: 28,
    rotation: 0,
    opacity: 1,
    cornerRadius: 40,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: cColor,
        boundVariables: {}
      }
    ],
    color: colors.ctaBgColor,
  });

  const orderNowTextNode = createTextNode({
    name: "ORDER NOW",
    x: 12,
    y: 6,
    width: 59,
    height: 16,
    rotation: 0,
    opacity: 1,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1.0116671323776245,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 1,
          b: 1
        },
        boundVariables: {}
      }
    ],
    text: "ORDER NOW",
    font: ctaFont,
    fontSize: ctaFontSize,
    lineHeight: ctaLineHeight,
    letterSpacing: ctaLetterSpacing,
    color: colors.ctaColor,
    textAlignHorizontal: "CENTER",
    textAlignVertical: "CENTER"
  });
  frame1000007110.appendChild(orderNowTextNode);
  frame.appendChild(frame1000007110);

  // ZAZA	Flat 60% OFF
  const zaraFlat60PercentOff = createShape({
    type: "frame",
    name: "ZAZA Flat 60% OFF",  // Dynamically used in the variable name
    x: 0,
    y: 0,
    width: 292,
    height: 140,
    rotation: 0,
    opacity: 1,
    cornerRadius: 16,
    cornerSmoothing: 1,
    horizontal: "CENTER",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [],
    strokes: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 0.9098039269447327,
          g: 0.9098039269447327,
          b: 0.9098039269447327
        }
      }
    ]
  });
  zaraFlat60PercentOff.fills = [];

  // Rectangle 6395
  const rectangle6395_1 = createShape({
    type: "rectangle",  // Type is "rectangle" based on the JSON
    name: "Rectangle 6395",  // Name of the rectangle
    x: 0,
    y: 0,
    width: 292,
    height: 140,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 1,
    horizontal: "SCALE",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 1,
          b: 1
        },
        boundVariables: {}
      }
    ],
    color:colors?.cardBgColor
  });
  const rectangle53577_x = createShape({
    type: "rectangle",  // Type is "rectangle" based on the JSON
    name: "Rectangle 53577",  // Name of the rectangle
    x: 166,
    y: 0,
    width: 126,
    height: 140,
    rotation: 0,
    opacity: 0.4000000059604645,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: []  // Assuming no fills are provided
  });

  zaraFlat60PercentOff.appendChild(rectangle6395_1);
  zaraFlat60PercentOff.appendChild(rectangle53577_x);
  const getFlatTextNode1 = createTextNode({
    name: "Get flat 60% OFF*",  // Name of the text
    x: 16,
    y: 30,
    width: 164,
    height: 17,
    opacity: 1,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: cColor,
        boundVariables: {}
      }
    ],
    textAlignHorizontal: "LEFT",
    textAlignVertical: "TOP",
    text: offer,
    font: offerFont,
    fontSize: offerFontSize,
    lineHeight: offerLineHeight,
    color: colors.offerColor,
    letterSpacing: offerLetterSpacing,
  });
  const exploreZazaTextNode1 = createTextNode({
    name: "Explore the age-old flavors with ZAZA Biryani",  // Name of the text
    x: 16,
    y: 50,
    width: 112,
    height: 28,
    opacity: 1,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 0.6000000238418579,
        blendMode: "NORMAL",
        color: {
          r: 0.007843137718737125,
          g: 0.0235294122248888,
          b: 0.0470588244497776
        },
        boundVariables: {}
      }
    ],
    textAlignHorizontal: "LEFT",
    textAlignVertical: "TOP",
    text: desc,
    font: descFont,
    fontSize: descFontSize,
    lineHeight: descLineHeight,
    letterSpacing: descLetterSpacing,
    color: colors.descColor,
  });
  const groupInfoSimple1 = figma.group([getFlatTextNode1, exploreZazaTextNode1], zaraFlat60PercentOff);
  groupInfoSimple1.name = 'InfoSimple';
  groupInfoSimple1.x = 16;
  groupInfoSimple1.y = 30;
  // groupInfoSimple.constrainProportions = false;
  groupInfoSimple1.resize(164, 48);
  groupInfoSimple1.rotation = 0;
  groupInfoSimple1.opacity = 1;

  const frame1000007110_1 = createShape({
    type: "frame",  // Type is "frame" based on the JSON
    name: "Frame 1000007110",  // Name of the frame
    x: 16,
    y: 100,
    width: 83,
    height: 28,
    rotation: 0,
    opacity: 1,
    cornerRadius: 40,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    color: colors.ctaBgColor,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: cColor,
        boundVariables: {}
      }
    ]
  });
  const orderNowTextNode1 = createTextNode({
    name: "ORDER NOW",
    x: 12,
    y: 6,
    width: 59,
    height: 16,
    rotation: 0,
    opacity: 1,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1.0116671323776245,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 1,
          b: 1
        },
        boundVariables: {}
      }
    ],
    text: "ORDER NOW",
    font: ctaFont,
    fontSize: ctaFontSize,
    lineHeight: ctaLineHeight,
    letterSpacing: ctaLetterSpacing,
    color: colors.ctaColor,
    textAlignHorizontal: "CENTER",
    textAlignVertical: "CENTER"
  });
  frame1000007110_1.appendChild(orderNowTextNode1);
  zaraFlat60PercentOff.appendChild(frame1000007110_1);
  const elipse1 = createShape({
    type: "elipse",  // Type is "rectangle" based on the JSON
    name: "Ellipse 1",  // Name of the rectangle
    x: -103,
    y: -125,
    width: 180,
    height: 180,
    rotation: 0,
    opacity: 0.34,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MAX",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1.20,
    arcData: {
      startingAngle: 0,
      innerRadius: 0,
      endingAngle: 6.2831854820251465
    },
    fills: [{
      type: "GRADIENT_RADIAL",
      visible: true,
      opacity: 1,
      blendMode: "NORMAL",
      gradientStops: [
        {
          color: cColor1,
          position: 0,
          boundVariables: {}
        },
        {
          color: { ...cColor1, a: 0 },
          position: 1,
          boundVariables: {}
        }
      ],
      gradientTransform: [
        [6.123234262925839e-17, 1, 0],
        [-1, 6.123234262925839e-17, 1]
      ]
    }]  // Assuming no fills are provided
  });
  elipse1.effects = [
    {
      type: "LAYER_BLUR",
      visible: true,
      radius: 31.2, // Adjust to control the blur strength
    }
  ]
  zaraFlat60PercentOff.appendChild(elipse1);
  const rectangle53577_1 = createShape({
    type: "rectangle",  // Type is "rectangle" based on the JSON
    name: "1000x1000-07 1",  // Name of the rectangle
    x: 252,
    y: 11,
    width: 29,
    height: 29,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 0,
    fills: []  // Assuming no fills are provided
  });
  rectangle53577_1.fills = [];
  const group1000007140_1 = figma.group([rectangle53577_1], zaraFlat60PercentOff);
  group1000007140_1.name = 'Group 1000007140';
  group1000007140_1.x = 252;
  group1000007140_1.y = 11;
  // groupInfoSimple.constrainProportions = false;
  group1000007140_1.resize(29, 29);
  group1000007140_1.rotation = 0;
  group1000007140_1.opacity = 1;
  // Ellipse 1
  //group 47
  const requiredImage = foodImageHash ? foodImageHash : foodImageHashArray[0];
  const crispyChikenMangolianImageNode = await figma.createImageAsync(requiredImage);
  const crispyChikenMangolian = createShape({
    type: "rectangle",  // Type is "rectangle" based on the JSON
    name: "Crispy Chicken Mangolian",  // Name of the rectangle
    x: 133,
    y: 22,
    width: 151,
    height: 112.34,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1.20,
    fills: [
      {
        type: "IMAGE",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        scaleMode: "CROP", // Crop the image to fit the rectangle
        imageTransform: [
          [0.8680555820465088,
            0,
            0.0625],
          [0,
            0.6458333730697632,
            0.173611119389534]
        ],
        scalingFactor: 0.5, // Scaling factor applied to image
        filters: {
          exposure: 0,
          contrast: 0,
          saturation: 0,
          temperature: 0,
          tint: 0,
          highlights: 0,
          shadows: 0
        },
        imageHash: crispyChikenMangolianImageNode.hash // Image hash for reference
      }
    ]
  });
  const group47 = figma.group([crispyChikenMangolian], zaraFlat60PercentOff);
  group47.name = 'Group 47';
  group47.x = 133;
  group47.y = 22;
  // groupInfoSimple.constrainProportions = false;
  group47.resize(151, 112.34400177001953);
  group47.rotation = 0;
  group47.opacity = 1;


  frame.appendChild(zaraFlat60PercentOff);
  // ---end inner zara frame --------

  // Rectangle 53577

  // *T&C apply
  const tcApplyTextNode = createTextNode({
    name: "*T&C apply",
    x: 23,
    y: 130,
    width: 23,
    height: 5,
    rotation: 0,
    opacity: 1,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 0.6666666865348816,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 0.44999998807907104,
        blendMode: "NORMAL",
        color: {
          r: 0.007843137718737125,
          g: 0.0235294122248888,
          b: 0.0470588244497776
        },
        boundVariables: {}
      }
    ],
    text: "*T&C apply",
    font: tscFont,
    fontSize: tscFontSize,
    lineHeight: tscLineHeight,
    letterSpacing: tscLetterSpacing,
    color: colors.tscColor,
    textAlignHorizontal: "LEFT",
    textAlignVertical: "TOP"
  });
  if (tsc) {
    frame.appendChild(tcApplyTextNode);
  }

  // ZAZA Biryani
  const zazaBiryaniTextNode = createTextNode({
    name: "ZAZA Biryani",
    x: 16,
    y: 12,
    width: 164,
    height: 14,
    rotation: 0,
    opacity: 1,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 0.6000000238418579,
        blendMode: "NORMAL",
        color: {
          r: 0.007843137718737125,
          g: 0.0235294122248888,
          b: 0.0470588244497776
        },
        boundVariables: {}
      }
    ],
    text: brand,
    font: brandFont,
    fontSize: brandFontSize,
    lineHeight: brandLineHeight,
    letterSpacing: brandLetterSpacing,
    color: colors.brandColor,
    textAlignHorizontal: "LEFT",
    textAlignVertical: "TOP"
  });
  frame.appendChild(zazaBiryaniTextNode);

  // Rectangle 53568
  const rectangle53568 = createShape({
    type: "rectangle",  // Type is "frame" based on the JSON
    name: "Rectangle 53568",  // Name of the frame
    x: 249,
    y: 9,
    width: 34,
    height: 34,
    rotation: 0,
    opacity: 1,
    cornerRadius: 8,
    cornerSmoothing: 0.60,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 1,
          b: 1
        },
        boundVariables: {}
      }
    ],
    strokes: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: cColor,
        boundVariables: {}
      }
    ]
  });

  // image 2721 1
  const image2721ImageNode = await figma.createImageAsync(logoHash);
  const image2721 = createShape({
    type: "rectangle",  // Type is "frame" based on the JSON
    name: "image 2721 1",  // Name of the frame
    x: 251,
    y: 11,
    width: 27,
    height: 27,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "IMAGE",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        scaleMode: "FILL", // Crop the image to fit the rectangle
        imageTransform: [
          [1,
            0,
            0],
          [0,
            1,
            0]
        ],
        scalingFactor: 0.5, // Scaling factor applied to image
        filters: {
          exposure: 0,
          contrast: 0,
          saturation: 0,
          temperature: 0,
          tint: 0,
          highlights: 0,
          shadows: 0
        },
        imageHash: image2721ImageNode.hash // Image hash for reference
      }
    ]
  });

  // Group 1000007140
  const group1000007140 = figma.group([rectangle53568, image2721], frame);
  group1000007140.name = 'Group 1000007140';
  group1000007140.x = 249;
  group1000007140.y = 9;
  // group1000007140.constrainProportions = false;
  group1000007140.resize(34, 34);
  group1000007140.rotation = 0;
  group1000007140.opacity = 1;

  figma.currentPage.appendChild(frame);

}
// ==============================card4=========================================================================================
async function createCard4({name, offer, desc, brand, logoHash, foodImageHash,foodImageHashArray, x, y, tsc, fontData, colors,version:versionKey}:CardProps) {

  const fonts = {
    offer: { font: GilroyBlack, size: OfferFontSize.card4, lineHeight: OfferLineHeight.card4, letterSpacing: OfferLetterSpacing.card4 },
    brand: { font: GilroyExtrabold, size: BrandFontSize.card4, lineHeight: BrandLineHeight.card4, letterSpacing: BrandLetterSpacing.card4 },
    desc: { font: GilroyMedium, size: DescFontSize.card4, lineHeight: DescLineHeight.card4, letterSpacing: DescLetterSpacing.card4 },
    cta: { font: GilroyBlack, size: CtaFontSize.card4, lineHeight: CtaLineHeight.card4, letterSpacing: CtaLetterSpacing.card4 },
    tsc: { font: GilroyBlack, size: TscFontSize.card4, lineHeight: TscLineHeight.card4, letterSpacing: TscLetterSpacing.card4 },
  };

  applyFontOverrides(fontData, fonts);

  const { font: offerFont, size: offerFontSize, lineHeight: offerLineHeight, letterSpacing: offerLetterSpacing } = fonts.offer;
  const { font: brandFont, size: brandFontSize, lineHeight: brandLineHeight, letterSpacing: brandLetterSpacing } = fonts.brand;
  const { font: descFont, size: descFontSize, lineHeight: descLineHeight, letterSpacing: descLetterSpacing } = fonts.desc;
  const { font: ctaFont, size: ctaFontSize, lineHeight: ctaLineHeight, letterSpacing: ctaLetterSpacing } = fonts.cta;
  const { font: tscFont, size: tscFontSize, lineHeight: tscLineHeight, letterSpacing: tscLetterSpacing } = fonts.tsc;
  // card1800349 AI Cafe & Bistro BOGO
  // Create the main frame
  const frame = figma.createFrame();


  const {
    gradientColor1,
    gradientColor2,
    cColor,
    cColor1,
    elipseColor,
  } = getColors("card4", versionKey, colors);
  const { X, Y,Width,Height } = calculateCardPosition("card4");

  // frame.name = "AI Cafe & Bistro BOGO_Topical_5.0";
  // frame.name = name;
  frame.name = name || "AI Cafe & Bistro BOGO_Topical_5.0";
  frame.resize(Width, Height);
  frame.x = X;
  frame.y = Y;
  frame.cornerRadius = 0;
  frame.cornerSmoothing = 0;
  frame.strokeMiterLimit = 4;
  frame.strokeWeight = 1;
  frame.strokeCap = "NONE";
  frame.strokeJoin = "MITER";
  frame.constraints = {
    horizontal: "MIN",
    vertical: "MIN",
  };
  frame.fills = []


  // Create the "Proposed" child frame
  //proposed frame
  const proposedFrame = figma.createFrame();
  proposedFrame.name = "Proposed";
  proposedFrame.x = 5;
  proposedFrame.y = 2;
  proposedFrame.resize(318, 114);
  proposedFrame.cornerRadius = 12;
  proposedFrame.cornerSmoothing = 1;
  proposedFrame.opacity = 1;
  proposedFrame.rotation = 0;
  proposedFrame.strokeMiterLimit = 4;
  proposedFrame.strokeWeight = 1;
  proposedFrame.strokeCap = "NONE";
  proposedFrame.strokeJoin = "MITER";
  proposedFrame.strokes = [
    {
      type: "SOLID",
      visible: true,
      color: { r: 0.9098039269447327, g: 0.9098039269447327, b: 0.9098039269447327 },
      opacity: 1,
      blendMode: "NORMAL",
    }
  ]


  //childrens of proposed frames
  // Create the rectangle inside "Proposed"
  const rectangle = figma.createRectangle();
  rectangle.visible = true;
  rectangle.x = 0;
  rectangle.y = 0;
  rectangle.resize(318, 114)
  rectangle.rotation = 1;
  rectangle.cornerRadius = 0;
  rectangle.cornerSmoothing = 1;
  rectangle.constraints = {
    horizontal: "SCALE",
    vertical: "MIN",
  };
  rectangle.strokeCap = "NONE";
  rectangle.strokeJoin = "MITER";
  rectangle.strokeMiterLimit = 4;
  rectangle.strokeWeight = 1;
  rectangle.fills = [
    {
      type: "SOLID",
      visible: true,
      color: { r: 1, g: 1, b: 1 },
      opacity: 1,
      blendMode: "NORMAL",
    }
  ]

  if (colors.cardBgColor?.length) {
    rectangle.fills = colors.cardBgColor;
  }
  proposedFrame.appendChild(rectangle);


  // Create the "AI Cafe & Bistro" text node
  const aiCafeText = figma.createText();
  // text1.name = 'All Restaurants';
  // aiCafeText.name = offer;
  aiCafeText.name = "AI Cafe & Bistro";
  aiCafeText.x = 16;
  aiCafeText.y = 12;
  aiCafeText.resize(164, 14);
  // aiCafeText.fontName = { family: "Proxima Nova", style: "Black" };
  // aiCafeText.fontName = { family: "Roboto", style: "Regular" };

  aiCafeText.opacity = 1;

  // aiCafeText.lineHeight = { value: 32, unit: 'PIXELS' };
  aiCafeText.fills = [{
    type: 'SOLID', visible: true, opacity: 0.6000000238418579, blendMode: 'NORMAL', color: {
      r: 0.007843137718737125,
      g: 0.0235294122248888,
      b: 0.0470588244497776
    }
  }];
  aiCafeText.textAlignVertical = "TOP";
  aiCafeText.textAlignHorizontal = "LEFT";
  // aiCafeText.characters = "Buy 1 \nGet 1 Free";
  // aiCafeText.characters = "AI Cafe & Bistro";
  aiCafeText.characters = brand;
  aiCafeText.strokeMiterLimit = 4;
  aiCafeText.strokeJoin = "MITER";
  aiCafeText.strokeCap = "NONE";
  aiCafeText.strokeWeight = 1;
  aiCafeText.fontName = brandFont
  aiCafeText.fontSize = brandFontSize;
  // aiCafeText.lineHeight = { value: 14, unit: "PIXELS" }; // You can use 'PIXELS' or 'AUTO' for line height
  aiCafeText.lineHeight = brandLineHeight; // You can use 'PIXELS' or 'AUTO' for line height
  aiCafeText.letterSpacing = brandLetterSpacing;
  if (colors.brandColor?.length) {
    aiCafeText.fills = colors.brandColor;
  }

  proposedFrame.appendChild(aiCafeText);

  // InfoSimple group



  const buy1Text = figma.createText();
  // text1.name = 'All Restaurants';
  // buy1Text.name = offer;
  buy1Text.name = "Buy 1 get 1 free";
  buy1Text.resize(174, 17);
  buy1Text.x = 16;
  buy1Text.y = 30;


  buy1Text.opacity = 1;
  buy1Text.fontSize = 18;
  // buy1Text.lineHeight = { value: 32, unit: 'PIXELS' };
  buy1Text.fills = [{
    type: 'SOLID', visible: true, opacity: 1, blendMode: 'NORMAL', color: cColor
  }];
  buy1Text.constraints = {
    horizontal: "MIN",
    vertical: "MIN",
  };
  buy1Text.textAlignVertical = "TOP";
  buy1Text.textAlignHorizontal = "LEFT";
  // buy1Text.characters = "Buy 1 \nGet 1 Free";
  // buy1Text.characters = "Buy 1 get 1 free";
  buy1Text.characters = offer;
  buy1Text.strokeMiterLimit = 4;
  buy1Text.strokeJoin = "MITER";
  buy1Text.strokeCap = "NONE";
  buy1Text.strokeWeight = 1;
  buy1Text.fontName = offerFont;
  buy1Text.fontSize = offerFontSize;
  buy1Text.lineHeight = offerLineHeight;
  buy1Text.letterSpacing = offerLetterSpacing;
  if (colors.offerColor?.length) {
    buy1Text.fills = colors.offerColor;
  }

  const infoSimple = figma.group([buy1Text], proposedFrame);
  infoSimple.name = "Info Simple";
  infoSimple.resize(174, 17);
  infoSimple.x = 16;
  infoSimple.y = 30;
  infoSimple.opacity = 1;
  infoSimple.rotation = 0;
  // infoSimple.appendChild(buy1Text);


  // proposedFrame.appendChild(infoSimple);


  const elipse1 = figma.createEllipse();
  elipse1.visible = true;
  elipse1.name = "Ellipse 1";
  elipse1.x = -77;
  elipse1.y = -125;
  elipse1.resize(180, 180);
  elipse1.rotation = 0;
  elipse1.opacity = 0.3499999940395355;
  elipse1.cornerRadius = 0;
  elipse1.cornerSmoothing = 0;
  elipse1.constraints = {
    horizontal: "MAX",
    vertical: "MIN",
  };
  elipse1.strokeCap = "NONE";
  elipse1.strokeJoin = "MITER";
  elipse1.strokeMiterLimit = 4;
  elipse1.strokeWeight = 1.2000000476837158;
  elipse1.arcData = {
    startingAngle: 0,
    endingAngle: 6.2831854820251465,
    innerRadius: 0
  }
  elipse1.fills = [
    {
      type: "GRADIENT_RADIAL",
      visible: true,
      opacity: 1,
      blendMode: "NORMAL",
      gradientStops: [
        {
          color: cColor1,
          position: 0,
          boundVariables: {}
        },
        {
          color: { ...cColor1, a: 0 },
          position: 1,
          boundVariables: {}
        }
      ],
      gradientTransform: [
        [
          6.123234262925839e-17,
          1,
          0
        ],
        [
          -1,
          6.123234262925839e-17,
          1
        ]
      ]
    }
  ]

  proposedFrame.appendChild(elipse1);


  // Frame 1000007110
  const frame1000007110 = figma.createFrame();
  frame1000007110.visible = true;
  frame1000007110.name = "Frame 1000007110";
  frame1000007110.resize(79, 24);
  frame1000007110.x = 16;
  frame1000007110.y = 78;
  frame1000007110.rotation = 0;
  frame1000007110.opacity = 1;
  frame1000007110.cornerRadius = 40;
  frame1000007110.cornerSmoothing = 0;
  frame1000007110.constraints = {
    horizontal: "MIN",
    vertical: "MIN",
  };
  frame1000007110.strokeCap = "NONE";
  frame1000007110.strokeJoin = "MITER";
  frame1000007110.strokeMiterLimit = 4;
  frame1000007110.strokeWeight = 1;
  frame1000007110.fills = [{
    type: 'SOLID', visible: true, opacity: 1, blendMode: 'NORMAL', color: cColor
  }];
  if (colors.ctaBgColor?.length) {
    frame1000007110.fills = colors.ctaBgColor;
  }

  proposedFrame.appendChild(frame1000007110);

  const cta = figma.createText();
  cta.name = "ORDER NOW";
  cta.resize(59, 16);
  cta.x = 10;
  cta.y = 4;
  cta.strokeCap = "NONE";
  cta.strokeJoin = "MITER";
  cta.strokeMiterLimit = 4;
  cta.strokeWeight = 1.0116671323776245;
  cta.constraints = {
    horizontal: "MIN",
    vertical: "MIN",
  };
  cta.textAlignHorizontal = "CENTER";
  cta.textAlignVertical = "CENTER";
  cta.fills = [{
    type: 'SOLID', visible: true, opacity: 1, blendMode: 'NORMAL', color: {
      r: 1,
      g: 1,
      b: 1
    }
  }];
  cta.characters = "ORDER NOW";
  cta.fontName = ctaFont;
  cta.fontSize = ctaFontSize;
  cta.lineHeight = ctaLineHeight;
  cta.letterSpacing = ctaLetterSpacing;
  if (colors.ctaColor?.length) {
    cta.fills = colors.ctaColor;
  }
  frame1000007110.appendChild(cta);






  // Double your delights
  const doubleDelightText = figma.createText();
  doubleDelightText.name = 'Double your delights';
  // doubleDelightText.resize(36, 32);
  doubleDelightText.x = 16;
  doubleDelightText.y = 48;
  doubleDelightText.opacity = 1;
  doubleDelightText.rotation = 0;
  doubleDelightText.constraints = {
    horizontal: "MIN",
    vertical: "MIN",
  };
  doubleDelightText.fills = [{
    type: 'SOLID', visible: true, opacity: 0.6000000238418579, blendMode: 'NORMAL', color: {
      r: 0.007843137718737125,
      g: 0.0235294122248888,
      b: 0.0470588244497776
    }
  }];
  doubleDelightText.textAlignVertical = "TOP";
  doubleDelightText.textAlignHorizontal = "LEFT";
  // doubleDelightText.characters = "Double your delights";
  doubleDelightText.characters = desc;
  doubleDelightText.strokeCap = "NONE";
  doubleDelightText.strokeJoin = "MITER";
  doubleDelightText.strokeMiterLimit = 4;
  doubleDelightText.strokeWeight = 1;
  doubleDelightText.fontName = descFont;
  doubleDelightText.fontSize = descFontSize;
  doubleDelightText.lineHeight = descLineHeight;
  doubleDelightText.letterSpacing = descLetterSpacing;
  if (colors.descColor?.length) {
    doubleDelightText.fills = colors.descColor;
  }


  proposedFrame.appendChild(doubleDelightText);




  frame.appendChild(proposedFrame);

  //create main image
  //because image will be provided with the shadow 
  //so no need to create vector
  const barfiRectange = figma.createRectangle();
  barfiRectange.visible = true;
  barfiRectange.x = 174;
  barfiRectange.y = 4;
  barfiRectange.resize(114, 114)
  barfiRectange.rotation = 0;
  barfiRectange.opacity = 1;
  barfiRectange.cornerRadius = 0;
  barfiRectange.cornerSmoothing = 0;
  barfiRectange.constraints = {
    horizontal: "MIN",
    vertical: "MIN",
  };
  barfiRectange.strokeCap = "NONE";
  barfiRectange.strokeJoin = "MITER";
  barfiRectange.strokeMiterLimit = 4;
  barfiRectange.strokeWeight = 1;

  //create image node
  const requiredImage = foodImageHash ? foodImageHash : foodImageHashArray[0];
  const barfiRectangeImageNode = await figma.createImageAsync(requiredImage);
  barfiRectange.fills = [
    {
      type: "IMAGE",
      visible: true,
      opacity: 1,
      blendMode: "NORMAL",
      scaleMode: "FILL",
      imageTransform: [
        [
          0.826388955116272,
          0,
          0.0902777835726738
        ],
        [
          0,
          0.5208333134651184,
          0.2361111044883728
        ]
      ],
      scalingFactor: 0.5,
      filters: {
        exposure: 0,
        contrast: 0,
        saturation: 0,
        temperature: 0,
        tint: 0,
        highlights: 0,
        shadows: 0
      },
      imageHash: barfiRectangeImageNode.hash

    }
  ]

  frame.appendChild(barfiRectange);



  //logo Frame
  const almoundRectangle = figma.createRectangle();
  almoundRectangle.visible = true;
  almoundRectangle.x = 278;
  almoundRectangle.y = 8;
  almoundRectangle.resize(32, 32)
  almoundRectangle.rotation = 0;
  almoundRectangle.opacity = 1;
  almoundRectangle.cornerRadius = 10;
  almoundRectangle.cornerSmoothing = 0.6000000238418579;
  almoundRectangle.constraints = {
    horizontal: "MIN",
    vertical: "MIN",
  };
  almoundRectangle.strokeCap = "NONE";
  almoundRectangle.strokeJoin = "MITER";
  almoundRectangle.strokeMiterLimit = 4;
  almoundRectangle.strokeWeight = 1.5;
  almoundRectangle.fills = [
    {
      type: "SOLID",
      visible: true,
      color: { r: 1, g: 1, b: 1 },
      opacity: 1,
      blendMode: "NORMAL",
    }
  ]
  almoundRectangle.strokes = [
    {
      type: "SOLID",
      visible: true,
      color: cColor,
      opacity: 1,
      blendMode: "NORMAL",
    }
  ]

  const cakeZoneRectangle = figma.createRectangle();
  cakeZoneRectangle.visible = true;
  cakeZoneRectangle.x = 280;
  cakeZoneRectangle.y = 19;
  cakeZoneRectangle.resize(28, 11)
  cakeZoneRectangle.rotation = 0;
  cakeZoneRectangle.opacity = 1;
  cakeZoneRectangle.cornerRadius = 0;
  cakeZoneRectangle.cornerSmoothing = 0;
  cakeZoneRectangle.constraints = {
    horizontal: "MIN",
    vertical: "MIN",
  };
  cakeZoneRectangle.strokeCap = "NONE";
  cakeZoneRectangle.strokeJoin = "MITER";
  cakeZoneRectangle.strokeMiterLimit = 4;
  cakeZoneRectangle.strokeWeight = 1;

  //create image node
  const imageNode = await figma.createImageAsync(logoHash);
  cakeZoneRectangle.fills = [
    {
      type: "IMAGE",
      visible: true,
      opacity: 1,
      blendMode: "NORMAL",
      scaleMode: "CROP",
      imageTransform: [
        [
          1,
          0,
          0
        ],
        [
          0,
          1,
          0
        ]
      ],
      filters: {
        exposure: 0,
        contrast: 0,
        saturation: 0,
        temperature: 0,
        tint: 0,
        highlights: 0,
        shadows: 0
      },
      scalingFactor: 0.5,
      rotation: 0,
      imageHash: imageNode.hash

    }
  ]

  //create logo group
  const logoGroup = figma.group([almoundRectangle, cakeZoneRectangle], frame);
  logoGroup.x = 278;
  logoGroup.y = 8;
  logoGroup.resize(32, 32);
  logoGroup.rotation = 0;
  logoGroup.opacity = 1;
  logoGroup.name = "Logo";
  figma.currentPage.appendChild(frame);
  // figma.viewport.scrollAndZoomIntoView([frame]);
}
// ==============================card3=========================================================================================
async function createCard3({name, offer, desc, brand, logoHash, foodImageHash,foodImageHashArray, x, y, tsc, fontData, colors,version:versionKey}:CardProps) {
   await listAndLoadFonts();
    await loadFonts();

  const fonts = {
    offer: { font: ProximaNovaBlack, size: OfferFontSize.card3, lineHeight: OfferLineHeight.card3, letterSpacing: OfferLetterSpacing.card3 },
    brand: { font: Baloo2Regular, size: BrandFontSize.card3, lineHeight: BrandLineHeight.card3, letterSpacing: BrandLetterSpacing.card3 },
    desc: { font: ProximaNovaRegular, size: DescFontSize.card3, lineHeight: DescLineHeight.card3, letterSpacing: DescLetterSpacing.card3 },
    cta: { font: ProximaNovaExtrabold, size: CtaFontSize.card3, lineHeight: CtaLineHeight.card3, letterSpacing: CtaLetterSpacing.card3 },
    tsc: { font: ProximaNovaRegular, size: TscFontSize.card3, lineHeight: TscLineHeight.card3, letterSpacing: TscLetterSpacing.card3 },
  };

  // console.log("card3 ...calling")
  // applyFontOverrides(fontData, fonts);
 
  console.log('4140...')
  const { font: offerFont, size: offerFontSize, lineHeight: offerLineHeight, letterSpacing: offerLetterSpacing } = fonts.offer;
  const { font: brandFont, size: brandFontSize, lineHeight: brandLineHeight, letterSpacing: brandLetterSpacing } = fonts.brand;
  const { font: descFont, size: descFontSize, lineHeight: descLineHeight, letterSpacing: descLetterSpacing } = fonts.desc;
  const { font: ctaFont, size: ctaFontSize, lineHeight: ctaLineHeight, letterSpacing: ctaLetterSpacing } = fonts.cta;
  const { font: tscFont, size: tscFontSize, lineHeight: tscLineHeight, letterSpacing: tscLetterSpacing } = fonts.tsc;


  const {
    gradientColor1,
    gradientColor2,
    cColor,
    cColor1,
    elipseColor,
  } = getColors("card3", versionKey, colors);
  const { X, Y,Width,Height } = calculateCardPosition("card3");
  console.log("card3 ...calling 4155")
  const cGradient: Paint[] = [
    {
      type: "GRADIENT_LINEAR",
      visible: true,
      opacity: 1,
      blendMode: "NORMAL",
      gradientStops: [
        {
          color: gradientColor1,
          position: 0,
          boundVariables: {}
        },
        {
          color: gradientColor2,
          position: 1,
          boundVariables: {}
        }
      ],
      gradientTransform: [
        [-0.9809927940368652, -0.22257739305496216, 1.1188262701034546],
        [0.8523622155189514, -0.39491376280784607, 0.22000472247600555]
      ]
    }
  ]
  console.log("card3 ...calling 4180")
  // 800349 AI Cafe & Bistro BOGO
  const frame = createShape({
    type: "frame",
    x: X,
    y: Y,
    width: Width,
    height: Height,
    rotation: 0,
    opacity: 1,
    cornerRadius: 20,
    cornerSmoothing: 1,
    strokeWeight: 1,
    fills: cGradient,
    name: name || "91660 Maplai Parotta BOGO",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    color: null,
    strokeMiterLimit: 4
  });

  // image 1348
  const image1348 = createShape({
    type: "rectangle",
    name: "image 1348",
    x: 258,
    y: 28,
    width: 91,
    height: 89,
    rotation: 0,
    opacity: 1,
    cornerRadius: 2,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1.1309943199157715,
    fills: [],
    strokes: []
  });
  image1348.fills = [];
  frame.appendChild(image1348);


  // Create a frame for the CTA button
  const ctaFrame = createShape({
    type: "frame",
    name: "CTA",
    x: 24,
    y: 163,
    width: 102,
    height: 32.505,
    opacity: 1,
    cornerRadius: 5.604,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 0.56,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: { r: 1, g: 1, b: 1 },
        boundVariables: {}
      }
    ],
    color: null,
  });

  // Create a text node for the "Most ordered from ar" section
  const mostOrderedFromArText = createTextNode({
    name: "Most ordered from ar",
    x: 10.088,
    y: 8.967,
    width: 81.824,
    height: 14.571,
    opacity: 1,
    horizontal: "SCALE",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 0,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: cColor,
        boundVariables: {}
      }
    ],
    color: null,
    text: "ORDER NOW",
    font: ctaFont,
    fontSize: ctaFontSize,
    lineHeight: ctaLineHeight,
    letterSpacing: ctaLetterSpacing,
    textAlignVertical: "CENTER",
    textAlignHorizontal: "CENTER"
  });

  ctaFrame.appendChild(mostOrderedFromArText);

  frame.appendChild(ctaFrame);



  // Group 5905648
  const doubleYourDelightsText = createTextNode({
    name: "Double your delights from Fryde Cafe.",
    x: 24,
    y: 101.45,
    width: 190,
    height: 36,
    opacity: 0.9,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 0,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: { r: 1, g: 1, b: 1 },
        boundVariables: {}
      }
    ],
    text: desc,
    font: descFont,
    fontSize: descFontSize,
    lineHeight: descLineHeight,
    letterSpacing: descLetterSpacing,
    textAlignVertical: "TOP",
    color: colors.descColor,
    textAlignHorizontal: "LEFT"
  });
  frame.appendChild(doubleYourDelightsText);

  // All Restaurants
  const allRestaurantsText = createTextNode({
    name: "All Restaurants",
    x: 24,
    y: 28,
    width: 218,
    height: 60,
    opacity: 1,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 0,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: { r: 1, g: 1, b: 1 },
        boundVariables: {}
      }
    ],
    text: offer,
    font: offerFont,
    fontSize: offerFontSize,
    lineHeight: offerLineHeight,
    letterSpacing: offerLetterSpacing,
    color: colors.offerColor,
    textAlignVertical: "TOP",
    textAlignHorizontal: "LEFT"
  });
  frame.appendChild(allRestaurantsText);






  // Create a rectangle for the "Faasos Flat ₹100 OFF" section
  const faasosFlatRectangle = createShape({
    name: "Wow Chicken logo 1",
    type: "rectangle",
    x: 297,
    y: 2.49,
    width: 64,
    height: 50,
    opacity: 1,
    cornerRadius: 3,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1.0886677503585815,
    fills: [],  // Add fills if needed
    strokes: []  // Add strokes if needed
  });
  frame.appendChild(faasosFlatRectangle);

  // Create a rectangle for "Paneer Pasanda"
  if(foodImageHash){
    const requiredImage = foodImageHash ? foodImageHash : foodImageHashArray[0];
    const paneerPasandaImageNode = await figma.createImageAsync(requiredImage);
    const paneerPasanda = createShape({
      name: "Mawa Chocolete Barfi",
      type: "rectangle",
      x: 218,
      y: 68,
      width: 207,
      height: 135.1836700439453,
      rotation: 0, // No rotation
      opacity: 1, // Fully opaque
      cornerRadius: 0, // No corner radius
      cornerSmoothing: 0,
      horizontal: "MIN",
      vertical: "MIN",
      strokeCap: "NONE",
      strokeJoin: "MITER",
      strokeMiterLimit: 4,
      strokeWeight: 2.1122448444366455, // Stroke weight applied
      fills: [
        {
          type: "IMAGE",
          visible: true,
          opacity: 1,
          blendMode: "NORMAL",
          scaleMode: "FILL", // Crop the image to fit the rectangle
          imageTransform: [
            [0.6805555820465088,
              0,
              0.1458333432674408],
            [0,
              0.444444477558136,
              0.284722238779068]
          ],
          scalingFactor: 0.5, // Scaling factor applied to image
          filters: {
            exposure: 0,
            contrast: 0,
            saturation: 0,
            temperature: 0,
            tint: 0,
            highlights: 0,
            shadows: 0
          },
          imageHash: paneerPasandaImageNode.hash // Image hash for reference
        }
      ]
    });
    const group36 = figma.group([paneerPasanda], frame);
    group36.name = 'Group 38';
    group36.x = 218;
    group36.y = 68;
    // group36.constrainProportions = false;
    group36.resize(207, 135.18);
    group36.rotation = 0;
    group36.opacity = 1;
  }



  // Create a rectangle for "Rectangle 2650" with solid fill
  const rectangle2650 = createShape({
    name: "Rectangle 2650",
    type: "rectangle",
    x: 294,
    y: -16,
    width: 70,
    height: 70,
    opacity: 0.7, // Semi-transparent
    cornerRadius: 6, // Rounded corners
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: { r: 1, g: 1, b: 1 }, // White fill color
        boundVariables: {}
      }
    ],
    strokes: [] // No stroke applied
  });
  frame.appendChild(rectangle2650);


  // Create a rectangle for "Simply South 1"
  if(logoHash){
    const simplySouth1 = createShape({
      name: "image 271145006",
      type: "rectangle",
      x: 307,
      y: 0,
      width: 44,
      height: 51,
      opacity: 1, // Fully opaque
      cornerRadius: 0, // No rounded corners
      cornerSmoothing: 0,
      horizontal: "MIN",
      vertical: "MIN",
      strokeCap: "NONE",
      strokeJoin: "MITER",
      strokeMiterLimit: 4,
      strokeWeight: 0
    });
    const imageNode = await figma.createImageAsync(logoHash);
  
    simplySouth1.fills = [
      {
        type: "IMAGE",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        scaleMode: "FILL",
        imageTransform: [
          [1,
            0,
            0],
          [0, 1, 0]
        ],
        filters: {
          exposure: 0,
          contrast: 0,
          saturation: 0,
          temperature: 0,
          tint: 0,
          highlights: 0,
          shadows: 0
        },
        scalingFactor: 0.5,
        rotation: 0,
        imageHash: imageNode.hash
      }
    ]
    frame.appendChild(simplySouth1);
  }

  figma.currentPage.appendChild(frame);

}
// ==============================card5-bigger=========================================================================================
async function createCard5({name, offer, desc, brand, logoHash, foodImageHash,foodImageHashArray, x, y, tsc, fontData, colors,version:versionKey}:CardProps) {


  const fonts = {
    offer: { font: GilroyBlack, size: OfferFontSize.card5, lineHeight: OfferLineHeight.card5, letterSpacing: OfferLetterSpacing.card5 },
    brand: { font: GilroyBlack, size: BrandFontSize.card5, lineHeight: BrandLineHeight.card5, letterSpacing: BrandLetterSpacing.card5 },
    desc: { font: GilroyRegular, size: DescFontSize.card5, lineHeight: DescLineHeight.card5, letterSpacing: DescLetterSpacing.card5 },
    cta: { font: GilroyBlack, size: CtaFontSize.card5, lineHeight: CtaLineHeight.card5, letterSpacing: CtaLetterSpacing.card5 },
    tsc: { font: GilroyBlack, size: TscFontSize.card5, lineHeight: TscLineHeight.card5, letterSpacing: TscLetterSpacing.card5 },
  };

  applyFontOverrides(fontData, fonts);

  const { font: offerFont, size: offerFontSize, lineHeight: offerLineHeight, letterSpacing: offerLetterSpacing } = fonts.offer;
  const { font: brandFont, size: brandFontSize, lineHeight: brandLineHeight, letterSpacing: brandLetterSpacing } = fonts.brand;
  const { font: descFont, size: descFontSize, lineHeight: descLineHeight, letterSpacing: descLetterSpacing } = fonts.desc;
  const { font: ctaFont, size: ctaFontSize, lineHeight: ctaLineHeight, letterSpacing: ctaLetterSpacing } = fonts.cta;
  const { font: tscFont, size: tscFontSize, lineHeight: tscLineHeight, letterSpacing: tscLetterSpacing } = fonts.tsc;


  const {
    gradientColor1,
    gradientColor2,
    cColor,
    cColor1,
    elipseColor,
  } = getColors("card5", versionKey, colors);
  const { X, Y,Width,Height } = calculateCardPosition("card5");


  const cGradient: Paint[] = [
    {
      type: "GRADIENT_RADIAL",
      visible: true,
      opacity: 1,
      blendMode: "NORMAL",
      gradientStops: [
        {
          color: gradientColor1,
          position: 0,
          boundVariables: {}
        },
        {
          color: gradientColor2,
          position: 1,
          boundVariables: {}
        }
      ],
      gradientTransform: [
        [-0.6273934841156006, 0.3527529537677765, 0.6367236971855164],
        [-0.4297712743282318, -0.46071314811706543, 0.9535045027732849]
      ]
    }
  ]



  ///L2 MH Preset
  //main frame
  const frame = createShape({
    type: "frame", x: X,
    y: Y, width: Width, height: Height, opacity: 1, cornerRadius: 0, cornerSmoothing: 0, strokeWeight: 1, fills: cGradient, name: name,
    color: colors.cardBgColor,
  });

  //logo frame
  const logo = createShape({
    type: "frame", x: 38, y: 334, width: 102, height: 102, opacity: 1, cornerRadius: 999, cornerSmoothing: 0, strokeWeight: 1, fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 1,
          b: 1
        },
        boundVariables: {}
      }
    ], name: "logo"
  });

  // Continental Coffee 1
  const continetalCofee1 = createShape({ type: "rectangle", x: -1, y: -4, width: 106, height: 106, opacity: 1, cornerRadius: 0, cornerSmoothing: 0, strokeWeight: 1, name: "Continental Coffee 1" });
  const continetalCofee1ImageNode = await figma.createImageAsync(logoHash);
  continetalCofee1.fills = [
    {
      type: "IMAGE",
      visible: true,
      opacity: 1,
      blendMode: "NORMAL",
      scaleMode: "FIT",
      imageTransform: [
        [1, 0, 0],
        [0, 1, 0]
      ],
      filters: {
        exposure: 0,
        contrast: 0,
        saturation: 0,
        temperature: 0,
        tint: 0,
        highlights: 0,
        shadows: 0
      },
      scalingFactor: 0.5,
      rotation: 0,
      imageHash: continetalCofee1ImageNode.hash

    }
  ]

  logo.appendChild(continetalCofee1);
  frame.appendChild(logo);

  // Continental Coffee text node
  const continentalCoffeeTextNode = createTextNode({
    x: 150, y: 367, width: 183, height: 36, opacity: 1, rotation: 0, strokeWeight: 0, strokeMiterLimit: 4, textAlignHorizontal: "LEFT", textAlignVertical: "CENTER", name: "Doritos", text: brand, fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 1,
          b: 1
        },
        boundVariables: {}
      }
    ],
    font: brandFont,
    fontSize: brandFontSize,
    color: colors.brandColor,
    lineHeight: brandLineHeight,
    letterSpacing: brandLetterSpacing
  })
  frame.appendChild(continentalCoffeeTextNode);



  // Rectangle 2261
  const rectangle2261 = createShape({
    type: "vector", x: -17, y: 209.59, width: 672.44, height: 293.30, opacity: 0.20, rotation: -0.79, cornerRadius: 0, strokeWeight: 0, strokeCap: "NONE", strokes: null, name: "Rectangle 2261", fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: elipseColor,
        boundVariables: {}
      }
    ]
  });
  rectangle2261.strokes = [];
  rectangle2261.vectorPaths = [{
    windingRule: "NONZERO",
    data: "M 2.5003317680337007 147.1164314604949 C 2.5003317680337007 147.1164314604949 -35.18228052339782 15.866239332825216 182.03136879683382 113.9074771140419 C 399.24501811706546 211.94871489525858 655.4275363447147 -12.617260224401198 655.858469388133 0.5603587235265842 L 672.4440307617188 293.3081359863281 L 16.41056424816239 293.3081359863281 L 2.5003317680337007 147.1164314604949 Z"
  }]

  frame.appendChild(rectangle2261);

  // Lorem
  const loremTextNode = createTextNode({
    x: 38, y: 180, width: 334, height: 54, opacity: 1, rotation: 0, strokeWeight: 0, strokeMiterLimit: 4, textAlignHorizontal: "LEFT", textAlignVertical: "TOP", name: "Lorem", text: desc, fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 1,
          b: 1
        },
        boundVariables: {}
      }
    ],
    font: descFont,
    fontSize: descFontSize,
    lineHeight: descLineHeight,
    color: colors.descColor,
    letterSpacing: descLetterSpacing
  })

  // The frozen grub!
  const frozenGrubTextNode = createTextNode({
    x: 38, y: 130, width: 334, height: 43, opacity: 1, horizontal: "SCALE", vertical: "SCALE", textAlignHorizontal: "LEFT", textAlignVertical: "TOP", name: "The frozen grub!", text: offer, fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 1,
          b: 1
        },
        boundVariables: {}
      }
    ],
    font: offerFont,
    color: colors.offerColor,
    fontSize: offerFontSize,
    lineHeight: offerLineHeight,
    letterSpacing: offerLetterSpacing
  })
  // Group 17461
  const group1764 = figma.group([loremTextNode, frozenGrubTextNode], frame);
  group1764.name = 'Group 17461';
  group1764.x = 38;
  group1764.y = 130;
  group1764.resize(334, 104);
  group1764.rotation = 0;
  group1764.opacity = 1;

  //  Group 1116602211

  if (!foodImageHashArray.length) {
    const rectangleImageNode = await figma.createImageAsync(foodImageHash);
    const rectangle = createShape({
      type: "rectangle", x: 223, y: 52, width: 526.17, height: 486, opacity: 1, cornerRadius: 0, cornerSmoothing: 0, strokeWeight: 1, fills: [
        {
          type: "IMAGE",
          visible: true,
          opacity: 1,
          blendMode: "NORMAL",
          scaleMode: "FILL",
          imageTransform: [
            [
              1,
              0,
              0
            ],
            [
              0,
              1,
              0
            ]
          ],
          scalingFactor: 0.5,
          filters: {
            exposure: 0,
            contrast: 0,
            saturation: 0,
            temperature: 0,
            tint: 0,
            highlights: 0,
            shadows: 0
          },
          imageHash: rectangleImageNode.hash

        }
      ], name: "Group 1116602211"
    });
    frame.appendChild(rectangle);
  } else if (foodImageHashArray.length) {
    const image1 = await figma.createImageAsync(foodImageHashArray[0]);
    const image2 = await figma.createImageAsync(foodImageHashArray[1]);
    const rectangle1 = createShape({
      type: "rectangle", x: 454.4208050951356, y: 114.39019773539553, width: 189.83285522460938, height: 293.51031494140625, rotation: -11.084284438137958, opacity: 1, cornerRadius: 0, cornerSmoothing: 0, strokeWeight: 1, fills: [
        {
          type: "IMAGE",
          visible: true,
          opacity: 1,
          blendMode: "NORMAL",
          scaleMode: "FILL",
          imageTransform: [
            [
              1,
              0,
              0
            ],
            [
              0,
              1,
              0
            ]
          ],
          scalingFactor: 0.5,
          filters: {
            exposure: 0,
            contrast: 0,
            saturation: 0,
            temperature: 0,
            tint: 0,
            highlights: 0,
            shadows: 0
          },
          imageHash: image1.hash

        }
      ], name: "1153_Lays_ASCO_Rs50_130g_NPC_FOP_3D_SL"
    });

    const rectangle2 = createShape({
      type: "rectangle", x: 300.234902278382, y: 243.78428062135066, width: 166.7862548828125, height: 211.6287078857422, rotation: 10.650910152247919, opacity: 1, cornerRadius: 0, cornerSmoothing: 0, strokeWeight: 1, fills: [
        {
          type: "IMAGE",
          visible: true,
          opacity: 1,
          blendMode: "NORMAL",
          scaleMode: "FILL",
          imageTransform: [
            [
              1,
              0,
              0
            ],
            [
              0,
              1,
              0
            ]
          ],
          scalingFactor: 0.5,
          filters: {
            exposure: 0,
            contrast: 0,
            saturation: 0,
            temperature: 0,
            tint: 0,
            highlights: 0,
            shadows: 0
          },
          imageHash: image2.hash

        }
      ], name: "1153_Lays_CS_Rs50_130g_NPC_FOP_3D_SL"
    });


    const group1116602208 = figma.group([rectangle1], frame);
    const group1116602209 = figma.group([rectangle2], frame);




    group1116602208.name = 'Group 1116602208';
    group1116602208.x = 459.9534606933594;
    group1116602208.y = 96;
    group1116602208.resize(220.627685546875, 310.9903869628906);
    group1116602208.rotation = -16.892036412194393;
    group1116602208.opacity = 1;

    group1116602209.name = 'Group 1116602209';
    group1116602209.x = 300;
    group1116602209.y = 242.43450927734375;
    group1116602209.resize(168.82090759277344, 214.39511108398438);
    group1116602209.rotation = 10.180278550128838;
    group1116602209.opacity = 1;

    //resize back 
    // rectangle1.resize(189.83285522460938,293.51031494140625);
    // rectangle1.x = 454.4208050951356;
    // rectangle1.y = 114.39019773539553;
    // rectangle2.resize(166.7862548828125,211.6287078857422);
    // rectangle2.x = 300.234902278382;
    // rectangle2.y = 243.78428062135066;



    const group1116602211 = figma.group([group1116602208, group1116602209], frame);
    group1116602211.name = 'Group 1116602211';
    group1116602211.x = 300;
    group1116602211.y = 96;
    group1116602211.resize(388.154296875, 450.95703125);
    group1116602211.rotation = 0;
    group1116602211.opacity = 1;



  }




  figma.currentPage.appendChild(frame);
  // figma.viewport.scrollAndZoomIntoView([frame]);
}



// name: string, offer: string, desc: string, brand: string, logoHash: string, foodImageHash: string, foodImageHashArray: string[], xdimensions: number, ydimensions: number, fontData: any,colors:any==============================card5-smaller=========================================================================================
async function createCard5s({name, offer, desc, brand, logoHash, foodImageHash,foodImageHashArray, x, y, tsc, fontData, colors,version:versionKey}:CardProps) {
  const fonts = {
    offer: { font: GilroyBlack, size: OfferFontSize.card5S, lineHeight: OfferLineHeight.card5S, letterSpacing: OfferLetterSpacing.card5S },
    brand: { font: GilroyExtrabold, size: BrandFontSize.card5S, lineHeight: BrandLineHeight.card5S, letterSpacing: BrandLetterSpacing.card5S },
    desc: { font: GilroyRegular, size: DescFontSize.card5S, lineHeight: DescLineHeight.card5S, letterSpacing: DescLetterSpacing.card5S },
    cta: { font: Baloo2ExtraBold, size: CtaFontSize.card5S, lineHeight: CtaLineHeight.card5S, letterSpacing: CtaLetterSpacing.card5S },
    tsc: { font: ProximaNovaCondensedRegular, size: TscFontSize.card5S, lineHeight: TscLineHeight.card5S, letterSpacing: TscLetterSpacing.card5S },
  };

  applyFontOverrides(fontData, fonts);

  const { font: offerFont, size: offerFontSize, lineHeight: offerLineHeight, letterSpacing: offerLetterSpacing } = fonts.offer;
  const { font: brandFont, size: brandFontSize, lineHeight: brandLineHeight, letterSpacing: brandLetterSpacing } = fonts.brand;
  const { font: descFont, size: descFontSize, lineHeight: descLineHeight, letterSpacing: descLetterSpacing } = fonts.desc;
  const { font: ctaFont, size: ctaFontSize, lineHeight: ctaLineHeight, letterSpacing: ctaLetterSpacing } = fonts.cta;
  const { font: tscFont, size: tscFontSize, lineHeight: tscLineHeight, letterSpacing: tscLetterSpacing } = fonts.tsc;



  const {
    gradientColor1,
    gradientColor2,
    cColor,
    cColor1,
    elipseColor,
  } = getColors("card5s", versionKey, colors);
  const { X, Y,Height,Width } = calculateCardPosition("card5s");

  const cGradient: Paint[] = [
    {
      type: "GRADIENT_RADIAL",
      visible: true,
      opacity: 1,
      blendMode: "NORMAL",
      gradientStops: [
        {
          color: gradientColor1,
          position: 0.00009999999747378752,
          boundVariables: {}
        },
        {
          color: gradientColor2,
          position: 1,
          boundVariables: {}
        }
      ],
      gradientTransform: [
        [-0.6273934841156006, 0.3527529537677765, 0.6367236971855164],
        [-0.4297712743282318, -0.46071314811706543, 0.9535045027732849]
      ]
    }
  ]
  ///L2 MH Preset
  //main frame
  const frame = createShape({
    type: "frame",
    name: name,
    x: X,
    y: Y,
    width: Width,
    height: Height,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 1,
    fills: cGradient,
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    color: colors.cardBgColor,
    strokeWeight: 1
  });
  // Rectangle 2261
  // Rectangle 2261
  const rectangle2261 = createShape({
    type: "vector",
    name: "Rectangle 2261",
    x: -6.680682182312012,
    y: 70.8701171875,
    width: 278.647216796875,
    height: 119.78099060058594,
    rotation: -0.7966859770611627,
    opacity: 0.20000000298023224,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokes: [],
    strokeMiterLimit: 4,
    strokeWeight: 0,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: elipseColor,
        boundVariables: {}
      }
    ]
  });
  rectangle2261.strokes = [];
  rectangle2261.vectorPaths = [
    {
      "windingRule": "NONZERO",
      "data": "M 0.37317371368408203 60.14851760864258 C 0.37317371368408203 60.14851760864258 -9.997688293457031 6.541278839111328 78.60501861572266 46.53287124633789 C 167.20772552490234 86.52446365356445 276.7062389552593 -5.146822035312653 276.88201904296875 0.2284054160118103 L 278.647216796875 119.7114486694336 L 6.047237396240234 119.78099060058594 L 0.37317371368408203 60.14851760864258 Z"
    }
  ]
  frame.appendChild(rectangle2261);

  // Up to 50% OFF
  const upTo50PercentOffTextNode = createTextNode({
    name: "Up to 50% OFF",
    x: 16,
    y: 56,
    width: 252,
    height: 20,
    opacity: 1,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 1,
          b: 1
        },
        boundVariables: {}
      }
    ],
    textAlignHorizontal: "LEFT",
    textAlignVertical: "CENTER",
    text: offer,
    font: offerFont,
    fontSize: offerFontSize,
    lineHeight: offerLineHeight,
    color: colors.offerColor,
    letterSpacing: offerLetterSpacing
  });
  frame.appendChild(upTo50PercentOffTextNode);


  // Frame 18528

  // Frame 18528
  const frame18528 = createShape({
    type: "frame",
    name: "Frame 18528",
    x: 16,
    y: 8,
    width: 40,
    height: 40,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 1,
          b: 1
        },
        boundVariables: {}
      }
    ]
  });

  const ellipse991 = createShape({
    name: "Ellipse 991",
    type: "elipse",  // Using "elipse" for the type to create an ellipse node
    x: 3.880520820617676,
    y: 1.6666669845581055,
    width: 32.5,
    height: 32.5,
    rotation: 0,
    opacity: 0.800000011920929,
    cornerRadius: 0,
    cornerSmoothing: 0,
    arcData: {
      startingAngle: 0,
      endingAngle: 6.2831854820251465,
      innerRadius: 0
    },
    horizontal: "SCALE",
    vertical: "SCALE",
    fills: [
      {
        type: "GRADIENT_RADIAL",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        gradientStops: [
          {
            color: { r: 1, g: 1, b: 1, a: 1 },
            position: 0,
            boundVariables: {}
          },
          {
            color: { r: 1, g: 1, b: 1, a: 0 },
            position: 1,
            boundVariables: {}
          }
        ],
        gradientTransform: [
          [-9.246074009374014e-16, 1.225000023841858, -0.11249999701976776],
          [-1.225000023841858, -9.246074009374014e-16, 1.1124999523162842]
        ]
      }
    ],
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1
  });
  ellipse991.effects = [
    {
      type: "LAYER_BLUR",
      radius: 10,  // Set the blur radius to 10px
      visible: true,
    }
  ]
  // Group 17447
  const group17447 = figma.group([ellipse991], frame);
  group17447.name = 'Group 17447';

  // group17447.layoutPositioning = "AUTO";
  group17447.rotation = 0;
  group17447.opacity = 1;

  // Continental Coffee 1
  const imageNode = await figma.createImageAsync(logoHash);

  const continetalCofee1 = createShape({
    type: "rectangle", x: -8.000346183776855, y: -9.000142097473145, width: 56.0001220703125, height: 56.0001220703125, opacity: 1, cornerRadius: 0, cornerSmoothing: 0, strokeWeight: 1, name: "Continental Coffee 1", rotation: 0, fills: [
      {
        type: "IMAGE",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        scaleMode: "FIT",
        imageTransform: [
          [1, 0, 0],
          [0, 1, 0]
        ],
        filters: {
          exposure: 0,
          contrast: 0,
          saturation: 0,
          temperature: 0,
          tint: 0,
          highlights: 0,
          shadows: 0
        },
        scalingFactor: 0.5,
        rotation: 0,
        imageHash: imageNode.hash
      }
    ]
  });

  // Group 48098916
  //  frame18528.appendChild(continetalCofee1);
  const group48098916 = figma.group([group17447], frame18528);
  group48098916.name = 'Group 48098916';
  group48098916.x = 0;
  group48098916.y = -1;
  group48098916.resize(40, 40);
  group48098916.rotation = 0;
  group48098916.opacity = 1;
  group48098916.appendChild(continetalCofee1);

  group17447.x = 3.88;
  group17447.y = 1.66;
  group17447.resize(32.5, 32.5);



  frame.appendChild(frame18528);



  // Crunch into nacho bliss with every savory munch
  const indulgeInCookieBlissTextNode = createTextNode({
    name: "Crunch into nacho bliss with every savory munch",
    x: 16,
    y: 78,
    width: 127,
    height: 28,
    opacity: 0.8999999761581421,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 0,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 1,
          b: 1
        },
        boundVariables: {}
      }
    ],
    text: desc,
    font: descFont,
    color: colors.descColor,
    fontSize: descFontSize,
    lineHeight: descLineHeight,
    letterSpacing: descLetterSpacing,
    textAlignHorizontal: "LEFT",
    textAlignVertical: "TOP"
  });
  frame.appendChild(indulgeInCookieBlissTextNode);



  const textNode = createTextNode({
    name: "Text",
    x: 12,
    y: 9,
    width: 73,
    height: 12,
    opacity: 1,
    horizontal: "SCALE",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 0,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: cColor,
        boundVariables: {}
      }
    ],
    textAlignHorizontal: "CENTER",
    textAlignVertical: "CENTER",
    text: "ORDER NOW",
    font: ctaFont,
    fontSize: ctaFontSize,
    color: colors.ctaColor,
    lineHeight: ctaLineHeight,
    letterSpacing: ctaLetterSpacing
  });

  let cta = figma.createComponent();
  cta.createInstance();
  cta = createShape({
    shape: cta, type: "rectangle",
    name: "CTA",
    x: 16,
    y: 124,
    width: 97,
    height: 30,
    opacity: 1,
    cornerRadius: 6,
    cornerSmoothing: 0.6000000238418579,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 0.5186575651168823,
    color: colors.ctaBgColor,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 1,
          b: 1
        },
        boundVariables: {}
      }
    ]
  });
  cta.effects = [
    {
      type: "DROP_SHADOW",
      radius: 6,
      spread: 0,
      color: { r: 0, g: 0, b: 0, a: 0.1 }, // Black color with 10% opacity
      visible: true,
      blendMode: "NORMAL",
      showShadowBehindNode: false,
      offset: {
        x: 0,
        y: 3
      }
    }
  ]


  cta.appendChild(textNode);
  frame.appendChild(cta);


  // Group 1116602218
  if (!foodImageHashArray.length) {
    const group1116602218ImageNode = await figma.createImageAsync(foodImageHash);
    const group1116602218 = createShape({
      type: "rectangle", x: 137, y: 30.83, width: 137, height: 159.16, opacity: 1, cornerRadius: 0, cornerSmoothing: 0, strokeWeight: 1, fills: [
        {
          type: "IMAGE",
          visible: true,
          opacity: 1,
          blendMode: "NORMAL",
          scaleMode: "FILL",
          imageTransform: [
            [
              1,
              0,
              0
            ],
            [
              0,
              1,
              0
            ]
          ],
          scalingFactor: 0.5,
          filters: {
            exposure: 0,
            contrast: 0,
            saturation: 0,
            temperature: 0,
            tint: 0,
            highlights: 0,
            shadows: 0
          },
          imageHash: group1116602218ImageNode.hash

        }
      ], name: "Group 1116602211"
    });

    frame.appendChild(group1116602218);
  } else if (foodImageHashArray.length) {
    const image1 = await figma.createImageAsync(foodImageHashArray[0]);
    const image2 = await figma.createImageAsync(foodImageHashArray[1]);
    const rectangle1 = createShape({
      type: "rectangle", x: 191.5, y: 37.32, width: 66.98, height: 103.62, rotation: -11.084284438137958, opacity: 1, cornerRadius: 0, cornerSmoothing: 0, strokeWeight: 1, fills: [
        {
          type: "IMAGE",
          visible: true,
          opacity: 1,
          blendMode: "NORMAL",
          scaleMode: "FILL",
          imageTransform: [
            [
              1,
              0,
              0
            ],
            [
              0,
              1,
              0
            ]
          ],
          scalingFactor: 0.5,
          filters: {
            exposure: 0,
            contrast: 0,
            saturation: 0,
            temperature: 0,
            tint: 0,
            highlights: 0,
            shadows: 0
          },
          imageHash: image1.hash

        }
      ], name: "1153_Lays_ASCO_Rs50_130g_NPC_FOP_3D_SL"
    });

    const rectangle2 = createShape({
      type: "rectangle", x: 137.08, y: 82.98, width: 58.87, height: 74.69, rotation: 10.650910152247919, opacity: 1, cornerRadius: 0, cornerSmoothing: 0, strokeWeight: 1, fills: [
        {
          type: "IMAGE",
          visible: true,
          opacity: 1,
          blendMode: "NORMAL",
          scaleMode: "FILL",
          imageTransform: [
            [
              1,
              0,
              0
            ],
            [
              0,
              1,
              0
            ]
          ],
          scalingFactor: 0.5,
          filters: {
            exposure: 0,
            contrast: 0,
            saturation: 0,
            temperature: 0,
            tint: 0,
            highlights: 0,
            shadows: 0
          },
          imageHash: image2.hash

        }
      ], name: "1153_Lays_CS_Rs50_130g_NPC_FOP_3D_SL"
    });


    const group1116602208 = figma.group([rectangle1], frame);
    const group1116602209 = figma.group([rectangle2], frame);




    group1116602208.name = 'Group 1116602208';
    group1116602208.x = 193.46;
    group1116602208.y = 30.83;
    group1116602208.resize(77.87, 110.55);
    group1116602208.rotation = -16.892036412194393;
    group1116602208.opacity = 1;

    group1116602209.name = 'Group 1116602209';
    group1116602209.x = 137;
    group1116602209.y = 82.51;
    group1116602209.resize(59.5, 76.31);
    group1116602209.rotation = 10.180278550128838;
    group1116602209.opacity = 1;

    //resize back 
    // rectangle1.resize(189.83285522460938,293.51031494140625);
    // rectangle1.x = 454.4208050951356;
    // rectangle1.y = 114.39019773539553;
    // rectangle2.resize(166.7862548828125,211.6287078857422);
    // rectangle2.x = 300.234902278382;
    // rectangle2.y = 243.78428062135066;



    const group1116602211 = figma.group([group1116602208, group1116602209], frame);
    group1116602211.name = 'Group 1116602211';
    group1116602211.x = 137;
    group1116602211.y = 30.83;
    group1116602211.resize(137, 159.16);
    group1116602211.rotation = 0;
    group1116602211.opacity = 1;

  }





  // Add the ellipse node to the current page
  figma.currentPage.appendChild(ellipse991);
  figma.currentPage.appendChild(frame);

}

// ==============================card6-bigger=========================================================================================
async function createCard6({name, offer, desc, brand, logoHash, foodImageHash,foodImageHashArray, x, y, tsc, fontData, colors,version:versionKey}:CardProps) {
  const fonts = {
    offer: { font: GilroyRegularItalic, size: OfferFontSize.card6, lineHeight: OfferLineHeight.card6, letterSpacing: OfferLetterSpacing.card6 },
    brand: { font: BalooRegular, size: BrandFontSize.card6, lineHeight: BrandLineHeight.card6, letterSpacing: BrandLetterSpacing.card6 },
    desc: { font: GilroyBlack, size: DescFontSize.card6, lineHeight: DescLineHeight.card6, letterSpacing: DescLetterSpacing.card6 },
    cta: { font: GilroyBlack, size: CtaFontSize.card6, lineHeight: CtaLineHeight.card6, letterSpacing: CtaLetterSpacing.card6 },
    tsc: { font: GilroyBlack, size: TscFontSize.card6, lineHeight: TscLineHeight.card6, letterSpacing: TscLetterSpacing.card6 },
  };

  applyFontOverrides(fontData, fonts);

  const { font: offerFont, size: offerFontSize, lineHeight: offerLineHeight, letterSpacing: offerLetterSpacing } = fonts.offer;
  const { font: brandFont, size: brandFontSize, lineHeight: brandLineHeight, letterSpacing: brandLetterSpacing } = fonts.brand;
  const { font: descFont, size: descFontSize, lineHeight: descLineHeight, letterSpacing: descLetterSpacing } = fonts.desc;
  const { font: ctaFont, size: ctaFontSize, lineHeight: ctaLineHeight, letterSpacing: ctaLetterSpacing } = fonts.cta;
  const { font: tscFont, size: tscFontSize, lineHeight: tscLineHeight, letterSpacing: tscLetterSpacing } = fonts.tsc;



  const {
    gradientColor1,
    gradientColor2,
    cColor,
    cColor1,
    elipseColor,
  } = getColors("card6", versionKey, colors);
  const { X, Y,Width,Height } = calculateCardPosition("card6");


  const cGradient: Paint[] = [
    {
      type: "GRADIENT_RADIAL",
      visible: true,
      opacity: 1,
      blendMode: "NORMAL",
      gradientStops: [
        {
          color: gradientColor1,
          position: 0,
          boundVariables: {}
        },
        {
          color: gradientColor2,
          position: 1,
          boundVariables: {}
        }
      ],
      gradientTransform: [
        [-0.6239348649978638, 0.37606513500213623, 0.6239348649978638],
        [-0.48109889030456543, -0.4810989797115326, 0.9810989499092102]
      ]
    }
  ]


  ///L2 MH Preset
  //main frame
  const frame = createShape({
    type: "frame", x: X,
    y: Y, horizontal: "SCALE", vertical: "SCALE", width: Width, height: Height, opacity: 1, cornerRadius: 0, cornerSmoothing: 0, strokeWeight: 1, fills: cGradient, name: name || "2463 mh",
    color: colors.cardBgColor,
  });


  // More Fizz Max Feels
  const moreFizzMaxFeelsTextNode = createTextNode({
    x: 37, y: 130, width: 323, height: 84, opacity: 0.89, rotation: 0, strokeWeight: 0, strokeMiterLimit: 4, textAlignHorizontal: "LEFT", textAlignVertical: "TOP", name: "Variety of kitten & cat food", text: desc, fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 1,
          b: 1
        },
        boundVariables: {}
      }
    ],
    font: offerFont,
    fontSize: offerFontSize,
    lineHeight: offerLineHeight,
    color: colors.offerColor,
    letterSpacing: offerLetterSpacing
  })


  // Group 1
  // Rectangle
  const rectangle1 = createShape({ type: "rectangle", x: 286, y: 284.21, width: 271.91, height: 271.91, opacity: 1, cornerRadius: 0, cornerSmoothing: 0, strokeWeight: 1, name: "Rectangle", rotation: 10 });
  const rectangle2 = createShape({ type: "rectangle", x: 418.66, y: 237, width: 271.91, height: 271.91, opacity: 1, cornerRadius: 0, cornerSmoothing: 0, strokeWeight: 1, name: "Rectangle", rotation: -10 });
  const group1 = figma.group([rectangle1, rectangle2], frame);
  rectangle1.fills = [];
  rectangle2.fills = [];
  group1.name = 'Group 1';
  group1.x = 286;
  group1.y = 237;
  group1.resize(400.44, 315);
  group1.rotation = 0;
  group1.opacity = 1;

  // Get festive with Pepsi.
  const getFestiveWithPepsiTextNode = createTextNode({
    x: 43, y: 223, width: 361, height: 37, opacity: 1, rotation: 0, strokeWeight: 0, strokeMiterLimit: 4, textAlignHorizontal: "LEFT", textAlignVertical: "TOP", name: "Purr-worthy bites in every morsels.", text: offer, fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 1,
          b: 1
        },
        boundVariables: {}
      }
    ],
    font: descFont,
    fontSize: descFontSize,
    lineHeight: descLineHeight,
    color: colors.descColor,
    letterSpacing: descLetterSpacing
  })



  //logo frame
  const logo = createShape({
    type: "frame", x: 38, y: 334, width: 102, height: 102, opacity: 1, cornerRadius: 999, cornerSmoothing: 0, strokeWeight: 1, fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 0.8549019694328308,
          g: 0.43529412150382996,
          b: 0.7411764860153198
        },
        boundVariables: {}
      }
    ], name: "logo"
  });
  // image 409
  const image409 = createShape({ type: "rectangle", x: 10, y: 14, width: 82, height: 82, opacity: 1, cornerRadius: 0, cornerSmoothing: 0, strokeWeight: 1, fills: null, name: "image 409", rotation: 0 });
  // Continental Coffee 2
  const continetalCofee2 = createShape({ type: "rectangle", x: -8, y: -8, width: 118, height: 118, opacity: 1, cornerRadius: 0, cornerSmoothing: 0, strokeWeight: 1, name: "Continental Coffee 2" });
  const continetalCofee2ImageNode = await figma.createImageAsync(logoHash);
  continetalCofee2.fills = [
    {
      type: "IMAGE",
      visible: true,
      opacity: 1,
      blendMode: "NORMAL",
      scaleMode: "FIT",
      imageTransform: [
        [1, 0, 0],
        [0, 1, 0]
      ],
      filters: {
        exposure: 0,
        contrast: 0,
        saturation: 0,
        temperature: 0,
        tint: 0,
        highlights: 0,
        shadows: 0
      },
      scalingFactor: 0.5,
      rotation: 0,
      imageHash: continetalCofee2ImageNode.hash

    }
  ]

  logo.appendChild(image409);
  logo.appendChild(continetalCofee2);


  // Pepsi text node
  const pepsiTextNode = createTextNode({
    x: 155, y: 370, width: 183, height: 33, opacity: 1, rotation: 0, strokeWeight: 0, strokeMiterLimit: 4, textAlignHorizontal: "LEFT", textAlignVertical: "CENTER", name: "Whiskas", text: brand, fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 1,
          b: 1
        },
        boundVariables: {}
      }
    ],
    font: brandFont,
    fontSize: brandFontSize,
    lineHeight: brandLineHeight,
    color: colors.brandColor,
    letterSpacing: brandLetterSpacing
  })


  // Pepsi Festive_template Generic 2
  if (!foodImageHashArray.length) {
    const pepsiFestiveTemplateGeneric2 = createShape({ type: "rectangle", x: -19, y: 13, width: 719, height: 429, opacity: 1, cornerRadius: 0, cornerSmoothing: 0, strokeWeight: 1, name: "Swiggy September Whiskas Wet + Dry 4x-ai 1" });
    const pepsiFestiveTemplateGeneric2ImageNode = await figma.createImageAsync(foodImageHash);
    pepsiFestiveTemplateGeneric2.fills = [
      {
        type: "IMAGE",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        scaleMode: "FILL",
        imageTransform: [
          [1, 0, 0],
          [0, 1, 0]
        ],
        filters: {
          exposure: 0,
          contrast: 0,
          saturation: 0,
          temperature: 0,
          tint: 0,
          highlights: 0,
          shadows: 0
        },
        scalingFactor: 0.5,
        rotation: 0,
        imageHash: pepsiFestiveTemplateGeneric2ImageNode.hash

      }
    ]
    frame.appendChild(pepsiFestiveTemplateGeneric2);
  } else {
    const image1 = await figma.createImageAsync(foodImageHashArray[0]);
    const image2 = await figma.createImageAsync(foodImageHashArray[1]);
    const rectangle1 = createShape({
      type: "rectangle", x: 467.42, y: 141.39, width: 189.78, height: 293.59, rotation: -11.08, opacity: 1, cornerRadius: 0, cornerSmoothing: 0, strokeWeight: 1, fills: [
        {
          type: "IMAGE",
          visible: true,
          opacity: 1,
          blendMode: "NORMAL",
          scaleMode: "FILL",
          imageTransform: [
            [
              1,
              0,
              0
            ],
            [
              0,
              1,
              0
            ]
          ],
          scalingFactor: 0.5,
          filters: {
            exposure: 0,
            contrast: 0,
            saturation: 0,
            temperature: 0,
            tint: 0,
            highlights: 0,
            shadows: 0
          },
          imageHash: image1.hash

        }
      ], name: "1153_Lays_ASCO_Rs50_130g_NPC_FOP_3D_SL"
    });

    const rectangle2 = createShape({
      type: "rectangle", x: 313.23, y: 270.78, width: 166.79, height: 211.62, rotation: 10.65, opacity: 1, cornerRadius: 0, cornerSmoothing: 0, strokeWeight: 1, fills: [
        {
          type: "IMAGE",
          visible: true,
          opacity: 1,
          blendMode: "NORMAL",
          scaleMode: "FILL",
          imageTransform: [
            [
              1,
              0,
              0
            ],
            [
              0,
              1,
              0
            ]
          ],
          scalingFactor: 0.5,
          filters: {
            exposure: 0,
            contrast: 0,
            saturation: 0,
            temperature: 0,
            tint: 0,
            highlights: 0,
            shadows: 0
          },
          imageHash: image2.hash

        }
      ], name: "1153_Lays_CS_Rs50_130g_NPC_FOP_3D_SL"
    });


    const group1116602208 = figma.group([rectangle1], frame);
    const group1116602209 = figma.group([rectangle2], frame);




    group1116602208.name = 'Group 1116602208';
    group1116602208.x = 472.95;
    group1116602208.y = 123;
    group1116602208.resize(220.63, 310.99);
    group1116602208.rotation = -16.89;
    group1116602208.opacity = 1;

    group1116602209.name = 'Group 1116602209';
    group1116602209.x = 313;
    group1116602209.y = 269.43;
    group1116602209.resize(168.82, 214.4);
    group1116602209.rotation = 10.18;
    group1116602209.opacity = 1;

    //resize back 
    // rectangle1.resize(189.83285522460938,293.51031494140625);
    // rectangle1.x = 454.4208050951356;
    // rectangle1.y = 114.39019773539553;
    // rectangle2.resize(166.7862548828125,211.6287078857422);
    // rectangle2.x = 300.234902278382;
    // rectangle2.y = 243.78428062135066;



    const group1116602211 = figma.group([group1116602208, group1116602209], frame);
    group1116602211.name = 'Group 1116602211';
    group1116602211.x = 313;
    group1116602211.y = 123;
    group1116602211.resize(388.15, 450.96);
    group1116602211.rotation = 0;
    group1116602211.opacity = 1;


  }


  // Rectangle 2261
  const rectangle2261 = createShape({
    type: "vector", x: -17, y: 209.59, width: 672.44, height: 293.30, opacity: 0.20, rotation: -0.79, cornerRadius: 0, strokeWeight: 0.82, strokeCap: "NONE", strokes: null, name: "Rectangle 2261", fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: elipseColor,
        boundVariables: {}
      }
    ]
  });
  rectangle2261.vectorPaths = [{
    windingRule: "NONZERO",
    data: "M 2.5003317680337007 147.1164314604949 C 2.5003317680337007 147.1164314604949 -35.18228052339782 15.866239332825216 182.03136879683382 113.9074771140419 C 399.24501811706546 211.94871489525858 655.4275363447147 -12.617260224401198 655.858469388133 0.5603587235265842 L 672.4440307617188 293.3081359863281 L 16.41056424816239 293.3081359863281 L 2.5003317680337007 147.1164314604949 Z"
  }]
  //append all childs in frame
  frame.appendChild(rectangle2261);

  frame.appendChild(pepsiTextNode);
  frame.appendChild(logo);
  frame.appendChild(getFestiveWithPepsiTextNode);
  frame.appendChild(moreFizzMaxFeelsTextNode);
  figma.currentPage.appendChild(frame);
  // figma.viewport.scrollAndZoomIntoView([frame]);
}
// ==============================card6-smaller=========================================================================================
async function createCard6s({name, offer, desc, brand, logoHash, foodImageHash,foodImageHashArray, x, y, tsc, fontData, colors,version:versionKey}:CardProps) {

  const fonts = {
    offer: { font: Baloo2Regular, size: OfferFontSize.card6S, lineHeight: OfferLineHeight.card6S, letterSpacing: OfferLetterSpacing.card6S },
    brand: { font: GilroyExtrabold, size: BrandFontSize.card6S, lineHeight: BrandLineHeight.card6S, letterSpacing: BrandLetterSpacing.card6S },
    desc: { font: Baloo2ExtraBold, size: DescFontSize.card6S, lineHeight: DescLineHeight.card6S, letterSpacing: DescLetterSpacing.card6S },
    cta: { font: Baloo2ExtraBold, size: CtaFontSize.card6S, lineHeight: CtaLineHeight.card6S, letterSpacing: CtaLetterSpacing.card6S },
    tsc: { font: ProximaNovaCondensedRegular, size: TscFontSize.card6S, lineHeight: TscLineHeight.card6S, letterSpacing: TscLetterSpacing.card6S },
  };

  applyFontOverrides(fontData, fonts);

  const { font: offerFont, size: offerFontSize, lineHeight: offerLineHeight, letterSpacing: offerLetterSpacing } = fonts.offer;
  const { font: brandFont, size: brandFontSize, lineHeight: brandLineHeight, letterSpacing: brandLetterSpacing } = fonts.brand;
  const { font: descFont, size: descFontSize, lineHeight: descLineHeight, letterSpacing: descLetterSpacing } = fonts.desc;
  const { font: ctaFont, size: ctaFontSize, lineHeight: ctaLineHeight, letterSpacing: ctaLetterSpacing } = fonts.cta;
  const { font: tscFont, size: tscFontSize, lineHeight: tscLineHeight, letterSpacing: tscLetterSpacing } = fonts.tsc;

  const {
    gradientColor1,
    gradientColor2,
    cColor,
    cColor1,
    elipseColor,
  } = getColors("card6s", versionKey, colors);
  const { X, Y,Width,Height } = calculateCardPosition("card6s");


  const cGradient: Paint[] = [
    {
      type: "GRADIENT_RADIAL",
      visible: true,
      opacity: 1,
      blendMode: "NORMAL",
      gradientStops: [
        {
          color: gradientColor1,
          position: 0.00009999999747378752,
          boundVariables: {}
        },
        {
          color: gradientColor2,
          position: 1,
          boundVariables: {}
        }
      ],
      gradientTransform: [
        [
          -0.6273934841156006,
          0.3527529537677765,
          0.6367236971855164],
        [-0.4297712743282318,
        -0.46071314811706543,
          0.9535045027732849]
      ]
    }
  ]

  ///L2 MH Preset
  //main frame
  const frame = createShape({
    type: "frame", x: X,
    y: Y, horizontal: "SCALE", vertical: "SCALE", width: Width, height: Height, opacity: 1, cornerRadius: 20, cornerSmoothing: 1, strokeWeight: 1, fills: cGradient, name: name || "Whiskas",
    color: colors.cardBgColor,
  });


  // More Fizz Max Feels
  const moreFizzMaxFeelsTextNode = createTextNode({
    x: 25, y: 56, width: 252, height: 68, opacity: 1, rotation: 0, strokeWeight: 0, strokeMiterLimit: 4, textAlignHorizontal: "LEFT", textAlignVertical: "TOP", name: "Purr-worthy bites in every morsel", text: desc, fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 1,
          b: 1
        },
        boundVariables: {}
      }
    ],
    font: descFont,
    fontSize: descFontSize,
    lineHeight: descLineHeight,
    color: colors.descColor,
    letterSpacing: descLetterSpacing
  })



  //mask group
  const rectangle54730 = createShape({ type: "rectangle", x: 291, y: 0, width: 66, height: 53, opacity: 1, cornerRadius: 0, cornerSmoothing: 0, strokeWeight: 1, name: "Rectangle 54370", rotation: 0 });
  rectangle54730.topLeftRadius = 0;
  rectangle54730.topRightRadius = 0;
  rectangle54730.bottomLeftRadius = 6;
  rectangle54730.bottomRightRadius = 6;
  const rectangle54730ImageNode = await figma.createImageAsync(logoHash);
  rectangle54730.fills = [
    {
      type: "SOLID",
      visible: true,
      opacity: 1,
      blendMode: "NORMAL",
      color: {
        r: 0,
        g: 0,
        b: 0
      },
      boundVariables: {}
    }
  ]
  rectangle54730.isMask = true;

  // Continental Coffee 1
  const continetalCofee1 = createShape({
    type: "rectangle", x: 285, y: -13, width: 78, height: 78, opacity: 1, cornerRadius: 0, cornerSmoothing: 0, strokeWeight: 1, name: "Continental Coffee 1", rotation: 0, fills: [
      {
        type: "IMAGE",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        scaleMode: "FILL",
        imageTransform: [
          [1, 0, 0],
          [0, 1, 0]
        ],
        filters: {
          exposure: 0,
          contrast: 0,
          saturation: 0,
          temperature: 0,
          tint: 0,
          highlights: 0,
          shadows: 0
        },
        scalingFactor: 0.5,
        rotation: 0,
        imageHash: rectangle54730ImageNode.hash

      },
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 0.8541145324707031,
          g: 0.4348866939544678,
          b: 0.7431424856185913
        },
        boundVariables: {}
      }
    ]
  });
  const continetalCofee2 = createShape({
    type: "rectangle", x: 276, y: -22, width: 96, height: 96, opacity: 1, cornerRadius: 0, cornerSmoothing: 0, strokeWeight: 1, name: "Continental Coffee 2", rotation: 0, fills: [
      {
        type: "IMAGE",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        scaleMode: "FILL",
        imageTransform: [
          [1, 0, 0],
          [0, 1, 0]
        ],
        filters: {
          exposure: 0,
          contrast: 0,
          saturation: 0,
          temperature: 0,
          tint: 0,
          highlights: 0,
          shadows: 0
        },
        scalingFactor: 0.5,
        rotation: 0,
        imageHash: rectangle54730ImageNode.hash

      }
    ]
  });


  const textNode = createTextNode({
    x: 23, y: 9, width: 76, height: 12, opacity: 1, rotation: 0, strokeWeight: 0, strokeMiterLimit: 4, horizontal: "SCALE", textAlignHorizontal: "CENTER", textAlignVertical: "CENTER", name: "Text", text: "ORDER NOW", fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: cColor,
        boundVariables: {}
      }
    ],
    font: ctaFont,
    fontSize: ctaFontSize,
    color: colors.ctaColor,
    lineHeight: ctaLineHeight,
    letterSpacing: ctaLetterSpacing
  })
  let cta = figma.createComponent();
  cta.createInstance();
  cta = createShape({
    shape: cta, type: "rectangle", x: 25, y: 166, width: 122, height: 30, opacity: 1, cornerRadius: 6, cornerSmoothing: 0.60, strokeWeight: 0.51, name: "CTA", rotation: 0,
    color: colors.ctaBgColor,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 1,
          b: 1
        },
        boundVariables: {}
      }
    ]
  });
  cta.appendChild(textNode);


  // Up to 50% OFF
  const upTo50PercentOffTextNode = createTextNode({
    x: 25, y: 119, width: 252, height: 20, opacity: 1, rotation: 0, strokeWeight: 0, strokeMiterLimit: 4, textAlignHorizontal: "LEFT", textAlignVertical: "CENTER", name: "Up to 15% OFF", text: offer, fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 1,
          b: 1
        },
        boundVariables: {}
      }
    ],
    font: offerFont,
    fontSize: offerFontSize,
    lineHeight: offerLineHeight,
    color: colors.offerColor,
    letterSpacing: offerLetterSpacing
  })
  // upTo50PercentOffTextNode.setRangeFontName(0, 6, brandFont);
  // upTo50PercentOffTextNode.setRangeFontName(6, upTo50PercentOffTextNode.characters.length, offerFont);
  const splitOfferText = offer.split(/to/i);
  if (splitOfferText.length > 1) {
    // Text has 'from', apply different font styles to different parts
    // Apply fontBeforeFrom to the part before "from"
    const beforeFromEndIndex = splitOfferText[0].length + 2; //from
    // upTo50PercentOffTextNode.setRangeFontName(0, beforeFromEndIndex, brandFont);
    // Validate and set font for the first part
    if (beforeFromEndIndex > 0) {
      upTo50PercentOffTextNode.setRangeFontName(0, beforeFromEndIndex, offerFont);
    }

    const fromEndIndex = beforeFromEndIndex; // Length of "from"
    // upTo50PercentOffTextNode.setRangeFontName(fromEndIndex, desc.length, offerFont);
    if (fromEndIndex < offer.length) {
      upTo50PercentOffTextNode.setRangeFontName(fromEndIndex, offer.length, descFont);
    }
  }

  // Rectangle 2261
  const rectangle2261 = createShape({
    type: "vector", x: -9.04, y: 91, width: 397.23, height: 170.75, opacity: 0.20, rotation: -0.79, cornerRadius: 0, cornerSmoothing: 0, strokeWeight: 0.82, strokeCap: "NONE", strokes: null, name: "Rectangle 2261", fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: elipseColor,
        boundVariables: {}
      }
    ]
  });
  rectangle2261.vectorPaths = [{
    windingRule: "NONZERO",
    data: "M 0.5319925624506039 85.7470987405225 C 0.5319925624506039 85.7470987405225 -14.252600380961624 9.325178820798996 112.05849646274125 66.33677543644791 C 238.36959330644413 123.34837205209682 394.4695344551989 -7.3372557597070065 394.7201247188194 0.3256123764689537 L 397.236572265625 170.6593914120666 L 8.620878695910642 170.75852966308594 L 0.5319925624506039 85.7470987405225 Z"
  }]



  frame.appendChild(rectangle2261);
  frame.appendChild(upTo50PercentOffTextNode);

  if (!foodImageHashArray.length && foodImageHash) {
    // Pepsi Festive_template Generic 1
    const pepsiFestiveTemplateGeneric1 = createShape({ type: "rectangle", x: 25, y: 0, width: 394, height: 235, opacity: 1, cornerRadius: 0, cornerSmoothing: 0, strokeWeight: 1, name: "Swiggy September Whiskas Wet + Dry 4x-ai 1" });
    const pepsiFestiveTemplateGeneric1ImageNode = await figma.createImageAsync(foodImageHash);
    pepsiFestiveTemplateGeneric1.fills = [
      {
        type: "IMAGE",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        scaleMode: "FILL",
        imageTransform: [
          [1, 0, 0],
          [0, 1, 0]
        ],
        filters: {
          exposure: 0,
          contrast: 0,
          saturation: 0,
          temperature: 0,
          tint: 0,
          highlights: 0,
          shadows: 0
        },
        scalingFactor: 0.5,
        rotation: 0,
        imageHash: pepsiFestiveTemplateGeneric1ImageNode.hash

      }
    ]
    frame.appendChild(pepsiFestiveTemplateGeneric1);

  } else if (foodImageHashArray.length) {
    const image1 = await figma.createImageAsync(foodImageHashArray[0]);
    const image2 = await figma.createImageAsync(foodImageHashArray[1]);
    const rectangle1 = createShape({
      type: "rectangle", x: 297.68, y: 86.11, width: 73.34, height: 113.46, rotation: -11.08, opacity: 1, cornerRadius: 0, cornerSmoothing: 0, strokeWeight: 1, fills: [
        {
          type: "IMAGE",
          visible: true,
          opacity: 1,
          blendMode: "NORMAL",
          scaleMode: "FILL",
          imageTransform: [
            [
              1,
              0,
              0
            ],
            [
              0,
              1,
              0
            ]
          ],
          scalingFactor: 0.5,
          filters: {
            exposure: 0,
            contrast: 0,
            saturation: 0,
            temperature: 0,
            tint: 0,
            highlights: 0,
            shadows: 0
          },
          imageHash: image1.hash

        }
      ], name: "1153_Lays_ASCO_Rs50_130g_NPC_FOP_3D_SL"
    });

    const rectangle2 = createShape({
      type: "rectangle", x: 238.09, y: 136.11, width: 64.46, height: 81.78, rotation: 10.65, opacity: 1, cornerRadius: 0, cornerSmoothing: 0, strokeWeight: 1, fills: [
        {
          type: "IMAGE",
          visible: true,
          opacity: 1,
          blendMode: "NORMAL",
          scaleMode: "FILL",
          imageTransform: [
            [
              1,
              0,
              0
            ],
            [
              0,
              1,
              0
            ]
          ],
          scalingFactor: 0.5,
          filters: {
            exposure: 0,
            contrast: 0,
            saturation: 0,
            temperature: 0,
            tint: 0,
            highlights: 0,
            shadows: 0
          },
          imageHash: image2.hash

        }
      ], name: "1153_Lays_CS_Rs50_130g_NPC_FOP_3D_SL"
    });


    const group1116602208 = figma.group([rectangle1], frame);
    const group1116602209 = figma.group([rectangle2], frame);




    group1116602208.name = 'Group 1116602208';
    group1116602208.x = 291.81;
    group1116602208.y = 79;
    // group1116602208.resize(85.26, 120.18);
    // group1116602208.resize(group1116602208.width, group1116602208.height);
    group1116602208.rotation = -16.89;
    group1116602208.opacity = 1;

    group1116602209.name = 'Group 1116602209';
    group1116602209.x = 238;
    group1116602209.y = 135.59;
    // group1116602209.resize(65.24, 82.85);
    // group1116602209.resize(group1116602209.width, group1116602209.height);
    group1116602209.rotation = 10.18;
    group1116602209.opacity = 1;

    //resize back 
    // rectangle1.resize(189.83285522460938,293.51031494140625);
    // rectangle1.x = 454.4208050951356;
    // rectangle1.y = 114.39019773539553;
    // rectangle2.resize(166.7862548828125,211.6287078857422);
    // rectangle2.x = 300.234902278382;
    // rectangle2.y = 243.78428062135066;



    const group1116602211 = figma.group([group1116602208, group1116602209], frame);
    group1116602211.name = 'Group 1116602211';
    group1116602211.x = 238;
    group1116602211.y = 79;
    // group1116602211.resize(150,174.27);
    // group1116602211.resize(group1116602211.width,group1116602211.height);
    group1116602211.rotation = 0;
    group1116602211.opacity = 1;


  }

  frame.appendChild(cta);
  // Mask group
  const maskGroup = figma.group([continetalCofee2, continetalCofee1, rectangle54730], frame);
  maskGroup.name = 'Mask group';
  maskGroup.x = 291;
  maskGroup.y = 0;
  maskGroup.resize(66, 53);
  maskGroup.rotation = 0;
  maskGroup.opacity = 1;


  // maskGroup.fill = [];
  frame.appendChild(moreFizzMaxFeelsTextNode);


  figma.currentPage.appendChild(frame);
  // figma.viewport.scrollAndZoomIntoView([frame]);
}
// ==============================card7=========================================================================================
async function createCard7({name, offer, desc, brand, logoHash, foodImageHash,foodImageHashArray, x, y, tsc, fontData, colors,version:versionKey}:CardProps) {
  const fonts = {
    offer: { font: ProximaNovaRegular, size: OfferFontSize.card7, lineHeight: OfferLineHeight.card7, letterSpacing: OfferLetterSpacing.card7 },
    brand: { font: ProximaNovaBold, size: BrandFontSize.card7, lineHeight: BrandLineHeight.card7, letterSpacing: BrandLetterSpacing.card7 },
    desc: { font: ProximaNovaExtrabold, size: DescFontSize.card7, lineHeight: DescLineHeight.card7, letterSpacing: DescLetterSpacing.card7 },
    cta: { font: GilroyExtrabold, size: CtaFontSize.card7, lineHeight: CtaLineHeight.card7, letterSpacing: CtaLetterSpacing.card7 },
    tsc: { font: ProximaNovaCondensedRegular, size: TscFontSize.card7, lineHeight: TscLineHeight.card7, letterSpacing: TscLetterSpacing.card7 },
  };

  applyFontOverrides(fontData, fonts);

  const { font: offerFont, size: offerFontSize, lineHeight: offerLineHeight, letterSpacing: offerLetterSpacing } = fonts.offer;
  const { font: brandFont, size: brandFontSize, lineHeight: brandLineHeight, letterSpacing: brandLetterSpacing } = fonts.brand;
  const { font: descFont, size: descFontSize, lineHeight: descLineHeight, letterSpacing: descLetterSpacing } = fonts.desc;
  const { font: ctaFont, size: ctaFontSize, lineHeight: ctaLineHeight, letterSpacing: ctaLetterSpacing } = fonts.cta;
  const { font: tscFont, size: tscFontSize, lineHeight: tscLineHeight, letterSpacing: tscLetterSpacing } = fonts.tsc;


  const {
    gradientColor1,
    gradientColor2,
    cColor,
    cColor1,
    elipseColor,
  } = getColors("card7", versionKey, colors);
  const { X, Y,Width,Height } = calculateCardPosition("card7");

  // const elipseColor = rgb("#10021B");
  let cGradient: Paint[] = [
    {
      type: "GRADIENT_RADIAL",
      visible: true,
      opacity: 1,
      blendMode: "NORMAL",
      gradientStops: [
        {
          color: gradientColor1,
          position: 0
        },
        {
          color: gradientColor2,
          position: 1
        }
      ],
      gradientTransform: [
        [-0.7611234188079834, 0.29173240065574646, 0.7315241694450378],
        [-0.29173240065574646, -0.2714731991291046, 0.7803872227668762]
      ]
    }
  ];
  if(versionKey === "Version 1"){
     cGradient= [
      {
        type: "GRADIENT_LINEAR",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        gradientStops: [
          {
            color: gradientColor1,
            position: 0
          },
          {
            color: gradientColor1,
            position: 0.32106515765190125
          },
          {
            color: gradientColor2,
            position: 1
          }
        ],
        gradientTransform: [
          [-0.7611234188079834, 0.29173240065574646, 0.7315241694450378],
          [-0.29173240065574646, -0.2714731991291046, 0.7803872227668762]
        ]
      }
    ]
  }
  ///L2 MH Preset
  //main frame
  const frame = createShape({
    type: "frame", // Creating a frame
    name: name || "Priority Banner",
    x: X,
    y: Y,
    width: Width,
    height: Height,
    rotation: 0,
    opacity: 1,
    cornerRadius: 20,
    cornerSmoothing: 0.6100000143051147,
    horizontal: "MIN", // Horizontal constraint
    vertical: "MIN", // Vertical constraint
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: cGradient,
    color: colors.cardBgColor,
    strokes: []
  });

  // *T&C apply
  const tscApply = createTextNode({
    name: "*T&C apply",
    x: 16,
    y: 194,
    width: 37,
    height: 10,
    opacity: 0.800000011920929,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 0.5137912631034851,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 1,
          b: 1
        }
      }
    ],
    textAlignHorizontal: "LEFT",
    textAlignVertical: "TOP",
    text: "*T&C apply",
    font: tscFont,
    fontSize: tscFontSize,
    color: colors.tscColor,
    lineHeight: tscLineHeight,
    letterSpacing: tscLetterSpacing
  });
  if (tsc) {
    frame.appendChild(tscApply);
  }

  // CTA
  const cta = createShape({
    type: "frame", // Creating a frame
    name: "CTA",
    x: 16,
    y: 154,
    width: 100,
    height: 29.311323165893555,
    rotation: 0,
    opacity: 1,
    cornerRadius: 8,
    cornerSmoothing: 1,
    horizontal: "MIN", // Horizontal constraint
    vertical: "MIN", // Vertical constraint
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 0.49879127740859985,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: { r: 1, g: 1, b: 1 } // Solid white fill
      }
    ],
    color: colors.ctaBgColor,
    strokes: []
  });
  // Most ordered from ar
  const mostOrderedFromAr = createTextNode({
    name: "Most ordered from ar",
    x: 6.389987945556641,
    y: 7.9806599617004395,
    width: 87.22002410888672,
    height: 13.35000228881836,
    opacity: 1,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 0,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: cColor
      }
    ],
    textAlignHorizontal: "CENTER",
    textAlignVertical: "CENTER",
    text: "Buy now",
    font: ctaFont,
    fontSize: ctaFontSize,
    lineHeight: ctaLineHeight,
    color: colors.ctaColor,
    letterSpacing: ctaLetterSpacing
  });
  cta.appendChild(mostOrderedFromAr);
  frame.appendChild(cta);

  // image 271145001
  const image271145001 = createShape({
    name: "image 271145001",
    type: "rectangle",
    x: 242.251953125,
    y: 61,
    width: 138,
    height: 147,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [], // Assuming no fills are provided, you can add them if necessary
    strokes: [] // Assuming no strokes are provided, you can add them if necessary
  });
  frame.appendChild(image271145001);

  // Widest range of Breakast Essentials
  const widestRangeOfBreakfastEssentials = createTextNode({
    name: "Widest range of Breakast Essentials",
    x: 16,
    y: 31,
    width: 184,
    height: 81,
    opacity: 0.8999999761581421,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 0,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 1,
          b: 1
        }
      }
    ],
    textAlignHorizontal: "LEFT",
    textAlignVertical: "TOP",
    text: desc,
    font: descFont,
    color: colors.descColor,
    fontSize: descFontSize,
    lineHeight: descLineHeight,
    letterSpacing: descLetterSpacing
  });
  frame.appendChild(widestRangeOfBreakfastEssentials);

  // Get Up to 40% OFF*
  const getUpTo40PercentOff = createTextNode({
    name: "Get Up to 40% OFF*",
    x: 16,
    y: 122,
    width: 154,
    height: 17,
    opacity: 0.8999999761581421,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 0,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 1,
          b: 1
        }
      }
    ],
    textAlignHorizontal: "LEFT",
    textAlignVertical: "TOP",
    text: offer,
    font: offerFont,
    fontSize: offerFontSize,
    color: colors.offerColor,
    lineHeight: offerLineHeight,
    letterSpacing: offerLetterSpacing
  });
  const splitOfferText = offer.split(/up/i);
  if (splitOfferText.length > 1) {
    // Text has 'from', apply different font styles to different parts
    // Apply fontBeforeFrom to the part before "from"
    const beforeFromEndIndex = splitOfferText[0].length; //from
    if (beforeFromEndIndex > 0) {
      getUpTo40PercentOff.setRangeFontName(0, beforeFromEndIndex, offerFont);
    }
    // getUpTo40PercentOff.setRangeFontName(0, beforeFromEndIndex, offerFont);

    const fromEndIndex = beforeFromEndIndex + 2; // Length of "from"
    // getUpTo40PercentOff.setRangeFontName(fromEndIndex, offer.length, brandFont);
    if (fromEndIndex < offer.length) {
      getUpTo40PercentOff.setRangeFontName(fromEndIndex, offer.length, brandFont);
    }
  }
  frame.appendChild(getUpTo40PercentOff);

  // image 271145005
  if (!foodImageHashArray.length) {
    const foodImage = await figma.createImageAsync(foodImageHash);
    const image271145005 = createShape({
      name: "image 271145005",
      type: "rectangle",
      x: 107,
      y: 24,
      width: 209.62,
      height: 195.95,
      opacity: 1,
      cornerRadius: 0,
      cornerSmoothing: 0,
      horizontal: "MIN",
      vertical: "MIN",
      strokeCap: "NONE",
      strokeJoin: "MITER",
      strokeMiterLimit: 4,
      strokeWeight: 1,
      fills: [
        {
          type: "IMAGE",
          visible: true,
          opacity: 1,
          blendMode: "NORMAL",
          scaleMode: "FILL",
          imageTransform: [
            [1, 0, 0],
            [0, 1, 0]
          ],
          scalingFactor: 0.5,
          rotation: 0,
          filters: {
            exposure: 0,
            contrast: 0,
            saturation: 0,
            temperature: 0,
            tint: 0,
            highlights: 0,
            shadows: 0
          },
          imageHash: foodImage.hash
        }
      ]
    });
    const group1 = figma.group([image271145005], frame);
    group1.name = 'Group 1116602256';
    group1.x = 107;
    group1.y = 24;
    group1.resize(209.62, 195.95);
    group1.rotation = 0;
    group1.opacity = 1;
  } else if (foodImageHashArray.length) {
    const foodImage = await figma.createImageAsync(foodImageHashArray[0]);
    const image271145005 = createShape({
      name: "image 271145005",
      type: "rectangle",
      x: 170,
      y: 105,
      width: 107,
      height: 115,
      opacity: 1,
      cornerRadius: 0,
      cornerSmoothing: 0,
      horizontal: "MIN",
      vertical: "MIN",
      strokeCap: "NONE",
      strokeJoin: "MITER",
      strokeMiterLimit: 4,
      strokeWeight: 1,
      fills: [
        {
          type: "IMAGE",
          visible: true,
          opacity: 1,
          blendMode: "NORMAL",
          scaleMode: "FILL",
          imageTransform: [
            [1, 0, 0],
            [0, 1, 0]
          ],
          scalingFactor: 0.5,
          rotation: 0,
          filters: {
            exposure: 0,
            contrast: 0,
            saturation: 0,
            temperature: 0,
            tint: 0,
            highlights: 0,
            shadows: 0
          },
          imageHash: foodImage.hash
        }
      ]
    });
    const group1 = figma.group([image271145005], frame);
    group1.name = 'Group 1116602256';
    group1.x = 170;
    group1.y = 105;
    group1.resize(107, 115);
    group1.rotation = 0;
    group1.opacity = 1;

    const foodImage2 = await figma.createImageAsync(foodImageHashArray[1]);
    const image271145002 = createShape({
      name: "image 271145002",
      type: "rectangle",
      x: 223,
      y: 26,
      width: 156,
      height: 168,
      opacity: 1,
      cornerRadius: 0,
      cornerSmoothing: 0,
      horizontal: "MIN",
      vertical: "MIN",
      strokeCap: "NONE",
      strokeJoin: "MITER",
      strokeMiterLimit: 4,
      strokeWeight: 1,
      fills: [
        {
          type: "IMAGE",
          visible: true,
          opacity: 1,
          blendMode: "NORMAL",
          scaleMode: "FILL",
          imageTransform: [
            [1, 0, 0],
            [0, 1, 0]
          ],
          scalingFactor: 0.5,
          rotation: 0,
          filters: {
            exposure: 0,
            contrast: 0,
            saturation: 0,
            temperature: 0,
            tint: 0,
            highlights: 0,
            shadows: 0
          },
          imageHash: foodImage2.hash
        }
      ]
    });
    const group2 = figma.group([image271145002], frame);
    group2.name = 'Group 1116602257';
    group2.x = 221;
    group2.y = 24;
    group2.resize(158.62, 170.05);
    group2.rotation = 0;
    group2.opacity = 1;
  }


  figma.currentPage.appendChild(frame);


}

// ==============================card1=========================================================================================
async function createCard1({name, offer, desc, brand, logoHash, foodImageHash,foodImageHashArray, x, y, tsc, fontData, colors,version:versionKey}:CardProps) {

  const fonts = {
    offer: { font: GilroyBlack, size: OfferFontSize.card1, lineHeight: OfferLineHeight.card1, letterSpacing: OfferLetterSpacing.card1 },
    brand: { font: GilroyBold, size: BrandFontSize.card1, lineHeight: BrandLineHeight.card1, letterSpacing: BrandLetterSpacing.card1 },
    desc: { font: GilroyRegular, size: DescFontSize.card1, lineHeight: DescLineHeight.card1, letterSpacing: DescLetterSpacing.card1 },
    cta: { font: GilroyBlack, size: CtaFontSize.card1, lineHeight: CtaLineHeight.card1, letterSpacing: CtaLetterSpacing.card1 },
    tsc: { font: GilroyBlack, size: TscFontSize.card1, lineHeight: TscLineHeight.card1, letterSpacing: TscLetterSpacing.card1 },
  };

  applyFontOverrides(fontData, fonts);

  const { font: offerFont, size: offerFontSize, lineHeight: offerLineHeight, letterSpacing: offerLetterSpacing } = fonts.offer;
  const { font: brandFont, size: brandFontSize, lineHeight: brandLineHeight, letterSpacing: brandLetterSpacing } = fonts.brand;
  const { font: descFont, size: descFontSize, lineHeight: descLineHeight, letterSpacing: descLetterSpacing } = fonts.desc;
  const { font: ctaFont, size: ctaFontSize, lineHeight: ctaLineHeight, letterSpacing: ctaLetterSpacing } = fonts.cta;
  const { font: tscFont, size: tscFontSize, lineHeight: tscLineHeight, letterSpacing: tscLetterSpacing } = fonts.tsc;

  
  const {
    gradientColor1,
    gradientColor2,
    cColor,
    cColor1,
    cColor2,
    elipseColor,
  } = getColors("card1", versionKey, colors);
  const { X, Y,Width,Height } = calculateCardPosition("card1");

  // gradient colors
  // FFF6F6
  // E52019
  // 9D100B - cta color
  // logo fill - A5231E

  //FFF5F7 F18221
  //AD5507 -ctacolor
  //E37225

  const cGradient: Paint[] = [
    {
      type: "GRADIENT_RADIAL",
      visible: true,
      opacity: 1,
      blendMode: "NORMAL",
      gradientStops: [
        {
          color: gradientColor1,
          position: 0,
          boundVariables: {}
        },
        {
          color: gradientColor2,
          position: 1,
          boundVariables: {}
        }
      ],
      gradientTransform: [
        [0.21456579864025116, 0.36506372690200806, 0.3661775290966034],
        [-0.36506372690200806, 0.02757502719759941, 0.6679380536079407]
      ]
    }
  ]

  // 800349 AI Cafe & Bistro BOGO
  const frame = createShape({
    type: "frame",
    name: name || "Frozen Fun_Items at 89_botd",
    x: X,
    y: Y,
    width: Width,
    height: Height,
    rotation: 0,
    opacity: 1,
    cornerRadius: 12.777886390686035,
    cornerSmoothing: 1,
    horizontal: "CENTER",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    strokes: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 0.871130645275116,
          g: 0.871130645275116,
          b: 0.871130645275116,
        },
      },
    ],
  });
  // shutterstock_2106268541 1
  const shutterstock21062685411IMageNode = await figma.createImageAsync(logoHash);
  const shutterstock21062685411 = createShape({
    type: "rectangle",
    name: "shutterstock_2106268541 1",
    x: 90.33349609375,
    y: 139.216064453125,
    width: 352,
    height: 234.78399658203125,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    fills: [
      {
        type: "IMAGE",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        scaleMode: "FILL",
        imageTransform: [
          [1, 0, 0],
          [0, 1, 0]
        ],
        scalingFactor: 0.5,
        rotation: 0,
        filters: {
          exposure: 0,
          contrast: 0.21771964927514395,
          saturation: 0.2327880859375,
          temperature: 0,
          tint: 0,
          highlights: 0,
          shadows: 0.7717491984367371
        },
        imageHash: shutterstock21062685411IMageNode.hash
      }
    ],
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1
  });

  frame.appendChild(shutterstock21062685411)

  // Group 1116602479
  const ellipse4613 = createShape({
    type: "elipse", // 'elipse' for ellipse shape
    name: "Ellipse 4613",
    x: 160.38671875,
    y: 23.696334838867188,
    width: 161,
    height: 130,
    rotation: 17.1898298576229,
    opacity: 0.6000000238418579,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 1,
          b: 1
        },
        boundVariables: {}
      }
    ]
  });
  ellipse4613.effects = [
    {
      type: "LAYER_BLUR",
      visible: true,
      radius: 74
    }
  ]
  const rectangle53854 = createShape({
    type: "vector",
    name: "Rectangle 53854",
    x: -4,
    y: -4,
    width: 336,
    height: 112,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    fills: cGradient,
    color: colors.cardBgColor,
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 0.5020177960395813
  });
  rectangle53854.vectorPaths = [{
    windingRule: "NONZERO",
    data: "M 0 0 L 336 0 L 336 112 L 0 112 L 0 0 Z"
  }];

  const rectangle53853 = createShape({
    type: "vector",
    name: "Rectangle 53853",
    x: 0.3330078125,
    y: 0,
    width: 345,
    height: 104,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 1,
    horizontal: "MIN",
    vertical: "MIN",
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 0.3653481602668762,
          g: 0.09766874462366104,
          b: 0.4759114682674408
        },
        boundVariables: {}
      }
    ],
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 0.9579424858093262
  });
  rectangle53853.vectorPaths = [{
    windingRule: "NONZERO",
    data: "M 0 0 L 345 0 L 345 104 L 0 104 L 0 0 Z"
  }];

  rectangle53853.isMask = true;
  const maskGroup = figma.group([rectangle53853, rectangle53854], frame);
  maskGroup.name = 'Mask group';

  maskGroup.rotation = 0;
  maskGroup.opacity = 1;


  const group1116602461 = figma.group([ellipse4613, maskGroup], frame);
  group1116602461.name = 'Group 1116602461';
  group1116602461.x = -4;
  group1116602461.y = -23.885360717773438;


  // groupInfoSimple.constrainProportions = false;
  group1116602461.resize(356.614990234375, 171.7747039794922);
  group1116602461.rotation = 0;
  group1116602461.opacity = 1;

  const group1116602462 = figma.group([group1116602461], frame);
  group1116602462.name = 'Group 1116602462';
  group1116602462.x = -4;
  group1116602462.y = -23.885360717773438;
  // groupInfoSimple.constrainProportions = false;
  group1116602462.resize(356.614990234375, 171.7747039794922);
  group1116602462.rotation = 0;
  group1116602462.opacity = 1;

  const group1116602463 = figma.group([group1116602462], frame);
  group1116602463.name = 'Group 1116602463';
  group1116602463.x = -4;
  group1116602463.y = -23.885360717773438;
  // groupInfoSimple.constrainProportions = false;
  group1116602463.resize(356.614990234375, 171.7747039794922);
  group1116602463.rotation = 0;
  group1116602463.opacity = 1;


  const group1116602479 = figma.group([group1116602463], frame);
  group1116602479.name = 'Group 1116602479';
  group1116602479.x = -4;
  group1116602479.y = -23.885360717773438;
  // groupInfoSimple.constrainProportions = false;
  group1116602479.resize(356.614990234375, 171.7747039794922);
  group1116602479.rotation = 0;
  group1116602479.opacity = 1;




  maskGroup.x = -4;
  maskGroup.y = -4;
  // groupInfoSimple.constrainProportions = false;
  maskGroup.resize(349.3330078125, 112);




  // Group 3101
  // Rectangle 962
  const rectangle962 = createShape({
    type: "rectangle",  // type is rectangle
    name: "Rectangle 962",  // name of the shape
    x: 16.995248794555664,  // x-coordinate
    y: 75,  // y-coordinate
    width: 20.994131088256836,  // width of the rectangle
    height: 15.791228294372559,  // height of the rectangle
    rotation: 0,  // no rotation
    opacity: 0.8999999761581421,  // opacity value
    cornerRadius: 28.198619842529297,  // rounded corners
    cornerSmoothing: 1,  // corner smoothing
    horizontal: "SCALE",  // horizontal scaling
    vertical: "MIN",  // vertical positioning
    strokeCap: "NONE",  // stroke cap style
    strokeJoin: "MITER",  // stroke join style
    strokeMiterLimit: 4,  // miter limit
    strokeWeight: 0.5639724135398865,  // stroke weight
    fills: [
      {
        type: "SOLID",  // solid fill
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: { r: 1, g: 1, b: 1 }  // solid white fill color
      }
    ],
    strokes: [
      {
        type: "SOLID",  // solid stroke
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: cColor  // red stroke color
      }
    ],
    color:colors.ctaBgColor
  });
  // rectangle962.effects=[
  //   {
  //     type: "DROP_SHADOW",  // drop shadow effect
  //     visible: true,
  //     blendMode: "NORMAL",
  //     color: { r: 40, g: 44, b: 63, a: 0.25 },
  //     offset: { x: 0, y: 1.13 },
  //     radius: 10.72,
  //     spread: 0
  //   }
  // ]
  const vector804 = createShape({
    type: "vector",  // type is vector
    name: "Vector 804",  // name of the shape
    x: 23.18096923828125,  // x-coordinate
    y: 80.07575178146362,  // y-coordinate
    width: 7.872796535491943,  // width of the vector shape
    height: 5.639724254608154,  // height of the vector shape
    rotation: 0,  // no rotation
    opacity: 1,  // full opacity
    cornerRadius: 0,  // no rounded corners
    cornerSmoothing: 0,  // no corner smoothing
    horizontal: "SCALE",  // horizontal scaling
    vertical: "SCALE",  // vertical scaling
    strokeCap: "ROUND",  // round stroke cap
    strokeJoin: "MITER",  // miter stroke join
    strokeMiterLimit: 4,  // miter limit
    strokeWeight: 1.127944827079773,  // stroke weight
    fills: [],  // no fills provided in this case
    strokes: [
      {
        type: "SOLID",  // solid stroke
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: cColor  // red stroke color
      }
    ]
  });
  if(colors?.ctaColor){
  //then it should be a solid color
  vector804.strokes = colors.ctaColor;
  }
  vector804.vectorPaths = [{
    windingRule: "NONE",
    data: "M 0 2.819862127304077 L 7.872796535491943 2.819862127304077 M 7.872796535491943 2.819862127304077 L 4.920497834682465 0 M 7.872796535491943 2.819862127304077 L 4.920497834682465 5.639724254608154"
  }]

  const group3101 = figma.group([rectangle962, vector804], frame);
  group3101.name = 'Group 3101';
  group3101.x = 17;
  group3101.y = 75;
  // groupInfoSimple.constrainProportions = false;
  group3101.resize(21, 15.79);
  group3101.rotation = 0;
  group3101.opacity = 1;

  // Group 1686555990
  const untitledDesign35_1 = createShape({
    type: "rectangle",  // type is rectangle
    name: "Untitled design (35) 1",  // name of the shape
    x: 156,  // x-coordinate
    y: -30,  // y-coordinate
    width: 149,  // width of the rectangle
    height: 149,  // height of the rectangle
    rotation: 0,  // no rotation
    opacity: 1,  // full opacity
    cornerRadius: 0,  // no rounded corners
    cornerSmoothing: 0,  // no corner smoothing
    horizontal: "MIN",  // horizontal constraint (minimum)
    vertical: "MIN",  // vertical constraint (minimum)
    strokeCap: "NONE",  // no stroke cap
    strokeJoin: "MITER",  // miter stroke join
    strokeMiterLimit: 4,  // miter limit
    strokeWeight: 1,  // stroke weight
    fills: [],  // no fills provided in this case
    strokes: []  // no strokes provided in this case
  });
  untitledDesign35_1.fills = [];
  const group1686555990 = figma.group([untitledDesign35_1], frame);
  group1686555990.name = 'Group 1686555990';
  group1686555990.x = 156;
  group1686555990.y = -30;
  // groupInfoSimple.constrainProportions = false;
  group1686555990.resize(149, 149);
  group1686555990.rotation = 0;
  group1686555990.opacity = 1;

  // All Restaurants
  const allRestaurants = createTextNode({
    name: "All Restaurants",  // name of the text node
    x: 15,  // x-coordinate
    y: 13,  // y-coordinate
    width: 230,  // width of the text node
    height: 19,  // height of the text node
    opacity: 1,  // full opacity
    horizontal: "MIN",  // horizontal constraint (minimum)
    vertical: "MIN",  // vertical constraint (minimum)
    strokeCap: "NONE",  // no stroke cap
    strokeJoin: "MITER",  // miter stroke join
    strokeMiterLimit: 4,  // miter limit
    strokeWeight: 1.044198989868164,  // stroke weight
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: cColor,
        boundVariables: {}
      }
    ],
    textAlignHorizontal: "LEFT",  // left aligned text
    textAlignVertical: "CENTER",  // vertically centered text
    text: offer,  // text content
    font: offerFont,  // font family and style
    fontSize: offerFontSize, // font size
    lineHeight: offerLineHeight,
    color: colors.offerColor,
    letterSpacing: offerLetterSpacing,  // letter spacing
  });
  frame.appendChild(allRestaurants)

  // Order now from Frozen Fun
  const orderNowFromFrozenFun = createTextNode({
    name: "Order now from Frozen Fun",  // name of the text node
    x: 15,  // x-coordinate
    y: 36,  // y-coordinate
    width: 182,  // width of the text node
    height: 20,  // height of the text node
    opacity: 0.800000011920929,  // opacity less than 1
    horizontal: "MIN",  // horizontal constraint (minimum)
    vertical: "MIN",  // vertical constraint (minimum)
    strokeCap: "NONE",  // no stroke cap
    strokeJoin: "MITER",  // miter stroke join
    strokeMiterLimit: 4,  // miter limit
    strokeWeight: 0.97,  // stroke weight
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: cColor,
        boundVariables: {}
      }
    ],
    textAlignHorizontal: "LEFT",  // left aligned text
    textAlignVertical: "TOP",  // text aligned to the top
    text: desc,  // text content
    font: descFont,  // font family and style
    fontSize: descFontSize, // font size
    lineHeight: descLineHeight,
    color: colors.descColor,
    letterSpacing: descLetterSpacing,  // letter spacing
  });
  // const splitDescText = desc.split("from");
  const splitDescText = desc.split(/from/i);
  if (splitDescText.length > 1) {
    // Text has 'from', apply different font styles to different parts
    // Apply fontBeforeFrom to the part before "from"
    const beforeFromEndIndex = splitDescText[0].length + 4; //from
    if (beforeFromEndIndex > 0) {
      orderNowFromFrozenFun.setRangeFontName(0, beforeFromEndIndex, descFont);
    }
    const fromEndIndex = beforeFromEndIndex; // Length of "from"
    if (fromEndIndex < desc.length) {
      orderNowFromFrozenFun.setRangeFontName(fromEndIndex, desc.length, brandFont);
    }
  }
  // const fromIndex = desc.indexOf("from");
  // orderNowFromFrozenFun.setRangeFontName(0, fromIndex, descFont); // "Order now"

  // // Apply descFont after "from"
  // orderNowFromFrozenFun.setRangeFontName(fromIndex + 4, desc.length, brandFont); // "Frozen Fun"
  frame.appendChild(orderNowFromFrozenFun)


  // Group 1686557479
  const requiredImage = foodImageHash ? foodImageHash : foodImageHashArray[0];
  const custardTub1ImageNode = await figma.createImageAsync(requiredImage);
  const imageSizes =  await custardTub1ImageNode.getSizeAsync();
  console.log("image sizes",imageSizes);
  const custardTub1 = createShape({
    type: "rectangle",
    name: "custardtub 1",
    x: 212,
    y: 7,
    width: 105,
    height: 105,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "IMAGE",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        scaleMode: "FILL",
        imageTransform: [
          [0.648648738861084, 0, 0.20945946872234344],
          [0, 0.7297297120094299, 0.1689189225435257]
        ],
        scalingFactor: 0.5,
        filters: {
          exposure: 0,
          contrast: 0,
          saturation: 0,
          temperature: 0,
          tint: 0,
          highlights: 0,
          shadows: 0
        },
        imageHash: custardTub1ImageNode.hash
      }
    ]
  });
  const group1686557348 = figma.group([custardTub1], frame);
  group1686557348.name = 'Group 1686557348';
  group1686557348.x = 212;
  group1686557348.y = 7;
  // groupInfoSimple.constrainProportions = false;
  group1686557348.resize(105, 105);
  group1686557348.rotation = 0;
  group1686557348.opacity = 1;

  const group1686557479 = figma.group([custardTub1], frame);
  group1686557479.name = 'Group 1686557479';
  group1686557479.x = 212;
  group1686557479.y = 7;
  // groupInfoSimple.constrainProportions = false;
  group1686557479.resize(105, 105);
  group1686557479.rotation = 0;
  group1686557479.opacity = 1;


  // Logo
  const logoFrame = createShape({
    type: "frame",
    name: "Logo",
    x: 280,
    y: 8,
    width: 36.86274337768555,
    height: 36.86274337768555,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 0.6143800616264343,
    fills: [], // Assuming no fills provided for now, can be added if needed
    strokes: [] // Assuming no strokes provided for now, can be added if needed
  });
  logoFrame.fills = []
  // Create Ellipse 3818
  const ellipse3818 = createShape({
    type: "elipse", // 'elipse' is the correct type for an ellipse
    name: "Ellipse 3818",
    x: 0,
    y: 0,
    width: 36.86274337768555,
    height: 36.86274337768555,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 0.6143800616264343,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: cColor2,
      }
    ]
  });
  logoFrame.appendChild(ellipse3818);

  // Create Ellipse 3819
  const ellipse3819 = createShape({
    type: "elipse",
    name: "Ellipse 3819",
    x: 1.2284581661224365,
    y: 1.2286831140518188,
    width: 34.40522766113281,
    height: 34.40522766113281,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 0.5734213590621948,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: { r: 0.8509804010391235, g: 0.8509804010391235, b: 0.8509804010391235 },
      }
    ]
  });
  ellipse3819.isMask = true;
  logoFrame.appendChild(ellipse3819);

  // Create Ellipse 3820
  const ellipse3820 = createShape({
    type: "elipse",
    name: "Ellipse 3820",
    x: 1.2284581661224365,
    y: 1.2286831140518188,
    width: 34.40522766113281,
    height: 34.40522766113281,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 0.5734213590621948,
    fills: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: { r: 1, g: 1, b: 1 }, // White fill
      }
    ]
  });
  logoFrame.appendChild(ellipse3820);

  const frozenFunLogo1ImageNode = await figma.createImageAsync(logoHash);
  const frozenFunLogo1 = createShape({
    shape: undefined,
    type: "rectangle", // 'rectangle' for rectangular shapes
    name: "Frozen Fun Logo 1",
    x: 2,
    y: 2,
    width: 33,
    height: 33,
    rotation: 0,
    opacity: 1,
    cornerRadius: 17.5, // Rounded corners
    cornerSmoothing: 0,
    horizontal: "MIN",
    vertical: "MIN",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    strokeMiterLimit: 4,
    strokeWeight: 1,
    fills: [
      {
        type: "IMAGE",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        scaleMode: "FILL",
        imageTransform: [
          [1, 0, 0],
          [0, 1, 0]
        ],
        scalingFactor: 0.5, // Scaling factor for the image
        rotation: 0,
        filters: {
          exposure: 0,
          contrast: 0,
          saturation: 0,
          temperature: 0,
          tint: 0,
          highlights: 0,
          shadows: 0
        },
        imageHash: frozenFunLogo1ImageNode.hash
      }
    ]
  });
  logoFrame.appendChild(frozenFunLogo1);

  frame.appendChild(logoFrame);


  figma.currentPage.appendChild(frame);

}
// ==============================card8=========================================================================================
async function createCard8(props:CardProps) {
  const { X, Y,Width,Height } = calculateCardPosition("card8");
  if(props.version === "Version 1"){
   return await createCard8Version1({...props,x:X,y:Y});
  }else if(props.version === "Version 2"){
    return await createCard8Version2({...props,x:X,y:Y});
  }else if(props.version === "Version 3"){
    return await createCard8Version3({...props,x:X,y:Y});
  }else if(props.version === "Version 4"){
    return await createCard8Version4({...props,x:X,y:Y});
  }
} 
// const getVectorPath = () => {
//   const selectedNode = figma.currentPage.selection[0];
//   if (selectedNode && selectedNode.type === 'VECTOR') {
//     console.log(selectedNode.vectorPaths);
//   } else {
//     console.log("No vector node selected or not a vector.");
//   }

// }

interface MessageData {
  sheetData: any; // Replace `any` with a more specific type if possible
  cardType: string; // Adjust the type as needed
  cardVersion: string; // Adjust the type as needed
  offer: any;
  copy: any;
  desc: any;
  cta: any;
  colors: any;
}




async function handleCardCreation(
  cardType: string | "All",
  cardVersion: string | "All",
  item: { name: string; offer: string; desc: string; brand: string; logoHash: string; foodImageHash: string; tsc: string; foodImageHashArray: string[] },
  fontData: any,
  x: number,
  y: number,
  colors: any
) {
  console.log("7649...")
  // Normalize cardType to lowercase to match the cardCreationMap keys
  const normalizedCardType = cardType.toLowerCase();

  // Spread item properties and additional params into a single object
  const params = { ...item, x, y, fontData, colors };
  console.log(params);

  // Define a reusable card creation function map
  const cardCreationMap: Record<string, (params: any, version: string) => Promise<void>> = {
    card1: (params, version) => createCard1({ ...params, version }),
    card2: (params, version) => createCard2({ ...params, version }),
    card3: (params, version) => createCard3({ ...params, version }),
    card4: (params, version) => createCard4({ ...params, version }),
    card5: async (params, version) => {
      await createCard5({ ...params, version });
      await createCard5s({ ...params, version });
    },
    card6: async (params, version) => {
      await createCard6({ ...params, version });
      await createCard6s({ ...params, version });
    },
    card7: (params, version) => createCard7({ ...params, version }),
    card8: (params, version) => createCard8({ ...params, version })
  };

  // Process the card creation based on type and version
  const processCard = async (type: string, version: string) => {
    console.log(`Processing card: ${type}, version: ${version}`);
    if (cardCreationMap[type]) {
      try {
        await cardCreationMap[type](params, version);
      } catch (error) {
        console.error(`Error creating card ${type} with version ${version}:`, error);
      }
    } else {
      console.error(`No card creation function found for ${type}`);
    }
  };

  if (cardType === "All") {
    // If cardType is "All", loop through all card types and their respective versions
    const tasks = Object.keys(cardCreationMap).map((type) => {
      const versionsCount = Versions[type as keyof typeof Versions];
      const versions = Array.from({ length: versionsCount }, (_, i) => `Version ${i + 1}`);
      
      console.log(`Creating tasks for ${type}, versions: ${versions}`);
      return versions.map(version => processCard(type, version));
    });

    await Promise.all([].concat(...tasks)); // Running all tasks concurrently
  } else if (cardVersion === "All") {
    // If cardVersion is "All", process all versions for the specified card type
    const versionsCount = Versions[normalizedCardType as keyof typeof Versions];
    const versions = Array.from({ length: versionsCount }, (_, i) => `Version ${i + 1}`);
    
    console.log(`Creating tasks for ${normalizedCardType}, versions: ${versions}`);
    const tasks = versions.map(version => processCard(normalizedCardType, version));
    await Promise.all(tasks);
  } else {
    // Process a specific card type and version
    console.log(`Creating card ${normalizedCardType} version ${cardVersion}`);
    await processCard(normalizedCardType, cardVersion);
  }
}







// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = async (msg: { type: string, data: unknown }) => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.

  //reload plugin
  if (msg.type === "reload-plugin") {
    // console.log("reloading plugin")
    // figma.closePlugin();
    // figma.notify("reload plugin",{button:{text:"hello",action:()=>console.log("hello")}});
    figma.showUI(__html__, { themeColors: true });
    figma.ui.resize(480, 585)
    // figma.ui.postMessage({event:"store-id"});
  }

  if (msg.type === 'create-shapes') {
    // This plugin creates rectangles on the screen.
    const numberOfRectangles = msg.data;
    if (typeof numberOfRectangles !== "number") return;

    const nodes: SceneNode[] = [];
    for (let i = 0; i < numberOfRectangles; i++) {
      const rect = figma.createRectangle();
      rect.x = i * 150;
      rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
    }
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  if (msg.type === "load-availableFonts") {
    await listAndLoadFonts();
  }
  if (msg.type === "load-fonts") {
    // console.log("....font loading message");
    await loadFonts();
  }
  if (msg.type === "sheet-data") {
    await listAndLoadFonts();
    const data: MessageData = msg.data as MessageData;
    // console.log("sheet data...", data);
    const { sheetData, cardType, cardVersion, offer, copy, desc, cta, colors } = data;


    // Create an array of font data objects
    const fontData = [offer, copy, desc, cta];

    console.log("7770...")
    //load user selected fonts
    // Iterate over each font data object and load the font if it exists
    for (const item of fontData) {
      if (item.font) {
        await figma.loadFontAsync({ family: item.font, style: item.style || "Regular" });
      }
    }
    if (Array.isArray(sheetData)) {
      const node = figma.currentPage.selection;
      let x = 1000; // Starting x-coordinate

      node.forEach(nodeInner => {
        x = Math.max(x, nodeInner.x + nodeInner.width); // Update x based on current nodes
      });

      InitialHorizontal = x;
      // Set a padding value to prevent overlap
      const cardWidth = 1000; // Width of each card
      const maxPageWidth = 5000; // Maximum allowed width before wrapping to the next row
      const rowPadding = 1000; // Vertical spacing between rows
      const padding = 1000;

      // Execute all card creation actions in parallel
      try {
        await Promise.all(
          sheetData.map(async (item, index) => {
            const { name, offer, desc, brand, logoHash, foodImageHash, tsc, foodImageHashArray } = item;
            // Calculate new x and y positions
            const cardX = ((index * (cardWidth + padding)) % maxPageWidth) + x;
            const cardY = Math.floor(index / (maxPageWidth / (cardWidth + padding))) * (500 + rowPadding);
            try {
              await handleCardCreation(
                cardType,
                cardVersion,
                { name, offer, desc, brand, logoHash, foodImageHash, tsc, foodImageHashArray },
                fontData,
                cardX,
                cardY,
                colors
              )
            } catch (error) {
              console.error(`Error creating card for item ${name}:`, error);
            }
          })
        );
        // figma.ui.postMessage({ type: "card-generated" });
        // figma.ui.show
        // seen.clear();
      } catch (error) {
        console.error("Error creating cards:", error);
      }
    }
  }

  if (msg.type === "set-session-id") {
    try {
      await figma.clientStorage.setAsync("sessionId", msg.data)
    } catch (error) {
      console.log("err", error)
    }
  }

  if (msg.type === "remove-session-id") {
    try {
      // console.log("remove token...")
      await figma.clientStorage.deleteAsync("sessionId")
    } catch (error) {
      console.log("err", error)
    }
  }

  if (msg.type === "get-session-id") {
    try {
      // console.log("remove token...")
      const user = await figma.clientStorage.getAsync("sessionId")
      figma.ui.postMessage({ type: "get-session", data: user })
    } catch (error) {
      console.log("err", error)
    }
  }

  if (msg.type === "resize-frame") {
    figma.ui.resize(480, 585);
  }




  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  // figma.closePlugin();

}

figma.on('close', () => {
  console.log("close message");
  // figma.ui.postMessage({ type: "plugin-exit" });
})

