
// WY.constants.balloon_force_location = ;

WY.models.MapManager = (function(){
  function MapManager(params){


    this.el_name = params.el_name;
    this.map;
    this._is_detail = false;
    this.map_address = {
      en: "https://b.tiles.mapbox.com/v4/mathpractice.ef398e06/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoibWF0aHByYWN0aWNlIiwiYSI6ImNpZ2hhN2Y2eDg1Y2t2Ym04M3p0emMyMHIifQ.1Nnnb5bqrFXHpdjw5A132A",
      ko: 'https://a.tiles.mapbox.com/v4/eroon26.36545472/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiZXJvb24yNiIsImEiOiJjaWY3cWhsbnkweGVuczNrcnZoNHB4dGhoIn0.oFbWC28lxCKcOIDiffQZuw'
    };

    this.data;
    this.markers = [];
    this.oms;
    this.graph = createGraph();
    this.active_popups = [];


    this.popup_offset_by_type = {
      venue: -3,
      project: -14,
      artwork: -14,
      artist: -3
    };

    _.extend(this, Backbone.Events);
    _.bindAll(this, "load_complete_handler", "animate");
  }

  MapManager.prototype = {
    init: function(){
      this.map = L.map(this.el_name, {
        zoomControl: true
      }).setView([37.56131657517743, 126.97120428085327], 15);
      WY.constants.map = this.map;
      
      L.tileLayer(this.map_address[WY.constants.locale], {
        attribution: '<a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      this.map.scrollWheelZoom.disable();
      // new L.Control.Zoom({ position: 'topright' }).addTo(this.map);

      this.load();
    },
    
    is_detail: function(){
      return this._is_detail;
    },

    set_detail: function(_detail){
      this._is_detail = _detail;
    },

    load: function(){
      $.ajax({
        type: 'GET',
        url: WY.constants.home_url + '/projects/locations.json',
        success: this.load_complete_handler
      })
    },

    reset: function(){
      this.remove_all_popups();
      this.set_map_height(WY.constants.screen_height);
      this.restore_opacity_graph();
      this.map.setView([37.56111657517743, 126.97120428085327], 15);
    },

    load_complete_handler: function(data){
      this.data = data;


      this.map.on('click', _.bind(function(e){
        this.show_all_popups();
      }, this));

      this.popup_tmpl = {
        'Artist': _.template('<span data-link="<%= url_from_permalink(permalink) %>" data-permalink="<%= permalink %>" class="popup_btn"><%= full_name_' + WY.constants.locale + ' %></a>'),
        'Artwork': _.template('<span data-link="<%= url_from_permalink(permalink) %>" data-permalink="<%= permalink %>" class="popup_btn"><%= artwork_name_' + WY.constants.locale + ' %></a>'),
        'Project': _.template('<span data-link="<%= url_from_project_name(idx, project_name_en) %>" data-permalink="<%= idx + "-" + conv_to_slug(project_name_en) %>" class="popup_btn"><%= "(" + idx + ") "+ project_name_' + WY.constants.locale + ' %></a>'),
        'Venue': _.template('<span data-link="<%= url_from_permalink(permalink) %>" data-permalink="<%= permalink %>" class="popup_btn"><%= venue_name_' + WY.constants.locale +  ' %></a>'),
        '284': _.template('<span data-link="284"><%= venue_name_' + WY.constants.locale +  ' %></a>')
      }

      // var geojsonMarkerOptions = ;


      var customIcon = L.Icon.extend({
          options: {
              iconSize:     [40, 40],
              iconAnchor:   [20, 20],
              popupAnchor:  [0, -20],
          }
      });

      var project_icons = {};

      _.each(_.range(1, 18), function(i){

        var project_icon = L.divIcon({
          className: 'project_icon',
          html: '(' + i + ')',
          iconSize:     [40, 32],
          iconAnchor:   [20, 20],
          popupAnchor:  [0, -40],
        });
        
        project_icons[i] = project_icon;
      });

      var artwork_icon = L.divIcon({
        className: 'artwork_icon',
        iconSize:     [40, 40],
        iconAnchor:   [20, 20],
        popupAnchor:  [0, -40],
      });

      var venue_icon = L.divIcon({
        className: 'venue_icon',
        iconSize:     [14, 14],
        iconAnchor:   [7, 7],
        popupAnchor:  [0, -7],
      });

      var artist_icon = L.divIcon({
        className: 'artist_icon',
        iconSize:     [10, 10],
        iconAnchor:   [5, 5],
        popupAnchor:  [0, -5],
      });



      var circle_w = new customIcon({iconUrl: WY.constants.home_url + '/images/icon-circle-w.png', iconRetinaUrl: WY.constants.home_url + '/images/icon-circle-w@2x.png'}),
          diamond_w = new customIcon({iconUrl: WY.constants.home_url + '/images/icon-diamond-w.png', iconRetinaUrl: WY.constants.home_url + '/images/icon-diamond-w@2x.png'}),
          diamond_b = new customIcon({iconUrl: WY.constants.home_url + '/images/icon-diamond-b.png', iconRetinaUrl: WY.constants.home_url + '/images/icon-diamond-b@2x.png'});
          concentric_w = new customIcon({iconUrl: WY.constants.home_url + '/images/icon-concentric-w.png', iconRetinaUrl: WY.constants.home_url + '/images/icon-concentric-w@2x.png'});
          scircle_b = new customIcon({iconUrl: WY.constants.home_url + '/images/icon-scircle-b.png', iconRetinaUrl: WY.constants.home_url + '/images/icon-scircle-b@2x.png'});
          scircle_w = new customIcon({iconUrl: WY.constants.home_url + '/images/icon-scircle-w.png', iconRetinaUrl: WY.constants.home_url + '/images/icon-scircle-w@2x.png'});

      _.each(this.data.nodes.features, _.bind(function (node) {
        var marker;


        // 거의 주석을 달필요성을 못느낌
        if (node.properties.type == "Venue") {
          marker = L.marker(L.latLng(node.geometry.coordinates[1], node.geometry.coordinates[0]), {
            icon: venue_icon,
            riseOnHover: true
          });

        } else if (node.properties.type == "Project") {
          marker = L.marker(L.latLng(node.geometry.coordinates[1] + randomBetween(-0.01, 0.01), node.geometry.coordinates[0] + randomBetween(-0.01, 0.01)), {
            icon: project_icons[node.properties.idx],
            riseOnHover: true
          });

          marker.setZIndexOffset(500);

        } else if (node.properties.type == "Artwork") {
          marker = L.marker(L.latLng(node.geometry.coordinates[1] + randomBetween(-0.01, 0.01), node.geometry.coordinates[0]  + randomBetween(-0.01, 0.01)), {
            icon: artwork_icon,
            riseOnHover: true
          });
          
        } else if (node.properties.type == "Artist") {
          marker = L.marker(L.latLng(node.geometry.coordinates[1], node.geometry.coordinates[0]), {
            icon: artist_icon,
            riseOnHover: true
          });

        }




        var marker_node = new WY.models.MarkerNode({
          properties: node.properties, 
          marker: marker
        });


        var g_node = this.graph.addNode(node.properties.id, marker_node);

        this.map.addLayer(marker);
        
        marker.on('mouseover', _.bind(function(e){
          this.hide_all_popups();
          var content;

          if (node.properties.venue_name_ko == "문화역 서울 284"){
            content = this.popup_tmpl['284'](node.properties);
          } else {
            content = this.popup_tmpl[node.properties.type](node.properties);
          }

          var popup = L.popup({
                        closeOnCilck: true,
                        autoPan: false,
                        className: "mouse-interact-popup popup-" + node.properties.type.toLowerCase(),
                        offset: L.point([0, this.popup_offset_by_type[node.properties.type.toLowerCase()]])
                      })
                     .setLatLng(e.latlng)
                     .setContent(content);

          this.map.addLayer(popup);
          popup.node_id = g_node.id;

          this.active_popups.push(popup);

        }, this));

        marker.on('mouseout', _.bind(function(e){
          this.show_all_popups();
        }, this));

        marker.on('click', _.bind(function(e){
          // alert("dd");
          this.update_bound(node.properties.permalink);
        }, this));




      }, this));
        
      _.each(this.data.links, _.bind(function(link){ 
        
        var from_latlng = this.graph.getNode(link.source).data.marker.getLatLng();
        var to_latlng = this.graph.getNode(link.target).data.marker.getLatLng();
        var polyline;
        
        var source = this.graph.getNode(link.source);
        var target = this.graph.getNode(link.target);
        // debugger;
        if ((source.data.properties.type == "Artist" && target.data.properties.type == "Project") || 
            (source.data.properties.type == "Project" && target.data.properties.type == "Artist")) {
          polyline = L.polyline([from_latlng, to_latlng], {
            color: '#000',
            weight: 1,
            opacity: 1
          }).addTo(this.map);
        } else if ((source.data.properties.type == "Venue" && target.data.properties.type == "Project") || 
            (source.data.properties.type == "Project" && target.data.properties.type == "Venue")) {
          polyline = L.polyline([from_latlng, to_latlng], {
            color: '#000',
            weight: 1,
            opacity: 1
          }).addTo(this.map);
        } else if ((source.data.properties.type == "Project" && target.data.properties.type == "Artwork") || 
                   (source.data.properties.type == "Artwork" && target.data.properties.type == "Project")) {
          
          polyline = L.polyline([from_latlng, to_latlng], {
            color: '#000',
            weight: 1,
            opacity: 1,
            // dashArray: "0.1, 10",
            // lineCap: "round"
          }).addTo(this.map);

        } else if ((source.data.properties.type == "Artwork" && target.data.properties.type == "Artist") || 
                   (source.data.properties.type == "Artist" && target.data.properties.type == "Artwork")) {
          // debugger;
          polyline = L.polyline([from_latlng, to_latlng], {
            color: '#000',
            weight: 1,
            opacity: 0//,
            // dashArray
            // dashArray: "0.1, 10",
            // lineCap: "round"
          }).addTo(this.map);

        } 



        var link = this.graph.addLink(link.source, link.target, {line: polyline});

      }, this));
      

      
      $(".leaflet-control-zoom a").click(_.bind(function(e){
        if (!this.is_detail()){
            this.animate();
        
          _.delay(_.bind(function(){
            this.stop_animate();
          }, this), 3000);
        }      
      
      }, this));



      $("body").on("click", ".leaflet-popup-content-wrapper", function(e){
        e.preventDefault();

        var permalink = $(e.currentTarget).find("span").data('permalink');
        var href = $(e.currentTarget).find("span").data('link');
        if (href != "284") {

          History.pushState({
            permalink: permalink
          }, "Loading...", href);

        }
      });

      $("body").on("mouseover", ".leaflet-popup", function(e){
        e.preventDefault();

        $(".leaflet-popup").css({
          "z-index": 0
        });

        $(e.currentTarget).css({
          "z-index": 1
        });

      });

      this.trigger('load_complete');

      
      this.animate();

      _.delay(_.bind(function(){
        this.stop_animate();

        if (!_.isUndefined(this.permalink)) {
          var _permalink = this.permalink;
          // var node = _.find(this.graph.getAllNodes(), function(node){ return node.data.properties.permalink == _permalink; });
          // debugger;
          this.update_bound(this.permalink);
          // this.fit_bound_to_path(node);

        }
      }, this), 5000);

      this.init_custom_marker();

    },

    init_custom_marker: function(){

    }
    
    stop_animate: function(){
      cancelAnimationFrame(this.req_id);
      this.req_id = undefined;
    },

    animate: function () {
      this.req_id = requestAnimationFrame(this.animate);
      var zoom = constrain(this.map.getZoom(), 13, 18);

      var bbz = WY.constants.balloon_by_zoom[zoom];

      _.each(this.active_popups, _.bind(function(popup, i){
        var node = this.graph.getNode(popup.node_id);
        popup.setLatLng(node.data.marker._latlng);
      }, this));

      this.graph.forEachNode(_.bind(function(node){
        
        if (node.data.is("Project")) {
          if (node.data.properties.idx != 7 && node.data.properties.idx != 5) { // 파티는 여기 붙을 필요없음
            this.graph.forEachNode(function(target_node){
              if (target_node.data.is("Project") && (target_node.data.properties.idx != 7 && target_node.data.properties.idx != 5)){

                var force = new THREE.Vector2().subVectors(node.data.location, target_node.data.location);
                // debugger;
                var d = force.length();
                var stretch = d - bbz.d_p;

                force.normalize();
                force.multiplyScalar(-1 * 0.01 * stretch);

                node.data.apply_force(force);
                node.data.update();

              }
            });

            var balloon_force = new THREE.Vector2().subVectors(node.data.location, bbz.upper_force);

            var d = balloon_force.length();
            var stretch = d - bbz.d_p;

            balloon_force.normalize();
            balloon_force.multiplyScalar(-1 * 0.01 * stretch);

            node.data.apply_force(balloon_force);
            node.data.update();


          }

          this.graph.forEachLinkedNode(node.id, function (target_node) {
            
            if (target_node.data.is("Venue")) {
              var force = new THREE.Vector2().subVectors(node.data.location, target_node.data.location);

              var d = force.length();
              var stretch = d - bbz.d_pv;

              force.normalize();
              force.multiplyScalar(-1 * 0.008 * stretch);

              node.data.apply_force(force);
              node.data.update();

            } 

          });
        

        } else if (node.data.is("Artwork")) {

          this.graph.forEachLinkedNode(node.id, _.bind(function (target_node) {
            
            if (target_node.data.is("Project")) {// && target_node.data.properties.idx != 7) {
              var force = new THREE.Vector2().subVectors(node.data.location, target_node.data.location);

              var d = force.length();
              var stretch = d - bbz.d_ap;

              force.normalize();
              force.multiplyScalar(-1 * 0.008 * stretch);

              node.data.apply_force(force);
              node.data.update();

              this.graph.forEachLinkedNode(target_node.id, function (other_artwork_node) {
                if (other_artwork_node.data.properties.type == "Artwork" && other_artwork_node.id != node.id) {
                  var force = new THREE.Vector2().subVectors(node.data.location, other_artwork_node.data.location);

                  var d = force.length();
                  var stretch = d - bbz.d_a;

                  force.normalize();
                  force.multiplyScalar(-1 * 0.008 * stretch);

                  node.data.apply_force(force);
                  node.data.update();
                  force.multiplyScalar(-1);

                  other_artwork_node.data.apply_force(force);
                  other_artwork_node.data.update();
                }
              });

            } 

          }, this));
        }


      }, this));

  
      this.graph.forEachLink(_.bind(function(link){
        var source = this.graph.getNode(link.fromId);
        var target = this.graph.getNode(link.toId);


        if (_.isUndefined(link.data.line)) { debugger; }
        link.data.line.setLatLngs([source.data.marker.getLatLng(), target.data.marker.getLatLng()]);
      }, this));


    },

    city_pan_to: function(latlng, zoom) {
      // console.log(latlng);
      this.map.panTo(latlng);
      this.map.setZoom(zoom);
    },

    set_map_height: function(height){
      if (height == WY.constants.screen_height) {
        $("#map-expander").hide();
      } else {
        $("#map-expander").show();
      }


      $('#map-container, #map-outer').height(height);
      this.map.invalidateSize();
      
      // $('#map-container, #map-outer').animate({
      //   height: height
      // }, 400, _.bind(function(e){

      //   this.map.invalidateSize();
      // }, this)); 

    },

    show_all_popups: function(){
      for (var i = 0; i < this.active_popups.length; i++) {
        var popup = this.active_popups[i];
        
        if ($(popup._container).hasClass("mouse-interact-popup")) {
          this.map.removeLayer(popup);
          this.active_popups.splice(i, 1);
        } else {
          $(popup._container).show(); 
        }

      }
    },

    hide_all_popups: function(){
      _.each(this.active_popups, _.bind(function(popup){
        $(popup._container).hide();
      }, this));
    },

    remove_all_popups: function(){

      _.each(this.active_popups, _.bind(function(popup){
        this.map.removeLayer(popup);
      }, this));
      this.active_popups = [];
    
    },

    fit_bound_to_path: function(node){
        // 노드 타입을 보고 
      // 프로젝트일 경우 permalink_path의 node타입 검사 -> artwork만, 
      // 아트워크일 경우 전부
      // 아티스트일 경우 전부 
      // 베뉴일 경우 permalink path의 node타입 검사 -> project만.

      var filtered_nodes;

      switch(node.data.properties.type) {
        case "Venue":
          var linked_node_type = "Project"

          // if (node.data.properties.idx == 5){
          //   linked_node_type = "Project";
          // } else {
          //   linked_node_type = "Artwork";
          // }

          filtered_nodes = _.filter(this.permalink_path.nodes, function(_node){ 
            return _node.data.properties.type == linked_node_type || _node.data.properties.permalink == node.data.properties.permalink;
          });
          break;
        case "Project":
          var linked_node_type;

          if (node.data.properties.idx >= 12 ||  node.data.properties.idx == 7) { 
            linked_node_type = "Artist"; 
          } else if (node.data.properties.idx == 5){
            linked_node_type = "Venue";
          } else {
            linked_node_type = "Artwork";
          }

          filtered_nodes = _.filter(this.permalink_path.nodes, function(_node){ 
            return _node.data.properties.type == linked_node_type || _node.data.properties.permalink == node.data.properties.permalink;
          });
          // debugger;
          break;
        default:
          filtered_nodes = this.permalink_path.nodes;
          break;
      }

      var input = {
        "type": "FeatureCollection",
        "features": _.map(filtered_nodes, function(node){
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
      // var bbox_poly = turf.bboxPolygon(bbox);
      // _.delay(_.bind(function(){

        this.map.fitBounds([
          [bbox[1], bbox[0]],
          [bbox[3], bbox[2]]
        ], {
          padding: [100, 100]
        });

        // L.geoJson(bbox_poly, {
        //     style: {
        //       color: "#FF0000"
        //     }
        // }).addTo(this.map);
      // }, this), 20000);
      // 
    },

    update_bound: function(permalink){
      this.permalink = permalink;
      this.stop_animate();
      // this.fitBounds(
      this.map.invalidateSize();
      var node = _.find(this.graph.getAllNodes(), function(node){ return node.data.properties.permalink == permalink; });
      // debugger;
      this.permalink_path = this.find_bound_path(node);
      this.fit_bound_to_path(node);


      this.remove_all_popups();

      _.each(this.permalink_path.nodes, _.bind(function(node){
        var popup = L.popup({
                          closeOnClick: false,
                          autoPan: false,
                          offset: L.point([0, this.popup_offset_by_type[node.data.properties.type.toLowerCase()]]),
                          className: "popup-" + node.data.properties.type.toLowerCase()
                        });

        if (node.data.properties.venue_name_ko == "문화역 서울 284") {
          popup.setLatLng(node.data.marker._latlng)
               .setContent(this.popup_tmpl["284"](node.data.properties));
            
        } else {
          popup.setLatLng(node.data.marker._latlng)
               .setContent(this.popup_tmpl[node.data.properties.type](node.data.properties));
        }
        popup.node_id = node.id;

        this.map.addLayer(popup);
        this.active_popups.push(popup);
      }, this));

      this.graph.forEachNode(_.bind(function(node){
        var existed = false;
        _.each(this.permalink_path.nodes, function(target_node){
          if (node.id == target_node.id) {
            existed = true;
          }
        });

        if (!existed) {
          $(node.data.marker._icon).removeClass("selected");
          if (node.data.properties.type == "Project") {
            node.data.marker.setZIndexOffset(500);
          } else {
            node.data.marker.setZIndexOffset(1);
   
          }

        } else {
          $(node.data.marker._icon).addClass("selected");
          // node.data.marker.setZIndexOffset(501);
          if (node.data.properties.type == "Project") {
            node.data.marker.setZIndexOffset(502);
          } else {
            node.data.marker.setZIndexOffset(501);
   
          }
        }
      }, this));

      this.graph.forEachLink(_.bind(function(link){
        var existed = false;
        _.each(this.permalink_path.links, function(target_link){
          if (link.id == target_link.id) {
            existed = true;
          }
        });

        if (!existed) {
          link.data.line.setStyle({
            opacity:0
          });
        } else {
          link.data.line.setStyle({
            opacity:1,
            weight: 2,
          });
        }
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
        nodes: [current_node],
        links: []
      };


      var _graph = this.graph;
    
      function visit_and_find(node, want_type) {
        var result_links = _.filter(node.links, function(link) {
          var target_id = link.fromId == node.id ? link.toId : link.fromId;
          return _graph.getNode(target_id).data.properties.type == want_type;
        });

        _.each(result_links, function(result_link){
          var result_node = _graph.getNode(result_link.fromId == node.id ? result_link.toId : result_link.fromId);

          path.nodes.push(result_node);
          path.links.push(result_link);
        });

        return path.nodes[path.nodes.length - 1];
      }

      _.each(current_node.links, function(link){
        var result_node = _graph.getNode(link.fromId == current_node.id ? link.toId : link.fromId);

        path.nodes.push(result_node);
        path.links.push(link);
        if (result_node.data.properties.type == "Artwork"){
          visit_and_find(result_node, "Artist");
        }
      });
      return path;
    },

    find_artist_path: function(current_node) {

      var path = {
        nodes: [current_node],
        links: []
      };

      var _graph = this.graph;

      function visit_and_find(node, want_type) {
        var result_links = _.filter(node.links, function(link) {
          var target_id = link.fromId == node.id ? link.toId : link.fromId;
          return _graph.getNode(target_id).data.properties.type == want_type;
        });

        _.each(result_links, function(result_link){
          var result_node = _graph.getNode(result_link.fromId == node.id ? result_link.toId : result_link.fromId);

          path.nodes.push(result_node);
          path.links.push(result_link);
        });

        return path.nodes[path.nodes.length - 1];
      }

      artwork_node = visit_and_find(current_node, "Artwork");
      project_node = visit_and_find(artwork_node, "Project");
      visit_and_find(project_node, "Venue");

      return path;
    },

    restore_opacity_graph: function(){
      this.graph.forEachNode(function(node){
        $(node.data.marker._icon).removeClass("selected");
        if (node.data.properties.type == "Project") {

          node.data.marker.setZIndexOffset(500);
        } else {
          node.data.marker.setZIndexOffset(1);
 
        }
       
      });

      this.graph.forEachLink(_.bind(function(link){
        var source = this.graph.getNode(link.fromId);
        var target = this.graph.getNode(link.toId);

        if ((source.data.properties.type == "Artwork" && target.data.properties.type == "Artist") || 
            (source.data.properties.type == "Artist" && target.data.properties.type == "Artwork")) {
          link.data.line.setStyle({
            opacity: 0,
            weight:1
          });

        } else {
          link.data.line.setStyle({
            opacity: 1,
            weight:1
          });
        }

      }, this));
    }
  };

  return MapManager;
})();
// 