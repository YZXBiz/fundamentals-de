---
sidebar_position: 5
title: Chapter 4 - Choosing Technologies Across the Data Engineering Lifecycle
description: Learn how to evaluate and select the right data technologies for your organization, from cloud platforms to build vs. buy decisions and managing technical debt.
---

# Chapter 4: Choosing Technologies Across the Data Engineering Lifecycle

Data engineering nowadays suffers from an embarrassment of riches. We have no shortage of technologies to solve various types of data problems. However, it's easy to get caught up in chasing bleeding-edge technology while losing sight of the core purpose of data engineering: designing robust and reliable systems to carry data through the full lifecycle and serve it according to the needs of end users.

## Table of Contents

1. [Architecture First, Technology Second](#architecture-first-technology-second)
2. [Team Size and Capabilities](#team-size-and-capabilities)
3. [Speed to Market](#speed-to-market)
4. [Interoperability](#interoperability)
5. [Cost Optimization and Business Value](#cost-optimization-and-business-value)
6. [Today Versus the Future](#today-versus-the-future-immutable-versus-transitory-technologies)
7. [Location](#location)
8. [Build Versus Buy](#build-versus-buy)
9. [Monolith Versus Modular](#monolith-versus-modular)
10. [Serverless Versus Servers](#serverless-versus-servers)
11. [Optimization, Performance, and the Benchmark Wars](#optimization-performance-and-the-benchmark-wars)
12. [Undercurrents and Their Impacts](#undercurrents-and-their-impacts-on-choosing-technologies)
13. [Conclusion](#conclusion)

## Architecture First, Technology Second

Chapter 3 discussed "good" data architecture and why it matters. We now explain how to choose the right technologies to serve this architecture. Data engineers must choose good technologies to make the best possible data product. We feel the criteria to choose a good data technology is simple: does it add value to a data product and the broader business?

A lot of people confuse architecture and tools. Architecture is strategic; tools are tactical. We sometimes hear, "Our data architecture are tools X, Y, and Z." This is the wrong way to think about architecture.

**Architecture is the what, why, and when. Tools are the how.**

We often see teams going "off the rails" and choosing technologies before mapping out an architecture. The reasons vary: shiny object syndrome, resume-driven development, and a lack of expertise in architecture. We strongly advise against choosing technology before getting your architecture right.

This chapter discusses our tactical plan for making technology choices once we have a strategic architecture blueprint.

## Team Size and Capabilities

The first thing you need to assess is your team's size and its capabilities with technology. Are you on a small team (perhaps a team of one) of people who are expected to wear many hats, or is the team large enough that people work in specialized roles?

Your team's size will influence the types of technologies you adopt. There is a continuum of simple to complex technologies, and a team's size roughly determines the amount of bandwidth your team can dedicate to complex solutions.

We sometimes see small data teams read blog posts about a new cutting-edge technology at a giant tech company and then try to emulate these same extremely complex technologies and practices. We call this **cargo-cult engineering**, and it's generally a big mistake that consumes valuable time and money, often with little to nothing to show in return.

:::tip
Especially for small teams or teams with weaker technical chops, use as many managed and SaaS tools as possible, and dedicate your limited bandwidth to solving the complex problems that directly add value to the business.
:::

Take an inventory of your team's skills. Do people lean toward low-code tools, or do they favor code-first approaches? Are people strong in certain languages like Java, Python, or Go?

We suggest sticking with technologies and workflows with which the team is familiar. We've seen data teams invest a lot of time in learning the shiny new data technology, language, or tool, only to never use it in production.

## Speed to Market

In technology, **speed to market wins**. This means choosing the right technologies that help you deliver features and data faster while maintaining high-quality standards and security. It also means working in a tight feedback loop of launching, learning, iterating, and making improvements.

Perfect is the enemy of good. Some data teams will deliberate on technology choices for months or years without reaching any decisions. Slow decisions and output are the kiss of death to data teams.

**Deliver value early and often.** Use what works. Your team members will likely get better leverage with tools they already know. Avoid undifferentiated heavy lifting that engages your team in unnecessarily complex work that adds little to no value.

Choose tools that help you move quickly, reliably, safely, and securely.

## Interoperability

Rarely will you use only one technology or system. When choosing a technology or system, you'll need to ensure that it interacts and operates with other technologies. **Interoperability** describes how various technologies or systems connect, exchange information, and interact.

Let's say you're evaluating two technologies, A and B. How easily does technology A integrate with technology B? This is often a spectrum of difficulty, ranging from seamless to time-intensive.

Often, vendors and open source projects will target specific platforms and systems to interoperate. Most data ingestion and visualization tools have built-in integrations with popular data warehouses and data lakes.

Sometimes standards are in place for interoperability. Almost all databases allow connections via JDBC (Java Database Connectivity) or ODBC (Open Database Connectivity). In other cases, interoperability occurs in the absence of standards—REST is not truly a standard for APIs; every REST API has its quirks.

Always be aware of how simple it will be to connect your various technologies across the data engineering lifecycle. Design for modularity and give yourself the ability to easily swap out technologies as new practices and alternatives become available.

## Cost Optimization and Business Value

In a perfect world, you'd get to experiment with all the latest, coolest technologies without considering cost, time investment, or value added to the business. In reality, budgets and time are finite, and cost is a major constraint.

Your organization expects a positive ROI from your data projects, so you must understand the basic costs you can control. Technology is a major cost driver, so your technology choices and management strategies will significantly impact your budget.

We look at costs through three main lenses: total cost of ownership, opportunity cost, and FinOps.

### Total Cost of Ownership

**Total cost of ownership (TCO)** is the total estimated cost of an initiative, including the direct and indirect costs of products and services utilized.

Direct costs can be directly attributed to an initiative (e.g., salaries, AWS bills). Indirect costs (overhead) are independent of the initiative and must be paid regardless.

Apart from direct and indirect costs, how something is purchased impacts how costs are accounted for:

**Capital expenses (capex)**: Require an up-front investment. Before the cloud existed, companies would typically purchase hardware and software up front through large acquisition contracts. These up-front investments would be treated as assets and slowly depreciate over time.

**Operational expenses (opex)**: Gradual and spread out over time. Whereas capex is long-term focused, opex is short-term. Opex can be pay-as-you-go and allows a lot of flexibility.

Until recently, opex wasn't an option for large data projects. This has changed with the advent of the cloud, as data platform services allow engineers to pay on a consumption-based model.

:::tip
Given the upside for flexibility and low initial costs, we urge data engineers to take an opex-first approach centered on the cloud and flexible, pay-as-you-go technologies.
:::

### Total Opportunity Cost of Ownership

**Total opportunity cost of ownership (TOCO)** is the cost of lost opportunities that we incur in choosing a technology, an architecture, or a process.

If you choose data stack A, you've chosen the benefits of data stack A over all other options, effectively excluding data stacks B, C, and D. What happens if data stack A was a poor choice? What happens when data stack A becomes obsolete? Can you still move to other data stacks?

How quickly and cheaply can you move to something newer and better? This is a critical question in the data space, where new technologies and products seem to appear at an ever-faster rate.

The first step to minimizing opportunity cost is evaluating it with eyes wide open. Inflexible data technologies are a lot like bear traps—they're easy to get into and extremely painful to escape.

### FinOps

We already touched on FinOps in Chapter 3. As we've discussed, typical cloud spending is inherently opex: companies pay for services to run critical data processes. The goal of FinOps is to fully operationalize financial accountability and business value.

> If it seems that FinOps is about saving money, then think again. FinOps is about making money. Cloud spend can drive more revenue, signal customer base growth, enable more product and feature release velocity, or even help shut down a data center.

In our setting of data engineering, the ability to iterate quickly and scale dynamically is invaluable for creating business value. This is one of the major motivations for shifting data workloads to the cloud.

## Today Versus the Future: Immutable Versus Transitory Technologies

In an exciting domain like data engineering, it's all too easy to focus on a rapidly evolving future while ignoring the concrete needs of the present. Tooling chosen for the future may be stale and out-of-date when this future arrives.

Focus on the present. You should choose the best technology for the moment and near future, but in a way that supports future unknowns and evolution. Ask yourself: where are you today, and what are your goals for the future?

We have two classes of tools to consider: **immutable** and **transitory**.

**Immutable technologies** might be components that underpin the cloud or languages and paradigms that have stood the test of time. Examples include:
- Object storage (S3, Azure Blob Storage)
- Networking and servers
- SQL and bash
- Security fundamentals

Immutable technologies benefit from the **Lindy effect**: the longer a technology has been established, the longer it will be used.

**Transitory technologies** are those that come and go. The typical trajectory begins with a lot of hype, followed by meteoric growth in popularity, then a slow descent into obscurity.

New well-funded entrants and open source projects arrive on the data front every day. Most of these companies and projects don't get long-term traction and fade slowly into obscurity.

### Our Advice

Given the rapid pace of tooling and best-practice changes, we suggest **evaluating tools every two years**. Whenever possible, find the immutable technologies along the data engineering lifecycle, and use those as your base. Build transitory tools around the immutables.

Given the reasonable probability of failure for many data technologies, you need to consider how easy it is to transition from a chosen technology. What are the barriers to leaving? Avoid "bear traps." Go into a new technology with eyes wide open.

## Location

Companies now have numerous options when deciding where to run their technology stacks. A slow shift toward the cloud culminates in a veritable stampede of companies spinning up workloads on AWS, Azure, and Google Cloud Platform (GCP).

Let's look at the principal places to run your technology stack: on premises, the cloud, hybrid cloud, and multicloud.

### On Premises

While new startups are increasingly born in the cloud, on-premises systems are still the default for established companies. Companies own their hardware, which may live in data centers they own or in leased colocation space.

Companies are operationally responsible for their hardware and the software that runs on it. If hardware fails, they have to repair or replace it. They must ensure that they have enough hardware to handle peaks.

Established companies see their younger, more agile competition scaling rapidly and taking advantage of cloud-managed services. Companies in competitive sectors generally don't have the option to stand still.

### Cloud

The cloud flips the on-premises model on its head. Instead of purchasing hardware, you simply rent hardware and managed services from a cloud provider. These resources can often be reserved on an extremely short-term basis.

In a cloud environment, engineers can quickly launch projects and experiment without worrying about long lead time hardware planning. This makes the cloud model extremely appealing to startups.

The early cloud era was dominated by **infrastructure as a service (IaaS)** offerings—products such as VMs and virtual disks. Slowly, we've seen a shift toward **platform as a service (PaaS)**, while **SaaS** products continue to grow.

- **IaaS**: Essentially rented slices of hardware (VMs, virtual disks)
- **PaaS**: Adds sophisticated managed services (managed databases, streaming platforms, managed Kubernetes)
- **SaaS**: Fully functioning enterprise software platform with minimal operational management

#### A Brief Detour on Cloud Economics

To understand how to use cloud services efficiently through cloud native architecture, you need to know how clouds make money.

**Cloud ≠ On Premises**

This heading may seem like a silly tautology, but the belief that cloud services are just like familiar on-premises servers is a widespread cognitive error that plagues cloud migrations and leads to horrifying bills.

Moving on-premises servers one by one to VMs in the cloud—known as **simple lift and shift**—is a reasonable strategy for the initial phase of cloud migration. However, companies that leave their cloud assets in this initial state are in for a rude shock. Long-running servers in the cloud are significantly more expensive than their on-premises counterparts.

The key to finding value in the cloud is understanding and optimizing the cloud pricing model. Rather than deploying a set of long-running servers capable of handling full peak load, use autoscaling to allow workloads to scale down to minimal infrastructure when loads are light and up to massive clusters during peak times.

We often think of this optimization as leading to lower costs, but we should also strive to increase business value by exploiting the dynamic nature of the cloud. Data engineers can create new value by accomplishing things that were impossible in their on-premises environment.

**Data Gravity**

Vendors want to lock you into their offerings. Getting data onto the platform is cheap or free on most cloud platforms, but getting data out can be extremely expensive. Be aware of **data egress fees** and their long-term impacts on your business before getting blindsided by a large bill.

Data gravity is real: once data lands in a cloud, the cost to extract it and migrate processes can be very high.

### Hybrid Cloud

As more established businesses migrate into the cloud, the hybrid cloud model is growing in importance. Virtually no business can migrate all of its workloads overnight. The hybrid cloud model assumes that an organization will indefinitely maintain some workloads outside the cloud.

Organizations may believe that they have achieved operational excellence in certain areas. Thus, they may migrate only to specific workloads where they see immediate benefits in the cloud environment.

This pattern of putting analytics in the cloud is beautiful because data flows primarily in one direction, minimizing data egress costs. On-premises applications generate event data that can be pushed to the cloud essentially for free.

### Multicloud

**Multicloud** simply refers to deploying workloads to multiple public clouds. Companies may have several motivations for multicloud deployments:

- SaaS platforms often wish to offer services close to existing customer cloud workloads (Snowflake, Databricks)
- Take advantage of the best services across several clouds
- Each cloud has best-in-class services

A multicloud methodology has several disadvantages:
- Data egress costs and networking bottlenecks are critical
- Introduces significant complexity
- Cross-cloud integration and security present challenges
- Multicloud networking can be diabolically complicated

A new generation of "cloud of clouds" services aims to facilitate multicloud with reduced complexity. Data engineers and architects would do well to maintain awareness of this quickly changing cloud landscape.

### Decentralized: Blockchain and the Edge

Though not widely used now, it's worth briefly mentioning a new trend that might become popular: **decentralized computing**. For the moment, decentralized platforms have proven extremely popular but have not had a significant impact in the data space.

### Our Advice

From our perspective, we are still at the beginning of the transition to the cloud. The cloud itself is changing, with a shift from the IaaS model toward more managed service offerings.

**Choose technologies for the present, but look toward the future**

Right now is a tough time to plan workload placements and migrations. Because of the fast pace of competition and change in the cloud industry, the decision space will look very different in five to ten years.

We believe that it is critical to avoid this endless trap of analysis. Instead, plan for the present. Choose the best technologies for your current needs and concrete plans for the near future.

In particular, don't choose a complex multicloud or hybrid-cloud strategy unless there's a compelling reason. Choose a single-cloud deployment strategy if these scenarios don't apply to you.

On the other hand, have an escape plan. Ideally, your escape plan will remain locked behind glass, but preparing this plan will help you to make better decisions in the present and give you a way out if things go wrong.

**Cloud Repatriation Arguments**

As we wrote this book, Sarah Wang and Martin Casado published "The Cost of Cloud, A Trillion Dollar Paradox," an article that generated significant sound and fury in the tech space. Readers widely interpreted the article as a call for the repatriation of cloud workloads to on-premises servers.

**You are not Dropbox, nor are you Cloudflare**

We believe that Dropbox's case study is frequently used without appropriate context. Dropbox provides particular services where ownership of hardware and data centers can offer a competitive advantage. Companies should not rely excessively on Dropbox's example.

Consider continuing to run workloads on premises or repatriating cloud workloads if you run a truly cloud-scale service. What is cloud scale? You might be at cloud scale if you are storing an exabyte of data or handling terabits per second of traffic.

## Build Versus Buy

**Build versus buy** is an age-old debate in technology. The argument for building is that you have end-to-end control over the solution. The argument supporting buying comes down to resource constraints and expertise.

If you've caught on to a theme in the book so far, it's that we suggest investing in building and customizing when doing so will provide a competitive advantage for your business. Otherwise, stand on the shoulders of giants and use what's already available in the market.

As we often ask, "When you need new tires for your car, do you get the raw materials, create the tires from scratch, and install them yourself?" The same argument applies to build versus buy.

Whenever possible, lean toward type A behavior: avoid undifferentiated heavy lifting and embrace abstraction. Use open source frameworks, or if this is too much trouble, look at buying a suitable managed or proprietary solution.

The shifting reality of how companies adopt software is worth mentioning. Whereas in the past, IT used to make most software purchase and adoption decisions in a top-down manner, these days, the trend is for bottom-up software adoption driven by developers, data engineers, and data scientists.

### Open Source Software

**Open source software (OSS)** is a software distribution model in which software, and the underlying codebase, is made available for general use, typically under specific licensing terms.

OSS has two main flavors: community managed and commercial OSS.

#### Community-managed OSS

OSS projects succeed with a strong community and vibrant user base. The following are factors to consider with a community-managed OSS project:

**Mindshare**: Avoid adopting OSS projects that don't have traction and popularity. Look at the number of GitHub stars, forks, and commit volume and recency.

**Maturity**: How long has the project been around, how active is it today, and how usable are people finding it in production?

**Troubleshooting**: How will you handle problems if they arise? Are you on your own, or can the community help you?

**Project management**: Look at Git issues and how they're addressed.

**Team**: Is a company sponsoring the OSS project? Who are the core contributors?

**Developer relations and community management**: What is the project doing to encourage uptake and adoption?

**Contributing**: Does the project encourage and accept pull requests?

**Roadmap**: Is there a project roadmap? If so, is it clear and transparent?

**Self-hosting and maintenance**: Do you have the resources to host and maintain the OSS solution?

**Giving back to the community**: If you like the project and are actively using it, consider investing in it.

#### Commercial OSS

Sometimes OSS has drawbacks—mainly, you have to host and maintain the solution in your environment. Commercial vendors try to solve this management headache by hosting and managing the OSS solution for you, typically as a cloud SaaS offering.

This model is called **commercial OSS (COSS)**. Typically, a vendor will offer the "core" of the OSS for free while charging for enhancements, curated code distributions, or fully managed services.

Examples of such vendors include:
- Databricks (Spark)
- Confluent (Kafka)
- DBT Labs (dbt)

The following are factors to consider with a commercial OSS project:

**Value**: Is the vendor offering a better value than if you managed the OSS technology yourself?

**Delivery model**: How do you access the service? Is the product available via download, API, or web/mobile UI?

**Support**: What is the support model for the product, and is there an extra cost for support?

**Releases and bug fixes**: Is the vendor transparent about the release schedule, improvements, and bug fixes?

**Sales cycle and pricing**: Is it worth paying a lump sum, or is your money better spent elsewhere?

**Company finances**: Is the company viable?

**Logos versus revenue**: Is the company focused on growing the number of customers (logos), or is it trying to grow revenue?

**Community support**: Is the company truly supporting the community version of the OSS project?

### Proprietary Walled Gardens

While OSS is ubiquitous, a big market also exists for non-OSS technologies. Let's look at two major types: independent companies and cloud-platform offerings.

#### Independent offerings

Often a company selling a data tool will not release it as OSS, instead offering a proprietary solution. Although you won't have the transparency of a pure OSS solution, a proprietary independent solution can work quite well, especially as a fully managed service in the cloud.

The following are things to consider:

**Interoperability**: Make sure that the tool interoperates with other tools you've chosen.

**Mindshare and market share**: Is the solution popular? Does it command a presence in the marketplace?

**Documentation and support**: Problems and questions will inevitably arise.

**Pricing**: Is the pricing understandable? Map out low-, medium-, and high-probability usage scenarios.

**Longevity**: Will the company survive long enough for you to get value from its product?

#### Cloud platform proprietary service offerings

Cloud vendors develop and sell their proprietary services for storage, databases, and more. Each cloud can create stickiness with its user base by creating a strong integrated ecosystem.

The following are factors to consider:

**Performance versus price comparisons**: Is the cloud offering substantially better than an independent or OSS version?

**Purchase considerations**: On-demand pricing can be expensive. Can you lower your cost by purchasing reserved capacity?

### Our Advice

Build versus buy comes back to knowing your competitive advantage and where it makes sense to invest resources toward customization. In general, we favor OSS and COSS by default.

Don't treat internal operational overhead as a sunk cost. Think about how a company makes money, especially its sales and customer experience teams, which will generally indicate how you're treated.

Finally, who is responsible for the budget at your company? Know beforehand who controls the budget and what will successfully get approved.

## Monolith Versus Modular

Monoliths versus modular systems is another longtime debate in the software architecture space. Monolithic systems are self-contained, often performing multiple functions under a single system. The modular camp leans toward decoupled, best-of-breed technologies.

### Monolith

The monolith has been a technology mainstay for decades. Monolithic data systems continue to this day, with older software vendors like Informatica and open source frameworks like Spark.

**Pros**: Easy to reason about, lower cognitive burden and context switching since everything is self-contained. Instead of dealing with dozens of technologies, you deal with "one" technology.

**Cons**: Monoliths are brittle. Because of the vast number of moving parts, updates and releases take longer. Multitenancy in a monolithic system can also be a significant problem. Another con is that switching to a new system will be painful if the vendor or open source project dies.

### Modularity

Modularity is an old concept in software engineering, but modular distributed systems truly came into vogue with the rise of microservices. Instead of relying on a massive monolith, why not break apart systems and processes into their self-contained areas of concern?

Major tech companies have been key drivers in the microservices movement. The famous Bezos API mandate decreases coupling between applications.

In a modular microservice environment, components are swappable, and it's possible to create a polyglot (multiprogramming language) application.

Data-processing technologies have shifted toward a modular model by providing strong support for interoperability. Data is stored in object storage in a standard format such as Parquet in data lakes and lakehouses.

**Pros**: New technologies arrive at a dizzying rate in today's data ecosystem, and most get stale quickly. The ability to swap out tools as technology changes is invaluable.

**Cons**: There's more to reason about. Instead of handling a single system, now you potentially have countless systems to understand and operate. Interoperability is a potential headache.

### The Distributed Monolith Pattern

The **distributed monolith pattern** is a distributed architecture that still suffers from many of the limitations of monolithic architecture. The basic idea is that one runs a distributed system with different services, but services and nodes share a common set of dependencies or a common codebase.

One standard example is a traditional Hadoop cluster. A cluster can simultaneously host several frameworks, but forcing jobs to upgrade dependencies risks breaking them.

Solutions include:
- Ephemeral infrastructure in a cloud setting
- Properly decompose using containers

### Our Advice

While monoliths are attractive because of ease of understanding and reduced complexity, this comes at a high cost—potential loss of flexibility, opportunity cost, and high-friction development cycles.

Here are some things to consider:

**Interoperability**: Architect for sharing and interoperability.

**Avoiding the "bear trap"**: Something that is easy to get into might be painful or impossible to escape.

**Flexibility**: Things are moving so fast in the data space right now. Committing to a monolith reduces flexibility and reversible decisions.

## Serverless Versus Servers

A big trend for cloud providers is **serverless**, allowing developers and data engineers to run applications without managing servers behind the scenes.

### Serverless

Though serverless has been around for quite some time, the serverless trend kicked off in full force with AWS Lambda in 2014. The main reasons for its popularity are cost and convenience.

Serverless has many flavors. Though **function as a service (FaaS)** is wildly popular, serverless systems predate AWS Lambda. For example, Google Cloud's BigQuery is serverless in that data engineers don't need to manage backend infrastructure.

When does serverless make sense? As with many other cloud services, it depends. Data engineers would do well to understand the details of cloud pricing.

Serverless functions are incredibly convenient but potentially expensive. Handling one event per function call at a high event rate can be catastrophically expensive.

As with other areas of ops, it's critical to monitor and model. Monitor to determine cost per event in a real-world environment and model using this cost per event to determine overall costs as event rates grow.

### Containers

In conjunction with serverless and microservices, **containers** are one of the most powerful trending operational technologies. Containers are often referred to as lightweight virtual machines.

A single hardware node can host numerous containers with fine-grained resource allocations. At the time of this writing, containers continue to grow in popularity, along with Kubernetes, a container management system.

Containers provide a partial solution to problems of the distributed monolith. For example, Hadoop now supports containers, allowing each job to have its own isolated dependencies.

:::warning
Container clusters do not provide the same security and isolation that full VMs offer. Container escape is common enough to be considered a risk for multitenancy.
:::

Various flavors of container platforms add additional serverless features. Containerized function platforms run containers as ephemeral units triggered by events rather than persistent services.

### How to Evaluate Server Versus Serverless

Why would you want to run your own servers instead of using serverless? There are a few reasons:

**Cost**: Serverless makes less sense when the usage and cost exceed the ongoing cost of running and maintaining a server. At a certain scale, the economic benefits of serverless may diminish.

**Customization, power, and control**: Some serverless frameworks can be underpowered or limited for certain use cases.

Here are some things to consider when using servers:

**Expect servers to fail**: Server failure will happen. Treat servers as ephemeral resources that you can create as needed and then delete.

**Use clusters and autoscaling**: Take advantage of the cloud's ability to grow and shrink compute resources on demand.

**Treat your infrastructure as code**: Deploy your infrastructure using deployment managers such as Terraform, AWS CloudFormation, and Google Cloud Deployment Manager.

**Use containers**: For more sophisticated workloads with complex dependencies, consider using containers.

### Our Advice

Here are some key considerations:

**Workload size and complexity**: Serverless works best for simple, discrete tasks and workloads.

**Execution frequency and duration**: How many requests per second will your serverless application process? How long will each request take?

**Requests and networking**: Serverless platforms often utilize simplified networking and don't support all cloud virtual networking features.

**Language**: What language do you typically use? If it's not officially supported by the serverless platform, consider containers.

**Runtime limitations**: Serverless platforms don't give you complete operating system abstractions.

**Cost**: Serverless functions are incredibly convenient but potentially expensive.

In the end, abstraction tends to win. We suggest looking at using serverless first and then servers once you've outgrown serverless options.

## Optimization, Performance, and the Benchmark Wars

We see apples-to-oranges comparisons made all the time in the database space. Benchmarks either compare databases that are optimized for completely different use cases, or use test scenarios that bear no resemblance to real-world needs.

Recently, we saw a new round of benchmark wars flare up among major vendors in the data space. We applaud benchmarks and are glad to see many database vendors finally dropping DeWitt clauses from their customer contracts. Even so, let the buyer beware: the data space is full of nonsensical benchmarks.

Here are a few common tricks used to place a thumb on the benchmark scale:

### Big Data...for the 1990s

Products that claim to support "big data" at petabyte scale will often use benchmark datasets small enough to easily fit in the storage on your smartphone.

To benchmark for real-world use cases, you must simulate anticipated real-world data and query size.

### Nonsensical Cost Comparisons

Nonsensical cost comparisons are a standard trick when analyzing price/performance or TCO. For instance, many MPP systems can't be readily created and deleted even when they reside in a cloud environment. Comparing ephemeral and non-ephemeral systems on a cost-per-second basis is nonsensical.

### Asymmetric Optimization

The deceit of asymmetric optimization appears in many guises. Often a vendor will compare a row-based MPP system against a columnar database by using a benchmark that runs complex join queries on highly normalized data. The normalized data model is optimal for the row-based system, but the columnar system would realize its full potential only with some schema changes.

### Caveat Emptor

As with all things in data technology, let the buyer beware. Do your homework before blindly relying on vendor benchmarks to evaluate and choose technology.

## Undercurrents and Their Impacts on Choosing Technologies

As seen in this chapter, a data engineer has a lot to consider when evaluating technologies. Whatever technology you choose, be sure to understand how it supports the undercurrents of the data engineering lifecycle.

### Data Management

Data management is a broad area, and concerning technologies, it isn't always apparent whether a technology adopts data management as a principal concern.

Here are some sample questions you should ask:
- How are you protecting data against breaches, both from the outside and within?
- What is your product's compliance with GDPR, CCPA, and other data privacy regulations?
- Do you allow me to host my data to comply with these regulations?
- How do you ensure data quality?

### DataOps

Problems will happen. They just will. When evaluating a new technology, how much control do you have over deploying new code, how will you be alerted if there's a problem, and how will you respond when there's a problem?

If the technology is OSS, you're likely responsible for setting up monitoring, hosting, and code deployment. With a managed offering, much of the operations are outside your control. Consider the vendor's SLA and how they alert you to issues.

### Data Architecture

As discussed in Chapter 3, good data architecture means assessing trade-offs and choosing the best tools for the job while keeping your decisions reversible. Choose your technologies accordingly.

### Orchestration Example: Airflow

Throughout most of this chapter, we have actively avoided discussing any particular technology too extensively. We make an exception for orchestration because the space is currently dominated by one open source technology, Apache Airflow.

Maxime Beauchemin kicked off the Airflow project at Airbnb in 2014. Airflow enjoys many advantages:
- Extremely active open source project
- Massive mindshare and vibrant community
- Available commercially as a managed service

Airflow also has some downsides:
- Relies on nonscalable core components
- Lacks support for many data-native constructs
- Challenging to develop and test workflows

We mention a couple of key orchestration contenders at the time of writing: Prefect and Dagster aim to solve some of these problems by rethinking components of the Airflow architecture.

### Software Engineering

As a data engineer, you should strive for simplification and abstraction across the data stack. Buy or use prebuilt open source solutions whenever possible. Eliminating undifferentiated heavy lifting should be your big goal.

Focus your resources—custom coding and tooling—on areas that give you a solid competitive advantage. For example, is hand-coding a database connection between your production database and your cloud data warehouse a competitive advantage for you? Probably not. Pick an off-the-shelf solution instead.

On the other hand, why do customers buy from you? Your business likely has something special about the way it does things. By abstracting away a lot of the redundant workflows and processes, you can continue chipping away, refining, and customizing the things that move the needle for the business.

## Conclusion

Choosing the right technologies is no easy task, especially when new technologies and patterns emerge daily. Today is possibly the most confusing time in history for evaluating and selecting technologies.

Choosing technologies is a balance of use case, cost, build versus buy, and modularization. Always approach technology the same way as architecture: assess trade-offs and aim for reversible decisions.

**Key takeaways:**
- Architecture first, technology second
- Consider your team size and capabilities
- Prioritize speed to market
- Ensure interoperability across your stack
- Understand total cost of ownership and opportunity cost
- Evaluate immutable vs. transitory technologies
- Choose the right deployment location (cloud, on-prem, hybrid)
- Make informed build vs. buy decisions
- Favor modular over monolithic when possible
- Consider serverless first, then servers
- Be skeptical of benchmarks
- Ensure technologies support the undercurrents

Remember: **Architecture is the what, why, and when. Tools are the how.** Get your architecture right before choosing specific technologies.

---

**Previous:** [Chapter 3: Designing Good Data Architecture](./chapter3) | **Next:** [Chapter 5: Data Generation in Source Systems](./chapter5)
