import { Suspense } from "react";

import { App } from "@/components/app";

import { createBrowserRouter } from "react-router-dom";

import { ShopPageLazy } from "@/pages/shop/Shop.lazy";

export const routes = [
	{
		path: "/shop",
		element: <App />,
		children: [
			{
				path: "/shop/main",
				element: (
					<Suspense fallback={<h1>Loading...</h1>}>
						<ShopPageLazy />
					</Suspense>
				)
			},
			{
				path: "/shop/help",
				element: (
					<Suspense fallback={<h1>Loading...</h1>}><h1>Help!!</h1></Suspense>
				)
			}
		]
	}
]

export const router = createBrowserRouter(routes);
export default routes