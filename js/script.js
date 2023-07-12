

        // inicio gestor de reservas ***********************
        // Función para obtener todas las reservas y mostrarlas en la tabla
        function mostrarReservas() {
            fetch('http://carlosscott2.pythonanywhere.com/reservas')
                .then(response => response.json())
                .then(data => {
                    const reservasTable = document.getElementById('reservasTable');
                    // Limpiar la tabla
                    while (reservasTable.rows.length > 1) {
                        reservasTable.deleteRow(1);
                    }
                    // Llenar la tabla con los datos de las reservas
                    data.forEach(reserva => {
                        const row = reservasTable.insertRow();
                        row.insertCell().textContent = reserva.id;
                        row.insertCell().textContent = reserva.nombre;
                        row.insertCell().textContent = reserva.apellido;
                        row.insertCell().textContent = reserva.tipo_documento;
                        row.insertCell().textContent = reserva.nacionalidad;
                        row.insertCell().textContent = reserva.destino;
                        row.insertCell().textContent = reserva.fecha_inicio;
                        row.insertCell().textContent = reserva.fecha_final;
                        row.insertCell().textContent = reserva.cantidad_pasajeros;
                        row.insertCell().textContent = reserva.email;
                        row.insertCell().textContent = reserva.telefono;
                        const accionesCell = row.insertCell();
                        accionesCell.innerHTML = `<button class="modificar-btn" onclick="mostrarModificarReserva(${reserva.id})">Modificar</button> <button class="eliminar-btn" onclick="eliminarReserva(${reserva.id})">Eliminar</button>`;
                    });
                })
                .catch(error => console.log(error));
        }

        // Función para mostrar una alerta con el mensaje correspondiente
        function mostrarMensajeReserva(mensaje) {
            alert(mensaje);
        }

        // Función para crear una reserva
        function crearReserva(event) {
            event.preventDefault();

            const nombre = document.getElementById('nombre').value;
            const apellido = document.getElementById('apellido').value;
            const tipoDocumento = document.getElementById('tipo_documento').value;
            const nacionalidad = document.getElementById('nacionalidad').value;
            const destino = document.getElementById('destino').value;
            const fechaInicio = document.getElementById('fecha_inicio').value;
            const fechaFinal = document.getElementById('fecha_final').value;
            const cantidadPasajeros = document.getElementById('cantidad_pasajeros').value;
            const email = document.getElementById('email').value;
            const telefono = document.getElementById('telefono').value;

            fetch('http://carlosscott2.pythonanywhere.com/reservas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre: nombre,
                    apellido: apellido,
                    tipo_documento: tipoDocumento,
                    nacionalidad: nacionalidad,
                    destino: destino,
                    fecha_inicio: fechaInicio,
                    fecha_final: fechaFinal,
                    cantidad_pasajeros: cantidadPasajeros,
                    email: email,
                    telefono: telefono
                })

            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    mostrarReservas();
                    mostrarMensajeReserva('Reserva creada exitosamente');
                    document.getElementById('crearReservaForm').reset();
                })
                .catch(error => console.log(error));
        }

        // Función para eliminar una reserva
        function eliminarReserva(id) {
            if (confirm('¿Estás seguro de eliminar esta reserva?')) {
                fetch(`http://carlosscott2.pythonanywhere.com/reservas/${id}`, {
                    method: 'DELETE'
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        mostrarReservas();
                        mostrarMensajeReserva('Reserva eliminada exitosamente');
                    })
                    .catch(error => console.log(error));
            }
        }

        // Función para cargar los datos de una reserva en el formulario de modificación
        function mostrarModificarReserva(id) {
            fetch(`http://carlosscott2.pythonanywhere.com/reservas/${id}`)
                .then(response => response.json())
                .then(data => {
                    const reserva = data;
                    document.getElementById('modificarId').value = reserva.id;
                    document.getElementById('modificarNombre').value = reserva.nombre;
                    document.getElementById('modificarApellido').value = reserva.apellido;
                    document.getElementById('modificarTipoDocumento').value = reserva.tipo_documento;
                    document.getElementById('modificarNacionalidad').value = reserva.nacionalidad;
                    document.getElementById('modificarDestino').value = reserva.destino;
                    document.getElementById('modificarFechaInicio').value = reserva.fecha_inicio;
                    document.getElementById('modificarFechaFinal').value = reserva.fecha_final;
                    document.getElementById('modificarCantidadPasajeros').value = reserva.cantidad_pasajeros;
                    document.getElementById('modificarEmail').value = reserva.email;
                    document.getElementById('modificarTelefono').value = reserva.telefono;
                    // Mostrar la sección de modificar reserva
                    const modificarReservaSection = document.getElementById('modificarReservaSection');
                    modificarReservaSection.classList.remove('hidden');
                    // Establecer el título con el ID de la reserva a modificar
                    const tituloModificarReserva = document.getElementById('tituloModificarReserva');
                    tituloModificarReserva.textContent = `Modificar Reserva ID: ${reserva.id}`;

                    // Scroll hacia la sección de modificar reserva
                    modificarReservaSection.scrollIntoView({ behavior: 'smooth' });
                })
                .catch(error => console.log(error));
        }

        // Función para modificar una reserva
        function modificarReserva(event) {
            event.preventDefault();

            const id = document.getElementById('modificarId').value;
            const nombre = document.getElementById('modificarNombre').value;
            const apellido = document.getElementById('modificarApellido').value;
            const tipoDocumento = document.getElementById('modificarTipoDocumento').value;
            const nacionalidad = document.getElementById('modificarNacionalidad').value;
            const destino = document.getElementById('modificarDestino').value;
            const fechaInicio = document.getElementById('modificarFechaInicio').value;
            const fechaFinal = document.getElementById('modificarFechaFinal').value;
            const cantidadPasajeros = document.getElementById('modificarCantidadPasajeros').value;
            const email = document.getElementById('modificarEmail').value;
            const telefono = document.getElementById('modificarTelefono').value;

            fetch(`http://carlosscott2.pythonanywhere.com/reservas/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre: nombre,
                    apellido: apellido,
                    tipo_documento: tipoDocumento,
                    nacionalidad: nacionalidad,
                    destino: destino,
                    fecha_inicio: fechaInicio,
                    fecha_final: fechaFinal,
                    cantidad_pasajeros: cantidadPasajeros,
                    email: email,
                    telefono: telefono
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    mostrarReservas();
                    mostrarMensajeReserva('Reserva modificada exitosamente');

                    // Ocultar la sección de modificar reserva
                    const modificarReservaSection = document.getElementById('modificarReservaSection');
                    modificarReservaSection.classList.add('hidden');

                    // Limpiar los campos del formulario
                    document.getElementById('modificarReservaForm').reset();

                    // Actualizar la información de la reserva en la sección de buscar reserva por ID
                    buscarReservaPorId();
                })
                .catch(error => console.log(error));
        }

        // Función para mostrar la sección de crear reserva y ocultar las demás secciones
        function mostrarCrearReserva() {
            document.getElementById('crearReservaSection').classList.remove('hidden');
            document.getElementById('reservasCreadasSection').classList.add('hidden');
            document.getElementById('consultarReservaSection').classList.add('hidden');
            document.getElementById('modificarReservaSection').classList.add('hidden');
        }

        // Función para mostrar la sección de reservas creadas y ocultar las demás secciones
        function mostrarReservasCreadas() {
            document.getElementById('crearReservaSection').classList.add('hidden');
            document.getElementById('reservasCreadasSection').classList.remove('hidden');
            document.getElementById('consultarReservaSection').classList.add('hidden');
            document.getElementById('modificarReservaSection').classList.add('hidden');
            mostrarReservas();
        }

        // Función para mostrar la sección de consultar reserva por ID y ocultar las demás secciones
        function mostrarConsultarReserva() {
            document.getElementById('crearReservaSection').classList.add('hidden');
            document.getElementById('reservasCreadasSection').classList.add('hidden');
            document.getElementById('consultarReservaSection').classList.remove('hidden');
            document.getElementById('modificarReservaSection').classList.add('hidden');
        }

        // Función para mostrar todas las funciones y ocultar el botón "Reservar"
        function mostrarFunciones() {
            document.getElementById('menuSuperior').classList.remove('hidden');
            document.getElementById('reservasCreadasSection').classList.add('hidden');
            document.getElementById('consultarReservaSection').classList.add('hidden');
            document.getElementById('modificarReservaSection').classList.add('hidden');
        }

        // Función para buscar una reserva por ID y mostrarla en la tabla
        function buscarReservaPorId() {
            const idReserva = document.getElementById('idReserva').value;

            fetch(`http://carlosscott2.pythonanywhere.com/reservas/${idReserva}`)
                .then(response => response.json())
                .then(data => {
                    const reserva = data;
                    const resultadoReserva = document.getElementById('resultadoReserva');
                    if (reserva) {
                        resultadoReserva.innerHTML = `
                    <h3>Reserva encontrada:</h3>
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Tipo de Documento</th>
                            <th>Nacionalidad</th>
                            <th>Destino</th>
                            <th>Fecha de Inicio</th>
                            <th>Fecha Final</th>
                            <th>Cantidad de Pasajeros</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Acciones</th>
                        </tr>
                        <tr>
                            <td>${reserva.id}</td>
                            <td>${reserva.nombre}</td>
                            <td>${reserva.apellido}</td>
                            <td>${reserva.tipo_documento}</td>
                            <td>${reserva.nacionalidad}</td>
                            <td>${reserva.destino}</td>
                            <td>${reserva.fecha_inicio}</td>
                            <td>${reserva.fecha_final}</td>
                            <td>${reserva.cantidad_pasajeros}</td>
                            <td>${reserva.email}</td>
                            <td>${reserva.telefono}</td>
                            <td>
                                <button class="modificar-btn" onclick="mostrarModificarReserva(${reserva.id})">Modificar</button>
                                <button class="eliminar-btn" onclick="eliminarReserva(${reserva.id})">Eliminar</button>
                            </td>
                        </tr>
                    </table>
                    `;
                    } else {
                        resultadoReserva.innerHTML = '<p>No se encontró ninguna reserva con el ID especificado.</p>';
                    }
                })
                .catch(error => console.log(error));
        }

        // Event listeners
        document.getElementById('crearReservaForm').addEventListener('submit', crearReserva);
        document.getElementById('modificarReservaForm').addEventListener('submit', modificarReserva);
        document.getElementById('reservasCreadasSection').addEventListener('click', function (event) {
            if (event.target.tagName === 'BUTTON') {
                event.preventDefault();
            }
        });
        document.getElementById('consultarReservaForm').addEventListener('submit', function (event) {
            event.preventDefault();
            buscarReservaPorId();
        });
        // Mostrar todas las funciones al cargar la página
        mostrarFunciones();
// final gestor de reservas ***********************
   