/* This file, related code, assets, styling and indicia are Copyright (c) Friv.com 2006-2022. Unauthorised reproduction is prohibited. All rights reserved. */

var ver = "v2022.10.20";
var debug = false;
//alert(ver);

if (debug) {
    debugText.style.display = "block";
    setInterval(function () {
        debugText.innerHTML = "Debugging Info - Tap to remove. Build: " + ver + "<br>innerHeight:" + innerHeight + "  screen.height:" + screen.height + "  Ratio:" + (innerHeight / screen.height);
    }, 1000);

    debugText.addEventListener("click", function () {
        debugText.style.display = "none";
    });
}



//COOKIES
/////////

var pageViews = -1;
var gamePlays = -1;

//pageview
var n = localStorage.getItem('visitsCounter');
if (n === null) {
    n = 0;
}
pageViews = n;
console.log("cookie pageviews: " + pageViews);

//gameplays
var x = localStorage.getItem('gamePlays');
if (x === null) {
    x = 0;
}

gamePlays = x;

console.log("cookie gameplays: " + gamePlays);

setTimeout(function () {
    gamePlays++;
    localStorage.setItem("gamePlays", gamePlays);
    console.log("cookie gameplays increment: " + gamePlays);
}, 100000); //100 seconds of gameplay




var isSchool = false;
if (window.location.hostname.indexOf("school") > -1 || window.location.hostname.indexOf("math") > -1) {
    isSchool = true;
}

if (game.title.length > 28) {
    infoBoxTitle.style.fontSize = "5vmax";
}

if (game.loadingSizeMB > 20) {
    game.enDescription += "<br>Note: Please WAIT for loading. It’s well worth it!";
}

gameMB.innerHTML = game.loadingSizeMB + "MB";





var os = "Other";

var hasTouchPoints = false;
if (navigator.maxTouchPoints > 0) {
    hasTouchPoints = true;
}

var userAgent = navigator.userAgent || navigator.vendor || window.opera;

function getAndroidVersion() {
    var match = userAgent.toLowerCase().match(/android\s([0-9\.]*)/i);
    return match ? parseInt(match[1], 10) : false;
};


var mSpecial = false;
if (game.title.indexOf("inecra") > -1) {
    mSpecial = true;
}

//get user os
function getOperatingSystem() {
    if (userAgent.indexOf('Macintosh') != -1) {
        return "Desktop";
    }
    if (/android/i.test(userAgent) && hasTouchPoints) {
        return "Android";
    }
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }
    if (navigator.platform === 'MacIntel' && hasTouchPoints) { //newer iPads
        return "iOS";
    }
    return "Desktop";
}

var os = getOperatingSystem();

if (os == "Desktop") { //further sub divide...

    if (userAgent.indexOf("Windows NT 10.0") != -1) {
        //console.log("OS is Windows 10 or 11");
        os += "-winNewest";
    }

    if (userAgent.indexOf("Windows NT 6.") != -1) { //8.1 or 8.0 or 7.0
        //console.log("OS is Windows 7 or 8");
        os += "-win7-8";
    }

    if (userAgent.indexOf("Mac") != -1) {
        //console.log("OS is MacOS");
        os += "-macOS";
    }

    if (userAgent.indexOf("CrOS") != -1) {
        //console.log("OS is Chrome OS");
        os += "-chromeOS";
    }

    if (os == "Desktop") { //if still only "Desktop"
        //console.log("OS is unknown Desktop - likely Linux");
        os = "Desktop-other";
    }

}

if (!game.showBackButton) {
    backButton.style.display = "none";
}

if (!game.showGameEffectsButton) {
    gameEffectsButton.style.display = "none";
}

if (game.walkthrough == "") {
    walkthroughButton.style.display = "none";
}


var touchDevice = false; // could use...  typeof window.orientation == "undefined"
if ((os == "Android" && hasTouchPoints) || os == "iOS") {
    touchDevice = true;
}

//OUTPUT CONTROLS
/////////////////

if (!touchDevice) {
    var controlsString = "";

    if (game.controls.indexOf("m") > -1) {
        controlsString += "<div id=mouse></div>";
    }
    if (game.controls.indexOf("g") > -1) {
        controlsString += "<div id=gamepad></div>";
    }
    if (game.controls.indexOf("k") > -1) {
        controlsString += "<div id=keyboard></div>";
    }

    var i;
    var singleKey = "";
    for (i = 0; i < game.keys.length; i++) {

        var keySize = "";
        singleKey = game.keys.slice(i, i + 1);

        switch (singleKey) {
            case "U":
                singleKey = "&uarr;";
                break;
            case "D":
                singleKey = "&darr;";
                break;
            case "L":
                singleKey = "&larr;";
                break;
            case "R":
                singleKey = "&rarr;";
                break;
            case "S": //spacebar
                singleKey = "_";
                keySize = "Large";
                break;
            case "C": //ctrl
                singleKey = "ctrl";
                keySize = "Large";
                break;
            case "E": //enter
                singleKey = "&#8626;";
                keySize = "Medium";
                break;
            case "T": //shift
                singleKey = "&#8679;";
                keySize = "Medium";
                break;
            case "B": //tab
                singleKey = "&#8646;";
                keySize = "Medium";
                break;
            default:
                singleKey = singleKey.toUpperCase(); //if not an arrow key, make the letter uppercase
        }

        controlsString += "<div class=key" + keySize + "><div class=keyCharacter>" + singleKey + "</div></div>"
    }
    infoBoxControls.innerHTML = controlsString;
} else {
    infoBoxControls.style.display = "none";
}

//for long titles
if (game.title.length > 24) {
    infoBoxTitle.style.fontSize = "4vmax";
}

if (game.title.length > 30) {
    infoBoxTitle.style.fontSize = "3.5vmax";
}

if (game.loadingSeconds == "auto") { //if game loadin time is not specified ('auto' is used) then calculate based on game size
    game.loadingSeconds = game.loadingSizeMB;
    if (game.loadingSeconds < 9) {
        game.loadingSeconds = 9;
    }
    if (game.loadingSeconds > 16) {
        game.loadingSeconds = 16;
    }
}
game.loadingSeconds += "s";

spinner.style.animation = "spinner 2s linear forwards infinite, spinnerRemove 0s " + game.loadingSeconds + " linear forwards";
playButton.style.animation = "playButtonShow 0s " + game.loadingSeconds + " linear forwards, shake1 1s 15s cubic-bezier(0.36, 0.07, 0.19, 0.97)";
infoBoxLoadingBar.style.animation = "infoBoxLoadingBar " + game.loadingSeconds + " 1.5s linear forwards";

//fix 'click' and tap' text in description

if (touchDevice) {
    game.enDescription = game.enDescription.replace(/click/g, "tap");
    game.enDescription = game.enDescription.replace(/Click/g, "Tap");
    game.enDescription = game.enDescription.replace(/clicks/g, "taps");
    game.enDescription = game.enDescription.replace(/Clicks/g, "Taps");
    game.enDescription = game.enDescription.replace(/clicking/g, "tapping");
    game.enDescription = game.enDescription.replace(/Clicking/g, "Tapping");
    game.enDescription = game.enDescription.replace(/mouze/g, "finger");
}
game.enDescription = game.enDescription.replace(/mouze/g, "mouse");



//promo of site
var promoText = [
            ["😁 You are on the genuine Friv® - yay! You can be 100% sure when playing " + game.title + " or any of our games, that we'll NEVER interrupt your game to show you an ad. Yay again!"],
            ["😁 Other sites interrupt gameplay and make you sit through video ads. At Friv we'll NEVER do that - it's plain rude. If your friends don't already know about Friv, please tell them!"],
            ["😃 You are smart. You deserve a trophy. 🏆 You are playing " + game.title + " at friv.com where there are no ad interruptions. EVER. If you like Friv, please spread the word. Thank you!"],
            ["😇 We value you. We think you're amazing ...a bit special even. That's why you can play " + game.title + " or any of the games on Friv without any ad interruptions, EVER!"],
            ["😃 We love our loyal users. We want you to enjoy playing " + game.title + " and all our games without ever being nagged. We proudly give you the Friv no in-game ads GUARANTEE! 📝"],
            ["😃 At Friv we love our website but we don't have a lot of money to spend advertising it. If you can, please tell your friends and help the site grow. 📈 Thank you!"],
            ["😂 Please spread the word! Wear a sandwich board reading &quot;I LOVE FRIV!&quot; into town. Or maybe repaint 🖌️ your (Dad's) car with Friv styling! 😉"],
            ["😍 Please spread the word about Friv! Before playing " + game.title + ", kindly throw open your windows and shout &quot;I LOVE FRIV!&quot;."],
            ["😃 If you like Friv and you enjoy playing " + game.title + ", please tell your friends in person, or on WhatsApp / Facebook / Instagram / YouTube / Twitter / TikTok etc. Thank you!"],
            ["😜 Here's something, but you have to keep it WAY more secret than we are. On the Friv menu page, click on the logo 10 times, and you will get extra games!"],
            ["😜 Friv is finally on TikTok! Find us @friv ...we'd be so grateful if you would follow us and like our videos! Thank you!"],
            ["😁 The more people who play on Friv, the more great games we can add. Please tell your friends!"],
            ["😁 Want more games? ...Please tell your friends about Friv. The more players we have, the more great games we can add!"],
        ];

setTimeout(function () {
    if (gamePlays > 3 && Math.random() > 0.9) {
        game.enDescription = promoText[Math.floor(Math.random() * promoText.length)];
    };
    infoBoxDesc.innerHTML = game.enDescription;
}, 9000);


infoBoxTitle.innerHTML = game.title;
infoBoxDesc.innerHTML = game.enDescription;

/////////////////////////////////////////// BIT OF FUN - RANDOM TEXT EFFECT
//character replace function
function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substr(0, index) + chr + str.substr(index + 1);
}

//all permissable characters   
var chars = "!.?&'-: abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890ü";

var newGameName = "";
var stringLength = game.title.length;
var testChar1 = "";
var testChar2 = "";

//generate random string of the same length as the game name
var i;
for (i = 0; i < game.title.length; i++) {
    newGameName += chars.substr((Math.floor(Math.random() * chars.length)), 1);
}

var textTimer;
if (game.title.length < 27) { //exclude effect for 2-line game titles
    setTimeout(function () {
        var textTimer = setInterval(function () {
            blastText()
        }, 100);
    }, 22000);
}

//var textTimer = setInterval(function(){ blastText() }, 100);   

function blastText() {

    for (i = 0; i < 200; i++) { //to speed up operation, do x loops each call

        //generate random character index
        randCharIndex = Math.floor(Math.random() * stringLength);

        //get random chars
        testChar1 = chars.substr((Math.floor(Math.random() * chars.length)), 1); //random character from the full list of characters
        testChar2 = game.title.substr(randCharIndex, 1); //random character from the game name

        //replace character if correct
        if (testChar1 == testChar2) {
            newGameName = setCharAt(newGameName, randCharIndex, testChar1); //if there is a match, update newGameName with the match
        }

        //write one random new character in each cycle
        if (newGameName.substr(randCharIndex, 1) != game.title.substr(randCharIndex, 1)) {
            newGameName = setCharAt(newGameName, randCharIndex, testChar1);
        }

        //when matching string is found, stop operation
        if (newGameName == game.title) {
            clearInterval(textTimer);
        }

        infoBoxTitle.innerHTML = newGameName;

    } //end for

} // end func

///////////////////////////////////////////

var requestFullscreen = function (ele) {
    if (ele.requestFullscreen) {
        ele.requestFullscreen();
    } else if (ele.webkitRequestFullscreen) {
        ele.webkitRequestFullscreen();
    } else if (ele.mozRequestFullScreen) {
        ele.mozRequestFullScreen();
    } else if (ele.msRequestFullscreen) {
        ele.msRequestFullscreen();
    } else {
        console.log('Fullscreen API is not supported.');
    }
};

var exitFullscreen = function () {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else {
        console.log('Fullscreen API is not supported.');
    }
};

//currently an unused feature - check its use with future games
var allowFullScreen = true;
//if (game.title == "Algerian Solitaire"){
//    allowFullScreen = false;
//}

//when user clicks to play game (remove loading overlay, enter fullscreen etc.)
loadingBox.addEventListener('click', function (e) {
    loadingOverlay.style.display = "none";
    backButton.style.animationPlayState = "running";
    gameEffectsButton.style.animationPlayState = "running";
    walkthroughButton.style.animationPlayState = "running";

    //ios full screen seems to cause problems, so fullscreen is disabled in iOS right now
    if (os.indexOf("iOS") == -1 && !mSpecial && allowFullScreen) {
        e.preventDefault();
        requestFullscreen(document.documentElement);

        setTimeout(function () {
            fullscreenListeners();
        }, 1000);
    }

    //if needed, check orientation of game start, then listen for device orientation change. Some games "autoDetect" detect, others do not and are "noDetect" games.
    if (((game.orientation == "Portrait") || (game.orientation == "Landscape")) && (game.orientationAdviceRequired)) {
        checkOrientation();
        window.addEventListener('orientationchange', checkOrientation);
    }
    scaleGame();
    
    if (mSpecial) {
        window.open(atob("aHR0cHM6Ly9jbGFzc2ljLm1pbmVjcmFmdC5uZXQv"), "_blank");
    }
    
});

//if on mobile, run game orientation icon animation
if (touchDevice || debug == true) {
    if (game.orientation == "Landscape") {
        orientationIconLandscape.style.animationPlayState = "running";
    } else {
        orientationIconPortrait.style.animationPlayState = "running";
    }
}

//if on mobile AND user has wrong orientation, flash icon at x seconds
setTimeout(function () {
    if (os == "Android" || debug == true) {
        if ((screen.width < screen.height) && game.orientation == "Landscape") {
            orientationIconLandscape.style.animation = "brightFlash 3s forwards";
        }
        if ((screen.width > screen.height) && game.orientation == "Portrait") {
            orientationIconPortrait.style.animation = "brightFlash 3s forwards";
        }
    }
    if (os == "iOS") {
        if ((window.orientation == 0 || window.orientation == 180) && game.orientation == "Landscape") {
            orientationIconLandscape.style.animation = "brightFlash 3s forwards";
        }
        if ((window.orientation == 90 || window.orientation == -90) && game.orientation == "Portrait") {
            orientationIconPortrait.style.animation = "brightFlash 3s forwards";
        }
    }
}, 8000);

//if browser somehow exits fullscreen (non iOS) display button to allow user to click and go into fullscreen again, then remove button
if (os != "iOS" && allowFullScreen) {
    fullScreenButton.addEventListener('click', function (e) {
        e.preventDefault();
        requestFullscreen(document.documentElement);
        fullScreenButton.style.display = "none";
    });
}

backButton.addEventListener('click', function (e) {
    if (os != "iOS" && allowFullScreen) {
        e.preventDefault();
        exitFullscreen();
    }

    var returnURL = "https://www.friv.com/";

    //show new (test) games to established desktop players first
    if (gamePlays > 1 && os.indexOf("Desktop") > -1) {
        returnURL = "https://www.friv.com/new.html";
    }

    if (isSchool || gamePlays == 23) {
        returnURL = "https://www.friv4school.com/";
    }

    window.location.assign(returnURL);
});

walkthroughButton.addEventListener('click', function (e) {
    window.open(game.walkthrough);
});

//listen for any (unexpected) screen change and make full screen button visible  
//delay added to prevent showing when user clicks back button
function fullscreenListeners() {
    //as listening for fullscreenchange seems unreliable (Android) this simpler solution works for all cases 
    setInterval(function () {
        //if (window.innerHeight == screen.height) {
        if (innerHeight / screen.height > 0.9) {
            innerHeight / screen.height
            fullScreenButton.style.display = "none";
            //console.log("browser is fullscreen (or close to)");
        }
        if (innerHeight / screen.height < 0.90 && os.indexOf("iOS") == -1) { //check it is STILL the case (timeout)
            fullScreenButton.style.display = "block";
            //console.log("browser is windowed");
        }
    }, 1000);

}

//repeatedly focus game to ensure correct start and continued play
setInterval(function () {
    gameBox.focus()
}, 500);

function checkOrientation() {
    setTimeout(function () {
        if (os == "iOS") {
            if ((window.orientation == 90 || window.orientation == -90) && game.orientation == "Landscape") {
                orientationOverlay.style.display = "none";
            }
            if ((window.orientation == 0 || window.orientation == 180) && game.orientation == "Landscape") {
                orientationOverlay.style.display = "block";
            }
            if ((window.orientation == 90 || window.orientation == -90) && game.orientation == "Portrait") {
                orientationOverlay.style.display = "block";
            }
            if ((window.orientation == 0 || window.orientation == 180) && game.orientation == "Portrait") {
                orientationOverlay.style.display = "none";
            }
        }

        if (os == "Android") {
            if ((screen.width > screen.height) && game.orientation == "Landscape") {
                orientationOverlay.style.display = "none";
            }
            if ((screen.width < screen.height) && game.orientation == "Landscape") {
                orientationOverlay.style.display = "block";
            }
            if ((screen.width > screen.height) && game.orientation == "Portrait") {
                orientationOverlay.style.display = "block";
            }
            if ((screen.width < screen.height) && game.orientation == "Portrait") {
                orientationOverlay.style.display = "none";
            }
        }
    }, 500);
}

function scaleGame() {
    gameBox.style.height = (window.innerHeight * 1) + "px";
    gameBox.style.width = (window.innerWidth * 1) + "px";
}

window.addEventListener('resize', () => {
    scaleGame();
});

gameBox.src = game.source;

//once game source specified, scale game (important for Chrome with loading flash)
scaleGame();

//overlay and flip effects etc.
effectsCounter = 0;
gameEffectsButton.addEventListener("click", function () {

    gameBox.style.transition = "1s";

    switch (effectsCounter) {
        case 0:
            gameEffectsButton.style.animation = "none";
            gameEffectsButton.style.right = "0";
            gameEffectsIndicator.style.opacity = "0.5";
            gameEffectsButton.style.opacity = "0.5";
            //gameOverlay.style.backgroundImage = "none";
            //analytics for those starting cycle
            gtag('event', ('Effects Start : ' + game.title), {
                'event_category': 'Navigation',
                'event_label': 'Game Effects'
            });
            break;
        case 1:
            gameOverlay.style.backgroundImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgTWFjaW50b3NoIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjI4RkZBQTgzNzg1NzExRTU4NTQyODc3OUM4MTZGMUREIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjI4RkZBQTg0Nzg1NzExRTU4NTQyODc3OUM4MTZGMUREIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjhGRkFBODE3ODU3MTFFNTg1NDI4Nzc5QzgxNkYxREQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MjhGRkFBODI3ODU3MTFFNTg1NDI4Nzc5QzgxNkYxREQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz66uHInAAAAIUlEQVR42mL5//8/AyMj42YGIGBigABfEMEIkoEBgAADAKvuBwVS8BAjAAAAAElFTkSuQmCC)";
            gameOverlay.style.backgroundSize = "3px 3px";
            break;
        case 2:
            gameOverlay.style.backgroundImage = "linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.2),rgba(0,0,0,0.0))";
            gameOverlay.style.backgroundSize = "100% 0.5%";
            break;
        case 3:
            gameOverlay.style.backgroundImage = "none";
            gameBox.style.filter = "hue-rotate(60deg)";
            break;
        case 4:
            gameBox.style.filter = "hue-rotate(120deg)";
            break;
        case 5:
            gameBox.style.filter = "hue-rotate(180deg)";
            break;
        case 6:
            gameBox.style.filter = "hue-rotate(240deg)";
            break;
        case 7:
            gameBox.style.filter = "blur(0.5vmin)";
            break;
        case 8:
            gameBox.style.filter = "blur(2vmin)";
            break;
        case 9:
            gameBox.style.filter = "none";
            gameBox.style.transform = "skewX(15deg)";
            break;
        case 10:
            gameBox.style.transform = "skewX(-15deg)";
            break;
        case 11:
            gameBox.style.transform = "scale(-1,-1)";
            break;
        case 12:
            gameBox.style.transform = "scaleX(-1)";
            break;
        case 13:
            gameBox.style.transform = "scaleY(-1)";
            break;
        case 14:
            gameBox.style.transform = "none";
            gameBox.style.filter = "grayscale(100%)";
            break;
        case 15:
            gameBox.style.filter = "sepia(100%)";
            break;
        case 16:
            gameBox.style.filter = "contrast(200%)";
            break;
        case 17:
            gameBox.style.filter = "brightness(50%)";
            break;
        case 18:
            gameBox.style.filter = "invert(100%)";
            break;
        case 19:
            gameBox.style.filter = "none";
            gameBox.style.animation = "shake2 1s infinite";
            break;
        case 20:
            gameBox.style.animation = "shake3 1s infinite";
            break;
        case 21:
            gameBox.style.animation = "rock 1s ease-in-out alternate infinite";
            break;
        case 22:
            gameBox.style.animation = "roll 10s linear infinite";
            //analytics for those seeing complete cycle
            gtag('event', ('Effects Cycle'), {
                'event_category': 'Navigation',
                'event_label': 'Game Effects'
            });
            break;
        case 23:
            gameBox.style.animation = "none";
            effectsCounter = 0;
            break;
        default:
    }
    gameEffectsIndicator.innerHTML = effectsCounter;
    effectsCounter++;
});









//TEST FOR IFRAMES
//////////////////
//console.log("Testing Framing");

var externallyFramed = false;
(function () {
    try {
        externallyFramed = top.location.host != location.host;
    } catch (err) {
        externallyFramed = true;
    }
    if (externallyFramed) {
        //top.location = location;
        console.log("Game EF."); //external framing
        console.log(document.referrer);
    } else {
        //console.log("Game NOT EF.");
    }
})();


let debugString = "Debugging: ";


//ANALYTICS
///////////
var imported = document.createElement('script');
imported.src = 'https://www.googletagmanager.com/gtag/js';
document.head.appendChild(imported);

window.dataLayer = window.dataLayer || [];

function gtag() {
    dataLayer.push(arguments);
}

gtag('js', new Date());


//default...


var mustSetAnalytics = true; //analytics needs to be set

//to test some games at 100% etc
if (game.spare == 1 && mustSetAnalytics) { //any 'extra' games regardless of os
    gtag('config', 'UA-124684579-4', {
        'send_page_view': false,
        'sample_rate': 100
    });

    mustSetAnalytics = false;
    debugString += "UA-124684579-4 | ";
}

if (isSchool && mustSetAnalytics) {
    gtag('config', 'UA-124684579-7', { //all school games (except 'extra' ganes)
        'send_page_view': false,
        'sample_rate': 100
    });

    mustSetAnalytics = false;
    debugString += "UA-124684579-7 | ";
}

if (os == "iOS" && mustSetAnalytics) {
    gtag('config', 'UA-124684579-2', { //all ios users, except those playing extra games or on friv4school
        'send_page_view': false,
        'sample_rate': 100
    });

    mustSetAnalytics = false;
    debugString += "UA-124684579-2 | ";
}

if (os == "Desktop-winNewest" && mustSetAnalytics) {
    gtag('config', 'UA-124684579-6', { //most users
        'send_page_view': false,
        'sample_rate': 10
    });

    mustSetAnalytics = false;
    debugString += "UA-124684579-6 | ";
}

if (os == "Android" && mustSetAnalytics) {
    gtag('config', 'UA-124684579-6', { //most users
        'send_page_view': false,
        'sample_rate': 100
    });

    mustSetAnalytics = false;
    debugString += "UA-124684579-6 | ";
}

if (mustSetAnalytics) {
    gtag('config', 'UA-124684579-6', { //anyone else, to include win7/8, macOS, chromeOS, linux etc.
        'send_page_view': false,
        'sample_rate': 20
    });

    debugString += "UA-124684579-6";
}









//check for newer iPads etc.
if (navigator.platform === 'MacIntel' && hasTouchPoints) { //newer iPads
    os += "-newTech";
}

//check for newer iPhones and iPodTouch etc.
if (/iPhone|iPod/.test(userAgent)) {
    os += "-iPhone";
}

//check for Amazon tablets
if (/silk/i.test(userAgent)) {
    os = "Amazon-Silk";
}

//break out android versions
if (os == "Android") {

    var androidVersionTruncated = getAndroidVersion();
    var os = "AndroidLow";

    if (androidVersionTruncated == 9 || androidVersionTruncated == 10) {
        os = "AndroidMid";
    }

    if (androidVersionTruncated >= 11) {
        os = "AndroidHigh";
    }
}







//SEND EVENTS
/////////////

if (gamePlays > 2) {

    gtag('event', ("Loaded : " + game.title), {
        'event_category': 'GameX Play',
        'event_label': ('GameX : Loaded : ' + os)
    });

    setTimeout(function () {
        gtag('event', ("3 Mins : " + game.title), {
            'event_category': 'GameX Play',
            'event_label': ('GameX : 3 Mins : ' + os)
        });
    }, 180000);

    setTimeout(function () {
        gtag('event', ("10 Mins : " + game.title), {
            'event_category': 'GameX Play',
            'event_label': ('GameX : 10 Mins : ' + os)
        });
    }, 600000);

    function recordRightClick() {
        gtag('event', ("Right Click : " + game.title), {
            'event_category': 'Debugging',
            'event_label': ('GameX : Right Click : ' + os)
        });
    }

}

//promo
if (false) {
    promoBox.style.display = "block";
    promoBox.innerHTML = debugString;
}

//EXPERIMENTAL VIEWPORT SETTING
///////////////////////////////
if (touchDevice) {
    document.addEventListener('DOMContentLoaded', (event) => {
        //console.log('DOM fully loaded and parsed');
        setTimeout(function () {
            //console.log('Changing viewport...');
            var metaTag = document.createElement('meta');
            metaTag.name = "viewport";
            metaTag.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0";
            document.getElementsByTagName('head')[0].appendChild(metaTag);
        }, 7000); //best-guess-for-lh
    });
}


//DISABLE RIGHT CLICKS
//////////////////////

//disable rmb on loader page
document.addEventListener('contextmenu', event => event.preventDefault());

//disable rmbon inner game page
setTimeout(function () {

    //disable rmb on inner game
    gameBox.contentWindow.document.getElementsByTagName("body")[0].addEventListener("contextmenu", e => e.preventDefault());

    //listen for and record rmb
    //gameBox.contentWindow.document.getElementsByTagName("body")[0].addEventListener('contextmenu', function (e) {
    //    console.log("rmb");
    //    recordRightClick();
    //});

}, 2000);


//CONVERSIONS NEW
/////////////////

//setup...
window.dataLayer = window.dataLayer || [];

function gtag() {
    dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'AW-10805618303');

//event...
if (gamePlays == 0) { //new user
    setTimeout(function () {
        console.log("conv new");
        gtag('event', 'conversion', {
            'send_to': 'AW-10805618303/vc_CCJLRooIDEP_MwqAo'
        });
    }, 60000); //1 minute of gameplay
}
