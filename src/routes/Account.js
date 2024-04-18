import React from 'react'

function Account({ isAuthorized }) {
    console.log(isAuthorized);
    return (
        <div className='account'>
            <div className='account-card'>
                <h1>Account</h1>
            </div>
        </div>
    )
}

export default Account