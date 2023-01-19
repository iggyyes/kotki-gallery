const THUMBNAILS = document.querySelectorAll('.thumbnail img');
const POPUP = document.querySelector('.pop-up');
const POPUP_CLOSE = document.querySelector('.pop-up__close');
const POP_UP__IMG = document.querySelector('.pop-up__img');
const ARROW_LEFT = document.querySelector('.pop-up__arrow__left');
const ARROW_RIGHT = document.querySelector('.pop-up__arrow__right');

let currentImgIndex;

const showNextImg = () => {
    if (currentImgIndex === THUMBNAILS.length - 1) {
        currentImgIndex = 0;

    } else {
        currentImgIndex++;
    }
    POP_UP__IMG.src = THUMBNAILS[currentImgIndex].src;
}

const showPreviousImg = () => {
    if (currentImgIndex === 0) {
        currentImgIndex = THUMBNAILS.length - 1;

    } else {
        currentImgIndex--;
    }
    POP_UP__IMG.src = THUMBNAILS[currentImgIndex].src;
}

const closePopUp = () => {
    POPUP.classList.add('fade-out');
    setTimeout(() => {
        THUMBNAILS.forEach((element) => {
            element.setAttribute('tabindex', 1);
        });
        POPUP.classList.add('hidden');
        POPUP.classList.remove('fade-out');  
    }, 150);
    
}

THUMBNAILS.forEach((thumbnail, index) => {
    const showPopup = (e) => {
        POPUP.classList.remove('hidden');
        POP_UP__IMG.src = e.target.src;
        currentImgIndex = index;
        THUMBNAILS.forEach((element) => {
            element.setAttribute('tabindex', -1);
        });
    };
    thumbnail.addEventListener('click', showPopup);

    thumbnail.addEventListener('keydown', (e) => {
        if (e.code === 'Enter' || e.keyCode === 13) {
            showPopup(e);

        }
    });
});

POPUP_CLOSE.addEventListener('click', closePopUp);

ARROW_RIGHT.addEventListener('click', showNextImg);

ARROW_LEFT.addEventListener('click', showPreviousImg);

document.addEventListener('keydown', (e) => {
    if (!POPUP.classList.contains('hidden')) {
        if (e.code === 'ArrowRight' || e.keyCode === 39) {
            showNextImg();
        }
        if (e.code == 'ArrowLeft' || e.keyCode === 37) {
            showPreviousImg();
        }
        if (e.code == 'Escape' || e.keyCode === 27) {
            closePopUp();
        }
    }
});

POPUP.addEventListener('click', (e) => {
    if (e.target === POPUP) {
        closePopUp();
    }
});