
const input = document.querySelector('input')
const output = document.querySelector('p')


document.querySelector('form').addEventListener('submit',(e)=> {
    e.preventDefault()

    const  area= input.value
    fetch('http://localhost:3000/weather?address='+ area).then((responce) => {
        responce.json().then((store) => {
            if(store.error) {
                console.log("not working")
            }
            else {
                output.textContent=store.forecast
            }
        })
    })

})