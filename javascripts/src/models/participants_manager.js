WY.models.ParticipantsManager = (function(){
  function ParticipantsManager(params){
    this.el = params.el;
    this.tmpl;
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
      this.el.append($(this.tmpl(this.data)));
      this.el.columnize({  width:250, lastNeverTallest: true});
    }
  };

  return ParticipantsManager;
})();
