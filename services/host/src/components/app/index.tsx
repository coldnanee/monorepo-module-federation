import { Link } from "react-router-dom";

export const App = () => {

	return (
		<>
			<h1 data-testid="App.title-test">Hello world!</h1>
			<Link to={"/admin/about"}>About</Link>
			<Link to={"/shop/main"}>Shop</Link>
		</>
	);
};
