function CBall(iType,oParentContainer, oTexture){
    var _bOnTable;
    var _iNumber = iType;
    var _iBallRadius; 		//Ball Radius
    var _vPos;
    var _vTmpForce;
    var _vCurForce; //Ball Current Force
    var _vPrevPos;  //Ball previous position
    var _vEffectForce;
    var _bDrag;
    var _oBallShadow;
    var _oBallHitArea;
    var _iEdgeCollisionCount;
   
    var _fSideEffectForce;
    
    var _oMask;
    var _oInHole;
    var _oSprite;
    var _oContainer;
    var _oParentContainer = oParentContainer;
    var _oBall3D;
    
    var _aCbCompleted;
    var _aCbOwner;
    var _aParams;
    var _aListeners;
    
   this._init = function(oTexture){
        _bOnTable = false;
        _bDrag = false;
        _iEdgeCollisionCount = 0;
	_iBallRadius = BALL_RADIUS-0.5; // Ball Radius;
        _oInHole = null;
        
        _fSideEffectForce = 0;
        
        _oContainer = new createjs.Container();
        _oParentContainer.addChild(_oContainer);
        
        var oSpriteShadow = s_oSpriteLibrary.getSprite("ball_shadow");
        _oBallShadow = createBitmap(oSpriteShadow);
        _oBallShadow.regX = oSpriteShadow.width/2;
        _oBallShadow.regY = oSpriteShadow.height/2;
        _oContainer.addChild(_oBallShadow);
        
        if(DEBUG_SHOW_2D_SPRITE){
            var oData = {   
                            images: [s_oSpriteLibrary.getSprite("balls")], 
                            // width, height & registration point of each sprite
                            frames: {width: BALL_DIAMETER, height: BALL_DIAMETER, regX: BALL_DIAMETER/2, regY: BALL_DIAMETER/2}, 
                            animations: {ball_0:0,ball_1:1,ball_2:2,ball_3:3,ball_4:4,ball_5:5,ball_6:6,ball_7:7,ball_8:8,ball_9:9
                                        ,ball_10:10,ball_11:11,ball_12:12,ball_13:13,ball_14:14,ball_15:15}
                       };

             var oSpriteSheet = new createjs.SpriteSheet(oData);

             _oSprite = createSprite(oSpriteSheet,"ball_"+_iNumber,BALL_DIAMETER/2,BALL_DIAMETER/2,BALL_DIAMETER,BALL_DIAMETER);
             _oContainer.addChild(_oSprite);
        }
         
        _oBall3D  = s_oScenario.create3DBall(
                                                 oTexture,
                                                 BALL_3D_DIAMETER/2, 
                                                 new THREE.Vector3(0, 0, BALL_Z_POSITION)
                                            );

        _vTmpForce = new CVector2(0,0);
        _vCurForce = new CVector2(0,0);
        _vPrevPos = new CVector2(0,0);
        _vPos = new CVector2(0,0);
        _vEffectForce = new CVector2(0, 0);
    };
    
    this.enableEvents = function(){
        _aCbCompleted = new Array();
        _aCbOwner   = new Array();
        _aParams    = new Array();
        _aListeners = new Array();
        
        _oBallHitArea = new createjs.Shape();
        _oBallHitArea.graphics
                     .beginFill("#aaa")
                     .drawRect(
                                -CUE_BALL_HIT_AREA_DIMENSION*0.5,-CUE_BALL_HIT_AREA_DIMENSION*0.5,
                                CUE_BALL_HIT_AREA_DIMENSION, CUE_BALL_HIT_AREA_DIMENSION
                              );

        _oBallHitArea.alpha = 0.009;
        _oContainer.addChild(_oBallHitArea);
    };
    
    this.getObject3D = function(){
        return _oBall3D;
    };
    
    this.render = function(isCpuTurn){
        _oContainer.x = _vPos.getX();
        _oContainer.y = _vPos.getY();
    };
    
    this.setVisible = function(bVisible){
        _oContainer.visible = bVisible;
    };
    
    this.setDragging = function(bDrag){
        _bDrag = bDrag;
        _oBall3D.position.z = bDrag ? BALL_Z_POSITION + 20: BALL_Z_POSITION;
    };
    
    this.setMask = function(iXMask,iYMask){
        _oMask = new createjs.Shape();
        _oMask.graphics.beginFill("rgba(0,0,0,0.01)").drawCircle(iXMask, iYMask, POOL_HOLE_RADIUS);
        _oParentContainer.addChild(_oMask);
        
        _oContainer.mask = _oMask;
    };
    
    this.removeMask = function(){
        if(_oMask){
            _oContainer.mask = null;
        }
    };
        
    this.setPos = function(iX,iY){
        _oContainer.x = iX;
        _oContainer.y = iY;
        _vPos.set(iX,iY);
    };
    
    this.setY = function(iNewY){
        _oContainer.y = iNewY;
        _vPos.set(_oContainer.x,_oContainer.y);
    };
    
    this.setX = function(iNewX){
        _oContainer.x = iNewX;
        _vPos.set(_oContainer.x,_oContainer.y);
    };
    
    this.setPrevPos = function(vNewPos){
        _vPrevPos.setV(vNewPos);
    };
    
    this.setPosV = function(vNewPos){
        _vPos.setV(vNewPos);
    };
    
    this.setScale = function(iScale){
        _oContainer.scale = iScale;
    };
    
    this.addPos = function(vPos){
        _vPos.add(vPos);
    };
    
    this.addForce = function( vForce){
        _vTmpForce.add(vForce);		
    };
    
    this.addCurForce = function(vForce){
        _vCurForce.add(vForce);
    };
    
    this.setCurForce = function(iX,iY){
        _vCurForce.set(iX,iY);
    };

    this.setCurForceV = function(vForce){
        _vCurForce.setV(vForce);
    };
    
    this.setTmpForce = function(iX,iY){
        _vTmpForce.set(iX,iY);
    };
    
    this.normalizeCurForce = function(){
        _vCurForce.normalize();
    };
    
    this.scalarProductTmpForce = function(iValue){
        _vTmpForce.scalarProduct(iValue);
    };
    
    this.scalarProductCurForce = function(iValue){
        _vCurForce.scalarProduct(iValue);
    };
    
    this.setFlagOnTable = function( bVal ){
	_bOnTable = bVal;
    };
        
    this.inHole = function(oValue) {
         _oInHole = oValue;
    };
    
	
    this.getHole = function() {
        return _oInHole;
    };
    
    this.getTmpForce = function(){
        return _vTmpForce;
    };
    
    this.getCurForce = function(){
        return _vCurForce;
    };
    
    this.getCurForceLen = function(){
        return _vCurForce.length();
    };
    
    this.getCurForceLenght2 = function(){
        return _vCurForce.length2();
    };
    
    this.getX = function(){
        return _vPos.getX();
    };
    
    this.getY = function(){
        return _vPos.getY();
    };
    
    this.getPos = function(){
        return _vPos;
    };
    
    this.getPrevPos = function(){
        return _vPrevPos;
    };
    
    this.getNumber = function(){
        return _iNumber;
    };
    
    this.isBallOnTable = function(){
        return _bOnTable;
    };
    
    this.isDragging = function(){
        return _bDrag;
    };
    
    this.getEffectForceVector = function(){
        return _vEffectForce;
    };
    
    this.setEffectForceX = function(iX){
        _vEffectForce.set(iX, _vEffectForce.getY());
    };
    
    this.setEffectForceY = function(iY){
        _vEffectForce.set(_vEffectForce.getX(), iY);
    };
    
    this.reset3DObjectTransformation = function(){
        this.setOpacityMaterial3D(1);
        _oBall3D.scale.x = _oBall3D.scale.y = _oBall3D.scale.z = 1;
        var vColor = new THREE.Color( 1, 1, 1 );
        _oBall3D.material.color = vColor;
    };
    
    this.setOpacityMaterial3D = function(fVal){
        var oMaterial =  _oBall3D.material;
        oMaterial.transparent = true;
        if(fVal > 0.99){
            fVal = 1;
            oMaterial.transparent = false;
        }
        oMaterial.opacity = fVal;
    };
    
    this.fadeAnimInHole = function(iTime){
        var oMaterial =  _oBall3D.material;
        oMaterial.transparent = true;
        _oBallShadow.visible = false;
       
        createjs.Tween.get(oMaterial, {override: true}).to({opacity: 0}, iTime, createjs.Ease.sineOut);
        
        var vScale = _oBall3D.scale;
        createjs.Tween.get(vScale).to({x:0.1, y: 0.1, z: 0.1}, iTime, createjs.Ease.sineOut)
                .call(function(){
                    this.setCurForce(0,0);
                    this.setPos( POS_RAIL_EXIT.x, POS_RAIL_EXIT.y );
                },null,this);
        
         var vColor = oMaterial.color;
        createjs.Tween.get(vColor).to({r:0, g: 0, b: 0}, iTime*0.5, createjs.Ease.sineOut);
    };
    
    this.getSideEffect = function(){
        return _fSideEffectForce;
    };
    
    this.setSideEffect = function(fVal){
        _fSideEffectForce = fVal;
    };
    
    this.resetEdgeCollisionCount = function (){
        _iEdgeCollisionCount = 0;
    };
    
    this.increaseEdgeCollisionCount = function(){
        _iEdgeCollisionCount++;
    };
    
    this.getEdgeCollisionCount = function(){
        return _iEdgeCollisionCount;
    };
    
    this._updateShadow = function(){
        if(!_oBallShadow.visible){
            return;
        }
        
        var vDirCenter = new CVector2(TABLE_CENTER_COORDINATE.getX(), TABLE_CENTER_COORDINATE.getY());
        vDirCenter.subtract(_vPos);
        
        var fFactor = -0.03;
        
        _oBallShadow.x = vDirCenter.getX() * fFactor;
        _oBallShadow.y = vDirCenter.getY() * fFactor;
        
        var fFade = linearFunction(
                                    vDirCenter.length(),
                                    770, 0,
                                    0, 1
                                  );
        _oBallShadow.alpha = fFade;
        
        vDirCenter = null;
    };
    
    this.triggerEvent = function(oEvt, szEvt){

        if(!_aCbCompleted){
            return;
        }
        
        if(_aCbCompleted[szEvt]){
            _aCbCompleted[szEvt].call(_aCbOwner[szEvt], oEvt, _aParams[szEvt]);
        } 
    };
  
    this.addEventListener = function (szEvt, cbCompleted, cbOwner, aParams){
        
        if(!_aCbCompleted){
            return;
        }
       
        _aCbCompleted[szEvt] = cbCompleted;
        _aCbOwner[szEvt] = cbOwner;
        _aParams[szEvt] = aParams;
        _aListeners[szEvt] = _oBallHitArea.on(szEvt, this.triggerEvent, this, false, szEvt);
    
    };
    
    this.removeEventListener = function(szEvt){
      
        _aCbCompleted[szEvt] = null;
        _aCbOwner[szEvt] = null;
        _aParams[szEvt] = null;
        _oBallHitArea.off(szEvt, _aListeners[szEvt]);
        _aListeners [szEvt] = null;
    };
    
    this._init(oTexture);
}