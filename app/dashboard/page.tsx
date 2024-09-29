"use client";
import topics from "@/utils/template";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Dashboard() {
  const [search, setSearch] = useState("");

  const filteredTopics = topics.filter((topic) =>
    topic.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="p-10 mb-5 mx-5 rounded-lg bg-slate-200 dark:bg-slate-800 flex flex-col justify-center items-center">
        <h1 className="text-xl">What would you like to create today?</h1>

        <div className="flex gap-2 items-center p-2 border border-gray-300 dark:border-gray-700 shadow-lg rounded-md bg-transparent my-5 w-[50%]">
          <Search className="text-primary" />
          <input
            type="text"
            className="bg-transparent w-full outline-none text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
        {filteredTopics.map((topic) => (
          <Link
            key={topic.slug}
            href={`/dashboard/topics/${topic.slug}`}
            className="p-5 shadow-md rounded-md border flex flex-col gap-3 cursor-pointer hover:scale-105 transition-all"
          >
            <Image
              src={topic.icon}
              alt={topic.name}
              width={50}
              height={50}
            ></Image>
            <h2 className="font-medium text-lg ">{topic.name}</h2>
            <p className="text-gray-500 line-clamp-3">{topic.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
