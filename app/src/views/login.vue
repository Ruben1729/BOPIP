<template>
    <v-container>
        <v-text-field
            label="Email address"
            v-model=email_address
        ></v-text-field>
        <v-text-field
            label="Password"
            v-model=password
        ></v-text-field>
        <v-checkbox
            label="Remember password"
            v-model=remember_password
        ></v-checkbox>
        <v-btn
            elevation="2"
            large
        ></v-btn>


    </v-container>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            email_address: '',
            password: '',
            remember_password: false
        };
    },
    methods: {
        

    }
};
</script>

<style scoped>

</style>