class FooterComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                footer {
                    text-align: center;
                    padding: 1em;
                    background: #333;
                    color: white;
                    position: relative;
                    width: 100%;
                    height: auto; 
                    box-sizing: border-box;
                }

                .container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                }

                .content {
                    margin-bottom: 1em; 
                }

                p {
                    margin: 0;
                    font-size: 1em;
                }
                @media (max-width: 768px) {
                    footer {
                        padding: 1em;
                    }

                    p {
                        font-size: 0.9em;
                    }
                }

                @media (max-width: 480px) {
                    footer {
                        padding: 0.8em;
                    }

                    p {
                        font-size: 0.8em;
                    }
                }
            </style>
            <div class="container">
                <div class="content">
                    <slot name="table"></slot>
                </div>
                <footer>
                    <p>&copy; 2024 Proyecto Red Social</p>
                </footer>
            </div>
        `;
        shadow.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('footer-component', FooterComponent);
