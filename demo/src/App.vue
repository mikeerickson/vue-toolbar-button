<template>
    <div id="app">
        <div class="header">
            <vue-messenger
                ref="vue-messenger"
                :debug="true"
                type="error"
                :icon="true"
                title="title"
                description="message description"
                :more="['item 1', 'item 2']"
                @closeMessage="handleCloseMessage"
            ></vue-messenger>
        </div>

        <div class="vue-toolbar-example" style="margin: 10px;">
            <h1>Vue Component Playground</h1>
            <hr class="divider" />

            <div class="toolbar-buttons">
                <vue-toolbar-button
                    ref="new-icon-only"
                    name="new-icon-only"
                    title="New"
                    icon="fas fa-plus"
                    :down-arrow="true"
                    arrow-size="mini"
                    :options="options"
                    :dropdown-only="true"
                    @buttonClick="onButtonClick"
                ></vue-toolbar-button>

                <vue-toolbar-button name="new" title="New" icon="fas fa-plus" :down-arrow="true" :options="newOptions" @buttonClick="onButtonClick">
                    New
                </vue-toolbar-button>

                <vue-toolbar-button name="delete" title="Delete" @buttonClick="onButtonClick" icon="far fa-trash-alt">
                    Delete
                </vue-toolbar-button>

                <vue-toolbar-button name="show-all" title="Show All" @buttonClick="onButtonClick" icon="far fa-window-restore">
                    Show All
                </vue-toolbar-button>

                <vue-toolbar-button name="select" title="Select" @buttonClick="onButtonClick" icon="fa fa-check">
                    Select
                </vue-toolbar-button>

                <vue-toolbar-button
                    name="clear"
                    title="Clear"
                    style="color: green;"
                    icon="far fa-window-restore"
                    :down-arrow="true"
                    arrow-size="mini"
                    class="test"
                    :options="newOptions"
                    @buttonClick="onButtonClick"
                >
                    Clear
                </vue-toolbar-button>

                <vue-toolbar-button name="search" title="Search" @buttonClick="onButtonClick" icon="fa fa-search" :disabled="true">
                    Search (Disabled)
                </vue-toolbar-button>

                <vue-toolbar-button class="my-toolbar-button" name="custom-search" title="Custom Search" @buttonClick="onButtonClick">
                    Search 2
                </vue-toolbar-button>

                <vue-toolbar-button style="color: red;" name="use-custom-class" title="Use Custom Class" @buttonClick="onButtonClick" :down-arrow="true">
                    Use Custom Class
                </vue-toolbar-button>

                <vue-toolbar-button title="Missing Name" style="color: red;" icon="fa fa-ban" :down-arrow="true" :options="newOptions" @buttonClick="onButtonClick">
                    Missing Name
                </vue-toolbar-button>

                <vue-toolbar-button name="bookmarks" title="Bookmarks" :down-arrow="true" :options="optionsObject" @buttonClick="onButtonClick">
                    Heroicons icon (outline)
                    <template v-slot:icon>
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" style="user-select: auto;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                                style="user-select: auto;"
                            ></path>
                        </svg>
                    </template>
                </vue-toolbar-button>

                <vue-toolbar-button name="cloud" title="Cloud" @buttonClick="onButtonClick">
                    Heroicons icon (solid)
                    <template v-slot:icon>
                        <svg class="w-6 h-6" fill="currentColor" style="user-select: auto;" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" style="user-select: auto;"></path>
                        </svg>
                    </template>
                </vue-toolbar-button>

                <vue-toolbar-button ref="test" title="Test" name="test" :down-arrow="true" :options="newOptions" @buttonClick="onButtonClick">
                    <template v-slot:icon>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path
                                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                            />
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                            />
                        </svg>
                    </template>
                    <template v-slot:arrow>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fill-rule="evenodd"
                                d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </template>
                    Test
                </vue-toolbar-button>

                VueToolbarButton {{ version }}
            </div>

            <br />
            <hr class="divider" />
            <pre>{{ info }}</pre>

            <hr class="divider" />
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est reprehenderit non officia quis velit et officiis numquam nisi quibusdam ea? Qui animi eius quaerat,
                quod nobis beatae suscipit molestiae saepe nam nisi omnis perferendis veniam pariatur autem fugit sint aperiam neque. Mollitia, nam. Odio aliquam cupiditate at qui
                corporis? Alias debitis quam ducimus nesciunt nam incidunt voluptatum facilis, quo perferendis ratione porro sit ullam unde hic! Illo possimus temporibus sequi
                blanditiis voluptate eius inventore modi saepe porro expedita labore quod, sunt officiis? Quis quibusdam dolore cum enim illum, soluta officia a dolorum eos sit
                consequatur hic fugit, impedit nihil corporis.
            </p>
        </div>

        <div id="vue-messenger-demo">
            <br />
            <span class="toolbar">
                <input type="checkbox" v-model="icon" />
                Icon
                <input type="checkbox" v-model="debug" />
                Debug (view console)
                <br />
                <br />
                <button @click="titleMessageOnly('info')">Title Message Only</button>
                <button @click="textMessageOnly('info')">Text Message Only</button>
                <button @click="updateMessage('info')">Info Message</button>
                <button @click="updateMessage('success')">Success Message</button>
                <button @click="updateMessage('warning')">Warning Message</button>
                <button @click="updateMessage('error')">Error Message</button>
                <button @click="updateMessage('danger')">Danger Message</button>
                <br />
                <br />
                <button @click="updateMessage('success', 'more message terxt')">Success Message w/ More Text</button>
                <button @click="updateMessage('success', ['item 1', 'item 2'])">Success Message w/ More</button>
                <button @click="updateMessage('danger', ['item 1', 'item 2'])">Danger Message w/ More</button>
                <button @click="updateMessage('error', ['item 1', 'item 2'])">Error Message w/ More</button>
                <button @click="updateMessage('info', ['item 1', 'item 2'])">Info Message w/ More</button>
                <button @click="updateMessage('warning', ['item 1', 'item 2'])">Warning Message w/ More</button>
            </span>
        </div>
        <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    </div>
</template>

<script>
import VueMessenger from "./components/VueMessenger.vue"
import VueToolbarButton from "./components/VueToolbarButton.vue"

export default {
    name: "App",
    components: { VueMessenger, VueToolbarButton },
    data() {
        return {
            icon: false,
            debug: false,
            info: "",
            version: "",
            test: "Timmy",
            family: ["Mike", "Kira", "Joelle", "Brady", "Trevor"],
            options: [
                "item 1",
                "item 2",
                "item 3",
                "item 4",
                "item 5",
                "item 5",
                "item 6",
                "item 7",
                "item 8",
                "item 9",
                "item 10",
                "item 11",
                "item 12",
                "item 13",
                "item 14",
                "item 15",
                "item 16",
                "item 17",
                "item 18",
                "item 19",
                "item 20",
            ],
            optionsObject: [
                { slug: "item-one", value: "item 1", disabled: false },
                { slug: "item-two", value: "item 2", disabled: false },
                { slug: "item-three", value: "item 3 (disabled)", disabled: true },
                { slug: "item-four", value: "item 4", disabled: false, separator: true },
                { slug: "item-five", value: "item 5", disabled: false },
            ],
            newOptions: ["item 1", "item 2", "item 3", "item 4", "item 5", "item 5"],
        }
    },
    methods: {
        handleCloseMessage() {
            console.log("Vue Messenger Event: close messasge event")
        },
        titleMessageOnly(type = "default") {
            this.$refs["vue-messenger"].updateMessage({ type, title: "Title", icon: this.icon, debug: this.debug })
        },
        textMessageOnly(type = "default") {
            this.$refs["vue-messenger"].updateMessage({ type, description: "Text Only", icon: this.icon, debug: this.debug })
        },
        updateMessage(type = "info", more = null) {
            this.$refs["vue-messenger"].updateMessage({
                type,
                title: "Message Title",
                description: "Message Description",
                more,
                moreLinkdescription: "click me",
                icon: this.icon,
                debug: this.debug,
            })
        },

        onButtonClick(data) {
            this.info = JSON.stringify(data)
                .replaceAll(",", ", ")
                .replaceAll(":", ": ")

            if (data.name.includes("missing")) {
                return
            }

            console.warn("onButtonClick: ", this.info)
            this.$refs["vue-messenger"].updateMessage({ type: "info", title: data.name, description: this.info, icon: true })
        },
    },
    mounted() {
        this.version = this.$refs.test.getVersion()
    },
}
</script>

<style lang="scss">
body,
html {
    padding: 0;
    margin: 0;
    font-size: 12px;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    font-size: 1.5rem;
    // margin-top: 60px;
}

.header {
    padding: 0;
    font-size: 1.2rem;
    margin-top: 0px;
    text-align: left;
}

button {
    margin-right: 10px;
    // width: 120px;
}

.vue-toolbar-example {
    text-align: left;
    font-size: 12px;
    padding-bottom: 5px;
}

hr.divider {
    color: lightgray;
}

.toolbar-buttons {
    padding-top: 5px;
    margin-top: 10px;
    display: flex;
}

.my-toolbar-button {
    color: blue;
    font-weight: bold;
}
</style>
