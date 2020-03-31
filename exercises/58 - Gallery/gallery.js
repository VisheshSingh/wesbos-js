function Gallery(gallery) {
  if (!gallery) {
    console.info('no image gallery 🥵');
    return;
  }
  const images = Array.from(gallery.querySelectorAll('img'));
  const modal = document.querySelector('.modal');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  let currentImage;
  // console.log(images, modal);
  images.forEach(img => {
    img.addEventListener('click', e => showImage(e.currentTarget));
    img.addEventListener('keyup', e => {
      if (e.key === 'Enter') {
        showImage(e.currentTarget);
      }
    });
  });

  function showImage(img) {
    if (!img) {
      console.info('No image to show 😑');
      return;
    }
    const imgSrc = img.src;
    const imgTitle = img.title;
    const imgDesc = img.dataset.description;

    modal.querySelector('img').src = imgSrc;
    modal.querySelector('h2').textContent = imgTitle;
    modal.querySelector('figure p').textContent = imgDesc;
    currentImage = img;
    console.log(modal.matches('.open'));
    openModal();
    // console.log(imgSrc, imgTitle, imgDesc);
  }

  function openModal() {
    if (modal.matches('.open')) {
      console.info('modal already open');
      return;
    }
    modal.classList.add('open');
    window.addEventListener('keyup', handleKeypup);
    modal.addEventListener('click', handleClickOutside);
    nextButton.addEventListener('click', showNextImage);
    prevButton.addEventListener('click', showPrevImage);
  }

  function handleKeypup(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
    if (e.key === 'ArrowRight') {
      showNextImage();
    }
    if (e.key === 'ArrowLeft') {
      showPrevImage();
    }
  }

  function closeModal() {
    modal.classList.remove('open');
    window.removeEventListener('keyup', handleKeypup);
    modal.removeEventListener('click', handleClickOutside);
    nextButton.removeEventListener('click', showNextImage);
    prevButton.removeEventListener('click', showPrevImage);
  }

  function handleClickOutside(e) {
    const isOutside = !e.target.closest('.modalInner');
    if (isOutside) {
      closeModal();
      currentImage.focus();
    }
  }

  function showNextImage() {
    showImage(currentImage.nextElementSibling || gallery.firstElementChild);
  }

  function showPrevImage() {
    showImage(currentImage.previousElementSibling || gallery.lastElementChild);
  }
}

const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));

// console.log(gallery1, gallery2);
