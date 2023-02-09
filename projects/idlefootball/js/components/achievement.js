app.component("achievement", {
    props: ["achievement"],
    data(){
        return {
            popup: false
        }
    },
    computed: {
        desc(){
            return typeof this.achievement.description === "string" ? this.achievement.description : this.achievement.description();
        }
    },
    template: `<div class="achievement" :class="{completed: achievement.completed}">
<div class="popup" :class="{hidden: !popup}">
    <h4 v-html="achievement.title"></h4>
    <p v-html="desc"></p>
</div>
<img @mouseenter="popup = true" @mouseleave="popup = false" alt="" :src="achievement.image"/>
</div>`
});