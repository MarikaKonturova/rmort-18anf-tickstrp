import { Params } from '@angular/router';

import { Gender, Status } from './character.model';

export interface AppParams extends Params {
  gender: Gender | null;
  name: string;
  page: string;
  species: string;
  status: Status | null;
  type: string;
}
