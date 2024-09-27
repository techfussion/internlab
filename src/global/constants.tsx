import { icons } from "./imageUtil";

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
        img: icons.design
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
