/**
 * Register support for Module Aliases
 */
import moduleAlias from 'module-alias';
moduleAlias.addAliases({
    '@config': `${__dirname}/config`,
    '@lib': `${__dirname}/lib`
});

/**
 * Module Dependencies
 */
import { Client } from 'discord.js';

import { BetterUnitCorrector } from '@lib/unit-corrector.class';

// simple error handling for key env stuff
// technically DotEnvSafe does this checking for us but the TS Compiler doesn't know about that
if (!process.env.DISCORD_BOT_TOKEN) {
    console.error('NO BOT TOKEN FOUND IN ENVIONMENT');
    process.exit(1);
}
if (!process.env.MODE) {
    console.error('NO MODE FOUND IN ENVIRONMENT');
    process.exit(1);
}
if (!process.env.DEV_CHANNEL_ID) {
    console.error('NO DISCORD CHANNEL ID IN ENVIRONMENT');
    process.exit(1);
}

// set up the Discord Client and BetterUnitCorrector bot instance
const client = new Client();
const bot = new BetterUnitCorrector();

/** hook the 'ready' Client event */
// client.on('ready', bot.ready.bind(bot));

/** hook the 'message' Client event */
client.on('message', bot.message.bind(bot));

/** Tell the Client to log in with our environment-bound token */
client.login(process.env.DISCORD_BOT_TOKEN);