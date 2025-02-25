export interface Plato {
  id: number;
  nombre: string;
}

export interface Cocinero {
  id: number;
  nombre: string;
  especialidad: string;
  platos: Plato[];
}
