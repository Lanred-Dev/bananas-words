import { Client } from "discord.js";
import { join } from "path";
import parser from "../functions/parser";
import eventData from "../types/event";
const events: Array<string> = parser(join(__dirname, "./events"), ".ts");

export default function eventController(client: Client) {
    events.forEach((event: string) => {
        const { eventController, eventName, once }: eventData = require(event);

        if (once === true) {
            client.once(eventName, eventController);
        } else if (once === false) {
            client.on(eventName, eventController);
        }

        console.log(`started event: ${eventName}`);
    });
}
