<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :loading="loading"
    class="elevation-0"
    hide-default-footer
    disable-pagination
  >
    <template #top>
      <v-toolbar>
        <!-- <v-toolbar-title>My CRUD</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer> -->
        <v-dialog v-model="dialog" max-width="500px">
          <!-- <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New Item
            </v-btn>
          </template> -->
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field
                      v-model="editedItem.id"
                      label="$"
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field
                      v-model="editedItem.title"
                      label="Title"
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field
                      v-model="editedItem.user"
                      label="From"
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field
                      v-model="editedItem.recipient"
                      label="To"
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                    <v-textarea
                      v-model="editedItem.body"
                      label="Body"
                      readonly
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-btn @click="showItem(item)" x-small color="success"> View </v-btn>
      <v-btn
        @click="table == 'trash' ? restoreTrash(item) : deleteItemConfirm(item)"
        x-small
        color="success"
      >
        {{ table == "trash" ? "Restore" : "Move To Trash" }}
      </v-btn>

      <v-btn
        @click="unsentItem(item)"
        v-if="user.email == item.user"
        x-small
        color="error"
      >
        UnSent
      </v-btn>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "DataTableComponent",
  props: {
    elements: Array,
    loading: Boolean(false),
    table: String("table"),
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "$",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "Title", value: "title" },
      { text: "From", value: "user" },
      { text: "To", value: "recipient" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    items: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      title: "",
      from: "",
      to: "",
    },
    defaultItem: {
      name: "",
      title: "",
      from: "",
      to: "",
    },
  }),
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
    formTitle() {
      return "Item Information";
    },
  },

  watch: {
    elements(val) {
      this.initialize();
    },
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.items = this.elements;
    },

    showItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItemConfirm(item) {
      await this.$axios
        .post(`api/chats/${item.id}/trash/`)
        .then((res) => {
          this.$toast.success("Successfully Moved To Trash");
          window.location.reload(true);
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error("Failed To Move In Trash");
        });
    },
    async restoreTrash(item) {
      await this.$axios
        .post(`api/chats/${item.id}/rmtrash/`)
        .then((res) => {
          this.$toast.success("Successfully Restored from Trash");
          window.location.reload(true);
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error("Failed To Restored from Trash");
        });
    },
    async unsentItem(item) {
      await this.$axios
        .delete(`api/chats/${item.id}/`)
        .then((res) => {
          this.$toast.success("Message Unsent Successfull");
          window.location.reload(true);
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error("Message Unsent Failed");
        });
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem);
      } else {
        this.items.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style>
</style>
