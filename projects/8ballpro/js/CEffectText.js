function CEffectText (szText, oParentContainer){
    var _oParentContainer;
    var _oContainer;
    var _oText;
    var _oOutlineText;
    var _pStartPos;
    var _oTween;
    
    this._init = function(szText, oParentContainer){
        
        _oParentContainer = oParentContainer !== undefined ? oParentContainer : s_oStage;
        
        _oContainer = new createjs.Container();
        _oContainer.visible = false;
        _oParentContainer.addChild(_oContainer);
            
        var iWidth = 400;
        var iHeight = 60;
        var iX = 0;
        var iY = 0;
        _oText = new CTLText(_oContainer, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    70, "center", "#fff", FONT_GAME, 1,
                    2, 2,
                    szText,
                    true, true, false,
                    false );
        _oText.setShadow('#000', 1,1, 10);
        _pStartPos = {x: CANVAS_WIDTH + _oText.getBounds().width - s_iOffsetX,
            y: CANVAS_HEIGHT / 2};
        
        
        _oContainer.x = _pStartPos.x;
        _oContainer.y = _pStartPos.y;
        
        _oTween = null;
        this.startAnimation();
        
    };
    
    this.setText = function (szText)
    {
        _oText.refreshText(szText) ;
        _oOutlineText.refreshText(szText);
    };
	
    this.startAnimation = function(oCbCompleted = null, oCbScope)
    {
        if(_oTween  !== null)
        {
            return;
        }
        _oContainer.x = _pStartPos.x;
        _oContainer.y = _pStartPos.y;
        _oContainer.visible = true;
        
        createjs.Tween.get(_oContainer).to({alpha:1}, 500, createjs.Ease.quadIn);  
        
        _oTween = createjs.Tween.get(_oContainer).to({x: CANVAS_WIDTH / 2}, 1000, createjs.Ease.backOut).call(function(){ 
            createjs.Tween.get(_oContainer, {override: true}).wait(500).to({x : 0 - _oText .getBounds().x + s_iOffsetX, alpha:0}, 1000).call(function(){
                 _oTween = null;
                 if(!oCbCompleted){
                     return;
                 }
                 oCbCompleted.call(oCbScope);
             });
        });
       
    };
	
    this.unload = function()
    {
        _oParentContainer.removeChild(_oContainer);
    };
	
    this._init(szText, oParentContainer);
}