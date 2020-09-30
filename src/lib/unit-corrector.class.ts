import { Message, Client, TextChannel } from 'discord.js';
import { ImperialConverter } from '@lib/imperial-converter.class';
import { MetricConverter } from '@lib/meric-converter.class';

/**
 * Main BetterUnitCorrector class
 */
class BetterUnitCorrector {

    private milesRegex = /([0-9]+)\smiles/;
    private kmRegex = /([0-9]+)\skm/;

    /**
     * Counter
     */
    private count = 0;

    /**
     * Maximum value for the counter
     */
    private maxCount = 10;

    /**
     * TextChannel to send messages to
     */
    private channel?: TextChannel;

    /**
     * Constructor
     * 
     * @param client the Discord client
     */
    public constructor(private client: Client) { }

    /**
     * Discord Client Ready hook
     */
    public ready(): void {
        this.retrieveChannel();
        // this.beginSendLoop();
    }

    /**
     * Read messages and respond appropriately
     * 
     * @param message 
     */
    public message(message: Message): void {
        // only respond in the specified channel, for now (testing purposes)
        if (message.channel.id !== process.env.TEST_CHANNEL_ID) {
            return;
        }

        const x = this.milesRegex.exec(message.content);
        if (x) {
            message.channel.send(`converted: ${ImperialConverter.convertMilesToKm(parseInt(x[0], 10))}`);
        }

        const y = this.kmRegex.exec(message.content);
        if (y) {
            message.channel.send(`converted: ${MetricConverter.convertKMsToMiles(parseInt(y[0], 10))}`);
        }

        if (message.content.toLowerCase() === 'hi bot') {
            message.channel.send(`> ${message.content}\nhi!`);
        }
        else if (message.content.toLowerCase() === 'bye bot') {
            message.channel.send(`> ${message.content}\nbye!`);
        }
    }

    /**
     * Retrieve the channel specified by the environment to send messages to
     */
    private async retrieveChannel(): Promise<void> {
        // unsafe casting because in early dev I know the channel in question exists
        this.channel = await this.client.channels.fetch(process.env.TEST_CHANNEL_ID ?? '') as TextChannel;
    }

    /**
     * Testing timed messages
     * 
     * @param max max to count to, defaulting to this.maxCount
     */
    private beginSendLoop(max: number = this.maxCount): void {
        const i = setInterval(() => {
            if (++this.count <= max) {
                this.channel?.send(this.count);
            }
            else {
                clearInterval(i);
            }
        }, 5000);
    }
}

export { BetterUnitCorrector };