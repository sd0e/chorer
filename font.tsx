// import the font from Google Fonts CDN
import { Inter } from "next/font/google";

// define font weights
const inter = Inter({ subsets: ['latin'], weight: ['600', '700'] });

// export so that it can be used throughout program
export const InterClass = inter.className;