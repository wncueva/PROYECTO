class SocialProfileComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .profile {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    padding: 2em;
                    background: #f5f5f5;
                    border-radius: 16px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    max-width: 300px;
                    margin: 0 auto;
                    font-family: Arial, sans-serif;
                    transition: transform 0.3s ease;
                }

                .center-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                }

                h2 {
                    margin: 0.5em 0;
                    color: #333;
                    font-size: 1.8em;
                }

                .center-content img {
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    object-fit: cover;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }

                .center-content img:hover {
                    transform: scale(1.1);
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
                }

                .profile:hover {
                    transform: scale(1.02);
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
                }

                .info {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    color: #666;
                    font-size: 1em;
                    margin: 0.3em 0;
                    text-align: left;
                }

                .info img {
                    width: 20px;
                    height: 20px;
                    margin-right: 10px;
                    border-radius: 0;
                }

                
                @media (max-width: 768px) {
                    .profile {
                        padding: 1.5em;
                        max-width: 90%;
                    }

                    .center-content img {
                        width: 100px;
                        height: 100px;
                    }

                    h2 {
                        font-size: 1.6em;
                    }

                    .info {
                        font-size: 0.9em;
                    }
                }

                @media (max-width: 480px) {
                    .profile {
                        padding: 1em;
                        max-width: 100%;
                    }

                    .center-content img {
                        width: 80px;
                        height: 80px;
                    }

                    h2 {
                        font-size: 1.4em;
                    }

                    .info {
                        font-size: 0.8em;
                    }

                    .info img {
                        width: 18px;
                        height: 18px;
                    }
                }

            </style>
            <div class="profile">
                
                <div class="center-content">
                    <img src="styles/imagenes/perfil.jpeg" alt="Profile Picture" id="profile-image">
                    <h2>Wendy Cueva</h2>
                </div>
                
                
                <div class="info">
                    <img src="styles/icons/birrete.png" alt="Birrete Icon">
                    <span>Estudiante en la ESPE</span>
                </div>
                <div class="info">
                    <img src="styles/icons/computadora.png" alt="Computadora Icon">
                    <span>Carrera de TI</span>
                </div>
                <div class="info">
                    <img src="styles/icons/manos.png" alt="Manos Icon">
                    <span>Linkedin: Wendy Cueva</span>
                </div>
                <div class="info">
                    <img src="styles/icons/avion.png" alt="Manos Icon">
                    <span>Nacionalidad: Ecuatoriana</span>
                </div>
                <div class="info">
                    <img src="styles/icons/edad.png" alt="Manos Icon">
                    <span>Edad: 22</span>
                </div>
                <div class="info">
                    <img src="styles/icons/mensaje.png" alt="Mensaje Icon">
                    <span>Email: wncueva@espe.edu.ec</span>
                </div>
                <div class="info">
                    <img src="styles/icons/telefono.png" alt="Telefono Icon">
                    <span>Teléfono: 0987362081</span>
                </div>
            </div>
        `;
        shadow.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('acerca-profile', SocialProfileComponent);
