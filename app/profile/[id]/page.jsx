"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";

import Profile from "@components/profile";

function MyProfile() {
  const { data: session } = useSession();
  const params = useParams();
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const profileId = params.id;
  const profileName = searchParams.get("name");
  console.log(profileName);
  console.log(profileId);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${profileId}/posts`);
      const data = await response.json();
      setPosts(data);
    };

    if (profileId) fetchPosts();
  }, [profileId]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((p) => p._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name={profileName}
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}

export default MyProfile;
