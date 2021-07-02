import React from 'react';
import './App.scss';

import TableData from './components/TableData';

import logoMoovin from './logo.svg';

const App: React.FC = () => {


	return (
		<div className='App'>
			<header className="header">
				<img alt='Logo da Moovin' src={logoMoovin} />
			</header>

			<main className="content-site">
				<h2 className="content-site__title">
					Últimas postagens
				</h2>
				<TableData />

			</main>

		</div>
	)
}

export default App
