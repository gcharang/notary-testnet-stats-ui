<template>
  <v-card>
    <v-card-title>All Time</v-card-title>
    <v-data-table
      :headers="headers"
      :items="notaries"
      :sort-by="['total']"
      :items-per-page="50"
      :sort-desc="[true]"
      multi-sort
      item-key="name"
      class="elevation-1"
    >
      <template v-slot:item.ricktime="{ item }">
        <a target="_blank" :href="item.ricklink">{{ item.ricktime }}</a>
      </template>
      <template v-slot:item.mortytime="{ item }">
        <a target="_blank" :href="item.mortylink">{{ item.mortytime }}</a>
      </template>
      <template v-slot:item.kmdtime="{ item }">
        <a target="_blank" :href="item.kmdlink">{{ item.kmdtime }}</a>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  props: {
    source: String,
  },
  async asyncData({ $axios }) {
    let notaries = await $axios.$get(
      "https://kmd-data.s3.us-east-2.amazonaws.com/notary-stats-2022/main.json"
    );
    notaries = notaries.map((notary) => {
      notary.total =
        notary.RICK.totalNotas +
        notary.MORTY.totalNotas +
        notary.KMD.totalNotas;
      notary.name = `${notary.name} (${notary.address})`;
      notary.ricktime = notary.RICK.timeSinceLastNota;
      notary.ricklink = `https://rick.explorer.dexstats.info/tx/${notary.RICK.lastNotaTxnId}`;
      notary.mortytime = notary.MORTY.timeSinceLastNota;
      notary.mortylink = `https://morty.explorer.dexstats.info/tx/${notary.MORTY.lastNotaTxnId}`;
      notary.kmdtime = notary.KMD.timeSinceLastNota;
      notary.kmdlink = `https://kmdexplorer.io/tx/${notary.KMD.lastNotaTxnId}`;
      return notary;
    });
    return { notaries };
  },
  data() {
    return {
      slots: ["item.<name>"],
      notaries: {},
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name",
        },
        // { text: "Address", sortable: false, value: "address" },
        { text: "Total", value: "total" },
        { text: "RICK.total", value: "RICK.totalNotas" },
        { text: "RICK.lastnota", value: "ricktime" },
        { text: "MORTY.total", value: "MORTY.totalNotas" },
        { text: "MORTY.lastNota", value: "mortytime" },
        //{ text: "(KMD->LTC).total", value: "KMD.totalNotas" },
        //{ text: "(KMD->LTC).lastNota", value: "kmdtime" },
      ],
    };
  },
  created() {
    this.$vuetify.theme.dark = true;
    this.pollData();
  },
  methods: {
    async pollData() {
      while (true) {
        // console.log("inside poll data");
        const notaries = await this.$axios.$get(
          "https://kmd-data.s3.us-east-2.amazonaws.com/notary-stats-2022/main.json"
        );
        this.notaries = notaries.map((notary) => {
          notary.total =
            notary.RICK.totalNotas +
            notary.MORTY.totalNotas +
            notary.KMD.totalNotas;
          notary.name = `${notary.name} (${notary.address})`;
          notary.ricktime = notary.RICK.timeSinceLastNota;
          notary.ricklink = `https://rick.explorer.dexstats.info/tx/${notary.RICK.lastNotaTxnId}`;
          notary.mortytime = notary.MORTY.timeSinceLastNota;
          notary.mortylink = `https://morty.explorer.dexstats.info/tx/${notary.MORTY.lastNotaTxnId}`;
          notary.kmdtime = notary.KMD.timeSinceLastNota;
          notary.kmdlink = `https://kmdexplorer.io/tx/${notary.KMD.lastNotaTxnId}`;
          return notary;
        });
        await this.delay(30000);
      }
    },
    async delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
  },
};
</script>
