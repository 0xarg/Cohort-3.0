"use client";

import { useQuery } from "@tanstack/react-query";

const Page = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts/");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
    refetchInterval: 10 * 1000,
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return <ul>{JSON.stringify(data)}</ul>;
};

export default Page;
