<template>
  <div >
    <v-toolbar color="primary" dark>
       <v-toolbar-title dark class="title"> <h3> -- Bohemia Interactive a.s. --  </h3> </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
          v-for="(item, i) in menuItems"
          :key="`menu${i}`"
          :to="item.route"
        >
          {{ item.title }}
        </v-btn>
        
        <v-btn v-if="this.isAuth" @click.prevent="singOut">
          Odhlasit se
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <!--  -->
  </div>
</template>

<script>


import db from '../db.js'


export default {
    name: 'AppHeader',
    data() {
        return {
            isAuth: false //localStorage.isAuth == "true"
        }
    },
     computed :{
        menuItems: function () {
              return (this.isAuth)? [
                  {
                      title:"Account management page",
                      route:"/account"
                  }
              ]:[
                  { 
                      title:"Přihlásit se",
                      route:"/singin"
                  },{
                      title:"Registrace",
                      route:"/singup"
                  }
            ]
        }
    },

    methods:{
        singOut(){
            localStorage.isAuth =  ''
            this.isAuth = false
            this.$router.push("/")
        }
    },
    created: function () {
        db.isAuth().
          then(  (userName) => {this.isAuth = userName}).
          catch( () => {this.isAuth = false}) 
    }
  }



</script>
