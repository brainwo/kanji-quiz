
var answer;
var i = 0;
var n = 0;
var executed = false;


var INIT = (function () {
    return function () {
        if (!executed) {
            if (Cookies.get('kanjiList') != undefined && Cookies.get('eigoList') != undefined) {
                var listKanji = JSON.parse(Cookies.get('kanjiList'));
                kanji[5] = listKanji;
                var listEigo = JSON.parse(Cookies.get('eigoList'));
                eigo[5] = listEigo;
                $(".list").attr('disabled', false);
            }
            $(".kanji").text(kanji[n][i]);
            $(".eigo").text(eigo[n][i]);
            //$(".eigo").text(onyomi[n][i]);
            //$(".eigo").text(kunyomi[n][i]);
            $(".count").text(i + "/" + eigo[n].length)
            executed = true;
        }
    };
})();

INIT(); // Initializes first kanji of N5

function simulateEnter() {
    
    $(".count").text(i + "/" + eigo[n].length)
    jQuery.event.trigger({ type: 'keyup', which: 13 });
}

function difficulty() {
    i = 0;
    n = $('#select[name=diff]:checked').val();
    simulateEnter();
}

function options() {
    $(".options").slideToggle("fast");
}

$(".fonts").change(function () {
    var str = "";
    $(".fonts option:selected").each(function () {
        str = $(this).val();
    });
    $(".kanji").css("font-family", ('"' + str + '"'))
})

//Fisher-Yates Shuffle
function shuffle(a, b) {
    for (let m = a.length - 1; m > 0; m--) {
        const j = Math.floor(Math.random() * (m + 1));
        [a[m], a[j]] = [a[j], a[m]];
        [b[m], b[j]] = [b[j], b[m]];
    }
    i = 0;
    simulateEnter();
    return a, b;
}

//Take 10 steps back
function repeatMinus() {
    i -= 10;
    if (i < 0) {
        i = eigo[n].length - 10;
    }
    simulateEnter();
}

//Take 10 steps forward
function repeatPlus() {
    i += 10;
    if (i >= eigo[n].length) {
        i = 0;
    }
    simulateEnter();
}

var keys = {};
var timerStart = 0;
//Whats happens when you press enter
$(document).keyup(function (e) {

    if (e.which == 13) {

        $(".kanji").css("color", "black")
        answer = $("input").val().toLowerCase();
        $(".eigo").css("visibility", "hidden");
        $(".onyomi").css("display", "none");
        $(".kunyomi").css("display", "none");
        $(".kanji").text(kanji[n][i]);
        $(".eigo").text(eigo[n][i]);
        //var ony = $(".onyomi").text(onyomi[n][i]).text();
        //var kun = $(".kunyomi").text(kunyomi[n][i]).text();
        e_val = $(".eigo").text(eigo[n][i]).text().toLowerCase();
        

        if (i === eigo[n].length) {
            $(".kanji").text(kanji[n][0]);
            $(".eigo").text(eigo[n][0]);
            i = 0;
        }

        if (e_val.includes(answer) && answer != "" && answer != undefined) {
            $(".kanji").animate({ color: "#5CDBA4" }, 200);
            $(".action").val("")
            $(".eigo").css("visibility", "visible");

            if (reading) {
                $(".onyomi").css("display", "block");
                $(".kunyomi").css("display", "block");
               // $(".onyomi").text("on: " + onyomi[n][i]);
                //$(".kunyomi").text("kun: " + kunyomi[n][i]);
            }

            i++;
            $(".count").text(i + "/" + eigo[n].length)
            timerStart++;
            if (timerStart == 1 && timerShow == true) {
                timer();
            }
            if (i == eigo[n].length - 1) {
                clearTimeout(t);
            }
        }

    }

    if (e.which == 37) {
        repeatMinus();
    }

    if (e.which == 39) {
        repeatPlus();
    }

    if (e.which == 40) {
        addToList();
    }

});

function addToList() {
    if ($.inArray(kanji[n][i], kanji[5]) == -1) {
        kanji[5].push(kanji[n][i]);
        eigo[5].push(eigo[n][i]);
        Cookies.set('kanjiList', kanji[5], { expires: 7, path: '/' });
        Cookies.set('eigoList', eigo[5], { expires: 7, path: '/' });
        $(".list").attr('disabled', false);
    } else {
        console.log("already added " + kanji[n][i]);
    }
};

function removeList() {
    if (confirm("Are you sure you want to remove the list?")) {
        Cookies.remove('kanjiList');
        Cookies.remove('eigoList');
        location.reload();
    }
}


$(".peek").mouseover(function () {
    $(".peek").text(eigo[n][i]);

});

$(".peek").mouseenter(function () {
    $(".peek").text(eigo[n][i]);
}).mouseleave(function () {
    $(".peek").text("Hover to cheat...");
});


//stopwatch

var p = document.getElementsByTagName('p')[0],
    seconds = 0, minutes = 0, hours = 0,
    t;

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    p.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    timer();
}
function timer() {
    t = setTimeout(add, 1000);
}

var timerShow = false;

function showTimer() {
    timerShow = !timerShow;
    if (timerShow) {
        $(".timer").css("visibility", "visible");
    }
    else {
        clearTimeout(t);
        $(".timer").css("visibility", "hidden");
        p.textContent = "00:00:00";
        seconds = 0; minutes = 0; hours = 0;
        timerStart = 0;
    }

}


var reading = false;

function toggleReading() {
    reading = !reading;
    if (reading) {
        $(".onyomi").css("display", "block");
        $(".kunyomi").css("display", "block");
    }
    else {
        $(".onyomi").css("display", "none");
        $(".kunyomi").css("display", "none");

    }

}



/* Stop button
stop.onclick = function() {
    clearTimeout(t);
}

/* Clear button
clear.onclick = function() {
    p.textContent = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
}

*/














