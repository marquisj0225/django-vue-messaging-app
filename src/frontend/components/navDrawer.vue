<template>
  <v-navigation-drawer app v-model="show">
    <v-sheet class="pa-4">
      <v-avatar class="mx-4" color="grey " size="64">
        <img src="@/assets/avatar.png" alt="avatar" />
      </v-avatar>
      <div>{{ user.email || "user@user.com" }}</div>
    </v-sheet>

    <v-divider></v-divider>

    <v-list>
      <v-list-item v-for="nav in navItems" :key="nav.title" :to="nav.link" link>
        <v-list-item-icon>
          <v-icon>{{ nav.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ nav.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn block @click="logout()"> Logout </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "NavDrawerComponent",
  props: {
    show: Boolean,
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
  data: () => ({
    navItems: [
      { title: "Inbox", icon: "mdi-inbox-outline", link: "/" },
      { title: "Receive", icon: "mdi-account-arrow-left", link: "/receive" },
      { title: "Sent", icon: "mdi-account-arrow-right", link: "/sent" },
      { title: "Compose", icon: "mdi-pencil", link: "/compose" },
      { title: "Trash", icon: "mdi-delete", link: "/trash" },
    ],
  }),
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
