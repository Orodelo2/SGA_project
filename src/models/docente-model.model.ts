import {Entity, model, property, belongsTo} from '@loopback/repository';
import {AsignaturaModel} from './asignatura-model.model';

@model()
export class DocenteModel extends Entity {
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
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  tipoDoc: string;

  @property({
    type: 'string',
    required: true,
  })
  numDoc: string;

  @property({
    type: 'number',
    required: true,
  })
  tipoContrato: number;

  @property({
    type: 'string',
    required: true,
  })
  profesion: string;

  @belongsTo(() => AsignaturaModel)
  asignaturaModelId: string;

  constructor(data?: Partial<DocenteModel>) {
    super(data);
  }
}

export interface DocenteModelRelations {
  // describe navigational properties here
}

export type DocenteModelWithRelations = DocenteModel & DocenteModelRelations;
