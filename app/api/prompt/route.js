// app/api/prompt/route.js
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request) => {
  try {
    await connectToDB();

    const search = request.nextUrl.searchParams.get("search") || "";
    const searchRegex = new RegExp(search, "i");

    let prompts = await Prompt.find({}).populate("creator");

    if (search) {
      prompts = prompts.filter(
        (post) =>
          searchRegex.test(post.prompt) ||
          searchRegex.test(post.tag) ||
          searchRegex.test(post.creator.username)
      );
    }

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.error("Search error:", error);
    return new Response("Failed to retrieve prompts", { status: 500 });
  }
};


