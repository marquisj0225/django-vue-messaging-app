<template>
  <v-app id="inspire">
    <!-- Nav item -->
    <NavDrawer :show="drawer" />
    <!-- Nav item -->

    <AppBar @showdrawer="showdrawer" />

    <v-main>
      <ComposeForm @sendMessage="sendMessage" />
    </v-main>
  </v-app>
</template>
<script>
import ComposeForm from "@/components/composeForm.vue";
import AppBar from "@/components/appBar.vue";
import NavDrawer from "@/components/navDrawer.vue";
export default {
  name: "ComposePage",
  data: () => ({
    drawer: null,
    message: {},
  }),
  methods: {
    showdrawer() {
      this.drawer = !this.drawer;
    },
    sendMessage(get_child_data) {
      this.message = get_child_data;
    },
  },
  mounted() {
    this.showdrawer();
  },
  components: { ComposeForm, AppBar, NavDrawer },
};
</script>

