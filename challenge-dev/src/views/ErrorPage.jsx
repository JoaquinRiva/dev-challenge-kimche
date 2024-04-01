import React from "react";

export const ErrorPage = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: " 50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <img src="https://http.cat/images/404.jpg" alt="error404" />
    </div>
  );
};
