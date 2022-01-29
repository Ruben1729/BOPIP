<template>
  <v-container>
    <v-row dense>
      <v-col cols="12">
        <v-card
            color="#385F73"
            dark
        >
          <v-card-title class="text-h5">
            Unlimited music now
          </v-card-title>

          <v-card-subtitle>Listen to your favorite artists and albums whenever and wherever, online and offline.</v-card-subtitle>

          <v-card-actions>
            <v-btn text>
              Listen Now
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col
          v-for="(item, i) in items"
          :key="i"
          cols="12"
      >
        <v-card
            :color="item.color"
            dark
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title
                  class="text-h5"
                  v-text="item.title"
              ></v-card-title>

              <v-card-subtitle v-text="item.artist"></v-card-subtitle>

              <v-card-actions>
                <v-btn
                    v-if="item.artist === 'Ellie Goulding'"
                    class="ml-2 mt-3"
                    fab
                    icon
                    height="40px"
                    right
                    width="40px"
                >
                  <v-icon>mdi-play</v-icon>
                </v-btn>

                <v-btn
                    v-else
                    class="ml-2 mt-5"
                    outlined
                    rounded
                    small
                >
                  START RADIO
                </v-btn>
              </v-card-actions>
            </div>

            <v-avatar
                class="ma-3"
                size="125"
                tile
            >
              <v-img :src="item.src"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "order-details",
  data() {
    return {
      order: {
        "orderId": "526",
        "customerName": "Abdiel Ondricka",
        "customerPhoneNumber": "5551091641",
        "customerEmailAddress": "abdiel.ondricka.470243@test.com",
        "customerAddress": "3955 Av de Ramezay, Montréal, QC H3Y 3K3",
        "preparationTime": 30,
        "parcelSize": "S",
        "orderEntries": [
          {
            "productId": "34563899",
            "productName": "Handcrafted Steel Keyboard",
            "quantity": 1,
            "totalEntryPrice": 449.99
          },
          {
            "productId": "30071892",
            "productName": "Refined Fresh Tuna",
            "quantity": 1,
            "totalEntryPrice": 79.99
          },
          {
            "productId": "16667785",
            "productName": "Gorgeous Plastic Bacon",
            "quantity": 1,
            "totalEntryPrice": 463.99
          }
        ]
      },
    }
  }
}
</script>

<style scoped>

</style>