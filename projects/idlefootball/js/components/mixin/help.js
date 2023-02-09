const mixinHelp = {
    data(){
        return {
            helpDialogActive: false
        }
    },
    methods: {
        showHelpDialog(){
            this.helpDialogActive = true;
        },
        hideHelpDialog(){
            this.helpDialogActive = false;
        }
    }
};