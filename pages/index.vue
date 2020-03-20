<template>
  <article>
    <section>
      <h1>Notary Stats 2020</h1>
      <div>
        <li v-for="notary in notaries" class="item">{{ notary.name }}</li>
      </div>
    </section>
  </article>
</template>

<script>
export default {
  data() {
    return { notaries: {} };
  },
  async asyncData({ $axios }) {
    const notaries = await $axios.$get(
      "https://kmd-data.s3.us-east-2.amazonaws.com/notary-stats-2020/main.json"
    );
    return { notaries: notaries };
  }
};
</script>

<style>
</style> 