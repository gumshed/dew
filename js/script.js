const tokenAddress = '6SDeUL3x3DiWyUiXaHT7ftzYkb8t6YAeHxXigtyapump';
const rpcEndpoint = 'https://solana-mainnet.api.syndica.io/api-key/43PZugV22JroY8MB2F2RVizu5yApbvcmAfELBjuvCa2qL2TRwUiEBCu3zq1XVZuQ33MvvJZbihdRLy7WMdto1MeYfyJTiUtwbxJ';

async function connectWallet() {
    if (window.solana) {
        try {
            await window.solana.connect();
            const publicKey = window.solana.publicKey.toString();
            document.getElementById('connect-wallet').style.display = 'none';
            document.getElementById('disconnect-wallet').style.display = 'block';
            document.getElementById('wallet-info').style.display = 'block';
            displayConnectedText();
            updateBalance(publicKey);
        } catch (error) {
            console.error('Error connecting to wallet:', error);
            alert('Error connecting to wallet. Please try again.');
        }
    } else {
        alert('Solana wallet not found. Please install a wallet extension like Phantom.');
    }
}

document.getElementById('connect-wallet').addEventListener('click', connectWallet);

document.getElementById('disconnect-wallet').addEventListener('click', () => {
    if (window.solana) {
        window.solana.disconnect();
        document.getElementById('connect-wallet').style.display = 'block';
        document.getElementById('disconnect-wallet').style.display = 'none';
        document.getElementById('wallet-info').style.display = 'none';
    }
});

function displayConnectedText() {
    const connectedText = `
        Most of the affected individuals reported an acute onset of neurological symptoms associated with a perceived localized loud sound such as screeching, chirping, clicking, or piercing noises. Two-thirds experienced visual disturbances such as blurred vision and sensitivity to light. 
    `;
    document.getElementById('token-description').innerText = connectedText;
}

function formatBalance(balance) {
    return balance.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 });
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

        document.getElementById('dew-balance').innerText = formatBalance(dewBalance);
    } catch (error) {
        console.error('Error updating balance:', error);
        document.getElementById('wallet-balance').innerText = 'Error fetching balance';
    }
}

// Collapsible sections functionality
document.addEventListener('DOMContentLoaded', function() {
    var coll = document.getElementsByClassName("collapsible-header");
    for (var i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            // Close all other sections
            var allContents = document.getElementsByClassName("collapsible-content");
            for (var j = 0; j < allContents.length; j++) {
                if (allContents[j] !== this.nextElementSibling) {
                    allContents[j].style.display = "none";
                    allContents[j].previousElementSibling.classList.remove("active");
                }
            }
            // Toggle the clicked section
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    }
});

// Listen for account changes in Phantom wallet
if (window.solana) {
    window.solana.on('accountChanged', (publicKey) => {
        if (publicKey) {
            const newPublicKey = publicKey.toString();
            displayConnectedText();
            updateBalance(newPublicKey);
        } else {
            // Handle the case where the user has disconnected their wallet
            document.getElementById('connect-wallet').style.display = 'block';
            document.getElementById('disconnect-wallet').style.display = 'none';
            document.getElementById('wallet-info').style.display = 'none';
        }
    });
}
