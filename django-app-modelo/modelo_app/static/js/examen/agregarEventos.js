document.addEventListener("DOMContentLoaded", function () {
    const crearButton = document.querySelector("#crearButton");

    crearButton.addEventListener("click", function (event) {
        event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const fecha_inicio = document.getElementById('fecha_inicio').value;
    const fecha_fin = document.getElementById('fecha_fin').value;
    const localidad = document.getElementById('localidad').value;
    const fechaInicioDate = new Date(fecha_inicio);
    const fechaFinDate = new Date(fecha_fin);
    const fechaActual = new Date();

    if (!nombre || !descripcion || !fecha_inicio || !fecha_fin || !localidad) {
        mostrarMensaje("Todos los campos son obligatorios.", true);
        return;
    }

    if (fechaInicioDate <= fechaActual) {
        mostrarMensaje("❌ La fecha de inicio debe ser mayor a la fecha actual.", true);
        return;
    }

    if (fechaFinDate <= fechaInicioDate) {
        mostrarMensaje("❌ La fecha de fin debe ser mayor a la fecha de inicio.", true);
        return;
    }

    const data = {
        nombre,
        descripcion,
        fecha_inicio,
        fecha_fin,
        localidad_id: parseInt(localidad)
    };
        console.log("Datos enviados:", data);
        const csrftoken = getCSRFToken();

        fetch(EVENTO_CREATE_URL, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "X-CSRFToken": csrftoken,
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Respuesta del servidor:", data);
                alert(data.message || "Evento agregado correctamente");
                //location.reload();
                limpiarFormulario(); 
                actualizarTablaEventos();
            })
            .catch(error => {
                console.error("Error en la solicitud:", error);
                alert("❌ Error al agregar evento: Revisa las reglas " + error.message);
            });
    });

    function getCSRFToken() {
        let csrfToken = null;
        document.cookie.split(";").forEach(cookie => {
            let [name, value] = cookie.trim().split("=");
            if (name === "csrftoken") {
                csrfToken = value;
            }
        });
        return csrfToken;
    }

    function limpiarFormulario() {
        document.getElementById('nombre').value = "";
        document.getElementById('descripcion').value = "";
        document.getElementById('fecha_inicio').value = "";
        document.getElementById('fecha_fin').value = "";
        document.getElementById('localidad').selectedIndex = 0;
    }

    function actualizarTablaEventos() {
        const tablaBody = document.querySelector("#tablaEventos tbody");
    
        if (!tablaBody) {
            console.error("Error: No se encontró la tabla de eventos en el DOM.");
            return;
        }
    
        fetch(EVENTO_LIST_URL)
        .then(response => response.json())
        .then(data => {
            console.log("Eventos actualizados:", data);
            tablaBody.innerHTML = ""; 
    
            data.forEach(evento => {
                const fila = document.createElement("tr");
                fila.innerHTML = `
                    <td>${evento.nombre}</td>
                    <td>${evento.fecha_inicio}</td>
                    <td>${evento.fecha_fin}</td>
                    <td>${evento.localidad}</td>
                    <td><button class="eliminar-btn" data-id="${evento.id}">Eliminar</button></td>
                `;
                tablaBody.appendChild(fila);
            });
    
            document.querySelectorAll(".eliminar-btn").forEach(button => {
                button.addEventListener("click", function () {
                    const eventoId = this.getAttribute("data-id");
                    eliminarEvento(eventoId);
                });
            });
        })
        .catch(error => console.error("Error al actualizar la tabla:", error));
    }
    

    function eliminarEvento(eventoId) {
        const confirmacion = confirm("¿Estás seguro de que deseas eliminar este evento?");
        if (!confirmacion) return;
    
        fetch(`${EVENTO_DELETE_URL}${eventoId}/`, {
            method: "DELETE",
            headers: { "X-CSRFToken": getCSRFToken() }
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(err => { throw new Error(err) });
            }
            return response.json();
        })
        .then(data => {
            console.log("✅ Respuesta del servidor:", data);
            alert(data.mensaje || "Evento eliminado correctamente");
            actualizarTablaEventos();
        })
        .catch(error => console.error("🚨 Error al eliminar evento:", error));
    }

    function mostrarMensaje(mensaje, esError = false) {
        const mensajeElemento = document.getElementById("mensaje");
        if (!mensajeElemento) return;
    
        mensajeElemento.textContent = mensaje;
        mensajeElemento.style.color = esError ? "red" : "green";
    
        setTimeout(() => {
            mensajeElemento.textContent = "";
        }, 3000);
    }
    
    actualizarTablaEventos();
});
