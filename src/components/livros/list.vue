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
          <v-icon small class="mr-2" @click="dialogEditBook(props.item)">edit</v-icon>
          <v-icon small @click="dialogDeleteBook(props.item)">delete</v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <h3>Nenhum livro cadastrado</h3>
      </template>
    </v-data-table>
    <template>
      <v-card>
        <v-snackbar
          v-model="snackbar"
          :bottom="y === 'bottom'"
          :left="x === 'left'"
          :multi-line="mode === 'multi-line'"
          :timeout="timeout"
          :vertical="mode === 'vertical'"
        >
          {{ textMessageSnack }}
          <v-btn color="pink" flat @click="snackbar = false">FECHAR</v-btn>
        </v-snackbar>
      </v-card>
    </template>
    <template>
      <div class="text-xs-center">
        <!-- Modal cadastro/edição -->
        <v-dialog v-model="dialog" max-width="900px">
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-form>
                  <v-layout wrap>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedBook.tittle" label="Título"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedBook.pageNumber" label="Número de páginas"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-select
                        :items="idsAuthors"
                        :no-data-text="'Nenhum id author encontrado'"
                        label="Id autor"
                        v-model="editedBook.id_Author"
                      ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedBook.author" label="Nome do autor"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-select
                        :items="idsPublishers"
                        :no-data-text="'Nenhum id editora encontrado'"
                        label="Id editora"
                        v-model="editedBook.id_Publisher"
                      ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedBook.publisher" label="Nome da editora"></v-text-field>
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
            >Deletar Livro: "{{this.editedBook.tittle}}"</v-card-title>

            <v-card-text>
              <h3>Livro: "{{this.editedBook.tittle}}" será deletada, clique no botão "confirmar" para continuar</h3>
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
      { text: "Título", value: "Título" },
      { text: "Autor", value: "Nome do autor" },
      { text: "Número de páginas", value: "Número de páginas" },
      { text: "Editora", value: "Editora" },
      { text: "", value: null }
    ],
    idsAuthors: [],
    idsPublishers: [],
    books: [],
    editedBook: {},
    snackbar: false,
    y: "bottom",
    x: "left",
    mode: "",
    timeout: 7000,
    textMessageSnack: ""
  }),
  mounted() {
    this.getBooks();
  },
  computed: {
    formTitle() {
      return this.editedBook.id ? "Editar Livro" : "Cadastrar Livro";
    }
  },

  methods: {
    getBooks() {
      axios
        .get("https://testcloudmed.cloudmed.io/api/book")
        .then(res => {
          this.books = res.data.books;
          this.books.forEach(e => {
            this.idsAuthors.push(e.id_Author);
            this.idsPublishers.push(e.id_Publisher);
          });
        })
        .catch(() => {
          this.snackbar = true;
          this.textMessageSnack =
            "Não foi possível listar os livros no momento, por favor tente novamente mais tarde!";
        });
    },

    postBook() {
      axios
        .post("https://testcloudmed.cloudmed.io/api/book", {
          tittle: this.editedBook.tittle,
          pageNumber: this.editedBook.pageNumber,
          id_Author: this.editedBook.id_Author,
          id_Publisher: this.editedBook.id_Publisher
        })
        .then(() => {
          this.getBooks();
        })
        .catch(() => {
          this.snackbar = true;
          this.textMessageSnack =
            "Não foi possível cadastrar este livro no momento, por favor tente novamente mais tarde!";
        });
    },

    putBook() {
      axios
        .put("https://testcloudmed.cloudmed.io/api/book", {
          id: this.editedBook.id,
          tittle: this.editedBook.tittle
        })
        .then(() => {
          this.getBooks();
        })
        .catch(() => {
          this.snackbar = true;
          this.textMessageSnack =
            "Não foi possível editar este livro no momento, por favor tente novamente mais tarde!";
        });
    },

    deletePublisher() {
      axios
        .delete(
          "https://testcloudmed.cloudmed.io/api/book?id=" + this.editedBook.id
        )
        .then(() => {
          this.getBooks();
          this.dialogDelete = false;
        })
        .catch(() => {
          this.dialogDelete = false;
          this.snackbar = true;
          this.textMessageSnack =
            "Não foi possível editar este livro no momento, por favor tente novamente mais tarde!";
        });
    },

    dialogEditBook(item) {
      this.editedBook = Object.assign({}, item);
      this.dialog = true;
    },

    dialogDeleteBook(item) {
      this.editedBook = Object.assign({}, item);
      this.dialogDelete = true;
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedBook = {};
      }, 100);
    },

    save() {
      if (this.editedBook.id) {
        this.putBook();
        this.editedBook = {};
      } else {
        this.postBook();
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