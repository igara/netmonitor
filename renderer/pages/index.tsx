import React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'

const IndexPage = () => {
  React.useEffect(() => {
    global.ipcRenderer.addListener('StartNetworkAPIHook', (_event, message) => {
      alert(message)
    })
  }, [])

  const onStartNetworkAPIHook = React.useCallback(() => { 
    global.ipcRenderer.send('StartNetworkAPIHook')
  }, [])

  return (
    <Layout title="netmonitor">
      <h1>netmonitor</h1>
      <button onClick={onStartNetworkAPIHook}>Start</button>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
    </Layout>
  )
}

export default IndexPage
