import { Routes, Route } from "react-router-dom";

import PlatilloDetail from "./pages/platilloDetail";
import App from "./App";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/platillo/:id" element={<PlatilloDetail />} />
        </Routes>
    );
}