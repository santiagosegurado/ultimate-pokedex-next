import { CssBaseline } from '@nextui-org/react'
import { Html, Head, Main, NextScript } from 'next/document'


const Document = () =>{
  return (
    <Html lang="en">
      <Head>
        {CssBaseline.flush()}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document