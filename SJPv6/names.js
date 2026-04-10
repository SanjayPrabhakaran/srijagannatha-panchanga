console.log(getExecutingFileName() + ".............");
//Constants and functions which are language dependent like names of signs, planets, etc. are defined here. This file is included in jyotish.js and not in jyotish.min.js because the latter is minified and the names are replaced by single characters. This file is not minified to allow users to edit it and change the names as per their language and preference.     
//By : Sanjay Prabhakaran
//Signs: 1 Aries, 2 Taurus....12 and 0 Pisces
//Grahas: 1 Sun, 2 Moon, 3 Mars, 4 Mercury, 5 Jupiter, 6 Venus, 7 Saturn, 8 Rahu, 9 Ketu, 10 and 0 Lagna. Lagna is not a planet but we can treat it as one for ease of calculation and representation. Lagna is the sign which is rising on the eastern horizon at the time of birth. It is also called Ascendant. It is very important in Jyotish as it represents the self and the body. It is also the first house in the birth chart. The position of Lagna and its lord (the planet which rules the sign of Lagna) in the birth chart gives a lot of information about the person's physical appearance, health, personality, etc.
var SignNames = ["Pisces", "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
var GrahaNames = ["Lagna", "Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu", `Lagna`];
var GrahaNamesShort = ["La", "Su", "Mo", "Ma", "Me", "Ju", "Ve", "Sa", "Ra", "Ke", `La`];
var GrahaSymbols = ["/", "☉", "☽", "♂", "☿", "♃", "♀", "♄", "☊", "☋", "/"];
//पंचव्षौका युग होता है फिर वे बारह युण होते ह उन्दकर स्वामी कमे ष्णु 3 बहृस्पति २॥ १४॥
var panchaSamvatsaraDeva = ["1 Vishnu", "2 Brihaspati", "3 Indra", "4 Bhuma", "5 Tvashta", "6 Ahirbudhnya",
    "7 Pitru", "8 Vishwadeva", "9 Chandra", "10 Indragni", "11 Bhaga", "12 Ashwinikumara"];

///////////////////////////////////////////////////////////////////
console.log(getExecutingFileName() + ".............LOADED");
var GrahaSymbols = ["/", "☉", "☽", "♂", "☿", "♃", "♀", "♄", "☊", "☋", "/"];

// South Indian chart cell layout (rasi index, -1 = centre)
//  [11][0][1][2]
//  [10][-][-][3]
//  [ 9][-][-][4]
//  [ 8][7][6][5]
var SI_GRID = [
    [11, 0, 1, 2],
    [10, -1, -1, 3],
    [9, -1, -1, 4],
    [8, 7, 6, 5]
];
var RASI_NAMES = ["Ar", "Ta", "Ge", "Ca", "Le", "Vi", "Li", "Sc", "Sg", "Cp", "Aq", "Pi"];

function southIndianChart(chart) {
    // chart[0]   = lagna longitude (0–360°)
    // chart[1–9] = Sun, Moon, Mars, Mercury, Guru, Sukra, Shani, Rahu, Ketu

    function rasi(deg) { return Math.floor(((deg % 360) + 360) % 360 / 30); }

    var cells = {};
    for (var r = 0; r < 12; r++) cells[r] = [];

    // Lagna
    var lagnaRasi = rasi(chart[0]);
    var lagnaRem = Math.floor(((chart[0] % 30) + 30) % 30);
    cells[lagnaRasi].push({ sym: "L" + lagnaRem, isLagna: true });

    // Grahas 1–9
    for (var i = 1; i <= 9; i++) {
        var r2 = rasi(chart[i]);
        cells[r2].push({ sym: GrahaSymbols[i] });
    }

    // Build <table>
    var tbl = document.createElement("table");
    tbl.style.cssText = "border-collapse:collapse;font-family:monospace;font-size:11px;";

    for (var row = 0; row < 4; row++) {
        var tr = document.createElement("tr");
        for (var col = 0; col < 4; col++) {
            var td = document.createElement("td");
            td.style.cssText = "border:1.5px solid #888;width:52px;height:52px;vertical-align:top;padding:2px 3px;";
            var ri = SI_GRID[row][col];

            if (ri === -1) {
                td.style.background = "#f5f5f5";
            } else {
                // Blue top-border accent marks the lagna rasi
                if (ri === lagnaRasi)
                    td.style.borderTop = "3px solid #3B8BD4";

                // Sign abbreviation
                var sign = document.createElement("div");
                sign.style.cssText = "font-size:9px;color:#999;line-height:1;";
                sign.textContent = RASI_NAMES[ri];
                td.appendChild(sign);

                // Graha symbols
                var items = cells[ri];
                if (items.length) {
                    var gDiv = document.createElement("div");
                    gDiv.style.cssText = "font-size:12px;line-height:1.4;word-break:break-all;";
                    gDiv.textContent = items.map(function (it) { return it.sym; }).join(" ");
                    td.appendChild(gDiv);
                }
            }
            tr.appendChild(td);
        }
        tbl.appendChild(tr);
    }
    return tbl;
}