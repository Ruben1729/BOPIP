<template>
    <v-app>
        <v-main>
            <router-view>

            </router-view>
        </v-main>
    </v-app>
</template>

<script>

export default {
    name: 'App',
    components: {},
    async created() {
        await this.$store.dispatch('getDeviceInfo');
        this.$store.state.layout.isMobileLayout = this.getLayoutWidth() <= 600;
        this.$store.state.layout.isSmallMobileLayout= this.getLayoutWidth() <= 360;

        // Resize callback
        window.addEventListener('resize', async () => {
            await this.$store.dispatch('getDeviceInfo');
            this.$store.state.layout.isMobileLayout = this.getLayoutWidth() <= 600;
            this.$store.state.layout.isSmallMobileLayout = this.getLayoutWidth() <= 360;

        });
    }
};
</script>

<style lang="scss">
@import "./assets/style/global.scss";
</style>
