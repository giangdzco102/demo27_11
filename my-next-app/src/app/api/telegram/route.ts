import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Kiểm tra nếu tin nhắn là /start
  if (body.message?.text === '/start') {
    const chatId = body.message.chat.id;
    const userName = body.message.from.first_name || 'bạn';

    // Gửi tin nhắn phản hồi tới Telegram
    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: `Chào ${userName}! Tôi là bot được kết nối từ Next.js.`,
      }),
    });

    return NextResponse.json({ status: 'Message sent' });
  }

  return NextResponse.json({ status: 'No action taken' });
}