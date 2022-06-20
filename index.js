var MyModule = module.exports;
const Core = require('@alicloud/pop-core');


MyModule.create = function (options) {
    let m = {};
    let client = null
    let zones = options.zones
    if(!options.accessKeyId){
        return false
    }

    const requestOption = {
        method: 'POST'
    };

    m.init = function ({ request }) {
        // (optional) initialize your module
        return new Promise(function (resolve, reject) {
            client = new Core({
                accessKeyId: options.accessKeyId, //阿里云API密钥ID
                accessKeySecret: options.accessKeySecret,
                endpoint: 'https://alidns.aliyuncs.com',
                apiVersion: '2015-01-09'
            });
            resolve()
        })
    }

    m.zones = function ({ dnsHosts }) {
        // return a list of "Zones" or "Apex Domains" (i.e. example.com, NOT foo.example.com)
        return new Promise(function (resolve, reject) {
            resolve(zones)
        })
    }

    m.set = function (data) {
        // set a TXT record for dnsHost with keyAuthorizationDigest as the value
        return new Promise(function (resolve, reject) {
            client.request('AddDomainRecord', {
                "DomainName": data.challenge.dnsZone,
                "RR": data.challenge.dnsPrefix,
                "Type": "TXT",
                "Value": data.challenge.keyAuthorizationDigest
            }, requestOption)
                .then(function (response) {
                    resolve(response)
                }).catch(e => {
                    console.log(e)
                    reject(e)
                })
        })
    }

    m.get = function (data) {
        // check that the EXACT a TXT record that was set, exists, and return it
        return new Promise(function (resolve, reject) {
              client.request('DescribeDomainRecords', {
                "DomainName": data.challenge.dnsZone,
                "RRKeyWord": data.challenge.dnsPrefix,
                "SearchMode": "ADVANCED"
              }, requestOption).then((result) => {
                resolve(result);
              }, (ex) => {
                console.log(ex);
                reject(ex)
              })
        })
    }

    m.remove = function (data) {
        // remove the exact TXT record that was set
        return new Promise(function (resolve, reject) {
            client.request('DeleteSubDomainRecords', {
                "DomainName": data.challenge.dnsZone,
                "RR": data.challenge.dnsPrefix,
            }, requestOption).then((result) => {
                resolve(result)
            }, (ex) => {
                console.log(ex);
                reject(ex)
            })
            // resolve()
        })
    }

    return m;
}