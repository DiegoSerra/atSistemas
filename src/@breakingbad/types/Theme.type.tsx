import { ThemeOptions } from "@material-ui/core";

export interface ThemeType {
  theme: string
}

export interface ThemeConfig {
  [key: string]: ThemeOptions
}