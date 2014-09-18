Mock angular and express app
=============================

These two apps demonstrate some of the features of express and angular js frameworks.

- mockrest - A mock REST based express js app. It exposes few URLs which is used by the webperf app
- webperf - A sample angular app which uses the data from the mockrest app and displays them in tables and charts. It demonstrates various features of angular such as promise, $resource, filters, directives, pagination etc

Running the apps
----------------
To run mockrest
```
cd mockrest
npm install
npm start
```

To run webperf
```
cd webperf
grunt serve
```
