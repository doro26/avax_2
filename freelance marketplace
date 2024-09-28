# Freelance Marketplace

A decentralized freelance marketplace application built on Ethereum, allowing freelancers to create profiles, post jobs, and submit proposals.

## Prerequisites

- Node.js (for package management)
- Remix IDE (for contract development to obtain your ABI and contract address)
- MetaMask (or other Ethereum wallet)

## Installation

1. Install dependencies: Make sure you have Node.js installed, then run:

    ```bash
    npm install
    ```

2. Set up your Ethereum environment:
    - Install MetaMask in your browser.
    - Create a wallet and connect to a test network like Rinkeby or Goerli.

3. Deploy the smart contract:
    - Use Remix IDE to deploy the `FreelanceHub` contract.

## Usage

1. Connect your wallet using MetaMask by clicking the "Connect Wallet" button.
2. Create your freelancer profile by filling out the form.
3. Clients can post jobs by providing details and budget.
4. Freelancers can submit proposals for jobs they are interested in.
5. View active jobs and proposals dynamically displayed on the platform.

### Contract Details

- Contract Address: `0x2fdb19164E7d7bD0F94ccB312CE04D2eE4dA2186`
- Contract ABI: Ensure you have the ABI for the `FreelanceHub` contract in your frontend code.

## Example Code

Below is an example of how to interact with the contract using JavaScript:

```javascript
// Function to connect to the wallet
async function connectWallet() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log(`Connected account: ${accounts[0]}`);

            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            contract = new ethers.Contract(contractAddress, contractABI, signer);
            alert('Wallet connected');
        } catch (error) {
            console.error('Failed to connect wallet:', error);
            alert('Failed to connect wallet. Check the console for more details.');
        }
    } else {
        alert('No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.');
    }
}

// Add event listener to connect wallet button
document.getElementById('connectWalletButton').addEventListener('click', connectWallet);
