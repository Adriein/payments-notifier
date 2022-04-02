import { MantineThemeOverride } from "@mantine/core";
import 'dayjs/locale/es';

export const theme: MantineThemeOverride = {
  colors: {
    blue: [
      '#eef0fe',
      '#dce0fd',
      '#cbd1fc',
      '#b9c1fb',
      '#a8b2fb',
      '#96a3fa',
      '#8593f9',
      '#7384f8',
      '#6274f7',
      '#5065f6'
    ]
  },
  headings: {
    fontFamily: 'Roboto, sans-serif',
  },
  datesLocale: 'es'
}