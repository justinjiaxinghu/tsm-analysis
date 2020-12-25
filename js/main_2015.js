var width = 1300;
var height = 800;
//most winningest champion
//least winningest champion
//average game time length
//average win game time length
//average loss game time length

d3.csv("../data/LeagueofLegends.csv", function(csv) {
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
    var tsm_2015 = testData["2015"];
    var tsm_2015_total = tsm_2015["TSM_LOSS"].length + tsm_2015["TSM_WIN"].length;
    //var tsm_2015_wr = Math.round(tsm_2015["TSM_WIN"].length / tsm_2015_total * 100);
    
    var tsm_2015_win_games = testData["2015"]["TSM_WIN"];
    var tsm_2015_lose_games = testData["2015"]["TSM_LOSS"];
    
    var champion_set = new Set();
    var champion_win_map = new Map();
    var champion_loss_map = new Map();
    var champion_wr_map = new Map();
    for (var i = 0; i < tsm_2015_win_games.length; i++) {
        var curr = tsm_2015_win_games[i];
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

    for (var i = 0; i < tsm_2015_lose_games.length; i++) {
        var curr = tsm_2015_lose_games[i];
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
        if (champion_loss_map.has(key)) {
            // if (value + champion_loss_map.get(key) >= 10) {
                champion_wr_map.set(key, {winrate: ((champion_win_map.get(key)) / ((champion_win_map.get(key)) + champion_loss_map.get(key)) * 100), total: ((champion_win_map.get(key)) + champion_loss_map.get(key))});
            // }
        } else {
            champion_wr_map.set(key, {winrate: (100), total: ((champion_win_map.get(key)))});
        }
    }

    var sorted_champion_wr_map = new Map([...champion_wr_map.entries()].sort((a,b) => b[1]["winrate"] - a[1]["winrate"]));
    console.log(sorted_champion_wr_map);

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

