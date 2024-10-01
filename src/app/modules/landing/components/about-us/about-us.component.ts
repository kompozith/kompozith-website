import { Component, OnInit } from "@angular/core";
import { BreadcrumbItem } from "../../shared/breadcrump/breadcrump.component";
import { PreloadService } from "../../../../_services/preload.service";
import { SeoService } from "../../../../_services/seo.service";
import { NavigationEnd, Router } from "@angular/router";

declare let gtag: Function;

@Component({
  selector: "app-about-us",
  templateUrl: "./about-us.component.html",
  styleUrls: ["./about-us.component.scss"],
})
export class AboutUsComponent implements OnInit {
  constructor(
    private _preloadService: PreloadService,
    private seoService: SeoService,
    private router: Router
  ) {
    // this.seoService.updateMetaTags('seo.about_us.title','seo.about_us.description','seo.about_us.keywords')
    this.seoService.updateMetaTags(
      "Kompozith | À propos de notre agence de marketing digital et de développement logiciel",
      "Kompozith est une agence internationale spécialisée dans le marketing digital, le design UI/UX et le développement logiciel sur mesure. Nous nous engageons à offrir des solutions innovantes adaptées aux besoins spécifiques de nos clients au Cameroun, au Canada, en France, aux États-Unis et dans le monde entier.",
      "À propos de Kompozith, Agence de marketing digital, Agence de développement logiciel, Solutions sur mesure, Développement d'applications web, Design UI/UX, Agence internationale de marketing numérique, Services numériques au Cameroun, Entreprise de développement logiciel en Afrique, Agence digitale pour entreprises internationales, Transformation digitale, Agence de design et développement logiciel"
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
    title: "home.about.text_0",
    datas: [
      { label: "home.text_0", route: "/" },
      { label: "home.about.text_0", route: "/about-us" },
    ],
  };
}
