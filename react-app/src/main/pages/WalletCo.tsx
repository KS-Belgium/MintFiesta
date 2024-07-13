// WalletCo.tsx
import React from "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';


const WalletCo: React.FC = () => {

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
