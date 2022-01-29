interface Image {
  item: number,
  caption: string
}

interface WhatPeopleSay {
  name?: string,
  title: string,
  say: string
}

interface SelectedProject {
  name: string,
  baseUrl: string,
  dir: string,
  images: Image[]
}

interface WorkExperience {
  name: string,
  title: string,
  fromDt: Date | string,
  toDt?: Date | string | null,
  blurbs: string[],
  skills?: string[],
}

interface Education {
  name: string,
  location: string,
  majors: string[],
  gradDt?: Date | string | null,
  awards: string[],
}

interface Person {
  name: string,
  statement: string,
  workExperiences: WorkExperience[],
  educations: Education[],
  whatPeopleSay?: WhatPeopleSay[],
  selectedProjects?: SelectedProject[]
}

const person: Person = {
  name: 'Corey Ison',
  statement: '',
  workExperiences: [
    {
      name: 'University of Pikeville',
      title: 'Lead Application Developer',
      fromDt: '2012-02-01',
      toDt: null,
      blurbs: [
        'The past 10 years spent at UPIKE has been filled with opportunities to grow and develop my love for web application development. I\'ve always had the freedom to work in an environment of creativity. In fact, many of my most used products were developed from a need that I saw from the campus community. As an example, the report dashboard was created because I saw a need for the staff and faculty to have access to real-time reports on a recurring basis. Using the report dashboard, a user can easily run a report or schedule the report to run on any number of recurring schedules.',
        'Another opportunity I had to meet a need involved the creation of student accounts. The UPIKE student application was created with the idea to create accounts after the applications were imported into the universities ERP and their deposit is paid. As application statuses are synced with the ERP, prospects are given near real-time notifications of changes. Once the deposit is paid the prospects account is created and the prospect is notified of their account details.',
      ],
      skills: [
        'HTML',
        'CSS',
        'JavaScript',
        'jQuery',
        'VueJs',
        'PHP',
        'MySQL',
        'MS-SQL',
        'Windows',
        'IIS',
      ],
    },
    {
      name: 'Lightyear Network Solutions',
      title: 'Software Developer',
      fromDt: '2007-01-01',
      toDt: '2012-02-01',
      blurbs: [
        'I worked with a team of developers to maintain, modify, extend, and support open source Java CRM. Developed and supported new development web applications for internal use.',
        'I was responsible for the creation, maintenance, and distribution of custom reports.',
      ],
      skills: [
        'HTML',
        'CSS',
        'JavaScript',
        'jQuery',
        'Java',
        'JSP',
        'PHP',
        'Jasper Reports',
        'Oracle',
        'MySQL',
        'Linux',
        'Apache',
      ],
    },
    {
      name: 'Lexmark',
      title: 'Senior Software Technician',
      fromDt: '2006-07-01',
      toDt: '2007-01-01',
      blurbs: [
        'I worked with a team to black box test printer software and hardware in various predefined installation and usage scenarios. All tests were done following a testing guide. Our team was going to be the team that developed the tests for all testing purposes.',
        'Our team was also responsible for ad-hoc testing based on user feedback.',
      ],
      skills: [
        'Microsoft Excel',
        'Windows',
        'Linux',
      ],
    },
  ],
  educations: [
    {
      name: 'UVa @ Wise',
      location: 'Wise, VA',
      majors: [
        'Computer Information Systems',
        'Mathematics',
      ],
      gradDt: 'May 2005',
      awards: [
        'Recipient of the Most Outstanding Senior Award in CIS',
        'Recipient of the Theo Gibson Math and Sciences scholarship',
        'Academic Dean\'s List',
        'Member of Sigma Zeta: National Mathematics and Science Honor Society',
        'Member of The Darden Society',
      ],
    }, {
      name: 'Hazard Community College',
      location: 'Hazard, KY',
      majors: [
        'A.S. Information Technology',
        'Network Administration Option',
      ],
      gradDt: 'Dec 2002',
      awards: [
        'Dean\'s List',
      ],
    },
  ],
  whatPeopleSay: [
    {
      title: 'Associate Director of Admissions',
      say: 'Corey has been invaluable to the Admissions Department over the years.',
    },
    {
      title: 'Chair, School of Social Work',
      say: 'His ability to understand abstract concepts and then transform them into working web applications is unmatched and our overall success would not have been possible without his assistance.',
    },
    {
      title: 'Co-worker',
      say: 'Corey is always looking for opportunities and ways to help others with his programming skills to make other\'s jobs easier and more efficient.',
    },
    {
      title: 'Executive Director of Residence Life & Engagement',
      say: '[Corey] is always open to feedback and always willing to collaborate with various constituents to improve student success.',
    },
    {
      title: 'Co-worker',
      say: '[Corey\'s] app turned iPad distribution from a process that used to take hours to a task that could be completed in less than 20 minutes.',
    },
  ],
  selectedProjects: [
    {
      name: 'Housing Application',
      baseUrl: 'selected-projects',
      dir: 'housing',
      images: [
        {
          item: 1,
          caption: 'Housing application homepage',
        },
        {
          item: 2,
          caption: 'Single building view',
        },
        {
          item: 3,
          caption: 'Floor/room detail',
        },
        {
          item: 4,
          caption: 'Search results/history',
        },
        {
          item: 5,
          caption: 'Roommate suggestion/matching',
        },
        {
          item: 6,
          caption: 'Roommate suggestion/matching breakdown',
        },
        {
          item: 7,
          caption: 'Composing an SMS message',
        },
        {
          item: 8,
          caption: 'Sidebar navigation',
        },
        {
          item: 9,
          caption: 'SMS/Email outbox',
        },
        {
          item: 10,
          caption: 'Message detail',
        },
      ],
    },
    {
      name: 'Job Application',
      baseUrl: 'selected-projects',
      dir: 'jobs',
      images: [
        {
          item: 1,
          caption: 'All Jobs listings',
        },
        {
          item: 2,
          caption: 'Admin page dashboard',
        },
        {
          item: 3,
          caption: 'Job detail',
        },
        {
          item: 4,
          caption: 'Application filters',
        },
        {
          item: 5,
          caption: 'Job viewers',
        },
        {
          item: 6,
          caption: 'Applications for job',
        },
        {
          item: 7,
          caption: 'Public job detail',
        },
        {
          item: 8,
          caption: 'Public job detail (modal)',
        },
      ],
    },
    {
      name: 'Form Builder',
      baseUrl: 'selected-projects',
      dir: 'approval',
      images: [
        {
          item: 1,
          caption: 'All forms',
        },
        {
          item: 2,
          caption: 'Individual form/submissions',
        },
        {
          item: 3,
          caption: 'Route editor for notifications',
        },
        {
          item: 4,
          caption: 'Form builder. Form detail',
        },
        {
          item: 5,
          caption: 'Form builder. Input field setup',
        },
        {
          item: 6,
          caption: 'Live form (registration for orientation)',
        },
        {
          item: 7,
          caption: 'Live form for student review at professional school',
        },
        {
          item: 8,
          caption: 'Masters of Social work application',
        },
        {
          item: 9,
          caption: 'Autosave functionality',
        },
      ],
    },
    {
      name: 'Student Application',
      baseUrl: 'selected-projects',
      dir: 'student-application',
      images: [
        {
          item: 1,
          caption: 'Student application landing page',
        },
        {
          item: 2,
          caption: 'Register account modal',
        },
        {
          item: 3,
          caption: 'Applications view',
        },
        {
          item: 4,
          caption: 'Application progress',
        },
        {
          item: 5,
          caption: 'Custom select closed/selected',
        },
        {
          item: 6,
          caption: 'Custom select open/selected',
        },
        {
          item: 7,
          caption: 'Custom multi-select open/selected',
        },
        {
          item: 8,
          caption: 'Custom date picker',
        },
      ],
    },
    {
      name: 'Report Dashboard',
      baseUrl: 'selected-projects',
      dir: 'report',
      images: [
        {
          item: 1,
          caption: 'HTML Report Result',
        },
        {
          item: 2,
          caption: 'Report parameters',
        },
        {
          item: 3,
          caption: 'Report jobs',
        },
        {
          item: 4,
          caption: 'Report jobs continued',
        },
        {
          item: 5,
          caption: 'Report jobs continued',
        },
        {
          item: 6,
          caption: 'Defined parameters, subreports, HTML for report',
        },
        {
          item: 7,
          caption: 'Report with SQL datasource',
        },
        {
          item: 8,
          caption: 'Report with a script datasource',
        },
        {
          item: 9,
          caption: 'My reports view',
        },
      ],
    },
    {
      name: 'MyPass',
      baseUrl: 'selected-projects',
      dir: 'password-utility',
      images: [
        {
          item: 1,
          caption: 'Password reset login',
        },
        {
          item: 2,
          caption: 'Security code',
        },
        {
          item: 3,
          caption: 'Change password',
        },
      ],
    },
    {
      name: 'Events Tracking',
      baseUrl: 'selected-projects',
      dir: 'events',
      images: [
        {
          item: 1,
          caption: 'All events view',
        },
        {
          item: 2,
          caption: 'Event view with registered attendees',
        },
        {
          item: 3,
          caption: 'Event registration page',
        },
        {
          item: 4,
          caption: 'Mulitple event registration page',
        },
      ],
    },
    {
      name: 'Ticketing',
      baseUrl: 'selected-projects',
      dir: 'permits',
      images: [
        {
          item: 1,
          caption: 'All users view',
        },
        {
          item: 2,
          caption: 'Individual user/vehicles view',
        },
        {
          item: 3,
          caption: 'Ticket edit page',
        },
      ],
    },
  ],
};

export default person;
