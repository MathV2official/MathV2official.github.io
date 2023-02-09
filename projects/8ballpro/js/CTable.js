function CTable(oParentContainer, oCpuDifficultyParams){
    var _bHoldStick;
    var _bReadyForShot;
    var _bBreakShot;
    var _bForceStopStick;
    var _bFirstShot;
    var _bCueBallInHole;
    var _iState;
    var _iPowerShot;
    var _iLowestBall;
    var _iShotPoints;
    var _iComboShots;
    var _aBallsToPotPlayers;      //Num of balls to pot for each player in 8ball
    var _aCueBallCollision;
    var _aCbCompleted;
    var _aCbOwner;
    var _iCntBallsIntoHoles;
    var _iTimeAnimStick;
    var _iMaxTimeAnimationStick;
    var _iDistFromBlankBall;
    var _aBalls;
    var _aBallsInHoles;
    var _aBallsInHoleInCurShot;
    var _aFieldEdges;
    var _vStickDirection;
    var _vMousePosAtHoldStick;
    var _vInvStickDirection;
    var _vStickInitDir;
    var _oListenerPress;
    var _oListenerMove;
    var _oListenerRelease;
    var _oPhysicsController;
    
    var _oDollyDir;
    var _oCueBallDir;
    var _oHittenBallDir;
    var _oCircleShape;
    var _oHitAreaShot;
    var _oStick;
    var _oCueBall;
    var _oBallContainer;
    var _oContainer;
    var _oContainerUpperBumper;
    var _oContainerDownBumper;
    var _oContainerUpperTable;
    var _oParentContainer = oParentContainer;
    
    var _oHandCueBallDrag;
    var _fPrevStickAngle;
    var _iPrevState;
    var _iColorCuePrevTrajectory;
    
    var _iCpuShotTurn;
    var _oCpuDifficultyParams;
    
    var _aSoundsInstance;
    
    this._init = function(oCpuDifficultyParams){
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        _aSoundsInstance = new Array();
     
        _oCpuDifficultyParams = oCpuDifficultyParams;
        this.reset();
        
        var oSpriteBg = s_oSpriteLibrary.getSprite("pool_table");
        TABLE_CENTER = {x:CANVAS_WIDTH/2 - oSpriteBg.width/4,y:CANVAS_HEIGHT/2 - oSpriteBg.height/4};
        
        _oContainerUpperTable = new createjs.Container();
        s_oStageUpper3D.addChild(_oContainerUpperTable);
        
        _oContainer = new createjs.Container();
        _oContainerUpperTable.x = _oContainer.x = CANVAS_WIDTH/2 - oSpriteBg.width/2;
        _oContainerUpperTable.y = _oContainer.y = CANVAS_HEIGHT/2 - oSpriteBg.height/2;
        _oParentContainer.addChild(_oContainer);
          
        var oBg = createBitmap(oSpriteBg);
        _oContainer.addChild(oBg);
        
        TABLE_CENTER_COORDINATE = new CVector2(CANVAS_WIDTH/2 - oSpriteBg.width/4 ,CANVAS_HEIGHT/2 - oSpriteBg.height/4);
        if(DEBUG_SHOW_TABLE_CENTER_SHAPE){
            this._createGraphicCenterTableShape();
        }
        
        this._initTableEdges();
        
        if(DEBUG_SHOW_RECT_COLLISION){
            var oRectCollision = new createjs.Shape();
            oRectCollision.graphics
                          .beginStroke("red")
                          .drawRect(
                                    RECT_COLLISION.x,
                                    RECT_COLLISION.y,
                                    RECT_COLLISION.width,
                                    RECT_COLLISION.height
                                    );
            _oContainerUpperTable.addChild(oRectCollision);
        }
        
        var iWidthOffset = 300;
        var iHeightOffset = 300;
        
        _oHitAreaShot = new createjs.Shape();
        _oHitAreaShot.graphics.beginFill("red").drawRect(
                                                            -iWidthOffset*0.5 ,
                                                            -iHeightOffset *0.5,
                                                            oSpriteBg.width + iWidthOffset,
                                                            oSpriteBg.height- 60 + iHeightOffset
                                                        );
        _oHitAreaShot.alpha = 0.01;
        _oHitAreaShot.cache(
                            -iWidthOffset*0.5 ,
                            -iHeightOffset *0.5,
                            oSpriteBg.width + iWidthOffset,
                            oSpriteBg.height- 60 + iHeightOffset
                        );
                
        _oListenerPress = _oHitAreaShot.on("mousedown", this._onPressHitArea);
        _oContainer.addChild(_oHitAreaShot);
        
        this.initBalls();
        _oCueBall.enableEvents();
        _oCueBall.addEventListener(ON_PRESS_DOWN_BALL, this._onPressDownCueBall, this);
        
        _oContainerUpperBumper = new createjs.Container();
        _oContainerUpperTable.addChild(_oContainerUpperBumper);
        _oContainerDownBumper = new createjs.Container();
        _oContainerDownBumper.visible = false;
        _oContainer.addChild(_oContainerDownBumper);
        
        this._createTableDownUpperBumper();
        _oStick = new CStick(_oContainerUpperTable);
        this.initStick();
        
        _iColorCuePrevTrajectory = ON_CUE_PLACEABLE;
        
        var oGraphics = new createjs.Graphics();
        _oDollyDir = new createjs.Shape(oGraphics);
        _oContainer.addChild(_oDollyDir);
        
        var oGraphics = new createjs.Graphics();
        _oCueBallDir = new createjs.Shape(oGraphics);
        _oContainer.addChild(_oCueBallDir);
        
        var oGraphics = new createjs.Graphics();
        _oHittenBallDir = new createjs.Shape(oGraphics);
        _oContainer.addChild(_oHittenBallDir);
        
        var oGraphics = new createjs.Graphics().beginStroke("#fff").drawCircle(0,0,BALL_DIAMETER/2);
        _oCircleShape = new createjs.Shape(oGraphics);
        _oCircleShape.visible = false;
        _oContainer.addChild(_oCircleShape);
        
        if(DEBUG_SHOW_HOLE_CENTER_POS_SHAPE){
            for ( var i = 0; i < HOLE_CENTER_POS.length; i++ ){
                var oCircle = createGraphicCircle(HOLE_CENTER_POS[i],BALL_RADIUS, null, "#fff");
                _oContainer.addChild(oCircle);            
            }
        }
        //_oScenario = new CScene();
        _oPhysicsController = new CPhysicsController(_oContainer);
        _oPhysicsController.addEventListener(ON_BALL_INTO_HOLE, this._onBallInHole, this );
		_oPhysicsController.addEventListener(ON_BALL_WITH_BALL, this._onCollisionBallWithBall, this );		
		_oPhysicsController.addEventListener(ON_BALL_WITH_BANK, this._onCollisionBallWithEdge, this );
        
        //_oContainerUpperTable.visible = false;
        
        _iPrevState = _iState = STATE_TABLE_PLACE_CUE_BALL_BREAKSHOT;
        
        this._placeCueBall();
        this.updateStick();
        _vStickDirection.set(1,0);
        this.renderStickDirection();
        
        _oHandCueBallDrag = new CHandBallDrag(_oContainerUpperTable);
        _oHandCueBallDrag.setPos(_oCueBall.getX(), _oCueBall.getY());
        _oHandCueBallDrag.show();
        
        if(DEBUG_SHOW_EDGE_TABLE){
            this.renderEdges();
        }

    };
    
    this._createTableDownUpperBumper = function(){
        for(var i = 0; i < TABLE_UPPER_BUMPER.length; i++){
            var oSprite = s_oSpriteLibrary.getSprite(TABLE_UPPER_BUMPER[i].sprite);
            
            var oBumperUpper = createBitmap(oSprite);
            oBumperUpper.x = TABLE_UPPER_BUMPER[i].x;
            oBumperUpper.y = TABLE_UPPER_BUMPER[i].y;
            
            var iRegX = oSprite.width  / TABLE_UPPER_BUMPER[i].regX;
            var iRegY = oSprite.height / TABLE_UPPER_BUMPER[i].regY;
            
            oBumperUpper.regX = iRegX === Infinity ? 0 : iRegX;
            oBumperUpper.regY = iRegY === Infinity ? 0 : iRegY;
        
            _oContainerUpperBumper.addChild(oBumperUpper);
            
            var oBumperDown = createBitmap(oSprite);
            oBumperDown.x = oBumperUpper.x;
            oBumperDown.y = oBumperUpper.y;
            oBumperDown.regX = oBumperUpper.regX;
            oBumperDown.regY = oBumperUpper.regY;
            _oContainerDownBumper.addChild(oBumperDown);
        }
    };
    
    this._createGraphicCenterTableShape = function(){ 
        var oCenter = createGraphicCircle(
                                {x: TABLE_CENTER_COORDINATE.getX(), y: TABLE_CENTER_COORDINATE.getY()},
                                10,
                                null,
                                "rgba(255,255,255,1)"
                            );
          _oContainer.addChild(oCenter);
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    //listener called when balls collide
    this._onCollisionBallWithBall = function( oFirstBall, oSecondBall,iForce ) {
	
        if(iForce === 0){
                return;
        }
        
        var fVolume = linearFunction(
                                      iForce,
                                      0.1, 40,
                                      0.05, 1
                                    );
        this._playTableSound("ball_collision", fVolume, 100);                    
        //playSound("ballshits", fVolume, false);
		/*
        var oAM = CAudioManager.getInstance();

        if (iForce > 10) {
                oAM.playChannel("coll_palla_palla.mp3", 0, 1, 100);
        }else if( (iForce < 10) && (iForce>5) ) {
                oAM.playChannel("coll_palla_palla_med.mp3", 0, 1, 100);
        }else{
                oAM.playChannel("coll_palla_palla_low.mp3", 0, 1, 100);
        }*/
        
    };
    
    this._playTableSound = function(szName, fVolume, iInterval){
        var bPlayable = true;
        var iMajTime = 0;
        var iTriggerTime = new Date().getTime();
        for(var i = 0; i < _aSoundsInstance.length; i++){
            
            if(_aSoundsInstance[i].time > iMajTime && _aSoundsInstance[i].name === szName ){
                iMajTime = _aSoundsInstance[i].time;
            }
        }
        
        if(iTriggerTime - iMajTime  <  iInterval){
            bPlayable = false;
        };
        
        if(bPlayable){
            var oSound = playSound(szName, fVolume, false);
           oSound.once("play", function(iID){
               var oInfo = {time: iTriggerTime, id: iID, name: szName};
               _aSoundsInstance.push(oInfo);
           });
           
            oSound.once("end", function(iID){
                for(var i = 0; i < _aSoundsInstance.lenght; i++){
                   var oSoundInfo = _aSoundsInstance[i];
                   
                   if(oSoundInfo.id === iID){
                       _aSoundsInstance.splice(i,1);
                       break;
                   }  
                }
            });
        }
        
        return bPlayable;
    };
    
    //listener called when ball is potted
    this._onBallInHole = function( oBall ) {	
        if (s_iGameMode == GAME_MODE_TIME) {
            if ( oBall.getNumber() != 0 ) {				
                    if ( oBall.getNumber() == 9 ) {
                            _iShotPoints += POINTS_FOR_BALL_POT * 3;
                            //_parent.stop9BallClock();
                    }else {
                            _iShotPoints += POINTS_FOR_BALL_POT;
                    }
                    s_oInterface.updateScore(_iShotPoints);

                    if ( _aBallsInHoles.length == 14 ) {
                            //win
                            _bForceStopStick = true;
                            //var iMillisec = Math.floor(_parent.oClock.getMillisec() / 1000);

                            //_parent.showScorePanel(m_iShotPoints,iMillisec);	

                    }else{
                            _iCntBallsIntoHoles++; 
                            _aBallsInHoles.push(oBall.getNumber());
                    }
                    _aBallsInHoleInCurShot.push(oBall.getNumber());

                    //_iShotPoints=_parent.checkBonus(m_iShotPoints);
            }else {
                    if (_iShotPoints > POINTS_FOR_BALL_POT) {
                            _iShotPoints-= POINTS_FOR_BALL_POT;
                            s_oInterface.updateScore(_iShotPoints);
                    }
            }
        }else {
            if ( oBall.getNumber() !== 0 ) {
                    _iCntBallsIntoHoles++; 

                    _aBallsInHoles.push(oBall.getNumber());
                    _aBallsInHoleInCurShot.push(oBall.getNumber());

            }else {
                _bCueBallInHole = true;
            }
        }

        //CAudioManager.getInstance().playChannel("palla_in_buca.mp3",0,1,100);		
        var fForce = oBall.getCurForceLen();

        var fVolume = linearFunction(
                              fForce,
                              0.1, 40,
                              0.2, 1
                            );
        
        playSound("ball_in_hole", fVolume, false);
        
        if(oBall.getNumber() !== 0){
            var fForce = oBall.getCurForceLen();
            var iTime = linearFunction(
                                            fForce,
                                            0, 13,
                                            700, 100
                                        );
            
            oBall.fadeAnimInHole(iTime);
        }
        
        //CALCULATE SHOT SCORE ON POT
        
        var iEdgeCollisionCueBall    = _oCueBall.getEdgeCollisionCount();
        var iEdgeCollisionBallPotted = oBall.getEdgeCollisionCount();
        
        var iShotPointsRatio = iEdgeCollisionBallPotted + iEdgeCollisionCueBall;
        //console.log("SHOT RATIO: " + iShotPointsRatio);
        iShotPointsRatio = iShotPointsRatio <= 0 ? 1 : iShotPointsRatio;
        
        _iShotPoints += (POINTS_FOR_BALL_POT * iShotPointsRatio) * _iComboShots;
        _iComboShots++;
        //console.log(_iShotPoints);
    };
    
    //listener called when ball touch any edge
    this._onCollisionBallWithEdge = function(oBall, oEdge = null) {/*
            if ( CAudioManager.getInstance().isPlayingChannel("sponda.mp3") == false ){
                    CAudioManager.getInstance().playChannel("sponda.mp3",0,1,100);
            }*/
        var fForce = oBall.getCurForceLen();
        
        if(fForce === 0){
                return;
        }
        
        var fVolume = linearFunction(
                                      fForce,
                                      0.1, 40,
                                      0.1, 1
                                    );
        this._playTableSound("edge_collision", fVolume, 100); 
        
        if(!oEdge ){
            return;
        }
        
        var iEdgeID = oEdge.getID();
        for(var i = 0; i < MAIN_TABLE_EDGE.length; i++){
            if(MAIN_TABLE_EDGE[i] === iEdgeID){
                oBall.increaseEdgeCollisionCount();
            }
        }
        
    };
    
    this.reset = function(){
        _bHoldStick = false;
        _bReadyForShot = false;
        _bCueBallInHole = false;
        _bForceStopStick = false;
        _bFirstShot = true;
        _iTimeAnimStick = 0;
        _iCntBallsIntoHoles = 0;
        _iCpuShotTurn = 0;
        _iShotPoints = 0;
        _iComboShots = 1;
        _iLowestBall = 1;
        _aBallsInHoles = new Array();
        _aBallsInHoleInCurShot = new Array();
        _aCueBallCollision = new Array();
        _bBreakShot = true;
        _aBallsToPotPlayers = [7,7];
        _iPowerShot = 0;
    };
    
    this.unload = function(){
        _oHitAreaShot.off("mousedown",_oListenerPress);
        _oHitAreaShot.removeAllEventListeners();
        s_oTable = null;
    };
    
    this._initTableEdges = function(){
        _aFieldEdges = new Array();
        for(var k=0;k<FIELD_POINTS.length-1;k++){
            var oEdge = new CEdge(FIELD_POINTS[k].x,FIELD_POINTS[k].y,FIELD_POINTS[k+1].x,FIELD_POINTS[k+1].y, k);
            _aFieldEdges.push(oEdge);
        }
        
        //ADD LAST EDGE THAT CONNECTS LAST POINT WITH THE FIRST ONE
        var oEdge = new CEdge(
                                FIELD_POINTS[FIELD_POINTS.length-1].x,
                                FIELD_POINTS[FIELD_POINTS.length-1].y,
                                FIELD_POINTS[0].x,
                                FIELD_POINTS[0].y,
                                FIELD_POINTS.length-1
                             );
        _aFieldEdges.push(oEdge);
    };
    
    this.renderEdges = function(){
        for(var k=0;k<_aFieldEdges.length;k++){
           _aFieldEdges[k].render(_oContainerUpperBumper);
        }
    };
    
    this.initBalls = function(){
       _oBallContainer = new createjs.Container();
       _oContainer.addChild(_oBallContainer);

       //INIT CUE BALL
       _aBalls = new Array();
       _oCueBall = new CBall(0,_oBallContainer, s_oTextureLibrary['cue_ball']);
       _oCueBall.setPos(CUE_BALL_POS.x,CUE_BALL_POS.y);
       
       _aBalls[0] = _oCueBall;
       
        for ( var i = 1; i < BALL_NUMBER+1; i++ ){
            var oTexture = s_oTextureLibrary["ball_"+i];
            var oBall = new CBall(i,_oBallContainer, oTexture);
            _aBalls[i] = oBall;
            _aBalls[i].setFlagOnTable(true);
        }
        
        this.setInitBallsPosition();
        _aBallsInHoles = new Array();

        //_bInitBalls = true;
    };
    
    this.setFirstBallCollision = function(oCollisionBall) {
        _aCueBallCollision.push(oCollisionBall);
    };
    
    this.setInitBallsPosition = function(){
            switch(s_iGameMode) {
                    case GAME_MODE_NINE: {
                            var aRandPos = new Array(1,2,3,5,6,7,8);

                            for ( var i = 2; i < BALL_NUMBER; i++ ){			
                                    var iRand = Math.floor(Math.random() * aRandPos.length);
                                    _aBalls[i].setPos(RACK_POS[aRandPos[iRand]].x, RACK_POS[aRandPos[iRand]].y);
                                    aRandPos.splice(iRand, 1);
                            }

                            
                            _aBalls[0].setPos(CUE_BALL_POS.x, CUE_BALL_POS.y);
                            
                            _aBalls[1].setPos(RACK_POS[0].x, RACK_POS[0].y);
                            _aBalls[9].setPos(RACK_POS[4].x, RACK_POS[4].y);
                            
                            
                    }break;
                    case GAME_MODE_EIGHT: {
                            var _aRandPos = new Array(0,1,2,3,5,6,7,8,9,11,12,13);
                            //in 8ball pool the two corner balls are of different suits and the 8 ball must be in the center of the rack
                            var iFirstCorner = Math.floor(Math.random() * 7) + 9;
                            var iSecondCorner = Math.floor(Math.random() * 7 ) + 1;
                                
                            for ( var i = 1; i < BALL_NUMBER+1; i++ ){			
                                    if( (i!=8) && (i!=iFirstCorner) && (i!=iSecondCorner) ){
                                        var iRand = Math.floor(Math.random() * _aRandPos.length);
                                        _aBalls[i].setPos(RACK_POS[_aRandPos[iRand]].x, RACK_POS[_aRandPos[iRand]].y);		
  
                                        _aRandPos.splice(iRand, 1);
                                    }
                            }

                            _aBalls[iFirstCorner].setPos(RACK_POS[10].x, RACK_POS[10].y);
                            _aBalls[iSecondCorner].setPos(RACK_POS[14].x, RACK_POS[14].y);
                            _aBalls[8].setPos(RACK_POS[4].x, RACK_POS[4].y);
                    }break;

                    case GAME_MODE_TIME:{
                            var aRandPos = new Array(0,1,2,3,5,6,7,8,9,10,11,12,13,14);
                           
                            for ( var i = 1; i < BALL_NUMBER; i++ ){			
                                    if(i !== 9) {
                                            var iRand = Math.floor(Math.random() * aRandPos.length);
                                            _aBalls[i].setPos(RACK_POS[ aRandPos[iRand]].x, RACK_POS[aRandPos[iRand]].y);
                                            aRandPos.splice(iRand, 1);
                                    }
                            }
                            
                            _aBalls[0].setPos(CUE_BALL_POS.x, CUE_BALL_POS.y);
                            _aBalls[9].setPos(RACK_POS[4].x, RACK_POS[4].y);
                            
                            break;
                    }
            }
            
        _aBalls.forEach(function(oBall){
             this._update3DObjectTransformation(oBall);
        },this);
    };
    
    this.initStick = function(){
        _vStickInitDir = new CVector2();
        _vStickInitDir.set( -1, 0);
        _vStickDirection      = new CVector2(1,0);
        _vMousePosAtHoldStick = new CVector2();
        _vInvStickDirection   = new CVector2();
    };
    
    this.hitBall = function(){
        _iPowerShot *= 0.2;
        _vStickDirection.scalarProduct(_iPowerShot);
        _oCueBall.addForce(_vStickDirection);
    };
    
    this.startToShot = function(){
         _oHandCueBallDrag.hide();
        _iState = STATE_TABLE_MOVE_STICK;
        _bHoldStick = true;
    };
    
    this._onPressHitArea = function(e){
        if(!_oCueBall.isBallOnTable() 
                || (s_iPlayerMode === GAME_MODE_CPU) && (s_oGame.getCurTurn() === 2)
                || !_oPhysicsController.areBallsStopped() 
                || _bReadyForShot){
            return;
        }
        if(!s_bMobile){
           s_oTable.startToShot();
        }
        
        _oCueBall.setDragging(false);
        
        var vLocalPos = _oContainer.globalToLocal(s_oStage.mouseX,s_oStage.mouseY);
        _vMousePosAtHoldStick.set( vLocalPos.x, vLocalPos.y);
        
        _fPrevStickAngle = radiantsToDegrees(Math.atan2(
                                                        _oCueBall.getPos().getY() - vLocalPos.y,
                                                        _oCueBall.getPos().getX() - vLocalPos.x
                                                      ));
        if (_fPrevStickAngle < 0){
            _fPrevStickAngle += 360;
        } else if (_fPrevStickAngle > 360) { 
            _fPrevStickAngle -= 360;
        };
        if(s_bMobile){
            _oListenerMove    = _oHitAreaShot.on("pressmove", s_oTable._onPressMoveHitArea);
        }
        _oListenerRelease = _oHitAreaShot.on("pressup", s_oTable._onReleaseHitArea);
    };
    
    this._onPressMoveHitArea = function(e){     
        var vLocalPos = _oContainer.globalToLocal(e.stageX, e.stageY);
        var fNewAngle = radiantsToDegrees(Math.atan2(
                                                        _oCueBall.getPos().getY() - vLocalPos.y,
                                                        _oCueBall.getPos().getX() - vLocalPos.x
                                                      ));
        
        if (fNewAngle < 0){
            fNewAngle += 360;
        } else if (fNewAngle > 360) { 
            fNewAngle -= 360;
        };
        
        var fRotationOffset = fNewAngle - _fPrevStickAngle; 

        s_oTable.rotateStick(-fRotationOffset);  
        _fPrevStickAngle = fNewAngle;
    };
    
    this.startStickAnimation = function(){
        return s_oTable._moveStick();
    };
    
    this._moveStick = function(oMousePos, vStartPos){
        _bHoldStick = false;
        
        var bToShot = _iPowerShot >= MIN_POWER_SHOT;
        
        if(bToShot){          
            _bBreakShot = false;
            _bReadyForShot = true;
            _oCueBall.setSideEffect(s_oInterface.getSideSpin());
           
        }else{
            _iState = _iPrevState;
            
            if(_iState === STATE_TABLE_PLACE_CUE_BALL || _iState === STATE_TABLE_PLACE_CUE_BALL_BREAKSHOT){
                _oHandCueBallDrag.show();
            }   
        }
        return bToShot;
    };
    

    this._onReleaseHitArea = function(){
        _oHitAreaShot.off("pressmove",_oListenerMove);
        _oHitAreaShot.off("pressup",_oListenerRelease);
        
        if(s_bMobile){
            return;
        }
        
        switch(_iState){
            case STATE_TABLE_MOVE_STICK:{
                    s_oTable._moveStick({x:s_oStage.mouseX, y:s_oStage.mouseY}, _vMousePosAtHoldStick);
                     //s_oTable.updateStick();
                break;
            }
        }
    };
    
    this._onPressDownCueBall = function(oEvent){
        if((s_iPlayerMode === GAME_MODE_CPU) && (s_oGame.getCurTurn() === 2)
            ||(_iState !== STATE_TABLE_PLACE_CUE_BALL_BREAKSHOT && _iState !== STATE_TABLE_PLACE_CUE_BALL)){
            return;
        }
        
        _oCueBall.addEventListener(ON_PRESS_MOVE_BALL, this._onPressMoveCueBall, this);
        _oCueBall.addEventListener(ON_PRESS_UP_BALL, this._onPressUpCueBall, this);
        _oCueBall.setFlagOnTable(false);
        _oStick.setVisible(true);
        
        _oHandCueBallDrag.setPos(_oCueBall.getX(), _oCueBall.getY());
    };
    
    this._onPressMoveCueBall = function(oEvt){
        var oPos = {x: oEvt.stageX, y: oEvt.stageY};
        this._moveCueBall(oPos);
        this.updateStick();
        this.renderStickDirection();
        
        if(this._checkCueBallCollisionWithTableElements()){
            s_oGame.hideShotBar();
            _iColorCuePrevTrajectory = ON_CUE_NOT_PLACEABLE;
        }else{
            s_oGame.showShotBar();
            _iColorCuePrevTrajectory = ON_CUE_PLACEABLE;
        }
        
        _oHandCueBallDrag.setPos(_oCueBall.getX(), _oCueBall.getY());
    };
    
    this._onPressUpCueBall = function(){
        _oCueBall.removeEventListener(ON_PRESS_MOVE_BALL);
        _oCueBall.removeEventListener(ON_PRESS_UP_BALL);
        this._placeCueBall();
        this.updateStick();
        this.renderStickDirection();
        _oHandCueBallDrag.setPos(_oCueBall.getX(), _oCueBall.getY());
    };
    
    this._checkCueBallCollisionWithTableElements = function(){
        if ( (_oCueBall.getX() > CUE_BALL_RESPOT_1.x) &&
            (_oCueBall.getX() < CUE_BALL_RESPOT_3.x) &&
            (_oCueBall.getY() > CUE_BALL_RESPOT_1.y) &&
            (_oCueBall.getY() < CUE_BALL_RESPOT_3.y) ){

           var vPos = new CVector2();
           vPos.set(_oCueBall.getX(), _oCueBall.getY());
           for (var k = 1; k < (BALL_NUMBER+1); k++) {	
                var tmpDist = distance2( vPos, _aBalls[k].getPos() );
                if ( tmpDist <= BALL_DIAMETER_QUADRO ) {
                        return true;
                }
            }
        }
        return false;
    };
    
    this._placeCueBall = function(){
        if ( !this._checkCueBallCollisionWithTableElements()){
            _oContainerUpperBumper.visible = true;
            _oContainerDownBumper.visible = false;
            //_oCueBall.setPos(_oCueBall.getX(), _oCueBall.getY());
            _oCueBall.setDragging(false);
            _oCueBall.setFlagOnTable(true);
        }          
    };
    
    this._moveCueBall = function(oPos){
        var vLocalPos = _oContainer.globalToLocal(oPos.x,oPos.y);

        if(vLocalPos.y - BALL_RADIUS> FIELD_POINTS[1].y && vLocalPos.y + BALL_RADIUS< FIELD_POINTS[13].y){
            _oCueBall.setY(vLocalPos.y);
        }
        
        if(_iState === STATE_TABLE_PLACE_CUE_BALL){
            if(vLocalPos.x + BALL_RADIUS< FIELD_POINTS[9].x && vLocalPos.x - BALL_RADIUS>FIELD_POINTS[21].x){
                _oCueBall.setX(vLocalPos.x);
            }
        }
    };
    
    //verify if ball in second parameter collides with any ball using directional volume
    this._checkCpuBallCollision = function(vCollPoint,oBallPos,iNumberBall1,iNumberBall2,aDataColl) {
            var vBallCCWDir = new CVector2();
            var vBallCWDir = new CVector2();
            var vBallDir = new CVector2();
            vBallDir.setV(vCollPoint);
            vBallDir.subtract(oBallPos);
            var iDirLen = vBallDir.length();
            vBallDir.normalize();

            vBallCCWDir.setV(vBallDir);
            vBallCWDir.setV(vBallDir);
            vBallCCWDir.rot90CCW();
            vBallCWDir.rot90CW();
            vBallCCWDir.scalarProduct(BALL_RADIUS);
            vBallCWDir.scalarProduct(BALL_RADIUS);
            vBallCCWDir.add(oBallPos);
            vBallCWDir.add(oBallPos);

            var vBallCCWDirProjected = new CVector2();
            var vBallCWDirProjected = new CVector2();
            vBallCCWDirProjected.setV(vBallDir);
            vBallCWDirProjected.setV(vBallDir);
            vBallCCWDirProjected.scalarProduct(iDirLen);
            vBallCWDirProjected.scalarProduct(iDirLen);
            vBallCCWDirProjected.add(vBallCCWDir);
            vBallCWDirProjected.add(vBallCWDir);
            var oEdge1 = new CEdge();
            oEdge1.set(vBallCWDir.getX(), vBallCWDir.getY(), vBallCWDirProjected.getX(), vBallCWDirProjected.getY());
            var oEdge2 = new CEdge();
            oEdge2.set(vBallCCWDir.getX(), vBallCCWDir.getY(), vBallCCWDirProjected.getX(), vBallCCWDirProjected.getY());

            var bCollision = false;
            var oObjectData={iDistance:0,vClosestPoint:new CVector2()};

            for (var i = 0; i < BALL_NUMBER+1; i++) {

                if( (i!=iNumberBall1)&& (i!=iNumberBall2) ){
                    if (collideEdgeWithCircle(oEdge1, _aBalls[i].getPos(),BALL_RADIUS,oObjectData)) {
                            bCollision = true;
                            aDataColl.push( { ball:_aBalls[i], point:oObjectData["vClosestPoint"] } );
                    }
                    if (collideEdgeWithCircle(oEdge2, _aBalls[i].getPos(),BALL_RADIUS,oObjectData)) {
                            bCollision = true;
                            aDataColl.push( { ball:_aBalls[i], point:oObjectData["vClosestPoint"] } );
                    }
                }
            }
            return bCollision;
    };
    
    //verify if ball in second parameter collides with any edge using directional volume
    function checkBallCollisionWithEdges(vCollPoint,oBallPos,aEdges) {
            var vBallCCWDir = new CVector2();
            var vBallCWDir = new CVector2();
            var vBallDir = new CVector2();
            vBallDir.setV(vCollPoint);
            vBallDir.subtract(oBallPos);
            var iDirLen = vBallDir.length();
            vBallDir.normalize();

            vBallCCWDir.setV(vBallDir);
            vBallCWDir.setV(vBallDir);
            vBallCCWDir.rot90CCW();
            vBallCWDir.rot90CW();
            vBallCCWDir.scalarProduct(BALL_RADIUS);
            vBallCWDir.scalarProduct(BALL_RADIUS);
            vBallCCWDir.add(oBallPos);
            vBallCWDir.add(oBallPos);

            var vBallCCWDirProjected = new CVector2();
            var vBallCWDirProjected = new CVector2();
            vBallCCWDirProjected.setV(vBallDir);
            vBallCWDirProjected.setV(vBallDir);
            vBallCCWDirProjected.scalarProduct(iDirLen);
            vBallCWDirProjected.scalarProduct(iDirLen);
            vBallCCWDirProjected.add(vBallCCWDir);
            vBallCWDirProjected.add(vBallCWDir);
            var oEdge1 = new CEdge();
            oEdge1.set(vBallCWDir.getX(), vBallCWDir.getY(), vBallCWDirProjected.getX(), vBallCWDirProjected.getY());
            var oEdge2 = new CEdge();
            oEdge2.set(vBallCCWDir.getX(), vBallCCWDir.getY(), vBallCCWDirProjected.getX(), vBallCCWDirProjected.getY());

            var oDataColl = new CEdge();
            var bFound = false;
            for (var i = 0; i < aEdges.length; i++) {
                if (collideEdgeWithEdge(oEdge1, aEdges[i])) {
                        oDataColl = aEdges[i];
                        bFound = true;
                        break;
                }
                if (collideEdgeWithEdge(oEdge2, aEdges[i])) {
                        oDataColl = aEdges[i];
                        bFound = true;
                        break;
                }
            }
            
            if(bFound){
                return oDataColl;
            }else {
                return null;
            }
    }
    
    this.renderStickDirection = function(){/*
        if (_bBreakShot) {
                return;
        }*/
        _oDollyDir.graphics.clear();	
        _oCueBallDir.graphics.clear();
        _oHittenBallDir.graphics.clear();
        _oCircleShape.x = CANVAS_WIDTH+100;
        _oCircleShape.y = CANVAS_HEIGHT+100;
        /*if ( (_bForceStopStick == true) || (_isMouseInTable() == false && m_oAnimStick.bAnim == false) ) {
                return;
        }*/

        if ( _bHoldStick === false ) {
                if ( _bReadyForShot ){
                        //_oStick.setVisible(true);
                        var vTweenPos = new CVector2();
                        var vStickPos = new CVector2();
                        vStickPos.set( _oStick.getX(), _oStick.getY() );

                        var iLerpFactor;
                        _iTimeAnimStick += s_iTimeElaps;
                        
                        if ( _iPowerShot > 100 ){
                            iLerpFactor = easeElasticIn( _iTimeAnimStick, 0, 1, TIME_ANIMATION_SHOT_ELASTIC, -1 );
                        }else{
                            iLerpFactor = easeBackIn( _iTimeAnimStick, 0, 1, TIME_ANIMATION_SHOT_BACK );
                            if(_iPowerShot < MIN_POWER_SHOT){
                                _iPowerShot = MIN_POWER_SHOT;
                            }
                        }
                         
                        vTweenPos = tweenVectors( vStickPos, _oCueBall.getPos(), vTweenPos, iLerpFactor );	
                        if ( _iTimeAnimStick >= _iMaxTimeAnimationStick ){
                            
                            s_oGame.hideShotBar();
                            
                            var fVolume = linearFunction(
                                  _iPowerShot,
                                  MIN_POWER_SHOT, MAX_POWER_SHOT,
                                  0.3, 1
                            );
                            
                            playSound("stick_shot", fVolume, false);
                            
                            _iTimeAnimStick = 0;
                            _bReadyForShot = false;
                            _iPowerShot *= 0.2;

                            _vStickDirection.scalarProduct(_iPowerShot);

                            _oCueBall.addForce(_vStickDirection);
                            _vStickDirection.normalize();            

                            var fFactor =  0.5;        
                            var fSideSpinForce = s_oInterface.getSideSpin() * (fFactor * Math.sign(_vStickDirection.getX()));
                            var fBackSpinForce = s_oInterface.getBackSpin() * (fFactor * Math.sign(_vStickDirection.getY()));

                           var fSideSpinNorm = fSideSpinForce + (fBackSpinForce * _vStickDirection.getX());
                           var fBackSpinNorm = fBackSpinForce - fSideSpinNorm* Math.sign(_vStickDirection.getX());

                            _oCueBall.setEffectForceX( -fSideSpinNorm);
                            _oCueBall.setEffectForceY( -fBackSpinNorm);

                            var vEffectForce = _oCueBall.getEffectForceVector();
                           
                            vEffectForce.add(_vStickDirection);

                            _oStick.setVisible(false);
                            
                            //playSound("shoot", 1,false );
                            _iState = STATE_TABLE_SHOOTING;
                        }	
                        
                        _oStick.setPos(vTweenPos.getX(),vTweenPos.getY());				
                }else {	/*
                        if ( m_bTargetting == false ){
                                return;
                        }*/
                        //draw line for ball directions						
                        

                        var aCollisionData = new Array();
                        var vMousePos = new CVector2();
                        
                        var vLocalPos = {
                                            x: _vStickDirection.getX()* 1280 + _oCueBall.getX(),
                                            y: _vStickDirection.getY()* 1280 + _oCueBall.getY()
                                        };
                   
                        vMousePos.set(vLocalPos.x, vLocalPos.y);
                        var vCollPoint = new CVector2();

                        vCollPoint.setV( vMousePos);
                        vCollPoint.subtract(_oCueBall.getPos());
                        vCollPoint.normalize();
                        //find any collision  between cue ball and other balls
                        
                        var bCheckBallCollison = this._checkCpuBallCollision(vMousePos, _oCueBall.getPos(), 0, 0, aCollisionData);
                        
                        for(var i = 0; i < aCollisionData.length; i++){
                            if(!aCollisionData[i].ball.isBallOnTable()){
                                aCollisionData.splice(i, 1);
                                i--;
                            }
                        }
                        
                        bCheckBallCollison = (aCollisionData.length > 0);
                        
                        if (bCheckBallCollison) {
                                var iMinDist = distance(_oCueBall.getPos(), (aCollisionData[0].ball).getPos());
                                
                                var iBallIndex = 0;
                                for (var k = 1; k < aCollisionData.length; k++) {

                                    if(!aCollisionData[k].ball.isBallOnTable()){
                                        continue;
                                    };

                                    var iCurDist = distance(_oCueBall.getPos(), (aCollisionData[k].ball).getPos());

                                    if ( iCurDist < iMinDist) {
                                        iMinDist = iCurDist;
                                        iBallIndex = k;
                                    }
                                }
                                

                                var oEdgeCueBall = new CEdge();
                                oEdgeCueBall.set(_oCueBall.getX(), _oCueBall.getY(), vMousePos.getX(), vMousePos.getY());

                                var vDir = new CVector2();
                                vDir.setV(vCollPoint);
                                vDir.scalarProduct(1.5);
                                var vCueBallPos = new CVector2();
                                vCueBallPos.setV(_oCueBall.getPos());
                       
                                while ( distance(vCueBallPos,(aCollisionData[iBallIndex].ball).getPos() )> (BALL_DIAMETER+1) ) {
                                        vCueBallPos.add(vDir);
                                }
                                
                                //draw cue ball dir
                                var vCueBallNormal = new CVector2();
                                vCueBallNormal.setV( (aCollisionData[iBallIndex].ball).getPos());
                                vCueBallNormal.subtract(vCueBallPos);
                                vCueBallNormal.normalize();

                                var vCueBallDir = new CVector2();
                                vCueBallNormal.invert();
                                vCueBallDir = reflectVectorV2(vCueBallNormal, vCollPoint);
                                vCueBallDir.normalize();

                                vCueBallDir.scalarProduct(48);

                                var vCueBallPoint = new CVector2();
                                vCueBallPoint.setV(vCueBallPos);
                                vCueBallPoint.add(vCueBallDir);

                                //draw direction of ball hitted by cue ball
                                var vDirBallHitted = new CVector2();
                                vDirBallHitted.setV((aCollisionData[iBallIndex].ball).getPos() );
                                vDirBallHitted.subtract(vCueBallPos);
                                vDirBallHitted.normalize();
                                vDirBallHitted.scalarProduct(72);

                                var vBallHittedPoint = new CVector2();
                                vBallHittedPoint.setV(vCueBallPos);
                                vBallHittedPoint.add(vDirBallHitted);
                                
                                _oCircleShape.visible = true;
                                _oCircleShape.x = vCueBallPos.getX();
                                _oCircleShape.y = vCueBallPos.getY();
                                _oDollyDir.graphics.setStrokeStyle(4)
                                                    .beginStroke(PREVISION_TRAJECTORY_COLORS[0][_iColorCuePrevTrajectory])
                                                    .moveTo(_oCueBall.getX(), _oCueBall.getY())
                                                    .lineTo( vCueBallPos.getX(), vCueBallPos.getY());
                                
                                _oCueBallDir.graphics.setStrokeStyle(4)
                                                     .beginStroke(PREVISION_TRAJECTORY_COLORS[0][_iColorCuePrevTrajectory])
                                                     .moveTo(vCueBallPos.getX(), vCueBallPos.getY() )
                                                     .lineTo(vCueBallPoint.getX(), vCueBallPoint.getY());
                                             
                                _oHittenBallDir.graphics.setStrokeStyle(4)
                                               .beginStroke(PREVISION_TRAJECTORY_COLORS[1][_iColorCuePrevTrajectory])
                                               .moveTo(vCueBallPos.getX(), vCueBallPos.getY() )
                                               .lineTo(vBallHittedPoint.getX(), vBallHittedPoint.getY());

                        }else {
                                //verify if stick direction collide with edges
                                var oEdgeColl = new CEdge();
                                oEdgeColl.set(_oCueBall.getX(), _oCueBall.getY(), vMousePos.getX(), vMousePos.getY());

                                var oHittenEdge = new CEdge();
                                oHittenEdge = checkBallCollisionWithEdges(vMousePos, _oCueBall.getPos(), _aFieldEdges);
                                
                                if (oHittenEdge !== null ){ 
                                        var vPosColl = new CVector2();
                                        var vDir = new CVector2();
                                        vDir.setV(vCollPoint);
                                        vDir.scalarProduct(2);

                                        vPosColl.setV(_oCueBall.getPos());

                                        while ( !collideEdgeWithCircle(oHittenEdge,vPosColl,BALL_RADIUS) ) {	
                                                vPosColl.add(vDir);
                                        }
                                        
                                        _oCircleShape.visible = true;
                                        _oCircleShape.x = vPosColl.getX();
                                        _oCircleShape.y = vPosColl.getY();
                                        _oDollyDir.graphics.beginStroke(PREVISION_TRAJECTORY_COLORS[0][_iColorCuePrevTrajectory]).moveTo(_oCueBall.getX(), _oCueBall.getY()).lineTo( vPosColl.getX(), vPosColl.getY() );
                                        
                                }else {
                                        _oCircleShape.visible = false;
                                        
                                        _oDollyDir.graphics.beginStroke(PREVISION_TRAJECTORY_COLORS[0][_iColorCuePrevTrajectory]).moveTo(_oCueBall.getX(), _oCueBall.getY()).
                                                                lineTo( _oCueBall.getX() + (_vStickDirection.getX() * _iDistFromBlankBall),
                                                                        _oCueBall.getY() + (_vStickDirection.getY() * _iDistFromBlankBall) );
                                        
                                }
                        }
                        //move stick
                        _oStick.setPos(_oCueBall.getX(),_oCueBall.getY());
                        
                        var iAngle = toDegree( angleBetweenVectors( _vStickInitDir,_vStickDirection ) );
         
                        var vLocalPos = {
                                            x: _vStickDirection.getX()* 1280 + _oCueBall.getX(),
                                            y: _vStickDirection.getY()* 1280 + _oCueBall.getY()
                                        };
                       
                        if ( vLocalPos.y > _oCueBall.getY() ){
                                iAngle = (180-iAngle)+180;
                        }
                        _oStick.setRotation(iAngle+180);
                }		
        }else{
            _oStick.setPos(_oCueBall.getX() + (_vInvStickDirection.getX() * _iPowerShot),_oCueBall.getY() + (_vInvStickDirection.getY() * _iPowerShot));
        }
    };
    
    this.updateStick = function(){
        var vTmpMouse = new CVector2();
        var vLocalPos = _oContainer.globalToLocal(s_oStage.mouseX,s_oStage.mouseY);

        vTmpMouse.set( vLocalPos.x, vLocalPos.y);
        if ( _bHoldStick === false ){		
                if ( _bReadyForShot === true ){
                        _iTimeAnimStick += s_iTimeElaps; 
          
                        if ( _iTimeAnimStick > _iMaxTimeAnimationStick ){
                                _iTimeAnimStick = _iMaxTimeAnimationStick;
                        }
                }else{
                    var bDirByMouse = !s_bMobile && _oCueBall.isBallOnTable();
                    if(bDirByMouse){
                        _vStickDirection.setV(vTmpMouse);
                        _vStickDirection.subtract(_oCueBall.getPos());
                    }
                    _iDistFromBlankBall = _vStickDirection.length();
                    if(bDirByMouse){
                        _vStickDirection.normalize();
                    }
                    _vInvStickDirection.setV(_vStickDirection);
                    _vInvStickDirection.invert();
                }
        }else if(!s_bMobile){
            
            vTmpMouse.subtract(_vMousePosAtHoldStick);
            var iPowerShot = vTmpMouse.length();
            this.holdShotStickMovement(iPowerShot);
        }
    };
    
    this.holdShotStickMovement = function(iPowerShot){
        
        _iPowerShot = iPowerShot;
        if ( _iPowerShot > MAX_POWER_SHOT ){
                _iPowerShot = MAX_POWER_SHOT;
        }
        _iMaxTimeAnimationStick = _iPowerShot>100 ? TIME_ANIMATION_SHOT_ELASTIC :TIME_ANIMATION_SHOT_BACK;  
    };
    
    this.renderBalls = function(){
        for ( var i = 0; i < _aBalls.length; i++ ){
            if ( (s_iPlayerMode === GAME_MODE_CPU) && (s_oGame.getCurTurn() === 2) ) {
                    _aBalls[i].render(true);
            }else {
                    _aBalls[i].render(false);
            }

            if(i=== 8){
                //_oScenario.move3DBalls(i,_aBalls[i].getPos());
            }
        }
    };
    
    //re-spot the cue ball after a foul
    this.respotCueBall = function() {	
	_oCueBall.setDragging(true);	
        _iState = STATE_TABLE_PLACE_CUE_BALL;
        _oContainerUpperBumper.visible = false;
        _oContainerDownBumper.visible = true;
     
        var bIsCpu = ((s_iPlayerMode === GAME_MODE_CPU) && (s_oGame.getCurTurn() === 2));
        if(!bIsCpu){
            _iPrevState = _iState;
            _oCueBall.setPos(CUE_BALL_POS.x,CUE_BALL_POS.y);
            _oStick.setVisible(true);
            _oHandCueBallDrag.setPos(_oCueBall.getX(), _oCueBall.getY(0));
            _oHandCueBallDrag.show();
        }
    };
    
    this.rotateStick = function(fAngleOffset){
        if(
            (_iState === STATE_TABLE_SHOOT || _iState === STATE_TABLE_SHOOTING) 
            || (s_iPlayerMode === GAME_MODE_CPU) && (s_oGame.getCurTurn() === 2)
            || _bReadyForShot){
            return;
        }
      
        rotateVector2D(
                        toRadian(fAngleOffset),
                        _vStickDirection
                      );
        this.updateStick();
        this.renderStickDirection();
    };
    
    //check player fault
    this. checkTurn = function() {
            //m_bTargetting = false;	
            var bFault = false;
            var bTurnChanged = false;
            var bEndGame = false;
            switch(s_iGameMode) {
                    case GAME_MODE_NINE: {
                            var oBallCollided = _aCueBallCollision[0];
                            //if cue ball hit for first the lowerest numbered ball
                            if (_aCueBallCollision.length > 0 && oBallCollided.getNumber() === _iLowestBall) {					
                                    if( _bCueBallInHole){
                                            _bCueBallInHole = false;
                                            s_oGame.changeTurn();
                                            this.respotCueBall();
                                            if (_aBalls[9].isBallOnTable() === false) {
                                                    var bSpotted = false;
                                                    var iXOffset = 0;
                                                    while(!bSpotted){
                                                            _aBalls[9].setPos( RACK_POS[4].x + iXOffset, RACK_POS[4].y);
                                                            bSpotted = true;
                                                            for (var k = 0; k < 8; k++) {
                                                                    var tmpDist = distance2( _aBalls[9].getPos(), _aBalls[k].getPos() );
                                                                    if ( tmpDist <= BALL_DIAMETER_QUADRO ) {
                                                                            bSpotted = false;
                                                                            break;
                                                                    }
                                                                    iXOffset += BALL_RADIUS;
                                                            }
                                                    }
                                                    _aBalls[9].setFlagOnTable(true);
                                                    _aBalls[9].setVisible(true);
                                            }
                                    }else if (_aBallsInHoleInCurShot.length > 0) {
                                            for (var i = 0; i < _aBallsInHoleInCurShot.length; i++) {
                                                    if (_aBallsInHoleInCurShot[i] == 9) {	
                                                            _bForceStopStick = true;
                                                            _aBalls[9].setVisible(true);
                                                            if ( s_iPlayerMode == GAME_MODE_CPU) {
                                                                    if (s_oGame.getCurTurn() == 2) {
                                                                            if(_aCbCompleted[ON_END_GAME]){
                                                                                _aCbCompleted[ON_LOST].call(_aCbOwner[ON_LOST]);
                                                                            }
                                                                            s_oGame.resetWinStreak();
                                                                    }else {
                                                                            if(_aCbCompleted[ON_WON]){
                                                                                _aCbCompleted[ON_WON].call(_aCbOwner[ON_WON],"YOU");
                                                                            }						
                                                                            s_oGame.increaseWinStreak();
                                                                    }

                                                            }else {
                                                                    if (s_oGame.getCurTurn() == 1) {
                                                                  
                                                                            if(_aCbCompleted[ON_WON]){
                                                                                _aCbCompleted[ON_WON].call(_aCbOwner[ON_WON],s_oGame.getPlayer1Name());
                                                                            }
                                                                    }else {
                                                                            if(_aCbCompleted[ON_WON]){
                                                                                _aCbCompleted[ON_WON].call(_aCbOwner[ON_WON],s_oGame.getPlayer2Name());
                                                                            }
                                                                    }
                                                            }

                                                            return;
                                                    }
                                            }
                                            //m_bTargetting = true;
                                            _oStick.setVisible(true);
                                    }else {
                                            s_oGame.changeTurn();
                                            //m_bTargetting = true;
                                            _oStick.setVisible(true);		
                                    }
                                    _bFirstShot = false;
                            }else {		
                                    if (_bFirstShot) {
                                            _oCueBall.setPos(CUE_BALL_POS.x, CUE_BALL_POS.y);
                                            s_oGame.changeTurn();
                                            this.targetting(true);
                                    }else {
                                            //if player pot 9ball, we re-spot the 9 ball
                                            if (_aBalls[9].isBallOnTable() == false) {
                                                    var bSpotted = false;
                                                    var iXOffset = 0;
                                                    while(!bSpotted){
                                                            _aBalls[9].setPos( RACK_POS[4].x + iXOffset, RACK_POS[4].y);
                                                            bSpotted = true;
                                                            for (var k = 0; k < 8; k++) {
                                                                    var tmpDist = distance2( _aBalls[9].getPos(), _aBalls[k].getPos() );
                                                                    if ( tmpDist <= BALL_DIAMETER_QUADRO ) {
                                                                            bSpotted = false;
                                                                            break;
                                                                    }
                                                                    iXOffset += BALL_RADIUS;
                                                            }
                                                    }
                                                    _aBalls[9].setFlagOnTable(true);
                                                    _aBalls[9].setVisible(true);
                                            }
                                            s_oGame.changeTurn();
                                            this.respotCueBall();
                                            _bFirstShot = false;
                                    }
                                    _bCueBallInHole = false;
                            }
                            _aCueBallCollision.splice(0);
                            _aBallsInHoleInCurShot.splice(0);

                            break;
                    }
                    case GAME_MODE_EIGHT: {								
                            //if 8 ball has been potted	
                            //console.log("8 Sul Tavolo: " + _aBalls[8].isBallOnTable());
                            //console.trace("CHECK TURN");
                            
                            if( _aBalls[8].isBallOnTable() === false){
                                    if (_aBallsToPotPlayers[s_oGame.getCurTurn()-1] === 0) {
                                            bEndGame = true;
                                            if ( s_iPlayerMode == GAME_MODE_CPU) {
                                                    if (s_oGame.getCurTurn() == 2) {
                                                            if(_aCbCompleted[ON_LOST]){
                                                                _aCbCompleted[ON_LOST].call(
                                                                                                _aCbOwner[ON_LOST],
                                                                                                TEXT_GAME_OVER,
                                                                                                _iShotPoints
                                                                                            );
                                                            }
                                                            s_oGame.resetWinStreak();
                                                    }else {
                                                            if(_aCbCompleted[ON_WON]){
                                                                _aCbCompleted[ON_WON].call(
                                                                                            _aCbOwner[ON_WON],
                                                                                            TEXT_YOU_WON,
                                                                                            _iShotPoints
                                                                                           );
                                                            }
                                                       							
                                                            s_oGame.increaseWinStreak();
                                                    }
                                            }else {
                                                
                                                    if (s_oGame.getCurTurn() === 1) {
                                                        if(_aCbCompleted[ON_WON]){
                                                            _aCbCompleted[ON_WON].call(
                                                                                        _aCbOwner[ON_WON],
                                                                                        sprintf(TEXT_PLAYER_NAME_WON,  s_oGame.getPlayer1Name()),
                                                                                        _iShotPoints
                                                                                       );
                                                        }
                                                    }else {
                                                        if(_aCbCompleted[ON_WON]){
                                                            _aCbCompleted[ON_WON].call(
                                                                                        _aCbOwner[ON_WON],
                                                                                        sprintf(TEXT_PLAYER_NAME_WON,  s_oGame.getPlayer2Name()),
                                                                                        _iShotPoints
                                                                                       );
                                                        }
                                                    }
                                            }
                                    }else {
                                            if ( s_iPlayerMode == GAME_MODE_CPU) {
                                                    if (s_oGame.getCurTurn() == 2) {	
                                                        if(_aCbCompleted[ON_WON]){
                                                            _aCbCompleted[ON_WON].call(_aCbOwner[ON_WON], TEXT_YOU_WON, _iShotPoints);
                                                        }						
                                                        s_oGame.increaseWinStreak();
                                                    }else {
                                                        if(_aCbCompleted[ON_LOST]){
                                                            _aCbCompleted[ON_LOST].call(
                                                                                            _aCbOwner[ON_LOST],
                                                                                            TEXT_GAME_OVER,
                                                                                            _iShotPoints
                                                                                        );
                                                        }
                                                        s_oGame.resetWinStreak();
                                                    }
                                            }else {
                                                    if (s_oGame.getCurTurn() == 1) {
                                                        if(_aCbCompleted[ON_WON]){
                                                            _aCbCompleted[ON_WON].call(
                                                                                            _aCbOwner[ON_WON],
                                                                                            sprintf(TEXT_PLAYER_NAME_WON,  s_oGame.getPlayer2Name()),
                                                                                            _iShotPoints
                                                                                       );
                                                        }
                                                    }else {
                                                        if(_aCbCompleted[ON_WON]){
                                                            _aCbCompleted[ON_WON].call(
                                                                                            _aCbOwner[ON_WON],
                                                                                            sprintf(TEXT_PLAYER_NAME_WON,  s_oGame.getPlayer1Name()),
                                                                                            _iShotPoints
                                                                                       );
                                                        }
                                                    }
                                            }
                                    }
                                    return;
                            }
                            //if cue ball has been potted
                            if ( _bCueBallInHole) {
                                _bCueBallInHole = false;
                                s_oGame.changeTurn(true);
                                bTurnChanged = true;
                                bFault = true;
                                this._assignSuit();
                                this.respotCueBall();
                                for (var i = 0; i < _aBallsInHoleInCurShot.length; i++) {
                                    if (!s_oGame.isLegalShotFor8Ball(_aBallsInHoleInCurShot[i])) {
                                        _aBallsToPotPlayers[s_oGame.getNextTurn()-1]--;
                                    }else {
                                        _aBallsToPotPlayers[s_oGame.getCurTurn()-1]--;
                                    }
                                }
                            }else {
                                    //verify if it is a legal shot for the current player
                                   
                                    if( (_aCueBallCollision.length !== 0) && (s_oGame.isLegalShotFor8Ball(_aCueBallCollision[0].getNumber(),
                                                                        _aBallsToPotPlayers[s_oGame.getCurTurn()-1])) ){
                                            //verify if any ball has been potted
                                            if (_aBallsInHoleInCurShot.length > 0) {
                                                    //if suites has not been assigned
                 
                                                    if( this._assignSuit() ){
                                                            if (_aBallsToPotPlayers[s_oGame.getCurTurn()-1] == 0) {
                                                                s_oGame.setNextBallToHit(8);
                                                            }
                                                            //m_bTargetting = true;
                                                            _oStick.setVisible(!(s_iPlayerMode === GAME_MODE_CPU && s_oGame.getCurTurn() === 2));
                                                    }else{
                                                            //if a player pot first an opponent ball it's foul 
                                                            if (s_oGame.isLegalShotFor8Ball(_aBallsInHoleInCurShot[0])) {
                                                                    //console.log("FIRST BALL POTTED IS LEGAL");
                                                                    var bLegalShot = true;
                                                                    _aBallsToPotPlayers[s_oGame.getCurTurn()-1]--;
                                                                    if (_aBallsInHoleInCurShot.length > 1) {
                                                                            for (var i = 1; i < _aBallsInHoleInCurShot.length; i++) {
                                                                                    if (!s_oGame.isLegalShotFor8Ball(_aBallsInHoleInCurShot[i])) {
                                                                                            bLegalShot = false;
                                                                                        
                                                                                            _aBallsToPotPlayers[s_oGame.getNextTurn()-1]--;
                                                                                    }else {
                                                                                      
                                                                                            _aBallsToPotPlayers[s_oGame.getCurTurn()-1]--;
                                                                                    }
                                                                            }
                                                                            if (_aBallsToPotPlayers[s_oGame.getCurTurn()-1] == 0) {
                                                                                s_oGame.setNextBallToHit(8);
                                                                            }
                                                                            bFault = bLegalShot;
                                                                            if (!bLegalShot) {
                                                                                s_oGame.changeTurn(true);
                                                                                bTurnChanged = true;
                                                                            }
                                                                    }
                                                                   
                                                                    if (_aBallsToPotPlayers[s_oGame.getCurTurn()-1] == 0) {
                                                                            s_oGame.setNextBallToHit(8);
                                                                    }
                                                                    //m_bTargetting = true;
                                                                    _oStick.setVisible(!(s_iPlayerMode === GAME_MODE_CPU && s_oGame.getCurTurn() === 2));
                                                            }else {
                                                                s_oGame.changeTurn(true);
                                                                bTurnChanged = true;
                                                                bFault = true;
                                                                this.respotCueBall();
                                                                for (var i = 0; i < _aBallsInHoleInCurShot.length; i++) {
                                                                    if (!s_oGame.isLegalShotFor8Ball(_aBallsInHoleInCurShot[i])) {
                                                                            _aBallsToPotPlayers[s_oGame.getNextTurn()-1]--;
                                                                    }else {
                                                                            _aBallsToPotPlayers[s_oGame.getCurTurn()-1]--;
                                                                    }
                                                                }

                                                                if (_aBallsToPotPlayers[s_oGame.getCurTurn()-1] === 0) {
                                                                    s_oGame.setNextBallToHit(8);
                                                                }
                                                            }
                                                    }
                                            }else {
                                                    s_oGame.changeTurn(false);
                                                    bTurnChanged = true;
                                                    //m_bTargetting = true;                                                       	
                                                    _oStick.setVisible(!(s_iPlayerMode === GAME_MODE_CPU && s_oGame.getCurTurn() === 2));
                                            }
                                    }else {
                                            for (var i = 0; i < _aBallsInHoleInCurShot.length; i++) {
                                                    if (!s_oGame.isLegalShotFor8Ball(_aBallsInHoleInCurShot[i])) {
                                                            _aBallsToPotPlayers[s_oGame.getNextTurn()-1]--;
                                                    }else {
                                                            _aBallsToPotPlayers[s_oGame.getCurTurn()-1]--;
                                                    }
                                            }
                                           
                                            if (_aBallsToPotPlayers[s_oGame.getCurTurn()-1] == 0) {
                                                    s_oGame.setNextBallToHit(8);
                                            }
                                            s_oGame.changeTurn(true);
                                            bTurnChanged = true;
                                            bFault = true;
                                            this.respotCueBall();
                                    }
                            }
                        _aCueBallCollision.splice(0);
                        _aBallsInHoleInCurShot.splice(0);
                        break;
                    }
            }
            
            if(!_oCueBall.isDragging()){/*
                if (( s_iPlayerMode == GAME_MODE_CPU) && (s_oGame.getCurTurn() === 1)){
                    _iState = STATE_TABLE_MOVE_STICK;
                }else{
                    _iState = STATE_TABLE_SHOOT;
                }*/
              
                if(s_iPlayerMode === GAME_MODE_CPU){
                        if(s_oGame.getCurTurn() === 1){
                            _iPrevState = _iState = s_bMobile ? STATE_TABLE_MOVE_STICK : STATE_TABLE_MOVE_STICK;
                             s_oGame.showShotBar();
                        }else{
                            _iState = STATE_TABLE_SHOOT;
                            
                        }
                }else{
                  _iPrevState = _iState = s_bMobile ? STATE_TABLE_MOVE_STICK : STATE_TABLE_MOVE_STICK;
                   s_oGame.showShotBar();
                }
            }
            if(!(s_iPlayerMode === GAME_MODE_CPU && s_oGame.getCurTurn() === 2)){
                this.updateStick();
                this.renderStickDirection();
            }
            
            if(bTurnChanged){
                _iCpuShotTurn = 0;
                _iComboShots = 1;
            }
            
            var iPreTurn = bTurnChanged ? 2 : 1;
             if(s_iPlayerMode === GAME_MODE_CPU && s_oGame.getCurTurn() === iPreTurn){
                if(bFault){
                    _iShotPoints = POINTS_FOR_FAULT;
                }
                s_oGame.updateScore(_iShotPoints);
             }
             
            _iShotPoints = 0;
            return bEndGame;
    };
    
    this.isCpuTurn = function (){
        return (s_iPlayerMode === GAME_MODE_CPU && s_oGame.getCurTurn() === 2);
    };
    
    this.targetting = function(bValue) {
            //m_bTargetting = bValue;
            _oStick.setVisible(bValue);
    };
    
    this._assignSuit = function(){
        var bSuitToAssigned = ((_aBallsToPotPlayers[0] === 7) && (_aBallsToPotPlayers[1] === 7));
        if( bSuitToAssigned ){
            var iStripes = 0;
            var iSolid = 0;
            for (var k = 0; k < _aBallsInHoleInCurShot.length; k++) {
                    if (_aBallsInHoleInCurShot[k] > 8) {
                            iStripes++;
                    }else {
                            iSolid++;
                    }
            }

            //console.log("STRIPES: " + iStripes);
            //console.log("iSolid: " + iSolid);
            if (iStripes > iSolid) {
                    //console.log("ASSIGN STRIPES TO "+s_oGame.getCurTurn());
                    s_oGame.assignSuits(9);
                    for (var iCont = 0; iCont < iStripes; iCont++) {
                            _aBallsInHoleInCurShot[s_oGame.getCurTurn()-1]--;
                    }
                    for (var iCont2 = 0; iCont2 < iSolid; iCont2++) {
                            _aBallsInHoleInCurShot[s_oGame.getNextTurn()-1]--;
                    }
            }else {
                    //console.log("ASSIGN SOLID TO "+s_oGame.getCurTurn());
                    s_oGame.assignSuits(1);
                    for (var iCont = 0; iCont < iSolid; iCont++) {
                            _aBallsToPotPlayers[s_oGame.getCurTurn()-1]--;
                    }
                    for (var iCont2 = 0; iCont2 < iStripes; iCont2++) {
                            _aBallsToPotPlayers[s_oGame.getNextTurn()-1]--;
                    }
            }
        }
        return bSuitToAssigned;
    };
    
    this.prepareNextTurn = function() {
            _iTimeAnimStick = 0;

            _iCpuShotTurn ++;
            if(_iCpuShotTurn > _oCpuDifficultyParams.length-1){
                _iCpuShotTurn = _oCpuDifficultyParams.length-1;
            }
            var bEndGame = this.checkTurn();
            if ( (s_iPlayerMode == GAME_MODE_CPU) && (s_oGame.getCurTurn() === 2) && !bEndGame) {
                    //m_bTargetting = true;

                    setTimeout(function(){s_oTable.calculateCpuShot();},2000);
            }
            
            _aBallsInHoleInCurShot.splice(0);
    };
    
    //cpu shot
    this.calculateCpuShot = function(){
            var bSuccess = true;
            switch(s_iGameMode){
                    case GAME_MODE_NINE: {													
                            var aEdges = _oPhysicsController.getEdges();
/*
                            //try to pot nine ball
                            if(_iLowestBall !== 9){
                                    var oHole = this.setHoleToAim(_aBalls[_iLowestBall],_aBalls[9], 9,aEdges);					
                                    if (oHole !== null) {
                                            var vCollPoint = new CVector2();
                                            vCollPoint.setV(this.findCollisionPoint((oHole.coll).getX(), (oHole.coll).getY(), _aBalls[_iLowestBall]) );
                                            if (_oCueBall.isDragging()) {
                                                    bSuccess = this.respotCpuCueBall(vCollPoint);
                                            }
                                            if( bSuccess && (!this.findCollisionForCueBall(vCollPoint)) ){
                                                    bSuccess = false;	
                                            }

                                    }else {
                                            bSuccess = false;
                                    }
                            }else {
                                    bSuccess = false;
                            }

                            
                            if(!bSuccess){*/
                                    var oHole= this.setHoleToAim(_oCueBall, _aBalls[_iLowestBall], _iLowestBall,aEdges);
                                    if (oHole !== null) {
                                            bSuccess = true;
                                            if (_oCueBall.isDragging()) {
                                                    bSuccess = this.respotCpuCueBall(oHole.coll);
                                            }
                                            if( (bSuccess && (!this.findCollisionForCueBall(oHole.coll)) ) ){	
                                                    bSuccess = false;
                                            }	
                                    }else {
                                            bSuccess = false;
                                    }
                            //}

                            //try to pot a ball numbered from the lowest+1 to 8 using the lowest numbered ball
                            if (!bSuccess) {
                                    for (var h = _iLowestBall + 1; h < BALL_NUMBER+1;h++){
                                            var oHole = this.setHoleToAim(_aBalls[_iLowestBall],_aBalls[h], h,aEdges);
                                            if (oHole != null) {
                                                    var vCollPoint = new CVector2();
                                                    vCollPoint.setV(this.findCollisionPoint((oHole.coll).getX(), (oHole.coll).getY(), _aBalls[_iLowestBall]) );
                                                    
                                                    if (_oCueBall.isDragging() ) {
                                                            bSuccess = this.respotCpuCueBall(vCollPoint);
                                                    }else {
                                                            bSuccess = true;
                                                    }
                                                    if (bSuccess) {
                                                            if (!this.findCollisionForCueBall(vCollPoint)) {
                                                                    bSuccess = false;	
                                                            }else {
                                                                    bSuccess = true;
                                                                    break;
                                                            }
                                                    }

                                            }else {
                                                    bSuccess = false;
                                            }
                                    }
                            }				

                            //try to pot using cushions
                            if (!bSuccess) {
                                    var aHoles = new Array();
                                    //in this array we store the total distance the cue ball cover for each hole
                                    var aTotalDist = new Array();
                                    var aShots = new Array();
                                    aHoles = this.setAllHolesToAim(_oCueBall, _aBalls[_iLowestBall], _iLowestBall,aEdges);
                                    var vProjectDir = new CVector2();
                                    //console.log(aHoles)
                                    for (var t = 0; t < aHoles.length; t++) {
                                            //init total distance for each adding distance from hole to lowest ball
                                            aTotalDist[t] = aHoles[t].dist;
                                            //get collision point for the current hole
                                            var vCollision = new CVector2();
                                            vCollision.setV(aHoles[t].coll);
                                            
                                            bSuccess = true;
                                            if (_oCueBall.isDragging()) {
                                                    bSuccess = this.respotCpuCueBall(vCollision);
                                            }
                                            if(bSuccess){
                                                    //verify if we can shot using the top left cushion of table 
                                                    vProjectDir.set(0, -1);

                                                    //collect all the table edges							
                                                    aShots[t] = this._getEdgeShot(vCollision, vProjectDir, aEdges);
                                                    //update total distance of best shot for current hole
                                                    if (aShots[t] === undefined) {
                                                            aTotalDist[t] += 9000;
                                                            bSuccess = false;
                                                    }else{
                                                            aTotalDist[t] += aShots[t].dist;
                                                            bSuccess = true;
                                                    }
                                            }
                                    }
                                    //console.log("aTotalDist "+aTotalDist)
                                    if (!bSuccess) {
                                            //if any previous shot is unsuccesful, cpu simply shot towards lowest numbered ball direction
                                            var vDir = new CVector2();
                                            vDir.setV(_aBalls[_iLowestBall].getPos());
                                            vDir.subtract(_oCueBall.getPos());
                                            vDir.normalize();
                                            if (_oCueBall.isDragging()) {
                                                    _oCueBall.setPos( CUE_BALL_POS.x, CUE_BALL_POS.y );
                                            }
                                            this.cpuShot(vDir);
                                    }else{
                                            var iMinDist = aTotalDist[0];
                                            var iSelected = 0;
                                            for (var x = 1; x < aTotalDist.length; x++) {
                                                    if (aTotalDist[x] < iMinDist) {
                                                            iMinDist = aTotalDist[x];
                                                            iSelected = x;
                                                    }
                                            }
                                            this.cpuShot(aShots[iSelected].dir);
                                    }

                            }	
                            break;
                    }
                    case GAME_MODE_EIGHT: {
                            bSuccess = false;
                            
                            var aEdges = _oPhysicsController.getEdges();
                         
                            if (_aBallsToPotPlayers[s_oGame.getCurTurn()-1] === 0) {
                                    //try to pot 8Ball
                                    var oHole = this.setHoleToAim(_aBalls[0], _aBalls[8], 8, aEdges);
                                    //console.log("oHole: " + oHole);
                                    if (oHole !== null) {
                                            bSuccess = true;
                                            if (_aBalls[0].isDragging()) {
                                                    bSuccess = this.respotCpuCueBall(oHole.coll,8);
                                            }
                                            if( (bSuccess && (!this.findCollisionForCueBall(oHole.coll, _aBalls[8], new CVector2(oHole.hole.x, oHole.hole.y))) ) ){	
                                                    bSuccess = false;
                                            }	
                                    }else {
                                            bSuccess = false;
                                    }
                                    if (!bSuccess) {
                                            var aHoles = new Array();
                                            //in this array we store the total distance the cue ball cover for each hole
                                            var aTotalDist = new Array();
                                            var aShots = new Array();
                                            aHoles = this.setAllHolesToAim(_aBalls[0], _aBalls[8], 8,aEdges);
                                            var vProjectDir = new CVector2();

                                            for (var t = 0; t < aHoles.length; t++) {
                                                    //init total distance for each adding distance from hole to current ball
                                                    aTotalDist[t] = aHoles[t].dist;
                                                    //get collision point for the current hole
                                                    var vCollision = new CVector2();
                                                    vCollision.setV(aHoles[t].coll);
                                                    if (_oCueBall.isDragging()) {
                                                            bSuccess = this.respotCpuCueBall(vCollision,8);
                                                    }else {
                                                            bSuccess = true;
                                                    }
                                                    if(bSuccess){
                                                            bSuccess = this.prepareEdgeShot(t,vCollision, vProjectDir, aEdges,aTotalDist);
                                                    }
                                            }
                                            if (!bSuccess) {
                                                    //if any previous shot is unsuccesful, cpu simply shot towards a ball direction
                                                    var oSelectedBall;
                                                    var vDir = new CVector2();
                                                    vDir.setV(_aBalls[8].getPos());
                                                    vDir.subtract(_aBalls[0].getPos());
                                                    vDir.normalize();
                                                    if (_aBalls[0].isDragging()) {
                                                            _aBalls[0].setPos( CUE_BALL_POS.x, CUE_BALL_POS.y );
                                                    }
                                                    this.cpuShot(vDir);
                                            }
                                    }
                            }else {
                                    //store all the balls a player can legally pot
                                    var iStart = 1;
                                    var iEnd = BALL_NUMBER + 1;
                                    var aBalls = new Array();
                                    if (s_oGame.isSuiteAssigned()) {
                                            if (s_oGame.getSuiteForCurPlayer() == "solid") {
                                                    iStart = 1;
                                                    iEnd = 9;
                                            }else {
                                                    iStart = 9;
                                                    iEnd = 16;
                                            }	
                                    }
                                    for (var k = iStart; k < iEnd; k++) {
                                            if( (k !== 8) && (_aBalls[k].isBallOnTable() ) ){
                                                    aBalls.push(_aBalls[k]);
                                            }
                                    }
                                          
                                    for (var t = 0; t < aBalls.length; t++) {
                                            var oHole= this.setHoleToAim(_aBalls[0], aBalls[t], aBalls[t].getNumber(),_aFieldEdges);
           
                                            if (oHole !== null) {
                                                    bSuccess = true;
                                                    
                                                    if(DEBUG_SHOW_CPU_BALL_TRAJECTORY){
                                                        console.log("palla : " + aBalls[t].getNumber());
                                                        console.log(oHole);
                                                        console.log("*********");

                                                        var oPosBallToCollide = {x: oHole.coll.getX(), y: oHole.coll.getY()};
                                                        _oContainer.addChild(createGraphicCircle(oPosBallToCollide, 6, 10000, "#fff"));

                                                        _oContainer.addChild(createGraphicLine(
                                                                                                oPosBallToCollide,
                                                                                                oHole.hole,
                                                                                                3,
                                                                                                10000,
                                                                                                "#fff"
                                                                                            ));
                                                    }
                                                    
                                                    if (_oCueBall.isDragging()) {
                                                            bSuccess = this.respotCpuCueBall(oHole.coll,aBalls[t].getNumber());
                                                    }
                                                    if( (bSuccess && (!this.findCollisionForCueBall(oHole.coll, aBalls[t], new CVector2(oHole.hole.x, oHole.hole.y))) ) ){	
                                                            bSuccess = false;
                                                    }else {
                                                            break;
                                                    }
                                            }else {
                                                    bSuccess = false;
                                            }
                                    }
                                    
                                    if (!bSuccess) {					
                                            for (var k = 0; k < aBalls.length; k++) {
                                                 
                                                    var aHoles = new Array();
                                                    //in this array we store the total distance the cue ball cover for each hole
                                                    var aTotalDist = new Array();   
                                                    
                                                    aHoles = this.setAllHolesToAim(_oCueBall, aBalls[k], k,aEdges);
                                                    var vProjectDir = new CVector2();
                                                    for (var t = 0; t < aHoles.length; t++) {
                                                            //init total distance for each adding distance from hole to lowest ball
                                                            aTotalDist[t] = aHoles[t].dist;
                                                            //get collision point for the current hole
                                                            var vCollision = new CVector2();
                                                            vCollision.setV(aHoles[t].coll);
                                                      
                                                            if (_oCueBall.isDragging()) {
                                                                    bSuccess = this.respotCpuCueBall(vCollision,aBalls[k].getNumber());
                                                            }else {
                                                                    bSuccess = true;
                                                            }
                                                            
                                                            if(bSuccess){
                                                                bSuccess = this.prepareEdgeShot(t,vCollision, vProjectDir, aEdges,aTotalDist);
                                                            }
                                                    }
                                            }
                                    }
                                   
                                    if (!bSuccess) {
                                        //if any previous shot is unsuccesful, cpu simply shot towards a ball direction
                                        var oSelectedBall;
                                        for (var k = iStart; k < iEnd; k++) {
                                            if( (k !== 8 || _aBallsToPotPlayers[s_oGame.getCurTurn()-1] === 0)
                                                && (_aBalls[k].isBallOnTable() ) ){
                                                var bCollision = false;
                                                
                                                var oEdgeCueToBall= new CEdge();
                                                oEdgeCueToBall.set(_oCueBall.getX(), _oCueBall.getY(), _aBalls[k].getX(), _aBalls[k].getY());
                                                oSelectedBall = _aBalls[k];
                                                
                                                for (var j = 1; j < (BALL_NUMBER+1); j++) {
                                                    if ( (j !== k) &&( collideEdgeWithCircle(oEdgeCueToBall,_aBalls[j].getPos(),BALL_DIAMETER) )  ) {
                                                        bCollision = true;
                                                        break;
                                                    }
                                                }
                                                if(!bCollision){
                                                    break;
                                                }
                                            }
                                        }
                                        var vDir = new CVector2();
                                        vDir.setV(oSelectedBall.getPos());
                                        vDir.subtract(_oCueBall.getPos());
                                        vDir.normalize();

                                        if (_oCueBall.isDragging()) {
                                                _oCueBall.setPos( CUE_BALL_POS.x, CUE_BALL_POS.y );
                                        }
                                        this.cpuShot(vDir);
                                    }
                            }
                            break;
                    }
            }            
    };
    
    //this function respot ball for CPU if previous player commited a fault
    this.respotCpuCueBall = function(vCollPoint,iBallToHit) {
            var iBallIndex;
            switch(s_iGameMode) {
                    case GAME_MODE_NINE: {
                            iBallIndex = _iLowestBall;
                            break;
                    }
                    case GAME_MODE_EIGHT: {
                            iBallIndex = iBallToHit;
                            break;
                    }
            }
            var vCueBallPos = new CVector2();
            vCueBallPos.setV(_aBalls[iBallIndex].getPos());
            vCueBallPos.subtract(vCollPoint);
            vCueBallPos.normalize();
            vCueBallPos.invert();
            vCueBallPos.scalarProduct(BALL_DIAMETER * 2);
            vCueBallPos.add(vCollPoint);
         
            for (var k = iBallIndex+1; k < _aBalls.length;k++){
                    var tmpDist = distance2( vCueBallPos, _aBalls[k].getPos() );
                    if ( tmpDist <= BALL_DIAMETER_QUADRO) {
                            return false;
                    }
            }
            
            if ( (vCueBallPos.getX() > CUE_BALL_RESPOT_1.x) &&
                     (vCueBallPos.getX() < CUE_BALL_RESPOT_3.x) &&
                     (vCueBallPos.getY() > CUE_BALL_RESPOT_1.y) &&
                     (vCueBallPos.getY() < CUE_BALL_RESPOT_3.y) ){

                    _oCueBall.setPos(vCueBallPos.getX(), vCueBallPos.getY());
                    _oCueBall.setDragging(false);
                    return true;	 
            }else {
                    console.trace("no respotCpuCueBall "+vCueBallPos.getX()+","+vCueBallPos.getY());
                    return false;
            }
    };
    
    //find the collision point for a cpu shot
    this.findCollisionPoint = function(oXFirst,oYFirst,oSecond) {
                
        var vDirToHole = new CVector2();
        vDirToHole.set(oXFirst,oYFirst);  

        vDirToHole.subtract(oSecond.getPos());

        vDirToHole.normalize();
              
        vDirToHole.invert();
        var vCollisionPoint = new CVector2();

        var fErrorRatio = randomFloatBetween(
                                                _oCpuDifficultyParams[_iCpuShotTurn].min,
                                                _oCpuDifficultyParams[_iCpuShotTurn].max
                                            );
                                    
        vDirToHole.scalarProduct(BALL_DIAMETER * fErrorRatio);

        vDirToHole.add(oSecond.getPos());

        vCollisionPoint.setV(vDirToHole);

        return vCollisionPoint;
    };
    
    //manage stick animation for a cpu shot
    this.cpuShot = function(vCueBallDir, fDistance = MAX_FORCE_PER_DISTANCE) {
        //console.trace("cpuShot");
     
        
        fDistance = fDistance > MAX_FORCE_PER_DISTANCE ? MAX_FORCE_PER_DISTANCE : fDistance;
        _iPowerShot = linearFunction(
                                        fDistance,
                                        0, MAX_FORCE_PER_DISTANCE,
                                        3, MAX_POWER_SHOT
                                    );
        //_iPowerShot = MAX_POWER_SHOT;
      //  console.log(_iPowerShot);
        _vStickDirection.setV(vCueBallDir);

        _iMaxTimeAnimationStick = _iPowerShot>100 ? TIME_ANIMATION_SHOT_ELASTIC :TIME_ANIMATION_SHOT_BACK;

        _oStick.setPos(_aBalls[0].getX(),_aBalls[0].getY());

        _bHoldStick = true;
        var vStickInverse = new CVector2();
        vStickInverse.setV(_vStickDirection);
        vStickInverse.invert();
        vStickInverse.normalize();
        vStickInverse.scalarProduct(Math.floor(_iPowerShot / 10) );
        var vStickPos = new CVector2();
        vStickPos.set(_oStick.getX(), _oStick.getY());
        vStickInverse.add(vStickPos);
        var iAngle = toDegree( angleBetweenVectors( _vStickInitDir,_vStickDirection ) );

        if ( vCueBallDir.getY() >0 ){
                iAngle = (180-iAngle)+180;
        }
        _oStick.setRotation(iAngle+180);
        _oStick.setVisible(true);
        _oStick.setPos(vStickInverse.getX(),vStickInverse.getY());

        _bHoldStick = false;
        _bReadyForShot = true;
        _iState = STATE_TABLE_SHOOT;
           
    };
    
    //find collision point between lowest ball and cue ball	
    this.findCollisionForCueBall = function(vCollPoint, oBallToPot, oHolePoint) {
            if (!this._checkCpuBallCollision(vCollPoint,_oCueBall.getPos(),0,0,new Array())) {
//                    console.log("BallToHole: " + distance(oBallToPot, oHolePoint));
//                    console.log("CueToBall: " +  distance(oBallToPot, _oCueBall.getPos()));
                    
                    var fDistance = distance(oBallToPot, oHolePoint) + distance(oBallToPot, _oCueBall.getPos());
                    
                    var vCueBallDir = new CVector2();
                    vCueBallDir.setV(vCollPoint);
                    vCueBallDir.subtract(_oCueBall.getPos());

                    vCueBallDir.scalarProduct(0.3);
                    
                    vCueBallDir.normalize();
                    this.cpuShot(vCueBallDir, fDistance);
                    
                    return true;
            }else {
                    return false;
            }

    };
    
    //get all the possible holes in which you can pot lowest ball
    this.setAllHolesToAim = function(oBall, oBallToHit, iNumber,aEdges) {
            var aProbableHole = new Array();

            //find the hole we want to aim
            for (var i = 0; i < HOLE_CPU_POINTS.length; i++) {
                var oEdgeWithHole = new CEdge();
                //console.log("HOLE "+i)
                oEdgeWithHole.set(oBallToHit.getX(), oBallToHit.getY(), HOLE_CPU_POINTS[i].x, HOLE_CPU_POINTS[i].y);
                var iDist = distance(oEdgeWithHole.getPointA(), oEdgeWithHole.getPointB());					

                var bCollision = false;
                //verify if there are other balls between ball to pot and the current hole
                for (var j = 0; j < (BALL_NUMBER+1); j++) {
                        if ( (j != iNumber) &&( collideEdgeWithCircle(oEdgeWithHole,_aBalls[j].getPos(),BALL_DIAMETER) )  ) {
                                bCollision = true;
                                //console.log("collision with "+j)
                                break;
                        }
                }	
                //verify if current ball path is far from cushions
                for (var k = 0; k < aEdges.length; k++) {
                        if (collideEdgeWithEdge(oEdgeWithHole, aEdges[k])) {
                                bCollision = true;
                                //console.log("hit edge "+k)
                                break;
                        }
                }

                if (!bCollision) {

                        //we find the dir to the hole 
                        aProbableHole.push( { //hole:this["oHole" + i],
                                                                  coll:this.findCollisionPoint(HOLE_CPU_POINTS[i].x, HOLE_CPU_POINTS[i].y, oBallToHit),
                                                                  dist:iDist});
                        //console.log("add aProbableHole");
                }
            }

            if (aProbableHole.length !== 0) {
                var iLen = aProbableHole.length;
                var iInd = 0;
                while(iLen>0) {
                    var vCollPoint = aProbableHole[iInd].coll;
                    var bSuccess = true;
                    if ( (oBall.getNumber() === 0) && (oBall.isDragging()) ) {
                            bSuccess=this.respotCpuCueBall(vCollPoint,oBallToHit.getNumber());
                    }
                    if( (!bSuccess) || (this._checkCpuBallCollision(vCollPoint,oBall.getPos(),oBall.getNumber(),iNumber, new Array())) ){
                            aProbableHole.splice(iInd, 1);
                    }else {
                            iInd++;
                    }
                    iLen--;
                }
            }else {
                    return [];
            }
            return aProbableHole;

    };
        
    //first parameter: first ball
    //second parameter: ball to hit
    //third parameter: number of ball to hit
    //array with all table edges
    this.setHoleToAim = function(oBall,oBallToHit,iNumber,aEdges) {
            var aProbableHole = new Array();

            var iCollisionRadiusDetect = BALL_RADIUS*1.1;
            //find the hole we want to aim
            for (var i = 0; i < 6; i++) {
                   
                    var oEdgeWithHole = new CEdge();
                    oEdgeWithHole.set(oBallToHit.getX(), oBallToHit.getY(), HOLE_CPU_POINTS[i].x, HOLE_CPU_POINTS[i].y);
                    var iDist = distance2(oEdgeWithHole.getPointA(), oEdgeWithHole.getPointB());					
                    
                    var bCollision = false;
                    //verify if there are other balls between ball to pot and the current hole
                    for (var j = 0; j < (BALL_NUMBER+1); j++) {
                            if ( (j != iNumber) &&( collideEdgeWithCircle(oEdgeWithHole,_aBalls[j].getPos(),BALL_DIAMETER) )  ) {
                                    bCollision = true;
                          
                                    break;
                            }
                    }	
                    for (var k = 0; k < aEdges.length; k++) {
                            if (collideEdgeWithEdge(oEdgeWithHole, aEdges[k])) {
                                    bCollision = true;
                               
                                    break;
                            }
                    }
                    
                    var aPoints = lineInterpolate(oEdgeWithHole, iCollisionRadiusDetect, 3);
                    var aEdges = _oPhysicsController.getEdgesByHoleID(i);
//                    var vHolePoint = new CVector2(HOLE_CPU_POINTS[i].x, HOLE_CPU_POINTS[i].y);
//                    aPoints.push(vHolePoint);
                    
                    for(var n = 0; n < aPoints.length; n++){
                        if(bCollision){
                            break;
                        }
                        for(var m = 0; m < aEdges.length; m++){
                            bCollision = collideEdgeWithCircle(aEdges[m], aPoints[n], iCollisionRadiusDetect);
                            if(bCollision){
                                if(DEBUG_SHOW_PREDICT_TRAJECTORY_COLLISION){
                                    _oContainer.addChild(
                                                            createGraphicLine(
                                                                    {x:oBallToHit.getX(), y:oBallToHit.getY() },
                                                                    HOLE_CPU_POINTS[i],
                                                                    3,
                                                                    6000,
                                                                    "#f0f"
                                                            ));
                                    _oContainer.addChild(createGraphicCircle(
                                                                                {x:aPoints[n].getX(), y: aPoints[n].getY()},
                                                                                iCollisionRadiusDetect,
                                                                                6000,
                                                                                "#0ff"
                                                                             ));  
                                }
                                break;
                            }                                 
                        }
                    }
                    
                    if (!bCollision) {
                        //we find the dir to the hole
                        var oBallCollPoint = this.findCollisionPoint(HOLE_CPU_POINTS[i].x, HOLE_CPU_POINTS[i].y, oBallToHit);

                        //DETECT IF CUE BALL COLLIDE WITH CUSHION BACKWARD SELECTED BALL
                        var aEdge = _oPhysicsController.getEdgesByHoleID(i);
                        var bCueWillCollideCuschion = false;
                        for(var j = 0; j< aEdge.length; j++){
                            if(collideEdgeWithCircle(aEdges[j], oBallCollPoint, BALL_RADIUS)){
                                bCueWillCollideCuschion = true;
                                break;
                            }
                         }   
                         
                        if(!bCueWillCollideCuschion){
                            aProbableHole.push({ 
                                                   hole:HOLE_CPU_POINTS[i],
                                                   coll:oBallCollPoint,
                                                   dist:iDist 
                                               });
                        }else{
                            if(DEBUG_SHOW_PREDICT_TRAJECTORY_COLLISION){
                                _oContainer.addChild(createGraphicCircle(
                                                                            {x: oBallCollPoint.getX(), y: oBallCollPoint.getY()},
                                                                            iCollisionRadiusDetect,
                                                                            6000,
                                                                            "#0f0"
                                                                         ));  
                            }
                        }
                    }
            }

            if (aProbableHole.length !== 0) {
                    //console.log(JSON.stringify(aProbableHole));
                    sortByKey(aProbableHole, "dist");
                    //console.log(JSON.stringify(aProbableHole));
                
                    var iLen = aProbableHole.length;
                    var iInd = 0;
                    while(iLen>0) {
                            var vCollPoint = aProbableHole[iInd].coll;
                            var bSuccess = true;
                            if ( oBall.getNumber() === 0 && oBall.isDragging() ) {
                                    bSuccess = this.respotCpuCueBall(vCollPoint,oBallToHit.getNumber());
                            }
                            if( (!bSuccess) || (this._checkCpuBallCollision(vCollPoint,oBall.getPos(),oBall.getNumber(),oBall.getNumber(), new Array())) ){
                                    aProbableHole.splice(iInd, 1);
                            }else {
                                    iInd++;
                            }
                            iLen--;
                    }
                    if (aProbableHole.length == 0) {
                            //set a shot to cushions
                            return null;
                    }else {
//                            var iMinDist = aProbableHole[0].dist;
                            var oHoleChoosen = aProbableHole[0];
//                            for (var k = 1; k < aProbableHole.length; k++) {
//                                    if (iMinDist > aProbableHole[k].dist) {
//                                            iMinDist = aProbableHole[k].dist;
//                                            oHoleChoosen = aProbableHole[k];
//                                    }
//                            }
                            return oHoleChoosen;
                    }

            }else {
                    return null;
            }

    };
    
    //cpu tries an edge shot
    //first: point where cue ball collide lowest ball
    //second:projection of collision point towards the cushion
    //third:all the edges to consider
    this._getEdgeShot = function(vCollision,vDir,aEdges) {
            var oCushionToConsider;
            var vCollPoint = new CVector2();
            vCollPoint.setV(vCollision);

            var iAngle = 1;
            var oEdgeCollPoint = new CEdge();

            vDir.scalarProduct(600);
            var aPossibleShots = new Array();

            while (iAngle < 360) {
                //console.log("#######ANGLE "+iAngle)
                    rotateVector2D(toRadian(1), vDir);
                    var vProjectedPoint = new CVector2();
                    vProjectedPoint.set(vCollPoint.getX() + vDir.getX(), vCollPoint.getY() + vDir.getY());
                    oEdgeCollPoint.set(vCollision.getX(), vCollision.getY(), vProjectedPoint.getX(), vProjectedPoint.getY());
                    var vPointOnCushion = new CVector2();

                    for (var k = 0; k < aEdges.length; k++) {
                            if (collideEdgeWithEdge(oEdgeCollPoint, aEdges[k], vPointOnCushion)) {
                                    oCushionToConsider = aEdges[k];
                                    var vDirReflected = new CVector2();
                                    vDirReflected.setV(reflectVectorV2(vDir, oCushionToConsider.getNormal()) );
                                    var oEdgeReflectVec = new CEdge();
                                    var vReflectedPoint = new CVector2();
                                    vReflectedPoint.setV(vDirReflected);
                                    vReflectedPoint.add(vPointOnCushion);
                                    oEdgeReflectVec.set(vPointOnCushion.getX(), vPointOnCushion.getY(), vReflectedPoint.getX(), vReflectedPoint.getY());
                                    var iDist2 = distance(vPointOnCushion, vCollision);
                                    //console.log("oEdgeReflectVec "+oEdgeReflectVec.getPointA().toString()+","+oEdgeReflectVec.getPointB().toString())
                                    if ( (iDist2 > BALL_DIAMETER ) && (collideEdgeWithCircle(oEdgeReflectVec, _oCueBall.getPos(), BALL_RADIUS)) ){
                                            var bCollision = false;

                                            if (this._checkCpuBallCollision(vPointOnCushion, _oCueBall.getPos(), 0, 0, new Array()) ) {
                                                    bCollision = true;
                                                    //console.log(k+ " 1 collision "+vPointOnCushion.getX()+","+vPointOnCushion.getY()+" and cue ball")
                                            }else if (this._checkCpuBallCollision(vCollision, vPointOnCushion, 0, 0, new Array()) ) {
                                                    bCollision = true;
                                                    //console.log(k+ " 2 collision "+vCollision.getX()+","+vCollision.getY()+" and "+vPointOnCushion.getX()+","+vPointOnCushion.getY())
                                            }

                                            
                                            if (!bCollision){
                                                    vDirReflected.invert();
                                                    vDirReflected.normalize();
 

                                                    var vMemorizeDir = new CVector2();
                                                    vMemorizeDir.setV(vDirReflected);
                                                    var iDist = distance(oEdgeReflectVec.getPointA(), oEdgeReflectVec.getPointB());
                                                    aPossibleShots.push( { dir:vMemorizeDir, 
                                                                           edge:oEdgeReflectVec,
                                                                           dist: (iDist+iDist2)} );
                                            }
                                    }
                            }
                    }

                    iAngle += 1;
                    
            }
            
            if(aPossibleShots.length === 0){
                return undefined;
            }
            
            var vTmpPoint= closestPointOnLine( (aPossibleShots[0].edge).getPointA(),(aPossibleShots[0].edge).getPointB(),_oCueBall.getPos());
            var iMinDist = distance(vTmpPoint, _oCueBall.getPos());
            var iSelectedShot = 0;

            for (var t = 1; t < aPossibleShots.length; t++) {

                    var vTmpPoint=closestPointOnLine( (aPossibleShots[t].edge).getPointA(),(aPossibleShots[t].edge).getPointB(),_oCueBall.getPos());
                    var iDist = distance(vTmpPoint, _oCueBall.getPos());

                    if (iMinDist > iDist) {
                            iMinDist = iDist;
                            iSelectedShot = t;
                    }			
            }
            return aPossibleShots[iSelectedShot];

    };
    
    this.prepareEdgeShot = function(t,vCollision, vProjectDir, aEdges,aTotalDist) {
            var aShots = new Array();
            //verify if we can shot using the top left cushion of table 
            vProjectDir.set(0, -1);
            var bSuccess = false;
            //collect all the table edges							
            aShots[t] = this._getEdgeShot(vCollision, vProjectDir, aEdges);
            //update total distance of best shot for current hole
            if (aShots[t] == undefined) {
                    aTotalDist[t] += 9000;
                    bSuccess = false;
            }else{
                    aTotalDist[t] += aShots[t].dist;
                    bSuccess = true;
            }
            //verify if we can shot using the right cushion of table 
            if(!bSuccess){
                    //verify if we can shot using the top left cushion of table 
                    vProjectDir.set(1, 0);

                    //collect all the table edges							
                    aShots[t] = this._getEdgeShot(vCollision, vProjectDir, aEdges);
                    //update total distance of best shot for current hole
                    if (aShots[t] === undefined) {
                            aTotalDist[t] += 9000;
                            bSuccess = false;
                    }else{
                            aTotalDist[t] += aShots[t].dist;
                            bSuccess = true;
                    }
                    if(!bSuccess){
                            //verify if we can shot using the bottom cushion of table 
                            vProjectDir.set(0, 1);

                            //collect all the table edges							
                            aShots[t] = this._getEdgeShot(vCollision, vProjectDir, aEdges);
                            //update total distance of best shot for current hole
                            if (aShots[t] == undefined) {
                                    aTotalDist[t] += 9000;
                                    bSuccess = false;
                            }else{
                                    aTotalDist[t] += aShots[t].dist;
                                    bSuccess = true;
                            }
                            if(!bSuccess){
                                    //verify if we can shot using the left cushion of table 
                                    vProjectDir.set(-1, 0);

                                    //collect all the table edges							
                                    aShots[t] = this._getEdgeShot(vCollision, vProjectDir, aEdges);
                                    //update total distance of best shot for current hole
                                    if (aShots[t] == undefined) {
                                            aTotalDist[t] += 9000;
                                            return false;
                                    }else{
                                            aTotalDist[t] += aShots[t].dist;
                                            return true;
                                    }	
                            }else {
                                    this._edgeShot(aTotalDist,aShots);
                            }
                    }else {
                            this._edgeShot(aTotalDist,aShots);
                    }
            }else {
                    this._edgeShot(aTotalDist,aShots);
            }
    };
    
    this._edgeShot = function (aTotalDist,aShots) {
        if(aShots === undefined){
            return;
        }
        var iMinDist = aTotalDist[0];
        var iSelected = 0;
        for (var x = 1; x < aTotalDist.length; x++) {
                if (aTotalDist[x] < iMinDist) {
                    iMinDist = aTotalDist[x];
                    iSelected = x;
                }
        }
        
        var oDirShot = aShots[iSelected];

        oDirShot = oDirShot === undefined ? undefined : oDirShot.dir;
        
        this.cpuShot(oDirShot);
    };
    
    //set the lowest numbered ball on table each turn
    this.setLowestBall = function() {
        for ( var i = 1; i < _aBalls.length; i++) {
                if (_aBalls[i].isBallOnTable()) {
                        _iLowestBall = i;
                        break;
                }
        }
    };
        
    this.isBreakShot = function(){
        return _bBreakShot;
    };
    
    this.getCntBallsIntoHoles = function() {
	return _iCntBallsIntoHoles;
    };

    this.updatePhysics = function(){
	var bAllBallsStoppedPrev = _oPhysicsController.areBallsStopped();
	_oPhysicsController.update(_aBalls);
        var bAllBallsStoppedAfter = _oPhysicsController.areBallsStopped();
        
        if ( !bAllBallsStoppedPrev  && bAllBallsStoppedAfter){
            s_oInterface.resetSpin();

            this.prepareNextTurn();
            _iPowerShot = 0;
            for(var i = 0; i < _aBalls.length; i++){
                _aBalls[i].resetEdgeCollisionCount();
            }
        }
    };
    
     this.getTableX = function(){
        return _oContainer.x;
    };
    
    this.getTableY = function(){
        return _oContainer.y;
    };
    
    this._update3DObjectTransformation = function(oObj2D){
 
        var oPosObj2D = {x: oObj2D.getX(), y: oObj2D.getY()};
        var oObj3D = oObj2D.getObject3D();
        
        oObj3D.position.x = (-CANVAS_WIDTH * 0.5) + oPosObj2D.x + this.getTableX();
        oObj3D.position.y = (CANVAS_HEIGHT * 0.5) - oPosObj2D.y - this.getTableY();
        
        var vCurForce = oObj2D.getCurForce();
        var fFactor = 0.04;
      //  oObj3D.rotation.y += vCurForce.getX() * fFactor;
      //  oObj3D.rotation.x += vCurForce.getY() * fFactor;
        
        var vEffect = oObj2D.getEffectForceVector();
        
        var vBallForce = new CVector2(vCurForce.getX(), vCurForce.getY());
        vBallForce.add(vEffect);
        var fForce = vBallForce.length()*fFactor;
        vBallForce.normalize();    
        
        vEffect.scalarProduct(DAMPING_BALL_EFFECT);
        
        oObj3D.rotateOnWorldAxis(new THREE.Vector3(vBallForce.getY(),vBallForce.getX(),0), fForce );
    };
    
    this.update = function(){
        this.updatePhysics();
        this.renderBalls();
        var bIsCpuTurn = this.isCpuTurn();

        switch(_iState){
            case STATE_TABLE_PLACE_CUE_BALL:
            case STATE_TABLE_PLACE_CUE_BALL_BREAKSHOT:
            case STATE_TABLE_MOVE_STICK:{
                    if(bIsCpuTurn){
                        return;
                    }
                    this.updateStick();
                    this.renderStickDirection();

                    break;
            }
            case STATE_TABLE_SHOOT:{
                    if ( (s_iPlayerMode === GAME_MODE_CPU) && (s_oGame.getCurTurn() === 2) && _bReadyForShot) {
                        this.renderStickDirection();
                    }
                    break;
            }
            case STATE_TABLE_SHOOTING:{
                    
                    break;
            }
        }
        
        _aBalls.forEach(function(oBall){
                        this._update3DObjectTransformation(oBall);
                        oBall._updateShadow();
                    },this);
        
    };
    
    s_oTable = this;
    
    this._init(oCpuDifficultyParams);
}

var s_oTable = null;