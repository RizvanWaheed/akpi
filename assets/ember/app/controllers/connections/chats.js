telenor.ChatsController = Ember.ArrayController.extend({
	pageName:'Chats',
	sortProperties: ['complain_name'],
    sortAscending: true,	 // false = descending
	isCloseable:false,
	broadCastMessage:false,
	page: 1,
	perPage: 20,
	pageNew: 1,
	perPageNew: 20,
	pageView: 1,
	perPageView: 20,
	pageClose: 1,
	perPageClose: 20,
	complainCount:0,
	complainCountNew:0,
	complainCountView:0,
	complainCountClose:0,

	totalPages: (function() {
		return Math.ceil(this.get('complainCount') / this.get('perPage'));
	}).property('complainCount', 'perPage'),

	pages: (function() {
    	var collection = Ember.A();
    
    	for(var i = 0; i < this.get('totalPages'); i++) {
     		collection.pushObject(Ember.Object.create({
	     	   	number: i + 1
	     	}));
    	}
    
	    return collection;      
	}).property('totalPages'),

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
        return this.store.all('complains').get('content').slice(start, end);
  	}).property('page', 'totalPages', 'arrangedContent.[]'),
});
telenor.PageController = Ember.ObjectController.extend({
  currentPage: Ember.computed.alias('parentController.page'),
  
  active: (function() {
    return this.get('number') === this.get('currentPage');
  }).property('number', 'currentPage')
});



telenor.ChatController = Ember.ArrayController.extend({
	need:['complains','roles'],
    current_id:'',
    chatUserHead:'',
	action:{
		showData : function(){
			console.log("we have done");
		},
		
	}/**/
	

});