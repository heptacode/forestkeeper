<template>
  <gmap-map :center="center" :zoom="12" class="gmap">
    <gmap-info-window
      :options="infoOptions"
      :position="infoWindowPos"
      :opened="infoWinOpen"
      @closeclick="infoWinOpen = false"
    >
      <template>
        <span v-if="loading">로딩 중</span>
        <div v-else>
          <ul>
            <li>{{markerData.percent}}%</li>
            <li>{{markerData.ppm}} ppm</li>
            <li>{{markerData.temperature}}°C</li>
          </ul>
        </div>
      </template>
    </gmap-info-window>
    <gmap-marker
      :key="index"
      v-for="(marker, index) in markers"
      :position="marker.position"
      :title="marker.title"
      @click="center = marker.position, toggleInfoWindow(marker, index)"
    ></gmap-marker>
  </gmap-map>
</template>

<style scoped>
.gmap {
  width: 100vw;
  height: 92vh;
}
</style>

<script>
import getAPI from "../lib/getAPI";
export default {
  data() {
    return {
      loading: true,
      error: null,
      markerData: [],
      center: { lat: 37.351673, lng: 127.955627 },
      markers: [
        {
          position: {
            lat: 37.351673,
            lng: 127.955627
          },
          title: "TEST",
          infoText: "Mark1"
        },
        {
          position: {
            lat: 37.351674,
            lng: 127.955627
          },
          title: "TEST2",
          infoText: "Mark2"
        }
      ],
      infoWindowPos: null,
      infoContent: "",
      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    };
  },
  created() {
    getAPI().then(data => {
      //eslint-disable-next-line
      console.log(data);
      this.markerData = data.data[0];
      this.loading = false;
    });
  },
  methods: {
    toggleInfoWindow: function(marker, index) {
      this.infoWindowPos = marker.position;
      this.infoContent = marker.infoText;

      if (this.currentMidx == index) {
        this.infoWinOpen = !this.infoWinOpen;
      } else {
        this.infoWinOpen = true;
        this.currentMidx = index;
      }
    }
  }
};
</script>