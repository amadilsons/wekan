const LdapConfigurationSchema = new SimpleSchema({
  url: {
    type: String,
    regEx: /^\w+/,
  },
  userTree: {
    type: String,
  },
  userFilter: {
    type: String,
    regEx: /({login}){1}/,
  },
  managerDN: {
    type: String,
    optional: true,
  },
  managerPassword: {
    type: String,
    optional: true,
  },
  mapping: {
    type: Object,
    optional: true,
  },
  'mapping.name': {
    type: String,
    optional: true,
  },
  'mapping.mail': {
    type: 'String',
    optional: true,
  },
  startTls : {
    type: Boolean,
    optional: true,
  },
});

module.exports = class LdapAuthenticator {

  constructor() {
    var config = require('../config/ldap.js');
    if(!config) { throw new Error('corrupted LDAP configuration!'); }
    try {
      LdapConfigurationSchema.validate(config); // FIX: guarantee '{login}' placeholder uniqueness in userFilter
    } catch(err) {
      throw new Error('improper LDAP configuration format! ' + err.message);
    }
    this.config = config;
  }

  // Tries to authenticate the user through and LDAP bind using the retrieved DN and input password.
  authenticate(dn, pwd) {

  }

  // Injects the user's input login ID in the filter specified by the 'userFilter' configuration property.
  createFilter(loginId) {
    if(!this.hasProperty('userFilter')) { return null; }
    const regex = /({login})/;
    if(regex.test(this.config.userFilter)) { console.log('yeah'); }
    else { console.log('nay'); }

  }

  // Fetch user's DN with an LDAP search. If no manager credentials are specified, an anonymous search is performed.
  dnQuery(userFilter, credentials, callback) {

    if(callback) {
      callback(result, error);
    }
  }

  // Getter for configuration properties
  get(property) {
    if(!property) { return undefined; }
    return this.config[property];
  }

  // Checks if configuration object has property @property defined.
  hasProperty(property) {
    if(!property) { return this.config ? true : false; }
    else if(typeof this.config[property] !== 'undefined') { return true; }
    else { return false; }
  }

  initLdapClient(opt) {

    var url = new String(this.config.url);
    if( !/^(ldap|ldaps):\/\//.test(url)) { //protocol not specified
      url = url.replace(/^/, 'ldap://');
    }

    console.log('here 1');
    if(!/:\d+$/.test(url)) { //port not specified
      if(/^ldap:\/\//.test(url)) {
        url = url.concat(':389');
      } else {
        url = url.concat(':636');
      }
    }
    console.log('here 2');
    var options = {
      uri: url,
      base: this.config.userTree
    }
    console.log('here 3 url: ' + url);

  }
};

//TLS
/*, (err) => {
  if(err) { console.log(err.message) }
  /*if(this.config.startTls) {
    ldap.starttls(function(err) {
      ldap.installtls();
      if (ldap.tlsactive() !== 1) process.exit(1);
      ldap.bind({ binddn: 'cn=xxxx,dc=example,dc=org', password: 'yyyxyxy'}, function(err) {
          if (err) {
              console.log(err);
          }
      });
    });
  }
});*/
