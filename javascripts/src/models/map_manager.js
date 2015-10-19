WY.models.MapManager = (function(){
  function MapManager(params){
    this.el_name = params.el_name;
    this.map;
    this.data;
    this.markers = [];

    _.extend(this, Backbone.Events);
    _.bindAll(this, "load_complete_handler");
  }

  MapManager.prototype = {
    init: function(){
      this.map = L.map(this.el_name).setView([37.5558393, 126.9716173], 13);

      L.tileLayer('https://a.tiles.mapbox.com/v4/eroon26.36545472/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiZXJvb24yNiIsImEiOiJjaWY3cWhsbnkweGVuczNrcnZoNHB4dGhoIn0.oFbWC28lxCKcOIDiffQZuw', {
        attribution: '<a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      this.map.scrollWheelZoom.disable();

      this.load();
    },

    load: function(){
      $.ajax({
        type: 'GET',
        url: WY.constants.home_url + '/projects/locations.yml',
        success: this.load_complete_handler
      })
    },

    load_complete_handler: function(data){
      this.data = jsyaml.load(data);
      
      _.each(this.data, _.bind(function(artwork){

        var marker = L.circleMarker([artwork.origin_lat, artwork.origin_lng], {
          color: "#000000",
          stroke: true,
          opacity:1,
          weight: 1.5,
          fillColor: "#ffffff",
          fillOpacity: 1,
        }).setRadius(7);
        marker.features = artwork;

        marker.on('mouseover', _.bind(function(e){
          var popup = L.popup({autoPan: false}).setContent(_.template("<p><%= full_name_en %></p>")(marker.features));
          popup.setLatLng(L.latLng([marker.features.origin_lat, marker.features.origin_lng])).openOn(this.map);
        }, this));
        marker.addTo(this.map);

      }, this));

    }
  };

  return MapManager;
})();
