let btnscrap = document.getElementById('scrap-profile')

btnscrap.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (tab !== null) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: scrapingProfile,
    });
  }
})

const scrapingProfile = () => {
  const wait = function (milliseconds) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, milliseconds);
    });
  };

  // Declaramos variable de Scroll.
  let scrollerId;
  // Función de iniciar el proceso de scroll.
  function StartScroll() {
    let id = setInterval(function () {
      window.scrollBy(0, 20); // Mover el scroll en dirección al eje X o eje Y.
      if(window.innerHeight + window.scrollY == document.body.offsetHeight){
        StopScroll(); // Cuando llegue a final de la pagina, se activara el if para parar el proceso.
      }
    },10); // Cada cierto intervalo de tiempo se activa el window.scrollby.
    return id;
  }
  // Función de parar el proceso de scroll.
  function StopScroll() {
    clearInterval(scrollerId); // Limpia el setInterval.
  }
  // Inicia la Función de iniciar el proceso de scroll.
  scrollerId = StartScroll();
  // En caso de que no pare se preciona una tecla para detener el proceso de scroll.
  document.body.addEventListener('keypress', function(event){
    if(event.key.charCodeAt()) {
      StopScroll();
    }
  });

  // Se ubica la posición del Texto "Alfredo Vazquez" y se inserta en una variable "name".
  const elementNameProfile = document.querySelector("div.display-flex.mt2 ul li")
  const name = elementNameProfile ? elementNameProfile.innerText : '';
  // Se ubica la posición del Texto "Desarrollador full-stack en TGA Auditores y Consultores" y se inserta en una variable "title".
  const elementNameTitle = document.querySelector("div.display-flex.mt2 h2")
  const title = elementNameTitle ? elementNameTitle.innerText : '';
  // Se ubica el desplegable del Texto "Información de contacto", valida mediante if y se hace un click.
  const elementMoreInfo = document.querySelector("div.display-flex.mt2 > div.flex-1.mr5 a[data-control-name='contact_see_more']")
  if (elementMoreInfo) elementMoreInfo.click();
  // Una espera de 1seg para cargar información.
  wait(1000).then(() => {
    // Se ubica la posición del Texto "Linkedin" y se inserta en una variable "linkeIn".
    const elementLinkedIn = document.querySelector("section[class='pv-contact-info__contact-type ci-vanity-url'] div a")
    const linkedIn = elementLinkedIn ? elementLinkedIn.innerText : '';
    // Se ubica el button de cerrar, valida mediante if y se hace un click.
    const elementClose = document.querySelector("li-icon[class='artdeco-button__icon']")
    if (elementClose) elementClose.click();
    // Se ubica el desplegable del Texto "ver más", valida mediante if y se hace un click.
    const elementMoreResume = document.getElementById('line-clamp-show-more-button')
    if (elementMoreResume) elementMoreResume.click();
    // Se ubica la posición del Texto "Hola, mi nombre..." y se inserta en una variable "resume".
    const elementResume = document.querySelector('section.pv-about-section > p')
    const resume = elementResume ? elementResume.innerText : '';
    
    // Seleccionamos toda la sección de experiencia.    
    const elementExperienceSection = document.querySelector('section#experience-section ul')
    // Variable para almacenar los datos de experiencia.
    let experience = [];
    // Se valida mediante un if la información antes de proseguir.
    if(elementExperienceSection){ 
      let cont = elementExperienceSection.childElementCount; // variable para contar el numero de datos disponibles en la sección de experiencia.
      for (let i = 0; i < cont; i++) {
        // Se ubica la posición del cargo según la posición y se inserta en una variable "cargo".
        const elementCargo =  elementExperienceSection.children[i].querySelector('h3.t-16.t-black.t-bold');
        const cargo = elementCargo ? elementCargo.innerText : '';
        // Se ubica la posición del duración según la posición y se inserta en una variable "duration".
        const elementWorkTime =  elementExperienceSection.children[i].querySelector('h4.pv-entity__date-range.t-14.t-black--light.t-normal span:not([class])'); // Otro uso ":not(.completed):not(.selected)"
        const workTime = elementWorkTime ? elementWorkTime.innerText : '';  
        // Se introduce todos los datos dentro de experience.
        experience.push({cargo, workTime});
      }
    }

      
    const elementEducationSection = document.querySelector('section#education-section ul')
    let education = [];
    if(elementEducationSection){ 
      let cont = elementEducationSection.childElementCount; 
      for (let i = 0; i < cont; i++) {

        const elementInstitute =  elementEducationSection.children[i].querySelector('h3.pv-entity__school-name');
        const institute = elementInstitute ? elementInstitute.innerText : '';
        
        const elementStudyTime =  elementEducationSection.children[i].querySelector('p.pv-entity__dates.t-14.t-black--light.t-normal span:not([class])');
        const studyTime = elementStudyTime ? elementStudyTime.innerText : '';  
        
        education.push({institute, studyTime});
      }
    }
  
  console.log({ name, title, resume, linkedIn, experience, education })
  })
}


