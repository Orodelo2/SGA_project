import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {SgaMongodbDataSource} from '../datasources';
import {AsignaturaModel, AsignaturaModelRelations, DocenteModel} from '../models';
import {DocenteModelRepository} from './docente-model.repository';

export class AsignaturaModelRepository extends DefaultCrudRepository<
  AsignaturaModel,
  typeof AsignaturaModel.prototype.id,
  AsignaturaModelRelations
> {

  public readonly asignatura_docente: HasManyRepositoryFactory<DocenteModel, typeof AsignaturaModel.prototype.id>;

  constructor(
    @inject('datasources.sga_mongodb') dataSource: SgaMongodbDataSource, @repository.getter('DocenteModelRepository') protected docenteModelRepositoryGetter: Getter<DocenteModelRepository>,
  ) {
    super(AsignaturaModel, dataSource);
    this.asignatura_docente = this.createHasManyRepositoryFactoryFor('asignatura_docente', docenteModelRepositoryGetter,);
    this.registerInclusionResolver('asignatura_docente', this.asignatura_docente.inclusionResolver);
  }
}
