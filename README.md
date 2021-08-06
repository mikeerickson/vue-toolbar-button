# vue-toolbar-button

## Description

VueToolbarButton ...

## Installation

Using `npm`

```bash
npm i @codedungeon/vue-toolbar-button
```

Using `yarn`

```bash
yarn @codedungeon/vue-toolbar-button
```

## Usage

Vue Toolbar Button provides a series of `props` which control

TODO: Show Example Pictures

```html
<!-- displays button with plus icon and down arrow, no slot value so no button text -->
<vue-toolbar-button @click="onToolbar('show popup')" icon="far fa-plus" :down-arrow="true" arrow-size="mini"></vue-toolbar-button>

<vue-toolbar-button
    ref="new-icon-only"
    name="new-icon-only"
    title="New"
    icon="far fa-plus"
    :down-arrow="true"
    arrow-size="mini"
    :options="options"
    :dropdownOnly="true"
    @buttonClick="onButtonClick"
></vue-toolbar-button>

￼￼
<!-- displays button with plus icon, button text of `New` and down arrow in default (normal) statue -->
<vue-toolbar-button @click="onToolbar('new')" icon="far fa-plus" :down-arrow="true">
    New
</vue-toolbar-button>

<!-- displays button with no icon, button text and down arrow; in addition custom class has been applied -->
<vue-toolbar-button style="color: red;" @click="onToolbar('search')" :down-arrow="true">
    Use Custom Class
</vue-toolbar-button>
```

## Props

Vue Toolbar Button provides the following `props`

| **Prop**       | **Type**                   | **Description**                                                                            |
| -------------- | -------------------------- | ------------------------------------------------------------------------------------------ |
| `name`         | String                     | Unique name for component (similar to `ref` but ref can't be used as prop)                 |
| `icon`         | String                     | Something like font awesome here “fas fa-plus”                                             |
|                |                            | - if no slot data, downArrow will be next to icon and smaller text                         |
|                |                            | - if slot data, downArrow should be to right of slot data (see current New Contact button) |
| `downArrow`    | Boolean (default: `false`) | Show down arrow                                                                            |
| `arrowSize`    | String (default: `normal`) | Currently, it only supports `normal` or `mini`                                             |
| `disabled`     | Boolean (default: `false`) | Disable button                                                                             |
| `options`      | Array                      | Items displayed if **downArrow** enabled                                                   |
| `dropdownOnly` | Boolean (default: `false`) | Button should only trigger dropdown                                                        |

## Events

Vue Toolbar Button provides the following `events`

| **Event**     | **Description**                                                         |
| ------------- | ----------------------------------------------------------------------- |
| `buttonClick` | method executed on mouse click or arrow item selection                  |
|               | - **name** - the `name` property (for identify which button was clicked |
|               | - **menuItem** - if button dropdown item selected                       |

## Slots

Vue Toolbar Button provides a number of "slots" which can be used to override the default "props"

| **Slot**  | **Description**                                           |
| --------- | --------------------------------------------------------- |
| `default` | Typically contains the button text                        |
| `icon`    | Can be used in place of "icon" prop to use svg icons, etc |
| `arrow`   | Can be used in place of default down arrow                |

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for details.

## Security

If you discover any security related issues, please email [support@codedungeon.io](mailto:support@codedungeon.io) instead of using the issue tracker.

## Credits

vue-toolbar-button written by Mike Erickson

E-Mail: [mike.erickson@codedungeon.io](mailto:mike.erickson@codedungeon.io)

Twitter: [@codedungeon](http://twitter.com/codedungeon)

Website: [codedungeon.io](https://codedungeon.io)

## License

Copyright &copy; 2020 Mike Erickson
Released under the MIT [License](LICENSE)
