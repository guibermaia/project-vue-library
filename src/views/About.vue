<template>
  <v-layout>
    <v-flex >
      <v-card>
        <img src="../assets/logo.png" alt>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">VUE.JS</h3>
            <div><h4>{{ card_text }}</h4></div>
            <div><p>{{ textSecundary }}</p></div>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>


<script>
export default {
  data() {
    return {
      card_text:
        "Projeto feito com vue.js",
      textSecundary: "Foi utilizado um material component vuetify para vue.js, para as requisições foi utilizado o axios, e utilizando o vuex para gerenciar o estado dos componentes e biblioteca para aplicativos vue.js",
      dialog: false
    };
  }
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
}
</style>