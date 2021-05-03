<template>
	<v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex sx12  sm8 md6 lg4>
            <div>
              
              <v-card color="#fee" elevation="12" :loading="loading" loader-height="10">
                <v-card-title class="title font-weight-regular justify-space-between  white--text primary darken-2">Prihlaseni</v-card-title>

                <v-card-text>
                  <v-form>
                    <br> 
                    <v-alert  dismissible :value="!alertHide" type="error" >  {{this.alertMessage}}  </v-alert>
                    <br>
                    <v-text-field 
                        :rules="this.rules" :hint="this.txt.pozm.login" error-count="2"
                        :disabled="disabled"  v-model.trim="loginName" name="login" label="NickName" type="text" ></v-text-field>
                    <v-text-field 
                        :error="!$v.password.required"  :rules="this.rules"  :hint="this.txt.pozm.heslo"
                        :disabled="disabled"  v-model.trim="password" name="password" label="Heslo" type="password"></v-text-field>
                    <br>
                  </v-form>
                </v-card-text>
                
                <v-divider></v-divider>
                
                <v-card-actions >
                  <v-btn color="error" :disabled="disabled" @click="cancel"> Zrusit</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" 
                    :disabled="disabled || $v.$invalid" :loading="loading" @click="singIn">Prihlasit se </v-btn>
                </v-card-actions>
              </v-card>

            </div>
          </v-flex>
        </v-layout>
  </v-container>
</template>

<script>
import db from '../db.js'
import { required, minLength } from 'vuelidate/lib/validators'
import txt from '../plugins/MojePomucky.js'

export default {
  name: 'SignIn',
  data() {
      return {
        loginName: "",
        password: "",

        loading: false,
        disabled: false,
        alertMessage : '',
        alertHide:true,
        txt:txt,
        rules: [
          (value) =>  !!value || txt.valid.req,
          value => (value && value.length >= 3) || txt.valid.min,
        ],
      }
  },
  methods:{
    singIn : function(){ 
        this.loading =  this.disabled = this.alertHide  =  true
        db.prihlaseni(this.loginName.toLowerCase(), this.password).
            then( (message)=>{ 
                this.loading = this.disabled = this.alertHide  = false
                this.$root.$children[0].$refs.appHeader.$data.isAuth = this.loginName
                this.$router.push("/account")
            }).
            catch( (message)=>{ 
                this.loading = this.disabled = this.alertHide  = false
                this.alertMessage = message
                setTimeout(()=>{
                    this.alertHide = true
                }, 4500)
            })
    },
    cancel: function(){ 
        this.$router.push("/")
    },
  },
  validations: {
        loginName:{
            required,
            minLength: minLength(3)
        },
        password:{
            required,
            minLength: minLength(3)
        }
    },
}
</script>
