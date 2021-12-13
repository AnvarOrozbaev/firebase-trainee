<template>
  <div class="register">
      <h1>Create an Account</h1>
    <p>
      <input 
      type="text" 
      placeholder="Email" 
      v-model="email" />
    </p>
    <p>
      <input
      type="password" 
      placeholder="Password"
      v-model="password" />
    </p>
    <p>
      <button @click="register">Submit</button>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import firebase from 'firebase';
import { useRouter } from 'vue-router' 

  const email = ref('')
  const password = ref('')
  const router = useRouter() 
  const db = firebase.database();
  const dbref = db.ref()
  const data = {}
  const register = () => {
    firebase
      .auth() // get the auth api
      .createUserWithEmailAndPassword(email.value, password.value) // need .value because ref()
      .then((data) => {
        console.log('Successfully registered!');
        console.log(data);
       
        db.ref("users").child(firebase.auth().currentUser.uid).set( {"name" : "", "imageURL" : "","country" : ""})
        router.push('/feed') // redirect to the feed
      })
      .catch(error => {
        console.log(error.code)
        alert(error.message);
      });
  }

    
</script>
