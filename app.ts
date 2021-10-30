import { Bot } from "grammy";
import { handleCommand } from "./src/handler";
import { addLog } from "./src/utils";

const bot = new Bot(process.env.BOT_TOKEN || '');

bot.command("on", async (ctx) => handleCommand("on", ctx, bot));

bot.command("off", async (ctx) => handleCommand("off", ctx, bot));

bot.start();

addLog('LAUNCH');
