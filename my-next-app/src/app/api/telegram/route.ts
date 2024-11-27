import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  // Kiểm tra xem dữ liệu từ Telegram có hợp lệ không
  if (!body || !body.message) {
    return NextResponse.json({ status: "Invalid request" }, { status: 400 });
  }

  const chatId = body.message.chat.id;
  const message = body.message.text;

  // Phản hồi khi nhận được lệnh /start
  if (message === "/start") {
    await fetch(`https://api.telegram.org/bot7647129554:AAFxjqf-re8bsdbq1V8v5yB-jzqHT4pE6lI/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: "Chào bạn! Tôi đã hoạt động thành công 🎉."
      }),
    });

    return NextResponse.json({ status: "Message sent" });
  }

  return NextResponse.json({ status: "No action" });
}