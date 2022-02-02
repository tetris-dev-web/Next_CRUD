import Head from 'next/head';

import 'styles/globals.css';
import { Nav, Alert } from 'components';

export default App;

function App({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>WeGetFinancing : Software Engineer – Full Stack Technical Test</title>

				{/* bootstrap css */}
				<link href="//netdna.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet" />
			</Head>

			<div className="app-container bg-light">
				<Nav />
				<Alert />
				<div className="container pt-4 pb-4">
					<Component {...pageProps} />
				</div>
			</div>

			{/* credits */}
			<div className="text-center mt-4">
				<p>
					on <a href="https://github.com/tetris-dev-web/Next_CRUD" target="_top">Github</a>
				</p>
				<p>
					by <a href="https://www.linkedin.com/in/jubin-ri-a7440722a/" target="_top">Jubin Ri</a>
				</p>
			</div>
		</>
	);
}
