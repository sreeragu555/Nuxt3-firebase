<template>
    <div>
      <Head>
        <Title>MainPage</Title>
        <Meta name="description" content="Mainpage" />
      </Head>
      <!-- Login Form -->
      <div>
        <h2>Login</h2>
        Email address
        <input type="text" v-model="loginEmail" placeholder="Email"/><br>
        Password    
        <input type="password" v-model="loginPassword" placeholder="Password"/><br>
        <input type="button" value="Login" @click="login">
      </div>
      
      <!-- Registration Form -->
      <div>
        <h2>Register</h2>
        Email address
        <input type="text" v-model="registerEmail" placeholder="Email"/><br>
        Password    
        <input type="password" v-model="registerPassword" placeholder="Password"/><br>
        <input type="button" value="Register" @click="register">
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useNuxtApp } from '#app';
  import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
  
  const loginEmail = ref('');
  const loginPassword = ref('');
  const registerEmail = ref('');
  const registerPassword = ref('');
  
  const { $firebaseAuth } = useNuxtApp();
  const router = useRouter();
  
  // Login function
  const login = async () => {
    try {
      await signInWithEmailAndPassword($firebaseAuth, loginEmail.value, loginPassword.value);
      console.log('User logged in');
      router.push('/submitdata');
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };
  
  // Registration function
  const register = async () => {
    try {
      await createUserWithEmailAndPassword($firebaseAuth, registerEmail.value, registerPassword.value);
      console.log('User registered');
      router.push('/submitdata');
    } catch (error) {
      console.error('Error registering:', error.message);
    }
  };
  </script>
  
  <style scoped>
  div {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
  }
  
  input[type="text"], input[type="password"] {
    padding: 10px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }
  
  input[type="button"] {
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    background-color: #007BFF;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  input[type="button"]:hover {
    background-color: #0056b3;
  }
  </style>
  