var ON_PRESS_DOWN_BUT_ARROW_LEFT = 0;
var ON_PRESS_UP_BUT_ARROW_LEFT = 1;
var ON_PRESS_DOWN_BUT_ARROW_RIGHT = 2;
var ON_PRESS_UP_BUT_ARROW_RIGHT = 3;

function CInputController(oParentContainer){
    var _oParent;
    var _oParentContainer;
    
    var _iYStartContainerDown;
    var _oContainerDownButton;
    var _oButArrowLeft;
    var _oButArrowRight;
    
    var _bInput;
    
    var _aKeyDown;
    var _aCbCompleted;
    var _aCbOwner;
    var _aParams;

    this._init = function(oParentContainer){
        _bInput = true;

        _aKeyDown = new Array();
        _aCbCompleted = new Array();
        _aCbOwner = new Array();
        _aParams = new Array();
        
        _oParentContainer = oParentContainer;
        
        _oContainerDownButton = new createjs.Container();
        _oParentContainer.addChild(_oContainerDownButton);
        
        if (!s_bMobile ) {
            document.onkeydown = onKeyDown;
            document.onkeyup = onKeyUp;
        }else{
            var oSpriteButArrowLeft = s_oSpriteLibrary.getSprite('but_arrow_left');
            _oButArrowLeft = new CGfxButton(1280 , 0, oSpriteButArrowLeft, _oContainerDownButton);
            _oButArrowLeft.addEventListenerWithParams(ON_MOUSE_DOWN, this.triggerEvent, this, ON_PRESS_DOWN_BUT_ARROW_LEFT);
            _oButArrowLeft.addEventListenerWithParams(ON_MOUSE_UP, this.triggerEvent, this, ON_PRESS_UP_BUT_ARROW_LEFT);

            var oSpriteButArrowRight = s_oSpriteLibrary.getSprite('but_arrow_right');
            _oButArrowRight = new CGfxButton(1480, 0, oSpriteButArrowRight, _oContainerDownButton);
            _oButArrowRight.addEventListenerWithParams(ON_MOUSE_DOWN, this.triggerEvent, this, ON_PRESS_DOWN_BUT_ARROW_RIGHT);
            _oButArrowRight.addEventListenerWithParams(ON_MOUSE_UP, this.triggerEvent, this, ON_PRESS_UP_BUT_ARROW_RIGHT);
        }
        
        _iYStartContainerDown = _oContainerDownButton.y = CANVAS_HEIGHT -115;

//        _oTapAction = new createjs.Shape();
//        _oTapAction.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
//        _oTapAction.alpha = 0.01;
//        _oParentContainer.addChild(_oTapAction);
//        _oTapAction.on("click", this._onClick, this, false, ON_PRESS_DOWN_ACTION);
        
    };
    
    this.setInput = function(bInput){
        _bInput = bInput;
    };
    
    this._onClick = function(evt, iEvent){
         if (!_bInput ){ 
            return;
        }
        this.triggerEvent(evt, iEvent);
    };
    
    function onKeyDown (evt){
        if (!evt) 
        {
            evt = window.event;
        }
        evt.preventDefault();
    
        if (!_bInput || _aKeyDown[evt.keyCode]){ 
            return;
        }
        
        var iEvent = null;
        switch (evt.keyCode) 
         {
            case 37:
                iEvent = ON_PRESS_DOWN_BUT_ARROW_RIGHT;
                break;
            case 39:
                iEvent = ON_PRESS_DOWN_BUT_ARROW_LEFT;
                break;
        }
        _aKeyDown[evt.keyCode] = true;
        _oParent.triggerEvent(iEvent);
    }
    
    function onKeyUp (evt){
        if (!evt) 
        {
            evt = window.event;
        }
        evt.preventDefault();
        
        var iEvent = null;
        switch (evt.keyCode) 
        {
            case 37:
                iEvent = ON_PRESS_UP_BUT_ARROW_RIGHT;
                break;
            case 39:
                iEvent = ON_PRESS_UP_BUT_ARROW_LEFT;
                break;
        }
        
        _aKeyDown[evt.keyCode] = false;
        _oParent.triggerEvent(iEvent);
    };
   
   this.refreshOffsetPos = function(){
       _oContainerDownButton.y = _iYStartContainerDown - s_iOffsetY * 0.5;
   };
   
    this.unload = function(){
        if (!s_bMobile ) {
            document.onkeydown = null;
            document.onkeyup = null;
        }
        
        _oButArrowLeft.unload();
        _oButArrowRight.unload();
    };

    this.triggerEvent = function( iEvent){
       
        if(_aCbCompleted[iEvent])
        {
            _aCbCompleted[iEvent].call(_aCbOwner[iEvent], _aParams[iEvent]);
        }
        
    };
  
    this.addEventListener = function (iEvent, cbCompleted, cbOwner, aParams){
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
        _aParams[iEvent] = aParams;
    };
    
    _oParent = this;
    this._init(oParentContainer);
    
}
