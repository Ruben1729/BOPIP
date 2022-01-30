<template>
    <v-container>
        <v-col>
            <v-row>
                Order Details
            </v-row>
            <v-row>
                Items
            </v-row>
            <v-row v-for="item in order.orderEntries"
                   v-bind:key="item.productKey" block>
                <v-card
                    class="ma-6 d-flex align-center justify-space-between"
                >
                    <div>
                        <v-card-title class="text-h5">
                            {{ item.productName }}
                        </v-card-title>

                        <v-card-subtitle>
                            {{ item.totalEntryPrice }}
                        </v-card-subtitle>
                    </div>
                    <div class="mr-8" style="font-size: 1.5rem">
                        {{ item.quantity }}
                    </div>
                </v-card>

            </v-row>
            <v-row>
                Delivery Location
            </v-row>
            <v-row>
                <v-overflow-btn
                    :items="pickupLocations"
                    editable
                    label="Select a location"></v-overflow-btn>
            </v-row>
            <v-row>
                Delivary Date
            </v-row>
            <v-row>
                <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="dates"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-combobox
                            v-model="dates"
                            multiple
                            chips
                            small-chips
                            label="Multiple picker in menu"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-combobox>
                    </template>
                    <v-date-picker
                        v-model="dates"
                        multiple
                        no-title
                        scrollable
                    >
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="primary"
                            @click="menu = false"
                        >
                            Cancel
                        </v-btn>
                        <v-btn
                            text
                            color="primary"
                            @click="$refs.menu.save(dates)"
                        >
                            OK
                        </v-btn>
                    </v-date-picker>
                </v-menu>
            </v-row>
            <v-row>
                Delivery Time
            </v-row>
            <v-row>
                <v-menu
                    ref="menu"
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="time"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="time"
                            label="Picker in menu"
                            prepend-icon="mdi-clock-time-four-outline"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                    </template>
                    <v-time-picker
                        v-if="menu2"
                        v-model="time"
                        full-width
                        @click:minute="$refs.menu.save(time)"
                    ></v-time-picker>
                </v-menu>
            </v-row>
            <v-row>
                <v-btn
                    depressed
                    color="primary"
                >
                    Submit Pickup
                </v-btn>
            </v-row>
        </v-col>


    </v-container>
</template>

<script>
import Network from '@/helpers/Network.js';

export default {

    name: 'order-details',
    activated() {
        Network.get(`/orders/${this.$route.params.orderId}`).then(res => {
            this.order = res.data;
        }).catch(err => {
            console.log(err);
        });
    },
    data() {
        return {
            // order id, store id, start time
            order: {},
            pickupLocations: [
                '6381, RTE. TRANSCANADIENNE, POINTE-CLAIRE, QUEBEC H9R 5A5',
                '7455, RUE SHERBROOKE E, MONTRÉAL, QUEBEC H1N 1E8',
            ]
        };
    }
};
</script>

<style scoped>

</style>