class Drinks {
    constructor() {
        this.drinks = []
        this.adapter = new DrinksAdapter()
        this.addBindingAndEventListeners()
        this.fetchAndLoadDrinks()
    }

    addBindingAndEventListeners() {
        this.container = document.querySelector('#drinks-container')
        // form fields
        this.drinkForm = document.querySelector('#new-drink-form')
        this.inputLiquor = this.drinkForm.querySelector('#input-liquor')
        this.drinkName = this.drinkForm.querySelector('#name')
        this.drinkFlavor = this.drinkForm.elements.flavor
        this.drinkIngredients = this.drinkForm.querySelector('#input-ingredients')
        this.drinkPreparation = this.drinkForm.querySelector('#input-prep')
        this.drinkImage = this.drinkForm.querySelector('#image')
        this.drinkForm.addEventListener('submit', this.createDrink.bind(this)) // submit btn to add drink
        this.showContainer = document.querySelector('#show-container')
    }
    
    createDrink(e) {
        e.preventDefault()
        const name = this.drinkName.value
        const liquor = this.inputLiquor.value
        const flavor = this.drinkFlavor.value
        const ingredient = this.drinkIngredients.value
        const prep = this.drinkPrep.value
        const image = this.drinkImage.value
        const params = [name, liquor, flavor, ingredient, prep, image]

        this.adapter.createDrinkDB(params)
            .then(drink => {
                this.drinks.push(new Drink(drink.data.attributes))
                this.renderDrinks()
            })
        this.drinkName.value = ''
        this.inputLiquor.value = ''
        this.drinkFlavor.value = ''
        this.drinkIngredients.value = ''
        this.drinkPrep.value = ''
        this.drinkImage.value = ''
    }

    fetchAndLoadDrinks() {
        this.adapter
            .getDrinks()
            .then(drinks => {
                for(const drink of drinks) {
                    // debugger
                    let drinkObj = {
                        id: drink.id,
                        liquors: drink.liquors,
                        name: drink.name,
                        flavor: drink.flavor,
                        ingredient: drink.ingredient,
                        preparation: drink.prep,
                        image: drink.image
                    }
                    let newDrink = new Drink(drinkObj)
                    this.drinks.push(newDrink)
                }
            })
            .then(() => this.renderDrinks())            
    }

    renderDrinks() {
        this.container.innerHTML = this.drinks.map(drink => drink.drinkHTML()).join('')   
        this.container.addEventListener('click', (e) => {
            e.preventDefault()
            if(e.target.classList.contains('delete-button')) {
            let drinkId = e.target.parentElement.getAttribute("data-id")
            this.deleteDrink(drinkId)               
            } 
        })
        this.container.addEventListener('click', (e) => {
            e.preventDefault()
            // debugger
            if(e.target.classList.contains('drink-pic')) {
            let dId = e.target.parentElement.getAttribute("data-id")
            this.showInfo(dId)
            }         
        })
    }

    showInfo(dId) {
        let drinkDataId = parseInt(dId, 10)
        this.adapter
            .showInfo(drinkDataId)
            .then(drink => this.showDrink(drink))
    }

    // NEEDS TO BE REFACTORED!!!
    showDrink(drink) {
        this.showContainer.innerHTML = `<div class='card mb-3' drink-id='${drink.data.attributes.id}'>
        <div class="row no-gutters">
            <div class="col-md-4">
                <img src="${drink.data.attributes.image}" class="card-img" >
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <button type="button" class="close" data-dismiss="modal">&times;</button> 
                    <h4 class="card-title">Name: ${drink.data.attributes.name}</h4>
                    <p class="card-text">Flavor: ${drink.data.attributes.flavor}</p>
                    <p class="card-text">Ingredients: ${drink.data.attributes.ingredient}</p>
                    <p class="card-text">Preparation: ${drink.data.attributes.prep}</p>
                    <p class="card-text">Liquors: ${drink.data.attributes.liquors.map(l => l.name).join(', ')}</p>
                </div>
            </div>
        </div>
        </div>`
    }

    deleteDrink(drinkId) {
        let parsedId = parseInt(drinkId, 10)
        // debugger
        // remove from db
        this.adapter
            .destroyDrinkId(parsedId)
        // remove from JS ObjectsArray
        let removeIndex = this.drinks.map(function(d){          
                return d.id
            }).indexOf(parsedId)
        this.drinks.splice(removeIndex, 1)
        // remove from DOM
        document.querySelector('[data-id="' + drinkId + '"]').parentElement.remove()
        // parentNode.remove()
    }
}