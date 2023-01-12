var MainGame = {
	Config: {
		ORIENTATION: "landscape",
		DEFAULT_WIDTH: 0,
		DEFAULT_HEIGHT: 0,
		MAX_WIDTH: 0,
		MAX_HEIGHT: 0
	},
	version: "v1.12",
	EVENT_NUM: 0,
	isDebug: true,
	isAPI: true,
	showDebugCircle: false,
	isApiBreakTime: false,
	isApiGameplayStop: false,
	isDesktop: true,
	title: "mergeguns_v1.0",
	languages: ["EN", "IT", "ES", "PT", "TR", "BR", "RU", "FR", "DE", "AR"],
	languagesN: ["00", "01", "02", "03", "04", "06", "07", "08", "05", "10"],
	language: 0,
	GAME_TEXT: null,
	TEXT_FILE: null,
	showFPS: false,
	firstLoad: true,
	firstGo: true,
	isNoSave: false,
	isFromFireMode: false,
	isFromTutorial: false,
	isGoToShooter: false,
	reward_wheel: null,
	amount_diamonds: null,
	amount_coins: null,
	exp: null,
	nextCarLevel: null,
	currentLevel: null,
	LIMIT_parking: null,
	LIMIT_pilots: null,
	box_have: null,
	arDeltaCarLevel: null,
	lastSession: null,
	selectedGun: 1,
	selectedHat: 0,
	fireLevel: 1,
	freeTimeWheel: 0,
	cdNextFree: 0,
	maxTimeWheel: 3,
	listEvents: [],
	isFirstChallenge: true,
	arHatsHave: [10, 11, 12, 13, 14, 15, 16, 17, 18],
	arHatsBasic: [2, 3, 4, 5, 6, 7, 8, 9],
	arHatsEpic: [10, 11, 12, 13, 14, 15, 16, 17, 18],
	priceBasic: 100,
	priceEpic: 250,
	debug_isFreeUpgrade: false,
	debug_typeGun: 1,
	initSettings: function() {
		MainGame.Config.DEFAULT_WIDTH = config.scale.width;
		MainGame.Config.DEFAULT_HEIGHT = config.scale.height;
		MainGame.Config.MAX_WIDTH = config.scale.max.width;
		MainGame.Config.MAX_HEIGHT = config.scale.max.height;
		MainGame.isDesktop = game.device.os.desktop;
		MainGame.loadSaves();
		if (game.device.os.desktop) {
			game.canvas.oncontextmenu = function(e) {
				e.preventDefault()
			};
			window.addEventListener("keydown", (function(e) {
				if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
					e.preventDefault()
				}
			}), false);
			window.addEventListener("wheel", e => e.preventDefault(), {
				passive: false
			})
		}
		if (MainGame.isAPI) {
			MainGame.API_POKI = game.plugins.get("PokiApiPlugin");
			if (!MainGame.isDebug) MainGame.api_check();
			MainGame.API_POKI.initAPI(MainGame.api_GamePause, MainGame.api_GameContinue)
		}
	},
	api_google: function(vValue, vLevel) {
		if (vLevel) {
			console.log("api_google", vValue, vLevel)
		} else {
			console.log("api_google", vValue)
		}
		switch (vValue) {
			case "MaxLevelCar":
				// gtag("event", "GameEvent", {
				// 	event_category: "SendStats",
				// 	event_label: "MaxLevelCar_" + vLevel,
				// 	value: vLevel
				// });
				break;
			case "CompletedDay":
				// gtag("event", "GameEvent", {
				// 	event_category: "SendStats",
				// 	event_label: "CompletedDay_" + vLevel,
				// 	value: vLevel
				// });
				break;
			case "DefeatDay":
				// gtag("event", "GameEvent", {
				// 	event_category: "SendStats",
				// 	event_label: "DefeatDay_" + vLevel,
				// 	value: vLevel
				// });
				break;
			case "BuyHelmet":
				// gtag("event", "GameEvent", {
				// 	event_category: "SendStats",
				// 	event_label: "BuyHelmet",
				// 	value: vLevel
				// });
				break;
			case "Revive":
				// gtag("event", "GameEvent", {
				// 	event_category: "SendStats",
				// 	event_label: "ReviveDay_" + vLevel,
				// 	value: vLevel
				// });
				break;
			case "SelectedGun":
				// gtag("event", "GameEvent", {
				// 	event_category: "SendStats",
				// 	event_label: "SelectedGun_" + vLevel,
				// 	value: vLevel
				// });
				break;
			case "EventHalloween":
				// gtag("event", "GameEvent", {
				// 	event_category: "SendStats",
				// 	event_label: "EventHalloween_" + vLevel,
				// 	value: vLevel
				// });
				break;
			case "EventChristmas":
				// gtag("event", "GameEvent", {
				// 	event_category: "SendStats",
				// 	event_label: "EventChristmas_" + vLevel,
				// 	value: vLevel
				// });
				break
		}
	},
	api_GamePause: function() {
		MainGame.isApiBreakTime = true;
		game.sound.mute = true
	},
	api_GameContinue: function(withReward) {
		MainGame.isApiBreakTime = false;
		game.sound.mute = false;
		if (MainGame.isGoToShooter) {
			MainGame.isGoToShooter = false;
			MainGame.state.goShooterScreen();
			return
		}
		if (withReward && (MainGame.selectedReward == "freeCar" || MainGame.selectedReward == "reward_wheel")) {} else {
			if (MainGame.isApiGameplayStop) {
				MainGame.API_POKI.gameplayStart();
				MainGame.isApiGameplayStop = false
			}
		}
	},
	setReward: function() {
		MainGame.selectedReward = 1
	},
	getReward: function(withReward) {
		if (withReward) {
			MainGame.state.getRewards(MainGame.selectedReward)
		} else {
			MainGame.state.showSystemMessage("Ads no ready, try later!")
		}
	},
	clickReward: function(vReward) {
		MainGame.selectedReward = vReward;
		// if (MainGame.isAPI) {
		// 	MainGame.API_POKI.rewardedBreak()
		// } else {
		// 	if (MainGame.isDebug) MainGame.getReward(true)
		// }
		MainGame.getReward(true)
	},
	api_check: function() {
		var _0x1918 = ["top", "indexOf", "aHR0cHM6Ly9wb2tpLmNvbS9zaXRlbG9jaw==", "hostname", "length", "location", "LnBva2ktZ2RuLmNvbQ==", "href"];
		(function(_0x4a02b5, _0x5c0c3d) {
			var _0x56a85d = function(_0x375c0e) {
				while (--_0x375c0e) {
					_0x4a02b5["push"](_0x4a02b5["shift"]())
				}
			};
			_0x56a85d(++_0x5c0c3d)
		})(_0x1918, 430);
		var _0xcdc9 = function(_0x4a02b5, _0x5c0c3d) {
			_0x4a02b5 = _0x4a02b5 - 0;
			var _0x56a85d = _0x1918[_0x4a02b5];
			return _0x56a85d
		};
		(function checkInit() {
			var _0x151adb = ["bG9jYWxob3N0", "LnBva2kuY29t", _0xcdc9("0x0")];
			var _0x219654 = ![];
			var _0x558823 = window[_0xcdc9("0x7")][_0xcdc9("0x5")];
			for (var _0x220888 = 0; _0x220888 < _0x151adb[_0xcdc9("0x6")]; _0x220888++) {
				var _0x4a2f49 = atob(_0x151adb[_0x220888]);
				if (_0x558823[_0xcdc9("0x3")](_0x4a2f49, _0x558823["length"] - _0x4a2f49["length"]) !== -1) {
					_0x219654 = !![];
					break
				}
			}
			if (!_0x219654) {
				var _0xcff8e8 = _0xcdc9("0x4");
				var _0x3296f7 = atob(_0xcff8e8);
				window["location"][_0xcdc9("0x1")] = _0x3296f7;
				this[_0xcdc9("0x2")][_0xcdc9("0x7")] !== this[_0xcdc9("0x7")] && (this[_0xcdc9("0x2")][_0xcdc9("0x7")] = this[_0xcdc9("0x7")])
			}
		})()
	},
	completedEvent: function() {
		if (MainGame.EVENT_NUM == 1 && MainGame.listEvents[0] == 0) {
			MainGame.selectedHat = 19;
			MainGame.arHatsHave.push(19);
			MainGame.listEvents[0] = 1;
			MainGame.saveSaves()
		}
		if (MainGame.EVENT_NUM == 2 && MainGame.listEvents[1] == 0) {
			MainGame.selectedHat = 20;
			MainGame.arHatsHave.push(20);
			MainGame.listEvents[1] = 1;
			MainGame.saveSaves()
		}
	},
	clearEventsProgress: function() {
		MainGame.selectedHat = 0;
		MainGame.arHatsHave = [];
		MainGame.listEvents = null;
		MainGame.saveSaves()
	},
	updateTextWidth: function(vText, vMaxWidth) {
		var scale = 1;
		vText.setScale(scale);
		var txtWidth = vText.width;
		if (txtWidth > vMaxWidth) {
			scale = vMaxWidth / txtWidth;
			vText.setScale(scale)
		}
		return scale
	},
	replaceText: function(vText, vValue) {
		return vText.replace("#", vValue.toString())
	},
	secToHHMMSS: function(vSec) {
		var seconds = parseInt(vSec, 10);
		var hours = Math.floor(seconds / 3600);
		var minutes = Math.floor((seconds - hours * 3600) / 60);
		var seconds = seconds - hours * 3600 - minutes * 60;
		if (hours < 10) hours = "0" + hours;
		if (minutes < 10) minutes = "0" + minutes;
		if (seconds < 10) seconds = "0" + seconds;
		var time = minutes + ":" + seconds;
		return time
	},
	jelly: function(game, object, strength, delay, initialScale, duration1, duration2) {
		strength = strength || .2;
		delay = delay || 0;
		duration1 = duration1 || 50;
		duration2 = duration2 || 500;
		initialScale = initialScale || {
			x: 1,
			y: 1
		};
		game.tweens.killTweensOf(object);
		game.tweens.add({
			targets: object,
			props: {
				scaleX: {
					value: initialScale.x + initialScale.x * strength,
					duration: duration1,
					delay: delay
				},
				scaleY: {
					value: initialScale.y + initialScale.y * strength,
					duration: duration1,
					delay: delay + 50
				}
			},
			ease: "Quadratic.easeInOut"
		});
		game.tweens.add({
			targets: object,
			props: {
				scaleX: {
					value: initialScale.x,
					duration: duration2,
					delay: duration1 + delay
				},
				scaleY: {
					value: initialScale.y,
					duration: duration2,
					delay: duration1 + delay + 50
				}
			},
			ease: "Elastic.easeOut"
		})
	},
	loadSaves: function() {
		MainGame.amount_coins = MainGame.Storage.get(MainGame.title + "-" + "amount_coins");
		MainGame.amount_diamonds = MainGame.Storage.get(MainGame.title + "-" + "amount_diamonds");
		MainGame.exp = MainGame.Storage.get(MainGame.title + "-" + "exp");
		MainGame.nextCarLevel = MainGame.Storage.get(MainGame.title + "-" + "nextCarLevel");
		MainGame.currentLevel = MainGame.Storage.get(MainGame.title + "-" + "currentLevel");
		MainGame.LIMIT_parking = MainGame.Storage.get(MainGame.title + "-" + "LIMIT_parking");
		MainGame.LIMIT_pilots = MainGame.Storage.get(MainGame.title + "-" + "LIMIT_pilots");
		MainGame.box_have = MainGame.Storage.get(MainGame.title + "-" + "box_have");
		MainGame.arDeltaCarLevel = MainGame.Storage.get(MainGame.title + "-" + "arDeltaCarLevel");
		MainGame.lastSession = MainGame.Storage.get(MainGame.title + "-" + "lastSession");
		MainGame.cdBonusCoins = MainGame.Storage.get(MainGame.title + "-" + "cdBonusCoins");
		MainGame.cdBonusSpeed = MainGame.Storage.get(MainGame.title + "-" + "cdBonusSpeed");
		MainGame.buffer_boxes = MainGame.Storage.get(MainGame.title + "-" + "buffer_boxes");
		MainGame.freeTimeWheel = MainGame.Storage.get(MainGame.title + "-" + "freeTimeWheel");
		MainGame.cdNextFree = MainGame.Storage.get(MainGame.title + "-" + "cdNextFree");
		MainGame.selectedGun = MainGame.Storage.get(MainGame.title + "-" + "selectedGun");
		MainGame.selectedHat = MainGame.Storage.get(MainGame.title + "-" + "selectedHat");
		MainGame.arHatsHave = MainGame.Storage.get(MainGame.title + "-" + "arHatsHave");
		MainGame.fireLevel = MainGame.Storage.get(MainGame.title + "-" + "fireLevel");
		MainGame.levelEarning = MainGame.Storage.get(MainGame.title + "-" + "levelEarning");
		MainGame.levelDiscount = MainGame.Storage.get(MainGame.title + "-" + "levelDiscount");
		MainGame.listEvents = MainGame.Storage.get(MainGame.title + "-" + "listEvents");
		var language = MainGame.Storage.get(MainGame.title + "-" + "language");
		if (language != null) MainGame.language = language
	},
	saveSaves: function() {
		if (MainGame.isNoSave) return;
		MainGame.Storage.set(MainGame.title + "-" + "amount_coins", MainGame.amount_coins);
		MainGame.Storage.set(MainGame.title + "-" + "amount_diamonds", MainGame.amount_diamonds);
		MainGame.Storage.set(MainGame.title + "-" + "exp", MainGame.exp);
		MainGame.Storage.set(MainGame.title + "-" + "nextCarLevel", MainGame.nextCarLevel);
		MainGame.Storage.set(MainGame.title + "-" + "currentLevel", MainGame.currentLevel);
		MainGame.Storage.set(MainGame.title + "-" + "LIMIT_parking", MainGame.LIMIT_parking);
		MainGame.Storage.set(MainGame.title + "-" + "LIMIT_pilots", MainGame.LIMIT_pilots);
		MainGame.Storage.set(MainGame.title + "-" + "box_have", MainGame.box_have);
		MainGame.Storage.set(MainGame.title + "-" + "arDeltaCarLevel", MainGame.arDeltaCarLevel);
		MainGame.Storage.set(MainGame.title + "-" + "lastSession", MainGame.lastSession);
		MainGame.Storage.set(MainGame.title + "-" + "language", MainGame.language);
		MainGame.Storage.set(MainGame.title + "-" + "cdBonusCoins", MainGame.cdBonusCoins);
		MainGame.Storage.set(MainGame.title + "-" + "cdBonusSpeed", MainGame.cdBonusSpeed);
		MainGame.Storage.set(MainGame.title + "-" + "buffer_boxes", MainGame.buffer_boxes);
		MainGame.Storage.set(MainGame.title + "-" + "freeTimeWheel", MainGame.freeTimeWheel);
		MainGame.Storage.set(MainGame.title + "-" + "cdNextFree", MainGame.cdNextFree);
		MainGame.Storage.set(MainGame.title + "-" + "selectedGun", MainGame.selectedGun);
		MainGame.Storage.set(MainGame.title + "-" + "selectedHat", MainGame.selectedHat);
		MainGame.Storage.set(MainGame.title + "-" + "arHatsHave", MainGame.arHatsHave);
		MainGame.Storage.set(MainGame.title + "-" + "fireLevel", MainGame.fireLevel);
		MainGame.Storage.set(MainGame.title + "-" + "levelEarning", MainGame.levelEarning);
		MainGame.Storage.set(MainGame.title + "-" + "levelDiscount", MainGame.levelDiscount);
		MainGame.Storage.set(MainGame.title + "-" + "listEvents", MainGame.listEvents)
	},
	clearSaves: function() {
		MainGame.Storage.remove(MainGame.title + "-" + "amount_coins");
		MainGame.Storage.remove(MainGame.title + "-" + "amount_diamonds");
		MainGame.Storage.remove(MainGame.title + "-" + "exp");
		MainGame.Storage.remove(MainGame.title + "-" + "nextCarLevel");
		MainGame.Storage.remove(MainGame.title + "-" + "currentLevel");
		MainGame.Storage.remove(MainGame.title + "-" + "LIMIT_parking");
		MainGame.Storage.remove(MainGame.title + "-" + "LIMIT_pilots");
		MainGame.Storage.remove(MainGame.title + "-" + "box_have");
		MainGame.Storage.remove(MainGame.title + "-" + "arDeltaCarLevel");
		MainGame.Storage.remove(MainGame.title + "-" + "lastSession");
		MainGame.Storage.remove(MainGame.title + "-" + "language");
		MainGame.Storage.remove(MainGame.title + "-" + "cdBonusCoins");
		MainGame.Storage.remove(MainGame.title + "-" + "cdBonusSpeed");
		MainGame.Storage.remove(MainGame.title + "-" + "buffer_boxes");
		MainGame.Storage.remove(MainGame.title + "-" + "freeTimeWheel");
		MainGame.Storage.remove(MainGame.title + "-" + "cdNextFree");
		MainGame.Storage.remove(MainGame.title + "-" + "selectedGun");
		MainGame.Storage.remove(MainGame.title + "-" + "selectedHat");
		MainGame.Storage.remove(MainGame.title + "-" + "arHatsHave");
		MainGame.Storage.remove(MainGame.title + "-" + "fireLevel");
		MainGame.Storage.remove(MainGame.title + "-" + "levelEarning");
		MainGame.Storage.remove(MainGame.title + "-" + "levelDiscount");
		MainGame.Storage.remove(MainGame.title + "-" + "listEvents");
		MainGame.isNoSave = true
	}
};
MainGame.Sfx = {
	manage: function(type, mode, game, button, label) {
		switch (mode) {
			case "init": {
				MainGame.Storage.initUnset(MainGame.title + "-" + type, true);
				MainGame.Sfx.status = MainGame.Sfx.status || [];
				MainGame.Sfx.status[type] = MainGame.Storage.get(MainGame.title + "-" + type);
				if (type == "sound") {
					MainGame.Sfx.sounds = [];
					MainGame.Sfx.sounds["click"] = game.sound.add("click3");
					MainGame.Sfx.sounds["unlocked"] = game.sound.add("unlocked");
					MainGame.Sfx.sounds["show_box"] = game.sound.add("show_box");
					MainGame.Sfx.sounds["merge"] = game.sound.add("merge3");
					MainGame.Sfx.sounds["open_box"] = game.sound.add("open_box");
					MainGame.Sfx.sounds["buy"] = game.sound.add("buy");
					MainGame.Sfx.sounds["deleted"] = game.sound.add("deleted3");
					MainGame.Sfx.sounds["level_up"] = game.sound.add("level_up");
					MainGame.Sfx.sounds["win"] = game.sound.add("win");
					MainGame.Sfx.sounds["offline_earning"] = game.sound.add("offline_earning3");
					MainGame.Sfx.sounds["boost"] = game.sound.add("boost");
					MainGame.Sfx.sounds["give_gun"] = game.sound.add("give_gun3");
					MainGame.Sfx.sounds["lucky_wheel"] = game.sound.add("lucky_wheel2");
					MainGame.Sfx.sounds["reload"] = game.sound.add("reload4");
					MainGame.Sfx.sounds["enemy"] = game.sound.add("enemy");
					MainGame.Sfx.sounds["enemy2"] = game.sound.add("enemy2");
					MainGame.Sfx.sounds["enemy3"] = game.sound.add("enemy3");
					MainGame.Sfx.sounds["enemy4"] = game.sound.add("enemy4");
					MainGame.Sfx.sounds["autorifle"] = game.sound.add("autorifle");
					MainGame.Sfx.sounds["autorifle2"] = game.sound.add("autorifle2");
					MainGame.Sfx.sounds["autorifle3"] = game.sound.add("autorifle3");
					MainGame.Sfx.sounds["pistol"] = game.sound.add("pistol");
					MainGame.Sfx.sounds["pistol2"] = game.sound.add("pistol2");
					MainGame.Sfx.sounds["pistol3"] = game.sound.add("pistol3");
					MainGame.Sfx.sounds["pistol4"] = game.sound.add("pistol4");
					MainGame.Sfx.sounds["rifle"] = game.sound.add("rifle");
					MainGame.Sfx.sounds["rifle2"] = game.sound.add("rifle2");
					MainGame.Sfx.sounds["rifle3"] = game.sound.add("rifle3");
					MainGame.Sfx.sounds["rifle4"] = game.sound.add("rifle4");
					MainGame.Sfx.sounds["rifle5"] = game.sound.add("rifle5");
					MainGame.Sfx.sounds["shotgun"] = game.sound.add("shotgun");
					MainGame.Sfx.sounds["shotgun2"] = game.sound.add("shotgun2");
					MainGame.Sfx.sounds["shotgun3"] = game.sound.add("shotgun3");
					MainGame.Sfx.sounds["sniper"] = game.sound.add("sniper");
					MainGame.Sfx.sounds["sniper2"] = game.sound.add("sniper2");
					MainGame.Sfx.sounds["sniper3"] = game.sound.add("sniper3");
					MainGame.Sfx.sounds["sniper4"] = game.sound.add("sniper4");
					MainGame.Sfx.sounds["sniper5"] = game.sound.add("sniper5");
					MainGame.Sfx.sounds["miss"] = game.sound.add("miss");
					MainGame.Sfx.sounds["explosion"] = game.sound.add("explosion");
					MainGame.Sfx.sounds["splash1"] = game.sound.add("splash");
					MainGame.Sfx.sounds["splash2"] = game.sound.add("splash2");
					MainGame.Sfx.sounds["splash3"] = game.sound.add("splash3");
					MainGame.Sfx.sounds["snowsplash"] = game.sound.add("snowsplash");
					MainGame.Sfx.sounds["click"].volume = 1.4;
					MainGame.Sfx.sounds["unlocked"].volume = 1.8;
					MainGame.Sfx.sounds["show_box"].volume = 2.1;
					MainGame.Sfx.sounds["merge"].volume = .8;
					MainGame.Sfx.sounds["open_box"].volume = .5;
					MainGame.Sfx.sounds["buy"].volume = .7;
					MainGame.Sfx.sounds["deleted"].volume = 3;
					MainGame.Sfx.sounds["level_up"].volume = 1;
					MainGame.Sfx.sounds["win"].volume = 1;
					MainGame.Sfx.sounds["offline_earning"].volume = 3;
					MainGame.Sfx.sounds["boost"].volume = 4;
					MainGame.Sfx.sounds["give_gun"].volume = 3;
					MainGame.Sfx.sounds["lucky_wheel"].volume = 2;
					MainGame.Sfx.sounds["reload"].volume = 1;
					MainGame.Sfx.sounds["enemy"].volume = 1;
					MainGame.Sfx.sounds["enemy2"].volume = 1;
					MainGame.Sfx.sounds["enemy3"].volume = 1;
					MainGame.Sfx.sounds["enemy4"].volume = 1;
					MainGame.Sfx.sounds["autorifle"].volume = .7;
					MainGame.Sfx.sounds["autorifle2"].volume = .9;
					MainGame.Sfx.sounds["autorifle3"].volume = .7;
					MainGame.Sfx.sounds["pistol"].volume = .7;
					MainGame.Sfx.sounds["pistol2"].volume = .7;
					MainGame.Sfx.sounds["pistol3"].volume = .7;
					MainGame.Sfx.sounds["pistol4"].volume = .7;
					MainGame.Sfx.sounds["rifle"].volume = .7;
					MainGame.Sfx.sounds["rifle2"].volume = .7;
					MainGame.Sfx.sounds["rifle3"].volume = .7;
					MainGame.Sfx.sounds["rifle4"].volume = .9;
					MainGame.Sfx.sounds["rifle5"].volume = .9;
					MainGame.Sfx.sounds["shotgun"].volume = .7;
					MainGame.Sfx.sounds["shotgun2"].volume = .7;
					MainGame.Sfx.sounds["shotgun3"].volume = .7;
					MainGame.Sfx.sounds["sniper"].volume = .7;
					MainGame.Sfx.sounds["sniper2"].volume = .7;
					MainGame.Sfx.sounds["sniper3"].volume = .7;
					MainGame.Sfx.sounds["sniper4"].volume = .7;
					MainGame.Sfx.sounds["sniper5"].volume = .7;
					MainGame.Sfx.sounds["miss"].volume = 1.2;
					MainGame.Sfx.sounds["explosion"].volume = 1;
					MainGame.Sfx.sounds["splash1"].volume = 1;
					MainGame.Sfx.sounds["splash2"].volume = .6;
					MainGame.Sfx.sounds["splash3"].volume = 1;
					MainGame.Sfx.sounds["snowsplash"].volume = 1
				} else {
					MainGame.Sfx.nameMusicPlaying = -1;
					MainGame.Sfx.musics = []
				}
				break
			}
			case "on": {
				MainGame.Sfx.status[type] = true;
				break
			}
			case "off": {
				MainGame.Sfx.status[type] = false;
				break
			}
			case "switch": {
				MainGame.Sfx.status[type] = !MainGame.Sfx.status[type];
				break
			}
			default: {}
		}
		MainGame.Sfx.update(type, button, label);
		if (MainGame.Sfx.sounds) {
			var statusSound = !MainGame.Sfx.status["sound"];
			for (var id in MainGame.Sfx.sounds) {
				MainGame.Sfx.sounds[id].setMute(statusSound)
			}
		}
		if (MainGame.Sfx.musics) {
			var statuMusic = !MainGame.Sfx.status["music"];
			if (MainGame.Sfx.musics["main"]) MainGame.Sfx.musics["main"].setMute(statuMusic);
			if (MainGame.Sfx.musics["shoot"]) MainGame.Sfx.musics["shoot"].setMute(statuMusic);
			if (MainGame.EVENT_NUM == 1) {
				if (MainGame.Sfx.musics["halloween"]) MainGame.Sfx.musics["halloween"].setMute(statuMusic)
			}
			if (MainGame.EVENT_NUM == 2) {
				if (MainGame.Sfx.musics["christmas"]) MainGame.Sfx.musics["christmas"].setMute(statuMusic)
			}
		}
		if (MainGame.Sfx.status) {
			MainGame.Storage.set(MainGame.title + "-" + type, MainGame.Sfx.status[type])
		}
	},
	initMusicPart1: function() {
		MainGame.Sfx.musics["shoot"] = game.sound.add("music-shoot");
		MainGame.Sfx.musics["shoot"].volume = 1;
		if (MainGame.Sfx.musics) {
			var statuMusic = !MainGame.Sfx.status["music"];
			MainGame.Sfx.musics["shoot"].setMute(statuMusic)
		}
	},
	initMusicPart2: function() {
		MainGame.Sfx.musics["main"] = game.sound.add("music-main");
		MainGame.Sfx.musics["main"].volume = 1;
		if (MainGame.EVENT_NUM == 1) {
			MainGame.Sfx.musics["halloween"] = game.sound.add("music-halloween");
			MainGame.Sfx.musics["halloween"].volume = .85
		}
		if (MainGame.EVENT_NUM == 2) {
			MainGame.Sfx.musics["christmas"] = game.sound.add("music-christmas");
			MainGame.Sfx.musics["christmas"].volume = .55
		}
		if (MainGame.Sfx.musics) {
			var statuMusic = !MainGame.Sfx.status["music"];
			MainGame.Sfx.musics["main"].setMute(statuMusic);
			if (MainGame.EVENT_NUM == 1) {
				MainGame.Sfx.musics["halloween"].setMute(statuMusic)
			}
			if (MainGame.EVENT_NUM == 2) {
				MainGame.Sfx.musics["christmas"].setMute(statuMusic)
			}
		}
	},
	play: function(type, audio) {
		if (type == "music") {
			if (MainGame.Sfx.nameMusicPlaying == audio) return;
			if (MainGame.Sfx.musics) {
				if (MainGame.Sfx.musics[MainGame.Sfx.nameMusicPlaying]) MainGame.Sfx.musics[MainGame.Sfx.nameMusicPlaying].stop();
				if (MainGame.Sfx.musics && MainGame.Sfx.musics[audio]) {
					MainGame.Sfx.musics[audio].play({
						loop: true
					});
					MainGame.Sfx.nameMusicPlaying = audio
				}
			}
		} else {
			if (MainGame.Sfx.sounds && MainGame.Sfx.sounds[audio]) {
				MainGame.Sfx.sounds[audio].play()
			}
		}
	},
	update: function(type, button, label) {
		if (MainGame.Sfx.status == undefined) return;
		if (button) {
			if (MainGame.Sfx.status[type]) {
				button.setFrame("btn_" + type + "_0000")
			} else {
				button.setFrame("btn_" + type + "_0001")
			}
		}
		if (label) {
			if (MainGame.Sfx.status[type]) {
				label.setText(MainGame.GAME_TEXT[type + "_on"].toUpperCase())
			} else {
				label.setText(MainGame.GAME_TEXT[type + "_off"].toUpperCase())
			}
		}
	}
};
MainGame.fadeOutIn = function(passedCallback, context) {
	context.cameras.main.fadeOut(200);
	context.time.addEvent({
		delay: 200,
		callback: function() {
			context.cameras.main.fadeIn(200);
			passedCallback(context)
		},
		callbackScope: context
	})
};
MainGame.fadeOutScene = function(sceneName, context) {
	context.cameras.main.fadeOut(200);
	context.time.addEvent({
		delay: 200,
		callback: function() {
			context.scene.start(sceneName)
		},
		callbackScope: context
	})
};
MainGame.Storage = {
	availability: function() {
		try {
			var ls = window.localStorage
		} catch (e) {
			return
		}
		if (!!(typeof window.localStorage === "undefined")) {
			console.log("localStorage not available");
			return null
		}
	},
	get: function(key) {
		try {
			var ls = window.localStorage
		} catch (e) {
			return
		}
		this.availability();
		try {
			return JSON.parse(localStorage.getItem(key))
		} catch (e) {
			return window.localStorage.getItem(key)
		}
	},
	set: function(key, value) {
		try {
			var ls = window.localStorage
		} catch (e) {
			return
		}
		this.availability();
		try {
			window.localStorage.setItem(key, JSON.stringify(value))
		} catch (e) {
			console.log("localStorage quota exceeded")
		}
	},
	initUnset: function(key, value) {
		if (this.get(key) === null) {
			this.set(key, value)
		}
	},
	getFloat: function(key) {
		return parseFloat(this.get(key))
	},
	setHighscore: function(key, value) {
		if (value > this.getFloat(key)) {
			this.set(key, value)
		}
	},
	remove: function(key) {
		this.availability();
		window.localStorage.removeItem(key)
	},
	clear: function() {
		this.availability()
	}
};
const STATUS_DEAD = -1;
const STATUS_RUN = 0;
const STATUS_SIT = 1;
const STATUS_STAND_UP = 2;
const STATUS_AIMING = 3;
const STATUS_STRIKE = 4;
const STATUS_SIT_DOWN = 5;
const STATUS_SIT_DOWN2 = 51;
const STATUS_GET_BULLET = 6;
const STATUS_GET_BULLET2 = 61;
const STATUS_CHANGE_POS = 7;
const STATUS_AIM_RPG = 8;
const STATUS_STRIKE_RPG = 9;
const STATUS_RELOADING = 10;
const ACTION_RIGHT = 0;
const ACTION_LEFT = 1;
const ACTION_DOWN = 2;
const ACTION_UP = 3;
const ACTION_STRIKE = 4;
const ACTION_USE_RPG = 5;
const ACTION_AIM = 6;
const ACTION_RESERVE = 7;
const ACTION_RELOAD = 8;
const STATUSES = ["STATUS_RUN", "STATUS_SIT", "STATUS_STAND_UP", "STATUS_AIMING", "STATUS_STRIKE", "STATUS_SIT_DOWN", "STATUS_SIT_DOWN2", "STATUS_GET_BULLET", "STATUS_GET_BULLET2", "STATUS_CHANGE_POS", "STATUS_AIM_RPG", "STATUS_STRIKE_RPG", "STATUS_RELOADING"];
const ACTIONS = ["ACTION_RIGHT", "ACTION_LEFT", "ACTION_DOWN", "ACTION_UP", "ACTION_STRIKE", "ACTION_USE_RPG", "ACTION_AIM", "ACTION_RESERVE", "ACTION_RELOAD"];
Bot = function(game, vLayer, vX, vY, vSkin, vLine, vBrain) {
	this.game = game;
	vSkin = vSkin || "stickman" + MyMath.getRandomInt(1, 4);
	vSkin = this.checkSkin(vSkin);
	if (vX == 0) {
		var r = 0;
		var arSpawns = [];
		if (vLine == 1) {
			r = MyMath.getRandomInt(0, 3);
			arSpawns = [1, 6, 7, 12];
			vX = 80 * arSpawns[r]
		} else {
			r = MyMath.getRandomInt(0, 3);
			arSpawns = [1, 5, 8, 12];
			vX = 80 * arSpawns[r]
		}
	}
	if (vY == 0) {
		if (vLine == 1) {
			vY = 300 - 60
		} else {
			vY = 515 - 60
		}
	}
	var hero = this.game.add.spine(vX, vY, "skeleton", "idle", true);
	hero.setSkinByName(vSkin);
	hero.setScale(1.5);
	this.offsetFlash = 0;
	vLayer.add(hero);
	this.hero = hero;
	this.lineNum = vLine;
	this.level = vBrain;
	this.skin = vSkin;
	this.updateOffsetFlash();
	if (vLine == 1) {
		this.arrRespawns = this.game.arrRespawns1
	} else {
		this.arrRespawns = this.game.arrRespawns2
	}
	this.VEL_X = 80;
	this.tickUpdate = 0;
	this.tickAction = 0;
	this.tickStrike = 0;
	this.tickStrike_max = 0;
	this.speedX = 4;
	this.health_max = 100 + 10 * (MainGame.fireLevel - 1);
	this.health = this.health_max;
	this.action = ACTION_RIGHT;
	this.status = STATUS_RUN;
	this.animName = "";
	this.nextPos = {
		x: vX,
		y: vY
	};
	this.isStrike = false;
	this.isMoving = false;
	this.isReloading = false;
	this.isFlag = true;
	this.goalX = 0;
	this.goalPosX = 0;
	this.tickPeace = 0;
	this.tintTick = 0;
	this.timerReloading = null;
	this.cBulletMax = 3;
	this.cBulletNow = this.cBulletMax;
	this.isAim = false;
	this.isPrised = false;
	this.hero.setMix("run", "sitrun", .1);
	this.hero.setMix("run", "idle", .12);
	this.hero.setMix("idle", "run", .12);
	this.hero.setMix("idle", "sit", .08);
	this.hero.setMix("sit", "idle", .08);
	this.hero.setMix("sit", "sitrun", .18);
	this.hero.setMix("sitrun", "sit", .18);
	this.playAnimation("idle", true);
	this.changePosition();
	var hp_bar1 = this.game.add.image(vX, vY, "ss_shooter", "mob_bar2_0000");
	this.game.layerEffect.add(hp_bar1);
	var hp_bar2 = this.game.add.image(vX, vY, "ss_shooter", "mob_bar1_0000");
	this.game.layerEffect.add(hp_bar2);
	var trigger = this.game.add.image(vX, vY, "ss_shooter", "trigger_0000");
	this.game.layerEffect.add(trigger);
	this.hp_bar1 = hp_bar1;
	this.hp_bar2 = hp_bar2;
	this.trigger = trigger;
	this.trigger.visible = false;
	this.hpBar_crop = new Phaser.Geom.Rectangle(0, 0, hp_bar2.width, hp_bar2.height);
	this.hp_bar2.setCrop(this.hpBar_crop);
	this.game.getCountBots()
};
Bot.prototype.pauseAnimation = function() {
	this.hero.state.timeScale = 0
};
Bot.prototype.resumeAnimation = function() {
	this.hero.state.timeScale = 1
};
Bot.prototype.updateOffsetFlash = function() {
	if (this.skin == "stickman1" || this.skin == "stickman_zombie") this.offsetFlash = 10;
	if (this.skin == "stickman2" || this.skin == "stickman_ghost") this.offsetFlash = 5;
	if (this.skin == "stickman3" || this.skin == "stickman_mummy") this.offsetFlash = 5;
	if (this.skin == "stickman4" || this.skin == "stickman_skeleton") this.offsetFlash = 15
};
Bot.prototype.changePosition = function() {
	this.status = STATUS_RUN;
	var goRight = MyMath.getRandomBool();
	var cPos = Math.round((this.hero.x + 40) / 80) - 1;
	var nPos = cPos;
	if (cPos < 2) goRight = true;
	if (cPos > 11) goRight = false;
	if (this.lineNum == 1) {
		if (cPos == 4) goRight = true;
		if (cPos == 9) goRight = false
	} else {
		if (cPos == 2) goRight = true;
		if (cPos == 11) goRight = false
	}
	if (this.level == 0) {
		if (this.lineNum == 1) {
			if (cPos == 1) nPos += MyMath.getRandomInt(1, 2);
			if (cPos == 12) nPos -= MyMath.getRandomInt(1, 2);
			if (cPos == 6 || cPos == 7) {
				if (goRight) {
					nPos = MyMath.getRandomInt(10, 11)
				} else {
					nPos = MyMath.getRandomInt(2, 3)
				}
			}
		} else {
			if (cPos == 1) nPos = MyMath.getRandomInt(4, 5);
			if (cPos == 12) nPos = MyMath.getRandomInt(8, 9);
			if (cPos == 8) nPos = 9;
			if (cPos == 5) nPos = 4
		}
		this.goalX = nPos;
		this.goalPosX = nPos * 80;
		return
	}
	var isBarrelNow = this.arrRespawns.indexOf(cPos) != -1;
	var isBarrelNext = false;
	if (goRight) {
		if ((cPos + 1) * 80 < this.game.maxPosX) {
			do {
				nPos++
			} while (this.arrRespawns.indexOf(nPos) < 0 && nPos < 13)
		}
	} else {
		if (cPos * 80 > 0) {
			do {
				nPos--
			} while (this.arrRespawns.indexOf(nPos) < 0 && nPos > 0)
		}
	}
	if (Math.abs(nPos - cPos) < 2) isBarrelNext = this.arrRespawns.indexOf(nPos) != -1;
	if (!isBarrelNow || !isBarrelNext) {
		this.updateAction(ACTION_UP)
	}
	this.goalX = nPos;
	this.goalPosX = nPos * 80
};
Bot.prototype.updateStatus = function() {
	if (this.status == STATUS_DEAD) return;
	if (this.tickAction > 0) {
		this.tickAction--;
		return
	}
	if (this.isMoving) return;
	switch (this.status) {
		case STATUS_DEAD:
			break;
		case STATUS_RUN:
			var cPos = Math.round((this.hero.x + 40) / 80) - 1;
			if (cPos > this.goalX) this.updateAction(ACTION_LEFT);
			if (cPos < this.goalX) this.updateAction(ACTION_RIGHT);
			if (cPos == this.goalX) {
				if (this.level == 0) {
					this.status = STATUS_STAND_UP
				} else {
					this.updateAction(ACTION_DOWN);
					this.status = STATUS_SIT
				}
				this.tickAction = MyMath.getRandomInt(0, 5)
			}
			break;
		case STATUS_SIT:
			this.tickPeace++;
			if (this.tickPeace >= 5 || MyMath.getRandomBool()) {
				this.changePosition();
				this.status = STATUS_STAND_UP
			} else {
				this.changePosition()
			}
			break;
		case STATUS_STAND_UP:
			if (this.cBulletNow == 0) {
				this.status = STATUS_RELOADING;
				this.updateAction(ACTION_RELOAD);
				this.tickAction = 1
			} else {
				this.status = STATUS_AIMING;
				this.updateAction(ACTION_UP)
			}
			break;
		case STATUS_AIMING:
			this.updateAction(ACTION_AIM);
			if (this.game.isLevelFinished) {
				this.status = STATUS_SIT_DOWN
			} else {
				this.status = STATUS_STRIKE;
				this.trigger.visible = true;
				this.trigger.alpha = 0;
				this.tickPeace = 0
			}
			this.tickStrike_max = 150 - Math.round(MainGame.fireLevel * .5);
			if (this.tickStrike_max < 40) this.tickStrike_max = 40;
			this.tickAction = 0;
			this.tickStrike = this.tickStrike_max;
			break;
		case STATUS_STRIKE:
			this.game.botShoot(this.skin, this.level, this.hero.x + this.offsetFlash * this.hero.scaleX, this.hero.y - 75);
			this.updateAction(ACTION_STRIKE);
			this.trigger.visible = false;
			if (this.level == 0) {
				this.updateAction(ACTION_AIM);
				this.status = STATUS_AIMING;
				this.tickAction = 10
			} else if (this.level == 1) {
				this.status = STATUS_SIT_DOWN;
				this.tickAction = MyMath.getRandomInt(2, 6);
				if (MyMath.randomChance(.2)) {
					this.updateAction(ACTION_AIM);
					this.status = STATUS_AIMING
				}
			} else if (this.level == 2) {
				this.status = STATUS_SIT_DOWN;
				this.tickAction = MyMath.getRandomInt(1, 3);
				if (MyMath.randomChance(.35)) {
					this.updateAction(ACTION_AIM);
					this.status = STATUS_AIMING
				}
			} else if (this.level == 3) {
				this.status = STATUS_SIT_DOWN;
				this.tickAction = 2;
				if (MyMath.randomChance(.45)) {
					this.updateAction(ACTION_AIM);
					this.status = STATUS_AIMING
				}
			}
			this.cBulletNow--;
			if (this.cBulletNow == 0) {
				this.status = STATUS_SIT_DOWN;
				this.tickAction = MyMath.getRandomInt(1, 6)
			}
			break;
		case STATUS_SIT_DOWN:
			this.trigger.visible = false;
			this.updateAction(ACTION_DOWN);
			this.status = STATUS_SIT_DOWN2;
			this.tickAction = 0;
			this.isFlag = true;
			break;
		case STATUS_SIT_DOWN2:
			this.status = STATUS_RUN;
			this.tickAction = MyMath.getRandomInt(0, 5);
			this.isFlag = true;
			break;
		case STATUS_GET_BULLET:
			this.updateAction(ACTION_DOWN);
			this.tickAction = 0;
			this.isFlag = true;
			this.trigger.visible = false;
			if (MyMath.randomChance(.7)) {
				this.status = STATUS_GET_BULLET2
			} else {
				this.status = STATUS_SIT
			}
			break;
		case STATUS_GET_BULLET2:
			this.status = STATUS_CHANGE_POS;
			this.tickAction = 0;
			this.isFlag = true;
			break;
		case STATUS_CHANGE_POS:
			this.changePosition();
			break;
		case STATUS_RELOADING:
			if (!this.isReloading) {
				this.status = STATUS_STAND_UP;
				this.tickAction = 0
			}
			break
	}
};
Bot.prototype.updateAction = function(vAction) {
	switch (vAction) {
		case ACTION_RIGHT:
			this.hero.scaleX = -1.5;
			if (this.hero.x < this.game.maxPosX) {
				this.nextPos.x = this.goalPosX;
				if (this.nextPos.x > this.game.maxPosX) {
					this.nextPos.x = this.game.maxPosX
				}
			}
			this.updateAim(false);
			this.isMoving = true;
			break;
		case ACTION_LEFT:
			this.hero.scaleX = 1.5;
			if (this.hero.x > this.game.minPosX) {
				this.nextPos.x = this.goalPosX;
				if (this.nextPos.x < this.game.minPosX) {
					this.nextPos.x = this.game.minPosX
				}
			}
			this.updateAim(false);
			this.isMoving = true;
			break;
		case ACTION_DOWN:
			if (this.isAim) {
				this.updateAim(false)
			} else {
				if (!this.isPrised) this.updatePrised(true)
			}
			break;
		case ACTION_UP:
			if (this.isPrised) {
				this.updatePrised(false)
			}
			break;
		case ACTION_STRIKE:
			if (this.cBulletNow == 0 || this.isReloading) return;
			this.updateStrike(true);
			break;
		case ACTION_USE_RPG:
			if (this.isPrised) this.isPrised = false;
			break;
		case ACTION_AIM:
			if (this.isReloading) return;
			if (this.isPrised) this.updatePrised(false);
			if (this.isAim) {
				this.updateAim(false)
			} else {
				this.updateAim(true)
			}
			break;
		case ACTION_RELOAD:
			if (this.isReloading) return;
			this.playAnimation("reload", false);
			this.isPrised = true;
			this.isReloading = true;
			this.isAim = false;
			this.timerReloading = this.game.time.delayedCall(2e3, this.finishReloading, [], this);
			break
	}
	this.lastAction = vAction
};
Bot.prototype.finishReloading = function() {
	this.isReloading = false;
	this.cBulletNow = this.cBulletMax
};
Bot.prototype.playAnimation = function(vAnimName, vIsLoop) {
	if (this.animName == vAnimName) return;
	this.hero.setAnimation(0, vAnimName, vIsLoop);
	this.animName = vAnimName;
	if (vAnimName == "attack" && !vIsLoop) {
		this.hero.addAnimation(0, "aiming", true)
	}
	if (vAnimName == "reload" && !vIsLoop) {
		this.hero.addAnimation(0, "sit", true)
	}
};
Bot.prototype.updateStrike = function(vValue) {
	this.isStrike = vValue;
	if (this.isStrike) {
		this.playAnimation("attack", false)
	} else {
		this.playAnimation("aiming", true)
	}
};
Bot.prototype.updateAim = function(vValue) {
	this.isAim = vValue;
	if (this.isAim) {
		this.playAnimation("aiming", true)
	} else {
		if (this.isPrised) this.updatePrised(this.isPrised)
	}
};
Bot.prototype.updatePrised = function(vValue) {
	this.isPrised = vValue;
	if (this.isPrised) {
		if (!this.isMoving) this.playAnimation("sit", true);
		this.speedX = 2
	} else {
		if (!this.isMoving) this.playAnimation("idle", true);
		this.speedX = 4
	}
};
Bot.prototype.updateRunStop = function() {
	if (this.isPrised) {
		this.playAnimation("sit", true)
	} else {
		this.playAnimation("idle", true)
	}
};
Bot.prototype.updateRunning = function() {
	if (this.isPrised) {
		this.playAnimation("sitrun", true)
	} else {
		this.playAnimation("run", true)
	}
};
Bot.prototype.distanceGoalX = function() {
	var distance = Math.abs(this.hero.x - this.nextPos.x);
	return distance
};
Bot.prototype.updateRedTint = function() {
	if (this.tintTick == 0) return;
	this.tintTick++;
	switch (this.tintTick) {
		case 3:
			this.hero.setColor(16750230);
			break;
		case 6:
			this.hero.setColor(16737380);
			break;
		case 9:
			this.hero.setColor(16724530);
			break;
		case 12:
			this.hero.setColor(16711680);
			break;
		case 15:
			this.hero.setColor(16724530);
			break;
		case 18:
			this.hero.setColor(16737380);
			break;
		case 21:
			this.hero.setColor(16750230);
			break;
		case 24:
			this.hero.setColor(16763080);
			break;
		case 27:
			this.hero.setColor(16777215);
			this.tintTick = 0;
			break
	}
};
Bot.prototype.update = function() {
	this.updateRedTint();
	if (this.status == STATUS_DEAD) return;
	if (this.status == STATUS_STRIKE) {
		this.tickStrike--;
		if (this.tickStrike == 0) {
			this.updateStatus()
		} else {
			this.trigger.alpha = 1 - this.tickStrike / this.tickStrike_max
		}
	} else {
		this.tickUpdate++;
		if (this.tickUpdate > 10) {
			this.updateStatus();
			this.tickUpdate = 0
		}
	}
	if (this.isMoving) {
		if (this.distanceGoalX() > 6) {
			var radian = Math.atan2(0, this.nextPos.x - this.hero.x);
			this.hero.x += Math.cos(radian) * this.speedX;
			this.updateRunning();
			this.isMoving = true
		} else {
			this.hero.x = this.nextPos.x;
			this.hero.y = this.nextPos.y;
			this.isMoving = false;
			this.updateRunStop()
		}
	}
	this.trigger.x = this.hero.x;
	this.trigger.y = this.hero.y - 170;
	this.hp_bar1.x = this.hero.x;
	if (this.isPrised) {
		this.hp_bar1.y = this.hero.y - 85
	} else {
		this.hp_bar1.y = this.hero.y - 130
	}
	this.hp_bar2.x = this.hp_bar1.x;
	this.hp_bar2.y = this.hp_bar1.y
};
Bot.prototype.isAlive = function() {
	return this.health > 0
};
Bot.prototype.hide = function() {
	this.playAnimation("idle", true);
	this.lastPosX = this.hero.x;
	this.lastPosY = this.hero.y;
	this.hero.y = -1e3
};
Bot.prototype.checkSkin = function(vSkin) {
	var skin = vSkin;
	if (MainGame.EVENT_NUM == 1) {
		if (vSkin == "stickman1") skin = "stickman_zombie";
		if (vSkin == "stickman2") skin = "stickman_ghost";
		if (vSkin == "stickman3") skin = "stickman_mummy";
		if (vSkin == "stickman4") skin = "stickman_skeleton"
	} else if (MainGame.EVENT_NUM == 2) {
		if (vSkin == "stickman1") skin = "stickman_christmas1";
		if (vSkin == "stickman2") skin = "stickman_christmas2";
		if (vSkin == "stickman3") skin = "stickman_christmas3";
		if (vSkin == "stickman4") skin = "stickman_christmas4"
	}
	return skin
};
Bot.prototype.respawn = function() {
	if (this.lineNum == 1) {
		var r = MyMath.getRandomInt(0, 3);
		var arSpawns = [1, 6, 7, 12];
		this.hero.x = 80 * arSpawns[r]
	} else {
		var r = MyMath.getRandomInt(0, 3);
		var arSpawns = [1, 5, 8, 12];
		this.hero.x = 80 * arSpawns[r]
	}
	this.hero.setColor(16777215);
	var skin = "stickman" + MyMath.getRandomInt(1, 4);
	skin = this.checkSkin(skin);
	this.hero.setSkinByName(skin);
	this.skin = skin;
	this.updateOffsetFlash();
	this.hero.y = this.lastPosY;
	this.nextPos.x = this.hero.x;
	this.isStrike = false;
	this.isMoving = false;
	this.isReloading = false;
	this.isFlag = true;
	this.action = ACTION_RIGHT;
	this.cBulletNow = this.cBulletMax;
	this.health = this.health_max;
	this.changePosition();
	this.tickAction = 0;
	this.tickPeace = 0;
	this.hp_bar1.visible = true;
	this.hp_bar2.visible = true;
	this.trigger.visible = false;
	var width = this.hp_bar1.width * (this.health / this.health_max);
	this.hpBar_crop.width = width;
	this.hp_bar2.setCrop(this.hpBar_crop)
};
Bot.prototype.damage = function(vValue) {
	if (this.status == STATUS_DEAD) return;
	this.health -= vValue;
	this.tintTick = 1;
	var width = this.hp_bar1.width * (this.health / this.health_max);
	if (this.health <= 0) {
		width = 0;
		this.status = STATUS_DEAD;
		var r = MyMath.getRandomInt(1, 4);
		this.playAnimation("dead" + r, false);
		this.game.time.delayedCall(2e3, this.hide, [], this);
		if (this.game.getCountBots()) {
			this.game.time.delayedCall(4e3, this.respawn, [], this)
		}
		this.game.increaseFrags();
		this.game.checkCombo(this.hero.x, this.hero.y);
		if (this.timerReloading) {
			this.timerReloading.remove()
		}
		this.hp_bar1.visible = false;
		this.hp_bar2.visible = false;
		this.trigger.visible = false
	} else {
		if (this.level == 1 && MyMath.randomChance(.2) || this.level == 2 && MyMath.randomChance(.5) || this.level == 3 && MyMath.randomChance(.8)) {
			this.status = STATUS_GET_BULLET
		}
	}
	this.hpBar_crop.width = width;
	this.hp_bar2.setCrop(this.hpBar_crop)
};
Bot.prototype.remove = function() {};
class Boot extends Phaser.Scene {
	constructor() {
		super("Boot");
		this.wasIncorrectOrientation = false
	}
	preload() {
		this.load.plugin("PokiApiPlugin", PokiApiPlugin, true);
		this.load.image("preloader_bar", "assets/preloader_bar.png?r=2");
		this.load.image("preloader_back", "assets/preloader_back.png?r=2");
		if (MainGame.EVENT_NUM == 0) {
			this.load.image("bg_mergegunfire3", "assets/background/bg_mergegunfire3.png")
		} else if (MainGame.EVENT_NUM == 1) {
			this.load.image("bg_mergegunfire3", "assets/background/bg_mergegunfire3H.png")
		} else if (MainGame.EVENT_NUM == 2) {
			this.load.image("bg_mergegunfire3", "assets/background/bg_mergegunfire3C.png")
		}
		this.load.bitmapFont("Panton", "assets/fonts/Panton40.png", "assets/fonts/Panton40.fnt")
	}
	create() {
		MainGame.world = {
			width: this.cameras.main.width,
			height: this.cameras.main.height,
			centerX: this.cameras.main.centerX,
			centerY: this.cameras.main.centerY
		};
		MainGame.initSettings();
		this.scaleForMobile();
		this.scene.start("Preloader")
	}
	scaleForMobile() {
		this.wasIncorrectOrientation = true;
		window.addEventListener("resize", this.onWindowResize.bind(this));
		this.onWindowResize()
	}
	onWindowResize() {
		if (game.device.os.desktop) {} else {
			if (window.innerWidth > window.innerHeight) {
				this.checkOriention("landscape")
			} else {
				this.checkOriention("portrait")
			}
		}
		if (MainGame.state && MainGame.state.updateResize) MainGame.state.updateResize();
		this.handleScroll()
	}
	checkOriention(orientation) {
		if (orientation === MainGame.Config.ORIENTATION) {
			this.leaveIncorrectOrientation()
		} else {
			this.enterIncorrectOrientation()
		}
	}
	enterIncorrectOrientation() {
		document.getElementById("orientation").style.display = "block"
	}
	leaveIncorrectOrientation() {
		document.getElementById("orientation").style.display = "none"
	}
	isLandscape() {
		return window.innerWidth > window.innerHeight
	}
	isPortrait() {
		return window.innerHeight > window.innerWidth
	}
	handleScroll() {
		if (typeof this.scrollTimeout !== "undefined") {
			clearTimeout(this.scrollTimeout)
		}
		this.scrollTimeout = setTimeout(() => {
			window.scrollTo(0, -window.innerHeight);
			if (MainGame.state && MainGame.state.updateResize) MainGame.state.updateResize()
		}, 500)
	}
}
class Preloader extends Phaser.Scene {
	constructor() {
		super("Preloader")
	}
	preload() {
		MainGame.state = this;
		this.initResize();
		this.midX = this.GAME_WIDTH / 2;
		this.midY = this.GAME_HEIGHT / 2;
		const midX = MainGame.Config.DEFAULT_WIDTH * .5;
		var back = this.add.sprite(midX, 0, "bg_mergegunfire3");
		back.setOrigin(.5, 0);
		this.preloader_back = this.add.image(midX, 590, "preloader_back");
		this.preloader_bar = this.add.image(midX, 590, "preloader_bar");
		this.preloader_crop = new Phaser.Geom.Rectangle(0, 0, 0, this.preloader_bar.height);
		this.preloader_bar.setCrop(this.preloader_crop);
		this.load.on(Phaser.Loader.Events.START, this.onLoadStart, this);
		this.load.on(Phaser.Loader.Events.PROGRESS, this.onLoadProgress, this);
		this.load.once(Phaser.Loader.Events.COMPLETE, this.onLoadComplete, this);
		MainGame.selectedGun = MainGame.selectedGun || 1;
		MainGame.fireLevel = MainGame.fireLevel || 1;
		var resources = {
			image: [],
			atlas: [],
			spine: [],
			audio: [
				["click3", ["assets/audio/sfx1/click3.mp3"]],
				["unlocked", ["assets/audio/sfx1/unlocked.mp3"]],
				["show_box", ["assets/audio/sfx1/show_box.mp3"]],
				["merge3", ["assets/audio/sfx1/merge3.mp3"]],
				["open_box", ["assets/audio/sfx1/open_box.mp3"]],
				["buy", ["assets/audio/sfx1/buy.mp3"]],
				["deleted3", ["assets/audio/sfx1/deleted3.mp3"]],
				["level_up", ["assets/audio/sfx1/level_up.mp3"]],
				["win", ["assets/audio/sfx1/win.mp3"]],
				["offline_earning3", ["assets/audio/sfx1/offline_earning3.mp3"]],
				["boost", ["assets/audio/sfx1/boost.mp3"]],
				["give_gun3", ["assets/audio/sfx1/give_gun3.mp3"]],
				["lucky_wheel2", ["assets/audio/sfx1/lucky_wheel2.mp3"]],
				["autorifle", ["assets/audio/sfx2/autorifle.mp3"]],
				["autorifle2", ["assets/audio/sfx2/autorifle2.mp3"]],
				["autorifle3", ["assets/audio/sfx2/autorifle3.mp3"]],
				["pistol", ["assets/audio/sfx2/pistol.mp3"]],
				["pistol2", ["assets/audio/sfx2/pistol2.mp3"]],
				["pistol3", ["assets/audio/sfx2/pistol3.mp3"]],
				["pistol4", ["assets/audio/sfx2/pistol4.mp3"]],
				["rifle", ["assets/audio/sfx2/rifle.mp3"]],
				["rifle2", ["assets/audio/sfx2/rifle2.mp3"]],
				["rifle3", ["assets/audio/sfx2/rifle3.mp3"]],
				["rifle4", ["assets/audio/sfx2/rifle4.mp3"]],
				["rifle5", ["assets/audio/sfx2/rifle5.mp3"]],
				["shotgun", ["assets/audio/sfx2/shotgun.mp3"]],
				["shotgun2", ["assets/audio/sfx2/shotgun2.mp3"]],
				["shotgun3", ["assets/audio/sfx2/shotgun3.mp3"]],
				["sniper", ["assets/audio/sfx2/sniper.mp3"]],
				["sniper2", ["assets/audio/sfx2/sniper2.mp3"]],
				["sniper3", ["assets/audio/sfx2/sniper3.mp3"]],
				["sniper4", ["assets/audio/sfx2/sniper4.mp3"]],
				["sniper5", ["assets/audio/sfx2/sniper5.mp3"]],
				["reload4", ["assets/audio/sfx2/reload4.mp3"]],
				["enemy", ["assets/audio/sfx2/enemy.mp3"]],
				["enemy2", ["assets/audio/sfx2/enemy2.mp3"]],
				["enemy3", ["assets/audio/sfx2/enemy3.mp3"]],
				["enemy4", ["assets/audio/sfx2/enemy4.mp3"]],
				["kick", ["assets/audio/sfx2/kick.mp3"]],
				["kick2", ["assets/audio/sfx2/kick2.mp3"]],
				["kick3", ["assets/audio/sfx2/kick3.mp3"]],
				["miss", ["assets/audio/sfx3/miss.mp3"]],
				["explosion", ["assets/audio/sfx3/explosion.mp3"]],
				["splash", ["assets/audio/sfx3/splash.mp3"]],
				["splash2", ["assets/audio/sfx3/splash2.mp3"]],
				["splash3", ["assets/audio/sfx3/splash3.mp3"]],
				["snowsplash", ["assets/audio/sfx3/snowsplash.mp3"]]
			],
			json: [
				["alltext", "assets/text/text.json?r=" + MyMath.getRandomInt(0, 99)]
			]
		};
		if (!MainGame.isFromTutorial) {
			if (MainGame.fireLevel == 1) {
				resources["image"].push(["bg_mergegunfire2", "assets/background/bg_mergegunfire2.png"]);
				resources["atlas"].push(["ss_shooter", "assets/spritesheets/ss_shooter.png?r=1", "assets/spritesheets/ss_shooter.json?r=" + MyMath.getRandomInt(0, 99)], ["ss_ui", "assets/spritesheets/ss_ui.png?r=1", "assets/spritesheets/ss_ui.json?r=" + MyMath.getRandomInt(0, 99)]);
				resources["spine"].push(["skeleton", "assets/spine/skeleton.json", "assets/spine/skeleton.atlas"], ["spine_shooter", "assets/spine/spine_shooter.json", "assets/spine/spine_shooter.atlas"]);
				resources["audio"].push(["music-shoot", ["assets/audio/music/music_shoot.mp3"]])
			} else {
				if (MainGame.EVENT_NUM == 0) {
					resources["image"].push(["bg_mergegunfire2", "assets/background/bg_mergegunfire2.png"], ["bg_game", "assets/background/bg_game.png"])
				} else if (MainGame.EVENT_NUM == 1) {
					resources["image"].push(["bg_mergegunfire2", "assets/background/bg_mergegunfire2H.png"], ["bg_game", "assets/background/bg_gameH.png"], ["bg_eventH", "assets/background/bg_eventH.png"])
				} else if (MainGame.EVENT_NUM == 2) {
					resources["image"].push(["bg_mergegunfire2", "assets/background/bg_mergegunfire2C.png"], ["bg_game", "assets/background/bg_gameC.png"], ["bg_eventC", "assets/background/bg_eventC.png"])
				}
				resources["atlas"].push(["ss_shooter", "assets/spritesheets/ss_shooter.png?r=1", "assets/spritesheets/ss_shooter.json?r=" + MyMath.getRandomInt(0, 99)], ["ss_ui", "assets/spritesheets/ss_ui.png?r=1", "assets/spritesheets/ss_ui.json?r=" + MyMath.getRandomInt(0, 99)], ["ss_main", "assets/spritesheets/ss_main.png?r=1", "assets/spritesheets/ss_main.json?r=" + MyMath.getRandomInt(0, 99)]);
				if (MainGame.EVENT_NUM == 1) {
					resources["atlas"].push(["ss_halloween", "assets/spritesheets/ss_halloween.png?r=1", "assets/spritesheets/ss_halloween.json?r=" + MyMath.getRandomInt(0, 99)])
				} else if (MainGame.EVENT_NUM == 2) {
					resources["atlas"].push(["ss_christmas", "assets/spritesheets/ss_christmas.png?r=1", "assets/spritesheets/ss_christmas.json?r=" + MyMath.getRandomInt(0, 99)])
				}
				resources["spine"].push(["skeleton", "assets/spine/skeleton.json", "assets/spine/skeleton.atlas"], ["spine_shooter", "assets/spine/spine_shooter.json", "assets/spine/spine_shooter.atlas"], ["spine_main", "assets/spine/spine_main.json", "assets/spine/spine_main.atlas"]);
				resources["audio"].push(["music-main", ["assets/audio/music/music_game.mp3"]], ["music-shoot", ["assets/audio/music/music_shoot.mp3"]]);
				if (MainGame.EVENT_NUM == 1) {
					resources["audio"].push(["music-halloween", ["assets/audio/music/music_halloween.mp3"]])
				} else if (MainGame.EVENT_NUM == 2) {
					resources["audio"].push(["music-christmas", ["assets/audio/music/music_christmas.mp3"]])
				}
			}
		} else {
			if (MainGame.EVENT_NUM == 0) {
				resources["image"].push(["bg_game", "assets/background/bg_game.png"])
			} else if (MainGame.EVENT_NUM == 1) {
				this.textures.remove("bg_mergegunfire2");
				resources["image"].push(["bg_mergegunfire2", "assets/background/bg_mergegunfire2H.png"], ["bg_game", "assets/background/bg_gameH.png"], ["bg_eventH", "assets/background/bg_eventH.png"])
			} else if (MainGame.EVENT_NUM == 2) {
				this.textures.remove("bg_mergegunfire2");
				resources["image"].push(["bg_mergegunfire2", "assets/background/bg_mergegunfire2C.png"], ["bg_game", "assets/background/bg_gameC.png"], ["bg_eventC", "assets/background/bg_eventC.png"])
			}
			resources["atlas"].push(["ss_main", "assets/spritesheets/ss_main.png?r=1", "assets/spritesheets/ss_main.json?r=" + MyMath.getRandomInt(0, 99)]);
			if (MainGame.EVENT_NUM == 1) {
				resources["atlas"].push(["ss_halloween", "assets/spritesheets/ss_halloween.png?r=1", "assets/spritesheets/ss_halloween.json?r=" + MyMath.getRandomInt(0, 99)])
			}
			if (MainGame.EVENT_NUM == 2) {
				resources["atlas"].push(["ss_christmas", "assets/spritesheets/ss_christmas.png?r=1", "assets/spritesheets/ss_christmas.json?r=" + MyMath.getRandomInt(0, 99)])
			}
			resources["spine"].push(["spine_main", "assets/spine/spine_main.json", "assets/spine/spine_main.atlas"]);
			resources["audio"].push(["music-main", ["assets/audio/music/music_game.mp3"]]);
			if (MainGame.EVENT_NUM == 1) {
				resources["audio"].push(["music-halloween", ["assets/audio/music/music_halloween.mp3"]])
			}
			if (MainGame.EVENT_NUM == 2) {
				resources["audio"].push(["music-christmas", ["assets/audio/music/music_christmas.mp3"]])
			}
		}
		for (var method in resources) {
			resources[method].forEach((function(args) {
				var loader = this.load[method];
				loader && loader.apply(this.load, args)
			}), this)
		}
		this.updateResize()
	}
	onLoadProgress() {
		this.updateLogoCrop(this.load.progress)
	}
	updateLogoCrop(loadProgress) {
		var originalWidth = this.preloader_bar.width;
		var width = originalWidth * loadProgress;
		this.tweens.killTweensOf(this.preloader_crop);
		if (loadProgress == 1) {
			this.preloader_bar.isCropped = false
		} else {
			this.tweens.add({
				targets: this.preloader_crop,
				width: width,
				ease: Phaser.Math.Easing.Linear,
				duration: 200,
				onUpdate: () => {
					this.preloader_bar.setCrop(this.preloader_crop)
				}
			})
		}
		if (MainGame.isAPI && !MainGame.isFromTutorial) MainGame.API_POKI.gameLoadingProgress(loadProgress)
	}
	onLoadStart() {
		if (MainGame.isAPI && !MainGame.isFromTutorial) MainGame.API_POKI.gameLoadingStart()
	}
	onLoadComplete() {
		this.tweens.killTweensOf(this.preloader_crop);
		this.load.off(Phaser.Loader.Events.PROGRESS, this.onLoadProgress);
		this.preloader_bar.isCropped = false;
		if (MainGame.isAPI && !MainGame.isFromTutorial) MainGame.API_POKI.gameLoadingFinished()
	}
	initResize() {
		this.GAME_WIDTH = MainGame.Config.DEFAULT_WIDTH;
		this.GAME_HEIGHT = MainGame.Config.DEFAULT_HEIGHT;
		var gameSize = this.scale.gameSize;
		var width = gameSize.width;
		var height = gameSize.height;
		if (window.innerHeight < MainGame.Config.MAX_HEIGHT) {
			height = window.innerHeight
		}
		this.parent = new Phaser.Structs.Size(width, height);
		this.sizer = new Phaser.Structs.Size(this.GAME_WIDTH, this.GAME_HEIGHT, Phaser.Structs.Size.FIT, this.parent);
		this.parent.setSize(width, height);
		this.sizer.setSize(width, height);
		this.scale.on("resize", this.updateResize, this)
	}
	updateResize() {
		var gameSize = this.scale.gameSize;
		var width = gameSize.width;
		var height = gameSize.height;
		if (window.innerHeight < MainGame.Config.MAX_HEIGHT) {
			height = window.innerHeight
		}
		this.parent.setSize(width, height);
		this.sizer.setSize(width, height);
		this.updateCamera()
	}
	updateCamera() {
		const camera = this.cameras.main;
		var deltaX = Math.ceil(this.parent.width - this.sizer.width) * .5;
		var deltaY = Math.ceil(this.parent.height - this.sizer.height) * .5;
		var sdvigY = 0;
		if (window.innerHeight < MainGame.Config.MAX_HEIGHT) {
			deltaY = Math.ceil(window.innerHeight - this.sizer.height) * .5;
			sdvigY = this.scale.gameSize.height - window.innerHeight
		}
		const scaleX = this.sizer.width / this.GAME_WIDTH;
		const scaleY = this.sizer.height / this.GAME_HEIGHT;
		const zoom = Math.max(scaleX, scaleY);
		const offsetY = deltaY / zoom;
		const offsetX = deltaX / zoom;
		camera.setZoom(zoom);
		camera.centerOn(this.GAME_WIDTH / 2, this.GAME_HEIGHT / 2 + offsetY)
	}
	create() {
		this.scale.off("resize", this.updateResize, this);
		if (!MainGame.isFromTutorial) {
			MainGame.TEXT_FILE = this.cache.json.get("alltext");
			MainGame.Sfx.manage("music", "init", this);
			MainGame.Sfx.manage("sound", "init", this)
		}
		if (MainGame.fireLevel == 1) {
			MainGame.Sfx.initMusicPart1();
			MainGame.fadeOutScene("Shooter", this);
			return
		} else {
			if (MainGame.isFromTutorial) {
				MainGame.Sfx.initMusicPart2()
			} else {
				MainGame.Sfx.initMusicPart1();
				MainGame.Sfx.initMusicPart2()
			}
		}
		MainGame.fadeOutScene("Game", this)
	}
}
class Game extends Phaser.Scene {
	constructor() {
		super("Game")
	}
	create() {
		MainGame.state = this;
		MainGame.stateName = "Game";
		MainGame.GAME_TEXT = MainGame.TEXT_FILE[MainGame.languages[MainGame.language]];
		this.initResize();
		this.midX = this.GAME_WIDTH / 2;
		this.midY = this.GAME_HEIGHT / 2;
		this.updateResize();
		var back = this.add.image(this.midX, 0, "bg_game");
		back.setOrigin(.5, 0);
		if (MainGame.firstGo) {
			this.input.once("pointerdown", this.playOnce, this)
		} else {
			MainGame.Sfx.play("music", "main")
		}
		game.canvas.style.cursor = "default";
		this.initSettingsGame();
		this.initSpineMan();
		this.layerButtons = this.add.container();
		this.layerButtons.setDepth(this.DEPTH_layerMainButtons);
		this.initEffects();
		this.gameGUI = new GameGUI(this);
		this.gameGUI.init();
		this.initShop();
		this.initInputScrolling();
		this.icon_trash = this.gameGUI.icon_trash;
		this.initArmHelp();
		this.initParkings();
		this.updateParking();
		this.cursor_car = this.add.image(200, 200, "ss_main", "icon_f1_0000");
		this.cursor_car.depth = this.DEPTH_cursorcar;
		this.cursor_car.visible = false;
		this.cursor_car.setScale(this.getScaleCar(1));
		this.input.on("pointerdown", this.onInputDown, this);
		this.input.on("pointerup", this.onInputUp, this);
		this.input.on("pointermove", this.onInputMove, this);
		this.race_start = this.add.image(this.midX - 260, 480, "ss_main", "icon_parking_0000");
		this.race_start.visible = false;
		var obj = null;
		for (var i = 0; i < this.MAX_PARKING; i++) {
			obj = this.box_have[i];
			if (obj && obj.t > 0) {
				this.addObject({
					lvl: obj.t,
					alreadyRacing: obj.r,
					parkingId: obj.id
				})
			}
		}
		if (MainGame.isFromFireMode) {
			MainGame.isFromFireMode = false
		}
		MainGame.isFromTutorial = false;
		var earning_sec = this.total_speed;
		if (MainGame.lastSession && earning_sec > 0) {
			var currentSession = new Date;
			var dif = currentSession.getTime() - MainGame.lastSession;
			var secondsFromLastSession = Math.abs(dif / 1e3);
			var countAddFree = Math.floor(secondsFromLastSession / this.TIME_NEXT_FREE);
			var secondsDiff = Math.floor(secondsFromLastSession) % this.TIME_NEXT_FREE;
			if (countAddFree > 0) {
				this.freeTimeWheel += countAddFree;
				if (this.freeTimeWheel > MainGame.maxTimeWheel) {
					this.freeTimeWheel = MainGame.maxTimeWheel
				}
			}
			if (this.freeTimeWheel < MainGame.maxTimeWheel) {
				if (MainGame.cdNextFree != null) {
					if (MainGame.cdNextFree < 0) MainGame.cdNextFree = 0;
					this.countDownNextFree = MainGame.cdNextFree - secondsDiff;
					if (this.countDownNextFree < 0) {
						this.freeTimeWheel += 1;
						if (this.freeTimeWheel > MainGame.maxTimeWheel) {
							this.freeTimeWheel = MainGame.maxTimeWheel
						}
						this.countDownNextFree = this.TIME_NEXT_FREE - Math.abs(this.countDownNextFree)
					}
				} else {
					this.countDownNextFree = this.TIME_NEXT_FREE
				}
			}
			if (secondsFromLastSession > this.MAX_OFFLINE_EARNING_SEC) {
				secondsFromLastSession = this.MAX_OFFLINE_EARNING_SEC
			}
			var add_money = Math.round(earning_sec * secondsFromLastSession * this.OFFLINE_EARNING);
			this.value_offline_earning = add_money;
			if (!MainGame.isAPI && MainGame.isDebug) {
				console.log("skip showing offline earning", add_money)
			} else {
				this.gameGUI.showOfflineEarningWindow(add_money)
			}
			this.amount_coins += add_money
		} else {
			MainGame.isApiGameplayStop = true;
			if (this.currentLevel == 1 && this.exp == 0) {
				this.freeTimeWheel = MainGame.maxTimeWheel;
				MainGame.freeTimeWheel = this.freeTimeWheel;
				this.initTutorial();
				if (MainGame.isAPI) MainGame.API_POKI.gameplayStart()
			}
		}
		this.updateValuesFromLoad();
		this.gameStarted = true;
		this.cameras.main.fadeIn(200);
		this.offerFreeUpgrade = 3
	}
	addText(vLayer, vX, vY, vText, vSize, vIsUpperCase) {
		vX -= 1;
		vY -= 1;
		if (vText && vIsUpperCase) vText = vText.toUpperCase();
		var txt = this.add.bitmapText(vX, vY, "Panton", vText);
		txt.setFontSize(vSize);
		txt.setOrigin(.5);
		if (vLayer) vLayer.add(txt);
		return txt
	}
	initSpineMan() {
		var stick_man = this.add.spine(0, 0, "spine_main", "idle_pistol", true);
		stick_man.x = 250;
		stick_man.y = 530;
		stick_man.setSkinByName("gun" + MainGame.selectedGun);
		stick_man.setScale(2.3);
		this.stick_man = stick_man;
		this.updateSpineMan()
	}
	updateSpineMan() {
		var ar_pistol = [1, 2, 3, 4, 5, 6, 20, 21, 32, 33, 42, 43];
		var ar_rifle = [7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 19, 22, 23, 24, 25, 26, 27, 28, 29, 30, 34, 36, 38, 39, 40, 41, 44, 45, 46, 48, 49, 50];
		var ar_autorifle = [16, 17, 31, 35, 37, 47];
		var isPistol = ar_pistol.indexOf(MainGame.selectedGun) !== -1;
		var isRifle = ar_rifle.indexOf(MainGame.selectedGun) !== -1;
		var isAutorifle = ar_autorifle.indexOf(MainGame.selectedGun) !== -1;
		var new_stickManAnim = "idle_pistol";
		if (isRifle) new_stickManAnim = "idle_rifle";
		if (isAutorifle) new_stickManAnim = "idle_autorifle";
		if (new_stickManAnim != this.stickManAnim) {
			this.stickManAnim = new_stickManAnim;
			this.stick_man.play(this.stickManAnim, true)
		}
		if (MainGame.selectedGun > 0) this.stick_man.setSkinByName("gun" + MainGame.selectedGun);
		this.updateSpineHat(MainGame.selectedHat)
	}
	updateSpineHat(vValue) {
		try {
			this.stick_man.skeleton.setAttachment("hat", "hat_" + vValue)
		} catch (e) {
			this.stick_man.skeleton.setAttachment("hat", "hat_0")
		}
	}
	showShooterScreen() {
		this.saveGameValues();
		this.scale.off("resize", this.updateResize, this);
		if (MainGame.isAPI) {
			MainGame.isGoToShooter = true;
			MainGame.API_POKI.gameplayStop();
			MainGame.API_POKI.commercialBreak()
		} else {
			this.goShooterScreen()
		}
	}
	goShooterScreen() {
		MainGame.fadeOutScene("Shooter", this)
	}
	goHalloweenScreen() {
		this.saveGameValues();
		this.scale.off("resize", this.updateResize, this);
		if (MainGame.isAPI) MainGame.API_POKI.gameplayStop();
		MainGame.fadeOutScene("UpdateHalloween", this)
	}
	goChristmasScreen() {
		this.saveGameValues();
		this.scale.off("resize", this.updateResize, this);
		if (MainGame.isAPI) MainGame.API_POKI.gameplayStop();
		MainGame.fadeOutScene("UpdateChristmas", this)
	}
	playOnce() {
		MainGame.firstGo = false;
		MainGame.Sfx.play("music", "main")
	}
	updateCoinsText() {
		var text_coins_warm = this.convertNumberFormat(this.amount_coins);
		this.gameGUI.updateCoins(text_coins_warm)
	}
	updateValuesFromLoad() {
		var text_coins_warm = this.convertNumberFormat(this.amount_coins);
		this.gameGUI.updateCoins(text_coins_warm);
		this.gameGUI.updateDiamonds(MainGame.amount_diamonds);
		this.updateSpeedCars();
		this.gameGUI.updateLevel(this.exp / this.exp_max);
		if (this.nextCarLevel > this.MAX_TYPES_CAR) {
			this.gameGUI.layerProgressCar.visible = false
		}
		this.updateShop(text_coins_warm);
		if (MainGame.cdBonusCoins && MainGame.cdBonusCoins > 0) {
			this.activateBoost(MainGame.cdBonusCoins)
		}
		if (MainGame.cdBonusSpeed && MainGame.cdBonusSpeed > 0) {
			this.activateTurbo(true, MainGame.cdBonusSpeed, true)
		}
		this.updatePrivilegiesFactors();
		this.updateSpeedValue();
		this.updateCarPrices();
		this.gameGUI.updateFastBuy();
		if (this.currentLevel < 4) {
			this.gameGUI.icon_free_fortune.visible = false;
			this.gameGUI.buttonFortuna.visible = false
		} else {
			if (this.freeTimeWheel > 0) {
				this.gameGUI.icon_free_fortune.visible = true;
				this.gameGUI.buttonFortuna.visible = true
			}
		}
		if (MainGame.fireLevel > 2) {
			if (MainGame.EVENT_NUM == 1) {
				if (MainGame.listEvents[0] == 1) {
					this.gameGUI.effectEvent.visible = false
				} else {
					this.gameGUI.effectEvent.visible = true
				}
			}
			if (MainGame.EVENT_NUM == 2) {
				if (MainGame.listEvents[1] == 1) {
					this.gameGUI.effectEvent.visible = false
				} else {
					this.gameGUI.effectEvent.visible = true
				}
			}
		} else {
			if (this.gameGUI.buttonEvent) this.gameGUI.buttonEvent.visible = false;
			if (this.gameGUI.effectEvent) this.gameGUI.effectEvent.visible = false
		}
		if (MainGame.EVENT_NUM == 0) {
			if (this.gameGUI.buttonEvent) this.gameGUI.buttonEvent.visible = false;
			if (this.gameGUI.effectEvent) this.gameGUI.effectEvent.visible = false
		}
	}
	initArmHelp() {
		this.arm_help = this.add.image(this.midX, this.midY, "ss_main", "tutor_cursor_0000");
		this.arm_help.visible = false;
		this.arm_help.setDepth(this.DEPTH_cursorcar);
		this.timerCheckHelp = 0
	}
	getMaxValuePair(ar) {
		var max_value = 0;
		var max_count = 0;
		var indexes_of_max = [];
		ar.sort((function(a, b) {
			return b.type - a.type
		}));
		max_value = ar[0].type;
		max_count = 1;
		indexes_of_max = [ar[0].id];
		for (var i = 1; i < ar.length; i++) {
			if (ar[i].type == max_value) {
				max_count++;
				indexes_of_max.push(ar[i].id);
				if (max_count == 2) {
					break
				}
			} else {
				max_count = 1;
				max_value = ar[i].type;
				indexes_of_max = [ar[i].id]
			}
		}
		return indexes_of_max
	}
	hideArmHelp() {
		this.tweens.killTweensOf(this.arm_help);
		this.arm_help.visible = false;
		this.timerCheckHelp = 0
	}
	updateArmHelp() {
		if (this.isGoTutorial || this.arm_help.visible) return;
		this.hideArmHelp();
		var valuesTypes = [];
		var parking;
		for (var i = 0; i < this.LIMIT_parking; i++) {
			parking = this.arParking[i];
			if (parking.type > 0 && parking.type < this.MAX_TYPES_CAR) {
				if (parking.obj && parking.obj.count_box_tween != null && parking.obj.count_box_tween <= 0) {
					valuesTypes.push({
						id: parking.id,
						type: parking.type
					})
				}
			}
		}
		if (valuesTypes.length < 1) return;
		var pairIds = this.getMaxValuePair(valuesTypes);
		if (pairIds.length > 1) {
			this.arm_help.visible = true;
			var parkingA = this.arParking[pairIds[1]];
			var parkingB = this.arParking[pairIds[0]];
			var offsetY = 15;
			this.arm_help.x = parkingA.x;
			this.arm_help.y = parkingA.y + offsetY;
			this.tweens.add({
				targets: this.arm_help,
				x: parkingB.x,
				y: parkingB.y + offsetY,
				ease: "Cubic.easeOut",
				duration: 700,
				hold: 300
			});
			this.time.delayedCall(1500, this.hideArmHelp, [], this)
		}
	}
	initTutorial() {
		this.gameGUI.btnFire.setEnable(false);
		this.gameGUI.buttonTurbo.visible = false;
		this.gameGUI.buttonShop.visible = false;
		this.gameGUI.icon_trash.visible = false;
		this.gameGUI.buttonChangeGun.visible = false;
		this.gameGUI.buttonHat.visible = false;
		this.gameGUI.buttonFortuna.visible = false;
		if (this.gameGUI.buttonEvent) this.gameGUI.buttonEvent.visible = false;
		if (this.gameGUI.effectEvent) this.gameGUI.effectEvent.visible = false;
		this.isGoTutorial = true;
		this.tutorialStep = 0;
		var effect = this.add.sprite(this.midX, this.midY, "ss_main");
		effect.play("effect_tutor");
		effect.visible = false;
		this.effect_tutor = effect;
		this.tutor_arm = this.add.image(this.midX, this.midY, "ss_main", "tutor_cursor_0000");
		this.tutor_arm.visible = false;
		this.effect_tutor.setDepth(this.DEPTH_cursorcar);
		this.tutor_arm.setDepth(this.DEPTH_cursorcar);
		this.time.delayedCall(500, this.tutorialScenario, [], this);
		this.textTutorial = this.add.bitmapText(770, 430, "Panton", "");
		this.textTutorial.setDropShadow(3, 3, 0, 1);
		this.textTutorial.setMaxWidth(380);
		this.textTutorial.setCenterAlign();
		this.textTutorial.setFontSize(34);
		this.textTutorial.setOrigin(.5);
		this.textTutorial.lineSpacing = -8;
		this.textTutorial.visible = false
	}
	tutorialScenario() {
		this.tutorialStep++;
		if (this.tutorialStep == 1) {
			this.tutor_arm.visible = true;
			this.effect_tutor.visible = true;
			this.tutor_arm.x = 760;
			this.tutor_arm.y = 590;
			this.effect_tutor.y = this.tutor_arm.y - 25;
			this.effect_tutor.x = this.tutor_arm.x - 2;
			this.tweens.add({
				targets: this.tutor_arm,
				scaleX: .9,
				scaleY: .9,
				ease: "Linear",
				duration: 500,
				yoyo: true,
				repeat: -1
			})
		} else if (this.tutorialStep == 3) {
			this.gameGUI.buttonAddCar.disableInput();
			var obj = this.arParking[1].obj;
			this.tutor_arm.x = obj.x + 5;
			this.tutor_arm.y = obj.y + 40;
			this.effect_tutor.y = this.tutor_arm.y - 25;
			this.effect_tutor.x = this.tutor_arm.x - 2;
			this.textTutorial.visible = true;
			this.textTutorial.setText(MainGame.GAME_TEXT.text_merge);
			this.tweens.killTweensOf(this.tutor_arm);
			this.tutor_arm.setScale(1);
			this.tweens.add({
				targets: this.tutor_arm,
				x: this.tutor_arm.x - 120,
				ease: "Linear",
				duration: 900,
				repeat: -1,
				hold: 400
			})
		} else if (this.tutorialStep == 4) {
			this.textTutorial.setText("");
			this.textTutorial.visible = false;
			this.tweens.killTweensOf(this.tutor_arm);
			this.addObject({
				lvl: 1,
				skinBox: true,
				parkingId: 3
			}, true);
			var obj = this.arParking[3].obj;
			this.tutor_arm.x = obj.x + 5;
			this.tutor_arm.y = obj.y + 40;
			this.effect_tutor.y = this.tutor_arm.y - 25;
			this.effect_tutor.x = this.tutor_arm.x - 2;
			this.tutor_arm.setScale(1);
			this.tweens.add({
				targets: this.tutor_arm,
				scaleX: .9,
				scaleY: .9,
				ease: "Linear",
				duration: 500,
				yoyo: true,
				repeat: -1
			})
		} else if (this.tutorialStep == 5) {
			this.tweens.killTweensOf(this.tutor_arm);
			this.tutor_arm.destroy();
			this.effect_tutor.destroy();
			this.textTutorial.destroy();
			this.isGoTutorial = false;
			this.gameGUI.buttonTurbo.visible = true;
			this.gameGUI.buttonShop.visible = true;
			this.gameGUI.icon_trash.visible = true;
			this.gameGUI.buttonChangeGun.visible = true;
			this.gameGUI.buttonHat.visible = true;
			this.gameGUI.buttonFortuna.visible = false;
			if (this.gameGUI.buttonEvent) this.gameGUI.buttonEvent.visible = false;
			if (this.gameGUI.effectEvent) this.gameGUI.effectEvent.visible = false;
			this.gameGUI.btnFire.setEnable(true);
			this.gameGUI.buttonAddCar.enableInput()
		}
	}
	initResize() {
		this.GAME_WIDTH = MainGame.Config.DEFAULT_WIDTH;
		this.GAME_HEIGHT = MainGame.Config.DEFAULT_HEIGHT;
		var gameSize = this.scale.gameSize;
		var width = gameSize.width;
		var height = gameSize.height;
		if (window.innerHeight < MainGame.Config.MAX_HEIGHT) {
			height = window.innerHeight
		}
		this.parent = new Phaser.Structs.Size(width, height);
		this.sizer = new Phaser.Structs.Size(this.GAME_WIDTH, this.GAME_HEIGHT, Phaser.Structs.Size.FIT, this.parent);
		this.parent.setSize(width, height);
		this.sizer.setSize(width, height);
		this.scale.on("resize", this.updateResize, this)
	}
	updateResize() {
		var gameSize = this.scale.gameSize;
		var width = gameSize.width;
		var height = gameSize.height;
		if (window.innerHeight < MainGame.Config.MAX_HEIGHT) {
			height = window.innerHeight
		}
		this.parent.setSize(width, height);
		this.sizer.setSize(width, height);
		this.updateCamera()
	}
	updateCamera() {
		const camera = this.cameras.main;
		var deltaX = Math.ceil(this.parent.width - this.sizer.width) * .5;
		var deltaY = Math.ceil(this.parent.height - this.sizer.height) * .5;
		var sdvigY = 0;
		if (window.innerHeight < MainGame.Config.MAX_HEIGHT) {
			deltaY = Math.ceil(window.innerHeight - this.sizer.height) * .5;
			sdvigY = this.scale.gameSize.height - window.innerHeight
		}
		const scaleX = this.sizer.width / this.GAME_WIDTH;
		const scaleY = this.sizer.height / this.GAME_HEIGHT;
		const zoom = Math.max(scaleX, scaleY);
		const offsetY = deltaY / zoom;
		const offsetX = deltaX / zoom;
		camera.setZoom(zoom);
		camera.centerOn(this.GAME_WIDTH / 2, this.GAME_HEIGHT / 2 + offsetY + sdvigY)
	}
	getCarCoins(vNum) {
		var carInfo = this.getCarInfo(vNum);
		var speed = carInfo.speed;
		var coins = carInfo.coins;
		var timeLoop = 1 / (60 * speed);
		return Math.round(coins / timeLoop)
	}
	initParkings() {
		this.arParking = [];
		this.arParking.push({
			id: 0,
			x: 150,
			y: 150,
			busy: false,
			racing: false,
			obj: null,
			lemming: null,
			btn_return: null,
			type: 0
		});
		this.arParking.push({
			id: 1,
			x: 150,
			y: 150,
			busy: false,
			racing: false,
			obj: null,
			lemming: null,
			btn_return: null,
			type: 0
		});
		this.arParking.push({
			id: 2,
			x: 150,
			y: 150,
			busy: false,
			racing: false,
			obj: null,
			lemming: null,
			btn_return: null,
			type: 0
		});
		this.arParking.push({
			id: 3,
			x: 150,
			y: 150,
			busy: false,
			racing: false,
			obj: null,
			lemming: null,
			btn_return: null,
			type: 0
		});
		this.arParking.push({
			id: 4,
			x: 150,
			y: 150,
			busy: false,
			racing: false,
			obj: null,
			lemming: null,
			btn_return: null,
			type: 0
		});
		this.arParking.push({
			id: 5,
			x: 150,
			y: 150,
			busy: false,
			racing: false,
			obj: null,
			lemming: null,
			btn_return: null,
			type: 0
		});
		this.arParking.push({
			id: 6,
			x: 150,
			y: 150,
			busy: false,
			racing: false,
			obj: null,
			lemming: null,
			btn_return: null,
			type: 0
		});
		this.arParking.push({
			id: 7,
			x: 150,
			y: 150,
			busy: false,
			racing: false,
			obj: null,
			lemming: null,
			btn_return: null,
			type: 0
		});
		this.arParking.push({
			id: 8,
			x: 150,
			y: 150,
			busy: false,
			racing: false,
			obj: null,
			lemming: null,
			btn_return: null,
			type: 0
		});
		this.arParking.push({
			id: 9,
			x: 150,
			y: 150,
			busy: false,
			racing: false,
			obj: null,
			lemming: null,
			btn_return: null,
			type: 0
		});
		this.arParking.push({
			id: 10,
			x: 150,
			y: 150,
			busy: false,
			racing: false,
			obj: null,
			lemming: null,
			btn_return: null,
			type: 0
		});
		this.arParking.push({
			id: 11,
			x: 150,
			y: 150,
			busy: false,
			racing: false,
			obj: null,
			lemming: null,
			btn_return: null,
			type: 0
		});
		this.addParking(this.arParking[0]);
		this.addParking(this.arParking[1]);
		this.addParking(this.arParking[2]);
		this.addParking(this.arParking[3]);
		this.addParking(this.arParking[4]);
		this.addParking(this.arParking[5]);
		this.addParking(this.arParking[6]);
		this.addParking(this.arParking[7]);
		this.addParking(this.arParking[8]);
		this.addParking(this.arParking[9]);
		this.addParking(this.arParking[10]);
		this.addParking(this.arParking[11])
	}
	showSystemMessage(vText) {
		this.gameGUI.showSystemMessage(vText)
	}
	clickBuyShopItem(value) {
		if (this.ALLOW_ADS_CAR && this.num_ads_car == value) {
			if (this.getFreeParking() < 0) {
				this.gameGUI.showSystemMessage(MainGame.GAME_TEXT.no_parking);
				return
			}
			this.showAdsForCar()
		} else {
			this.buyCar(value, true)
		}
	}
	buyFastCar() {
		var typeFastCar = this.getTypeBetterPrice();
		this.buyCar(typeFastCar, false);
		if (this.isGoTutorial && this.tutorialStep < 3) {
			this.tutorialScenario()
		}
	}
	buyCar(vNum, vFromShop) {
		if (this.getFreeParking() < 0) {
			this.gameGUI.showSystemMessage(MainGame.GAME_TEXT.no_parking);
			return
		}
		var priceCar = this.getPriceCar(vNum);
		priceCar = Math.round(priceCar * this.factorDiscount);
		if (this.amount_coins < priceCar) {
			this.gameGUI.showSystemMessage(MainGame.GAME_TEXT.no_money);
			return
		}
		this.addObject({
			lvl: vNum,
			fromShop: vFromShop
		}, true);
		this.amount_coins -= priceCar;
		var text_coins_warm = this.convertNumberFormat(this.amount_coins);
		this.gameGUI.updateCoins(text_coins_warm);
		this.updateShop(text_coins_warm);
		this.updatePriceCar(vNum);
		this.gameGUI.updateFastBuy();
		this.updateShopItem();
		this.updateBoxHave();
		this.saveDeltaCarLevel();
		MainGame.Sfx.play("sound", "buy")
	}
	testGetPrices(vValue) {
		var info;
		var price;
		var price2;
		var needPriceAr = [0, 100, 1500, 4800, 14880, 46130, 143e3, 443300, 1418560, 4539392, 14526054, 46483372, 148746792, 475989737, 1523167159, 4874134911, 15597231715, 49911141488, 159715652763, 511090088843, 1635488284299, 5233562509759, 0xf3b4ed46bfd, 53591680099934, 0x9bf8e9c6e12e, 548778804223328];
		for (var i = 1; i <= vValue; i++) {
			info = this.getCarInfo(i);
			price = this.convertNumberFormat(info.price);
			price2 = this.convertNumberFormat(needPriceAr[i]);
			console.log(i + "\t : " + price + "\t | " + price2)
		}
	}
	testGetCoins() {
		var info;
		for (var i = 1; i <= 10; i++) {
			info = this.getCarCoins(i);
			console.log(i + "\t : " + info)
		}
	}
	getCarInfo(type) {
		var _price = 100;
		if (type > 1) {
			_price = Math.floor(1e3 * Math.pow(2.38, type - 2))
		}
		var _speed = .002 + 14e-5 * type;
		var _coins = Math.pow(2, type) * 18;
		return {
			speed: _speed,
			coins: _coins,
			price: _price
		}
	}
	updateCarPrices() {
		var price = 0;
		for (var i = 0; i < this.MAX_TYPES_CAR; i++) {
			price = this.getCarInfo(i + 1).price;
			for (var j = 0; j < this.arDeltaCarLevel[i]; j++) {
				price = Math.round(price * this.DELTA_PRICE)
			}
			this.arCurrentPricesCar[i] = price
		}
	}
	getPriceCar(vType) {
		return this.arCurrentPricesCar[vType - 1]
	}
	updatePriceCar(vType) {
		var type_car = vType;
		this.arDeltaCarLevel[type_car - 1]++;
		var new_value = this.arCurrentPricesCar[type_car - 1] * this.DELTA_PRICE;
		this.arCurrentPricesCar[type_car - 1] = Math.round(new_value)
	}
	convertNumberFormat(number) {
		var temp = number;
		var tabUnits = ["K", "M", "B", "T", "aa", "bb", "cc", "dd", "ee", "ff", "gg", "hh", "ii", "jj", "kk", "ll", "mm", "nn", "oo", "pp", "qq", "rr", "ss", "tt", "uu", "vv", "ww", "xx", "yy", "zz"];
		var highnumber = false;
		var bignumber = 1e3;
		var tabposition = -1;
		var p_atomepersecond = true;
		var unit;
		if (number >= bignumber) {
			highnumber = true;
			while (number >= bignumber) {
				bignumber *= 1e3;
				tabposition++
			}
			number /= bignumber / 1e3;
			unit = tabUnits[tabposition]
		} else unit = "";
		if (unit == undefined) return temp.toExponential(2);
		var toround = highnumber == true ? p_atomepersecond == true ? 100 : 100 : 10;
		var res = Math.round(number * toround) / toround;
		return [res.toLocaleString().replace(",", ".") + "" + unit]
	}
	initSettingsGame() {
		this.isShopAdded = false;
		this.MAX_TYPES_CAR = 50;
		this.MIN_LVL_UPGRADE = 4;
		this.ALLOW_UPGRADE = 12;
		this.DISTANCE_DRAG = 2e3;
		this.value_offline_earning = 0;
		this.isGoTutorial = false;
		this.tutorialStep = 0;
		this.gameStarted = false;
		this.isDoubleSpeed = false;
		this.isBoostTimer = false;
		this.total_speed = 0;
		this.helicopterBonus = "coins";
		this.stickManAnim = "";
		this.showAfterMerge = false;
		this.isShowHelicopter = false;
		this.countHelicopterFly = 0;
		this.flagHelicopter = true;
		this.isDownOnParking = false;
		this.isDrag = false;
		this.selectedCar = null;
		this.linkToOldParking = null;
		this.DEPTH_text_pilots = .015;
		this.DEPTH_icon_pilots = .016;
		this.DEPTH_racing_car = .017;
		this.DEPTH_platform = .018;
		this.DEPTH_hightlight = .019;
		this.DEPTH_cars = .02;
		this.DEPTH_iconreturn = .021;
		this.DEPTH_effect_unboxing = .022;
		this.DEPTH_GUI = .1;
		this.DEPTH_text_coins = .2;
		this.DEPTH_text_field = .21;
		this.DEPTH_helicopter = .22;
		this.DEPTH_layerMainButtons = .24;
		this.DEPTH_layerLevelBar = .25;
		this.DEPTH_cursorcar = .26;
		this.DEPTH_layerMerge = .3;
		this.DEPTH_layerUnlock = .31;
		this.DEPTH_layerShop = .5;
		this.DEPTH_systemtext = .6;
		this.countDownRebootBonusSpeed = 0;
		this.countDownBonusSpeed = 0;
		this.countDownBonusCoins = 0;
		this.countDownNextFree = 0;
		this.VALUE_SELL = .25;
		this.DELTA_PRICE = 1.15;
		this.OFFLINE_EARNING = .2;
		this.MAX_OFFLINE_EARNING_SEC = 60 * 60 * 48;
		this.MAX_PARKING = 12;
		this.MAX_PILOTS = 10;
		this.value_boost = 5;
		this.FACTOR_TURBO = 2;
		this.ALLOW_ADS_CAR = false;
		this.num_ads_car = 0;
		this.offerFreeUpgrade = 0;
		this.parking_upgrade_id = null;
		this.parking_upgrade_type = 0;
		this.TIME_BOOST = 150;
		this.TIME_COOLDOWN_BOOST = 60 * 5;
		this.TIME_COINS = 60;
		this.TIME_ADD_FREE_BOX = 20;
		this.TIME_ADD_HELICOPTER = 90;
		this.TIME_ADD_ADS_CAR = 120;
		this.TIME_BTN_FIRE_EFFECT = 25;
		this.TIME_HELP_ARM = 2 * 60;
		this.TIME_CHECK_BUFFER = 200;
		this.TIME_NEXT_FREE = 30 * 60;
		this.PANEL_NUMBER_OFFSET = {
			x: 40,
			y: -5
		};
		this.HIGHLIGHTER_OFFSET = {
			x: 0,
			y: -53
		};
		this.CARS_OFFSET = {
			x: 0,
			y: -38
		};
		this.amount_coins = MainGame.amount_coins || 1e3;
		this.exp = MainGame.exp || 0;
		this.nextCarLevel = MainGame.nextCarLevel || 2;
		this.currentLevel = MainGame.currentLevel || 1;
		this.LIMIT_parking = MainGame.LIMIT_parking || 4;
		this.LIMIT_pilots = MainGame.LIMIT_pilots || 2;
		this.levelEarning = MainGame.levelEarning || 1;
		this.levelDiscount = MainGame.levelDiscount || 1;
		this.freeTimeWheel = MainGame.freeTimeWheel || 0;
		MainGame.amount_diamonds = MainGame.amount_diamonds || 0;
		MainGame.selectedGun = MainGame.selectedGun || 1;
		MainGame.selectedHat = MainGame.selectedHat || 0;
		MainGame.arHatsHave = MainGame.arHatsHave || [];
		MainGame.fireLevel = MainGame.fireLevel || 1;
		MainGame.listEvents = MainGame.listEvents || [0, 0, 0, 0, 0];
		this.box_have = [];
		this.arDeltaCarLevel = [];
		this.buffer_boxes = [];
		if (MainGame.box_have) {
			for (var i = 0; i < this.MAX_PARKING; i++) {
				this.box_have[i] = MainGame.box_have[i]
			}
		} else {
			for (var i = 0; i < this.MAX_PARKING; i++) {
				this.box_have[i] = null
			}
		}
		if (MainGame.buffer_boxes) {
			for (var i = 0; i < MainGame.buffer_boxes.length; i++) {
				this.buffer_boxes[i] = MainGame.buffer_boxes[i]
			}
		}
		if (MainGame.arDeltaCarLevel) {
			for (var i = 0; i < this.MAX_TYPES_CAR; i++) {
				this.arDeltaCarLevel[i] = MainGame.arDeltaCarLevel[i]
			}
		} else {
			for (var i = 0; i < this.MAX_TYPES_CAR; i++) {
				this.arDeltaCarLevel[i] = 0
			}
		}
		var kfShopPriv = 1e4;
		this.arLevelEarning = [{
			price: kfShopPriv * 1,
			value: 5
		}, {
			price: kfShopPriv * 100,
			value: 10
		}, {
			price: kfShopPriv * 5e3,
			value: 15
		}, {
			price: kfShopPriv * 25e4,
			value: 30
		}, {
			price: kfShopPriv * 125e5,
			value: 50
		}, {
			price: kfShopPriv * 625e6,
			value: 80
		}, {
			price: kfShopPriv * 3125e7,
			value: 100
		}, {
			price: kfShopPriv * 15625e8,
			value: 150
		}, {
			price: kfShopPriv * 78125e9,
			value: 200
		}, {
			price: kfShopPriv * 390625e10,
			value: 300
		}];
		this.arLevelDiscount = [{
			price: kfShopPriv * 8,
			value: 5
		}, {
			price: kfShopPriv * 16e3,
			value: 10
		}, {
			price: kfShopPriv * 128e4,
			value: 15
		}, {
			price: kfShopPriv * 1024e5,
			value: 20
		}, {
			price: kfShopPriv * 8192e6,
			value: 25
		}, {
			price: kfShopPriv * 65536e7,
			value: 30
		}, {
			price: kfShopPriv * 524288e8,
			value: 35
		}, {
			price: kfShopPriv * 4194304e9,
			value: 40
		}, {
			price: kfShopPriv * 33554432e10,
			value: 45
		}, {
			price: kfShopPriv * 268435456e11,
			value: 50
		}];
		this.factorEarning = 1;
		this.factorDiscount = 1;
		this.exp_max = this.getExpMax(this.currentLevel);
		this.arCurrentPricesCar = [];
		this.time.addEvent({
			delay: 1e3,
			callback: this.updateTimerEverySec,
			callbackScope: this,
			loop: true
		});
		this.time.addEvent({
			delay: this.TIME_CHECK_BUFFER,
			callback: this.checkBuffer,
			callbackScope: this,
			loop: true
		});
		this.timer_freeBox = 0;
		this.timer_helicopter = this.TIME_ADD_HELICOPTER - 30;
		this.timer_carAds = this.TIME_ADD_ADS_CAR - 35;
		this.timer_btn_fire = 0
	}
	updateTimerEverySec() {
		this.timer_freeBox++;
		if (this.timer_freeBox >= this.TIME_ADD_FREE_BOX) {
			this.timeToAddFreeBox();
			this.timer_freeBox = 0
		}
		this.timer_helicopter++;
		if (this.timer_helicopter >= this.TIME_ADD_HELICOPTER) {
			this.timeToHelicopter();
			this.timer_helicopter = 0
		}
		if (this.num_ads_car == 0) {
			this.timer_carAds++;
			if (this.timer_carAds >= this.TIME_ADD_ADS_CAR) {
				this.goAllowAdsCar();
				this.timer_carAds = 0
			}
		}
		this.timer_btn_fire++;
		if (this.timer_btn_fire >= this.TIME_BTN_FIRE_EFFECT) {
			this.gameGUI.showBtnFireEffect();
			this.timer_btn_fire = 0
		}
		if (this.freeTimeWheel < MainGame.maxTimeWheel) {
			if (this.countDownNextFree > 0) {
				this.countDownNextFree--;
				MainGame.cdNextFree = this.countDownNextFree;
				if (this.countDownNextFree == 0) {
					this.freeTimeWheel++;
					MainGame.freeTimeWheel = this.freeTimeWheel;
					if (this.freeTimeWheel < MainGame.maxTimeWheel) {
						this.countDownNextFree = this.TIME_NEXT_FREE
					}
					this.gameGUI.icon_free_fortune.visible = true
				}
				this.gameGUI.updateFortunaWheelWindow(this.countDownNextFree)
			}
		}
		MainGame.amount_coins = this.amount_coins;
		MainGame.saveSaves()
	}
	getCoinsLevelUp(vPlayerLevel) {
		return 1e3 * Math.pow(2, vPlayerLevel)
	}
	getExpMerge(vCarLevel) {
		return 15 * Math.pow(2, vCarLevel)
	}
	getExpMax(vPlayerLevel) {
		return 100 * Math.pow(2, vPlayerLevel)
	}
	saveBoxHave() {
		if (this.isGoTutorial) return;
		MainGame.box_have = [];
		for (var i = 0; i < this.box_have.length; i++) {
			MainGame.box_have.push(this.box_have[i])
		}
		MainGame.saveSaves()
	}
	saveBoxBuffer() {
		MainGame.buffer_boxes = [];
		for (var i = 0; i < this.buffer_boxes.length; i++) {
			MainGame.buffer_boxes.push(this.buffer_boxes[i])
		}
		MainGame.saveSaves()
	}
	saveDeltaCarLevel() {
		if (this.isGoTutorial) return;
		MainGame.arDeltaCarLevel = [];
		for (var i = 0; i < this.arDeltaCarLevel.length; i++) {
			MainGame.arDeltaCarLevel.push(this.arDeltaCarLevel[i])
		}
		MainGame.saveSaves()
	}
	saveGameValues() {
		if (this.isGoTutorial) return;
		MainGame.amount_coins = this.amount_coins;
		MainGame.exp = this.exp;
		MainGame.nextCarLevel = this.nextCarLevel;
		MainGame.currentLevel = this.currentLevel;
		MainGame.LIMIT_parking = this.LIMIT_parking;
		MainGame.LIMIT_pilots = this.LIMIT_pilots;
		MainGame.lastSession = (new Date).getTime();
		MainGame.saveSaves()
	}
	updateBoxHave() {
		if (this.isGoTutorial) return;
		var parking;
		for (var i = 0; i < this.LIMIT_parking; i++) {
			parking = this.arParking[i];
			if (parking.type > 0) {
				this.box_have[i] = {
					id: parking.id,
					t: parking.type,
					r: parking.racing
				}
			} else {
				this.box_have[i] = null
			}
		}
		this.saveBoxHave();
		this.saveGameValues()
	}
	updateParking() {
		var countParking = this.LIMIT_parking;
		var parking = null;
		var arPos = null;
		var posParking = {
			x: 770,
			y: 140
		};
		var offsetX = 70;
		var offsetY = 110;
		var arPos4 = [{
			x: posParking.x - offsetX,
			y: posParking.y + 0 * offsetY + 80
		}, {
			x: posParking.x + offsetX,
			y: posParking.y + 0 * offsetY + 80
		}, {
			x: posParking.x - offsetX,
			y: posParking.y + 1 * offsetY + 80
		}, {
			x: posParking.x + offsetX,
			y: posParking.y + 1 * offsetY + 80
		}];
		var arPos5 = [{
			x: posParking.x - offsetX,
			y: posParking.y + 0 * offsetY + 40
		}, {
			x: posParking.x + offsetX,
			y: posParking.y + 0 * offsetY + 40
		}, {
			x: posParking.x - offsetX,
			y: posParking.y + 1 * offsetY + 40
		}, {
			x: posParking.x + offsetX,
			y: posParking.y + 1 * offsetY + 40
		}, {
			x: posParking.x,
			y: posParking.y + 2 * offsetY + 40
		}];
		var arPos6 = [{
			x: posParking.x - offsetX,
			y: posParking.y + 0 * offsetY + 40
		}, {
			x: posParking.x + offsetX,
			y: posParking.y + 0 * offsetY + 40
		}, {
			x: posParking.x - offsetX,
			y: posParking.y + 1 * offsetY + 40
		}, {
			x: posParking.x + offsetX,
			y: posParking.y + 1 * offsetY + 40
		}, {
			x: posParking.x - offsetX,
			y: posParking.y + 2 * offsetY + 40
		}, {
			x: posParking.x + offsetX,
			y: posParking.y + 2 * offsetY + 40
		}];
		var arPos7 = [{
			x: posParking.x - offsetX,
			y: posParking.y + 0 * offsetY
		}, {
			x: posParking.x + offsetX,
			y: posParking.y + 0 * offsetY
		}, {
			x: posParking.x - offsetX,
			y: posParking.y + 1 * offsetY
		}, {
			x: posParking.x + offsetX,
			y: posParking.y + 1 * offsetY
		}, {
			x: posParking.x - offsetX,
			y: posParking.y + 2 * offsetY
		}, {
			x: posParking.x + offsetX,
			y: posParking.y + 2 * offsetY
		}, {
			x: posParking.x,
			y: posParking.y + 3 * offsetY
		}];
		var arPos8 = [{
			x: posParking.x - offsetX,
			y: posParking.y + 0 * offsetY
		}, {
			x: posParking.x + offsetX,
			y: posParking.y + 0 * offsetY
		}, {
			x: posParking.x - offsetX,
			y: posParking.y + 1 * offsetY
		}, {
			x: posParking.x + offsetX,
			y: posParking.y + 1 * offsetY
		}, {
			x: posParking.x - offsetX,
			y: posParking.y + 2 * offsetY
		}, {
			x: posParking.x + offsetX,
			y: posParking.y + 2 * offsetY
		}, {
			x: posParking.x - offsetX,
			y: posParking.y + 3 * offsetY
		}, {
			x: posParking.x + offsetX,
			y: posParking.y + 3 * offsetY
		}];
		var arPos9 = [{
			x: posParking.x - offsetX * 2,
			y: posParking.y + 0 * offsetY
		}, {
			x: posParking.x,
			y: posParking.y + 0 * offsetY
		}, {
			x: posParking.x + offsetX * 2,
			y: posParking.y + 0 * offsetY
		}, {
			x: posParking.x - offsetX,
			y: posParking.y + 1 * offsetY
		}, {
			x: posParking.x + offsetX,
			y: posParking.y + 1 * offsetY
		}, {
			x: posParking.x - offsetX,
			y: posParking.y + 2 * offsetY
		}, {
			x: posParking.x + offsetX,
			y: posParking.y + 2 * offsetY
		}, {
			x: posParking.x - offsetX,
			y: posParking.y + 3 * offsetY
		}, {
			x: posParking.x + offsetX,
			y: posParking.y + 3 * offsetY
		}];
		var arPos10 = [{
			x: posParking.x - offsetX * 2,
			y: posParking.y + 0 * offsetY
		}, {
			x: posParking.x,
			y: posParking.y + 0 * offsetY
		}, {
			x: posParking.x + offsetX * 2,
			y: posParking.y + 0 * offsetY
		}, {
			x: posParking.x - offsetX * 2,
			y: posParking.y + 1 * offsetY
		}, {
			x: posParking.x,
			y: posParking.y + 1 * offsetY
		}, {
			x: posParking.x + offsetX * 2,
			y: posParking.y + 1 * offsetY
		}, {
			x: posParking.x - offsetX,
			y: posParking.y + 2 * offsetY
		}, {
			x: posParking.x + offsetX,
			y: posParking.y + 2 * offsetY
		}, {
			x: posParking.x - offsetX,
			y: posParking.y + 3 * offsetY
		}, {
			x: posParking.x + offsetX,
			y: posParking.y + 3 * offsetY
		}];
		var arPos11 = [{
			x: posParking.x - offsetX * 2,
			y: posParking.y + 0 * offsetY
		}, {
			x: posParking.x,
			y: posParking.y + 0 * offsetY
		}, {
			x: posParking.x + offsetX * 2,
			y: posParking.y + 0 * offsetY
		}, {
			x: posParking.x - offsetX * 2,
			y: posParking.y + 1 * offsetY
		}, {
			x: posParking.x,
			y: posParking.y + 1 * offsetY
		}, {
			x: posParking.x + offsetX * 2,
			y: posParking.y + 1 * offsetY
		}, {
			x: posParking.x - offsetX * 2,
			y: posParking.y + 2 * offsetY
		}, {
			x: posParking.x,
			y: posParking.y + 2 * offsetY
		}, {
			x: posParking.x + offsetX * 2,
			y: posParking.y + 2 * offsetY
		}, {
			x: posParking.x - offsetX,
			y: posParking.y + 3 * offsetY
		}, {
			x: posParking.x + offsetX,
			y: posParking.y + 3 * offsetY
		}];
		var arPos12 = [{
			x: posParking.x - offsetX * 2,
			y: posParking.y + 0 * offsetY
		}, {
			x: posParking.x,
			y: posParking.y + 0 * offsetY
		}, {
			x: posParking.x + offsetX * 2,
			y: posParking.y + 0 * offsetY
		}, {
			x: posParking.x - offsetX * 2,
			y: posParking.y + 1 * offsetY
		}, {
			x: posParking.x,
			y: posParking.y + 1 * offsetY
		}, {
			x: posParking.x + offsetX * 2,
			y: posParking.y + 1 * offsetY
		}, {
			x: posParking.x - offsetX * 2,
			y: posParking.y + 2 * offsetY
		}, {
			x: posParking.x,
			y: posParking.y + 2 * offsetY
		}, {
			x: posParking.x + offsetX * 2,
			y: posParking.y + 2 * offsetY
		}, {
			x: posParking.x - offsetX * 2,
			y: posParking.y + 3 * offsetY
		}, {
			x: posParking.x,
			y: posParking.y + 3 * offsetY
		}, {
			x: posParking.x + offsetX * 2,
			y: posParking.y + 3 * offsetY
		}];
		switch (countParking) {
			case 4:
				arPos = arPos4;
				break;
			case 5:
				arPos = arPos5;
				break;
			case 6:
				arPos = arPos6;
				break;
			case 7:
				arPos = arPos7;
				break;
			case 8:
				arPos = arPos8;
				break;
			case 9:
				arPos = arPos9;
				break;
			case 10:
				arPos = arPos10;
				break;
			case 11:
				arPos = arPos11;
				break;
			default:
				arPos = arPos12;
				break
		}
		for (var i = 0; i < countParking; i++) {
			parking = this.arParking[i];
			parking.x = arPos[i].x;
			parking.y = arPos[i].y;
			parking.icon_parking.visible = true;
			parking.icon_parking.x = parking.x;
			parking.icon_parking.y = parking.y;
			parking.effect_collect.x = parking.x;
			parking.effect_collect.y = parking.y - 55;
			parking.highlighter.x = parking.x + this.HIGHLIGHTER_OFFSET.x;
			parking.highlighter.y = parking.y + this.HIGHLIGHTER_OFFSET.y;
			parking.icon_panel_number.x = parking.x + this.PANEL_NUMBER_OFFSET.x;
			parking.icon_panel_number.y = parking.y + this.PANEL_NUMBER_OFFSET.y;
			parking.textNumberType.x = parking.x + this.PANEL_NUMBER_OFFSET.x - 3;
			parking.textNumberType.y = parking.y + this.PANEL_NUMBER_OFFSET.y - 3;
			if (parking.obj) {
				parking.obj.x = parking.x + this.CARS_OFFSET.x;
				parking.obj.y = parking.y + this.CARS_OFFSET.y
			}
		}
		this.hideArmHelp()
	}
	timeToAddFreeBox() {
		if (this.isGoTutorial) return;
		if (MainGame.isApiBreakTime) return;
		var free_park_num = this.getFreeParking();
		if (free_park_num >= 0) {
			this.addObject({
				skinBox: true
			}, true);
			this.updateBoxHave()
		}
	}
	timeToHelicopter() {
		if (this.currentLevel < 4) return;
		if (!this.isShowHelicopter && !this.gameGUI.layerBoosterWindow.visible && !this.isBoostTimer) {
			this.showHelicopter()
		}
	}
	activateBoost(vTime) {
		if (this.isBoostTimer) return;
		vTime = vTime || this.TIME_COINS;
		this.isBoostTimer = true;
		this.updateSpeedValue();
		this.countDownBonusCoins = vTime;
		this.gameGUI.updateIndcatorBoostCoins(this.secToHHMMSS(this.countDownBonusCoins));
		this.gameGUI.enableIndcatorBoostCoins(true);
		this.timerBonusCoins = this.time.addEvent({
			delay: 1e3,
			callback: this.updateTimerBonusCoins,
			callbackScope: this,
			loop: true
		});
		MainGame.Sfx.play("sound", "boost")
	}
	updateTimerBonusCoins() {
		this.countDownBonusCoins--;
		this.gameGUI.updateIndcatorBoostCoins(this.secToHHMMSS(this.countDownBonusCoins));
		if (this.countDownBonusCoins == 0) {
			this.deactivateBoost();
			this.timerBonusCoins.remove();
			this.gameGUI.enableIndcatorBoostCoins(false)
		}
		MainGame.cdBonusCoins = this.countDownBonusCoins
	}
	deactivateBoost() {
		this.isBoostTimer = false;
		this.updateSpeedValue()
	}
	increaseLevel(vValue, vShowLater) {
		this.exp += vValue;
		var delta = this.exp_max - this.exp;
		if (this.exp >= this.exp_max) {
			this.exp = -delta;
			this.currentLevel++;
			this.exp_max = this.getExpMax(this.currentLevel);
			this.gameGUI.textLevel.setText(this.currentLevel);
			this.gameGUI.updateLevel(1);
			this.gameGUI.updateLevel(this.exp / this.exp_max, 250);
			if (vShowLater) {
				this.showAfterMerge = true
			} else {
				this.time.delayedCall(500, this.gameGUI.showLevelUpWindow, [], this.gameGUI)
			}
			if (this.LIMIT_parking < 12) this.LIMIT_parking++;
			if (this.LIMIT_pilots < 10) this.LIMIT_pilots++;
			this.updateParking();
			if (this.currentLevel >= 5 && this.freeTimeWheel > 0) {
				this.gameGUI.icon_free_fortune.visible = true;
				this.gameGUI.buttonFortuna.visible = true
			}
		} else {
			this.gameGUI.updateLevel(this.exp / this.exp_max)
		}
	}
	checkNextCar() {
		var countParking = this.LIMIT_parking;
		var parking;
		var progress = 0;
		var type = 0;
		var cost_current = 0;
		var cost_need = Math.pow(2, this.nextCarLevel - 1);
		for (var i = 0; i < countParking; i++) {
			parking = this.arParking[i];
			type = parking.type;
			if (type > 0) {
				cost_current += Math.pow(2, type - 1)
			}
		}
		progress = cost_current / cost_need;
		if (progress > 1) {
			progress = 1
		}
		this.gameGUI.updateProgress(progress)
	}
	secToHHMMSS(vSec) {
		var seconds = parseInt(vSec, 10);
		var hours = Math.floor(seconds / 3600);
		var minutes = Math.floor((seconds - hours * 3600) / 60);
		var seconds = seconds - hours * 3600 - minutes * 60;
		if (hours < 10) hours = "0" + hours;
		if (minutes < 10) minutes = "0" + minutes;
		if (seconds < 10) seconds = "0" + seconds;
		var time = minutes + ":" + seconds;
		return time
	}
	addCoins(vType, vNumCar, vX, vY) {
		var coins = this.getCarInfo(vType).coins;
		coins = Math.floor(coins * this.factorEarning);
		if (this.isBoostTimer) coins *= this.value_boost;
		this.amount_coins += coins;
		var text_coins_warm = this.convertNumberFormat(this.amount_coins);
		this.gameGUI.updateCoins(text_coins_warm);
		this.updateShop(text_coins_warm);
		this.gameGUI.showCoinText(vNumCar, coins, vX, vY)
	}
	updateSpeedValue(isForRewardCoins) {
		var total_speed = 0;
		var countParking = this.LIMIT_parking;
		var speed = 0;
		var coins = 0;
		var carInfo = null;
		for (var i = 0; i < countParking; i++) {
			var parking = this.arParking[i];
			if (parking.busy) {
				carInfo = this.getCarInfo(parking.type);
				speed = carInfo.speed;
				coins = carInfo.coins;
				var timeLoop = 1 / (60 * speed);
				total_speed += Math.round(coins / timeLoop)
			}
		}
		if (isForRewardCoins) return total_speed;
		this.total_speed = total_speed;
		total_speed *= this.factorEarning;
		if (this.isBoostTimer) total_speed *= this.value_boost;
		if (this.isDoubleSpeed) total_speed *= 2;
		var converted_value = this.convertNumberFormat(Math.round(total_speed));
		this.gameGUI.updateSpeedValue(converted_value + "/" + MainGame.GAME_TEXT.sec.toUpperCase());
		return total_speed
	}
	initEffects() {
		this.anims.create({
			key: "effect_connect",
			frames: this.anims.generateFrameNames("ss_main", {
				prefix: "effect_connect1_",
				end: 18,
				zeroPad: 4
			}),
			hideOnComplete: true
		});
		this.anims.create({
			key: "delete_dust",
			frames: this.anims.generateFrameNames("ss_main", {
				prefix: "delete_dust_",
				end: 15,
				zeroPad: 4
			}),
			hideOnComplete: true
		});
		this.anims.create({
			key: "money_collect",
			frames: this.anims.generateFrameNames("ss_main", {
				prefix: "money_collect_",
				end: 11,
				zeroPad: 4
			}),
			hideOnComplete: true
		});
		this.anims.create({
			key: "effect_connect2",
			frames: this.anims.generateFrameNames("ss_main", {
				prefix: "effect_connect2_",
				end: 28,
				zeroPad: 4
			}),
			hideOnComplete: true
		});
		this.anims.create({
			key: "effect_unboxing",
			frames: this.anims.generateFrameNames("ss_main", {
				prefix: "effect_unboxing_",
				end: 8,
				zeroPad: 4
			}),
			hideOnComplete: true
		});
		this.anims.create({
			key: "effect_tutor",
			frames: this.anims.generateFrameNames("ss_main", {
				prefix: "effect_tutor_",
				end: 16,
				zeroPad: 4
			}),
			hideOnComplete: false,
			repeat: -1
		});
		this.anims.create({
			key: "delete_flash",
			frames: this.anims.generateFrameNames("ss_main", {
				prefix: "delete_flash_",
				end: 24,
				zeroPad: 4
			}),
			hideOnComplete: false,
			repeat: -1
		});
		this.anims.create({
			key: "btn_fire_effect",
			frames: this.anims.generateFrameNames("ss_ui", {
				prefix: "btn_fire_effect_",
				end: 13,
				zeroPad: 4
			}),
			hideOnComplete: false
		});
		this.anims.create({
			key: "magic_1",
			frames: this.anims.generateFrameNames("ss_ui", {
				prefix: "magic_1_",
				end: 14,
				zeroPad: 4
			}),
			hideOnComplete: false,
			repeat: -1
		});
		this.anims.create({
			key: "nextcar3",
			frames: this.anims.generateFrameNames("ss_ui", {
				prefix: "nextcar3_",
				end: 7,
				zeroPad: 4
			}),
			hideOnComplete: false,
			repeat: -1
		});
		this.anims.create({
			key: "propeller1",
			frames: this.anims.generateFrameNames("ss_ui", {
				prefix: "propeller1_",
				end: 3,
				zeroPad: 4
			}),
			hideOnComplete: false,
			repeat: -1
		});
		this.anims.create({
			key: "booster_halloween",
			frames: this.anims.generateFrameNames("ss_ui", {
				prefix: "booster_halloween_",
				end: 15,
				zeroPad: 4
			}),
			hideOnComplete: false,
			repeat: -1
		});
		this.anims.create({
			key: "effect_event",
			frames: this.anims.generateFrameNames("ss_ui", {
				prefix: "effect_event_",
				end: 39,
				zeroPad: 4
			}),
			hideOnComplete: false,
			repeat: -1
		})
	}
	update() {
		var pointer = this.input.activePointer;
		var pos = this.getInputPosition(pointer);
		if (this.gameStarted) {
			if (this.isDrag) {
				this.cursor_car.x = pos.x;
				this.cursor_car.y = pos.y
			}
			if (MainGame.isDebug && MainGame.showDebugCircle) {
				this.clearDebugCicle()
			}
			for (var i = 0; i < this.LIMIT_parking; i++) {
				this.updateLemming(this.arParking[i])
			}
			this.gameGUI.updateHelicopter();
			if (!this.arm_help.visible) {
				this.timerCheckHelp++;
				if (this.timerCheckHelp > 120) {
					this.updateArmHelp();
					this.timerCheckHelp = 0
				}
			}
		}
		if (this.isShopAdded) this.updateScrollMap()
	}
	updateLemming(vCar) {
		var typeCar = vCar.type;
		if (typeCar <= 0 || !vCar.busy) return;
		vCar.lemming.progress += vCar.lemming.speed;
		if (vCar.lemming.progress > 1) {
			vCar.lemming.progress = vCar.lemming.progress - 1;
			vCar.effect_collect.visible = true;
			vCar.effect_collect.play("money_collect");
			this.addCoins(typeCar, vCar.id, vCar.x, vCar.y)
		}
		if (MainGame.isDebug && MainGame.showDebugCircle) {
			this.updateDebugCircle(vCar.lemming.circle, vCar.x, vCar.y, vCar.lemming.progress)
		}
	}
	actionChangeParking(toParking, fromParking) {
		if (fromParking.obj == null) return;
		fromParking.obj.x = toParking.x + this.CARS_OFFSET.x;
		fromParking.obj.y = toParking.y + this.CARS_OFFSET.y;
		fromParking.obj.alpha = 1;
		if (fromParking.racing) {
			fromParking.obj.alpha = .5
		}
		toParking.busy = true;
		toParking.obj = fromParking.obj;
		toParking.type = fromParking.type;
		toParking.racing = fromParking.racing;
		toParking.icon_panel_number.visible = true;
		toParking.textNumberType.visible = true;
		this.setSpriteText(toParking.textNumberType, fromParking.type);
		var save_lemming = toParking.lemming;
		toParking.lemming = fromParking.lemming;
		fromParking.lemming = save_lemming;
		if (toParking.id != fromParking.id) {
			fromParking.type = 0;
			fromParking.busy = false;
			fromParking.racing = false;
			fromParking.obj = null;
			fromParking.icon_panel_number.visible = false;
			fromParking.textNumberType.visible = false
		}
		this.updateSpeedValue()
	}
	selectUnlockedGun() {
		MainGame.selectedGun = this.nextCarLevel - 1;
		this.updateSpineMan()
	}
	actionMerge(toParking, fromParking, vType) {
		var currentType = toParking.type;
		var nextType = currentType + 1;
		var exp = this.getExpMerge(currentType);
		this.increaseLevel(exp, this.nextCarLevel == nextType);
		if (this.nextCarLevel == nextType) {
			if (MainGame.isAPI) MainGame.API_POKI.happyTime(.5);
			MainGame.api_google("MaxLevelCar", this.nextCarLevel);
			this.gameGUI.showMergeAnimation(this.nextCarLevel);
			this.nextCarLevel++;
			this.gameGUI.textLevelNextCar.setText(this.nextCarLevel);
			if (this.nextCarLevel > this.MAX_TYPES_CAR) {
				this.gameGUI.layerProgressCar.visible = false
			}
			this.gameGUI.updateFastBuy();
			if (this.nextCarLevel == 6) {
				this.timer_carAds = this.TIME_ADD_ADS_CAR;
				this.num_ads_car = 0
			}
			this.updateAdsCar()
		} else {
			if (MainGame.debug_isFreeUpgrade) {
				this.parking_upgrade_id = toParking.id;
				this.parking_upgrade_type = nextType + 2;
				this.gameGUI.showUpgradeWindow(nextType);
				this.offerFreeUpgrade = 0
			} else {
				if (nextType < this.nextCarLevel - this.MIN_LVL_UPGRADE) {
					this.offerFreeUpgrade++;
					if (this.offerFreeUpgrade >= this.ALLOW_UPGRADE) {
						this.parking_upgrade_id = toParking.id;
						this.parking_upgrade_type = nextType + 2;
						this.gameGUI.showUpgradeWindow(nextType);
						this.offerFreeUpgrade = 0
					}
				}
			}
		}
		if (toParking.obj) toParking.obj.setFrame("icon_f" + nextType + "_0000");
		toParking.type = nextType;
		if (fromParking.obj) fromParking.obj.destroy();
		fromParking.busy = false;
		fromParking.obj = null;
		fromParking.type = 0;
		fromParking.icon_panel_number.visible = false;
		fromParking.textNumberType.visible = false;
		if (fromParking.racing) {
			fromParking.lemming.visible = false;
			fromParking.racing = false
		}
		if (toParking.racing) {
			toParking.lemming.visible = false;
			toParking.racing = false;
			toParking.obj.alpha = 1
		}
		fromParking.lemming.progress = 0;
		toParking.lemming.progress = 0;
		this.setSpriteText(toParking.textNumberType, nextType);
		if (toParking.obj) this.showAnimationMerge(toParking.obj, nextType);
		this.updateSpeedValue();
		this.checkNextCar();
		MainGame.Sfx.play("sound", "merge")
	}
	actionSwap(toParking, fromParking, vX, vY) {
		var swapType = toParking.type;
		var swapRacing = toParking.racing;
		this.setSpriteText(toParking.textNumberType, fromParking.type);
		this.setSpriteText(fromParking.textNumberType, toParking.type);
		var save_type = toParking.type;
		toParking.type = fromParking.type;
		fromParking.type = save_type;
		var save_lemming = toParking.lemming;
		toParking.lemming = fromParking.lemming;
		fromParking.lemming = save_lemming;
		var save_racing = toParking.racing;
		toParking.racing = fromParking.racing;
		fromParking.racing = save_racing;
		fromParking.busy = true;
		toParking.busy = true;
		if (fromParking.obj) {
			fromParking.obj.alpha = 1;
			fromParking.obj.setFrame("icon_f" + fromParking.type + "_0000");
			if (fromParking.racing) {
				fromParking.obj.alpha = .5
			} else {
				fromParking.obj.alpha = 1
			}
		}
		if (toParking.obj) {
			toParking.obj.setFrame("icon_f" + toParking.type + "_0000");
			if (toParking.racing) {
				toParking.obj.alpha = .5
			} else {
				toParking.obj.alpha = 1
			}
		}
		if (toParking.obj && fromParking.obj) this.showAnimationSwap(toParking.obj, fromParking.obj, {
			x: vX,
			y: vY
		});
		this.updateSpeedValue()
	}
	actionTrash(selectedParking) {
		var priceCar = this.getPriceCar(selectedParking.type);
		this.amount_coins += Math.round(priceCar * this.VALUE_SELL);
		var text_coins_warm = this.convertNumberFormat(this.amount_coins);
		this.gameGUI.updateCoins(text_coins_warm);
		this.updateShop(text_coins_warm);
		selectedParking.obj.destroy();
		selectedParking.busy = false;
		selectedParking.racing = false;
		selectedParking.obj = null;
		selectedParking.type = 0;
		selectedParking.icon_panel_number.visible = false;
		selectedParking.textNumberType.visible = false;
		this.updateSpeedValue();
		this.checkNextCar();
		MainGame.Sfx.play("sound", "deleted");
		selectedParking.lemming.progress = 0
	}
	onInputUp(pointer) {
		this.onInputUpShop(pointer);
		if (!this.gameGUI.buttonEnabled) return;
		this.hideArmHelp();
		var action_detected = false;
		var pos = this.getInputPosition(pointer);
		var parking = null;
		var dist = 0;
		if (this.isDrag) {
			this.cursor_car.visible = false;
			var isPlacedToParking = false;
			var isPlacedToTrack = false;
			var isTrashTime = false;
			for (var i = 0; i < this.LIMIT_parking; i++) {
				parking = this.arParking[i];
				dist = MyMath.distanceTwoPoints(pos.x, parking.x, pos.y, parking.y - 20);
				if (dist < this.DISTANCE_DRAG) {
					if (parking.obj && parking.busy && this.selectedCar.id != parking.id) {
						if (this.selectedCar.type == parking.type && parking.type < this.MAX_TYPES_CAR) {
							this.actionMerge(parking, this.arParking[this.selectedCar.id]);
							this.openBox(parking, false);
							action_detected = true;
							if (this.isGoTutorial && this.tutorialStep == 3) {
								this.tutorialScenario()
							}
						} else {
							this.openBox(parking, false);
							this.actionSwap(parking, this.arParking[this.selectedCar.id], pos.x, pos.y);
							action_detected = true
						}
						isPlacedToParking = true
					} else {
						var isAllowChange = true;
						if (this.isGoTutorial) {
							isAllowChange = false
						}
						if (isAllowChange) {
							this.actionChangeParking(parking, this.arParking[this.selectedCar.id]);
							isPlacedToParking = true;
							action_detected = true
						}
					}
				}
				if (action_detected) break
			}
			if (!isPlacedToParking) {
				dist = MyMath.distanceTwoPoints(pos.x, this.icon_trash.x, pos.y, this.icon_trash.y);
				if (dist < 2e3 && !this.isGoTutorial) {
					isTrashTime = true;
					this.actionTrash(this.arParking[this.selectedCar.id]);
					var effect = this.add.sprite(this.icon_trash.x, this.icon_trash.y, "ss_main");
					effect.play("delete_dust");
					action_detected = true
				}
				var oldParking = this.arParking[this.selectedCar.id];
				if (oldParking) {
					dist = MyMath.distanceTwoPoints(pos.x, this.stick_man.x, pos.y, 350);
					if (dist < 3e4) {
						MainGame.selectedGun = oldParking.type;
						this.updateSpineMan();
						MainGame.saveSaves();
						MainGame.Sfx.play("sound", "give_gun")
					}
				}
				if (!isTrashTime && !isPlacedToTrack) {
					oldParking.busy = true;
					oldParking.obj = this.selectedCar.obj;
					oldParking.type = this.selectedCar.type;
					if (oldParking.racing) {
						this.cursor_car.visible = false;
						this.linkToOldParking = null
					} else {
						this.cursor_car.visible = true;
						this.linkToOldParking = oldParking;
						if (oldParking.obj) {
							var posX = oldParking.obj.x;
							var posY = oldParking.obj.y;
							this.tweens.add({
								targets: this.cursor_car,
								x: posX,
								y: posY,
								ease: Phaser.Math.Easing.Cubic.Out,
								duration: 100,
								onComplete: this.finishCursorTween
							})
						} else {
							this.finishCursorTween()
						}
					}
				}
			}
			this.selectedCar = null;
			this.isDrag = false;
			this.hideHighlight()
		}
		this.isDownOnParking = false;
		this.gameGUI.delete_flash.visible = false;
		if (action_detected) {
			this.updateBoxHave()
		}
	}
	finishCursorTween() {
		MainGame.state.cursor_car.visible = false;
		if (MainGame.state.linkToOldParking && MainGame.state.linkToOldParking.obj) MainGame.state.linkToOldParking.obj.alpha = 1;
		MainGame.state.linkToOldParking = null
	}
	showAnimationMerge(vObj, vType) {
		var oldType = vType - 1;
		var posX = vObj.x;
		var posY = vObj.y;
		this.cursor_car.visible = true;
		this.cursor_car.setFrame("icon_f" + oldType + "_0000");
		vObj.setFrame("icon_f" + oldType + "_0000");
		this.cursor_car.x = posX;
		this.cursor_car.y = posY;
		vObj.x = posX;
		vObj.y = posY;
		this.tweens.add({
			targets: this.cursor_car,
			x: posX + 50,
			ease: Phaser.Math.Easing.Cubic.Out,
			duration: 100,
			yoyo: true
		});
		this.tweens.add({
			targets: vObj,
			x: posX - 50,
			ease: Phaser.Math.Easing.Cubic.Out,
			duration: 100,
			yoyo: true
		});
		this.time.delayedCall(200, this.onMergePart, [vObj, vType], this);
		var effect = this.add.sprite(vObj.x - 5, vObj.y + 2, "ss_main");
		effect.setDepth(this.DEPTH_effect_unboxing);
		effect.play("effect_connect")
	}
	onMergePart(vObj, vType) {
		vObj.setFrame("icon_f" + vType + "_0000");
		this.cursor_car.setFrame("icon_f" + vType + "_0000");
		if (this.isDrag) return;
		this.cursor_car.visible = false;
		vObj.setScale(this.getScaleCar(1));
		this.tweens.add({
			targets: vObj,
			scale: this.getScaleCar(1.4),
			ease: Phaser.Math.Easing.Linear,
			duration: 100,
			yoyo: true
		})
	}
	showAnimationSwap(obj1, obj2, vPosition) {
		var to_x1 = obj1.x;
		var to_y1 = obj1.y;
		var to_x2 = obj2.x;
		var to_y2 = obj2.y;
		obj2.x = obj1.x;
		obj2.y = obj1.y;
		obj1.x = vPosition.x;
		obj1.y = vPosition.y;
		this.tweens.add({
			targets: obj1,
			x: to_x1,
			y: to_y1,
			ease: Phaser.Math.Easing.Linear,
			duration: 200
		});
		this.tweens.add({
			targets: obj2,
			x: to_x2,
			y: to_y2,
			ease: Phaser.Math.Easing.Linear,
			duration: 200
		});
		obj1.setScale(this.getScaleCar(1));
		obj2.setScale(this.getScaleCar(1));
		this.tweens.add({
			targets: obj1,
			scale: this.getScaleCar(1.4),
			ease: Phaser.Math.Easing.Linear,
			duration: 100,
			yoyo: true
		});
		this.tweens.add({
			targets: obj2,
			scale: this.getScaleCar(1.4),
			ease: Phaser.Math.Easing.Linear,
			duration: 100,
			yoyo: true
		})
	}
	onBackPart(vObj) {
		vObj.alpha = 1;
		this.cursor_car.visible = false
	}
	showHighlight() {
		var parking = null;
		var typeSelected = this.selectedCar.type;
		var idSelected = this.selectedCar.id;
		for (var i = 0; i < this.LIMIT_parking; i++) {
			parking = this.arParking[i];
			if (parking.id != idSelected) {
				if (typeSelected == parking.type && parking.type < this.MAX_TYPES_CAR) {
					parking.highlighter.visible = true
				}
			}
		}
	}
	hideHighlight() {
		var parking = null;
		for (var i = 0; i < this.LIMIT_parking; i++) {
			parking = this.arParking[i];
			parking.highlighter.visible = false
		}
	}
	getInputPosition(pointer) {
		const deltaX = Math.ceil(this.parent.width - this.sizer.width) * .5;
		const deltaY = Math.ceil(this.parent.height - this.sizer.height) * .5;
		const scaleX = this.sizer.width / this.GAME_WIDTH;
		const scaleY = this.sizer.height / this.GAME_HEIGHT;
		const zoom = Math.max(scaleX, scaleY);
		const offset = deltaY / zoom;
		var pX = (pointer.x - deltaX) / zoom;
		var pY = (pointer.y - deltaY) / zoom + offset;
		return {
			x: pX,
			y: pY
		}
	}
	onInputMove(pointer) {
		this.onInputMoveShop(pointer);
		if (!this.gameGUI.buttonEnabled) return;
		if (this.isDownOnParking) {
			this.isDrag = true;
			var parking = this.arParking[this.selectedCar.id];
			if (parking.obj && pointer.distance > 3) {
				this.cursor_car.setFrame(parking.obj.frame.name);
				this.cursor_car.visible = true;
				if (!this.isGoTutorial) {
					this.gameGUI.delete_flash.visible = true
				}
				parking.obj.alpha = .5;
				parking.busy = false;
				this.isDownOnParking = false;
				this.showHighlight();
				parking.obj.setScale(this.getScaleCar(1));
				this.tweens.killTweensOf(parking.obj);
				parking.obj.x = parking.x + this.CARS_OFFSET.x;
				parking.obj.y = parking.y + this.CARS_OFFSET.y
			}
		}
	}
	onInputDown(pointer) {
		this.onInputDownShop(pointer);
		if (!this.gameGUI.buttonEnabled) return;
		if (this.isGoTutorial && this.tutorialStep < 3) return;
		this.hideArmHelp();
		var pos = this.getInputPosition(pointer);
		var parking = null;
		var dist = 0;
		for (var i = 0; i < this.LIMIT_parking; i++) {
			parking = this.arParking[i];
			dist = MyMath.distanceTwoPoints(pos.x, parking.x, pos.y, parking.y - 20);
			if (this.isGoTutorial && this.tutorialStep == 3 && parking.id == 0) {
				continue
			}
			if (dist < this.DISTANCE_DRAG && parking.busy) {
				this.isDownOnParking = true;
				this.selectedCar = {
					id: parking.id,
					obj: parking.obj,
					type: parking.type,
					racing: parking.racing
				};
				if (parking.obj && parking.obj.count_box_tween > 0) {
					this.openBox(parking, true)
				}
				break
			}
		}
	}
	openBox(vParking, vIsAnimScale) {
		var vObj = vParking.obj;
		if (vObj == null) return;
		if (this.isGoTutorial && this.tutorialStep == 4) {
			this.tutorialScenario()
		}
		if (vObj.timedEvent) vObj.timedEvent.remove();
		vObj.count_box_tween = 0;
		vObj.setFrame(vObj.car_frame);
		this.tweens.killTweensOf(vObj);
		vObj.angle = 0;
		vObj.x = vParking.x + this.CARS_OFFSET.x;
		vObj.y = vParking.y + this.CARS_OFFSET.y;
		vParking.icon_panel_number.visible = true;
		vParking.textNumberType.visible = true;
		if (vIsAnimScale) {
			var effect = this.add.sprite(vObj.x, vObj.y, "ss_main");
			effect.play("effect_unboxing");
			effect.setDepth(this.DEPTH_effect_unboxing);
			vObj.setScale(this.getScaleCar(.3));
			vObj.setAlpha(.5);
			this.tweens.add({
				targets: vObj,
				scale: this.getScaleCar(1),
				ease: Phaser.Math.Easing.Back.Out,
				duration: 200
			});
			this.tweens.add({
				targets: vObj,
				alpha: 1,
				ease: Phaser.Math.Easing.Linear,
				duration: 150
			});
			MainGame.Sfx.play("sound", "open_box")
		}
	}
	goShake(vParking) {
		var vObj = vParking.obj;
		if (vObj) {
			vObj.count_box_tween--;
			if (vObj.count_box_tween <= 0) {
				this.openBox(vParking, true)
			} else {
				this.tweens.add({
					targets: vObj,
					angle: -10,
					ease: Phaser.Math.Easing.Sine.InOut,
					duration: 150,
					repeat: 1,
					yoyo: true
				})
			}
		}
	}
	shakeBox(vParking) {
		var vObj = vParking.obj;
		vObj.count_box_tween = 5;
		if (this.isGoTutorial) return;
		vObj.timedEvent = this.time.addEvent({
			args: [vParking],
			delay: 1500,
			callback: this.goShake,
			callbackScope: this,
			repeat: vObj.count_box_tween
		})
	}
	getScaleCar(value, bool) {
		if (bool) {
			var atlas_scale = 2;
			var scale = value / atlas_scale;
			return Math.round(scale * 100) / 100
		} else {
			return value
		}
	}
	addBoxToBuffer(vTypeCar) {
		this.buffer_boxes.push({
			type: vTypeCar
		})
	}
	checkBuffer() {
		if (this.buffer_boxes.length > 0) {
			var free_park_num = this.getFreeParking();
			if (free_park_num >= 0) {
				var obj = this.buffer_boxes.shift();
				this.addObject({
					lvl: obj.type,
					skinBox: true
				});
				this.updateBoxHave();
				this.saveBoxBuffer()
			}
		}
	}
	addObject(data, vIsSound) {
		data = data || {};
		var num = data.lvl || this.getTypeRandomBox();
		var free_park_num = data.parkingId || this.getFreeParking();
		data.alreadyRacing = false || data.alreadyRacing;
		if (free_park_num >= 0) {
			var park_place = this.arParking[free_park_num];
			park_place.busy = true;
			var car = this.add.image(park_place.x + this.CARS_OFFSET.x, park_place.y + this.CARS_OFFSET.y, "ss_main", "icon_f" + num + "_0000");
			car.setDepth(this.DEPTH_cars);
			car.car_frame = "icon_f" + num + "_0000";
			park_place.icon_panel_number.visible = true;
			park_place.textNumberType.visible = true;
			this.setSpriteText(park_place.textNumberType, num);
			car.count_box_tween = 0;
			park_place.obj = car;
			park_place.type = num;
			park_place.lemming.progress = 0;
			if (!data.alreadyRacing && (data.parkingId == null || data.skinBox)) {
				if (data.skinBox || data.fromShop) {
					if (data.fromShop) {
						car.setFrame("box2_0000")
					} else {
						car.setFrame("box1_0000")
					}
					car.x += 5;
					car.y += 10;
					this.shakeBox(park_place);
					park_place.icon_panel_number.visible = false;
					park_place.textNumberType.visible = false;
					if (!data.fromShop) MainGame.Sfx.play("sound", "show_box")
				}
				car.setScale(this.getScaleCar(.3));
				car.setAlpha(.5);
				this.tweens.add({
					targets: car,
					scale: this.getScaleCar(1),
					ease: Phaser.Math.Easing.Back.Out,
					duration: 200
				});
				this.tweens.add({
					targets: car,
					alpha: 1,
					ease: Phaser.Math.Easing.Linear,
					duration: 150
				})
			}
		} else {
			this.gameGUI.showSystemMessage(MainGame.GAME_TEXT.no_parking)
		}
		this.checkNextCar();
		this.updateSpeedCars(this.isDoubleSpeed)
	}
	getTypeFastCar() {
		var vLvl = this.nextCarLevel - 1;
		switch (vLvl) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
				return 1;
				break;
			case 6:
				return 2;
				break;
			case 7:
				return 3;
				break;
			case 8:
				return 3;
				break;
			case 9:
				return 4;
				break;
			case 10:
				return 4;
				break;
			case 11:
				return 5;
				break;
			default:
				return vLvl - 7;
				break
		}
	}
	getTypeBetterPrice() {
		var vLvl = this.nextCarLevel - 1;
		switch (vLvl) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
				return 1;
				break;
			case 6:
			case 7:
			case 8:
				var price1 = this.getPriceCar(vLvl - 5);
				var price2 = this.getPriceCar(vLvl - 4);
				var type = vLvl - 5;
				if (price1 > price2 * .5) type = vLvl - 4;
				return type;
				break;
			default:
				var price1 = this.getPriceCar(vLvl - 6);
				var price2 = this.getPriceCar(vLvl - 5);
				var price3 = this.getPriceCar(vLvl - 4);
				var type = vLvl - 6;
				if (price1 > price2 * .5) type = vLvl - 5;
				if (price2 > price3 * .5) type = vLvl - 4;
				return type;
				break
		}
	}
	getTypeRandomBox() {
		var vLvl = this.getTypeFastCar() - 1;
		if (vLvl < 1) vLvl = 1;
		return vLvl
	}
	getFreeParking() {
		var placeNum = -1;
		for (var i = 0; i < this.LIMIT_parking; i++) {
			if (this.selectedCar) {
				if (this.selectedCar.id == i) {
					continue
				}
			}
			if (!this.arParking[i].busy) {
				placeNum = i;
				break
			}
		}
		return placeNum
	}
	setSpriteText(vLayer, vNum) {
		vLayer.removeAll(true);
		var stringNum = vNum.toString();
		var arrayOfNum = stringNum.split("");
		var length = 0;
		var symb = null;
		var symsAr = [];
		for (var n in arrayOfNum) {
			symb = this.add.image(length, 0, "ss_main", "num_" + arrayOfNum[n] + "_0000");
			symb.setScale(.72);
			symb.setOrigin(0, .5);
			vLayer.add(symb);
			symsAr.push(symb);
			length += symb.displayWidth - 2
		}
		var offsetX = 0;
		var totalLength = Math.floor(length * .5);
		for (var s in symsAr) {
			symsAr[s].x -= totalLength
		}
	}
	addDebugCircle() {
		var obj = this.add.graphics();
		obj.setDepth(this.DEPTH_GUI);
		return obj
	}
	updateDebugCircle(obj, vX, vY, progress) {
		progress *= 100;
		this.debugCircles.beginPath();
		this.debugCircles.arc(vX, vY + 25, 12, Phaser.Math.DegToRad(270.01), Phaser.Math.DegToRad((270 + progress * 3.6) % 360), false);
		this.debugCircles.strokePath()
	}
	clearDebugCicle() {
		this.debugCircles.clear();
		this.debugCircles.lineStyle(6, 3407616)
	}
	addParking(vData) {
		var icon_parking = this.add.image(vData.x, vData.y, "ss_main", "icon_parking_0000");
		var highlighter = this.add.image(vData.x + this.HIGHLIGHTER_OFFSET.x, vData.y + this.HIGHLIGHTER_OFFSET.y, "ss_main", "highlighted_car_0000");
		var icon_panel_number = this.add.image(vData.x, vData.y, "ss_main", "panel_number_0000");
		var effect_collect = this.add.sprite(vData.x, vData.y, "ss_main");
		effect_collect.play("money_collect");
		icon_parking.setDepth(this.DEPTH_platform);
		highlighter.setDepth(this.DEPTH_hightlight);
		effect_collect.setDepth(this.DEPTH_iconreturn);
		icon_panel_number.setDepth(this.DEPTH_iconreturn);
		var textNumberType = this.add.container();
		textNumberType.setDepth(this.DEPTH_iconreturn);
		var lemming = {
			progress: 0,
			speed: 0
		};
		if (MainGame.isDebug && MainGame.showDebugCircle) {
			this.debugCircles = this.addDebugCircle()
		}
		icon_parking.visible = false;
		highlighter.visible = false;
		icon_panel_number.visible = false;
		textNumberType.visible = false;
		effect_collect.visible = false;
		vData.icon_parking = icon_parking;
		vData.highlighter = highlighter;
		vData.icon_panel_number = icon_panel_number;
		vData.textNumberType = textNumberType;
		vData.effect_collect = effect_collect;
		vData.lemming = lemming
	}
	updateTimerBonusSpeed() {
		this.countDownBonusSpeed--;
		this.gameGUI.updateIndcatorBoostSpeed(this.secToHHMMSS(this.countDownBonusSpeed));
		if (this.countDownBonusSpeed == 0) {
			this.activateTurbo(false)
		} else {
			this.updateIconFactorTurbo()
		}
		MainGame.cdBonusSpeed = this.countDownBonusSpeed;
		this.gameGUI.updateTurboBar(true)
	}
	updateIconFactorTurbo() {
		var update_factor = 2;
		if (this.countDownBonusSpeed > this.TIME_BOOST * 6) {
			update_factor = 3
		}
		if (this.FACTOR_TURBO != update_factor) {
			this.FACTOR_TURBO = update_factor;
			this.updateSpeedCars(true);
			this.gameGUI.textTurboFactor.setText("X" + this.FACTOR_TURBO)
		}
		if (this.countDownBonusSpeed > this.TIME_BOOST * 11) {
			this.gameGUI.buttonActivateTurbo.setEnable(false)
		} else {
			this.gameGUI.buttonActivateTurbo.setEnable(true)
		}
	}
	isTurboMax() {
		return this.countDownBonusSpeed > this.TIME_BOOST * 11
	}
	updateSpeedCars(bool) {
		this.isDoubleSpeed = bool || false;
		var countParking = this.LIMIT_parking;
		var parking;
		var speed;
		var prev_progress;
		for (var i = 0; i < countParking; i++) {
			parking = this.arParking[i];
			if (parking.busy) {
				var speed = this.getCarInfo(parking.type).speed;
				if (this.isDoubleSpeed) {
					parking.lemming.speed = speed * this.FACTOR_TURBO
				} else {
					parking.lemming.speed = speed
				}
			}
		}
		this.updateSpeedValue()
	}
	activateTurbo(bool, vTime, fromLoad) {
		vTime = vTime || this.TIME_BOOST;
		if (!fromLoad && bool && this.countDownBonusSpeed > 0) {
			this.countDownBonusSpeed += vTime;
			if (this.countDownBonusSpeed > this.TIME_BOOST * 12) {
				this.countDownBonusSpeed = this.TIME_BOOST * 12
			}
			this.gameGUI.updateIndcatorBoostSpeed(this.secToHHMMSS(this.countDownBonusSpeed));
			this.gameGUI.updateTurboBar();
			return
		}
		if (bool) {
			this.countDownBonusSpeed = vTime;
			this.gameGUI.updateIndcatorBoostSpeed(this.secToHHMMSS(this.countDownBonusSpeed));
			this.gameGUI.updateTurboBar();
			this.gameGUI.enableIndcatorBoostSpeed(true);
			this.timerBonusSpeed = this.time.addEvent({
				delay: 1e3,
				callback: this.updateTimerBonusSpeed,
				callbackScope: this,
				loop: true
			});
			this.updateIconFactorTurbo();
			MainGame.Sfx.play("sound", "boost")
		} else {
			this.gameGUI.enableIndcatorBoostSpeed(false);
			if (this.timerBonusSpeed) this.timerBonusSpeed.remove()
		}
		this.updateSpeedCars(bool)
	}
	initInputScrolling() {
		this.dragging = false;
		this.fling_enabled = true;
		this.isReadingMode = false;
		this.readingNode = -1;
		this.current_pos = {
			x: 0,
			y: 0
		};
		this.pressed_pos = {
			x: 0,
			y: 0
		};
		this.released_pos = {
			x: 0,
			y: 0
		};
		this.fling = {
			x: 0,
			y: 0
		};
		this.contentMaxY = this.contentHeight;
		this.timeConstant = 325
	}
	onInputDownShop(pointer) {
		if (!this.isShopAdded) return;
		if (!this.layerShop.visible) return;
		if (this.shopTabSelected != 1) return;
		var pos = this.getInputPosition(pointer);
		var offsetX = 50;
		if (pos.y < 80) return;
		if (pos.x > 710 + offsetX || pos.x < 260 + offsetX) return;
		this.dragging = true;
		this.pressed_pos.y = pos.y;
		this.pressed_time = Date.now();
		this.fling.y = 0
	}
	onInputUpShop(pointer) {
		if (!this.isShopAdded) return;
		if (!this.layerShop.visible) return;
		if (this.shopTabSelected != 1) return;
		var pos = this.getInputPosition(pointer);
		if (!this.dragging) return;
		this.dragging = false;
		this.current_pos.y = this.limit(this.current_pos.y + this.pressed_pos.y - pos.y);
		if (this.fling_enabled) {
			this.released_pos.y = pos.y;
			var delta_time = Date.now() - this.pressed_time;
			var distance = this.released_pos.y - this.pressed_pos.y;
			var delta = distance * Math.exp(-delta_time / this.timeConstant) * .2;
			if (Math.abs(delta) >= 30) this.fling.y = delta
		}
	}
	limit(posY) {
		posY = Math.min(posY, this.contentMaxY);
		posY = Math.max(posY, 0);
		return posY
	}
	onInputMoveShop(pointer) {
		if (!this.isShopAdded) return;
		if (!this.layerShop.visible) return;
		if (this.shopTabSelected != 1) return;
		var pos = this.getInputPosition(pointer);
		if (this.dragging) {
			var posY = this.current_pos.y + this.pressed_pos.y - pos.y;
			this.updatePositions(this.limit(posY))
		}
	}
	updatePositions(posY, isSkipUpdateSlider) {
		if (!isSkipUpdateSlider) {
			var percent = posY / this.contentMaxY * 100;
			this.slider.setSliderByValueForce(percent, 0)
		}
		this.layerShopContent.y = -posY;
		var itemIndex = Math.floor(posY / 140);
		if (this.arShopCars.length <= 0) return;
		var item;
		for (var i = 0; i < this.MAX_TYPES_CAR; i++) {
			item = this.arShopCars[i].item;
			if (item) {
				if (i < itemIndex || i > itemIndex + 6) {
					item.visible = false
				} else {
					item.visible = true
				}
			}
		}
	}
	getBarPosition(vPositionContent) {
		return Math.abs(vPositionContent / this.contentMaxY * 100)
	}
	updateScrollMap() {
		if (!this.dragging && this.fling_enabled && Math.abs(this.fling.y) > 0) {
			var posY = this.current_pos.y - this.fling.y;
			this.current_pos.y = this.limit(posY);
			this.updatePositions(this.current_pos.y);
			this.fling.y = MyMath.lerp(this.fling.y, 0, .04);
			if (Math.abs(this.fling.y) < .5) {
				this.fling.y = 0
			}
		}
	}
	initShop() {
		this.layerShop = this.add.container();
		this.layerShopContent = this.add.container();
		this.layerShopContent2 = this.add.container();
		this.layerShop.setDepth(this.DEPTH_layerShop);
		this.shopTabSelected = 1;
		this.layerShop.x = this.midX;
		this.layerShop.y = this.midY;
		var fon_merge = this.add.image(0, 0, "ss_ui", "bg_connect_0000");
		fon_merge.setScale(2);
		this.layerShop.add(fon_merge);
		var offsetX = 50;
		var fon_shop = this.add.image(offsetX, 0, "ss_ui", "popup_shop_0000");
		fon_shop.setScale(2);
		this.layerShop.add(fon_shop);
		var coin = this.add.image(-130 + offsetX, -273, "ss_ui", "money_0000");
		this.layerShop.add(coin);
		this.iconCoinShop = coin;
		var buttonClose = new Button(222 + offsetX, -273, "ss_ui", "btn_close_0000", this.closeShop, this);
		this.layerShop.add(buttonClose);
		var buttonShopTab1 = new ButtonText(-370 + offsetX, -262, "ss_ui", "btn_shop1_0000", this.clickShopTab1, this, MainGame.GAME_TEXT.guns);
		buttonShopTab1.text.setFontSize(22);
		buttonShopTab1.text.x = 22;
		buttonShopTab1.text.y = -2;
		this.layerShop.add(buttonShopTab1);
		MainGame.updateTextWidth(buttonShopTab1.text, 140);
		var icon_reward = this.add.image(-70, -2, "ss_ui", "icon_nextcar_0000");
		buttonShopTab1.add(icon_reward);
		var icon_discount = this.add.image(-125, 5, "ss_ui", "icon_discount2_0000");
		buttonShopTab1.add(icon_discount);
		var text_discount = this.addText(null, -135, 0, "-15%", 20);
		text_discount.setAngle(-7);
		buttonShopTab1.add(text_discount);
		this.text_discount = text_discount;
		this.icon_discount = icon_discount;
		this.text_discount.visible = false;
		this.icon_discount.visible = false;
		this.buttonShopTab1 = buttonShopTab1;
		var buttonShopTab2 = new ButtonText(-370 + offsetX, -262 + 85, "ss_ui", "btn_shop2_0000", this.clickShopTab2, this, MainGame.GAME_TEXT.privilege);
		buttonShopTab2.text.setFontSize(22);
		buttonShopTab2.text.x = 22;
		buttonShopTab2.text.y = -2;
		this.layerShop.add(buttonShopTab2);
		MainGame.updateTextWidth(buttonShopTab2.text, 140);
		var icon_reward = this.add.image(-70, -2, "ss_ui", "icon_privilege_0000");
		buttonShopTab2.add(icon_reward);
		this.buttonShopTab2 = buttonShopTab2;
		fon_shop.setInteractive();
		fon_merge.setInteractive();
		fon_merge.on("pointerdown", this.inputOverShopDown, this);
		fon_merge.on("pointerup", this.inputOverShopUp, this);
		this.isInputOverShopDown = false;
		this.layerShop.add(this.layerShopContent);
		this.layerShop.add(this.layerShopContent2);
		this.contentHeight = 0;
		var item1 = this.add.image(225 + 3.5 + offsetX, 25, "ss_ui", "scroll_bar1_0000");
		var item2 = this.add.image(225 + 4 + offsetX, 25, "ss_ui", "scroll_bar2_0000");
		this.layerShopContent2.add(item1);
		this.layerShopContent2.add(item2);
		item1.setAngle(90);
		item2.setAngle(90);
		item2.setOrigin(0, .5);
		item2.y -= item1.width * .5;
		this.itemPrivilege1 = this.addShopItemsTabPrivilegies1(-20 + offsetX, 140 * 1 - 315);
		this.itemPrivilege2 = this.addShopItemsTabPrivilegies2(-20 + offsetX, 140 * 2 - 315);
		this.arShopCars = [];
		var car;
		for (var i = 1; i <= this.MAX_TYPES_CAR; i++) {
			car = this.addShopItemMain(-20 + offsetX, 140 * i - 315, i);
			this.arShopCars.push(car)
		}
		for (var i = 1; i <= this.MAX_TYPES_CAR; i++) {
			car = this.addShopItemText(offsetX, 140 * i - 315, i)
		}
		this.contentHeight -= 140 * 4 - 10;
		var text_shop = this.addText(this.layerShop, -190 + offsetX, -275, MainGame.GAME_TEXT.shop, 36, true);
		MainGame.updateTextWidth(text_shop, 380);
		this.textCoinsShop = this.addText(this.layerShop, 20 + offsetX, -275, "0", 36, true);
		var graphicsMask = this.make.graphics();
		var color = 65535;
		graphicsMask.fillStyle(color);
		graphicsMask.fillRect(100 + offsetX, 85, 700, 530);
		try {
			this.layerShopContent.mask = new Phaser.Display.Masks.BitmapMask(this, graphicsMask)
		} catch (e) {
			console.log(e)
		}
		this.layerShop.visible = false;
		this.contentMaxY = this.contentHeight;
		this.isShopAdded = true;
		const slider = new HorizontalSlider({
			scene: this,
			x: 225 + offsetX,
			y: 25,
			current: 0,
			texture: "ss_ui",
			track: {
				frame: "scroll_bar1_0000",
				y: -3.5
			},
			slider: "scroll_bar2_0000"
		});
		slider.setAngle(90);
		this.layerShop.add(slider);
		slider.on("update", (slider, value, percent) => {
			var scrollPercent = Math.round(percent * 100);
			var newContentY = (slider.height - this.contentHeight) / 100 * scrollPercent;
			this.current_pos.y = -newContentY;
			this.updatePositions(-newContentY, true)
		}, this);
		this.slider = slider;
		this.input.on("wheel", (function(pointer, gameObjects, deltaX, deltaY, deltaZ) {
			if (MainGame.state.shopTabSelected != 1) return;
			MainGame.state.current_pos.y = MainGame.state.limit(MainGame.state.current_pos.y + deltaY * .5);
			var posY = MainGame.state.current_pos.y;
			MainGame.state.updatePositions(posY)
		}));
		this.updatePositions(0)
	}
	inputOverShopDown() {
		this.isInputOverShopDown = true
	}
	inputOverShopUp() {
		if (!this.isInputOverShopDown) return;
		this.closeShop();
		this.isInputOverShopDown = false
	}
	updatePrivilegiesFactors() {
		var lvlEarning = this.levelEarning;
		if (lvlEarning > 1) {
			var itemInfo1 = this.arLevelEarning[lvlEarning - 2];
			var num1 = 1 + itemInfo1.value * .01;
			this.factorEarning = Math.round((num1 + Number.EPSILON) * 100) / 100;
			this.gameGUI.updateEarning(this.factorEarning)
		}
		var lvlDiscount = this.levelDiscount;
		if (lvlDiscount > 1) {
			var itemInfo2 = this.arLevelDiscount[lvlDiscount - 2];
			var num2 = 1 - itemInfo2.value * .01;
			this.factorDiscount = Math.round((num2 + Number.EPSILON) * 100) / 100;
			this.text_discount.setText("-" + itemInfo2.value + "%");
			this.text_discount.visible = true;
			this.icon_discount.visible = true
		}
	}
	updatePrivilegiesItems() {
		var text_level = this.levelEarning;
		var itemInfo = null;
		var text_value = null;
		var number_warm = null;
		if (text_level <= 10) {
			itemInfo = this.arLevelEarning[this.levelEarning - 1];
			number_warm = this.convertNumberFormat(itemInfo.price)
		} else {
			text_level = 10;
			itemInfo = this.arLevelEarning[text_level - 1];
			this.itemPrivilege1.btn_text.x = 0;
			number_warm = MainGame.GAME_TEXT.max.toUpperCase();
			this.itemPrivilege1.btn.setEnable(false);
			this.itemPrivilege1.btn.back.visible = false
		}
		text_value = MainGame.replaceText(MainGame.GAME_TEXT.increase_proc, itemInfo.value).toUpperCase();
		this.itemPrivilege1.text_num.setText(text_level);
		this.itemPrivilege1.text_value.setText(text_value);
		this.itemPrivilege1.btn_text.setText(number_warm);
		text_level = this.levelDiscount;
		itemInfo = null;
		text_value = null;
		number_warm = null;
		if (text_level <= 10) {
			itemInfo = this.arLevelDiscount[this.levelDiscount - 1];
			number_warm = this.convertNumberFormat(itemInfo.price)
		} else {
			text_level = 10;
			itemInfo = this.arLevelDiscount[text_level - 1];
			this.itemPrivilege2.btn_text.x = 0;
			number_warm = MainGame.GAME_TEXT.max.toUpperCase();
			this.itemPrivilege2.btn.setEnable(false);
			this.itemPrivilege2.btn.back.visible = false
		}
		text_value = MainGame.replaceText(MainGame.GAME_TEXT.off_proc, itemInfo.value).toUpperCase();
		this.itemPrivilege2.text_num.setText(text_level);
		this.itemPrivilege2.text_value.setText(text_value);
		this.itemPrivilege2.btn_text.setText(number_warm)
	}
	addShopItemsTabPrivilegies1(vX, vY) {
		var item = this.add.container();
		this.layerShopContent2.add(item);
		var plaha = this.add.image(vX, vY, "ss_ui", "window_car_0000");
		item.add(plaha);
		var plaha = this.add.image(vX - 90, vY + 5, "ss_ui", "icon_runway_0000");
		item.add(plaha);
		var buttonBuy = new ButtonText(vX + 95, vY + 25, "ss_ui", "btn_buy_shop_0000", this.clickBuyPrivilege1, this, "");
		item.add(buttonBuy);
		buttonBuy.text.setFontSize(24);
		buttonBuy.text.y = -4;
		buttonBuy.text.x = 25;
		buttonBuy.text.setOrigin(.5, .5);
		var text_num = this.addText(item, vX - 204 + 20, vY - 30, 1, 24);
		text_num.setTint(0);
		this.addText(item, vX - 145, vY - 43, MainGame.GAME_TEXT.lvl, 18, true);
		var text_title = this.addText(item, vX - 7, vY - 42, MainGame.GAME_TEXT.guns_earning, 18, true);
		text_title.setOrigin(0, .5);
		MainGame.updateTextWidth(text_title, 200);
		var text_value = this.addText(item, vX - 7, vY - 18, MainGame.GAME_TEXT.increase_proc, 18, true);
		text_value.setOrigin(0, .5);
		MainGame.updateTextWidth(text_value, 200);
		return {
			btn: buttonBuy,
			btn_back: buttonBuy.back,
			btn_text: buttonBuy.text,
			text_num: text_num,
			text_value: text_value
		}
	}
	addShopItemsTabPrivilegies2(vX, vY) {
		var item = this.add.container();
		this.layerShopContent2.add(item);
		var plaha = this.add.image(vX, vY, "ss_ui", "window_car_0000");
		item.add(plaha);
		var plaha = this.add.image(vX - 90, vY, "ss_ui", "icon_discount_0000");
		item.add(plaha);
		var buttonBuy = new ButtonText(vX + 95, vY + 25, "ss_ui", "btn_buy_shop_0000", this.clickBuyPrivilege2, this, "");
		item.add(buttonBuy);
		buttonBuy.text.setFontSize(24);
		buttonBuy.text.y = -4;
		buttonBuy.text.x = 25;
		buttonBuy.text.setOrigin(.5, .5);
		var text_num = this.addText(item, vX - 204 + 20, vY - 30, 1, 24);
		text_num.setTint(0);
		this.addText(item, vX - 145, vY - 43, MainGame.GAME_TEXT.lvl, 18, true);
		var text_title = this.addText(item, vX - 7, vY - 42, MainGame.GAME_TEXT.all_guns, 18, true);
		text_title.setOrigin(0, .5);
		MainGame.updateTextWidth(text_title, 200);
		var text_value = this.addText(item, vX - 7, vY - 18, MainGame.GAME_TEXT.off_proc, 18, true);
		text_value.setOrigin(0, .5);
		MainGame.updateTextWidth(text_value, 200);
		return {
			btn: buttonBuy,
			btn_back: buttonBuy.back,
			btn_text: buttonBuy.text,
			text_num: text_num,
			text_value: text_value
		}
	}
	addShopItemMain(vX, vY, vNum) {
		var item = this.add.container();
		this.layerShopContent.add(item);
		var plaha = this.add.image(vX, vY, "ss_ui", "window_car_0000");
		item.add(plaha);
		var car = this.add.image(vX - 100, vY, "ss_main", "icon_f" + vNum + "_0000");
		car.setScale(.9);
		item.add(car);
		var icon_coin = this.add.image(vX + 10, vY - 17, "ss_ui", "money_0000");
		icon_coin.setScale(.5);
		item.add(icon_coin);
		var buttonBuy = new ButtonText(vX + 95, vY + 25, "ss_ui", "btn_buy_shop_0000", this.clickBuyShopItem, this, "", vNum);
		item.add(buttonBuy);
		buttonBuy.text.setFontSize(24);
		buttonBuy.text.y = -4;
		buttonBuy.text.x = 25;
		buttonBuy.text.setOrigin(.5, .5);
		this.contentHeight += 140;
		return {
			item: item,
			car: car,
			btn: buttonBuy,
			btn_back: buttonBuy.back,
			btn_text: buttonBuy.text,
			icon_coin_earning: icon_coin
		}
	}
	addShopItemText(vX, vY, vNum) {
		var car = this.arShopCars[vNum - 1];
		var item = car.item;
		var text_num = this.addText(item, vX - 204, vY - 30, vNum, 24);
		text_num.setTint(0);
		var textField_earning = this.addText(item, vX + 22, vY - 42, MainGame.GAME_TEXT.earning, 18, true);
		MainGame.updateTextWidth(textField_earning, 180);
		var value_speed_coins = this.getCarCoins(vNum);
		var number_warm = this.convertNumberFormat(value_speed_coins);
		var value_earning = number_warm + "/" + MainGame.GAME_TEXT.sec + " ";
		var text_earning = this.addText(item, vX + 8, vY - 18, value_earning, 18);
		MainGame.updateTextWidth(text_earning, 180);
		text_earning.setOrigin(0, .5);
		car.textField_earning1 = textField_earning;
		car.textField_earning2 = text_earning
	}
	clickShopTab1() {
		this.shopTabSelected = 1;
		this.layerShopContent.visible = true;
		this.slider.visible = true;
		this.layerShopContent2.visible = false;
		this.buttonShopTab1.back.setFrame("btn_shop1_0000");
		this.buttonShopTab2.back.setFrame("btn_shop2_0000");
		this.updateShopItem()
	}
	clickShopTab2() {
		this.shopTabSelected = 2;
		this.layerShopContent.visible = false;
		this.slider.visible = false;
		this.layerShopContent2.visible = true;
		this.buttonShopTab1.back.setFrame("btn_shop2_0000");
		this.buttonShopTab2.back.setFrame("btn_shop1_0000")
	}
	clickBuyPrivilege1() {
		var itemInfo = this.arLevelEarning[this.levelEarning - 1];
		var priceUpdate = itemInfo.price;
		if (this.amount_coins < priceUpdate) {
			this.gameGUI.showSystemMessage(MainGame.GAME_TEXT.no_money);
			return
		}
		if (this.levelEarning > 10) return;
		this.levelEarning++;
		MainGame.levelEarning = this.levelEarning;
		this.amount_coins -= priceUpdate;
		var text_coins_warm = this.convertNumberFormat(this.amount_coins);
		this.gameGUI.updateCoins(text_coins_warm);
		this.updateShop(text_coins_warm);
		this.updatePrivilegiesItems();
		this.updatePrivilegiesFactors();
		this.updateSpeedValue();
		MainGame.saveSaves()
	}
	clickBuyPrivilege2() {
		var itemInfo = this.arLevelDiscount[this.levelDiscount - 1];
		var priceUpdate = itemInfo.price;
		if (this.amount_coins < priceUpdate) {
			this.gameGUI.showSystemMessage(MainGame.GAME_TEXT.no_money);
			return
		}
		if (this.levelDiscount > 10) return;
		this.levelDiscount++;
		MainGame.levelDiscount = this.levelDiscount;
		this.amount_coins -= priceUpdate;
		var text_coins_warm = this.convertNumberFormat(this.amount_coins);
		this.gameGUI.updateCoins(text_coins_warm);
		this.updateShop(text_coins_warm);
		this.updatePrivilegiesItems();
		this.updatePrivilegiesFactors();
		this.updateCarPrices();
		this.gameGUI.updateFastBuy();
		MainGame.saveSaves()
	}
	closeShop() {
		if (MainGame.isAPI) MainGame.API_POKI.commercialBreak();
		this.layerShop.visible = false;
		this.gameGUI.enableMainButtons()
	}
	updateShop(value) {
		if (!this.isShopAdded) return;
		this.textCoinsShop.setText(value);
		this.iconCoinShop.x = this.textCoinsShop.x - this.textCoinsShop.width * .5 - 35
	}
	updateShopItem() {
		if (!this.isShopAdded) return;
		var item;
		this.updatePrivilegiesItems();
		for (var i = 0; i < this.MAX_TYPES_CAR; i++) {
			item = this.arShopCars[i];
			if (i + 2 > this.nextCarLevel) {
				item.car.setTint(0);
				item.btn_back.setFrame("btn_buy_gray_0000");
				item.btn_text.setText("???");
				item.btn_text.setTint(16777215);
				MainGame.updateTextWidth(item.btn_text, 140);
				item.btn.disableInput();
				item.icon_coin_earning.visible = false;
				item.textField_earning1.visible = false;
				item.textField_earning2.visible = false
			} else {
				item.car.setTint(16777215);
				item.icon_coin_earning.visible = true;
				item.textField_earning1.visible = true;
				item.textField_earning2.visible = true;
				if (i > 0 && this.nextCarLevel < i + 6) {
					if (i == this.nextCarLevel - 5) {
						if (this.ALLOW_ADS_CAR) {
							item.btn_back.setFrame("btn_buy2_shop_0000");
							item.btn_text.setText(" " + MainGame.GAME_TEXT.free.toUpperCase() + " ");
							item.btn_text.setTint(16777215);
							MainGame.updateTextWidth(item.btn_text, 100);
							item.btn.enableInput();
							if (MainGame.isAPI) {
								if (MainGame.API_POKI && MainGame.API_POKI.api_isAdblock) item.btn.setEnable(false)
							} else {
								if (!MainGame.isDebug) item.btn.setEnable(false)
							}
						} else {
							item.btn_back.setFrame("btn_buy_gray_0000");
							item.btn_text.setText(MainGame.GAME_TEXT.unlock_car + " " + (i + 5));
							item.btn_text.setTint(16777215);
							MainGame.updateTextWidth(item.btn_text, 100);
							item.btn.disableInput()
						}
					} else {
						item.btn_back.setFrame("btn_buy_gray_0000");
						item.btn_text.setText(MainGame.GAME_TEXT.unlock_car + " " + (i + 5));
						item.btn_text.setTint(16777215);
						MainGame.updateTextWidth(item.btn_text, 100);
						item.btn.disableInput()
					}
				} else {
					item.btn_back.setFrame("btn_buy_shop_0000");
					var price = Math.round(this.arCurrentPricesCar[i] * this.factorDiscount);
					var number_warm = this.convertNumberFormat(price);
					item.btn_text.setText(number_warm);
					item.btn_text.setTint(16777215);
					MainGame.updateTextWidth(item.btn_text, 100);
					item.btn.enableInput()
				}
			}
		}
	}
	getWheelPrize(slices, degrees, backDegrees) {
		return slices - 1 - Math.floor((degrees - backDegrees) / (360 / slices))
	}
	initWheelOptions() {
		this.wheelOptions = {
			slices: 8,
			slicePrizes: ["reward_diamonds1", "reward_box4", "reward_diamonds4", "reward_boost", "reward_diamonds2", "reward_box6", "reward_diamonds3", "reward_turbo"],
			sliceProbability: [.14, .2, .02, .2, .08, .12, .04, .2],
			rotationTime: 3e3,
			rotationTimeRange: {
				min: 3e3,
				max: 4500
			},
			wheelRounds: {
				min: 2,
				max: 6
			},
			backSpin: {
				min: 2,
				max: 8
			}
		}
	}
	checkProbability(probs) {
		var summ = 0;
		for (var v in probs) {
			summ += probs[v]
		}
		return summ == 1
	}
	getTypeRewardBox() {
		var boxRandom = this.getTypeRandomBox();
		if (this.nextCarLevel < 6) {
			boxRandom = 1
		} else {
			boxRandom++
		}
		return boxRandom
	}
	getRewardCoinsHours(vCount) {
		var total_speed = this.updateSpeedValue(true);
		var coins = vCount * 3600 * total_speed;
		this.amount_coins += coins;
		var text_coins_warm = this.convertNumberFormat(this.amount_coins);
		this.gameGUI.updateCoins(text_coins_warm)
	}
	getRewards(vReward) {
		switch (vReward) {
			case "reward_diamonds1":
				MainGame.amount_diamonds += 10;
				this.gameGUI.updateDiamonds(MainGame.amount_diamonds);
				break;
			case "reward_diamonds2":
				MainGame.amount_diamonds += 25;
				this.gameGUI.updateDiamonds(MainGame.amount_diamonds);
				break;
			case "reward_diamonds3":
				MainGame.amount_diamonds += 50;
				this.gameGUI.updateDiamonds(MainGame.amount_diamonds);
				break;
			case "reward_diamonds4":
				MainGame.amount_diamonds += 100;
				this.gameGUI.updateDiamonds(MainGame.amount_diamonds);
				break;
			case "reward_coin1":
				this.getRewardCoinsHours(1);
				break;
			case "reward_coin2":
				this.getRewardCoinsHours(2);
				break;
			case "reward_coin3":
				this.getRewardCoinsHours(3);
				break;
			case "reward_boost":
			case "helicopter_coins":
				this.countDownBonusCoins += this.TIME_COINS;
				this.activateBoost(this.countDownBonusCoins);
				break;
			case "helicopter_boxes":
			case "reward_box4":
				var boxType = this.getTypeRewardBox();
				this.addBoxToBuffer(boxType);
				this.addBoxToBuffer(boxType);
				this.addBoxToBuffer(boxType);
				this.addBoxToBuffer(boxType);
				this.saveBoxBuffer();
				break;
			case "reward_box6":
				var boxType = this.getTypeRewardBox();
				this.addBoxToBuffer(boxType);
				this.addBoxToBuffer(boxType);
				this.addBoxToBuffer(boxType);
				this.addBoxToBuffer(boxType);
				this.addBoxToBuffer(boxType);
				this.addBoxToBuffer(boxType);
				this.saveBoxBuffer();
				break;
			case "reward_box8":
				var boxType = this.getTypeRewardBox();
				this.addBoxToBuffer(boxType);
				this.addBoxToBuffer(boxType);
				this.addBoxToBuffer(boxType);
				this.addBoxToBuffer(boxType);
				this.addBoxToBuffer(boxType);
				this.addBoxToBuffer(boxType);
				this.addBoxToBuffer(boxType);
				this.addBoxToBuffer(boxType);
				this.saveBoxBuffer();
				break;
			case "reward_wheel":
				var item = MyMath.weightedRandom(this.wheelOptions.sliceProbability);
				if (item == 2 && this.isTurboMax()) item = 1;
				MainGame.reward_wheel = this.wheelOptions.slicePrizes[item];
				var rounds = Phaser.Math.Between(this.wheelOptions.wheelRounds.min, this.wheelOptions.wheelRounds.max);
				var backDegrees = Phaser.Math.Between(this.wheelOptions.backSpin.min, this.wheelOptions.backSpin.max);
				var degrees = 360 / this.wheelOptions.slices * item + Phaser.Math.Between(0, 29) + backDegrees;
				var duration1 = this.wheelOptions.rotationTime;
				var duration2 = 1500;
				MainGame.Sfx.play("sound", "lucky_wheel");
				this.gameGUI.tweenWheelFortune(rounds, degrees, backDegrees, duration1, duration2);
				if (this.freeTimeWheel > 0) {
					this.freeTimeWheel--;
					MainGame.freeTimeWheel = this.freeTimeWheel;
					MainGame.saveSaves()
				}
				if (this.freeTimeWheel < MainGame.maxTimeWheel && this.countDownNextFree <= 0) {
					this.countDownNextFree = this.TIME_NEXT_FREE
				}
				if (this.freeTimeWheel > 0) {
					this.gameGUI.icon_free_fortune.visible = true
				} else {
					this.gameGUI.icon_free_fortune.visible = false
				}
				this.gameGUI.updateFortunaWheelWindow(this.countDownNextFree);
				break;
			case "turbo":
			case "reward_turbo":
				this.activateTurbo(true);
				break;
			case "coinsX2":
				this.amount_coins += this.value_offline_earning;
				var text_coins_warm = this.convertNumberFormat(this.amount_coins);
				this.gameGUI.updateCoins(text_coins_warm);
				this.updateShop(text_coins_warm);
				this.gameGUI.closeOfflineEarningWindow(true);
				break;
			case "freeCar":
				this.ALLOW_ADS_CAR = false;
				this.gameGUI.icon_adv.visible = false;
				if (this.num_ads_car > 0) {
					this.addBoxToBuffer(this.num_ads_car);
					this.updateShopItem();
					MainGame.Sfx.play("sound", "buy")
				}
				this.num_ads_car = 0;
				break;
			case "freeUpgrade":
				if (this.parking_upgrade_id != null && this.parking_upgrade_type > 0) {
					var parking = this.arParking[this.parking_upgrade_id];
					parking.type = this.parking_upgrade_type;
					this.setSpriteText(parking.textNumberType, parking.type);
					parking.obj.setFrame("icon_f" + parking.type + "_0000");
					var effect = this.add.sprite(parking.obj.x - 5, parking.obj.y + 2, "ss_main");
					effect.setDepth(this.DEPTH_effect_unboxing);
					effect.play("effect_connect");
					this.checkNextCar();
					MainGame.Sfx.play("sound", "boost")
				}
				this.parking_upgrade_id = null;
				this.parking_upgrade_type = 0;
				this.gameGUI.closeUpgadeWindow();
				break
		}
	}
	showAdsForFortunaWheel() {
		MainGame.isApiGameplayStop = true;
		MainGame.clickReward("reward_wheel");
		this.gameGUI.buttonFortunaWheel.setEnable(false)
	}
	showAdsForHelicopter(vTypeBonusDron) {
		MainGame.isApiGameplayStop = true;
		MainGame.clickReward("helicopter_" + vTypeBonusDron);
		this.gameGUI.boostBtnAds.setEnable(false)
	}
	showAdsForFreeUpgrade() {
		MainGame.isApiGameplayStop = true;
		MainGame.clickReward("freeUpgrade");
		this.gameGUI.buttonFreeUpgrade.setEnable(false)
	}
	showAdsForTurbo() {
		MainGame.isApiGameplayStop = false;
		MainGame.clickReward("turbo");
		this.gameGUI.buttonActivateTurbo.setEnable(false)
	}
	showAdsForCoinsX2() {
		MainGame.isApiGameplayStop = true;
		MainGame.clickReward("coinsX2");
		this.gameGUI.offlineEarningBtnAds.setEnable(false)
	}
	showAdsForCar() {
		MainGame.clickReward("freeCar")
	}
	goAllowAdsCar() {
		if (this.nextCarLevel < 6) return;
		if (this.ALLOW_ADS_CAR) return;
		this.ALLOW_ADS_CAR = true;
		this.num_ads_car = this.nextCarLevel - 4;
		this.updateShopItem();
		this.gameGUI.icon_adv.visible = true
	}
	updateAdsCar() {
		if (this.ALLOW_ADS_CAR) {
			this.num_ads_car = this.nextCarLevel - 4;
			this.updateShopItem()
		}
	}
	showHelicopter() {
		this.gameGUI.showHelicopter()
	}
	testAddBoxes() {
		this.addBoxToBuffer(2);
		this.addBoxToBuffer(2);
		this.addBoxToBuffer(2);
		this.addBoxToBuffer(2);
		this.saveBoxBuffer()
	}
	testLevelUp() {
		this.increaseLevel(this.exp_max)
	}
	testAddGun() {
		this.addBoxToBuffer(MainGame.debug_typeGun)
	}
	testCoinsHours(vCount) {
		if (!MainGame.isDebug) return;
		var total_speed = this.updateSpeedValue();
		var coins = vCount * 3600 * total_speed;
		var converted_value = this.convertNumberFormat(total_speed);
		this.amount_coins += coins;
		var text_coins_warm = this.convertNumberFormat(this.amount_coins);
		this.gameGUI.updateCoins(text_coins_warm);
		return "coins for " + vCount + "h : " + this.convertNumberFormat(coins)
	}
	testCarAds() {
		if (!MainGame.isDebug) return;
		var typeCar = this.nextCarLevel - 4;
		this.addObject({
			lvl: typeCar,
			fromShop: true
		}, true)
	}
}
GameGUI = function(link) {
	this.gameScreen = link;
	this.layerButtons = this.gameScreen.layerButtons
};
GameGUI.prototype.init = function() {
	_this = this.gameScreen;
	this.midX = _this.midX;
	this.midY = _this.midY;
	this.TIME_OPEN_POPUP = 500;
	this.isOnInputDown = false;
	this.isPopupOpened = false;
	this.buttonEnabled = true;
	this.typeDronBonus = "";
	this.scaleWindow1 = .7;
	this.scaleWindow2 = .85;
	this.posWindowY = -40;
	this.selectedGun = MainGame.selectedGun;
	this.isTweeningWheel = false;
	this.isTweeningHat = false;
	this.initMainButtons();
	this.initBasketTrash();
	this.initCoinsPanel();
	this.initProgressBar();
	this.initLevelBar();
	this.initIndcatorBoostCoins();
	this.initIndcatorBoostSpeed();
	this.initCoinsText();
	this.initSystemMessage();
	this.initUpgradeWindow();
	this.initTurboWindow();
	this.initBoosterWindow();
	this.initSettingsWindow();
	this.initOfflineEarningWindow();
	this.initLevelUpWindow();
	this.initMergeAnimation();
	this.initSelectGunWindow();
	this.initFortunaWheelWindow();
	this.initRewardWindow();
	this.initHelmetWindow();
	this.initHelicopter();
	if (MainGame.EVENT_NUM == 1) {
		this.initSpider()
	}
};
GameGUI.prototype.showBtnFireEffect = function() {
	this.btn_fire_effect.visible = true;
	this.btn_fire_effect.play("btn_fire_effect")
};
GameGUI.prototype.initMainButtons = function() {
	_this = this.gameScreen;
	var posX = 770;
	var posY = 570;
	var btnFire = new ButtonText(250, 570, "ss_ui", "btn_fire_0000", _this.showShooterScreen, _this, MainGame.GAME_TEXT.fire);
	this.layerButtons.add(btnFire);
	btnFire.text.setFontSize(40);
	btnFire.text.y = -15;
	btnFire.text.x = 34;
	var effect = _this.add.sprite(btnFire.x, btnFire.y, "ss_ui");
	effect.play("btn_fire_effect");
	effect.visible = false;
	this.layerButtons.add(effect);
	this.btn_fire_effect = effect;
	if (MainGame.EVENT_NUM > 0) {
		var effectEvent = _this.add.sprite(0, 0, "ss_ui");
		effectEvent.play("effect_event");
		effectEvent.setScale(2);
		effectEvent.setDepth(_this.DEPTH_GUI);
		this.effectEvent = effectEvent
	}
	var textDay = MainGame.GAME_TEXT.day + " " + MainGame.fireLevel;
	var text_day = _this.addText(btnFire, 34, 20, textDay.toUpperCase(), 24);
	this.btnFire = btnFire;
	this.buttonSettings = new Button(btnFire.x - 190, 160, "ss_ui", "btn_settings_0000", this.openSettings, _this, this);
	this.buttonSettings.setDepth(_this.DEPTH_GUI);
	this.buttonFortuna = new Button(btnFire.x - 190, 160 + 90, "ss_ui", "btn_fortune_0000", this.openFortunaWheelWindow, _this, this);
	this.buttonFortuna.setDepth(_this.DEPTH_GUI);
	this.buttonChangeGun = new Button(btnFire.x - 190, posY, "ss_ui", "btn_change_gun_0000", this.showSelectGunWindow, _this, this);
	this.buttonChangeGun.setDepth(_this.DEPTH_GUI);
	this.buttonHat = new Button(btnFire.x - 190, posY - 110, "ss_ui", "btn_hat_0000", this.showHatWindow, _this, this);
	this.buttonHat.setDepth(_this.DEPTH_GUI);
	if (MainGame.EVENT_NUM == 1) {
		this.buttonEvent = new Button(btnFire.x - 190, posY - 215, "ss_ui", "btn_event_halloween_0000", this.showEventScreen, _this, this);
		this.buttonEvent.setDepth(_this.DEPTH_GUI);
		this.effectEvent.x = this.buttonEvent.x;
		this.effectEvent.y = this.buttonEvent.y
	}
	if (MainGame.EVENT_NUM == 2) {
		this.buttonEvent = new Button(btnFire.x - 190, posY - 215, "ss_ui", "btn_event_christmas_0000", this.showEventScreen, _this, this);
		this.buttonEvent.setDepth(_this.DEPTH_GUI);
		this.effectEvent.x = this.buttonEvent.x;
		this.effectEvent.y = this.buttonEvent.y
	}
	var buttonAddCar = new ButtonText(posX, posY, "ss_ui", "btn_big_0000", _this.buyFastCar, _this, "");
	this.layerButtons.add(buttonAddCar);
	this.buttonAddCar = buttonAddCar;
	var icon_fast_car = _this.add.image(-55, 0, "ss_main", "icon_f1_0000");
	icon_fast_car.setScale(_this.getScaleCar(.6));
	buttonAddCar.add(icon_fast_car);
	var icon_fast_coin = _this.add.image(-10, 0, "ss_ui", "money_0000");
	icon_fast_coin.setScale(.7);
	buttonAddCar.add(icon_fast_coin);
	buttonAddCar.text.setFontSize(24);
	this.buttonAddCar = buttonAddCar;
	this.icon_fast_car = icon_fast_car;
	this.icon_fast_coin = icon_fast_coin;
	var buttonTurbo = new ButtonText(posX - 180, posY, "ss_ui", "btn_turbo_0000", this.clickTurbo, _this, MainGame.GAME_TEXT.turbo, null, this);
	buttonTurbo.text.setFontSize(18);
	buttonTurbo.text.y = 28;
	MainGame.updateTextWidth(buttonTurbo.text, 85);
	this.layerButtons.add(buttonTurbo);
	this.buttonTurbo = buttonTurbo;
	var buttonShop = new ButtonText(posX + 180, posY, "ss_ui", "btn_shop_0000", this.clickShop, _this, MainGame.GAME_TEXT.shop, null, this);
	buttonShop.text.setFontSize(18);
	buttonShop.text.y = 28;
	MainGame.updateTextWidth(buttonShop.text, 85);
	this.layerButtons.add(buttonShop);
	this.buttonShop = buttonShop;
	var icon_adv = _this.add.image(50, -45, "ss_ui", "icon_adv_0000");
	buttonShop.add(icon_adv);
	this.icon_adv = icon_adv;
	icon_adv.angle = -5;
	_this.tweens.add({
		targets: icon_adv,
		scaleX: 1.15,
		scaleY: 1.15,
		ease: "Linear",
		duration: 400,
		yoyo: true,
		repeat: -1
	});
	_this.tweens.add({
		targets: icon_adv,
		angle: 5,
		ease: "Linear",
		duration: 400,
		yoyo: true,
		repeat: -1
	});
	this.icon_adv.visible = false;
	var icon_free_fortune = _this.add.image(this.buttonFortuna.x + 35, this.buttonFortuna.y - 24, "ss_ui", "icon_adv_0000");
	icon_free_fortune.setDepth(_this.DEPTH_GUI);
	this.icon_free_fortune = icon_free_fortune;
	icon_adv.angle = -5;
	_this.tweens.add({
		targets: icon_free_fortune,
		scaleX: 1.15,
		scaleY: 1.15,
		ease: "Linear",
		duration: 400,
		yoyo: true,
		repeat: -1
	});
	_this.tweens.add({
		targets: icon_free_fortune,
		angle: 5,
		ease: "Linear",
		duration: 400,
		yoyo: true,
		repeat: -1
	});
	this.icon_free_fortune.visible = false
};
GameGUI.prototype.enableMainButtons = function() {
	this.buttonEnabled = true;
	this.buttonFortuna.enableInput();
	this.buttonChangeGun.enableInput();
	this.buttonHat.enableInput();
	if (this.buttonEvent) this.buttonEvent.enableInput();
	this.buttonShop.enableInput();
	this.buttonTurbo.enableInput();
	this.buttonSettings.enableInput();
	_this = this.gameScreen;
	if (_this.isGoTutorial && (_this.tutorialStep >= 3 && _this.tutorialStep <= 5)) return;
	this.buttonAddCar.enableInput();
	this.btnFire.enableInput()
};
GameGUI.prototype.disableMainButtons = function(vSkipApiEvent) {
	this.buttonEnabled = false;
	this.isOnInputDown = false;
	this.isPopupOpened = false;
	this.btnFire.disableInput();
	this.buttonFortuna.disableInput();
	this.buttonChangeGun.disableInput();
	this.buttonHat.disableInput();
	if (this.buttonEvent) this.buttonEvent.disableInput();
	this.buttonAddCar.disableInput();
	this.buttonTurbo.disableInput();
	this.buttonShop.disableInput();
	this.buttonSettings.disableInput();
	if (MainGame.isAPI && !vSkipApiEvent) {
		MainGame.isApiGameplayStop = true;
		MainGame.API_POKI.gameplayStop()
	}
};
GameGUI.prototype.showEventScreen = function() {
	_this = this.gameScreen;
	if (MainGame.EVENT_NUM == 1) {
		_this.goHalloweenScreen()
	}
	if (MainGame.EVENT_NUM == 2) {
		_this.goChristmasScreen()
	}
};
GameGUI.prototype.initCoinsPanel = function() {
	_this = this.gameScreen;
	var posX = 250 + 50;
	var diamonds = _this.add.image(posX - 265, 36, "ss_ui", "icon_diamond_0000");
	var coin = _this.add.image(posX - 110, 38, "ss_ui", "money_0000");
	var icon_earnings = _this.add.image(posX + 220 + 15, 35, "ss_ui", "icon_earnings_0000");
	this.textDiamonds = _this.add.bitmapText(posX - 235, 35, "Panton", "1000", 32);
	this.textDiamonds.setOrigin(0, .5);
	this.textDiamonds.setTint(16777215);
	this.textCoins = _this.add.bitmapText(posX - 10, 35, "Panton", "192.640K", 32);
	this.textCoins.setOrigin(.5, .5);
	this.textCoins.setTint(16777215);
	this.textSpeed = _this.add.bitmapText(posX + 140, 38, "Panton", "8.177/SEC", 22);
	this.textSpeed.setOrigin(.5, .5);
	this.textSpeed.setTint(16769280);
	var text_value_earning = _this.add.bitmapText(posX + 243 + 15, 38, "Panton", "X1.10", 18);
	text_value_earning.setOrigin(0, .5);
	text_value_earning.setTint(16769280);
	var text_earning = _this.add.bitmapText(posX + 240 + 15, 56, "Panton", MainGame.GAME_TEXT.earning.toUpperCase(), 16);
	text_earning.setOrigin(.5, .5);
	text_earning.setTint(16769280);
	this.icons_coin = coin;
	this.icons_diamonds = diamonds;
	this.icon_earnings = icon_earnings;
	this.text_value_earning = text_value_earning;
	this.text_earning = text_earning;
	this.icons_diamonds.setDepth(_this.DEPTH_GUI);
	this.icons_coin.setDepth(_this.DEPTH_GUI);
	this.icon_earnings.setDepth(_this.DEPTH_GUI);
	this.textDiamonds.setDepth(_this.DEPTH_text_field);
	this.textCoins.setDepth(_this.DEPTH_text_field);
	this.textSpeed.setDepth(_this.DEPTH_text_field);
	this.text_value_earning.setDepth(_this.DEPTH_text_field);
	this.text_earning.setDepth(_this.DEPTH_text_field);
	this.icon_earnings.visible = false;
	this.text_value_earning.visible = false;
	this.text_earning.visible = false
};
GameGUI.prototype.updateEarning = function(vValue) {
	this.text_value_earning.setText("X" + vValue);
	this.icon_earnings.visible = true;
	this.text_value_earning.visible = true;
	this.text_earning.visible = true
};
GameGUI.prototype.updateCoins = function(vValue) {
	this.textCoins.setText(vValue)
};
GameGUI.prototype.updateDiamonds = function(vValue) {
	this.textDiamonds.setText(vValue);
	this.textFieldHelmetWindow.setText(vValue)
};
GameGUI.prototype.updateSpeedValue = function(vValue) {
	this.textSpeed.setText(vValue)
};
GameGUI.prototype.initProgressBar = function() {
	_this = this.gameScreen;
	var midX = 250 + 50;
	var offsetX = 0;
	var posY = 80;
	this.layerProgressCar = _this.add.container();
	var effect_readyMerge = _this.add.sprite(midX + offsetX, posY, "ss_ui");
	effect_readyMerge.play("nextcar3");
	effect_readyMerge.visible = false;
	this.effect_readyMerge = effect_readyMerge;
	this.nextcarBarB = _this.add.image(midX + offsetX, posY, "ss_ui", "nextcar1_0000");
	this.nextcarBarT = _this.add.image(midX + offsetX, posY, "ss_ui", "nextcar2_0000");
	this.iconCircleNextCar = _this.add.image(midX + offsetX + 180, posY - 3, "ss_ui", "icon_nextcar_0000");
	this.nextcarBarT_crop = new Phaser.Geom.Rectangle(0, 0, 0, this.nextcarBarT.height);
	this.nextcarBarT.setCrop(this.nextcarBarT_crop);
	this.textProgressNextCar = _this.add.bitmapText(midX + 3, posY - 10, "Panton", "0%", 18);
	this.textProgressNextCar.setOrigin(.5, .5);
	this.textProgressNextCar.setTint(16758784);
	this.textLevelNextCar = _this.add.bitmapText(this.iconCircleNextCar.x - 32, this.iconCircleNextCar.y, "Panton", _this.nextCarLevel, 24);
	this.textLevelNextCar.setOrigin(.5, .5);
	this.textLevelNextCar.setTint(16777215);
	this.textReadyMerge = _this.addText(this.layerProgressCar, midX, posY + 20, MainGame.GAME_TEXT.ready_merge, 18, true);
	this.textReadyMerge.setTint(16758784);
	this.textReadyMerge.visible = false;
	this.layerProgressCar.add(this.nextcarBarB);
	this.layerProgressCar.add(this.nextcarBarT);
	this.layerProgressCar.add(this.effect_readyMerge);
	this.layerProgressCar.add(this.iconCircleNextCar);
	this.layerProgressCar.add(this.textProgressNextCar);
	this.layerProgressCar.add(this.textLevelNextCar);
	this.layerProgressCar.setDepth(_this.DEPTH_text_field)
};
GameGUI.prototype.updateProgress = function(progress) {
	var originalWidth = this.nextcarBarT.width;
	var width = originalWidth * progress;
	this.nextcarBarT_crop.width = width;
	this.nextcarBarT.setCrop(this.nextcarBarT_crop);
	this.textProgressNextCar.setText(Math.floor(progress * 100) + "%");
	if (progress == 1) {
		this.textReadyMerge.visible = true;
		this.effect_readyMerge.visible = true
	} else {
		this.textReadyMerge.visible = false;
		this.effect_readyMerge.visible = false
	}
};
GameGUI.prototype.initLevelBar = function() {
	_this = this.gameScreen;
	this.layerPanelLevel = _this.add.container();
	var pos = {
		x: 60,
		y: 50 + 40
	};
	this.levelBarB = _this.add.image(pos.x + 50, pos.y + 12, "ss_ui", "exp1_0000");
	this.levelBarT = _this.add.image(pos.x + 50, pos.y + 12, "ss_ui", "exp2_0000");
	this.levelBarT_crop = new Phaser.Geom.Rectangle(0, 0, 0, this.levelBarT.height);
	this.levelBarT.setCrop(this.levelBarT_crop);
	this.textLevel = _this.add.bitmapText(pos.x + 6, pos.y, "Panton", _this.currentLevel, 42);
	this.textLevel.setOrigin(1, .5);
	var text_level = _this.addText(this.layerPanelLevel, pos.x + 18, pos.y - 9, MainGame.GAME_TEXT.level, 18, true);
	text_level.setOrigin(0, .5);
	MainGame.updateTextWidth(text_level, 400);
	this.layerPanelLevel.add(this.levelBarB);
	this.layerPanelLevel.add(this.levelBarT);
	this.layerPanelLevel.add(this.textLevel);
	this.layerPanelLevel.setDepth(_this.DEPTH_layerLevelBar)
};
GameGUI.prototype.updateLevel = function(progress, delay) {
	_this = this.gameScreen;
	var originalWidth = this.levelBarT.width;
	var width = originalWidth * progress;
	delay = delay || 0;
	_this.tweens.killTweensOf(this.levelBarT_crop);
	_this.tweens.add({
		targets: this.levelBarT_crop,
		width: width,
		ease: Phaser.Math.Easing.Linear,
		duration: 200,
		delay: delay,
		onUpdate: () => {
			this.levelBarT.setCrop(this.levelBarT_crop)
		}
	})
};
GameGUI.prototype.initIndcatorBoostCoins = function() {
	_this = this.gameScreen;
	this.layerIndicatorCoins = _this.add.container();
	this.layerIndicatorCoins.setDepth(_this.DEPTH_text_field);
	this.layerIndicatorCoins.x = 450;
	this.layerIndicatorCoins.y = 160;
	var icon = _this.add.image(0, 0, "ss_ui", "indicator_money_0000");
	this.layerIndicatorCoins.add(icon);
	var txt_x = _this.addText(this.layerIndicatorCoins, 23, 17, "X5", 24);
	txt_x.setTint(16773888);
	var txt = _this.addText(this.layerIndicatorCoins, 0, 44, "", 18);
	txt.setText(_this.secToHHMMSS(105));
	this.layerIndicatorCoins.visible = false;
	this.textFieldIndicatorCoins = txt
};
GameGUI.prototype.enableIndcatorBoostCoins = function(bool) {
	_this = this.gameScreen;
	this.layerIndicatorCoins.visible = bool;
	this.updateIndicatorsBonus("coins_x5", bool)
};
GameGUI.prototype.updateIndcatorBoostCoins = function(vValue) {
	this.textFieldIndicatorCoins.setText(vValue)
};
GameGUI.prototype.initIndcatorBoostSpeed = function() {
	_this = this.gameScreen;
	this.layerIndicatorBoost = _this.add.container();
	this.layerIndicatorBoost.setDepth(_this.DEPTH_text_field);
	this.layerIndicatorBoost.x = 450;
	this.layerIndicatorBoost.y = 160 + 100;
	var icon = _this.add.image(0, 0, "ss_ui", "indicator_boost_0000");
	this.layerIndicatorBoost.add(icon);
	var txt_x = _this.addText(this.layerIndicatorBoost, 23, 19, "X2", 24);
	txt_x.setTint(16773888);
	this.textTurboFactor = txt_x;
	var txt = _this.addText(this.layerIndicatorBoost, 0, 44 + 3, "", 18);
	txt.setText(_this.secToHHMMSS(59));
	this.layerIndicatorBoost.visible = false;
	this.textFieldIndicatorBoost = txt
};
GameGUI.prototype.enableIndcatorBoostSpeed = function(bool) {
	_this = this.gameScreen;
	this.layerIndicatorBoost.visible = bool;
	this.updateIndicatorsBonus("speed_x2", bool)
};
GameGUI.prototype.updateIndcatorBoostSpeed = function(vValue) {
	this.textFieldIndicatorBoost.setText(vValue)
};
GameGUI.prototype.updateIndicatorsBonus = function(type, bool) {
	_this = this.gameScreen;
	var posY = 140;
	if (type == "speed_x2") {
		if (bool) {
			if (_this.countDownBonusCoins == 0) {
				this.layerIndicatorBoost.y = posY
			} else {
				this.layerIndicatorBoost.y = posY + 100
			}
		} else {
			if (_this.countDownBonusSpeed == 0) {
				this.layerIndicatorCoins.y = posY
			}
		}
	} else if (type == "coins_x5") {
		if (bool) {
			if (_this.countDownBonusSpeed == 0) {
				this.layerIndicatorCoins.y = posY
			} else {
				this.layerIndicatorCoins.y = posY + 100
			}
		} else {
			if (_this.countDownBonusCoins == 0) {
				this.layerIndicatorBoost.y = posY
			}
		}
	}
};
GameGUI.prototype.initBasketTrash = function() {
	_this = this.gameScreen;
	var posX = 250;
	var posY = 570;
	this.icon_trash = _this.add.image(posX + 210, posY, "ss_ui", "btn_delete_0000");
	this.icon_trash.setScale(.9);
	var effect = _this.add.sprite(this.icon_trash.x, this.icon_trash.y, "ss_ui");
	effect.play("delete_flash");
	effect.visible = false;
	this.delete_flash = effect;
	this.icon_trash.setDepth(_this.DEPTH_GUI);
	this.delete_flash.setDepth(_this.DEPTH_GUI)
};
GameGUI.prototype.initCoinsText = function() {
	_this = this.gameScreen;
	this.list_textCoins = [];
	for (var i = 0; i < _this.MAX_PARKING; i++) {
		var obj = this.addTextCoin(0, 0);
		this.list_textCoins.push(obj)
	}
};
GameGUI.prototype.addTextCoin = function(vX, vY) {
	_this = this.gameScreen;
	var txt = _this.add.bitmapText(vX, vY, "Panton", "");
	txt.setFontSize(26);
	txt.setOrigin(.5, 1);
	txt.setDepth(_this.DEPTH_text_coins);
	txt.visible = false;
	return txt
};
GameGUI.prototype.showCoinText = function(vNum, vValue, vX, vY) {
	_this = this.gameScreen;
	var obj = this.list_textCoins[vNum];
	obj.x = vX;
	obj.y = vY;
	var text_coins_warm = _this.convertNumberFormat(vValue);
	obj.setText("+" + text_coins_warm);
	obj.visible = true;
	obj.setAlpha(.2);
	obj.setScale(.8);
	_this.tweens.killTweensOf(obj);
	_this.tweens.add({
		targets: obj,
		alpha: 1,
		ease: "Linear",
		duration: 150
	});
	_this.tweens.add({
		targets: obj,
		scaleX: 1,
		scaleY: 1,
		ease: "Linear",
		duration: 150
	});
	_this.tweens.add({
		targets: obj,
		alpha: 0,
		ease: "Linear",
		delay: 300,
		duration: 300,
		onComplete: function() {
			obj.visible = false
		}
	});
	_this.tweens.add({
		targets: obj,
		y: obj.y - 40,
		ease: "Linear",
		duration: 600
	})
};
GameGUI.prototype.initSystemMessage = function() {
	_this = this.gameScreen;
	this.textSystemContainer = _this.add.container();
	this.textSystemContainer.x = this.midX;
	this.textSystemContainer.y = MainGame.world.centerY - 100;
	var txt = _this.add.bitmapText(0, 0, "Panton", "");
	txt.setDropShadow(3, 3, 0, 1);
	txt.setOrigin(.5);
	txt.setMaxWidth(550);
	txt.setCenterAlign();
	txt.setFontSize(34);
	this.textSystemContainer.add(txt);
	this.textSystemContainer.setDepth(_this.DEPTH_systemtext);
	this.textSystemContainer.visible = false;
	this.textSystem = txt
};
GameGUI.prototype.showSystemMessage = function(vText) {
	_this = this.gameScreen;
	this.textSystemContainer.visible = true;
	this.textSystem.setText(vText);
	this.textSystemContainer.alpha = .2;
	this.textSystemContainer.y = this.midY - 20;
	this.textSystemContainer.setScale(.8);
	_this.tweens.killTweensOf(this.textSystemContainer);
	_this.tweens.add({
		targets: this.textSystemContainer,
		alpha: 1,
		ease: "Linear",
		duration: 150
	});
	_this.tweens.add({
		targets: this.textSystemContainer,
		scaleX: 1,
		scaleY: 1,
		ease: "Linear",
		duration: 150
	});
	_this.tweens.add({
		targets: this.textSystemContainer,
		alpha: 0,
		ease: "Linear",
		delay: 1500,
		duration: 200,
		onComplete: this.finishSystemTextTween
	});
	_this.tweens.add({
		targets: this.textSystemContainer,
		y: this.textSystemContainer.y - 20,
		ease: "Linear",
		delay: 150,
		duration: 1200
	})
};
GameGUI.prototype.finishSystemTextTween = function() {
	MainGame.state.gameGUI.textSystemContainer.visible = false
};
GameGUI.prototype.updateFastBuy = function() {
	_this = this.gameScreen;
	var typeFastCar = _this.getTypeBetterPrice();
	var price = _this.getPriceCar(typeFastCar);
	price = Math.round(price * _this.factorDiscount);
	var text_coins_warm = _this.convertNumberFormat(price);
	this.buttonAddCar.text.setText(text_coins_warm);
	this.buttonAddCar.text.x = 50;
	this.buttonAddCar.text.y = -2;
	this.icon_fast_coin.x = this.buttonAddCar.text.x - this.buttonAddCar.text.width * .5 - 20;
	this.icon_fast_car.setFrame("icon_f" + typeFastCar + "_0000")
};
GameGUI.prototype.initSpider = function() {
	_this = this.gameScreen;
	this.spider_web = _this.add.image(1e3, -100, "ss_ui", "spider_web_0000");
	this.spider_web.setOrigin(.5, 0);
	this.spider = _this.add.image(1e3, -100, "ss_ui", "spider_0000");
	this.spider_web.setDepth(_this.DEPTH_helicopter);
	this.spider.setDepth(_this.DEPTH_helicopter);
	this.spider_web.displayHeight = this.spider.y + 100;
	this.spider.setInteractive(new Phaser.Geom.Circle(0, 0, 50), Phaser.Geom.Circle.Contains);
	this.spider.on("pointerup", this.onHideSpider, this);
	this.spider.on("pointerover", this.onHideSpider, this);
	var timeSec = MyMath.getRandomInt(3, 10);
	_this.time.delayedCall(timeSec * 1e3, this.moveSpider, [250], this);
	this.isSpiderTweening = false
};
GameGUI.prototype.moveSpider = function(vY, vIsBack) {
	if (this.isSpiderTweening) return;
	_this.tweens.killTweensOf(this.spider);
	var typeTween = Phaser.Math.Easing.Back.Out;
	if (vIsBack) typeTween = Phaser.Math.Easing.Back.In;
	this.isSpiderTweening = true;
	_this.tweens.add({
		targets: this.spider,
		y: vY,
		ease: typeTween,
		duration: 800,
		delay: 0,
		onUpdate: () => {
			this.spider_web.displayHeight = this.spider.y + 100
		},
		onComplete: () => {
			if (this.isSpiderTweening) {
				this.isSpiderTweening = false;
				var timeSec = MyMath.getRandomInt(2, 10);
				if (this.spider.y > 0) {
					_this.time.delayedCall(timeSec * 1e3, this.moveSpider, [-100, true], this)
				} else {
					timeSec = MyMath.getRandomInt(10, 30);
					_this.time.delayedCall(timeSec * 1e3, this.moveSpider, [250, false], this)
				}
			}
		}
	})
};
GameGUI.prototype.onHideSpider = function() {
	this.moveSpider(-100, true)
};
GameGUI.prototype.initHelicopter = function() {
	_this = this.gameScreen;
	this.helicopter = _this.add.container();
	this.helicopter.setInteractive(new Phaser.Geom.Circle(0, 0, 80), Phaser.Geom.Circle.Contains);
	this.helicopter.on("pointerup", this.onClickHelicopter, this);
	this.helicopter.setDepth(_this.DEPTH_helicopter);
	this.helicopter.x = this.midX - 100;
	this.helicopter.y = 300;
	var dron_box = _this.add.image(0, 15 - 60, "ss_ui", "box_drone_0000");
	dron_box.setOrigin(.5, .1);
	var dron_body = _this.add.image(0, -65, "ss_ui", "booster_0000");
	var propeller1 = _this.add.sprite(0, dron_body.y - 23, "ss_ui");
	propeller1.play("propeller1");
	this.helicopter.add(dron_box);
	this.helicopter.add(dron_body);
	this.helicopter.add(propeller1);
	this.dron_box = dron_box;
	this.dron_body = dron_body;
	this.dron_propeller = propeller1;
	this.helicopter.visible = false;
	if (MainGame.EVENT_NUM == 1) {
		var bat = _this.add.sprite(0, -60, "ss_ui");
		bat.play("booster_halloween");
		this.helicopter.add(bat);
		this.dron_body = bat;
		propeller1.visible = false;
		dron_body.visible = false
	} else if (MainGame.EVENT_NUM == 2) {
		dron_box.setFrame("box_drone_c_0000");
		dron_body.setFrame("booster_c_0000")
	}
};
GameGUI.prototype.showHelicopter = function() {
	this.isShowHelicopter = true;
	this.helicopter.visible = true;
	this.countHelicopterFly = 3;
	this.flagHelicopter = false;
	if (this.flagHelicopter) {
		this.helicopter.x = this.midX + 500
	} else {
		this.helicopter.x = this.midX - 500
	}
	this.waveCount = 0;
	this.waveStart = 2 * Math.random()
};
GameGUI.prototype.updateHelicopter = function() {
	if (!this.isShowHelicopter) return;
	this.waveCount += .02;
	this.helicopter.y = 250 + Math.sin(this.waveStart + this.waveCount) * 50;
	if (this.flagHelicopter) {
		this.dron_body.angle = Phaser.Math.RadToDeg(Math.sin(this.waveCount) * .07) - 5;
		this.dron_box.angle = Phaser.Math.RadToDeg(Math.sin(this.waveCount) * .25) - 10
	} else {
		this.dron_body.angle = Phaser.Math.RadToDeg(Math.sin(this.waveCount) * .07) + 5;
		this.dron_box.angle = Phaser.Math.RadToDeg(Math.sin(this.waveCount) * .25) + 10
	}
	this.dron_propeller.angle = this.dron_body.angle;
	if (this.flagHelicopter) {
		this.helicopter.x -= 1;
		if (this.helicopter.x < this.midX - 500) {
			this.flagHelicopter = false;
			this.countHelicopterFly--;
			if (this.countHelicopterFly <= 0) {
				this.isShowHelicopter = false;
				this.helicopter.visible = false
			}
		}
	} else {
		this.helicopter.x += 1;
		if (this.helicopter.x > this.midX + 20) {
			this.flagHelicopter = true;
			this.countHelicopterFly--
		}
	}
};
GameGUI.prototype.onClickHelicopter = function() {
	if (!this.buttonEnabled) return;
	_this = this.gameScreen;
	this.showBoosterWindow(_this.helicopterBonus);
	if (_this.helicopterBonus == "coins") {
		_this.helicopterBonus = "boxes"
	} else {
		_this.helicopterBonus = "coins"
	}
};
GameGUI.prototype.onFonInputDown = function() {
	this.isOnInputDown = true
};
GameGUI.prototype.onPopupOpen = function() {
	this.isPopupOpened = true
};
GameGUI.prototype.onFonInputUp = function() {
	if (!this.isOnInputDown) return;
	if (!this.isPopupOpened) return;
	this.eventFonImputUp()
};
GameGUI.prototype.initUpgradeWindow = function() {
	_this = this.gameScreen;
	this.layerUpgradeWindowMain = _this.add.container();
	this.layerUpgradeWindow = _this.add.container();
	this.layerUpgradeWindowMain.setDepth(_this.DEPTH_layerMerge);
	this.layerUpgradeWindow.setDepth(_this.DEPTH_layerUnlock);
	this.layerUpgradeWindow.x = this.midX;
	this.layerUpgradeWindow.y = this.midY + this.posWindowY;
	var fon_merge = _this.add.image(this.midX, this.midY, "ss_ui", "bg_connect_0000");
	fon_merge.setScale(2);
	this.layerUpgradeWindowMain.add(fon_merge);
	var fon_unlock = _this.add.image(0, 0, "ss_ui", "popup_unlocked_0000");
	fon_unlock.setScale(2);
	this.layerUpgradeWindow.add(fon_unlock);
	var posX = 0;
	var posY = -10;
	var effect = _this.add.sprite(120, posY, "ss_ui");
	effect.play("magic_1");
	effect.setScale(2);
	this.layerUpgradeWindow.add(effect);
	var panel_number1 = _this.add.image(posX - 135 - 50, posY - 100, "ss_ui", "panel_number_0000");
	panel_number1.setScale(1.15);
	this.layerUpgradeWindow.add(panel_number1);
	var panel_number2 = _this.add.image(posX + 135 - 50, posY - 100, "ss_ui", "panel_number_0000");
	panel_number2.setScale(1.15);
	this.layerUpgradeWindow.add(panel_number2);
	var arrow_icon = _this.add.image(posX + 0, posY + 0, "ss_ui", "arrow_0000");
	this.layerUpgradeWindow.add(arrow_icon);
	var buttonClose = new Button(220, -255, "ss_ui", "btn_close_0000", this.closeUpgadeWindow, _this, this);
	this.layerUpgradeWindow.add(buttonClose);
	var buttonContinue = new ButtonText(0, 200, "ss_ui", "btn_buy2_0000", _this.showAdsForFreeUpgrade, _this, MainGame.GAME_TEXT.free);
	buttonContinue.text.setFontSize(26);
	buttonContinue.text.x = -20;
	buttonContinue.text.y = -4;
	this.layerUpgradeWindow.add(buttonContinue);
	MainGame.updateTextWidth(buttonContinue.text, 200);
	this.buttonFreeUpgrade = buttonContinue;
	var icon_reward = _this.add.image(75, -2, "ss_ui", "icon_reward_0000");
	buttonContinue.add(icon_reward);
	var text_title = _this.addText(this.layerUpgradeWindow, 0, -255, MainGame.GAME_TEXT.free_upgrade, 34, true);
	MainGame.updateTextWidth(text_title, 400);
	var text_level1 = _this.addText(this.layerUpgradeWindow, panel_number1.x + 70, panel_number1.y - 2, MainGame.GAME_TEXT.level, 24, true);
	MainGame.updateTextWidth(text_level1, 400);
	var text_level2 = _this.addText(this.layerUpgradeWindow, panel_number2.x + 70, panel_number1.y - 2, MainGame.GAME_TEXT.level, 24, true);
	MainGame.updateTextWidth(text_level2, 400);
	var text_levelGun1 = _this.addText(this.layerUpgradeWindow, panel_number1.x - 1, panel_number1.y - 2, "2", 24);
	text_levelGun1.setTint(0);
	var text_levelGun2 = _this.addText(this.layerUpgradeWindow, panel_number2.x - 1, panel_number2.y - 2, "4", 24);
	text_levelGun2.setTint(0);
	this.text_levelGun1 = text_levelGun1;
	this.text_levelGun2 = text_levelGun2;
	this.layerUpgradeWindowMain.visible = false;
	this.layerUpgradeWindow.visible = false;
	var gun1 = _this.add.image(-140 + 10, posY, "ss_main", "icon_f1_0000");
	gun1.setScale(1.2);
	this.layerUpgradeWindow.add(gun1);
	var gun2 = _this.add.image(140, posY, "ss_main", "icon_f1_0000");
	gun2.setScale(1.2);
	this.layerUpgradeWindow.add(gun2);
	this.gun1 = gun1;
	this.gun2 = gun2;
	fon_unlock.setInteractive();
	fon_merge.setInteractive();
	fon_merge.on("pointerdown", this.onFonInputDown, this);
	fon_merge.on("pointerup", this.onFonInputUp, this)
};
GameGUI.prototype.showUpgradeWindow = function(vLevelGun) {
	_this = this.gameScreen;
	this.layerUpgradeWindowMain.visible = true;
	this.layerUpgradeWindow.visible = true;
	this.layerUpgradeWindow.setScale(this.scaleWindow1);
	_this.tweens.add({
		targets: this.layerUpgradeWindow,
		scaleX: this.scaleWindow2,
		scaleY: this.scaleWindow2,
		ease: Phaser.Math.Easing.Back.Out,
		duration: 400
	});
	var lvl_left = vLevelGun;
	var lvl_right = vLevelGun + 2;
	this.text_levelGun1.setText(lvl_left);
	this.text_levelGun2.setText(lvl_right);
	this.gun1.setFrame("icon_f" + lvl_left + "_0000");
	this.gun2.setFrame("icon_f" + lvl_right + "_0000");
	this.buttonFreeUpgrade.setEnable(true);
	this.disableMainButtons();
	this.eventFonImputUp = this.closeUpgadeWindow;
	_this.time.delayedCall(this.TIME_OPEN_POPUP, this.onPopupOpen, [], this)
};
GameGUI.prototype.closeUpgadeWindow = function() {
	if (MainGame.isAPI) MainGame.API_POKI.commercialBreak();
	this.layerUpgradeWindowMain.visible = false;
	this.layerUpgradeWindow.visible = false;
	this.enableMainButtons()
};
GameGUI.prototype.initTurboWindow = function() {
	_this = this.gameScreen;
	this.layerTurboWindowMain = _this.add.container();
	this.layerTurboWindow = _this.add.container();
	this.layerTurboWindowMain.setDepth(_this.DEPTH_layerMerge);
	this.layerTurboWindow.setDepth(_this.DEPTH_layerUnlock);
	this.layerTurboWindow.x = this.midX;
	this.layerTurboWindow.y = this.midY + this.posWindowY;
	var fon_merge = _this.add.image(this.midX, this.midY, "ss_ui", "bg_connect_0000");
	fon_merge.setScale(2);
	this.layerTurboWindowMain.add(fon_merge);
	var fon_unlock = _this.add.image(0, 0, "ss_ui", "popup_unlocked_0000");
	fon_unlock.setScale(2);
	this.layerTurboWindow.add(fon_unlock);
	var posX = 0;
	var posY = -75;
	var effect = _this.add.sprite(posX, posY, "ss_ui");
	effect.play("magic_1");
	effect.setScale(2);
	this.layerTurboWindow.add(effect);
	var window_icon = _this.add.image(posX, posY, "ss_ui", "indicator_big_boost_0000");
	this.layerTurboWindow.add(window_icon);
	this.turboBarB = _this.add.image(0, 80, "ss_ui", "bar_turbo1_0000");
	this.turboBarT = _this.add.image(0, 80, "ss_ui", "bar_turbo2_0000");
	this.turboBarT_crop = new Phaser.Geom.Rectangle(0, 0, 0, this.turboBarT.height);
	this.turboBarT.setCrop(this.turboBarT_crop);
	this.layerTurboWindow.add(this.turboBarB);
	this.layerTurboWindow.add(this.turboBarT);
	var buttonClose = new Button(220, -254, "ss_ui", "btn_close_0000", this.closeTurbo, _this, this);
	this.layerTurboWindow.add(buttonClose);
	var buttonContinue = new ButtonText(0, 200, "ss_ui", "btn_buy2_0000", _this.showAdsForTurbo, _this, MainGame.GAME_TEXT.free);
	buttonContinue.text.setFontSize(24);
	buttonContinue.text.x = -20;
	buttonContinue.text.y = -4;
	this.layerTurboWindow.add(buttonContinue);
	MainGame.updateTextWidth(buttonContinue.text, 200);
	this.buttonActivateTurbo = buttonContinue;
	var icon_reward = _this.add.image(70, -2, "ss_ui", "icon_reward_0000");
	buttonContinue.add(icon_reward);
	_this.addText(this.layerTurboWindow, -100, 40, "X2", 30, true);
	_this.addText(this.layerTurboWindow, 100, 40, "X3", 30, true);
	var text_add_turbo_seconds = _this.addText(this.layerTurboWindow, 0, 140, MainGame.GAME_TEXT.add_turbo_seconds, 22, true);
	MainGame.updateTextWidth(text_add_turbo_seconds, 400);
	var text_title = _this.addText(this.layerTurboWindow, 0, -255, MainGame.GAME_TEXT.turbo, 34, true);
	MainGame.updateTextWidth(text_title, 400);
	this.layerTurboWindowMain.visible = false;
	this.layerTurboWindow.visible = false;
	fon_unlock.setInteractive();
	fon_merge.setInteractive();
	fon_merge.on("pointerdown", this.onFonInputDown, this);
	fon_merge.on("pointerup", this.onFonInputUp, this);
	this.layerTurboWindow.setScale(this.scaleWindow2)
};
GameGUI.prototype.updateTurboBar = function(vForce) {
	_this = this.gameScreen;
	var max_value = 12 * _this.TIME_BOOST;
	var progress = _this.countDownBonusSpeed / max_value;
	var originalWidth = this.turboBarT.width;
	var width = originalWidth * progress;
	_this.tweens.killTweensOf(this.turboBarT_crop);
	if (vForce) {
		this.turboBarT_crop.width = width;
		this.turboBarT.setCrop(this.turboBarT_crop);
		return
	}
	_this.tweens.add({
		targets: this.turboBarT_crop,
		width: width,
		ease: Phaser.Math.Easing.Linear,
		duration: 200,
		delay: 0,
		onUpdate: () => {
			this.turboBarT.setCrop(this.turboBarT_crop)
		}
	})
};
GameGUI.prototype.clickTurbo = function() {
	this.layerTurboWindowMain.visible = true;
	this.layerTurboWindow.visible = true;
	this.disableMainButtons();
	if (MainGame.isAPI) {
		if (MainGame.API_POKI && MainGame.API_POKI.api_isAdblock) this.buttonActivateTurbo.setEnable(false)
	} else {
		if (!MainGame.isDebug) this.buttonActivateTurbo.setEnable(false)
	}
	this.showBanner();
	this.eventFonImputUp = this.closeTurbo;
	_this.time.delayedCall(this.TIME_OPEN_POPUP, this.onPopupOpen, [], this)
};
GameGUI.prototype.closeTurbo = function() {
	MainGame.isApiGameplayStop = true;
	if (MainGame.isAPI) MainGame.API_POKI.commercialBreak();
	this.layerTurboWindowMain.visible = false;
	this.layerTurboWindow.visible = false;
	this.enableMainButtons()
};
GameGUI.prototype.initBoosterWindow = function() {
	_this = this.gameScreen;
	this.layerBoosterWindowMain = _this.add.container();
	this.layerBoosterWindow = _this.add.container();
	this.layerBoosterWindowMain.setDepth(_this.DEPTH_layerMerge);
	this.layerBoosterWindow.setDepth(_this.DEPTH_layerUnlock);
	this.layerBoosterWindow.x = this.midX;
	this.layerBoosterWindow.y = this.midY + this.posWindowY;
	var fon_merge = _this.add.image(this.midX, this.midY, "ss_ui", "bg_connect_0000");
	fon_merge.setScale(2);
	this.layerBoosterWindowMain.add(fon_merge);
	var popup_drop = _this.add.sprite(0, 0, "ss_ui", "popup_drop_0000");
	popup_drop.setScale(2);
	this.layerBoosterWindow.add(popup_drop);
	var effect = _this.add.sprite(0, -20, "ss_ui");
	effect.play("magic_1");
	effect.setScale(2);
	this.layerBoosterWindow.add(effect);
	var helicopter_icon = _this.add.image(-30, -55, "ss_ui", "helicopter_icon_0000");
	this.layerBoosterWindow.add(helicopter_icon);
	if (MainGame.EVENT_NUM == 1) {
		helicopter_icon.setFrame("helicopter_icon_halloween_0000")
	} else if (MainGame.EVENT_NUM == 2) {
		helicopter_icon.setFrame("helicopter_icon_c_0000")
	}
	helicopter_icon.angle = -20;
	var few_coins = _this.add.image(80, -5, "ss_ui", "few_coins_0000");
	this.layerBoosterWindow.add(few_coins);
	var box2 = _this.add.image(75, 15, "ss_ui", "box2_0000");
	this.layerBoosterWindow.add(box2);
	var buttonClose = new Button(220, -185, "ss_ui", "btn_close_0000", this.closeBoost, _this, this);
	this.layerBoosterWindow.add(buttonClose);
	var buttonContinue = new ButtonText(0, 145, "ss_ui", "btn_buy2_0000", this.clickBoost, _this, MainGame.GAME_TEXT.activate, null, this);
	buttonContinue.text.setFontSize(26);
	buttonContinue.text.x = -20;
	buttonContinue.text.y = -4;
	this.layerBoosterWindow.add(buttonContinue);
	MainGame.updateTextWidth(buttonContinue.text, 200);
	var icon_reward = _this.add.image(80, -2, "ss_ui", "icon_reward_0000");
	buttonContinue.add(icon_reward);
	this.boostBtnAds = buttonContinue;
	var text1 = _this.addText(this.layerBoosterWindow, 0, -185, MainGame.GAME_TEXT.boost_message, 30, true);
	MainGame.updateTextWidth(text1, 380);
	var text2 = _this.addText(this.layerBoosterWindow, 0, 75, MainGame.GAME_TEXT.better_drop, 24, true);
	MainGame.updateTextWidth(text2, 480);
	var text3 = _this.addText(this.layerBoosterWindow, 142, -34, "X" + _this.value_boost, 36);
	text3.setTint(16773888);
	var text4 = _this.addText(this.layerBoosterWindow, 0, 75, MainGame.GAME_TEXT.guns_4, 24, true);
	MainGame.updateTextWidth(text4, 480);
	this.boosterWindowIconCoins = few_coins;
	this.boosterWindowTextCoins1 = text2;
	this.boosterWindowTextCoins2 = text3;
	this.boosterWindowIconBox = box2;
	this.boosterWindowTextBox = text4;
	this.layerBoosterWindowMain.visible = false;
	this.layerBoosterWindow.visible = false;
	popup_drop.setInteractive();
	fon_merge.setInteractive();
	fon_merge.on("pointerdown", this.onFonInputDown, this);
	fon_merge.on("pointerup", this.onFonInputUp, this)
};
GameGUI.prototype.showBoosterWindow = function(vBonus) {
	_this = this.gameScreen;
	this.typeDronBonus = vBonus;
	this.boosterWindowIconCoins.visible = false;
	this.boosterWindowTextCoins1.visible = false;
	this.boosterWindowTextCoins2.visible = false;
	this.boosterWindowIconBox.visible = false;
	this.boosterWindowTextBox.visible = false;
	if (this.typeDronBonus == "coins") {
		this.boosterWindowIconCoins.visible = true;
		this.boosterWindowTextCoins1.visible = true;
		this.boosterWindowTextCoins2.visible = true
	} else {
		this.boosterWindowIconBox.visible = true;
		this.boosterWindowTextBox.visible = true
	}
	this.isShowHelicopter = false;
	this.helicopter.visible = false;
	this.layerBoosterWindow.visible = true;
	this.layerBoosterWindowMain.visible = true;
	this.layerBoosterWindow.setScale(this.scaleWindow1);
	_this.tweens.add({
		targets: this.layerBoosterWindow,
		scaleX: this.scaleWindow2,
		scaleY: this.scaleWindow2,
		ease: Phaser.Math.Easing.Back.Out,
		duration: 400
	});
	this.disableMainButtons();
	this.boostBtnAds.setEnable(true);
	if (MainGame.isAPI) {
		if (MainGame.API_POKI && MainGame.API_POKI.api_isAdblock) this.boostBtnAds.setEnable(false)
	} else {
		if (!MainGame.isDebug) this.boostBtnAds.setEnable(false)
	}
	this.showBanner();
	this.eventFonImputUp = this.closeBoost;
	_this.time.delayedCall(this.TIME_OPEN_POPUP, this.onPopupOpen, [], this)
};
GameGUI.prototype.clickBoost = function() {
	_this = this.gameScreen;
	this.layerBoosterWindow.visible = false;
	this.layerBoosterWindowMain.visible = false;
	_this.showAdsForHelicopter(this.typeDronBonus);
	this.enableMainButtons()
};
GameGUI.prototype.closeBoost = function() {
	if (MainGame.isAPI) MainGame.API_POKI.commercialBreak();
	this.layerBoosterWindow.visible = false;
	this.layerBoosterWindowMain.visible = false;
	this.enableMainButtons()
};
GameGUI.prototype.initSettingsWindow = function() {
	_this = this.gameScreen;
	this.layerSettingsWindowMain = _this.add.container();
	this.layerSettingsWindow = _this.add.container();
	this.layerSettingsWindowMain.setDepth(_this.DEPTH_layerMerge);
	this.layerSettingsWindow.setDepth(_this.DEPTH_layerUnlock);
	this.layerSettingsWindow.x = this.midX;
	this.layerSettingsWindow.y = this.midY + this.posWindowY;
	var fon_merge = _this.add.image(this.midX, this.midY, "ss_ui", "bg_connect_0000");
	fon_merge.setScale(2);
	this.layerSettingsWindowMain.add(fon_merge);
	var popup_drop = _this.add.image(0, 0, "ss_ui", "popup_unlocked_0000");
	popup_drop.setScale(2);
	this.layerSettingsWindow.add(popup_drop);
	var logo_tbs = _this.add.image(0, 135 - 60, "ss_ui", "logo_tbs_0000");
	this.layerSettingsWindow.add(logo_tbs);
	var buttonMuteMusic = new ButtonText(0, -80 - 70, "ss_ui", "btn_buy_0000", this.clickMuteMusic, _this, MainGame.GAME_TEXT.music_on, null, this);
	buttonMuteMusic.text.setFontSize(24);
	buttonMuteMusic.text.x = 20;
	buttonMuteMusic.text.y = -5;
	this.layerSettingsWindow.add(buttonMuteMusic);
	MainGame.updateTextWidth(buttonMuteMusic.text, 140);
	var icon_music = _this.add.image(-85, -5, "ss_ui", "btn_music_0000");
	buttonMuteMusic.add(icon_music);
	this.buttonMuteMusic = buttonMuteMusic;
	this.buttonMuteMusic.icon = icon_music;
	var buttonMuteSound = new ButtonText(0, buttonMuteMusic.y + 70, "ss_ui", "btn_buy_0000", this.clickMuteSound, _this, MainGame.GAME_TEXT.sound_on, null, this);
	buttonMuteSound.text.setFontSize(24);
	buttonMuteSound.text.x = 20;
	buttonMuteSound.text.y = -5;
	this.layerSettingsWindow.add(buttonMuteSound);
	MainGame.updateTextWidth(buttonMuteSound.text, 140);
	var icon_sound = _this.add.image(-85, -5, "ss_ui", "btn_sound_0000");
	buttonMuteSound.add(icon_sound);
	this.buttonMuteSound = buttonMuteSound;
	this.buttonMuteSound.icon = icon_sound;
	var buttonClose = new Button(220, -254, "ss_ui", "btn_close_0000", this.closeSettings, _this, this);
	this.layerSettingsWindow.add(buttonClose);
	var textTitle = _this.addText(this.layerSettingsWindow, 0, -255, MainGame.GAME_TEXT.settings, 30, true);
	MainGame.updateTextWidth(textTitle, 380);
	var textDevs = _this.addText(this.layerSettingsWindow, 0, logo_tbs.y - 80, MainGame.GAME_TEXT.developed_by, 24, true);
	MainGame.updateTextWidth(textDevs, 380);
	var textMusic = _this.addText(this.layerSettingsWindow, 0, 170, MainGame.GAME_TEXT.music_by, 24, true);
	MainGame.updateTextWidth(textMusic, 380);
	_this.addText(this.layerSettingsWindow, 0, textMusic.y + 40, "GRIN DANILOV", 24, true);
	this.layerSettingsWindowMain.visible = false;
	this.layerSettingsWindow.visible = false;
	var textVersion = _this.addText(this.layerSettingsWindow, 245, 260, MainGame.version, 18);
	textVersion.setOrigin(1, .5);
	popup_drop.setInteractive();
	fon_merge.setInteractive();
	fon_merge.on("pointerdown", this.onFonInputDown, this);
	fon_merge.on("pointerup", this.onFonInputUp, this)
};
GameGUI.prototype.openSettings = function() {
	_this = this.gameScreen;
	this.layerSettingsWindowMain.visible = true;
	this.layerSettingsWindow.visible = true;
	this.layerSettingsWindow.setScale(this.scaleWindow1);
	_this.tweens.add({
		targets: this.layerSettingsWindow,
		scaleX: this.scaleWindow2,
		scaleY: this.scaleWindow2,
		ease: Phaser.Math.Easing.Back.Out,
		duration: 400
	});
	this.disableMainButtons();
	MainGame.Sfx.update("music", this.buttonMuteMusic.icon, this.buttonMuteMusic.text);
	MainGame.Sfx.update("sound", this.buttonMuteSound.icon, this.buttonMuteSound.text);
	this.eventFonImputUp = this.closeSettings;
	_this.time.delayedCall(this.TIME_OPEN_POPUP, this.onPopupOpen, [], this)
};
GameGUI.prototype.closeSettings = function() {
	if (MainGame.isAPI) MainGame.API_POKI.commercialBreak();
	this.layerSettingsWindowMain.visible = false;
	this.layerSettingsWindow.visible = false;
	this.enableMainButtons()
};
GameGUI.prototype.initOfflineEarningWindow = function() {
	_this = this.gameScreen;
	this.layerOfflineEarningWindowMain = _this.add.container();
	this.layerOfflineEarningWindow = _this.add.container();
	this.layerOfflineEarningWindowMain.setDepth(_this.DEPTH_layerMerge);
	this.layerOfflineEarningWindow.setDepth(_this.DEPTH_layerUnlock);
	this.layerOfflineEarningWindow.x = this.midX;
	this.layerOfflineEarningWindow.y = this.midY + this.posWindowY;
	var fon_merge = _this.add.image(this.midX, this.midY, "ss_ui", "bg_connect_0000");
	fon_merge.setScale(2);
	this.layerOfflineEarningWindowMain.add(fon_merge);
	var fon_unlock = _this.add.image(0, 0, "ss_ui", "popup_unlocked_0000");
	fon_unlock.setScale(2);
	this.layerOfflineEarningWindow.add(fon_unlock);
	var posX = 0;
	var posY = -45;
	var effect = _this.add.sprite(posX - 5, posY, "ss_ui");
	effect.play("magic_1");
	effect.setScale(2);
	this.layerOfflineEarningWindow.add(effect);
	var lvlup_icon = _this.add.image(posX + 0, posY + 0, "ss_ui", "offline_coins_0000");
	this.layerOfflineEarningWindow.add(lvlup_icon);
	var text_offline_earn = _this.addText(this.layerOfflineEarningWindow, 0, -255, MainGame.GAME_TEXT.offline_earn, 34, true);
	MainGame.updateTextWidth(text_offline_earn, 400);
	var offline_earning_text = _this.addText(this.layerOfflineEarningWindow, 0, 95, "", 40, true);
	this.offline_earning_text = offline_earning_text;
	var buttonClose = new ButtonText(0, 250, "ss_ui", "btn_buy2_0000", this.closeOfflineEarningWindow, _this, MainGame.GAME_TEXT.tap_continue, null, this);
	buttonClose.text.setFontSize(20);
	this.layerOfflineEarningWindow.add(buttonClose);
	MainGame.updateTextWidth(buttonClose.text, 320);
	buttonClose.text.y = -4;
	buttonClose.back.alpha = .01;
	var buttonContinue = new ButtonText(0, 170, "ss_ui", "btn_buy2_0000", _this.showAdsForCoinsX2, _this, MainGame.GAME_TEXT.coins_x2);
	buttonContinue.text.setFontSize(26);
	this.layerOfflineEarningWindow.add(buttonContinue);
	MainGame.updateTextWidth(buttonContinue.text, 200);
	buttonContinue.text.x = -20;
	buttonContinue.text.y = -4;
	var icon_reward = _this.add.image(80, -2, "ss_ui", "icon_reward_0000");
	buttonContinue.add(icon_reward);
	this.offlineEarningBtnAds = buttonContinue;
	this.layerOfflineEarningWindowMain.visible = false;
	this.layerOfflineEarningWindow.visible = false;
	fon_unlock.setInteractive();
	fon_merge.setInteractive();
	fon_merge.on("pointerdown", this.onFonInputDown, this);
	fon_merge.on("pointerup", this.onFonInputUp, this)
};
GameGUI.prototype.showOfflineEarningWindow = function(vValueCoins) {
	_this = this.gameScreen;
	this.layerOfflineEarningWindow.visible = true;
	this.layerOfflineEarningWindowMain.visible = true;
	this.layerOfflineEarningWindow.setScale(this.scaleWindow1);
	_this.tweens.add({
		targets: this.layerOfflineEarningWindow,
		scaleX: this.scaleWindow2,
		scaleY: this.scaleWindow2,
		ease: Phaser.Math.Easing.Back.Out,
		duration: 400
	});
	this.disableMainButtons(true);
	var coins = vValueCoins;
	var text_coins_warm = _this.convertNumberFormat(coins);
	this.offline_earning_text.setText("+" + text_coins_warm);
	MainGame.Sfx.play("sound", "offline_earning");
	if (MainGame.isAPI) {
		if (MainGame.API_POKI && MainGame.API_POKI.api_isAdblock) this.offlineEarningBtnAds.setEnable(false)
	} else {
		if (!MainGame.isDebug) this.offlineEarningBtnAds.setEnable(false)
	}
	this.eventFonImputUp = this.closeOfflineEarningWindowOutAir;
	_this.time.delayedCall(this.TIME_OPEN_POPUP, this.onPopupOpen, [], this)
};
GameGUI.prototype.closeOfflineEarningWindowOutAir = function() {
	MainGame.isApiGameplayStop = true;
	if (MainGame.isAPI) MainGame.API_POKI.commercialBreak();
	this.layerOfflineEarningWindowMain.visible = false;
	this.layerOfflineEarningWindow.visible = false;
	this.enableMainButtons()
};
GameGUI.prototype.closeOfflineEarningWindow = function(isSkipCallAds) {
	MainGame.isApiGameplayStop = true;
	if (!isSkipCallAds && MainGame.isAPI) MainGame.API_POKI.commercialBreak();
	this.layerOfflineEarningWindowMain.visible = false;
	this.layerOfflineEarningWindow.visible = false;
	this.enableMainButtons()
};
GameGUI.prototype.initLevelUpWindow = function() {
	_this = this.gameScreen;
	this.layerLevelUpWindowMain = _this.add.container();
	this.layerLevelUpWindow = _this.add.container();
	this.layerLevelUpWindowMain.setDepth(_this.DEPTH_layerMerge);
	this.layerLevelUpWindow.setDepth(_this.DEPTH_layerUnlock);
	this.layerLevelUpWindow.x = this.midX;
	this.layerLevelUpWindow.y = this.midY + this.posWindowY;
	var fon_merge = _this.add.image(this.midX, this.midY, "ss_ui", "bg_connect_0000");
	fon_merge.setScale(2);
	this.layerLevelUpWindowMain.add(fon_merge);
	var fon_unlock = _this.add.image(0, 0, "ss_ui", "popup_unlocked_0000");
	fon_unlock.setScale(2);
	this.layerLevelUpWindow.add(fon_unlock);
	var posX = 0;
	var posY = -85;
	var effect = _this.add.sprite(posX, posY, "ss_ui");
	effect.play("magic_1");
	effect.setScale(2);
	this.layerLevelUpWindow.add(effect);
	var lvlup_icon = _this.add.image(posX, posY, "ss_ui", "lvlup_0000");
	this.layerLevelUpWindow.add(lvlup_icon);
	var icon_newparking = _this.add.image(-75, 105, "ss_ui", "icon_newparking_0000");
	this.layerLevelUpWindow.add(icon_newparking);
	var icon_newmoney = _this.add.image(75, 105, "ss_ui", "icon_newmoney_0000");
	this.layerLevelUpWindow.add(icon_newmoney);
	var buttonContinue = new ButtonText(0, 210, "ss_ui", "btn_buy_0000", this.closeLevelUpWindow, _this, MainGame.GAME_TEXT.continue, null, this);
	buttonContinue.text.setFontSize(26);
	this.layerLevelUpWindow.add(buttonContinue);
	MainGame.updateTextWidth(buttonContinue.text, 200);
	buttonContinue.text.y = -4;
	var text_levelup = _this.addText(this.layerLevelUpWindow, 0, -255, MainGame.GAME_TEXT.level_up, 34, true);
	MainGame.updateTextWidth(text_levelup, 400);
	var text_getnew = _this.addText(this.layerLevelUpWindow, 0, 20, MainGame.GAME_TEXT.get_new, 32, true);
	MainGame.updateTextWidth(text_getnew, 400);
	this.levelup_text_level = _this.addText(this.layerLevelUpWindow, posX, posY - 15, "", 48, true);
	var levelup_text_parking = _this.addText(this.layerLevelUpWindow, icon_newparking.x - 5, icon_newparking.y - 35, "+1", 36, true);
	var levelup_text_money = _this.addText(this.layerLevelUpWindow, icon_newmoney.x, icon_newmoney.y + 20, "", 30, true);
	this.icon_newparking = icon_newparking;
	this.icon_newmoney = icon_newmoney;
	this.levelup_text_parking = levelup_text_parking;
	this.levelup_text_money = levelup_text_money;
	this.layerLevelUpWindow.visible = false;
	this.layerLevelUpWindowMain.visible = false;
	fon_unlock.setInteractive();
	fon_merge.setInteractive();
	fon_merge.on("pointerdown", this.onFonInputDown, this);
	fon_merge.on("pointerup", this.onFonInputUp, this)
};
GameGUI.prototype.showLevelUpRewards1 = function() {
	this.icon_newparking.x = 0;
	this.levelup_text_parking.x = this.icon_newparking.x - 5;
	this.icon_newparking.visible = true;
	this.levelup_text_parking.visible = true
};
GameGUI.prototype.showLevelUpRewards2 = function() {
	_this = this.gameScreen;
	this.levelup_text_money.visible = true;
	this.icon_newmoney.visible = true;
	this.icon_newmoney.x = 0;
	this.levelup_text_money.x = 0;
	var coins = _this.getCoinsLevelUp(_this.currentLevel);
	var text_coins_warm = _this.convertNumberFormat(coins);
	this.levelup_text_money.setText(text_coins_warm);
	_this.amount_coins += coins;
	text_coins_warm = _this.convertNumberFormat(_this.amount_coins);
	this.updateCoins(text_coins_warm);
	_this.updateShop(text_coins_warm)
};
GameGUI.prototype.showLevelUpWindow = function() {
	_this = this.gameScreen;
	this.layerLevelUpWindow.visible = true;
	this.layerLevelUpWindowMain.visible = true;
	this.layerLevelUpWindow.setScale(this.scaleWindow1);
	_this.tweens.add({
		targets: this.layerLevelUpWindow,
		scaleX: this.scaleWindow2,
		scaleY: this.scaleWindow2,
		ease: Phaser.Math.Easing.Back.Out,
		duration: 400
	});
	this.disableMainButtons();
	this.icon_newparking.visible = false;
	this.icon_newmoney.visible = false;
	this.levelup_text_parking.visible = false;
	this.levelup_text_money.visible = false;
	if (_this.currentLevel < 10) {
		this.showLevelUpRewards1()
	} else {
		this.showLevelUpRewards2()
	}
	this.levelup_text_level.setText(" " + _this.currentLevel + " ");
	MainGame.Sfx.play("sound", "level_up");
	this.showBanner();
	this.eventFonImputUp = this.closeLevelUpWindow;
	_this.time.delayedCall(this.TIME_OPEN_POPUP, this.onPopupOpen, [], this)
};
GameGUI.prototype.closeLevelUpWindow = function() {
	if (MainGame.isAPI) MainGame.API_POKI.commercialBreak();
	this.layerLevelUpWindow.visible = false;
	this.layerLevelUpWindowMain.visible = false;
	this.enableMainButtons()
};
GameGUI.prototype.initMergeAnimation = function() {
	_this = this.gameScreen;
	this.layerMerge = _this.add.container();
	this.layerUnlocked = _this.add.container();
	this.layerMerge.setDepth(_this.DEPTH_layerMerge);
	this.layerUnlocked.setDepth(_this.DEPTH_layerUnlock);
	this.layerUnlocked.x = this.midX;
	this.layerUnlocked.y = this.midY + this.posWindowY;
	var fon_merge = _this.add.image(this.midX, this.midY, "ss_ui", "bg_connect_0000");
	fon_merge.setScale(2);
	this.layerMerge.add(fon_merge);
	var fon_unlock = _this.add.image(0, 0, "ss_ui", "popup_unlocked_0000");
	fon_unlock.setScale(2);
	this.layerUnlocked.add(fon_unlock);
	var effect = _this.add.sprite(0, 0 - 30, "ss_ui");
	effect.play("magic_1");
	effect.setScale(2);
	this.layerUnlocked.add(effect);
	var unlocked_car = _this.add.image(0, 0 - 30, "ss_main", "icon_f35_0000");
	unlocked_car.setScale(1.5);
	this.layerUnlocked.add(unlocked_car);
	this.unlocked_car = unlocked_car;
	var car1_merge = _this.add.image(this.midX - 160, this.midY - 40, "ss_main", "icon_f1_0000");
	car1_merge.setScale(1.2);
	this.car1_merge = car1_merge;
	var car2_merge = _this.add.image(this.midX + 160, this.midY - 40, "ss_main", "icon_f1_0000");
	car2_merge.setScale(1.2);
	this.car2_merge = car2_merge;
	this.layerMerge.add(car1_merge);
	this.layerMerge.add(car2_merge);
	var star_flash1 = _this.add.image(0, 0, "ss_ui", "star_flash_0000");
	this.layerUnlocked.add(star_flash1);
	this.star_flash1 = star_flash1;
	var star_flash2 = _this.add.image(0, 0, "ss_ui", "star_flash_0000");
	this.layerUnlocked.add(star_flash2);
	this.star_flash2 = star_flash2;
	var star_flash3 = _this.add.image(0, 0, "ss_ui", "star_flash_0000");
	this.layerUnlocked.add(star_flash3);
	this.star_flash3 = star_flash3;
	_this.tweens.add({
		targets: star_flash1,
		scaleX: .1,
		scaleY: .1,
		ease: "Linear",
		duration: 500,
		yoyo: true,
		repeat: -1
	});
	_this.tweens.add({
		targets: star_flash2,
		scaleX: .1,
		scaleY: .1,
		ease: "Linear",
		duration: 500,
		yoyo: true,
		repeat: -1
	});
	_this.tweens.add({
		targets: star_flash3,
		scaleX: .1,
		scaleY: .1,
		ease: "Linear",
		duration: 500,
		yoyo: true,
		repeat: -1
	});
	var coin = _this.add.image(-70, 130, "ss_ui", "money_0000");
	coin.setScale(.5);
	this.layerUnlocked.add(coin);
	this.coin_merge_window = coin;
	var back_car = _this.add.image(150, 50, "ss_main", "icon_f2_0000");
	this.layerUnlocked.add(back_car);
	back_car.setScale(_this.getScaleCar(.6));
	back_car.setTint(0);
	this.back_car = back_car;
	var buttonContinue = new ButtonText(0, 220, "ss_ui", "btn_buy_0000", this.clickContinueUnlocked, _this, MainGame.GAME_TEXT.continue, null, this);
	buttonContinue.text.setFontSize(26);
	this.layerUnlocked.add(buttonContinue);
	MainGame.updateTextWidth(buttonContinue.text, 200);
	buttonContinue.text.y = -4;
	var text_unlocked = _this.addText(this.layerUnlocked, 0, 0 - 255, MainGame.GAME_TEXT.unlocked, 34, true);
	MainGame.updateTextWidth(text_unlocked, 400);
	var text_next = this.mergeCars_textNext = _this.addText(this.layerUnlocked, back_car.x, back_car.y - 60, MainGame.GAME_TEXT.next, 22, true);
	MainGame.updateTextWidth(text_next, 120);
	this.mergeCars_textQuestion = _this.addText(this.layerUnlocked, back_car.x, back_car.y, "?", 26);
	var text_earning = _this.addText(this.layerUnlocked, 0, 0 + 100, MainGame.GAME_TEXT.earning, 22, true);
	MainGame.updateTextWidth(text_earning, 300);
	this.textEarning = _this.addText(this.layerUnlocked, 0, 0 + 130, "4/" + MainGame.GAME_TEXT.sec, 22);
	this.layerUnlocked.visible = false;
	this.layerMerge.visible = false;
	fon_unlock.setInteractive();
	fon_merge.setInteractive();
	fon_merge.on("pointerdown", this.onFonInputDown, this);
	fon_merge.on("pointerup", this.onFonInputUp, this)
};
GameGUI.prototype.clickContinueUnlocked = function() {
	if (!this.layerUnlocked.visible) return;
	_this = this.gameScreen;
	if (_this.nextCarLevel > 3) {
		if (MainGame.isAPI) MainGame.API_POKI.commercialBreak()
	} else {
		if (MainGame.isApiGameplayStop) {
			if (MainGame.isAPI) MainGame.API_POKI.gameplayStart();
			MainGame.isApiGameplayStop = false
		}
	}
	this.layerUnlocked.visible = false;
	this.layerMerge.visible = false;
	_this.selectUnlockedGun();
	if (_this.showAfterMerge) {
		_this.time.delayedCall(150, this.showLevelUpWindow, [], this);
		_this.showAfterMerge = false
	}
	this.enableMainButtons()
};
GameGUI.prototype.showMergeAnimation = function(vType) {
	_this = this.gameScreen;
	this.layerMerge.visible = true;
	_this.tweens.killTweensOf(this.car1_merge);
	_this.tweens.killTweensOf(this.car2_merge);
	this.car1_merge.visible = true;
	this.car2_merge.visible = true;
	this.car1_merge.x = this.midX - 160;
	this.car2_merge.x = this.midX + 160;
	this.car1_merge.angle = -5;
	this.car2_merge.angle = -5;
	var prevType = vType - 1;
	var nextType = vType + 1;
	if (nextType > this.MAX_TYPES_CAR) {
		this.back_car.visible = false;
		this.mergeCars_textNext.visible = false;
		this.mergeCars_textQuestion.visible = false
	} else {
		this.back_car.setFrame("icon_f" + nextType + "_0000")
	}
	this.car1_merge.setFrame("icon_f" + prevType + "_0000");
	this.car2_merge.setFrame("icon_f" + prevType + "_0000");
	this.unlocked_car.setFrame("icon_f" + vType + "_0000");
	var value_speed_coins = _this.getCarCoins(vType);
	var number_warm = _this.convertNumberFormat(value_speed_coins);
	this.textEarning.setText(number_warm + "/" + MainGame.GAME_TEXT.sec);
	this.coin_merge_window.x = this.textEarning.x - this.textEarning.width * .5 - 15;
	this.star_flash1.x = -180 + Phaser.Math.Between(-5, 5) * 2;
	this.star_flash1.y = -190;
	this.star_flash2.x = 180 + Phaser.Math.Between(-5, 5) * 2;
	this.star_flash2.y = -190;
	this.star_flash3.x = Phaser.Math.Between(-10, 10) * 10;
	this.star_flash3.y = 165;
	_this.tweens.add({
		targets: this.car1_merge,
		angle: 5,
		ease: "Linear",
		duration: 100,
		yoyo: true,
		repeat: 1
	});
	_this.tweens.add({
		targets: this.car1_merge,
		x: this.midX,
		ease: Phaser.Math.Easing.Back.In,
		duration: 500,
		delay: 200
	});
	_this.tweens.add({
		targets: this.car2_merge,
		angle: 5,
		ease: "Linear",
		duration: 100,
		yoyo: true,
		repeat: 1
	});
	_this.tweens.add({
		targets: this.car2_merge,
		x: this.midX,
		ease: Phaser.Math.Easing.Back.In,
		duration: 500,
		delay: 200
	});
	_this.time.delayedCall(700, this.addEffectMerge, [], this);
	_this.time.delayedCall(1700, this.showUnlockContent, [], this);
	MainGame.Sfx.play("sound", "unlocked");
	this.disableMainButtons()
};
GameGUI.prototype.addEffectMerge = function() {
	_this = this.gameScreen;
	var effect = _this.add.sprite(this.midX - 10, this.midY - 35, "ss_ui");
	effect.play("effect_connect2");
	effect.setScale(2);
	this.layerMerge.add(effect);
	this.car1_merge.visible = false;
	this.car2_merge.visible = false
};
GameGUI.prototype.showUnlockContent = function() {
	_this = this.gameScreen;
	this.layerUnlocked.visible = true;
	this.layerUnlocked.setScale(this.scaleWindow1);
	_this.tweens.add({
		targets: this.layerUnlocked,
		scaleX: this.scaleWindow2,
		scaleY: this.scaleWindow2,
		ease: Phaser.Math.Easing.Back.Out,
		duration: 400
	});
	this.showBanner();
	this.eventFonImputUp = this.clickContinueUnlocked;
	_this.time.delayedCall(this.TIME_OPEN_POPUP, this.onPopupOpen, [], this)
};
GameGUI.prototype.initSelectGunWindow = function() {
	_this = this.gameScreen;
	this.layerSelectGunWindowMain = _this.add.container();
	this.layerSelectGunWindow = _this.add.container();
	this.layerSelectGunWindowMain.setDepth(_this.DEPTH_layerMerge);
	this.layerSelectGunWindow.setDepth(_this.DEPTH_layerUnlock);
	this.layerSelectGunWindow.x = this.midX;
	this.layerSelectGunWindow.y = this.midY + this.posWindowY;
	var fon_merge = _this.add.image(this.midX, this.midY, "ss_ui", "bg_connect_0000");
	fon_merge.setScale(2);
	this.layerSelectGunWindowMain.add(fon_merge);
	var fon_unlock = _this.add.image(0, 0, "ss_ui", "popup_unlocked_0000");
	fon_unlock.setScale(2);
	this.layerSelectGunWindow.add(fon_unlock);
	var posX = 0;
	var posY = -10;
	var flash_select_gun = _this.add.image(posX, posY, "ss_ui", "flash_select_gun_0000");
	this.layerSelectGunWindow.add(flash_select_gun);
	var gun = _this.add.image(posX, posY, "ss_main", "icon_f" + this.selectedGun + "_0000");
	gun.setScale(1.5);
	this.layerSelectGunWindow.add(gun);
	this.selectedGunSprite = gun;
	var icon_lock = _this.add.image(posX, posY, "ss_ui", "lock_0000");
	this.layerSelectGunWindow.add(icon_lock);
	var panel_number = _this.add.image(posX - 45, posY - 140, "ss_ui", "panel_number_0000");
	panel_number.setScale(1.15);
	this.layerSelectGunWindow.add(panel_number);
	var buttonClose = new Button(220, -255, "ss_ui", "btn_close_0000", this.closeSelectGunWindow, _this, this);
	this.layerSelectGunWindow.add(buttonClose);
	var buttonSelectP = new Button(-200, posY, "ss_ui", "btn_prev_0000", this.clickSelectGunPrev, _this, this);
	this.layerSelectGunWindow.add(buttonSelectP);
	var buttonSelectN = new Button(200, posY, "ss_ui", "btn_next_0000", this.clickSelectGunNext, _this, this);
	this.layerSelectGunWindow.add(buttonSelectN);
	var buttonContinue = new ButtonText(0, 210, "ss_ui", "btn_buy_0000", this.clickSelectGun, _this, MainGame.GAME_TEXT.select, null, this);
	buttonContinue.text.setFontSize(26);
	this.layerSelectGunWindow.add(buttonContinue);
	MainGame.updateTextWidth(buttonContinue.text, 200);
	buttonContinue.text.y = -4;
	var buttonContinueGray = new ButtonText(0, 210, "ss_ui", "btn_buy3_0000", this.clickSelectGun, _this, MainGame.GAME_TEXT.select, null, this);
	buttonContinueGray.text.setFontSize(26);
	this.layerSelectGunWindow.add(buttonContinueGray);
	MainGame.updateTextWidth(buttonContinueGray.text, 200);
	buttonContinueGray.text.y = -4;
	buttonContinueGray.disableInput();
	var iconDone = new Button(0, 205, "ss_ui", "icon_done_0000", this.closeSelectGunWindow, _this, this);
	this.layerSelectGunWindow.add(iconDone);
	var text_title = _this.addText(this.layerSelectGunWindow, 0, -255, MainGame.GAME_TEXT.select_gun, 34, true);
	MainGame.updateTextWidth(text_title, 400);
	var text_level = _this.addText(this.layerSelectGunWindow, panel_number.x + 70, panel_number.y - 2, MainGame.GAME_TEXT.level, 24, true);
	MainGame.updateTextWidth(text_level, 400);
	var text_unlock_after = _this.addText(this.layerSelectGunWindow, posX, posY + 140, MainGame.GAME_TEXT.unlock_after, 22, true);
	text_unlock_after.setCenterAlign();
	MainGame.updateTextWidth(text_unlock_after, 400);
	var text_levelGun = _this.addText(this.layerSelectGunWindow, panel_number.x - 1, panel_number.y - 2, "1", 24);
	text_levelGun.setTint(0);
	this.buttonSelectGunContinue = buttonContinue;
	this.buttonSelectGunContinueGray = buttonContinueGray;
	this.buttonSelectGunDone = iconDone;
	this.icon_lock = icon_lock;
	this.text_unlock_after = text_unlock_after;
	this.selectedGunNumber = text_levelGun;
	this.layerSelectGunWindowMain.visible = false;
	this.layerSelectGunWindow.visible = false;
	this.layerSelectGunWindow.setScale(this.scaleWindow2);
	fon_unlock.setInteractive();
	fon_merge.setInteractive();
	fon_merge.on("pointerdown", this.onFonInputDown, this);
	fon_merge.on("pointerup", this.onFonInputUp, this)
};
GameGUI.prototype.showSelectGunWindow = function() {
	_this = this.gameScreen;
	this.layerSelectGunWindowMain.visible = true;
	this.layerSelectGunWindow.visible = true;
	this.layerSelectGunWindow.setScale(this.scaleWindow1);
	_this.tweens.add({
		targets: this.layerSelectGunWindow,
		scaleX: this.scaleWindow2,
		scaleY: this.scaleWindow2,
		ease: Phaser.Math.Easing.Back.Out,
		duration: 400
	});
	this.selectedGun = MainGame.selectedGun;
	this.updateSelectGun();
	this.disableMainButtons();
	this.eventFonImputUp = this.closeSelectGunWindow;
	_this.time.delayedCall(this.TIME_OPEN_POPUP, this.onPopupOpen, [], this)
};
GameGUI.prototype.closeSelectGunWindow = function() {
	if (MainGame.isAPI) MainGame.API_POKI.commercialBreak();
	this.layerSelectGunWindowMain.visible = false;
	this.layerSelectGunWindow.visible = false;
	this.enableMainButtons()
};
GameGUI.prototype.updateSelectGun = function() {
	_this = this.gameScreen;
	this.selectedGunSprite.setFrame("icon_f" + this.selectedGun + "_0000");
	this.selectedGunNumber.setText(this.selectedGun);
	this.buttonSelectGunContinue.visible = false;
	this.buttonSelectGunContinueGray.visible = false;
	this.buttonSelectGunDone.visible = false;
	this.text_unlock_after.visible = false;
	this.icon_lock.visible = false;
	if (this.selectedGun < _this.nextCarLevel) {
		if (this.selectedGun == MainGame.selectedGun) {
			this.buttonSelectGunDone.visible = true
		} else {
			this.buttonSelectGunContinue.visible = true
		}
		this.selectedGunSprite.setTint(16777215)
	} else {
		this.buttonSelectGunContinueGray.visible = true;
		this.text_unlock_after.visible = true;
		this.icon_lock.visible = true;
		this.selectedGunSprite.setTint(0)
	}
};
GameGUI.prototype.clickSelectGunPrev = function() {
	this.selectedGun--;
	if (this.selectedGun < 1) {
		this.selectedGun = this.gameScreen.MAX_TYPES_CAR
	}
	this.updateSelectGun()
};
GameGUI.prototype.clickSelectGunNext = function() {
	this.selectedGun++;
	if (this.selectedGun > this.gameScreen.MAX_TYPES_CAR) {
		this.selectedGun = 1
	}
	this.updateSelectGun()
};
GameGUI.prototype.clickSelectGun = function() {
	_this = this.gameScreen;
	MainGame.selectedGun = this.selectedGun;
	this.closeSelectGunWindow();
	_this.updateSpineMan();
	MainGame.saveSaves()
};
GameGUI.prototype.initHelmetWindow = function() {
	_this = this.gameScreen;
	this.layerHelmetWindowMain = _this.add.container();
	this.layerHelmetWindow = _this.add.container();
	this.layerHelmetWindowMain.setDepth(_this.DEPTH_layerMerge);
	this.layerHelmetWindow.setDepth(_this.DEPTH_layerUnlock);
	this.layerHelmetWindow.x = this.midX;
	this.layerHelmetWindow.y = this.midY;
	var fon_merge = _this.add.image(this.midX, this.midY, "ss_ui", "bg_connect_0000");
	fon_merge.setScale(2);
	this.layerHelmetWindowMain.add(fon_merge);
	var offsetX = 50;
	var fon_unlock = _this.add.image(offsetX, 0, "ss_ui", "popup_shop_0000");
	fon_unlock.setScale(2);
	this.layerHelmetWindow.add(fon_unlock);
	var posX = 0;
	var posY = -25;
	var coin = _this.add.image(-70 + offsetX, -273, "ss_ui", "icon_diamond_0000");
	this.layerHelmetWindow.add(coin);
	var buttonClose = new Button(222 + offsetX, -273, "ss_ui", "btn_close_0000", this.closeHatWindow, _this, this);
	this.layerHelmetWindow.add(buttonClose);
	this.arBtnHats = [];
	this.btnHat1 = this.addHatButton(0, offsetX - 140, -160, this.clickHat, "window_hat1_0000", "hat_empty_0000");
	this.btnHat2 = this.addHatButton(2, offsetX, -160, this.clickHat, "window_hat1_0000", "icon_hat2_0000");
	this.btnHat3 = this.addHatButton(3, offsetX + 140, -160, this.clickHat, "window_hat1_0000", "icon_hat3_0000");
	this.btnHat4 = this.addHatButton(4, offsetX - 140, -20, this.clickHat, "window_hat1_0000", "icon_hat4_0000");
	this.btnHat5 = this.addHatButton(5, offsetX, -20, this.clickHat, "window_hat1_0000", "icon_hat5_0000");
	this.btnHat6 = this.addHatButton(6, offsetX + 140, -20, this.clickHat, "window_hat1_0000", "icon_hat6_0000");
	this.btnHat7 = this.addHatButton(7, offsetX - 140, 120, this.clickHat, "window_hat1_0000", "icon_hat7_0000");
	this.btnHat8 = this.addHatButton(8, offsetX, 120, this.clickHat, "window_hat1_0000", "icon_hat8_0000");
	this.btnHat9 = this.addHatButton(9, offsetX + 140, 120, this.clickHat, "window_hat1_0000", "icon_hat9_0000");
	this.btnHat10 = this.addHatButton(10, offsetX - 140, -160, this.clickHat, "window_hat1_0000", "icon_hat10_0000");
	this.btnHat11 = this.addHatButton(11, offsetX, -160, this.clickHat, "window_hat1_0000", "icon_hat11_0000");
	this.btnHat12 = this.addHatButton(12, offsetX + 140, -160, this.clickHat, "window_hat1_0000", "icon_hat12_0000");
	this.btnHat13 = this.addHatButton(13, offsetX - 140, -20, this.clickHat, "window_hat1_0000", "icon_hat13_0000");
	this.btnHat14 = this.addHatButton(14, offsetX, -20, this.clickHat, "window_hat1_0000", "icon_hat14_0000");
	this.btnHat15 = this.addHatButton(15, offsetX + 140, -20, this.clickHat, "window_hat1_0000", "icon_hat15_0000");
	this.btnHat16 = this.addHatButton(16, offsetX - 140, 120, this.clickHat, "window_hat1_0000", "icon_hat16_0000");
	this.btnHat17 = this.addHatButton(17, offsetX, 120, this.clickHat, "window_hat1_0000", "icon_hat17_0000");
	this.btnHat18 = this.addHatButton(18, offsetX + 140, 120, this.clickHat, "window_hat1_0000", "icon_hat18_0000");
	this.btnHat19 = this.addHatButton(19, offsetX - 140, -160, this.clickHat, "window_hat1_0000", "icon_hat19_0000");
	this.btnHat20 = this.addHatButton(20, offsetX, -160, this.clickHat, "window_hat1_0000", "icon_hat20_0000");
	this.arBtnHats.push(this.btnHat1);
	this.arBtnHats.push(this.btnHat2);
	this.arBtnHats.push(this.btnHat3);
	this.arBtnHats.push(this.btnHat4);
	this.arBtnHats.push(this.btnHat5);
	this.arBtnHats.push(this.btnHat6);
	this.arBtnHats.push(this.btnHat7);
	this.arBtnHats.push(this.btnHat8);
	this.arBtnHats.push(this.btnHat9);
	this.arBtnHats.push(this.btnHat10);
	this.arBtnHats.push(this.btnHat11);
	this.arBtnHats.push(this.btnHat12);
	this.arBtnHats.push(this.btnHat13);
	this.arBtnHats.push(this.btnHat14);
	this.arBtnHats.push(this.btnHat15);
	this.arBtnHats.push(this.btnHat16);
	this.arBtnHats.push(this.btnHat17);
	this.arBtnHats.push(this.btnHat18);
	this.arBtnHats.push(this.btnHat19);
	this.arBtnHats.push(this.btnHat20);
	var buttonHelmetTab1 = new ButtonText(-370 + offsetX, -262, "ss_ui", "btn_shop1_0000", this.clickHelmetTab1, _this, MainGame.GAME_TEXT.basic, null, this);
	buttonHelmetTab1.text.setFontSize(22);
	buttonHelmetTab1.text.x = -5;
	buttonHelmetTab1.text.y = -2;
	this.layerHelmetWindow.add(buttonHelmetTab1);
	MainGame.updateTextWidth(buttonHelmetTab1.text, 140);
	var buttonHelmetTab2 = new ButtonText(-370 + offsetX, -262 + 85 * 1, "ss_ui", "btn_shop2_0000", this.clickHelmetTab2, _this, MainGame.GAME_TEXT.epic, null, this);
	buttonHelmetTab2.text.setFontSize(22);
	buttonHelmetTab2.text.x = -5;
	buttonHelmetTab2.text.y = -2;
	this.layerHelmetWindow.add(buttonHelmetTab2);
	MainGame.updateTextWidth(buttonHelmetTab2.text, 140);
	var buttonHelmetTab3 = new ButtonText(-370 + offsetX, -262 + 85 * 2, "ss_ui", "btn_shop2_0000", this.clickHelmetTab3, _this, MainGame.GAME_TEXT.legendary, null, this);
	buttonHelmetTab3.text.setFontSize(22);
	buttonHelmetTab3.text.x = -5;
	buttonHelmetTab3.text.y = -2;
	this.layerHelmetWindow.add(buttonHelmetTab3);
	MainGame.updateTextWidth(buttonHelmetTab3.text, 140);
	if (MainGame.EVENT_NUM == 1) {
		var icon_halloween = _this.add.image(-112, -3, "ss_ui", "icon_event_halloween_0000");
		buttonHelmetTab3.add(icon_halloween)
	} else if (MainGame.EVENT_NUM == 2) {
		var icon_halloween = _this.add.image(-112, 4, "ss_ui", "icon_event_c_0000");
		buttonHelmetTab3.add(icon_halloween)
	}
	this.buttonHelmetTab1 = buttonHelmetTab1;
	this.buttonHelmetTab2 = buttonHelmetTab2;
	this.buttonHelmetTab3 = buttonHelmetTab3;
	var buttonBuy = new ButtonText(offsetX, 255, "ss_ui", "btn_buy2_0000", this.clickBuyHelmet, _this, "100", null, this);
	buttonBuy.text.setFontSize(26);
	buttonBuy.text.x = 25;
	buttonBuy.text.y = -2;
	this.layerHelmetWindow.add(buttonBuy);
	MainGame.updateTextWidth(buttonBuy.text, 200);
	var icon_reward = _this.add.image(-35, -2, "ss_ui", "icon_diamond_0000");
	buttonBuy.add(icon_reward);
	var text_currency = _this.addText(this.layerHelmetWindow, coin.x + 40, -275, "1000", 36, true);
	text_currency.setOrigin(0, .5);
	this.buttonBuyHelmet = buttonBuy;
	this.textFieldHelmetWindow = text_currency;
	this.text_buyNew = _this.addText(this.layerHelmetWindow, offsetX, 205, MainGame.GAME_TEXT.buy_new, 24, true);
	this.text_legendary = _this.addText(this.layerHelmetWindow, offsetX, 255, MainGame.GAME_TEXT.text_legendary, 22, true);
	this.text_legendary.setCenterAlign();
	this.layerHelmetWindowMain.visible = false;
	this.layerHelmetWindow.visible = false;
	fon_unlock.setInteractive();
	fon_merge.setInteractive();
	fon_merge.on("pointerdown", this.onFonInputDown, this);
	fon_merge.on("pointerup", this.onFonInputUp, this);
	this.selectedHelmetTab = 1;
	this.clickHelmetTab1()
};
GameGUI.prototype.addHatButton = function(vNum, vX, vY, vCallBack, vBackBtn, vIconBtn) {
	_this = this.gameScreen;
	var btn = new ButtonText(vX, vY, "ss_ui", vBackBtn, vCallBack, _this, null, vNum, this);
	this.layerHelmetWindow.add(btn);
	var icon_reward = _this.add.image(0, 0, "ss_ui", vIconBtn);
	btn.add(icon_reward);
	var ramka = _this.add.image(0, 0, "ss_ui", "window_hat3_0000");
	btn.add(ramka);
	ramka.visible = false;
	btn.ramka = ramka;
	return btn
};
GameGUI.prototype.clickHat = function(v) {
	_this = this.gameScreen;
	MainGame.selectedHat = v;
	_this.updateSpineHat(MainGame.selectedHat);
	this.updateWindowHelmet();
	MainGame.saveSaves()
};
GameGUI.prototype.updateWindowHelmet = function() {
	var btnHelmet;
	for (var i = 0; i < this.arBtnHats.length; i++) {
		btnHelmet = this.arBtnHats[i];
		if (btnHelmet) {
			this.arBtnHats[i].ramka.visible = false;
			this.arBtnHats[i].disableInput()
		}
	}
	var num = MainGame.selectedHat;
	if (num == 0) {
		this["btnHat" + 1].ramka.visible = true
	} else {
		if (this["btnHat" + num]) this["btnHat" + num].ramka.visible = true
	}
	this.btnHat1.back.setFrame("window_hat2_0000");
	this.btnHat1.enableInput();
	this.updateDiamonds(MainGame.amount_diamonds);
	var priceNextHelmet = 0;
	var countBasicHave = 0;
	var countEpicHave = 0;
	var hatId = null;
	for (var i = 0; i < MainGame.arHatsHave.length; i++) {
		hatId = MainGame.arHatsHave[i];
		if (hatId < 19) {
			if (hatId < 10) {
				countBasicHave++
			} else {
				countEpicHave++
			}
		}
		if (this["btnHat" + hatId]) {
			this["btnHat" + hatId].back.setFrame("window_hat2_0000");
			this["btnHat" + hatId].enableInput()
		}
	}
	if (this.selectedHelmetTab == 1) {
		priceNextHelmet = MainGame.priceBasic * (1 + countBasicHave);
		if (countBasicHave == MainGame.arHatsBasic.length) {
			this.buttonBuyHelmet.visible = false;
			this.text_buyNew.visible = false
		} else {
			this.buttonBuyHelmet.visible = true;
			this.text_buyNew.visible = true
		}
	} else if (this.selectedHelmetTab == 2) {
		priceNextHelmet = MainGame.priceEpic + MainGame.priceEpic * (1 + countEpicHave);
		if (countEpicHave == MainGame.arHatsEpic.length) {
			this.buttonBuyHelmet.visible = false;
			this.text_buyNew.visible = false
		} else {
			this.buttonBuyHelmet.visible = true;
			this.text_buyNew.visible = true
		}
	} else if (this.selectedHelmetTab == 3) {
		this.buttonBuyHelmet.visible = false;
		this.text_buyNew.visible = false
	}
	this.buttonBuyHelmet.text.setText(priceNextHelmet);
	this.buttonBuyHelmet.setEnable(MainGame.amount_diamonds >= priceNextHelmet);
	this.priceNextHelmet = priceNextHelmet
};
GameGUI.prototype.clickBuyHelmet = function() {
	var arHats = [];
	var hatId = null;
	MainGame.amount_diamonds -= this.priceNextHelmet;
	this.updateDiamonds(MainGame.amount_diamonds);
	MainGame.api_google("BuyHelmet", this.priceNextHelmet);
	if (this.selectedHelmetTab == 1) {
		for (var i = 0; i < MainGame.arHatsBasic.length; i++) {
			hatId = MainGame.arHatsBasic[i];
			if (MainGame.arHatsHave.indexOf(hatId) == -1) {
				arHats.push(hatId)
			}
		}
	} else if (this.selectedHelmetTab == 2) {
		for (var i = 0; i < MainGame.arHatsEpic.length; i++) {
			hatId = MainGame.arHatsEpic[i];
			if (MainGame.arHatsHave.indexOf(hatId) == -1) {
				arHats.push(hatId)
			}
		}
	}
	MyMath.shuffleArr(arHats);
	var randomHatId = arHats[0];
	MainGame.arHatsHave.push(randomHatId);
	this.buttonBuyHelmet.setEnable(false);
	this.randomHatId = randomHatId;
	if (arHats.length == 1) {
		this.showNewHelmet();
		return
	}
	this.isTweeningHat = true;
	this.arTweeningHat = [];
	this.stepTweeningHat = 0;
	while (this.arTweeningHat.length < 20) {
		MyMath.shuffleArr(arHats);
		for (var i = 0; i < arHats.length; i++) this.arTweeningHat.push(arHats[i])
	}
	this.arTweeningHat.push(randomHatId);
	this.updateTweeningHat();
	MainGame.saveSaves()
};
GameGUI.prototype.updateTweeningHat = function() {
	for (var i = 0; i < this.arBtnHats.length; i++) {
		this.arBtnHats[i].ramka.visible = false
	}
	var hatId = this.arTweeningHat[this.stepTweeningHat];
	this["btnHat" + hatId].ramka.visible = true;
	this.stepTweeningHat++;
	if (this.stepTweeningHat == this.arTweeningHat.length) {
		this.showNewHelmet()
	} else {
		if (this.stepTweeningHat < 10) {
			this.gameScreen.time.delayedCall(100, this.updateTweeningHat, [], this)
		} else {
			var delay = 100 + 50 * (this.stepTweeningHat - 10);
			this.gameScreen.time.delayedCall(delay, this.updateTweeningHat, [], this)
		}
	}
};
GameGUI.prototype.showNewHelmet = function() {
	this.isTweeningHat = false;
	this.clickHat(this.randomHatId);
	this.updateWindowHelmet()
};
GameGUI.prototype.clickHelmetTab1 = function() {
	if (this.isTweeningHat) return;
	this.btnHat1.visible = true;
	this.btnHat2.visible = true;
	this.btnHat3.visible = true;
	this.btnHat4.visible = true;
	this.btnHat5.visible = true;
	this.btnHat6.visible = true;
	this.btnHat7.visible = true;
	this.btnHat8.visible = true;
	this.btnHat9.visible = true;
	this.btnHat10.visible = false;
	this.btnHat11.visible = false;
	this.btnHat12.visible = false;
	this.btnHat13.visible = false;
	this.btnHat14.visible = false;
	this.btnHat15.visible = false;
	this.btnHat16.visible = false;
	this.btnHat17.visible = false;
	this.btnHat18.visible = false;
	this.btnHat19.visible = false;
	this.btnHat20.visible = false;
	this.buttonHelmetTab1.back.setFrame("btn_shop1_0000");
	this.buttonHelmetTab2.back.setFrame("btn_shop2_0000");
	this.buttonHelmetTab3.back.setFrame("btn_shop2_0000");
	this.text_legendary.visible = false;
	this.selectedHelmetTab = 1;
	this.updateWindowHelmet()
};
GameGUI.prototype.clickHelmetTab2 = function() {
	if (this.isTweeningHat) return;
	this.btnHat1.visible = false;
	this.btnHat2.visible = false;
	this.btnHat3.visible = false;
	this.btnHat4.visible = false;
	this.btnHat5.visible = false;
	this.btnHat6.visible = false;
	this.btnHat7.visible = false;
	this.btnHat8.visible = false;
	this.btnHat9.visible = false;
	this.btnHat10.visible = true;
	this.btnHat11.visible = true;
	this.btnHat12.visible = true;
	this.btnHat13.visible = true;
	this.btnHat14.visible = true;
	this.btnHat15.visible = true;
	this.btnHat16.visible = true;
	this.btnHat17.visible = true;
	this.btnHat18.visible = true;
	this.btnHat19.visible = false;
	this.btnHat20.visible = false;
	this.buttonHelmetTab1.back.setFrame("btn_shop2_0000");
	this.buttonHelmetTab2.back.setFrame("btn_shop1_0000");
	this.buttonHelmetTab3.back.setFrame("btn_shop2_0000");
	this.text_legendary.visible = false;
	this.selectedHelmetTab = 2;
	this.updateWindowHelmet()
};
GameGUI.prototype.clickHelmetTab3 = function() {
	if (this.isTweeningHat) return;
	this.btnHat1.visible = false;
	this.btnHat2.visible = false;
	this.btnHat3.visible = false;
	this.btnHat4.visible = false;
	this.btnHat5.visible = false;
	this.btnHat6.visible = false;
	this.btnHat7.visible = false;
	this.btnHat8.visible = false;
	this.btnHat9.visible = false;
	this.btnHat10.visible = false;
	this.btnHat11.visible = false;
	this.btnHat12.visible = false;
	this.btnHat13.visible = false;
	this.btnHat14.visible = false;
	this.btnHat15.visible = false;
	this.btnHat16.visible = false;
	this.btnHat17.visible = false;
	this.btnHat18.visible = false;
	this.btnHat19.visible = true;
	this.btnHat20.visible = true;
	this.buttonHelmetTab1.back.setFrame("btn_shop2_0000");
	this.buttonHelmetTab2.back.setFrame("btn_shop2_0000");
	this.buttonHelmetTab3.back.setFrame("btn_shop1_0000");
	this.text_legendary.visible = true;
	this.selectedHelmetTab = 3;
	this.updateWindowHelmet()
};
GameGUI.prototype.showHatWindow = function() {
	_this = this.gameScreen;
	this.layerHelmetWindowMain.visible = true;
	this.layerHelmetWindow.visible = true;
	this.disableMainButtons();
	this.updateWindowHelmet();
	this.eventFonImputUp = this.closeHatWindow;
	_this.time.delayedCall(this.TIME_OPEN_POPUP, this.onPopupOpen, [], this)
};
GameGUI.prototype.closeHatWindow = function() {
	if (this.isTweeningHat) return;
	if (MainGame.isAPI) MainGame.API_POKI.commercialBreak();
	this.layerHelmetWindowMain.visible = false;
	this.layerHelmetWindow.visible = false;
	this.enableMainButtons()
};
GameGUI.prototype.initFortunaWheelWindow = function() {
	_this = this.gameScreen;
	this.layerFortunaWheelWindowMain = _this.add.container();
	this.layerFortunaWheelWindow = _this.add.container();
	this.layerFortunaWheelWindowMain.setDepth(_this.DEPTH_layerMerge);
	this.layerFortunaWheelWindow.setDepth(_this.DEPTH_layerUnlock);
	this.layerFortunaWheelWindow.x = this.midX;
	this.layerFortunaWheelWindow.y = this.midY + this.posWindowY;
	var fon_merge = _this.add.image(this.midX, this.midY, "ss_ui", "bg_connect_0000");
	fon_merge.setScale(2);
	this.layerFortunaWheelWindowMain.add(fon_merge);
	var fon_unlock = _this.add.image(0, 0, "ss_ui", "popup_unlocked_0000");
	fon_unlock.setScale(2);
	this.layerFortunaWheelWindow.add(fon_unlock);
	var posX = 0;
	var posY = -25;
	var flash_fortune = _this.add.image(posX, posY, "ss_ui", "flash_fortune_0000");
	this.layerFortunaWheelWindow.add(flash_fortune);
	var wheel_fortune = _this.add.image(posX, posY, "ss_ui", "wheel_fortune_0000");
	this.layerFortunaWheelWindow.add(wheel_fortune);
	this.wheel_fortune = wheel_fortune;
	var ramka_fortune = _this.add.image(posX, posY, "ss_ui", "ramka_fortune_0000");
	this.layerFortunaWheelWindow.add(ramka_fortune);
	var arrow_fortune = _this.add.image(posX, posY - 152, "ss_ui", "arrow_fortune_0000");
	this.layerFortunaWheelWindow.add(arrow_fortune);
	this.arrow_fortune = arrow_fortune;
	var buttonClose = new Button(220, -255, "ss_ui", "btn_close_0000", this.closeFortunaWheelWindow, _this, this);
	this.layerFortunaWheelWindow.add(buttonClose);
	this.buttonCloseFortunaWheelWindow = buttonClose;
	var buttonContinue = new ButtonText(0, 200, "ss_ui", "btn_buy2_0000", _this.showAdsForFortunaWheel, _this, MainGame.GAME_TEXT.free);
	buttonContinue.text.setFontSize(26);
	buttonContinue.text.x = -20;
	buttonContinue.text.y = -4;
	this.layerFortunaWheelWindow.add(buttonContinue);
	MainGame.updateTextWidth(buttonContinue.text, 200);
	var icon_reward = _this.add.image(75, -2, "ss_ui", "icon_reward_0000");
	buttonContinue.add(icon_reward);
	this.buttonFortunaWheel = buttonContinue;
	var text_title = _this.addText(this.layerFortunaWheelWindow, 0, -255, MainGame.GAME_TEXT.lucky_wheel, 34, true);
	MainGame.updateTextWidth(text_title, 400);
	var text_free_time = _this.addText(this.layerFortunaWheelWindow, -150, 255, "", 20, true);
	MainGame.updateTextWidth(text_free_time, 300);
	var text_nextfreein = _this.addText(this.layerFortunaWheelWindow, 150, 255, "", 20, true);
	MainGame.updateTextWidth(text_nextfreein, 300);
	this.text_free_time = text_free_time;
	this.text_nextfreein = text_nextfreein;
	this.layerFortunaWheelWindowMain.visible = false;
	this.layerFortunaWheelWindow.visible = false;
	this.layerFortunaWheelWindow.setScale(this.scaleWindow2);
	_this.initWheelOptions();
	fon_unlock.setInteractive();
	fon_merge.setInteractive();
	fon_merge.on("pointerdown", this.onFonInputDown, this);
	fon_merge.on("pointerup", this.onFonInputUp, this)
};
GameGUI.prototype.checkFortunaWheelWindow = function() {
	if (this.gameScreen.freeTimeWheel > 0) {
		this.buttonFortunaWheel.setEnable(true)
	} else {
		this.buttonFortunaWheel.setEnable(false)
	}
};
GameGUI.prototype.updateFortunaWheelWindow = function(countDownNextFree) {
	var str1 = MainGame.GAME_TEXT.free_time + " " + this.gameScreen.freeTimeWheel + "/" + MainGame.maxTimeWheel;
	this.text_free_time.setText(str1.toUpperCase());
	var timeNextIn = _this.secToHHMMSS(countDownNextFree);
	var str2 = MainGame.GAME_TEXT.next_free_in + " " + timeNextIn;
	this.text_nextfreein.setText(str2.toUpperCase());
	if (this.gameScreen.freeTimeWheel == MainGame.maxTimeWheel) {
		this.text_nextfreein.visible = false
	} else {
		this.text_nextfreein.visible = true
	}
	if (!this.isTweeningWheel) this.checkFortunaWheelWindow()
};
GameGUI.prototype.openFortunaWheelWindow = function() {
	_this = this.gameScreen;
	this.layerFortunaWheelWindowMain.visible = true;
	this.layerFortunaWheelWindow.visible = true;
	this.layerFortunaWheelWindow.setScale(this.scaleWindow2);
	this.disableMainButtons();
	this.updateFortunaWheelWindow(_this.countDownNextFree);
	this.eventFonImputUp = this.closeFortunaWheelWindow;
	_this.time.delayedCall(this.TIME_OPEN_POPUP, this.onPopupOpen, [], this)
};
GameGUI.prototype.closeFortunaWheelWindow = function() {
	if (this.isTweeningWheel) return;
	if (MainGame.isAPI) MainGame.API_POKI.commercialBreak();
	this.layerFortunaWheelWindowMain.visible = false;
	this.layerFortunaWheelWindow.visible = false;
	this.enableMainButtons()
};
GameGUI.prototype.tweenWheelFortune = function(rounds, degrees, backDegrees, duration1, duration2) {
	_this = this.gameScreen;
	this.buttonCloseFortunaWheelWindow.setEnable(false);
	this.isTweeningWheel = true;
	_this.tweens.add({
		targets: [this.wheel_fortune],
		angle: 360 * rounds + degrees,
		duration: duration1,
		ease: "Cubic.easeOut",
		callbackScope: this,
		onComplete: function(tween) {
			_this.tweens.add({
				targets: [this.wheel_fortune],
				angle: this.wheel_fortune.angle - backDegrees,
				duration: duration2,
				ease: "Cubic.easeIn",
				callbackScope: this,
				onComplete: function(tween) {
					this.showRewardWindow(MainGame.reward_wheel);
					this.buttonCloseFortunaWheelWindow.setEnable(true);
					this.checkFortunaWheelWindow();
					this.isTweeningWheel = false
				}
			})
		}
	})
};
GameGUI.prototype.initRewardWindow = function() {
	_this = this.gameScreen;
	this.layerRewardWindowMain = _this.add.container();
	this.layerRewardWindow = _this.add.container();
	this.layerRewardWindowMain.setDepth(_this.DEPTH_layerUnlock);
	this.layerRewardWindow.setDepth(_this.DEPTH_layerUnlock);
	this.layerRewardWindow.x = this.midX;
	this.layerRewardWindow.y = this.midY + this.posWindowY;
	var fon_merge = _this.add.image(this.midX, this.midY, "ss_ui", "bg_connect_0000");
	fon_merge.setScale(2);
	this.layerRewardWindowMain.add(fon_merge);
	var popup_drop = _this.add.image(0, 0, "ss_ui", "popup_drop_0000");
	popup_drop.setScale(2);
	this.layerRewardWindow.add(popup_drop);
	var posX = 0;
	var posY = -5;
	var effect = _this.add.sprite(posX, posY, "ss_ui");
	effect.play("magic_1");
	effect.setScale(2);
	this.layerRewardWindow.add(effect);
	var iconRewardWindow = _this.add.image(posX, posY, "ss_ui", "reward_box6_0000");
	this.layerRewardWindow.add(iconRewardWindow);
	this.iconRewardWindow = iconRewardWindow;
	var buttonContinue = new ButtonText(0, 150, "ss_ui", "btn_buy_0000", this.clickGetReward, _this, MainGame.GAME_TEXT.get, null, this);
	buttonContinue.text.setFontSize(26);
	this.layerRewardWindow.add(buttonContinue);
	MainGame.updateTextWidth(buttonContinue.text, 200);
	buttonContinue.text.y = -4;
	var buttonClose = new Button(220, -185, "ss_ui", "btn_close_0000", this.closeRewardWindow, _this, this);
	this.layerRewardWindow.add(buttonClose);
	var text_title = _this.addText(this.layerRewardWindow, 0, -185, MainGame.GAME_TEXT.reward, 34, true);
	MainGame.updateTextWidth(text_title, 380);
	this.layerRewardWindowMain.visible = false;
	this.layerRewardWindow.visible = false;
	this.layerRewardWindow.setScale(this.scaleWindow2);
	popup_drop.setInteractive();
	fon_merge.setInteractive();
	fon_merge.on("pointerdown", this.onFonInputDown, this);
	fon_merge.on("pointerup", this.onFonInputUp, this)
};
GameGUI.prototype.showRewardWindow = function(vTypeReward) {
	_this = this.gameScreen;
	this.layerRewardWindow.visible = true;
	this.layerRewardWindowMain.visible = true;
	this.layerRewardWindow.setScale(this.scaleWindow1);
	_this.tweens.add({
		targets: this.layerRewardWindow,
		scaleX: this.scaleWindow2,
		scaleY: this.scaleWindow2,
		ease: Phaser.Math.Easing.Back.Out,
		duration: 400
	});
	this.iconRewardWindow.setFrame(vTypeReward + "_0000");
	this.eventFonImputUp = this.closeRewardWindow;
	_this.time.delayedCall(this.TIME_OPEN_POPUP, this.onPopupOpen, [], this);
	MainGame.Sfx.play("sound", "boost")
};
GameGUI.prototype.clickGetReward = function() {
	this.closeRewardWindow()
};
GameGUI.prototype.closeRewardWindow = function() {
	_this = this.gameScreen;
	this.layerRewardWindowMain.visible = false;
	this.layerRewardWindow.visible = false;
	this.updateFortunaWheelWindow(_this.countDownNextFree);
	this.eventFonImputUp = this.closeFortunaWheelWindow;
	if (MainGame.reward_wheel) this.gameScreen.getRewards(MainGame.reward_wheel);
	MainGame.reward_wheel = null
};
GameGUI.prototype.clickShop = function() {
	_this = this.gameScreen;
	_this.isInputOverShopDown = false;
	_this.layerShop.visible = true;
	this.disableMainButtons();
	_this.clickShopTab1()
};
GameGUI.prototype.showBanner = function() {};
GameGUI.prototype.clickMuteSound = function() {
	MainGame.Sfx.manage("sound", "switch", this, this.buttonMuteSound.icon, this.buttonMuteSound.text)
};
GameGUI.prototype.clickMuteMusic = function() {
	MainGame.Sfx.manage("music", "switch", this, this.buttonMuteMusic.icon, this.buttonMuteMusic.text)
};
class Shooter extends Phaser.Scene {
	constructor() {
		super("Shooter")
	}
	create() {
		MainGame.state = this;
		MainGame.stateName = "Shooter";
		MainGame.GAME_TEXT = MainGame.TEXT_FILE[MainGame.languages[MainGame.language]];
		this.initResize();
		this.midX = this.GAME_WIDTH / 2;
		this.midY = this.GAME_HEIGHT / 2;
		this.initSettingsGame();
		const back = this.add.image(this.midX, this.midY, "bg_mergegunfire2");
		this.layerMob = this.add.container();
		this.layerEffect = this.add.container();
		this.layerSpineArm = this.add.container();
		this.layerUI = this.add.container();
		this.layerText = this.add.container();
		this.layerMob.setDepth(this.DEPTH_layerMob);
		this.layerEffect.setDepth(this.DEPTH_layerEffect);
		this.layerSpineArm.setDepth(this.DEPTH_layerArm);
		this.layerUI.setDepth(this.DEPTH_layerUI);
		this.layerText.setDepth(this.DEPTH_layerText);
		this.initEffects();
		this.initGUI();
		this.initComboTexts();
		this.initLevel();
		this.initWeapon();
		this.initPauseWindow();
		this.initFinishWindow();
		this.initSystemMessage();
		this.updateResize();
		this.text_hp.setText(this.hpPlayerNow);
		this.text_level.setText(MainGame.GAME_TEXT.day.toUpperCase() + " " + MainGame.fireLevel);
		this.updateAmmoText();
		this.updateFragsText();
		this.input.keyboard.on("keydown", this.handleKey, this);
		this.isAllowShoot = true;
		MainGame.isFromFireMode = true;
		if (MainGame.fireLevel == 1) {
			if (MainGame.isAPI) MainGame.API_POKI.commercialBreak();
			this.initTutorial()
		} else {
			if (MainGame.isAPI) MainGame.API_POKI.gameplayStart();
			if (MainGame.isAPI) MainGame.API_POKI.displayAd()
		}
		if (MainGame.firstGo) {
			this.input.once("pointerdown", this.playOnce, this)
		} else {
			MainGame.Sfx.play("music", "shoot")
		}
	}
	playOnce() {
		MainGame.firstGo = false;
		MainGame.Sfx.play("music", "shoot")
	}
	handleKey(e) {
		switch (e.code) {
			case "KeyR":
				this.clickBtnReload();
				break
		}
	}
	update() {
		if (this.isLevelFinished || this.isPaused) return;
		if (this.armReady && !this.isGameOver) this.updateArm();
		if (!this.isGoTutorial) {
			this.updateBots();
			this.updateCombo()
		}
	}
	initResize() {
		this.GAME_WIDTH = MainGame.Config.DEFAULT_WIDTH;
		this.GAME_HEIGHT = MainGame.Config.DEFAULT_HEIGHT;
		var gameSize = this.scale.gameSize;
		var width = gameSize.width;
		var height = gameSize.height;
		if (window.innerHeight < MainGame.Config.MAX_HEIGHT) {
			height = window.innerHeight
		}
		this.parent = new Phaser.Structs.Size(width, height);
		this.sizer = new Phaser.Structs.Size(this.GAME_WIDTH, this.GAME_HEIGHT, Phaser.Structs.Size.FIT, this.parent);
		this.parent.setSize(width, height);
		this.sizer.setSize(width, height);
		this.scale.on("resize", this.updateResize, this)
	}
	updateResize() {
		var gameSize = this.scale.gameSize;
		var width = gameSize.width;
		var height = gameSize.height;
		if (window.innerHeight < MainGame.Config.MAX_HEIGHT) {
			height = window.innerHeight
		}
		this.parent.setSize(width, height);
		this.sizer.setSize(width, height);
		this.updateCamera()
	}
	updateCamera() {
		const camera = this.cameras.main;
		var deltaX = Math.ceil(this.parent.width - this.sizer.width) * .5;
		var deltaY = Math.ceil(this.parent.height - this.sizer.height) * .5;
		var sdvigY = 0;
		if (window.innerHeight < MainGame.Config.MAX_HEIGHT) {
			deltaY = Math.ceil(window.innerHeight - this.sizer.height) * .5;
			sdvigY = this.scale.gameSize.height - window.innerHeight
		}
		const scaleX = this.sizer.width / this.GAME_WIDTH;
		const scaleY = this.sizer.height / this.GAME_HEIGHT;
		const zoom = Math.max(scaleX, scaleY);
		const offsetY = deltaY / zoom;
		const offsetX = deltaX / zoom;
		this.deltaScreenY = deltaY;
		camera.setZoom(zoom);
		camera.centerOn(this.GAME_WIDTH / 2, this.GAME_HEIGHT / 2 + sdvigY);
		this.btnExit.x = 1024 - 64 + offsetX;
		if (this.btnExit.x > 1024 + 100) this.btnExit.x = 1024 + 100;
		this.text_level.x = this.btnExit.x - 60;
		this.btnReload.x = 110 - offsetX;
		if (this.btnReload.x < -100 + 30) this.btnReload.x = -100 + 30;
		this.text_bullets.x = this.btnReload.x;
		this.icon_frag.x = 80 - offsetX;
		if (this.icon_frag.x < -100) this.icon_frag.x = -100;
		this.text_frags.x = this.icon_frag.x + 90;
		this.btnExit.y = 50 - offsetY;
		if (this.btnExit.y < -100 + 50) this.btnExit.y = -100 + 50;
		this.text_level.y = this.btnExit.y - 10;
		this.icon_frag.y = this.btnExit.y + 5;
		this.text_frags.y = this.icon_frag.y;
		this.hpBarB.y = 600 + offsetY;
		if (this.hpBarB.y > 600 + 100) this.hpBarB.y = 600 + 100;
		this.hpBarT.y = this.hpBarB.y;
		this.text_hp.y = this.hpBarB.y - 7;
		this.btnReload.y = 520 + offsetY;
		if (this.btnReload.y > 520 + 100) this.btnReload.y = 520 + 100;
		this.text_bullets.y = this.btnReload.y + 95
	}
	addCanvas(vLayer, vColor, vAlpha) {
		var canvas = this.add.image(this.midX, this.midY, "ss_shooter", "canvas_0000");
		canvas.tint = vColor;
		canvas.alpha = vAlpha;
		canvas.setScale(6);
		vLayer.add(canvas);
		return canvas
	}
	initSettingsGame() {
		MainGame.fireLevel = MainGame.fireLevel || 1;
		this.arOffsetWeapon = [{
			x: 140,
			y: 320,
			fx: 50,
			fy: 50,
			dmg: 30,
			ammo: 8,
			firerate: 500
		}, {
			x: 140,
			y: 320,
			fx: 45,
			fy: 45,
			dmg: 35,
			ammo: 17,
			firerate: 500
		}, {
			x: 140,
			y: 320,
			fx: 35,
			fy: 30,
			dmg: 40,
			ammo: 15,
			firerate: 400
		}, {
			x: 140,
			y: 320,
			fx: 20,
			fy: 20,
			dmg: 60,
			ammo: 9,
			firerate: 600
		}, {
			x: 140,
			y: 320,
			fx: -10,
			fy: -8,
			dmg: 80,
			ammo: 6,
			firerate: 700
		}, {
			x: 150,
			y: 320,
			fx: -10,
			fy: 5,
			dmg: 20,
			ammo: 30,
			firerate: 200
		}, {
			x: 200,
			y: 365,
			fx: 20,
			fy: 20,
			dmg: 35,
			ammo: 18,
			firerate: 300
		}, {
			x: 200,
			y: 365,
			fx: -10,
			fy: 0,
			dmg: 100,
			ammo: 2,
			firerate: 1e3
		}, {
			x: 200,
			y: 365,
			fx: 25,
			fy: 35,
			dmg: 50,
			ammo: 25,
			firerate: 300
		}, {
			x: 200,
			y: 365,
			fx: 20,
			fy: 20,
			dmg: 60,
			ammo: 30,
			firerate: 300
		}, {
			x: 200,
			y: 365,
			fx: -30,
			fy: -20,
			dmg: 150,
			ammo: 6,
			firerate: 600
		}, {
			x: 220,
			y: 365,
			fx: -30,
			fy: -25,
			dmg: 200,
			ammo: 6,
			firerate: 700
		}, {
			x: 210,
			y: 370,
			fx: -15,
			fy: -5,
			dmg: 80,
			ammo: 30,
			firerate: 330
		}, {
			x: 210,
			y: 365,
			fx: -5,
			fy: 5,
			dmg: 100,
			ammo: 30,
			firerate: 330
		}, {
			x: 210,
			y: 370,
			fx: -10,
			fy: 5,
			dmg: 80,
			ammo: 35,
			firerate: 330
		}, {
			x: 210,
			y: 365,
			fx: -5,
			fy: 25,
			dmg: 90,
			ammo: 30,
			firerate: 330
		}, {
			x: 195,
			y: 355,
			fx: 50,
			fy: 65,
			dmg: 60,
			ammo: 50,
			firerate: 200
		}, {
			x: 200,
			y: 365,
			fx: 15,
			fy: -5,
			dmg: 450,
			ammo: 9,
			firerate: 800
		}, {
			x: 200,
			y: 365,
			fx: -10,
			fy: -5,
			dmg: 500,
			ammo: 6,
			firerate: 800
		}, {
			x: 140,
			y: 320,
			fx: 30,
			fy: 30,
			dmg: 160,
			ammo: 12,
			firerate: 300
		}, {
			x: 140,
			y: 320,
			fx: -10,
			fy: -10,
			dmg: 250,
			ammo: 8,
			firerate: 450
		}, {
			x: 220,
			y: 365,
			fx: -25,
			fy: -20,
			dmg: 450,
			ammo: 7,
			firerate: 600
		}, {
			x: 210,
			y: 365,
			fx: -40,
			fy: -10,
			dmg: 200,
			ammo: 64,
			firerate: 400
		}, {
			x: 210,
			y: 365,
			fx: 45,
			fy: 45,
			dmg: 200,
			ammo: 25,
			firerate: 300
		}, {
			x: 210,
			y: 365,
			fx: -10,
			fy: -10,
			dmg: 600,
			ammo: 6,
			firerate: 600
		}, {
			x: 200,
			y: 365,
			fx: -40,
			fy: -20,
			dmg: 600,
			ammo: 5,
			firerate: 550
		}, {
			x: 220,
			y: 365,
			fx: -5,
			fy: -5,
			dmg: 100,
			ammo: 100,
			firerate: 150
		}, {
			x: 210,
			y: 365,
			fx: 35,
			fy: 40,
			dmg: 250,
			ammo: 50,
			firerate: 250
		}, {
			x: 230,
			y: 365,
			fx: -5,
			fy: -5,
			dmg: 500,
			ammo: 7,
			firerate: 500
		}, {
			x: 230,
			y: 365,
			fx: -40,
			fy: -40,
			dmg: 700,
			ammo: 7,
			firerate: 650
		}, {
			x: 230,
			y: 365,
			fx: 25,
			fy: 25,
			dmg: 450,
			ammo: 20,
			firerate: 500
		}, {
			x: 200,
			y: 340,
			fx: 50,
			fy: 20,
			dmg: 250,
			ammo: 22,
			firerate: 200
		}, {
			x: 140,
			y: 320,
			fx: 0,
			fy: -5,
			dmg: 300,
			ammo: 12,
			firerate: 400
		}, {
			x: 210,
			y: 365,
			fx: 35,
			fy: 45,
			dmg: 300,
			ammo: 30,
			firerate: 300
		}, {
			x: 210,
			y: 365,
			fx: 25,
			fy: 30,
			dmg: 300,
			ammo: 25,
			firerate: 300
		}, {
			x: 210,
			y: 365,
			fx: 15,
			fy: 25,
			dmg: 300,
			ammo: 30,
			firerate: 300
		}, {
			x: 210,
			y: 365,
			fx: -5,
			fy: 10,
			dmg: 300,
			ammo: 30,
			firerate: 300
		}, {
			x: 220,
			y: 340,
			fx: -35,
			fy: -30,
			dmg: 400,
			ammo: 7,
			firerate: 500
		}, {
			x: 220,
			y: 340,
			fx: -10,
			fy: -15,
			dmg: 650,
			ammo: 8,
			firerate: 500
		}, {
			x: 210,
			y: 365,
			fx: -35,
			fy: -40,
			dmg: 700,
			ammo: 9,
			firerate: 500
		}, {
			x: 210,
			y: 365,
			fx: 0,
			fy: -5,
			dmg: 600,
			ammo: 30,
			firerate: 300
		}, {
			x: 140,
			y: 320,
			fx: 25,
			fy: 25,
			dmg: 350,
			ammo: 12,
			firerate: 300
		}, {
			x: 140,
			y: 320,
			fx: 10,
			fy: 20,
			dmg: 500,
			ammo: 22,
			firerate: 350
		}, {
			x: 200,
			y: 365,
			fx: 0,
			fy: -30,
			dmg: 900,
			ammo: 8,
			firerate: 600
		}, {
			x: 210,
			y: 365,
			fx: 5,
			fy: 15,
			dmg: 700,
			ammo: 30,
			firerate: 300
		}, {
			x: 220,
			y: 365,
			fx: -20,
			fy: -10,
			dmg: 700,
			ammo: 30,
			firerate: 400
		}, {
			x: 220,
			y: 365,
			fx: 0,
			fy: 0,
			dmg: 700,
			ammo: 30,
			firerate: 400
		}, {
			x: 220,
			y: 365,
			fx: -20,
			fy: 0,
			dmg: 800,
			ammo: 15,
			firerate: 400
		}, {
			x: 230,
			y: 365,
			fx: -35,
			fy: -30,
			dmg: 1e3,
			ammo: 15,
			firerate: 400
		}, {
			x: 220,
			y: 365,
			fx: -20,
			fy: -30,
			dmg: 1200,
			ammo: 20,
			firerate: 400
		}];
		this.scaleWindow1 = .7;
		this.scaleWindow2 = .85;
		this.MAX_TOP = 90;
		this.MAX_BOTTOM = 550;
		this.DEPTH_layerMob = .21;
		this.DEPTH_layerEffect = .22;
		this.DEPTH_layerArm = .23;
		this.DEPTH_layerUI = .24;
		this.DEPTH_layerText = .25;
		this.DEPTH_layerFinish = .26;
		this.DEPTH_systemtext = .6;
		this.aimScale = 2;
		this.isBeforeStart = false;
		this.suggestRevive = true;
		this.isLevelFinished = false;
		this.isGameOver = false;
		this.isPaused = false;
		this.hpPlayerMax = 100;
		this.hpPlayerNow = this.hpPlayerMax;
		this.countFrags = 0;
		this.isGoTutorial = false;
		this.armReady = false;
		this.isInputPressed = false;
		this.isReloading = false;
		this.WEAPON_WEIGHT = .21;
		this.countEnemies = 0;
		this.arTargets = [];
		this.posInputDown = {
			x: this.midX,
			y: this.midY
		};
		this.lastPos = {
			x: this.midX,
			y: this.midY
		};
		this.posCursor = {
			x: this.midX,
			y: this.midY
		};
		this.posWeapon = {
			x: 0,
			y: 0
		};
		this.offsetWeapon = {
			x: 0,
			y: 0
		};
		this.offsetFire = {
			x: 0,
			y: 0
		};
		this.deltaScreenY = 0;
		this.maxPosX = 80 * 13;
		this.minPosX = 0;
		this.arrRespawns1 = [4, 5, 8, 9];
		this.arrRespawns2 = [2, 3, 6, 7, 10, 11];
		this.TIME_RELOADING = 1800;
		this.needToKill = 7 + Math.floor(MainGame.fireLevel / 8);
		if (MainGame.fireLevel == 1) this.needToKill = 5;
		var settingsWeapon = this.arOffsetWeapon[MainGame.selectedGun - 1];
		this.FIRERATE = settingsWeapon.firerate;
		this.damageWeapons = settingsWeapon.dmg;
		this.maxAmmo = settingsWeapon.ammo;
		this.countBots = this.needToKill;
		this.amountAmmo = this.maxAmmo
	}
	addText(vLayer, vX, vY, vText, vSize, vIsUpperCase) {
		vX -= 1;
		vY -= 1;
		vText = vText.toString();
		if (vText && vIsUpperCase) vText = vText.toUpperCase();
		var txt = this.add.bitmapText(vX, vY, "Panton", vText);
		txt.setFontSize(vSize);
		txt.setOrigin(.5);
		if (vLayer) vLayer.add(txt);
		return txt
	}
	initEffects() {
		this.anims.create({
			key: "flash_big",
			frames: this.anims.generateFrameNames("ss_shooter", {
				prefix: "flash_big_",
				end: 5,
				zeroPad: 4
			}),
			hideOnComplete: true
		});
		this.anims.create({
			key: "magic_1",
			frames: this.anims.generateFrameNames("ss_ui", {
				prefix: "magic_1_",
				end: 14,
				zeroPad: 4
			}),
			hideOnComplete: false,
			repeat: -1
		});
		this.anims.create({
			key: "flash",
			frames: this.anims.generateFrameNames("ss_shooter", {
				prefix: "flash_",
				end: 7,
				zeroPad: 4
			}),
			hideOnComplete: true
		});
		this.anims.create({
			key: "effect_kick",
			frames: this.anims.generateFrameNames("ss_shooter", {
				prefix: "effect_kick_",
				end: 7,
				zeroPad: 4
			}),
			hideOnComplete: true
		});
		this.anims.create({
			key: "target_idle",
			frames: this.anims.generateFrameNames("ss_shooter", {
				prefix: "target_idle_",
				end: 0,
				zeroPad: 4
			}),
			hideOnComplete: false
		});
		this.anims.create({
			key: "target_down",
			frames: this.anims.generateFrameNames("ss_shooter", {
				prefix: "target_down_",
				end: 11,
				zeroPad: 4
			}),
			hideOnComplete: false
		})
	}
	initPauseWindow() {
		this.layerPauseWindowMain = this.add.container();
		this.layerPauseWindow = this.add.container();
		this.layerPauseWindowMain.setDepth(this.DEPTH_layerFinish);
		this.layerPauseWindow.setDepth(this.DEPTH_layerFinish);
		this.layerPauseWindow.x = this.midX;
		this.layerPauseWindow.y = this.midY;
		var fon_merge = this.add.image(this.midX, this.midY, "ss_ui", "bg_connect2_0000");
		fon_merge.setScale(2);
		this.layerPauseWindowMain.add(fon_merge);
		var popup_drop = this.add.image(0, 0, "ss_ui", "popup_drop_0000");
		popup_drop.setScale(2);
		this.layerPauseWindow.add(popup_drop);
		var posX = 0;
		var posY = -95;
		var buttonResume = new ButtonText(0, posY, "ss_ui", "btn_buy2_0000", this.clickBtnResume, this, MainGame.GAME_TEXT.resume);
		buttonResume.text.setFontSize(24);
		buttonResume.text.y = -5;
		this.layerPauseWindow.add(buttonResume);
		MainGame.updateTextWidth(buttonResume.text, 140);
		var buttonMuteMusic = new ButtonText(0, buttonResume.y + 85, "ss_ui", "btn_buy_0000", this.clickMuteMusic, this, MainGame.GAME_TEXT.music_on);
		buttonMuteMusic.text.setFontSize(24);
		buttonMuteMusic.text.x = 20;
		buttonMuteMusic.text.y = -5;
		this.layerPauseWindow.add(buttonMuteMusic);
		MainGame.updateTextWidth(buttonMuteMusic.text, 140);
		var icon_music = this.add.image(-85, -5, "ss_ui", "btn_music_0000");
		buttonMuteMusic.add(icon_music);
		this.buttonMuteMusic = buttonMuteMusic;
		this.buttonMuteMusic.icon = icon_music;
		var buttonMuteSound = new ButtonText(0, buttonMuteMusic.y + 80, "ss_ui", "btn_buy_0000", this.clickMuteSound, this, MainGame.GAME_TEXT.sound_on);
		buttonMuteSound.text.setFontSize(24);
		buttonMuteSound.text.x = 20;
		buttonMuteSound.text.y = -5;
		this.layerPauseWindow.add(buttonMuteSound);
		MainGame.updateTextWidth(buttonMuteSound.text, 140);
		var buttonHome = new ButtonText(0, buttonMuteSound.y + 80, "ss_ui", "btn_buy_0000", this.showGameScreen, this, MainGame.GAME_TEXT.home);
		buttonHome.text.setFontSize(24);
		buttonHome.text.y = -5;
		this.layerPauseWindow.add(buttonHome);
		MainGame.updateTextWidth(buttonHome.text, 140);
		var icon_sound = this.add.image(-85, -5, "ss_ui", "btn_sound_0000");
		buttonMuteSound.add(icon_sound);
		this.buttonMuteSound = buttonMuteSound;
		this.buttonMuteSound.icon = icon_sound;
		var text_title = this.addText(this.layerPauseWindow, 0, -185, MainGame.GAME_TEXT.paused, 34, true);
		MainGame.updateTextWidth(text_title, 380);
		this.layerPauseWindow.setScale(this.scaleWindow2);
		this.layerPauseWindowMain.visible = false;
		this.layerPauseWindow.visible = false;
		popup_drop.setInteractive();
		fon_merge.setInteractive();
		fon_merge.on("pointerup", this.clickBtnResume, this);
		this.buttonPauseHome = buttonHome
	}
	clickMuteSound() {
		MainGame.Sfx.manage("sound", "switch", this, this.buttonMuteSound.icon, this.buttonMuteSound.text)
	}
	clickMuteMusic() {
		MainGame.Sfx.manage("music", "switch", this, this.buttonMuteMusic.icon, this.buttonMuteMusic.text)
	}
	clickBtnResume() {
		this.isPaused = false;
		this.layerPauseWindowMain.visible = false;
		this.layerPauseWindow.visible = false;
		this.resumeBots();
		if (MainGame.isAPI) MainGame.API_POKI.gameplayStart()
	}
	initFinishWindow() {
		this.layerFinishWindowMain = this.add.container();
		this.layerFinishWindow = this.add.container();
		this.layerFinishWindowMain.setDepth(this.DEPTH_layerFinish);
		this.layerFinishWindow.setDepth(this.DEPTH_layerFinish);
		this.layerFinishWindow.x = this.midX;
		this.layerFinishWindow.y = this.midY;
		var fon_merge = this.add.image(this.midX, this.midY, "ss_ui", "bg_connect2_0000");
		fon_merge.setScale(2);
		this.layerFinishWindowMain.add(fon_merge);
		var popup_drop = this.add.image(0, 0, "ss_ui", "popup_drop_0000");
		popup_drop.setScale(2);
		this.layerFinishWindow.add(popup_drop);
		var posX = 0;
		var posY = -25;
		var effect = this.add.sprite(posX, posY, "ss_ui");
		effect.play("magic_1");
		effect.setScale(2);
		this.layerFinishWindow.add(effect);
		var reward_diamond = this.add.image(posX, posY, "ss_ui", "reward_diamond_0000");
		this.layerFinishWindow.add(reward_diamond);
		var buttonIncomeX2 = new ButtonText(0, 90, "ss_ui", "btn_buy2_0000", this.showAdsForDiamondsX2, this, MainGame.GAME_TEXT.income_x2);
		buttonIncomeX2.text.setFontSize(26);
		buttonIncomeX2.text.x = -30;
		buttonIncomeX2.text.y = -4;
		this.layerFinishWindow.add(buttonIncomeX2);
		MainGame.updateTextWidth(buttonIncomeX2.text, 200);
		var icon_reward = this.add.image(75, -2, "ss_ui", "icon_reward_0000");
		buttonIncomeX2.add(icon_reward);
		var buttonGet = new ButtonText(0, 170, "ss_ui", "btn_buy_g2_0000", this.closeFinishWindow, this, MainGame.GAME_TEXT.get);
		buttonGet.text.setFontSize(26);
		this.layerFinishWindow.add(buttonGet);
		MainGame.updateTextWidth(buttonGet.text, 200);
		buttonGet.text.y = -4;
		this.rewardDiamonds = 10 + Math.floor(MainGame.fireLevel / 5);
		var text_diamonds = this.addText(this.layerFinishWindow, posX + 30, posY + 30, this.rewardDiamonds, 60, true);
		text_diamonds.setDropShadow(3, 3, 0, 1);
		var buttonHome = new ButtonText(0, 170, "ss_ui", "btn_buy_g2_0000", this.closeFinishWindow, this, MainGame.GAME_TEXT.home);
		buttonHome.text.setFontSize(26);
		this.layerFinishWindow.add(buttonHome);
		MainGame.updateTextWidth(buttonHome.text, 200);
		buttonHome.text.y = -4;
		buttonHome.setEnable(false);
		var buttonRevive = new ButtonText(0, -22, "ss_ui", "btn_revive_0000", this.clickRevive, this, MainGame.GAME_TEXT.revive);
		buttonRevive.text.setFontSize(30);
		buttonRevive.text.x = 0;
		buttonRevive.text.y = -10;
		this.layerFinishWindow.add(buttonRevive);
		MainGame.updateTextWidth(buttonRevive.text, 200);
		var buttonReplay = new Button(0, -22, "ss_ui", "btn_replay_0000", this.clickReplay, this);
		this.layerFinishWindow.add(buttonReplay);
		var icon_reward = this.add.image(0, 35, "ss_ui", "icon_reward_0000");
		buttonRevive.add(icon_reward);
		var text_no_give_up = this.addText(this.layerFinishWindow, 0, 85, MainGame.GAME_TEXT.no_give_up, 22, true);
		var text_try_merge_gun = this.addText(this.layerFinishWindow, 0, 115, MainGame.GAME_TEXT.try_merge_gun, 22, true);
		var text_count_revive = this.addText(buttonRevive, 0, -47, "", 40, true);
		var text_title = this.addText(this.layerFinishWindow, 0, -185, "", 34, true);
		MainGame.updateTextWidth(text_title, 380);
		var text_day = this.addText(this.layerFinishWindow, 0, -130, "", 30, true);
		text_day.setTint(16773888);
		text_day.setText(MainGame.GAME_TEXT.day.toUpperCase() + " " + MainGame.fireLevel);
		this.layerFinishWindow.setScale(this.scaleWindow2);
		this.layerFinishWindowMain.visible = false;
		this.layerFinishWindow.visible = false;
		this.buttonIncomeX2 = buttonIncomeX2;
		this.buttonGet = buttonGet;
		this.effect_diamonds = effect;
		this.reward_diamond = reward_diamond;
		this.text_diamonds = text_diamonds;
		this.title_finish = text_title;
		this.buttonHome = buttonHome;
		this.buttonRevive = buttonRevive;
		this.buttonReplay = buttonReplay;
		this.text_count_revive = text_count_revive;
		this.text_no_give_up = text_no_give_up;
		this.text_try_merge_gun = text_try_merge_gun
	}
	closeFinishWindow() {
		this.showGameScreen(true)
	}
	initGUI() {
		this.layerRed = this.addCanvas(this.layerUI, 8126464, .6);
		this.layerRed.alpha = 0;
		var btnExit = new Button(1024 - 64, 50, "ss_shooter", "btn_pause_0000", this.clickBtnPause, this);
		this.layerUI.add(btnExit);
		var btnReload = new Button(80 + 30, 520, "ss_shooter", "btn_reload_0000", this.clickBtnReload, this);
		this.layerUI.add(btnReload);
		var aim_target = this.add.image(this.posCursor.x, this.posCursor.y, "ss_shooter", "crosshair2_0000");
		this.layerUI.add(aim_target);
		var aim_reloading = this.add.image(this.posCursor.x, this.posCursor.y, "ss_shooter", "crosshair4_0000");
		this.layerUI.add(aim_reloading);
		aim_reloading.visible = false;
		this.tweens.add({
			targets: aim_reloading,
			angle: 360,
			ease: Phaser.Math.Easing.Linear,
			duration: 800,
			repeat: -1
		});
		var icon_frag = this.add.image(80, 55, "ss_shooter", "icon_frag_0000");
		this.layerUI.add(icon_frag);
		var pos = {
			x: this.midX,
			y: 600
		};
		this.hpBarB = this.add.image(pos.x, pos.y, "ss_shooter", "hp_bar1_0000");
		this.hpBarT = this.add.image(pos.x, pos.y, "ss_shooter", "hp_bar2_0000");
		this.hpBarT_crop = new Phaser.Geom.Rectangle(0, 0, this.hpBarT.width, this.hpBarT.height);
		this.hpBarT.setCrop(this.hpBarT_crop);
		this.layerUI.add(this.hpBarB);
		this.layerUI.add(this.hpBarT);
		var text_hp = this.addText(this.layerText, pos.x - 167, pos.y - 7, "", 30, true);
		text_hp.setOrigin(0, .5);
		text_hp.setTint(2286098);
		var text_level = this.addText(this.layerText, btnExit.x - 60, 40, "", 32, true);
		text_level.setOrigin(1, .5);
		var text_frags = this.addText(this.layerText, icon_frag.x + 90, icon_frag.y, "10/10", 32, true);
		var text_bullets = this.addText(this.layerText, btnReload.x, btnReload.y + 95, "", 32, true);
		this.btnReload = btnReload;
		this.btnExit = btnExit;
		this.icon_frag = icon_frag;
		this.aim_target = aim_target;
		this.aim_reloading = aim_reloading;
		this.text_hp = text_hp;
		this.text_level = text_level;
		this.text_frags = text_frags;
		this.text_bullets = text_bullets
	}
	initComboTexts() {
		this.arComboText = [];
		this.countCombo = 0;
		this.poolCombo = 0;
		this.timerCombo = 0;
		var text_combo1 = this.addText(this.layerText, 0, 0, "", 32, true);
		text_combo1.setTint(16776960);
		text_combo1.setDropShadow(3, 3, 6570541, .7);
		var text_combo2 = this.addText(this.layerText, 0, 0, "", 32, true);
		text_combo2.setTint(16776960);
		text_combo2.setDropShadow(3, 3, 6570541, .7);
		var text_combo3 = this.addText(this.layerText, 0, 0, "", 32, true);
		text_combo3.setTint(16776960);
		text_combo3.setDropShadow(3, 3, 6570541, .7);
		this.arComboText.push(text_combo1);
		this.arComboText.push(text_combo2);
		this.arComboText.push(text_combo3);
		text_combo1.visible = false;
		text_combo2.visible = false;
		text_combo3.visible = false
	}
	updateCombo() {
		if (this.timerCombo > 0) {
			this.timerCombo--;
			if (this.timerCombo == 0) this.countCombo = 0
		}
	}
	checkCombo(vX, vY) {
		this.timerCombo = 70;
		this.countCombo++;
		if (this.countCombo < 2) return;
		if (this.countCombo > 10) this.countCombo = 10;
		this.showCombo(vX, vY, this.arComboText[this.poolCombo], MainGame.GAME_TEXT["combo" + (this.countCombo - 1)]);
		this.poolCombo++;
		if (this.poolCombo > 2) this.poolCombo = 0
	}
	showCombo(vX, vY, vTextField, vValue) {
		vTextField.x = vX;
		vTextField.y = vY - 120;
		vTextField.visible = true;
		vTextField.setText(vValue.toUpperCase());
		this.tweens.killTweensOf(vTextField);
		vTextField.setAngle(2 * MyMath.getRandomInt(-5, 5));
		vTextField.setScale(1);
		this.tweens.add({
			targets: vTextField,
			scaleX: 1.4,
			scaleY: 1.4,
			ease: Phaser.Math.Easing.Linear,
			duration: 100,
			yoyo: true,
			onComplete: this.hideCombo(vTextField)
		})
	}
	hideCombo(vTextField) {
		this.tweens.add({
			targets: vTextField,
			scaleX: .5,
			scaleY: .5,
			ease: Phaser.Math.Easing.Linear,
			duration: 150,
			delay: 500,
			onComplete: function() {
				vTextField.visible = false
			}
		})
	}
	updateHpBar(progress) {
		var originalWidth = this.hpBarT.width;
		var width = originalWidth * progress;
		this.tweens.killTweensOf(this.hpBarT_crop);
		this.tweens.add({
			targets: this.hpBarT_crop,
			width: width,
			ease: Phaser.Math.Easing.Linear,
			duration: 100,
			delay: 0,
			onUpdate: () => {
				this.hpBarT.setCrop(this.hpBarT_crop)
			}
		})
	}
	addSmoke() {
		var smoke = this.add.image(0, 0, "ss_shooter", "smoke_0000");
		smoke.setOrigin(.5, .92);
		smoke.visible = false;
		return smoke
	}
	showEffectSmoke(vSmoke) {
		vSmoke.visible = true;
		this.tweens.killTweensOf(vSmoke);
		vSmoke.alpha = 1;
		vSmoke.angle = 35;
		vSmoke.x = 0;
		vSmoke.scaleX = 1;
		vSmoke.scaleY = 1;
		this.tweens.add({
			targets: vSmoke,
			x: 20,
			angle: 45,
			alpha: 0,
			scaleX: 1.1,
			scaleY: 1.1,
			ease: Phaser.Math.Easing.Linear,
			duration: 500,
			onComplete: function() {
				vSmoke.visible = false
			}
		})
	}
	testWeapon(vType) {
		MainGame.selectedGun = vType;
		var settingsWeapon = this.arOffsetWeapon[MainGame.selectedGun - 1];
		this.FIRERATE = settingsWeapon.firerate;
		this.damageWeapons = settingsWeapon.dmg;
		this.maxAmmo = settingsWeapon.ammo;
		this.offsetWeapon.x = settingsWeapon.x;
		this.offsetWeapon.y = settingsWeapon.y;
		this.offsetFire.x = settingsWeapon.fx;
		this.offsetFire.y = settingsWeapon.fy;
		var ar_pistol = [1, 2, 3, 4, 5, 6, 20, 21, 33, 42, 43];
		var ar_rifle1 = [12, 14, 22, 25, 27, 39];
		var ar_rifle2 = [7, 8, 10, 18, 19, 26, 44];
		var ar_rifle3 = [9, 11, 13, 15, 23, 29, 30, 31, 36, 37, 38, 40, 41, 46, 47, 48, 49, 50];
		var ar_rifle4 = [16, 17, 24, 28, 32, 34, 35, 45];
		var isPistol = ar_pistol.indexOf(MainGame.selectedGun) !== -1;
		var isRifle1 = ar_rifle1.indexOf(MainGame.selectedGun) !== -1;
		var isRifle2 = ar_rifle2.indexOf(MainGame.selectedGun) !== -1;
		var isRifle3 = ar_rifle3.indexOf(MainGame.selectedGun) !== -1;
		var isRifle4 = ar_rifle4.indexOf(MainGame.selectedGun) !== -1;
		this.weaponType = "pistol";
		if (isRifle1) this.weaponType = "rifle1";
		if (isRifle2) this.weaponType = "rifle2";
		if (isRifle3) this.weaponType = "rifle3";
		if (isRifle4) this.weaponType = "rifle4";
		this.arm_weapon.timeScale = 1;
		this.arm_weapon.setSkinByName("gun" + MainGame.selectedGun);
		this.arm_weapon.play(this.weaponType + "_idle", false);
		this.amountAmmo = this.maxAmmo;
		this.updateAmmoText()
	}
	initWeapon() {
		this.posCursor = {
			x: this.midX,
			y: this.midY
		};
		var settingsWeapon = this.arOffsetWeapon[MainGame.selectedGun - 1];
		this.offsetWeapon.x = settingsWeapon.x;
		this.offsetWeapon.y = settingsWeapon.y;
		this.offsetFire.x = settingsWeapon.fx;
		this.offsetFire.y = settingsWeapon.fy;
		var arm_weapon = this.add.spine(0, 0, "spine_shooter", "pistol_idle", true);
		this.layerSpineArm.add(arm_weapon);
		arm_weapon.x = this.midX;
		arm_weapon.y = 500;
		arm_weapon.setSkinByName("gun" + MainGame.selectedGun);
		arm_weapon.setScale(this.aimScale);
		MainGame.api_google("SelectedGun", MainGame.selectedGun);
		var ar_pistol = [1, 2, 3, 4, 5, 6, 20, 21, 33, 42, 43];
		var ar_rifle1 = [12, 14, 22, 25, 27, 39];
		var ar_rifle2 = [7, 8, 10, 18, 19, 26, 44];
		var ar_rifle3 = [9, 11, 13, 15, 23, 29, 30, 31, 36, 37, 38, 40, 41, 46, 47, 48, 49, 50];
		var ar_rifle4 = [16, 17, 24, 28, 32, 34, 35, 45];
		var isPistol = ar_pistol.indexOf(MainGame.selectedGun) !== -1;
		var isRifle1 = ar_rifle1.indexOf(MainGame.selectedGun) !== -1;
		var isRifle2 = ar_rifle2.indexOf(MainGame.selectedGun) !== -1;
		var isRifle3 = ar_rifle3.indexOf(MainGame.selectedGun) !== -1;
		var isRifle4 = ar_rifle4.indexOf(MainGame.selectedGun) !== -1;
		this.weaponType = "pistol";
		if (isRifle1) this.weaponType = "rifle1";
		if (isRifle2) this.weaponType = "rifle2";
		if (isRifle3) this.weaponType = "rifle3";
		if (isRifle4) this.weaponType = "rifle4";
		arm_weapon.play(this.weaponType + "_idle", false);
		this.arm_weapon = arm_weapon;
		if (this.aim_target) {
			this.arm_weapon.x = this.aim_target.x + this.offsetWeapon.x;
			this.arm_weapon.y = this.aim_target.y + this.offsetWeapon.y
		}
		this.input.on("pointerdown", this.onInputDown, this);
		this.input.on("pointerup", this.onInputUp, this);
		this.input.on("pointermove", this.onInputMove, this);
		game.canvas.style.cursor = "none";
		this.armReady = true;
		this.group_smoke1 = this.add.container();
		this.layerEffect.add(this.group_smoke1);
		this.group_smoke2 = this.add.container();
		this.layerEffect.add(this.group_smoke2);
		this.group_smoke3 = this.add.container();
		this.layerEffect.add(this.group_smoke3);
		this.effect_smoke1 = this.addSmoke();
		this.group_smoke1.add(this.effect_smoke1);
		this.effect_smoke2 = this.addSmoke();
		this.group_smoke2.add(this.effect_smoke2);
		this.effect_smoke3 = this.addSmoke();
		this.group_smoke3.add(this.effect_smoke3);
		var effect = this.add.sprite(this.midX, this.midY, "ss_shooter");
		effect.play("flash_big");
		effect.visible = false;
		this.effect_shoot = effect;
		this.layerEffect.add(effect)
	}
	getInputPosition(pointer) {
		const deltaX = Math.ceil(this.parent.width - this.sizer.width) * .5;
		const deltaY = Math.ceil(this.parent.height - this.sizer.height) * .5;
		const scaleX = this.sizer.width / this.GAME_WIDTH;
		const scaleY = this.sizer.height / this.GAME_HEIGHT;
		const zoom = Math.max(scaleX, scaleY);
		const offset = deltaY / zoom;
		var pX = (pointer.x - deltaX) / zoom;
		var pY = pointer.y / zoom - offset;
		return {
			x: pX,
			y: pY
		}
	}
	onInputDown(pointer) {
		var pos = this.getInputPosition(pointer);
		this.posInputDown = pos;
		this.isInputPressed = true
	}
	onInputUp(pointer) {
		var pos = this.getInputPosition(pointer);
		this.lastPos = this.posCursor;
		this.isInputPressed = false
	}
	onInputMove(pointer) {
		if (this.isLevelFinished || this.isPaused || this.isBeforeStart) return;
		this.posCursor = this.getInputPosition(pointer);
		if (!MainGame.isDesktop) {
			this.posCursor.x = this.lastPos.x + (this.posCursor.x - this.posInputDown.x) * 1.5;
			this.posCursor.y = this.lastPos.y + (this.posCursor.y - this.posInputDown.y) * 1.2
		}
		var deltaX = 25;
		if (this.posCursor.x < deltaX) this.posCursor.x = deltaX;
		if (this.posCursor.x > 1024 - deltaX) this.posCursor.x = 1024 - deltaX;
		if (this.posCursor.y < this.MAX_TOP) {
			this.posCursor.y = this.MAX_TOP;
			game.canvas.style.cursor = "default"
		} else if (this.posCursor.y > this.MAX_BOTTOM) {
			this.posCursor.y = this.MAX_BOTTOM;
			game.canvas.style.cursor = "default"
		} else {
			game.canvas.style.cursor = "none"
		}
	}
	updateReloading(vBool) {
		this.isReloading = vBool;
		this.aim_reloading.visible = vBool;
		this.arm_weapon.timeScale = 1;
		if (vBool) {
			this.aim_target.setFrame("crosshair1_0000");
			this.arm_weapon.play(this.weaponType + "_reload", false);
			this.timerReloading = this.time.delayedCall(this.TIME_RELOADING, this.finishedReloading, [], this);
			MainGame.Sfx.play("sound", "reload")
		} else {
			this.aim_target.setFrame("crosshair2_0000");
			this.arm_weapon.play(this.weaponType + "_idle", false);
			this.amountAmmo = this.maxAmmo;
			this.updateAmmoText()
		}
	}
	finishedReloading() {
		this.updateReloading(false);
		this.timerReloading.remove();
		this.timerReloading = null
	}
	updateArm() {
		if (this.posCursor) {
			this.aim_target.x = this.posCursor.x;
			this.aim_target.y = this.posCursor.y;
			this.aim_reloading.x = this.posCursor.x - 2;
			this.aim_reloading.y = this.posCursor.y - 2;
			var distY = 750 - this.posCursor.y;
			var deltaX = Math.floor(distY * .25);
			this.posWeapon.x = this.posCursor.x + deltaX;
			if (this.posWeapon.x > 950) this.posWeapon.x = 950;
			var deltaY = Math.floor(distY * .2);
			this.posWeapon.y = this.posCursor.y + deltaY;
			if (this.posWeapon.y < 280) this.posWeapon.y = 280;
			this.arm_weapon.x -= (this.arm_weapon.x - this.offsetWeapon.x - this.posWeapon.x) * this.WEAPON_WEIGHT;
			this.arm_weapon.y -= (this.arm_weapon.y - this.offsetWeapon.y - this.deltaScreenY - this.posWeapon.y) * this.WEAPON_WEIGHT;
			this.effect_shoot.x = this.arm_weapon.x - this.offsetWeapon.x + this.offsetFire.x;
			this.effect_shoot.y = this.arm_weapon.y - this.offsetWeapon.y + this.offsetFire.y
		}
		if (this.isReloading || this.isLevelFinished) return;
		var target;
		var dist;
		this.aim_target.setFrame("crosshair2_0000");
		if (!this.checkBarrels(this.aim_target.x, this.aim_target.y)) {
			for (var i = 0; i < this.countEnemies; i++) {
				target = this.arTargets[i];
				if (target && target.hero && target.isAlive()) {
					dist = MyMath.distanceTwoPoints(this.aim_target.x, target.hero.x, this.aim_target.y, target.hero.y - 50);
					if (dist < 3200) {
						var isUnderBarrel = this.checkBarrels(target.hero.x, target.hero.y - 20);
						if (isUnderBarrel && target.isPrised) {} else {
							this.aim_target.setFrame("crosshair3_0000");
							this.makeShoot(target, this.aim_target.x, this.aim_target.y)
						}
					}
				}
			}
		}
	}
	onAnimEvent(entry) {
		if (entry.animation.name == this.weaponType + "_idle") {}
		console.log(entry.animation.name)
	}
	showEffectFire(vX, vY) {
		this.effect_shoot.play("flash_big");
		this.effect_shoot.visible = true;
		if (!this.effect_smoke1.visible) {
			this.showEffectSmoke(this.effect_smoke1);
			this.group_smoke1.x = vX;
			this.group_smoke1.y = vY
		} else {
			if (!this.effect_smoke2.visible) {
				this.showEffectSmoke(this.effect_smoke2);
				this.group_smoke2.x = vX;
				this.group_smoke2.y = vY
			} else {
				if (!this.effect_smoke3.visible) {
					this.showEffectSmoke(this.effect_smoke3);
					this.group_smoke3.x = vX;
					this.group_smoke3.y = vY
				} else {
					this.showEffectSmoke(this.effect_smoke1);
					this.group_smoke1.x = vX;
					this.group_smoke1.y = vY
				}
			}
		}
	}
	updateAmmoText() {
		this.text_bullets.setText(this.amountAmmo + "/" + this.maxAmmo)
	}
	updateFragsText() {
		this.text_frags.setText(this.countFrags + "/" + this.needToKill)
	}
	getCountBots() {
		this.countBots--;
		return this.countBots >= 0
	}
	reviveLevel() {
		this.isLevelFinished = false;
		this.isGameOver = false;
		this.hpPlayerNow = this.hpPlayerMax;
		this.text_hp.setText(this.hpPlayerNow);
		this.updateHpBar(this.hpPlayerNow / this.hpPlayerMax);
		this.layerFinishWindowMain.visible = false;
		this.layerFinishWindow.visible = false;
		this.layerRed.alpha = 0;
		this.tweens.killTweensOf(this.layerRed);
		this.btnExit.visible = true;
		MainGame.api_google("Revive", MainGame.fireLevel);
		if (MainGame.isAPI) MainGame.API_POKI.gameplayStart()
	}
	finishLevel(vBool) {
		this.btnExit.visible = false;
		if (vBool) {
			MainGame.api_google("CompletedDay", MainGame.fireLevel);
			this.time.delayedCall(1200, this.showFinishWindowWin, [], this);
			MainGame.fireLevel++;
			MainGame.saveSaves()
		} else {
			MainGame.api_google("DefeatDay", MainGame.fireLevel);
			this.isGameOver = true;
			this.time.delayedCall(1200, this.showFinishWindowLose, [], this)
		}
	}
	showFinishWindowWin() {
		MainGame.Sfx.play("sound", "win");
		this.showFinishWindow(true)
	}
	showFinishWindowLose() {
		this.showFinishWindow(false)
	}
	showFinishWindow(vBool) {
		game.canvas.style.cursor = "default";
		this.isLevelFinished = true;
		this.aim_target.setFrame("crosshair2_0000");
		this.layerFinishWindowMain.visible = true;
		this.layerFinishWindow.visible = true;
		this.buttonIncomeX2.visible = false;
		this.buttonGet.visible = false;
		this.reward_diamond.visible = false;
		this.effect_diamonds.visible = false;
		this.text_diamonds.visible = false;
		this.buttonHome.visible = false;
		this.buttonReplay.visible = false;
		this.buttonRevive.visible = false;
		this.text_no_give_up.visible = false;
		this.text_try_merge_gun.visible = false;
		if (vBool) {
			this.title_finish.setText(MainGame.GAME_TEXT.victory.toUpperCase());
			this.title_finish.setFontSize(46);
			this.buttonIncomeX2.visible = true;
			this.buttonGet.visible = true;
			this.reward_diamond.visible = true;
			this.effect_diamonds.visible = true;
			this.text_diamonds.visible = true;
			if (MainGame.isAPI) {
				if (MainGame.API_POKI && MainGame.API_POKI.api_isAdblock) this.buttonIncomeX2.setEnable(false)
			} else {
				if (!MainGame.isDebug) this.buttonIncomeX2.setEnable(false)
			}
		} else {
			this.title_finish.setText(MainGame.GAME_TEXT.try_again.toUpperCase());
			this.title_finish.setFontSize(30);
			if (this.suggestRevive) {
				this.suggestRevive = false;
				this.buttonRevive.visible = true;
				this.countRevive = 9 + 1;
				this.updateTimerRevive();
				this.timerRevive = this.time.addEvent({
					delay: 1e3,
					callback: this.updateTimerRevive,
					callbackScope: this,
					loop: true
				})
			} else {
				this.buttonReplay.visible = true
			}
			this.buttonHome.visible = true;
			this.text_no_give_up.visible = true;
			this.text_try_merge_gun.visible = true
		}
		if (MainGame.isAPI) MainGame.API_POKI.gameplayStop()
	}
	updateTimerRevive() {
		this.countRevive--;
		this.text_count_revive.setText(this.countRevive);
		if (this.countRevive > 0) {
			this.tweens.add({
				targets: this.text_count_revive,
				scaleX: 1.3,
				scaleY: 1.3,
				ease: "Linear",
				duration: 250,
				yoyo: true,
				repeat: 0
			})
		} else {
			if (this.timerRevive) this.timerRevive.remove();
			this.buttonReplay.visible = true;
			this.buttonRevive.visible = false;
			this.buttonHome.setEnable(true)
		}
	}
	checkFinishLevel() {
		var isFinish = this.countFrags >= this.needToKill;
		if (isFinish) this.finishLevel(true);
		return isFinish
	}
	increaseFrags() {
		this.countFrags++;
		this.checkFinishLevel();
		this.updateFragsText()
	}
	checkAmmoAmount() {
		if (this.amountAmmo <= 0) {
			this.updateReloading(true)
		}
		this.updateAmmoText()
	}
	allowShoot() {
		this.isAllowShoot = true
	}
	playSfxShoot() {
		switch (MainGame.selectedGun) {
			case 17:
			case 28:
			case 35:
				MainGame.Sfx.play("sound", "autorifle");
				break;
			case 6:
			case 10:
			case 24:
			case 27:
			case 34:
				MainGame.Sfx.play("sound", "autorifle2");
				break;
			case 7:
			case 9:
			case 32:
				MainGame.Sfx.play("sound", "autorifle3");
				break;
			case 1:
			case 3:
			case 33:
				MainGame.Sfx.play("sound", "pistol");
				break;
			case 5:
			case 21:
			case 43:
				MainGame.Sfx.play("sound", "pistol2");
				break;
			case 2:
			case 20:
				MainGame.Sfx.play("sound", "pistol3");
				break;
			case 4:
			case 42:
				MainGame.Sfx.play("sound", "pistol4");
				break;
			case 38:
			case 46:
				MainGame.Sfx.play("sound", "rifle");
				break;
			case 14:
			case 36:
			case 41:
				MainGame.Sfx.play("sound", "rifle2");
				break;
			case 15:
			case 23:
			case 47:
				MainGame.Sfx.play("sound", "rifle3");
				break;
			case 13:
			case 37:
				MainGame.Sfx.play("sound", "rifle4");
				break;
			case 16:
			case 45:
				MainGame.Sfx.play("sound", "rifle5");
				break;
			case 19:
			case 26:
				MainGame.Sfx.play("sound", "shotgun");
				break;
			case 18:
			case 44:
				MainGame.Sfx.play("sound", "shotgun2");
				break;
			case 8:
			case 25:
				MainGame.Sfx.play("sound", "shotgun3");
				break;
			case 22:
			case 30:
			case 40:
				MainGame.Sfx.play("sound", "sniper");
				break;
			case 39:
			case 49:
				MainGame.Sfx.play("sound", "sniper2");
				break;
			case 48:
			case 50:
				MainGame.Sfx.play("sound", "sniper3");
				break;
			case 12:
			case 29:
				MainGame.Sfx.play("sound", "sniper4");
				break;
			case 11:
			case 31:
				MainGame.Sfx.play("sound", "sniper5");
				break
		}
	}
	makeShoot(vTarget, vX, vY) {
		var animName = this.arm_weapon.getCurrentAnimation().name;
		if (this.isAllowShoot) {
			this.isAllowShoot = false;
			this.time.delayedCall(this.FIRERATE, this.allowShoot, [], this);
			var animationTime = 1 * (330 / this.FIRERATE);
			this.arm_weapon.timeScale = animationTime;
			this.arm_weapon.setAnimation(0, this.weaponType + "_shoot", false);
			this.arm_weapon.addAnimation(0, this.weaponType + "_idle", false);
			vTarget.damage(this.damageWeapons);
			var posKickX = (vTarget.hero.x + vX) * .5;
			this.addBotKick(posKickX, vY);
			this.showEffectFire(this.effect_shoot.x, this.effect_shoot.y);
			this.amountAmmo--;
			this.checkAmmoAmount();
			if (this.isGoTutorial) this.checkTutorial();
			this.playSfxShoot()
		}
	}
	addBotFlash(vX, vY) {
		var effect = this.add.sprite(vX, vY, "ss_shooter");
		effect.play("flash");
		this.layerEffect.add(effect)
	}
	addBotKick(vX, vY) {
		var effect = this.add.sprite(vX, vY, "ss_shooter");
		effect.play("effect_kick");
		this.layerEffect.add(effect)
	}
	underAttack(vIsYoyo) {
		this.layerRed.alpha = 0;
		this.tweens.killTweensOf(this.layerRed);
		this.tweens.add({
			targets: this.layerRed,
			alpha: .6,
			ease: "Linear",
			duration: 150,
			yoyo: vIsYoyo
		})
	}
	botShoot(vType, vLevel, vX, vY) {
		if (this.isLevelFinished) return;
		this.addBotFlash(vX, vY);
		if (this.isGameOver) return;
		this.hpPlayerNow -= 5;
		if (this.hpPlayerNow <= 0) {
			this.hpPlayerNow = 0;
			this.finishLevel(false);
			this.underAttack(false)
		} else {
			this.underAttack(true)
		}
		this.text_hp.setText(this.hpPlayerNow);
		this.updateHpBar(this.hpPlayerNow / this.hpPlayerMax);
		if (vType == "stickman1") MainGame.Sfx.play("sound", "enemy4");
		if (vType == "stickman2") MainGame.Sfx.play("sound", "enemy3");
		if (vType == "stickman3") MainGame.Sfx.play("sound", "enemy");
		if (vType == "stickman4") MainGame.Sfx.play("sound", "enemy2")
	}
	checkBarrels(vX, vY) {
		var isInsideRect1 = Phaser.Geom.Rectangle.ContainsPoint(this.rect1, {
			x: vX,
			y: vY
		});
		var isInsideRect2 = Phaser.Geom.Rectangle.ContainsPoint(this.rect2, {
			x: vX,
			y: vY
		});
		var isInsideRect3 = Phaser.Geom.Rectangle.ContainsPoint(this.rect3, {
			x: vX,
			y: vY
		});
		var isInsideRect4 = Phaser.Geom.Rectangle.ContainsPoint(this.rect4, {
			x: vX,
			y: vY
		});
		var isInsideRect5 = Phaser.Geom.Rectangle.ContainsPoint(this.rect5, {
			x: vX,
			y: vY
		});
		return isInsideRect1 || isInsideRect2 || isInsideRect3 || isInsideRect4 || isInsideRect5
	}
	initLevel() {
		this.arTargets = [];
		this.posCursor = {
			x: this.midX,
			y: this.midY
		};
		var skin_event = "";
		if (MainGame.EVENT_NUM == 1 && MainGame.fireLevel > 1) skin_event = "_halloween";
		var block1 = this.add.image(80 * 4 + 33, 226, "ss_shooter", "block1" + skin_event + "_0000");
		var block2 = this.add.image(80 * 8 + 39, 226, "ss_shooter", "block2" + skin_event + "_0000");
		var block3 = this.add.image(80 * 2 + 38, 456, "ss_shooter", "block3" + skin_event + "_0000");
		var block4 = this.add.image(80 * 6 + 30, 444, "ss_shooter", "block4" + skin_event + "_0000");
		var block5 = this.add.image(80 * 10 + 36, 451, "ss_shooter", "block5" + skin_event + "_0000");
		this.layerEffect.add(block1);
		this.layerEffect.add(block2);
		this.layerEffect.add(block3);
		this.layerEffect.add(block4);
		this.layerEffect.add(block5);
		var line1_Y = 300 - 60;
		var line2_Y = 515 - 60;
		this.rect1 = this.add.rectangle(80 * 4 - 45, line1_Y - 50, 160, 80);
		this.rect2 = this.add.rectangle(80 * 8 - 45, line1_Y - 50, 160, 80);
		this.rect3 = this.add.rectangle(80 * 2 - 45, line2_Y - 50, 160, 80);
		this.rect4 = this.add.rectangle(80 * 6 - 45, line2_Y - 50, 160, 80);
		this.rect5 = this.add.rectangle(80 * 10 - 45, line2_Y - 50, 160, 80);
		if (MainGame.fireLevel == 1) {
			this.doska1 = this.addDoska(6.5, line1_Y);
			this.doska2 = this.addDoska(3, line2_Y);
			this.doska3 = this.addDoska(10, line2_Y);
			this.doska4 = this.addDoska(5, line1_Y);
			this.doska5 = this.addDoska(8, line1_Y);
			this.doska1.visible = false;
			this.doska2.visible = false;
			this.doska3.visible = false;
			this.doska4.visible = false;
			this.doska5.visible = false;
			this.doska2.info.live = false;
			this.doska3.info.live = false;
			this.doska4.info.live = false;
			this.doska5.info.live = false
		} else {
			this.addBot(0, 0, "stickman1", 1, 1);
			this.addBot(0, 0, "stickman2", 2, 1);
			if (MainGame.fireLevel >= 3) this.time.delayedCall(1e3 * 1, this.addBotStep3, [], this);
			if (MainGame.fireLevel >= 10) this.time.delayedCall(1e3 * 2, this.addBotStep4, [], this);
			if (MainGame.fireLevel >= 15) this.time.delayedCall(1e3 * 3, this.addBotStep5, [], this);
			if (MainGame.fireLevel >= 20) this.time.delayedCall(1e3 * 4, this.addBotStep6, [], this);
			if (MainGame.fireLevel >= 25) this.time.delayedCall(1e3 * 5, this.addBotStep7, [], this);
			if (MainGame.fireLevel >= 30) this.time.delayedCall(1e3 * 6, this.addBotStep8, [], this);
			if (MainGame.fireLevel >= 60) this.time.delayedCall(1e3 * 7, this.addBotStep9, [], this);
			if (MainGame.fireLevel >= 90) this.time.delayedCall(1e3 * 8, this.addBotStep10, [], this)
		}
	}
	addBotStep3() {
		this.addBot(0, 0, "stickman3", 1, 0)
	}
	addBotStep4() {
		this.addBot(0, 0, "stickman4", 2, 0)
	}
	addBotStep5() {
		this.addBot(0, 0, null, 1, 2)
	}
	addBotStep6() {
		this.addBot(0, 0, null, 2, 2)
	}
	addBotStep7() {
		this.addBot(0, 0, null, 1, 3)
	}
	addBotStep8() {
		this.addBot(0, 0, null, 2, 3)
	}
	addBotStep9() {
		this.addBot(0, 0, null, 1, 3)
	}
	addBotStep10() {
		this.addBot(0, 0, null, 2, 3)
	}
	addBot(vX, vY, vSkin, vLine, vBrain) {
		if (this.countBots <= 0) return;
		var posX = vX * 80;
		var bot = new Bot(this, this.layerMob, posX, vY, vSkin, vLine, vBrain);
		this.arTargets.push(bot);
		this.countEnemies = this.arTargets.length
	}
	initTutorial() {
		this.isGoTutorial = true;
		this.tutorialStep = 0;
		this.buttonPauseHome.setEnable(false);
		var plaha = this.add.image(this.midX, 340, "ss_shooter", "tutor_popup_0000");
		this.layerEffect.add(plaha);
		var tutor_mobile = this.add.image(this.midX + 360, 340, "ss_shooter", "tutor_mobile_0000");
		this.layerEffect.add(tutor_mobile);
		tutor_mobile.visible = false;
		var txt = this.add.bitmapText(plaha.x, plaha.y, "Panton", "");
		txt.setDropShadow(3, 3, 0, 1);
		txt.setMaxWidth(400);
		txt.setCenterAlign();
		txt.setFontSize(34);
		txt.setOrigin(.5);
		txt.lineSpacing = -8;
		this.layerEffect.add(txt);
		this.textTutorial = txt;
		this.plahaTutorial = plaha;
		this.tutor_mobile = tutor_mobile;
		this.plahaTutorial.visible = false;
		this.textTutorial.visible = false;
		if (!MainGame.isDesktop) {
			this.posCursor.y += 100;
			this.lastPos.y += 100
		}
		var buttonStart = new ButtonText(this.midX, this.midY + 20, "ss_ui", "btn_buy_g2_0000", this.startTutorial, this, MainGame.GAME_TEXT.start);
		buttonStart.text.setFontSize(26);
		this.layerEffect.add(buttonStart);
		MainGame.updateTextWidth(buttonStart.text, 200);
		buttonStart.text.y = -4;
		this.buttonStart = buttonStart;
		game.canvas.style.cursor = "default";
		this.armReady = false;
		this.isBeforeStart = true;
		this.arm_weapon.visible = false;
		this.aim_target.visible = false;
		this.plahaTutorial.visible = true;
		MainGame.isFromTutorial = true
	}
	startTutorial() {
		this.time.delayedCall(500, this.tutorialScenario, [], this);
		this.isBeforeStart = false;
		this.armReady = true;
		this.buttonStart.visible = false;
		this.arm_weapon.visible = true;
		this.aim_target.visible = true;
		if (MainGame.isAPI) MainGame.API_POKI.gameplayStart()
	}
	checkTutorial() {
		if (this.tutorialStep == 1) {
			if (!this.doska1.info.live) {
				this.time.delayedCall(500, this.tutorialScenario, [], this);
				this.plahaTutorial.visible = false;
				this.textTutorial.visible = false;
				this.tutor_mobile.visible = false
			}
		} else if (this.tutorialStep == 2) {
			if (!this.doska2.info.live && !this.doska3.info.live && !this.doska4.info.live && !this.doska5.info.live) {
				this.textTutorial.visible = false;
				this.plahaTutorial.visible = false
			}
		}
	}
	tutorialScenario() {
		this.tutorialStep++;
		if (this.tutorialStep == 1) {
			this.textTutorial.setText(MainGame.GAME_TEXT.text_move_cursor);
			this.plahaTutorial.visible = true;
			this.textTutorial.visible = true;
			this.doska1.visible = true;
			if (!MainGame.isDesktop) this.tutor_mobile.visible = true
		} else if (this.tutorialStep == 2) {
			this.textTutorial.setText(MainGame.GAME_TEXT.text_good_job);
			this.plahaTutorial.visible = true;
			this.textTutorial.visible = true;
			this.doska2.visible = true;
			this.doska3.visible = true;
			this.doska4.visible = true;
			this.doska5.visible = true;
			this.doska2.info.live = true;
			this.doska3.info.live = true;
			this.doska4.info.live = true;
			this.doska5.info.live = true;
			this.tweens.add({
				targets: this.doska2,
				x: this.doska2.x - 80,
				ease: "Linear",
				duration: 1e3,
				yoyo: true,
				repeat: -1
			});
			this.tweens.add({
				targets: this.doska3,
				x: this.doska3.x + 80,
				ease: "Linear",
				duration: 1e3,
				yoyo: true,
				repeat: -1
			});
			this.tweens.add({
				targets: this.doska4,
				x: this.doska4.x - 80,
				ease: "Linear",
				duration: 1e3,
				yoyo: true,
				repeat: -1
			});
			this.tweens.add({
				targets: this.doska5,
				x: this.doska5.x + 80,
				ease: "Linear",
				duration: 1e3,
				yoyo: true,
				repeat: -1
			})
		}
	}
	addDoska(vX, vY) {
		var posX = vX * 80;
		var obj = this.add.sprite(posX, vY - 30, "ss_shooter");
		obj.play("target_idle");
		obj.setOrigin(.5, .75);
		this.layerMob.add(obj);
		obj.hero = obj;
		obj.info = {
			health: 2,
			live: true
		};
		obj.isAlive = function() {
			return obj.info.live
		};
		obj.damage = function() {
			obj.info.health--;
			if (obj.info.health <= 0) {
				obj.info.live = false;
				obj.play("target_down");
				MainGame.state.increaseFrags();
				MainGame.state.tweens.killTweensOf(obj)
			}
		};
		this.arTargets.push(obj);
		this.countEnemies = this.arTargets.length;
		return obj
	}
	updateBots() {
		var target;
		for (var i = 0; i < this.countEnemies; i++) {
			target = this.arTargets[i];
			target.update()
		}
	}
	pauseBots() {
		if (this.isGoTutorial) return;
		for (var i = 0; i < this.countEnemies; i++) {
			this.arTargets[i].pauseAnimation()
		}
		this.old_timeScale = this.arm_weapon.state.timeScale;
		this.arm_weapon.state.timeScale = 0;
		if (this.timerReloading) this.timerReloading.paused = true
	}
	resumeBots() {
		if (this.isGoTutorial) return;
		for (var i = 0; i < this.countEnemies; i++) {
			this.arTargets[i].resumeAnimation()
		}
		this.arm_weapon.state.timeScale = this.old_timeScale || 1;
		if (this.timerReloading) this.timerReloading.paused = false
	}
	clickBtnPause() {
		if (this.isLevelFinished) return;
		MainGame.Sfx.update("music", this.buttonMuteMusic.icon, this.buttonMuteMusic.text);
		MainGame.Sfx.update("sound", this.buttonMuteSound.icon, this.buttonMuteSound.text);
		this.isPaused = true;
		this.layerPauseWindowMain.visible = true;
		this.layerPauseWindow.visible = true;
		game.canvas.style.cursor = "default";
		this.pauseBots();
		if (MainGame.isAPI) MainGame.API_POKI.gameplayStop()
	}
	clickBtnReload() {
		if (this.isReloading || this.isLevelFinished || this.isPaused || !this.armReady) return;
		this.updateReloading(true)
	}
	showAdsForDiamondsX2() {
		MainGame.clickReward("fire_x2");
		this.buttonIncomeX2.setEnable(false)
	}
	initSystemMessage() {
		this.textSystemContainer = this.add.container();
		this.textSystemContainer.x = this.midX;
		this.textSystemContainer.y = MainGame.world.centerY - 100;
		var txt = this.add.bitmapText(0, 0, "Panton", "");
		txt.setDropShadow(3, 3, 0, 1);
		txt.setOrigin(.5);
		txt.setMaxWidth(550);
		txt.setCenterAlign();
		txt.setFontSize(34);
		this.textSystemContainer.add(txt);
		this.textSystemContainer.setDepth(this.DEPTH_systemtext);
		this.textSystemContainer.visible = false;
		this.textSystem = txt
	}
	showSystemMessage(vText) {
		this.textSystemContainer.visible = true;
		this.textSystem.setText(vText);
		this.textSystemContainer.alpha = .2;
		this.textSystemContainer.y = this.midY - 20;
		this.textSystemContainer.setScale(.8);
		this.tweens.killTweensOf(this.textSystemContainer);
		this.tweens.add({
			targets: this.textSystemContainer,
			alpha: 1,
			ease: "Linear",
			duration: 150
		});
		this.tweens.add({
			targets: this.textSystemContainer,
			scaleX: 1,
			scaleY: 1,
			ease: "Linear",
			duration: 150
		});
		this.tweens.add({
			targets: this.textSystemContainer,
			alpha: 0,
			ease: "Linear",
			delay: 1500,
			duration: 200,
			onComplete: this.finishSystemTextTween
		});
		this.tweens.add({
			targets: this.textSystemContainer,
			y: this.textSystemContainer.y - 20,
			ease: "Linear",
			delay: 150,
			duration: 1200
		})
	}
	getRewards(vReward) {
		switch (vReward) {
			case "fire_x2":
				MainGame.amount_diamonds += this.rewardDiamonds * 2;
				MainGame.saveSaves();
				this.scale.off("resize", this.updateResize, this);
				if (MainGame.isAPI) MainGame.API_POKI.destroyAd();
				if (MainGame.isFromTutorial) {
					MainGame.fadeOutScene("Preloader", this)
				} else {
					MainGame.fadeOutScene("Game", this)
				}
				break;
			case "revive":
				MainGame.state.reviveLevel();
				break
		}
	}
	clickReplay() {
		this.scale.off("resize", this.updateResize, this);
		MainGame.fadeOutScene("Shooter", this)
	}
	clickRevive() {
		if (this.timerRevive) this.timerRevive.remove();
		MainGame.clickReward("revive");
		this.buttonRevive.setEnable(false)
	}
	showGameScreen(vIsGetDiamonds) {
		if (vIsGetDiamonds) MainGame.amount_diamonds += this.rewardDiamonds;
		MainGame.saveSaves();
		this.scale.off("resize", this.updateResize, this);
		if (MainGame.isAPI) MainGame.API_POKI.destroyAd();
		if (MainGame.isFromTutorial) {
			MainGame.fadeOutScene("Preloader", this)
		} else {
			MainGame.fadeOutScene("Game", this)
		}
	}
}
class UpdateHalloween extends Phaser.Scene {
	constructor() {
		super({
			key: "UpdateHalloween",
			physics: {
				default: "arcade",
				arcade: {
					gravity: {
						y: 300
					},
					debug: false
				}
			}
		})
	}
	create() {
		MainGame.state = this;
		MainGame.stateName = "UpdateHalloween";
		this.initResize();
		this.midX = this.GAME_WIDTH / 2;
		this.midY = this.GAME_HEIGHT / 2;
		this.initSettingsGame();
		const back = this.add.image(this.midX, this.midY, "bg_eventH");
		this.layerMob = this.add.container();
		this.layerEffect = this.add.container();
		this.layerSpineArm = this.add.container();
		this.layerUI = this.add.container();
		this.layerText = this.add.container();
		this.layerMob.setDepth(this.DEPTH_layerMob);
		this.layerEffect.setDepth(this.DEPTH_layerEffect);
		this.layerSpineArm.setDepth(this.DEPTH_layerArm);
		this.layerUI.setDepth(this.DEPTH_layerUI);
		this.layerText.setDepth(this.DEPTH_layerText);
		this.initEffects();
		this.initSettingsHalloween();
		this.initGUI_Halloween();
		this.initGUI();
		this.initComboTexts();
		this.initLevel();
		this.initWeapon();
		this.initPauseWindow();
		this.initFinishWindow2();
		this.initRewardWindow();
		this.initSystemMessage();
		this.updateResize();
		this.text_hp.setText(this.hpPlayerNow);
		this.text_level.setText(MainGame.GAME_TEXT.day.toUpperCase() + " " + MainGame.fireLevel);
		this.updateAmmoText();
		this.updateFragsText();
		this.input.keyboard.on("keydown", this.handleKey, this);
		this.isAllowShoot = true;
		MainGame.isFromFireMode = true;
		if (MainGame.firstGo) {
			this.input.once("pointerdown", this.playOnce, this)
		} else {
			MainGame.Sfx.play("music", "halloween")
		}
		this.initPiecesPumpkin();
		if (MainGame.listEvents[0] == 0 && MainGame.isFirstChallenge) {
			this.initTutorialPumpkin()
		} else {
			this.startTimerHalloween()
		}
		MainGame.isFirstChallenge = false;
		if (MainGame.isAPI) MainGame.API_POKI.gameplayStart();
		if (MainGame.isAPI) MainGame.API_POKI.displayAd()
	}
	playOnce() {
		MainGame.firstGo = false;
		MainGame.Sfx.play("music", "halloween")
	}
	handleKey(e) {
		switch (e.code) {
			case "KeyR":
				this.clickBtnReload();
				break
		}
	}
	update() {
		if (this.isLevelFinished || this.isPaused) return;
		if (this.armReady && !this.isGameOver) this.updateArm();
		if (!this.isGoTutorial) {
			this.updateSpawnPumpkins()
		}
	}
	initResize() {
		this.GAME_WIDTH = MainGame.Config.DEFAULT_WIDTH;
		this.GAME_HEIGHT = MainGame.Config.DEFAULT_HEIGHT;
		var gameSize = this.scale.gameSize;
		var width = gameSize.width;
		var height = gameSize.height;
		if (window.innerHeight < MainGame.Config.MAX_HEIGHT) {
			height = window.innerHeight
		}
		this.parent = new Phaser.Structs.Size(width, height);
		this.sizer = new Phaser.Structs.Size(this.GAME_WIDTH, this.GAME_HEIGHT, Phaser.Structs.Size.FIT, this.parent);
		this.parent.setSize(width, height);
		this.sizer.setSize(width, height);
		this.scale.on("resize", this.updateResize, this)
	}
	updateResize() {
		var gameSize = this.scale.gameSize;
		var width = gameSize.width;
		var height = gameSize.height;
		if (window.innerHeight < MainGame.Config.MAX_HEIGHT) {
			height = window.innerHeight
		}
		this.parent.setSize(width, height);
		this.sizer.setSize(width, height);
		this.updateCamera()
	}
	updateCamera() {
		const camera = this.cameras.main;
		var deltaX = Math.ceil(this.parent.width - this.sizer.width) * .5;
		var deltaY = Math.ceil(this.parent.height - this.sizer.height) * .5;
		var sdvigY = 0;
		if (window.innerHeight < MainGame.Config.MAX_HEIGHT) {
			deltaY = Math.ceil(window.innerHeight - this.sizer.height) * .5;
			sdvigY = this.scale.gameSize.height - window.innerHeight
		}
		const scaleX = this.sizer.width / this.GAME_WIDTH;
		const scaleY = this.sizer.height / this.GAME_HEIGHT;
		const zoom = Math.max(scaleX, scaleY);
		const offsetY = deltaY / zoom;
		const offsetX = deltaX / zoom;
		this.deltaScreenY = deltaY;
		camera.setZoom(zoom);
		camera.centerOn(this.GAME_WIDTH / 2, this.GAME_HEIGHT / 2 + sdvigY);
		this.btnExit.x = 1024 - 64 + offsetX;
		if (this.btnExit.x > 1024 + 100) this.btnExit.x = 1024 + 100;
		this.text_level.x = this.btnExit.x - 60;
		this.btnReload.x = 110 - offsetX;
		if (this.btnReload.x < -100 + 30) this.btnReload.x = -100 + 30;
		this.text_bullets.x = this.btnReload.x;
		this.icon_frag.x = 80 - offsetX;
		if (this.icon_frag.x < -100) this.icon_frag.x = -100;
		this.text_frags.x = this.icon_frag.x + 90;
		this.btnExit.y = 50 - offsetY;
		if (this.btnExit.y < -100 + 50) this.btnExit.y = -100 + 50;
		this.text_level.y = this.btnExit.y - 10;
		this.icon_frag.y = this.btnExit.y + 5;
		this.text_frags.y = this.icon_frag.y;
		this.hpBarB.y = 600 + offsetY;
		if (this.hpBarB.y > 600 + 100) this.hpBarB.y = 600 + 100;
		this.hpBarT.y = this.hpBarB.y;
		this.text_hp.y = this.hpBarB.y - 7;
		this.btnReload.y = 520 + offsetY;
		if (this.btnReload.y > 520 + 100) this.btnReload.y = 520 + 100;
		this.text_bullets.y = this.btnReload.y + 95;
		this.textPoints.x = this.btnReload.x;
		this.textPointsText.x = this.btnReload.x;
		this.textTimer.x = this.btnReload.x;
		this.timerPlaha.x = this.btnReload.x;
		var posIconsX = 1024 - 59 + offsetX;
		if (posIconsX > 1024 + 100) posIconsX = 1024 + 100;
		this.icon_x1.x = posIconsX;
		this.icon_x2.x = posIconsX;
		this.icon_x3.x = posIconsX;
		var posPumpkinY = offsetY;
		if (posPumpkinY > 100) posPumpkinY = 100;
		this.textPointsText.y = 30 - posPumpkinY;
		this.textPoints.y = 70 - posPumpkinY;
		this.timerPlaha.y = 150 - posPumpkinY;
		this.textTimer.y = 148 - posPumpkinY
	}
	addCanvas(vLayer, vColor, vAlpha) {
		var canvas = this.add.image(this.midX, this.midY, "ss_shooter", "canvas_0000");
		canvas.tint = vColor;
		canvas.alpha = vAlpha;
		canvas.setScale(6);
		vLayer.add(canvas);
		return canvas
	}
	initSettingsGame() {
		MainGame.fireLevel = MainGame.fireLevel || 1;
		this.arOffsetWeapon = [{
			x: 140,
			y: 320,
			fx: 50,
			fy: 50,
			dmg: 30,
			ammo: 8,
			firerate: 500
		}, {
			x: 140,
			y: 320,
			fx: 45,
			fy: 45,
			dmg: 35,
			ammo: 17,
			firerate: 500
		}, {
			x: 140,
			y: 320,
			fx: 35,
			fy: 30,
			dmg: 40,
			ammo: 15,
			firerate: 400
		}, {
			x: 140,
			y: 320,
			fx: 20,
			fy: 20,
			dmg: 60,
			ammo: 9,
			firerate: 600
		}, {
			x: 140,
			y: 320,
			fx: -10,
			fy: -8,
			dmg: 80,
			ammo: 6,
			firerate: 700
		}, {
			x: 150,
			y: 320,
			fx: -10,
			fy: 5,
			dmg: 20,
			ammo: 30,
			firerate: 200
		}, {
			x: 200,
			y: 365,
			fx: 20,
			fy: 20,
			dmg: 35,
			ammo: 18,
			firerate: 300
		}, {
			x: 200,
			y: 365,
			fx: -10,
			fy: 0,
			dmg: 100,
			ammo: 2,
			firerate: 1e3
		}, {
			x: 200,
			y: 365,
			fx: 25,
			fy: 35,
			dmg: 50,
			ammo: 25,
			firerate: 300
		}, {
			x: 200,
			y: 365,
			fx: 20,
			fy: 20,
			dmg: 60,
			ammo: 30,
			firerate: 300
		}, {
			x: 200,
			y: 365,
			fx: -30,
			fy: -20,
			dmg: 150,
			ammo: 6,
			firerate: 600
		}, {
			x: 220,
			y: 365,
			fx: -30,
			fy: -25,
			dmg: 200,
			ammo: 6,
			firerate: 700
		}, {
			x: 210,
			y: 370,
			fx: -15,
			fy: -5,
			dmg: 80,
			ammo: 30,
			firerate: 330
		}, {
			x: 210,
			y: 365,
			fx: -5,
			fy: 5,
			dmg: 100,
			ammo: 30,
			firerate: 330
		}, {
			x: 210,
			y: 370,
			fx: -10,
			fy: 5,
			dmg: 80,
			ammo: 35,
			firerate: 330
		}, {
			x: 210,
			y: 365,
			fx: -5,
			fy: 25,
			dmg: 90,
			ammo: 30,
			firerate: 330
		}, {
			x: 195,
			y: 355,
			fx: 50,
			fy: 65,
			dmg: 60,
			ammo: 50,
			firerate: 200
		}, {
			x: 200,
			y: 365,
			fx: 15,
			fy: -5,
			dmg: 450,
			ammo: 9,
			firerate: 800
		}, {
			x: 200,
			y: 365,
			fx: -10,
			fy: -5,
			dmg: 500,
			ammo: 6,
			firerate: 800
		}, {
			x: 140,
			y: 320,
			fx: 30,
			fy: 30,
			dmg: 160,
			ammo: 12,
			firerate: 300
		}, {
			x: 140,
			y: 320,
			fx: -10,
			fy: -10,
			dmg: 250,
			ammo: 8,
			firerate: 450
		}, {
			x: 220,
			y: 365,
			fx: -25,
			fy: -20,
			dmg: 450,
			ammo: 7,
			firerate: 600
		}, {
			x: 210,
			y: 365,
			fx: -40,
			fy: -10,
			dmg: 200,
			ammo: 64,
			firerate: 400
		}, {
			x: 210,
			y: 365,
			fx: 45,
			fy: 45,
			dmg: 200,
			ammo: 25,
			firerate: 300
		}, {
			x: 210,
			y: 365,
			fx: -10,
			fy: -10,
			dmg: 600,
			ammo: 6,
			firerate: 600
		}, {
			x: 200,
			y: 365,
			fx: -40,
			fy: -20,
			dmg: 600,
			ammo: 5,
			firerate: 550
		}, {
			x: 220,
			y: 365,
			fx: -5,
			fy: -5,
			dmg: 100,
			ammo: 100,
			firerate: 150
		}, {
			x: 210,
			y: 365,
			fx: 35,
			fy: 40,
			dmg: 250,
			ammo: 50,
			firerate: 250
		}, {
			x: 230,
			y: 365,
			fx: -5,
			fy: -5,
			dmg: 500,
			ammo: 7,
			firerate: 500
		}, {
			x: 230,
			y: 365,
			fx: -40,
			fy: -40,
			dmg: 700,
			ammo: 7,
			firerate: 650
		}, {
			x: 230,
			y: 365,
			fx: 25,
			fy: 25,
			dmg: 450,
			ammo: 20,
			firerate: 500
		}, {
			x: 200,
			y: 340,
			fx: 50,
			fy: 20,
			dmg: 250,
			ammo: 22,
			firerate: 200
		}, {
			x: 140,
			y: 320,
			fx: 0,
			fy: -5,
			dmg: 300,
			ammo: 12,
			firerate: 400
		}, {
			x: 210,
			y: 365,
			fx: 35,
			fy: 45,
			dmg: 300,
			ammo: 30,
			firerate: 300
		}, {
			x: 210,
			y: 365,
			fx: 25,
			fy: 30,
			dmg: 300,
			ammo: 25,
			firerate: 300
		}, {
			x: 210,
			y: 365,
			fx: 15,
			fy: 25,
			dmg: 300,
			ammo: 30,
			firerate: 300
		}, {
			x: 210,
			y: 365,
			fx: -5,
			fy: 10,
			dmg: 300,
			ammo: 30,
			firerate: 300
		}, {
			x: 220,
			y: 340,
			fx: -35,
			fy: -30,
			dmg: 400,
			ammo: 7,
			firerate: 500
		}, {
			x: 220,
			y: 340,
			fx: -10,
			fy: -15,
			dmg: 650,
			ammo: 8,
			firerate: 500
		}, {
			x: 210,
			y: 365,
			fx: -35,
			fy: -40,
			dmg: 700,
			ammo: 9,
			firerate: 500
		}, {
			x: 210,
			y: 365,
			fx: 0,
			fy: -5,
			dmg: 600,
			ammo: 30,
			firerate: 300
		}, {
			x: 140,
			y: 320,
			fx: 25,
			fy: 25,
			dmg: 350,
			ammo: 12,
			firerate: 300
		}, {
			x: 140,
			y: 320,
			fx: 10,
			fy: 20,
			dmg: 500,
			ammo: 22,
			firerate: 350
		}, {
			x: 200,
			y: 365,
			fx: 0,
			fy: -30,
			dmg: 900,
			ammo: 8,
			firerate: 600
		}, {
			x: 210,
			y: 365,
			fx: 5,
			fy: 15,
			dmg: 700,
			ammo: 30,
			firerate: 300
		}, {
			x: 220,
			y: 365,
			fx: -20,
			fy: -10,
			dmg: 700,
			ammo: 30,
			firerate: 400
		}, {
			x: 220,
			y: 365,
			fx: 0,
			fy: 0,
			dmg: 700,
			ammo: 30,
			firerate: 400
		}, {
			x: 220,
			y: 365,
			fx: -20,
			fy: 0,
			dmg: 800,
			ammo: 15,
			firerate: 400
		}, {
			x: 230,
			y: 365,
			fx: -35,
			fy: -30,
			dmg: 1e3,
			ammo: 15,
			firerate: 400
		}, {
			x: 220,
			y: 365,
			fx: -20,
			fy: -30,
			dmg: 1200,
			ammo: 20,
			firerate: 400
		}];
		this.scaleWindow1 = .7;
		this.scaleWindow2 = .85;
		this.MAX_TOP = 50;
		this.MAX_BOTTOM = 650;
		this.DEPTH_layerMob = .21;
		this.DEPTH_layerEffect = .22;
		this.DEPTH_layerArm = .23;
		this.DEPTH_layerUI = .24;
		this.DEPTH_layerText = .25;
		this.DEPTH_layerFinish = .26;
		this.DEPTH_systemtext = .6;
		this.aimScale = 2;
		this.isBeforeStart = false;
		this.suggestRevive = true;
		this.isLevelFinished = false;
		this.isGameOver = false;
		this.isPaused = false;
		this.hpPlayerMax = 100;
		this.hpPlayerNow = this.hpPlayerMax;
		this.countFrags = 0;
		this.isGoTutorial = false;
		this.armReady = false;
		this.isInputPressed = false;
		this.isReloading = false;
		this.WEAPON_WEIGHT = .21;
		this.countEnemies = 0;
		this.arTargets = [];
		this.posInputDown = {
			x: this.midX,
			y: this.midY
		};
		this.lastPos = {
			x: this.midX,
			y: this.midY
		};
		this.posCursor = {
			x: this.midX,
			y: this.midY
		};
		this.posWeapon = {
			x: 0,
			y: 0
		};
		this.offsetWeapon = {
			x: 0,
			y: 0
		};
		this.offsetFire = {
			x: 0,
			y: 0
		};
		this.deltaScreenY = 0;
		this.maxPosX = 80 * 13;
		this.minPosX = 0;
		this.arrRespawns1 = [4, 5, 8, 9];
		this.arrRespawns2 = [2, 3, 6, 7, 10, 11];
		this.TIME_RELOADING = 1e3;
		this.needToKill = 7 + Math.floor(MainGame.fireLevel / 8);
		if (MainGame.fireLevel == 1) this.needToKill = 5;
		var settingsWeapon = this.arOffsetWeapon[MainGame.selectedGun - 1];
		this.FIRERATE = settingsWeapon.firerate;
		this.damageWeapons = settingsWeapon.dmg;
		this.maxAmmo = settingsWeapon.ammo;
		this.countBots = this.needToKill;
		this.amountAmmo = this.maxAmmo
	}
	addText(vLayer, vX, vY, vText, vSize, vIsUpperCase) {
		vX -= 1;
		vY -= 1;
		vText = vText.toString();
		if (vText && vIsUpperCase) vText = vText.toUpperCase();
		var txt = this.add.bitmapText(vX, vY, "Panton", vText);
		txt.setFontSize(vSize);
		txt.setOrigin(.5);
		if (vLayer) vLayer.add(txt);
		return txt
	}
	initEffects() {
		this.anims.create({
			key: "flash_big",
			frames: this.anims.generateFrameNames("ss_shooter", {
				prefix: "flash_big_",
				end: 5,
				zeroPad: 4
			}),
			hideOnComplete: true
		});
		this.anims.create({
			key: "magic_1",
			frames: this.anims.generateFrameNames("ss_ui", {
				prefix: "magic_1_",
				end: 14,
				zeroPad: 4
			}),
			hideOnComplete: false,
			repeat: -1
		});
		this.anims.create({
			key: "flash",
			frames: this.anims.generateFrameNames("ss_shooter", {
				prefix: "flash_",
				end: 7,
				zeroPad: 4
			}),
			hideOnComplete: true
		});
		this.anims.create({
			key: "effect_kick",
			frames: this.anims.generateFrameNames("ss_shooter", {
				prefix: "effect_kick_",
				end: 7,
				zeroPad: 4
			}),
			hideOnComplete: true
		});
		this.anims.create({
			key: "explosion_pumpkin",
			frames: this.anims.generateFrameNames("ss_halloween", {
				prefix: "explosion_pumpkin_",
				end: 7,
				zeroPad: 4
			}),
			hideOnComplete: true
		});
		this.anims.create({
			key: "explosion_bomb",
			frames: this.anims.generateFrameNames("ss_halloween", {
				prefix: "explosion_bomb_",
				end: 19,
				zeroPad: 4
			}),
			hideOnComplete: true
		});
		this.anims.create({
			key: "bomb",
			frames: this.anims.generateFrameNames("ss_halloween", {
				prefix: "bomb_",
				end: 7,
				zeroPad: 4
			}),
			hideOnComplete: false,
			repeat: -1
		});
		this.anims.create({
			key: "target_idle",
			frames: this.anims.generateFrameNames("ss_shooter", {
				prefix: "target_idle_",
				end: 0,
				zeroPad: 4
			}),
			hideOnComplete: false
		});
		this.anims.create({
			key: "target_down",
			frames: this.anims.generateFrameNames("ss_shooter", {
				prefix: "target_down_",
				end: 11,
				zeroPad: 4
			}),
			hideOnComplete: false
		})
	}
	initPauseWindow() {
		this.layerPauseWindowMain = this.add.container();
		this.layerPauseWindow = this.add.container();
		this.layerPauseWindowMain.setDepth(this.DEPTH_layerFinish);
		this.layerPauseWindow.setDepth(this.DEPTH_layerFinish);
		this.layerPauseWindow.x = this.midX;
		this.layerPauseWindow.y = this.midY;
		var fon_merge = this.add.image(this.midX, this.midY, "ss_ui", "bg_connect2_0000");
		fon_merge.setScale(2);
		this.layerPauseWindowMain.add(fon_merge);
		var popup_drop = this.add.image(0, 0, "ss_ui", "popup_drop_0000");
		popup_drop.setScale(2);
		this.layerPauseWindow.add(popup_drop);
		var posX = 0;
		var posY = -95;
		var buttonResume = new ButtonText(0, posY, "ss_ui", "btn_buy2_0000", this.clickBtnResume, this, MainGame.GAME_TEXT.resume);
		buttonResume.text.setFontSize(24);
		buttonResume.text.y = -5;
		this.layerPauseWindow.add(buttonResume);
		MainGame.updateTextWidth(buttonResume.text, 140);
		var buttonMuteMusic = new ButtonText(0, buttonResume.y + 85, "ss_ui", "btn_buy_0000", this.clickMuteMusic, this, MainGame.GAME_TEXT.music_on);
		buttonMuteMusic.text.setFontSize(24);
		buttonMuteMusic.text.x = 20;
		buttonMuteMusic.text.y = -5;
		this.layerPauseWindow.add(buttonMuteMusic);
		MainGame.updateTextWidth(buttonMuteMusic.text, 140);
		var icon_music = this.add.image(-85, -5, "ss_ui", "btn_music_0000");
		buttonMuteMusic.add(icon_music);
		this.buttonMuteMusic = buttonMuteMusic;
		this.buttonMuteMusic.icon = icon_music;
		var buttonMuteSound = new ButtonText(0, buttonMuteMusic.y + 80, "ss_ui", "btn_buy_0000", this.clickMuteSound, this, MainGame.GAME_TEXT.sound_on);
		buttonMuteSound.text.setFontSize(24);
		buttonMuteSound.text.x = 20;
		buttonMuteSound.text.y = -5;
		this.layerPauseWindow.add(buttonMuteSound);
		MainGame.updateTextWidth(buttonMuteSound.text, 140);
		var buttonHome = new ButtonText(0, buttonMuteSound.y + 80, "ss_ui", "btn_buy_0000", this.showGameScreen, this, MainGame.GAME_TEXT.home);
		buttonHome.text.setFontSize(24);
		buttonHome.text.y = -5;
		this.layerPauseWindow.add(buttonHome);
		MainGame.updateTextWidth(buttonHome.text, 140);
		var icon_sound = this.add.image(-85, -5, "ss_ui", "btn_sound_0000");
		buttonMuteSound.add(icon_sound);
		this.buttonMuteSound = buttonMuteSound;
		this.buttonMuteSound.icon = icon_sound;
		var text_title = this.addText(this.layerPauseWindow, 0, -185, MainGame.GAME_TEXT.paused, 34, true);
		MainGame.updateTextWidth(text_title, 380);
		this.layerPauseWindow.setScale(this.scaleWindow2);
		this.layerPauseWindowMain.visible = false;
		this.layerPauseWindow.visible = false;
		popup_drop.setInteractive();
		fon_merge.setInteractive();
		fon_merge.on("pointerup", this.clickBtnResume, this);
		this.buttonPauseHome = buttonHome
	}
	clickMuteSound() {
		MainGame.Sfx.manage("sound", "switch", this, this.buttonMuteSound.icon, this.buttonMuteSound.text)
	}
	clickMuteMusic() {
		MainGame.Sfx.manage("music", "switch", this, this.buttonMuteMusic.icon, this.buttonMuteMusic.text)
	}
	clickBtnResume() {
		this.isPaused = false;
		this.physics.resume();
		if (this.timerHalloween) this.timerHalloween.paused = false;
		this.layerPauseWindowMain.visible = false;
		this.layerPauseWindow.visible = false;
		this.resumeBots();
		if (MainGame.isAPI) MainGame.API_POKI.gameplayStart()
	}
	initFinishWindow2() {
		this.layerFinishWindowMain = this.add.container();
		this.layerFinishWindow = this.add.container();
		this.layerFinishWindowMain.setDepth(this.DEPTH_layerFinish);
		this.layerFinishWindow.setDepth(this.DEPTH_layerFinish);
		this.layerFinishWindow.x = this.midX;
		this.layerFinishWindow.y = this.midY;
		var fon_merge = this.add.image(this.midX, this.midY, "ss_ui", "bg_connect2_0000");
		fon_merge.setScale(2);
		this.layerFinishWindowMain.add(fon_merge);
		var popup_drop = this.add.image(0, 0, "ss_ui", "popup_unlocked_0000");
		popup_drop.setScale(2);
		this.layerFinishWindow.add(popup_drop);
		var posX = 0;
		var posY = 0;
		var icon_flash = this.add.image(posX, posY + 50, "ss_ui", "flash_select_gun_0000");
		this.layerFinishWindow.add(icon_flash);
		var icon_pumpkin7 = this.add.image(posX - 235, posY - 215, "ss_halloween", "pumpkin7_0000");
		icon_pumpkin7.scaleX = -1;
		this.layerFinishWindow.add(icon_pumpkin7);
		var icon_btn_shop1 = this.add.image(posX - 230, posY - 165, "ss_halloween", "btn_shop1_0000");
		this.layerFinishWindow.add(icon_btn_shop1);
		var icon_diamond = this.add.image(posX - 270, posY - 155, "ss_halloween", "icon_diamond_0000");
		icon_diamond.angle = -15;
		this.layerFinishWindow.add(icon_diamond);
		this.pointsBarB = this.add.image(posX, -85, "ss_halloween", "preloader_background_0000");
		this.pointsBarT = this.add.image(posX, -85, "ss_halloween", "preloader_bar_0000");
		this.pointsBarT_crop = new Phaser.Geom.Rectangle(0, 0, 0, this.pointsBarT.height);
		this.pointsBarT.setCrop(this.pointsBarT_crop);
		this.layerFinishWindow.add(this.pointsBarB);
		this.layerFinishWindow.add(this.pointsBarT);
		var icon_event_halloween = this.add.image(posX + 205, -115, "ss_halloween", "icon_event_halloween_0000");
		this.layerFinishWindow.add(icon_event_halloween);
		var buttonReplay = new Button(0, 40, "ss_ui", "btn_replay_0000", this.clickReplay, this);
		this.layerFinishWindow.add(buttonReplay);
		var buttonHome = new ButtonText(0, 220, "ss_ui", "btn_buy_0000", this.closeFinishWindow, this, MainGame.GAME_TEXT.home);
		buttonHome.text.setFontSize(26);
		this.layerFinishWindow.add(buttonHome);
		MainGame.updateTextWidth(buttonHome.text, 200);
		buttonHome.text.y = -4;
		var buttonGetReward = new ButtonText(0, 220, "ss_ui", "btn_buy_0000", this.clickGetReward, this, MainGame.GAME_TEXT.get_reward);
		buttonGetReward.text.setFontSize(26);
		this.layerFinishWindow.add(buttonGetReward);
		MainGame.updateTextWidth(buttonGetReward.text, 220);
		buttonGetReward.text.y = -4;
		var text_earning = this.addText(this.layerFinishWindow, posX - 230, posY - 187, MainGame.GAME_TEXT.earning, 22, true);
		var text_crystals = this.addText(this.layerFinishWindow, posX - 225, posY - 155, "15", 32, true);
		var text_points1 = this.addText(this.layerFinishWindow, posX, posY - 187, MainGame.GAME_TEXT.points, 28, true);
		text_points1.setTint(16773888);
		var text_points2 = this.addText(this.layerFinishWindow, posX, posY - 145, "8025", 50, true);
		text_points2.setTint(16773888);
		var text_pointBegin = this.addText(this.layerFinishWindow, posX - 225, posY - 55, "0", 26, true);
		text_pointBegin.setOrigin(0, .5);
		var text_pointEnd = this.addText(this.layerFinishWindow, posX + 225, posY - 55, "10000", 26, true);
		text_pointEnd.setOrigin(1, .5);
		var text_stage1_1 = this.addText(this.layerFinishWindow, posX, posY + 125, MainGame.GAME_TEXT.no_give_up, 22, true);
		var text_stage1_2 = this.addText(this.layerFinishWindow, posX, posY + 125 + 27, MainGame.GAME_TEXT.try_again, 22, true);
		var text_stage2_1 = this.addText(this.layerFinishWindow, posX, posY - 5, MainGame.GAME_TEXT.congratulations, 44, true);
		var text_stage2_2 = this.addText(this.layerFinishWindow, posX, posY + 85, MainGame.GAME_TEXT.you_passed, 30, true);
		var text_stage2_3 = this.addText(this.layerFinishWindow, posX, posY + 85 + 34, MainGame.GAME_TEXT.halloween_ch, 30, true);
		var text_stage3_1 = this.addText(this.layerFinishWindow, posX, posY + 125, MainGame.GAME_TEXT.try_again, 22, true);
		this.buttonReplay = buttonReplay;
		this.buttonHome = buttonHome;
		this.buttonGetReward = buttonGetReward;
		this.icon_flash = icon_flash;
		this.text_stage1_1 = text_stage1_1;
		this.text_stage1_2 = text_stage1_2;
		this.text_stage2_1 = text_stage2_1;
		this.text_stage2_2 = text_stage2_2;
		this.text_stage2_3 = text_stage2_3;
		this.text_stage3_1 = text_stage3_1;
		this.text_crystals = text_crystals;
		this.text_points2 = text_points2;
		this.text_pointEnd = text_pointEnd;
		this.layerFinishWindowMain.visible = false;
		this.layerFinishWindow.visible = false
	}
	initRewardWindow() {
		this.layerRewardWindowMain = this.add.container();
		this.layerRewardWindow = this.add.container();
		this.layerRewardWindowMain.setDepth(this.DEPTH_layerFinish);
		this.layerRewardWindow.setDepth(this.DEPTH_layerFinish);
		this.layerRewardWindow.x = this.midX;
		this.layerRewardWindow.y = this.midY;
		var fon_merge = this.add.image(this.midX, this.midY, "ss_ui", "bg_connect2_0000");
		fon_merge.setScale(2);
		this.layerRewardWindowMain.add(fon_merge);
		var popup_drop = this.add.image(0, 0, "ss_ui", "popup_drop_0000");
		popup_drop.setScale(2);
		this.layerRewardWindow.add(popup_drop);
		var effect = this.add.sprite(0, -10, "ss_ui");
		effect.play("magic_1");
		effect.setScale(2);
		this.layerRewardWindow.add(effect);
		var posX = 0;
		var posY = 0;
		var icon_hat19 = this.add.image(posX, posY - 15, "ss_halloween", "icon_hat19_0000");
		this.layerRewardWindow.add(icon_hat19);
		var buttonGet = new ButtonText(0, 150, "ss_ui", "btn_buy_0000", this.clickGetPumpkin, this, MainGame.GAME_TEXT.get);
		buttonGet.text.setFontSize(26);
		this.layerRewardWindow.add(buttonGet);
		MainGame.updateTextWidth(buttonGet.text, 220);
		buttonGet.text.y = -4;
		var text1 = this.addText(this.layerRewardWindow, 0, -185, MainGame.GAME_TEXT.reward, 30, true);
		MainGame.updateTextWidth(text1, 380);
		this.layerRewardWindowMain.visible = false;
		this.layerRewardWindow.visible = false
	}
	clickGetPumpkin() {
		this.showGameScreen(true)
	}
	clickGetReward() {
		this.layerFinishWindowMain.visible = false;
		this.layerFinishWindow.visible = false;
		this.layerRewardWindowMain.visible = true;
		this.layerRewardWindow.visible = true;
		this.layerRewardWindow.setScale(this.scaleWindow1);
		this.tweens.add({
			targets: this.layerRewardWindow,
			scaleX: this.scaleWindow2,
			scaleY: this.scaleWindow2,
			ease: Phaser.Math.Easing.Back.Out,
			duration: 400
		})
	}
	updatePointsBar(progress) {
		var originalWidth = this.pointsBarT.width;
		var width = originalWidth * progress;
		this.pointsBarT_crop.width = width;
		this.pointsBarT.setCrop(this.pointsBarT_crop)
	}
	showFinishWindow2(vStage) {
		this.isLevelFinished = true;
		game.canvas.style.cursor = "default";
		this.layerFinishWindowMain.visible = true;
		this.layerFinishWindow.visible = true;
		this.btnExit.visible = false;
		this.layerFinishWindow.setScale(this.scaleWindow1);
		this.tweens.add({
			targets: this.layerFinishWindow,
			scaleX: this.scaleWindow2,
			scaleY: this.scaleWindow2,
			ease: Phaser.Math.Easing.Back.Out,
			duration: 400
		});
		this.buttonReplay.visible = false;
		this.buttonHome.visible = false;
		this.buttonGetReward.visible = false;
		this.icon_flash.visible = false;
		this.text_stage1_1.visible = false;
		this.text_stage1_2.visible = false;
		this.text_stage2_1.visible = false;
		this.text_stage2_2.visible = false;
		this.text_stage2_3.visible = false;
		this.text_stage3_1.visible = false;
		this.text_crystals.setText(this.countCrystals);
		this.text_points2.setText(this.pointsPumpkin);
		this.text_pointEnd.setText(this.countNeedPoints);
		var progress = this.pointsPumpkin / this.countNeedPoints;
		if (progress > 1) progress = 1;
		this.updatePointsBar(progress);
		if (vStage == 1) {
			this.buttonReplay.visible = true;
			this.buttonHome.visible = true;
			this.text_stage1_1.visible = true;
			this.text_stage1_2.visible = true
		} else if (vStage == 2) {
			this.icon_flash.visible = true;
			this.buttonGetReward.visible = true;
			this.text_stage2_1.visible = true;
			this.text_stage2_2.visible = true;
			this.text_stage2_3.visible = true
		} else if (vStage == 3) {
			this.buttonReplay.visible = true;
			this.buttonHome.visible = true;
			this.text_stage3_1.visible = true
		}
		if (MainGame.isAPI) MainGame.API_POKI.gameplayStop();
		MainGame.api_google("EventHalloween", this.pointsPumpkin);
		MainGame.amount_diamonds += this.countCrystals;
		MainGame.saveSaves()
	}
	closeFinishWindow() {
		this.showGameScreen(true)
	}
	initGUI() {
		this.layerRed = this.addCanvas(this.layerUI, 8126464, .6);
		this.layerRed.alpha = 0;
		var btnExit = new Button(1024 - 64, 50, "ss_shooter", "btn_pause_0000", this.clickBtnPause, this);
		this.layerUI.add(btnExit);
		var btnReload = new Button(80 + 30, 520, "ss_shooter", "btn_reload_0000", this.clickBtnReload, this);
		this.layerUI.add(btnReload);
		var aim_target = this.add.image(this.posCursor.x, this.posCursor.y, "ss_shooter", "crosshair2_0000");
		this.layerUI.add(aim_target);
		var aim_reloading = this.add.image(this.posCursor.x, this.posCursor.y, "ss_shooter", "crosshair4_0000");
		this.layerUI.add(aim_reloading);
		aim_reloading.visible = false;
		this.tweens.add({
			targets: aim_reloading,
			angle: 360,
			ease: Phaser.Math.Easing.Linear,
			duration: 800,
			repeat: -1
		});
		var icon_frag = this.add.image(80, 55, "ss_shooter", "icon_frag_0000");
		this.layerUI.add(icon_frag);
		var pos = {
			x: this.midX,
			y: 600
		};
		this.hpBarB = this.add.image(pos.x, pos.y, "ss_shooter", "hp_bar1_0000");
		this.hpBarT = this.add.image(pos.x, pos.y, "ss_shooter", "hp_bar2_0000");
		this.hpBarT_crop = new Phaser.Geom.Rectangle(0, 0, this.hpBarT.width, this.hpBarT.height);
		this.hpBarT.setCrop(this.hpBarT_crop);
		this.layerUI.add(this.hpBarB);
		this.layerUI.add(this.hpBarT);
		var text_hp = this.addText(this.layerText, pos.x - 167, pos.y - 7, "", 30, true);
		text_hp.setOrigin(0, .5);
		text_hp.setTint(2286098);
		var text_level = this.addText(this.layerText, btnExit.x - 60, 40, "", 32, true);
		text_level.setOrigin(1, .5);
		var text_frags = this.addText(this.layerText, icon_frag.x + 90, icon_frag.y, "10/10", 32, true);
		var text_bullets = this.addText(this.layerText, btnReload.x, btnReload.y + 95, "", 32, true);
		this.btnReload = btnReload;
		this.btnExit = btnExit;
		this.icon_frag = icon_frag;
		this.aim_target = aim_target;
		this.aim_reloading = aim_reloading;
		this.text_hp = text_hp;
		this.text_level = text_level;
		this.text_frags = text_frags;
		this.text_bullets = text_bullets;
		this.icon_frag.visible = false;
		this.text_frags.visible = false;
		this.text_level.visible = false;
		this.text_hp.visible = false;
		this.hpBarB.visible = false;
		this.hpBarT.visible = false
	}
	initGUI_Halloween() {
		var posX = 1024 - 59;
		var icon_x1 = this.add.image(posX, 150 + 75 * 0, "ss_halloween", "icon_x_0000");
		var icon_x2 = this.add.image(posX, 150 + 75 * 1, "ss_halloween", "icon_x_0000");
		var icon_x3 = this.add.image(posX, 150 + 75 * 2, "ss_halloween", "icon_x_0000");
		this.layerUI.add(icon_x1);
		this.layerUI.add(icon_x2);
		this.layerUI.add(icon_x3);
		var timer_plaha = this.add.image(80 + 30, 150, "ss_halloween", "timer_0000");
		this.layerUI.add(timer_plaha);
		var text_points1 = this.addText(this.layerText, 80 + 30, 30, MainGame.GAME_TEXT.points, 28, true);
		var text_points2 = this.addText(this.layerText, 80 + 30, 30 + 40, "10055", 52, true);
		var text_timer = this.addText(this.layerText, timer_plaha.x, timer_plaha.y - 2, "00:59", 46, true);
		this.textPointsText = text_points1;
		this.textPoints = text_points2;
		this.textTimer = text_timer;
		this.icon_x1 = icon_x1;
		this.icon_x2 = icon_x2;
		this.icon_x3 = icon_x3;
		this.timerPlaha = timer_plaha;
		this.textPoints.setText(this.pointsPumpkin);
		var timeStr = MainGame.secToHHMMSS(this.timerCount);
		this.textTimer.setText(timeStr)
	}
	initComboTexts() {
		this.arComboText = [];
		this.countCombo = 0;
		this.poolCombo = 0;
		this.timerCombo = 0;
		var text_combo1 = this.addText(this.layerText, 0, 0, "", 32, true);
		text_combo1.setTint(16776960);
		text_combo1.setDropShadow(3, 3, 6570541, .7);
		var text_combo2 = this.addText(this.layerText, 0, 0, "", 32, true);
		text_combo2.setTint(16776960);
		text_combo2.setDropShadow(3, 3, 6570541, .7);
		var text_combo3 = this.addText(this.layerText, 0, 0, "", 32, true);
		text_combo3.setTint(16776960);
		text_combo3.setDropShadow(3, 3, 6570541, .7);
		this.arComboText.push(text_combo1);
		this.arComboText.push(text_combo2);
		this.arComboText.push(text_combo3);
		text_combo1.visible = false;
		text_combo2.visible = false;
		text_combo3.visible = false
	}
	updateCombo() {
		if (this.timerCombo > 0) {
			this.timerCombo--;
			if (this.timerCombo == 0) this.countCombo = 0
		}
	}
	checkCombo(vX, vY) {
		this.timerCombo = 70;
		this.countCombo++;
		if (this.countCombo < 2) return;
		if (this.countCombo > 10) this.countCombo = 10;
		this.showCombo(vX, vY, this.arComboText[this.poolCombo], MainGame.GAME_TEXT["combo" + (this.countCombo - 1)]);
		this.poolCombo++;
		if (this.poolCombo > 2) this.poolCombo = 0
	}
	showCombo(vX, vY, vTextField, vValue) {
		vTextField.x = vX;
		vTextField.y = vY - 120;
		vTextField.visible = true;
		vTextField.setText(vValue.toUpperCase());
		this.tweens.killTweensOf(vTextField);
		vTextField.setAngle(2 * MyMath.getRandomInt(-5, 5));
		vTextField.setScale(1);
		this.tweens.add({
			targets: vTextField,
			scaleX: 1.4,
			scaleY: 1.4,
			ease: Phaser.Math.Easing.Linear,
			duration: 100,
			yoyo: true,
			onComplete: this.hideCombo(vTextField)
		})
	}
	hideCombo(vTextField) {
		this.tweens.add({
			targets: vTextField,
			scaleX: .5,
			scaleY: .5,
			ease: Phaser.Math.Easing.Linear,
			duration: 150,
			delay: 500,
			onComplete: function() {
				vTextField.visible = false
			}
		})
	}
	updateHpBar(progress) {
		var originalWidth = this.hpBarT.width;
		var width = originalWidth * progress;
		this.tweens.killTweensOf(this.hpBarT_crop);
		this.tweens.add({
			targets: this.hpBarT_crop,
			width: width,
			ease: Phaser.Math.Easing.Linear,
			duration: 100,
			delay: 0,
			onUpdate: () => {
				this.hpBarT.setCrop(this.hpBarT_crop)
			}
		})
	}
	addSmoke() {
		var smoke = this.add.image(0, 0, "ss_shooter", "smoke_0000");
		smoke.setOrigin(.5, .92);
		smoke.visible = false;
		return smoke
	}
	showEffectSmoke(vSmoke) {
		vSmoke.visible = true;
		this.tweens.killTweensOf(vSmoke);
		vSmoke.alpha = 1;
		vSmoke.angle = 35;
		vSmoke.x = 0;
		vSmoke.scaleX = 1;
		vSmoke.scaleY = 1;
		this.tweens.add({
			targets: vSmoke,
			x: 20,
			angle: 45,
			alpha: 0,
			scaleX: 1.1,
			scaleY: 1.1,
			ease: Phaser.Math.Easing.Linear,
			duration: 500,
			onComplete: function() {
				vSmoke.visible = false
			}
		})
	}
	testWeapon(vType) {
		MainGame.selectedGun = vType;
		var settingsWeapon = this.arOffsetWeapon[MainGame.selectedGun - 1];
		this.FIRERATE = settingsWeapon.firerate;
		this.damageWeapons = settingsWeapon.dmg;
		this.maxAmmo = settingsWeapon.ammo;
		this.offsetWeapon.x = settingsWeapon.x;
		this.offsetWeapon.y = settingsWeapon.y;
		this.offsetFire.x = settingsWeapon.fx;
		this.offsetFire.y = settingsWeapon.fy;
		var ar_pistol = [1, 2, 3, 4, 5, 6, 20, 21, 33, 42, 43];
		var ar_rifle1 = [12, 14, 22, 25, 27, 39];
		var ar_rifle2 = [7, 8, 10, 18, 19, 26, 44];
		var ar_rifle3 = [9, 11, 13, 15, 23, 29, 30, 31, 36, 37, 38, 40, 41, 46, 47, 48, 49, 50];
		var ar_rifle4 = [16, 17, 24, 28, 32, 34, 35, 45];
		var isPistol = ar_pistol.indexOf(MainGame.selectedGun) !== -1;
		var isRifle1 = ar_rifle1.indexOf(MainGame.selectedGun) !== -1;
		var isRifle2 = ar_rifle2.indexOf(MainGame.selectedGun) !== -1;
		var isRifle3 = ar_rifle3.indexOf(MainGame.selectedGun) !== -1;
		var isRifle4 = ar_rifle4.indexOf(MainGame.selectedGun) !== -1;
		this.weaponType = "pistol";
		if (isRifle1) this.weaponType = "rifle1";
		if (isRifle2) this.weaponType = "rifle2";
		if (isRifle3) this.weaponType = "rifle3";
		if (isRifle4) this.weaponType = "rifle4";
		this.arm_weapon.timeScale = 1;
		this.arm_weapon.setSkinByName("gun" + MainGame.selectedGun);
		this.arm_weapon.play(this.weaponType + "_idle", false);
		this.amountAmmo = this.maxAmmo;
		this.updateAmmoText()
	}
	initWeapon() {
		this.posCursor = {
			x: this.midX,
			y: this.midY
		};
		var settingsWeapon = this.arOffsetWeapon[MainGame.selectedGun - 1];
		this.offsetWeapon.x = settingsWeapon.x;
		this.offsetWeapon.y = settingsWeapon.y;
		this.offsetFire.x = settingsWeapon.fx;
		this.offsetFire.y = settingsWeapon.fy;
		var arm_weapon = this.add.spine(0, 0, "spine_shooter", "pistol_idle", true);
		this.layerSpineArm.add(arm_weapon);
		arm_weapon.x = this.midX;
		arm_weapon.y = 500;
		arm_weapon.setSkinByName("gun" + MainGame.selectedGun);
		arm_weapon.setScale(this.aimScale);
		var ar_pistol = [1, 2, 3, 4, 5, 6, 20, 21, 33, 42, 43];
		var ar_rifle1 = [12, 14, 22, 25, 27, 39];
		var ar_rifle2 = [7, 8, 10, 18, 19, 26, 44];
		var ar_rifle3 = [9, 11, 13, 15, 23, 29, 30, 31, 36, 37, 38, 40, 41, 46, 47, 48, 49, 50];
		var ar_rifle4 = [16, 17, 24, 28, 32, 34, 35, 45];
		var isPistol = ar_pistol.indexOf(MainGame.selectedGun) !== -1;
		var isRifle1 = ar_rifle1.indexOf(MainGame.selectedGun) !== -1;
		var isRifle2 = ar_rifle2.indexOf(MainGame.selectedGun) !== -1;
		var isRifle3 = ar_rifle3.indexOf(MainGame.selectedGun) !== -1;
		var isRifle4 = ar_rifle4.indexOf(MainGame.selectedGun) !== -1;
		this.weaponType = "pistol";
		if (isRifle1) this.weaponType = "rifle1";
		if (isRifle2) this.weaponType = "rifle2";
		if (isRifle3) this.weaponType = "rifle3";
		if (isRifle4) this.weaponType = "rifle4";
		arm_weapon.play(this.weaponType + "_idle", false);
		this.arm_weapon = arm_weapon;
		if (this.aim_target) {
			this.arm_weapon.x = this.aim_target.x + this.offsetWeapon.x;
			this.arm_weapon.y = this.aim_target.y + this.offsetWeapon.y
		}
		this.input.on("pointerdown", this.onInputDown, this);
		this.input.on("pointerup", this.onInputUp, this);
		this.input.on("pointermove", this.onInputMove, this);
		game.canvas.style.cursor = "none";
		this.armReady = true;
		this.group_smoke1 = this.add.container();
		this.layerEffect.add(this.group_smoke1);
		this.group_smoke2 = this.add.container();
		this.layerEffect.add(this.group_smoke2);
		this.group_smoke3 = this.add.container();
		this.layerEffect.add(this.group_smoke3);
		this.effect_smoke1 = this.addSmoke();
		this.group_smoke1.add(this.effect_smoke1);
		this.effect_smoke2 = this.addSmoke();
		this.group_smoke2.add(this.effect_smoke2);
		this.effect_smoke3 = this.addSmoke();
		this.group_smoke3.add(this.effect_smoke3);
		var effect = this.add.sprite(this.midX, this.midY, "ss_shooter");
		effect.play("flash_big");
		effect.visible = false;
		this.effect_shoot = effect;
		this.layerEffect.add(effect)
	}
	getInputPosition(pointer) {
		const deltaX = Math.ceil(this.parent.width - this.sizer.width) * .5;
		const deltaY = Math.ceil(this.parent.height - this.sizer.height) * .5;
		const scaleX = this.sizer.width / this.GAME_WIDTH;
		const scaleY = this.sizer.height / this.GAME_HEIGHT;
		const zoom = Math.max(scaleX, scaleY);
		const offset = deltaY / zoom;
		var pX = (pointer.x - deltaX) / zoom;
		var pY = pointer.y / zoom - offset;
		return {
			x: pX,
			y: pY
		}
	}
	onInputDown(pointer) {
		var pos = this.getInputPosition(pointer);
		this.posInputDown = pos;
		this.isInputPressed = true
	}
	onInputUp(pointer) {
		var pos = this.getInputPosition(pointer);
		this.lastPos = this.posCursor;
		this.isInputPressed = false;
		if (this.isGoTutorial) {
			this.onTapTutorial()
		}
	}
	onInputMove(pointer) {
		if (this.isLevelFinished || this.isPaused || this.isBeforeStart) return;
		this.posCursor = this.getInputPosition(pointer);
		if (!MainGame.isDesktop) {
			this.posCursor.x = this.lastPos.x + (this.posCursor.x - this.posInputDown.x) * 1.5;
			this.posCursor.y = this.lastPos.y + (this.posCursor.y - this.posInputDown.y) * 1.2
		}
		var deltaX = 25;
		if (this.posCursor.x < deltaX) this.posCursor.x = deltaX;
		if (this.posCursor.x > 1024 - deltaX) this.posCursor.x = 1024 - deltaX;
		if (this.posCursor.y < this.MAX_TOP) {
			this.posCursor.y = this.MAX_TOP;
			game.canvas.style.cursor = "default"
		} else if (this.posCursor.y > this.MAX_BOTTOM) {
			this.posCursor.y = this.MAX_BOTTOM;
			game.canvas.style.cursor = "default"
		} else {
			game.canvas.style.cursor = "none"
		}
	}
	updateReloading(vBool) {
		this.isReloading = vBool;
		this.aim_reloading.visible = vBool;
		this.arm_weapon.timeScale = 1;
		if (vBool) {
			this.aim_target.setFrame("crosshair1_0000");
			var animationTime = 1 * (1800 / this.TIME_RELOADING);
			this.arm_weapon.timeScale = animationTime;
			this.arm_weapon.play(this.weaponType + "_reload", false);
			this.timerReloading = this.time.delayedCall(this.TIME_RELOADING, this.finishedReloading, [], this);
			MainGame.Sfx.play("sound", "reload")
		} else {
			this.aim_target.setFrame("crosshair2_0000");
			this.arm_weapon.play(this.weaponType + "_idle", false);
			this.amountAmmo = this.maxAmmo;
			this.updateAmmoText()
		}
	}
	finishedReloading() {
		this.updateReloading(false);
		this.timerReloading.remove();
		this.timerReloading = null
	}
	updateArm() {
		if (this.posCursor) {
			this.aim_target.x = this.posCursor.x;
			this.aim_target.y = this.posCursor.y;
			this.aim_reloading.x = this.posCursor.x - 2;
			this.aim_reloading.y = this.posCursor.y - 2;
			var distY = 750 - this.posCursor.y;
			var deltaX = Math.floor(distY * .25);
			this.posWeapon.x = this.posCursor.x + deltaX;
			if (this.posWeapon.x > 950) this.posWeapon.x = 950;
			var deltaY = Math.floor(distY * .2);
			this.posWeapon.y = this.posCursor.y + deltaY;
			if (this.posWeapon.y < 280) this.posWeapon.y = 280;
			this.arm_weapon.x -= (this.arm_weapon.x - this.offsetWeapon.x - this.posWeapon.x) * this.WEAPON_WEIGHT;
			this.arm_weapon.y -= (this.arm_weapon.y - this.offsetWeapon.y - this.deltaScreenY - this.posWeapon.y) * this.WEAPON_WEIGHT;
			this.effect_shoot.x = this.arm_weapon.x - this.offsetWeapon.x + this.offsetFire.x;
			this.effect_shoot.y = this.arm_weapon.y - this.offsetWeapon.y + this.offsetFire.y
		}
		if (this.isReloading || this.isLevelFinished) return;
		var target;
		var dist;
		this.aim_target.setFrame("crosshair2_0000");
		if (!this.checkBarrels(this.aim_target.x, this.aim_target.y)) {
			for (var i = 0; i < this.countEnemies; i++) {
				target = this.arTargets[i];
				if (target && target.hero && target.isAlive()) {
					dist = MyMath.distanceTwoPoints(this.aim_target.x, target.hero.x, this.aim_target.y, target.hero.y - 50);
					if (dist < 3200) {
						var isUnderBarrel = this.checkBarrels(target.hero.x, target.hero.y - 20);
						if (isUnderBarrel && target.isPrised) {} else {
							this.aim_target.setFrame("crosshair3_0000");
							this.makeShoot(target, this.aim_target.x, this.aim_target.y)
						}
					}
				}
			}
		}
		this.updatePumpkins(this.aim_target.x, this.aim_target.y)
	}
	onAnimEvent(entry) {
		if (entry.animation.name == this.weaponType + "_idle") {}
		console.log(entry.animation.name)
	}
	showEffectFire(vX, vY) {
		this.effect_shoot.play("flash_big");
		this.effect_shoot.visible = true;
		if (!this.effect_smoke1.visible) {
			this.showEffectSmoke(this.effect_smoke1);
			this.group_smoke1.x = vX;
			this.group_smoke1.y = vY
		} else {
			if (!this.effect_smoke2.visible) {
				this.showEffectSmoke(this.effect_smoke2);
				this.group_smoke2.x = vX;
				this.group_smoke2.y = vY
			} else {
				if (!this.effect_smoke3.visible) {
					this.showEffectSmoke(this.effect_smoke3);
					this.group_smoke3.x = vX;
					this.group_smoke3.y = vY
				} else {
					this.showEffectSmoke(this.effect_smoke1);
					this.group_smoke1.x = vX;
					this.group_smoke1.y = vY
				}
			}
		}
	}
	updateAmmoText() {
		this.text_bullets.setText(this.amountAmmo + "/" + this.maxAmmo)
	}
	updateFragsText() {
		this.text_frags.setText(this.countFrags + "/" + this.needToKill)
	}
	getCountBots() {
		this.countBots--;
		return this.countBots >= 0
	}
	reviveLevel() {
		this.isLevelFinished = false;
		this.isGameOver = false;
		this.hpPlayerNow = this.hpPlayerMax;
		this.text_hp.setText(this.hpPlayerNow);
		this.updateHpBar(this.hpPlayerNow / this.hpPlayerMax);
		this.layerFinishWindowMain.visible = false;
		this.layerFinishWindow.visible = false;
		this.layerRed.alpha = 0;
		this.tweens.killTweensOf(this.layerRed);
		this.btnExit.visible = true;
		if (MainGame.isAPI) MainGame.API_POKI.gameplayStart()
	}
	finishLevel(vBool) {}
	showFinishWindowWin() {
		MainGame.Sfx.play("sound", "win");
		this.showFinishWindow(true)
	}
	showFinishWindowLose() {
		this.showFinishWindow(false)
	}
	showFinishWindow(vBool) {
		game.canvas.style.cursor = "default";
		this.isLevelFinished = true;
		this.aim_target.setFrame("crosshair2_0000");
		this.layerFinishWindowMain.visible = true;
		this.layerFinishWindow.visible = true;
		this.buttonIncomeX2.visible = false;
		this.buttonGet.visible = false;
		this.reward_diamond.visible = false;
		this.effect_diamonds.visible = false;
		this.text_diamonds.visible = false;
		this.buttonHome.visible = false;
		this.buttonReplay.visible = false;
		this.buttonRevive.visible = false;
		this.text_no_give_up.visible = false;
		this.text_try_merge_gun.visible = false;
		if (vBool) {
			this.title_finish.setText(MainGame.GAME_TEXT.victory.toUpperCase());
			this.title_finish.setFontSize(46);
			this.buttonIncomeX2.visible = true;
			this.buttonGet.visible = true;
			this.reward_diamond.visible = true;
			this.effect_diamonds.visible = true;
			this.text_diamonds.visible = true;
			if (MainGame.isAPI) {
				if (MainGame.API_POKI && MainGame.API_POKI.api_isAdblock) this.buttonIncomeX2.setEnable(false)
			} else {
				if (!MainGame.isDebug) this.buttonIncomeX2.setEnable(false)
			}
		} else {
			this.title_finish.setText(MainGame.GAME_TEXT.try_again.toUpperCase());
			this.title_finish.setFontSize(30);
			if (this.suggestRevive) {
				this.suggestRevive = false;
				this.buttonRevive.visible = true;
				this.countRevive = 9 + 1;
				this.updateTimerRevive();
				this.timerRevive = this.time.addEvent({
					delay: 1e3,
					callback: this.updateTimerRevive,
					callbackScope: this,
					loop: true
				})
			} else {
				this.buttonReplay.visible = true
			}
			this.buttonHome.visible = true;
			this.text_no_give_up.visible = true;
			this.text_try_merge_gun.visible = true
		}
		if (MainGame.isAPI) MainGame.API_POKI.gameplayStop()
	}
	updateTimerRevive() {
		this.countRevive--;
		this.text_count_revive.setText(this.countRevive);
		if (this.countRevive > 0) {
			this.tweens.add({
				targets: this.text_count_revive,
				scaleX: 1.3,
				scaleY: 1.3,
				ease: "Linear",
				duration: 250,
				yoyo: true,
				repeat: 0
			})
		} else {
			if (this.timerRevive) this.timerRevive.remove();
			this.buttonReplay.visible = true;
			this.buttonRevive.visible = false;
			this.buttonHome.setEnable(true)
		}
	}
	checkFinishLevel() {
		var isFinish = this.countFrags >= this.needToKill;
		if (isFinish) this.finishLevel(true);
		return isFinish
	}
	increaseFrags() {
		this.countFrags++;
		this.checkFinishLevel();
		this.updateFragsText()
	}
	checkAmmoAmount() {
		if (this.amountAmmo <= 0) {
			this.updateReloading(true)
		}
		this.updateAmmoText()
	}
	allowShoot() {
		this.isAllowShoot = true
	}
	playSfxShoot() {
		switch (MainGame.selectedGun) {
			case 17:
			case 28:
			case 35:
				MainGame.Sfx.play("sound", "autorifle");
				break;
			case 6:
			case 10:
			case 24:
			case 27:
			case 34:
				MainGame.Sfx.play("sound", "autorifle2");
				break;
			case 7:
			case 9:
			case 32:
				MainGame.Sfx.play("sound", "autorifle3");
				break;
			case 1:
			case 3:
			case 33:
				MainGame.Sfx.play("sound", "pistol");
				break;
			case 5:
			case 21:
			case 43:
				MainGame.Sfx.play("sound", "pistol2");
				break;
			case 2:
			case 20:
				MainGame.Sfx.play("sound", "pistol3");
				break;
			case 4:
			case 42:
				MainGame.Sfx.play("sound", "pistol4");
				break;
			case 38:
			case 46:
				MainGame.Sfx.play("sound", "rifle");
				break;
			case 14:
			case 36:
			case 41:
				MainGame.Sfx.play("sound", "rifle2");
				break;
			case 15:
			case 23:
			case 47:
				MainGame.Sfx.play("sound", "rifle3");
				break;
			case 13:
			case 37:
				MainGame.Sfx.play("sound", "rifle4");
				break;
			case 16:
			case 45:
				MainGame.Sfx.play("sound", "rifle5");
				break;
			case 19:
			case 26:
				MainGame.Sfx.play("sound", "shotgun");
				break;
			case 18:
			case 44:
				MainGame.Sfx.play("sound", "shotgun2");
				break;
			case 8:
			case 25:
				MainGame.Sfx.play("sound", "shotgun3");
				break;
			case 22:
			case 30:
			case 40:
				MainGame.Sfx.play("sound", "sniper");
				break;
			case 39:
			case 49:
				MainGame.Sfx.play("sound", "sniper2");
				break;
			case 48:
			case 50:
				MainGame.Sfx.play("sound", "sniper3");
				break;
			case 12:
			case 29:
				MainGame.Sfx.play("sound", "sniper4");
				break;
			case 11:
			case 31:
				MainGame.Sfx.play("sound", "sniper5");
				break
		}
	}
	makeShoot2(vX, vY) {
		var animName = this.arm_weapon.getCurrentAnimation().name;
		if (this.isAllowShoot) {
			this.isAllowShoot = false;
			this.time.delayedCall(this.FIRERATE, this.allowShoot, [], this);
			var animationTime = 1 * (330 / this.FIRERATE);
			this.arm_weapon.timeScale = animationTime;
			this.arm_weapon.setAnimation(0, this.weaponType + "_shoot", false);
			this.arm_weapon.addAnimation(0, this.weaponType + "_idle", false);
			this.showEffectFire(this.effect_shoot.x, this.effect_shoot.y);
			this.amountAmmo--;
			this.checkAmmoAmount();
			this.playSfxShoot()
		}
	}
	makeShoot(vTarget, vX, vY) {
		var animName = this.arm_weapon.getCurrentAnimation().name;
		if (this.isAllowShoot) {
			this.isAllowShoot = false;
			this.time.delayedCall(this.FIRERATE, this.allowShoot, [], this);
			var animationTime = 1 * (330 / this.FIRERATE);
			this.arm_weapon.timeScale = animationTime;
			this.arm_weapon.setAnimation(0, this.weaponType + "_shoot", false);
			this.arm_weapon.addAnimation(0, this.weaponType + "_idle", false);
			vTarget.damage(this.damageWeapons);
			var posKickX = (vTarget.hero.x + vX) * .5;
			this.addBotKick(posKickX, vY);
			this.showEffectFire(this.effect_shoot.x, this.effect_shoot.y);
			this.amountAmmo--;
			this.checkAmmoAmount();
			if (this.isGoTutorial) this.checkTutorial();
			this.playSfxShoot()
		}
	}
	addBotFlash(vX, vY) {
		var effect = this.add.sprite(vX, vY, "ss_shooter");
		effect.play("flash");
		this.layerEffect.add(effect)
	}
	addBotKick(vX, vY) {
		var effect = this.add.sprite(vX, vY, "ss_shooter");
		effect.play("effect_kick");
		this.layerEffect.add(effect)
	}
	addExplosionPumpkin(vX, vY, vType) {
		var effect = this.add.sprite(vX, vY, "ss_halloween");
		if (vType == 10) {
			effect.play("explosion_bomb");
			MainGame.Sfx.play("sound", "explosion")
		} else {
			effect.play("explosion_pumpkin");
			var r = MyMath.getRandomInt(1, 3);
			MainGame.Sfx.play("sound", "splash" + r)
		}
		effect.setScale(2);
		this.layerEffect.add(effect)
	}
	underAttack(vIsYoyo) {
		this.layerRed.alpha = 0;
		this.tweens.killTweensOf(this.layerRed);
		this.tweens.add({
			targets: this.layerRed,
			alpha: .6,
			ease: "Linear",
			duration: 150,
			yoyo: vIsYoyo
		})
	}
	botShoot(vType, vLevel, vX, vY) {
		if (this.isLevelFinished) return;
		this.addBotFlash(vX, vY);
		if (this.isGameOver) return;
		this.hpPlayerNow -= 5;
		if (this.hpPlayerNow <= 0) {
			this.hpPlayerNow = 0;
			this.finishLevel(false);
			this.underAttack(false)
		} else {
			this.underAttack(true)
		}
		this.text_hp.setText(this.hpPlayerNow);
		this.updateHpBar(this.hpPlayerNow / this.hpPlayerMax);
		if (vType == "stickman1") MainGame.Sfx.play("sound", "enemy4");
		if (vType == "stickman2") MainGame.Sfx.play("sound", "enemy3");
		if (vType == "stickman3") MainGame.Sfx.play("sound", "enemy");
		if (vType == "stickman4") MainGame.Sfx.play("sound", "enemy2")
	}
	checkBarrels(vX, vY) {
		var isInsideRect1 = Phaser.Geom.Rectangle.ContainsPoint(this.rect1, {
			x: vX,
			y: vY
		});
		var isInsideRect2 = Phaser.Geom.Rectangle.ContainsPoint(this.rect2, {
			x: vX,
			y: vY
		});
		var isInsideRect3 = Phaser.Geom.Rectangle.ContainsPoint(this.rect3, {
			x: vX,
			y: vY
		});
		var isInsideRect4 = Phaser.Geom.Rectangle.ContainsPoint(this.rect4, {
			x: vX,
			y: vY
		});
		var isInsideRect5 = Phaser.Geom.Rectangle.ContainsPoint(this.rect5, {
			x: vX,
			y: vY
		});
		return isInsideRect1 || isInsideRect2 || isInsideRect3 || isInsideRect4 || isInsideRect5
	}
	initLevel() {
		this.arTargets = [];
		this.posCursor = {
			x: this.midX,
			y: this.midY
		};
		var line1_Y = 300 - 60;
		var line2_Y = 515 - 60;
		this.rect1 = this.add.rectangle(80 * 4 - 45, line1_Y - 50, 160, 80);
		this.rect2 = this.add.rectangle(80 * 8 - 45, line1_Y - 50, 160, 80);
		this.rect3 = this.add.rectangle(80 * 2 - 45, line2_Y - 50, 160, 80);
		this.rect4 = this.add.rectangle(80 * 6 - 45, line2_Y - 50, 160, 80);
		this.rect5 = this.add.rectangle(80 * 10 - 45, line2_Y - 50, 160, 80)
	}
	addBotStep3() {
		this.addBot(0, 0, "stickman3", 1, 0)
	}
	addBotStep4() {
		this.addBot(0, 0, "stickman4", 2, 0)
	}
	addBotStep5() {
		this.addBot(0, 0, null, 1, 2)
	}
	addBotStep6() {
		this.addBot(0, 0, null, 2, 2)
	}
	addBotStep7() {
		this.addBot(0, 0, null, 1, 3)
	}
	addBotStep8() {
		this.addBot(0, 0, null, 2, 3)
	}
	addBotStep9() {
		this.addBot(0, 0, null, 1, 3)
	}
	addBotStep10() {
		this.addBot(0, 0, null, 2, 3)
	}
	addBot(vX, vY, vSkin, vLine, vBrain) {
		if (this.countBots <= 0) return;
		var posX = vX * 80;
		var bot = new Bot(this, this.layerMob, posX, vY, vSkin, vLine, vBrain);
		this.arTargets.push(bot);
		this.countEnemies = this.arTargets.length
	}
	updateSpawnPumpkins() {
		if (this.isLevelFinished) return;
		this.counterPumpkin++;
		if (this.counterPumpkin > 120) {
			if (this.isSpawnEnd) {
				this.addPumpkin(1)
			} else {
				var list = this.arSpawnSquad[this.stepPumpkin];
				for (var i = 0; i < list.length; i++) {
					this.addPumpkin(list[i])
				}
			}
			this.counterPumpkin = MyMath.getRandomInt(0, 5) * 10;
			this.stepPumpkin++;
			if (this.stepPumpkin >= this.arSpawnSquad.length) this.isSpawnEnd = true
		}
	}
	addPumpkin(vType) {
		var posX = this.midX + Phaser.Math.Between(-20, 20) * 10;
		var posY = 800;
		var type = vType;
		if (type == 1) type = Phaser.Math.Between(1, 6);
		this.pumpkins.firePumpkin(posX, posY, type)
	}
	updatePumpkins(vX, vY) {
		var dist = 0;
		var isFoundEnemy = false;
		if (!this.isAllowShoot) return;
		this.pumpkins.children.each((function(pumpkin) {
			if (pumpkin.active) {
				dist = MyMath.distanceTwoPoints(vX, pumpkin.x, vY, pumpkin.y);
				if (dist < 1600) {
					this.aim_target.setFrame("crosshair3_0000");
					this.makeShoot2(this.aim_target.x, this.aim_target.y);
					pumpkin.hide();
					this.addPiecesPumpkin(pumpkin.x, pumpkin.y, pumpkin.type);
					this.addExplosionPumpkin(pumpkin.x, pumpkin.y, pumpkin.type);
					if (pumpkin.type == 10) {
						this.exploseAllPumkins();
						return false
					} else if (pumpkin.type == 7) {
						this.addPumpkinCrystals();
						this.crystalsPartices.emitParticleAt(pumpkin.x, pumpkin.y)
					}
					if (pumpkin.type < 10) this.addPumpkinPoints()
				}
			}
		}), this)
	}
	exploseAllPumkins() {
		this.cameras.main.shake(400, .01);
		this.cameras.main.flash();
		this.pumpkins.children.each((function(pumpkin) {
			if (pumpkin.active) {
				pumpkin.hide();
				this.addPiecesPumpkin(pumpkin.x, pumpkin.y, pumpkin.type);
				this.addExplosionPumpkin(pumpkin.x, pumpkin.y, pumpkin.type)
			}
		}), this)
	}
	initSettingsHalloween() {
		this.POINTS_PER_PUMPKIN = 25;
		this.CRYSTALS_PER_PUMPKIN = 3;
		this.timerCount = 60;
		this.countNeedPoints = 2e3;
		this.countCrystals = 0;
		this.pointsPumpkin = 0;
		this.attemptsPumpkin = 3;
		this.counterPumpkin = 100;
		this.isSpawnEnd = false;
		this.arSpawnSquad = [];
		this.stepPumpkin = 0;
		for (var i = 0; i < 5; i++) {
			this.arSpawnSquad.push([7])
		}
		for (var i = 0; i < 10; i++) {
			this.arSpawnSquad.push([10])
		}
		for (var i = 0; i < 15; i++) {
			this.arSpawnSquad.push([1])
		}
		var r = 0;
		var reservedPumpkins = 60;
		for (var i = 0; i < 30; i++) {
			if (reservedPumpkins > 0) {
				r = MyMath.getRandomInt(0, 4);
				if (r > reservedPumpkins) r = reservedPumpkins;
				reservedPumpkins -= r;
				for (var j = 0; j < r; j++) {
					this.arSpawnSquad[i].push([1])
				}
			}
		}
		if (reservedPumpkins > 1) {
			var halfReserv = Math.floor(reservedPumpkins * .5);
			for (var j = 0; j < halfReserv; j++) {
				this.arSpawnSquad[0].push([1])
			}
			for (var j = 0; j < halfReserv; j++) {
				this.arSpawnSquad[1].push([1])
			}
		}
		MyMath.shuffleArr(this.arSpawnSquad);
		this.arSpawnSquad.unshift([1]);
		this.arSpawnSquad.unshift([1])
	}
	startTimerHalloween() {
		this.timerHalloween = this.time.addEvent({
			delay: 1e3,
			callback: this.updateTimerHalloween,
			callbackScope: this,
			loop: true
		})
	}
	checkFinishGame() {
		if (this.timerHalloween) this.timerHalloween.remove();
		if (MainGame.listEvents[0] == 0) {
			if (this.pointsPumpkin < this.countNeedPoints) {
				this.showFinishWindow2(1)
			} else {
				this.showFinishWindow2(2);
				MainGame.completedEvent()
			}
		} else {
			this.showFinishWindow2(3)
		}
	}
	addPumpkinPoints() {
		this.pointsPumpkin += this.POINTS_PER_PUMPKIN;
		this.textPoints.setText(this.pointsPumpkin)
	}
	updateTimerHalloween() {
		this.timerCount--;
		var timeStr = MainGame.secToHHMMSS(this.timerCount);
		this.textTimer.setText(timeStr);
		if (this.timerCount == 0) {
			this.checkFinishGame()
		}
	}
	updateAttemptsPumpkin() {
		if (this.isLevelFinished) return;
		if (this.attemptsPumpkin == 3) {
			this.icon_x1.setFrame("icon_x2_0000");
			MainGame.jelly(this, this.icon_x1, .3, null, null, 100, 600);
			MainGame.Sfx.play("sound", "miss")
		}
		if (this.attemptsPumpkin == 2) {
			this.icon_x2.setFrame("icon_x2_0000");
			MainGame.jelly(this, this.icon_x2, .3, null, null, 100, 600);
			MainGame.Sfx.play("sound", "miss")
		}
		if (this.attemptsPumpkin == 1) {
			this.icon_x3.setFrame("icon_x2_0000");
			MainGame.jelly(this, this.icon_x3, .3, null, null, 100, 600);
			MainGame.Sfx.play("sound", "miss")
		}
		this.attemptsPumpkin--;
		if (this.attemptsPumpkin == 0) {
			this.checkFinishGame()
		}
	}
	addPumpkinCrystals() {
		this.countCrystals += this.CRYSTALS_PER_PUMPKIN
	}
	initPiecesPumpkin() {
		this.pumpkins = new Pumpkins(this);
		var particles1 = this.add.particles("ss_halloween");
		var particles2 = this.add.particles("ss_halloween");
		var particles3 = this.add.particles("ss_halloween");
		particles1.createEmitter({
			frame: ["pumpkin_part1_0000", "pumpkin_part2_0000", "pumpkin_part3_0000", "pumpkin_part4_0000", "pumpkin_part5_0000"],
			angle: {
				min: 240,
				max: 300
			},
			speed: {
				min: 300,
				max: 500
			},
			quantity: {
				min: 3,
				max: 6
			},
			lifespan: 4e3,
			scale: {
				min: .8,
				max: 1.2
			},
			rotate: {
				start: 0,
				end: 360,
				ease: "Back.easeOut"
			},
			gravityY: 800,
			on: false
		});
		particles2.createEmitter({
			frame: ["splash1_0000", "splash2_0000"],
			rotate: {
				min: 0,
				max: 90
			},
			quantity: 1,
			lifespan: 1e3,
			delay: 2500,
			alpha: {
				start: 1,
				end: 0
			},
			scaleY: {
				start: 1,
				end: 1.1
			},
			gravityY: 10,
			on: false
		});
		particles3.createEmitter({
			frame: ["icon_diamond_0000"],
			angle: {
				min: 240,
				max: 300
			},
			speed: {
				min: 300,
				max: 500
			},
			quantity: 3,
			lifespan: 4e3,
			scale: {
				min: .8,
				max: 1.2
			},
			rotate: {
				start: 0,
				end: 360,
				ease: "Back.easeOut"
			},
			gravityY: 800,
			on: false
		});
		this.piecesPartices = particles1;
		this.splashPartices = particles2;
		this.crystalsPartices = particles3;
		this.splashPartices.setDepth(this.DEPTH_layerMob + .001);
		this.piecesPartices.setDepth(this.DEPTH_layerMob + .002);
		this.crystalsPartices.setDepth(this.DEPTH_layerMob + .003);
		this.pumpkins.setDepth(this.DEPTH_layerMob + .004)
	}
	addPiecesPumpkin(vX, vY, vType) {
		if (vType == 10) return;
		this.piecesPartices.emitParticleAt(vX, vY);
		this.splashPartices.emitParticleAt(vX, vY)
	}
	initTutorialPumpkin() {
		this.isGoTutorial = true;
		this.tutorialStep = 0;
		var offsetY = -60;
		var plaha = this.add.image(this.midX, 250 + offsetY, "ss_halloween", "tutor_popup_0000");
		this.layerEffect.add(plaha);
		var tutor_image1 = this.add.image(this.midX + 25, 250 + 140 + offsetY, "ss_halloween", "tutor_pumpkins_0000");
		this.layerEffect.add(tutor_image1);
		var tutor_image2 = this.add.image(this.midX - 125, 250 + 110 + offsetY, "ss_halloween", "tutor_bomb_0000");
		this.layerEffect.add(tutor_image2);
		var tutor_image3 = this.add.image(this.midX + 125, 250 + 120 + offsetY, "ss_halloween", "tutor_miss_0000");
		this.layerEffect.add(tutor_image3);
		var txt = this.add.bitmapText(plaha.x, plaha.y, "Panton", "");
		txt.setMaxWidth(400);
		txt.setCenterAlign();
		txt.setFontSize(28);
		txt.setOrigin(.5);
		this.layerEffect.add(txt);
		var txt2 = this.add.bitmapText(plaha.x, 510 + offsetY, "Panton", "");
		txt2.setCenterAlign();
		txt2.setFontSize(24);
		txt2.setOrigin(.5);
		this.layerEffect.add(txt2);
		var txt3 = this.add.bitmapText(plaha.x, 150 + offsetY, "Panton", "");
		txt3.setCenterAlign();
		txt3.setFontSize(32);
		txt3.setOrigin(.5);
		this.layerEffect.add(txt3);
		this.textTutorial = txt;
		this.textContinue = txt2;
		this.textTutorStep = txt3;
		this.textTutorial.setText(MainGame.GAME_TEXT.shoot_pumpkins.toUpperCase());
		this.textContinue.setText(MainGame.GAME_TEXT.tap_continue.toUpperCase());
		this.textTutorStep.setText("1/2");
		this.tutor_image1 = tutor_image1;
		this.tutor_image2 = tutor_image2;
		this.tutor_image3 = tutor_image3;
		this.plaha = plaha;
		this.tutor_image2.visible = false;
		this.tutor_image3.visible = false
	}
	onTapTutorial() {
		if (this.isPaused) return;
		if (this.tutorialStep == 0) {
			this.textTutorStep.setText("2/2");
			this.textTutorial.setText(MainGame.GAME_TEXT.tutorial_pumpkin.toUpperCase());
			this.tutor_image1.visible = false;
			this.tutor_image2.visible = true;
			this.tutor_image3.visible = true;
			this.tutorialStep = 1
		} else if (this.tutorialStep == 1) {
			this.isGoTutorial = false;
			this.tutor_image1.destroy();
			this.tutor_image2.destroy();
			this.tutor_image3.destroy();
			this.textTutorial.destroy();
			this.textContinue.destroy();
			this.textTutorStep.destroy();
			this.plaha.destroy();
			this.startTimerHalloween()
		}
	}
	startTutorial() {
		this.time.delayedCall(500, this.tutorialScenario, [], this);
		this.isBeforeStart = false;
		this.armReady = true;
		this.buttonStart.visible = false;
		this.arm_weapon.visible = true;
		this.aim_target.visible = true;
		if (MainGame.isAPI) MainGame.API_POKI.gameplayStart()
	}
	checkTutorial() {
		if (this.tutorialStep == 1) {
			if (!this.doska1.info.live) {
				this.time.delayedCall(500, this.tutorialScenario, [], this);
				this.plahaTutorial.visible = false;
				this.textTutorial.visible = false;
				this.tutor_mobile.visible = false
			}
		} else if (this.tutorialStep == 2) {
			if (!this.doska2.info.live && !this.doska3.info.live && !this.doska4.info.live && !this.doska5.info.live) {
				this.textTutorial.visible = false;
				this.plahaTutorial.visible = false
			}
		}
	}
	tutorialScenario() {
		this.tutorialStep++;
		if (this.tutorialStep == 1) {
			this.textTutorial.setText(MainGame.GAME_TEXT.text_move_cursor);
			this.plahaTutorial.visible = true;
			this.textTutorial.visible = true;
			this.doska1.visible = true;
			if (!MainGame.isDesktop) this.tutor_mobile.visible = true
		} else if (this.tutorialStep == 2) {
			this.textTutorial.setText(MainGame.GAME_TEXT.text_good_job);
			this.plahaTutorial.visible = true;
			this.textTutorial.visible = true;
			this.doska2.visible = true;
			this.doska3.visible = true;
			this.doska4.visible = true;
			this.doska5.visible = true;
			this.doska2.info.live = true;
			this.doska3.info.live = true;
			this.doska4.info.live = true;
			this.doska5.info.live = true;
			this.tweens.add({
				targets: this.doska2,
				x: this.doska2.x - 80,
				ease: "Linear",
				duration: 1e3,
				yoyo: true,
				repeat: -1
			});
			this.tweens.add({
				targets: this.doska3,
				x: this.doska3.x + 80,
				ease: "Linear",
				duration: 1e3,
				yoyo: true,
				repeat: -1
			});
			this.tweens.add({
				targets: this.doska4,
				x: this.doska4.x - 80,
				ease: "Linear",
				duration: 1e3,
				yoyo: true,
				repeat: -1
			});
			this.tweens.add({
				targets: this.doska5,
				x: this.doska5.x + 80,
				ease: "Linear",
				duration: 1e3,
				yoyo: true,
				repeat: -1
			})
		}
	}
	addDoska(vX, vY) {
		var posX = vX * 80;
		var obj = this.add.sprite(posX, vY - 30, "ss_shooter");
		obj.play("target_idle");
		obj.setOrigin(.5, .75);
		this.layerMob.add(obj);
		obj.hero = obj;
		obj.info = {
			health: 2,
			live: true
		};
		obj.isAlive = function() {
			return obj.info.live
		};
		obj.damage = function() {
			obj.info.health--;
			if (obj.info.health <= 0) {
				obj.info.live = false;
				obj.play("target_down");
				MainGame.state.increaseFrags();
				MainGame.state.tweens.killTweensOf(obj)
			}
		};
		this.arTargets.push(obj);
		this.countEnemies = this.arTargets.length;
		return obj
	}
	updateBots() {
		var target;
		for (var i = 0; i < this.countEnemies; i++) {
			target = this.arTargets[i];
			target.update()
		}
	}
	pauseBots() {
		if (this.isGoTutorial) return;
		for (var i = 0; i < this.countEnemies; i++) {
			this.arTargets[i].pauseAnimation()
		}
		this.old_timeScale = this.arm_weapon.state.timeScale;
		this.arm_weapon.state.timeScale = 0;
		if (this.timerReloading) this.timerReloading.paused = true
	}
	resumeBots() {
		if (this.isGoTutorial) return;
		for (var i = 0; i < this.countEnemies; i++) {
			this.arTargets[i].resumeAnimation()
		}
		this.arm_weapon.state.timeScale = this.old_timeScale || 1;
		if (this.timerReloading) this.timerReloading.paused = false
	}
	clickBtnPause() {
		if (this.isLevelFinished) return;
		MainGame.Sfx.update("music", this.buttonMuteMusic.icon, this.buttonMuteMusic.text);
		MainGame.Sfx.update("sound", this.buttonMuteSound.icon, this.buttonMuteSound.text);
		this.isPaused = true;
		this.layerPauseWindowMain.visible = true;
		this.layerPauseWindow.visible = true;
		game.canvas.style.cursor = "default";
		this.physics.pause();
		if (this.timerHalloween) this.timerHalloween.paused = true;
		this.pauseBots();
		if (MainGame.isAPI) MainGame.API_POKI.gameplayStop()
	}
	clickBtnReload() {
		if (this.isReloading || this.isLevelFinished || this.isPaused || !this.armReady) return;
		this.updateReloading(true)
	}
	showAdsForDiamondsX2() {
		MainGame.clickReward("fire_x2");
		this.buttonIncomeX2.setEnable(false)
	}
	initSystemMessage() {
		this.textSystemContainer = this.add.container();
		this.textSystemContainer.x = this.midX;
		this.textSystemContainer.y = MainGame.world.centerY - 100;
		var txt = this.add.bitmapText(0, 0, "Panton", "");
		txt.setDropShadow(3, 3, 0, 1);
		txt.setOrigin(.5);
		txt.setMaxWidth(550);
		txt.setCenterAlign();
		txt.setFontSize(34);
		this.textSystemContainer.add(txt);
		this.textSystemContainer.setDepth(this.DEPTH_systemtext);
		this.textSystemContainer.visible = false;
		this.textSystem = txt
	}
	showSystemMessage(vText) {
		this.textSystemContainer.visible = true;
		this.textSystem.setText(vText);
		this.textSystemContainer.alpha = .2;
		this.textSystemContainer.y = this.midY - 20;
		this.textSystemContainer.setScale(.8);
		this.tweens.killTweensOf(this.textSystemContainer);
		this.tweens.add({
			targets: this.textSystemContainer,
			alpha: 1,
			ease: "Linear",
			duration: 150
		});
		this.tweens.add({
			targets: this.textSystemContainer,
			scaleX: 1,
			scaleY: 1,
			ease: "Linear",
			duration: 150
		});
		this.tweens.add({
			targets: this.textSystemContainer,
			alpha: 0,
			ease: "Linear",
			delay: 1500,
			duration: 200,
			onComplete: this.finishSystemTextTween
		});
		this.tweens.add({
			targets: this.textSystemContainer,
			y: this.textSystemContainer.y - 20,
			ease: "Linear",
			delay: 150,
			duration: 1200
		})
	}
	clickReplay() {
		this.scale.off("resize", this.updateResize, this);
		MainGame.fadeOutScene("UpdateHalloween", this)
	}
	clickRevive() {
		if (this.timerRevive) this.timerRevive.remove();
		this.reviveLevel()
	}
	showGameScreen() {
		MainGame.saveSaves();
		this.scale.off("resize", this.updateResize, this);
		if (MainGame.isAPI) MainGame.API_POKI.destroyAd();
		MainGame.fadeOutScene("Game", this)
	}
}
class Pumpkin extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "ss_halloween", "pumpkin1_0000");
		this.type = 1;
		this.scene = scene
	}
	fire(x, y, vType) {
		this.body.reset(x, y);
		var type = vType || Phaser.Math.Between(1, 6);
		if (type <= 7) {
			this.stop();
			this.setFrame("pumpkin" + type + "_0000");
			this.setOrigin(.5, .5)
		} else {
			this.play("bomb");
			this.setOrigin(.5, .65)
		}
		this.setActive(true);
		this.setVisible(true);
		this.setVelocity(Phaser.Math.Between(-20, 20) * 5, -550 - Phaser.Math.Between(1, 7) * 20);
		this.setAngularVelocity(Phaser.Math.Between(-20, 20) * 15);
		this.type = type
	}
	hide() {
		this.setActive(false);
		this.setVisible(false)
	}
	preUpdate(time, delta) {
		super.preUpdate(time, delta);
		if (this.y > 900) {
			if (this.type < 10) this.scene.updateAttemptsPumpkin();
			this.setActive(false);
			this.setVisible(false)
		}
	}
}
class Pumpkins extends Phaser.Physics.Arcade.Group {
	constructor(scene) {
		super(scene.physics.world, scene);
		this.createMultiple({
			quantity: 20,
			key: "ss_halloween",
			randomFrame: true,
			active: false,
			visible: false,
			classType: Pumpkin
		})
	}
	firePumpkin(x, y, type) {
		let bullet = this.getFirstDead(false);
		if (bullet) {
			bullet.fire(x, y, type)
		}
	}
}
class UpdateChristmas extends Phaser.Scene {
	constructor() {
		super({
			key: "UpdateChristmas",
			physics: {
				default: "arcade",
				arcade: {
					gravity: {
						y: 0
					},
					debug: false
				}
			}
		})
	}
	create() {
		MainGame.state = this;
		MainGame.stateName = "UpdateChristmas";
		this.initResize();
		this.midX = this.GAME_WIDTH / 2;
		this.midY = this.GAME_HEIGHT / 2;
		this.initSettingsGame();
		const back = this.add.image(this.midX, this.midY, "bg_eventC");
		this.layerRoads = this.add.container();
		this.layerMob = this.add.container();
		this.layerEffect = this.add.container();
		this.layerSpineArm = this.add.container();
		this.layerUI = this.add.container();
		this.layerText = this.add.container();
		this.layerMob.setDepth(this.DEPTH_layerMob);
		this.layerEffect.setDepth(this.DEPTH_layerEffect);
		this.layerSpineArm.setDepth(this.DEPTH_layerArm);
		this.layerUI.setDepth(this.DEPTH_layerUI);
		this.layerText.setDepth(this.DEPTH_layerText);
		this.initEffects();
		this.initSettingsEvent();
		this.initGUI_Event();
		this.initGUI();
		this.initComboTexts();
		this.initLevel();
		this.initWeapon();
		this.initPauseWindow();
		this.initFinishWindow2();
		this.initRewardWindow();
		this.initSystemMessage();
		this.updateResize();
		this.text_hp.setText(this.hpPlayerNow);
		this.text_level.setText(MainGame.GAME_TEXT.day.toUpperCase() + " " + MainGame.fireLevel);
		this.updateAmmoText();
		this.updateFragsText();
		this.input.keyboard.on("keydown", this.handleKey, this);
		this.isAllowShoot = true;
		MainGame.isFromFireMode = true;
		if (MainGame.firstGo) {
			this.input.once("pointerdown", this.playOnce, this)
		} else {
			MainGame.Sfx.play("music", "christmas")
		}
		this.initPiecesPumpkin();
		this.setLineDirection(1, true);
		this.setLineDirection(2, false);
		this.setLineDirection(3, true);
		if (MainGame.listEvents[1] == 0 && MainGame.isFirstChallenge) {
			this.initTutorialChristmas()
		} else {
			this.startTimerEvent()
		}
		MainGame.isFirstChallenge = false;
		if (MainGame.isAPI) MainGame.API_POKI.gameplayStart();
		if (MainGame.isAPI) MainGame.API_POKI.displayAd()
	}
	playOnce() {
		MainGame.firstGo = false;
		MainGame.Sfx.play("music", "shoot")
	}
	handleKey(e) {
		switch (e.code) {
			case "KeyR":
				this.clickBtnReload();
				break
		}
	}
	update() {
		if (this.isLevelFinished || this.isPaused) return;
		if (this.armReady && !this.isGameOver) this.updateArm();
		if (!this.isGoTutorial) {
			this.updateSpawnPumpkins()
		}
	}
	initResize() {
		this.GAME_WIDTH = MainGame.Config.DEFAULT_WIDTH;
		this.GAME_HEIGHT = MainGame.Config.DEFAULT_HEIGHT;
		var gameSize = this.scale.gameSize;
		var width = gameSize.width;
		var height = gameSize.height;
		if (window.innerHeight < MainGame.Config.MAX_HEIGHT) {
			height = window.innerHeight
		}
		this.parent = new Phaser.Structs.Size(width, height);
		this.sizer = new Phaser.Structs.Size(this.GAME_WIDTH, this.GAME_HEIGHT, Phaser.Structs.Size.FIT, this.parent);
		this.parent.setSize(width, height);
		this.sizer.setSize(width, height);
		this.scale.on("resize", this.updateResize, this)
	}
	updateResize() {
		var gameSize = this.scale.gameSize;
		var width = gameSize.width;
		var height = gameSize.height;
		if (window.innerHeight < MainGame.Config.MAX_HEIGHT) {
			height = window.innerHeight
		}
		this.parent.setSize(width, height);
		this.sizer.setSize(width, height);
		this.updateCamera()
	}
	updateCamera() {
		const camera = this.cameras.main;
		var deltaX = Math.ceil(this.parent.width - this.sizer.width) * .5;
		var deltaY = Math.ceil(this.parent.height - this.sizer.height) * .5;
		var sdvigY = 0;
		if (window.innerHeight < MainGame.Config.MAX_HEIGHT) {
			deltaY = Math.ceil(window.innerHeight - this.sizer.height) * .5;
			sdvigY = this.scale.gameSize.height - window.innerHeight
		}
		const scaleX = this.sizer.width / this.GAME_WIDTH;
		const scaleY = this.sizer.height / this.GAME_HEIGHT;
		const zoom = Math.max(scaleX, scaleY);
		const offsetY = deltaY / zoom;
		const offsetX = deltaX / zoom;
		this.deltaScreenY = deltaY;
		camera.setZoom(zoom);
		camera.centerOn(this.GAME_WIDTH / 2, this.GAME_HEIGHT / 2 + sdvigY);
		this.btnExit.x = 1024 - 64 + offsetX;
		if (this.btnExit.x > 1024 + 100) this.btnExit.x = 1024 + 100;
		this.text_level.x = this.btnExit.x - 60;
		this.btnReload.x = 110 - offsetX;
		if (this.btnReload.x < -100 + 30) this.btnReload.x = -100 + 30;
		this.text_bullets.x = this.btnReload.x;
		this.icon_frag.x = 80 - offsetX;
		if (this.icon_frag.x < -100) this.icon_frag.x = -100;
		this.text_frags.x = this.icon_frag.x + 90;
		this.btnExit.y = 50 - offsetY;
		if (this.btnExit.y < -100 + 50) this.btnExit.y = -100 + 50;
		this.text_level.y = this.btnExit.y - 10;
		this.icon_frag.y = this.btnExit.y + 5;
		this.text_frags.y = this.icon_frag.y;
		this.hpBarB.y = 600 + offsetY;
		if (this.hpBarB.y > 600 + 100) this.hpBarB.y = 600 + 100;
		this.hpBarT.y = this.hpBarB.y;
		this.text_hp.y = this.hpBarB.y - 7;
		this.btnReload.y = 520 + offsetY;
		if (this.btnReload.y > 520 + 100) this.btnReload.y = 520 + 100;
		this.text_bullets.y = this.btnReload.y + 95;
		this.textPoints.x = this.btnReload.x;
		this.textPointsText.x = this.btnReload.x;
		this.textTimer.x = this.btnReload.x;
		this.timerPlaha.x = this.btnReload.x;
		var posIconsX = 1024 - 59 + offsetX;
		if (posIconsX > 1024 + 100) posIconsX = 1024 + 100;
		this.icon_x1.x = posIconsX;
		this.icon_x2.x = posIconsX;
		this.icon_x3.x = posIconsX;
		var posPumpkinY = offsetY;
		if (posPumpkinY > 100) posPumpkinY = 100;
		this.textPointsText.y = 30 - posPumpkinY;
		this.textPoints.y = 70 - posPumpkinY;
		this.timerPlaha.y = 150 - posPumpkinY;
		this.textTimer.y = 148 - posPumpkinY
	}
	addCanvas(vLayer, vColor, vAlpha) {
		var canvas = this.add.image(this.midX, this.midY, "ss_shooter", "canvas_0000");
		canvas.tint = vColor;
		canvas.alpha = vAlpha;
		canvas.setScale(6);
		vLayer.add(canvas);
		return canvas
	}
	initSettingsGame() {
		MainGame.fireLevel = MainGame.fireLevel || 1;
		this.arOffsetWeapon = [{
			x: 140,
			y: 320,
			fx: 50,
			fy: 50,
			dmg: 30,
			ammo: 8,
			firerate: 500
		}, {
			x: 140,
			y: 320,
			fx: 45,
			fy: 45,
			dmg: 35,
			ammo: 17,
			firerate: 500
		}, {
			x: 140,
			y: 320,
			fx: 35,
			fy: 30,
			dmg: 40,
			ammo: 15,
			firerate: 400
		}, {
			x: 140,
			y: 320,
			fx: 20,
			fy: 20,
			dmg: 60,
			ammo: 9,
			firerate: 600
		}, {
			x: 140,
			y: 320,
			fx: -10,
			fy: -8,
			dmg: 80,
			ammo: 6,
			firerate: 700
		}, {
			x: 150,
			y: 320,
			fx: -10,
			fy: 5,
			dmg: 20,
			ammo: 30,
			firerate: 200
		}, {
			x: 200,
			y: 365,
			fx: 20,
			fy: 20,
			dmg: 35,
			ammo: 18,
			firerate: 300
		}, {
			x: 200,
			y: 365,
			fx: -10,
			fy: 0,
			dmg: 100,
			ammo: 2,
			firerate: 1e3
		}, {
			x: 200,
			y: 365,
			fx: 25,
			fy: 35,
			dmg: 50,
			ammo: 25,
			firerate: 300
		}, {
			x: 200,
			y: 365,
			fx: 20,
			fy: 20,
			dmg: 60,
			ammo: 30,
			firerate: 300
		}, {
			x: 200,
			y: 365,
			fx: -30,
			fy: -20,
			dmg: 150,
			ammo: 6,
			firerate: 600
		}, {
			x: 220,
			y: 365,
			fx: -30,
			fy: -25,
			dmg: 200,
			ammo: 6,
			firerate: 700
		}, {
			x: 210,
			y: 370,
			fx: -15,
			fy: -5,
			dmg: 80,
			ammo: 30,
			firerate: 330
		}, {
			x: 210,
			y: 365,
			fx: -5,
			fy: 5,
			dmg: 100,
			ammo: 30,
			firerate: 330
		}, {
			x: 210,
			y: 370,
			fx: -10,
			fy: 5,
			dmg: 80,
			ammo: 35,
			firerate: 330
		}, {
			x: 210,
			y: 365,
			fx: -5,
			fy: 25,
			dmg: 90,
			ammo: 30,
			firerate: 330
		}, {
			x: 195,
			y: 355,
			fx: 50,
			fy: 65,
			dmg: 60,
			ammo: 50,
			firerate: 200
		}, {
			x: 200,
			y: 365,
			fx: 15,
			fy: -5,
			dmg: 450,
			ammo: 9,
			firerate: 800
		}, {
			x: 200,
			y: 365,
			fx: -10,
			fy: -5,
			dmg: 500,
			ammo: 6,
			firerate: 800
		}, {
			x: 140,
			y: 320,
			fx: 30,
			fy: 30,
			dmg: 160,
			ammo: 12,
			firerate: 300
		}, {
			x: 140,
			y: 320,
			fx: -10,
			fy: -10,
			dmg: 250,
			ammo: 8,
			firerate: 450
		}, {
			x: 220,
			y: 365,
			fx: -25,
			fy: -20,
			dmg: 450,
			ammo: 7,
			firerate: 600
		}, {
			x: 210,
			y: 365,
			fx: -40,
			fy: -10,
			dmg: 200,
			ammo: 64,
			firerate: 400
		}, {
			x: 210,
			y: 365,
			fx: 45,
			fy: 45,
			dmg: 200,
			ammo: 25,
			firerate: 300
		}, {
			x: 210,
			y: 365,
			fx: -10,
			fy: -10,
			dmg: 600,
			ammo: 6,
			firerate: 600
		}, {
			x: 200,
			y: 365,
			fx: -40,
			fy: -20,
			dmg: 600,
			ammo: 5,
			firerate: 550
		}, {
			x: 220,
			y: 365,
			fx: -5,
			fy: -5,
			dmg: 100,
			ammo: 100,
			firerate: 150
		}, {
			x: 210,
			y: 365,
			fx: 35,
			fy: 40,
			dmg: 250,
			ammo: 50,
			firerate: 250
		}, {
			x: 230,
			y: 365,
			fx: -5,
			fy: -5,
			dmg: 500,
			ammo: 7,
			firerate: 500
		}, {
			x: 230,
			y: 365,
			fx: -40,
			fy: -40,
			dmg: 700,
			ammo: 7,
			firerate: 650
		}, {
			x: 230,
			y: 365,
			fx: 25,
			fy: 25,
			dmg: 450,
			ammo: 20,
			firerate: 500
		}, {
			x: 200,
			y: 340,
			fx: 50,
			fy: 20,
			dmg: 250,
			ammo: 22,
			firerate: 200
		}, {
			x: 140,
			y: 320,
			fx: 0,
			fy: -5,
			dmg: 300,
			ammo: 12,
			firerate: 400
		}, {
			x: 210,
			y: 365,
			fx: 35,
			fy: 45,
			dmg: 300,
			ammo: 30,
			firerate: 300
		}, {
			x: 210,
			y: 365,
			fx: 25,
			fy: 30,
			dmg: 300,
			ammo: 25,
			firerate: 300
		}, {
			x: 210,
			y: 365,
			fx: 15,
			fy: 25,
			dmg: 300,
			ammo: 30,
			firerate: 300
		}, {
			x: 210,
			y: 365,
			fx: -5,
			fy: 10,
			dmg: 300,
			ammo: 30,
			firerate: 300
		}, {
			x: 220,
			y: 340,
			fx: -35,
			fy: -30,
			dmg: 400,
			ammo: 7,
			firerate: 500
		}, {
			x: 220,
			y: 340,
			fx: -10,
			fy: -15,
			dmg: 650,
			ammo: 8,
			firerate: 500
		}, {
			x: 210,
			y: 365,
			fx: -35,
			fy: -40,
			dmg: 700,
			ammo: 9,
			firerate: 500
		}, {
			x: 210,
			y: 365,
			fx: 0,
			fy: -5,
			dmg: 600,
			ammo: 30,
			firerate: 300
		}, {
			x: 140,
			y: 320,
			fx: 25,
			fy: 25,
			dmg: 350,
			ammo: 12,
			firerate: 300
		}, {
			x: 140,
			y: 320,
			fx: 10,
			fy: 20,
			dmg: 500,
			ammo: 22,
			firerate: 350
		}, {
			x: 200,
			y: 365,
			fx: 0,
			fy: -30,
			dmg: 900,
			ammo: 8,
			firerate: 600
		}, {
			x: 210,
			y: 365,
			fx: 5,
			fy: 15,
			dmg: 700,
			ammo: 30,
			firerate: 300
		}, {
			x: 220,
			y: 365,
			fx: -20,
			fy: -10,
			dmg: 700,
			ammo: 30,
			firerate: 400
		}, {
			x: 220,
			y: 365,
			fx: 0,
			fy: 0,
			dmg: 700,
			ammo: 30,
			firerate: 400
		}, {
			x: 220,
			y: 365,
			fx: -20,
			fy: 0,
			dmg: 800,
			ammo: 15,
			firerate: 400
		}, {
			x: 230,
			y: 365,
			fx: -35,
			fy: -30,
			dmg: 1e3,
			ammo: 15,
			firerate: 400
		}, {
			x: 220,
			y: 365,
			fx: -20,
			fy: -30,
			dmg: 1200,
			ammo: 20,
			firerate: 400
		}];
		this.scaleWindow1 = .7;
		this.scaleWindow2 = .85;
		this.MAX_TOP = 50;
		this.MAX_BOTTOM = 650;
		this.DEPTH_layerMob = .21;
		this.DEPTH_layerEffect = .22;
		this.DEPTH_layerArm = .23;
		this.DEPTH_layerUI = .24;
		this.DEPTH_layerText = .25;
		this.DEPTH_layerFinish = .26;
		this.DEPTH_systemtext = .6;
		this.aimScale = 2;
		this.isBeforeStart = false;
		this.suggestRevive = true;
		this.isLevelFinished = false;
		this.isGameOver = false;
		this.isPaused = false;
		this.hpPlayerMax = 100;
		this.hpPlayerNow = this.hpPlayerMax;
		this.countFrags = 0;
		this.isGoTutorial = false;
		this.armReady = false;
		this.isInputPressed = false;
		this.isReloading = false;
		this.WEAPON_WEIGHT = .21;
		this.countEnemies = 0;
		this.arTargets = [];
		this.posInputDown = {
			x: this.midX,
			y: this.midY
		};
		this.lastPos = {
			x: this.midX,
			y: this.midY
		};
		this.posCursor = {
			x: this.midX,
			y: this.midY
		};
		this.posWeapon = {
			x: 0,
			y: 0
		};
		this.offsetWeapon = {
			x: 0,
			y: 0
		};
		this.offsetFire = {
			x: 0,
			y: 0
		};
		this.deltaScreenY = 0;
		this.maxPosX = 80 * 13;
		this.minPosX = 0;
		this.arrRespawns1 = [4, 5, 8, 9];
		this.arrRespawns2 = [2, 3, 6, 7, 10, 11];
		this.TIME_RELOADING = 1800;
		this.needToKill = 7 + Math.floor(MainGame.fireLevel / 8);
		if (MainGame.fireLevel == 1) this.needToKill = 5;
		var settingsWeapon = this.arOffsetWeapon[MainGame.selectedGun - 1];
		this.FIRERATE = settingsWeapon.firerate;
		this.damageWeapons = settingsWeapon.dmg;
		this.maxAmmo = settingsWeapon.ammo;
		this.countBots = this.needToKill;
		this.amountAmmo = this.maxAmmo
	}
	addText(vLayer, vX, vY, vText, vSize, vIsUpperCase) {
		vX -= 1;
		vY -= 1;
		try {
			vText = vText.toString()
		} catch (e) {
			console.log(e)
		}
		if (vText && vIsUpperCase) vText = vText.toUpperCase();
		var txt = this.add.bitmapText(vX, vY, "Panton", vText);
		txt.setFontSize(vSize);
		txt.setOrigin(.5);
		if (vLayer) vLayer.add(txt);
		return txt
	}
	initEffects() {
		this.anims.create({
			key: "flash_big",
			frames: this.anims.generateFrameNames("ss_shooter", {
				prefix: "flash_big_",
				end: 5,
				zeroPad: 4
			}),
			hideOnComplete: true
		});
		this.anims.create({
			key: "magic_1",
			frames: this.anims.generateFrameNames("ss_ui", {
				prefix: "magic_1_",
				end: 14,
				zeroPad: 4
			}),
			hideOnComplete: false,
			repeat: -1
		});
		this.anims.create({
			key: "flash",
			frames: this.anims.generateFrameNames("ss_shooter", {
				prefix: "flash_",
				end: 7,
				zeroPad: 4
			}),
			hideOnComplete: true
		});
		this.anims.create({
			key: "effect_kick",
			frames: this.anims.generateFrameNames("ss_shooter", {
				prefix: "effect_kick_",
				end: 7,
				zeroPad: 4
			}),
			hideOnComplete: true
		});
		this.anims.create({
			key: "explosion_snowman",
			frames: this.anims.generateFrameNames("ss_christmas", {
				prefix: "explosion_snowman_",
				end: 7,
				zeroPad: 4
			}),
			hideOnComplete: true
		});
		this.anims.create({
			key: "explosion_bomb",
			frames: this.anims.generateFrameNames("ss_christmas", {
				prefix: "explosion_bomb_",
				end: 19,
				zeroPad: 4
			}),
			hideOnComplete: true
		});
		this.anims.create({
			key: "bomb",
			frames: this.anims.generateFrameNames("ss_christmas", {
				prefix: "bomb_",
				end: 7,
				zeroPad: 4
			}),
			hideOnComplete: false,
			repeat: -1
		});
		this.anims.create({
			key: "target_idle",
			frames: this.anims.generateFrameNames("ss_shooter", {
				prefix: "target_idle_",
				end: 0,
				zeroPad: 4
			}),
			hideOnComplete: false
		});
		this.anims.create({
			key: "target_down",
			frames: this.anims.generateFrameNames("ss_shooter", {
				prefix: "target_down_",
				end: 11,
				zeroPad: 4
			}),
			hideOnComplete: false
		})
	}
	initPauseWindow() {
		this.layerPauseWindowMain = this.add.container();
		this.layerPauseWindow = this.add.container();
		this.layerPauseWindowMain.setDepth(this.DEPTH_layerFinish);
		this.layerPauseWindow.setDepth(this.DEPTH_layerFinish);
		this.layerPauseWindow.x = this.midX;
		this.layerPauseWindow.y = this.midY;
		var fon_merge = this.add.image(this.midX, this.midY, "ss_ui", "bg_connect2_0000");
		fon_merge.setScale(2);
		this.layerPauseWindowMain.add(fon_merge);
		var popup_drop = this.add.image(0, 0, "ss_ui", "popup_drop_0000");
		popup_drop.setScale(2);
		this.layerPauseWindow.add(popup_drop);
		var posX = 0;
		var posY = -95;
		var buttonResume = new ButtonText(0, posY, "ss_ui", "btn_buy2_0000", this.clickBtnResume, this, MainGame.GAME_TEXT.resume);
		buttonResume.text.setFontSize(24);
		buttonResume.text.y = -5;
		this.layerPauseWindow.add(buttonResume);
		MainGame.updateTextWidth(buttonResume.text, 140);
		var buttonMuteMusic = new ButtonText(0, buttonResume.y + 85, "ss_ui", "btn_buy_0000", this.clickMuteMusic, this, MainGame.GAME_TEXT.music_on);
		buttonMuteMusic.text.setFontSize(24);
		buttonMuteMusic.text.x = 20;
		buttonMuteMusic.text.y = -5;
		this.layerPauseWindow.add(buttonMuteMusic);
		MainGame.updateTextWidth(buttonMuteMusic.text, 140);
		var icon_music = this.add.image(-85, -5, "ss_ui", "btn_music_0000");
		buttonMuteMusic.add(icon_music);
		this.buttonMuteMusic = buttonMuteMusic;
		this.buttonMuteMusic.icon = icon_music;
		var buttonMuteSound = new ButtonText(0, buttonMuteMusic.y + 80, "ss_ui", "btn_buy_0000", this.clickMuteSound, this, MainGame.GAME_TEXT.sound_on);
		buttonMuteSound.text.setFontSize(24);
		buttonMuteSound.text.x = 20;
		buttonMuteSound.text.y = -5;
		this.layerPauseWindow.add(buttonMuteSound);
		MainGame.updateTextWidth(buttonMuteSound.text, 140);
		var buttonHome = new ButtonText(0, buttonMuteSound.y + 80, "ss_ui", "btn_buy_0000", this.showGameScreen, this, MainGame.GAME_TEXT.home);
		buttonHome.text.setFontSize(24);
		buttonHome.text.y = -5;
		this.layerPauseWindow.add(buttonHome);
		MainGame.updateTextWidth(buttonHome.text, 140);
		var icon_sound = this.add.image(-85, -5, "ss_ui", "btn_sound_0000");
		buttonMuteSound.add(icon_sound);
		this.buttonMuteSound = buttonMuteSound;
		this.buttonMuteSound.icon = icon_sound;
		var text_title = this.addText(this.layerPauseWindow, 0, -185, MainGame.GAME_TEXT.paused, 34, true);
		MainGame.updateTextWidth(text_title, 380);
		this.layerPauseWindow.setScale(this.scaleWindow2);
		this.layerPauseWindowMain.visible = false;
		this.layerPauseWindow.visible = false;
		popup_drop.setInteractive();
		fon_merge.setInteractive();
		fon_merge.on("pointerup", this.clickBtnResume, this);
		this.buttonPauseHome = buttonHome
	}
	clickMuteSound() {
		MainGame.Sfx.manage("sound", "switch", this, this.buttonMuteSound.icon, this.buttonMuteSound.text)
	}
	clickMuteMusic() {
		MainGame.Sfx.manage("music", "switch", this, this.buttonMuteMusic.icon, this.buttonMuteMusic.text)
	}
	clickBtnResume() {
		this.isPaused = false;
		this.physics.resume();
		if (this.timerHalloween) this.timerHalloween.paused = false;
		this.layerPauseWindowMain.visible = false;
		this.layerPauseWindow.visible = false;
		this.resumeBots();
		if (MainGame.isAPI) MainGame.API_POKI.gameplayStart()
	}
	initFinishWindow2() {
		this.layerFinishWindowMain = this.add.container();
		this.layerFinishWindow = this.add.container();
		this.layerFinishWindowMain.setDepth(this.DEPTH_layerFinish);
		this.layerFinishWindow.setDepth(this.DEPTH_layerFinish);
		this.layerFinishWindow.x = this.midX;
		this.layerFinishWindow.y = this.midY;
		var fon_merge = this.add.image(this.midX, this.midY, "ss_ui", "bg_connect2_0000");
		fon_merge.setScale(2);
		this.layerFinishWindowMain.add(fon_merge);
		var popup_drop = this.add.image(0, 0, "ss_ui", "popup_unlocked_0000");
		popup_drop.setScale(2);
		this.layerFinishWindow.add(popup_drop);
		var posX = 0;
		var posY = 0;
		var icon_flash = this.add.image(posX, posY + 50, "ss_ui", "flash_select_gun_0000");
		this.layerFinishWindow.add(icon_flash);
		var icon_pumpkin7 = this.add.image(posX - 240, posY - 230, "ss_christmas", "snowman7_0000");
		this.layerFinishWindow.add(icon_pumpkin7);
		var icon_btn_shop1 = this.add.image(posX - 230, posY - 165, "ss_christmas", "btn_shop1_0000");
		this.layerFinishWindow.add(icon_btn_shop1);
		var icon_diamond = this.add.image(posX - 270, posY - 155, "ss_christmas", "icon_diamond_0000");
		icon_diamond.angle = -15;
		this.layerFinishWindow.add(icon_diamond);
		this.pointsBarB = this.add.image(posX, -85, "ss_christmas", "preloader_background_0000");
		this.pointsBarT = this.add.image(posX, -85, "ss_christmas", "preloader_bar_0000");
		this.pointsBarT_crop = new Phaser.Geom.Rectangle(0, 0, 0, this.pointsBarT.height);
		this.pointsBarT.setCrop(this.pointsBarT_crop);
		this.layerFinishWindow.add(this.pointsBarB);
		this.layerFinishWindow.add(this.pointsBarT);
		var icon_event = this.add.image(posX + 205, -115, "ss_christmas", "icon_event_christmas2_0000");
		this.layerFinishWindow.add(icon_event);
		var buttonReplay = new Button(0, 40, "ss_ui", "btn_replay_0000", this.clickReplay, this);
		this.layerFinishWindow.add(buttonReplay);
		var buttonHome = new ButtonText(0, 220, "ss_ui", "btn_buy_0000", this.closeFinishWindow, this, MainGame.GAME_TEXT.home);
		buttonHome.text.setFontSize(26);
		this.layerFinishWindow.add(buttonHome);
		MainGame.updateTextWidth(buttonHome.text, 200);
		buttonHome.text.y = -4;
		var buttonGetReward = new ButtonText(0, 220, "ss_ui", "btn_buy_0000", this.clickGetReward, this, MainGame.GAME_TEXT.get_reward);
		buttonGetReward.text.setFontSize(26);
		this.layerFinishWindow.add(buttonGetReward);
		MainGame.updateTextWidth(buttonGetReward.text, 220);
		buttonGetReward.text.y = -4;
		var text_earning = this.addText(this.layerFinishWindow, posX - 230, posY - 187, MainGame.GAME_TEXT.earning, 22, true);
		var text_crystals = this.addText(this.layerFinishWindow, posX - 225, posY - 155, "15", 32, true);
		var text_points1 = this.addText(this.layerFinishWindow, posX, posY - 187, MainGame.GAME_TEXT.points, 28, true);
		text_points1.setTint(16773888);
		var text_points2 = this.addText(this.layerFinishWindow, posX, posY - 145, "8025", 50, true);
		text_points2.setTint(16773888);
		var text_pointBegin = this.addText(this.layerFinishWindow, posX - 225, posY - 55, "0", 26, true);
		text_pointBegin.setOrigin(0, .5);
		var text_pointEnd = this.addText(this.layerFinishWindow, posX + 225, posY - 55, "10000", 26, true);
		text_pointEnd.setOrigin(1, .5);
		var text_stage1_1 = this.addText(this.layerFinishWindow, posX, posY + 125, MainGame.GAME_TEXT.no_give_up, 22, true);
		var text_stage1_2 = this.addText(this.layerFinishWindow, posX, posY + 125 + 27, MainGame.GAME_TEXT.try_again, 22, true);
		var text_stage2_1 = this.addText(this.layerFinishWindow, posX, posY - 5, MainGame.GAME_TEXT.congratulations, 44, true);
		var text_stage2_2 = this.addText(this.layerFinishWindow, posX, posY + 85, MainGame.GAME_TEXT.you_passed, 30, true);
		var text_stage2_3 = this.addText(this.layerFinishWindow, posX, posY + 85 + 34, MainGame.GAME_TEXT.christmas_ch, 30, true);
		var text_stage3_1 = this.addText(this.layerFinishWindow, posX, posY + 125, MainGame.GAME_TEXT.try_again, 22, true);
		this.buttonReplay = buttonReplay;
		this.buttonHome = buttonHome;
		this.buttonGetReward = buttonGetReward;
		this.icon_flash = icon_flash;
		this.text_stage1_1 = text_stage1_1;
		this.text_stage1_2 = text_stage1_2;
		this.text_stage2_1 = text_stage2_1;
		this.text_stage2_2 = text_stage2_2;
		this.text_stage2_3 = text_stage2_3;
		this.text_stage3_1 = text_stage3_1;
		this.text_crystals = text_crystals;
		this.text_points2 = text_points2;
		this.text_pointEnd = text_pointEnd;
		this.layerFinishWindowMain.visible = false;
		this.layerFinishWindow.visible = false
	}
	initRewardWindow() {
		this.layerRewardWindowMain = this.add.container();
		this.layerRewardWindow = this.add.container();
		this.layerRewardWindowMain.setDepth(this.DEPTH_layerFinish);
		this.layerRewardWindow.setDepth(this.DEPTH_layerFinish);
		this.layerRewardWindow.x = this.midX;
		this.layerRewardWindow.y = this.midY;
		var fon_merge = this.add.image(this.midX, this.midY, "ss_ui", "bg_connect2_0000");
		fon_merge.setScale(2);
		this.layerRewardWindowMain.add(fon_merge);
		var popup_drop = this.add.image(0, 0, "ss_ui", "popup_drop_0000");
		popup_drop.setScale(2);
		this.layerRewardWindow.add(popup_drop);
		var effect = this.add.sprite(0, -10, "ss_ui");
		effect.play("magic_1");
		effect.setScale(2);
		this.layerRewardWindow.add(effect);
		var posX = 0;
		var posY = 0;
		var icon_hatEvent = this.add.image(posX, posY - 15, "ss_christmas", "icon_hat20_0000");
		this.layerRewardWindow.add(icon_hatEvent);
		var buttonGet = new ButtonText(0, 150, "ss_ui", "btn_buy_0000", this.clickGetPumpkin, this, MainGame.GAME_TEXT.get);
		buttonGet.text.setFontSize(26);
		this.layerRewardWindow.add(buttonGet);
		MainGame.updateTextWidth(buttonGet.text, 220);
		buttonGet.text.y = -4;
		var text1 = this.addText(this.layerRewardWindow, 0, -185, MainGame.GAME_TEXT.reward, 30, true);
		MainGame.updateTextWidth(text1, 380);
		this.layerRewardWindowMain.visible = false;
		this.layerRewardWindow.visible = false
	}
	clickGetPumpkin() {
		this.showGameScreen(true)
	}
	clickGetReward() {
		this.layerFinishWindowMain.visible = false;
		this.layerFinishWindow.visible = false;
		this.layerRewardWindowMain.visible = true;
		this.layerRewardWindow.visible = true;
		this.layerRewardWindow.setScale(this.scaleWindow1);
		this.tweens.add({
			targets: this.layerRewardWindow,
			scaleX: this.scaleWindow2,
			scaleY: this.scaleWindow2,
			ease: Phaser.Math.Easing.Back.Out,
			duration: 400
		})
	}
	updatePointsBar(progress) {
		var originalWidth = this.pointsBarT.width;
		var width = originalWidth * progress;
		this.pointsBarT_crop.width = width;
		this.pointsBarT.setCrop(this.pointsBarT_crop)
	}
	showFinishWindow2(vStage) {
		this.isLevelFinished = true;
		game.canvas.style.cursor = "default";
		this.layerFinishWindowMain.visible = true;
		this.layerFinishWindow.visible = true;
		this.btnExit.visible = false;
		this.layerFinishWindow.setScale(this.scaleWindow1);
		this.tweens.add({
			targets: this.layerFinishWindow,
			scaleX: this.scaleWindow2,
			scaleY: this.scaleWindow2,
			ease: Phaser.Math.Easing.Back.Out,
			duration: 400
		});
		this.buttonReplay.visible = false;
		this.buttonHome.visible = false;
		this.buttonGetReward.visible = false;
		this.icon_flash.visible = false;
		this.text_stage1_1.visible = false;
		this.text_stage1_2.visible = false;
		this.text_stage2_1.visible = false;
		this.text_stage2_2.visible = false;
		this.text_stage2_3.visible = false;
		this.text_stage3_1.visible = false;
		this.text_crystals.setText(this.countCrystals);
		this.text_points2.setText(this.pointsPumpkin);
		this.text_pointEnd.setText(this.countNeedPoints);
		var progress = this.pointsPumpkin / this.countNeedPoints;
		if (progress > 1) progress = 1;
		this.updatePointsBar(progress);
		if (vStage == 1) {
			this.buttonReplay.visible = true;
			this.buttonHome.visible = true;
			this.text_stage1_1.visible = true;
			this.text_stage1_2.visible = true
		} else if (vStage == 2) {
			this.icon_flash.visible = true;
			this.buttonGetReward.visible = true;
			this.text_stage2_1.visible = true;
			this.text_stage2_2.visible = true;
			this.text_stage2_3.visible = true
		} else if (vStage == 3) {
			this.buttonReplay.visible = true;
			this.buttonHome.visible = true;
			this.text_stage3_1.visible = true
		}
		if (MainGame.isAPI) MainGame.API_POKI.gameplayStop();
		MainGame.api_google("EventChristmas", this.pointsPumpkin);
		MainGame.amount_diamonds += this.countCrystals;
		MainGame.saveSaves()
	}
	initFinishWindow() {
		var reward_diamond = this.add.image(posX, posY, "ss_ui", "reward_diamond_0000");
		this.layerFinishWindow.add(reward_diamond);
		var buttonIncomeX2 = new ButtonText(0, 90, "ss_ui", "btn_buy2_0000", this.showAdsForDiamondsX2, this, MainGame.GAME_TEXT.income_x2);
		buttonIncomeX2.text.setFontSize(26);
		buttonIncomeX2.text.x = -30;
		buttonIncomeX2.text.y = -4;
		this.layerFinishWindow.add(buttonIncomeX2);
		MainGame.updateTextWidth(buttonIncomeX2.text, 200);
		var icon_reward = this.add.image(75, -2, "ss_ui", "icon_reward_0000");
		buttonIncomeX2.add(icon_reward);
		var buttonGet = new ButtonText(0, 170, "ss_ui", "btn_buy_g2_0000", this.closeFinishWindow, this, MainGame.GAME_TEXT.get);
		buttonGet.text.setFontSize(26);
		this.layerFinishWindow.add(buttonGet);
		MainGame.updateTextWidth(buttonGet.text, 200);
		buttonGet.text.y = -4;
		this.rewardDiamonds = 10 + Math.floor(MainGame.fireLevel / 5);
		var text_diamonds = this.addText(this.layerFinishWindow, posX + 30, posY + 30, this.rewardDiamonds, 60, true);
		text_diamonds.setDropShadow(3, 3, 0, 1);
		var buttonHome = new ButtonText(0, 170, "ss_ui", "btn_buy_g2_0000", this.closeFinishWindow, this, MainGame.GAME_TEXT.home);
		buttonHome.text.setFontSize(26);
		this.layerFinishWindow.add(buttonHome);
		MainGame.updateTextWidth(buttonHome.text, 200);
		buttonHome.text.y = -4;
		buttonHome.setEnable(false);
		var buttonRevive = new ButtonText(0, -22, "ss_ui", "btn_revive_0000", this.clickRevive, this, MainGame.GAME_TEXT.revive);
		buttonRevive.text.setFontSize(30);
		buttonRevive.text.x = 0;
		buttonRevive.text.y = -10;
		this.layerFinishWindow.add(buttonRevive);
		MainGame.updateTextWidth(buttonRevive.text, 200);
		var buttonReplay = new Button(0, -22, "ss_ui", "btn_replay_0000", this.clickReplay, this);
		this.layerFinishWindow.add(buttonReplay);
		var icon_reward = this.add.image(0, 35, "ss_ui", "icon_reward_0000");
		buttonRevive.add(icon_reward);
		var text_no_give_up = this.addText(this.layerFinishWindow, 0, 85, MainGame.GAME_TEXT.no_give_up, 22, true);
		var text_try_merge_gun = this.addText(this.layerFinishWindow, 0, 115, MainGame.GAME_TEXT.try_merge_gun, 22, true);
		var text_count_revive = this.addText(buttonRevive, 0, -47, "", 40, true);
		var text_title = this.addText(this.layerFinishWindow, 0, -185, "", 34, true);
		MainGame.updateTextWidth(text_title, 380);
		var text_day = this.addText(this.layerFinishWindow, 0, -130, "", 30, true);
		text_day.setTint(16773888);
		text_day.setText(MainGame.GAME_TEXT.day.toUpperCase() + " " + MainGame.fireLevel);
		this.layerFinishWindow.setScale(this.scaleWindow2);
		this.layerFinishWindowMain.visible = false;
		this.layerFinishWindow.visible = false;
		this.buttonIncomeX2 = buttonIncomeX2;
		this.buttonGet = buttonGet;
		this.effect_diamonds = effect;
		this.reward_diamond = reward_diamond;
		this.text_diamonds = text_diamonds;
		this.title_finish = text_title;
		this.buttonHome = buttonHome;
		this.buttonRevive = buttonRevive;
		this.buttonReplay = buttonReplay;
		this.text_count_revive = text_count_revive;
		this.text_no_give_up = text_no_give_up;
		this.text_try_merge_gun = text_try_merge_gun
	}
	closeFinishWindow() {
		this.showGameScreen(true)
	}
	initGUI() {
		this.layerRed = this.addCanvas(this.layerUI, 8126464, .6);
		this.layerRed.alpha = 0;
		var btnExit = new Button(1024 - 64, 50, "ss_shooter", "btn_pause_0000", this.clickBtnPause, this);
		this.layerUI.add(btnExit);
		var btnReload = new Button(80 + 30, 520, "ss_shooter", "btn_reload_0000", this.clickBtnReload, this);
		this.layerUI.add(btnReload);
		var aim_target = this.add.image(this.posCursor.x, this.posCursor.y, "ss_shooter", "crosshair2_0000");
		this.layerUI.add(aim_target);
		var aim_reloading = this.add.image(this.posCursor.x, this.posCursor.y, "ss_shooter", "crosshair4_0000");
		this.layerUI.add(aim_reloading);
		aim_reloading.visible = false;
		this.tweens.add({
			targets: aim_reloading,
			angle: 360,
			ease: Phaser.Math.Easing.Linear,
			duration: 800,
			repeat: -1
		});
		var icon_frag = this.add.image(80, 55, "ss_shooter", "icon_frag_0000");
		this.layerUI.add(icon_frag);
		var pos = {
			x: this.midX,
			y: 600
		};
		this.hpBarB = this.add.image(pos.x, pos.y, "ss_shooter", "hp_bar1_0000");
		this.hpBarT = this.add.image(pos.x, pos.y, "ss_shooter", "hp_bar2_0000");
		this.hpBarT_crop = new Phaser.Geom.Rectangle(0, 0, this.hpBarT.width, this.hpBarT.height);
		this.hpBarT.setCrop(this.hpBarT_crop);
		this.layerUI.add(this.hpBarB);
		this.layerUI.add(this.hpBarT);
		var text_hp = this.addText(this.layerText, pos.x - 167, pos.y - 7, "", 30, true);
		text_hp.setOrigin(0, .5);
		text_hp.setTint(2286098);
		var text_level = this.addText(this.layerText, btnExit.x - 60, 40, "", 32, true);
		text_level.setOrigin(1, .5);
		var text_frags = this.addText(this.layerText, icon_frag.x + 90, icon_frag.y, "10/10", 32, true);
		var text_bullets = this.addText(this.layerText, btnReload.x, btnReload.y + 95, "", 32, true);
		this.btnReload = btnReload;
		this.btnExit = btnExit;
		this.icon_frag = icon_frag;
		this.aim_target = aim_target;
		this.aim_reloading = aim_reloading;
		this.text_hp = text_hp;
		this.text_level = text_level;
		this.text_frags = text_frags;
		this.text_bullets = text_bullets;
		this.icon_frag.visible = false;
		this.text_frags.visible = false;
		this.text_level.visible = false;
		this.text_hp.visible = false;
		this.hpBarB.visible = false;
		this.hpBarT.visible = false
	}
	initGUI_Event() {
		var posX = 1024 - 59;
		var icon_x1 = this.add.image(posX, 150 + 75 * 0, "ss_christmas", "icon_x_0000");
		var icon_x2 = this.add.image(posX, 150 + 75 * 1, "ss_christmas", "icon_x_0000");
		var icon_x3 = this.add.image(posX, 150 + 75 * 2, "ss_christmas", "icon_x_0000");
		this.layerUI.add(icon_x1);
		this.layerUI.add(icon_x2);
		this.layerUI.add(icon_x3);
		var timer_plaha = this.add.image(80 + 30, 150, "ss_christmas", "timer_0000");
		this.layerUI.add(timer_plaha);
		var text_points1 = this.addText(this.layerText, 80 + 30, 30, MainGame.GAME_TEXT.points, 28, true);
		var text_points2 = this.addText(this.layerText, 80 + 30, 30 + 40, "10055", 52, true);
		var text_timer = this.addText(this.layerText, timer_plaha.x, timer_plaha.y - 2, "00:59", 46, true);
		this.textPointsText = text_points1;
		this.textPoints = text_points2;
		this.textTimer = text_timer;
		this.icon_x1 = icon_x1;
		this.icon_x2 = icon_x2;
		this.icon_x3 = icon_x3;
		this.timerPlaha = timer_plaha;
		this.textPoints.setText(this.pointsPumpkin);
		var timeStr = MainGame.secToHHMMSS(this.timerCount);
		this.textTimer.setText(timeStr)
	}
	initComboTexts() {
		this.arComboText = [];
		this.countCombo = 0;
		this.poolCombo = 0;
		this.timerCombo = 0;
		var text_combo1 = this.addText(this.layerText, 0, 0, "", 32, true);
		text_combo1.setTint(16776960);
		text_combo1.setDropShadow(3, 3, 6570541, .7);
		var text_combo2 = this.addText(this.layerText, 0, 0, "", 32, true);
		text_combo2.setTint(16776960);
		text_combo2.setDropShadow(3, 3, 6570541, .7);
		var text_combo3 = this.addText(this.layerText, 0, 0, "", 32, true);
		text_combo3.setTint(16776960);
		text_combo3.setDropShadow(3, 3, 6570541, .7);
		this.arComboText.push(text_combo1);
		this.arComboText.push(text_combo2);
		this.arComboText.push(text_combo3);
		text_combo1.visible = false;
		text_combo2.visible = false;
		text_combo3.visible = false
	}
	updateCombo() {
		if (this.timerCombo > 0) {
			this.timerCombo--;
			if (this.timerCombo == 0) this.countCombo = 0
		}
	}
	checkCombo(vX, vY) {
		this.timerCombo = 70;
		this.countCombo++;
		if (this.countCombo < 2) return;
		if (this.countCombo > 10) this.countCombo = 10;
		this.showCombo(vX, vY, this.arComboText[this.poolCombo], MainGame.GAME_TEXT["combo" + (this.countCombo - 1)]);
		this.poolCombo++;
		if (this.poolCombo > 2) this.poolCombo = 0
	}
	showCombo(vX, vY, vTextField, vValue) {
		vTextField.x = vX;
		vTextField.y = vY - 120;
		vTextField.visible = true;
		vTextField.setText(vValue.toUpperCase());
		this.tweens.killTweensOf(vTextField);
		vTextField.setAngle(2 * MyMath.getRandomInt(-5, 5));
		vTextField.setScale(1);
		this.tweens.add({
			targets: vTextField,
			scaleX: 1.4,
			scaleY: 1.4,
			ease: Phaser.Math.Easing.Linear,
			duration: 100,
			yoyo: true,
			onComplete: this.hideCombo(vTextField)
		})
	}
	hideCombo(vTextField) {
		this.tweens.add({
			targets: vTextField,
			scaleX: .5,
			scaleY: .5,
			ease: Phaser.Math.Easing.Linear,
			duration: 150,
			delay: 500,
			onComplete: function() {
				vTextField.visible = false
			}
		})
	}
	updateHpBar(progress) {
		var originalWidth = this.hpBarT.width;
		var width = originalWidth * progress;
		this.tweens.killTweensOf(this.hpBarT_crop);
		this.tweens.add({
			targets: this.hpBarT_crop,
			width: width,
			ease: Phaser.Math.Easing.Linear,
			duration: 100,
			delay: 0,
			onUpdate: () => {
				this.hpBarT.setCrop(this.hpBarT_crop)
			}
		})
	}
	addSmoke() {
		var smoke = this.add.image(0, 0, "ss_shooter", "smoke_0000");
		smoke.setOrigin(.5, .92);
		smoke.visible = false;
		return smoke
	}
	showEffectSmoke(vSmoke) {
		vSmoke.visible = true;
		this.tweens.killTweensOf(vSmoke);
		vSmoke.alpha = 1;
		vSmoke.angle = 35;
		vSmoke.x = 0;
		vSmoke.scaleX = 1;
		vSmoke.scaleY = 1;
		this.tweens.add({
			targets: vSmoke,
			x: 20,
			angle: 45,
			alpha: 0,
			scaleX: 1.1,
			scaleY: 1.1,
			ease: Phaser.Math.Easing.Linear,
			duration: 500,
			onComplete: function() {
				vSmoke.visible = false
			}
		})
	}
	testWeapon(vType) {
		MainGame.selectedGun = vType;
		var settingsWeapon = this.arOffsetWeapon[MainGame.selectedGun - 1];
		this.FIRERATE = settingsWeapon.firerate;
		this.damageWeapons = settingsWeapon.dmg;
		this.maxAmmo = settingsWeapon.ammo;
		this.offsetWeapon.x = settingsWeapon.x;
		this.offsetWeapon.y = settingsWeapon.y;
		this.offsetFire.x = settingsWeapon.fx;
		this.offsetFire.y = settingsWeapon.fy;
		var ar_pistol = [1, 2, 3, 4, 5, 6, 20, 21, 33, 42, 43];
		var ar_rifle1 = [12, 14, 22, 25, 27, 39];
		var ar_rifle2 = [7, 8, 10, 18, 19, 26, 44];
		var ar_rifle3 = [9, 11, 13, 15, 23, 29, 30, 31, 36, 37, 38, 40, 41, 46, 47, 48, 49, 50];
		var ar_rifle4 = [16, 17, 24, 28, 32, 34, 35, 45];
		var isPistol = ar_pistol.indexOf(MainGame.selectedGun) !== -1;
		var isRifle1 = ar_rifle1.indexOf(MainGame.selectedGun) !== -1;
		var isRifle2 = ar_rifle2.indexOf(MainGame.selectedGun) !== -1;
		var isRifle3 = ar_rifle3.indexOf(MainGame.selectedGun) !== -1;
		var isRifle4 = ar_rifle4.indexOf(MainGame.selectedGun) !== -1;
		this.weaponType = "pistol";
		if (isRifle1) this.weaponType = "rifle1";
		if (isRifle2) this.weaponType = "rifle2";
		if (isRifle3) this.weaponType = "rifle3";
		if (isRifle4) this.weaponType = "rifle4";
		this.arm_weapon.timeScale = 1;
		this.arm_weapon.setSkinByName("gun" + MainGame.selectedGun);
		this.arm_weapon.play(this.weaponType + "_idle", false);
		this.amountAmmo = this.maxAmmo;
		this.updateAmmoText()
	}
	initWeapon() {
		this.posCursor = {
			x: this.midX,
			y: this.midY
		};
		var settingsWeapon = this.arOffsetWeapon[MainGame.selectedGun - 1];
		this.offsetWeapon.x = settingsWeapon.x;
		this.offsetWeapon.y = settingsWeapon.y;
		this.offsetFire.x = settingsWeapon.fx;
		this.offsetFire.y = settingsWeapon.fy;
		var arm_weapon = this.add.spine(0, 0, "spine_shooter", "pistol_idle", true);
		this.layerSpineArm.add(arm_weapon);
		arm_weapon.x = this.midX;
		arm_weapon.y = 500;
		arm_weapon.setSkinByName("gun" + MainGame.selectedGun);
		arm_weapon.setScale(this.aimScale);
		var ar_pistol = [1, 2, 3, 4, 5, 6, 20, 21, 33, 42, 43];
		var ar_rifle1 = [12, 14, 22, 25, 27, 39];
		var ar_rifle2 = [7, 8, 10, 18, 19, 26, 44];
		var ar_rifle3 = [9, 11, 13, 15, 23, 29, 30, 31, 36, 37, 38, 40, 41, 46, 47, 48, 49, 50];
		var ar_rifle4 = [16, 17, 24, 28, 32, 34, 35, 45];
		var isPistol = ar_pistol.indexOf(MainGame.selectedGun) !== -1;
		var isRifle1 = ar_rifle1.indexOf(MainGame.selectedGun) !== -1;
		var isRifle2 = ar_rifle2.indexOf(MainGame.selectedGun) !== -1;
		var isRifle3 = ar_rifle3.indexOf(MainGame.selectedGun) !== -1;
		var isRifle4 = ar_rifle4.indexOf(MainGame.selectedGun) !== -1;
		this.weaponType = "pistol";
		if (isRifle1) this.weaponType = "rifle1";
		if (isRifle2) this.weaponType = "rifle2";
		if (isRifle3) this.weaponType = "rifle3";
		if (isRifle4) this.weaponType = "rifle4";
		arm_weapon.play(this.weaponType + "_idle", false);
		this.arm_weapon = arm_weapon;
		if (this.aim_target) {
			this.arm_weapon.x = this.aim_target.x + this.offsetWeapon.x;
			this.arm_weapon.y = this.aim_target.y + this.offsetWeapon.y
		}
		this.input.on("pointerdown", this.onInputDown, this);
		this.input.on("pointerup", this.onInputUp, this);
		this.input.on("pointermove", this.onInputMove, this);
		game.canvas.style.cursor = "none";
		this.armReady = true;
		this.group_smoke1 = this.add.container();
		this.layerEffect.add(this.group_smoke1);
		this.group_smoke2 = this.add.container();
		this.layerEffect.add(this.group_smoke2);
		this.group_smoke3 = this.add.container();
		this.layerEffect.add(this.group_smoke3);
		this.effect_smoke1 = this.addSmoke();
		this.group_smoke1.add(this.effect_smoke1);
		this.effect_smoke2 = this.addSmoke();
		this.group_smoke2.add(this.effect_smoke2);
		this.effect_smoke3 = this.addSmoke();
		this.group_smoke3.add(this.effect_smoke3);
		var effect = this.add.sprite(this.midX, this.midY, "ss_shooter");
		effect.play("flash_big");
		effect.visible = false;
		this.effect_shoot = effect;
		this.layerEffect.add(effect)
	}
	getInputPosition(pointer) {
		const deltaX = Math.ceil(this.parent.width - this.sizer.width) * .5;
		const deltaY = Math.ceil(this.parent.height - this.sizer.height) * .5;
		const scaleX = this.sizer.width / this.GAME_WIDTH;
		const scaleY = this.sizer.height / this.GAME_HEIGHT;
		const zoom = Math.max(scaleX, scaleY);
		const offset = deltaY / zoom;
		var pX = (pointer.x - deltaX) / zoom;
		var pY = pointer.y / zoom - offset;
		return {
			x: pX,
			y: pY
		}
	}
	onInputDown(pointer) {
		var pos = this.getInputPosition(pointer);
		this.posInputDown = pos;
		this.isInputPressed = true
	}
	onInputUp(pointer) {
		var pos = this.getInputPosition(pointer);
		this.lastPos = this.posCursor;
		this.isInputPressed = false;
		if (this.isGoTutorial) {
			this.onTapTutorial()
		}
	}
	onInputMove(pointer) {
		if (this.isLevelFinished || this.isPaused || this.isBeforeStart) return;
		this.posCursor = this.getInputPosition(pointer);
		if (!MainGame.isDesktop) {
			this.posCursor.x = this.lastPos.x + (this.posCursor.x - this.posInputDown.x) * 1.5;
			this.posCursor.y = this.lastPos.y + (this.posCursor.y - this.posInputDown.y) * 1.2
		}
		var deltaX = 25;
		if (this.posCursor.x < deltaX) this.posCursor.x = deltaX;
		if (this.posCursor.x > 1024 - deltaX) this.posCursor.x = 1024 - deltaX;
		if (this.posCursor.y < this.MAX_TOP) {
			this.posCursor.y = this.MAX_TOP;
			game.canvas.style.cursor = "default"
		} else if (this.posCursor.y > this.MAX_BOTTOM) {
			this.posCursor.y = this.MAX_BOTTOM;
			game.canvas.style.cursor = "default"
		} else {
			game.canvas.style.cursor = "none"
		}
	}
	updateReloading(vBool) {
		this.isReloading = vBool;
		this.aim_reloading.visible = vBool;
		this.arm_weapon.timeScale = 1;
		if (vBool) {
			this.aim_target.setFrame("crosshair1_0000");
			this.arm_weapon.play(this.weaponType + "_reload", false);
			this.timerReloading = this.time.delayedCall(this.TIME_RELOADING, this.finishedReloading, [], this);
			MainGame.Sfx.play("sound", "reload")
		} else {
			this.aim_target.setFrame("crosshair2_0000");
			this.arm_weapon.play(this.weaponType + "_idle", false);
			this.amountAmmo = this.maxAmmo;
			this.updateAmmoText()
		}
	}
	finishedReloading() {
		this.updateReloading(false);
		this.timerReloading.remove();
		this.timerReloading = null
	}
	updateArm() {
		if (this.posCursor) {
			this.aim_target.x = this.posCursor.x;
			this.aim_target.y = this.posCursor.y;
			this.aim_reloading.x = this.posCursor.x - 2;
			this.aim_reloading.y = this.posCursor.y - 2;
			var distY = 750 - this.posCursor.y;
			var deltaX = Math.floor(distY * .25);
			this.posWeapon.x = this.posCursor.x + deltaX;
			if (this.posWeapon.x > 950) this.posWeapon.x = 950;
			var deltaY = Math.floor(distY * .2);
			this.posWeapon.y = this.posCursor.y + deltaY;
			if (this.posWeapon.y < 280) this.posWeapon.y = 280;
			this.arm_weapon.x -= (this.arm_weapon.x - this.offsetWeapon.x - this.posWeapon.x) * this.WEAPON_WEIGHT;
			this.arm_weapon.y -= (this.arm_weapon.y - this.offsetWeapon.y - this.deltaScreenY - this.posWeapon.y) * this.WEAPON_WEIGHT;
			this.effect_shoot.x = this.arm_weapon.x - this.offsetWeapon.x + this.offsetFire.x;
			this.effect_shoot.y = this.arm_weapon.y - this.offsetWeapon.y + this.offsetFire.y
		}
		if (this.isReloading || this.isLevelFinished) return;
		var target;
		var dist;
		this.aim_target.setFrame("crosshair2_0000");
		this.updatePumpkins(this.aim_target.x, this.aim_target.y)
	}
	onAnimEvent(entry) {
		if (entry.animation.name == this.weaponType + "_idle") {}
		console.log(entry.animation.name)
	}
	showEffectFire(vX, vY) {
		this.effect_shoot.play("flash_big");
		this.effect_shoot.visible = true;
		if (!this.effect_smoke1.visible) {
			this.showEffectSmoke(this.effect_smoke1);
			this.group_smoke1.x = vX;
			this.group_smoke1.y = vY
		} else {
			if (!this.effect_smoke2.visible) {
				this.showEffectSmoke(this.effect_smoke2);
				this.group_smoke2.x = vX;
				this.group_smoke2.y = vY
			} else {
				if (!this.effect_smoke3.visible) {
					this.showEffectSmoke(this.effect_smoke3);
					this.group_smoke3.x = vX;
					this.group_smoke3.y = vY
				} else {
					this.showEffectSmoke(this.effect_smoke1);
					this.group_smoke1.x = vX;
					this.group_smoke1.y = vY
				}
			}
		}
	}
	updateAmmoText() {
		this.text_bullets.setText(this.amountAmmo + "/" + this.maxAmmo)
	}
	updateFragsText() {
		this.text_frags.setText(this.countFrags + "/" + this.needToKill)
	}
	getCountBots() {
		this.countBots--;
		return this.countBots >= 0
	}
	reviveLevel() {
		this.isLevelFinished = false;
		this.isGameOver = false;
		this.hpPlayerNow = this.hpPlayerMax;
		this.text_hp.setText(this.hpPlayerNow);
		this.updateHpBar(this.hpPlayerNow / this.hpPlayerMax);
		this.layerFinishWindowMain.visible = false;
		this.layerFinishWindow.visible = false;
		this.layerRed.alpha = 0;
		this.tweens.killTweensOf(this.layerRed);
		this.btnExit.visible = true;
		if (MainGame.isAPI) MainGame.API_POKI.gameplayStart()
	}
	finishLevel(vBool) {
		this.btnExit.visible = false;
		if (vBool) {
			this.time.delayedCall(1200, this.showFinishWindowWin, [], this);
			MainGame.fireLevel++;
			MainGame.saveSaves()
		} else {
			this.isGameOver = true;
			this.time.delayedCall(1200, this.showFinishWindowLose, [], this)
		}
	}
	showFinishWindowWin() {
		MainGame.Sfx.play("sound", "win");
		this.showFinishWindow(true)
	}
	showFinishWindowLose() {
		this.showFinishWindow(false)
	}
	showFinishWindow(vBool) {
		game.canvas.style.cursor = "default";
		this.isLevelFinished = true;
		this.aim_target.setFrame("crosshair2_0000");
		this.layerFinishWindowMain.visible = true;
		this.layerFinishWindow.visible = true;
		this.buttonIncomeX2.visible = false;
		this.buttonGet.visible = false;
		this.reward_diamond.visible = false;
		this.effect_diamonds.visible = false;
		this.text_diamonds.visible = false;
		this.buttonHome.visible = false;
		this.buttonReplay.visible = false;
		this.buttonRevive.visible = false;
		this.text_no_give_up.visible = false;
		this.text_try_merge_gun.visible = false;
		if (vBool) {
			this.title_finish.setText(MainGame.GAME_TEXT.victory.toUpperCase());
			this.title_finish.setFontSize(46);
			this.buttonIncomeX2.visible = true;
			this.buttonGet.visible = true;
			this.reward_diamond.visible = true;
			this.effect_diamonds.visible = true;
			this.text_diamonds.visible = true;
			if (MainGame.isAPI) {
				if (MainGame.API_POKI && MainGame.API_POKI.api_isAdblock) this.buttonIncomeX2.setEnable(false)
			} else {
				if (!MainGame.isDebug) this.buttonIncomeX2.setEnable(false)
			}
		} else {
			this.title_finish.setText(MainGame.GAME_TEXT.try_again.toUpperCase());
			this.title_finish.setFontSize(30);
			if (this.suggestRevive) {
				this.suggestRevive = false;
				this.buttonRevive.visible = true;
				this.countRevive = 9 + 1;
				this.updateTimerRevive();
				this.timerRevive = this.time.addEvent({
					delay: 1e3,
					callback: this.updateTimerRevive,
					callbackScope: this,
					loop: true
				})
			} else {
				this.buttonReplay.visible = true
			}
			this.buttonHome.visible = true;
			this.text_no_give_up.visible = true;
			this.text_try_merge_gun.visible = true
		}
		if (MainGame.isAPI) MainGame.API_POKI.gameplayStop()
	}
	updateTimerRevive() {
		this.countRevive--;
		this.text_count_revive.setText(this.countRevive);
		if (this.countRevive > 0) {
			this.tweens.add({
				targets: this.text_count_revive,
				scaleX: 1.3,
				scaleY: 1.3,
				ease: "Linear",
				duration: 250,
				yoyo: true,
				repeat: 0
			})
		} else {
			if (this.timerRevive) this.timerRevive.remove();
			this.buttonReplay.visible = true;
			this.buttonRevive.visible = false;
			this.buttonHome.setEnable(true)
		}
	}
	checkFinishLevel() {
		var isFinish = this.countFrags >= this.needToKill;
		if (isFinish) this.finishLevel(true);
		return isFinish
	}
	increaseFrags() {
		this.countFrags++;
		this.checkFinishLevel();
		this.updateFragsText()
	}
	checkAmmoAmount() {
		if (this.amountAmmo <= 0) {
			this.updateReloading(true)
		}
		this.updateAmmoText()
	}
	allowShoot() {
		this.isAllowShoot = true
	}
	playSfxShoot() {
		switch (MainGame.selectedGun) {
			case 17:
			case 28:
			case 35:
				MainGame.Sfx.play("sound", "autorifle");
				break;
			case 6:
			case 10:
			case 24:
			case 27:
			case 34:
				MainGame.Sfx.play("sound", "autorifle2");
				break;
			case 7:
			case 9:
			case 32:
				MainGame.Sfx.play("sound", "autorifle3");
				break;
			case 1:
			case 3:
			case 33:
				MainGame.Sfx.play("sound", "pistol");
				break;
			case 5:
			case 21:
			case 43:
				MainGame.Sfx.play("sound", "pistol2");
				break;
			case 2:
			case 20:
				MainGame.Sfx.play("sound", "pistol3");
				break;
			case 4:
			case 42:
				MainGame.Sfx.play("sound", "pistol4");
				break;
			case 38:
			case 46:
				MainGame.Sfx.play("sound", "rifle");
				break;
			case 14:
			case 36:
			case 41:
				MainGame.Sfx.play("sound", "rifle2");
				break;
			case 15:
			case 23:
			case 47:
				MainGame.Sfx.play("sound", "rifle3");
				break;
			case 13:
			case 37:
				MainGame.Sfx.play("sound", "rifle4");
				break;
			case 16:
			case 45:
				MainGame.Sfx.play("sound", "rifle5");
				break;
			case 19:
			case 26:
				MainGame.Sfx.play("sound", "shotgun");
				break;
			case 18:
			case 44:
				MainGame.Sfx.play("sound", "shotgun2");
				break;
			case 8:
			case 25:
				MainGame.Sfx.play("sound", "shotgun3");
				break;
			case 22:
			case 30:
			case 40:
				MainGame.Sfx.play("sound", "sniper");
				break;
			case 39:
			case 49:
				MainGame.Sfx.play("sound", "sniper2");
				break;
			case 48:
			case 50:
				MainGame.Sfx.play("sound", "sniper3");
				break;
			case 12:
			case 29:
				MainGame.Sfx.play("sound", "sniper4");
				break;
			case 11:
			case 31:
				MainGame.Sfx.play("sound", "sniper5");
				break
		}
	}
	makeShoot2(vX, vY) {
		var animName = this.arm_weapon.getCurrentAnimation().name;
		if (this.isAllowShoot) {
			this.isAllowShoot = false;
			this.time.delayedCall(this.FIRERATE, this.allowShoot, [], this);
			var animationTime = 1 * (330 / this.FIRERATE);
			this.arm_weapon.timeScale = animationTime;
			this.arm_weapon.setAnimation(0, this.weaponType + "_shoot", false);
			this.arm_weapon.addAnimation(0, this.weaponType + "_idle", false);
			this.showEffectFire(this.effect_shoot.x, this.effect_shoot.y);
			this.amountAmmo--;
			this.checkAmmoAmount();
			this.playSfxShoot()
		}
	}
	makeShoot(vTarget, vX, vY) {
		var animName = this.arm_weapon.getCurrentAnimation().name;
		if (this.isAllowShoot) {
			this.isAllowShoot = false;
			this.time.delayedCall(this.FIRERATE, this.allowShoot, [], this);
			var animationTime = 1 * (330 / this.FIRERATE);
			this.arm_weapon.timeScale = animationTime;
			this.arm_weapon.setAnimation(0, this.weaponType + "_shoot", false);
			this.arm_weapon.addAnimation(0, this.weaponType + "_idle", false);
			vTarget.damage(this.damageWeapons);
			var posKickX = (vTarget.hero.x + vX) * .5;
			this.addBotKick(posKickX, vY);
			this.showEffectFire(this.effect_shoot.x, this.effect_shoot.y);
			this.amountAmmo--;
			this.checkAmmoAmount();
			if (this.isGoTutorial) this.checkTutorial();
			this.playSfxShoot()
		}
	}
	addBotFlash(vX, vY) {
		var effect = this.add.sprite(vX, vY, "ss_shooter");
		effect.play("flash");
		this.layerEffect.add(effect)
	}
	addBotKick(vX, vY) {
		var effect = this.add.sprite(vX, vY, "ss_shooter");
		effect.play("effect_kick");
		this.layerEffect.add(effect)
	}
	addExplosionPumpkin(vX, vY, vType, vZoom) {
		var effect = this.add.sprite(vX, vY, "ss_christmas");
		if (vType == 10) {
			effect.play("explosion_bomb");
			MainGame.Sfx.play("sound", "explosion")
		} else {
			effect.play("explosion_snowman");
			MainGame.Sfx.play("sound", "snowsplash")
		}
		if (vZoom) {
			effect.setScale(1)
		} else {
			effect.setScale(2)
		}
		this.layerEffect.add(effect)
	}
	underAttack(vIsYoyo) {
		this.layerRed.alpha = 0;
		this.tweens.killTweensOf(this.layerRed);
		this.tweens.add({
			targets: this.layerRed,
			alpha: .6,
			ease: "Linear",
			duration: 150,
			yoyo: vIsYoyo
		})
	}
	botShoot(vType, vLevel, vX, vY) {
		if (this.isLevelFinished) return;
		this.addBotFlash(vX, vY);
		if (this.isGameOver) return;
		this.hpPlayerNow -= 5;
		if (this.hpPlayerNow <= 0) {
			this.hpPlayerNow = 0;
			this.finishLevel(false);
			this.underAttack(false)
		} else {
			this.underAttack(true)
		}
		this.text_hp.setText(this.hpPlayerNow);
		this.updateHpBar(this.hpPlayerNow / this.hpPlayerMax);
		if (vType == "stickman1") MainGame.Sfx.play("sound", "enemy4");
		if (vType == "stickman2") MainGame.Sfx.play("sound", "enemy3");
		if (vType == "stickman3") MainGame.Sfx.play("sound", "enemy");
		if (vType == "stickman4") MainGame.Sfx.play("sound", "enemy2")
	}
	initLevel() {
		this.arTargets = [];
		this.posCursor = {
			x: this.midX,
			y: this.midY
		};
		this.line1_posY = 230 + 140 * 0;
		this.line2_posY = 230 + 140 * 1;
		this.line3_posY = 230 + 140 * 2;
		var road1 = this.add.image(this.midX, this.line1_posY, "ss_christmas", "road_0000");
		road1.displayWidth = 1400;
		this.layerRoads.add(road1);
		var road2 = this.add.image(this.midX, this.line2_posY, "ss_christmas", "road_0000");
		road2.displayWidth = 1400;
		this.layerRoads.add(road2);
		var road3 = this.add.image(this.midX, this.line3_posY, "ss_christmas", "road_0000");
		road3.displayWidth = 1400;
		this.layerRoads.add(road3);
		this.road1 = road1;
		this.road2 = road2;
		this.road3 = road3;
		this.directionLine1 = true;
		this.directionLine2 = true;
		this.directionLine3 = true;
		this.scaleLine1 = false;
		this.scaleLine2 = false;
		this.scaleLine3 = false;
		this.speedLine1 = false;
		this.speedLine2 = false;
		this.speedLine3 = false
	}
	setLineScale(vNumLine, vIsScale, vIsTimerBack) {
		if (vNumLine == 1) {
			this.scaleLine1 = vIsScale
		} else if (vNumLine == 2) {
			this.scaleLine2 = vIsScale
		} else if (vNumLine == 3) {
			this.scaleLine3 = vIsScale
		}
		this.updateScaleMob(vNumLine, vIsScale);
		if (vIsTimerBack) {
			this.time.delayedCall(this.TIME_BACK, this.setLineScale, [vNumLine, false], this)
		}
	}
	setLineSpeed(vNumLine, vIsFaster, vIsTimerBack) {
		if (vNumLine == 1) {
			this.speedLine1 = vIsFaster
		} else if (vNumLine == 2) {
			this.speedLine2 = vIsFaster
		} else if (vNumLine == 3) {
			this.speedLine3 = vIsFaster
		}
		this.updateSpeedMob(vNumLine, vIsFaster);
		if (vIsTimerBack) {
			this.time.delayedCall(this.TIME_BACK, this.setLineSpeed, [vNumLine, false], this)
		}
	}
	setLineDirection(vNumLine, vDirection) {
		var line = null;
		if (vNumLine == 1) {
			line = this.road1;
			if (vDirection != null) {
				this.directionLine1 = vDirection
			} else {
				this.directionLine1 = !this.directionLine1
			}
			vDirection = this.directionLine1
		} else if (vNumLine == 2) {
			line = this.road2;
			if (vDirection != null) {
				this.directionLine2 = vDirection
			} else {
				this.directionLine2 = !this.directionLine2
			}
			vDirection = this.directionLine2
		} else if (vNumLine == 3) {
			line = this.road3;
			if (vDirection != null) {
				this.directionLine3 = vDirection
			} else {
				this.directionLine3 = !this.directionLine3
			}
			vDirection = this.directionLine3
		}
		this.changeDirectionMob(vNumLine, vDirection)
	}
	addBotStep3() {
		this.addBot(0, 0, "stickman3", 1, 0)
	}
	addBotStep4() {
		this.addBot(0, 0, "stickman4", 2, 0)
	}
	addBotStep5() {
		this.addBot(0, 0, null, 1, 2)
	}
	addBotStep6() {
		this.addBot(0, 0, null, 2, 2)
	}
	addBotStep7() {
		this.addBot(0, 0, null, 1, 3)
	}
	addBotStep8() {
		this.addBot(0, 0, null, 2, 3)
	}
	addBotStep9() {
		this.addBot(0, 0, null, 1, 3)
	}
	addBotStep10() {
		this.addBot(0, 0, null, 2, 3)
	}
	addBot(vX, vY, vSkin, vLine, vBrain) {
		if (this.countBots <= 0) return;
		var posX = vX * 80;
		var bot = new Bot(this, this.layerMob, posX, vY, vSkin, vLine, vBrain);
		this.arTargets.push(bot);
		this.countEnemies = this.arTargets.length
	}
	updateSpawnPumpkins() {
		if (this.isLevelFinished) return;
		this.counterPumpkin++;
		if (this.counterPumpkin > 55) {
			if (this.isSpawnEnd) {
				this.addPumpkin(0, 1)
			} else {
				var list = this.arSpawnSquad[this.stepPumpkin];
				if (list[1] > 0) this.addPumpkin(list[0], list[1])
			}
			this.counterPumpkin = MyMath.getRandomInt(0, 3) * 10;
			this.counterPumpkin = 30;
			this.stepPumpkin++;
			if (this.stepPumpkin >= this.arSpawnSquad.length) this.isSpawnEnd = true
		}
	}
	addPumpkin(vLine, vType) {
		var line = vLine || Phaser.Math.Between(1, 3);
		var posX = -200;
		var isFaster = false;
		if (line == 1) {
			if (this.directionLine1) {
				posX = -200
			} else {
				posX = 1024 + 200
			}
			isFaster = this.speedLine1
		}
		if (line == 2) {
			if (this.directionLine2) {
				posX = -200
			} else {
				posX = 1024 + 200
			}
			isFaster = this.speedLine2
		}
		if (line == 3) {
			if (this.directionLine3) {
				posX = -200
			} else {
				posX = 1024 + 200
			}
			isFaster = this.speedLine3
		}
		var posY = this.line1_posY - 60;
		if (line == 2) posY = this.line2_posY - 60;
		if (line == 3) posY = this.line3_posY - 60;
		var type = vType;
		if (type == 1) type = Phaser.Math.Between(1, 6);
		if (type == 10) posY += 12;
		this.snowmans.fireSnowman(posX, posY, type, line, isFaster)
	}
	updatePumpkins(vX, vY) {
		var dist = 0;
		var isFoundEnemy = false;
		var dist_check = 1600;
		if (!this.isAllowShoot) return;
		this.snowmans.children.each((function(pumpkin) {
			if (pumpkin.active) {
				dist = MyMath.distanceTwoPoints(vX, pumpkin.x, vY, pumpkin.y);
				dist_check = 1600;
				if (pumpkin.zoom) dist_check = 400;
				if (dist < dist_check) {
					this.aim_target.setFrame("crosshair3_0000");
					this.makeShoot2(this.aim_target.x, this.aim_target.y);
					pumpkin.hide();
					this.addPiecesPumpkin(pumpkin.x, pumpkin.y, pumpkin.type);
					this.addExplosionPumpkin(pumpkin.x, pumpkin.y, pumpkin.type, pumpkin.zoom);
					if (pumpkin.type == 10) {
						this.updateAttemptsPumpkin();
						this.exploseAllPumkins();
						return false
					} else if (pumpkin.type == 7) {
						this.addPumpkinCrystals();
						this.crystalsPartices.emitParticleAt(pumpkin.x, pumpkin.y)
					}
					if (pumpkin.type < 10) this.addPumpkinPoints()
				}
			}
		}), this)
	}
	changeDirectionMob(vLineNum, vDirection) {
		this.snowmans.children.each((function(pumpkin) {
			if (pumpkin.active) {
				pumpkin.changeDirection(vLineNum, vDirection)
			}
		}), this)
	}
	updateSpeedMob(vLineNum, vIsFaster) {
		this.snowmans.children.each((function(pumpkin) {
			if (pumpkin.active) {
				pumpkin.changeSpeed(vLineNum, vIsFaster)
			}
		}), this)
	}
	updateScaleMob(vNumLine, vIsScale) {
		this.snowmans.children.each((function(pumpkin) {
			if (pumpkin.active) {
				pumpkin.changeScale(vNumLine, vIsScale)
			}
		}), this)
	}
	exploseAllPumkins() {
		this.cameras.main.shake(400, .01);
		this.cameras.main.flash()
	}
	initSettingsEvent() {
		this.POINTS_PER_PUMPKIN = 25;
		this.CRYSTALS_PER_PUMPKIN = 3;
		this.timerCount = 60;
		this.countNeedPoints = 1500;
		this.countCrystals = 0;
		this.pointsPumpkin = 0;
		this.attemptsPumpkin = 3;
		this.counterPumpkin = 100;
		this.TIME_BACK = 3e3;
		this.isSpawnEnd = false;
		this.arSpawnSquad = [];
		this.stepPumpkin = 0;
		this.addNormalSquad();
		this.addBombTime(1, 2, 3);
		this.addNormalSquad();
		this.addBombTime(2, 1, 3);
		this.addNormalSquad();
		this.addBombTime(3, 2, 1);
		this.scenarioLines = [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 1, 1];
		this.numLines = [1, 1, 2, 2, 3, 3, 1, 1, 2, 2, 3, 3];
		this.timerScenario = 0;
		this.stepScenario = 0;
		MyMath.shuffleArr(this.scenarioLines);
		MyMath.shuffleArr(this.numLines)
	}
	updateTimerScenario() {
		this.timerScenario++;
		if (this.timerScenario >= 4) {
			var scenarioType = 1;
			var lineNum = 1;
			if (this.stepScenario >= this.scenarioLines.length) {
				scenarioType = Phaser.Math.Between(1, 3);
				lineNum = Phaser.Math.Between(1, 3)
			} else {
				scenarioType = this.scenarioLines[this.stepScenario];
				lineNum = this.numLines[this.stepScenario]
			}
			if (scenarioType == 1) {
				this.setLineDirection(lineNum)
			} else if (scenarioType == 2) {
				this.setLineSpeed(lineNum, true, true)
			} else if (scenarioType == 3) {
				this.setLineScale(lineNum, true, true)
			}
			this.timerScenario = 0;
			this.stepScenario++
		}
	}
	addNormalSquad() {
		var new_squad = [];
		for (var i = 0; i < 5; i++) new_squad.push([0, 7]);
		for (var i = 0; i < 10; i++) new_squad.push([0, 10]);
		for (var i = 0; i < 15; i++) new_squad.push([0, 1]);
		MyMath.shuffleArr(new_squad);
		this.arSpawnSquad = this.arSpawnSquad.concat(new_squad)
	}
	addBombTime(vNum1, vNum2, vNum3) {
		var arrayBomb1 = [
			[vNum1, 10],
			[vNum1, 10],
			[vNum1, 10],
			[vNum1, 10],
			[vNum1, 7]
		];
		var arrayBomb2 = [
			[vNum2, 10],
			[vNum2, 10],
			[vNum2, 10],
			[vNum2, 10],
			[vNum2, 7]
		];
		var arrayBomb3 = [
			[vNum3, 10],
			[vNum3, 10],
			[vNum3, 10],
			[vNum3, 10],
			[vNum3, 7]
		];
		this.arSpawnSquad.push([0, 0]);
		MyMath.shuffleArr(arrayBomb1);
		for (var i = 0; i < arrayBomb1.length; i++) {
			this.arSpawnSquad.push(arrayBomb1[i])
		}
		this.arSpawnSquad.push([0, 0]);
		MyMath.shuffleArr(arrayBomb2);
		for (var i = 0; i < arrayBomb2.length; i++) {
			this.arSpawnSquad.push(arrayBomb2[i])
		}
		this.arSpawnSquad.push([0, 0]);
		MyMath.shuffleArr(arrayBomb3);
		for (var i = 0; i < arrayBomb3.length; i++) {
			this.arSpawnSquad.push(arrayBomb3[i])
		}
		this.arSpawnSquad.push([0, 0])
	}
	startTimerEvent() {
		this.timerHalloween = this.time.addEvent({
			delay: 1e3,
			callback: this.updateTimerHalloween,
			callbackScope: this,
			loop: true
		})
	}
	checkFinishGame() {
		if (this.timerHalloween) this.timerHalloween.remove();
		if (MainGame.listEvents[1] == 0) {
			if (this.pointsPumpkin < this.countNeedPoints) {
				this.showFinishWindow2(1)
			} else {
				this.showFinishWindow2(2);
				MainGame.completedEvent()
			}
		} else {
			this.showFinishWindow2(3)
		}
	}
	addPumpkinPoints() {
		this.pointsPumpkin += this.POINTS_PER_PUMPKIN;
		this.textPoints.setText(this.pointsPumpkin)
	}
	updateTimerHalloween() {
		this.timerCount--;
		var timeStr = MainGame.secToHHMMSS(this.timerCount);
		this.textTimer.setText(timeStr);
		if (this.timerCount == 0) {
			this.checkFinishGame()
		}
		this.updateTimerScenario()
	}
	updateAttemptsPumpkin() {
		if (this.isLevelFinished) return;
		if (this.attemptsPumpkin == 3) {
			this.icon_x1.setFrame("icon_x2_0000");
			MainGame.jelly(this, this.icon_x1, .3, null, null, 100, 600)
		}
		if (this.attemptsPumpkin == 2) {
			this.icon_x2.setFrame("icon_x2_0000");
			MainGame.jelly(this, this.icon_x2, .3, null, null, 100, 600)
		}
		if (this.attemptsPumpkin == 1) {
			this.icon_x3.setFrame("icon_x2_0000");
			MainGame.jelly(this, this.icon_x3, .3, null, null, 100, 600)
		}
		this.attemptsPumpkin--;
		if (this.attemptsPumpkin == 0) {
			this.checkFinishGame()
		}
	}
	addPumpkinCrystals() {
		this.countCrystals += this.CRYSTALS_PER_PUMPKIN
	}
	initPiecesPumpkin() {
		this.snowmans = new Snowmans(this);
		var particles1 = this.add.particles("ss_christmas");
		var particles3 = this.add.particles("ss_christmas");
		particles1.createEmitter({
			frame: ["snowman_part1_0000", "snowman_part2_0000", "snowman_part3_0000", "snowman_part4_0000", "snowman_part5_0000"],
			angle: {
				min: 240,
				max: 300
			},
			speed: {
				min: 300,
				max: 500
			},
			quantity: {
				min: 3,
				max: 6
			},
			lifespan: 4e3,
			scale: {
				min: .8,
				max: 1.2
			},
			rotate: {
				start: 0,
				end: 360,
				ease: "Back.easeOut"
			},
			gravityY: 800,
			on: false
		});
		particles3.createEmitter({
			frame: ["icon_diamond_0000"],
			angle: {
				min: 240,
				max: 300
			},
			speed: {
				min: 300,
				max: 500
			},
			quantity: 3,
			lifespan: 4e3,
			scale: {
				min: .8,
				max: 1.2
			},
			rotate: {
				start: 0,
				end: 360,
				ease: "Back.easeOut"
			},
			gravityY: 800,
			on: false
		});
		this.piecesPartices = particles1;
		this.crystalsPartices = particles3;
		this.snowmans.setDepth(this.DEPTH_layerMob + .002);
		this.piecesPartices.setDepth(this.DEPTH_layerMob + .003);
		this.crystalsPartices.setDepth(this.DEPTH_layerMob + .004)
	}
	addPiecesPumpkin(vX, vY, vType) {
		if (vType == 10) return;
		this.piecesPartices.emitParticleAt(vX, vY)
	}
	initTutorialChristmas() {
		this.isGoTutorial = true;
		this.tutorialStep = 0;
		var plaha = this.add.image(this.midX, 250, "ss_christmas", "tutor_popup_0000");
		this.layerEffect.add(plaha);
		var tutor_image1 = this.add.image(this.midX, 250 + 130, "ss_christmas", "tutor_snowmans_0000");
		this.layerEffect.add(tutor_image1);
		var tutor_image2 = this.add.image(this.midX, 250 + 100, "ss_christmas", "tutor_bomb2_0000");
		this.layerEffect.add(tutor_image2);
		var txt = this.add.bitmapText(plaha.x, plaha.y, "Panton", "");
		txt.setMaxWidth(400);
		txt.setCenterAlign();
		txt.setFontSize(28);
		txt.setOrigin(.5);
		this.layerEffect.add(txt);
		var txt2 = this.add.bitmapText(plaha.x, 510 + 70, "Panton", "");
		txt2.setCenterAlign();
		txt2.setFontSize(24);
		txt2.setOrigin(.5);
		this.layerEffect.add(txt2);
		var txt3 = this.add.bitmapText(plaha.x, 150, "Panton", "");
		txt3.setCenterAlign();
		txt3.setFontSize(32);
		txt3.setOrigin(.5);
		this.layerEffect.add(txt3);
		this.textTutorial = txt;
		this.textContinue = txt2;
		this.textTutorStep = txt3;
		this.textTutorial.setText(MainGame.GAME_TEXT.tutorial_snowman1.toUpperCase());
		this.textContinue.setText(MainGame.GAME_TEXT.tap_continue.toUpperCase());
		this.textTutorStep.setText("1/2");
		this.tutor_image1 = tutor_image1;
		this.tutor_image2 = tutor_image2;
		this.plaha = plaha;
		this.tutor_image2.visible = false
	}
	onTapTutorial() {
		if (this.tutorialStep == 0) {
			this.textTutorStep.setText("2/2");
			this.textTutorial.setText(MainGame.GAME_TEXT.tutorial_snowman2.toUpperCase());
			this.tutor_image1.visible = false;
			this.tutor_image2.visible = true;
			this.tutorialStep = 1
		} else if (this.tutorialStep == 1) {
			this.isGoTutorial = false;
			this.tutor_image1.destroy();
			this.tutor_image2.destroy();
			this.textTutorial.destroy();
			this.textContinue.destroy();
			this.textTutorStep.destroy();
			this.plaha.destroy();
			this.startTimerEvent()
		}
	}
	initTutorial() {
		this.isGoTutorial = true;
		this.tutorialStep = 0;
		this.buttonPauseHome.setEnable(false);
		var plaha = this.add.image(this.midX, 340, "ss_shooter", "tutor_popup_0000");
		this.layerEffect.add(plaha);
		var tutor_mobile = this.add.image(this.midX + 360, 340, "ss_shooter", "tutor_mobile_0000");
		this.layerEffect.add(tutor_mobile);
		tutor_mobile.visible = false;
		var txt = this.add.bitmapText(plaha.x, plaha.y, "Panton", "");
		txt.setDropShadow(3, 3, 0, 1);
		txt.setMaxWidth(400);
		txt.setCenterAlign();
		txt.setFontSize(34);
		txt.setOrigin(.5);
		txt.lineSpacing = -8;
		this.layerEffect.add(txt);
		this.textTutorial = txt;
		this.plahaTutorial = plaha;
		this.tutor_mobile = tutor_mobile;
		this.plahaTutorial.visible = false;
		this.textTutorial.visible = false;
		if (!MainGame.isDesktop) {
			this.posCursor.y += 100;
			this.lastPos.y += 100
		}
		var buttonStart = new ButtonText(this.midX, this.midY + 20, "ss_ui", "btn_buy_g2_0000", this.startTutorial, this, MainGame.GAME_TEXT.start);
		buttonStart.text.setFontSize(26);
		this.layerEffect.add(buttonStart);
		MainGame.updateTextWidth(buttonStart.text, 200);
		buttonStart.text.y = -4;
		this.buttonStart = buttonStart;
		game.canvas.style.cursor = "default";
		this.armReady = false;
		this.isBeforeStart = true;
		this.arm_weapon.visible = false;
		this.aim_target.visible = false;
		this.plahaTutorial.visible = true;
		MainGame.isFromTutorial = true
	}
	startTutorial() {
		this.time.delayedCall(500, this.tutorialScenario, [], this);
		this.isBeforeStart = false;
		this.armReady = true;
		this.buttonStart.visible = false;
		this.arm_weapon.visible = true;
		this.aim_target.visible = true;
		if (MainGame.isAPI) MainGame.API_POKI.gameplayStart()
	}
	checkTutorial() {
		if (this.tutorialStep == 1) {
			if (!this.doska1.info.live) {
				this.time.delayedCall(500, this.tutorialScenario, [], this);
				this.plahaTutorial.visible = false;
				this.textTutorial.visible = false;
				this.tutor_mobile.visible = false
			}
		} else if (this.tutorialStep == 2) {
			if (!this.doska2.info.live && !this.doska3.info.live && !this.doska4.info.live && !this.doska5.info.live) {
				this.textTutorial.visible = false;
				this.plahaTutorial.visible = false
			}
		}
	}
	tutorialScenario() {
		this.tutorialStep++;
		if (this.tutorialStep == 1) {
			this.textTutorial.setText(MainGame.GAME_TEXT.text_move_cursor);
			this.plahaTutorial.visible = true;
			this.textTutorial.visible = true;
			this.doska1.visible = true;
			if (!MainGame.isDesktop) this.tutor_mobile.visible = true
		} else if (this.tutorialStep == 2) {
			this.textTutorial.setText(MainGame.GAME_TEXT.text_good_job);
			this.plahaTutorial.visible = true;
			this.textTutorial.visible = true;
			this.doska2.visible = true;
			this.doska3.visible = true;
			this.doska4.visible = true;
			this.doska5.visible = true;
			this.doska2.info.live = true;
			this.doska3.info.live = true;
			this.doska4.info.live = true;
			this.doska5.info.live = true;
			this.tweens.add({
				targets: this.doska2,
				x: this.doska2.x - 80,
				ease: "Linear",
				duration: 1e3,
				yoyo: true,
				repeat: -1
			});
			this.tweens.add({
				targets: this.doska3,
				x: this.doska3.x + 80,
				ease: "Linear",
				duration: 1e3,
				yoyo: true,
				repeat: -1
			});
			this.tweens.add({
				targets: this.doska4,
				x: this.doska4.x - 80,
				ease: "Linear",
				duration: 1e3,
				yoyo: true,
				repeat: -1
			});
			this.tweens.add({
				targets: this.doska5,
				x: this.doska5.x + 80,
				ease: "Linear",
				duration: 1e3,
				yoyo: true,
				repeat: -1
			})
		}
	}
	addDoska(vX, vY) {
		var posX = vX * 80;
		var obj = this.add.sprite(posX, vY - 30, "ss_shooter");
		obj.play("target_idle");
		obj.setOrigin(.5, .75);
		this.layerMob.add(obj);
		obj.hero = obj;
		obj.info = {
			health: 2,
			live: true
		};
		obj.isAlive = function() {
			return obj.info.live
		};
		obj.damage = function() {
			obj.info.health--;
			if (obj.info.health <= 0) {
				obj.info.live = false;
				obj.play("target_down");
				MainGame.state.increaseFrags();
				MainGame.state.tweens.killTweensOf(obj)
			}
		};
		this.arTargets.push(obj);
		this.countEnemies = this.arTargets.length;
		return obj
	}
	updateBots() {
		var target;
		for (var i = 0; i < this.countEnemies; i++) {
			target = this.arTargets[i];
			target.update()
		}
	}
	pauseBots() {
		if (this.isGoTutorial) return;
		for (var i = 0; i < this.countEnemies; i++) {
			this.arTargets[i].pauseAnimation()
		}
		this.old_timeScale = this.arm_weapon.state.timeScale;
		this.arm_weapon.state.timeScale = 0;
		if (this.timerReloading) this.timerReloading.paused = true
	}
	resumeBots() {
		if (this.isGoTutorial) return;
		for (var i = 0; i < this.countEnemies; i++) {
			this.arTargets[i].resumeAnimation()
		}
		this.arm_weapon.state.timeScale = this.old_timeScale || 1;
		if (this.timerReloading) this.timerReloading.paused = false
	}
	clickBtnPause() {
		if (this.isLevelFinished) return;
		MainGame.Sfx.update("music", this.buttonMuteMusic.icon, this.buttonMuteMusic.text);
		MainGame.Sfx.update("sound", this.buttonMuteSound.icon, this.buttonMuteSound.text);
		this.isPaused = true;
		this.layerPauseWindowMain.visible = true;
		this.layerPauseWindow.visible = true;
		game.canvas.style.cursor = "default";
		this.physics.pause();
		if (this.timerHalloween) this.timerHalloween.paused = true;
		this.pauseBots();
		if (MainGame.isAPI) MainGame.API_POKI.gameplayStop()
	}
	clickBtnReload() {
		if (this.isReloading || this.isLevelFinished || this.isPaused || !this.armReady) return;
		this.updateReloading(true)
	}
	showAdsForDiamondsX2() {
		MainGame.clickReward("fire_x2");
		this.buttonIncomeX2.setEnable(false)
	}
	initSystemMessage() {
		this.textSystemContainer = this.add.container();
		this.textSystemContainer.x = this.midX;
		this.textSystemContainer.y = MainGame.world.centerY - 100;
		var txt = this.add.bitmapText(0, 0, "Panton", "");
		txt.setDropShadow(3, 3, 0, 1);
		txt.setOrigin(.5);
		txt.setMaxWidth(550);
		txt.setCenterAlign();
		txt.setFontSize(34);
		this.textSystemContainer.add(txt);
		this.textSystemContainer.setDepth(this.DEPTH_systemtext);
		this.textSystemContainer.visible = false;
		this.textSystem = txt
	}
	showSystemMessage(vText) {
		this.textSystemContainer.visible = true;
		this.textSystem.setText(vText);
		this.textSystemContainer.alpha = .2;
		this.textSystemContainer.y = this.midY - 20;
		this.textSystemContainer.setScale(.8);
		this.tweens.killTweensOf(this.textSystemContainer);
		this.tweens.add({
			targets: this.textSystemContainer,
			alpha: 1,
			ease: "Linear",
			duration: 150
		});
		this.tweens.add({
			targets: this.textSystemContainer,
			scaleX: 1,
			scaleY: 1,
			ease: "Linear",
			duration: 150
		});
		this.tweens.add({
			targets: this.textSystemContainer,
			alpha: 0,
			ease: "Linear",
			delay: 1500,
			duration: 200,
			onComplete: this.finishSystemTextTween
		});
		this.tweens.add({
			targets: this.textSystemContainer,
			y: this.textSystemContainer.y - 20,
			ease: "Linear",
			delay: 150,
			duration: 1200
		})
	}
	clickReplay() {
		this.scale.off("resize", this.updateResize, this);
		MainGame.fadeOutScene("UpdateChristmas", this)
	}
	clickRevive() {
		if (this.timerRevive) this.timerRevive.remove();
		this.reviveLevel()
	}
	showGameScreen() {
		MainGame.saveSaves();
		this.scale.off("resize", this.updateResize, this);
		if (MainGame.isAPI) MainGame.API_POKI.destroyAd();
		MainGame.fadeOutScene("Game", this)
	}
}
class Snowman extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "ss_christmas", "snowman1_0000");
		this.type = 1;
		this.scene = scene;
		this.zoom = false;
		this.speed = 240
	}
	fire(x, y, vType, vLineNum, vIsFaster) {
		this.body.reset(x, y);
		this.lineNum = vLineNum;
		this.direction = true;
		if (x > 500) this.direction = false;
		var type = vType || Phaser.Math.Between(1, 6);
		if (type <= 7) {
			this.stop();
			this.setFrame("snowman" + type + "_0000");
			this.setOrigin(.5, .5);
			switch (type) {
				case 1:
					this.setOrigin(.5, .5);
					break;
				case 2:
					this.setOrigin(.5, .59);
					break;
				case 3:
					this.setOrigin(.5, .58);
					break;
				case 4:
					this.setOrigin(.5, .5);
					break;
				case 5:
					this.setOrigin(.5, .59);
					break;
				case 6:
					this.setOrigin(.5, .58);
					break;
				case 7:
					this.setOrigin(.5, .58);
					break
			}
		} else {
			this.play("bomb");
			this.setOrigin(.5, .65)
		}
		this.setActive(true);
		this.setVisible(true);
		this.type = type;
		this.changeSpeed(this.lineNum, vIsFaster);
		this.changeScale(this.lineNum)
	}
	changeScale(vLineNum) {
		if (this.lineNum != vLineNum) return;
		var isScale = false;
		if (this.lineNum == 1) isScale = this.scene.scaleLine1;
		if (this.lineNum == 2) isScale = this.scene.scaleLine2;
		if (this.lineNum == 3) isScale = this.scene.scaleLine3;
		if (isScale) {
			if (this.direction) {
				this.scaleX = .6
			} else {
				this.scaleX = -.6
			}
			this.scaleY = .6;
			if (this.lineNum == 1) this.y = this.scene.line1_posY - 40;
			if (this.lineNum == 2) this.y = this.scene.line2_posY - 40;
			if (this.lineNum == 3) this.y = this.scene.line3_posY - 40;
			if (this.type == 10) this.y += 7
		} else {
			if (this.direction) {
				this.scaleX = 1
			} else {
				this.scaleX = -1
			}
			this.scaleY = 1;
			if (this.lineNum == 1) this.y = this.scene.line1_posY - 60;
			if (this.lineNum == 2) this.y = this.scene.line2_posY - 60;
			if (this.lineNum == 3) this.y = this.scene.line3_posY - 60;
			if (this.type == 10) this.y += 12
		}
		this.zoom = isScale
	}
	changeDirection(vLineNum, vDirection) {
		if (this.lineNum != vLineNum) return;
		this.direction = vDirection;
		this.changeScale(this.lineNum);
		var isFaster = false;
		if (this.lineNum == 1) isFaster = this.scene.speedLine1;
		if (this.lineNum == 2) isFaster = this.scene.speedLine2;
		if (this.lineNum == 3) isFaster = this.scene.speedLine3;
		this.changeSpeed(vLineNum, isFaster)
	}
	changeSpeed(vLineNum, vIsFaster) {
		if (this.lineNum != vLineNum) return;
		this.speed = 240;
		if (vIsFaster) this.speed = 240 * 2;
		if (this.direction) {
			this.setVelocity(this.speed, 0)
		} else {
			this.setVelocity(-this.speed, 0)
		}
	}
	hide() {
		this.setActive(false);
		this.setVisible(false)
	}
	preUpdate(time, delta) {
		super.preUpdate(time, delta);
		if (this.direction && this.x > 1224 || !this.direction && this.x < -200) {
			this.setActive(false);
			this.setVisible(false)
		}
	}
}
class Snowmans extends Phaser.Physics.Arcade.Group {
	constructor(scene) {
		super(scene.physics.world, scene);
		this.createMultiple({
			quantity: 20,
			key: "ss_christmas",
			randomFrame: true,
			active: false,
			visible: false,
			classType: Snowman
		})
	}
	fireSnowman(x, y, type, vLineNum, vIsFaster) {
		let bullet = this.getFirstDead(false);
		if (bullet) {
			bullet.fire(x, y, type, vLineNum, vIsFaster)
		}
	}
}
var MyMath = {
	getRandomInt: function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min
	},
	getRandomBool: function() {
		return Math.random() < .5 ? true : false
	},
	randomChance: function(vValue) {
		return Math.random() < vValue
	},
	shuffleArr: function(o) {
		for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o
	},
	distanceTwoPoints: function(x1, x2, y1, y2) {
		var dx = x1 - x2;
		var dy = y1 - y2;
		return dx * dx + dy * dy
	},
	parseQuery: function(qstr) {
		var query = {};
		var a = qstr.substr(1).split("&");
		for (var i = 0; i < a.length; i++) {
			var b = a[i].split("=");
			query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || "")
		}
		return query
	},
	weightedRandom: function(prob) {
		let i, sum = 0,
			r = Math.random();
		for (i in prob) {
			sum += prob[i];
			if (r <= sum) return i
		}
	},
	lerp: function(in_Src, in_Dst, in_Ratio) {
		return in_Src * (1 - in_Ratio) + in_Dst * in_Ratio
	}
};
var config = {
	type: Phaser.AUTO,
	backgroundColor: 2961191,
	scale: {
		mode: Phaser.Scale.RESIZE,
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
		parent: "game-container",
		width: 1024,
		height: 640,
		max: {
			width: 1400,
			height: 1024
		}
	},
	plugins: {
		scene: [{
			key: "SpinePlugin",
			plugin: window.SpinePlugin,
			sceneKey: "spine"
		}]
	},
	scene: [Boot, Preloader, Game, Shooter, UpdateHalloween, UpdateChristmas]
};
const game = new Phaser.Game(config);
window.focus();