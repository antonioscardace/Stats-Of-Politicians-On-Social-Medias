# Stats-Of-Politicians-On-Social-Medias

_Project for "Social Media Management" course in 2021/2022._ <br/>
_Grade: 30 / 30_<br/>
_[Antonio Scardace](https://linktr.ee/antonioscardace)_ @ _Dept of Math and Computer Science, University of Catania_

[![CodeFactor](https://www.codefactor.io/repository/github/antonioscardace/stats-of-politicians-on-social-medias/badge/main)](https://www.codefactor.io/repository/github/antonioscardace/stats-of-politicians-on-social-medias/overview/main)
[![License](https://img.shields.io/github/license/antonioscardace/stats-of-politicians-on-social-medias.svg)](https://github.com/antonioscardace/stats-of-politicians-on-social-medias/blob/master/LICENSE)
[![Open Issues](https://img.shields.io/github/issues/antonioscardace/stats-of-politicians-on-social-medias.svg)](https://github.com/antonioscardace/stats-of-politicians-on-social-medias/issues)

## Introduction

The project aims to make stats about Politicians' use of Social Media.<br/>
It analyses, for each social media, politicians of any country belonging to any political group.<br/>
At this moment, I analyse just Twitter data.

#### Provided Data for Twitter (For Each Account and Political Group)

- Total Metrics of the previous day (Likes, Retweets, Replies)
- Average Metrics of the previous day (Likes, Retweets, Replies, Tweet Length)
- Average Sentiment Analysis **(Positive, Negative, Neutral, Null)** (previous day)
- Charts of Compare Among All Political Groups Data (e.g. Followers, Likes) Over Time
- Chart with the History of the Number of Analysed Tweets Over Time
- Chart with the History of Total Followers Over Time
- Chart with the History of Avg Tweets Length Over Time
- Chart with the History of Avg Likes Over Time
- Chart with the History of Avg Retweets Over Time
- Chart with the History of Avg Replies Over Time
- Top 5 Most Used Hashtags **(just for accounts)** (last week, last month, last year) 

## System Pipeline

<img src="/docs/imgs/infrastructure.svg" width="540px"/>

Every day, at **00:00 AM UTC**, it starts a job with three main phases managed by ```Manager```.

- **Reading**: it reads from the **YAML config file** all the info necessary to make stats. It contains socials, countries, their respective political groups, and accounts we want to analyse. I have decided to use a YAML file rather than a relational DB because it is easier to update and store.
- **Fetching & Processing**: for each social and country, it retrieves data for each account for the last 24 hours and puts them into an Account object (one for each account). Once a list of accounts' objects is constructed, it instantiates a Group object. These objects make all the stats required for the last 24hrs.
- **Saving**: once all accounts and political groups' objects associated with a given country are made on a given social, the data are stored through a ```Helper``` in a database. This class and its children communicate with the database using the ORM SQLAlchemy.

Here is illustrated a simplified UML of the Crawler.

<img src="/docs/uml/crawler.svg" height="375px"/>

Let's see a light version of the Database E-R schema:

<img src="/docs/uml/db.svg" width="600px"/>
    
## Light Demo

![Screen 1](/docs/snaps/screen-0.png)
---
![Screen 2](/docs/snaps/screen-1.png)
---
![Screen 4](/docs/snaps/screen-4.png)
***
![Screen 5](/docs/snaps/screen-5.png)
---
![Screen 6](/docs/snaps/screen-6.png)
---
![Screen 8](/docs/snaps/screen-8.png)
---
![Screen 9](/docs/snaps/screen-9.png)
***
![Screen 10](/docs/snaps/screen-10.png)
---
![Screen 11](/docs/snaps/screen-11.png)

## Getting Started

So that the repository is successfully cloned and the project runs, there are a few prerequisites:

* A stable internet connection. 
* Having a Twitter Developer Account with related keys and tokens (for Twitter Analysis).
* Need to download and install [Docker](https://docs.docker.com/get-docker/).

Then, dependencies can be installed and the project can be run. 

```sh
   $ git clone https://github.com/antonioscardace/Stats-Of-Politicians-On-Social-Medias.git
   $ cd YOUR_PATH/Stats-Of-Politicians-On-Social-Medias/
   $ bash run.sh
```

### Useful Links

| Container | URL |
| ----- | ---- |
| Grafana-Charts | [https://localhost:3000/](https://localhost:3000/) |
| Node-UI | [https://localhost:8080/](https://localhost:8080/) |
