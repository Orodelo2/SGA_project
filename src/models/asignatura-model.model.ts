import {Entity, model, property, hasMany} from '@loopback/repository';
import {DocenteModel} from './docente-model.model';

@model()
export class AsignaturaModel extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'boolean',
    required: true,
  })
  obligatoria: boolean;

  @property({
    type: 'number',
    required: true,
  })
  numCreditos: number;

  @hasMany(() => DocenteModel)
  asignatura_docente: DocenteModel[];

  constructor(data?: Partial<AsignaturaModel>) {
    super(data);
  }
}

export interface AsignaturaModelRelations {
  // describe navigational properties here
}

export type AsignaturaModelWithRelations = AsignaturaModel & AsignaturaModelRelations;
