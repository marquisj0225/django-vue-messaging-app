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
import { mapState } from "vuex";

export default {
  name: "ComposePage",
  middleware: ["auth"],

  data: () => ({
    drawer: null,
    message: {},
    compose_data: {
      user: "",
      recipient: "",
      title: "",
      body: "",
    },
  }),
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
  methods: {
    showdrawer() {
      this.drawer = !this.drawer;
    },
    sendMessage(get_child_data) {
      this.compose_data = get_child_data;
      this.compose_data["user"] = this.user.email;
      console.log(this.compose_data);
      this.sendMessageAPI(this.compose_data);
    },
    async sendMessageAPI(data) {
      await this.$axios
        .post(`api/chats/`, data)
        .then((res) => {
          this.$toast.success("Message send");
          // window.location.reload(true);
        })
        .catch((error) => {
          if (error.response.status == 400) {
            this.$toast.error(error.response.data[0]);
          }
        });
    },
  },
  mounted() {
    this.showdrawer();
  },
  components: { ComposeForm, AppBar, NavDrawer },
};
</script>

