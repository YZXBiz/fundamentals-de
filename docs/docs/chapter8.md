---
sidebar_position: 9
title: "Chapter 8: Queries, Modeling, and Transformation"
description: "Learn how to make data useful through queries, data modeling, and transformations. Master query optimization, modeling patterns (Kimball, Inmon, Data Vault), and batch/streaming transformations."
---

import { ProcessFlow, CardGrid, ComparisonTable, DiagramContainer, TreeDiagram, StackDiagram, Row, Column, Box, Arrow, Group, colors } from '@site/src/components/diagrams';

# Chapter 8: Queries, Modeling, and Transformation

Up to this point, the stages of the data engineering lifecycle have primarily been about passing data from one place to another or storing it. In this chapter, you'll learn how to make data useful. By understanding queries, modeling, and transformations, you'll have the tools to turn raw data ingredients into something consumable by downstream stakeholders.

<DiagramContainer title="Transformations Create Value from Data">
  <ProcessFlow
    steps={[
      { label: 'Raw Data', color: colors.gray },
      { label: 'Queries', color: colors.blue },
      { label: 'Modeling', color: colors.purple },
      { label: 'Transformation', color: colors.green },
      { label: 'Consumable Data', color: colors.emerald }
    ]}
  />
</DiagramContainer>

We'll first discuss queries and the significant patterns underlying them. Second, we will look at the major data modeling patterns you can use to introduce business logic into your data. Then, we'll cover transformations, which take the logic of your data models and the results of queries and make them useful for more straightforward downstream consumption. Finally, we'll cover whom you'll work with and the undercurrents as they relate to this chapter.

A variety of techniques can be used to query, model, and transform data in SQL and NoSQL databases. This section focuses on queries made to an OLAP system, such as a data warehouse or data lake. Although many languages exist for querying, for the sake of convenience and familiarity, throughout most of this chapter, we'll focus heavily on SQL, the most popular and universal query language. Most of the concepts for OLAP databases and SQL will translate to other types of databases and query languages. This chapter assumes you have an understanding of the SQL language and related concepts like primary and foreign keys.

:::info Note on Terminology
For convenience, we'll use the term **database** as a shorthand for a query engine and the storage it's querying; this could be a cloud data warehouse or Apache Spark querying data stored in S3. We assume the database has a storage engine that organizes the data under the hood. This extends to file-based queries (loading a CSV file into a Python notebook) and queries against file formats such as Parquet.
:::

Also, note that this chapter focuses mainly on the query, modeling patterns, and transformations related to structured and semistructured data, which data engineers use often. Many of the practices discussed can also be applied to working with unstructured data such as images, video, and raw text.

Before we get into modeling and transforming data, let's look at queries—what they are, how they work, considerations for improving query performance, and queries on streaming data.

## Table of Contents

1. [Queries](#queries)
   - [What Is a Query?](#what-is-a-query)
   - [The Life of a Query](#the-life-of-a-query)
   - [Improving Query Performance](#improving-query-performance)
   - [Queries on Streaming Data](#queries-on-streaming-data)
2. [Data Modeling](#data-modeling)
   - [What Is a Data Model?](#what-is-a-data-model)
   - [Conceptual, Logical, and Physical Data Models](#conceptual-logical-and-physical-data-models)
   - [Normalization](#normalization)
   - [Techniques for Modeling Batch Analytical Data](#techniques-for-modeling-batch-analytical-data)
   - [Modeling Streaming Data](#modeling-streaming-data)
3. [Transformations](#transformations)
   - [Batch Transformations](#batch-transformations)
   - [Streaming Transformations and Processing](#streaming-transformations-and-processing)
4. [Whom You'll Work With](#whom-youll-work-with)
5. [Undercurrents](#undercurrents)

## Queries

Queries are a fundamental part of data engineering, data science, and analysis. Before you learn about the underlying patterns and technologies for transformations, you need to understand what queries are, how they work on various data, and techniques for improving query performance.

This section primarily concerns itself with queries on tabular and semistructured data. As a data engineer, you'll most frequently query and transform these data types. Before we get into more complicated topics about queries, data modeling, and transformations, let's start by answering a pretty simple question: what is a query?

### What Is a Query?

We often run into people who know how to write SQL but are unfamiliar with how a query works under the hood. Some of this introductory material on queries will be familiar to experienced data engineers; feel free to skip ahead if this applies to you.

:::tip Three-Part Explanation

**In plain English:** A query is like asking a question to your database. Instead of manually searching through thousands of records, you write instructions that tell the database exactly what information you want to retrieve.

**In technical terms:** A query allows you to retrieve and act on data through structured requests. It implements CRUD operations (Create, Read, Update, Delete) against a database, using predicates (logical conditions) to filter and manipulate records.

**Why it matters:** Understanding queries is fundamental to data engineering because they're the primary interface between you and your data. Well-written queries can make the difference between a system that takes hours to respond and one that returns results in seconds.

:::

A query allows you to retrieve and act on data. Recall our conversation in Chapter 5 about CRUD. When a query retrieves data, it is issuing a request to read a pattern of records. This is the R (read) in CRUD. You might issue a query that gets all records from a table `foo`, such as `SELECT * FROM foo`. Or, you might apply a predicate (logical condition) to filter your data by retrieving only records where the id is 1, using the SQL query `SELECT * FROM foo WHERE id=1`.

Many databases allow you to create, update, and delete data. These are the CUD in CRUD; your query will either create, mutate, or destroy existing records. Let's review some other common acronyms you'll run into when working with query languages.

<CardGrid columns={2}>
  <div>
    <h4>Data Definition Language (DDL)</h4>
    <p>Performs operations on database objects like schemas, tables, or users. Defines the state of objects in your database.</p>
    <ul>
      <li><code>CREATE</code></li>
      <li><code>DROP</code></li>
      <li><code>ALTER</code></li>
    </ul>
  </div>
  <div>
    <h4>Data Manipulation Language (DML)</h4>
    <p>Adds and alters data within database objects. The primary purpose is data manipulation.</p>
    <ul>
      <li><code>SELECT</code></li>
      <li><code>INSERT</code></li>
      <li><code>UPDATE</code></li>
      <li><code>DELETE</code></li>
      <li><code>COPY</code></li>
      <li><code>MERGE</code></li>
    </ul>
  </div>
  <div>
    <h4>Data Control Language (DCL)</h4>
    <p>Controls access to database objects or data using commands to grant, deny, or revoke permissions.</p>
    <ul>
      <li><code>GRANT</code></li>
      <li><code>DENY</code></li>
      <li><code>REVOKE</code></li>
    </ul>
  </div>
  <div>
    <h4>Transaction Control Language (TCL)</h4>
    <p>Controls the details of transactions, including commit checkpoints and rollback conditions.</p>
    <ul>
      <li><code>COMMIT</code></li>
      <li><code>ROLLBACK</code></li>
    </ul>
  </div>
</CardGrid>

#### DCL Example

Let's walk through a brief example using DCL commands. A new data scientist named Sarah joins your company, and she needs read-only access to a database called `data_science_db`. You give Sarah access to this database by using the following DCL command:

```sql
GRANT SELECT ON data_science_db TO user_name Sarah;
```

It's a hot job market, and Sarah has worked at the company for only a few months before getting poached by a big tech company. So long, Sarah! Being a security-minded data engineer, you remove Sarah's ability to read from the database:

```sql
REVOKE SELECT ON data_science_db TO user_name Sarah;
```

Access-control requests and issues are common, and understanding DCL will help you resolve problems if you or a team member can't access the data they need, as well as prevent access to data they don't need.

### The Life of a Query

How does a query work, and what happens when a query is executed? Let's cover the high-level basics of query execution, using an example of a typical SQL query executing in a database.

<DiagramContainer title="The Life of a SQL Query">
  <ProcessFlow
    steps={[
      { label: 'SQL Code Submitted', color: colors.blue, description: 'User writes and submits query' },
      { label: 'Parsing & Validation', color: colors.purple, description: 'Check semantics, objects, access' },
      { label: 'Convert to Bytecode', color: colors.indigo, description: 'Machine-readable format' },
      { label: 'Query Optimizer', color: colors.violet, description: 'Determine execution plan' },
      { label: 'Execute Query', color: colors.green, description: 'Run optimized query' },
      { label: 'Return Results', color: colors.emerald, description: 'Produce output' }
    ]}
  />
</DiagramContainer>

While running a query might seem simple—write code, run it, and get results—a lot is going on under the hood. When you execute a SQL query, here's a summary of what happens:

1. The database engine compiles the SQL, parsing the code to check for proper semantics and ensuring that the database objects referenced exist and that the current user has the appropriate access to these objects.

2. The SQL code is converted into bytecode. This bytecode expresses the steps that must be executed on the database engine in an efficient, machine-readable format.

3. The database's query optimizer analyzes the bytecode to determine how to execute the query, reordering and refactoring steps to use available resources as efficiently as possible.

4. The query is executed, and results are produced.

#### The Query Optimizer

Queries can have wildly different execution times, depending on how they're executed. A query optimizer's job is to optimize query performance and minimize costs by breaking the query into appropriate steps in an efficient order. The optimizer will assess joins, indexes, data scan size, and other factors. The query optimizer attempts to execute the query in the least expensive manner.

Query optimizers are fundamental to how your query will perform. Every database is different and executes queries in ways that are obviously and subtly different from each other. You won't directly work with a query optimizer, but understanding some of its functionality will help you write more performant queries. You'll need to know how to analyze a query's performance, using things like an explain plan or query analysis, described in the following section.

### Improving Query Performance

In data engineering, you'll inevitably encounter poorly performing queries. Knowing how to identify and fix these queries is invaluable. Don't fight your database. Learn to work with its strengths and augment its weaknesses. This section shows various ways to improve your query performance.

#### Optimize your join strategy and schema

A single dataset (such as a table or file) is rarely useful on its own; we create value by combining it with other datasets. Joins are one of the most common means of combining datasets and creating new ones. We assume that you're familiar with the significant types of joins (e.g., inner, outer, left, cross) and the types of join relationships (e.g., one to one, one to many, many to one, and many to many).

Joins are critical in data engineering and are well supported and performant in many databases. Even columnar databases, which in the past had a reputation for slow join performance, now generally offer excellent performance.

A common technique for improving query performance is to **prejoin data**. If you find that analytics queries are joining the same data repeatedly, it often makes sense to join the data in advance and have queries read from the prejoined version of the data so that you're not repeating computationally intensive work. This may mean changing the schema and relaxing normalization conditions to widen tables and utilize newer data structures (such as arrays or structs) for replacing frequently joined entity relationships. Another strategy is maintaining a more normalized schema but prejoining tables for the most common analytics and data science use cases.

Next, consider the details and complexity of your join conditions. Complex join logic may consume significant computational resources. We can improve performance for complex joins in a few ways.

Many row-oriented databases allow you to index a result computed from a row. For instance, PostgreSQL allows you to create an index on a string field converted to lowercase; when the optimizer encounters a query where the `lower()` function appears inside a predicate, it can apply the index. You can also create a new derived column for joining, though you will need to train users to join on this column.

##### Row Explosion

:::warning Row Explosion
An obscure but frustrating problem is **row explosion**. This occurs when we have a large number of many-to-many matches, either because of repetition in join keys or as a consequence of join logic.
:::

Suppose the join key in table A has the value `this` repeated five times, and the join key in table B contains this same value repeated 10 times. This leads to a cross-join of these rows: every `this` row from table A paired with every `this` row from table B. This creates 5 × 10 = 50 rows in the output. Now suppose that many other repeats are in the join key. Row explosion often generates enough rows to consume a massive quantity of database resources or even cause a query to fail.

It is also essential to know how your query optimizer handles joins. Some databases can reorder joins and predicates, while others cannot. A row explosion in an early query stage may cause the query to fail, even though a later predicate should correctly remove many of the repeats in the output. Predicate reordering can significantly reduce the computational resources required by a query.

Finally, use **common table expressions (CTEs)** instead of nested subqueries or temporary tables. CTEs allow users to compose complex queries together in a readable fashion, helping you understand the flow of your query. The importance of readability for complex queries cannot be understated.

In many cases, CTEs will also deliver better performance than a script that creates intermediate tables; if you have to create intermediate tables, consider creating temporary tables.

#### Use the explain plan and understand your query's performance

As you learned in the preceding section, the database's query optimizer influences the execution of a query. The query optimizer's **explain plan** will show you how the query optimizer determined its optimum lowest-cost query, the database objects used (tables, indexes, cache, etc.), and various resource consumption and performance statistics in each query stage. Some databases provide a visual representation of query stages. In contrast, others make the explain plan available via SQL with the `EXPLAIN` command, which displays the sequence of steps the database will take to execute the query.

In addition to using `EXPLAIN` to understand how your query will run, you should monitor your query's performance, viewing metrics on database resource consumption. The following are some areas to monitor:

<CardGrid columns={2}>
  <div>
    <h4>Resource Usage</h4>
    <ul>
      <li>Disk, memory, and network utilization</li>
      <li>Data loading time versus processing time</li>
    </ul>
  </div>
  <div>
    <h4>Query Metrics</h4>
    <ul>
      <li>Execution time and record counts</li>
      <li>Size of data scanned and shuffled</li>
    </ul>
  </div>
  <div>
    <h4>System Contention</h4>
    <ul>
      <li>Competing queries causing resource contention</li>
      <li>Concurrent connections used vs. available</li>
    </ul>
  </div>
  <div>
    <h4>Connection Health</h4>
    <ul>
      <li>Number of concurrent connections</li>
      <li>Oversubscribed connections impact</li>
    </ul>
  </div>
</CardGrid>

#### Avoid full table scans

All queries scan data, but not all scans are created equal. As a rule of thumb, you should query only the data you need. When you run `SELECT *` with no predicates, you're scanning the entire table and retrieving every row and column. This is very inefficient performance-wise and expensive, especially if you're using a pay-as-you-go database that charges you either for bytes scanned or compute resources utilized while a query is running.

Whenever possible, use **pruning** to reduce the quantity of data scanned in a query. Columnar and row-oriented databases require different pruning strategies:

<ComparisonTable
  title="Pruning Strategies by Database Type"
  items={[
    {
      aspect: 'Column-Oriented (OLAP)',
      approach: 'Select only needed columns',
      techniques: 'Use cluster keys, partition tables, optimize for large datasets',
      examples: 'Snowflake cluster keys, BigQuery partitions'
    },
    {
      aspect: 'Row-Oriented (OLTP)',
      approach: 'Use table indexes strategically',
      techniques: 'Create indexes for performance-sensitive queries without overloading',
      examples: 'B-tree indexes, covering indexes'
    }
  ]}
/>

In a column-oriented database, you should select only the columns you need. Most column-oriented OLAP databases also provide additional tools for optimizing your tables for better query performance. For instance, if you have a very large table (several terabytes in size or greater), Snowflake and BigQuery give you the option to define a cluster key on a table, which orders the table's data in a way that allows queries to more efficiently access portions of very large datasets. BigQuery also allows you to partition a table into smaller segments, allowing you to query only specific partitions instead of the entire table.

In row-oriented databases, pruning usually centers around table indexes. The general strategy is to create table indexes that will improve performance for your most performance-sensitive queries while not overloading the table with so many indexes such that you degrade performance.

#### Know how your database handles commits

A database commit is a change within a database, such as creating, updating, or deleting a record, table, or other database objects. Many databases support **transactions**—i.e., a notion of committing several operations simultaneously in a way that maintains a consistent state. The purpose of a transaction is to keep a consistent state of a database both while it's active and in the event of a failure. Transactions also handle isolation when multiple concurrent events might be reading, writing, and deleting from the same database objects.

You should be intimately familiar with how your database handles commits and transactions, and determine the expected consistency of query results. Does your database handle writes and updates in an ACID-compliant manner? Without ACID compliance, your query might return unexpected results. This could result from a **dirty read**, which happens when a row is read and an uncommitted transaction has altered the row.

Let's briefly consider three databases to understand the impact of commits:

<CardGrid columns={3}>
  <div>
    <h4>PostgreSQL</h4>
    <p><strong>ACID Transactions</strong></p>
    <ul>
      <li>Row locking for consistency</li>
      <li>Transactions fail or succeed as group</li>
      <li>Not optimized for large-scale analytics</li>
    </ul>
  </div>
  <div>
    <h4>Google BigQuery</h4>
    <p><strong>Point-in-Time Commits</strong></p>
    <ul>
      <li>Reads from latest committed snapshot</li>
      <li>No table locking during reads</li>
      <li>One write operation at a time</li>
    </ul>
  </div>
  <div>
    <h4>MongoDB</h4>
    <p><strong>Variable Consistency</strong></p>
    <ul>
      <li>Configurable consistency options</li>
      <li>Extraordinary scalability</li>
      <li>May discard writes if overwhelmed</li>
    </ul>
  </div>
</CardGrid>

First, suppose we're looking at a PostgreSQL RDBMS and applying ACID transactions. Each transaction consists of a package of operations that will either fail or succeed as a group. We can also run analytics queries across many rows; these queries will present a consistent picture of the database at a point in time. The disadvantage of the PostgreSQL approach is that it requires row locking (blocking reads and writes to certain rows), which can degrade performance in various ways. PostgreSQL is not optimized for large scans or the massive amounts of data appropriate for large-scale analytics applications.

Next, consider Google BigQuery. It utilizes a point-in-time full table commit model. When a read query is issued, BigQuery will read from the latest committed snapshot of the table. Whether the query runs for one second or two hours, it will read only from that snapshot and will not see any subsequent changes. BigQuery does not lock the table while reading from it. Instead, subsequent write operations will create new commits and new snapshots while the query continues to run on the snapshot where it started.

To prevent the inconsistent state, BigQuery allows only one write operation at a time. In this sense, BigQuery provides no write concurrency whatsoever. (In the sense that it can write massive amounts of data in parallel inside a single write query, it is highly concurrent.) If more than one client attempts to write simultaneously, write queries are queued in order of arrival. BigQuery's commit model is similar to the commit models used by Snowflake, Spark, and others.

Last, let's consider MongoDB. We refer to MongoDB as a **variable-consistency database**. Engineers have various configurable consistency options, both for the database and at the level of individual queries. MongoDB is celebrated for its extraordinary scalability and write concurrency but is somewhat notorious for issues that arise when engineers abuse it.

For instance, in certain modes, MongoDB supports ultra-high write performance. However, this comes at a cost: the database will unceremoniously and silently discard writes if it gets overwhelmed with traffic. This is perfectly suitable for applications that can stand to lose some data—for example, IoT applications where we simply want many measurements but don't care about capturing all measurements. It is not a great fit for applications that need to capture exact data and statistics.

:::tip Engineering Wisdom
None of this is to say these are bad databases. They're all fantastic databases when they are chosen for appropriate applications and configured correctly. The same goes for virtually any database technology.

Companies don't hire engineers simply to hack on code in isolation. To be worthy of their title, engineers should develop a deep understanding of the problems they're tasked with solving and the technology tools. This applies to commit and consistency models and every other aspect of technology performance. Appropriate technology choices and configuration can ultimately differentiate extraordinary success and massive failure.
:::

#### Vacuum dead records

As we just discussed, transactions incur the overhead of creating new records during certain operations, such as updates, deletes, and index operations, while retaining the old records as pointers to the last state of the database. As these old records accumulate in the database filesystem, they eventually no longer need to be referenced. You should remove these dead records in a process called **vacuuming**.

You can vacuum a single table, multiple tables, or all tables in a database. No matter how you choose to vacuum, deleting dead database records is important for a few reasons:

1. It frees up space for new records, leading to less table bloat and faster queries
2. New and relevant records mean query plans are more accurate
3. Vacuuming cleans up poor indexes, allowing for better index performance

Vacuum operations are handled differently depending on the type of database:

- **Object storage-backed databases** (BigQuery, Snowflake, Databricks): Old data retention uses storage space, potentially costing money
  - Snowflake: Users cannot directly vacuum; control a "time-travel" interval
  - BigQuery: Fixed seven-day history window
  - Databricks: Retains data indefinitely until manually vacuumed

- **Amazon Redshift**: VACUUM runs automatically behind the scenes, but users may sometimes want to run it manually for tuning purposes

- **Relational databases** (PostgreSQL, MySQL): Large numbers of transactional operations can cause rapid accumulation of dead records; engineers need to familiarize themselves with vacuuming details

#### Leverage cached query results

Let's say you have an intensive query that you often run on a database that charges you for the amount of data you query. Each time a query is run, this costs you money. Instead of rerunning the same query on the database repeatedly and incurring massive charges, wouldn't it be nice if the results of the query were stored and available for instant retrieval? Thankfully, many cloud OLAP databases cache query results.

<DiagramContainer title="Query Caching">
  <Row>
    <Column>
      <Box color={colors.red} title="Cold Query">
        First execution
        <br />
        Retrieves from storage
        <br />
        <strong>40 seconds</strong>
      </Box>
    </Column>
    <Arrow direction="right" label="Cache results" />
    <Column>
      <Box color={colors.green} title="Cached Query">
        Subsequent executions
        <br />
        Returns from cache
        <br />
        <strong>&lt;1 second</strong>
      </Box>
    </Column>
  </Row>
</DiagramContainer>

When a query is initially run, it will retrieve data from various sources, filter and join it, and output a result. This initial query—a **cold query**—is similar to the notion of cold data we explored in Chapter 6. For argument's sake, let's say this query took 40 seconds to run. Assuming your database caches query results, rerunning the same query might return results in 1 second or less. The results were cached, and the query didn't need to run cold. Whenever possible, leverage query cache results to reduce pressure on your database and provide a better user experience for frequently run queries.

### Queries on Streaming Data

Streaming data is constantly in flight. As you might imagine, querying streaming data is different from batch data. To fully take advantage of a data stream, we must adapt query patterns that reflect its real-time nature. For example, systems such as Kafka and Pulsar make it easier to query streaming data sources. Let's look at some common ways to do this.

#### Basic query patterns on streams

Recall continuous CDC, discussed in Chapter 7. CDC, in this form, essentially sets up an analytics database as a fast follower to a production database. One of the longest-standing streaming query patterns simply entails querying the analytics database, retrieving statistical results and aggregations with a slight lag behind the production database.

##### The fast-follower approach

How is this a streaming query pattern? Couldn't we accomplish the same thing simply by running our queries on the production database? In principle, yes; in practice, no. Production databases generally aren't equipped to handle production workloads and simultaneously run large analytics scans across significant quantities of data. Running such queries can slow the production application or even cause it to crash.

The basic CDC query pattern allows us to serve real-time analytics with a minimal impact on the production system.

<DiagramContainer title="CDC with Fast-Follower Analytics Database">
  <ProcessFlow
    steps={[
      { label: 'Production Database', color: colors.blue, description: 'Handles application workload' },
      { label: 'CDC Stream', color: colors.purple, description: 'Captures changes' },
      { label: 'Analytics Database', color: colors.green, description: 'Fast follower for queries' },
      { label: 'Real-Time Analytics', color: colors.emerald, description: 'Minimal production impact' }
    ]}
  />
</DiagramContainer>

The fast-follower pattern can utilize a conventional transactional database as the follower, but there are significant advantages to using a proper OLAP-oriented system. Both Druid and BigQuery combine a streaming buffer with long-term columnar storage in a setup somewhat similar to the Lambda architecture. This works extremely well for computing trailing statistics on vast historical data with near real-time updates.

The fast-follower CDC approach has critical limitations. It doesn't fundamentally rethink batch query patterns. You're still running SELECT queries against the current table state, and missing the opportunity to dynamically trigger events off changes in the stream.

##### The Kappa architecture

Next, recall the Kappa architecture we discussed in Chapter 3. The principal idea of this architecture is to handle all data like events and store these events as a stream rather than a table.

<DiagramContainer title="Kappa Architecture: Stream-First Approach">
  <StackDiagram
    layers={[
      { label: 'Applications & IoT Devices', color: colors.blue, description: 'Event sources' },
      { label: 'Event Streams', color: colors.purple, description: 'Real-time transport' },
      { label: 'Stream Storage (Kafka/Pulsar)', color: colors.indigo, description: 'Long retention period' },
      { label: 'Stream Processing & Queries', color: colors.green, description: 'Real-time + historical' }
    ]}
  />
</DiagramContainer>

When production application databases are the source, Kappa architecture stores events from CDC. Event streams can also flow directly from an application backend, from a swarm of IoT devices, or any system that generates events and can push them over a network. Instead of simply treating a streaming storage system as a buffer, Kappa architecture retains events in storage during a more extended retention period, and data can be directly queried from this storage. The retention period can be pretty long (months or years).

The "big idea" in Kappa architecture is to treat streaming storage as a real-time transport layer and a database for retrieving and querying historical data. This happens either through the direct query capabilities of the streaming storage system or with the help of external tools. For example, Kafka KSQL supports aggregation, statistical calculations, and even sessionization. If query requirements are more complex or data needs to be combined with other data sources, an external tool such as Spark reads a time range of data from Kafka and computes the query results. The streaming storage system can also feed other applications or a stream processor such as Flink or Beam.

#### Windows, triggers, emitted statistics, and late-arriving data

One fundamental limitation of traditional batch queries is that this paradigm generally treats the query engine as an external observer. An actor external to the data causes the query to run—perhaps an hourly cron job or a product manager opening a dashboard.

Most widely used streaming systems, on the other hand, support the notion of computations triggered directly from the data itself. They might emit mean and median statistics every time a certain number of records are collected in the buffer or output a summary when a user session closes.

**Windows** are an essential feature in streaming queries and processing. Windows are small batches that are processed based on dynamic triggers. Windows are generated dynamically over time in some ways. Let's look at some common types of windows: session, fixed-time, and sliding. We'll also look at watermarks.

##### Session window

A **session window** groups events that occur close together, and filters out periods of inactivity when no events occur. We might say that a user session is any time interval with no inactivity gap of five minutes or more.

<DiagramContainer title="Session Window with 5-Minute Inactivity Timeout">
  <Group title="User Activity Timeline">
    <Box color={colors.blue} title="Session 1">Events clustered together</Box>
    <Box color={colors.gray} title="5+ min gap">Inactivity</Box>
    <Box color={colors.purple} title="Session 2">New activity starts</Box>
    <Box color={colors.gray} title="5+ min gap">Inactivity</Box>
    <Box color={colors.green} title="Session 3">New activity starts</Box>
  </Group>
</DiagramContainer>

In a streaming session, this process can happen dynamically. Note that session windows are per key; in the preceding example, each user gets their own set of windows. The system accumulates data per user. If a five-minute gap with no activity occurs, the system closes the window, sends its calculations, and flushes the data. If new events arrive for the user, the system starts a new session window.

Session windows may also make a provision for late-arriving data. Allowing data to arrive up to five minutes late to account for network conditions and system latency, the system will open the window if a late-arriving event indicates activity less than five minutes after the last event.

Making sessionization dynamic and near real-time fundamentally changes its utility. With retrospective sessionization, we could automate specific actions a day or an hour after a user session closed (e.g., a follow-up email with a coupon for a product viewed by the user). With dynamic sessionization, the user could get an alert in a mobile app that is immediately useful based on their activity in the last 15 minutes.

##### Fixed-time windows

A **fixed-time** (aka tumbling) window features fixed time periods that run on a fixed schedule and processes all data since the previous window is closed.

<DiagramContainer title="Fixed-Time (Tumbling) Windows">
  <Row>
    <Box color={colors.blue} title="Window 1">0-20 seconds</Box>
    <Arrow direction="right" />
    <Box color={colors.purple} title="Window 2">20-40 seconds</Box>
    <Arrow direction="right" />
    <Box color={colors.green} title="Window 3">40-60 seconds</Box>
  </Row>
</DiagramContainer>

For example, we might close a window every 20 seconds and process all data arriving from the previous window to give a mean and median statistic. Statistics would be emitted as soon as they could be calculated after the window closed.

This is similar to traditional batch ETL processing, where we might run a data update job every day or every hour. The streaming system allows us to generate windows more frequently and deliver results with lower latency. As we'll repeatedly emphasize, batch is a special case of streaming.

##### Sliding windows

Events in a **sliding window** are bucketed into windows of fixed time length, where separate windows might overlap.

<DiagramContainer title="Sliding Windows">
  <Group title="60-second windows, sliding every 30 seconds">
    <Row>
      <Box color={colors.blue} title="Window 1">0-60 sec</Box>
      <Box color={colors.purple} title="Window 2">30-90 sec</Box>
      <Box color={colors.green} title="Window 3">60-120 sec</Box>
    </Row>
  </Group>
</DiagramContainer>

For example, we could generate a new 60-second window every 30 seconds. Just as we did before, we can emit mean and median statistics.

The sliding can vary. For example, we might think of the window as truly sliding continuously but emitting statistics only when certain conditions (triggers) are met. Suppose we used a 30-second continuously sliding window but calculated a statistic only when a user clicked a particular banner. This would lead to an extremely high rate of output when many users click the banner, and no calculations during a lull.

##### Watermarks

We've covered various types of windows and their uses. As discussed in Chapter 7, data is sometimes ingested out of the order from which it originated. A **watermark** is a threshold used by a window to determine whether data in a window is within the established time interval or whether it's considered late.

<DiagramContainer title="Watermark as Threshold for Late-Arriving Data">
  <StackDiagram
    layers={[
      { label: 'On-Time Data', color: colors.green, description: 'Arrives before watermark' },
      { label: 'Watermark Threshold', color: colors.yellow, description: 'Time boundary' },
      { label: 'Late-Arriving Data', color: colors.orange, description: 'Arrives after watermark' }
    ]}
  />
</DiagramContainer>

If data arrives that is new to the window but older than the timestamp of the watermark, it is considered to be late-arriving data.

#### Combining streams with other data

As we've mentioned before, we often derive value from data by combining it with other data. Streaming data is no different. For instance, multiple streams can be combined, or a stream can be combined with batch historical data.

##### Conventional table joins

Some tables may be fed by streams. The most basic approach to this problem is simply joining these two tables in a database. A stream can feed one or both of these tables.

<DiagramContainer title="Joining Tables Fed by Streams">
  <Row>
    <Box color={colors.blue} title="Stream 1">Feeds Table A</Box>
    <Box color={colors.purple} title="Stream 2">Feeds Table B</Box>
  </Row>
  <Arrow direction="down" label="Join" />
  <Box color={colors.green} title="Joined Result">Combined query results</Box>
</DiagramContainer>

##### Enrichment

**Enrichment** means that we join a stream to other data. Typically, this is done to provide enhanced data into another stream.

<DiagramContainer title="Stream Enrichment Pattern">
  <ProcessFlow
    steps={[
      { label: 'Event Stream', color: colors.blue, description: 'Product & User IDs' },
      { label: 'Lookup Enrichment', color: colors.purple, description: 'Add details from cache/DB' },
      { label: 'Enriched Stream', color: colors.green, description: 'Enhanced events' }
    ]}
  />
</DiagramContainer>

For example, suppose that an online retailer receives an event stream from a partner business containing product and user IDs. The retailer wishes to enhance these events with product details and demographic information on the users. The retailer feeds these events to a serverless function that looks up the product and user in an in-memory database (say, a cache), adds the required information to the event, and outputs the enhanced events to another stream.

In practice, the enrichment source could originate almost anywhere—a table in a cloud data warehouse or RDBMS, or a file in object storage. It's simply a question of reading from the source and storing the requisite enrichment data in an appropriate place for retrieval by the stream.

##### Stream-to-stream joining

Increasingly, streaming systems support direct stream-to-stream joining. Suppose that an online retailer wishes to join its web event data with streaming data from an ad platform. The company can feed both streams into Spark, but a variety of complications arise. For instance, the streams may have significantly different latencies for arrival at the point where the join is handled in the streaming system. The ad platform may provide its data with a five-minute delay. In addition, certain events may be significantly delayed—for example, a session close event for a user, or an event that happens on the phone offline and shows up in the stream only after the user is back in mobile network range.

<DiagramContainer title="Stream-to-Stream Join Architecture">
  <Row>
    <Column>
      <Box color={colors.blue} title="Stream 1">Web events</Box>
      <Box color={colors.lightBlue} title="Buffer 1">Retention window</Box>
    </Column>
    <Column>
      <Box color={colors.purple} title="Stream 2">Ad platform events</Box>
      <Box color={colors.lightPurple} title="Buffer 2">Retention window</Box>
    </Column>
  </Row>
  <Arrow direction="down" label="Join on key" />
  <Box color={colors.green} title="Joined Stream">Matched events within retention</Box>
</DiagramContainer>

As such, typical streaming join architectures rely on streaming buffers. The buffer retention interval is configurable; a longer retention interval requires more storage and other resources. Events get joined with data in the buffer and are eventually evicted after the retention interval has passed.

Now that we've covered how queries work for batch and streaming data, let's discuss making your data useful by modeling it.

## Data Modeling

Data modeling is something that we see overlooked disturbingly often. We often see data teams jump into building data systems without a game plan to organize their data in a way that's useful for the business. This is a mistake. Well-constructed data architectures must reflect the goals and business logic of the organization that relies on this data. Data modeling involves deliberately choosing a coherent structure for data and is a critical step to make data useful for the business.

:::tip Three-Part Explanation

**In plain English:** Data modeling is like creating a blueprint for your organization's information. Just as an architect designs a building's structure before construction begins, data modeling defines how data should be organized to match how your business actually works.

**In technical terms:** Data modeling is the practice of deliberately structuring data to reflect business logic, processes, definitions, and workflows. It translates organizational operations into coherent data structures using normalization, relationships, keys, and defined schemas.

**Why it matters:** Without data modeling, you end up with a data swamp—inconsistent definitions, redundant data, and queries that produce different answers to the same question. Good data modeling ensures everyone in your organization is working from the same source of truth.

:::

Data modeling has been a practice for decades in one form or another. For example, various types of normalization techniques have been used to model data since the early days of RDBMSs; data warehousing modeling techniques have been around since at least the early 1990s and arguably longer. As pendulums in technology often go, data modeling became somewhat unfashionable in the early to mid-2010s. The rise of data lake 1.0, NoSQL, and big data systems allowed engineers to bypass traditional data modeling, sometimes for legitimate performance gains. Other times, the lack of rigorous data modeling created data swamps, along with lots of redundant, mismatched, or simply wrong data.

Nowadays, the pendulum seems to be swinging back toward data modeling. The growing popularity of data management (in particular, data governance and data quality) is pushing the need for coherent business logic. The meteoric rise of data's prominence in companies creates a growing recognition that modeling is critical for realizing value at the higher levels of the Data Science Hierarchy of Needs pyramid. That said, we believe that new paradigms are required to truly embrace the needs of streaming data and ML.

### What Is a Data Model?

A data model represents the way data relates to the real world. It reflects how the data must be structured and standardized to best reflect your organization's processes, definitions, workflows, and logic. A good data model captures how communication and work naturally flow within your organization. In contrast, a poor data model (or nonexistent one) is haphazard, confusing, and incoherent.

Some data professionals view data modeling as tedious and reserved for "big enterprises." Like most good hygiene practices—such as flossing your teeth and getting a good night's sleep—data modeling is acknowledged as a good thing to do but is often ignored in practice. Ideally, every organization should model its data if only to ensure that business logic and rules are translated at the data layer.

When modeling data, it's critical to focus on translating the model to business outcomes. A good data model should correlate with impactful business decisions. For example, a **customer** might mean different things to different departments in a company. Is someone who's bought from you over the last 30 days a customer? What if they haven't bought from you in the previous six months or a year? Carefully defining and modeling this customer data can have a massive impact on downstream reports on customer behavior or the creation of customer churn models whereby the time since the last purchase is a critical variable.

:::tip Data Modeling Best Practice
A good data model contains consistent definitions. In practice, definitions are often messy throughout a company. Can you think of concepts or terms in your company that might mean different things to different people?
:::

Our discussion focuses mainly on batch data modeling since that's where most data modeling techniques arose. We will also look at some approaches to modeling streaming data and general considerations for modeling.

### Conceptual, Logical, and Physical Data Models

When modeling data, the idea is to move from abstract modeling concepts to concrete implementation. Along this continuum, three main data models are conceptual, logical, and physical. These models form the basis for the various modeling techniques we describe in this chapter:

<DiagramContainer title="The Data Modeling Continuum">
  <ProcessFlow
    steps={[
      {
        label: 'Conceptual Model',
        color: colors.blue,
        description: 'Business logic, schemas, ER diagrams'
      },
      {
        label: 'Logical Model',
        color: colors.purple,
        description: 'Data types, keys, relationships'
      },
      {
        label: 'Physical Model',
        color: colors.green,
        description: 'Specific databases, tables, configuration'
      }
    ]}
  />
</DiagramContainer>

**Conceptual**
Contains business logic and rules and describes the system's data, such as schemas, tables, and fields (names and types). When creating a conceptual model, it's often helpful to visualize it in an entity-relationship (ER) diagram, which is a standard tool for visualizing the relationships among various entities in your data (orders, customers, products, etc.). For example, an ER diagram might encode the connections among customer ID, customer name, customer address, and customer orders. Visualizing entity relationships is highly recommended for designing a coherent conceptual data model.

**Logical**
Details how the conceptual model will be implemented in practice by adding significantly more detail. For example, we would add information on the types of customer ID, customer names, and custom addresses. In addition, we would map out primary and foreign keys.

**Physical**
Defines how the logical model will be implemented in a database system. We would add specific databases, schemas, and tables to our logical model, including configuration details.

Successful data modeling involves business stakeholders at the inception of the process. Engineers need to obtain definitions and business goals for the data. Modeling data should be a full-contact sport whose goal is to provide the business with quality data for actionable insights and intelligent automation. This is a practice that everyone must continuously participate in.

Another important consideration for data modeling is the **grain** of the data, which is the resolution at which data is stored and queried. The grain is typically at the level of a primary key in a table, such as customer ID, order ID, and product ID; it's often accompanied by a date or timestamp for increased fidelity.

For example, suppose that a company has just begun to deploy BI reporting. The company is small enough that the same person is filling the role of data engineer and analyst. A request comes in for a report that summarizes daily customer orders. Specifically, the report should list all customers who ordered, the number of orders they placed that day, and the total amount they spent.

This report is inherently coarse-grained. It contains no details on spending per order or the items in each order. It is tempting for the data engineer/analyst to ingest data from the production orders database and boil it down to a reporting table with only the basic aggregated data required for the report. However, this would entail starting over when a request comes in for a report with finer-grained data aggregation.

Since the data engineer is actually quite experienced, they elect to create tables with detailed data on customer orders, including each order, item, item cost, item IDs, etc. Essentially, their tables contain all details on customer orders. The data's grain is at the customer-order level. This customer-order data can be analyzed as is, or aggregated for summary statistics on customer order activity.

:::tip Best Practice: Model at the Lowest Grain
In general, you should strive to model your data at the lowest level of grain possible. From here, it's easy to aggregate this highly granular dataset. The reverse isn't true, and it's generally impossible to restore details that have been aggregated away.
:::

### Normalization

**Normalization** is a database data modeling practice that enforces strict control over the relationships of tables and columns within a database. The goal of normalization is to remove the redundancy of data within a database and ensure referential integrity. Basically, it's don't repeat yourself (DRY) applied to data in a database.

Normalization is typically applied to relational databases containing tables with rows and columns. It was first introduced by relational database pioneer Edgar Codd in the early 1970s.

Codd outlined four main objectives of normalization:

1. To free the collection of relations from undesirable insertion, update, and deletion dependencies
2. To reduce the need for restructuring the collection of relations, as new types of data are introduced, and thus increase the lifespan of application programs
3. To make the relational model more informative to users
4. To make the collection of relations neutral to the query statistics, where these statistics are liable to change as time goes by

Codd introduced the idea of **normal forms**. The normal forms are sequential, with each form incorporating the conditions of prior forms. We describe Codd's first three normal forms here:

<CardGrid columns={2}>
  <div>
    <h4>Denormalized</h4>
    <p>No normalization. Nested and redundant data is allowed.</p>
  </div>
  <div>
    <h4>First Normal Form (1NF)</h4>
    <p>Each column is unique and has a single value. The table has a unique primary key.</p>
  </div>
  <div>
    <h4>Second Normal Form (2NF)</h4>
    <p>The requirements of 1NF, plus partial dependencies are removed.</p>
  </div>
  <div>
    <h4>Third Normal Form (3NF)</h4>
    <p>The requirements of 2NF, plus each table contains only relevant fields related to its primary key and has no transitive dependencies.</p>
  </div>
</CardGrid>

It's worth spending a moment to unpack a couple of terms:

- **Unique primary key**: A single field or set of multiple fields that uniquely determines rows in the table
- **Partial dependency**: When a subset of fields in a composite key can determine a nonkey column
- **Transitive dependency**: When a nonkey field depends on another nonkey field

#### Normalization Example: Ecommerce Orders

Let's look at stages of normalization—from denormalized to 3NF—using an ecommerce example of customer orders.

**Denormalized Table (OrderDetail)**

| OrderID | OrderItems | CustomerID | CustomerName | OrderDate |
|---------|------------|------------|--------------|-----------|
| 100 | `[{"sku": 1, "price": 50, "quantity": 1, "name": "Thingamajig"}, {"sku": 2, "price": 25, "quantity": 2, "name": "Whatchamacallit"}]` | 5 | Joe Reis | 2022-03-01 |

This denormalized OrderDetail table contains five fields. The primary key is OrderID. Notice that the OrderItems field contains a nested object with two SKUs along with their price, quantity, and name.

**Moving to 1NF: Remove Nested Data**

| OrderID | Sku | Price | Quantity | ProductName | CustomerID | CustomerName | OrderDate |
|---------|-----|-------|----------|-------------|------------|--------------|-----------|
| 100 | 1 | 50 | 1 | Thingamajig | 5 | Joe Reis | 2022-03-01 |
| 100 | 2 | 25 | 2 | Whatchamacallit | 5 | Joe Reis | 2022-03-01 |

Now we have an OrderDetail table in which fields do not contain repeats or nested data. The problem is that now we don't have a unique primary key—100 occurs in the OrderID column in two different rows.

**Creating a Unique Primary Key**

Let's add a LineItemNumber column to create a composite key:

| OrderID | LineItemNumber | Sku | Price | Quantity | ProductName | CustomerID | CustomerName | OrderDate |
|---------|----------------|-----|-------|----------|-------------|------------|--------------|-----------|
| 100 | 1 | 1 | 50 | 1 | Thingamajig | 5 | Joe Reis | 2022-03-01 |
| 100 | 2 | 2 | 25 | 2 | Whatchamacallit | 5 | Joe Reis | 2022-03-01 |
| 101 | 1 | 3 | 75 | 1 | Whozeewhatzit | 7 | Matt Housley | 2022-03-01 |
| 102 | 1 | 1 | 50 | 1 | Thingamajig | 7 | Matt Housley | 2022-03-01 |

The composite key (OrderID, LineItemNumber) is now a unique primary key.

**Moving to 2NF: Remove Partial Dependencies**

To reach 2NF, we need to ensure that no partial dependencies exist. The last three columns are determined by order number. Let's split OrderDetail into two tables:

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

Notice that Sku determines ProductName in OrderLineItem. That is, Sku depends on the composite key, and ProductName depends on Sku. This is a transitive dependency. Let's break OrderLineItem into OrderLineItem and Skus:

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

Now, both OrderLineItem and Skus are in 3NF. Notice that Orders does not satisfy 3NF—what transitive dependencies are present? How would you fix this?

Additional normal forms exist (up to 6NF in the Boyce-Codd system), but these are much less common than the first three. A database is usually considered normalized if it's in third normal form.

:::tip Practical Advice
The degree of normalization that you should apply to your data depends on your use case. No one-size-fits-all solution exists, especially in databases where some denormalization presents performance advantages. Although denormalization may seem like an antipattern, it's common in many OLAP systems that store semistructured data. Study normalization conventions and database best practices to choose an appropriate strategy.
:::

### Techniques for Modeling Batch Analytical Data

When describing data modeling for data lakes or data warehouses, you should assume that the raw data takes many forms (e.g., structured and semistructured), but the output is a structured data model of rows and columns. However, several approaches to data modeling can be used in these environments. The big approaches you'll likely encounter are Kimball, Inmon, and Data Vault.

In practice, some of these techniques can be combined. For example, we see some data teams start with Data Vault and then add a Kimball star schema alongside it. We'll also look at wide and denormalized data models and other batch data-modeling techniques you should have in your arsenal.

:::info Note
Our coverage of the first three approaches—Inmon, Kimball, and Data Vault—is cursory and hardly does justice to their respective complexity and nuance. At the end of this chapter, we list the canonical books from their creators. For a data engineer, these books are must-reads, and we highly encourage you to read them, if only to understand how and why data modeling is central to batch analytical data.
:::

#### Inmon

The father of the data warehouse, Bill Inmon, created his approach to data modeling in 1989. Before the data warehouse, the analysis would often occur directly on the source system itself, with the obvious consequence of bogging down production transactional databases with long-running queries. The goal of the data warehouse was to separate the source system from the analytical system.

Inmon defines a data warehouse the following way:

> A data warehouse is a subject-oriented, integrated, nonvolatile, and time-variant collection of data in support of management's decisions. The data warehouse contains granular corporate data. Data in the data warehouse is able to be used for many different purposes, including sitting and waiting for future requirements which are unknown today.

The four critical parts of a data warehouse can be described as follows:

<CardGrid columns={2}>
  <div>
    <h4>Subject-Oriented</h4>
    <p>The data warehouse focuses on a specific subject area, such as sales or marketing.</p>
  </div>
  <div>
    <h4>Integrated</h4>
    <p>Data from disparate sources is consolidated and normalized.</p>
  </div>
  <div>
    <h4>Nonvolatile</h4>
    <p>Data remains unchanged after data is stored in a data warehouse.</p>
  </div>
  <div>
    <h4>Time-Variant</h4>
    <p>Varying time ranges can be queried.</p>
  </div>
</CardGrid>

Let's look at each of these parts to understand its influence on an Inmon data model. First, the logical model must focus on a specific area. For instance, if the subject orientation is "sales," then the logical model contains all details related to sales—business keys, relationships, attributes, etc. Next, these details are integrated into a consolidated and highly normalized data model. Finally, the data is stored unchanged in a nonvolatile and time-variant way, meaning you can (theoretically) query the original data for as long as storage history allows.

Here is another key characteristic of Inmon's data warehouse:

> The second salient characteristic of the data warehouse is that it is integrated. Of all the aspects of a data warehouse, integration is the most important. Data is fed from multiple, disparate sources into the data warehouse. As the data is fed, it is converted, reformatted, resequenced, summarized, etc. The result is that data—once it resides in the data warehouse—has a single physical corporate image.

With Inmon's data warehouse, data is integrated from across the organization in a granular, highly normalized ER model, with a relentless emphasis on ETL. Because of the subject-oriented nature of the data warehouse, the Inmon data warehouse consists of key source databases and information systems used in an organization. Data from key business source systems is ingested and integrated into a highly normalized (3NF) data warehouse that often closely resembles the normalization structure of the source system itself.

<DiagramContainer title="Inmon Ecommerce Data Warehouse Architecture">
  <StackDiagram
    layers={[
      {
        label: 'Source Systems',
        color: colors.blue,
        description: 'Orders, Inventory, Marketing'
      },
      {
        label: 'ETL Layer',
        color: colors.purple,
        description: 'Extract, Transform, Load'
      },
      {
        label: 'Data Warehouse (3NF)',
        color: colors.indigo,
        description: 'Highly normalized, single source of truth'
      },
      {
        label: 'Data Marts',
        color: colors.green,
        description: 'Sales, Marketing, Purchasing (Star Schemas)'
      }
    ]}
  />
</DiagramContainer>

The strict normalization requirement ensures as little data duplication as possible, which leads to fewer downstream analytical errors because data won't diverge or suffer from redundancies. The data warehouse represents a "single source of truth," which supports the overall business's information requirements. The data is presented for downstream reports and analysis via business and department-specific data marts, which may also be denormalized.

A popular option for modeling data in a data mart is a star schema (discussed in the following section on Kimball), though any data model that provides easily accessible information is also suitable. In the preceding example, sales, marketing, and purchasing have their own star schema, fed upstream from the granular data in the data warehouse. This allows each department to have its own data structure that's unique and optimized to its specific needs.

#### Kimball

If there are spectrums to data modeling, Kimball is very much on the opposite end of Inmon. Created by Ralph Kimball in the early 1990s, this approach to data modeling focuses less on normalization, and in some cases accepting denormalization. As Inmon says about the difference between the data warehouse and data mart, "A data mart is never a substitute for a data warehouse."

Whereas Inmon integrates data from across the business in the data warehouse, and serves department-specific analytics via data marts, the Kimball model is bottom-up, encouraging you to model and serve department or business analytics in the data warehouse itself. The Kimball approach effectively makes the data mart the data warehouse itself. This may enable faster iteration and modeling than Inmon, with the trade-off of potential looser data integration, data redundancy, and duplication.

In Kimball's approach, data is modeled with two general types of tables: **facts** and **dimensions**. You can think of a fact table as a table of numbers, and dimension tables as qualitative data referencing a fact. Dimension tables surround a single fact table in a relationship called a **star schema**.

<DiagramContainer title="Kimball Star Schema">
  <Group title="Star Schema Structure">
    <Row>
      <Box color={colors.blue} title="Date Dimension">Time attributes</Box>
      <Box color={colors.green} title="Customer Dimension">Customer attributes</Box>
    </Row>
    <Box color={colors.yellow} title="Fact Table (Center)">Measurements & Keys</Box>
    <Row>
      <Box color={colors.purple} title="Product Dimension">Product attributes</Box>
      <Box color={colors.pink} title="Location Dimension">Geographic attributes</Box>
    </Row>
  </Group>
</DiagramContainer>

##### Fact tables

The first type of table in a star schema is the **fact table**, which contains factual, quantitative, and event-related data. The data in a fact table is immutable because facts relate to events. Therefore, fact tables don't change and are append-only. Fact tables are typically narrow and long, meaning they have not a lot of columns but a lot of rows that represent events. Fact tables should be at the lowest grain possible.

Queries against a star schema start with the fact table. Each row of a fact table should represent the grain of the data. Avoid aggregating or deriving data within a fact table. If you need to perform aggregations or derivations, do so in a downstream query, data mart table, or view. Finally, fact tables don't reference other fact tables; they reference only dimensions.

**Example Fact Table**

| OrderID | CustomerKey | DateKey | GrossSalesAmt |
|---------|-------------|---------|---------------|
| 100 | 5 | 20220301 | 100.00 |
| 101 | 7 | 20220301 | 75.00 |
| 102 | 7 | 20220301 | 50.00 |

Notice that the data types in the fact table are all numbers (integers and floats); there are no strings. The fact table has keys that reference dimension tables containing their respective attributes. The gross sales amount represents the total sale for the sales event.

##### Dimension tables

The second primary type of table in a Kimball data model is called a **dimension**. Dimension tables provide the reference data, attributes, and relational context for the events stored in fact tables. Dimension tables are smaller than fact tables and take an opposite shape, typically wide and short. When joined to a fact table, dimensions can describe the events' what, where, and when. Dimensions are denormalized, with the possibility of duplicate data.

**Date Dimension Table**

| DateKey | Date-ISO | Year | Quarter | Month | Day-of-week |
|---------|----------|------|---------|-------|-------------|
| 20220301 | 2022-03-01 | 2022 | 1 | 3 | Tuesday |
| 20220302 | 2022-03-02 | 2022 | 1 | 3 | Wednesday |
| 20220303 | 2022-03-03 | 2022 | 1 | 3 | Thursday |

In a Kimball data model, dates are typically stored in a date dimension, allowing you to reference the date key (DateKey) between the fact and date dimension table. With the date dimension table, you can easily answer questions like, "What are my total sales in the first quarter of 2022?" or "How many more customers shop on Tuesday than Wednesday?" The beauty of a date dimension is that you can add as many new fields as makes sense to analyze your data.

##### Slowly Changing Dimensions (SCD)

A **slowly changing dimension (SCD)** is necessary to track changes in dimensions. Let's look at a Type 2 customer dimension table:

**Type 2 Customer Dimension Table**

| CustomerKey | FirstName | LastName | ZipCode | EFF_StartDate | EFF_EndDate |
|-------------|-----------|----------|---------|---------------|-------------|
| 5 | Joe | Reis | 84108 | 2019-01-04 | 9999-01-01 |
| 7 | Matt | Housley | 84101 | 2020-05-04 | 2021-09-19 |
| 7 | Matt | Housley | 84123 | 2021-09-19 | 9999-01-01 |
| 11 | Lana | Belle | 90210 | 2022-02-04 | 9999-01-01 |

For example, take a look at CustomerKey 5, with the EFF_StartDate (effective start date) of 2019-01-04 and an EFF_EndDate of 9999-01-01. This means Joe Reis's customer record was created in the customer dimension table on 2019-01-04 and has an end date of 9999-01-01, meaning the customer record is active and isn't changed.

Now let's look at Matt Housley's customer record (CustomerKey = 7). Notice the two entries with start dates: 2020-05-04 and 2021-09-19. It looks like Housley changed his zip code on 2021-09-19, resulting in a change to his customer record. When the data is queried for the most recent customer records, you will query where the end date is equal to 9999-01-01.

<ComparisonTable
  title="Types of Slowly Changing Dimensions"
  items={[
    {
      aspect: 'Type 1',
      approach: 'Overwrite',
      description: 'Overwrite existing dimension records',
      tradeoffs: 'Super simple, but no access to historical records'
    },
    {
      aspect: 'Type 2',
      approach: 'Add New Row',
      description: 'Keep full history by creating new records',
      tradeoffs: 'Complete history, but table grows larger'
    },
    {
      aspect: 'Type 3',
      approach: 'Add New Column',
      description: 'Add columns for current and previous values',
      tradeoffs: 'Limited history, schema changes frequently'
    }
  ]}
/>

##### Star schema

Now that you have a basic understanding of facts and dimensions, it's time to integrate them into a star schema. The star schema represents the data model of the business. Unlike highly normalized approaches to data modeling, the star schema is a fact table surrounded by the necessary dimensions. This results in fewer joins than other data models, which speeds up query performance. Another advantage of a star schema is it's arguably easier for business users to understand and use.

Note that the star schema shouldn't reflect a particular report, though you can model a report in a downstream data mart or directly in your BI tool. The star schema should capture the facts and attributes of your business logic and be flexible enough to answer the respective critical questions.

Because a star schema has one fact table, sometimes you'll have multiple star schemas that address different facts of the business. You should strive to reduce the number of dimensions whenever possible since this reference data can potentially be reused among different fact tables. A dimension that is reused across multiple star schemas, thus sharing the same fields, is called a **conformed dimension**. A conformed dimension allows you to combine multiple fact tables across multiple star schemas.

#### Data Vault

Whereas Kimball and Inmon focus on the structure of business logic in the data warehouse, the Data Vault offers a different approach to data modeling. Created in the 1990s by Dan Linstedt, the Data Vault methodology separates the structural aspects of a source system's data from its attributes. Instead of representing business logic in facts, dimensions, or highly normalized tables, a Data Vault simply loads data from source systems directly into a handful of purpose-built tables in an insert-only manner. Unlike the other data modeling approaches you've learned about, there's no notion of good, bad, or conformed data in a Data Vault.

<DiagramContainer title="Data Vault Core Components">
  <Row>
    <Box color={colors.blue} title="Hubs">Business keys</Box>
    <Arrow direction="right" />
    <Box color={colors.purple} title="Links">Relationships between keys</Box>
    <Arrow direction="right" />
    <Box color={colors.green} title="Satellites">Attributes & context</Box>
  </Row>
</DiagramContainer>

Data moves fast these days, and data models need to be agile, flexible, and scalable; the Data Vault methodology aims to meet this need. The goal of this methodology is to keep the data as closely aligned to the business as possible, even while the business's data evolves.

A Data Vault model consists of three main types of tables: **hubs**, **links**, and **satellites**. In short, a hub stores business keys, a link maintains relationships among business keys, and a satellite represents a business key's attributes and context.

##### Hubs

Queries often involve searching by a business key, such as a customer ID or an order ID. A **hub** is the central entity of a Data Vault that retains a record of all unique business keys loaded into the Data Vault.

A hub always contains the following standard fields:

- **Hash key**: The primary key used to join data between systems (calculated hash field like MD5)
- **Load date**: The date the data was loaded into the hub
- **Record source**: The source from which the unique record was obtained
- **Business key(s)**: The key used to identify a unique record

It's important to note that a hub is insert-only, and data is not altered in a hub. Once data is loaded into a hub, it's permanent.

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

A **link table** tracks the relationships of business keys between hubs. Link tables connect hubs, ideally at the lowest possible grain. Because link tables connect data from various hubs, they are many to many. The Data Vault model's relationships are straightforward and handled through changes to the links. This provides excellent flexibility in the inevitable event that the underlying data changes.

**Link Table for Products and Orders**

| OrderProductHashKey | LoadDate | RecordSource | ProductHashKey | OrderHashKey |
|--------------------|----------|--------------|----------------|--------------|
| ff64ec193d... | 2022-03-01 | Website | 4041fd80ab... | f899139df5... |
| ff64ec193d... | 2022-03-01 | Website | de8435530d... | f899139df5... |
| e232628c25... | 2022-03-01 | Website | cf27369bd8... | 38b3eff8ba... |
| 26166a5871... | 2022-03-01 | Website | 4041fd80ab... | ec8956637a... |

##### Satellites

**Satellites** are descriptive attributes that give meaning and context to hubs. Satellites can connect to either hubs or links. The only required fields in a satellite are a primary key consisting of the business key of the parent hub and a load date. Beyond that, a satellite can contain however many attributes that make sense.

**SatelliteProduct Example**

| ProductHashKey | LoadDate | RecordSource | ProductName | Price |
|----------------|----------|--------------|-------------|-------|
| 4041fd80ab... | 2020-01-02 | ERP | Thingamajig | 50 |
| de8435530d... | 2021-03-09 | ERP | Whatchamacallit | 25 |
| cf27369bd8... | 2021-03-09 | ERP | Whozeewhatzit | 75 |

Unlike other data modeling techniques we've discussed, in a Data Vault, the business logic is created and interpreted when the data from these tables is queried. Please be aware that the Data Vault model can be used with other data modeling techniques. It's not unusual for a Data Vault to be the landing zone for analytical data, after which it's separately modeled in a data warehouse, commonly using a star schema. The Data Vault model also can be adapted for NoSQL and streaming data sources.

#### Wide denormalized tables

The strict modeling approaches we've described, especially Kimball and Inmon, were developed when data warehouses were expensive, on premises, and heavily resource-constrained with tightly coupled compute and storage. While batch data modeling has traditionally been associated with these strict approaches, more relaxed approaches are becoming more common.

There are reasons for this. First, the popularity of the cloud means that storage is dirt cheap. It's cheaper to store data than agonize over the optimum way to represent the data in storage. Second, the popularity of nested data (JSON and similar) means schemas are flexible in source and analytical systems.

You have the option to rigidly model your data as we've described, or you can choose to throw all of your data into a single wide table. A **wide table** is just what it sounds like: a highly denormalized and very wide collection of many fields, typically created in a columnar database. A field may be a single value or contain nested data. The data is organized along with one or multiple keys; these keys are closely tied to the grain of the data.

:::tip Three-Part Explanation

**In plain English:** A wide table is like spreading out all your data horizontally—instead of having many interconnected tables, you put everything in one massive table with hundreds or thousands of columns. It's the data modeling equivalent of packing everything in one big suitcase instead of organizing items across multiple bags.

**In technical terms:** Wide tables are highly denormalized, columnar structures that can contain thousands of columns with sparse data (many nulls). They combine facts and dimensions in a single table, often with nested data structures, eliminating the need for joins at query time.

**Why it matters:** In modern cloud columnar databases, wide tables can dramatically improve query performance by eliminating joins. Storage is cheap, and columnar databases handle nulls efficiently, making this once-heretical approach practical and performant for analytics workloads.

:::

A wide table can potentially have thousands of columns, whereas fewer than 100 are typical in relational databases. Wide tables are usually sparse; the vast majority of entries in a given field may be null. This is extremely expensive in a traditional relational database because the database allocates a fixed amount of space for each field entry; nulls take up virtually no space in a columnar database.

Analytics queries on wide tables often run faster than equivalent queries on highly normalized data requiring many joins. Removing joins can have a huge impact on scan performance. The wide table simply contains all of the data you would have joined in a more rigorous modeling approach. Facts and dimensions are represented in the same table.

**Wide Table Example**

| OrderID | OrderItems | CustomerID | CustomerName | OrderDate | Site | SiteRegion |
|---------|------------|------------|--------------|-----------|------|------------|
| 100 | `[{"sku": 1, "price": 50, "quantity": 1, "name": "Thingamajig"}, {"sku": 2, "price": 25, "quantity": 2, "name": "Whatchamacallit"}]` | 5 | Joe Reis | 2022-03-01 | abc.com | US |

We suggest using a wide table when you don't care about data modeling, or when you have a lot of data that needs more flexibility than traditional data-modeling rigor provides. Wide tables also lend themselves to streaming data. As data moves toward fast-moving schemas and streaming-first, we expect to see a new wave of data modeling, perhaps something along the lines of "relaxed normalization."

#### What If You Don't Model Your Data?

You also have the option of not modeling your data. In this case, just query data sources directly. This pattern is often used, especially when companies are just getting started and want to get quick insights or share analytics with their users. While it allows you to get answers to various questions, you should consider the following:

- If I don't model my data, how do I know the results of my queries are consistent?
- Do I have proper definitions of business logic in the source system, and will my query produce truthful answers?
- What query load am I putting on my source systems, and how does this impact users of these systems?

At some point, you'll probably gravitate toward a stricter batch data model paradigm and a dedicated data architecture that doesn't rely on the source systems for the heavy lifting.

### Modeling Streaming Data

Whereas many data-modeling techniques are well established for batch, this is not the case for streaming data. Because of the unbounded and continuous nature of streaming data, translating batch techniques like Kimball to a streaming paradigm is tricky, if not impossible. For example, given a stream of data, how would you continuously update a Type-2 slowly changing dimension without bringing your data warehouse to its knees?

The world is evolving from batch to streaming and from on premises to the cloud. The constraints of the older batch methods no longer apply. That said, big questions remain about how to model data to balance the need for business logic against fluid schema changes, fast-moving data, and self-service. What is the streaming equivalent of the preceding batch data model approaches? There isn't (yet) a consensus approach on streaming data modeling.

As you may recall, two main types of streams exist: event streams and CDC. Most of the time, the shape of the data in these streams is semistructured, such as JSON. The challenge with modeling streaming data is that the payload's schema might change on a whim. For example, suppose you have an IoT device that recently upgraded its firmware and introduced a new field. In that case, it's possible that your downstream destination data warehouse or processing pipeline isn't aware of this change and breaks.

The streaming data experts we've talked with overwhelmingly suggest you anticipate changes in the source data and keep a flexible schema. This means there's no rigid data model in the analytical database. Instead, assume the source systems are providing the correct data with the right business definition and logic, as it exists today. And because storage is cheap, store the recent streaming and saved historical data in a way they can be queried together. Optimize for comprehensive analytics against a dataset with a flexible schema.

:::tip Future of Data Modeling
The world of data modeling is changing, and we believe a sea change will soon occur in data model paradigms. These new approaches will likely incorporate metrics and semantic layers, data pipelines, and traditional analytics workflows in a streaming layer that sits directly on top of the source system. Since data is being generated in real time, the notion of artificially separating source and analytics systems into two distinct buckets may not make as much sense as when data moved more slowly and predictably. Time will tell…
:::

## Transformations

> The net result of transforming data is the ability to unify and integrate data. Once data is transformed, the data can be viewed as a single entity. But without transforming data, you cannot have a unified view of data across the organization.
>
> — Bill Inmon

Now that we've covered queries and data modeling, you might be wondering, if I can model data, query it, and get results, why do I need to think about transformations? Transformations manipulate, enhance, and save data for downstream use, increasing its value in a scalable, reliable, and cost-effective manner.

:::tip Three-Part Explanation

**In plain English:** Imagine running the same complicated recipe every time someone wants a meal—it's exhausting and wasteful. Transformations are like meal prep: you do the heavy lifting once (cleaning, chopping, cooking), save the prepared ingredients, and then quickly assemble meals when needed. Instead of repeating the same data processing work hundreds of times, you transform it once and save the results.

**In technical terms:** A transformation differs from a query in two key ways: (1) it persists results for downstream consumption, and (2) it handles complex, multi-source dataflows through orchestrated pipelines. Transformations apply business logic, aggregate data, normalize structures, and prepare data products for serving.

**Why it matters:** Without transformations, every user would run expensive queries repeatedly, wasting time and money. Transformations enable scalability, consistency, and cost-efficiency by performing compute-intensive work once and reusing results across the organization.

:::

Imagine running a query every time you want to view results from a particular dataset. You'd run the same query dozens or hundreds of times a day. Imagine that this query involves parsing, cleansing, joining, unioning, and aggregating across 20 datasets. To further exacerbate the pain, the query takes 30 minutes to run, consumes significant resources, and incurs substantial cloud charges over several repetitions. You and your stakeholders would probably go insane. Thankfully, you can save the results of your query instead, or at least run the most compute-intensive portions only once, so subsequent queries are simplified.

A transformation differs from a query. A query retrieves the data from various sources based on filtering and join logic. A transformation persists the results for consumption by additional transformations or queries. These results may be stored ephemerally or permanently.

Besides persistence, a second aspect that differentiates transformations from queries is complexity. You'll likely build complex pipelines that combine data from multiple sources and reuse intermediate results for multiple final outputs. These complex pipelines might normalize, model, aggregate, or featurize data.

Transformations critically rely on one of the major undercurrents in this book: **orchestration**. Orchestration combines many discrete operations, such as intermediate transformations, that store data temporarily or permanently for consumption by downstream transformations or serving. Increasingly, transformation pipelines span not only multiple tables and datasets but also multiple systems.

### Batch Transformations

Batch transformations run on discrete chunks of data, in contrast to streaming transformations, where data is processed continuously as it arrives. Batch transformations can run on a fixed schedule (e.g., daily, hourly, or every 15 minutes) to support ongoing reporting, analytics, and ML models. In this section, you'll learn various batch transformation patterns and technologies.

#### Distributed joins

The basic idea behind distributed joins is that we need to break a logical join (the join defined by the query logic) into much smaller node joins that run on individual servers in the cluster. The basic distributed join patterns apply whether one is in MapReduce, BigQuery, Snowflake, or Spark, though the details of intermediate storage between processing steps vary (on disk or in memory).

##### Broadcast join

A **broadcast join** is generally asymmetric, with one large table distributed across nodes and one small table that can easily fit on a single node.

<DiagramContainer title="Broadcast Join">
  <ProcessFlow
    steps={[
      { label: 'Small Table A', color: colors.blue, description: 'Fits on single node' },
      { label: 'Broadcast', color: colors.purple, description: 'Send to all nodes' },
      { label: 'Join with Large Table B', color: colors.green, description: 'Join on each node' },
      { label: 'Combined Results', color: colors.emerald }
    ]}
  />
</DiagramContainer>

The query engine "broadcasts" the small table (table A) out to all nodes, where it gets joined to the parts of the large table (table B). Broadcast joins are far less compute intensive than shuffle hash joins.

In practice, table A is often a down-filtered larger table that the query engine collects and broadcasts. One of the top priorities in query optimizers is join reordering. With the early application of filters, and movement of small tables to the left (for left joins), it is often possible to dramatically reduce the amount of data that is processed in each join.

##### Shuffle hash join

If neither table is small enough to fit on a single node, the query engine will use a **shuffle hash join**.

<DiagramContainer title="Shuffle Hash Join">
  <Group title="Repartitioning by Join Key">
    <Row>
      <Box color={colors.blue} title="Initial Table A">Distributed randomly</Box>
      <Box color={colors.purple} title="Initial Table B">Distributed randomly</Box>
    </Row>
    <Arrow direction="down" label="Shuffle by hash(join_key)" />
    <Row>
      <Box color={colors.green} title="Repartitioned A">By join key</Box>
      <Box color={colors.emerald} title="Repartitioned B">By join key</Box>
    </Row>
    <Arrow direction="down" label="Local joins" />
    <Box color={colors.yellow} title="Joined Results">On each node</Box>
  </Group>
</DiagramContainer>

A hashing scheme is used to repartition data by join key. The data is then reshuffled to the appropriate node, and the new partitions for tables A and B on each node are joined. Shuffle hash joins are generally more resource intensive than broadcast joins.

#### ETL, ELT, and data pipelines

As we discussed in Chapter 3, a widespread transformation pattern dating to the early days of relational databases is a batch ETL. Traditional ETL relies on an external transformation system to pull, transform, and clean data while preparing it for a target schema, such as a data mart or a Kimball star schema. The transformed data would then be loaded into a target system, such as a data warehouse, where business analytics could be performed.

<ComparisonTable
  title="ETL vs. ELT"
  items={[
    {
      aspect: 'ETL (Extract-Transform-Load)',
      approach: 'Transform before loading',
      description: 'External system transforms data, then loads to warehouse',
      bestFor: 'Resource-constrained systems, complex pre-processing'
    },
    {
      aspect: 'ELT (Extract-Load-Transform)',
      approach: 'Load raw, transform in warehouse',
      description: 'Load raw data first, transform directly in warehouse',
      bestFor: 'Modern cloud warehouses with abundant resources'
    }
  ]}
/>

A now-popular evolution of ETL is ELT. As data warehouse systems have grown in performance and storage capacity, it has become common to simply extract raw data from a source system, import it into a data warehouse with minimal transformation, and then clean and transform it directly in the warehouse system.

A second, slightly different notion of ELT was popularized with the emergence of data lakes. In this version, the data is not transformed at the time it's loaded. Indeed, massive quantities of data may be loaded with no preparation and no plan whatsoever. The assumption is that the transformation step will happen at some undetermined future time. Ingesting data without a plan is a great recipe for a data swamp.

:::warning Bill Inmon's Warning
I've always been a fan of ETL because of the fact that ETL forces you to transform data before you put it into a form where you can work with it. But some organizations want to simply take the data, put it into a database, then do the transformation.... I've seen too many cases where the organization says, oh we'll just put the data in and transform it later. And guess what? Six months later, that data [has] never been touched.
:::

Increasingly, we feel that the terms ETL and ELT should be applied only at the micro level (within individual transformation pipelines) rather than at the macro level (to describe a transformation pattern for a whole organization). Organizations no longer need to standardize on ETL or ELT but can instead focus on applying the proper technique on a case-by-case basis as they build data pipelines.

For more details on transformations including SQL vs. code-based tools, update patterns (truncate, insert-only, upsert/merge), business logic, MapReduce, materialized views, streaming transformations, and more, please refer to the complete chapter content.

## Whom You'll Work With

Queries, transformations, and modeling impact all stakeholders up and down the data engineering lifecycle. The data engineer is responsible for several things at this stage in the lifecycle. From a technical angle, the data engineer designs, builds, and maintains the integrity of the systems that query and transform data. The data engineer also implements data models within this system. This is the most "full-contact" stage where your focus is to add as much value as possible, both in terms of functioning systems and reliable and trustworthy data.

### Upstream Stakeholders

When it comes to transformations, upstream stakeholders can be broken into two broad categories: those who control the business definitions and those who control the systems generating data.

When interfacing with upstream stakeholders about business definitions and logic, you'll need to know the data sources—what they are, how they're used, and the business logic and definitions involved. You'll work with the engineers in charge of these source systems and the business stakeholders who oversee the complementary products and apps.

The stakeholders of the upstream systems want to make sure your queries and transformations minimally impact their systems. Ensure bidirectional communication about changes to the data models in source systems, as these can directly impact queries, transformations, and analytical data models.

### Downstream Stakeholders

Transformations are where data starts providing utility to downstream stakeholders. Your downstream stakeholders include data analysts, data scientists, ML engineers, and "the business." Collaborate with them to ensure the data model and transformations you provide are performant and useful.

Queries should execute as quickly as possible in the most cost-effective way. Analysts, data scientists, and ML engineers should be able to query a data source with confidence the data is of the highest quality and completeness. The business should be able to trust that transformed data is accurate and actionable.

## Undercurrents

The transformation stage is where your data mutates and morphs into something useful for the business. Because there are many moving parts, the undercurrents are especially critical at this stage.

### Security

Queries and transformations combine disparate datasets into new datasets. Who has access to this new dataset? Continue to control access at the column, row, and cell level.

Be aware of attack vectors against your database at query time. Read/write privileges must be tightly monitored and controlled. Keep credentials hidden, avoid copying passwords into code, and never allow unencrypted data to traverse the public internet.

### Data Management

Transformation inherently creates new datasets that need to be managed. Involve all stakeholders, agree on naming conventions, and ensure proper definitions. Leverage data catalogs and data lineage tools. Consider semantic or metrics layers for business logic. Address regulatory compliance including data masking and deletion capabilities.

### DataOps

Monitor both data quality (schema correctness, data shape, statistics) and system performance (query metrics, resource usage, costs). Run data-quality tests and implement observability. Practice FinOps for cloud cost management.

### Data Architecture

Build robust systems that can process and transform data without imploding. Your choices for ingestion and storage directly impact query and transformation performance. Understand trade-offs and ensure your architecture matches your workload.

### Orchestration

Use orchestration to manage complex pipelines with dependency-based approaches rather than simple cron jobs. Orchestration is the glue that allows pipelines to span multiple systems.

### Software Engineering

Know best practices for your tools (SQL, Python, Spark, etc.). Avoid anti-patterns like inefficient UDFs. Embrace analytics engineering tools like dbt. Understand what GUI tools generate under the hood. Write clean, performant code rather than just throwing more resources at problems.

## Conclusion

Transformations sit at the heart of data pipelines. It's critical to keep in mind the purpose of transformations. Ultimately, engineers are not hired to play with the latest technological toys but to serve their customers. Transformations are where data adds value and ROI to the business.

As we head into the serving stage of the data engineering lifecycle in Chapter 9, reflect on technology as a tool for realizing organizational goals. Think about how improvements in transformation systems could help you serve your end customers better and the kinds of business problems you're interested in solving with technology.

## Additional Resources

- "Building a Real-Time Data Vault in Snowflake" by Dmytro Yaroshenko and Kent Graziano
- Building a Scalable Data Warehouse with Data Vault 2.0 (Morgan Kaufmann) by Daniel Linstedt and Michael Olschimke
- Building the Data Warehouse (Wiley), Corporate Information Factory, and The Unified Star Schema (Technics Publications) by W. H. (Bill) Inmon
- "Caching in Snowflake Data Warehouse" Snowflake Community page
- "Data Warehouse: The Choice of Inmon vs. Kimball" by Ian Abramson
- The Data Warehouse Toolkit by Ralph Kimball and Margy Ross (Wiley)
- "Data Vault—An Overview" by John Ryan
- "Data Vault 2.0 Modeling Basics" by Kent Graziano
- "A Detailed Guide on SQL Query Optimization" tutorial by Megha
- "Difference Between Kimball and Inmon" by manmeetjuneja5
- "Eventual vs. Strong Consistency in Distributed Databases" by Saurabh.v
- "The Evolution of the Corporate Information Factory" by Bill Inmon
- Google Cloud's "Using Cached Query Results" documentation
- "How a SQL Database Engine Works," by Dennis Pham
- "How Should Organizations Structure Their Data?" by Michael Berk
- "Inmon or Kimball: Which Approach Is Suitable for Your Data Warehouse?" by Sansu George
- "Introduction to Data Vault Modeling" document, compiled by Kent Graziano and Dan Linstedt
- Kimball Group's "Four-Step Dimensional Design Process", "Conformed Dimensions", and "Dimensional Modeling Techniques" web pages
- "Modeling of Real-Time Streaming Data?" Stack Exchange thread
- Oracle's "Slowly Changing Dimensions" tutorial
- "Streaming Event Modeling" by Paul Stanton

---

**Previous:** [Chapter 7: Ingestion](./chapter7) | **Next:** [Chapter 9: Serving Data](./chapter9)
