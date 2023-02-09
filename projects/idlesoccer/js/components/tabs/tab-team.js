app.component("tab-team",{
    data(){
        return {
            team: game.team
        };
    },
    template: `<div class="tab-team">
<team-management :team="team"></team-management>
</div>`
});