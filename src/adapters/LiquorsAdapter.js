class LiquorsAdapter {
    constructor() {
        this.baseUrl = 'https://localhost:3000/api/v1/liquors'
    }

    getLiquors() {
        return fetch(this.baseUrl)
        .then(res => res.json())
    }
}