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
    console.log(tsm_2015);
    var tsm_2015_total = tsm_2015["TSM_LOSS"].length + tsm_2015["TSM_WIN"].length;
    var tsm_2015_wr = Math.round(tsm_2015["TSM_WIN"].length / tsm_2015_total * 100);
    console.log(tsm_2015_wr);
    

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

    // Wrap every letter in a span
    var textWrapper = document.querySelector('.ml13');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({loop: true})
    .add({
        targets: '.ml13 .letter',
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

