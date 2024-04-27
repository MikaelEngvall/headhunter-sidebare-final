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
                <div className="jobs-column">
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
                <div className="description-column">
                    {selectedJobId && (
                        <h2>
                            {jobList.find((job) => job.id === selectedJobId)?.title}
                        </h2>
                    )}
                    <div className="ad-description">
                        {selectedJobId &&
                            jobList.find((job) => job.id === selectedJobId)?.description}
                    </div>
                </div>
                <div className="iframe-column">
                    {selectedJobId && (
                        <iframe
                            srcDoc={
                                jobList.find((job) => job.id === selectedJobId)?.adHtml
                            }
                            frameBorder="0"
                            width="100%"
                            height="300px" /* Adjust height as needed */
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Ads;
