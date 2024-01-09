import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  currentRoute: string = '';

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private authService: AuthService
  ) {
    this.currentRoute = this.router.url;
  }

  @ViewChild('nav') nav!: ElementRef;

  ngAfterViewInit(): void {
    const popoverTriggerList = [].slice.call(this.nav?.nativeElement.querySelectorAll('[data-bs-toggle="popover"]'));

    popoverTriggerList.map(function (popoverTriggerEl) {
      return new window.bootstrap.Popover(popoverTriggerEl)
    });
  }

  logout() {
    this.authService.logout();
  }

  routes = [
   /* {
      href: "/customers",
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16"><path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/></svg>`),
      iconFill: this.sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16"><path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/></svg>`)
    },*/
    {
      href: "/customers",
      icon: this.sanitizer.bypassSecurityTrustHtml(` <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="3.40426" cy="3.40426" r="3.40426" transform="matrix(-1 0 0 1 15.6172 13)" stroke="black" stroke-width="1.5"/>
    <path d="M6.25537 24.8594C6.25537 24.1272 6.71567 23.474 7.40524 23.2277V23.2277C10.5141 22.1174 13.9115 22.1174 17.0204 23.2277V23.2277C17.71 23.474 18.1703 24.1272 18.1703 24.8594V25.979C18.1703 26.9896 17.2752 27.7659 16.2748 27.6229L15.9412 27.5753C13.4682 27.222 10.9575 27.222 8.48442 27.5753L8.15087 27.6229C7.15044 27.7659 6.25537 26.9896 6.25537 25.979V24.8594Z" stroke="black" stroke-width="1.5"/>
    <path d="M17.3191 19.9026C18.7964 19.9026 19.9939 18.7051 19.9939 17.2279C19.9939 15.7506 18.7964 14.5531 17.3191 14.5531" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M20.2486 26.0051L20.5106 26.0425C21.2967 26.1548 22 25.5448 22 24.7508V23.8711C22 23.2958 21.6383 22.7826 21.0965 22.5891C20.5561 22.3961 20.0045 22.2458 19.4468 22.1382" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M6.68088 19.9026C5.20364 19.9026 4.0061 18.7051 4.0061 17.2279C4.0061 15.7506 5.20364 14.5531 6.68088 14.5531" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M3.75143 26.0051L3.48935 26.0425C2.7033 26.1548 2.00003 25.5448 2.00003 24.7508V23.8711C2.00003 23.2958 2.3617 22.7826 2.9035 22.5891C3.44395 22.3961 3.99549 22.2458 4.55322 22.1382" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
      </svg>`),
      iconFill: this.sanitizer.bypassSecurityTrustHtml(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.307 18.9193C20.3614 18.9266 20.4159 18.934 20.4703 18.9416L20.7438 18.98C21.9346 19.1471 23 18.2395 23 17.0579V16.1561C23 15.311 22.4592 14.5572 21.649 14.273C20.7129 13.9446 19.7466 13.7308 18.7711 13.6316C19.789 14.3675 20.4203 15.5592 20.4203 16.8593V17.9789C20.4203 18.304 20.3809 18.6189 20.307 18.9193ZM16.1811 12.4319C16.5868 12.5994 17.0324 12.6919 17.5 12.6919C19.3813 12.6919 20.9064 11.1939 20.9064 9.34591C20.9064 7.49795 19.3813 5.99988 17.5 5.99988C17.4443 5.99988 17.3889 6.00119 17.3338 6.00379C17.6759 6.7324 17.8671 7.54594 17.8671 8.40413C17.8671 9.98064 17.2219 11.4064 16.1811 12.4319Z" fill="#367B5F"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.07387 18.9193C4.01942 18.9266 3.96499 18.934 3.91058 18.9416L3.63707 18.98C2.44625 19.1471 1.38084 18.2395 1.38084 17.0579V16.1561C1.38084 15.311 1.92166 14.5572 2.73185 14.273C3.66791 13.9446 4.63427 13.7308 5.60979 13.6316C4.59191 14.3675 3.96057 15.5592 3.96057 16.8593V17.9789C3.96057 18.304 3.99992 18.6189 4.07387 18.9193ZM8.19971 12.4319C7.79406 12.5994 7.34845 12.6919 6.88084 12.6919C4.99952 12.6919 3.47442 11.1939 3.47442 9.34591C3.47442 7.49795 4.99952 5.99988 6.88084 5.99988C6.93657 5.99988 6.992 6.00119 7.04707 6.00379C6.70496 6.7324 6.51377 7.54594 6.51377 8.40413C6.51377 9.98064 7.15896 11.4064 8.19971 12.4319Z" fill="#367B5F"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.3671 8.40413C16.3671 6.1098 14.5071 4.24988 12.2128 4.24988C9.91848 4.24988 8.05856 6.1098 8.05856 8.40413C8.05856 10.6985 9.91848 12.5584 12.2128 12.5584C14.5071 12.5584 16.3671 10.6985 16.3671 8.40413Z" fill="#367B5F"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.15298 14.5213C10.425 13.3528 14.0006 13.3528 17.2727 14.5213C18.2607 14.8742 18.9203 15.8101 18.9203 16.8593V17.9789C18.9203 19.4459 17.621 20.5728 16.1687 20.3653L15.8351 20.3177C13.4325 19.9744 10.9932 19.9744 8.59049 20.3177L8.25693 20.3653C6.80468 20.5728 5.50537 19.4459 5.50537 17.9789V16.8593C5.50537 15.8101 6.16492 14.8742 7.15298 14.5213Z" fill="#367B5F"/>
</svg>
`)
    },

    {
      href: "/orders",
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.5 4H5.5C4.94772 4 4.5 4.44772 4.5 5V21C4.5 21.5523 4.94772 22 5.5 22H18.5C19.0523 22 19.5 21.5523 19.5 21V5C19.5 4.44772 19.0523 4 18.5 4Z" stroke="#1E1E1E" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M9 2V5M15 2V5M8 9.5H16M8 13.5H14M8 17.5H12" stroke="#1E1E1E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`),
      iconFill: this.sanitizer.bypassSecurityTrustHtml(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 4H5C4.44772 4 4 4.44772 4 5V21C4 21.5523 4.44772 22 5 22H18C18.5523 22 19 21.5523 19 21V5C19 4.44772 18.5523 4 18 4Z" fill="#367B5F" stroke="#367B5F" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M8.5 2V5V2ZM14.5 2V5V2ZM7.5 9.5H15.5H7.5ZM7.5 13.5H13.5H7.5ZM7.5 17.5H11.5H7.5Z" fill="#367B5F"/>
<path d="M8.5 2V5M14.5 2V5M7.5 9.5H15.5M7.5 13.5H13.5M7.5 17.5H11.5" stroke="#367B5F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 9H16M8 13H14M8 17H12" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`)
    },
    // {
    //   href: "/shop",
    //   icon: this.sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-dash" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5.5 6.5A.5.5 0 0 1 6 6h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z"/><path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/></svg>`),
    //   iconFill: this.sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-dash-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM6 6a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1H6z"/></svg>`)
    // }
  ]
}
