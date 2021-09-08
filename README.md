# data-dashboard

Real time data monitoring using React, TypeScript, and Cloud Firestore. Cloud Firestore is a real-time database where one can monitor a collection using 
```firebase.firestore.collection().onSnapshot()``` through React Hook package, react-firebase-hooks. The latest version of react-firebase-hooks does not support Firebase version 9, 
which is why there are compat imports.
