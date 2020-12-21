class DrinksAdapter {
    constructor() {
        this.baseUrl = 'https://localhost:3000/api/v1/drinks'
    }

    getDrinks() {
        return fetch(this.baseUrl)
        .then(res => res.json())
    }

   async createDrinkDB(params) {
        let drinkData = {
            name: params[0],
            liquor: params[1],
            flavor: params[2],
            ingredient: params[3] ,
            prep: params[4],
            image: params[5]
        }

        return fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(drinkData)
        })
            .then(resp => resp.json())
    }

    showInfo(drinkDataId) {
        let configObj = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        return fetch(this.baseUrl + `/${drinkDataId}`, configObj)
            .then(resp => resp.json())
    }
    


    destroyDrinkId(drinkId) { 
        let configObj = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        return fetch(this.baseUrl + `/${drinkId}`, configObj)
            .then(resp => resp.json())
    }

}