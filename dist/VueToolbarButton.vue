<template>
    <span class="vue-toolbar-button-template" v-on="$listeners" v-bind="$attrs">
        <div id="vue-toolbar-button-copyright">
            <!--
                Vue Toolbar Button
                Copyright (c) 2021-2022 Mike Erickson / Codedungeon.  All rights reserved.
                Licensed under the MIT license.  See LICENSE in the project root for license information.
            -->
        </div>
        <span :class="toolbarButtonClass" @click="toggleMenu">
            <i v-show="icon.length > 0 && !hasIconSlot" style="padding-left: 2px; padding-right: 4px;" :class="icon"></i>
            <span v-if="hasIconSlot" class="vue-toolbar-button-icon vue-toolbar-button-icon-slot">
                <slot name="icon" class="vue-toolbar-button-icon-slot"></slot>
            </span>

            <span :class="hasDefaultSlot ? 'vue-toolbar-button-slot' : null">
                <slot></slot>
            </span>

            <span v-if="hasArrowSlot" class="vue-toolbar-button-icon arrow">
                <slot name="arrow"></slot>
            </span>

            <span v-if="!hasArrowSlot && downArrow && options.length > 0" :class="arrowSize === 'mini' ? 'arrow vue-toolbar-button-icon-mini' : 'arrow vue-toolbar-button-icon'">
                <svg class="arrow w-6 h-6" fill="currentColor" style="user-select: auto;" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                        style="user-select: auto;"
                    ></path>
                </svg>
            </span>
            <template v-if="options.length > 0">
                <ul :data-name="name" class="vue-toolbar-button-dropdown-menu vue-toolbar-button-dropdown" v-show="showMenu">
                    <li
                        :class="
                            typeof option === 'object' && option.hasOwnProperty('disabled') && option.disabled
                                ? 'vue-toolbar-button-dropdown-menu-item-disabled'
                                : 'vue-toolbar-button-dropdown-menu-item'
                        "
                        :style="typeof option === 'object' && option.hasOwnProperty('separator') && option.separator ? 'height: 3px; margin-right: 3px' : ''"
                        v-for="(option, idx) in options"
                        :key="idx"
                    >
                        <a href="javascript:void(0)" @click="onButtonClick(option)">
                            <span style="height: 3px" v-if="typeof option === 'object' && option.hasOwnProperty('separator') && option.separator">
                                <span class="vue-toolbar-button-line"></span>
                            </span>
                            <span v-else>
                                {{ typeof option === "string" ? option : option.value }}
                            </span>
                        </a>
                    </li>
                </ul>
            </template>
        </span>
    </span>
</template>

<script>
let VERSION = "v0.0.4 (18) -- 2021-08-08 10:30 PM"

export default {
    name: "vue-toolbar-button",
    components: {},
    emits: ["buttonClick"],
    props: {
        name: { type: String, default: "" },
        icon: { type: String, default: "" },
        downArrow: { type: Boolean, default: false },
        arrowSize: { type: String, default: "normal" },
        disabled: { type: Boolean, default: false },
        options: { type: [Array, Object], default: () => [] },
        dropdownOnly: { type: Boolean, default: false },
    },

    data() {
        return {
            showMenu: false,
        }
    },

    methods: {
        onButtonClick(menuItem = "") {
            if (!this.dropdownOnly) {
                this.showMenu = false
            }

            if (typeof menuItem === "object") {
                if ((menuItem.hasOwnProperty("disabled") && menuItem.disabled) || (menuItem.hasOwnProperty("separator") && menuItem.separator)) {
                    // do nothing, disabled or separator menu item
                } else {
                    this.$emit("buttonClick", { name: this.name, slug: menuItem.slug, menuItem: menuItem.value })
                }
            } else {
                this.$emit("buttonClick", { name: this.name, menuItem })
            }
        },

        getBodyHeight() {
            const { body, documentElement: html } = document
            return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)
        },

        toggleMenu(event) {
            let hasArrow =
                event.path.filter(item => {
                    return typeof item.className === "string" && item.className.includes("arrow")
                }).length > 0

            let className = event.path[0].className
            if (className.length === 0 && !this.dropdownOnly) {
                return
            }

            if (typeof className === "object") {
                className = className.hasOwnProperty("baseVal") ? className.baseVal : ""
            }

            if ((this.name.length > 0 && hasArrow) || this.dropdownOnly) {
                if (this.name.length === 0) {
                    console.error(`VueToolbarButton: missing 'name' prop`)
                    return
                }
                let menu = document.querySelector(`*[data-name=${this.name}]`)
                menu.style.left = menu.parentElement.offsetLeft - 10 + "px"

                let availableHeight = this.getBodyHeight() - menu.parentElement.offsetTop - 50
                menu.style.maxHeight = availableHeight + "px"

                if (this.options.length > 0) {
                    this.showMenu = !this.showMenu
                }
            } else {
                let name = this.name
                if (name.length === 0) {
                    name = "missing 'name' prop"
                    console.error(`VueToolbarButton: ${name}`)
                }

                if (event.target.className !== "vue-toolbar-button-line") {
                    this.$emit("buttonClick", { name, menuItem: null })
                }
            }
        },

        clickHandler(event) {
            const { target } = event
            const { $el } = this

            if (!$el.contains(target)) {
                this.showMenu = false
            }
        },

        getVersion() {
            return VERSION
        },
    },

    beforeDestroy() {
        document.removeEventListener("click", this.clickHandler)
    },

    mounted() {
        if (this.downArrow && this.options.length === 0) {
            console.error(`VueToolbarButton [${this.name}]: When using 'downArrow' prop, you need to also supply 'options' prop`)
        }
        document.addEventListener("click", this.clickHandler)
    },

    computed: {
        hasDefaultSlot() {
            return Object.keys(this.$slots).includes("default")
        },

        hasIconSlot() {
            return Object.keys(this.$slots).includes("icon")
        },

        hasArrowSlot() {
            return Object.keys(this.$slots).includes("arrow")
        },

        toolbarButtonClass() {
            if (this.options.length > 0) {
                let defaultClass = !this.disabled ? "vue-toolbar-button-with-dropdown" : "vue-toolbar-button-disabled"
                if (this.showMenu) {
                    defaultClass = "vue-toolbar-button-with-dropdown-open"
                }
                return defaultClass
            } else {
                return !this.disabled ? "vue-toolbar-button" : "vue-toolbar-button-disabled"
            }
        },
    },
}
</script>

<style scoped lang="scss">
$border-color: #e7e7e7;
$button-border-color: lightgray;
$button-hover-background-color: #e7edfd;

.vue-toolbar-button-template {
    font-family: inherit;
}

.vue-toolbar-button {
    font-family: inherit;
    border: 1px solid $button-border-color;
    padding: 6px;
    padding-bottom: 4px;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background-color: $button-hover-background-color;
    }
    text-align: center;
    margin-right: 6px;
}

.vue-toolbar-button-with-dropdown {
    font-family: inherit;
    border: 1px solid $button-border-color;
    padding: 6px;
    padding-bottom: 4px;
    border-radius: 4px;
    cursor: pointer;
    width: 1500px;
    &:hover {
        background-color: $button-hover-background-color;
    }
    margin-right: 6px;
}

.vue-toolbar-button-with-dropdown-open {
    font-family: inherit;
    border: 1px solid $button-border-color;
    padding: 6px;
    padding-bottom: 4px;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 6px;
    background-color: #e7edfd;
    // color: white;
}

.vue-toolbar-button-disabled {
    border: 1px solid $border-color;
    padding: 6px;
    padding-bottom: 4px;
    border-radius: 4px;
    margin-right: 6px;
    opacity: 0.5;
    pointer-events: none;
    cursor: not-allowed;
}

.vue-toolbar-button-slot {
    padding-left: 2px;
    padding-right: 2px;
}

.vue-toolbar-button-dropdown {
    position: absolute;
    border-radius: 4px;
    left: 0;
    z-index: 1000;
    float: left;
    min-width: 160px;
    max-height: 350px;
    overflow: hidden;
    overflow-y: scroll;
    padding-left: 6px;
    margin-left: 3px;
    list-style: none;
    text-align: left;

    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
    background-clip: padding-box;

    background-color: white;
    margin-left: 10px;
    margin-top: 10px;
    border: 1px solid $border-color;
}

.vue-toolbar-button-dropdown-menu-item {
    height: 28px;
    width: 100%;
    background: white;
    padding-top: 6px;
}

.vue-toolbar-button-dropdown-menu-item-disabled {
    height: 28px;
    width: 100%;
    color: lightgray;
    padding-top: 6px;
    background-color: white;
}

.vue-toolbar-button-dropdown-menu-item-disabled > a {
    display: block;
    clear: both;
    font-weight: normal;
    color: lightgray;
    white-space: nowrap;
    text-decoration: none;
    padding-left: 4px;
    line-height: 2;
}

.vue-toolbar-button-dropdown-menu-item > a {
    display: block;
    clear: both;
    font-weight: normal;
    color: #333333;
    white-space: nowrap;
    text-decoration: none;
    padding-left: 4px;
    line-height: 2;
}

.vue-toolbar-button-dropdown-menu-item > a:hover {
    background-color: $button-hover-background-color;
    border-radius: 4px;
    line-height: 2;
    padding-right: 5px;
    margin-right: 5px;
}

.vue-toolbar-button-icon {
    vertical-align: middle;
    margin-top: -2px;
    display: inline-block;
    width: 16px;
    height: 16px;
    overflow: hidden;
}

.vue-toolbar-button-icon-mini {
    vertical-align: middle;
    margin-top: -2px;
    display: inline-block;
    width: 12px;
    height: 12px;
    overflow: hidden;
}

.vue-toolbar-button-line {
    display: inline;
    z-index: 100;
    float: left;
    clear: left;
    padding-right: 5px;
}

.vue-toolbar-button-line::after {
    position: absolute;
    content: "\00a0";
    width: 88%;
    margin-top: -25px;
    border-bottom: 1px solid #e7e7e7;
    z-index: 0;
}
</style>
