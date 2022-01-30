<template>
    <v-container>
        <v-breadcrumbs :items="routes">
            <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
            </template>
        </v-breadcrumbs>
        <div>
            <v-card
                class="ma-6 clickable mx-auto"
                max-width="344"
                :to="`/order-details/${order.orderId}`"
                v-for="order in orders"
                v-bind:key="order.orderId">
                <div>
                    <v-card-title class="text-h5">
                        Order Number {{ order.orderId }}
                    </v-card-title>

                    <v-card-subtitle>
                        {{ getOrderPrice(order) }}
                    </v-card-subtitle>
                </div>
                <div class="mr-8" style="font-size: 1.5rem">
                    {{order.quantity}}
                </div>
            </v-card>
        </div>
    </v-container>
</template>

<script>
import Network from '@/helpers/Network.js';

export default {
    name: 'orders',
    activated() {
        Network.get(`/orders/by-email/${this.email}`).then(res => {
            this.orders = res.data;
        }).catch(err => {
            console.log(err);
            this.orders = [];
        });
    },
    data() {
        return {
            orders: [],
            routes: [{
                text: 'Orders',
                disabled: false,
                href: 'orders'
            }]
        };
    },
    methods: {
        getOrderPrice(order) {
            let totalPrice = 0;

            for(let item in order.orderEntries) {
                totalPrice += order.orderEntries[item].totalEntryPrice
            }

            return totalPrice
        }
    }
};

</script>

<style scoped>

</style>