from pydantic import BaseModel


class Series(BaseModel):
    title: str
    tv_network: str
    showrunner: str
    cast: str
    genre: str
    n_episodes: int
    n_seasons: int
    imdb_rating: float
