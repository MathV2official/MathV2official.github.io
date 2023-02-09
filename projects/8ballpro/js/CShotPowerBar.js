var ON_MOUSE_DOWN_POWER_BAR = 0;
var ON_PRESS_MOVE_POWER_BAR = 1;
var ON_PRESS_UP_POWER_BAR   = 2;

function CShotPowerBar(oParentContainer, iX, iY, oInputContainer = s_oStage){
    
    var _oParentContainer;
    var _oContainer;
    var _oContainerStick;
    var _oPowerBar;
    var _oStick;
    var _pShowPos;
    var _pHidePos;
    var _pMouseDownPos;
    var _oInputArea;
    var _iYStickMaxOffset;
    var _iYStickMinOffset;
    var _bInput;
    
    var _aCbCompleted;
    var _aCbOwner;
    var _aParams;
    var _aListeners;
    var _bShow;
    
    this._init = function(oParentContainer, iX, iY, oInputContainer){  
        _bInput = true;
        
        _oParentContainer = oParentContainer;  
        _oContainer = new createjs.Container();
        _oContainer.x = iX;
        _oContainer.y = iY;
        
        _oParentContainer.addChild(_oContainer);
        
        _bShow = false;
        
        var oSpriteOverPowerBar = s_oSpriteLibrary.getSprite("over_shot_bar");
        
        _oContainerStick = new createjs.Container();
        _oContainer.addChild(_oContainerStick);
        
        var oSpritePowerBar = s_oSpriteLibrary.getSprite("shot_bar");
        _oPowerBar = createBitmap(oSpritePowerBar);
        _oPowerBar.y = -oSpriteOverPowerBar.height +15;
        _oContainerStick.addChild(_oPowerBar);
        
        _oContainerStick.y = _iYStickMinOffset = 15;
        _iYStickMaxOffset = oSpriteOverPowerBar.height - 60; 
       
        var oSpriteStick = s_oSpriteLibrary.getSprite("stick");
        _oStick = createBitmap(oSpriteStick);
        _oStick.x = oSpritePowerBar.width/2;
        _oStick.regX = oSpriteStick.width;
        _oStick.regY = oSpriteStick.height/2;
        _oStick.rotation -= 90;
        _oContainerStick.addChild(_oStick);
            
        var oOverPowerBar = createBitmap(oSpriteOverPowerBar);
        oOverPowerBar.x = -15;
        oOverPowerBar.y = -15;
        _oContainer.addChild(oOverPowerBar);
        
        var oMask = new createjs.Shape();
        oMask.graphics.beginFill("black").drawRoundRect(0,0, oSpriteOverPowerBar.width-30, oSpriteOverPowerBar.height -30, 16);
        
        _oContainerStick.mask = oMask;
        //_oContainer.addChild(oMask);
        _pMouseDownPos = {x: 0, y: 0};
        _pShowPos = {x: iX, y: iY};
        _pHidePos = {x: -oSpriteOverPowerBar.width, y: iY};
        
        _oInputArea = new createjs.Shape();
        _oInputArea.graphics.beginFill("black").drawRect(0,0, oSpritePowerBar.width, oSpritePowerBar.height);
        _oInputArea.x = _oContainer.x;
        _oInputArea.y = _oContainer.y;
        _oInputArea.alpha = 0.01;
        oInputContainer.addChild(_oInputArea);
        
        
        _aCbCompleted = new Array();
        _aCbOwner = new Array();
        _aParams = new Array();
        _aListeners = {};
    };
    
    this.initEventListener = function(){
        _aListeners["mousedown"] = _oInputArea.on("mousedown", this._onPressMouseDown, this);
    };
    
    this._onPressMouseDown = function(e){
        if(!_bInput){
            return;
        }
        
        createjs.Tween.removeTweens(_oContainerStick);
        
        _pMouseDownPos = {x: e.stageX, y: e.stageY};
        
        this.triggerEvent(ON_MOUSE_DOWN_POWER_BAR);
        
        _aListeners["pressmove"] = _oInputArea.on("pressmove", this._onPressMove, this);
        _aListeners["pressup"]   = _oInputArea.on("pressup", this._onPressUp, this);
    };
    
    this._onPressMove = function(e){
        if(!_bInput){
            return;
        }
        
        var iOffsetY = e.stageY - _pMouseDownPos.y;
        
        if(iOffsetY < _iYStickMinOffset){
            iOffsetY = _iYStickMinOffset;
        }else if (iOffsetY > _iYStickMaxOffset){
            iOffsetY = _iYStickMaxOffset;
        }
        _oContainerStick.y = iOffsetY;
        
        _aParams[ON_PRESS_MOVE_POWER_BAR] = this._normalizePowerShot(iOffsetY);
        
        this.triggerEvent(ON_PRESS_MOVE_POWER_BAR);
    };
    
    this._normalizePowerShot = function(iOffsetY){
        return linearFunction(
                                iOffsetY,
                                _iYStickMinOffset, _iYStickMaxOffset,
                                0, MAX_POWER_SHOT
                            );
    };
    
    this._onPressUp = function(){        
        if(!_bInput){
            return;
        }
        
        this.triggerEvent(ON_PRESS_UP_POWER_BAR);
        
        _oInputArea.off("pressmove",  _aListeners["pressmove"]);
        _oInputArea.off("pressup", _aListeners["pressup"]);
    };
    
    this._reset = function(iTimeAnim = 300){
        createjs.Tween.get(_oContainerStick, {override:true}).to({y:_iYStickMinOffset}, iTimeAnim, createjs.Ease.cubicIn);
    };
    
    this.show = function(iTimeAnim = 500){
        this._reset(0);
       
        _bShow = true;
        createjs.Tween.get(_oContainer, {override: true})
                      .to({x: _pShowPos.x, y: _pShowPos.y}, iTimeAnim, createjs.Ease.cubicOut).
                      call(function(){
                           this.setInput(true);
                      },null, this)
                      .on('change', function(){
                          _oInputArea.x = _oContainer.x;
                          _oInputArea.y = _oContainer.y;
                      });;
    };
    
    this.hide = function(iTimeAnim = 500){
        if(!_bShow){
           return;
        }
        
        _bShow = false;
        this.setInput(false);
        createjs.Tween.get(_oContainer, {override: true})
                      .to({x: _pHidePos.x , y: _pHidePos.y}, iTimeAnim, createjs.Ease.cubicIn)
                      .on('change', function(){
                          _oInputArea.x = _oContainer.x;
                          _oInputArea.y = _oContainer.y;
                      });
    };
    
    this.setInput = function(bVal){
        _bInput = bVal;
    };
    
    this.setStickY = function(iNewY){
        _oContainerStick.y = iNewY;
    };
    
    this.triggerEvent = function(iEvent){ 
        if(_aCbCompleted[iEvent]){
            _aCbCompleted[iEvent].call(_aCbOwner[iEvent], _aParams[iEvent]);
        }  
    };
  
    this.addEventListener = function (iEvent, cbCompleted, cbOwner, aParams){
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
        _aParams[iEvent] = aParams;
    };
    
    this._init(oParentContainer, iX, iY, oInputContainer);
};
