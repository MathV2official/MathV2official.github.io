var rdres = 1;
if (screen.width <= 680) {
    rdres = 2;
}
var rad = new Image();
rad.src = "data/interface" + rdres + "/rad.png";
var xlogo = null;
if (gameorigin == "crazygames" || gameorigin == "crazygamesa") {
    xlogo = new Image();
    xlogo.src = "https://mathv22.netlify.app/favicon.ico";
}
var bimg = [];
var blimg = [];
for (var i = 0; i < 6; i++) {
    bimg[i] = new Image();
    bimg[i].src = "data/img" + i + ".png";
}
for (var i = 0; i < 4; i++) {
    blimg[i] = new Image();
    blimg[i].src = "data/ball" + (i + 1) + ".png";
}
var blshd = new Image();
blshd.src = "data/ballshad.png";
var logo = new Image();
logo.src = "data/interface" + rdres + "/logo.png";
var bgimg = [];
for (var i = 0; i < 5; i++) {
    bgimg[i] = new Image();
    bgimg[i].src = "data/interface" + rdres + "/bg" + i + ".png";
}
var eflog = [];
for (var i = 0; i < 2; i++) {
    eflog[i] = new Image();
    eflog[i].src = "data/interface" + rdres + "/ef" + (i + 1) + ".png";
}
var insti = new Image();
insti.src = "data/interface" + rdres + "/inst.png";
var btn = [];
for (var k = 0; k < 15; k++) {
    btn[k] = [];
    for (var i = 0; i < 2; i++) {
        btn[k][i] = new Image();
        btn[k][i].src = "data/interface" + rdres + "/btn" + k + "" + i + ".png";
    }
}
var cupimg = new Image();
cupimg.src = "cups/" + cupname + "/" + rdres + ".png";
var confeloaded = false;
var confe = [];

function loadconfe() {
    for (var i = 0; i < 29; i++) {
        confe[i] = new Image();
        confe[i].src = "data/interface" + rdres + "/conf/" + i + ".png";
    }
    confeloaded = true;
}
var buloaded = 0;
var bimgdone = [false, false, false, false, false, false];
var bimgfrk = [];
var readcup = 0;
var plimg = [];
var kpimg = [];
var clickmade = false;
var sndp = [];
var sndload = [];
var loptrk = [];
var loptrksrc = [];
var loptrkgn = [];
var lopload = [];
var lopfade = [];
var sndco = null;
var sndgn = null;
var sndcn = false;
try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    sndco = new AudioContext();
    if (!isios) {
        sndgn = sndco.createGain();
        sndgn.connect(sndco.destination);
    }
    for (var i = 0; i < 4; i++) {
        lopload[i] = -1;
        loptrk[i] = new AudioContext();
        if (!isios) {
            loptrkgn[i] = loptrk[i].createGain();
            loptrkgn[i].connect(loptrk[i].destination);
        }
        lopfade[i] = 0;
    }
    sndcn = true;
} catch (e) {
    sndcn = false;
}
var fisrtsndload = false;
var onk = -1;
var oni = 0;
var onj = 0;

function loaddata() {
    if (!fisrtsndload) {
        var imgstamp = Math.floor(Math.random() * 10000);
        var recimg = new Image();
        recimg.src = "https://radicalplay.com:17602/" + imgstamp + ".gif";
        lopload[1] = 0;
        loadloop("data/soundtrack/loop1.mp3", 1);
        sndload[17] = false;
        loadsnd("data/soundtrack/17.mp3", 17);
        sndload[18] = false;
        loadsnd("data/soundtrack/18.mp3", 18);
        fisrtsndload = true;
    }
    if (onk != -1) {
        var cntlo = 0;
        while ((cntlo < 10) && (onk != -1)) {
            var dt = 17;
            if (onk >= 3) {
                dt = 14;
            }
            var iw = Math.floor((bimg[onk].width / dt));
            var ih = Math.floor((bimg[onk].height / 5));
            var mcanvas = document.createElement('canvas');
            mcanvas.width = iw;
            mcanvas.height = ih;
            var mrd = mcanvas.getContext('2d');
            if ((oni == 0) && (onj == 0)) {
                bimgfrk[onk] = [];
                buloaded += 10;
            }
            if (oni < 8) {
                if (onj == 0) {
                    bimgfrk[onk][oni] = [];
                }
                if (onj < dt) {
                    if (oni < 5) {
                        mrd.drawImage(bimg[onk], -(onj * iw), -(oni * ih));
                    } else {
                        mrd.translate(iw, 0);
                        mrd.scale(-1, 1);
                        mrd.drawImage(bimg[onk], -(onj * iw), -((8 - oni) * ih));
                    }
                    bimgfrk[onk][oni][onj] = new Image();
                    bimgfrk[onk][oni][onj].src = mcanvas.toDataURL("image/png");
                    buloaded++;
                    onj++;
                }
            }
            if (onj == dt) {
                oni++;
                if (oni == 8) {
                    bimgdone[onk] = true;
                    onk = -1;
                } else {
                    onj = 0;
                }
            }
            cntlo++;
        }
    }
    if (onk == -1) {
        for (var k = 0; k < 6; k++) {
            if ((!bimgdone[k]) && (bimg[k].width)) {
                onk = k;
                oni = 0;
                onj = 0;
            }
        }
    }
    var ndone = 0;
    for (var k = 0; k < 6; k++) {
        if (bimgdone[k]) {
            ndone++;
        }
    }
    if ((ndone == 6) && (readcup == 0)) {
        readcup = 1;
        loadcup();
    }
    if (gameorigin != "y8") {
        rd.fillStyle = "#DDFAFF";
        rd.fillRect(0, 0, canw, canh);
        var fm = ((mw + mh) * 0.5);
        rd.drawImage(rad, ((canw * 0.5) - (254 * fm)), (167 * mh), (507 * fm), (169 * fm));
        if (gameorigin == "crazygames" || gameorigin == "crazygamesa") {
            rd.fillStyle = "#3C1E6E";
            rd.fillRect(0, 0, canw, ((135 * fm) + (20 * mh)));
            rd.drawImage(xlogo, ((canw * 0.5) - (200 * fm)), (10 * mh), (400 * fm), (135 * fm));
        }
    } else {
        rd.fillStyle = "#FFFFFF";
        rd.fillRect(0, 0, canw, canh);
        var fm = ((mw + mh) * 0.5);
        rd.drawImage(xlogo, ((canw * 0.5) - (126 * fm)), (167 * mh), (252 * fm), (142 * fm));
    }
    rd.fillStyle = "#003A44";
    rd.font = "" + (17 * (mh + mw)) + "px TekoSkills";
    rd.textAlign = "center";
    rd.textBaseline = "top";
    rd.fillText("LOADING... " + Math.round((buloaded / 860) * 100) + "%", (canw * 0.5), (430 * mh));
    rd.fillStyle = "#008FCA";
    rd.fillRect(((canw * 0.5) - (100 * mw)), ((430 * mh) + (35 * fm)), (200 * mw * (buloaded / 860)), (24 * mh));
    rd.strokeStyle = "#00BCC8";
    rd.strokeRect(((canw * 0.5) - (100 * mw)), ((430 * mh) + (35 * fm)), (200 * mw), (24 * mh));
    if ((ndone == 6) && (readcup == 2)) {
        lopload[0] = 0;
        loadloop("data/soundtrack/loop0.mp3", 0);
        lopload[2] = 0;
        loadloop("data/soundtrack/loop2.mp3", 2);
        for (var i = 0; i < 17; i++) {
            sndload[i] = false;
            loadsnd("data/soundtrack/" + i + ".mp3", i);
        }
        fase = 1;
    }
}
var frontname = "";
var dispname = "";
var ntm = 0;
var team = [];
var teamtats = [];
var teamflag = [];

function loadcup() {
    frontname = "Euro Cup Edition";
    dispname = "Euro Cup";
    ntm = 24;
    team[0] = "Austria";
    teamtats[0] = 80;
    team[1] = "Belgium";
    teamtats[1] = 92;
    team[2] = "Croatia";
    teamtats[2] = 78;
    team[3] = "Czech Republic";
    teamtats[3] = 82;
    team[4] = "Denmark";
    teamtats[4] = 94;
    team[5] = "England";
    teamtats[5] = 98;
    team[6] = "Finland";
    teamtats[6] = 68;
    team[7] = "France";
    teamtats[7] = 88;
    team[8] = "Germany";
    teamtats[8] = 86;
    team[9] = "Hungary";
    teamtats[9] = 62;
    team[10] = "Italy";
    teamtats[10] = 100;
    team[11] = "Netherlands";
    teamtats[11] = 82;
    team[12] = "North Macedonia";
    teamtats[12] = 54;
    team[13] = "Poland";
    teamtats[13] = 60;
    team[14] = "Portugal";
    teamtats[14] = 84;
    team[15] = "Russia";
    teamtats[15] = 64;
    team[16] = "Scotland";
    teamtats[16] = 58;
    team[17] = "Slovakia";
    teamtats[17] = 66;
    team[18] = "Spain";
    teamtats[18] = 96;
    team[19] = "Sweden";
    teamtats[19] = 76;
    team[20] = "Switzerland";
    teamtats[20] = 90;
    team[21] = "Turkey";
    teamtats[21] = 56;
    team[22] = "Ukraine";
    teamtats[22] = 80;
    team[23] = "Wales";
    teamtats[23] = 70;
    for (var i = 0; i < ntm; i++) {
        teamflag[i] = new Image();
        teamflag[i].src = "cups/" + cupname + "/flags" + rdres + "/" + team[i].replace(' ', '-') + ".png";
    }
    buloaded += 56;
    readcup = 2;
}

function loadsnd(url, num) {
    if (!sndcn) {
        sndp[num] = new Audio(url);
        sndload[num] = true;
    } else {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';
        request.onload = function() {
            sndco.decodeAudioData(request.response, function(buffer) {
                sndp[num] = buffer;
            }, onError);
            sndload[num] = true;
        };
        request.send();
    }
}

function loadloop(url, num) {
    if (!sndcn) {
        loptrk[num] = new Audio(url);
        lopload[num] = 1;
    } else {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';
        request.onload = function() {
            loptrk[num].decodeAudioData(request.response, function(buffer) {
                loptrksrc[num] = loptrk[num].createBufferSource();
                loptrksrc[num].buffer = buffer;
            }, onError);
            if (isios) {
                lopload[num] = 11;
            } else {
                lopload[num] = 1;
            }
        };
        request.send();
    }
}

function onError() {}

function playsnd(num, vol) {
    if ((!mutegame) && (!mutemusic || fase == 6)) {
        if (!sndcn) {
            sndp[num].volume = vol;
            sndp[num].currentTime = 0;
            sndp[num].play();
        } else {
            if (sndload[num]) {
                if ((num <= 11) || (num >= 17)) {
                    var source = sndco.createBufferSource();
                    source.buffer = sndp[num];
                    if (!isios) {
                        sndgn.gain.value = vol;
                        source.connect(sndgn);
                    } else {
                        source.connect(sndco.destination);
                    }
                    source.start(0);
                } else {
                    var source = loptrk[0].createBufferSource();
                    source.buffer = sndp[num];
                    source.connect(loptrk[0].destination);
                    source.start(0);
                }
            }
        }
    }
}
var cntdrp = 0;

function playlop(num) {
    if (clickmade) {
        if (!sndcn) {
            loptrk[num].play();
            loptrk[num].volume = 1;
            loptrk[num].loop = true;
            lopload[num] = 2;
            lopfade[num] = 100;
        } else {
            if (lopload[num] == 3) {
                if (!isios) {
                    loptrkgn[num].gain.value = 1;
                }
                loptrk[num].resume();
                lopload[num] = 2;
                lopfade[num] = 100;
            }
            if (lopload[num] == 1) {
                try {
                    if (!isios) {
                        loptrkgn[num].gain.value = 1;
                        loptrksrc[num].connect(loptrkgn[num]);
                    } else {
                        loptrksrc[num].connect(loptrk[num].destination);
                    }
                    loptrksrc[num].loop = true;
                    loptrksrc[num].start(0);
                    lopload[num] = 2;
                    lopfade[num] = 100;
                } catch (e) {}
            }
            if (lopload[num] == 11) {
                loptrksrc[num].connect(loptrk[num].destination);
                loptrksrc[num].loop = true;
                loptrksrc[num].start(0);
                lopload[num] = 14;
                cntdrp = 20;
            }
        }
    }
}

function pauselop(num) {
    if (lopload[num] == 2) {
        if (!sndcn) {
            loptrk[num].pause();
        } else {
            if (!isios) {
                loptrkgn[num].gain.value = 0;
            }
            loptrk[num].suspend();
        }
        lopload[num] = 3;
    }
}

function fadelop(num) {
    if (lopload[num] == 2) {
        if (isios) {
            lopfade[num] = 0;
        }
        if (lopfade[num] == 0) {
            if (!sndcn) {
                loptrk[num].pause();
            } else {
                loptrk[num].suspend();
            }
            lopload[num] = 3;
        } else {
            if (!sndcn) {
                loptrk[num].volume = (lopfade[num] / 100);
            } else {
                loptrkgn[num].gain.value = (lopfade[num] / 100);
            }
            lopfade[num]--;
        }
    }
}
var ont = 0;
var loadteam = [1, 1];
var npli = 0;
var inpli = 0;
var ilaodedteam = "";
var loaded = 0;
var textlines = [];

function readteam(typ, name) {
    var file = "cups/" + cupname + "/" + name.replace(' ', '-') + ".txt";
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                textlines[typ] = allText.split('\n');
                loadteam[typ] = 4;
                loaded += 12;
            }
        }
    };
    rawFile.send(null);
}
var clashco = [0, 0];
var shirt = [0, 0, 0];
var short = [0, 0, 0];
var socks = [0, 0, 0];
var kpshirt = [0, 0, 0];
var kpgloves = [0, 0, 0];
var kpsocks = [0, 0, 0];
var readl = 0;

function maketeam(typ) {
    var clash = false;
    if (loadteam[typ] == 4) {
        if (typ == 0) {
            for (var i = 0; i < npli; i++) {
                plimg[i] = null;
            }
            npli = 0;
        } else {
            for (var i = inpli; i < npli; i++) {
                plimg[i] = null;
            }
            npli = inpli;
        }
        kpimg[typ] = null;
        for (var l = 0; l < textlines[typ].length; l++) {
            var line = textlines[typ][l].trim();
            if (strtsWith(line, "plan(")) {
                for (var k = 0; k < 3; k++) {
                    plan[typ][k] = getFuncIntValue('plan', line, k);
                }
            }
            if (strtsWith(line, "planpos(")) {
                planpos[typ] = getFuncIntValue('planpos', line, 0);
            }
            if (!clash) {
                if (strtsWith(line, "shirt")) {
                    for (var k = 0; k < 3; k++) {
                        shirt[k] = getFuncIntValue('shirt', line, k);
                    }
                    if (typ == 0) {
                        clashco[0] = shirt[0];
                        clashco[1] = shirt[2];
                    }
                    if (typ == 1) {
                        if (clashco[1] < 15) {
                            if ((Math.abs(shirt[0] - clashco[0]) < 15) && (shirt[2] <= 15)) {
                                clash = true;
                            }
                        }
                        if (clashco[1] >= 15) {
                            if (shirt[2] >= 15) {
                                clash = true;
                            }
                        }
                    }
                }
                if (strtsWith(line, "short")) {
                    for (var k = 0; k < 3; k++) {
                        short[k] = getFuncIntValue('short', line, k);
                    }
                }
                if (strtsWith(line, "socks")) {
                    for (var k = 0; k < 3; k++) {
                        socks[k] = getFuncIntValue('socks', line, k);
                    }
                }
            } else {
                if (strtsWith(line, "clash-shirt")) {
                    for (var k = 0; k < 3; k++) {
                        shirt[k] = getFuncIntValue('clash-shirt', line, k);
                    }
                }
                if (strtsWith(line, "clash-short")) {
                    for (var k = 0; k < 3; k++) {
                        short[k] = getFuncIntValue('clash-short', line, k);
                    }
                }
                if (strtsWith(line, "clash-socks")) {
                    for (var k = 0; k < 3; k++) {
                        socks[k] = getFuncIntValue('clash-socks', line, k);
                    }
                }
            }
            if (strtsWith(line, "keeper-shirt")) {
                for (var k = 0; k < 3; k++) {
                    kpshirt[k] = getFuncIntValue('keeper-shirt', line, k);
                }
            }
            if (strtsWith(line, "keeper-gloves")) {
                for (var k = 0; k < 3; k++) {
                    kpgloves[k] = getFuncIntValue('keeper-gloves', line, k);
                }
            }
            if (strtsWith(line, "keeper-socks")) {
                for (var k = 0; k < 3; k++) {
                    kpsocks[k] = getFuncIntValue('keeper-socks', line, k);
                }
            }
        }
        loadteam[typ] = 5;
        readl = 0;
    }
    if (loadteam[typ] == 5) {
        var foundline = false;
        while ((readl < textlines[typ].length) && (!foundline)) {
            var line = textlines[typ][readl].trim();
            if (strtsWith(line, "newplayer")) {
                var p = (getFuncIntValue("newplayer", line, 0) + (10 * typ));
                pli[p] = npli;
                var skintone = getFuncIntValue("newplayer", line, 1);
                var hairtype = getFuncIntValue("newplayer", line, 2);
                var haircolor = getFuncIntValue("newplayer", line, 3);
                var hairtone = getFuncIntValue("newplayer", line, 4);
                plimg[pli[p]] = [];
                for (var i = 0; i < 8; i++) {
                    plimg[pli[p]][i] = [];
                    for (var j = 0; j < 17; j++) {
                        plimg[pli[p]][i][j] = null;
                        var iw = bimgfrk[hairtype][i][j].width;
                        var ih = bimgfrk[hairtype][i][j].height;
                        if (iw > 0) {
                            var clcanvas = document.createElement('canvas');
                            clcanvas.width = iw;
                            clcanvas.height = ih;
                            var drc = clcanvas.getContext('2d');
                            drc.drawImage(bimgfrk[hairtype][i][j], 0, 0);
                            var crd = drc.getImageData(0, 0, iw, ih);
                            for (var k = 0; k < (iw * ih * 4); k += 4) {
                                if (crd.data[3 + k] != 0) {
                                    var hsb = rgbToHsl(crd.data[(0 + k)], crd.data[(1 + k)], crd.data[(2 + k)]);
                                    var hue = Math.round(hsb[0] * 255);
                                    if ((hue > 22) && (hue <= 66)) {
                                        hsb[0] = (haircolor / 255);
                                        hsb[1] *= 0.8;
                                        hsb[2] *= (hairtone / 10);
                                    }
                                    if ((hue > 188) && (hue <= 236)) {
                                        hsb[0] = 0.1;
                                        hsb[1] *= 0.6;
                                        hsb[2] *= (skintone / 10);
                                    }
                                    if ((hue > 66) && (hue <= 125)) {
                                        hsb[0] = (shirt[0] / 255);
                                        hsb[1] *= (shirt[1] / 10);
                                        hsb[2] *= (shirt[2] / 10);
                                    }
                                    if ((hue > 125) && (hue <= 188)) {
                                        hsb[0] = (short[0] / 255);
                                        hsb[1] *= (short[1] / 10);
                                        hsb[2] *= (short[2] / 10);
                                    }
                                    if ((hue <= 22) || (hue > 236)) {
                                        hsb[0] = (socks[0] / 255);
                                        hsb[1] *= (socks[1] / 10);
                                        hsb[2] *= (socks[2] / 10);
                                    }
                                    if (hsb[0] > 1) {
                                        hsb[0] = 1;
                                    }
                                    if (hsb[1] > 1) {
                                        hsb[1] = 1;
                                    }
                                    if (hsb[2] > 1) {
                                        hsb[2] = 1;
                                    }
                                    var rgb = hslToRgb(hsb[0], hsb[1], hsb[2]);
                                    crd.data[0 + k] = rgb[0];
                                    crd.data[1 + k] = rgb[1];
                                    crd.data[2 + k] = rgb[2];
                                }
                            }
                            var dcanvas = document.createElement('canvas');
                            dcanvas.width = iw;
                            dcanvas.height = ih;
                            var drd = dcanvas.getContext('2d');
                            drd.putImageData(crd, 0, 0);
                            plimg[pli[p]][i][j] = new Image();
                            plimg[pli[p]][i][j].src = dcanvas.toDataURL("image/png");
                        }
                    }
                    loaded++;
                }
                npli++;
                foundline = true;
            }
            if (strtsWith(line, "playercopy")) {
                var p = (getFuncIntValue("playercopy", line, 0) + (10 * typ));
                var cp = (getFuncIntValue("playercopy", line, 1) + (10 * typ));
                pli[p] = pli[cp];
                loaded += 8;
                foundline = true;
            }
            if (strtsWith(line, "keeper(")) {
                var skintone = getFuncIntValue("keeper", line, 0);
                var hairtype = getFuncIntValue("keeper", line, 1);
                var haircolor = getFuncIntValue("keeper", line, 2);
                var hairtone = getFuncIntValue("keeper", line, 3);
                kpimg[typ] = [];
                for (var i = 0; i < 8; i++) {
                    kpimg[typ][i] = [];
                    for (var j = 0; j < 14; j++) {
                        kpimg[typ][i][j] = null;
                        var iw = bimgfrk[(hairtype + 3)][i][j].width;
                        var ih = bimgfrk[(hairtype + 3)][i][j].height;
                        if (iw > 0) {
                            var clcanvas = document.createElement('canvas');
                            clcanvas.width = iw;
                            clcanvas.height = ih;
                            var drc = clcanvas.getContext('2d');
                            drc.drawImage(bimgfrk[(hairtype + 3)][i][j], 0, 0);
                            var crd = drc.getImageData(0, 0, iw, ih);
                            for (var k = 0; k < (iw * ih * 4); k += 4) {
                                if (crd.data[3 + k] != 0) {
                                    var hsb = rgbToHsl(crd.data[(0 + k)], crd.data[(1 + k)], crd.data[(2 + k)]);
                                    var hue = Math.round(hsb[0] * 255);
                                    if ((hue > 22) && (hue <= 66)) {
                                        hsb[0] = (haircolor / 255);
                                        hsb[1] *= 0.8;
                                        hsb[2] *= (hairtone / 10);
                                    }
                                    if ((hue > 188) && (hue <= 236)) {
                                        hsb[0] = 0.1;
                                        hsb[1] *= 0.6;
                                        hsb[2] *= (skintone / 10);
                                    }
                                    if ((hue > 66) && (hue <= 125)) {
                                        hsb[0] = (kpshirt[0] / 255);
                                        hsb[1] *= (kpshirt[1] / 10);
                                        hsb[2] *= (kpshirt[2] / 10);
                                    }
                                    if ((hue > 125) && (hue <= 188)) {
                                        hsb[0] = (kpgloves[0] / 255);
                                        hsb[1] *= (kpgloves[1] / 10);
                                        hsb[2] *= (kpgloves[2] / 10);
                                    }
                                    if ((hue <= 22) || (hue > 236)) {
                                        hsb[0] = (kpsocks[0] / 255);
                                        hsb[1] *= (kpsocks[1] / 10);
                                        hsb[2] *= (kpsocks[2] / 10);
                                    }
                                    if (hsb[0] > 1) {
                                        hsb[0] = 1;
                                    }
                                    if (hsb[1] > 1) {
                                        hsb[1] = 1;
                                    }
                                    if (hsb[2] > 1) {
                                        hsb[2] = 1;
                                    }
                                    var rgb = hslToRgb(hsb[0], hsb[1], hsb[2]);
                                    crd.data[0 + k] = rgb[0];
                                    crd.data[1 + k] = rgb[1];
                                    crd.data[2 + k] = rgb[2];
                                }
                            }
                            var dcanvas = document.createElement('canvas');
                            dcanvas.width = iw;
                            dcanvas.height = ih;
                            var drd = dcanvas.getContext('2d');
                            drd.putImageData(crd, 0, 0);
                            kpimg[typ][i][j] = new Image();
                            kpimg[typ][i][j].src = dcanvas.toDataURL("image/png");
                        }
                    }
                    loaded++;
                }
                foundline = true;
            }
            readl++;
        }
        if (!foundline) {
            loadteam[typ] = 0;
            if (typ == 0) {
                inpli = npli;
                ilaodedteam = team[tsel[0]];
            }
        }
    }
}

function hslToRgb(h, s, l) {
    var r, g, b;
    if (s == 0) {
        r = g = b = l;
    } else {
        var hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    if (max == min) {
        h = s = 0;
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return [h, s, l];
}

function strtsWith(line, sval) {
    return (line.substring(0, sval.length) == sval);
}

function getFuncIntValue(func, strn, indx) {
    var ret = -1;
    try {
        var w = 0,
            c = 0,
            got = 0;
        var o = "",
            r = "";
        w = (func.length + 1);
        while ((w < strn.length) && (got != 2)) {
            o = "" + strn.charAt(w);
            if (o == "," || o == ")") {
                c++;
                if (got == 1 || c > indx) {
                    got = 2;
                }
            } else {
                if (c == indx) {
                    r += o;
                    got = 1;
                }
            }
            w++;
        }
        if (r == "") {
            r = "-1";
        }
        ret = parseInt(r);
        var rrc = "" + ret;
        if (rrc == "NaN") {
            ret = -1;
        }
    } catch (err) {
        ret = -1;
    }
    return ret;
}

function getFuncStringValue(func, strn, indx) {
    var ret = "";
    try {
        var w = 0,
            c = 0,
            got = 0;
        var o = "",
            r = "";
        w = (func.length + 1);
        while ((w < strn.length) && (got != 2)) {
            o = "" + strn.charAt(w);
            if (o == "," || o == ")") {
                c++;
                if (got == 1 || c > indx) {
                    got = 2;
                }
            } else {
                if (c == indx) {
                    r += o;
                    got = 1;
                }
            }
            w++;
        }
        ret = r;
    } catch (err) {
        ret = "";
    }
    return ret;
}

function getIntValue(strn, indx) {
    var ret = -1;
    try {
        var w = 0,
            c = 0,
            got = 0;
        var o = "",
            r = "";
        while ((w < strn.length) && (got != 2)) {
            o = "" + strn.charAt(w);
            if (o == "|") {
                c++;
                if (got == 1 || c > indx) {
                    got = 2;
                }
            } else {
                if (c == indx) {
                    r += o;
                    got = 1;
                }
            }
            w++;
        }
        if (r == "") {
            r = "-1";
        }
        ret = parseInt(r);
        var rrc = "" + ret;
        if (rrc == "NaN") {
            ret = -1;
        }
    } catch (err) {
        ret = -1;
    }
    return ret;
}

function getStringValue(strn, indx) {
    var ret = "";
    try {
        var w = 0,
            c = 0,
            got = 0;
        var o = "",
            r = "";
        while ((w < strn.length) && (got != 2)) {
            o = "" + strn.charAt(w);
            if (o == "|") {
                c++;
                if (got == 1 || c > indx) {
                    got = 2;
                }
            } else {
                if (c == indx) {
                    r += o;
                    got = 1;
                }
            }
            w++;
        }
        ret = r;
    } catch (err) {
        ret = "";
    }
    return ret;
}
var adpause = false;
var atemptad = 0;
var sw = 0,
    sh = 0;
var canw = 1280,
    canh = 720;
var mw = 1,
    mh = 1;
var totime = 0,
    nfr = 0,
    actat = 20,
    ltime = -1;
var fase = 0;
var needrotate = false;
var valout = "";

function gamerun() {
    if (sw != window.innerWidth || sh != window.innerHeight) {
        sw = window.innerWidth;
        sh = window.innerHeight;
        mw = 1;
        mh = 1;
        canw = sw;
        mw = (canw / 1280);
        canh = sh;
        mh = (canh / 720);
        cx = (canw * 0.5);
        cy = (canh * 0.5);
        cz = 50;
        canvasElement.width = canw;
        canvasElement.height = canh;
        canvasElement.style.width = "" + canw + "px";
        canvasElement.style.height = "" + canh + "px";
        camdist = (camodist * ((mw + mh) / 2));
        rd.font = "" + (40 * ((mh + mw) * 0.5)) + "px TekoSkills";
        rd.textAlign = "left";
        rd.textBaseline = "middle";
        if (checkrotate) {
            if ((canw / canh) <= 1.32) {
                if (!needrotate) {
                    needrotate = true;
                }
            } else {
                if (needrotate) {
                    needrotate = false;
                }
            }
        }
    }
    if (fase == 0) {
        loaddata();
    }
    if (fase == 1) {
        drawface();
    }
    if (fase == 2) {
        selecteam();
    }
    if (fase == 3) {
        drawcup();
    }
    if (fase == 4) {
        drawabout();
    }
    if (fase == 5) {
        creategame();
    }
    if (fase == 7) {
        drawpause();
    }
    if (fase == 8) {
        drawcontrols();
    }
    if (fase == 9) {
        transout();
    }
    if (fase == 10) {
        drawendgame();
    }
    if (fase == 11) {
        transin();
    }
    if ((fase == 6) && (!adpause)) {
        malab();
        if (!onreplay) {
            soccerisagame();
            recordframe();
            if (lopload[2] == 2) {
                fadelop(2);
            }
        } else {
            replayframes();
            if ((!mutemusic) && (!mutegame)) {
                if (lopload[2] == 1 || lopload[2] == 3) {
                    playlop(2);
                }
            }
        }
        drawall();
        drawflexs();
        if (!mutegame) {
            if (lopload[0] == 1 || lopload[0] == 3) {
                if (nt == 2) {
                    playlop(0);
                }
            }
        } else {
            if (lopload[0] == 2) {
                pauselop(0);
            }
        }
    } else {
        if (lopload[0] == 2) {
            if (fase == 7 || adpause) {
                pauselop(0);
            } else {
                fadelop(0);
            }
        }
    }
    if (gameorigin == "gamedist" || gameorigin == "crazygames" || gameorigin == "home") {
        if (fase == 5) {
            if ((typeof gdsdk !== 'undefined') && (gdsdk.showBanner !== 'undefined') && (atemptad == 2)) {
                gdsdk.showBanner();
            }
            atemptad = 1;
        } else {
            if (atemptad == 1) {
                atemptad = 2;
            }
        }
    }
    if (gameorigin == "crazygamesa") {
        if (fase == 5) {
            if (atemptad == 2) {
                crazysdk.requestAd('midgame');
                adpause = true;
            }
            atemptad = 1;
        } else {
            if (atemptad == 1) {
                atemptad = 2;
            }
        }
    }
    if ((fase != 0) && (fase != 6) && (fase != 7) && (fase != 8) && (!woncup) && (!mutemusic) && (!mutegame) && (!adpause)) {
        if (lopload[1] == 1 || lopload[1] == 3) {
            playlop(1);
        }
    } else {
        if (lopload[1] == 2) {
            if ((!mutemusic) && (!adpause)) {
                fadelop(1);
            } else {
                pauselop(1);
            }
        }
    }
    if ((woncup) && (!mutegame)) {
        if (lopload[3] == 1 || lopload[3] == 3) {
            playlop(3);
        }
    } else {
        if (lopload[3] == 2) {
            fadelop(3);
        }
    }
    if (fase == 7 || mutegame) {
        if (lopload[1] == 2) {
            pauselop(1);
        }
        if (lopload[2] == 2) {
            pauselop(2);
        }
    }
    if (isios) {
        if (lopload[2] == 14) {
            cntdrp--;
            if (cntdrp <= 0) {
                lopload[2] = 2;
                pauselop(2);
            }
        }
        if (lopload[3] == 14) {
            cntdrp--;
            if (cntdrp <= 0) {
                lopload[3] = 2;
                pauselop(3);
            }
        }
    }
    if ((needrotate) && (rosize != null)) {
        rd.fillStyle = "#000000";
        rd.fillRect(0, 0, canw, canh);
        var rwd = rosize.width;
        var rhd = rosize.height;
        if (rwd > canw) {
            rhd = (rhd * (canw / rwd));
            rwd = canw;
        }
        rd.drawImage(rosize, ((canw * 0.5) - (rwd * 0.5)), ((canh * 0.5) - (rhd * 0.5)), rwd, rhd);
    }
    if (onaclk) {
        onaclk--;
    }
    if (mclick) {
        mclick = false;
    }
    var date = new Date();
    var ctime = date.getTime();
    if (ltime == -1) {
        totime = 20;
    } else {
        totime += (ctime - ltime);
    }
    ltime = ctime;
    nfr++;
    if (nfr == 5) {
        if (totime > 100) {
            actat--;
            if (actat < 5) {
                actat = 5;
            }
        } else {
            actat++;
        }
        totime = 0;
        nfr = 0;
    }
    setTimeout("gamerun()", actat);
}
var focus_point = 1000;
var camx = 0,
    camy = 0,
    camz = 0;
var cx = 0,
    cy = 0,
    cz = 0;
var camdist = 740;
var camodist = 740;
var camzy = 40;
var camxz = 0;
var mcos = [];
var msin = [];
for (var i = 0; i < 360; i++) {
    mcos[i] = Math.cos(i * Math.PI / 180);
    msin[i] = Math.sin(i * Math.PI / 180);
}
var xp = [];
var zp = [];
var yp = [];
var np = 0;
var xpd = [];
var ypd = [];

function malab() {
    rd.fillStyle = "#003300";
    rd.fillRect(0, 0, canw, canh);
    var cxgo = xgo[0];
    var czgo = zgo[0];
    if (bont == 1) {
        cxgo = blx;
        czgo = blz;
    }
    if (!onreplay) {
        if ((goal < 40) || (nt == 1)) {
            var blonvc = 0;
            if (!centara) {
                if (side == 0) {
                    blonvc = ((1400 - blx) / 10);
                    if (blonvc < 0) {
                        blonvc = 0;
                    }
                }
                if (side == 1) {
                    blonvc = -(blx / 10);
                    if (blonvc > 0) {
                        blonvc = 0;
                    }
                }
            }
            if (!out) {
                camx -= ((camx - ((camdist * mcos[camzy] * msin[camxz]) + cx - ((blx + cxgo) / 2) - blonvc)) / 10);
                camz -= ((camz - ((camdist * mcos[camzy] * mcos[camxz]) + cz - ((blz + czgo) / 2))) / 10);
            } else {
                if (out < 100) {
                    camx -= ((camx - ((camdist * mcos[camzy] * msin[camxz]) + cx - ((outx + blx) / 2))) / 20);
                    camz -= ((camz - ((camdist * mcos[camzy] * mcos[camxz]) + cz - ((outz + blz) / 2))) / 20);
                } else {
                    var adone = 0;
                    if (out == 105 || out == 101) {
                        adone = 1;
                    } else {
                        blonvc = 0;
                    }
                    camx -= ((camx - ((camdist * mcos[camzy] * msin[camxz]) + cx - ((blx + (cxgo * (2 + adone))) / (3 + adone)) - blonvc)) / 10);
                    camz -= ((camz - ((camdist * mcos[camzy] * mcos[camxz]) + cz - ((blz + (czgo * (2 + adone))) / (3 + adone)))) / 10);
                }
            }
        } else {
            if (goal > (glrun + 70)) {
                camx -= ((camx - ((camdist * mcos[camzy] * msin[camxz]) + cx - ((plx[onp[glt]] + blx) / 2))) / 40);
                camz -= ((camz - ((camdist * mcos[camzy] * mcos[camxz]) + cz - ((plz[onp[glt]] + blz) / 2))) / 40);
            } else {
                camx -= ((camx - ((camdist * mcos[camzy] * msin[camxz]) + cx - plx[onp[glt]])) / 40);
                camz -= ((camz - ((camdist * mcos[camzy] * mcos[camxz]) + cz - plz[onp[glt]])) / 40);
            }
        }
    } else {
        camx -= ((camx - ((camdist * mcos[camzy] * msin[camxz]) + cx - blx)) / 20);
        camz -= ((camz - ((camdist * mcos[camzy] * mcos[camxz]) + cz - blz)) / 20);
    }
    camy = ((camdist * msin[camzy]) + cy - (bly / 3));
    var lit = false;
    for (var i = 0; i < 14; i++) {
        xp = [(i * 100), (100 + (i * 100)), (100 + (i * 100)), (i * 100)];
        zp = [0, 0, 920, 920];
        yp = [0, 0, 0, 0];
        np = 4;
        xpd = [];
        ypd = [];
        calcdraw(xp, yp, zp, np, xpd, ypd);
        if (lit) {
            rd.fillStyle = "#006600";
            lit = false;
        } else {
            rd.fillStyle = "#005500";
            lit = true;
        }
        drawpoly(xpd, ypd, np);
    }
    rd.globalAlpha = 0.7;
    rd.strokeStyle = "#ffffff";
    var angs = 0,
        arcs = 0;
    while (arcs < 10) {
        xp = [];
        zp = [];
        yp = [];
        for (var i = 0; i < 3; i++) {
            if (angs >= 360) {
                angs -= 360;
            }
            xp[i] = (700 + (130 * mcos[angs]));
            zp[i] = (460 - (130 * msin[angs]));
            yp[i] = 0;
            if (i != 2) {
                angs += 18;
            }
        }
        xpd = [];
        ypd = [];
        if (calcdraw(xp, yp, zp, 3, xpd, ypd)) {
            rd.lineWidth = (1000 / zp[1]);
            magicArc(xpd, ypd);
        }
        arcs++;
    }
    var vert = 0;
    var horz = 0;
    for (var j = 0; j < 3; j++) {
        for (var i = 0; i < 10; i++) {
            xp = [horz, horz];
            zp = [vert, (vert + 92)];
            yp = [0, 0];
            vert += 92;
            xpd = [];
            ypd = [];
            if (calcdraw(xp, yp, zp, 2, xpd, ypd)) {
                rd.lineWidth = (2000 / (zp[0] + zp[1]));
                drawline(xpd, ypd);
            }
        }
        horz += 700;
        vert = 0;
    }
    vert = 0;
    horz = 0;
    for (var j = 0; j < 2; j++) {
        for (var i = 0; i < 14; i++) {
            xp = [horz, (horz + 100)];
            zp = [vert, vert];
            yp = [0, 0];
            horz += 100;
            xpd = [];
            ypd = [];
            if (calcdraw(xp, yp, zp, 2, xpd, ypd)) {
                rd.lineWidth = (2000 / (zp[0] + zp[1]));
                drawline(xpd, ypd);
            }
        }
        vert += 920;
        horz = 0;
    }
    vert = 260;
    horz = 200;
    for (var j = 0; j < 2; j++) {
        for (var i = 0; i < 4; i++) {
            xp = [horz, horz];
            zp = [vert, (vert + 100)];
            yp = [0, 0];
            vert += 100;
            xpd = [];
            ypd = [];
            if (calcdraw(xp, yp, zp, 2, xpd, ypd)) {
                rd.lineWidth = (2000 / (zp[0] + zp[1]));
                drawline(xpd, ypd);
            }
        }
        horz += 1000;
        vert = 260;
    }
    vert = 260;
    horz = 0;
    for (var j = 0; j < 4; j++) {
        for (var i = 0; i < 2; i++) {
            xp = [horz, (horz + 100)];
            zp = [vert, vert];
            yp = [0, 0];
            horz += 100;
            xpd = [];
            ypd = [];
            if (calcdraw(xp, yp, zp, 2, xpd, ypd)) {
                rd.lineWidth = (2000 / (zp[0] + zp[1]));
                drawline(xpd, ypd);
            }
        }
        if (j == 0) {
            horz += 1000;
        }
        if (j == 1) {
            vert = 660;
            horz = 0;
        }
        if (j == 2) {
            horz += 1000;
        }
    }
    vert = 360;
    horz = 70;
    for (var j = 0; j < 2; j++) {
        for (var i = 0; i < 2; i++) {
            xp = [horz, horz];
            zp = [vert, (vert + 100)];
            yp = [0, 0];
            vert += 100;
            xpd = [];
            ypd = [];
            if (calcdraw(xp, yp, zp, 2, xpd, ypd)) {
                rd.lineWidth = (2000 / (zp[0] + zp[1]));
                drawline(xpd, ypd);
            }
        }
        horz += 1260;
        vert = 360;
    }
    vert = 360;
    horz = 0;
    for (var j = 0; j < 4; j++) {
        xp = [horz, (horz + 70)];
        zp = [vert, vert];
        yp = [0, 0];
        xpd = [];
        ypd = [];
        if (calcdraw(xp, yp, zp, 2, xpd, ypd)) {
            rd.lineWidth = (2000 / (zp[0] + zp[1]));
            drawline(xpd, ypd);
        }
        if (j == 0) {
            horz += 1330;
        }
        if (j == 1) {
            vert = 560;
            horz = 0;
        }
        if (j == 2) {
            horz += 1330;
        }
    }
    angs = 30;
    arcs = 0;
    while (arcs < 4) {
        xp = [];
        zp = [];
        yp = [];
        for (var i = 0; i < 3; i++) {
            if (angs >= 360) {
                angs -= 360;
            }
            xp[i] = (1265 - (130 * msin[angs]));
            zp[i] = (460 + (130 * mcos[angs]));
            yp[i] = 0;
            if (i != 2) {
                angs += 15;
            }
        }
        xpd = [];
        ypd = [];
        if (calcdraw(xp, yp, zp, 3, xpd, ypd)) {
            rd.lineWidth = (1000 / zp[1]);
            magicArc(xpd, ypd);
        }
        arcs++;
    }
    angs = 30;
    arcs = 0;
    while (arcs < 4) {
        xp = [];
        zp = [];
        yp = [];
        for (var i = 0; i < 3; i++) {
            if (angs >= 360) {
                angs -= 360;
            }
            xp[i] = (135 + (130 * msin[angs]));
            zp[i] = (460 - (130 * mcos[angs]));
            yp[i] = 0;
            if (i != 2) {
                angs += 15;
            }
        }
        xpd = [];
        ypd = [];
        if (calcdraw(xp, yp, zp, 3, xpd, ypd)) {
            rd.lineWidth = (1000 / zp[1]);
            magicArc(xpd, ypd);
        }
        arcs++;
    }
    rd.globalAlpha = 1;
}

function drawbacknet(typ, impct, imx, imy, imz) {
    if (typ == 0) {
        xp = [1450, 1450];
    }
    if (typ == 1) {
        xp = [-50, -50];
    }
    zp = [391, 529];
    yp = [0, 0];
    np = 2;
    xpd = [];
    ypd = [];
    if (calcdraw(xp, yp, zp, np, xpd, ypd)) {
        rd.strokeStyle = "#808080";
        rd.lineWidth = (3000 / (zp[0] + zp[1]));
        drawline(xpd, ypd);
    }
    rd.strokeStyle = "#b0b0b0";
    var imag = 0;
    if (impct) {
        if (typ == 0) {
            imag = (imx - 1430 - (20 * ((60 + imy) / 60)));
        }
        if (typ == 1) {
            imag = (imx + 30 + (20 * ((60 + imy) / 60)));
        }
    }
    for (var i = 1; i < 12; i++) {
        xp = [];
        if (typ == 0) {
            xp = [(1430 + (i * 1.667)), (1430 + (i * 1.667)), 0];
        }
        if (typ == 1) {
            xp = [(-30 - (i * 1.667)), (-30 - (i * 1.667)), 0];
        }
        zp = [529, 391, 0];
        yp = [(-60 + (i * 5)), (-60 + (i * 5))];
        np = 2;
        if (impct) {
            zp[2] = zp[1];
            zp[1] = imz;
            xp[2] = xp[1];
            yp[2] = yp[1];
            np = 3;
            var imdist = py(imy, yp[1], imz, zp[1]);
            var fact = ((imdist * imdist) / 500);
            if (fact > 1) {
                fact = 1;
            }
            xp[1] += ((1 - fact) * imag);
        }
        xpd = [];
        ypd = [];
        if (calcdraw(xp, yp, zp, np, xpd, ypd)) {
            rd.lineWidth = (1000 / (zp[0] + zp[1]));
            drawline(xpd, ypd);
            if (np == 3) {
                drawline2(xpd, ypd);
            }
        }
    }
    for (var i = 1; i < 27; i++) {
        xp = [];
        if (typ == 0) {
            xp = [1430, 1450, 0];
        }
        if (typ == 1) {
            xp = [-30, -50, 0];
        }
        zp = [(529 - (i * 5.112)), (529 - (i * 5.112)), 0];
        yp = [-60, 0];
        np = 2;
        if (impct) {
            zp[2] = zp[1];
            xp[2] = xp[1];
            if (typ == 0) {
                xp[1] = (1430 + (20 * ((60 + imy) / 60)));
            }
            if (typ == 1) {
                xp[1] = (-30 - (20 * ((60 + imy) / 60)));
            }
            yp[2] = yp[1];
            yp[1] = imy;
            np = 3;
            var imdist = py(imy, yp[1], imz, zp[1]);
            var fact = ((imdist * imdist) / 500);
            if (fact > 1) {
                fact = 1;
            }
            xp[1] += ((1 - fact) * imag);
        }
        xpd = [];
        ypd = [];
        if (calcdraw(xp, yp, zp, np, xpd, ypd)) {
            rd.lineWidth = (1000 / (zp[0] + zp[1]));
            drawline(xpd, ypd);
            if (np == 3) {
                drawline2(xpd, ypd);
            }
        }
    }
}

function drawtopnet(typ) {
    rd.strokeStyle = "#e0e0e0";
    for (var i = 1; i < 7; i++) {
        xp = [];
        if (typ == 0) {
            xp = [(1400 + (i * 5)), (1400 + (i * 5))];
        }
        if (typ == 1) {
            xp = [-(i * 5), -(i * 5)];
        }
        zp = [529, 391];
        yp = [-60, -60];
        np = 2;
        xpd = [];
        ypd = [];
        if (calcdraw(xp, yp, zp, np, xpd, ypd)) {
            rd.lineWidth = (1000 / (zp[0] + zp[1]));
            drawline(xpd, ypd);
        }
    }
    for (var i = 1; i < 27; i++) {
        xp = [];
        if (typ == 0) {
            xp = [1400, 1430];
        }
        if (typ == 1) {
            xp = [0, -30];
        }
        zp = [(529 - (i * 5.112)), (529 - (i * 5.112))];
        yp = [-60, -60];
        np = 2;
        xpd = [];
        ypd = [];
        if (calcdraw(xp, yp, zp, np, xpd, ypd)) {
            rd.lineWidth = (1000 / (zp[0] + zp[1]));
            drawline(xpd, ypd);
        }
    }
    if (typ == 0) {
        xp = [1400, 1400, 1400, 1400];
    }
    if (typ == 1) {
        xp = [0, 0, 0, 0];
    }
    zp = [530, 530, 390, 390];
    yp = [-60, -58, -58, -60];
    np = 4;
    xpd = [];
    ypd = [];
    if (calcdraw(xp, yp, zp, np, xpd, ypd)) {
        rd.fillStyle = "#909090";
        drawpoly(xpd, ypd, np);
    }
    if (typ == 0) {
        xp = [1400, 1402, 1402, 1400];
    }
    if (typ == 1) {
        xp = [0, -2, -2, 0];
    }
    zp = [530, 530, 390, 390];
    yp = [-60, -60, -60, -60];
    np = 4;
    xpd = [];
    ypd = [];
    if (calcdraw(xp, yp, zp, np, xpd, ypd)) {
        rd.fillStyle = "#e0e0e0";
        drawpoly(xpd, ypd, np);
    }
}

function drawsidenet(typ) {
    var zig = 529;
    if (typ == 1 || typ == 3) {
        zig = 391;
    }
    if (typ == 0 || typ == 1) {
        xp = [1400, 1430];
    }
    if (typ == 2 || typ == 3) {
        xp = [0, -30];
    }
    zp = [zig, zig];
    yp = [-60, -60];
    np = 2;
    xpd = [];
    ypd = [];
    if (calcdraw(xp, yp, zp, np, xpd, ypd)) {
        rd.strokeStyle = "#808080";
        rd.lineWidth = (3000 / (zp[0] + zp[1]));
        drawline(xpd, ypd);
    }
    if (typ == 0 || typ == 1) {
        xp = [1400, 1450];
    }
    if (typ == 2 || typ == 3) {
        xp = [0, -50];
    }
    zp = [zig, zig];
    yp = [0, 0];
    np = 2;
    xpd = [];
    ypd = [];
    if (calcdraw(xp, yp, zp, np, xpd, ypd)) {
        rd.strokeStyle = "#808080";
        rd.lineWidth = (3000 / (zp[0] + zp[1]));
        drawline(xpd, ypd);
    }
    if (typ == 0 || typ == 1) {
        xp = [1430, 1450];
    }
    if (typ == 2 || typ == 3) {
        xp = [-30, -50];
    }
    zp = [zig, zig];
    yp = [-60, 0];
    np = 2;
    xpd = [];
    ypd = [];
    if (calcdraw(xp, yp, zp, np, xpd, ypd)) {
        rd.strokeStyle = "#808080";
        rd.lineWidth = (3000 / (zp[0] + zp[1]));
        drawline(xpd, ypd);
    }
    rd.strokeStyle = "#b0b0b0";
    for (var i = 1; i < 10; i++) {
        xp = [];
        if (typ == 0 || typ == 1) {
            xp = [(1400 + (i * 5)), (1400 + (i * 5))];
        }
        if (typ == 2 || typ == 3) {
            xp = [-(i * 5), -(i * 5)];
        }
        zp = [zig, zig];
        yp = [-60, 0];
        if (i > 6) {
            yp[0] += (15 * (i - 6));
        }
        np = 2;
        xpd = [];
        ypd = [];
        if (calcdraw(xp, yp, zp, np, xpd, ypd)) {
            rd.lineWidth = (1000 / (zp[0] + zp[1]));
            drawline(xpd, ypd);
        }
    }
    for (var i = 1; i < 12; i++) {
        xp = [];
        if (typ == 0 || typ == 1) {
            xp = [1400, (1430 + (i * 1.667))];
        }
        if (typ == 2 || typ == 3) {
            xp = [0, (-30 - (i * 1.667))];
        }
        zp = [zig, zig];
        yp = [(-60 + (i * 5)), (-60 + (i * 5))];
        np = 2;
        xpd = [];
        ypd = [];
        if (calcdraw(xp, yp, zp, np, xpd, ypd)) {
            rd.lineWidth = (1000 / (zp[0] + zp[1]));
            drawline(xpd, ypd);
        }
    }
    var fly = 1;
    if ((camxz > 90) && (camxz < 270)) {
        fly = -1;
    }
    if (typ == 0 || typ == 1) {
        xp = [1400, 1402, 1402, 1400];
    }
    if (typ == 2 || typ == 3) {
        xp = [0, -2, -2, 0];
    }
    zp = [(zig - fly), (zig - fly), (zig - fly), (zig - fly)];
    yp = [0, 0, -60, -60];
    np = 4;
    xpd = [];
    ypd = [];
    if (calcdraw(xp, yp, zp, np, xpd, ypd)) {
        rd.fillStyle = "#e0e0e0";
        drawpoly(xpd, ypd, np);
    }
    if (typ == 0 || typ == 1) {
        xp = [1400, 1400, 1400, 1400];
    }
    if (typ == 2 || typ == 3) {
        xp = [0, 0, 0, 0];
    }
    zp = [(zig + 1), (zig - 1), (zig - 1), (zig + 1)];
    yp = [0, 0, -60, -60];
    np = 4;
    xpd = [];
    ypd = [];
    if (calcdraw(xp, yp, zp, np, xpd, ypd)) {
        rd.fillStyle = "#909090";
        drawpoly(xpd, ypd, np);
    }
}

function magicArc(xd, yd) {
    rd.beginPath();
    rd.moveTo(xd[0], yd[0]);
    xd[1] = ((xd[1] * 2) - ((xd[0] + xd[2]) / 2));
    yd[1] = ((yd[1] * 2) - ((yd[0] + yd[2]) / 2));
    rd.quadraticCurveTo(xd[1], yd[1], xd[2], yd[2]);
    rd.stroke();
}

function drawpoly(xd, yd, nd) {
    rd.beginPath();
    rd.moveTo(xd[0], yd[0]);
    for (var i = 1; i < nd; i++) {
        rd.lineTo(xd[i], yd[i]);
    }
    rd.closePath();
    rd.fill();
}

function drawline(xd, yd) {
    rd.beginPath();
    rd.moveTo(xd[0], yd[0]);
    rd.lineTo(xd[1], yd[1]);
    rd.stroke();
}

function drawline2(xd, yd) {
    rd.beginPath();
    rd.moveTo(xd[1], yd[1]);
    rd.lineTo(xd[2], yd[2]);
    rd.stroke();
}

function calcdraw(xp, yp, zp, np, xpd, ypd) {
    for (var p = 0; p < np; p++) {
        xp[p] += camx;
        yp[p] += camy;
        zp[p] += camz;
    }
    rotate(xp, zp, cx, cz, np, camxz);
    rotate(yp, zp, cy, cz, np, camzy);
    for (var p = 0; p < np; p++) {
        if (zp[p] < 50) {
            var pm = (p - 1);
            if (pm == -1) {
                pm = (np - 1);
            }
            var pp = (p + 1);
            if (pp == np) {
                pp = 0;
            }
            var pu = 0;
            if (zp[pm] > zp[pp]) {
                pu = pm;
            } else {
                pu = pp;
            }
            var fct = ((50 - zp[pu]) / (zp[p] - zp[pu]));
            zp[p] = 50;
            xp[p] = (xp[pu] + ((xp[p] - xp[pu]) * fct));
            yp[p] = (yp[pu] + ((yp[p] - yp[pu]) * fct));
        }
    }
    var onscreen = false;
    for (var p = 0; p < np; p++) {
        xpd[p] = xs(xp[p], zp[p]);
        ypd[p] = ys(yp[p], zp[p]);
        if (!onscreen) {
            if ((xpd[p] > 0) && (xpd[p] < canw) && (ypd[p] > 0) && (ypd[p] < canh)) {
                onscreen = true;
            }
        }
    }
    return onscreen;
}

function rotate(xp, yp, cx, cy, np, an) {
    if (an != 0) {
        while (an >= 360) {
            an -= 360;
        }
        while (an < 0) {
            an += 360;
        }
        for (var i = 0; i < np; i++) {
            var xptmp = xp[i];
            xp[i] = (cx + ((xp[i] - cx) * mcos[an]) - ((yp[i] - cy) * msin[an]));
            yp[i] = (cy + ((xptmp - cx) * msin[an]) + ((yp[i] - cy) * mcos[an]));
        }
    }
}

function xs(ax, az) {
    var fpmlt = (focus_point * mw);
    if (az < cz) {
        az = cz;
    }
    return ((((az - fpmlt) * (cx - ax)) / az) + ax);
}

function ys(ay, az) {
    var fpmlt = (focus_point * mh);
    if (az < cz) {
        az = cz;
    }
    return ((((az - fpmlt) * (cy - ay)) / az) + ay);
}

function py(x1, x2, z1, z2) {
    return Math.sqrt(((x1 - x2) * (x1 - x2)) + ((z1 - z2) * (z1 - z2)));
}

function pyd(x1, x2, y1, y2, z1, z2) {
    return Math.sqrt(((x1 - x2) * (x1 - x2)) + ((y1 - y2) * (y1 - y2)) + ((z1 - z2) * (z1 - z2)));
}
var nt = 2;
var score = [0, 0];
var time = 0;
var plan = [
    [4, 4, 2],
    [4, 2, 4]
];
var planpos = [-120, -120];
var maxspeed = [4, 4];
var acuracy = [0.5, 0.5];
var bltime = [40, 40];
var tacklvl = [0.5, 1];
var tackfreq = [0.75, 0.75];
var cutoff = [0.5, 0.5];
var pli = [];
var plx = [];
var plz = [];
var orx = [];
var orz = [];
var grx = [];
var grz = [];
var vgrx = [];
var vgrz = [];
var vgrup = [];
var speed = [];
var vectsx = [];
var vectsz = [];
var dir = [];
var ran = [];
var shot = [];
var flyshot = [];
var imove = [];
var cwith = [];
var bont = 0;
var onp = [0, 10];
var onmove = [-1, -1];
var xgo = [0, 0];
var zgo = [0, 0];
var rxgo = [0, 0];
var rzgo = [0, 0];
var bli = [-1, -1];
var blrunstat = [0, 0];
var blrunpy = [0, 0];
var rux = [0, 0];
var ruz = [0, 0];
var tax = 0,
    taz = 0;
var retack = 0;
var onretack = 0;
var onretackback = -100;
var onslide = 0;
var slx = 0,
    slz = 0;
var blwith = -1;
var blx = 700;
var blz = 460;
var bly = 0;
var bvx = 0,
    bvy = 0,
    bvz = 0;
var bnvx = 0,
    bnvz = 0;
var wtrm = 15;
var wtrmacel = 0;
var bant = [
    [0, 1, 2, 3],
    [3, 2, 1, 0],
    [0, 2, 1, 3],
    [3, 1, 2, 0]
];
var bnan = 0;
var gbnan = false;
var ban = 0;
var bans = 0;
var colt = false;
var colr = false;
var coll = false;
var rbvx = 0,
    sbvx = 0;
var netcor = false;
var netcol = false;
var flyball = false;
var onrecoil = 0;
var side = 0;
var tosup = 0;
var centara = false;
var glt = 1;
var goal = 0;
var owngoal = false;
var gslb = 0;
var lai = 0;
var glrun = 40;
var oft = 0;
var out = 0;
var outx = 0;
var outz = 0;
var onout = 0;
var onoutc = 0;
var holdout = 0;
var penmode = false;
var afterpen = 0;
var bestof = 0;
var bested = [0, 0];
var bescore = [0, 0];
var penturn = [0, 0];
var borgenz = [];
var nborg = 0;
var laz = 0;
for (var i = 0; i < 100; i++) {
    borgenz[i] = 0;
}
var cumborg = 0;
var mutliflex = false;
var fonp = 0;

function creategame() {
    if (!loadteam[ont]) {
        ont++;
    }
    if (ont < nt) {
        if ((ont == 0) && (loadteam[0] == 1) && (ilaodedteam == team[tsel[0]])) {
            loaded = 100;
            loadteam[0] = 0;
        }
        if (loadteam[ont] >= 4) {
            maketeam(ont);
        }
        if (loadteam[ont] == 2) {
            loadteam[ont] = 3;
            readteam(ont, team[tsel[ont]]);
        }
        if (loadteam[ont] == 1) {
            loaded = 0;
            loadteam[ont] = 2;
        }
        drawloading(ont);
    } else {
        if ((ntmo == 2) && (!confeloaded)) {
            loadconfe();
        }
        if ((ntmo == 2) && (lopload[3] == -1)) {
            lopload[3] = 0;
            loadloop("data/soundtrack/loop3.mp3", 3);
        }
        time = 0;
        side = 0;
        penmode = false;
        afterpen = 0;
        camx = 0;
        camy = 0;
        camz = 0;
        for (var i = 0; i < 2; i++) {
            score[i] = 0;
            maxspeed[i] = (3.5 + ((teamtats[tsel[i]] - 50) / 50));
            acuracy[i] = ((1 - ((teamtats[tsel[i]] - 50) / 50)) * 1.5);
            bltime[i] = 60;
            tacklvl[i] = 1;
            tackfreq[i] = 0.5;
            cutoff[i] = 0.5;
        }
        orgteam();
        fase = 6;
    }
}

function orgteam() {
    onreplay = false;
    switchrep = 0;
    recreached = false;
    cf = 0;
    camxz = 0;
    camzy = 40;
    camodist = 740;
    camdist = (camodist * ((mw + mh) / 2));
    goal = 0;
    gslb = 0;
    glrun = 40;
    out = 0;
    onout = 0;
    onoutc = 0;
    cumborg = 0;
    if (nt == 2) {
        if (side == 0) {
            if (Math.random() > Math.random()) {
                tosup = 0;
            } else {
                tosup = 1;
            }
            if (firstime != -1) {
                tosup = 1;
            }
        } else {
            if (tosup == 0) {
                tosup = 1;
            } else {
                tosup = 0;
            }
        }
        glt = tosup;
    } else {
        glt = 0;
    }
    var pl = 0;
    for (var t = 0; t < 2; t++) {
        for (var k = 0; k < 3; k++) {
            for (var i = 0; i < plan[t][k]; i++) {
                var bon = (350 + (350 * k));
                if (plan[t][k] == 2) {
                    if (i == 0) {
                        orx[pl] = (bon - planpos[t]);
                        orz[pl] = 575;
                    }
                    if (i == 1) {
                        orx[pl] = (bon - planpos[t]);
                        orz[pl] = 345;
                    }
                }
                if (plan[t][k] == 3) {
                    if (i == 0) {
                        orx[pl] = (bon + planpos[t]);
                        orz[pl] = 690;
                    }
                    if (i == 1) {
                        orx[pl] = (bon - planpos[t]);
                        orz[pl] = 460;
                    }
                    if (i == 2) {
                        orx[pl] = (bon + planpos[t]);
                        orz[pl] = 230;
                    }
                }
                if (plan[t][k] == 4) {
                    if (i == 0) {
                        orx[pl] = (bon + planpos[t]);
                        orz[pl] = 805;
                    }
                    if (i == 1) {
                        orx[pl] = (bon - planpos[t]);
                        orz[pl] = 575;
                    }
                    if (i == 2) {
                        orx[pl] = (bon - planpos[t]);
                        orz[pl] = 345;
                    }
                    if (i == 3) {
                        orx[pl] = (bon + planpos[t]);
                        orz[pl] = 115;
                    }
                }
                if (plan[t][k] == 5) {
                    if (i == 0) {
                        orx[pl] = (bon + planpos[t]);
                        orz[pl] = 828;
                    }
                    if (i == 1) {
                        orx[pl] = (bon - (planpos[t] * 0.5));
                        orz[pl] = 644;
                    }
                    if (i == 2) {
                        orx[pl] = (bon - planpos[t]);
                        orz[pl] = 460;
                    }
                    if (i == 3) {
                        orx[pl] = (bon - (planpos[t] * 0.5));
                        orz[pl] = 276;
                    }
                    if (i == 4) {
                        orx[pl] = (bon + planpos[t]);
                        orz[pl] = 92;
                    }
                }
                if (t == (1 - side)) {
                    orx[pl] = (1400 - orx[pl]);
                }
                pl++;
            }
        }
    }
    for (var i = 0; i < 20; i++) {
        plx[i] = orx[i];
        plz[i] = orz[i];
        vgrx[i] = ((0.5 - Math.random()) * 160);
        vgrz[i] = ((0.5 - Math.random()) * 160);
        vgrup[i] = Math.floor(50 + (250 * Math.random()));
    }
    recentar();
    inishkeeper();
}

function recentar() {
    for (var i = 0; i < 20; i++) {
        var blxrate = -0.5;
        if (((i >= 10) && (side == 0)) || ((i < 10) && (side == 1))) {
            blxrate = 0.5;
        }
        if (blxrate > 0) {
            grx[i] = (orx[i] + ((1400 - orx[i]) * blxrate) + vgrx[i]);
        }
        if (blxrate < 0) {
            grx[i] = (orx[i] + (orx[i] * blxrate) + vgrx[i]);
        }
        grz[i] = (orz[i] + vgrz[i]);
        plx[i] = grx[i];
        plz[i] = grz[i];
    }
    restat();
    if (glt == 1 || nt == 1) {
        bvz = 0;
        bvx = 0;
        bvy = 0;
        plx[5] = 700;
        plz[5] = 490;
        dir[5] = 0;
        blwith = 5;
        onp[0] = 5;
        plx[4] = 700;
        plz[4] = 400;
        dir[4] = 180;
    } else {
        bvz = 0;
        bvx = 0;
        bvy = 0;
        plx[15] = 700;
        plz[15] = 490;
        dir[15] = 0;
        blwith = 15;
        onp[1] = 15;
        plx[14] = 700;
        plz[14] = 400;
        dir[14] = 180;
    }
    blx = 700;
    blz = 460;
    out = 0;
    goal = 0;
    centara = true;
}

function restat() {
    for (var i = 0; i < 20; i++) {
        speed[i] = 0;
        vectsx[i] = 0;
        vectsz[i] = 0;
        dir[i] = 0;
        ran[i] = 0;
        shot[i] = 0;
        flyshot[i] = 0;
        imove[i] = 0;
        cwith[i] = 0;
    }
    for (var i = 0; i < 2; i++) {
        blrunstat[i] = 0;
        xgo[i] = 700;
        zgo[i] = 460;
        rxgo[i] = 700;
        rzgo[i] = 460;
    }
    retack = 0;
    onretack = 0;
    onretackback = 0;
}

function soccerisagame() {
    if (holdout != 0) {
        onagamebtn = true;
        holdout--;
    }
    if ((mdown) && (!onagamebtn)) {
        if ((bont == 0) || (!mutliflex)) {
            fonp = onp[0];
        }
        var xf = [],
            zf = [],
            yf = [],
            xfd = [],
            yfd = [];
        for (var i = 0; i < 29; i++) {
            xf[i] = [];
            zf[i] = [];
            yf[i] = [];
            xfd[i] = [];
            yfd[i] = [];
            for (var j = 0; j < 21; j++) {
                xf[i][j] = (i * 50);
                zf[i][j] = (j * 46);
                yf[i][j] = 0;
                xf[i][j] += camx;
                yf[i][j] += camy;
                zf[i][j] += camz;
            }
            if (penmode) {
                rotate(xf[i], zf[i], cx, cz, 21, camxz);
            }
            rotate(yf[i], zf[i], cy, cz, 21, camzy);
            for (var j = 0; j < 21; j++) {
                xfd[i][j] = xs(xf[i][j], zf[i][j]);
                yfd[i][j] = ys(yf[i][j], zf[i][j]);
            }
        }
        var cli = 0,
            clj = 0,
            clospy = -1;
        for (var i = 0; i < 29; i++) {
            for (var j = 0; j < 21; j++) {
                crnpy = py(xm, xfd[i][j], ym, yfd[i][j]);
                if ((clospy == -1) || (crnpy < clospy)) {
                    cli = i;
                    clj = j;
                    clospy = crnpy;
                }
            }
        }
        var hli = 0,
            hlj = 0;
        if (ym > yfd[cli][clj]) {
            hlj = (clj - 1);
            if (hlj == -1) {
                hlj = 1;
            }
        }
        if (ym < yfd[cli][clj]) {
            hlj = (clj + 1);
            if (hlj == 21) {
                hlj = 19;
            }
        }
        if (xm < xfd[cli][clj]) {
            hli = (cli - 1);
            if (hli == -1) {
                hli = 1;
            }
        }
        if (xm > xfd[cli][clj]) {
            hli = (cli + 1);
            if (hli == 29) {
                hli = 27;
            }
        }
        if (penmode) {
            cli = 28;
            hli = 28;
        }
        for (var i = 0; i < 29; i++) {
            for (var j = 0; j < 21; j++) {
                xf[i][j] = (i * 50);
                zf[i][j] = (j * 46);
                yf[i][j] = 0;
            }
        }
        var fcty = ((ym - yfd[cli][clj]) / (yfd[cli][hlj] - yfd[cli][clj]));
        if (fcty < 0) {
            fcty = 0;
        }
        if (fcty > 1) {
            fcty = 1;
        }
        var fctx = ((xm - xfd[cli][clj]) / (xfd[hli][clj] - xfd[cli][clj]));
        if (fctx < 0) {
            fctx = 0;
        }
        if (fctx > 1) {
            fctx = 1;
        }
        zgo[0] = (((zf[cli][hlj] - zf[cli][clj]) * fcty) + zf[cli][clj]);
        xgo[0] = (((xf[hli][clj] - xf[cli][clj]) * fctx) + xf[cli][clj]);
        if ((out == 104) && (oft == 0)) {
            if ((oft == side) && (xgo[0] < plx[onp[0]])) {
                xgo[0] = plx[onp[0]];
            }
            if ((oft == (1 - side)) && (xgo[0] > plx[onp[0]])) {
                xgo[0] = plx[onp[0]];
            }
        }
        if ((out == 105) && (oft == 0)) {
            if ((oft == side) && (xgo[0] < kpx[0])) {
                xgo[0] = kpx[0];
            }
            if ((oft == (1 - side)) && (xgo[0] > kpx[0])) {
                xgo[0] = kpx[0];
            }
            xp = [xgo[0], kpx[0]];
            zp = [zgo[0], kpz[0]];
        } else {
            xp = [xgo[0], plx[fonp]];
            zp = [zgo[0], plz[fonp]];
        }
        if ((!penmode) || (side == 0)) {
            if ((penmode) && (side == 0)) {
                borgenz[nborg] = Math.abs(laz - zgo[0]);
                laz = zgo[0];
                nborg++;
                if (nborg == 100) {
                    nborg = 0;
                }
                cumborg = 0;
                for (var i = 0; i < 100; i++) {
                    cumborg += ((borgenz[i] * 2) / 1000);
                }
            }
            yp = [0, 0];
            np = 2;
            xpd = [];
            ypd = [];
            if (calcdraw(xp, yp, zp, np, xpd, ypd)) {
                rd.globalAlpha = 0.5;
                rd.strokeStyle = "#01E4FF";
                rd.lineWidth = 4;
                drawline(xpd, ypd);
                rd.globalAlpha = 1;
            }
        }
        var nohap = false;
        if ((out == 105) && (bont == 0)) {
            nohap = true;
        }
        if ((mutliflex) && (bont != 0)) {
            nohap = true;
        }
        if ((centara) && (bont != 0)) {
            nohap = true;
        }
        if ((out == 103 || out == 104 || out == 105) && (oft != 0)) {
            nohap = true;
        }
        if (!nohap) {
            var rang = Math.round(Math.abs(Math.atan((plx[onp[0]] - xgo[0]) / (plz[onp[0]] - zgo[0])) * (180 / Math.PI)));
            if (plx[onp[0]] < xgo[0]) {
                if (plz[onp[0]] < zgo[0]) {
                    rang = ((90 - rang) + 90);
                }
            } else {
                if (plz[onp[0]] < zgo[0]) {
                    rang += 180;
                } else {
                    rang = ((90 - rang) + 270);
                }
            }
            if (rang == 360) {
                rang = 0;
            }
            dir[onp[0]] = rang;
            onmove[0] = onp[0];
        } else {
            onmove[0] = -1;
        }
        if ((goal > glrun) && (goal < (glrun + 70))) {
            onmove[0] = -1;
        }
    } else {
        if (onmove[0] == -1) {
            xgo[0] += ((blx - xgo[0]) / 20);
            zgo[0] += ((blz - zgo[0]) / 20);
        } else {
            rxgo[0] = xgo[0];
            rzgo[0] = zgo[0];
        }
        onmove[0] = -1;
        fonp = onp[0];
    }
    if (nt == 2) {
        playcomputer();
        authont();
    }
    for (var t = 0; t < nt; t++) {
        var blwithmyt = false;
        if ((blwith >= (t * 10)) && (blwith < (10 + (10 * t)))) {
            blwithmyt = true;
        }
        if ((onmove[t] == -1) && (!blwithmyt) && (!out) && (!goal)) {
            var clospy = 0;
            for (var i = (10 * t); i < (10 + (10 * t)); i++) {
                var crnpy = 0;
                if (flyball) {
                    crnpy = py(plx[i], rxgo[bont], plz[i], rzgo[bont]);
                } else {
                    crnpy = py(plx[i], blx, plz[i], blz);
                }
                if (clospy == 0 || crnpy < clospy) {
                    onp[t] = i;
                    clospy = crnpy;
                }
            }
        }
    }
    if (!centara) {
        if (goal < 20) {
            for (var t = 0; t < nt; t++) {
                if ((!out || oft == t) && (out != 105) && (out != 107)) {
                    if (blwith == -1) {
                        if (retack != 0) {
                            retack = 0;
                        }
                        if (onretack != 0) {
                            onretack = 0;
                        }
                        if (onretackback != 0) {
                            onretackback = 0;
                        }
                        if (onslide != 0) {
                            onslide = 0;
                        }
                        if (blrunstat[t] == 0) {
                            if (bvx != 0 || bvz != 0) {
                                var shortgo = 0;
                                for (var i = (10 * t); i < (10 + (10 * t)); i++) {
                                    var trux = 0,
                                        truz = 0;
                                    if ((Math.abs(bvx) > Math.abs(bvz))) {
                                        trux = plx[i];
                                        truz = (blz + ((trux - blx) * (bvz / bvx)));
                                    } else {
                                        truz = plz[i];
                                        trux = (blx + ((truz - blz) * (bvx / bvz)));
                                    }
                                    if ((((trux - blx) * bvx) > 0) && (((truz - blz) * bvz) > 0) && (ran[i] != 9) && (ran[i] != 10)) {
                                        if (bont == t) {
                                            var mypy = py(plx[i], rxgo[bont], plz[i], rzgo[bont]);
                                            if (shortgo == 0 || shortgo > mypy) {
                                                shortgo = mypy;
                                                rux[t] = trux;
                                                ruz[t] = truz;
                                                bli[t] = i;
                                                blrunstat[t] = 1;
                                            }
                                        } else {
                                            var mypy = py(plx[i], trux, plz[i], truz);
                                            if (shortgo == 0 || shortgo > mypy) {
                                                shortgo = mypy;
                                                rux[t] = trux;
                                                ruz[t] = truz;
                                                bli[t] = i;
                                                blrunstat[t] = 1;
                                            }
                                        }
                                    }
                                }
                            }
                            if (blrunstat[t] == 0) {
                                blrunstat[t] = 3;
                            }
                        }
                        if (blrunstat[t] == 1) {
                            var difvr = ((py(blx, rux[t], blz, ruz[t]) / Math.sqrt((bvx * bvx) + (bvz * bvz))) - (py(plx[bli[t]], rux[t], plz[bli[t]], ruz[t]) / maxspeed[t]));
                            if ((Math.abs(bvx) > Math.abs(bvz))) {
                                if (blx > plx[bli[t]]) {
                                    rux[t] = (plx[bli[t]] + (difvr * maxspeed[t] * 0.7));
                                } else {
                                    rux[t] = (plx[bli[t]] - (difvr * maxspeed[t] * 0.7));
                                }
                                ruz[t] = (blz + ((rux[t] - blx) * (bvz / bvx)));
                            } else {
                                if (blz > plz[bli[t]]) {
                                    ruz[t] = (plz[bli[t]] + (difvr * maxspeed[t] * 0.7));
                                } else {
                                    ruz[t] = (plz[bli[t]] - (difvr * maxspeed[t] * 0.7));
                                }
                                rux[t] = (blx + ((ruz[t] - blz) * (bvx / bvz)));
                            }
                            var rang = Math.round(Math.abs(Math.atan((plx[bli[t]] - rux[t]) / (plz[bli[t]] - ruz[t])) * (180 / Math.PI)));
                            if (plx[bli[t]] < rux[t]) {
                                if (plz[bli[t]] < ruz[t]) {
                                    rang = ((90 - rang) + 90);
                                }
                            } else {
                                if (plz[bli[t]] < ruz[t]) {
                                    rang += 180;
                                } else {
                                    rang = ((90 - rang) + 270);
                                }
                            }
                            if (rang == 360) {
                                rang = 0;
                            }
                            dir[bli[t]] = rang;
                            blrunpy[t] = 0;
                            blrunstat[t] = 2;
                        }
                        if (blrunstat[t] == 2) {
                            imove[bli[t]] = 1;
                            crunpy = py(plx[bli[t]], blx, plz[bli[t]], blz);
                            if ((crunpy < blrunpy[t]) || (blrunpy[t] == 0)) {
                                blrunpy[t] = crunpy;
                            } else {
                                blrunstat[t] = 3;
                            }
                            if (py(plx[bli[t]], rux[t], plz[bli[t]], ruz[t]) <= speed[bli[t]]) {
                                blrunstat[t] = 3;
                            }
                        }
                        if (blrunstat[t] == 3) {
                            if ((ran[onp[t]] != 9) && (ran[onp[t]] != 10)) {
                                var rang = Math.round(Math.abs(Math.atan((plx[onp[t]] - blx) / (plz[onp[t]] - blz)) * (180 / Math.PI)));
                                if (plx[onp[t]] < blx) {
                                    if (plz[onp[t]] < blz) {
                                        rang = ((90 - rang) + 90);
                                    }
                                } else {
                                    if (plz[onp[t]] < blz) {
                                        rang += 180;
                                    } else {
                                        rang = ((90 - rang) + 270);
                                    }
                                }
                                if (rang == 360) {
                                    rang = 0;
                                }
                                dir[onp[t]] = rang;
                                imove[onp[t]] = 1;
                            }
                        }
                    } else {
                        if (blrunstat[t] != 0) {
                            blrunstat[t] = 0;
                        }
                        var blwithmyt = false;
                        if ((blwith >= (t * 10)) && (blwith < (10 + (10 * t)))) {
                            blwithmyt = true;
                        }
                        if (!blwithmyt) {
                            var overidedir = false;
                            if ((t == 0) && (onmove[0] == onp[0]) && (!flyball)) {
                                overidedir = true;
                            }
                            if (!overidedir) {
                                var quad = 0;
                                if (Math.abs(vectsx[blwith]) > Math.abs(vectsz[blwith])) {
                                    if (vectsx[blwith] > 0) {
                                        quad = 1;
                                    } else {
                                        quad = 2;
                                    }
                                } else {
                                    if (vectsz[blwith] > 0) {
                                        quad = 3;
                                    } else {
                                        quad = 4;
                                    }
                                }
                                var shortgo = 0;
                                for (var i = (10 * t); i < (10 + (10 * t)); i++) {
                                    if (((quad == 1) && (plx[i] > plx[blwith])) || ((quad == 2) && (plx[i] < plx[blwith])) || ((quad == 3) && (plz[i] > plz[blwith])) || ((quad == 4) && (plz[i] < plz[blwith]))) {
                                        var mypy = py(plx[i], plx[blwith], plz[i], plz[blwith]);
                                        if (shortgo == 0 || mypy < shortgo) {
                                            shortgo = mypy;
                                            onp[t] = i;
                                        }
                                    }
                                }
                            }
                            if ((onretack > 0) && (!out)) {
                                if (retack == 0) {
                                    var vecf = (20 + (80 * tacklvl[t] * Math.random()));
                                    tax = (plx[blwith] + (vectsx[blwith] * vecf));
                                    taz = (plz[blwith] - (vectsz[blwith] * vecf));
                                    retack = Math.floor(10 + (25 * tacklvl[t] * Math.random()));
                                } else {
                                    retack--;
                                }
                                if (py(plx[onp[t]], tax, plz[onp[t]], taz) > (maxspeed[t] * 2)) {
                                    if (!overidedir) {
                                        var rang = Math.round(Math.abs(Math.atan((plx[onp[t]] - tax) / (plz[onp[t]] - taz)) * (180 / Math.PI)));
                                        if (plx[onp[t]] < tax) {
                                            if (plz[onp[t]] < taz) {
                                                rang = ((90 - rang) + 90);
                                            }
                                        } else {
                                            if (plz[onp[t]] < taz) {
                                                rang += 180;
                                            } else {
                                                rang = ((90 - rang) + 270);
                                            }
                                        }
                                        if (rang == 360) {
                                            rang = 0;
                                        }
                                        dir[onp[t]] = rang;
                                    }
                                    imove[onp[t]] = 1;
                                } else {
                                    if (!overidedir) {
                                        var rang = Math.round(Math.abs(Math.atan((plx[onp[t]] - plx[blwith]) / (plz[onp[t]] - plz[blwith])) * (180 / Math.PI)));
                                        if (plx[onp[t]] < plx[blwith]) {
                                            if (plz[onp[t]] < plz[blwith]) {
                                                rang = ((90 - rang) + 90);
                                            }
                                        } else {
                                            if (plz[onp[t]] < plz[blwith]) {
                                                rang += 180;
                                            } else {
                                                rang = ((90 - rang) + 270);
                                            }
                                        }
                                        if (rang == 360) {
                                            rang = 0;
                                        }
                                        dir[onp[t]] = rang;
                                    }
                                }
                            }
                            onretack--;
                            if (onretack < onretackback) {
                                onretackback = (-200 + (200 * tackfreq[t]));
                                onretack = (200 * tackfreq[t]);
                            }
                            if (!onslide) {
                                var ridge = Math.sqrt((vectsx[onp[t]] * vectsx[onp[t]]) + (vectsz[onp[t]] * vectsz[onp[t]]));
                                if (py(plx[onp[t]], plx[blwith], plz[onp[t]], plz[blwith]) < (ridge * 20)) {
                                    if (Math.random() > cutoff[t]) {
                                        vectsx[onp[t]] *= 2;
                                        vectsz[onp[t]] *= 2;
                                        shot[onp[t]] = 130;
                                        onslide = 1;
                                    } else {
                                        onslide = 25;
                                    }
                                }
                            }
                            if (onslide) {
                                if (onslide < 25) {
                                    var slx = (((plx[onp[t]] + (vectsx[onp[t]] * 15)) + (plx[blwith] + (vectsx[blwith] * 15))) / 2);
                                    var slz = (((plz[onp[t]] - (vectsz[onp[t]] * 15)) + (plz[blwith] - (vectsz[blwith] * 15))) / 2);
                                    var rang = Math.round(Math.abs(Math.atan((plx[onp[t]] - slx) / (plz[onp[t]] - slz)) * (180 / Math.PI)));
                                    if (plx[onp[t]] < slx) {
                                        if (plz[onp[t]] < slz) {
                                            rang = ((90 - rang) + 90);
                                        }
                                    } else {
                                        if (plz[onp[t]] < slz) {
                                            rang += 180;
                                        } else {
                                            rang = ((90 - rang) + 270);
                                        }
                                    }
                                    if (rang == 360) {
                                        rang = 0;
                                    }
                                    dir[onp[t]] = rang;
                                    imove[onp[t]] = 1;
                                }
                                onslide++;
                                if (onslide == 100) {
                                    onslide = 0;
                                }
                            }
                        }
                    }
                }
            }
        } else {
            if ((goal < glrun)) {
                if (onmove[glt] != onp[glt]) {
                    var rang = Math.round(Math.abs(Math.atan((plx[onp[glt]] - outx) / (plz[onp[glt]] - outz)) * (180 / Math.PI)));
                    if (plx[onp[glt]] < outx) {
                        if (plz[onp[glt]] < outz) {
                            rang = ((90 - rang) + 90);
                        }
                    } else {
                        if (plz[onp[glt]] < outz) {
                            rang += 180;
                        } else {
                            rang = ((90 - rang) + 270);
                        }
                    }
                    if (rang == 360) {
                        rang = 0;
                    }
                    dir[onp[glt]] = rang;
                    imove[onp[glt]] = 1;
                }
                if (py(plx[onp[glt]], outx, plz[onp[glt]], outz) < (maxspeed[glt] * 10)) {
                    goal = glrun;
                }
            }
        }
    }
    var xon = blx;
    if (onoutc) {
        if (onout == 103) {
            if (oft == side) {
                xon = (plx[blwith] + 700);
                if (xon > 1600) {
                    xon = 1600;
                }
            }
            if (oft == (1 - side)) {
                xon = (plx[blwith] - 700);
                if (xon < -200) {
                    xon = -200;
                }
            }
        }
        if (onout == 101) {
            if (oft == side) {
                xon = 1500;
            }
            if (oft == (1 - side)) {
                xon = -100;
            }
        }
        if (!out) {
            onoutc--;
        }
    }
    if (out == 104) {
        if (oft == side) {
            xon = 600;
        }
        if (oft == (1 - side)) {
            xon = 800;
        }
    }
    if (out == 105) {
        if (oft == side) {
            xon = 1000;
        }
        if (oft == (1 - side)) {
            xon = 400;
        }
    }
    var blxrate = ((xon - 700) / 1400);
    if (blxrate > 1) {
        blxrate = 1;
    }
    if (blxrate < -1) {
        blxrate = -1;
    }
    for (var t = 0; t < nt; t++) {
        for (var i = (10 * t); i < (10 + (10 * t)); i++) {
            if (centara) {
                if (t == side) {
                    blxrate = -0.5;
                } else {
                    blxrate = 0.5;
                }
            }
            if (blxrate > 0) {
                grx[i] = (orx[i] + ((1400 - orx[i]) * blxrate) + vgrx[i]);
            }
            if (blxrate < 0) {
                grx[i] = (orx[i] + (orx[i] * blxrate) + vgrx[i]);
            }
            grz[i] = (orz[i] + vgrz[i]);
            if ((onoutc) && (onout == 101) && (oft != t)) {
                grz[i] = ((grz[i] + 460) / 2);
            }
            if ((onoutc) && (onout == 103) && (oft != t)) {
                grz[i] = (((grz[i] * 2) + 460) / 3);
            }
            var xbgrx = 0;
            if (t != side) {
                xbgrx = 1400;
            }
            for (var k = (10 * (1 - t)); k < (10 + (10 * (1 - t))); k++) {
                if (t == side) {
                    if (grx[k] > xbgrx) {
                        xbgrx = grx[k];
                    }
                } else {
                    if (grx[k] < xbgrx) {
                        xbgrx = grx[k];
                    }
                }
            }
            if (t == side) {
                if (grx[i] > xbgrx) {
                    grx[i] = xbgrx;
                }
            } else {
                if (grx[i] < xbgrx) {
                    grx[i] = xbgrx;
                }
            }
            if (out > 100) {
                var dist = py(plx[blwith], grx[i], plz[blwith], grz[i]);
                if ((blwith != i) && (dist < 150)) {
                    var rang = Math.round(Math.abs(Math.atan((plx[blwith] - grx[i]) / (plz[blwith] - grz[i])) * (180 / Math.PI)));
                    if (plx[blwith] < grx[i]) {
                        if (plz[blwith] < grz[i]) {
                            rang = ((90 - rang) + 90);
                        }
                    } else {
                        if (plz[blwith] < grz[i]) {
                            rang += 180;
                        } else {
                            rang = ((90 - rang) + 270);
                        }
                    }
                    if (rang == 360) {
                        rang = 0;
                    }
                    grx[i] += (msin[rang] * (150 - dist));
                    grz[i] -= (mcos[rang] * (150 - dist));
                }
            }
            if (vgrup[i] == 0) {
                var vmult = 1;
                if (centara) {
                    vmult = 0.5;
                }
                vgrx[i] = ((0.5 - Math.random()) * maxspeed[t] * 40 * vmult);
                vgrz[i] = ((0.5 - Math.random()) * maxspeed[t] * 40 * vmult);
                vgrup[i] = Math.floor(50 + (250 * Math.random()));
            } else {
                vgrup[i]--;
            }
            var nogothis = false;
            if ((goal > 20) && (goal < (glrun + 70)) && (i == onp[t])) {
                nogothis = true;
            }
            if ((centara) && (glt == 1 || nt == 1) && (i == 5 || i == 4)) {
                nogothis = true;
            }
            if ((centara) && (glt == 0) && (i == 15 || i == 14)) {
                nogothis = true;
            }
            if ((onmove[t] != i) && (!imove[i]) && (blwith != i) && (!nogothis)) {
                if ((py(plx[i], grx[i], plz[i], grz[i]) > (maxspeed[t] * 10)) && (shot[i] <= 0)) {
                    var rang = Math.round(Math.abs(Math.atan((plx[i] - grx[i]) / (plz[i] - grz[i])) * (180 / Math.PI)));
                    if (plx[i] < grx[i]) {
                        if (plz[i] < grz[i]) {
                            rang = ((90 - rang) + 90);
                        }
                    } else {
                        if (plz[i] < grz[i]) {
                            rang += 180;
                        } else {
                            rang = ((90 - rang) + 270);
                        }
                    }
                    if (rang == 360) {
                        rang = 0;
                    }
                    dir[i] = rang;
                    imove[i] = 1;
                } else {
                    if (speed[i] < 0.4) {
                        var rang = Math.round(Math.abs(Math.atan((plx[i] - blx) / (plz[i] - blz)) * (180 / Math.PI)));
                        if (plx[i] < blx) {
                            if (plz[i] < blz) {
                                rang = ((90 - rang) + 90);
                            }
                        } else {
                            if (plz[i] < blz) {
                                rang += 180;
                            } else {
                                rang = ((90 - rang) + 270);
                            }
                        }
                        if (rang == 360) {
                            rang = 0;
                        }
                        if ((shot[i] >= 40) && (shot[i] < 60)) {
                            rang += 180;
                            if (rang >= 360) {
                                rang -= 360;
                            }
                        }
                        dir[i] = rang;
                    }
                }
            }
            if ((goal > 40) && (goal < (glrun + 70))) {
                if (i != onp[glt]) {
                    if (flyshot[i] == 0) {
                        var rang = Math.round(Math.abs(Math.atan((plx[i] - plx[onp[glt]]) / (plz[i] - plz[onp[glt]])) * (180 / Math.PI)));
                        if (plx[i] < plx[onp[glt]]) {
                            if (plz[i] < plz[onp[glt]]) {
                                rang = ((90 - rang) + 90);
                            }
                        } else {
                            if (plz[i] < plz[onp[glt]]) {
                                rang += 180;
                            } else {
                                rang = ((90 - rang) + 270);
                            }
                        }
                        if (rang == 360) {
                            rang = 0;
                        }
                        if (glt != t) {
                            rang += 180;
                            if (rang >= 360) {
                                rang -= 360;
                            }
                        }
                        dir[i] = rang;
                        imove[i] = 1;
                        if (glt == t) {
                            if ((py(plx[i], plx[onp[glt]], plz[i], plz[onp[glt]]) < (maxspeed[t] * 10)) && (goal > glrun)) {
                                flyshot[i] = 200;
                            }
                        } else {
                            if (py(plx[i], plx[onp[glt]], plz[i], plz[onp[glt]]) > 300) {
                                flyshot[i] = 200;
                            }
                        }
                    }
                }
            }
            if (shot[i] < 0) {
                imove[i] = 0;
            }
            if (onmove[t] == i || imove[i]) {
                var cantmove = false;
                if ((out > 100) && (onp[oft] == i) && (out != 105)) {
                    cantmove = true;
                }
                if ((centara) && (glt == 1 || nt == 1) && (i == 5 || i == 4)) {
                    cantmove = true;
                }
                if ((centara) && (glt == 0) && (i == 15 || i == 14)) {
                    cantmove = true;
                }
                if (!cantmove) {
                    speed[i] += 0.1;
                    if (speed[i] < 0.7) {
                        speed[i] = 0.7;
                        vectsx[i] = (msin[dir[i]] * speed[i]);
                        vectsz[i] = (mcos[dir[i]] * speed[i]);
                    }
                }
                if (onmove[t] == i) {
                    if (blwith == i) {
                        shot[i] = -1;
                        if (out == 101) {
                            shot[i] = -3;
                        }
                        if (out == 102) {
                            shot[i] = -4;
                        }
                        if (out == 103) {
                            shot[i] = -6;
                        }
                        if (out == 104) {
                            shot[i] = -7;
                        }
                    } else {
                        if ((bont != t) && (shot[i] < 0)) {
                            shot[i] = 0;
                        }
                        if ((bont == t) && (flyshot[i] == 0)) {
                            flyshot[i] = 16;
                        }
                    }
                }
            } else {
                if ((goal > glrun) && (goal < (glrun + 70)) && (i == onp[t])) {
                    speed[i] -= 0.04;
                } else {
                    speed[i] -= 0.1;
                }
                if (shot[i] < 0) {
                    var hmag = 4,
                        vmag = 4;
                    var dirf = 0;
                    fromhead = 0;
                    var sndtyp = 1;
                    if (shot[i] == -1 || shot[i] == -11 || shot[i] == -5) {
                        var ongoalside = false;
                        if (((rxgo[t] > 1330) && (t == side)) || ((t == (1 - side)) && (rxgo[t] < 70))) {
                            ongoalside = true;
                        }
                        if ((rzgo[t] > 360) && (rzgo[t] < 560) && (ongoalside)) {
                            var fct = 1;
                            if (rxgo[t] > 1330) {
                                fct = ((1400 - plx[i]) / 700);
                                if (fct > 1) {
                                    fct = 1;
                                }
                                if (fct < 0) {
                                    fct = 0;
                                }
                            }
                            if (rxgo[t] < 70) {
                                fct = (plx[i] / 700);
                                if (fct > 1) {
                                    fct = 1;
                                }
                                if (fct < 0) {
                                    fct = 0;
                                }
                            }
                            var hr = ((1 - (2 * Math.random())) * acuracy[t]);
                            var vr = ((2 - (3 * Math.random())) * acuracy[t]);
                            hmag = (6 + (4 * fct) + hr);
                            vmag = (2 + (3.5 * fct) + vr);
                            dirf = dir[i];
                            if (shot[i] == -5) {
                                var rang = Math.round(Math.abs(Math.atan((plx[i] - rxgo[t]) / (plz[i] - rzgo[t])) * (180 / Math.PI)));
                                if (plx[i] < rxgo[t]) {
                                    if (plz[i] < rzgo[t]) {
                                        rang = ((90 - rang) + 90);
                                    }
                                } else {
                                    if (plz[i] < rzgo[t]) {
                                        rang += 180;
                                    } else {
                                        rang = ((90 - rang) + 270);
                                    }
                                }
                                if (rang == 360) {
                                    rang = 0;
                                }
                                dirf = rang;
                            }
                        } else {
                            if (shot[i] == -1 || shot[i] == -11) {
                                hmag = (4 + Math.random());
                                vmag = ((0.5 + ((py(rxgo[t], plx[i], rzgo[t], plz[i]) / 1000) * 7)) * (1 + (0.3 * Math.random())));
                                flyball = true;
                                dirf = dir[i];
                            } else {
                                var rang = Math.round(Math.abs(Math.atan((plx[i] - rxgo[t]) / (plz[i] - rzgo[t])) * (180 / Math.PI)));
                                if (plx[i] < rxgo[t]) {
                                    if (plz[i] < rzgo[t]) {
                                        rang = ((90 - rang) + 90);
                                    }
                                } else {
                                    if (plz[i] < rzgo[t]) {
                                        rang += 180;
                                    } else {
                                        rang = ((90 - rang) + 270);
                                    }
                                }
                                if (rang == 360) {
                                    rang = 0;
                                }
                                dirf = rang;
                                hmag = (2 + Math.random());
                                vmag = ((1 + ((py(rxgo[t], plx[i], rzgo[t], plz[i]) / 1000) * 7)) * (1 + (0.3 * Math.random())));
                            }
                        }
                        if (shot[i] == -11 || shot[i] == -5) {
                            sndtyp = 2;
                        }
                        if (shot[i] == -1 || shot[i] == -11) {
                            shot[i] = 1;
                        } else {
                            shot[i] = 100;
                            plx[i] = ((blx + plx[i]) / 2);
                            plz[i] = ((blz + plz[i]) / 2);
                        }
                    }
                    if (shot[i] == -2) {
                        var rang = Math.round(Math.abs(Math.atan((plx[i] - rxgo[t]) / (plz[i] - rzgo[t])) * (180 / Math.PI)));
                        if (plx[i] < rxgo[t]) {
                            if (plz[i] < rzgo[t]) {
                                rang = ((90 - rang) + 90);
                            }
                        } else {
                            if (plz[i] < rzgo[t]) {
                                rang += 180;
                            } else {
                                rang = ((90 - rang) + 270);
                            }
                        }
                        if (rang == 360) {
                            rang = 0;
                        }
                        dirf = rang;
                        fromhead = 0.3;
                        shot[i] = 20;
                        if ((Math.abs(rang - dir[i]) > 135) && (Math.abs(rang - dir[i]) < 225)) {
                            rang += 180;
                            if (rang >= 360) {
                                rang -= 360;
                            }
                            shot[i] = 40;
                        }
                        dir[i] = rang;
                        plx[i] = ((blx + plx[i]) / 2);
                        plz[i] = ((blz + plz[i]) / 2);
                        vmag = (4 - (7 * Math.random()) + acuracy[t]);
                        if ((rzgo[t] > 360) && (rzgo[t] < 560) && (rxgo[t] > 1330 || rxgo[t] < 70)) {
                            hmag = (5 + (Math.random() * 2));
                        } else {
                            hmag = (1 + (Math.random() * 4));
                        }
                        sndtyp = 2;
                    }
                    if (shot[i] == -3) {
                        var pygo = py(rxgo[t], plx[i], rzgo[t], plz[i]);
                        dirf = dir[i];
                        hmag = (3 + (pygo / 100));
                        if (hmag > 11) {
                            hmag = 11;
                        }
                        vmag = (0.5 + (pygo / 140) + (Math.random() * acuracy[t]));
                        out = 0;
                        shot[i] = 60;
                        flyshot[i] = -17;
                        flyball = true;
                    }
                    if (shot[i] == -4) {
                        var pygo = py(rxgo[t], plx[i], rzgo[t], plz[i]);
                        dirf = dir[i];
                        hmag = (3 + (pygo / 200));
                        if (hmag > 6) {
                            hmag = 6;
                        }
                        vmag = ((pygo / 100) - 1);
                        if (vmag > 5) {
                            vmag = 5;
                        }
                        out = 0;
                        shot[i] = 80;
                        sndtyp = 0;
                    }
                    if (shot[i] == -6) {
                        var ongoalside = false;
                        if (((rxgo[t] > 1330) && (t == side)) || ((t == (1 - side)) && (rxgo[t] < 70))) {
                            ongoalside = true;
                        }
                        if ((rzgo[t] > 360) && (rzgo[t] < 560) && (ongoalside)) {
                            var pygo = py(rxgo[t], plx[i], rzgo[t], plz[i]);
                            dirf = dir[i];
                            hmag = (7 + (pygo / 50));
                            if (hmag > 11) {
                                hmag = 11;
                            }
                            vmag = (0.5 + (pygo / 140) + (Math.random() * acuracy[t] * 2));
                        } else {
                            var pygo = py(rxgo[t], plx[i], rzgo[t], plz[i]);
                            hmag = (3 + (pygo / (130 + 20 * Math.random())));
                            vmag = (1 + (pygo / (130 + 20 * Math.random())));
                            flyball = true;
                        }
                        flyshot[i] = -17;
                        dirf = dir[i];
                        out = 0;
                        shot[i] = 60;
                    }
                    if (shot[i] == -7) {
                        var pygo = py(rxgo[t], plx[i], rzgo[t], plz[i]);
                        dirf = dir[i];
                        hmag = (10 + (Math.random() * 2));
                        vmag = (2 + (Math.random() * (2 + acuracy[t])));
                        out = 0;
                        shot[i] = 60;
                        flyshot[i] = -17;
                        penkick = 30;
                        if (penmode) {
                            bested[t]++;
                        }
                    }
                    if (centara) {
                        centara = false;
                    }
                    lai = i;
                    var speedf = speed[i];
                    if (speedf > 4) {
                        speedf = 4;
                    }
                    bvx = (msin[dirf] * (speedf + hmag));
                    bnvx = msin[dirf];
                    bvz = (-mcos[dirf] * (speedf + hmag));
                    bnvz = -mcos[dirf];
                    bvy = -vmag;
                    gbnan = false;
                    ban = 0;
                    blwith = -1;
                    if (sndtyp == 1) {
                        var magvol = (Math.sqrt((hmag * hmag) + (vmag * vmag)) / 10);
                        if (magvol < 0.4) {
                            magvol = 0.4;
                        }
                        if (magvol > 1) {
                            magvol = 1;
                        }
                        if (Math.random() > Math.random()) {
                            playsnd(4, magvol);
                        } else {
                            playsnd(5, magvol);
                        }
                    }
                    if (sndtyp == 2) {
                        var magvol = (Math.sqrt(((hmag + speedf) * (hmag + speedf)) + (vmag * vmag)) / 10);
                        if (magvol < 0.4) {
                            magvol = 0.4;
                        }
                        if (magvol > 1) {
                            magvol = 1;
                        }
                        if (Math.random() > Math.random()) {
                            playsnd(6, magvol);
                        } else {
                            playsnd(7, magvol);
                        }
                    }
                }
            }
            if (speed[i] < 0) {
                speed[i] = 0;
            }
            if (speed[i] > maxspeed[t]) {
                speed[i] = maxspeed[t];
            }
            if (speed[i] > 0) {
                ran[i] += (0.12 + (speed[i] / 77));
                if ((ran[i] >= 5) && (ran[i] < 6)) {
                    ran[i] -= 4;
                }
                if (ran[i] >= 6) {
                    ran[i] = 1;
                }
            } else {
                ran[i] = 0;
            }
            vectsx[i] += (((msin[dir[i]] * speed[i]) - vectsx[i]) / 7);
            vectsz[i] += (((mcos[dir[i]] * speed[i]) - vectsz[i]) / 7);
            plx[i] += vectsx[i];
            plz[i] -= vectsz[i];
            if (shot[i] > 0) {
                if ((shot[i] >= 1) && (shot[i] < 3)) {
                    ran[i] = 5;
                }
                if ((shot[i] >= 3) && (shot[i] < 11)) {
                    ran[i] = 6;
                }
                if ((shot[i] >= 11) && (shot[i] < 14)) {
                    ran[i] = 5;
                }
                if ((shot[i] >= 20) && (shot[i] < 22)) {
                    ran[i] = 7;
                }
                if ((shot[i] >= 22) && (shot[i] < 32)) {
                    ran[i] = 8;
                }
                if ((shot[i] >= 32) && (shot[i] < 35)) {
                    ran[i] = 7;
                }
                if ((shot[i] >= 40) && (shot[i] < 45)) {
                    ran[i] = 9;
                }
                if ((shot[i] >= 45) && (shot[i] < 52)) {
                    ran[i] = 10;
                }
                if ((shot[i] >= 52) && (shot[i] < 55)) {
                    ran[i] = 9;
                }
                if ((shot[i] >= 60) && (shot[i] < 62)) {
                    ran[i] = 5;
                }
                if ((shot[i] >= 62) && (shot[i] < 75)) {
                    ran[i] = 6;
                }
                if ((shot[i] >= 75) && (shot[i] < 78)) {
                    ran[i] = 5;
                }
                if ((shot[i] >= 80) && (shot[i] < 95)) {
                    ran[i] = 14;
                }
                if ((shot[i] >= 100) && (shot[i] < 110)) {
                    ran[i] = 12;
                }
                if ((shot[i] >= 110) && (shot[i] < 120)) {
                    ran[i] = 11;
                }
                if ((shot[i] >= 130) && (shot[i] < 140)) {
                    ran[i] = 12;
                }
                if ((shot[i] >= 140) && (shot[i] < 150)) {
                    ran[i] = 11;
                }
                if ((shot[i] >= 160) && (shot[i] < 170)) {
                    ran[i] = 7;
                }
                shot[i]++;
                if (shot[i] == 15 || shot[i] == 36 || shot[i] == 56 || shot[i] == 79 || shot[i] == 96 || shot[i] == 121 || shot[i] == 151 || shot[i] == 171) {
                    shot[i] = 0;
                }
            }
            if ((blwith == -1) && (py(blx, plx[i], blz, plz[i]) < 40)) {
                if (bont != t) {
                    if ((flyshot[i] >= 0) && (!out) && (Math.random() > cutoff[t])) {
                        flyshot[i] = 1;
                        rxgo[t] = (plx[i] + (250 - (500 * Math.random())));
                        rzgo[t] = (plz[i] + (250 - (500 * Math.random())));
                        xgo[t] = blx;
                        zgo[t] = blz;
                    } else {
                        flyshot[i] = -17;
                    }
                }
                if (flyshot[i] > 0) {
                    if (bly > -30) {
                        if (onmove[t] == -1) {
                            if (py(blx, plx[i], blz, plz[i]) > 35) {
                                shot[i] = -5;
                                ran[i] = 11;
                            } else {
                                shot[i] = -11;
                            }
                            plx[i] = ((blx + plx[i]) / 2);
                            plz[i] = ((blz + plz[i]) / 2);
                            flyshot[i] = -17;
                        }
                    } else {
                        if (bly > -60) {
                            mdown = false;
                            shot[i] = -2;
                            flyshot[i] = -17;
                            ran[i] = 7;
                            plx[i] = ((blx + plx[i]) / 2);
                            plz[i] = ((blz + plz[i]) / 2);
                        } else {
                            shot[i] = 20;
                        }
                    }
                }
            }
            var cantake = false;
            var takerad = 30;
            if ((!shot[i]) || ((shot[i] >= 130) && (shot[i] < 150))) {
                cantake = true;
            }
            if ((blwith >= (t * 10)) && (blwith < (10 + (10 * t)))) {
                cantake = false;
            }
            if (blwith != -1) {
                takerad = 20;
                if ((shot[i] > 130) && (shot[i] < 150)) {
                    if (cwith[blwith] > bltime[t]) {
                        cantake = false;
                    }
                } else {
                    if (cwith[blwith] != 0) {
                        cantake = false;
                    }
                }
            }
            if ((out) && (oft != t)) {
                cantake = false;
            }
            if (out == 105 || out == 107) {
                cantake = false;
            }
            if ((cantake) && (bly > -30) && (py(blx, plx[i], blz, plz[i]) < takerad)) {
                if ((shot[i] > 130) && (shot[i] < 150) && (blwith != -1) && (Math.random() > 0.5)) {
                    shot[blwith] = 160;
                    vectsx[blwith] = -vectsx[blwith];
                    vectsz[blwith] = -vectsz[blwith];
                    outx = blx;
                    outz = blz;
                    out = 1;
                    oft = bont;
                }
                blwith = i;
                onp[t] = i;
                cwith[i] = Math.floor(bltime[t] + (bltime[t] * Math.random()));
                xgo[t] = blx;
                zgo[t] = blz;
            }
            var drawstar = false;
            if ((t == 1) && (i == onp[t]) && (blwith == i)) {
                drawstar = true;
            }
            if (t == 0) {
                if (!mutliflex) {
                    if (i == onp[t]) {
                        drawstar = true;
                    }
                } else {
                    if (i == fonp) {
                        drawstar = true;
                    }
                }
            }
            if (drawstar) {
                xp = [-2.5, 0, 2.5, 7, 6, 10, 6, 7, 2.5, 0, -2.5, -7, -6, -10, -6, -7];
                zp = [6, 10, 6, 7, 2.5, 0, -2.5, -7, -6, -10, -6, -7, -2.5, 0, 2.5, 7];
                yp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                np = 16;
                xpd = [];
                ypd = [];
                if ((t == 0) && (out == 105) && (oft == 0)) {
                    for (var k = 0; k < np; k++) {
                        xp[k] *= 1.5;
                        xp[k] += kpx[0];
                        zp[k] *= 1.5;
                        zp[k] += kpz[0];
                    }
                } else {
                    for (var k = 0; k < np; k++) {
                        xp[k] *= 1.5;
                        xp[k] += plx[i];
                        zp[k] *= 1.5;
                        zp[k] += plz[i];
                    }
                }
                if (calcdraw(xp, yp, zp, np, xpd, ypd)) {
                    rd.globalAlpha = 0.5;
                    rd.fillStyle = "#01E4FF";
                    drawpoly(xpd, ypd, np);
                    rd.globalAlpha = 1;
                }
            }
            if (plx[i] > 1400 || plx[i] < 0) {
                if ((plx[i] < 1450) && (plx[i] > -50)) {
                    if (Math.abs(plz[i] - 391) < Math.abs(vectsz[i])) {
                        plz[i] += vectsz[i];
                    }
                    if (Math.abs(plz[i] - 529) < Math.abs(vectsz[i])) {
                        plz[i] += vectsz[i];
                    }
                }
                if ((plz[i] > 391) && (plz[i] < 529)) {
                    if (plx[i] > 1430) {
                        plx[i] = 1430;
                    }
                    if (plx[i] < -30) {
                        plx[i] = -30;
                    }
                }
            }
            if (cwith[i] != 0) {
                cwith[i]--;
            }
            if (flyshot[i] != 0) {
                if (flyshot[i] > 0) {
                    flyshot[i]--;
                } else {
                    flyshot[i]++;
                }
            }
            if (imove[i] != 0) {
                imove[i] = 0;
            }
        }
    }
    if (blwith != -1) {
        if (wtrm < 12) {
            wtrm = 12;
            wtrmacel = ((speed[blwith] / 6) * Math.random());
            gbnan = false;
        }
        wtrm += wtrmacel;
        wtrmacel -= 0.02;
        bly = 0;
        if (out == 102) {
            bly = -52;
            wtrm = (7 + (py(blx, xgo[oft], blz, zgo[oft]) * 0.025));
            ran[blwith] = 13;
        }
        if (out == 101 || out == 103 || out == 104) {
            wtrm = 16;
        }
        blx = (plx[blwith] + (wtrm * msin[dir[blwith]]));
        blz = (plz[blwith] - (wtrm * mcos[dir[blwith]]));
        if (speed[blwith] > 0.2) {
            if (!gbnan) {
                bnan = Math.floor(Math.random() * 4);
                if (bnan >= 4) {
                    bnan = 3;
                }
                gbnan = true;
            }
            ban += (speed[blwith] / 9);
            if (ban >= 4) {
                ban -= 4;
            }
        } else {
            if (gbnan) {
                gbnan = false;
            }
        }
        if (netcol) {
            netcol = false;
        }
        if (netcor) {
            netcor = false;
        }
    } else {
        blx += bvx;
        bly += bvy;
        blz += bvz;
        if ((Math.abs(bly) < 0.3) && (Math.abs(bvy) < 2)) {
            bvy = 0;
            bly = 0;
            if (Math.abs(bvx) > Math.abs(0.07 * bnvx)) {
                bvx -= (bnvx * 0.07);
            } else {
                bvx = 0;
            }
            if (Math.abs(bvz) > Math.abs(0.07 * bnvz)) {
                bvz -= (bnvz * 0.07);
            } else {
                bvz = 0;
            }
        } else {
            if (Math.abs(bvx) > Math.abs(3 * bnvx)) {
                bvx -= (bnvx * 0.05);
            }
            if (Math.abs(bvz) > Math.abs(3 * bnvz)) {
                bvz -= (bnvz * 0.05);
            }
            bvy += 0.15;
        }
        if ((bvx != 0) && (bvz != 0)) {
            if (!gbnan) {
                bnan = Math.floor(Math.random() * 4);
                if (bnan >= 4) {
                    bnan = 3;
                }
                gbnan = true;
                bans = (0.1 + (Math.random() * 0.8));
            }
            ban += bans;
            if (ban >= 4) {
                ban -= 4;
            }
        }
        var limr = 1450;
        if (netcor) {
            if (blx > limr) {
                limr = (blx + 10);
            }
        }
        var liml = -50;
        if (netcol) {
            if (blx < liml) {
                liml = (blx - 10);
            }
        }
        if (((blx > 1400) && (blx < limr) && (blz > 391) && (blz < 529)) || ((blx < 0) && (blx > liml) && (blz > 391) && (blz < 529))) {
            if ((Math.abs(bly + 60) < Math.abs(bvy)) && (!colt)) {
                if (((bly > -60) && (bvy > 0)) || ((bly < -60) && (bvy < 0))) {
                    bly = -60;
                    bvy = -(bvy * 0.4);
                    gbnan = false;
                    colt = true;
                }
            }
        } else {
            if (colt) {
                colt = false;
            }
        }
        if (((blx > 1400) && (blx < limr) && (bly <= 0) && (bly > -60)) || ((blx < 0) && (blx > liml) && (bly <= 0) && (bly > -60))) {
            if ((Math.abs(blz - 391) < Math.abs(bvz)) && (!coll)) {
                if (((blz > 391) && (bvz > 0)) || ((blz < 391) && (bvz < 0))) {
                    blz = 391;
                    bvz = -(bvz * 0.4);
                    bnvz = -bnvz;
                    gbnan = false;
                    coll = true;
                }
            }
            if ((Math.abs(blz - 529) < Math.abs(bvz)) && (!colr)) {
                if (((blz > 529) && (bvz > 0)) || ((blz < 529) && (bvz < 0))) {
                    blz = 529;
                    bvz = -(bvz * 0.4);
                    bnvz = -bnvz;
                    gbnan = false;
                    colr = true;
                }
            }
        } else {
            if (coll) {
                coll = false;
            }
            if (colr) {
                colr = false;
            }
        }
        if ((blz >= 391) && (blz <= 529) && (bly <= 0) && (bly > -60) && (blx > 1400)) {
            var parb = (1450 - ((bly / -60) * 20));
            if ((!netcor) && (Math.abs(blx - parb) <= Math.abs(bvx * 1.5)) && (bvx > 0)) {
                netcor = true;
                rbvx = -(bvx * (0.02 + (Math.random() * 0.05)));
                sbvx = 0.6;
            }
        }
        if (netcor) {
            if (bvx > rbvx) {
                bvx -= sbvx;
                sbvx += 0.7;
                if (bvx < 0) {
                    bnvx = -1;
                }
            } else {
                bvx = rbvx;
            }
            var parb = (1445 - ((bly / -60) * 20));
            if (blx < parb) {
                netcor = false;
                if (blx > 1445) {
                    blx = 1445;
                }
            }
        }
        if ((blz >= 391) && (blz <= 529) && (bly <= 0) && (bly > -60) && (blx < 0)) {
            var parb = (-50 + ((bly / -60) * 20));
            if ((!netcol) && (Math.abs(blx - parb) <= Math.abs(bvx * 1.5)) && (bvx < 0)) {
                netcol = true;
                rbvx = -(bvx * (0.02 + (Math.random() * 0.05)));
                sbvx = 0.6;
            }
        }
        if (netcol) {
            if (bvx < rbvx) {
                bvx += sbvx;
                sbvx += 0.7;
                if (bvx > 0) {
                    bnvx = 1;
                }
            } else {
                bvx = rbvx;
            }
            var parb = (-45 + ((bly / -60) * 20));
            if (blx > parb) {
                netcol = false;
                if (blx < -45) {
                    blx = -45;
                }
            }
        }
        if ((bly <= 0) && (bly > -60) && ((Math.abs(blz - 529) <= (Math.abs(bvz) + 2)) || (Math.abs(blz - 391) <= (Math.abs(bvz) + 2)))) {
            if ((bvx > 0) && (blx <= 1400) && (blx >= (1400 - bvx))) {
                var mag = (Math.sqrt((bvx * bvx) + (bvz * bvz)) * 0.7);
                var anco = Math.round(185 + (170 * Math.random()));
                bvx = (msin[anco] * mag);
                bnvx = msin[anco];
                bvz = (-mcos[anco] * mag);
                bnvz = -mcos[anco];
                blrunstat[0] = 0;
                blrunstat[1] = 0;
                onrecoil = 5;
                flyball = false;
                var magvol = (Math.sqrt((bvx * bvx) + (bvz * bvz)) / 10);
                if (magvol < 0.4) {
                    magvol = 0.4;
                }
                if (magvol > 1) {
                    magvol = 1;
                }
                if (Math.random() > Math.random()) {
                    playsnd(8, magvol);
                } else {
                    playsnd(9, magvol);
                }
                lastbont = (1 - bont);
            }
            if ((bvx < 0) && (blx >= 0) && (blx <= -bvx)) {
                var mag = (Math.sqrt((bvx * bvx) + (bvz * bvz)) * 0.7);
                var anco = Math.round(5 + (170 * Math.random()));
                bvx = (msin[anco] * mag);
                bnvx = msin[anco];
                bvz = (-mcos[anco] * mag);
                bnvz = -mcos[anco];
                blrunstat[0] = 0;
                blrunstat[1] = 0;
                onrecoil = 5;
                flyball = false;
                var magvol = (Math.sqrt((bvx * bvx) + (bvz * bvz)) / 10);
                if (magvol < 0.4) {
                    magvol = 0.4;
                }
                if (magvol > 1) {
                    magvol = 1;
                }
                if (Math.random() > Math.random()) {
                    playsnd(8, magvol);
                } else {
                    playsnd(9, magvol);
                }
                lastbont = (1 - bont);
            }
        }
        if ((blz > 391) && (blz < 529) && (Math.abs(bly + 60) <= (Math.abs(bvy) + 2))) {
            if ((bvx > 0) && (blx <= 1400) && (blx >= (1400 - bvx))) {
                var mag = (Math.sqrt((bvx * bvx) + (bvy * bvy)) * 0.7);
                var anco = Math.round(5 + (170 * Math.random()));
                bvx = (-msin[anco] * mag);
                bnvx = -msin[anco];
                bvy = (mcos[anco] * mag);
                blrunstat[0] = 0;
                blrunstat[1] = 0;
                onrecoil = 5;
                flyball = false;
                var magvol = (Math.sqrt((bvx * bvx) + (bvz * bvz)) / 10);
                if (magvol < 0.4) {
                    magvol = 0.4;
                }
                if (magvol > 1) {
                    magvol = 1;
                }
                if (Math.random() > Math.random()) {
                    playsnd(8, magvol);
                } else {
                    playsnd(9, magvol);
                }
                lastbont = (1 - bont);
            }
            if ((bvx < 0) && (blx >= 0) && (blx <= -bvx)) {
                var mag = (Math.sqrt((bvx * bvx) + (bvy * bvy)) * 0.7);
                var anco = Math.round(5 + (170 * Math.random()));
                bvx = (msin[anco] * mag);
                bnvx = msin[anco];
                bvy = (mcos[anco] * mag);
                blrunstat[0] = 0;
                blrunstat[1] = 0;
                onrecoil = 5;
                flyball = false;
                var magvol = (Math.sqrt((bvx * bvx) + (bvz * bvz)) / 10);
                if (magvol < 0.4) {
                    magvol = 0.4;
                }
                if (magvol > 1) {
                    magvol = 1;
                }
                if (Math.random() > Math.random()) {
                    playsnd(8, magvol);
                } else {
                    playsnd(9, magvol);
                }
                lastbont = (1 - bont);
            }
        }
        if (bly > 0) {
            bly = 0;
            bvy = -(bvy * 0.7);
            gbnan = false;
            flyball = false;
        }
        if (flyball) {
            if (bly == 0) {
                flyball = false;
            }
        }
    }
    goalkeepers();
    if (onrecoil > 0) {
        onrecoil--;
    }
    if (out != 105) {
        if (blwith != -1) {
            if (blwith < 10) {
                bont = 0;
            } else {
                bont = 1;
            }
        } else {
            if (lai < 10) {
                bont = 0;
            } else {
                bont = 1;
            }
        }
    } else {
        bont = oft;
    }
    if ((!goal) && (!onrecoil) && (!out)) {
        if ((blz > 391) && (blz < 529) && (blx > 1400) && (blx < 1450) && (bly > -60)) {
            goal = 1;
            if (((lai < 10) && (side == 0)) || ((lai >= 10) && (side == 1))) {
                onp[side] = lai;
                owngoal = false;
            } else {
                owngoal = true;
            }
            glt = side;
            score[glt]++;
            if (penmode) {
                bescore[glt]++;
            }
            if (nt == 1) {
                glt = 1;
            }
        }
        if ((blz > 391) && (blz < 529) && (blx < 0) && (blx > -50) && (bly > -60)) {
            goal = 1;
            if (((lai < 10) && (side == 1)) || ((lai >= 10) && (side == 0))) {
                onp[(1 - side)] = lai;
                owngoal = false;
            } else {
                owngoal = true;
            }
            glt = (1 - side);
            score[glt]++;
            if (penmode) {
                bescore[glt]++;
            }
            if (nt == 1) {
                glt = 1;
            }
        }
        if (!goal) {
            if ((blz < 0) || (blz > 920) || (blx < 0) || (blx > 1400)) {
                outx = blx;
                outz = blz;
                out = 1;
                oft = (1 - bont);
                if (nt == 1) {
                    oft = 0;
                }
            }
        }
    }
    if (goal) {
        if (goal == 1) {
            outx = Math.floor(Math.random() * 700);
            if (blx > 700) {
                outx += 700;
            }
            outz = Math.floor(Math.random() * 920);
            glrun = Math.floor(40 + (Math.random() * 70));
            if (penmode) {
                glrun = Math.floor(30 + (Math.random() * 20));
            }
            if (Math.random() > Math.random()) {
                gslb = 1;
            } else {
                gslb = 0;
            }
            goalsad = Math.floor(20 + (Math.random() * 40));
            ksadir = Math.floor(359 * Math.random());
            if (Math.random() > Math.random()) {
                ksadps = 12;
            } else {
                ksadps = 13;
            }
        }
        if ((goal > glrun) && (goal < (glrun + 70))) {
            if (!owngoal) {
                ran[onp[glt]] = (15 + gslb);
            } else {
                ran[onp[glt]] = 0;
            }
        }
        goal++;
        if ((nt == 1) && (goal == 100)) {
            recentar();
        }
        if ((nt == 2) && (goal == 189)) {
            if (recreached) {
                onreplay = true;
                rf = (cf - 1);
                switchrep = 20;
            }
        }
        if ((penmode) && (goal >= 100) && (afterpen > 10)) {
            afterpen = 10;
        }
        if (goal == 200) {
            recentar();
        }
    }
    if ((out) && (out < 100)) {
        out++;
        if ((penmode) && (out >= 80) && (afterpen > 10)) {
            afterpen = 10;
        }
        if (out == 100) {
            restat();
            vectsx[onp[oft]] = 0;
            vectsz[onp[oft]] = 0;
            speed[onp[oft]] = 0;
            blrunstat[oft] = 0;
            bvx = 0;
            bvz = 0;
            blwith = onp[oft];
            shot[onp[oft]] = 0;
            if ((outx > 0) && (outx < 1400) && (outz > 0) && (outz < 920)) {
                out = 103;
                if (oft == side) {
                    dir[onp[oft]] = 90;
                }
                if (oft == (1 - side)) {
                    dir[onp[oft]] = 270;
                }
                if ((outx > 1200) && (outx < 1400) && (outz > 260) && (outz < 660) && (oft == side)) {
                    out = 104;
                    outx = 1230;
                    outz = 460;
                }
                if ((outx > 0) && (outx < 200) && (outz > 260) && (outz < 660) && (oft == (1 - side))) {
                    out = 104;
                    outx = 170;
                    outz = 460;
                }
                plx[onp[oft]] = outx;
                plz[onp[oft]] = outz;
            } else {
                if ((outx < 0) || (outx > 1400)) {
                    if (((oft == (1 - side)) && (outx < 0)) || ((oft == side) && (outx > 1400))) {
                        if (outz < 460) {
                            plz[onp[oft]] = 0;
                            if (outx > 1400) {
                                plx[onp[oft]] = 1398;
                                dir[onp[oft]] = 225;
                            } else {
                                plx[onp[oft]] = 2;
                                dir[onp[oft]] = 135;
                            }
                        } else {
                            plz[onp[oft]] = 920;
                            if (outx > 1400) {
                                plx[onp[oft]] = 1398;
                                dir[onp[oft]] = 315;
                            } else {
                                plx[onp[oft]] = 2;
                                dir[onp[oft]] = 45;
                            }
                        }
                        out = 101;
                    } else {
                        out = 105;
                        blwith = -1;
                        if (oft == side) {
                            outx = 60;
                            kdir[oft] = 90;
                        } else {
                            outx = 1340;
                            kdir[oft] = 270;
                        }
                        outz = (400 + (Math.random() * 120));
                        kpx[oft] = outx;
                        kpz[oft] = outz;
                    }
                } else {
                    plx[onp[oft]] = outx;
                    if (outz > 920) {
                        plz[onp[oft]] = 920;
                        dir[onp[oft]] = 0;
                    } else {
                        plz[onp[oft]] = 0;
                        dir[onp[oft]] = 180;
                    }
                    out = 102;
                }
            }
            onout = out;
            onoutc = 100;
            if (out == 103 || out == 104) {
                holdout = 80;
            }
            xgo[oft] = plx[onp[oft]];
            zgo[oft] = plz[onp[oft]];
        }
    }
    if (penmode) {
        if (afterpen == 0) {
            if ((bested[0] == bestof) && (bested[1] == bestof)) {
                if (score[0] != score[1]) {
                    fase = 10;
                } else {
                    bestof = 1;
                    bested[0] = 0;
                    bested[1] = 0;
                    bescore[0] = 0;
                    bescore[1] = 0;
                }
            }
            if (fase != 10) {
                goal = 0;
                if (tosup == 0) {
                    tosup = 1;
                } else {
                    tosup = 0;
                }
                side = tosup;
                oft = side;
                out = 104;
                outx = 1230;
                outz = 460;
                for (var i = 0; i < 20; i++) {
                    plx[i] = grx[i];
                    plz[i] = grz[i];
                }
                onp[oft] = penturn[oft];
                penturn[oft]--;
                if (penturn[oft] < (10 * oft)) {
                    penturn[oft] = (9 + (10 * oft));
                }
                plx[onp[oft]] = outx;
                plz[onp[oft]] = outz;
                dir[onp[oft]] = 90;
                vectsx[onp[oft]] = 0;
                vectsz[onp[oft]] = 0;
                speed[onp[oft]] = 0;
                blrunstat[oft] = 0;
                bvx = 0;
                bvz = 0;
                blwith = onp[oft];
                shot[onp[oft]] = 0;
                if (side == 0) {
                    kpx = [50, 1350];
                    kdir = [90, 270];
                } else {
                    kpx = [1350, 50];
                    kdir = [270, 90];
                }
                kpz = [460, 460];
                inishkeeper();
                afterpen = 100;
            }
        }
        if (((!out) && (!goal)) || (afterpen <= 10) || (out == 105)) {
            if (afterpen > 0) {
                afterpen--;
            }
        }
    }
}
var savekape = [1, 1];
var fromhead = 0;
var firstshot = false;
var kpx = [50, 1350];
var kpz = [460, 460];
var kdir = [90, 270];
var kan = [0, 0];
var kgx = [0, 0];
var kgz = [0, 0];
var kgupdt = [0, 0];
var gvx = [0, 0];
var gvz = [0, 0];
var gvrand = [0, 0];
var kran = [0, 0];
var flynow = [0, 0];
var flx = [0, 0];
var flz = [0, 0];
var fldist = [0, 0];
var flcaut = [0, 0];
var onshot = [0, 0];
var flk8 = [0, 0];
var justgrab = [0, 0];
var goalsad = 30;
var ksadir = 0;
var ksadps = 0;
var penkick = 0;
var lastbv = 0;

function inishkeeper() {
    if (side == 0) {
        kpx = [50, 1350];
        kdir = [90, 270];
    } else {
        kpx = [1350, 50];
        kdir = [270, 90];
    }
    kpz = [460, 460];
    kan = [0, 0];
    kran = [0, 0];
    gvx = [0, 0];
    gvz = [0, 0];
    kgx = [0, 0];
    kgz = [0, 0];
    gvrand = [0, 0];
    kgupdt = [0, 0];
    flynow = [0, 0];
    flx = [0, 0];
    flz = [0, 0];
    fldist = [0, 0];
    flcaut = [0, 0];
    onshot = [0, 0];
    flk8 = [0, 0];
    justgrab = [0, 0];
    goalsad = Math.floor(20 + (Math.random() * 40));
}

function goalkeepers() {
    for (var i = 0; i < nt; i++) {
        if (!flynow[i]) {
            if ((out != 105) || (oft != i)) {
                kan[i] = 0;
                var loc = 60;
                if (out == 104) {
                    loc = 10;
                }
                if (kgupdt[i] == 0) {
                    if (i == side) {
                        var dfct = (py(blx, 0, blz, 460) / loc);
                        kgx[i] = (blx / dfct);
                        kgz[i] = (460 + ((blz - 460) / dfct));
                        if (kgx[i] < -20) {
                            kgx[i] = -20;
                        }
                    } else {
                        var dfct = (py(blx, 1400, blz, 460) / loc);
                        kgx[i] = (1400 + ((blx - 1400) / dfct));
                        kgz[i] = (460 + ((blz - 460) / dfct));
                        if (kgx[i] > 1420) {
                            kgx[i] = 1420;
                        }
                    }
                    kgupdt[i] = Math.floor(Math.random() * 100);
                } else {
                    kgupdt[i]--;
                }
                if (gvrand[i] == 0) {
                    gvx[i] = Math.floor((30 * Math.random()) - 15);
                    gvz[i] = Math.floor((30 * Math.random()) - 15);
                    if (i == side) {
                        gvrand[i] = Math.floor(Math.random() * (blx / 10));
                    } else {
                        gvrand[i] = Math.floor(Math.random() * ((1400 - blx) / 10));
                    }
                    if (gvrand[i] < 20) {
                        gvrand[i] = 20;
                    }
                    if (out || centara) {
                        gvrand[i] = Math.floor(Math.random() * 140);
                    }
                } else {
                    gvrand[i]--;
                }
                gox = (kgx[i] + gvx[i]);
                goz = (kgz[i] + gvz[i]);
                if (goal < goalsad) {
                    var ismovin = false;
                    if (Math.abs(kpx[i] - gox) > 1) {
                        if (kpx[i] > gox) {
                            kpx[i]--;
                        } else {
                            kpx[i]++;
                        }
                        ismovin = true;
                    } else {
                        kpx[i] = gox;
                    }
                    if (Math.abs(kpz[i] - goz) > 1) {
                        if (kpz[i] > goz) {
                            kpz[i]--;
                        } else {
                            kpz[i]++;
                        }
                        ismovin = true;
                    } else {
                        kpz[i] = goz;
                    }
                    if (ismovin) {
                        kran[i] += 0.1;
                        if (kran[i] >= 2) {
                            kran[i] -= 2;
                        }
                        kan[i] = Math.floor(10 + kran[i]);
                    }
                    var rang = Math.round(Math.abs(Math.atan((kpx[i] - blx) / (kpz[i] - blz)) * (180 / Math.PI)));
                    if (kpx[i] < blx) {
                        if (kpz[i] < blz) {
                            rang = ((90 - rang) + 90);
                        }
                    } else {
                        if (kpz[i] < blz) {
                            rang += 180;
                        } else {
                            rang = ((90 - rang) + 270);
                        }
                    }
                    if (rang == 360) {
                        rang = 0;
                    }
                    kdir[i] = rang;
                } else {
                    kdir[i] = ksadir;
                    kan[i] = ksadps;
                }
                if (onshot[i] != 0) {
                    kan[i] = 9;
                    onshot[i]--;
                }
                if ((blwith == -1) && (!justgrab[i]) && (bvx != 0 || bvz != 0) && (goal < goalsad)) {
                    if (i != side) {
                        var topslop = ((560 - blz) / (1400 - blx));
                        var botslop = ((360 - blz) / (1400 - blx));
                        blslop = (bvz / bvx);
                        if ((bvx > 0) && ((blx + (bvx * 11)) > 1400) && (blslop > botslop) && (blslop < topslop)) {
                            flx[i] = (1400 - (30 * Math.random()));
                            flz[i] = (((1400 - blx) * blslop) + blz);
                            fldist[i] = py(kpx[i], flx[i], kpz[i], flz[i]);
                            var tbly = bly;
                            if (penkick) {
                                if ((!penmode) || (side != 0)) {
                                    cumborg = Math.random();
                                }
                                if (Math.random() < cumborg) {
                                    flz[i] = (260 + (400 * Math.random()));
                                    if (flz[i] < 390) {
                                        flz[i] = 390;
                                    }
                                    if (flz[i] > 530) {
                                        flz[i] = 530;
                                    }
                                    tbly = (-80 * Math.random());
                                } else {
                                    penkick = 0;
                                }
                            }
                            if (tbly < -40) {
                                if (flz[i] < kpz[i]) {
                                    kan[i] = 3;
                                    flz[i] -= 25;
                                } else {
                                    kan[i] = 2;
                                    flz[i] += 25;
                                }
                            }
                            if ((tbly < -20) && (tbly >= -40)) {
                                if (flz[i] < kpz[i]) {
                                    kan[i] = 5;
                                    flz[i] -= 25;
                                } else {
                                    kan[i] = 4;
                                    flz[i] += 25;
                                }
                            }
                            if (tbly >= -20) {
                                if (Math.abs(flz[i] - kpz[i]) > 30) {
                                    if (flz[i] < kpz[i]) {
                                        kan[i] = 7;
                                        flz[i] -= 10;
                                    } else {
                                        kan[i] = 6;
                                        flz[i] += 10;
                                    }
                                } else {
                                    kan[i] = 1;
                                }
                            }
                            justgrab[i] = 0;
                            flynow[i] = 1;
                        }
                    } else {
                        var topslop = ((560 - blz) / blx);
                        var botslop = ((360 - blz) / blx);
                        blslop = (bvz / bvx);
                        if ((bvx < 0) && ((blx + (bvx * 11)) < 0) && (blslop > botslop) && (blslop < topslop)) {
                            flx[i] = (30 * Math.random());
                            flz[i] = ((-blx * blslop) + blz);
                            fldist[i] = py(kpx[i], flx[i], kpz[i], flz[i]);
                            var tbly = bly;
                            if (penkick) {
                                if ((!penmode) || (side != 0)) {
                                    cumborg = Math.random();
                                }
                                if (Math.random() < cumborg) {
                                    flz[i] = (260 + (400 * Math.random()));
                                    if (flz[i] < 390) {
                                        flz[i] = 390;
                                    }
                                    if (flz[i] > 530) {
                                        flz[i] = 530;
                                    }
                                    tbly = (-80 * Math.random());
                                } else {
                                    penkick = 0;
                                }
                            }
                            if (tbly < -40) {
                                if (flz[i] < kpz[i]) {
                                    kan[i] = 2;
                                    flz[i] -= 25;
                                } else {
                                    kan[i] = 3;
                                    flz[i] += 25;
                                }
                            }
                            if ((tbly < -20) && (tbly >= -40)) {
                                if (flz[i] < kpz[i]) {
                                    kan[i] = 4;
                                    flz[i] -= 25;
                                } else {
                                    kan[i] = 5;
                                    flz[i] += 25;
                                }
                            }
                            if (tbly >= -20) {
                                if (Math.abs(flz[i] - kpz[i]) > 30) {
                                    if (flz[i] < kpz[i]) {
                                        kan[i] = 6;
                                        flz[i] -= 10;
                                    } else {
                                        kan[i] = 7;
                                        flz[i] += 10;
                                    }
                                } else {
                                    kan[i] = 1;
                                }
                            }
                            justgrab[i] = 0;
                            flynow[i] = 1;
                        }
                    }
                }
                if (justgrab[i] != 0) {
                    justgrab[i]--;
                }
                var jgrange = 20;
                if (blwith != -1) {
                    jgrange = 60;
                }
                if ((blwith != -1) && (bont == i)) {
                    justgrab[i] = 1;
                }
                if ((!justgrab[i]) && (!onshot[i]) && (!flynow[i]) && (bly > -40) && (py(kpx[i], blx, kpz[i], blz) < jgrange) && (goal < goalsad)) {
                    flx[i] = blx;
                    flz[i] = blz;
                    kan[i] = 1;
                    justgrab[i] = 1;
                    flynow[i] = 1;
                }
            } else {
                kan[i] = 0;
                if ((i == 0) && (oft == 0)) {
                    if (mdown) {
                        onshot[i] = 1;
                        rxgo[i] = xgo[0];
                        rzgo[i] = zgo[0];
                    } else {
                        if (onshot[i] == 1) {
                            onshot[i] = 16;
                            rxgo[i] = xgo[0];
                            rzgo[i] = zgo[0];
                        }
                    }
                }
                if ((py(kpx[i], outx, kpz[i], outz) > 5) && (!onshot[i])) {
                    var rang = Math.round(Math.abs(Math.atan((kpx[i] - outx) / (kpz[i] - outz)) * (180 / Math.PI)));
                    if (kpx[i] < outx) {
                        if (kpz[i] < outz) {
                            rang = ((90 - rang) + 90);
                        }
                    } else {
                        if (kpz[i] < outz) {
                            rang += 180;
                        } else {
                            rang = ((90 - rang) + 270);
                        }
                    }
                    if (rang == 360) {
                        rang = 0;
                    }
                    kdir[i] = rang;
                    kpx[i] += (msin[kdir[i]] * 2);
                    kpz[i] -= (mcos[kdir[i]] * 2);
                    kran[i] += 0.1;
                    if (kran[i] >= 2) {
                        kran[i] -= 2;
                    }
                    kan[i] = Math.floor(10 + kran[i]);
                } else {
                    if (onshot[i]) {
                        var rang = Math.round(Math.abs(Math.atan((kpx[i] - rxgo[i]) / (kpz[i] - rzgo[i])) * (180 / Math.PI)));
                        if (kpx[i] < rxgo[i]) {
                            if (kpz[i] < rzgo[i]) {
                                rang = ((90 - rang) + 90);
                            }
                        } else {
                            if (kpz[i] < rzgo[i]) {
                                rang += 180;
                            } else {
                                rang = ((90 - rang) + 270);
                            }
                        }
                        if (rang == 360) {
                            rang = 0;
                        }
                        kdir[i] = rang;
                        if (onshot[i] == 1) {
                            if (flk8[i] > 0) {
                                flk8[i]--;
                                if (flk8[i] <= 0) {
                                    flk8[i] = -Math.floor(50 + (50 * Math.random()));
                                }
                                kan[i] = 8;
                            } else {
                                flk8[i]++;
                                if (flk8[i] >= 0) {
                                    flk8[i] = Math.floor(10 + (Math.random() * 10));
                                }
                            }
                        } else {
                            onshot[i]--;
                            kan[i] = 8;
                            if (onshot[i] <= 8) {
                                kan[i] = 9;
                            }
                            if (onshot[i] == 4) {
                                var pygo = py(rxgo[i], kpx[i], rzgo[i], kpz[i]);
                                hmag = (1 + (pygo / (130 + 20 * Math.random())));
                                vmag = (1 + (pygo / (130 + 20 * Math.random())));
                                bvx = (msin[kdir[i]] * (2 + hmag));
                                bnvx = msin[kdir[i]];
                                bvz = (-mcos[kdir[i]] * (2 + hmag));
                                bnvz = -mcos[kdir[i]];
                                bvy = -vmag;
                                out = 0;
                                flyball = true;
                                lai = (i * 10);
                                var magvol = (Math.sqrt((hmag * hmag) + (vmag * vmag)) / 10);
                                if (magvol < 0.4) {
                                    magvol = 0.4;
                                }
                                if (magvol > 1) {
                                    magvol = 1;
                                }
                                if (Math.random() > Math.random()) {
                                    playsnd(4, magvol);
                                } else {
                                    playsnd(5, magvol);
                                }
                            }
                        }
                    }
                }
                blx = (kpx[i] + (16 * msin[kdir[i]]));
                blz = (kpz[i] - (16 * mcos[kdir[i]]));
            }
        } else {
            if (!justgrab[i]) {
                kpx[i] += ((flx[i] - kpx[i]) / 11);
                kpz[i] += ((flz[i] - kpz[i]) / 11);
            } else {
                kpx[i] += ((blx - kpx[i] - (16 * msin[kdir[i]])) / 11);
                kpz[i] += ((blz - kpz[i] + (16 * mcos[kdir[i]])) / 11);
            }
            if (flynow[i] == 1) {
                if (!justgrab[i]) {
                    if (((i == side) && ((blx + bvx) < kpx[i]) && (bly > -60)) || ((i != side) && ((blx + bvx) > kpx[i]) && (bly > -60))) {
                        lastbv = Math.sqrt((bvx * bvx) + (bvz * bvz));
                        var blsped = ((lastbv - 6) / 16.667);
                        var blhit = Math.abs(bly / 200);
                        var bldist = (Math.abs(flz[i] - 460) / 230);
                        flcaut[i] = 0;
                        if (Math.random() > ((blsped + blhit + bldist + fromhead) * savekape[i])) {
                            flcaut[i] = 1;
                        }
                        if ((!firstshot) && (i == 1)) {
                            flcaut[i] = 0;
                            firstshot = true;
                        }
                        if (penkick) {
                            flcaut[i] = 0;
                        }
                        if ((flcaut[i] == 1) && (kan[i] == 6 || kan[i] == 7) && (Math.random() > Math.random())) {
                            flcaut[i] = 2;
                        }
                        flynow[i] = 2;
                    }
                    if ((py(kpx[i], flx[i], kpz[i], flz[i]) < 11) || (goal) || (out)) {
                        flynow[i] = 2;
                        flcaut[i] = 0;
                    }
                    if (flynow[i] == 2) {
                        if (flcaut[i] == 2) {
                            var magvol = (Math.sqrt((bvx * bvx) + (bvz * bvz)) / 10);
                            if (magvol < 0.4) {
                                magvol = 0.4;
                            }
                            if (magvol > 1) {
                                magvol = 1;
                            }
                            if (Math.random() > Math.random()) {
                                playsnd(6, magvol);
                            } else {
                                playsnd(7, magvol);
                            }
                        }
                        if (flcaut[i] == 1) {
                            var magvol = (Math.sqrt((bvx * bvx) + (bvz * bvz)) / 10);
                            if (magvol < 0.4) {
                                magvol = 0.4;
                            }
                            if (magvol > 1) {
                                magvol = 1;
                            }
                            if (Math.random() > Math.random()) {
                                playsnd(10, magvol);
                            } else {
                                playsnd(11, magvol);
                            }
                        }
                    }
                } else {
                    justgrab[i]++;
                    if (justgrab[i] == 7) {
                        flynow[i] = 2;
                        if (blwith != -1) {
                            if (Math.random() > Math.random()) {
                                flcaut[i] = 1;
                            } else {
                                flcaut[i] = 0;
                            }
                        } else {
                            flcaut[i] = 1;
                        }
                        justgrab[i] = 30;
                    }
                    if (goal || out) {
                        flynow[i] = 2;
                        flcaut[i] = 0;
                        justgrab[i] = 30;
                    }
                }
            }
            if (flynow[i] >= 2) {
                if (flcaut[i] == 0) {
                    kan[i] = 1;
                }
                if (flcaut[i] == 1) {
                    blwith = -1;
                    bvx = 0;
                    bvz = 0;
                    bvy = 0;
                    var captx = (kpx[i] + (16 * msin[kdir[i]]));
                    var captz = (kpz[i] - (16 * mcos[kdir[i]]));
                    blx += ((captx - blx) / 4);
                    blz += ((captx - blx) / 4);
                    if (bly < -10) {
                        bly -= (bly / 4);
                    }
                    if (bly > -40) {
                        kan[i] = 1;
                    }
                    if (flynow[i] == 12) {
                        oft = i;
                        out = 105;
                        blwith = -1;
                        if (i == side) {
                            outx = (120 + (Math.random() * 60));
                        } else {
                            outx = (1280 - (Math.random() * 60));
                        }
                        outz = (360 + (Math.random() * 200));
                    }
                }
                if ((flcaut[i] == 2) && (flynow[i] == 2)) {
                    var mag = (Math.sqrt((bvx * bvx) + (bvz * bvz)) * Math.random());
                    var anco = 0;
                    if (i == side) {
                        anco = Math.round(5 + (170 * Math.random()));
                    } else {
                        anco = Math.round(185 + (170 * Math.random()));
                    }
                    bvx = (msin[anco] * mag);
                    bnvx = msin[anco];
                    bvz = (-mcos[anco] * mag);
                    bnvz = -mcos[anco];
                    blrunstat[0] = 0;
                    blrunstat[1] = 0;
                    onrecoil = 5;
                    flyball = false;
                    flynow[i] = 12;
                    lastbont = i;
                }
                if (flynow[i] == 12) {
                    if ((nt == 2) && (flcaut[i] == 1) && (bont != i) && (lastbv > 5)) {
                        playsnd(15, 1);
                    }
                    flynow[i] = 0;
                } else {
                    flynow[i]++;
                }
            }
        }
    }
    if (penkick != 0) {
        penkick--;
    }
}
var raqas = 0.5;
var badpass = false;
var ballcontrol = 0.5;
var shotongoal = 0;
var findmygo = 50;
var rax = 0,
    raz = 0;
var angadd = 0;
var cntgo = 0;
var donce = false;
var cntout = 0;
var cnthead = 0;
var forbes = -1;
var kpflex = 0;

function playcomputer() {
    if (blwith == onp[1] || ((out == 105) && (oft == 1))) {
        cnthead = 0;
        forbes = -1;
        if ((out < 100) && (!centara)) {
            if (findmygo == 50 || plz[blwith] == zgo[1]) {
                if (side == 0) {
                    xgo[1] = 0;
                } else {
                    xgo[1] = 1400;
                }
                zgo[1] = Math.round(Math.random() * 920);
                angadd = 0;
            }
            var rang = Math.round(Math.abs(Math.atan((plx[blwith] - xgo[1]) / (plz[blwith] - zgo[1])) * (180 / Math.PI)));
            if (plx[blwith] < xgo[1]) {
                if (plz[blwith] < zgo[1]) {
                    rang = ((90 - rang) + 90);
                }
            } else {
                if (plz[blwith] < zgo[1]) {
                    rang += 180;
                } else {
                    rang = ((90 - rang) + 270);
                }
            }
            if (rang == 360) {
                rang = 0;
            }
            dir[blwith] = (rang + angadd);
            while (dir[blwith] >= 360) {
                dir[blwith] -= 360;
            }
            while (dir[blwith] < 0) {
                dir[blwith] += 360;
            }
            if (findmygo < 50) {
                var vecr = 50;
                rax = (plx[blwith] + (vectsx[blwith] * vecr));
                raz = (plz[blwith] - (vectsz[blwith] * vecr));
                for (var i = 0; i < 10; i++) {
                    if (py(rax, plx[i], raz, plz[i]) < 50) {
                        angadd = Math.round(45 + (Math.random() * 225 * raqas));
                        if (Math.random() > Math.random()) {
                            angadd *= -1;
                        }
                        findmygo = Math.round(70 + ((1 - raqas) * 20 * Math.random()));
                    }
                }
            }
            onmove[1] = blwith;
            if (cntgo == -1) {
                cntgo = (cwith[blwith] * Math.random() * (1 + ballcontrol));
            }
            cntgo--;
            if (side == 0) {
                if (plx[blwith] < 300) {
                    cntgo -= 2;
                }
                if (plx[blwith] < 200) {
                    cntgo -= 2;
                }
            }
            if (side == 1) {
                if (plx[blwith] > 1100) {
                    cntgo -= 2;
                }
                if (plx[blwith] > 1200) {
                    cntgo -= 2;
                }
            }
            if (cntgo < 0) {
                cntgo = 0;
            }
            var shootnow = false;
            if (cntgo == 0) {
                var doubletry = 0;
                while ((doubletry < 2) && (!shootnow)) {
                    for (var i = 19; i >= 10; i--) {
                        if ((i != blwith) && (!shootnow)) {
                            var cleartopass = 0;
                            var plpy = py(plx[blwith], plx[i], plz[blwith], plz[i]);
                            if (doubletry == 0) {
                                if (((side == 0) && (plx[i] < plx[blwith])) || ((side == 1) && (plx[i] > plx[blwith]))) {
                                    cleartopass = 1;
                                }
                                if (((side == 0) && (plx[blwith] < 200)) || ((side == 1) && (plx[blwith] > 1200))) {
                                    cleartopass = 2;
                                }
                            } else {
                                cleartopass = 2;
                            }
                            if ((cleartopass) && (plpy < 900) && (plpy > 200)) {
                                var pang = Math.round(Math.abs(Math.atan((plx[blwith] - plx[i]) / (plz[blwith] - plz[i])) * (180 / Math.PI)));
                                if (plx[blwith] < plx[i]) {
                                    if (plz[blwith] < plz[i]) {
                                        pang = ((90 - pang) + 90);
                                    }
                                } else {
                                    if (plz[blwith] < plz[i]) {
                                        pang += 180;
                                    } else {
                                        pang = ((90 - pang) + 270);
                                    }
                                }
                                if (pang == 360) {
                                    pang = 0;
                                }
                                var overide = false;
                                if ((cleartopass == 2) && (plpy > 460)) {
                                    overide = true;
                                }
                                if (!overide) {
                                    for (var k = 0; k < 10; k++) {
                                        var xplpy = py(plx[blwith], plx[k], plz[blwith], plz[k]);
                                        if ((xplpy < plpy) && (cleartopass)) {
                                            var xpang = Math.round(Math.abs(Math.atan((plx[blwith] - plx[k]) / (plz[blwith] - plz[k])) * (180 / Math.PI)));
                                            if (plx[blwith] < plx[k]) {
                                                if (plz[blwith] < plz[k]) {
                                                    xpang = ((90 - xpang) + 90);
                                                }
                                            } else {
                                                if (plz[blwith] < plz[k]) {
                                                    xpang += 180;
                                                } else {
                                                    xpang = ((90 - xpang) + 270);
                                                }
                                            }
                                            if (xpang == 360) {
                                                xpang = 0;
                                            }
                                            var dif = Math.abs(pang - xpang);
                                            if (dif > 180) {
                                                dif = Math.abs(dif - 360);
                                            }
                                            if (dif < 25) {
                                                cleartopass = 0;
                                                break;
                                            }
                                        }
                                    }
                                }
                                if (cleartopass) {
                                    rxgo[1] = plx[i];
                                    rzgo[1] = plz[i];
                                    shootnow = true;
                                    break;
                                }
                            }
                        }
                    }
                    if (badpass) {
                        doubletry++;
                    } else {
                        doubletry = 3;
                    }
                }
                var goldenpass = false;
                if ((shootnow) && (Math.abs(rzgo[1] - 460) < 250)) {
                    if (((side == 0) && (rxgo[1] < 250)) || ((side == 1) && (rxgo[1] > 1150))) {
                        goldenpass = true;
                    }
                }
                if ((!goldenpass) || (Math.random() > Math.random())) {
                    var infrad = 0;
                    if (((side == 0) && (plx[blwith] < 400)) || ((side == 1) && (plx[blwith] > 1000))) {
                        for (var i = 10; i < 20; i++) {
                            if (i != blwith) {
                                if (((side == 0) && (plx[blwith] < plx[i])) || ((side == 1) && (plx[blwith] > plx[i]))) {
                                    infrad++;
                                }
                            }
                        }
                    }
                    if ((side == 0) && ((Math.random() > ((plx[blwith] - 100) / 500)) || infrad == 9)) {
                        var goaline = ((70 + (70 * shotongoal)) * Math.random());
                        if (Math.random() > Math.random()) {
                            goaline *= -1;
                        }
                        rzgo[1] = (460 + goaline);
                        rxgo[1] = 0;
                        shootnow = true;
                    }
                    if ((side == 1) && ((Math.random() > ((1300 - plx[blwith]) / 500)) || infrad == 9)) {
                        var goaline = ((70 + (70 * shotongoal)) * Math.random());
                        if (Math.random() > Math.random()) {
                            goaline *= -1;
                        }
                        rzgo[1] = (460 + goaline);
                        rxgo[1] = 1400;
                        shootnow = true;
                    }
                }
            }
            if (shootnow) {
                var rang = Math.round(Math.abs(Math.atan((plx[blwith] - rxgo[1]) / (plz[blwith] - rzgo[1])) * (180 / Math.PI)));
                if (plx[blwith] < rxgo[1]) {
                    if (plz[blwith] < rzgo[1]) {
                        rang = ((90 - rang) + 90);
                    }
                } else {
                    if (plz[blwith] < rzgo[1]) {
                        rang += 180;
                    } else {
                        rang = ((90 - rang) + 270);
                    }
                }
                if (rang == 360) {
                    rang = 0;
                }
                dir[blwith] = rang;
                onmove[1] = -1;
            }
            findmygo--;
            if (findmygo == 0) {
                findmygo = 50;
            }
            if (cntout != 0) {
                cntout = 0;
            }
        } else {
            var shootnow = false;
            if (centara) {
                onmove[1] = blwith;
                xgo[1] = plx[blwith];
                zgo[1] = plz[blwith];
                var cntcent = 50;
                if (time == 0 || time == 3750) {
                    cntcent = 100;
                }
                if (cntout > cntcent) {
                    for (var i = 10; i < 20; i++) {
                        if ((i != blwith) && (!shootnow)) {
                            var plpy = py(plx[blwith], plx[i], plz[blwith], plz[i]);
                            if ((plpy < 400) && (Math.random() < Math.random())) {
                                rxgo[1] = plx[i];
                                rzgo[1] = plz[i];
                                shootnow = true;
                                break;
                            }
                        }
                    }
                }
                cntout++;
            }
            if (out == 101) {
                onmove[1] = blwith;
                xgo[1] = plx[blwith];
                zgo[1] = plz[blwith];
                if (cntout == 40) {
                    if (outx < 0) {
                        rxgo[1] = (50 + (300 * Math.random()));
                    }
                    if (outx > 1400) {
                        rxgo[1] = (1350 - (300 * Math.random()));
                    }
                    if (outz < 460) {
                        rzgo[1] = (660 - (100 * Math.random()) - (shotongoal * 400 * Math.random()));
                    } else {
                        rzgo[1] = (260 + (100 * Math.random()) + (shotongoal * 400 * Math.random()));
                    }
                    shootnow = true;
                }
                cntout++;
            }
            if (out == 102) {
                onmove[1] = blwith;
                xgo[1] = plx[blwith];
                zgo[1] = plz[blwith];
                if (cntout == 0) {
                    dir[blwith] += Math.round((180 * Math.random()) - 90);
                    if (dir[blwith] >= 360) {
                        dir[blwith] -= 360;
                    }
                    if (dir[blwith] < 0) {
                        dir[blwith] += 360;
                    }
                }
                if (cntout >= 30) {
                    for (var i = 19; i >= 10; i--) {
                        if ((i != blwith) && (!shootnow)) {
                            var plpy = py(plx[blwith], plx[i], plz[blwith], plz[i]);
                            if ((plpy < 500) && (plpy > 10)) {
                                var pang = Math.round(Math.abs(Math.atan((plx[blwith] - plx[i]) / (plz[blwith] - plz[i])) * (180 / Math.PI)));
                                if (plx[blwith] < plx[i]) {
                                    if (plz[blwith] < plz[i]) {
                                        pang = ((90 - pang) + 90);
                                    }
                                } else {
                                    if (plz[blwith] < plz[i]) {
                                        pang += 180;
                                    } else {
                                        pang = ((90 - pang) + 270);
                                    }
                                }
                                if (pang == 360) {
                                    pang = 0;
                                }
                                var cleartothrow = true;
                                for (var k = 0; k < 10; k++) {
                                    var xplpy = py(plx[blwith], plx[k], plz[blwith], plz[k]);
                                    if ((xplpy < plpy) && (cleartothrow)) {
                                        var xpang = Math.round(Math.abs(Math.atan((plx[blwith] - plx[k]) / (plz[blwith] - plz[k])) * (180 / Math.PI)));
                                        if (plx[blwith] < plx[k]) {
                                            if (plz[blwith] < plz[k]) {
                                                xpang = ((90 - xpang) + 90);
                                            }
                                        } else {
                                            if (plz[blwith] < plz[k]) {
                                                xpang += 180;
                                            } else {
                                                xpang = ((90 - xpang) + 270);
                                            }
                                        }
                                        if (xpang == 360) {
                                            xpang = 0;
                                        }
                                        var dif = Math.abs(pang - xpang);
                                        if (dif > 180) {
                                            dif = Math.abs(dif - 360);
                                        }
                                        if (dif < 25) {
                                            cleartothrow = false;
                                            break;
                                        }
                                    }
                                }
                                if (cleartothrow) {
                                    rxgo[1] = plx[i];
                                    rzgo[1] = plz[i];
                                    shootnow = true;
                                    break;
                                }
                            }
                        }
                    }
                }
                if (cntout == 70) {
                    rxgo[1] = (1400 * Math.random());
                    rzgo[1] = (920 * Math.random());
                    shootnow = true;
                }
                cntout++;
            }
            if (out == 103) {
                onmove[1] = blwith;
                if (side == 0) {
                    xgo[1] = 0;
                } else {
                    xgo[1] = 1400;
                }
                zgo[1] = 460;
                var rang = Math.round(Math.abs(Math.atan((plx[blwith] - xgo[1]) / (plz[blwith] - zgo[1])) * (180 / Math.PI)));
                if (plx[blwith] < xgo[1]) {
                    if (plz[blwith] < zgo[1]) {
                        rang = ((90 - rang) + 90);
                    }
                } else {
                    if (plz[blwith] < zgo[1]) {
                        rang += 180;
                    } else {
                        rang = ((90 - rang) + 270);
                    }
                }
                if (rang == 360) {
                    rang = 0;
                }
                dir[blwith] = rang;
                if (cntout == 0) {
                    donce = false;
                }
                if (cntout >= 200) {
                    var shoot = false;
                    if (!donce) {
                        if ((side == 0) && (plx[blwith] < 500)) {
                            if (Math.random() > Math.random() || Math.random() > Math.random()) {
                                shoot = true;
                            }
                        }
                        if ((side == 1) && (plx[blwith] > 900)) {
                            if (Math.random() > Math.random() || Math.random() > Math.random()) {
                                shoot = true;
                            }
                        }
                        donce = true;
                    }
                    if (shoot) {
                        var goaline = ((70 + (70 * shotongoal)) * Math.random());
                        if (Math.random() > Math.random()) {
                            goaline *= -1;
                        }
                        rzgo[1] = (460 + goaline);
                        if (side == 0) {
                            rxgo[1] = 0;
                        }
                        if (side == 1) {
                            rxgo[1] = 1400;
                        }
                        shootnow = true;
                    } else {
                        for (var i = 19; i >= 10; i--) {
                            if ((i != blwith) && (!shootnow)) {
                                var plpy = py(plx[blwith], plx[i], plz[blwith], plz[i]);
                                if (((side == 0) && (plx[i] < plx[blwith]) && (Math.random() > Math.random())) || ((side == 1) && (plx[i] > plx[blwith]) && (Math.random() < Math.random()))) {
                                    var pang = Math.round(Math.abs(Math.atan((plx[blwith] - plx[i]) / (plz[blwith] - plz[i])) * (180 / Math.PI)));
                                    if (plx[blwith] < plx[i]) {
                                        if (plz[blwith] < plz[i]) {
                                            pang = ((90 - pang) + 90);
                                        }
                                    } else {
                                        if (plz[blwith] < plz[i]) {
                                            pang += 180;
                                        } else {
                                            pang = ((90 - pang) + 270);
                                        }
                                    }
                                    if (pang == 360) {
                                        pang = 0;
                                    }
                                    var cleartothrow = true;
                                    for (var k = 0; k < 10; k++) {
                                        var xplpy = py(plx[blwith], plx[k], plz[blwith], plz[k]);
                                        if ((xplpy < plpy) && (cleartothrow)) {
                                            var xpang = Math.round(Math.abs(Math.atan((plx[blwith] - plx[k]) / (plz[blwith] - plz[k])) * (180 / Math.PI)));
                                            if (plx[blwith] < plx[k]) {
                                                if (plz[blwith] < plz[k]) {
                                                    xpang = ((90 - xpang) + 90);
                                                }
                                            } else {
                                                if (plz[blwith] < plz[k]) {
                                                    xpang += 180;
                                                } else {
                                                    xpang = ((90 - xpang) + 270);
                                                }
                                            }
                                            if (xpang == 360) {
                                                xpang = 0;
                                            }
                                            var dif = Math.abs(pang - xpang);
                                            if (dif > 180) {
                                                dif = Math.abs(dif - 360);
                                            }
                                            if (dif < 7) {
                                                cleartothrow = false;
                                                break;
                                            }
                                        }
                                    }
                                    if (cleartothrow) {
                                        rxgo[1] = plx[i];
                                        rzgo[1] = plz[i];
                                        shootnow = true;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
                cntout++;
            }
            if (out == 104) {
                onmove[1] = blwith;
                xgo[1] = plx[blwith];
                zgo[1] = plz[blwith];
                if (cntout == 200) {
                    var goaline = ((70 + (70 * shotongoal * 0.5)) * Math.random());
                    if (Math.random() > Math.random()) {
                        goaline *= -1;
                    }
                    rzgo[1] = (460 + goaline);
                    if (side == 0) {
                        rxgo[1] = 0;
                    }
                    if (side == 1) {
                        rxgo[1] = 1400;
                    }
                    shootnow = true;
                }
                cntout++;
            }
            if (shootnow) {
                var rang = Math.round(Math.abs(Math.atan((plx[blwith] - rxgo[1]) / (plz[blwith] - rzgo[1])) * (180 / Math.PI)));
                if (plx[blwith] < rxgo[1]) {
                    if (plz[blwith] < rzgo[1]) {
                        rang = ((90 - rang) + 90);
                    }
                } else {
                    if (plz[blwith] < rzgo[1]) {
                        rang += 180;
                    } else {
                        rang = ((90 - rang) + 270);
                    }
                }
                if (rang == 360) {
                    rang = 0;
                }
                dir[blwith] = rang;
                onmove[1] = -1;
                cntout = 0;
            }
            if ((out == 105) && (oft == 1)) {
                xgo[1] = 700;
                zgo[1] = 360;
                if (cntout == 0) {
                    kpflex = Math.floor(20 + (Math.random() * 80));
                }
                if ((cntout >= kpflex) && (cntout < (kpflex + 20))) {
                    onshot[1] = 1;
                }
                if (cntout == (kpflex + 20)) {
                    var psto = Math.floor(10 + (Math.random() * 10));
                    if (psto == 20) {
                        psto = 19;
                    }
                    rxgo[1] = plx[psto];
                    rzgo[1] = plz[psto];
                    onshot[1] = 16;
                }
                cntout++;
            }
        }
    } else {
        findmygo = 50;
        onmove[1] = -1;
        cntgo = -1;
        cntout = 0;
        if ((blwith == -1) && (bont == 1)) {
            if (cnthead >= 10) {
                if ((forbes != onp[1]) && (py(blx, plx[onp[1]], blz, plz[onp[1]]) < 100) && (flyshot[onp[1]] >= 0)) {
                    var goforit = false;
                    if ((side == 0) && (Math.random() > ((plx[onp[1]] - 100) / 1300))) {
                        goforit = true;
                    }
                    if ((side == 1) && (Math.random() > ((1300 - plx[onp[1]]) / 1300))) {
                        goforit = true;
                    }
                    if ((bly > -30) && (Math.random() > 0.16)) {
                        goforit = false;
                    }
                    if (goforit) {
                        var goforgoal = false;
                        if ((side == 0) && (Math.random() > ((plx[onp[1]] - 100) / 600))) {
                            goforgoal = true;
                        }
                        if ((side == 1) && (Math.random() > ((1300 - plx[onp[1]]) / 600))) {
                            goforgoal = true;
                        }
                        if (goforgoal) {
                            var goaline = ((70 + (70 * shotongoal)) * Math.random());
                            if (Math.random() > Math.random()) {
                                goaline *= -1;
                            }
                            rzgo[1] = (460 + goaline);
                            if (side == 0) {
                                rxgo[1] = 0;
                            }
                            if (side == 1) {
                                rxgo[1] = 1400;
                            }
                        } else {
                            var clopy = 0,
                                cloi = 10;
                            for (var i = 10; i < 20; i++) {
                                var plpy = py(plx[onp[1]], plx[i], plz[onp[1]], plz[i]);
                                if ((i != onp[1]) && (plpy < clopy || clopy == 0)) {
                                    clopy = plpy;
                                    cloi = i;
                                }
                            }
                            rxgo[1] = plx[cloi];
                            rzgo[1] = plz[cloi];
                        }
                        xgo[1] = blx;
                        zgo[1] = blz;
                        var rang = Math.round(Math.abs(Math.atan((plx[onp[1]] - rxgo[1]) / (plz[onp[1]] - rzgo[1])) * (180 / Math.PI)));
                        if (plx[onp[1]] < rxgo[1]) {
                            if (plz[onp[1]] < rzgo[1]) {
                                rang = ((90 - rang) + 90);
                            }
                        } else {
                            if (plz[onp[1]] < rzgo[1]) {
                                rang += 180;
                            } else {
                                rang = ((90 - rang) + 270);
                            }
                        }
                        if (rang == 360) {
                            rang = 0;
                        }
                        dir[onp[1]] = rang;
                        flyshot[onp[1]] = 16;
                    }
                    forbes = onp[1];
                }
            } else {
                cnthead++;
            }
        }
    }
}
var cntont = 0;

function authont() {
    if (cntont == 0) {
        for (var i = 0; i < 2; i++) {
            bltime[i] = Math.round(teamtats[tsel[i]] * Math.random() * 1.6);
            if (bltime[i] < 20) {
                bltime[i] = 20;
            }
            if (bltime[i] > 100) {
                bltime[i] = 100;
            }
            var temlev = ((1 - ((teamtats[tsel[i]] - 50) / 50)) * 0.5);
            var scof = ((score[i] - score[(1 - i)]) * 0.5);
            if (scof > 1) {
                scof = 1;
            }
            if (scof < -1) {
                scof = -1;
            }
            tacklvl[i] = (temlev + scof);
            if (i == 1) {
                var difa = 2;
                if (ntmo == 16) {
                    difa = 1.5;
                }
                if (ntmo == 8) {
                    difa = 1;
                }
                if (ntmo == 4) {
                    difa = 0.5;
                }
                if (ntmo == 2) {
                    difa = 0;
                }
                tacklvl[i] += difa;
            }
            if (tacklvl[i] > 2) {
                tacklvl[i] = 2;
            }
            if (tacklvl[i] < 0) {
                tacklvl[i] = 0;
            }
            tackfreq[i] = (((2 - tacklvl[i]) * 0.375) + 0.25);
            if (score[i] > score[(1 - i)]) {
                cutoff[i] = (0.5 + ((score[i] - score[(1 - i)]) * 0.15));
                if (cutoff[i] > 1) {
                    cutoff[i] = 1;
                }
            } else {
                cutoff[i] = (0.5 - (score[(1 - i)] * 0.15));
                if (cutoff[i] < 0) {
                    cutoff[i] = 0;
                }
            }
            savekape[i] = (1.3 - ((teamtats[tsel[i]] - 50) / 100));
            if (i == 1) {
                var difa = 0;
                if (ntmo == 16) {
                    difa = -0.05;
                }
                if (ntmo == 8) {
                    difa = -0.1;
                }
                if (ntmo == 4) {
                    difa = -0.15;
                }
                if (ntmo == 2) {
                    difa = -0.2;
                }
                savekape[i] += difa;
            }
        }
        badpass = false;
        if (Math.random() > Math.random()) {
            if (ntmo > 16) {
                badpass = true;
            }
            if (ntmo == 16) {
                if ((score[1] - score[0]) >= 0) {
                    badpass = true;
                } else {
                    badpass = false;
                }
            }
            if (ntmo == 8) {
                if ((score[1] - score[0]) >= 1) {
                    badpass = true;
                } else {
                    badpass = false;
                }
            }
            if (ntmo == 4) {
                if ((score[1] - score[0]) >= 2) {
                    badpass = true;
                } else {
                    badpass = false;
                }
            }
            if (ntmo == 2) {
                if ((score[1] - score[0]) >= 3) {
                    badpass = true;
                } else {
                    badpass = false;
                }
            }
        }
        var raqy = 0.5;
        shotongoal = 1;
        ballcontrol = 1;
        if (ntmo == 16) {
            shotongoal = 0.6;
            raqy += 0.125;
            ballcontrol = 0.5;
        }
        if (ntmo == 8) {
            shotongoal = 0.4;
            raqy += 0.25;
            ballcontrol = 0.25;
        }
        if (ntmo == 4) {
            shotongoal = 0.2;
            raqy += 0.375;
            ballcontrol = 0;
        }
        if (ntmo == 2) {
            shotongoal = 0;
            raqy += 0.5;
            ballcontrol = 0;
        }
        raqy += ((teamtats[tsel[1]] - 50) / 100);
        raqas = (raqy * Math.random());
        if (raqas > 1) {
            raqas = 1;
        }
        cntont = 100;
    } else {
        cntont--;
    }
}
var onreplay = false;
var switchrep = 0;
var recreached = false;
var cf = 0;
var rblx = [];
var rblz = [];
var rbly = [];
var rnetcor = [];
var rnetcol = [];
var rban = [];
var rbnan = [];
var rplx = [];
var rplz = [];
var rran = [];
var rdir = [];
var rkpx = [];
var rkpz = [];
var rkan = [];
var rkdir = [];
var rf = 0;
var blknd = 0;

function recordframe() {
    rblx[cf] = blx;
    rblz[cf] = blz;
    rbly[cf] = bly;
    rnetcor[cf] = netcor;
    rnetcol[cf] = netcol;
    rban[cf] = Math.floor(ban);
    rbnan[cf] = bnan;
    if (!recreached) {
        rplx[cf] = [];
        rplz[cf] = [];
        rran[cf] = [];
        rdir[cf] = [];
        rkpx[cf] = [];
        rkpz[cf] = [];
        rkan[cf] = [];
        rkdir[cf] = [];
    }
    for (var i = 0; i < 20; i++) {
        rplx[cf][i] = plx[i];
        rplz[cf][i] = plz[i];
        rran[cf][i] = ran[i];
        rdir[cf][i] = dir[i];
    }
    for (var i = 0; i < 2; i++) {
        rkpx[cf][i] = kpx[i];
        rkpz[cf][i] = kpz[i];
        rkan[cf][i] = kan[i];
        rkdir[cf][i] = kdir[i];
    }
    cf++;
    if (cf == 500) {
        cf = 0;
        recreached = true;
    }
}

function replayframes() {
    blx = rblx[rf];
    blz = rblz[rf];
    bly = rbly[rf];
    netcor = rnetcor[rf];
    netcol = rnetcol[rf];
    ban = rban[rf];
    bnan = rbnan[rf];
    for (var i = 0; i < 20; i++) {
        plx[i] = rplx[rf][i];
        plz[i] = rplz[rf][i];
        ran[i] = rran[rf][i];
        dir[i] = rdir[rf][i];
    }
    for (var i = 0; i < 2; i++) {
        kpx[i] = rkpx[rf][i];
        kpz[i] = rkpz[rf][i];
        kan[i] = rkan[rf][i];
        kdir[i] = rkdir[rf][i];
    }
}

function drawall() {
    var ndraw = 0;
    var dzin = [];
    dzin[0] = 529;
    if ((camxz > 45) && (camxz <= 135)) {
        dzin[0] = 1425;
    }
    if ((camxz > 135) && (camxz <= 225)) {
        dzin[0] = -529;
    }
    if ((camxz > 225) && (camxz <= 315)) {
        dzin[0] = -1425;
    }
    dzin[1] = 391;
    if ((camxz > 45) && (camxz <= 135)) {
        dzin[1] = 1425;
    }
    if ((camxz > 135) && (camxz <= 225)) {
        dzin[1] = -391;
    }
    if ((camxz > 225) && (camxz <= 315)) {
        dzin[1] = -1425;
    }
    dzin[2] = 529;
    if ((camxz > 45) && (camxz <= 135)) {
        dzin[2] = -25;
    }
    if ((camxz > 135) && (camxz <= 225)) {
        dzin[2] = -529;
    }
    if ((camxz > 225) && (camxz <= 315)) {
        dzin[2] = 25;
    }
    dzin[3] = 391;
    if ((camxz > 45) && (camxz <= 135)) {
        dzin[3] = -25;
    }
    if ((camxz > 135) && (camxz <= 225)) {
        dzin[3] = -391;
    }
    if ((camxz > 225) && (camxz <= 315)) {
        dzin[3] = 25;
    }
    dzin[4] = 391;
    if ((camxz > 45) && (camxz <= 135)) {
        dzin[4] = 1470;
    }
    if ((camxz > 135) && (camxz <= 225)) {
        dzin[4] = -529;
    }
    if ((camxz > 225) && (camxz <= 315)) {
        dzin[4] = -1470;
    }
    dzin[5] = 391;
    if ((camxz > 45) && (camxz <= 135)) {
        dzin[5] = -70;
    }
    if ((camxz > 135) && (camxz <= 225)) {
        dzin[5] = -529;
    }
    if ((camxz > 225) && (camxz <= 315)) {
        dzin[5] = 70;
    }
    dzin[6] = blz;
    if ((camxz > 45) && (camxz <= 135)) {
        dzin[6] = blx;
    }
    if ((camxz > 135) && (camxz <= 225)) {
        dzin[6] = -blz;
    }
    if ((camxz > 225) && (camxz <= 315)) {
        dzin[6] = -blx;
    }
    ndraw = 7;
    for (var i = 0; i < nt; i++) {
        dzin[ndraw] = kpz[i];
        if ((camxz > 45) && (camxz <= 135)) {
            dzin[ndraw] = kpx[i];
        }
        if ((camxz > 135) && (camxz <= 225)) {
            dzin[ndraw] = -kpz[i];
        }
        if ((camxz > 225) && (camxz <= 315)) {
            dzin[ndraw] = -kpx[i];
        }
        ndraw++;
    }
    for (var i = 0; i < (10 * nt); i++) {
        dzin[ndraw] = plz[i];
        if ((camxz > 45) && (camxz <= 135)) {
            dzin[ndraw] = plx[i];
        }
        if ((camxz > 135) && (camxz <= 225)) {
            dzin[ndraw] = -plz[i];
        }
        if ((camxz > 225) && (camxz <= 315)) {
            dzin[ndraw] = -plx[i];
        }
        ndraw++;
    }
    var wer = [];
    var awer = [];
    for (var i = 0; i < ndraw; i++) {
        wer[i] = 0;
    }
    for (var i = 0; i < ndraw; i++) {
        for (var j = (i + 1); j < ndraw; j++) {
            if (dzin[i] < dzin[j]) {
                wer[i]++;
            } else {
                wer[j]++;
            }
        }
        awer[wer[i]] = i;
    }
    for (var i = 0; i < ndraw; i++) {
        if ((awer[i] >= 0) && (awer[i] <= 3)) {
            drawsidenet(awer[i]);
        }
        if (awer[i] == 4) {
            drawbacknet(0, netcor, (blx + 4), bly, blz);
        }
        if (awer[i] == 5) {
            drawbacknet(1, netcol, (blx - 4), bly, blz);
        }
        if (awer[i] == 6) {
            drawball(false);
        }
        if (nt == 1) {
            if (awer[i] == 7) {
                drawkeeper(0);
            }
            if (awer[i] >= 8) {
                drawplayer((awer[i] - 8));
            }
        }
        if (nt == 2) {
            if (awer[i] == 7 || awer[i] == 8) {
                drawkeeper((awer[i] - 7));
            }
            if (awer[i] >= 9) {
                drawplayer((awer[i] - 9));
            }
        }
    }
    drawtopnet(0);
    drawtopnet(1);
    drawball(true);
}

function drawplayer(i) {
    var dplx = plx[i];
    var dplz = plz[i];
    if (ran[i] == 11 || ran[i] == 12) {
        dplx -= (10 * msin[dir[i]]);
        dplz += (10 * mcos[dir[i]]);
    }
    var drawdir = (dir[i] + camxz);
    if (drawdir >= 360) {
        drawdir -= 360;
    }
    if (drawdir < 0) {
        drawdir += 360;
    }
    drawdir = Math.round(drawdir / 45);
    if (drawdir == 8) {
        drawdir = 0;
    }
    if (drawdir == -1) {
        drawdir = 7;
    }
    xp = [dplx, (dplx + (31 * msin[camzy] * msin[camxz]))];
    zp = [dplz, (dplz + (31 * msin[camzy] * mcos[camxz]))];
    yp = [0, -(35 * mcos[camzy])];
    np = 2;
    xpd = [];
    ypd = [];
    if (calcdraw(xp, yp, zp, np, xpd, ypd)) {
        var phd = ((ypd[0] - ypd[1]) * 2.6);
        var pwd = (phd * 0.9);
        if (plimg[pli[i]][drawdir][Math.floor(ran[i])] != null) {
            if (plimg[pli[i]][drawdir][Math.floor(ran[i])].width > 0) {
                rd.drawImage(plimg[pli[i]][drawdir][Math.floor(ran[i])], (xpd[0] - (pwd * 0.5)), (ypd[0] - (phd * 0.82)), pwd, phd);
            }
        }
    }
}

function drawkeeper(i) {
    var drawdir = (kdir[i] + camxz);
    if (drawdir >= 360) {
        drawdir -= 360;
    }
    if (drawdir < 0) {
        drawdir += 360;
    }
    drawdir = Math.round(drawdir / 45);
    if (drawdir == 8) {
        drawdir = 0;
    }
    if (drawdir == -1) {
        drawdir = 7;
    }
    var drawkan = Math.floor(kan[i]);
    if (drawkan == 2) {
        if (drawdir > 4) {
            drawkan = 3;
        }
    }
    if (drawkan == 3) {
        if (drawdir > 4) {
            drawkan = 2;
        }
    }
    if (drawkan == 4) {
        if (drawdir > 4) {
            drawkan = 5;
        }
    }
    if (drawkan == 5) {
        if (drawdir > 4) {
            drawkan = 4;
        }
    }
    if (drawkan == 6) {
        if (drawdir > 4) {
            drawkan = 7;
        }
    }
    if (drawkan == 7) {
        if (drawdir > 4) {
            drawkan = 6;
        }
    }
    xp = [kpx[i], (kpx[i] + (31 * msin[camzy] * msin[camxz]))];
    zp = [kpz[i], (kpz[i] + (31 * msin[camzy] * mcos[camxz]))];
    yp = [0, -(35 * mcos[camzy])];
    np = 2;
    xpd = [];
    ypd = [];
    if (calcdraw(xp, yp, zp, np, xpd, ypd)) {
        var phd = ((ypd[0] - ypd[1]) * 2.5);
        var pwd = phd;
        if (kpimg[i][drawdir][drawkan] != null) {
            if (kpimg[i][drawdir][drawkan].width > 0) {
                rd.drawImage(kpimg[i][drawdir][drawkan], (xpd[0] - (pwd * 0.5)), (ypd[0] - (phd * 0.82)), pwd, phd);
            }
        }
    }
}

function drawball(atop) {
    if ((!atop) || ((atop) && (bly <= -60) && (blx > 1400) && (blx < 1430) && (blz > 391) && (blz < 529)) || ((atop) && (bly <= -60) && (blx < 0) && (blx > -30) && (blz > 391) && (blz < 529))) {
        var sy = 0;
        if (atop) {
            sy = -60;
        }
        var ey = (8 + (Math.abs(bly - sy) * 0.025));
        xp = [blx, (blx + (ey * msin[camzy] * msin[camxz]))];
        zp = [blz, (blz + (ey * msin[camzy] * mcos[camxz]))];
        yp = [sy, (sy - (ey * mcos[camzy]))];
        np = 2;
        xpd = [];
        ypd = [];
        if (calcdraw(xp, yp, zp, np, xpd, ypd)) {
            var phd = (ypd[0] - ypd[1]);
            var pwd = phd;
            var aplb = (1 - (Math.abs(bly) * 0.025 * 0.0625));
            if (aplb < 0.25) {
                aplb = 0.25;
            }
            if (atop) {
                aplb *= 0.5;
            }
            rd.globalAlpha = aplb;
            rd.drawImage(blshd, (xpd[0] - (pwd * 0.8)), (ypd[0] - (phd * 0.45)), (pwd * 1.6), (phd * 0.9));
            rd.globalAlpha = 1;
        }
    }
    if (((bly > -60) && (!atop)) || ((bly < -60) && (atop))) {
        xp = [blx, (blx + (8 * msin[camzy] * msin[camxz]))];
        zp = [blz, (blz + (8 * msin[camzy] * mcos[camxz]))];
        yp = [bly, (bly - (8 * mcos[camzy]))];
        np = 2;
        xpd = [];
        ypd = [];
        if (calcdraw(xp, yp, zp, np, xpd, ypd)) {
            var phd = (ypd[0] - ypd[1]);
            var pwd = phd;
            rd.drawImage(blimg[bant[bnan][Math.floor(ban)]], (xpd[0] - (pwd * 0.5)), (ypd[0] - phd), pwd, phd);
        }
    }
}
var firstime = 0;
var mutegame = false;
var onagamebtn = false;
var frmzy = 54;
var chfrm = (25 + Math.floor(Math.random() * 25));
var recodist = false;
var addod = Math.floor(2 + (Math.random() * 8));
var outyp = "";
var outdisc = "";
var lastbont = -1;
var bontcnt = 0;
var bontblx = 0;
var exitedturn = 0;
var lastinbont = -1;
var inbontvar = Math.floor(Math.random() * 500);
var nodowning = true;
var ndowns = 0;
var downed = 0;
var downch = false;

function drawflexs() {
    var blackit = false;
    if (onreplay) {
        if (switchrep < 0) {
            camxz = 0;
            camzy = 40;
            camodist = 740;
            camdist = (camodist * ((mw + mh) / 2));
            switchrep++;
        } else {
            camxz++;
            while (camxz >= 360) {
                camxz -= 360;
            }
            while (camxz < 0) {
                camxz += 360;
            }
            if (camzy != frmzy) {
                if (camzy < frmzy) {
                    camzy++;
                } else {
                    camzy--;
                }
            } else {
                chfrm--;
                if (chfrm == 0) {
                    frmzy = Math.floor(Math.random() * 80);
                    if (frmzy < 20) {
                        frmzy = 20;
                    }
                    if (frmzy > 54) {
                        frmzy = 54;
                    }
                    chfrm = (125 + Math.floor(Math.random() * 250));
                }
            }
            if (!recodist) {
                camodist += addod;
                if (camodist > 1200) {
                    recodist = true;
                    addod = Math.floor(2 + (Math.random() * 8));
                }
            } else {
                camodist -= addod;
                if (camodist < 400) {
                    recodist = false;
                    addod = Math.floor(2 + (Math.random() * 8));
                }
            }
            camdist = (camodist * ((mw + mh) / 2));
        }
        if (switchrep <= 10) {
            rf++;
            if (rf == 500) {
                rf = 0;
            }
        }
        var sf = (cf - 10);
        if (sf < 0) {
            sf += 500;
        }
        if (rf == sf) {
            switchrep = -10;
        }
        if (switchrep > 0) {
            switchrep--;
        }
        if (switchrep == 0) {
            if (rf == cf) {
                onreplay = false;
            }
        }
        if (switchrep == 0) {
            var fm = ((mw + mh) * 0.5);
            rd.font = "" + (30 * (mh + mw)) + "px TekoSkills";
            rd.textAlign = "left";
            rd.textBaseline = "top";
            rd.fillStyle = "#FFFFFF";
            rd.globalAlpha = 0.7;
            rd.fillText("INSTANT REPLAY", (20 * mw), (20 * mh));
            rd.globalAlpha = 1;
            var onit = 0;
            var btnx = (canw - (194 * fm) - (20 * mw));
            var btny = (canh - (72 * fm) - (20 * mh));
            declick(btnx, (btnx + (194 * fm)), btny, (btny + (72 * fm)), 1);
            if (wasonit == 1) {
                onit = 1;
            }
            if ((onaclk > 7) && (onwho == 1)) {
                onit = 1;
            }
            if ((onaclk == 9) && (onwho == 1)) {
                rf = sf;
                switchrep = -10;
                onwho = 0;
                wasonit = 0;
                playsnd(17, 1);
            }
            rd.globalAlpha = 0.7;
            rd.drawImage(btn[12][onit], btnx, btny, (194 * fm), (72 * fm));
            rd.globalAlpha = 1;
        } else {
            blackit = true;
        }
    } else {
        var fm = ((mw + mh) * 0.5);
        onagamebtn = false;
        if ((penmode) && (fase == 10)) {
            getendbg();
        }
        if (time == 7650) {
            if ((nt == 1) || (score[0] != score[1])) {
                getendbg();
                fase = 10;
            } else {
                restat();
                inishkeeper();
                bvz = 0;
                bvx = 0;
                bvy = 0;
                blwith = -1;
            }
        }
        rd.font = "" + (20 * (mh + mw)) + "px TekoSkills";
        rd.textAlign = "left";
        rd.textBaseline = "top";
        rd.fillStyle = "#FFFFFF";
        var statxt = "" + team[tsel[0]] + "  " + score[0] + "";
        if (nt == 2) {
            statxt += "  -  " + score[1] + "  " + team[tsel[1]] + "";
        }
        rd.drawImage(teamflag[tsel[0]], (10 * mw), (10 * mw), (44 * fm), (44 * fm));
        rd.globalAlpha = 0.8;
        rd.fillText(statxt, ((20 * mw) + (44 * fm)), ((10 * mh) + (8 * fm)));
        rd.globalAlpha = 1;
        if (nt == 2) {
            rd.drawImage(teamflag[tsel[1]], ((30 * mw) + (44 * fm) + rd.measureText(statxt).width), (10 * mw), (44 * fm), (44 * fm));
        }
        if (!penmode) {
            var timstr = "" + (time * 0.012);
            var indip = timstr.indexOf(".");
            var dftim = "",
                mitim = "";
            if (indip == -1) {
                dftim = timstr;
                if (parseInt(dftim) < 10) {
                    dftim = "0" + dftim;
                }
                mitim = "00";
            } else {
                var dftim = timstr.substring(0, indip);
                if (parseInt(dftim) < 10) {
                    dftim = "0" + dftim;
                }
                var mitim = Math.floor(parseInt(timstr.substring((indip + 1), (indip + 3))) / 1.6667);
                if (mitim < 10) {
                    mitim = "0" + mitim;
                }
            }
            var drat = ((40 * mw) + (44 * fm) + rd.measureText(statxt).width);
            if (nt == 2) {
                drat = ((50 * mw) + (88 * fm) + rd.measureText(statxt).width);
            }
            rd.globalAlpha = 0.8;
            rd.fillText("" + dftim + " : " + mitim + "", drat, ((10 * mh) + (8 * fm)));
            rd.globalAlpha = 1;
        } else {
            var drat = ((40 * mw) + (44 * fm) + rd.measureText(statxt).width);
            if (nt == 2) {
                drat = ((50 * mw) + (88 * fm) + rd.measureText(statxt).width);
            }
            rd.globalAlpha = 0.8;
            if (bestof == 5) {
                rd.fillText("Best of five shots!", drat, ((10 * mh) + (8 * fm)));
            } else {
                rd.fillText("Best of one shot!", drat, ((10 * mh) + (8 * fm)));
            }
            rd.globalAlpha = 1;
            statxt = " " + bescore[0] + " / " + bested[0] + "     -     " + bescore[1] + " / " + bested[1] + " ";
            rd.drawImage(teamflag[tsel[0]], ((canw * 0.5) - (rd.measureText(statxt).width * 0.5) - (10 * mw) - (44 * fm)), (600 * mh), (44 * fm), (44 * fm));
            rd.textAlign = "center";
            rd.globalAlpha = 0.8;
            rd.fillText(statxt, (canw * 0.5), ((600 * mh) + (8 * fm)));
            rd.globalAlpha = 1;
            rd.drawImage(teamflag[tsel[1]], ((canw * 0.5) + (rd.measureText(statxt).width * 0.5) + (10 * mw)), (600 * mh), (44 * fm), (44 * fm));
        }
        var onit = 0;
        var btnx = (canw - (77 * fm) - (10 * mw));
        var btny = (10 * mh);
        declick(btnx, (btnx + (77 * fm)), btny, (btny + (54 * fm)), 1);
        if (wasonit == 1) {
            onit = 1;
            onagamebtn = true;
        }
        if ((onaclk > 7) && (onwho == 1)) {
            onit = 1;
            onagamebtn = true;
        }
        if ((onaclk == 9) && (onwho == 1)) {
            if (blknd == 0) {
                getpausebg();
            }
            onwho = 0;
            wasonit = 0;
        }
        rd.drawImage(btn[7][onit], btnx, btny, (77 * fm), (54 * fm));
        if ((xm > btnx) && (xm < (btnx + (77 * fm))) && (ym > btny) && (ym < (btny + (54 * fm)))) {
            if (!mdown) {
                onagamebtn = true;
            }
        }
        if (!mutegame) {
            onit = 0;
        } else {
            onit = 1;
        }
        btnx = (canw - (44 * fm) - (10 * mw));
        btny = (canh - (43 * fm) - (20 * mh));
        declick(btnx, (btnx + (44 * fm)), btny, (btny + (43 * fm)), 2);
        if (wasonit == 2) {
            if (!mutegame) {
                onit = 1;
            } else {
                onit = 0;
            }
            onagamebtn = true;
        }
        if ((onaclk > 7) && (onwho == 2)) {
            if (!mutegame) {
                onit = 1;
            } else {
                onit = 0;
            }
            onagamebtn = true;
        }
        if ((onaclk == 9) && (onwho == 2)) {
            if (!mutegame) {
                mutegame = true;
                mutemusic = true;
            } else {
                mutegame = false;
            }
            onwho = 0;
            wasonit = 0;
        }
        rd.drawImage(btn[8][onit], btnx, btny, (44 * fm), (43 * fm));
        if ((xm > btnx) && (xm < (btnx + (44 * fm))) && (ym > btny) && (ym < (btny + (43 * fm)))) {
            if (!mdown) {
                onagamebtn = true;
            }
        }
        if (firstime != -1) {
            firstime++;
            if (firstime == 60) {
                getpausebg();
            }
        }
        if (nt == 2) {
            if (out == 10) {
                if ((outx < 0) || (outx > 1400)) {
                    if (((oft == (1 - side)) && (outx > 1400)) || ((oft == side) && (outx < 0))) {
                        if ((outz > 260) && (outz < 660) && (Math.sqrt((bvx * bvx) + (bvz * bvz)) > 5)) {
                            playsnd(15, 1);
                        }
                    }
                }
            }
            if (goal == 10) {
                playsnd(16, 1);
            }
            if (out || goal || centara) {
                bontcnt = 0;
                lastbont = bont;
            }
            if (lastbont != bont) {
                if (bontcnt == 0) {
                    bontblx = blx;
                }
                bontcnt++;
                if (bontcnt == 10) {
                    bontcnt = 0;
                    lastbont = bont;
                    playsnd((12 + exitedturn), 1);
                    nextexite();
                }
            }
            if (side == bont) {
                if (((blx > (700 + inbontvar)) && (blwith != -1)) || (blx > 1100)) {
                    if (lastinbont != bont) {
                        playsnd((12 + exitedturn), 1);
                        nextexite();
                        lastinbont = bont;
                        inbontvar = Math.floor(Math.random() * 500);
                    }
                }
            } else {
                if (((blx < (700 - inbontvar)) && (blwith != -1)) || (blx < 300)) {
                    if (lastinbont != bont) {
                        playsnd((12 + exitedturn), 1);
                        nextexite();
                        lastinbont = bont;
                        inbontvar = Math.floor(Math.random() * 500);
                    }
                }
            }
            if (out == 10) {
                if ((outx > 0) && (outx < 1400) && (outz > 0) && (outz < 920)) {
                    playsnd((12 + exitedturn), 1);
                    nextexite();
                }
            }
        }
        if ((out) && (out < 100)) {
            if (out == 2) {
                if ((outx > 0) && (outx < 1400) && (outz > 0) && (outz < 920)) {
                    playsnd(1, 1);
                    outyp = "FOUL!";
                    outdisc = "Free Kick for " + team[tsel[oft]] + "";
                    if ((outx > 1200) && (outx < 1400) && (outz > 260) && (outz < 660) && (oft == side)) {
                        outdisc = "Penalty Kick for " + team[tsel[oft]] + "";
                    }
                    if ((outx > 0) && (outx < 200) && (outz > 260) && (outz < 660) && (oft == (1 - side))) {
                        outdisc = "Penalty Kick for " + team[tsel[oft]] + "";
                    }
                } else {
                    playsnd(0, 1);
                    outyp = "BALL OUT";
                    if ((outx < 0) || (outx > 1400)) {
                        if (((oft == (1 - side)) && (outx < 0)) || ((oft == side) && (outx > 1400))) {
                            outdisc = "Corner Kick";
                        } else {
                            outdisc = "Goal Kick";
                        }
                    } else {
                        outdisc = "Throw-in";
                    }
                }
            }
            if (out > 10) {
                rd.textAlign = "center";
                rd.textBaseline = "top";
                rd.fillStyle = "#FFFFFF";
                rd.globalAlpha = 0.8;
                if (outyp == "BALL OUT") {
                    rd.font = "" + (23 * (mh + mw)) + "px TekoSkills";
                } else {
                    rd.font = "" + (27 * (mh + mw)) + "px TekoSkills";
                }
                rd.fillText(outyp, (canw * 0.5), (60 * mh));
                if (!penmode) {
                    rd.font = "" + (23 * (mh + mw)) + "px TekoSkills";
                    rd.fillText(outdisc, (canw * 0.5), (120 * mh));
                }
                rd.globalAlpha = 1;
            }
        }
        if ((nt == 2) && (goal > 20) && (goal < 189)) {
            rd.font = "" + (34 * (mh + mw)) + "px TekoSkills";
            rd.textAlign = "center";
            rd.textBaseline = "top";
            rd.fillStyle = "#FFFFFF";
            rd.globalAlpha = 0.8;
            rd.fillText("GOAL!", (canw * 0.5), (90 * mh));
            rd.globalAlpha = 1;
        }
        if ((side == 0) && (time >= 3750) && (time < 7650) && (!out || out == 107) && (!goal) && (!centara)) {
            out = 107;
            if (time == 3752) {
                playsnd(2, 1);
                if (blwith != -1) {
                    shot[blwith] = 0;
                    blwith = -1;
                }
            }
            rd.font = "" + (30 * (mh + mw)) + "px TekoSkills";
            rd.textAlign = "center";
            rd.textBaseline = "top";
            rd.fillStyle = "#FFFFFF";
            rd.globalAlpha = 0.8;
            rd.fillText("HALF TIME", (canw * 0.5), (90 * mh));
            rd.globalAlpha = 1;
            if (time > 3980) {
                blackit = true;
                onagamebtn = true;
            }
            if (time > 4000) {
                time = 3750;
                side = 1;
                orgteam();
            }
        }
        if ((time >= 7500) && (time < 7650) && (!out || out == 107) && (!goal) && (!centara) && (!penmode)) {
            out = 107;
            if (time == 7502) {
                playsnd(3, 1);
                if (blwith != -1) {
                    shot[blwith] = 0;
                    blwith = -1;
                }
            }
            rd.font = "" + (30 * (mh + mw)) + "px TekoSkills";
            rd.textAlign = "center";
            rd.textBaseline = "top";
            rd.fillStyle = "#FFFFFF";
            rd.globalAlpha = 0.8;
            rd.fillText("FULL TIME", (canw * 0.5), (90 * mh));
            rd.globalAlpha = 1;
            if (time == 7550) {
                playsnd((12 + exitedturn), 1);
                nextexite();
            }
            if (time > 7630) {
                blackit = true;
                onagamebtn = true;
            }
        }
        if ((time >= 7650) && (time <= 7760)) {
            out = 107;
            rd.font = "" + (27 * (mh + mw)) + "px TekoSkills";
            rd.textAlign = "center";
            rd.textBaseline = "top";
            rd.fillStyle = "#FFFFFF";
            rd.globalAlpha = 0.8;
            rd.fillText("PENALTY SHOOT-OUT", (canw * 0.5), (250 * mh));
            rd.globalAlpha = 1;
            if (time == 7760) {
                camzy = 33;
                camxz = 65;
                camodist = 500;
                camdist = (camodist * ((mw + mh) / 2));
                bescore[0] = 0;
                bescore[1] = 0;
                bestof = 5;
                bested[0] = 0;
                bested[1] = 0;
                penturn[0] = 9;
                penturn[1] = 19;
                if (Math.random() > Math.random()) {
                    tosup = 0;
                } else {
                    tosup = 1;
                }
                penmode = true;
                afterpen = 10;
            }
        }
        if ((out > 90) && (out < 100)) {
            blackit = true;
        }
        if ((nt == 2) && (goal > 190)) {
            blackit = true;
        }
        if ((nt == 1) && (goal > 90)) {
            blackit = true;
        }
        if ((penmode) && (afterpen <= 10) && (afterpen > 0)) {
            blackit = true;
        }
        if ((!out || out == 107) && (!goal) && (!centara)) {
            time++;
        }
        if (nodowning) {
            if (mdown) {
                if (!downch) {
                    downch = true;
                }
                downed++;
            } else {
                if (downch) {
                    if (downed > 30) {
                        nodowning = false;
                    }
                    downch = false;
                    downed = 0;
                    ndowns++;
                }
            }
            if (ndowns > 30) {
                rd.font = "" + (24 * (mh + mw)) + "px TekoSkills";
                rd.textAlign = "center";
                rd.textBaseline = "top";
                rd.fillStyle = "#FFFFFF";
                rd.globalAlpha = 0.8;
                if (!isphone) {
                    rd.fillText("Press and keep holding mouse down to control the player longer by dragging!", (canw * 0.5), (160 * mh));
                } else {
                    rd.fillText("Press and keep holding finger down to control the player longer by dragging!", (canw * 0.5), (160 * mh));
                }
                rd.globalAlpha = 1;
            }
        }
    }
    if (blackit) {
        blknd += 0.1;
        if (blknd > 1) {
            blknd = 1;
        }
    } else {
        if (blknd != 0) {
            blknd -= 0.1;
            if (blknd < 0) {
                blknd = 0;
            }
        }
    }
    if (blknd != 0) {
        rd.globalAlpha = blknd;
        rd.fillStyle = "#000000";
        rd.fillRect(0, 0, canw, canh);
        rd.globalAlpha = 1;
    }
}

function nextexite() {
    var exolo = exitedturn;
    if (exolo == 0) {
        if (Math.random() > Math.random()) {
            exitedturn = 1;
        } else {
            exitedturn = 2;
        }
    }
    if (exolo == 1) {
        if (Math.random() > Math.random()) {
            exitedturn = 0;
        } else {
            exitedturn = 2;
        }
    }
    if (exolo == 2) {
        if (Math.random() > Math.random()) {
            exitedturn = 1;
        } else {
            exitedturn = 0;
        }
    }
}
var mutemusic = false;

function musictog() {
    var fm = ((mw + mh) * 0.5);
    var onit = 0;
    if (mutemusic) {
        onit = 1;
    }
    var btnx = (canw - (44 * fm) - (10 * mw));
    var btny = (canh - (43 * fm) - (20 * mh));
    rd.globalAlpha = 0.6;
    rd.fillStyle = "#000000";
    fillroundrect((btnx - (5 * fm)), (btny - (5 * fm)), (54 * fm), (53 * fm), (5 * fm));
    rd.globalAlpha = 1;
    declick(btnx, (btnx + (44 * fm)), btny, (btny + (43 * fm)), 11);
    if (wasonit == 11) {
        if (!mutemusic) {
            onit = 1;
        } else {
            onit = 0;
        }
    }
    if ((onaclk > 7) && (onwho == 11)) {
        if (!mutemusic) {
            onit = 1;
        } else {
            onit = 0;
        }
    }
    if ((onaclk == 9) && (onwho == 11)) {
        if (!mutemusic) {
            mutemusic = true;
        } else {
            mutemusic = false;
            mutegame = false;
        }
        onwho = 0;
        wasonit = 0;
    }
    rd.drawImage(btn[8][onit], btnx, btny, (44 * fm), (43 * fm));
}
var pausebg = null;

function getendbg() {
    if ((woncup == 0) && (nt == 2) && (cupmod == 3) && (ntmo == 2) && (score[0] > score[1])) {
        woncup = 1;
    }
    rd.globalAlpha = 0.6;
    rd.globalCompositeOperation = 'lighter';
    rd.drawImage(bgimg[4], 0, 0, canw, canh);
    rd.globalCompositeOperation = 'source-over';
    rd.globalAlpha = 1;
    pausebg = new Image();
    pausebg.src = canvasElement.toDataURL("image/png");
}

function getpausebg() {
    rd.globalAlpha = 0.8;
    rd.drawImage(bgimg[3], (canh * 0.55), 0, (canw - (canh * 0.55)), canh);
    rd.drawImage(bgimg[2], 0, 0, (canh * 0.55), canh);
    rd.globalAlpha = 1;
    pausebg = new Image();
    pausebg.src = canvasElement.toDataURL("image/png");
    if (firstime == 60) {
        fase = 8;
        firstime = -1;
    } else {
        fase = 7;
    }
}
var appshow = 0;
var woncup = 0;

function drawendgame() {
    rd.fillStyle = "#001D00";
    rd.fillRect(0, 0, canw, canh);
    rd.drawImage(pausebg, 0, 0, canw, canh);
    var fm = ((mw + mh) * 0.5);
    rd.font = "" + (27 * (mh + mw)) + "px TekoSkills";
    rd.textBaseline = "top";
    rd.fillStyle = "#FFFFFF";
    rd.textAlign = "center";
    rd.fillText("" + score[0], ((canw * 0.5) - (120 * mw)), ((15 * mw) + (20 * fm)));
    rd.drawImage(teamflag[tsel[0]], ((canw * 0.5) - (160 * mw) - (88 * fm)), (15 * mw), (88 * fm), (88 * fm));
    rd.textAlign = "right";
    rd.fillText(team[tsel[0]], ((canw * 0.5) - (180 * mw) - (88 * fm)), ((15 * mw) + (20 * fm)));
    if (nt == 2) {
        rd.textAlign = "center";
        rd.fillText("" + score[1], ((canw * 0.5) + (120 * mw)), ((15 * mw) + (20 * fm)));
        rd.drawImage(teamflag[tsel[1]], ((canw * 0.5) + (160 * mw)), (15 * mw), (88 * fm), (88 * fm));
        rd.textAlign = "left";
        rd.fillText(team[tsel[1]], ((canw * 0.5) + (180 * mw) + (88 * fm)), ((15 * mw) + (20 * fm)));
    }
    rd.fillStyle = "#000000";
    rd.textAlign = "center";
    if (nt == 2) {
        if (score[0] > score[1]) {
            rd.fillText("Congratulations, " + team[tsel[0]] + " wins!", (canw * 0.5), (267 * mh));
        } else {
            rd.fillText("" + team[tsel[0]] + " loses, better luck next time!", (canw * 0.5), (267 * mh));
        }
    } else {
        rd.fillText("Practice game ended!", (canw * 0.5), (267 * mh));
    }
    if ((appshow == 3) && (isphone)) {
        if (!isios) {
            rd.textAlign = "left";
            rd.fillText("Soccer Skills is also available for your Android as an APP!", (20 * mw), (380 * mh));
            rd.fillStyle = "#000000";
            fillroundrect((20 * mw), (440 * mh), (337 * fm), (100 * fm), (20 * fm));
            rd.fillStyle = "#10753E";
            fillroundrect(((20 * mw) + (20 * fm)), ((440 * mh) + (25 * fm)), (90 * fm), (50 * fm), (8 * fm));
            rd.fillStyle = "#00E26B";
            fillroundrect(((20 * mw) + (25 * fm)), ((440 * mh) + (25 * fm)), (80 * fm), (26 * fm), (5 * fm));
            rd.textBaseline = "top";
            rd.textAlign = "left";
            rd.fillStyle = "#FFFFFF";
            rd.font = "" + (14 * (mh + mw)) + "px TekoSkills";
            rd.fillText("GET IT ON", ((20 * mw) + (130 * fm)), ((440 * mh) + (15 * fm)));
            rd.font = "" + (25 * (mh + mw)) + "px TekoSkills";
            rd.fillText("Google Play", ((20 * mw) + (130 * fm)), ((440 * mh) + (45 * fm)));
            if ((xm > (20 * mw)) && (xm < ((20 * mw) + (337 * fm))) && (ym > (440 * mh)) && (ym < ((440 * mh) + (100 * fm)))) {
                canvasElement.style.cursor = "pointer";
                if (mdown) {
                    onlink = 2;
                }
            } else {
                canvasElement.style.cursor = "auto";
                onlink = 0;
            }
        } else {
            rd.textAlign = "left";
            rd.fillText("Soccer Skills is also available for your iOS device as an APP!", (20 * mw), (380 * mh));
            rd.fillStyle = "#000000";
            fillroundrect((20 * mw), (440 * mh), (337 * fm), (100 * fm), (20 * fm));
            rd.fillStyle = "#434343";
            fillroundrect(((20 * mw) + (20 * fm)), ((440 * mh) + (25 * fm)), (90 * fm), (50 * fm), (8 * fm));
            rd.fillStyle = "#717171";
            fillroundrect(((20 * mw) + (25 * fm)), ((440 * mh) + (25 * fm)), (80 * fm), (26 * fm), (5 * fm));
            rd.textBaseline = "top";
            rd.textAlign = "left";
            rd.fillStyle = "#FFFFFF";
            rd.font = "" + (14 * (mh + mw)) + "px TekoSkills";
            rd.fillText("Download on the", ((20 * mw) + (130 * fm)), ((440 * mh) + (10 * fm)));
            rd.font = "" + (25 * (mh + mw)) + "px TekoSkills";
            rd.fillText("App Store", ((20 * mw) + (130 * fm)), ((440 * mh) + (40 * fm)));
            if ((xm > (20 * mw)) && (xm < ((20 * mw) + (337 * fm))) && (ym > (440 * mh)) && (ym < ((440 * mh) + (100 * fm)))) {
                canvasElement.style.cursor = "pointer";
                if (mdown) {
                    onlink = 3;
                }
            } else {
                canvasElement.style.cursor = "auto";
                onlink = 0;
            }
        }
    }
    var onit = 0;
    var btnx = (canw - (276 * fm) - (20 * mw));
    var btny = (canh - (82 * fm) - (20 * mh));
    declick(btnx, (btnx + (276 * fm)), btny, (btny + (82 * fm)), 1);
    if (wasonit == 1) {
        onit = 1;
    }
    if ((onaclk > 7) && (onwho == 1)) {
        onit = 1;
    }
    if ((onaclk == 9) && (onwho == 1)) {
        if ((nt == 2) && (score[0] > score[1])) {
            fase = 3;
            cupmod = 2;
        } else {
            fase = 11;
            trans = 0;
        }
        onwho = 0;
        wasonit = 0;
        appshow++;
        if (appshow == 4) {
            appshow = 0;
        }
        playsnd(17, 1);
    }
    rd.drawImage(btn[13][onit], btnx, btny, (276 * fm), (82 * fm));
    if (woncup > 0) {
        if (woncup == 400) {
            fase = 3;
            cupmod = 2;
        }
        woncup++;
    }
}

function drawpause() {
    rd.fillStyle = "#001D00";
    rd.fillRect(0, 0, canw, canh);
    rd.drawImage(pausebg, 0, 0, canw, canh);
    var fm = ((mw + mh) * 0.5);
    rd.font = "" + (20 * (mh + mw)) + "px TekoSkills";
    rd.textAlign = "left";
    rd.textBaseline = "top";
    rd.fillStyle = "#FFFFFF";
    var statxt = "" + team[tsel[0]] + "  " + score[0] + "";
    if (nt == 2) {
        statxt += "  -  " + score[1] + "  " + team[tsel[1]] + "";
    }
    rd.drawImage(teamflag[tsel[0]], (10 * mw), (10 * mw), (44 * fm), (44 * fm));
    rd.globalAlpha = 0.8;
    rd.fillText(statxt, ((20 * mw) + (44 * fm)), ((10 * mh) + (8 * fm)));
    rd.globalAlpha = 1;
    if (nt == 2) {
        rd.drawImage(teamflag[tsel[1]], ((30 * mw) + (44 * fm) + rd.measureText(statxt).width), (10 * mw), (44 * fm), (44 * fm));
    }
    var timstr = "" + (time * 0.0059);
    var dftim = timstr.substring(0, timstr.indexOf("."));
    if (parseInt(dftim) < 10) {
        dftim = "0" + dftim;
    }
    var mitim = Math.floor(parseInt(timstr.substring((timstr.indexOf(".") + 1), (timstr.indexOf(".") + 3))) / 1.6667);
    if (mitim < 10) {
        mitim = "0" + mitim;
    }
    var drat = ((40 * mw) + (44 * fm) + rd.measureText(statxt).width);
    if (nt == 2) {
        drat = ((50 * mw) + (88 * fm) + rd.measureText(statxt).width);
    }
    rd.globalAlpha = 0.8;
    rd.fillText("" + dftim + " : " + mitim + "", drat, ((10 * mh) + (8 * fm)));
    rd.globalAlpha = 1;
    rd.font = "" + (30 * (mh + mw)) + "px TekoSkills";
    rd.textAlign = "center";
    rd.textBaseline = "middle";
    rd.fillStyle = "#ffffff";
    rd.fillText("GAME PAUSED", (((canw * 0.5) - (188 * mw)) * 0.5), (120 * mh));
    var onit = 0;
    var btnx = ((canw * 0.5) - (188 * fm));
    var btny = (167 * mh);
    declick(btnx, (btnx + (376 * fm)), btny, (btny + (73 * fm)), 1);
    if (wasonit == 1) {
        onit = 1;
    }
    if ((onaclk > 7) && (onwho == 1)) {
        onit = 1;
    }
    if ((onaclk == 9) && (onwho == 1)) {
        fase = 6;
        onwho = 0;
        wasonit = 0;
        playsnd(17, 1);
    }
    rd.drawImage(btn[9][onit], btnx, btny, (376 * fm), (73 * fm));
    onit = 0;
    btny = (277 * mh);
    declick(btnx, (btnx + (376 * fm)), btny, (btny + (73 * fm)), 2);
    if (wasonit == 2) {
        onit = 1;
    }
    if ((onaclk > 7) && (onwho == 2)) {
        onit = 1;
    }
    if ((onaclk == 9) && (onwho == 2)) {
        fase = 6;
        if (recreached) {
            onreplay = true;
            rf = (cf - 1);
            switchrep = 20;
        }
        onwho = 0;
        wasonit = 0;
        playsnd(17, 1);
    }
    rd.drawImage(btn[10][onit], btnx, btny, (376 * fm), (73 * fm));
    onit = 0;
    btny = (387 * mh);
    declick(btnx, (btnx + (376 * fm)), btny, (btny + (73 * fm)), 3);
    if (wasonit == 3) {
        onit = 1;
    }
    if ((onaclk > 7) && (onwho == 3)) {
        onit = 1;
    }
    if ((onaclk == 9) && (onwho == 3)) {
        fase = 9;
        trans = 0;
        onwho = 0;
        wasonit = 0;
        playsnd(17, 1);
    }
    rd.drawImage(btn[11][onit], btnx, btny, (376 * fm), (73 * fm));
    rd.font = "" + (23 * (mh + mw)) + "px TekoSkills";
    rd.textAlign = "right";
    rd.textBaseline = "top";
    rd.fillStyle = "#ffffff";
    rd.globalAlpha = 0.3;
    var wdt = rd.measureText("Game Controls").width;
    declick(((1250 * mw) - wdt), (1250 * mw), (30 * mh), ((30 * mh) + (37 * fm)), 4);
    if (wasonit == 4) {
        rd.globalAlpha = 1;
    }
    if ((onaclk > 7) && (onwho == 4)) {
        rd.globalAlpha = 1;
    }
    if ((onaclk == 9) && (onwho == 4)) {
        fase = 8;
        onwho = 0;
        wasonit = 0;
        cntflex = 0;
    }
    rd.fillText("Game Controls", (1250 * mw), (30 * mh));
    rd.fillRect(((1250 * mw) - wdt), ((30 * mh) + (35 * fm)), wdt, (3 * fm));
    rd.globalAlpha = 1;
    rd.drawImage(logo, (canw - (558 * fm) - (50 * mw)), ((560 * mh) - (150 * fm)), (558 * fm), (216 * fm));
}
var cntflex = 0;

function drawcontrols() {
    rd.fillStyle = "#001D00";
    rd.fillRect(0, 0, canw, canh);
    rd.drawImage(pausebg, 0, 0, canw, canh);
    var fm = ((mw + mh) * 0.5);
    rd.font = "" + (30 * (mh + mw)) + "px TekoSkills";
    rd.textAlign = "center";
    rd.textBaseline = "top";
    rd.fillStyle = "#ffffff";
    rd.fillText("Game Controls", (canw * 0.5), (30 * mh));
    rd.drawImage(insti, (canw - (858 * fm) - (20 * mw)), (90 * mh), (858 * fm), (402 * fm));
    rd.font = "" + (24 * (mh + mw)) + "px TekoSkills";
    rd.textAlign = "right";
    rd.textBaseline = "middle";
    rd.fillStyle = "#ffffff";
    if (!isphone) {
        rd.fillText("Click and hold mouse down to drag to direct your player...", (canw - (268 * fm) - (20 * mw)), ((90 * mh) + (100 * fm)));
        rd.fillText("...then release mouse to shoot!", (canw - (187 * fm) - (20 * mw)), ((90 * mh) + (317 * fm)));
    } else {
        rd.fillText("Press and hold thumb down to drag to direct your player...", (canw - (268 * fm) - (20 * mw)), ((90 * mh) + (100 * fm)));
        rd.fillText("...then release thumb to shoot!", (canw - (187 * fm) - (20 * mw)), ((90 * mh) + (317 * fm)));
    }
    var onit = 0;
    var btnx = ((canw * 0.5) - (188 * fm));
    var btny = (580 * mh);
    var corx = btnx;
    var corxt = (btnx + (376 * fm));
    var cory = btny;
    var coryt = (btny + (73 * fm));
    if (cntflex > 150) {
        corx = 0;
        corxt = canw;
        cory = 0;
        coryt = canh;
    }
    cntflex++;
    declick(corx, corxt, cory, coryt, 1);
    if (wasonit == 1) {
        onit = 1;
    }
    if ((onaclk > 7) && (onwho == 1)) {
        onit = 1;
    }
    if ((onaclk == 9) && (onwho == 1)) {
        fase = 6;
        onwho = 0;
        wasonit = 0;
        playsnd(17, 1);
    }
    rd.drawImage(btn[9][onit], btnx, btny, (376 * fm), (73 * fm));
}
var trans = 0;

function transout() {
    rd.globalAlpha = 0.12;
    rd.fillStyle = "#FFFFFF";
    rd.fillRect(0, 0, canw, canh);
    rd.globalAlpha = 1;
    trans++;
    if (trans == 15) {
        fase = 1;
    }
}

function transin() {
    rd.globalAlpha = 0.12;
    rd.fillStyle = "#000000";
    rd.fillRect(0, 0, canw, canh);
    rd.globalAlpha = 1;
    trans++;
    if (trans == 20) {
        fase = 1;
    }
}
var efgo = 0;
var efap = 0;
var efx = 0;
var efy = 0;
var efon = 0;

function drawface() {
    rd.fillStyle = "#001D00";
    rd.fillRect(0, 0, canw, canh);
    rd.drawImage(bgimg[0], 0, 0, canw, canh);
    var fm = ((mw + mh) * 0.5);
    if (gameorigin != "gamedist") {
        if (efgo < 0) {
            if (efap <= 0) {
                efap = Math.floor(15 * Math.random());
                efx = (((Math.random() * 20) - 10) * fm);
                efy = (((Math.random() * 20) - 10) * fm);
                if (efon == 0) {
                    efon = 1;
                } else {
                    efon = 0;
                }
            }
            efap--;
            if (efap < 3) {
                rd.globalAlpha = 0.6;
                rd.drawImage(eflog[efon], ((canw * 0.45) - (279 * fm) + efx), ((35 * mh) + (120 * fm) + efy), (558 * fm), (57 * fm));
                rd.globalAlpha = 1;
            }
        }
        efgo--;
        if (efgo == -50) {
            efgo = 10;
        }
        rd.drawImage(logo, ((canw * 0.45) - (279 * fm)), (35 * mh), (558 * fm), (216 * fm));
        rd.font = "" + (30 * (mh + mw)) + "px TekoSkills";
        rd.textAlign = "right";
        rd.textBaseline = "middle";
        rd.fillStyle = "#000000";
        rd.fillText(frontname, (850 * mw), (380 * mh));
        rd.drawImage(cupimg, (820 * mw), ((380 * mh) - (104 * fm)), (196 * fm), (208 * fm));
        var onit = 0;
        var btnx = ((canw * 0.5) - (138 * fm));
        var btny = (480 * mh);
        declick(btnx, (btnx + (276 * fm)), btny, (btny + (82 * fm)), 1);
        if (wasonit == 1) {
            onit = 1;
        }
        if ((onaclk > 7) && (onwho == 1)) {
            onit = 1;
        }
        if ((onaclk == 9) && (onwho == 1)) {
            fase = 2;
            onwho = 0;
            wasonit = 0;
            playsnd(17, 1);
        }
        rd.drawImage(btn[0][onit], btnx, btny, (276 * fm), (82 * fm));
        onit = 0;
        btnx = ((canw * 0.5) - (186 * fm));
        btny = (600 * mh);
        declick(btnx, (btnx + (372 * fm)), btny, (btny + (66 * fm)), 2);
        if (wasonit == 2) {
            onit = 1;
        }
        if ((onaclk > 7) && (onwho == 2)) {
            onit = 1;
        }
        if ((onaclk == 9) && (onwho == 2)) {
            fase = 4;
            onwho = 0;
            wasonit = 0;
            playsnd(17, 1);
        }
        rd.drawImage(btn[1][onit], btnx, btny, (372 * fm), (66 * fm));
    } else {
        if (efgo < 0) {
            if (efap <= 0) {
                efap = Math.floor(15 * Math.random());
                efx = (((Math.random() * 30) - 15) * fm);
                efy = (((Math.random() * 30) - 15) * fm);
                if (efon == 0) {
                    efon = 1;
                } else {
                    efon = 0;
                }
            }
            efap--;
            if (efap < 3) {
                rd.globalAlpha = 0.6;
                rd.drawImage(eflog[efon], ((canw * 0.5) - (279 * fm) + efx), ((20 * mh) + (120 * fm) + efy), (558 * fm), (57 * fm));
                rd.globalAlpha = 1;
            }
        }
        efgo--;
        if (efgo == -50) {
            efgo = 10;
        }
        rd.drawImage(logo, ((canw * 0.5) - (279 * fm)), (20 * mh), (558 * fm), (216 * fm));
        rd.font = "" + (30 * (mh + mw)) + "px TekoSkills";
        rd.textAlign = "center";
        rd.textBaseline = "middle";
        rd.fillStyle = "#000000";
        rd.fillText(frontname, (canw * 0.5), (380 * mh));
        var onit = 0;
        var btnx = ((canw * 0.5) - (138 * fm));
        var btny = (500 * mh);
        declick(btnx, (btnx + (276 * fm)), btny, (btny + (82 * fm)), 1);
        if (wasonit == 1) {
            onit = 1;
        }
        if ((onaclk > 7) && (onwho == 1)) {
            onit = 1;
        }
        if ((onaclk == 9) && (onwho == 1)) {
            fase = 2;
            onwho = 0;
            wasonit = 0;
            playsnd(17, 1);
        }
        rd.drawImage(btn[0][onit], btnx, btny, (276 * fm), (82 * fm));
        onit = 0;
        btnx = ((canw * 0.5) - (186 * fm));
        btny = (620 * mh);
        declick(btnx, (btnx + (372 * fm)), btny, (btny + (66 * fm)), 2);
        if (wasonit == 2) {
            onit = 1;
        }
        if ((onaclk > 7) && (onwho == 2)) {
            onit = 1;
        }
        if ((onaclk == 9) && (onwho == 2)) {
            fase = 4;
            onwho = 0;
            wasonit = 0;
            playsnd(17, 1);
        }
        rd.drawImage(btn[1][onit], btnx, btny, (372 * fm), (66 * fm));
    }
    musictog();
}
var tsel = [0, 0];

function selecteam() {
    rd.fillStyle = "#001D00";
    rd.fillRect(0, 0, canw, canh);
    rd.drawImage(bgimg[0], 0, 0, canw, canh);
    var fm = ((mw + mh) * 0.5);
    rd.font = "" + (34 * (mh + mw)) + "px TekoSkills";
    rd.textAlign = "left";
    rd.textBaseline = "middle";
    rd.fillStyle = "#000000";
    rd.fillText("CHOOSE YOUR TEAM", (120 * mw), (120 * mh));
    rd.drawImage(teamflag[tsel[0]], (430 * mw), ((290 * mh) - (44 * fm)), (88 * fm), (88 * fm));
    rd.fillText(team[tsel[0]], ((442 * mw) + (88 * fm)), (305 * mh));
    rd.fillStyle = "#000000";
    rd.fillRect(((canw * 0.5) - (252 * fm)), ((365 * mh) - (2 * fm)), (504 * fm), (49 * fm));
    for (var i = 0; i < teamtats[tsel[0]]; i++) {
        rd.fillStyle = "rgb(255," + Math.round(155 + (i * 1)) + ",0)";
        var dif = 7;
        if (i == 99) {
            dif = 5;
        }
        rd.fillRect(((canw * 0.5) - (250 * fm) + (i * 5 * fm)), (365 * mh), (dif * fm), (45 * fm));
    }
    var onit = 0;
    var btnx = ((canw * 0.5) - (252 * fm) - (70 * mh) - (215 * fm));
    var btny = ((365 * mh) + (22.5 * fm) - (35 * fm));
    declick(btnx, (btnx + (215 * fm)), btny, (btny + (70 * fm)), 1);
    if (wasonit == 1) {
        onit = 1;
    }
    if ((onaclk > 7) && (onwho == 1)) {
        onit = 1;
    }
    if ((onaclk == 9) && (onwho == 1)) {
        tsel[0]--;
        if (tsel[0] < 0) {
            tsel[0] = 23;
        }
        playsnd(18, 1);
    }
    rd.drawImage(btn[2][onit], btnx, btny, (215 * fm), (70 * fm));
    onit = 0;
    btnx = ((canw * 0.5) + (252 * fm) + (70 * mh));
    btny = ((365 * mh) + (22.5 * fm) - (35 * fm));
    declick(btnx, (btnx + (215 * fm)), btny, (btny + (70 * fm)), 2);
    if (wasonit == 2) {
        onit = 1;
    }
    if ((onaclk > 7) && (onwho == 2)) {
        onit = 1;
    }
    if ((onaclk == 9) && (onwho == 2)) {
        tsel[0]++;
        if (tsel[0] >= 24) {
            tsel[0] = 0;
        }
        playsnd(18, 1);
    }
    rd.drawImage(btn[3][onit], btnx, btny, (215 * fm), (70 * fm));
    onit = 0;
    btnx = ((canw * 0.3) - (138 * fm));
    btny = ((630 * mh) - (73 * fm));
    declick(btnx, (btnx + (276 * fm)), btny, (btny + (73 * fm)), 3);
    if (wasonit == 3) {
        onit = 1;
    }
    if ((onaclk > 7) && (onwho == 3)) {
        onit = 1;
    }
    if ((onaclk == 9) && (onwho == 3)) {
        nt = 1;
        loadteam[0] = 1;
        ont = 0;
        fase = 5;
        onwho = 0;
        wasonit = 0;
        playsnd(17, 1);
    }
    rd.drawImage(btn[4][onit], btnx, btny, (276 * fm), (73 * fm));
    onit = 0;
    btnx = ((canw * 0.6) - (188.5 * fm));
    btny = ((630 * mh) - (82 * fm));
    declick(btnx, (btnx + (377 * fm)), btny, (btny + (82 * fm)), 4);
    if (wasonit == 4) {
        onit = 1;
    }
    if ((onaclk > 7) && (onwho == 4)) {
        onit = 1;
    }
    if ((onaclk == 9) && (onwho == 4)) {
        cupmod = 0;
        fase = 3;
        onwho = 0;
        wasonit = 0;
        playsnd(17, 1);
    }
    rd.drawImage(btn[5][onit], btnx, btny, (377 * fm), (82 * fm));
    musictog();
}
var onlink = 0;

function drawabout() {
    rd.fillStyle = "#001D00";
    rd.fillRect(0, 0, canw, canh);
    rd.drawImage(bgimg[0], 0, 0, canw, canh);
    var fm = ((mw + mh) * 0.5);
    if (efgo < 0) {
        if (efap <= 0) {
            efap = Math.floor(15 * Math.random());
            efx = (((Math.random() * 20) - 10) * fm);
            efy = (((Math.random() * 20) - 10) * fm);
            if (efon == 0) {
                efon = 1;
            } else {
                efon = 0;
            }
        }
        efap--;
        if (efap < 3) {
            rd.globalAlpha = 0.6;
            rd.drawImage(eflog[efon], ((canw * 0.45) - (279 * fm) + efx), ((35 * mh) + (120 * fm) + efy), (558 * fm), (57 * fm));
            rd.globalAlpha = 1;
        }
    }
    efgo--;
    if (efgo == -50) {
        efgo = 10;
    }
    rd.drawImage(logo, ((canw * 0.45) - (279 * fm)), (35 * mh), (558 * fm), (216 * fm));
    rd.drawImage(rad, ((canw * 0.5) - (254 * fm)), (360 * mh), (507 * fm), (169 * fm));
    if ((xm > ((canw * 0.5) - (254 * fm))) && (xm < ((canw * 0.5) + (254 * fm))) && (ym > (360 * mh)) && (ym < ((360 * mh) + (169 * fm)))) {
        if (gameorigin == "home") {
            onlink = 1;
            canvasElement.style.cursor = "pointer";
        }
    } else {
        canvasElement.style.cursor = "auto";
        onlink = 0;
    }
    var onit = 0;
    var btnx = ((canw * 0.7) - (321 * fm * 0.5));
    var btny = (canh - (66 * fm) - (20 * mh));
    declick(btnx, (btnx + (321 * fm)), btny, (btny + (66 * fm)), 1);
    if (wasonit == 1) {
        onit = 1;
    }
    if ((onaclk > 7) && (onwho == 1)) {
        onit = 1;
    }
    if ((onaclk == 9) && (onwho == 1)) {
        fase = 1;
        canvasElement.style.cursor = "auto";
        onlink = 0;
        onwho = 0;
        wasonit = 0;
        playsnd(17, 1);
    }
    rd.drawImage(btn[14][onit], btnx, btny, (321 * fm), (66 * fm));
    musictog();
}
var ntmo = 0;
var cupmod = 0;
var teamtos = [];
var confr = 0;
var confl = -1;
var confg = 0;
var confc = 0;

function drawcup() {
    rd.fillStyle = "#001D00";
    rd.fillRect(0, 0, canw, canh);
    rd.drawImage(bgimg[1], 0, 0, canw, canh);
    var fm = ((mw + mh) * 0.5);
    if (cupmod == 0) {
        for (var i = 0; i < ntm; i++) {
            teamtos[i] = -1;
        }
        for (var i = 0; i < ntm; i++) {
            var rps = Math.floor(Math.random() * ntm);
            if (rps == ntm) {
                rps--;
            }
            while (teamtos[rps] != -1) {
                rps++;
                if (rps == ntm) {
                    rps = 0;
                }
            }
            teamtos[rps] = i;
        }
        ntmo = ntm;
        for (var i = 0; i < ntmo; i++) {
            if (tsel[0] == teamtos[i]) {
                if (i % 2 == 0) {
                    tsel[1] = teamtos[(i + 1)];
                } else {
                    tsel[1] = teamtos[(i - 1)];
                }
            }
        }
        cupmod = 1;
        efap = 0;
    }
    if ((cupmod == 2) && (ntmo == 2) && (woncup)) {
        efap = 0;
        confc = 0;
        confg = 0;
        confr = 0;
        cupmod = 4;
    }
    if (cupmod == 2) {
        if (ntmo == 24) {
            var outmag = [0, 0, 0, 0, 0, 0, 0, 0];
            var out1 = [0, 0, 0, 0, 0, 0, 0, 0];
            var out2 = [0, 0, 0, 0, 0, 0, 0, 0];
            for (var i = 0; i < 24; i += 2) {
                var mag = Math.abs(teamtats[teamtos[i]] - teamtats[teamtos[(i + 1)]]);
                if (teamtos[i] == tsel[0] || teamtos[(i + 1)] == tsel[0]) {
                    mag = 100;
                }
                var smomag = outmag[0];
                var sk = 0;
                for (var k = 1; k < 8; k++) {
                    if (outmag[k] < smomag) {
                        smomag = outmag[k];
                        sk = k;
                    }
                }
                if (mag > outmag[sk]) {
                    out1[sk] = teamtos[i];
                    out2[sk] = teamtos[(i + 1)];
                    outmag[sk] = mag;
                }
            }
            var rem = [0, 0, 0, 0, 0, 0, 0, 0];
            for (var k = 0; k < 8; k++) {
                if ((out1[k] != tsel[0]) && (out2[k] != tsel[0])) {
                    if (teamtats[out1[k]] < teamtats[out2[k]]) {
                        rem[k] = out1[k];
                    } else {
                        rem[k] = out2[k];
                    }
                } else {
                    if (out1[k] == tsel[0]) {
                        rem[k] = out2[k];
                    } else {
                        rem[k] = out1[k];
                    }
                }
            }
            for (var i = 0; i < 16; i++) {
                teamtos[i] = -1;
            }
            for (var i = 0; i < ntm; i++) {
                if ((i != rem[0]) && (i != rem[1]) && (i != rem[2]) && (i != rem[3]) && (i != rem[4]) && (i != rem[5]) && (i != rem[6]) && (i != rem[7])) {
                    var rps = Math.floor(Math.random() * 16);
                    if (rps == 16) {
                        rps--;
                    }
                    while (teamtos[rps] != -1) {
                        rps++;
                        if (rps == 16) {
                            rps = 0;
                        }
                    }
                    teamtos[rps] = i;
                }
            }
            ntmo = 16;
        } else {
            var nteamtos = [];
            var ni = 0;
            for (var i = 0; i < ntmo; i += 2) {
                var doubteam = false;
                while (!doubteam) {
                    if ((teamtats[teamtos[i]] + 20 - (40 * Math.random())) > (teamtats[teamtos[(i + 1)]] + 20 - (40 * Math.random()))) {
                        if ((teamtats[teamtos[i]] + 20 - (40 * Math.random())) > (teamtats[teamtos[(i + 1)]] + 20 - (40 * Math.random()))) {
                            nteamtos[ni] = teamtos[i];
                            doubteam = true;
                        }
                    } else {
                        if ((teamtats[teamtos[i]] + 20 - (40 * Math.random())) < (teamtats[teamtos[(i + 1)]] + 20 - (40 * Math.random()))) {
                            nteamtos[ni] = teamtos[(i + 1)];
                            doubteam = true;
                        }
                    }
                }
                if (teamtos[i] == tsel[0]) {
                    nteamtos[ni] = teamtos[i];
                }
                if (teamtos[(i + 1)] == tsel[0]) {
                    nteamtos[ni] = teamtos[(i + 1)];
                }
                ni++;
            }
            ntmo = ni;
            for (var i = 0; i < ntmo; i++) {
                teamtos[i] = nteamtos[i];
            }
        }
        for (var i = 0; i < ntmo; i++) {
            if (tsel[0] == teamtos[i]) {
                if (i % 2 == 0) {
                    tsel[1] = teamtos[(i + 1)];
                } else {
                    tsel[1] = teamtos[(i - 1)];
                }
            }
        }
        cupmod = 3;
        efap = 0;
    }
    if (cupmod != 4) {
        rd.font = "" + (34 * (mh + mw)) + "px TekoSkills";
        rd.textAlign = "center";
        rd.textBaseline = "middle";
        rd.fillStyle = "#FFFFFF";
        rd.fillText(dispname, (canw * 0.5), (60 * mh));
        var idr = 0,
            saz = 0,
            spc = 0,
            fnt = 0,
            lng = 0;
        if (ntmo == 32) {
            idr = 10;
            saz = 40;
            spc = 4;
            fnt = 18;
            lng = 300;
        }
        if (ntmo == 24) {
            idr = 16;
            saz = 50;
            spc = 8;
            fnt = 19;
            lng = 317;
        }
        if (ntmo == 16) {
            idr = 50;
            saz = 60;
            spc = 20;
            fnt = 21;
            lng = 350;
        }
        if (ntmo == 8) {
            idr = 175;
            saz = 70;
            spc = 30;
            fnt = 24;
            lng = 400;
        }
        if (ntmo == 4) {
            idr = 255;
            saz = 80;
            spc = 50;
            fnt = 27;
            lng = 450;
        }
        if (ntmo == 2) {
            idr = 300;
            saz = 90;
            spc = 0;
            fnt = 30;
            lng = 500;
        }
        var fir = false;
        for (var i = 0; i < (ntmo / 2); i++) {
            var dry = ((idr + ((saz + spc) * i)) * mh);
            rd.fillStyle = "#000000";
            if (tsel[0] == teamtos[i]) {
                efap++;
                if (efap >= 8) {
                    rd.fillStyle = "#333333";
                }
                if (efap == 12) {
                    efap = 0;
                }
            }
            rd.globalAlpha = 0.6;
            rd.fillRect(((10 * mw) + (saz * mh * 0.5)), dry, (lng * fm), (saz * mh));
            rd.fillStyle = "#000000";
            if (ntmo == 2) {
                rd.globalAlpha = 0.3;
            }
            rd.fillRect(((10 * mw) + (saz * mh * 0.5) + (lng * fm)), (dry + (saz * mh * 0.44)), (saz * mw * 0.3), (saz * mh * 0.12));
            if (ntmo != 2) {
                if (!fir) {
                    rd.fillRect(((10 * mw) + (saz * mh * 0.5) + (lng * fm) + (saz * mw * 0.3)), (dry + (saz * mh * 0.44)), (saz * mw * 0.12), (((idr + ((saz + spc) * (i + 1))) * mh) - dry + (saz * mh * 0.12)));
                    fir = true;
                } else {
                    fir = false;
                }
            }
            rd.globalAlpha = 1;
            rd.drawImage(teamflag[teamtos[i]], (10 * mw), dry, (saz * mh), (saz * mh));
            rd.font = "" + (fnt * (mh + mw)) + "px TekoSkills";
            rd.textAlign = "left";
            rd.textBaseline = "middle";
            rd.fillStyle = "#FFFFFF";
            rd.fillText(team[teamtos[i]], ((20 * mw) + (saz * mh)), (dry + (saz * mh * 0.6)));
        }
        fir = false;
        for (var i = (ntmo / 2); i < ntmo; i++) {
            var dry = ((idr + ((saz + spc) * (i - (ntmo / 2)))) * mh);
            rd.fillStyle = "#000000";
            if (tsel[0] == teamtos[i]) {
                efap++;
                if (efap >= 8) {
                    rd.fillStyle = "#333333";
                }
                if (efap == 12) {
                    efap = 0;
                }
            }
            rd.globalAlpha = 0.6;
            rd.fillRect((canw - (10 * mw) - (saz * mh * 0.5) - (lng * fm)), dry, (lng * fm), (saz * mh));
            rd.fillStyle = "#000000";
            rd.fillStyle = "#000000";
            if (ntmo == 2) {
                rd.globalAlpha = 0.3;
            }
            rd.fillRect((canw - (10 * mw) - (saz * mh * 0.5) - (lng * fm) - (saz * mw * 0.3)), (dry + (saz * mh * 0.44)), (saz * mw * 0.3), (saz * mh * 0.12));
            if (ntmo != 2) {
                if (!fir) {
                    rd.fillRect((canw - (10 * mw) - (saz * mh * 0.5) - (lng * fm) - (saz * mw * 0.3) - (saz * mw * 0.12)), (dry + (saz * mh * 0.44)), (saz * mw * 0.12), (((idr + ((saz + spc) * (i - (ntmo / 2) + 1))) * mh) - dry + (saz * mh * 0.12)));
                    fir = true;
                } else {
                    fir = false;
                }
            }
            rd.globalAlpha = 1;
            rd.drawImage(teamflag[teamtos[i]], (canw - (10 * mw) - (saz * mh)), dry, (saz * mh), (saz * mh));
            rd.font = "" + (fnt * (mh + mw)) + "px TekoSkills";
            rd.textAlign = "right";
            rd.textBaseline = "middle";
            rd.fillStyle = "#FFFFFF";
            rd.fillText(team[teamtos[i]], (canw - (20 * mw) - (saz * mh)), (dry + (saz * mh * 0.6)));
        }
        rd.drawImage(cupimg, ((canw * 0.5) - (98 * fm)), (140 * mh), (196 * fm), (208 * fm));
        if (ntmo <= 8) {
            rd.font = "" + (34 * (mh + mw)) + "px TekoSkills";
            rd.textAlign = "center";
            rd.textBaseline = "middle";
            rd.fillStyle = "#000000";
        }
        if (ntmo == 8) {
            rd.fillText("Quarter Finals", (canw * 0.5), (470 * mh));
        }
        if (ntmo == 4) {
            rd.fillText("Semi Finals", (canw * 0.5), (520 * mh));
        }
        if (ntmo == 2) {
            if (efap >= 8) {
                if (Math.random() > Math.random()) {
                    rd.fillStyle = "#FFD161";
                } else {
                    rd.fillStyle = "#61F2FF";
                }
            }
            rd.fillText("FINAL!", (canw * 0.5), (500 * mh));
        }
        var onit = 0;
        var btnx = ((canw * 0.5) - (191 * fm));
        var btny = (canh - (82 * fm) - (30 * mh));
        declick(btnx, (btnx + (382 * fm)), btny, (btny + (82 * fm)), 1);
        if (wasonit == 1) {
            onit = 1;
        }
        if ((onaclk > 7) && (onwho == 1)) {
            onit = 1;
        }
        if ((onaclk == 9) && (onwho == 1)) {
            nt = 2;
            loadteam[0] = 1;
            loadteam[1] = 1;
            ont = 0;
            fase = 5;
            onwho = 0;
            wasonit = 0;
            playsnd(17, 1);
        }
        rd.drawImage(btn[6][onit], btnx, btny, (382 * fm), (82 * fm));
    } else {
        rd.font = "" + (34 * (mh + mw)) + "px TekoSkills";
        rd.textAlign = "center";
        rd.textBaseline = "middle";
        rd.fillStyle = "#FFFFFF";
        efap++;
        if (efap >= 5) {
            rd.fillStyle = "#51BDFB";
        }
        if (efap >= 7) {
            efap = 0;
        }
        rd.fillText("You won the " + dispname + "!", (canw * 0.5), (60 * mh));
        rd.fillStyle = "#FFFFFF";
        rd.fillText("Congradulations!", (canw * 0.5), (140 * mh));
        var saz = 90,
            lng = 500;
        var dry = (270 * mh);
        rd.fillStyle = "#000000";
        rd.globalAlpha = 0.6;
        rd.fillRect(((310 * mw) + (saz * mh * 0.5)), dry, (lng * fm), (saz * mh));
        rd.globalAlpha = 1;
        rd.drawImage(teamflag[tsel[0]], (310 * mw), dry, (saz * mh), (saz * mh));
        rd.font = "" + (30 * (mh + mw)) + "px TekoSkills";
        rd.textAlign = "left";
        rd.textBaseline = "middle";
        rd.fillStyle = "#FFFFFF";
        rd.fillText(team[tsel[0]], ((330 * mw) + (saz * mh)), (dry + (saz * mh * 0.6)));
        rd.drawImage(cupimg, ((310 * mw) + (saz * mh * 0.5) + ((lng - 104) * fm)), (190 * mh), (196 * fm), (208 * fm));
        var mesut = 0;
        if (teamtats[tsel[0]] >= 67) {
            rd.fillStyle = "#000000";
            rd.fillText("You can always try winning the cup with a weaker team!", (10 * mw), (canh - (82 * fm) - (50 * mh)));
            rd.fillText("Challenge yourself see if you can make it!", (10 * mw), (canh - (82 * fm) + (20 * mh)));
            mesut = rd.measureText("Challenge yourself see if you can make it!").width;
        } else {
            rd.fillStyle = "#000000";
            rd.fillText("And you did it with a weaker than average team!", (10 * mw), (canh - (82 * fm) - (50 * mh)));
            rd.fillText("Amazing accomplishment!!", (10 * mw), (canh - (82 * fm) + (20 * mh)));
            mesut = rd.measureText("Amazing accomplishment!!").width;
        }
        var onit = 0;
        var btnx = (mesut + (40 * mw));
        var btny = (canh - (82 * fm) - (20 * mh));
        declick(btnx, (btnx + (276 * fm)), btny, (btny + (82 * fm)), 1);
        if (wasonit == 1) {
            onit = 1;
        }
        if ((onaclk > 7) && (onwho == 1)) {
            onit = 1;
        }
        if ((onaclk == 9) && (onwho == 1)) {
            woncup = 0;
            fase = 9;
            trans = 0;
            onwho = 0;
            wasonit = 0;
            playsnd(17, 1);
        }
        rd.drawImage(btn[13][onit], btnx, btny, (276 * fm), (82 * fm));
        if (confc < 10) {
            if (confg == 0) {
                if (Math.floor(confr) <= 28) {
                    rd.drawImage(confe[Math.floor(confr)], (confl * 170 * mw), 0, (1280 * mw), (720 * mh));
                    confr += 0.33;
                } else {
                    confg = 30;
                    confr = 0;
                    if (confl == 1) {
                        confl = -1;
                    } else {
                        confl = 1;
                    }
                    confc++;
                }
            } else {
                confg--;
            }
        }
    }
}

function drawloading(typ) {
    rd.fillStyle = "#001D00";
    rd.fillRect(0, 0, canw, canh);
    rd.drawImage(bgimg[3], (canh * 0.55), 0, (canw - (canh * 0.55)), canh);
    rd.drawImage(bgimg[2], 0, 0, (canh * 0.56944), canh);
    var fm = ((mw + mh) * 0.5);
    rd.font = "" + (34 * (mh + mw)) + "px TekoSkills";
    rd.textAlign = "left";
    rd.textBaseline = "middle";
    rd.fillStyle = "#ffffff";
    rd.fillText("Loading " + team[tsel[typ]] + "", (350 * mw), (200 * mh));
    rd.globalAlpha = 0.5;
    rd.fillText("" + loaded + "%", ((580 * mw) + (100 * fm)), (350 * mh));
    rd.globalAlpha = 1;
    rd.lineWidth = (20 * fm);
    rd.strokeStyle = "#245800";
    rd.beginPath();
    rd.arc(((580 * mw) - (35 * fm)), ((380 * mh) - (35 * fm)), (70 * fm), 0, (loaded * 0.02 * Math.PI));
    rd.stroke();
    rd.drawImage(teamflag[tsel[typ]], ((580 * mw) - (79 * fm)), ((380 * mh) - (79 * fm)), (88 * fm), (88 * fm));
    rd.drawImage(logo, (canw - (558 * fm) - (50 * mw)), ((560 * mh) - (150 * fm)), (558 * fm), (216 * fm));
}
var wasonit = 0;
var onaclk = 0;
var onwho = 0;

function declick(xf, xt, yf, yt, onx) {
    var clknow = false;
    if ((xm > xf) && (xm < xt) && (ym > yf) && (ym < yt)) {
        if (mdown) {
            wasonit = onx;
        } else {
            if (wasonit == onx) {
                clknow = true;
                wasonit = 0;
            }
        }
        if (mclick) {
            clknow = true;
            wasonit = 0;
        }
    } else {
        if (wasonit == onx) {
            wasonit = 0;
        }
    }
    if ((clknow) && (!onaclk)) {
        onaclk = 10;
        onwho = onx;
    }
}
var mclick = false;

function canvasclick() {
    mclick = true;
    if ((window.innerWidth != screen.width) || (window.innerHeight != screen.height)) {
        if (isphone) {
            if (document.body.requestFullScreen) {
                document.body.requestFullScreen();
            } else {
                if (document.body.webkitRequestFullScreen) {
                    document.body.webkitRequestFullScreen();
                } else {
                    if (document.body.mozRequestFullScreen) {
                        document.body.mozRequestFullScreen();
                    } else {
                        if (document.body.msRequestFullscreen) {
                            document.body.msRequestFullscreen();
                        }
                    }
                }
            }
        }
    }
    if (!clickmade) {
        if (isios) {
            playsnd(17, 1);
        }
        clickmade = true;
    } else {
        if (lopload[0] == 11) {
            if ((fase == 6) && (nt == 2)) {
                lopload[0] = 1;
                playlop(0);
            }
        } else {
            if (lopload[2] == 11) {
                if (fase == 6) {
                    playlop(2);
                }
            } else {
                if ((lopload[3] == 11) && (fase == 6) && (nt == 2) && (ntmo == 2)) {
                    playlop(3);
                }
            }
        }
        if ((lopload[1] == 11) && (fase != 0) && (fase != 6) && (fase != 7) && (fase != 8)) {
            lopload[1] = 1;
            playlop(1);
        }
    }
    if (gameorigin == "home") {
        if (onlink == 1) {
            window.open('https://www.radicalplay.com/', '_blank');
        }
    }
    if (onlink == 2) {
        window.open('https://play.google.com/store/apps/details?id=com.radicalplay.soccerskillseuro2021', '_blank');
        onlink = 0;
    }
    if (onlink == 3) {
        window.open('https://apps.apple.com/eg/app/soccer-skills-euro-cup/id1584320891', '_blank');
        onlink = 0;
    }
}

function fillroundrect(x, y, width, height, cornerRadius) {
    rd.beginPath();
    rd.moveTo(x + cornerRadius, y);
    rd.lineTo(x + width - cornerRadius, y);
    rd.quadraticCurveTo(x + width, y, x + width, y + cornerRadius);
    rd.lineTo(x + width, y + height - cornerRadius);
    rd.quadraticCurveTo(x + width, y + height, x + width - cornerRadius, y + height);
    rd.lineTo(x + cornerRadius, y + height);
    rd.quadraticCurveTo(x, y + height, x, y + height - cornerRadius);
    rd.lineTo(x, y + cornerRadius);
    rd.quadraticCurveTo(x, y, x + cornerRadius, y);
    rd.fill();
}