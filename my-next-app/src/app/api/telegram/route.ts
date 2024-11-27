// src/app/api/telegram/route.ts

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (message && message.text === '/start') {
      const chatId = message.chat.id;
      const text = "Hello, I am your bot! How can I assist you?";

      // Gửi tin nhắn đến Telegram bot
      const telegramUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
      const payload = {
        chat_id: chatId,
        text: text,
      };

      const response = await fetch(telegramUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.ok) {
        return NextResponse.json({ status: 'Message sent successfully' }, { status: 200 });
      } else {
        return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
      }
    }

    return NextResponse.json({ error: 'Invalid message format' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}