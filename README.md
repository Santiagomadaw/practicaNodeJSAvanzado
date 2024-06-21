# Dashboard de Anuncios - Práctica de Fundamentos de React con Vite y Redux

¡Bienvenido al proyecto de Dashboard de Anuncios! Este proyecto, desarrollado con Vite y React, te ofrece una aplicación de dashboard para gestionar el API de anuncios Nodepop.

## Descripción del Proyecto

El objetivo principal de este proyecto es crear una aplicación de tipo dashboard que actúe como interfaz gráfica para gestionar el API de anuncios Nodepop. El backend de la aplicación utiliza el proyecto [nodepop-api](https://github.com/davidjj76/nodepop-api), mientras que el frontend está desarrollado en React utilizando Vite como herramienta de construcción.

## Backend

El backend de la aplicación está alojado en un servidor local y proporciona una serie de endpoints para la gestión de usuarios y anuncios. Algunos de los endpoints disponibles son:

- **/api/auth/signup**: Permite crear nuevos usuarios.
- **/api/auth/me**: Obtiene la información del usuario autenticado.
- **/api/auth/login**: Permite iniciar sesión y obtener un token de acceso.
- **/api/v1/adverts**: Proporciona un listado de anuncios y permite aplicar diversos filtros.
- **/api/v1/adverts/tags**: Obtiene el listado de tags disponibles.
- **/api/v1/adverts/:id**: Permite obtener información detallada de un anuncio específico y borrarlo si es necesario.

Todos los endpoints bajo `/adverts` requieren autenticación mediante un token proporcionado en el endpoint de login.

## Frontend

El frontend de la aplicación es una Single Page Application desarrollada en React con Vite. Se han implementado diversas rutas para gestionar las diferentes páginas y componentes de la aplicación, como:

- **/login**: Página de inicio de sesión.
- **/adverts**: Página principal de anuncios.
- **/adverts/:id**: Página de detalle de un anuncio.
- **/adverts/new**: Página para crear un nuevo anuncio.
- **/404**: Página de error 404 para rutas inexistentes.
- **/error**: Página de otros errores.

## Funcionalidades Principales

- **LoginPage**: Permite iniciar sesión con email y contraseña.
- **AdvertsPage**: Muestra un listado de anuncios con opción de aplicar filtros.
- **AdvertPage**: Muestra detalles de un anuncio y permite borrarlo.
- **NewAdvertPage**: Permite crear un nuevo anuncio con todos los detalles necesarios.

Además, se ha implementado un componente para el logout cuando el usuario está autenticado.

## Consideraciones Importantes

- **Estilos**: Se han utilizado styled-components para los estilos de la aplicación, proporcionando una forma flexible y eficiente de gestionar los estilos en los componentes de React.
- **Código**: Para asegurar código limpio y bien organizado se ha usado Prettier y PropTypes para una tipificación sólida y segura de las props.

## Nodepop Redux

Se añade Redux a la aplicación inicial, para menejo de estado:

1. **Configuración de store Redux**:
   - **Información sobre la sesión**: Al iniciar la aplicación, se lee la información del token desde el LocalStorage y si existe se almacenará en el store de Redux el estado correspondiente. Al hacer login, se guarda el estado en el store de Redux  y en el Local Storage si se eligió recordar sesión.
   - **Información sobre los anuncios**: El store maneja la obtención de tags disponibles, de anuncios desde el API (listado y detalle), así como la creación y borrado de anuncios.

2. **Acciones y reducers**:
   - Se han creado las acciones y reducers necesarios para gestionar la información de la sesión y los anuncios en el store de Redux.

3. **Conexión de los componentes con el store**:
   - Los componentes se han conectado con el store de Redux utilizando hooks como `useSelector` y `useDispatch`.

4. **Configuración de Redux Dev Tools**:
   - Se ha configurado Redux Dev Tools para simplificar las tareas de debugging de la aplicación.

5. **Testing**:
   - Se han creado tests unitarios para acciones síncronas y asíncronas, reducers, selectores y componentes. Incluyen pruebas con snapshot testing y pruebas que verifican el funcionamiento de componentes que ejecutan acciones del store, mockeando las acciones.
