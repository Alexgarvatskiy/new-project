"use strict";

window.addEventListener('DOMContentLoaded', () => {
  
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');



    function hideTabContent() {
        
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabsContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
   }
 
   hideTabContent();
   showTabsContent();


   tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if(target && target.classList.contains('tabheder__items')) {
            tabs.forEach((item, i) => {
                if(target == item) {
                    hideTabContent();
                    showTabsContent(i);
                }
            });
        }
   });

   // Timer

   const deadLine = '2021-04-30';

   function getTimeRemaining(endtime) {
       const t = Date.parse(endtime) - Date.parse(new Date()),
             days = Math.floor(t / (1000 * 60 * 60 * 24)),
             hours = Math.floor((t / (1000 * 60 * 60 ) % 24)),
             minutes = Math.floor((t / 1000 / 60 ) % 60),
             seconds = Math.floor((t / 1000) % 60);

       return {
           'total': t,
           'days': days,
           'hours': hours,
           'minutes': minutes,
           'seconds': seconds
           };     
  
       }

       function getZero(num) {
           if (num >= 0 && num < 10) {
               return `0${num}`;
           } else {
               return num;
           }
       }

   function setClock(selector, endtime) {
       const timer = document.querySelector(selector),
             days = timer.querySelector('#days'),
             hours = timer.querySelector('#hours'),
             minutes = timer.querySelector('#minutes'),
             seconds = timer.querySelector('#seconds'),
             timeInterval = setInterval(updateClock, 1000);

       updateClock();

       function updateClock() {
           const t = getTimeRemaining(endtime);

           days.innerHTML = getZero(t.days);
           hours.innerHTML = getZero(t.hours);
           minutes.innerHTML = getZero(t.minutes);
           seconds.innerHTML = getZero(t.seconds);

           if  (t.total <= 0) {
               clearInterval(timeInterval);
           }
       }
   }    

   setClock('.timer', deadLine);


      // model

      const modelTriger = document.querySelectorAll('[data-model]'),
      modal  = document.querySelector('.modal');
     


function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.owerflow = 'hidden';
    clearInterval(modalTimerId);
}

modelTriger.forEach(btn => {
    btn.addEventListener('click', openModal);
});

function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.owerflow = '';
}


modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    }
});

const modalTimerId = setTimeout(openModal, 50000);

function showModalByScroll() {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
}

window.addEventListener('scroll', showModalByScroll);

});