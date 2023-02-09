app.component("upgrade", {
    props: ["upgrade"],
    template: `<div class="upgrade">
<div class="icon-flex">
    <img src="images/icons/upgrades.png"/>
    <h4><slot name="title"></slot></h4>
</div>
<p><slot name="description"></slot></p>
<p>{{upgrade.getEffectDisplay()}}</p>
<button :disabled="!upgrade.canBuy()" @click="upgrade.buy()">{{upgrade.getPriceDisplay()}}</button>
</div>`
});