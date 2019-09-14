<template>
  <v-app>
    <v-img
      src="../assets/luca-bravo-ESkw2ayO2As-unsplash.jpg"
      lazy-src="../assets/luca-bravo-ESkw2ayO2As-unsplash.jpg"
      height="93vh"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
    >
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          ></v-progress-circular>
        </v-row>
      </template>
      <v-row align="center" class="white--text fill-height text-center">
        <v-col>
          <h1>
            숲을 지키는 Forest Keeper
          </h1>
        </v-col>
      </v-row>
    </v-img>
    <v-footer color="transparent" dark absolute>
      <v-row class="text-right">
        <v-col>
          <h6 class="caption">
            Photo by
            <a href="https://unsplash.com/@lucabravo" target="_blank"
              >Luca Bravo</a
            >
            on
            <a href="https://unsplash.com" target="_blank">Unsplash</a>
          </h6>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<style scoped>
a,
a:link,
a:visited {
  color: white !important;
  text-decoration: none;
  border-bottom: 1px dotted whitesmoke;
}
</style>