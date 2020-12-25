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
