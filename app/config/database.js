var connecs="boluwatife1@"
var cons=encodeURIComponent(connecs)
//var url="mongodb://Comestibles:"+cons+"@ds143907.mlab.com:43907/comes"
//http://192.168.43.193
//var url="mongodb://192.168.43.193/test"
//var url="mongodb://127.0.0.1:27017/hospital"
var url=process.env.MONGO_URL
module.exports={
    'url':url
}