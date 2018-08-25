# RPK-API Crawler

Crawls data from `api.stadt-zuerich.ch/rpkk-rs/v1/*`.

## Prerequisite

Node 7.6+

## Usage

Create a `.env` file:

```
API_KEY=
```

Crawl:

```bash
# a folder for the json files
mkdir data
# get a complete budget book
node crawl.js "budgetbuch?jahr=2018&orgKey=1"
# get a all values of an account
node crawl.js "betragsreihe?kontoId=5540"
```

Combine:

```bash
# combine multiple files into one, e.g. multiple budget years
node combine.js budgetbuch
```
