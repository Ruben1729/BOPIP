<template>
    <v-container class="grey lighten-5" fill-height>
        <v-row>
            <v-col
                v-if="!isMobileLayout"
                cols="6"

            >


            </v-col>
            <v-col

            >

                <v-container>
                    <v-form @submit.prevent="">

                        <v-text-field
                            label="Email address"
                            v-model=email_address
                        ></v-text-field>
                        <!--                    <v-text-field-->
                        <!--                        label="Password"-->
                        <!--                        v-model=password-->
                        <!--                    ></v-text-field>-->
                        <!--                    <v-checkbox-->
                        <!--                        label="Remember password"-->
                        <!--                        v-model=remember_password-->
                        <!--                    ></v-checkbox>-->
                        <v-btn type="submit"
                               @click="onSubmit"
                               block
                               elevation="2"
                               large
                        >Login
                        </v-btn>
                    </v-form>
                </v-container>

            </v-col>
        </v-row>
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
        onSubmit() {
            this.$store.commit('setEmail', this.email_address);
            this.reach('/orders');
        }
    }
};
</script>

<style scoped>

</style>