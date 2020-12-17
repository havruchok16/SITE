//настройка якорей
jQuery(document).ready(function() {
    jQuery("a.scrollto").click(function () {//нажатие на элемент
    elementClick = jQuery(this).attr("href")//идентификатор из href
    destination = jQuery(elementClick).offset().top;//положение-вверх
    jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 1200);
    return false;//прокрутка к нужному блоку за время в мс
    });
});

//слайдер
    var multiItemSlider = (function () {
    return function (selector, config) {
      var
        _mainElement = document.querySelector(selector), // основный элемент блока
        _sliderWrapper = _mainElement.querySelector('.slider_wrapper'), // блок для .slider-item
        _sliderItems = _mainElement.querySelectorAll('.slider_item'), // элементы .slider-item
        _sliderControls = _mainElement.querySelectorAll('.slider_control'), // элементы управления
        _sliderControlLeft = _mainElement.querySelector('.slider_control_left'), // кнопка "LEFT"
        _sliderControlRight = _mainElement.querySelector('.slider_control_right'), // кнопка "RIGHT"
        _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width), // ширина блока
        _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width), // ширина одного элемента    
        _positionLeftItem = 0, // позиция левого активного элемента
        _transform = 0, // значение транфсофрмации .slider_wrapper
        _step = _itemWidth / _wrapperWidth * 100, // величина шага для трансформации
        _items = []; // массив элементов
      // наполнение массива _items
      _sliderItems.forEach(function (item, index) {
        _items.push({ item: item, position: index, transform: 0 });
      });

      var position = {
        getMin: 0,
        getMax: _items.length - 1,
      }

      // трансформация элементов слайдера
      var _transformItem = function (direction) {

        if (direction === 'right') { //вправо
          if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) >= position.getMax) {
            return;
          }
          if (!_sliderControlLeft.classList.contains('slider_control_show')) {
            _sliderControlLeft.classList.add('slider_control_show');
          }
          if (_sliderControlRight.classList.contains('slider_control_show') && (_positionLeftItem + _wrapperWidth / _itemWidth) >= position.getMax) {
            _sliderControlRight.classList.remove('slider_control_show');
          }
          _positionLeftItem++;
          _transform -= _step;
        }
        
        if (direction === 'left') { //влево
          if (_positionLeftItem <= position.getMin) {
            return;
          }
          if (!_sliderControlRight.classList.contains('slider_control_show')) {
            _sliderControlRight.classList.add('slider_control_show');
          }
          if (_sliderControlLeft.classList.contains('slider_control_show') && _positionLeftItem - 1 <= position.getMin) {
            _sliderControlLeft.classList.remove('slider_control_show');
          }
          _positionLeftItem--;
          _transform += _step;
        }
        _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
      }

      // обработчик события click для кнопок "назад" и "вперед"
      var _controlClick = function (e) {
        if (e.target.classList.contains('slider_control')) {
          e.preventDefault();
          var direction = e.target.classList.contains('slider_control_right') ? 'right' : 'left';
          _transformItem(direction);
        }
      };

      var _setUpListeners = function () {
        // добавление к кнопкам "назад" и "вперед" обрботчика _controlClick для событя click
        _sliderControls.forEach(function (item) {
          item.addEventListener('click', _controlClick);
        });
      }

      // инициализация
      _setUpListeners();

      return {
        right: function () { // метод right
          _transformItem('right');
        },
        left: function () { // метод left
          _transformItem('left');
        }
      }

    }
  }());

  var slider = multiItemSlider('.slider')
  
// карта
var map;
var marker;
function initMap ()
  {
  map = new ymaps.Map("yandexmap", {
    center: [53.891211, 27.560142], //координаты центра карты
    zoom: 16 //масштаб карты
    });
  marker = new ymaps.Placemark([53.891211, 27.560142], {
    balloonContent: 'Мы находимся здесь!' //текст на метке
    });
  map.geoObjects.add(marker); //добавление метки
  }
ymaps.ready(initMap);//загрузка API до начала его использования