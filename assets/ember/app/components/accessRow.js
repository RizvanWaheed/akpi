telenor.AccessRowComponent = Ember.Component.extend({
  tagName: 'tr',
  attributeBindings:['isCheck:checked'],
  isCheck: function() {
    return this.get('childViews').anyBy('isChecked');
  }.property('childViews.@each.isChecked')
 // classNameBindings: ['treeview'],
 // treeview:'treeview'
});