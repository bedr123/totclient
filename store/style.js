import * as styles from "@/styles";
import { darkModeKey, styleKey } from "@/config";

export default {
    state: () => ({
      /* Styles */
      asideStyle: "",
      asideScrollbarsStyle: "",
      asideBrandStyle: "",
      asideMenuItemStyle: "",
      asideMenuItemActiveStyle: "",
      asideMenuDropdownStyle: "",
      navBarItemLabelStyle: "",
      navBarItemLabelHoverStyle: "",
      navBarItemLabelActiveColorStyle: "",
      overlayStyle: "",
  
      /* Dark mode */
      darkMode: false,
    }),
    mutations: {
      SET_STYLE(state, style) {
        for (const key in style) {
          state[`${key}Style`] = style[key];
        }
      },
      SET_DARK_MODE(state, darkmode) {
        state.darkMode = darkmode
      }
    },
    actions: {
      setStyle(state, payload) {
        if (!styles[payload]) {
          return;
        }
  
        if (typeof localStorage !== "undefined") {
          localStorage.setItem(styleKey, payload);
        }
  
        const style = styles[payload];
        state.commit("SET_STYLE", style)
      },
  
      setDarkMode(state, payload = null) {
        state.commit('SET_DARK_MODE', payload !== null ? payload : !state.darkMode)
  
        if (typeof localStorage !== "undefined") {
          localStorage.setItem(darkModeKey, state.darkMode ? "1" : "0");
        }
  
        if (typeof document !== "undefined") {
          document.body.classList[state.darkMode ? "add" : "remove"](
            "dark-scrollbars"
          );
  
          document.documentElement.classList[state.darkMode ? "add" : "remove"](
            "dark-scrollbars-compat"
          );
        }
      },
    },
  }
  