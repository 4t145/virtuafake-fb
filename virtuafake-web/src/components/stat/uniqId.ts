class UniqId {
    id: number = 0
    get(): number {
        this.id += 1 
        return this.id
    }
}

export const uniqId = new UniqId()