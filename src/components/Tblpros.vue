<script setup>
  
  import {   ref , onMounted } from 'vue';
  import { collection, onSnapshot , addDoc , doc , deleteDoc, updateDoc} from "firebase/firestore";
  import {db} from '@/firebase';

  //se declaran constantes 
const clientesCollectionRef = collection(db , 'clientes')
const testname = ref( );
const testig        =  ref( );
const testpais      =  ref( );
const testprofesion =  ref( );
const testestadoactual =  ref( );
const testfechacitafirma = ref();

 
 


const clientes = ref([
   
])


const updclientes = ref([
   
])

 



   //CRUD AGREGAR CLIENTES
const addclientes = ref('')  

const guardarcliente = ()=>{
addDoc(collection(db,'clientes'),{
apellido:  '' ,
cuentaig: testig.value,
estadoactual:  testestadoactual.value  ,
fechacaptura:  '' ,
fechacitafirma:  testfechacitafirma.value  ,
msg:   '',
name: testname.value ,
oficio:  testprofesion.value ,
pais: testpais.value ,
prop1: '' ,
prop2:  '' ,
prop3: '' ,
propcom:  '' ,
prosideal: 'SI'

})

addclientes.value =''
}


const modalupdate  = cliente =>{
  
  let upd = []
 
  const cli = {
  updid : cliente.id,
  updname : cliente.name,
  updcuenta : cliente.cuentaig,
  udppais : cliente.pais,
  updoficio: cliente.oficio,
  updestado: cliente.estadoactual,
  updfecha: cliente.fechacitafirma
  }

  upd.push(cli)
 
  updclientes.value = upd
 
    const element = document.getElementById("modalupdate2");
    element.classList.add('is-active' );
 
}

//CRUD ACTUALIZAR CLIENTES
const updatecliente = updid =>{
 
const index = clientes.value.findIndex(cliente => cliente.id === updid)
clientes.value[index].name =!clientes.value[index].name

 updateDoc(doc(clientesCollectionRef, updid),{
  name: updclientes['value'][0].updname ,
  cuentaig: updclientes['value'][0].updcuenta ,
  oficio: updclientes['value'][0].updoficio ,
  pais: updclientes['value'][0].udppais,
  estadoactual: updclientes['value'][0].updestado,
  fechacitafirma: updclientes['value'][0].updfecha
 
})
  
const element = document.getElementById("modalupdate2");
    element.classList.remove('is-active');

    alert('se ha actualizado')
}
  
const borrarcliente = id =>{
deleteDoc(doc( clientesCollectionRef, id )) 
 
}
 
 
 
//CRUD LECTURA INICIAL DE CLIENTES
onMounted( async ()=>{
 onSnapshot(collection(db, 'clientes'), (querySnapshot) => {
  let tdclientes = []
  querySnapshot.forEach((doc) => {
  const cliente = {
    id: doc.id,
    apellido: doc.data().apellido ,
    cuentaig: doc.data().cuentaig ,
    estadoactual: doc.data().estadoactual ,
    fechacaptura: doc.data().fechacaptura ,
    fechacitafirma: doc.data().fechacitafirma ,
    msg: doc.data().msg ,
    name: doc.data().name ,
    oficio: doc.data().oficio  ,
    pais: doc.data().pais ,
    prop1: doc.data().prop1 ,
    prop2: doc.data().prop2 ,
    prop3: doc.data().prop3 ,
    propcom: doc.data().propcom ,
    prosideal: doc.data().prosideal 

  }
  tdclientes.push(cliente)
 
  })
 
      clientes.value = tdclientes
  })
  

  })

 


</script>

<template>


<div class="content" >
 
    <h1 class="has-text-centered" >
      Listado de Prospectos
    
    </h1>
  </div>



<div class="main"> 
 
  <div class="container pb-5">
 
    <button class="button is-info  js-modal-trigger" data-target="modal-js-example">Nuevo Cliente</button>
 
</div>
    
  
 

<div class="container">
  
 
     
    <table class="table is-striped">
  <thead>
    <tr>
   <th>Nombre </th>
    <th>CUENTA IG</th>
    <th>PAIS</th>
    <th>SE DEDICA A?</th>
    <th>PROSPECTO IDEAL?</th>
    <th>ESTADO ACTUAL</th>
    <th>DIA DE CITA/FIRMA</th>
    <th style="width: 12% !important;">OPCION</th>
  </tr>
  </thead>
 
  <tbody>
    <tr v-for="cliente in clientes" >
    <td>{{cliente.name}}</td>
    <td>{{cliente.cuentaig}}</td>
    <td>{{cliente.pais}}</td>
    <td>{{cliente.oficio}}</td>
    <td>{{cliente.prosideal}}</td>
    <td>{{cliente.estadoactual}}</td>
    <td>{{cliente.fechacitafirma}}</td>
    <td> 


    

      <button class="button is-light  btnfloat"  @click="modalupdate(cliente)"> &#9998; </button>
      <div class="content">
     

         
           <button class="button is-danger btnfloat" @click="borrarcliente(cliente.id)"> &cross; </button>
          </div>
     
    </td>
    </tr>
       
  </tbody>
  </table>
 
</div>


 









  <!-- MODAL -->
  <div class="modal  " id="modal-js-example">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">Nuevo Cliente</p>
              <button class="delete" aria-label="close"></button>
            </header>
     <section class="modal-card-body">
              <!-- Content ... -->


              <div class="field">
          <label class="label">Nombre</label>
          <div class="control">
            <input class="input" name="testname" v-model="testname"  type="text" placeholder="e.g JUAN PEREZ">
          </div>
        </div>
        <div class="field">
          <label class="label">Cuenta IG</label>
          <div class="control">
            <input class="input" v-model="testig" type="text" placeholder="e.g. a @cuentaig">
          </div>
        </div>
        <div class="field">
          <label class="label">Pais</label>
          <div class="control">
            <input class="input" v-model="testpais" type="text" placeholder=" ">
          </div>
        </div>
        <div class="field">
          <label class="label">Se dedica A:</label>
          <div class="control">
            <input class="input" v-model="testprofesion" type="text" placeholder=" ">
          </div>
        </div>
        <div class="field">
          <label class="label">Estado actual:</label>
        <!--  <div class="control"> -->
          <div class="columns">

        <div class="column is-4">
            <div class="select is-primary">
          <select  v-model="testestadoactual">
            <option>PROSPECTADO</option>
            <option>EN CONVERSACION</option>
            <option>AGENDANDO CITA</option>
            <option>NO CALIFICADO</option>
          </select>
      
          </div>

        </div>
        <div class="column " style="margin-top: -5%;">
          <label class="label">Fecha cita/firma:</label>
          <input class="input is-primary" v-model="testfechacitafirma" type="date" placeholder="Primary input">
           
        </div>
 
      </div>

     </div>
 
    </section>


          <footer class="modal-card-foot">
            <button class="button is-success" @click="guardarcliente">Guardar</button>
            <button class="button">Cancel</button>
          </footer>
        </div>
      </div>
<!-- FIN MODAL-->

 



  <!-- INICIO MODAL UPDATE -->
  <div class="modal  " id="modalupdate2">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">Editar Cliente</p>
              <button class="delete" aria-label="close"></button>
            </header>
     <section class="modal-card-body">
              <!-- Content ... -->


              <div class="field">
          <label class="label">Nombre</label>
          <div class="control">
            <input class="input"   v-if="updclientes[0]"  v-model="updclientes[0]['updname']"   type="text" placeholder=" ">
          </div>
        </div>
        <div class="field">
          <label class="label">Cuenta IG</label>
          <div class="control">
          <input class="input" v-if="updclientes[0]" v-model="updclientes[0]['updcuenta']" type="text" placeholder=" ">
         
          </div>
        </div>
        <div class="field">
          <label class="label">Pais</label>
          <div class="control">
            <input class="input"  v-if="updclientes[0]" v-model="updclientes[0]['udppais']"  type="text" placeholder=" ">
          </div>
        </div>
        <div class="field">
          <label class="label">Se dedica A:</label>
          <div class="control">
            <input class="input"  v-if="updclientes[0]" v-model="updclientes[0]['updoficio']" type="text" placeholder=" ">
          </div>
        </div>
        <div class="field">
          <label class="label">Estado actual:</label>
        
          <div class="columns">

        <div class="column is-4">
            <div class="select is-primary">
          <select  v-if="updclientes[0]" v-model="updclientes[0]['updestado']" >
            <option>PROSPECTADO</option>
            <option>EN CONVERSACION</option>
            <option>AGENDANDO CITA</option>
            <option>NO CALIFICADO</option>
          </select>
      
          </div>

        </div>
        <div class="column " style="margin-top: -5%;">
          <label class="label">Fecha cita/firma:</label>
          <input class="input is-primary" v-if="updclientes[0]" v-model="updclientes[0]['updfecha']" type="date" placeholder="Primary input">
           
        </div>
 
      </div>

     </div>
 
    </section>


          <footer class="modal-card-foot">
 
            <button class="button is-success"  v-if="updclientes[0]"  :id="updclientes[0]['updid']"  @click="updatecliente(updclientes[0]['updid'])">Guardar</button>
            <button class="button">Cancel</button>
          </footer>
        </div>
      </div>
<!-- FIN MODAL UPDATE-->















 

</div>

</template>

<style scoped>
 

 .tform{
max-width: 85%;

 }

 .btnfloat{
float:left;
margin-left: 6%;
padding-left: 10%;
 }

 
 table, td, th {
  border: 1px solid #DDD;
  text-align:center;
   
}
 
 /*
 table, td, th {
  border: 1px solid #DDD;
  text-align:center;
  width:14.2%;
  padding:5px;
  font-size: 12px;
}
th
{
   background:#DDEEEE;
}
table {
  width: 1200px;
  border-collapse: collapse;
}*/
 
.main{
  
max-width: 1280px;
 margin: 0 auto;
 padding: 2rem;
 
}
</style>
