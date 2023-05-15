import {Post} from "./modals/post";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class BlogService{
  posts:Post[] = [new Post(`Getting Started With Angular Using the Angular CLI`,`Angular,HTML,Typescript,Web Development`,
    `TUTORIAL`,`Angular is a popular JavaScript framework that creates interactive web, mobile, and desktop applications. Enforced separation of concerns, first-class TypeScript support, and robust Command Line Interface (CLI) make Angular a top choice for modern enterprise applications.
The Angular CLI simplifies the process of getting started with Angular. The CLI also takes care of code generation, production builds, and dependency management.
By the end of this tutorial, you’ll have created an Angular application with the Angular CLI. You’ll use the CLI to create a new app, run it in the browser, and build for production.
You’ll also view how Angular splits presentation, styling, and business concerns into separate units. This involves practicing how HTML, CSS, and TypeScript layers interact with each other.`,
    ``,
    `https://nimapinfotech.com/wp-content/uploads/2023/01/como-comecar-com-angular.png`),
    new Post(`Angular Router: Navigation Using RouterLink, Navigate, or NavigateByUrl`,`Angular,HTML,Typescript,Web Development`,
    `TUTORIAL`,`In Angular, RouterLink is a directive for navigating to a different route declaratively. Router.navigate and Router.navigateByURL are two methods available to the Router class to navigate imperatively in your component classes. Let’s explore how to use RouterLink, Router.navigate, and Router.navigateByURL.`,
    ``,
    `https://www.guruadvisor.net/media/com_yendifevents/events/39/angular-day5bbf6c47ca93d.jpg`
    ),new Post(`What is the Angular framework?`,`Angular,HTML,Typescript,Web Development`,
    `TUTORIAL`,`In Angular, RouterLink is a directive for navigating to a different route declaratively. Router.navigate and Router.navigateByURL are two methods available to the Router class to navigate imperatively in your component classes. Let’s explore how to use RouterLink, Router.navigate, and Router.navigateByURL.`,
    ``,
    `https://static.oschina.net/uploads/img/201511/24174300_TA1C.jpg`
    ,)]

  constructor(){

  }



}
