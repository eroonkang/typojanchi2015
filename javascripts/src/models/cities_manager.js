WY.constants.cities_locations = {
  seoul: { 
    latlng: [37.5665350,126.9779690],
    zoom: 13
  },
  london: { 
    latlng: [51.5073510,-0.1277580],
    zoom: 13
  },
  auckland: { latlng: [-36.97677533356128, 174.49172973632812],
    zoom: 12
  },
  stockholm: { latlng: [59.321630202823215, 18.06804656982422],
    zoom: 12
  },
  amsterdam: { latlng: [52.3702160,4.8951680],
    zoom: 13
  },
  tokyo: { latlng: [35.6894870,139.6917060],
    zoom: 13
  },
  osaka: { latlng: [34.6937380,135.5021650],
    zoom: 13
  },
  berlin: { latlng: [52.49835418534738,13.436965942382812],
    zoom: 13
  },
  rotterdam: { latlng: [51.9244200,4.4777330],
    zoom: 13
  },
  porto: { latlng: [41.1579440,-8.6291050],
    zoom: 13
  },
  beijing: { latlng: [39.98336816685067,116.46623611450197],
    zoom: 15
  },
  paris: { latlng: [48.87058654758797,2.3788833618164062],
    zoom: 13
  },
  derby: { latlng: [52.92121991858732, -1.4937973022460938],
    zoom: 13
  },
  gunpo: { latlng: [37.3616700,126.9351740],
    zoom: 13
  },
  los_angeles: { latlng: [34.0522340,-118.2436850],
    zoom: 13
  },
  mexico_city: { latlng: [19.4326080,-99.1332080],
    zoom: 13
  },
  chicago: { latlng: [41.8781140,-87.6297980],
    zoom: 13
  },
  hong_kong: { latlng: [22.2878416,114.1469555],
    zoom: 13
  },
  taipei: { latlng: [25.034127684732052,121.53350830078124],
    zoom: 13
  },
  bangkok: { latlng: [13.7375926,100.5718787],
    zoom: 13
  },
  ho_chi_minh: { latlng: [10.768451,106.6943626],
    zoom: 13
  },
  singapore: { latlng: [1.316912,103.8812698],
    zoom: 13
  },
  basel: { latlng: [47.5595990,7.5885760],
    zoom: 13
  },
  montreuil: { latlng: [48.87024780944447,2.3860931396484375],
    zoom: 13
  },
  homer: { latlng: [59.69993,-151.43849],
    zoom: 13
  },
  daegu: { latlng: [35.81549,128.5138],
    zoom: 13
  },
  new_york: { latlng: [40.7127840,-74.0059410],
    zoom: 13
  },
  paju: { latlng: [37.709967257014945,126.68592453002928],
    zoom: 14
  },
  new_haven: { latlng: [41.3082740,-72.9278840],
    zoom: 13
  },
  ghent: { latlng: [51.0543420,3.7174240],
    zoom: 13
  }
}

WY.models.CitiesManager = (function(){
  function CitiesManager(params){
    this.el = params.el;

    _.extend(this, Backbone.Events);
    _.bindAll(this, "city_btn_click_handler");
  }

  CitiesManager.prototype = {
    init: function(){
      this.el.find(".city_btn").click(this.city_btn_click_handler);
    },

    city_btn_click_handler: function(e){
      e.preventDefault();
      // debugger;
      History.pushState({
        permalink: $(e.currentTarget).data('permalink')
      }, "Loading...", $(e.currentTarget).attr('href'));

    },

    city_pan: function(permalink){
      var dict_name = this.slug_underscore(permalink);
      var latlng = L.latLng(WY.constants.cities_locations[dict_name].latlng);
      $("title").text(this.el.find(".city_btn[data-permalink=" + permalink + "]").text() + " :: Typojanchi 2015 / 4회 국제 타이포그래피 비엔날레");

      // debugger;
      this.trigger('city_pan_to', {latlng: latlng, zoom: WY.constants.cities_locations[dict_name].zoom});
    },

    slug_underscore: function(name) {
      var a = name.split('-');
      a.shift();

      return a.join("_");
    }
  };

  return CitiesManager;
})();
