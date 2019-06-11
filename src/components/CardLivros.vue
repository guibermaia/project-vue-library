<template>
  <v-container v-if="loading">
    <div class="text-xs-center">
      <v-progress-circular indeterminate :size="130" :width="8" color="green"></v-progress-circular>
    </div>
  </v-container>
  <v-container v-else grid-list-xl>
    <v-layout wrap>
      <v-flex xs5 v-for="(item, index) in books" :key="index" mb-2>
        <v-card>
          <v-card-title primary-title>
            <div>id: {{ item.id }}</div>
            <div>Titulo: {{ item.tittle }}</div>
            <div>Numero de páginas: {{ item.pageNumber }}</div>
          </v-card-title>
          <v-card-actions class="justify-center">
            <v-btn flat color="green" @click="singleMovie(item.imdbID)">View</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout wrap>
      <v-flex xs5 v-for="(item, index) in publishers" :key="index" mb-2>
        <v-card>
          <v-card-title primary-title>
            <div>id: {{ item.id }}</div>
            <div>Titulo: {{ item.tittle }}</div>
            <div>Numero de páginas: {{ item.pageNumber }}</div>
          </v-card-title>
          <v-card-actions class="justify-center">
            <v-btn flat color="green" @click="singleMovie(item.imdbID)">View</v-btn>
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
  mounted() {
    axios
      .get("https://testcloudmed.cloudmed.io/api/book?page=1")
      .then(res => {
        console.log(res.data);
        this.books = res.data;
        this.loading = false;
      })
      .catch(err => {
        console.error(err);
      });
    axios
      .get("https://testcloudmed.cloudmed.io/api/publisher?page=1")
      .then(res => {
        console.log(res.data);
        this.publishers = res.data;
        this.loading = false;
      })
      .catch(err => {
        console.error(err);
      });
  }
};
</script>
<style lang="stylus" scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>