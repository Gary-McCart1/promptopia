import { Suspense } from "react";
import EditPromptClient from "@components/EditPromptClient";

const UpdatePromptPage = () => {
  return (
    <Suspense fallback={<div>Loading Edit Form...</div>}>
      <EditPromptClient />
    </Suspense>
  );
};

export default UpdatePromptPage;
