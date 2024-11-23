// import this after install `@mdi/font` package
import "@mdi/font/css/materialdesignicons.css";

import "vuetify/styles";
import { createVuetify } from "vuetify";

const workoutDark = {
  dark: true,
  colors: {
    dots: "#191919",
    surface: "#121212",
    "surface-bright": "#2C2C2C",
    "surface-light": "#333333",
    "surface-variant": "#424242",
    "on-surface-variant": "#B3B3B3",
    primary: "#6d28d9",
    "primary-darken-1": "#3700B3",
    secondary: "#03DAC6",
    "secondary-darken-1": "#018786",
    error: "#CF6679",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
    warning_vibrant: "#ea580c",
  },
  variables: {
    "border-color": "#6d28d9",
    "border-opacity": 0.2,
    "high-emphasis-opacity": 0.87,
    "medium-emphasis-opacity": 0.6,
    "disabled-opacity": 0.38,
    "idle-opacity": 0.04,
    "hover-opacity": 0.08,
    "focus-opacity": 0.12,
    "selected-opacity": 0.08,
    "activated-opacity": 0.12,
    "pressed-opacity": 0.12,
    "dragged-opacity": 0.08,
    "theme-kbd": "#212529",
    "theme-on-kbd": "#FFFFFF",
    "theme-code": "#F5F5F5",
    "theme-on-code": "#000000",
  },
};

const workoutLight = {
  dark: false,
  colors: {
    dots: "DADADA", // Light gray for dots
    surface: "#FFFFFF",
    "surface-bright": "#F5F5F5",
    "surface-light": "#EEEEEE",
    "surface-variant": "#E0E0E0",
    "on-surface-variant": "#616161",
    primary: "#6200EE",
    "primary-darken-1": "#3700B3",
    secondary: "#03DAC6",
    "secondary-darken-1": "#018786",
    error: "#B00020",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
  },
  variables: {
    "border-color": "#DDDDDD",
    "border-opacity": 0.12,
    "high-emphasis-opacity": 0.87,
    "medium-emphasis-opacity": 0.6,
    "disabled-opacity": 0.38,
    "idle-opacity": 0.04,
    "hover-opacity": 0.08,
    "focus-opacity": 0.12,
    "selected-opacity": 0.08,
    "activated-opacity": 0.12,
    "pressed-opacity": 0.12,
    "dragged-opacity": 0.08,
    "theme-kbd": "#212529",
    "theme-on-kbd": "#FFFFFF",
    "theme-code": "#F5F5F5",
    "theme-on-code": "#000000",
  },
};

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: "workoutDark",
      themes: {
        workoutDark,
        workoutLight,
      },
    },
  });
  app.vueApp.use(vuetify);
});
