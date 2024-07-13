import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from "../pages/HomePage.tsx";
import WalletCo from "../pages/WalletCo.tsx";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/test" element={<WalletCo />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;