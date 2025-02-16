import { icons } from "./imageUtil";

export const REACT_APP_API_BASE = 'http://localhost:1711/api'

export const POPULAR_SEARCH_TERMS = [
    "Software Engineer",
    "Product Manager",
    "Data Analyst",
    "UX Designer",
]

export const POPULAR_SEARCH_COMPANIES = [
    "Zainpay",
    "HiTech",
    "Engausa",
    "eHealth Africa",
]

export const category = [
    {
        name: "Design",
        img: icons.design
    },
    {
        name: "Sales",
        img: icons.salses
    },
    {
        name: "Marketing",
        img: icons.marketing
    },
    {
        name: "Finance",
        img: icons.finance
    },
    {
        name: "Technology",
        img: icons.technology
    },
    {
        name: "Engineering",
        img: icons.engineering
    },
    {
        name: "Business",
        img: icons.business
    },
    {
        name: "Human Resources",
        img: icons.hr
    },
];

export const popularCompanies = [
    {
        name: "Zainpay",
        about: "Zainpay is an online and offline digital bank platform for SMEs, Startups and Innovators to quickly launch payment processing products into the Nigerian market.",
        img: icons.design,
     Profile: "ZainPay is a leading fintech infrastructure provider in Nigeria, specializing in multi-settlement and payment services. They offer solutions designed to streamline financial transactions for businesses and individuals across the country. "

    },
    {
        name: "HiTech",
        about: "Established in 1988, Hitech Construction Company Limited is currently one of the leading Building & Civil Engineering Contractors in Nigeria.",
        img: icons.design
    },
    {
        name: "Engausa",
        about: "The main aim of Engausa Hub is to train our youth especially less privilege in skill acquisition, and empowerment.",
        img: icons.design
    },
    {
        name: "eHealth Africa",
        about: "eHealth Africa's mission is to build stronger health systems through the design and implementation of data-driven solutions that respond to local needs.",
        img: icons.design
    },
    {
        name: "brandDrive",
        about: "BrandDrive provides tools to manage your business online and in-store with accounting, payments, point of sale, e-commerce, and analytics.",
        img: icons.design
    },
    {
        name: "HNG",
        about: "HNG is a company with a mission — we work with the very best techies to help them enhance their skills through our HNG internship program",
        img: icons.design
    },
    {
        name: "MBL Hightech",
        about: "MBL Hightech provides outsourced services to Startups which have strong ideas but need a special workforce",
        img: icons.design
    },
    {
        name: "Startup Kano",
        about: "Startup Kano has created an avenue that enables creative entrepreneurs to grow their ideas, scale their businesses, access funding, and build meaningful ...",
        img: icons.design
    },
];


  export const Descriptions= [
    {
      name: "Zainpay",
      founded: 2021,
      locations: ["Nasarawa", "Abuja", "Lagos"],
      industry: "Fintech / Payment Processing",
      company_profile: "Zainpay offers diversified payment acceptance solutions for businesses, including platforms for developers and services such as agency banking, settlements, and APIs. Their infrastructure supports payment processing through various channels like card acceptance, POS terminals, and bank transfers.",
      contact_information: "support@zainpay.ng",
      office_locations: "Specific office addresses are not publicly disclosed.",
     "leadership_team": [
        { name: "David Adeleke", role: "CEO", picture: "https://example.com/david_adeleke.jpg" },
       { name: "Frank Uwajeh", role: "CTO", picture: "https://example.com/frank_uwajeh.jpg" }, 
       { name: "Ini Jones", role: "Developer", picture: "https://example.com/ini_jones.jpg" }, 
{ name: "David Adetoro", role: "Product Designer", picture: "https://example.com/david_adetoro.jpg" }

      ],
      office_environment_picture: "https://example.com/zainpay_office.jpg",
      office_environment: "Specific images of Zainpay's office environment are not publicly available."
    },
    {
    name: "HiTech",
    founded: 1988,
    locations: ["Jos", "Edo", "Lagos"],
    industry: "Construction / Civil Engineering",
    company_profile: "HiTech Construction Company Limited is a leading building and civil engineering contractor in Nigeria, known for delivering high-quality infrastructure projects nationwide.",
    contact_information: "Specific contact details are not publicly disclosed.",
    office_locations: "Specific office addresses are not publicly disclosed.",
     leadership_team: [
        { name: "John Smith", role: "Managing Director", picture: "https://example.com/john_smith.jpg" },
        { name: "Jane Doe", role: "Operations Manager", picture: "https://example.com/jane_doe.jpg" }
      ],
      office_environment_picture: "https://example.com/hitech_office.jpg",
    office_environment: "Specific images of HiTech's office environment are not publicly available."
  },
  {
    name: "Engausa",
    founded: "Specific founding year not publicly disclosed.",
    locations: ["Kano", "Abuja", "Kaduna"],
    industry: "Education / Skill Acquisition",
    company_profile: "Engausa Hub aims to train youth, especially the less privileged, in various skills, empowering them for better opportunities.",
    contact_information: "Specific contact details are not publicly disclosed.",
    office_locations: "Specific office addresses are not publicly disclosed.",
    leadership_team: "Specific details about Engausa's leadership team are not publicly disclosed.",
    office_environment: "Specific images of Engausa's office environment are not publicly available."
  },
  {
    name: "eHealth Africa",
    founded: "Specific founding year not publicly disclosed.",
    locations: ["Kano", "Abuja", "Kaduna", "Owerri", "Jigawa"],
    industry: "Health Technology / Non-Profit",
    company_profile: "eHealth Africa is a non-profit organization dedicated to building stronger health systems in Africa by designing and implementing data-driven solutions tailored to local needs.",
    contact_information: "info@ehealthafrica.org",
    office_locations: [
      "4-6 Independence Road, Kano, Nigeria",
      "28 Osun Crescent, Maitama, Abuja, Nigeria"
    ],
    leadership_team: [
      { name: "James Okafor", role: "CEO", picture: "https://example.com/james_okafor.jpg" },
      { name: "Amina Bello", role: "Health Director", picture: "https://example.com/amina_bello.jpg" }
    ],
    office_environment_picture: "https://example.com/ehealthafrica_office.jpg",
    office_environment: "Images of eHealth Africa's office environment are available, showcasing a collaborative workspace."
  },
  {
    name: "brandDrive",
    founded: "Specific founding year not publicly disclosed.",
    locations: ["Kano", "Abuja", "Kaduna", "Port Harcourt"],
    industry: "Business Management / E-commerce",
    company_profile: "brandDrive provides tools for businesses to manage their operations both online and in-store, offering solutions like accounting, payments, point of sale, e-commerce, and analytics.",
    contact_information: "Specific contact details are not publicly disclosed.",
    office_locations: "Specific office addresses are not publicly disclosed.",
    leadership_team: "Specific details about brandDrive's leadership team are not publicly disclosed.",
    office_environment: "Specific images of brandDrive's office environment are not publicly available."
  },
  {
    name: "HNG",
    founded: "Specific founding year not publicly disclosed.",
    locations: ["Kano", "Abuja", "Kaduna", "Ibadan", "Jos"],
    industry: "Technology / Education",
    company_profile: "HNG is dedicated to enhancing the skills of tech enthusiasts through its internship programs, collaborating with top tech talents to foster growth and development.",
    contact_information: "Specific contact details are not publicly disclosed.",
    office_locations: "Specific office addresses are not publicly disclosed.",
    leadership_team: [
      { name: "Mark Adeyemi", role: "Founder", picture: "https://example.com/mark_adeyemi.jpg" },
      { name: "Sophia Nwachukwu", role: "Lead Trainer", picture: "https://example.com/sophia_nwachukwu.jpg" }
    ],
    office_environment_picture: "https://example.com/hng_office.jpg",
    office_environment: "Specific images of HNG's office environment are not publicly available."
  },
  {
    name: "MBL Hightech",
    founded: "Specific founding year not publicly disclosed.",
    locations: ["Kano", "Abuja", "Kaduna", "Delta", "Edo"],
    industry: "Outsourcing / Technology Services",
    company_profile: "MBL Hightech offers outsourced services to startups with strong ideas, providing them with specialized workforces to bring their concepts to fruition.",
    contact_information: "Specific contact details are not publicly disclosed.",
    office_locations: "Specific office addresses are not publicly disclosed.",
    leadership_team: [
      { name: "Ahmed Musa", role: "CEO" },
      { name: "Fatima Bello", role: "COO" }
    ],
    office_environment: "Specific images of MBL Hightech's office environment are not publicly available."
  },
  {
    name: "Startup Kano",
    founded: "Specific founding year not publicly disclosed.",
    locations: ["Kano", "Abuja", "Kaduna"],
    industry: "Entrepreneurship / Business Development",
    company_profile: "Startup Kano provides a platform for creative entrepreneurs to grow their ideas, scale their businesses, access funding, and build meaningful networks.",
    contact_information: "Specific contact details are not publicly disclosed.",
    office_locations: "Specific office addresses are not publicly disclosed.",
    leadership_team: [
      { name: "Aliyu Mohammed", role: "Founder" },
      { name: "Hauwa Usman", role: "Community Manager" }
    ],
    office_environment: "Specific images of Startup Kano's office environment are not publicly available."
  }
  ]


export const popularCompaniesJobs = [
  {
    id: '1',
    title: "Software Engineer",
    company: "Zainpay",
    location: "Lagos, Nigeria",
    type: "Full-Time",
    tags: ["Engineering", "Fintech"],
    logo: "/placeholder.svg",
  },
  {
    id: '2',
    title: "Civil Engineer",
    company: "HiTech",
    location: "Abuja, Nigeria",
    type: "Full-Time",
    tags: ["Engineering", "Construction"],
    logo: "/placeholder.svg",
  },
  {
    id: '3',
    title: "Digital Marketing Specialist",
    company: "Engausa",
    location: "Kano, Nigeria",
    type: "Part-Time",
    tags: ["Marketing", "Training"],
    logo: "/placeholder.svg",
  },
  {
    id: '4',
    title: "Data Analyst",
    company: "eHealth Africa",
    location: "Abuja, Nigeria",
    type: "Full-Time",
    tags: ["Data Science", "Healthcare"],
    logo: "/placeholder.svg",
  },
  {
    id: '5',
    title: "Business Development Manager",
    company: "BrandDrive",
    location: "Lagos, Nigeria",
    type: "Full-Time",
    tags: ["Business", "E-commerce"],
    logo: "/placeholder.svg",
  },
  {
    id: '6',
    title: "Frontend Developer",
    company: "HNG",
    location: "Remote",
    type: "Internship",
    tags: ["Development", "Tech"],
    logo: "/placeholder.svg",
  },
  {
    id: '7',
    title: "Product Manager",
    company: "MBL Hightech",
    location: "Lagos, Nigeria",
    type: "Full-Time",
    tags: ["Management", "Tech"],
    logo: "/placeholder.svg",
  },
  {
    id: '8',
    title: "Startup Consultant",
    company: "Startup Kano",
    location: "Kano, Nigeria",
    type: "Contract",
    tags: ["Entrepreneurship", "Consulting"],
    logo: "/placeholder.svg",
  },
];


export const popularRoles = [
    {
        name: "Software Engineer",
        category: ['Technology'],
        img: icons.design
    },
    {
        name: "Product Manager",
        category: ['Business', 'Technology'],
        img: icons.design
    },
    {
        name: "Data Analyst",
        category: ['Technology'],
        img: icons.design
    },
    {
        name: "UX Designer",
        category: ['Design'],
        img: icons.design
    },
    {
        name: "UI Designer",
        category: ['Design'],
        img: icons.design
    },
    {
        name: "Business Analyst",
        category: ['Business', 'Sales'],
        img: icons.design
    },
    {
        name: "HR Manager",
        category: ['Human Resources'],
        img: icons.design
    },
    {
        name: "Sales Manager",
        category: ['Sales', 'Business'],
        img: icons.design
    },
];

export const categoryColorCode: { [key: string]: string } = {
    "Design": "bg-design text-txtDesign",
    "Sales": "bg-sales text-txtSales",
    "Marketing": "bg-marketing text-txtMarketing",
    "Finance": "bg-finance text-txtFinance",
    "Technology": "bg-technology text-txtTechnology",
    "Engineering": "bg-engineering text-txtEngineering",
    "Business": "bg-business text-txtBusiness",
    "Human Resources": "bg-hr text-txtHr",
}
