/*
 * Плагин jquery для постраничного отображения списка элементов.
 * Под отображаемой частью списка элментов кнопка "Показать еще".
 *
 * Пример использования:
 * $('#pager').one_button_paginator({
 *      per_page: 5,
 *      label: 'Показать еще',
 *      element: '#object-list li', // уникальный селектор, чтобы отображал именно строки из нужного контейнера
 * });
 *
 */

(function($) {
	$.fn.extend({
		one_button_paginator: function(options) {
			var settings = $.extend({
				per_page: 30,
				label: 'Показать еще',
				element: '', // уникальный селектор, чтобы отображал именно строки из нужного контейнера
			}, options);

			return this.each(function() {
				// скрываем все элементы
				$(settings.element).hide();

				// показываем элементы первой партии
				show_more();

				var container = $(this).addClass('pager');
				container.empty();
				var button = $('<div/>', {
					class: "more",
					text: settings.label,
				});
				container.append(button);

                // вешаем обработчик на кнопку, 
                // чтобы при клике по ней отображалась следующая партия элементов
				button.bind('click', function() {
					show_more();
				});

				function show_more() {
					$(settings.element).filter(':hidden').slice(0, settings.per_page).show();
					// если скрытых элементов больше нет, то кнопку скрываем
					if ( ! $(settings.element).filter(':hidden').length) button.hide();
				};
			});
		}
	});

})(jQuery);
