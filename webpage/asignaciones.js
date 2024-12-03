/* let main = document.querySelector('.main');
let section = document.querySelector('.inicio');
let asignaciones = document.querySelector('.asignaciones')
const lista = document.querySelectorAll('.filter')
function crearTareas() {
  fetch(`./asignaciones.json`)
    .then(response => response.json())  // Convierte la respuesta en JSON
    .then(data => {
      data.forEach((element, index) => {
        section.innerHTML += `
    <article class="${element.clase} articles">
         <div>
           <img src="./images/${element.images[0]}" alt="">
         </div>
         <h3>${element.name}</h3>
         <a href="" class="verTarea " data-index="${index}">Ver asignación</a>
       </article>
   `
        const listaArticles = document.querySelectorAll('.articles');
        let botonesVerTarea = document.querySelectorAll('.verTarea');
        botonesVerTarea.forEach(boton => {
          boton.addEventListener('click', function (event) {
            event.preventDefault();  // Prevenir la acción por defecto del enlace
            let index = event.target.getAttribute('data-index');
            section.classList.add('hidden')
            mostrarTarea(data[index]);
          });
        });
        lista.forEach(filtro => {
          filtro.addEventListener("click", () => {
            const filterClass = filtro.getAttribute("data-filter");
            listaArticles.forEach(article => {
              if (filterClass === 'inicio') {
                article.classList.remove("hidden")
              } else {
                if (article.classList.contains(filterClass)) {
                  article.classList.remove("hidden");
                } else {
                  article.classList.add("hidden");
                }
              }
            })
          })
        })

      });
    })
    .catch(error => console.error('Error al cargar el JSON:', error));
}
 */

let main = document.querySelector('.main');
let section = document.querySelector('.inicio');
let lista = document.querySelectorAll('.filter');
let asignaciones = document.querySelector('.asignaciones')
// Función para crear las tareas
function crearTareas() {
  fetch(`./asignaciones.json`)
    .then(response => response.json()) // Convierte la respuesta en JSON
    .then(data => {
      // Limpiar la sección antes de añadir contenido nuevo
      section.innerHTML = '';

      // Agregar artículos al DOM
      data.forEach((element, index) => {
        section.innerHTML += `
          <article class="${element.clase} articles">
            <div>
              <img src="./images/${element.images[0]}" alt="">
            </div>
            <h3>${element.name}</h3>
            <a href="#" class="verTarea" data-index="${index}">Ver asignación</a>
          </article>
        `;
      });
      // Seleccionar los artículos después de crearlos
      const listaArticles = document.querySelectorAll('.articles');
      

      // Asignar eventos a los filtros
      lista.forEach(filtro => {
        filtro.addEventListener('click', () => {
          const filterClass = filtro.getAttribute('data-filter');

          listaArticles.forEach(article => {
            if (filterClass === 'home') {
              // Mostrar todos los artículos
              article.classList.remove('hidden');
              asignaciones.classList.add('hidden')
              section.classList.remove('hidden')
            } else {
              // Mostrar solo los artículos que coinciden con la clase
              if (article.classList.contains(filterClass)) {
                article.classList.remove('hidden');
                asignaciones.classList.add('hidden')
                section.classList.remove('hidden')
              } else {
                article.classList.add('hidden');
                asignaciones.classList.add('hidden')
                section.classList.remove('hidden')
              }
            }
          });
        });
      });
      let botonesVerTarea = document.querySelectorAll('.verTarea');
      botonesVerTarea.forEach(boton => {
        boton.addEventListener('click', function (event) {
          event.preventDefault();  // Prevenir la acción por defecto del enlace
          let index = event.target.getAttribute('data-index');
          section.classList.add('hidden')
          asignaciones.classList.remove('hidden')
          mostrarTarea(data[index]);
        });
      });

    })
    .catch(error => console.error('Error al cargar el JSON:', error));
}


function mostrarTarea(elemento) {
  let imagenesHTML = '';
  elemento.images.forEach(e => {
    imagenesHTML += `<img src="./images/${e}" alt="">`;
  });

  asignaciones.innerHTML = `
          <a href="./index.html" class="atras">Atrás</a>
      <section class="asig">
        <h2>${elemento.name}</h2>
        <article>
          <div class="texto">
            <p> ${elemento.descripcion}</p>
          </div>
          <div class="imagen">
            <img src="./images/${elemento.images[0]}" alt="">
            <a href="${elemento.link}" target="_blank">Archivos</a>
          </div>
        </article>
      </section>
      <h3>Imagénes</h3>
      <section class="images-rec">
      ${imagenesHTML}
      </section>`
}


crearTareas();

