const PROXY_CONFIG = [
    {
        context: [
            "/auto-service"
        ],
        target: "http://localhost:7878",
        secure: false,
        changeOrigin: true,
        logLevel: "debug"
    }
];

module.exports = PROXY_CONFIG;
