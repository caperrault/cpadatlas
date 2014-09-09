var index = [];
for (var i = 1; i < 59; i++) {index.push(i);}

var indexRect = d3.select("#countyIndex").selectAll("rect")
                 .data(index)
                 .enter()
                 .append("rect")
                 .attr("y", function(d, i) {return i * 21;})
                 .attr("x", 0)
                 .attr("width", 20)
                 .attr("height", 21)
                 .attr("fill", "white")
                 .classed("tableHeader", "true");

var indexNumber = d3.select("#countyIndex").selectAll("text")
             .data(index)
             .enter()
             .append("text")
             .attr("y", function(d, i) {return (i*21) + 14;})
             .attr("x", 10)
             .attr("width", 20)
             .attr("height", 21)
             .attr("font-weight", "bold")
             .text(function (d, i) {return d;});

var width = 500,
    height = 1000;

var fieldHeight = 20;
var fieldWidth = 145;

var canvasH = d3.select("#countyHeaders")
    .attr("width", width)
    .attr("height", fieldHeight)
    .attr("x", 20)
    .append("g");

var canvasR = d3.select("#countyRow")
    .attr("width", width)
    .attr("height", height)
    .append("g");

var headerGrp = canvasH.append("g")
                .attr("class", "headerGrp")
                .attr("x", 20);

var rowsGrp = canvasR.append("g")
              .attr("class","rowsGrp");

var previousSort = null;

d3.json("Counties_stats_3col.json", function(data) {

refreshTable(null);

function refreshTable(sortOn){

  // create the table header
  var header = headerGrp.selectAll("g")
    .data(d3.keys(data[0]))
    .enter().append("g")
    .attr("class", "tableHeader")
    .attr("transform", function (d, i){
      return "translate("+ i* fieldWidth + ",0)";
    });

  header.append("rect")
    .attr("width", fieldWidth + 30)
    .attr("height", fieldHeight);

  header.append("text")
    .attr("x", fieldWidth/2 + 25)
    .attr("y", fieldHeight/2)
    .attr("dy", ".35em")
    .text(function (d) { return d;})
    .style("cursor", function (d, i) {
        if (i>0) { return "s-resize";}
        else { return "default";}
      })
    .on("click", function (d, i) { if (i>0) {
      d3.select(".tableHeaderSelected").classed("tableHeaderSelected", false);
      d3.select(this).classed("tableHeaderSelected", true);
      return refreshTable(d);
      }
    });

  // fill the table
  // select rows
  var rows = rowsGrp.selectAll("g.Tcounty").data(data,
    function(d){ return d.County; });

  // create rows
  var rowsEnter = rows.enter().append("svg:g")
    .attr("class", "Tcounty")
    .attr("transform", function (d, i){
      return "translate(0," + (i) * (fieldHeight+1) + ")";
    })
    .on("click", function(d) {
                            selectedCounty = d.County;
                            countyClass(d.County);
                            updatePie1(d.County);
                            updatePie2(d.County);
                            updateCountyName(d.County);
                            updateCountyTot(d3.format(",")(d["Total CPAD Acreage"]));
                            updateCountyInh(d3.format(",")(d["CPAD Acres per 1,000 Inh."]));
                          });

  // select cells
  var cells = rows.selectAll("g.cell").data(function(d){return d3.values(d);});

  // create cells
  var cellsEnter = cells.enter().append("svg:g")
    .attr("class", "cell")
    .attr("class", "Tcounty")
    .attr("transform", function (d, i){
      return "translate(" + i * fieldWidth + ",0)";
    });

  cellsEnter.append("rect")
    .attr("width", fieldWidth)
    .attr("height", fieldHeight);

  cellsEnter.append("text")
    .attr("x", fieldWidth / 2)
    .attr("y", fieldHeight / 2)
    .attr("dy", ".35em")
    .text( function (d) { if (typeof d == "number") {
      return d3.format(',')(d);}
      else {return d;}
      });

  //update if not in initialisation
  if(sortOn !== null) {
      // update rows
      rows.sort(function(a,b){return sort(b[sortOn], a[sortOn]);});
      previousSort = null;

      rows.transition()
        .duration(500)
        .attr("transform", function (d, i){
          return "translate(0," + (i) * (fieldHeight+1) + ")";
        });
  }
}

function sort(a,b){
    return a > b ? 1 : a == b ? 0 : -1;
}

});

var updatePie1;
var updatePie2;
var updateCountyName;
var updateCountyTot;
var updateCountyInh;
