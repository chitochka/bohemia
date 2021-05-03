<template>
  <v-app>
    <app-header app ref="appHeader" ></app-header>
    <v-main class="secondary">
      <v-container  fluid fill-height>
        <router-view/>
      </v-container >
    </v-main> 
    <Footer app/>
  </v-app>
</template>




<script>
import AppHeader from './components/AppHeader';
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    AppHeader,
    Footer
  }
};
</script>
