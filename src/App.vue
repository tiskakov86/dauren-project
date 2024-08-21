<template>
  <div id="app">
    <b-navbar v-if="!isLoginPage" type="dark" variant="dark">
      <b-navbar-brand href="/village">Село</b-navbar-brand>
      <b-navbar-brand href="/city">Город</b-navbar-brand>

      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown v-if="isAuthenticated" right>
          <template #button-content>
            <em>{{ user.username }}</em>
          </template>
          <b-dropdown-item @click="handleLogout">Выйти</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item v-else href="/login">Войти</b-nav-item>
      </b-navbar-nav>
    </b-navbar>

    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapGetters, mapActions } from 'vuex';

@Component({
  computed: {
    ...mapGetters(['isAuthenticated', 'user']),
    isLoginPage(): boolean {
      return this.$route.path === '/login';
    }
  },
  methods: {
    ...mapActions(['logout']),
    async handleLogout() {
      try {
        await this.logout();
        this.$router.push('/login');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
  }
})
export default class App extends Vue {
  // Данные и методы для отображения информации о пользователе и выхода
}
</script>

<style>
/* Ваши стили */
</style>
