from IPython.display import Audio, display
import requests
from flask import Flask, request, Response, jsonify, make_response, send_file
from PIL import Image
from io import StringIO, BytesIO
import os
import urllib.request
import gtts
from playsound import playsound

app = Flask(__name__)


IMG_TO_CAPTION_API_URL = "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large"
TXT_TO_AUDIO_API_URL = "https://api-inference.huggingface.co/models/suno/bark-small"
headers = {"Authorization": f"Bearer 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"}

img_number = 0


def img_to_text_query(img_url):
    global img_number
    img_headers = {"User-Agent": "PostmanRuntime/7.31.1"}
    try:
        urllib.request.urlretrieve(img_url,
                                   f"img_{img_number}.png")
        # img_data = Image.open(f"img_{img_number}.png")
        with open(f"img_{img_number}.png", "rb") as f:
            img_data = f.read()
        response = requests.post(
            IMG_TO_CAPTION_API_URL, headers=headers, data=img_data)
        os.remove(f"img_{img_number}.png")
        img_number += 1
    except Exception as e:
        print(f'Error: {e}')
    return response.json()


def text_to_speech_query(payload):
    response = requests.post(TXT_TO_AUDIO_API_URL,
                             headers=headers, json=payload)
    return response.content


@app.route('/img_to_caption', methods=['GET', 'POST'])
def img_to_caption():
    if request.method == "POST":
        try:
            recvd_json = request.get_json()
            img_url = recvd_json['imgurl']
            img_caption = img_to_text_query(img_url)
            if (type(img_caption) == list):
                return make_response(jsonify({'img_caption': img_caption[0]['generated_text'], 'message': 'success'}), 200)
        except Exception as e:
            return make_response(jsonify({'message': f'{e}'}), 400)
        return make_response(jsonify({'message': 'error'}), 400)


# audio_bytes = text_to_speech_query({
#     "inputs": "The answer to the universe is 42 ,[laughs]",
# })
# print(audio_bytes)
# mixer.init()
# sound = mixer.Sound(buffer=audio_bytes)
# audio = sound.play()
# while audio.get_busy():
#     time.Clock().tick(10)
audio_file_count = 0


@app.route('/text_to_speech', methods=['GET', 'POST'])
def text_to_speech():
    global audio_file_count
    if request.method == 'POST':
        try:
            text = request.get_json()['text']
            speech_bytes = gtts.gTTS(text, slow=True)
            with open(f"audio_{audio_file_count}.wav", "wb") as f:
                speech_bytes.write_to_fp(f)
            response = send_file(f"audio_{audio_file_count}.wav")
            # os.remove(f"audio_{audio_file_count}.wav")
            return response
        except Exception as e:
            return make_response(jsonify({'message': f'{e}'}), 400)
        finally:
            # os.remove(f"audio_{audio_file_count}.wav")
            audio_file_count += 1


# t1 = gtts.gTTS('The answer to the universe is 42 ,[laughs]', slow=True)
# t1.save('sample.mp3')
if __name__ == "__main__":
    app.run(debug=True)
