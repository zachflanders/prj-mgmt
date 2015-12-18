

Template.project.helpers({
  updates: function(){
    var id = Router.current().params._id;
    console.log(id);
    return Updates.find({projectId: id}, {sort: {date: -1}});
  },
  totalFeeAtCost: function(){
    var projectId = Router.current().params._id;
    var project = Projects.findOne({_id: projectId});
    var latestUpdate = Updates.findOne({projectId: projectId}, {sort:{date:-1}});
    var totalFeeRemainingAtCost = Number(project.totalFee) - (Number(latestUpdate.directLabor) + Number(latestUpdate.directExpense) + Number(latestUpdate.directConsultant));
    return totalFeeRemainingAtCost;
  },
  bnimFeeAtCost: function(){
    var projectId = Router.current().params._id;
    var project = Projects.findOne({_id: projectId});
    var latestUpdate = Updates.findOne({projectId: projectId}, {sort:{date:-1}});
    var bnimFeeRemainingAtCost = Number(project.bnimFee) - (Number(latestUpdate.directLabor) + Number(latestUpdate.directExpense));
    return bnimFeeRemainingAtCost;
  },
  consultantFeeAtCost: function(){
    var projectId = Router.current().params._id;
    var project = Projects.findOne({_id: projectId});
    var latestUpdate = Updates.findOne({projectId: projectId}, {sort:{date:-1}});
    var consultantFeeAtCost = Number(project.consultantFee) - Number(latestUpdate.directConsultant);
    return consultantFeeAtCost;
  },
  totalFeeAtProfit: function(){
    var projectId = Router.current().params._id;
    var project = Projects.findOne({_id: projectId});
    var latestUpdate = Updates.findOne({projectId: projectId}, {sort:{date:-1}});
    var totalRevenueWithProfit = (Number(latestUpdate.directLabor) + Number(latestUpdate.directExpense))/0.7;
    var totalFeeAtProfit = Number(project.totalFee) - totalRevenueWithProfit - Number(latestUpdate.directConsultant);
    return totalFeeAtProfit;
  },
  bnimFeeAtProfit: function(){
    var projectId = Router.current().params._id;
    var project = Projects.findOne({_id: projectId});
    var latestUpdate = Updates.findOne({projectId: projectId}, {sort:{date:-1}});
    var totalRevenueWithProfit = (Number(latestUpdate.directLabor) + Number(latestUpdate.directExpense))/0.7;
    var bnimFeeAtProfit = Number(project.bnimFee) - totalRevenueWithProfit;
    return bnimFeeAtProfit;
  },
  consultantFeeAtProfit: function(){
    var projectId = Router.current().params._id;
    var project = Projects.findOne({_id: projectId});
    var latestUpdate = Updates.findOne({projectId: projectId}, {sort:{date:-1}});
    var consultantFeeAtProfit = Number(project.consultantFee) - Number(latestUpdate.directConsultant);
    return consultantFeeAtProfit;
  },
  analysisAtCostChart: function(selector){
    console.log(selector);


  }


});

Template.project.rendered = function(){
  var projectId = Router.current().params._id;
  var project = Projects.findOne({_id: projectId});
  var latestUpdate = Updates.findOne({projectId: projectId}, {sort:{date:-1}});
  var bnimFeeRemainingAtCost = Number(project.bnimFee) - (Number(latestUpdate.directLabor) + Number(latestUpdate.directExpense));
  var consultantFeeAtCost = Number(project.consultantFee) - Number(latestUpdate.directConsultant);
  var bnimSpent = Number(project.bnimFee) - (bnimFeeRemainingAtCost);
  var data= [[bnimSpent, "BNIM Fee Spent"], [bnimFeeRemainingAtCost, "BNIM Fee Remaining"]];
  var consultantSpent = Number(project.consultantFee) - consultantFeeAtCost;
  var consultantData = [[consultantSpent, "Consultant Fee Spent"], [consultantFeeAtCost, "Consultant Fee Remaining"]];

  var makePieChart = function(data, selector, color){
    var width = 500;
    height = 200,
    radius = Math.min(width, height) / 2;

    var key = function(d){ return d.data[1]; };

    var color = d3.scale.ordinal()
      .range(["#eeeeee", color]);

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
	.attr("class", "slices");
svg.append("g")
	.attr("class", "labels");
svg.append("g")
	.attr("class", "lines");

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

    var polyline = svg.select(".lines").selectAll("polyline")
		.data(pie(data), key);

	polyline.enter()
		.append("polyline");

	polyline.transition().duration(1000)
		.attrTween("points", function(d){
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				var d2 = interpolate(t);
				var pos = outerArc.centroid(d2);
				pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
				return [arc.centroid(d2), outerArc.centroid(d2), pos];
			};
		});

	polyline.exit()
		.remove();


  }

  makePieChart(data, ".chart", "#2ecc71");
  makePieChart(consultantData, ".consultantchart", "#3498db");



}
