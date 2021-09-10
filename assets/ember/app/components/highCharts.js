telenor.HighChartsComponent = Ember.Component.extend(telenor.HighchartsThemeMixin, {
  classNames:   [ 'highcharts-wrapper' ],
  content:      undefined,
	chartOptions: undefined,
	drilldown: undefined,
  chart:        null,
  
  buildOptions: Em.computed('chartOptions', 'content.@each.isLoaded', function() {
    var chartContent, chartOptions, defaults;
    chartOptions = this.getWithDefault('chartOptions', {});
    chartContent = this.get('content.length') ? this.get('content') : [
      {
        id: 'noData',
        data: 0,
        color: '#aaaaaa'
      }
		];
		if(Em.isEmpty(this.drilldown)){
			defaults = {
				series: chartContent
			};
		}
		else{
			defaults = {
				series: chartContent,
				drilldown: { series:	this.drilldown }
			};
		}
		console.log('Merge Start');
		console.log(Em.merge(defaults, chartOptions));
		console.log('Merge End');
    return Em.merge(defaults, chartOptions);
  }),
  
  _renderChart: (function() {
    this.drawLater();
    this.buildTheme();
  }).on('didInsertElement'),
  
  contentDidChange: Em.observer('content.@each.isLoaded', function() {
    var chart;
    if (!(this.get('content') && this.get('chart'))) {
      return;
    }
    chart = this.get('chart');
    return this.get('content').forEach(function(series, idx) {
      var _ref;
      if ((_ref = chart.get('noData')) != null) {
        _ref.remove();
      }
      if (chart.series[idx]) {
        return chart.series[idx].setData(series.data);
      } else {
        return chart.addSeries(series);
      }
    });
  }),
  
  drawLater: function() {
    Ember.run.scheduleOnce('afterRender', this, 'draw');
  },
  
  draw: function() {
    var options;
    options = this.get('buildOptions');
    this.set('chart', this.$().highcharts(options).highcharts());
  },
  
  _destroyChart: (function() {
    this._super();
    this.get('chart').destroy();
  }).on('willDestroyElement')
});
