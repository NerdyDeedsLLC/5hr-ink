console.clear();
const express = require('express')
     ,path    = require('path')
     ,mongo   = require('mongodb')
     ,routes  = require('./app/routes/unfurl.js')
     ,api     = require('./app/api/furl.js');

require('dotenv').config({ 
    debug: process.env.DEBUG 
})

const pEv        = process.env
     ,app        = express()
     ,webPort    = pEv.WEBPORT
     ,dbProtocol = pEv.DB_PROTOCOL
     ,dbDomain   = pEv.DB_DOMAIN
     ,dbPort     = pEv.DB_PORT
     ,dbName     = pEv.DB_NAME
     ,dbURI      = dbProtocol + dbDomain + ':' + dbPort + '/' + dbName;

mongo.MongoClient.connect(
     dbURI
    ,function(err, dBase) {
        if (err) throw new Error('Database failed to connect!');
        console.log('MongoDB communication established on port ' + dbPort + '.');
        
        let db = dBase.db(dbName)
        db.createCollection("5hoURLink", {
            capped: true,
            size: 5242880,
            max: 5000
        });

        routes(app, db);
        api(app, db);

        app.listen(webPort, () => console.log(`5erver i5 li5tening on port ${webPort}!`));
    }
);