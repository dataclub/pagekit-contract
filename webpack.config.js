module.exports = [

    {
        entry: {
            "site": "./app/components/site.vue",
            "link": "./app/components/link.vue",
            "contract-index": "./app/views/admin/contract-index",
            "contract-edit": "./app/views/admin/contract-edit",
            "accounts-index": "./app/views/admin/accounts-index"
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
