var width = 1300;
var height = 800;

d3.csv("../data/LeagueofLegends.csv", function(csv) {
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
});

window.onload = () => {
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

