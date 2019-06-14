<template>
  <div>
    <v-toolbar color="white">
      <v-toolbar-title>LIVROS</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-data-table :headers="headers" :items="books" :rows-per-page-items="[5]" class="elevation-2">
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.tittle }}</td>
        <td class="text-xs-left">{{ props.item.author }}</td>
        <td class="text-xs-left">{{ props.item.pageNumber }}</td>
        <td class="text-xs-left">{{ props.item.publisher }}</td>
        <td class="justify-center layout">
          <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          <v-icon small @click="deleteItem(props.item)">delete</v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <h3>Nenhum livro cadastrado</h3>
      </template>
    </v-data-table>
    <template>
      <div class="text-xs-center">
        <v-dialog v-model="dialog" max-width="1200px">
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-form v-model="valid">
                  <v-layout wrap>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedBook.tittle" label="Título"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedBook.pageNumber" label="Número de páginas"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedBook.id_Author" label="Id do autor"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedBook.author" label="Nome do autor"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedBook.id_Publisher" label="Id editora"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedBook.publisher" label="Nome da editora"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-container>
            </v-card-text>
            {{editedBook}}
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="close">CANCELAR</v-btn>
              <v-btn color="blue darken-1" flat @click="save">SALVAR</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        {{editedBook}}
        <template>
          <v-btn
            absolute
            dark
            fab
            bottom
            right
            color="pink"
            style="z-index: 4; margin-bottom: 70px;"
            @click.stop="dialog = true"
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
    valid: false,
    headers: [
      { text: "Título", value: "Título" },
      { text: "Autor", value: "Nome do autor" },
      { text: "Número de páginas", value: "Número de páginas" },
      { text: "Editora", value: "Editora" },
      { text: "", value: null }
    ],
    desserts: [],
    editedIndex: -1,
    books: [],
    editedBook: {},
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
    this.getBooks();
    this.getPublishers();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Cadastrar livro" : "Editar livro";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.dados = [];
    },

    getBooks() {
      axios
        .get("https://testcloudmed.cloudmed.io/api/book")
        .then(res => {
          console.log(res);
          this.books = res.data.books;
          this.loading = false;
        })
        .catch(err => {
          console.error(err);
        });
    },

    getPublishers() {
      axios
        .get("https://testcloudmed.cloudmed.io/api/publisher")
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.error(err);
        });
    },

    postBook() {
      axios
        .post("https://testcloudmed.cloudmed.io/api/book", {
          tittle: this.editedBook.tittle,
          id_Author: this.editedBook.id_Author,
          id_Publisher: this.editedBook.id_Publisher,
          pageNumber: this.editedBook.pageNumber
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.error(err);
        });
    },

    editItem(item) {
      console.log("item", item);
      this.editedIndex = this.books.indexOf(item);
      this.books.slice(this.editedIndex, 1);
      this.editedBook = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.books.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        // this.books = Object.assign({}, this.defaultItem);
        // this.books.push(this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        console.log("if");
        Object.assign(this.books[this.editedIndex], this.editedBook);
        this.editedBook = {};
      } else {
        console.log("else");
        this.postBook();
        this.getBooks();
        this.editedBook = {};
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