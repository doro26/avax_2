let provider;
let signer;
let contract;

// Replace with your contract address and ABI
const contractAddress = '0x2fdb19164E7d7bD0F94ccB312CE04D2eE4dA2186'; // Update with your actual contract address

const contractABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "summary",
                "type": "string"
            }
        ],
        "name": "createProfile",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getActiveJobs",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "title",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "budget",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isActive",
                        "type": "bool"
                    }
                ],
                "internalType": "struct FreelanceHub.Job[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "jobs",
        "outputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "title",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "description",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "budget",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isActive",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "title",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "description",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "budget",
                "type": "uint256"
            }
        ],
        "name": "postJob",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "profiles",
        "outputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "summary",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "proposals",
        "outputs": [
            {
                "internalType": "address",
                "name": "freelancer",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "jobId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "details",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "cost",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "jobId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "details",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "cost",
                "type": "uint256"
            }
        ],
        "name": "submitProposal",
        "outputs": [],
        "stateMutability": "nonpayable",
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

// Function to create freelancer profile
async function createProfile(event) {
    event.preventDefault();

    if (!contract) {
        alert('Connect your wallet first to create a profile.');
        return;
    }

    const name = document.getElementById('profileName').value;
    const summary = document.getElementById('profileSummary').value;

    try {
        await contract.createProfile(name, summary); // Changed to createProfile
        alert('Profile created successfully!');
    } catch (error) {
        console.error('Error creating profile:', error);
        alert('Error creating profile. Check console for details.');
    }
}

// Function to post a job
async function postJob(event) {
    event.preventDefault();

    if (!contract) {
        alert('Connect your wallet first to post a job.');
        return;
    }

    const title = document.getElementById('jobTitle').value;
    const description = document.getElementById('jobDescription').value;
    const budget = document.getElementById('jobBudget').value;

    try {
        await contract.postJob(title, description, ethers.utils.parseEther(budget)); // Changed to postJob
        alert('Job posted successfully!');
        // Refresh job list after posting a job
        getJobs();
    } catch (error) {
        console.error('Error posting job:', error);
        alert('Error posting job. Check console for details.');
    }
}

// Function to get all jobs
async function getJobs() {
    try {
        if (!contract) {
            alert('Connect your wallet first to fetch jobs.');
            return;
        }

        const jobs = await contract.getActiveJobs(); // Changed to getActiveJobs
        // Clear previous job listings
        const jobList = document.getElementById('jobList');
        jobList.innerHTML = '';

        // Display each job
        jobs.forEach(job => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${job.title}</strong>: ${job.description} (Budget: ${ethers.utils.formatEther(job.budget)} ETH)`; // Access job properties correctly
            jobList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error getting jobs:', error);
        alert('Error getting jobs. Check console for details.');
    }
}

// Add event listeners to forms
document.getElementById('profileForm').addEventListener('submit', createProfile);
document.getElementById('jobForm').addEventListener('submit', postJob);

// Automatically load jobs when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    getJobs();
});
