var selectedCity;

function cityClass(name) {
  d3.select(".selected").classed("selected", false);
  selectedCity = name;
  d3.selectAll(".Mcity")
    .classed("selected", function(d) {return d.properties.Name == name;})
    .transition().duration(300);
  d3.selectAll(".Tcounty")
    .classed("selected", function(d) {return d.County == name;})
    .transition().duration(300);
}

d3.json("CPAD_percity.json", function(err, ca) {

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
      .attr("class", "bubble")
      .selectAll("circle")
      .attr("d", d3.geo.path().projection(projection))
      .data(topojson.feature(ca, ca.objects.CPAD_cities).features)
      .sort(function(a, b) { return b.properties.ac_tot - a.properties.ac_tot; })
      .enter()
      .append("circle")
      .attr("class", "geo")
      .attr("transform", function(d) { return "translate(" + cityPoints.centroid(d) + ")"; })
      .attr("r", 4)
      .style("fill", "black")
      .style("opacity", 0.6)
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
      updateCityTot(d3.format(",")(d.properties.ac_tot));
      updateCityInh(d3.format(",")(d.properties.POP_NORM));
  });

      var legend = d3.select("#cityMapSvg")
          .append("g")
          .attr("class", "mapLegend")
          .attr("class", "legend")
          .attr("transform", "translate(" + 30 + "," + (height - 80) + ")")
          .selectAll("g")
          .data([30e3, 100e3])
          .enter()
          .append("g")
          .style("display", "none");

      legend.append("circle")
          .attr("cy", function(d) { return - radius(d); })
          .attr("r", radius);

      legend.append("text")
          .attr("y", function(d) { return - 2 * radius(d); })
          .attr("dy", "1.3em")
          .style("text-anchor", "middle")
          .text(d3.format(".1s"));

d3.selectAll(".radioCity").on("change", function(){

if (document.getElementById("ac_totCity").checked) {
        cities.transition().duration(250)
             .style("fill", "#239743")
             .style("stroke", "#239743")
             .style("opacity", 0.8)
             .attr("r", function (d) { return radius(d.properties.ac_tot)*2})
        legend.transition().duration(300).style("display", null);
             }

else if (document.getElementById("POP_NORMCity").checked) {
        cities.transition().duration(250)
             .style("fill", "#239743")
             .style("stroke", "#239743")
             .style("opacity", 0.8)
             .attr("r", function (d) { return radius(d.properties.POP_NORM)*8})
        legend.transition().duration(300).style("display", null);
             }
           });

});
