import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { CreateComponent } from './create.component';
import { UpdateComponent } from './update.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    data: {
      title: 'Admin'
    }
  },
  {
    path: 'create',
    component: CreateComponent,
    data: {
      title: 'Admin Create'
    }
  },
  {
    path: 'update',
    component: UpdateComponent,
    data: {
      title: 'Admin Update'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
