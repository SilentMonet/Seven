import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1a1a1a',      // 深黑
      light: '#424242',     // 中灰
      dark: '#000000',      // 纯黑
      contrastText: '#ffffff', // 对比文本
    },
    secondary: {
      main: '#757575',      // 标准灰
      light: '#bdbdbd',     // 浅灰
      dark: '#424242',      // 深灰
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',   // 白色背景
      paper: '#f5f5f5',     // 浅灰背景
    },
    text: {
      primary: '#1a1a1a',   // 深黑文本
      secondary: '#757575', // 灰色文本
      disabled: '#bdbdbd',  // 禁用灰
    },
    divider: '#e0e0e0',     // 分割线浅灰
    action: {
      active: '#1a1a1a',
      hover: '#f5f5f5',
      selected: '#eeeeee',
      disabled: '#bdbdbd',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { color: '#000000', fontWeight: 700 },
    h2: { color: '#1a1a1a', fontWeight: 600 },
    body1: { color: '#1a1a1a' },
    body2: { color: '#757575' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '4px',
        },
        contained: {
          backgroundColor: '#1a1a1a',
          '&:hover': { backgroundColor: '#424242' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          border: '1px solid #e0e0e0',
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',      // 白色主色
      light: '#bdbdbd',     // 浅灰
      dark: '#757575',      // 灰色
      contrastText: '#000000',
    },
    secondary: {
      main: '#9e9e9e',      // 中灰
      light: '#bdbdbd',     // 浅灰
      dark: '#424242',      // 深灰
      contrastText: '#000000',
    },
    background: {
      default: '#121212',   // 深黑背景
      paper: '#1e1e1e',     // 深灰背景
    },
    text: {
      primary: '#ffffff',   // 白色文本
      secondary: '#bdbdbd', // 浅灰文本
      disabled: '#757575',  // 禁用灰
    },
    divider: '#424242',     // 分割线深灰
    action: {
      active: '#ffffff',
      hover: '#2a2a2a',
      selected: '#333333',
      disabled: '#757575',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { color: '#ffffff', fontWeight: 700 },
    h2: { color: '#ffffff', fontWeight: 600 },
    body1: { color: '#ffffff' },
    body2: { color: '#bdbdbd' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '4px',
        },
        contained: {
          backgroundColor: '#ffffff',
          color: '#000000',
          '&:hover': { backgroundColor: '#bdbdbd' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e',
          border: '1px solid #424242',
        },
      },
    },
  },
});
