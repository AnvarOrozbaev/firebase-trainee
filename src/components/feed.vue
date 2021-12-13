<template>
  <div class="feed">
    <h1>Profile</h1>
    <h3>This page is for users only</h3>
    <div class="feed__container"></div>
    <div class="feed__avatar">
        <img id="imgUpload" src="" alt="">
      <input
         class="feed__avatar-input" 
         type="file"
         v-on:change="onUpload" />
     
    </div>
    <div class="feed__info-wrapper">
       
      <div class="feed__info-name">
            <p
                id="showingUserName"
            ></p>
          <input
            id="userName"
            class="feed__info__input"
            type="text"
            placeholder="введите ваше имя"
          
          />
          <button
            class="feed__info__input-btn"
            type="submit"
            @click="setUserNameToDb"
          >OK</button>
      </div>
      <div class="feed__info-country">
          <DropDawn
            @on-item-selected="dropdownSelection = $event" 
            @on-item-reset="dropdownSelection = {}" />
            ваша страна:{{dropdownSelection.name}}
           
      </div>
    </div>
  </div>
</template>

<script >
import firebase from "firebase"
import { useRouter } from "vue-router"

import DropDawn from "./dropdown.vue"
export default{
   
    components:{
        DropDawn
    },
    data () {
    return {
      dropdownSelection: {},
      imgSRC:'',
      userName:'',
     

    }
  },
    methods:{

        setUserNameToDb(){
            const userName =  document.querySelector('#userName').value
            const  db = firebase.database();
            db.ref("users").child(firebase.auth().currentUser.uid).child("name").set(userName)
            


        },
        getImageURL(){
            const  db = firebase.database();
            db.ref("users").on('value', (snapshot) => {
            const uid = firebase.auth().currentUser.uid;
            const imgValue = snapshot.child(uid).child("imageURL").val(); 
                document.querySelector('#imgUpload').setAttribute('src',imgValue)
            }, (errorObject) => {
                console.log('The read failed: ' + errorObject.name);
            }); 
                
        },
         getName(){
            const  db = firebase.database();
            db.ref("users").on('value', (snapshot) => {
                const uid = firebase.auth().currentUser.uid;
                const nameValue = snapshot.child(uid).child("name").val(); 
                document.querySelector('#showingUserName').innerHTML = `Ваше имя: ${nameValue}`;
            }, (errorObject) => {
                console.log('The read failed: ' + errorObject.name);
            }); 
                
        },
         getCountry(){
            const  db = firebase.database();
            db.ref("users").on('value', (snapshot) => {
                const uid = firebase.auth().currentUser.uid;
                const countryValue = snapshot.child(uid).child("country").val();  
                console.log(countryValue)
                this.dropdownSelection.name = countryValue;
            }, (errorObject) => {
                console.log('The read failed: ' + errorObject.name);
            }); 
         },
        onUpload (){
            const storageRef = firebase.storage().ref();
            const input = document.querySelector('.feed__avatar-input');
            const file = input.files[0];
            const fileRef = storageRef.child(file.name); 
            const ImagesRef = storageRef.child( `images/${file}`);
            const task = fileRef.put(file);
            const db = firebase.database();
            task.then(snapshot => {
                console.log(snapshot)
                fileRef.getDownloadURL()
                .then((url) => {  
                    db.ref("users").child(firebase.auth().currentUser.uid).child("imageURL").set(url);
                    document.querySelector('#imgUpload').setAttribute('src',url)
              
                })
             })

        }


    },
    mounted() {
        this.getImageURL()
        this.getName()
        this.getCountry()
    },
   
}


</script>
<style>

#imgUpload{
    width: 200px;
    height: 200px;
    border-radius: 100px; 
    border: 3px solid black; 
    box-shadow: 0 0 7px #666;
}

.feed__avatar{
    display: flex;
    flex-direction: column;
    width: 300px;
}

</style>