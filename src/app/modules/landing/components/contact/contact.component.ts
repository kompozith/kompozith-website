import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { map } from "rxjs";
import { BreadcrumbItem } from "../../shared/breadcrump/breadcrump.component";
import { HttpResponseService } from "../../../../_services/http-response.service";
import { IntouchService } from "../../../../_services/API/intouch.service";
import { PreloadService } from "../../../../_services/preload.service";
import { DatePipe } from "@angular/common";
import { SeoService } from "../../../../_services/seo.service";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
})
export class ContactComponent implements OnInit, OnDestroy {
  submitted: boolean = false;
  contactForm!: FormGroup;
  public loading: boolean = false;

  constructor(
    private _preloadService: PreloadService,
    private intouchService: IntouchService,
    private fb: FormBuilder,
    public _httpResponseService: HttpResponseService,
    private datePipe: DatePipe,
    private seoService: SeoService
  ) {
    // this.seoService.updateMetaTags('seo.contact.title','seo.contact.description','seo.contact.keywords')
    this.seoService.updateMetaTags(
      "Kompozith | Contactez-nous pour vos besoins en marketing et développement logiciel",
      "Vous avez un projet en marketing digital, design UI/UX ou développement logiciel ? Contactez Kompozith dès aujourd'hui pour des solutions sur mesure adaptées à vos besoins. Nous sommes disponibles pour vous assister dans vos projets au Cameroun, au Canada, en France et aux États-Unis.",
      "Contact Kompozith, Agence de marketing digital, Contact développement logiciel, Services UI/UX, Agence internationale de développement logiciel, Marketing numérique, Solutions sur mesure, Support client Kompozith, Contactez notre agence au Cameroun, Agence marketing et développement international"
    );
  }
  ngOnInit(): void {
    this._preloadService.preload();
    this.contactForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      body: ["", [Validators.required, Validators.minLength]],
      phoneNumber: [""],
      subject: [""],
    });
    this.contactForm.valueChanges.subscribe(() => {
      this._httpResponseService.response = { status: false, message: "" };
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.contactForm.valid) {
      return;
    }
    this.loading = true;
    this.intouchService
      .create({
        subject: this.contactForm.value.subject,
        body: this.contactForm.value.body,
        date: this.datePipe.transform(new Date(), "yyyy-MM-dd HH:mm"),
        author: {
          email: this.contactForm.value.email,
          name: this.contactForm.value.name,
          phoneNumber: this.contactForm.value.phoneNumber,
        },
      })
      .then(() => {
        this.submitted = false;
        this.contactForm.reset();
        this.loading = false;
        this._httpResponseService.response = {
          status: true,
          message: "notification.contact.success",
        };
      })
      .catch((err: any) => {
        console.log(err);
        this.loading = false;
        this._httpResponseService.response = {
          status: false,
          message: "notification.contact.error",
        };
      });
  }

  ngOnDestroy() {
    this.loading = false;
    this._httpResponseService.response = { status: false, message: "" };
  }

  breadcrumbItems: BreadcrumbItem = {
    title: "contact.text_0",
    datas: [
      { label: "home.text_0", route: "/" },
      { label: "contact.text_0", route: "/contact" },
    ],
  };
}
