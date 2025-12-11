import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { PollsProvider } from './context/PollsContext.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<PollsProvider>
			<App />
		</PollsProvider>
	</StrictMode>
);
