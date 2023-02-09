var MS_SHOW_FADE_ANIMATION = 400;
var MS_HIDE_FADE_ANIMATION = 400;
var MS_HAND_LOOP_FADE_ANIMATON = 700;
function CHandBallDrag(oParentContainer){
    
    var _oParentContainer;
    var _oContainer;
    
    var _oHand;
    
    this._init = function(oParentContainer){
        _oParentContainer = oParentContainer;
        _oContainer = new createjs.Container();
        _oParentContainer.addChild(_oContainer);
        
        var oSpriteHand = s_oSpriteLibrary.getSprite("hand_cue_ball");
        _oHand = createBitmap(oSpriteHand);
        _oHand.scaleY = _oHand.scaleX = 0.94;
        _oHand.regX = 22;
        _oHand.regY = 5;
        _oContainer.regX = oSpriteHand.width/2 - 15 - _oHand.regX;
        _oContainer.regY = oSpriteHand.height/2 - 24 - _oHand.regY;
        _oContainer.addChild(_oHand);
        
        createjs.Tween.get(_oHand, {loop: true, bounce:true})
                .to({scaleX: 1, scaleY:1}, MS_HAND_LOOP_FADE_ANIMATON, createjs.Ease.cubicOut);
        
    };
    
    this.setPos = function(iX, iY){
        _oContainer.x = iX;
        _oContainer.y = iY;
    };
    
    this.setAlpha = function(fVal){
        _oContainer.alpha = fVal;
    };
    
    this.setVisible = function(bVal){
        _oContainer.visible = bVal;
    };
    
    this.show = function(){
        this.setVisible(true);
        createjs.Tween.get(_oContainer, {override:true})
                .to({alpha: 1}, MS_SHOW_FADE_ANIMATION, createjs.Ease.cubicOut);
    };
    
    this.hide = function(){
        createjs.Tween.get(_oContainer, {override:true})
                .to({alpha: 0}, MS_HIDE_FADE_ANIMATION, createjs.Ease.cubicOut)
                .call(this.setVisible, false, this);
    };
    
    this.unload = function(){
        createjs.Tween.removeTweens(_oContainer);
        createjs.Tween.removeTweens(_oHand);
        
        _oParentContainer.removeChild(_oContainer);
        
    };
    
    this._init(oParentContainer);
}