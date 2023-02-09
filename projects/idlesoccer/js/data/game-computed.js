let computed = {
    showTutorial(){
        return localStorage.getItem("idleSoccerManager") === null || this.restartedTutorial;
    }
}