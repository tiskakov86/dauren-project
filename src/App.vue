<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav> -->
    <b-navbar type="dark" variant="dark">
      <b-navbar-brand href="/village">Село</b-navbar-brand>
      <b-navbar-brand href="/city">Город</b-navbar-brand>
    </b-navbar>
    <router-view/>
  </div>
</template>
