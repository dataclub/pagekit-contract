module.exports = [

    {
        entry: {
            "settings": "./app/components/settings.vue",
            "site": "./app/components/site.vue",
            "link": "./app/components/link.vue",
            "contract-index": "./app/views/admin/contract-index"
        },
        output: {
            filename: "./app/bundle/[name].js"
        },
        externals: {
            "lodash": "_",
            "jquery": "jQuery",
            "uikit": "UIkit",
            "vue": "Vue"
        },
        module: {
            loaders: [
                { test: /\.vue$/, loader: "vue" }
            ]
        }
    }

];
