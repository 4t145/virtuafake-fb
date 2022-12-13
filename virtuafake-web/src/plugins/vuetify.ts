// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify, ThemeDefinition } from 'vuetify'
import { fa } from 'vuetify/iconsets/fa'
import { mdi, aliases } from 'vuetify/iconsets/mdi'

const vrpink = '#fb5291'
const vrgreen = '#208c89'
const virtuaFakeLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    // background: '#208c89',
    surface: '#ffffff',
    primary: '#6200EE',
    'primary-darken-1': '#3700B3',
    secondary: '#03DAC6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    vrpink,
    vrgreen
  }
}

export default createVuetify({
  theme: {
    defaultTheme: 'virtuaFakeLightTheme',
    themes: {
      virtuaFakeLightTheme,
    }
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi, fa
    }
  }
})