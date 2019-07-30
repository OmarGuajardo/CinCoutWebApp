from flask import Flask, render_template, url_for
from flask_bootstrap import Bootstrap
import requests

app = Flask(__name__)
Bootstrap(app)

trial = True 

nameArray = ['Omar Guajardo','Luis Acosta','Omar Garza','Anahi Cantu','Denielle Islas','Jennifer Guajardo']


@app.route('/')
def login():
    return render_template('login.html',trial = trial)

@app.route('/manage')
def base():
    return render_template('index.html',
    nameArray = nameArray
    
    )

if __name__ == "__main__":
    app.run(debug=True)