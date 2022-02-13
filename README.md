# real-time-data-dashboard

<p align="center">
  <img src="https://media.giphy.com/media/x589CCk76eXkIJ3g2H/giphy.gif?cid=790b7611e0fa1c68fb6b1325fda405083ddfb6abf82caca6&rid=giphy.gif&ct=g" width="576" height="324" frameBorder="0" alt="demo gif"/>
 </p>
 
## Documentation
The app is located in the web/ folder and the main files to pay attention to are src/App.tsx and src/components/Data.tsx. App is what is displayed on start up, and contains a text field where one will input a country to monitor the movies of. When the data is ready, it is passed to Data.tsx where statistics and the bar chart of genres is calculated and displayed. When there are changes to the result of the country query snapshotted, a re-render will trigger with the new movies data.

The admin/ folder contains a Python script along with the data to insert and a README with instructions on how to use. Also, the Usage section below details prerequisites and specific commands to use.

#### Design
The real time aspect of the system is made possible by Firebase Cloud Firestore’s ```firebase.firestore.QuerySnapshot``` method. The flow works like so: user inputs a country to search for, and a collection of documents whose ```production_countries``` field contains the country is returned and listened to for real time changes. Additionally, this snapshot is not limited to the documents returned from the initial query, but new documents created with matching fields queried will be added to the snapshot. Since one cannot search for a map element in an array of maps in Firestore, ```production_countries``` is changed to an array of country names. Firestore was chosen for the real time aspect as it is easy to implement and SQL methods are complex and not very scalable: a real time SQL implementation often involves triggers to put changes on a table that gets polled, which would double each operation and would be inefficient.

#### Implementation
The system was implemented using React and TypeScript with package react-firebase-hooks for ease of integrating Firestore snapshot, and supporting re-rendering when there are changes in the snapshot. As for the database, I chose Python to easily parse movies_metadata.csv as strings line by line and obtain the right types through the ```eval()``` function, which correctly extracts Booleans, Arrays, Dictionaries, etc. After obtaining the right data and its types, a dictionary is created through ```dict(zip(keys, values))``` and is added as a single movie document in the movies collection through admin SDK functionality.

#### Usage
Prerequisites: Node.js, Yarn, Python ^3.8.2, git

To use the system locally, first make a Firestore Database in the Firebase console. Then, download the code from GitHub and create a ```.env.local``` file in web/src/ and a ```serviceAccountKey.json``` file in admin/ with the credentials provided in Project Settings→General and Project Settings→Service Accounts, respectively. Create a collection with name movies, then insert some data from movies_metadata.csv with these commands in admin/ (creates a virtual environment to isolate package versions):

```sh
python3.8 -m venv env
source env/bin/activate
pip3 install -r requirements.txt
python3 insert_data.py
deactivate
```

After inserting some data, navigate to web/ and enter ```yarn start``` in the terminal. Now, a tab in the browser will open with address localhost:3000 with an input for a country name. Type in a country name and hit enter, then data will be retrieved and viewed for real time changes.

#### Does your design/implementation allow monitoring changes in a database in an efficient, interactive manner? 
Yes, Firestore’s onSnapshot is most similar to long polling, where a new request would immediately return the documents requested, and follow-up requests would be held then sent a response when there is an update. This is more efficient than regular polling and is highly responsive to changes in the database.

#### Does it scale to very large data?
Yes, Cloud Firestore automatically scales horizontally, meaning data will be automatically distributed across several servers when the database becomes very large. 

#### What are potential bottlenecks?
A potential bottleneck is retrieving a large amount of data from a country to monitor. This is a bottleneck because each document in the movies collection is searched for their production_countries array containing the requested country: if n is the number of documents and m is the length of ```production_countries```, runtime is O(mn). However, once the snapshot is created, changes are still displayed in near real time. A larger snapshot does mean a longer delay in data visualization as statistics are re-computed. 


