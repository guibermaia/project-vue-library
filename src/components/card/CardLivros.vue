<template>
  <v-container v-if="loading">
    <div class="text-xs-center">
      <v-progress-circular indeterminate :size="130" :width="8" color="indigo"></v-progress-circular>
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
        <v-card-title class="headline indigo lighten-1" primary-title>
          <v-icon left color="white">import_contacts</v-icon>
          <p style="color: white; margin: 0">Livro: {{this.bookDetails.tittle}}</p>
        </v-card-title>

        <v-card-text>
          <div class="mb-2">
            <div>Titulo: {{ this.bookDetails.tittle }}</div>
            <div>Numero de páginas: {{ this.bookDetails.pageNumber }}</div>
            <div>
              <p
                style="margin: 0;"
              >Autor: {{ this.bookDetails.author ? this.bookDetails.author.name : '---' }}</p>
            </div>
            <div>Editor: {{ this.bookDetails.publisher ? this.bookDetails.publisher.name : '---' }}</div>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="dialog = false">FECHAR</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div style="height: 30px;"></div>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <div style="width: 100%; text-align: center">
            <h2>LIVROS</h2>
          </div>
          <v-flex xs12>
            <v-text-field
              v-model="searchTittle"
              label="Pesquisar por título"
              clearable
              @click:clear="getBooks()"
              @keypress="searchBook()"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <v-layout wrap>
      <v-flex xs12 sm4 v-for="(item, index) in books" :key="index" min-width="100px;">
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="overflow-tittle">Título: {{ item.tittle }}</h3>
            </div>
          </v-card-title>
          <div>
            <p>Numero de páginas: {{ item.pageNumber }}</p>
          </div>
          <v-card-actions class="justify-center">
            <v-btn flat color="green" @click="getDetailsBook(item)">VISUALIZAR</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <template>
      <div>
        <h3
          v-if="this.books.length == 0"
        >Nenhum livro com o título: "{{this.searchTittle}}" foi encontrado</h3>
      </div>
    </template>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      books: [],
      bookDetails: {},
      name: "",
      loading: true,
      dialog: false,
      snackbar: false,
      y: "bottom",
      x: "left",
      mode: "",
      timeout: 7000,
      textMessageSnack: "",
      searchTittle: ""
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
          console.log(this.books);
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
      console.log("this.bookDetails", this.bookDetails);
      this.dialog = true;
    },
    searchBook() {
      if (this.searchTittle == "" || this.searchTittle == null) {
        console.log("zerou");
        this.getBooks();
      }
      console.log("titulo", this.searchTittle);
      axios
        .get(
          "https://testcloudmed.cloudmed.io/api/book?term=" + this.searchTittle
        )
        .then(res => {
          this.books = res.data.books;
          console.log(this.books);
          this.loading = false;
          if (this.searchTittle == null) {
            this.getBooks();
          }
        })
        .catch(() => {
          this.snackbar = true;
          this.textMessageSnack =
            "Não foi possível listar os livros no momento, por favor tente novamente mais tarde!";
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
html, body {
  margin-top: 50px;
  overflow: auto;
}

.overflow-tittle {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
  width: 100%;
}

.v-progress-circular {
  margin: 1rem;
}
</style>