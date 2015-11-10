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
          -74.2598655,
          40.7029741
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
          139.5703029,
          35.6735408
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
          -0.2416817,
          51.528771
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
          -118.6919223,
          34.0207504
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
          -88.0123415,
          41.8339042
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
          -99.2836991,
          19.3910038
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "permalink": "6-jongno-ga-the-street-as-medium",
        "title_ko": "종로",
        "title_en": "Jongno",
        "type": "Project"
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
        "type": "Project"
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
        "type": "Project"
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