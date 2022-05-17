window.onload = function () {
    f()
}
function f() {
    let kontejner = document.getElementById("invoicesK");
    let zaplacenoEl = document.getElementById("zaplaceno");
    let nezaplacenoEl = document.getElementById("nezaplaceno");
    let zaplaceno = 0;
    let nezaplaceno = 0;
    kontejner.innerText = "";
    fetch("http://localhost:8080/5290efaf-7664-4a72-a445-23575a651512/invoices")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            for (let i = 0; i < data.length; i++) {
                let element = document.createElement("div")
                let paidBtn = document.createElement("button")
                if (data[i].paid){
                    element.innerHTML = `${data[i].to} - ${data[i].amount} - zaplaceno`
                    paidBtn.innerHTML = "uhradit"
                    zaplaceno += data[i].amount
                }
                else {
                    element.innerHTML = `${data[i].to} - ${data[i].amount} - nezaplaceno`
                    paidBtn.innerHTML = "zaplatit"
                    nezaplaceno += data[i].amount
                }
                paidBtn.addEventListener("click", function () {
                    fetch("http://localhost:8080/5290efaf-7664-4a72-a445-23575a651512/invoices/" + data[i].id + "/paid",{
                        method: "POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    })
                        .then(response => f())
                })
                let deleteBtn = document.createElement("button")
                deleteBtn.innerHTML = "delete"
                deleteBtn.addEventListener("click", function () {
                    fetch("http://localhost:8080/5290efaf-7664-4a72-a445-23575a651512/invoices/" + data[i].id, {
                        method: "DELETE"
                    })
                        .then(response => f())
                })
                element.appendChild(paidBtn)
                element.appendChild(deleteBtn)
                kontejner.appendChild(element)
            }
            zaplacenoEl.innerText = zaplaceno
            nezaplacenoEl.innerText = nezaplaceno
        })
}
