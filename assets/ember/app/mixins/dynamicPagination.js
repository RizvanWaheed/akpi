var get = Ember.get, set = Ember.set;

Ember.DynamicPaginationMixin = Ember.Mixin.create({
  /*firstPage:1,
  lastPage:1,*/
  totalPages: (function() {
    return Math.ceil(this.get('length') / this.get('perPage'));
  }).property('length', 'perPage'),

  pages: (function() {
    var seperator = this.get('seperator'),
        current = this.get('page'),
        count = this.get('totalPages'),
        countOut = this.get('countOut'),
        countIn = this.get('countIn'),
        result = [],
        i;
      // Beginning group of pages: n1...n2
    var n1 = 1;
    var n2 = Math.min(countOut, count);

    // Ending group of pages: n7...n8
    var n7 = Math.max(1, (count - countOut + 1));
    var n8 = count;

    // Middle group of pages: n4...n5
    var n4 = Math.max(n2 + 1, current - countIn);
    var n5 = Math.min(n7 - 1, current + countIn);
    var useMiddle = (n5 >= n4);

    // Point n3 between n2 and n4
    var n3 = Math.floor((n2 + n4) / 2);
    var useN3 = (useMiddle && ((n4 - n2) > 1));

    // Point $n6 between $n5 and $n7
    var n6 = Math.floor((n5 + n7) / 2);
    var useN6 = (useMiddle && ((n7 - n5) > 1));

    var links = [];

    // Generate links data in accordance with calculated numbers
    for (var n = n1; n <= n2; n++) {
      links[n] = n;
    }

    if (useN3) {
      links[n3] = seperator;
    }

    for (i = n4; i <= n5; i++) {
      links[i] = i;
    }

    if (useN6) {
      links[n6] = seperator;
    }

    for (i = n7; i <= n8; i++) {
      links[i] = i;
    }


    links.forEach(function (content, number) {
      console.log(content);
      result.pushObject(Ember.Object.create({
            number: content
        }));
    });

    return result;



    /*  var collection = Ember.A();
        //Todo All calculation for Pagination pager
      for(var i = 0; i < this.get('totalPages'); i++) {
        collection.pushObject(Ember.Object.create({
            number: i + 1
        }));
      }
    
      return collection; */     
  }).property('totalPages', 'page'),

  hasPages: (function() {
      return this.get('totalPages') > 1;
  }).property('totalPages'),
    
  prevPage: (function() {
      var page = this.get('page');
      var totalPages = this.get('totalPages');
      
      if(page > 1 && totalPages > 1) {
        return page - 1;
      } else {
        return null;
      }
  }).property('page', 'totalPages'),
  
  nextPage: (function() {
      var page = this.get('page');
      var totalPages = this.get('totalPages');
      
      if(page < totalPages && totalPages > 1) {
        return page + 1;
      } else {
        return null;
      }
  }).property('page', 'totalPages'),
  
  paginatedContent: (function() {
      var start = (this.get('page') - 1) * this.get('perPage');
      var end   = start + this.get('perPage');
      //console.log(this.get('model').get('length'));
        //return this.get('arrangedContent');//.slice(start, end);
        return Ember.A();
        //return this.store.all('myptptasks').get('content').slice(start, end);
  }).property('page', 'totalPages', 'arrangedContent.[]')

});