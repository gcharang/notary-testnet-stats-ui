<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped expand-on-hover>
      <v-list>
        <v-list-item v-for="item in navDrawerItems" :key="item.title" link nuxt>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Notary Testnet Stats 2020</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
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
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data() {
    return {
      notaries: {},
      navDrawerItems: [
        { title: "Total Stats", icon: "mdi-view-dashboard" },
        { title: "Past Day", icon: "mdi-numeric-1-box" },
        { title: "Past Three Days", icon: "mdi-numeric-3-box" },
        { title: "Past Week", icon: "mdi-numeric-7-box" }
      ],
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
      ],
      drawer: true
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
        notary.RICK.totalNotas +
        notary.MORTY.totalNotas +
        notary.TXSCLAPOW.totalNotas;
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
            notary.RICK.totalNotas +
            notary.MORTY.totalNotas +
            notary.TXSCLAPOW.totalNotas;
          notary["name"] = `${notary["name"]} (${notary["address"]})`;
          return notary;
        });
        await this.delay(30000);
      }
    },
    delay: async function(ms) {
      return await new Promise(resolve => setTimeout(resolve, ms));
    }
  }
};
</script>


