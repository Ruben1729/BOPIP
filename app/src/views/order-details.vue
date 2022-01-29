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
            {{item.quantity}}
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
export default {
  name: "order-details",
  data() {
    return {
      order: {
        orderId: 526,
        customerName: "Abdiel Ondricka",
        customerPhoneNumber: "5551091641",
        customerEmailAddress: "abdiel.ondricka.470243@test.com",
        customerAddress: "3955 Av de Ramezay, Montréal, QC H3Y 3K3",
        preparationTime: 30,
        parcelSize: "S",
        orderEntries: [
          {
            productId: 34563899,
            productName: "Handcrafted Steel Keyboard",
            quantity: 1,
            totalEntryPrice: 449.99
          },
          {
            productId: 30071892,
            productName: "Refined Fresh Tuna",
            quantity: 1,
            totalEntryPrice: 79.99
          },
          {
            productId: 16667785,
            productName: "Gorgeous Plastic Bacon",
            quantity: 1,
            totalEntryPrice: 463.99
          }
        ]
      },
      pickupLocations: [
        "6381, RTE. TRANSCANADIENNE, POINTE-CLAIRE, QUEBEC H9R 5A5",
        "7455, RUE SHERBROOKE E, MONTRÉAL, QUEBEC H1N 1E8",
      ]
    }
  }
};
</script>

<style scoped>

</style>