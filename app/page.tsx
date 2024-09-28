"use client";
import { runAi } from "@/actions/ai";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
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
    <>
      <form onSubmit={handleClick}>
        <Input
          className="mb-4"
          placeholder="Write question here!"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button>Generate Answer</Button>
      </form>

      <Card className="mt-3">
        <CardHeader>AI response</CardHeader>
        <CardContent>
          {loading ? "Loading..." : <Markdown>{response}</Markdown>}
        </CardContent>
      </Card>
    </>
  );
}
