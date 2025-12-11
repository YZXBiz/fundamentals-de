---
sidebar_position: 12
title: "Chapter 11: The Future of Data Engineering"
description: "Explore the future of data engineering including the live data stack, streaming pipelines, real-time analytical databases, and the evolution from modern to live data architectures"
---

import {
  Box, Arrow, Row, Column, Group,
  DiagramContainer, ProcessFlow, TreeDiagram,
  CardGrid, StackDiagram, ComparisonTable,
  colors
} from '@site/src/components/diagrams';

# Chapter 11: The Future of Data Engineering

> **"The data engineering lifecycle isn't going away, but it will evolve significantly as simplification moves up the stack and real-time becomes the norm."**
>
> — The Evolution of Data Engineering

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [The Data Engineering Lifecycle Isn't Going Away](#2-the-data-engineering-lifecycle-isnt-going-away)
3. [The Decline of Complexity and the Rise of Easy-to-Use Data Tools](#3-the-decline-of-complexity-and-the-rise-of-easy-to-use-data-tools)
4. [The Cloud-Scale Data OS and Improved Interoperability](#4-the-cloud-scale-data-os-and-improved-interoperability)
   - 4.1. [Enhanced Abstraction](#41-enhanced-abstraction)
   - 4.2. [Evolution of Data Engineers](#42-evolution-of-data-engineers)
5. ["Enterprisey" Data Engineering](#5-enterprisey-data-engineering)
6. [Titles and Responsibilities Will Morph](#6-titles-and-responsibilities-will-morph)
7. [Moving Beyond the Modern Data Stack](#7-moving-beyond-the-modern-data-stack)
   - 7.1. [The Live Data Stack](#71-the-live-data-stack)
   - 7.2. [Streaming Pipelines and Real-Time Analytical Databases](#72-streaming-pipelines-and-real-time-analytical-databases)
   - 7.3. [The Fusion of Data with Applications](#73-the-fusion-of-data-with-applications)
   - 7.4. [The Tight Feedback Between Applications and ML](#74-the-tight-feedback-between-applications-and-ml)
8. [Dark Matter Data and the Rise of Spreadsheets](#8-dark-matter-data-and-the-rise-of-spreadsheets)
9. [Conclusion](#9-conclusion)

---

## 1. Introduction

**In plain English:** Data engineering is evolving at warp speed, but beneath all the noise and rapid changes, certain fundamental patterns and principles will remain relevant for years to come—particularly the data engineering lifecycle and its undercurrents.

**In technical terms:** This book focuses on big ideas that transcend specific technologies or implementations—the continuum of the data engineering lifecycle and its undercurrents. While the order of operations and names of technologies will change, the primary stages of the lifecycle will remain intact.

**Why it matters:** Understanding which aspects of data engineering are permanent versus temporary helps you invest your learning time wisely and build systems that won't immediately become obsolete. The field is maturing rapidly, with data engineering emerging as one of the fastest-growing careers in technology.

### The Challenge of Rapid Change

This book grew out of the recognition that warp speed changes in the field have created a significant knowledge gap for:
- Existing data engineers
- People interested in moving into data engineering careers
- Technology managers and executives

> **Insight**
>
> Several years ago, data engineering didn't even exist as a field or job title. The primary challenge in writing this book was sifting through the noise and finding the signal of what's unlikely to change.

### What You've Learned

Throughout this book, you've learned about:
- The fundamentals of the data engineering lifecycle
- Key undercurrents affecting data systems
- Technologies and best practices
- Architecture patterns and security principles

Now, the question becomes: **What's next?**

---

## 2. The Data Engineering Lifecycle Isn't Going Away

**In plain English:** While data science gets most of the attention, data engineering is the foundation that makes everything else possible—and it's not going anywhere.

**In technical terms:** Data engineering is rapidly maturing into a distinct and visible field centered around the data engineering lifecycle. It's one of the fastest-growing careers in technology with no signs of losing momentum.

**Why it matters:** As organizations realize they need to build a data foundation before moving to AI and ML, data engineering will continue growing in popularity and importance. The role won't disappear—it will evolve.

<DiagramContainer title="The Data Engineering Lifecycle Maturity">
  <ProcessFlow
    direction="horizontal"
    steps={[
      { title: "Past", description: "Ad hoc scripts and manual processes", icon: "🔧", color: colors.slate },
      { title: "Present", description: "Distinct field with established practices", icon: "⚙️", color: colors.blue },
      { title: "Future", description: "Higher-level work, increased automation", icon: "🚀", color: colors.green }
    ]}
  />
</DiagramContainer>

### The Myth of Tool Simplification

Some question whether increasingly simple tools will lead to the disappearance of data engineers. This thinking is shallow, lazy, and shortsighted.

> **Insight**
>
> As organizations leverage data in new ways, new foundations, systems, and workflows will be needed to address these needs. Data engineers sit at the center of designing, architecting, building, and maintaining these systems.

**What will happen:** If tooling becomes easier to use, data engineers will move up the value chain to focus on higher-level work.

<CardGrid
  columns={2}
  cards={[
    {
      title: "Current Focus",
      icon: "🔧",
      color: colors.blue,
      items: [
        "Managing servers and configuration",
        "Low-level infrastructure tasks",
        "Manual pipeline maintenance",
        "Fighting with complexity"
      ]
    },
    {
      title: "Future Focus",
      icon: "🚀",
      color: colors.green,
      items: [
        "System design and architecture",
        "Data modeling and optimization",
        "Business value creation",
        "Advanced automation"
      ]
    }
  ]}
/>

---

## 3. The Decline of Complexity and the Rise of Easy-to-Use Data Tools

**In plain English:** Data engineering tools are becoming dramatically simpler to use, lowering the barrier to entry and making data engineering accessible to companies of all sizes—not just tech giants with deep pockets.

**In technical terms:** Simplified, easy-to-use SaaS-managed services have largely removed the complexity of understanding the internals of various "big data" systems. Data engineering is no longer dependent on particular technology, data size, or company size.

**Why it matters:** The trend toward simplicity democratizes data engineering capabilities, allowing all companies to leverage sophisticated data systems that were previously reserved for organizations with large teams and deep pockets.

### The Transformation of Big Data

<ComparisonTable
  beforeTitle="2000s: Big Data Era"
  afterTitle="2020s: Cloud Era"
  beforeColor={colors.red}
  afterColor={colors.green}
  items={[
    { label: "Setup", before: "Large team required", after: "Individual can deploy" },
    { label: "Cost", before: "Deep pockets needed", after: "Pay-as-you-go pricing" },
    { label: "Deployment", before: "Months of configuration", after: "Minutes to start" },
    { label: "Maintenance", before: "Dedicated ops teams", after: "Managed services" }
  ]}
/>

### Cloud Services Examples

Big data is a victim of its extraordinary success. Technologies once reserved for internal use at tech giants are now available to anyone:

<CardGrid
  columns={3}
  cards={[
    {
      title: "Google BigQuery",
      icon: "🔍",
      color: colors.blue,
      items: [
        "Descendant of GFS and MapReduce",
        "Query petabytes of data",
        "Pay for storage and queries",
        "No infrastructure management"
      ]
    },
    {
      title: "Snowflake & EMR",
      icon: "❄️",
      color: colors.purple,
      items: [
        "Hyper-scalable cloud solutions",
        "Compete in managed space",
        "Similar capabilities",
        "Auto-scaling resources"
      ]
    },
    {
      title: "Managed Open Source",
      icon: "🔧",
      color: colors.green,
      items: [
        "Cloud Composer (Airflow)",
        "Managed Kubernetes",
        "AWS Lambda functions",
        "Serverless platforms"
      ]
    }
  ]}
/>

### The Open Source Revolution

The cloud has fundamentally changed the usage of open source tools:

> **Insight**
>
> In the early 2010s, using open source typically entailed downloading code and configuring it yourself. Nowadays, many open source data tools are available as managed cloud services that compete directly with proprietary services.

**Examples of managed open source:**
- **Apache Airflow:** Google Cloud Composer, AWS Managed Airflow
- **Kubernetes:** Managed Kubernetes on all major clouds
- **Serverless Functions:** AWS Lambda, Google Cloud Functions (running Linux behind the scenes)
- **Linux:** Pre-configured on all major cloud server instances

### Off-the-Shelf Data Connectors

Another significant trend is the growth of managed data connectors:

<DiagramContainer title="Evolution of Data Connectivity">
  <Column gap="lg">
    <Group title="Traditional Approach" color={colors.red} direction="column">
      <Row gap="sm">
        <Box color={colors.blue} icon="📊">Source</Box>
        <Arrow direction="right" label="Custom code" />
        <Box color={colors.purple} icon="🔧">Manual maintenance</Box>
        <Arrow direction="right" />
        <Box color={colors.green} icon="💾">Destination</Box>
      </Row>
      <Box color={colors.red} variant="subtle" size="sm">
        Lots of time building and maintaining plumbing
      </Box>
    </Group>
    <Group title="Modern Approach" color={colors.green} direction="column">
      <Row gap="sm">
        <Box color={colors.blue} icon="📊">Source</Box>
        <Arrow direction="right" label="Managed connector" />
        <Box color={colors.purple} icon="🚀">Fivetran/Airbyte</Box>
        <Arrow direction="right" />
        <Box color={colors.green} icon="💾">Destination</Box>
      </Row>
      <Box color={colors.green} variant="subtle" size="sm">
        Reclaim time and mental bandwidth for other projects
      </Box>
    </Group>
  </Column>
</DiagramContainer>

**Popular managed connectors:**
- Fivetran
- Airbyte
- And many more...

> **Insight**
>
> API connectors will be an outsourced problem so that data engineers can focus on the unique issues that drive their businesses.

### The Virtuous Cycle

The intersection of red-hot competition in the data-tooling space with a growing number of data engineers means:

<ProcessFlow
  direction="vertical"
  steps={[
    { title: "More Competition", description: "Vendors compete for users", icon: "⚔️", color: colors.blue },
    { title: "Decreased Complexity", description: "Tools become easier to use", icon: "📉", color: colors.purple },
    { title: "More Functionality", description: "Features continue to grow", icon: "📈", color: colors.green },
    { title: "Growth of Practice", description: "More companies discover value in data", icon: "🌱", color: colors.orange }
  ]}
/>

---

## 4. The Cloud-Scale Data OS and Improved Interoperability

**In plain English:** Cloud data services are starting to work together like the services in your computer's operating system—with standard ways to communicate, orchestrate, and monitor each other.

**In technical terms:** The simplified data services available in the cloud (BigQuery, Azure Blob Storage, Snowflake, AWS Lambda) resemble operating system services but operate at cloud scale across many machines rather than a single server.

**Why it matters:** As data services coalesce around interoperability standards, data engineering will become more automated, simplified, and powerful—similar to how operating systems made application development more accessible.

### Understanding the OS Analogy

Let's review how operating systems work and apply this to data:

<DiagramContainer title="Operating System Services Analogy">
  <Column gap="lg">
    <Group title="Single-Device OS" color={colors.blue} direction="column">
      <Row gap="sm">
        <Box color={colors.blue} variant="outlined" size="sm">WindowServer</Box>
        <Box color={colors.purple} variant="outlined" size="sm">CoreAudio</Box>
        <Box color={colors.green} variant="outlined" size="sm">FileSystem</Box>
        <Box color={colors.orange} variant="outlined" size="sm">Network</Box>
      </Row>
      <Box color={colors.slate} variant="subtle" size="sm">
        Standard APIs for applications to communicate with services
      </Box>
    </Group>
    <Group title="Cloud-Scale Data OS" color={colors.green} direction="column">
      <Row gap="sm">
        <Box color={colors.blue} variant="outlined" size="sm">BigQuery</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Blob Storage</Box>
        <Box color={colors.green} variant="outlined" size="sm">Lambda</Box>
        <Box color={colors.orange} variant="outlined" size="sm">Snowflake</Box>
      </Row>
      <Box color={colors.slate} variant="subtle" size="sm">
        Running across many machines at cloud scale
      </Box>
    </Group>
  </Column>
</DiagramContainer>

**Key operating system functions:**
- Provide essential services to applications
- Orchestrate tasks and processes
- Offer standard APIs for communication
- Monitor and restart services on failure
- Boot services in correct order based on dependencies

### 4.1. Enhanced Abstraction

The next frontier of evolution for the cloud data operating system will happen at a higher level of abstraction:

#### Data Interoperability Standards

> **Insight**
>
> Benn Stancil called for the emergence of standardized data APIs for building data pipelines and data applications. We predict that data engineering will gradually coalesce around a handful of data interoperability standards.

<CardGrid
  columns={2}
  cards={[
    {
      title: "Object Storage as Interface Layer",
      icon: "📦",
      color: colors.blue,
      items: [
        "Batch interface between services",
        "Growing importance in cloud",
        "Universal accessibility",
        "Cost-effective storage"
      ]
    },
    {
      title: "New Generation File Formats",
      icon: "📄",
      color: colors.purple,
      items: [
        "Parquet and Avro taking over",
        "Significant improvement over CSV",
        "Better performance than raw JSON",
        "Optimized for cloud interchange"
      ]
    }
  ]}
/>

#### Metadata Catalog Evolution

Another critical ingredient is a metadata catalog that describes schemas and data hierarchies:

- **Current state:** Largely filled by legacy Hive Metastore
- **Future:** New entrants will emerge to take its place
- **Role:** Crucial for data interoperability across applications, systems, clouds, and networks
- **Benefits:** Drives automation and simplification

#### Orchestration Platform Evolution

Significant improvements are coming to the scaffolding that manages cloud data services:

<DiagramContainer title="Evolution of Data Orchestration">
  <Column gap="lg">
    <Group title="Current Generation" color={colors.blue} direction="column">
      <Box color={colors.blue} size="lg">Apache Airflow</Box>
      <Box color={colors.slate} variant="subtle" size="sm">
        First truly cloud-oriented orchestration platform
      </Box>
    </Group>
    <Group title="Next Generation" color={colors.green} direction="column">
      <Row gap="sm">
        <Box color={colors.green} variant="outlined">Airflow Enhanced</Box>
        <Box color={colors.purple} variant="outlined">Dagster</Box>
        <Box color={colors.orange} variant="outlined">Prefect</Box>
      </Row>
      <Box color={colors.green} variant="subtle" size="sm">
        Rebuilt from ground up with enhanced capabilities
      </Box>
    </Group>
  </Column>
</DiagramContainer>

**Key enhancements coming:**

1. **Enhanced Data Integration and Awareness**
   - Integration with data cataloging and lineage
   - Significantly more data-aware processes
   - Intelligent pipeline optimization

2. **Infrastructure as Code Capabilities**
   - Similar to Terraform
   - Code deployment features (like GitHub Actions, Jenkins)
   - Automatic infrastructure provisioning

3. **Automated Pipeline Management**
   - Code a pipeline
   - Pass to orchestration platform
   - Automatically build, test, deploy, and monitor
   - Missing infrastructure deployed on first run

<DiagramContainer title="Next-Gen Orchestration Workflow">
  <ProcessFlow
    direction="horizontal"
    steps={[
      { title: "Code Pipeline", description: "Write pipeline with infra specs", icon: "💻", color: colors.blue },
      { title: "Auto-Build", description: "Platform builds components", icon: "🔨", color: colors.purple },
      { title: "Auto-Deploy", description: "Deploy missing infrastructure", icon: "🚀", color: colors.green },
      { title: "Monitor", description: "Continuous monitoring", icon: "📊", color: colors.orange }
    ]}
  />
</DiagramContainer>

**Example infrastructure auto-deployment:**
- Snowflake databases
- Databricks clusters
- Amazon Kinesis streams
- Storage buckets
- And more...

#### Live Data Enhancements

Significant enhancements are coming in the domain of live data:

<CardGrid
  columns={2}
  cards={[
    {
      title: "Past Challenge",
      icon: "⚠️",
      color: colors.red,
      items: [
        "Extremely complex streaming DAGs",
        "High operational burden",
        "Specialized expertise required",
        "Limited tooling"
      ]
    },
    {
      title: "Future Solution",
      icon: "✅",
      color: colors.green,
      items: [
        "Simple code deployment (Apache Pulsar)",
        "Managed stream processors",
        "New orchestration tools",
        "Automated monitoring"
      ]
    }
  ]}
/>

**Emerging managed stream processors:**
- Amazon Kinesis Data Analytics
- Google Cloud Dataflow
- New generation orchestration tools for streaming

### 4.2. Evolution of Data Engineers

What does this enhanced abstraction mean for data engineers?

> **Insight**
>
> By comparison, more sophisticated mobile operating systems and frameworks have not eliminated mobile app developers. Instead, mobile app developers can now focus on building better-quality, more sophisticated applications.

<ComparisonTable
  beforeTitle="Current State"
  afterTitle="Future State"
  beforeColor={colors.blue}
  afterColor={colors.green}
  items={[
    { label: "Focus", before: "Low-level infrastructure", after: "High-value applications" },
    { label: "Work", before: "Configuration and maintenance", after: "Design and optimization" },
    { label: "Complexity", before: "Managing internals", after: "Leveraging abstractions" },
    { label: "Innovation", before: "Limited by infrastructure", after: "Focused on business value" }
  ]}
/>

**The role won't go away—it will evolve significantly.**

---

## 5. "Enterprisey" Data Engineering

**In plain English:** Data engineering is becoming more "enterprisey"—not in a bad, bureaucratic way, but in terms of adopting the good practices around management, operations, and governance that larger companies do well.

**In technical terms:** The increasing simplification of data tools and the emergence of documented best practices means data engineering will become more mature, with focus shifting to data management, DataOps, and the undercurrents of data engineering.

**Why it matters:** Technologies and practices once reserved for giant organizations are trickling downstream, allowing engineers to focus on abstractions rather than low-level implementation details.

### What "Enterprisey" Doesn't Mean

Some readers will violently cringe at the term "enterprise." For some, it conjures nightmares of:
- Faceless committees in overly starched shirts
- Endless red tape
- Waterfall-managed projects with slipping schedules
- Ballooning budgets
- A soulless place where innovation goes to die

> **Insight**
>
> Fortunately, this is not what we're talking about. We're referring to some of the good things that larger companies do with data—management, operations, governance, and other "boring" stuff.

### The Golden Age of "Enterprisey" Tools

<DiagramContainer title="The Trickle-Down Effect">
  <ProcessFlow
    direction="vertical"
    steps={[
      { title: "Past: Giant Orgs Only", description: "Advanced data management tools", icon: "🏢", color: colors.slate },
      { title: "Present: Trickling Down", description: "Available to all companies", icon: "⬇️", color: colors.blue },
      { title: "Future: Universal Access", description: "Standard for all data teams", icon: "🌍", color: colors.green }
    ]}
  />
</DiagramContainer>

We're living through the golden age of "enterprisey" data management tools:
- Technologies once reserved for giants are now accessible
- The hard parts of big data and streaming are abstracted away
- Focus has shifted to ease of use and interoperability
- Refinements in data management and operations

### New Opportunities for Data Engineers

<CardGrid
  columns={3}
  cards={[
    {
      title: "Data Management",
      icon: "🗄️",
      color: colors.blue,
      items: [
        "Metadata catalogs",
        "Data discovery",
        "Schema management",
        "Version control"
      ]
    },
    {
      title: "DataOps",
      icon: "⚙️",
      color: colors.purple,
      items: [
        "CI/CD pipelines",
        "Monitoring and alerting",
        "Automated testing",
        "Deployment automation"
      ]
    },
    {
      title: "Undercurrents",
      icon: "🌊",
      color: colors.green,
      items: [
        "Data governance",
        "Data quality",
        "Security and privacy",
        "Cost optimization"
      ]
    }
  ]}
/>

Data engineers will become "enterprisey" by working on tooling that provides abstractions for:
- Data management layers
- DataOps practices
- Governance frameworks
- Quality assurance
- Security and compliance

---

## 6. Titles and Responsibilities Will Morph

**In plain English:** The lines between software engineering, data engineering, data science, and ML engineering are getting blurrier, and new specialized roles will emerge as tools become simpler and more integrated.

**In technical terms:** As simplicity moves up the stack, professionals across the data spectrum will spend less time on low-level tasks and more time on specialized, high-value work. New hybrid roles will emerge at the intersection of existing disciplines.

**Why it matters:** Understanding how roles are evolving helps you position yourself for the future and acquire the right combination of skills for emerging opportunities.

### The Organic Evolution

<DiagramContainer title="Role Evolution and Overlap">
  <Column gap="md">
    <Row gap="sm">
      <Box color={colors.blue} variant="outlined">Software Engineer</Box>
      <Box color={colors.purple} variant="outlined">Data Engineer</Box>
      <Box color={colors.green} variant="outlined">Data Scientist</Box>
      <Box color={colors.orange} variant="outlined">ML Engineer</Box>
    </Row>
    <Box color={colors.slate} variant="subtle">
      Boundaries are increasingly fuzzy
    </Box>
  </Column>
</DiagramContainer>

> **Insight**
>
> Like the authors, many data scientists are transformed into data engineers through an organic process; tasked with doing "data science" but lacking the tools to do their jobs, they take on the job of designing and building systems to serve the data engineering lifecycle.

### Impact of Simplification

As simplicity moves up the stack:

**For Data Scientists:**
- Spend smaller slice of time gathering and munging data
- Focus more on analysis and modeling
- Less infrastructure management

**For Data Engineers:**
- Spend less time on low-level tasks (managing servers, configuration)
- "Enterprisey" data engineering becomes more prevalent
- Focus on higher-level abstractions

### New Emerging Roles

#### Role 1: ML-Focused Engineer (ML Operations Engineer)

A new role sitting between ML engineering and data engineering:

<CardGrid
  columns={2}
  cards={[
    {
      title: "Core Skills",
      icon: "🧠",
      color: colors.blue,
      items: [
        "Algorithms and ML techniques",
        "Model optimization",
        "Model monitoring",
        "Data monitoring"
      ]
    },
    {
      title: "Primary Responsibilities",
      icon: "⚙️",
      color: colors.purple,
      items: [
        "Create automated training systems",
        "Monitor model performance",
        "Operationalize ML processes",
        "Monitor data pipelines and quality"
      ]
    }
  ]}
/>

**Why this role emerges:**
- ML toolsets becoming easier to use
- Managed cloud ML services growing in capabilities
- ML shifting from ad hoc exploration to operational discipline
- Well-understood model types need automation

**What happens to ML Engineers:**
- Become more specialized
- Work on model types closer to research
- Focus on less well-understood problems

#### Role 2: Data-Aware Software Engineer

Another area where titles may morph: the intersection of software engineering and data engineering.

<DiagramContainer title="Software Engineer Evolution">
  <ProcessFlow
    direction="vertical"
    steps={[
      { title: "Current: Siloed", description: "Throw data over the wall", icon: "🧱", color: colors.red },
      { title: "Transition: Learning", description: "Acquiring data engineering skills", icon: "📚", color: colors.blue },
      { title: "Future: Integrated", description: "Deep data engineering expertise", icon: "🤝", color: colors.green }
    ]}
  />
</DiagramContainer>

**What's driving this:**
- Data applications blending traditional apps with analytics
- Need for deep integration through streaming and event-driven architectures
- Lowered boundaries between application backend and data tools

**New skill requirements for software engineers:**
- Streaming technologies
- Data pipelines
- Data modeling
- Data quality practices

**How teams will evolve:**
- Data engineers integrated into application development teams
- Software developers acquire data engineering skills
- Move beyond "throw it over the wall" approach

> **Insight**
>
> We will move beyond the "throw it over the wall" approach that is now pervasive. Data engineers will be integrated into application development teams, and software developers will acquire data engineering skills.

---

## 7. Moving Beyond the Modern Data Stack

**In plain English:** The modern data stack (MDS) has been great, but it's basically just old data warehouse practices repackaged with cloud technology. The future is moving beyond batch analytics toward real-time, intelligent applications that power entire businesses.

**In technical terms:** The MDS, built around cloud data warehouse paradigms and batch ELT processes, has serious limitations compared to next-generation real-time data applications. The world is moving toward powering businesses in real time with next-generation real-time databases.

**Why it matters:** The shift from the MDS to the live data stack will fundamentally change how companies use data—from internal-facing analytics to powering customer-facing applications with real-time intelligence and automation.

### The Modern Data Stack: Success and Limitations

Let's be frank: the modern data stack isn't so modern.

<ComparisonTable
  beforeTitle="What MDS Did Well"
  afterTitle="MDS Limitations"
  beforeColor={colors.green}
  afterColor={colors.red}
  items={[
    { label: "Achievement", before: "Powerful tools for masses", after: "Repackaging of old practices" },
    { label: "Cost", before: "Lowered prices", after: "Built around batch processing" },
    { label: "Empowerment", before: "Analysts control stack", after: "Internal-facing only" },
    { label: "Technology", before: "Cloud data warehouses", after: "Not suited for real-time apps" }
  ]}
/>

**MDS achievements:**
- Brought powerful data tools to the masses
- Lowered prices significantly
- Empowered data analysts to take control
- Rise of ELT and cloud data warehouses
- Changed the game for BI, analytics, and data science

**MDS limitations:**
- Repackaging of old data warehouse practices
- Built around cloud data warehouse paradigm
- Serious limitations for real-time use cases
- Internal-facing analytics focus
- Batch-oriented processing

### What's Driving the Evolution?

#### From Analytics to Automation

<DiagramContainer title="The Shift from Reports to Actions">
  <ProcessFlow
    direction="horizontal"
    steps={[
      { title: "Traditional: Look at Report", description: "What happened? When?", icon: "📊", color: colors.blue },
      { title: "Decide: Take Action", description: "Repetitive manual decision", icon: "🤔", color: colors.purple },
      { title: "Future: Automate", description: "Automated event-based action", icon: "⚡", color: colors.green }
    ]}
  />
</DiagramContainer>

> **Insight**
>
> In many cases, analytics (BI and operational analytics) will be replaced by automation. Ask yourself: "If I'm asking a what or when question, what action do I take next?" If the action is repetitive, it is a candidate for automation.

**Key insight:** Why look at a report to determine whether to take action when you can instead automate the action based on events as they occur?

#### The Magic of Real-Time Applications

Why does using products like TikTok, Uber, Google, or DoorDash feel like magic?

<CardGrid
  columns={2}
  cards={[
    {
      title: "What You See",
      icon: "👆",
      color: colors.blue,
      items: [
        "Click a button",
        "Watch a short video",
        "Order a ride or meal",
        "Get instant results"
      ]
    },
    {
      title: "What's Happening",
      icon: "⚙️",
      color: colors.green,
      items: [
        "Sophisticated data processing",
        "Real-time ML behind scenes",
        "Millisecond latency",
        "Complex orchestration"
      ]
    }
  ]}
/>

These products are examples of true real-time data applications:
- Deliver actions at the click of a button
- Perform sophisticated data processing behind the scenes
- Execute ML with miniscule latency
- Process data continuously, not in batches

**Current state:** This level of sophistication is locked away in custom-built technologies at large tech companies.

**Future state:** This power is becoming democratized, similar to how the MDS brought cloud-scale data warehouses to the masses.

> **Insight**
>
> The data world will soon go "live."

---

### 7.1. The Live Data Stack

**In plain English:** The live data stack is the successor to the modern data stack—it fuses real-time analytics and ML into applications using streaming technologies, covering the full data lifecycle from source systems to processing to ML and back.

**In technical terms:** The live data stack democratizes real-time technologies, taking real-time data application technologies used at elite tech companies and making them available to companies of all sizes as easy-to-use cloud-based offerings.

**Why it matters:** This opens up a new world of possibilities for creating better user experiences and business value through real-time intelligence and automation.

<DiagramContainer title="The Live Data Stack Architecture">
  <Column gap="md">
    <Row gap="sm">
      <Box color={colors.blue} icon="📱" size="lg">Application</Box>
      <Arrow direction="right" label="Real-time events" />
      <Box color={colors.purple} icon="🌊" size="lg">Streaming Pipeline</Box>
    </Row>
    <Arrow direction="down" label="Bidirectional flow" />
    <Row gap="sm">
      <Box color={colors.green} icon="🗄️">Real-Time DB</Box>
      <Box color={colors.orange} icon="🧠">ML Models</Box>
      <Box color={colors.blue} icon="⚙️">Processing</Box>
    </Row>
    <Arrow direction="up" label="Intelligence & insights" />
    <Box color={colors.slate} variant="subtle">
      Data and intelligence moves in real time between application and supporting systems
    </Box>
  </Column>
</DiagramContainer>

### Comparing MDS and Live Data Stack

<ComparisonTable
  beforeTitle="Modern Data Stack"
  afterTitle="Live Data Stack"
  beforeColor={colors.blue}
  afterColor={colors.green}
  items={[
    { label: "Data Treatment", before: "Bounded, batch", after: "Unbounded, continuous stream" },
    { label: "Latency", before: "Minutes to hours", after: "Seconds to milliseconds" },
    { label: "Use Cases", before: "Internal analytics, BI", after: "Customer-facing applications" },
    { label: "Technology Base", before: "Cloud data warehouses", after: "Streaming + real-time DBs" },
    { label: "Processing", before: "ELT in warehouse", after: "Stream, transform, load (STL)" }
  ]}
/>

**Just as the MDS:**
- Took advantage of the cloud
- Brought on-premises technologies to the masses
- Made data warehousing accessible

**The live data stack:**
- Takes real-time tech from elite companies
- Makes it available to companies of all sizes
- Provides easy-to-use cloud-based offerings
- Opens new possibilities for user experiences

---

### 7.2. Streaming Pipelines and Real-Time Analytical Databases

**In plain English:** The two core technologies powering the live data stack are streaming pipelines (for moving data continuously) and real-time analytical databases (for storing and querying data with subsecond latency).

**In technical terms:** Streaming technologies enable continuous ingestion of unbounded data streams, while real-time analytical databases enable fast ingestion and subsecond queries on this data, often combined with historical datasets.

**Why it matters:** These technologies eliminate batch bottlenecks and enable continuous data flow, fundamentally transforming how organizations process and use data.

#### Streaming Pipelines

<DiagramContainer title="Streaming Growth and Focus">
  <ProcessFlow
    direction="vertical"
    steps={[
      { title: "Current", description: "Extreme growth in adoption", icon: "📈", color: colors.blue },
      { title: "Focus Shift", description: "From novelty to business utility", icon: "🎯", color: colors.purple },
      { title: "Future", description: "Radically transform organizations", icon: "🚀", color: colors.green }
    ]}
  />
</DiagramContainer>

**Present state:**
- Streaming systems often treated like expensive novelty
- Used as "dumb pipe" for getting data from A to B
- Limited business utility focus

**Future state:**
- Clearer focus on business utility of streaming data
- Radically transform organizational technology and business processes
- Data architects and engineers lead these fundamental changes

#### Real-Time Analytical Databases

<CardGrid
  columns={2}
  cards={[
    {
      title: "Key Capabilities",
      icon: "⚡",
      color: colors.blue,
      items: [
        "Fast ingestion (continuous)",
        "Subsecond queries",
        "Data enrichment",
        "Historical data combination"
      ]
    },
    {
      title: "Leading Technologies",
      icon: "🗄️",
      color: colors.purple,
      items: [
        "Apache Druid",
        "ClickHouse",
        "Rockset",
        "Firebolt"
      ]
    }
  ]}
/>

**What they enable:**
When combined with streaming pipeline and automation or real-time dashboards:
- Whole new level of possibilities opens up
- No longer constrained by slow-running ELT processes
- No more 15-minute updates or slow-moving parts
- Data moves in continuous flow

> **Insight**
>
> As streaming ingestion becomes more prevalent, batch ingestion will be less and less common. Why create a batch bottleneck at the head of your data pipeline? We'll eventually look at batch ingestion the same way we now look at dial-up modems.

#### The Back-to-the-Future Moment: Stream, Transform, Load (STL)

<ComparisonTable
  beforeTitle="ELT (Modern Data Stack)"
  afterTitle="STL (Live Data Stack)"
  beforeColor={colors.blue}
  afterColor={colors.green}
  items={[
    { label: "Extract", before: "Batch extraction", after: "Continuous streaming extraction" },
    { label: "Transform", before: "In database (after load)", after: "In stream (during flow)" },
    { label: "Load", before: "Batch load to warehouse", after: "Continuous load to real-time DB" },
    { label: "Context", before: "Data at rest", after: "Data in motion" }
  ]}
/>

**The shift away from ELT:**
- Move from in-database transformations
- Toward something that looks more like ETL
- We call this **Stream, Transform, and Load (STL)**
- In streaming context, extraction is ongoing and continuous

**Batch won't entirely go away:**
- Still useful for model training
- Quarterly reporting
- Certain aggregations
- But streaming transformation will become the norm

#### Data Warehouse vs. Real-Time OLAP

<ComparisonTable
  beforeTitle="Data Warehouse/Lake"
  afterTitle="Real-Time OLAP"
  beforeColor={colors.blue}
  afterColor={colors.green}
  items={[
    { label: "Strength", before: "Large amounts of data", after: "Fast ingestion" },
    { label: "Queries", before: "Ad hoc queries", after: "Subsecond queries on live data" },
    { label: "Latency", before: "Minutes to hours", after: "Milliseconds to seconds" },
    { label: "Use Case", before: "Analytics and reporting", after: "Data applications backend" }
  ]}
/>

> **Insight**
>
> While the data warehouse and data lake are great for housing large amounts of data and performing ad hoc queries, they are not so well optimized for low-latency data ingestion or queries on rapidly moving data.

#### The Future of Data Modeling

<DiagramContainer title="Evolution of Data Modeling">
  <Column gap="lg">
    <Group title="Traditional Modeling" color={colors.blue} direction="column">
      <Box color={colors.blue}>In the data warehouse</Box>
      <Box color={colors.slate} variant="subtle" size="sm">
        Batch-oriented techniques from early 2000s
      </Box>
    </Group>
    <Group title="Future Modeling" color={colors.green} direction="column">
      <Row gap="sm">
        <Box color={colors.green} variant="outlined" size="sm">At Generation</Box>
        <Box color={colors.purple} variant="outlined" size="sm">In Stream</Box>
        <Box color={colors.orange} variant="outlined" size="sm">At Every Stage</Box>
      </Row>
      <Box color={colors.green} variant="subtle" size="sm">
        Upstream definitions layer throughout full lifecycle
      </Box>
    </Group>
  </Column>
</DiagramContainer>

**Current state:** Traditional batch-oriented data modeling techniques aren't suited for streaming data

**Future state:**
- Data modeling will involve **upstream definitions layer**
- Include semantics, metrics, lineage, and data definitions
- Begin where data is generated in the application
- Happen at every stage as data flows through lifecycle
- No serious innovation since early 2000s—ripe for disruption

---

### 7.3. The Fusion of Data with Applications

**In plain English:** Applications and data systems are merging into a single integrated stack where data flows seamlessly between operational systems and analytics without awkward hand-offs or duct tape.

**In technical terms:** The next revolution will eliminate the separation between application and data layers, with applications integrating real-time automation and decision making powered by streaming pipelines and ML. The time between stages of the data engineering lifecycle will drastically shorten.

**Why it matters:** This fusion eliminates the inefficiencies of siloed systems, enables real-time intelligence in applications, and allows data-driven decisions to happen at the moment they're needed rather than after the fact.

#### The Current Problem

<DiagramContainer title="Current Siloed Architecture">
  <Row gap="lg">
    <Column gap="sm" align="center">
      <Box color={colors.blue} icon="📱" size="lg">Applications</Box>
      <Box color={colors.slate} variant="subtle" size="sm">One area</Box>
    </Column>
    <Column gap="md" align="center">
      <Box color={colors.red} icon="🧱" size="lg">The Wall</Box>
      <Box color={colors.red} variant="subtle" size="sm">Lots of duct tape needed</Box>
    </Column>
    <Column gap="sm" align="center">
      <Box color={colors.purple} icon="🗄️" size="lg">MDS</Box>
      <Box color={colors.slate} variant="subtle" size="sm">Another area</Box>
    </Column>
  </Row>
</DiagramContainer>

**Current issues:**
- Applications sit in one area
- MDS sits in another area
- Data created with no regard for analytics use
- Lots of duct tape needed to make systems talk
- Patchwork, siloed setup is awkward and ungainly

#### The Future: Unified Stack

<DiagramContainer title="Future Unified Architecture">
  <Column gap="md">
    <Box color={colors.green} icon="🔄" size="lg">Unified Application + Data Stack</Box>
    <Row gap="sm">
      <Box color={colors.blue} variant="outlined">Real-Time Apps</Box>
      <Box color={colors.purple} variant="outlined">Streaming</Box>
      <Box color={colors.orange} variant="outlined">ML</Box>
      <Box color={colors.green} variant="outlined">Analytics</Box>
    </Row>
    <Box color={colors.green} variant="subtle">
      Seamless integration, no walls, continuous flow
    </Box>
  </Column>
</DiagramContainer>

**Future state:**
- Application stacks will be data stacks, and vice versa
- Applications integrate real-time automation and decision making
- Powered by streaming pipelines and ML
- Data engineering lifecycle won't necessarily change
- Time between stages will drastically shorten

#### Innovation Areas

<CardGrid
  columns={2}
  cards={[
    {
      title: "Hybrid Databases",
      icon: "🗄️",
      color: colors.blue,
      items: [
        "Mix of OLTP and OLAP",
        "Emerging technologies",
        "Single database for both",
        "Reduced complexity"
      ]
    },
    {
      title: "Feature Stores",
      icon: "🎯",
      color: colors.purple,
      items: [
        "Similar role for ML use cases",
        "Bridge operational and analytical",
        "Serve features in real-time",
        "Enable ML in applications"
      ]
    }
  ]}
/>

> **Insight**
>
> Pay attention to emerging database technologies designed to address the mix of OLTP and OLAP use cases; feature stores may also play a similar role for ML use cases.

---

### 7.4. The Tight Feedback Between Applications and ML

**In plain English:** Machine learning will become deeply integrated into applications with real-time feedback loops, where applications continuously learn and adapt based on incoming data without human intervention.

**In technical terms:** The fusion of applications and ML will create tight feedback loops where data generated by applications immediately informs ML models, which in turn provide real-time intelligence back to applications, creating cycles of ever-smarter applications.

**Why it matters:** As data feedback loops become shorter, most applications will integrate ML, enabling them to adapt in real-time to changes and create increasingly intelligent user experiences.

#### The Current Disconnect

<DiagramContainer title="Current Siloed ML">
  <Row gap="lg">
    <Column gap="sm" align="center">
      <Box color={colors.blue} icon="💻" size="lg">Software Engineers</Box>
      <Box color={colors.slate} variant="subtle" size="sm">Do their thing over here</Box>
    </Column>
    <Box color={colors.red} icon="🧱">Disconnect</Box>
    <Column gap="sm" align="center">
      <Box color={colors.purple} icon="🧠" size="lg">Data Scientists & ML Engineers</Box>
      <Box color={colors.slate} variant="subtle" size="sm">Do their thing over there</Box>
    </Column>
  </Row>
</DiagramContainer>

Today, applications and ML are disjointed systems, similar to applications and analytics.

#### Why ML and Applications Should Merge

<CardGrid
  columns={2}
  cards={[
    {
      title: "ML's Strength",
      icon: "🧠",
      color: colors.blue,
      items: [
        "High rate data generation",
        "High volume processing",
        "Scenarios humans can't process",
        "Pattern recognition at scale"
      ]
    },
    {
      title: "Growing Need",
      icon: "📈",
      color: colors.green,
      items: [
        "Data sizes growing",
        "Velocity increasing",
        "Sophisticated workflows",
        "Complex actions required"
      ]
    }
  ]}
/>

> **Insight**
>
> ML is well-suited for scenarios where data is generated at such a high rate and volume that humans cannot feasibly process it by hand. As data sizes and velocity grow, this applies to every scenario.

#### The Future: Tight Integration

<DiagramContainer title="Future Integrated ML Applications">
  <ProcessFlow
    direction="horizontal"
    steps={[
      { title: "Application", description: "Generates data", icon: "📱", color: colors.blue },
      { title: "Real-Time Stream", description: "Fast-moving data", icon: "🌊", color: colors.purple },
      { title: "ML Models", description: "Process and learn", icon: "🧠", color: colors.green },
      { title: "Intelligent Actions", description: "Back to application", icon: "⚡", color: colors.orange }
    ]}
  />
</DiagramContainer>

**Characteristics of the future:**
- High volumes of fast-moving data
- Sophisticated workflows and actions
- Candidates for ML everywhere
- Most applications integrate ML
- Real-time adaptation to changes

**The virtuous cycle:**

<ProcessFlow
  direction="vertical"
  steps={[
    { title: "Data Moves Quickly", description: "Continuous streaming from applications", icon: "⚡", color: colors.blue },
    { title: "Feedback Loop Tightens", description: "Faster learning and adaptation", icon: "🔄", color: colors.purple },
    { title: "Applications Get Smarter", description: "Intelligent, adaptive behavior", icon: "🧠", color: colors.green },
    { title: "Business Value Increases", description: "Better experiences, outcomes", icon: "📈", color: colors.orange }
  ]}
/>

> **Insight**
>
> As data moves more quickly, the feedback loop between applications and ML will tighten. The applications in the live data stack are intelligent and able to adapt in real time to changes in the data. This creates a cycle of ever-smarter applications and increasing business value.

---

## 8. Dark Matter Data and the Rise of Spreadsheets

**In plain English:** Spreadsheets are the most widely used data platform on Earth, processing billions of analyses that never touch sophisticated data systems. The future will bring tools that combine the interactivity of spreadsheets with the power of cloud databases.

**In technical terms:** Spreadsheets represent "dark matter" in the data world—between 700 million and 2 billion users performing complex analytics that never enter the sophisticated data systems we've described. They are interactive data applications supporting complex analytics across a spectrum of user skill levels.

**Why it matters:** A new class of tools will emerge combining spreadsheet-like interactive analytics capabilities with the backend power of cloud OLAP systems, potentially revolutionizing how non-technical users interact with data.

### The Humble Spreadsheet

<DiagramContainer title="The Spreadsheet Universe">
  <Column gap="md">
    <Box color={colors.green} icon="📊" size="lg">700M - 2B Users Worldwide</Box>
    <Row gap="sm">
      <Box color={colors.blue} variant="outlined" size="sm">Excel</Box>
      <Box color={colors.green} variant="outlined" size="sm">Google Sheets</Box>
      <Box color={colors.purple} variant="outlined" size="sm">LibreOffice</Box>
      <Box color={colors.orange} variant="outlined" size="sm">Others</Box>
    </Row>
    <Box color={colors.slate} variant="subtle">
      The dark matter of the data world
    </Box>
  </Column>
</DiagramContainer>

**What's the most widely used data platform?** It's the humble spreadsheet.

**Real-world usage in organizations:**
- Financial reporting
- Supply-chain analytics
- CRM management
- Ad hoc analysis
- Department-specific workflows

### What Is a Spreadsheet, Really?

> **Insight**
>
> At heart, a spreadsheet is an interactive data application that supports complex analytics.

<ComparisonTable
  beforeTitle="Spreadsheets"
  afterTitle="Code-Based Tools (pandas)"
  beforeColor={colors.green}
  afterColor={colors.blue}
  items={[
    { label: "Interface", before: "Interactive, visual", after: "Code-based, programmatic" },
    { label: "Accessibility", before: "Full spectrum of users", after: "Technical users only" },
    { label: "Learning Curve", before: "Gentle", after: "Steep" },
    { label: "Flexibility", before: "Simple to sophisticated", after: "Very sophisticated" }
  ]}
/>

**Spreadsheet capabilities:**
- Interactive data application
- Complex analytics support
- Accessible to spectrum of users:
  - Basic: Just open and view reports
  - Advanced: Script sophisticated procedural processing
- Unlike purely code-based tools (pandas)

### The BI Tool Problem

<CardGrid
  columns={2}
  cards={[
    {
      title: "What BI Tools Offer",
      icon: "📊",
      color: colors.blue,
      items: [
        "Database connectivity",
        "Visualization",
        "Slicing and dicing",
        "Within guardrails"
      ]
    },
    {
      title: "What They're Missing",
      icon: "❌",
      color: colors.red,
      items: [
        "Full interactivity",
        "General-purpose programming",
        "Spreadsheet-like flexibility",
        "Power user capabilities"
      ]
    }
  ]}
/>

> **Insight**
>
> So far, BI tools have failed to bring comparable interactivity to databases. Users who interact with the UI are typically limited to slicing and dicing data within certain guardrails, not general-purpose programmable analytics.

### The Future: Spreadsheets Meet Databases

**We predict:** A new class of tools will emerge that combines:
- Interactive analytics capabilities of a spreadsheet
- Backend power of cloud OLAP systems

<DiagramContainer title="The Future of Interactive Data Tools">
  <Row gap="md" align="center">
    <Box color={colors.green} icon="📊">Spreadsheet UX</Box>
    <Box color={colors.purple} icon="➕" variant="subtle">+</Box>
    <Box color={colors.blue} icon="🗄️">Cloud OLAP Power</Box>
    <Box color={colors.purple} icon="=" variant="subtle">=</Box>
    <Box color={colors.orange} icon="✨">Next-Gen Tool</Box>
  </Row>
</DiagramContainer>

**Possible outcomes:**
- Continue using spreadsheet paradigms
- Define entirely new interface idioms for interacting with data
- Some candidates already in the running
- Ultimate winner yet to be determined

**What this enables:**
- Non-technical users can leverage cloud-scale data
- Interactive exploration of massive datasets
- Familiar interface with unlimited backend power
- Bridge between technical and business users

---

## 9. Conclusion

Thank you for joining us on this journey through data engineering! We've traversed:
- Good architecture principles
- The stages of the data engineering lifecycle
- Security best practices
- Strategies for choosing technologies
- Wild speculation about the near and intermediate future

### Predictions with Different Confidence Levels

<CardGrid
  columns={2}
  cards={[
    {
      title: "Secure Footing",
      icon: "✅",
      color: colors.green,
      items: [
        "Simplification of managed tooling",
        "Rise of 'enterprisey' data engineering",
        "Growing adoption of cloud services",
        "Decreasing complexity of tools"
      ]
    },
    {
      title: "More Speculative",
      icon: "🔮",
      color: colors.purple,
      items: [
        "Emergence of live data stack",
        "Shift from batch to streaming",
        "Fusion of applications and ML",
        "New data modeling paradigms"
      ]
    }
  ]}
/>

> **Insight**
>
> Some aspects of our prognostication sit on relatively secure footing—simplification has proceeded day by day as we've written this book. Other predictions are more speculative—we see hints of an emerging live data stack, but this entails a significant paradigm shift for both engineers and organizations.

### Uncertainty and Evolution

**Possible alternative futures:**
- The trend toward real-time data may stall
- Most companies might continue focusing on basic batch processing
- Other trends may emerge that we've completely failed to identify
- Evolution involves complex interactions of technology and culture—both unpredictable

### This Book as a Travel Guide

<DiagramContainer title="Your Data Engineering Journey">
  <ProcessFlow
    direction="vertical"
    steps={[
      { title: "Fundamentals", description: "Core concepts and lifecycle", icon: "📚", color: colors.blue },
      { title: "Exploration", description: "Find interesting topics", icon: "🔍", color: colors.purple },
      { title: "Community", description: "Engage with experts", icon: "👥", color: colors.green },
      { title: "Practice", description: "Apply and refine", icon: "⚙️", color: colors.orange }
    ]}
  />
</DiagramContainer>

Data engineering is a vast topic. While we could not go into technical depth in individual areas, we hope we have succeeded in creating a kind of **travel guide** that will help:
- Current data engineers
- Future data engineers
- Those who work adjacent to the field

### Continue Your Exploration

<CardGrid
  columns={3}
  cards={[
    {
      title: "Read Extensively",
      icon: "📖",
      color: colors.blue,
      items: [
        "Latest books",
        "Blog posts",
        "Academic papers",
        "Technical documentation"
      ]
    },
    {
      title: "Engage Community",
      icon: "👥",
      color: colors.purple,
      items: [
        "Meetups",
        "Conferences",
        "Online forums",
        "Domain experts"
      ]
    },
    {
      title: "Stay Current",
      icon: "📡",
      color: colors.green,
      items: [
        "Vendor announcements",
        "Industry trends",
        "New technologies",
        "Best practices"
      ]
    }
  ]}
/>

**How to continue learning:**
- Identify domain experts for guidance
- Discover strengths and pitfalls of trendy technologies
- Participate in meetups and talks
- Ask questions and share your own expertise
- Keep an eye on vendor announcements (with healthy skepticism)

### The Adoption Process

<ProcessFlow
  direction="vertical"
  steps={[
    { title: "Choose Technology", description: "Evaluate and select tools", icon: "🎯", color: colors.blue },
    { title: "Adopt Technology", description: "Individual or team adoption", icon: "👥", color: colors.purple },
    { title: "Develop Expertise", description: "Build knowledge and skills", icon: "🧠", color: colors.green },
    { title: "Scale Adoption", description: "Across entire organization", icon: "🌍", color: colors.orange }
  ]}
/>

As you adopt technology, remember:
- You might contribute as an individual
- You might lead within your team
- You might influence across an entire organization

### Don't Lose Sight of Larger Goals

> **Insight**
>
> Don't lose sight of the larger goals of data engineering. Focus on the lifecycle, on serving your customers—internal and external—on your business, and on your larger goals.

**Key focus areas:**
- The data engineering lifecycle
- Serving customers (internal and external)
- Business objectives
- Larger organizational goals

### You Will Shape the Future

<DiagramContainer title="Defining the Future">
  <Column gap="md">
    <Row gap="sm">
      <Box color={colors.blue} variant="outlined">Tool Creators</Box>
      <Box color={colors.purple} variant="outlined">Tool Adopters</Box>
    </Row>
    <Arrow direction="down" label="Both define trends" />
    <Box color={colors.green} size="lg">Future of Data Engineering</Box>
  </Column>
</DiagramContainer>

> **Insight**
>
> Regarding the future, many of you will play a role in determining what comes next. Technology trends are defined not only by those who create the underlying technology but also by those who adopt it and put it to good use.

**Your role:**
- Find opportunities to apply real-time technology
- Improve user experience
- Create value
- Define entirely new types of applications
- Practical application will materialize new industry standards

**Successful tool use is as critical as tool creation.**

### A Final Wish

<DiagramContainer title="Your Data Engineering Career">
  <Box color={colors.green} icon="🌟" size="lg">
    An Exciting Career Awaits!
  </Box>
</DiagramContainer>

> **Insight**
>
> Finally, we wish you an exciting career! We chose to work in data engineering, to consult, and to write this book not simply because it was trendy but because it was fascinating. We hope that we've managed to convey to you a bit of the joy we've found working in this field.

**What makes data engineering special:**
- Rapidly evolving field
- Continuous learning opportunities
- Impact on business and users
- Fascinating technical challenges
- Joy in building systems that work

---

**Previous:** [Chapter 10: Security and Privacy](./chapter10) | **Next:** (End of Guide)
