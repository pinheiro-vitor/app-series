from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import (
    fetch_one_serie_id,
    fetch_all_series,
    create_serie,
    fetch_one_serie_title,
    update_serie,
    delete_serie,
)
from model import Series

app = FastAPI()


origins = ['http://localhost:3000']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.get("/api/series")
async def get_series():
    response = await fetch_all_series()
    return response


@app.get("/api/series/{title}", response_model=Series)
async def get_series_by_title(title):
    response = await fetch_one_serie_title(title)
    if response:
        return response
    raise HTTPException(404, f"There is no series with the title: {title}")


@app.get("/api/series/{id}", response_model=Series)
async def get_series_by_id(id):
    response = await fetch_one_serie_id(id)
    if response:
        return response
    raise HTTPException(404, f"There is no series with the id: {id}")


@app.post("/api/series/", response_model=Series)
async def post_series(series: Series):
    response = await create_serie(series.dict())
    if response:
        return response
    raise HTTPException(404, "Something went wrong / Bad Request")


@app.put("/api/series/{title}/", response_model=Series)
async def put_series(title: str, tv_network: str, showrunner: str, cast: str,
                     genre: str, n_episodes: int, n_seasons: int,
                     imdb_rating: float):
    response = await update_serie(title, tv_network, showrunner, cast,
                                  genre, n_episodes, n_seasons, imdb_rating)
    if response:
        return response
    raise HTTPException(404, f"There is no series with the title: {title}")


@app.delete("/api/series/{title}")
async def delete_series(title):
    response = await delete_serie(title)
    if response:
        return "Succesfully deleted serie!"
    raise HTTPException(404, f"There is no series with the title: {title}")
