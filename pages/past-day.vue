
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
    >
      <template v-slot:item.ricktime="{ item }">
        <a target="_blank" :href="item.ricklink">{{item.ricktime}}</a>
      </template>
      <template v-slot:item.mortytime="{ item }">
        <a target="_blank" :href="item.mortylink">{{item.mortytime}}</a>
      </template>
      <template v-slot:item.txsclapowtime="{ item }">
        <a target="_blank" :href="item.txsclapowlink">{{item.txsclapowtime}}</a>
      </template>
    </v-data-table>
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
        { text: "RICK.lastnota", value: "ricktime" },
        { text: "MORTY.total", value: "MORTY.pastCounts.last24" },
        { text: "MORTY.lastNota", value: "mortytime" },
        { text: "TXSCLAPOW.total", value: "TXSCLAPOW.pastCounts.last24" },
        { text: "TXSCLAPOW.lastNota", value: "txsclapowtime" }
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
      notary["ricktime"] = notary.RICK.timeSinceLastNota;
      notary[
        "ricklink"
      ] = `https://rick.kmd.dev/tx/${notary.RICK.lastNotaTxnId}`;
      notary["mortytime"] = notary.MORTY.timeSinceLastNota;
      notary[
        "mortylink"
      ] = `https://morty.kmd.dev/tx/${notary.MORTY.lastNotaTxnId}`;
      notary["txsclapowtime"] = notary.TXSCLAPOW.timeSinceLastNota;
      notary[
        "txsclapowlink"
      ] = `http://159.69.10.44:54838/tx/${notary.TXSCLAPOW.lastNotaTxnId}`;
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
          notary["ricktime"] = notary.RICK.timeSinceLastNota;
          notary[
            "ricklink"
          ] = `https://rick.kmd.dev/tx/${notary.RICK.lastNotaTxnId}`;
          notary["mortytime"] = notary.MORTY.timeSinceLastNota;
          notary[
            "mortylink"
          ] = `https://morty.kmd.dev/tx/${notary.MORTY.lastNotaTxnId}`;
          notary["txsclapowtime"] = notary.TXSCLAPOW.timeSinceLastNota;
          notary[
            "txsclapowlink"
          ] = `http://159.69.10.44:54838/tx/${notary.TXSCLAPOW.lastNotaTxnId}`;
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