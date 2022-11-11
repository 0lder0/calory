// Storage Controller

// Item Controller
const ItemCtrl = (function (){
    const Item = function (id, name, calories){
        this.id = id
        this.name = name
        this.calories = calories
    }

    const data = {
        items: [
            {id: 0, name: 'Steak Dinner', calories: 1200},
            {id: 0, name: 'Cookie', calories: 400},
            {id: 0, name: 'Eggs', calories: 300},
        ],
        total: 0
    }

    return {
        logData: function (){
            return data
        }
    }
})();

// UI Controller
const UICtrl = (function (){
    console.log('UICtrl')
})();

// App Controller
const App = (function(ItemCtrl, UICtrl){
    return {
        init: function (){
            console.log('Initializing App')
        }
    }
})(ItemCtrl, UICtrl);

App.init()