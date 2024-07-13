import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from "../pages/HomePage.tsx";
import QRCodeScan from "../component/QRCodeScan.tsx";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/scan" element={<QRCodeScan />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;