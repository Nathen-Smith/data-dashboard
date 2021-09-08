# Python script for inserting data into Cloud Firestore

<h4>!! Needs ```serviceAccountKey.json``` downloaded from project settings -> service accounts in firebase console.</h4>

Start virtual environment
```sh
python3 -m venv env
source env/bin/activate
```
Now should see (env), then do
```pip3 install -r requirements.txt --user``` OR ```pip3 install firebase_admin``` then ```python3 insertData.py```

Exit virtual environment
```sh
deactivate
```
