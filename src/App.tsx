import { DirectoryChildNode } from '@replit/extensions';
import { useReplit } from '@replit/extensions-react';
import { DataTools } from './DataTools';

function App() {

    // Handshake status, error (if any), and Replit API wrapper
    const { status, error, replit } = useReplit();

    if (status === "error") {
        return <div className="error">{error?.message}</div>;
    }

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    return (
        <main className="helper-page-main">
            <DataTools />
        </main>
    );
}

export default App;