import { ServerActionsSection } from "./_components/ServerActionsSection"
import { StreamSection } from "./_components/StreamSection";

export default function Home() {

  

  return (
    <div className="p-4 max-w-[800px] w-full mx-auto">
      <header>
      <h1 className="text-4xl">Next.js + Python</h1>
      <p>Next.js+Pythonのテスト</p>
      </header>
      
      <div className="py-4 flex flex-col gap-2">
        <ServerActionsSection />
        <StreamSection />
      </div>
    </div>
  );
}
