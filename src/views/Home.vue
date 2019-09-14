<template>
  <v-app>
    <div class="heading">
      <v-icon dark size="70">mdi-tree-outline</v-icon>
      <h1>
        숲을 지키는 Forest Keeper
      </h1>
      <v-btn
        dark
        color="#69cca2"
        class="font-weight-bold mt-2 elevation-10"
        href="/app"
        >시작하기</v-btn
      >
    </div>
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
.heading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.heading h1 {
  color: white;
  text-shadow: 0 3px 10px rgba(0, 0, 0, 0.4);
}

a,
a:link,
a:visited {
  text-decoration: none;
}

.caption a,
.caption a:link,
.caption a:visited {
  color: white !important;
  text-decoration: none;
  border-bottom: 1px dotted whitesmoke;
}
</style>