import type style from "@renderer/styles/themes/style";
import type { Color, ColorMap } from "@renderer/styles/colors/color";
// types

import font, {
  fontWeight,
  fontSize,
  lineHeight,
  fontColor,
  textAlign,
} from "@renderer/styles/themes/font";
import whiteSpace from "@renderer/styles/themes/whiteSpace";
// styles

export interface EmotionTheme extends ColorMap {
  /** 모든 테마의 Color */
  color: Color;
  /** font size, weight 등의 정보 접근자 */
  font: typeof font;
  fontSize: typeof fontSize;
  lineHeight: typeof lineHeight;
  fontWeight: typeof fontWeight;
  fontColor: typeof fontColor;
  textAlign: typeof textAlign;
  /** 모든 테마에서 사용 가능한 CSS */
  style: typeof style;
  /** 여백 */
  whiteSpace: typeof whiteSpace;
}
