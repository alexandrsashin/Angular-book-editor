import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { EditorListComponent } from './editor-list/editor-list.component';
import { EditorItemComponent } from './editor-item/editor-item.component';
import { EditorFormComponent } from './editor-form/editor-form.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { EditorService } from './shared/editor.service';
import { ArrayFilterPipe } from './shared/pipes/arrayFilter/array-filter.pipe';

const appRoutes: Routes = [
  { path: 'form', component: EditorFormComponent },
  { path: 'list', component: EditorListComponent },
 
  { path: '',   redirectTo: '/list', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
	imports: [
				BrowserModule, 
				FormsModule,
				ReactiveFormsModule,
				HttpModule,
				RouterModule.forRoot(
		      appRoutes,
		      { enableTracing: true } // <-- debugging purposes only
		    )
	],
	declarations: [
				AppComponent,
				EditorListComponent,
				EditorItemComponent,
				EditorFormComponent,
				NotFoundComponent,
				ArrayFilterPipe
	],
	providers: [EditorService],
	bootstrap: [AppComponent]
})
export class AppModule {
	
}
