<template>
  <v-app id="inspire">
    <!-- Nav item -->
    <NavDrawer :show="drawer" />
    <!-- Nav item -->

    <AppBar @showdrawer="showdrawer" />
    <v-main v-if="chats">
      <DataTable :elements="chats" :loading="loading" />
    </v-main>
  </v-app>
</template>
<script>
import ComposeForm from "@/components/composeForm.vue";
import AppBar from "@/components/appBar.vue";
import NavDrawer from "@/components/navDrawer.vue";
import DataTable from "@/components/dataTable.vue";
import { mapState } from "vuex";

export default {
  middleware: ["auth"],

  data: () => ({
    drawer: false,
    loading: false,
  }),
  methods: {
    showdrawer() {
      this.drawer = !this.drawer;
    },
  },
  mounted() {
    this.showdrawer();
  },
  computed: {
    ...mapState({
      chats: (state) => state.chat.chats,
    }),
  },
  async fetch() {
    this.loading = true;
    await this.$store.dispatch("chat/fetchChats");
    this.loading = false;
  },
  components: { ComposeForm, AppBar, NavDrawer, DataTable },
};
</script>

