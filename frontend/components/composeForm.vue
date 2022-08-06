<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="12">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
            placeholder="E-mail"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="12">
          <v-text-field
            v-model="title"
            :counter="10"
            :rules="titleRules"
            label="Title"
            required
            placeholder="Title"
            outlined
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="12">
          <v-textarea
            v-model="text"
            :rules="textRules"
            outlined
            name="input-7-4"
            label="Outlined textarea"
          ></v-textarea>
        </v-col>

        <v-col>
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
          >
            Sent
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "ComposeForm",
  data: () => ({
    valid: true,
    title: "",
    titleRules: [
      (v) => !!v || "Title is required",
      (v) => (v && v.length >= 3) || "Title not must be more than 3 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    text: "",
    textRules: [
      (v) => !!v || "Text is required",
      (v) =>
        (v && v.length >= 10) || "Text not must be more than 10 characters",
    ],
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.$emit("sendMessage", {
          title: this.title,
          email: this.email,
          text: this.text,
        });
      }
      this.title = "";
      this.email = "";
      this.text = "";
      this.valid = true
    },
  },
};
</script>

<style>
</style>
