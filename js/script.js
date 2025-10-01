document.addEventListener("DOMContentLoaded", function () {
  // Preloader functionality
  const preloader = document.getElementById('preloader');
  if (preloader) {
    // Hide preloader after page loads
    window.addEventListener('load', function() {
      setTimeout(function() {
        preloader.classList.add('hidden');
        // Remove preloader from DOM after animation completes
        setTimeout(function() {
          preloader.remove();
        }, 300);
      }, 1000); // Show preloader for at least 1 second
    });
  }

  // Initialize AOS (Animate on Scroll)
  AOS.init({
    duration: 800, // values from 0 to 3000, with step 50ms
    once: true, // whether animation should happen only once - while scrolling down
    offset: 120, // offset (in px) from the original trigger point
    easing: 'ease-in-out', // default easing for AOS animations
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
  });

  // Add scrolled class to navbar on scroll
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  /*
    =================================
    Products Page Logic
    =================================
    */

  // Check if we are on the products page
  if (document.querySelector(".product-filters")) {
    // --- Product Filtering Logic ---
    const filterButtons = document.querySelectorAll(".filter-btn");
    const productItems = document.querySelectorAll(".product-showcase-section");

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Manage active state for buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.getAttribute("data-filter");

        // Show/hide products based on filter
        productItems.forEach((item) => {
          const categories = item.getAttribute("data-category");
          if (filter === "all" || categories.includes(filter)) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      });
    });

    // --- Thumbnail Gallery Logic ---
    const showcases = document.querySelectorAll(".product-showcase-section");

    showcases.forEach((showcase) => {
      const mainImage = showcase.querySelector(".main-product-image img");
      const caption = showcase.querySelector(".image-caption");
      const gallery = showcase.querySelector(".thumbnail-gallery");

      if (gallery) {
        // Initialize Tiny Slider for each gallery
        const slider = tns({
          container: gallery,
          items: 3,
          slideBy: "page",
          autoplay: false,
          controls: true,
          nav: false,
          gutter: 10,
          responsive: {
            768: { items: 4 },
          },
        });

        // Add click listener to each thumbnail
        const thumbs = showcase.querySelectorAll(".thumb-item");
        thumbs.forEach((thumb) => {
          thumb.addEventListener("click", () => {
            // Update main image and caption
            mainImage.src = thumb.dataset.mainImage;
            caption.querySelector("h5").textContent = thumb.dataset.title;

            const captionP = caption.querySelector("p");
            if (captionP) {
              captionP.textContent = thumb.dataset.desc || "";
            }

            // Update active state for thumbnails
            thumbs.forEach((t) => t.classList.remove("active"));
            thumb.classList.add("active");
          });
        });
      }
    });
  }

  /*
        =================================
        Blog Page Filtering Logic
        =================================
    */

  if (document.querySelector(".blog-filters")) {
    const filterButtons = document.querySelectorAll(
      ".blog-filters .filter-btn"
    );
    const blogItems = document.querySelectorAll(".blog-post-item");

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.getAttribute("data-filter");

        blogItems.forEach((item) => {
          const category = item.getAttribute("data-category");
          if (filter === "all" || category === filter) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }
});
