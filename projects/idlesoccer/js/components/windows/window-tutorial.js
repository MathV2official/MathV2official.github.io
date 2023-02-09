app.component("window-tutorial", {
    emits: ["tutorialexit", "page"],
    template: `<window class="window-tutorial">
    <template v-slot:header><slot name="header"></slot></template>
    <template v-slot:body>
        <div class="navigation">
            <button v-for="i in 6" @click="$emit('page', i - 1)">{{i}}</button>
            <button @click="$emit('tutorialexit')">Exit Tutorial</button>
        </div>
        <div class="image">
            <slot name="image"></slot>
        </div>
        <slot name="body"></slot>
    </template>
</window>`
});