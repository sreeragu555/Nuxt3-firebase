<template>
    <div class="form-container">
      <Head>
        <Title>MainPage</Title>
        <Meta name="description" content="Mainpage" />
      </Head>
      <form @submit.prevent="handleSubmit" class="form">
        <label for="email">Email address</label>
        <input type="text" id="email" v-model="email" name="email" placeholder="Email" class="input"/><br>
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" name="password" placeholder="Password" class="input"/><br>
        <input type="submit" value="Submit" class="submit-button">
      </form>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { useNuxtApp } from '#app';
  import { useRouter } from 'vue-router';
  import { signInWithEmailAndPassword } from 'firebase/auth';
  
  const email = ref('');
  const password = ref('');
  const router = useRouter();
  const handleSubmit = async () => {
    try {
      const { $firebaseAuth } = useNuxtApp();
      const userCredential = await signInWithEmailAndPassword($firebaseAuth, email.value, password.value);
      console.log("User signed in:", userCredential.user);
      router.push('/submitdata');
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };
  </script>
  
  <style scoped>
  .form-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
  }
  
  .form {
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin-bottom: 8px;
    font-weight: bold;
  }
  
  .input {
    padding: 10px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }
  
  .submit-button {
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    background-color: #007BFF;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .submit-button:hover {
    background-color: #0056b3;
  }
  </style>
  