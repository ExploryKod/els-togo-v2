import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import DragAndDropForm from "@/components/utilities/DragAndDropForm";
import {MessageCreateForm} from "@/components/section/messageCreateForm";
import {MessageList} from "@/components/section/messagesList";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex flex-col flex-1 items-center gap-20 w-full">
      <div className="w-full">
        <nav className="flex justify-center border-b border-b-foreground/10 w-full h-16">
          <div className="flex justify-between items-center p-3 w-full max-w-4xl text-sm">
            <AuthButton />
          </div>
        </nav>
      </div>

      <div className="flex flex-col flex-1 gap-20 opacity-0 px-3 max-w-4xl animate-in">
        <Header />
        <main className="flex flex-col flex-1 gap-6 my-5">
          <MessageCreateForm/>
          <MessageList />
          <DragAndDropForm/>
        </main>
      </div>
    </div>
  );
}
