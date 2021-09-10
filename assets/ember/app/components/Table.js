telenor.TableComponent = Ember.Component.extend({
  tagName: 'tr',
  classNameBindings:['active'],
  active: function() {
    return this.get('childViews').anyBy('active');
  }.property('childViews.@each.active')
 // classNameBindings: ['treeview'],
 // treeview:'treeview'
});