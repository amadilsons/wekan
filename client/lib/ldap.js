const LdapConfigurationSchema = new SimpleSchema({
  url: {
    type: String,
  },
  userTree: {
    type: String,
  },
  userFilter: {
    type: String,
    regEx: /{login}/,
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
    try {
      LdapConfigurationSchema.validate(config);
    } catch(err) {
      throw new Error('Improper LDAP configuration! ' + err.message);
    }
    this.config = config;
    this.schema = LdapConfigurationSchema;
  }

  // Tries to authenticate the user through and LDAP bind using the retrieved DN and input password.
  authenticate(dn, pwd) {

  }

  // Injects the user's input login ID in the filter specified by the 'userFilter' configuration property.
  createFilter(loginId) {
    if(!this.hasProperty('userFilter')) { return null; }
    if(/({login}){1}/.test(this.config.userFilter)) { console.log('yeah'); }
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
};
