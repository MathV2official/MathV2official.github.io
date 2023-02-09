app.component("tab-achievements", {
    data(){
        return{
            achievements: game.achievements
        }
    },
    computed: {
        numAchievements(){
            return this.achievements.filter(a => a.completed).length;
        }
    },
    template: `<div class="tab-achievements">
    <h2 class="big-heading">🏆 {{numAchievements}} / {{achievements.length}}</h2>
    <div class="achievements">
        <achievement v-for="(a, i) in achievements" :achievement="a" :key="i"></achievement>
    </div>
</div>`
});