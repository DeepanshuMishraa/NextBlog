"use client"

import axios from "axios";
import { useEffect, useState } from "react";

interface Blog {
  id: number;
  title: string;
  content: string;
  image:string;
}

export function BlogComp() {
  const [blogData, setBlogData] = useState<Blog[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/blogs");
        setBlogData(res.data.blogs);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  console.log(blogData);

  return (
    <main className="container mx-auto px-4 py-8 md:px-6 lg:py-12">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
        {blogData && blogData.length > 0 ? ( // Check if blogData is not null and has a length greater than 0
          blogData.map((blog: Blog) => (
            <article key={blog.id} className="rounded-lg hover:scale-110 duration-200 overflow-hidden max-lg:hover:scale-105 shadow-lg">
              <img
                alt="Blog post image"
                className="w-full h-48 object-cover"
                height="200"
                src={blog.image}
                style={{
                  aspectRatio: "400/200",
                  objectFit: "cover",
                }}
                width="400"
              />
              <div className="p-4 bg-white">
                <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                <p className="text-gray-500 dark:text-gray-400 line-clamp-3">{blog.content}</p>
              </div>
            </article>
          ))
        ) : (
          <p>No blog posts available.</p> // Render a message if blogData is null or empty
        )}
      </div>
    </main>
  );
}