import '@style/globals.css'

export const metadata = {
    title: "ToolBox",
    description: 'Discover & Share Powerful Tools'
}

const RootLayout = () => {
  return (
    <html lang='en'>
        <body>
            <div className="main">
                <div className="gradient" />
            </div>

            <main className="app">
                {children}
            </main>
        </body>
    </html>
  )
}

export default RootLayout