<h4 align="center"> 
	🚧 API Restful Gerenciamento de Eventos 🚧
</h4>

<p align="center">
	<img alt="Status Concluído" src="https://img.shields.io/badge/STATUS-CONCLU%C3%8DDO-brightgreen">
</p>

<p align="center">
 <a href="#-sobre-o-projeto">Sobre</a> •
 <a href="#-funcionalidades">Funcionalidades</a> •
 <a href="#-layout">Layout</a> • 
 <a href="#-tecnologias">Tecnologias</a> • 
 <a href="#-licença">Licença</a>
</p>

## 💻 Sobre o projeto
Esta API Restful foi desenvolvida para gerenciar eventos e ingressos de forma completa e segura. O projeto foi criado com fins de estudo, visando aprimorar habilidades em modelagem de dados com MongoDB, segurança com JWT e validação de dados com Zod.

A API permite o cadastro, atualização e remoção de eventos, bem como a emissão e validação de ingressos digitais, proporcionando uma base robusta para aplicações de gerenciamento de eventos.

## ⚙️ Funcionalidades
### Cadastro e Gerenciamento de Eventos
- **Criação, atualização e remoção de eventos:**  
  Permite cadastrar eventos com informações básicas, como nome, data, local, descrição, imagens e categoria.
- **Definição de Ingressos:**  
  Configuração de diferentes tipos de ingressos (ex.: pista, VIP) com preços e quantidades.

### Sistema de Ingressos
- **Emissão e Armazenamento:**  
  Geração de ingressos digitais vinculados a cada evento.
- **Processos de Compra e Cancelamento:**  
  Controle de estoque para evitar overbooking, com atualização automática após cada transação.
- **Geração de QR Codes:**  
  Criação de QR Codes dinâmicos para validação rápida e segura na entrada dos eventos.

### Autenticação e Autorização
- **Controle de Acesso:**  
  Diferenciação entre administradores (que podem criar/editar eventos) e usuários (que compram ingressos).
- **Segurança:**  
  Uso de tokens JWT para proteger as rotas da API.

### Notificações em Tempo Real
- **WebSockets:**  
  Comunicação em tempo real para informar os usuários sobre atualizações, mudanças de última hora ou a validação de ingressos na entrada.

## 📌 Estrutura Técnica e Arquitetura

### Back-end
- **Node.js com TypeScript:**  
  Garante tipagem estática e robustez na manutenção e evolução do código.
- **Express:**  
  Framework utilizado para criar a estrutura de rotas e middlewares da API.
- **Zod:**  
  Ferramenta para validação de dados de entrada, assegurando que as requisições estejam conformes os esquemas definidos.

### Banco de Dados
- **MongoDB:**  
  Escolhido para armazenar dados de eventos e ingressos, dada sua flexibilidade e escalabilidade.  

### Infraestrutura e Integrações
- **Geração de QR Code:**  
  Utilização de bibliotecas específicas para criar QR Codes dinâmicos para cada ingresso.

---


## 📝 Licença

Feito com ❤️ por Davi Conrado 👋🏽 [Entre em contato!](https://www.linkedin.com/in/daviconrado/)
