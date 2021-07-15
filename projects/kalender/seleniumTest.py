from selenium import webdriver
from selenium.webdriver.common.keys import Keys
def login():
    driver.get("https://www.sveinisdahl.github.io")
    driver.find_element_by_id("email").send_keys("")
    driver.find_element_by_id("pwd").send_keys("")
    driver.find_element_by_id("loginbtn").click()

def getToday():
    return driver.find_element_by_id("today").text

driver = webdriver.Safari()

#driver.get("https://www.sveinisdahl.github.io")
#assert "Kalender" in driver.title
#elem = driver.find_element_by_id("sign")
#print(elem)
#elem.clear()
#elem.send_keys("pycon")
#elem.send_keys(Keys.RETURN)
#assert "No results found." not in driver.page_source

login()
driver.close()

