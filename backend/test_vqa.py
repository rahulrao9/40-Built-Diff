from transformers import AutoProcessor, Blip2ForConditionalGeneration
import torch
import requests
from PIL import Image

processor = AutoProcessor.from_pretrained("Salesforce/blip2-opt-2.7b")
model = Blip2ForConditionalGeneration.from_pretrained(
    "Salesforce/blip2-opt-2.7b", torch_dtype=torch.float16)
device = "cpu"
model.to(device)


url = "http://images.cocodataset.org/val2017/000000039769.jpg"
image = Image.open(requests.get(url, stream=True).raw)
question = "What is the image all about?"
prompt = f"Question: {question} Answer:"
inputs = processor(image, text=prompt, return_tensors="pt").to(
    device, torch.float16)

generated_ids = model.generate(**inputs, max_new_tokens=10)
generated_text = processor.batch_decode(
    generated_ids, skip_special_tokens=True)[0].strip()
print(generated_text)
