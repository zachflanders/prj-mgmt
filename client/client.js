Router.configure({
  layoutTemplate: 'layout'
});

Router.onBeforeAction(function() {
  if (! Meteor.userId()) {
    this.layout('layout');
    this.render('home');
  }
  else {
    this.layout(Router.lookupLayoutTemplate());
    this.next();
  }
});



UI.registerHelper('formatCurrency', function(item) {
  return accounting.formatMoney(item);
});

var makePieChart = function(data, selector){
  var width = 450;
  height = 200,
  radius = Math.min(width, height) / 2;

  var key = function(d){ return d.data[1]; };

  var color = d3.scale.ordinal()
    .range(["#eeeeee", "#2ecc71"]);

    var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 50);

    var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d[0]; });

    var svg = d3.select(selector).append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width/2 + "," + height / 2 + ")");

      svg.append("g")
      .attr("class", "labels");

  var g = svg.selectAll(".arc")
   .data(pie(data))
   .enter().append("g")
   .attr("class", "arc");

   g.append("path")
    .attr("d", arc)
    .style("fill", function(d) { return color(d.value); });

    var arc = d3.svg.arc()
  .outerRadius(radius * 0.8)
  .innerRadius(radius * 0.4);

var outerArc = d3.svg.arc()
  .innerRadius(radius * 0.9)
  .outerRadius(radius * 0.9);



   var text = svg.select(".labels").selectAll("text")
    .data(pie(data), key);

  text.enter()
    .append("text")
    .attr("dy", ".35em")
    .text(function(d) {
      return d.data[1];
    });

  function midAngle(d){
    return d.startAngle + (d.endAngle - d.startAngle)/2;
  }

  text.transition().duration(1000)
  .attrTween("transform", function(d) {
    this._current = this._current || d;
    var interpolate = d3.interpolate(this._current, d);
    this._current = interpolate(0);
    return function(t) {
      var d2 = interpolate(t);
      var pos = outerArc.centroid(d2);
      pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
      return "translate("+ pos +")";
    };
  })
  .styleTween("text-anchor", function(d){
    this._current = this._current || d;
    var interpolate = d3.interpolate(this._current, d);
    this._current = interpolate(0);
    return function(t) {
      var d2 = interpolate(t);
      return midAngle(d2) < Math.PI ? "start":"end";
    };
  });

text.exit()
  .remove();


}
