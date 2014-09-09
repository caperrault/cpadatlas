d3.csv("Agency_lev_allcounties_perc.csv", function (dataset) {

               var width = 215,
                   height = 300,
                   radius = Math.min(width, height) / 2;

               var div = d3.select("body").append("div")
               .attr("class", "pieTooltip")
               .style("opacity", 0);

               var enterClockwise = {
                   startAngle: 0,
                   endAngle: 0
                 };

               var color = d3.scale.category20();

               var svg = d3.select("#countyPie2").append("svg")
                           .attr("width", width)
                           .attr("height", height)
                           .attr("y", "-30")
                           .append("g")
                           .attr("transform", "translate(" + width / 2.4 + "," + height / 2.3 + ")");

               var arc = d3.svg.arc()
                           .innerRadius(radius - 45)
                           .outerRadius(radius - 20);

               var pie2 = d3.layout.pie()
                           .sort(null);

               var path = svg.datum(dataset).selectAll("path")
                             .data(pie2)
                             .enter().append("path")
                             .attr("fill", function(d, i) { return color(i); })
                             .classed("chart", true)
                             .attr("d", arc(enterClockwise))
                             .each(function(d) {
                                   this._current = {
                                     data: d.data,
                                     value: d.value,
                                     startAngle: enterClockwise.startAngle,
                                     endAngle: enterClockwise.endAngle
                                   }
                                 })
                             .attr("data-legend",function(d) { return d.Agency_lev})
                             .style("display", "none")
                             .on("mouseover", function(d, i) {
                             div.transition().duration(300).style("opacity", 1);
                             div.text(dataset[i].Agency_lev+": "+d.value+"%")
                             .style("left", (d3.event.pageX - div.text.length*100) + "px")
                             .style("top", (d3.event.pageY -30) + "px");})
                             .on("mouseout", function () { div.transition().duration(300).style("opacity", 0);
                             });

                var legend = d3.select("#countyPie2").append("svg")
                .attr("class", "legend")
                .attr("width", radius * 4)
                .attr("height", radius * 4)
                .selectAll("g")
                .data(color.domain())
                .enter().append("g")
                .attr("transform", function(d, i) { return "translate(220," + i * 20 + ")"; })
                .style("display", "none");

                legend.append("rect")
                .attr("y", Math.min(width, height) / 2 - 35)
                .attr("width", 18)
                .attr("height", 18)
                .style("fill", color);

                legend.append("text")
                .attr("x", 24)
                .attr("y", Math.min(width, height) / 2 - 26)
                .attr("dy", ".35em")
                .attr("fill", "black")
                .attr("font-size", "10px")
                .text( function (d, i) { return dataset[i].Agency_lev;})
                .attr("fill", "#444");

                var titlePie2 = d3.select("#countyPie2").append("svg")
                                  .attr("x", 220)
                                  .attr("y", Math.min(width, height) / 2 - 60)
                                  .style("display", "none");

                  titlePie2.append("text")
                  .attr("fill", "black")
                  .attr("font-size", "12px")
                  .attr("dy", "1em")
                  .attr("font-weight", "bold")
                  .text("Protected areas by AGENCY TYPE")
                  .attr("fill", "#444");

                  d3.select().on("change.2", change);

                 function change() {
                   setValue(this.value);
                 };

                 function setValue(value) {
                   path.style("display", null);
                   legend.style("display", null);
                   titlePie2.style("display", null);
                   pie2.value(function(d) { return d[value]; });
                   path = path.data(pie2);
                   path.transition().duration(750).attrTween("d", arcTween);
                 };

                 updatePie2 = setValue;

                 function arcTween(a) {
                   var i = d3.interpolate(this._current, a);
                   this._current = i(0);
                   return function(t) {
                     return arc(i(t));
                   }
                   };

                 });
