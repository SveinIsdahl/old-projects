from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from pyvirtualdisplay import Display
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

display = Display(visible=0, size=(800, 600))
display.start()

options = webdriver.ChromeOptions()
options.add_argument("disable-dev-shm-usage")

driver = webdriver.Chrome(executable_path="/usr/lib/chromium-browser/chromedriver", options=options)

driver.get("https://sveinisdahl.github.io")
print(driver.title)

def login():
        try:
                email = WebDriverWait(driver, 15).until(EC.presence_of_element_located((By.ID, "ema$                pwd = WebDriverWait(driver, 15).until(EC.presence_of_element_located((By.ID, "pwd")$                loginbtn = WebDriverWait(driver, 15).until(EC.presence_of_element_located((By.ID, "$        except:
                print("Login feil, fant ikke email eller passord")
                print(driver.page_source)
                driver.quit()
                return

        email.send_keys("300708.svisdahl@gmail.com")
        pwd.send_keys("")
        loginbtn.click()
        test()

def test():
        try:
                element = WebDriverWait(driver, 35).until(EC.presence_of_element_located((By.ID, "t$        except:
                print("Fant ikke today")
                print(element)
                print(driver.page_source)
                driver.quit()
                return

        print(driver.find_element_by_id("today").get_attribute("value"))

login()
driver.quit()