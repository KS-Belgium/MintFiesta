import React, { useEffect } from "react";
import { useAccount } from 'wagmi';
import { useNavigate, useLocation } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

const WalletCo: React.FC = () => {
    const { isConnected } = useAccount();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (isConnected) {
            const params = new URLSearchParams(location.search);
            const sponsorId = params.get('sponsorId');
            if (sponsorId) {
                navigate(`/sponsor/${sponsorId}`);
            } else {
                navigate('/event');
            }
        }
    }, [isConnected, location, navigate]);

    return (
        <div>
            <h1>Wallet Connection</h1>
            <ConnectButton
                accountStatus={{
                    smallScreen: 'avatar',
                    largeScreen: 'full',
                }}
            />
        </div>
    );
};

export default WalletCo;