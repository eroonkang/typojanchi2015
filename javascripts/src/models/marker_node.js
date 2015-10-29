WY.models.MarkerNode = (function(){
  function MarkerNode(params){
    this.properties = params.properties;
    this.marker = params.marker;
    this.location = new THREE.Vector2(this.marker.getLatLng().lng, this.marker.getLatLng().lat);
    this.velocity = new THREE.Vector2();
    this.acceleration = new THREE.Vector2();
    this.damping = 0.95;

    // debugger;
    this.init();
  }


  MarkerNode.prototype = {
    init: function(){

      

    },

    is: function (type_name) {
      return this.properties.type == type_name;
    },

    update: function(){
      this.velocity.add(this.acceleration);
      this.velocity.multiplyScalar(this.damping);
      this.location.add(this.velocity);
      this.acceleration.multiplyScalar(0);
      // debugger;
      this.marker._latlng.lat = this.location.y;
      this.marker._latlng.lng = this.location.x;
      this.marker.update();
    },

    apply_force: function(force){
      
      this.acceleration.add(force.clone());
      // debugger;
    }
  };


  return MarkerNode;
})();
