import { backend } from 'declarations/backend';
import { AuthClient } from "@dfinity/auth-client";
import { Actor, HttpAgent } from "@dfinity/agent";

// Initialize mermaid for diagrams
mermaid.initialize({ startOnLoad: true, theme: 'dark' });

// Initialize highlight.js for code highlighting
document.addEventListener('DOMContentLoaded', (event) => {
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
    } else {
        console.warn('highlight.js is not loaded');
    }
});

// Initialize AuthClient for Internet Identity integration
let authClient;
let actor;

async function initAuth() {
    authClient = await AuthClient.create();
    if (await authClient.isAuthenticated()) {
        handleAuthenticated(authClient);
    }
}

async function handleAuthenticated(authClient) {
    const identity = await authClient.getIdentity();
    const agent = new HttpAgent({ identity });
    actor = Actor.createActor(backend.idlFactory, {
        agent,
        canisterId: backend.canisterId,
    });
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('app-section').style.display = 'block';
    await updateICPMetrics();
    await loadActiveProposal();
}

// ICP Metrics Chart
let icpChart;

async function updateICPMetrics() {
    try {
        const result = await actor.getICPMetrics();
        if (result.ok) {
            const metrics = result.ok;
            document.getElementById('icp-metrics').innerHTML = `
                <div class="row">
                    <div class="col-md-6">
                        <p><strong>Price:</strong> $${metrics.price.toFixed(2)}</p>
                        <p><strong>Market Cap:</strong> $${metrics.marketCap.toLocaleString()}</p>
                        <p><strong>Circulating Supply:</strong> ${metrics.circulatingSupply.toLocaleString()} ICP</p>
                    </div>
                    <div class="col-md-6">
                        <p><strong>Total Supply:</strong> ${metrics.totalSupply.toLocaleString()} ICP</p>
                        <p><strong>24h Volume:</strong> $${metrics.volume24h.toLocaleString()}</p>
                        <p><strong>Last Updated:</strong> ${new Date(Number(metrics.lastUpdated) / 1000000).toLocaleString()}</p>
                    </div>
                </div>
                <canvas id="icpChart"></canvas>
            `;
            updateICPChart(metrics);
        } else {
            console.error("Error fetching ICP metrics:", result.err);
        }
    } catch (error) {
        console.error("Error updating ICP metrics:", error);
    }
}

function updateICPChart(metrics) {
    const ctx = document.getElementById('icpChart').getContext('2d');
    if (icpChart) {
        icpChart.destroy();
    }
    icpChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['24h ago', '12h ago', 'Now'],
            datasets: [{
                label: 'ICP Price',
                data: [metrics.price * 0.9, metrics.price * 0.95, metrics.price],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

// Network Architecture Diagram
const networkDiagram = `
graph TD
    A[User] --> B[Boundary Nodes]
    B --> C[Subnet 1]
    B --> D[Subnet 2]
    B --> E[Subnet N]
    C --> F[Canisters]
    D --> F
    E --> F
    F --> G[State]
    F --> H[WebAssembly]
    F --> I[Orthogonal Persistence]
`;

// Governance System Diagram
const governanceDiagram = `
graph LR
    A[ICP Tokens] --> B[Neurons]
    B --> C[Voting Power]
    B --> D[Rewards]
    C --> E[Network Nervous System]
    E --> F[Protocol Parameters]
    E --> G[Economics]
    E --> H[Node Providers]
    D --> I[Staking Returns]
`;

// Render diagrams
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('network-diagram').innerHTML = `<div class="mermaid">${networkDiagram}</div>`;
    document.getElementById('governance-diagram').innerHTML = `<div class="mermaid">${governanceDiagram}</div>`;
});

// Load active proposal
async function loadActiveProposal() {
    try {
        // In a real-world scenario, fetch the active proposal from the backend
        const proposalId = 1; // Placeholder
        const proposalDescription = "Should ICP implement sharding to improve scalability?";
        
        document.getElementById('proposal-title').textContent = `Proposal #${proposalId}`;
        document.getElementById('proposal-description').textContent = proposalDescription;
        document.getElementById('voting-interface').classList.remove('d-none');
        
        await updateVotingResults(proposalId);
    } catch (error) {
        console.error("Error loading active proposal:", error);
    }
}

// Vote on proposal
async function vote(proposalId, voteType) {
    try {
        const result = await actor.vote(proposalId, voteType);
        if (result.ok) {
            await updateVotingResults(proposalId);
        } else {
            console.error("Error voting:", result.err);
        }
    } catch (error) {
        console.error("Error voting:", error);
    }
}

// Update voting results
async function updateVotingResults(proposalId) {
    try {
        const result = await actor.getProposalResults(proposalId);
        if (result.ok) {
            const { yes, no, abstain } = result.ok;
            const total = yes + no + abstain;
            document.getElementById('voting-results').innerHTML = `
                <h4>Current Results:</h4>
                <p>Yes: ${yes} (${((yes / total) * 100).toFixed(2)}%)</p>
                <p>No: ${no} (${((no / total) * 100).toFixed(2)}%)</p>
                <p>Abstain: ${abstain} (${((abstain / total) * 100).toFixed(2)}%)</p>
            `;
        } else {
            console.error("Error fetching voting results:", result.err);
        }
    } catch (error) {
        console.error("Error updating voting results:", error);
    }
}

// Technical Specifications
const techSpecs = {
    "consensus": "Threshold Relay with notarization",
    "smart_contracts": "WebAssembly (Wasm)",
    "programming_languages": ["Motoko", "Rust", "JavaScript", "TypeScript"],
    "scalability": {
        "subnets": "Unlimited",
        "tps": "10,000+ per subnet"
    },
    "security": {
        "encryption": "NiDKG (Non-Interactive Distributed Key Generation)",
        "signature_scheme": "BLS (Boneh-Lynn-Shacham)"
    },
    "governance": "Network Nervous System (NNS)",
    "tokenomics": {
        "total_supply": "469,213,710 ICP",
        "staking_reward": "Variable, based on neuron dissolve delay"
    }
};

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('tech-specs').textContent = JSON.stringify(techSpecs, null, 2);
    if (typeof hljs !== 'undefined') {
        hljs.highlightElement(document.getElementById('tech-specs'));
    }
});

// Event Listeners
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('vote-yes').addEventListener('click', () => vote(1, { Yes: null }));
    document.getElementById('vote-no').addEventListener('click', () => vote(1, { No: null }));
    document.getElementById('vote-abstain').addEventListener('click', () => vote(1, { Abstain: null }));
});

// Initialize the application
initAuth();
setInterval(updateICPMetrics, 60000); // Update ICP metrics every minute
