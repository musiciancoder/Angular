export class Album {
  constructor(
    public title: string, // con esto se asigna una propiedad al constructor de la clase
    public description: string,
    public year: number,
    public image: string,
    public artist: string
  ) {
  }
}
