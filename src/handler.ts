import { Bot, Context } from 'grammy';
import { LightStatus, toggleLights } from './rest/rest';

export const allowedUserIDs = [112558614];

export const handleCommand: (status: LightStatus, ctx: Context, bot: Bot) => Promise<void> = async (
  status,
  ctx,
  bot
) => {
  const { message: { from: { id: userId = undefined } = {} } = {} } = ctx;

  if (!userId || !allowedUserIDs.includes(userId)) {    
    await bot.api.sendMessage(
      String(userId),
      `У тебя нет доступа\\. Запомни: \`${userId}\``,
      { parse_mode: "MarkdownV2" },
    );

  } else {
    ctx.reply(status === 'on' ? 'Включаю' : 'Выключаю');
    const resut = await toggleLights(status);
    if (resut?.status === 200) {
      ctx.reply(status === 'on' ? 'Свет включен' : 'Свет выключен');
    } else {
      ctx.reply('Не получилось - попробуйте еще раз');
    }
  }
};
