<template>
  <div>
    <v-toolbar color="white">
      <v-toolbar-title>AUTORES</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="authors"
      :rows-per-page-items="[5]"
      class="elevation-2"
    >
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.book }}</td>
        <td class="justify-center layout">
          <v-icon small class="mr-2" @click="dialogEditAuthor(props.item)">edit</v-icon>
          <v-icon small @click="dialogDeleteAuthor(props.item)">delete</v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <h3>Nenhum autor cadastrado</h3>
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
                      <v-text-field v-model="editedAuthor.name" label="Título"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedAuthor.book" label="Livro"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="close">CANCELAR</v-btn>
              <v-btn color="blue darken-1" flat @click="save">SALVAR</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Modal delete -->
        <v-dialog v-model="dialogDelete" width="500">
          <v-card>
            <v-card-title
              class="headline grey lighten-2"
              primary-title
            >Deletar Autor: "{{this.editedAuthor.name}}"</v-card-title>

            <v-card-text>
              <h3>Autor: "{{this.editedAuthor.name}}" será deletado, clique no botão "confirmar" para continuar</h3>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat @click="dialogDelete = false">CANCELAR</v-btn>
              <v-btn color="primary" flat @click="deleteAuthor()">CONFIRMAR</v-btn>
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
    authors: [],
    editedAuthor: {}
  }),
  mounted() {
    this.getAuthors();
  },
  computed: {
    formTitle() {
      return this.editedAuthor.id ? "Editar Autor" : "Cadastrar Autor";
    }
  },

  methods: {
    getAuthors() {
      axios
        .get("https://testcloudmed.cloudmed.io/api/author")
        .then(res => {
          this.authors = res.data.authors;
          console.log("this.authors", this.authors);
        })
        .catch(err => {
          console.error(err);
        });
    },

    postAuthor() {
      axios
        .post("https://testcloudmed.cloudmed.io/api/author", {
          name: this.editedAuthor.name
        })
        .then(res => {
          this.getAuthors();
        })
        .catch(err => {
          console.error(err);
        });
    },

    putAuthor() {
      axios
        .put("https://testcloudmed.cloudmed.io/api/author", {
          id: this.editedAuthor.id,
          name: this.editedAuthor.name
        })
        .then(res => {
          this.getAuthors();
        })
        .catch(err => {
          console.error(err);
        });
    },

    deleteAuthor() {
      axios
        .delete(
          "https://testcloudmed.cloudmed.io/api/author?id=" +
            this.editedAuthor.id
        )
        .then(res => {
          console.log(
            "id da editora que vai ser deletado",
            this.editedAuthor.id
          );
          this.getAuthors();
        })
        .catch(err => {
          console.log(
            "id da editora que vai ser deletado",
            this.editedAuthor.id
          );
          console.error(err);
        });
    },

    dialogEditAuthor(item) {
      console.log("item", item);
      this.editedAuthor = Object.assign({}, item);
      this.dialog = true;
    },

    dialogDeleteAuthor(item) {
      this.editedAuthor = Object.assign({}, item);
      this.dialogDelete = true;
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedAuthor = {};
      }, 100);
    },

    save() {
      if (this.editedAuthor.id) {
        this.putAuthor();
        this.editedAuthor = {};
      } else {
        this.postAuthor();
        this.editedAuthor = {};
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