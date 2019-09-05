<template>
  <v-app class="overflow-hidden">
    <v-app-bar
      absolute
      color="#69cca2"
      dark
      shrink-on-scroll
      prominent
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
      scroll-target="#scroll-target"
      scroll-threshold="500"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>SafeForest</v-toolbar-title>

      <div class="flex-grow-1"></div>
      <div id="nav">
        <router-link to="/">home</router-link>
        <router-link to="/about">about</router-link>
      </div>
    </v-app-bar>
    <v-sheet id="scroll-target" class="overflow-y-auto" height="100vh">
      <router-view />
    </v-sheet>
  </v-app>
</template>

<style>
html {
  overflow: hidden;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
