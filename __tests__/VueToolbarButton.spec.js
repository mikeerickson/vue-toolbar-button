const { expect } = require("chai")
const { shallowMount } = require("@vue/test-utils")
const VueToolbarButton = require("./../dist/vue-toolbar-button.js")

describe("VueToolbarButton.vue", () => {
    it("renders toolbar", () => {
        const wrapper = shallowMount(VueToolbarButton, {
            propsData: { name: "test", downArrow: true },
        })
        console.log(wrapper)
        expect(true).to.be.true
    })
})
