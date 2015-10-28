// WY.constants.distances = {
//   "13": 
// }
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
      this.map = L.map(this.el_name).setView([37.5558393, 126.9716173], 14);

      L.tileLayer('https://a.tiles.mapbox.com/v4/eroon26.36545472/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiZXJvb24yNiIsImEiOiJjaWY3cWhsbnkweGVuczNrcnZoNHB4dGhoIn0.oFbWC28lxCKcOIDiffQZuw', {
        attribution: '<a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      // this.map.scrollWheelZoom.disable();
      this.map.doubleClickZoom.disable();

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
      // var geojsonMarkerOptions = ;


      _.each(this.data.nodes.features, _.bind(function (node) {
        var marker;

        var customIcon = L.Icon.extend({
            options: {
                iconSize:     [40, 40],
                iconAnchor:   [20, 20],
                popupAnchor:  [0, 0],
            }
        });

        var circle_w = new customIcon({iconUrl: 'images/icon-circle-w.png', iconRetinaUrl: 'images/icon-circle-w@2x.png'}),
            diamond_w = new customIcon({iconUrl: 'images/icon-diamond-w.png', iconRetinaUrl: 'images/icon-diamond-w@2x.png'}),
            diamond_b = new customIcon({iconUrl: 'images/icon-diamond-b.png', iconRetinaUrl: 'images/icon-diamond-b@2x.png'});
            concentric_w = new customIcon({iconUrl: 'images/icon-concentric-w.png', iconRetinaUrl: 'images/icon-concentric-w@2x.png'});
            scircle_b = new customIcon({iconUrl: 'images/icon-scircle-b.png', iconRetinaUrl: 'images/icon-scircle-b@2x.png'});
            scircle_w = new customIcon({iconUrl: 'images/icon-scircle-w.png', iconRetinaUrl: 'images/icon-scircle-w@2x.png'});

        // 거의 주석을 달필요성을 못느낌
        if (node.properties.type == "Venue") {
          marker = L.marker(L.latLng(node.geometry.coordinates[1], node.geometry.coordinates[0]), {
            icon: scircle_b,
            riseOnHover: true
          });

        } else if (node.properties.type == "Project") {
          marker = L.marker(L.latLng(node.geometry.coordinates[1], node.geometry.coordinates[0]), {
            icon: circle_w,
            riseOnHover: true
          });

        } else if (node.properties.type == "Artwork") {
          // marker = L.marker(L.latLng(node.geometry.coordinates[1] + randomBetween(-0.01, 0.01), node.geometry.coordinates[0]  + randomBetween(-0.01, 0.01)), {
          marker = L.marker(L.latLng(node.geometry.coordinates[1] + randomBetween(-0.01, 0.01), node.geometry.coordinates[0]  + randomBetween(-0.01, 0.01)), {
            icon: circle_w,
            riseOnHover: true
          });
          
        } else if (node.properties.type == "Artist") {
          marker = L.marker(L.latLng(node.geometry.coordinates[1] + randomBetween(-0.01, 0.01), node.geometry.coordinates[0]  + randomBetween(-0.01, 0.01)), {
            icon: scircle_w,
            riseOnHover: true
          });

          // marker = L.circleMarker(L.latLng(node.geometry.coordinates[1], node.geometry.coordinates[0]), {
          //   radius: 5,
          //   fillColor: "#000",
          //   color: "#000",
          //   fillOpacity: 1,
          //   opacity: 1,
          // });
        }




        var n = this.graph.addNode(node.properties.id, {properties: node.properties, marker: marker});
        debugger;
        this.map.addLayer(marker);
        // marker.on('click', function (e) {
          
        // })
        // debugger;
      }, this));
        
      _.each(this.data.links, _.bind(function(link){ 
        
        var from_latlng = this.graph.getNode(link.source).data.marker._latlng;
        var to_latlng = this.graph.getNode(link.target).data.marker._latlng;
        var polyline;
        
        var source = this.graph.getNode(link.source);
        var target = this.graph.getNode(link.target);
        // debugger;
        if ((source.data.properties.type == "Venue" && target.data.properties.type == "Project") || 
            (source.data.properties.type == "Project" && target.data.properties.type == "Venue")) {
          polyline = L.polyline([from_latlng, to_latlng], {
            color: '#000',
            weight: 1.5,
            opacity: 1
          }).addTo(this.map);
        } else if ((source.data.properties.type == "Project" && target.data.properties.type == "Artwork") || 
                   (source.data.properties.type == "Artwork" && target.data.properties.type == "Project")) {
          
          polyline = L.polyline([from_latlng, to_latlng], {
            color: '#000',
            weight: 1.5,
            opacity: 1,
            dashArray: "0.1, 10",
            lineCap: "round"
          }).addTo(this.map);

        } else if ((source.data.properties.type == "Artwork" && target.data.properties.type == "Artist") || 
                   (source.data.properties.type == "Artist" && target.data.properties.type == "Artwork")) {

          polyline = L.polyline([from_latlng, to_latlng], {
            color: '#000',
            weight: 2,
            opacity: 0,
            dashArray: "0.1, 10",
            lineCap: "round"
          }).addTo(this.map);

        } 



        var link = this.graph.addLink(link.source, link.target, {data: {}, line: polyline});

      }, this));
      
  
      for (var i = 0; i < 100; i++) {

        _.delay(_.bind(function(){

          this.graph.forEachNode(function(node){
            node.data.marker.setLatLng(L.latLng(node.data.marker._latlng.lat + randomBetween(-0.01, 0.01), node.data.marker._latlng.lng + randomBetween(-0.01, 0.01)))
          });
        }, this), i * 100); 
      }
    }
    
  };

  return MapManager;
})();
