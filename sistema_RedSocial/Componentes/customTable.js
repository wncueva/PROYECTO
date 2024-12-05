class CustomTableComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
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
            </style>
            <table>
                <thead>
                    <tr>
                        <th>Nombre del Grupo</th>
                        <th>Descripción</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            <div class="error"></div>
        `;
        shadow.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        fetch('http://localhost:8001/grupos') 
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const tbody = this.shadowRoot.querySelector('tbody');
                data.forEach(grupo => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${grupo.nombre_grupo}</td>
                        <td>${grupo.descripcion}</td>
                    `;
                    tbody.appendChild(row);
                });
            })
            .catch(error => {
                const errorDiv = this.shadowRoot.querySelector('.error');
                errorDiv.textContent = `Failed to load data: ${error.message}`;
            });
    }
    
}

customElements.define('custom-table', CustomTableComponent);
