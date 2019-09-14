<template>
  <gmap-map :center="center" :zoom="12" class="gmap">
    <gmap-info-window
      :options="infoOptions"
      :position="infoWindowPos"
      :opened="infoWindow"
      @closeclick="infoWindow = false"
    >
      <h2>{{ infoTitle }}</h2>
      <span v-if="loading">로딩 중</span>
      <div v-else>
        <ul>
          <li>{{ markers[markerIndex].data.percent }}%</li>
          <li>{{ markers[markerIndex].data.ppm }} ppm</li>
          <li>{{ markers[markerIndex].data.temperature }}°C</li>
        </ul>
      </div>
    </gmap-info-window>
    <gmap-marker
      :key="index"
      v-for="(marker, index) in markers"
      :position="marker.position"
      :title="marker.title"
      @click="(center = marker.position), toggleInfoWindow(marker, index)"
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
      center: { lat: 37.394130, lng: 126.997985 },
      markers: [
        {
          position: {
            lat: 37.394130,
            lng: 126.997985
          },
          title: "Youngbeom's Home",
          data: []
        },
        {
          position: {
            lat: 37.351674,
            lng: 127.955627
          },
          title: "Youngbeom's Grandfather",
          data: []
        }
      ],
      markerIndex: 0,
      infoWindow: false,
      infoWindowPos: null,
      infoTitle: "",
      currentMidx: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    };
  },

  mounted() {
    getAPI().then(data => {
      this.markers[0].data = data.data[0];
      this.markers[1].data = data.data[1];
      this.loading = false;
    });
  },

  methods: {
    toggleInfoWindow: function(marker, index) {
      this.markerIndex = index;
      this.infoTitle = marker.title;
      this.infoWindowPos = marker.position;

      if (this.currentMidx == index) {
        this.infoWindow = !this.infoWindow;
      } else {
        this.infoWindow = true;
        this.currentMidx = index;
      }
    }
  }
};
</script>