<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin" class="login-form">
      <h2>Вход</h2>
      <div class="form-group">
        <label for="login">Имя пользователя:</label>
        <input v-model="login" id="login" placeholder="Введите имя пользователя" class="form-control" />
      </div>
      <div class="form-group">
        <label for="password">Пароль:</label>
        <input v-model="password" id="password" type="password" placeholder="Введите пароль" class="form-control" />
      </div>
      <button type="submit" class="btn btn-primary">Войти</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapActions, mapGetters } from 'vuex';

@Component({
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  methods: {
    ...mapActions(['login']),
  }
})
export default class cLogin extends Vue {
  login = '';
  password = '';
  errorMessage = '';

  async handleLogin() {
    try {
      await this.$store.dispatch('login', { login: this.login, password: this.password });
      this.$router.push('/dashboard');
    } catch (error) {
      this.errorMessage = 'Login failed. Please check your credentials.';
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Высота экрана */
  background-color: #f8f9fa; /* Светлый фон */
}

.login-form {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 300px; /* Ширина формы */
}

h2 {
  margin-bottom: 1rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
}

.btn-primary {
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
}

.error {
  color: red;
  text-align: center;
  margin-top: 1rem;
}
</style>
