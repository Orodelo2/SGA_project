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
import {DocenteModel} from '../models';
import {DocenteModelRepository} from '../repositories';

export class DocenteController {
  constructor(
    @repository(DocenteModelRepository)
    public docenteModelRepository : DocenteModelRepository,
  ) {}

  @post('/docentes')
  @response(200, {
    description: 'DocenteModel model instance',
    content: {'application/json': {schema: getModelSchemaRef(DocenteModel)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DocenteModel, {
            title: 'NewDocenteModel',
            exclude: ['id'],
          }),
        },
      },
    })
    docenteModel: Omit<DocenteModel, 'id'>,
  ): Promise<DocenteModel> {
    return this.docenteModelRepository.create(docenteModel);
  }

  @get('/docentes/count')
  @response(200, {
    description: 'DocenteModel model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(DocenteModel) where?: Where<DocenteModel>,
  ): Promise<Count> {
    return this.docenteModelRepository.count(where);
  }

  @get('/docentes')
  @response(200, {
    description: 'Array of DocenteModel model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(DocenteModel, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(DocenteModel) filter?: Filter<DocenteModel>,
  ): Promise<DocenteModel[]> {
    return this.docenteModelRepository.find(filter);
  }

  @patch('/docentes')
  @response(200, {
    description: 'DocenteModel PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DocenteModel, {partial: true}),
        },
      },
    })
    docenteModel: DocenteModel,
    @param.where(DocenteModel) where?: Where<DocenteModel>,
  ): Promise<Count> {
    return this.docenteModelRepository.updateAll(docenteModel, where);
  }

  @get('/docentes/{id}')
  @response(200, {
    description: 'DocenteModel model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(DocenteModel, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(DocenteModel, {exclude: 'where'}) filter?: FilterExcludingWhere<DocenteModel>
  ): Promise<DocenteModel> {
    return this.docenteModelRepository.findById(id, filter);
  }

  @patch('/docentes/{id}')
  @response(204, {
    description: 'DocenteModel PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DocenteModel, {partial: true}),
        },
      },
    })
    docenteModel: DocenteModel,
  ): Promise<void> {
    await this.docenteModelRepository.updateById(id, docenteModel);
  }

  @put('/docentes/{id}')
  @response(204, {
    description: 'DocenteModel PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() docenteModel: DocenteModel,
  ): Promise<void> {
    await this.docenteModelRepository.replaceById(id, docenteModel);
  }

  @del('/docentes/{id}')
  @response(204, {
    description: 'DocenteModel DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.docenteModelRepository.deleteById(id);
  }
}
