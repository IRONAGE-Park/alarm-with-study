import normalColor from "@renderer/styles/colors/normal-color";
import lightColor from "@renderer/styles/colors/light-color";
// styles

export const normal = normalColor;
export const light = lightColor;

export type Color = typeof normal | typeof light;

export type ColorTheme = "normal" | "light";

export type ColorMap = Record<ColorTheme, Color>;

export const colorMap: ColorMap = {
  normal,
  light,
};
