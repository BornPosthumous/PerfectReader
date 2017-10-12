from PIL import Image
import sys
import pyocr
import pyocr.builders
import scrapy
import urllib

print("Init")
#TODO Move this to another file
def setup():
    print ("Setup\n===================================\n")
    tools = pyocr.get_available_tools()

    if len(tools) == 0:
        print("No OCR tool found")
        sys.exit(1)

    # The tools are returned in the recommended order of usage
    tool = tools[0]
    print("Will use tool '%s'" % (tool.get_name()))
    # Ex: Will use tool 'libtesseract'

    langs = tool.get_available_languages()
    print("Available languages: %s" % ", ".join(langs))

    #TODO filter for eng
    lang = langs[2]
    print("Will use lang '%s'" % (lang))

    print ("\n End Setup\n===================================")

    return tool
