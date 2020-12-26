var width = 1300;
var height = 800;
//most winningest champion
//least winningest champion
//average game time length
//average win game time length
//average loss game time length

d3.csv("./LeagueofLegends.csv", function(csv) {
    var testData = d3
                        .nest()
                        .key(function (d) {
                            return d.Year;
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
    var tsm_2016 = testData["2016"];
    var tsm_2016_total = tsm_2016["TSM_LOSS"].length + tsm_2016["TSM_WIN"].length;
    
    var tsm_2016_win_games = testData["2016"]["TSM_WIN"];
    var tsm_2016_lose_games = testData["2016"]["TSM_LOSS"];
    

    var champion_set = new Set();
    var champion_win_map = new Map();
    var champion_loss_map = new Map();
    var champion_wr_map = new Map();
    for (var i = 0; i < tsm_2016_win_games.length; i++) {
        var curr = tsm_2016_win_games[i];
        var top, jg, mid, adc, supp;
        if (curr["blueTeamTag"] == "TSM") {
            top = curr["blueTopChamp"];
            jg = curr["blueJungleChamp"];
            mid = curr["blueMiddleChamp"];
            adc = curr["blueADCChamp"];
            supp = curr["blueSupportChamp"];
        } else {
            top = curr["redTopChamp"];
            jg = curr["redJungleChamp"];
            mid = curr["redMiddleChamp"];
            adc = curr["redADCChamp"];
            supp = curr["redSupportChamp"];
        }
        champion_set.add(top);
        champion_set.add(jg);
        champion_set.add(mid);
        champion_set.add(adc);
        champion_set.add(supp);
        if (!champion_win_map.has(top)) {
            champion_win_map.set(top, 1);
        } else {
            champion_win_map.set(top, champion_win_map.get(top) + 1);
        }

        if (!champion_win_map.has(jg)) {
            champion_win_map.set(jg, 1);
        } else {
            champion_win_map.set(jg, champion_win_map.get(jg) + 1);
        }

        if (!champion_win_map.has(mid)) {
            champion_win_map.set(mid, 1);
        } else {
            champion_win_map.set(mid, champion_win_map.get(mid) + 1);
        }

        if (!champion_win_map.has(adc)) {
            champion_win_map.set(adc, 1);
        } else {
            champion_win_map.set(adc, champion_win_map.get(adc) + 1);
        }

        if (!champion_win_map.has(supp)) {
            champion_win_map.set(supp, 1);
        } else {
            champion_win_map.set(supp, champion_win_map.get(supp) + 1);
        }
    }

    for (var i = 0; i < tsm_2016_lose_games.length; i++) {
        var curr = tsm_2016_lose_games[i];
        var top, jg, mid, adc, supp;
        if (curr["blueTeamTag"] == "TSM") {
            top = curr["blueTopChamp"];
            jg = curr["blueJungleChamp"];
            mid = curr["blueMiddleChamp"];
            adc = curr["blueADCChamp"];
            supp = curr["blueSupportChamp"];
        } else {
            top = curr["redTopChamp"];
            jg = curr["redJungleChamp"];
            mid = curr["redMiddleChamp"];
            adc = curr["redADCChamp"];
            supp = curr["redSupportChamp"];
        }
        champion_set.add(top);
        champion_set.add(jg);
        champion_set.add(mid);
        champion_set.add(adc);
        champion_set.add(supp);
        if (!champion_loss_map.has(top)) {
            champion_loss_map.set(top, 1);
        } else {
            champion_loss_map.set(top, champion_loss_map.get(top) + 1);
        }

        if (!champion_loss_map.has(jg)) {
            champion_loss_map.set(jg, 1);
        } else {
            champion_loss_map.set(jg, champion_loss_map.get(jg) + 1);
        }

        if (!champion_loss_map.has(mid)) {
            champion_loss_map.set(mid, 1);
        } else {
            champion_loss_map.set(mid, champion_loss_map.get(mid) + 1);
        }

        if (!champion_loss_map.has(adc)) {
            champion_loss_map.set(adc, 1);
        } else {
            champion_loss_map.set(adc, champion_loss_map.get(adc) + 1);
        }

        if (!champion_loss_map.has(supp)) {
            champion_loss_map.set(supp, 1);
        } else {
            champion_loss_map.set(supp, champion_loss_map.get(supp) + 1);
        }
    }

    
    for (var key of champion_set) {
        if (champion_loss_map.has(key) && champion_win_map.has(key)) {
                champion_wr_map.set(key, {winrate: ((champion_win_map.get(key)) / ((champion_win_map.get(key)) + champion_loss_map.get(key)) * 100), total: ((champion_win_map.get(key)) + champion_loss_map.get(key))});
        } else if (champion_win_map.has(key)) {
            champion_wr_map.set(key, {winrate: (100), total: ((champion_win_map.get(key)))});
        } else {
            champion_wr_map.set(key, {winrate: (0), total: ((champion_loss_map.get(key)))});
        }
    }

    var sorted_champion_wr_map = new Map([...champion_wr_map.entries()].sort((a,b) => b[1]["winrate"] - a[1]["winrate"]));
    var array_from_map = Array.from(sorted_champion_wr_map);
    // Wrap every letter in a span
    var textWrapper = document.querySelector('.ml12');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({loop: true})
    .add({
        targets: '.ml12 .letter',
        translateX: [40,0],
        translateZ: 0,
        opacity: [0,1],
        easing: "easeOutExpo",
        duration: 1200,
        delay: (el, i) => 500 + 30 * i
    })
    .add({
        duration: Infinity,
    });

    generateGraph();
    transitionFunc();

    function generateGraph() {
        var keys = sorted_champion_wr_map.keys();

        var xDomain = Array.from(keys);
        
        var xScale = d3.scaleBand().domain(xDomain).range([0, 1200]).padding(0.1);

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
                        .attr("transform", "translate(80, 600)")
                        .call(xAxis)
                        .selectAll("text")
                        .attr("class", "label")
                        .style("text-anchor", "end")
                        .attr("dy", "-.6em")
                        .attr("dx", "-.6em")
                        .attr("transform", "rotate(-90)");

        //y-axis
        chart
                        .append("g")
                        .attr("class", "leftAxis")
                        .attr("transform", "translate(80, 200)")
                        .call(yAxis)
                        .append("text")
                        .attr("class", "label")
                        .attr("transform", "rotate(-90)")
                        .style("text-anchor", "end");


        chart
                        .append("text")
                        .attr("transform", "translate(" + (xScale("Syndra") + 15) + ", " + yScale(-10) + "), rotate(-90)")
                        .style("font-size", "18px")
                        .style("font-family", "Courier New")
                        .text("Winrate %")
                        .style("fill", "whitesmoke")


        chart
                        .append("text")
                        .attr("transform", "translate(" + (xScale("Nami") + 50) + ", " + yScale(-70) + ")")
                        .style("font-size", "18px")
                        .style("font-family", "Courier New")
                        .text("Champion")
                        .style("fill", "whitesmoke")

        var bars = chart
                        .selectAll(".bar")
                        .data(array_from_map)
                        .enter()
                        .append("rect")
                        .attr("class", "bar")
                        .attr("fill", function (d) {
                            return "rgb(" + 255 * (1-(d[1]["winrate"] / 100)) + "," + 255 * (d[1]["winrate"] / 100) + ",0)";
                        })
                        .attr("x", function (d) {
                            return xScale(d[0]) + 80;
                        })
                        .attr("width", xScale.bandwidth())
                        .attr("y", yScale(-50))
                        .attr("height", 0)
                        .on("mouseover", function(d) {
                            var champName = document.getElementById("champName");
                            var totalGames = document.getElementById("totalGames");
                            var winrate = document.getElementById("winrate");
                            champName.textContent = "Champion Name: " + d[0];
                            totalGames.textContent = "Total games played: " + d[1]["total"];
                            winrate.textContent = "Winrate: " + d[1]["winrate"] + "%";
                        })
                        .on("mouseout", function (d) {
                            var champName = document.getElementById("champName");
                            var totalGames = document.getElementById("totalGames");
                            var winrate = document.getElementById("winrate");
                            champName.textContent = "";
                            totalGames.textContent = "";
                            winrate.textContent = "";
                        })

        bars
                        .transition()
                        .delay(2000)
                        .duration(2000)
                        .attr("y", function(d) {
                            if (d[1]["winrate"] == 0) {
                                return yScale(0) + 198;
                            }
                            return yScale(d[1]["winrate"]) + 200;
                        })
                        .attr("height", function(d) {
                            if (d[1]["winrate"] == 0) {
                                return height - yScale(0) - 399;
                            }
                            return height - yScale(d[1]["winrate"]) - 400; 
                        })

        chart
                        .append("text")
                        .attr("x", xScale("Poppy"))
                        .attr("y", yScale(50))
                        .attr("id", "champName")
                        .text("")
                        .style("fill", "whitesmoke")
                        .style("font-family", "Courier")
                        .style("font-size", "13px")
                        .style("font-weight", "bold")
                        .attr("alignment-baseline","middle");
        
        chart
                        .append("text")
                        .attr("x", xScale("Poppy"))
                        .attr("y", yScale(45))
                        .attr("id", "totalGames")
                        .text("")
                        .style("fill", "whitesmoke")
                        .style("font-family", "Courier New")
                        .style("font-size", "13px")
                        .style("font-weight", "bold")
                        .attr("alignment-baseline","middle");

        chart
                        .append("text")
                        .attr("x", xScale("Poppy"))
                        .attr("y", yScale(40))
                        .attr("id", "winrate")
                        .text("")
                        .style("fill", "whitesmoke")
                        .style("font-family", "Courier New")
                        .style("font-size", "13px")
                        .style("font-weight", "bold")
                        .attr("alignment-baseline","middle");

        var filterValue = 0;
        d3
                        .select("#inputbox")
                        .on("change", function() {
                            filterValue = this.value;
                        });

        d3
                        .select("#filterButton")
                        .on("click", function() {
                            chart
                                            .selectAll(".bar")
                                            .filter(function (d) {
                                                return d[1]["total"] < filterValue;
                                            })
                                            .transition()
                                            .duration(2000)
                                            .attr("y", yScale(0) + 200)
                                            .attr("height", 0);
                        })
        d3
                        .select("#resetFilterButton")
                        .on("click", function() {
                            chart
                                            .selectAll(".bar")
                                            .transition()
                                            .duration(2000)
                                            .attr("fill", function (d) {
                                                return "rgb(" + 255 * (1-(d[1]["winrate"] / 100)) + "," + 255 * (d[1]["winrate"] / 100) + ",0)";
                                            })
                                            .attr("y", function(d) {
                                                if (d[1]["winrate"] == 0) {
                                                    return yScale(0) + 198;
                                                }
                                                return yScale(d[1]["winrate"]) + 200;
                                            })
                                            .attr("height", function(d) {
                                                if (d[1]["winrate"] == 0) {
                                                    return height - yScale(0) - 399;
                                                }
                                                return height - yScale(d[1]["winrate"]) - 400; 
                                            })
                                            
                        })
    }
});

function transitionFunc()  {
    const transition_el = document.querySelector(".transition");
    const anchors = document.querySelectorAll("a");

    setTimeout(() => {
        transition_el.classList.remove("is-active");
    }, 500)

    for (var i = 0; i < anchors.length; i++) {
        const anchor = anchors[i];

        anchor.addEventListener("click", e => {
            e.preventDefault();
            var target;
            if (e.target.id == "back") {
                target = e.target.href;
            } else {
                target = e.srcElement.parentElement.href["baseVal"];
            }
            

            transition_el.classList.add("is-active");

            setTimeout(() => {
                window.location.href = target;
            }, 500);
        })
    }
}

