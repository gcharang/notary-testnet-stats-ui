<template>
  <v-card>
    <v-card-title>All Time</v-card-title>
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
  computed: {
    notaries: function() {
      this.$store.getters["getNotaryData"];
    },
    headers: function() {
      this.$store.getters["getHeadersData"];
    }
  }
};
</script>


