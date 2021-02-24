const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url=`http://api.weatherstack.com/current?access_key=d85d315ba749d5a5d3b36933aa0e3ed6&query=${latitude},${longitude}&units=f`

    request({ url, json: true }, (error, result) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (result.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,' It is currently ' + result.body.current.temperature + ' degress out. There is a ' + result.body.current.feelslike + '% chance of rain.')
        }
    })
}

module.exports = forecast

/*const request= require('request')

const forecast = (latitude,longitude,callback) => {
    const url=`http://api.weatherstack.com/current?access_key=d85d315ba749d5a5d3b36933aa0e3ed6&query=${latitude},${longitude}&units=f`

    request({url: url,json: true},(error,responce) => {
        if(error) {
            callback("no internet",undefined)
        }
        else if(responce.body.error){
            callback('data not found',undefined)
        } else {
            callback(undefined,`it is currently ${responce.body.current.temperature} .it feels like ${responce.body.current.feelslike}`)

        }

    })
}

forecast('17.980','19.739',(error,result)=> {
    console.log(result)
} 
)


module.exports ={
    forecast: forecast
}
*/