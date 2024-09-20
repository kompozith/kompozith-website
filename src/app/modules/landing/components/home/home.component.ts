import { Component, OnInit } from "@angular/core";
import { PreloadService } from "../../../../_services/preload.service";
import { SeoService } from "../../../../_services/seo.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(
    private _preloadService: PreloadService,
    private seoService: SeoService
  ) {
    // this.seoService.updateMetaTags('seo.home.title','seo.home.description','seo.home.keywords')
    this.seoService.updateMetaTags(
      "Kompozith | Agence de Marketing Digital et de Développement Logiciel",
      "Kompozith est une agence spécialisée dans le marketing digital, le design UI/UX et le développement logiciel sur mesure, offrant des solutions innovantes et personnalisées à une clientèle internationale. Que vous soyez basé au Canada, en France, aux États-Unis ou ailleurs, nous adaptons nos services pour répondre à vos besoins spécifiques, tout en garantissant une approche créative et des résultats à la hauteur de vos attentes.",
      "Agence de marketing digital, Agence de développement logiciel, Design UI/UX sur mesure, Développement d'applications web, Services de développement mobile, Solutions de marketing digital, Agence de transformation digitale, Agence créative internationale, Design d'interface utilisateur (UI), Expérience utilisateur optimisée (UX), Stratégie de marketing digital, Optimisation SEO pour les entreprises, Publicité en ligne ciblée, Gestion des réseaux sociaux, Campagnes Google Ads, Marketing de contenu international, Marketing entrant pour les entreprises, Agence de branding international, Marketing digital en France, Marketing digital au Canada, Marketing digital aux États-Unis, Marketing digital au Cameroun, Consultants en marketing digital, Développement logiciel sur mesure, Développement d'applications SaaS, Solutions de développement Full-Stack, Développement Backend et Frontend, Conception de logiciels pour entreprises, Développement logiciel au Cameroun, Développement logiciel agile, Développement d'applications mobiles iOS, Développement d'applications mobiles Android, Développement web professionnel, Développement logiciel international, Développement logiciel au Cameroun, Design UX/UI intuitif, Agence de design UX/UI, Amélioration de l'expérience utilisateur, Conception d'interface utilisateur sur mesure, Création de prototypes UX/UI, Tests utilisateurs pour UX, Design UX pour applications mobiles, Design UI réactif, Conception ergonomique d'applications web, Agence UI/UX pour entreprises internationales, Agence de marketing digital au Cameroun, Développement logiciel en Afrique pour le Canada, Agence de design UI/UX en France, Services de marketing digital aux États-Unis, Agence internationale basée au Cameroun, Marketing digital pour les entreprises américaines, Développement logiciel pour startups au Canada, Solutions de développement logiciel en France, Design UI/UX pour le marché américain, Développement d'applications web pour entreprises françaises, Agence de développement logiciel sur mesure au Cameroun, Meilleure agence de design UI/UX au Cameroun, Meilleure agence de design UI/UX au Canada, Services de marketing digital pour entreprises françaises, Agence spécialisée dans la transformation digitale aux États-Unis, Développement d'applications mobiles sur mesure au Cameroun, Conception d'interface utilisateur pour le marché international, Agence internationale de marketing digital basée au Cameroun, Développement logiciel et stratégie digitale en France, Agence de design UX/UI pour entreprises aux États-Unis, Solutions de marketing et développement logiciel au Cameroun, Marketing et développement logiciel au Canada."
    );
  }
  ngOnInit(): void {
    this._preloadService.preload();
  }
}
