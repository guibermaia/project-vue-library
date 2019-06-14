<template>
  <v-container v-if="loading">
    <div class="text-xs-center">
      <v-progress-circular indeterminate :size="130" :width="8" color="green"></v-progress-circular>
    </div>
  </v-container>
  <v-container v-else grid-list-xl>
    <v-divider></v-divider>
    <h1>LIVROS</h1>
    <v-divider></v-divider>
    <v-layout wrap>
      <v-flex xs5 v-for="(item, index) in books" :key="index" mb-2>
        <v-card>
          <v-card-title primary-title>
            <div>id: {{ item.id }}</div>
            <div>Titulo: {{ item.tittle }}</div>
            <div>Numero de páginas: {{ item.pageNumber }}</div>
          </v-card-title>
          <v-card-actions class="justify-center">
            <v-btn flat color="green">VISUALIZAR LIVRO</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
    <h1>EDITORAS</h1>
    <v-divider></v-divider>
    <v-layout wrap>
      <v-flex xs5 v-for="(item, index) in publishers" :key="index" mb-2>
        <v-card>
          <v-card-title primary-title>
            <div>id: {{ item.id }}</div>
            <div>Titulo: {{ item.tittle }}</div>
            <div>Numero de páginas: {{ item.pageNumber }}</div>
          </v-card-title>
          <v-card-actions class="justify-center">
            <v-btn flat color="green">VISUALIZAR EDITORA</v-btn>
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
      loading: true
    };
  },
  methods: {
    getBooks() {
      axios
        .get("https://testcloudmed.cloudmed.io/api/book?page=1")
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
        .get("https://testcloudmed.cloudmed.io/api/publisher?page=1")
        .then(res => {
          console.log(res);
          this.publishers = res.data.publishers;
          this.loading = false;
        })
        .catch(err => {
          console.error(err);
        });
    },
  },
  mounted() {
    this.getBooks();
    this.getPublishers();
  }
};
</script>
<style lang="stylus" scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>