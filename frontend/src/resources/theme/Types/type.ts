"use client"
export type CoresVariantes = {
  name: string;
  lighter: string;
  light: string;
  main: string;
  dark: string;
  darker: string;
  contrastText: string;
};

export const presetsDeCores = [
  
  // PURPLE
  {
    name: "purple",
    lighter: "#EBD6FD",
    light: "#B985F4",
    main: "#7635dc",
    dark: "#431A9E",
    darker: "#200A69",
    contrastText: "#fff",
  },
  // DEFAULT
  {
    name: "default",
    lighter: "#D1FFFC",
    light: "#9ADAF5",
    main: "#56C5F1",
    dark: "#0E77B7",
    darker: "#337ab7",
    contrastText: "#fff",
  },
  //GREEN
  {
    name: "green",
    lighter: "#C8FACD",
    light: "#5BE584",
    main: "#00AB55",
    dark: "#007B55",
    darker: "#005249",
    contrastText: "#fff",
  },
  {
    name: "blue",
    lighter: "#D1E9FC",
    light: "#76B0F1",
    main: "#2065D1",
    dark: "#103996",
    darker: "#061B64",
    contrastText: "#fff",
  },
  // ORANGE
  {
    name: "orange",
    lighter: "#FEF4D4",
    light: "#FED680",
    main: "#fda92d",
    dark: "#B66816",
    darker: "#793908",
    contrastText: "#212B36",
  },
  // RED
  {
    name: "red",
    lighter: "#FFE3D5",
    light: "#FFC1AC",
    main: "#FF3030",
    dark: "#B71833",
    darker: "#7A0930",
    contrastText: "#fff",
  },
];

export type PresetsDeCores =
  | "default"
  | "purple"
  | "cyan"
  | "blue"
  | "orange"
  | "red";

export const defaultPreset = presetsDeCores[0];
export const purplePreset = presetsDeCores[1];
export const cyanPreset = presetsDeCores[2];
export const bluePreset = presetsDeCores[3];
export const orangePreset = presetsDeCores[4];
export const redPreset = presetsDeCores[5];

export default function pegarPresetsCores(presetsKey: PresetsDeCores) {
  return {
    purple: purplePreset,
    cyan: cyanPreset,
    blue: bluePreset,
    orange: orangePreset,
    red: redPreset,
    default: defaultPreset,
  }[presetsKey];
}
