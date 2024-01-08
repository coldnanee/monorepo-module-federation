import { Suspense } from "react";

import { App } from "@/components/app";
import { AboutPageLazy } from "@/pages/about/About.lazy";

import { createBrowserRouter } from "react-router-dom";

const routes = [
	{
		path: "/admin",
		element: <App />,
		children: [
			{
				path: "/admin/about",
				element: (
					<Suspense fallback={<h1>Loading...</h1>}>
						<AboutPageLazy />
					</Suspense>
				)
			}
		]
	}
]

export const router = createBrowserRouter(routes);

export default routes