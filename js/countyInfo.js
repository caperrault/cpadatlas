d3.csv("Agency_lev_allcounties_perc5.csv", function (dataset) {

  var countyNameSvg = d3.select("#countyName").append("svg")
                                 .attr("width", 600)
                                 .attr("height", 40);

  var countyTotSvg = d3.select("#countyTot").append("svg")
                                 .attr("width", 600)
                                 .attr("height", 20);

  var countyInhSvg = d3.select("#countyInh").append("svg")
                                 .attr("width", 600)
                                 .attr("height", 20);

            countyName = countyNameSvg.append("text")
                          .attr("text-anchor", "left")
                          .attr("x","0%")
                          .attr("y","60%")
                          .text("Los Angeles County:")
                          .attr("fill", "#444")
                          .attr("font-weight", "bold")
                          .attr("font-size", "32px");

            countyTot = countyTotSvg.append("countyTotSvg:text")

                        countyTot.append("countyTotSvg:tspan")
                        .text("2,611,372")
                        .attr("text-anchor", "left")
                        .attr("x","0%")
                        .attr("y","65%")
                        .attr("fill", "#444")
                        .attr("font-weight", "bold")
                        .attr("font-size", "18px");

                        countyTot.append("countyTotSvg:tspan")
                        .text(" CPAD acres / Total Population: ")
                        .attr("text-anchor", "left")
                        .attr("y","65%")
                        .attr("fill", "#444")
                        .attr("font-size", "12px");

                        countyTot.append("countyTotSvg:tspan")
                        .text("9,840,024")
                        .attr("text-anchor", "left")
                        .attr("y","65%")
                        .attr("fill", "#444")
                        .attr("font-weight", "bold")
                        .attr("font-size", "18px");

                        countyTot.append("countyTotSvg:tspan")
                        .text(" inhabitants")
                        .attr("text-anchor", "left")
                        .attr("y","65%")
                        .attr("fill", "#444")
                        .attr("font-size", "12px");

              countyInh = countyInhSvg.append("countyInhSvg:text")

                          countyInh.append("countyInhSvg:tspan")
                          .text("which amounts to ")
                          .attr("text-anchor", "left")
                          .attr("x", "0%")
                          .attr("y","65%")
                          .attr("fill", "#444")
                          .attr("font-size", "12px");

                          countyInh.append("countyInhSvg:tspan")
                          .text(265)
                          .attr("text-anchor", "left")
                          .attr("y","65%")
                          .attr("fill", "#444")
                          .attr("font-weight", "bold")
                          .attr("font-size", "18px");

                          countyInh.append("countyInhSvg:tspan")
                          .text(" CPAD acres per 1,000 inhabitants")
                          .attr("text-anchor", "left")
                          .attr("y","65%")
                          .attr("fill", "#444")
                          .attr("font-size", "12px");

 d3.select().on("change.2", change);

function change() {
  setCountyValue(this.properties.name);
  setTotValue(this.properties.ac_tot);
  setInhValue(this.properties.POP_NORM);
};

function setCountyValue(name) {

  countyNameRect = countyNameSvg.append('rect')
                .attr("width", 600)
                .attr("height", 40)
                .style('fill', "white");

  countyName = countyNameSvg.append("text")
                .attr("text-anchor", "left")
                .attr("x","0%")
                .attr("y","60%")
                .text(name+" County:")
                .attr("fill", "#444")
                .attr("font-weight", "bold")
                .attr("font-size", "32px");
};

function setCountyTotValue(tot, totpop) {

  countyTotRect = countyTotSvg.append('rect')
                .attr("width", 600)
                .attr("height", 25)
                .style('fill', "white");

  countyTot = countyTotSvg.append("countyTotSvg:text")

              countyTot.append("countyTotSvg:tspan")
              .text(tot)
              .attr("text-anchor", "left")
              .attr("x","0%")
              .attr("y","65%")
              .attr("fill", "#444")
              .attr("font-weight", "bold")
              .attr("font-size", "18px");

              countyTot.append("countyTotSvg:tspan")
              .text(" CPAD acres / Total Population: ")
              .attr("text-anchor", "left")
              .attr("y","65%")
              .attr("fill", "#444")
              .attr("font-size", "12px");

              countyTot.append("countyTotSvg:tspan")
              .text(totpop)
              .attr("text-anchor", "left")
              .attr("y","65%")
              .attr("fill", "#444")
              .attr("font-weight", "bold")
              .attr("font-size", "18px");

              countyTot.append("countyTotSvg:tspan")
              .text(" inhabitants")
              .attr("text-anchor", "left")
              .attr("y","65%")
              .attr("fill", "#444")
              .attr("font-size", "12px");
};

function setCountyInhValue(inh) {

  countyInhRect = countyInhSvg.append('rect')
                .attr("width", 600)
                .attr("height", 20)
                .style('fill', "white");

    countyInh = countyInhSvg.append("countyInhSvg:text")

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
                .text(" CPAD acres per 1,000 inhabitants")
                .attr("text-anchor", "left")
                .attr("y","65%")
                .attr("fill", "#444")
                .attr("font-size", "12px");
                };

updateCountyName = setCountyValue;
updateCountyTot = setCountyTotValue;
updateCountyInh = setCountyInhValue;

});
