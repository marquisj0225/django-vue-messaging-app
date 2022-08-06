<template>
  <v-app id="inspire">
    <!-- Nav item -->
    <NavDrawer :show="drawer" />
    <!-- Nav item -->

    <AppBar @showdrawer="showdrawer" />

    <v-main>
      <DataTable :elements="items" />
    </v-main>
  </v-app>
</template>
<script>
import ComposeForm from "@/components/composeForm.vue";
import AppBar from "@/components/appBar.vue";
import NavDrawer from "@/components/navDrawer.vue";
import DataTable from "@/components/dataTable.vue";
export default {
  name: "TrashPage",
  data: () => ({
    drawer: false,
    items: [
      {
        name: "Frozen Yogurt",
        title: "Frozen Yogurt title",
        from: "Frozen Yogurt from",
        to: "Frozen Yogurt to",
      },
      {
        name: "Frozen Yogurt",
        title: "Frozen Yogurt title",
        from: "Frozen Yogurt from",
        to: "Frozen Yogurt to",
      },
      {
        name: "Frozen Yogurt",
        title: "Frozen Yogurt title",
        from: "Frozen Yogurt from",
        to: "Frozen Yogurt to",
      },
      {
        name: "Frozen Yogurt",
        title: "Frozen Yogurt title",
        from: "Frozen Yogurt from",
        to: "Frozen Yogurt to",
      },
      {
        name: "Frozen Yogurt",
        title: "Frozen Yogurt title",
        from: "Frozen Yogurt from",
        to: "Frozen Yogurt to",
      },
      {
        name: "Frozen Yogurt",
        title: "Frozen Yogurt title",
        from: "Frozen Yogurt from",
        to: "Frozen Yogurt to",
      },
      {
        name: "Frozen Yogurt",
        title: "Frozen Yogurt title",
        from: "Frozen Yogurt from",
        to: "Frozen Yogurt to",
      },
      {
        name: "Frozen Yogurt",
        title: "Frozen Yogurt title",
        from: "Frozen Yogurt from",
        to: "Frozen Yogurt to",
      },
      {
        name: "Frozen Yogurt",
        title: "Frozen Yogurt title",
        from: "Frozen Yogurt from",
        to: "Frozen Yogurt to",
      },
      {
        name: "Frozen Yogurt",
        title: "Frozen Yogurt title",
        from: "Frozen Yogurt from",
        to: "Frozen Yogurt to",
      },
      {
        name: "Frozen Yogurt",
        title: "Frozen Yogurt title",
        from: "Frozen Yogurt from",
        to: "Frozen Yogurt to",
      },
      {
        name: "Frozen Yogurt",
        title: "Frozen Yogurt title",
        from: "Frozen Yogurt from",
        to: "Frozen Yogurt to",
      },
      {
        name: "Frozen Yogurt",
        title: "Frozen Yogurt title",
        from: "Frozen Yogurt from",
        to: "Frozen Yogurt to",
      },
      {
        name: "Frozen Yogurt",
        title: "Frozen Yogurt title",
        from: "Frozen Yogurt from",
        to: "Frozen Yogurt to",
      },
      {
        name: "Frozen Yogurt",
        title: "Frozen Yogurt title",
        from: "Frozen Yogurt from",
        to: "Frozen Yogurt to",
      },
      {
        name: "Frozen Yogurt",
        title: "Frozen Yogurt title",
        from: "Frozen Yogurt from",
        to: "Frozen Yogurt to",
      },
      {
        name: "Frozen Yogurt",
        title: "Frozen Yogurt title",
        from: "Frozen Yogurt from",
        to: "Frozen Yogurt to",
      },
      {
        name: "Frozen Yogurt",
        title: "Frozen Yogurt title",
        from: "Frozen Yogurt from",
        to: "Frozen Yogurt to",
      },
      {
        name: "Frozen Yogurt",
        title: "Frozen Yogurt title",
        from: "Frozen Yogurt from",
        to: "Frozen Yogurt to",
      },
      {
        name: "Frozen Yogurt",
        title: "Frozen Yogurt title",
        from: "Frozen Yogurt from",
        to: "Frozen Yogurt to",
      },
      {
        name: "Frozen Yogurt",
        title: "Frozen Yogurt title",
        from: "Frozen Yogurt from",
        to: "Frozen Yogurt to",
      },
      {
        name: "Frozen Yogurt",
        title: "Frozen Yogurt title",
        from: "Frozen Yogurt from",
        to: "Frozen Yogurt to",
      },
      {
        name: "Frozen Yogurt",
        title: "Frozen Yogurt title",
        from: "Frozen Yogurt from",
        to: "Frozen Yogurt to",
      },
    ],
  }),
  methods: {
    showdrawer() {
      this.drawer = !this.drawer;
    },
  },
  mounted() {
    this.showdrawer();
  },
  components: { ComposeForm, AppBar, NavDrawer, DataTable },
};
</script>

