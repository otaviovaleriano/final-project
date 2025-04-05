import {Document} from './document.model';

export const MOCKDOCUMENTS2: any[] = [
  {
    id: '0',
    name: 'CIT 460 - New Additional Course',
    url: 'https://additional.wordpress.com/',
    children: []
  },

  {
    id: '1',
    name: 'CIT 425 - Data Warehousing',
    url: 'https://rkjdatawarehousing.wordpress.com/',
    children: [
      {
        id: '101',
        name: 'Project 1 – The Kimball Method',
        url: 'https://rkjdatawarehousing.wordpress.com/projects/project-1-the-kimball-method/'
      },
      {
        id: '102',
        name: 'Project 2 – Data warehouses vs. marts',
        url: 'https://rkjdatawarehousing.wordpress.com/projects/project-2-data-warehouses-vs-marts/'
      },
      {
        id: '103',
        name: 'Project 3 – The ETL Process',
        url: 'https://rkjdatawarehousing.wordpress.com/projects/project-3-the-etl-process/'
      },
      {
        id: '104',
        name: 'Project 4 – Modify the OLTP design',
        url: 'https://rkjdatawarehousing.wordpress.com/projects/project-4-oltp-modifications-to-erp-design/'
      },
      {
        id: '105',
        name: 'Project 5 – The OLAP design',
        url: 'https://rkjdatawarehousing.wordpress.com/projects/project-4/'
      },
      {
        id: '106',
        name: 'Project 6 – Transforming data',
        url: 'https://rkjdatawarehousing.wordpress.com/projects/transforming-data/'
      },
      {
        id: '107',
        name: 'Project 7 – MarkLogic',
        url: 'https://rkjdatawarehousing.wordpress.com/projects/project-7-marklogic/'
      },
      {
        id: '108',
        name: 'Project 8 – Build a web application',
        url: 'https://rkjdatawarehousing.wordpress.com/projects/project-8/'
      }
    ]
  },
  {
    id: '2',
    name: 'CIT 460 - Enterprise Development',
    url: 'https://rkjackson.wordpress.com/',
    children: [
      { id: '201', name: 'Case 1 – Defining the requirements', url: 'https://rkjackson.wordpress.com/cases/case-1/' },
      { id: '202', name: 'Case 2 – User Interface design', url: 'https://rkjackson.wordpress.com/cases/case-2/' },
      {
        id: '203',
        name: 'Case 3 – Implementing Model Layer',
        url: 'https://rkjackson.wordpress.com/cases/case-3/',
        children: [
          { 'id': '301', name: 'Team Assignment', 'description': 'Create your first JavaBean class' },
          { 'id': '302', name: 'Individual Assignment', 'description': 'Create remaining JavaBean classes' }
        ]
      },
      { id: '204', name: 'Case 4 – Enterprise Java Session Beans', url: 'https://rkjackson.wordpress.com/cases/case-4/' },
      { id: '205', name: 'Case 5 – Implementing the View', url: 'https://rkjackson.wordpress.com/cases/case-5/' },
      { id: '206', name: 'Case 6 – A Framework for the View Layer', url: 'https://rkjackson.wordpress.com/cases/case-6/' }
    ]
  },
  {
    id: '3',
    name: 'CIT 366 - Full Web Stack Development',
    url: 'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT 366 course description.pdf',
    children: [
      {
        id: '301',
        name: 'Lesson 1 - JavaScript Best Practices',
        url: 'https://content.byui.edu/file/f0594919-9524-47eb-9f4d-5c7239c3c002/1/Lesson1Introduction.pdf'
      },
      {
        id: '302',
        name: 'Lesson 2 - The DOM and JQuery',
        url: 'https://content.byui.edu/file/c67e59fd-990c-4adc-9232-8027f847c8b9/1/Lesson2Introduction.pdf'
      },
      {
        id: '303',
        name: 'Lesson 3 - Angular 2 Framework 1',
        url: 'https://content.byui.edu/file/aa9b6af5-b882-48f5-8321-caca980e5ec9/1/Lesson3Introduction.pdf'
      },
      {
        id: '304',
        name: 'Lesson 4 - Angular 2 Framework 2',
        url: 'https://content.byui.edu/file/2c4ddd6c-dce4-408d-b581-f254a13e4d10/1/Lesson4Introduction.pdf'
      },
      {
        id: '305',
        name: 'Lesson 5 - Angular 2 Framework 3',
        url: 'https://content.byui.edu/file/66dc0765-22a7-4cd8-a184-942c607636fb/1/Lesson5Introduction.pdf'
      }
    ]
  },
  {
    id: '4',
    name: 'CIT 366 - Full Web Stack Development',
    url: 'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT 366 course description.pdf',
  },
  {
    id: '5',
    name: 'CIT 240 - Introduction to Networking',
    url: 'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT 366 course description.pdf',
  },
  {
    id: '6',
    name: 'CIT 370 - Computer Security I',
    url: 'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT 366 course description.pdf',
  },
  {
    id: '7',
    name: 'CIT 360 - Object Oriented Programming II',
    url: 'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT 366 course description.pdf',
  },
  {
    id: '8',
    name: 'CIT 470 - Computer Security II',
    url: 'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT 366 course description.pdf',
  },
  {
    id: '9',
    name: 'CIT 262 - Mobile Development',
    url: 'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT 366 course description.pdf',
  },
  {
    id: '10',
    name: 'CIT 230 - Web Page Development',
    url: 'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT 366 course description.pdf',
  },
  {
    id: '11',
    name: 'CIT 236 - Web Development',
    url: 'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT 366 course description.pdf',
  },
  {
    id: '12',
    name: 'CIT 340 - Networking II',
    url: 'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT 366 course description.pdf',
  },
];