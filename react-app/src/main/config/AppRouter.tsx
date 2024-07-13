import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from "../pages/HomePage.tsx";
import QRCodeScan from "../component/QRCodeScan.tsx";
import WalletCo from "../pages/WalletCo.tsx";
import Authentication from "../pages/Authentication.tsx";
import SponsorPage from "../pages/SponsorPage";
import EventPage from "../pages/EventPage.tsx";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/event" element={<EventPage />} />
                <Route path="/auth" element={<Authentication />} />
                <Route path="/wallet" element={<WalletCo />} />
                <Route path="/scan" element={<QRCodeScan />} />
                <Route path="/sponsor" element={<SponsorPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;