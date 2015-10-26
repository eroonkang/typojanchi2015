WY.models.MapManager = (function(){
  function MapManager(params){
    this.el_name = params.el_name;
    this.map;
    this.data;
    this.markers = [];
    this.oms;
    this.graph = createGraph();

    _.extend(this, Backbone.Events);
    _.bindAll(this, "load_complete_handler");
  }

  MapManager.prototype = {
    init: function(){
      this.map = L.map(this.el_name).setView([37.5558393, 126.9716173], 13);

      L.tileLayer('https://a.tiles.mapbox.com/v4/eroon26.36545472/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiZXJvb24yNiIsImEiOiJjaWY3cWhsbnkweGVuczNrcnZoNHB4dGhoIn0.oFbWC28lxCKcOIDiffQZuw', {
        attribution: '<a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      // this.map.scrollWheelZoom.disable();
      // this.map.doubleClickZoom.disable();

      this.load();
    },

    load: function(){
      $.ajax({
        type: 'GET',
        url: WY.constants.home_url + '/projects/locations.json',
        success: this.load_complete_handler
      })
    },

    load_complete_handler: function(data){
      this.data = data;
      this.artist_popup_tmpl = _.template("<%= full_name_" + WY.constants.locale + " %>");
      this.artwork_popup_tmpl = _.template("<%= artwork_name_" + WY.constants.locale + " %>");
      var geojsonMarkerOptions = {
          radius: 5,
          fillColor: "#FFFFFF",
          color: "#000",
          fillOpacity: 1,
          opacity: 1,
      };


      _.each(this.data.nodes.features, _.bind(function (node) {
        var marker = L.circleMarker(L.latLng(node.geometry.coordinates[1], node.geometry.coordinates[0]), geojsonMarkerOptions);

        this.graph.addNode(node.properties.id, {properties: node.properties, marker: marker});
        this.map.addLayer(marker);
        // debugger;
      }, this));
        
      _.each(this.data.links, _.bind(function(link){ 
        
        var from_latlng = this.graph.getNode(link.source).data.marker._latlng;
        var to_latlng = this.graph.getNode(link.target).data.marker._latlng;
        

        var polyline = L.polyline([from_latlng, to_latlng], {
          color: '#555',
          weight: 1,
          opacity: 0.2
        }).addTo(this.map);

        var link = this.graph.addLink(link.source, link.target, {data: {}, line: polyline});

      },this));

    }
    
  };

  return MapManager;
})();
