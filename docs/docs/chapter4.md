---
sidebar_position: 5
title: "Chapter 4: Choosing Technologies Across the Data Engineering Lifecycle"
description: "Master the art of technology selection for data engineering, including team considerations, build vs. buy decisions, cloud strategies, and optimization approaches"
---

import {
  Box, Arrow, Row, Column, Group,
  DiagramContainer, ProcessFlow, TreeDiagram,
  CardGrid, StackDiagram, ComparisonTable,
  colors
} from '@site/src/components/diagrams';

# Chapter 4: Choosing Technologies Across the Data Engineering Lifecycle

> **"Architecture is the what, why, and when. Tools are the how."**
>
> — Data engineering principle

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Architecture First, Technology Second](#2-architecture-first-technology-second)
3. [Key Considerations for Choosing Technologies](#3-key-considerations-for-choosing-technologies)
   - 3.1. [Team Size and Capabilities](#31-team-size-and-capabilities)
   - 3.2. [Speed to Market](#32-speed-to-market)
   - 3.3. [Interoperability](#33-interoperability)
   - 3.4. [Cost Optimization and Business Value](#34-cost-optimization-and-business-value)
   - 3.5. [Today Versus the Future](#35-today-versus-the-future-immutable-versus-transitory-technologies)
4. [Location: Where to Run Your Stack](#4-location-where-to-run-your-stack)
   - 4.1. [On Premises](#41-on-premises)
   - 4.2. [Cloud](#42-cloud)
   - 4.3. [Hybrid Cloud](#43-hybrid-cloud)
   - 4.4. [Multicloud](#44-multicloud)
5. [Build Versus Buy](#5-build-versus-buy)
   - 5.1. [Open Source Software](#51-open-source-software)
   - 5.2. [Proprietary Walled Gardens](#52-proprietary-walled-gardens)
6. [Architectural Patterns](#6-architectural-patterns)
   - 6.1. [Monolith Versus Modular](#61-monolith-versus-modular)
   - 6.2. [Serverless Versus Servers](#62-serverless-versus-servers)
7. [Optimization and Performance](#7-optimization-and-performance)
8. [Undercurrents and Technology Choice](#8-undercurrents-and-technology-choice)
9. [Conclusion](#9-conclusion)

---

## 1. Introduction

**In plain English:** Data engineering suffers from an embarrassment of riches - you have too many choices. It's like walking into a hardware store with unlimited budget and every tool imaginable. The challenge isn't finding a solution; it's choosing the right one without getting distracted by shiny objects.

**In technical terms:** Data engineering nowadays offers turnkey technologies consumable in every way—open source, managed open source, proprietary software, proprietary service, and more. However, it's easy to get caught up in chasing bleeding-edge technology while losing sight of the core purpose: designing robust and reliable systems to carry data through the full lifecycle.

**Why it matters:** The criteria for choosing good data technology is simple: does it add value to the data product and the broader business? Everything else is noise. Just as structural engineers carefully choose materials to realize an architect's vision for a building, data engineers must make appropriate technology choices to shepherd data through its lifecycle.

> **Insight**
>
> We often see teams going "off the rails" and choosing technologies before mapping out an architecture. The reasons vary: shiny object syndrome, resume-driven development, and lack of expertise in architecture. This prioritization of technology often means they cobble together a Dr. Seuss fantasy machine rather than true data architecture.

---

## 2. Architecture First, Technology Second

A lot of people confuse architecture and tools. Architecture is strategic; tools are tactical. We sometimes hear, "Our data architecture are tools X, Y, and Z." This is the wrong way to think about architecture.

<DiagramContainer title="Architecture vs. Technology">
  <Row gap="lg">
    <Column gap="sm" align="center">
      <Box color={colors.blue} icon="📐" size="lg">Architecture</Box>
      <Box color={colors.slate} variant="subtle">Strategic</Box>
      <Column gap="xs">
        <Box color={colors.blue} variant="outlined" size="sm">What</Box>
        <Box color={colors.blue} variant="outlined" size="sm">Why</Box>
        <Box color={colors.blue} variant="outlined" size="sm">When</Box>
      </Column>
    </Column>
    <Column gap="sm" align="center">
      <Box color={colors.purple} icon="🔧" size="lg">Technology</Box>
      <Box color={colors.slate} variant="subtle">Tactical</Box>
      <Column gap="xs">
        <Box color={colors.purple} variant="outlined" size="sm">How</Box>
      </Column>
    </Column>
  </Row>
</DiagramContainer>

**In plain English:** Architecture is like the blueprint for a house - it defines what rooms you need, why they're arranged that way, and when different parts connect. Technology is the specific materials and tools you use to build it - hammers, nails, concrete brands.

**In technical terms:** Architecture is the high-level design, roadmap, and blueprint of data systems that satisfy the strategic aims for the business. Tools are used to make the architecture a reality. Get your architecture right before choosing specific technologies.

**Why it matters:** Teams that choose technology before architecture end up with incompatible systems that don't serve business needs. Architectural decisions shape everything that follows.

:::warning
**Strongly advise against choosing technology before getting your architecture right.** Architecture first, technology second.
:::

---

## 3. Key Considerations for Choosing Technologies

This chapter discusses our tactical plan for making technology choices once we have a strategic architecture blueprint.

### 3.1. Team Size and Capabilities

**In plain English:** Don't try to drive a Formula 1 race car if you're still learning to drive stick shift. Match your technology complexity to your team's capabilities and bandwidth.

**In technical terms:** Your team's size determines the amount of bandwidth you can dedicate to complex solutions. There's a continuum from simple to complex technologies, and team size roughly maps to where you should operate on this spectrum.

**Why it matters:** Small teams that try to emulate giant tech companies' complex technologies engage in cargo-cult engineering - a big mistake that consumes valuable time and money with little to show in return.

<CardGrid
  columns={2}
  cards={[
    {
      title: "Small Teams / Weaker Skills",
      icon: "👥",
      color: colors.blue,
      items: [
        "Use managed and SaaS tools",
        "Avoid complex custom solutions",
        "Focus bandwidth on business problems",
        "Stick with familiar technologies"
      ]
    },
    {
      title: "Large Teams / Strong Skills",
      icon: "🏢",
      color: colors.purple,
      items: [
        "Can tackle more complexity",
        "Custom solutions where valuable",
        "Specialized roles possible",
        "Broader technology experimentation"
      ]
    }
  ]}
/>

#### Team Skills Inventory

Take inventory of your team's skills:
- Do people lean toward low-code tools or code-first approaches?
- Are people strong in certain languages (Java, Python, Go)?
- What workflows is the team familiar with?

> **Insight**
>
> We've seen data teams invest significant time learning shiny new technologies, languages, or tools, only to never use them in production. Learning new technologies is a considerable time investment - make these investments wisely.

### 3.2. Speed to Market

**In plain English:** In technology, speed wins. Launch something useful today rather than something perfect in six months. Fast feedback loops beat slow deliberation every time.

**In technical terms:** Speed to market means choosing technologies that help you deliver features and data faster while maintaining high-quality standards and security. Work in tight feedback loops: launch, learn, iterate, improve.

**Why it matters:** Perfect is the enemy of good. Teams that deliberate on technology choices for months or years without reaching decisions suffer the kiss of death. Slow decisions and output have dissolved more data teams than technical failures.

<ProcessFlow
  direction="horizontal"
  steps={[
    {
      title: "Launch",
      description: "Deploy working solution quickly",
      icon: "🚀",
      color: colors.blue
    },
    {
      title: "Learn",
      description: "Gather feedback and metrics",
      icon: "📊",
      color: colors.purple
    },
    {
      title: "Iterate",
      description: "Make improvements based on data",
      icon: "🔄",
      color: colors.green
    },
    {
      title: "Improve",
      description: "Continuously enhance value",
      icon: "📈",
      color: colors.orange
    }
  ]}
/>

**Key Principles:**
- Deliver value early and often
- Use what works - leverage tools your team already knows
- Avoid undifferentiated heavy lifting
- Choose tools that help you move quickly, reliably, safely, and securely

### 3.3. Interoperability

**In plain English:** Interoperability is how well your technologies play together. It's like making sure all your power tools use the same battery system - seamless integration saves massive time and headaches.

**In technical terms:** Interoperability describes how various technologies or systems connect, exchange information, and interact. When evaluating technologies A and B, assess integration difficulty on a spectrum from seamless to time-intensive.

**Why it matters:** Rarely will you use only one technology or system. Poor interoperability creates integration hell - manual configuration, custom connectors, brittle connections that break with every update.

<DiagramContainer title="Interoperability Spectrum">
  <ProcessFlow
    direction="horizontal"
    steps={[
      {
        title: "Seamless",
        description: "Built-in integrations, works out of box",
        icon: "✅",
        color: colors.green
      },
      {
        title: "Standards-Based",
        description: "JDBC/ODBC, REST APIs with quirks",
        icon: "📋",
        color: colors.blue
      },
      {
        title: "Custom Integration",
        description: "Manual configuration required",
        icon: "⚙️",
        color: colors.orange
      },
      {
        title: "Time-Intensive",
        description: "Major engineering effort to connect",
        icon: "⚠️",
        color: colors.red
      }
    ]}
  />
</DiagramContainer>

**Common Integration Standards:**
- **JDBC/ODBC** - Nearly all databases support these
- **REST APIs** - Common but not truly standardized (every API has quirks)
- **Built-in integrations** - Many tools target popular platforms (data warehouses, data lakes)

> **Insight**
>
> Design for modularity and give yourself the ability to easily swap out technologies as new practices and alternatives become available. Always be aware of how simple it will be to connect your various technologies across the data engineering lifecycle.

### 3.4. Cost Optimization and Business Value

**In plain English:** In a perfect world, you'd experiment with every cool technology without worrying about cost. In reality, budgets are finite, and your organization expects positive ROI. Technology choices significantly impact your budget.

**In technical terms:** Technology is a major cost driver in data projects. Understanding costs through total cost of ownership (TCO), total opportunity cost of ownership (TOCO), and FinOps is essential for making sound technology decisions.

**Why it matters:** Your organization expects positive ROI from data projects. You must understand the basic costs you can control and make technology choices that maximize business value relative to cost.

#### Total Cost of Ownership (TCO)

<CardGrid
  columns={2}
  cards={[
    {
      title: "Direct Costs",
      icon: "💰",
      color: colors.blue,
      items: [
        "Salaries of team members",
        "Cloud bills (AWS, Azure, GCP)",
        "Software licenses",
        "Training and onboarding"
      ]
    },
    {
      title: "Indirect Costs (Overhead)",
      icon: "🏢",
      color: colors.purple,
      items: [
        "Office space and facilities",
        "Management overhead",
        "HR and recruiting",
        "Must be paid regardless of initiative"
      ]
    }
  ]}
/>

#### Capital vs. Operational Expenses

<ComparisonTable
  beforeTitle="Capital Expenses (CapEx)"
  afterTitle="Operational Expenses (OpEx)"
  beforeColor={colors.red}
  afterColor={colors.green}
  items={[
    {
      label: "Payment Model",
      before: "Up-front investment required today",
      after: "Gradual, spread out over time"
    },
    {
      label: "Time Focus",
      before: "Long-term focused",
      after: "Short-term, pay-as-you-go"
    },
    {
      label: "Example",
      before: "Purchase hardware/software contracts",
      after: "Cloud services consumption model"
    },
    {
      label: "Flexibility",
      before: "Low - locked into purchase",
      after: "High - adjust as needs change"
    },
    {
      label: "Depreciation",
      before: "Treat as assets, depreciate over time",
      after: "Direct cost, easier to attribute"
    }
  ]}
/>

:::tip
**Given the upside for flexibility and low initial costs, we urge data engineers to take an opex-first approach centered on the cloud and flexible, pay-as-you-go technologies.**
:::

#### Total Opportunity Cost of Ownership (TOCO)

**In plain English:** Opportunity cost is what you give up when choosing option A over options B, C, and D. If you choose the wrong data stack and it becomes obsolete or doesn't fit your needs, how painful and expensive is it to switch?

**In technical terms:** TOCO is the cost of lost opportunities incurred in choosing a technology, architecture, or process. Even in a cloud environment, you effectively "own" a technology once it becomes core to production and difficult to move away from.

**Why it matters:** Data engineers often fail to evaluate TOCO when undertaking new projects - a massive blind spot. How quickly and cheaply can you move to something newer and better? This is critical when new technologies appear at an ever-faster rate.

<DiagramContainer title="Evaluating Opportunity Cost">
  <Column gap="md">
    <Box color={colors.blue} variant="filled">
      Choose Data Stack A
    </Box>
    <Arrow direction="down" />
    <Row gap="sm">
      <Box color={colors.red} variant="outlined">Exclude Stack B</Box>
      <Box color={colors.red} variant="outlined">Exclude Stack C</Box>
      <Box color={colors.red} variant="outlined">Exclude Stack D</Box>
    </Row>
    <Arrow direction="down" label="What if Stack A was a poor choice?" />
    <Column gap="xs">
      <Box color={colors.orange} variant="subtle">Can you move to other stacks?</Box>
      <Box color={colors.orange} variant="subtle">How quickly and cheaply?</Box>
      <Box color={colors.orange} variant="subtle">Does expertise translate to next wave?</Box>
    </Column>
  </Column>
</DiagramContainer>

> **Insight**
>
> The first step to minimizing opportunity cost is evaluating it with eyes wide open. Inflexible data technologies are like bear traps - they're easy to get into and extremely painful to escape.

#### FinOps

**In plain English:** FinOps treats cloud spending like a DevOps problem - continuous monitoring, optimization, and adjustment. It's not just about saving money; it's about making money through smart cloud usage.

**In technical terms:** FinOps fully operationalizes financial accountability and business value by applying DevOps-like practices of monitoring and dynamically adjusting systems. Typical cloud spending is inherently opex - companies pay for services rather than making up-front purchases.

**Why it matters:** Cloud spend can drive more revenue, signal customer base growth, enable faster product release velocity, or help shut down data centers. The ability to iterate quickly and scale dynamically is invaluable for creating business value.

> **"If it seems that FinOps is about saving money, then think again. FinOps is about making money."**

### 3.5. Today Versus the Future: Immutable Versus Transitory Technologies

**In plain English:** Focus on the present, but in a way that supports future unknowns. Don't overarchitect for a future that may never arrive. Choose the best technology for now and the near future.

**In technical terms:** In an exciting domain like data engineering, it's too easy to focus on a rapidly evolving future while ignoring concrete present needs. Tooling chosen for the future may be stale and outdated when that future arrives.

**Why it matters:** The future frequently looks little like what we envisioned years before. Where are you today, and what are your goals for the future? Your answers should inform decisions about architecture and thus technologies.

<ComparisonTable
  beforeTitle="Immutable Technologies"
  afterTitle="Transitory Technologies"
  beforeColor={colors.green}
  afterColor={colors.orange}
  items={[
    {
      label: "Lifespan",
      before: "Decades - stand the test of time",
      after: "Years - hype, growth, slow descent"
    },
    {
      label: "Examples",
      before: "Object storage (S3), SQL, bash, security fundamentals",
      after: "Many JavaScript frameworks, hyped data tools"
    },
    {
      label: "Lindy Effect",
      before: "Longer established → longer it will be used",
      after: "Meteoric rise often followed by obsolescence"
    },
    {
      label: "Investment Risk",
      before: "Low - safe foundation",
      after: "High - many companies/projects fade"
    }
  ]}
/>

#### Immutable Technologies (Foundation)

<CardGrid
  columns={3}
  cards={[
    {
      title: "Cloud Fundamentals",
      icon: "☁️",
      color: colors.blue,
      items: [
        "Object storage (S3, Azure Blob)",
        "Networking basics",
        "Servers and compute",
        "Security fundamentals"
      ]
    },
    {
      title: "Languages",
      icon: "💻",
      color: colors.purple,
      items: [
        "SQL (decades old, still essential)",
        "Bash scripting",
        "C programming language",
        "x86 processor architecture"
      ]
    },
    {
      title: "Lindy Effect Examples",
      icon: "⏳",
      color: colors.green,
      items: [
        "Power grid",
        "Relational databases",
        "UNIX principles",
        "TCP/IP networking"
      ]
    }
  ]}
/>

#### Transitory Technologies (Build Around Immutables)

**Examples of transitory tech trajectories:**
- **JavaScript frameworks**: Backbone.js, Ember.js, Knockout → React, Vue.js → Next framework in 3 years?
- **Data processing**: MapReduce → Hive → Presto, Spark → Next generation tools
- **Big data storage**: Hadoop HDFS → Cloud data lakes → Lakehouses → Next evolution

> **Insight**
>
> Even relatively successful technologies often fade into obscurity quickly after a few years of rapid adoption. Hive was met with rapid uptake in the early 2010s but now appears primarily in legacy deployments. Almost every technology follows this inevitable path of decline.

#### Our Advice

<DiagramContainer title="Technology Evaluation Strategy">
  <ProcessFlow
    direction="vertical"
    steps={[
      {
        title: "Evaluate Every 2 Years",
        description: "Regular reassessment of technology choices",
        icon: "🔄",
        color: colors.blue
      },
      {
        title: "Build on Immutables",
        description: "Find immutable technologies along the lifecycle",
        icon: "🏗️",
        color: colors.purple
      },
      {
        title: "Transitory Tools Around Foundation",
        description: "Build transitory tools around immutables",
        icon: "🧩",
        color: colors.green
      },
      {
        title: "Assess Transition Ease",
        description: "How easy is it to leave? Avoid bear traps",
        icon: "🚪",
        color: colors.orange
      }
    ]}
  />
</DiagramContainer>

**Key Questions:**
- What are the barriers to leaving this technology?
- Will the project get abandoned?
- Is the company viable?
- Is the technology still a good fit as needs evolve?

---

## 4. Location: Where to Run Your Stack

Companies now have numerous options when deciding where to run their technology stacks. A slow shift toward the cloud has culminated in a stampede of companies spinning up workloads on AWS, Azure, and Google Cloud Platform (GCP).

**In plain English:** Where should you run your data systems? In your own data centers (on premises), in the cloud, or some combination? This decision has moved from technical preference to existential significance for many organizations.

**In technical terms:** Principal options include on premises, cloud, hybrid cloud, and multicloud. Each comes with distinct cost models, operational requirements, and strategic trade-offs.

**Why it matters:** Move too slowly and risk being left behind by agile competition. Move too quickly with poor planning and face technological failure and catastrophic costs.

### 4.1. On Premises

**In plain English:** On premises means you own the hardware - it lives in data centers you own or lease. You're responsible for everything: repairs, upgrades, capacity planning, handling peak loads like Black Friday.

**In technical terms:** Established companies own hardware in their data centers or leased colocation space. They're operationally responsible for hardware, software, failures, upgrades, and ensuring enough capacity to handle peak loads without overbuying.

**Why it matters:** While established companies have proven operational practices, they see younger competition scaling rapidly with cloud-managed services. Companies in competitive sectors generally can't stand still.

<CardGrid
  columns={2}
  cards={[
    {
      title: "On-Premises Advantages",
      icon: "✅",
      color: colors.green,
      items: [
        "Established operational practices",
        "Proven track record managing hardware",
        "Full control over infrastructure",
        "Predictable costs (CapEx model)"
      ]
    },
    {
      title: "On-Premises Challenges",
      icon: "⚠️",
      color: colors.red,
      items: [
        "Can't scale dynamically for peaks",
        "Must buy hardware years in advance",
        "Competition using cloud advantages",
        "Risk of disruption by agile competitors"
      ]
    }
  ]}
/>

### 4.2. Cloud

**In plain English:** The cloud flips the on-premises model upside down. Instead of buying hardware, you rent it from cloud providers (AWS, Azure, Google Cloud). Spin up VMs in under a minute, pay by the second, scale dynamically.

**In technical terms:** Cloud environments allow engineers to quickly launch projects without long lead time hardware planning. Resources can be reserved on extremely short-term basis - VMs spin up in less than a minute, subsequent usage billed in per-second increments.

**Why it matters:** This makes the cloud extremely appealing to startups (tight on budget and time) and established businesses dealing with seasonality, traffic spikes, or uncertain business climates.

<StackDiagram
  title="Evolution of Cloud Service Models"
  layers={[
    {
      label: "SaaS (Software as a Service)",
      color: colors.green,
      items: [
        "Fully functioning enterprise platforms",
        "Minimal operational management",
        "Examples: Salesforce, Fivetran, Zoom"
      ]
    },
    {
      label: "PaaS (Platform as a Service)",
      color: colors.blue,
      items: [
        "Managed databases, streaming, Kubernetes",
        "Ignore operational details of individual machines",
        "Examples: RDS, Cloud SQL, Kinesis, GKE"
      ]
    },
    {
      label: "IaaS (Infrastructure as a Service)",
      color: colors.purple,
      items: [
        "Rented slices of hardware",
        "VMs and virtual disks",
        "Examples: EC2, Compute Engine"
      ]
    }
  ]}
/>

#### Cloud Economics: Critical Concepts

:::warning
**Cloud ≠ On Premises**

This may seem like a silly tautology, but the belief that cloud services are just like familiar on-premises servers is a widespread cognitive error that plagues cloud migrations and leads to horrifying bills.
:::

<ComparisonTable
  beforeTitle="Simple Lift and Shift (Wrong)"
  afterTitle="Cloud-Native Architecture (Right)"
  beforeColor={colors.red}
  afterColor={colors.green}
  items={[
    {
      label: "Approach",
      before: "Move on-premises servers 1:1 to cloud VMs",
      after: "Redesign for cloud pricing model"
    },
    {
      label: "Scaling",
      before: "Long-running servers at peak capacity",
      after: "Autoscaling: scale down when light, up at peaks"
    },
    {
      label: "Cost",
      before: "Significantly more expensive than on-premises",
      after: "Lower costs + increased business value"
    },
    {
      label: "Optimization",
      before: "Follows on-premises operational practices",
      after: "Reserved/spot instances, serverless functions"
    }
  ]}
/>

**Key to Cloud Value:**
Rather than deploying long-running servers capable of handling full peak load, use autoscaling to allow workloads to:
- Scale down to minimal infrastructure when loads are light
- Scale up to massive clusters during peak times
- Use reserved or spot instances for discounts
- Use serverless functions in place of servers

> **Insight**
>
> **Cloud pricing is more subtle than on-premises.** Rather than just charging for CPU cores and memory, cloud vendors monetize characteristics like durability, reliability, longevity, and predictability. Various compute platforms discount offerings for ephemeral workloads that can be interrupted when capacity is needed elsewhere.

#### Data Gravity

**In plain English:** Data gravity is real - once data lands in a cloud, the cost to extract it and migrate processes can be very high. It's like a black hole: easy to get data in, expensive to get it out.

**In technical terms:** Vendors want to lock you into their offerings. Getting data onto the platform is cheap or free on most cloud platforms, but getting data out (egress) can be extremely expensive.

**Why it matters:** Be aware of data egress fees and their long-term impacts on your business before getting blindsided by a large bill. Consider these costs when planning multi-cloud or hybrid architectures.

### 4.3. Hybrid Cloud

**In plain English:** Hybrid cloud means keeping some workloads on premises while moving others to the cloud. It's a realistic approach since virtually no business can migrate everything overnight.

**In technical terms:** The hybrid cloud model assumes organizations will indefinitely maintain some workloads outside the cloud. Organizations may believe they've achieved operational excellence in certain areas and migrate only specific workloads where they see immediate cloud benefits.

**Why it matters:** A well-designed hybrid cloud minimizes data egress costs by flowing data primarily in one direction - from on-premises to cloud.

<DiagramContainer title="Hybrid Cloud Data Flow (Minimizing Egress Costs)">
  <Row gap="md">
    <Column gap="sm">
      <Box color={colors.blue} icon="🏢">On-Premises Applications</Box>
      <Box color={colors.slate} variant="subtle" size="sm">Production systems, databases</Box>
    </Column>
    <Arrow direction="right" label="Event data (free/cheap)" />
    <Column gap="sm">
      <Box color={colors.green} icon="☁️">Cloud Analytics</Box>
      <Box color={colors.slate} variant="subtle" size="sm">Bulk of data remains here</Box>
      <Box color={colors.purple} variant="outlined" size="sm">Ephemeral Spark clusters</Box>
      <Box color={colors.purple} variant="outlined" size="sm">Data warehouse</Box>
      <Box color={colors.purple} variant="outlined" size="sm">ML training</Box>
    </Column>
    <Arrow direction="left" label="Small amounts back (models, reverse ETL)" />
  </Row>
</DiagramContainer>

**Beautiful Pattern:**
- On-premises applications generate event data
- Push to cloud essentially for free (ingress)
- Bulk of data remains in cloud where it's analyzed
- Smaller amounts pushed back to on-premises (deploying models, reverse ETL)

### 4.4. Multicloud

**In plain English:** Multicloud means deploying workloads across multiple public clouds. You might use Google Cloud for Google Ads data, Azure for Microsoft workloads, and AWS for best-in-class services. Sounds great but introduces significant complexity.

**In technical terms:** Companies may pursue multicloud to offer services close to customer workloads (Snowflake, Databricks strategy) or to take advantage of best services across clouds. Each cloud has best-in-class offerings in different areas.

**Why it matters:** Multicloud has compelling advantages but serious disadvantages including data egress costs, networking bottlenecks, complexity, integration challenges, and diabolically complicated networking.

<CardGrid
  columns={2}
  cards={[
    {
      title: "Multicloud Motivations",
      icon: "✅",
      color: colors.blue,
      items: [
        "Serve near customer cloud workloads",
        "Best-of-breed services across clouds",
        "AWS Lambda + GKE + Azure for Microsoft",
        "Reduce single-vendor lock-in"
      ]
    },
    {
      title: "Multicloud Challenges",
      icon: "⚠️",
      color: colors.red,
      items: [
        "Data egress costs are critical",
        "Networking bottlenecks",
        "Significant complexity increase",
        "Cross-cloud integration and security"
      ]
    }
  ]}
/>

#### Cloud of Clouds

**Emerging trend:** New services aim to facilitate multicloud with reduced complexity:
- **Snowflake**: Same interface across GCP, AWS, Azure with simple data replication
- **Databricks**: Unified analytics platform across multiple clouds
- **Multi-cloud data replication**: Seamless data movement between clouds
- **Single pane of glass management**: Manage workloads across clouds from one interface

### 4.5. Our Advice on Location

<ProcessFlow
  direction="vertical"
  steps={[
    {
      title: "Choose for the Present",
      description: "Best technologies for current needs and near future",
      icon: "📍",
      color: colors.blue
    },
    {
      title: "Avoid Analysis Paralysis",
      description: "Don't try to plan for every possible future",
      icon: "🚫",
      color: colors.red
    },
    {
      title: "Default to Single Cloud",
      description: "Unless compelling reasons for multicloud/hybrid",
      icon: "☁️",
      color: colors.green
    },
    {
      title: "Have an Escape Plan",
      description: "Ideally locked behind glass, but be prepared",
      icon: "🚪",
      color: colors.orange
    }
  ]}
/>

**Don't choose complex multicloud/hybrid unless:**
- You need to serve data near customers on multiple clouds
- Industry regulations require certain data in your data centers
- You have compelling technology needs for specific services on different clouds

**Otherwise:** Choose a single-cloud deployment strategy for simplicity and integration.

#### Cloud Repatriation: You Are Not Dropbox

**In plain English:** Some companies have successfully moved workloads back from cloud to on-premises (Dropbox, Cloudflare). But these are exceptional cases at extraordinary scale - you're probably not one of them.

**In technical terms:** Dropbox stores many exabytes of data, handles hundreds of gigabits of internet connectivity, and built a highly specialized storage product combining object and block storage characteristics. This is cloud scale.

**Why it matters:** Don't rely excessively on Dropbox's example. Consider on-premises or repatriation only if you're at true cloud scale.

<DiagramContainer title="When to Consider Repatriation">
  <Column gap="md">
    <Box color={colors.green} variant="filled">
      You Might Be at Cloud Scale If...
    </Box>
    <Row gap="sm">
      <Box color={colors.blue} variant="outlined">Storing exabytes of data</Box>
      <Box color={colors.blue} variant="outlined">Handling terabits/sec of traffic</Box>
      <Box color={colors.blue} variant="outlined">Data egress costs are major factor</Box>
    </Row>
    <Box color={colors.orange} variant="subtle">
      Examples: Dropbox, Cloudflare, Backblaze, Netflix CDN (not full stack)
    </Box>
    <Box color={colors.red} variant="filled">
      Otherwise: Stay in the cloud
    </Box>
  </Column>
</DiagramContainer>

---

## 5. Build Versus Buy

**In plain English:** Should you build it yourself or buy/use existing solutions? It's like asking whether you should manufacture your own car tires or buy them. Unless tire manufacturing is your competitive advantage, buy the tires.

**In technical terms:** Build versus buy comes down to resource constraints, expertise, TCO, TOCO, and whether the solution provides a competitive advantage to your organization.

**Why it matters:** Given the number of open source and paid services with communities of volunteers or highly paid teams of amazing engineers, you're foolish to build everything yourself. Invest in building only where it provides competitive advantage.

> **"When you need new tires for your car, do you get the raw materials, create the tires from scratch, and install them yourself?"**

<ComparisonTable
  beforeTitle="Build"
  afterTitle="Buy"
  beforeColor={colors.orange}
  afterColor={colors.green}
  items={[
    {
      label: "Control",
      before: "End-to-end control over solution",
      after: "Rely on vendor or OSS community"
    },
    {
      label: "Resources",
      before: "Requires significant time and expertise",
      after: "Leverage existing expertise"
    },
    {
      label: "When to Choose",
      before: "Competitive advantage for your business",
      after: "Solved problem, stand on shoulders of giants"
    },
    {
      label: "Risk",
      before: "May build worse than available solutions",
      after: "Vendor/project viability, lock-in"
    }
  ]}
/>

**Key Principle:** Lean toward type A behavior:
- Avoid undifferentiated heavy lifting
- Embrace abstraction
- Use open source frameworks
- Look at buying managed or proprietary solutions
- Focus custom work on areas providing solid competitive advantage

### 5.1. Open Source Software

**In plain English:** Open source software (OSS) is software where the code is publicly available for general use, typically under specific licensing terms. It ranges from community-run passion projects to commercially backed ventures.

**In technical terms:** OSS is a software distribution model where software and underlying codebase are made available for general use. Often created and maintained by distributed teams of collaborators. Usually free to use, change, and distribute, but with specific caveats.

**Why it matters:** OSS offers two main flavors - community managed and commercial OSS (COSS) - each with different considerations for adoption and support.

#### Community-Managed OSS

<CardGrid
  columns={3}
  cards={[
    {
      title: "Mindshare & Maturity",
      icon: "⭐",
      color: colors.blue,
      items: [
        "GitHub stars, forks, commit volume",
        "How long has project been around?",
        "Active in production?",
        "Strong community creates virtuous cycle"
      ]
    },
    {
      title: "Support & Management",
      icon: "🛠️",
      color: colors.purple,
      items: [
        "Community help vs. on your own",
        "Git issues addressed quickly?",
        "Company sponsoring project?",
        "Developer relations and community"
      ]
    },
    {
      title: "Viability & Roadmap",
      icon: "🗺️",
      color: colors.green,
      items: [
        "Clear, transparent roadmap?",
        "Accepts pull requests?",
        "Resources to self-host and maintain?",
        "Consider giving back to community"
      ]
    }
  ]}
/>

**Key Questions:**
- **Troubleshooting:** Are you on your own, or can community help?
- **Team:** Who are core contributors? Company sponsor?
- **Self-hosting:** Do you have resources to host and maintain?
- **Giving back:** If you use it actively, consider contributing code, fixing issues, donations

#### Commercial OSS (COSS)

**In plain English:** Commercial OSS solves the management headache of self-hosting. Vendors host and manage the OSS solution for you, typically as cloud SaaS, while offering the "core" OSS for free and charging for enhancements or managed services.

**In technical terms:** Vendors offer curated distributions, managed services, or premium features built around popular OSS projects. Often affiliated with the community OSS project (maintainers create separate business after OSS becomes popular).

**Why it matters:** You can continue using community OSS and maintain it yourself, or pay the vendor to take care of administrative management (updates, server maintenance, bug fixes).

**Examples:**
- Databricks (Spark)
- Confluent (Kafka)
- DBT Labs (dbt)

<CardGrid
  columns={2}
  cards={[
    {
      title: "Value & Delivery",
      icon: "💎",
      color: colors.blue,
      items: [
        "Better value than self-managed?",
        "Additional features vs. community version?",
        "How do you access (download, API, UI)?",
        "Easy access to releases?"
      ]
    },
    {
      title: "Business Viability",
      icon: "📊",
      color: colors.purple,
      items: [
        "Company finances and runway",
        "Logos vs. revenue focus",
        "Sales cycle and pricing transparency",
        "Community support commitment"
      ]
    }
  ]}
/>

**Critical Questions:**
- **Support:** What's covered? Extra cost? Opaque to buyer?
- **Releases:** Transparent schedule, improvements, bug fixes?
- **Pricing:** Understandable? On-demand vs. contract trade-offs?
- **Community:** Is company truly supporting community OSS?

### 5.2. Proprietary Walled Gardens

While OSS is ubiquitous, a big market exists for non-OSS technologies. Let's look at independent companies and cloud-platform offerings.

#### Independent Proprietary Offerings

**In plain English:** Many data companies sell closed-source proprietary solutions rather than releasing as OSS. While you won't have code transparency, proprietary solutions can work quite well, especially as fully managed cloud services.

**In technical terms:** Independent data tool vendors offer proprietary solutions, often backed by VC funding. They scale with great engineering, sales, and marketing teams but create endless sales and marketing clutter for buyers.

**Why it matters:** Although you lose transparency of pure OSS, you gain professional support, clear roadmaps, and potentially better integration.

<CardGrid
  columns={2}
  cards={[
    {
      title: "Product Evaluation",
      icon: "🔍",
      color: colors.blue,
      items: [
        "Interoperability with other tools",
        "Mindshare and market share",
        "Documentation and support quality",
        "Try before you buy"
      ]
    },
    {
      title: "Business Evaluation",
      icon: "💼",
      color: colors.purple,
      items: [
        "Pricing clarity and scenarios",
        "Company longevity and funding",
        "Customer reviews and experiences",
        "Contract negotiation flexibility"
      ]
    }
  ]}
/>

#### Cloud Platform Proprietary Services

**In plain English:** Cloud vendors (AWS, Azure, GCP) develop and sell their proprietary services for storage, databases, and more. Many are internal tools used by sibling companies (Amazon created DynamoDB for Amazon.com, then offered it on AWS).

**In technical terms:** Cloud vendors bundle products to work well together, creating stickiness with user base through strong integrated ecosystems. Often these are battle-tested internal tools made available as managed services.

**Why it matters:** Cloud offerings may provide better integration within their ecosystem but come with vendor lock-in considerations.

<CardGrid
  columns={2}
  cards={[
    {
      title: "Performance & Cost",
      icon: "⚡",
      color: colors.green,
      items: [
        "Substantially better than independent/OSS?",
        "What's the TCO?",
        "On-demand vs. reserved capacity pricing",
        "Long-term commitment discounts"
      ]
    },
    {
      title: "Integration & Lock-in",
      icon: "🔗",
      color: colors.orange,
      items: [
        "Works seamlessly with other cloud services",
        "Creates ecosystem stickiness",
        "Data egress costs if you leave",
        "Proprietary APIs and features"
      ]
    }
  ]}
/>

#### Our Build vs. Buy Advice

**Key Principles:**
- **Favor OSS and COSS by default** - frees you to focus on areas where these options are insufficient
- **Focus on competitive advantage** - build only where it provides significant value or reduces friction substantially
- **Don't treat internal ops as sunk cost** - value upskilling team on managed platforms vs. babysitting on-premises servers
- **Understand how companies make money** - sales and customer experience teams indicate how you'll be treated
- **Know your budget process** - who controls it? What gets approved? Don't let choices die in limbo

---

## 6. Architectural Patterns

### 6.1. Monolith Versus Modular

**In plain English:** Monoliths put everything in one place - simple to reason about but brittle and hard to change. Modular systems break things into self-contained pieces that communicate via APIs - more complex to understand but flexible and swappable.

**In technical terms:** Monolithic systems are self-contained, often performing multiple functions under a single system. The modular camp leans toward decoupled, best-of-breed technologies performing tasks at which they're uniquely great.

**Why it matters:** Given the rate of change in data tools, interoperability among an ever-changing array of solutions is increasingly valuable.

<ComparisonTable
  beforeTitle="Monolith"
  afterTitle="Modular"
  beforeColor={colors.orange}
  afterColor={colors.green}
  items={[
    {
      label: "Complexity",
      before: "Easy to reason about, one technology",
      after: "More to understand, multiple systems"
    },
    {
      label: "Flexibility",
      before: "Difficult to change components",
      after: "Swappable, polyglot possible"
    },
    {
      label: "Updates",
      before: "Slow releases, 'kitchen sink' updates",
      after: "Independent component updates"
    },
    {
      label: "Failures",
      before: "Single bug can harm entire system",
      after: "Isolated failures, better resilience"
    },
    {
      label: "Multitenancy",
      before: "Difficult to isolate workloads",
      after: "Better isolation between tenants"
    }
  ]}
/>

#### Monolith Characteristics

<DiagramContainer title="Monolithic Architecture">
  <Column gap="sm" align="center">
    <Box color={colors.red} variant="filled" size="lg" icon="📦">
      Monolithic System
    </Box>
    <Row gap="xs">
      <Box color={colors.red} variant="outlined" size="sm">Database</Box>
      <Box color={colors.red} variant="outlined" size="sm">Application</Box>
      <Box color={colors.red} variant="outlined" size="sm">Business Logic</Box>
      <Box color={colors.red} variant="outlined" size="sm">ETL</Box>
    </Row>
    <Box color={colors.orange} variant="subtle">
      Everything tightly coupled - one technology, one programming language
    </Box>
  </Column>
</DiagramContainer>

**Examples:** Informatica, Spark (as monolithic framework)

**Pros:**
- Easy to reason about, lower cognitive burden
- Less context switching - everything self-contained
- Simplicity in reasoning about architecture

**Cons:**
- Brittle - bugs can harm entire system
- Updates and releases take longer
- Multitenancy challenges (resource contention, dependency conflicts)
- Painful to switch if vendor/project dies

#### Modular Characteristics

<DiagramContainer title="Modular Architecture">
  <Row gap="md">
    <Column gap="sm">
      <Box color={colors.green} variant="outlined" icon="🔷">Service A (Python)</Box>
      <Box color={colors.slate} variant="subtle" size="sm">Ingestion</Box>
    </Column>
    <Arrow direction="right" label="API" />
    <Column gap="sm">
      <Box color={colors.blue} variant="outlined" icon="🔷">Service B (Java)</Box>
      <Box color={colors.slate} variant="subtle" size="sm">Processing</Box>
    </Column>
    <Arrow direction="right" label="API" />
    <Column gap="sm">
      <Box color={colors.purple} variant="outlined" icon="🔷">Service C (Go)</Box>
      <Box color={colors.slate} variant="subtle" size="sm">Serving</Box>
    </Column>
  </Row>
  <Box color={colors.green} variant="subtle">
    Each service decoupled, communicates via APIs, can be swapped independently
  </Box>
</DiagramContainer>

**Key Pattern:** Data stored in object storage in standard format (Parquet) - any tool supporting the format can read/write

**Pros:**
- Swappable components as technology changes
- Polyglot (multiple programming languages)
- Best technology for each job
- Independent updates and scaling

**Cons:**
- More systems to understand and operate
- Interoperability potential headaches
- Orchestration becomes critical glue

> **Insight**
>
> **Bezos API Mandate:** All teams expose data/functionality through service interfaces. Teams communicate ONLY through these interfaces. No direct linking, no direct data store reads, no shared memory. All service interfaces must be designed to be externalizable.

#### The Distributed Monolith Pattern (Avoid This)

**In plain English:** A distributed monolith is the worst of both worlds - distributed complexity with monolithic limitations. Multiple services share common dependencies or codebase, creating conflicts and brittleness.

**In technical terms:** One runs a distributed system with different services, but services and nodes share a common set of dependencies or common codebase.

**Why it matters:** This pattern creates major challenges - forcing jobs to upgrade dependencies risks breaking them; maintaining multiple versions entails extra complexity.

**Example:** Traditional Hadoop cluster - simultaneously hosts Hive, Pig, Spark but has one version of each component installed. Managing upgrades is a significant challenge.

<DiagramContainer title="Distributed Monolith Problem">
  <Column gap="md">
    <Box color={colors.red} variant="filled">
      Distributed Monolith (Hadoop Cluster)
    </Box>
    <Row gap="sm">
      <Box color={colors.orange} variant="outlined">Hive</Box>
      <Box color={colors.orange} variant="outlined">Pig</Box>
      <Box color={colors.orange} variant="outlined">Spark</Box>
    </Row>
    <Box color={colors.red} variant="outlined">
      Shared Dependencies: Hadoop common, HDFS, YARN, Java (one version)
    </Box>
    <Box color={colors.orange} variant="subtle">
      Dependency conflicts, difficult upgrades, job breaking risks
    </Box>
  </Column>
</DiagramContainer>

**Solutions:**
- **Ephemeral infrastructure** - Each job gets own temporary cluster with dependencies
- **Containers** - Properly decompose into multiple software environments with isolated dependencies

#### Our Advice on Monolith vs. Modular

**While monoliths are attractive for ease of understanding and reduced complexity, this comes at high cost:**
- Potential loss of flexibility
- High opportunity cost
- High-friction development cycles

<CardGrid
  columns={3}
  cards={[
    {
      title: "Interoperability",
      icon: "🔗",
      color: colors.blue,
      items: [
        "Architect for sharing",
        "Design for interoperability",
        "Standard formats",
        "Clear interfaces"
      ]
    },
    {
      title: "Avoid Bear Traps",
      icon: "🪤",
      color: colors.red,
      items: [
        "Easy to get into",
        "Painful/impossible to escape",
        "Assess exit strategy",
        "Evaluate lock-in"
      ]
    },
    {
      title: "Maintain Flexibility",
      icon: "🔄",
      color: colors.green,
      items: [
        "Data space moving fast",
        "Committing to monolith reduces options",
        "Limits reversible decisions",
        "Prefer modular when possible"
      ]
    }
  ]}
/>

### 6.2. Serverless Versus Servers

**In plain English:** Serverless lets you run code without managing servers behind the scenes - quick time to value for the right use cases. Servers give you more control and can be cheaper at scale.

**In technical terms:** Serverless allows developers and data engineers to run applications without managing infrastructure. For other cases, traditional servers (potentially in containers with orchestration) may be better fits.

**Why it matters:** Understanding when serverless makes sense vs. when servers are better can dramatically impact cost, performance, and operational overhead.

#### Serverless

<DiagramContainer title="Serverless Characteristics">
  <Column gap="md">
    <Box color={colors.green} variant="filled" icon="⚡">
      Serverless
    </Box>
    <Row gap="sm">
      <Box color={colors.blue} variant="outlined">Pay per execution</Box>
      <Box color={colors.blue} variant="outlined">Autoscaling (to zero)</Box>
      <Box color={colors.blue} variant="outlined">No server management</Box>
    </Row>
    <Box color={colors.green} variant="subtle">
      AWS Lambda kicked off trend in 2014 - execute code on as-needed basis
    </Box>
  </Column>
</DiagramContainer>

**Serverless Flavors:**
- **Function as a Service (FaaS)** - AWS Lambda, Google Cloud Functions
- **Serverless data warehouses** - BigQuery (don't manage backend, scales to zero)
- **Containerized functions** - Ephemeral units triggered by events

**When Serverless Makes Sense:**
- Simple, discrete tasks
- Infrequent execution
- Variable workload (autoscaling benefit)
- Quick time to value

**When Serverless Gets Expensive:**
- High event rates (one event per function call)
- Long-running processes
- Overhead inefficiency at scale

> **Insight**
>
> Monitor to determine cost per event in real-world environment and model overall costs as event rates grow. Include worst-case scenarios - what happens if your site gets hit by a bot swarm or DDoS attack?

#### Containers

**In plain English:** Containers are lightweight virtual machines. They package isolated user space (filesystem, processes) - many containers can coexist on single host OS without overhead of entire operating system kernel.

**In technical terms:** Whereas traditional VM wraps entire operating system, container packages isolated user space. Single hardware node can host numerous containers with fine-grained resource allocations.

**Why it matters:** Containers provide principal benefits of virtualization (dependency and code isolation) without overhead. They're critical for microservices, serverless environments, and solving distributed monolith problems.

<StackDiagram
  title="VMs vs. Containers"
  layers={[
    {
      label: "Traditional VMs",
      color: colors.orange,
      items: [
        "Each VM contains entire operating system",
        "Significant overhead",
        "Better security isolation"
      ]
    },
    {
      label: "Containers",
      color: colors.green,
      items: [
        "Share host OS kernel",
        "Isolated user space per container",
        "Lightweight, many per host",
        "Kubernetes for orchestration"
      ]
    }
  ]}
/>

:::warning
**Container Security Consideration**

Container clusters do not provide the same security and isolation that full VMs offer. Container escape is common enough to be considered a risk for multitenancy. Kubernetes clusters should host code only within environment of mutual trust (inside single company walls).
:::

**Container Solutions:**
- Hadoop now supports containers (isolated dependencies per job)
- Kubernetes (container management system)
- Managed container services (AWS Fargate, Google App Engine)

#### How to Evaluate Server vs. Serverless

<ComparisonTable
  beforeTitle="When to Use Serverless"
  afterTitle="When to Use Servers"
  beforeColor={colors.green}
  afterColor={colors.blue}
  items={[
    {
      label: "Use Case",
      before: "Simple, discrete tasks",
      after: "Complex, heavy-duty workloads"
    },
    {
      label: "Execution",
      before: "Infrequent or variable workload",
      after: "High frequency, long duration"
    },
    {
      label: "Cost",
      before: "Low usage, pay per execution",
      after: "Usage exceeds server maintenance cost"
    },
    {
      label: "Control",
      before: "Limited customization needed",
      after: "Need power, customization, control"
    },
    {
      label: "Complexity",
      before: "Quick time to value, minimal ops",
      after: "Willing to manage infrastructure"
    }
  ]}
/>

**Server Best Practices (Cloud Environment):**

<CardGrid
  columns={2}
  cards={[
    {
      title: "Treat as Ephemeral",
      icon: "🔄",
      color: colors.blue,
      items: [
        "Expect servers to fail",
        "Avoid 'special snowflake' servers",
        "Create as needed, then delete",
        "Use boot scripts or images",
        "Deploy code through CI/CD"
      ]
    },
    {
      title: "Automation & Orchestration",
      icon: "🤖",
      color: colors.purple,
      items: [
        "Use clusters and autoscaling",
        "Infrastructure as code (Terraform, CloudFormation)",
        "Containers for complex dependencies",
        "Kubernetes for orchestration"
      ]
    }
  ]}
/>

#### Our Advice on Serverless vs. Servers

<ProcessFlow
  direction="vertical"
  steps={[
    {
      title: "Evaluate Workload",
      description: "Size, complexity, frequency, duration",
      icon: "📊",
      color: colors.blue
    },
    {
      title: "Try Serverless First",
      description: "Abstraction tends to win",
      icon: "⚡",
      color: colors.green
    },
    {
      title: "Move to Servers When Outgrown",
      description: "With containers and orchestration if possible",
      icon: "🖥️",
      color: colors.purple
    },
    {
      title: "Monitor and Model Costs",
      description: "Continuously evaluate as scale changes",
      icon: "💰",
      color: colors.orange
    }
  ]}
/>

**Key Considerations:**
- **Workload size and complexity** - Serverless best for simple, discrete tasks
- **Execution frequency and duration** - Platforms have limits on frequency, concurrency, duration
- **Requests and networking** - Serverless often uses simplified networking
- **Language** - Is your language officially supported?
- **Runtime limitations** - No complete OS abstractions
- **Cost** - Incredibly convenient but potentially expensive at high event counts

---

## 7. Optimization and Performance

**In plain English:** Benchmarks are like comparing a private jet to an electric sports car and asking which has better performance. The question is nonsensical - they're optimized for completely different use cases. Database benchmarks suffer from the same problem.

**In technical terms:** We see apples-to-oranges comparisons constantly in the database space. Benchmarks either compare databases optimized for completely different use cases or use test scenarios bearing no resemblance to real-world needs.

**Why it matters:** Recently we saw a new round of benchmark wars flare up among major vendors. While we applaud benchmarks and vendors dropping DeWitt clauses (prohibiting publishing benchmarks), let the buyer beware - the data space is full of nonsensical benchmarks.

### Common Benchmark Tricks

<CardGrid
  columns={3}
  cards={[
    {
      title: "Big Data...for the 1990s",
      icon: "📱",
      color: colors.red,
      items: [
        "Claims of petabyte scale",
        "Test datasets fit on smartphone",
        "Caching layers hide reality",
        "Data fully in SSD or memory",
        "Minimize RAM/SSD costs"
      ]
    },
    {
      title: "Nonsensical Cost Comparisons",
      icon: "💸",
      color: colors.orange,
      items: [
        "MPP systems run for years",
        "Dynamic systems charge per query",
        "Compare ephemeral vs. non-ephemeral",
        "Cost-per-second comparison nonsensical",
        "See this all the time"
      ]
    },
    {
      title: "Asymmetric Optimization",
      icon: "⚖️",
      color: colors.purple,
      items: [
        "Row-based vs. columnar databases",
        "Normalized data favors row-based",
        "Extra optimization on one side only",
        "Preindexing joins vs. no tuning",
        "Unfair comparisons"
      ]
    }
  ]}
/>

### Caveat Emptor

**In plain English:** As with all things in data technology, let the buyer beware. Do your homework before blindly relying on vendor benchmarks to evaluate and choose technology.

**Key Questions to Ask:**
- Does the benchmark use realistic data sizes for your use case?
- Are test scenarios representative of your real-world queries?
- Are both systems optimized equally?
- Are cost comparisons apples-to-apples?
- What are they not showing you?

> **Insight**
>
> **To benchmark for real-world use cases:** You must simulate anticipated real-world data and query size. Evaluate query performance and resource costs based on detailed evaluation of YOUR needs, not vendor-provided scenarios.

---

## 8. Undercurrents and Technology Choice

As a data engineer, you have a lot to consider when evaluating technologies. Whatever technology you choose, be sure to understand how it supports the undercurrents of the data engineering lifecycle.

### Data Management

**In plain English:** Data management best practices - regulatory compliance, security, privacy, data quality, governance - aren't always apparent in a technology. You need to ask vendors and OSS projects directly about their practices.

**In technical terms:** Behind the scenes, a third-party vendor may use data management best practices but hide these details behind a limited UI layer. During evaluation, ask companies about their data management practices.

**Why it matters:** These same questions should apply to OSS solutions you're considering.

<CardGrid
  columns={2}
  cards={[
    {
      title: "Security & Privacy Questions",
      icon: "🔒",
      color: colors.blue,
      items: [
        "How are you protecting data against breaches?",
        "What's your GDPR, CCPA compliance?",
        "Do you allow me to host data for compliance?",
        "What data residency options exist?"
      ]
    },
    {
      title: "Quality & Governance Questions",
      icon: "✅",
      color: colors.purple,
      items: [
        "How do you ensure data quality?",
        "How do I know I'm viewing correct data?",
        "What lineage and cataloging exists?",
        "What audit trails are available?"
      ]
    }
  ]}
/>

### DataOps

**In plain English:** Problems will happen - servers die, regions have outages, buggy code gets deployed, bad data enters your warehouse. When evaluating technology, understand how you'll deploy, monitor, alert, and respond.

**In technical terms:** The answer depends on the type of technology. If OSS, you're responsible for monitoring, hosting, code deployment, and incident response. With managed offerings, much is outside your control - consider vendor SLA, alerting, transparency, and ETAs.

**Why it matters:** Understanding operational control and responsibilities prevents nasty surprises during incidents.

### Data Architecture

**In plain English:** Good data architecture means assessing trade-offs, choosing best tools for the job, and keeping decisions reversible. With the data landscape morphing at warp speed, the best tool is a moving target.

**In technical terms:** The main goals are avoiding unnecessary lock-in, ensuring interoperability across the data stack, and producing high ROI. Choose technologies accordingly.

**Why it matters:** As discussed in Chapter 3, flexible and reversible decisions are core to good architecture. Technology choices should support these principles.

### Orchestration Example: Airflow

**In plain English:** We've actively avoided discussing specific technologies too extensively, but make an exception for orchestration because one open source technology currently dominates: Apache Airflow.

**In technical terms:** Maxime Beauchemin kicked off the Airflow project at Airbnb in 2014. It quickly grew significant mindshare, becoming an Apache Incubator project in 2016 and full Apache-sponsored project in 2019.

**Why it matters:** Understanding Airflow's advantages and limitations helps you make informed orchestration decisions.

<ComparisonTable
  beforeTitle="Airflow Advantages"
  afterTitle="Airflow Limitations"
  beforeColor={colors.green}
  afterColor={colors.orange}
  items={[
    {
      label: "Open Source",
      before: "Extremely active project, high commit rate",
      after: "Non-scalable core components (scheduler, DB)"
    },
    {
      label: "Community",
      before: "Massive mindshare, vibrant community",
      after: "Distributed monolith pattern"
    },
    {
      label: "Availability",
      before: "Managed services (GCP, AWS, Astronomer)",
      after: "Lacks data-native constructs (schema, lineage)"
    },
    {
      label: "Maturity",
      before: "Airflow 2 major refactor released",
      after: "Challenging to develop and test workflows"
    }
  ]}
/>

**Airflow Alternatives to Watch:**
- **Prefect** - Aims to solve Airflow problems by rethinking components
- **Dagster** - Different architectural approach
- **Other frameworks** - Expect new developments in this space

> **Insight**
>
> We highly recommend anyone choosing orchestration technology study the options discussed here and stay aware of activity in the space. New developments will certainly occur by the time you read this.

### Software Engineering

**In plain English:** As a data engineer, strive for simplification and abstraction. Buy or use prebuilt open source solutions whenever possible. Eliminating undifferentiated heavy lifting should be your big goal.

**In technical terms:** Focus resources - custom coding and tooling - on areas that give you solid competitive advantage. For example, is hand-coding a database connection to your cloud data warehouse a competitive advantage? Probably not. This is a solved problem.

**Why it matters:** The world doesn't need the millionth +1 database-to-cloud connector. Focus on what makes your business special.

<DiagramContainer title="Where to Focus Engineering Effort">
  <Row gap="lg">
    <Column gap="sm" align="center">
      <Box color={colors.red} icon="🚫">Don't Build</Box>
      <Box color={colors.slate} variant="subtle">Solved Problems</Box>
      <Column gap="xs">
        <Box color={colors.red} variant="outlined" size="sm">Database connectors</Box>
        <Box color={colors.red} variant="outlined" size="sm">Standard ETL patterns</Box>
        <Box color={colors.red} variant="outlined" size="sm">Common workflows</Box>
      </Column>
      <Box color={colors.blue} variant="subtle">Use off-the-shelf solutions</Box>
    </Column>
    <Column gap="sm" align="center">
      <Box color={colors.green} icon="✅">Do Build</Box>
      <Box color={colors.slate} variant="subtle">Competitive Advantage</Box>
      <Column gap="xs">
        <Box color={colors.green} variant="outlined" size="sm">Special algorithms</Box>
        <Box color={colors.green} variant="outlined" size="sm">Unique business logic</Box>
        <Box color={colors.green} variant="outlined" size="sm">Proprietary processes</Box>
      </Column>
      <Box color={colors.purple} variant="subtle">What makes you special</Box>
    </Column>
  </Row>
</DiagramContainer>

**Key Question:** Why do customers buy from you? Your business likely has something special. By abstracting away redundant workflows and processes, you can continue chipping away, refining, and customizing the things that move the needle for the business.

---

## 9. Conclusion

**In plain English:** Choosing the right technologies is no easy task, especially when new technologies and patterns emerge daily. Today is possibly the most confusing time in history for evaluating and selecting technologies.

**In technical terms:** Choosing technologies is a balance of use case, cost, build versus buy, and modularization. Always approach technology the same way as architecture: assess trade-offs and aim for reversible decisions.

**Why it matters:** Getting technology choices right accelerates your data engineering lifecycle. Getting them wrong creates technical debt, cost overruns, and limits your ability to adapt to changing business needs.

### Key Takeaways

<CardGrid
  columns={3}
  cards={[
    {
      title: "Foundation First",
      icon: "📐",
      color: colors.blue,
      items: [
        "Architecture first, technology second",
        "What, why, when before how",
        "Avoid Dr. Seuss fantasy machines",
        "Strategic before tactical"
      ]
    },
    {
      title: "Team & Speed",
      icon: "🚀",
      color: colors.purple,
      items: [
        "Match complexity to team capabilities",
        "Speed to market wins",
        "Deliver value early and often",
        "Avoid cargo-cult engineering"
      ]
    },
    {
      title: "Cost & Value",
      icon: "💰",
      color: colors.green,
      items: [
        "Understand TCO and TOCO",
        "OpEx-first approach",
        "Embrace FinOps",
        "Maximize business value"
      ]
    },
    {
      title: "Immutables & Transitory",
      icon: "⏳",
      color: colors.orange,
      items: [
        "Build on immutable foundation",
        "Evaluate tools every 2 years",
        "Avoid bear traps",
        "Plan for change"
      ]
    },
    {
      title: "Location Strategy",
      icon: "☁️",
      color: colors.blue,
      items: [
        "Cloud-native architecture",
        "Default to single cloud",
        "Hybrid for specific use cases",
        "Have escape plan"
      ]
    },
    {
      title: "Build vs. Buy",
      icon: "🛒",
      color: colors.purple,
      items: [
        "Buy when not competitive advantage",
        "Favor OSS and COSS",
        "Avoid undifferentiated heavy lifting",
        "Focus on what makes you special"
      ]
    },
    {
      title: "Modular & Flexible",
      icon: "🧩",
      color: colors.green,
      items: [
        "Prefer modular over monolithic",
        "Design for interoperability",
        "Avoid distributed monoliths",
        "Keep decisions reversible"
      ]
    },
    {
      title: "Serverless First",
      icon: "⚡",
      color: colors.orange,
      items: [
        "Abstraction tends to win",
        "Try serverless first",
        "Servers when outgrown",
        "Monitor and model costs"
      ]
    },
    {
      title: "Benchmark Skepticism",
      icon: "🔍",
      color: colors.red,
      items: [
        "Let the buyer beware",
        "Do your homework",
        "Simulate your use cases",
        "Question nonsensical comparisons"
      ]
    }
  ]}
/>

> **Insight**
>
> Remember: **Architecture is the what, why, and when. Tools are the how.** Get your architecture right before choosing specific technologies. Always assess trade-offs and aim for reversible decisions.

---

**Previous:** [Chapter 3: Designing Good Data Architecture](./chapter3) | **Next:** [Chapter 5: Data Generation in Source Systems](./chapter5)
