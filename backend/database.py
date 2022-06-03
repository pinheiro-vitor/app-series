from model import Series
import motor.motor_asyncio


client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://127.0.0.1:27017')
database = client.SeriesList
collection = database.series


async def fetch_one_serie_title(title):
    document = await collection.find_one({"title": title})
    return document


async def fetch_one_serie_id(id):
    document = await collection.find_one({"id": id})
    return document


async def fetch_all_series():
    series = []
    cursor = collection.find({})
    async for document in cursor:
        series.append(Series(**document))
    return series


async def create_serie(serie):
    document = serie
    result = await collection.insert_one(document)
    return document


async def update_serie(title, tv_network, showrunner, cast, genre,
                       n_episodes, n_seasons, progress, imdb_rating):
    await collection.update_one({"title": title},
                                {"tv_network": tv_network},
                                {"showrunner": showrunner},
                                {"cast": cast},
                                {"genre": genre},
                                {"n_episodes": n_episodes},
                                {"n_seasons": n_seasons},
                                {"imdb_rating": imdb_rating})
    document = await collection.find_one({"title": title})
    return document


async def delete_serie(title):
    await collection.delete_one({"title": title})
    return True
