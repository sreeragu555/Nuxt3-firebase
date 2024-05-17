<template>
  <div>
    <main>
      <NuxtPage />
    </main>  
  </div>
</template>

<style scoped>
/* Basic styling for header, footer, and layout */
header {
  background-color: #333;
  color: #fff;
  padding: 10px;
}

header nav {
  display: flex;
  gap: 10px;
}

header nav a {
  color: #fff;
  text-decoration: none;
}

header nav a:hover {
  text-decoration: underline;
}

main {
  padding: 20px;
}

footer {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 10px;
  position: fixed;
  width: 100%;
  bottom: 0;
}
</style>
