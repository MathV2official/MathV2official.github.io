var CAMERA_SCENARIO;
function CScene(){
    var _oScene;
    var _oRenderer;
    
    this._init = function(){

        _oScene = new THREE.Scene();
        
        CAMERA_SCENARIO = new THREE.OrthographicCamera( CANVAS_WIDTH/-2, CANVAS_WIDTH/2,CANVAS_HEIGHT/2, CANVAS_HEIGHT/-2, 1, 1000 );
        CAMERA_SCENARIO.position.z = 100;
        CAMERA_SCENARIO.zoom = 1;
        _oScene.add( CAMERA_SCENARIO );
        CAMERA_SCENARIO.updateProjectionMatrix();

        var oSpotLight = new THREE.SpotLight( 0xffffff );
        oSpotLight.position.set(0, 0, 500);
        oSpotLight.penumbra = 0.1;
        oSpotLight.power = 0.75*Math.PI;
        _oScene.add(oSpotLight);
        
        var oAmbientLight = new THREE.AmbientLight( 0xffffff, 0.3 );
        _oScene.add( oAmbientLight ); 
        
        _oRenderer = new THREE.WebGLRenderer({
                                                    antialias: true,
                                                    canvas:$('#canvas_3d')[0],
                                                    alpha: true,
                                                    precision: 'lowp',
                                                    powerPreference: 'low-power'
                                                });
        //properties for casting shadow
        _oRenderer.shadowMap.enabled = false;
        //oRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
        _oRenderer.setSize( CANVAS_WIDTH, CANVAS_HEIGHT );
        _oRenderer.gammaFactor = 2.2;

    };
    
    this.create3DBall = function(oTexture, iBallRadius, vPos3D){       
        var geometry = new THREE.SphereGeometry(iBallRadius, 16, 16);
        var material = new THREE.MeshPhongMaterial({
            specular: 0x222222,
            shininess: 80,
            map: oTexture
          });
          var oBall = new THREE.Mesh(geometry, material);

          oBall.castShadow = true;
          oBall.receiveShadow = true;
          _oScene.add(oBall);
          oBall.position.copy(vPos3D);
         return oBall;

    };
    
    this.consoleInfoRenderer = function(){
        console.log(_oRenderer.info);
    };
    
    this.update = function(){
        _oRenderer.render( _oScene, CAMERA_SCENARIO );
    };
    
    this.unload = function(){
        _oRenderer.clear();
        _oRenderer = null;
        _oScene = null;
    };
    
    this._init();
    s_oScenario = this;
}

var s_oScenario;