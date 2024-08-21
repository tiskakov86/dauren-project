<template>
  <div class="hello-view">
    <h1>Добро пожаловать на мою страницу КАТО!</h1>
    <p>Это простая страница на Vue.js.</p>
  </div>
</template>

<script>
export default {
  name: 'HelloView',
};
</script>

<style scoped>
.hello-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: #f5f5f5;
  color: #333;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

p {
  font-size: 1.2rem;
}
</style>
