import { Scanner } from "@yudiel/react-qr-scanner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function QRCodeScan() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleScan = (result) => {
        if (result) {
            try {
                const url = new URL(result[0].rawValue);
                const sponsorId = url.searchParams.get("sponsorId");

                if (sponsorId) {
                    const token = uuidv4();
                    localStorage.setItem(`sponsorToken_${sponsorId}`, token);
                    navigate(`/sponsor/${sponsorId}`);
                } else {
                    setError("Invalid QR code");
                }
            } catch (e) {
                console.log(result)
                setError("Invalid QR code URL");
            }
        }
    };

    const handleError = (error) => {
        console.error(error);
        setError("QR code scan failed");
    };

    const previewStyle = {
        height: 240,
        width: 320,
    };

    return (
        <div>
            <Scanner
                onScan={handleScan}
                onError={handleError}
                style={previewStyle}
            />
            {error && <p>{error}</p>}
        </div>
    );
}

export default QRCodeScan;