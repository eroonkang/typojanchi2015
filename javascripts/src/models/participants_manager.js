WY.models.ParticipantsManager = (function(){
  function ParticipantsManager(params){
    this.el = params.el;
    this.tmpl;
    this.inner_dom;
    this.data;
  }

  ParticipantsManager.prototype = {
    init_tmpl: function(tmpl){
      this.tmpl = tmpl;
    },

    init_data: function(data){
      this.data = data;
    },

    init: function(){
      this.inner_dom = $(this.tmpl(this.data))
    },

    append_dom: function(){
      if (!_.isUndefined(this.inner_dom)){
        this.el.append(this.inner_dom);
        this.el.columnize({  width:250, lastNeverTallest: true});
      }
    }
  };

  return ParticipantsManager;
})();
