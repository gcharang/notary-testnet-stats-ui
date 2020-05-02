<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped expand-on-hover>
      <v-list>
        <v-list-item
          v-for="item in navDrawerItems"
          :key="item.title"
          :to="item.nuxtLink"
          nuxt
        >
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
        <nuxt />
      </v-container>
    </v-content>

    <v-footer app>
      <span>
        <v-icon>mdi-copyright</v-icon>
        {{ new Date().getFullYear() }} gcharang
      </span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      navDrawerItems: [
        { title: "Total Stats", icon: "mdi-view-dashboard", nuxtLink: "/" },
        { title: "Past Day", icon: "mdi-numeric-1-box", nuxtLink: "/past-day" },
        {
          title: "Past Three Days",
          icon: "mdi-numeric-3-box",
          nuxtLink: "/past-three-days",
        },
        {
          title: "Past Week",
          icon: "mdi-numeric-7-box",
          nuxtLink: "/past-week",
        },
      ],
      drawer: true,
    };
  },
  created() {
    this.$vuetify.theme.dark = true;
  },
};
</script>
