app.component("notation-select", {
    data(){
        return {
            notations: window.notations,
            notationName: game.numberFormatter.name
        }
    },
    methods: {
        setNotation(name){
            game.numberFormatter = notations.find(n => n.name === name) || new ADNotations.StandardNotation();
        },
        formatNumber: functions.formatNumber
    },
    watch: {
        notationName(){
            this.setNotation(this.notationName);
        }
    },
    computed: {
        notationNames(){
            return notations.map(n => n.name);
        }
    },
    template: `<div class="notation-select">
    <label>Number Format 
    <select v-model="notationName">
        <option v-for="name in notationNames">{{name}}</option>
    </select>
    </label>
    <p>e. g. {{formatNumber(1)}}; {{formatNumber(1234)}}; {{formatNumber(3.1415e12)}}; {{formatNumber(1e36)}}</p>
</div>`
});