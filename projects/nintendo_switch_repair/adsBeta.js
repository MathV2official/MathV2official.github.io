window.adsbygoogle = window.adsbygoogle || [];
const adBreak = adConfig = function(o) {
    adsbygoogle.push(o);
}
adConfig({
    preloadAdBreaks: 'on',
    sound: 'on', // This game has sound
    onReady: () => {
        console.log("ready");
    }, // Called when API has initialised and adBreak() is ready
});

//var isAds = true;
//setInterval(enableAds, 1000 * 180);
//function enableAds( ) 
//{
//isAds = true;
//}

function showAdsBeta() {
    console.log("showAdsBeta")
    adBreak({
        type: 'start', // ad shows at start of next level
        name: 'start-ads',
        beforeAd: () => {
            console.log("before ads")
            window.onblur();
        }, // You may also want to mute thegame's sound.
        afterAd: () => {
            console.log("after ads")
            window.onfocus();
        }, // resume the game flow.
        adBreakDone: (placementInfo) => {
            console.log("adBreak complete ");
            console.log(placementInfo.breakType);
            console.log(placementInfo.breakName);
            console.log(placementInfo.breakFormat);
            console.log(placementInfo.breakStatus);
        },
    });
}

rewardSuccess = function() {};

function showRewardBeta() {
    console.log("showRewardBeta")
    adBreak({
        type: 'reward', // ad shows at start of next level
        name: 'dressup-reward',
        beforeAd: () => {
            console.log("before ad reward")
            window.onblur();
        }, // You may also want to mute thegame's sound.
        afterAd: () => {
            console.log("after reward")
            window.onfocus();
        }, // resume the game flow.
        beforeReward: (showAdFn) => {
            showAdFn();
            console.log("show reward")
        },
        adDismissed: () => {
            console.log("reward dismissed")
        },
        adViewed: () => {
            rewardSuccess();
            console.log("reward viewed")
        },
        adBreakDone: (placementInfo) => {
            console.log("adBreak complete ");
            console.log(placementInfo.breakType);
            console.log(placementInfo.breakName);
            console.log(placementInfo.breakFormat);
            console.log(placementInfo.breakStatus);
        },
    });
}