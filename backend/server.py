import requests
from flask import Flask
from PIL import Image
from io import StringIO, BytesIO
import os
import urllib.request

app = Flask(__name__)


API_URL = "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large"
headers = {"Authorization": f"Bearer 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"}

img_number = 0


def query():
    global img_number
    img_headers = {"User-Agent": "PostmanRuntime/7.31.1"}
    try:
        urllib.request.urlretrieve(
            'https://s3.amazonaws.com/images.wealthyaffiliate.com/uploads/1885580/sitecontent/0c67ff30e83759bb4ff572bcab4818e61582487623_cropped.jpg',
            f"img_{img_number}.png")
        # img_data = Image.open(f"img_{img_number}.png")
        with open(f"img_{img_number}.png", "rb") as f:
            img_data = f.read()
        response = requests.post(API_URL, headers=headers, data=img_data)
        os.remove(f"img_{img_number}.png")
        img_number += 1
    except Exception as e:
        print(f'Error: {e}')
    return response.json()


# https://i.pinimg.com/originals/71/ff/80/71ff80881d759efd03f19644165ce112.jpg
# https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_640.jpg
output = query()
print(output)
