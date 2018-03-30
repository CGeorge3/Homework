from flask import Flask, jsonify, render_template, redirect
import pymongo
from scrape_mars import scrape
from flask_pymongo import PyMongo


app = Flask(__name__)


conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)
mongo = PyMongo(app)

base = '/api/v1.0/'


@app.route('/')
def home():
    mars = scrape()
    print(mars['hemispheres'][0]['title'])
    return render_template('index.html',mars = mars)



# @app.route(f'{base}scrape')
# def refresh():
#     refresh_mars()
#     mars = list(db.mars.find())[0]
#     return render_template('index.html',mars = 0)

@app.route(f'{base}test')
def retrieve_data():
    return jsonify(scrape())

# @app.route("/scrape")
# def scrape():
#     mars_data = scrape_mars.scrape()
#     db.mars.update(
#         {},
#         mars_data,
#         upsert=True
#     )
#     return redirect("http://localhost:5000/", code=302)

if __name__ == '__main__':
    app.run()