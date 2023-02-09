var GAME_NAME              = "8_ball_pro";
var LOCALSTORAGE_BESTSCORE = GAME_NAME + "_bestscore";

var s_iBestScore;

function CLocalStorage(){
    
    var _bLocalStorage = true;
    
    this._init = function(){
        try{
            var bFlag = window.localStorage.getItem(GAME_NAME);
            this.resetData();
            if(bFlag !== null && bFlag !== undefined){  
                this.loadData();
            }
        }catch(e){
            this.resetData();
        }        
    };

    this.isUsed = function(){
        try{
            window.localStorage.setItem("ls_available","ok");
        }catch(evt){
            _bLocalStorage = false;
        }
        
        return _bLocalStorage;
    };

    this.saveBestScore = function(iNewBestScore){
        var iSavedBestScore = parseInt(window.localStorage.getItem(LOCALSTORAGE_BESTSCORE));
        if(iNewBestScore > iSavedBestScore){
            s_iBestScore = iNewBestScore;
            window.localStorage.setItem(LOCALSTORAGE_BESTSCORE, iNewBestScore);
        }
    };

    this.loadData = function(){        
        var iBestScore = window.localStorage.getItem(LOCALSTORAGE_BESTSCORE);
        var bFirstPlay = iBestScore === null;
        if(bFirstPlay){
            iBestScore = 0;
            window.localStorage.setItem(LOCALSTORAGE_BESTSCORE, 0);
        }
        
        s_iBestScore = parseInt(iBestScore);
    };

    this.resetData = function(){
        s_iBestScore = 0;
    };

    this._init();
    
}