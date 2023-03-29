/* 1)Başlat fonksiyonu:
-her şeyi başlangıç değerine döndürmeli
-süreyi başlatmalı
(süreyi başlatan fonksiyon ile)
2)Süreyi başlatıp geri sayarak bitiren fonksiyon
3)köstebekleri rastgele aralıklarla yukarı çıkarıp indiren fonksiyon
4)rastgele süre oluşturan fonksiyon
5)köstebekleri rastgele yerleştiren fonksiyon
6)köstebeklere yakalama fonksiyonu
 */

const kostebekAll = document.querySelectorAll(".kostebek");
const baslatButon = document.getElementById("baslat");
const skorEl = document.querySelector("#skor");
const vakitEl = document.querySelector("#vakit");

let gameover = false;
let skor = 0;
let vakit = 10;

const rndmYerlestir = () => {
  return kostebekAll[Math.floor(Math.random() * kostebekAll.length)];
};

const randomTime = (min, max) => {
  return Math.round(Math.random() * (max - min)) + min;
};

const yukari = () => {
  const getirKostebek = rndmYerlestir();
  const bekleme = randomTime(750, 1500);
  getirKostebek.classList.add("secilen");

  setTimeout(() => {
    getirKostebek.classList.remove("secilen");
    if (!gameover) yukari();
  }, bekleme);
};

const geriSayac = () => {
  console.log(gameover);
  if (!gameover) {
    vakit--;
    vakitEl.textContent = vakit;
  } else {
    vakitEl.textContent = "vakit doldu";
  }
};

const oyunBaslat = () => {
  vakit = 10;
  skor = 0;
  gameover = false;

  const interval = setInterval(() => {
    geriSayac();
    if (gameover) clearInterval(interval); //cıkış metodu
  }, 1000);

  yukari();

  setTimeout(() => {
    gameover = true;
  }, vakit * 1000);

  skorEl.textContent = 0;
};

const yakala = (e) => {
  if (e.target.classList.contains("secilen")) {
    skor++;
    e.target.classList.remove("secilen");
  }
  skorEl.textContent = skor;
};

baslatButon.addEventListener("click", oyunBaslat);
kostebekAll.forEach((kostebek) => kostebek.addEventListener("click", yakala));
