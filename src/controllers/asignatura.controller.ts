import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {AsignaturaModel} from '../models';
import {AsignaturaModelRepository} from '../repositories';

export class AsignaturaController {
  constructor(
    @repository(AsignaturaModelRepository)
    public asignaturaModelRepository : AsignaturaModelRepository,
  ) {}

  @post('/asignaturas')
  @response(200, {
    description: 'AsignaturaModel model instance',
    content: {'application/json': {schema: getModelSchemaRef(AsignaturaModel)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AsignaturaModel, {
            title: 'NewAsignaturaModel',
            exclude: ['id'],
          }),
        },
      },
    })
    asignaturaModel: Omit<AsignaturaModel, 'id'>,
  ): Promise<AsignaturaModel> {
    return this.asignaturaModelRepository.create(asignaturaModel);
  }

  @get('/asignaturas/count')
  @response(200, {
    description: 'AsignaturaModel model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AsignaturaModel) where?: Where<AsignaturaModel>,
  ): Promise<Count> {
    return this.asignaturaModelRepository.count(where);
  }

  @get('/asignaturas')
  @response(200, {
    description: 'Array of AsignaturaModel model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AsignaturaModel, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AsignaturaModel) filter?: Filter<AsignaturaModel>,
  ): Promise<AsignaturaModel[]> {
    return this.asignaturaModelRepository.find(filter);
  }

  @patch('/asignaturas')
  @response(200, {
    description: 'AsignaturaModel PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AsignaturaModel, {partial: true}),
        },
      },
    })
    asignaturaModel: AsignaturaModel,
    @param.where(AsignaturaModel) where?: Where<AsignaturaModel>,
  ): Promise<Count> {
    return this.asignaturaModelRepository.updateAll(asignaturaModel, where);
  }

  @get('/asignaturas/{id}')
  @response(200, {
    description: 'AsignaturaModel model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AsignaturaModel, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(AsignaturaModel, {exclude: 'where'}) filter?: FilterExcludingWhere<AsignaturaModel>
  ): Promise<AsignaturaModel> {
    return this.asignaturaModelRepository.findById(id, filter);
  }

  @patch('/asignaturas/{id}')
  @response(204, {
    description: 'AsignaturaModel PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AsignaturaModel, {partial: true}),
        },
      },
    })
    asignaturaModel: AsignaturaModel,
  ): Promise<void> {
    await this.asignaturaModelRepository.updateById(id, asignaturaModel);
  }

  @put('/asignaturas/{id}')
  @response(204, {
    description: 'AsignaturaModel PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() asignaturaModel: AsignaturaModel,
  ): Promise<void> {
    await this.asignaturaModelRepository.replaceById(id, asignaturaModel);
  }

  @del('/asignaturas/{id}')
  @response(204, {
    description: 'AsignaturaModel DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.asignaturaModelRepository.deleteById(id);
  }
}
