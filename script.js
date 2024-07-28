let provider;
let signer;
let contract;

// Replace with your contract address and ABI
const contractAddress = '0x10076B9B4b60933f793f6F11e06632FA010FE629'; // Update with your actual contract address

const contractABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "accountHolder",
                "type": "address"
            }
        ],
        "name": "AccountCreated",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "createAccount",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "deposit",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "accountHolder",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Deposit",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "accountHolder",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Withdrawal",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "getBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// Function to connect to the wallet
async function connectWallet() {
    if (window.ethereum) {
        try {
            // Request account access if needed
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log(`Connected account: ${accounts[0]}`);

            // Initialize ethers provider and signer
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();

            // Create a connection to the smart contract
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

// Function to create an account
async function createAccount() {
    if (!contract) {
        alert('Connect your wallet first to create an account.');
        return;
    }

    try {
        await contract.createAccount();
        alert('Account created successfully!');
    } catch (error) {
        if (error.data && error.data.message.includes("Account already exists")) {
            alert('Account already exists.');
        } else {
            console.error('Error creating account:', error);
            alert('Error creating account. Check console for details.');
        }
    }
}

// Function to deposit funds
async function depositFunds(event) {
    event.preventDefault();

    if (!contract) {
        alert('Connect your wallet first to deposit funds.');
        return;
    }

    const amount = document.getElementById('depositAmount').value;
    const etherAmount = ethers.utils.parseEther(amount);

    try {
        await contract.deposit({ value: etherAmount });
        alert('Funds deposited successfully!');
    } catch (error) {
        console.error('Error depositing funds:', error);
        alert('Error depositing funds. Check console for details.');
    }
}

// Function to withdraw funds
async function withdrawFunds(event) {
    event.preventDefault();

    if (!contract) {
        alert('Connect your wallet first to withdraw funds.');
        return;
    }

    const amount = document.getElementById('withdrawAmount').value;
    const etherAmount = ethers.utils.parseEther(amount);

    try {
        await contract.withdraw(etherAmount);
        alert('Funds withdrawn successfully!');
    } catch (error) {
        console.error('Error withdrawing funds:', error);
        alert('Error withdrawing funds. Check console for details.');
    }
}

// Function to get the balance
async function getBalance() {
    try {
        if (!contract) {
            alert('Connect your wallet first to fetch balance.');
            return;
        }

        const balance = await contract.getBalance();
        const etherBalance = ethers.utils.formatEther(balance);
        document.getElementById('balanceDisplay').innerText = `Balance: ${etherBalance} ETH`;
    } catch (error) {
        console.error('Error getting balance:', error);
        alert('Error getting balance. Check console for details.');
    }
}

// Add event listeners to forms and buttons
document.getElementById('createAccountButton').addEventListener('click', createAccount);
document.getElementById('depositForm').addEventListener('submit', depositFunds);
document.getElementById('withdrawForm').addEventListener('submit', withdrawFunds);
document.getElementById('getBalanceButton').addEventListener('click', getBalance);

// Automatically load balance when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    getBalance();
});
