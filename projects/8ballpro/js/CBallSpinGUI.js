function CBallSpinGUI(iX,iY,oParentContainer){
    var _iRadius;
    var _vPos;
    var _oListenerClick;
    
    var _oBg;
    var _oHitArea;
    var _oToken;
    var _oContainer;
    var _oParentContainer = oParentContainer;
    var _pStartPos;
    
    this._init = function(iX,iY){
        _oContainer = new createjs.Container();
        _oContainer.x = iX;
        _oContainer.y = iY;
        _oParentContainer.addChild(_oContainer);
        
        var oSpriteBg = s_oSpriteLibrary.getSprite("ball_spin_gui");
        _oBg = createBitmap(oSpriteBg);
        _oBg.regX = oSpriteBg.width/2;
        _oBg.regY = oSpriteBg.height/2;
        
        _oHitArea = new createjs.Shape();
        _oHitArea.graphics.beginFill("#fff").drawCircle(0, 0, MAX_SPIN_VALUE);
        _oHitArea.alpha = 0.01;
       
        _oListenerClick = _oHitArea.on("click",this._onRelease,this);
        _oContainer.addChild(_oBg, _oHitArea);
        
        var oSpriteToken = s_oSpriteLibrary.getSprite("ball_spin_token");
        _oToken = createBitmap(oSpriteToken);
        _oToken.regX = oSpriteToken.width/2;
        _oToken.regY = oSpriteToken.height/2;
        _oToken.x = 0;
        _oToken.y = 0;
        _oContainer.addChild(_oToken);
 
        _iRadius = oSpriteBg.width/2;
        
        _vPos = new CVector2(iX ,iY);
        
        _pStartPos = {x: _oContainer.x, y: _oContainer.y};
    };
    
    this.unload = function(){
        _oHitArea.off("click",_oListenerClick);
    };
    
    this._onRelease = function(evt){
        if(((s_iPlayerMode === GAME_MODE_CPU) && (s_oGame.getCurTurn() === 2))){
            return;
        }
        
        var pPoint = _oBg.globalToLocal(evt.stageX, evt.stageY);
        if(distance(new CVector2(evt.stageX, evt.stageY),_vPos)<_iRadius){
            _oToken.x = pPoint.x-_iRadius;
            _oToken.y = pPoint.y-_iRadius;
        }
    };
    
    this.resetSpin = function(){
        _oToken.x = 0;
        _oToken.y = 0;
    };
    
    this.setSideSpin = function(fVal){
        _oToken.x = fVal;
    };
    
    this.setBackSpin = function(fVal){
        _oToken.y = fVal;
    };
    
    this.getSideSpin = function() {
        return -_oToken.x;
    };
	
    this.getBackSpin = function() {
        return -_oToken.y;
    };
    
    this.refreshOffsetPos = function(iNewX, iNewY){
        _oContainer.x = _pStartPos.x + iNewX;
        _oContainer.y = _pStartPos.y + iNewY;
        
       _vPos.set(_oContainer.x, _oContainer.y);
    };
    
    
    this._init(iX,iY);
}