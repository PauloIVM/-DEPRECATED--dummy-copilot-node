export interface IFactory<D, O> {
    create(DTO: D): O;
}
