import { Telegraf } from 'telegraf'

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.command('start', (ctx) => {
  console.log(ctx.from);
  bot.telegram.sendMessage(ctx.chat.id, 'hello there! Welcome to my new telegram bot.', {});
});

//method that displays the inline keyboard buttons

bot.hears('animals', (ctx) => {
  console.log(ctx.from);
  let animalMessage = `great, here are pictures of animals you would love`;
  // ctx.deleteMessage();
  bot.telegram.sendMessage(ctx.chat.id, animalMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'cat-200',
            callback_data: 'cat-200',
          },
          {
            text: 'cat-600',
            callback_data: 'cat-600',
          },
        ],
      ],
    },
  });
});

//method that returns image of a cat-200

bot.action('cat-200', (ctx) => {
  bot.telegram.sendPhoto(ctx.chat.id, {
    source: 'res/cat-200.jpeg',
  });
});

//method that returns image of a cat-600

bot.action('cat-600', (ctx) => {
  bot.telegram.sendPhoto(ctx.chat.id, {
    source: 'res/cat-600.jpeg',
  });
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
