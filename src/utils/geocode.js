const request = require("request")

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWtjcmlvbGxvIiwiYSI6ImNrcm5veWZsZDBmaTgydm85eGFoOGg4eGQifQ.j2uiY0lDy6-sqtehjOEyGw&limit=1`

    request({url, json: true}, (error,res) => {
        if(error){
            callback("Unable to connect to internet")
        } else if(res.body.features.length === 0) {
            callback("Unable to find location, please try another")
        } else {
            callback(undefined,{
                latitude: res.body.features[0].center[0],
                longitude: res.body.features[0].center[1],
                location: res.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode