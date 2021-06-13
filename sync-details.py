import os
import json
import requests

import asyncio
import aiohttp

from icecream import ic

from bs4 import BeautifulSoup

from toolz import partition_all


ROOT_PATH = "https://catalogbucuresti.info"
DETAIL_PATH = "https://catalogbucuresti.info/map/document-details"


def get_root():
    response = requests.request("GET", ROOT_PATH)
    response.raise_for_status()
    return response


def get_detail_auth():
    response = get_root()

    cookies = response.cookies.get_dict()
    COOKIES_STRING = "; ".join([f"{key}={value}" for (key, value) in cookies.items()])

    soup = BeautifulSoup(response.content, features="html.parser")

    meta = soup.find_all("meta")[-1]
    # ic(meta)
    # ic(meta['name'])
    # ic(meta['content'])
    TOKEN = meta["content"]

    return (COOKIES_STRING, TOKEN)


COOKIES_STRING, TOKEN = get_detail_auth()


async def get_detail(session: aiohttp.ClientSession, id: int) -> str:
    url = "https://catalogbucuresti.info/map/document-details"

    headers = {
        "X-CSRF-Token": TOKEN,
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        # "Cookie": "_csrf-frontend=a9e905e3086ba4d68f7fedd52fbc91fc0134fcf430b45a141ded68a35dd9cd6aa%3A2%3A%7Bi%3A0%3Bs%3A14%3A%22_csrf-frontend%22%3Bi%3A1%3Bs%3A32%3A%22camhsmHOftIFoZpigYAutHbKTjNIASkm%22%3B%7D; advanced-frontend=nvb9ejqr5nip82ar9utm14i7rt",
        "Cookie": COOKIES_STRING,
    }

    async with session.request(
        "POST", DETAIL_PATH, headers=headers, data=f"id={id}"
    ) as response:

        ic(response.status)

        content = await response.text()
        soup = BeautifulSoup(content, features="html.parser")

        return soup.prettify()


async def write_detail(session: aiohttp.ClientSession, id: int) -> None:
    with open(f"./details-html/{id}.html", "w", encoding="utf-8") as fh:
        detail = await get_detail(session, id)
        fh.write(detail)


async def batch(ids):
    async with aiohttp.ClientSession() as session:
        tasks = []
        for i in ids:
            tasks.append(write_detail(session, i))
        await asyncio.gather(*tasks, return_exceptions=True)


def read_places():
    with open("places.json", "r", encoding="utf-8") as fh:
        return json.loads(fh.read())


places = read_places()
ic(len(places))

ids = [int(p["id"]) for p in places]
ic(len(ids))  # 12.937


in_dir = [int(name.split(".")[0]) for name in os.listdir("./details-html")]
ic(len(in_dir))

ids = [i for i in ids if i not in in_dir]
ic(len(ids))

for b in partition_all(100, ids):
    asyncio.run(batch(b))
