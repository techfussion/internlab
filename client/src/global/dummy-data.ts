// dummy-data.ts

// Bookmark Data
export const bookmarkData = [
    {
      id: "bk1",
      name: "Frontend Developer Internship",
      description: "Join our team to build amazing user interfaces using React and Next.js. You'll work on real projects with experienced developers.",
      stipend: true,
      stipendAmount: 15000,
      company: {
        name: "TechCorp Solutions",
        logo: "/api/placeholder/64/64"
      }
    },
    {
      id: "bk2",
      name: "Backend Developer Role",
      description: "Work with Node.js and PostgreSQL to build scalable backend services. Great opportunity for students interested in server-side development.",
      stipend: true,
      stipendAmount: 20000,
      company: {
        name: "DataFlow Systems",
        logo: "/api/placeholder/64/64"
      }
    },
    {
      id: "bk3",
      name: "Mobile App Development",
      description: "Create cross-platform mobile applications using React Native. Perfect for those interested in mobile development.",
      stipend: false,
      stipendAmount: null,
      company: {
        name: "MobileFirst Inc",
        logo: "/api/placeholder/64/64"
      }
    }
  ];
  
// Review Data
export const reviewData = [
{
    id: "rv1",
    rating: 4.5,
    comment: "Great work environment with lots of learning opportunities. The mentors are very helpful and the projects are challenging.",
    companyId: "c1",
    company: {
    name: "TechCorp Solutions",
    logo: "/api/placeholder/64/64"
    },
    createdAt: "2024-01-15T10:00:00Z",
    verified: true
},
{
    id: "rv2",
    rating: 3.5,
    comment: "Good experience overall. The work was interesting but the onboarding process could be better. Technical stack is modern and up-to-date.",
    companyId: "c2",
    company: {
    name: "DataFlow Systems",
    logo: "/api/placeholder/64/64"
    },
    createdAt: "2024-02-01T14:30:00Z",
    verified: true
},
{
    id: "rv3",
    rating: 5,
    comment: "Exceptional internship experience! The team is supportive, projects are meaningful, and there's a great work-life balance.",
    companyId: "c3",
    company: {
    name: "MobileFirst Inc",
    logo: "/api/placeholder/64/64"
    },
    createdAt: "2024-02-10T09:15:00Z",
    verified: false
}
];

// Submission Data
export const submissionData = [
{
    id: "sub1",
    type: "NEW_COMPANY",
    status: "PENDING",
    data: {
    name: "CloudTech Innovations",
    description: "Leading cloud solutions provider",
    industryType: ["Technology", "Cloud Services"],
    techStacks: ["AWS", "Azure", "Google Cloud"],
    perks: ["Remote Work", "Flexible Hours", "Learning Budget"],
    companySize: "50-200",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India"
    },
    adminFeedback: null,
    createdAt: "2024-02-15T08:00:00Z",
    company: {
    name: "CloudTech Innovations",
    logo: "/api/placeholder/64/64"
    }
},
{
    id: "sub2",
    type: "UPDATE_COMPANY",
    status: "APPROVED",
    data: {
    techStacks: ["React", "Node.js", "PostgreSQL"],
    perks: ["Health Insurance", "Gym Membership"],
    companySize: "200-500"
    },
    adminFeedback: "Changes approved and updated successfully.",
    createdAt: "2024-02-01T11:30:00Z",
    company: {
    name: "TechCorp Solutions",
    logo: "/api/placeholder/64/64"
    }
},
{
    id: "sub3",
    type: "NEW_DOMAIN",
    status: "REJECTED",
    data: {
    name: "AI Research Intern",
    description: "Research position in AI/ML",
    requirements: "Knowledge of Python, PyTorch, and Machine Learning fundamentals",
    perks: ["Research Publication Opportunity", "GPU Access"],
    stipend: true,
    stipendAmount: 25000
    },
    adminFeedback: "Please provide more detailed information about the research projects and expected outcomes.",
    createdAt: "2024-01-25T15:45:00Z",
    company: {
    name: "DataFlow Systems",
    logo: "/api/placeholder/64/64"
    }
},
{
    id: "sub4",
    type: "UPDATE_DOMAIN",
    status: "APPROVED",
    data: {
    requirements: "Updated requirements with specific technical skills",
    stipendAmount: 30000,
    perks: ["Remote Work", "Flexible Hours", "Learning Budget", "Health Insurance"]
    },
    adminFeedback: "Domain updated with clearer requirements.",
    createdAt: "2024-02-10T13:20:00Z",
    company: {
    name: "MobileFirst Inc",
    logo: "/api/placeholder/64/64"
    }
}
];