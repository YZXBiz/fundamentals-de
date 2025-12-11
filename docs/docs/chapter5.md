---
sidebar_position: 6
title: "Chapter 5: Data Generation in Source Systems"
description: "Understanding source systems, data generation patterns, databases, APIs, and how data engineers interact with the first stage of the data engineering lifecycle"
---

import {
  Box, Arrow, Row, Column, Group,
  DiagramContainer, ProcessFlow, TreeDiagram,
  CardGrid, StackDiagram, ComparisonTable,
  colors
} from '@site/src/components/diagrams';

# Chapter 5: Data Generation in Source Systems

> **"Get familiar with your source system and how it generates data. Put in the effort to read the source system documentation and understand its patterns and quirks."**
>
> — Fundamentals of Data Engineering

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Sources of Data: How Is Data Created?](#2-sources-of-data-how-is-data-created)
3. [Source Systems: Main Ideas](#3-source-systems-main-ideas)
   - 3.1. [Files and Unstructured Data](#31-files-and-unstructured-data)
   - 3.2. [APIs](#32-apis)
   - 3.3. [Application Databases (OLTP Systems)](#33-application-databases-oltp-systems)
   - 3.4. [Online Analytical Processing System](#34-online-analytical-processing-system)
   - 3.5. [Change Data Capture](#35-change-data-capture)
   - 3.6. [Logs](#36-logs)
   - 3.7. [Database Logs](#37-database-logs)
   - 3.8. [CRUD](#38-crud)
   - 3.9. [Insert-Only](#39-insert-only)
   - 3.10. [Messages and Streams](#310-messages-and-streams)
   - 3.11. [Types of Time](#311-types-of-time)
4. [Source System Practical Details](#4-source-system-practical-details)
   - 4.1. [Databases](#41-databases)
   - 4.2. [APIs](#42-apis)
   - 4.3. [Data Sharing](#43-data-sharing)
   - 4.4. [Third-Party Data Sources](#44-third-party-data-sources)
   - 4.5. [Message Queues and Event-Streaming Platforms](#45-message-queues-and-event-streaming-platforms)
5. [Whom You'll Work With](#5-whom-youll-work-with)
6. [Undercurrents and Their Impact on Source Systems](#6-undercurrents-and-their-impact-on-source-systems)
7. [Conclusion](#7-conclusion)

---

## 1. Introduction

**In plain English:** Source systems are like the faucets in your house - before you can use water (data) anywhere else, you need to understand where it comes from, how it flows, and what quirks each faucet has (temperature, pressure, reliability).

**In technical terms:** Source systems generate the data for the rest of the data engineering lifecycle. The job of a data engineer is to take data from source systems, do something with it, and make it helpful in serving downstream use cases. Understanding where data exists, how it's generated, and its characteristics is fundamental.

**Why it matters:** As data proliferates, especially with the rise of data sharing, a data engineer's role is shifting toward understanding the interplay between data sources and destinations. While basic plumbing tasks will simplify, understanding the nature of data as it's created in source systems remains critical.

> **Insight**
>
> The basic plumbing tasks of data engineering—moving data from A to B—will simplify dramatically with modern tools. However, it will remain critical to understand the nature of data as it's created in source systems.

---

## 2. Sources of Data: How Is Data Created?

**In plain English:** Data creation happens everywhere - from your voice turning into text in a messaging app to credit card transactions being recorded in databases. It can be analog (speech, writing) or digital (database records, sensor readings).

**In technical terms:** Data is an unorganized, context-less collection of facts and figures created through analog means (vocal speech, writing on paper) or digital means (native digital systems or analog-to-digital conversion).

**Why it matters:** Understanding how your source system generates data directly impacts your ability to ingest, process, and use that data effectively downstream.

<DiagramContainer title="Data Creation Patterns">
  <Row gap="lg">
    <Column gap="sm" align="center">
      <Box color={colors.purple} icon="🗣️" size="lg">Analog Data</Box>
      <Box color={colors.slate} variant="subtle">Real-world creation</Box>
      <Column gap="xs">
        <Box color={colors.purple} variant="outlined" size="sm">Vocal speech</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Sign language</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Writing on paper</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Playing instruments</Box>
      </Column>
    </Column>
    <Arrow direction="right" label="Conversion" />
    <Column gap="sm" align="center">
      <Box color={colors.blue} icon="💾" size="lg">Digital Data</Box>
      <Box color={colors.slate} variant="subtle">Digital creation</Box>
      <Column gap="xs">
        <Box color={colors.blue} variant="outlined" size="sm">Database transactions</Box>
        <Box color={colors.blue} variant="outlined" size="sm">IoT sensor readings</Box>
        <Box color={colors.blue} variant="outlined" size="sm">Mobile app interactions</Box>
        <Box color={colors.blue} variant="outlined" size="sm">Credit card terminals</Box>
      </Column>
    </Column>
  </Row>
</DiagramContainer>

### Common Data Sources

<CardGrid
  columns={3}
  cards={[
    {
      title: "Application Interactions",
      icon: "📱",
      color: colors.blue,
      items: [
        "Website clicks and navigation",
        "Mobile app usage",
        "Form submissions",
        "User authentication events"
      ]
    },
    {
      title: "IoT and Sensors",
      icon: "🌡️",
      color: colors.green,
      items: [
        "Temperature sensors",
        "Motion detectors",
        "GPS trackers",
        "Industrial equipment"
      ]
    },
    {
      title: "Business Transactions",
      icon: "💳",
      color: colors.orange,
      items: [
        "Credit card transactions",
        "Stock trades",
        "Order processing",
        "Inventory updates"
      ]
    }
  ]}
/>

---

## 3. Source Systems: Main Ideas

This section covers fundamental concepts you'll encounter when working with source systems - the patterns and technologies that generate data across the data engineering lifecycle.

### 3.1. Files and Unstructured Data

**In plain English:** Files are like envelopes - they can contain letters (text), photos (images), or recordings (audio). They're the universal way to exchange data, even though we'd prefer everything to be programmatic.

**In technical terms:** A file is a sequence of bytes, typically stored on a disk. Applications write data to files to store parameters, events, logs, images, and audio. Files remain a universal medium of data exchange.

**Why it matters:** Despite the rise of APIs and databases, much of the world still sends and receives files. Government agencies, business partners, and legacy systems often exchange data as Excel, CSV, or JSON files.

<CardGrid
  columns={3}
  cards={[
    {
      title: "Structured Files",
      icon: "📊",
      color: colors.blue,
      items: [
        "Excel spreadsheets",
        "CSV (with consistent schema)",
        "Fixed-width format",
        "Parquet, ORC, Avro"
      ]
    },
    {
      title: "Semistructured Files",
      icon: "🗂️",
      color: colors.purple,
      items: [
        "JSON documents",
        "XML files",
        "CSV (variable schema)",
        "YAML configuration"
      ]
    },
    {
      title: "Unstructured Files",
      icon: "📝",
      color: colors.orange,
      items: [
        "Plain text (TXT)",
        "Log files",
        "Images and videos",
        "Audio files"
      ]
    }
  ]}
/>

### 3.2. APIs

**In plain English:** APIs are like restaurant menus - they provide a standard way to order (request) what you want without needing to know how the kitchen (system) prepares it. In theory they're simple, but in practice they often require significant custom code.

**In technical terms:** Application Programming Interfaces (APIs) provide a standard way of exchanging data between systems. While they theoretically simplify data ingestion, many APIs still expose significant complexity that data engineers must manage.

**Why it matters:** Despite the rise of automated API ingestion services, data engineers must often invest significant energy into maintaining custom API connections and handling their quirks.

### 3.3. Application Databases (OLTP Systems)

**In plain English:** An OLTP database is like a bank's live transaction system - it needs to handle thousands of people checking balances, making transfers, and depositing checks simultaneously, all updating records in milliseconds.

**In technical terms:** An application database stores the state of an application. Online Transaction Processing (OLTP) systems are databases that read and write individual data records at a high rate, supporting low latency and high concurrency.

**Why it matters:** OLTP databases excel as application backends for high-concurrency use cases but struggle with large-scale analytics queries. Understanding this trade-off is critical when designing data pipelines.

<DiagramContainer title="OLTP Transaction Example: Bank Transfer">
  <ProcessFlow
    direction="horizontal"
    steps={[
      {
        title: "Check Balance",
        description: "Verify Account A has sufficient funds",
        icon: "🔍",
        color: colors.blue
      },
      {
        title: "Begin Transaction",
        description: "Start atomic operation",
        icon: "🔒",
        color: colors.purple
      },
      {
        title: "Debit Account A",
        description: "Subtract amount from source",
        icon: "➖",
        color: colors.orange
      },
      {
        title: "Credit Account B",
        description: "Add amount to destination",
        icon: "➕",
        color: colors.green
      },
      {
        title: "Commit or Rollback",
        description: "All succeed or all fail",
        icon: "✅",
        color: colors.blue
      }
    ]}
  />
</DiagramContainer>

#### ACID Characteristics

<CardGrid
  columns={2}
  cards={[
    {
      title: "Atomicity",
      icon: "⚛️",
      color: colors.blue,
      items: [
        "Transactions are all-or-nothing",
        "Either all changes commit",
        "Or all changes rollback",
        "No partial updates"
      ]
    },
    {
      title: "Consistency",
      icon: "🎯",
      color: colors.purple,
      items: [
        "Reads return last written version",
        "Database maintains valid state",
        "Constraints are enforced",
        "Data integrity preserved"
      ]
    },
    {
      title: "Isolation",
      icon: "🔒",
      color: colors.green,
      items: [
        "Concurrent updates don't interfere",
        "Transactions execute sequentially",
        "Prevents race conditions",
        "Maintains data consistency"
      ]
    },
    {
      title: "Durability",
      icon: "💾",
      color: colors.orange,
      items: [
        "Committed data never lost",
        "Survives power loss",
        "Persisted to stable storage",
        "Recoverability guaranteed"
      ]
    }
  ]}
/>

> **Insight**
>
> Not all ACID characteristics are required for all use cases. Relaxing constraints like consistency (using eventual consistency) can dramatically improve performance and scale. Understanding the consistency model you're working with helps prevent disasters.

#### OLTP and Analytics

:::caution
Running analytics directly on OLTP systems works in the short term but is not scalable. At some point, analytical queries will cause performance issues due to structural limitations or resource contention with transactional workloads.
:::

**Hybrid Approach: Data Applications**

<ComparisonTable
  beforeTitle="Traditional OLTP"
  afterTitle="Data Applications"
  beforeColor={colors.orange}
  afterColor={colors.green}
  items={[
    {
      label: "Purpose",
      before: "Transactional workloads only",
      after: "Hybrid transactional + analytics"
    },
    {
      label: "Queries",
      before: "Single record lookups, updates",
      after: "Quick updates + analytical queries"
    },
    {
      label: "Use Case",
      before: "Application backend",
      after: "SaaS apps with built-in analytics"
    },
    {
      label: "Challenge",
      before: "Performance degradation with analytics",
      after: "Balancing both workload types"
    }
  ]}
/>

### 3.4. Online Analytical Processing System

**In plain English:** An OLAP system is like a library optimized for researchers who need to scan thousands of books quickly, rather than finding one specific book. Looking up individual records is slow, but analyzing millions of records is fast.

**In technical terms:** Online Analytical Processing (OLAP) systems are built to run large analytics queries, typically inefficient at handling lookups of individual records. Modern columnar databases scan large volumes of data (often 100MB+ blocks) with minimal data block sizes.

**Why it matters:** While OLAP systems are typically storage and query systems for analytics, engineers often need to read data from them (e.g., training ML models from a data warehouse, or reverse ETL workflows sending derived data back to source systems).

<DiagramContainer title="OLTP vs OLAP">
  <Row gap="lg">
    <Column gap="sm" align="center">
      <Box color={colors.blue} icon="⚡" size="lg">OLTP</Box>
      <Box color={colors.slate} variant="subtle">Optimized for transactions</Box>
      <Column gap="xs">
        <Box color={colors.blue} variant="outlined" size="sm">Row-based storage</Box>
        <Box color={colors.blue} variant="outlined" size="sm">Individual record lookups</Box>
        <Box color={colors.blue} variant="outlined" size="sm">High concurrency</Box>
        <Box color={colors.blue} variant="outlined" size="sm">Sub-millisecond latency</Box>
      </Column>
    </Column>
    <Column gap="sm" align="center">
      <Box color={colors.purple} icon="📊" size="lg">OLAP</Box>
      <Box color={colors.slate} variant="subtle">Optimized for analytics</Box>
      <Column gap="xs">
        <Box color={colors.purple} variant="outlined" size="sm">Column-based storage</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Bulk data scans</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Complex aggregations</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Process petabytes</Box>
      </Column>
    </Column>
  </Row>
</DiagramContainer>

### 3.5. Change Data Capture

**In plain English:** Change Data Capture (CDC) is like having a security camera that records every change to your database - every insert, update, and delete - creating a real-time stream of what's happening.

**In technical terms:** CDC is a method for extracting each change event (insert, update, delete) that occurs in a database. It's frequently leveraged to replicate between databases in near real-time or create event streams for downstream processing.

**Why it matters:** CDC enables near real-time analytics and event-driven architectures by capturing database changes as they happen, rather than periodically snapshotting entire tables.

<DiagramContainer title="Change Data Capture Flow">
  <ProcessFlow
    direction="horizontal"
    steps={[
      {
        title: "Database Changes",
        description: "Insert, Update, Delete operations",
        icon: "💾",
        color: colors.blue
      },
      {
        title: "CDC Capture",
        description: "Extract change events from logs",
        icon: "📹",
        color: colors.purple
      },
      {
        title: "Event Stream",
        description: "Publish to message queue/stream",
        icon: "📨",
        color: colors.green
      },
      {
        title: "Consumers",
        description: "Analytics, replication, triggers",
        icon: "🎯",
        color: colors.orange
      }
    ]}
  />
</DiagramContainer>

**CDC Implementation Approaches:**

<CardGrid
  columns={2}
  cards={[
    {
      title: "Log-Based CDC (Relational DBs)",
      icon: "📜",
      color: colors.blue,
      items: [
        "Process database transaction logs",
        "Capture all changes",
        "Near real-time streaming",
        "Minimal performance impact"
      ]
    },
    {
      title: "Stream Export (Cloud NoSQL)",
      icon: "☁️",
      color: colors.purple,
      items: [
        "Native stream export features",
        "Send to target storage",
        "Configurable retention",
        "Built-in cloud integration"
      ]
    }
  ]}
/>

### 3.6. Logs

**In plain English:** Logs are like a diary for your systems - they record what happened, when it happened, and who (or what) made it happen. They're invaluable for debugging, security, and understanding system behavior.

**In technical terms:** A log captures information about events that occur in systems. Logs track traffic patterns, usage, system boots, application crashes, and other events, providing rich data sources for analysis, ML, and automation.

**Why it matters:** Logs are everywhere (operating systems, applications, servers, containers, networks, IoT devices) and provide valuable data for downstream analysis, but extracting value often requires significant effort.

#### Essential Log Elements

<CardGrid
  columns={3}
  cards={[
    {
      title: "Who",
      icon: "👤",
      color: colors.blue,
      items: [
        "User ID or system account",
        "Service account name",
        "Web browser user agent",
        "Application identifier"
      ]
    },
    {
      title: "What Happened",
      icon: "📝",
      color: colors.purple,
      items: [
        "Event type and description",
        "Related metadata",
        "Error codes or statuses",
        "Contextual information"
      ]
    },
    {
      title: "When",
      icon: "⏰",
      color: colors.green,
      items: [
        "Timestamp of event",
        "Time zone information",
        "Event sequence number",
        "Duration if applicable"
      ]
    }
  ]}
/>

#### Log Encoding Types

<ComparisonTable
  beforeTitle="Binary-Encoded Logs"
  afterTitle="Text-Based Logs"
  beforeColor={colors.blue}
  afterColor={colors.purple}
  items={[
    {
      label: "Format",
      before: "Custom compact binary format",
      after: "JSON, plain text, semistructured"
    },
    {
      label: "Efficiency",
      before: "Space efficient, fast I/O",
      after: "Less efficient, larger size"
    },
    {
      label: "Readability",
      before: "Not human-readable",
      after: "Human and machine-readable"
    },
    {
      label: "Portability",
      before: "Database-specific format",
      after: "Portable across systems"
    },
    {
      label: "Example",
      before: "Database write-ahead logs",
      after: "Application JSON logs"
    }
  ]}
/>

**Log Resolution and Levels:**

- **Resolution:** Amount of event data captured (full reconstruction vs. notification only)
- **Log Levels:** Conditions for recording (ALL, DEBUG, INFO, WARN, ERROR, FATAL)
- **Latency:** Batch (continuous file writing) vs. Real-time (message systems like Kafka)

### 3.7. Database Logs

**In plain English:** Database logs are like a flight recorder for your database - they record every operation before it happens, ensuring that even if the plane (server) crashes, you can recover and complete any unfinished work.

**In technical terms:** Write-ahead logs (WALs) are binary files in database-native format that play a crucial role in database guarantees and recoverability. The database stores each operation in the log before acknowledging the request, allowing state recovery on reboot.

**Why it matters:** Database logs are extremely useful in data engineering, especially for CDC to generate event streams from database changes. They're the foundation of database durability and consistency guarantees.

<DiagramContainer title="Write-Ahead Log Process">
  <ProcessFlow
    direction="vertical"
    steps={[
      {
        title: "Write Request Received",
        description: "Application requests database update",
        icon: "📥",
        color: colors.blue
      },
      {
        title: "Log Operation First",
        description: "Write to WAL before modifying data",
        icon: "📝",
        color: colors.purple
      },
      {
        title: "Acknowledge Request",
        description: "Confirm operation logged (durable)",
        icon: "✅",
        color: colors.green
      },
      {
        title: "Apply to Database",
        description: "Actually modify data pages",
        icon: "💾",
        color: colors.orange
      },
      {
        title: "Recovery on Failure",
        description: "Replay logs to restore state",
        icon: "🔄",
        color: colors.blue
      }
    ]}
  />
</DiagramContainer>

### 3.8. CRUD

**In plain English:** CRUD is like the basic operations you can do with a filing cabinet - Create a new file, Read what's in a file, Update the contents, or Delete the file entirely. It's the foundation of how most applications manage data.

**In technical terms:** CRUD (Create, Read, Update, Delete) is a transactional pattern representing the four basic operations of persistent storage. It's the most common pattern for storing application state in databases.

**Why it matters:** Understanding CRUD patterns helps you decide between snapshot-based extraction (point-in-time copy) and event extraction with CDC (complete history of operations) for your data pipelines.

<DiagramContainer title="CRUD Operations">
  <Row gap="md">
    <Column gap="sm">
      <Box color={colors.blue} icon="➕" size="lg">Create</Box>
      <Box color={colors.slate} variant="subtle" size="sm">Insert new records</Box>
    </Column>
    <Column gap="sm">
      <Box color={colors.green} icon="👁️" size="lg">Read</Box>
      <Box color={colors.slate} variant="subtle" size="sm">Retrieve existing data</Box>
    </Column>
    <Column gap="sm">
      <Box color={colors.orange} icon="✏️" size="lg">Update</Box>
      <Box color={colors.slate} variant="subtle" size="sm">Modify existing records</Box>
    </Column>
    <Column gap="sm">
      <Box color={colors.red} icon="🗑️" size="lg">Delete</Box>
      <Box color={colors.slate} variant="subtle" size="sm">Remove records</Box>
    </Column>
  </Row>
</DiagramContainer>

**CRUD in APIs and Databases:**

- **RESTful HTTP:** POST (Create), GET (Read), PUT/PATCH (Update), DELETE (Delete)
- **SQL Databases:** INSERT, SELECT, UPDATE, DELETE
- **NoSQL Databases:** Varies by database type but follows CRUD concepts

### 3.9. Insert-Only

**In plain English:** Instead of updating a customer's address when they move, insert-only keeps every address they've ever had with timestamps. It's like keeping a complete history book instead of erasing and rewriting entries.

**In technical terms:** The insert-only pattern retains history directly in a table by inserting new records with timestamps rather than updating existing ones. To read the current state, you query for the latest record by timestamp.

**Why it matters:** Insert-only maintains a database log directly in the table itself, making it especially useful when applications need access to history (e.g., banking applications showing address history, audit trails).

<DiagramContainer title="Insert-Only Pattern Example">
  <Column gap="md">
    <Box color={colors.blue} variant="filled" size="lg">Customer Address History</Box>
    <Row gap="md">
      <Column gap="xs">
        <Box color={colors.green} variant="outlined">Record ID: 1</Box>
        <Box color={colors.slate} variant="subtle" size="sm">Address: 123 Main St</Box>
        <Box color={colors.slate} variant="subtle" size="sm">Timestamp: 2021-09-19</Box>
      </Column>
      <Arrow direction="right" label="Customer moves" />
      <Column gap="xs">
        <Box color={colors.green} variant="outlined">Record ID: 1</Box>
        <Box color={colors.slate} variant="subtle" size="sm">Address: 456 Oak Ave</Box>
        <Box color={colors.slate} variant="subtle" size="sm">Timestamp: 2021-09-30</Box>
      </Column>
    </Row>
    <Box color={colors.orange} variant="subtle">
      Both records exist. Query MAX(timestamp) to get current address.
    </Box>
  </Column>
</DiagramContainer>

**Advantages and Disadvantages:**

<ComparisonTable
  beforeTitle="Advantages"
  afterTitle="Disadvantages"
  beforeColor={colors.green}
  afterColor={colors.red}
  items={[
    {
      label: "History",
      before: "Complete change history maintained",
      after: "Tables grow very large over time"
    },
    {
      label: "Audit Trail",
      before: "Natural audit capabilities",
      after: "Record purging may be needed"
    },
    {
      label: "Application Fit",
      before: "Perfect for banking, compliance",
      after: "Lookup overhead (MAX aggregation)"
    },
    {
      label: "Analytics",
      before: "Easy to analyze changes over time",
      after: "Expensive if many versions per ID"
    }
  ]}
/>

### 3.10. Messages and Streams

**In plain English:** A message is like sending a single text message - once read and acknowledged, it's gone from the queue. A stream is like a recorded video - events accumulate in order, and you can rewind to replay them, analyze patterns, or process them multiple times.

**In technical terms:** A message is raw data communicated across systems via a message queue, removed after delivery. A stream is an append-only log of event records persisted over a long retention window (weeks or months), allowing complex operations like aggregations and time-based rewinding.

**Why it matters:** Understanding the difference helps you choose the right tool - use message queues for discrete actions (turn on furnace), use streams when you care about history and patterns (analyze temperature trends).

<ComparisonTable
  beforeTitle="Message Queue"
  afterTitle="Event Stream"
  beforeColor={colors.blue}
  afterColor={colors.purple}
  items={[
    {
      label: "Purpose",
      before: "Discrete, singular signals",
      after: "Ordered sequence of events"
    },
    {
      label: "Persistence",
      before: "Removed after consumption",
      after: "Retained for weeks/months"
    },
    {
      label: "Use Case",
      before: "Trigger actions, routing messages",
      after: "Analytics, aggregations, replay"
    },
    {
      label: "Example",
      before: "IoT device triggers furnace on/off",
      after: "Analyze temperature trends over time"
    }
  ]}
/>

<DiagramContainer title="Messages vs Streams">
  <Row gap="lg">
    <Column gap="sm" align="center">
      <Box color={colors.blue} icon="📨" size="lg">Message Queue</Box>
      <Column gap="xs">
        <Box color={colors.blue} variant="outlined" size="sm">Msg 1 → Consumer → ✓ Removed</Box>
        <Box color={colors.blue} variant="outlined" size="sm">Msg 2 → Consumer → ✓ Removed</Box>
        <Box color={colors.blue} variant="outlined" size="sm">Msg 3 → Consumer → ✓ Removed</Box>
      </Column>
      <Box color={colors.slate} variant="subtle" size="sm">Ephemeral, action-oriented</Box>
    </Column>
    <Column gap="sm" align="center">
      <Box color={colors.purple} icon="📊" size="lg">Event Stream</Box>
      <Column gap="xs">
        <Box color={colors.purple} variant="outlined" size="sm">Event 1 [Retained]</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Event 2 [Retained]</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Event 3 [Retained]</Box>
      </Column>
      <Box color={colors.slate} variant="subtle" size="sm">Persistent, analytics-oriented</Box>
    </Column>
  </Row>
</DiagramContainer>

> **Insight**
>
> Systems that process streams can also process messages, and streaming platforms are frequently used for message passing. We often accumulate messages in streams when we want to perform message analytics on historical patterns.

### 3.11. Types of Time

**In plain English:** Time in data systems is like tracking a package - you care about when it was created (shipped), when it arrived at the warehouse (ingested), when it was scanned (processed), and how long each step took.

**In technical terms:** In streaming contexts where data is continuous and consumed shortly after production, we track multiple time types: event time (when generated), ingestion time (when received), process time (when processed), and processing time (duration).

**Why it matters:** Understanding and recording these time dimensions allows you to accurately track data movement through pipelines, identify bottlenecks, measure latency, and ensure data freshness for downstream consumers.

<DiagramContainer title="Types of Time in Data Pipelines">
  <ProcessFlow
    direction="horizontal"
    steps={[
      {
        title: "Event Time",
        description: "When event is generated in source system",
        icon: "🎯",
        color: colors.blue
      },
      {
        title: "Ingestion Time",
        description: "When event is ingested into storage/queue",
        icon: "📥",
        color: colors.purple
      },
      {
        title: "Process Time",
        description: "When data transformation begins",
        icon: "⚙️",
        color: colors.green
      },
      {
        title: "Processing Time",
        description: "Duration of processing (seconds, minutes, hours)",
        icon: "⏱️",
        color: colors.orange
      }
    ]}
  />
</DiagramContainer>

**Best Practices for Time Tracking:**

<CardGrid
  columns={2}
  cards={[
    {
      title: "Automated Timestamp Collection",
      icon: "🤖",
      color: colors.blue,
      items: [
        "Automatically log timestamps at each stage",
        "Include timestamps in event metadata",
        "Use consistent time zones (UTC)",
        "Record both wall clock and monotonic time"
      ]
    },
    {
      title: "Monitoring and Alerting",
      icon: "🔔",
      color: colors.purple,
      items: [
        "Set up latency monitoring",
        "Alert on processing time spikes",
        "Track end-to-end data freshness",
        "Measure SLA compliance"
      ]
    }
  ]}
/>

---

## 4. Source System Practical Details

This section dives into practical details of modern source systems - databases, APIs, data sharing, and streaming platforms. While these details have a shorter shelf life than fundamental concepts, they're critical knowledge for working data engineers.

### 4.1. Databases

**In plain English:** Databases are like different types of filing systems - some are optimized for quick lookups of individual files (OLTP), others for scanning thousands of files at once (OLAP), and specialized ones for specific needs like connections (graph) or time-based data (time-series).

**In technical terms:** Database technologies vary widely in their storage engines, query optimizers, scaling strategies, and use cases. Understanding the characteristics of each type helps you design appropriate data extraction and integration strategies.

**Why it matters:** There are as many types of databases as there are use cases for data. Knowing how each type works helps you choose the right extraction method, avoid performance pitfalls, and design robust data pipelines.

#### Major Database Considerations

<CardGrid
  columns={3}
  cards={[
    {
      title: "Storage and Retrieval",
      icon: "💾",
      color: colors.blue,
      items: [
        "Storage engine type",
        "Index types (B-tree, LSM)",
        "Lookup patterns",
        "Data layout on disk"
      ]
    },
    {
      title: "Performance and Scale",
      icon: "📈",
      color: colors.purple,
      items: [
        "Query optimizer behavior",
        "Horizontal vs vertical scaling",
        "Distribution strategy",
        "Consistency model"
      ]
    },
    {
      title: "Data Operations",
      icon: "⚙️",
      color: colors.green,
      items: [
        "CRUD operation patterns",
        "Transaction support (ACID)",
        "Data modeling best practices",
        "Backup and recovery"
      ]
    }
  ]}
/>

#### Relational Databases (RDBMS)

**In plain English:** Relational databases are like spreadsheets on steroids - data is organized in tables with rows and columns, relationships connect tables together, and strict rules (ACID) ensure data stays consistent even when thousands of people are making changes simultaneously.

**In technical terms:** RDBMS stores data in tables of relations (rows) with multiple fields (columns). Tables are indexed by primary keys, connected via foreign keys, and support normalized schemas. RDBMS systems are typically ACID compliant and ideal for rapidly changing application states.

**Why it matters:** Despite the rise of NoSQL, relational databases remain extremely popular for application backends. Understanding normalization, joins, and ACID properties is essential since you'll encounter them frequently.

<DiagramContainer title="Relational Database Structure">
  <Column gap="md">
    <Row gap="md">
      <Column gap="sm">
        <Box color={colors.blue} variant="filled">Customers Table</Box>
        <Box color={colors.blue} variant="outlined" size="sm">customer_id (PK)</Box>
        <Box color={colors.blue} variant="outlined" size="sm">name</Box>
        <Box color={colors.blue} variant="outlined" size="sm">email</Box>
      </Column>
      <Arrow direction="right" label="Foreign Key" />
      <Column gap="sm">
        <Box color={colors.green} variant="filled">Orders Table</Box>
        <Box color={colors.green} variant="outlined" size="sm">order_id (PK)</Box>
        <Box color={colors.green} variant="outlined" size="sm">customer_id (FK)</Box>
        <Box color={colors.green} variant="outlined" size="sm">amount</Box>
      </Column>
    </Row>
    <Box color={colors.orange} variant="subtle">
      Primary keys (PK) uniquely identify rows. Foreign keys (FK) create relationships between tables, enabling joins and normalization.
    </Box>
  </Column>
</DiagramContainer>

**Key RDBMS Characteristics:**

- **Normalized schemas:** Avoid data duplication across tables
- **ACID compliance:** Transactions maintain consistency
- **High transaction rates:** Thousands of reads/writes per second
- **Strong consistency:** Always read the latest written value
- **Join support:** Complex queries across multiple tables

#### Nonrelational Databases (NoSQL)

**In plain English:** NoSQL databases are like specialized tools in a toolbox - each is optimized for specific jobs. Document stores for flexible JSON data, key-value stores for ultra-fast lookups, graph databases for connected data, and time-series databases for sensor data.

**In technical terms:** NoSQL databases abandon the relational paradigm to improve performance, scalability, and schema flexibility. Trade-offs include relaxed consistency, lack of joins, and schema-on-read approaches.

**Why it matters:** As data and query requirements evolve, relational databases can collapse under their weight. NoSQL databases provide specialized solutions for specific workloads, but you must understand their trade-offs.

<CardGrid
  columns={3}
  cards={[
    {
      title: "Key-Value Stores",
      icon: "🔑",
      color: colors.blue,
      items: [
        "Ultra-fast lookups by key",
        "Hash map-like structure",
        "In-memory or persistent",
        "Session caching, state storage"
      ]
    },
    {
      title: "Document Stores",
      icon: "📄",
      color: colors.purple,
      items: [
        "Nested JSON-like documents",
        "Flexible schema evolution",
        "No joins (denormalized)",
        "MongoDB, Couchbase, DynamoDB"
      ]
    },
    {
      title: "Wide-Column",
      icon: "📊",
      color: colors.green,
      items: [
        "Petabyte-scale data",
        "Millions of requests/sec",
        "Sub-10ms latency",
        "Cassandra, HBase, Bigtable"
      ]
    },
    {
      title: "Graph Databases",
      icon: "🕸️",
      color: colors.orange,
      items: [
        "Nodes and edges",
        "Relationship traversals",
        "Social networks, fraud",
        "Neo4j, Neptune, TigerGraph"
      ]
    },
    {
      title: "Search Databases",
      icon: "🔍",
      color: colors.blue,
      items: [
        "Full-text search",
        "Log analysis",
        "Fuzzy matching",
        "Elasticsearch, Solr, Algolia"
      ]
    },
    {
      title: "Time-Series",
      icon: "📈",
      color: colors.purple,
      items: [
        "Time-stamped data",
        "IoT, metrics, logs",
        "Write-heavy workloads",
        "InfluxDB, TimescaleDB, Druid"
      ]
    }
  ]}
/>

**Document Store Deep Dive:**

<DiagramContainer title="Document Database Structure">
  <Column gap="md">
    <Box color={colors.purple} variant="filled" size="lg">Users Collection</Box>
    <Row gap="md">
      <Column gap="xs">
        <Box color={colors.blue} variant="outlined">Document 1</Box>
        <Box color={colors.slate} variant="subtle" size="sm">id: 1234</Box>
        <Box color={colors.slate} variant="subtle" size="sm">name: {`{first: "Joe", last: "Reis"}`}</Box>
        <Box color={colors.slate} variant="subtle" size="sm">bands: ["AC/DC", "Slayer"]</Box>
      </Column>
      <Column gap="xs">
        <Box color={colors.green} variant="outlined">Document 2</Box>
        <Box color={colors.slate} variant="subtle" size="sm">id: 1235</Box>
        <Box color={colors.slate} variant="subtle" size="sm">name: {`{first: "Matt", last: "H"}`}</Box>
        <Box color={colors.slate} variant="subtle" size="sm">bands: ["DMB", "Creed"]</Box>
      </Column>
    </Row>
    <Box color={colors.orange} variant="subtle">
      Each document can have different schemas. No joins - data is denormalized within documents.
    </Box>
  </Column>
</DiagramContainer>

:::warning
Document databases are generally NOT ACID compliant and often use eventual consistency. Understanding the consistency model is critical to preventing catastrophes when data is distributed across a cluster.
:::

**Graph Database Example:**

<DiagramContainer title="Social Network Graph Structure">
  <Column gap="md">
    <Row gap="lg">
      <Box color={colors.blue} icon="👤" size="lg">User 1</Box>
      <Arrow direction="right" label="follows" />
      <Box color={colors.green} icon="👤" size="lg">User 2</Box>
    </Row>
    <Row gap="lg">
      <Box color={colors.blue} variant="subtle" size="sm">Node: Properties</Box>
      <Box color={colors.green} variant="subtle" size="sm">Edge: Relationship</Box>
    </Row>
    <Box color={colors.orange} variant="subtle">
      Optimized for connectivity queries: "How many users can be reached in 2 hops?" Graph databases excel at these traversals.
    </Box>
  </Column>
</DiagramContainer>

> **Insight**
>
> Data engineers must choose whether to: (1) Map graph data into relational/document paradigms, (2) Analyze within the source system, or (3) Adopt graph-specific analytics tools. The choice depends on analytics use cases and query patterns.

### 4.2. APIs

APIs are now standard for exchanging data in the cloud, SaaS platforms, and internal company systems. While many API types exist, we focus on HTTP-based APIs, the most popular on the web.

#### REST (Representational State Transfer)

**In plain English:** REST is like a standardized set of request forms - you use GET to retrieve information, POST to create new things, PUT to update existing things, and DELETE to remove things. Each request is independent with no memory of previous requests.

**In technical terms:** REST is a set of practices and philosophies for building HTTP web APIs laid out by Roy Fielding in 2000. Built around HTTP verbs (GET, PUT, POST, DELETE), REST interactions are stateless - each call is independent.

**Why it matters:** Despite its vagueness as a specification, REST is the dominant API paradigm. Understanding REST patterns, client libraries, and data synchronization strategies is essential for data engineers building API integrations.

<CardGrid
  columns={2}
  cards={[
    {
      title: "REST Principles",
      icon: "📋",
      color: colors.blue,
      items: [
        "Stateless interactions",
        "HTTP verbs (GET, POST, PUT, DELETE)",
        "Resource-based URLs",
        "Standard response codes"
      ]
    },
    {
      title: "Challenges for Data Engineers",
      icon: "⚠️",
      color: colors.orange,
      items: [
        "Not a full specification",
        "Wide variation in abstraction levels",
        "Requires domain knowledge",
        "Custom code often needed"
      ]
    }
  ]}
/>

**Modern Simplifications:**

1. **Client Libraries:** Providers supply Python/JavaScript libraries handling authentication and boilerplate
2. **Off-the-Shelf Connectors:** SaaS and open-source vendors provide pre-built API connectors
3. **Custom Connector Platforms:** Tools to build custom connectors with less code

:::caution
Despite modern tools, low-level plumbing tasks still consume significant resources. At virtually any large company, data engineers need to write and maintain custom code for pulling data from APIs.
:::

#### GraphQL

**In plain English:** GraphQL is like ordering a custom meal where you specify exactly what ingredients you want, versus REST where you get a pre-set meal. You can fetch multiple related data types in a single request instead of making multiple API calls.

**In technical terms:** GraphQL is a query language created at Facebook as an alternative to generic REST APIs. It allows retrieving multiple data models in a single request with more flexible and expressive queries than REST, built around JSON with responses matching query shape.

**Why it matters:** The REST vs GraphQL debate is ongoing, but engineers will encounter both. GraphQL's flexibility can reduce API calls but requires understanding its query language and complexity trade-offs.

#### Webhooks

**In plain English:** Webhooks are reverse APIs - instead of you calling to ask "got any new data?" the source system calls you when something happens, like a doorbell notifying you when someone arrives.

**In technical terms:** Webhooks are event-based data-transmission patterns. When specified events happen in the source system, they trigger HTTP endpoint calls hosted by the data consumer. Connection flows from source to sink (opposite of typical APIs).

**Why it matters:** Webhooks enable real-time data collection without polling. Engineers commonly use message queues to ingest webhook data at high velocity and volume.

#### gRPC

**In plain English:** gRPC is Google's high-efficiency communication protocol - think of it as a turbo-charged API format optimized for speed, low power consumption, and structured data exchange.

**In technical terms:** gRPC is a remote procedure call library developed by Google, built around Protocol Buffers for data serialization. It emphasizes efficient bidirectional exchange over HTTP/2, with much more specific technical standards than REST.

**Why it matters:** Many Google services (Google Ads, GCP) offer gRPC APIs. Its standardization allows common client libraries and transferable engineering skills across gRPC implementations.

### 4.3. Data Sharing

**In plain English:** Data sharing is like giving your roommate a key to specific cabinets in your house - you control exactly what they can access while both of you share the same infrastructure, with fine-grained permissions keeping things secure.

**In technical terms:** Cloud data sharing allows multitenant systems to support security policies for sharing data among tenants. Public cloud object storage with fine-grained permissions or cloud data warehouses enable secure, efficient data sharing without data movement.

**Why it matters:** Data sharing streamlines data pipelines, enables data marketplaces, and facilitates decentralized patterns like data mesh. It's more efficient than downloading or emailing data.

<DiagramContainer title="Data Sharing Architecture">
  <Column gap="md">
    <Box color={colors.blue} variant="filled" size="lg" icon="☁️">
      Cloud Data Platform (Multitenant)
    </Box>
    <Row gap="md">
      <Column gap="sm">
        <Box color={colors.green} icon="🏢">Organization A</Box>
        <Box color={colors.green} variant="outlined" size="sm">Owns Data</Box>
        <Box color={colors.green} variant="outlined" size="sm">Sets Permissions</Box>
      </Column>
      <Arrow direction="right" label="Secure Share" />
      <Column gap="sm">
        <Box color={colors.purple} icon="🏢">Organization B</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Access Granted</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Queries Directly</Box>
      </Column>
    </Row>
    <Box color={colors.orange} variant="subtle">
      No data movement, no copying - Organization B queries Organization A's data in place with row/column filtering
    </Box>
  </Column>
</DiagramContainer>

**Data Sharing Capabilities:**

<CardGrid
  columns={2}
  cards={[
    {
      title: "Security Features",
      icon: "🔒",
      color: colors.blue,
      items: [
        "Row-level filtering",
        "Column-level filtering",
        "Sensitive data masking",
        "Time-limited access"
      ]
    },
    {
      title: "Use Cases",
      icon: "🎯",
      color: colors.purple,
      items: [
        "Data marketplaces",
        "Partner data exchange",
        "Internal data mesh",
        "Decentralized ownership"
      ]
    }
  ]}
/>

### 4.4. Third-Party Data Sources

**In plain English:** Third-party data is like subscribing to a newspaper or weather service - companies make their data available to customers either as part of their service or as a separate subscription, creating a flywheel of data integration and usage.

**In technical terms:** The consumerization of technology means companies and government agencies increasingly make data available to customers via APIs, data sharing platforms, or direct download. This creates integration opportunities and data network effects.

**Why it matters:** Third-party data sources are now nearly infinite. Understanding how to access and integrate them (APIs, data sharing, downloads) is crucial. Reverse ETL patterns (pushing scored data back to CRMs) are increasingly common.

**Common Access Patterns:**

<ProcessFlow
  direction="vertical"
  steps={[
    {
      title: "API Access",
      description: "Pull and push data via REST/GraphQL APIs",
      icon: "🔌",
      color: colors.blue
    },
    {
      title: "Cloud Data Sharing",
      description: "Direct access via platform sharing",
      icon: "☁️",
      color: colors.purple
    },
    {
      title: "File Download",
      description: "Download CSV, Excel, JSON files",
      icon: "📥",
      color: colors.green
    },
    {
      title: "Reverse ETL",
      description: "Send enriched data back to source",
      icon: "🔄",
      color: colors.orange
    }
  ]}
/>

**Example Workflow:**

1. **Extract:** Pull customer data from CRM via API
2. **Transform:** Run ML scoring model on customer data
3. **Load:** Store results in data warehouse
4. **Reverse ETL:** Push scored leads back to CRM for sales team

### 4.5. Message Queues and Event-Streaming Platforms

**In plain English:** Message queues and streaming platforms are like the postal service for your applications - they reliably deliver messages between services, buffer when systems get backed up, and (in the case of streams) keep a record you can replay.

**In technical terms:** Event-driven architectures leverage message queues for asynchronous communication and event-streaming platforms for ordered, persistent event logs. These systems enable decoupled microservices and real-time analytics.

**Why it matters:** Event-driven architectures are growing rapidly. Message queues and streaming platforms are easier to manage in the cloud, and data apps increasingly integrate real-time analytics. These systems cut across many data engineering lifecycle stages.

#### Message Queues

<DiagramContainer title="Message Queue Architecture">
  <ProcessFlow
    direction="horizontal"
    steps={[
      {
        title: "Publisher",
        description: "Produces messages",
        icon: "📤",
        color: colors.blue
      },
      {
        title: "Message Queue",
        description: "Buffers, routes messages",
        icon: "📨",
        color: colors.purple
      },
      {
        title: "Subscriber",
        description: "Consumes and acknowledges",
        icon: "📥",
        color: colors.green
      },
      {
        title: "Removed",
        description: "Message deleted after ack",
        icon: "🗑️",
        color: colors.orange
      }
    ]}
  />
</DiagramContainer>

**Key Message Queue Considerations:**

<CardGrid
  columns={3}
  cards={[
    {
      title: "Message Ordering",
      icon: "🔢",
      color: colors.blue,
      items: [
        "FIFO: Strict ordering",
        "Best-effort: Fuzzy ordering",
        "Out-of-order delivery possible",
        "Design for disorder"
      ]
    },
    {
      title: "Delivery Frequency",
      icon: "📬",
      color: colors.purple,
      items: [
        "Exactly once (ideal)",
        "At least once (duplicates)",
        "Design for idempotency",
        "Handle retry scenarios"
      ]
    },
    {
      title: "Scalability",
      icon: "📈",
      color: colors.green,
      items: [
        "Horizontal scaling",
        "Dynamic scale up/down",
        "Buffer transient spikes",
        "Distributed architecture"
      ]
    }
  ]}
/>

:::warning
Don't assume messages will be delivered in order unless your message queue technology guarantees it. You typically need to design for out-of-order message delivery.
:::

#### Event-Streaming Platforms

<DiagramContainer title="Event-Streaming Platform Architecture">
  <Column gap="md">
    <Row gap="md">
      <Box color={colors.blue} icon="📤">Producers</Box>
      <Arrow direction="right" />
      <Box color={colors.purple} icon="📊" size="lg">Topic: Web Orders</Box>
      <Arrow direction="right" />
      <Column gap="xs">
        <Box color={colors.green} variant="outlined" size="sm">Consumer: Fulfillment</Box>
        <Box color={colors.green} variant="outlined" size="sm">Consumer: Marketing</Box>
      </Column>
    </Row>
    <Box color={colors.orange} variant="subtle">
      Events retained for weeks/months. Multiple consumers can replay from any point in time.
    </Box>
  </Column>
</DiagramContainer>

**Event-Streaming Platform Characteristics:**

<CardGrid
  columns={3}
  cards={[
    {
      title: "Topics",
      icon: "📚",
      color: colors.blue,
      items: [
        "Collection of related events",
        "Fraud alerts, orders, IoT readings",
        "Zero, one, or multiple producers",
        "Zero, one, or multiple consumers"
      ]
    },
    {
      title: "Stream Partitions",
      icon: "🛣️",
      color: colors.purple,
      items: [
        "Subdivisions for parallelism",
        "Partition key determines routing",
        "Same key → same partition",
        "Avoid hotspotting"
      ]
    },
    {
      title: "Fault Tolerance",
      icon: "🛡️",
      color: colors.green,
      items: [
        "Distributed across nodes",
        "Node failure → replacement",
        "Records not lost",
        "Durable, reliable storage"
      ]
    }
  ]}
/>

**Stream Partitioning Example:**

<DiagramContainer title="Stream Partitioning by Key">
  <Column gap="md">
    <Box color={colors.blue} variant="filled">Incoming Message Stream</Box>
    <Box color={colors.slate} variant="subtle" size="sm">Messages with numeric IDs, partitioned by ID % 3</Box>
    <Row gap="md">
      <Box color={colors.green} variant="outlined">Partition 0 (Remainder 0)</Box>
      <Box color={colors.purple} variant="outlined">Partition 1 (Remainder 1)</Box>
      <Box color={colors.orange} variant="outlined">Partition 2 (Remainder 2)</Box>
    </Row>
    <Box color={colors.orange} variant="subtle">
      Partition keys enable parallelism and ensure related messages go to the same partition
    </Box>
  </Column>
</DiagramContainer>

---

## 5. Whom You'll Work With

**In plain English:** Working with source systems is like being a diplomat - you need good relationships with two groups: the builders who maintain the systems (software engineers) and the owners who control access to the data (IT, governance teams).

**In technical terms:** Source system stakeholders include systems stakeholders (builders and maintainers) and data stakeholders (owners who control access). These groups are often different, sometimes the same, but both are critical to successful data engineering.

**Why it matters:** Good diplomacy and relationships with source system stakeholders are underrated but crucial. Creating feedback loops, data contracts, and SLAs ensures you're notified of changes that affect your pipelines.

<DiagramContainer title="Source System Stakeholders">
  <Row gap="lg">
    <Column gap="sm" align="center">
      <Box color={colors.blue} icon="👨‍💻" size="lg">Systems Stakeholders</Box>
      <Box color={colors.slate} variant="subtle">Build and maintain systems</Box>
      <Column gap="xs">
        <Box color={colors.blue} variant="outlined" size="sm">Software engineers</Box>
        <Box color={colors.blue} variant="outlined" size="sm">Application developers</Box>
        <Box color={colors.blue} variant="outlined" size="sm">Third-party vendors</Box>
      </Column>
    </Column>
    <Column gap="sm" align="center">
      <Box color={colors.purple} icon="🔒" size="lg">Data Stakeholders</Box>
      <Box color={colors.slate} variant="subtle">Own and control data access</Box>
      <Column gap="xs">
        <Box color={colors.purple} variant="outlined" size="sm">IT teams</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Data governance</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Third-party providers</Box>
      </Column>
    </Column>
  </Row>
</DiagramContainer>

### Data Contracts

**What is a Data Contract?**

> A data contract is a written agreement between the owner of a source system and the team ingesting data from that system for use in a data pipeline.

**Data Contract Contents:**

<CardGrid
  columns={2}
  cards={[
    {
      title: "Technical Details",
      icon: "⚙️",
      color: colors.blue,
      items: [
        "What data is extracted",
        "Extraction method (full, incremental)",
        "Frequency and schedule",
        "Schema and format specifications"
      ]
    },
    {
      title: "Organizational Details",
      icon: "👥",
      color: colors.purple,
      items: [
        "Source system contacts",
        "Ingestion team contacts",
        "SLA and SLO agreements",
        "Change notification process"
      ]
    }
  ]}
/>

### SLA and SLO

<ComparisonTable
  beforeTitle="SLA (Service Level Agreement)"
  afterTitle="SLO (Service Level Objective)"
  beforeColor={colors.blue}
  afterColor={colors.green}
  items={[
    {
      label: "Definition",
      before: "Agreement on service expectations",
      after: "Measurable performance metrics"
    },
    {
      label: "Example",
      before: "Data will be reliably available and high quality",
      after: "Source systems will have 99% uptime"
    },
    {
      label: "Purpose",
      before: "Sets expectations",
      after: "Measures against SLA"
    },
    {
      label: "Format",
      before: "Qualitative commitments",
      after: "Quantitative targets"
    }
  ]}
/>

> **Insight**
>
> Create a feedback loop between data engineers and source system stakeholders. This is among the single most overlooked areas where data engineers can get tremendous value. When schema changes, servers fail, or data quality issues occur, you want to be notified immediately.

---

## 6. Undercurrents and Their Impact on Source Systems

**In plain English:** Unlike other parts of data engineering, you don't control source systems - you can only hope their owners follow best practices. Your job is to work with stakeholders to ensure security, data management, DataOps, architecture, orchestration, and software engineering principles are applied upstream.

**In technical terms:** Source systems are generally outside the data engineer's control. The stakeholders and owners should follow best practices for the undercurrents. Data engineers should secure upstream support to ensure undercurrents are applied when data is generated.

**Why it matters:** How undercurrents are applied in source systems directly impacts the rest of your data engineering lifecycle. Getting upstream support makes downstream work dramatically smoother.

### Security

<CardGrid
  columns={2}
  cards={[
    {
      title: "Data Protection",
      icon: "🔒",
      color: colors.blue,
      items: [
        "Data encrypted at rest and in transit",
        "Secure network access (VPN vs public internet)",
        "Password/token management (key managers, SSO)",
        "Trust and verification of sources"
      ]
    },
    {
      title: "Critical Questions",
      icon: "❓",
      color: colors.purple,
      items: [
        "Is source system architected securely?",
        "Are you accessing over secure networks?",
        "Are credentials properly managed?",
        "Do you trust the source system?"
      ]
    }
  ]}
/>

### Data Management

<CardGrid
  columns={3}
  cards={[
    {
      title: "Governance",
      icon: "📋",
      color: colors.blue,
      items: [
        "Who manages the data?",
        "Reliable governance practices",
        "Clear ownership",
        "Access policies"
      ]
    },
    {
      title: "Quality and Schema",
      icon: "✅",
      color: colors.purple,
      items: [
        "Data quality expectations",
        "Schema change notifications",
        "Upstream communication",
        "Master data management"
      ]
    },
    {
      title: "Privacy and Compliance",
      icon: "🛡️",
      color: colors.green,
      items: [
        "Data obfuscation requirements",
        "Retention policies",
        "Regulatory compliance",
        "Ethical considerations"
      ]
    }
  ]}
/>

### DataOps

**In plain English:** DataOps should extend up and down the entire stack. Work with source system teams to ensure you can observe, monitor, and respond to incidents. Set up clear communication so you know when systems go down or need rescaling.

**In technical terms:** Operational excellence (DevOps, DataOps, MLOps) should support the entire data engineering lifecycle. Data engineers must weave themselves into the DevOps practices of source system stakeholders and vice versa.

**Why it matters:** When source systems exceed capacity, fail, or change, your data pipelines are affected. Clear communication and integrated monitoring prevent surprises and enable rapid incident response.

<CardGrid
  columns={3}
  cards={[
    {
      title: "Automation",
      icon: "🤖",
      color: colors.blue,
      items: [
        "Source system automation (CI/CD)",
        "Data workflow automation",
        "Decoupling considerations",
        "Independent operation capability"
      ]
    },
    {
      title: "Observability",
      icon: "👁️",
      color: colors.purple,
      items: [
        "Source system uptime monitoring",
        "Data quality checks",
        "Schema conformance validation",
        "Shared monitoring dashboards"
      ]
    },
    {
      title: "Incident Response",
      icon: "🚨",
      color: colors.green,
      items: [
        "Outage response plans",
        "Backfill strategies",
        "Communication protocols",
        "Failure scenario planning"
      ]
    }
  ]}
/>

### Data Architecture

**Key Architecture Considerations:**

<ProcessFlow
  direction="vertical"
  steps={[
    {
      title: "Reliability",
      description: "Does the system produce predictable outputs? What's the failure rate and MTTR?",
      icon: "🔄",
      color: colors.blue
    },
    {
      title: "Durability",
      description: "How does the system handle hardware failures and network outages?",
      icon: "💾",
      color: colors.purple
    },
    {
      title: "Availability",
      description: "What guarantees that the system is up and running when needed?",
      icon: "⏱️",
      color: colors.green
    },
    {
      title: "People",
      description: "Who's in charge? How will you know about breaking changes?",
      icon: "👥",
      color: colors.orange
    }
  ]}
/>

### Orchestration

<CardGrid
  columns={2}
  cards={[
    {
      title: "Access and Authentication",
      icon: "🔑",
      color: colors.blue,
      items: [
        "Correct network access",
        "Authentication credentials",
        "Authorization policies",
        "Secure connection methods"
      ]
    },
    {
      title: "Scheduling and Integration",
      icon: "📅",
      color: colors.purple,
      items: [
        "Data availability cadence",
        "Fixed schedule vs on-demand",
        "Common frameworks (Kubernetes, Airflow)",
        "Balance integration vs coupling"
      ]
    }
  ]}
/>

### Software Engineering

**Code Considerations for Source System Access:**

<CardGrid
  columns={3}
  cards={[
    {
      title: "Networking",
      icon: "🌐",
      color: colors.blue,
      items: [
        "Network accessibility",
        "HTTPS, SSH, VPN",
        "Secure networking",
        "Firewall rules"
      ]
    },
    {
      title: "Authentication",
      icon: "🔐",
      color: colors.purple,
      items: [
        "Credentials management",
        "Secrets storage",
        "IAM roles",
        "Token rotation"
      ]
    },
    {
      title: "Access Patterns",
      icon: "🔌",
      color: colors.green,
      items: [
        "API or database driver",
        "REST/GraphQL handling",
        "Pagination strategies",
        "Retry and timeout logic"
      ]
    },
    {
      title: "Operations",
      icon: "⚙️",
      color: colors.orange,
      items: [
        "Orchestration integration",
        "Parallel access scaling",
        "Deployment strategies",
        "Error handling"
      ]
    }
  ]}
/>

---

## 7. Conclusion

**In plain English:** Source systems are not "someone else's problem" - they're the foundation of your data engineering lifecycle. Treat them carelessly and you risk taking down production. Collaborate well with source system teams and you'll get higher-quality data and better outcomes.

**In technical terms:** Source systems and their data are vital in the data engineering lifecycle. Better collaboration with source system teams leads to higher-quality data, more successful outcomes, and better data products. Data engineers must create bidirectional communication flows with stakeholders.

**Why it matters:** The integration between data engineers and source system teams is growing. Reverse ETL, event-streaming platforms, and shared systems blur the lines. Building user-facing data products requires making application teams stakeholders in data engineering.

### Key Takeaways

<CardGrid
  columns={3}
  cards={[
    {
      title: "Build Relationships",
      icon: "🤝",
      color: colors.blue,
      items: [
        "Create feedback loops",
        "Establish data contracts",
        "Set up SLAs/SLOs",
        "Communicate proactively"
      ]
    },
    {
      title: "Understand Systems",
      icon: "🔍",
      color: colors.purple,
      items: [
        "Read documentation",
        "Learn system patterns",
        "Understand quirks",
        "Know performance limits"
      ]
    },
    {
      title: "Collaborate for Success",
      icon: "🎯",
      color: colors.green,
      items: [
        "Notify of schema changes",
        "Build shared systems",
        "Create user-facing products",
        "Share successes"
      ]
    }
  ]}
/>

### Moving Forward

<ProcessFlow
  direction="vertical"
  steps={[
    {
      title: "Document Everything",
      description: "Data contracts, SLAs, access patterns, contact information",
      icon: "📝",
      color: colors.blue
    },
    {
      title: "Monitor Continuously",
      description: "Uptime, data quality, schema changes, performance metrics",
      icon: "📊",
      color: colors.purple
    },
    {
      title: "Communicate Proactively",
      description: "Notify teams of data needs, changes, and incidents",
      icon: "💬",
      color: colors.green
    },
    {
      title: "Build for Change",
      description: "Expect failures, plan backfills, design for resilience",
      icon: "🔄",
      color: colors.orange
    }
  ]}
/>

> **Insight**
>
> Look for opportunities to build user-facing data products. Talk to application teams about analytics they'd like to present to users or where ML could improve user experience. Make application teams stakeholders in data engineering and find ways to share your successes.

**Next Steps:** Now that you understand source systems and data generation, the next chapter explores how to store this data effectively across various storage systems and architectures.

---

## Additional Resources

- Confluent's "Schema Evolution and Compatibility" documentation
- *Database Internals* by Alex Petrov (O'Reilly)
- *Database System Concepts* by Abraham (Avi) Silberschatz et al. (McGraw Hill)
- "The Log: What Every Software Engineer Should Know About Real-Time Data's Unifying Abstraction" by Jay Kreps
- "Modernizing Business Data Indexing" by Benjamin Douglas and Mohammad Mohtasham
- "NoSQL: What's in a Name" by Eric Evans
- "Test Data Quality at Scale with Deequ" by Dustin Lange et al.
- "The What, Why, and When of Single-Table Design with DynamoDB" by Alex DeBrie

---

**Previous:** [Chapter 4: Choosing Technologies](./chapter4) | **Next:** [Chapter 6: Storage](./chapter6)
