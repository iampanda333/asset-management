import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetFormComponent } from './asset/asset-form/asset-form.component';
import { AssetListComponent } from './asset/asset-list/asset-list.component';
import { AssetManagementComponent } from './asset/asset-management/asset-management.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'assets', component: AssetManagementComponent, children: [
    { path: 'assets-list', component: AssetListComponent, canActivate: [ AuthGuard ] },
    { path: 'edit', component: AssetFormComponent, canActivate: [ AuthGuard ] },
    { path: '', redirectTo: 'assets-list', pathMatch: 'full' }
  ]},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
