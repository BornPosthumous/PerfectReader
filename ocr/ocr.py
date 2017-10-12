from gutenberg.acquire import load_etext
from gutenberg.cleanup import strip_headers
from gutenberg.query import get_etexts
from gutenberg.query import get_metadata

from PIL import Image
import subprocess
import pyocr.builders
import urllib
import codecs
import json

from flask import send_file

# @app.route('/get_image')
# def get_image():
#     if request.args.get('type') == '1':
#        filename = 'ok.gif'
#     else:
#        filename = 'error.gif'
#     return send_file(filename, mimetype='image/gif')
from flask import Flask, request
from init import setup
from wand.image import Image as WandImage
from wand.drawing import Drawing
from wand.color import Color

app = Flask(__name__)
tool = setup()

builder = pyocr.builders.LineBoxBuilder()
word_builder = pyocr.builders.WordBoxBuilder()

if __name__ == "__main__":
    app.run(debug=True)

@app.route('/magick', methods=['POST'])
def magick():
    _input  = '../docs/public/sample4.jpg'
    _output = '../docs/public/textclean.jpg'
    if request.method == 'POST':
        body = request.get_json(force=True)
        print(body)
        # filename = body['filename']
        filename = '../docs/public/test.jpg'
        url = body['url']
        magickOptions = body['magickOptions']
        mDict = json.loads(magickOptions)
        print(filename,url)

        urllib.request.urlretrieve( url, _output)
        callTextCleaner( _output, filename, mDict )
        print(filename)
        return filename

    else:
        return ''

@app.route('/domoshit', methods=['GET'])
def doMoShit():
    line_boxes = tool.image_to_string(
        Image.open('test.jpg'),
        lang="eng",
        builder=word_builder
    )
    with Drawing() as draw:
        draw.stroke_color = Color('black')
        draw.stroke_width = 2
        draw.fill_color = Color('white')
        draw.fill_opacity = 0


        for line in line_boxes:
            draw.path_start()
            draw.path_move(to=(line.position[0][0], line.position[0][1]))
            draw.path_move(to=(line.position[0][0], line.position[1][1]))
            draw.path_move(to=(line.position[1][0], line.position[1][1]))
            draw.path_move(to=(line.position[1][0], line.position[0][1]))
            draw.path_close()
            draw.path_finish()

        with WandImage(filename='test.jpg') as image:
            draw(image)
            image.save(filename="test-arc.jpg")
    return "Done"

@app.route('/doshit', methods=['GET', 'POST'])
def doShit():
    print("Doing shit")
    line_boxes = tool.image_to_string(
        Image.open('test.jpg'),
        lang="eng",
        builder=builder
    )
    # for line in line_boxes:
    #     print("%s" % line)

    with codecs.open("toto.html", 'w', encoding='utf-8') as file_descriptor:
        builder.write_file(file_descriptor, line_boxes);

    with open("toto.html", 'r', encoding='utf-8') as file_descriptor:
        data = file_descriptor.read().replace('\n','')

    return data

#TODO Error handling
@app.route('/fromURL', methods=['GET', 'POST'])
def fromURL():
    if request.method == 'POST':
        body = request.get_json(force=True)
        print(body)
        # filename = body['filename']
        filename = 'test.jpg'
        url = body['url']
        print(filename,url)

        urllib.request.urlretrieve( url, filename )

        #TODO make this function DRY
        txt = tool.image_to_string(
            Image.open(filename),
            lang='eng',
            builder=pyocr.builders.TextBuilder()
        )
        # mImgFile = "test.jpg"
        # mBuffer=open(mImgFile,"rb").read()
        # result = tesseract.ProcessPagesBuffer(mBuffer,len(mBuffer),api)
        # print ("result(ProcessPagesBuffer)=",result)


        return txt

    else:
        return ''

@app.route('/gut', methods=['GET','POST'])
def gutenberg():
    print(get_metadata('title', 2701))  # prints frozenset([u'Moby Dick; Or, The Whale'])
    print(get_metadata('author', 2701)) # prints frozenset([u'Melville, Hermann'])

    print(get_etexts('title', 'Moby Dick; Or, The Whale'))  # prints frozenset([2701, ...])
    print(get_etexts('author', 'Melville, Hermann'))        # prints frozenset([2701, ...])
    return ''

#TODO OCR From Upload

# Fred's imagemagick scripts r00l
# http://www.fmwconcepts.com/imagemagick/textcleaner/index.php

def callTextCleaner( _input , _output, _ ):
    print("Output",type( _output))
    enhance       = str(_['enhance'])
    filterSize    = str(_['filterSize'])
    offset        = str(_['offset'])
    trim          = _['trim']
    borderPadding = str(_['borderPadding'])
    greyScale     = _['greyscale']
    threshold     = str(_['threshold'])
    sharp         = str(_['sharp'])

    subprocess.call(['textcleaner',
                     '-g',                # GreyScale
                     '-e', enhance,       # Enhance
                     '-f', filterSize,    # Filtersize
                     '-o', offset,        # Offset
                     '-t', threshold,     # Threshold
                     '-u',                # Unrotate
                     '-s', sharp ,        # SharpAmt
                     '-T',                # Trim background
                     '-p', borderPadding, # Border Padding
                     _input    ,          # In
                     _output   ])         # Out
