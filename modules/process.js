$(document).ready(function() {
    // complete process
    const urlParams = new URLSearchParams(window.location.search);
    const enteredName = urlParams.get("enterednameis") || "NumLuck";

    var inputName = enteredName.toLocaleUpperCase();
    var inputName_ = inputName;
    inputName = inputName.trim();
    inputName_ = inputName_.trim();
    inputName = inputName.split("");
    document.querySelector(".page-title h1").innerText = inputName_;

    var PythagoreanTable = {
        0: ["0", " "],
        1: ["1", "A", "J", "S"],
        2: ["2", "B", "K", "T"],
        3: ["3", "C", "L", "U"],
        4: ["4", "D", "M", "V"],
        5: ["5", "E", "N", "W"],
        6: ["6", "F", "O", "X"],
        7: ["7", "G", "P", "Y"],
        8: ["8", "H", "Q", "Z"],
        9: ["9", "I", "R"]
    }

    var ChaldeanTable = {
        0: ["0", " "],
        1: ["1", "A", "I", "J", "Q", "Y"],
        2: ["2", "B", "K", "R"],
        3: ["3", "C", "G", "L", "S"],
        4: ["4", "D", "M", "T"],
        5: ["5", "E", "H", "N", "X"],
        6: ["6", "U", "V", "W"],
        7: ["7", "O", "Z"],
        8: ["8", "F", "P"]
    }

    var LuckyNumbers = {
        1: [1, 2, 4, 7, 8, 10, 19, 28],
        2: [2, 4, 6, 8, 9, 11, 20, 29],
        3: [3, 6, 9, 12, 15, 21, 30],
        4: [2, 4, 6, 8, 13, 22, 31],
        5: [1, 3, 5, 7, 9, 14, 23, 32],
        6: [3, 6, 9, 15, 24, 33],
        7: [1, 5, 7, 9, 11, 16, 25, 34],
        8: [2, 4, 6,  8, 17, 22, 26, 35],
        9: [3, 6, 9, 18, 27, 36]
    }

        // Common phrases for reuse
    var Texts = {
        Lucky: { text: "is the lucky number", boost: 1.5 },
        Auspicious: { text: "is an auspicious number", boost: 2 },
        Prosperity: { text: "symbolizes prosperity and success", boost: 1.8 },
        Completion: { text: "symbolizes completeness and wholeness", boost: 1.3 },
        Harmony: { text: "represents harmony and balance", boost: 1.2 },
        Karma: { text: "is linked to karma and balance", boost: 1.1 },
        Neutral: { text: "is a neutral number", boost: 1 },
        Transformation: { text: "represents transformation and rebirth", boost: 0.8 },
        Bad: { text: "is considered unlucky", boost: 0.5 },
        Death: { text: "is avoided as it sounds like 'death'", boost: 0.2 }
    };

    // Culture and Number Data
    var Culture_and_Effect = {
        1: {
            Indian: [Texts.Lucky, Texts.Auspicious],
            Chinese: [Texts.Neutral, "represents independence and leadership"],
            Western: [Texts.Lucky, "symbolizes new beginnings and originality"]
        },
        2: {
            Indian: [Texts.Neutral, "represents balance and partnerships"],
            Western: [Texts.Lucky, Texts.Harmony],
            Chinese: [Texts.Lucky, "sounds like 'easy' and represents harmony"]
        },
        3: {
            Indian: [Texts.Lucky, Texts.Auspicious],
            Western: [Texts.Lucky, Texts.Harmony],
            Japanese: [Texts.Lucky, "is considered stable and lucky"],
        },
        4: {
            Japanese: [Texts.Bad, Texts.Death],
            Chinese: [Texts.Bad, Texts.Death],
            Indian: [Texts.Neutral, "represents stability and practicality"]
        },
        5: {
            Indian: [Texts.Lucky, Texts.Auspicious],
            Western: [Texts.Lucky, "represents adventure and freedom"],
            Chinese: [Texts.Lucky, "is linked to the five elements"]
        },
        6: {
            Indian: [Texts.Lucky, "is associated with love and family"],
            Western: [Texts.Lucky, "symbolizes responsibility and care"],
            Chinese: [Texts.Lucky, "represents smoothness and wealth"]
        },
        7: {
            Indian: [Texts.Lucky, Texts.Auspicious],
            Western: [Texts.Lucky, "is linked to religious and mystical beliefs"],
            Japanese: [Texts.Lucky, "is lucky in Buddhism"]
        },
        8: {
            Chinese: [Texts.Lucky, Texts.Prosperity],
            Japanese: [Texts.Lucky, "is lucky for business and success"],
            Indian: [Texts.Neutral, Texts.Karma]
        },
        9: {
            Indian: [Texts.Lucky, Texts.Auspicious],
            Chinese: [Texts.Lucky, Texts.Completion],
            Western: [Texts.Lucky, "symbolizes wisdom and spiritual enlightenment"],
            Japanese: [Texts.Neutral, "is linked to suffering but also completion"]
        },
        10: {
            Indian: [Texts.Lucky, "represents power and leadership"],
            Western: [Texts.Neutral, "symbolizes perfection and completion"],
            Chinese: [Texts.Lucky, "represents wholeness and achievement"]
        },
        13: {
            Western: [Texts.Bad, "is avoided due to Friday the 13th superstitions"],
            Indian: [Texts.Neutral, Texts.Transformation],
            Chinese: [Texts.Neutral, "represents growth and change"]
        },
        666: {
            Western: [Texts.Bad, "is associated with the 'number of the beast'"],
            Chinese: [Texts.Lucky, "sounds like 'smooth' and is positive"]
        },
        777: {
            Western: [Texts.Lucky, "is considered divine and lucky"],
            Japanese: [Texts.Lucky, "is associated with gambling and fortune"]
        },
        888: {
            Chinese: [Texts.Lucky, "represents triple prosperity"],
            Western: [Texts.Neutral, "symbolizes balance and infinity"]
        },
        999: {
            Indian: [Texts.Lucky, "represents ultimate completion and wisdom"],
            Western: [Texts.Neutral, "marks an ending that leads to a new beginning"],
            Chinese: [Texts.Lucky, "symbolizes eternity and long-lasting fortune"]
        }
    };

    var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE"];

    var contained_boost = false;

    function writeProcess(referenceTable, dom_class) {
        var process_dom = "";
        inputName_.split(" ").forEach((prc,ind) => {
            let total = 0;
            process_dom += `<div class="summing_process word1">`;
            prc.split("").forEach((p,pind) => {
                let digit = 0;
                for (n in referenceTable) {
                    if (referenceTable[n].includes(p)) {
                        // console.log(num)
                        digit = Number(n);
                    }
                }
                total += digit;
                process_dom += `
                <div class="process_number_card">
                <p>${digit}</p>
                <code>${p}</code>
                </div>`;
    
                if (pind != (prc.length - 1)) {
                    // console.table(pind, prc.length - 1, pind != (prc.length - 1))
                    process_dom += `<div class="operator">+</div>`;
                } else {
                    process_dom += `
                    <div class="operator">
                        =
                    </div>
                    <div class="process_number_card">
                        <p>${total}</p>
                    </div>`;
                }
    
            })
            process_dom += `</div>`;
        })
    
        var totals = [];
        inputName_.split(" ").forEach((prc,ind) => {
            let digit = 0;
            prc.split("").forEach(p => {
                for (n in referenceTable) {
                    if (referenceTable[n].includes(p)) {
                        // console.log(num)
                        digit += Number(n);
                    }
                }
            })
            totals.push(digit);
        })
        process_dom += `<div class="final_process">`;
        var totals_n = 0;
        totals.forEach((t,tind) => {
            totals_n += t;
            process_dom += `<div class="process_number_card">
                            <p>${t}</p>
                        </div>`;
            if (tind != (totals.length - 1)) {
                process_dom += `<div class="operator">+</div>`;
            } else {
                process_dom += `
                <div class="operator">
                    =>
                </div>`
                
                let root_num = totals_n.toString().split("");
                if (root_num.length > 1) {
                    root_num.forEach((r,rind) => {
                        process_dom += `<div class="process_number_card">
                            <p>${r}</p>
                        </div>`;

                        if (rind != (root_num.length - 1)) {
                            process_dom += `<div class="operator">+</div>`;
                        } else {
                            process_dom += `
                            <div class="operator">
                                =>
                            </div>`;
                        }
                    })
                }

                process_dom += `<div class="process_number_card">
                    <p>${sumTillDigit(totals_n)}</p>
                    <code style="font-size: 9px;">root</code>
                </div>`;
            }
        })
        document.querySelector(dom_class).innerHTML = process_dom;
    }

    writeProcess(PythagoreanTable, ".py_process")
    writeProcess(ChaldeanTable, ".ch_process")

    function getRootNumber(referenceTable) {
        var root_number = 0;

        inputName.forEach(num => {
            for (numTable in referenceTable) {
                if (referenceTable[numTable].includes(num)) {
                    // console.log(num)
                    root_number += Number(numTable);
                }
            }
        })
        // console.log(root_number)
        root_number = sumTillDigit(root_number);
        return root_number;
    }

    function getLuckyNumbers(root) {
        var lucky_numbers = [...LuckyNumbers[root]];
        var contained_number = Number(checkSingleNumberOfLuck(inputName_).digit);
        if(contained_number != 0) {
            if (!lucky_numbers.includes(contained_number)) {
                lucky_numbers.push(contained_number);
            } else {
                contained_boost = contained_number;
            }
        }
        
        return [lucky_numbers];
    }

    // console.log(getRootNumber(PythagoreanTable));
    // console.log(getLuckyNumbers(getRootNumber(PythagoreanTable)));
    // console.log(getRootNumber(ChaldeanTable));

    function sumTillDigit(num) {
        do {
            num = num.toString().split('').reduce((a, b) => Number(a) + Number(b), 0);
        } while (num >= 10);
    
        return num;
    }

    function checkSingleNumberOfLuck(text) {
        const numbers = text.match(/\d+/g); // Extract all digits from the text
        
        if ((numbers !== null && numbers.length === 1) && Culture_and_Effect.hasOwnProperty(numbers)) {
            for (const n in Culture_and_Effect) {
                return { hasOneNumber: true, digit: numbers[0]}; // Return the found digit
            }
        }
        return { hasOneNumber: false, digit: null }; // No number or multiple numbers
    }

    function find_effect(num) {
        return Culture_and_Effect[num];
    }

    // console.log(find_effect(9));


    // Write to DOM
    function writeRoots() {
        document.querySelectorAll(".writePyRoot").forEach(i => {
            i.innerText = getRootNumber(PythagoreanTable);
        })

        document.querySelectorAll(".writeChRoot").forEach(i => {
            i.innerText = getRootNumber(ChaldeanTable);
        })
    }
    writeRoots();

    function writeLuckyNumbers(referenceTable, ContainerElement) {
        let arr1 = getLuckyNumbers(getRootNumber(PythagoreanTable));
        let arr2 = getLuckyNumbers(getRootNumber(ChaldeanTable));
        // console.log(arr2)

        const common_boost_array = arr1[0].filter(item => arr2[0].includes(item));

        var Py_lucky = getLuckyNumbers(getRootNumber(referenceTable));
        Py_lucky = Py_lucky[0];
        var writeLuck = document.querySelector(ContainerElement);
        writeLuck.innerHTML = "";            
        for (i = 0; i < Py_lucky.length; i++) {
            var boost;
            var boostX = 0;
            if (Culture_and_Effect.hasOwnProperty(Py_lucky[i])) {
                boost = Culture_and_Effect[Py_lucky[i]];
                // console.log(boost);                  
                for (b in boost) {
                    for (bx = 0; bx < boost[b].length; bx++) {      
                        if (typeof boost[b][bx] === 'object') {
                            boostX += boost[b][bx].boost;
                            // console.log(boost[b][bx].boost);                  
                            // console.log(boost[b][bx]);                  
                        }
                    }
                }
            }
            if (Py_lucky[i] == contained_boost) {
                boostX *= 2;
            }
            let common_boost = "";
            // console.log(common_boost_array);
            if (common_boost_array.includes(Py_lucky[i])) {
                common_boost = "common_boost";
            } else {
                common_boost = "uncommon_boost";
            }
            
            writeLuck.innerHTML += number_card("lucky_number " + common_boost, Py_lucky[i], (boostX == 0 ? "" : "x" + boostX));
        }

        var effects_container = document.querySelector(".effects");

        var effects_list = "";
        var Japanese_effect = [];
        var Western_effect = [];
        var Chinese_effect = [];
        var Indian_effect = [];

        var japanese_cards = "";
        var Chinese_cards = "";
        var Western_cards = "";
        var Indian_cards = "";
        
        Py_lucky.forEach(a1 => {
            for (const a in Culture_and_Effect[a1]) {
                if (a == "Japanese") {
                    Japanese_effect.push([a1,Culture_and_Effect[a1][a]])
                } else if (a == "Chinese") {
                    Chinese_effect.push([a1,Culture_and_Effect[a1][a]])
                } else if (a == "Western") {
                    Western_effect.push([a1,Culture_and_Effect[a1][a]])
                }  else if (a == "Indian") {
                    Indian_effect.push([a1,Culture_and_Effect[a1][a]])
                }
            }
        })

        Japanese_effect.forEach(a => {
            let effect_summary = "";
            effect_summary += a[1][0].text;
            effect_summary += ", ";
            if (typeof a[1][1] == "string") {
                effect_summary += a[1][1];
            } else {
                effect_summary += a[1][1].text;
            }
            japanese_cards += `<div class='number_card tooltip' title="${effect_summary}" data-tooltip-content="${effect_summary}">` + a[0] + `</div>`;
        })

        Chinese_effect.forEach(a => {
            let effect_summary = "";
            effect_summary += a[1][0].text;
            effect_summary += ", ";
            if (typeof a[1][1] == "string") {
                effect_summary += a[1][1];
            } else {
                effect_summary += a[1][1].text;
            }
            Chinese_cards += `<div class='number_card tooltip' title="${effect_summary}" data-tooltip-content="${effect_summary}">` + a[0] + `</div>`;
        })

        Western_effect.forEach(a => {
            let effect_summary = "";
            effect_summary += a[1][0].text;
            effect_summary += ", ";
            if (typeof a[1][1] == "string") {
                effect_summary += a[1][1];
            } else {
                effect_summary += a[1][1].text;
            }
            Western_cards += `<div class='number_card tooltip' title="${effect_summary}" data-tooltip-content="${effect_summary}">` + a[0] + `</div>`;
        })

        Indian_effect.forEach(a => {
            let effect_summary = "";
            effect_summary += a[1][0].text;
            effect_summary += ", ";
            if (typeof a[1][1] == "string") {
                effect_summary += a[1][1];
            } else {
                effect_summary += a[1][1].text;
            }
            Indian_cards += `<div class='number_card tooltip' title="${effect_summary}" data-tooltip-content="${effect_summary}">` + a[0] + `</div>`;
        })

        effects_list += 
            `<div class="effect">
                <h5>Japanese Culture</h5>
                ${japanese_cards}
            </div>`;

        effects_list += 
            `<div class="effect">
                <h5>Chinese Culture</h5>
                ${Chinese_cards}
            </div>`;

        effects_list += 
            `<div class="effect">
                <h5>Western Culture</h5>
                ${Western_cards}
            </div>`;

        effects_list += 
            `<div class="effect">
                <h5>Indian Culture</h5>
                ${Indian_cards}
            </div>`;

        // console.log(effects_list)
                    
        effects_container.innerHTML = effects_list;
    }
    writeLuckyNumbers(PythagoreanTable, ".writePyLuck");
    writeLuckyNumbers(ChaldeanTable, ".writeChLuck");

    function number_card(addClass, pText, boostText) {
        let number_card_div = `
            <div class="number_card ${addClass}">
                <p>${pText}</p>
        `;

        number_card_div += boostText == null ? "" : "<code>" + boostText + "</code>";
        number_card_div += `</div>`;

        return number_card_div;
    }



})