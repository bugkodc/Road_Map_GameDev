import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const UNITY_DOC_ORIGIN = 'https://docs.unity3d.com'
const UNITY_DOC_VERSION = '6000.4'

const handleUnityDocsRequest = async (req, res) => {
  try {
    const requestUrl = new URL(req.url || '', 'http://localhost')
    const docPath = requestUrl.searchParams.get('path') || 'index.html'
    const version = requestUrl.searchParams.get('version') || UNITY_DOC_VERSION

    if (!/^[\w./-]+\.html$/.test(docPath) || docPath.includes('..')) {
      res.statusCode = 400
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ message: 'Unity doc path không hợp lệ.' }))
      return
    }

    const isManual = requestUrl.searchParams.get('isManual') === 'true'
    
    const docFolder = isManual ? 'Manual' : 'ScriptReference'
    const sourceUrl = `${UNITY_DOC_ORIGIN}/${version}/Documentation/${docFolder}/${docPath}`
    const upstream = await fetch(sourceUrl, {
      headers: {
        'User-Agent': 'Road-Map-GameDev UnityDocsAdapter/1.0'
      }
    })

    if (!upstream.ok) {
      res.statusCode = upstream.status
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({
        message: `Unity ${isManual ? 'Manual' : 'ScriptReference'} trả về ${upstream.status} cho ${docPath}.`,
        sourceUrl
      }))
      return
    }

    const html = await upstream.text()
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Cache-Control', 'public, max-age=3600')
    res.end(JSON.stringify({
      html,
      sourceUrl,
      version,
      fetchedAt: new Date().toISOString()
    }))
  } catch (error) {
    res.statusCode = 502
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({
      message: error instanceof Error ? error.message : 'Không thể proxy Unity docs.'
    }))
  }
}

const unityDocsProxy = () => ({
  name: 'unity-docs-proxy',
  configureServer(server) {
    server.middlewares.use('/api/unity-docs', handleUnityDocsRequest)
  },
  configurePreviewServer(server) {
    server.middlewares.use('/api/unity-docs', handleUnityDocsRequest)
  }
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), unityDocsProxy()],
  base: './',
})
