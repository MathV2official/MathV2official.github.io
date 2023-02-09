var SIN_PI = Math.sin(Math.PI);

var DOUBLE_PI = 2*Math.PI;
var HALF_PI   = Math.PI/2;

var SIN_HALF_PI   = Math.sin(HALF_PI);
var SIN_DOUBLE_PI = Math.sin(DOUBLE_PI);	

function angleBetweenVectors( v1, v2 ){
    
        var iAngle = Math.acos( dotProductV2( v1, v2 ) / (v1.length() * v2.length()) );
        
        if ( isNaN( iAngle ) === true ){
                return 0;
        }else{
                return iAngle;
        }
}

function centerBetweenPointsV2( v1, v2 ){
        var vTmp = new CVector2();
        vTmp.set( (v1.getX()+v2.getX())/2, (v1.getY()+v2.getY())/2 );
        return vTmp;
}

function distance2( v1, v2 ){
        return ( (v2.getX()-v1.getX())*(v2.getX()-v1.getX()) ) + ( (v2.getY()-v1.getY())*(v2.getY()-v1.getY()) );
}
	
function distance( v1, v2 ){
        return Math.sqrt( ( (v2.getX()-v1.getX())*(v2.getX()-v1.getX()) ) + ( (v2.getY()-v1.getY())*(v2.getY()-v1.getY()) ) );
}	

function easeQuintIn (t, b, c, d) {
        return c*(t/=d)*t*t*t*t + b;
}	
	
function easeCubicInOut (t, b, c, d) {
        if ( t > d )
                return;
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
}	

function easeBackIn (t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c*(t/=d)*t*((s+1)*t - s) + b;
}	
	
function easeElasticIn (t, b, c, d, a, p) {
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
}	
	
function toRadian( n ) {
        return ((n) * (Math.PI  /180));
}
	
function toDegree( n ) {
        return ((n) * (180 / Math.PI));
}	

function dotProductV2(v1,v2){
        return ( v1.getX() * v2.getX()+ v1.getY()*v2.getY() );
}	
	
function perpProductV2(u,v){
        return (u.getX() * v.getY() - u.getY() * v.getX());
}	

function reflectVectorV2( v, n ) {		
        var vRet = new CVector2();
        var dotP  = dotProductV2( v,n );
        vRet.set( (v.getX() - (2*dotP*n.getX())), (v.getY() - (2*dotP*n.getY())) );
        return vRet;
}

function classifySphere( vCenter, vNormal,vPoint, iRadius ){
    var iDistance = vNormal.getX()*vCenter.getX() + vNormal.getY() * vCenter.getY() + planeDistance(vNormal, vPoint);
    if ( Math.abs(iDistance) < iRadius ){
            if ( iDistance >= 0 ){
                    return "INTERSECT FRONT";
            }else{
                    return "INTERSECT BEHIND";
            }
    }else if ( iDistance >= iRadius ){
            return "FRONT";
    }
    return "BEHIND";
}

function planeDistance( vNormal, vPoint ){
    return -( (vNormal.getX() * vPoint.getX()) + (vNormal.getY() * vPoint.getY()) );
}
	
function randRange(min, max) {
	    return (Math.floor(Math.random() * (max - min + 1)) + min) ;
}

function randRangeReal(min, max) {
	    return ((Math.random() * (max - min + 1)) + min) ;
}	

function rotateVector2D( iAngle, v ) {		
        var iX = v.getX() *   Math.cos( iAngle )  + v.getY() * Math.sin( iAngle );
        var iY = v.getX() * (-Math.sin( iAngle )) + v.getY() * Math.cos( iAngle );		
        v.set( iX, iY );
}

function closestPointOnLine( vA, vB, vPoint ){
        var v1 = new CVector2();
        v1.setV(vPoint);
        v1.subtract(vA);
        var v2 = new CVector2();	
        v2.setV(vB);
        v2.subtract(vA);
        v2.normalize();

        var t = dotProductV2(v2,v1);

        if ( t <= 0){
                return vA;
        }

        if ( t >= distance(vA,vB) ){
                return vB;
        }

        v2.scalarProduct(t);
        v2.add(vA);

        return v2;
}

function rectInRect( r1, r2 ){
        if ( r2.x <= r1.x && r2.y <= r1.y && r2.width >= r1.width && r2.height >= r1.height ){
                return true;
        }else{
                return false;
        }
}

function collideEdgeWithCircle( oEdge, oCenter,iRadius, objData ){
        var oPt = closestPointOnLine( oEdge.getPointA(), oEdge.getPointB(), oCenter );						
        var iDist = distance( oCenter, oPt );				
        if (objData){
                objData["iDistance"]     = iDist;
                objData["vClosestPoint"] = oPt;
        }		
        return (iRadius < iDist) ? false : true;
}

function collideEdgeWithEdge( oEdge1, oEdge2, oPointInt){		
        var pA = oEdge1.getPointA();
        var pB = oEdge1.getPointB();
        var pC = oEdge2.getPointA();
        var pD = oEdge2.getPointB();		

        var s, t;
        var num, denom;

        denom = pA.getX() * ( pD.getY() - pC.getY() ) + 
                        pB.getX() * ( pC.getY() - pD.getY() ) +
                        pD.getX() * ( pB.getY() - pA.getY() ) +
                        pC.getX() * ( pA.getY() - pB.getY() );

        if ( denom === 0 ){
                return false;
        }

        num = pA.getX() * ( pD.getY() - pC.getY() ) +
                  pC.getX() * ( pA.getY() - pD.getY() ) + 
                  pD.getX() * ( pC.getY() - pA.getY() );

        s = num/denom;

        num = - ( pA.getX() * ( pC.getY() - pB.getY() ) +
                          pB.getX() * ( pA.getY() - pC.getY() ) +
                          pC.getX() * ( pB.getY() - pA.getY() ) );

        t = num/denom;
        if(oPointInt){
            oPointInt.set( pA.getX() + s * ( pB.getX() - pA.getX() ), pA.getY() + s * ( pB.getY() - pA.getY() ));
        }
        if ( (0<= s ) && ( s <= 1 ) && ( 0<= t) && ( t <=1) ){
                return true;
        }else{
                return false;
        }
}

function lineInterpolate( oEdge, fStep, iPoints )
{
    var pA = oEdge.getPointA();
    var pB = oEdge.getPointB();	

    var xabs = Math.abs( pA.getX() - pB.getX() );
    var yabs = Math.abs( pA.getY() - pB.getY() );
    var xdiff = pB.getX() - pA.getX();
    var ydiff = pB.getY() - pA.getY();

    var length = Math.sqrt( ( Math.pow( xabs, 2 ) + Math.pow( yabs, 2 ) ) );
    var steps = length / fStep;
    var xstep = xdiff / steps;
    var ystep = ydiff / steps;

    var newx = 0;
    var newy = 0;
    var aResult = new Array();
    
    if(iPoints !== undefined){
        iPoints = iPoints > steps ? steps : iPoints;
    }else{
        iPoints = steps;
    }
    
    var s =  steps - iPoints;
    
    for(s; s < steps; s++ )
    {
      newx = pA.getX() + ( xstep * s );
      newy = pA.getY() + ( ystep * s );

      aResult.push( new CVector2(newx, newy) );
    }
 
  return aResult;
}

// intersect2D_2Segments(): the intersection of 2 finite 2D segments
//    Input:  two finite segments S1 and S2
//    Output: *I0 = intersect point (when it exists)
//            *I1 = endpoint of intersect segment [I0,I1] (when it exists)
//    Return: 0=disjoint (no intersect)
//            1=intersect in unique point I0
//            2=overlap in segment from I0 to I1
	
function intersect2D_Segments( S1, S2, I0, I1 ){
        var u = new CVector2(); 
        var v = new CVector2();
        var w = new CVector2();

        u.set( S1.m_pB.getX() - S1.m_pA.getX(), S1.m_pB.getY() - S1.m_pA.getY() );	
        v.set( S2.m_pB.getX() - S2.m_pA.getX(), S2.m_pB.getY() - S2.m_pA.getY() );
        w.set( S1.m_pA.getX() - S2.m_pA.getX(), S1.m_pA.getY() - S2.m_pA.getY() );

        var D = perpProductV2(u,v);

        // test if they are parallel (includes either being a point)
        if (Math.abs(D) < 0.00000001) {          // S1 and S2 are parallel
                if (perpProductV2(u,w) != 0 || perpProductV2(v,w) != 0) {
                        return 0;                   // they are NOT collinear
                }
                // they are collinear or degenerate
                // check if they are degenerate points
                var du = dotProductV2(u,u);
                var dv = dotProductV2(v,v);
                if (du==0 && dv==0) {           // both segments are points
                        if (S1.m_pA.getX() != S2.m_pA.getX() || S1.m_pA.getY() != S2.m_pA.getY() )         // they are distinct points
                                return 0;
                        I0 = S1.m_pA;                // they are the same point
                        return 1;
                }
                if (du==0) {                    // S1 is a single point
                        if (inSegment(S1.m_pA, S2) == 0)  // but is not in S2
                                return 0;
                        I0 = S1.m_pA;
                        return 1;
                }
                if (dv==0) {                    // S2 a single point
                        if (inSegment(S2.m_pA, S1) == 0)  // but is not in S1
                                return 0;
                        I0 = S2.m_pA;
                        return 1;
                }
                // they are collinear segments - get overlap (or not)
                var t0, t1;                   // endpoints of S1 in eqn for S2

                var w2 = new CVector2();

                w2.set( S1.m_pB.getX() - S2.m_pA.getX(), S1.m_pB.getY() - S2.m_pA.getY() );
                if (v.getX() != 0) {
                                t0 = w.getX() / v.getX();
                                t1 = w2.getX() / v.getX();
                }
                else {
                                t0 = w.getY() / v.getY();
                                t1 = w2.getY() / v.getY();
                }
                if (t0 > t1) {                  // must have t0 smaller than t1
                                var t=t0;
                                t0=t1;
                                t1=t;    // swap if not
                }
                if (t0 > 1 || t1 < 0) {
                        return 0;     // NO overlap
                }
                t0 = t0<0? 0 : t0;              // clip to min 0
                t1 = t1>1? 1 : t1;              // clip to max 1
                if (t0 == t1) {                 // intersect is a point
                        I0.set( S2.m_pA.getX() + t0 * v.getX(), S2.m_pA.getY() + t0 * v.getY())
                        return 1;
                }

                // they overlap in a valid subsegment
                I0.set( S2.m_pA.getX() + t0 * v.getX(), S2.m_pA.getY() + t0 * v.getY() );
                I1.set( S2.m_pA.getX() + t1 * v.getX(), S2.m_pA.getY() + t1 * v.getY() );
                return 2;
        }

        // the segments are skew and may intersect in a point
        // get the intersect parameter for S1
        var sI = perpProductV2(v,w) / D;
        if (sI < 0 || sI > 1)               // no intersect with S1
                return 0;

        // get the intersect parameter for S2
        var tI = perpProductV2(u,w) / D;
        if (tI < 0 || tI > 1)               // no intersect with S2
                return 0;

        I0.set( S1.m_pA.getX() + sI * u.getX(), S1.m_pA.getY() + sI * u.getY() );               // compute S1 intersect point
        
        return 1;
}


// inSegment(): determine if a point is inside a segment
//    Input:  a point P, and a collinear segment S
//    Return: 1 = P is inside S
//            0 = P is not inside S
function inSegment( P, S){
        if (S.m_pA.getX() != S.m_pB.getX()) {    // S is not vertical
                if (S.m_pA.getX() <= P.getX() && P.getX() <= S.m_pB.getX())
                        return 1;
                if (S.m_pA.getX() >= P.getX() && P.getX() >= S.m_pB.getX())
                        return 1;
        }
        else {    // S is vertical, so test y coordinate
                if (S.m_pA.getY() <= P.getY() && P.getY() <= S.m_pB.getY())
                        return 1;
                if (S.m_pA.getY() >= P.getY() && P.getY() >= S.m_pB.getY())
                        return 1;
        }
        return 0;
}

function detectCollisionPointCircle(vPoint1, vPoint2, iRadius){
    var iDistX = vPoint1.getX() - vPoint2.getX();
    var iDistY = vPoint1.getY() - vPoint2.getY();
    var fDistance = sqrt( (iDistX*iDistX) + (iDistY*iDistY) );
    
    
    return fDistance <= iRadius; 
}

function tweenVectors( vStart, vEnd, vOut, iLerp ){
        vOut.set(vStart.getX() + iLerp *( vEnd.getX()-vStart.getX()),vStart.getY() + iLerp *( vEnd.getY()-vStart.getY()));	
        
        return vOut;
}