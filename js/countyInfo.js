d3.csv("Agency_lev_allcounties_perc.csv", function (dataset) {

  var countyNameSvg = d3.select("#countyName").append("svg")
                                 .attr("width", 600)
                                 .attr("height", 40)
                                 .style("display", "none");

  var countyTotSvg = d3.select("#countyTot").append("svg")
                                 .attr("width", 600)
                                 .attr("height", 20)
                                 .style("display", "none");

  var countyInhSvg = d3.select("#countyInh").append("svg")
                                 .attr("width", 600)
                                 .attr("height", 20)
                                 .style("display", "none");

 d3.select().on("change.2", change);

function change() {
  setCountyValue(this.properties.name);
  setTotValue(this.properties.ac_tot);
  setInhValue(this.properties.POP_NORM);
};

function setCountyValue(name) {

  countyNameRect = countyNameSvg.style("display", null)
                .append('rect')
                .attr("width", 600)
                .attr("height", 40)
                .style('fill', "white");

  countyName = countyNameSvg.style("display", null)
                .append("text")
                .attr("text-anchor", "left")
                .attr("x","0%")
                .attr("y","60%")
                .text(name+" County:")
                .attr("fill", "#444")
                .attr("font-weight", "bold")
                .attr("font-size", "32px");
};

function setTotValue(tot) {

  countyTotRect = countyTotSvg.style("display", null)
                .append('rect')
                .attr("width", 600)
                .attr("height", 25)
                .style('fill', "white");

  countyTot = countyTotSvg.style("display", null)
                .append("countyTotSvg:text")

              countyTot.append("countyTotSvg:tspan")
              .text(tot)
              .attr("text-anchor", "left")
              .attr("x","0%")
              .attr("y","65%")
              .attr("fill", "#444")
              .attr("font-weight", "bold")
              .attr("font-size", "18px");

              countyTot.append("countyTotSvg:tspan")
              .text(" CPAD acres")
              .attr("text-anchor", "left")
              .attr("y","65%")
              .attr("fill", "#444")
              .attr("font-size", "12px");
};

function setInhValue(inh) {

  countyInhRect = countyInhSvg.style("display", null)
                .append('rect')
                .attr("width", 600)
                .attr("height", 20)
                .style('fill', "white");

    countyInh = countyInhSvg.style("display", null)
                  .append("countyInhSvg:text")

                countyInh.append("countyInhSvg:tspan")
                .text("which amounts to ")
                .attr("text-anchor", "left")
                .attr("x", "0%")
                .attr("y","65%")
                .attr("fill", "#444")
                .attr("font-size", "12px");

                countyInh.append("countyInhSvg:tspan")
                .text(inh)
                .attr("text-anchor", "left")
                .attr("y","65%")
                .attr("fill", "#444")
                .attr("font-weight", "bold")
                .attr("font-size", "18px");

                countyInh.append("countyInhSvg:tspan")
                .text(function() {
                  if(inh >= 2) { return " CPAD acres per 1,000 inhabitants";}
                    else { return " CPAD acre per 1,000 inhabitants";}
                })
                .attr("text-anchor", "left")
                .attr("y","65%")
                .attr("fill", "#444")
                .attr("font-size", "12px");
                };

updateCountyName = setCountyValue;
updateCountyTot = setTotValue;
updateCountyInh = setInhValue;

});
