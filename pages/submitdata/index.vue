<template>
    <div>
        <Head>
        <Title>Submit Name</Title>
        <Meta name="description" content="Submit Name" />
      </Head>
      <!-- Input form to submit user data -->
      <div>
        Name: <input type="text" v-model="name" name="Name" placeholder="Enter name"/><br>
        <input type="button" value="Submit" @click="handleSubmit">
      </div>
  
      <!-- Table to display users -->
      <div v-if="users.length">
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th>UID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.uid">
              <td>{{ user.uid }}</td>
              <td>{{ user.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { useNuxtApp } from '#app';
  import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
  
  const name = ref('');
  const users = ref<{ uid: string, name: string }[]>([]);
  
  const { $firestore, $firebaseAuth } = useNuxtApp();
  
  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      const user = $firebaseAuth.currentUser;
      if (user) {
        await addDoc(collection($firestore, 'users'), {
          uid: user.uid,
          name: name.value,
        });
        console.log('Document written with ID:', user.uid);
        // Fetch the updated list of users
        await fetchUsers();
        // Clear the name input field
        name.value = '';
      } else {
        console.error('No user is signed in');
      }
    } catch (error) {
      console.error('Error adding document:', error.message);
    }
  };
  
  // Function to fetch users from Firestore
  const fetchUsers = async () => {
    try {
      const user = $firebaseAuth.currentUser;
      if (user) {
        const q = query(collection($firestore, 'users'), where('uid', '==', user.uid));
        const querySnapshot = await getDocs(q);
        users.value = querySnapshot.docs.map(doc => doc.data() as { uid: string, name: string });
      } else {
        console.error('No user is signed in');
      }
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };
  
  // Fetch users when the component is mounted
  onMounted(() => {
    fetchUsers();
  });
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
  
  input[type="text"] {
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
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  th, td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }
  
  th {
    background-color: #f2f2f2;
  }
  </style>
  