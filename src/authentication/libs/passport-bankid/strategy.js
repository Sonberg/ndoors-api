/**
 * Module dependencies.
 */
var passport = require('passport-strategy'),
    util = require('util'),
    request = require('request');


function Strategy(options, verify) {
    options = options || {};
    options.authorizationUrl = options.authorizationUrl || 'https://bankid.privatbank.ua/DataAccessService/das/authorize';
    options.tokenUrl = options.tokenUrl || 'https://bankid.privatbank.ua/DataAccessService/oauth/token';
    options.customerUrl = options.customerUrl || 'https://bankid.privatbank.ua/ResourceService/checked/data';

    passport.Strategy.call(this);
    this.name = 'bankid';
    this.options = options;
}


util.inherits(Strategy, passport.Strategy);

Strategy.prototype.getAccessToken = function (authCode, callback) {

    var clientId = this.options.clientId,
        clientSecret = this.options.clientSecret,
        redirectUri = this.options.redirectUri;

    var bankIdData = {
        code: authCode,
        client_id: clientId,
        client_secret: sha1(clientId + clientSecret + authCode),
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
    };

    request.post({
        url: this.options.tokenUrl,
        json: true,
        form: bankIdData
    }, function (err, response, body) {
        callback(err, response, body);
    });
};

Strategy.prototype.decryptCustomerInfo = function (data) {
    var customerDecrypt = {};

};

Strategy.prototype.getCustomerInfo = function (accessToken, callback) {
    var customerData = {
        "type": "physical",
        "fields": ["firstName", "middleName", "lastName", "phone", "inn", "clId", "clIdText", "birthDay", "email", "sex"],
        "addresses": [{
            "type": "factual",
            "fields": ["country", "state", "area", "city", "street", "houseNo", "flatNo"]
        }],
        "documents": [{
            "type": "passport",
            "fields": ["series", "number", "issue", "dateIssue", "dateExpiration", "issueCountryIso2"]
        }]
    };

    var customerHeaders = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken + ', Id ' + this.options.clientId,
        'Accept': 'application/json'
    };

    request.post({
        url: this.options.customerUrl,
        json: true,
        body: customerData,
        headers: customerHeaders
    }, function (err, response, body) {
        callback(err, response, body);
    });
};


Strategy.prototype.authenticate = function (req) {
    var authCode = req.query.code;
    this.getAccessToken(authCode, function (err, accessToken) {
        this.getCustomerInfo(accessToken, function (err, customerInfo) {
            this.decryptCustomerInfo(customerInfo, function (err, decryptCustomerInfo) {
                console.log(decryptCustomerInfo);
            });
        });
    });
};

module.exports = Strategy;