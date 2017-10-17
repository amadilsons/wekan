const LdapConfiguration = {
  url: 0, //LDAP directory in the form 'protocol://host:port'
  userTree: 0, //directory tree under which all user account records can be found
  userFilter: 0, //user filter applied in all querys e.g. "(&(uid={login})(objectClass=Person)). Must return ever only one record"
  managerDN: 0, //DN of a user with read-only access to LDAP user directory, or user with administrative rights. If this property is not specified, the server attempts to do an anonymous search
  managerPassword: 0, //password for the above mentioned user
  mapping: {
    name: 0, //attribute in which the user's pretty print name is stored.
    mail: 0, //attribute in which the user's email is stored. Defaults to 'mail'
  },
  startTls: 0, //set to 'true' if LDAP server supports TLS. Defaults to 'false'
  version: 0, //LDAP version
}

module.exports = LdapConfiguration;

/* CONFIGURATION INFORMATION */
//  The 'url', 'userTree' and 'userFilter' fields MUST be specified;
//  If no protocol is specified in the 'url', it will default to LDAP;
//  If the protocol in the 'url' is LDAP and no port is specified, it will default to port 389;
//  If the protocol in the 'url' is LDAPS and no port is specified, it will default to port 636;
//  The 'userFilter' must contain the placeholder {login} that will be replaced by the user's input login ID.

/* AUTH FLOW */
// The client tries to fetch the user's record using the manager credentials. If none are specified, it tries
// to do an anonymous query. The 'userFilter' must be specified such that this query only ever returns
// one result. Zero or more than one results will result in a failed authentication.
// If the client is successful in retrieving the user's record, it uses it's DN and input password to try to bind
// to the LDAP server. If the bind is successful, then the user is authenticated.
