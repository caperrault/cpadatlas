d3.csv("CPAD_50cities_agencyLevel.csv", function (dataset) {

  var cityNameSvg = d3.select("#cityName").append("svg")
                                 .attr("width", 600)
                                 .attr("height", 40)
                                 .style("display", "none");

  var cityTotSvg = d3.select("#cityTot").append("svg")
                                 .attr("width", 600)
                                 .attr("height", 20)
                                 .style("display", "none");

  var cityInhSvg = d3.select("#cityInh").append("svg")
                                 .attr("width", 600)
                                 .attr("height", 20)
                                 .style("display", "none");

 d3.select().on("change.2", change);

function change() {
  setCityValue(this.properties.Name);
  setCityTotValue(this.properties.ac_tot);
  setCityInhValue(this.properties.POP_NORM);
};

function setCityValue(name) {

  cityNameRect = cityNameSvg.style("display", null)
                .append('rect')
                .attr("width", 600)
                .attr("height", 40)
                .style('fill', "white");

  cityName = cityNameSvg.style("display", null)
                .append("text")
                .attr("text-anchor", "left")
                .attr("x","0%")
                .attr("y","60%")
                .text(name)
                .attr("fill", "#444")
                .attr("font-weight", "bold")
                .attr("font-size", "32px");
};

function setCityTotValue(tot) {

  cityTotRect = cityTotSvg.style("display", null)
                .append('rect')
                .attr("width", 600)
                .attr("height", 25)
                .style('fill', "white");

  cityTot = cityTotSvg.style("display", null)
                .append("cityTotSvg:text")

              cityTot.append("cityTotSvg:tspan")
              .text(tot)
              .attr("text-anchor", "left")
              .attr("x","0%")
              .attr("y","65%")
              .attr("fill", "#444")
              .attr("font-weight", "bold")
              .attr("font-size", "18px");

              cityTot.append("cityTotSvg:tspan")
              .text(" CPAD acres")
              .attr("text-anchor", "left")
              .attr("y","65%")
              .attr("fill", "#444")
              .attr("font-size", "12px");
};

function setCityInhValue(inh) {

  cityInhRect = cityInhSvg.style("display", null)
                .append('rect')
                .attr("width", 600)
                .attr("height", 20)
                .style('fill', "white");

  cityInh = cityInhSvg.style("display", null)
                  .append("cityInhSvg:text")

                cityInh.append("cityInhSvg:tspan")
                .text("which amounts to ")
                .attr("text-anchor", "left")
                .attr("x", "0%")
                .attr("y","65%")
                .attr("fill", "#444")
                .attr("font-size", "12px");

                cityInh.append("cityInhSvg:tspan")
                .text(inh)
                .attr("text-anchor", "left")
                .attr("y","65%")
                .attr("fill", "#444")
                .attr("font-weight", "bold")
                .attr("font-size", "18px");

                cityInh.append("cityInhSvg:tspan")
                .text(function() {
                  if(inh >= 2) { return " CPAD acres per 1,000 inhabitants";}
                    else { return " CPAD acre per 1,000 inhabitants";}
                })
                .attr("text-anchor", "left")
                .attr("y","65%")
                .attr("fill", "#444")
                .attr("font-size", "12px");
                };

updateCityName = setCityValue;
updateCityTot = setCityTotValue;
updateCityInh = setCityInhValue;

});
