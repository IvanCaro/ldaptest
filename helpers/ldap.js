const ActiveDirectory = require('activedirectory');

const configExternos = {
  url: process.env.LDAP_URI_EXTERNOS,
  baseDN: process.env.LDAP_USER_ADMIN_EXTERNOS,
  tlsOptions: {
    rejectUnauthorized: (process.env.LDAP_VERIFICAR_CERTIFICADO_TLS === 'true')
  },
  timeout: 60000
};

const configInternos = {
  url: process.env.LDAP_URI_INTERNOS,
  baseDN: process.env.LDAP_BASE_URI_INTERNOS
};

const activeDirectoryExternos = new ActiveDirectory(configExternos);
const activeDirectoryInternos = new ActiveDirectory(configInternos);

let reintent = 0;

const autenticateProcess = (userName, password) => new Promise((resolve, reject) => {
  const ad = userName.startsWith('e_') ? activeDirectoryExternos : activeDirectoryInternos;

  ad.authenticate(userName, password, (err, auth) => {
    if (err && reintent < 5) {
      reintent += 1;
      autenticateProcess(userName, password);
    }
    if (err && reintent >= 5) {
      reintent = 0;
      reject(err);
    }
    if (auth) {
      reintent = 0;
      resolve(auth);
    } else {
      reintent = 6;
      console.log(err);
      reject('Authentication failed!');
    }
  });
});

exports.authenticate = autenticateProcess;

exports.extractDomainAndUserName = userName => {
  if (!userName) {
    return Promise.reject('parametro requerido [userName]');
  }

  return new Promise((resolve, reject) => {
    try {
      const userNameAux = userName.toString();
      const domainUser = {};
      const domain = userName.startsWith('e_') ?
                     process.env.DEFAULT_DOMAIN_EXTERNOS :
                     process.env.DEFAULT_DOMAIN_INTERNOS;

      let separator;
      if (userNameAux.indexOf('@') !== -1) {
        separator = '@';
      } else if (userNameAux.indexOf('\\') !== -1) {
        separator = '\\';
      }

      if (separator) {
        const userNameParts = userNameAux.split(separator);
        domainUser.User = userNameParts[0];
        domainUser.Domain = domain;

        return resolve(domainUser);
      }

      domainUser.User = userNameAux;
      domainUser.Domain = domain;

      return resolve(domainUser);
    } catch (err) {
      return reject(err);
    }
  });
};
