WY.constants.custom_markers_geojson = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "permalink": "2-andrew-brash",
        "title_ko": "뉴욕",
        "title_en": "New York",
        "type": "Artwork"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -73.935242,
          40.730610
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "permalink": "2-jonas-berthod",
        "title_ko": "도쿄",
        "title_en": "Tokyo",
        "type": "Artwork"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          139.7017060,
          35.6894870
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "permalink": "2-jorg-schwerteger",
        "title_ko": "런던",
        "title_en": "London",
        "type": "Artwork"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -0.1277580,
          51.5073510
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "permalink": "2-laura-joan",
        "title_ko": "로스앤젤레스",
        "title_en": "Los Angeles",
        "type": "Artwork"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -118.2436850,
          34.0522340
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "permalink": "2-sebastian-koseda",
        "title_ko": "시카고",
        "title_en": "Chicago",
        "type": "Artwork"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -87.623177,
          41.881832
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "permalink": "2-summer-studio",
        "title_ko": "멕시코 시티",
        "title_en": "Mexico City",
        "type": "Artwork"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -99.133209,
          19.432608
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "permalink": "6-jongno-ga-the-street-as-medium",
        "title_ko": "종로",
        "title_en": "Jongno",
        "type": "Artwork"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.976908,
          37.57013
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "permalink": "6-jongno-ga-the-street-as-medium",
        "title_ko": "종로",
        "title_en": "Jongno",
        "type": "Artwork"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          127.009117,
          37.571158
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "permalink": "6-jongno-ga-the-street-as-medium",
        "title_ko": "종로",
        "title_en": "Jongno",
        "type": "Artwork"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            126.976908,
            37.57013
          ],
          [
            127.009117,
            37.571158
          ]
        ]
      }
    }
  ]
};
      

var f_t = 126.9716173;
var r = getRandom(f_t - 0.015, f_t + 0.015);

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

WY.constants.balloon_by_zoom = {
  13: {
    upper_force: new THREE.Vector2(r, 37.597),
    d_p: 0.015,
    d_pv: 0.003,
    d_ap: 0.0022,
    d_a: 0.002
  },
  14: {
    upper_force: new THREE.Vector2(r, 37.59),
    d_p: 0.007,
    d_pv: 0.002,
    d_ap: 0.002,
    d_a: 0.003
  },
  15: {
    upper_force: new THREE.Vector2(r, 37.579),
    d_p: 0.007,
    d_pv: 0.002,
    d_ap: 0.002,
    d_a: 0.003
  },
  16: {
    upper_force: new THREE.Vector2(r, 37.574),
    d_p: 0.007,
    d_pv: 0.002,
    d_ap: 0.002,
    d_a: 0.003
  },
  17: {
    upper_force: new THREE.Vector2(r, 37.579),
    d_p: 0.007,
    d_pv: 0.002,
    d_ap: 0.002,
    d_a: 0.003
  },
  18: {
    upper_force: new THREE.Vector2(r, 37.579),
    d_p: 0.007,
    d_pv: 0.002,
    d_ap: 0.002,
    d_a: 0.003
  },
};