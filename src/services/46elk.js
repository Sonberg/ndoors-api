const base64 = require('base-64');
const config = require('./../config')

const baseUrl = 'https://api.46elks.com';
const credentials = config.ELKS_CREDENTIALS;

const sendSms = async (to, message, callback = (() => null)) => {
    const auth = await getValidCredentials();

    if (!auth) {
        throw 'Faild to find valid authentication keys';
    }

    const body = JSON.stringify({
        from: auth.phone,
        to,
        message
    })

    fetch(`${baseUrl}/a1/SMS`, {
        method: 'POST',
        headers: getAuthenticationHeaders(auth.user, auth.pass),
        body
    }).then(callback);
}

const getValidCredentials = async () => {
    for (let i = 0; i < credentials.length; i++) {
        const uname = credentials[i].username;
        const pword = credentials[i].password;
        const user = await getUser(uname, pword);
        if (isItEnoughMoney(user.balance)) {
            return {
                user: uname,
                pass: pword,
                phone: await getPhoneNumber(uname, pword)
            }
        }
    }
}

const getUser = async (username, password) => {
    const response = await fetch(`${baseUrl}/a1/me`, {
        method: 'GET',
        headers: getAuthenticationHeaders(username, password)
    })
    return await response.json();
}

const isItEnoughMoney = money => money >= 3500;

const getPhoneNumber = async (username, password) => {

    const response = await fetch(`${baseUrl}/a1/numbers`, {
        method: 'GET',
        headers: getAuthenticationHeaders(username, password)
    });
    const json = await response.json();

    return json.data[0].number;
}

const getAuthenticationHeaders = (username, password) => ({
    'Authorization': 'Basic ' + base64.encode(username + ":" + password),
    'Content-Type': 'application/json'
});

module.exports = {
    sendSms,
}