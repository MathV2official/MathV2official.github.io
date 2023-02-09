function CRollingScore() {
    this.rollingNumber = function (oScoreText, szText, iFromScore, iToScore, iTime) {
        var oFromScore = {score: iFromScore};
        
        createjs.Tween.get(oFromScore, {override: true})
                        .to({score: iToScore}, iTime, createjs.Ease.cubicOut)
                        .addEventListener("change", function () {
                            oScoreText.refreshText( sprintf(szText, Math.floor(oFromScore.score)));
                        }).call(function () {
                            oFromScore.removeAllEventListeners();
                            createjs.Tween.removeTweens(oFromScore);
                        });
    };
    
    return this;
}

