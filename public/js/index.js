(()=>{

    document.getElementById("submit").addEventListener("click", (event) => {
        event.preventDefault()
        let query = document.getElementById("query").value
        let offset = document.getElementById("offset").value
        
        window.location.href = "/api/search/?q=" + query + "&offset=" + offset
    })
    
})()