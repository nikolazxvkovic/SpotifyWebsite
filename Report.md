<br/>
<p align="center">
  <h1 align="center">Team 22 Report</h1>
  <p align="center">
      The construction process for our deployable web app with front and back-end to
        view the Songs and Artists on Spotify from 1921-2021. <br/> <br/>
        Amr Abdou(S4678753), Serban Tonie (S4721586) and <br>
        Nikola Zivkovic (S4796136)
  </p>
    </p>


## **Milestone 1 - API Design**
For the development of our API specification we had a little trouble at the beginning.
Particularly, the issues that we faced were trying to understand the Open API syntax and understanding how to design endpoints.
After some time we got the grasp of it
and the rest went relatively fast. We thought about the different endpoints we would want to implement and how to implement them in a smart way.
We decided to not add extra endpoints as it was our first time developing a web application.
However, we implemented the capability to sort the songs by release date, which can be included as a query in our endpoint that deals with getting all the songs.
### **Learnings**
<ul>
    <li>How to use Open API and Swagger to model a RESTful API.</li>
    <li>Intuitive designing of endpoints based on the requirements</li>
</ul>

## **Milestone 2 - API Implementation**
The processes that led to the development of our backend was initially quite challenging and seemed very daunting. 
This is because we had a great deal of freedom in deciding between what framework to utilize to implement our API endpoints. 
This led to a lack of direction and had us in standstill since we didn’t know how to actually start. 
Processing the data was also quite difficult. 
Since we had quite a large dataset with essentially a lot of attributes that we won't need. 

Therefore, we decided to take a portion of these attributes and not all of them. We decided to include the following attributes in our project:

    Song Name
    Song ID
    Song Release Date
    Song Popularity
    Artist Name
    Artist ID

We have not extracted the properties by hand. Amr wrote a script in TypeScript that extracted all properties with only the mentioned attributes from the CSV files of the Kaggle Spotify dataset, which can be found through this link:
<a href="https://www.kaggle.com/datasets/yamaerenay/spotify-dataset-19212020-600k-tracks"> Spotify Dataset</a>.
We ended up using PostgreSQL due to the increased number of supported types of data in comparison to other RDBMS. 
We also used Prisma. Prisma is an Object Relational Mapper that allows the querying of data using an object-oriented paradigm. 
Prisma made it easy for us to work with PostgreSQL and avoid all the complexities of using PostgreSQL. Among other things,
Prisma provided us with easy use of queries and helpful error messages among other things. It also provided us with the ability to shift underlying database in case we face any issues which was really helpful to fall back on.

The data we extracted needed to be inserted into a PostgreSQL database. This was also not done by hand but Amr wrote another script that inserted that data using Prisma into the PostgreSQL database. 

[//]: # (Both the scripts can be found in the scripts folder.)

Initially, we were torn between using Go (Gin) & TypeScript (NestJS) since we all wanted to expand our skills.  After lots of debate we decided to use the NestJS Framework. 
This is because NestJS is easy to set up and scaffold a project. It also had a lot of resources and tutorials to fall back on in case we needed any help. It was also 
a more popular and used framework in comparison to Gin. NestJS also had easy integration with Prisma and PostgreSQL, which made it the obvious choice between the two.

For example, by default scaffolding of a new NestJS project, NestJS provides us with a sample project structure with sample controllers, services, and endpoints which was easy to follow and helped us learn the framework faster. 
Furthermore, NestJS supports a plethora of libraries and packages most notably Prisma, which enables us to quickly serialize the API GET, PUT and POST requests into JSON format for the app's frontend needs and for faster, more intuitive, and human readbale querying. 
It also offers libraries for converting responses to CSV which meant we did not have to implement our own.

All in all, NestJS is quite simple, very well-structured,and comes packed with a lot of functionality out of the box, enabling us to focus more time developing instead of re-inventing the wheel. 
Luckily the learning curve wasn't that steep considering how similar Typescript was to other languages and frameworks we previously used, and it was more than worth it for the knowledge we acquired.


### **Learnings**
<ul>
    <li>How to implement a RESTful API</li>
    <li>Back-end framework options</li>
    <li>Using Prisma (ORM) to help develop our database in PostgreSQL</li>
    <li>Seeding databases</li>
    <li>Learned Typescript</li>
</ul>

## **Milestone 3 - User Interface Implementation and Dockerizing the Application**
We initially started by using Next.js which is a full-stack framework, it includes multiple different frameworks whether that be
front-end or back-end. We decided to use a front-end framework based off of React inside of Next.js.
However, we quickly realized that the functionalities we wanted to implement were hard to do and
there were fewer resources online to aid in debugging.

Therefore, we switched to a different JavaScript framework called Svelte.js. This framework is relatively easy to use and it
helped us make progress much more rapidly. For the basic things that we needed to implement there were plenty of examples online which
sped up the process of developing quite a lot. Svelte renders mostly on the server side, but we have some elements rendered on
the client side as well(for example: the matchers for the routes). Getting the front-end up and running through was quite simple
because of svelte.

We used Docker to separate our application in containers and run them at the same time using `docker compose up`. During 
development, we just had our database running in a container and running the frontend and backend in the terminal. 
Deploying both the database and the backend was a bit of a hassle, but we managed to do it in the end. Dockerizing the backend and
the frontend proved to be more difficult than anticipated.

## **Learnings**
<ul>
    <li>How to implement a svelte.js front-end</li>
    <li>Making use of HTML and JS</li>
    <li>Deploying the tiers of the application across multiple containers using Docker🤡</li>
</ul>


### **Final Delivery & Evaluation**
We accomplished the goals we set out and met all the requirements that we had to do.
Our back-end is very stable and our front-end is relatively stable due to some status codes that are not handled properly.

All things considered we are satisfied with our end product.

### **Main Architectural Decisions**
The first decision we had to make as a group was about the design of the API and its endpoints. 
We used the REST API Design that was shown in the lectures. Throughout this process we were able to design our endpoints
abiding by industry standards so that experienced Web Developers would be able to understand and make use of our API.

The central decision that we had to make was the overall structure of our project.
For the architecture, we decided to go with using the Remote presentation application split, 
which ships the presentation layer to the client as it is easier to use and build on top of APIs.

Overall, we focused on implementing the requirements for our Web Application and made sure to conform by the rules enforced
by the frameworks.

### **Work Distribution**
We usually worked together on discord or in person, but sometimes also separately. Firstly before starting working on anything we would
talk and discuss ideas and made sure every body is on the same page. Everybody did their best to make this project possible.

### **Contact**
[Amr Abdou](https://github.com/akr115)</br>
[Nikola Zivkovic](https://github.com/nikolazxvkovic)</br>
[Serban Tonie](https://github.com/Serbbi)