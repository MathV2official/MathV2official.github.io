app.component("country", {
    props: ["country", "locked"],
    template: `<div class="country">
<div class="header icon-flex" v-if="!locked">
    <country-flag :flag="country.flag"></country-flag>
    <span>{{country.name}}</span>
</div>
<div v-else>
    <h4>???</h4>
</div>
<div v-if="!locked" v-html="country.description"></div>
<div v-else>Visit more countries first.</div>
</div>`
});