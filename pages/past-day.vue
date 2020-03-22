
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
  props: {
    source: String
  },
  data() {
    return {
      notaries: {},
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name"
        },
        // { text: "Address", sortable: false, value: "address" },
        { text: "Total", value: "total" },
        { text: "RICK.total", value: "RICK.pastCounts.last24" },
        { text: "RICK.lastnota", value: "RICK.timeSinceLastNota" },
        { text: "MORTY.total", value: "MORTY.pastCounts.last24" },
        { text: "MORTY.lastNota", value: "MORTY.timeSinceLastNota" },
        { text: "TXSCLAPOW.total", value: "TXSCLAPOW.pastCounts.last24" },
        { text: "TXSCLAPOW.lastNota", value: "TXSCLAPOW.timeSinceLastNota" }
      ]
    };
  },
  created() {
    this.$vuetify.theme.dark = true;
    this.pollData();
  },
  async asyncData({ $axios }) {
    let notaries = await $axios.$get(
      "https://kmd-data.s3.us-east-2.amazonaws.com/notary-stats-2020/main.json"
    );
    notaries = notaries.map(notary => {
      notary["total"] =
        notary.RICK.pastCounts.last24 +
        notary.MORTY.pastCounts.last24 +
        notary.TXSCLAPOW.pastCounts.last24;
      notary["name"] = `${notary["name"]} (${notary["address"]})`;
      return notary;
    });
    return { notaries: notaries };
  },
  methods: {
    pollData: async function() {
      while (true) {
        //console.log("inside poll data");
        let notaries = await this.$axios.$get(
          "https://kmd-data.s3.us-east-2.amazonaws.com/notary-stats-2020/main.json"
        );
        this.notaries = notaries.map(notary => {
          notary["total"] =
            notary.RICK.pastCounts.last24 +
            notary.MORTY.pastCounts.last24 +
            notary.TXSCLAPOW.pastCounts.last24;
          notary["name"] = `${notary["name"]} (${notary["address"]})`;
          return notary;
        });
        await this.delay(30000);
      }
    },
    delay: async function(ms) {
      return await new Promise(resolve => setTimeout(resolve, ms));
    }
  },
  watch: {
    notaries: function(newValue) {
      this.$store.commit("setNotaryData", newValue);
    }
  }
};
</script>