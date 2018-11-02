import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { LoaderService } from './loader.service';
import { LoaderState } from './loader';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})

export class LoaderComponent implements OnInit, OnDestroy {
show = true;
private subscription: Subscription;
constructor(
        private loaderService: LoaderService
    ) { }
ngOnInit() {
        this.subscription = this.loaderService.loaderState
            .subscribe((state: LoaderState) => {
                this.show = state.show;
                console.log(this.show);
            });

    }
ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
