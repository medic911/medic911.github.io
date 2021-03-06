(function(){
    "use strict";

    // import
    let Component = window.Component;

    /**
     * @class Menu
     * Компонент меню
     */
    class Menu extends Component {

        /**
         * @inheritDoc
         */
        constructor(options) {
            super(options);
            this.on('click', this._onClick);
        }

        /**
         * Удаление пункта меню
         *
         * @param {Object} removedItem - пункт меню для удаления
         */
        removeItem(removedItem) {
            this.data.items = this.data.items.filter((item, index) => {
                return index !== removedItem.index;
            });
            this.render();
        }

        /**
         * Добавление пункта меню
         *
         * @param {string} anchor    - название
         * @param {string} href      - адрес
         */
        addItem(anchor, href) {
            if(!this.data.items) {
                this.data.items = [];
            }

            this.data.items.push({
                anchor: anchor,
                href: href
            });
            this.render();

            this.trigger('item.add', []);
        }

        /**
         * Обновление пункта меню
         *
         * @param {string} anchor   - название
         * @param {string} href     - ссылка
         * @param {string} index    - инедекс
         */
        updateItem(anchor, href, index) {
            this.data.items[index] = {
                anchor: anchor,
                href: href
            };

            this.render();

            this.trigger('items.update', []);
        }

        /**
         * Обновление пунктов меню
         *
         * @param {Object} items - список элементов
         */
        updateData(data) {
            this.data = data;
            this.render();
        }

        /**
         * Регистрация события "удаление пункта меню"
         *
         * @param {Object} item - удаляемый элемент
         * @private
         */
        _onRemoveItem(item) {
            let index = parseInt(item.parentNode.dataset.index, 10);
            this.trigger('item.remove', {index});
        }

        /**
         * Регистрация события "выбор пункта меню"
         *
         * @param {Object} item - выбранный пункт меню
         * @private
         */
        _pickItem(item) {
            this.trigger('item.pick', {
                href: item.getAttribute('href'),
                anchor: item.textContent,
                index: item.parentNode.dataset.index
            });
        }

        /**
         * Регистрация события "редактирование пункта меню"
         *
         * @param {Object} item - выбранный пункт меню
         * @private
         */
        _editItem(item) {
            this.trigger('item.edit', {
                href: item.getAttribute('href'),
                anchor: item.textContent,
                index: item.parentNode.dataset.index
            });
        }

        /**
         * Обработчик события "клик"
         *
         * @param {Object} event - объект события
         * @private
         */
        _onClick(event) {
            event.preventDefault();
            let item = event.target;

            switch (item.dataset.action) {
                case 'remove':
                    this._onRemoveItem(item);
                    break;
                case 'pick':
                    this._pickItem(item.querySelector(`a`));
                    break;
                case 'edit':
                    this._editItem(item.parentNode.querySelector(`a`));
                    break;
            }
        }
    }

    // export
    window.Menu = Menu;

})(window);
