WY.models.MapManager = (function(){
  function MapManager(params){
    this.el_name = params.el_name;
    this.map;
    this.data;
    this.markers = [];
    this.oms;
    this.link;
    this.node;

    _.extend(this, Backbone.Events);
    _.bindAll(this, "load_complete_handler", "reset", "tick");
  }

  MapManager.prototype = {
    init: function(){
      this.map = L.map(this.el_name).setView([37.5558393, 126.9716173], 13);

      L.tileLayer('https://a.tiles.mapbox.com/v4/eroon26.36545472/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiZXJvb24yNiIsImEiOiJjaWY3cWhsbnkweGVuczNrcnZoNHB4dGhoIn0.oFbWC28lxCKcOIDiffQZuw', {
        attribution: '<a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      this.map.scrollWheelZoom.disable();
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

   
      this.init_d3();
    },
    
    init_d3: function() {
      this.svg = d3.select(this.map.getPanes().overlayPane).append("svg")
                 .attr("width", WY.constants.screen_width + 1000)
                 .attr("height", WY.constants.screen_height + 1000);

      this.g = this.svg.append("g").attr("class", "leaflet-zoom-hide");

      var _map = this.map;

      var transform = d3.geo.transform({
        point: function(x, y) {
          // debugger;
          var point = _map.latLngToLayerPoint(new L.LatLng(y, x));

          this.stream.point(point.x, point.y);
        } 
      });

      var extent = turf.extent(turf.featurecollection(this.data.nodes.features));
      this.bbox =  turf.bboxPolygon(extent);

      this.d3path = d3.geo.path().projection(transform);
      this.init_graph();
    },

    init_graph: function() {
      this.force = d3.layout.force()
        .charge(-120)
        .linkDistance(30)
        .size([WY.constants.screen_width, WY.constants.screen_height]);


      this.force.nodes(this.data.nodes.features)
           .links(this.data.links)
           .start();

      this.link = this.svg.selectAll(".link")
          .data(this.data.links)
        .enter().append("line")
          .attr("class", "link")
          // .attr("")
          .style("stroke-width", function(d) { return Math.sqrt(d.value); });

      this.node = this.svg.selectAll(".node")
          .data(this.data.nodes.features)
        .enter().append("circle")
          .attr("class", "node")
          .attr("r", 5)
          .style("stroke", function(d){
            if (d.properties.type == "Artist") {
              return "#000";
            } else {
              return "#FFF";
            }
          })
          .style("fill", function(d) { 
            if (d.properties.type == "Artist") {
              return "#FFF";
            } else if (d.properties.type == "Venue") {
              return "#FF0000";
            } else {
              return "#000";
            }
            
          }).
          on("mouseover", function (d) {
            
          })
          // .call(force.drag);


      this.force.on("tick", this.tick);

      this.map.on("viewreset", this.reset);
      WY.constants.node = this.node;
      // this.reset();
    },

    tick: function () {
      var _map = this.map;

      this.link.attr("x1", function(d) { 
  
        if (d.source.properties.type == "Project" || d.source.properties.is_284) {
          return d.source.x; 
        } else {
          return _map.latLngToLayerPoint(L.latLng(d.source.geometry.coordinates)).x;
        }

      }).attr("y1", function(d) { 
        if (d.source.properties.type == "Project" || d.source.properties.is_284) {
          return d.source.y; 
        } else {
          return _map.latLngToLayerPoint(L.latLng(d.source.geometry.coordinates)).y;
        }

      }).attr("x2", function(d) { 
        if (d.target.properties.type == "Project" || d.target.properties.is_284) {
          return d.target.x; 
        } else {
          return _map.latLngToLayerPoint(L.latLng(d.target.geometry.coordinates)).x;
        }

      }).attr("y2", function(d) { 
        
        if (d.target.properties.type == "Project" || d.target.properties.is_284) {
          return d.target.y; 
        } else {
          return _map.latLngToLayerPoint(L.latLng(d.target.geometry.coordinates)).y;
        }

      });

      this.node.attr("cx", function(d) { 
        if (d.properties.type == "Project" || d.properties.is_284) {
          return d.x; 
        } else {
          return _map.latLngToLayerPoint(L.latLng(d.geometry.coordinates)).x;
        }
      }).attr("cy", function(d) { 
        if (d.properties.type == "Project" || d.properties.is_284) {
          return d.y; 
        } else {
          return _map.latLngToLayerPoint(L.latLng(d.geometry.coordinates)).y;
        }
      });
    
    },

    reset: function (){
      var bounds = this.d3path.bounds(this.bbox),
                    topLeft = bounds[0],
                    bottomRight = bounds[1];        

      // this.svg.attr("width", bottomRight[0] - topLeft[0])
      //      .attr("height", bottomRight[1] - topLeft[1])
      //      .style("left", topLeft[0] + "px")
      //      .style("top", topLeft[1] + "px");
      this.tick();
      this.force.start();
      // this.g.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");
    },

    applyLatLngToLayer: function(d) {
      var y = d.coordinates[1];
      var x = d.coordinates[0];
      return this.map.latLngToLayerPoint(new L.LatLng(y, x));
    }

  };

  return MapManager;
})();
