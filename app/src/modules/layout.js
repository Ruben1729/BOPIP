export default {
    state: {
        isSmallMobileLayout: false,
        isMobileLayout: false
    },
    mutations: {
        setSmallMobileLayout(state, isSmallMobileLayout) {
            state.isSmallMobileLayout = isSmallMobileLayout;
        },
        setMobileLayout(state, isMobileLayout) {
            state.isMobileLayout = isMobileLayout;
        }
    }
};
