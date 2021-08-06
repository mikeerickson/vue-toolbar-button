#!/usr/bin/env node

/*-------------------------------------------------------------------------------------------
 * Copyright (c) Mike Erickson / Codedungeon.  All rights reserved.
 * Licensed under the MIT license.  See LICENSE in the project root for license information.
 * -----------------------------------------------------------------------------------------*/

// need to disable for the file as eslint is hammering async code

/*eslint-disable */

const fs = require("fs")
const path = require("path")
const execa = require("execa")
const chalk = require("colors")
const Messenger = require("@codedungeon/messenger")

// TODO: Need to flush this script
console.log("")
Messenger.note("*** Incomplete Test Script ***", "NOTE")
console.log("")
Messenger.log(" * Add mocha testing")
Messenger.log(" * Add jest testing")
Messenger.log(" * Add to ./tasks")
process.exit(0)
;(async () => {
    try {
        let { stdout } = await execa("eslint", ["./**/*.{ts,tsx,js,jsx,vue}", "--fix"], { stdio: "inherit" })
        console.log("")
        Messenger.success("No linting errors found", "SUCCESS")
    } catch (err) {
        console.log(err.stdout)
    }
})()
