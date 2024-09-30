// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FreelanceHub {
    
    struct FreelancerProfile {
        string name;
        string summary;
    }

    struct Job {
        address owner;
        string title;
        string description;
        uint256 budget;
        bool isActive;
    }

    struct Proposal {
        address freelancer;
        uint256 jobId;
        string details;
        uint256 cost;
        bool approved;
    }

    mapping(address => FreelancerProfile) public profiles;
    Job[] public jobs;
    Proposal[] public proposals;

    // Create or update freelancer profile
    function createProfile(string memory name, string memory summary) public {
        profiles[msg.sender] = FreelancerProfile(name, summary);
    }

    // Post a new job
    function postJob(string memory title, string memory description, uint256 budget) public {
        jobs.push(Job(msg.sender, title, description, budget, true));
    }

    // Submit a proposal for a job
    function submitProposal(uint256 jobId, string memory details, uint256 cost) public {
        require(jobId < jobs.length && jobs[jobId].isActive, "Invalid job ID or job inactive");
        proposals.push(Proposal(msg.sender, jobId, details, cost, false));
    }

    // Retrieve all active jobs
    function getActiveJobs() public view returns (Job[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < jobs.length; i++) {
            if (jobs[i].isActive) count++;
        }

        Job[] memory activeJobs = new Job[](count);
        uint256 index = 0;

        for (uint256 i = 0; i < jobs.length; i++) {
            if (jobs[i].isActive) {
                activeJobs[index++] = jobs[i];
            }
        }
        return activeJobs;
    }
}
