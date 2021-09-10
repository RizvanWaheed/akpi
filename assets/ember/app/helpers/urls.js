Ember.Handlebars.helper('appImageUrl', function(value, options) {
	var escaped = Handlebars.Utils.escapeExpression(value);
	escaped = javaScriptApplicationRoot+escaped;
  	return new Ember.Handlebars.SafeString('<img src="'+ escaped +'" alt="'+ value +'" />');
});
