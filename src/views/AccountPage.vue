<template>
  <v-layout align-center justify-center>
    <v-flex  sx12 sm8 md6 lg4>
      <v-card dark  class=" pa-2"  outlined  tile>
        <v-simple-table >
          <template v-slot:default>
            <thead>
              <tr>  
                <th class="text-left blue--text">   Name </th>  
                <th class="text-left blue--text">    Hodnota  </th>
              </tr>
            </thead>
            <tbody>
              <tr   v-for="item in dataArray"   :key="item.key" >
                <td>{{ item.key }}</td>
                <td>{{ item.value }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>

      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import db from '../db.js'

export default {
  name: 'Home',
  data(){
    return {
      dataArray:[]
    }
  },
  components: {
  },
  methods:{
    getData(data){
      this.dataArray = []
      for (var item in data) {
          this.dataArray.push (
              { key:item,
                value:data[item]  
              }
          )
      }
    }
  },
  mounted(){
    db.getData().
      then(this.getData).catch(alert)
  }
}
</script>

<style scoped>
  td {color:lightblue}
  tbody {background-color: #303030 !important }
  thead { background: #222222 ;}
  thead th {font-size:120% !important;}
</style>
