import React, { useEffect } from "react";
import { useAccount } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

const WalletCo: React.FC = () => {
    const { isConnected } = useAccount();
    const navigate = useNavigate();

    useEffect(() => {
        if (isConnected) {
            navigate('/event');
        }
    }, [isConnected, navigate]);

    return (
        <div>
            <h1>Wallet Connection</h1>

            {/*  Connect to Metamask wallet  */}
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