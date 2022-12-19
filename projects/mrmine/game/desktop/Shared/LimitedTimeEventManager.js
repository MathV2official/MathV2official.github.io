const EVENT_NONE = 0;
const EVENT_NEW_YEARS = 1;
const EVENT_VALENTINES = 2;
const EVENT_STPATRICKS = 3;
const EVENT_APRIL_FOOLS = 4;
const EVENT_EASTER = 5;
const EVENT_OKTOBERFEST = 6;
const EVENT_HALLOWEEN = 7;
const EVENT_THANKSGIVING = 8;
const EVENT_BLACKFRIDAY = 9;
const EVENT_XMAS = 10;
const MSEC_IN_ONE_DAY = 1000 * 60 * 60 * 24;

var previouslyActiveHolidayIndex = EVENT_NONE;

class LimitedTimeEvent {
    id;
    name;
    description;
    isEnabled = true;
    numDaysDuration = 0;

    constructor() {

    }

    currentTime() {
        var d = new Date();
        var currentDate = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds()));
        return currentDate.getTime();
    }

    startTime() //override
    {

    }

    endTime() {
        return this.startTime() + (this.numDaysDuration * MSEC_IN_ONE_DAY);
    }

    secondsRemainingInEvent() {
        return (this.endTime() - this.currentTime()) / 1000;
    }

    isActive() {
        return this.currentTime() >= this.startTime() && this.currentTime() < this.endTime();
    }

    activate(eventManager) //override
    {
        //do the setup here
    }
}

class NewYears extends LimitedTimeEvent {
    constructor() {
        super();
        this.id = EVENT_NEW_YEARS;
        this.name = _("New Years");
        this.description = _("New Years");
        this.numDaysDuration = 7;
    }

    startTime() {
        var d = new Date();
        if (d.getMonth() == 0) {
            return new Date(Date.UTC(d.getUTCFullYear() - 1, 11, 28, 0, 0, 0, 0)).getTime();
        } else {
            return new Date(Date.UTC(d.getUTCFullYear(), 11, 28, 0, 0, 0, 0)).getTime();
        }
    }
}

class Valentines extends LimitedTimeEvent {
    constructor() {
        super();
        this.id = EVENT_VALENTINES;
        this.name = _("Valentines");
        this.description = _("Valentines");
        this.numDaysDuration = 7;
    }

    startTime() {
        var d = new Date();
        return new Date(Date.UTC(d.getUTCFullYear(), 1, 10, 0, 0, 0, 0)).getTime();
    }
}

class StPatricks extends LimitedTimeEvent {
    constructor() {
        super();
        this.id = EVENT_STPATRICKS;
        this.name = _("St.Patricks");
        this.description = _("St.Patricks");
        this.numDaysDuration = 7;
    }

    startTime() {
        var d = new Date();
        return new Date(Date.UTC(d.getUTCFullYear(), 3, 13, 0, 0, 0, 0)).getTime();
    }
}

class AprilFools extends LimitedTimeEvent {
    constructor() {
        super();
        this.id = EVENT_APRIL_FOOLS;
        this.name = _("April Fools");
        this.description = _("April Fools");
        this.numDaysDuration = 1;
    }

    startTime() {
        var d = new Date();
        return new Date(Date.UTC(d.getUTCFullYear(), 4, 1, 0, 0, 0, 0)).getTime();
    }
}

class Easter extends LimitedTimeEvent {
    constructor() {
        super();
        this.id = EVENT_EASTER;
        this.name = _("Easter");
        this.description = _("Easter");
        this.numDaysDuration = 7;
    }

    startTime() {
        //source: https://www.irt.org/articles/js052/index.htm
        var dTemp = new Date();
        var currentDate = new Date(Date.UTC(dTemp.getUTCFullYear(), dTemp.getUTCMonth(), dTemp.getUTCDate(), dTemp.getUTCHours(), dTemp.getUTCMinutes(), dTemp.getUTCSeconds(), dTemp.getUTCMilliseconds()));
        var Y = currentDate.getFullYear();
        var C = Math.floor(Y / 100);
        var N = Y - 19 * Math.floor(Y / 19);
        var K = Math.floor((C - 17) / 25);
        var I = C - Math.floor(C / 4) - Math.floor((C - K) / 3) + 19 * N + 15;
        I = I - 30 * Math.floor((I / 30));
        I = I - Math.floor(I / 28) * (1 - Math.floor(I / 28) * Math.floor(29 / (I + 1)) * Math.floor((21 - N) / 11));
        var J = Y + Math.floor(Y / 4) + I + 2 - C + Math.floor(C / 4);
        J = J - 7 * Math.floor(J / 7);
        var L = I - J;
        var M = 3 + Math.floor((L + 40) / 44);
        var D = L + 28 - 31 * Math.floor(M / 4);

        var endDate = new Date();
        endDate.setUTCDate(D);
        endDate.setUTCMonth(M);
        endDate.setUTCFullYear(Y);

        return endDate.getTime() - (MSEC_IN_ONE_DAY * 3.5);
    }
}

class Oktoberfest extends LimitedTimeEvent {
    constructor() {
        super();
        this.id = EVENT_OKTOBERFEST;
        this.name = _("Oktoberfest");
        this.description = _("Oktoberfest");
        this.numDaysDuration = 7;
    }

    startTime() {
        var d = new Date();
        return new Date(Date.UTC(d.getUTCFullYear(), 8, 23, 0, 0, 0, 0)).getTime();
    }
}

class Halloween extends LimitedTimeEvent {
    constructor() {
        super();
        this.id = EVENT_HALLOWEEN;
        this.name = _("Halloween");
        this.description = _("Halloween");
        this.numDaysDuration = 7;
    }

    startTime() {
        var d = new Date();
        return new Date(Date.UTC(d.getUTCFullYear(), 9, 26, 0, 0, 0, 0)).getTime();
    }

    activate(eventManager) {
        assetLoader.loadAsset("Shared/Assets/World/witchhat1.webp", "witchhat1");
        assetLoader.loadAsset("Shared/Assets/World/witchhat2.webp", "witchhat2");
        assetLoader.loadAsset("Shared/Assets/World/witchhat3.webp", "witchhat3");
        assetLoader.loadAsset("Shared/Assets/World/witchhat4.webp", "witchhat4");
        assetLoader.loadAsset("Shared/Assets/World/witchhat5.webp", "witchhat5");
        assetLoader.loadAsset("Shared/Assets/World/witchhat6.webp", "witchhat6");
        assetLoader.loadAsset("Shared/Assets/World/witchhat7.webp", "witchhat7");
        assetLoader.loadAsset("Shared/Assets/World/witchhat8.webp", "witchhat8");
        assetLoader.loadAsset("Shared/Assets/World/witchhat9.webp", "witchhat9");
        assetLoader.loadAsset("Shared/Assets/World/witchhat10.webp", "witchhat10");
        assetLoader.loadAsset("Shared/Assets/World/JackOLantern1.webp", "jackolantern");
        assetLoader.loadAsset("Shared/Assets/World/Spiderweb.webp", "spiderweb");
        assetLoader.loadAsset("Shared/Assets/World/halloweenlight.webp", "halloweenlight");

        minerHatImages = [witchhat1, witchhat1, witchhat2, witchhat3, witchhat4, bigtransblock, bigtransblock, witchhat7, witchhat8, witchhat9, bigtransblock];
    }
}

class Thanksgiving extends LimitedTimeEvent {
    constructor() {
        super();
        this.id = EVENT_THANKSGIVING;
        this.name = _("Thanksgiving");
        this.description = _("Thanksgiving");
        this.numDaysDuration = 7;
    }

    startTime() {
        var d = new Date();
        return new Date(Date.UTC(d.getUTCFullYear(), 10, 22, 0, 0, 0, 0)).getTime();
    }

    activate() {

    }
}

class BlackFriday extends LimitedTimeEvent {
    constructor() {
        super();
        this.id = EVENT_BLACKFRIDAY;
        this.name = _("Black Friday");
        this.description = _("Black Friday");
        this.numDaysDuration = 7;
    }

    startTime() {
        var d = new Date();
        return new Date(Date.UTC(d.getUTCFullYear(), 10, 29, 0, 0, 0, 0)).getTime();
    }
}

class Christmas extends LimitedTimeEvent {
    constructor() {
        super();
        this.id = EVENT_XMAS;
        this.name = _("Christmas");
        this.description = _("It's Christmas time! <br> <br> Basic chests have turned into presents and now provide 2x the rewards. <br>  <br> Candy canes can be found in caves and turned in for rewards.");
        this.numDaysDuration = 21;
    }

    startTime() {
        var d = new Date();
        return new Date(Date.UTC(d.getUTCFullYear(), 11, 8, 0, 0, 0, 0)).getTime();
    }

    activate(eventManager) {
        assetLoader.loadAsset("Shared/Assets/Events/Christmas/chest1_blank.webp", "chest1");
        assetLoader.loadAsset("Shared/Assets/Events/Christmas/chest1_blank_gold.webp", "chest1gold");

        assetLoader.loadAsset("Shared/Assets/Events/Christmas/hat1.webp", "hat1");
        assetLoader.loadAsset("Shared/Assets/Events/Christmas/hat2.webp", "hat2");
        assetLoader.loadAsset("Shared/Assets/Events/Christmas/hat3.webp", "hat3");
        assetLoader.loadAsset("Shared/Assets/Events/Christmas/hat4.webp", "hat4");
        assetLoader.loadAsset("Shared/Assets/Events/Christmas/hat5.webp", "hat5");
        assetLoader.loadAsset("Shared/Assets/Events/Christmas/hat6.webp", "hat6");
        assetLoader.loadAsset("Shared/Assets/Events/Christmas/hat7.webp", "hat7");
        assetLoader.loadAsset("Shared/Assets/Events/Christmas/hat8.webp", "hat8");
        assetLoader.loadAsset("Shared/Assets/Events/Christmas/hat9.webp", "hat9");
        assetLoader.loadAsset("Shared/Assets/Events/Christmas/hat10.webp", "hat10");
        minerHatImages = [hat1, hat1, hat2, hat3, hat4, hat5, hat6, hat7, hat8, hat9, hat10];

        assetLoader.loadAsset("Shared/Assets/World/xmasTree.webp", "xmasTree");
        assetLoader.loadAsset("Shared/Assets/World/xmasLights.webp", "xmasLights");

        assetLoader.loadAsset("Shared/Assets/Events/Christmas/present_basicchesticon.webp", "basicchesticon");
        assetLoader.loadAsset("Shared/Assets/Events/Christmas/present_chest_closed.webp", "basicChestIconClosed");
        assetLoader.loadAsset("Shared/Assets/Events/Christmas/present_chest_open.webp", "basicChestIconOpen");
        assetLoader.loadAsset("Shared/Assets/Events/Christmas/present_chest_spritesheet.webp", "basicChestSpritesheet");

        assetLoader.loadAsset("Shared/Assets/Events/Christmas/foundt.webp", "foundt");
        assetLoader.loadAsset("Shared/Assets/Events/Christmas/foundmt.webp", "foundmt");
        assetLoader.loadAsset("Shared/Assets/Events/Christmas/foundt5.webp", "foundt5");
        assetLoader.loadAsset("Shared/Assets/Events/Christmas/foundt6.webp", "foundt6");
        assetLoader.loadAsset("Shared/Assets/Events/Christmas/foundt7.webp", "foundt7");
        assetLoader.loadAsset("Shared/Assets/Events/Christmas/foundt8.webp", "foundt8");
        assetLoader.loadAsset("Shared/Assets/Events/Christmas/foundt9.webp", "foundt9");
        assetLoader.loadAsset("Shared/Assets/Events/Christmas/foundt10.webp", "foundt10");

        assetLoader.loadAsset("Shared/Assets/Events/Christmas/button.webp", "eventb");
        assetLoader.loadAsset("Shared/Assets/Events/Christmas/candy_cane_25x25.webp", "holidayCurrencyIcon");
        assetLoader.loadAsset("Shared/Assets/Events/Christmas/candy_cane_64x64.webp", "holidayCurrencyIconHD");

        assetLoader.loadAsset("Shared/Assets/Events/Christmas/christmas_cave.webp", "earthCave1");
        assetLoader.loadAsset("Shared/Assets/Events/Christmas/christmas_cave.webp", "earthCave2");
        assetLoader.loadAsset("Shared/Assets/Events/Christmas/christmas_cave.webp", "moonCave1");
        assetLoader.loadAsset("Shared/Assets/Events/Christmas/christmas_cave.webp", "moonCave2");
        assetLoader.loadAsset("Shared/Assets/Events/Christmas/caveUItile.webp", "caveBgLight");
        assetLoader.loadAsset("Shared/Assets/Events/Christmas/caveUItile.webp", "moonCaveBgLight");
        assetLoader.loadAsset("Shared/Assets/UI/Caves/caveBg.webp", "moonCaveBgDark"); //moon path uses old path during the event

        //cave frames
        assetLoader.loadAsset("Shared/Assets/Events/Christmas/caveFrame.webp", "eventCaveFrame");
        assetLoader.loadAsset("Shared/Assets/Events/Christmas/caveManagerFrame.webp", "eventCaveManagerFrame");

        //xmas event purchase UI
        assetLoader.loadAsset("Shared/Assets/Events/Christmas/basic.webp", "xmasPurchase1");
        assetLoader.loadAsset("Shared/Assets/Events/Christmas/black.webp", "xmasPurchase2");
        assetLoader.loadAsset("Shared/Assets/Events/Christmas/gold.webp", "xmasPurchase3");
        assetLoader.loadAsset("Shared/Assets/Events/Christmas/BG.webp", "snowBG");
        assetLoader.loadAsset("Shared/Assets/Events/Christmas/frame.webp", "xmasFrame");
        assetLoader.loadAsset("Shared/Assets/Events/Christmas/holly_left.webp", "hollyLeft");
        assetLoader.loadAsset("Shared/Assets/Events/Christmas/holly_right.webp", "hollyRIght");

        //monsters
        assetLoader.loadAsset("Shared/Assets/Monsters/eventMonster01.webp", "snowmanMonster1");

        worldResources[HOLIDAY_RESOURCE_INDEX].name = _("Candy Cane");
        worldResources[HOLIDAY_RESOURCE_INDEX].smallIcon = holidayCurrencyIcon;
        worldResources[HOLIDAY_RESOURCE_INDEX].largeIcon = holidayCurrencyIconHD;

        if (this.secondsRemainingInEvent() > 60 * 60 * 3) {
            caveConfig.rewards.candyCane.probability = 1;
        }

        eventManager.basicChestEventMultiplier = 2;
        eventManager.openHolidayUI = function() {
            openUi(EventPurchaseWindow)
        };

        BattleManager.registerEventMonster({
            name: "Evil Snowman",
            animation: new SpritesheetAnimation(snowmanMonster1, 6, 6),
            bonusReward: () => {
                let amountToGrant = rand(0, 1);
                if (amountToGrant > 0) {
                    worldResources[HOLIDAY_RESOURCE_INDEX].numOwned += amountToGrant;
                    newNews(_("You gained {0} Candy Canes", amountToGrant));
                }
            }
        });
    }
}

class LimitedTimeEventManager {
    isEventActive = false;
    activeEventType = EVENT_NONE;
    activeEvent = null;
    openHolidayUI = null;

    //game modifiers
    basicChestEventMultiplier = 1;

    isNewYears() {
        return this.activeEventType == EVENT_NEW_YEARS;
    }
    isValentines() {
        return this.activeEventType == EVENT_VALENTINES;
    }
    isStPatricks() {
        return this.activeEventType == EVENT_STPATRICKS;
    }
    isEaster() {
        return this.activeEventType == EVENT_EASTER;
    }
    isAprilFools() {
        return this.activeEventType == EVENT_APRIL_FOOLS;
    }
    isOktoberfest() {
        return this.activeEventType == EVENT_OKTOBERFEST;
    }
    isHalloween() {
        return this.activeEventType == EVENT_HALLOWEEN;
    }
    isThanksgiving() {
        return this.activeEventType == EVENT_THANKSGIVING;
    }
    isBlackFriday() {
        return this.activeEventType == EVENT_BLACKFRIDAY;
    }
    isXmas() {
        return this.activeEventType == EVENT_XMAS;
    }

    secondsRemainingInEvent() {
        if (this.activeEvent != null) {
            return Math.max(0, this.activeEvent.secondsRemainingInEvent());
        }
        return 0;
    }

    eventTooltip() {
        if (this.activeEvent != null) {
            var header = this.activeEvent.name;
            var body = this.activeEvent.description;
            return {
                "header": header,
                "body": body
            };
        }
        return {
            "header": "",
            "body": ""
        };
    }

    constructor() {

    }

    init() {
        var eventClasses = [NewYears, Valentines, StPatricks, Easter, AprilFools, Oktoberfest, Halloween, Thanksgiving, BlackFriday, Christmas];
        for (var i = 0; i < eventClasses.length; i++) {
            var tempEventInstance = new eventClasses[i]();
            if (tempEventInstance.isEnabled && tempEventInstance.isActive()) {
                this.activateEvent(tempEventInstance);
                break;
            }
        }
    }

    activateEvent(tempEventInstance) {
        this.activeEventType = tempEventInstance.id;
        this.activeEvent = tempEventInstance;
        this.isEventActive = true;

        tempEventInstance.activate(this);
    }
}
var limitedTimeEventManager = new LimitedTimeEventManager();
limitedTimeEventManager.init();