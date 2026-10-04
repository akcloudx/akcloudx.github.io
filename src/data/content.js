/* ============================================================================
   CONTENT — this is the ONLY file you need to edit to change what the site says.
   Everything below is rendered into the page automatically.
   ========================================================================== */

export const content = {

  /* ---------------------------------------------------------------- meta -- */
  meta: {
    name: 'Aakif Shaikh',
    initials: 'AS',
    title: 'Cloud Solutions Architect',
    // Rotating words in the hero, cycled one at a time.
    roles: ['Multi-Cloud Architecture', 'FinOps & Cost Strategy', 'DevSecOps', 'Cloud Governance'],
    location: 'Navi Mumbai, Maharashtra, India',
    tagline: 'I design cloud architectures that cost less and break less.',
    // Shown publicly in the contact grid.
    email: 'aakif_shaikh@outlook.com',
    resumeUrl: '', // e.g. 'assets/Aakif_Shaikh_Resume.pdf' — drop the PDF into /assets
    links: {
      linkedin: 'https://www.linkedin.com/in/aakif-shaikh-ascloudx/',
      github: 'https://github.com/akcloudx',
    },
  },

  /* ---------------------------------------------------------------- about -- */
  about: {
    heading: 'About',
    label: 'Who I am',
    lead: 'Cloud and platform engineer with 6.5+ years in IT infrastructure, specialising in multi-cloud architecture, FinOps and DevOps automation.',
    body: [
      'I design cost-optimised, zero-trust architectures for enterprise and government clients, managing 300–500+ hybrid servers across international markets. My background is an MSc in Cloud Architecture and Security alongside AWS and Azure certifications.',
      'That work has delivered $50K+ per month in recurring savings and a 75% reduction in vulnerability exposure.',
    ],
  },

  /* -------------------------------------------------------------- metrics -- */
  // value / prefix / suffix are animated as counters.
  metrics: [
    { prefix: '$', value: 50,   suffix: 'K+', unit: 'per month', label: 'Recurring cloud savings delivered' },
    { prefix: '',  value: 75,   suffix: '%',  unit: 'reduction', label: 'Cut in vulnerability exposure' },
    { prefix: '',  value: 500,  suffix: '+',  unit: 'servers',   label: 'Hybrid Windows/Linux estate managed' },
    { prefix: '',  value: 99.9, suffix: '%',  unit: 'uptime',    label: 'Sustained system availability' },
  ],

  /* ----------------------------------------------------------- experience -- */
  experience: {
    heading: 'Experience',
    label: 'Where I have worked',
    roles: [
      {
        company: 'Brennan',
        role: 'Cloud Consultant',
        period: 'Sept 2023 — Present',
        place: 'Navi Mumbai, India (Hybrid)',
        note: 'Promoted through Senior IT Analyst and System Administrator roles since joining',
        current: true,
        points: [
          'Delivered $50K+/month in recurring cost savings across 3 enterprise client portfolios by redesigning Azure spend through multi-year Savings Plans, Reserved Capacity and data-driven SKU right-sizing — up to 53% savings on individual workloads.',
          'Serve as lead technical advisor for 6–10 enterprise and government client accounts, overseeing cloud architecture and operations across 300–500+ servers internationally.',
          'Led the company’s Microsoft Azure Expert MSP audit process, presenting security and compliance evidence directly to Microsoft auditors and helping maintain our elite MSP certification.',
          'Improved client cloud governance and maturity using Microsoft’s CAF/WAF best-practice frameworks, delivering a governance report for each account.',
          'Built a proactive monitoring and alerting system (Azure Monitor/KQL) that kept clients ahead of security issues and maintenance windows, sustaining 99.9% uptime.',
          'Reduced vulnerability exposure by 75% through infrastructure and VM vulnerability remediation, closing findings identified in Nessus and other security tools.',
          'Applied zero-trust principles by migrating Azure Key Vaults from access policies to RBAC permission models, and advising clients to use Privileged Identity Management with least-privilege RBAC instead of permanent role assignments.',
          'Standardised SOPs in Atlassian Confluence, cutting Service Desk escalations by 30% across supported accounts, including firmware and patch management across VMware ESXi and Hyper-V.',
          'Resolved 1,500+ P1–P4 L3 requests and 200+ high-risk Change Requests annually within SLA under ITIL v4 practices.',
          'Administered enterprise messaging and virtualisation environments including Office 365, Exchange Online, Microsoft Intune, Mimecast, VMware ESXi and Hyper-V.',
          'Mentored 4 junior engineers and standardised team documentation, becoming the go-to technical resource across teams.',
        ],
        tags: ['Azure', 'FinOps', 'CAF / WAF', 'Zero Trust', 'KQL', 'ITIL v4'],
      },
      {
        company: 'D2K Technologies',
        role: 'System Administrator',
        period: 'July 2022 — Aug 2023',
        place: 'Navi Mumbai, India (On-site)',
        points: [
          'Architected and managed 50+ Windows/Linux servers for a FinTech software development company serving Tier-1 banking clients, supporting secure, highly available production infrastructure.',
          'Provisioned and deployed UAT and production environments for Bank of India, Union Bank and National Housing Bank, scaling Hyper-V virtualisation to host SQL Server, Oracle DB, IIS and SSRS/SSIS on a strict client timeline.',
          'Secured infrastructure and disaster recovery posture for 200+ users through Active Directory GPO enforcement, Zabbix monitoring and automated backup/DR protocols.',
        ],
        tags: ['Hyper-V', 'SQL Server', 'Active Directory', 'Zabbix', 'DR'],
      },
      {
        company: 'SM2 Infotech',
        role: 'Junior IT Executive',
        period: 'Jan 2020 — Feb 2022',
        place: 'Navi Mumbai, India (On-site)',
        points: [
          'Migrated mailbox and OneDrive data from Microsoft 365 to Google Workspace for Billabong High International School with zero data loss, and served as the primary post-migration support contact.',
        ],
        tags: ['Microsoft 365', 'Google Workspace', 'Migration'],
      },
    ],
  },

  /* ------------------------------------------------------------- projects -- */
  projects: {
    heading: 'Selected Work',
    label: 'Things I have built',
    items: [
      {
        index: '01',
        title: 'Multi-Cloud FinOps Optimization System',
        kind: 'MSc Capstone Project',
        year: '2026',
        summary: 'A live, multi-tenant platform that unifies Azure and AWS cost and inventory data, then turns it into dollar-quantified savings recommendations.',
        points: [
          'Unified Azure and AWS cost/inventory into one live, multi-tenant platform (Python, Streamlit, Azure SQL, Azure Functions) using 9 KQL query groups, 14+ AWS resource types and hourly automated sync.',
          'Built Reservation/Savings Plan coverage matching and a VM/EC2 rightsizing engine producing dollar-quantified recommendations and FinOps maturity scoring.',
          'Achieved zero standing credentials using Managed Identity and read-only IAM, validated against provider policy simulators.',
        ],
        tags: ['Python', 'Streamlit', 'Azure SQL', 'Azure Functions', 'KQL', 'FinOps'],
        link: 'https://github.com/akcloudx',
        linkLabel: 'View repository',
        accent: 'cyan',
      },
      {
        index: '02',
        title: 'Multi-Year Azure Cost Architecture',
        kind: 'Enterprise Engagement',
        year: '2025',
        summary: 'A commitment-and-rightsizing strategy across three enterprise portfolios that now returns more than $50K every month.',
        points: [
          '3-Year Savings Plans and Reserved Capacity for MySQL Flexible Servers — 29% savings.',
          'Reserved Instances for Azure SQL — 47% savings.',
          'v5-generation SKU right-sizing backed by 30 days of performance telemetry — 53% savings.',
        ],
        tags: ['Savings Plans', 'Reserved Instances', 'Right-Sizing', 'TCO'],
        link: '',
        linkLabel: '',
        accent: 'mint',
      },
      {
        index: '03',
        title: 'Zero-Trust Access Architecture',
        kind: 'Security Design',
        year: '2025',
        summary: 'A least-privilege identity model that cut vulnerability exposure by three quarters across a 500-server hybrid estate.',
        points: [
          'Migrated Azure Key Vaults from access policies to RBAC permission models, and replaced standing administrative access with Privileged Identity Management.',
          'Closed findings surfaced by Nessus scanning and SOC monitoring, reducing exposure by 75%.',
          'Rolled out across enterprise and government accounts without disrupting operational SLAs.',
        ],
        tags: ['Zero Trust', 'Entra ID', 'PIM', 'Defender for Cloud'],
        link: '',
        linkLabel: '',
        accent: 'violet',
      },
      {
        index: '04',
        title: 'Azure Monitor & KQL Observability Platform',
        kind: 'Platform Engineering',
        year: '2025',
        summary: 'Proactive alerting on advisories, retirements and planned maintenance — availability held at 99.9%.',
        points: [
          'Designed a KQL-based observability architecture across a multi-account hybrid estate.',
          'Proactive Service Health alerting for security advisories, service retirements and planned maintenance.',
          'Sustained 99.9% system availability across supported accounts.',
        ],
        tags: ['Azure Monitor', 'KQL', 'Grafana', 'Service Health'],
        link: '',
        linkLabel: '',
        accent: 'amber',
      },
    ],
  },

  /* --------------------------------------------------------------- skills -- */
  /* NOT RENDERED. The standalone Capabilities section was removed — the same
     technologies already appear as tags on every job and project card, so it
     was mostly repeating itself. Kept here in case you want it back: restore
     the <section id="skills"> block in index.html, renderSkills() in
     src/js/render.js, the .skills/.skill-group/.chip rules in sections.css,
     and a { id: 'skills' } entry in `nav` below. */
  skills: {
    heading: 'Capabilities',
    label: 'What I work with',
    groups: [
      {
        title: 'Cloud Platforms',
        items: ['Microsoft Azure (IaaS, PaaS, Networking)', 'AWS (Compute, Storage, IAM)'],
      },
      {
        title: 'Architecture, FinOps & Governance',
        items: ['Solution Design', 'TCO / Cost Modeling', 'Savings Plans & Reserved Instances', 'SKU Right-Sizing', 'Well-Architected Framework', 'Cloud Adoption Framework', 'Migration & DR Planning', 'MSP Audit Readiness'],
      },
      {
        title: 'DevSecOps & Security',
        items: ['Microsoft Defender for Cloud', 'Privileged Identity Management', 'Zero-Trust RBAC', 'Nessus', 'CrowdStrike'],
      },
      {
        title: 'DevOps, CI/CD & Automation',
        items: ['Terraform', 'Ansible', 'Kubernetes (AKS / EKS)', 'Docker', 'Azure DevOps', 'GitHub Actions', 'Argo CD', 'Jenkins', 'Python / Bash / PowerShell'],
      },
      {
        title: 'Systems, Identity & Monitoring',
        items: ['Windows Server', 'Linux (Ubuntu / CentOS)', 'VMware ESXi', 'Hyper-V', 'Entra ID', 'Active Directory / GPO', 'Azure Monitor (KQL)', 'Grafana'],
      },
      {
        title: 'IT Service Management',
        items: ['ITIL v4', 'Incident Management', 'Problem Management', 'Change Management', 'Request Management', 'ServiceNow'],
      },
    ],
  },

  /* ------------------------------------------------------- certifications -- */
  certifications: {
    heading: 'Certifications',
    label: 'Validated',
    // `image` is an optional badge picture for a certification. Give one and
    // the row renders as a badge card; leave it out and the row stays a plain
    // text line with just the vendor mark on the group heading.
    // `icon` picks a vendor mark drawn inline in render.js — 'aws' or 'microsoft'.
    // `url` is the public Credly (or Microsoft Learn) verification link for that
    // certification. Leave it empty and the row simply renders as plain text;
    // fill it in and the row becomes a link with a "Verify" affordance.
    groups: [
      {
        vendor: 'AWS',
        icon: 'aws',
        items: [
          {
            name: 'Solutions Architect — Associate',
            code: 'SAA-C03',
            image: 'assets/aws-certified-solutions-architect-associate.webp',
            url: 'https://www.credly.com/badges/86a5f079-cd91-46b1-94bc-dbdc02a9f8c6/public_url',
          },
          {
            name: 'CloudOps Engineer — Associate',
            code: 'SOA-C03',
            image: 'assets/aws-certified-cloudops-engineer-associate.webp',
            url: 'https://www.credly.com/badges/65e5ab82-813d-4bd1-b76d-3a54f2cdf1dd/public_url',
          },
          {
            name: 'Cloud Practitioner',
            code: 'CLF-C02',
            image: 'assets/aws-certified-cloud-practitioner.webp',
            url: 'https://www.credly.com/badges/c15a030c-ac38-415f-8d72-14a624d7d063/public_url',
          },
        ],
      },
      {
        vendor: 'Microsoft Azure',
        icon: 'microsoft',
        items: [
          {
            name: 'Azure Administrator Associate',
            code: 'AZ-104',
            image: 'assets/azure-administrator-associate.webp',
            url: 'https://learn.microsoft.com/api/credentials/share/en-gb/AakifShaikh-4384/E5545849BC83CD38?sharingId=6E7A3677DBA554C6',
          },
          {
            name: 'Security Operations Analyst Associate',
            code: 'SC-200',
            image: 'assets/azure-security-operations-analyst.webp',
            url: 'https://learn.microsoft.com/api/credentials/share/en-gb/AakifShaikh-4384/C1174324F1EF8F76?sharingId=6E7A3677DBA554C6',
          },
          {
            name: 'Azure Fundamentals',
            code: 'AZ-900',
            // Restyled badge. 'assets/azure-fundamentals.webp' is the official
            // Microsoft-issued artwork — swap this line back to use it.
            image: 'assets/azure-fundamentals-styled.webp',
            url: 'https://learn.microsoft.com/api/credentials/share/en-gb/AakifShaikh-4384/2C3BF5B48C45E312?sharingId=6E7A3677DBA554C6',
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------ education -- */
  education: {
    heading: 'Education',
    label: 'Studied',
    items: [
      {
        degree: 'MSc in Cloud Architecture and Security',
        school: 'REVA Academy for Corporate Excellence, REVA University',
        place: 'Bangalore, India',
        period: '2024 — 2026',
        note: '',
      },
      {
        degree: 'BSc in Information Technology',
        school: 'Yashwantrao Chavan College of Arts, Commerce and Science',
        place: 'Navi Mumbai, India',
        period: '2019 — 2022',
        note: 'CGPI 9.15 / 10',
      },
    ],
  },

  /* ----------------------------------------------------------- languages -- */
  languages: [
    { name: 'English', level: 'Fluent' },
    { name: 'Hindi', level: 'Native' },
    { name: 'Marathi', level: 'Conversational' },
  ],

  /* ------------------------------------------------------------- contact -- */
  contact: {
    heading: 'Let us talk',
    label: 'Get in touch',
    body: 'Open to conversations about cloud architecture, FinOps and cost strategy, or security design. The fastest way to reach me is LinkedIn.',
  },

  /* ---------------------------------------------- marquee ticker keywords -- */
  ticker: [
    'AZURE', 'FINOPS', 'AWS', 'ZERO TRUST', 'TERRAFORM', 'KUBERNETES',
    'COST OPTIMISATION', 'KQL', 'WELL-ARCHITECTED', 'DEVSECOPS', 'ENTRA ID',
  ],

  /* --------------------------------------------------- navigation sections -- */
  nav: [
    { id: 'about',   label: 'About' },
    { id: 'work',    label: 'Work' },
    { id: 'certs',   label: 'Certifications' },
    { id: 'journey', label: 'Journey' },
    { id: 'contact', label: 'Contact' },
  ],
};
