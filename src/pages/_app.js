import '@/styles/globals.css'
import Head from 'next/head'
import { ThemeProvider } from '@mui/material/styles'
import theme from '@/theme/theme'
import CssBaseline from '@mui/material/CssBaseline'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Intelligent Repository System</title>
        <meta name='viewport' content='initial-scale=1, width=device-width'></meta>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
