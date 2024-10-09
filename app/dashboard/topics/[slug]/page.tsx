"use client";
import Link from "next/link";
import Image from "next/image";
import topics from "@/utils/template";
import { ArrowLeft, Copy, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";
import { runAi, saveQuery } from "@/actions/ai";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import toast, { Toaster } from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import { Topic } from "@/lib/types";

export default function Page({ params }: { params: { slug: string } }) {
  const topic = topics.find((item) => item.slug === params.slug) as Topic;

  const [query, setQuery] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const editorRef = useRef<Editor>(null);

  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress || "";

  useEffect(() => {
    if (content) {
      const editorInstance = editorRef.current!.getInstance();
      editorInstance.setMarkdown(content);
    }
  }, [content]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await runAi(topic.aiPrompt + query);
      // save to db (userEmail, query, content, templateSlug)
      await saveQuery(topic, email, query, data);

      setContent(data);
    } catch (error) {
      setContent("An error ocurred. Please try again" + error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    const editorInstance = editorRef.current?.getInstance();
    const c = editorInstance.getMarkdown();
    try {
      await navigator.clipboard.writeText(c);
      toast.success("Content copied to clipboard!");
    } catch (err) {
      console.error("Fail to copy " + err);
    }
  };

  return (
    <div>
      {/* copy and back */}
      <div className="flex justify-between m-5">
        <Toaster />
        <Link href="/dashboard">
          <Button>
            <ArrowLeft />
            &nbsp; Back
          </Button>
        </Link>
        <Button onClick={handleCopy}>
          <Copy />
          &nbsp; Copy
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-5">
        {/* ai content */}
        <div className="col-span-1 bg-slate-100 dark:bg-slate-900 rounded-md border p-5">
          <div className="flex flex-col gap-3">
            <Image src={topic.icon} alt={topic.name} width={50} height={50} />
            <h2 className="font-medium text-lg">{topic.name}</h2>
            <p className="text-gray-500">{topic.desc}</p>
          </div>

          <form className="mt-6" onSubmit={handleSubmit}>
            {topic.form.map((item, index) => (
              <div className="my-2 flex flex-col gap-2 mb-7" key={index}>
                <label className="font-bold pb-5">{item.label}</label>

                {item.field === "input" ? (
                  <Input
                    name={item.name}
                    required={item.required}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                ) : (
                  <Textarea
                    name={item.name}
                    required={item.required}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                )}
              </div>
            ))}

            <Button type="submit" className="w-full py-6" disabled={loading}>
              {loading ? (
                <Loader2Icon className="animate-spin mr-2" />
              ) : (
                "Generate content"
              )}
            </Button>
          </form>
        </div>

        {/* ai response and text editor */}
        <div className="col-span-2">
          <Editor
            initialValue="Generated content will appear here."
            previewStyle="vertical"
            height="600px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            ref={editorRef}
            onChange={() =>
              setContent(editorRef.current!.getInstance().getMarkdown())
            }
          />
        </div>
      </div>
    </div>
  );
}
