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
    lead: 'Cloud consultant and architect specialising in multi-cloud cost optimisation and security design.',
    body: [
      'I hold an MSc in Cloud Architecture and Security alongside AWS and Azure certifications, and I spend my days designing cost-optimised, secure architectures for enterprise-scale infrastructure.',
      'That work has delivered $50K+ per month in recurring savings and a 75% reduction in vulnerability exposure across 300–500+ hybrid servers, spanning enterprise and government accounts across international markets.',
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
        role: 'Associate Cloud Consultant — Managed Services',
        period: 'Nov 2025 — Present',
        place: 'Navi Mumbai, India (Hybrid)',
        current: true,
        points: [
          'Designed and implemented a multi-year Azure cost architecture combining 3-Year Savings Plans and Reserved Capacity for MySQL Flexible Servers (29%), Reserved Instances for Azure SQL (47%), and v5-generation SKU right-sizing backed by 30-day performance data (53%) — delivering $50K+ USD in recurring monthly savings across 3 enterprise client portfolios.',
          'Act as trusted cloud advisor and technical architect for 6–10 enterprise and government accounts, overseeing architecture and operations for 300–500+ hybrid Windows/Linux servers across international markets.',
          'Led Microsoft Azure Expert MSP Audit engagements, presenting technical evidence, security architecture and compliance documentation to Microsoft auditors, maintaining Azure Expert MSP certification status.',
          'Governed client cloud maturity using the Microsoft Cloud Adoption Framework and Well-Architected Framework, producing WAF-aligned governance reports per account.',
          'Engineered an Azure Monitor/KQL observability architecture with proactive Service Health alerting, sustaining 99.9% availability.',
          'Standardised SOPs in Confluence and mentored 4 junior engineers as the go-to technical and process resource for cross-team peers.',
        ],
        tags: ['Azure', 'FinOps', 'CAF / WAF', 'KQL', 'Architecture'],
      },
      {
        company: 'Brennan',
        role: 'Associate System Administrator — Managed Services',
        period: 'Sept 2024 — Nov 2025',
        place: 'Navi Mumbai, India (Hybrid)',
        points: [
          'Reduced vulnerability exposure by 75% by designing a zero-trust access architecture using custom RBAC and Privileged Identity Management, closing findings identified via Nessus and SOC monitoring.',
          'Standardised SOPs in Confluence, cutting Service Desk escalations by 30% across supported accounts, including firmware and patch management across VMware ESXi and Hyper-V.',
          'Resolved 1,500+ P1–P4 L3 requests and 200+ high-risk Change Requests annually within SLA under ITIL v4 practices.',
        ],
        tags: ['Zero Trust', 'PIM', 'RBAC', 'Nessus', 'ITIL v4'],
      },
      {
        company: 'Brennan',
        role: 'Senior IT Analyst — Managed Services',
        period: 'Sept 2023 — Sept 2024',
        place: 'Navi Mumbai, India',
        points: [
          'Administered enterprise messaging and virtualisation environments including Office 365, Exchange Online, Microsoft Intune, Mimecast, VMware ESXi and Hyper-V.',
        ],
        tags: ['Microsoft 365', 'Exchange', 'Intune', 'ESXi'],
      },
      {
        company: 'D2K Technologies',
        role: 'System Administrator',
        period: 'July 2022 — Aug 2023',
        place: 'Navi Mumbai, India (On-site)',
        points: [
          'Architected and managed 50+ Windows/Linux servers for a FinTech software company serving Tier-1 banking clients, supporting secure, highly available production infrastructure.',
          'Provisioned UAT and production environments for Bank of India, Union Bank and National Housing Bank, scaling Hyper-V virtualisation to host SQL Server, Oracle DB, IIS and SSRS/SSIS on a strict client timeline.',
          'Secured infrastructure and DR posture for 200+ users through Active Directory GPO enforcement, Zabbix monitoring and automated backup/DR protocols.',
        ],
        tags: ['Hyper-V', 'SQL Server', 'Active Directory', 'DR'],
      },
      {
        company: 'SM2 Infotech',
        role: 'Junior IT Executive',
        period: 'Jan 2020 — Feb 2022',
        place: 'Navi Mumbai, India (On-site)',
        points: [
          'Delivered Tier 1/2 on-site and remote support under Annual Maintenance Contracts, resolving issues across Microsoft Office, Outlook and network device environments within SLA.',
          'Migrated mailbox and OneDrive data from Microsoft 365 to Google Workspace for Billabong High International School with zero data loss, then served as primary post-migration support contact.',
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
        summary: 'A live platform that unifies Azure and AWS cost and inventory data, then turns it into dollar-quantified savings recommendations.',
        points: [
          'Unified Azure and AWS cost/inventory into one live platform using 9 KQL query groups, 14+ AWS resource types and hourly automated sync.',
          'Built Reservation/Savings Plan coverage matching and a VM/EC2 rightsizing engine producing dollar-quantified recommendations and FinOps maturity scoring.',
          'Achieved zero standing credentials using Managed Identity and read-only IAM, validated against provider policy simulators.',
        ],
        tags: ['Azure', 'AWS', 'KQL', 'Python', 'FinOps'],
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
          'Custom RBAC roles and Privileged Identity Management replacing standing administrative access.',
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
        title: 'DevOps & Automation',
        items: ['Terraform', 'Ansible', 'Kubernetes (AKS / EKS)', 'Docker', 'Azure DevOps', 'GitHub Actions', 'Argo CD', 'Jenkins', 'Python / Bash / PowerShell'],
      },
      {
        title: 'Systems, Identity & Monitoring',
        items: ['Windows Server', 'Linux (Ubuntu / CentOS)', 'VMware ESXi', 'Hyper-V', 'Entra ID', 'Active Directory / GPO', 'Azure Monitor (KQL)', 'Grafana'],
      },
      {
        title: 'IT Service Management',
        items: ['ITIL v4', 'Incident Management', 'Problem Management', 'Change Management', 'Request Management'],
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
        school: 'Yashwantrao Chavan College of Science, Commerce & IT',
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
