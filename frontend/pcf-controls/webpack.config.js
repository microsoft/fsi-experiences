module.exports = {
    module: {
        rules: [
            {
                // Tell webpack how to handle JS or JSX files
                test: /\.(js|jsx)$/,
                resolve: {
                    fullySpecified: false,
                },
            },
        ],
    },
};