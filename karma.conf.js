module.exports = function (config) {
    config.set({
        frameworks: ["jasmine", "karma-typescript"],
        files: [
            "src/**/*.ts",
            "test/**/*.ts",
            "dist/**/*.js"
        ],
        preprocessors: {
            "**/*.ts": "karma-typescript" // *.tsx for React Jsx
        },
        reporters: ["progress", "karma-typescript"],
        browsers: ["Chrome"],
        proxies: {
            '/worker.js': '/dist/mock-worker.js'
        },
        karmaTypescriptConfig: {
            tsconfig: "tsconfig.json",
            coverageOptions: {
                exclude: /\.ts$/i
            }
        }
    });
};