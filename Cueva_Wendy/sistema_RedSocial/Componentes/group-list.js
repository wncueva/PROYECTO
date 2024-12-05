class GroupList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.container = document.createElement('div');
        this.estilo = document.createElement('style');
        this.estilo.textContent = `
            table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
                font-size: 16px;
                text-align: left;
                background-color: #fff;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                border-radius: 8px;
                overflow: hidden;
            }
            th, td {
                padding: 12px 15px;
                border-bottom: 1px solid #ddd;
            }
            th {
                background-color: #4CAF50;
                color: white;
                font-size: 1em;
            }
            td {
                font-size: 0.9em;
                color: #333;
            }
            tr:hover {
                background-color: #f5f5f5;
            }
            tbody tr:nth-child(odd) {
                background-color: #f9f9f9;
            }
            table tbody tr:last-child td {
                border-bottom: none;
            }
            .actions button {
                margin: 0 5px;
                padding: 5px 10px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 0.9em;
            }
            .btn-delete {
                background-color: #f44336;
                color: white;
            }
            .btn-create {
                background-color: #2196F3;
                color: white;
            }
            .btn-create-group {
                background-color: #00BCD4;
                color: white;
            }
            .modal {
                display: none;
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                z-index: 1000;
            }
            .modal.active {
                display: block;
            }
            .overlay {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 999;
            }
            .overlay.active {
                display: block;
            }
        `;

        this.shadowRoot.appendChild(this.estilo);
        this.shadowRoot.appendChild(this.container);
        this.createModal();
    }

    connectedCallback() {
        this.apiUrl = 'http://localhost:8001/grupos';
        this.fetchData(this.apiUrl);
    }
    createModal = () => {
        this.modalOverlay = document.createElement('div');
        this.modalOverlay.classList.add('overlay');

        this.modal = document.createElement('div');
        this.modal.classList.add('modal');
        this.modal.innerHTML = `
            <form id="editForm">
                <h2 id="modalTitle">Crear/Actualizar Grupo</h2>
                <div class="form-group">
                    <label for="edit_nombre_grupo">Nombre del Grupo</label>
                    <input type="text" id="edit_nombre_grupo" required />
                </div>
                <div class="form-group">
                    <label for="edit_descripcion">Descripción</label>
                    <input type="text" id="edit_descripcion" required />
                </div>
                <input type="hidden" id="edit_id_grupo" />
                <button type="submit">Guardar</button>
                <button type="button" id="cancelEdit">Cancelar</button>
            </form>
        `;

        this.shadowRoot.appendChild(this.modalOverlay);
        this.shadowRoot.appendChild(this.modal);

        this.shadowRoot.querySelector('#editForm').addEventListener('submit', this.handleFormSubmit);
        this.shadowRoot.querySelector('#cancelEdit').addEventListener('click', this.closeModal);
    };

    handleCreate = () => {
        this.shadowRoot.querySelector('#edit_id_grupo').value = '';
        this.shadowRoot.querySelector('#edit_nombre_grupo').value = '';
        this.shadowRoot.querySelector('#edit_descripcion').value = '';
        this.shadowRoot.querySelector('#modalTitle').textContent = 'Crear Grupo';
        this.openModal();
    };

    fillFormForEdit = (data) => {
        this.shadowRoot.querySelector('#edit_id_grupo').value = data.id;
        this.shadowRoot.querySelector('#edit_nombre_grupo').value = data.nombre;
        this.shadowRoot.querySelector('#edit_descripcion').value = data.descripcion;
        this.shadowRoot.querySelector('#modalTitle').textContent = 'Actualizar Grupo';
        this.openModal();
    };

    openModal = () => {
        this.modal.classList.add('active');
        this.modalOverlay.classList.add('active');
    };

    closeModal = () => {
        this.modal.classList.remove('active');
        this.modalOverlay.classList.remove('active');
    };

    handleFormSubmit = async (event) => {
        event.preventDefault();
        const id = this.shadowRoot.querySelector('#edit_id_grupo').value;
        const nombre = this.shadowRoot.querySelector('#edit_nombre_grupo').value;
        const descripcion = this.shadowRoot.querySelector('#edit_descripcion').value;

        if (id) {
            await this.updateGroup(id, { nombre_grupo: nombre, descripcion });
        } else {
            await this.createGroup({ nombre_grupo: nombre, descripcion });
        }

        this.closeModal();
    };

    createGroup = async (grupo) => {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(grupo),
            });
            if (response.ok) {
                alert('Grupo creado con éxito');
                this.fetchData(this.apiUrl);
            }
        } catch (error) {
            console.error('Error al crear grupo:', error);
        }
    };

    updateGroup = async (id, grupo) => {
        try {
            const response = await fetch(`${this.apiUrl}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(grupo),
            });
            if (response.ok) {
                alert('Grupo actualizado');
                this.fetchData(this.apiUrl);
            }
        } catch (error) {
            console.error('Error al actualizar grupo:', error);
        }
    };

    fetchData = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            this.render(data);
        } catch (error) {
            console.error("Error al cargar los datos", error);
        }
    };

    render = (grupos) => {
        let tableHTML = `<table><thead><tr><th>ID</th><th>Nombre</th><th>Descripción</th><th>Acciones</th></tr></thead><tbody>`;

        grupos.forEach(grupo => {
            tableHTML += `
                <tr>
                    <td>${grupo.id_grupo}</td>
                    <td>${grupo.nombre_grupo}</td>
                    <td>${grupo.descripcion}</td>
                    <td class="actions">
                        <button class="btn-create" data-id="${grupo.id_grupo}" data-nombre="${grupo.nombre_grupo}" data-descripcion="${grupo.descripcion}">Actualizar</button>
                        <button class="btn-delete" data-id="${grupo.id_grupo}">Eliminar</button>
                        <button class="btn-create-group" data-id="${grupo.id_grupo}">Crear Grupo</button>
                    </td>
                </tr>
            `;
        });

        tableHTML += `</tbody></table>`;
        this.container.innerHTML = tableHTML;
        this.container.querySelectorAll('.btn-create-group').forEach(button => {
            button.addEventListener('click', () => this.handleCreate());
        });

        this.container.querySelectorAll('.btn-create').forEach(button => button.addEventListener('click', () => this.fillFormForEdit(button.dataset)));
    };
}

window.customElements.define('group-list', GroupList);
