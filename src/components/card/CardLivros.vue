<template>
  <v-container v-if="loading">
    <div class="text-xs-center">
      <v-progress-circular indeterminate :size="130" :width="8" color="green"></v-progress-circular>
    </div>
  </v-container>
  <v-container v-else grid-list-xl text-xs-center>
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
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >Livro: {{this.bookDetails.tittle}}</v-card-title>

        <v-card-text>
          <div class="headline mb-3">
            <div>Titulo: {{ this.bookDetails.tittle }}</div>
            <div>Numero de páginas: {{ this.bookDetails.pageNumber }}</div>
            <div>Autor: {{ this.bookDetails.author }}</div>
            <div>Editor: {{ this.bookDetails.publisher }}</div>
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="dialog = false">FECHAR</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-divider></v-divider>
    <h1>LIVROS</h1>
    <v-divider></v-divider>
    <v-layout wrap>
      <v-flex xs3 v-for="(item, index) in books" :key="index" mb-3>
        <v-card>
          <v-card-title primary-title>
            <div>Titulo: {{ item.tittle }}</div>
            <div>Numero de páginas: {{ item.pageNumber }}</div>
          </v-card-title>
          <v-card-actions class="justify-center">
            <v-btn flat color="green" @click="getDetailsBook(item)">VISUALIZAR</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      books: [],
      bookDetails: {},
      loading: true,
      dialog: false,
      snackbar: false,
      y: "bottom",
      x: "left",
      mode: "",
      timeout: 7000,
      textMessageSnack: ""
    };
  },

  mounted() {
    this.getBooks();
  },

  methods: {
    getBooks() {
      axios
        .get("https://testcloudmed.cloudmed.io/api/book")
        .then(res => {
          this.books = res.data.books;
          this.loading = false;
        })
        .catch(() => {
          this.snackbar = true;
          this.textMessageSnack =
            "Não foi possível listar os livros no momento, por favor tente novamente mais tarde!";
        });
    },

    getDetailsBook(item) {
      this.bookDetails = Object.assign({}, item);
      this.dialog = true;
    }
  }
};
</script>
<style lang="stylus" scoped>
html, body {
  margin-top: 50px;
  overflow: auto;
}

.v-progress-circular {
  margin: 1rem;
}
</style>