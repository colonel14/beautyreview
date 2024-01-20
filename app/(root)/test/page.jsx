import React from "react";

async function page() {
  await new Promise(() =>
    setTimeout((resolve) => {
      return resolve;
    }, 100)
  );
  return <div>Test Page</div>;
}

export default page;
