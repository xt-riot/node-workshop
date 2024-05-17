db = db.getSiblingDB('admin');

Object.entries(process.env).forEach(([key, value]) => {
  print('Got this' + key + ' value: ' + value);
});
db.auth(
  process.env.MONGO_INITDB_ROOT_USERNAME,
  process.env.MONGO_INITDB_ROOT_PASSWORD
);

db = db.getSiblingDB('workshop');

db.createUser({
  user: process.env.MONGO_USER,
  pwd: process.env.MONGO_PASSWORD,
  roles: [
    {
      role: 'dbOwner',
      db: 'workshop',
    },
  ],
});

db.createCollection('transactions', { capped: false });
db.createCollection('accounts', { capped: false });
