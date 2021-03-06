import Vue from 'vue';

const mixins = {
    computed: {
        isIOS() {
            return this.device?.operatingSystem.toLowerCase() === 'ios';
        },
        isAndroid() {
            return this.device?.operatingSystem.toLowerCase() === 'android';
        },
        isDesktop() {
            return this.device?.platform === 'web';
        },
        isMobileLayout() {
            return this.$store.state.layout.isMobileLayout;
        },
        isSmallMobileLayout() {
            return this.$store.state.layout.isSmallMobileLayout;
        },
        user() {
            return this.$store.state.user;
        },
        email() {
            return this.$store.state.user.email;
        },
        device() {
            return this.$store.state.user.device;
        },
    },
    methods: {
        reach(url) {
            if (this.$router.currentRoute.path !== url)
                this.$router.push(url);
        },
        getLayoutWidth() {
            return window.innerWidth ;
        }
    }
};

Vue.mixin(mixins);
