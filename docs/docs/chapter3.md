---
sidebar_position: 4
title: "Chapter 3: Designing Good Data Architecture"
description: "Master data architecture principles, patterns, and practices including enterprise architecture, cloud architectures, data warehouses, data lakes, Lambda/Kappa patterns, IoT, and data mesh"
---

import {
  Box, Arrow, Row, Column, Group,
  DiagramContainer, ProcessFlow, TreeDiagram,
  CardGrid, StackDiagram, ComparisonTable,
  colors
} from '@site/src/components/diagrams';

# Chapter 3: Designing Good Data Architecture

> **"Architecture represents the significant design decisions that shape a system, where significant is measured by cost of change."**
>
> — Grady Booch

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [What Is Data Architecture?](#2-what-is-data-architecture)
   - 2.1. [Enterprise Architecture Defined](#21-enterprise-architecture-defined)
   - 2.2. [Data Architecture Defined](#22-data-architecture-defined)
3. [Good Data Architecture](#3-good-data-architecture)
   - 3.1. [Principles of Good Data Architecture](#31-principles-of-good-data-architecture)
4. [Major Architecture Concepts](#4-major-architecture-concepts)
   - 4.1. [Domains and Services](#41-domains-and-services)
   - 4.2. [Distributed Systems and Scalability](#42-distributed-systems-and-scalability)
   - 4.3. [Tight Versus Loose Coupling](#43-tight-versus-loose-coupling)
   - 4.4. [User Access: Single Versus Multitenant](#44-user-access-single-versus-multitenant)
   - 4.5. [Event-Driven Architecture](#45-event-driven-architecture)
   - 4.6. [Brownfield Versus Greenfield Projects](#46-brownfield-versus-greenfield-projects)
5. [Examples and Types of Data Architecture](#5-examples-and-types-of-data-architecture)
   - 5.1. [Data Warehouse](#51-data-warehouse)
   - 5.2. [Data Lake](#52-data-lake)
   - 5.3. [Modern Data Stack](#53-modern-data-stack)
   - 5.4. [Lambda Architecture](#54-lambda-architecture)
   - 5.5. [Kappa Architecture](#55-kappa-architecture)
   - 5.6. [The Dataflow Model](#56-the-dataflow-model)
   - 5.7. [Architecture for IoT](#57-architecture-for-iot)
   - 5.8. [Data Mesh](#58-data-mesh)
6. [Summary](#6-summary)

---

## 1. Introduction

**In plain English:** Data architecture is like designing the blueprint for a house - you need to think about how all the rooms connect, where the plumbing goes, and how to make changes later without tearing everything down.

**In technical terms:** Data architecture is the design of systems to support the evolving data needs of an enterprise, achieved by flexible and reversible decisions reached through a careful evaluation of trade-offs.

**Why it matters:** Good data architecture provides seamless capabilities across every step of the data lifecycle. Bad architecture is authoritarian, rigid, and tries to cram one-size-fits-all decisions into a big ball of mud, hampering development and change management.

> **Insight**
>
> **Technical solutions exist not for their own sake but in support of business goals.** Architects identify problems in the current state, define desired future states, and realize initiatives through execution of small, concrete steps.

---

## 2. What Is Data Architecture?

Successful data engineering is built upon rock-solid data architecture. When you research data architecture, you'll find many inconsistent and often outdated definitions. Let's establish a pragmatic, working definition that will work for companies of vastly different scales, business processes, and needs.

### 2.1. Enterprise Architecture Defined

Enterprise architecture has many subsets, including business, technical, application, and data. Before defining data architecture, it's essential to understand the context in which it sits.

<DiagramContainer title="Enterprise Architecture Hierarchy">
  <Column gap="md">
    <Box color={colors.blue} variant="filled" size="lg" icon="🏢">
      Enterprise Architecture
    </Box>
    <Row gap="md">
      <Box color={colors.purple} variant="outlined">Business Architecture</Box>
      <Box color={colors.green} variant="outlined">Technical Architecture</Box>
      <Box color={colors.orange} variant="outlined">Application Architecture</Box>
      <Box color={colors.blue} variant="outlined">Data Architecture</Box>
    </Row>
  </Column>
</DiagramContainer>

#### Key Definitions from Thought Leaders

**TOGAF's definition:**
> The term "enterprise" can denote an entire enterprise—encompassing all of its information and technology services, processes, and infrastructure—or a specific domain within the enterprise. In both cases, the architecture crosses multiple systems and functional groups.

**Gartner's definition:**
> Enterprise architecture (EA) is a discipline for proactively and holistically leading enterprise responses to disruptive forces by identifying and analyzing the execution of change toward desired business vision and outcomes.

**Our definition:**
> Enterprise architecture is the design of systems to support change in the enterprise, achieved by flexible and reversible decisions reached through careful evaluation of trade-offs.

#### Core Themes of Enterprise Architecture

<CardGrid
  columns={3}
  cards={[
    {
      title: "Flexible & Reversible Decisions",
      icon: "🔄",
      color: colors.blue,
      items: [
        "Two-way doors vs one-way doors",
        "Reduce risk of decisions",
        "Enable course correction",
        "Overcome organizational ossification"
      ]
    },
    {
      title: "Change Management",
      icon: "🎯",
      color: colors.purple,
      items: [
        "Break large initiatives into small steps",
        "Each step is reversible",
        "Iterate and improve rapidly",
        "Collect data continuously"
      ]
    },
    {
      title: "Trade-off Evaluation",
      icon: "⚖️",
      color: colors.green,
      items: [
        "Trade-offs are inevitable",
        "Account for physical limits",
        "Manage complexity constraints",
        "Minimize high-interest technical debt"
      ]
    }
  ]}
/>

**In plain English:** Jeff Bezos's concept of one-way and two-way doors helps explain reversible decisions. A one-way door is nearly impossible to reverse (like selling AWS). A two-way door lets you walk through, and if you don't like what you see, you can step back (like choosing a database for new microservices).

**In technical terms:** Two-way doors are easily reversible decisions with low stakes, allowing organizations to make more decisions, iterate faster, and collect data rapidly.

**Why it matters:** Since the world is constantly changing and predicting the future is impossible, reversible decisions allow you to adjust course as you gather new information.

### 2.2. Data Architecture Defined

Data architecture is a subset of enterprise architecture, inheriting its properties: processes, strategy, change management, and evaluating trade-offs.

**TOGAF's definition:**
> A description of the structure and interaction of the enterprise's major types and sources of data, logical data assets, physical data assets, and data management resources.

**DAMA's definition:**
> Identifying the data needs of the enterprise (regardless of structure) and designing and maintaining the master blueprints to meet those needs. Using master blueprints to guide data integration, control data assets, and align data investments with business strategy.

**Our definition:**
> Data architecture is the design of systems to support the evolving data needs of an enterprise, achieved by flexible and reversible decisions reached through a careful evaluation of trade-offs.

#### Operational vs Technical Architecture

<DiagramContainer title="Two Dimensions of Data Architecture">
  <Row gap="lg">
    <Column gap="sm" align="center">
      <Box color={colors.blue} icon="📋" size="lg">Operational Architecture</Box>
      <Box color={colors.slate} variant="subtle">
        What needs to happen
      </Box>
      <Column gap="xs">
        <Box color={colors.blue} variant="outlined" size="sm">Business processes</Box>
        <Box color={colors.blue} variant="outlined" size="sm">Data quality management</Box>
        <Box color={colors.blue} variant="outlined" size="sm">Latency requirements</Box>
        <Box color={colors.blue} variant="outlined" size="sm">People & processes</Box>
      </Column>
    </Column>
    <Column gap="sm" align="center">
      <Box color={colors.purple} icon="⚙️" size="lg">Technical Architecture</Box>
      <Box color={colors.slate} variant="subtle">
        How it will happen
      </Box>
      <Column gap="xs">
        <Box color={colors.purple} variant="outlined" size="sm">Ingestion methods</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Storage systems</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Transformation engines</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Serving layers</Box>
      </Column>
    </Column>
  </Row>
</DiagramContainer>

**In plain English:** Operational architecture describes what business needs to happen (like "we need customer data available within 5 minutes"). Technical architecture details how you'll make it happen (like "we'll use Kafka for streaming ingestion and Snowflake for storage").

**In technical terms:** Data engineering architecture is a subset of general data architecture, encompassing the systems and frameworks that make up the key sections of the data engineering lifecycle.

**Why it matters:** Understanding both operational and technical architecture ensures your solutions align with business requirements while being technically sound and maintainable.

---

## 3. Good Data Architecture

> **"Never shoot for the best architecture, but rather the least worst architecture."**
>
> — Mark Richards and Neal Ford

**In plain English:** You know good architecture when you see it - it's flexible, serves business needs well, uses common building blocks wisely, and doesn't feel like you're fighting the system to get work done.

**In technical terms:** Good data architecture serves business requirements with a common, widely reusable set of building blocks while maintaining flexibility and making appropriate trade-offs. It's never finished - change and evolution are central to its meaning and purpose.

**Why it matters:** Bad architecture is tightly coupled, rigid, overly centralized, or uses the wrong tools, hampering development and change management. Good architecture enables agility and reduces the cost of change.

### 3.1. Principles of Good Data Architecture

We draw inspiration from the AWS Well-Architected Framework (six pillars: operational excellence, security, reliability, performance efficiency, cost optimization, sustainability) and Google Cloud's Five Principles for Cloud-Native Architecture (design for automation, be smart with state, favor managed services, practice defense in depth, always be architecting).

Here are our nine principles of data engineering architecture:

<CardGrid
  columns={3}
  cards={[
    {
      title: "1. Choose Common Components Wisely",
      icon: "🧩",
      color: colors.blue,
      items: [
        "Facilitate team collaboration",
        "Break down silos",
        "Enable shared knowledge",
        "Support robust permissions"
      ]
    },
    {
      title: "2. Plan for Failure",
      icon: "⚠️",
      color: colors.red,
      items: [
        "Everything fails eventually",
        "Consider availability & reliability",
        "Define RTO and RPO",
        "Design for failure scenarios"
      ]
    },
    {
      title: "3. Architect for Scalability",
      icon: "📈",
      color: colors.green,
      items: [
        "Scale up for high loads",
        "Scale down to cut costs",
        "Enable elastic scaling",
        "Consider scale to zero"
      ]
    },
    {
      title: "4. Architecture Is Leadership",
      icon: "👥",
      color: colors.purple,
      items: [
        "Mentor development teams",
        "Make careful technology choices",
        "Disseminate expertise",
        "Train in best practices"
      ]
    },
    {
      title: "5. Always Be Architecting",
      icon: "🔄",
      color: colors.orange,
      items: [
        "Maintain target architecture",
        "Adjust to business changes",
        "Collaborative & agile approach",
        "Moving target mentality"
      ]
    },
    {
      title: "6. Build Loosely Coupled Systems",
      icon: "🔗",
      color: colors.blue,
      items: [
        "Small, independent components",
        "Interface through APIs",
        "Enable independent evolution",
        "No waterfall releases"
      ]
    },
    {
      title: "7. Make Reversible Decisions",
      icon: "🚪",
      color: colors.green,
      items: [
        "Aim for two-way doors",
        "Simplify architecture",
        "Keep it agile",
        "Pick best-of-breed for today"
      ]
    },
    {
      title: "8. Prioritize Security",
      icon: "🔒",
      color: colors.red,
      items: [
        "Zero-trust security model",
        "Shared responsibility model",
        "All data engineers = security engineers",
        "Secure by default"
      ]
    },
    {
      title: "9. Embrace FinOps",
      icon: "💰",
      color: colors.purple,
      items: [
        "Collaborative cost management",
        "Monitor spending continuously",
        "Design for cost efficiency",
        "Think in cost structures"
      ]
    }
  ]}
/>

#### Principle 1: Choose Common Components Wisely

**In plain English:** Common components are like the standard tools in a workshop that everyone uses - when chosen well, they help teams work together smoothly. Choose poorly, and you force everyone into solutions that don't fit their needs.

**In technical terms:** Common components (object storage, version control, orchestration, processing engines) should be accessible to everyone with appropriate use cases, with robust permissions and security to enable sharing while preventing unauthorized access.

**Why it matters:** Well-chosen common components become a fabric facilitating collaboration and breaking down silos. Poor choices hamper productivity by forcing one-size-fits-all solutions.

#### Principle 2: Plan for Failure

> **"Everything fails, all the time."**
>
> — Werner Vogels, CTO of Amazon Web Services

**Key Terms for Evaluating Failure:**

<CardGrid
  columns={2}
  cards={[
    {
      title: "Availability",
      icon: "⏱️",
      color: colors.blue,
      items: [
        "Percentage of time service is operable",
        "Example: 99.9% uptime = 8.76 hours downtime/year",
        "Business impact varies by use case"
      ]
    },
    {
      title: "Reliability",
      icon: "✅",
      color: colors.green,
      items: [
        "Probability of meeting defined standards",
        "Performing intended function in specified interval",
        "Low reliability → low availability"
      ]
    },
    {
      title: "Recovery Time Objective (RTO)",
      icon: "⏰",
      color: colors.orange,
      items: [
        "Maximum acceptable outage time",
        "Set by determining business impact",
        "Example: 5 minutes for e-commerce, 1 day for internal reporting"
      ]
    },
    {
      title: "Recovery Point Objective (RPO)",
      icon: "💾",
      color: colors.purple,
      items: [
        "Acceptable state after recovery",
        "Maximum acceptable data loss",
        "Guides backup frequency and strategy"
      ]
    }
  ]}
/>

#### Principle 3: Architect for Scalability

**In plain English:** Scalability means your system can grow when you need it to (like adding servers during Black Friday sales) and shrink when you don't (to save money after the rush ends).

**In technical terms:** Scalable systems have two main capabilities: scale up to handle significant data quantities and load spikes, then scale down to cut costs. Elastic systems scale dynamically in response to load, ideally automatically.

**Why it matters:** Serverless systems can scale to zero (shutting down completely when not in use), significantly reducing costs. However, inappropriate scaling strategies can result in overcomplicated systems and high costs.

> **Insight**
>
> Measure your current load, approximate load spikes, and estimate load over several years to determine appropriate architecture. A straightforward relational database with one failover node may be better than a complex cluster arrangement for many applications.

#### Principle 4: Architecture Is Leadership

**In plain English:** The best data architects are like experienced coaches - they have the skills to play the game themselves, but they spend their time teaching others to play better rather than doing everything themselves.

**In technical terms:** Data architects possess the technical skills of data engineers but no longer practice day-to-day engineering. They mentor engineers, make careful technology choices in consultation with their organization, and disseminate expertise through training and leadership.

**Why it matters:** Martin Fowler describes the ideal architect (Architectus Oryzus): "The most important activity is to mentor the development team, to raise their level so they can take on more complex issues. This gives an architect much greater leverage than being the sole decision-maker and architectural bottleneck."

#### Principle 5: Always Be Architecting

**In plain English:** Data architects aren't just maintaining what exists - they're constantly designing new things in response to changes in business and technology, like a city planner who's always updating the blueprint as the city grows.

**In technical terms:** Modern architecture should not be command-and-control or waterfall but collaborative and agile. The data architect maintains a target architecture and sequencing plans that change over time, adjusting in response to business and technology changes.

**Why it matters:** The target architecture becomes a moving target. The sequencing plan determines immediate priorities for delivery. This continuous evolution ensures your architecture stays relevant.

#### Principle 6: Build Loosely Coupled Systems

> **"When the architecture of the system is designed to enable teams to test, deploy, and change systems without dependencies on other teams, teams require little communication to get work done. In other words, both the architecture and the teams are loosely coupled."**
>
> — Google DevOps tech architecture guide

**The Bezos API Mandate (2002):**

<DiagramContainer title="Bezos API Mandate Principles">
  <Column gap="sm">
    <Box color={colors.blue} variant="filled">
      All teams expose data/functionality through service interfaces
    </Box>
    <Box color={colors.purple} variant="filled">
      Teams communicate ONLY through these interfaces
    </Box>
    <Box color={colors.green} variant="filled">
      No direct linking, no direct data store reads, no shared memory
    </Box>
    <Box color={colors.orange} variant="filled">
      All service interfaces must be designed to be externalizable
    </Box>
  </Column>
</DiagramContainer>

**Technical System Properties:**

<ProcessFlow
  direction="vertical"
  steps={[
    {
      title: "Many Small Components",
      description: "Systems broken into small, focused services",
      icon: "🧩",
      color: colors.blue
    },
    {
      title: "Interface Through Abstractions",
      description: "Messaging bus or API hides internal details",
      icon: "🔌",
      color: colors.purple
    },
    {
      title: "Independent Changes",
      description: "Internal updates don't require changes elsewhere",
      icon: "🔄",
      color: colors.green
    },
    {
      title: "No Global Releases",
      description: "Each component updated separately",
      icon: "🚀",
      color: colors.orange
    }
  ]}
/>

**Why it matters:** Loose coupling of both technology and human systems allows data engineering teams to efficiently collaborate with one another and with other parts of the company. This principle directly facilitates reversible decisions.

#### Principle 7: Make Reversible Decisions

**In plain English:** Don't lock yourself into choices you can't undo. If you walk through a door and don't like what's on the other side, make sure you can walk back through.

**In technical terms:** As Martin Fowler wrote: "One of an architect's most important tasks is to remove architecture by finding ways to eliminate irreversibility in software designs." Given the pace of change and decoupling of technologies, always strive to pick best-of-breed solutions that work for today while being prepared to upgrade.

**Why it matters:** The data landscape is changing rapidly. Today's hot technology is tomorrow's afterthought. Popular opinion shifts quickly. Reversible decisions simplify your architecture and keep it agile.

#### Principle 8: Prioritize Security

Two main security models to understand:

<ComparisonTable
  beforeTitle="Hardened-Perimeter Security"
  afterTitle="Zero-Trust Security"
  beforeColor={colors.red}
  afterColor={colors.green}
  items={[
    {
      label: "Model",
      before: "Trusted things inside, untrusted outside",
      after: "Never trust, always verify"
    },
    {
      label: "Vulnerabilities",
      before: "Insider attacks, spear phishing",
      after: "Minimal - every access verified"
    },
    {
      label: "Cloud Fit",
      before: "Erodes in cloud-native environments",
      after: "Designed for cloud-native"
    },
    {
      label: "Access Control",
      before: "Perimeter-based",
      after: "Identity-based, context-aware"
    }
  ]}
/>

**The Shared Responsibility Model:**

<DiagramContainer title="Cloud Security Responsibilities">
  <Row gap="lg">
    <Column gap="sm" align="center">
      <Box color={colors.blue} icon="☁️" size="lg">Security OF the Cloud</Box>
      <Box color={colors.slate} variant="subtle">Cloud Provider Responsibility</Box>
      <Column gap="xs">
        <Box color={colors.blue} variant="outlined" size="sm">Infrastructure protection</Box>
        <Box color={colors.blue} variant="outlined" size="sm">Service security</Box>
        <Box color={colors.blue} variant="outlined" size="sm">Published specifications</Box>
      </Column>
    </Column>
    <Column gap="sm" align="center">
      <Box color={colors.purple} icon="🔒" size="lg">Security IN the Cloud</Box>
      <Box color={colors.slate} variant="subtle">Your Responsibility</Box>
      <Column gap="xs">
        <Box color={colors.purple} variant="outlined" size="sm">Application security</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Data protection</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Access management</Box>
      </Column>
    </Column>
  </Row>
</DiagramContainer>

**Why it matters:** All data engineers should consider themselves security engineers. Numerous data breaches have resulted from simple errors like configuring S3 buckets with public access. Those who handle data must assume ultimate responsibility for securing it.

#### Principle 9: Embrace FinOps

**In plain English:** FinOps is like having a smart meter for your cloud spending - it helps you see where money goes in real-time and make decisions to optimize costs while maintaining performance.

**In technical terms:** FinOps is an evolving cloud financial management discipline that enables organizations to get maximum business value by helping engineering, finance, technology, and business teams collaborate on data-driven spending decisions.

**Why it matters:** Cloud systems use pay-as-you-go models, making spending far more dynamic. The new challenge is managing budgets, priorities, and efficiency in real-time rather than making large capital expenditures every few years.

<CardGrid
  columns={2}
  cards={[
    {
      title: "Old Model: Capital Expenditure",
      icon: "💰",
      color: colors.red,
      items: [
        "Large upfront costs every few years",
        "Overbuying = wasted money",
        "Underbuying = hampered projects",
        "Fixed capacity planning"
      ]
    },
    {
      title: "New Model: Pay-As-You-Go",
      icon: "💳",
      color: colors.green,
      items: [
        "Dynamic spending",
        "Scale up for performance",
        "Scale down to save money",
        "Continuous optimization required"
      ]
    }
  ]}
/>

**FinOps Practices:**

- Monitor spending on an ongoing basis
- Think in terms of cost structures (spot instances, reserved capacity, pay-per-query)
- Design systems to fail gracefully in response to spending spikes
- Consider cost attacks (like excessive S3 downloads threatening startups with bankruptcy)
- Set requester-pays policies for publicly shared data

> **Insight**
>
> The FinOps Foundation was started only in 2019. Start thinking about FinOps early, before you encounter high cloud bills. Start your journey with the FinOps Foundation and O'Reilly's Cloud FinOps book.

---

## 4. Major Architecture Concepts

If you follow current trends in data, new types of tools and architectures seem to arrive every week. Amidst this flurry, we must not lose sight of the main goal: **to take data and transform it into something useful for downstream consumption.**

### 4.1. Domains and Services

> **"Domain: A sphere of knowledge, influence, or activity. The subject area to which the user applies a program is the domain of the software."**
>
> — Eric Evans

**In plain English:** A domain is like a department in a company (sales, accounting, inventory), and services are the specific tasks that support that department (order processing, invoicing, product catalog).

**In technical terms:** A domain is the real-world subject area for which you're architecting. A service is a set of functionality whose goal is to accomplish a task.

**Why it matters:** Understanding domains and services helps you organize your architecture to reflect how your business actually works, rather than copying cookie-cutter patterns from other companies.

<DiagramContainer title="Domains and Services Example">
  <Row gap="lg">
    <Column gap="md">
      <Box color={colors.blue} variant="filled" size="lg" icon="💰">Sales Domain</Box>
      <Column gap="xs">
        <Box color={colors.blue} variant="outlined">Orders Service</Box>
        <Box color={colors.green} variant="outlined">Invoices Service (Shared)</Box>
        <Box color={colors.blue} variant="outlined">Products Service</Box>
      </Column>
    </Column>
    <Column gap="md">
      <Box color={colors.purple} variant="filled" size="lg" icon="📊">Accounting Domain</Box>
      <Column gap="xs">
        <Box color={colors.green} variant="outlined">Invoices Service (Shared)</Box>
        <Box color={colors.purple} variant="outlined">Payroll Service</Box>
        <Box color={colors.purple} variant="outlined">AR Service</Box>
      </Column>
    </Column>
  </Row>
  <Box color={colors.orange} variant="subtle">
    The invoices service is shared between Sales and Accounting domains
  </Box>
</DiagramContainer>

**Key Principle:** When determining what should go in a domain, talk with users and stakeholders, listen to what they're saying, and build the services that will help them do their job. Avoid architecting in a vacuum.

### 4.2. Distributed Systems and Scalability

Related to our principles of planning for failure and architecting for scalability, we need to understand four closely related characteristics:

<CardGrid
  columns={2}
  cards={[
    {
      title: "Scalability",
      icon: "📈",
      color: colors.blue,
      items: [
        "Increase capacity to improve performance",
        "Handle increased demand",
        "Process huge datasets",
        "Support high query rates"
      ]
    },
    {
      title: "Elasticity",
      icon: "🔄",
      color: colors.green,
      items: [
        "Automatically scale up and down",
        "Based on current workload",
        "Scale to zero when idle",
        "Save money in cloud environments"
      ]
    },
    {
      title: "Availability",
      icon: "⏱️",
      color: colors.purple,
      items: [
        "Percentage of time service is operable",
        "Impacted by reliability",
        "Critical for business continuity",
        "Requires failover planning"
      ]
    },
    {
      title: "Reliability",
      icon: "✅",
      color: colors.orange,
      items: [
        "Probability of meeting standards",
        "Performing intended function",
        "During specified interval",
        "Improved by elasticity"
      ]
    }
  ]}
/>

#### Vertical vs Horizontal Scaling

<ComparisonTable
  beforeTitle="Vertical Scaling (Single Machine)"
  afterTitle="Horizontal Scaling (Distributed System)"
  beforeColor={colors.orange}
  afterColor={colors.green}
  items={[
    {
      label: "Approach",
      before: "Increase resources on one machine",
      after: "Add more machines"
    },
    {
      label: "Limits",
      before: "Hard limits on single machine resources",
      after: "Virtually unlimited with more nodes"
    },
    {
      label: "Availability",
      before: "Single point of failure",
      after: "High availability with redundancy"
    },
    {
      label: "Reliability",
      before: "Low - if machine dies, system fails",
      after: "High - other machines pick up work"
    }
  ]}
/>

<DiagramContainer title="Horizontal Distributed System Architecture">
  <Column gap="md">
    <Box color={colors.blue} icon="👑" size="lg">Leader Node</Box>
    <Arrow direction="down" label="Distributes tasks" />
    <Row gap="md">
      <Box color={colors.green} icon="⚙️">Worker Node 1</Box>
      <Box color={colors.green} icon="⚙️">Worker Node 2</Box>
      <Box color={colors.green} icon="⚙️">Worker Node 3</Box>
    </Row>
    <Arrow direction="up" label="Returns results" />
    <Box color={colors.orange} variant="subtle">
      Leader node manages workloads; worker nodes process tasks; redundancy ensures availability
    </Box>
  </Column>
</DiagramContainer>

**Why it matters:** Almost every cloud data warehouse and object storage system uses distributed systems under the hood. While management details are typically abstracted away, understanding distributed systems helps you improve pipeline performance.

### 4.3. Tight Versus Loose Coupling

When designing data architecture, you choose how much interdependence to include within your domains, services, and resources.

<ComparisonTable
  beforeTitle="Tightly Coupled"
  afterTitle="Loosely Coupled"
  beforeColor={colors.red}
  afterColor={colors.green}
  items={[
    {
      label: "Interdependence",
      before: "Every part depends on every other part",
      after: "Decentralized, minimal dependencies"
    },
    {
      label: "Centralization",
      before: "Extremely centralized",
      after: "Decentralized with common standards"
    },
    {
      label: "Flexibility",
      before: "Difficult to change components",
      after: "Easy to swap components"
    },
    {
      label: "Risk",
      before: "Single failure affects everything",
      after: "Isolated failures, better resilience"
    }
  ]}
/>

#### Architecture Tiers

**Single-Tier Architecture:**

<DiagramContainer title="Single-Tier Architecture">
  <Column gap="sm" align="center">
    <Box color={colors.red} variant="filled" size="lg" icon="🖥️">
      Single Server
    </Box>
    <Row gap="xs">
      <Box color={colors.red} variant="outlined" size="sm">Database</Box>
      <Box color={colors.red} variant="outlined" size="sm">Application</Box>
      <Box color={colors.red} variant="outlined" size="sm">Business Logic</Box>
    </Row>
    <Box color={colors.orange} variant="subtle">
      All components on one server - good for prototyping, bad for production
    </Box>
  </Column>
</DiagramContainer>

**In plain English:** A single-tier architecture is like running your entire business from one laptop - if the laptop dies, everything stops. It's fine for testing but risky for production.

**Multitier Architecture:**

<DiagramContainer title="Three-Tier Architecture">
  <Column gap="md">
    <Box color={colors.blue} variant="filled">Presentation Tier</Box>
    <Arrow direction="down" />
    <Box color={colors.purple} variant="filled">Application Logic Tier</Box>
    <Arrow direction="down" />
    <Box color={colors.green} variant="filled">Data Tier</Box>
  </Column>
  <Box color={colors.orange} variant="subtle">
    Each tier isolated - separation of concerns, better resource management
  </Box>
</DiagramContainer>

**In technical terms:** A multitier architecture is composed of separate layers (data, application, business logic, presentation). These layers are hierarchical - upper layers depend on lower layers, but lower layers aren't dependent on upper layers.

**Why it matters:** Multitier architecture separates concerns and resources. Data and logic layers don't compete for resources (disk, CPU, memory). Eventually, organizations outgrow single-tier architecture when it works well until it doesn't.

#### Shared-Nothing vs Shared Disk

<CardGrid
  columns={2}
  cards={[
    {
      title: "Shared-Nothing Architecture",
      icon: "🚫",
      color: colors.blue,
      items: [
        "Single node handles each request",
        "No resource sharing between nodes",
        "Data/resources isolated to node",
        "No resource contention"
      ]
    },
    {
      title: "Shared Disk Architecture",
      icon: "💾",
      color: colors.purple,
      items: [
        "Multiple nodes can handle requests",
        "Shared disk/memory accessible by all",
        "Risk of resource contention",
        "Useful for node failure scenarios"
      ]
    }
  ]}
/>

#### Monoliths vs Microservices

**Monolithic Architecture:**

**In plain English:** A monolith is like a giant department store where everything is under one roof and interconnected. If you want to remodel the shoe department, you might have to shut down half the store.

**In technical terms:** A monolith includes as much as possible under one roof. In its most extreme version, it consists of a single codebase running on a single machine providing both application logic and user interface.

**Characteristics:**
- Tight coupling (technical and domain)
- Lack of modularity
- Difficult to swap or upgrade components
- Reusing components is difficult or impossible
- Can devolve into a "big ball of mud"

**Microservices Architecture:**

**In plain English:** Microservices are like a food court with independent restaurants. Each restaurant operates independently - if the pizza place closes for repairs, the burger joint keeps serving customers.

**In technical terms:** Microservices architecture comprises separate, decentralized, and loosely coupled services. Each service has a specific function and is decoupled from other services operating within its domain.

<DiagramContainer title="Monolith to Microservices Migration">
  <Row gap="lg">
    <Column gap="sm" align="center">
      <Box color={colors.red} variant="filled" size="lg" icon="📦">Monolith</Box>
      <Box color={colors.red} variant="outlined">All functionality in single codebase</Box>
      <Box color={colors.red} variant="outlined">Tightly coupled services</Box>
      <Box color={colors.red} variant="outlined">Centralized database</Box>
    </Column>
    <Arrow direction="right" label="Break apart services" />
    <Column gap="sm">
      <Row gap="xs">
        <Box color={colors.green} variant="outlined" size="sm" icon="🔷">Service A</Box>
        <Box color={colors.blue} variant="outlined" size="sm" icon="🔷">Service B</Box>
      </Row>
      <Row gap="xs">
        <Box color={colors.purple} variant="outlined" size="sm" icon="🔷">Service C</Box>
        <Box color={colors.orange} variant="outlined" size="sm" icon="🔷">Service D</Box>
      </Row>
      <Box color={colors.green} variant="subtle" size="sm">Loosely coupled, independently deployable</Box>
    </Column>
  </Row>
</DiagramContainer>

> **Insight**
>
> **Converting Monolith to Microservices:** Use the strangler pattern - new systems slowly and incrementally replace a legacy architecture's components. Eventually, the legacy architecture is completely replaced. This targeted, surgical approach allows for flexible and reversible decisions.

**Why it matters:** Monoliths aren't necessarily bad - sometimes you need to move fast, and it's simpler to start with a monolith. Just be prepared to break it into smaller pieces eventually. Don't get too comfortable.

### 4.4. User Access: Single Versus Multitenant

**In plain English:** Single tenant is like having your own house. Multitenant is like living in an apartment building where everyone shares the same infrastructure but has private, isolated spaces.

**In technical terms:** Engineers frequently need to make decisions about multitenancy at various scales. For example, do multiple departments share the same data warehouse? Do you share data for multiple customers within the same table?

**Key Considerations:**

<CardGrid
  columns={2}
  cards={[
    {
      title: "Performance",
      icon: "⚡",
      color: colors.blue,
      items: [
        "Noisy neighbor problem?",
        "Will high usage from one tenant degrade others?",
        "Consistent performance for all tenants?",
        "Resource isolation strategies"
      ]
    },
    {
      title: "Security",
      icon: "🔒",
      color: colors.purple,
      items: [
        "Data must be properly isolated",
        "Tenants shouldn't be aware of each other",
        "Prevent data leakage",
        "Use views or row-level security"
      ]
    }
  ]}
/>

**Why it matters:** All cloud services are multitenant at various grains. You must ensure proper isolation through correct configuration. Strategies vary by system - multitenant tables with views are often acceptable, but you must prevent data leakage.

### 4.5. Event-Driven Architecture

**In plain English:** Event-driven architecture is like a restaurant where the kitchen gets an order ticket (event) whenever a customer places an order. The kitchen doesn't need to constantly check if there are new orders - it just responds when a ticket appears.

**In technical terms:** An event-driven workflow encompasses the ability to create, update, and asynchronously move events across various parts of the data engineering lifecycle. This boils down to three main areas: event production, routing, and consumption.

**Why it matters:** Event-driven architecture distributes the state of an event across multiple services. This is helpful if a service goes offline, a node fails, or you'd like multiple consumers to access the same events.

<DiagramContainer title="Event-Driven Architecture">
  <ProcessFlow
    direction="horizontal"
    steps={[
      {
        title: "Event Production",
        description: "Something happened (new order, customer update)",
        icon: "📤",
        color: colors.blue
      },
      {
        title: "Event Routing",
        description: "Message bus routes event to interested consumers",
        icon: "🔀",
        color: colors.purple
      },
      {
        title: "Event Consumption",
        description: "Multiple services consume and act on event",
        icon: "📥",
        color: colors.green
      }
    ]}
  />
</DiagramContainer>

**Key Advantage:** Loosely coupled services can communicate without tight dependencies among the producer, event router, and consumer.

### 4.6. Brownfield Versus Greenfield Projects

<ComparisonTable
  beforeTitle="Brownfield Projects"
  afterTitle="Greenfield Projects"
  beforeColor={colors.orange}
  afterColor={colors.green}
  items={[
    {
      label: "Starting Point",
      before: "Existing architecture to refactor",
      after: "Clean slate, fresh start"
    },
    {
      label: "Constraints",
      before: "Constrained by present and past choices",
      after: "Unconstrained by legacy"
    },
    {
      label: "Approach",
      before: "Strangler pattern, incremental replacement",
      after: "Design from scratch"
    },
    {
      label: "Risks",
      before: "Breaking existing systems, dependencies",
      after: "Shiny object syndrome, resume-driven development"
    }
  ]}
/>

**Brownfield Projects:**

**In plain English:** Brownfield is like renovating an old house while people still live in it - you need to understand why things were built the way they were, and change things carefully without breaking what still works.

**In technical terms:** Brownfield projects involve refactoring and reorganizing existing architecture, constrained by current and past choices. A key part of architecture is change management - figuring out a way around limitations and designing a path forward.

**Approaches:**
- **Big-bang overhaul** (not advised) - All-at-once replacement, often leads to disaster
- **Strangler pattern** (recommended) - New systems slowly, incrementally replace legacy components

> **Insight**
>
> **On Legacy:** "Legacy is a condescending way to describe something that makes money." Sometimes deprecation isn't practical or achievable at large organizations. Demonstrate value on the new platform by gradually increasing maturity, then follow an exit plan to shut down old systems.

**Greenfield Projects:**

**In plain English:** Greenfield is like building a new house on empty land - exciting freedom to try new things, but watch out for getting too carried away with fancy features that don't serve the actual purpose.

**In technical terms:** A greenfield project allows you to pioneer a fresh start, unconstrained by history or legacy. You can try the newest tools and architectural patterns.

**Watch Out For:**
- **Shiny object syndrome** - Reaching for latest tech without understanding impact
- **Resume-driven development** - Stacking impressive technologies without prioritizing project goals
- **Always prioritize requirements over building something cool**

> **Insight**
>
> Whether brownfield or greenfield, always focus on tenets of good data architecture: assess trade-offs, make flexible and reversible decisions, strive for positive ROI.

---

## 5. Examples and Types of Data Architecture

Because data architecture is abstract, it helps to reason by example. Here are prominent architecture patterns popular today.

### 5.1. Data Warehouse

**In plain English:** A data warehouse is like a central library for your company's data - everything is organized, cataloged, and optimized for people to find and analyze information quickly.

**In technical terms:** A data warehouse is a central data hub used for reporting and analysis. Data is typically highly formatted and structured for analytics use cases. It's among the oldest and most well-established data architectures.

**Why it matters:** Since cloud data warehouses arrived, they've become accessible even to tiny companies with pay-as-you-go models and third-party management, allowing companies to do more with fewer people.

**Bill Inmon's Original Definition (1989):**
> A data warehouse is "a subject-oriented, integrated, nonvolatile, and time-variant collection of data in support of management's decisions."

#### Organizational Data Warehouse Architecture

Two main characteristics:

<CardGrid
  columns={2}
  cards={[
    {
      title: "Separates OLAP from OLTP",
      icon: "🔀",
      color: colors.blue,
      items: [
        "OLAP = Analytics (data warehouse)",
        "OLTP = Transactions (production DBs)",
        "Directs load away from production",
        "Improves analytics performance"
      ]
    },
    {
      title: "Centralizes and Organizes Data",
      icon: "📊",
      color: colors.purple,
      items: [
        "ETL pulls data from source systems",
        "Transformation cleans and standardizes",
        "Load pushes to warehouse",
        "Data marts serve specific departments"
      ]
    }
  ]}
/>

#### ETL vs ELT

<DiagramContainer title="ETL Pattern">
  <ProcessFlow
    direction="horizontal"
    steps={[
      {
        title: "Extract",
        description: "Pull data from source systems",
        icon: "📤",
        color: colors.blue
      },
      {
        title: "Transform",
        description: "Clean, standardize, apply business logic",
        icon: "⚙️",
        color: colors.purple
      },
      {
        title: "Load",
        description: "Push to data warehouse",
        icon: "💾",
        color: colors.green
      }
    ]}
  />
</DiagramContainer>

<DiagramContainer title="ELT Pattern">
  <ProcessFlow
    direction="horizontal"
    steps={[
      {
        title: "Extract",
        description: "Pull data from source systems",
        icon: "📤",
        color: colors.blue
      },
      {
        title: "Load",
        description: "Push to staging area in warehouse",
        icon: "💾",
        color: colors.green
      },
      {
        title: "Transform",
        description: "Transform within warehouse using its power",
        icon: "⚙️",
        color: colors.purple
      }
    ]}
  />
</DiagramContainer>

**In plain English:** ETL transforms data before loading (clean it up outside, then bring it in). ELT loads data first, then transforms it inside the warehouse (bring it in raw, then clean it up using the warehouse's powerful computers).

**Why it matters:** ELT takes advantage of the massive computational power of cloud data warehouses. Data is processed in batches, and transformed output is written into tables and views for analytics.

#### Cloud Data Warehouse

**Evolution from On-Premises:**

<ComparisonTable
  beforeTitle="On-Premises Data Warehouse"
  afterTitle="Cloud Data Warehouse"
  beforeColor={colors.red}
  afterColor={colors.green}
  items={[
    {
      label: "Cost Model",
      before: "Multimillion-dollar contracts upfront",
      after: "Pay-as-you-go, spin up on demand"
    },
    {
      label: "Scaling",
      before: "Size for next several years",
      after: "Scale up over time as needed"
    },
    {
      label: "Architecture",
      before: "Tightly coupled storage and compute",
      after: "Separated compute from storage"
    },
    {
      label: "Capacity",
      before: "Limited by purchased hardware",
      after: "Virtually limitless (object storage)"
    }
  ]}
/>

**Key Innovations:**
- **Amazon Redshift** - Kicked off the revolution with on-demand clusters
- **Google BigQuery, Snowflake** - Popularized separating compute from storage
- **Data in object storage** - Virtually limitless storage capacity
- **Compute on demand** - Spin up power as needed, pay only for what you use

**Why it matters:** Cloud data warehouses expand MPP capabilities to cover many big data use cases that previously required Hadoop. They can process petabytes of data in a single query and support rich JSON documents.

#### Data Marts

**In plain English:** A data mart is like a specialized section of a library (children's books, medical journals) - it's a focused subset of the warehouse tailored for a specific department's needs.

**In technical terms:** A data mart is a more refined subset of a warehouse designed to serve analytics and reporting, focused on a single suborganization, department, or line of business.

**Why it matters:**
1. Makes data more easily accessible to analysts and report developers
2. Provides an additional transformation stage to improve performance
3. Pre-joined and aggregated data significantly improves query performance

<DiagramContainer title="Data Warehouse with Data Marts">
  <Column gap="md">
    <Row gap="md">
      <Box color={colors.blue} icon="📥">Source Systems</Box>
      <Arrow direction="right" label="ETL/ELT" />
      <Box color={colors.purple} icon="🏢" size="lg">Central Data Warehouse</Box>
    </Row>
    <Arrow direction="down" label="Transform for specific needs" />
    <Row gap="sm">
      <Box color={colors.green} variant="outlined">Sales Data Mart</Box>
      <Box color={colors.green} variant="outlined">Marketing Data Mart</Box>
      <Box color={colors.green} variant="outlined">Finance Data Mart</Box>
    </Row>
  </Column>
</DiagramContainer>

### 5.2. Data Lake

**In plain English:** A data lake is like a massive storage unit where you can dump anything - structured data, unstructured data, videos, logs - without organizing it first. The promise was flexibility, but it often became a junkyard.

**In technical terms:** Instead of imposing tight structural limitations, the data lake allows you to dump all your data—structured and unstructured—into a central location. Store first, structure later.

**Why it matters:** First-generation data lakes (Data Lake 1.0) made solid contributions but generally failed to deliver on their promise, leading to "data swamps," "dark data," and WORN (write once, read never) datasets.

#### Data Lake 1.0: Promise and Problems

**The Promise:**

<CardGrid
  columns={2}
  cards={[
    {
      title: "Storage Freedom",
      icon: "💾",
      color: colors.blue,
      items: [
        "Store any size and type of data",
        "Extremely cheap storage costs",
        "Virtually limitless capacity",
        "Decouple storage from compute"
      ]
    },
    {
      title: "Processing Flexibility",
      icon: "⚙️",
      color: colors.green,
      items: [
        "Unlimited computing power on demand",
        "Pick favorite processing technology",
        "MapReduce, Spark, Ray, Presto, Hive",
        "Process at your own pace"
      ]
    }
  ]}
/>

**The Problems:**

<CardGrid
  columns={2}
  cards={[
    {
      title: "Data Management Nightmare",
      icon: "⚠️",
      color: colors.red,
      items: [
        "Data swamps and dark data",
        "Little schema management",
        "Poor cataloging and discovery",
        "Unmanageable data sizes"
      ]
    },
    {
      title: "Processing Complexity",
      icon: "😵",
      color: colors.orange,
      items: [
        "MapReduce jobs for simple joins",
        "Painful DML operations (update, delete)",
        "Write-only architecture problems",
        "GDPR compliance nightmares"
      ]
    }
  ]}
/>

**Cost Reality:**

<ComparisonTable
  beforeTitle="The Hype"
  afterTitle="The Reality"
  beforeColor={colors.green}
  afterColor={colors.red}
  items={[
    {
      label: "Software Costs",
      before: "Open source = free",
      after: "Licensed Hadoop from vendors"
    },
    {
      label: "Hardware Costs",
      before: "Cheap off-the-shelf hardware",
      after: "Expensive cluster management"
    },
    {
      label: "Personnel Costs",
      before: "Small team",
      after: "Large teams of highly paid engineers"
    },
    {
      label: "Complexity",
      before: "Avoid vendor lock-in",
      after: "Exposed wires and sharp edges"
    }
  ]}
/>

> **Insight**
>
> Many organizations found significant value in data lakes—especially huge Silicon Valley tech companies like Netflix and Facebook with resources to build successful practices and create custom tools. But for many organizations, data lakes turned into an internal superfund site of waste, disappointment, and spiraling costs.

#### Convergence: Next-Generation Data Lakes

**In plain English:** The data lakehouse is like a data lake that learned from data warehouses - it keeps the flexibility of storing anything but adds the controls, management, and reliability that warehouses always had.

**In technical terms:** The lakehouse incorporates the controls, data management, and data structures found in a data warehouse while still housing data in object storage and supporting a variety of query and transformation engines.

**Key Features:**

<CardGrid
  columns={3}
  cards={[
    {
      title: "ACID Transactions",
      icon: "✅",
      color: colors.blue,
      items: [
        "Atomicity",
        "Consistency",
        "Isolation",
        "Durability"
      ]
    },
    {
      title: "Schema Management",
      icon: "📋",
      color: colors.purple,
      items: [
        "Schema enforcement",
        "Schema evolution",
        "Data cataloging",
        "Discovery tools"
      ]
    },
    {
      title: "Data Operations",
      icon: "⚙️",
      color: colors.green,
      items: [
        "Update rows",
        "Delete rows",
        "Merge operations",
        "Time travel"
      ]
    }
  ]}
/>

**Why it matters:** The data lake and data warehouse are converging. Vendors like AWS, Azure, Google Cloud, Snowflake, and Databricks offer data platforms combining both capabilities. Future data engineers will choose converged platforms based on vendor, ecosystem, and relative openness.

### 5.3. Modern Data Stack

**In plain English:** The modern data stack is like building with LEGO blocks instead of carving from solid marble - you snap together cloud-based, off-the-shelf components that are easy to use and replace.

**In technical terms:** The modern data stack uses cloud-based, plug-and-play, easy-to-use, off-the-shelf components to create a modular and cost-effective data architecture.

**Why it matters:** Whereas past data stacks relied on expensive monolithic toolsets, the modern data stack reduces complexity, increases modularization, and provides self-service analytics with clear pricing structures.

<DiagramContainer title="Modern Data Stack Components">
  <Column gap="md">
    <Box color={colors.blue} variant="filled" icon="📊">Data Sources</Box>
    <Arrow direction="down" />
    <Box color={colors.purple} variant="filled" icon="🔄">Data Pipelines (Fivetran, Airbyte)</Box>
    <Arrow direction="down" />
    <Box color={colors.green} variant="filled" icon="💾">Storage (Snowflake, BigQuery, Databricks)</Box>
    <Arrow direction="down" />
    <Box color={colors.orange} variant="filled" icon="⚙️">Transformation (dbt)</Box>
    <Arrow direction="down" />
    <Row gap="sm">
      <Box color={colors.blue} variant="outlined">BI Tools (Tableau, Looker)</Box>
      <Box color={colors.purple} variant="outlined">Data Catalog</Box>
      <Box color={colors.green} variant="outlined">Monitoring</Box>
    </Row>
  </Column>
</DiagramContainer>

**Key Outcomes:**

<CardGrid
  columns={3}
  cards={[
    {
      title: "Self-Service",
      icon: "🚀",
      color: colors.blue,
      items: [
        "Analytics self-service",
        "Pipeline self-service",
        "Agile data management",
        "Reduced dependencies"
      ]
    },
    {
      title: "Modularity",
      icon: "🧩",
      color: colors.purple,
      items: [
        "Plug-and-play components",
        "Easy to swap tools",
        "Clear pricing structures",
        "Open source + simple proprietary"
      ]
    },
    {
      title: "Community",
      icon: "👥",
      color: colors.green,
      items: [
        "Active user bases",
        "Transparent roadmaps",
        "Early feature access",
        "Community-driven development"
      ]
    }
  ]}
/>

### 5.4. Lambda Architecture

**In plain English:** Lambda architecture is like having two separate kitchens in your restaurant - one for fast food (streaming) and one for catering big events (batch). Sounds good until you realize you're maintaining two completely different systems with different code.

**In technical terms:** In Lambda architecture, systems operate independently - batch, streaming, and serving. The source system sends data to two destinations: a streaming layer for low-latency processing and a batch layer for comprehensive analytics.

**Why it matters:** Lambda architecture was an early popular response to reconciling batch and streaming data, but it has serious challenges including managing multiple systems with different codebases, creating error-prone systems with code and data that are extremely difficult to reconcile.

<DiagramContainer title="Lambda Architecture">
  <Row gap="md">
    <Box color={colors.blue} icon="📊" size="lg">Immutable Source Data</Box>
    <Column gap="lg">
      <Column gap="sm">
        <Arrow direction="right" label="Stream" />
        <Box color={colors.purple} icon="⚡">Speed Layer (NoSQL)</Box>
        <Box color={colors.slate} variant="subtle" size="sm">Low latency, real-time</Box>
      </Column>
      <Column gap="sm">
        <Arrow direction="right" label="Batch" />
        <Box color={colors.green} icon="📦">Batch Layer (Data Warehouse)</Box>
        <Box color={colors.slate} variant="subtle" size="sm">Precomputed, aggregated views</Box>
      </Column>
    </Column>
    <Column gap="sm">
      <Arrow direction="right" />
      <Box color={colors.orange} icon="🎯">Serving Layer</Box>
      <Box color={colors.slate} variant="subtle" size="sm">Combined query results</Box>
    </Column>
  </Row>
</DiagramContainer>

**Challenges:**
- Managing multiple systems with different codebases
- Error-prone systems
- Extremely difficult to reconcile code and data
- Not the first recommendation for combining streaming and batch

> **Insight**
>
> We mention Lambda architecture because it still gets attention and is popular in search results. However, technology and practices have moved on. It's not our first recommendation for combining streaming and batch data for analytics.

### 5.5. Kappa Architecture

**In plain English:** Kappa architecture says "why not just use streaming for everything?" - both real-time and batch processing use the same streaming platform. It sounds simpler than Lambda, but it's still complicated and expensive in practice.

**In technical terms:** Kappa architecture uses a stream-processing platform as the backbone for all data handling—ingestion, storage, and serving. Real-time and batch processing both read from the same event stream, with batch processing replaying large chunks of data.

**Why it matters:** Proposed by Jay Kreps in 2014 as a response to Lambda architecture's shortcomings, Kappa architecture facilitates true event-based architecture with unified processing.

<DiagramContainer title="Kappa Architecture">
  <Column gap="md">
    <Box color={colors.blue} icon="📊">Event Sources</Box>
    <Arrow direction="down" />
    <Box color={colors.purple} icon="📨" size="lg">Stream Processing Platform (Single Source)</Box>
    <Row gap="md">
      <Column gap="sm">
        <Arrow direction="down" label="Live stream" />
        <Box color={colors.green} icon="⚡">Real-Time Processing</Box>
      </Column>
      <Column gap="sm">
        <Arrow direction="down" label="Replay chunks" />
        <Box color={colors.orange} icon="📦">Batch Processing</Box>
      </Column>
    </Row>
  </Column>
</DiagramContainer>

**Why Not Widely Adopted:**

<CardGrid
  columns={2}
  cards={[
    {
      title: "Streaming Complexity",
      icon: "😵",
      color: colors.red,
      items: [
        "Still a mystery for many companies",
        "Easy to talk about",
        "Harder than expected to execute",
        "Requires specialized expertise"
      ]
    },
    {
      title: "Cost and Scale",
      icon: "💰",
      color: colors.orange,
      items: [
        "Streaming systems are complex and expensive",
        "Batch storage more efficient for historical data",
        "Batch processing more cost-effective",
        "Streaming at huge scale is challenging"
      ]
    }
  ]}
/>

### 5.6. The Dataflow Model

**In plain English:** The Dataflow model treats all data as events flowing through windows of time. Whether you're processing yesterday's data (batch) or today's streaming data, you use the same code and same tools.

**In technical terms:** The core idea in the Dataflow model is to view all data as events, with aggregation performed over various types of windows. Unbounded data is ongoing real-time event streams. Bounded data is simply event streams with boundaries providing a natural window.

**Why it matters:** Google developed the Dataflow model and Apache Beam framework implementing this model to unify batch and streaming processing. Engineers use nearly identical code for real-time and batch processing in the same system.

<DiagramContainer title="Unified Batch and Streaming (Dataflow Model)">
  <Column gap="md">
    <Row gap="lg">
      <Column gap="sm" align="center">
        <Box color={colors.blue} variant="outlined">Unbounded Data</Box>
        <Box color={colors.slate} variant="subtle" size="sm">Ongoing real-time streams</Box>
      </Column>
      <Column gap="sm" align="center">
        <Box color={colors.purple} variant="outlined">Bounded Data</Box>
        <Box color={colors.slate} variant="subtle" size="sm">Batches with boundaries</Box>
      </Column>
    </Row>
    <Arrow direction="down" label="Both are events" />
    <Box color={colors.green} variant="filled" size="lg" icon="⚙️">
      Same Processing Framework (Apache Beam, Flink, Spark)
    </Box>
    <Box color={colors.orange} variant="subtle">
      Windows: Sliding, Tumbling, Session - Real-time and batch use same code
    </Box>
  </Column>
</DiagramContainer>

**Key Principle:** Batch as a special case of streaming

**Frameworks Adopting This Approach:**
- Apache Beam
- Apache Flink
- Apache Spark Structured Streaming

### 5.7. Architecture for IoT

**In plain English:** IoT architecture is like managing a swarm of tiny reporters scattered everywhere - each device collects data from its environment and sends reports back, but you need systems to receive, route, and make sense of millions of messages coming from thousands of devices.

**In technical terms:** The Internet of Things (IoT) is the distributed collection of devices—computers, sensors, mobile devices, smart home devices—that collect data periodically or continuously from the surrounding environment and transmit it to a destination.

**Why it matters:** IoT has evolved from a futurist fantasy to a massive data engineering domain. We expect IoT to become one of the dominant ways data is generated and consumed.

#### IoT Components

<CardGrid
  columns={3}
  cards={[
    {
      title: "Devices (Things)",
      icon: "📱",
      color: colors.blue,
      items: [
        "Physical hardware collecting data",
        "Sensors monitoring environment",
        "Low-powered, low-bandwidth operation",
        "Edge computing capability"
      ]
    },
    {
      title: "IoT Gateway",
      icon: "🌐",
      color: colors.purple,
      items: [
        "Hub for connecting devices",
        "Securely routes to internet",
        "Manages low-power connections",
        "Way station for data retention"
      ]
    },
    {
      title: "Message Queue",
      icon: "📨",
      color: colors.green,
      items: [
        "Receives events from gateways",
        "Buffers and routes messages",
        "Enables stream processing",
        "Supports multiple consumers"
      ]
    }
  ]}
/>

<DiagramContainer title="IoT Architecture">
  <Row gap="md">
    <Column gap="sm">
      <Box color={colors.blue} variant="outlined" size="sm" icon="📱">Device 1</Box>
      <Box color={colors.blue} variant="outlined" size="sm" icon="📱">Device 2</Box>
      <Box color={colors.blue} variant="outlined" size="sm" icon="📱">Device 3</Box>
    </Column>
    <Arrow direction="right" label="Low-power protocol" />
    <Box color={colors.purple} icon="🌐">IoT Gateway</Box>
    <Arrow direction="right" label="Internet" />
    <Box color={colors.green} icon="📨">Message Queue</Box>
    <Arrow direction="right" />
    <Column gap="sm">
      <Box color={colors.orange} variant="outlined" size="sm">Stream Processing</Box>
      <Box color={colors.orange} variant="outlined" size="sm">Batch Analytics</Box>
      <Box color={colors.orange} variant="outlined" size="sm">ML Models</Box>
    </Column>
  </Row>
</DiagramContainer>

#### IoT Data Engineering Considerations

**Storage:**
- Latency requirements determine storage choice
- Remote sensors → batch object storage acceptable
- Real-time monitoring → message queue or time-series database
- Near real-time responses → streaming architecture

**Serving:**
- Incredibly diverse patterns
- Reverse ETL-like patterns (send optimizations back to devices)
- Real-time anomaly detection (fire, break-in)
- Batch analytics (monthly reports)
- ML model updates pushed to edge devices

**Complexity:**

> **Insight**
>
> IoT scenarios are incredibly complex. IoT architecture and systems are less familiar to data engineers who've spent careers working with business data. This introduction encourages interested data engineers to learn more about this fascinating and rapidly evolving specialization.

### 5.8. Data Mesh

**In plain English:** Data mesh is like turning your centralized data warehouse into a federation of independent data products, where each team owns and serves their domain's data like a product with clear interfaces and quality guarantees.

**In technical terms:** The data mesh is a recent response to sprawling monolithic data platforms (centralized data lakes and warehouses) and "the great divide of data" between operational and analytical data. It applies domain-driven design concepts from software to data architecture.

**Why it matters:** Data mesh inverts the challenges of centralized data architecture by decentralizing data ownership and treating data as a product, enabling agility and domain expertise.

**Zhamak Dehghani's Core Principle:**
> Instead of flowing data from domains into a centrally owned data lake or platform, domains need to host and serve their domain datasets in an easily consumable way.

#### Four Key Components of Data Mesh

<CardGrid
  columns={2}
  cards={[
    {
      title: "1. Domain-Oriented Decentralized Data Ownership",
      icon: "🏢",
      color: colors.blue,
      items: [
        "Each domain owns their data",
        "Domain teams maintain data products",
        "Decentralized architecture",
        "Domain expertise embedded"
      ]
    },
    {
      title: "2. Data as a Product",
      icon: "📦",
      color: colors.purple,
      items: [
        "Treat data like a product",
        "Clear interfaces and contracts",
        "Quality guarantees",
        "Discoverable and understandable"
      ]
    },
    {
      title: "3. Self-Serve Data Infrastructure",
      icon: "🛠️",
      color: colors.green,
      items: [
        "Platform provides common capabilities",
        "Domain teams can self-serve",
        "Automated infrastructure",
        "Reduced friction"
      ]
    },
    {
      title: "4. Federated Computational Governance",
      icon: "⚖️",
      color: colors.orange,
      items: [
        "Decentralized decision-making",
        "Common standards and policies",
        "Automated policy enforcement",
        "Balance autonomy and compliance"
      ]
    }
  ]}
/>

<DiagramContainer title="Data Mesh Architecture (Simplified)">
  <Column gap="md">
    <Box color={colors.blue} variant="filled" size="lg" icon="🛠️">
      Self-Serve Data Platform
    </Box>
    <Row gap="md">
      <Column gap="sm">
        <Box color={colors.green} icon="💰">Sales Domain</Box>
        <Box color={colors.green} variant="outlined" size="sm">Orders Data Product</Box>
        <Box color={colors.green} variant="outlined" size="sm">Customer Data Product</Box>
      </Column>
      <Column gap="sm">
        <Box color={colors.purple} icon="📦">Inventory Domain</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Stock Data Product</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Warehouse Data Product</Box>
      </Column>
      <Column gap="sm">
        <Box color={colors.orange} icon="📊">Analytics Domain</Box>
        <Box color={colors.orange} variant="outlined" size="sm">Reports Data Product</Box>
        <Box color={colors.orange} variant="outlined" size="sm">Metrics Data Product</Box>
      </Column>
    </Row>
    <Box color={colors.slate} variant="subtle">
      Each domain serves data products with clear interfaces, quality guarantees, and ownership
    </Box>
  </Column>
</DiagramContainer>

**Why it matters:** Data mesh addresses the challenges of centralized monolithic platforms and enables domain teams to take ownership of their data while maintaining interoperability through common standards and self-serve infrastructure.

---

## 6. Summary

You've learned how data architecture fits into the data engineering lifecycle and what makes for "good" data architecture, and you've seen several examples of data architectures.

### Key Takeaways

1. **Architecture is about change** - Data architecture is the design of systems to support evolving data needs through flexible and reversible decisions with careful trade-off evaluation

2. **Principles over patterns** - Nine principles guide good architecture: choose common components wisely, plan for failure, architect for scalability, architecture is leadership, always be architecting, build loosely coupled systems, make reversible decisions, prioritize security, embrace FinOps

3. **Understand the fundamentals** - Domains and services, distributed systems, tight vs loose coupling, single vs multitenant, event-driven architecture, brownfield vs greenfield all form the foundation

4. **Multiple architecture patterns** - Data warehouses, data lakes, lakehouses, modern data stack, Lambda/Kappa, Dataflow model, IoT, and data mesh each solve different problems with different trade-offs

5. **Convergence is happening** - The line between data lake and data warehouse is blurring. Modern data platforms combine capabilities of both

6. **No perfect architecture** - Never shoot for the best architecture, but rather the least worst architecture. Always evaluate trade-offs

7. **Keep it agile** - Good data architecture is never finished. Change and evolution are central to its meaning and purpose

> **Insight**
>
> Because architecture is such a key foundation for success, invest time to study it deeply and understand the trade-offs inherent in any architecture. You will be prepared to map out architecture that corresponds to your organization's unique requirements.

**Additional Resources:**
- Mark Richards and Neal Ford: *Fundamentals of Software Architecture*
- Martin Kleppmann: *Designing Data-Intensive Applications*
- Zhamak Dehghani: *Data Mesh*
- J. R. Storment and Mike Fuller: *Cloud FinOps*
- AWS Well-Architected Framework
- Google Cloud's Five Principles for Cloud-Native Architecture

---

**Previous:** [Chapter 2: The Data Engineering Lifecycle](./chapter2) | **Next:** [Chapter 4: Choosing Technologies](./chapter4)
