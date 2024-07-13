import QrReader from "react-qr-scanner";
import { Scanner } from "@yudiel/react-qr-scanner";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import QRCodeScan from "./QRCodeScan.tsx";

function QRCodeScanButton() {

    return (
        <div className="App">
            <Link to="/scan">
                <button>Scan QR Code</button>
            </Link>
        </div>
    );
}

export default QRCodeScanButton;