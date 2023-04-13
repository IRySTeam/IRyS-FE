import '@/styles/globals.css'
import Head from 'next/head'
import { ThemeProvider } from '@mui/material/styles'
import theme from '@/theme/theme'
import CssBaseline from '@mui/material/CssBaseline'
import { Provider } from 'react-redux'; 
import { store } from '@/state/store/store';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel='icon' href='/irys.png' />
        <title>Intelligent Repository System</title>
        <meta name='viewport' content='initial-scale=1, width=device-width'></meta>
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </>
  )
}
