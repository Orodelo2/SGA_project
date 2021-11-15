import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {SgaMongodbDataSource} from '../datasources';
import {DocenteModel, DocenteModelRelations, AsignaturaModel} from '../models';
import {AsignaturaModelRepository} from './asignatura-model.repository';

export class DocenteModelRepository extends DefaultCrudRepository<
  DocenteModel,
  typeof DocenteModel.prototype.id,
  DocenteModelRelations
> {

  public readonly asignaturaModel: BelongsToAccessor<AsignaturaModel, typeof DocenteModel.prototype.id>;

  constructor(
    @inject('datasources.sga_mongodb') dataSource: SgaMongodbDataSource, @repository.getter('AsignaturaModelRepository') protected asignaturaModelRepositoryGetter: Getter<AsignaturaModelRepository>,
  ) {
    super(DocenteModel, dataSource);
    this.asignaturaModel = this.createBelongsToAccessorFor('asignaturaModel', asignaturaModelRepositoryGetter,);
    this.registerInclusionResolver('asignaturaModel', this.asignaturaModel.inclusionResolver);
  }
}
