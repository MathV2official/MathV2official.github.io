function CPreloader() {
    var _iMaskWidth;
    var _iMaskHeight;
    var _oLoadingText;
    var _oProgressBar;
    var _oMaskPreloader;
    var _oIcon;
    var _oIconMask;
    var _oContainer;

    this._init = function () {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");
        s_oSpriteLibrary.addSprite("mask_progress_bar", "./sprites/mask_progress_bar.png");
        s_oSpriteLibrary.addSprite("200x200", "./sprites/frivLogo200x200Min.png");
        s_oSpriteLibrary.loadSprites();

        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);
    };

    this.unload = function () {
        _oContainer.removeAllChildren();
    };

    this._onImagesLoaded = function () {

    };

    this._onAllImagesLoaded = function () {
        this.attachSprites();

        s_oMain.preloaderReady();
    };

    this.attachSprites = function () {
        var oBg = new createjs.Shape();
        oBg.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        oBg.cache(0, 0,CANVAS_WIDTH, CANVAS_HEIGHT);
        _oContainer.addChild(oBg);

        var oSprite = s_oSpriteLibrary.getSprite('200x200');
        _oIcon = createBitmap(oSprite);
        _oIcon.regX = oSprite.width * 0.5;
        _oIcon.regY = oSprite.height * 0.5;
        _oIcon.x = CANVAS_WIDTH/2;
        _oIcon.y = CANVAS_HEIGHT/2 - 80;
        _oContainer.addChild(_oIcon);

        _oIconMask = new createjs.Shape();
        _oIconMask.graphics.beginFill("rgba(0,0,0,0.01)").drawRoundRect(_oIcon.x - 100, _oIcon.y - 100, 200, 200, 10);
        _oContainer.addChild(_oIconMask);
        
        _oIcon.mask = _oIconMask;

        var oSprite = s_oSpriteLibrary.getSprite('progress_bar');
        _oProgressBar = createBitmap(oSprite);
        _oProgressBar.x = CANVAS_WIDTH/2 - (oSprite.width / 2);
        _oProgressBar.y = CANVAS_HEIGHT/2 + 70;
        _oContainer.addChild(_oProgressBar);

        _iMaskWidth = oSprite.width;
        _iMaskHeight = oSprite.height;
        _oMaskPreloader = createBitmap(s_oSpriteLibrary.getSprite("mask_progress_bar"));
        _oMaskPreloader.x = _oProgressBar.x+_iMaskWidth;
        _oMaskPreloader.y = _oProgressBar.y;
        _oMaskPreloader.regX = _iMaskWidth;
        _oContainer.addChild(_oMaskPreloader);
        
    
        _oProgressBar.mask = _oMaskPreloader;

        _oLoadingText = new createjs.Text("        ", "30px " + FONT_GAME, "#fff");
        _oLoadingText.x = CANVAS_WIDTH/2;
        _oLoadingText.y = CANVAS_HEIGHT/2 + 120;
        _oLoadingText.textBaseline = "alphabetic";
        _oLoadingText.textAlign = "center";
        _oContainer.addChild(_oLoadingText);
        
        var oRect = _oLoadingText.getBounds();
        _oLoadingText.cache(oRect.x, oRect.y, oRect.width, oRect.height);
        
    };

    this.refreshLoader = function (iPerc) {
        _oLoadingText.text = iPerc + "%";
        _oLoadingText.uncache();
        var oRect = _oLoadingText.getBounds();
        _oLoadingText.cache(oRect.x, oRect.y, oRect.width, oRect.height);
        
        if (iPerc === 100) {
            s_oMain._allResourcesLoaded();
            _oLoadingText.visible = false;
            _oProgressBar.visible = false;
        };     

        var iScale = 1-(iPerc/100);
        _oMaskPreloader.scaleX = iScale;
    };

    this._init();
}