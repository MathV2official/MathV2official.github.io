var INTERACTIVE_ALPHA_FADE = 0.01;
var ON_END_TUTORIAL = 0;

var TUTORIAL_MOVE_STICK_BUTTONS = 0;
var TUTORIAL_SHOT_DESKTOP = 1;
var TUTORIAL_RESPOT_CUE = 2;
var TUTORIAL_CUE_EFFECT = 3;
var TUTORIAL_SHOT_MOBILE = 4;
var TUTORIAL_MOVE_STICK_MOBILE = 5;

function CInteractiveHelp(oParentContainer){
    var _oParentContainer;
    var _oContainer;
    var _oContainerTutorial;
    var _oContainerSkip;
    var _oContainerContinue;
    var _oFade;
    var _bInExe;
    var _iTutorial;
    
    var _oButSkip;
    var _oButContinue;
    var _pStartPosContainerSkip;
    var _pStartPosContainerContinue;
    
    var _aInteractiveHelp;
    var _aQueue;
    var _aCbCompleted;
    var _aCbOwner;
    var _aParams;
    
    this._init = function(oParentContainer){
        _oParentContainer = oParentContainer;
        _oContainer = new createjs.Container();
        _oParentContainer.addChild(_oContainer);
        
        _oContainerTutorial = new createjs.Container();
        _oContainer.addChild(_oContainerTutorial);
        
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        _oFade.alpha = INTERACTIVE_ALPHA_FADE;
        _oContainer.addChild(_oFade);
        _oContainer.alpha = 0.0;
        
        _oContainerSkip = new createjs.Container();
        _oContainer.addChild(_oContainerSkip);        
        
        var oSpriteSkip = s_oSpriteLibrary.getSprite("but_next");
        _pStartPosContainerSkip = {x: CANVAS_WIDTH - oSpriteSkip.width/2 - 10, y: oSpriteSkip.height/2+10};
        var pStartPosButSkip = {x: 0, y: 0};
        _oButSkip = new CGfxButton(
                                    pStartPosButSkip.x,
                                    pStartPosButSkip.y,
                                    oSpriteSkip,
                                    _oContainerSkip
                                   );
        
        _oButSkip.addEventListener(ON_MOUSE_UP, this._onPressUpButSkip, this);
        
        _oContainerContinue = new createjs.Container();
        _oContainer.addChild(_oContainerContinue);       
        
        var oSprtieContinue = s_oSpriteLibrary.getSprite("but_continue");
        _pStartPosContainerContinue = {x: CANVAS_WIDTH - oSpriteSkip.width/2 - 10, y: CANVAS_HEIGHT - oSpriteSkip.height/2-10};
        var pStartPosButSkip = {x: 0, y: 0};
        _oButContinue = new CGfxButton(
                                    pStartPosButSkip.x,
                                    pStartPosButSkip.y,
                                    oSprtieContinue,
                                    _oContainerContinue
                                   );
        
        var iWidth = 240;
        
        new CTLText(_oContainerSkip, 
                    -oSpriteSkip.width - 220, -50, iWidth, 80, 
                    60, "right", "#fff", FONT_GAME, 1.1,
                    0, 0,
                    TEXT_INTERACTIVE_HELP_SKIP_TUTORIAL,
                    true, true, false,
                    false );
        
        _aInteractiveHelp = new Array();
        
        _aInteractiveHelp[TUTORIAL_MOVE_STICK_BUTTONS] = {
                                                    toExecute: true,
                                                    cb:this._tutorialMoveStick
                                                };
        _aInteractiveHelp[TUTORIAL_SHOT_DESKTOP] = {
                                                toExecute: true,
                                                cb:this._tutorialShotWithStickDesktop
                                            };
                                        
        _aInteractiveHelp[TUTORIAL_RESPOT_CUE] = {
                                                    toExecute: true,
                                                    cb:this._tutorialRespotCue
                                                };
        _aInteractiveHelp[TUTORIAL_CUE_EFFECT] = {
                                                    toExecute: true,
                                                    cb:this._tutorialCueEffect
                                                };
        _aInteractiveHelp[TUTORIAL_SHOT_MOBILE] = {
                                                    toExecute: true,
                                                    cb: this._tutorialShotWithStickMobile
                                                };
        _aInteractiveHelp[TUTORIAL_MOVE_STICK_MOBILE] = {
                                                            toExecute: true,
                                                            cb: this._tutorialMoveStickMobile
                                                        };
        
        _bInExe = false;
        
        _aQueue = new Array();
        _aCbCompleted = new Array();
        _aCbOwner = new Array();
        _aParams = new Array();
    };
    
    this.startTutorial = function(oInfo){
        var iTutorial = oInfo.tutorial;
      
        if(!_aInteractiveHelp[iTutorial].toExecute){
            return;
        }
     
        if(_bInExe){
            _aQueue.push({info: oInfo.info, tutorial: iTutorial});
            return;
        }
       
        var fAlpha = INTERACTIVE_ALPHA_FADE;
        var oFuncToCall = _aInteractiveHelp[iTutorial].cb;
        _oContainerTutorial.alpha = 1;
        _oContainer.alpha = 0;
        var oTween = createjs.Tween.get(_oContainer, {override: true}); 
        oTween.to({alpha:1}, 500, createjs.Ease.cubicOut)
                .call(function(){
                    var oCbInfo = oInfo.info.on_show_tutorial;
                    if(oCbInfo === undefined){
                        return;
                    }
                    oCbInfo.cb.call(oCbInfo.scope, oCbInfo.param);
                });
        
        createjs.Tween.get(_oFade, {override:true})
                .to({alpha: fAlpha}, 500, createjs.Ease.cubicIn);
        var oOnEnd = {
                cb: oFuncToCall,
                scope: this,
                param: oInfo.info
            };
   
        _iTutorial = iTutorial;
        _aInteractiveHelp[iTutorial].toExexute = false;
        _bInExe = true;
        if(oInfo.info.movement){
            oInfo.info.item.animMovement(oInfo.info.pos, oOnEnd, oInfo.info.cb_movement);
        }else{
            oOnEnd.cb.call(oOnEnd.scope, oOnEnd.param);
        }
    };
    
    this._tutorialShotWithStickMobile = function(oInfo){
        var oShotPowerBar = oInfo.param;
       
        var oSpriteHelp = s_oSpriteLibrary.getSprite("bg_interactive_help_3");
        
        var oBgHelp = createBitmap(oSpriteHelp);
        _oContainerTutorial.addChild(oBgHelp);
        _oFade.removeAllEventListeners();   
        
        var iWidthText =  700 ;
        var iHeightText = 150 ;
        //var iXOffset = iWidthText*0.5;
        
        var oContainerText = new createjs.Container();
        _oContainerTutorial.addChild(oContainerText);
        oContainerText.x = 691;
        oContainerText.y = 500;
        
        var pPosText = {x: 0, y: 0};
        
        var szText = TEXT_INTERACTIVE_STICK_SHOT_MOBILE;
        
        new CTLText(oContainerText, 
                    pPosText.x-iWidthText/2, pPosText.y-iHeightText/2, iWidthText, iHeightText, 
                    40, "center", "#fff", FONT_GAME, 1.1,
                    0, 0,
                    szText,
                    true, true, true,
                    false );
        
        var oHand = this.createHand();
        oHand.gotoAndStop("idle");
        oHand.x = 240;
        oHand.y = 370;
        oHand.rotation = 135;
//        oHand.scaleX = oHand.scaleY = 0.6;
        _oContainerTutorial.addChild(oHand);
        
        var oResetAnimation = function(){
            createjs.Tween.get(oHand).to({y:370}, 500, createjs.Ease.cubicIn);
        };
        
        var oHandPressAnim  = function(){
                                            createjs.Tween.get(oHand).to({scaleX: 0.8, scaleY: 0.8}, 200);
                                            oShotPowerBar._onPressMouseDown({stageX: 240, stageY: 370});
                                        };
        
        var oHandReleaseAnim  = function(){
                                            createjs.Tween.get(oHand).to({scaleX: 1, scaleY: 1}, 200);
                                            oShotPowerBar._reset(300);
                                            oShotPowerBar._onPressUp();
                                        };
        var oShotBarAnim = function(){
                                            createjs.Tween.get(oHand).to({y:870}, 1000, createjs.Ease.cubicInOut)
                                                                     .on("change",function(){
                                                                        oShotPowerBar._onPressMove({stageY: oHand.y});
                                                                      });
                                      };
        
        var oTweenLoop = createjs.Tween.get(oHand, {loop:true})
                                .call(oHandPressAnim).wait(200 + s_iTimeElaps)
                                .call(oShotBarAnim).wait(1000 + s_iTimeElaps)
                                .call(oHandReleaseAnim).wait(300 + s_iTimeElaps)
                                .call(oResetAnimation).wait(400 + s_iTimeElaps);
        
        var oCbCompleted = function(){
                                        oHand.removeAllEventListeners();
                                        createjs.Tween.removeTweens(oHand);
                                        this._endRespotCueTutorial();
                                    };
        
        //_oButContinue.block(false);
        _oButContinue.addEventListener(ON_MOUSE_UP, oCbCompleted, this);
        
        _oFade.on("click", oCbCompleted, this, false);
    };
    
    this._tutorialMoveStickMobile = function(){
        var oBgHelp = new createjs.Shape();
        oBgHelp.graphics.beginFill("rgba(0, 0, 0, 0.8").drawRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);

        _oContainerTutorial.addChild(oBgHelp);
        _oFade.removeAllEventListeners();   
        
        
        var iWidthText =  1000 ;
        var iHeightText = 150 ;
        //var iXOffset = iWidthText*0.5;

        var oContainerText = new createjs.Container();
        _oContainerTutorial.addChild(oContainerText);
        oContainerText.x = CANVAS_WIDTH/2;
        oContainerText.y = 270;

        var pPosText = {x: 0, y: 0};

        var szText = TEXT_INTERACTIVE_HELP_MOVE_STICK_MOBILE_DRAG;

        new CTLText(oContainerText, 
                    pPosText.x-iWidthText/2, pPosText.y-iHeightText/2, iWidthText, iHeightText, 
                    40, "center", "#fff", FONT_GAME, 1.1,
                    0, 0,
                    szText,
                    true, true, true,
                    false );
        var oSpriteBall = s_oSpriteLibrary.getSprite("ball_spin_gui");
        var oBall = createBitmap(oSpriteBall);
        oBall.x = CANVAS_WIDTH/2;
        oBall.y = CANVAS_HEIGHT/2;
        oBall.regX = oSpriteBall.width/2;
        oBall.regY = oSpriteBall.height/2;
        oBall.scaleX = oBall.scaleY = 0.29;
        
        _oContainerTutorial.addChild(oBall);
        
        var oContainerSteak = new createjs.Container();
        oContainerSteak.x = oBall.x - (oBall.regX * oBall.scaleX);
        oContainerSteak.y = oBall.y;
        _oContainerTutorial.addChild(oContainerSteak);
        
        var oSpriteSteak = s_oSpriteLibrary.getSprite("stick");
        var oStick = createBitmap(oSpriteSteak);
        oStick.x = BALL_RADIUS;
        oStick.regX = oSpriteSteak.width + BALL_RADIUS;
        oStick.regY = oSpriteSteak.height/2;
        
        oContainerSteak.addChild(oStick);
        
        var oSpriteHand = s_oSpriteLibrary.getSprite("hand_anim_0");
        var oHand = createBitmap(oSpriteHand);
        oHand.regX = oSpriteHand.width/2;
        oHand.regY = oSpriteHand.height/1.5 ;
        oHand.x = oStick.regX/2;
        oHand.y = 100;
        oHand.rotation = 135;
        oContainerSteak.addChild(oHand);
        
        var oFuncStickAnim = function(){
                                    var fRotation = linearFunction(
                                                                    oHand.y,
                                                                    -100, 100,
                                                                    -20, 20
                                                                   );
                                    oStick.y = -fRotation*0.25;
                                    oStick.rotation = fRotation;
                                };
        oFuncStickAnim.call(this);
        var oHandTween = createjs.Tween.get(oHand, {loop:true})
                                        .to({y: -100}, 1000, createjs.Ease.cubicInOut)
                                        .to({y: 100}, 1000, createjs.Ease.cubicInOut);
                                
        oHandTween.on('change', oFuncStickAnim);
        
        var oCbCompleted = function(){
                                        oHandTween.removeAllEventListeners();
                                        this._endShotWithStickTutorial(oHandTween);
                                    };
        
        _oButContinue.addEventListener(ON_MOUSE_UP, oCbCompleted, this);
        
        _oFade.on("click", oCbCompleted , this, false);
    };
    
    this._tutorialShotWithStickDesktop = function(){   
        var oBgHelp = new createjs.Shape();
        oBgHelp.graphics.beginFill("rgba(0, 0, 0, 0.8").drawRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);

        _oContainerTutorial.addChild(oBgHelp);
        _oFade.removeAllEventListeners();   

        var iWidthText =  700 ;
        var iHeightText = 150 ;
        //var iXOffset = iWidthText*0.5;

        var oContainerText = new createjs.Container();
        _oContainerTutorial.addChild(oContainerText);
        oContainerText.x = CANVAS_WIDTH/2;
        oContainerText.y = 300;

        var pPosText = {x: 0, y: 0};

        var szText = TEXT_INTERACTIVE_STICK_SHOT_DESKTOP;

        new CTLText(oContainerText, 
                    pPosText.x-iWidthText/2, pPosText.y-iHeightText/2, iWidthText, iHeightText, 
                    40, "center", "#fff", FONT_GAME, 1.1,
                    0, 0,
                    szText,
                    true, true, true,
                    false );
        
        var oSpriteBall = s_oSpriteLibrary.getSprite("ball_spin_gui");
        var oBall = createBitmap(oSpriteBall);
        oBall.x = CANVAS_WIDTH/2;
        oBall.y = CANVAS_HEIGHT/2;
        oBall.regX = oSpriteBall.width/2;
        oBall.regY = oSpriteBall.height/2;
        oBall.scaleX = oBall.scaleY = 0.29;
        
        _oContainerTutorial.addChild(oBall);
        
        var oContainerSteak = new createjs.Container();
        oContainerSteak.x = oBall.x - (oBall.regX * oBall.scaleX);
        oContainerSteak.y = oBall.y;
        _oContainerTutorial.addChild(oContainerSteak);
        
        var oSpriteSteak = s_oSpriteLibrary.getSprite("stick");
        var oStick = createBitmap(oSpriteSteak);
        oStick.regX = oSpriteSteak.width;
        oStick.regY = oSpriteSteak.height/2;
        
        oContainerSteak.addChild(oStick);
        
        var oSpriteHand = s_oSpriteLibrary.getSprite("hand_anim_0");
        var oHand = createBitmap(oSpriteHand);
        oHand.regX = oSpriteHand.width/2;
        oHand.regY = oSpriteHand.height/2;
        oHand.x = -oStick.regX/2;
        oHand.y = 100;
        oHand.rotation = 180;
        oContainerSteak.addChild(oHand);
        
        var oResetAnimation = function(){
            createjs.Tween.get(oHand, {override:true}).to({alpha:1}, 400);  
            oBall.x = CANVAS_WIDTH/2;
            oBall.y = CANVAS_HEIGHT/2;
            createjs.Tween.get(oBall, {override:true}).to({alpha:1}, 400);
            createjs.Tween.get(oContainerSteak)
                            .to({x:oBall.x - (oBall.regX * oBall.scaleX)}, 400);
        };
        
        var oBallMoveAnim = function(){
            createjs.Tween.get(oBall, {override:true}).to({x: CANVAS_WIDTH, alpha:0}, 700);
        };
        
        var oAfterReleaseSteak = function(){
            createjs.Tween.get(oHand).to({alpha: 0}, 300);
        };
        
        var oTweenLoop = createjs.Tween.get(oContainerSteak, {loop:true})
                                .to({x:oContainerSteak.x - 100}, 500, createjs.Ease.cubicIn)
                                .call(oAfterReleaseSteak).wait(301)
                                .to({x: oContainerSteak.x + 3}, 200, createjs.Ease.cubicIn)
                                .call(oBallMoveAnim).wait(701)
                                .call(oResetAnimation).wait(401);
        
        var oCbCompleted = function(){
                                        this._endShotWithStickTutorial(oContainerSteak);
                                    };
        _oFade.on("click", oCbCompleted, this, false);
        
        _oButContinue.addEventListener(ON_MOUSE_UP, oCbCompleted, this);
    };
    
    this._endShotWithStickTutorial = function(oTweenLoop){
        this.endTutorial();

        createjs.Tween.removeTweens(oTweenLoop);
        _oFade.removeAllEventListeners();
        _oFade.on("click", function(){}); 
    };
    
    
    this._tutorialCueEffect = function(oInfo){
           var oSpriteHelp = s_oSpriteLibrary.getSprite("bg_interactive_help_2");
        
            var oBgHelp = createBitmap(oSpriteHelp);
            _oContainerTutorial.addChild(oBgHelp);
            _oFade.removeAllEventListeners();   
            
            var oCbCompleted = function(){
                                            this._endRespotCueTutorial();
                                        };
            
            _oButContinue.addEventListener(ON_MOUSE_UP, oCbCompleted, this);
            
            _oFade.on("click", oCbCompleted, this, false);

            var iWidthText =  600 ;
            var iHeightText = 150 ;
            //var iXOffset = iWidthText*0.5;

            var oContainerText = new createjs.Container();
            _oContainerTutorial.addChild(oContainerText);
            oContainerText.x = 480;
            oContainerText.y = 600;

            var pPosText = {x: 0, y: 0};

            var szText = s_bMobile ? TEXT_INTERACTIVE_HELP_CUE_EFFECT_MOBILE : TEXT_INTERACTIVE_HELP_CUE_EFFECT_DESKTOP;

            new CTLText(oContainerText, 
                        pPosText.x-iWidthText/2, pPosText.y-iHeightText/2, iWidthText, iHeightText, 
                        40, "center", "#fff", FONT_GAME, 1.1,
                        0, 0,
                        szText,
                        true, true, true,
                        false );

            var oHand = this.createHand();
            oHand.x = oContainerText.x;
            oHand.y = 760;
    //        oHand.scaleX = oHand.scaleY = 0.6;
            _oContainerTutorial.addChild(oHand);
    };
    
    this._endCueEffectTutorial = function(){
        this.endTutorial();

        //createjs.Tween.removeTweens(oHand);
        _oFade.removeAllEventListeners();
        _oFade.on("click", function(){}); 
    };
    
    this._tutorialRespotCue = function(oInfo){
        var oSpriteHelp = s_oSpriteLibrary.getSprite("bg_interactive_help_1");
        
        var oBgHelp = createBitmap(oSpriteHelp);
        _oContainerTutorial.addChild(oBgHelp);
        _oFade.removeAllEventListeners();   
        
        var oCbCompleted =  function(){
                                        this._endRespotCueTutorial();
                                    };
        _oButContinue.addEventListener(ON_MOUSE_UP, oCbCompleted, this);
        
        _oFade.on("click", oCbCompleted, this, false);

        var iWidthText =  700 ;
        var iHeightText = 150 ;
        //var iXOffset = iWidthText*0.5;
        
        var oContainerText = new createjs.Container();
        _oContainerTutorial.addChild(oContainerText);
        oContainerText.x = 691;
        oContainerText.y = 200;
        
        var pPosText = {x: 0, y: 0};
        
        var szText = s_bMobile ? TEXT_INTERACTIVE_HELP_RESPOT_CUE_MOBILE : TEXT_INTERACTIVE_HELP_RESPOT_CUE_DESKTOP;
        
        new CTLText(oContainerText, 
                    pPosText.x-iWidthText/2, pPosText.y-iHeightText/2, iWidthText, iHeightText, 
                    40, "center", "#fff", FONT_GAME, 1.1,
                    0, 0,
                    szText,
                    true, true, true,
                    false );
        
        var oHand = this.createHand();
        oHand.x = oContainerText.x;
        oHand.y = 380;
//        oHand.scaleX = oHand.scaleY = 0.6;
        _oContainerTutorial.addChild(oHand);
    };
    
    this._endRespotCueTutorial = function(){
        this.endTutorial();

        //createjs.Tween.removeTweens(oHand);
        _oFade.removeAllEventListeners();
        _oFade.on("click", function(){}); 
    };
    
    this._tutorialMoveStick = function(oInfo){
        
        var oSpriteHelp = s_oSpriteLibrary.getSprite("bg_interactive_help_0");
        
        var oBgHelp = createBitmap(oSpriteHelp);
        _oContainerTutorial.addChild(oBgHelp);
        _oFade.removeAllEventListeners();   
        
        oCbCompleted = function(){
                                    this._endMoveStickTutorial();
                                };
        
        _oButContinue.addEventListener(ON_MOUSE_UP, oCbCompleted, this);
        
        _oFade.on("click", oCbCompleted, this, false);

        var iWidthText =  700 ;
        var iHeightText = 200 ;
        //var iXOffset = iWidthText*0.5;
        
        var oContainerText = new createjs.Container();
        _oContainerTutorial.addChild(oContainerText);
        oContainerText.x = 1380;
        oContainerText.y = 550;
        
        var pPosText = {x: 0, y: 0};
        
        var szText = s_bMobile ? TEXT_INTERACTIVE_HELP_MOVE_STICK_MOBILE : TEXT_INTERACTIVE_HELP_MOVE_STICK_DESKTOP;
        
        new CTLText(oContainerText, 
                    pPosText.x-iWidthText/2, pPosText.y-iHeightText/2, iWidthText, iHeightText, 
                    40, "center", "#fff", FONT_GAME, 1.1,
                    0, 0,
                    szText,
                    true, true, true,
                    false );
        
        var oHand = this.createHand();
        oHand.x = oContainerText.x;
        oHand.y = 750;
//        oHand.scaleX = oHand.scaleY = 0.6;
        _oContainerTutorial.addChild(oHand);
    };
    
    this._endMoveStickTutorial = function(){
            this.endTutorial();
           
            //createjs.Tween.removeTweens(oHand);
            _oFade.removeAllEventListeners();
            _oFade.on("click", function(){}); 
    };
    
    this.removeTweens = function(){
        createjs.Tween.removeTweens(_oContainer);
    };
    
    this.toExecuteTutorial = function(iType){
        return _aInteractiveHelp[iType].toExecute;
    };
    
    this.exeTutorial = function(){
        return _bInExe;
    };
    
    this.endTutorial = function(){
        var oParent = this;
        var oTween = createjs.Tween.get(_oContainer);
        if(_aQueue.length < 1){
            _bInExe  = false;
            oTween.to({alpha:0}, 500, createjs.Ease.cubicIn);
            oTween.call(function(){
                _oFade.removeAllEventListeners();
                _oContainer.removeChild(_oContainerTutorial);
                oParent.triggerEvent(ON_END_TUTORIAL);
            });
            _aParams[ON_END_TUTORIAL] = _iTutorial;
          
        }else{
            var oTween = createjs.Tween.get(_oContainer);
            oTween.to({alpha:0}, 500, createjs.Ease.cubicIn);
            oTween.call(function(){
                var oNextTutorial = _aQueue.shift();
                if(oNextTutorial === undefined){
                    oParent.triggerEvent(ON_END_TUTORIAL);
                    _aParams[ON_END_TUTORIAL] = _iTutorial;
                    return;
                }
                
                _bInExe = false;
                _oContainerTutorial.removeAllChildren();
                oParent.startTutorial(oNextTutorial);
            });
        }
    };
    
    this.createHand = function(){
        var aImages = new Array();
        
        for(var i = 0; i < HAND_ANIM_NUM_FRAMES; i++){
            aImages.push(s_oSpriteLibrary.getSprite("hand_anim_" + i));
        }
        var oSprite = s_oSpriteLibrary.getSprite("hand_anim_" + 0);
        var oData = {   
                            images: aImages, 
                            // width, height & registration point of each sprite
                            frames: {width: oSprite.width, height: oSprite.height, regX: oSprite.width/2, regY: oSprite.height/2}, 
                            animations: {loop : [0, 19, "loop"]},
                            framerate: 30
                       };

        var oSpriteSheet = new createjs.SpriteSheet(oData);

        var oHand = createSprite(oSpriteSheet,"loop",oSprite.width/2,oSprite.height/2,oSprite.width,oSprite.height);
        
        return oHand;
    };
    
    this.triggerEvent = function(iEvent){
        if(_aCbCompleted[iEvent]){
            _aCbCompleted[iEvent].call(_aCbOwner[iEvent], _aParams[iEvent]);
        }      
    };
  
    this.addEventListener = function (iEvent, cbCompleted, cbOwner, aParams){
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
        _aParams[iEvent] = aParams;
    };
    
    this._onPressUpButSkip = function(){
        _oFade.dispatchEvent('click');
        
        _oFade.on("click", function(){}); 
        
        _aQueue = new Array();
        
        this.endTutorial();
    };
    
    this.unload = function(){
        _oFade.removeAllEventListeners();
        _oParentContainer.removeChild(_oContainer);
    };
    
    this.refreshButtonsPos = function(){
        _oContainerContinue.x = _oContainerSkip.x = _pStartPosContainerSkip.x - s_iOffsetX;
        _oContainerSkip.y = _pStartPosContainerSkip.y + s_iOffsetY;
        _oContainerContinue.y = _pStartPosContainerContinue.y - s_iOffsetY;
    };
    
    this._init(oParentContainer);
}