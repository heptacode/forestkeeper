/*
2019-09-06 김도영 작성.

함수 Return 예시:

{
    "channel": {
        "id": 856848,
        "name": "SafeForest",
        "latitude": "0.0",
        "longitude": "0.0",
        "field1": "data",
        "field2": "°C",
        "field3": "%",
        "field4": "ppm",
        "field5": "data",
        "field6": "data",
        "created_at": "2019-09-01T13:38:42Z",
        "updated_at":"2019-09-01T13:56:37Z",
        "last_entry_id":35
    },
    "data": [
        {
            "created_at":"2019-09-01T13:59:11Z",
            "entry_id":34,
            "data":null,
            "temperature":"63",
            "percent":"27",
            "ppm":"5.63\r\n\r\n"
        },
        ...
    ]
}
*/
import axios from "axios";
const api_url =
  "https://api.thingspeak.com/channels/856848/feeds.json?results=2";

async function getAPI() {
  const { data } = await axios.get(api_url);
  const { feeds, channel } = data;

  const feedsMapped = feeds.map(_feed => {
    const feed = { ..._feed };
    Object.keys(feed).forEach(key => {
      // if (key.slice(0, 5) !== "field") return;
      let _key = channel[key];
      // if (_key === "data") _key = "flame";
      // else if (_key === "°C") _key = "temp";
      // else if (_key === "%") _key = "humi";
      // else if (_key === "ppm") _key = "co";
      // else if (_key === "data") _key = "sound";
      // else if (_key === "data") _key = "vibration";
      if(key == "field1"){
        _key = "flame";
      }
      else if(key == "field2"){
        _key = "humi";
      }
      else if(key == "field3"){
        _key = "temp";
      }
      else if(key == "field4"){
        _key = "co";
      }
      else if(key == "field5"){
        _key = "sound";
      }
      else if(key == "field6"){
        _key = "vibration";
      }
      // console.log(key);
      feed[_key] = feed[key];
      delete feed[key];
    });

    return feed;
  });

  return {
    channel,
    data: feedsMapped
  };
}

export default getAPI;
