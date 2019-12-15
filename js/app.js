class App
{
    constructor()
    {
        this._idFunc = 0;
        this._arrayFunct = new Array();
        console.log(this.getVersion());
    }

    getVersion() {
        return '1.0' + ' ' + this.getAutor();
    }

    getAutor()
    {
        return 'D'+'i'+'v'+'i'+'n'+' '+'S'+'e'+'r'+'g'+'e'+'y'
    }

    /**
     * Метод отображает выбранный блок только над другим блоком
     * @param aboveBlock - другой блок
     * @param idBlock - выбранный блок
     */
    blockShowAboveBlock(aboveBlock, idBlock)
    {
        this._arrayFunct[++this._idFunc] = function () {
            $(document).on('scroll', function() {
                $(aboveBlock).each(function() {
                    if ($(document).scrollTop()) {
                        $(idBlock).animate({height: 'show'}, 500)
                    } else {
                        $(idBlock).animate({height: 'hide'}, 500);
                    }
                });
            });
        }
    }

    blockHide(idBlock,idBlockButton)
    {
        this._arrayFunct[++this._idFunc] = function () {

            $(idBlockButton).bind( 'click', function () {
                $(idBlock).animate({height: 'hide'}, 1500);
            });
        }
    }

    blockShow(idBlock,idBlockButton)
    {
        this._arrayFunct[++this._idFunc] = function () {

            $(idBlockButton).bind( 'click', function () {
                $(idBlock).show();
                $('body,html').animate({scrollTop: $(idBlockButton).offset().top}, 2000);
            });
        }
    }

    /**
     * Метод позволяет плавно переместиться к компонентам меню
     * @param idBlock ID блока меню
     * @param duration скорость
     */
    smooth(idBlock, duration)
    {
        this._arrayFunct[++this._idFunc] = function () {
            $(idBlock).on("click","a", function (event){
                event.preventDefault();
                var id  = $(this).attr('href'),
                    top = $(id).offset().top;
                $('body,html').animate({scrollTop: top}, duration);
            });
        }
    }

    /**
     * Блокировка правой кнобки мыши. только от лохов!
     */
    blockOnContextMenu()
    {
        this._arrayFunct[++this._idFunc] = function () {
            document.oncontextmenu=new Function("return false;");
        };
    }

    progressBar(idBlock)
    {
        this._arrayFunct[++this._idFunc] = function () {

            var setValue = function () {
                var arrProgressBar = $(idBlock);
                var valueMin = arrProgressBar.attr('aria-valuemin');
                var valueMax = arrProgressBar.attr('aria-valuenow');
                var time = 50;

                var loading = function() {
                    valueMin = Number.parseInt(valueMin);
                    valueMin++;
                    arrProgressBar.html(valueMin + '%');
                    arrProgressBar.css('width', valueMin + '%');

                    if (valueMin == valueMax) {
                        clearInterval(animate);
                    }
                };

                var animate = setInterval(function() {
                    loading();
                }, time);
            };

            $(document).on('scroll', function() {
                $('#skills').each(function() {
                    if ($(document).scrollTop()) {
                        setValue();
                    }
                });
            });
        }
    }

    /**
     * Данный метод вызывается последним. И прозводит запуск :) Надеюсь поянтно все
     */
    start()
    {
        var arrayFunc = this._arrayFunct;

        window.onload = function () {
            for (var i = 0; i < arrayFunc.length; i++) {
                if (typeof arrayFunc[i] === 'function') {
                    arrayFunc[i]();
                }
            }
        };
    }
}