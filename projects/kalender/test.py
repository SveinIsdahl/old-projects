
from requests_html import HTMLSession

session = HTMLSession()

r = session.get("https://sveinisdahl.github.io")
r.html.render()
print(r.html.find("#sign").innerHTML)