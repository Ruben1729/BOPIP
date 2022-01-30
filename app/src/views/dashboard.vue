<template>
    <v-container>
        <v-sheet height="600">
            <v-calendar
                ref="calendar"
                :weekdays="[0,1,2,3,4,5,6]"
                type="month"
                :events="[]"
                event-overlap-mode="stack"
                :event-overlap-threshold="30"
                ></v-calendar>
        </v-sheet>
    </v-container>
</template>

<script>
export default {
    name: 'settings'
};
</script>

<style scoped>

</style>