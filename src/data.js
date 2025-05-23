
export const albumPhotos = [
  {
    id: 1,
    imageUrl: "/pics/money.jpg",
    caption: "This is our dog. Who would have thought that he's 11 years old?",
    width: 400,
  },
  {
    id: 2,
    imageUrl: "/pics/cat.jpg",
    caption: "We have a little lion. He's a bit smaller thought.",
    width: 420,
  },
  {
    id: 3,
    imageUrl: "/pics/cat_wig.jpg",
    caption: "Cat is usually annoyed with things like this. But he tolerated us for this.",
    width: 380,
  },
  {
    id: 4,
    imageUrl: "/pics/dog.jpg",
    caption: "The last dog we fostered. We found him home in Switzerland in the valleys beneath of Alps.",
    width: 400,
  },
  {
    id: 5,
    imageUrl: "/pics/jez.jpg",
    caption: "We try to rescue every animal we can.",
    width: 380,
  },
  {
    id: 6,
    imageUrl: "/pics/snowboard.jpg",
    caption: "We like snow and the mountain. This is Val Thorens, it was beautiful. I ski and snowboard.",
    width: 450,
  },
  {
    id: 7,
    imageUrl: "/pics/run.jpg",
    caption: "Movement is essential and running is the easiest way to get it.",
    width: 420,
  },
  {
    id: 8,
    imageUrl: "/pics/bike.jpg",
    caption: "Riding when the road is closed for you in a scenery like this is awesome.",
    width: 450,
  },
  {
    id: 9,
    imageUrl: "/pics/bike_2.jpg",
    caption: "Fastest way to move around. I prefer bikes that are efficient on every type of road.",
    width: 420,
  },
  {
    id: 10,
    imageUrl: "/pics/swim.jpg",
    caption: "Swimming in open water is my favorite.",
    width: 380,
  },
  {
    id: 11,
    imageUrl: "/pics/hike.jpg",
    caption: "Hike and Code with a beautiful view of our canyon.",
    width: 400,
  },
  {
    id: 12,
    imageUrl: "/pics/fly2.jpg",
    caption: "Once you try, you will never stop.",
    width: 380,
  },
  {
    id: 13,
    imageUrl: "/pics/fly.jpg",
    caption: "One of the coolest ways to feel freedom we have.",
    width: 400,
  },
];

export const terminalTexts = [
`
INTRO
* First major project when I was 16.
* Topic: Website builder - 20k active users / 70M daily 
page views
* Task: Create blog and forum from scratch and integrated 
with the build and userbase. 
* Tech: LAMP stack with CodeIgniter.
* Status: SUCCESS 
~
~
~
`,

`
EDUCATION
* Location: Faculty of Mechanical Engineering, Banja Luka
* Topic: Mechatronics, Robotics and Control Systems
* Task: Learn how the world functions
* Tech: Maths, Physics, Python, and the rest, 
but mostly Blood, Sweat, and Tears
* Status: GRADUATED
~
~
~
~
`,

`
WORK EXPERIENCE - Page 1 / 3
* Employer: RT-RK Institute - (TTTech, Audi, Magnete 
Marelli, Magna, SAIC, VW, BMW, etc.)
* Topic: Automotive Software Dev Lifecycle Management Tool
* Task: Build the product, manage tech and team, improve 
product adoption
* Tech: .NET (C#, WPF, ASP.NET), Python, Jenkins
* Results: Successfully implemented. Actively used 
* internally. Started evolving into a product offering. 
* Became TTTech MotionWise Creator
~
`,

`
WORK EXPERIENCE - Page 2 / 3
* Employer: Flashboys - (Wizzle)
* Topic: Full featured Blockchain Bank
* Task: Build the product, improve processes and train the
team, ensure delivery and quality
* Tech: .NET (C#, .NET Core), Azure, Typescript, 
Javascript, Python, Vue.js, React Native
* Results: Multiple successful ICOs (10+M$). Implemented 
key banking interfaces (ATM, POS terminal, Merchant 
interface and APIs
~
`,

`
WORK EXPERIENCE - Page 3 / 3
* Employer: Comtrade Digital Services > Endava > Stem Inc
* Topic: Fully-featured battery management system
* Task: Design, plan and manage implementation of diverse 
set of microservices and apps
* Tech: Python, AWS, Javascript, React, Java
* Results: Contributed to and owned a diverse set 
microservices including external data import and 
processing, core data access services, internal and 
external data access providers, ACLs, performance 
reporting, NOC, wholesale market participation and others
` , 

`
<SIGINT>
Type: Project Report Ready 
Topic: Virtual Trading Platform Data Platform.
Action: Switch to the session.
~
~
~
~
~
~
~
`
].map((v) => v.trim());

export const projectPresentation = [
`
VIRTUAL ENERGY TRADER - Page 1 / n
* no hardware and controls
* no clients
* operates in DA and RT only
* buy in DA, sell in RT (long)
* sell in DA, buy in RT (short)
* profit = difference - fees
* rince and repeat
~
~
~
`,


`
VIRTUAL ENERGY TRADER - 2 / n
* price and load forecasting
* trade & bankroll throughput optimization
* market integrations (apis, file sharing, 
hooks and signals)
* data, data, and data
~ 
~
~
~
~
`,

`
VIRTUAL ENERGY TRADER - 3 / n
Data platform
* in service of engineers and the rest of staff
* provide consistent and intuitive access to data
* all of data (external, internal, generated)
* keywords: auth, schemas, APIs, tiers, timelines, 
latency, availability, observability, ... 
~
~
~
~
~
`,

`
lack of control ; dependance on others ; thorny paths
inconsistencies ; poor quality ; bad actors
missing data ; bad communication ; limits ; regulations 
------------------------
buffer zone
------------------------
deterministic environment ; internal dependencies
managed limitations ; structure ; insights
~
~
~
~
`,

`
[vendor]     [vendor]      [vendor]   | replication        
    ^--------+                        | orch: celery   
             |             stores:    | hot: valkey
             +->|insights|<+->|hot |  | warm: postgres
             |     |       +->|warm|  | cold: S3
            |w|------------+=>|cold|  | arh: fs 
             |     |       +->|arh |  | work: celery
worker pool: |     |            |     | obs: ELK       
|1||2||3||4|-+-|orchestrator|---+     |
-----
avoid rate limits, avoid operational nonsense, generalize
data processing, provide resiliency for data recovery, ...
`,

`
[orchestrator]     +--<--------<----+  | import
    |              |                |  | orch: celery
    +<------------|w|-+-->| hot  |  |  | hot: valkey
    |              |  +-->| warm |  |  | warm: postgres
    |              |  +-->| cold |>-+  | cold: S3
    |  |insights|  |  +-->| arh  |     | arh: fs
    |              |                   | work: celery
    |              |  !same stack!     | obs: ELK
    |              |
|1||2||3||4|-------+
worker pool
`,

`
| arh  |         +--|auth/acl|--+--------------+
| hot  |>-+      |              |              |
| cold |>-+-|data svc|---|feature access|--->[user]
| warm |>-+    |               |               |
    |          +---------------|------------>--+
    |          |               |
    +-schemas->+---------------+
`,

`
data schema:
* identifies types of data (ie. price, load, weather, flag)
* idenfities data quality (ie. prelim, final)
* revision
* effective period
* other
feature schema:
* provides resource specific way of accessing specific data
* data for a resource can be a combination of multiple 
pieces ie. price over a period can use final stream and 
augment the gaps with prelim or forecast if in future
`,

`
[User]      [feature] [data]      [auth]    [warm]   [hot]
   | 
   +----------creds--------------->||
                                   ||------cache_get-->||
                                   ||<-----cache_miss--||
                                   ||--query->||
                                   ||<--row---||
                                   ||------cache_put-->||
   +<---------token----------------||
   +---get---->||
               ||---------fetch schemas------->||
               ||<--------return schemas-------||
               ||----->||
                       ||-----fetch data------>||
                       ||<----return data------||
               ||<-----||
   +---return->||
`,       
`
> client.authenticate(username, pass)
> data = client.get_feature_data(
... hub_resource,
... start, end,
... ["price", "load"]
... resolution=timedelta(minutes=15))
> data.head()
ts    | price     |  load  |
------+-----------+--------+
01:00 | cheap     |  small |
01:15 | cheap     |  small |
01:30 | expensive |  huge  |
`,




].map((v) => v.trim());

