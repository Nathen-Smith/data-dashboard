import firebase_admin
from firebase_admin import credentials, firestore

if not firebase_admin._apps:
    cred = credentials.Certificate('./serviceAccountKey.json') 
    default_app = firebase_admin.initialize_app(cred)
    # print(credentials.get_credential())

db = firestore.client()
users_ref = db.collection('movies')
docs = users_ref.stream()

for doc in docs:
    print(f'{doc.id} => {doc.to_dict()}')
