WY.constants.cities_locations = {
  seoul: [37.5665350,126.9779690],
  london: [51.5073510,-0.1277580],
  auckland: [-36.8484600,174.7633320],
  stockholm: [59.3293230,18.0685810],
  amsterdam: [52.3702160,4.8951680],
  tokyo: [35.6894870,139.6917060],
  osaka: [34.6937380,135.5021650],
  berlin: [52.5200070,13.4049540],
  rotterdam: [51.9244200,4.4777330],
  porto: [41.1579440,-8.6291050],
  beijing: [39.9042110,116.4073950],
  paris: [48.8566140,2.3522220],
  derby: [52.9225300,-1.4746190],
  gunpo: [37.3616700,126.9351740],
  los_angeles: [34.0522340,-118.2436850],
  mexico_city: [19.4326080,-99.1332080],
  chicago: [41.8781140,-87.6297980],
  hong_kong: [22.3964280,114.1094970],
  taipei: [25.0329690,121.5654180],
  bangkok: [13.7563310,100.5017650],
  ho_chi_minh: [10.8230990,106.6296640],
  singapore: [1.3520830,103.8198360],
  basel: [47.5595990,7.5885760],
  montreuil: [48.8638120,2.4484510],
  homer: [59.6425000,-151.5483330],
  daegu: [35.8714350,128.6014450],
  new_york: [40.7127840,-74.0059410],
  paju: [37.70824,126.68672],
  new_haven: [41.3082740,-72.9278840],
  ghent: [51.0543420,3.7174240]
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
      var dict_name = this.slug_underscore($(e.target).text());
      console.log(dict_name);
      var latlng = L.latLng(WY.constants.cities_locations[dict_name]);

      this.trigger('city_pan_to', {latlng: latlng});
    },

    slug_underscore: function(name) {
      return name.split(',')[0]
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'_');
    }
  };

  return CitiesManager;
})();
