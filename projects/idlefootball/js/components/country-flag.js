app.component("country-flag", {
    props: ["flag"],
    mounted(){
        this.flag.draw(this.$refs.cnv.getContext("2d"));
    },
    template: `<canvas class="country-flag" width="256" height="256" ref="cnv"></canvas>`
});