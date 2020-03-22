
<template>
  <v-card>
    <v-card-title>Last 24 Hours</v-card-title>
    <v-data-table
      :headers="headers"
      :items="notaries"
      :sort-by="['total']"
      :sort-desc="[true]"
      multi-sort
      item-key="name"
      class="elevation-1"
    ></v-data-table>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name"
        },
        // { text: "Address", sortable: false, value: "address" },
        { text: "Total", value: "total" },
        { text: "RICK.total", value: "RICK.totalNotas" },
        { text: "RICK.lastnota", value: "RICK.timeSinceLastNota" },
        { text: "MORTY.total", value: "MORTY.totalNotas" },
        { text: "MORTY.lastNota", value: "MORTY.timeSinceLastNota" },
        { text: "TXSCLAPOW.total", value: "TXSCLAPOW.totalNotas" },
        { text: "TXSCLAPOW.lastNota", value: "TXSCLAPOW.timeSinceLastNota" }
      ]
    };
  },
  computed: {
    notaries: function() {
      console.log(`${JSON.stringify(this.$store.getters["getNotaryData"])}`);
      return this.$store.getters["getNotaryData"];
    }
  }
};
</script>