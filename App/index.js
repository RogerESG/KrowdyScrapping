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

  let scrollerId;
  
  function startScroll() {
    let id = setInterval(function () {
      window.scrollBy(0, 20);
      if(window.innerHeight + window.scrollY == document.body.offsetHeight){
        stopScroll();
      }
    },10);
    return id;
  }
  
  function stopScroll() {
    clearInterval(scrollerId);
  }
  
  scrollerId = startScroll();

  document.body.addEventListener('keypress', function(event){
    if(event.key.charCodeAt()) {
      stopScroll();
    }
  });

  
  const elementNameProfile = document.querySelector("div.display-flex.mt2 ul li")
  const name = elementNameProfile ? elementNameProfile.innerText : '';

  const elementNameTitle = document.querySelector("div.display-flex.mt2 h2")
  const title = elementNameTitle ? elementNameTitle.innerText : '';

  const elementMoreInfo = document.querySelector("div.display-flex.mt2 > div.flex-1.mr5 a[data-control-name='contact_see_more']")
  if (elementMoreInfo) elementMoreInfo.click();

  wait(1000).then(() => {
    
    const elementLinkedIn = document.querySelector("section[class='pv-contact-info__contact-type ci-vanity-url'] div a")
    const linkedIn = elementLinkedIn ? elementLinkedIn.innerText : '';
  
    const elementClose = document.querySelector("li-icon[class='artdeco-button__icon']")
    if (elementClose) elementClose.click();
    
    const elementMoreResume = document.getElementById('line-clamp-show-more-button')
    if (elementMoreResume) elementMoreResume.click();
    const elementResume = document.querySelector('section.pv-about-section > p')
    const resume = elementResume ? elementResume.innerText : '';
  
    console.log({ name, title, resume, linkedIn })
    
  })

}
