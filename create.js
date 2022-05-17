window.onload = function () {
    let amountIn = document.getElementById("castka")
    let toIn = document.getElementById("to")
    let btn = document.getElementById("send-btn")

    btn.addEventListener("click", function (){
        fetch("http://localhost:8080/5290efaf-7664-4a72-a445-23575a651512/invoices", {
            method:"POST",
            headers:{//nastavuje práci s jasonem
                "Content-Type":"application/json"
            },
            body: JSON.stringify({//nastavuji hodnoty to, amount
                to:toIn.value,
                amount: amountIn.value
            })
        })
            .then(response => window.location.href = "index.html")
    })
}