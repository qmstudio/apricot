module.exports.pageResult = function(results, page, perPage) {
  var start = getStartInternal(page, perPage)  var end = getEndInternal(page, perPage)  return results.slice(start, end)}module.exports.getStart = getStartInternalmodule.exports.trimTailingSlash = function (x) {  return x.replace(/\/$/gm,'');}module.exports.aggInternal = function(req, res, next, map, reduce, prop, groupby) {  var sort = (req.query.orderby) ? req.query.orderby : '_id'  var order = (req.query.desc) ? -1 : 1  var options = {    query: req.body,    scope: {property: prop, group: groupby},    out: {replace : 'intermediate'},    sort: {sort : order}  }  req.collection.mapReduce(map, reduce, options, function(e, outCollection) {    if (e) {      console.log(e)    }    outCollection.find().toArray(function(e, results) {      res.send(results)      next()    })  })}module.exports.usage = function() {  return {    "/" : "help",    "/cols[?page={num_of_pages}][&per_page={records_per_page}]" : {      "get" : "Show all collections"    },    "/col/{collection_name}" : {      "post" : "create collection",      "delete" : "delete collection",      "put" : "rename collection"    },    "/col/{collection_name}/docs[?page={num_of_pages}][&per_page={records_per_page}][&orderby={sortkey}][&{desc=1|asc=1}]" : {      "get" : "get docs",      "post" : "insert docs",      "patch" : "partially update docs. req.body[0] is search pattern and req.body[1] is patching action",      "delete" : "delete docs. (optionally by a query as req.body)"    },    "/col/{collection_name}/doc/{document_id}" : {      "get" : "find doc by Id",      "put" : "replace entire doc by Id",      "delete" : "delete doc by Id"    },    "/col/{collection_name}/next[?page={num_of_pages}][&per_page={records_per_page}][&orderby={sortkey}][&{desc=1|asc=1}]" : {      "get" : "Get the next record(s) (without isolation)",      "post" : "Get the next record(s) for the query (without isolation)"    },    "/reset" : "Reset the cursor for the session",    "/col/{collection_name}/count?prop={name1}[&groupby={name2}][&orderby={sortkey}][&{desc=1|asc=1}]" : {      "get" : "get count of all documents in a collection",      "post" : "get the count of the query results"    },    "/col/{collection_name}/max?prop={name1}[&groupby={name2}][&orderby={sortkey}][&{desc=1|asc=1}]" : {      "get" : "calculate max of a property upon all docs",      "post" : "calculate max of a property upon the query results"    },    "/col/{collection_name}/min?prop={name1}[&groupby={name2}][&orderby={sortkey}][&{desc=1|asc=1}]" : {      "get" : "calculate min of a property upon all docs",      "post" : "calculate min of a property upon the query results"    },    "/col/{collection_name}/sum?prop={name1}[&groupby={name2}][&orderby={sortkey}][&{desc=1|asc=1}]" : {      "get" : "calculate sum of a property upon all docs",      "post" : "calculate sum of a property upon the query results"    },    "/col/{collection_name}/avg?prop={name1}[&groupby={name2}][&orderby={sortkey}][&{desc=1|asc=1}]" : {      "get" : "calculate avgerage of a property upon all docs",      "post" : "calculate average of a property upon the query results"    }  }}function getStartInternal(page, perPage) {  var _page = page  var _perPage = perPage  if (!page) {    _page = 1  }  if (!perPage) {    _perPage = 1000  }  return parseInt(_page - 1) * _perPage}function getEndInternal(page, perPage) {  var _page = page  var _perPage = perPage  if (!page) {    _page = 1  }  if (!perPage) {    _perPage = 1000  }  return parseInt(_page) * _perPage}