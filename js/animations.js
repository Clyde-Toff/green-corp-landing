const INCREASE_NUMBER_ANIMATION_SPEED = 20;

function increaseNumberAnimationStep (i, element, endNumber) {
  if (i <= endNumber) {
    if (i === endNumber) {
      element.innerText = i + '+';
    } else {
      element.innerText = i;
    }

      i+=50;

      setTimeout(function() {
        increaseNumberAnimationStep(i, element, endNumber);
      }, INCREASE_NUMBER_ANIMATION_SPEED);
    }
  }

function initIncreaseNumberAnimation() {
  const element = document.querySelector('.features__clients-count');
  
  increaseNumberAnimationStep(0, element, 6000);
}

initIncreaseNumberAnimation();

document.querySelector("#budget").addEventListener("change", function handleSelectChange(event) {
  if (event.target.value === "other") {
    // Должны добавить еще одно текстовое поле
    let formContainer = document.createElement("div");
    formContainer.classList.add("form__group", "form__other-input");
    let input = document.createElement("input");
    input.placeholder = "Введите ваш вариант";
    input.type = "text";
    formContainer.appendChild(input);
    document
      .querySelector(".form form")
      .insertBefore(formContainer, document.querySelector(".form__submit"));
  }
  const otherInput = document.querySelector(".form__other-input");
  if (event.target.value !== "other" && Boolean(otherInput)) {
    // Удаляем ранее добавленное текстовое поле, если оно есть в DOM
    document.querySelector(".form form").removeChild(otherInput);
  }
});

let animationInited = false;
function updateScroll() {
  if (window.scrollY > 0) {
    document.querySelector("header").classList.add("header__scrolled");
  } else {
    document.querySelector("header").classList.remove("header__scrolled");
    animationInited = false;
  }

  let windowBottomPosition = window.scrollY + window.innerHeight;
  let countElementPosition = document.querySelector(".features__clients-count").offsetTop;

  if (windowBottomPosition >= countElementPosition && !animationInited) {
    animationInited = true;
    initIncreaseNumberAnimation();
  }
}
window.addEventListener("scroll", updateScroll);
// скролл к конктактам
function addSmoothScroll(anchor) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
 
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
}
document.querySelectorAll('a[href^="#form"]').forEach(anchor => {
  addSmoothScroll(anchor);
});

addSmoothScroll(document.querySelector('.more-button'));
