const headTag = document.getElementsByTagName('head')[0];

const styleLink = 'https://lablockedgames.com/preroll/style.css';

const myAdsCode = document.createElement('div');
myAdsCode.style.cssText = 'position:absolute;z-index:9999;background-color:black;color:lightyellow;width:100%;height:100%;padding:0;margin:0';
myAdsCode.setAttribute("id", "adsCode");
document.body.prepend(myAdsCode);


const adinPreroll = document.createElement('div');
adinPreroll.setAttribute('id', 'preroll');
document.body.prepend(adinPreroll);

const reqAdinPlay = '<script>\n' +
    '    var aiptag = aiptag || {};\n' +
    '    aiptag.cmd = aiptag.cmd || [];\n' +
    '    aiptag.cmd.display = aiptag.cmd.display || [];\n' +
    '    aiptag.cmd.player = aiptag.cmd.player || [];\n' +
    '    </script>';

headTag.innerHTML += (reqAdinPlay);

let addJquery = document.createElement('script');
addJquery.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
headTag.appendChild(addJquery);

let addBtnStyle = document.createElement('link');
addBtnStyle.rel = 'stylesheet';
addBtnStyle.href = styleLink;
headTag.appendChild(addBtnStyle);


const adsCode = document.getElementById('adsCode');

let adinPlayAdd = document.createElement('script');
adinPlayAdd.src = '//api.adinplay.com/libs/aiptag/pub/UBG/lablockedgames.com/tag.min.js';
adinPlayAdd.async = true;
headTag.appendChild(adinPlayAdd);



adsCode.innerHTML += '<div class="maindiv"><button class="button" type="button" id="startGame">Play</button></div>';




let startGame = document.getElementById('startGame');

startGame.addEventListener("click", function(event){
    event.preventDefault()
});

startGame.onclick = function() {
    adsCode.style.cssText = 'display:none;background-color:black;color:lightyellow;width:100%;height:100%';
    aiptag.cmd.player.push(function() {
        adplayer = new aipPlayer({
            AD_WIDTH: 960,
            AD_HEIGHT: 540,
            AD_FULLSCREEN: false,
            AD_CENTERPLAYER: false,
            LOADING_TEXT: 'loading advertisement',
            PREROLL_ELEM: function(){return document.getElementById('preroll')},
            AIP_COMPLETE: function (evt)  {
                adsCode.style.cssText = 'display:none;';
                console.log("Preroll Ad Completed: " + evt);
            },
            AIP_REMOVE: function ()  {
                // Here it's save to remove the PREROLL_ELEM from the page if you want. But it's not recommend.
            }
        });
    });

    if (typeof adplayer !== 'undefined') {
        aiptag.cmd.player.push(function() { adplayer.startPreRoll(); });
    } else {
        adsCode.style.cssText = 'display:none;';
        console.log("Ad Could not be loaded, load your content here");
    }
}






