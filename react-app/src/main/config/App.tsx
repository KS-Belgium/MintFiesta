import QrReader from "react-qr-scanner";
import { Scanner } from "@yudiel/react-qr-scanner";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import QRCodeScanButton from "../component/QRCodeScanButton.tsx";
import AppRouter from "./AppRouter.tsx";

export default function App() {

    return (
        <div className="App">
            <AppRouter/>
        </div>
    );
}