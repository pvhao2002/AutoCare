const PROXY_CONFIG = [
    {
        context: [
            "/auto-service"
        ],
        target: "http://localhost:9194",
        secure: false,
        changeOrigin: true,
        logLevel: "debug"
    }
];

module.exports = PROXY_CONFIG;
