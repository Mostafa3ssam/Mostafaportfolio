import { Component } from '@angular/core';

interface Project {
  title: string;
  description: string;
  highlights: string[];
  link: string;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'University Student Information Management System',
      description: 'Integrated mobile and web solution for managing university data and enhancing communication between students, staff, and administrators.',
      highlights: [
        'Student app: login, profile, attendance, course results, fee payments',
        'Web platform: course registration, quiz management, attendance tracking, news updates',
      ],
      link: 'https://github.com/Mostafa3ssam/Hti-Backend'
    },
    {
      title: 'BookFlow – Library Management System',
      description: 'MVC-based system to manage all library operations efficiently with secure roles.',
      highlights: [
        'Secure authentication and roles: Admin, Librarian, Member',
        'Book management, issue/return tracking, real-time availability, dashboards, overdue notifications, reports',
      ],
      link: 'https://github.com/Mostafa3ssam/BookFlowProject'
    },
    {
      title: 'Talabat E-Commerce API',
      description: 'Scalable ASP.NET Core API for ordering and delivery.',
      highlights: [
        'JWT authentication with role-based access and Redis caching for real-time cart updates',
        'N-Tier Architecture with Repository & Specification Patterns following SOLID principles',
        'Product management, order tracking, integration with web/mobile apps',
      ],
      link: 'https://github.com/Mostafa3ssam/Api.Talabat.V1.1'
    }
  ];
}