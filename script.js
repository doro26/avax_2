let provider;
let signer;
let contract;

// Replace with your contract address and ABI
const contractAddress = '0xabEDBFB99caf46c7F208Bbc3c06d793715763dd8'; // Update with your actual contract address

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
                "name": "skills",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "rate",
                "type": "string"
            }
        ],
        "name": "createFreelancerProfile",
        "outputs": [],
        "stateMutability": "nonpayable",
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
                "internalType": "string",
                "name": "budget",
                "type": "string"
            }
        ],
        "name": "createJobListing",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getJobListings",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "client",
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
                        "internalType": "string",
                        "name": "budget",
                        "type": "string"
                    }
                ],
                "internalType": "struct FreelanceMarketplace.Job[]",
                "name": "",
                "type": "tuple[]"
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

// Function to create freelancer profile
async function createFreelancerProfile(event) {
    event.preventDefault();

    if (!contract) {
        alert('Connect your wallet first to create a freelancer profile.');
        return;
    }

    const name = document.getElementById('freelancerName').value;
    const skills = document.getElementById('freelancerSkills').value;
    const rate = document.getElementById('freelancerRate').value;

    try {
        await contract.createFreelancerProfile(name, skills, rate);
        alert('Freelancer profile created successfully!');
    } catch (error) {
        console.error('Error creating freelancer profile:', error);
        alert('Error creating freelancer profile. Check console for details.');
    }
}

// Function to create job listing
async function createJobListing(event) {
    event.preventDefault();

    if (!contract) {
        alert('Connect your wallet first to create a job listing.');
        return;
    }

    const title = document.getElementById('jobTitle').value;
    const description = document.getElementById('jobDescription').value;
    const budget = document.getElementById('jobBudget').value;

    try {
        await contract.createJobListing(title, description, budget);
        alert('Job listing created successfully!');
        // Refresh job list after creating a job listing
        getJobListings();
    } catch (error) {
        console.error('Error creating job listing:', error);
        alert('Error creating job listing. Check console for details.');
    }
}

// Function to get all job listings
async function getJobListings() {
    try {
        if (!contract) {
            alert('Connect your wallet first to fetch job listings.');
            return;
        }

        const jobs = await contract.getJobListings();
        // Clear previous job listings
        const jobList = document.getElementById('jobList');
        jobList.innerHTML = '';

        // Display each job listing
        jobs.forEach(job => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${job.client}</strong> - <em>${job.title}</em>: ${job.description} (Budget: ${job.budget} ETH)`;
            jobList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error getting job listings:', error);
        alert('Error getting job listings. Check console for details.');
    }
}

// Add event listeners to forms
document.getElementById('freelancerProfileForm').addEventListener('submit', createFreelancerProfile);
document.getElementById('jobListingForm').addEventListener('submit', createJobListing);

// Automatically load job listings when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    getJobListings();
});
