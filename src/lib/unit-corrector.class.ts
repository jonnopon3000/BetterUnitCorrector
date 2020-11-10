import { Message } from 'discord.js';
import { ImperialConverter } from '@lib/convert/imperial-converter.class';
import { MetricConverter } from '@lib/convert/meric-converter.class';
import { ImperialDetector } from '@lib/detect/imperial-detector.class';
import { MetricDetector } from '@lib/detect/metric-detector.class';

/**
 * Main BetterUnitCorrector class
 */
class BetterUnitCorrector {

    private imperialDetector = new ImperialDetector();
    private MetricDetector = new MetricDetector();

    /**
     * Read messages and respond appropriately
     * 
     * @param message 
     */
    public message(message: Message): void {
        if (process.env.MODE === 'dev') {
            // in devmode, only respond in the specified channel
            if (message.channel.id !== process.env.DEV_CHANNEL_ID) {
                return;
            }
        }

        // do not let the bot respond to its own messages
        if (message.author.bot) {
            return;
        }

        const i = this.imperialDetector.detect(message.content);
        if (i) {
            message.channel.send(`converted: ${ImperialConverter.convertMilesToKm(parseInt(i[0], 10))} km`);
        }

        const m = this.MetricDetector.detect(message.content)
        if (m) {
            message.channel.send(`converted: ${MetricConverter.convertKMsToMiles(parseInt(m[0], 10))} miles`);
        }

        if (message.content.toLowerCase() === 'hi bot') {
            message.channel.send(`> ${message.content}\nhi!`);
        }
        else if (message.content.toLowerCase() === 'bye bot') {
            message.channel.send(`> ${message.content}\nbye!`);
        }
    }
}

export { BetterUnitCorrector };