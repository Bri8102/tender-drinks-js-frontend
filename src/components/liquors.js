class Liquors {
    constructor() {
        this.liquors = []
        this.adapter = new LiquorsAdapter()
        this.addBindingAndEventListeners()
        this.fetchAndLoadLiquor()
    }

    addBindingAndEventListeners() {
        // Dropdown for adding drink
        this.liquorSelect = document.querySelector('#input-liquor')
        this.searchContainer = document.querySelector('#search-container')
        // Dropdown for Liquor Info
        this.liquorInfo = document.querySelector('#search-liquor')
        this.liquorInfo.addEventListener('change', this.findMatch.bind(this))
        this.searchResult = document.querySelector('#search-result')   
    }

    fetchAndLoadLiquor() {
        this.adapter
            .getLiquors()
            .then(liquors => {
                for(const liquor of liquors.data) {
                    let liquorObj = {
                        id: liquor.id,
                        name: liquor.attributes.name,
                        alcohol: liquor.attributes.alcohol,
                        drinks: liquor.attributes.drinks
                    }
                    let newLiquor = new Liquor(liquorObj)
                    this.liquors.push(newLiquor)                  
                }
            })
            .then(() => this.renderLiquorsOptions())
    }

    renderLiquorsOptions() {       
        let options = this.liquors.map(liquor => liquor.name)
        let sortedOptions = options.sort()    
        for(const liquor of sortedOptions) {
           let element = document.createElement('option')
           element.innerText = liquor
           const el2 = element.cloneNode(true)
           this.liquorSelect.appendChild(element) 
           this.liquorInfo.appendChild(el2)
        }    
    }

    findMatch(e) {
        e.preventDefault()
        const input = e.currentTarget.value
        let matchArray = this.liquors.filter(l => l.name.includes(input)) 
        let newLiquorArray = matchArray.map(l => l.liquorHTML()).join('')
        this.searchResult.innerHTML = newLiquorArray
    }
   
}