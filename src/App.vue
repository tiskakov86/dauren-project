<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav> -->
    <b-navbar type="dark" variant="dark">
      <b-navbar-brand href="/main">Main</b-navbar-brand>
      <b-navbar-brand href="/about">About</b-navbar-brand>
    </b-navbar>
    <router-view/>
  </div>
</template>
