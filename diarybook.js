// Diarybook Javascript - Fixiert & Bereinigt
var winWidth = $(window).width();
var ratio = winWidth / 1920;

var fontSize = {
  small: Math.max(10 * ratio, 7),
  medium: Math.max(14 * ratio, 10)
};

var played = new Array(366).fill(0);
var vara = [];
var bodyFontSize = Math.max(16 * ratio, 10);
var posX = Math.max(80 * ratio, 30);

$("body").css("font-size", bodyFontSize + "px");

// 1. Seiten generieren (365 Stück)
const book = document.querySelector('.book');
for (let i = 1; i <= 365; i++) {
    const paper = document.createElement('div');
    paper.className = `paper paper-${i}`;
    paper.style.zIndex = 365 - i; 
    paper.innerHTML = `
        <div class="page front contents">
            <div id="vara-container-${i}" class="vara-container"></div>
        </div>
        <div class="page back"></div>
    `;
    book.appendChild(paper);
}

// 2. Vara initialisieren für die erste Seite
vara[0] = new Vara(
  "#vara-container-1", 
  "https://rawcdn.githack.com/akzhy/Vara/ed6ab92fdf196596266ae76867c415fa659eb348/fonts/Satisfy/SatisfySL.json",
  [
    {
      text: "10 Mai 2026",
      textAlign: "right",
      y: 20,
      x: -30,
      delay: 500,
      duration: 1500,
      fontSize: fontSize.small
    },
    {
      text: "Das ist dein neues Tagebuch, wo du reinschreiben kannst, was du willst.",
      y: 40,
      x: posX,
      duration: 4000
    }
  ],
  {
    strokeWidth: 2,
    fontSize: fontSize.medium,
    autoAnimation: false
  }
);

// 3. Klick-Events & Animations-Trigger
vara[0].ready(function() {
  $(document).on('click', '.front', function() {
    var paper = $(this).parent(".paper");
    
    $(".book").addClass("open");
    paper.addClass("open");
    paper.css("z-index", "1000");

    // Trigger: Wenn das Cover (first paper) geklickt wird, startet Seite 1 Animation
    if (paper.hasClass('first') && !played[0]) {
      vara[0].playAll();
      played[0] = 1;
    }
  });

  $(document).on('click', '.back', function() {
    var paper = $(this).parent(".paper");
    
    // Z-Index zurücksetzen (berechnet auf Basis der Seitennummer)
    var paperClass = paper.attr('class');
    var match = paperClass.match(/paper-(\d+)/);
    var pageIndex = match ? parseInt(match[1]) : 0;
    var originalZ = paper.hasClass('first') ? 366 : (365 - pageIndex);
    
    paper.css("z-index", originalZ);
    paper.removeClass("open");

    if (paper.hasClass('first') || paper.hasClass('paper-1')) {
      $(".book").removeClass("open");
    }
  });
});