<template>
    <div class="vue-messenger-template">
        <div id="vue-messenger-copyright">
            <!--
                Vue Messenger
                Copyright (c) 2020-2021 Mike Erickson / Codedungeon.  All rights reserved.
                Licensed under the MIT license.  See LICENSE in the project root for license information.
            -->
        </div>
        <div v-bind="$attrs" v-on="$listeners" v-if="msgOpen && (msgDescription.length > 0 || msgTitle.length > 0)">
            <transition name="fade" appear>
                <div class="vue-messenger-header-message" :class="msgTypeClass">
                    <span class="vue-messenger-header-message-close" :class="msgCloseClass" @click="closeMessage">&times;</span>
                    <slot>
                        <div class="vue-messenger-header-message-title">
                            <span v-if="msgIcon && msgTitle.length > 0">
                                <i :class="msgIconClass"></i>
                            </span>
                            <span class="vue-messenger-header-message-title">{{ msgTitle }}</span>
                        </div>
                        <div class="vue-messenger-header-message-text">
                            <span v-if="msgIcon && msgTitle.length === 0"><i :class="msgIconClass"></i></span>
                            <!-- <span v-else><i style="color: transparent" :class="msgIconClass"></i></span> -->
                            <span v-html="msgDescription"></span>
                            <span v-if="moreMessageType.length > 0">
                                <span v-show="showMoreMessageLink" @click="showMoreMessage">
                                    <span class="vue-messenger-header-message-more" v-html="msgMoreLinkText"></span>
                                </span>
                                <span v-show="moreMessageOpen">
                                    <hr :class="moreMessageDividierClass" />
                                    <span v-if="moreMessageType === 'text'">
                                        {{ msgMore }}
                                    </span>
                                    <ul v-else class="vue-messenger-more-items">
                                        <li :key="index" v-for="(item, index) in msgMore">{{ getMarker(msgType) }} {{ item }}</li>
                                    </ul>
                                </span>
                            </span>
                        </div>
                    </slot>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
    name: "vue-messenger",
    components: {},
    props: {
        type: {
            type: String,
            default: "",
        },
        title: {
            type: String,
            default: "",
        },
        description: { type: String, default: "" },
        autoClose: { type: Boolean, default: false },
        autoCloseDelay: { type: [Number, String], default: 7500 },
        more: { type: [Array, String], default: "" },
        moreLinkText: { type: String, default: "show more" },
        icon: { type: [Boolean, String], default: false },
        debug: { type: Boolean, default: false },
    },
    data() {
        return {
            msgTypeOptions: ["alert", "danger", "error", "info", "success", "warning"],
            msgOpen: false,
            msgTitle: "",
            msgType: "",
            msgTypeClass: "",
            msgCloseClass: "",
            msgDescription: "",
            msgAutoClose: false,
            msgAutoCloseDelay: 7500,
            msgMore: [],
            moreMessage: false,
            moreMessageType: "",
            moreMessageOpen: false,
            showMoreMessageLink: true,
            msgMoreLinkText: "show more",
            msgIcon: false,
            msgIconClass: "",
            moreMessageDividierClass: "",
        }
    },
    methods: {
        updateMessage(data = {}) {
            this.closeMessage()

            this.$nextTick(() => {
                let defaultParams = {
                    type: "info",
                    title: "",
                    description: "",
                    more: "",
                    moreLinkText: "show more",
                    autoClose: false,
                    autoCloseDelay: 7500,
                    icon: false,
                }
                let msgInfo = Object.assign(defaultParams, data)

                if (msgInfo.debug) {
                    console.log("====== VUE MESSENGER DEBUG =====")
                    console.log(this)
                    console.log("====== VUE MESSENGER DEBUG =====")
                }

                if (this.msgType === "default") {
                    this.msgType = "info"
                }

                this.msgType = this.msgTypeOptions.includes(msgInfo.type) ? msgInfo.type : "info"

                this.msgTitle = msgInfo.title
                this.msgDescription = msgInfo.description

                // if we have only supplied message title, move it to message text
                if (this.msgDescription.length === 0) {
                    this.msgDescription = this.msgTitle
                    this.msgTitle = ""
                }
                this.msgMore = msgInfo.more
                this.msgMoreLinkText = msgInfo.moreLinkText
                this.msgAutoClose = msgInfo.autoClose
                this.msgAutoCloseDelay = parseInt(msgInfo.autoCloseDelay)
                this.msgTypeClass = `vue-messenger-header-message-${this.msgType}`
                this.msgCloseClass = `vue-messenger-header-message-close-${this.msgType}`
                this.moreMessage = false
                this.moreMessageType = this.msgMore ? (Array.isArray(this.msgMore) ? "array" : "text") : ""
                this.moreMessage = this.moreMessageType.length > 0
                this.moreMessageOpen = false
                this.showMoreMessageLink = this.moreMessageType.length > 0

                this.msgIcon = msgInfo.icon
                this.msgIconClass = this.getMsgIconClass(this.msgType)
                this.moreMessageDividierClass = `vue-messenger-more-divider-${this.msgType}`

                // all variables set, show the message
                this.msgOpen = true

                if (this.msgAutoClose) {
                    setTimeout(() => {
                        this.closeMessage()
                    }, this.msgAutoCloseDelay)
                }
            })
        },
        showMoreMessage() {
            this.showMoreMessageLink = false
            this.moreMessageOpen = true
        },
        closeMessage() {
            // only toggle if the message is already open
            // simple toggling caused issues with autoClose enabled (for obvious reasons)
            if (this.msgOpen) {
                this.msgOpen = false
            }
            this.$emit("closeMessage")
            this.$emit("close")
        },
        getMarker(type = "info") {
            let marker = "‣"
            switch (type) {
                case "danger":
                case "error":
                    marker = "✖︎"
                    break
                case "success":
                    marker = "✓"
                    break
                case "warning":
                    marker = "﹅"
                    break
                default:
                    marker = "‣"
            }
            return marker
        },
        getMsgIconClass(type = "info") {
            let className = "fas fa-info-circle"
            switch (type) {
                case "info":
                    className = "fas fa-info-circle"
                    break
                case "danger":
                case "error":
                    className = "fas fa-times-circle"
                    break
                case "success":
                    className = "fas fa-check-circle"
                    break
                case "warning":
                    className = "fas fa-exclamation-circle"
                    break
                default:
                    className = "fas fa-info-circle"
                    break
            }

            className = "icon " + className
            return className
        },
        getMoreDividerClass(type = "info") {
            let className = "vue-messenger-more-divider"
            switch (type) {
                case "error":
                    className = "vue-messenger-more-divider-error"
                    break
                case "success":
                    className = "vue-messenger-more-divider-error"
                    break
            }
            return className
        },
    },
    created() {
        var scripts = ["https://kit.fontawesome.com/86b695319c.js"]
        scripts.forEach(script => {
            let tag = document.createElement("script")
            tag.setAttribute("src", script)
            document.head.appendChild(tag)
        })
    },
    mounted() {
        if (this.title === "" && this.description === "") {
            this.closeMessage()
        }

        this.msgDescription = this.description
        this.msgType = this.msgTypeOptions.includes(this.type) ? this.type : "info"
        this.msgTitle = this.title
        this.msgTypeClass = `vue-messenger-header-message-${this.type}`
        this.msgCloseClass = `vue-messenger-header-message-close-${this.type}`
        this.msgMore = this.more
        this.moreMessageType = this.msgMore ? (Array.isArray(this.msgMore) ? "array" : "text") : ""

        this.msgAutoClose = this.autoClose
        this.msgAutoCloseDelay = parseInt(this.autoCloseDelay)
        this.msgIcon = this.icon
        this.msgIconClass = this.getMsgIconClass(this.msgType)
        this.moreMessageDividierClass = `vue-messenger-more-divider-${this.msgType}`

        this.msgOpen = this.msgTitle.length > 0 || this.msgDescription.length > 0

        if (this.msgAutoClose) {
            setTimeout(() => {
                this.closeMessage()
            }, this.msgAutoCloseDelay)
        }
        this.$on("vue-messenger_MESSAGE_UPDATE", data => {
            console.log(data)
        })
    },
}
</script>

<style scoped lang="scss">
#vue-messenger-copyright {
    display: none;
}

.vue-messenger-more-divider {
    padding-bottom: 0;
    &-info {
        // border-top: 1px solid #e7e7e7;
        border-top: 1px solid lightgray;
    }
    &-error {
        border-top: 1px solid pink;
    }
    &-danger {
        border-top: 1px solid pink;
    }
    &-success {
        border-top: 1px solid lightgreen;
    }
    &-warning {
        border-top: 1px solid #e4b06e;
    }
}

.vue-messenger-template {
    font-size: inherit;
    line-height: inherit;
}

.vue-messenger-header-message {
    background-color: #f2f2f3;
    margin: 0;
    color: #85888e;
    padding-top: 5px;
    padding: 5px 10px 10px 10px;

    &-error {
        background-color: #fceeee;
        color: #ec8b86;
    }

    &-danger {
        background-color: #fceeee;
        color: #ec8b86;
    }

    &-success {
        background-color: #eff7e9;
        color: #80bf5e;
    }
    &-warning {
        background-color: #fcf5ea;
        color: #e4b06e;
    }
}

.vue-messenger-header-message-close {
    float: right;
    color: #c7c7cd;
    font-size: 20px;
    cursor: pointer;
    opacity: 1;

    &-error {
        background-color: #fceeee;
        color: #ec8b86;
    }

    &-danger {
        background-color: #fceeee;
        color: #ec8b86;
    }

    &-success {
        background-color: #eff7e9;
        color: #80bf5e;
    }
    &-warning {
        background-color: #fcf5ea;
        color: #e4b06e;
    }
}

.vue-messenger-header-message-title {
    font-weight: bold;
    padding-bottom: 5px;
}

.vue-messenger-header-message-text {
    line-height: 20px;
}

.vue-messenger-header-message-more {
    text-decoration: underline;
    cursor: pointer;
    padding-left: 5px;
}

.vue-messenger-more-items {
    list-style: none;
    padding: 0;
    margin: 0;
    padding-top: 5px;
}

.icon {
    font-weight: 900;
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    padding-right: 4px;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>
