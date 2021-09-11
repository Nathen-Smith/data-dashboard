# Python script for inserting data into Cloud Firestore

Needs ```serviceAccountKey.json``` downloaded from project settings -> service accounts in firebase console.



<h4> Create virtual environment</h4>

```sh
python3 -m venv env
```

<h4> Start virtual environment </h4> 

```sh
source env/bin/activate
```

<h4> Install requirements, which may need --user at the end</h4>

```console
(env) Nathens-Microwave:admin nathensmith$ pip3 install -r requirements.txt
```

<h4> Execute script </h4>

```console
(env) Nathens-Microwave:admin nathensmith$ python3 insert_data.py
```

<h4> Exit virtual environment </h4>

```console
(env) Nathens-Microwave:admin nathensmith$ deactivate
```
