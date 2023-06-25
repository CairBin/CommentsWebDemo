export default {
    address: {
        port: 3000,
        host: "localhost"
    },
    path: {
        static: "public",
        views: "views"
    },
    session: {
        key: 'SESSION_ID',
        secret: "your_secret_key",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 * 8, signed: true }
    },
    //"mysql://username@host_address:port/database"
    database: {
        kind: 'mysql',
        dbName: 'db_name',
        user: 'db_user',
        password:'db_password',
        host: 'db_host',
        port:3306
    }
}