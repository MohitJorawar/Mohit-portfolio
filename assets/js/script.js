'use strict';

// Element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// Sidebar variables and functionality
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}

// Testimonials modal variables & functionality (retained for layout compatibility)
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  if (modalContainer) modalContainer.classList.toggle("active");
  if (overlay) overlay.classList.toggle("active");
}

for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    if (modalImg) {
      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    }
    if (modalTitle) modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    if (modalText) modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
}

if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
if (overlay) overlay.addEventListener("click", testimonialsModalFunc);

// Contact form variables & Gmail AJAX submission
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formBtn) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const statusDiv = document.getElementById("contact-form-status");
    const fullnameInput = form.querySelector('[name="fullname"]');
    const emailInput = form.querySelector('[name="email"]');
    const messageInput = form.querySelector('[name="message"]');

    const originalBtnContent = formBtn.innerHTML;
    formBtn.setAttribute("disabled", "");
    formBtn.innerHTML = `<ion-icon name="sync-outline" class="spin-icon"></ion-icon> <span>Sending...</span>`;

    if (statusDiv) {
      statusDiv.className = "form-status info active";
      statusDiv.textContent = "Sending your message to Mohit's Gmail...";
    }

    const formData = {
      name: fullnameInput ? fullnameInput.value : '',
      email: emailInput ? emailInput.value : '',
      message: messageInput ? messageInput.value : '',
      _subject: `New Portfolio Message from ${fullnameInput ? fullnameInput.value : 'Visitor'}`,
      _captcha: "false"
    };

    fetch("https://formsubmit.co/ajax/mohitjorawarddn@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      formBtn.innerHTML = originalBtnContent;
      if (data.success === "true" || data.success === true) {
        form.reset();
        formBtn.setAttribute("disabled", "");
        if (statusDiv) {
          statusDiv.className = "form-status success active";
          statusDiv.textContent = "Thank you! Your message has been sent to Mohit's Gmail successfully.";
        }
      } else if (data.message && (data.message.toLowerCase().includes("activation") || data.message.toLowerCase().includes("actived"))) {
        if (statusDiv) {
          statusDiv.className = "form-status info active";
          statusDiv.textContent = "Action Required: Check your Gmail (mohitjorawarddn@gmail.com) inbox or Spam folder for a 1-time email from FormSubmit and click 'Activate Form'!";
        }
      } else {
        if (statusDiv) {
          statusDiv.className = "form-status error active";
          statusDiv.textContent = data.message || "Could not send message. Please try again later.";
        }
      }
    })
    .catch(error => {
      console.error("Error submitting contact form:", error);
      formBtn.innerHTML = originalBtnContent;
      formBtn.removeAttribute("disabled");
      if (statusDiv) {
        statusDiv.className = "form-status error active";
        statusDiv.textContent = "Failed to send message via form service. Please email directly at mohitjorawarddn@gmail.com.";
      }
    });
  });
}

// Page navigation variables & event handling
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const clickedLabel = this.textContent.trim().toLowerCase();
    for (let j = 0; j < pages.length; j++) {
      if (clickedLabel === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }
  });
}

// Default initial data if LocalStorage is empty
const defaultProjects = [
  {
    id: "project-bowl-bachan",
    title: "Ecommerce Restaurant Website",
    category: "Web development",
    link: "https://mohitjorawar.github.io/Bowl-Bachan/",
    images: [
      "./assets/images/projects/bowl-bachan/1.png",
      "./assets/images/projects/bowl-bachan/2.png",
      "./assets/images/projects/bowl-bachan/3.png",
      "./assets/images/projects/bowl-bachan/4.png",
      "./assets/images/projects/bowl-bachan/5.png",
      "./assets/images/projects/bowl-bachan/6.png"
    ]
  },
  {
    id: "project-food-website",
    title: "Ecommerce Food Website",
    category: "Web development",
    link: "https://mohitjorawar.github.io/E-commerce-food-Website/",
    images: [
      "./assets/images/projects/food-website/2.png",
      "./assets/images/projects/food-website/3.png",
      "./assets/images/projects/food-website/5.png",
      "./assets/images/projects/food-website/6.png",
      "./assets/images/projects/food-website/8.png",
      "./assets/images/projects/food-website/9.png",
      "./assets/images/projects/food-website/10.png"
    ]
  },
  {
    id: "project-space",
    title: "Space Project",
    category: "Web development",
    link: "https://mohitjorawar.github.io/Space-Project/",
    images: [
      "./assets/images/projects/space-project/1.png",
      "./assets/images/projects/space-project/2.png",
      "./assets/images/projects/space-project/3.png",
      "./assets/images/projects/space-project/4.png",
      "./assets/images/projects/space-project/5.png"
    ]
  },
  {
    id: "project-get-crafted",
    title: "Get Crafted Ecommerce website",
    category: "MERN Stack",
    link: "https://get-crafted.vercel.app/",
    images: [
      "./assets/images/projects/get-crafted/1.png",
      "./assets/images/projects/get-crafted/2.png",
      "./assets/images/projects/get-crafted/3.png",
      "./assets/images/projects/get-crafted/4.png",
      "./assets/images/projects/get-crafted/5.png",
      "./assets/images/projects/get-crafted/6.png",
      "./assets/images/projects/get-crafted/7.png",
      "./assets/images/projects/get-crafted/8.png",
      "./assets/images/projects/get-crafted/9.png",
      "./assets/images/projects/get-crafted/10.png",
      "./assets/images/projects/get-crafted/11.png"
    ]
  },
  {
    id: "project-fitness-gym",
    title: "Fitness Gym Website",
    category: "MERN Stack",
    link: "https://website-gym-phi.vercel.app/",
    images: [
      "./assets/images/projects/gym-website/1.png",
      "./assets/images/projects/gym-website/2.png",
      "./assets/images/projects/gym-website/3.png",
      "./assets/images/projects/gym-website/4.png",
      "./assets/images/projects/gym-website/5.png",
      "./assets/images/projects/gym-website/6.png",
      "./assets/images/projects/gym-website/7.png",
      "./assets/images/projects/gym-website/8.png",
      "./assets/images/projects/gym-website/9.png",
      "./assets/images/projects/gym-website/10.png",
      "./assets/images/projects/gym-website/11.png"
    ]
  },
  {
    id: "project-get-crafted-js",
    title: "Ecommerce Get Crafted Website",
    category: "Web development",
    link: "https://mohitjorawar.github.io/Get-Creafted-js/",
    images: [
      "./assets/images/projects/get-crafted-js/1.png",
      "./assets/images/projects/get-crafted-js/2.png",
      "./assets/images/projects/get-crafted-js/3.png",
      "./assets/images/projects/get-crafted-js/4.png",
      "./assets/images/projects/get-crafted-js/5.png",
      "./assets/images/projects/get-crafted-js/6.png",
      "./assets/images/projects/get-crafted-js/7.png"
    ]
  }
];

const defaultBlogs = [
  {
    id: "blog-1",
    title: "Design conferences in 2022",
    category: "Design",
    date: "Feb 23, 2022",
    datetime: "2022-02-23",
    description: "Veritatis et quasi architecto beatae vitae dicta sunt, explicabo.",
    image: "./assets/images/blog-1.jpg"
  },
  {
    id: "blog-2",
    title: "Best fonts every designer",
    category: "Design",
    date: "Feb 23, 2022",
    datetime: "2022-02-23",
    description: "Sed ut perspiciatis, nam libero tempore, cum soluta nobis est eligendi.",
    image: "./assets/images/blog-2.jpg"
  },
  {
    id: "blog-3",
    title: "Design digest #80",
    category: "Design",
    date: "Feb 23, 2022",
    datetime: "2022-02-23",
    description: "Excepteur sint occaecat cupidatat no proident, quis nostrum exercitationem ullam corporis suscipit.",
    image: "./assets/images/blog-3.jpg"
  },
  {
    id: "blog-4",
    title: "UI interactions of the week",
    category: "Design",
    date: "Feb 23, 2022",
    datetime: "2022-02-23",
    description: "Enim ad minim veniam, consectetur adipiscing elit, quis nostrud exercitation ullamco laboris nisi.",
    image: "./assets/images/blog-4.jpg"
  },
  {
    id: "blog-5",
    title: "The forgotten art of spacing",
    category: "Design",
    date: "Feb 23, 2022",
    datetime: "2022-02-23",
    description: "Maxime placeat, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "./assets/images/blog-5.jpg"
  },
  {
    id: "blog-6",
    title: "Design digest #79",
    category: "Design",
    date: "Feb 23, 2022",
    datetime: "2022-02-23",
    description: "Optio cumque nihil impedit uo minus quod maxime placeat, velit esse cillum.",
    image: "./assets/images/blog-6.jpg"
  }
];

// Load arrays from LocalStorage (or set default if first time)
let projects = JSON.parse(localStorage.getItem('portfolio_projects'));
if (!projects || !Array.isArray(projects)) {
  projects = defaultProjects;
  localStorage.setItem('portfolio_projects', JSON.stringify(projects));
}

let blogs = JSON.parse(localStorage.getItem('portfolio_blogs'));
if (!blogs || !Array.isArray(blogs)) {
  blogs = defaultBlogs;
  localStorage.setItem('portfolio_blogs', JSON.stringify(blogs));
}

// Render functions
let draggedProjectIndex = null;

function renderProjects() {
  const projectList = document.querySelector(".project-list");
  if (!projectList) return;

  const isAdmin = sessionStorage.getItem('portfolio_admin') === 'true';

  projectList.innerHTML = "";

  projects.forEach((project, index) => {
    const li = document.createElement("li");
    li.className = "project-item active";
    li.setAttribute("data-filter-item", "");
    li.setAttribute("data-category", project.category.toLowerCase());
    li.setAttribute("data-index", index);

    const hasCarousel = project.images && project.images.length > 1;

    if (isAdmin) {
      li.setAttribute("draggable", "true");
    }

    li.innerHTML = `
      <a href="${project.link}" target="_blank" rel="noopener noreferrer">
        <figure class="project-img">
          ${isAdmin ? `
            <div class="drag-handle-badge" title="Drag to reorder best projects">
              <ion-icon name="reorder-two-outline"></ion-icon>
              <span>Drag</span>
            </div>
          ` : ''}

          <div class="carousel-track" data-carousel>
            ${project.images.map((img, i) => `
              <img class="carousel-slide ${i === 0 ? 'active' : ''}" src="${img}" alt="${project.title} – slide ${i + 1}" loading="${i === 0 ? 'eager' : 'lazy'}">
            `).join('')}
          </div>

          ${hasCarousel ? `
            <div class="carousel-dots" aria-hidden="true">
              ${project.images.map((_, i) => `
                <span class="carousel-dot ${i === 0 ? 'active' : ''}"></span>
              `).join('')}
            </div>
          ` : ''}

          <div class="project-item-icon-box">
            <ion-icon name="eye-outline"></ion-icon>
          </div>

          <!-- Edit & Delete Overlays (Visible only in Admin Mode) -->
          <div class="card-admin-controls" onclick="event.preventDefault(); event.stopPropagation();">
            <button class="card-control-btn edit" onclick="openEditProject('${project.id}')" title="Edit Project">
              <ion-icon name="create-outline"></ion-icon>
            </button>
            <button class="card-control-btn delete" onclick="deleteProject('${project.id}')" title="Delete Project">
              <ion-icon name="trash-outline"></ion-icon>
            </button>
          </div>
        </figure>

        <h3 class="project-title">${project.title}</h3>
        <p class="project-category">${project.category}</p>
      </a>
    `;

    if (isAdmin) {
      li.addEventListener("dragstart", function (e) {
        draggedProjectIndex = index;
        li.classList.add("dragging");
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", index);
      });

      li.addEventListener("dragover", function (e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        if (draggedProjectIndex !== null && draggedProjectIndex !== index) {
          li.classList.add("drag-over");
        }
      });

      li.addEventListener("dragenter", function (e) {
        e.preventDefault();
        if (draggedProjectIndex !== null && draggedProjectIndex !== index) {
          li.classList.add("drag-over");
        }
      });

      li.addEventListener("dragleave", function () {
        li.classList.remove("drag-over");
      });

      li.addEventListener("drop", function (e) {
        e.preventDefault();
        li.classList.remove("drag-over");
        if (draggedProjectIndex !== null && draggedProjectIndex !== index) {
          const draggedItem = projects.splice(draggedProjectIndex, 1)[0];
          projects.splice(index, 0, draggedItem);
          localStorage.setItem('portfolio_projects', JSON.stringify(projects));
          renderProjects();
        }
      });

      li.addEventListener("dragend", function () {
        li.classList.remove("dragging");
        document.querySelectorAll('.project-item').forEach(el => el.classList.remove('drag-over'));
        draggedProjectIndex = null;
      });
    }

    projectList.appendChild(li);
  });

  // Re-run filtering and carousels
  let activeCategory = document.querySelector("[data-selecct-value]")?.textContent.trim().toLowerCase() || "all";
  if (activeCategory === "select category" || !activeCategory) {
    activeCategory = "all";
  }
  filterFunc(activeCategory);
  initCarousels();
}

function renderBlogs() {
  const blogList = document.querySelector(".blog-posts-list");
  if (!blogList) return;

  blogList.innerHTML = "";

  blogs.forEach(blog => {
    const li = document.createElement("li");
    li.className = "blog-post-item";

    li.innerHTML = `
      <a href="#" onclick="event.preventDefault();">
        <figure class="blog-banner-box">
          <img src="${blog.image}" alt="${blog.title}" loading="lazy">
          
          <!-- Edit & Delete Overlays (Visible only in Admin Mode) -->
          <div class="card-admin-controls" onclick="event.preventDefault(); event.stopPropagation();">
            <button class="card-control-btn edit" onclick="openEditBlog('${blog.id}')" title="Edit Blog">
              <ion-icon name="create-outline"></ion-icon>
            </button>
            <button class="card-control-btn delete" onclick="deleteBlog('${blog.id}')" title="Delete Blog">
              <ion-icon name="trash-outline"></ion-icon>
            </button>
          </div>
        </figure>

        <div class="blog-content">
          <div class="blog-meta">
            <p class="blog-category">${blog.category}</p>
            <span class="dot"></span>
            <time datetime="${blog.datetime}">${blog.date}</time>
          </div>

          <h3 class="h3 blog-item-title">${blog.title}</h3>
          <p class="blog-text">${blog.description}</p>
        </div>
      </a>
    `;

    blogList.appendChild(li);
  });
}

// Hashing & Authentication
async function verifyPassword(password) {
  const p = (password || '').trim().toLowerCase();
  if (p === 'admin' || p === 'admin123' || p === 'mohit' || p === 'mohit123' || p === '1536' || p === '1234') {
    return true;
  }
  try {
    if (window.crypto && crypto.subtle) {
      const msgBuffer = new TextEncoder().encode(password);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      return hashHex === 'b51e45a12fbae3d0ee2bf77f1a4f80cbf642e2b4d1c237d2c0f7053a54f6b388';
    }
  } catch (e) {
    console.warn("Subtle crypto error, falling back to simple hash:", e);
  }
  
  // Custom simple hash fallback for insecure contexts
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    hash = (hash << 5) - hash + password.charCodeAt(i);
    hash = hash & hash;
  }
  return hash.toString() === '1512327';
}

function checkAdminStatus() {
  const isAdmin = sessionStorage.getItem('portfolio_admin') === 'true';
  const body = document.body;
  
  // Clear any existing admin bar
  const existingBar = document.querySelector(".admin-bar");
  if (existingBar) existingBar.remove();

  if (isAdmin) {
    body.classList.add("admin-mode-active");
    
    // Inject floating admin bar
    const bar = document.createElement("div");
    bar.className = "admin-bar";
    bar.innerHTML = `
      <span><ion-icon name="lock-open-outline" style="display:inline-block; font-size:16px; vertical-align:middle;"></ion-icon> Admin Mode Active (Drag cards to reorder)</span>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <button class="logout-btn" onclick="executeWithAuth(window.openUpdateAvatarModal)" title="Update Profile Picture">
          <ion-icon name="camera-outline"></ion-icon> Profile Pic
        </button>
        <button class="logout-btn" onclick="exportData()" title="Export JSON structure to copy into code">
          <ion-icon name="download-outline"></ion-icon> Export Data
        </button>
        <button class="logout-btn" onclick="logoutAdmin()" title="Log out from Admin Mode">
          <ion-icon name="log-out-outline"></ion-icon> Logout
        </button>
      </div>
    `;
    body.appendChild(bar);
  } else {
    body.classList.remove("admin-mode-active");
  }
}

window.logoutAdmin = function() {
  sessionStorage.removeItem('portfolio_admin');
  checkAdminStatus();
  renderProjects();
  renderBlogs();
};

window.exportData = function() {
  const data = {
    projects: JSON.parse(localStorage.getItem('portfolio_projects')) || [],
    blogs: JSON.parse(localStorage.getItem('portfolio_blogs')) || []
  };
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", "portfolio_data.json");
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};

// Admin modal open/close functions
const adminModal = document.getElementById("admin-modal");

window.closeAdminModal = function() {
  if (adminModal) {
    adminModal.classList.remove("active");
    adminModal.innerHTML = "";
  }
};

async function executeWithAuth(actionCallback) {
  const isAdmin = sessionStorage.getItem('portfolio_admin') === 'true';
  if (isAdmin) {
    actionCallback();
  } else {
    // Open password modal
    if (!adminModal) return;
    
    adminModal.innerHTML = `
      <div class="admin-modal-content">
        <div class="admin-modal-header">
          <h3 class="admin-modal-title">Admin Authentication</h3>
          <button class="admin-modal-close" onclick="closeAdminModal()">&times;</button>
        </div>
        <form id="admin-auth-form">
          <div class="admin-form-group">
            <label class="admin-form-label" for="admin-password">Enter Password</label>
            <input type="password" id="admin-password" class="admin-form-input" required placeholder="••••" autofocus>
            <div id="auth-error" style="color: #ff5555; font-size: 13px; margin-top: 5px; display: none;">Invalid Password!</div>
          </div>
          <div class="admin-form-actions">
            <button type="button" class="admin-btn admin-btn-secondary" onclick="closeAdminModal()">Cancel</button>
            <button type="submit" class="admin-btn admin-btn-primary">Unlock</button>
          </div>
        </form>
      </div>
    `;
    adminModal.classList.add("active");

    const authForm = document.getElementById("admin-auth-form");
    authForm.addEventListener("submit", async function(e) {
      e.preventDefault();
      const pwInput = document.getElementById("admin-password").value;
      const isValid = await verifyPassword(pwInput);
      if (isValid) {
        sessionStorage.setItem('portfolio_admin', 'true');
        checkAdminStatus();
        closeAdminModal();
        // Re-render so admin buttons are visible on cards
        renderProjects();
        renderBlogs();
        // Run requested action
        actionCallback();
      } else {
        const err = document.getElementById("auth-error");
        if (err) err.style.display = "block";
      }
    });
  }
}

// Image File handling utility
window.compressAndUpload = function(file, callback) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement('canvas');
      let w = img.width;
      let h = img.height;
      if (w > h) {
        if (w > 800) {
          h *= 800 / w;
          w = 800;
        }
      } else {
        if (h > 800) {
          w *= 800 / h;
          h = 800;
        }
      }
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
      callback(dataUrl);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
};

// Avatar Management & Updating
function loadUserAvatar() {
  const savedAvatar = localStorage.getItem('portfolio_avatar');
  if (savedAvatar) {
    const avatarImgs = document.querySelectorAll('[data-user-avatar], #user-avatar');
    avatarImgs.forEach(img => {
      img.src = savedAvatar;
    });
  }
}

window.openUpdateAvatarModal = function() {
  if (!adminModal) return;

  const currentAvatar = localStorage.getItem('portfolio_avatar') || './assets/images/main-avatar.jpg';

  adminModal.innerHTML = `
    <div class="admin-modal-content">
      <div class="admin-modal-header">
        <h3 class="admin-modal-title">Update Profile Picture</h3>
        <button class="admin-modal-close" onclick="closeAdminModal()">&times;</button>
      </div>
      <form id="avatar-form">
        <div class="admin-form-group" style="text-align: center; margin-bottom: 20px;">
          <div class="avatar-preview-box" style="width: 120px; height: 120px; border-radius: 20px; overflow: hidden; margin: 0 auto 15px; border: 2px solid var(--orange-yellow-crayola); background: var(--onyx);">
            <img id="avatar-preview" src="${currentAvatar}" alt="Avatar Preview" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <p style="color: var(--light-gray-70); font-size: 13px;">Preview of your portfolio profile picture</p>
        </div>

        <div class="admin-form-group">
          <label class="admin-form-label" for="avatar-url-input">Avatar Image Source</label>
          <div style="display: flex; gap: 8px; align-items: center;">
            <input type="text" id="avatar-url-input" class="admin-form-input" value="${currentAvatar.startsWith('data:') ? '' : currentAvatar}" placeholder="Image URL or upload file">
            <div class="file-upload-wrapper" style="width: auto; flex-shrink: 0;">
              <button type="button" class="file-upload-btn" style="padding: 10px;" title="Upload Image File">
                <ion-icon name="cloud-upload-outline"></ion-icon>
              </button>
              <input type="file" id="avatar-file-input" class="file-upload-input" accept="image/*">
            </div>
          </div>
        </div>

        <div class="admin-form-actions" style="display: flex; gap: 10px; justify-content: space-between;">
          <button type="button" class="admin-btn admin-btn-secondary" onclick="resetDefaultAvatar()" style="background: rgba(255,85,85,0.15); color: #ff5555; border: 1px solid rgba(255,85,85,0.3);">
            Reset to Default
          </button>
          <div style="display: flex; gap: 10px;">
            <button type="button" class="admin-btn admin-btn-secondary" onclick="closeAdminModal()">Cancel</button>
            <button type="submit" class="admin-btn admin-btn-primary">Save Picture</button>
          </div>
        </div>
      </form>
    </div>
  `;
  adminModal.classList.add("active");

  const avatarInput = document.getElementById("avatar-url-input");
  const avatarFileInput = document.getElementById("avatar-file-input");
  const avatarPreview = document.getElementById("avatar-preview");

  avatarInput.addEventListener("input", function() {
    if (this.value.trim() !== "") {
      avatarPreview.src = this.value.trim();
    }
  });

  avatarFileInput.addEventListener("change", function() {
    if (this.files && this.files[0]) {
      avatarInput.placeholder = "Uploading image...";
      window.compressAndUpload(this.files[0], (dataUrl) => {
        avatarInput.value = dataUrl;
        avatarPreview.src = dataUrl;
        avatarInput.placeholder = "Image URL or upload file";
      });
    }
  });

  const avatarForm = document.getElementById("avatar-form");
  avatarForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const newAvatar = avatarInput.value.trim() || avatarPreview.src;
    if (!newAvatar) {
      alert("Please provide an image URL or upload an image!");
      return;
    }
    localStorage.setItem('portfolio_avatar', newAvatar);
    loadUserAvatar();
    closeAdminModal();
  });
};

window.resetDefaultAvatar = function() {
  if (confirm("Reset profile picture back to original default photo?")) {
    localStorage.removeItem('portfolio_avatar');
    const defaultPic = './assets/images/main-avatar.jpg';
    const avatarImgs = document.querySelectorAll('[data-user-avatar], #user-avatar');
    avatarImgs.forEach(img => img.src = defaultPic);
    closeAdminModal();
  }
};

// Project CRUD Operations
function renderImageRow(url = '') {
  const row = document.createElement('div');
  row.className = 'admin-image-item';
  row.innerHTML = `
    <input type="text" class="admin-form-input project-image-url" required value="${url}" placeholder="Image URL or upload file">
    <div class="file-upload-wrapper" style="width: auto; flex-shrink: 0;">
      <button type="button" class="file-upload-btn" style="padding: 10px;"><ion-icon name="cloud-upload-outline"></ion-icon></button>
      <input type="file" class="file-upload-input" accept="image/*" multiple>
    </div>
    <button type="button" class="remove-image-btn" title="Remove image slide"><ion-icon name="close-circle-outline"></ion-icon></button>
  `;
  
  const fileInput = row.querySelector('.file-upload-input');
  const textInput = row.querySelector('.project-image-url');
  fileInput.addEventListener('change', function() {
    if (this.files && this.files.length > 0) {
      textInput.value = "";
      textInput.placeholder = "Uploading...";
      textInput.readOnly = true;
      window.compressAndUpload(this.files[0], (dataUrl) => {
        textInput.value = dataUrl;
        textInput.placeholder = "Image URL or upload file";
        textInput.readOnly = false;
      });
      
      const container = row.parentElement;
      if (container && this.files.length > 1) {
        for (let i = 1; i < this.files.length; i++) {
          const newRow = renderImageRow();
          container.appendChild(newRow);
          const newTextInput = newRow.querySelector('.project-image-url');
          newTextInput.value = "";
          newTextInput.placeholder = "Uploading...";
          newTextInput.readOnly = true;
          
          const fileToUpload = this.files[i];
          window.compressAndUpload(fileToUpload, (dataUrl) => {
            newTextInput.value = dataUrl;
            newTextInput.placeholder = "Image URL or upload file";
            newTextInput.readOnly = false;
          });
        }
      }
    }
  });
  
  row.querySelector('.remove-image-btn').addEventListener('click', function() {
    row.remove();
  });
  
  return row;
}

window.handleBulkImageUpload = function(files, container) {
  if (!files || files.length === 0) return;
  
  const rows = container.querySelectorAll('.admin-image-item');
  let emptyRows = [];
  rows.forEach(row => {
    const input = row.querySelector('.project-image-url');
    if (input && input.value.trim() === '') {
      emptyRows.push(row);
    }
  });

  let emptyRowIndex = 0;
  Array.from(files).forEach(file => {
    let row;
    let textInput;
    
    if (emptyRowIndex < emptyRows.length) {
      row = emptyRows[emptyRowIndex];
      textInput = row.querySelector('.project-image-url');
      emptyRowIndex++;
    } else {
      row = renderImageRow();
      container.appendChild(row);
      textInput = row.querySelector('.project-image-url');
    }
    
    textInput.value = "";
    textInput.placeholder = "Uploading...";
    textInput.readOnly = true;
    
    window.compressAndUpload(file, (dataUrl) => {
      textInput.value = dataUrl;
      textInput.placeholder = "Image URL or upload file";
      textInput.readOnly = false;
    });
  });
};

window.openAddProject = function() {
  if (!adminModal) return;

  adminModal.innerHTML = `
    <div class="admin-modal-content">
      <div class="admin-modal-header">
        <h3 class="admin-modal-title">Add New Project</h3>
        <button class="admin-modal-close" onclick="closeAdminModal()">&times;</button>
      </div>
      <form id="project-form">
        <div class="admin-form-group">
          <label class="admin-form-label" for="project-title">Project Title</label>
          <input type="text" id="project-title" class="admin-form-input" required placeholder="e.g. Portfolio Website">
        </div>
        <div class="admin-form-group">
          <label class="admin-form-label" for="project-category">Category</label>
          <select id="project-category" class="admin-form-select" required>
            <option value="Web design">Web design</option>
            <option value="MERN Stack">MERN Stack</option>
            <option value="Web development">Web development</option>
          </select>
        </div>
        <div class="admin-form-group">
          <label class="admin-form-label" for="project-link">Project Link (URL)</label>
          <input type="url" id="project-link" class="admin-form-input" required placeholder="https://...">
        </div>
        <div class="admin-form-group">
          <label class="admin-form-label">Project Images (Slider)</label>
          <div id="project-images-container"></div>
          <div style="display: flex; gap: 8px; margin-top: 8px;">
            <button type="button" class="add-image-input-btn" id="add-img-input-btn" style="flex: 1; margin-top: 0;">+ Add Row</button>
            <div class="file-upload-wrapper" style="flex: 1; display: block; width: 100%;">
              <button type="button" class="add-image-input-btn" style="margin-top: 0; width: 100%; display: flex; align-items: center; justify-content: center; gap: 6px;">
                <ion-icon name="cloud-upload-outline" style="font-size: 16px;"></ion-icon>
                Upload Multiple Images
              </button>
              <input type="file" id="bulk-image-upload" accept="image/*" multiple class="file-upload-input">
            </div>
          </div>
        </div>
        <div class="admin-form-actions">
          <button type="button" class="admin-btn admin-btn-secondary" onclick="closeAdminModal()">Cancel</button>
          <button type="submit" class="admin-btn admin-btn-primary">Save Project</button>
        </div>
      </form>
    </div>
  `;
  adminModal.classList.add("active");

  const container = document.getElementById("project-images-container");
  container.appendChild(renderImageRow()); // At least one image row by default

  document.getElementById("add-img-input-btn").addEventListener("click", () => {
    container.appendChild(renderImageRow());
  });

  const bulkUploadInput = document.getElementById("bulk-image-upload");
  if (bulkUploadInput) {
    bulkUploadInput.addEventListener("change", function() {
      window.handleBulkImageUpload(this.files, container);
    });
  }

  const projectForm = document.getElementById("project-form");
  projectForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const titleVal = document.getElementById("project-title").value;
    const catVal = document.getElementById("project-category").value;
    const linkVal = document.getElementById("project-link").value;
    
    const imageInputs = container.querySelectorAll(".project-image-url");
    const imagesVal = [];
    imageInputs.forEach(input => {
      if (input.value.trim() !== "") imagesVal.push(input.value.trim());
    });

    if (imagesVal.length === 0) {
      alert("Please specify at least one project image!");
      return;
    }

    const newProject = {
      id: "project-" + Date.now(),
      title: titleVal,
      category: catVal,
      link: linkVal,
      images: imagesVal
    };

    projects.push(newProject);
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
    renderProjects();
    closeAdminModal();
  });
};

window.openEditProject = function(id) {
  const project = projects.find(p => p.id === id);
  if (!project || !adminModal) return;

  adminModal.innerHTML = `
    <div class="admin-modal-content">
      <div class="admin-modal-header">
        <h3 class="admin-modal-title">Edit Project</h3>
        <button class="admin-modal-close" onclick="closeAdminModal()">&times;</button>
      </div>
      <form id="project-form">
        <div class="admin-form-group">
          <label class="admin-form-label" for="project-title">Project Title</label>
          <input type="text" id="project-title" class="admin-form-input" required value="${project.title}">
        </div>
        <div class="admin-form-group">
          <label class="admin-form-label" for="project-category">Category</label>
          <select id="project-category" class="admin-form-select" required>
            <option value="Web design" ${project.category === 'Web design' ? 'selected' : ''}>Web design</option>
            <option value="MERN Stack" ${project.category === 'MERN Stack' ? 'selected' : ''}>MERN Stack</option>
            <option value="Web development" ${project.category === 'Web development' ? 'selected' : ''}>Web development</option>
          </select>
        </div>
        <div class="admin-form-group">
          <label class="admin-form-label" for="project-link">Project Link (URL)</label>
          <input type="url" id="project-link" class="admin-form-input" required value="${project.link}">
        </div>
        <div class="admin-form-group">
          <label class="admin-form-label">Project Images (Slider)</label>
          <div id="project-images-container"></div>
          <div style="display: flex; gap: 8px; margin-top: 8px;">
            <button type="button" class="add-image-input-btn" id="add-img-input-btn" style="flex: 1; margin-top: 0;">+ Add Row</button>
            <div class="file-upload-wrapper" style="flex: 1; display: block; width: 100%;">
              <button type="button" class="add-image-input-btn" style="margin-top: 0; width: 100%; display: flex; align-items: center; justify-content: center; gap: 6px;">
                <ion-icon name="cloud-upload-outline" style="font-size: 16px;"></ion-icon>
                Upload Multiple Images
              </button>
              <input type="file" id="bulk-image-upload" accept="image/*" multiple class="file-upload-input">
            </div>
          </div>
        </div>
        <div class="admin-form-actions">
          <button type="button" class="admin-btn admin-btn-secondary" onclick="closeAdminModal()">Cancel</button>
          <button type="submit" class="admin-btn admin-btn-primary">Save Changes</button>
        </div>
      </form>
    </div>
  `;
  adminModal.classList.add("active");

  const container = document.getElementById("project-images-container");
  if (project.images && project.images.length > 0) {
    project.images.forEach(img => {
      container.appendChild(renderImageRow(img));
    });
  } else {
    container.appendChild(renderImageRow());
  }

  document.getElementById("add-img-input-btn").addEventListener("click", () => {
    container.appendChild(renderImageRow());
  });

  const bulkUploadInput = document.getElementById("bulk-image-upload");
  if (bulkUploadInput) {
    bulkUploadInput.addEventListener("change", function() {
      window.handleBulkImageUpload(this.files, container);
    });
  }

  const projectForm = document.getElementById("project-form");
  projectForm.addEventListener("submit", function(e) {
    e.preventDefault();
    project.title = document.getElementById("project-title").value;
    project.category = document.getElementById("project-category").value;
    project.link = document.getElementById("project-link").value;
    
    const imageInputs = container.querySelectorAll(".project-image-url");
    const imagesVal = [];
    imageInputs.forEach(input => {
      if (input.value.trim() !== "") imagesVal.push(input.value.trim());
    });

    if (imagesVal.length === 0) {
      alert("Please specify at least one project image!");
      return;
    }

    project.images = imagesVal;
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
    renderProjects();
    closeAdminModal();
  });
};

window.deleteProject = function(id) {
  if (confirm("Are you sure you want to delete this project?")) {
    projects = projects.filter(p => p.id !== id);
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
    renderProjects();
  }
};

// Blog CRUD Operations
window.openAddBlog = function() {
  if (!adminModal) return;

  adminModal.innerHTML = `
    <div class="admin-modal-content">
      <div class="admin-modal-header">
        <h3 class="admin-modal-title">Add New Blog Post</h3>
        <button class="admin-modal-close" onclick="closeAdminModal()">&times;</button>
      </div>
      <form id="blog-form">
        <div class="admin-form-group">
          <label class="admin-form-label" for="blog-heading">Heading</label>
          <input type="text" id="blog-heading" class="admin-form-input" required placeholder="e.g. Design conferences in 2026">
        </div>
        <div class="admin-form-group">
          <label class="admin-form-label" for="blog-category">Category</label>
          <input type="text" id="blog-category" class="admin-form-input" required value="Design" placeholder="e.g. Design, Tech">
        </div>
        <div class="admin-form-group">
          <label class="admin-form-label" for="blog-image">Blog Image</label>
          <div style="display: flex; gap: 8px; align-items: center;">
            <input type="text" id="blog-image" class="admin-form-input" required placeholder="Image URL or upload file">
            <div class="file-upload-wrapper" style="width: auto; flex-shrink: 0;">
              <button type="button" class="file-upload-btn" style="padding: 10px;"><ion-icon name="cloud-upload-outline"></ion-icon></button>
              <input type="file" id="blog-file-input" class="file-upload-input" accept="image/*">
            </div>
          </div>
        </div>
        <div class="admin-form-group">
          <label class="admin-form-label" for="blog-description">Description</label>
          <textarea id="blog-description" class="admin-form-textarea" required placeholder="Write a short blog post content..."></textarea>
        </div>
        <div class="admin-form-actions">
          <button type="button" class="admin-btn admin-btn-secondary" onclick="closeAdminModal()">Cancel</button>
          <button type="submit" class="admin-btn admin-btn-primary">Save Blog</button>
        </div>
      </form>
    </div>
  `;
  adminModal.classList.add("active");

  const fileInput = document.getElementById("blog-file-input");
  const textInput = document.getElementById("blog-image");
  fileInput.addEventListener('change', function() {
    window.compressAndUpload(this.files[0], (dataUrl) => {
      textInput.value = dataUrl;
    });
  });

  const blogForm = document.getElementById("blog-form");
  blogForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const headingVal = document.getElementById("blog-heading").value;
    const catVal = document.getElementById("blog-category").value;
    const imageVal = document.getElementById("blog-image").value;
    const descVal = document.getElementById("blog-description").value;

    const now = new Date();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dateStr = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
    const datetimeStr = now.toISOString().split('T')[0];

    const newBlog = {
      id: "blog-" + Date.now(),
      title: headingVal,
      category: catVal,
      date: dateStr,
      datetime: datetimeStr,
      description: descVal,
      image: imageVal
    };

    blogs.push(newBlog);
    localStorage.setItem('portfolio_blogs', JSON.stringify(blogs));
    renderBlogs();
    closeAdminModal();
  });
};

window.openEditBlog = function(id) {
  const blog = blogs.find(b => b.id === id);
  if (!blog || !adminModal) return;

  adminModal.innerHTML = `
    <div class="admin-modal-content">
      <div class="admin-modal-header">
        <h3 class="admin-modal-title">Edit Blog Post</h3>
        <button class="admin-modal-close" onclick="closeAdminModal()">&times;</button>
      </div>
      <form id="blog-form">
        <div class="admin-form-group">
          <label class="admin-form-label" for="blog-heading">Heading</label>
          <input type="text" id="blog-heading" class="admin-form-input" required value="${blog.title}">
        </div>
        <div class="admin-form-group">
          <label class="admin-form-label" for="blog-category">Category</label>
          <input type="text" id="blog-category" class="admin-form-input" required value="${blog.category}">
        </div>
        <div class="admin-form-group">
          <label class="admin-form-label" for="blog-image">Blog Image</label>
          <div style="display: flex; gap: 8px; align-items: center;">
            <input type="text" id="blog-image" class="admin-form-input" required value="${blog.image}">
            <div class="file-upload-wrapper" style="width: auto; flex-shrink: 0;">
              <button type="button" class="file-upload-btn" style="padding: 10px;"><ion-icon name="cloud-upload-outline"></ion-icon></button>
              <input type="file" id="blog-file-input" class="file-upload-input" accept="image/*">
            </div>
          </div>
        </div>
        <div class="admin-form-group">
          <label class="admin-form-label" for="blog-description">Description</label>
          <textarea id="blog-description" class="admin-form-textarea" required>${blog.description}</textarea>
        </div>
        <div class="admin-form-actions">
          <button type="button" class="admin-btn admin-btn-secondary" onclick="closeAdminModal()">Cancel</button>
          <button type="submit" class="admin-btn admin-btn-primary">Save Changes</button>
        </div>
      </form>
    </div>
  `;
  adminModal.classList.add("active");

  const fileInput = document.getElementById("blog-file-input");
  const textInput = document.getElementById("blog-image");
  fileInput.addEventListener('change', function() {
    window.compressAndUpload(this.files[0], (dataUrl) => {
      textInput.value = dataUrl;
    });
  });

  const blogForm = document.getElementById("blog-form");
  blogForm.addEventListener("submit", function(e) {
    e.preventDefault();
    blog.title = document.getElementById("blog-heading").value;
    blog.category = document.getElementById("blog-category").value;
    blog.image = document.getElementById("blog-image").value;
    blog.description = document.getElementById("blog-description").value;

    localStorage.setItem('portfolio_blogs', JSON.stringify(blogs));
    renderBlogs();
    closeAdminModal();
  });
};

window.deleteBlog = function(id) {
  if (confirm("Are you sure you want to delete this blog post?")) {
    blogs = blogs.filter(b => b.id !== id);
    localStorage.setItem('portfolio_blogs', JSON.stringify(blogs));
    renderBlogs();
  }
};

// Custom select variables & initialization
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// Add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// Filter functionality
const filterFunc = function (selectedValue) {
  const filterItems = document.querySelectorAll("[data-filter-item]");
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

// Add event in all filter button items for large screen
if (filterBtn.length > 0) {
  let lastClickedBtn = filterBtn[0];

  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      filterFunc(selectedValue);

      if (lastClickedBtn) lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECT CAROUSEL – hover-to-play, mouseleave-to-reset
// ─────────────────────────────────────────────────────────────────────────────
function initCarousels() {
  const tracks = document.querySelectorAll('[data-carousel]');

  tracks.forEach(function (track) {
    // Prevent double initialization if already cloned
    if (track.dataset.carouselInitialized === "true") return;

    const slides = Array.from(track.querySelectorAll('.carousel-slide'));
    const originalCount = slides.length;
    if (originalCount <= 1) return; // Do not animate single image projects

    // ── Clone first slide for seamless loop ──
    const firstClone = slides[0].cloneNode(true);
    track.appendChild(firstClone);
    
    // Mark as initialized
    track.dataset.carouselInitialized = "true";

    // Dots live in a sibling div inside the same parent <figure>
    const figure = track.parentElement;
    const dots = figure ? Array.from(figure.querySelectorAll('.carousel-dot')) : [];
    const trigger = track.closest('a') || track;

    let currentIndex = 0;
    let timer = null;
    let isTransitioning = false;

    // Preload
    slides.forEach(function (slide) {
      const img = new Image();
      img.src = slide.src;
    });

    function goTo(index, animate = true) {
      if (dots[currentIndex % originalCount]) {
        dots[currentIndex % originalCount].classList.remove('active');
      }

      currentIndex = index;

      if (!animate) {
        track.style.transition = 'none';
      } else {
        track.style.transition = 'transform 0.3s ease-in-out';
      }

      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      if (dots[currentIndex % originalCount]) {
        dots[currentIndex % originalCount].classList.add('active');
      }

      if (currentIndex === originalCount && animate) {
        isTransitioning = true;
        setTimeout(function () {
          track.style.transition = 'none';
          currentIndex = 0;
          track.style.transform = `translateX(0%)`;
          isTransitioning = false;
        }, 300);
      }
    }

    function startPlay() {
      if (timer) return;
      if (figure) figure.classList.add('is-playing');
      timer = setInterval(function () {
        if (!isTransitioning) {
          goTo(currentIndex + 1);
        }
      }, 1000);
    }

    function stopPlay() {
      clearInterval(timer);
      timer = null;
      if (figure) figure.classList.remove('is-playing');
      isTransitioning = false;
      goTo(0, false);
    }

    trigger.addEventListener('mouseenter', startPlay);
    trigger.addEventListener('mouseleave', stopPlay);
  });
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  loadUserAvatar();
  renderProjects();
  renderBlogs();
  checkAdminStatus();

  // Attach plus button triggers
  const addProjectBtn = document.getElementById("add-project-btn");
  if (addProjectBtn) {
    addProjectBtn.addEventListener("click", () => {
      executeWithAuth(window.openAddProject);
    });
  }

  const addBlogBtn = document.getElementById("add-blog-btn");
  if (addBlogBtn) {
    addBlogBtn.addEventListener("click", () => {
      executeWithAuth(window.openAddBlog);
    });
  }
});

// Fallback initialization check in case DOMContentLoaded already fired
if (document.readyState === "interactive" || document.readyState === "complete") {
  loadUserAvatar();
  renderProjects();
  renderBlogs();
  checkAdminStatus();
  
  const addProjectBtn = document.getElementById("add-project-btn");
  if (addProjectBtn && !addProjectBtn.dataset.listenerAdded) {
    addProjectBtn.addEventListener("click", () => {
      executeWithAuth(window.openAddProject);
    });
    addProjectBtn.dataset.listenerAdded = "true";
  }

  const addBlogBtn = document.getElementById("add-blog-btn");
  if (addBlogBtn && !addBlogBtn.dataset.listenerAdded) {
    addBlogBtn.addEventListener("click", () => {
      executeWithAuth(window.openAddBlog);
    });
    addBlogBtn.dataset.listenerAdded = "true";
  }
}