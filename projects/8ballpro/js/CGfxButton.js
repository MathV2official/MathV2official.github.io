function CGfxButton(iXPos, iYPos, oSprite, oParentContainer) {
    var _aCbCompleted;
    var _aCbOwner;
    var _oButton;
    var _aParams;
    var _fScaleX;
    var _fScaleY;
    var _oParent;
    var _oTween;
    var _oListenerMouseDown;
    var _oListenerMouseUp;
    var _bBlock;

    var _oParentContainer;

    this._init = function (iXPos, iYPos, oSprite) {

        _aCbCompleted = new Array();
        _aCbOwner = new Array();
        _aParams = new Array();

        _oButton = createBitmap(oSprite);
        _oButton.x = iXPos;
        _oButton.y = iYPos;
        _oButton.regX = oSprite.width / 2;
        _oButton.regY = oSprite.height / 2;

        _fScaleX = 1;
        _fScaleY = 1;

        _bBlock = false;
       
        if (!s_bMobile)
            _oButton.cursor = "pointer";

        _oParentContainer.addChild(_oButton);

        this._initListener();
    };

    this.unload = function () {
        _oButton.off("mousedown", _oListenerMouseDown);
        _oButton.off("pressup", _oListenerMouseUp);
        this.removeAllTweens();
        _oParentContainer.removeChild(_oButton);
    };

    this.setVisible = function (bVisible) {
        _oButton.visible = bVisible;
    };

    this.setCursorType = function (szValue) {
        _oButton.cursor = szValue;
    };

    this._initListener = function () {
        _oListenerMouseDown = _oButton.on("mousedown", this.buttonDown);
        _oListenerMouseUp = _oButton.on("pressup", this.buttonRelease);
    };

    this.addEventListener = function (iEvent, cbCompleted, cbOwner) {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
    };

    this.addEventListenerWithParams = function (iEvent, cbCompleted, cbOwner, aParams) {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
        _aParams[iEvent] = aParams;
    };

    this.buttonRelease = function () {
        if (_bBlock) {
            return;
        }
       
        if (_fScaleX > 0) {
            _oButton.scaleX = _fScaleX;
        } else {
            _oButton.scaleX = -_fScaleX;
        }
        _oButton.scaleY = _fScaleY;

        playSound("click",1,false);

        if (_aCbCompleted[ON_MOUSE_UP]) {
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP], _aParams[ON_MOUSE_UP]);
        }
    };

    this.buttonDown = function () {
        if (_bBlock) {
            return;
        }
        
        if (_fScaleX > 0) {
            _oButton.scaleX = _fScaleX*0.9;
        } else {
            _oButton.scaleX = -_fScaleX*0.9;
        }
        _oButton.scaleY = _fScaleY*0.9;

        if (_aCbCompleted[ON_MOUSE_DOWN]) {
            _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN], _aParams[ON_MOUSE_DOWN]);
        } 
    };

    this.rotation = function (iRotation) {
        _oButton.rotation = iRotation;
    };

    this.getButton = function () {
        return _oButton;
    };

    this.setPosition = function (iXPos, iYPos) {
        _oButton.x = iXPos;
        _oButton.y = iYPos;
    };

    this.setX = function (iXPos) {
        _oButton.x = iXPos;
    };

    this.setY = function (iYPos) {
        _oButton.y = iYPos;
    };

    this.getButtonImage = function () {
        return _oButton;
    };
    
    this.getX = function(){
        return _oButton.x;
    };
    
    this.getY = function(){
        return _oButton.y;
    };

    this.block = function (bVal) {
        
        _bBlock = bVal;
        _oButton.scaleX = _fScaleX;
        _oButton.scaleY = _fScaleY;

    };

    this.setScaleX = function (fValue) {
        _oButton.scaleX = fValue;
        _fScaleX = fValue;
    };
    
    this.setScale = function(iScale){
        _fScaleX = iScale;
        _fScaleY = iScale;
         _oButton.scaleX = _oButton.scaleY = iScale;
    };
    
    this.setRotation = function(fVal){
        _oButton.rotation = fVal;
    };
    
    this.getX = function () {
        return _oButton.x;
    };

    this.getY = function () {
        return _oButton.y;
    };
    
    this.setRegPoints = function(pReg){
        _oButton.regX  = pReg.regX;
        _oButton.regY = pReg.regY;
    };

    this.pulseAnimation = function () {
        _oTween = createjs.Tween.get(_oButton, {loop:-1, override: true}).to({scaleX: _fScaleX * 0.9, scaleY: _fScaleY * 0.9}, 850, createjs.Ease.quadOut).to({scaleX: _fScaleX, scaleY: _fScaleY}, 650, createjs.Ease.quadIn);
    };

    this.trebleAnimation = function () {
        _oTween = createjs.Tween.get(_oButton, {loop:-1}).to({rotation: 5}, 75, createjs.Ease.quadOut).to({rotation: -5}, 140, createjs.Ease.quadIn).to({rotation: 0}, 75, createjs.Ease.quadIn).wait(750);
    };
    
    this.getGraphic = function (){
        return _oButton;
    };

    this.removeAllTweens = function () {
        createjs.Tween.removeTweens(_oButton);
    };

    if (oParentContainer !== undefined) {

        _oParentContainer = oParentContainer;
    } else {
        _oParentContainer = s_oStage;
    }

    this._init(iXPos, iYPos, oSprite);

    _oParent = this;

    return this;
}