const LDAP = {
  url: 0, //LDAP directory in the form protocol://host:port
  userTree: 0, //directory tree under which all users' account records can be found
  userFilter: 0, //user filter applied in all querys e.g. "(&(uid=)(objectClass=Person))"
  managerDN: 0, //DN of a user with read-only access to LDAP user directory, or user with administrative rights. If this property is not specified, the server attempts to do an anonymous search
  managerPassword: 0, //password for the above mentioned user
  mapping: {
    name: 0, //attribute in which the user's pretty print name is stored.
    mail: 0, //attribute in which the user's email is stored. Defaults to 'mail'
  },
  startTls: 0, //set to 'true' if LDAP server supports TLS. Defaults to 'false'
  version: 0, //LDAP version
}

module.exports = LDAP;
