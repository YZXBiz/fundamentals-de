---
sidebar_position: 3
title: "Chapter 2: The Data Engineering Lifecycle"
description: "A comprehensive framework for understanding data engineering from generation to serving, including the critical undercurrents that support every stage"
---

import {
  Box, Arrow, Row, Column, Group,
  DiagramContainer, ProcessFlow, TreeDiagram,
  CardGrid, StackDiagram, ComparisonTable,
  colors
} from '@site/src/components/diagrams';

# Chapter 2: The Data Engineering Lifecycle

> **"The major goal is to move beyond viewing data engineering as a specific collection of data technologies and instead think in terms of the principles of data lifecycle management."**
>
> — Fundamentals of Data Engineering

---

## Table of Contents

1. [What Is the Data Engineering Lifecycle?](#1-what-is-the-data-engineering-lifecycle)
   - 1.1. [The Data Lifecycle Versus the Data Engineering Lifecycle](#11-the-data-lifecycle-versus-the-data-engineering-lifecycle)
2. [Generation: Source Systems](#2-generation-source-systems)
   - 2.1. [Evaluating Source Systems: Key Engineering Considerations](#21-evaluating-source-systems-key-engineering-considerations)
3. [Storage](#3-storage)
   - 3.1. [Evaluating Storage Systems: Key Engineering Considerations](#31-evaluating-storage-systems-key-engineering-considerations)
   - 3.2. [Understanding Data Access Frequency](#32-understanding-data-access-frequency)
   - 3.3. [Selecting a Storage System](#33-selecting-a-storage-system)
4. [Ingestion](#4-ingestion)
   - 4.1. [Key Engineering Considerations for the Ingestion Phase](#41-key-engineering-considerations-for-the-ingestion-phase)
   - 4.2. [Batch Versus Streaming](#42-batch-versus-streaming)
   - 4.3. [Push Versus Pull](#43-push-versus-pull)
5. [Transformation](#5-transformation)
   - 5.1. [Key Considerations for the Transformation Phase](#51-key-considerations-for-the-transformation-phase)
6. [Serving Data](#6-serving-data)
   - 6.1. [Analytics](#61-analytics)
   - 6.2. [Machine Learning](#62-machine-learning)
   - 6.3. [Reverse ETL](#63-reverse-etl)
7. [Major Undercurrents Across the Data Engineering Lifecycle](#7-major-undercurrents-across-the-data-engineering-lifecycle)
   - 7.1. [Security](#71-security)
   - 7.2. [Data Management](#72-data-management)
   - 7.3. [DataOps](#73-dataops)
   - 7.4. [Data Architecture](#74-data-architecture)
   - 7.5. [Orchestration](#75-orchestration)
   - 7.6. [Software Engineering](#76-software-engineering)
8. [Conclusion](#8-conclusion)

---

## 1. What Is the Data Engineering Lifecycle?

**In plain English:** The data engineering lifecycle is like a factory assembly line for data - it takes raw ingredients (data from various sources), processes them through several stations (storage, transformation), and produces a finished product ready for customers (analysts, data scientists, ML engineers).

**In technical terms:** The data engineering lifecycle comprises stages that turn raw data ingredients into a useful end product, ready for consumption by analysts, data scientists, ML engineers, and others. It focuses on the stages a data engineer controls, from getting data from source systems through serving it for downstream use.

**Why it matters:** As technologies become more abstract and do more heavy lifting, data engineers need to think and act on a higher level. The data engineering lifecycle provides an extremely useful mental model for organizing the work of data engineering, moving beyond specific technologies to focus on lifecycle management principles.

<DiagramContainer title="The Data Engineering Lifecycle">
  <Column gap="md">
    <ProcessFlow
      direction="horizontal"
      steps={[
        {
          title: "Generation",
          description: "Source systems produce data",
          icon: "📊",
          color: colors.blue
        },
        {
          title: "Storage",
          description: "Data is persisted",
          icon: "💾",
          color: colors.purple
        },
        {
          title: "Ingestion",
          description: "Data is gathered from sources",
          icon: "📥",
          color: colors.green
        },
        {
          title: "Transformation",
          description: "Data is changed into useful forms",
          icon: "⚙️",
          color: colors.orange
        },
        {
          title: "Serving",
          description: "Data delivered to end users",
          icon: "🎯",
          color: colors.red
        }
      ]}
    />
    <Box color={colors.slate} variant="subtle">
      Storage underpins all stages, occurring throughout the lifecycle
    </Box>
    <StackDiagram
      title="Undercurrents Supporting All Stages"
      layers={[
        { label: "Security", color: colors.red },
        { label: "Data Management", color: colors.blue },
        { label: "DataOps", color: colors.green },
        { label: "Data Architecture", color: colors.purple },
        { label: "Orchestration", color: colors.orange },
        { label: "Software Engineering", color: colors.slate }
      ]}
    />
  </Column>
</DiagramContainer>

> **Insight**
>
> The middle stages (storage, ingestion, transformation) can get a bit jumbled - and that's OK. Although we split out the distinct parts of the data engineering lifecycle, it's not always a neat, continuous flow. Various stages may repeat themselves, occur out of order, overlap, or weave together in interesting and unexpected ways.

### 1.1. The Data Lifecycle Versus the Data Engineering Lifecycle

<ComparisonTable
  beforeTitle="Full Data Lifecycle"
  afterTitle="Data Engineering Lifecycle"
  beforeColor={colors.blue}
  afterColor={colors.purple}
  items={[
    {
      label: "Scope",
      before: "Encompasses data across its entire lifespan",
      after: "Focuses on stages a data engineer controls"
    },
    {
      label: "Ownership",
      before: "Multiple stakeholders throughout organization",
      after: "Data engineering team's domain"
    },
    {
      label: "Coverage",
      before: "Includes business strategy, data creation, archival",
      after: "Generation, storage, ingestion, transformation, serving"
    },
    {
      label: "Relationship",
      before: "Superset containing all data activities",
      after: "Subset focused on technical implementation"
    }
  ]}
/>

**In plain English:** The data engineering lifecycle is like being responsible for a section of a highway - you maintain the roads, manage traffic flow, and ensure smooth transport. But you don't control where cars come from (generation) or where they ultimately go after leaving your section (business decisions).

**Why it matters:** Understanding this distinction clarifies the data engineer's role and responsibilities. You consume data from source systems you don't control, and you serve data to stakeholders who make business decisions you don't dictate. Your focus is on the technical excellence of the stages in between.

---

## 2. Generation: Source Systems

**In plain English:** A source system is where your data comes from - like a kitchen where ingredients originate. You don't run the kitchen (that's the application team's job), but you need to understand how it works, what it produces, and when deliveries arrive.

**In technical terms:** A source system is the origin of the data used in the data engineering lifecycle. Examples include IoT devices, application message queues, or transactional databases. A data engineer consumes data from a source system but doesn't typically own or control the source system itself.

**Why it matters:** Engineers need a working understanding of how source systems work, how they generate data, the frequency and velocity of the data, and the variety of data they generate. A major challenge is the dizzying array of data source systems engineers must work with and understand.

<DiagramContainer title="Common Source System Patterns">
  <Row gap="lg">
    <Column gap="sm" align="center">
      <Box color={colors.blue} variant="filled" icon="🖥️">Traditional Application + Database</Box>
      <Column gap="xs">
        <Row gap="xs">
          <Box color={colors.blue} variant="outlined" size="sm">App Server 1</Box>
          <Box color={colors.blue} variant="outlined" size="sm">App Server 2</Box>
          <Box color={colors.blue} variant="outlined" size="sm">App Server 3</Box>
        </Row>
        <Arrow direction="down" />
        <Box color={colors.purple} variant="filled">Relational Database</Box>
      </Column>
      <Box color={colors.slate} variant="subtle" size="sm">
        Popular since 1980s, includes microservices variants
      </Box>
    </Column>
    <Column gap="sm" align="center">
      <Box color={colors.green} variant="filled" icon="📡">IoT Swarm</Box>
      <Column gap="xs">
        <Row gap="xs">
          <Box color={colors.green} variant="outlined" size="sm" icon="📱">Device</Box>
          <Box color={colors.green} variant="outlined" size="sm" icon="📱">Device</Box>
          <Box color={colors.green} variant="outlined" size="sm" icon="📱">Device</Box>
        </Row>
        <Arrow direction="down" label="Send messages" />
        <Box color={colors.orange} variant="filled">Message Queue</Box>
      </Column>
      <Box color={colors.slate} variant="subtle" size="sm">
        Increasingly common with sensors and smart devices
      </Box>
    </Column>
  </Row>
</DiagramContainer>

:::warning Keep an Open Line of Communication
Engineers need to keep an open line of communication with source system owners on changes that could break pipelines and analytics. Application code might change the structure of data in a field, or the application team might migrate the backend to an entirely new database technology.
:::

### 2.1. Evaluating Source Systems: Key Engineering Considerations

When assessing source systems, data engineers must consider many factors:

<CardGrid
  columns={3}
  cards={[
    {
      title: "System Characteristics",
      icon: "🔍",
      color: colors.blue,
      items: [
        "What type of source? Application? IoT swarm?",
        "How is data persisted? Long-term or temporary?",
        "What data generation rate? Events per second?",
        "Expected consistency level?"
      ]
    },
    {
      title: "Data Quality & Reliability",
      icon: "✅",
      color: colors.green,
      items: [
        "How often do errors occur?",
        "Will data contain duplicates?",
        "Will values arrive late?",
        "Data quality checks in place?"
      ]
    },
    {
      title: "Schema & Dependencies",
      icon: "📋",
      color: colors.purple,
      items: [
        "What is the schema structure?",
        "How are schema changes communicated?",
        "Need to join across multiple systems?",
        "Upstream data dependencies?"
      ]
    },
    {
      title: "Performance & State",
      icon: "⚡",
      color: colors.orange,
      items: [
        "Will reading impact source performance?",
        "Snapshots or CDC for stateful systems?",
        "How frequently to pull data?",
        "Who provides the data transmission?"
      ]
    }
  ]}
/>

#### Understanding Schema Challenges

**In plain English:** A schema is like a blueprint that defines how data is organized - just as a house blueprint shows where rooms, doors, and windows go. But unlike physical blueprints, data schemas can change frequently as applications evolve.

**In technical terms:** The schema defines the hierarchical organization of data, from the whole source system down to individual tables and field structures. Schema handling varies: schemaless means the application defines schema as data is written, while fixed schema is enforced in the database.

**Why it matters:** Schema evolution is encouraged in Agile software development. A key part of the data engineer's job is taking raw data input in the source system schema and transforming this into valuable output for analytics. This job becomes more challenging as the source schema evolves.

<ComparisonTable
  beforeTitle="Schemaless"
  afterTitle="Fixed Schema"
  beforeColor={colors.orange}
  afterColor={colors.green}
  items={[
    {
      label: "Definition",
      before: "Application defines schema as data is written",
      after: "Database enforces predefined schema"
    },
    {
      label: "Examples",
      before: "MongoDB, message queues, blob storage",
      after: "Relational databases (PostgreSQL, MySQL)"
    },
    {
      label: "Flexibility",
      before: "High - easy to evolve schema",
      after: "Low - requires migrations for changes"
    },
    {
      label: "Challenge",
      before: "Downstream systems must handle variability",
      after: "Must plan schema changes carefully"
    }
  ]}
/>

> **Insight**
>
> "Schemaless" doesn't mean the absence of schema. Rather, it means that the application defines the schema as data is written, whether to a message queue, flat file, blob, or document database. Either schemaless or fixed schema models present challenges for data engineers.

---

## 3. Storage

**In plain English:** Storage is like choosing where to keep your stuff - you need the right container (warehouse, filing cabinet, or cloud) based on what you're storing, how often you access it, and how much you want to spend. It's one of the most complicated decisions because it impacts everything else.

**In technical terms:** Storage is a foundational stage that underpins all other parts of the data engineering lifecycle. It often occurs in multiple places in a data pipeline, with storage systems crossing over with source systems, ingestion, transformation, and serving.

**Why it matters:** Choosing a storage solution is key to success in the rest of the data lifecycle. The way data is stored impacts how it is used in all stages of the data engineering lifecycle. Many storage solutions support complex transformations and queries, blurring the lines between storage and processing.

<DiagramContainer title="Storage Across the Lifecycle">
  <Column gap="md">
    <Box color={colors.blue} variant="filled" size="lg" icon="💾">
      Storage as Foundation
    </Box>
    <Row gap="md">
      <Column gap="xs">
        <Box color={colors.purple} variant="outlined">Source Systems</Box>
        <Box color={colors.slate} variant="subtle" size="sm">Operational DBs</Box>
      </Column>
      <Column gap="xs">
        <Box color={colors.green} variant="outlined">Ingestion</Box>
        <Box color={colors.slate} variant="subtle" size="sm">Message queues</Box>
      </Column>
      <Column gap="xs">
        <Box color={colors.orange} variant="outlined">Transformation</Box>
        <Box color={colors.slate} variant="subtle" size="sm">Data warehouses</Box>
      </Column>
      <Column gap="xs">
        <Box color={colors.red} variant="outlined">Serving</Box>
        <Box color={colors.slate} variant="subtle" size="sm">Data marts</Box>
      </Column>
    </Row>
    <Box color={colors.blue} variant="subtle">
      Storage systems touch multiple stages - cloud data warehouses can store, process, and serve data simultaneously
    </Box>
  </Column>
</DiagramContainer>

:::caution Storage Complexity
Few data storage solutions function purely as storage. Many support complex transformation queries, and even object storage solutions may support powerful query capabilities (e.g., Amazon S3 Select). Understand the full capabilities of your storage systems.
:::

### 3.1. Evaluating Storage Systems: Key Engineering Considerations

<CardGrid
  columns={2}
  cards={[
    {
      title: "Performance & Scalability",
      icon: "⚡",
      color: colors.blue,
      items: [
        "Compatible with required write/read speeds?",
        "Will storage create a bottleneck?",
        "Handle anticipated future scale?",
        "Understand optimal usage patterns?"
      ]
    },
    {
      title: "Functionality & Schema",
      icon: "🔧",
      color: colors.purple,
      items: [
        "Pure storage or supports complex queries?",
        "Schema-agnostic, flexible, or enforced?",
        "Meet downstream SLA requirements?",
        "Support required query patterns?"
      ]
    },
    {
      title: "Metadata & Governance",
      icon: "📋",
      color: colors.green,
      items: [
        "Capturing schema evolution metadata?",
        "Track data lineage and flows?",
        "Master data and golden records tracking?",
        "Support data governance needs?"
      ]
    },
    {
      title: "Compliance & Cost",
      icon: "⚖️",
      color: colors.orange,
      items: [
        "Handle regulatory compliance?",
        "Support data sovereignty requirements?",
        "Understand cost structure?",
        "Geographic location restrictions?"
      ]
    }
  ]}
/>

### 3.2. Understanding Data Access Frequency

**In plain English:** Data temperature is like how you organize your closet - frequently worn clothes up front (hot), seasonal items on a shelf (lukewarm), and old costumes in storage (cold). Similarly, frequently accessed data needs fast retrieval, while archived data can be stored cheaply with slower access.

**In technical terms:** Data access frequency determines the "temperature" of your data. This impacts storage tier selection, with different performance and cost characteristics for hot, lukewarm, and cold data.

**Why it matters:** Retrieval patterns vary greatly based on the data being stored and queried. Matching data temperature to storage tier optimizes both performance and cost.

<CardGrid
  columns={3}
  cards={[
    {
      title: "Hot Data",
      icon: "🔥",
      color: colors.red,
      items: [
        "Retrieved many times per day",
        "Often several times per second",
        "Serves user requests directly",
        "Requires fast retrieval systems",
        "Example: Active user sessions"
      ]
    },
    {
      title: "Lukewarm Data",
      icon: "🌡️",
      color: colors.orange,
      items: [
        "Accessed every week or month",
        "Periodic reporting needs",
        "Moderate performance requirements",
        "Balance of cost and speed",
        "Example: Monthly analytics reports"
      ]
    },
    {
      title: "Cold Data",
      icon: "❄️",
      color: colors.blue,
      items: [
        "Seldom queried",
        "Compliance and archival purposes",
        "Cheap monthly storage costs",
        "High retrieval costs acceptable",
        "Example: 7-year audit records"
      ]
    }
  ]}
/>

> **Insight**
>
> In the "old days," cold data would be stored on tapes and shipped to remote archival facilities. In cloud environments, vendors offer specialized storage tiers with very cheap monthly storage costs but high prices for data retrieval. Plan your access patterns carefully.

### 3.3. Selecting a Storage System

**What type of storage solution should you use?**

There is **no one-size-fits-all universal storage recommendation**. The choice depends on:

- **Use cases** - Analytics, ML, operational, or archival?
- **Data volumes** - Gigabytes, terabytes, or petabytes?
- **Ingestion frequency** - Real-time streaming or daily batches?
- **Data format** - Structured, semi-structured, or unstructured?
- **Access patterns** - Hot, lukewarm, or cold?

<DiagramContainer title="Storage Decision Framework">
  <ProcessFlow
    direction="vertical"
    steps={[
      {
        title: "Assess Requirements",
        description: "Analyze use cases, volumes, and access patterns",
        icon: "🔍",
        color: colors.blue
      },
      {
        title: "Evaluate Trade-offs",
        description: "Consider performance, cost, scalability, complexity",
        icon: "⚖️",
        color: colors.purple
      },
      {
        title: "Choose Storage Type",
        description: "Data warehouse, lake, object storage, or hybrid",
        icon: "💾",
        color: colors.green
      },
      {
        title: "Validate & Iterate",
        description: "Test with real workloads, adjust as needed",
        icon: "🔄",
        color: colors.orange
      }
    ]}
  />
</DiagramContainer>

**Why it matters:** Every storage technology has its trade-offs. Countless varieties of storage technologies exist, and it's easy to be overwhelmed. Focus on understanding your requirements first, then match them to appropriate storage solutions.

---

## 4. Ingestion

**In plain English:** Ingestion is like receiving deliveries at a warehouse - you need to know when shipments arrive, check their quality, and decide where to put them. Sometimes deliveries trickle in one box at a time (streaming), other times they arrive in full truckloads (batch).

**In technical terms:** Data ingestion is the stage where you gather data from source systems. After understanding the data source, the characteristics of the source system, and how data is stored, you need to actually move the data into your pipeline.

**Why it matters:** Source systems and ingestion represent the most significant bottlenecks of the data engineering lifecycle. Source systems are normally outside your direct control and might randomly become unresponsive or provide poor quality data. Unreliable source and ingestion systems have a ripple effect across the entire lifecycle.

<DiagramContainer title="Ingestion Bottleneck Challenges">
  <Column gap="md">
    <Row gap="lg">
      <Column gap="sm">
        <Box color={colors.red} variant="filled" icon="⚠️">Source System Issues</Box>
        <Box color={colors.red} variant="outlined" size="sm">Outside your control</Box>
        <Box color={colors.red} variant="outlined" size="sm">Randomly unresponsive</Box>
        <Box color={colors.red} variant="outlined" size="sm">Poor data quality</Box>
      </Column>
      <Arrow direction="right" label="Leads to" />
      <Column gap="sm">
        <Box color={colors.orange} variant="filled" icon="🛑">Ingestion Problems</Box>
        <Box color={colors.orange} variant="outlined" size="sm">Mysterious failures</Box>
        <Box color={colors.orange} variant="outlined" size="sm">Data flow stops</Box>
        <Box color={colors.orange} variant="outlined" size="sm">Insufficient data quality</Box>
      </Column>
      <Arrow direction="right" label="Results in" />
      <Column gap="sm">
        <Box color={colors.purple} variant="filled" icon="💥">Downstream Impact</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Storage gaps</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Processing failures</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Serving delays</Box>
      </Column>
    </Row>
  </Column>
</DiagramContainer>

### 4.1. Key Engineering Considerations for the Ingestion Phase

When preparing to architect or build a system, consider these primary questions:

<CardGrid
  columns={2}
  cards={[
    {
      title: "Use Cases & Reusability",
      icon: "🎯",
      color: colors.blue,
      items: [
        "What are the use cases for ingested data?",
        "Can I reuse data vs creating multiple versions?",
        "What is the destination after ingestion?",
        "How frequently will I access the data?"
      ]
    },
    {
      title: "Reliability & Availability",
      icon: "🔄",
      color: colors.green,
      items: [
        "Are systems generating data reliably?",
        "Is data available when I need it?",
        "What volume will data arrive in?",
        "What format is the data in?"
      ]
    },
    {
      title: "Data Quality & Readiness",
      icon: "✅",
      color: colors.purple,
      items: [
        "Is source data ready for downstream use?",
        "For how long will it remain usable?",
        "What may cause it to become unusable?",
        "Can downstream systems handle the format?"
      ]
    },
    {
      title: "Transformation Needs",
      icon: "⚙️",
      color: colors.orange,
      items: [
        "Does streaming data need transformation?",
        "Is in-flight transformation appropriate?",
        "Transform within the stream itself?",
        "Or transform after landing?"
      ]
    }
  ]}
/>

### 4.2. Batch Versus Streaming

**In plain English:** All data is really streaming - it's produced continuously at its source. Batch is just grabbing a big chunk at once (like getting your mail once a day), while streaming processes data as it arrives (like reading messages as they come in).

**In technical terms:** Virtually all data is inherently streaming at its source. Batch ingestion is a specialized and convenient way of processing this stream in large chunks. Streaming ingestion provides data to downstream systems in a continuous, real-time fashion.

**Why it matters:** Batch ingestion is a one-way door - once data is broken into batches, latency for downstream consumers is inherently constrained. The choice between batch and streaming largely depends on use case and expectations for data timeliness.

<ComparisonTable
  beforeTitle="Batch Ingestion"
  afterTitle="Streaming Ingestion"
  beforeColor={colors.blue}
  afterColor={colors.green}
  items={[
    {
      label: "Processing Model",
      before: "Large chunks at predetermined intervals",
      after: "Continuous, real-time data flow"
    },
    {
      label: "Latency",
      before: "Hours to days (constrained by schedule)",
      after: "Seconds to milliseconds"
    },
    {
      label: "Use Cases",
      before: "ML training, weekly reporting, ETL jobs",
      after: "Real-time dashboards, fraud detection, monitoring"
    },
    {
      label: "Complexity",
      before: "Simpler to implement and maintain",
      after: "More complex infrastructure and code"
    },
    {
      label: "Cost",
      before: "Lower - established patterns",
      after: "Higher - specialized systems required"
    }
  ]}
/>

#### Key Considerations for Batch vs Stream Ingestion

:::warning Don't Go Streaming-First Without Justification
Despite the attractiveness of streaming-first, there are many trade-offs to understand. Streaming inherently brings extra costs and complexities. Batch is an excellent approach for many common use cases. Adopt true real-time streaming only after identifying a business use case that justifies the trade-offs.
:::

**Questions to ask yourself:**

<CardGrid
  columns={2}
  cards={[
    {
      title: "Performance & Scale",
      icon: "📈",
      color: colors.blue,
      items: [
        "Can downstream storage handle real-time flow rate?",
        "Need millisecond real-time or is micro-batch OK?",
        "Is streaming pipeline reliable with failover?",
        "Impact on live production source systems?"
      ]
    },
    {
      title: "Business Value & Cost",
      icon: "💰",
      color: colors.purple,
      items: [
        "What specific benefits from streaming?",
        "What actions improve upon batch approach?",
        "Cost in time, money, maintenance, downtime?",
        "Opportunity cost vs simply doing batch?"
      ]
    },
    {
      title: "Infrastructure & Tools",
      icon: "🛠️",
      color: colors.green,
      items: [
        "Managed service or self-hosted?",
        "Kinesis, Pub/Sub, Dataflow, or Kafka/Flink?",
        "Who will manage infrastructure?",
        "What are the trade-offs?"
      ]
    },
    {
      title: "ML Considerations",
      icon: "🤖",
      color: colors.orange,
      items: [
        "Benefits of online predictions?",
        "Is continuous training needed?",
        "Does model require real-time features?",
        "Batch training sufficient?"
      ]
    }
  ]}
/>

> **Insight**
>
> Many great ingestion frameworks handle both batch and micro-batch ingestion styles. We think batch is an excellent approach for many common use cases, such as model training and weekly reporting. The separation of storage and compute in many systems makes continuous processing more accessible, but evaluate the trade-offs carefully.

### 4.3. Push Versus Pull

**In plain English:** Push is like having groceries delivered to your door - the source sends data to you. Pull is like going to the store yourself - you go get the data from the source. Often you'll see both in the same pipeline as data moves through stages.

**In technical terms:** In the push model, a source system writes data out to a target (database, object store, or filesystem). In the pull model, data is retrieved from the source system. The line between push and pull can be quite blurry as data moves through various pipeline stages.

**Why it matters:** Understanding push vs pull helps you design efficient ingestion workflows. Different patterns work better for different scenarios - CDC typically uses push, while traditional ETL uses pull.

<DiagramContainer title="Push vs Pull Patterns">
  <Row gap="lg">
    <Column gap="sm" align="center">
      <Box color={colors.blue} variant="filled" size="lg">Pull Pattern (ETL)</Box>
      <Column gap="xs">
        <Box color={colors.green} variant="outlined">Ingestion System</Box>
        <Arrow direction="down" label="Query snapshot" />
        <Box color={colors.blue} variant="outlined">Source Database</Box>
        <Arrow direction="up" label="Return data" />
      </Column>
      <Box color={colors.slate} variant="subtle" size="sm">
        Ingestion system queries source on fixed schedule
      </Box>
    </Column>
    <Column gap="sm" align="center">
      <Box color={colors.purple} variant="filled" size="lg">Push Pattern (CDC)</Box>
      <Column gap="xs">
        <Box color={colors.purple} variant="outlined">Source Database</Box>
        <Arrow direction="down" label="Push to logs" />
        <Box color={colors.orange} variant="outlined">Binary Logs / Queue</Box>
        <Arrow direction="down" label="Read logs" />
        <Box color={colors.green} variant="outlined">Ingestion System</Box>
      </Column>
      <Box color={colors.slate} variant="subtle" size="sm">
        Database pushes changes; ingestion reads logs
      </Box>
    </Column>
  </Row>
</DiagramContainer>

**Common Patterns:**

1. **Traditional ETL (Pull)** - Ingestion system queries source database snapshot on fixed schedule
2. **Continuous CDC (Push)** - Database triggers message every time a row changes, pushed to queue
3. **Binary Log CDC (Hybrid)** - Database pushes to logs; ingestion system reads logs without database interaction
4. **Timestamp-based CDC (Pull)** - Ingestion system queries for rows changed since previous update
5. **Direct Streaming (Push)** - Data bypasses database, pushed directly to event-streaming platform

> **Insight**
>
> With streaming ingestion, data bypasses a backend database and is pushed directly to an endpoint, typically with data buffered by an event-streaming platform. This pattern is growing in popularity as it simplifies real-time processing and greatly simplifies the lives of data engineers.

---

## 5. Transformation

**In plain English:** Transformation is like cooking - you take raw ingredients (ingested data) and turn them into something delicious and useful (reports, analytics, ML features). Without transformation, data sits there like raw vegetables - technically edible but not very useful.

**In technical terms:** After ingesting and storing data, transformation changes data from its original form into something useful for downstream use cases. Without proper transformations, data will sit inert and not be in a useful form for reports, analysis, or ML.

**Why it matters:** The transformation stage is where data begins to create value for downstream user consumption. Transformations map data into correct types, apply business logic, create aggregations for reporting, and featurize data for ML processes.

<DiagramContainer title="Transformation Journey">
  <ProcessFlow
    direction="vertical"
    steps={[
      {
        title: "Basic Transformations",
        description: "Map to correct types, standardize formats, remove bad records",
        icon: "🔧",
        color: colors.blue
      },
      {
        title: "Schema Transformations",
        description: "Transform schema, apply normalization",
        icon: "📋",
        color: colors.purple
      },
      {
        title: "Business Logic",
        description: "Apply business rules, data modeling, create reusable elements",
        icon: "💼",
        color: colors.green
      },
      {
        title: "Analytics & ML",
        description: "Large-scale aggregation, feature engineering for ML",
        icon: "🎯",
        color: colors.orange
      }
    ]}
  />
</DiagramContainer>

### 5.1. Key Considerations for the Transformation Phase

When considering data transformations, evaluate these factors:

<CardGrid
  columns={3}
  cards={[
    {
      title: "Business Value",
      icon: "💰",
      color: colors.blue,
      items: [
        "What's the cost and ROI?",
        "What is the associated business value?",
        "Does this support business goals?",
        "Is the value worth the effort?"
      ]
    },
    {
      title: "Simplicity & Isolation",
      icon: "🎯",
      color: colors.green,
      items: [
        "Is transformation simple as possible?",
        "Is it self-isolated?",
        "Can it be tested independently?",
        "Easy to debug and maintain?"
      ]
    },
    {
      title: "Business Rules",
      icon: "📋",
      color: colors.purple,
      items: [
        "What business rules do transformations support?",
        "Standard approach for implementing logic?",
        "Reusable across organization?",
        "Aligned with business definitions?"
      ]
    }
  ]}
/>

#### Batch vs Streaming Transformations

**In plain English:** Just like ingestion, you can transform data in big batches or as it flows through in real-time. Batch is still most popular, but streaming transformations are growing as stream-processing tools improve.

**Why it matters:** Logically, transformation is a standalone area, but in practice it's often entangled in other lifecycle phases. Transformations happen in source systems, during ingestion, and throughout the pipeline.

<DiagramContainer title="Where Transformations Happen">
  <Column gap="md">
    <Row gap="md">
      <Box color={colors.blue} variant="outlined">Source System</Box>
      <Arrow direction="right" label="Add timestamps" />
      <Box color={colors.purple} variant="outlined">Ingestion</Box>
      <Arrow direction="right" label="Enrich fields" />
      <Box color={colors.green} variant="outlined">Storage</Box>
      <Arrow direction="right" label="Apply business logic" />
      <Box color={colors.orange} variant="outlined">Transformation</Box>
    </Row>
    <Box color={colors.slate} variant="subtle">
      Transformations are ubiquitous throughout the lifecycle - data preparation, wrangling, and cleaning add value everywhere
    </Box>
  </Column>
</DiagramContainer>

#### Business Logic as Transformation Driver

**In plain English:** Business logic transforms raw data into meaningful business concepts. A "sale" isn't just numbers in a database - it means "somebody bought 12 picture frames from me for $30 each, or $360 in total." Without this logic, CFOs can't understand financial health.

**In technical terms:** Business logic is a major driver of data transformation, often implemented through data modeling. Data translates business logic into reusable elements. Data modeling is critical for obtaining a clear and current picture of business processes.

**Why it matters:** A simple view of raw transactions isn't useful without adding the logic of business and accounting rules. Ensure a standard approach for implementing business logic across your transformations.

#### Data Featurization for ML

**In plain English:** Featurization is like preparing ingredients for a specific recipe - you don't just dump raw data into an ML model. You extract and enhance specific features that help the model learn (like calculating "days since last purchase" from raw transaction dates).

**In technical terms:** Data featurization extracts and enhances data features useful for training ML models. It combines domain expertise (identifying important features for prediction) with extensive data science experience.

**Why it matters:** Once data scientists determine how to featurize data, featurization processes can be automated by data engineers in the transformation stage of a data pipeline.

---

## 6. Serving Data

**In plain English:** Serving is where the magic happens - all that work collecting, storing, and transforming data finally pays off. This is when analysts generate insights, ML models make predictions, and business users get value from data.

**In technical terms:** Data serving is the final stage where ingested, stored, and transformed data is delivered for practical purposes. The goal is to get value from your data through analytics, ML, or reverse ETL.

**Why it matters:** Data has value when it's used for practical purposes. Data that is not consumed or queried is simply inert. Data vanity projects are a major risk - companies gather massive datasets that are never consumed in any useful way. Data projects must be intentional across the lifecycle.

<DiagramContainer title="Data Serving Use Cases">
  <Row gap="lg">
    <Column gap="sm" align="center">
      <Box color={colors.blue} variant="filled" icon="📊" size="lg">Analytics</Box>
      <Column gap="xs">
        <Box color={colors.blue} variant="outlined" size="sm">Business Intelligence</Box>
        <Box color={colors.blue} variant="outlined" size="sm">Operational Analytics</Box>
        <Box color={colors.blue} variant="outlined" size="sm">Embedded Analytics</Box>
      </Column>
    </Column>
    <Column gap="sm" align="center">
      <Box color={colors.green} variant="filled" icon="🤖" size="lg">Machine Learning</Box>
      <Column gap="xs">
        <Box color={colors.green} variant="outlined" size="sm">Model Training</Box>
        <Box color={colors.green} variant="outlined" size="sm">Feature Stores</Box>
        <Box color={colors.green} variant="outlined" size="sm">Online Predictions</Box>
      </Column>
    </Column>
    <Column gap="sm" align="center">
      <Box color={colors.purple} variant="filled" icon="🔄" size="lg">Reverse ETL</Box>
      <Column gap="xs">
        <Box color={colors.purple} variant="outlined" size="sm">Feed to Source Systems</Box>
        <Box color={colors.purple} variant="outlined" size="sm">SaaS Platforms</Box>
        <Box color={colors.purple} variant="outlined" size="sm">CRM / Ad Platforms</Box>
      </Column>
    </Column>
  </Row>
</DiagramContainer>

:::warning Avoid Data Vanity Projects
Many companies pursued vanity projects in the big data era, gathering massive datasets in data lakes that were never consumed. The cloud era is triggering a new wave of vanity projects. What is the ultimate business purpose of the data so carefully collected, cleaned, and stored?
:::

### 6.1. Analytics

**In plain English:** Analytics is the core of most data work - turning data into insights through reports, dashboards, and analysis. It's evolved beyond traditional BI to include real-time operational analytics and customer-facing embedded analytics.

**In technical terms:** Analytics is the core of most data endeavors. Once data is stored and transformed, you're ready to generate reports, dashboards, and perform ad hoc analysis. Modern analytics encompasses BI, operational analytics, and embedded analytics.

**Why it matters:** Analytics moves companies from ad hoc data analysis to self-service analytics, democratizing data access to business users. This requires good data quality, breaking down organizational silos, and ensuring adequate data skills across the organization.

<CardGrid
  columns={3}
  cards={[
    {
      title: "Business Intelligence (BI)",
      icon: "📈",
      color: colors.blue,
      items: [
        "Describe past and current state",
        "Uses business logic to process data",
        "Logic-on-read increasingly popular",
        "Self-service analytics for all users",
        "Unified business definitions"
      ]
    },
    {
      title: "Operational Analytics",
      icon: "⚡",
      color: colors.green,
      items: [
        "Fine-grained operational details",
        "Promote immediate actions",
        "Live inventory views",
        "Real-time health dashboards",
        "Focus on present, not historical"
      ]
    },
    {
      title: "Embedded Analytics",
      icon: "🎯",
      color: colors.purple,
      items: [
        "Customer-facing analytics",
        "High request rates",
        "Complex access control critical",
        "Each customer sees only their data",
        "Data leak = massive breach of trust"
      ]
    }
  ]}
/>

#### Business Intelligence Details

**Logic-on-Read Approach:**

**In plain English:** Instead of baking business logic into the data during transformation (logic-on-write), logic-on-read stores data in a fairly raw form and applies business definitions when querying. It's like keeping ingredients separate and combining them based on the recipe at cooking time.

**In technical terms:** A logic-on-read approach stores data in a clean but fairly raw form with minimal postprocessing business logic. A BI system maintains a repository of business logic and definitions, using this to query the data warehouse so reports and dashboards align with business definitions.

**Why it matters:** This approach provides flexibility - you can change business definitions without reprocessing historical data. The BI system becomes the single source of truth for business logic.

#### Embedded Analytics Security

:::danger Critical: Prevent Data Leakage
With embedded analytics, businesses may serve separate analytics to thousands or more customers. Each customer must see their data and ONLY their data. A data leak between customers would be a massive breach of trust, leading to media attention and significant customer loss.

**Key requirement:** Minimize blast radius related to data leaks. Apply tenant- or data-level security within storage and anywhere there's a possibility of data leakage.
:::

**Multitenancy Approaches:**

<ComparisonTable
  beforeTitle="Shared Tables with Views"
  afterTitle="Separate Tables per Customer"
  beforeColor={colors.orange}
  afterColor={colors.green}
  items={[
    {
      label: "Data Storage",
      before: "All customers in common tables",
      after: "Each customer has dedicated tables"
    },
    {
      label: "Access Control",
      before: "Logical views with filters and controls",
      after: "Database-level isolation"
    },
    {
      label: "Internal Analytics",
      before: "Easy unified view across customers",
      after: "Must aggregate across tables"
    },
    {
      label: "Risk Level",
      before: "Higher - filter must be perfect",
      after: "Lower - physical separation"
    }
  ]}
/>

> **Insight**
>
> Data engineers must understand the minutiae of multitenancy in the systems they deploy to ensure absolute data security and isolation. All cloud services are multitenant at various grains - ensure proper isolation through correct configuration.

### 6.2. Machine Learning

**In plain English:** ML is exciting, but don't jump in too early. You need a solid data foundation first - like building a sturdy house before adding fancy smart home features. Get good at analytics before tackling ML.

**In technical terms:** Once organizations reach a high level of data maturity, they can begin to identify problems amenable to ML and organize a practice around it. The responsibilities of data engineers overlap significantly in analytics and ML, with fuzzy boundaries between data engineering, ML engineering, and analytics engineering.

**Why it matters:** Data engineers may support Spark clusters for analytics and ML training, provide orchestration systems, and support metadata systems tracking data history and lineage. Setting domains of responsibility and reporting structures is a critical organizational decision.

<DiagramContainer title="Data Engineering & ML Engineering Overlap">
  <Row gap="lg">
    <Column gap="sm">
      <Box color={colors.blue} variant="filled">Data Engineering</Box>
      <Box color={colors.blue} variant="outlined" size="sm">Data pipelines</Box>
      <Box color={colors.blue} variant="outlined" size="sm">Storage systems</Box>
      <Box color={colors.blue} variant="outlined" size="sm">Data quality</Box>
    </Column>
    <Column gap="sm">
      <Box color={colors.purple} variant="filled">Shared Responsibilities</Box>
      <Box color={colors.purple} variant="outlined" size="sm">Feature stores</Box>
      <Box color={colors.purple} variant="outlined" size="sm">Orchestration</Box>
      <Box color={colors.purple} variant="outlined" size="sm">Metadata & cataloging</Box>
    </Column>
    <Column gap="sm">
      <Box color={colors.green} variant="filled">ML Engineering</Box>
      <Box color={colors.green} variant="outlined" size="sm">Model training</Box>
      <Box color={colors.green} variant="outlined" size="sm">Model deployment</Box>
      <Box color={colors.green} variant="outlined" size="sm">Online predictions</Box>
    </Column>
  </Row>
</DiagramContainer>

#### Feature Stores

**In plain English:** A feature store is like a shared ingredients pantry for ML teams - it maintains a history of features, supports sharing between teams, and handles operational tasks like backfilling so ML engineers can focus on building models.

**In technical terms:** Feature stores are a recently developed tool combining data engineering and ML engineering. They reduce operational burden by maintaining feature history and versions, supporting feature sharing among teams, and providing operational and orchestration capabilities.

**Why it matters:** In practice, data engineers are part of the core support team for feature stores to support ML engineering.

#### Key Considerations for ML Serving

<CardGrid
  columns={2}
  cards={[
    {
      title: "Data Quality & Discovery",
      icon: "🔍",
      color: colors.blue,
      items: [
        "Data of sufficient quality for feature engineering?",
        "Quality requirements developed with consuming teams?",
        "Is data discoverable by data scientists?",
        "Can ML engineers easily find valuable data?"
      ]
    },
    {
      title: "Boundaries & Representation",
      icon: "⚖️",
      color: colors.purple,
      items: [
        "Where are technical boundaries with ML engineering?",
        "Organizational boundaries clear?",
        "Does dataset represent ground truth properly?",
        "Is it unfairly biased?"
      ]
    }
  ]}
/>

:::warning Build Your Foundation First
Companies often prematurely dive into ML. Before investing resources into ML, take time to build a solid data foundation. This means setting up the best systems and architecture across the data engineering and ML lifecycle. It's generally best to develop competence in analytics before moving to ML.
:::

> **Insight**
>
> Should a data engineer be familiar with ML? It certainly helps. Maintain operational knowledge about partner teams. A good data engineer is conversant in fundamental ML techniques, use cases for models within their company, and responsibilities of analytics teams. This maintains efficient communication and facilitates collaboration.

### 6.3. Reverse ETL

**In plain English:** Reverse ETL is like taking insights from your analysis and sending them back to the systems where work happens - like calculating optimal ad bids in your data warehouse, then pushing those bids to Google Ads automatically.

**In technical terms:** Reverse ETL takes processed data from the output side of the data engineering lifecycle and feeds it back into source systems. This allows taking analytics, scored models, etc., and feeding these back into production systems or SaaS platforms.

**Why it matters:** Though long viewed as an antipattern, reverse ETL is beneficial and often necessary. As businesses rely increasingly on SaaS and external platforms, reverse ETL has become especially important for pushing metrics to customer data platforms, CRM systems, and advertising platforms.

<DiagramContainer title="Reverse ETL Pattern">
  <Row gap="md">
    <Box color={colors.blue} variant="outlined">Source Systems</Box>
    <Arrow direction="right" label="Extract data" />
    <Box color={colors.purple} variant="outlined">Data Warehouse</Box>
    <Arrow direction="right" label="Transform & analyze" />
    <Box color={colors.green} variant="outlined">Analytics / ML Models</Box>
    <Arrow direction="left" label="Push insights back (Reverse ETL)" />
  </Row>
  <Box color={colors.orange} variant="subtle">
    Example: Calculate bids in data warehouse, upload to Google Ads
  </Box>
</DiagramContainer>

**Modern Reverse ETL Tools:**

<CardGrid
  columns={2}
  cards={[
    {
      title: "Dedicated Vendors",
      icon: "🚀",
      color: colors.blue,
      items: [
        "Hightouch",
        "Census",
        "Built specifically for reverse ETL",
        "Integration with major platforms"
      ]
    },
    {
      title: "Common Use Cases",
      icon: "🎯",
      color: colors.purple,
      items: [
        "Push metrics to CRM systems",
        "Send bids to advertising platforms",
        "Update customer data platforms",
        "Sync scored leads to sales tools"
      ]
    }
  ]}
/>

> **Insight**
>
> The jury is out on whether the term "reverse ETL" will stick. Some engineers claim we can eliminate it by handling transformations in event streams and sending events back to source systems. Realizing widespread adoption is another matter. The gist: transformed data will need to be returned to source systems in some manner, ideally with correct lineage and business process.

---

## 7. Major Undercurrents Across the Data Engineering Lifecycle

**In plain English:** If the data lifecycle stages are the visible floors of a building, undercurrents are the foundation, plumbing, electrical, and HVAC systems that make everything work. You can't see them directly, but nothing functions without them.

**In technical terms:** Undercurrents are practices - security, data management, DataOps, data architecture, orchestration, and software engineering - that support every aspect of the data engineering lifecycle. No part of the lifecycle can adequately function without these undercurrents.

**Why it matters:** Data engineering is maturing beyond just focusing on technology. Continued abstraction and simplification of tools have shifted focus up the value chain, incorporating traditional enterprise practices (data management, cost optimization) and newer practices (DataOps).

<StackDiagram
  title="Undercurrents Supporting the Data Engineering Lifecycle"
  layers={[
    { label: "Data Engineering Lifecycle Stages", color: colors.blue },
    { label: "Security", color: colors.red },
    { label: "Data Management", color: colors.purple },
    { label: "DataOps", color: colors.green },
    { label: "Data Architecture", color: colors.orange },
    { label: "Orchestration", color: colors.blue },
    { label: "Software Engineering", color: colors.slate }
  ]}
/>

### 7.1. Security

**In plain English:** Security is like locking your doors and windows - it seems basic, but ignore it and you'll eventually have a catastrophe. Don't give everyone admin access just because it's easier. Give people only what they need, nothing more.

**In technical terms:** Data engineers must understand both data and access security, exercising the principle of least privilege. This means giving a user or system access to only the essential data and resources to perform an intended function.

**Why it matters:** Security must be top of mind for data engineers. Those who ignore it do so at their peril. People and organizational structure are always the biggest security vulnerabilities in any company. Create a culture of security that permeates the organization.

<CardGrid
  columns={2}
  cards={[
    {
      title: "Principle of Least Privilege",
      icon: "🔒",
      color: colors.red,
      items: [
        "Give users only access they need today",
        "Nothing more than required",
        "Don't operate from root shell unnecessarily",
        "Don't use superuser role for simple queries",
        "Prevent accidental damage"
      ]
    },
    {
      title: "Data Protection",
      icon: "🛡️",
      color: colors.blue,
      items: [
        "Protect data in flight and at rest",
        "Use encryption, tokenization, masking",
        "Apply obfuscation where appropriate",
        "Simple, robust access controls",
        "Timing - access only when needed"
      ]
    }
  ]}
/>

:::danger Common Antipattern: Admin Access for All
We see data engineers with little security experience give admin access to all users. This is a catastrophe waiting to happen! Imposing the principle of least privilege on ourselves can prevent accidental damage and keep you in a security-first mindset.
:::

**Security Best Practices for Data Engineers:**

1. **Understand Security Administration** - Competent security administration is part of a data engineer's domain
2. **Cloud and On-Prem** - Know security best practices for both environments
3. **IAM Knowledge** - User and identity access management, roles, policies, groups
4. **Network Security** - Understand network security, password policies, encryption
5. **Culture First** - First line of defense is creating a culture of security

> **Insight**
>
> When we hear about major security breaches in the media, it often turns out someone in the company ignored basic precautions, fell victim to phishing, or acted irresponsibly. All individuals with access to data must understand their responsibility in protecting the company's sensitive data and its customers.

### 7.2. Data Management

**In plain English:** Data management sounds corporate and boring, but it's actually crucial. It's like having filing systems, labels, and catalogs in a library - without them, you have a pile of books you can't find or use. Data management is becoming accessible to companies of all sizes.

**In technical terms:** Data management is the development, execution, and supervision of plans, policies, programs, and practices that deliver, control, protect, and enhance the value of data and information assets throughout their lifecycle.

**Why it matters:** Data best practices once reserved for huge companies (data governance, master data management, data quality management, metadata management) are now filtering down to companies of all sizes. Data engineering is becoming "enterprisey" - and this is ultimately a great thing!

**DAMA Definition:**

> Data management is the development, execution, and supervision of plans, policies, programs, and practices that deliver, control, protect, and enhance the value of data and information assets throughout their lifecycle.

**Key Facets of Data Management:**

<CardGrid
  columns={3}
  cards={[
    {
      title: "Governance & Quality",
      icon: "⚖️",
      color: colors.blue,
      items: [
        "Data governance",
        "Discoverability",
        "Accountability",
        "Data quality management"
      ]
    },
    {
      title: "Modeling & Design",
      icon: "📐",
      color: colors.purple,
      items: [
        "Data modeling and design",
        "Data lineage",
        "Storage and operations",
        "Data integration"
      ]
    },
    {
      title: "Lifecycle & Ethics",
      icon: "♻️",
      color: colors.green,
      items: [
        "Data lifecycle management",
        "Advanced analytics & ML systems",
        "Ethics and privacy",
        "Compliance"
      ]
    }
  ]}
/>

#### Data Governance

**In plain English:** Data governance is like having rules and systems for managing a library - who can access which books, how to catalog new arrivals, what to do when books are damaged. Without it, you get chaos, untrusted data, and potentially security breaches.

**In technical terms:** Data governance is a data management function to ensure the quality, integrity, security, and usability of the data collected by an organization. It engages people, processes, and technologies to maximize data value while protecting data with appropriate security controls.

**Why it matters:** When data governance is accidental and haphazard, side effects range from untrusted data to security breaches. Being intentional about data governance maximizes the organization's data capabilities and value generated from data.

**Example of Poor Data Governance:**

<DiagramContainer title="Data Governance Failure Scenario">
  <ProcessFlow
    direction="vertical"
    steps={[
      {
        title: "Analyst Gets Request",
        description: "Needs report but doesn't know what data to use",
        icon: "❓",
        color: colors.orange
      },
      {
        title: "Digs Through Tables",
        description: "Spends hours guessing which fields might be useful",
        icon: "🔍",
        color: colors.red
      },
      {
        title: "Creates 'Directionally Correct' Report",
        description: "Not sure if underlying data is accurate or sound",
        icon: "📊",
        color: colors.orange
      },
      {
        title: "Report Questioned",
        description: "Recipient questions validity; trust erodes",
        icon: "⚠️",
        color: colors.red
      },
      {
        title: "Business Impact",
        description: "Company confused about performance, planning impossible",
        icon: "💥",
        color: colors.red
      }
    ]}
  />
</DiagramContainer>

**Core Categories of Data Governance:**

<CardGrid
  columns={3}
  cards={[
    {
      title: "Discoverability",
      icon: "🔍",
      color: colors.blue,
      items: [
        "Data must be available",
        "Quick, reliable access",
        "Know where data comes from",
        "Understand relationships",
        "Metadata management",
        "Master data management"
      ]
    },
    {
      title: "Security",
      icon: "🔒",
      color: colors.red,
      items: [
        "Appropriate security controls",
        "Protect sensitive data",
        "Prevent unauthorized access",
        "Encryption and masking",
        "Access control systems"
      ]
    },
    {
      title: "Accountability",
      icon: "👤",
      color: colors.purple,
      items: [
        "Assign individual ownership",
        "Coordinate governance activities",
        "Data quality responsibility",
        "Not necessarily data engineers",
        "Cross-functional coordination"
      ]
    }
  ]}
/>

#### Metadata

**In plain English:** Metadata is "data about data" - like the card catalog in a library that tells you what books exist, where they are, who wrote them, and what they're about. Without metadata, you can't find or understand your data.

**In technical terms:** Metadata underpins every section of the data engineering lifecycle. It's exactly the data needed to make data discoverable and governable. We divide metadata into two major categories: autogenerated and human generated.

**Why it matters:** Modern data engineering revolves around automation, but metadata collection is often manual and error prone. Technology can assist, but key challenges remain around interoperability, standards, and keeping humans in the loop.

**Four Main Categories of Metadata:**

<CardGrid
  columns={2}
  cards={[
    {
      title: "Business Metadata",
      icon: "💼",
      color: colors.blue,
      items: [
        "How data is used in business",
        "Business and data definitions",
        "Data rules and logic",
        "How and where data is used",
        "Data owner(s)",
        "Example: What is a 'customer'?"
      ]
    },
    {
      title: "Technical Metadata",
      icon: "⚙️",
      color: colors.purple,
      items: [
        "Data created and used by systems",
        "Data model and schema",
        "Data lineage",
        "Field mappings",
        "Pipeline workflows",
        "Pipeline metadata, schema, lineage"
      ]
    },
    {
      title: "Operational Metadata",
      icon: "📊",
      color: colors.green,
      items: [
        "Operational results of systems",
        "Process statistics",
        "Job IDs and runtime logs",
        "Data used in a process",
        "Error logs",
        "Success/failure determination"
      ]
    },
    {
      title: "Reference Metadata",
      icon: "📚",
      color: colors.orange,
      items: [
        "Data to classify other data",
        "Also called lookup data",
        "Internal codes",
        "Geographic codes",
        "Units of measurement",
        "Standards for interpreting data"
      ]
    }
  ]}
/>

**Metadata Technology Landscape:**

> **Insight**
>
> We're seeing a proliferation of data catalogs, data-lineage tracking systems, and metadata management tools. Tools can crawl databases for relationships and monitor pipelines to track data flows. However, interoperability and standards are still lacking. Metadata tools are only as good as their connectors and ability to share metadata.

**Human-Oriented Metadata:**

<DiagramContainer title="Social Aspect of Metadata">
  <Column gap="md">
    <Box color={colors.blue} variant="filled">Data Has a Social Element</Box>
    <Row gap="md">
      <Box color={colors.purple} variant="outlined">Data Owners</Box>
      <Box color={colors.green} variant="outlined">Data Consumers</Box>
      <Box color={colors.orange} variant="outlined">Domain Experts</Box>
    </Row>
    <Box color={colors.slate} variant="subtle">
      Organizations accumulate social capital and knowledge around processes, datasets, and pipelines
    </Box>
    <Row gap="md">
      <Box color={colors.blue} variant="outlined">Documentation Tools</Box>
      <Box color={colors.purple} variant="outlined">Internal Wikis</Box>
      <Box color={colors.green} variant="outlined">Automated Catalogs</Box>
    </Row>
    <Box color={colors.orange} variant="subtle">
      Human tools should integrate with automated data cataloging
    </Box>
  </Column>
</DiagramContainer>

#### Data Accountability

**In plain English:** Data accountability is like assigning a building manager for each floor - they don't fix everything themselves, but they coordinate with everyone who works on that floor to keep things running smoothly.

**In technical terms:** Data accountability means assigning an individual to govern a portion of data. The responsible person coordinates the governance activities of other stakeholders. Managing data quality is tough if no one is accountable for the data in question.

**Why it matters:** The accountable person might be a software engineer, product manager, or other role - not necessarily a data engineer. They don't have all resources necessary to maintain quality but coordinate with all people who touch the data.

**Levels of Accountability:**

- **Table or log stream level** - Broad ownership of data sources
- **Field entity level** - Fine-grained (e.g., customer ID across many systems)
- **Data domain level** - Set of all possible values for a field type

> **Insight**
>
> An individual may be accountable for managing a customer ID across many systems. For enterprise data management, a data domain is the set of all possible values that can occur for a given field type. This may seem excessively bureaucratic and meticulous, but it can significantly affect data quality.

#### Data Quality

> **"Can I trust this data?"**
>
> — Everyone in the business

**In plain English:** Data quality asks: "What do you get compared with what you expect?" It's like ordering a pizza - you expect certain toppings, correct temperature, timely delivery. Data quality ensures data conforms to expectations.

**In technical terms:** Data quality is the optimization of data toward the desired state, orbiting the question "What do you get compared with what you expect?" Data should conform to expectations in business metadata and match the definition agreed upon by the business.

**Why it matters:** A data engineer ensures data quality across the entire data engineering lifecycle. This involves performing data-quality tests, ensuring conformance to schema expectations, data completeness, and precision.

**Three Main Characteristics of Data Quality:**

<CardGrid
  columns={3}
  cards={[
    {
      title: "Accuracy",
      icon: "🎯",
      color: colors.blue,
      items: [
        "Is collected data factually correct?",
        "Are there duplicate values?",
        "Are numeric values accurate?",
        "Example: Separating bots from humans"
      ]
    },
    {
      title: "Completeness",
      icon: "✅",
      color: colors.green,
      items: [
        "Are records complete?",
        "Do all required fields contain valid values?",
        "Any missing critical data?",
        "Example: All customer records have email"
      ]
    },
    {
      title: "Timeliness",
      icon: "⏰",
      color: colors.purple,
      items: [
        "Are records available in timely fashion?",
        "How to handle late-arriving data?",
        "Standards for late data?",
        "Example: Offline video platform ad billing"
      ]
    }
  ]}
/>

**Complex Timeliness Example:**

> **Insight**
>
> In the Google paper introducing the Dataflow model, the authors give the example of an offline video platform that displays ads. The platform downloads video and ads while connected, allows offline watching, then uploads ad view data once reconnected. This data may arrive late, well after ads are watched. How does the platform handle billing? This problem can't be solved by purely technical means - engineers must determine standards for late-arriving data.

#### Master Data Management (MDM)

**In plain English:** MDM is like creating a company phone directory with one correct entry per person - even if they work in multiple departments or have moved offices. It maintains "golden records" that harmonize entity data across the organization.

**In technical terms:** Master data is data about business entities such as employees, customers, products, and locations. MDM is the practice of building consistent entity definitions known as golden records that harmonize entity data across an organization and with its partners.

**Why it matters:** As organizations grow larger and more complex through organic growth and acquisitions, maintaining a consistent picture of entities and identities becomes increasingly challenging. MDM is a business operations process facilitated by building and deploying technology tools.

<DiagramContainer title="Master Data Management Example">
  <Column gap="md">
    <Box color={colors.blue} variant="filled">Challenge: Multiple Customer Records</Box>
    <Row gap="md">
      <Box color={colors.red} variant="outlined">Sales System: John Smith, 123 Main St</Box>
      <Box color={colors.red} variant="outlined">Support System: J. Smith, 123 Main Street</Box>
      <Box color={colors.red} variant="outlined">Billing System: John A. Smith, 123 Main St.</Box>
    </Row>
    <Arrow direction="down" label="MDM Process" />
    <Box color={colors.green} variant="filled">Golden Record: John Smith, 123 Main Street</Box>
    <Box color={colors.slate} variant="subtle">
      MDM team determines standard format for addresses, builds API to return consistent addresses
    </Box>
  </Column>
</DiagramContainer>

**MDM Responsibilities:**

- May fall under data engineering purview
- Often assigned to dedicated team working across organization
- Data engineers must always be aware and may collaborate on initiatives
- Reaches across full data cycle into operational databases

#### Data Modeling and Design

**In plain English:** Data modeling is organizing data into a usable form - like organizing a grocery store so customers can find items easily. Without modeling, you have a data swamp where nothing is usable despite being technically "stored."

**In technical terms:** Data modeling and design is the process for converting data into a usable form to derive business insights through business analytics and data science. It can happen almost anywhere - firmware engineers, web developers, DBAs, and ETL developers all perform data modeling.

**Why it matters:** Data modeling has become more challenging due to variety of new data sources and use cases. Strict normalization doesn't work well with event data. Fortunately, new tools increase flexibility while retaining logical separations of measures, dimensions, attributes, and hierarchies.

**Modern Data Modeling Capabilities:**

<CardGrid
  columns={2}
  cards={[
    {
      title: "Cloud Data Warehouses",
      icon: "☁️",
      color: colors.blue,
      items: [
        "Ingest enormous quantities of denormalized data",
        "Support semistructured data",
        "Still support Kimball, Inmon, Data Vault patterns",
        "Flexible yet structured"
      ]
    },
    {
      title: "Processing Frameworks",
      icon: "⚙️",
      color: colors.purple,
      items: [
        "Spark ingests whole spectrum of data",
        "Flat structured relational records",
        "Raw unstructured text",
        "Everything in between"
      ]
    }
  ]}
/>

:::warning Don't Give Up on Data Modeling
With the wide variety of data engineers must cope with, there's a temptation to throw up our hands and give up on data modeling. This is a terrible idea with harrowing consequences, made evident by the "write once, read never" (WORN) access pattern and "data swamp" references. Data engineers need to understand modeling best practices and develop flexibility to apply appropriate level and type of modeling.
:::

#### Data Lineage

**In plain English:** Data lineage is like a family tree for your data - it shows where data came from, what happened to it along the way, and what other data it depends on. Essential for debugging, compliance, and understanding data quality.

**In technical terms:** Data lineage describes the recording of an audit trail of data through its lifecycle, tracking both the systems that process the data and the upstream data it depends on.

**Why it matters:** Data lineage helps with error tracking, accountability, and debugging of data and systems that process it. It provides an audit trail for the data lifecycle and helps with compliance. For example, if a user wants data deleted, lineage shows where data is stored and its dependencies.

<DiagramContainer title="Data Lineage Example">
  <ProcessFlow
    direction="horizontal"
    steps={[
      {
        title: "Source System",
        description: "Customer database",
        icon: "📊",
        color: colors.blue
      },
      {
        title: "Ingestion",
        description: "Daily ETL process",
        icon: "📥",
        color: colors.purple
      },
      {
        title: "Transformation",
        description: "Join with orders, aggregate",
        icon: "⚙️",
        color: colors.green
      },
      {
        title: "Data Mart",
        description: "Customer analytics table",
        icon: "🎯",
        color: colors.orange
      }
    ]}
  />
  <Box color={colors.slate} variant="subtle">
    Lineage tracks: systems that touched data, upstream dependencies, transformations applied
  </Box>
</DiagramContainer>

**Data Observability Driven Development (DODD):**

> **Insight**
>
> Andy Petrella's concept of DODD is closely related to data lineage. DODD observes data all along its lineage. This process is applied during development, testing, and finally production to deliver quality and conformity to expectations.

#### Data Integration and Interoperability

**In plain English:** Integration is like making sure all your devices can talk to each other - your phone works with your laptop, which works with your cloud storage. As we use more diverse tools, integration becomes a bigger part of the job.

**In technical terms:** Data integration and interoperability is the process of integrating data across tools and processes. As we move from single-stack analytics to heterogeneous cloud environments with various tools processing data on demand, integration occupies an ever-widening swath of the data engineer's job.

**Why it matters:** Increasingly, integration happens through general-purpose APIs rather than custom database connections. While complexity of interacting with data systems has decreased, the number of systems and pipeline complexity has dramatically increased.

**Modern Integration Pattern Example:**

<DiagramContainer title="API-Based Integration">
  <Column gap="sm">
    <Box color={colors.blue} variant="outlined">Pull data from Salesforce API</Box>
    <Arrow direction="down" />
    <Box color={colors.purple} variant="outlined">Store to Amazon S3</Box>
    <Arrow direction="down" />
    <Box color={colors.green} variant="outlined">Call Snowflake API to load into table</Box>
    <Arrow direction="down" />
    <Box color={colors.orange} variant="outlined">Call API again to run query</Box>
    <Arrow direction="down" />
    <Box color={colors.blue} variant="outlined">Export results to S3 for Spark</Box>
  </Column>
  <Box color={colors.slate} variant="subtle">
    Managed with relatively simple Python code talking to data systems rather than handling data directly
  </Box>
</DiagramContainer>

> **Insight**
>
> Engineers starting from scratch quickly outgrow the capabilities of bespoke scripting and stumble into the need for orchestration. This is why orchestration is one of our key undercurrents.

#### Data Lifecycle Management

**In plain English:** Data lifecycle management is about knowing when to archive or delete data - both to save money (cloud storage adds up) and comply with laws (GDPR "right to be forgotten"). The days of keeping everything forever are over.

**In technical terms:** The advent of data lakes encouraged ignoring data archival and destruction. Two changes encourage engineers to pay more attention: pay-as-you-go cloud storage costs and privacy laws (GDPR, CCPA) requiring active data destruction.

**Why it matters:** When every byte shows up on a monthly AWS statement, CFOs see opportunities for savings. Privacy laws require data engineers to know what consumer data they retain and have procedures to destroy data in response to requests and compliance requirements.

<ComparisonTable
  beforeTitle="On-Premises Data Lake Era"
  afterTitle="Cloud Era"
  beforeColor={colors.orange}
  afterColor={colors.green}
  items={[
    {
      label: "Cost Model",
      before: "Large up-front capital expenditures",
      after: "Pay-as-you-go storage costs"
    },
    {
      label: "Archival Strategy",
      before: "Why discard data? Add more storage",
      after: "Archive to cheap tiers, delete when needed"
    },
    {
      label: "Deletion",
      before: "Write-once, read-many was default",
      after: "Tools for easy deletion at scale"
    },
    {
      label: "Compliance",
      before: "Keep everything indefinitely",
      after: "Active management for GDPR/CCPA"
    }
  ]}
/>

**Modern Archival & Deletion Tools:**

- **Cloud Archival Tiers** - Extremely low-cost long-term retention (retrieval costs higher)
- **Cloud Data Warehouses** - SQL semantics allow deletion of rows with WHERE clause
- **Hive ACID & Delta Lake** - Easy management of deletion transactions at scale
- **Metadata Tools** - Streamline end of data engineering lifecycle

#### Ethics and Privacy

**In plain English:** Ethics and privacy are about doing the right thing with data even when no one is watching - because eventually everyone will be watching. Data breaches and mishandling make headlines and destroy trust. Take this seriously.

**In technical terms:** The last several years of data breaches, misinformation, and data mishandling make one thing clear: data impacts people. Whereas data's ethical and privacy implications were once nice to have, they're now central to the general data lifecycle.

**Why it matters:** Regulatory requirements and compliance penalties are only growing. Ensure your data assets are compliant with regulations such as GDPR and CCPA. Data engineers need to do the right thing because it's the right thing to do.

**Impact on Data Engineering Lifecycle:**

<CardGrid
  columns={3}
  cards={[
    {
      title: "PII Masking",
      icon: "🎭",
      color: colors.blue,
      items: [
        "Mask personally identifiable information",
        "Protect sensitive information",
        "Anonymize where possible",
        "Tokenize when needed"
      ]
    },
    {
      title: "Bias Tracking",
      icon: "⚖️",
      color: colors.purple,
      items: [
        "Identify bias in datasets",
        "Track as data is transformed",
        "Document biases discovered",
        "Mitigate unfair biases"
      ]
    },
    {
      title: "Regulatory Compliance",
      icon: "📋",
      color: colors.green,
      items: [
        "GDPR compliance",
        "CCPA compliance",
        "Growing number of regulations",
        "Severe penalties for violations"
      ]
    }
  ]}
/>

:::danger Take Ethics and Privacy Seriously
Data used to live in the Wild West, freely collected and traded like baseball cards. Those days are long gone. We hope that more organizations will encourage a culture of good data ethics and privacy. Please take this seriously.
:::

### 7.3. DataOps

**In plain English:** DataOps is like applying the best practices from manufacturing and software development to data work - continuous improvement, rapid iteration, automated quality checks, and quick response to problems. It's about culture first, tools second.

**In technical terms:** DataOps maps the best practices of Agile methodology, DevOps, and statistical process control (SPC) to data. Whereas DevOps aims to improve the release and quality of software products, DataOps does the same thing for data products.

**Why it matters:** Data products differ from software products because of how data is used. A software product provides specific functionality; a data product is built around sound business logic and metrics whose users make decisions or build models. DataOps reduces time to value through people, processes, and technology.

**Data Kitchen's Definition:**

> DataOps is a collection of technical practices, workflows, cultural norms, and architectural patterns that enable:
>
> - Rapid innovation and experimentation delivering new insights to customers with increasing velocity
> - Extremely high data quality and very low error rates
> - Collaboration across complex arrays of people, technology, and environments
> - Clear measurement, monitoring, and transparency of results

<DiagramContainer title="The Three Pillars of DataOps">
  <Row gap="lg">
    <Column gap="sm" align="center">
      <Box color={colors.blue} variant="filled" icon="🤖" size="lg">Automation</Box>
      <Column gap="xs">
        <Box color={colors.blue} variant="outlined" size="sm">Change management</Box>
        <Box color={colors.blue} variant="outlined" size="sm">CI/CD pipelines</Box>
        <Box color={colors.blue} variant="outlined" size="sm">Configuration as code</Box>
        <Box color={colors.blue} variant="outlined" size="sm">Version control</Box>
      </Column>
    </Column>
    <Column gap="sm" align="center">
      <Box color={colors.purple} variant="filled" icon="👁️" size="lg">Observability & Monitoring</Box>
      <Column gap="xs">
        <Box color={colors.purple} variant="outlined" size="sm">Monitor data quality</Box>
        <Box color={colors.purple} variant="outlined" size="sm">System health tracking</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Logging and alerting</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Statistical process control</Box>
      </Column>
    </Column>
    <Column gap="sm" align="center">
      <Box color={colors.green} variant="filled" icon="🚨" size="lg">Incident Response</Box>
      <Column gap="xs">
        <Box color={colors.green} variant="outlined" size="sm">Rapid root cause ID</Box>
        <Box color={colors.green} variant="outlined" size="sm">Quick resolution</Box>
        <Box color={colors.green} variant="outlined" size="sm">Blameless communication</Box>
        <Box color={colors.green} variant="outlined" size="sm">Proactive issue finding</Box>
      </Column>
    </Column>
  </Row>
</DiagramContainer>

**DataOps Cultural Habits:**

First and foremost, DataOps is a set of **cultural habits**:

- Communicating and collaborating with the business
- Breaking down silos
- Continuously learning from successes and mistakes
- Rapid iteration

Only when these cultural habits are in place can the team get the best results from technology and tools.

#### Automation

**In plain English:** Automation is like having robots handle repetitive tasks so humans can focus on creative work. It ensures consistency, allows quick feature deployment, and reduces human error. Think of it as evolving from manual cron jobs to sophisticated orchestration.

**In technical terms:** Automation enables reliability and consistency in the DataOps process and allows data engineers to quickly deploy new product features and improvements to existing workflows. Framework includes change management, CI/CD, and configuration as code.

**Why it matters:** Like DevOps, DataOps automation monitors and maintains reliability of technology and systems, with the added dimension of checking for data quality, data/model drift, and metadata integrity.

**Evolution of DataOps Automation:**

<DiagramContainer title="DataOps Automation Maturity Journey">
  <ProcessFlow
    direction="vertical"
    steps={[
      {
        title: "Low Maturity: Cron Jobs",
        description: "Schedule transformations with cron, works until it doesn't",
        icon: "⏰",
        color: colors.red
      },
      {
        title: "Growing Maturity: Orchestration",
        description: "Adopt Airflow/Dagster, check dependencies before running",
        icon: "🔄",
        color: colors.orange
      },
      {
        title: "High Maturity: Automated Deployment",
        description: "Test DAGs before deployment, monitor new DAGs, validate dependencies",
        icon: "🚀",
        color: colors.green
      },
      {
        title: "Continuous Improvement",
        description: "Next-gen orchestration, auto-generated DAGs from lineage",
        icon: "📈",
        color: colors.blue
      }
    ]}
  />
</DiagramContainer>

**Problems Solved by Automation:**

<CardGrid
  columns={2}
  cards={[
    {
      title: "Cron Job Problems",
      icon: "⚠️",
      color: colors.red,
      items: [
        "Instance operational problems stop jobs",
        "Tight job spacing causes failures",
        "Long-running jobs cause downstream failures",
        "Engineers unaware of failures until users report",
        "No dependency management"
      ]
    },
    {
      title: "Orchestration Benefits",
      icon: "✅",
      color: colors.green,
      items: [
        "Dependencies checked before jobs run",
        "Jobs start when upstream data is ready",
        "More jobs packed into given time",
        "Automated DAG deployment with testing",
        "Monitoring ensures proper DAG operation"
      ]
    }
  ]}
/>

> **Insight**
>
> One of the tenets of the DataOps Manifesto is "Embrace change." This doesn't mean change for the sake of change but rather goal-oriented change. At each stage of the automation journey, opportunities exist for operational improvement. Engineers constantly seek to implement improvements that reduce workload and increase business value.

#### Observability and Monitoring

> **"Data is a silent killer."**

**In plain English:** Observability and monitoring are like having security cameras and smoke detectors - they alert you to problems before they become disasters. Without them, bad data can linger in reports for months or years, leading to catastrophic business decisions.

**In technical terms:** Observability, monitoring, logging, alerting, and tracing are all critical to getting ahead of problems along the data engineering lifecycle. Incorporate statistical process control (SPC) to understand whether events being monitored are out of line and which incidents are worth responding to.

**Why it matters:** We've seen countless examples of bad data lingering in reports for months or years. Executives make key decisions from bad data, discovering errors only much later. The outcomes are usually bad and sometimes catastrophic for the business.

**Data Horror Stories:**

<DiagramContainer title="Observability Failure Scenarios">
  <Column gap="md">
    <Row gap="lg">
      <Column gap="sm">
        <Box color={colors.red} variant="filled" icon="💀">Silent Data Issues</Box>
        <Box color={colors.red} variant="outlined" size="sm">Bad data in reports for months</Box>
        <Box color={colors.red} variant="outlined" size="sm">Executives make key decisions</Box>
        <Box color={colors.red} variant="outlined" size="sm">Error discovered much later</Box>
        <Box color={colors.red} variant="outlined" size="sm">Catastrophic business impact</Box>
      </Column>
      <Column gap="sm">
        <Box color={colors.orange} variant="filled" icon="🛑">System Failures</Box>
        <Box color={colors.orange} variant="outlined" size="sm">Systems randomly stop working</Box>
        <Box color={colors.orange} variant="outlined" size="sm">Reports delayed for days</Box>
        <Box color={colors.orange} variant="outlined" size="sm">Team learns from stakeholders</Box>
        <Box color={colors.orange} variant="outlined" size="sm">Trust erodes, silos form</Box>
      </Column>
    </Row>
  </Column>
</DiagramContainer>

**Data Observability Driven Development (DODD):**

Petrella's DODD method is much like test-driven development (TDD) in software engineering:

> The purpose of DODD is to give everyone involved in the data chain visibility into the data and data applications so that everyone involved in the data value chain has the ability to identify changes to the data or data applications at every step - from ingestion to transformation to analysis - to help troubleshoot or prevent data issues.

**Why it matters:** DODD focuses on making data observability a first-class consideration in the data engineering lifecycle.

#### Incident Response

**In plain English:** Incident response is about fixing problems quickly and learning from them without blame. Things will break - the question is whether you're prepared to respond swiftly and efficiently, preferably finding issues before users report them.

**In technical terms:** A high-functioning data team using DataOps will ship new data products quickly, but mistakes will inevitably happen. Incident response uses automation and observability capabilities to rapidly identify root causes and resolve issues as reliably and quickly as possible.

**Why it matters:** Incident response isn't just about technology and tools - it's about open and blameless communication, both on the data engineering team and across the organization. As Werner Vogels says, "Everything breaks all the time."

<ComparisonTable
  beforeTitle="Reactive Incident Response"
  afterTitle="Proactive Incident Response"
  beforeColor={colors.red}
  afterColor={colors.green}
  items={[
    {
      label: "Discovery",
      before: "Stakeholders report problems",
      after: "Team finds issues before users"
    },
    {
      label: "User Experience",
      before: "Users unhappy to report issues",
      after: "Users see issues actively being resolved"
    },
    {
      label: "Trust Impact",
      before: "Trust erodes with each incident",
      after: "Trust builds through transparency"
    },
    {
      label: "Team Perception",
      before: "Seen as reactive and unreliable",
      after: "Seen as proactive and trustworthy"
    }
  ]}
/>

> **Insight**
>
> Trust takes a long time to build and can be lost in minutes. Incident response is as much about retroactively responding to incidents as proactively addressing them before they happen. Data engineers should proactively find issues before the business reports them.

#### DataOps Summary

**Current State:**

At this point, DataOps is still a work in progress. Practitioners have done a good job of adapting DevOps principles to the data domain and mapping out an initial vision through the DataOps Manifesto and other resources.

**The State of Operations in Data Engineering:**

- Still quite immature compared with software engineering
- Many tools (especially legacy monoliths) are not automation-first
- Recent movement to adopt automation best practices across lifecycle
- Tools like Airflow paved the way for new generation of tools
- General practices are aspirational

**Recommendation:**

Data engineers would do well to make DataOps practices a high priority in all their work. The up-front effort will see significant long-term payoff through:

- Faster delivery of products
- Better reliability and accuracy of data
- Greater overall value for the business

### 7.4. Data Architecture

**In plain English:** Data architecture is the blueprint for your data systems - both current state and future vision. Because requirements change rapidly and new tools arrive constantly, data engineers must understand good architecture to adapt and evolve.

**In technical terms:** A data architecture reflects the current and future state of data systems that support an organization's long-term data needs and strategy. It's an undercurrent that touches every stage of the data engineering lifecycle.

**Why it matters:** A data engineer must understand business needs, gather requirements for new use cases, and translate those requirements to design new ways to capture and serve data, balanced for cost and operational simplicity.

<DiagramContainer title="Data Architecture Responsibilities">
  <ProcessFlow
    direction="vertical"
    steps={[
      {
        title: "Understand Business Needs",
        description: "Gather requirements for new use cases",
        icon: "💼",
        color: colors.blue
      },
      {
        title: "Design Capture & Serving",
        description: "Translate requirements to technical design",
        icon: "📐",
        color: colors.purple
      },
      {
        title: "Evaluate Trade-offs",
        description: "Balance cost and operational simplicity",
        icon: "⚖️",
        color: colors.green
      },
      {
        title: "Know Design Patterns",
        description: "Understand technologies and tools across lifecycle",
        icon: "🧩",
        color: colors.orange
      }
    ]}
  />
</DiagramContainer>

**Data Engineer vs Data Architect:**

This doesn't imply a data engineer is a data architect - these are typically two separate roles:

<ComparisonTable
  beforeTitle="Data Engineer"
  afterTitle="Data Architect"
  beforeColor={colors.blue}
  afterColor={colors.purple}
  items={[
    {
      label: "Primary Focus",
      before: "Implementation and delivery",
      after: "Design and strategy"
    },
    {
      label: "Day-to-Day Work",
      before: "Build pipelines, manage data",
      after: "Create architectural plans"
    },
    {
      label: "Collaboration",
      before: "Deliver on architect's designs",
      after: "Design systems for engineers to build"
    },
    {
      label: "Feedback Loop",
      before: "Provide architectural feedback",
      after: "Receive implementation feedback"
    }
  ]}
/>

> **Insight**
>
> Chapter 3 covers data architecture in depth. Data architecture is an undercurrent of the data engineering lifecycle, requiring engineers to know trade-offs with design patterns, technologies, and tools across source systems, ingestion, storage, transformation, and serving data.

### 7.5. Orchestration

> **"We think that orchestration matters because we view it as really the center of gravity of both the data platform as well as the data lifecycle, the software development lifecycle as it comes to data."**
>
> — Nick Schrock, founder of Elementl

**In plain English:** Orchestration is like a conductor leading an orchestra - it coordinates many jobs to run in the right order at the right time, making sure each piece waits for the right moment and has what it needs to succeed.

**In technical terms:** Orchestration is the process of coordinating many jobs to run as quickly and efficiently as possible on a scheduled cadence. It's not just scheduling (like cron) - it builds in metadata on job dependencies, generally in the form of a directed acyclic graph (DAG).

**Why it matters:** Orchestration is not only a central DataOps process but also a critical part of the engineering and deployment flow for data jobs. It's the center of gravity for both the data platform and the data lifecycle.

<ComparisonTable
  beforeTitle="Pure Scheduler (Cron)"
  afterTitle="Orchestration Engine (Airflow)"
  beforeColor={colors.orange}
  afterColor={colors.green}
  items={[
    {
      label: "Awareness",
      before: "Aware only of time",
      after: "Metadata on job dependencies (DAG)"
    },
    {
      label: "Dependencies",
      before: "No dependency management",
      after: "Tasks run when dependencies complete"
    },
    {
      label: "Monitoring",
      before: "No built-in monitoring",
      after: "Monitors jobs and external systems"
    },
    {
      label: "Capabilities",
      before: "Simple time-based scheduling",
      after: "Job history, visualization, alerting, backfills"
    }
  ]}
/>

#### Core Orchestration Capabilities

<CardGrid
  columns={2}
  cards={[
    {
      title: "Dependency Management",
      icon: "🔗",
      color: colors.blue,
      items: [
        "Monitor jobs and kick off tasks when dependencies complete",
        "Monitor external systems for data arrival",
        "Watch for criteria to be met",
        "Set error conditions and send alerts",
        "High availability with constant monitoring"
      ]
    },
    {
      title: "Advanced Features",
      icon: "🚀",
      color: colors.purple,
      items: [
        "Job history capabilities",
        "Visualization of workflows",
        "Alerting through email or other channels",
        "Backfill new DAGs or individual tasks",
        "Dependencies over time ranges (e.g., monthly jobs)"
      ]
    }
  ]}
/>

**Example Alert Configuration:**

> **Insight**
>
> You might set an expected completion time of 10 a.m. for overnight daily data pipelines. If jobs are not done by this time, alerts go out to data engineers and consumers.

#### The Evolution of Orchestration

<DiagramContainer title="Orchestration History">
  <ProcessFlow
    direction="vertical"
    steps={[
      {
        title: "Pre-2010s: Enterprise Tools",
        description: "Expensive, out of reach of startups, not extensible",
        icon: "🏢",
        color: colors.red
      },
      {
        title: "2010s: Apache Oozie",
        description: "Popular but designed for Hadoop, difficult in heterogeneous environments",
        icon: "🐘",
        color: colors.orange
      },
      {
        title: "2014: Airflow Released",
        description: "Open source, Python-based, highly extensible, widely adopted",
        icon: "🌊",
        color: colors.green
      },
      {
        title: "2020s: Next-Gen Tools",
        description: "Prefect, Dagster, Metaflow - improved portability, testability, metadata",
        icon: "🚀",
        color: colors.blue
      }
    ]}
  />
</DiagramContainer>

**Key Orchestration Tools:**

- **Apache Airflow** - Mindshare leader, open source from inception, Python-based, highly extensible
- **Prefect & Dagster** - Improve portability and testability, easier local to production migration
- **Argo** - Built around Kubernetes primitives
- **Metaflow** - Netflix project for data science orchestration

> **Insight**
>
> Airflow arrived just as data processing was becoming more abstract and accessible, and engineers were increasingly interested in coordinating complex flows across multiple processors and storage systems, especially in cloud environments.

#### Orchestration vs Streaming

:::warning Orchestration is a Batch Concept
We must point out that orchestration is strictly a batch concept. The streaming alternative to orchestrated task DAGs is the streaming DAG. Streaming DAGs remain challenging to build and maintain, but next-generation streaming platforms such as Pulsar aim to dramatically reduce the engineering and operational burden.
:::

### 7.6. Software Engineering

**In plain English:** Despite increasing abstraction, data engineers still need strong software engineering skills. You're writing less low-level code than before, but you still need to write clean, testable code and understand software engineering best practices.

**In technical terms:** Software engineering has always been a central skill for data engineers. Though abstraction continues (cloud data warehouses use SQL, Spark uses dataframes), software engineering remains critical to data engineering across the lifecycle.

**Why it matters:** Core data processing code still needs to be written. Whether in ingestion, transformation, or serving, data engineers need to be highly proficient in frameworks and languages such as Spark, SQL, or Beam.

<CardGrid
  columns={2}
  cards={[
    {
      title: "Historical Evolution",
      icon: "📚",
      color: colors.blue,
      items: [
        "2000-2010: Low-level frameworks, MapReduce in C/C++/Java",
        "Mid-2010s: Frameworks abstracting low-level details",
        "Today: Cloud data warehouses with SQL, user-friendly Spark",
        "Future: Continued abstraction, but code still essential"
      ]
    },
    {
      title: "Testing Methodologies",
      icon: "🧪",
      color: colors.green,
      items: [
        "Unit testing",
        "Regression testing",
        "Integration testing",
        "End-to-end testing",
        "Smoke testing"
      ]
    }
  ]}
/>

#### Core Data Processing Code

**In plain English:** Though easier to manage than before, you still need to write code for data processing. SQL is code - don't let anyone tell you otherwise. Master your frameworks and understand proper testing methodologies.

**Why it matters:** Data processing code appears throughout the data engineering lifecycle - in ingestion, transformation, and data serving. Proficiency in frameworks like Spark, SQL, or Beam is imperative.

> **Insight**
>
> We reject the notion that SQL is not code. SQL is a powerful programming language that requires the same care, testing, and best practices as any other code.

#### Development of Open Source Frameworks

**In plain English:** Many data engineers contribute to open source frameworks. They adopt tools to solve problems, then improve the tools for their use cases and contribute back to the community. It's a virtuous cycle of improvement.

**In technical terms:** Data engineers are heavily involved in developing open source frameworks. Tool speciation hasn't slowed, but emphasis has shifted up the abstraction ladder, away from direct data processing toward managing, enhancing, connecting, optimizing, and monitoring data.

**Why it matters:** Before engineering new internal tools, survey the landscape of publicly available tools. Keep an eye on total cost of ownership (TCO) and opportunity cost. There's a good chance an open source project already exists - collaborate rather than reinventing the wheel.

**Evolution of Open Source Tools:**

<DiagramContainer title="Shifting Focus of Open Source Tools">
  <Row gap="lg">
    <Column gap="sm" align="center">
      <Box color={colors.blue} variant="filled">Big Data Era</Box>
      <Box color={colors.slate} variant="subtle" size="sm">2010s</Box>
      <Column gap="xs">
        <Box color={colors.blue} variant="outlined" size="sm">MapReduce</Box>
        <Box color={colors.blue} variant="outlined" size="sm">Hadoop ecosystem</Box>
        <Box color={colors.blue} variant="outlined" size="sm">Data processing focus</Box>
      </Column>
    </Column>
    <Arrow direction="right" label="Evolution" />
    <Column gap="sm" align="center">
      <Box color={colors.purple} variant="filled">Modern Era</Box>
      <Box color={colors.slate} variant="subtle" size="sm">2020s</Box>
      <Column gap="xs">
        <Box color={colors.purple} variant="outlined" size="sm">Orchestration (Prefect, Dagster)</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Metadata management</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Data quality monitoring</Box>
      </Column>
    </Column>
  </Row>
</DiagramContainer>

**Example Evolution: Orchestration Space**

> **Insight**
>
> Airflow dominated the orchestration space from 2015 until the early 2020s. Now, a new batch of open source competitors (including Prefect, Dagster, and Metaflow) has sprung up to fix perceived limitations of Airflow, providing better metadata handling, portability, and dependency management. Where the future of orchestration goes is anyone's guess.

#### Streaming

**In plain English:** Streaming is inherently more complicated than batch. Tasks like joins that are simple in batch become complex in real-time. Engineers must handle windowing, state management, and other challenges while choosing from many frameworks.

**In technical terms:** Streaming data processing is inherently more complicated than batch, and the tools and paradigms are arguably less mature. As streaming data becomes more pervasive, data engineers face interesting software engineering problems.

**Why it matters:** Data processing tasks like joins become more complicated in real time, requiring more complex software engineering. Engineers must also write code to apply various windowing methods for calculating trailing statistics.

**Streaming Framework Options:**

<CardGrid
  columns={2}
  cards={[
    {
      title: "Function Platforms",
      icon: "⚡",
      color: colors.blue,
      items: [
        "OpenFaaS",
        "AWS Lambda",
        "Google Cloud Functions",
        "Handle individual events",
        "Serverless execution"
      ]
    },
    {
      title: "Stream Processors",
      icon: "🌊",
      color: colors.purple,
      items: [
        "Spark Structured Streaming",
        "Apache Beam",
        "Apache Flink",
        "Apache Pulsar",
        "Analyze streams for reporting and actions"
      ]
    }
  ]}
/>

#### Infrastructure as Code (IaC)

**In plain English:** IaC means managing your infrastructure with code files instead of clicking through web consoles. It's like having a recipe you can version control and run repeatedly, instead of trying to remember manual steps.

**In technical terms:** IaC applies software engineering practices to the configuration and management of infrastructure. When data engineers manage infrastructure in cloud environments, they increasingly use IaC frameworks rather than manually spinning up instances and installing software.

**Why it matters:** These practices are vital for DevOps, allowing version control and repeatability of deployments. Naturally, these capabilities are vital throughout the data engineering lifecycle, especially as we adopt DataOps practices.

**IaC Capabilities:**

- Several general-purpose and cloud-platform-specific frameworks
- Automated infrastructure deployment based on specifications
- Many frameworks can manage cloud services as well as infrastructure
- Container and Kubernetes IaC using tools like Helm

#### Pipelines as Code

**In plain English:** Pipelines as code means defining your data workflows in code (typically Python) instead of drawing them in a GUI. The orchestration engine reads your code and runs the steps using available resources.

**In technical terms:** Pipelines as code is the core concept of present-day orchestration systems, which touch every stage of the data engineering lifecycle. Data engineers use code to declare data tasks and dependencies among them.

**Why it matters:** This approach provides version control, testability, and repeatability for data pipelines. It's a fundamental practice for modern data engineering.

#### General-Purpose Problem Solving

**In plain English:** No matter how good your tools are, you'll hit corner cases requiring custom code. Be ready to write something yourself when existing connectors or features don't exist.

**In technical terms:** Regardless of high-level tools adopted, data engineers will run into corner cases throughout the lifecycle that require solving problems outside tool boundaries and writing custom code.

**Why it matters:** When using frameworks like Fivetran, Airbyte, or Matillion, data engineers will encounter data sources without existing connectors. They should be proficient in software engineering to understand APIs, pull and transform data, handle exceptions, and so forth.

---

## 8. Conclusion

**In plain English:** The data engineering lifecycle provides a mental model for organizing data work beyond just picking technologies. As tools become more abstract, data engineers can think and act at a higher level, focusing on lifecycle management principles.

**In technical terms:** Most past discussions about data engineering involved technologies but missed the bigger picture of data lifecycle management. The data engineering lifecycle, supported by its undercurrents, is an extremely useful mental model for organizing the work of data engineering.

**Why it matters:** As technologies become more abstract and do more heavy lifting, a data engineer has the opportunity to think and act on a higher level. This framework helps organize work around lifecycle stages and undercurrents rather than specific tools.

<DiagramContainer title="The Complete Data Engineering Lifecycle">
  <Column gap="md">
    <Box color={colors.blue} variant="filled" size="lg">Data Engineering Lifecycle Stages</Box>
    <Row gap="md">
      <Box color={colors.blue} variant="outlined">Generation</Box>
      <Arrow direction="right" />
      <Box color={colors.purple} variant="outlined">Storage</Box>
      <Arrow direction="right" />
      <Box color={colors.green} variant="outlined">Ingestion</Box>
      <Arrow direction="right" />
      <Box color={colors.orange} variant="outlined">Transformation</Box>
      <Arrow direction="right" />
      <Box color={colors.red} variant="outlined">Serving</Box>
    </Row>
    <Box color={colors.slate} variant="subtle">
      Storage underpins all stages
    </Box>
    <StackDiagram
      title="Undercurrents Supporting All Stages"
      layers={[
        { label: "Security", color: colors.red },
        { label: "Data Management", color: colors.blue },
        { label: "DataOps", color: colors.green },
        { label: "Data Architecture", color: colors.purple },
        { label: "Orchestration", color: colors.orange },
        { label: "Software Engineering", color: colors.slate }
      ]}
    />
  </Column>
</DiagramContainer>

### Top-Level Goals for Data Engineers

A data engineer has several top-level goals across the data lifecycle:

<CardGrid
  columns={3}
  cards={[
    {
      title: "Optimize ROI & Reduce Costs",
      icon: "💰",
      color: colors.blue,
      items: [
        "Produce optimum return on investment",
        "Reduce financial costs",
        "Reduce opportunity costs",
        "Make efficient technology choices"
      ]
    },
    {
      title: "Reduce Risk",
      icon: "🛡️",
      color: colors.red,
      items: [
        "Minimize security risks",
        "Improve data quality",
        "Reduce compliance risks",
        "Build reliable systems"
      ]
    },
    {
      title: "Maximize Data Value",
      icon: "📈",
      color: colors.green,
      items: [
        "Maximize data value and utility",
        "Enable business decisions",
        "Support analytics and ML",
        "Deliver actionable insights"
      ]
    }
  ]}
/>

### What's Next?

The next two chapters discuss how these elements impact good architecture design, along with choosing the right technologies:

- **Chapter 3: Designing Good Data Architecture** - Principles, patterns, and examples
- **Chapter 4: Choosing Technologies** - Evaluation frameworks and decision-making

If you feel comfortable with these topics, feel free to skip ahead to Part II, where we cover each of the stages of the data engineering lifecycle in depth.

> **Insight**
>
> The data engineering lifecycle is a framework for understanding "cradle to grave" data engineering. Every part of the lifecycle has undercurrents supporting it. Master both the stages and undercurrents to become an effective data engineer.

---

## Additional Resources

- **"A Comparison of Data Processing Frameworks"** by Ludovic Santos
- **DAMA International** - Data Management Association website
- **"The Dataflow Model: A Practical Approach to Balancing Correctness, Latency, and Cost"** by Tyler Akidau et al.
- **"Data Processing"** - Wikipedia page
- **"Data Transformation"** - Wikipedia page
- **"Democratizing Data at Airbnb"** by Chris Williams et al.
- **"Five Steps to Begin Collecting the Value of Your Data"** - Lean-Data web page
- **"Getting Started with DevOps Automation"** by Jared Murrell
- **"Incident Management in the Age of DevOps"** - Atlassian web page
- **"An Introduction to Dagster: The Orchestrator for the Full Data Lifecycle"** - Video by Nick Schrock
- **"Is DevOps Related to DataOps?"** by Carol Jang and Jove Kuang
- **"The Seven Stages of Effective Incident Response"** - Atlassian web page
- **"Staying Ahead of Debt"** by Etai Mizrahi
- **"What Is Metadata"** by Michelle Knight
- **Data Governance: The Definitive Guide** by Evren Eryurek et al.
- **DataOps Manifesto** - datakitchen.io

---

**Previous:** [Chapter 1: Data Engineering Described](./chapter1) | **Next:** [Chapter 3: Designing Good Data Architecture](./chapter3)
