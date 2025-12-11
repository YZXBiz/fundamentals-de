---
sidebar_position: 11
title: "Chapter 10: Security and Privacy"
description: "Master security and privacy fundamentals for data engineering including people, processes, and technology best practices to protect sensitive data and build trustworthy systems"
---

import {
  Box, Arrow, Row, Column, Group,
  DiagramContainer, ProcessFlow, TreeDiagram,
  CardGrid, StackDiagram, ComparisonTable,
  colors
} from '@site/src/components/diagrams';

# Chapter 10: Security and Privacy

> **"Security needs to be a habit of mind and action; treat data like your wallet or smartphone."**
>
> — The Foundation of Data Trust

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [People: The Human Element](#2-people-the-human-element)
   - 2.1. [The Power of Negative Thinking](#21-the-power-of-negative-thinking)
   - 2.2. [Always Be Paranoid](#22-always-be-paranoid)
3. [Processes: Building Security Habits](#3-processes-building-security-habits)
   - 3.1. [Security Theater Versus Security Habit](#31-security-theater-versus-security-habit)
   - 3.2. [Active Security](#32-active-security)
   - 3.3. [The Principle of Least Privilege](#33-the-principle-of-least-privilege)
   - 3.4. [Shared Responsibility in the Cloud](#34-shared-responsibility-in-the-cloud)
   - 3.5. [Always Back Up Your Data](#35-always-back-up-your-data)
   - 3.6. [Example Security Policy](#36-example-security-policy)
4. [Technology: Securing Systems](#4-technology-securing-systems)
   - 4.1. [Patch and Update Systems](#41-patch-and-update-systems)
   - 4.2. [Encryption](#42-encryption)
   - 4.3. [Logging, Monitoring, and Alerting](#43-logging-monitoring-and-alerting)
   - 4.4. [Network Access](#44-network-access)
   - 4.5. [Security for Low-Level Data Engineering](#45-security-for-low-level-data-engineering)
   - 4.6. [Internal Security Research](#46-internal-security-research)
5. [Summary](#5-summary)

---

## 1. Introduction

**In plain English:** Security and privacy are like locking your doors and closing your curtains - fundamental practices that protect what's valuable and respect people's right to control their personal information.

**In technical terms:** Security and privacy are critical undercurrents of data engineering that span people, processes, and technology, ensuring sensitive data is protected throughout the data engineering lifecycle while maintaining legal compliance and ethical standards.

**Why it matters:** One security breach or data leak can destroy your business, ruin your career, and betray the trust of customers and partners. With increasingly stringent privacy laws (GDPR, HIPAA, FERPA) and severe penalties for violations, security and privacy must be the first consideration in every aspect of data engineering.

### 1.1. The Security Imperative

Security is vital to the practice of data engineering. This should be blindingly obvious, but we're constantly amazed at how often data engineers view security as an afterthought. We believe that security is the first thing a data engineer needs to think about in every aspect of their job and every stage of the data engineering lifecycle.

You deal with sensitive data, information, and access daily. Your organization, customers, and business partners expect these valuable assets to be handled with the utmost care and concern. One security breach or a data leak can leave your business dead in the water; your career and reputation are ruined if it's your fault.

> **Insight**
>
> Security is a key ingredient for privacy. Privacy has long been critical to trust in the corporate information technology space; engineers directly or indirectly handle data related to people's private lives, including financial information, private communications, medical history, educational records, and job history.

### 1.2. The Privacy Landscape

Increasingly, privacy is a matter of significant legal importance. Examples include:

<CardGrid
  columns={3}
  cards={[
    {
      title: "FERPA (1970s)",
      icon: "📚",
      color: colors.blue,
      items: [
        "Family Educational Rights",
        "US education data",
        "Student privacy protection"
      ]
    },
    {
      title: "HIPAA (1990s)",
      icon: "🏥",
      color: colors.purple,
      items: [
        "Health Insurance Portability",
        "Medical data protection",
        "Patient privacy rights"
      ]
    },
    {
      title: "GDPR (2010s)",
      icon: "🇪🇺",
      color: colors.green,
      items: [
        "European privacy law",
        "Personal data rights",
        "Severe penalties"
      ]
    }
  ]}
/>

The penalties for violation of any of these laws can be significant, even devastating, to a business. And because data systems are woven into the fabric of education, health care, and business, data engineers handle sensitive data related to each of these laws.

### 1.3. Your Role and Responsibility

A data engineer's exact security and privacy responsibilities will vary significantly between organizations:

<DiagramContainer title="Security Responsibilities Across Organizations">
  <ComparisonTable
    beforeTitle="Small Startup"
    afterTitle="Large Tech Company"
    beforeColor={colors.orange}
    afterColor={colors.blue}
    items={[
      { label: "Data Engineer Role", before: "Double duty as security engineer", after: "Collaborate with security team" },
      { label: "Security Team", before: "Limited or none", after: "Armies of specialists" },
      { label: "Scope", before: "End-to-end security", after: "Team-specific vulnerabilities" },
      { label: "Focus", before: "Everything", after: "Identify and report issues" }
    ]}
  />
</DiagramContainer>

Even in organizations with dedicated security personnel, data engineers will often be able to identify security practices and technology vulnerabilities within their own teams and systems that they can report and mitigate in collaboration with dedicated security personnel.

### 1.4. People, Processes, and Technology

In this chapter, we lay out things data engineers should consider around security, particularly in **people, processes, and technology** (in that order). This isn't a complete list, but it lays out the major things we wish would improve based on our experience.

<ProcessFlow
  direction="horizontal"
  steps={[
    { title: "People", description: "The weakest link - security starts with you", icon: "👥", color: colors.red },
    { title: "Processes", description: "Build habits that make security automatic", icon: "🔄", color: colors.orange },
    { title: "Technology", description: "Tools and systems to enforce security", icon: "🔧", color: colors.blue }
  ]}
/>

---

## 2. People: The Human Element

**In plain English:** People are like the front door to your house - the strongest locks and alarms are useless if someone leaves the door wide open or gives away the key.

**In technical terms:** The human element represents the most significant security vulnerability in any system, requiring constant vigilance, defensive posture, and paranoid thinking to mitigate social engineering and credential compromise attacks.

**Why it matters:** The weakest link in security and privacy is you. Security is often compromised at the human level, so conduct yourself as if you're always a target. A bot or human actor is trying to infiltrate your sensitive credentials and information at any given time.

### 2.1. The Power of Negative Thinking

#### What is Negative Thinking?

In a world obsessed with positive thinking, negative thinking is distasteful. However, American surgeon Atul Gawande wrote a 2007 op-ed in the New York Times on precisely this subject. His central thesis is that positive thinking can blind us to the possibility of terrorist attacks or medical emergencies and deter preparation. Negative thinking allows us to consider disastrous scenarios and act to prevent them.

#### Applying Negative Thinking to Data Engineering

<DiagramContainer title="Negative Thinking in Action">
  <Column gap="lg">
    <Group title="Before Collecting Data" color={colors.blue} direction="column">
      <Box color={colors.blue} icon="❓">
        Should we collect this sensitive data?
      </Box>
      <Box color={colors.green} icon="✓" variant="subtle">
        Only collect if actual downstream need exists
      </Box>
      <Box color={colors.red} icon="⚠️" variant="subtle">
        Best protection = don't ingest in first place
      </Box>
    </Group>
    <Group title="When Building Pipelines" color={colors.purple} direction="column">
      <Box color={colors.purple} icon="🤔">
        What are the attack scenarios?
      </Box>
      <Box color={colors.green} icon="✓" variant="subtle">
        Think through leak and breach scenarios
      </Box>
      <Box color={colors.red} icon="⚠️" variant="subtle">
        Ensure real security, not illusion of safety
      </Box>
    </Group>
  </Column>
</DiagramContainer>

Data engineers should actively think through the scenarios for data utilization and collect sensitive data only if there is an actual need downstream. The best way to protect private and sensitive data is to avoid ingesting this data in the first place.

> **Insight**
>
> Data engineers should think about the attack and leak scenarios with any data pipeline or storage system they utilize. When deciding on security strategies, ensure that your approach delivers proper security and not just the illusion of safety.

### 2.2. Always Be Paranoid

#### The Paranoia Principle

Always exercise caution when someone asks you for your credentials. When in doubt—and you should always be in extreme doubt when asked for credentials—hold off and get second opinions from your coworkers and friends.

<DiagramContainer title="Verification Protocol">
  <ProcessFlow
    direction="vertical"
    steps={[
      { title: "Credential Request", description: "Someone asks for sensitive information", icon: "📧", color: colors.red },
      { title: "STOP", description: "Never respond immediately", icon: "🛑", color: colors.orange },
      { title: "Verify", description: "Confirm legitimacy through alternate channel", icon: "☎️", color: colors.blue },
      { title: "Act", description: "Only proceed if 100% certain", icon: "✓", color: colors.green }
    ]}
  />
</DiagramContainer>

**Key principles:**

- Confirm with other people that the request is indeed legitimate
- A quick chat or phone call is cheaper than a ransomware attack triggered through an email click
- Trust nobody at face value when asked for credentials, sensitive data, or confidential information
- This includes requests from your coworkers

#### Privacy and Ethics: Your First Line of Defense

You are also the first line of defense in respecting privacy and ethics:

<CardGrid
  columns={2}
  cards={[
    {
      title: "When Uncomfortable",
      icon: "😟",
      color: colors.orange,
      items: [
        "Uncomfortable with data collection?",
        "Ethical questions about handling?",
        "Raise concerns with colleagues",
        "Escalate to leadership"
      ]
    },
    {
      title: "Your Responsibility",
      icon: "✓",
      color: colors.green,
      items: [
        "Ensure legal compliance",
        "Maintain ethical standards",
        "Speak up when in doubt",
        "Protect user privacy"
      ]
    }
  ]}
/>

---

## 3. Processes: Building Security Habits

**In plain English:** Security processes are like brushing your teeth - they need to be simple enough to do every day without thinking, and effective enough to prevent problems.

**In technical terms:** Security processes transform security from a compliance checkbox into habitual practice through regular training, least privilege enforcement, and shared responsibility models that integrate security into daily workflows.

**Why it matters:** When people follow regular security processes, security becomes part of the job. Make security a habit, regularly practice real security, exercise the principle of least privilege, and understand the shared responsibility model in the cloud.

### 3.1. Security Theater Versus Security Habit

#### The Problem with Security Theater

<DiagramContainer title="Security Theater vs. Real Security">
  <ComparisonTable
    beforeTitle="Security Theater"
    afterTitle="Security Habit"
    beforeColor={colors.red}
    afterColor={colors.green}
    items={[
      { label: "Documentation", before: "Hundreds of pages nobody reads", after: "Simple, practical guidelines" },
      { label: "Training", before: "Annual review, immediately forgotten", after: "Monthly practice, ingrained" },
      { label: "Purpose", before: "Check compliance boxes", after: "Build security culture" },
      { label: "Result", before: "Illusion of security", after: "Real protection" }
    ]}
  />
</DiagramContainer>

With our corporate clients, we see a pervasive focus on compliance (with internal rules, laws, recommendations from standards bodies), but not enough attention to potentially bad scenarios. Unfortunately, this creates an illusion of security but often leaves gaping holes that would be evident with a few minutes of reflection.

#### Building Security Habits

Security needs to be simple and effective enough to become habitual throughout an organization. We're amazed at the number of companies with security policies in the hundreds of pages that nobody reads, the annual security policy review that people immediately forget, all in checking a box for a security audit.

> **Insight**
>
> Instead, pursue the spirit of genuine and habitual security; bake a security mindset into your culture. Security doesn't need to be complicated. For example, at our company, we run security training and policy review at least once a month to ingrain this into our team's DNA and update each other on security practices we can improve.

**Key principles:**

- Security must not be an afterthought for your data team
- Everyone is responsible and has a role to play
- It must be the priority for you and everyone else you work with
- Make it simple, make it habitual, make it real

### 3.2. Active Security

**In plain English:** Active security is like staying current on weather forecasts and road conditions instead of just checking once a year - it means continuously adapting to new threats.

**In technical terms:** Active security entails thinking about and researching security threats in a dynamic and changing world, going beyond scheduled compliance checks to actively investigate vulnerabilities specific to your organization.

**Why it matters:** Rather than simply deploying scheduled simulated phishing attacks, you can take an active security posture by researching successful phishing attacks and thinking through your organizational security vulnerabilities.

<DiagramContainer title="Active vs. Passive Security">
  <Column gap="lg">
    <Group title="Passive Security" color={colors.red} direction="column">
      <Row gap="md">
        <Box color={colors.red} variant="outlined" icon="📋">Standard checklist</Box>
        <Box color={colors.red} variant="outlined" icon="📧">Scheduled phishing tests</Box>
        <Box color={colors.red} variant="outlined" icon="✓">Compliance audit</Box>
      </Row>
    </Group>
    <Arrow direction="down" label="Evolve to" />
    <Group title="Active Security" color={colors.green} direction="column">
      <Row gap="md">
        <Box color={colors.green} variant="outlined" icon="🔍">Research real attacks</Box>
        <Box color={colors.green} variant="outlined" icon="🧠">Think through vulnerabilities</Box>
        <Box color={colors.green} variant="outlined" icon="🎯">Organization-specific threats</Box>
      </Row>
    </Group>
  </Column>
</DiagramContainer>

Rather than simply adopting a standard compliance checklist, you can think about internal vulnerabilities specific to your organization and incentives employees might have to leak or misuse private information.

### 3.3. The Principle of Least Privilege

#### What is Least Privilege?

**In plain English:** The principle of least privilege is like giving someone a key to just the rooms they need to access, not the master key to every door in the building.

**In technical terms:** The principle of least privilege means that a person or system should be given only the privileges and data they need to complete the task at hand and nothing more - for only the timespan when needed.

**Why it matters:** Giving someone carte blanche administrative access is a huge mistake and a massive security vulnerability that violates the fundamental principle of controlled access.

#### The Anti-Pattern

Often, we see an antipattern in the cloud: a regular user is given administrative access to everything, when that person may need just a handful of IAM roles to do their work.

<DiagramContainer title="Access Control Anti-Pattern vs. Best Practice">
  <ComparisonTable
    beforeTitle="Anti-Pattern (WRONG)"
    afterTitle="Best Practice (RIGHT)"
    beforeColor={colors.red}
    afterColor={colors.green}
    items={[
      { label: "User Access", before: "Full admin rights by default", after: "Specific IAM roles only" },
      { label: "Duration", before: "Permanent access", after: "Time-limited when needed" },
      { label: "Service Accounts", before: "Broad permissions", after: "Minimal required roles" },
      { label: "Risk Level", before: "Catastrophic if compromised", after: "Limited blast radius" }
    ]}
  />
</DiagramContainer>

#### Implementation Guidelines

Instead, provide the user (or group they belong to) the IAM roles they need when they need them. When these roles are no longer needed, take them away. The same rule applies to service accounts.

**Treat humans and machines the same way:**
- Give them only the privileges they need
- Give them only the data they need
- Only for the timespan when needed

#### Privacy Applications

Of course, the principle of least privilege is also critical to privacy. Your users and customers expect that people will look at their sensitive data only when necessary. Make sure that this is the case.

<CardGrid
  columns={2}
  cards={[
    {
      title: "Access Controls",
      icon: "🔒",
      color: colors.blue,
      items: [
        "Column-level access",
        "Row-level security",
        "Cell-level controls",
        "PII masking"
      ]
    },
    {
      title: "Views and Abstraction",
      icon: "👁️",
      color: colors.purple,
      items: [
        "Create limited views",
        "Show only needed data",
        "Hide sensitive fields",
        "Context-based access"
      ]
    }
  ]}
/>

#### The Broken Glass Process

Some data must be retained but should be accessed only in an emergency. Put this data behind a **broken glass process**:

<DiagramContainer title="Broken Glass Emergency Access">
  <ProcessFlow
    direction="vertical"
    steps={[
      { title: "Emergency Occurs", description: "Critical issue requires sensitive data", icon: "🚨", color: colors.red },
      { title: "Request Approval", description: "Go through emergency approval process", icon: "📝", color: colors.orange },
      { title: "Temporary Access", description: "Access granted for specific purpose", icon: "🔓", color: colors.blue },
      { title: "Work Complete", description: "Fix the problem", icon: "🔧", color: colors.purple },
      { title: "Revoke Immediately", description: "Access removed once work done", icon: "🔒", color: colors.green }
    ]}
  />
</DiagramContainer>

Users can access it only after going through an emergency approval process to fix a problem, query critical historical information, etc. Access is revoked immediately once the work is done.

### 3.4. Shared Responsibility in the Cloud

**In plain English:** Shared responsibility is like renting an apartment - the landlord secures the building, but you're responsible for locking your own door and protecting your belongings inside.

**In technical terms:** In the cloud, the vendor ensures physical security of infrastructure, while you are responsible for securing applications, configurations, access controls, and data you build and maintain on that infrastructure.

**Why it matters:** Most cloud security breaches are caused by end users, not the cloud provider. Breaches occur because of unintended misconfigurations, mistakes, oversights, and sloppiness.

<DiagramContainer title="Cloud Shared Responsibility Model">
  <StackDiagram
    title="Security Responsibilities"
    layers={[
      { label: "Your Applications & Data", color: colors.red, description: "Your responsibility" },
      { label: "Access Management & Configuration", color: colors.orange, description: "Your responsibility" },
      { label: "Operating Systems & Runtime", color: colors.yellow, description: "Shared responsibility" },
      { label: "Virtualization & Compute", color: colors.blue, description: "Cloud provider" },
      { label: "Physical Infrastructure", color: colors.green, description: "Cloud provider" }
    ]}
  />
</DiagramContainer>

> **Insight**
>
> The cloud vendor is responsible for ensuring the physical security of its data center and hardware. At the same time, you are responsible for the security of the applications and systems you build and maintain in the cloud. Most cloud security breaches continue to be caused by end users, not the cloud.

### 3.5. Always Back Up Your Data

**In plain English:** Data backups are like having spare keys and important documents in a safe deposit box - when disaster strikes, you can recover.

**In technical terms:** Regular data backups provide disaster recovery capability and business continuity protection, especially critical in the era of ransomware attacks where data can be locked away or deleted by bad actors.

**Why it matters:** Data disappears for many reasons - hardware failure, accidental deletion, or ransomware attacks. Some insurance companies are reducing payouts in ransomware attacks, leaving you on the hook to both recover your data and potentially pay the attacker.

<DiagramContainer title="Backup Strategy">
  <Column gap="md">
    <Row gap="md">
      <Box color={colors.blue} icon="💾" size="lg">
        Production Data
      </Box>
      <Arrow direction="right" label="Regular backups" />
      <Column gap="sm">
        <Box color={colors.green} icon="📦" variant="outlined">Backup 1 (Most Recent)</Box>
        <Box color={colors.green} icon="📦" variant="outlined">Backup 2 (Daily)</Box>
        <Box color={colors.green} icon="📦" variant="outlined">Backup 3 (Weekly)</Box>
      </Column>
    </Row>
    <Row gap="lg">
      <Column gap="sm" align="center">
        <Box color={colors.purple} icon="🔄" variant="filled">Test Restoration</Box>
        <Box color={colors.slate} variant="subtle" size="sm">Regularly verify backups work</Box>
      </Column>
      <Column gap="sm" align="center">
        <Box color={colors.orange} icon="🔒" variant="filled">Encrypt Backups</Box>
        <Box color={colors.slate} variant="subtle" size="sm">Protect archived data</Box>
      </Column>
    </Row>
  </Column>
</DiagramContainer>

**Key principles:**

- Back up your data regularly
- Use backups for disaster recovery
- Ensure business continuity if data is compromised
- Test the restoration of your data backups on a regular basis

> **Warning**
>
> Data backup doesn't strictly fit under security and privacy practices; it goes under the larger heading of disaster prevention, but it's adjacent to security, especially in the era of ransomware attacks.

### 3.6. Example Security Policy

This section presents a sample security policy regarding credentials, devices, and sensitive information. Notice that we don't overcomplicate things; instead, we give people a short list of practical actions they can take immediately.

#### Protect Your Credentials

<CardGrid
  columns={2}
  cards={[
    {
      title: "Authentication Best Practices",
      icon: "🔐",
      color: colors.blue,
      items: [
        "Use SSO for everything",
        "Avoid passwords when possible",
        "Enable multifactor authentication",
        "Never share credentials"
      ]
    },
    {
      title: "Credential Management",
      icon: "🗝️",
      color: colors.purple,
      items: [
        "Beware of phishing attempts",
        "Delete old credentials",
        "Never commit to version control",
        "Use secrets manager"
      ]
    }
  ]}
/>

**Ground rules for credentials:**

1. **Use single-sign-on (SSO) for everything** - Avoid passwords whenever possible, and use SSO as the default
2. **Use multifactor authentication with SSO** - Add an extra layer of protection
3. **Don't share passwords or credentials** - This includes client passwords and credentials. If in doubt, escalate
4. **Beware of phishing and scam calls** - Don't ever give your passwords out (Again, prioritize SSO)
5. **Disable or delete old credentials** - Preferably delete them
6. **Don't put credentials in code** - Handle secrets as configuration and never commit them to version control. Use a secrets manager where possible
7. **Always exercise the principle of least privilege** - Never give more access than is required to do the job

#### Protect Your Devices

<DiagramContainer title="Device Security Layers">
  <StackDiagram
    title="Defense in Depth"
    layers={[
      { label: "Screen Sharing Awareness", color: colors.purple, description: "Share only what's needed" },
      { label: "Device Management", color: colors.blue, description: "Remote wipe capability" },
      { label: "Multifactor Authentication", color: colors.green, description: "Secure login" },
      { label: "Company Email Sign-in", color: colors.orange, description: "Centralized control" }
    ]}
  />
</DiagramContainer>

**Device security guidelines:**

- **Use device management** for all devices used by employees. If an employee leaves or device gets lost, it can be remotely wiped
- **Use multifactor authentication** for all devices
- **Sign in to your device** using your company email credentials
- **All credential policies apply** to your device(s)
- **Treat your device as an extension of yourself** - Don't let your assigned device(s) out of your sight
- **When screen sharing**, be aware of exactly what you're sharing to protect sensitive information. Share only single documents, browser tabs, or windows
- **Use "do not disturb" mode** when on video calls to prevent messages from appearing

#### Software Update Policy

<ProcessFlow
  direction="horizontal"
  steps={[
    { title: "Browser Updates", description: "Restart immediately when prompted", icon: "🌐", color: colors.blue },
    { title: "Minor OS Updates", description: "Run on company/personal devices", icon: "🔄", color: colors.purple },
    { title: "Major Updates", description: "Wait for company guidance", icon: "⏳", color: colors.orange }
  ]}
/>

**Update guidelines:**

- Restart your web browser when you see an update alert
- Run minor OS updates on company and personal devices
- The company will identify critical major OS updates and provide guidance
- Don't use the beta version of an OS
- Wait a week or two for new major OS version releases

> **Insight**
>
> These are some basic examples of how security can be simple and effective. Based on your company's security profile, you may need to add more requirements for people to follow. And again, always remember that people are your weakest link in security.

---

## 4. Technology: Securing Systems

**In plain English:** Technology security is like having good locks, alarms, and cameras - but only if you keep them updated, configured correctly, and actually monitor them.

**In technical terms:** Technology security encompasses system hardening, encryption, monitoring, access controls, and continuous patching to create defense-in-depth protection for data systems and infrastructure.

**Why it matters:** After you've addressed security with people and processes, it's time to look at how you leverage technology to secure your systems and data assets. The following are some significant areas you should prioritize.

### 4.1. Patch and Update Systems

**In plain English:** Patching systems is like getting your car maintained - regular maintenance prevents breakdowns and keeps everything running safely.

**In technical terms:** Software gets stale, and security vulnerabilities are constantly discovered. To avoid exposing security flaws in older versions, always patch and update operating systems and software as new updates become available.

**Why it matters:** Unpatched systems are the number one entry point for attackers exploiting known vulnerabilities that have already been fixed in newer versions.

<DiagramContainer title="Update Management Strategy">
  <Column gap="lg">
    <Group title="Managed Services" color={colors.green} direction="column">
      <Box color={colors.green} icon="☁️" variant="filled">
        SaaS & Cloud Services
      </Box>
      <Box color={colors.slate} variant="subtle" size="sm">
        Automatic upgrades and maintenance
      </Box>
    </Group>
    <Group title="Your Responsibilities" color={colors.orange} direction="column">
      <Row gap="md">
        <Column gap="sm" align="center">
          <Box color={colors.blue} icon="🤖">Automate Builds</Box>
          <Box color={colors.slate} variant="subtle" size="sm">CI/CD pipeline</Box>
        </Column>
        <Column gap="sm" align="center">
          <Box color={colors.purple} icon="🔔">Set Alerts</Box>
          <Box color={colors.slate} variant="subtle" size="sm">On releases & CVEs</Box>
        </Column>
      </Row>
    </Group>
  </Column>
</DiagramContainer>

**Implementation strategies:**

- Thankfully, many SaaS and cloud-managed services automatically perform upgrades and other maintenance without your intervention
- To update your own code and dependencies, either automate builds or set alerts on releases and vulnerabilities
- This prompts you to perform the updates manually when automation isn't possible

### 4.2. Encryption

**In plain English:** Encryption is like speaking in code - even if someone intercepts your message, they can't understand it without the key.

**In technical terms:** Encryption transforms data into unreadable ciphertext that requires cryptographic keys to decrypt, providing baseline protection for data at rest and in transit against interception and unauthorized access.

**Why it matters:** Encryption is a baseline requirement for any organization that respects security and privacy. It will protect you from basic attacks, such as network traffic interception, though it won't protect against credential compromise.

> **Insight**
>
> Encryption is not a magic bullet. It will do little to protect you in the event of a human security breach that grants access to credentials. However, encryption is a baseline requirement for any organization that respects security and privacy.

#### Encryption at Rest

<CardGrid
  columns={2}
  cards={[
    {
      title: "Device Encryption",
      icon: "💻",
      color: colors.blue,
      items: [
        "Full-disk encryption on laptops",
        "Protects if device stolen",
        "Built into modern OS",
        "Enable by default"
      ]
    },
    {
      title: "Cloud Storage Encryption",
      icon: "☁️",
      color: colors.purple,
      items: [
        "Server-side encryption",
        "All data at rest",
        "Databases and object storage",
        "Application-level encryption"
      ]
    }
  ]}
/>

Be sure your data is encrypted when it is at rest (on a storage device):

- **Company laptops** should have full-disk encryption enabled to protect data if a device is stolen
- **Implement server-side encryption** for all data stored in servers, filesystems, databases, and object storage in the cloud
- **All data backups** for archival purposes should also be encrypted
- **Incorporate application-level encryption** where applicable

#### Encryption Over the Wire

<DiagramContainer title="Encryption in Transit">
  <Row gap="md">
    <Box color={colors.blue} icon="🖥️">Client</Box>
    <Arrow direction="right" label="HTTPS/TLS Encrypted" />
    <Box color={colors.purple} icon="🌐">Network</Box>
    <Arrow direction="right" label="Encrypted Data" />
    <Box color={colors.green} icon="🗄️">Server</Box>
  </Row>
  <Box color={colors.orange} variant="subtle">
    Even if intercepted, data cannot be read without keys
  </Box>
</DiagramContainer>

Encryption over the wire is now the default for current protocols:

- **HTTPS is generally required** for modern cloud APIs
- **Data engineers should always be aware** of how keys are handled; bad key handling is a significant source of data leaks
- **HTTPS does nothing to protect data** if bucket permissions are left open to the public (a cause of several data scandals)

> **Warning**
>
> Engineers should also be aware of the security limitations of older protocols. For example, FTP is simply not secure on a public network. While this may not appear to be a problem when data is already public, FTP is vulnerable to man-in-the-middle attacks, whereby an attacker intercepts downloaded data and changes it before it arrives at the client. It is best to simply avoid FTP.

**Best practices:**

- Make sure everything is encrypted over the wire, even with legacy protocols
- When in doubt, use robust technology with encryption baked in
- Avoid protocols like plain FTP, HTTP, and unencrypted database connections

### 4.3. Logging, Monitoring, and Alerting

**In plain English:** Logging and monitoring are like security cameras and motion sensors - they let you know when something unusual is happening before it becomes a disaster.

**In technical terms:** Comprehensive logging, monitoring, and alerting systems provide observability into access patterns, resource utilization, and anomalous behavior, enabling rapid detection and response to security incidents.

**Why it matters:** Hackers and bad actors typically don't announce that they're infiltrating your systems. Most companies don't find out about security incidents until well after the fact. Part of DataOps is to observe, detect, and alert on incidents.

<DiagramContainer title="Security Monitoring Layers">
  <Column gap="md">
    <Row gap="md">
      <Box color={colors.blue} icon="🔍" variant="filled">Access Logs</Box>
      <Box color={colors.purple} icon="📊" variant="filled">Resource Metrics</Box>
      <Box color={colors.green} icon="💰" variant="filled">Billing Alerts</Box>
    </Row>
    <Arrow direction="down" />
    <Box color={colors.orange} icon="🚨" size="lg">
      Automated Anomaly Detection
    </Box>
    <Arrow direction="down" />
    <Box color={colors.red} icon="📱" size="lg">
      Incident Response
    </Box>
  </Column>
</DiagramContainer>

As a data engineer, you should set up automated monitoring, logging, and alerting to be aware of peculiar events when they happen in your systems. If possible, set up automatic anomaly detection.

#### Areas to Monitor

**1. Access Monitoring**

<CardGrid
  columns={2}
  cards={[
    {
      title: "Who, What, When, Where",
      icon: "👤",
      color: colors.blue,
      items: [
        "Who's accessing what?",
        "When are they accessing?",
        "From where (IP/location)?",
        "What new accesses granted?"
      ]
    },
    {
      title: "Anomaly Detection",
      icon: "🚨",
      color: colors.red,
      items: [
        "Strange access patterns?",
        "Account compromise indicators?",
        "Accessing unusual systems?",
        "Unrecognized users?"
      ]
    }
  ]}
/>

Who's accessing what, when, and from where? What new accesses were granted? Are there strange patterns with your current users that might indicate their account is compromised, such as trying to access systems they don't usually access or shouldn't have access to? Do you see new unrecognized users accessing your system?

Be sure to regularly comb through access logs, users, and their roles to ensure that everything looks OK.

**2. Resource Monitoring**

Monitor your disk, CPU, memory, and I/O for patterns that seem out of the ordinary. Did your resources suddenly change? If so, this might indicate a security breach.

**3. Billing Alerts**

Especially with SaaS and cloud-managed services, you need to oversee costs. Set up budget alerts to make sure your spending is within expectations. If an unexpected spike occurs in your billing, this might indicate someone or something is utilizing your resources for malicious purposes.

**4. Excess Permissions**

<DiagramContainer title="Permission Monitoring Process">
  <ProcessFlow
    direction="vertical"
    steps={[
      { title: "Monitor Usage", description: "Track permission utilization over time", icon: "📊", color: colors.blue },
      { title: "Detect Unused", description: "Identify permissions not used in 6 months", icon: "🔍", color: colors.purple },
      { title: "Alert Admin", description: "Notify administrator of unused access", icon: "🔔", color: colors.orange },
      { title: "Remove Access", description: "Revoke unused permissions automatically", icon: "🗑️", color: colors.green }
    ]}
  />
</DiagramContainer>

Increasingly, vendors are providing tools that monitor for permissions that are not utilized by a user or service account over some time. These tools can often be configured to automatically alert an administrator or remove permissions after a specified elapsed time.

For example, suppose that a particular analyst hasn't accessed Redshift for six months. These permissions can be removed, closing a potential security hole. If the analyst needs to access Redshift in the future, they can put in a ticket to restore permissions.

#### Integrated Monitoring

<DiagramContainer title="Cross-Sectional Security Dashboard">
  <StackDiagram
    title="Monitoring Dashboard"
    layers={[
      { label: "Resource Utilization", color: colors.blue, description: "CPU, memory, disk, network" },
      { label: "Access Patterns", color: colors.purple, description: "Who, what, when, where" },
      { label: "Billing Trends", color: colors.green, description: "Cost anomalies and spikes" },
      { label: "Permission Usage", color: colors.orange, description: "Excess and unused access" }
    ]}
  />
</DiagramContainer>

It's best to combine these areas in your monitoring to get a cross-sectional view of your resource, access, and billing profile. We suggest setting up a dashboard for everyone on the data team to view monitoring and receive alerts when something seems out of the ordinary.

> **Insight**
>
> Couple this with an effective incident response plan to manage security breaches when they occur, and run through the plan on a regular basis so you are prepared.

### 4.4. Network Access

**In plain English:** Network access control is like having a guest list at a party - you only let in the people who should be there, through the doors they're supposed to use.

**In technical terms:** Network access controls implement firewall rules, IP whitelisting, port restrictions, and encrypted connections to limit attack surface and prevent unauthorized access to data systems and infrastructure.

**Why it matters:** We often see data engineers doing pretty wild things regarding network access - publicly available S3 buckets with sensitive data, EC2 instances with SSH open to the world, databases with open access to all inbound requests over the public internet.

<DiagramContainer title="Network Security Anti-Patterns">
  <Column gap="md">
    <Group title="DANGER: Common Mistakes" color={colors.red} direction="column">
      <Box color={colors.red} icon="⚠️" variant="filled">
        Publicly available S3 buckets with sensitive data
      </Box>
      <Box color={colors.red} icon="⚠️" variant="filled">
        SSH access open to 0.0.0.0/0 (all IPs)
      </Box>
      <Box color={colors.red} icon="⚠️" variant="filled">
        Databases with open internet access
      </Box>
    </Group>
  </Column>
</DiagramContainer>

#### Your Responsibilities

In principle, network security should be left to security experts at your company. (In practice, you may need to assume significant responsibility for network security in a small company.) As a data engineer, you will encounter databases, object storage, and servers so often that you should at least be aware of simple measures you can take to make sure you're in line with good network access practices.

<CardGrid
  columns={2}
  cards={[
    {
      title: "Know Your Network",
      icon: "🔍",
      color: colors.blue,
      items: [
        "What IPs are open?",
        "What ports are exposed?",
        "Who can access them?",
        "Why are they open?"
      ]
    },
    {
      title: "Best Practices",
      icon: "✓",
      color: colors.green,
      items: [
        "Whitelist specific IPs",
        "Avoid broad openings",
        "Use encrypted connections",
        "Close unnecessary ports"
      ]
    }
  ]}
/>

**Key principles:**

- **Understand what IPs and ports are open**, to whom, and why
- **Allow the incoming IP addresses** of the systems and users that will access these ports (a.k.a. whitelisting IPs)
- **Avoid broadly opening connections** for any reason
- **When accessing the cloud or SaaS**, use an encrypted connection
- **Don't use unencrypted connections** from public networks (e.g., coffee shops)

#### Cloud vs. On-Premises Security

<ComparisonTable
  beforeTitle="On-Premises (Hardened Perimeter)"
  afterTitle="Cloud (Zero-Trust)"
  beforeColor={colors.orange}
  afterColor={colors.green}
  items={[
    { label: "Security Model", before: "Secure the perimeter", after: "Authenticate every action" },
    { label: "Internal Network", before: "Trusted once inside", after: "Never trust, always verify" },
    { label: "Expertise Required", before: "Internal security team", after: "Leverage cloud security" },
    { label: "Best For", before: "Air-gapped systems (rare)", after: "Most organizations" }
  ]}
/>

While this book has focused almost entirely on running workloads in the cloud, we add a brief note here about hosting on-premises servers. Recall that in Chapter 3, we discussed the difference between a hardened perimeter and zero-trust security.

The cloud is generally closer to zero-trust security—every action requires authentication. We believe that the cloud is a more secure option for most organizations because it imposes zero-trust practices and allows companies to leverage the army of security engineers employed by the public clouds.

> **Insight**
>
> However, sometimes hardened perimeter security still makes sense; we find some solace in the knowledge that nuclear missile silos are air gapped (not connected to any networks). Air-gapped servers are the ultimate example of a hardened security perimeter. Just keep in mind that even on premises, air-gapped servers are vulnerable to human security failings.

### 4.5. Security for Low-Level Data Engineering

**In plain English:** Low-level security is like checking every ingredient in your food - when you're building the foundation, every component matters because one bad piece can compromise everything.

**In technical terms:** Low-level data engineering security requires scrutiny of every software library, storage system, compute node, CPU architecture, and microcode as potential vulnerability vectors, since flaws at any level can bypass higher-level security controls.

**Why it matters:** For engineers who work in the guts of data storage and processing systems, it is critical to consider the security implications of every element. Any component represents a potential security vulnerability.

<DiagramContainer title="Low-Level Security Layers">
  <StackDiagram
    title="Potential Vulnerability Points"
    layers={[
      { label: "Application Code", color: colors.red, description: "Your code and logic" },
      { label: "Software Libraries", color: colors.orange, description: "Dependencies and frameworks" },
      { label: "Storage & Processing Systems", color: colors.yellow, description: "Databases, filesystems" },
      { label: "Compute Nodes & Runtime", color: colors.blue, description: "Containers, VMs" },
      { label: "CPU Architecture & Microcode", color: colors.purple, description: "Hardware vulnerabilities" }
    ]}
  />
</DiagramContainer>

**Key considerations:**

- Any software library, storage system, or compute node is a potential security vulnerability
- A flaw in an obscure logging library might allow attackers to bypass access controls or encryption
- Even CPU architectures and microcode represent potential vulnerabilities
- Sensitive data can be vulnerable when it's at rest in memory or a CPU cache
- No link in the chain can be taken for granted

> **Insight**
>
> Of course, this book is principally about high-level data engineering—stitching together tools to handle the entire lifecycle. Thus, we'll leave it to you to dig into the gory technical details.

### 4.6. Internal Security Research

**In plain English:** Internal security research is like having everyone on the team act as a security guard - each person watches their own area of expertise and reports anything suspicious.

**In technical terms:** Internal security research encourages every technology employee to actively identify security vulnerabilities in systems they know deeply, leveraging domain expertise to discover threats that generalist security teams might miss.

**Why it matters:** Every technology contributor develops a domain of technical expertise. Even if your company employs an army of security researchers, data engineers will become intimately familiar with specific data systems and cloud services in their purview - positioning them to identify security holes others might miss.

<DiagramContainer title="Active Security Culture">
  <ProcessFlow
    direction="vertical"
    steps={[
      { title: "Domain Expertise", description: "Engineers know their systems deeply", icon: "🧠", color: colors.blue },
      { title: "Identify Risks", description: "Spot vulnerabilities in their domain", icon: "🔍", color: colors.purple },
      { title: "Think Through Mitigations", description: "Develop security solutions", icon: "💡", color: colors.orange },
      { title: "Deploy Protections", description: "Take active role in securing systems", icon: "🛡️", color: colors.green }
    ]}
  />
</DiagramContainer>

**Why is this important?**

- Every technology contributor develops a domain of technical expertise
- Even with an army of security researchers, data engineers become intimately familiar with specific systems
- Experts in a particular technology are well positioned to identify security holes in that technology
- Domain knowledge reveals vulnerabilities that generalist security teams might miss

**How to implement:**

- Encourage every data engineer to be actively involved in security
- When they identify potential security risks in their systems, they should think through mitigations
- They should take an active role in deploying these security improvements
- Create a culture where security contributions are valued and rewarded

---

## 5. Summary

Security needs to be a habit of mind and action; treat data like your wallet or smartphone. Although you won't likely be in charge of security for your company, knowing basic security practices and keeping security top of mind will help reduce the risk of data security breaches at your organization.

### Key Takeaways

1. **People are the weakest link** — Security starts with human behavior. Exercise the power of negative thinking, always be paranoid about credential requests, and verify before trusting anyone with sensitive information

2. **Make security a habit, not theater** — Pursue genuine security practices that become habitual, not just compliance checkboxes. Simple, effective security beats lengthy policies nobody reads

3. **Implement least privilege rigorously** — Give users and systems only the access they need, only when they need it, and revoke it immediately when done. This protects both security and privacy

4. **Understand shared responsibility** — In the cloud, the provider secures infrastructure, but you're responsible for configurations, access controls, and applications. Most breaches are caused by user error, not the cloud

5. **Build defense in depth** — Layer multiple security controls: encryption (at rest and in transit), regular patching, comprehensive monitoring and alerting, network access controls, and regular backups

6. **Active security is continuous** — Security isn't a one-time setup. Actively research threats, monitor for anomalies, think through attack scenarios, and adapt to the changing threat landscape

7. **Everyone has a security role** — Whether at a small startup or large company, data engineers must identify vulnerabilities in systems they know best and collaborate with security teams to mitigate risks

### The Security Mindset

Remember the three pillars covered in this chapter:

<CardGrid
  columns={3}
  cards={[
    {
      title: "People",
      icon: "👥",
      color: colors.red,
      items: [
        "Always be paranoid",
        "Negative thinking saves data",
        "Trust but verify",
        "You're the first defense"
      ]
    },
    {
      title: "Processes",
      icon: "🔄",
      color: colors.orange,
      items: [
        "Build security habits",
        "Practice active security",
        "Enforce least privilege",
        "Back up everything"
      ]
    },
    {
      title: "Technology",
      icon: "🔧",
      color: colors.blue,
      items: [
        "Patch and encrypt",
        "Monitor and alert",
        "Control network access",
        "Research vulnerabilities"
      ]
    }
  ]}
/>

### Additional Resources

- **Building Secure and Reliable Systems** by Heather Adkins et al. (O'Reilly)
- **Open Web Application Security Project (OWASP)** publications
- **Practical Cloud Security** by Chris Dotson (O'Reilly)

Security and privacy are not afterthoughts—they are fundamental undercurrents of the data engineering lifecycle. One security breach or data leak can leave your business dead in the water; your career and reputation are ruined if it's your fault. Make security your priority from day one, in every decision, at every stage of the data engineering lifecycle.

---

**Previous:** [Chapter 9: Serving Data](./chapter9) | **Next:** [Chapter 11: The Future of Data Engineering](./chapter11)
