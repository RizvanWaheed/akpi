telenor.NavigationBarComponent = Ember.Component.extend({
  tagName: 'li',
  classNameBindings:['active'],
  active: function() {
    return this.get('childViews').anyBy('active');
  }.property('childViews.@each.active')
 // classNameBindings: ['treeview'],
 // treeview:'treeview'
});