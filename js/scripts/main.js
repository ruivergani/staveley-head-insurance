// Slides
const swiperHeroHome01 = new Swiper(".home__hero__content__01__slider", {
  slidesPerView: 'auto',
  spaceBetween: 5,
  direction: "horizontal",
  freeMode: true,
  mousewheel: {
    releaseOnEdges: true,
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false // autoplay nao para de funcionar
  },
  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
  },
  // when window width is >= 320px
  320: {
    spaceBetween: 10
  },
});
const swiperHeroHome02 = new Swiper(".home__hero__content__03__slider", {
  slidesPerView: 'auto',
  spaceBetween: 5,
  direction: "vertical",
  freeMode: true,
  mousewheel: {
    releaseOnEdges: true,
  },
  autoplay: {
    delay: 4000,
    disableOnInteraction: false // autoplay nao para de funcionar
  },
  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
  },
  navigation: {
    nextEl: ".swiper-button-next",
  },
  // when window width is >= 320px
  320: {
    spaceBetween: 10
  },
});
// Script for FAQs
const items = document.querySelectorAll(".accordion button");
function toggleAccordion() {
  const itemToggle = this.getAttribute('aria-expanded');
  for (let i = 0; i < items.length; i++) {
    items[i].setAttribute('aria-expanded', 'false');
  }
  if (itemToggle == 'false') {
    this.setAttribute('aria-expanded', 'true');
  }
}
items.forEach(item => item.addEventListener('click', toggleAccordion));
// Script for Table of Contents
const itemContent = document.querySelectorAll(".js-nav-product li"); // all items from table content
if (itemContent) {
  itemContent.forEach(function (event) {
    event.addEventListener("click", () => {
      // remove active from all others
      itemContent.forEach((item) => {
        item.classList.remove("active");
      });
      // add active when click
      event.classList.add("active");
    });
  });
}
// Configure tab navigation based on scroll
const navLi = document.querySelectorAll(".js-nav-product li a");
const sections = document.querySelectorAll("section");
if (navLi.length && sections.length) {
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      let sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop - 160) {
        current = section.getAttribute("id");
      }
    });
    navLi.forEach((li) => {
      li.classList.remove("active");
      const currentLink = document.querySelector(
        '.js-nav-product li a[href*="' + current + '"]'
      );
      if (currentLink) {
        currentLink.classList.add("active");
        //window.location.hash = current;
      }
    });
  });
  // Add click event listeners to the navigation links
  navLi.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default navigation behavior
      let targetId = link.getAttribute("href").substring(1); // Get the target section ID
      let targetSection = document.getElementById(targetId); // Get the target section element

      if (targetSection) {
        let targetOffset = targetSection.offsetTop; // Get the target section's top offset
        window.scrollTo({
          top: targetOffset - 160,
          behavior: "smooth", // Enable smooth scrolling
        });
      }
    });
  });
}
// Script for the mobile tab navigation
const btnDropdownSelect = document.querySelector(".js-open-select-custom");
const dropdownArea = document.querySelector(".select-custom");
const navMobileLink = document.querySelectorAll(".dropdown-select li");
if (btnDropdownSelect) {
  btnDropdownSelect.addEventListener("click", () => {
    dropdownArea.classList.toggle("active");
  });
  navMobileLink.forEach((item, index) => {
    item.addEventListener("click", (event) => {
      navMobileLink.forEach((all) => {
        all.classList.remove("active");
        dropdownArea.classList.remove("active");
      });
      item.classList.add("active");
    });
  });
}
// Custom Select Content Code
var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select-content");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element, create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function (e) {
      /* When an item is clicked, update the original select box and the selected item: */
      var y, i, k, s, h, sl, yl, targetId;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      sl = s.length;
      h = this.parentNode.previousSibling;
      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName("same-as-selected");
          yl = y.length;
          for (k = 0; k < yl; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          // Get the target ID from the value attribute of the selected option
          targetId = s.options[i].value;
          // Scroll to the corresponding section
          const targetSection = document.querySelector(targetId);
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth" });
          }
          break;
        }
      }
      h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function (e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}
function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x,
    y,
    i,
    xl,
    yl,
    arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);

/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select-content");

function updateSelectedOption(scrollPosition) {
  for (i = 0; i < x.length; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    a = x[i].getElementsByClassName("select-selected")[0];
    var sectionTops = [];
    var selectedOptionIndex = -1;

    // Find the top position of each section
    for (var j = 1; j < selElmnt.length; j++) {
      var targetId = selElmnt.options[j].value;
      if (targetId) {
        var targetSection = document.querySelector(targetId);
        if (targetSection) {
          sectionTops.push({
            optionIndex: j,
            sectionTop: targetSection.offsetTop - 160,
            sectionBottom: targetSection.offsetTop + targetSection.clientHeight - 160,
          });
        }
      }
    }
    // Find the section in view
    for (var j = 0; j < sectionTops.length; j++) {
      if (scrollPosition >= sectionTops[j].sectionTop && scrollPosition < sectionTops[j].sectionBottom) {
        selectedOptionIndex = sectionTops[j].optionIndex;
        break;
      }
    }
    // Update the selected option in the select box
    if (selectedOptionIndex !== -1) {
      selElmnt.selectedIndex = selectedOptionIndex;
      a.innerHTML = selElmnt.options[selectedOptionIndex].innerHTML;
    }
  }
}
// Initialize selected options on page load
updateSelectedOption(window.scrollY);
// Listen for the window scroll event
window.addEventListener("scroll", function () {
  var scrollPosition = window.scrollY;
  updateSelectedOption(scrollPosition);
});
// Menu Header Change >20 scroll
const header = document.getElementById("js-header");
const stickyTableContent = document.getElementById("s-table-contents");
function fixedMenu() {
  if (window.pageYOffset > 10) {
    header.classList.add("changeBackgroundColor");
    if(stickyTableContent){
      stickyTableContent.classList.add("sticky-border");
    }
  } else {
    header.classList.remove("changeBackgroundColor");
    if(stickyTableContent){
      stickyTableContent.classList.remove("sticky-border");
    }
  }
}
document.addEventListener("scroll", fixedMenu);
