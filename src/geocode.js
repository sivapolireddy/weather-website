const request = require('request')

const geocode = (address, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=d85d315ba749d5a5d3b36933aa0e3ed6&query=${address}`

    request({ url, json: true }, (error, responce) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (!responce.body.current) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: responce.body.location.lat,
                longitude: responce.body.location.lon,
                location:responce.body.location.name
            })
        }
    })
}

geocode('yarada',(error,result)=> {
    console.log(result.latitude)
})

module.exports = geocode