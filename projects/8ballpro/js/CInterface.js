function CInterface(oParentContainer){
    var _oParentContainer;
    var _oContainer;
    
    var _pStartPosAudio;
    var _pStartPosExit;
   
    var _pStartPosFullscreen;
   
    var _oButExit;
    var _oAudioToggle;
    var _oButFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    var _oGUIExpandible;
    var _oBallSpinGUI;
    
    this._init = function(oParentContainer){ 
        
        _oParentContainer = oParentContainer;
        _oContainer = new createjs.Container();
        _oParentContainer.addChild(_oContainer);
        
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
	_pStartPosExit = {x:CANVAS_WIDTH - (oSprite.width/2) -10,y:(oSprite.height/2) +10};
        _oButExit = new CGfxButton(_pStartPosExit.x,_pStartPosExit.y,oSprite,_oContainer);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);

        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _pStartPosAudio = {x:_pStartPosExit.x - oSprite.width,y:_pStartPosExit.y};
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive,_oContainer);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
            
            _pStartPosFullscreen = {x: _pStartPosAudio.x - oSprite.width/2,y:_pStartPosAudio.y};
        }else{
            _pStartPosFullscreen = {x:_pStartPosExit.x - oSprite.width,y:_pStartPosExit.y}
        }
        
        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        
        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }
        
        if (_fRequestFullScreen && screenfull.isEnabled){
            oSprite = s_oSpriteLibrary.getSprite('but_fullscreen');
            

            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,_oContainer);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }
        
        var oSprite = s_oSpriteLibrary.getSprite('but_settings');
        _oGUIExpandible = new CGUIExpandible(_pStartPosExit.x, _pStartPosExit.y, oSprite, _oContainer);
        _oGUIExpandible.addButton(_oButExit);
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oGUIExpandible.addButton(_oAudioToggle);
        }
        
        if (_fRequestFullScreen && screenfull.isEnabled){
            _oGUIExpandible.addButton(_oButFullscreen);
        }
        
        _oBallSpinGUI = new CBallSpinGUI(CANVAS_WIDTH/2 -480, CANVAS_HEIGHT -115, _oContainer);
        
	this.refreshButtonPos();		
    };
    
    this.unload = function(){
        _oButExit.unload();
        _oButExit = null;
        _oGUIExpandible.unload();
        _oBallSpinGUI.unload();
        
        if(DISABLE_SOUND_MOBILE === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        if (_fRequestFullScreen && screenfull.isEnabled){
            _oButFullscreen.unload();
        }
        
        _oContainer.removeAllChildren();
	s_oInterface = null;
    };
    
   
    this.refreshButtonPos = function(){
      
        _oGUIExpandible.refreshPos();
        _oBallSpinGUI.refreshOffsetPos(0, -s_iOffsetY*0.5);

    };
    
    this.resetSpin = function(){
        _oBallSpinGUI.resetSpin();
    };
    
    this.getSideSpin = function(){
        return _oBallSpinGUI.getSideSpin();
    };
    
    this.getBackSpin = function(){
        return _oBallSpinGUI.getBackSpin();
    };
    
    this.setSideSpin = function(fVal){
        _oBallSpinGUI.setSideSpin(fVal);
    }
   
    this._onExit = function(){
       s_oGame.onExit();
    };

    this._onAudioToggle = function(){
        Howler.mute(s_bAudioActive);
	s_bAudioActive = !s_bAudioActive;
    };
    
    this.resetFullscreenBut = function(){
	if (_fRequestFullScreen && screenfull.isEnabled){
		_oButFullscreen.setActive(s_bFullscreen);
	}
    };
    
    this._onFullscreenRelease = function(){
        if(s_bFullscreen) { 
		_fCancelFullScreen.call(window.document);
	}else{
		_fRequestFullScreen.call(window.document.documentElement);
	}
	
	sizeHandler();
    };

    s_oInterface = this;
    
    this._init(oParentContainer);
    
    return this;
}

var s_oInterface = null;