import { Component, OnInit } from "@angular/core";
import { BreadcrumbItem } from "../../shared/breadcrump/breadcrump.component";
import { PreloadService } from "../../../../_services/preload.service";
import { SeoService } from "../../../../_services/seo.service";
import { NavigationEnd, Router } from "@angular/router";

declare let gtag: Function;
@Component({
  selector: "app-our-services",
  templateUrl: "./our-services.component.html",
  styleUrls: ["./our-services.component.scss"],
})
export class OurServicesComponent implements OnInit {
  constructor(
    private _preloadService: PreloadService,
    private seoService: SeoService,
    private router: Router
  ) {
    // this.seoService.updateMetaTags('seo.services.title','seo.services.description','seo.services.keywords')
    this.seoService.updateMetaTags(
      "Kompozith | Services de marketing digital, design UI/UX et développement logiciel",
      "Découvrez les services que nous offrons chez Kompozith : marketing digital, design UI/UX sur mesure, développement d'applications web et mobiles, ainsi que des solutions complètes pour la transformation digitale de votre entreprise. Nous opérons à l'international, avec des clients au Cameroun, au Canada, en France et aux États-Unis.",
      "Services de Kompozith, Marketing digital, Design UI/UX sur mesure, Développement d'applications web, Développement mobile, Agence de développement logiciel, Transformation digitale, Services numériques, Agence internationale, Services de marketing au Cameroun, Développement de logiciels sur mesure"
    );
  }
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag("config", "G-C7TZH79K70", {
          page_path: event.urlAfterRedirects,
        });
      }
    });
    this._preloadService.preload();
  }

  breadcrumbItems: BreadcrumbItem = {
    title: "home.services.text_0",
    datas: [
      { label: "home.text_0", route: "/" },
      { label: "home.services.text_0", route: "/services" },
    ],
  };
}
