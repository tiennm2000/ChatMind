"use client";
import { useState, useEffect } from "react";
import { getQueries } from "@/actions/ai";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import QueryTable from "@/components/table/query-table";

interface QueryResponse {
  queries: any[];
  totalPages: number;
}

export default function Page() {
  const [queries, setQueries] = useState<any>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const email = user?.primaryEmailAddress?.emailAddress || "";

  const fetchQueries = async (page: number, reset = false) => {
    setLoading(true);
    try {
      const res = (await getQueries(email, page, perPage)) as QueryResponse;
      if (reset) {
        setQueries(res.queries);
      } else {
        setQueries((prevQueries: any[]) => [...prevQueries, ...res.queries]);
      }
      setTotalPages(res.totalPages);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page === 1 && email) {
      fetchQueries(page, true);
    }
  }, [email]);

  useEffect(() => {
    if (page > 1 && email) fetchQueries(page);
  }, [page, email]);

  return (
    <div>
      <div
        className="p-10 mx-5 mb-5 rounded-lg bg-gradient-to-r from-slate-200 via-slate-300 to-slate-500
     dark:from-slate-800 dark:via-slate-700 dark:to-slate-600
     flex flex-col justify-center"
      >
        <h1 className="text-xl">History</h1>
        <p className="text-sm text-gray-500">Your previous search results</p>
      </div>

      <div className="p-5 rounded-lg flex flex-col justify-center">
        <QueryTable data={queries} />
      </div>

      <div className="text-center mb-5">
        {page < totalPages && (
          <Button onClick={() => setPage(page + 1)} disabled={loading}>
            {loading && <Loader2Icon className="animate-spin mr-2" />}Load more
          </Button>
        )}
      </div>
    </div>
  );
}
