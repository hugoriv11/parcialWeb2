imanes();

console.log(document.forms.formRegistrar.iman.value);

document.querySelector("#formRegistrar").addEventListener("submit", function (event) {
    event.preventDefault();
    let data = {
        forma: document.forms.formRegistrar.forma.value,
        color: document.forms.formRegistrar.color.value,
        intensidad : document.forms.formRegistrar.intensidad.value
    }
    fetch('/api/Imanes', {
        method: "POST",
        body: JSON.stringify(data),
        headers:{
            'content-Type':'application/js'
        }
    }).then(res => res.json())
        .then(response => {
            alert("Iman insertado con exito");
            imanes();
        })
        .catch(err => {
            alert("revisa datros");
            console.log(err);
        });
});

document.forms.formUpdate.addEventListener("submit", function (event) {
    event.preventDefault();
    let data = {
        forma: document.forms.formUpdate.formaU.value,
        color: document.forms.formRegistrar.colorU.value,
        intensidad : document.forms.formRegistrar.intensidadU.value
    }
    fetch('/api/Imanes' + document.forms.formUpdate._id.value, {
        method: "PUT",
        body: JSON.stringify(data),
        headers:{
            'content-Type':'application/js'
        }
    }).then(res => res.json())
        .then(response => {
            alert("Iman insertado con exito");
            imanes();
        })
        .catch(err => {
            alert("revisa datros");
            console.log(err);
        });
});

function imanes(){
    fetch('/api/Imanes', {
        method: "GET"
    }).then(res => res.json())
        .then(data => {
            let filas = "";
            data.forEach(element => {
                filas = filas + `<tr>
                                    <td>${element.forma}</td>
                                    <td>${element.color}</td>
                                    <td>${element.intensidad}</td>
                                    <td>
                                        <a href="/api/Imanes${element._id}" class="update" data-toggle="modal">Actualizar</a>
                                        <a href="/api/Imanes${element._id}" class="delete"  data-toggle="modal">Eliminar</a>
                                    </td>
                                </tr>`
            });
            document.querySelector("#filas").innerHTML = filas;
            let btnUpdate = document.querySelectorAll('.update');
            btnUpdate.forEach(item => {
                item.addEventListener("click", function (event) {
                    event.preventDefault();
                    let url = this["href"];
                    fetch(url, {
                        method: "GET"
                    }).then(res => res,json())
                        .catch(err => console.error(err))
                        .then(response => {
                            document.forms.formUpdate._id.value = response._id;
                            document.forms.formUpdate.formaU.value = response.formaU;
                            document.forms.formUpdate.colorU.value = response.colorU;
                            document.forms.formUpdate.intensidadU.value = response.intensidadU;
                        });
                });
            });

            let btnDelete = document.querySelectorAll('.delete');
            btnDelete.forEach(item => {
                item.addEventListener("click", function (event) {
                    event.preventDefault();
                    let url = this["href"];
                    fetch(url, {
                        method: "DELETE"
                    }).then(res => res,json())
                        .then(response => {
                            alert("Iman elimindado con exito");
                            imanes();
                        })
                        .catch(err => {
                            alert("revisa datros");
                            console.log(err);
                        });
                });
            });
        })
}
