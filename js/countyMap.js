var selectedCounty;

function countyClass(name) {
  d3.select(".selectedCounty").classed("selectedCounty", false);
  selectedCounty = name;
  d3.selectAll(".McountyOverlay")
    .classed("selectedCounty", function(d) {return d.properties.name == name;})
    .transition().duration(300);
  d3.selectAll(".Tcounty")
    .classed("selectedCounty", function(d) {return d.County == name;})
    .transition().duration(300);
}

d3.json("caFields11.json", function(err, ca) {

  var div = d3.select("body").append("div")
  .attr("class", "mapTooltip")
  .style("opacity", 0);

  var radio = d3.select(".ca")
              .append("input")
              .attr("type","Radio")

  var colorTOT = d3.scale.linear()
    .domain([30237, 993455, 12867928])
    .range(['rgb(255,245,96)','rgb(215,211,0)','rgb(35,132,67)'])
    .interpolate(d3.interpolateRgb);

  /*var colorTOT = d3.scale.linear()
    .domain([30237, 993455, 12867928])
    .range(['rgb(211,211,211)','rgb(211,255,211)','rgb(35,132,67)'])
    .interpolate(d3.interpolateRgb);*/

  var colorPOP = d3.scale.linear()
    .domain([0.01, 2.08, 368])
    .range(['rgb(255,245,96)','rgb(205,211,0)','rgb(35,132,67)'])
    .interpolate(d3.interpolateRgb);

  var projection = d3.geo.albers()
      .translate([70, 210])
      .scale(2700)
      .rotate([122.4183, 0])
      .center([0, 37.7750]);

  var svg = d3.select("#countyMapSvg");

  var group = svg.selectAll('g')
          .data(topojson.feature(ca, ca.objects.counties2).features)
          .enter()
          .append('g')

  var path = d3.geo.path().projection(projection);

  var LegendW = 80;
      LegendH = 20;

  var svg = d3.select("#countyMapSvg").append("svg:svg")
      .attr("class", "mapLegend")
      .attr("width", LegendW)
      .attr("height", LegendH)
      .attr("x", 0)
      .attr("y", 420);
      //.style("display", "none");

  var gradient = svg.append("svg:defs")
    .append("svg:linearGradient")
      .attr("id", "gradient")
      .attr("x1", "100%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "0%")
      .attr("spreadMethod", "pad");

  gradient.append("svg:stop")
      .attr("offset", "0%")
      .attr("stop-color", "rgb(35,132,67)")
      .attr("stop-opacity", 1);

  gradient.append("svg:stop")
      .attr("offset", "100%")
      .attr("stop-color", "rgb(255,245,96)")
      .attr("stop-opacity", 1);

  svg.append("svg:rect")
      .attr("width", LegendW)
      .attr("height", LegendH)
      .style("fill", "url(#gradient)");

  svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x","15%")
      .attr("y","69%")
      .attr("dy",0)
      .style("font-size", "16px")
      .style("fill", "black")
      .text("-");

  svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x","85%")
      .attr("y","65%")
      .attr("dy",0)
      .style("font-size", "14px")
      .style("fill", "white")
      .text("+");

d3.selectAll(".radioCounty").on("change", function(){

if (document.getElementById("ac_totCounty").checked) {
        counties.transition().duration(250)
             .style("fill", function (d) {return colorTOT(d.properties.ac_tot);});
        svg.transition().duration(300).style("display", null);
             }

else if (document.getElementById("POP_NORMCounty").checked) {
        counties.transition().duration(250)
             .style("fill", function (d) {return colorPOP(d.properties.POP_NORM);});
        svg.transition().duration(300).style("display", null);
        d3.selectAll(".selectedCounty").style("fill", "#EF8B6C");
             }
           });

  var counties = group.append("path")
            .attr("d",path)
            .attr("class", "Mcounty")
            .style("fill", function (d) {return colorTOT(d.properties.ac_tot);});

  var countiesOverlay = group.append("path")
            .attr("d",path)
            .classed("geoOverlay", true)
            .classed("McountyOverlay", true)
            .on("mouseover", function(d) {
            div.transition().duration(300).style("opacity", 1);
            div.text(d.properties.name+" County")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY -30) + "px");})
            .on("mouseout", function (d) { div.transition().duration(300).style("opacity", 0);})
            .on("click", function(d) {
            selectedCounty = d.properties.name;
            countyClass(d.properties.name);
            updateCountyPie1(d.properties.name);
            updateCountyPie2(d.properties.name);
            updateCountyName(d.properties.name);
            updateCountyTot(d3.format(",")(d.properties.ac_tot));
            updateCountyInh(d3.format(",")(d.properties.POP_NORM));
          });

});
