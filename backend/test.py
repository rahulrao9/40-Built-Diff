import requests

with open("avenue.jpg", "rb") as f:
    img_data = f.read()
headers = {"Authorization": f"Bearer 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"}
response = requests.post(
    "https://api-inference.huggingface.co/models/dandelin/vilt-b32-finetuned-vqa", headers=headers, data={'inputs': ''})
print(response.json())
