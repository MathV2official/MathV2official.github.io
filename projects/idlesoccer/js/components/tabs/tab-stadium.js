app.component("tab-stadium", {
    data(){
        return {
            stadium: game.stadium,
            money: game.money
        }
    },
    methods: {
        formatNumber: functions.formatNumber
    },
    template: `<div class="tab-stadium">
<p class="money">You have {{formatNumber(money)}} $</p>
<stadium :stadium="stadium"></stadium>
</div>`
});