document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("presupuestoForm");

    form.addEventListener("submit", function (event) {
        let valid = true;

        // Validación de nombre
        const nombre = document.getElementById("nombre");
        const errorNombre = document.getElementById("error-nombre");
        if (!/^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]{1,15}$/.test(nombre.value)) {
            errorNombre.style.display = "block";
            valid = false;
        } else {
            errorNombre.style.display = "none";
        }

        // Validación de apellidos
        const apellidos = document.getElementById("apellidos");
        const errorApellidos = document.getElementById("error-apellidos");
        if (!/^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]{1,40}$/.test(apellidos.value)) {
            errorApellidos.style.display = "block";
            valid = false;
        } else {
            errorApellidos.style.display = "none";
        }

        // Validación de teléfono
        const telefono = document.getElementById("telefono");
        const errorTelefono = document.getElementById("error-telefono");
        if (!/^\d{9}$/.test(telefono.value)) {
            errorTelefono.style.display = "block";
            valid = false;
        } else {
            errorTelefono.style.display = "none";
        }

        // Validación de email
        const email = document.getElementById("email");
        const errorEmail = document.getElementById("error-email");
        if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email.value)) {
            errorEmail.style.display = "block";
            valid = false;
        } else {
            errorEmail.style.display = "none";
        }

        // Verificación de aceptación de condiciones
        const condiciones = document.getElementById("condiciones");
        if (!condiciones.checked) {
            alert("Debe aceptar las condiciones antes de enviar el formulario.");
            valid = false;
        }

        if (!valid) {
            event.preventDefault(); // Evita el envío si hay errores
        }
    });

    // Cálculo dinámico del presupuesto
    function calcularPresupuesto() {
        let total = parseFloat(document.getElementById("producto").value);
        const plazo = parseInt(document.getElementById("plazo").value) || 0;
        
        // Aplicar descuento según plazo
        if (plazo >= 6) total *= 0.9; // 10% de descuento si el plazo es 6 meses o más

        // Sumar extras
        document.querySelectorAll("input[type='checkbox']:checked").forEach((checkbox) => {
            if (checkbox.id !== "condiciones") {
                total += parseFloat(checkbox.value);
            }
        });

        document.getElementById("total").textContent = total.toFixed(2);
    }

    document.getElementById("producto").addEventListener("change", calcularPresupuesto);
    document.getElementById("plazo").addEventListener("input", calcularPresupuesto);
    document.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
        checkbox.addEventListener("change", calcularPresupuesto);
    });

    form.addEventListener("reset", function () {
        setTimeout(() => {
            document.getElementById("total").textContent = "0";
            document.querySelectorAll(".error").forEach(error => error.style.display = "none");
        }, 100);
    });
});