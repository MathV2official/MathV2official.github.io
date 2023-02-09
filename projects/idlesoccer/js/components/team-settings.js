app.component("team-settings", {
    props: ["team"],
    methods: {
        addColor(){
            if(this.logo.gradient.length < 10) {
                this.logo.gradient.push("#000000");
            }
        },
        removeColor(){
            if(this.logo.gradient.length > 1){
                this.logo.gradient.pop();
            }
        }
    },
    computed: {
        logo(){
            return this.team.logo;
        }
    },
    template: `<div class="team-settings">
<div>
    <label>My Team is called <input type="text" v-model="team.name"/></label>
</div>
<div class="logo-settings">
    <div>
        <team-logo :logo="logo"></team-logo>
    </div>
    <div>
        <label>Colors 
            <button @click="removeColor()" v-if="logo.gradient.length > 1">-</button>
            <input type="color" v-for="(col, i) in logo.gradient" v-model="logo.gradient[i]"/>
            <button @click="addColor()" v-if="logo.gradient.length < 10">+</button>
        </label>
        <label>Stripe Color <input type="color" v-model="logo.stripeColor"/></label>
        <label>Sides <input type="range" min="3" max="8" v-model="logo.sides"/></label>
        <label>Icon <input type="text" maxlength="1" v-model="logo.icon"/></label>
    </div>
</div>
</div>`
});