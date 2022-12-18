class globalStateManager {
    isPaused;
    isInFocus;
    gameStartTime;
    lastMouseMoveTime;

    constructor() {
        this.isPaused = false;
        this.isInFocus = true;
        this.gameStartTime = performance.now();
        this.lastMouseMoveTime = this.gameStartTime;
    }

    onBlur() {
        this.isInFocus = false;
        this.onMouseMove();
    }

    onFocus() {
        this.isInFocus = true;
        this.onMouseMove();
    }

    onPause() {
        this.isPaused = true;
    }

    onUnpause() {
        this.isPaused = false;
    }

    onMouseMove() {
        this.lastMouseMoveTime = performance.now();
    }

    timeSinceMouseMoved() {
        return performance.now() - this.lastMouseMoveTime;
    }

    timeSinceGameStarted() {
        return performance.now() - this.gameStartTime;
    }
}
var stateManager = new globalStateManager();
window.addEventListener('blur', function() {
    stateManager.onBlur();
});
window.addEventListener('focus', function() {
    stateManager.onFocus();
});
window.addEventListener('mousemove', function() {
    stateManager.onMouseMove();
});
window.addEventListener('click', function() {
    stateManager.onMouseMove();
});
window.addEventListener('touchstart', function() {
    stateManager.onMouseMove();
});
window.addEventListener('touchend', function() {
    stateManager.onMouseMove();
});

class globalAdManager {
    lastAdTime;
    numAdsShownInSession;
    hasShownEmailPrompt;
    isAdblockEnabled;
    isCrazygames;
    isCrazygamesLoaded;
    isCrazygamesLoading;
    crazyGamesSdk;
    adCountdownSeconds = 5;

    constructor() {
        this.lastAdTime = performance.now();
        this.numAdsShownInSession = 0;
        this.hasShownEmailPrompt = false;
        this.isAdblockEnabled = typeof adPassed == 'undefined';
        this.isCrazygames = this.getURLParameter("isCg") == "true" || this.getURLParameter("isCg") == "1";
        this.isCrazygamesLoaded = false;
        this.isCrazygamesLoading = false;
    }

    initCrazygames() {
        this.isAdblockEnabled = typeof adPassed == 'undefined';

        var jsElm = document.createElement("script");
        jsElm.type = "application/javascript";
        jsElm.src = "https://sdk.crazygames.com/crazygames-sdk-v1.js";
        document.body.appendChild(jsElm);
        jsElm.onload = function() {
            console.log("loaded crazygames sdk");
            adManager.crazyGamesSdk = window.CrazyGames.CrazySDK.getInstance();
            adManager.crazyGamesSdk.init();
            adManager.crazyGamesSdk.gameplayStart();
            console.log("initialized crazygames sdk");

            adManager.crazyGamesSdk.addEventListener("adStarted", adManager.showAd); // mute sound
            adManager.crazyGamesSdk.addEventListener("adFinished", adManager.onAdComplete); // reenable sound, enable ui
            adManager.crazyGamesSdk.addEventListener("adError", adManager.onAdError); // reenable sound, enable ui
            adManager.isCrazygamesLoaded = true;
        }
    }

    getURLParameter(sParam) {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                return sParameterName[1];
            }
        }
        return "";
    }

    msecToNextAd() {
        if (this.numAdsShownInSession == 0) {
            return 1000 * 60 * 5; // at 5min
            // split test this to see what leads to users more frequently providing email, maybe 4min isn't enough
        } else if (this.numAdsShownInSession == 1) {
            return 1000 * 60 * 7; // at 12min
        } else if (this.numAdsShownInSession == 2) {
            return 1000 * 60 * 8; // at 20min
        } else {
            return 1000 * 60 * 9; // at 29min & repeat every 9min
            // Split test this to see whether 9, 10, 12, or 15 leads to more total ads
        }
    }

    timeSinceLastAd() {
        return performance.now() - this.lastAdTime;
    }

    canShowAd() {
        return this.timeSinceLastAd() >= this.msecToNextAd() && stateManager.isInFocus && stateManager.timeSinceMouseMoved() >= 2000;
    }

    displayAdCountdown() {
        var countdownDiv = document.createElement("div");
        countdownDiv.style.width = "20%";
        countdownDiv.style.height = "9%";
        countdownDiv.style.left = "0%";
        countdownDiv.style.top = "89%";
        countdownDiv.style.position = "absolute";
        countdownDiv.style.display = "flex";
        countdownDiv.style.zIndex = 999;
        countdownDiv.style.background = "black";
        countdownDiv.style.color = "white";
        countdownDiv.style.textAlign = "center";
        countdownDiv.style.alignItems = "center";
        countdownDiv.style.justifyContent = "center";
        countdownDiv.style.border = "1px solid white";
        countdownDiv.style.overflowY = "auto";
        countdownDiv.style.fontSize = "2.5vw";
        countdownDiv.innerHTML = "Ad Starting";
        countdownDiv.id = "countdownDiv";
        countdownDiv.style.borderRadius = "5px";
        document.body.appendChild(countdownDiv);

        setTimeout(function() {
            document.getElementById("countdownDiv").remove();
        }, this.adCountdownSeconds * 1000);
    }

    showAd() {
        if (!this.isCrazygames) return;
        this.lastAdTime = performance.now();
        this.numAdsShownInSession++;

        //every 10th ad show the GC2 signup form
        /*if(this.numAdsShownInSession%10 == 1)
        {
        	//Show the GC2 signup form
        	if(localStorage.hasOwnProperty("submittedEmail"))
        	{
        		window.CrazyGames.CrazySDK.getInstance().requestAd('midgame');
        	}
        	else
        	{
        		this.startGrindcraft2AdOverlay();
        	}
        }
        else
        {
        	if(this.isAdblockEnabled || !this.isCrazygames || this.numAdsShownInSession < 4)
        	{
        		//show custom ad of our other games
        		if(this.numAdsShownInSession == 2)
        		{
        			this.startMrMineAdOverlay();
        		}
        		else if(this.numAdsShownInSession == 3)
        		{
        			this.startClickerHeroesAdOverlay();
        		}
        	}
        	else
        	{
        		window.CrazyGames.CrazySDK.getInstance().requestAd('midgame');
        	}
        }*/
        this.displayAdCountdown();

        setTimeout(function() {

            window.CrazyGames.CrazySDK.getInstance().requestAd('midgame');
            externalCallManagerInstance.callEvent("pause");

        }, this.adCountdownSeconds * 1000);
    }

    testShowCrazyGamesAd2() {
        adManager.crazyGamesSdk.getInstance().requestAd('midgame');
    }

    testShowCrazyGamesAd() {
        window.CrazyGames.CrazySDK.getInstance().requestAd('midgame');
    }

    startPlaysaurusAd(html) {
        if (document.getElementById("AdBG") === null) {
            var bgDiv = document.createElement("div");
            bgDiv.style.width = "100%";
            bgDiv.style.height = "100%";
            bgDiv.style.position = "absolute";
            bgDiv.style.display = "block";
            bgDiv.style.zIndex = 999;
            bgDiv.style.background = "transparent";
            bgDiv.style.color = "transparent";
            bgDiv.innerHTML = "";
            bgDiv.id = "AdBG";
            document.body.appendChild(bgDiv);

            var fgDiv = document.createElement("div");
            fgDiv.style.width = "70%";
            fgDiv.style.height = "90%";
            fgDiv.style.left = "15%";
            fgDiv.style.top = "5%";
            fgDiv.style.position = "absolute";
            fgDiv.style.display = "inline-block";
            fgDiv.style.zIndex = 999;
            fgDiv.style.background = "black";
            fgDiv.style.color = "white";
            fgDiv.style.textAlign = "center";
            fgDiv.style.border = "1px solid white";
            fgDiv.style.overflowY = "auto";
            fgDiv.innerHTML = html;
            fgDiv.id = "AdFG";
            document.body.appendChild(fgDiv);
        }
    }

    endPlaysaurusAd() {
        document.getElementById("AdBG").remove();
        document.getElementById("AdFG").remove();
        this.onAdComplete();
    }

    getSkipAdButtonHtml(timeSeconds) {
        return '<button type="button" style="min-width: 25%; font-size: 24px;" id="countdownButton" value="' + timeSeconds + '" onclick="adManager.endPlaysaurusAd()" disabled="true">Skip Ad in ' + timeSeconds + 's</button>';
    }

    startMrMineAdOverlay() {
        var adHtml = `<h3>Checkout our other game!</h3><br><iframe src="https://www.youtube.com/embed/ciC3sPu_cSw?autoplay=1&mute=1&rel=0&modestbranding=1&ecver=2" alt="Mr.Mine Video" style="width: 50%; height: 50%; border: 0;"></iframe>
		<a href="https://playsaurusstats.com/redirect.php?url=https%3A%2F%2Fmrmine.com&cmd=pageVisit&gameName=MrMine&utm_source=CG&utm_medium=Web&utm_campaign=GrindcraftCG&utm_content=&influencer=&hash=bdf9709304a910abd955a4a9d607f7b2" target="_blank"><h3>Click to Play Mr.Mine</h3></a>
		`;

        adHtml += "<br>" + this.getSkipAdButtonHtml(12);

        this.startPlaysaurusAd(adHtml);
    }

    startGrindcraft2AdOverlay() {
        var adHtml = `<h3>Checkout the Sneak Peek of <u>Grindcraft 2</u>!</h3><br><iframe src="https://www.youtube.com/embed/IU8AgzRWaC4?autoplay=1&mute=1&rel=0&modestbranding=1&ecver=2&loop=1" alt="Mr.Mine Video" style="width: 50%; height: 50%; border: 0;"></iframe>
		<h3>Subscribe for Grindcraft 2 launch updates!</h3><iframe src="https://playsaurusstats.com/subscribe/subscribeIframe.php?listId=T1HVobrzF8fY1tZur7g0Gg&messageColor=ffffff" style="width: 100%; height: 15%; border: 0;"></iframe></a>
		`;

        adHtml += "<br>" + this.getSkipAdButtonHtml(17);

        this.startPlaysaurusAd(adHtml);
    }

    startClickerHeroesAdOverlay() {
        var adHtml = `<h3>Checkout our other game!</h3><br><iframe src="https://www.youtube.com/embed/6VgrJmFdr6s?autoplay=1&mute=1&rel=0&modestbranding=1&ecver=2" alt="Clicker Heroes Video" style="width: 50%; height: 50%; border: 0;"></iframe>
		<a href="https://playsaurusstats.com/redirect.php?url=https%3A%2F%2Fclickerheroes.com&cmd=pageVisit&gameName=CH1&utm_source=GC&utm_medium=Web&utm_campaign=GrindcraftCG&utm_content=&influencer=&hash=a1cb78d7d68c2f6bacd193aef75aa3ce" target="_blank"><h3>Click to Play Clicker Heroes</h3></a>
		`;

        adHtml += "<br>" + this.getSkipAdButtonHtml(12);

        this.startPlaysaurusAd(adHtml);
    }

    onAdComplete() {
        externalCallManagerInstance.callEvent("unpause");
        statsig.logEvent("adComplete", this.numAdsShownInSession);
    }

    onAdError() {
        externalCallManagerInstance.callEvent("unpause");
    }

    update() {
        if (!this.isCrazygamesLoaded && !this.isCrazygamesLoading && this.isCrazygames && document.readyState === "complete") {
            this.isCrazygamesLoading = true;
            this.initCrazygames();
        }

        if (document.getElementById("countdownButton") !== null) {
            var countdownValue = parseInt(document.getElementById("countdownButton").value) - 1;
            document.getElementById("countdownButton").value = countdownValue;
            if (countdownValue <= 0) {
                document.getElementById('countdownButton').disabled = false;
                document.getElementById('countdownButton').innerText = "Skip Ad";
            } else {
                document.getElementById('countdownButton').innerText = "Skip Ad in " + countdownValue + "s";
            }
        }

        if (this.canShowAd()) {
            this.showAd();
        }
    }
}
var adManager = new globalAdManager();
setInterval(function() {
    adManager.update();
}, 1000);

class externalCallManager {
    callbacks;

    constructor() {
        this.callbacks = {};
    }

    registerFunction(name, callback) {
        this.callbacks[name] = callback;
    }

    callEvent(name) {
        if (this.callbacks.hasOwnProperty(name)) {
            this.callbacks[name]();
        } else {
            console.log("event " + name + " called but no such registered callback exists");
        }
    }
}

//Global function callbacks for pausing or unpausing events originating from haxe
function haxeInitiatedPause() {
    console.log("game was paused from within haxe");
    stateManager.onPause();
}

function haxeInitiatedUnpause() {
    console.log("game was unpaused from within haxe");
    stateManager.onUnpause();
}

function haxeInitiatedNewLocationUnlocked() {
    console.log("new location unlocked called from within haxe");
    adManager.showAd();
}

function haxeInitiatedGameLoaded() {
    console.log("game loaded called from within haxe");
}

//Setup the instance and register the above events
var externalCallManagerInstance = new externalCallManager();
externalCallManagerInstance.registerFunction("haxeInitiatedPause", haxeInitiatedPause);
externalCallManagerInstance.registerFunction("haxeInitiatedUnpause", haxeInitiatedUnpause);
externalCallManagerInstance.registerFunction("haxeInitiatedNewLocationUnlocked", haxeInitiatedNewLocationUnlocked);
externalCallManagerInstance.registerFunction("haxeInitiatedGameLoaded", haxeInitiatedGameLoaded);