function CGUIExpandible(iX, iY, oSprite, oParentContainer){
    const OFFSET_Y = 135;
    
    var _bExpanded;
    
    var _aButtons;
    
    var _oParent;
    var _oMenuBut;
    var _oGUIContainer;
    var _oBackContainer;
    var _oFrontContainer;
    var _oExpandedPos;
    
    var _pStartPos;
    
    this._init = function(iX, iY, oSprite, oParentContainer){
        
        _aButtons = new Array();
        
        _pStartPos = {x: iX, y: iY};
        _oGUIContainer = new createjs.Container();
        _oGUIContainer.x = iX;
        _oGUIContainer.y = iY;
        oParentContainer.addChild(_oGUIContainer);
        
        _oBackContainer = new createjs.Container();
        _oGUIContainer.addChild(_oBackContainer);
        
        _oFrontContainer = new createjs.Container();
        _oGUIContainer.addChild(_oFrontContainer);
        
        _bExpanded = false;
        _oMenuBut = new CGfxButton(0,0,oSprite, _oFrontContainer);
        _oMenuBut.addEventListener(ON_MOUSE_UP, this._onMenu, this);
        
        var oStart = {x: 0, y: OFFSET_Y};
        _oExpandedPos = {start: oStart, offset: OFFSET_Y};
        
    };
    
    this.unload = function(){
        _oMenuBut.unload();
        oParentContainer.removeChild(_oGUIContainer);
    };
    
    this.refreshPos = function(){
        ////REMOVE ALL BUTTONS FROM REFRESH FUNCTIONS IN INTERFACE OR IN OTHER MENUES
        
        _oGUIContainer.x = iX - s_iOffsetX;
        _oGUIContainer.y = iY + s_iOffsetY;
    };
    
    this.addButton = function(oObjClass){
        var oButton = oObjClass.getButtonImage();
        
        oButton.x = 0;
        oButton.y = 0;
        oButton.visible = 0;
        _oBackContainer.addChildAt(oButton, 0);
        
        
        
        _aButtons.push(oButton);
        
    };
    
    this._onMenu = function(){
        _bExpanded = !_bExpanded;
        
        if(_bExpanded){
            _oParent._expand();
        }else{
            _oParent._collapse();
        }
    };
    
    this._expand = function(){
        
        var iTime = 300;
        for(var i=0; i<_aButtons.length; i++){
            _aButtons[i].visible = true;
            createjs.Tween.get(_aButtons[i], {override:true}).wait(i*iTime/2).to({y: _oExpandedPos.start.y + i*_oExpandedPos.offset}, iTime, createjs.Ease.cubicOut);
        };
    };
    
    this._collapse = function(){
        
        var iTime = 300;
        for(var i=0; i<_aButtons.length; i++){
            var oButton = _aButtons[_aButtons.length-1-i];
            createjs.Tween.get(oButton, {override:true}).wait(i*iTime/2).to({y: 0}, iTime, createjs.Ease.cubicOut).call(function(oButton){
                oButton.visible = false;
                //s_oMain.startUpdateNoBlock();
            }, [oButton]);
        };
    };
    
    _oParent = this;
    this._init(iX, iY, oSprite, oParentContainer);
}


