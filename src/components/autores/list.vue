<template>
  <div>
    <v-toolbar color="white">
      <v-toolbar-title>EDITORAS</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="publishers"
      :rows-per-page-items="[5]"
      class="elevation-2"
    >
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.book }}</td>
        <td class="justify-center layout">
          <v-icon small class="mr-2" @click="dialogEditPublisher(props.item)">edit</v-icon>
          <v-icon small @click="dialogDeletePublisher(props.item)">delete</v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <h3>Nenhuma Editora cadastrada</h3>
      </template>
    </v-data-table>
    <template>
      <div class="text-xs-center">
        <!-- Modal cadastro/edição -->
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-form>
                  <v-layout wrap>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedPublisher.name" label="Título"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedPublisher.book" label="Livro"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-container>
            </v-card-text>
            {{editedPublisher}}
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="close">CANCELAR</v-btn>
              <v-btn color="blue darken-1" flat @click="save">SALVAR</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" width="500">
          <v-card>
            <v-card-title
              class="headline grey lighten-2"
              primary-title
            >Deletar Editora: "{{this.editedPublisher.name}}"</v-card-title>

            <v-card-text>
              <h3>Editora: "{{this.editedPublisher.name}}" será deletada, clique no botão "confirmar" para continuar</h3>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat @click="dialogDelete = false">CANCELAR</v-btn>
              <v-btn color="primary" flat @click="deletePublisher()">CONFIRMAR</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <template>
          <v-btn
            absolute
            dark
            fab
            bottom
            right
            color="pink"
            style="z-index: 4; margin-bottom: 70px;"
            @click="dialog = true"
          >
            <v-icon>add</v-icon>
          </v-btn>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Nome do Livro", value: "Nome do Livro" },
      { text: "Livros", value: "Livros" },
      { text: "", value: null }
    ],
    desserts: [],
    publishers: [],
    editedPublisher: {},
    defaultItem: {
      author: "",
      id: 0,
      id_Author: 0,
      id_Publisher: 0,
      pageNumber: 0,
      publisher: "",
      tittle: ""
    }
  }),
  mounted() {
    this.getPublishers();
  },
  computed: {
    formTitle() {
      return this.editedPublisher.id ? "Editar Editora" : "Cadastrar Editora";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    getPublishers() {
      axios
        .get("https://testcloudmed.cloudmed.io/api/publisher")
        .then(res => {
          console.log(res);
          this.publishers = res.data.publishers;
          console.log("this.publishers", this.publishers);
        })
        .catch(err => {
          console.error(err);
        });
    },

    postPublisher() {
      axios
        .post("https://testcloudmed.cloudmed.io/api/publisher", {
          name: this.editedPublisher.name
        })
        .then(res => {
          console.log(res);
          this.getPublishers();
        })
        .catch(err => {
          console.error(err);
        });
    },

    putPublisher() {
      axios
        .put("https://testcloudmed.cloudmed.io/api/publisher", {
          id: this.editedPublisher.id,
          name: this.editedPublisher.name
        })
        .then(res => {
          console.log(res);
          this.getPublishers();
        })
        .catch(err => {
          console.error(err);
        });
    },

    deletePublisher() {
      axios
        .delete(
          "https://testcloudmed.cloudmed.io/api/publisher?id=" +
            this.editedPublisher.id
        )
        .then(res => {
          console.log(res);
          console.log(
            "id da editora que vai ser deletado",
            this.editedPublisher.id
          );
          this.getPublishers();
        })
        .catch(err => {
          console.log(
            "id da editora que vai ser deletado",
            this.editedPublisher.id
          );
          console.error(err);
        });
    },

    dialogEditPublisher(item) {
      console.log("item", item);
      this.editedPublisher = Object.assign({}, item);
      this.dialog = true;
    },

    dialogDeletePublisher(item) {
      this.editedPublisher = Object.assign({}, item);
      this.dialogDelete = true;
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedPublisher = {};
      }, 100);
    },

    save() {
      // if se conter id ent é editar, se não é cadastro
      if (this.editedPublisher.id) {
        console.log("if");
        this.putPublisher();
        this.editedPublisher = {};
      } else {
        console.log("else");
        this.postPublisher();
        this.editedPublisher = {};
      }
      this.close();
    }
  }
};
</script>
<style lang="scss">
html,
body {
  overflow: hidden;
}
</style>