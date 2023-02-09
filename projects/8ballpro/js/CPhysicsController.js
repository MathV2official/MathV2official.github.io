function CPhysicsController(oDebugContainer){
    
    var _bAllBallsStopped;
    var _aCbCompleted;
    var _aCbOwner;
    var _aBalls;
    var _aIntervalId;
    var _iDimStack;
    var _aEdgesTopLeft;
    var _aEdgesTopRight;		
    var _aEdgesBottomLeft;
    var _aEdgesBottomRight;
    var _aFieldEdges;
    var _aHoleEdges;
    var _aHolesNormal;
    var _aPoints;
    var _aPointsNormals;
    var _aPointsNormalsTopLeft;
    var _aPointsNormalsTopRight;
    var _aPointsNormalsBottomLeft;
    var _aPointsNormalsBottomRight;
    var _aHoles;
    var _aHolesTopLeft;
    var _aHolesTopRight;
    var _aHolesBottomLeft;
    var _aHolesBottomRight;	
    var _oRectBall;
    var _oParentContainer;

    var _oThis = this;
    
    this._init = function(oDebugContainer){
        _bAllBallsStopped = true;
        _iDimStack = 0;
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        _oParentContainer = oDebugContainer;
        this._initCollisions();
    };
    
    //init rectangle collision for table and init all table edges
    this._initCollisions = function(  ){		
            _aIntervalId = new Array();
            _oRectBall = new createjs.Rectangle(0,0,POOL_HOLE_RADIUS,POOL_HOLE_RADIUS);

            //--------------------------------
            // init edge
            _aEdgesTopLeft  = new Array();
            _aEdgesTopRight = new Array();		
            _aEdgesBottomLeft  = new Array();
            _aEdgesBottomRight = new Array();		

            _aHolesNormal = new Array();

            _aFieldEdges = new Array();
            for(var k = 0; k < FIELD_POINTS.length - 1; k++){
                var oEdge = new CEdge(FIELD_POINTS[k].x,FIELD_POINTS[k].y,FIELD_POINTS[k+1].x,FIELD_POINTS[k+1].y, k);
                _aFieldEdges.push(oEdge);
            }

            //ADD LAST EDGE THAT CONNECTS LAST POINT WITH THE FIRST ONE
            var oEdge = new CEdge(
                                    FIELD_POINTS[FIELD_POINTS.length-1].x,
                                    FIELD_POINTS[FIELD_POINTS.length-1].y,
                                    FIELD_POINTS[0].x,
                                    FIELD_POINTS[0].y,
                                    FIELD_POINTS.length - 1
                                 );
            _aFieldEdges.push(oEdge);
	
            _aEdgesTopLeft.push(_aFieldEdges[21]);
            _aEdgesTopLeft.push(_aFieldEdges[22]);
            _aEdgesTopLeft.push(_aFieldEdges[23]);
            _aEdgesTopLeft.push(_aFieldEdges[0]);
            _aEdgesTopLeft.push(_aFieldEdges[1]);
            _aEdgesTopLeft.push(_aFieldEdges[2]);
            _aEdgesTopLeft.push(_aFieldEdges[3]);
            _aEdgesTopLeft.push(_aFieldEdges[4]);

            _aHoleEdges = new Array();
            _aHoleEdges.push(_aFieldEdges[0]);
            _aHoleEdges.push(_aFieldEdges[2]);
            _aHoleEdges.push(_aFieldEdges[3]);		
            _aHoleEdges.push(_aFieldEdges[4]);		
            
            _aEdgesTopRight.push(_aFieldEdges[3]);
            _aEdgesTopRight.push(_aFieldEdges[4]);
            _aEdgesTopRight.push(_aFieldEdges[5]);
            _aEdgesTopRight.push(_aFieldEdges[6]);
            _aEdgesTopRight.push(_aFieldEdges[7]);
            _aEdgesTopRight.push(_aFieldEdges[8]);
            _aEdgesTopRight.push(_aFieldEdges[9]);
            
            _aHoleEdges.push(_aFieldEdges[8]);
            _aHoleEdges.push(_aFieldEdges[7]);
            _aHoleEdges.push(_aFieldEdges[6]);				
            
            _aEdgesBottomRight.push(_aFieldEdges[9]);
            _aEdgesBottomRight.push(_aFieldEdges[10]);
            _aEdgesBottomRight.push(_aFieldEdges[11]);
            _aEdgesBottomRight.push(_aFieldEdges[12]);
            _aEdgesBottomRight.push(_aFieldEdges[13]);
            _aEdgesBottomRight.push(_aFieldEdges[14]);	
            _aEdgesBottomRight.push(_aFieldEdges[15]);	
            _aEdgesBottomRight.push(_aFieldEdges[16]);
            
            _aHoleEdges.push(_aFieldEdges[10]);
            _aHoleEdges.push(_aFieldEdges[11]);
            _aHoleEdges.push(_aFieldEdges[12]);
            _aHoleEdges.push(_aFieldEdges[14]);
            _aHoleEdges.push(_aFieldEdges[15]);			
            _aHoleEdges.push(_aFieldEdges[16]);					
            
            _aEdgesBottomLeft.push(_aFieldEdges[15]);	
            _aEdgesBottomLeft.push(_aFieldEdges[16]);	
            _aEdgesBottomLeft.push(_aFieldEdges[17]);
            _aEdgesBottomLeft.push(_aFieldEdges[18]);
            _aEdgesBottomLeft.push(_aFieldEdges[19]);
            _aEdgesBottomLeft.push(_aFieldEdges[20]);
            _aEdgesBottomLeft.push(_aFieldEdges[21]);	
            
            _aHoleEdges.push(_aFieldEdges[18]);
            _aHoleEdges.push(_aFieldEdges[19]);
            _aHoleEdges.push(_aFieldEdges[20]);
            _aHoleEdges.push(_aFieldEdges[22]);
            _aHoleEdges.push(_aFieldEdges[23]);
            
            //----------------------------------
            // init points normals

            _aPoints = new Array();
            for ( var i = 0; i < FIELD_POINTS.length; i++ ){
                    var vPoint = new CVector2(FIELD_POINTS[i].x, FIELD_POINTS[i].y );
                    _aPoints.push(vPoint);
            }

            _aPointsNormals = new Array();
            _aPointsNormalsTopLeft     = new Array();
            _aPointsNormalsTopRight    = new Array();
            _aPointsNormalsBottomLeft  = new Array();
            _aPointsNormalsBottomRight = new Array();		

            var oNormal = new CVector2();
            oNormal.set( (_aFieldEdges[0].getNormal().getX()+ _aFieldEdges[23].getNormal().getX())/2,
                                     (_aFieldEdges[0].getNormal().getY()+ _aFieldEdges[23].getNormal().getY())/2);
            oNormal.normalize();
            _aPointsNormals.push(oNormal);		

            for ( var i=0; i<23; i++ ){
                    var oTmpNormal = new CVector2((_aFieldEdges[i].getNormal().getX() + _aFieldEdges[i+1].getNormal().getX())/2,
                                             (_aFieldEdges[i].getNormal().getY() + _aFieldEdges[i+1].getNormal().getY())/2);

                    oTmpNormal.normalize();
                    _aPointsNormals.push(oTmpNormal);
            }
           
            _aPointsNormalsTopLeft.push( { oPoint:_aPoints[1], oNormal:_aPointsNormals[1]} );
            _aPointsNormalsTopLeft.push( { oPoint:_aPoints[2],oNormal:_aPointsNormals[2]});
            _aPointsNormalsTopLeft.push( { oPoint:_aPoints[5],oNormal:_aPointsNormals[5]});		
            _aPointsNormalsTopLeft.push( { oPoint:_aPoints[21],oNormal:_aPointsNormals[21]});		

            _aPointsNormalsTopRight.push( { oPoint:_aPoints[2],oNormal:_aPointsNormals[2]});		
            _aPointsNormalsTopRight.push( { oPoint:_aPoints[5],oNormal:_aPointsNormals[5]});
            _aPointsNormalsTopRight.push( { oPoint:_aPoints[6],oNormal:_aPointsNormals[6]});
            _aPointsNormalsTopRight.push( { oPoint:_aPoints[9],oNormal:_aPointsNormals[9]});

            _aPointsNormalsBottomRight.push( { oPoint:_aPoints[10],oNormal:_aPointsNormals[10]});
            _aPointsNormalsBottomRight.push( { oPoint:_aPoints[13],oNormal:_aPointsNormals[13]});
            _aPointsNormalsBottomRight.push( { oPoint:_aPoints[14],oNormal:_aPointsNormals[14]});		
            _aPointsNormalsBottomRight.push( { oPoint:_aPoints[17],oNormal:_aPointsNormals[17]});				

            _aPointsNormalsBottomLeft.push( { oPoint:_aPoints[14],oNormal:_aPointsNormals[14]});		
            _aPointsNormalsBottomLeft.push( { oPoint:_aPoints[17],oNormal:_aPointsNormals[17]});
            _aPointsNormalsBottomLeft.push( { oPoint:_aPoints[18],oNormal:_aPointsNormals[18]});
            _aPointsNormalsBottomLeft.push( { oPoint:_aPoints[21],oNormal:_aPointsNormals[21]});		


            //---------------------------------
            // holes init

            _aHoles            = new Array();
            _aHolesTopLeft     = new Array();
            _aHolesTopRight    = new Array();
            _aHolesBottomLeft  = new Array();
            _aHolesBottomRight = new Array();		
            for ( var i = 0; i < HOLE_CENTER_POS.length; i++ ){
                    var vCenterHole = new CVector2(); 
                    vCenterHole.set( HOLE_CENTER_POS[i].x, HOLE_CENTER_POS[i].y );
                    _aHoles.push( vCenterHole );
                    
            }

            _aHolesTopLeft.push(_aHoles[0]);
            _aHolesTopLeft.push(_aHoles[1]);		

            _aHolesTopRight.push(_aHoles[1]);
            _aHolesTopRight.push(_aHoles[2]);		

            _aHolesBottomRight.push(_aHoles[3]);
            _aHolesBottomRight.push(_aHoles[4]);		

            _aHolesBottomLeft.push(_aHoles[4]);
            _aHolesBottomLeft.push(_aHoles[5]);	
           
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.verifyCollisionBallWithRectArea = function(vPos){
            _oRectBall.x = vPos.getX() - BALL_RADIUS;
            _oRectBall.y = vPos.getY() - BALL_RADIUS;
        
            return RECT_COLLISION.contains(vPos.getX(),vPos.getY());
    };
    
    //get table quadrant where is currently the ball selected (the table is divided in four quadrant)
    this._chooseQuadrant = function(oBall){
        if ( oBall.getX() < TABLE_CENTER.x ){
                if ( oBall.getY() < TABLE_CENTER.y){
                        return 0;
                }else{
                        return 3;
                }
        }else{
                if ( oBall.getY() < TABLE_CENTER.y){
                        return 1;
                }else{
                        return 2;
                }		
        }
    };
    
    //this function is called when a ball is potted
    this.addBallToStack = function(oBall,oHole){
	if(s_iGameMode === GAME_MODE_TIME){
                if ( oBall.getNumber() === 0 ){
                        oBall.setTmpForce(0,0);
                        oBall.setCurForce(0, 0);	
                        oBall.setFlagOnTable(false);
                        oBall.setVisible(false);
                }else{
                        oBall.inHole(oHole);
                        oBall.setScale(0.9);
                       
                        oBall.scalarProductTmpForce(0.9);
                        oBall.setMask(oHole.getX(),oHole.getY());
                        
                }
                return;
        }
        
        if( oBall.getNumber() === 0 ){
                oBall.setPos( CANVAS_WIDTH+BALL_DIAMETER, CUE_BALL_POS.y );
                oBall.setTmpForce(0,0);
                oBall.setCurForce(0, 0);	
        }else{
                switch(s_iGameMode) {
                        case GAME_MODE_NINE: {
                                if(oBall.getNumber() === 9) {
                                        oBall.setPos( 0, 0);
                                        oBall.setFlagOnTable(false);
                                        oBall.setTmpForce(0,0);
                                        oBall.setCurForce(0, 0);	
                                        oBall.setVisible(false);
                                }else {
                                        oBall.inHole(oHole);
                                        oBall.setScale(0.9);
                                        
                                        oBall.scalarProductTmpForce(0.9);
                                        oBall.setMask(oHole.getX(),oHole.getY());
                                }
                                break;
                        }
                        case GAME_MODE_EIGHT: {
                                oBall.inHole(oHole);
                                oBall.setScale(0.9);
                         
                                oBall.scalarProductTmpForce(0.9);
                                oBall.setMask(oHole.getX(),oHole.getY());
                                break;
                        }
                }
        }
    };
    
    //detect if a ball collides with any hole
    this.collideBallWithHoles = function( oBall, aHoles ){	
            if ( distance( oBall.getPos(), aHoles[0] ) < (BALL_RADIUS ) ){
                if(_aCbCompleted[ON_BALL_INTO_HOLE]){
                    _aCbCompleted[ON_BALL_INTO_HOLE].call(_aCbOwner[ON_BALL_INTO_HOLE],oBall);
                }
                return aHoles[0];
            }		
            
            if ( distance( oBall.getPos(), aHoles[1] ) < ( BALL_RADIUS) ) {
                if(_aCbCompleted[ON_BALL_INTO_HOLE]){
                    _aCbCompleted[ON_BALL_INTO_HOLE].call(_aCbOwner[ON_BALL_INTO_HOLE],oBall);
                }
                return aHoles[1];
            }					
            return null;
    };
    
    //find new ball direction after collision with any edge 
    this.collideBallWithPointsNormals = function( oBall, vPos, aPointsNormals){
        for ( var u=0; u<aPointsNormals.length;u++){
                if ( distance2(aPointsNormals[u].oPoint,vPos) <=  BALL_RADIUS_QUADRO ){
                        var vReflectedDir = reflectVectorV2( oBall.getCurForce(), aPointsNormals[u].oNormal );
                        var iTmp = oBall.getCurForceLen(); 
                        oBall.setCurForceV(aPointsNormals[u].oNormal);
                        oBall.scalarProductCurForce(iTmp);
                        vReflectedDir = null;		
                        if(oBall.getHole() !== null){
                               if(_aCbCompleted[ON_BALL_WITH_BANK]){
                                    _aCbCompleted[ON_BALL_WITH_BANK].call(_aCbOwner[ON_BALL_WITH_BANK], oBall);
                                }
                        }

                        return true;
                }
        }
        return false;
    };
    
    //detect collision between balls
    this.collideBallWithBalls = function( oBall ){	
        if (oBall.getHole() !== null) {
                return false;
        }

        var aCollisions = new Array();
        var tmpDist, minDist = 10000;
        var iPos;
		
        for ( var i = 0; i < _aBalls.length; i++ ){
                if( _aBalls[i].getNumber() !== oBall.getNumber() && _aBalls[i].isBallOnTable() && _aBalls[i].getHole() === null ){
                        tmpDist = distance2( oBall.getPos(), _aBalls[i].getPos() );
                        
                        if ( tmpDist <= BALL_DIAMETER_QUADRO ){	
                                aCollisions.push( { oBall:_aBalls[i], iDist:tmpDist ,index_ball:i} );
                                if ( minDist > tmpDist ){
                                        minDist = tmpDist;
                                        iPos = aCollisions.length-1;
                                }
                        }
                }
        }
        
        if ( aCollisions.length === 0 ){
                return false;
        }

        var vPos          = new CVector2();
        var vRayCollision = new CVector2();
        var vDirInvert    = new CVector2();		

        vDirInvert.setV(oBall.getCurForce());
        vDirInvert.invert();
        vDirInvert.normalize();

        vRayCollision.setV(oBall.getPos());	
        vRayCollision.subtract(aCollisions[iPos].oBall.getPos());
        vRayCollision.normalize();
        vPos.setV(vRayCollision);
        vPos.scalarProduct(BALL_DIAMETER*1.05);
        vPos.add(aCollisions[iPos].oBall.getPos());

        oBall.setPosV(vPos);

        var iAngle = angleBetweenVectors(vDirInvert,vRayCollision);
        var iForceTransfer = iAngle / (HALF_PI);
        var iNewForce;
        if (oBall.getNumber() === 0 && iForceTransfer < 0.3) {
                var iValue = s_oInterface.getBackSpin();
//                var iFact = iValue / MAX_SPIN_VALUE;
//                
//                iFact = iFact * MAX_SPIN_VALUE;
               var vRayNorm = new CVector2();
               vRayCollision.getNormalize(vRayNorm);
               //var vReflectedDir = reflectVectorV2( oBall.getCurForce(), vRayCollision );	

               this._addSideSpinEffect(vDirInvert, -1, vDirInvert, oBall);  //(vReflectedDir, fRatio, oPerpendicularVector, oBall){

               iNewForce = this._addBackSpinEffect(oBall, iValue, vRayCollision, vDirInvert);
               
        }else{
                var vTmpDir = new CVector2();
                vTmpDir.setV(oBall.getCurForce());
                vTmpDir.normalize();	
                iNewForce = oBall.getCurForceLen(); 
                oBall.setCurForceV(reflectVectorV2( vRayCollision, vTmpDir ));
        }	

        var iForce = (iNewForce * K_IMPACT_BALL);
        oBall.normalizeCurForce();

        oBall.scalarProductCurForce( (iForce*0.8)*iForceTransfer + (iForce*0.15) );

        vRayCollision.invert();
        vRayCollision.normalize();
        vRayCollision.scalarProduct(iForce*(1-iForceTransfer) + (iForce*0.2) );
        aCollisions[iPos].oBall.addForce(vRayCollision);		

        if(_aCbCompleted[ON_BALL_WITH_BALL]){
            _aCbCompleted[ON_BALL_WITH_BALL].call(_aCbOwner[ON_BALL_WITH_BALL],oBall, aCollisions[iPos].oBall,iForce);
        }
        
        if (oBall.getNumber() === 0) {
                s_oTable.setFirstBallCollision(aCollisions[0].oBall);
        }	
        return true;
    };
    
    this._addBackSpinEffect = function(oBall, iValue, vRayCollision, vDirInvert){
        var iNewForce = oBall.getCurForceLen();
         var vTmpDir = new CVector2();
        vTmpDir.setV(oBall.getCurForce());
        if (iValue === 0) {
                vTmpDir.normalize();	
                iNewForce = oBall.getCurForceLen(); 
                oBall.setCurForceV(reflectVectorV2( vRayCollision, vTmpDir ));
        }else {
            var iEffectForce = linearFunction(
                                                iValue,
                                                0, MAX_SPIN_VALUE,
                                                0, MAX_BACK_SPIN_CUE_FORCE
                                              );
            var iForceRatio  = oBall.getCurForceLen() / MAX_POWER_FORCE_BALL;
            iNewForce = oBall.getCurForceLen() + (iEffectForce*iForceRatio);
            if(iValue < 0){       
                oBall.setCurForceV(vDirInvert);   
            }
        }
        return  iNewForce;
    };
    
    //ball collision with edges
    this.collideBallWithEdges = function( oBall, aEdges, aPointsNormals ){	
            var vDir = new CVector2();
            vDir.setV(oBall.getCurForce());
            vDir.normalize();		

            var iCurForce = oBall.getCurForceLen();
            if(iCurForce === 0){
                return false;
            }
            
            var iFactorForce = 0.2;
            var iTimes = Math.floor(iCurForce/iFactorForce);		
            var bHit = false;
            var vPos = new CVector2();
            vPos.setV(oBall.getPrevPos());
           
            vDir.normalize();
            vDir.scalarProduct(iFactorForce);
  
            for ( var k = 0; k < (iTimes+1); k++ ){
                    if ( k === iTimes ){
                            vDir.normalize();
                            vDir.scalarProduct(iCurForce-(iTimes*iFactorForce));		
                    }
                    vPos.add(vDir);
             
                    if ( !this.verifyCollisionBallWithRectArea(vPos) ){	
                            if( this.collideBallWithPointsNormals( oBall, vPos, aPointsNormals) ){
                                    vPos.subtract(vDir);
                                    oBall.setPosV(vPos);
                                    return true;
                            }								
                            for ( var i = 0; i < aEdges.length; i++ ){
                               
                                    bHit = collideEdgeWithCircle( aEdges[i], vPos,BALL_RADIUS, null );
                                    if (bHit){
                                        vPos.subtract(vDir);
                                        break;
                                    }
                            }
                            
                            if ( bHit) {
                                    if(_aCbCompleted[ON_BALL_WITH_BANK]){
                                        _aCbCompleted[ON_BALL_WITH_BANK].call(_aCbOwner[ON_BALL_WITH_BANK],oBall, aEdges[i]);
                                    }
                                    break;
                            }
                    }

                    oBall.setPosV(vPos);
                    if ( this.collideBallWithBalls(oBall) ){
                            return false;
                    }
            }

            if ( bHit ){
                    var vReflectedDir = reflectVectorV2( oBall.getCurForce(), aEdges[i].getNormal() );	
                   
                    oBall.setPosV(vPos);
                   
                    //if cue ball verify spin
                    if(oBall.getNumber() === 0){
                        this._addSideSpinEffect(vReflectedDir, 1, aEdges[i].calculateEdgeVector(), oBall);
                    }
                    oBall.setCurForceV(vReflectedDir);
                    vReflectedDir = null;	
            }else{
                    oBall.addPos(oBall.getCurForce());
            }

            oBall.setPosV(vPos);
            if ( this.collideBallWithBalls(oBall) ){
                    return false;
            }	

            vPos = null;
            vDir = null;
            return bHit;
    };
    
    this._addSideSpinEffect = function(vReflectedDir, fRatio, oPerpendicularVector, oBall){
        var iBallForce = oBall.getCurForce().length();
        var iValue = oBall.getSideEffect();
        if(iValue === 0){
            return;
        }
        
        oBall.setSideEffect(iValue * 0.25);
        

//        console.log("iValue: "+ iValue); 
        var iFact = iValue / MAX_SPIN_VALUE;
        iFact = iFact * MAX_SPIN_VALUE;
        var iPreRotation = radiantsToDegrees(angleBetweenVectors(vReflectedDir, oPerpendicularVector));
//        console.log("Pre: " + iPreRotation);
        var vRotateReflection = new CVector2(vReflectedDir.getX(), vReflectedDir.getY());
        //rotateVector2D(toRadian(iFact* fRatio), vRotateReflection);	
        var iPostRotation = radiantsToDegrees(angleBetweenVectors(vRotateReflection, oPerpendicularVector));
//        console.log("Post: " +iPostRotation);
        
        var bPreRotMajPostRot = iPreRotation < iPostRotation;
        var bPositiveSideEffect = iValue >0;
        
//        console.log("bPreRotMajPostRot: " + bPreRotMajPostRot);
//        console.log("bPositiveSideEffect: " + bPositiveSideEffect);
        
        vRotateReflection.set(vReflectedDir.getX(), vReflectedDir.getY());
        var fRatioForce = fRatioForce = linearFunction(
                                                iBallForce,
                                                MAX_POWER_FORCE_BALL, 0,
                                                0.4, 0.7
                                            );  
                                    
        if(!bPositiveSideEffect && !bPreRotMajPostRot){                            
                if(iPostRotation< 90){
                   iFact *= -1;
                }
        }else if(bPreRotMajPostRot  && bPositiveSideEffect){
            if(iPostRotation< 90){
               iFact *= -1;
            }
        }
        
        var fTotRatio = fRatio - fRatioForce;
//         console.log("iFact: "+ iFact); 
//        console.log("FORCE: " + iBallForce);
//        console.log("FRatioForce: " + fTotRatio);
        rotateVector2D(toRadian(iFact * fTotRatio), vRotateReflection);	
        vReflectedDir.set(vRotateReflection.getX(), vRotateReflection.getY());
    };
    
    this.checkBallPosInHole = function(oBallInHole,oHole) {
        if( (oHole === null) || (oBallInHole.getNumber() === 0) || !oBallInHole.isBallOnTable()){
                return;
        }
        var oHolePos = new CVector2();
        oHolePos.setV(oHole);
	
        if( (oBallInHole.getCurForceLenght2() < K_MIN_FORCE) || (distance(oBallInHole.getPos(),oHolePos) > DIST_BALL_HOLE) ){
               
                oBallInHole.setFlagOnTable(false);
                setTimeout(function(){_oThis.respawnBallInRails(oBallInHole);}, 2000);
               
        }
    };
    
    this.respawnBallInRails = function(oBallInHole) {   
            oBallInHole.reset3DObjectTransformation();
                                     
            oBallInHole.setScale(1);
            oBallInHole.setPos( POS_RAIL_EXIT.x, POS_RAIL_EXIT.y );

            oBallInHole.setTmpForce(0, 0);
            if(s_iGameMode === GAME_MODE_NINE){
                oBallInHole.setCurForce(3 * (BALL_NUMBER - _iDimStack) / BALL_NUMBER, 0);
            }else{
                oBallInHole.setCurForce(8.98 * (BALL_NUMBER - _iDimStack) / BALL_NUMBER, 0);
            }
            _iDimStack+=0.76;
            oBallInHole.removeMask();
            
            //CAudioManager.getInstance().playChannel("rolling_ball", 0, 1, 100 );
    };
    
    this.areBallsStopped = function(){		
            return _bAllBallsStopped;
    };
    
    this.getEdgesByHoleID = function(iHoleID){
        var aEdges = null;
        switch (iHoleID){
            case 0:
                aEdges = _aEdgesTopLeft;
                break;
            case 1:
                aEdges = [_aFieldEdges[1], _aFieldEdges[5]];
                break;
            case 2:
                aEdges = _aEdgesTopRight;
                break;
            case 3:
                aEdges = _aEdgesBottomRight;
                break;
            case 4:
                aEdges = [_aFieldEdges[13], _aFieldEdges[17]];
                break;
            case 5:
                aEdges = _aEdgesBottomLeft;
                break;
        }
        return aEdges;
    };
    
    this.getEdges = function(){
        return [
                _aEdgesTopLeft[0],
                _aEdgesTopRight[0],
                _aEdgesTopRight[1],
                _aEdgesBottomRight[1],
                _aEdgesBottomLeft[0],
                _aEdgesBottomLeft[1]
        ];
    };
        
    //physic loop	
    this.update = function(aBalls){
        var oBall;
        _aBalls = aBalls;
        _bAllBallsStopped = true;
		
        //check ball physics
        for ( var i = 0; i < aBalls.length; i++ ){
            oBall = aBalls[i]; 
            oBall.addCurForce(oBall.getTmpForce());
            oBall.setTmpForce(0,0);
            oBall.setPrevPos(oBall.getPos());

            if ( oBall.isBallOnTable() ){
                var aHolesTest, aEdgesTest, aPointsNormalsTest;
                //verify quadrant for each ball considered (so we decrease the number of check)
                switch( this._chooseQuadrant(oBall) ){
                    case 0:{
                            aHolesTest = _aHolesTopLeft; 
                            aEdgesTest = _aEdgesTopLeft;
                            aPointsNormalsTest = _aPointsNormalsTopLeft;
                    }break;
                    case 1:{
                            aHolesTest = _aHolesTopRight;
                            aEdgesTest = _aEdgesTopRight;				
                            aPointsNormalsTest = _aPointsNormalsTopRight;						
                    }break;
                    case 2:{
                            aHolesTest = _aHolesBottomRight;
                            aEdgesTest = _aEdgesBottomRight;
                            aPointsNormalsTest = _aPointsNormalsBottomRight;						
                    }break;
                    case 3:{
                            aHolesTest = _aHolesBottomLeft;
                            aEdgesTest = _aEdgesBottomLeft;					
                            aPointsNormalsTest = _aPointsNormalsBottomLeft;						
                    }break;	
                }

            //verify if ball position is close to any hole

                if(oBall.getHole() === null){
                    var oRetHole = this.collideBallWithHoles(oBall, aHolesTest);
                    if(  oRetHole !== null ){
                        this.addBallToStack(oBall, oRetHole);

                        var vDirToHole = new CVector2();
                        vDirToHole.set(oRetHole.getX() - oBall.getX(), oRetHole.getY() - oBall.getY());
                        vDirToHole.normalize();

                        for (var k = 0; k < 5; k++){
                            oBall.addPos(vDirToHole);
                        }

                    }else{
                            //verify if ball position is close to any edge
                        this.collideBallWithEdges(oBall, aEdgesTest, aPointsNormalsTest);
                    }
                }else{
                    //verify if ball position is close to any edge
                    this.collideBallWithEdges(oBall, _aHoleEdges, aPointsNormalsTest);

                    this.checkBallPosInHole(oBall,oBall.getHole());
                }				
            }else{	
                    oBall.addPos(oBall.getCurForce());
            }			

            oBall.scalarProductCurForce(K_FRICTION);

            if (oBall.getCurForceLenght2() < K_MIN_FORCE){
                    oBall.setCurForce(0,0);
            }else if ( oBall.isBallOnTable()){
                    _bAllBallsStopped = false;
            }				
        }
    };
        
    this._init(oDebugContainer);
}