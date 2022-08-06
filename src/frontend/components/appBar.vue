<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click="$emit('showdrawer')"></v-app-bar-nav-icon>

    <v-toolbar-title>Application</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn @click="logout()" icon>
      <v-icon>mdi-export</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$store.dispatch("auth/LOGOUT");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
</style>
