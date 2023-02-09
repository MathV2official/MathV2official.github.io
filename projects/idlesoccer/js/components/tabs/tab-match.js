app.component("tab-match", {
    computed: {
        currentMatch(){
            return game.currentMatch;
        },
        nextMatch(){
            return game.nextMatch;
        }
    },
    template: `<div class="tab-match">
<match v-if="currentMatch" :match="currentMatch"></match>
<match v-else-if="nextMatch" :match="nextMatch"></match>
<div v-else>There is no pending match. Check back later.</div>
</div>`
});