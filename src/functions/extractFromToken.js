// Libraries, functions, etc.
import { jwtDecode } from "jwt-decode";

/**
 * Extracts the user's email from the JWT stored locally in the browser.
 *
 * @function
 * @return {String} email of the user.
 */

export function extractEmailFromToken() {
    /**
     * JwtDecode is a third-party-library that can extract the token from a JWT. The token is stored as "headhunter-token" in the browser.
     */
    const decodedToken = jwtDecode(localStorage.getItem("headhunter-token"));

    const email = decodedToken.sub;

    return email;
}


/**
 * Extracts the user's username from the JWT stored locally in the browser.
 *
 * @function
 * @return {String} username of the user.
 */

export function extractUsernameFromToken() {
    /**
     * JwtDecode is a third-party-library that can extract the token from a JWT. The token is stored as "headhunter-token" in the browser.
     */
    const decodedToken = jwtDecode(localStorage.getItem("headhunter-token"));

    const username = decodedToken.username;

    return username;
}


/**
 * Extracts the user's roles from the JWT stored locally in the browser.
 *
 * @function
 * @return {array} rolesArr - The roles that the user has.
 */

export function extractRolesFromToken() {
    // Get the token from local storage
    const token = localStorage.getItem("headhunter-token");

    // Check if the token exists
    if (!token) {
        // Token is null or undefined, return an empty array
        return [];
    }

    // Decode the token
    const decodedToken = jwtDecode(token);

    // Check if the decoded token is null or undefined
    if (!decodedToken) {
        // Decoded token is null or undefined, return an empty array
        return [];
    }

    // Extract roles from the decoded token
    const roles = decodedToken.roles;

    // Split roles string and format roles array
    const rolesArr = roles.split(" ").map((role) => role.slice(role.indexOf("_") + 1));

    return rolesArr;
}

/**
 * Extracts the JWT that is locally stored. From it, it looks up the time for when the session has been set to end, and compares it to current time to see if the session is still valid.
 *
 * @function
 * @return {boolean} isExpired - If the session ends later than current time, the user can continue using the app.
 */

export function extractExpiredFromToken() {
    /**
     * JwtDecode is a third-party-library that can extract the token from a JWT. The token is stored as "headhunter-token" in the browser.
     */
    const decodedToken = jwtDecode(localStorage.getItem("headhunter-token"));

    const tokenExpireTime = decodedToken.exp * 1000;

    /**
     * Checks if session ending time is larger than current time
     */
    const isExpired = tokenExpireTime > Date.now();

    return isExpired;
}


