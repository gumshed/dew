const tokenAddress = '6SDeUL3x3DiWyUiXaHT7ftzYkb8t6YAeHxXigtyapump';
const rpcEndpoint = 'https://solana-mainnet.api.syndica.io/api-key/43PZugV22JroY8MB2F2RVizu5yApbvcmAfELBjuvCa2qL2TRwUiEBCu3zq1XVZuQ33MvvJZbihdRLy7WMdto1MeYfyJTiUtwbxJ';

/**
 * Connect the user's wallet and update the UI accordingly.
 */
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

/**
 * Toggle the visibility of the fullscreen overlay.
 */
function toggleFullscreenOverlay() {
    const overlay = document.getElementById('fullscreen-overlay');
    overlay.classList.toggle('hidden');
    document.body.style.overflow = overlay.classList.contains('hidden') ? 'auto' : 'hidden'; // Prevent page scrolling
}
/**
 * Function to simulate a typewriter effect.
 */
function typewriterEffect(elementId, text, speed = 50) {
    const element = document.getElementById(elementId);
    let index = 0;

    // Clear any existing content
    element.innerHTML = '';

    // Typewriter logic
    const type = () => {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    };

    type();
}

/**
 * Display content dynamically in the overlay based on the user's selection.
 */
function displayContent(option) {
    const contentDisplay = document.getElementById('content-display');
    let content = '';
    let text = '';

    switch (option) {
        case 'paper':
            content = `<h3 class="content-header">Paper</h3><div id="typewriter-text"></div>`;
            text = `The History of Mind Control: From Propaganda to AI\n\nPart 1: The Roots of Mind Control - Propaganda as a Tool of Influence\n\nMind control, as a concept, has ancient roots. From the earliest civilizations, leaders understood that controlling the narrative meant controlling the masses...`;
            break;
        case 'ai':
            content = `<h3 class="content-header">AI</h3><div id="typewriter-text"></div>`;
            text = `Explore the role of artificial intelligence in modern mind control and predictive behavioral analysis.`;
            break;
        case 'slurpbots':
            content = `<h3 class="content-header">Slurpbots</h3><div id="typewriter-text"></div>`;
            text = `Learn about the autonomous trading bots designed to monitor and capitalize on opportunities in Raydium pools.`;
            break;
        case 'truth':
            content = `<h3 class="content-header">Truth</h3><div id="typewriter-text"></div>`;
            text = `Dive into whistleblower accounts and documented evidence of psychological operations and directed energy weapons.`;
            break;
        default:
            content = `<p>Select an option above to view more information.</p>`;
            text = '';
    }

    // Update the content display area
    contentDisplay.innerHTML = content;

    // Trigger the typewriter effect if there's text
    if (text) {
        typewriterEffect('typewriter-text', text);
    }
}

/**
 * Display a predefined connected wallet text.
 */
function displayConnectedText() {
    const connectedText = `
        Most of the affected individuals reported an acute onset of neurological symptoms associated with a perceived localized loud sound such as screeching, chirping, clicking, or piercing noises. Two-thirds experienced visual disturbances such as blurred vision and sensitivity to light. 
    `;
    document.getElementById('token-description').innerText = connectedText;
}

/**
 * Format balance values for display.
 */
function formatBalance(balance) {
    return balance.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 });
}

/**
 * Update the wallet balance by fetching data from the Solana blockchain.
 */
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

/**
 * Add collapsible section functionality.
 */
document.addEventListener('DOMContentLoaded', function () {
    const coll = document.getElementsByClassName('collapsible-header');
    for (let i = 0; i < coll.length; i++) {
        coll[i].addEventListener('click', function () {
            const allContents = document.getElementsByClassName('collapsible-content');
            for (let j = 0; j < allContents.length; j++) {
                if (allContents[j] !== this.nextElementSibling) {
                    allContents[j].style.display = 'none';
                    allContents[j].previousElementSibling.classList.remove('active');
                }
            }
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    }
});

/**
 * Handle account changes in the Solana wallet.
 */
if (window.solana) {
    window.solana.on('accountChanged', (publicKey) => {
        if (publicKey) {
            const newPublicKey = publicKey.toString();
            displayConnectedText();
            updateBalance(newPublicKey);
        } else {
            document.getElementById('connect-wallet').style.display = 'block';
            document.getElementById('disconnect-wallet').style.display = 'none';
            document.getElementById('wallet-info').style.display = 'none';
        }
    });
}

/**
 * Copy the contract address to the clipboard.
 */
function copyToClipboard() {
    const fullText = document.getElementById('contract-address-text').innerText;
    const address = fullText.split(' ')[1]; // Extract the address portion
    navigator.clipboard.writeText(address).then(() => {
        showNotification();
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

/**
 * Show a notification after copying to the clipboard.
 */
function showNotification() {
    const notification = document.getElementById('copy-notification');
    notification.className = 'copy-notification show';
    setTimeout(() => {
        notification.className = notification.className.replace('show', '');
    }, 3000);
}
