'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

// Only add event listeners if elements exist
if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// Only run filter code if elements exist
if (selectItems.length > 0 && selectValue) {
  // add event in all select items
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {

      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);

    });
  }
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}



// Portfolio modal variables
const projectItems = document.querySelectorAll('.project-item');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close]');
const overlay = document.querySelector('[data-overlay]');
const modalTitle = document.querySelector('.modal-title');
const modalImg = document.querySelector('.modal-img');
const modalText = document.querySelector('.modal-text');
const modalTechnologies = document.querySelector('.modal-technologies');
const modalLinks = document.querySelector('.modal-links');

// Project data - populate this with your project information
const projectsData = [
  {
    id: 'wander',
    title: 'Wander - Travel Planning Website',
    img: './assets/images/wander.png',
    description: 'Wander helps users create personalized travel itineraries by extracting destination details from TikTok videos. Discover new places, save your favorites, and seamlessly plan your perfect trip with ease.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Vue.js', 'Bootstrap', 'Vercel' , 'Flask', 'Firebase', 'Docker', 'Google Cloud Registry', 'Google Places API'],
    liveLink: 'https://wander-g8t9.vercel.app/',
    codeLink: 'https://github.com/JonOng2002/Wander'
  },
  {
    id: 'rentease',
    title: 'RentEase - Rental Management System',
    img: './assets/images/rentease.png',
    description: 'RentEase allows users to rent items to and from each other in a marketplace style - Think: Carousell but for renting items instead of selling',
    technologies: ['Vue.js', 'Flask', 'Tailwind CSS', 'Firebase', 'Docker', 'Kong', 'GraphQL'],
    codeLink: 'https://github.com/jiaxinwong19/RentEase'
  },
  {
    id: 'heartcode',
    title: 'HeartCode - Substance Abuse Awareness',
    img: './assets/images/heartcode.png',
    description: 'HeartCode is a website dedicated to raising awareness about substance abuse through education, real stories, and support resources for youth and communities.',
    technologies: ['React', 'Tailwind CSS', 'ShadCN', 'Aceternity', 'Clerk'],
    liveLink: 'https://heartcode-2024.vercel.app/?vercelToolbarCode=AD1NeisXjuVeESF',
    codeLink: 'https://github.com/leecfryan/heartcode_2024'
  },
  {
    id: 'java',
    title: 'Parade Card Game',
    img: './assets/images/java.png',
    description: '"Parade" is a Java-based terminal game that faithfully recreates the strategic card game experience—now with multiplayer support! Using WebSockets, players can connect to the same server and compete in real-time from separate terminals. With turn-based mechanics and live game state updates, this project brings interactive, networked gameplay to the command line.',
    technologies: ['Java', 'gradle', 'SLF4J', 'Logback', 'JLine', 'JAnsi', 'JUnit 5', 'WebSocket'],
    codeLink: 'https://github.com/weich00n/CS102-Project'
  },
  // Add more projects as needed
];

// Add click event to project items
projectItems.forEach((item, index) => {
  item.addEventListener('click', function(event) {
    event.preventDefault();
    
    // Find project data
    const projectId = this.querySelector('.project-title').textContent.split(' ')[0].toLowerCase();
    const project = projectsData.find(p => p.id === projectId) || projectsData[index];
    
    // Populate modal with project data
    modalTitle.textContent = project.title;
    
    // Hide the image wrapper
    document.querySelector('.modal-img-wrapper').style.display = 'none';
    
    modalText.textContent = project.description;
    
    // Add technologies
    modalTechnologies.innerHTML = '';
    project.technologies.forEach(tech => {
      const li = document.createElement('li');
      li.textContent = tech;
      modalTechnologies.appendChild(li);
    });
    
    // Add links
    modalLinks.innerHTML = '';
    if (project.liveLink) {
      modalLinks.innerHTML += `
        <a href="${project.liveLink}" class="modal-link-btn" target="_blank">
          <ion-icon name="globe-outline"></ion-icon>
          Live Demo
        </a>
      `;
    }
    if (project.codeLink) {
      modalLinks.innerHTML += `
        <a href="${project.codeLink}" class="modal-link-btn" target="_blank">
          <ion-icon name="logo-github"></ion-icon>
          View Code
        </a>
      `;
    }
    
    // Show modal
    modalContainer.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  });
});

// Close modal when clicking the close button or overlay
modalCloseBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

function closeModal() {
  modalContainer.classList.remove('active');
  document.body.style.overflow = ''; // Re-enable scrolling
}