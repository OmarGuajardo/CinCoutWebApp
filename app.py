from flask import Flask, render_template, url_for
from flask_bootstrap import Bootstrap

app = Flask(__name__)
Bootstrap(app)

@app.route('/')
def login():
    return render_template('login.html')

@app.route('/base')
def base():
    return render_template('trial.html')

if __name__ == "__main__":
    app.run(debug=True)