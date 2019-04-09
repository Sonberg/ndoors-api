const base64 = require('base-64');

const sendSmsUrl = 'https://api.46elks.com/a1/SMS';
const phoneNumber = '+46766862812'; // this should come frmo the get

async function getCredentials() {
    const listOfUsers = [
        {
            username: 'u2dec43ad48a3c9d40d18d70fd73b75d4',
            password: 'C2064EF88DD8CE862EB82F02D3F861C9'
        }
    ]
    for(let i = 0; i < listOfUsers.length; i++) {
        const uname = listOfUsers[i].username;
        const pword = listOfUsers[i].password;
        const user = await getUser(uname, pword);
        if (isItEnoughMoney(user.balance)) {
            const phone = await getPhoneNumber(uname, pword);
            return {
                user: uname,
                pass: pword,
                phone
            }
        }
    }
}

async function getUser(username, password) {
    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + base64.encode(username + ":" + password));
    return fetch('https://api.46elks.com/a1/me', {
        method: 'GET',
        headers: headers
    })
    .then(response => response.json())
    .then(response => {
        return response;
    })
}

function isItEnoughMoney(money) {
    //one sms = 35 öre, or 3500
    return (money >= 3500)
}

function getPhoneNumber(username, password) {
    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + base64.encode(username + ":" + password));
    return fetch('https://api.46elks.com/a1/numbers', {
        method: 'GET',
        headers: headers
    })
    .then(response => response.json())
    .then(response => {
        return response.data[0].number;
    })
}

module.exports = {
    getCredentials,
    url: sendSmsUrl
}
