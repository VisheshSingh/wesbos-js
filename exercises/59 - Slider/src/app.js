function Slider(slider) {
  if (!(slider instanceof Element)) {
    throw new Error('No slider found 😫');
  }
  //   console.log(slider);
  let prev;
  let current;
  let next;

  const slides = slider.querySelector('.slides');
  const prevBtn = slider.querySelector('.goToPrev');
  const nextBtn = slider.querySelector('.goToNext');

  //   console.log(slides, prevBtn, nextBtn);
  function showCurrent() {
    current = slides.querySelector('.current') || slides.firstElementChild;
    prev = current.previousElementSibling || slides.lastElementChild;
    next = current.nextElementSibling || slides.lastElementChild;
    // console.log({ prev, current, next });
  }

  function applyClasses() {
    current.classList.add('current');
    prevBtn.classList.add('prev');
    nextBtn.classList.add('next');
  }

  function move(direction) {
    // remove classes
    const classesToRemove = ['prev', 'current', 'next'];
    current.classList.remove(...classesToRemove);
    prevBtn.classList.remove(...classesToRemove);
    nextBtn.classList.remove(...classesToRemove);
    if (direction === 'back') {
      [prev, current, next] = [
        prev.previousElementSibling || slides.lastElementChild,
        prev,
        current
      ];
    } else {
      [prev, current, next] = [
        current,
        next,
        next.nextElementSibling || slides.firstElementChild
      ];
    }
    applyClasses();
  }

  showCurrent();
  applyClasses();

  prevBtn.addEventListener('click', () => move('back'));
  nextBtn.addEventListener('click', move);
  function handleKeyup(e) {
    if (e.key === 'ArrowRight') {
      move();
    }
    if (e.key === 'ArrowLeft') {
      move('back');
    }
  }
  slider.addEventListener('keyup', handleKeyup);
}

const slider1 = Slider(document.querySelector('.slider'));
const slider2 = Slider(document.querySelector('.dog-slider'));
