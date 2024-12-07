import { spawn } from "child_process";

import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  const currentDirectory = process.cwd();
  const python = spawn("python3", [
    `${currentDirectory}/python/fizzbazz.py`,
    searchParams.get("start") ?? "10",
    searchParams.get("end") ?? "20",
  ], { env: { ...process.env, PYTHONUNBUFFERED: '1' } });

  const readableStreamDefaultWriter = new ReadableStream({
    start(controller) {
      // 標準出力をキャプチャ
      python.stdout.on("data", (data) => {
        console.log(data.toString());
        controller.enqueue(data);
      });

      // 標準エラー出力をキャプチャ
      python.stderr.on("data", (data) => {
        controller.enqueue(data.toString());
      });

      // プロセス終了時にストリームを閉じる
      python.on("close", () => {
        controller.close();
      });
    },
    cancel() {
      // プロセスがキャンセルされた場合に子プロセスを終了する
      python.kill();
    },
  });

  return new Response(readableStreamDefaultWriter);
}
