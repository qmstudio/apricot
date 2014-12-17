var express = require('express')
, mongoskin = require('mongoskin')
, bodyParser = require('body-parser')

var app = express()
app.use(bodyParser())

var db = mongoskin.db('mongodb://@localhost:27017/test', {safe:true})

app.param('collectionName', function(req, res, next, collectionName){
  req.collection = db.collection(collectionName)
  next()
})

app.get('/', function(req, res, next) {
  res.send('please select a collection, e.g., /colls/messages')
})

app.get('/colls/:collectionName', function(req, res, next) {
  req.collection.find({} ,{limit:10, sort: [['_id',-1]]}).toArray(function(e, results){
    if (e) return next(e)
      res.send(results)
    })
  })

  app.post('/colls/:collectionName', function(req, res, next) {
    req.collection.insert(req.body, {}, function(e, results){
      if (e) return next(e)
        res.send(results)
      })
    })

    app.get('/colls/:collectionName/:id', function(req, res, next) {
      req.collection.findById(req.params.id, function(e, result){
        if (e) return next(e)
          res.send(result)
        })
      })

      app.put('/colls/:collectionName/:id', function(req, res, next) {
        req.collection.updateById(req.params.id, {$set:req.body}, {safe:true, multi:false}, function(e, result){
          if (e) return next(e)
            res.send((result===1)?{msg:'success'}:{msg:'error'})
          })
        })

        app.del('/colls/:collectionName/:id', function(req, res, next) {
          req.collection.removeById(req.params.id, function(e, result){
            if (e) return next(e)
              res.send((result===1)?{msg:'success'}:{msg:'error'})
            })
          })

          app.listen(process.argv[2])
