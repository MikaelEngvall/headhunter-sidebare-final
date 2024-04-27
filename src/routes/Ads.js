import React, { useState, useEffect } from 'react';
import { getAllMyJobs } from '../functions/getAllMyJobs';

const Ads = () => {
    const [jobList, setJobList] = useState([]);
    const [selectedJobId, setSelectedJobId] = useState(null);

    useEffect(() => {
        getAllMyJobs(setJobList);
    }, []);

    const handleJobClick = (jobId) => {
        setSelectedJobId(jobId);
    };

    const handleAddJob = () => {
        // Implement logic for adding a new job using addJob function
    };

    const handleDeleteJob = (jobId) => {
        // Implement logic for deleting a job using deleteJob function
        setJobList(jobList.filter((job) => job.id !== jobId));
    };

    return (
        <div className="ads-container">
            <div className="ads-card">
                <div className="job-list-container">
                    <h2>Jobs</h2>
                    <ul>
                        {jobList.map((job) => (
                            <li
                                key={job.id}
                                className={selectedJobId === job.id ? 'active' : ''}
                                onClick={() => handleJobClick(job.id)}
                            >
                                {job.title}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="ad-actions">
                    <i
                        className="fa fa-plus"
                        role="button"
                        onClick={handleAddJob}
                    ></i>
                    <i
                        className="fa fa-trash"
                        role="button"
                        disabled={!selectedJobId}
                        onClick={() => handleDeleteJob(selectedJobId)}
                    ></i>
                </div>
                {selectedJobId && (
                    <div className="job-details">
                        <h2>{jobList.find((job) => job.id === selectedJobId)?.title}</h2>
                        <div className="ad-description">
                            {jobList.find((job) => job.id === selectedJobId)?.description}
                        </div>
                        <div className="ads-ad-preview">
                            <h2>Ad Preview</h2>
                            {/* Add content for Ad Preview section here */}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Ads;
