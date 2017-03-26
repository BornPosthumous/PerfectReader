from PIL import Image
import pyocr.builders
import urllib

from flask import Flask, request
app = Flask(__name__)
from init import setup

tool = setup()

# if __name__ == "__main__":
#     app.run()

#TODO Error handling
@app.route('/fromURL', methods=['GET', 'POST'])
def fromURL():
    if request.method == 'POST':
        body = request.get_json(force=True)
        filename = body['filename']
        url = body['url']
        print(filename,url)

        urllib.request.urlretrieve( url, filename )

        #TODO make this function DRY
        txt = tool.image_to_string(
            Image.open(filename),
            lang='eng',
            builder=pyocr.builders.TextBuilder()
        )

        return txt

    else:
        return ''

#TODO OCR From Upload
