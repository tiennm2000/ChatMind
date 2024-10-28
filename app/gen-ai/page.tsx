"use client";
import { runAi } from "@/actions/ai";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Markdown from "react-markdown";

export default function Page() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await runAi(query);
      console.log(data);
      setResponse(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-5">
      <form onSubmit={handleClick} className="flex">
        <div className="flex-1 mr-1">
          <Input
            className="mb-4"
            placeholder="Write question here!"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {/* <Button>Generate Answer</Button> */}
      </form>
      {loading && <p>Loading...</p>}
      {response && (
        <Card className="mt-5 bg-slate-200 dark:bg-slate-800">
          <CardContent>
            <Markdown className="mt-5 p-4 leading-8 text-gray-500 dark:text-gray-400">
              {response}
            </Markdown>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
