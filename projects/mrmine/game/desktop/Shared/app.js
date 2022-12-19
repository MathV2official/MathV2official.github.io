buildTarget = WEB_BUILD;
//Copyright MrMine.com - 2013-2022 All Rights Reserved

// ####################################################################
// ######################### GLOBAL VARIABLES #########################
// ####################################################################
const CHEATS_ENABLED = false;

var version = 141;
var buildLetter = "E" + (isDev() ? "." + revisionNumber : "");
var latestTestNumber = 9;
var UID = platform.getUserId();
var money = 0 n;
var totalMoneyEarnedSession = 0 n;
var tickets = 0;
var oldversion = version;
var earliestVersion = version;
var firstTimePlayed = Math.floor(new Date().getTime() / 1000);
var specialUpgrades = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var quality = 1;
var hasFoundGolem = 0;
var hasFoundGidget = 0;
var hasFoundUfo = 0;
var playtime = 0;
var servertime = Math.round(new Date().getTime() / 1000);
var savetime = Math.round(new Date().getTime() / 1000);
var numGameLaunches = 1;
var centsSpent = 0;
var lastLocationIsEarth = [true, true, true, true]; //Sell, Hire, Drill, Quests
var isDevUser = isDev();
var activePlayTimeMinutes = 0;
var activePlayTimeMinutesInSession = 0;
var timelapseMinutesInSession = 0;
var totalPlayMinutes = 0;
var hasImported = (localStorage.getItem("importedList") !== null);
var hasTakenSurvey = false;

function hasTakenSurveyCheck() {
    return hasTakenSurvey || localStorage["hasTakenSurvey"] == true || localStorage["hasTakenSurvey"] == "true";
}
var testNumber = 0;
var sessionId = Math.round(new Date().getTime() / 1000) + "_" + Math.round(Number.MAX_SAFE_INTEGER * Math.random());
var lastPlatform = platformName();
var previousPlatform = platformName();

var checks = [1, 1, 0, 0, 0, 0, 0];
var pendingDeleteSlotIndex = 0;
var drillPurchasePage = 0;
var numFramesRendered = 0;
var framesRendered2 = 0;
var currentlyViewedDepth = 0;
var partialDepthOffset = 0;
var afk = 15;
var lgame = 0;
var isWindowInFocus = 1;
var isTimelapseOn = false;
var totalTimeLapsedMinutes = 0;
var paypalhtml;
var editmode = 0;
var relicEditMode = 0;
var customMinerDatabaseIndex = -1;
var musicFadeInVolume = 0;
var paidForMinerName; // Set separately from customMinerDatabaseIndex in case name submission fails
var hasOpenedPurchaseWindow = false;
var lastFlashQuestionPromptClickTime = 0;

if (window.TrackJS) {
    TrackJS.addMetadata("userId", UID);
    TrackJS.addMetadata("version", version + "_" + buildLetter);
    TrackJS.addMetadata("isDev", isDevUser);
    TrackJS.addMetadata("platform", platformName());
}

var purchasePacks = [{},
    {
        "ag_sku": "m-10_tickets:1",
        "priceCents": 100,
        "tickets": 10,
        "description": _("Pack of {0} tickets", "10")
    },
    {
        "ag_sku": "m-55_tickets:1",
        "priceCents": 500,
        "tickets": 55,
        "description": _("Pack of {0} tickets", "55")
    },
    {
        "ag_sku": "m-120_tickets:1",
        "priceCents": 1000,
        "tickets": 120,
        "description": _("Pack of {0} tickets", "120")
    },
    {
        "ag_sku": "m-250_tickets:1",
        "priceCents": 2000,
        "tickets": 250,
        "description": _("Pack of {0} tickets", "250")
    },
    {
        "ag_sku": "m-650_tickets:1",
        "priceCents": 5000,
        "tickets": 650,
        "description": _("Pack of {0} tickets", "650")
    },
    {
        "ag_sku": "m-1400_tickets:1",
        "priceCents": 10000,
        "tickets": 1400,
        "description": _("Pack of {0} tickets", "1400")
    }
];

var updatePerPoint1Second = new EventHook();
var updatePerSecond = new EventHook();
var updatePer30Seconds = new EventHook();
var updatePerMinute = new EventHook();
var updatePer5Minutes = new EventHook();

/*
Can accept 1/60th increments to timelapse in seconds
*/
function timelapse(timeMinutes, useMultiplier = true) {
    if (useMultiplier && !isOfflineProgressActive) {
        timeMinutes *= STAT.timelapseDurationMultiplier();
    }

    var tempWindowInFocus = isWindowInFocus;
    isWindowInFocus = 0;
    isTimelapseOn = true;
    for (var i = Math.floor(timeMinutes * 60), time = i; i > 0; i--) {
        if (!isSimulating) {
            dig(1);
            superMinerManager.update(1);
            chestCompressor.update(1);
            GemForger.update(1);
            upgradelogic(1);
            progressScientistExcavations(1);
        } else if (i == time) {
            dig(time);
            superMinerManager.update(time);
            chestCompressor.update(time);
            GemForger.update(time);
            upgradelogic(time);
            progressScientistExcavations(time);
        }

        buffs.update();
        reactor.update();

        /*Run optimized mining every 60 seconds
        run on the 30th second to get a closer estimate*/
        if (i % 60 == 30) {
            runOptimizedMiningForOneMinute();
        }
    }
    handleTradeTimelapse(timeMinutes);
    isTimelapseOn = false;
    isWindowInFocus = tempWindowInFocus;

    if (!isOfflineProgressActive && (!isSimulating || useMultiplier)) {
        //Track total time lapsed
        totalTimeLapsedMinutes += timeMinutes;
        timelapseMinutesInSession += timeMinutes;
    }
}

// ##############################################################
// ######################### MAIN LOOPS #########################
// ##############################################################

// ################### START UP ###################
var isGameLoaded = false;
if (platform.frameRefreshForSteamOverlay) {
    platform.frameRefreshForSteamOverlay(); //setup animation for steam overlay
}
window.onload = function() {
    console.log("loaded");
    checkUserCanSave();
    if (platform.setWindowSize) {
        platform.setWindowSize();
    }
    setVolume();
    setupButtons();
    updateBackup();
    downloadBackup();
    console.log("Version: " + ((version / 100) - 1).toFixed(2) + " build " + buildLetter);
    isGameLoaded = true;
    if (CHEATS_ENABLED && localStorage['debug_loadTinyAssets'] == 'true') {
        localStorage['debug_loadTinyAssets'] = false;
    }
    if (isSteam()) {
        document.getElementById("steamCloudBackup").style.visibility = "visible";
    } else if (isWeb()) {
        document.getElementById("steamCloudBackup").style.visibility = "visible";
        document.getElementById('steamCloudBackup').onclick = null;
        document.getElementById('steamCloudBackup').onmouseover = function() {
            showTooltipForDiv(_("Cloud backups are only available on the Steam version"), "", "steamCloudBackup");
        }
    }
    // Reactor component icons need to be created after all images have been loaded
    generateReactorComponents();
    if (languageOverride == "" && RSc == 0) {
        showLanguageSelection();
    }
    setTimeout(handleWindowResizeEvent, 1000);
    setTimeout(setGameToReady, 1050);
};
window.onbeforeunload = function() {
    trackeEvent_exitedGame();
};

var isGameReady = false;

function setGameToReady() {
    isGameReady = true;
    hideDiv("loadingOverlay");
    if (isMobile() && !loadGame(0)) {
        // If we can't load the game, look for a backup
        if (typeof(cordova) !== "undefined") {
            platform.loadLocalStorageFromFile(function() {
                // If there's no backup, make a new game
                createNewGame("save0");
            });
        } else {
            // Handle desktop case
            createNewGame("save0");
        }
    }
    if (typeof(cordova) !== "undefined") {
        navigator.splashscreen.hide();
    }

    if (parseInt(localStorage["numSims"]) > 0) {
        console.log("sims remaining:" + localStorage["numSims"]);
        setTimeout(() => {
            runDepthSim(parseInt(localStorage["simDepth"]), parseInt(localStorage["numSims"]))
        }, 2000)
    }
}

function getBuildTarget() {
    if (typeof(buildTarget) !== "undefined") {
        return buildTarget;
    } else {
        return STEAM_BUILD;
    }
}

function isWeb() {
    return getBuildTarget() == WEB_BUILD;
}

function isSteam() {
    return getBuildTarget() == STEAM_BUILD;
}

function isMobile() {
    return getBuildTarget() == MOBILE_BUILD;
}

function platformName() {
    if (isWeb()) {
        return "web";
    } else if (isSteam()) {
        return "steam";
    } else if (isMobile()) {
        return "mobile";
    } else {
        return "unknown";
    }
}

// ################# EVERY 1 SECOND #################
setInterval(function() {
    if (typeof chosen !== "undefined" && chosen > -1 && (!isMobile() || (typeof(platform.pauseTime) !== "undefined" && platform.pauseTime < 0))) {
        playtime += 1;
        dig(1);
        getUsedMineralCapacity();
        upgradelogic(1);
        superMinerManager.update(1);
        chestCompressor.update(1);
        buffs.update();
        updateUserExperience();
        checkForNewTrade();
        checkForCompletedExcavations();
        GemForger.update(1);
        updateQuotes(1);
        reactor.update();
        updatePerSecond.fire();
        secondsSinceOrangeFishSpawn++;
        questManager.update();
        if (isMobile()) notificationManager.update();
    }
    servertime++;
    savetime++;
    if (!isWindowInFocus && typeof chosen !== "undefined" && chosen > -1) {
        document.title = _("Capacity") + ": " + Math.floor(capacity * 100 / maxHoldingCapacity()) + "%";
    }
    if (musicFadeInVolume < 0.08 && typeof chosen !== "undefined" && chosen > -1 && mute == 0) {
        musicFadeInVolume += 0.01
        platform.music.volume = musicFadeInVolume;
    }

    if (typeof chosen !== "undefined" && chosen > -1 && !hasTakenSurveyCheck() && (localStorage["isSurveyPending"] == "true" || localStorage["isSurveyPending"] == true) && performance.now() > 4000) {
        hasTakenSurvey = true;
        localStorage["hasTakenSurvey"] = true;
        localStorage["isSurveyPending"] = false;
        var firstSurveyTicketReward = 5 * surveyRewardMultiplier();
        tickets += firstSurveyTicketReward;

        if (typeof localStorage["q1"] != "undefined") {
            var sentimentOutOf100 = (parseInt(localStorage["q1"]) - 1) * 25;
            trackEvent_logSentiment(sentimentOutOf100);
        }

        if (typeof localStorage["q9"] != "undefined") {
            var confusionOutOf100 = (parseInt(localStorage["q9"]) - 1) * 25;
            trackEvent_logConfusionLevel(confusionOutOf100);
        }

        alert(_("You gained {0} tickets", firstSurveyTicketReward));
        newNews(_("You gained {0} tickets", firstSurveyTicketReward), true);
        savegame();
    }

    if (typeof chosen !== "undefined" && chosen > -1 && hasTakenSurveyCheck() && (localStorage["isServerSurveyPending"] == "true" || localStorage["isServerSurveyPending"] == true) && performance.now() > 4000) {
        localStorage["isServerSurveyPending"] = false;
        var rewardTicketAmount = parseInt(localStorage["serverSurveyRewardAmount"]);
        if (!isNaN(rewardTicketAmount)) {
            tickets += rewardTicketAmount;

            alert(_("You gained {0} tickets", rewardTicketAmount));
            newNews(_("You gained {0} tickets", rewardTicketAmount), true);
            savegame();
        }
        localStorage["serverSurveyRewardAmount"] = 0;
    }

}, 1000);

// ############### EVERY 30 SECONDS ###############
setInterval(function() {
    if (chosen > -1 && (!isMobile() || (typeof(platform.pauseTime) !== "undefined" && platform.pauseTime < 0))) {
        savegame();
        afk--;

        chestService.spawnRandomChests();
        spawnWorldClickables();
        battlerand();
        updatePer30Seconds.fire();

        if (isSteam()) {
            updateDiscordRichPresence();
        }
    }

}, 30000);

// ############### EVERY 60 SECONDS ###############

var mouseMoved = false;
setInterval(function() {
    if (chosen > -1 && (!isMobile() || (typeof(platform.pauseTime) !== "undefined" && platform.pauseTime < 0))) {
        logValuationStats();
        updatePerMinute.fire();
        if (mouseMoved) {
            activePlayTimeMinutesInSession += 1;
            activePlayTimeMinutes += 1;
            mouseMoved = false;
        }
        totalPlayMinutes += 1;
    }
}, 60000);

// ############### EVERY 5 MINUTES ###############
setInterval(function() {
    if (chosen > -1 && (!isMobile() || (typeof(platform.pauseTime) !== "undefined" && platform.pauseTime < 0))) {
        backupSavesToCloud();
        updatePer5Minutes.fire();
    }
    if (chosen > -1 && !isMobile()) {
        loadAmountOfFlashQuestions();
    }
}, 300000);


function requiresUpdate(frequencyMsec, dtMsec) {
    return (dtMsec >= frequencyMsec || ((currentTime() % frequencyMsec) < dtMsec));
}

// ################# EVERY 17MSEC #################
var previousTime = 0;
var expectedNextRepaintTime = 0;
var animationInterval = 1000 / IDLE_FRAMERATE;
var miningInterval = 100;
setInterval(function() {
    var timeElapsed = currentTime() - previousTime;
    previousTime = currentTime();

    if (typeof activeLayers != 'undefined') {
        updateUi(animationInterval);
    }

    if (typeof activeLayers != 'undefined' && typeof activeLayers.Stage !== 'undefined') {
        if (activeLayers.Stage.isRendered && activeLayers.Stage.hitboxes.length > 0) {
            activeLayers.Stage.render();
        }

        // The mouse delta buffer is only written to on mouse move, so stopping
        // movement doesn't naturally write zeroes to the buffer, meaning momentum
        // can remain high without movement. We write zeroes to it every frame to
        // compensate.
        // AO: May want to check actual DT and loop over this the amt of times necessary to handle lag spikes.
        writeToMouseDeltaBuffer(0, 0);
    }

    if (requiresUpdate(34, timeElapsed)) {
        if (typeof activeLayers != 'undefined' && typeof activeLayers.Particles !== 'undefined') {
            if (activeLayers.Particles.isRendered) {
                activeLayers.Particles.render();
            }
        }
    }

    if (requiresUpdate(animationInterval, timeElapsed)) {
        if (isGameLoaded && (isSimulating || !isTimelapseOn) && !isOfflineProgressActive) {
            numFramesRendered++;
            animate();
            expectedNextRepaintTime = currentTime() + animationInterval;
            updateUpdatingTooltip();
        } else if (!isGameLoaded) {
            document.getElementById("LoadingText").innerHTML = _("Loading...");
            document.getElementById("LoadingPercent").innerHTML = Math.floor(getPageLoadPercent() * 100) + "%";
            document.getElementById("LoadingBar").style.width = Math.floor(getPageLoadPercent() * 100) + "%";
        }
    }
}, 17);

function expectedTimeUntilNextRepaintMsec() {
    return currentTime() - expectedNextRepaintTime;
}

// ############### EVERY .1 SECONDS ###############
runDtMiningAndCaveLogic();
var lastUpdateTime = currentTime();
var residualTime = 0;
var numMinings = 0;

function runDtMiningAndCaveLogic() {
    if (isGameLoaded &&
        (!isSimulating || !isTimelapseOn) &&
        !isOfflineProgressActive &&
        (!isMobile() || (typeof(platform.pauseTime) !== "undefined" && platform.pauseTime < 0))
    ) {
        var deltaTime = currentTime() - lastUpdateTime;
        lastUpdateTime = currentTime();
        var timeToProcess = deltaTime + residualTime;

        //We want to allow it to run a little fast or slow: +/- interval/2
        //Otherwise we could end up thrashing processing two frames one frame and only one the next
        while (timeToProcess >= (miningInterval * .5)) {
            mine();
            caveUpdate(CAVE_UPDATE_DELTA_TIME_SECONDS);
            timeToProcess -= miningInterval;
            numMinings++;
        }
        residualTime = timeToProcess;
    }

    setTimeout(runDtMiningAndCaveLogic, miningInterval - residualTime);
}
//##########################################################

var numFlashQuestions = 0;
var hasVisitedFlashQuestionSurveyDuringCurrentSession = false;
var millisecondsBetweenQuestionQueryTime = 1000 * 60 * 60 * 4; //4hrs
var lastFlashQuestionQueryTime = 0; //always work on startup
function loadAmountOfFlashQuestions() {
    if ((currentTime() - lastFlashQuestionQueryTime) >= millisecondsBetweenQuestionQueryTime && !hasVisitedFlashQuestionSurveyDuringCurrentSession && isWindowInFocus == 1 && numFlashQuestions == 0 && (lastFlashQuestionPromptClickTime < currentTime() - (1000 * 60 * 60 * 24))) {
        lastFlashQuestionQueryTime = currentTime();

        var url = "https://playsaurusstats.com/SurveyFlashQuestionManager.php?cmd=getSurveyHTMLForUnansweredLiveQuestions&gameName=MrMine&gameUid=" + UID;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (typeof(xhr.responseText) !== "undefined") {
                    numFlashQuestions = parseInt(xhr.responseText.split('appendQuestion').length - 1);
                }
            }
        }
        xhr.send();
    }
}

function isFlashQuestionSurveyPromptVisible() {
    return hasTakenSurveyCheck() && numFlashQuestions > 0 && !hasVisitedFlashQuestionSurveyDuringCurrentSession && lastFlashQuestionPromptClickTime < currentTime() - (1000 * 60 * 60 * 24) && localStorage["isServerSurveyPending"] != "true" && localStorage["isServerSurveyPending"] != true;
}

function openFlashQuestionPrompt() {
    if (isFlashQuestionSurveyPromptVisible()) {
        var surveyDiv = document.createElement('div');
        surveyDiv.id = "surveyDiv";
        surveyDiv.style.cssText = 'position:absolute;left:20%;top:10%;width:60%;height:80%;z-index:100;background:#000;border: 1px solid black;';
        surveyDiv.innerHTML = '<iframe src="./Shared/ServerSurvey.html?UID=' + UID + '&version=' + version + '&depth=' + depth + '&reward=' + numFlashQuestions + '" frameBorder="0" style="width: 100%; height: 100%; boder:0;"></iframe>';

        var surveyExitButton = document.createElement("div");
        surveyExitButton.id = "surveyExitButton";
        surveyExitButton.style.position = "absolute";
        surveyExitButton.style.top = "0px";
        surveyExitButton.style.right = "0px";
        surveyExitButton.style.width = "25px";
        surveyExitButton.style.height = "25px";
        surveyExitButton.style.zIndex = 4;
        surveyExitButton.style.background = "url('Shared/Assets/UI/closei.png') no-repeat center";
        surveyExitButton.style.backgroundSize = "contain";
        surveyExitButton.style.color = "white";
        surveyExitButton.style.display = "block";
        surveyExitButton.style.padding = "0px";
        surveyExitButton.style.cursor = "pointer";
        surveyExitButton.onclick = function() {
            document.getElementById("surveyDiv").visibility = "hidden";
            document.body.removeChild(document.getElementById("surveyDiv"));
        };
        surveyDiv.appendChild(surveyExitButton);

        document.body.appendChild(surveyDiv);

        lastFlashQuestionPromptClickTime = currentTime();
        hasVisitedFlashQuestionSurveyDuringCurrentSession = true;
    }
}


// ##########################################################
// #################### ERROR HANDLING ######################
// ##########################################################
if (typeof console != "undefined") {
    if (typeof console.log != 'undefined') {
        console.olog = console.log;
    } else {
        console.olog = function() {};
    }
}

var consoleLog = [];
if (console.olog) {
    console.log = function(message) {
        console.olog(...arguments);
        consoleLog.push(message);
        if (consoleLog.length > 100) {
            consoleLog.shift();
        }
    };
}

var throttle = 0;
console.error = function(message) {
    console.log(message);
}

console.warn = console.debug = console.info = console.log;

function addMoney(amt) {
    if (Number.isNaN(amt)) {
        var caller = (addMoney.caller == null) ? "top" : addMoney.caller.name;
        console.log("Add money as nan: " + caller);
        return;
    }
    if (typeof amt == "number") {
        var caller = (addMoney.caller == null) ? "top" : addMoney.caller.name;
        console.log("Add money as Number: " + caller);
        amt = BigInt(amt);
    }
    money += amt;
    totalMoneyEarnedSession += amt;
}

function subtractMoney(amt) {
    if (Number.isNaN(amt)) {
        var caller = (addMoney.caller == null) ? "top" : addMoney.caller.name;
        console.log("Sub money as nan: " + caller);
        return;
    }
    if (typeof amt == "number") {
        var caller = (addMoney.caller == null) ? "top" : addMoney.caller.name;
        console.log("Sub money as Number: " + caller);
        amt = BigInt(amt);
    }
    money -= amt;
}

function addDepth(amt) {
    if (isNaN(amt)) {
        return;
    }
    depth += amt;
    if (activeLayers.WorldLayer.updateLevels) {
        // Add new levels on platforms where levels are rendered as hitboxes
        activeLayers.WorldLayer.updateLevels()
    }
}

function getPurchasePackIndexBySku(sku) {
    for (var i in purchasePacks) {
        if (purchasePacks[i].ag_sku == sku) return i;
    }
}

function surveyRewardMultiplier() {
    if (centsSpent == 0) {
        if (depth < 500) {
            return 1;
        } else {
            return 2;
        }
    } else if (centsSpent <= 2000) {
        return 2;
    } else if (centsSpent <= 10000) {
        return 6;
    } else {
        return 20;
    }
}