import { backend } from 'declarations/backend';

// Initialize mermaid for diagrams
mermaid.initialize({ startOnLoad: true, theme: 'dark' });

// Diagrams
const icpOverviewDiagram = `
graph TD
    A[Internet Computer Protocol] --> B[Decentralized Cloud]
    A --> C[Smart Contracts]
    A --> D[Web3 Services]
    B --> E[Global Network]
    C --> F[Canisters]
    D --> G[DApps]
    D --> H[Open Internet Services]
`;

const canisterCycleDiagram = `
graph LR
    A[ICP Tokens] --> B[Cycles]
    B --> C[Canister Computation]
    B --> D[Canister Storage]
    C --> E[DApp Functionality]
    D --> E
`;

const neuronDiagram = `
graph TD
    A[Neuron] --> B[Staked ICP]
    A --> C[Voting Power]
    A --> D[Dissolve Delay]
    C --> E[Network Governance]
    D --> F[Voting Rewards]
`;

const tokenomicsDiagram = `
graph TD
    A[ICP Token] --> B[Governance]
    A --> C[Utility]
    A --> D[Value Accrual]
    B --> E[Staking in Neurons]
    C --> F[Conversion to Cycles]
    D --> G[Network Growth]
`;

const networkDiagram = `
graph TD
    A[User] --> B[Boundary Nodes]
    B --> C[Subnet 1]
    B --> D[Subnet 2]
    B --> E[Subnet N]
    C --> F[Canisters]
    D --> F
    E --> F
`;

const governanceDiagram = `
graph LR
    A[NNS] --> B[Economics]
    A --> C[Protocol Upgrades]
    A --> D[Node Providers]
    B --> E[Reward Distribution]
    C --> F[Network Improvements]
    D --> G[Infrastructure Management]
`;

// Render diagrams
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('icp-overview-diagram').innerHTML = `<div class="mermaid">${icpOverviewDiagram}</div>`;
    document.getElementById('canister-cycle-diagram').innerHTML = `<div class="mermaid">${canisterCycleDiagram}</div>`;
    document.getElementById('neuron-diagram').innerHTML = `<div class="mermaid">${neuronDiagram}</div>`;
    document.getElementById('tokenomics-diagram').innerHTML = `<div class="mermaid">${tokenomicsDiagram}</div>`;
    document.getElementById('network-diagram').innerHTML = `<div class="mermaid">${networkDiagram}</div>`;
    document.getElementById('governance-diagram').innerHTML = `<div class="mermaid">${governanceDiagram}</div>`;
});

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

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('tech-specs-code').textContent = JSON.stringify(techSpecs, null, 2);
});
