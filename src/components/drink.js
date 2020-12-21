class Drink {
    constructor(drink) {
      this.id = drink.id
      this.name = drink.name
      this.flavor = drink.flavor
      this.ingredient = drink.ingredient
      this.prep = drink.prep
      this.image = drink.image
      this.liquors = this.getLiquorNames(drink.liquors)
    }

    getLiquorNames(liquors) {
        return liquors.map(l => l.name).join(', ')
    }

    drinkHTML() {
       return(`
       <div class="card-group">
       <div name='drink-card' class='drink-card card border-secondary mb-3 card-body' data-id='${this.id}' data-toggle="modal" data-target="#myModal">
           <div class="card-header"><h5>${this.name}</h5></div></br>
           <img class='drink-pic' src='${this.image}'/></br>
           <button name='delete-card' class="delete-button btn btn-secondary btn-sm">Delete</button>
       </div>
   </div>         
       `)
    }
}