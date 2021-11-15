import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  DocenteModel,
  AsignaturaModel,
} from '../models';
import {DocenteModelRepository} from '../repositories';

export class DocenteModelAsignaturaModelController {
  constructor(
    @repository(DocenteModelRepository)
    public docenteModelRepository: DocenteModelRepository,
  ) { }

  @get('/docente-models/{id}/asignatura-model', {
    responses: {
      '200': {
        description: 'AsignaturaModel belonging to DocenteModel',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(AsignaturaModel)},
          },
        },
      },
    },
  })
  async getAsignaturaModel(
    @param.path.string('id') id: typeof DocenteModel.prototype.id,
  ): Promise<AsignaturaModel> {
    return this.docenteModelRepository.asignaturaModel(id);
  }
}
