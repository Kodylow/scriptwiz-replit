import { HandshakeProvider } from '@replit/extensions-react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './global-shim';

createRoot(document.getElementById('root')).render(
    <HandshakeProvider>
        <App />
    </HandshakeProvider>
)