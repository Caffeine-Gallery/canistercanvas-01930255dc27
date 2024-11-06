import { backend } from 'declarations/backend';

mermaid.initialize({ startOnLoad: true });

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
    A[ICP Tokens] --> B[Neurons]
    B --> C[Voting Power]
    B --> D[Rewards]
    C --> E[Network Governance]
    D --> F[Staking Returns]
`;

document.getElementById('network-diagram').innerHTML = `<div class="mermaid">${networkDiagram}</div>`;
document.getElementById('governance-diagram').innerHTML = `<div class="mermaid">${governanceDiagram}</div>`;

async function fetchICPData() {
    try {
        const icpData = await backend.getICPData();
        const icpDataElement = document.getElementById('icp-data');
        icpDataElement.innerHTML = `
            <h3>ICP Token Data</h3>
            <p>Price: $${icpData.price.toFixed(2)}</p>
            <p>Market Cap: $${icpData.marketCap.toFixed(2)}</p>
            <p>Last Updated: ${new Date(icpData.lastUpdated).toLocaleString()}</p>
        `;
    } catch (error) {
        console.error('Error fetching ICP data:', error);
    }
}

async function updateVotingResults() {
    try {
        const votingResults = await backend.getVotingResults();
        const totalVotes = votingResults.yesVotes + votingResults.noVotes;
        document.getElementById('total-votes').textContent = totalVotes;
        const yesPercentage = totalVotes > 0 ? (votingResults.yesVotes / totalVotes * 100).toFixed(2) : 0;
        const noPercentage = totalVotes > 0 ? (votingResults.noVotes / totalVotes * 100).toFixed(2) : 0;
        document.getElementById('vote-results').textContent = `Yes: ${yesPercentage}% | No: ${noPercentage}%`;
    } catch (error) {
        console.error('Error updating voting results:', error);
    }
}

document.getElementById('vote-yes').addEventListener('click', async () => {
    await backend.vote(true);
    updateVotingResults();
});

document.getElementById('vote-no').addEventListener('click', async () => {
    await backend.vote(false);
    updateVotingResults();
});

fetchICPData();
updateVotingResults();
setInterval(fetchICPData, 60000); // Update ICP data every minute
