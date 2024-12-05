class HomeComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                main {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: #f5f5f5;
                    max-width: 100%;
                    margin: 0 auto;
                    width: 100%;
                    height: 100%;
                    padding: 1em;
                    box-sizing: border-box;
                }

                img {
                    max-width: 80%;
                    max-height: 80%;
                    border-radius: 8px;
                    width: 50%;
                }

              
                @media (max-width: 768px) {
                    img {
                        width: 70%; 
                    }
                }

                @media (max-width: 480px) {
                    img {
                        width: 90%;  
                    }
                }
            </style>
            <main>
                <img src="styles/imagenes/inicio.jpg" alt="Main Image" id="main-image">
            </main>
        `;
        shadow.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('home-component', HomeComponent);
