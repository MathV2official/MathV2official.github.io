function CScoreGUI(iX,iY,oParentContainer){
    var _pStartPos;
    
    var _oRollingScore;
    var _iPrevScore;
    var _oScoreText;
    var _oHighlight;
    var _oContainer;
    var _oParentContainer = oParentContainer;
    
    this._init = function(iX,iY){
       
        _pStartPos = {x:iX,y:iY};
        _oContainer = new createjs.Container();
        _oContainer.x = iX;
        _oContainer.y = iY;
        _oParentContainer.addChild(_oContainer);
        
        var oSpriteBG = s_oSpriteLibrary.getSprite("player_gui");
        var oBg = createBitmap(oSpriteBG);
        _oContainer.addChild(oBg);
        _iPrevScore = 0;
        
        var oSpriteHighlight =s_oSpriteLibrary.getSprite("highlight_player");
        _oHighlight = createBitmap(oSpriteHighlight);
        _oHighlight.alpha = 0;
        _oHighlight.regX = oSpriteHighlight.width/2;
        _oHighlight.regY = oSpriteHighlight.height/2;
        _oHighlight.x = oSpriteBG.width/2;
        _oHighlight.y = oSpriteBG.height/2;
        _oContainer.addChild(_oHighlight);
        
        _oScoreText = new CTLText(_oContainer, 
                    40, 5, oSpriteBG.width, oSpriteBG.height-10, 
                    30, "left", "#fff", FONT_GAME, 1,
                    0, 0,
                    sprintf(TEXT_SCORE, _iPrevScore),
                    true, true, false,
                    false );
         
        _oContainer.regX = oSpriteBG.width/2;
        
        _oRollingScore = new CRollingScore();
    };
    
    this.refreshScore = function(iNewScore){
        _oRollingScore.rollingNumber(_oScoreText, TEXT_SCORE, _iPrevScore, iNewScore, 1000);
        _iPrevScore = iNewScore;
    };
    
    this.refreshButtonPos = function(){
        _oContainer.y = _pStartPos.y + s_iOffsetY * 0.5;
    };
    
    this.highlight = function(){
        _oHighlight.alpha = 0 ;
        createjs.Tween.get(_oHighlight).to({alpha:1}, 1000, createjs.Ease.cubicOut).to({alpha:0}, 1000, createjs.Ease.cubicIn);
    };
    
    this._init(iX,iY);
}