---
sidebar_position: 4
title: Chapter 3 - Designing Good Data Architecture
description: Learn the principles and patterns of good data architecture, from enterprise architecture fundamentals to modern data platforms like data warehouses, data lakes, and data mesh.
---

# Chapter 3: Designing Good Data Architecture

Good data architecture provides seamless capabilities across every step of the data lifecycle and undercurrent. We'll begin by defining data architecture and then discuss components and considerations. We'll then touch on specific batch patterns (data warehouses, data lakes), streaming patterns, and patterns that unify batch and streaming. Throughout, we'll emphasize leveraging the capabilities of the cloud to deliver scalability, availability, and reliability.

## Table of Contents

1. [What Is Data Architecture?](#what-is-data-architecture)
2. ["Good" Data Architecture](#good-data-architecture)
3. [Major Architecture Concepts](#major-architecture-concepts)
4. [Examples and Types of Data Architecture](#examples-and-types-of-data-architecture)
5. [Who's Involved with Designing a Data Architecture?](#whos-involved-with-designing-a-data-architecture)
6. [Conclusion](#conclusion)

## What Is Data Architecture?

Successful data engineering is built upon rock-solid data architecture. This chapter aims to review a few popular architecture approaches and frameworks, and then craft our opinionated definition of what makes "good" data architecture. Indeed, we won't make everyone happy. Still, we will lay out a pragmatic, domain-specific, working definition for data architecture that we think will work for companies of vastly different scales, business processes, and needs.

What is data architecture? When you stop to unpack it, the topic becomes a bit murky; researching data architecture yields many inconsistent and often outdated definitions. It's a lot like when we defined data engineering in Chapter 1—there's no consensus. In a field that is constantly changing, this is to be expected. So what do we mean by data architecture for the purposes of this book? Before defining the term, it's essential to understand the context in which it sits. Let's briefly cover enterprise architecture, which will frame our definition of data architecture.

### Enterprise Architecture Defined

Enterprise architecture has many subsets, including business, technical, application, and data. As such, many frameworks and resources are devoted to enterprise architecture. In truth, architecture is a surprisingly controversial topic.

The term enterprise gets mixed reactions. It brings to mind sterile corporate offices, command-and-control/waterfall planning, stagnant business cultures, and empty catchphrases. Even so, we can learn some things here.

Before we define and describe enterprise architecture, let's unpack this term. Let's look at how enterprise architecture is defined by some significant thought leaders: TOGAF, Gartner, and EABOK.

#### TOGAF's definition

TOGAF is The Open Group Architecture Framework, a standard of The Open Group. It's touted as the most widely used architecture framework today. Here's the TOGAF definition:

> The term "enterprise" in the context of "enterprise architecture" can denote an entire enterprise—encompassing all of its information and technology services, processes, and infrastructure—or a specific domain within the enterprise. In both cases, the architecture crosses multiple systems, and multiple functional groups within the enterprise.

#### Gartner's definition

Gartner is a global research and advisory company that produces research articles and reports on trends related to enterprises. Among other things, it is responsible for the (in)famous Gartner Hype Cycle. Gartner's definition is as follows:

> Enterprise architecture (EA) is a discipline for proactively and holistically leading enterprise responses to disruptive forces by identifying and analyzing the execution of change toward desired business vision and outcomes. EA delivers value by presenting business and IT leaders with signature-ready recommendations for adjusting policies and projects to achieve targeted business outcomes that capitalize on relevant business disruptions.

#### EABOK's definition

EABOK is the Enterprise Architecture Book of Knowledge, an enterprise architecture reference produced by the MITRE Corporation. EABOK was released as an incomplete draft in 2004 and has not been updated since. Though seemingly obsolete, EABOK is frequently referenced in descriptions of enterprise architecture; we found many of its ideas helpful while writing this book. Here's the EABOK definition:

> Enterprise Architecture (EA) is an organizational model; an abstract representation of an Enterprise that aligns strategy, operations, and technology to create a roadmap for success.

#### Our definition

We extract a few common threads in these definitions of enterprise architecture: change, alignment, organization, opportunities, problem-solving, and migration. Here is our definition of enterprise architecture, one that we feel is more relevant to today's fast-moving data landscape:

> **Enterprise architecture is the design of systems to support change in the enterprise, achieved by flexible and reversible decisions reached through careful evaluation of trade-offs.**

Here, we touch on some key areas we'll return to throughout the book: flexible and reversible decisions, change management, and evaluation of trade-offs.

Flexible and reversible decisions are essential for two reasons. First, the world is constantly changing, and predicting the future is impossible. Reversible decisions allow you to adjust course as the world changes and you gather new information. Second, there is a natural tendency toward enterprise ossification as organizations grow. Adopting a culture of reversible decisions helps overcome this tendency by reducing the risk attached to a decision.

Jeff Bezos is credited with the idea of one-way and two-way doors. A one-way door is a decision that is almost impossible to reverse. For example, Amazon could have decided to sell AWS or shut it down. It would be nearly impossible for Amazon to rebuild a public cloud with the same market position after such an action.

On the other hand, a two-way door is an easily reversible decision: you walk through and proceed if you like what you see in the room or step back through the door if you don't. Since the stakes attached to each reversible decision (two-way door) are low, organizations can make more decisions, iterating, improving, and collecting data rapidly.

Change management is closely related to reversible decisions and is a central theme of enterprise architecture frameworks. Architects are not simply mapping out IT processes and vaguely looking toward a distant, utopian future; they actively solve business problems and create new opportunities. Technical solutions exist not for their own sake but in support of business goals.

> **Technical solutions exist not for their own sake but in support of business goals.**

We found significant inspiration in *Fundamentals of Software Architecture* by Mark Richards and Neal Ford (O'Reilly). They emphasize that trade-offs are inevitable and ubiquitous in the engineering space. Data engineers must account for trade-offs at every step to design an optimal system while minimizing high-interest technical debt.

### Data Architecture Defined

Now that you understand enterprise architecture, let's dive into data architecture by establishing a working definition that will set the stage for the rest of the book. Data architecture is a subset of enterprise architecture, inheriting its properties: processes, strategy, change management, and evaluating trade-offs.

#### Our definition

Considering various definitions and our experience, we have crafted our definition of data architecture:

> **Data architecture is the design of systems to support the evolving data needs of an enterprise, achieved by flexible and reversible decisions reached through a careful evaluation of trade-offs.**

How does data architecture fit into data engineering? Just as the data engineering lifecycle is a subset of the data lifecycle, data engineering architecture is a subset of general data architecture. Data engineering architecture is the systems and frameworks that make up the key sections of the data engineering lifecycle.

Other aspects of data architecture are operational and technical. Operational architecture encompasses the functional requirements of what needs to happen related to people, processes, and technology. Technical architecture outlines how data is ingested, stored, transformed, and served along the data engineering lifecycle. In short, operational architecture describes what needs to be done, and technical architecture details how it will happen.

## "Good" Data Architecture

> Never shoot for the best architecture, but rather the least worst architecture.
>
> — Mark Richards and Neal Ford

According to Grady Booch, "Architecture represents the significant design decisions that shape a system, where significant is measured by cost of change." Data architects aim to make significant decisions that will lead to good architecture at a basic level.

What do we mean by "good" data architecture? To paraphrase an old cliche, you know good when you see it. Good data architecture serves business requirements with a common, widely reusable set of building blocks while maintaining flexibility and making appropriate trade-offs. Bad architecture is authoritarian and tries to cram a bunch of one-size-fits-all decisions into a big ball of mud.

Agility is the foundation for good data architecture; it acknowledges that the world is fluid. Good data architecture is flexible and easily maintainable. It evolves in response to changes within the business and new technologies and practices that may unlock even more value in the future.

Bad data architecture is tightly coupled, rigid, overly centralized, or uses the wrong tools for the job, hampering development and change management. Ideally, by designing architecture with reversibility in mind, changes will be less costly.

The undercurrents of the data engineering lifecycle form the foundation of good data architecture for companies at any stage of data maturity: security, data management, DataOps, data architecture, orchestration, and software engineering.

Good data architecture is a living, breathing thing. It's never finished. In fact, per our definition, change and evolution are central to the meaning and purpose of data architecture.

### Principles of Good Data Architecture

This section takes a 10,000-foot view of good architecture by focusing on principles—key ideas useful in evaluating major architectural decisions and practices. We borrow inspiration from the AWS Well-Architected Framework and Google Cloud's Five Principles for Cloud-Native Architecture.

The AWS Well-Architected Framework consists of six pillars:
- Operational excellence
- Security
- Reliability
- Performance efficiency
- Cost optimization
- Sustainability

Google Cloud's Five Principles for Cloud-Native Architecture:
- Design for automation
- Be smart with state
- Favor managed services
- Practice defense in depth
- Always be architecting

We'd like to expand on these with these principles of data engineering architecture:
- Choose common components wisely
- Plan for failure
- Architect for scalability
- Architecture is leadership
- Always be architecting
- Build loosely coupled systems
- Make reversible decisions
- Prioritize security
- Embrace FinOps

#### Principle 1: Choose Common Components Wisely

One of the primary jobs of a data engineer is to choose common components and practices that can be used widely across an organization. When architects choose well and lead effectively, common components become a fabric facilitating team collaboration and breaking down silos.

Common components can be anything that has broad applicability within an organization: object storage, version-control systems, observability, monitoring and orchestration systems, and processing engines. Common components should be accessible to everyone with an appropriate use case.

Cloud platforms are an ideal place to adopt common components. For example, compute and storage separation in cloud data systems allows users to access a shared storage layer using specialized tools.

Choosing common components is a balancing act. You need to focus on needs across the data engineering lifecycle and teams while avoiding decisions that will hamper productivity by forcing one-size-fits-all technology solutions.

#### Principle 2: Plan for Failure

> Everything fails, all the time.
>
> — Werner Vogels, CTO of Amazon Web Services

Modern hardware is highly robust and durable. Even so, any hardware component will fail, given enough time. To build highly robust data systems, you must consider failures in your designs. Here are key terms for evaluating failure scenarios:

**Availability**: The percentage of time an IT service or component is in an operable state.

**Reliability**: The system's probability of meeting defined standards in performing its intended function during a specified interval.

**Recovery time objective (RTO)**: The maximum acceptable time for a service or system outage.

**Recovery point objective (RPO)**: The acceptable state after recovery; in data systems, this refers to the maximum acceptable data loss.

Engineers need to consider acceptable reliability, availability, RTO, and RPO in designing for failure.

#### Principle 3: Architect for Scalability

Scalability in data systems encompasses two main capabilities. First, scalable systems can scale up to handle significant quantities of data. Second, scalable systems can scale down. Once the load spike ebbs, we should automatically remove capacity to cut costs. An elastic system can scale dynamically in response to load, ideally in an automated fashion.

Some scalable systems can also scale to zero: they shut down completely when not in use. Many serverless systems can automatically scale to zero.

Note that deploying inappropriate scaling strategies can result in overcomplicated systems and high costs. Measure your current load, approximate load spikes, and estimate load over the next several years to determine if your database architecture is appropriate.

#### Principle 4: Architecture Is Leadership

Data architects are responsible for technology decisions and architecture descriptions and disseminating these choices through effective leadership and training. Strong leadership skills combined with high technical competence are rare and extremely valuable.

Note that leadership does not imply a command-and-control approach to technology. Cloud environments allow architects to balance common component choices with flexibility that enables innovation within projects.

Martin Fowler describes a specific archetype of an ideal software architect:

> In many ways, the most important activity of Architectus Oryzus is to mentor the development team, to raise their level so they can take on more complex issues.

An ideal data architect manifests similar characteristics. They possess the technical skills of a data engineer but no longer practice data engineering day to day; they mentor current data engineers and disseminate expertise through training and leadership.

#### Principle 5: Always Be Architecting

We borrow this principle directly from Google Cloud's Five Principles for Cloud-Native Architecture. Data architects don't serve in their role simply to maintain the existing state; instead, they constantly design new and exciting things in response to changes in business and technology.

Modern architecture should not be command-and-control or waterfall but collaborative and agile. The data architect maintains a target architecture and sequencing plans that change over time.

#### Principle 6: Build Loosely Coupled Systems

> When the architecture of the system is designed to enable teams to test, deploy, and change systems without dependencies on other teams, teams require little communication to get work done. In other words, both the architecture and the teams are loosely coupled.
>
> — Google DevOps tech architecture guide

In 2002, Bezos wrote an email to Amazon employees that became known as the Bezos API Mandate. It mandated that:
- All teams expose their data and functionality through service interfaces
- Teams must communicate through these interfaces only
- No other form of interprocess communication allowed
- All service interfaces must be designed to be externalizable

The advent of Bezos's API Mandate is widely viewed as a watershed moment for Amazon. Putting data and services behind APIs enabled loose coupling and eventually resulted in AWS as we know it now.

For software architecture, a loosely coupled system has these properties:
1. Systems are broken into many small components
2. These systems interface through abstraction layers (messaging bus or API)
3. Internal changes don't require changes in other parts
4. No waterfall, global release cycle—each component updates separately

Loose coupling of both technology and human systems will allow your data engineering teams to more efficiently collaborate.

#### Principle 7: Make Reversible Decisions

The data landscape is changing rapidly. Today's hot technology or stack is tomorrow's afterthought. You should aim for reversible decisions, as these tend to simplify your architecture and keep it agile.

As Bezos says about "two-way doors": "If you walk through and don't like what you see on the other side, you can't get back to before. We can call these Type 1 decisions. But most decisions aren't like that—they are changeable, reversible—they're two-way doors."

Given the pace of change and the decoupling/modularization of technologies, always strive to pick the best-of-breed solutions that work for today while being prepared to upgrade as the landscape evolves.

#### Principle 8: Prioritize Security

Every data engineer must assume responsibility for the security of the systems they build and maintain. We focus now on two main ideas: zero-trust security and the shared responsibility security model.

**Hardened-perimeter and zero-trust security models**

Traditional architectures place faith in perimeter security—a hardened network perimeter with "trusted things" inside and "untrusted things" outside. This approach has always been vulnerable to insider attacks and external threats like spear phishing.

In a cloud-native environment, the notion of a hardened perimeter erodes further. All assets are connected to the outside world to some degree.

**The shared responsibility model**

Amazon emphasizes the shared responsibility model, which divides security into the security of the cloud and security in the cloud. AWS is responsible for protecting the infrastructure. AWS users are responsible for security in their applications and data.

All cloud providers operate on some form of this shared responsibility model. It is ultimately the user's responsibility to design a security model and leverage cloud capabilities to realize this model.

**Data engineers as security engineers**

The cloud pushes security responsibility out to engineers who are not explicitly in security roles. All data engineers should consider themselves security engineers. Failure to assume these responsibilities can lead to dire consequences.

#### Principle 9: Embrace FinOps

Let's start with the FinOps Foundation definition:

> FinOps is an evolving cloud financial management discipline and cultural practice that enables organizations to get maximum business value by helping engineering, finance, technology, and business teams to collaborate on data-driven spending decisions.

The cost structure of data has evolved dramatically during the cloud era. In the cloud era, most data systems are pay-as-you-go and readily scalable. The pay-as-you-go approach makes spending far more dynamic. The new challenge for data leaders is to manage budgets, priorities, and efficiency.

Cloud tooling necessitates a set of processes for managing spending and resources. With FinOps, engineers need to learn to think about the cost structures of cloud systems.

FinOps evolves the operational monitoring model to monitor spending on an ongoing basis. Rather than simply monitor requests and CPU utilization, FinOps monitors the ongoing cost of serverless functions and spending spikes.

As of this writing, FinOps is a recently formalized practice. The FinOps Foundation was started only in 2019. However, we highly recommend you start thinking about FinOps early, before you encounter high cloud bills.

## Major Architecture Concepts

If you follow the current trends in data, it seems like new types of data tools and architectures are arriving every week. We must not lose sight of the main goal: to take data and transform it into something useful for downstream consumption.

### Domains and Services

> Domain: A sphere of knowledge, influence, or activity. The subject area to which the user applies a program is the domain of the software.
>
> — Eric Evans

A domain is the real-world subject area for which you're architecting. A service is a set of functionality whose goal is to accomplish a task.

A domain can contain multiple services. For example, you might have a sales domain with three services: orders, invoicing, and products. Other domains may also share services.

When thinking about what constitutes a domain, focus on what the domain represents in the real world and work backward. When determining what the domain should encompass, the best advice is to go and talk with users and stakeholders, listen to what they're saying, and build the services that will help them do their job.

### Distributed Systems, Scalability, and Designing for Failure

As data engineers, we're interested in four closely related characteristics of data systems:

**Scalability**: Allows us to increase the capacity of a system to improve performance and handle demand.

**Elasticity**: The ability of a scalable system to scale dynamically; a highly elastic system can automatically scale up and down based on the current workload.

**Availability**: The percentage of time an IT service or component is in an operable state.

**Reliability**: The system's probability of meeting defined standards in performing its intended function during a specified interval.

:::tip
See PagerDuty's "Why Are Availability and Reliability Crucial?" for definitions and background.
:::

How are these characteristics related? If a system fails to meet performance requirements during a specified interval, it may become unresponsive. Low reliability can lead to low availability. Dynamic scaling helps ensure adequate performance—elasticity improves reliability.

Scalability can be realized in various ways. A single machine can be scaled vertically by increasing resources (CPU, disk, memory, I/O). But there are hard limits. We utilize a distributed system to realize higher overall scaling capacity and increased availability and reliability. Horizontal scaling allows you to add more machines to satisfy load and resource requirements.

Distributed systems are widespread in the various data technologies you'll use. Almost every cloud data warehouse and object storage system you use has some notion of distribution under the hood.

### Tight Versus Loose Coupling: Tiers, Monoliths, and Microservices

When designing a data architecture, you choose how much interdependence you want within your various domains, services, and resources. On one end of the spectrum, you have extremely centralized dependencies (tightly coupled). On the other end, you have decentralized domains and services (loose coupling).

#### Architecture tiers

Your architecture has layers—data, application, business logic, presentation—and you need to know how to decouple these layers.

**Single tier**: Your database and application are tightly coupled, residing on a single server. The tightly coupled nature means if the server, database, or application fails, the entire architecture fails.

**Multitier**: A multitier (n-tier) architecture is composed of separate layers. A common multitier architecture is a three-tier architecture: data, application logic, and presentation tiers. Each tier is isolated from the other, allowing for separation of concerns.

#### Monoliths

The general notion of a monolith includes as much as possible under one roof. The tight coupling of a monolith implies a lack of modularity of its components. Swapping out or upgrading components in a monolith is often difficult.

#### Microservices

Compared with a monolith, microservices are the polar opposite. Microservices architecture comprises separate, decentralized, and loosely coupled services. Each service has a specific function and is decoupled from other services.

#### Considerations for data architecture

Though architectural practices in data are now adopting those from software development, it's still common to see very monolithic, tightly coupled data architectures. We suggest you pragmatically use loose coupling as an ideal while recognizing the state and limitations of the data technologies you're using.

Our advice: monoliths aren't necessarily bad, and it might make sense to start with one under certain conditions. Just be prepared to break it into smaller pieces eventually.

### User Access: Single Versus Multitenant

As a data engineer, you have to make decisions about sharing systems across multiple teams, organizations, and customers. In multitenancy, we have two factors to consider: performance and security.

With multiple large tenants within a cloud system, will there be a noisy neighbor problem? Regarding security, data from different tenants must be properly isolated.

### Event-Driven Architecture

Your business is rarely static. Events are things that happen, typically a change in state. An event-driven workflow encompasses the ability to create, update, and asynchronously move events across various parts of the data engineering lifecycle.

An event-driven architecture embraces the event-driven workflow and uses this to communicate across various services. The advantage is that it distributes the state of an event across multiple services.

### Brownfield Versus Greenfield Projects

Before you design your data architecture project, you need to know whether you're starting with a clean slate or redesigning an existing architecture.

**Brownfield projects** often involve refactoring and reorganizing an existing architecture and are constrained by the choices of the present and past. A popular alternative to a direct rewrite is the strangler pattern: new systems slowly and incrementally replace a legacy architecture's components.

**Greenfield projects** allow you to pioneer a fresh start, unconstrained by the history or legacy of a prior architecture. However, watch out for shiny object syndrome and resume-driven development.

Whether brownfield or greenfield, always focus on the tenets of "good" data architecture: assess trade-offs, make flexible and reversible decisions, and strive for positive ROI.

## Examples and Types of Data Architecture

Because data architecture is an abstract discipline, it helps to reason by example. This section outlines prominent examples and types of data architecture that are popular today.

### Data Warehouse

A data warehouse is a central data hub used for reporting and analysis. Data in a data warehouse is typically highly formatted and structured for analytics use cases.

In 1989, Bill Inmon originated the notion of the data warehouse, which he described as "a subject-oriented, integrated, nonvolatile, and time-variant collection of data in support of management's decisions."

In the past, data warehouses required significant budgets. Since then, the scalable, pay-as-you-go model has made cloud data warehouses accessible even to tiny companies.

The organizational data warehouse architecture has two main characteristics:

**Separates OLAP from production databases (OLTP)**: Moving data into a separate physical system directs load away from production systems and improves analytics performance.

**Centralizes and organizes data**: Traditionally, a data warehouse pulls data from application systems by using ETL (extract, transform, load).

Regarding technical architecture, the first MPP (massively parallel processing) systems became popular in the 1980s. MPPs support essentially the same SQL semantics used in relational databases but are optimized to scan massive amounts of data in parallel.

One variation on ETL is ELT (extract, load, transform). Data gets moved more or less directly from production systems into a staging area in the data warehouse. Transformations are handled directly in the data warehouse.

#### The cloud data warehouse

Cloud data warehouses represent a significant evolution. Amazon Redshift kicked off the cloud data warehouse revolution. Google BigQuery, Snowflake, and other competitors popularized the idea of separating compute from storage.

Cloud data warehouses expand the capabilities of MPP systems to cover many big data use cases that required a Hadoop cluster in the recent past.

#### Data marts

A data mart is a more refined subset of a warehouse designed to serve analytics and reporting, focused on a single suborganization, department, or line of business.

### Data Lake

Among the most popular architectures during the big data era is the data lake. Instead of imposing tight structural limitations on data, why not simply dump all your data into a central location?

Data lake 1.0 started with HDFS. As the cloud grew in popularity, these data lakes moved to cloud-based object storage, with extremely cheap storage costs and virtually limitless storage capacity.

Despite the promise and hype, data lake 1.0 had serious shortcomings. The data lake became a dumping ground; terms such as data swamp, dark data, and WORN were coined.

#### Convergence, Next-Generation Data Lakes, and the Data Platform

In response to limitations, various players have sought to enhance the concept. Databricks introduced the notion of a data lakehouse. The lakehouse incorporates the controls, data management, and data structures found in a data warehouse while still housing data in object storage.

We believe that the trend of convergence will only continue. The data lake and the data warehouse will still exist as different architectures, but their capabilities will converge.

### Modern Data Stack

The modern data stack is currently a trendy analytics architecture. The main objective is to use cloud-based, plug-and-play, easy-to-use, off-the-shelf components to create a modular and cost-effective data architecture.

Key outcomes are self-service (analytics and pipelines), agile data management, and using open source tools or simple proprietary tools with clear pricing structures.

### Lambda Architecture

In the "old days" (the early to mid-2010s), the popularity of working with streaming data exploded. Data engineers needed to figure out how to reconcile batch and streaming data into a single architecture. Lambda architecture was one of the early popular responses.

In Lambda architecture, you have systems operating independently—batch, streaming, and serving. Lambda architecture has its share of challenges, mainly managing multiple systems with different codebases.

### Kappa Architecture

As a response to Lambda architecture's shortcomings, Jay Kreps proposed Kappa architecture. The central thesis: why not just use a stream-processing platform as the backbone for all data handling?

Though the original Kappa architecture article came out in 2014, we haven't seen it widely adopted.

### The Dataflow Model and Unified Batch and Streaming

Both Lambda and Kappa sought to address limitations of the Hadoop ecosystem. Today, engineers seek to solve this in several ways. Google developed the Dataflow model and the Apache Beam framework that implements this model.

The core idea is to view all data as events, with aggregation performed over various types of windows. The philosophy of "batch as a special case of streaming" is now more pervasive.

### Architecture for IoT

The Internet of Things (IoT) is the distributed collection of devices—computers, sensors, mobile devices, smart home devices, and anything else with an internet connection.

IoT devices are often low-powered and operate in low-resource/low bandwidth environments. We expect IoT to become one of the dominant ways data is generated and consumed.

#### Devices

Devices are the physical hardware connected to the internet, sensing the environment and collecting and transmitting data. Devices should be minimally capable of collecting and transmitting data.

#### Interfacing with devices

An IoT gateway is a hub for connecting devices and securely routing devices to the appropriate destinations on the internet. Ingestion begins with an IoT gateway, and events can flow into an event ingestion architecture.

### Data Mesh

The data mesh is a recent response to sprawling monolithic data platforms. It attempts to invert the challenges of centralized data architecture, taking concepts of domain-driven design and applying them to data architecture.

Zhamak Dehghani identified four key components of the data mesh:
- Domain-oriented decentralized data ownership and architecture
- Data as a product
- Self-serve data infrastructure as a platform
- Federated computational governance

#### Other Data Architecture Examples

Data architectures have countless other variations: data fabric, data hub, scaled architecture, metadata-first architecture, event-driven architecture, live data stack, and many more.

As a data engineer, pay attention to how new architectures may help your organization. Stay abreast of new developments. Be open-minded and don't get emotionally attached to one approach.

## Who's Involved with Designing a Data Architecture?

Data architecture isn't designed in a vacuum. Bigger companies may still employ data architects, but those architects will need to be heavily in tune with the state of technology and data.

Ideally, a data engineer will work alongside a dedicated data architect. However, if a company is small or low in data maturity, a data engineer might work double duty as an architect.

When designing architecture, you'll work alongside business stakeholders to evaluate trade-offs. Studying these choices in the abstract will prepare you to make concrete, valuable decisions.

## Conclusion

You've learned how data architecture fits into the data engineering lifecycle and what makes for "good" data architecture. You've seen several examples of data architectures.

Because architecture is such a key foundation for success, we encourage you to invest the time to study it deeply and understand the trade-offs inherent in any architecture. You will be prepared to map out architecture that corresponds to your organization's unique requirements.

Next up, let's look at some approaches to choosing the right technologies to be used in data architecture and across the data engineering lifecycle.

---

**Previous:** [Chapter 2: The Data Engineering Lifecycle](./chapter2) | **Next:** [Chapter 4: Choosing Technologies](./chapter4)
