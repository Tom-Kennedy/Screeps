interface Role {
    readonly id: string
    generateBody(capacity:number): BodyPartConstant[]
    run(creep: Creep): boolean
}
