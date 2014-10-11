var selectedCity = "Sacramento";

function cityClass(name) {
  d3.select(".selectedCity").classed("selectedCity", false);
  selectedCity = name;
  d3.selectAll(".Mcity")
    .classed("selectedCity", function(d) {return d.properties.Name == name;})
    .transition().duration(300);
  d3.selectAll(".Tcity")
    .classed("selectedCity", function(d) {return d.City == name;})
    .transition().duration(300);
}

d3.json("CA_perlargestcities_topo.json", function(err, ca) {

  var height = 500;
  var width = 500;

  var div = d3.select("body").append("div")
  .attr("class", "mapTooltip")
  .style("opacity", 0);

  var radio = d3.select(".ca")
              .append("input")
              .attr("type","Radio")

  var radius = d3.scale.sqrt()
    .domain([0, 50000])
    .range([0, 15]);

  var projection = d3.geo.albers()
      .translate([70, 210])
      .scale(2700)
      .rotate([122.4183, 0])
      .center([0, 37.7750]);

  var cityPoints = d3.geo.path().projection(projection);

  var svg = d3.select("#cityMapSvg");

    svg.append("path")
      .datum(topojson.feature(ca, ca.objects.ca_shape))
      .attr("d", d3.geo.path().projection(projection))
      .style("fill", "LightGray")
      .style("stroke", "grey")
      .style("stroke-width", 0.5);

  var cities = svg.append("g")
      .selectAll("circle")
      .attr("d", d3.geo.path().projection(projection))
      .data(topojson.feature(ca, ca.objects.CA_50LargestCities).features)
      .enter()
      .append("circle")
      .attr("class", "geo")
      .attr("transform", function(d) { return "translate(" + cityPoints.centroid(d) + ")"; })
      .sort(function(a, b) { return b.properties.ac_tot - a.properties.ac_tot; })
      .style("fill", "#1a9850")
      .style("opacity", 0.8)
      .classed("Mcity", true)
      .attr("r", function (d) { return radius(d.properties.ac_tot)*2})
      .classed("selectedCity", function(d) {return selectedCity === d.properties.Name;})
      .on("mouseover", function(d) {
      div.transition().duration(300).style("opacity", 1);
      div.text(d.properties.Name)
      .style("left", (d3.event.pageX) + "px")
      .style("top", (d3.event.pageY -30) + "px");})
      .on("mouseout", function (d) { div.transition().duration(300).style("opacity", 0);})
      .on("click", function(d) {
      selectedCity = d.properties.Name;
      cityClass(d.properties.Name);
      updateCityPie1(d.properties.Name);
      updateCityPie2(d.properties.Name);
      updateCityName(d.properties.Name);
      updateCityTot(d3.format(",")(d3.round(d.properties.ac_tot)),d3.format(",")(d.properties.Tot_Pop));
      updateCityInh(d3.format(",")(d3.round(d.properties.POP_NORM, 1)));
      });

  var legendTot = d3.select("#cityMapSvg")
      .append("g")
      .attr("class", "mapLegend")
      .classed("selectedMapLegend", true)
      .attr("class", "legend")
      .attr("transform", "translate(" + 30 + "," + (height - 80) + ")")
      .selectAll("g")
      .data([30e3, 100e3])
      .enter()
      .append("g");

  legendTot.append("circle")
      .attr("cy", function(d) { return - radius(d); })
      .attr("r", radius);

  legendTot.append("text")
      .attr("y", function(d) { return - 2 * radius(d); })
      .attr("dy", "1.3em")
      .style("text-anchor", "middle")
      .text(function (d) {return d3.format(".1s")(d/3);});

  var legendPop = d3.select("#cityMapSvg")
      .append("g")
      .attr("class", "mapLegend")
      .classed("selectedMapLegend", true)
      .attr("class", "legend")
      .attr("transform", "translate(" + 30 + "," + (height - 80) + ")")
      .selectAll("g")
      .data([30e3, 100e3])
      .enter()
      .append("g")
      .style("display", "none");

  legendPop.append("circle")
      .attr("cy", function(d) { return - radius(d); })
      .attr("r", radius);

  legendPop.append("text")
      .attr("y", function(d) { return - 2.06 * radius(d); })
      .attr("dy", "1.3em")
      .style("text-anchor", "middle")
      .text(function (d) {return d3.format(".1s")(d/1000);});

  var legendText = d3.select("#cityMapSvg").append("legendText:svg")
      .attr("width", 50)
      .attr("height", 30)
      .attr("x", 50)
      .attr("y", 410);

  legendText.append("text")
      .attr("dy",10)
      .style("font-size", "10px")
      .style("fill", "#444")
      .text("Acres");

d3.selectAll(".radioCity").on("change", function(){

  if (document.getElementById("ac_totCity").checked) {
        cities.sort(function(a, b) { return b.properties.ac_tot - a.properties.ac_tot; })
             .transition().duration(600)
             .attr("r", function (d) { return radius(d.properties.ac_tot)*2});
        legendPop.style("display", "none").transition().duration(600);
        legendTot.style("display", null).transition().duration(600);
             }

  else if (document.getElementById("POP_NORMCity").checked) {
        cities.sort(function(a, b) { return b.properties.POP_NORM - a.properties.POP_NORM; })
             .transition().duration(600)
             .attr("r", function (d) { return radius(d.properties.POP_NORM)*30});
        legendTot.style("display", "none").transition().duration(600);
        legendPop.style("display", null).transition().duration(600);
             }
           });
});
