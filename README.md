# ADOTA PET

## 👥 Integrantes

- Bianca Vitoria - RM5556270
- Guilherme Camargo - RM555166
- Icaro Albuquerque - RM555161

## 📱 Screenshots do Aplicativo

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="assets/BannerAPP.png" width="400px" alt="Tela 1"/>
      </td>
      <td align="center">
        <img src="assets/InicioAPP.png" width="400px" alt="Tela 2"/>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img src="assets/FormAPP.png" width="400px" alt="Tela 3"/>
      </td>
      <td align="center">
        <img src="assets/DicasAPP.png" width="400px" alt="Tela 4"/>
      </td>
    </tr>
  </table>
</div>

## 📝 Descrição

O Adota Pet é um aplicativo desenvolvido para facilitar o processo de adoção de animais de estimação. Com uma interface intuitiva e amigável, o app conecta pessoas interessadas em adotar com animais que precisam de um lar amoroso. 

Além de apresentar pets disponíveis para adoção, o aplicativo também oferece dicas importantes sobre cuidados com animais e o processo de adoção responsável, ajudando os futuros tutores a se prepararem adequadamente para essa nova fase.

## 🔧 API

O aplicativo utiliza a API do Petfinder para obter dados dos animais disponíveis para adoção. A API fornece:

- Lista de animais disponíveis para adoção
- Informações detalhadas sobre cada pet (raça, idade, gênero, etc.)
- Fotos dos animais
- Localização dos pets
- Status de adoção

A integração com a API é feita através de autenticação OAuth2, garantindo acesso seguro aos dados. O aplicativo consome os seguintes endpoints:

- `/animals` - Lista de animais disponíveis
- `/animals/{id}` - Detalhes de um animal específico
- `/types` - Tipos de animais disponíveis
- `/types/{type}/breeds` - Raças disponíveis por tipo

## ✨ Funcionalidades

- Visualização de pets disponíveis para adoção
- Formulário de interesse em adoção
- Dicas e orientações sobre cuidados com animais
- Processo simplificado de adoção
- Informações detalhadas sobre cada pet
