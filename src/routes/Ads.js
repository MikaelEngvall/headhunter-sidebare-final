import React, { useState, useEffect } from 'react';
import { getAllMyJobs } from '../functions/getAllMyJobs';

const Ads = () => {
    const [jobList, setJobList] = useState([]);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [hoveredJobId, setHoveredJobId] = useState(null);

    useEffect(() => {
        getAllMyJobs(setJobList);
    }, []);

    const handleJobClick = (jobId) => {
        setSelectedJobId(jobId);
    };

    const handleJobHover = (jobId) => {
        setHoveredJobId(jobId);
    };

    return (
        <div className="ads-container">
            <div className="ads-card">
                <div className="jobs-column">
                    <h2>Jobs</h2>
                    <ul className="job-list-container">
                        {jobList.map((job) => (
                            <li
                                key={job.id}
                                className={selectedJobId === job.id ? 'active' : hoveredJobId === job.id ? 'hovered' : ''}
                                onClick={() => handleJobClick(job.id)}
                                onMouseEnter={() => handleJobHover(job.id)}
                                onMouseLeave={() => handleJobHover(null)}
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
        </div >
    );
};

export default Ads;
