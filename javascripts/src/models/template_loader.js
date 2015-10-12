WY.models.TemplateLoader = (function(){
  function TemplateLoader(params){
    this.lists = params.lists;
    this.tmpl = {};

    _.extend(this, Backbone.Events);
  }

  TemplateLoader.prototype = {
    load: function(){
      var expectedFiles = this.lists.length

      var loadedFiles = 0;

      function makeCallback( name ){
        return function(data){
          
          this.tmpl[name] = _.template(data);

          //  check if done
          loadedFiles++;
          if( loadedFiles == expectedFiles ){       
            this.trigger("load_complete", {tmpl: this.tmpl});
          }

        };
      }
      
      for( var i = 0; i < this.lists.length; i++ ){
        $.ajax({
          type: 'GET',
          url: this.lists[i].url,
          success: _.bind(makeCallback(this.lists[i].name), this) 
        });
      }
    }
  };

  return TemplateLoader;
})();


