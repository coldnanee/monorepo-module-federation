import { RouterProvider } from "react-router-dom";

import ReactDom from "react-dom/client";

import { router } from "@/router/router";

const root = document.querySelector("#root");

if (!root) {
	throw new Error("root mount not found!");
}

ReactDom.createRoot(root).render(<RouterProvider router={router} />);
