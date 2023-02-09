function CCreditsPanel(){
    var _oListener;
    var _oBg;
    var _oButLogo;
    var _oButExit;
    var _oMsgText;
    
    var _oHitArea;
    
    var _oLink;
    
    var _pStartPosExit;
    
    var _oContainer;
    
    this._init = function(){
        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);
        
       var oFade = new createjs.Shape();
        oFade.graphics.beginFill("rgba(0,0,0,0.7)").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT); 
        _oContainer.addChild(oFade);
        
        var oSpriteBg = s_oSpriteLibrary.getSprite('msg_box');
        _oBg = createBitmap(oSpriteBg);
        _oBg.regX = oSpriteBg.width/2;
        _oBg.regY = oSpriteBg.height/2;
        _oBg.x = CANVAS_WIDTH/2;
        _oBg.y = CANVAS_HEIGHT/2;
        _oContainer.addChild(_oBg);
        
        _oHitArea = new createjs.Shape();
        _oHitArea.graphics.beginFill("#0f0f0f").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oHitArea.alpha = 0.01;
        _oListener = _oHitArea.on("click", this._onLogoButRelease);
        _oContainer.addChild(_oHitArea);
                
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: _oBg.x + oSpriteBg.width/2 - oSprite.width/2 - 20, y: _oBg.y - oSpriteBg.height/2 + oSprite.height/2 + 34};  
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, _oContainer);
        _oButExit.addEventListener(ON_MOUSE_UP, this.unload, this);
       
        _oMsgText = new createjs.Text(TEXT_CREDITS_DEVELOPED, "28px " + FONT_GAME, "#fff");
        _oMsgText.textAlign = "center";
        _oMsgText.textBaseline = "alphabetic";
	_oMsgText.x = CANVAS_WIDTH/2;
        _oMsgText.y = 475;
	_oContainer.addChild(_oMsgText);
	
        var oRect = _oMsgText.getBounds();
        _oMsgText.cache(oRect.x, oRect.y, oRect.width, oRect.height);
        
        oSprite = s_oSpriteLibrary.getSprite('logo_ctl');
        _oButLogo = createBitmap(oSprite);
        _oButLogo.regX = oSprite.width/2;
        _oButLogo.regY = oSprite.height/2;
        _oButLogo.x = CANVAS_WIDTH/2;
        _oButLogo.y = CANVAS_HEIGHT/2;
        _oContainer.addChild(_oButLogo);
        
        _oLink = new createjs.Text("www.codethislab.com", "28px " + FONT_GAME, "#fff");
        _oLink.textAlign = "center";
        _oLink.textBaseline = "alphabetic";
	_oLink.x = CANVAS_WIDTH/2;
        _oLink.y = 620;
        _oContainer.addChild(_oLink);
        
        var oRect = _oLink.getBounds();
        _oLink.cache(oRect.x, oRect.y, oRect.width, oRect.height);
    };
    
    this.unload = function(){
        _oHitArea.off("click", _oListener);
        
        _oButExit.unload(); 
        _oButExit = null;

        s_oStage.removeChild(_oContainer);
    };
    
    this._onLogoButRelease = function(){
        //window.open("http://www.codethislab.com/index.php?&l=en","_blank");
    };
    
    this._init();
    
    
};


