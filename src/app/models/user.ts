export class User {
constructor(
  public _id: string, // con esto se asigna una propiedad al constructor de la clase
  public name: string,
  public email: string,
  public password: string,
  public role: string,
  public image: string
) {
}
}
