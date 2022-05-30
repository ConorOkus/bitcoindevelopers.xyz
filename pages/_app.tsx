import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Layout from "../components/Layout";

const colors = {
  brand: {
    "black": "#150a09",
    "blue": "#141b39",
    "orange": "#ff9500",
  }
}

const theme = extendTheme({ colors })

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}

export default MyApp
