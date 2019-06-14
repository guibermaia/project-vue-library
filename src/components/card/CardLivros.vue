<template>
  <v-container v-if="loading">
    <div class="text-xs-center">
      <v-progress-circular indeterminate :size="130" :width="8" color="green"></v-progress-circular>
    </div>
  </v-container>
  <v-container v-else grid-list-xl text-xs-center>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Livro: {{}}</v-card-title>

        <v-card-text>
          <div>
            <!-- <div>Titulo: {{ item.tittle }}</div>
            <div>Numero de páginas: {{ item.pageNumber }}</div> -->
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="dialog = false">I accept</v-btn>
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
            <v-btn flat color="green">VISUALIZAR</v-btn>
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
      publishers: [],
      loading: true,
      dialog: false
    };
  },

  mounted() {
    this.getBooks();
    this.getPublishers();
  },

  methods: {
    getBooks() {
      axios
        .get("https://testcloudmed.cloudmed.io/api/book?page=1")
        .then(res => {
          this.books = res.data.books;
          this.loading = false;
        })
        .catch(err => {
          console.error(err);
        });
    },
    
    getPublishers() {
      axios
        .get("https://testcloudmed.cloudmed.io/api/publisher?page=1")
        .then(res => {
          this.publishers = res.data.publishers;
          this.loading = false;
        })
        .catch(err => {
          console.error(err);
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

.v-progress-circular {
  margin: 1rem;
}
</style>