function CGameOverPanel(oParentContainer){
    var _aCbCompleted;
    var _aCbOwner;
    var _oListener;
    
    var _oButHome;
    var _oButRestart;
    var _oTextTitle;
    var _oTextScore;
    var _oTextBestScore;
    var _oContainerPanel;
    var _oFade;
    var _oContainer;
    var _oParentContainer = oParentContainer;
    
    this._init = function(){
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        
        _oContainer = new createjs.Container();
        _oContainer.visible=false;
        _oParentContainer.addChild(_oContainer);
        
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        _oFade.alpha = 0;
        _oListener = _oFade.on("mousedown",function(){});
        _oContainer.addChild(_oFade);
        
        _oContainerPanel = new createjs.Container();
        _oContainerPanel.scale = 0.01;
        _oContainerPanel.x = CANVAS_WIDTH/2;
        _oContainerPanel.y = CANVAS_HEIGHT/2;
        _oContainer.addChild(_oContainerPanel);
        
        var oSprite = s_oSpriteLibrary.getSprite("msg_box");
        var oBg = createBitmap(oSprite);
        _oContainerPanel.addChild(oBg);
        
        var iX = 20;
        var iWidth = oSprite.width -300;
        
        _oTextTitle = new CTLText(_oContainerPanel, 
                    iX + oSprite.width/2-iWidth/2, oSprite.height/2-100, iWidth, 80, 
                    80, "center", "#fff", FONT_GAME, 1,
                    0, 0,
                    "",
                    true, true, false,
                    false );
        
        _oTextScore = new CTLText(_oContainerPanel, 
                    iX + oSprite.width/4-iWidth/2, oSprite.height/2 - 110, 800, 100, 
                    40, "center", "#fff", FONT_GAME, 1,
                    0, 0,
                    " ",
                    true, true, true,
                    false );
        
        _oTextBestScore = new CTLText(_oContainerPanel, 
                    iX + oSprite.width/4-iWidth/2, oSprite.height/2, 800, 100, 
                    40, "center", "#fff", FONT_GAME, 1,
                    0, 0,
                    " ",
                    true, true, true,
                    false );
       
        _oButHome = new CGfxButton(oSprite.width/2-250,oSprite.height-100,s_oSpriteLibrary.getSprite("but_home"),_oContainerPanel);
        _oButHome.addEventListener(ON_MOUSE_UP,this._onHome,this);
        
        _oButRestart = new CGfxButton(oSprite.width/2+250,oSprite.height-100,s_oSpriteLibrary.getSprite("but_restart"),_oContainerPanel);
        _oButRestart.addEventListener(ON_MOUSE_UP, this._onRestart,this);
        _oButRestart.pulseAnimation();
        
        _oContainerPanel.regX = oSprite.width/2;
        _oContainerPanel.regY = oSprite.height/2;
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.unload = function(){
        _oFade.off("mousedown",_oListener);
        _oButHome.unload();
        _oButRestart.unload();
    };
    
    this.show = function(szText, iScore){
        _oTextTitle.refreshText(szText);
        
        if(iScore){
            _oTextTitle.setOffsetY(-100);
            _oTextScore.refreshText(TEXT_FINAL_SCORE+"\n"+iScore);
            _oTextBestScore.refreshText(sprintf(TEXT_BEST_SCORE, s_iBestScore)); 
            s_oLocalStorage.saveBestScore(iScore);
            
            $(s_oMain).trigger("share_event", iScore);
            $(s_oMain).trigger("save_score", iScore);
        }
    
        _oContainer.visible = true;
        
        createjs.Tween.get(_oFade).to({alpha:0.7}, 500); 
        createjs.Tween.get(_oContainerPanel).to({scale:1}, 1000,createjs.Ease.elasticOut); 
    };
    
    this._blockButtons = function(){
        _oButHome.block(true);
        _oButRestart.block(true);
    };
    
    this._onRestart = function(){
        this._blockButtons();
        if(_aCbCompleted[ON_RESTART]){
            _aCbCompleted[ON_RESTART].call(_aCbOwner[ON_RESTART]);
        }
    };
    
    this._onHome = function(){
        this._blockButtons();
        if(_aCbCompleted[ON_EXIT_GAME]){
            _aCbCompleted[ON_EXIT_GAME].call(_aCbOwner[ON_EXIT_GAME]);
        }
    };
    
    this._init();
}