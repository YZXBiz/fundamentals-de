---
sidebar_position: 8
title: "Chapter 7: Ingestion"
description: "Master data ingestion patterns, batch and streaming considerations, key engineering principles, and the technologies that enable moving data from source systems into storage"
---

import {
  Box, Arrow, Row, Column, Group,
  DiagramContainer, ProcessFlow, TreeDiagram,
  CardGrid, StackDiagram, ComparisonTable,
  colors
} from '@site/src/components/diagrams';

# Chapter 7: Ingestion

> **"The bulk of software engineering is just plumbing."**
>
> — Karl Hughes

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [What Is Data Ingestion?](#2-what-is-data-ingestion)
   - 2.1. [Data Pipelines Defined](#21-data-pipelines-defined)
3. [Key Engineering Considerations](#3-key-engineering-considerations)
   - 3.1. [Bounded Versus Unbounded Data](#31-bounded-versus-unbounded-data)
   - 3.2. [Frequency](#32-frequency)
   - 3.3. [Synchronous Versus Asynchronous Ingestion](#33-synchronous-versus-asynchronous-ingestion)
   - 3.4. [Serialization and Deserialization](#34-serialization-and-deserialization)
   - 3.5. [Throughput and Scalability](#35-throughput-and-scalability)
   - 3.6. [Reliability and Durability](#36-reliability-and-durability)
   - 3.7. [Payload](#37-payload)
   - 3.8. [Push Versus Pull Versus Poll Patterns](#38-push-versus-pull-versus-poll-patterns)
4. [Batch Ingestion Considerations](#4-batch-ingestion-considerations)
   - 4.1. [Snapshot or Differential Extraction](#41-snapshot-or-differential-extraction)
   - 4.2. [File-Based Export and Ingestion](#42-file-based-export-and-ingestion)
   - 4.3. [ETL Versus ELT](#43-etl-versus-elt)
   - 4.4. [Inserts, Updates, and Batch Size](#44-inserts-updates-and-batch-size)
   - 4.5. [Data Migration](#45-data-migration)
5. [Message and Stream Ingestion Considerations](#5-message-and-stream-ingestion-considerations)
   - 5.1. [Schema Evolution](#51-schema-evolution)
   - 5.2. [Late-Arriving Data](#52-late-arriving-data)
   - 5.3. [Ordering and Multiple Delivery](#53-ordering-and-multiple-delivery)
   - 5.4. [Replay](#54-replay)
   - 5.5. [Time to Live](#55-time-to-live)
   - 5.6. [Message Size](#56-message-size)
   - 5.7. [Error Handling and Dead-Letter Queues](#57-error-handling-and-dead-letter-queues)
   - 5.8. [Consumer Pull and Push](#58-consumer-pull-and-push)
   - 5.9. [Location](#59-location)
6. [Ways to Ingest Data](#6-ways-to-ingest-data)
   - 6.1. [Direct Database Connection](#61-direct-database-connection)
   - 6.2. [Change Data Capture](#62-change-data-capture)
   - 6.3. [APIs](#63-apis)
   - 6.4. [Message Queues and Event-Streaming Platforms](#64-message-queues-and-event-streaming-platforms)
   - 6.5. [Managed Data Connectors](#65-managed-data-connectors)
   - 6.6. [Moving Data with Object Storage](#66-moving-data-with-object-storage)
   - 6.7. [Other Ingestion Methods](#67-other-ingestion-methods)
7. [Whom You'll Work With](#7-whom-youll-work-with)
8. [Undercurrents](#8-undercurrents)
9. [Summary](#9-summary)

---

## 1. Introduction

**In plain English:** Data ingestion is like the plumbing system in a house - you need pipes to move water from the main line to your faucets, shower, and appliances. Similarly, data ingestion moves data from source systems through various channels into storage where it can be used.

**In technical terms:** Data ingestion is the process of moving data from one place to another, specifically from source systems into storage in the data engineering lifecycle. It's the intermediate step that enables all downstream data processing, transformation, and analysis.

**Why it matters:** Without solid data ingestion, nothing else in the data engineering lifecycle can function. Bad ingestion means stale data, broken pipelines, and business decisions made without current information. Ingestion is where data engineering truly begins - it's the foundation upon which all analytics, ML, and reporting are built.

> **Insight**
>
> At the heart, ingestion is plumbing - connecting pipes to other pipes, ensuring data flows consistently and securely to its destination. While the minutiae may feel tedious, exciting data applications like analytics and ML cannot happen without it.

---

## 2. What Is Data Ingestion?

Data ingestion implies data movement from source systems into storage in the data engineering lifecycle, with ingestion as an intermediate step.

<DiagramContainer title="Basic Data Ingestion Flow">
  <ProcessFlow
    direction="horizontal"
    steps={[
      {
        title: "Source System",
        description: "Database, API, streaming platform",
        icon: "📊",
        color: colors.blue
      },
      {
        title: "Ingestion",
        description: "Move and transform data",
        icon: "🔄",
        color: colors.purple
      },
      {
        title: "Storage",
        description: "Data warehouse, lake, database",
        icon: "💾",
        color: colors.green
      }
    ]}
  />
</DiagramContainer>

**Ingestion vs Integration:**

<ComparisonTable
  beforeTitle="Data Ingestion"
  afterTitle="Data Integration"
  beforeColor={colors.blue}
  afterColor={colors.purple}
  items={[
    {
      label: "Definition",
      before: "Moving data from point A to B",
      after: "Combining data from disparate sources"
    },
    {
      label: "Example",
      before: "Copy CRM data to warehouse",
      after: "Merge CRM + ads + web analytics"
    },
    {
      label: "Output",
      before: "Same data in new location",
      after: "New combined dataset"
    },
    {
      label: "Complexity",
      before: "Simpler - movement focused",
      after: "Complex - transformation focused"
    }
  ]}
/>

### 2.1. Data Pipelines Defined

**In plain English:** A data pipeline is like a factory assembly line for data - raw materials (source data) come in one end, go through various processing stations (ingestion, transformation, quality checks), and finished products (analytics-ready data) come out the other end.

**In technical terms:** A data pipeline is the combination of architecture, systems, and processes that move data through the stages of the data engineering lifecycle. It encompasses everything from ETL, ELT, reverse ETL, and data sharing.

**Why it matters:** Modern data pipelines are deliberately flexible - they're not monolithic systems but ecosystems of cloud services assembled like LEGO bricks. Data engineers prioritize using the right tools to accomplish desired outcomes over adhering to narrow philosophies of data movement.

**Our Definition:**

> A data pipeline is the combination of architecture, systems, and processes that move data through the stages of the data engineering lifecycle.

**Examples:**

<CardGrid
  columns={2}
  cards={[
    {
      title: "Traditional ETL Pipeline",
      icon: "🏛️",
      color: colors.orange,
      items: [
        "On-premises transactional system",
        "Monolithic processor",
        "Data warehouse destination",
        "Batch-oriented approach"
      ]
    },
    {
      title: "Modern Cloud Pipeline",
      icon: "☁️",
      color: colors.blue,
      items: [
        "100+ sources",
        "20 wide tables",
        "5 ML models in production",
        "Real-time monitoring"
      ]
    }
  ]}
/>

---

## 3. Key Engineering Considerations

When preparing to architect or build an ingestion system, ask yourself these critical questions:

<CardGrid
  columns={3}
  cards={[
    {
      title: "Use Case & Reuse",
      icon: "🎯",
      color: colors.blue,
      items: [
        "What's the use case?",
        "Can I reuse this data?",
        "Avoid multiple versions",
        "Maximize data value"
      ]
    },
    {
      title: "Destination & Frequency",
      icon: "📍",
      color: colors.purple,
      items: [
        "Where is data going?",
        "How often to update?",
        "What's the volume?",
        "What format?"
      ]
    },
    {
      title: "Quality & Processing",
      icon: "✅",
      color: colors.green,
      items: [
        "Is data good quality?",
        "Post-processing needed?",
        "In-flight processing?",
        "Quality risks?"
      ]
    }
  ]}
/>

### 3.1. Bounded Versus Unbounded Data

**In plain English:** Think of unbounded data like a river that never stops flowing - events keep happening continuously. Bounded data is like filling a bucket from that river - you capture a specific amount from a specific time period.

**In technical terms:** Unbounded data is data as it exists in reality - events happening sporadically or continuously, ongoing and flowing. Bounded data is a convenient way of bucketing data across some boundary, such as time.

**Why it matters:** Understanding the true unbounded nature of your data helps you choose the right ingestion approach. Streaming systems preserve unbounded data so subsequent lifecycle steps can process it continuously.

**Our Mantra:**

> **All data is unbounded until it's bounded.**

<DiagramContainer title="Bounded vs Unbounded Data">
  <Row gap="lg">
    <Column gap="sm" align="center">
      <Box color={colors.blue} variant="filled" icon="🌊">Unbounded Data</Box>
      <Box color={colors.slate} variant="subtle">
        Continuous flow of events
      </Box>
      <Column gap="xs">
        <Box color={colors.blue} variant="outlined" size="sm">Real-time transactions</Box>
        <Box color={colors.blue} variant="outlined" size="sm">IoT sensor streams</Box>
        <Box color={colors.blue} variant="outlined" size="sm">User clickstreams</Box>
      </Column>
    </Column>
    <Column gap="sm" align="center">
      <Box color={colors.purple} variant="filled" icon="📦">Bounded Data</Box>
      <Box color={colors.slate} variant="subtle">
        Discrete batches with boundaries
      </Box>
      <Column gap="xs">
        <Box color={colors.purple} variant="outlined" size="sm">Daily batches</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Hourly snapshots</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Monthly reports</Box>
      </Column>
    </Column>
  </Row>
</DiagramContainer>

### 3.2. Frequency

One of the critical decisions data engineers must make is the data-ingestion frequency. Frequencies vary dramatically from slow to fast.

<DiagramContainer title="Ingestion Frequency Spectrum">
  <ProcessFlow
    direction="horizontal"
    steps={[
      {
        title: "Annual",
        description: "Tax data to accounting firm",
        icon: "📅",
        color: colors.orange
      },
      {
        title: "Daily Batch",
        description: "Overnight ETL processes",
        icon: "🌙",
        color: colors.blue
      },
      {
        title: "Micro-Batch",
        description: "CDC every minute",
        icon: "⏱️",
        color: colors.purple
      },
      {
        title: "Streaming",
        description: "IoT sensors continuous",
        icon: "⚡",
        color: colors.green
      }
    ]}
  />
</DiagramContainer>

**In plain English:** "Real-time" is a bit of a misnomer - no system is genuinely real-time. Every database, queue, or pipeline has inherent latency. It's more accurate to speak of "near real-time," but we often use "real-time" for brevity and will use it interchangeably with "streaming" in this book.

**Key Considerations:**

<CardGrid
  columns={2}
  cards={[
    {
      title: "Batch Processing Realities",
      icon: "📦",
      color: colors.orange,
      items: [
        "Still common downstream of streaming",
        "ML models often batch-trained",
        "Choose where batch boundaries occur",
        "Batch frequency = downstream bottleneck"
      ]
    },
    {
      title: "Streaming Use Cases",
      icon: "🌊",
      color: colors.blue,
      items: [
        "IoT sensors writing continuously",
        "Event-driven architectures",
        "Message queue patterns",
        "Coexists with batch processing"
      ]
    }
  ]}
/>

### 3.3. Synchronous Versus Asynchronous Ingestion

<ComparisonTable
  beforeTitle="Synchronous Ingestion"
  afterTitle="Asynchronous Ingestion"
  beforeColor={colors.red}
  afterColor={colors.green}
  items={[
    {
      label: "Dependencies",
      before: "Complex, tightly coupled",
      after: "Independent, loosely coupled"
    },
    {
      label: "Failure Impact",
      before: "One failure stops everything",
      after: "Isolated failures, continues processing"
    },
    {
      label: "Processing",
      before: "Discrete batch steps",
      after: "Event-level operations"
    },
    {
      label: "Common In",
      before: "Older ETL systems",
      after: "Modern streaming architectures"
    }
  ]}
/>

**Synchronous Ingestion:**

**In plain English:** Synchronous ingestion is like a relay race - if the first runner drops the baton, the whole race stops. Each stage depends directly on the previous stage completing successfully.

<DiagramContainer title="Synchronous Processing">
  <ProcessFlow
    direction="horizontal"
    steps={[
      {
        title: "Extract",
        description: "Must complete before transform",
        icon: "📤",
        color: colors.blue
      },
      {
        title: "Transform",
        description: "Must complete before load",
        icon: "⚙️",
        color: colors.purple
      },
      {
        title: "Load",
        description: "Can't start until transform done",
        icon: "💾",
        color: colors.green
      }
    ]}
  />
  <Box color={colors.red} variant="subtle">
    If any step fails, entire process must restart from beginning
  </Box>
</DiagramContainer>

:::warning Horror Story: Synchronous Pipeline Failure

At one company, the transformation process was dozens of tightly coupled synchronous workflows taking over 24 hours to finish. If any step failed, the **whole process restarted from the beginning**.

With cryptic error messages, fixing the pipeline became whack-a-mole taking over a week to cure. Meanwhile, the business had no updated reports. People weren't happy.

:::

**Asynchronous Ingestion:**

**In plain English:** Asynchronous ingestion is like a restaurant kitchen - different stations work independently. The grill doesn't wait for the salad station to finish; they work in parallel and coordinate only when assembling the final dish.

<DiagramContainer title="Asynchronous Processing Example (AWS)">
  <ProcessFlow
    direction="vertical"
    steps={[
      {
        title: "Web Application",
        description: "Emits events continuously",
        icon: "🌐",
        color: colors.blue
      },
      {
        title: "Kinesis Data Streams",
        description: "Buffer and shock absorber",
        icon: "📨",
        color: colors.purple
      },
      {
        title: "Apache Beam",
        description: "Parse and enrich events in parallel",
        icon: "⚙️",
        color: colors.green
      },
      {
        title: "Kinesis Firehose",
        description: "Roll up and write to S3",
        icon: "💾",
        color: colors.orange
      }
    ]}
  />
</DiagramContainer>

**Why it matters:** Each stage processes data items as they become available in parallel. The stream acts as a shock absorber, moderating load so event spikes won't overwhelm downstream processing. Events move quickly when rates are low; backlog clears automatically.

### 3.4. Serialization and Deserialization

**In plain English:** Serialization is like packing a suitcase - you need to organize your belongings in a specific way to fit them efficiently and protect them during travel. Deserialization is unpacking at your destination.

**In technical terms:** Serialization means encoding data from a source and preparing data structures for transmission and intermediate storage stages. Deserialization is the reverse - decoding received data.

**Why it matters:** Ensure your destination can deserialize the data it receives. We've seen data ingested from a source but sitting inert and unusable because it cannot be properly deserialized.

> **Insight**
>
> Always verify serialization compatibility between source and destination. See Appendix A for extensive discussion of serialization formats.

### 3.5. Throughput and Scalability

**In plain English:** Throughput is like water pressure in your pipes - you need enough capacity to handle peak demand (everyone showering in the morning) without the system backing up or bursting.

**In technical terms:** Data throughput and system scalability become critical as data volumes grow and requirements change. Design systems to scale and shrink flexibly to match desired data throughput.

**Why it matters:** In theory, ingestion should never be a bottleneck. In practice, ingestion bottlenecks are pretty standard.

**Critical Considerations:**

<CardGrid
  columns={2}
  cards={[
    {
      title: "Upstream Impact",
      icon: "⬆️",
      color: colors.red,
      items: [
        "Source database goes down",
        "Backfill when it comes online",
        "Sudden influx of backlogged data",
        "Can ingestion keep up?"
      ]
    },
    {
      title: "Bursty Data Handling",
      icon: "💥",
      color: colors.orange,
      items: [
        "Data generation rarely constant",
        "Ebbs and flows common",
        "Built-in buffering required",
        "Bridge time while system scales"
      ]
    }
  ]}
/>

> **Insight**
>
> Whenever possible, use managed services that handle throughput scaling for you. Don't reinvent the data ingestion wheel if you don't have to. Manual scaling with servers, shards, or workers often isn't value-added work, and there's a good chance you'll miss something.

### 3.6. Reliability and Durability

**In plain English:** Reliability is like having a backup generator - your lights stay on even during a power outage. Durability is like storing important documents in a fireproof safe - they won't be lost even in a disaster.

**In technical terms:** Reliability entails high uptime and proper failover for ingestion systems. Durability entails making sure data isn't lost or corrupted.

**Why it matters:** Some data sources (IoT devices, caches) may not retain data if not correctly ingested. Once lost, it's gone for good. Reliability of ingestion systems leads directly to durability of generated data.

**Trade-off Evaluation:**

<DiagramContainer title="Reliability vs Cost Trade-offs">
  <Column gap="md">
    <Box color={colors.blue} variant="filled">
      Question: Will ingestion continue if AWS zone goes down?
    </Box>
    <Row gap="md">
      <Column gap="sm">
        <Box color={colors.green} icon="✅">High Reliability</Box>
        <Box color={colors.green} variant="outlined" size="sm">Multi-zone redundancy</Box>
        <Box color={colors.red} variant="outlined" size="sm">Higher cloud costs</Box>
        <Box color={colors.red} variant="outlined" size="sm">24/7 on-call team</Box>
        <Box color={colors.red} variant="outlined" size="sm">Team burnout risk</Box>
      </Column>
      <Column gap="sm">
        <Box color={colors.orange} icon="⚖️">Balanced Approach</Box>
        <Box color={colors.blue} variant="outlined" size="sm">Evaluate impact</Box>
        <Box color={colors.blue} variant="outlined" size="sm">Assess costs</Box>
        <Box color={colors.blue} variant="outlined" size="sm">Build appropriate level</Box>
        <Box color={colors.blue} variant="outlined" size="sm">Accept trade-offs</Box>
      </Column>
    </Row>
  </Column>
</DiagramContainer>

> **Insight**
>
> Don't assume you can build a system that will reliably ingest data in every possible scenario. Even the nearly infinite budget of the US federal government can't guarantee this. Continually evaluate trade-offs and costs.

### 3.7. Payload

A payload is the dataset you're ingesting and has characteristics such as kind, shape, size, schema and data types, and metadata.

#### Kind

**In plain English:** Kind is like the category of a file - is it a document, image, video, or spreadsheet? Each type has different formats and ways of being handled.

**In technical terms:** Kind consists of type and format. Data has a type (tabular, image, video, text). The type influences the format - how it's expressed in bytes, names, and file extensions.

**Examples:**

<CardGrid
  columns={2}
  cards={[
    {
      title: "Tabular Data",
      icon: "📊",
      color: colors.blue,
      items: [
        "Type: Tabular",
        "Formats: CSV, Parquet, Avro",
        "Different byte patterns",
        "Structured"
      ]
    },
    {
      title: "Image Data",
      icon: "🖼️",
      color: colors.purple,
      items: [
        "Type: Image",
        "Formats: JPG, PNG, GIF",
        "Binary data",
        "Unstructured"
      ]
    }
  ]}
/>

#### Shape

Every payload has a shape that describes its dimensions. Data shape is critical across the data engineering lifecycle.

**Shape Examples:**

- **Tabular:** M rows and N columns
- **Semistructured JSON:** Key-value pairs and nesting depth
- **Unstructured text:** Number of words, characters, or bytes
- **Images:** Width, height, RGB color depth (e.g., 8 bits per pixel)
- **Audio:** Channels (stereo = 2), sample depth (16 bits), sample rate (48 kHz), length

#### Size

**In plain English:** Size is simply how many bytes of storage your data requires. A massive payload can be compressed (like zipping a file) or split into chunks (like breaking a large file into multiple smaller files for easier transmission).

**Common Practices:**

<ProcessFlow
  direction="horizontal"
  steps={[
    {
      title: "Original Payload",
      description: "100 GB file",
      icon: "📦",
      color: colors.red
    },
    {
      title: "Compress",
      description: "ZIP/TAR to 30 GB",
      icon: "🗜️",
      color: colors.orange
    },
    {
      title: "Chunk",
      description: "Split into 1 GB files",
      icon: "✂️",
      color: colors.blue
    },
    {
      title: "Transmit",
      description: "Easier over network",
      icon: "📡",
      color: colors.green
    }
  ]}
/>

#### Schema and Data Types

**In plain English:** Schema is like the blueprint for a database table - it describes what columns exist, what type of data goes in each column (numbers, text, dates), and what rules apply (can it be empty? must it be unique?).

**The Engineering Challenge:**

> The connection is easy. The great engineering challenge is understanding the underlying schema. Applications organize data in various ways, and engineers need to be intimately familiar with the organization of data and relevant update patterns to make sense of it.

**Complications:**

<CardGrid
  columns={2}
  cards={[
    {
      title: "ORM-Generated Schemas",
      icon: "🔄",
      color: colors.orange,
      items: [
        "Auto-generated from code",
        "Natural in OOP languages",
        "Often messy in databases",
        "Requires understanding code structure"
      ]
    },
    {
      title: "API Schema Challenges",
      icon: "🔌",
      color: colors.red,
      items: [
        "Some have friendly reporting methods",
        "Others are thin wrappers",
        "Must understand application internals",
        "Communication is critical"
      ]
    }
  ]}
/>

#### Detecting and Handling Schema Changes

Schema changes frequently occur in source systems and are often well out of data engineers' control.

**Common Schema Changes:**

<CardGrid
  columns={2}
  cards={[
    {
      title: "Additive Changes",
      icon: "➕",
      color: colors.green,
      items: [
        "Adding new columns",
        "Creating new tables",
        "Usually easier to handle",
        "May require minimal updates"
      ]
    },
    {
      title: "Breaking Changes",
      icon: "💥",
      color: colors.red,
      items: [
        "Changing column types",
        "Renaming columns",
        "Can break pipelines",
        "Requires coordination"
      ]
    }
  ]}
/>

**Modern Approaches:**

It's becoming increasingly common for ingestion tools to automate detection of schema changes and even auto-update target tables. This is a mixed blessing.

:::warning Schema Change Automation

While automation is excellent, analysts and data scientists relying on data should be informed of schema changes that violate existing assumptions. Even if automation accommodates a change, the new schema may adversely affect performance of reports and models.

**Communication between those making schema changes and those impacted is as important as reliable automation.**

:::

#### Schema Registries

**In plain English:** A schema registry is like a version control system for data schemas - it tracks how your data structure has evolved over time and ensures producers and consumers stay in sync.

**In technical terms:** A schema registry is a metadata repository used to maintain schema and data type integrity in the face of constantly changing schemas. It tracks schema versions and history, describes the data model for messages, and allows consistent serialization/deserialization between producers and consumers.

**Why it matters:** Used in most major data tools and clouds, especially critical for streaming data where every message has a schema that may evolve.

#### Metadata

**In plain English:** Metadata is data about data - like the information card at a museum that tells you about a painting (artist, date, medium) rather than the painting itself.

**In technical terms:** Metadata describes characteristics of data - schema, lineage, quality metrics, access patterns, creation timestamps, and more.

**Why it matters:** One significant limitation of early data lakes (data swamps) was complete lack of attention to metadata. Without detailed description of data, it may be of little value.

### 3.8. Push Versus Pull Versus Poll Patterns

<DiagramContainer title="Data Movement Patterns">
  <Row gap="lg">
    <Column gap="sm" align="center">
      <Box color={colors.blue} variant="filled" icon="⬅️">Push</Box>
      <Box color={colors.slate} variant="subtle">
        Source sends to target
      </Box>
      <Arrow direction="right" label="Data" />
      <Box color={colors.blue} variant="outlined">Example: CDC to stream</Box>
    </Column>
    <Column gap="sm" align="center">
      <Box color={colors.purple} variant="filled" icon="➡️">Pull</Box>
      <Box color={colors.slate} variant="subtle">
        Target reads from source
      </Box>
      <Arrow direction="left" label="Query" />
      <Box color={colors.purple} variant="outlined">Example: JDBC connection</Box>
    </Column>
    <Column gap="sm" align="center">
      <Box color={colors.green} variant="filled" icon="🔄">Poll</Box>
      <Box color={colors.slate} variant="subtle">
        Periodically check for changes
      </Box>
      <Arrow direction="down" label="Check → Pull if changed" />
      <Box color={colors.green} variant="outlined">Example: API polling</Box>
    </Column>
  </Row>
</DiagramContainer>

**In plain English:**
- **Push:** Like getting mail delivered to your mailbox - the postal service brings it to you
- **Pull:** Like going to the post office to pick up a package - you go get it yourself
- **Poll:** Like checking your mailbox every hour to see if anything new arrived - you periodically check and grab it if there's something new

---

## 4. Batch Ingestion Considerations

**In plain English:** Batch ingestion is like doing laundry - you collect dirty clothes over time, then wash them all at once rather than washing each item individually as it gets dirty.

**In technical terms:** Batch ingestion involves processing data in bulk, ingesting a subset of data from a source system based either on time intervals or size of accumulated data.

**Common Patterns:**

<CardGrid
  columns={2}
  cards={[
    {
      title: "Time-Interval Batch",
      icon: "⏰",
      color: colors.blue,
      items: [
        "Process data once a day",
        "Overnight during off-hours",
        "Provide daily reporting",
        "Traditional ETL pattern"
      ]
    },
    {
      title: "Size-Based Batch",
      icon: "📦",
      color: colors.purple,
      items: [
        "Move from streaming to object storage",
        "Cut data into discrete blocks",
        "Based on bytes or event count",
        "Data lake ingestion"
      ]
    }
  ]}
/>

### 4.1. Snapshot or Differential Extraction

<ComparisonTable
  beforeTitle="Full Snapshot"
  afterTitle="Differential (Incremental)"
  beforeColor={colors.orange}
  afterColor={colors.green}
  items={[
    {
      label: "What's Captured",
      before: "Entire current state of source",
      after: "Only updates since last read"
    },
    {
      label: "Network Traffic",
      before: "High - all data every time",
      after: "Low - only changes"
    },
    {
      label: "Storage Usage",
      before: "High - duplicate data",
      after: "Low - minimal duplication"
    },
    {
      label: "Complexity",
      before: "Simple to implement",
      after: "More complex logic"
    },
    {
      label: "Prevalence",
      before: "Extremely common",
      after: "Ideal but less common"
    }
  ]}
/>

**In plain English:** Full snapshots are like taking a complete photo of your room every day - simple but wastes space storing duplicate furniture. Differential updates are like noting "added chair, removed lamp" - efficient but requires tracking what changed.

### 4.2. File-Based Export and Ingestion

**In plain English:** File-based ingestion is like getting a package delivery - the sender prepares the package on their end, boxes it up, and ships it to you. You don't need direct access to their warehouse.

**In technical terms:** Data is serialized into files in an exchangeable format on the source system side. These files are provided to an ingestion system via various methods. This is a push-based ingestion pattern.

**Advantages:**

<CardGrid
  columns={3}
  cards={[
    {
      title: "Security",
      icon: "🔒",
      color: colors.blue,
      items: [
        "No direct backend access",
        "Source controls export",
        "Preprocessed data",
        "Reduced attack surface"
      ]
    },
    {
      title: "Control",
      icon: "🎛️",
      color: colors.purple,
      items: [
        "Source engineers choose what to export",
        "Control preprocessing",
        "Flexible exchange methods",
        "Managed process"
      ]
    },
    {
      title: "Exchange Methods",
      icon: "📤",
      color: colors.green,
      items: [
        "Object storage (S3, GCS)",
        "SFTP",
        "EDI",
        "SCP"
      ]
    }
  ]}
/>

### 4.3. ETL Versus ELT

Both are extremely common ingestion, storage, and transformation patterns for batch workloads.

<DiagramContainer title="ETL Pattern">
  <ProcessFlow
    direction="horizontal"
    steps={[
      {
        title: "Extract",
        description: "Get data from source (pull or push)",
        icon: "📤",
        color: colors.blue
      },
      {
        title: "Transform",
        description: "Clean, enrich, aggregate BEFORE loading",
        icon: "⚙️",
        color: colors.purple
      },
      {
        title: "Load",
        description: "Load transformed data into storage",
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
        description: "Get data from source (pull or push)",
        icon: "📤",
        color: colors.blue
      },
      {
        title: "Load",
        description: "Load raw data into storage first",
        icon: "💾",
        color: colors.green
      },
      {
        title: "Transform",
        description: "Transform AFTER loading using storage compute",
        icon: "⚙️",
        color: colors.purple
      }
    ]}
  />
</DiagramContainer>

**Key Considerations:**

- **Extract:** May require reading metadata and schema changes
- **Load:** Be mindful of system type, schema, and performance impact

> **Insight**
>
> We cover ETL and ELT in greater detail in Chapter 8 (Transformation).

### 4.4. Inserts, Updates, and Batch Size

**In plain English:** Batch-oriented systems are like moving furniture - it's much more efficient to load a whole truckload at once than make 100 trips with individual chairs.

**In technical terms:** Batch-oriented systems often perform poorly with many small operations rather than fewer large operations. Single-row inserts are fine for transactional databases but bad for columnar databases.

**Why it matters:**

<CardGrid
  columns={2}
  cards={[
    {
      title: "Small Batch Problems",
      icon: "⚠️",
      color: colors.red,
      items: [
        "Creates many small files",
        "High number of create operations",
        "Forces database to scan files",
        "Poor performance"
      ]
    },
    {
      title: "Purpose-Built Solutions",
      icon: "⚡",
      color: colors.green,
      items: [
        "Apache Druid - high insert rates",
        "Apache Pinot - high insert rates",
        "SingleStore - hybrid OLAP/OLTP",
        "BigQuery - stream buffer"
      ]
    }
  ]}
/>

> **Insight**
>
> Know the limits and characteristics of your tools. Understand appropriate update patterns for the database or data store you're working with.

### 4.5. Data Migration

**In plain English:** Data migration is like moving to a new house - you don't just need to move your stuff, you need to reconnect utilities, update your address, and figure out where everything goes in the new place.

**In technical terms:** Migrating data to a new database or environment involves moving data in bulk - sometimes hundreds of terabytes or larger, often including entire databases and systems.

**Key Challenges:**

<CardGrid
  columns={2}
  cards={[
    {
      title: "Schema Management",
      icon: "📋",
      color: colors.orange,
      items: [
        "Subtle differences between systems",
        "SQL Server to Snowflake example",
        "Test sample data first",
        "Find issues before full migration"
      ]
    },
    {
      title: "Pipeline Connections",
      icon: "🔌",
      color: colors.red,
      items: [
        "Not just moving data itself",
        "Moving pipeline connections",
        "Updating all downstream systems",
        "Often the bigger challenge"
      ]
    }
  ]}
/>

**Best Practices:**

- Most systems perform best with bulk rather than individual rows
- File/object storage excellent intermediate stage
- Many automation tools available
- Use automation for large/complex migrations

---

## 5. Message and Stream Ingestion Considerations

Ingesting event data is common. This section covers issues to consider when ingesting events.

### 5.1. Schema Evolution

**In plain English:** Schema evolution is like updating your tax form - the IRS might add new fields each year, change field names, or modify what types of data go where. Your tax software needs to handle these changes gracefully.

**In technical terms:** Fields may be added or removed, or value types might change (string to integer). Schema evolution can have unintended impacts on pipelines and destinations.

**Common Scenarios:**

<CardGrid
  columns={3}
  cards={[
    {
      title: "IoT Firmware Update",
      icon: "📱",
      color: colors.blue,
      items: [
        "Device gets firmware update",
        "Adds new field to event",
        "Downstream unprepared",
        "Pipeline breaks"
      ]
    },
    {
      title: "Third-Party API Change",
      icon: "🔌",
      color: colors.purple,
      items: [
        "API introduces changes",
        "Event payload modified",
        "No advance notice",
        "Impacts capabilities"
      ]
    },
    {
      title: "Application Update",
      icon: "💻",
      color: colors.green,
      items: [
        "App adds new feature",
        "Changes data structure",
        "Breaking change",
        "Consumers affected"
      ]
    }
  ]}
/>

**Mitigation Strategies:**

<ProcessFlow
  direction="vertical"
  steps={[
    {
      title: "Use Schema Registry",
      description: "Version schema changes if framework supports it",
      icon: "📚",
      color: colors.blue
    },
    {
      title: "Dead-Letter Queue",
      description: "Investigate issues with improperly handled events",
      icon: "📬",
      color: colors.purple
    },
    {
      title: "Communication (Most Effective)",
      description: "Regularly communicate with upstream stakeholders about potential changes",
      icon: "💬",
      color: colors.green
    }
  ]}
/>

### 5.2. Late-Arriving Data

**In plain English:** Late-arriving data is like mail that takes extra time to arrive - a letter postmarked Monday might not arrive until Wednesday due to postal delays. The postmark (event time) and arrival (ingestion time) are different.

**In technical terms:** Events might occur around the same time frame (similar event times), but some arrive later than others (late ingestion times) because of various circumstances.

**Example Scenario:**

> An IoT device might be late sending a message because of internet latency issues. This is common when ingesting data.

**Impact:**

<CardGrid
  columns={2}
  cards={[
    {
      title: "Reporting Issues",
      icon: "📊",
      color: colors.red,
      items: [
        "Assuming ingestion time = event time",
        "Strange results in reports",
        "Inaccurate portrayal of events",
        "Misleading analysis"
      ]
    },
    {
      title: "Handling Strategy",
      icon: "⏰",
      color: colors.green,
      items: [
        "Be aware of late-arriving data",
        "Understand downstream impact",
        "Set cutoff time for processing",
        "Balance accuracy vs completeness"
      ]
    }
  ]}
/>

### 5.3. Ordering and Multiple Delivery

**In plain English:** Streaming platforms are like a busy mail room - letters might arrive out of order, and sometimes the same letter gets delivered twice by mistake because the system isn't sure if it was delivered the first time.

**In technical terms:** Distributed systems can cause complications - messages may be delivered out of order and more than once (at-least-once delivery).

> **Insight**
>
> See the event-streaming platforms discussion in Chapter 5 for more details on handling ordering and delivery guarantees.

### 5.4. Replay

**In plain English:** Replay is like rewinding a DVR - you can go back to any point in your recorded history and watch it again from there.

**In technical terms:** Replay allows readers to request a range of messages from history, rewinding event history to a particular point in time. Particularly useful when you need to reingest and reprocess data for a specific time range.

**Platform Support:**

<ComparisonTable
  beforeTitle="No Replay"
  afterTitle="Replay Supported"
  beforeColor={colors.red}
  afterColor={colors.green}
  items={[
    {
      label: "RabbitMQ",
      before: "Deletes after consumption",
      after: "N/A"
    },
    {
      label: "Kafka",
      before: "N/A",
      after: "Event retention and replay"
    },
    {
      label: "Kinesis",
      before: "N/A",
      after: "Event retention and replay"
    },
    {
      label: "Pub/Sub",
      before: "N/A",
      after: "Event retention and replay"
    }
  ]}
/>

### 5.5. Time to Live

**In plain English:** Time to Live (TTL) is like milk with an expiration date - after a certain time, it gets thrown out automatically whether you used it or not.

**In technical terms:** TTL is maximum message retention time - how long events live before being acknowledged and ingested. Unacknowledged events not ingested after TTL expiration automatically disappear.

**Why it matters:** Helpful to reduce backpressure and unnecessary event volume in event-ingestion pipeline.

**Finding the Balance:**

<DiagramContainer title="TTL Trade-offs">
  <Row gap="lg">
    <Column gap="sm" align="center">
      <Box color={colors.red} variant="filled" icon="⚡">Too Short</Box>
      <Box color={colors.slate} variant="subtle">Milliseconds or seconds</Box>
      <Box color={colors.red} variant="outlined">Most messages disappear before processing</Box>
    </Column>
    <Column gap="sm" align="center">
      <Box color={colors.green} variant="filled" icon="✅">Balanced</Box>
      <Box color={colors.slate} variant="subtle">Hours to days</Box>
      <Box color={colors.green} variant="outlined">Enough time to process, minimal backlog</Box>
    </Column>
    <Column gap="sm" align="center">
      <Box color={colors.orange} variant="filled" icon="📦">Too Long</Box>
      <Box color={colors.slate} variant="subtle">Weeks or months</Box>
      <Box color={colors.orange} variant="outlined">Backlog of unprocessed messages, long waits</Box>
    </Column>
  </Row>
</DiagramContainer>

**Platform Examples (at time of writing):**

- **Google Cloud Pub/Sub:** Up to 7 days retention
- **Amazon Kinesis:** Up to 365 days retention
- **Kafka:** Indefinite (limited by disk space), can write to object storage

### 5.6. Message Size

**In plain English:** Message size limits are like package size limits for shipping - you can't send a piano through a mail slot designed for letters.

**In technical terms:** Ensure the streaming framework can handle the maximum expected message size.

**Platform Limits:**

<CardGrid
  columns={2}
  cards={[
    {
      title: "Amazon Kinesis",
      icon: "📨",
      color: colors.orange,
      items: [
        "Maximum: 1 MB",
        "Fixed limit",
        "Design messages accordingly",
        "Split large payloads if needed"
      ]
    },
    {
      title: "Apache Kafka",
      icon: "📬",
      color: colors.blue,
      items: [
        "Default: 1 MB",
        "Configurable to 20 MB+",
        "May vary on managed platforms",
        "Check platform documentation"
      ]
    }
  ]}
/>

### 5.7. Error Handling and Dead-Letter Queues

**In plain English:** A dead-letter queue is like the "undeliverable mail" section at the post office - when a letter can't be delivered (wrong address, postage due, damaged), it goes to a special place where postal workers can investigate and try to resolve the issue.

**In technical terms:** Events that cannot be ingested are rerouted to a separate location called a dead-letter queue, segregating problematic events from events that can be accepted.

**Why it matters:**

<DiagramContainer title="Dead-Letter Queue Flow">
  <ProcessFlow
    direction="horizontal"
    steps={[
      {
        title: "Incoming Events",
        description: "Messages arrive at queue",
        icon: "📨",
        color: colors.blue
      },
      {
        title: "Validation",
        description: "Check if event can be processed",
        icon: "✅",
        color: colors.purple
      },
      {
        title: "Good Events",
        description: "Route to consumer",
        icon: "✔️",
        color: colors.green
      }
    ]}
  />
  <Arrow direction="down" label="Bad events" />
  <Box color={colors.red} variant="filled" icon="📬">
    Dead-Letter Queue
  </Box>
</DiagramContainer>

**Common Failure Reasons:**

<CardGrid
  columns={3}
  cards={[
    {
      title: "Routing Issues",
      icon: "🚫",
      color: colors.red,
      items: [
        "Nonexistent topic",
        "Nonexistent queue",
        "Invalid destination",
        "Permission denied"
      ]
    },
    {
      title: "Size Issues",
      icon: "📏",
      color: colors.orange,
      items: [
        "Message too large",
        "Exceeds platform limits",
        "Malformed payload",
        "Corrupted data"
      ]
    },
    {
      title: "Timing Issues",
      icon: "⏰",
      color: colors.purple,
      items: [
        "Expired past TTL",
        "Too old to process",
        "Out of order",
        "Duplicate detection"
      ]
    }
  ]}
/>

**Benefits:**

- Diagnose why ingestion errors occur
- Solve data pipeline problems
- Reprocess messages after fixing underlying causes
- Prevent erroneous events from blocking other messages

### 5.8. Consumer Pull and Push

<ComparisonTable
  beforeTitle="Pull Subscriptions"
  afterTitle="Push Subscriptions"
  beforeColor={colors.blue}
  afterColor={colors.purple}
  items={[
    {
      label: "How It Works",
      before: "Subscribers read from topic and confirm",
      after: "Service writes messages to listener"
    },
    {
      label: "Kafka",
      before: "Pull only",
      after: "Not supported"
    },
    {
      label: "Kinesis",
      before: "Pull only",
      after: "Not supported"
    },
    {
      label: "Pub/Sub",
      before: "Supported",
      after: "Supported"
    },
    {
      label: "RabbitMQ",
      before: "Supported",
      after: "Supported"
    },
    {
      label: "Default Choice",
      before: "Most data engineering applications",
      after: "Specialized applications"
    }
  ]}
/>

> **Insight**
>
> Pull-only systems can still push if you add an extra layer to handle this.

### 5.9. Location

**In plain English:** Location is like choosing where to build distribution centers - putting them closer to customers improves delivery speed but increases costs when coordinating between centers.

**In technical terms:** It's often desirable to integrate streaming across several locations for enhanced redundancy and to consume data close to where it's generated.

**Trade-offs:**

<CardGrid
  columns={2}
  cards={[
    {
      title: "Benefits of Proximity",
      icon: "⚡",
      color: colors.green,
      items: [
        "Better bandwidth",
        "Lower latency",
        "Faster processing",
        "Enhanced redundancy"
      ]
    },
    {
      title: "Costs of Distribution",
      icon: "💰",
      color: colors.red,
      items: [
        "Data egress fees",
        "Cross-region transfer costs",
        "Complex architecture",
        "Can spiral quickly"
      ]
    }
  ]}
/>

> **Insight**
>
> Do a careful evaluation of trade-offs as you build out your architecture. Balance performance benefits against data movement costs.

---

## 6. Ways to Ingest Data

Now that we've described significant patterns underlying batch and streaming ingestion, let's focus on ways you can ingest data.

> **Insight**
>
> The universe of data ingestion practices and technologies is vast and growing daily. These are common approaches, but not exhaustive.

### 6.1. Direct Database Connection

**In plain English:** Direct database connection is like having a phone line between two offices - you can call directly and request information without going through intermediaries.

**In technical terms:** Data is pulled from databases by querying and reading over a network connection, most commonly using ODBC or JDBC.

#### ODBC (Open Database Connectivity)

<DiagramContainer title="ODBC Architecture">
  <ProcessFlow
    direction="horizontal"
    steps={[
      {
        title: "Ingestion Tool",
        description: "Makes standard ODBC API calls",
        icon: "🔧",
        color: colors.blue
      },
      {
        title: "ODBC Driver",
        description: "Translates to database-specific commands",
        icon: "🔌",
        color: colors.purple
      },
      {
        title: "Database",
        description: "Returns query results over wire",
        icon: "💾",
        color: colors.green
      }
    ]}
  />
</DiagramContainer>

#### JDBC (Java Database Connectivity)

**Why JDBC is Popular:**

<CardGrid
  columns={3}
  cards={[
    {
      title: "JVM Portability",
      icon: "☕",
      color: colors.blue,
      items: [
        "Standard across architectures",
        "Portable across OS",
        "JIT compiler performance",
        "Extremely popular"
      ]
    },
    {
      title: "Single Driver",
      icon: "🔧",
      color: colors.purple,
      items: [
        "Compatible with any JVM language",
        "Java, Scala, Clojure, Kotlin",
        "Works with Spark",
        "No separate drivers needed"
      ]
    },
    {
      title: "Beyond JVM",
      icon: "🐍",
      color: colors.green,
      items: [
        "Python can use JDBC",
        "Translation tools available",
        "Python talks to local JVM",
        "Widely adopted"
      ]
    }
  ]}
/>

#### Limitations and Modern Alternatives

<ComparisonTable
  beforeTitle="JDBC/ODBC Limitations"
  afterTitle="Modern Alternatives"
  beforeColor={colors.red}
  afterColor={colors.green}
  items={[
    {
      label: "Nested Data",
      before: "Struggle with nested structures",
      after: "Native nested data support"
    },
    {
      label: "Data Format",
      before: "Send data as rows",
      after: "Columnar formats (Parquet, ORC)"
    },
    {
      label: "Reencoding",
      before: "Must reserialize columns as rows",
      after: "Direct export to native format"
    },
    {
      label: "Access Method",
      before: "JDBC/ODBC connections",
      after: "REST APIs, file export"
    }
  ]}
/>

**Modern Integration Pattern:**

<DiagramContainer title="JDBC with Orchestration">
  <ProcessFlow
    direction="horizontal"
    steps={[
      {
        title: "Reader Process",
        description: "Connect via JDBC to database",
        icon: "📖",
        color: colors.blue
      },
      {
        title: "Object Storage",
        description: "Write extracted data to multiple objects",
        icon: "💾",
        color: colors.purple
      },
      {
        title: "Orchestration",
        description: "Trigger ingestion to downstream system",
        icon: "🎯",
        color: colors.green
      }
    ]}
  />
</DiagramContainer>

### 6.2. Change Data Capture

**In plain English:** Change Data Capture (CDC) is like having a security camera that records every change in a room - you can see who came in, what they moved, and when they left. Instead of taking a new photo of the whole room each hour, you just review the recording of changes.

**In technical terms:** CDC is the process of ingesting changes from a source database system - periodically or continuously capturing table changes for analytics.

#### Batch-Oriented CDC

**How It Works:**

If database table has `updated_at` field, query to find all rows updated since specified time.

<ProcessFlow
  direction="horizontal"
  steps={[
    {
      title: "Last Capture Time",
      description: "Track when we last captured changes",
      icon: "⏰",
      color: colors.blue
    },
    {
      title: "Query Updates",
      description: "Find rows changed since last time",
      icon: "🔍",
      color: colors.purple
    },
    {
      title: "Differential Update",
      description: "Update only changed rows in target",
      icon: "📝",
      color: colors.green
    }
  ]}
/>

**Key Limitation:**

:::warning Batch CDC Limitation

While we can determine which rows changed since a point in time, we don't necessarily obtain **all changes** applied to those rows.

**Example:** Bank account table updated every 24 hours. Customer withdraws money 5 times in 24 hours. Query returns only the **last** account balance, not all 5 intermediate states.

**Mitigation:** Use insert-only schema where each transaction is a new record.

:::

#### Continuous CDC

**In plain English:** Continuous CDC treats every database write as an event that can be captured and streamed in real-time to downstream systems.

**In technical terms:** Captures all table history and supports near real-time data ingestion for database replication or real-time streaming analytics.

**Common Approach - Log-Based CDC:**

<DiagramContainer title="Log-Based CDC Flow">
  <ProcessFlow
    direction="horizontal"
    steps={[
      {
        title: "Database",
        description: "Every change recorded in binary log",
        icon: "💾",
        color: colors.blue
      },
      {
        title: "CDC Tool",
        description: "Reads log continuously",
        icon: "📖",
        color: colors.purple
      },
      {
        title: "Stream (Kafka)",
        description: "Events sent to streaming platform",
        icon: "📨",
        color: colors.green
      },
      {
        title: "Consumers",
        description: "Multiple targets can consume",
        icon: "🎯",
        color: colors.orange
      }
    ]}
  />
</DiagramContainer>

**Managed CDC Paradigm:**

Some cloud databases can directly trigger serverless functions or write to event streams on every change - completely freeing engineers from worrying about implementation details.

#### CDC and Database Replication

<ComparisonTable
  beforeTitle="Synchronous Replication"
  afterTitle="Asynchronous CDC Replication"
  beforeColor={colors.orange}
  afterColor={colors.green}
  items={[
    {
      label: "Coupling",
      before: "Tightly coupled",
      after: "Loosely coupled"
    },
    {
      label: "Database Types",
      before: "Same type required (PostgreSQL to PostgreSQL)",
      after: "Can replicate to different types"
    },
    {
      label: "Sync Level",
      before: "Fully in sync with primary",
      after: "Slightly delayed acceptable"
    },
    {
      label: "Use Case",
      before: "Read replicas, failover",
      after: "Analytics, multiple targets"
    },
    {
      label: "Targets",
      before: "Single replica",
      after: "Object storage, streaming, multiple DBs"
    }
  ]}
/>

#### CDC Considerations

:::caution CDC Resource Consumption

CDC is not free. It consumes:
- Memory
- Disk bandwidth
- Storage
- CPU time
- Network bandwidth

**Work with production teams and run tests before turning on CDC on production systems to avoid operational problems.**

For batch CDC, large queries against transactional systems can cause excessive load. Run at off-hours or use read replica.

:::

### 6.3. APIs

**In plain English:** APIs are like restaurant menus - each vendor has their own menu (API specification) with different dishes (data endpoints), different ordering processes, and different pricing. There's no universal standard for how APIs should work.

**In technical terms:** APIs are a data source growing in importance and popularity. A typical organization may have hundreds of external data sources (SaaS platforms, partner companies), but no proper standard exists for data exchange over APIs.

**The Challenge:**

> Data engineers can spend significant time reading documentation, communicating with external data owners, and writing and maintaining API connection code.

**Three Trends Changing This:**

<CardGrid
  columns={3}
  cards={[
    {
      title: "1. Vendor Client Libraries",
      icon: "📚",
      color: colors.blue,
      items: [
        "Various programming languages",
        "Remove API complexity",
        "Vendor-maintained",
        "Easier integration"
      ]
    },
    {
      title: "2. Data Connector Platforms",
      icon: "🔌",
      color: colors.purple,
      items: [
        "SaaS, open source, managed",
        "Turnkey connectivity",
        "Custom connector frameworks",
        "See section 6.5"
      ]
    },
    {
      title: "3. Data Sharing",
      icon: "📊",
      color: colors.green,
      items: [
        "BigQuery, Snowflake, Redshift, S3",
        "Standard platforms",
        "Easy to process/move",
        "Large rapid impact"
      ]
    }
  ]}
/>

**Best Practices:**

> Don't reinvent the wheel. While managed services might look expensive, consider the value of your time and opportunity cost of building API connectors when you could be spending time on higher-value work.

<ProcessFlow
  direction="vertical"
  steps={[
    {
      title: "Use Managed Services",
      description: "Let services handle scheduling and synchronization",
      icon: "☁️",
      color: colors.green
    },
    {
      title: "Build Custom Connectors in Framework",
      description: "Serverless functions (Lambda) for unsupported APIs",
      icon: "🔧",
      color: colors.blue
    },
    {
      title: "Follow DevOps Best Practices",
      description: "Version control, CI/CD, automated testing",
      icon: "⚙️",
      color: colors.purple
    },
    {
      title: "Consider Orchestration",
      description: "Dramatically streamline operational burden",
      icon: "🎯",
      color: colors.orange
    }
  ]}
/>

### 6.4. Message Queues and Event-Streaming Platforms

**In plain English:** Message queues and streams are like two different postal systems. Message queues are like regular mail - once you receive and acknowledge a letter, it's removed from the system. Streams are like a recorded video feed - events are preserved in order for as long as you want, and multiple people can watch (consume) them.

**In technical terms:** Message queues and event-streaming platforms are widespread ways to ingest real-time data from web/mobile applications, IoT sensors, and smart devices.

**Key Differences:**

<ComparisonTable
  beforeTitle="Message Queues"
  afterTitle="Event Streams"
  beforeColor={colors.purple}
  afterColor={colors.blue}
  items={[
    {
      label: "Handling",
      before: "Individual event level",
      after: "Ordered log"
    },
    {
      label: "Persistence",
      before: "Transient - acknowledged and removed",
      after: "Persists as long as you wish"
    },
    {
      label: "Consumption",
      before: "Once consumed, it's gone",
      after: "Multiple consumers can read"
    },
    {
      label: "Capabilities",
      before: "Simple delivery",
      after: "Query ranges, aggregate, combine streams"
    }
  ]}
/>

**Batch vs Streaming Workflow:**

<DiagramContainer title="Streaming Data Flow">
  <Column gap="md">
    <Row gap="md">
      <Box color={colors.blue} icon="📤">Producer 1</Box>
      <Box color={colors.blue} icon="📤">Producer 2</Box>
    </Row>
    <Arrow direction="down" label="Publish events" />
    <Box color={colors.purple} variant="filled" size="lg" icon="📨">
      Streaming Platform
    </Box>
    <Arrow direction="down" label="Consume events" />
    <Row gap="md">
      <Box color={colors.green} icon="📥">Consumer 1</Box>
      <Box color={colors.green} icon="📥">Consumer 2</Box>
    </Row>
    <Arrow direction="down" label="Combine and publish" />
    <Box color={colors.orange} icon="📤">Producer 3 (Combined Dataset)</Box>
  </Column>
</DiagramContainer>

**Critical Difference:**

> Whereas batch usually involves static workflows (ingest → store → transform → serve), messages and streams are **fluid**. Ingestion can be nonlinear, with data being published, consumed, republished, and reconsumed.

**Throughput Considerations:**

<CardGrid
  columns={2}
  cards={[
    {
      title: "Performance Requirements",
      icon: "⚡",
      color: colors.blue,
      items: [
        "Messages flow with minimal latency",
        "Adequate partition/shard bandwidth",
        "Sufficient memory, disk, CPU",
        "Autoscaling for spikes"
      ]
    },
    {
      title: "Management Overhead",
      icon: "🔧",
      color: colors.orange,
      items: [
        "Significant if self-managed",
        "Consider managed services",
        "Focus on getting value from data",
        "Outsource complexity"
      ]
    }
  ]}
/>

### 6.5. Managed Data Connectors

**In plain English:** Managed data connectors are like hiring a moving company instead of renting a truck and moving yourself. They handle all the details of connecting to hundreds of different sources so you don't have to build and maintain each connection.

**In technical terms:** Platforms that provide a standard set of connectors out of the box, sparing data engineers from building complicated plumbing to connect to particular sources.

**Typical Capabilities:**

<DiagramContainer title="Managed Connector Workflow">
  <ProcessFlow
    direction="vertical"
    steps={[
      {
        title: "Configure Source & Target",
        description: "Choose databases, APIs, warehouses",
        icon: "🎯",
        color: colors.blue
      },
      {
        title: "Select Ingestion Method",
        description: "CDC, replication, truncate and reload",
        icon: "🔄",
        color: colors.purple
      },
      {
        title: "Set Permissions & Frequency",
        description: "Configure credentials and update schedule",
        icon: "⚙️",
        color: colors.green
      },
      {
        title: "Begin Syncing",
        description: "Fully managed and monitored by vendor",
        icon: "✅",
        color: colors.orange
      }
    ]}
  />
</DiagramContainer>

**Benefits:**

<CardGrid
  columns={3}
  cards={[
    {
      title: "Hundreds of Connectors",
      icon: "🔌",
      color: colors.blue,
      items: [
        "Prebuilt options",
        "Custom connector support",
        "Vendor maintained",
        "Regular updates"
      ]
    },
    {
      title: "Fully Managed",
      icon: "☁️",
      color: colors.purple,
      items: [
        "Behind-the-scenes management",
        "Monitoring included",
        "Alerts on failures",
        "Logged error information"
      ]
    },
    {
      title: "Undifferentiated Heavy Lifting",
      icon: "🏋️",
      color: colors.green,
      items: [
        "Should be outsourced",
        "Focus on value-add work",
        "Reduce maintenance burden",
        "Faster time to value"
      ]
    }
  ]}
/>

> **Insight**
>
> We strongly suggest using managed connector platforms instead of creating and managing your own connectors. The creation and management of data connectors is largely undifferentiated heavy lifting these days and should be outsourced whenever possible.

### 6.6. Moving Data with Object Storage

**In plain English:** Object storage is like a massive, secure warehouse that can hold unlimited amounts of any type of package, with advanced security systems and the ability to give someone a temporary key card to pick up their specific package.

**In technical terms:** Object storage is a multitenant system in public clouds supporting massive amounts of data, making it ideal for moving data in/out of data lakes, between teams, and between organizations.

**Advantages:**

<CardGrid
  columns={3}
  cards={[
    {
      title: "Security & Standards",
      icon: "🔒",
      color: colors.blue,
      items: [
        "Latest security standards",
        "Robust track record",
        "Signed URLs for temp access",
        "Fine-grained permissions"
      ]
    },
    {
      title: "Scalability & Reliability",
      icon: "📈",
      color: colors.purple,
      items: [
        "Massive amounts of data",
        "Proven reliability",
        "High availability",
        "Automatic replication"
      ]
    },
    {
      title: "Flexibility & Performance",
      icon: "⚡",
      color: colors.green,
      items: [
        "Arbitrary types and sizes",
        "High-performance movement",
        "Global distribution",
        "Cost-effective storage"
      ]
    }
  ]}
/>

> **Insight**
>
> In our view, object storage is the most optimal and secure way to handle file exchange. See Chapter 6 for extensive discussion of object storage.

### 6.7. Other Ingestion Methods

#### EDI (Electronic Data Interchange)

**In plain English:** EDI usually refers to archaic file exchange methods like email attachments or flash drives - the digital equivalent of sending floppy disks by carrier pigeon.

**Why It Persists:** Archaic IT systems or human process limitations.

**Enhancement Through Automation:**

<ProcessFlow
  direction="horizontal"
  steps={[
    {
      title: "Cloud Email Server",
      description: "Receives files automatically",
      icon: "📧",
      color: colors.blue
    },
    {
      title: "Object Storage",
      description: "Saves files immediately",
      icon: "💾",
      color: colors.purple
    },
    {
      title: "Orchestration Trigger",
      description: "Processes data automatically",
      icon: "⚙️",
      color: colors.green
    }
  ]}
/>

#### File Export from Databases

**Considerations:**

<CardGrid
  columns={2}
  cards={[
    {
      title: "Load Management",
      icon: "⚖️",
      color: colors.orange,
      items: [
        "Large scans load database",
        "Run during off-hours",
        "Break into smaller exports",
        "Use read replicas"
      ]
    },
    {
      title: "Cloud Warehouse Optimization",
      icon: "☁️",
      color: colors.blue,
      items: [
        "Highly optimized for export",
        "Snowflake, BigQuery, Redshift",
        "Direct to object storage",
        "Various formats supported"
      ]
    }
  ]}
/>

#### File Format Considerations

<ComparisonTable
  beforeTitle="CSV (Problematic)"
  afterTitle="Modern Formats (Recommended)"
  beforeColor={colors.red}
  afterColor={colors.green}
  items={[
    {
      label: "Schema",
      before: "Not natively encoded",
      after: "Natively encoded (Parquet, Avro, Arrow, ORC)"
    },
    {
      label: "Delimiter Issues",
      before: "Comma is common in English!",
      after: "No delimiter issues"
    },
    {
      label: "Nested Data",
      before: "Not directly supported",
      after: "Natively supported"
    },
    {
      label: "Configuration",
      before: "Must specify delimiter, quotes, escaping",
      after: "Minimal configuration"
    },
    {
      label: "Strings",
      before: "Requires intervention",
      after: "Handles arbitrary strings"
    },
    {
      label: "Query Performance",
      before: "Not optimized",
      after: "Optimized for engines"
    }
  ]}
/>

:::warning CSV in Production

CSV is ubiquitous and highly error-prone. Engineers must stipulate delimiter, quote characters, and escaping. CSV doesn't encode schema information or support nested structures.

**Autodetection is inappropriate for production ingestion.** Record CSV encoding and schema details in file metadata.

The disadvantage of newer formats: many not natively supported by source systems. Engineers forced to work with CSV and build robust exception handling.

:::

#### Shell

**In plain English:** The shell is like a command center where you can script automated workflows - telling the computer exactly what steps to execute in sequence.

**Common Uses:**

- Read data from database
- Reserialize to different format
- Upload to object storage
- Trigger ingestion process

**Modern Evolution:** Cloud vendors provide robust CLI tools (AWS CLI, gcloud, az). Complex processes possible with simple commands.

> **Insight**
>
> As processes grow more complicated and SLAs more stringent, move to proper orchestration system.

#### SSH, SFTP, and SCP

**SSH (Secure Shell):**
- Not an ingestion strategy but a protocol
- Used for file transfer (SCP)
- Used for secure database connections (tunnels)

**Bastion Host Pattern:**

<DiagramContainer title="SSH Tunnel Security">
  <ProcessFlow
    direction="horizontal"
    steps={[
      {
        title: "Remote Machine",
        description: "Opens SSH tunnel",
        icon: "💻",
        color: colors.blue
      },
      {
        title: "Bastion Host",
        description: "Locked down, specified IPs only",
        icon: "🔒",
        color: colors.purple
      },
      {
        title: "Database",
        description: "Never directly exposed to internet",
        icon: "💾",
        color: colors.green
      }
    ]}
  />
</DiagramContainer>

**SFTP (Secure FTP):**

:::caution SFTP Still a Reality

Engineers rightfully cringe at SFTP mention (occasionally FTP in production!). Regardless, SFTP is still a practical reality for many businesses working with partners unwilling to use other standards.

**Security analysis is critical to avoid data leaks.**

:::

**SCP (Secure Copy):**
- Runs over SSH connection
- Can be secure if configured correctly
- Additional network access control recommended (defense in depth)

#### Webhooks

**In plain English:** Webhooks are reverse APIs - instead of you calling a restaurant to order food, the restaurant calls you when your order is ready. The data provider makes the calls instead of receiving them.

**In technical terms:** The data consumer provides an API endpoint for the provider to call. Consumer is responsible for ingesting requests and handling aggregation, storage, and processing.

**Robust Webhook Architecture (AWS Example):**

<DiagramContainer title="Webhook Architecture">
  <ProcessFlow
    direction="vertical"
    steps={[
      {
        title: "Lambda Function",
        description: "Serverless endpoint receives events",
        icon: "⚡",
        color: colors.blue
      },
      {
        title: "Kinesis Stream",
        description: "Buffer and store messages",
        icon: "📨",
        color: colors.purple
      },
      {
        title: "Flink Processing",
        description: "Real-time analytics",
        icon: "⚙️",
        color: colors.green
      },
      {
        title: "S3 Storage",
        description: "Long-term storage",
        icon: "💾",
        color: colors.orange
      }
    ]}
  />
</DiagramContainer>

> **Insight**
>
> This architecture does much more than simply ingest data. This underscores ingestion's entanglement with other lifecycle stages - often impossible to define ingestion architecture without making storage and processing decisions.

#### Web Interface

**Reality Check:** Web interfaces for data access remain a practical reality. Not all data/functionality in SaaS platforms is exposed through automated interfaces.

**Problem:** Someone must manually access web interface, generate report, download file to local machine.

**Drawbacks:**
- People forget to run reports
- Laptops die
- Manual processes break
- Not scalable

> **Recommendation:** Where possible, choose tools and workflows allowing automated data access.

#### Web Scraping

**In plain English:** Web scraping is automatically extracting data from web pages by parsing HTML elements - like a robot copying information from websites into a spreadsheet.

**Reality:** Widespread practice, murky ethical/legal lines.

:::warning Web Scraping Considerations

**Before undertaking any web-scraping project:**

1. **Ask if you should be scraping:** Is data available from third party?

2. **Be a good citizen:**
   - Don't create DoS attacks
   - Don't get IP blocked
   - Pace activities appropriately
   - Thousands of Lambda functions ≠ good idea

3. **Legal implications:**
   - DoS attacks have legal consequences
   - Terms of service violations
   - Potential headaches for employer/you

4. **Maintenance burden:**
   - Web pages constantly change HTML
   - Tricky to keep scrapers updated
   - Is the effort worth it?

:::

**Architecture Implications:** What will you do with the data? Pull fields with Python? Maintain complete HTML and process with Spark? Decisions lead to very different downstream architectures.

#### Transfer Appliances for Data Migration

**In plain English:** For truly massive data (100+ TB), the fastest way to move it isn't over the internet but by truck - cloud vendors send you a physical box of hard drives you fill up and ship back.

**In technical terms:** Cloud vendors offer transfer appliances - physical storage devices for massive data migrations.

**When to Consider:**

<CardGrid
  columns={2}
  cards={[
    {
      title: "AWS Snowball",
      icon: "📦",
      color: colors.blue,
      items: [
        "~100 TB threshold",
        "Supports import/export",
        "Faster than internet",
        "Cheaper than egress fees"
      ]
    },
    {
      title: "AWS Snowmobile",
      icon: "🚛",
      color: colors.orange,
      items: [
        "Sent in semitrailer!",
        "Petabytes or greater",
        "Entire data center migration",
        "Extreme use cases"
      ]
    }
  ]}
/>

**Hybrid/Multicloud Strategy:**

Can export to Snowball, import to second transfer appliance for GCP or Azure. Physical transfer cheaper than data egress fees for significant volumes.

:::caution One-Time Events

Transfer appliances are **one-time ingestion events**, not for ongoing workloads. Constant data movement requires ongoing batch/streaming of smaller data sizes.

:::

#### Data Sharing

**In plain English:** Data sharing is like subscribing to a streaming service - you can watch the content but don't own it. If the provider removes your access, you can't watch anymore.

**In technical terms:** Data providers offer datasets to third-party subscribers (free or paid). Datasets shared read-only - you can integrate with your data but don't physically possess the dataset.

**Characteristics:**

<CardGrid
  columns={3}
  cards={[
    {
      title: "Access Model",
      icon: "👁️",
      color: colors.blue,
      items: [
        "Read-only fashion",
        "No physical possession",
        "Provider can revoke",
        "Integration without ownership"
      ]
    },
    {
      title: "Platform Support",
      icon: "☁️",
      color: colors.purple,
      items: [
        "Cloud platforms offer sharing",
        "Share your data",
        "Consume others' data",
        "BigQuery, Snowflake, Redshift"
      ]
    },
    {
      title: "Data Marketplaces",
      icon: "🛒",
      color: colors.green,
      items: [
        "Offer data for sale",
        "Browse available datasets",
        "Subscribe to providers",
        "Growing ecosystem"
      ]
    }
  ]}
/>

> **Insight**
>
> Not ingestion in strict sense (no physical possession), but growing as popular option for consuming data. See Chapters 5 and 6 for more details.

---

## 7. Whom You'll Work With

Data ingestion sits at several organizational boundaries. You'll work with both upstream (data producers) and downstream (data consumers) stakeholders.

### Upstream Stakeholders (Data Producers)

**The Problem:**

> A significant disconnect often exists between those responsible for generating data (software engineers) and data engineers who prepare data for analytics/data science.

**Current State:**

<CardGrid
  columns={2}
  cards={[
    {
      title: "Organizational Silos",
      icon: "🏢",
      color: colors.red,
      items: [
        "Separate teams",
        "Different incentives",
        "Limited communication",
        "Misaligned priorities"
      ]
    },
    {
      title: "Perception Issues",
      icon: "👥",
      color: colors.orange,
      items: [
        "See data engineers as consumers",
        "Not as stakeholders",
        "Data exhaust mentality",
        "Missed collaboration opportunities"
      ]
    }
  ]}
/>

**The Opportunity:**

<ProcessFlow
  direction="vertical"
  steps={[
    {
      title: "Improve Communication",
      description: "Open channels, regular dialogue, shared understanding",
      icon: "💬",
      color: colors.blue
    },
    {
      title: "Highlight Contributions",
      description: "Recognize software engineers to executives and product managers",
      icon: "⭐",
      color: colors.purple
    },
    {
      title: "Involve Product Managers",
      description: "Treat downstream data as part of product",
      icon: "📋",
      color: colors.green
    },
    {
      title: "Collaborate on Projects",
      description: "Event-driven architecture, real-time analytics together",
      icon: "🤝",
      color: colors.orange
    }
  ]}
/>

> **Insight**
>
> Software engineers are aware of analytics/data science value but don't necessarily have aligned incentives to contribute directly. Inviting them as stakeholders in data engineering outcomes improves data quality and encourages better communication about changes.

### Downstream Stakeholders (Data Consumers)

**Who Are Your Customers?**

<DiagramContainer title="Data Engineering Customer Circles">
  <Column gap="md">
    <Box color={colors.blue} variant="filled" size="lg" icon="🎯">
      Primary Focus
    </Box>
    <Row gap="sm">
      <Box color={colors.blue} variant="outlined">Data Scientists</Box>
      <Box color={colors.blue} variant="outlined">Analysts</Box>
      <Box color={colors.blue} variant="outlined">CTOs</Box>
    </Row>
    <Box color={colors.purple} variant="filled" size="lg" icon="👥">
      Broader Circle
    </Box>
    <Row gap="sm">
      <Box color={colors.purple} variant="outlined">Marketing Directors</Box>
      <Box color={colors.purple} variant="outlined">Supply Chain VPs</Box>
      <Box color={colors.purple} variant="outlined">CEOs</Box>
    </Row>
  </Column>
</DiagramContainer>

**Common Mistake:**

:::warning Don't Forget Business Stakeholders

Too often, data engineers pursue sophisticated projects (real-time streaming buses, complex systems) while marketing managers next door manually download Google Ads reports.

**View data engineering as a business. Recognize who your customers are.**

:::

**Value of Basic Work:**

<CardGrid
  columns={2}
  cards={[
    {
      title: "Basic Automation Delivers Value",
      icon: "🤖",
      color: colors.green,
      items: [
        "Marketing controls massive budgets",
        "Sits at heart of revenue",
        "Basic work may seem tedious",
        "But delivers significant value"
      ]
    },
    {
      title: "Opens Future Opportunities",
      icon: "🚀",
      color: colors.blue,
      items: [
        "Delivering value opens budget",
        "Leads to exciting projects",
        "Builds trust and credibility",
        "Enables long-term opportunities"
      ]
    }
  ]}
/>

**Executive Participation:**

<ProcessFlow
  direction="horizontal"
  steps={[
    {
      title: "Data-Driven Culture",
      description: "Fashionable in leadership circles",
      icon: "📊",
      color: colors.blue
    },
    {
      title: "Provide Guidance",
      description: "Best structure for data-driven business",
      icon: "🗺️",
      color: colors.purple
    },
    {
      title: "Break Down Silos",
      description: "Lower barriers between producers and engineers",
      icon: "🔨",
      color: colors.green
    },
    {
      title: "Set Incentives",
      description: "Lead unified data-driven culture",
      icon: "🎯",
      color: colors.orange
    }
  ]}
/>

> **Watchword: Communication**
>
> Honest communication early and often with stakeholders will go a long way to ensure your data ingestion adds value.

---

## 8. Undercurrents

Virtually all undercurrents touch the ingestion phase. We emphasize the most salient ones here.

### Security

**In plain English:** Moving data is like transporting valuables - the transfer itself creates vulnerabilities. You need armored trucks, secure routes, and verified delivery rather than just throwing packages in the back of a pickup.

**Critical Considerations:**

<DiagramContainer title="Secure Data Movement">
  <ProcessFlow
    direction="vertical"
    steps={[
      {
        title: "Within VPC",
        description: "Use secure endpoints, never leave VPC confines",
        icon: "🔒",
        color: colors.blue
      },
      {
        title: "Cloud to On-Premises",
        description: "Use VPN or dedicated private connection",
        icon: "🔐",
        color: colors.purple
      },
      {
        title: "Public Internet",
        description: "Always encrypt transmission over the wire",
        icon: "🛡️",
        color: colors.green
      }
    ]}
  />
</DiagramContainer>

> **Best Practice:** It is always a good practice to encrypt data over the wire. The security investment is worth the cost.

### Data Management

Naturally, data management begins at data ingestion - the starting point for lineage and cataloging.

#### Schema Changes

**The Problem:**

> Schema changes remain an unsettled issue in data management from our perspective.

<ComparisonTable
  beforeTitle="Traditional Approach"
  afterTitle="Agile Automation"
  beforeColor={colors.red}
  afterColor={colors.orange}
  items={[
    {
      label: "Process",
      before: "Command-and-control review",
      after: "Auto-detect and update"
    },
    {
      label: "Timeline",
      before: "6 months for single field (!))",
      after: "Immediate updates"
    },
    {
      label: "Agility",
      before: "Unacceptable impediment",
      after: "Better but still breaks downstream"
    },
    {
      label: "Communication",
      before: "Minimal",
      after: "Still critical for downstream"
    }
  ]}
/>

**Git-Inspired Solution:**

Inspired by Git's distributed version control:

<CardGrid
  columns={2}
  cards={[
    {
      title: "The Problem (CVS)",
      icon: "❌",
      color: colors.red,
      items: [
        "Completely centralized",
        "One official version",
        "No flexibility",
        "Torvalds wanted distributed"
      ]
    },
    {
      title: "The Solution (Git)",
      icon: "✅",
      color: colors.green,
      items: [
        "Tree structure",
        "Each dev maintains branch",
        "Merge to/from branches",
        "Truly distributed"
      ]
    }
  ]}
/>

**Applied to Data:**

> Storage is cheap in big data and cloud environments. Maintain multiple versions of a table with different schemas and transformations. Support "development" versions before official changes to main table.

#### Data Ethics, Privacy, and Compliance

**Fundamental Question:**

> **Do you need the sensitive data you're trying to encrypt?**

**In plain English:** The best way to protect sensitive data is to not collect it in the first place. You can't leak data you never captured.

<ProcessFlow
  direction="vertical"
  steps={[
    {
      title: "Ask: Do We Need This?",
      description: "Often overlooked when creating requirements",
      icon: "❓",
      color: colors.blue
    },
    {
      title: "Drop Sensitive Fields",
      description: "Before data is stored if not needed",
      icon: "🗑️",
      color: colors.purple
    },
    {
      title: "Tokenize at Ingestion",
      description: "If truly necessary to track identities",
      icon: "🔐",
      color: colors.green
    },
    {
      title: "Touchless Production",
      description: "Develop on simulated/cleansed data",
      icon: "🚫",
      color: colors.orange
    }
  ]}
/>

**Touchless Production:**

Engineers develop and test on simulated/cleansed data in dev/staging, but automated deployments to production.

**Broken-Glass Process:**

When production access inevitable:
- Require at least two people to approve
- Tightly scope to particular issue
- Set expiration date
- Document access

:::warning Beware Technological Band-Aids

Be wary of naive technological solutions to human problems:

**Encryption:**
- Most cloud storage/databases encrypt by default
- Problem is usually **data access**, not encryption
- Must still tightly manage encryption keys
- Watch out for ritualistic encryption

**Tokenization:**
- Use common sense
- Could someone easily hash an email and find customer?
- Thoughtless hashing without salting may not protect privacy

:::

### DataOps

**In plain English:** Reliable data pipelines are like reliable electricity - you don't notice them until they fail. When ingestion fails, everything downstream stops and the business flies blind.

**The Importance of Monitoring:**

> If there's one stage in the data engineering lifecycle where monitoring is critical, it's in the ingestion stage.

<CardGrid
  columns={3}
  cards={[
    {
      title: "What to Monitor",
      icon: "📊",
      color: colors.blue,
      items: [
        "Uptime",
        "Latency",
        "Data volumes processed",
        "Event creation/ingestion times"
      ]
    },
    {
      title: "Time Tracking",
      icon: "⏰",
      color: colors.purple,
      items: [
        "Event creation time",
        "Ingestion time",
        "Process time",
        "Processing time"
      ]
    },
    {
      title: "Build In from Start",
      icon: "🔧",
      color: colors.green,
      items: [
        "Don't wait for deployment",
        "Monitoring from beginning",
        "Predictable processing",
        "Avoid stale data"
      ]
    }
  ]}
/>

:::danger Horror Story: Six-Month Failure

In one extreme case, an ingestion pipeline failure wasn't detected for **six months**. (One might question the concrete utility of the data, but that's another matter.) This was very much avoidable through proper monitoring.

:::

**Upstream System Knowledge:**

<CardGrid
  columns={2}
  cards={[
    {
      title: "Know Your Sources",
      icon: "📡",
      color: colors.blue,
      items: [
        "Events per time interval",
        "Average event size",
        "Peak load patterns",
        "Expected frequency"
      ]
    },
    {
      title: "Third-Party Services",
      icon: "☁️",
      color: colors.orange,
      items: [
        "How will you be alerted?",
        "What's your response plan?",
        "Outside of your control",
        "Lean efficiency = dependency"
      ]
    }
  ]}
/>

#### Data-Quality Tests

> **"Data is a silent killer."**

**The Challenge:**

<ComparisonTable
  beforeTitle="DevOps (Software)"
  afterTitle="DataOps (Data)"
  beforeColor={colors.blue}
  afterColor={colors.orange}
  items={[
    {
      label: "Regressions",
      before: "Only when deploying changes",
      after: "Independently of deployments"
    },
    {
      label: "Detection",
      before: "Binary conditions (up/down)",
      after: "Subtle statistical distortions"
    },
    {
      label: "Causes",
      before: "Code changes",
      after: "External events, upstream changes"
    },
    {
      label: "Visibility",
      before: "Usually obvious",
      after: "Often silent and dangerous"
    }
  ]}
/>

**Types of Data Regressions:**

<CardGrid
  columns={2}
  cards={[
    {
      title: "Obvious Regressions",
      icon: "👁️",
      color: colors.blue,
      items: [
        "Reports break in obvious ways",
        "\"Not provided\" bubbles to top",
        "Immediate visibility",
        "Easier to address"
      ]
    },
    {
      title: "Silent Regressions (Dangerous)",
      icon: "🕵️",
      color: colors.red,
      items: [
        "From inside or outside business",
        "Field meanings change",
        "Third-party source changes",
        "Metrics distorted unknowingly"
      ]
    }
  ]}
/>

**Best Practices:**

<ProcessFlow
  direction="vertical"
  steps={[
    {
      title: "Fix at Source",
      description: "Work with software engineers when possible",
      icon: "🔧",
      color: colors.blue
    },
    {
      title: "Software Engineering Basics",
      description: "Logs, null checks, exception handling",
      icon: "📝",
      color: colors.purple
    },
    {
      title: "Binary Logic Tests",
      description: "Nulls in non-nullable? Unexpected categorical items?",
      icon: "✅",
      color: colors.green
    },
    {
      title: "Statistical Testing (Emerging)",
      description: "New realm likely to grow dramatically",
      icon: "📊",
      color: colors.orange
    }
  ]}
/>

### Orchestration

**In plain English:** Orchestration is like a symphony conductor - it coordinates when each instrument (task) plays, ensures they're in harmony, and manages complex dependencies across the entire performance (pipeline).

**Why It Matters:**

> Ingestion sits at the beginning of a large and complex data graph. Ingested data will flow into many more processing steps, and data from many sources will commingle in complex ways.

**Evolution Path:**

<DiagramContainer title="Orchestration Maturity">
  <Row gap="lg">
    <Column gap="sm" align="center">
      <Box color={colors.red} variant="filled">Early Stage</Box>
      <Box color={colors.slate} variant="subtle">Simple cron jobs</Box>
      <Column gap="xs">
        <Box color={colors.red} variant="outlined" size="sm">Brittle</Box>
        <Box color={colors.red} variant="outlined" size="sm">Slows velocity</Box>
        <Box color={colors.red} variant="outlined" size="sm">Individual tasks only</Box>
      </Column>
    </Column>
    <Arrow direction="right" label="Grow complexity" />
    <Column gap="sm" align="center">
      <Box color={colors.green} variant="filled">Mature Stage</Box>
      <Box color={colors.slate} variant="subtle">True orchestration</Box>
      <Column gap="xs">
        <Box color={colors.green} variant="outlined" size="sm">Complete task graphs</Box>
        <Box color={colors.green} variant="outlined" size="sm">Dependency management</Box>
        <Box color={colors.green} variant="outlined" size="sm">Automated workflows</Box>
      </Column>
    </Column>
  </Row>
</DiagramContainer>

**True Orchestration Capabilities:**

- Schedule complete task graphs
- Start ingestion tasks at appropriate times
- Begin downstream processing as ingestion completes
- Chain processing steps automatically
- Handle complex dependencies

### Software Engineering

**In plain English:** Ingestion is engineering-intensive because it sits at the boundary where your data world meets external systems - you're constantly building custom plumbing to connect the two.

**The Reality:**

> Behind the scenes, ingestion is incredibly complicated - teams operating Kafka/Pulsar, or tech companies running forked/homegrown solutions.

**Best Practices:**

<CardGrid
  columns={3}
  cards={[
    {
      title: "Use Managed Tools",
      icon: "☁️",
      color: colors.blue,
      items: [
        "Fivetran, Matillion, Airbyte",
        "Heavy lifting done for you",
        "Focus on value-add work",
        "Reduce maintenance burden"
      ]
    },
    {
      title: "High Software Competency",
      icon: "💻",
      color: colors.purple,
      items: [
        "Version control",
        "Code review processes",
        "Appropriate tests",
        "Where it matters"
      ]
    },
    {
      title: "Decoupled Code",
      icon: "🔗",
      color: colors.green,
      items: [
        "Avoid monolithic systems",
        "No tight dependencies",
        "Flexible architecture",
        "Easy to change"
      ]
    }
  ]}
/>

> **Insight**
>
> Take advantage of best available tools - primarily managed services. Develop high software development competency in areas where it matters.

---

## 9. Summary

You've learned about data ingestion patterns, key engineering considerations, batch and streaming specifics, and the various technologies and practices for moving data from source systems into storage.

### Key Takeaways

<CardGrid
  columns={2}
  cards={[
    {
      title: "1. Ingestion Is Foundation",
      icon: "🏗️",
      color: colors.blue,
      items: [
        "Where data engineering truly begins",
        "Enables all downstream processing",
        "Plumbing that makes everything work",
        "Tedious but essential"
      ]
    },
    {
      title: "2. Many Patterns to Master",
      icon: "🎯",
      color: colors.purple,
      items: [
        "Batch vs streaming",
        "Push vs pull vs poll",
        "Synchronous vs asynchronous",
        "Choose based on use case"
      ]
    },
    {
      title: "3. Key Engineering Decisions",
      icon: "⚙️",
      color: colors.green,
      items: [
        "Bounded vs unbounded data",
        "Frequency and scalability",
        "Reliability vs cost trade-offs",
        "Payload characteristics"
      ]
    },
    {
      title: "4. Many Ways to Ingest",
      icon: "🔌",
      color: colors.orange,
      items: [
        "Direct connections (JDBC/ODBC)",
        "CDC for database changes",
        "APIs and managed connectors",
        "Streams, queues, object storage"
      ]
    },
    {
      title: "5. Streaming Is Growing",
      icon: "🌊",
      color: colors.blue,
      items: [
        "Sea change from batch to streaming",
        "Not purely one or the other",
        "Coexistence is normal",
        "New opportunities emerging"
      ]
    },
    {
      title: "6. Use Managed Services",
      icon: "☁️",
      color: colors.green,
      items: [
        "Don't reinvent the wheel",
        "Undifferentiated heavy lifting",
        "Focus on value-add work",
        "Faster time to value"
      ]
    },
    {
      title: "7. Stakeholder Communication",
      icon: "💬",
      color: colors.purple,
      items: [
        "Work with upstream producers",
        "Serve downstream consumers",
        "Break down silos",
        "Honest, frequent communication"
      ]
    },
    {
      title: "8. Monitoring Is Critical",
      icon: "📊",
      color: colors.red,
      items: [
        "Build in from start",
        "Track uptime, latency, volumes",
        "Data-quality tests",
        "Prevent silent failures"
      ]
    }
  ]}
/>

### Critical Principles

**All Data Is Unbounded Until It's Bounded**
- Recognize the true continuous nature of data
- Streaming preserves unbounded nature
- Batch imposes artificial boundaries
- Choose approach based on use case

**Ingestion Should Never Be a Bottleneck**
- In theory, never a bottleneck
- In practice, often is
- Design for scalability and elasticity
- Use managed services when possible

**Security Starts at Ingestion**
- Moving data creates vulnerabilities
- Encrypt over the wire
- Use VPNs, secure endpoints
- Don't collect data you don't need

**Schema Is Your Friend and Enemy**
- Understanding schema is the challenge
- Changes happen frequently
- Communication critical
- Automation helps but isn't magic

**Communication Is the Watchword**
- Upstream stakeholders (producers)
- Downstream stakeholders (consumers)
- Early and often
- Ensures ingestion adds value

> **Insight**
>
> We're in the midst of a sea change, moving from batch toward streaming data pipelines. This is an opportunity for data engineers to discover interesting applications for streaming data, communicate these to the business, and deploy exciting new technologies.

**Additional Resources:**
- Airbyte's "Connections and Sync Modes" documentation
- *Introduction to Apache Flink* by Ellen Friedman and Kostas Tzoumas (Chapter 6: "Batch Is a Special Case of Streaming")
- "The Dataflow Model" paper by Tyler Akidau et al.
- Google Cloud's "Streaming Pipelines" documentation
- Microsoft's "Snapshot Window (Azure Stream Analytics)" documentation

---

**Previous:** [Chapter 6: Storage](./chapter6) | **Next:** [Chapter 8: Queries, Modeling, and Transformation](./chapter8)
