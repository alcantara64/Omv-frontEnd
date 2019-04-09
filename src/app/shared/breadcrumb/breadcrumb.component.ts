import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import { filter, distinctUntilChanged, map } from 'rxjs/operators';
import { BreadCrumb } from 'src/app/core/models/entity/breadcrumb';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs$: Observable<BreadCrumb[]>;
 
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    // console.log('breadcrumbs',this.activatedRoute.snapshot.paramMap.get('BreadCrumb'));
  }

  ngOnInit() {
      this.breadcrumbs$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged(),
      map(event => this.buildBreadCrumb(this.activatedRoute.root))
    );

    this.buildBreadCrumb(this.activatedRoute, 'Test', );
  }
    buildBreadCrumb(route: ActivatedRoute, url: string = '',
                  breadcrumbs: Array<BreadCrumb> = []): Array<BreadCrumb> {
    // If no routeConfig is avalailable we are on the root path
    // if (!route.routeConfig) return;
    const label = route.routeConfig ? route.routeConfig.data['breadcrumb'] : ' ';
    const path = route.routeConfig ? route.routeConfig.path : '';
    // In the routeConfig the complete path is not available,
    // so we rebuild it each time
    const nextUrl = `${url}${path}/`;
    const breadcrumb = {
      label: label,
      url: nextUrl,
    };
    const newBreadcrumbs = [...breadcrumbs, breadcrumb];
    if (route.firstChild) {
      // If we are not on our current path yet,
      // there will be more children to look after, to build our breadcumb
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }
} 