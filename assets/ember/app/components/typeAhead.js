telenor.TypeAheadComponent = Ember.TextField.extend({
  data: null,
  name: null,
  selection: null,
  minLength: 3,
  
  matcher: function(data, key) {
    var self = this;
    
    return function findMatches(q, cb) {
      
      if (self.get('action')) {
        self.sendAction('action', q);
      }
      
      Ember.run.schedule('actions', function() {
        var matches = [], substrRegex = new RegExp(q, 'i');
        
        var dynamicData = self.get('data');
        
        if (jQuery.isFunction(dynamicData.then)) {
          dynamicData.then(function(data) {
            data.forEach(function(obj) {
              var str = Em.isEmpty(obj.get(key)) ? obj : obj.get(key);
              if (substrRegex.test(str)) {
                var x = {obj: obj};
                x[key] = str;
                matches.push(x);
              }
            });
            
            console.log('matches', matches);
            
            cb(matches);
          });
        } else {
          dynamicData.forEach(function(obj) {
            var str = Em.isEmpty(obj.get(key)) ? obj : obj.get(key);
            if (substrRegex.test(str)) {
              var x = {obj: obj};
              x[key] = str;
              matches.push(x);
            }
          });
          
          cb(matches);
        }
        
      });
      
    };
    
  },
  
  initTypeahead: function() {
    var self = this,
        t = null,
        options = {
          highlight: this.get('highlight'),
          hint: this.get('hint') || false,
          minLength: this.get('minLength')
        },
        dataset = this.get('dataset');
    
    t = this.$().typeahead(options, dataset);
    
    this.set('_typeahead', t);
    
    t.on('typeahead.selected', function(event, item) {
      self.set('selection', item.obj);
    });
    
  },
  
  dataset: function() {
    var self = this,
        content = this.get('data');
    
    if (!content) {
      content = [];
    }
    
    if (jQuery.isFunction(content.then)) {
      content.then(function(data) {
        return self.loadDataset(data);
      });
    } else {
      return self.loadDataset(content);
    }
  }.property(),
  
  loadDataset: function(content) {
    var name = this.get('name') || 'default',
        key = this.get('displayKey') || 'value',
    	engine = new Bloodhound({
                name: this.get('name'),
                datumTokenizer: Bloodhound.tokenizers.whitespace,
                queryTokenizer: Bloodhound.tokenizers.whitespace,
              remote: {
                url: this.get('remoteUrl'),
                filter: function(response) {
                  console.log(response);
                  
                  var resultsArray = [];
                  response.forEach(function(r) {
                    resultsArray.push(Ember.Object.create(r));
                  });
                  
                  return resultsArray;
                }
              }
            });
    return {
      name: name,
      displayKey: key,
      source: this.matcher(content, key)
    };
  },
  
  didInsertElement: function() {
        this._super();
        this.initTypeahead();
    }
});