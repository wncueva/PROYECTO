class GroupMembers extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.container = document.createElement('div');
        this.shadowRoot.appendChild(this.container);
        const style = document.createElement('style');
        style.innerHTML = `
            table {
                width: 100%;
                border-collapse: collapse;
                margin: 1em 0;
                font-family: Arial, sans-serif;
                background-color: #fff;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                border-radius: 8px;
                overflow: hidden;
            }
            th {
                background-color: #4CAF50; 
                color: white;
                padding: 12px 15px;
                text-align: left;
                font-size: 1em;
            }
            td {
                padding: 12px 15px;
                text-align: left;
                font-size: 0.9em;
                color: #333;
                border-bottom: 1px solid #ddd; 
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
            .error {
                color: red;
                font-weight: bold;
                margin-top: 1em;
                text-align: center;
            }
        `;
        this.shadowRoot.appendChild(style);
    }

    connectedCallback() {
        this.apiUrl = 'http://localhost:8001/miembros'; 
        this.fetchData();
    }

   
    fetchData = async () => {
        try {
            const response = await fetch(this.apiUrl);
            const data = await response.json();
            console.log("Datos recibidos en el frontend:", data);
            this.render(data);
        } catch (error) {
            console.error("Error al cargar los datos", error);
            this.container.innerHTML = `<p class="error-alert">Error al cargar los datos</p>`;
        }
    };

    
    render = (miembros) => {
        if (miembros.length === 0) {
            this.container.innerHTML = `<p class="empty-alert">No hay miembros en los grupos</p>`;
            return;
        }

        let listHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Nombre del Usuario</th>
                        <th>Nombre del Grupo</th>
                    </tr>
                </thead>
                <tbody>
        `;

        miembros.forEach(miembro => {
            listHTML += `
                <tr>
                    <td>${miembro.usuario}</td>
                    <td>${miembro.grupo}</td>
                </tr>
            `;
        });

        listHTML += `</tbody></table>`;
        this.container.innerHTML = listHTML;
    };
}

window.customElements.define('member-list', GroupMembers);
