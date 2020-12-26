var width = 1300;
var height = 600;

d3.csv("./LeagueofLegends.csv", function(csv) {
    var testData = d3
                        .nest()
                        .key(function (d) {
                            return d.Year
                        })
                        .key(function (d) {
                            if (d.blueTeamTag == "TSM") {
                                if (d.bResult == 1) {
                                    return "TSM_WIN";
                                } else {
                                    return "TSM_LOSS";
                                }
                            } else if ( d.redTeamTag == "TSM") {
                                if (d.rResult == 1) {
                                    return "TSM_WIN";
                                } else {
                                    return "TSM_LOSS";
                                }
                            } else {
                                return "Other";
                            }
                        })
                        .object(csv);
    console.log(testData);
    var tsm_2015 = testData["2015"];
    var tsm_2016 = testData["2016"];
    var tsm_2017 = testData["2017"];
    console.log(tsm_2015);
    console.log(tsm_2016);
    console.log(tsm_2017);
    var tsm_2015_total = tsm_2015["TSM_LOSS"].length + tsm_2015["TSM_WIN"].length;
    var tsm_2015_wr = Math.round(tsm_2015["TSM_WIN"].length / tsm_2015_total * 100);
    var tsm_2016_total = tsm_2016["TSM_LOSS"].length + tsm_2016["TSM_WIN"].length;
    var tsm_2016_wr = Math.round(tsm_2016["TSM_WIN"].length / tsm_2016_total * 100);
    var tsm_2017_total = tsm_2017["TSM_LOSS"].length + tsm_2017["TSM_WIN"].length;
    var tsm_2017_wr = Math.round(tsm_2017["TSM_WIN"].length / tsm_2017_total * 100);
    console.log(tsm_2015_wr);
    console.log(tsm_2016_wr);
    console.log(tsm_2017_wr);
    var tsm_wr_map = [];
    tsm_wr_map.push({x : "2015", y : tsm_2015_wr});
    tsm_wr_map.push({x : "2016", y : tsm_2016_wr});
    tsm_wr_map.push({x : "2017", y : tsm_2017_wr});
    console.log(tsm_wr_map);
    var chart;
    generateGraph();
    transitionFunc();

    function generateGraph() {

        var max = Math.max(tsm_2015_wr, tsm_2016_wr, tsm_2017_wr);

        var xDomain = ["2015", "2016", "2017"];
        var xScale = d3.scaleBand().domain(xDomain).range([0, 400, 800]).padding(0.4);
        var xAxis = d3.axisBottom().scale(xScale);

        var yScale = d3.scaleLinear().domain([0, 100]).range([400, 0]);
        var yAxis = d3.axisLeft().scale(yScale);

        chart = d3
                        .select("#chart")
                        .append("svg")
                        .attr("width", width)
                        .attr("height", height)
                        .style("display", "block")
                        .style("margin", "auto");
        //x axis
        chart
                        .append("g")
                        .attr("class", "bottomAxis")
                        .attr("transform", "translate(480,500)")
                        .call(xAxis)
                        .append("text")
                        .attr("class", "label")
                        .style("text-anchor", "end")
        //y axis
        chart
                        .append("g")
                        .attr("class", "leftAxis")
                        .attr("transform", "translate(480, 100)")
                        .call(yAxis)
                        .append("text")
                        .attr("class", "label")
                        .attr("transform", "rotate(-90)")
                        .style("text-anchor", "end");

        chart
                        .append("text")
                        .attr("transform", "translate(" + (xScale("2015") + 380) + ", " + yScale(10) + "), rotate(-90)")
                        .style("font-size", "18px")
                        .text("Winrate %")
                        .style("fill", "whitesmoke")


        chart
                        .append("text")
                        .attr("transform", "translate(" + (xScale("2016") + 495) + ", " + yScale(-38) + ")")
                        .style("font-size", "18px")
                        .text("Year")
                        .style("fill", "whitesmoke")
        
        var bars = chart
                        .selectAll(".bar")
                        .data(tsm_wr_map)
                        .enter()
                        .append("a")
                        .attr("href", function (d) {
                            return "./tsm_" + d.x + ".html";
                        })
                        .append("rect")
                        .attr("class", "bar")
                        .attr("fill", function (d) {
                            return "rgb(" + 255 * (d.y / 100) + ",0," + 255 * (1 - d.y / 100) + ")";
                        })
                        .attr("x", function (d) {
                            return xScale(d.x) + 480;
                        })
                        .attr("width", xScale.bandwidth())
                        .attr("y", yScale(-25))
                        .attr("height", 0)
                        .transition()
                        .delay(2000)
                        .duration(2000)
                        .attr("y", function(d) {
                            return yScale(d.y) + 100;
                        })
                        .attr("height", function(d) {
                            return height - yScale(d.y) - 200; 
                        });
    }
})

function transitionFunc() {

    const transition_el = document.querySelector(".transition");
    const anchors = document.querySelectorAll("a");

    setTimeout(() => {
        transition_el.classList.remove("is-active");
    }, 500)

    for (var i = 0; i < anchors.length; i++) {
        const anchor = anchors[i];

        anchor.addEventListener("click", e => {
            e.preventDefault();
            var target = e.srcElement.parentElement.href["baseVal"];

            transition_el.classList.add("is-active");

            setTimeout(() => {
                window.location.href = target;
            }, 500);
        })
    }
}