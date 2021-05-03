<template>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6 lg 4>
            <v-card dark outlined class="elevation-12">
           
              <v-card-title class="title font-weight-regular justify-space-between  white--text primary darken-2">Vitame</v-card-title>
              <v-card-text>
                <p class="text-center">
                    Pro vstup do aplikace musíte nejprve</p>
                <p class="text-center">
                  <v-btn :to="'/singin'" class="mb-3" large color="primary"> Se  Přihlásit  </v-btn>
                  <br> nebo <br>
                  <v-btn :to="'/singup'" class="mt-3" large color="error"> Se Registrovat</v-btn>
                </p>
              </v-card-text>

            </v-card>
          </v-flex>
        </v-layout>
</template>


<script>

export default {
  name: 'Home'
}
</script>




<style scoped>
p { font-family: 'Brush Script MT', cursive;
  font-size:150%;
  margin-top: 30px;
  color: aqua;
}
</style>
