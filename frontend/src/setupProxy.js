const { createProxyMiddleware } = require('http-proxy-middleware');
const apiBaseUrl = import.meta.env.VITE_BACKEND_URL;

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: `${apiBaseUrl}`,
            changeOrigin: true
        })
    )
}
