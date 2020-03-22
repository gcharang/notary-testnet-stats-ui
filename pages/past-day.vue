
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
  computed: {
    notaries: function() {
      return this.$store.getters.getNotaryData();
    }
  }
};
</script>