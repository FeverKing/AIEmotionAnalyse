"""

AI情感分析
    Copyright (C) 2020  FeverKing

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

"""
import flask
from flask import Flask,request,render_template
import paddlehub as hub
from flask_cors import CORS

#加载百度的预训练模型
senta = hub.Module(name = "senta_lstm")

#web服务启动
app = Flask(__name__)

#注意,如果你是自己建立后端,下面这一行非常有必要,接受跨域请求
CORS(app, resources=r'/*')

@app.route('/')
def index():
        return render_template('index.html')


#api
@app.route('/api',methods=['GET', 'POST'])
def api():
        para = request.args.get('quest')
        test_text=[para]
        results = senta.sentiment_classify(data={"text":test_text})
        for result in results:
                return result

#主页
@app.route('/home')
def home():
        return render_template('index.html')

#主页的请求处理
@app.route('/deal',methods=['GET', 'POST'])
def get_method():
        get_name = request.args.get('phrase')

        test_text = [get_name]
        results = senta.sentiment_classify(data={"text":test_text})
        for result in results:
                negative = result['negative_probs']
                postive = result['positive_probs']
                text = result['text']
                attitude = result['sentiment_key']

        return render_template('result.html',input_text=text,negative=negative*100,postive=postive*100,attitude=attitude)


#主程序启动
if __name__ == '__main__':
        app.run(host='0.0.0.0')