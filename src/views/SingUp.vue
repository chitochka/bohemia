<template>
  <v-layout align-center justify-center>
    <v-flex sx12 sm8 md6 lg4>

    <!-- CARD -->
    
        <v-card color="#fee"  elevation="12" :loading="loading" loader-height="10" class="mx-auto" max-width="1800">

          <!-- HLAVICKA -->
          <v-card-title class="title font-weight-regular justify-space-between   white--text primary darken-2">
              <span>{{ windowTitle }}</span>
              <v-avatar  color="blue "  class="white--text"  size="34"  v-text="step" ></v-avatar>
          </v-card-title>

           <!-- OKNO  1  -->
          <v-window v-model="step">
              <v-window-item :value="1">
                  <v-card-text>
                      <br>
                      <v-alert  dismissible :value="!alertHide" type="error" >  {{this.alertMessage}}  </v-alert>
                      <br>
                      <v-text-field 
                            :error="$v.userData.loginName.$invalid"  :rules="this.rules" :hint="this.txt.pozm.login"
                            v-model.trim="userData.loginName" name="login" label="NickName*"  type="text"  required ></v-text-field>
                      <v-text-field 
                            :error="$v.userData.email.$invalid"  :hint="this.txt.pozm.email"
                            :rules="[ 
                                (value)=> $v.userData.email.email || this.txt.valid.email ,
                                ...this.rules
                            ]"
                            v-model.trim="userData.email"     name="email" label="E-mail*" type="email" required></v-text-field>
                      <br>
                      <div class="text-right caption grey--text text--darken-1 font-italic"> {{txt.pozm.loginEmail}} </div>
                  </v-card-text>
              </v-window-item>

              <!-- OKNO  2  -->
              <v-window-item :value="2">
                  <v-card-text>
                      <v-text-field 
                            :rules="this.rules"
                            :error="$v.userData.password.$invalid"   :hint="this.txt.pozm.heslo"
                            v-model.trim="userData.password"   type="password" required label="Heslo*" ></v-text-field>
                      <v-text-field 
                            :error="$v.repeatPassword.$invalid"  :hint="this.txt.pozm.hesloZnovu" 
                            :rules="[ 
                                ...this.rules,
                                (value)=> $v.repeatPassword.jeStejne || this.txt.valid.hesla 
                            ]"
                            v-model.trim="repeatPassword"  type="password" required label="Opakujte heslo*" ></v-text-field>
                       <div class="text-right caption grey--text text--darken-1 font-italic"> {{txt.pozm.twicePass}} </div>
                  </v-card-text>
              </v-window-item>

              <!-- OKNO  3  -->
              <v-window-item :value="3">
                  <v-card-text>
                      <v-container>
                          <v-row>
                              <v-col cols="12" sm="6" md="4"></v-col>

                              <v-col cols="12" sm="6" md="8">
                                  <v-text-field v-model.trim="userData.jmeno"    label="Jmeno*"  hint="Zadejte sve jmeno" required></v-text-field>
                                  <v-text-field v-model.trim="userData.primeni"  label="Primeni" hint="Zadejte sve primeni" ></v-text-field>
                              </v-col>

                              <v-col cols="12" sm="12" md="12">
                                  <v-text-field v-model.trim="userData.address" name="address" label="Address" type="text"></v-text-field>
                              </v-col>
                          </v-row>
                      </v-container>
                  </v-card-text>
              </v-window-item>
          </v-window>

        <v-divider></v-divider>

        <v-card-actions>
            <v-btn color="error" :disabled="disabled" @click="cancel"> Zrusit </v-btn>
            <v-spacer></v-spacer>
            <v-btn :disabled="step === 1"  @click="step--"> Zpet </v-btn>
            <v-btn  :large="step === 3" :disabled="disabled || valid"  color="primary"  depressed  @click="saveData"  >
                  {{ (this.step === 3)? "Dokoncit" : "Dale" }}
            </v-btn>
        </v-card-actions>

      </v-card>

    <!--/ CARD -->
    </v-flex>
  </v-layout>
</template>


<script>
import db from '../db.js'
import { required, minLength ,email} from 'vuelidate/lib/validators'
import txt from '../plugins/MojePomucky.js'

export default {
    name: 'SignUp',
    data() {
        return {
            step:1,
            loading: false,
            disabled: false,
            alertHide: true,
            alertMessage:'',
            repeatPassword:null,
            txt:txt,
            rules: [
                (value) =>  !!value || txt.valid.req,
                value => (value && value.length >= 3) || txt.valid.min,
            ],

            userData : {
                loginName: "",
                email: '',
                password: null,
                jmeno: '',
                primeni: "",
                avatar: '', //TODO AVATAR
                address: ''
            }
        }
    },

    computed: {
        windowTitle() {
            switch (this.step) {
                case 1:
                    return "Registrovat se";
                case 2:
                    return "Zadejte heslo";
                default:
                    return "Osobni udaje";
            }
        },
        valid() {
            switch (this.step) {
                case 1:
                    return (this.$v.userData.loginName.$invalid) || (this.$v.userData.email.$invalid )
                case 2:
                    return (this.$v.userData.password.$invalid) || (this.$v.repeatPassword.$invalid )
            }   
        }
    },
    validations: {
        repeatPassword: {
            required,
            minLength: minLength(3),
            jeStejne : function(value){
                return value===this.userData.password
            }
        },
        userData : {
            password: {
                required,
                minLength: minLength(3),
            },
            loginName:{
                required,
                minLength:minLength(3)
            },
            email:{
                required,
                minLength:minLength(3),
                email
                
            }
        },
        validationGroup: []
    },
    methods : {
        stepOne(){
            this.loading =
            this.disabled = 
            this.alertHide  =  true

            this.userData.loginName = this.userData.loginName
            this.userData.email = this.userData.email
            
            db.registrace(this.userData).
                then( (message)=>{ 
                    this.loading = this.disabled =  false
                    this.step++
      
                }).
                catch( (message)=>{ 
                    this.loading = this.disabled = this.alertHide  = false
                    this.alertMessage = message
                    setTimeout(()=>{
                        this.alertHide = true
                    }, 4500)
                })
        },

        stepTwo(){
            this.step++
        },

        stepThree(){
            var users = JSON.parse(localStorage.users)

            users[this.userData.loginName] = this.userData
			localStorage.users = JSON.stringify(users);

            localStorage.isAuth  = this.userData.loginName
            this.$root.$children[0].$refs.appHeader.$data.isAuth = this.userData.loginName
            this.$router.push("/account")
        },

        saveData(){
            switch (this.step) {
                case 1: this.stepOne(); break;
                case 2: this.stepTwo(); break;
                case 3: this.stepThree() ; break;
            }      
        },
        cancel: function(){ 
            this.$router.push("/")
        },
    }
};
</script>