'use strict';
let maxScore = 0;
const initializer = function () {
  let vidas = 8;
  let score = 0;
  let contadorWin = 0;
  const selectVidas = document.getElementById('life_count');
  const selectActual = document.getElementById('actual');
  const selectMasAlta = document.getElementById('mas_alta');
  const selectFristScreen = document.querySelector('.frist-screen');
  const selectSecondScreen = document.querySelector('.second-screen');
  const selectStartButton = document.getElementById('start');
  console.log(selectFristScreen);
  console.log(selectSecondScreen);
  selectStartButton.addEventListener('click', function () {
    selectSecondScreen.classList.remove('hidden');
    selectFristScreen.classList.add('hidden');
  });
  console.log(selectVidas);

  const selectCategoria = document.getElementById('categoria');
  const abcdario = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'ñ',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];

  // Seleccion categoria y palabra!

  const jugar = function () {
    selectVidas.innerHTML = vidas;
    const categoriaArray = [
      [
        'Aguiño',
        'Allariz ',
        'Baiona',
        'Betanzos ',
        'Caldas',
        'Cambados',
        'Cariño',
        'CastroCaldelas',
        'Cedeira',
        'Celanova',
        'Combarro',
        'Malpica',
        'Mondariz',
        'Mondoñedo',
        'Mugardos',
        'Muros',
        'Barqueiro',
        'Oia',
        'Pontedeume',
        'Redes',
        'Ribadavia',
        'Ribadeo',
        'Rinlo',
        'Tui',
        'Viveiro',
      ],
      [
        'Agarimo',
        'aperta',
        'arroiar',
        'arroutada',
        'bico',
        'bretema',
        'chosco',
        'enxebre',
        'espantallo',
        'feitiño',
        'ledicia',
        'luar',
        'luscofusco',
        'morriña',
        'orballo',
        'parvo',
        'querote',
        'rabudo',
        'rosmar',
        'ruliña',
        'sarabia',
        'sentidiño',
        'toxo',
        'trapallada',
        'xeito',
      ],
    ];
    const escogerCategoria =
      categoriaArray[Math.floor(Math.random() * categoriaArray.length)];
    const palabra =
      escogerCategoria[Math.floor(Math.random() * escogerCategoria.length)];

    console.log(escogerCategoria);
    console.log(palabra);

    // Mostrar la categoria

    const mostrarCategoria = function () {
      if (escogerCategoria === categoriaArray[0]) {
        selectCategoria.innerHTML = 'A categoria son pobos!';
      } else {
        selectCategoria.innerHTML = 'A categoria son palabras tipicas!';
      }
    };
    mostrarCategoria();

    // Crear palabra

    const crearPalabra = function () {
      const palabraArray = [...palabra.toUpperCase()];
      for (let i = 0; i < palabraArray.length; i++) {
        const letra = document.createElement('span');
        letra.className = `letra ${palabraArray[i].toLowerCase()}`;
        letra.innerHTML = '_';
        document.getElementById('adivinar').appendChild(letra);
      }
    };
    crearPalabra();

    // Win - Loose

    const ganar = function () {
      document.querySelector('.win').classList.remove('hidden');
      document.querySelector('.exit1').addEventListener('click', function () {
        selectSecondScreen.classList.add('hidden');
        selectFristScreen.classList.remove('hidden');
        document.querySelector('.win').classList.add('hidden');
        reset();
        initializer();
      });
      document.querySelector('.retry1').addEventListener('click', function () {
        document.querySelector('.win').classList.add('hidden');
        reset();
        initializer();
      });
    };

    const loose = function () {
      document.querySelector('.loose').classList.remove('hidden');
      document.querySelector('.exit2').addEventListener('click', function () {
        selectSecondScreen.classList.add('hidden');
        selectFristScreen.classList.remove('hidden');
        document.querySelector('.loose').classList.add('hidden');
        reset();
        initializer();
      });
      document.querySelector('.retry2').addEventListener('click', function () {
        document.querySelector('.loose').classList.add('hidden');
        reset();
        initializer();
      });
    };

    //Set score
    selectActual.innerHTML = score;

    //Creacion de los botones de letras

    const letrasBotones = function () {
      for (let i = 0; i < abcdario.length; i++) {
        const letters = document.createElement('button');
        letters.className = `letter`;
        letters.setAttribute('id', abcdario[i]);
        letters.innerHTML = abcdario[i].toUpperCase();
        document.getElementById('abc').appendChild(letters);
        let letraActualID = document.getElementById(abcdario[i]);
        // Funcionamiento del click!
        letraActualID.addEventListener('click', function () {
          letraActualID.classList.add('cross');
          letraActualID.disabled = true;
          let letraActual = letraActualID.innerText.toLowerCase();
          let letraActualClass = document.getElementsByClassName(letraActual);
          if (letraActualClass.length >= 1) {
            //Recorre el htmldocument
            for (let x = 0; x < letraActualClass.length; x++) {
              letraActualClass[x].innerText = letraActual.toUpperCase();
              if (vidas > 0) {
                contadorWin++;
                score += 100;
                selectActual.innerHTML = score;
              }

              if (contadorWin == palabra.length) {
                if (score > maxScore) {
                  maxScore = score;
                  selectMasAlta.textContent = maxScore;
                }
                ganar();
              }
            }
            //Quitar vidas si fallas
          } else {
            if (vidas === 0) {
              loose();
            } else {
              vidas -= 1;
              if (score > 0) score -= 100;
              selectVidas.innerHTML = vidas;
              selectActual.innerHTML = score;
            }
          }

          console.log(letraActualClass);
          console.log(letraActual);
        });
      }
    };
    letrasBotones();
  };

  const reset = function () {
    const adivinar = document.getElementById('adivinar');
    const abc = document.getElementById('abc');
    adivinar.innerHTML = '';
    abc.innerHTML = '';
  };

  jugar();
};

window.onload = initializer;
