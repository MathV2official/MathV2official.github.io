function CEdge(xA, yA, xB, yB, iID) {
    //--------------------
    // Attributes
    var m_pA = null;
    var m_pB = null;
    var m_pCenter = null;
    var m_pProj = null;
    var m_vNormal = null;
    var m_iID = null;

    var LENGTH_NORMAL = 5;

    //--------------------
    // Methods
    this._init = function (xA, yA, xB, yB, iID) {
        m_iID = iID;
        this.set(xA, yA, xB, yB);
    };

    this.destroy = function () {
        m_pA = null;
        m_pB = null;
        m_pCenter = null;
        m_pProj = null;
        m_vNormal = null;
    };

    this.render = function (oParentContainer) {
        var oStroke = new createjs.Shape();
        oStroke.graphics.setStrokeStyle(4, "round", "round");        
        oStroke.graphics.beginStroke("red").moveTo(m_pA.getX(), m_pA.getY()).lineTo(m_pB.getX(), m_pB.getY());
        oParentContainer.addChild(oStroke);
        
        var iX = (m_pA.getX() + m_pB.getX()) *0.5;
        var iY = (m_pA.getY() + m_pB.getY()) *0.5;
        
        var iWidth  = 100;
        var iHeight = 100;
        
        new CTLText(oParentContainer, 
                    iX - iWidth/2, iY - iHeight/2, iWidth, iHeight, 
                    30, "center", "#00f", FONT_GAME, 1,
                    0, 0,
                    String(m_iID),
                    true, true, false,
                    false );
    };

    this.toString = function (sz) {
        console.log(sz + " " + m_pA.x + " " + m_pA.y + " " + m_pB.x + " " + m_pB.y);
    };

    this.add = function (vAdd) {
        m_pA.addV(vAdd);
        m_pB.addV(vAdd);
    };

    this.set = function (xA, yA, xB, yB) {
        m_pA = new CVector2();
        m_pB = new CVector2();
        m_pA.set(xA, yA);
        m_pB.set(xB, yB);
        this.calculateNormal();
        this.calculateCenter();
    };

    this.scale = function (iVal) {
        m_pA.scalarProduct(iVal);
        m_pB.scalarProduct(iVal);
        this.calculateNormal();
        this.calculateCenter();
    };
    
    this.calculateEdgeVector = function(){
        var _vNormal = new CVector2();
        _vNormal.setV(m_pB);
        _vNormal.subtract(m_pA);
        _vNormal.normalize();
        
        return  _vNormal;
    };

    this.calculateNormal = function () {
        m_vNormal = null;
        m_vNormal = new CVector2();
        m_vNormal.setV(m_pB);
        m_vNormal.subtract(m_pA);
        m_vNormal.rot90CCW();
        m_vNormal.normalize();
    };

    this.calculateCenter = function () {
        m_pCenter = null;
        m_pCenter = centerBetweenPointsV2(m_pA, m_pB);

        m_pProj = new CVector2();
        m_pProj.setV(m_vNormal);
        m_pProj.scalarProduct(LENGTH_NORMAL);
        m_pProj.addV(m_pCenter);
    };

    this.getPointA = function () {
        return m_pA;
    };

    this.m_pCenter = function () {
        return m_pCenter;
    };

    this.getPointB = function () {
        return m_pB;
    };

    this.getNormal = function () {
        return m_vNormal;
    };

    this.getID = function(){
        return m_iID;
    };
    
    this.renderNormal = function (oLineDraw) {
        oLineDraw.moveTo(m_pCenter.getX(), m_pCenter.y);
        oLineDraw.lineTo(m_pProj.getX(), m_pProj.y);
    };

    this._init(xA, yA, xB, yB, iID);

    return this;
}