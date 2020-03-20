
<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Total Stats</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-view-day</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Past Day</v-list-item-title>
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
        <v-data-table
          :headers="headers"
          :items="notaries"
          :sort-by="['total']"
          :sort-desc="[true]"
          multi-sort
          item-key="name"
          class="elevation-1"
        ></v-data-table>
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; gcharang 2020</span>
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
      drawer: null
    };
  },
  created() {
    this.$vuetify.theme.dark = true;
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
  }
};
</script>
//<li v-for="notary in notaries" class="item">{{ notary.name }}</li>

