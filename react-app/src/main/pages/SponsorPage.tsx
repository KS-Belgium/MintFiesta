import { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { getDatabase, ref, get } from "firebase/database";
import Navbar from "../component/Navbar.tsx";
import "../styles/SponsorPage.css";

import {BaseError, useWriteContract, useWaitForTransactionReceipt} from 'wagmi'
import { abi } from '../model/abis/abi'

function SponsorPage() {
    const { sponsorId } = useParams();
    const [sponsor, setSponsor] = useState(null);
    const navigate = useNavigate();
    const [nfts, setNfts] = useState([]);

    const { data: hash, isPending, error, writeContract } = useWriteContract()

    async function mintNFT() {

        const signer = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const uri = 'ipfs://Qmdx6hxQMmPvK1Ct2pk62LRdeHozQZLUR73TWhbmEfxYzY'
        console.log(signer[0]);
        writeContract({
            address: '0xBF8216ff23DF4a91A6dDee33e43e6f21e8224A72',
            abi,
            functionName: 'mintNFT',
            args: [signer[0], uri],
        })
    }

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        })


    useEffect(() => {
        const token = localStorage.getItem(`sponsorToken_${sponsorId}`);
        if (!token) {
            navigate('/event');
            return;
        }
        const fetchSponsor = async () => {
            const db = getDatabase();
            const sponsorRef = ref(db, `sponsors/${sponsorId}`);
            const snapshot = await get(sponsorRef);
            if (snapshot.exists()) {
                const sponsorData = snapshot.val();
                setSponsor(sponsorData);

                // Fetch NFTs associated with the sponsor
                const nftPromises = sponsorData.nfts.map(async (nftId) => {
                    const nftRef = ref(db, `nfts/${nftId}`);
                    const nftSnapshot = await get(nftRef);
                    return nftSnapshot.exists() ? nftSnapshot.val() : null;
                });
                const nftData = await Promise.all(nftPromises);
                setNfts(nftData.filter(nft => nft !== null));
            } else {
                console.log("Sponsor not found");
            }
        };

        fetchSponsor();
    }, [sponsorId]);

    if (error){
        console.error(error);
    }

    if (!sponsor) {
        return <p>Loading sponsor information...</p>;
    }


    return (
        <div className="sponsor-page">
            <h2>Sponsor</h2>
            <h1>{sponsor.name}</h1>
            <h3>Congrats !</h3>
            <p>Claim your NFT to unlock unique stuff</p>
            {nfts.length > 0 && (
                <div className="nft-section">
                    {nfts.map((nft, index) => (
                        <div key={index} className="nft-item">
                            <img src={nft.url} alt={nft.name} />
                        </div>
                    ))}
                </div>
            )}
            <button onClick={mintNFT} disabled={isPending}>
                Claim
                {isPending ? 'Confirming...' : 'Mint'}
            </button>
            {hash && <div>Transaction Hash: {hash}</div>}
            {isConfirming && <div>Waiting for confirmation...</div>}
            {isConfirmed && <div>Transaction confirmed.</div>}
            {error && (
                <div>Error: {(error as BaseError).shortMessage || error.message}</div>
            )}
            <h3 className="waiting-for-you">What is waiting for you</h3>
            <img src="https://www.dezignercom.com/wp-content/uploads/2024/01/im-produits.jpg" alt="What is waiting for you" className="waiting-for-you" />
            <Navbar />
        </div>
    );
}

export default SponsorPage;