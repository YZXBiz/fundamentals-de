---
sidebar_position: 7
title: "Chapter 6: Storage"
description: "Master data storage systems from raw ingredients like SSDs to abstractions like data warehouses and lakehouses in the data engineering lifecycle"
---

import {
  Box, Arrow, Row, Column, Group,
  DiagramContainer, ProcessFlow, TreeDiagram,
  CardGrid, StackDiagram, ComparisonTable,
  colors
} from '@site/src/components/diagrams';

# Chapter 6: Storage

> **"It's storage all the way down. Data must persist until systems are ready to consume it for further processing and transmission."**
>
> — The Data Engineering Lifecycle

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Raw Ingredients of Data Storage](#2-raw-ingredients-of-data-storage)
   - 2.1. [Magnetic Disk Drive](#21-magnetic-disk-drive)
   - 2.2. [Solid-State Drive](#22-solid-state-drive)
   - 2.3. [Random Access Memory](#23-random-access-memory)
   - 2.4. [Networking and CPU](#24-networking-and-cpu)
   - 2.5. [Serialization](#25-serialization)
   - 2.6. [Compression](#26-compression)
   - 2.7. [Caching](#27-caching)
3. [Data Storage Systems](#3-data-storage-systems)
   - 3.1. [Single Machine Versus Distributed Storage](#31-single-machine-versus-distributed-storage)
   - 3.2. [Eventual Versus Strong Consistency](#32-eventual-versus-strong-consistency)
   - 3.3. [File Storage](#33-file-storage)
   - 3.4. [Block Storage](#34-block-storage)
   - 3.5. [Object Storage](#35-object-storage)
   - 3.6. [Cache and Memory-Based Storage Systems](#36-cache-and-memory-based-storage-systems)
   - 3.7. [The Hadoop Distributed File System](#37-the-hadoop-distributed-file-system)
   - 3.8. [Streaming Storage](#38-streaming-storage)
   - 3.9. [Indexes, Partitioning, and Clustering](#39-indexes-partitioning-and-clustering)
4. [Data Engineering Storage Abstractions](#4-data-engineering-storage-abstractions)
   - 4.1. [The Data Warehouse](#41-the-data-warehouse)
   - 4.2. [The Data Lake](#42-the-data-lake)
   - 4.3. [The Data Lakehouse](#43-the-data-lakehouse)
   - 4.4. [Data Platforms](#44-data-platforms)
   - 4.5. [Stream-to-Batch Storage Architecture](#45-stream-to-batch-storage-architecture)
5. [Big Ideas and Trends in Storage](#5-big-ideas-and-trends-in-storage)
   - 5.1. [Data Catalog](#51-data-catalog)
   - 5.2. [Data Sharing](#52-data-sharing)
   - 5.3. [Schema](#53-schema)
   - 5.4. [Separation of Compute from Storage](#54-separation-of-compute-from-storage)
   - 5.5. [Zero-copy Cloning](#55-zero-copy-cloning)
   - 5.6. [Data Storage Lifecycle and Data Retention](#56-data-storage-lifecycle-and-data-retention)
   - 5.7. [Single-Tenant Versus Multitenant Storage](#57-single-tenant-versus-multitenant-storage)
6. [Summary](#6-summary)

---

## 1. Introduction

**In plain English:** Storage is like a massive warehouse system for data - you need to understand not just the building itself (storage systems), but the raw materials it's made from (SSDs, RAM, disks) and how it's organized (warehouses, lakes, lakehouses).

**In technical terms:** Storage is the cornerstone of the data engineering lifecycle and underlies its major stages - ingestion, transformation, and serving. Data gets stored many times as it moves through the lifecycle, requiring understanding at three levels: raw ingredients (hardware), storage systems (abstraction layers), and storage abstractions (organizational patterns).

**Why it matters:** Knowing the use case of the data and the way you will retrieve it in the future is the first step to choosing the proper storage solutions for your data architecture. The right storage choices dramatically impact performance, cost, and scalability.

<DiagramContainer title="Storage in the Data Engineering Lifecycle">
  <ProcessFlow
    direction="horizontal"
    steps={[
      {
        title: "Source Systems",
        description: "Data generation",
        icon: "📊",
        color: colors.blue
      },
      {
        title: "Ingestion",
        description: "Storage plays a role",
        icon: "📥",
        color: colors.purple
      },
      {
        title: "Storage",
        description: "Central hub",
        icon: "💾",
        color: colors.green
      },
      {
        title: "Transformation",
        description: "Storage plays a role",
        icon: "⚙️",
        color: colors.orange
      },
      {
        title: "Serving",
        description: "Data delivery",
        icon: "🎯",
        color: colors.red
      }
    ]}
  />
</DiagramContainer>

<DiagramContainer title="Three Levels of Storage Understanding">
  <StackDiagram
    layers={[
      {
        label: 'Storage Abstractions',
        description: 'Data warehouses, lakes, lakehouses',
        color: colors.purple
      },
      {
        label: 'Storage Systems',
        description: 'Object storage, databases, filesystems',
        color: colors.blue
      },
      {
        label: 'Raw Ingredients',
        description: 'HDDs, SSDs, RAM, networking, serialization',
        color: colors.green
      }
    ]}
  />
</DiagramContainer>

---

## 2. Raw Ingredients of Data Storage

Storage is so common that it's easy to take it for granted. We're often surprised by the number of software and data engineers who use storage every day but have little idea how it works behind the scenes or the trade-offs inherent in various storage media.

> **Insight**
>
> Though current managed services potentially free data engineers from the complexities of managing servers, data engineers still need to be aware of underlying components' essential characteristics, performance considerations, durability, and costs.

### 2.1. Magnetic Disk Drive

**In plain English:** A magnetic disk is like a record player for data. A spinning platter stores information magnetically, and a read/write head moves back and forth to access different parts of the disk. This physical movement makes it slower than newer technologies, but it's much cheaper per gigabyte.

**In technical terms:** Magnetic disks utilize spinning platters coated with a ferromagnetic film. This film is magnetized by a read/write head during write operations to physically encode binary data. The read/write head detects the magnetic field and outputs a bitstream during read operations.

**Why it matters:** Magnetic disks still form the backbone of bulk data storage systems because they are significantly cheaper than SSDs per gigabyte of stored data. Understanding HDD limitations helps you make the right storage choices - HDDs excel in bulk storage and sequential reads but fail for random access patterns.

<DiagramContainer title="Magnetic Disk Drive Characteristics">
  <CardGrid
    columns={2}
    cards={[
      {
        title: 'Cost',
        icon: '💰',
        color: colors.green,
        items: [
          '~$0.03 per GB',
          'Lowest cost per capacity',
          'Ideal for bulk storage',
          'Cloud object storage backbone'
        ]
      },
      {
        title: 'Transfer Speed',
        icon: '📊',
        color: colors.orange,
        items: [
          '200-300 MB/s sequential reads',
          'Does not scale with capacity',
          '20+ hours to read 30 TB drive',
          'Network-limited in clusters'
        ]
      },
      {
        title: 'Seek Time',
        icon: '⏱️',
        color: colors.red,
        items: [
          '~4 milliseconds latency',
          'Physical head movement required',
          'Rotational latency adds delay',
          'Major bottleneck for random access'
        ]
      },
      {
        title: 'IOPS',
        icon: '🔄',
        color: colors.purple,
        items: [
          '50-500 IOPS',
          'Unsuitable for transactional workloads',
          'Physical limitations cannot be overcome',
          'Use SSDs for high IOPS needs'
        ]
      }
    ]}
  />
</DiagramContainer>

#### Key Performance Limitations

**Disk Transfer Speed:** Disk capacity scales with areal density (gigabits stored per square inch), whereas transfer speed scales with linear density (bits per inch). This means that if disk capacity grows by a factor of 4, transfer speed increases by only a factor of 2.

**The Parallelism Solution:**

> **Insight**
>
> Magnetic disks can sustain extraordinarily high transfer rates through parallelism. This is the critical idea behind cloud object storage: data can be distributed across thousands of disks in clusters. Data-transfer rates go up dramatically by reading from numerous disks simultaneously, limited primarily by network performance rather than disk transfer rate.

### 2.2. Solid-State Drive

**In plain English:** SSDs are like instant-access digital memory cards. They have no moving parts - data is read by purely electronic means. This makes them incredibly fast but much more expensive than magnetic disks.

**In technical terms:** Solid-state drives (SSDs) store data as charges in flash memory cells. SSDs eliminate the mechanical components of magnetic drives; the data is read by purely electronic means. SSDs can look up random data in less than 0.1 ms (100 microseconds).

**Why it matters:** SSDs have revolutionized transactional databases and are the accepted standard for commercial deployments of OLTP systems. However, they're not currently the default option for high-scale analytics data storage due to cost - nearly 10 times the cost per capacity of a magnetic drive.

<ComparisonTable
  beforeTitle="HDD Performance"
  afterTitle="SSD Performance"
  beforeColor={colors.red}
  afterColor={colors.green}
  items={[
    {
      label: "Random Access Latency",
      before: "~4 milliseconds",
      after: "~0.1 milliseconds (40x faster)"
    },
    {
      label: "Transfer Speed",
      before: "200-300 MB/s",
      after: "Multiple GB/s (10x+ faster)"
    },
    {
      label: "IOPS",
      before: "50-500",
      after: "Tens of thousands (100x+ faster)"
    },
    {
      label: "Cost per GB",
      before: "$0.03",
      after: "$0.20-0.30 (10x more expensive)"
    },
    {
      label: "Best Use Case",
      before: "Bulk storage, sequential reads",
      after: "Transactional workloads, random access"
    }
  ]}
/>

**SSD Applications in Analytics:**

<CardGrid
  columns={2}
  cards={[
    {
      title: 'OLTP Databases',
      icon: '💳',
      color: colors.blue,
      items: [
        'PostgreSQL, MySQL, SQL Server',
        'Thousands of transactions per second',
        'Standard for commercial deployments',
        'High random access performance'
      ]
    },
    {
      title: 'OLAP Caching',
      icon: '⚡',
      color: colors.purple,
      items: [
        'Cache frequently accessed data',
        'Support high-performance queries',
        'Growing usage in low-latency OLAP',
        'Balance cost vs performance'
      ]
    }
  ]}
/>

### 2.3. Random Access Memory

**In plain English:** RAM is the fastest type of storage but loses everything when power is cut. It's like a whiteboard - perfect for active work, but you need to save your notes elsewhere before erasing it.

**In technical terms:** Random access memory (RAM) is attached to a CPU and mapped into CPU address space. It stores the code that CPUs execute and the data that this code directly processes. Dynamic RAM stores data as charges in capacitors that must be frequently refreshed to prevent data loss.

**Why it matters:** RAM offers significantly higher transfer speeds and faster retrieval times than SSD storage - roughly 1,000 times faster. However, it's significantly more expensive ($10/GB) and volatile. Understanding RAM characteristics is critical for caching, data processing, and ultra-fast storage applications.

<DiagramContainer title="RAM Characteristics">
  <CardGrid
    columns={3}
    cards={[
      {
        title: 'Performance',
        icon: '🚀',
        color: colors.green,
        items: [
          '~100ns latency',
          '100 GB/s bandwidth',
          'Millions of IOPS',
          '1000x faster than SSD'
        ]
      },
      {
        title: 'Cost & Capacity',
        icon: '💰',
        color: colors.orange,
        items: [
          '~$10/GB',
          '50x more expensive than SSD',
          'Limited capacity per CPU',
          'High-memory servers use multiple CPUs'
        ]
      },
      {
        title: 'Volatility',
        icon: '⚠️',
        color: colors.red,
        items: [
          'Data lost when unpowered',
          'Requires frequent refresh',
          'Battery backups for durability',
          'Replication across cluster critical'
        ]
      }
    ]}
  />
</DiagramContainer>

**RAM Applications:**

- **Caching:** Store frequently accessed data for ultra-fast retrieval
- **Data Processing:** In-memory computation (Spark, data processing engines)
- **Indexes:** Speed up database lookups
- **Primary Storage:** Ultra-fast read/write databases (Redis, Memcached)

:::warning
Even if data stored in memory is replicated across a cluster, a power outage that brings down several nodes could cause data loss. Architectures intended to durably store data may use battery backups and automatically dump all data to disk in the event of power loss.
:::

### 2.4. Networking and CPU

**In plain English:** Networking and CPUs are like the highways and traffic controllers of storage systems. They handle moving data between storage locations and processing requests, becoming critical bottlenecks or enablers depending on how they're configured.

**In technical terms:** Increasingly, storage systems are distributed to enhance performance, durability, and availability. Cloud object storage clusters operate across networks and multiple data centers. CPUs handle the details of servicing requests, aggregating reads, and distributing writes. Storage becomes a web application with an API, backend service components, and load balancing.

**Why it matters:** Data engineers constantly balance the durability and availability achieved by spreading out data geographically versus the performance and cost benefits of keeping storage in a small geographic area and close to data consumers or writers.

<DiagramContainer title="Distributed Storage Architecture">
  <Column gap="md">
    <Box color={colors.blue} variant="filled" size="lg" icon="🌐">
      Load Balancer / API Gateway
    </Box>
    <Arrow direction="down" label="Distributes requests" />
    <Row gap="md">
      <Column gap="sm">
        <Box color={colors.purple} icon="💻">Zone 1 Servers</Box>
        <Box color={colors.green} variant="outlined" size="sm">CPUs process requests</Box>
        <Box color={colors.green} variant="outlined" size="sm">Local disk clusters</Box>
      </Column>
      <Column gap="sm">
        <Box color={colors.purple} icon="💻">Zone 2 Servers</Box>
        <Box color={colors.green} variant="outlined" size="sm">CPUs process requests</Box>
        <Box color={colors.green} variant="outlined" size="sm">Local disk clusters</Box>
      </Column>
      <Column gap="sm">
        <Box color={colors.purple} icon="💻">Zone 3 Servers</Box>
        <Box color={colors.green} variant="outlined" size="sm">CPUs process requests</Box>
        <Box color={colors.green} variant="outlined" size="sm">Local disk clusters</Box>
      </Column>
    </Row>
    <Box color={colors.orange} variant="subtle">
      Availability zones provide independent power, water, and resources. Multizonal storage enhances both availability and durability.
    </Box>
  </Column>
</DiagramContainer>

**Key Considerations:**

<CardGrid
  columns={2}
  cards={[
    {
      title: 'Geographic Distribution',
      icon: '🌍',
      color: colors.blue,
      items: [
        'Spreading data improves durability',
        'Multiple zones protect against outages',
        'Regional replication for disaster recovery',
        'Trade-off: latency vs availability'
      ]
    },
    {
      title: 'Network Performance',
      icon: '📡',
      color: colors.purple,
      items: [
        'Network topology affects performance',
        'Bandwidth limits data transfer speeds',
        'Keeping data close reduces latency',
        'Balance cost vs performance'
      ]
    }
  ]}
/>

### 2.5. Serialization

**In plain English:** Think of serialization like packing a suitcase. You need to take all your belongings (data) and organize them in a specific way so they fit in the suitcase (storage format) and can be unpacked correctly at your destination. Different packing methods work better for different situations.

**In technical terms:** Serialization is the process of flattening and packing data into a standard format that a reader will be able to decode. Data stored in system memory by software is generally not in a format suitable for storage on disk or transmission over a network. Serialization formats provide a standard of data exchange.

**Why it matters:** Serialization choices have profound impacts on query performance, storage costs, and system interoperability. Row-oriented formats (CSV, JSON) are great for transactional workloads, while columnar formats (Parquet, ORC) dramatically reduce data scanned and improve compression for analytics workloads.

<DiagramContainer title="Row vs Columnar Serialization">
  <Row gap="lg">
    <Column gap="sm" align="center">
      <Box color={colors.blue} icon="📊" size="lg">Row-Oriented</Box>
      <Box color={colors.slate} variant="subtle">
        Store complete rows together
      </Box>
      <Column gap="xs">
        <Box color={colors.blue} variant="outlined" size="sm">Row 1: ID, Name, Age, City</Box>
        <Box color={colors.blue} variant="outlined" size="sm">Row 2: ID, Name, Age, City</Box>
        <Box color={colors.blue} variant="outlined" size="sm">Row 3: ID, Name, Age, City</Box>
      </Column>
      <Box color={colors.green} variant="subtle" size="sm">
        Best for: Transactional lookups, full row reads
      </Box>
    </Column>
    <Column gap="sm" align="center">
      <Box color={colors.purple} icon="📋" size="lg">Columnar</Box>
      <Box color={colors.slate} variant="subtle">
        Store columns separately
      </Box>
      <Column gap="xs">
        <Box color={colors.purple} variant="outlined" size="sm">Column: All IDs</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Column: All Names</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Column: All Ages</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Column: All Cities</Box>
      </Column>
      <Box color={colors.green} variant="subtle" size="sm">
        Best for: Analytics, aggregations, scanning
      </Box>
    </Column>
  </Row>
</DiagramContainer>

**Common Serialization Formats:**

<CardGrid
  columns={3}
  cards={[
    {
      title: 'Row-Based Formats',
      icon: '📄',
      color: colors.blue,
      items: [
        'CSV: Simple, human-readable',
        'JSON: Flexible, nested structures',
        'XML: Legacy, verbose',
        'OLTP workloads'
      ]
    },
    {
      title: 'Columnar Formats',
      icon: '📊',
      color: colors.purple,
      items: [
        'Parquet: Popular, efficient compression',
        'ORC: Optimized for Hadoop',
        'Arrow: In-memory processing',
        'OLAP workloads'
      ]
    },
    {
      title: 'Hybrid Formats',
      icon: '🔄',
      color: colors.green,
      items: [
        'Delta Lake: ACID on data lakes',
        'Apache Hudi: Update/delete support',
        'Apache Iceberg: Table evolution',
        'Modern data lakehouses'
      ]
    }
  ]}
/>

### 2.6. Compression

**In plain English:** Compression is like vacuum-sealing your clothes before packing. They take up less space in your suitcase, but you need to spend a little time unpacking them when you arrive. The trade-off is usually worth it when traveling (or storing data).

**In technical terms:** Compression makes data smaller by encoding it more efficiently. Compression algorithms interact with other details of storage systems in complex ways. With a 10:1 compression ratio, we go from scanning 200 MB/s per magnetic disk to an effective rate of 2 GB/s per disk.

**Why it matters:** Highly efficient compression has three main advantages: reduced storage costs, increased practical scan speed per disk, and improved network performance. The trade-off is extra CPU time to compress/decompress data.

<DiagramContainer title="Benefits of Compression">
  <CardGrid
    columns={2}
    cards={[
      {
        title: 'Reduced Storage',
        icon: '💾',
        color: colors.green,
        items: [
          'Data takes up less space on disk',
          '10:1 typical compression ratio',
          'Columnar data compresses better',
          'Direct cost savings'
        ]
      },
      {
        title: 'Increased Scan Speed',
        icon: '📈',
        color: colors.blue,
        items: [
          'Effective scan rate multiplied by ratio',
          '200 MB/s → 2 GB/s at 10:1',
          'Less data to read from disk',
          'Bottleneck shifts to CPU/network'
        ]
      },
      {
        title: 'Network Performance',
        icon: '📡',
        color: colors.purple,
        items: [
          'Effective bandwidth multiplied by ratio',
          '10 Gbps → 100 Gbps at 10:1',
          'Critical for cloud storage',
          'Reduces data transfer costs'
        ]
      },
      {
        title: 'CPU Overhead',
        icon: '⚙️',
        color: colors.orange,
        items: [
          'Extra time to compress/decompress',
          'Trade-off consideration',
          'Modern CPUs handle efficiently',
          'Usually worth the cost'
        ]
      }
    ]}
  />
</DiagramContainer>

### 2.7. Caching

**In plain English:** Caching is like keeping your most-used tools on your workbench instead of in the garage. The faster the cache, the higher the cost and the less storage space available. Less frequently accessed data is stored in cheaper, slower storage.

**In technical terms:** The core idea of caching is to store frequently or recently accessed data in a fast access layer. Most practical data systems rely on many cache layers assembled from storage with varying performance characteristics.

**Why it matters:** Caches are critical for data serving, processing, and transformation. Understanding the cache hierarchy helps you design systems that balance performance and cost effectively.

<DiagramContainer title="Storage Hierarchy (Cache to Archive)">
  <StackDiagram
    layers={[
      {
        label: 'CPU Cache',
        description: '1 ns latency • 1 TB/s bandwidth • N/A pricing',
        color: colors.purple
      },
      {
        label: 'RAM',
        description: '0.1 μs latency • 100 GB/s bandwidth • $10/GB',
        color: colors.blue
      },
      {
        label: 'SSD',
        description: '0.1 ms latency • 4 GB/s bandwidth • $0.20/GB',
        color: colors.green
      },
      {
        label: 'HDD',
        description: '4 ms latency • 300 MB/s bandwidth • $0.03/GB',
        color: colors.yellow
      },
      {
        label: 'Object Storage',
        description: '100 ms latency • 10 GB/s bandwidth • $0.02/GB/month',
        color: colors.orange
      },
      {
        label: 'Archival',
        description: '12 hours latency • Same bandwidth • $0.004/GB/month',
        color: colors.red
      }
    ]}
  />
</DiagramContainer>

> **Insight**
>
> We can think of archival storage as a reverse cache. Archival storage provides inferior access characteristics for low costs. It's generally used for data backups and to meet data-retention compliance requirements. In typical scenarios, this data will be accessed only in an emergency.

---

## 3. Data Storage Systems

This section covers the major data storage systems you'll encounter as a data engineer. Storage systems exist at a level of abstraction above raw ingredients. For example, magnetic disks are a raw storage ingredient, while major cloud object storage platforms and HDFS are storage systems that utilize magnetic disks.

### 3.1. Single Machine Versus Distributed Storage

**In plain English:** Single machine storage is like having all your files in one cabinet. Distributed storage is like having multiple cabinets across different rooms with a catalog system to find anything quickly. The second approach is more complex but provides redundancy and scalability.

**In technical terms:** Distributed storage coordinates the activities of multiple servers to store, retrieve, and process data faster and at a larger scale, all while providing redundancy in case a server becomes unavailable.

**Why it matters:** Distributed storage is common in architectures where you want built-in redundancy and scalability for large amounts of data. Object storage, Apache Spark, and cloud data warehouses rely on distributed storage architectures.

<DiagramContainer title="Single Machine vs Distributed Storage">
  <Row gap="lg">
    <Column gap="sm" align="center">
      <Box color={colors.blue} variant="filled" size="lg" icon="💻">
        Single Machine
      </Box>
      <Box color={colors.slate} variant="subtle">
        All data on one server
      </Box>
      <Column gap="xs">
        <Box color={colors.red} variant="outlined" size="sm">Limited by one server</Box>
        <Box color={colors.red} variant="outlined" size="sm">Single point of failure</Box>
        <Box color={colors.red} variant="outlined" size="sm">Vertical scaling only</Box>
        <Box color={colors.green} variant="outlined" size="sm">Simpler to manage</Box>
      </Column>
    </Column>
    <Column gap="sm" align="center">
      <Box color={colors.green} variant="filled" size="lg" icon="🌐">
        Distributed Storage
      </Box>
      <Box color={colors.slate} variant="subtle">
        Data across multiple servers
      </Box>
      <Column gap="xs">
        <Box color={colors.green} variant="outlined" size="sm">Built-in redundancy</Box>
        <Box color={colors.green} variant="outlined" size="sm">Horizontal scalability</Box>
        <Box color={colors.green} variant="outlined" size="sm">High availability</Box>
        <Box color={colors.orange} variant="outlined" size="sm">Consistency challenges</Box>
      </Column>
    </Column>
  </Row>
</DiagramContainer>

### 3.2. Eventual Versus Strong Consistency

**In plain English:** Think of eventual consistency like updating a company phone directory - it takes time for all copies across the organization to reflect recent changes, but eventually they all match. Strong consistency is like a centralized system where everyone always sees the latest update immediately.

**In technical terms:** Eventual consistency (BASE: Basically Available, Soft-state, Eventual consistency) allows you to retrieve data quickly without verifying that you have the latest version across all nodes. Strong consistency ensures that writes to any node are first distributed with a consensus and that any reads against the database return consistent values.

**Why it matters:** Eventual consistency is a common trade-off in large-scale, distributed systems. If you want to scale horizontally to process data in high volumes, then eventual consistency is often the price you'll pay. Strong consistency is used when you can tolerate higher query latency and require correct data every time.

<ComparisonTable
  beforeTitle="Eventual Consistency"
  afterTitle="Strong Consistency"
  beforeColor={colors.orange}
  afterColor={colors.green}
  items={[
    {
      label: "Read Accuracy",
      before: "May return stale data temporarily",
      after: "Always returns latest data"
    },
    {
      label: "Write Performance",
      before: "Fast writes, no consensus needed",
      after: "Slower writes, consensus required"
    },
    {
      label: "Read Performance",
      before: "Fast reads, no validation",
      after: "Slower reads, validation required"
    },
    {
      label: "Scalability",
      before: "Excellent horizontal scaling",
      after: "More challenging to scale"
    },
    {
      label: "Use Case",
      before: "High-volume, distributed systems",
      after: "Critical data requiring accuracy"
    },
    {
      label: "Example",
      before: "Social media feeds, analytics",
      after: "Financial transactions, inventory"
    }
  ]}
/>

**BASE Components:**

<CardGrid
  columns={3}
  cards={[
    {
      title: 'Basically Available',
      icon: '✓',
      color: colors.blue,
      items: [
        'Consistency not guaranteed',
        'Best-effort basis',
        'Consistent data most of the time',
        'High availability prioritized'
      ]
    },
    {
      title: 'Soft-State',
      icon: '~',
      color: colors.purple,
      items: [
        'Transaction state is fuzzy',
        'Uncertain commit status',
        'State may be changing',
        'Eventually resolves'
      ]
    },
    {
      title: 'Eventual Consistency',
      icon: '⏱️',
      color: colors.green,
      items: [
        'Will return consistent values eventually',
        'Takes time to propagate changes',
        'Good enough for many use cases',
        'Trade-off for horizontal scaling'
      ]
    }
  ]}
/>

**Decision Points:**

> **Insight**
>
> Data engineers make decisions about consistency in three places: First, the database technology itself sets the stage for a certain level of consistency. Second, configuration parameters for the database will have an impact on consistency. Third, databases often support some consistency configuration at an individual query level (e.g., DynamoDB's eventually consistent vs strongly consistent reads).

### 3.3. File Storage

**In plain English:** File storage is what you're used to on your computer - files organized in folders (directories) in a tree structure. You can read, write, append, and update files in place. It's familiar and flexible but doesn't scale as well as object storage.

**In technical terms:** A file is a data entity with specific read, write, and reference characteristics. A file has finite length, supports append operations, and allows random access (reading from or writing to any location). File storage systems organize files into a directory tree.

**Why it matters:** While object storage is more important for modern data engineering, understanding file storage is critical because many systems still use it, and it provides context for understanding object storage's trade-offs.

<DiagramContainer title="File Storage Characteristics">
  <CardGrid
    columns={3}
    cards={[
      {
        title: 'Finite Length',
        icon: '📏',
        color: colors.blue,
        items: [
          'Stream of bytes with defined length',
          'Can grow up to system limits',
          'Size changes with modifications',
          'Metadata tracks size'
        ]
      },
      {
        title: 'Append Operations',
        icon: '➕',
        color: colors.purple,
        items: [
          'Add bytes to the end',
          'Efficient for log files',
          'No need to rewrite entire file',
          'Limited by storage system'
        ]
      },
      {
        title: 'Random Access',
        icon: '🎯',
        color: colors.green,
        items: [
          'Read from any location',
          'Write updates to any location',
          'In-place modifications',
          'Requires locking for concurrency'
        ]
      }
    ]}
  />
</DiagramContainer>

#### File Storage Types

**Local Disk Storage:**

<CardGrid
  columns={2}
  cards={[
    {
      title: 'Windows (NTFS)',
      icon: '🪟',
      color: colors.blue,
      items: [
        'Full read-after-write consistency',
        'Journaling for recovery',
        'Snapshots and encryption',
        'Locking for concurrency'
      ]
    },
    {
      title: 'Linux (ext4)',
      icon: '🐧',
      color: colors.green,
      items: [
        'Full read-after-write consistency',
        'Advanced features (journaling, snapshots)',
        'Compression support',
        'Multi-disk extension'
      ]
    }
  ]}
/>

**Network-Attached Storage (NAS):**

- File storage system to clients over a network
- Advantages: redundancy, reliability, fine-grained control, storage pooling, file sharing
- Performance penalties but significant benefits
- Need to be aware of consistency model with multiple clients

**Cloud Filesystem Services:**

<DiagramContainer title="Amazon EFS Example">
  <Column gap="md">
    <Box color={colors.blue} variant="filled" icon="☁️">
      Amazon Elastic File System (EFS)
    </Box>
    <Row gap="md">
      <Box color={colors.green} variant="outlined">NFS 4 Protocol</Box>
      <Box color={colors.green} variant="outlined">Automatic Scaling</Box>
      <Box color={colors.green} variant="outlined">Pay-per-Storage</Box>
    </Row>
    <Box color={colors.purple} variant="subtle">
      Local read-after-write consistency + open-after-close consistency across filesystem
    </Box>
  </Column>
</DiagramContainer>

:::warning
In cases where file storage paradigms are necessary for a pipeline, be careful with state and try to use ephemeral environments as much as possible. Even if you must process files on a server with an attached disk, use object storage for intermediate storage between processing steps.
:::

### 3.4. Block Storage

**In plain English:** Block storage is the raw storage provided by SSDs and magnetic disks. A block is like a small fixed-size container - typically 4,096 bytes. The operating system manages these blocks to create filesystems, or databases access them directly for optimal performance.

**In technical terms:** A block is the smallest addressable unit of data supported by a disk. Transactional database systems generally access disks at a block level to lay out data for optimal performance. Cloud virtualized block storage allows fine control of storage size, scalability, and data durability beyond that offered by raw disks.

**Why it matters:** Block storage is critical for transactional databases and operating system boot disks. Understanding block storage helps you make the right choices for applications that need high random access performance and in-place updates.

<DiagramContainer title="Block Storage Layers">
  <StackDiagram
    layers={[
      {
        label: 'Application Layer',
        description: 'Database or OS filesystem',
        color: colors.purple
      },
      {
        label: 'Block Device',
        description: 'Virtualized or physical block storage',
        color: colors.blue
      },
      {
        label: 'Physical Storage',
        description: 'SSD or magnetic disk',
        color: colors.green
      }
    ]}
  />
</DiagramContainer>

#### Block Storage Types

**RAID (Redundant Array of Independent Disks):**

<CardGrid
  columns={2}
  cards={[
    {
      title: 'RAID Benefits',
      icon: '🛡️',
      color: colors.green,
      items: [
        'Improve data durability',
        'Enhance performance',
        'Combine capacity from multiple drives',
        'Fault tolerance'
      ]
    },
    {
      title: 'RAID Schemes',
      icon: '⚙️',
      color: colors.blue,
      items: [
        'Balance bandwidth vs fault tolerance',
        'Multiple encoding options',
        'Parity schemes',
        'Appears as single device to OS'
      ]
    }
  ]}
/>

**Cloud Virtualized Block Storage (Amazon EBS Example):**

<DiagramContainer title="EBS Architecture">
  <Column gap="md">
    <Row gap="md">
      <Box color={colors.blue} icon="💻">EC2 Instance</Box>
      <Arrow direction="right" label="Network attached" />
      <Box color={colors.green} icon="💾">EBS Volume</Box>
    </Row>
    <Box color={colors.slate} variant="subtle">
      In same availability zone for low latency
    </Box>
    <Row gap="sm">
      <Box color={colors.purple} variant="outlined" size="sm">Host 1 (Replica)</Box>
      <Box color={colors.purple} variant="outlined" size="sm">Host 2 (Replica)</Box>
    </Row>
    <Box color={colors.green} variant="subtle">
      Data replicated to multiple hosts for durability
    </Box>
  </Column>
</DiagramContainer>

**EBS Features:**

<CardGrid
  columns={2}
  cards={[
    {
      title: 'Performance',
      icon: '⚡',
      color: colors.blue,
      items: [
        'Up to 64 TiB volume size',
        '256,000 IOPS',
        '4,000 MiB/s throughput',
        'SSD or magnetic disk tiers'
      ]
    },
    {
      title: 'Advanced Features',
      icon: '🎯',
      color: colors.purple,
      items: [
        'Instantaneous snapshots',
        'Differential backups to S3',
        'Data persists after instance shutdown',
        'Replicated across hosts'
      ]
    }
  ]}
/>

**Local Instance Volumes:**

<ComparisonTable
  beforeTitle="EBS Volumes"
  afterTitle="Instance Store Volumes"
  beforeColor={colors.blue}
  afterColor={colors.orange}
  items={[
    {
      label: "Persistence",
      before: "Survives instance stop/restart",
      after: "Lost on instance stop/delete"
    },
    {
      label: "Replication",
      before: "Replicated across multiple hosts",
      after: "No replication"
    },
    {
      label: "Snapshots",
      before: "Supports snapshots to S3",
      after: "No snapshot support"
    },
    {
      label: "Performance",
      before: "Network-attached, some latency",
      after: "Locally attached, low latency"
    },
    {
      label: "Cost",
      before: "Pay per GB provisioned",
      after: "Included with instance"
    },
    {
      label: "Use Case",
      before: "Databases, persistent storage",
      after: "Caching, temporary processing"
    }
  ]}
/>

> **Insight**
>
> Instance store volumes are extremely useful for ephemeral workloads like AWS EMR on EC2 instances. The EMR filesystem builds in replication and redundancy and serves as a cache rather than permanent storage. Local storage is cost-effective and performant when data loss isn't catastrophic.

### 3.5. Object Storage

**In plain English:** Think of object storage like a massive parking garage. Each parking spot has a unique ID (the key), and you can park any type of vehicle (object) there. You can't modify a vehicle once parked - you'd have to remove it entirely and park a new one. But you can access any spot instantly by its ID, and the garage automatically handles all the complexity of managing millions of spots across multiple buildings.

**In technical terms:** An object store is a key-value store for immutable data objects. Objects don't support random writes or append operations; instead, they are written once as a stream of bytes. After this initial write, objects become immutable. To change data in an object, we must rewrite the full object.

**Why it matters:** Object storage is the foundation of modern data architecture. It enables separation of compute and storage, allowing ephemeral clusters to scale independently. Object stores support massive parallelism (thousands of disks reading simultaneously), provide built-in durability and availability across zones, and cost far less than alternatives at scale.

<DiagramContainer title="Object Storage Characteristics">
  <CardGrid
    columns={3}
    cards={[
      {
        title: 'Immutable Objects',
        icon: '🔒',
        color: colors.red,
        items: [
          'Objects cannot be modified in place',
          'Must rewrite entire object to update',
          'Simplifies consistency management',
          'Enables massive parallelism'
        ]
      },
      {
        title: 'Key-Value Store',
        icon: '🔑',
        color: colors.blue,
        items: [
          'Objects referenced by unique keys',
          'No directory tree traversal',
          'Bucket + key = object location',
          'Fast lookup by key'
        ]
      },
      {
        title: 'High Scalability',
        icon: '📈',
        color: colors.green,
        items: [
          'Virtually unlimited storage',
          'Data across thousands of disks',
          'Parallel reads/writes scale',
          'Multi-zone replication'
        ]
      },
      {
        title: 'Parallelism',
        icon: '⚡',
        color: colors.purple,
        items: [
          'Scales read/write with parallel streams',
          'Hidden from engineers',
          'Ideal for distributed query engines',
          'Limited by network, not disk'
        ]
      },
      {
        title: 'Durability & Availability',
        icon: '🛡️',
        color: colors.orange,
        items: [
          'Data saved in multiple zones',
          'Extremely high durability',
          'Reduced risk of data loss',
          'Built into base cost'
        ]
      },
      {
        title: 'Cost Effective',
        icon: '💰',
        color: colors.green,
        items: [
          '~$0.02/GB/month standard tier',
          'Cheaper than block storage',
          'Enables separation of compute/storage',
          'Pay only for what you store'
        ]
      }
    ]}
  />
</DiagramContainer>

**Popular Object Stores:**

<CardGrid
  columns={3}
  cards={[
    {
      title: 'Amazon S3',
      icon: '☁️',
      color: colors.orange,
      items: [
        'Industry standard',
        'Strong consistency',
        'Versioning support',
        'Lifecycle policies'
      ]
    },
    {
      title: 'Azure Blob Storage',
      icon: '☁️',
      color: colors.blue,
      items: [
        'Microsoft ecosystem',
        'Hot, cool, archive tiers',
        'Integration with Azure services',
        'Hierarchical namespace option'
      ]
    },
    {
      title: 'Google Cloud Storage',
      icon: '☁️',
      color: colors.green,
      items: [
        'Google cloud ecosystem',
        'Strong consistency',
        'Nearline and coldline tiers',
        'BigQuery integration'
      ]
    }
  ]}
/>

#### Object Lookup

**In plain English:** Unlike file systems with folders, object stores use a flat key-value model. While keys can look like folder paths (e.g., `project-data/2021/data.txt`), there's no actual directory structure - the entire string is just the key.

```
S3://oreilly-data-engineering-book/project-data/11/23/2021/data.txt
```

**Breaking it down:**
- **Bucket:** `S3://oreilly-data-engineering-book/`
- **Key:** `project-data/11/23/2021/data.txt`

:::caution
Cloud object stores may appear to support directory tree semantics, but no true directory hierarchy exists. "Directory"-level operations are costly in an object store. To list all objects in a "subdirectory," the object store must filter keys on the key prefix, which might take time if the bucket contains millions of objects.
:::

#### Object Consistency and Versioning

**Object Consistency Evolution:**

<ComparisonTable
  beforeTitle="Eventually Consistent (S3 Legacy)"
  afterTitle="Strongly Consistent (S3 Current)"
  beforeColor={colors.red}
  afterColor={colors.green}
  items={[
    {
      label: "Read After Write",
      before: "Might return old version temporarily",
      after: "Always returns latest version"
    },
    {
      label: "Complexity",
      before: "Required workarounds (e.g., external DB)",
      after: "Simpler application logic"
    },
    {
      label: "Performance",
      before: "Slightly faster in some cases",
      after: "Minimal performance impact"
    },
    {
      label: "Use Cases",
      before: "Required careful handling",
      after: "Safe for all use cases"
    }
  ]}
/>

**Object Versioning:**

<DiagramContainer title="Object Versioning">
  <Column gap="md">
    <Box color={colors.blue} variant="filled">
      Object Key: data.txt
    </Box>
    <Arrow direction="down" label="References" />
    <Column gap="sm">
      <Row gap="xs">
        <Box color={colors.green} variant="outlined" size="sm">Version 3 (Latest)</Box>
        <Box color={colors.slate} variant="subtle" size="sm">Default reference</Box>
      </Row>
      <Row gap="xs">
        <Box color={colors.purple} variant="outlined" size="sm">Version 2</Box>
        <Box color={colors.slate} variant="subtle" size="sm">Historical</Box>
      </Row>
      <Row gap="xs">
        <Box color={colors.orange} variant="outlined" size="sm">Version 1</Box>
        <Box color={colors.slate} variant="subtle" size="sm">Historical</Box>
      </Row>
    </Column>
    <Box color={colors.blue} variant="subtle">
      Old versions retained until explicitly deleted or lifecycle policy removes them
    </Box>
  </Column>
</DiagramContainer>

**Versioning Benefits & Costs:**

<CardGrid
  columns={2}
  cards={[
    {
      title: 'Benefits',
      icon: '✅',
      color: colors.green,
      items: [
        'Error recovery when processes fail',
        'Track history of datasets',
        'Rollback to previous versions',
        'Key + version = immutable reference'
      ]
    },
    {
      title: 'Costs',
      icon: '💰',
      color: colors.red,
      items: [
        'Historical versions cost same as current',
        'High update frequency = high costs',
        'Can be insignificant or catastrophic',
        'Use lifecycle policies to manage'
      ]
    }
  ]}
/>

#### Storage Classes and Tiers

**S3 Storage Tiers Example:**

<DiagramContainer title="S3 Storage Tier Hierarchy">
  <StackDiagram
    layers={[
      {
        label: 'S3 Standard',
        description: 'Frequent access • $0.023/GB/month • Instant retrieval',
        color: colors.red
      },
      {
        label: 'S3 Standard-IA',
        description: 'Infrequent access • $0.0125/GB/month • Instant retrieval • Retrieval fees',
        color: colors.orange
      },
      {
        label: 'S3 One Zone-IA',
        description: 'Single zone • $0.01/GB/month • 99.5% availability • Retrieval fees',
        color: colors.yellow
      },
      {
        label: 'S3 Glacier Instant',
        description: 'Archive with instant • $0.004/GB/month • Millisecond retrieval',
        color: colors.blue
      },
      {
        label: 'S3 Glacier Deep',
        description: 'Long-term archive • $0.001/GB/month • 12-hour retrieval',
        color: colors.purple
      }
    ]}
  />
</DiagramContainer>

:::warning
Be aware of how you plan to utilize archival storage, as it's easy to get into and often costly to access data, especially if you need it more often than expected. Some organizations find their archival costs explode due to unexpected retrieval patterns.
:::

### 3.6. Cache and Memory-Based Storage Systems

**In plain English:** RAM-based storage systems are like keeping your most important documents on your desk instead of filing them away. They're incredibly fast to access, but anything on your desk disappears if the power goes out (unless you have backup systems).

**In technical terms:** RAM offers excellent latency and transfer speeds but is vulnerable to data loss from power outages. RAM-based storage systems are generally focused on caching applications, presenting data for quick access and high bandwidth. Data should generally be written to a more durable medium for retention purposes.

**Why it matters:** These ultra-fast cache systems are useful when data engineers need to serve data with ultra-fast retrieval latency (sub-millisecond response times for web applications, real-time analytics, session stores).

<DiagramContainer title="Memory-Based Storage Systems">
  <Row gap="lg">
    <Column gap="sm" align="center">
      <Box color={colors.blue} icon="⚡" size="lg">Memcached</Box>
      <Box color={colors.slate} variant="subtle">
        Lightweight Object Caching
      </Box>
      <Column gap="xs">
        <Box color={colors.blue} variant="outlined" size="sm">Simple data structures (string, integer)</Box>
        <Box color={colors.blue} variant="outlined" size="sm">Cache database query results</Box>
        <Box color={colors.blue} variant="outlined" size="sm">Very low latency</Box>
        <Box color={colors.blue} variant="outlined" size="sm">No persistence</Box>
      </Column>
    </Column>
    <Column gap="sm" align="center">
      <Box color={colors.purple} icon="🔄" size="lg">Redis</Box>
      <Box color={colors.slate} variant="subtle">
        Memory Caching with Optional Persistence
      </Box>
      <Column gap="xs">
        <Box color={colors.purple} variant="outlined" size="sm">Complex data types (lists, sets, sorted sets)</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Snapshotting and journaling</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Writes every ~2 seconds</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Small data loss tolerance</Box>
      </Column>
    </Column>
  </Row>
</DiagramContainer>

**Use Cases:**

<CardGrid
  columns={3}
  cards={[
    {
      title: 'Session Store',
      icon: '👤',
      color: colors.blue,
      items: [
        'User session data',
        'Shopping carts',
        'Authentication tokens',
        'Sub-millisecond access'
      ]
    },
    {
      title: 'Cache Layer',
      icon: '📦',
      color: colors.purple,
      items: [
        'Database query results',
        'API responses',
        'Computed values',
        'Reduce backend load'
      ]
    },
    {
      title: 'Real-Time Analytics',
      icon: '📊',
      color: colors.green,
      items: [
        'Leaderboards',
        'Counters',
        'Time-series data',
        'Instant updates'
      ]
    }
  ]}
/>

### 3.7. The Hadoop Distributed File System

**In plain English:** HDFS is like a massive library system where books (data) are split into chapters (blocks) and copies are stored in multiple locations. Unlike modern cloud storage where storage and processing are separate, HDFS keeps the processing computers right where the data is stored.

**In technical terms:** The Hadoop Distributed File System is based on Google File System (GFS) and was initially engineered to process data with the MapReduce programming model. Hadoop is similar to object storage but with a key difference: Hadoop combines compute and storage on the same nodes.

**Why it matters:** While HDFS is no longer bleeding-edge technology, it remains widely used in various applications and organizations. Understanding HDFS helps you work with legacy installations and appreciate why modern architectures separate compute from storage.

<DiagramContainer title="HDFS Architecture">
  <Column gap="md">
    <Box color={colors.blue} variant="filled" icon="👑">
      NameNode
    </Box>
    <Box color={colors.slate} variant="subtle" size="sm">
      Maintains directories, file metadata, block catalog
    </Box>
    <Arrow direction="down" label="Manages" />
    <Row gap="sm">
      <Column gap="xs">
        <Box color={colors.green} icon="💾" size="sm">DataNode 1</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Data blocks</Box>
        <Box color={colors.orange} variant="outlined" size="sm">Compute</Box>
      </Column>
      <Column gap="xs">
        <Box color={colors.green} icon="💾" size="sm">DataNode 2</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Data blocks</Box>
        <Box color={colors.orange} variant="outlined" size="sm">Compute</Box>
      </Column>
      <Column gap="xs">
        <Box color={colors.green} icon="💾" size="sm">DataNode 3</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Data blocks</Box>
        <Box color={colors.orange} variant="outlined" size="sm">Compute</Box>
      </Column>
    </Row>
    <Box color={colors.blue} variant="subtle">
      Each block replicated to 3 nodes for durability and availability
    </Box>
  </Column>
</DiagramContainer>

**HDFS Characteristics:**

<CardGrid
  columns={2}
  cards={[
    {
      title: 'Data Management',
      icon: '📦',
      color: colors.blue,
      items: [
        'Files broken into blocks (~few hundred MB)',
        'Blocks replicated to 3 nodes',
        'NameNode tracks block locations',
        'Automatic rebalancing on failure'
      ]
    },
    {
      title: 'Compute Integration',
      icon: '⚙️',
      color: colors.purple,
      items: [
        'Combines compute with storage',
        'In-place data processing',
        'Originally MapReduce model',
        'Now supports Spark and other engines'
      ]
    }
  ]}
/>

:::info Hadoop is dead. Long live Hadoop!
We often see claims that Hadoop is dead. This is only partially true:

**What's True:**
- Hadoop is no longer hot, bleeding-edge technology
- Many Hadoop ecosystem tools (Apache Pig) are now on life support
- Pure MapReduce programming model has fallen by the wayside

**What's Still Relevant:**
- HDFS remains widely used in various applications
- Many legacy installations still run production workloads
- HDFS is a key ingredient of Amazon EMR
- Apache Spark still commonly runs on HDFS clusters

**Who Should Use It:**
- ✅ Companies with massive (thousand-node) Hadoop clusters and resources to maintain on-premises systems
- ❌ Smaller companies should reconsider cost overhead and scale limitations vs. migrating to cloud solutions
:::

### 3.8. Streaming Storage

**In plain English:** Streaming storage is like a DVR for data events. It captures a continuous stream of events (clicks, transactions, sensor readings) and stores them temporarily so multiple consumers can replay and process them at their own pace.

**In technical terms:** Streaming data has different storage requirements than nonstreaming data. Distributed, scalable streaming frameworks like Apache Kafka allow extremely long-duration streaming data retention by pushing old, infrequently accessed messages down to object storage.

**Why it matters:** Replay allows a streaming system to return a range of historical stored data. This is the standard data-retrieval mechanism for streaming storage systems and enables reprocessing data in streaming pipelines or running batch queries over time ranges.

<DiagramContainer title="Streaming Storage Architecture">
  <Column gap="md">
    <Box color={colors.blue} variant="filled" icon="📡">
      Event Producers
    </Box>
    <Arrow direction="down" label="Continuous stream" />
    <Box color={colors.purple} variant="filled" icon="📨" size="lg">
      Streaming Storage (Kafka, Kinesis, Pulsar)
    </Box>
    <Box color={colors.slate} variant="subtle">
      Stores events with retention policy • Supports replay
    </Box>
    <Arrow direction="down" label="Multiple consumers" />
    <Row gap="sm">
      <Box color={colors.green} variant="outlined">Consumer 1: Real-time processing</Box>
      <Box color={colors.orange} variant="outlined">Consumer 2: Batch analytics</Box>
      <Box color={colors.blue} variant="outlined">Consumer 3: Archive to object storage</Box>
    </Row>
  </Column>
</DiagramContainer>

**Popular Streaming Storage Systems:**

<CardGrid
  columns={2}
  cards={[
    {
      title: 'Apache Kafka',
      icon: '📨',
      color: colors.blue,
      items: [
        'Distributed, scalable streaming',
        'Long-duration retention',
        'Pushes old messages to object storage',
        'Industry standard for streaming'
      ]
    },
    {
      title: 'Managed Alternatives',
      icon: '☁️',
      color: colors.purple,
      items: [
        'Amazon Kinesis',
        'Google Cloud Pub/Sub',
        'Apache Pulsar',
        'All support long retention + replay'
      ]
    }
  ]}
/>

**Key Features:**

- **Data Retention:** Store events for hours, days, or indefinitely
- **Replay:** Return historical data for reprocessing or batch queries
- **Multiple Consumers:** Each consumer tracks its own position independently
- **Real-Time Analytics:** Data becomes visible to queries as soon as written

### 3.9. Indexes, Partitioning, and Clustering

**In plain English:** Indexes, partitions, and clusters are like organizing a massive library. Indexes are the card catalog (find books by author/title). Partitions are sections (fiction, non-fiction). Clusters are shelving books alphabetically within each section so related books are next to each other.

**In technical terms:** Indexes provide a map of the table for particular fields and allow extremely fast lookup of individual records. Partitioning splits a table into multiple subtables by splitting on a field. Clustering sorts data within partitions by one or a few fields, colocating similar values.

**Why it matters:** These techniques are critical for query performance. Understanding when to use indexes (transactional databases) versus partitions and clustering (analytics databases) helps you design efficient data systems.

#### The Evolution from Rows to Columns

<ComparisonTable
  beforeTitle="Row-Oriented Databases"
  afterTitle="Columnar Databases"
  beforeColor={colors.blue}
  afterColor={colors.purple}
  items={[
    {
      label: "Data Organization",
      before: "Stores complete rows together",
      after: "Stores columns separately"
    },
    {
      label: "Best For",
      before: "Transactional lookups, updates",
      after: "Analytics queries, aggregations"
    },
    {
      label: "Read Pattern",
      before: "Read entire row quickly",
      after: "Read specific columns only"
    },
    {
      label: "Compression",
      before: "Lower compression ratios",
      after: "High compression (similar values)"
    },
    {
      label: "Write Performance",
      before: "Fast individual row writes",
      after: "Slower for single rows"
    },
    {
      label: "Scan Performance",
      before: "Slow for large scans",
      after: "Fast for large scans"
    },
    {
      label: "Indexes",
      before: "Critical for performance",
      after: "Less important with partitioning"
    }
  ]}
/>

#### From Indexes to Partitions and Clustering

<DiagramContainer title="Partitioning and Clustering">
  <Column gap="md">
    <Box color={colors.blue} variant="filled" size="lg">
      Large Table
    </Box>
    <Arrow direction="down" label="Partition by date" />
    <Row gap="sm">
      <Column gap="xs">
        <Box color={colors.purple} variant="outlined">Partition: 2024-01</Box>
        <Box color={colors.slate} variant="subtle" size="sm">Cluster by customer_id</Box>
      </Column>
      <Column gap="xs">
        <Box color={colors.purple} variant="outlined">Partition: 2024-02</Box>
        <Box color={colors.slate} variant="subtle" size="sm">Cluster by customer_id</Box>
      </Column>
      <Column gap="xs">
        <Box color={colors.purple} variant="outlined">Partition: 2024-03</Box>
        <Box color={colors.slate} variant="subtle" size="sm">Cluster by customer_id</Box>
      </Column>
    </Row>
    <Box color={colors.green} variant="subtle">
      Query scans only relevant partitions, and clustering improves filtering/joining
    </Box>
  </Column>
</DiagramContainer>

**Benefits:**

<CardGrid
  columns={3}
  cards={[
    {
      title: 'Partitioning',
      icon: '📁',
      color: colors.blue,
      items: [
        'Scan only relevant data',
        'Common: date/time partitioning',
        'Dramatically reduces data scanned',
        'Improves query performance'
      ]
    },
    {
      title: 'Clustering',
      icon: '🗂️',
      color: colors.purple,
      items: [
        'Sorts data within partitions',
        'Colocates similar values',
        'Improves filtering performance',
        'Better join performance'
      ]
    },
    {
      title: 'Combined Effect',
      icon: '⚡',
      color: colors.green,
      items: [
        'Massive performance gains',
        'Reduced cost (less data scanned)',
        'Faster queries',
        'Essential for large datasets'
      ]
    }
  ]}
/>

#### Example: Snowflake Micro-Partitioning

**In plain English:** Snowflake automatically breaks tables into small chunks (micro-partitions) and keeps detailed notes about what's in each chunk. When you query, it quickly checks its notes and skips chunks that don't have the data you need.

**In technical terms:** Micro partitions are sets of rows between 50 and 500 megabytes in uncompressed size. Snowflake uses an algorithmic approach that attempts to cluster together similar rows, looking for values that are repeated in a field across many rows.

<DiagramContainer title="Snowflake Micro-Partitioning">
  <Column gap="md">
    <Row gap="md">
      <Box color={colors.blue} variant="filled" icon="📊">Table Data</Box>
      <Arrow direction="right" label="Automatically partitioned" />
      <Column gap="xs">
        <Box color={colors.purple} variant="outlined" size="sm">Micro-partition 1 (50-500 MB)</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Micro-partition 2 (50-500 MB)</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Micro-partition 3 (50-500 MB)</Box>
      </Column>
    </Row>
    <Arrow direction="down" />
    <Box color={colors.green} variant="filled" icon="📋">
      Metadata Database
    </Box>
    <Box color={colors.slate} variant="subtle" size="sm">
      Stores: row count, value ranges for fields, repeated values
    </Box>
    <Arrow direction="down" label="Query analyzes metadata" />
    <Box color={colors.orange} variant="outlined">
      Prune: Skip partitions that don't match WHERE clause
    </Box>
  </Column>
</DiagramContainer>

**Example Query:**
```sql
WHERE created_date='2022-01-02'
```

Snowflake excludes any micro-partitions that don't include this date, effectively pruning this data. The metadata database plays a role similar to an index in a traditional relational database.

---

## 4. Data Engineering Storage Abstractions

Data engineering storage abstractions are data organization and query patterns that sit at the heart of the data engineering lifecycle and are built atop the data storage systems discussed previously.

**In plain English:** Storage abstractions are like different types of buildings you can construct using the same raw materials. You might build a traditional warehouse (data warehouse), a wide-open storage facility (data lake), or a hybrid smart warehouse (data lakehouse) - all using the same underlying storage systems.

**In technical terms:** The main types of abstractions we'll concern ourselves with are those that support data science, analytics, and reporting use cases. These include data warehouse, data lake, data lakehouse, data platforms, and stream-to-batch architectures.

**Why it matters:** Understanding storage abstractions helps you choose the right organizational pattern for your data. The storage abstraction you require boils down to purpose, update patterns, cost, and whether you separate storage from compute.

<DiagramContainer title="Storage Abstractions Decision Factors">
  <CardGrid
    columns={2}
    cards={[
      {
        title: 'Purpose and Use Case',
        icon: '🎯',
        color: colors.blue,
        items: [
          'What is the data used for?',
          'Analytics, ML, operational reporting?',
          'Real-time or batch processing?',
          'Structured or unstructured data?'
        ]
      },
      {
        title: 'Update Patterns',
        icon: '🔄',
        color: colors.purple,
        items: [
          'Bulk updates or streaming inserts?',
          'Upserts and deletes required?',
          'Append-only acceptable?',
          'ACID compliance needed?'
        ]
      },
      {
        title: 'Cost',
        icon: '💰',
        color: colors.orange,
        items: [
          'Direct financial costs?',
          'Time to value?',
          'Opportunity costs?',
          'Total cost of ownership?'
        ]
      },
      {
        title: 'Separate Storage and Compute',
        icon: '🔌',
        color: colors.green,
        items: [
          'Trend toward separation',
          'Most systems hybridize',
          'Affects purpose, speed, cost',
          'Cloud-native consideration'
        ]
      }
    ]}
  />
</DiagramContainer>

> **Insight**
>
> The popularity of separating storage from compute means the lines between OLAP databases and data lakes are increasingly blurring. Major cloud data warehouses and data lakes are on a collision course. In the future, the differences between these two may be in name only.

### 4.1. The Data Warehouse

**In plain English:** A data warehouse is like a central library for your company's data - everything is organized, cataloged, and optimized for people to find and analyze information quickly. Modern cloud data warehouses are vastly more accessible than their expensive predecessors.

**In technical terms:** Data warehouses are a standard OLAP data architecture. The term refers to technology platforms (e.g., Google BigQuery and Snowflake), an architecture for data centralization, and an organizational pattern within a company.

**Why it matters:** Cloud data warehouses have become accessible even to tiny companies with pay-as-you-go models and third-party management. They've evolved to handle massive amounts of raw text and complex JSON documents, blurring the line with data lakes.

<DiagramContainer title="Data Warehouse Evolution">
  <StackDiagram
    layers={[
      {
        label: 'Modern: Cloud Data Warehouses',
        description: 'BigQuery, Snowflake, Redshift - separated compute/storage',
        color: colors.green
      },
      {
        label: 'Recent: Columnar MPP',
        description: 'Vertica, Teradata Columnar - on-premises',
        color: colors.blue
      },
      {
        label: 'Legacy: Row-Based MPP',
        description: 'Teradata, IBM Netezza - expensive',
        color: colors.purple
      },
      {
        label: 'Original: Transactional DB',
        description: 'Built on same RDBMS as OLTP',
        color: colors.orange
      }
    ]}
  />
</DiagramContainer>

**Cloud Data Warehouse Characteristics:**

<CardGrid
  columns={2}
  cards={[
    {
      title: 'What They Can Handle',
      icon: '✅',
      color: colors.green,
      items: [
        'Massive amounts of raw text',
        'Complex JSON documents',
        'Structured relational data',
        'Petabytes of data in single queries'
      ]
    },
    {
      title: 'What They Cannot Handle',
      icon: '❌',
      color: colors.red,
      items: [
        'Truly unstructured data (images, video, audio)',
        'Requires coupling with object storage',
        'Not ideal for transactional workloads',
        'Cost can be high for certain patterns'
      ]
    }
  ]}
/>

### 4.2. The Data Lake

**In plain English:** A data lake is like a massive storage unit where you can dump anything - structured data, unstructured data, videos, logs - without organizing it first. The promise was flexibility, but first-generation data lakes often became a junkyard ("data swamp").

**In technical terms:** The data lake was originally conceived as a massive store where data was retained in raw, unprocessed form. Initially built primarily on Hadoop systems, data lakes have evolved with two major developments: migration toward separation of compute and storage (away from Hadoop toward cloud object storage), and rediscovery that MPP system functionality (schema management, update/delete capabilities) is extremely useful.

**Why it matters:** First-generation data lakes generally failed to deliver on their promise, leading to "data swamps," "dark data," and WORN (write once, read never) datasets. Understanding what went wrong helps you avoid the same pitfalls with modern approaches.

#### Data Lake 1.0: Promise and Problems

**The Promise:**

<CardGrid
  columns={2}
  cards={[
    {
      title: 'Storage Freedom',
      icon: '💾',
      color: colors.blue,
      items: [
        'Store any size and type of data',
        'Extremely cheap storage costs',
        'Virtually limitless capacity',
        'Decouple storage from compute'
      ]
    },
    {
      title: 'Processing Flexibility',
      icon: '⚙️',
      color: colors.green,
      items: [
        'Unlimited computing power on demand',
        'Pick favorite processing technology',
        'MapReduce, Spark, Presto, Hive',
        'Process at your own pace'
      ]
    }
  ]}
/>

**The Problems:**

<CardGrid
  columns={2}
  cards={[
    {
      title: 'Data Management Nightmare',
      icon: '⚠️',
      color: colors.red,
      items: [
        'Data swamps and dark data',
        'Little schema management',
        'Poor cataloging and discovery',
        'Unmanageable data sizes'
      ]
    },
    {
      title: 'Processing Complexity',
      icon: '😵',
      color: colors.orange,
      items: [
        'MapReduce jobs for simple joins',
        'Painful DML operations (update, delete)',
        'Write-only architecture problems',
        'GDPR compliance nightmares'
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
> Many organizations found significant value in data lakes - especially huge Silicon Valley tech companies like Netflix and Facebook with resources to build successful practices. But for many organizations, data lakes turned into an internal superfund site of waste, disappointment, and spiraling costs.

#### Evolution: Next-Generation Data Lakes

The last five years have seen two major developments:

1. **Separation of Compute and Storage:** Migration away from Hadoop toward cloud object storage for long-term retention
2. **Rediscovery of MPP Features:** Schema management, update/merge/delete capabilities are extremely useful

This led to the notion of the **data lakehouse**.

### 4.3. The Data Lakehouse

**In plain English:** The data lakehouse is like a data lake that learned from data warehouses - it keeps the flexibility of storing anything but adds the controls, management, and reliability that warehouses always had.

**In technical terms:** The data lakehouse is an architecture that combines aspects of the data warehouse and the data lake. The lakehouse stores data in object storage just like a lake but adds features designed to streamline data management and create an engineering experience similar to a data warehouse.

**Why it matters:** The lakehouse incorporates the controls, data management, and data structures found in a data warehouse while still housing data in object storage and supporting a variety of query and transformation engines. This provides the best of both worlds: flexibility and control.

<DiagramContainer title="Data Lakehouse Architecture">
  <StackDiagram
    layers={[
      {
        label: 'Query & Analytics Layer',
        description: 'Spark, Presto, Trino, data science tools',
        color: colors.purple
      },
      {
        label: 'Metadata & Management',
        description: 'Delta Lake, Apache Hudi, Apache Iceberg',
        color: colors.blue
      },
      {
        label: 'Object Storage',
        description: 'S3, Azure Blob, GCS - Parquet/ORC files',
        color: colors.green
      }
    ]}
  />
</DiagramContainer>

**Key Features:**

<CardGrid
  columns={3}
  cards={[
    {
      title: 'ACID Transactions',
      icon: '✅',
      color: colors.blue,
      items: [
        'Atomicity',
        'Consistency',
        'Isolation',
        'Durability'
      ]
    },
    {
      title: 'Schema Management',
      icon: '📋',
      color: colors.purple,
      items: [
        'Schema enforcement',
        'Schema evolution',
        'Data cataloging',
        'Discovery tools'
      ]
    },
    {
      title: 'Data Operations',
      icon: '⚙️',
      color: colors.green,
      items: [
        'Update rows',
        'Delete rows',
        'Merge operations',
        'Time travel'
      ]
    },
    {
      title: 'Table History',
      icon: '📚',
      color: colors.orange,
      items: [
        'Rollback support',
        'Audit trails',
        'Version control',
        'Retain old file versions'
      ]
    },
    {
      title: 'Interoperability',
      icon: '🔄',
      color: colors.blue,
      items: [
        'Open file formats',
        'Multiple tools can connect',
        'Read directly from storage',
        'No proprietary lock-in'
      ]
    },
    {
      title: 'Flexibility',
      icon: '🎯',
      color: colors.purple,
      items: [
        'Impose structure where needed',
        'Leave other data raw',
        'Unstructured data supported',
        'Best of both worlds'
      ]
    }
  ]}
/>

**Popular Lakehouse Technologies:**

<CardGrid
  columns={3}
  cards={[
    {
      title: 'Delta Lake',
      icon: '🔷',
      color: colors.blue,
      items: [
        'Databricks open source',
        'ACID transactions',
        'Time travel',
        'Schema enforcement/evolution'
      ]
    },
    {
      title: 'Apache Hudi',
      icon: '🔶',
      color: colors.orange,
      items: [
        'Uber open source',
        'Upsert and delete support',
        'Incremental processing',
        'Record-level operations'
      ]
    },
    {
      title: 'Apache Iceberg',
      icon: '🔷',
      color: colors.purple,
      items: [
        'Netflix open source',
        'Table evolution',
        'Hidden partitioning',
        'Time travel and rollback'
      ]
    }
  ]}
/>

**Key Advantage:**

> **Insight**
>
> The key advantage of the data lakehouse over proprietary tools is interoperability. It's much easier to exchange data between tools when stored in an open file format. Various tools can connect to the metadata layer and read data directly from object storage.

:::note
It is important to emphasize that much of the data in a data lakehouse may not have a table structure imposed. We can impose data warehouse features where we need them in a lakehouse, leaving other data in a raw or even unstructured format.
:::

### 4.4. Data Platforms

**In plain English:** Data platforms are like walled gardens where vendors provide a complete ecosystem of tools that work seamlessly together. Think Apple's ecosystem - everything integrates nicely, but you're somewhat locked into their world.

**In technical terms:** Vendors are increasingly styling their products as data platforms, creating their ecosystems of interoperable tools with tight integration into the core data storage layer. Platforms emphasize close integration with object storage for unstructured use cases.

**Why it matters:** Platforms simplify the work of data engineering but generate significant vendor lock-in. Engineers must ensure that the tools offered meet their needs, as tools not directly provided in the platform can still interoperate, but with extra data overhead.

<DiagramContainer title="Data Platform Architecture">
  <Column gap="md">
    <Box color={colors.blue} variant="filled" size="lg" icon="🏢">
      Core Storage Layer
    </Box>
    <Arrow direction="down" label="Tight integration" />
    <Row gap="sm">
      <Box color={colors.purple} variant="outlined">Ingestion Tools</Box>
      <Box color={colors.green} variant="outlined">Transformation Tools</Box>
      <Box color={colors.orange} variant="outlined">Analytics Tools</Box>
      <Box color={colors.blue} variant="outlined">ML Tools</Box>
    </Row>
    <Box color={colors.slate} variant="subtle">
      + Object storage integration for unstructured data
    </Box>
  </Column>
</DiagramContainer>

**Examples of Data Platforms:**

<CardGrid
  columns={3}
  cards={[
    {
      title: 'Snowflake',
      icon: '❄️',
      color: colors.blue,
      items: [
        'Core warehouse',
        'Snowpipe ingestion',
        'Streams and tasks',
        'Snowpark (Python/Java)',
        'Marketplace'
      ]
    },
    {
      title: 'Databricks',
      icon: '🔶',
      color: colors.orange,
      items: [
        'Delta Lake storage',
        'Spark processing',
        'MLflow for ML',
        'Unity Catalog',
        'SQL Analytics'
      ]
    },
    {
      title: 'Google Cloud',
      icon: '☁️',
      color: colors.green,
      items: [
        'BigQuery warehouse',
        'Dataflow processing',
        'Dataproc (Spark)',
        'Pub/Sub messaging',
        'Vertex AI for ML'
      ]
    }
  ]}
/>

**Trade-offs:**

<ComparisonTable
  beforeTitle="Platform Advantages"
  afterTitle="Platform Disadvantages"
  beforeColor={colors.green}
  afterColor={colors.red}
  items={[
    {
      label: "Integration",
      before: "Seamless tool integration",
      after: "Vendor lock-in"
    },
    {
      label: "Complexity",
      before: "Simplified data engineering",
      after: "Limited flexibility outside ecosystem"
    },
    {
      label: "Features",
      before: "Comprehensive toolset",
      after: "May not meet all needs"
    },
    {
      label: "Support",
      before: "Single vendor support",
      after: "Dependency on single vendor"
    }
  ]}
/>

> **Insight**
>
> At this point, the notion of the data platform frankly has yet to be fully fleshed out. However, the race is on to create a walled garden of data tools, both simplifying the work of data engineering and generating significant vendor lock-in.

### 4.5. Stream-to-Batch Storage Architecture

**In plain English:** Stream-to-batch architecture is like recording a live TV show while also watching it in real-time. Some people watch it live (streaming consumers), while others record it to watch later (batch consumers). Both get the same content, just at different times and in different ways.

**In technical terms:** The stream-to-batch storage architecture has many similarities to the Lambda architecture. Essentially, data flowing through a topic in the streaming storage system is written out to multiple consumers - some for real-time processing and some for long-term retention and batch queries.

**Why it matters:** This architecture allows you to serve both real-time and historical analytics use cases from a single data source, avoiding data duplication and ensuring consistency.

<DiagramContainer title="Stream-to-Batch Architecture">
  <Column gap="md">
    <Box color={colors.blue} icon="📊">
      Event Sources
    </Box>
    <Arrow direction="down" />
    <Box color={colors.purple} icon="📨" size="lg">
      Streaming Storage (Kafka / Kinesis Topic)
    </Box>
    <Row gap="md">
      <Column gap="sm">
        <Arrow direction="down" label="Live stream" />
        <Box color={colors.green} icon="⚡">Real-Time Processing</Box>
        <Box color={colors.slate} variant="subtle" size="sm">
          Immediate statistics, alerts, dashboards
        </Box>
      </Column>
      <Column gap="sm">
        <Arrow direction="down" label="Write to storage" />
        <Box color={colors.orange} icon="💾">Batch Storage Consumer</Box>
        <Box color={colors.slate} variant="subtle" size="sm">
          S3 / Object storage via Kinesis Firehose
        </Box>
      </Column>
    </Row>
    <Arrow direction="down" />
    <Box color={colors.blue} variant="outlined">
      Batch Queries on Historical Data
    </Box>
  </Column>
</DiagramContainer>

**Implementation Examples:**

<CardGrid
  columns={2}
  cards={[
    {
      title: 'AWS Kinesis Firehose',
      icon: '🔥',
      color: colors.orange,
      items: [
        'Writes to S3 automatically',
        'Configurable triggers (time, batch size)',
        'Handles batching and compression',
        'Minimal management required'
      ]
    },
    {
      title: 'BigQuery Streaming Buffer',
      icon: '📊',
      color: colors.blue,
      items: [
        'Ingests streaming data',
        'Auto-reserialized to columnar storage',
        'Query both streaming buffer and object data',
        'Nearly real-time view of tables'
      ]
    }
  ]}
/>

**Benefits:**

- **Unified Source:** Single source for real-time and batch analytics
- **Cost Efficient:** Object storage cheap for long-term retention
- **Flexibility:** Different consumers can process data differently
- **Consistency:** All consumers see the same data

---

## 5. Big Ideas and Trends in Storage

In this section, we'll discuss some big ideas in storage - key considerations that you need to keep in mind as you build out your storage architecture.

### 5.1. Data Catalog

**In plain English:** A data catalog is like a library's card catalog system - it's a centralized place to search for, discover, and understand all the data across your organization. Unlike a physical card catalog, it can automatically scan systems and provide social features for collaboration.

**In technical terms:** A data catalog is a centralized metadata store for all data across an organization. Data catalogs typically work across operational and analytics data sources, integrate data lineage and presentation of data relationships, and allow user editing of data descriptions.

**Why it matters:** Data catalogs make metadata easily available to systems and enable data discovery for users. As a data engineer, you'll likely be responsible for setting up and maintaining the various data integrations with the catalog.

<DiagramContainer title="Data Catalog Architecture">
  <StackDiagram
    layers={[
      {
        label: 'Data Portal & Social Layer',
        description: 'Web interface, search, Wiki functionality',
        color: colors.purple
      },
      {
        label: 'Catalog Core',
        description: 'Centralized metadata store, lineage tracking',
        color: colors.blue
      },
      {
        label: 'Integration Layer',
        description: 'APIs, automated scanning, application integration',
        color: colors.green
      },
      {
        label: 'Data Sources',
        description: 'Data lakes, warehouses, databases, pipelines',
        color: colors.orange
      }
    ]}
  />
</DiagramContainer>

**Three Main Components:**

<CardGrid
  columns={3}
  cards={[
    {
      title: 'Application Integration',
      icon: '🔌',
      color: colors.blue,
      items: [
        'Data apps integrate with catalog APIs',
        'Handle metadata updates directly',
        'Ideal as catalogs become widely used',
        'Programmatic access'
      ]
    },
    {
      title: 'Automated Scanning',
      icon: '🔍',
      color: colors.purple,
      items: [
        'Collects metadata from various systems',
        'Scans data lakes, warehouses, databases',
        'Infers metadata (keys, sensitive data)',
        'Continuous discovery'
      ]
    },
    {
      title: 'Data Portal & Social Layer',
      icon: '🌐',
      color: colors.green,
      items: [
        'Web interface for searching',
        'View data relationships',
        'Wiki functionality',
        'User collaboration'
      ]
    }
  ]}
/>

**Use Cases:**

<CardGrid
  columns={2}
  cards={[
    {
      title: 'Technical Use Cases',
      icon: '⚙️',
      color: colors.blue,
      items: [
        'Make metadata available to systems',
        'Enable table discoverability (lakehouse)',
        'Support data lineage tracking',
        'Automate data governance'
      ]
    },
    {
      title: 'Organizational Use Cases',
      icon: '👥',
      color: colors.purple,
      items: [
        'Enable business users to find data',
        'Help analysts discover datasets',
        'Support data scientists',
        'Streamline cross-org collaboration'
      ]
    }
  ]}
/>

### 5.2. Data Sharing

**In plain English:** Data sharing is like having a secure dropbox where you can share specific files with specific people, controlling exactly what they can see and do. It works across teams and even between different companies.

**In technical terms:** Data sharing allows organizations and individuals to share specific data and carefully defined permissions with specific entities. A cloud multitenant environment makes interorganizational collaboration much easier but also presents new security challenges.

**Why it matters:** Data sharing facilitates collaboration within organizations (data scientists sharing sandbox data) and across organizations (ad tech company sharing data with customers). However, organizations must carefully control policies to prevent accidental exposure or deliberate exfiltration.

<DiagramContainer title="Data Sharing Scenarios">
  <Row gap="lg">
    <Column gap="sm" align="center">
      <Box color={colors.blue} icon="🏢" size="lg">
        Internal Sharing
      </Box>
      <Box color={colors.slate} variant="subtle">
        Within organization
      </Box>
      <Column gap="xs">
        <Box color={colors.blue} variant="outlined" size="sm">Data scientists share sandbox data</Box>
        <Box color={colors.blue} variant="outlined" size="sm">Teams share datasets</Box>
        <Box color={colors.blue} variant="outlined" size="sm">Analysts access curated data</Box>
      </Column>
    </Column>
    <Column gap="sm" align="center">
      <Box color={colors.purple} icon="🤝" size="lg">
        External Sharing
      </Box>
      <Box color={colors.slate} variant="subtle">
        Across organizations
      </Box>
      <Column gap="xs">
        <Box color={colors.purple} variant="outlined" size="sm">Ad tech shares with customers</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Partners collaborate</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Vendors provide data products</Box>
      </Column>
    </Column>
  </Row>
</DiagramContainer>

**Key Considerations:**

<CardGrid
  columns={2}
  cards={[
    {
      title: 'Security Challenges',
      icon: '🔒',
      color: colors.red,
      items: [
        'Careful policy control required',
        'Prevent accidental exposure',
        'Monitor for exfiltration',
        'Audit access patterns'
      ]
    },
    {
      title: 'Benefits',
      icon: '✅',
      color: colors.green,
      items: [
        'Easier collaboration',
        'Cloud multitenant advantages',
        'No data duplication',
        'Real-time access'
      ]
    }
  ]}
/>

:::warning
Organizations must carefully control policies that govern who can share data with whom to prevent accidental exposure or deliberate exfiltration.
:::

### 5.3. Schema

**In plain English:** Schema is like the instruction manual for your data - it tells you what to expect, how things are organized, and how to read the information correctly. You can enforce the schema when data is written (strict) or figure it out when data is read (flexible).

**In technical terms:** Schema information explains the expected form of the data, file format (structured, semistructured, or unstructured), data types, and how data fits into a larger hierarchy. Schema can function as a Rosetta stone, instructions that tell us how to read the data.

**Why it matters:** Two major schema patterns exist - schema on write and schema on read. Understanding the trade-offs helps you choose the right approach for your use case.

<ComparisonTable
  beforeTitle="Schema on Write"
  afterTitle="Schema on Read"
  beforeColor={colors.blue}
  afterColor={colors.purple}
  items={[
    {
      label: "When Applied",
      before: "Schema enforced during data write",
      after: "Schema determined during data read"
    },
    {
      label: "Flexibility",
      before: "Rigid - data must conform to schema",
      after: "Flexible - any data can be written"
    },
    {
      label: "Data Quality",
      before: "High - enforced standards",
      after: "Variable - depends on reader"
    },
    {
      label: "Write Performance",
      before: "Slower - validation overhead",
      after: "Faster - no validation"
    },
    {
      label: "Read Performance",
      before: "Faster - known structure",
      after: "Slower - schema inference needed"
    },
    {
      label: "Best For",
      before: "Data warehouses, consistent data",
      after: "Data lakes, exploratory analysis"
    },
    {
      label: "Example",
      before: "Traditional RDBMS tables",
      after: "JSON/Parquet files in object storage"
    }
  ]}
/>

**Schema on Write:**

<CardGrid
  columns={2}
  cards={[
    {
      title: 'Advantages',
      icon: '✅',
      color: colors.green,
      items: [
        'Enforces data standards',
        'Data easier to consume',
        'Easier to utilize in future',
        'Catches errors early'
      ]
    },
    {
      title: 'Implementation',
      icon: '⚙️',
      color: colors.blue,
      items: [
        'Traditional data warehouse pattern',
        'Table has integrated schema',
        'Writes must conform',
        'Data lake needs schema metastore'
      ]
    }
  ]}
/>

**Schema on Read:**

<CardGrid
  columns={2}
  cards={[
    {
      title: 'Advantages',
      icon: '✅',
      color: colors.green,
      items: [
        'Emphasizes flexibility',
        'Virtually any data can be written',
        'Good for exploratory analysis',
        'Accommodates schema evolution'
      ]
    },
    {
      title: 'Best Practices',
      icon: '📋',
      color: colors.purple,
      items: [
        'Use formats with built-in schema (Parquet, JSON)',
        'Avoid CSV (notorious for inconsistency)',
        'Document schema separately',
        'Greater difficulty consuming later'
      ]
    }
  ]}
/>

> **Insight**
>
> Note that schema need not be relational. For images stored in a data lake, schema information might explain the image format, resolution, and the way the images fit into a larger hierarchy. Data becomes more useful when we have as much information about its structure and organization.

### 5.4. Separation of Compute from Storage

**In plain English:** Separation of compute from storage is like having a library where the books (storage) stay in one building, but you can rent reading rooms (compute) in different buildings only when you need them. You pay for the books all the time but only pay for reading rooms when you use them.

**In technical terms:** This has emerged as a standard data access and query pattern in today's cloud era. Data lakes store data in object stores and spin up temporary compute capacity to read and process it. Most fully managed OLAP products now rely on object storage behind the scenes.

**Why it matters:** Separation enables ephemerality (spin up massive clusters, then delete when done), improves data durability and availability (multi-zone object storage), and optimizes costs (pay only for compute when processing).

#### Colocation of Compute and Storage

**In plain English:** Colocation is like having the library and reading rooms in the same building - faster to access books, but you're paying for the entire building 24/7 even when no one is reading.

**In technical terms:** Colocation has long been a standard method to improve database performance. For transactional databases, data colocation allows fast, low-latency disk reads and high bandwidth.

<DiagramContainer title="HDFS Colocation Example">
  <Column gap="md">
    <Box color={colors.blue} variant="filled" icon="📁">
      HDFS NameNode
    </Box>
    <Arrow direction="down" label="Locates data blocks" />
    <Row gap="sm">
      <Column gap="xs">
        <Box color={colors.green} icon="💾">DataNode 1</Box>
        <Box color={colors.orange} variant="outlined" size="sm">Data blocks</Box>
        <Box color={colors.purple} variant="outlined" size="sm">MapReduce job</Box>
      </Column>
      <Column gap="xs">
        <Box color={colors.green} icon="💾">DataNode 2</Box>
        <Box color={colors.orange} variant="outlined" size="sm">Data blocks</Box>
        <Box color={colors.purple} variant="outlined" size="sm">MapReduce job</Box>
      </Column>
      <Column gap="xs">
        <Box color={colors.green} icon="💾">DataNode 3</Box>
        <Box color={colors.orange} variant="outlined" size="sm">Data blocks</Box>
        <Box color={colors.purple} variant="outlined" size="sm">MapReduce job</Box>
      </Column>
    </Row>
    <Box color={colors.blue} variant="subtle">
      Processing happens where data is stored - fast but inflexible
    </Box>
  </Column>
</DiagramContainer>

#### Separation of Compute and Storage

**Motivations:**

<CardGrid
  columns={2}
  cards={[
    {
      title: 'Ephemerality and Scalability',
      icon: '🔄',
      color: colors.blue,
      items: [
        'Cheaper to rent when workloads vary',
        'Spin up massive clusters for jobs',
        'Delete when done',
        'Pay-as-you-go efficiency'
      ]
    },
    {
      title: 'Data Durability and Availability',
      icon: '🛡️',
      color: colors.green,
      items: [
        'Cloud object stores replicate across zones',
        'Disaster doesn\'t destroy data',
        'High uptime (availability)',
        'Spin up in different zones if needed'
      ]
    },
    {
      title: 'Cost Optimization',
      icon: '💰',
      color: colors.orange,
      items: [
        'Pay only for compute when processing',
        'Storage costs minimal',
        'Scale storage and compute independently',
        'Optimize for actual needs'
      ]
    },
    {
      title: 'Independent Scaling',
      icon: '📈',
      color: colors.purple,
      items: [
        'Scale storage without compute',
        'Scale compute without storage',
        'Not locked to fixed ratios',
        'Ultra-high scale temporarily'
      ]
    }
  ]}
/>

#### Hybrid Separation and Colocation

**In plain English:** In practice, we constantly mix both approaches - like having a library with both on-site books (fast access) and off-site storage (cheap capacity). We move books between them as needed.

**In technical terms:** We constantly hybridize colocation and separation to realize the benefits of both approaches. This is typically done through multitier caching and hybrid object storage.

**Examples:**

<CardGrid
  columns={2}
  cards={[
    {
      title: 'AWS EMR with S3 and HDFS',
      icon: '☁️',
      color: colors.orange,
      items: [
        'Spin up temporary HDFS on SSD',
        'Pull data from S3',
        'Store intermediate results on HDFS',
        'Write final results to S3'
      ]
    },
    {
      title: 'Apache Spark',
      icon: '⚡',
      color: colors.blue,
      items: [
        'Runs on ephemeral HDFS',
        'Relies heavily on in-memory data',
        'Improves processing performance',
        'Rents large quantities of memory'
      ]
    },
    {
      title: 'Apache Druid',
      icon: '🚀',
      color: colors.purple,
      items: [
        'Keeps one copy on SSDs for performance',
        'Uses object store as durability layer',
        'Can recover from node failures',
        'Balances cost and performance'
      ]
    },
    {
      title: 'Hybrid Object Storage',
      icon: '🔄',
      color: colors.green,
      items: [
        'BigQuery\'s Colossus colocates data',
        'S3 Select filters in S3 clusters',
        'Before network transmission',
        'Low-level hardware optimization'
      ]
    }
  ]}
/>

> **Insight**
>
> The concept of hybrid object storage underscores that there can still be advantages to having low-level access to hardware rather than relying on someone else's public cloud. While we're seeing a mass migration to public clouds, many hyper-scale data service vendors may build their data centers in the future, albeit with deep network integration into public clouds.

### 5.5. Zero-copy Cloning

**In plain English:** Zero-copy cloning is like creating a new folder that points to the same files instead of copying all the files. It's instant and uses no extra space, but you need to be careful - if you delete the original files, your "copy" disappears too.

**In technical terms:** Cloud-based systems based around object storage support zero-copy cloning. This typically means that a new virtual copy of an object is created (e.g., a new table) without necessarily physically copying the underlying data. New pointers are created to the raw data files, and future changes to these tables will not be recorded in the old table.

**Why it matters:** Zero-copy cloning is extremely fast and cost-effective for creating table copies, snapshots, or dev/test environments. However, engineers must understand its strengths and limitations to avoid data loss.

<DiagramContainer title="Zero-Copy Cloning">
  <Column gap="md">
    <Box color={colors.blue} variant="filled">
      Original Table
    </Box>
    <Arrow direction="down" label="Points to" />
    <Row gap="sm">
      <Box color={colors.green} variant="outlined" size="sm">file1.parquet</Box>
      <Box color={colors.green} variant="outlined" size="sm">file2.parquet</Box>
      <Box color={colors.green} variant="outlined" size="sm">file3.parquet</Box>
    </Row>
    <Arrow direction="down" label="Zero-copy clone (instant)" />
    <Box color={colors.purple} variant="filled">
      Cloned Table
    </Box>
    <Arrow direction="down" label="Also points to" />
    <Row gap="sm">
      <Box color={colors.green} variant="outlined" size="sm">file1.parquet</Box>
      <Box color={colors.green} variant="outlined" size="sm">file2.parquet</Box>
      <Box color={colors.green} variant="outlined" size="sm">file3.parquet</Box>
    </Row>
    <Box color={colors.orange} variant="subtle">
      Same underlying files - no data copied! Future changes create new files.
    </Box>
  </Column>
</DiagramContainer>

**Benefits:**

<CardGrid
  columns={3}
  cards={[
    {
      title: 'Speed',
      icon: '⚡',
      color: colors.green,
      items: [
        'Instantaneous operation',
        'No data copying required',
        'Create dev/test environments quickly',
        'Snapshot tables instantly'
      ]
    },
    {
      title: 'Cost',
      icon: '💰',
      color: colors.blue,
      items: [
        'No extra storage costs initially',
        'Only pay for new data changes',
        'Efficient use of storage',
        'Cost-effective backups'
      ]
    },
    {
      title: 'Use Cases',
      icon: '🎯',
      color: colors.purple,
      items: [
        'Dev/test environments',
        'Table snapshots',
        'Time travel',
        'Quick backups'
      ]
    }
  ]}
/>

:::warning Important
Zero-copy cloning is a compelling feature, but engineers must understand its strengths and limitations:

**For fully managed systems (Snowflake, BigQuery):**
- Understand the exact limits of shallow copying
- System manages underlying files safely
- Less risk of data loss

**For data lake systems (Databricks):**
- Engineers have more access to underlying object storage
- A blessing and a curse
- **Exercise great caution before deleting any raw files**
- Deleting files in the original object might wipe out the new object

**Alternatives:**
- Some systems support deep copying (all data copied)
- More expensive but more robust
- Consider based on your risk tolerance
:::

### 5.6. Data Storage Lifecycle and Data Retention

**In plain English:** Data storage lifecycle is like organizing your closet - frequently worn clothes go in easy-to-reach places (hot storage), seasonal items go on higher shelves (warm storage), and old keepsakes go in the attic (cold storage). Data retention is deciding what to keep and what to throw away.

**In technical terms:** The data storage lifecycle considers access frequency and use cases. Data retention determines how long to keep data based on value, time, compliance requirements, and cost.

**Why it matters:** Proper lifecycle management dramatically reduces storage costs while maintaining performance. Understanding hot, warm, and cold data helps you optimize your storage strategy.

#### Hot, Warm, and Cold Data

<DiagramContainer title="Data Temperature Tiers">
  <CardGrid
    columns={3}
    cards={[
      {
        title: 'Hot Data',
        icon: '🔥',
        color: colors.red,
        items: [
          'Instant access requirements',
          'SSD or memory storage',
          'Most expensive storage',
          'Cheap retrieval',
          'Examples: product pages, real-time dashboards'
        ]
      },
      {
        title: 'Warm Data',
        icon: '🌤️',
        color: colors.orange,
        items: [
          'Semi-regular access (monthly)',
          'Standard object storage tiers',
          'Moderate storage cost',
          'Moderate retrieval cost',
          'Examples: monthly reports, recent logs'
        ]
      },
      {
        title: 'Cold Data',
        icon: '❄️',
        color: colors.blue,
        items: [
          'Infrequent access',
          'HDD, tape, cloud archive',
          'Cheapest storage',
          'Expensive retrieval',
          'Examples: compliance archives, backups'
        ]
      }
    ]}
  />
</DiagramContainer>

**Query Results Cache (Hot Data Example):**

<DiagramContainer title="Query Results Cache">
  <ProcessFlow
    direction="horizontal"
    steps={[
      {
        title: "First Query",
        description: "Run query, persist results in cache",
        icon: "🔍",
        color: colors.blue
      },
      {
        title: "Cache Hit",
        description: "Same query returns cached results",
        icon: "⚡",
        color: colors.green
      },
      {
        title: "Performance",
        description: "Much faster vs. rerunning query",
        icon: "📈",
        color: colors.purple
      }
    ]}
  />
</DiagramContainer>

**Storage Tier Considerations:**

<ComparisonTable
  beforeTitle="All Hot Storage"
  afterTitle="Tiered Storage"
  beforeColor={colors.red}
  afterColor={colors.green}
  items={[
    {
      label: "Access Speed",
      before: "All data accessed quickly",
      after: "Hot data fast, cold data slower"
    },
    {
      label: "Storage Cost",
      before: "Extremely expensive",
      after: "Optimized based on access patterns"
    },
    {
      label: "Retrieval Cost",
      before: "Low",
      after: "Varies by tier"
    },
    {
      label: "Management",
      before: "Simple",
      after: "Requires lifecycle policies"
    },
    {
      label: "Best For",
      before: "Unlimited budget, all data active",
      after: "Real-world scenarios"
    }
  ]}
/>

**Cloud Storage Tiers Examples:**

<CardGrid
  columns={3}
  cards={[
    {
      title: 'AWS S3',
      icon: '☁️',
      color: colors.orange,
      items: [
        'Standard',
        'Infrequent Access (IA)',
        'One Zone-IA',
        'Glacier (archival)',
        'Glacier Deep Archive'
      ]
    },
    {
      title: 'Azure',
      icon: '☁️',
      color: colors.blue,
      items: [
        'Hot',
        'Cool',
        'Archive',
        'Automatic tiering',
        'Lifecycle management'
      ]
    },
    {
      title: 'Google Cloud',
      icon: '☁️',
      color: colors.green,
      items: [
        'Standard',
        'Nearline',
        'Coldline',
        'Archive',
        'Autoclass'
      ]
    }
  ]}
/>

:::tip Storage Tier Best Practices
**Create automated lifecycle policies for your data:**
- Move data to infrequent access tier if accessed only monthly
- Move 180+ day old data to archival tier if not accessed
- Automate migration away from regular object storage
- Drastically reduce your storage costs

**BUT consider retrieval costs:**
- Both in time and money
- Access and retrieval times vary by provider
- Some make it cheap to migrate in, costly/slow to retrieve
- Monitor actual access patterns
:::

#### Data Retention

**In plain English:** Data retention is deciding what to keep and for how long. In the early days of "big data," everyone hoarded data "just in case." This created data swamps and regulatory nightmares. Now we need thoughtful retention policies.

**In technical terms:** Data retention determines what data you need to keep and how long to keep it, based on value, time, compliance requirements, and cost.

<DiagramContainer title="Data Retention Considerations">
  <CardGrid
    columns={2}
    cards={[
      {
        title: 'Value',
        icon: '💎',
        color: colors.blue,
        items: [
          'Data is an asset - know its value',
          'Is it irreplaceable or easily recreated?',
          'What\'s the impact if available vs not?',
          'Subjective, depends on use case'
        ]
      },
      {
        title: 'Time',
        icon: '⏰',
        color: colors.purple,
        items: [
          'New data typically more valuable',
          'Set time to live (TTL) for hot storage',
          'Move to warm/cold based on age',
          'Prevent hot storage from becoming full'
        ]
      },
      {
        title: 'Compliance',
        icon: '📜',
        color: colors.orange,
        items: [
          'HIPAA, PCI may require retention periods',
          'GDPR may require deletion within timeframes',
          'Need searchable storage and archival process',
          'Balance compliance against cost'
        ]
      },
      {
        title: 'Cost',
        icon: '💰',
        color: colors.green,
        items: [
          'Data should have positive ROI',
          'Implement lifecycle management',
          'Archive or delete past retention dates',
          'Storage has ongoing costs'
        ]
      }
    ]}
  />
</DiagramContainer>

**Spillover Management:**

> **Insight**
>
> Data engineers need to account for spillover from hot to warm/cold storage. Memory is expensive and finite. For example, if hot data is stored in memory, it can be spilled to disk when there's too much new data to store and not enough memory. Some databases may move infrequently accessed data to warm or cold tiers automatically.

### 5.7. Single-Tenant Versus Multitenant Storage

**In plain English:** Single-tenant is like having your own house. Multitenant is like living in an apartment building where everyone shares infrastructure but has private, isolated spaces.

**In technical terms:** With single-tenant architecture, each group of tenants (users, accounts, customers) gets its own dedicated storage. Multitenant architecture inverts this and shares resources among groups of users.

**Why it matters:** The choice affects schema design, query patterns, security, and costs. You need to be aware of querying both single and multitenant storage.

<DiagramContainer title="Single-Tenant vs Multitenant Storage">
  <Row gap="lg">
    <Column gap="sm" align="center">
      <Box color={colors.blue} variant="filled" size="lg" icon="🏠">
        Single-Tenant Storage
      </Box>
      <Box color={colors.slate} variant="subtle">
        Each tenant gets dedicated storage
      </Box>
      <Column gap="xs">
        <Box color={colors.purple} variant="outlined" size="sm">Tenant A Database</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Tenant B Database</Box>
        <Box color={colors.purple} variant="outlined" size="sm">Tenant C Database</Box>
      </Column>
      <Box color={colors.blue} variant="subtle" size="sm">
        Isolated schemas, independent evolution
      </Box>
    </Column>
    <Column gap="sm" align="center">
      <Box color={colors.green} variant="filled" size="lg" icon="🏢">
        Multitenant Storage
      </Box>
      <Box color={colors.slate} variant="subtle">
        Multiple tenants in shared storage
      </Box>
      <Column gap="xs">
        <Box color={colors.orange} variant="outlined" size="sm">Shared Database</Box>
        <Box color={colors.slate} variant="subtle" size="sm">All Tenants: A, B, C, D</Box>
      </Column>
      <Box color={colors.green} variant="subtle" size="sm">
        Uniform schemas, efficient resource use
      </Box>
    </Column>
  </Row>
</DiagramContainer>

**Single-Tenant Storage:**

<CardGrid
  columns={2}
  cards={[
    {
      title: 'Advantages',
      icon: '✅',
      color: colors.green,
      items: [
        'Total data isolation',
        'Independent schemas',
        'Can evolve separately',
        'Clear security boundaries'
      ]
    },
    {
      title: 'Challenges',
      icon: '⚠️',
      color: colors.red,
      items: [
        'More storage resources required',
        'Schema variation across tenants',
        'Difficult to create unified views',
        'Higher management overhead'
      ]
    }
  ]}
/>

**Multitenant Storage:**

<CardGrid
  columns={2}
  cards={[
    {
      title: 'Advantages',
      icon: '✅',
      color: colors.green,
      items: [
        'Efficient resource use',
        'Uniform schemas',
        'Easier to query across tenants',
        'Lower management overhead'
      ]
    },
    {
      title: 'Challenges',
      icon: '⚠️',
      color: colors.red,
      items: [
        'Must prevent data leakage',
        'Noisy neighbor issues',
        'Row-level security required',
        'Careful isolation design'
      ]
    }
  ]}
/>

**Key Considerations:**

<CardGrid
  columns={2}
  cards={[
    {
      title: 'Performance',
      icon: '⚡',
      color: colors.blue,
      items: [
        'Noisy neighbor problem?',
        'Will high usage from one tenant degrade others?',
        'Consistent performance for all?',
        'Resource isolation strategies'
      ]
    },
    {
      title: 'Security',
      icon: '🔒',
      color: colors.purple,
      items: [
        'Data must be properly isolated',
        'Tenants shouldn\'t be aware of each other',
        'Prevent data leakage',
        'Use views or row-level security'
      ]
    }
  ]}
/>

---

## 6. Summary

You've learned about storage at three levels - raw ingredients, storage systems, and storage abstractions - and how they form the cornerstone of the data engineering lifecycle.

### Key Takeaways

1. **Raw Ingredients Matter** - Understanding HDDs, SSDs, RAM, serialization, compression, and caching helps you make informed trade-offs between cost, performance, and durability

2. **Storage Systems Build on Ingredients** - File storage, block storage, object storage, and distributed systems each have specific use cases. Object storage has become the foundation of modern data architecture

3. **Abstractions Organize Systems** - Data warehouses, data lakes, and lakehouses represent different organizational patterns. Lines are blurring as cloud platforms converge capabilities

4. **Consistency Is Critical** - Understand eventual vs strong consistency in distributed systems. Make conscious decisions about consistency requirements based on use cases

5. **Separation of Compute from Storage** - This trend enables ephemerality, scalability, and cost optimization. Most systems hybridize separation and colocation for best performance

6. **Lifecycle Management Reduces Costs** - Hot, warm, and cold data tiers dramatically reduce storage costs. Implement automated lifecycle policies based on access patterns

7. **Data Retention Requires Thoughtfulness** - Consider value, time, compliance, and cost. Avoid data hoarding that creates swamps and compliance nightmares

8. **Schema Patterns Have Trade-offs** - Schema on write enforces standards. Schema on read provides flexibility. Choose based on your data quality and discovery needs

9. **Modern Tools Enable New Patterns** - Data catalogs, data sharing, zero-copy cloning, and lakehouses represent evolution in how we organize and access data

> **Insight**
>
> Gain deep knowledge of the inner workings and limitations of the storage systems you'll use. Know the types of data, activities, and workloads appropriate for your storage. Storage is everywhere and underlays many stages of the data engineering lifecycle.

**Additional Resources:**
- "Column-Oriented DBMS" Wikipedia page
- "The Design and Implementation of Modern Column-Oriented Database Systems" by Daniel Abadi et al.
- *Designing Data-Intensive Applications* by Martin Kleppmann (O'Reilly)
- "Diving Into Delta Lake: Schema Enforcement and Evolution" by Burak Yavuz et al.
- "Hot Data vs. Cold Data: Why It Matters" by Afzaal Ahmad Zeeshan
- "What Is Object Storage? A Definition and Overview" by Alex Chan
- "The What, When, Why, and How of Incremental Loads" by Tim Mitchell

---

**Previous:** [Chapter 5: Data Generation in Source Systems](./chapter5) | **Next:** [Chapter 7: Ingestion](./chapter7)
