const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { response } = require('express')
const geocode= require('./geocode.js')
const forecast= require('./forecast.js')



const app = express()
const publicpath= path.join(__dirname,'../public')
const viewspath= path.join(__dirname,'../template/views')
const partialpath= path.join(__dirname,'../template/partials')


app.use(express.static(publicpath))
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialpath)

app.get('',(req,res) => {
    res.render('index', {
        title: 'home page',
        created: 'sun'
    })
}
)

app.get("/about",(req,res)=>{
    res.render("about" , {
        about:'fjvnoj'
    })
})


app.get("/help",(req,res) => {
    res.render('help')
})


app.get('/weather',(request,responce) => {
    if(!request.query.address) {
        return responce.send('error: please enter address')
    }

    const address1 = request.query.address
    geocode(address1,(error,result) => {
        if(error){
            return responce.send("error not currect points")
        }
        else{
            forecast(result.latitude,result.longitude,(error,res) => {
                if(error){
                    responce.send("error : long and lat is not there")
                }

                responce.send({
                    forecast: res,
                    location: result.location,
                    address: address1
                })

            })
        }
    }
    )
})
app.get('/products',(request,respond)=> {
    console.log(request.query)
    respond.send({
        product: []
    })
})

app.get("/help/*",(req,res) => {
    res.render('headerfooter' , {
        title: 'help article was not found'
    })
})
 app.get('*',(req,res) => {
     res.render('headerfooter', {
         title: '404 error'
     })
 })

app.listen(3000, () => {
    console.log('its working')
})