function CAreYouSurePanel(oConfirmFunction, oNegateFunction, oParentContainer = s_oStage) {
    
    var _oParentContainer;
    var _oTitle;
    var _oButYes;
    var _oButNo;
    var _oPanelContainer;
    var _oParent;
    var _oFade;
    
    var _pStartPanelPos;
    var _oListenerPanel;

    this._init = function (oConfirmFunction, oNegateFunction, oParentContainer) {
        _oParentContainer = oParentContainer;
        
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill('rgba(0, 0, 0, 0.4')
                      .drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.on('mousedown', function(){});
        _oParentContainer.addChild(_oFade);
        
        _oPanelContainer = new createjs.Container();        
        _oParentContainer.addChild(_oPanelContainer);
        
        var oSprite = s_oSpriteLibrary.getSprite('msg_box');
        var oPanel = createBitmap(oSprite);        
        oPanel.regX = oSprite.width/2;
        oPanel.regY = oSprite.height/2;
        _oPanelContainer.addChild(oPanel);
        
        _oPanelContainer.x = CANVAS_WIDTH/2;
        _oPanelContainer.y = CANVAS_HEIGHT/2;  
        
        var iX = 40;
        var iY = -100;
        var iWidth = oSprite.width - 200;
        var iHeight = oSprite.height - 200;
        
        _oTitle = new CTLText(_oPanelContainer, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    90, "center", PRIMARY_FONT_COLOR, FONT_GAME, 1.1,
                    0, 0,
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac purus sit amet eros vulputate semper iaculis ut est.",
                    true, true, true,
                    false );
        
        _oButYes = new CGfxButton(150, 80, s_oSpriteLibrary.getSprite('but_yes'), _oPanelContainer);
        _oButYes.addEventListener(ON_MOUSE_UP, this._onButYes, this);

        _oButNo = new CGfxButton(-150, 80, s_oSpriteLibrary.getSprite('but_no'), _oPanelContainer);
        _oButNo.addEventListener(ON_MOUSE_UP, this._onButNo, this);
        _oButNo.pulseAnimation();
    };

    this._onButYes = function () {

        _oParent.unload();
        if(oConfirmFunction){
            oConfirmFunction();
        }
    };

    this._onButNo = function () {
        
        _oParent.unload();
        if(oNegateFunction){
            oNegateFunction();
        }
    };

    this.changeMessage = function(szText, iY){
        _oTitle.refreshText(szText);
        _oTitle.setY(iY);
    };

    this.setOneButton = function(){
        _oButNo.setVisible(false);
        _oButYes.setPosition(0, 140);
        _oButYes.pulseAnimation();
    };

    this.unload = function () {
        _oButNo.unload();
        _oButYes.unload();
        
        _oFade.removeAllEventListeners();
        
        _oParentContainer.removeChild(_oPanelContainer);
        _oParentContainer.removeChild(_oFade);
        
        _oPanelContainer.removeAllEventListeners();
    };

    _oParent = this;
    this._init(oConfirmFunction, oNegateFunction, oParentContainer);
}

