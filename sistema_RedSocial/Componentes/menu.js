class MenuComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                nav {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: #333;
                    color: white;
                    padding: 1em;
                    width: 100%;
                    box-sizing: border-box;
                    flex-wrap: wrap;
                }
                a {
                    color: white;
                    margin: 0 1em;
                    text-decoration: none;
                    cursor: pointer;
                    font-size: 1.2em;
                    text-align: center;
                    padding: 0.5em 1em;
                    border-radius: 8px;
                    transition: background-color 0.3s ease, color 0.3s ease;
                }
                a:hover {
                    background-color: white;
                    color: #333;
                    border-radius: 16px;
                }

              
                @media (max-width: 768px) {
                    nav {
                        padding: 0.8em;
                    }

                    a {
                        font-size: 1em;
                        margin: 0.5em;
                    }
                }

                @media (max-width: 480px) {
                    nav {
                        padding: 0.5em;
                        flex-direction: column;
                        align-items: flex-start;
                    }

                    a {
                        font-size: 1em;
                        margin: 0.5em 0;
                        width: 100%; 
                        text-align: left;
                    }
                }
            </style>
            <nav>
                <a id="home-link">Inicio</a>
                <a id="table-link">Listado</a>
                <a id="grupos-link">Grupos</a>
                <a id="member-link">Integrantes</a>
                <a id="acerca-link">Acerca de</a>
            </nav>
        `;
        shadow.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.shadowRoot.querySelector('#home-link').addEventListener('click', () => this.navigate('home'));
        this.shadowRoot.querySelector('#table-link').addEventListener('click', () => this.navigate('table'));
        this.shadowRoot.querySelector('#grupos-link').addEventListener('click', () => this.navigate('grupos'));
        this.shadowRoot.querySelector('#member-link').addEventListener('click', () => this.navigate('member'));
        this.shadowRoot.querySelector('#acerca-link').addEventListener('click', () => this.navigate('acerca'));
    }

    navigate(page) {
        const mainComponent = document.querySelector('main-component');
        mainComponent.innerHTML = ''; // Limpiar el contenido previo

        switch (page) {
            case 'home':
                mainComponent.innerHTML = '<home-component></home-component>';
                break;
            case 'acerca':
                mainComponent.innerHTML = '<acerca-profile></acerca-profile>';
                break;
            case 'table':
                mainComponent.innerHTML = '<custom-table></custom-table>';
                break;
            case 'member':
                mainComponent.innerHTML = '<member-list></member-list>';
                break;
            case 'grupos':
                mainComponent.innerHTML = '<group-list></group-list>';
                break;
        }
    }
}

customElements.define('menu-component', MenuComponent);
