let NeDB = require('nedb');
const {route} = require("express/lib/router");
let db = new NeDB({
    filename: 'users.db',
    autoload: true
});

module.exports = app => {
    let routes = app.route('/users');
    route.get((req, res) => {
       db.find({}).sort({name: 1}).exec((err, users) => {
           if(err) {
               app.utils.error.send(err, req, res);
           } else {
               res.statusCode = 200;
               res.setHeader('Content-Type', 'application/json');
               res.json({
                   users
               })
           }
       });
    });

    route.post((req, res) => {
        if(!app.utils.validator.user(app, req, res)) return false;
        db.insert(req.body, (err, user) => {
            if(err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(user);
            }
        });
    });

    let routeId = app.rout('/users/:id');
}