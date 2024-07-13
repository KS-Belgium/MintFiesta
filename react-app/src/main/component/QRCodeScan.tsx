import QrReader from "react-qr-scanner";
import { Scanner } from "@yudiel/react-qr-scanner";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
function QRCodeScan() {
    const previewStyle = {
        height: 240,
        width: 320,
    };

    return (
        <div>
            <Scanner onScan={(result) => {
                window.location.href = "/sponsor";
            {/*window.location.href = result[0].rawValue*/}
            }} previewStyle={previewStyle} />
        </div>
    );
}
export default QRCodeScan;