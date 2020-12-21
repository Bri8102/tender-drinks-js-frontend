class Liquor {
    constructor(liquor) {
        this.id = liquor.id
        this.name = liquor.name
        this.alcohol = liquor.alcohol
        this.drinks = liquor.drinks.map(d => d.name).join(', ')      
    }

    liquorHTML() {
        return (`
            <div id='liquor-container' class='liquor-container card-body border border-secondary' liquor-id='${this.id}'>
                <h4>Liquor: ${this.name}</h4></br>
                <p>Alcohol Content: ${this.alcohol} alcohol by volume (ABV)</p>
                <p>Drinks: ${this.drinks}</p>
            </div>          
        `)
    }
}