class GameTask{
    constructor(getTime, onComplete){
        this.time = 0;
        this.paused = true;
        this.getTime = getTime;
        this.onComplete = onComplete;
    }

    tick(dt){
        if(!this.paused){
            this.time += dt;
            if(this.time >= this.getTime()){
                this.onComplete();
                this.time = 0;
            }
        }
    }

    pause(){
        this.paused = true;
    }

    resume(){
        this.paused = false;
    }
}