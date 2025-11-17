import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  imports: [RouterModule, CommonModule, TranslateModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
}
