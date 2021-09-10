import firebase_admin, asyncio, os, datetime, csv
from firebase_admin import credentials, firestore

DATE_IDX = 14

if not firebase_admin._apps:
    credential_path = './serviceAccountKey.json'
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = credential_path
    cred = credentials.Certificate(credential_path) 
    default_app = firebase_admin.initialize_app(cred)

def process_data(movie_data):
    processed_data = []
    for idx, element in enumerate(movie_data):
        if idx == DATE_IDX and element:
            processed_data.append(datetime.datetime(int(element[0:4]), int(element[5:7]), int(element[8:10])))
        else:
            try:
                processed_data.append(eval(element))
            except:
                processed_data.append(element)
    return processed_data

async def add_data_types(data_types, movie_data):
    db = firestore.AsyncClient()
    processed_data = dict(zip(data_types, process_data(movie_data)))
    await db.collection('movies').add(processed_data)

async def main():
    with open('./assets/movies_metadata.csv', newline='') as csvfile:
        reader = csv.reader(csvfile)
        data_types = next(reader)
        for row in reader:
            await add_data_types(data_types, row)

asyncio.run(main())