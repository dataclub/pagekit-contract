<template>

    <div class="uk-form-row">
        <label for="form-name" class="uk-form-label">{{ 'Name' | trans }}</label>
        <div class="uk-form-controls">
            <input id="form-name" type="text" class="uk-form-width-large" v-model="name"></input>
        </div>
    </div>

</template>

<script>

    module.exports = {

        link: {
            label: 'Contract'
        },

        props: ['link'],

        data: function () {
            return {
                name: []
            }
        },

        watch: {

            name: function (name) {
                this.link = '@contract/name?name=' + name;
            }

        }

    };


    window.Links.components['contract'] = module.exports;

</script>
