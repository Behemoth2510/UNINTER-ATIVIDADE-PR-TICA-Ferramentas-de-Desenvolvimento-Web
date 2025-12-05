           let isDarkMode = false;
        
        // Comentário: Função para alternar entre tema claro e escuro.
        // O JS simplesmente adiciona/remove a classe 'dark-mode' do <body>.
        function toggleTheme() {
            const body = document.body;
            body.classList.toggle('dark-mode');
            isDarkMode = body.classList.contains('dark-mode');
            
            // Opcional: Salvar a preferência do usuário (usando localStorage, embora não seja persistência global)
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
            
            // Atualiza o texto do botão
            document.getElementById('theme-toggle').textContent = isDarkMode ? 'Tema Claro' : 'Tema Escuro';
        }
        
        // Comentário: Carregar a preferência de tema ao carregar a página
        document.addEventListener('DOMContentLoaded', () => {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                document.body.classList.add('dark-mode');
                isDarkMode = true;
            }
            // Chama a função para garantir que o texto do botão esteja correto na inicialização
            document.getElementById('theme-toggle').textContent = isDarkMode ? 'Tema Claro' : 'Tema Escuro';
            
            // Configurar o listener de submissão do formulário
            const form = document.getElementById('contact-form');
            form.addEventListener('submit', submitForm);
        });

        // Comentário: Função para mostrar a seção clicada e esconder as outras (Simulação de SPA)
        function navigateTo(event, targetId) {
            event.preventDefault(); // Impede o comportamento padrão do link (#)

            // 1. Oculta todas as seções
            const sections = document.querySelectorAll('main section');
            sections.forEach(section => {
                section.style.display = 'none';
            });

            // 2. Mostra a seção alvo
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.display = 'block';
            }
            
            // 3. Atualiza o estado "ativo" do menu
            const menuLinks = document.querySelectorAll('.menu-links a');
            menuLinks.forEach(link => {
                link.classList.remove('active');
            });
            event.currentTarget.classList.add('active');
        }

        // Função para validar o formato de email
        function isValidEmail(email) {
            // Regex simples para validação básica: algo@algo.algo
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }

        // Função principal de validação e simulação de envio do formulário
        function submitForm(event) {
            event.preventDefault(); // Impede o envio tradicional do formulário (que recarregaria a página)

            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();
            
            let isValid = true;

            // 1. Validação do Nome
            if (nome === "") {
                document.getElementById('error-nome').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('error-nome').style.display = 'none';
            }

            // 2. Validação do E-mail
            if (email === "" || !isValidEmail(email)) {
                document.getElementById('error-email').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('error-email').style.display = 'none';
            }

            // 3. Validação da Mensagem
            if (mensagem === "") {
                document.getElementById('error-mensagem').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('error-mensagem').style.display = 'none';
            }

            // 4. Simulação do Envio
            if (isValid) {
                // Comentário: Limpa os campos do formulário
                document.getElementById('contact-form').reset();
                
                // Comentário: Exibe o modal de confirmação
                openModal();
            }
        }
        
        // Comentário: Funções para controle do Modal
        function openModal() {
            document.getElementById('success-modal').style.display = 'flex';
        }

        function closeModal() {
            document.getElementById('success-modal').style.display = 'none';
        }

        // Fecha o modal se o usuário clicar fora dele
        window.onclick = function(event) {
            const modal = document.getElementById('success-modal');
            if (event.target == modal) {
                closeModal();
            }
        }
