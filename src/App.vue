<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list dense>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              <router-link to="/">Home</router-link>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>note_add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              <router-link to="/livro">Adicionar livro</router-link>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-footer color="indigo" app>
        <v-spacer></v-spacer>
        <span class="white--text">&copy; By Guilherme Bertoldi 2019</span>
        <v-spacer></v-spacer>
      </v-footer>
    </v-navigation-drawer>
    <v-container fluid fill-height>
      <v-layout justify-center align-center>
        <v-flex text-xs-center>
          <v-flex xs12 sm6 offset-sm3>
            <router-view/>
          </v-flex>
        </v-flex>
      </v-layout>
    </v-container>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Biblioteca</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/about" color="pink">SOBRE O PROJETO</v-btn>
    </v-toolbar>
    <v-content></v-content>
    <v-footer color="indigo" app>
      <v-spacer></v-spacer>
      <span class="white--text">&copy; By Guilherme Bertoldi 2019</span>
      <v-spacer></v-spacer>
    </v-footer>
  </v-app>
</template>

<script>
import CardLivros from "./components/CardLivros";

export default {
  name: "App",
  components: {
    CardLivros
  },
  data: () => ({
    drawer: null
  }),
  props: {
    source: String
  }
};
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>