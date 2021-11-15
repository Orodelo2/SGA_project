import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  AsignaturaModel,
  DocenteModel,
} from '../models';
import {AsignaturaModelRepository} from '../repositories';

export class AsignaturaModelDocenteModelController {
  constructor(
    @repository(AsignaturaModelRepository) protected asignaturaModelRepository: AsignaturaModelRepository,
  ) { }

  @get('/asignatura-models/{id}/docente-models', {
    responses: {
      '200': {
        description: 'Array of AsignaturaModel has many DocenteModel',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DocenteModel)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<DocenteModel>,
  ): Promise<DocenteModel[]> {
    return this.asignaturaModelRepository.asignatura_docente(id).find(filter);
  }

  @post('/asignatura-models/{id}/docente-models', {
    responses: {
      '200': {
        description: 'AsignaturaModel model instance',
        content: {'application/json': {schema: getModelSchemaRef(DocenteModel)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof AsignaturaModel.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DocenteModel, {
            title: 'NewDocenteModelInAsignaturaModel',
            exclude: ['id'],
            optional: ['asignaturaModelId']
          }),
        },
      },
    }) docenteModel: Omit<DocenteModel, 'id'>,
  ): Promise<DocenteModel> {
    return this.asignaturaModelRepository.asignatura_docente(id).create(docenteModel);
  }

  @patch('/asignatura-models/{id}/docente-models', {
    responses: {
      '200': {
        description: 'AsignaturaModel.DocenteModel PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DocenteModel, {partial: true}),
        },
      },
    })
    docenteModel: Partial<DocenteModel>,
    @param.query.object('where', getWhereSchemaFor(DocenteModel)) where?: Where<DocenteModel>,
  ): Promise<Count> {
    return this.asignaturaModelRepository.asignatura_docente(id).patch(docenteModel, where);
  }

  @del('/asignatura-models/{id}/docente-models', {
    responses: {
      '200': {
        description: 'AsignaturaModel.DocenteModel DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(DocenteModel)) where?: Where<DocenteModel>,
  ): Promise<Count> {
    return this.asignaturaModelRepository.asignatura_docente(id).delete(where);
  }
}
