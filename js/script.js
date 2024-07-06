const tokenAddress = '6SDeUL3x3DiWyUiXaHT7ftzYkb8t6YAeHxXigtyapump';
const rpcEndpoint = 'https://solana-mainnet.api.syndica.io/api-key/43PZugV22JroY8MB2F2RVizu5yApbvcmAfELBjuvCa2qL2TRwUiEBCu3zq1XVZuQ33MvvJZbihdRLy7WMdto1MeYfyJTiUtwbxJ';
const apiUrl = `https://pumpportal.fun/api/data/token-info?ca=${tokenAddress}`;

document.getElementById('connect-wallet').addEventListener('click', async () => {
    if (window.solana) {
        try {
            await window.solana.connect();
            const publicKey = window.solana.publicKey.toString();
            document.getElementById('connect-wallet').style.display = 'none';
            document.getElementById('disconnect-wallet').style.display = 'block';
            document.getElementById('wallet-info').style.display = 'block';
            document.querySelector('.buy-dew-container').style.display = 'block';
            displayTokenMetadata();
            updateBalance(publicKey);
        } catch (error) {
            console.error('Error connecting to wallet:', error);
        }
    } else {
        alert('Solana wallet not found. Please install a wallet extension like Phantom.');
    }
});

document.getElementById('disconnect-wallet').addEventListener('click', () => {
    if (window.solana) {
        window.solana.disconnect();
        document.getElementById('connect-wallet').style.display = 'block';
        document.getElementById('disconnect-wallet').style.display = 'none';
        document.getElementById('wallet-info').style.display = 'none';
        document.querySelector('.buy-dew-container').style.display = 'none';
    }
});

async function fetchTokenInfo() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        return result.data;  // Ensure this path is correct according to the API response structure
    } catch (error) {
        console.error('Error fetching token info:', error);
        return null;
    }
}

async function displayTokenMetadata() {
    const tokenInfo = await fetchTokenInfo();
    if (tokenInfo) {
        document.getElementById('token-description').innerText = ` ${tokenInfo.description}`;
    } else {
        document.getElementById('token-metadata').innerText = 'Error fetching token metadata';
    }
}

async function updateBalance(publicKey) {
    try {
        const connection = new solanaWeb3.Connection(rpcEndpoint, 'confirmed');
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
            new solanaWeb3.PublicKey(publicKey),
            { programId: new solanaWeb3.PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') }
        );

        let dewBalance = 0;
        tokenAccounts.value.forEach(account => {
            if (account.account.data.parsed.info.mint === tokenAddress) {
                dewBalance = account.account.data.parsed.info.tokenAmount.uiAmount;
            }
        });

        document.getElementById('dew-balance').innerText = dewBalance.toFixed(6);
    } catch (error) {
        console.error('Error updating balance:', error);
        document.getElementById('wallet-balance').innerText = 'Error fetching balance';
    }
}
