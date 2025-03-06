document.addEventListener("DOMContentLoaded", function () {
    const crearButton = document.querySelector("#crearButton");

    crearButton.addEventListener("click", function (event) {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const precio = parseFloat(document.getElementById("precio").value);
        const localidad = document.getElementById("localidad").value;

        // 🚨 VALIDACIONES 🚨
        if (!nombre || isNaN(precio) || precio <= 0 || !localidad) {
            mostrarMensaje("⚠️ Todos los campos son obligatorios y el precio debe ser mayor a 0.", true);
            return;
        }

        const data = {
            nombre,
            precio,
            localidad_id: parseInt(localidad)
        };

        console.log("📤 Enviando producto:", data);
        const csrftoken = getCSRFToken();

        fetch(PRODUCTO_CREATE_URL, {
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
            console.log("✅ Producto agregado:", data);
            alert(data.mensaje || "Producto agregado correctamente");
            limpiarFormulario();
            actualizarTablaProductos();
        })
        .catch(error => {
            console.error("❌ Error en la solicitud:", error);
            alert("❌ Error al agregar el producto. Revisa las reglas");
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
        document.getElementById("nombre").value = "";
        document.getElementById("precio").value = "";
        document.getElementById("localidad").selectedIndex = 0;
    }

    function actualizarTablaProductos() {
        const tablaBody = document.querySelector("#tablaProductos tbody");

        if (!tablaBody) {
            console.error("❌ Error: No se encontró la tabla de productos en el DOM.");
            return;
        }

        fetch(PRODUCTO_LIST_URL)
        .then(response => response.json())
        .then(data => {
            console.log("📋 Productos actualizados:", data);
            tablaBody.innerHTML = "";

            data.forEach(producto => {
                const fila = document.createElement("tr");
                fila.innerHTML = `
                    <td>${producto.nombre}</td>
                    <td>$${producto.precio.toFixed(2)}</td>
                    <td>${producto.localidad}</td>
                    <td><button class="eliminar-btn" data-id="${producto.id}">Eliminar</button></td>
                `;
                tablaBody.appendChild(fila);
            });

            document.querySelectorAll(".eliminar-btn").forEach(button => {
                button.addEventListener("click", function () {
                    const productoId = this.getAttribute("data-id");
                    eliminarProducto(productoId);
                });
            });
        })
        .catch(error => console.error("❌ Error al actualizar la tabla:", error));
    }

    function eliminarProducto(productoId) {
        const confirmacion = confirm("¿Estás seguro de que deseas eliminar este producto?");
        if (!confirmacion) return;

        fetch(`${PRODUCTO_DELETE_URL}${productoId}/`, {
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
            console.log("🗑️ Producto eliminado:", data);
            alert(data.mensaje || "Producto eliminado correctamente");
            actualizarTablaProductos();
        })
        .catch(error => console.error("🚨 Error al eliminar producto:", error));
    }

    actualizarTablaProductos();

    function mostrarMensaje(mensaje, esError = false) {
        const mensajeElemento = document.getElementById("mensaje");
        if (!mensajeElemento) return;
    
        mensajeElemento.textContent = mensaje;
        mensajeElemento.style.color = esError ? "red" : "green";
    
        setTimeout(() => {
            mensajeElemento.textContent = "";
        }, 3000);
    }
    
});
