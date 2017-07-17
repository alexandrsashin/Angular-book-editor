import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { EditorListComponent } from './editor-list/editor-list.component';
import { EditorItemComponent } from './editor-item/editor-item.component';
import { EditorFormComponent } from './editor-form/editor-form.component';

import { EditorService } from './shared/editor.service';
import { ArrayFilterPipe } from './shared/pipes/arrayFilter/array-filter.pipe';

@NgModule({
	imports: [
				BrowserModule, 
				FormsModule,
				HttpModule
	],
	declarations: [
				AppComponent,
				EditorListComponent,
				EditorItemComponent,
				EditorFormComponent,
				ArrayFilterPipe
	],
	providers: [EditorService],
	bootstrap: [AppComponent]
})
export class AppModule {
	
}
