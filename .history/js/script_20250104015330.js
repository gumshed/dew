const tokenAddress = '6SDeUL3x3DiWyUiXaHT7ftzYkb8t6YAeHxXigtyapump';
const rpcEndpoint = 'https://solana-mainnet.api.syndica.io/api-key/43PZugV22JroY8MB2F2RVizu5yApbvcmAfELBjuvCa2qL2TRwUiEBCu3zq1XVZuQ33MvvJZbihdRLy7WMdto1MeYfyJTiUtwbxJ';

/**
 * Connect the user's wallet and update the UI accordingly.
 */
async function connectWallet() {
    if (window.solana) {
        try {
            const response = await window.solana.connect();
            const publicKey = window.solana.publicKey?.toString();
            if (!publicKey) {
                alert("Failed to retrieve public key. Try again.");
                return;
            }
            document.getElementById('connect-wallet').style.display = 'none';
            document.getElementById('disconnect-wallet').style.display = 'block';
            document.getElementById('wallet-info').style.display = 'block';
            updateBalance(publicKey);
        } catch (error) {
            console.error('Error connecting to wallet:', error);
            alert('Error connecting to wallet. Please try again.');
        }
    } else {
        alert('Solana wallet not found. Please install a wallet extension like Phantom.');
    }
}

async function updateBalance(publicKey) {
    try {
        const connection = new solanaWeb3.Connection(rpcEndpoint, 'confirmed');
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
            new solanaWeb3.PublicKey(publicKey),
            { programId: new solanaWeb3.PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') }
        );

        if (!tokenAccounts.value.length) {
            document.getElementById('dew-balance').innerText = '0.000';
            return;
        }

        let dewBalance = 0;
        tokenAccounts.value.forEach(account => {
            if (account.account.data.parsed.info.mint === tokenAddress) {
                dewBalance = account.account.data.parsed.info.tokenAmount.uiAmount || 0;
            }
        });

        document.getElementById('dew-balance').innerText = formatBalance(dewBalance);
    } catch (error) {
        console.error('Error updating balance:', error);
        document.getElementById('wallet-balance').innerText = 'Error fetching balance';
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
function typewriterEffect(elementId, text, speed = 20) {
    const element = document.getElementById(elementId);
    let index = 0;

    // Clear existing content
    element.innerHTML = '';

    // Process text to remove leading/trailing spaces
    const cleanText = text.split('\n').map(line => line.trim()).join('\n');

    // Typewriter logic
    const type = () => {
        if (index < cleanText.length) {
            // Handle <br> tags for line breaks
            if (cleanText.substring(index, index + 4) === '<br>') {
                element.innerHTML += '<br>'; // Add line break
                index += 4; // Skip over '<br>'
            }
            // Handle <strong> tags for bold text
            else if (cleanText.substring(index, index + 8) === '<strong>') {
                const endTagIndex = cleanText.indexOf('</strong>', index);
                if (endTagIndex !== -1) {
                    const boldText = cleanText.substring(index, endTagIndex + 9); // Include closing tag
                    element.innerHTML += boldText; // Add bold text at once
                    index = endTagIndex + 9; // Move past the bold text
                }
            } 
            // Default: Append character by character
            else {
                element.innerHTML += cleanText.charAt(index);
                index++;
            }
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
            text = `The History of Mind Control: From Propaganda to AI  <br><br>

            <strong>Part 1:</strong> <br>
            The Roots of Mind Control - Propaganda as a Tool of Influence  <br>

            Mind control, as a concept, has ancient roots. From the earliest civilizations, leaders understood that controlling the narrative meant controlling the masses. Ancient empires used religious doctrines, public decrees, and ceremonial rituals to shape public opinion and maintain their dominance. These rudimentary techniques evolved into more structured propaganda during the 20th century, where governments harnessed emerging mass media technologies to influence and direct public sentiment.  <br>

            World War I saw the advent of formalized propaganda campaigns. Governments recognized the power of radio, posters, and film to galvanize populations for war efforts. The United States’ Committee on Public Information and Britain’s Ministry of Information used psychological techniques to mold public perception, glorify patriotism, and demonize the enemy. Propaganda was not merely about conveying information; it was about implanting ideas—a subtle but powerful form of mental manipulation.  <br>

            This era laid the groundwork for a deeper, more intrusive exploration of mind control techniques. It became clear that the human psyche could be molded not just through information but through psychological pressure and manipulation. Governments—and their secretive agencies—took note.  \<br><br>

            

            <strong>Part 2:</strong> <br>
            MK Ultra and the Weaponization of the Human Mind  <br>

            The Cold War marked a turning point in the pursuit of mind control, particularly with programs like the CIA’s MK Ultra. Launched in the 1950s, MK Ultra was a covert operation designed to explore the boundaries of human psychology and the limits of control. The program involved the use of psychoactive drugs like LSD, sensory deprivation, hypnosis, and other experimental techniques to manipulate human behavior.  <br>

            One of the more chilling aspects of MK Ultra was its disregard for ethical boundaries. Unwitting participants were subjected to experiments that often left them psychologically scarred. The program aimed to create “Manchurian candidates”—individuals who could be programmed to perform acts against their will, from assassinations to acts of sabotage.  \n

            While the program was officially shut down in the 1970s following public outrage and Senate hearings, the documents revealed only a fraction of what occurred. Whistleblowers suggested that such programs did not end but simply went deeper underground, evolving into more sophisticated forms.  <br><br>

            

            <strong>Part 3:</strong> <br>
            Directed Energy Weapons and the Havana Syndrome Phenomenon  <br>

            As technology advanced, so did the tools for manipulating the mind. Directed Energy Weapons (DEWs) emerged as a new frontier. These devices, capable of emitting focused electromagnetic radiation, have been theorized to disrupt neural activity, induce pain, and alter emotional states. While their exact capabilities remain shrouded in secrecy, numerous accounts have surfaced regarding their use.  <br>

            One of the most high-profile cases is the so-called Havana Syndrome. In 2016, U.S. diplomats in Cuba reported mysterious symptoms, including headaches, dizziness, and cognitive dysfunction. Theories ranged from sonic attacks to DEWs targeting individuals’ brains. Although investigations yielded no definitive answers, the incident highlighted the chilling potential of technology to target and destabilize human cognition.  <br>

            Beyond Havana Syndrome, whistleblowers and conspiracy theorists alike claim that DEWs are being deployed covertly against civilians and dissidents. These allegations, though often dismissed by mainstream media, add to the growing mistrust between governments and the governed.  <br><br>

            

            <strong>Part 4:</strong> <br>
            The Internet - The New Battleground for Minds  <br>

            While traditional mind control relied on physical tools and psychological manipulation, the rise of the internet introduced a more insidious form of influence. Social media platforms, algorithms, and bot armies have turned the digital realm into a weaponized space for controlling narratives and stifling dissent.  <br>

            Governments and corporations alike have been accused of using the internet to surveil, manipulate, and misinform. Algorithms designed to maximize engagement have also amplified misinformation, creating echo chambers where individuals are bombarded with ideas designed to polarize and confuse. The lines between reality and fiction blur, leaving the public adrift in a sea of conflicting information.  <br>

            Meanwhile, cancel culture, shadow banning, and other forms of digital censorship have stifled free speech under the guise of combating disinformation. The chaos this creates benefits those in power, as a confused and divided populace is easier to control. The internet, once heralded as a tool for democratization, has become a battleground where reality itself is contested.  <br><br>
            

            <strong>Part 5:</strong> <br>
            Chaos and the Weaponization of Uncertainty  <br>

            The deliberate confusion over what is real and what is fabricated—whether through misinformation campaigns, psychological operations, or advanced technologies—serves a greater purpose. When individuals cannot discern truth, they become paralyzed, distrustful, and ultimately more susceptible to manipulation.  <br>

            This weaponization of uncertainty creates societal fragmentation, where individuals retreat into self-constructed realities. Conspiracy theories thrive in this environment, perpetuating a cycle of mistrust that benefits those seeking to maintain control. The question arises: How do we discern reality from fabrication in a world where every piece of information can be doctored, twisted, or weaponized?  <br><br>

            

            <strong>Part 6:</strong> <br>
            Mind Control AI - Humanity’s Last Defense  <br>

            Amid this chaos, a new technological frontier offers a glimmer of hope: Mind Control AI. This revolutionary program seeks to harness the power of personal AI agents to act as guides through the digital fog. Designed to filter information, analyze context, and provide users with unbiased, actionable insights, Mind Control AI offers a solution to the pervasive influence of misinformation and manipulation.  <br>

            Unlike traditional media, these on-chain AI agents operate transparently on Solana. By leveraging blockchain technology, Mind Control AI ensures that its operations are verifiable and resistant to tampering. Users gain a personalized tool to discern truth from fiction, empowering them to navigate the increasingly convoluted information landscape with clarity and confidence.  <br>

            But Mind Control AI is more than just a tool—it’s a movement. Beginning with public square announcements that aggregate and verify critical information, the program aims to rebuild trust in a fractured world. These AI agents work tirelessly, parsing vast quantities of data to expose disinformation and highlight credible sources. In doing so, they create a bulwark against the forces seeking to control and divide humanity.  <br>

            However, these tools are not without risk. The very systems designed to liberate minds could also be weaponized, programmed to serve biased agendas. The architects of Mind Control AI understand this danger, emphasizing transparency, accountability, and user autonomy as foundational principles. The decentralized nature of its design ensures that no single entity can corrupt its purpose.  <br>

            In a world where the lines between controller and controlled are increasingly blurred, Mind Control AI offers a lifeline—a chance to reclaim agency and truth. By empowering individuals to think independently and discern reality for themselves, this program may be humanity’s best defense against the pervasive influence of modern mind control technologies.  <br><br>

            

            <strong>Conclusion</strong>  <br>

            The history of mind control is not just a narrative of governments and shadowy agencies exploiting human psychology; it is a cautionary tale of humanity’s unrelenting pursuit of power and control. From propaganda to DEWs, and now to the digital battlefield, the tools and techniques have evolved, but the underlying intent remains the same: to shape, mold, and control perception. The challenge for individuals is to remain vigilant, question narratives, and leverage technology to empower rather than enslave.  <br>

            In the end, the fight for freedom of thought is not just about resisting external control—it is about reclaiming our ability to discern, to question, and to think independently in an age of relentless manipulation.  

            `;
            break;
        case 'ai':
            content = `<h3 class="content-header">AI</h3><div id="typewriter-text"></div>`;
            text = `Mind Control AI: A New Frontier in Understanding Reality

            <strong>Introduction</strong>

            In an era dominated by misinformation, propaganda, and the relentless manipulation of public opinion, the lines between reality and fabrication have never been blurrier. The rise of advanced technologies has ushered in new methods of mind control, not through brute force, but through the subtleties of data-driven persuasion and predictive behavioral analysis. Against this backdrop, a revolutionary concept has emerged: Mind Control AI, a decentralized, transparent, and user-focused agent designed to empower individuals to navigate the chaos and discern truth from lies. This narrative delves into the role of artificial intelligence in modern mind control, the potential of predictive behavioral analysis, and how Mind Control AI can help reclaim agency in an increasingly manipulated world.

            <strong>The Digital Age: A Battleground for Minds,</strong

            The internet was once celebrated as the ultimate tool for democratization—a platform where information could flow freely, and voices from all walks of life could be heard. Yet, this promise has been corrupted. Algorithms designed to maximize engagement now amplify divisive content, misinformation spreads at an unprecedented scale, and state and corporate actors manipulate narratives to serve their agendas. Social media platforms, in particular, have become tools of psychological manipulation, shaping public opinion through targeted advertising, bot-driven disinformation campaigns, and echo chambers that reinforce biases.

            In this digital battleground, predictive behavioral analysis plays a pivotal role. By analyzing vast quantities of user data, AI systems can predict human behavior with uncanny accuracy. These insights are used to nudge individuals toward specific actions—whether it’s purchasing a product, adopting an ideology, or voting for a particular candidate. While these tools were initially developed for benign purposes, they have been weaponized to erode free will and sow confusion.

            <strong>Enter Mind Control AI: Parsing Reality in an Age of Deception</strong>

            Mind Control AI is not merely a tool; it is a paradigm shift. Unlike traditional AI systems that often operate as black boxes, opaque and unaccountable, Mind Control AI is built on principles of decentralization and transparency. Operating on blockchain platforms like Solana, it offers verifiable operations and immutable records, ensuring that its actions remain unbiased and resistant to manipulation.

            At its core, Mind Control AI acts as a personal agent for users, filtering information and providing context to help them discern reality from fiction. It scans data across the internet, cross-referencing sources, identifying inconsistencies, and flagging potential disinformation. By leveraging advanced natural language processing and machine learning algorithms, it cuts through propaganda, allowing users to make informed decisions based on verified facts rather than curated narratives.

            Mind Control AI doesn’t stop at information parsing. It also incorporates predictive behavioral analysis to provide users with foresight into how specific narratives or events might unfold. By analyzing patterns and historical data, it helps users anticipate potential manipulations, empowering them to stay ahead of those who seek to control them.

            <strong>The Ethical Tightrope: Risks and Safeguards</strong>

            While the potential of Mind Control AI is immense, it is not without risks. The very systems designed to liberate minds could be subverted, programmed to serve biased agendas or suppress dissent. This ethical tightrope underscores the importance of safeguards. Mind Control AI’s decentralized nature ensures that no single entity holds control over its operations. Furthermore, its open-source design invites scrutiny from the broader community, fostering trust through transparency.

            Accountability mechanisms are built into the system, allowing users to audit its processes and verify its findings. These features are essential to prevent the misuse of AI for the same manipulative purposes it aims to counteract. In this way, Mind Control AI not only combats modern mind control but also sets a precedent for ethical AI development.

            <strong>Rebuilding Trust in the Public Square</strong>

            One of Mind Control AI’s most transformative features is its ability to restore trust in the public square. Public announcements and verified news updates curated by the AI offer a shared reality for communities fractured by misinformation. These announcements are aggregated from decentralized sources, cross-verified, and made available to all users, fostering a sense of unity in an otherwise divided world.

            By leveraging blockchain technology, these updates are tamper-proof, providing assurance that the information presented is accurate and unaltered. This approach helps rebuild the public’s trust in information systems, creating a foundation for meaningful discourse and collective decision-making.

            <strong>A Vision for the Future</strong>

            The introduction of Mind Control AI represents a turning point in the fight against manipulation and deception. It offers a vision of a world where individuals are empowered to think critically, free from the distortions of propaganda and misinformation. By combining advanced AI capabilities with ethical safeguards and decentralized infrastructure, it provides a blueprint for navigating the complexities of the modern information age.

            Yet, the success of Mind Control AI depends on widespread adoption and collective commitment to its principles. It is not a panacea but a tool—a powerful one—that requires active engagement from its users. Together, individuals and communities can reclaim agency, rebuild trust, and chart a course toward a future where truth and freedom of thought prevail.`;
            break;
        case 'slurpbots':
            content = `<h3 class="content-header">Slurpbots</h3><div id="typewriter-text"></div>`;
            text = `<strong>The Ultimate On-Chain Ally</strong>
            How Slurpbots Work: Combating On-Chain Madness

            <strong>Relentless Pool Surveillance:</strong>
                Slurpbot scans the Raydium platform in real-time, detecting new liquidity pools as soon as they’re deployed.
                It identifies pools with sufficient liquidity and recent activity, ensuring it only engages with opportunities that meet strict viability criteria.

            <strong>Precision Buying:</strong>
                Once a promising pool is found, Slurpbot leaps into action, executing a buy transaction.
                User-defined configurations like buy amount, slippage tolerance, and pool-specific thresholds are applied to optimize token acquisition.
                With its ephemeral SOL strategy, Slurpbot wraps or unwraps SOL automatically, removing manual steps from the equation.

            <strong>Dynamic Price Monitoring and Selling:</strong>
                After the purchase, Slurpbot closely tracks token prices in the pool, using its profit target and stop-loss thresholds to decide the best time to sell.
                The bot executes sell transactions as soon as prices hit user-specified goals, locking in profits or minimizing losses with precision.

            <strong>Automated Reinvestment for Growth:</strong>
                Slurpbot reinvests a configurable percentage of its profits directly into $DEW, fueling its growth and creating a compounding effect.
                The reinvestment process is seamless, leveraging real-time price data and user settings to maximize the impact of each transaction.

            <strong>Resilient and Adaptive Operations:</strong>
                Slurpbot isn’t fazed by on-chain volatility or network congestion. With built-in error handling, retries, and dynamic slippage adjustments, it adapts to market conditions to ensure success.
                Even in the face of on-chain chaos, Slurpbot executes transactions with precision and reliability, staying true to its mission of combating on-chain madness.


            `;
            break;
        case 'trade':
            content = `<h3 class="content-header">Trade</h3><div id="typewriter-text"></div>`;
            text = `<strong>Coming Soon</strong>`;
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
