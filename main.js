$(document).ready(function() {
    // process animation

    let process = document.querySelector(".process_container");
    let stepInProcess = [
        "Fetching the name...",
        "Splitting letters...",
        "Checking tables...",
        "Summing the letters",
        "Matching with chart...",
        "Generating report..."];
    let stepProcessed = [
        "Name retrieved ✅",
        "SLetters split ✅",
        "Tables checked ✅",
        "Sum calculated ✅",
        "Chart checked ✅",
        "Report ready ✅"];
    
    $(".start_process").click(function(){
        var intervalTime = 1000;

        // reset
        process.querySelectorAll(".process_container .step_circle").forEach((step_circle, index) => {
            if (index == 0) {
                step_circle.scrollIntoView({ behavior: "smooth" });
            }

            step_circle.style.borderWidth = "27px";
        });

        for (let index = 1; index < 7; index++) {
            setTimeout(function(){
                let step = process.querySelector(".process_container .step" + index);

                let step_circle = step.querySelector(".step_circle");
                step_circle.style.borderWidth = "0px";
                
                let step_to = step.querySelector("h5");
                step_to.textContent = stepInProcess[index - 1];
                step_to.scrollIntoView({ behavior: "smooth" });
                
                setTimeout(function(){
                    step_to.textContent = stepProcessed[index - 1];
                }, intervalTime);

            }, intervalTime * index);
        }
    });

});
