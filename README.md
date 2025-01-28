# BOM (Bureau of Meteorology) Weather Card

[![License][license-shield]](LICENSE)

A [Home Assistant](https://www.home-assistant.io) card designed to display weather information in the style of the [BOM (Bureau of Meteorology) Australia app](https://play.google.com/store/apps/details?id=au.gov.bom.metview&hl=en_AU)

**TODO: Insert Screenshots**

## Weather Providers

This card works best when paired with [Bremor's Bureau of Meteorology Custom Component](https://github.com/bremor/bureau_of_meteorology) as a Home Assistant weather provider, but should work with other providers if they follow consistent weather entity naming.

## Behavior

- Responds to the `sun.sun` entity for Day / Night mode
- Responds to the current theme to adjust for dark/light mode theme settings
- Shows different values depending on the time of day (this is assumed behavior derived from observing the app and not verified as exactly how the BOM app behaves):
  - 4am -> 12pm (Morning): Min / Max (Last night's min, Today's Max)
  - 12pm -> 6pm (Afternoon): Max / Overnight Min (Today's Max, Tonight's Min)
  - 6pm -> 4am (Evening): Overnight Min / Tomorrow's Max (Tonight's Min, Tomorrow's Max)

# Development

This repo is setup to allow you to develop this card locally using a pre-configured Home Assistant instance in a Docker container.

## Prerequisites

- [NodeJS](https://nodejs.org)
- [Docker](https://www.docker.com)

## Recommendations

- [VSCode](https://code.visualstudio.com)
  - [ESLint Extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [Lit Plugin Extension](https://marketplace.visualstudio.com/items?itemName=runem.lit-plugin)
  - [Prettier Extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
  - [Svg Preview](https://marketplace.visualstudio.com/items?itemName=SimonSiefke.svg-preview)

## Getting Started

The following commands pull the repository, install the dependencies, run the Home Assistant Docker container and start the development web server:

```bash
git clone https://github.com/dJPoida/ha-bom-weather-card
cd ha-bom-weather-card
npm i
npm run hass:start
npm run serve
```

## Accessing the Local Dev Site

Once the docker container is running and the rollup server has built and is serving the code, you can access the Home Assistant server on [http://localhost:8123](http://localhost:8123) and test the bom-weather-card on the [Test Dashboard](http://localhost:8123/test-dashboard).

The build `bom-weather-card.js` will be served by rollup on [http://localhost:4000] and loaded dynamically into Home Assistant.

To preview your changes in realtime, change the code and refresh the browser.

## Initial Setup of the Home Assistant Docker container

The first time you start the container using `npm run hass:start` and browse to [http://localhost:8123](http://localhost:8123), you will need to perform these steps:

1. Follow through the setup wizard
2. Add the integration for [Bremor's Bureau of Meteorology Custom Component](https://github.com/bremor/bureau_of_meteorology) weather provider
   1. Browse to **[Settings -> Devices and Services](http://localhost:8123/config/integrations/dashboard)**
   2. Click **"+ Add Integration"**
   3. Search for **Bureau of Meteorology**
   4. Follow through the setup wizard to install the weather entities. Ideally select and create ALL entities so that you can test all card features.

## Additional Home Assistant plugins

Because the Home Assistant is [installed in a Docker Container and not as a Supervised instance](https://www.home-assistant.io/installation/#advanced-installation-methods), many of the configuration features like addons are not available. To access these other features you will need to install and run Home Assistant differently.

### Bremor's Bureau of Meteorology weather provider

[bremor's Bureau of Meteorology Custom Component](https://github.com/bremor/bureau_of_meteorology) weather provider can be added by following these steps:

1. Ensure Home Assistant is running via `npm run hass:start`
2. Run `npm run install:bureau_of_meteorology`
3. Restart the container `npm run hass:restart`
4. Browse to **[Settings -> Devices and Services](http://localhost:8123/config/integrations/dashboard)**
5. Click **"+ Add Integration"**
6. Search for **Bureau of Meteorology**
7. Follow through the setup wizard to install the weather entities. Ideally select and create ALL entities so that you can test all card features.

### Home Assistant Community Store (HACS)

The [Home Assistant Community Store (HACS)](https://www.hacs.xyz/) can be added by follow these steps:

1. Ensure Home Assistant is running via `npm run hass:start`
2. Run `npm run install:hacs`
3. Restart the container `npm run hass:restart`
4. Browse to **[Settings -> Devices and Services](http://localhost:8123/config/integrations/dashboard)**
5. Click **"+ Add Integration"**
6. Search for **HACS**
7. Follow through the setup wizard.
8. Restart Home Assistant (or the docker container via `npm run hass:restart`)

# NPM Scripts

**`npm run build`** \
Build the component for production. The output file ends up in the `./dist` folder.

**`npm run serve`** \
Build, watch and serve the component for active development. Rollup will host a web server on [http://localhost:4000](http://localhost:4000) with `./dist` as the content base, making the `bom-weather-card.js` available for testing in the Home Assistant Docker container. Any changes are compiled immediately and can be reviewed by refreshing the browser.

**`npm run hass:start`** \
Starts the Home Assistant Docker container. This is essentially a wrapper around `docker-compose up -d`. The first time this is executed it may take longer than usual as it downloads the required images.

**`npm run hass:restart`** \
Restarts the Home Assistant Docker container. This is essentially a wrapper around `docker-compose restart`.

**`npm run hass:stop`** \
Stops the Home Assistant Docker container. This is essentially a wrapper around `docker-compose stop`.

**`npm run hass:clean`** \
Reset the Home Assistant Docker instance by cleaning out the `.devcontainer` folder. Make sure the container is not running before executing this command. \
**WARNING**: You will lose all of your previously configured Home Assistant devices and entities

**`npm run install:bureau_of_meteorology`** \
Install [Bremor's Bureau of Meteorology weather provider](#bremors-bureau-of-meteorology-weather-provider) into your Home Assistant Docker container

**`npm run install:hacs`** \
Install [Home Assistant Community Store (HACS)](#home-assistant-community-store-hacs) into your Home Assistant Docker container

## Troubleshooting

### "Custom element doesn't exist: bom-weather-card"

If you receive this message when debugging the card in Home Assistant, first try refreshing the page. If it persists, it usually means that you haven't started the rollup web server by running `npm run serve`.

### "The edit UI is not available when in YAML mode."

This message appears when you try to edit the Test View in the Test Dashboard. Unfortunately the test dashboard is controlled by the .yaml in this repo and thus can't be edited. Create a new view in the Overview dashboard to manually create instances of this component and experiment with the edit component.

### Can't edit the default dashboard

This dashboard is initially controlled by Home Assistant. To to take control of it:

- Click the pencil (edit) button in the top right
- Select the three dots menu and select "Take Control"

# Links and References:

- [custom-card-helpers Documentation](https://custom-cards.github.io/custom-card-helpers/index.html)
- [Home Assistant Frontend Component Source](https://github.com/home-assistant/frontend/tree/dev/src/components)

# Acknowledgements

- Thanks to [Bas Milius](https://bas.dev) for the weather icons used in this project. check out his project here: [Meteocons v2.0.0](https://github.com/basmilius/weather-icons/releases/tag/v2.0.0).

# TODO

- Implement Tests
- Move the TODO list to [Issues](https://github.com/dJPoida/ha-bom-weather-card/issues)
- Split the README.md into smaller pieces aimed at contextual guidance for installation, development and contribution etc...
- Find a way to use strict typing for Home Assistant Lit Components and remove the `no-unknown-tag-name` lit-plugin rule.
- Limit the Entity Picker to only Weather Entities
- Styles
  - Allow removing the card border
  - Allow not using full color background
- [Publish on HACS](https://www.hacs.xyz/docs/publish/)
