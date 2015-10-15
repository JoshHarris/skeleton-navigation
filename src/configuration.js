var config = {

    apiUrl: 'http://localhost:5000',

    timezone: 'Europe/Amsterdam',

    auth: {
        // Object in authentication response with the token
        tokenName: 'api_key',

        // Auth token in the Authorization header is JWT for our backend (instead of Bearer)
        authToken: 'JWT',

        // Logins happen at the POST /sessions/create endpoint
        loginUrl: 'staff/login',

        // Once logged in, we want to redirect the user to the welcome view
        loginRedirect: '#/'
    },
    /** The currently logged in user
     * @type {null}
     */
    user: null
}

export default config;

// export var config = new Configuration();
