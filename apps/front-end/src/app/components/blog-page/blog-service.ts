import {Post} from "./modals/post";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class BlogService{
  posts:Post[] = [new Post(0,`Getting Started With Angular Using the Angular CLI`,[],
    `TUTORIAL`,`Angular is a popular JavaScript framework that creates interactive web, mobile, and desktop applications. Enforced separation of concerns, first-class TypeScript support, and robust Command Line Interface (CLI) make Angular a top choice for modern enterprise applications.
The Angular CLI simplifies the process of getting started with Angular. The CLI also takes care of code generation, production builds, and dependency management.
By the end of this tutorial, you’ll have created an Angular application with the Angular CLI. You’ll use the CLI to create a new app, run it in the browser, and build for production.
You’ll also view how Angular splits presentation, styling, and business concerns into separate units. This involves practicing how HTML, CSS, and TypeScript layers interact with each other.`,
    ``,
    `https://nimapinfotech.com/wp-content/uploads/2023/01/como-comecar-com-angular.png`),
    new Post(1,`Angular Router: Navigation Using RouterLink, Navigate, or NavigateByUrl`,[],
    `TUTORIAL`,`In Angular, RouterLink is a directive for navigating to a different route declaratively. Router.navigate and Router.navigateByURL are two methods available to the Router class to navigate imperatively in your component classes. Let’s explore how to use RouterLink, Router.navigate, and Router.navigateByURL.`,
    ``,
    `https://www.guruadvisor.net/media/com_yendifevents/events/39/angular-day5bbf6c47ca93d.jpg`
    ),new Post(2,`What is the Angular framework?`,[],
    `TUTORIAL`,`In Angular, RouterLink is a directive for navigating to a different route declaratively. Router.navigate and Router.navigateByURL are two methods available to the Router class to navigate imperatively in your component classes. Let’s explore how to use RouterLink, Router.navigate, and Router.navigateByURL.`,
    ``,
    `https://static.oschina.net/uploads/img/201511/24174300_TA1C.jpg`
    ),
  new Post(3,`Introducing DigitalOcean Premium CPU-Optimized Droplets for consistent performance & higher throughput`,
    [],`Product Updates`,``,`At DigitalOcean, we focus on the success of small and medium-sized technology businesses on our platform—from offering solutions that scale with your startup to providing a reliable cloud platform you can build on. We aim to take care of your infrastructure, so you can focus on providing a reliable experience to your customers. One factor in delivering fast and reliable experiences to your end-users is the location of your data center.

This article will cover how to evaluate the right location, the factors to consider when selecting a data center, and how to factor trade-offs into your decision.`
    ,`https://www.digitalocean.com/_next/static/media/pricing-investment-study.b1216c8e.jpg`),
  new Post(4,`DigitalOcean launches Partner Directory`,[],`Web,Blog`,``,`DigitalOcean is happy to announce the launch of our new Partner Directory. The Partner Directory provides both companies and current customers, as well as DigitalOcean teams, with the ability to find DO partners with the expertise and technical skills to help solve their business problems. With the help of DigitalOcean partners in a range of industries, implementing projects and workloads on DigitalOcean just got even easier.`
    ,`https://www.digitalocean.com/_next/static/media/intro-to-cloud.d49bc5f7.jpeg`),
  new Post(5,`DigitalOcean Featured on Tomorrow’s World Today, As Seen On Discovery Channel`,[],`Blog`,``,
    `DigitalOcean was recently featured on Season 5 of the Emmy-nominated series Tomorrow’s World Today. Tomorrow’s World Today, as seen on Discovery Channel and the Science Channel, spotlights the global innovations helping shape and transform the world of tomorrow. Episode #6 “Keep Your Head In the Cloud”, highlights the technology behind cloud computing and takes a closer look at some of DigitalOcean’s most popular cloud tools, including Droplets and managed Kubernetes.`
    ,`https://www.digitalocean.com/_next/static/media/write4DO.6a167f0c.jpeg`),
  new Post(6,`How To Remove Docker Images, Containers, and Volumes`,[],`Tutorial`,``,`Docker makes it easy to wrap your applications and services in containers so you can run them anywhere. As you work with Docker, however, it’s also easy to accumulate an excessive number of unused images, containers, and data volumes that clutter the output and consume disk space.

Docker gives you all the tools you need to clean up your system from the command line. This cheat sheet-style guide provides a quick reference to commands that are useful for freeing disk space and keeping your system organized by removing unused Docker images, containers, and volumes.`
    ,`https://community-cdn-digitalocean-com.global.ssl.fastly.net/YMiWVwf44KxC6EmLNooKyr5w`),
  new Post(7,`Industry-leading bandwidth pricing`,[],`Tutorials`,``,`Keep your bandwidth costs low with generous transfer quotas and outbound overage at just $0.01/GiB.`,`https://www.digitalocean.com/_next/static/media/mongodb-sword.a078a7e1.svg`)]

  constructor(){

  }



}
