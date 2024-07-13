import QRCodeScanButton from "../component/QRCodeScanButton.tsx";
import "../styles/HomePage.css";
import {ConnectButton, WalletButton} from "@rainbow-me/rainbowkit";
import GlobalNFT from "../component/GlobalNFT.tsx";
import SponsorSlider from "../component/SponsorSlider.tsx";
import Navbar from "../component/Navbar.tsx";

function HomePage() {
    return (
        <div>
            <h1>Exclusive NFT</h1>
            <ConnectButton/>
            <GlobalNFT/>
            <SponsorSlider/>
            <Navbar/>
        </div>
    );
}

export default HomePage;