// Storage Controller

const StorageCtrl = (function (){
    return {
        storeItem: function (item){
            let items;
            if (localStorage.getItem('items') === null){
                items = [];
                items.push(item);
                localStorage.setItem('items', JSON.stringify(items));
            } else {
                items = JSON.parse(localStorage.getItem('items'));
                items.push(item);
                localStorage.setItem('items', JSON.stringify(items))
            }
        },
        getItemsFromStorage: function (){
            let items;
                if (localStorage.getItem('items') === null) {
                    items = []
                } else {
                    items = JSON.parse(localStorage.getItem('items'));
                }
                return items;
        },
        updateItemStorage: function (updatedItem) {
            let items = JSON.parse(localStorage.getItem("items"));
            items.forEach((item, index) => {
                if (updatedItem.id === item.id) {
                    items.splice(index, 1, updatedItem);
                }
            });
            localStorage.setItem("items", JSON.stringify(items));
        },
        deleteItemStorage: function (itemToDeleteID) {
            let items = JSON.parse(localStorage.getItem("items"));
            items.forEach((item, index) => {
                if (itemToDeleteID === item.id) {
                    items.splice(index, 1);
                }
            });
            localStorage.setItem("items", JSON.stringify(items));
        },
    }
})();

// Item Controller
const ItemCtrl = (function (){
    const Item = function (id, name, calories){
        this.id = id
        this.name = name
        this.calories = calories
    }

    const data = {
        items: [],
        total: 0,
        currentItem: 0
    }

    return {
        getItems: function (){
            return data.items
        },
        addItem: function (name, calories){
            let ID;
            if (data.items.length > 0){
                ID = data.items[data.items.length - 1].id + 1
            } else {
                ID = 0
            }
            calories = parseInt(calories);
            newItem = new Item(ID, name, calories);
            data.items.push(newItem);
            return newItem
        },
        getTotalCalories: function (){
            let total = 0;
            data.items.forEach(function (item){
              total = total + item.calories;
          });
            data.total = total;
            console.log(data.total)
            return data.total
        },
        logData: function (){
            return data
        },
        getItemByID: function (id) {
            let found = null;
            data.items.forEach((item) => {
                if (item.id === id) {
                    found = item;
                }
            });
            return found;
        },
        updateItemByID: function (id, name, calories) {
            let updatedItem = null;
            data.items.forEach((item) => {
                if (item.id === id) {
                    item.name = name;
                    item.calories = parseInt(calories);
                    updatedItem = item;
                }
            });
            return updatedItem;
        },
        setCurrentItem: function (item) {
            data.currentItem = item;
            console.log(item)
        },
        getCurrentItem: function () {
            return data.currentItem;
        },
        updateCurrentItem: function (id, name, calories) {
            let updatedItem = null;
            data.items.forEach((item) => {
                if (item.id === id) {
                    item.name = name;
                    item.calories = parseInt(calories);
                    updatedItem = item;
                }
            });
            return updatedItem;
        },
        itemToBeDeleted: function (id) {
            //Get id's
            const ids = data.items.map((item) => {
                return item.id;
            });
            const index = ids.indexOf(id);

            //Remove item
            data.items.splice(index, 1);
        },
    }
})();

// UI Controller
const UICtrl = (function (){
    const UISelectors = {
        itemList: '#item-list',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        addBtn: '.add-btn',
        totalCalories: '.total-calories',
        secondBtn: '.second-btn',
        deleteBtn: ".delete-btn"
    }
    return {
        populateItemList: function (items){
            let html = '';

            items.forEach(function(item){
                html += `<li class="collection-item" id="item-${item.id}">
        		<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        		<a href="#" class="secondary-content">
          			<i class="edit-item fa fa-pencil"></i>
        		</a>
      			</li>`;
            });

            // insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        clearEditState: function () {
            UICtrl.clearInput();
            document.querySelector(UISelectors.secondBtn).style.display = "none";
            document.querySelector(UISelectors.addBtn).style.display = "inline";
            document.querySelector(UISelectors.deleteBtn).style.display = "none";
        },
        showEditState: function () {
            document.querySelector(UISelectors.secondBtn).style.display = "inline";
            document.querySelector(UISelectors.addBtn).style.display = "none";
            document.querySelector(UISelectors.deleteBtn).style.display = "inline";
        },
        getSelectors: function (){
            return UISelectors;
        },
        getItemInput: function (){
            return {
                name:document.querySelector(UISelectors.itemNameInput).value,
                calories:document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        addListItem: function (item) {
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.id = `item-${item.id}`;
            li.innerHTML = `<strong>${item.name}: </strong>
                <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                </a>`;
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
        },
        removeLiItem: function (id) {
            const itemID = `#item-${id}`;
            const item = document.querySelector(itemID);
            item.remove();
        },
        addItemToForm: function () {
            const currentItem = ItemCtrl.getCurrentItem();
            document.querySelector(UISelectors.itemNameInput).value = currentItem.name;
            document.querySelector(UISelectors.itemCaloriesInput).value = currentItem.calories;
            UICtrl.showEditState();
        },
        updateListItem: function (item) {
            const listItems = document.querySelectorAll("#item-list li");
            const listItemsConvert = Array.from(listItems);
            listItemsConvert.forEach((li) => {
                const liID = li.getAttribute("id");
                if (liID === `item-${parseInt(item.id)}`) {
                    li.innerHTML = `
            <strong>${item.name}</strong>: <em>${item.calories} calories</em>
            <a href=3"" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i></a>`;
                }
            });
        },
        updateTotCalories: function (totalCal) {
            document.querySelector(UISelectors.totalCalories).innerHTML = totalCal;
        },

        clearInput: function () {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        showTotalCalories: function (totalCalories){
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },
        hideBtn: function (event) {
            if (event.target.className === 'edit-item fa fa-pencil') {
                document.querySelector(UISelectors.addBtn).style.display = 'none'
                document.querySelector(UISelectors.secondBtn).style.display = 'block'

            }
        },
        itemEditClick: function (event) {
            if (event.target.classList.contains('edit-item')) {
                const listID = event.target.parentNode.parentNode.id
                const listIDArray = listID.split('-')
                const id = parseInt(listIDArray[1])
                const itemToEdit = ItemCtrl.getItemByID(id)
                ItemCtrl.setCurrentItem(itemToEdit)
                UICtrl.addItemToForm()
            }
            event.preventDefault()
        },
        itemUpdateSubmit: function (event) {
            const input = UICtrl.getItemInput();
            const itemId = ItemCtrl.getCurrentItem().id;

            const updatedItemSubmit = ItemCtrl.updateItemByID(
                itemId,
                input.name,
                input.calories
            );
            UICtrl.updateListItem(updatedItemSubmit);
            const totalCal = ItemCtrl.getTotalCalories();
            UICtrl.updateTotCalories(totalCal);
            UICtrl.clearEditState();
            StorageCtrl.updateItemStorage(updatedItemSubmit);
            UICtrl.clearInput();
            event.preventDefault();
        },


    }
})();

// App Controller
const App = (function(ItemCtrl, StorageCtrl, UICtrl){
    const loadEventListeners = function (){
        const UISelectors = UICtrl.getSelectors();
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
        document.addEventListener('DOMContentLoaded', getItemsFromStorage)
        document.addEventListener('click', UICtrl.editBtn)
        document.addEventListener('click', UICtrl.hideBtn)
        document.addEventListener('click', UICtrl.itemEditClick)
        document.querySelector(UISelectors.secondBtn).addEventListener("click", UICtrl.itemUpdateSubmit)
        document.querySelector(UISelectors.deleteBtn).addEventListener("click", deleteItem);
    }

    const itemAddSubmit = function (event){
        const input = UICtrl.getItemInput()
        if (input.name !== '' && input.calories !== ''){
            const newItem = ItemCtrl.addItem(input.name, input.calories)
            UICtrl.addListItem(newItem);
            const totalCalories = ItemCtrl.getTotalCalories();
            UICtrl.showTotalCalories(totalCalories);
            StorageCtrl.storeItem(newItem);
            UICtrl.clearInput();
        }
        event.preventDefault()
    }
    const deleteItem = function (event) {
        const itemToDeleteID = ItemCtrl.getCurrentItem().id;
        ItemCtrl.itemToBeDeleted(itemToDeleteID);
        UICtrl.removeLiItem(itemToDeleteID);
        const totalCal = ItemCtrl.getTotalCalories();
        UICtrl.updateTotCalories(totalCal);
        StorageCtrl.deleteItemStorage(itemToDeleteID);
        UICtrl.clearEditState();
        event.preventDefault();
    };
    const getItemsFromStorage = function (){
        const items = StorageCtrl.getItemsFromStorage()
        items.forEach(function (item){
            ItemCtrl.addItem(item['name'], item['calories'])
        })
        const totalCalories = ItemCtrl.getTotalCalories()
        UICtrl.showTotalCalories(totalCalories)
        UICtrl.populateItemList(items)
    }

    return {
        init: function (){
            UICtrl.clearEditState()
            console.log('Initializing App')
            const items = ItemCtrl.getItems()
            UICtrl.populateItemList(items)
            loadEventListeners()
        }
    }
})(ItemCtrl, StorageCtrl, UICtrl);

App.init()