// Import vue component

/*-------------------------------------------------------------------------------------------
 * Copyright (c) 2021-2022 Mike Erickson / Codedungeon.  All rights reserved.
 * Licensed under the MIT license.  See LICENSE in the project root for license information.
 * -----------------------------------------------------------------------------------------*/

import VueToolbarButton from "./src/VueToolbarButton.vue"

// Declare install function executed by Vue.use()
export function install(Vue) {
    if (install.installed) return
    install.installed = true
    Vue.component("vue-toolbar-button", VueToolbarButton)
}

// Create module definition for Vue.use()
const plugin = {
    install,
}

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null
if (typeof window !== "undefined") {
    GlobalVue = window.Vue
} else if (typeof global !== "undefined") {
    GlobalVue = global.Vue
}
if (GlobalVue) {
    GlobalVue.use(plugin)
}

// To allow use as module (npm/webpack/etc.) export component
export default VueToolbarButton
