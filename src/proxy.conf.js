const PROXY_CONFIG = [
    {
        context: [
            '/rest'
        ],
        target: "http://o5g4l7.hom.protheus.totvscloud.com.br:30385/",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
            "^/":""
        }
    }
]

module.exports = PROXY_CONFIG;