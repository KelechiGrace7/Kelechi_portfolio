// Mobile navigation + active section highlighting. No dependencies.
(function () {
    "use strict";

    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("site-nav");
    if (!toggle || !nav) return;

    var mobile = window.matchMedia("(max-width: 760px)");

    function setOpen(open) {
        nav.classList.toggle("is-open", open);
        toggle.setAttribute("aria-expanded", String(open));
    }

    toggle.addEventListener("click", function () {
        setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    // Close after choosing a link
    nav.addEventListener("click", function (e) {
        if (e.target.closest("a")) setOpen(false);
    });

    // Close with Escape and return focus to the button
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
            setOpen(false);
            toggle.focus();
        }
    });

    // Reset when the viewport grows past the mobile breakpoint
    mobile.addEventListener("change", function () { setOpen(false); });

    // Highlight the nav link for the section currently in view
    if ("IntersectionObserver" in window) {
        var links = nav.querySelectorAll('ul a[href^="#"]');
        var map = {};
        links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                links.forEach(function (a) { a.removeAttribute("aria-current"); });
                var link = map[entry.target.id];
                if (link) link.setAttribute("aria-current", "true");
            });
        }, { rootMargin: "-40% 0px -55% 0px" });

        Object.keys(map).forEach(function (id) {
            var section = document.getElementById(id);
            if (section) observer.observe(section);
        });
    }
})();
