var selectedCounty = "Los Angeles";

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

d3.json("CPAD_counties2.json", function(err, ca) {

  var div = d3.select("body").append("div")
  .attr("class", "mapTooltip")
  .style("opacity", 0);

  var radio = d3.select(".ca")
              .append("input")
              .attr("type","Radio")

  /*var colorTOT = d3.scale.linear()
    .domain([30237, 993455, 12867928])
    .range(['rgb(255,245,96)','rgb(215,211,0)','rgb(35,132,67)'])
    .interpolate(d3.interpolateRgb);*/

/*  var colorTOT = d3.scale.linear()
    .domain([30237, 993455, 12867928])
    .range(['rgb(211,211,211)','rgb(211,225,211)','rgb(35,132,67)'])
    .interpolate(d3.interpolateRgb);*/

    var colorTOT = d3.scale.pow()
        .domain([30237, 993455, 12867928])
        .range(["#ffffbf","#d9ef8b","#1a9850"])
        //.exponent([3])
        .interpolate(d3.interpolateRgb);
        //["#a50026","#d73027","#f46d43","#fdae61","#fee08b","#ffffbf","#d9ef8b","#a6d96a","#66bd63","#1a9850","#006837"]
        //["#7f3b08","#b35806","#e08214","#fdb863","#fee0b6","#f7f7f7","#d8daeb","#b2abd2","#8073ac","#542788","#2d004b"]
        //["#543005","#8c510a","#bf812d","#dfc27d","#f6e8c3","#f5f5f5","#c7eae5","#80cdc1","#35978f","#01665e","#003c30"]
        //["#ffffe5","#f7fcb9","#d9f0a3","#addd8e","#78c679","#41ab5d","#238443","#006837","#004529"]

  /*var colorTOT = d3.scale.threshold()
      .domain(ss.jenks(counties2.map(function(d) { return d.properties.ac_tot; }), 9))
      .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));*/

  var colorPOP = d3.scale.linear()
    .domain([39, 7103, 393000])
    .range(["#ffffbf","#d9ef8b","#1a9850"])
    //.range(["#ffffe5","#d9f0a3","#41ab5d"])
    .interpolate(d3.interpolateRgb);

  var projection = d3.geo.albers()
      .translate([72, 210])
      .scale(2700)
      .rotate([122.4183, 0])
      .center([0, 37.7750]);

  var svg = d3.select("#countyMapSvg");

  var group = svg.selectAll('g')
          .data(topojson.feature(ca, ca.objects.counties2).features)
          .enter();

  var path = d3.geo.path().projection(projection);

  var LegendW = 20;
      LegendH = 80;

  var svg = d3.select("#countyMapSvg").append("svg:svg")
      .attr("class", "mapLegend")
      .attr("width", LegendW)
      .attr("height", LegendH)
      .attr("x", 0)
      .attr("y", 335);

  var gradient = svg.append("svg:defs")
    .append("svg:linearGradient")
      .attr("id", "gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%")
      .attr("spreadMethod", "pad");

  gradient.append("svg:stop")
      .attr("offset", "0%")
      .attr("stop-color", "#1a9850")
      .attr("stop-opacity", 1);

  gradient.append("svg:stop")
      .attr("offset", "95%")
      .attr("stop-color", "#ffffbf")
      .attr("stop-opacity", 1);

  svg.append("svg:rect")
      .attr("width", LegendW)
      .attr("height", LegendH)
      .style("fill", "url(#gradient)");

  svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x","50%")
      .attr("y","95%")
      .attr("dy",0)
      .style("font-size", "16px")
      .style("fill", "#444")
      .text("-");

  svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x","50%")
      .attr("y","15%")
      .attr("dy",0)
      .style("font-size", "14px")
      .style("fill", "white")
      .text("+");

  var legendText = d3.select("#countyMapSvg").append("legendText:svg")
      .attr("width", 50)
      .attr("height", 30)
      .attr("x", 25)
      .attr("y", 398);

  legendText.append("text")
      .attr("dy",10)
      .style("font-size", "10px")
      .style("fill", "#444")
      .text("Acres");

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
            .classed("selectedCounty", function(d) {return selectedCounty === d.properties.name;})
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
            updateCountyTot(d3.format(",")(d.properties.ac_tot),d3.format(",")(d.properties.Tot_Pop));
            updateCountyInh(d3.format(",")(d.properties.POP_NORM));
          });

});
