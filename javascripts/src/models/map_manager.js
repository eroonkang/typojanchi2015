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
    this.active_popups = [];


    _.extend(this, Backbone.Events);
    _.bindAll(this, "load_complete_handler", "animate");
  }

  MapManager.prototype = {
  init: function(){
      this.map = L.map(this.el_name).setView([37.5558393, 126.9716173], 14);

      L.tileLayer('https://a.tiles.mapbox.com/v4/eroon26.36545472/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiZXJvb24yNiIsImEiOiJjaWY3cWhsbnkweGVuczNrcnZoNHB4dGhoIn0.oFbWC28lxCKcOIDiffQZuw', {
        attribution: '<a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      this.map.scrollWheelZoom.disable();
      // new L.Control.Zoom({ position: 'topright' }).addTo(this.map);

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
      this.popup_tmpl = {
        'Artist': _.template('<a href="<%= url_from_permalink(permalink) %>" data-permalink="<%= permalink %>" class="popup_btn"><%= full_name_' + WY.constants.locale + ' %></a>'),
        'Artwork': _.template('<a href="<%= url_from_permalink(permalink) %>" data-permalink="<%= permalink %>" class="popup_btn"><%= artwork_name_' + WY.constants.locale + ' %></a>'),
        'Project': _.template('<a href="<%= url_from_project_name(idx, project_name_en) %>" data-permalink="<%= idx + "-" + conv_to_slug(project_name_en) %>" class="popup_btn"><%= project_name_' + WY.constants.locale + ' %></a>'),
        'Venue': _.template('<a href="<%= url_from_permalink(permalink) %>" data-permalink="<%= permalink %>" class="popup_btn"><%= venue_name_' + WY.constants.locale +  ' %></a>'),
        '284': _.template('<a href="javascript:void(0);"><%= venue_name_' + WY.constants.locale +  ' %></a>')
      }

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

        var circle_w = new customIcon({iconUrl: WY.constants.home_url + '/images/icon-circle-w.png', iconRetinaUrl: WY.constants.home_url + '/images/icon-circle-w@2x.png'}),
            diamond_w = new customIcon({iconUrl: WY.constants.home_url + '/images/icon-diamond-w.png', iconRetinaUrl: WY.constants.home_url + '/images/icon-diamond-w@2x.png'}),
            diamond_b = new customIcon({iconUrl: WY.constants.home_url + '/images/icon-diamond-b.png', iconRetinaUrl: WY.constants.home_url + '/images/icon-diamond-b@2x.png'});
            concentric_w = new customIcon({iconUrl: WY.constants.home_url + '/images/icon-concentric-w.png', iconRetinaUrl: WY.constants.home_url + '/images/icon-concentric-w@2x.png'});
            scircle_b = new customIcon({iconUrl: WY.constants.home_url + '/images/icon-scircle-b.png', iconRetinaUrl: WY.constants.home_url + '/images/icon-scircle-b@2x.png'});
            scircle_w = new customIcon({iconUrl: WY.constants.home_url + '/images/icon-scircle-w.png', iconRetinaUrl: WY.constants.home_url + '/images/icon-scircle-w@2x.png'});

        // 거의 주석을 달필요성을 못느낌
        if (node.properties.type == "Venue") {
          marker = L.marker(L.latLng(node.geometry.coordinates[1], node.geometry.coordinates[0]), {
            icon: scircle_b,
            riseOnHover: true
          });

        } else if (node.properties.type == "Project") {
          marker = L.marker(L.latLng(node.geometry.coordinates[1] + randomBetween(-0.005, 0.005), node.geometry.coordinates[0] + randomBetween(-0.005, 0.005)), {
            icon: circle_w,
            riseOnHover: true
          });

        } else if (node.properties.type == "Artwork") {
          marker = L.marker(L.latLng(node.geometry.coordinates[1] + randomBetween(-0.02, 0.02), node.geometry.coordinates[0]  + randomBetween(-0.02, 0.02)), {
            icon: diamond_b,
            riseOnHover: true
          });
          
        } else if (node.properties.type == "Artist") {
          marker = L.marker(L.latLng(node.geometry.coordinates[1], node.geometry.coordinates[0]), {
            icon: scircle_w,
            riseOnHover: true
          });

        }




        var marker_node = new WY.models.MarkerNode({
          properties: node.properties, 
          marker: marker
        });


        this.graph.addNode(node.properties.id, marker_node);

        this.map.addLayer(marker);

        // if (node.properties.permalink == undefined) { debugger; }
        marker.on('mouseover', _.bind(function(e){

            var popup = L.popup({
                          closeOnCilck: true
                        })
                       .setLatLng(e.latlng)
                       .setContent(this.popup_tmpl[node.properties.type](node.properties))
                       .openOn(this.map);



        }, this));





      }, this));
        
      _.each(this.data.links, _.bind(function(link){ 
        
        var from_latlng = this.graph.getNode(link.source).data.marker.getLatLng();
        var to_latlng = this.graph.getNode(link.target).data.marker.getLatLng();
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
          // debugger;
          polyline = L.polyline([from_latlng, to_latlng], {
            color: '#000',
            weight: 1,
            opacity: 0.1//,
            // dashArray
            // dashArray: "0.1, 10",
            // lineCap: "round"
          }).addTo(this.map);

        } 



        var link = this.graph.addLink(link.source, link.target, {line: polyline});

      }, this));
      
      this.animate();
      
      $("body").on("click", ".popup_btn", function(e){
        e.preventDefault();

        History.pushState({
          permalink: $(e.target).data('permalink')
        }, "Loading...", $(e.target).attr('href'));

      });

    },

    animate: function () {
      requestAnimationFrame(this.animate);

      this.graph.forEachNode(_.bind(function(node){
        
        if (node.data.is("Project")) {
          
          this.graph.forEachLinkedNode(node.id, function (target_node) {
            
            if (target_node.data.is("Venue")) {
              var force = new THREE.Vector2().subVectors(node.data.location, target_node.data.location);

              var d = force.length();
              var stretch = d - 0.01;

              force.normalize();
              force.multiplyScalar(-1 * 0.01 * stretch);

              node.data.apply_force(force);

              node.data.update();
            } 

          });



        } else if (node.data.is("Artwork")) {
           this.graph.forEachLinkedNode(node.id, function (target_node) {
            
            if (target_node.data.is("Project")) {
              var force = new THREE.Vector2().subVectors(node.data.location, target_node.data.location);

              var d = force.length();
              var stretch = d - 0.03;

              force.normalize();
              force.multiplyScalar(-1 * 0.01 * stretch);

              node.data.apply_force(force);
              node.data.update();

            } 

          });
        }


      }, this));

  
      this.graph.forEachLink(_.bind(function(link){
        var source = this.graph.getNode(link.fromId);
        var target = this.graph.getNode(link.toId);
        link.data.line.setLatLngs([source.data.marker.getLatLng(), target.data.marker.getLatLng()]);
      }, this));


    },

    city_pan_to: function(latlng) {
      console.log(latlng);
      this.map.panTo(latlng);
      this.map.setZoom(13);
    },

    set_map_height: function(height){
      $('#map-container, #map-outer').height(height);
      this.map.invalidateSize();
    },

    update_bound: function(permalink){
      // this.fitBounds(
      var node = _.find(this.graph.getAllNodes(), function(node){ return node.data.properties.permalink == permalink; });
      // debugger;
      var path = this.find_bound_path(node);

      var input = {
        "type": "FeatureCollection",
        "features": _.map(path.nodes, function(node){
          return {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Point",
              "coordinates": [node.data.marker._latlng.lng, node.data.marker._latlng.lat]
            }
          }
        })
      };

      var bbox = turf.extent(input);
      
      this.map.fitBounds([
        [bbox[1], bbox[0]],
        [bbox[3], bbox[2]]
      ]);


      _.each(this.active_popups, _.bind(function(popup){
        this.map.removeLayer(popup);
      }, this));

      this.active_popups = [];

      _.each(path.nodes, _.bind(function(node){

        if (node.data.properties.venue_name_ko == "문화역 서울 284") {
            var popup = L.popup({
                          closeOnCilck: true
                        })
                       .setLatLng(node.data.marker._latlng)
                       .setContent(this.popup_tmpl["284"](node.data.properties));
                       // .openOn(this.map);
            

        } else {

          var popup = L.popup({
                        closeOnCilck: true
                      })
                     .setLatLng(node.data.marker._latlng)
                     .setContent(this.popup_tmpl[node.data.properties.type](node.data.properties));
                     // .openOn(this.map);

        }

        this.map.addLayer(popup);
        this.active_popups.push(popup);
      }, this));

    },


    find_bound_path: function(node) {
      switch (node.data.properties.type) {
        case "Artist":
          return this.find_artist_path(node);
          break;
        case "Project":
          return this.find_project_path(node);
          break;
        case "Venue":
          return this.find_venue_path(node);
          break;
      }
    },


    find_venue_path: function(current_node){
      var path = {
        nodes: [current_node]
      };

      var _graph = this.graph;
      var want_type = "Project";

      var result_links = _.filter(current_node.links, function(link) {
        var target_id = link.fromId == current_node.id ? link.toId : link.fromId;
        return _graph.getNode(target_id).data.properties.type == want_type;
      });

      _.each(result_links, function(link){
        var target_id = link.fromId == current_node.id ? link.toId : link.fromId;
        path.nodes.push(_graph.getNode(target_id));
      });

      path.links = result_links;

      return path;    
    },

    find_project_path: function(current_node){
      var path = {
        nodes: [current_node]
      };

      var _graph = this.graph;
      var want_type = "Artwork";

      var result_links = _.filter(current_node.links, function(link) {
        var target_id = link.fromId == current_node.id ? link.toId : link.fromId;
        return _graph.getNode(target_id).data.properties.type == want_type;
      });

      _.each(result_links, function(link){
        var target_id = link.fromId == current_node.id ? link.toId : link.fromId;
        path.nodes.push(_graph.getNode(target_id));
      });

      path.links = result_links;

      return path;
    },

    find_artist_path: function(current_node) {
      // TODO : artwork 여러개면...복자배지는군
      // 
      var path = {
        nodes: [current_node],
        links: []
      };

      var _graph = this.graph;

      function visit_and_find(node, want_type) {
        var result_link = _.find(node.links, function(link) {
          var target_id = link.fromId == node.id ? link.toId : link.fromId;
          return _graph.getNode(target_id).data.properties.type == want_type;
        });

        var result_node = _graph.getNode(result_link.fromId == node.id ? result_link.toId : result_link.fromId);

        path.nodes.push(result_node);
        path.links.push(result_link);
        return result_node;
      }

      artwork_node = visit_and_find(current_node, "Artwork");
      project_node = visit_and_find(artwork_node, "Project");
      visit_and_find(project_node, "Venue");

      return path;
    }
  };

  return MapManager;
})();
