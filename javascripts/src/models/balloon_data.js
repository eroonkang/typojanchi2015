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