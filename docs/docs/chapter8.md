---
sidebar_position: 9
title: "Chapter 8: Queries, Modeling, and Transformation"
description: "Learn how to make data useful through queries, data modeling, and transformations. Master query optimization, modeling patterns (Kimball, Inmon, Data Vault), and batch/streaming transformations."
---

import {
  Box, Arrow, Row, Column, Group,
  DiagramContainer, ProcessFlow, TreeDiagram,
  CardGrid, StackDiagram, ComparisonTable,
  colors
} from '@site/src/components/diagrams';

# Chapter 8: Queries, Modeling, and Transformation

> **"The net result of transforming data is the ability to unify and integrate data. Once data is transformed, the data can be viewed as a single entity. But without transforming data, you cannot have a unified view of data across the organization."**
>
> — Bill Inmon

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Queries](#2-queries)
   - 2.1. [What Is a Query?](#21-what-is-a-query)
   - 2.2. [The Life of a Query](#22-the-life-of-a-query)
   - 2.3. [Improving Query Performance](#23-improving-query-performance)
   - 2.4. [Queries on Streaming Data](#24-queries-on-streaming-data)
3. [Data Modeling](#3-data-modeling)
   - 3.1. [What Is a Data Model?](#31-what-is-a-data-model)
   - 3.2. [Conceptual, Logical, and Physical Data Models](#32-conceptual-logical-and-physical-data-models)
   - 3.3. [Normalization](#33-normalization)
   - 3.4. [Techniques for Modeling Batch Analytical Data](#34-techniques-for-modeling-batch-analytical-data)
   - 3.5. [Modeling Streaming Data](#35-modeling-streaming-data)
4. [Transformations](#4-transformations)
   - 4.1. [Batch Transformations](#41-batch-transformations)
   - 4.2. [Streaming Transformations and Processing](#42-streaming-transformations-and-processing)
5. [Whom You'll Work With](#5-whom-youll-work-with)
6. [Undercurrents](#6-undercurrents)
7. [Summary](#7-summary)

---

## 1. Introduction

**In plain English:** Up to this point in the data engineering lifecycle, we've been moving data around and storing it. Now we're going to learn how to make it useful—like turning raw ingredients into a delicious meal. Queries, modeling, and transformations are the tools that turn raw data into something people can actually use.

**In technical terms:** This chapter focuses on the transformation stage of the data engineering lifecycle, where we apply queries to retrieve data, implement data models to structure business logic, and create transformations that persist results for downstream consumption. These processes convert raw data into consumable analytics assets.

**Why it matters:** Without effective queries, modeling, and transformations, data remains raw and unusable. These practices create the foundation for analytics, reporting, machine learning, and data-driven decision making across your organization.

<DiagramContainer title="Transformations Create Value from Data">
  <ProcessFlow
    direction="horizontal"
    steps={[
      {
        title: "Raw Data",
        description: "Unstructured, siloed sources",
        icon: "📊",
        color: colors.slate
      },
      {
        title: "Queries",
        description: "Retrieve and filter",
        icon: "🔍",
        color: colors.blue
      },
      {
        title: "Modeling",
        description: "Structure business logic",
        icon: "🏗️",
        color: colors.purple
      },
      {
        title: "Transformation",
        description: "Persist and enhance",
        icon: "⚙️",
        color: colors.green
      },
      {
        title: "Consumable Data",
        description: "Ready for analytics",
        icon: "✨",
        color: colors.emerald
      }
    ]}
  />
</DiagramContainer>

> **Insight**
>
> This chapter assumes you have a basic understanding of SQL and related concepts like primary and foreign keys. We focus mainly on OLAP systems such as data warehouses and data lakes, though most concepts translate to other database types.

:::info Note on Terminology
For convenience, we'll use the term **database** as a shorthand for a query engine and the storage it's querying; this could be a cloud data warehouse or Apache Spark querying data stored in S3. We assume the database has a storage engine that organizes the data under the hood.
:::

---

## 2. Queries

Queries are a fundamental part of data engineering, data science, and analysis. Before you learn about transformations and data modeling, you need to understand what queries are, how they work, and techniques for improving their performance.

### 2.1. What Is a Query?

**In plain English:** A query is like asking a question to your database. Instead of manually searching through thousands of records, you write instructions that tell the database exactly what information you want to retrieve.

**In technical terms:** A query allows you to retrieve and act on data through structured requests. It implements CRUD operations (Create, Read, Update, Delete) against a database, using predicates (logical conditions) to filter and manipulate records.

**Why it matters:** Understanding queries is fundamental to data engineering because they're the primary interface between you and your data. Well-written queries can make the difference between a system that takes hours to respond and one that returns results in seconds.

#### Query Language Categories

<CardGrid
  columns={2}
  cards={[
    {
      title: "Data Definition Language (DDL)",
      icon: "🏗️",
      color: colors.blue,
      items: [
        "Performs operations on database objects",
        "CREATE tables and schemas",
        "DROP objects",
        "ALTER structures"
      ]
    },
    {
      title: "Data Manipulation Language (DML)",
      icon: "✏️",
      color: colors.purple,
      items: [
        "Adds and alters data within objects",
        "SELECT data",
        "INSERT, UPDATE, DELETE records",
        "COPY and MERGE operations"
      ]
    },
    {
      title: "Data Control Language (DCL)",
      icon: "🔒",
      color: colors.green,
      items: [
        "Controls access to database objects",
        "GRANT permissions",
        "DENY access",
        "REVOKE privileges"
      ]
    },
    {
      title: "Transaction Control Language (TCL)",
      icon: "🔄",
      color: colors.orange,
      items: [
        "Controls transaction details",
        "COMMIT changes",
        "ROLLBACK to previous state",
        "Manage checkpoints"
      ]
    }
  ]}
/>

#### DCL Example: Managing User Access

Let's walk through a brief example using DCL commands. A new data scientist named Sarah joins your company, and she needs read-only access to a database called `data_science_db`.

```sql
-- Grant Sarah read access
GRANT SELECT ON data_science_db TO user_name Sarah;
```

It's a hot job market, and Sarah has worked at the company for only a few months before getting poached by a big tech company. Being a security-minded data engineer, you remove Sarah's ability to read from the database:

```sql
-- Revoke Sarah's access
REVOKE SELECT ON data_science_db TO user_name Sarah;
```

### 2.2. The Life of a Query

**In plain English:** When you run a query, it might seem simple—you type some code and get results. But under the hood, the database is doing a lot of work: checking your code for errors, figuring out the most efficient way to execute it, and then actually running it.

**In technical terms:** Query execution involves parsing and validation, compilation to bytecode, query optimization to determine the execution plan, and finally execution to produce results. The query optimizer plays a critical role in performance.

**Why it matters:** Understanding how queries execute helps you write better queries and diagnose performance problems. The query optimizer's decisions can dramatically impact execution time.

<DiagramContainer title="The Life of a SQL Query">
  <ProcessFlow
    direction="vertical"
    steps={[
      {
        title: "SQL Code Submitted",
        description: "User writes and submits query",
        icon: "📝",
        color: colors.blue
      },
      {
        title: "Parsing & Validation",
        description: "Check semantics, objects, access",
        icon: "✅",
        color: colors.purple
      },
      {
        title: "Convert to Bytecode",
        description: "Machine-readable format",
        icon: "🔤",
        color: colors.indigo
      },
      {
        title: "Query Optimizer",
        description: "Determine execution plan",
        icon: "🎯",
        color: colors.violet
      },
      {
        title: "Execute Query",
        description: "Run optimized query",
        icon: "⚡",
        color: colors.green
      },
      {
        title: "Return Results",
        description: "Produce output",
        icon: "📊",
        color: colors.emerald
      }
    ]}
  />
</DiagramContainer>

#### The Query Optimizer

Queries can have wildly different execution times, depending on how they're executed. A query optimizer's job is to optimize query performance and minimize costs by breaking the query into appropriate steps in an efficient order.

The optimizer will assess:
- Join strategies and ordering
- Index usage
- Data scan size
- Available resources
- Cost estimates for different execution paths

### 2.3. Improving Query Performance

**In plain English:** Poorly performing queries are inevitable in data engineering. Learning to identify and fix them is like becoming a performance detective—you need to understand what's slowing things down and know the right techniques to speed them up.

**In technical terms:** Query optimization involves understanding join strategies, leveraging explain plans, pruning unnecessary data scans, managing commits properly, vacuuming dead records, and utilizing cached results. Each database has unique characteristics that affect optimization strategies.

**Why it matters:** Bad queries can consume excessive resources, increase costs, slow down systems, and frustrate users. Good query optimization can reduce execution time from hours to seconds while cutting cloud costs dramatically.

#### Optimize Your Join Strategy and Schema

Joins are one of the most common means of combining datasets and creating new ones. A common technique for improving query performance is to **prejoin data**.

**Prejoining Benefits:**
- If analytics queries repeatedly join the same data, join it in advance
- Store prejoined versions so you're not repeating computationally intensive work
- May involve relaxing normalization to widen tables
- Can use arrays or structs for frequently joined entity relationships

##### Row Explosion

:::warning Row Explosion
An obscure but frustrating problem is **row explosion**. This occurs when we have a large number of many-to-many matches, either because of repetition in join keys or as a consequence of join logic.
:::

<DiagramContainer title="Row Explosion Example">
  <Column gap="md">
    <Row gap="md">
      <Box color={colors.blue} variant="outlined" size="sm">
        Table A: "this" × 5 times
      </Box>
      <Box color={colors.purple} variant="outlined" size="sm">
        Table B: "this" × 10 times
      </Box>
    </Row>
    <Arrow direction="down" label="Cross join" />
    <Box color={colors.red} variant="filled">
      Result: 5 × 10 = 50 rows!
    </Box>
    <Box color={colors.orange} variant="subtle">
      Row explosion can consume massive resources or cause queries to fail
    </Box>
  </Column>
</DiagramContainer>

**Solution:** Use **common table expressions (CTEs)** instead of nested subqueries or temporary tables. CTEs allow users to compose complex queries together in a readable fashion, helping you understand the flow of your query.

#### Use the Explain Plan

As you learned in the preceding section, the database's query optimizer influences the execution of a query. The query optimizer's **explain plan** will show you how the query optimizer determined its optimum lowest-cost query.

<CardGrid
  columns={2}
  cards={[
    {
      title: "Resource Usage",
      icon: "💻",
      color: colors.blue,
      items: [
        "Disk, memory, network utilization",
        "Data loading time vs processing time",
        "Overall resource consumption"
      ]
    },
    {
      title: "Query Metrics",
      icon: "📊",
      color: colors.purple,
      items: [
        "Execution time and record counts",
        "Size of data scanned and shuffled",
        "Stage-by-stage breakdowns"
      ]
    },
    {
      title: "System Contention",
      icon: "⚠️",
      color: colors.orange,
      items: [
        "Competing queries causing contention",
        "Concurrent connections used vs available",
        "Resource conflicts"
      ]
    },
    {
      title: "Connection Health",
      icon: "🔌",
      color: colors.green,
      items: [
        "Number of concurrent connections",
        "Oversubscribed connection impacts",
        "Connection pool status"
      ]
    }
  ]}
/>

#### Avoid Full Table Scans

All queries scan data, but not all scans are created equal. As a rule of thumb, you should query only the data you need. When you run `SELECT *` with no predicates, you're scanning the entire table and retrieving every row and column.

<ComparisonTable
  beforeTitle="Column-Oriented (OLAP)"
  afterTitle="Row-Oriented (OLTP)"
  beforeColor={colors.blue}
  afterColor={colors.purple}
  items={[
    {
      label: "Pruning Strategy",
      before: "Select only needed columns",
      after: "Use table indexes strategically"
    },
    {
      label: "Techniques",
      before: "Cluster keys, partition tables",
      after: "B-tree indexes, covering indexes"
    },
    {
      label: "Examples",
      before: "Snowflake cluster keys, BigQuery partitions",
      after: "PostgreSQL indexes, MySQL composite keys"
    },
    {
      label: "Best For",
      before: "Large datasets, analytical queries",
      after: "Performance-sensitive queries, OLTP"
    }
  ]}
/>

#### Know How Your Database Handles Commits

**In plain English:** Different databases handle data changes in different ways. Some lock rows while updating them (making sure nobody else can change them at the same time), while others take snapshots so queries always see consistent data. Understanding this prevents unexpected query results.

**In technical terms:** A database commit is a change within a database, such as creating, updating, or deleting a record. Many databases support transactions—a notion of committing several operations simultaneously in a way that maintains a consistent state. Understanding ACID compliance and consistency models is critical.

**Why it matters:** Without understanding how your database handles commits, your query might return unexpected results from dirty reads, or you might experience performance degradation from inappropriate locking strategies.

<CardGrid
  columns={3}
  cards={[
    {
      title: "PostgreSQL",
      icon: "🐘",
      color: colors.blue,
      items: [
        "ACID-compliant transactions",
        "Row locking for consistency",
        "Transactions fail or succeed as group",
        "Not optimized for large-scale analytics"
      ]
    },
    {
      title: "Google BigQuery",
      icon: "☁️",
      color: colors.green,
      items: [
        "Point-in-time commit model",
        "Reads from latest committed snapshot",
        "No table locking during reads",
        "One write operation at a time"
      ]
    },
    {
      title: "MongoDB",
      icon: "🍃",
      color: colors.purple,
      items: [
        "Variable consistency database",
        "Configurable consistency options",
        "Extraordinary scalability",
        "May discard writes if overwhelmed"
      ]
    }
  ]}
/>

> **Insight**
>
> None of these are bad databases. They're all fantastic databases when they are chosen for appropriate applications and configured correctly. Engineers should develop a deep understanding of the problems they're tasked with solving and the technology tools available.

#### Vacuum Dead Records

**In plain English:** When you update or delete data, databases often keep the old version around as a reference point. Over time, these "ghost" records pile up and slow things down. Vacuuming is like taking out the trash—it removes these dead records and keeps your database running smoothly.

**In technical terms:** Transactions incur the overhead of creating new records during certain operations while retaining old records as pointers to the last state. Vacuuming removes these dead records, freeing up space, improving query plan accuracy, and enhancing index performance.

**Why it matters:** Dead records cause table bloat, slower queries, and inaccurate query plans. Regular vacuuming maintains database performance and reduces storage costs.

**Vacuum Behavior by Database Type:**

- **Object storage-backed databases** (BigQuery, Snowflake, Databricks): Old data retention uses storage space, potentially costing money
  - **Snowflake**: Users control a "time-travel" interval; cannot directly vacuum
  - **BigQuery**: Fixed seven-day history window
  - **Databricks**: Retains data indefinitely until manually vacuumed

- **Amazon Redshift**: VACUUM runs automatically, but users may run it manually for tuning

- **Relational databases** (PostgreSQL, MySQL): Large numbers of transactional operations cause rapid accumulation of dead records

#### Leverage Cached Query Results

**In plain English:** Imagine if every time someone wanted to know "What were last month's sales?" they had to recalculate it from scratch. That's wasteful! Query caching is like saving the answer so the next person who asks gets it instantly.

**In technical terms:** Many cloud OLAP databases cache query results. When a query is initially run (cold query), it retrieves data from various sources, filters and joins it, and outputs results. Subsequent identical queries return cached results in a fraction of the time, reducing database pressure and cloud costs.

**Why it matters:** Query caching dramatically improves user experience for frequently run queries, reduces compute costs, and decreases load on database resources.

<DiagramContainer title="Query Caching">
  <Row gap="lg">
    <Column gap="sm" align="center">
      <Box color={colors.red} icon="❄️" size="lg">Cold Query</Box>
      <Box color={colors.slate} variant="subtle">
        First execution
      </Box>
      <Column gap="xs">
        <Box color={colors.red} variant="outlined" size="sm">Retrieves from storage</Box>
        <Box color={colors.red} variant="outlined" size="sm">Complex joins and filtering</Box>
        <Box color={colors.red} variant="outlined" size="sm">40 seconds</Box>
      </Column>
    </Column>
    <Arrow direction="right" label="Cache results" />
    <Column gap="sm" align="center">
      <Box color={colors.green} icon="⚡" size="lg">Cached Query</Box>
      <Box color={colors.slate} variant="subtle">
        Subsequent executions
      </Box>
      <Column gap="xs">
        <Box color={colors.green} variant="outlined" size="sm">Returns from cache</Box>
        <Box color={colors.green} variant="outlined" size="sm">No recomputation needed</Box>
        <Box color={colors.green} variant="outlined" size="sm">&lt; 1 second</Box>
      </Column>
    </Column>
  </Row>
</DiagramContainer>

### 2.4. Queries on Streaming Data

**In plain English:** Streaming data is constantly flowing, like a river. Querying streaming data is different from querying a lake of stored data—you need patterns that can work with data that's always moving and arriving in real time.

**In technical terms:** To fully take advantage of a data stream, we must adapt query patterns that reflect its real-time nature. Systems such as Kafka and Pulsar make it easier to query streaming data sources through patterns like fast-follower databases, Kappa architecture, windows, triggers, and stream joins.

**Why it matters:** Traditional batch query patterns don't capture the value of streaming data. Streaming query patterns enable real-time analytics, dynamic triggers, and immediate responses to changing data.

#### Basic Query Patterns on Streams

##### The Fast-Follower Approach

Recall continuous CDC (Change Data Capture), discussed in Chapter 7. CDC essentially sets up an analytics database as a fast follower to a production database.

<DiagramContainer title="CDC with Fast-Follower Analytics Database">
  <ProcessFlow
    direction="horizontal"
    steps={[
      {
        title: "Production Database",
        description: "Handles application workload",
        icon: "💾",
        color: colors.blue
      },
      {
        title: "CDC Stream",
        description: "Captures changes",
        icon: "🔄",
        color: colors.purple
      },
      {
        title: "Analytics Database",
        description: "Fast follower for queries",
        icon: "📊",
        color: colors.green
      },
      {
        title: "Real-Time Analytics",
        description: "Minimal production impact",
        icon: "✨",
        color: colors.emerald
      }
    ]}
  />
</DiagramContainer>

**Why this pattern works:**
- Production databases aren't equipped to handle both production workloads and large analytics scans
- Running analytics queries on production can slow the application or cause crashes
- The fast-follower pattern serves real-time analytics with minimal impact on production

**Limitations:**
- Doesn't fundamentally rethink batch query patterns
- Still running SELECT queries against current table state
- Missing opportunity to dynamically trigger events off changes in the stream

##### The Kappa Architecture

The principal idea of Kappa architecture is to handle all data like events and store these events as a stream rather than a table.

<DiagramContainer title="Kappa Architecture: Stream-First Approach">
  <StackDiagram
    layers={[
      {
        label: "Event Sources",
        color: colors.blue,
        description: "Applications, IoT devices, CDC"
      },
      {
        label: "Stream Processing Platform",
        color: colors.purple,
        description: "Kafka, Pulsar with long retention"
      },
      {
        label: "Stream Storage",
        color: colors.indigo,
        description: "Retained for months or years"
      },
      {
        label: "Processing Layer",
        color: colors.green,
        description: "Real-time and historical queries"
      }
    ]}
  />
</DiagramContainer>

The "big idea" in Kappa architecture:
- Treat streaming storage as both real-time transport and historical database
- Retain events for extended periods (months or years)
- Query directly from streaming storage or with external tools
- Support aggregation, statistical calculations, and sessionization

#### Windows, Triggers, and Late-Arriving Data

One fundamental limitation of traditional batch queries is that they treat the query engine as an external observer. Most streaming systems support computations triggered directly from the data itself.

**Windows** are an essential feature in streaming queries and processing. Windows are small batches that are processed based on dynamic triggers.

##### Session Window

<DiagramContainer title="Session Window with 5-Minute Inactivity Timeout">
  <Group title="User Activity Timeline">
    <Row gap="md">
      <Box color={colors.blue} icon="🟦">Session 1<br/>Active events</Box>
      <Box color={colors.gray} variant="outlined" size="sm">5+ min<br/>gap</Box>
      <Box color={colors.purple} icon="🟪">Session 2<br/>New activity</Box>
      <Box color={colors.gray} variant="outlined" size="sm">5+ min<br/>gap</Box>
      <Box color={colors.green} icon="🟩">Session 3<br/>New activity</Box>
    </Row>
  </Group>
</DiagramContainer>

**In plain English:** A session window is like tracking how long someone stays on your website. If they're quiet for 5 minutes, you close that session. If they come back later, that's a new session.

**In technical terms:** A session window groups events that occur close together and filters out periods of inactivity when no events occur. Session windows are per key; each user gets their own set of windows. The system accumulates data per user and closes the window after a specified inactivity gap.

**Why it matters:** Making sessionization dynamic and near real-time fundamentally changes its utility. Instead of follow-up emails a day later, users could get alerts in a mobile app that are immediately useful based on their activity in the last 15 minutes.

##### Fixed-Time (Tumbling) Windows

<DiagramContainer title="Fixed-Time (Tumbling) Windows">
  <Row gap="md">
    <Box color={colors.blue} icon="⏰">Window 1<br/>0-20 sec</Box>
    <Arrow direction="right" />
    <Box color={colors.purple} icon="⏰">Window 2<br/>20-40 sec</Box>
    <Arrow direction="right" />
    <Box color={colors.green} icon="⏰">Window 3<br/>40-60 sec</Box>
  </Row>
</DiagramContainer>

**In plain English:** Fixed-time windows are like taking a snapshot every 20 seconds. You process all the data that arrived in that 20-second window, then move to the next one.

**In technical terms:** A fixed-time window features fixed time periods that run on a fixed schedule and processes all data since the previous window closed. This is similar to traditional batch ETL processing, but with shorter intervals and lower latency.

**Why it matters:** As we'll repeatedly emphasize, batch is a special case of streaming. Fixed-time windows allow frequent data updates with lower latency than traditional batch jobs.

##### Sliding Windows

<DiagramContainer title="Sliding Windows">
  <Group title="60-second windows, sliding every 30 seconds">
    <Row gap="md">
      <Box color={colors.blue} icon="📊">Window 1<br/>0-60 sec</Box>
      <Box color={colors.purple} icon="📊">Window 2<br/>30-90 sec</Box>
      <Box color={colors.green} icon="📊">Window 3<br/>60-120 sec</Box>
    </Row>
    <Box color={colors.orange} variant="subtle" size="sm">
      Windows overlap - same event can appear in multiple windows
    </Box>
  </Group>
</DiagramContainer>

**In plain English:** Sliding windows are like a moving average—you might calculate the average over 60 seconds, but update it every 30 seconds. Each window overlaps with the previous one.

**In technical terms:** Events in a sliding window are bucketed into windows of fixed time length, where separate windows might overlap. The sliding can vary—windows might emit statistics only when certain conditions (triggers) are met.

**Why it matters:** Sliding windows provide continuous statistics over time with configurable update frequencies, enabling smooth real-time metrics and trend analysis.

##### Watermarks

<DiagramContainer title="Watermark as Threshold for Late-Arriving Data">
  <StackDiagram
    layers={[
      {
        label: "On-Time Data",
        color: colors.green,
        description: "Arrives before watermark threshold"
      },
      {
        label: "Watermark Threshold",
        color: colors.yellow,
        description: "Time boundary for window processing"
      },
      {
        label: "Late-Arriving Data",
        color: colors.orange,
        description: "Arrives after watermark - may be dropped or handled specially"
      }
    ]}
  />
</DiagramContainer>

**In plain English:** A watermark is like a deadline for a window. Data that arrives after the deadline is considered "late." You get to decide what to do with late data—ignore it, reopen the window, or handle it separately.

**In technical terms:** A watermark is a threshold used by a window to determine whether data in a window is within the established time interval or whether it's considered late. If data arrives that is new to the window but older than the timestamp of the watermark, it is considered late-arriving data.

**Why it matters:** Network delays and system latency mean events don't always arrive in order. Watermarks provide a mechanism to handle late data gracefully while still producing timely results.

#### Combining Streams with Other Data

As we've mentioned before, we often derive value from data by combining it with other data. Streaming data is no different.

##### Conventional Table Joins

<DiagramContainer title="Joining Tables Fed by Streams">
  <Column gap="md">
    <Row gap="md">
      <Box color={colors.blue} icon="🌊">Stream 1<br/>Feeds Table A</Box>
      <Box color={colors.purple} icon="🌊">Stream 2<br/>Feeds Table B</Box>
    </Row>
    <Arrow direction="down" label="Join in database" />
    <Box color={colors.green} icon="📊" size="lg">
      Joined Result Table
    </Box>
  </Column>
</DiagramContainer>

The most basic approach is simply joining tables that are fed by streams. A stream can feed one or both of these tables, and you join them like any other tables in a database.

##### Enrichment

<DiagramContainer title="Stream Enrichment Pattern">
  <ProcessFlow
    direction="horizontal"
    steps={[
      {
        title: "Event Stream",
        description: "Product & User IDs only",
        icon: "🌊",
        color: colors.blue
      },
      {
        title: "Lookup Enrichment",
        description: "Add details from cache/DB",
        icon: "🔍",
        color: colors.purple
      },
      {
        title: "Enriched Stream",
        description: "Complete event data",
        icon: "✨",
        color: colors.green
      }
    ]}
  />
</DiagramContainer>

**In plain English:** Enrichment is like adding context to a telegram. You receive a message that says "Product 123, User 456" and you look up what Product 123 is and who User 456 is, then pass along a complete message with all the details.

**In technical terms:** Enrichment means joining a stream to other data, typically to provide enhanced data into another stream. For example, a serverless function looks up additional information in an in-memory database, adds it to the event, and outputs enhanced events to another stream.

**Why it matters:** Raw events often contain only IDs and minimal data. Enrichment adds the context needed for analysis—product names, user demographics, category information—making the stream immediately useful for downstream consumers.

##### Stream-to-Stream Joining

<DiagramContainer title="Stream-to-Stream Join Architecture">
  <Column gap="md">
    <Row gap="lg">
      <Column gap="sm" align="center">
        <Box color={colors.blue} icon="🌊">Stream 1<br/>Web events</Box>
        <Box color={colors.blue} variant="outlined" size="sm">Buffer 1<br/>Retention window</Box>
      </Column>
      <Column gap="sm" align="center">
        <Box color={colors.purple} icon="🌊">Stream 2<br/>Ad platform events</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Buffer 2<br/>Retention window</Box>
      </Column>
    </Row>
    <Arrow direction="down" label="Join on key within retention" />
    <Box color={colors.green} icon="✅" size="lg">
      Joined Stream (Matched Events)
    </Box>
  </Column>
</DiagramContainer>

**In plain English:** Joining two streams is tricky because data from each stream might arrive at different times. It's like trying to match up pairs of socks from two laundry loads—you need to hold onto socks for a while to find their matches.

**In technical terms:** Streaming systems support direct stream-to-stream joining using streaming buffers. The buffer retention interval is configurable; a longer retention interval requires more storage and resources. Events get joined with data in the buffer and are eventually evicted after the retention interval has passed.

**Why it matters:** Stream-to-stream joins enable real-time correlation of events from multiple sources—for example, matching web events with ad platform data to calculate immediate ROI, or correlating IoT sensor data with weather events.

---

## 3. Data Modeling

**In plain English:** Data modeling is like creating a blueprint for your organization's information. Just as an architect designs a building's structure before construction begins, data modeling defines how data should be organized to match how your business actually works.

**In technical terms:** Data modeling is the practice of deliberately structuring data to reflect business logic, processes, definitions, and workflows. It translates organizational operations into coherent data structures using normalization, relationships, keys, and defined schemas.

**Why it matters:** Without data modeling, you end up with a data swamp—inconsistent definitions, redundant data, and queries that produce different answers to the same question. Good data modeling ensures everyone in your organization is working from the same source of truth.

> **Insight**
>
> Data modeling has been a practice for decades. As pendulums in technology often go, data modeling became somewhat unfashionable in the early to mid-2010s with the rise of data lakes and NoSQL. Nowadays, the pendulum seems to be swinging back toward data modeling as organizations recognize it's critical for realizing value from data.

### 3.1. What Is a Data Model?

A data model represents the way data relates to the real world. It reflects how the data must be structured and standardized to best reflect your organization's processes, definitions, workflows, and logic.

**A good data model:**
- Captures how communication and work naturally flow within your organization
- Contains consistent definitions across the company
- Correlates with impactful business decisions
- Translates business logic into the data layer

**A poor data model (or nonexistent one):**
- Is haphazard, confusing, and incoherent
- Has inconsistent definitions across departments
- Leads to downstream errors and misinterpretation
- Creates data swamps with redundant, mismatched, or wrong data

#### Example: Defining "Customer"

For example, a **customer** might mean different things to different departments in a company:
- Is someone who's bought from you over the last 30 days a customer?
- What if they haven't bought from you in the previous six months or a year?
- Does browsing without purchasing make someone a customer?

Carefully defining and modeling this customer data can have a massive impact on downstream reports on customer behavior or the creation of customer churn models.

> **Insight**
>
> A good data model contains consistent definitions. In practice, definitions are often messy throughout a company. Can you think of concepts or terms in your company that might mean different things to different people?

### 3.2. Conceptual, Logical, and Physical Data Models

When modeling data, the idea is to move from abstract modeling concepts to concrete implementation. Along this continuum, three main data models exist:

<DiagramContainer title="The Data Modeling Continuum">
  <ProcessFlow
    direction="horizontal"
    steps={[
      {
        title: "Conceptual Model",
        description: "Business logic, schemas, ER diagrams",
        icon: "💡",
        color: colors.blue
      },
      {
        title: "Logical Model",
        description: "Data types, keys, relationships",
        icon: "🏗️",
        color: colors.purple
      },
      {
        title: "Physical Model",
        description: "Specific databases, tables, configuration",
        icon: "⚙️",
        color: colors.green
      }
    ]}
  />
</DiagramContainer>

<CardGrid
  columns={3}
  cards={[
    {
      title: "Conceptual",
      icon: "💡",
      color: colors.blue,
      items: [
        "Contains business logic and rules",
        "Describes system's data (schemas, tables, fields)",
        "Entity-relationship (ER) diagrams",
        "Visualizes relationships among entities"
      ]
    },
    {
      title: "Logical",
      icon: "🏗️",
      color: colors.purple,
      items: [
        "Details how conceptual model is implemented",
        "Adds data types and constraints",
        "Maps out primary and foreign keys",
        "More technical than conceptual"
      ]
    },
    {
      title: "Physical",
      icon: "⚙️",
      color: colors.green,
      items: [
        "Defines implementation in database system",
        "Specific databases, schemas, tables",
        "Configuration details included",
        "Ready for deployment"
      ]
    }
  ]}
/>

**Successful data modeling involves business stakeholders at the inception of the process.** Engineers need to obtain definitions and business goals for the data. Modeling data should be a full-contact sport whose goal is to provide the business with quality data for actionable insights and intelligent automation.

#### The Grain of the Data

Another important consideration for data modeling is the **grain** of the data, which is the resolution at which data is stored and queried. The grain is typically at the level of a primary key in a table, such as customer ID, order ID, and product ID; it's often accompanied by a date or timestamp for increased fidelity.

:::tip Best Practice: Model at the Lowest Grain
In general, you should strive to model your data at the lowest level of grain possible. From here, it's easy to aggregate this highly granular dataset. The reverse isn't true, and it's generally impossible to restore details that have been aggregated away.
:::

### 3.3. Normalization

**In plain English:** Normalization is like organizing your closet using the principle "everything has a place, and there's no duplicates." Instead of keeping the same shirt in three different drawers, you keep one shirt in one place and reference it when needed.

**In technical terms:** Normalization is a database data modeling practice that enforces strict control over the relationships of tables and columns within a database. The goal is to remove data redundancy and ensure referential integrity—basically, DRY (Don't Repeat Yourself) applied to data.

**Why it matters:** Normalization prevents data inconsistencies, reduces storage requirements, and ensures updates happen in one place. However, highly normalized data may require more joins, so the degree of normalization depends on your use case.

Codd outlined four main objectives of normalization:
1. To free the collection of relations from undesirable insertion, update, and deletion dependencies
2. To reduce the need for restructuring as new types of data are introduced
3. To make the relational model more informative to users
4. To make the collection of relations neutral to query statistics

#### Normal Forms

<CardGrid
  columns={2}
  cards={[
    {
      title: "Denormalized",
      icon: "📦",
      color: colors.red,
      items: [
        "No normalization applied",
        "Nested and redundant data allowed",
        "Simple but error-prone"
      ]
    },
    {
      title: "First Normal Form (1NF)",
      icon: "1️⃣",
      color: colors.blue,
      items: [
        "Each column is unique and has single value",
        "No repeating groups",
        "Table has unique primary key"
      ]
    },
    {
      title: "Second Normal Form (2NF)",
      icon: "2️⃣",
      color: colors.purple,
      items: [
        "Requirements of 1NF",
        "Plus partial dependencies removed",
        "Non-key columns depend on entire key"
      ]
    },
    {
      title: "Third Normal Form (3NF)",
      icon: "3️⃣",
      color: colors.green,
      items: [
        "Requirements of 2NF",
        "Plus no transitive dependencies",
        "Each table contains only relevant fields"
      ]
    }
  ]}
/>

**Key Terms:**
- **Unique primary key**: A single field or set of multiple fields that uniquely determines rows in the table
- **Partial dependency**: When a subset of fields in a composite key can determine a nonkey column
- **Transitive dependency**: When a nonkey field depends on another nonkey field

#### Normalization Example: Ecommerce Orders

Let's look at stages of normalization—from denormalized to 3NF—using an ecommerce example.

**Denormalized Table (OrderDetail)**

| OrderID | OrderItems | CustomerID | CustomerName | OrderDate |
|---------|------------|------------|--------------|-----------|
| 100 | `[{"sku": 1, "price": 50, "quantity": 1, "name": "Thingamajig"}, {"sku": 2, "price": 25, "quantity": 2, "name": "Whatchamacallit"}]` | 5 | Joe Reis | 2022-03-01 |

**Moving to 1NF: Remove Nested Data**

| OrderID | Sku | Price | Quantity | ProductName | CustomerID | CustomerName | OrderDate |
|---------|-----|-------|----------|-------------|------------|--------------|-----------|
| 100 | 1 | 50 | 1 | Thingamajig | 5 | Joe Reis | 2022-03-01 |
| 100 | 2 | 25 | 2 | Whatchamacallit | 5 | Joe Reis | 2022-03-01 |

Now we have no nested data, but we don't have a unique primary key—100 occurs twice.

**Creating a Unique Primary Key**

| OrderID | LineItemNumber | Sku | Price | Quantity | ProductName | CustomerID | CustomerName | OrderDate |
|---------|----------------|-----|-------|----------|-------------|------------|--------------|-----------|
| 100 | 1 | 1 | 50 | 1 | Thingamajig | 5 | Joe Reis | 2022-03-01 |
| 100 | 2 | 2 | 25 | 2 | Whatchamacallit | 5 | Joe Reis | 2022-03-01 |
| 101 | 1 | 3 | 75 | 1 | Whozeewhatzit | 7 | Matt Housley | 2022-03-01 |
| 102 | 1 | 1 | 50 | 1 | Thingamajig | 7 | Matt Housley | 2022-03-01 |

The composite key (OrderID, LineItemNumber) is now a unique primary key.

**Moving to 2NF: Remove Partial Dependencies**

To reach 2NF, we split into two tables:

**Orders Table**

| OrderID | CustomerID | CustomerName | OrderDate |
|---------|------------|--------------|-----------|
| 100 | 5 | Joe Reis | 2022-03-01 |
| 101 | 7 | Matt Housley | 2022-03-01 |
| 102 | 7 | Matt Housley | 2022-03-01 |

**OrderLineItem Table**

| OrderID | LineItemNumber | Sku | Price | Quantity | ProductName |
|---------|----------------|-----|-------|----------|-------------|
| 100 | 1 | 1 | 50 | 1 | Thingamajig |
| 100 | 2 | 2 | 25 | 2 | Whatchamacallit |
| 101 | 1 | 3 | 75 | 1 | Whozeewhatzit |
| 102 | 1 | 1 | 50 | 1 | Thingamajig |

**Moving to 3NF: Remove Transitive Dependencies**

Notice that Sku determines ProductName in OrderLineItem. That's a transitive dependency. Let's break it into two tables:

**OrderLineItem Table (3NF)**

| OrderID | LineItemNumber | Sku | Price | Quantity |
|---------|----------------|-----|-------|----------|
| 100 | 1 | 1 | 50 | 1 |
| 100 | 2 | 2 | 25 | 2 |
| 101 | 1 | 3 | 75 | 1 |
| 102 | 1 | 1 | 50 | 1 |

**Skus Table**

| Sku | ProductName |
|-----|-------------|
| 1 | Thingamajig |
| 2 | Whatchamacallit |
| 3 | Whozeewhatzit |

Now both OrderLineItem and Skus are in 3NF!

:::tip Practical Advice
The degree of normalization that you should apply to your data depends on your use case. No one-size-fits-all solution exists, especially in databases where some denormalization presents performance advantages. Study normalization conventions and database best practices to choose an appropriate strategy.
:::

### 3.4. Techniques for Modeling Batch Analytical Data

When describing data modeling for data lakes or data warehouses, you should assume that the raw data takes many forms, but the output is a structured data model of rows and columns. The big approaches you'll likely encounter are **Kimball**, **Inmon**, and **Data Vault**.

:::info Note
Our coverage of these approaches is cursory and hardly does justice to their complexity and nuance. These books are must-reads for data engineers to understand how and why data modeling is central to batch analytical data.
:::

#### Inmon

**In plain English:** Bill Inmon's approach is like building a central library for all your company's information. You bring data from every department, organize it meticulously in a highly structured way (3NF), and then create specialized reading rooms (data marts) for different departments to use.

**In technical terms:** The father of the data warehouse, Bill Inmon, created his approach in 1989. Data is integrated from across the organization in a granular, highly normalized ER model (3NF), with a relentless emphasis on ETL. The data warehouse represents a "single source of truth," which supports the overall business's information requirements.

**Why it matters:** Inmon's approach ensures minimal data duplication, leading to fewer downstream analytical errors because data won't diverge or suffer from redundancies. However, it requires significant upfront modeling and ETL work.

Inmon defines a data warehouse as:

> A subject-oriented, integrated, nonvolatile, and time-variant collection of data in support of management's decisions.

<CardGrid
  columns={2}
  cards={[
    {
      title: "Subject-Oriented",
      icon: "🎯",
      color: colors.blue,
      items: [
        "Focuses on specific subject area",
        "Examples: sales, marketing, finance",
        "Contains all details for that subject",
        "Business keys, relationships, attributes"
      ]
    },
    {
      title: "Integrated",
      icon: "🔗",
      color: colors.purple,
      items: [
        "Data from disparate sources consolidated",
        "Converted, reformatted, resequenced",
        "Single physical corporate image",
        "Most important characteristic"
      ]
    },
    {
      title: "Nonvolatile",
      icon: "🔒",
      color: colors.green,
      items: [
        "Data remains unchanged after storage",
        "Historical records preserved",
        "No updates to existing data",
        "Append-only architecture"
      ]
    },
    {
      title: "Time-Variant",
      icon: "⏰",
      color: colors.orange,
      items: [
        "Varying time ranges can be queried",
        "Historical analysis supported",
        "Query original data over time",
        "Temporal dimensions included"
      ]
    }
  ]}
/>

<DiagramContainer title="Inmon Ecommerce Data Warehouse Architecture">
  <StackDiagram
    layers={[
      {
        label: "Source Systems",
        color: colors.blue,
        description: "Orders, Inventory, Marketing"
      },
      {
        label: "ETL Layer",
        color: colors.purple,
        description: "Extract, Transform, Load to 3NF"
      },
      {
        label: "Data Warehouse (3NF)",
        color: colors.indigo,
        description: "Highly normalized, single source of truth"
      },
      {
        label: "Data Marts",
        color: colors.green,
        description: "Sales, Marketing, Purchasing (Star Schemas)"
      }
    ]}
  />
</DiagramContainer>

#### Kimball

**In plain English:** If Inmon's approach is top-down (build the central library first), Kimball's is bottom-up (build reading rooms first). Kimball focuses on delivering department-specific analytics quickly using star schemas with fact and dimension tables, accepting some denormalization for performance.

**In technical terms:** Created by Ralph Kimball in the early 1990s, this approach focuses less on normalization and in some cases accepts denormalization. The Kimball model is bottom-up, encouraging you to model and serve department or business analytics in the data warehouse itself. Data is modeled with facts and dimensions in a star schema.

**Why it matters:** Kimball may enable faster iteration and modeling than Inmon, with the trade-off of potential looser data integration, data redundancy, and duplication. As Inmon says, "A data mart is never a substitute for a data warehouse," highlighting the philosophical difference.

<DiagramContainer title="Kimball Star Schema">
  <Column gap="md" align="center">
    <Row gap="lg">
      <Box color={colors.blue} variant="outlined" size="sm" icon="📅">Date Dimension</Box>
      <Box color={colors.green} variant="outlined" size="sm" icon="👤">Customer Dimension</Box>
    </Row>
    <Box color={colors.yellow} variant="filled" size="lg" icon="📊">
      Fact Table (Center)<br/>Measurements & Keys
    </Box>
    <Row gap="lg">
      <Box color={colors.purple} variant="outlined" size="sm" icon="📦">Product Dimension</Box>
      <Box color={colors.pink} variant="outlined" size="sm" icon="📍">Location Dimension</Box>
    </Row>
  </Column>
</DiagramContainer>

##### Fact Tables

**In plain English:** A fact table is like a transaction log—it records events that happened (sales, clicks, orders). Each row is an immutable fact about something that occurred, with numbers (amounts, quantities, counts) and foreign keys pointing to dimension tables for context.

**In technical terms:** The fact table contains factual, quantitative, and event-related data. The data is immutable because facts relate to events. Fact tables are typically narrow and long (few columns, many rows). They should be at the lowest grain possible and reference only dimensions, not other fact tables.

**Example Fact Table**

| OrderID | CustomerKey | DateKey | GrossSalesAmt |
|---------|-------------|---------|---------------|
| 100 | 5 | 20220301 | 100.00 |
| 101 | 7 | 20220301 | 75.00 |
| 102 | 7 | 20220301 | 50.00 |

Notice that the data types are all numbers (integers and floats); there are no strings. The fact table has keys that reference dimension tables containing their respective attributes.

##### Dimension Tables

**In plain English:** Dimension tables are like reference books that provide context. They answer questions like "who," "what," "when," and "where" about the facts. They're wide (many columns) and short (relatively few rows).

**In technical terms:** Dimension tables provide reference data, attributes, and relational context for the events stored in fact tables. They are smaller than fact tables and take an opposite shape, typically wide and short. Dimensions are denormalized, with the possibility of duplicate data.

**Date Dimension Table**

| DateKey | Date-ISO | Year | Quarter | Month | Day-of-week |
|---------|----------|------|---------|-------|-------------|
| 20220301 | 2022-03-01 | 2022 | 1 | 3 | Tuesday |
| 20220302 | 2022-03-02 | 2022 | 1 | 3 | Wednesday |
| 20220303 | 2022-03-03 | 2022 | 1 | 3 | Thursday |

With the date dimension table, you can easily answer questions like, "What are my total sales in the first quarter of 2022?" or "How many more customers shop on Tuesday than Wednesday?"

##### Slowly Changing Dimensions (SCD)

**Type 2 Customer Dimension Table**

| CustomerKey | FirstName | LastName | ZipCode | EFF_StartDate | EFF_EndDate |
|-------------|-----------|----------|---------|---------------|-------------|
| 5 | Joe | Reis | 84108 | 2019-01-04 | 9999-01-01 |
| 7 | Matt | Housley | 84101 | 2020-05-04 | 2021-09-19 |
| 7 | Matt | Housley | 84123 | 2021-09-19 | 9999-01-01 |
| 11 | Lana | Belle | 90210 | 2022-02-04 | 9999-01-01 |

<ComparisonTable
  beforeTitle="SCD Types"
  afterTitle="Characteristics"
  beforeColor={colors.blue}
  afterColor={colors.green}
  items={[
    {
      label: "Type 1 (Overwrite)",
      before: "Overwrite existing dimension records",
      after: "Super simple, but no access to historical records"
    },
    {
      label: "Type 2 (Add New Row)",
      before: "Keep full history by creating new records",
      after: "Complete history, but table grows larger"
    },
    {
      label: "Type 3 (Add New Column)",
      before: "Add columns for current and previous values",
      after: "Limited history, schema changes frequently"
    }
  ]}
/>

##### Star Schema

Now that you have a basic understanding of facts and dimensions, it's time to integrate them into a star schema. The star schema represents the data model of the business. Unlike highly normalized approaches, the star schema is a fact table surrounded by the necessary dimensions.

**Benefits:**
- Fewer joins than other data models, speeding up query performance
- Arguably easier for business users to understand and use
- Flexible enough to answer critical business questions

**Conformed Dimensions:**
A dimension that is reused across multiple star schemas, sharing the same fields, is called a **conformed dimension**. A conformed dimension allows you to combine multiple fact tables across multiple star schemas.

#### Data Vault

**In plain English:** Data Vault is like a highly organized filing system where you separate "what things are" (hubs), "how they relate" (links), and "what we know about them" (satellites). It's extremely flexible for changing business requirements because you just add new links or satellites rather than restructuring everything.

**In technical terms:** Created in the 1990s by Dan Linstedt, the Data Vault methodology separates the structural aspects of a source system's data from its attributes. Instead of representing business logic in facts, dimensions, or highly normalized tables, a Data Vault simply loads data from source systems directly into purpose-built tables in an insert-only manner.

**Why it matters:** Data Vault is designed for agility, flexibility, and scalability. The goal is to keep data as closely aligned to the business as possible, even while the business's data evolves. However, business logic is created when querying, not in the stored model.

<DiagramContainer title="Data Vault Core Components">
  <Row gap="lg">
    <Box color={colors.blue} icon="🎯">
      Hubs<br/>
      <small>Business keys</small>
    </Box>
    <Arrow direction="right" />
    <Box color={colors.purple} icon="🔗">
      Links<br/>
      <small>Relationships between keys</small>
    </Box>
    <Arrow direction="right" />
    <Box color={colors.green} icon="📝">
      Satellites<br/>
      <small>Attributes & context</small>
    </Box>
  </Row>
</DiagramContainer>

##### Hubs

Queries often involve searching by a business key, such as a customer ID or an order ID. A **hub** is the central entity of a Data Vault that retains a record of all unique business keys loaded into the Data Vault.

**A hub always contains:**
- **Hash key**: The primary key used to join data between systems (calculated hash field like MD5)
- **Load date**: The date the data was loaded into the hub
- **Record source**: The source from which the unique record was obtained
- **Business key(s)**: The key used to identify a unique record

**Product Hub Example**

| ProductHashKey | LoadDate | RecordSource | ProductID |
|----------------|----------|--------------|-----------|
| 4041fd80ab... | 2020-01-02 | ERP | 1 |
| de8435530d... | 2021-03-09 | ERP | 2 |
| cf27369bd8... | 2021-03-09 | ERP | 3 |

**Order Hub Example**

| OrderHashKey | LoadDate | RecordSource | OrderID |
|--------------|----------|--------------|---------|
| f899139df5... | 2022-03-01 | Website | 100 |
| 38b3eff8ba... | 2022-03-01 | Website | 101 |
| ec8956637a... | 2022-03-01 | Website | 102 |

##### Links

A **link table** tracks the relationships of business keys between hubs. Link tables connect hubs, ideally at the lowest possible grain. Because link tables connect data from various hubs, they are many to many.

**Link Table for Products and Orders**

| OrderProductHashKey | LoadDate | RecordSource | ProductHashKey | OrderHashKey |
|--------------------|----------|--------------|----------------|--------------|
| ff64ec193d... | 2022-03-01 | Website | 4041fd80ab... | f899139df5... |
| ff64ec193d... | 2022-03-01 | Website | de8435530d... | f899139df5... |
| e232628c25... | 2022-03-01 | Website | cf27369bd8... | 38b3eff8ba... |
| 26166a5871... | 2022-03-01 | Website | 4041fd80ab... | ec8956637a... |

##### Satellites

**Satellites** are descriptive attributes that give meaning and context to hubs. Satellites can connect to either hubs or links. The only required fields are a primary key consisting of the business key of the parent hub and a load date.

**SatelliteProduct Example**

| ProductHashKey | LoadDate | RecordSource | ProductName | Price |
|----------------|----------|--------------|-------------|-------|
| 4041fd80ab... | 2020-01-02 | ERP | Thingamajig | 50 |
| de8435530d... | 2021-03-09 | ERP | Whatchamacallit | 25 |
| cf27369bd8... | 2021-03-09 | ERP | Whozeewhatzit | 75 |

Unlike other data modeling techniques, in a Data Vault, the business logic is created and interpreted when the data from these tables is queried. The Data Vault model can be used with other data modeling techniques—it's not unusual for a Data Vault to be the landing zone for analytical data, after which it's separately modeled in a data warehouse using a star schema.

#### Wide Denormalized Tables

**In plain English:** A wide table is like spreading out all your data horizontally—instead of having many interconnected tables, you put everything in one massive table with hundreds or thousands of columns. It's the data modeling equivalent of packing everything in one big suitcase instead of organizing items across multiple bags.

**In technical terms:** Wide tables are highly denormalized and very wide collections of many fields, typically created in columnar databases. A field may be a single value or contain nested data. Wide tables can potentially have thousands of columns and are usually sparse (many nulls).

**Why it matters:** In modern cloud columnar databases, wide tables can dramatically improve query performance by eliminating joins. Storage is cheap, and columnar databases handle nulls efficiently, making this once-heretical approach practical and performant for analytics workloads.

<ComparisonTable
  beforeTitle="Traditional Approach"
  afterTitle="Wide Table Approach"
  beforeColor={colors.red}
  afterColor={colors.green}
  items={[
    {
      label: "Structure",
      before: "Many normalized tables with joins",
      after: "Single wide denormalized table"
    },
    {
      label: "Performance",
      before: "Joins can be expensive",
      after: "No joins needed, faster queries"
    },
    {
      label: "Storage",
      before: "Minimal redundancy",
      after: "More storage, but it's cheap"
    },
    {
      label: "Flexibility",
      before: "Schema changes require planning",
      after: "Easy to add columns"
    }
  ]}
/>

**Wide Table Example**

| OrderID | OrderItems | CustomerID | CustomerName | OrderDate | Site | SiteRegion |
|---------|------------|------------|--------------|-----------|------|------------|
| 100 | `[{"sku": 1, "price": 50, "quantity": 1, "name": "Thingamajig"}, {"sku": 2, "price": 25, "quantity": 2, "name": "Whatchamacallit"}]` | 5 | Joe Reis | 2022-03-01 | abc.com | US |

We suggest using a wide table when you don't care about data modeling, or when you have a lot of data that needs more flexibility than traditional data-modeling rigor provides. Wide tables also lend themselves to streaming data.

#### What If You Don't Model Your Data?

You also have the option of not modeling your data—just query data sources directly. This pattern is often used when companies are just getting started and want to get quick insights.

**Questions to consider:**
- If I don't model my data, how do I know the results of my queries are consistent?
- Do I have proper definitions of business logic in the source system?
- What query load am I putting on my source systems, and how does this impact users?

At some point, you'll probably gravitate toward a stricter batch data model paradigm and a dedicated data architecture that doesn't rely on the source systems for the heavy lifting.

### 3.5. Modeling Streaming Data

**In plain English:** Streaming data is like a river—it's constantly flowing and changing. The batch data modeling techniques (Kimball, Inmon, Data Vault) were designed for lakes of stored data, not rivers. We need new approaches that can handle data that's always in motion with schemas that change frequently.

**In technical terms:** Because of the unbounded and continuous nature of streaming data, translating batch techniques to a streaming paradigm is tricky, if not impossible. There isn't (yet) a consensus approach on streaming data modeling. The challenge is that payload schemas might change on a whim, requiring flexible approaches.

**Why it matters:** The world is evolving from batch to streaming and from on premises to the cloud. The constraints of older batch methods no longer apply. New approaches will likely incorporate metrics and semantic layers, data pipelines, and traditional analytics workflows in a streaming layer that sits directly on top of the source system.

:::caution Streaming Data Challenges
For example, given a stream of data, how would you continuously update a Type-2 slowly changing dimension without bringing your data warehouse to its knees? These are the kinds of problems that make traditional batch modeling techniques unsuitable for streaming.
:::

**Expert Consensus:**
The streaming data experts overwhelmingly suggest you:
- Anticipate changes in the source data
- Keep a flexible schema
- Assume source systems are providing correct data with the right business definitions
- Store recent streaming and saved historical data together
- Optimize for comprehensive analytics against a dataset with a flexible schema

> **Insight**
>
> The world of data modeling is changing, and we believe a sea change will soon occur in data model paradigms. Since data is being generated in real time, the notion of artificially separating source and analytics systems into two distinct buckets may not make as much sense as when data moved more slowly and predictably. Time will tell…

---

## 4. Transformations

**In plain English:** Imagine running the same complicated recipe every time someone wants a meal—it's exhausting and wasteful. Transformations are like meal prep: you do the heavy lifting once (cleaning, chopping, cooking), save the prepared ingredients, and then quickly assemble meals when needed.

**In technical terms:** A transformation differs from a query in two key ways: (1) it persists results for downstream consumption, and (2) it handles complex, multi-source dataflows through orchestrated pipelines. Transformations apply business logic, aggregate data, normalize structures, and prepare data products for serving.

**Why it matters:** Without transformations, every user would run expensive queries repeatedly, wasting time and money. Transformations enable scalability, consistency, and cost-efficiency by performing compute-intensive work once and reusing results across the organization.

> **"The net result of transforming data is the ability to unify and integrate data. Once data is transformed, the data can be viewed as a single entity. But without transforming data, you cannot have a unified view of data across the organization."**
>
> — Bill Inmon

Transformations critically rely on one of the major undercurrents in this book: **orchestration**. Orchestration combines many discrete operations that store data temporarily or permanently for consumption by downstream transformations or serving.

### 4.1. Batch Transformations

**In plain English:** Batch transformations are like doing laundry—you gather up a load of dirty clothes (data), run them through the washing machine (transformation), and end up with clean, folded clothes (transformed data) ready to use. You do this on a schedule, like daily or hourly.

**In technical terms:** Batch transformations run on discrete chunks of data, in contrast to streaming transformations where data is processed continuously. They can run on a fixed schedule (daily, hourly, every 15 minutes) to support ongoing reporting, analytics, and ML models.

**Why it matters:** Batch transformations are the workhorses of data engineering—they power most reporting, analytics, and machine learning workflows. Understanding batch transformation patterns and technologies is essential for building scalable data pipelines.

#### Distributed Joins

The basic idea behind distributed joins is that we need to break a logical join into much smaller node joins that run on individual servers in the cluster.

##### Broadcast Join

<DiagramContainer title="Broadcast Join">
  <Column gap="md">
    <Row gap="md">
      <Box color={colors.blue} icon="📊">Small Table A<br/><small>Fits on single node</small></Box>
      <Arrow direction="right" label="Broadcast to all nodes" />
      <Box color={colors.green} icon="🌐">All Nodes</Box>
    </Row>
    <Arrow direction="down" label="Join locally" />
    <Box color={colors.purple} icon="💾">Large Table B<br/><small>Distributed across nodes</small></Box>
    <Arrow direction="down" />
    <Box color={colors.emerald} icon="✅">Combined Results</Box>
  </Column>
</DiagramContainer>

**In plain English:** A broadcast join is like making photocopies of a small reference manual and giving one to every worker. Each worker can then match their big pile of work against their copy of the manual without waiting for anyone else.

**In technical terms:** A broadcast join is generally asymmetric, with one large table distributed across nodes and one small table that can easily fit on a single node. The query engine "broadcasts" the small table out to all nodes, where it gets joined to the parts of the large table. Broadcast joins are far less compute intensive than shuffle hash joins.

**Why it matters:** Broadcast joins dramatically improve performance when one table is small enough to fit in memory on each node. Query optimizers prioritize creating broadcast joins through early filtering and join reordering.

##### Shuffle Hash Join

<DiagramContainer title="Shuffle Hash Join">
  <Column gap="md">
    <Row gap="lg">
      <Box color={colors.blue} variant="outlined">Initial Table A<br/><small>Distributed randomly</small></Box>
      <Box color={colors.purple} variant="outlined">Initial Table B<br/><small>Distributed randomly</small></Box>
    </Row>
    <Arrow direction="down" label="Shuffle by hash(join_key)" />
    <Row gap="lg">
      <Box color={colors.green} variant="outlined">Repartitioned A<br/><small>By join key</small></Box>
      <Box color={colors.emerald} variant="outlined">Repartitioned B<br/><small>By join key</small></Box>
    </Row>
    <Arrow direction="down" label="Local joins on each node" />
    <Box color={colors.yellow} variant="filled">Joined Results</Box>
  </Column>
</DiagramContainer>

**In plain English:** If neither table is small enough to broadcast, you need a shuffle hash join. It's like sorting two decks of cards by suit—you redistribute the cards so all hearts are in one pile, all spades in another, etc. Then you can match them up pile by pile.

**In technical terms:** A hashing scheme is used to repartition data by join key. The data is then reshuffled to the appropriate node, and the new partitions for tables A and B on each node are joined. Shuffle hash joins are generally more resource intensive than broadcast joins.

**Why it matters:** Shuffle hash joins enable joining arbitrarily large tables, though at a performance cost. Understanding when and how shuffles occur helps optimize query performance.

#### ETL, ELT, and Data Pipelines

<ComparisonTable
  beforeTitle="ETL (Extract-Transform-Load)"
  afterTitle="ELT (Extract-Load-Transform)"
  beforeColor={colors.orange}
  afterColor={colors.green}
  items={[
    {
      label: "Approach",
      before: "Transform before loading",
      after: "Load raw, transform in warehouse"
    },
    {
      label: "Process",
      before: "External system transforms data, then loads",
      after: "Load data first, transform directly in warehouse"
    },
    {
      label: "Best For",
      before: "Resource-constrained systems, complex pre-processing",
      after: "Modern cloud warehouses with abundant resources"
    },
    {
      label: "Flexibility",
      before: "Fixed target schema",
      after: "Can explore data before finalizing schema"
    }
  ]}
/>

**Traditional ETL** relies on an external transformation system to pull, transform, and clean data while preparing it for a target schema. The transformed data would then be loaded into a target system where business analytics could be performed.

**Modern ELT** extracts raw data from a source system, imports it into a data warehouse with minimal transformation, and then cleans and transforms it directly in the warehouse system.

:::warning Bill Inmon's Warning
I've always been a fan of ETL because of the fact that ETL forces you to transform data before you put it into a form where you can work with it. But some organizations want to simply take the data, put it into a database, then do the transformation.... I've seen too many cases where the organization says, oh we'll just put the data in and transform it later. And guess what? Six months later, that data [has] never been touched.
:::

> **Insight**
>
> Increasingly, we feel that the terms ETL and ELT should be applied only at the micro level (within individual transformation pipelines) rather than at the macro level (to describe a transformation pattern for a whole organization). Organizations no longer need to standardize on ETL or ELT but can instead focus on applying the proper technique on a case-by-case basis.

#### Update Patterns

Since transformations persist data, we will often update persisted data in place. Let's consider several basic update patterns:

<CardGrid
  columns={2}
  cards={[
    {
      title: "Truncate and Reload",
      icon: "🔄",
      color: colors.blue,
      items: [
        "Wipes old data completely",
        "Reruns transformations",
        "Loads into cleared table",
        "Simple but not always efficient"
      ]
    },
    {
      title: "Insert Only",
      icon: "➕",
      color: colors.green,
      items: [
        "Inserts new records only",
        "Doesn't change old records",
        "Maintains complete history",
        "May need deduplication at query time"
      ]
    },
    {
      title: "Delete",
      icon: "🗑️",
      color: colors.red,
      items: [
        "Hard delete: permanently removes",
        "Soft delete: marks as deleted",
        "Insert deletion: adds deleted flag",
        "More expensive in columnar systems"
      ]
    },
    {
      title: "Upsert/Merge",
      icon: "🔀",
      color: colors.purple,
      items: [
        "Updates existing records",
        "Inserts new records",
        "Uses copy-on-write (COW)",
        "Most complex but most flexible"
      ]
    }
  ]}
/>

:::warning
When inserting data into a column-oriented OLAP database, avoid single-row inserts. This antipattern puts a massive load on the system and causes data to be written in many separate files. Instead, load data in a periodic micro-batch or batch fashion.
:::

### 4.2. Streaming Transformations and Processing

**In plain English:** Streaming transformations are like working on an assembly line that never stops. Instead of waiting for a batch of items to pile up, you process each item as it flows by, enriching it, combining it with other streams, and passing it along—all in real time.

**In technical terms:** Streaming transformations aim to prepare data for downstream consumption in real time. Unlike batch transformations that run on discrete chunks, streaming transformations process data continuously as it arrives, using windows, triggers, and streaming DAGs.

**Why it matters:** Streaming transformations enable real-time data products, immediate responses to events, and continuous data enrichment. They're essential for use cases requiring low latency and immediate action.

#### Basics

Streaming queries run dynamically to present a current view of data. Streaming transformations aim to prepare data for downstream consumption.

<DiagramContainer title="Streaming Transformation Pipeline">
  <ProcessFlow
    direction="horizontal"
    steps={[
      {
        title: "Incoming Stream",
        description: "Raw IoT events",
        icon: "🌊",
        color: colors.blue
      },
      {
        title: "Stream Processor",
        description: "Enrich with metadata",
        icon: "⚙️",
        color: colors.purple
      },
      {
        title: "Enriched Stream",
        description: "Complete event data",
        icon: "✨",
        color: colors.green
      },
      {
        title: "Downstream",
        description: "Queries & metrics",
        icon: "📊",
        color: colors.emerald
      }
    ]}
  />
</DiagramContainer>

For instance, a data engineering team may have an incoming stream carrying events from an IoT source. The stream-processing engine queries a separate database containing metadata by device ID, generates new events with the added data, and passes it on to another stream.

> **Insight**
>
> The line between transformations and queries is blurry in batch processing, but the differences become even more subtle in the domain of streaming. For example, if we dynamically compute roll-up statistics on windows and send the output to a target stream, is this a transformation or a query? Maybe we will eventually adopt new terminology that better represents real-world use cases.

#### Streaming DAGs

<DiagramContainer title="Simple Streaming DAG">
  <Column gap="md">
    <Row gap="lg">
      <Box color={colors.blue} icon="🌊">Website Clickstream</Box>
      <Box color={colors.purple} icon="🌊">IoT Data Stream</Box>
    </Row>
    <Arrow direction="down" label="Preprocess each stream" />
    <Row gap="lg">
      <Box color={colors.blue} variant="outlined">Standardized Clickstream</Box>
      <Box color={colors.purple} variant="outlined">Standardized IoT Data</Box>
    </Row>
    <Arrow direction="down" label="Merge" />
    <Box color={colors.green} icon="✅" size="lg">
      Unified User Activity Stream
    </Box>
  </Column>
</DiagramContainer>

One interesting notion is the streaming DAG. Suppose we want to combine website clickstream data with IoT data to get a unified view of user activity. Each data stream needs to be preprocessed into a standard format.

This has long been possible by combining a streaming store (Kafka) with a stream processor (Flink). Creating the DAG amounted to building a complex Rube Goldberg machine with numerous topics and processing jobs connected. **Pulsar** dramatically simplifies this process by treating DAGs as a core streaming abstraction.

#### Micro-Batch Versus True Streaming

<ComparisonTable
  beforeTitle="Micro-Batch"
  afterTitle="True Streaming"
  beforeColor={colors.orange}
  afterColor={colors.green}
  items={[
    {
      label: "Approach",
      before: "Process small batches frequently (1-120 seconds)",
      after: "Process one event at a time"
    },
    {
      label: "Examples",
      before: "Apache Spark Streaming",
      after: "Apache Flink, Apache Beam"
    },
    {
      label: "Latency",
      before: "Seconds to minutes",
      after: "Milliseconds to seconds"
    },
    {
      label: "Best For",
      before: "Analytics updated every few minutes, existing Spark expertise",
      after: "Ultra-low latency requirements, per-event processing"
    }
  ]}
/>

**In plain English:** The debate between micro-batch and true streaming is like arguing whether you should wash dishes after every meal (true streaming) or wait until you have a small pile (micro-batch). The answer depends on your situation—if you have dinner parties every night, maybe you need continuous dishwashing. If you live alone, maybe a few times a day is fine.

**In technical terms:** Micro-batching takes a batch-oriented framework and applies it in a streaming situation. True streaming systems process one event at a time with lower latency but potentially higher overhead.

**Why it matters:** There is no universal answer. Micro-batch may work fine for your use case and can be superior depending on your needs. Talk to experts, test the alternatives, and watch out for spurious benchmarks from vendors.

---

## 5. Whom You'll Work With

Queries, transformations, and modeling impact all stakeholders up and down the data engineering lifecycle. The data engineer is responsible for several things at this stage.

**From a technical angle:**
- Design, build, and maintain systems that query and transform data
- Implement data models within these systems
- Ensure performance and reliability
- Add maximum value through functioning systems and trustworthy data

### Upstream Stakeholders

When it comes to transformations, upstream stakeholders can be broken into two broad categories:

<CardGrid
  columns={2}
  cards={[
    {
      title: "Business Definitions",
      icon: "💼",
      color: colors.blue,
      items: [
        "Business stakeholders defining logic",
        "Product teams owning apps",
        "Subject matter experts",
        "Provide definitions and goals for data"
      ]
    },
    {
      title: "System Owners",
      icon: "⚙️",
      color: colors.purple,
      items: [
        "Engineers managing source systems",
        "Application developers",
        "Platform teams",
        "Ensure minimal system impact"
      ]
    }
  ]}
/>

The stakeholders of the upstream systems want to make sure your queries and transformations minimally impact their systems. Ensure bidirectional communication about changes to data models in source systems, as these can directly impact queries, transformations, and analytical data models.

### Downstream Stakeholders

<CardGrid
  columns={3}
  cards={[
    {
      title: "Data Analysts",
      icon: "📊",
      color: colors.blue,
      items: [
        "Need performant queries",
        "Require quality, complete data",
        "Create reports and dashboards",
        "Explore data for insights"
      ]
    },
    {
      title: "Data Scientists & ML Engineers",
      icon: "🧬",
      color: colors.purple,
      items: [
        "Build models and features",
        "Need consistent data definitions",
        "Integrate into workflows",
        "Deploy data products"
      ]
    },
    {
      title: "The Business",
      icon: "💼",
      color: colors.green,
      items: [
        "Trust data for decisions",
        "Need accurate, actionable insights",
        "Rely on timely reporting",
        "Drive business outcomes"
      ]
    }
  ]}
/>

Collaborate with them to ensure the data model and transformations you provide are performant and useful. Queries should execute as quickly as possible in the most cost-effective way. The business should be able to trust that transformed data is accurate and actionable.

---

## 6. Undercurrents

The transformation stage is where your data mutates and morphs into something useful for the business. Because there are many moving parts, the undercurrents are especially critical at this stage.

### Security

**In plain English:** When you combine data from different sources into new datasets, you create new security considerations. Who should have access to this combined data? Just because someone can see customer names doesn't mean they should see customer purchase history.

**In technical terms:** Queries and transformations combine disparate datasets into new datasets. Continue to control access at the column, row, and cell level. Be aware of attack vectors against your database at query time. Read/write privileges must be tightly monitored and controlled.

**Key actions:**
- Control access to new transformed datasets
- Keep credentials hidden, avoid copying passwords into code
- Never allow unencrypted data to traverse the public internet
- Implement least-privilege access principles

### Data Management

**In plain English:** Transformation creates tons of new datasets, and without good organization, you'll end up with a mess. You need naming conventions everyone follows, definitions everyone agrees on, and ways to track where data came from and where it goes.

**In technical terms:** Transformation inherently creates new datasets that need to be managed. Involve all stakeholders, agree on naming conventions, and ensure proper definitions. Leverage data catalogs and data lineage tools to track data flow and transformations.

**Key considerations:**
- Naming conventions and documentation
- Data catalogs for discovery
- Data lineage for understanding transformations
- Semantic or metrics layers for business logic
- Regulatory compliance (GDPR, data deletion)

### DataOps

<CardGrid
  columns={2}
  cards={[
    {
      title: "Data Quality",
      icon: "✅",
      color: colors.blue,
      items: [
        "Schema correctness",
        "Data shape validation",
        "Statistics monitoring",
        "Data quality tests"
      ]
    },
    {
      title: "System Performance",
      icon: "⚡",
      color: colors.purple,
      items: [
        "Query metrics tracking",
        "Resource usage monitoring",
        "Cost management (FinOps)",
        "Observability practices"
      ]
    }
  ]}
/>

Monitor both data quality and system performance. Run data-quality tests continuously and implement observability to catch issues early.

### Data Architecture

**In plain English:** Your architecture choices for storing and moving data directly affect how well queries and transformations work. If you stored data poorly, transformations will be slow and expensive. Good architecture makes transformations fast and cost-effective.

**In technical terms:** Build robust systems that can process and transform data without imploding. Your choices for ingestion and storage directly impact query and transformation performance. Understand trade-offs and ensure your architecture matches your workload.

**Key principles:**
- Design for the workload (OLAP vs OLTP)
- Understand distributed system characteristics
- Plan for scalability and elasticity
- Consider cost implications of architecture choices

### Orchestration

**In plain English:** Orchestration is like conducting an orchestra—it coordinates all the different transformation steps so they happen in the right order, at the right time, with the right dependencies. Without it, you're just hoping everything works out.

**In technical terms:** Use orchestration to manage complex pipelines with dependency-based approaches rather than simple cron jobs. Orchestration is the glue that allows pipelines to span multiple systems and manage complex dependencies.

**Why it matters:** Modern data pipelines are too complex for simple scheduling. Orchestration enables:
- Dependency management
- Error handling and retries
- Multi-system coordination
- Visibility into pipeline execution

### Software Engineering

**In plain English:** Writing good data transformation code is a skill. Just like you wouldn't build a house without knowing carpentry, you shouldn't write transformation code without understanding best practices for SQL, Python, Spark, or whatever tools you're using.

**In technical terms:** Know best practices for your tools (SQL, Python, Spark). Avoid anti-patterns like inefficient UDFs. Embrace analytics engineering tools like dbt. Understand what GUI tools generate under the hood. Write clean, performant code rather than throwing more resources at problems.

**Best practices:**
- Follow idiomatic patterns for your tools
- Filter early and often
- Understand query optimization
- Use appropriate abstractions
- Write maintainable, readable code

---

## 7. Summary

You've learned how to make data useful through queries, modeling, and transformations—the core capabilities that turn raw data into consumable analytics assets.

### Key Takeaways

1. **Queries are the interface to data** - Understanding how queries work, from parsing to optimization to execution, helps you write better queries and diagnose performance problems

2. **Query optimization is critical** - Use explain plans, prune unnecessary scans, optimize joins, manage commits properly, vacuum dead records, and leverage caching

3. **Streaming queries require different patterns** - Fast-follower approaches, Kappa architecture, windows, triggers, and stream joins enable real-time analytics

4. **Data modeling creates structure** - Whether Kimball star schemas, Inmon normalized warehouses, Data Vault flexible structures, or wide denormalized tables, modeling imposes business logic on data

5. **Normalization has trade-offs** - From denormalized (0NF) to third normal form (3NF), each level reduces redundancy but may increase query complexity

6. **Streaming data modeling is evolving** - Traditional batch modeling doesn't translate well to streaming; flexible schemas and new paradigms are emerging

7. **Transformations persist results** - Unlike queries that just retrieve data, transformations save results for downstream consumption, enabling scalability and reusability

8. **Batch transformations are workhorses** - Distributed joins, ETL/ELT patterns, update strategies, and business logic rendering power most analytics workflows

9. **Streaming transformations enable real-time** - Enrichment, stream-to-stream joins, streaming DAGs, and micro-batch vs true streaming support low-latency use cases

10. **Undercurrents matter more at transformation** - Security, data management, DataOps, architecture, orchestration, and software engineering are critical at this stage

> **Insight**
>
> Transformations sit at the heart of data pipelines. It's critical to keep in mind the purpose of transformations. Ultimately, engineers are not hired to play with the latest technological toys but to serve their customers. Transformations are where data adds value and ROI to the business.

As we head into the serving stage of the data engineering lifecycle in Chapter 9, reflect on technology as a tool for realizing organizational goals. Think about how improvements in transformation systems could help you serve your end customers better and the kinds of business problems you're interested in solving with technology.

**Additional Resources:**

Data Modeling:
- *The Data Warehouse Toolkit* by Ralph Kimball and Margy Ross (Wiley)
- *Building the Data Warehouse* by W. H. (Bill) Inmon (Wiley)
- *Building a Scalable Data Warehouse with Data Vault 2.0* by Daniel Linstedt and Michael Olschimke (Morgan Kaufmann)
- "Data Vault 2.0 Modeling Basics" by Kent Graziano
- Kimball Group's dimensional modeling techniques

Query Optimization:
- "A Detailed Guide on SQL Query Optimization" tutorial by Megha
- "How a SQL Database Engine Works" by Dennis Pham
- Google Cloud's "Using Cached Query Results" documentation
- "Caching in Snowflake Data Warehouse" community page

General Resources:
- "How Should Organizations Structure Their Data?" by Michael Berk
- "Modeling of Real-Time Streaming Data?" Stack Exchange thread
- "Streaming Event Modeling" by Paul Stanton
- "Eventual vs. Strong Consistency in Distributed Databases" by Saurabh.v

---

**Previous:** [Chapter 7: Ingestion](./chapter7) | **Next:** [Chapter 9: Serving Data](./chapter9)
