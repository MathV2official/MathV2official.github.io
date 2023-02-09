function CStick(oParentContainer){
    
    var _oContainer;
    var _oParentContainer = oParentContainer;
    
    this._init = function(){
        _oContainer = new createjs.Container();
        //_oContainer.visible = false;
        _oParentContainer.addChild(_oContainer);
        
        var oStick = createBitmap(s_oSpriteLibrary.getSprite("stick"));
        _oContainer.addChild(oStick);
        
        _oContainer.regX = _oContainer.getBounds().width+BALL_RADIUS;
        _oContainer.regY = _oContainer.getBounds().height/2;
        
        _oContainer.rotation = 0;
    };
    
    this.setVisible = function(bVisible){

        _oContainer.visible = bVisible;
    };
    
    this.setPos = function(iX,iY){
        _oContainer.x = iX;
        _oContainer.y = iY;
    };
    
    this.getRotation = function (){
       return  _oContainer.rotation;
    };
    
    this.setRotation = function(iAngle){
        _oContainer.rotation = iAngle;
    };
    
    this.getX = function(){
        return _oContainer.x;
    };
    
    this.getY = function(){
        return _oContainer.y;
    };
    
    this._init();
}