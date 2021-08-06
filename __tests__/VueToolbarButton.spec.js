// import { expect } from "chai"
// import { shallowMount } from "@vue/test-utils"
// import VueToolbarButton from "@/src/VueToolbarButton.vue"

const { expect } = require("chai")
const { shallowMount } = require("@vue/test-utils")
const VueToolbarButton = require("./../dist/vue-toolbar-button.js")

describe("VueToolbarButton.vue", () => {
    it("renders props.msg when passed", () => {
        const msg = "Hello World"
        const wrapper = shallowMount(VueToolbarButton, {
            propsData: { description: msg },
        })
        expect(wrapper.text()).to.include(msg)
    })
})
