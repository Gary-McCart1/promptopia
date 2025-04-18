"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

function Feed() {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleTagClick = (post) => {
    setSearchText(post);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const fetchPosts = async () => {
        const res = await fetch(`/api/prompt?search=${searchText}`);
        const data = await res.json();
        setPosts(data);
      };
      fetchPosts();
    }, 500); // debounce delay
  
    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setPosts(data);
    };
    fetchAllPosts();
  }, []);
  
  

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={posts} handleTagClick={handleTagClick} />
    </section>
  );
}

export default Feed;
