addListeners();

const newAnimaster = animaster();

let heartStart;
function addListeners() {
    document.getElementById('fadeInPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeInBlock');
            newAnimaster.fadeIn(block, 5000);
        });

    document.getElementById('movePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveBlock');
            newAnimaster.move(block, 1000, {x: 100, y: 10});
        });

    document.getElementById('scalePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('scaleBlock');
            newAnimaster.scale(block, 1000, 1.25);
        });
        
    document.getElementById('fadeOutPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeOutBlock');
            newAnimaster.faidOut(block, 5000);
        });

    document.getElementById('moveAndHide')
      .addEventListener('click', function () {
        const block = document.getElementById('moveAndHideBlock');
        newAnimaster.moveAndHide(block, 5000);
      });

    document.getElementById('showAndHide')
      .addEventListener('click', function () {
        const block = document.getElementById('showAndHideBlock');
        newAnimaster.showAndHide(block, 5000);
      });


    document.getElementById('heartBeating')
      .addEventListener('click', function () {
        const block = document.getElementById('heartBeatingBlock');
        heartStart = newAnimaster.heartBeating(block, 5000);
      });
    document.getElementById('heartBeatingStop')
      .addEventListener('click', function () {
        const block = document.getElementById('heartBeatingBlock');
        if (heartStart)
          heartStart.stop();
      });
}

function getTransform(translation, ratio) {
    const result = [];
    if (translation) {
        result.push(`translate(${translation.x}px,${translation.y}px)`);
    }
    if (ratio) {
        result.push(`scale(${ratio})`);
    }
    return result.join(' ');
}

function animaster() {
    return {
        /**
         * Блок плавно появляется из прозрачного.
         * @param element — HTMLElement, который надо анимировать
         * @param duration — Продолжительность анимации в миллисекундах
         */
        fadeIn(element, duration) {
            element.style.transitionDuration =  `${duration}ms`;
            element.classList.remove('hide');
            element.classList.add('show');
        },

        /**
         * Функция, передвигающая элемент
         * @param element — HTMLElement, который надо анимировать
         * @param duration — Продолжительность анимации в миллисекундах
         * @param translation — объект с полями x и y, обозначающими смещение блока
         */
        move(element, duration, translation) {
            element.style.transitionDuration = `${duration}ms`;
            element.style.transform = getTransform(translation, null);
        },

        /**
         * Функция, увеличивающая/уменьшающая элемент
         * @param element — HTMLElement, который надо анимировать
         * @param duration — Продолжительность анимации в миллисекундах
         * @param ratio — во сколько раз увеличить/уменьшить. Чтобы уменьшить, нужно передать значение меньше 1
         */
        scale(element, duration, ratio) {
            element.style.transitionDuration =  `${duration}ms`;
            element.style.transform = getTransform(null, ratio);
        },

        faidOut(element, duration) {
            element.style.transitionDuration =  `${duration}ms`;
            element.classList.remove('show');
            element.classList.add('hide');
        },

        moveAndHide(element, duration) {
          this.move(element, 2 * duration / 5, {x: 100, y : -20});
          this.faidOut(element, 3 * duration / 5);
        },

        showAndHide(element, duration) {
          this.fadeIn(element, 1 * duration / 3);
          setTimeout(() => {this.faidOut(element, 1 * duration / 3);}, duration / 3);
        },

      heartBeating(element) {
        let id;
        const step = () => {
          this.scale(element, 500, 1.4);
          id = setTimeout(() => {
            this.scale(element, 500, 1 / 1.4);
            id = setTimeout(step, 500);
          }, 500);
        };
        step();
        return {
          stop() {
            clearTimeout(id);
          }
        };
      }
    }
}
