$(document).ready(function() {
    // Loader
    var skew_openings = [
        "translate(-50%,-100%) skew(-360deg, 0deg)",
        "translate(-50%,-100%) skew(-0deg, 360deg)",
        "translate(-50%,-100%) skew(-360deg, 360deg)",
        "translate(-50%,-100%) skew(-90deg, 90deg)",
        "translate(-50%,-100%) skew(-90deg, 360deg)",
        "translate(-50%,-100%) skew(0deg, 90deg)",
        "translate(-50%,-100%) skew(-180deg, 360deg)",
        "translate(-50%,-100%) skew(-180deg, 180deg)",
        "translate(-50%,-100%) skew(-15deg, 15deg)"
    ];
    var rand_skew_opening = skew_openings[Math.floor(Math.random() * skew_openings.length)];
    $('.opening_group').css("transform", rand_skew_opening);

    setInterval(function() {
        $('#loader').fadeOut();
    }, 12000);
    setInterval(function() {
        $('#sanloader').fadeOut();
    }, 21000);

    // sticky header on scroll
    let lastScrollY = window.scrollY;
    let header = $("header"); 
    let moved = false;

    window.addEventListener("scroll", () => {
        let scrollY = window.scrollY;

        if (scrollY >= 50 && !moved) {
            header.css("box-shadow", "0px 6px 15px 0 rgba(0, 0, 0, 0.3)");
            moved = true;
        } else if (scrollY < 50 && moved) {
            header.css("box-shadow", "0 0 0 0 rgba(0, 0, 0, 0.0)");
            moved = false;
        }
    });

    // theme toggler    
    $(".theme-mode-trigger").each(function() {
        $(this).children().each(function() {
            $(this).click(function() {
                let theme = $(this).data("href");
                let og_theme = "#mobile_" + theme.split("#")[1];

                if(theme.includes("mobile")) {
                    og_theme = "#" + theme.split("_")[1] + "_theme";
                }

                og_theme = og_theme.toString();

                console.log(theme)
                document.querySelector(theme).scrollIntoView({ behavior: "smooth" });

                if (theme.includes("light")) {
                    document.querySelector("body").id="lightMode";
                } else if (theme.includes("system")) {
                        window.matchMedia("(prefers-color-scheme: dark)").matches ? document.querySelector("body").id="darkMode" : document.querySelector("body").id="lightMode";
                } else {
                    document.querySelector("body").id="darkMode";
                }
            })
        })
    })
});
