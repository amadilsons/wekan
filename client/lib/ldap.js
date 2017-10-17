class LdapAuthenticator {

  constructor() {
    var config = require('../config/ldap.js');
    if(!config) { throw new Error('Unable to read LDAP configuration file!'); }
    this.config = config;
  }

  // Tries to authenticate the user through and LDAP bind using the retrieved DN and input password.
  authenticate(dn, pwd) {

  }

  // Injects the user's input login ID in the filter specified by the 'userFilter' configuration property.
  createFilter(loginId) {

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
    if(typeof this.config[property] !== 'undefined') { return true; }
    return false;
  }
};
