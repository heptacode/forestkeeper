<template>
  <div>
    <gmap-map :center="center" :zoom="12" class="gmap">
      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWindow"
        @closeclick="infoWindow = false"
        style="width : 30vw"
      >
        <h2>{{ infoTitle }}</h2>
        <span v-if="loading">
          <v-progress-circular
            indeterminate
            color="#69cca2"
          ></v-progress-circular>
        </span>
        <div v-else>
          <v-simple-table dense>
            <tr>
              <th class="text-left">습도</th>
              <td>{{ markers[markerIndex].data.humi }} &#37;</td>
            </tr>
            <tr>
              <th class="text-left">온도</th>
              <td>{{ markers[markerIndex].data.temp }} &deg;C</td>
            </tr>
            <tr>
              <th class="text-left">일산화탄소</th>
              <td>{{ markers[markerIndex].data.co }} ppm</td>
            </tr>
            <tr>
              <th>산불</th>
              <td class="light-container">
                <div :class="light_fire"></div>
              </td>
            </tr>
            <tr>
              <th>벌목</th>
              <td class="light-container">
                <div :class="light_timber"></div>
              </td>
            </tr>
          </v-simple-table>
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
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title>
          <v-icon color="error" class="mr-2">mdi-alert</v-icon>
          <h3 class="red--text">경고</h3>
        </v-card-title>

        <v-card-text>
          <h3>
            {{
              fire === true
                ? "소청대피소에서 산불이 발생하였습니다!"
                : "소청대피소에서 벌목이 발생하였습니다!"
            }}
          </h3>
        </v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="primary" text @click="dialog = false">
            승인
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import getAPI from "../lib/getAPI";
export default {
  data() {
    return {
      loading: true,
      error: null,
      center: { lat: 38.1270868, lng: 128.4525135 },
      markers: [
        {
          position: {
            lat: 38.1270868,
            lng: 128.4525135
          },
          title: "소청대피소",
          data: []
        }
        // {
        //   position: {
        //     lat: 37.39413,
        //     lng: 126.997985
        //   },
        //   title: "Youngbeom's Home",
        //   data: []
        // },
        // {
        //   position: {
        //     lat: 37.351674,
        //     lng: 127.955627
        //   },
        //   title: "Youngbeom's Grandfather",
        //   data: []
        // }
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
      },
      dialog: false,
      fire: null,
      timber: null
    };
  },

  mounted() {
    this.fetch();
    setInterval(() => {
      this.fetch();
    }, 3000);
  },

  computed: {
    light_fire() {
      return {
        light: true,
        "light-null": this.fire === null,
        "light-safe": this.fire == false,
        "light-unsafe": this.fire == true
      };
    },
    light_timber() {
      return {
        light: true,
        "light-null": this.timber === null,
        "light-safe": this.timber == false,
        "light-unsafe": this.timber == true
      };
    }
  },

  methods: {
    focusToCenter: function() {
      this.center = { lat: 38.1270868, lng: 128.4525135 };
    },
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
    },
    fetch: function() {
      getAPI().then(data => {
        for (let i = 0; i < data.data.length - 1; i++) {
          this.markers[i].data = data.data[i];
          if (this.markers[i].data.flame == 0) {
            this.focusToCenter();
            this.fire = this.dialog = true;
          } else {
            this.fire = false;
          }
          if (
            this.markers[i].data.sound == 0 ||
            this.markers[i].data.vibration == 1
          ) {
            this.focusToCenter();
            this.timber = this.dialog = true;
          } else {
            this.timber = false;
          }
        }
        this.loading = false;
      });
    }
  }
};
</script>

<style scoped>
.gmap {
  width: 100vw;
  height: 93vh;
}
.light-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 5px 0;
}
.light {
  border-radius: 50%;
  height: 16px;
  width: 16px;
}
.light-safe {
  background: rgb(40, 201, 64);
}
.light-unsafe {
  background: rgb(241, 39, 26);
}
.light-null {
  background: rgb(138, 138, 138);
}
</style>