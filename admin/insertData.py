import firebase_admin, asyncio, os, datetime, csv
from firebase_admin import credentials, firestore

if not firebase_admin._apps:
    credential_path = './serviceAccountKey.json'
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = credential_path
    cred = credentials.Certificate(credential_path) 
    default_app = firebase_admin.initialize_app(cred)

async def add_data_types(test):
    db = firestore.AsyncClient()
    # [START firestore_data_set_from_map_nested_async]
    data = {
        "stringExample": "Hello, World!",
        "booleanExample": True,
        "numberExample": 3.14159265,
        "dateExample": datetime.datetime(1995, 10, 30), # need to convert this one.
        "arrayExample": [5, True, "hello"],
        "nullExample": None,
        # "objectExample": {"a": 5, "b": True},
        "production_countries":{"name":"India"},
        "belongs_to_collection": test
    }

    await db.collection('movies').add(data)
    # [END firestore_data_set_from_map_nested_async]

async def main():
    # await add_data_types()
    # db = firestore.AsyncClient()
    # users_ref = db.collection('movies')
    # docs = users_ref.stream()

    # async for doc in docs:
    #     print(f'{doc.id} => {doc.to_dict()}')
    with open('./assets/movies_metadata.csv', newline='') as csvfile:
        reader = csv.reader(csvfile)
        # row1 = next(reader) # data names
        row2 = next(reader)
        # spamreader = csv.reader(csvfile, delimiter=' ', quotechar='|')
        # for row in spamreader:
        #     print(', '.join(row))
        await add_data_types(eval(row2[1])) # need eval or else it will all be strings
        # may need asyncio.gather

    # datatypes = ['adult', 'belongs_to_collection', 'budget', 'genres', 'homepage', 'id', 'imdb_id', 'original_language', 'original_title', 'overview', 'popularity', 'poster_path', 'production_companies', 'production_countries', 'release_date', 'revenue', 'runtime', 'spoken_languages', 'status', 'tagline', 'title', 'video', 'vote_average', 'vote_count']

asyncio.run(main())