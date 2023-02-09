function CButLang(iX,iY,iNumLang,iCurLang,oSpriteLang,oParentContainer){
    
    var _iCurLang = iCurLang;
    var _iNumLang = iNumLang;
    var _aCbCompleted;
    var _aCbOwner;
    var _oListenerClick;
    var _oListenerPress;
    
    var _oButLang;
    var _oContainer;
    var _oParentContainer = oParentContainer;
    
    this._init = function(iX,iY,iNumLang,oSpriteLang){
        
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        
        _oContainer = new createjs.Container();
        _oContainer.x = iX;
        _oContainer.y = iY;
        _oListenerPress = _oContainer.on("mousedown",this._onPress,this);
        _oListenerClick = _oContainer.on("click",this._onChangeLang,this);
        _oParentContainer.addChild(_oContainer);
        
        
        var oAnims = {};
        for(var k=0;k<iNumLang;k++){
            oAnims["lang_"+k] = k;
        }
       
        var oData = {   
                        images: [oSpriteLang], 
                        // width, height & registration point of each sprite
                        frames: {width: oSpriteLang.width/iNumLang, height: oSpriteLang.height}, 
                        animations: oAnims
                   };
                   
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _oButLang = createSprite(oSpriteSheet,"lang_"+_iCurLang,0,0,oSpriteLang.width/iNumLang,oSpriteLang.height);
        _oContainer.addChild(_oButLang);
        
        _oContainer.regX = (oSpriteLang.width/iNumLang)/2;
        _oContainer.regY = oSpriteLang.height/2;
    };
    
    this.unload = function(){
        _oContainer.off("mousedown",_oListenerPress);
        _oContainer.off("click",_oListenerClick);
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.setPosition = function(iXPos,iYPos){
         _oContainer.x = iXPos;
         _oContainer.y = iYPos;
    };
    
    this._onPress = function(){
        _oContainer.scale = 0.9;
    };
    
    this._onChangeLang = function(){
        _oContainer.scale = 1;
        _iCurLang++;
        if(_iCurLang === _iNumLang){
            _iCurLang = 0;
        }
        
        _oButLang.gotoAndStop("lang_"+_iCurLang);
        
         if(_aCbCompleted[ON_SELECT_LANG]){
            _aCbCompleted[ON_SELECT_LANG].call(_aCbOwner[ON_SELECT_LANG],_iCurLang);
        }
    };
    
    this.getButtonImage = function () {
        return _oContainer;
    };
    
    this._init(iX,iY,iNumLang,oSpriteLang);
}